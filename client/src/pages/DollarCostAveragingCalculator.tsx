import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SEO } from '../components/SEO';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

interface DCAInputs {
  investmentAmount: number;
  frequency: string;
  investmentPeriodYears: number;
  expectedReturn: number;
  marketVolatility: number;
  startDate: string;
}

const DollarCostAveragingCalculator: React.FC = () => {
  return (
    <>
      <SEO 
        title="Dollar Cost Averaging Calculator - DCA Investment Strategy Tool"
        description="Calculate the benefits of dollar cost averaging with our comprehensive DCA calculator. Compare lump sum vs DCA strategies and optimize your investment approach."
        keywords="dollar cost averaging calculator, DCA calculator, investment strategy, lump sum vs DCA, investment calculator, systematic investment, market volatility, investment planning"
        canonical="https://dollarmento.com/dollar-cost-averaging-calculator"
      />
      <DCACalculatorContent />
    </>
  );
};

const DCACalculatorContent: React.FC = () => {
  const [inputs, setInputs] = useState<DCAInputs>({
    investmentAmount: 500,
    frequency: 'monthly',
    investmentPeriodYears: 10,
    expectedReturn: 8.0,
    marketVolatility: 15.0,
    startDate: '2020-01-01'
  });

  const handleInputChange = (field: keyof DCAInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' && field !== 'frequency' && field !== 'startDate' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCurrencyDetailed = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getFrequencyMultiplier = (frequency: string): number => {
    switch (frequency) {
      case 'weekly': return 52;
      case 'biweekly': return 26;
      case 'monthly': return 12;
      default: return 12;
    }
  };

  const results = useMemo(() => {
    const frequencyMultiplier = getFrequencyMultiplier(inputs.frequency);
    const totalPeriods = inputs.investmentPeriodYears * frequencyMultiplier;
    const periodReturn = inputs.expectedReturn / 100 / frequencyMultiplier;
    const periodVolatility = inputs.marketVolatility / 100 / Math.sqrt(frequencyMultiplier);
    
    // Simulate DCA investments with market volatility
    let portfolioValue = 0;
    let totalInvested = 0;
    let totalShares = 0;
    const investmentHistory: Array<{
      period: number;
      invested: number;
      sharePrice: number;
      sharesPurchased: number;
      totalShares: number;
      portfolioValue: number;
      totalInvested: number;
      date: string;
    }> = [];

    const startDate = new Date(inputs.startDate);
    
    for (let period = 1; period <= totalPeriods; period++) {
      // Simulate market price with volatility
      const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
      const volatilityAdjustment = randomFactor * periodVolatility;
      const baseGrowth = Math.pow(1 + periodReturn, period);
      const sharePrice = 100 * baseGrowth * (1 + volatilityAdjustment);
      
      // DCA Investment
      totalInvested += inputs.investmentAmount;
      const sharesPurchased = inputs.investmentAmount / sharePrice;
      totalShares += sharesPurchased;
      portfolioValue = totalShares * sharePrice;
      
      // Calculate date for this period
      const currentDate = new Date(startDate);
      if (inputs.frequency === 'weekly') {
        currentDate.setDate(currentDate.getDate() + (period - 1) * 7);
      } else if (inputs.frequency === 'biweekly') {
        currentDate.setDate(currentDate.getDate() + (period - 1) * 14);
      } else {
        currentDate.setMonth(currentDate.getMonth() + (period - 1));
      }
      
      investmentHistory.push({
        period,
        invested: inputs.investmentAmount,
        sharePrice,
        sharesPurchased,
        totalShares,
        portfolioValue,
        totalInvested,
        date: currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
      });
    }

    // Calculate final results
    const finalInvestment = investmentHistory[investmentHistory.length - 1];
    const totalGains = finalInvestment.portfolioValue - finalInvestment.totalInvested;
    const totalReturn = (totalGains / finalInvestment.totalInvested) * 100;
    const averageCostPerShare = finalInvestment.totalInvested / finalInvestment.totalShares;
    
    // Calculate lump sum comparison
    const lumpSumAmount = inputs.investmentAmount * totalPeriods;
    const lumpSumValue = lumpSumAmount * Math.pow(1 + inputs.expectedReturn / 100, inputs.investmentPeriodYears);
    const lumpSumGains = lumpSumValue - lumpSumAmount;
    
    // Find break-even point
    const breakEvenPeriod = investmentHistory.findIndex(h => h.portfolioValue > h.totalInvested);
    
    return {
      totalInvested: finalInvestment.totalInvested,
      finalPortfolioValue: finalInvestment.portfolioValue,
      totalGains,
      totalReturn,
      totalShares: finalInvestment.totalShares,
      averageCostPerShare,
      investmentHistory,
      lumpSumValue,
      lumpSumGains,
      dcaAdvantage: totalGains - lumpSumGains,
      breakEvenPeriod: breakEvenPeriod >= 0 ? breakEvenPeriod + 1 : null,
      frequencyText: inputs.frequency.charAt(0).toUpperCase() + inputs.frequency.slice(1),
      periodsPerYear: frequencyMultiplier
    };
  }, [inputs]);

  // Chart data for portfolio growth
  const portfolioGrowthData = {
    labels: results.investmentHistory.filter((_, index) => index % Math.max(1, Math.floor(results.investmentHistory.length / 20)) === 0).map(h => h.date),
    datasets: [
      {
        label: 'Portfolio Value',
        data: results.investmentHistory.filter((_, index) => index % Math.max(1, Math.floor(results.investmentHistory.length / 20)) === 0).map(h => h.portfolioValue),
        borderColor: '#10b981',
        backgroundColor: '#10b981',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Total Invested',
        data: results.investmentHistory.filter((_, index) => index % Math.max(1, Math.floor(results.investmentHistory.length / 20)) === 0).map(h => h.totalInvested),
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Chart data for shares purchased
  const sharesPurchasedData = {
    labels: results.investmentHistory.slice(0, 24).map(h => h.date),
    datasets: [
      {
        label: 'Shares Purchased',
        data: results.investmentHistory.slice(0, 24).map(h => h.sharesPurchased),
        backgroundColor: '#f59e0b',
        borderColor: '#f59e0b',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            if (context.datasetIndex === 0) {
              return `Portfolio: ${formatCurrency(context.parsed.y)}`;
            } else {
              return `Invested: ${formatCurrency(context.parsed.y)}`;
            }
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return formatCurrency(value);
          },
        },
      },
    },
  };

  const sharesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `Shares: ${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Shares Purchased',
        },
      },
    },
  };

  return (
    <TooltipProvider>
      <SEO 
        title="Dollar Cost Averaging Calculator - DCA Investment Strategy"
        description="Calculate DCA investment returns and compare with lump sum investing. Analyze risk reduction benefits and long-term growth with dollar cost averaging strategy."
        keywords="dollar cost averaging calculator, DCA calculator, investment strategy calculator, systematic investment calculator, periodic investment calculator, DCA vs lump sum calculator"
        canonical="https://dollarmento.com/dca-calculator"
      />
      <div className="w-full p-6 space-y-6">
        {/* Header */}
        <div className="text-left space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Dollar Cost Averaging (DCA) Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Invest steadily. Reduce risk. Grow confidently. Simulate how regular, fixed-amount investments perform over time—regardless of market ups and downs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Input Panel - 40% width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Investment Settings */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-blue-800 text-base">
                  💰 Investment Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Investment Amount per Period
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Fixed dollar amount you invest at each interval (weekly, monthly, etc.)</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Input
                      type="number"
                      value={inputs.investmentAmount}
                      onChange={(e) => handleInputChange('investmentAmount', e.target.value)}
                      className="mt-1"
                      placeholder="500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Frequency
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>How often you make investments. More frequent = better dollar cost averaging effect.</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Select value={inputs.frequency} onValueChange={(value) => handleInputChange('frequency', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Biweekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Investment Period
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total number of years you plan to invest using dollar cost averaging.</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="number"
                          value={inputs.investmentPeriodYears}
                          onChange={(e) => handleInputChange('investmentPeriodYears', e.target.value)}
                          className="flex-1"
                          placeholder="10"
                        />
                        <span className="text-sm text-gray-500">years</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Start Date
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>When you plan to start your dollar cost averaging strategy.</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Input
                      type="date"
                      value={inputs.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Assumptions */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-green-800 text-base">
                  📈 Market Assumptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Expected Annual Return
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Average market return assumption. S&P 500 historical average is ~10%.</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        type="number"
                        step="0.1"
                        value={inputs.expectedReturn}
                        onChange={(e) => handleInputChange('expectedReturn', e.target.value)}
                        className="flex-1"
                        placeholder="8.0"
                      />
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Market Volatility
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Market price fluctuations. Higher volatility enhances DCA benefits.</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        type="number"
                        step="0.1"
                        value={inputs.marketVolatility}
                        onChange={(e) => handleInputChange('marketVolatility', e.target.value)}
                        className="flex-1"
                        placeholder="15.0"
                      />
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Results Panel - 60% width */}
          <div className="lg:col-span-3">
            <div className="sticky top-6 space-y-6">
              {/* DCA Results Summary */}
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-green-800 text-base">
                    💼 DCA Results Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                      <div className="text-xs text-purple-600 font-medium">Final Portfolio Value</div>
                      <div className="text-xl font-bold text-purple-700">{formatCurrency(results.finalPortfolioValue)}</div>
                      <div className="text-xs text-purple-600 mt-1">{results.totalReturn.toFixed(1)}% total return</div>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                      <div className="text-xs text-orange-600 font-medium">Total Invested</div>
                      <div className="text-lg font-bold text-orange-700">{formatCurrency(results.totalInvested)}</div>
                      <div className="text-xs text-orange-600 mt-1">{results.investmentHistory.length} payments</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="text-xs text-green-600 font-medium">Total Gains</div>
                      <div className="text-lg font-bold text-green-700">{formatCurrency(results.totalGains)}</div>
                      <div className="text-xs text-green-600 mt-1">{results.totalShares.toFixed(2)} total shares</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="text-xs text-blue-600 font-medium">Average Cost per Share</div>
                      <div className="text-lg font-bold text-blue-700">{formatCurrencyDetailed(results.averageCostPerShare)}</div>
                      <div className="text-xs text-blue-600 mt-1">DCA benefit realized</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio Growth Chart */}
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-blue-800 text-base">
                    📊 Portfolio Growth Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 relative">
                    <Line data={portfolioGrowthData} options={chartOptions} />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>Portfolio Value</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>Total Invested</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* DCA vs Lump Sum Comparison */}
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-orange-800 text-base">
                    ⚖️ DCA vs Lump Sum Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">Strategy</th>
                          <th className="text-left py-2 font-medium">Final Value</th>
                          <th className="text-left py-2 font-medium">Total Gains</th>
                        </tr>
                      </thead>
                      <tbody className="space-y-2">
                        <tr className="border-b border-gray-100 bg-blue-50">
                          <td className="py-2 font-medium">Dollar Cost Averaging</td>
                          <td className="py-2">{formatCurrency(results.finalPortfolioValue)}</td>
                          <td className="py-2">{formatCurrency(results.totalGains)}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2">Lump Sum</td>
                          <td className="py-2">{formatCurrency(results.lumpSumValue)}</td>
                          <td className="py-2">{formatCurrency(results.lumpSumGains)}</td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-green-50">
                          <td className="py-2 font-medium">DCA Advantage</td>
                          <td className="py-2">-</td>
                          <td className="py-2 font-bold">{formatCurrency(Math.abs(results.dcaAdvantage))}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 text-xs text-gray-600">
                    {results.dcaAdvantage > 0 ? 
                      "DCA outperformed lump sum in this volatile market scenario" : 
                      "Lump sum would have outperformed DCA in this scenario"
                    }
                  </div>
                </CardContent>
              </Card>

              {/* Shares Purchased Chart */}
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-orange-800 text-base">
                    📍 Shares Purchased Each Period (First 2 Years)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 relative">
                    <Bar data={sharesPurchasedData} options={sharesChartOptions} />
                  </div>
                  <div className="mt-3 text-xs text-gray-600">
                    DCA automatically buys more shares when prices drop and fewer when prices rise
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-purple-800 text-base">
                    📋 Key Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded border">
                      <span className="text-sm font-medium">Average Cost per Share</span>
                      <span className="text-lg font-bold">{formatCurrencyDetailed(results.averageCostPerShare)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded border border-blue-200">
                      <span className="text-sm font-medium">Total Shares Owned</span>
                      <span className="text-lg font-bold text-blue-700">{results.totalShares.toFixed(2)}</span>
                    </div>
                    {results.breakEvenPeriod && (
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded border border-green-200">
                        <span className="text-sm font-medium">Break-even Period</span>
                        <span className="text-lg font-bold text-green-700">{results.breakEvenPeriod} periods</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="w-full">
          <div className="px-6 py-8">
            <div className="space-y-6">
              
              {/* What is Dollar Cost Averaging */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  What Is Dollar Cost Averaging (DCA)?
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  DCA is an investment strategy where you invest a fixed dollar amount at regular intervals—regardless of asset price.
                </p>
                <p className="text-gray-600 text-sm">
                  This strategy automatically buys more units when prices are low and fewer units when prices are high, reducing the average cost per unit over time. It helps smooth out market volatility and reduces the risk of "bad timing."
                </p>
              </section>

              {/* Benefits of DCA */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits of DCA</h3>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="font-medium text-green-800 text-base">Key Advantages</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 text-sm mt-0.5">✓</span>
                      <span className="text-gray-600 text-sm">Reduces emotional investing (no panic buying/selling)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 text-sm mt-0.5">✓</span>
                      <span className="text-gray-600 text-sm">Smooths volatility — great in uncertain markets</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 text-sm mt-0.5">✓</span>
                      <span className="text-gray-600 text-sm">Lower average cost per unit in fluctuating markets</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 text-sm mt-0.5">✓</span>
                      <span className="text-gray-600 text-sm">Builds discipline by enforcing regular contributions</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 text-sm mt-0.5">✓</span>
                      <span className="text-gray-600 text-sm">Perfect for beginners or those without a lump sum to invest</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* When Not to Use DCA */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">When Not to Use DCA?</h3>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✗</span>
                    </div>
                    <span className="font-medium text-red-800 text-base">Potential Drawbacks</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm">
                      In steadily rising markets, lump-sum investing typically outperforms.
                    </p>
                    <p className="text-gray-600 text-sm">
                      If you already have a large amount to invest and want maximum long-term returns, DCA may delay exposure to gains.
                    </p>
                  </div>
                </div>
              </section>

              {/* Investment Planning Tool */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">The Best Investment Planning Tool and USA Dollar Cost Averaging Calculator</h3>
                
                <p className="text-gray-600 text-sm mb-3">
                  Dollar Cost Averaging (DCA) is a way to invest that lets you deal with changes in the market by putting in the same amount of money every month. You can use our all-in-one calculator to see how well DCA has worked in the past, compare it to lump sum investing, and find out when is the best time to invest.
                </p>
                <p className="text-gray-600 text-sm">
                  If you're slowly building wealth by taking money out of your paycheck or have a lot of money to invest, knowing how DCA works can help you figure out when to buy stocks and how to protect yourself from risk in markets that are unstable.
                </p>
              </section>

              {/* Benefits of DCA Strategy */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">The Dollar Cost Averaging Strategy Benefits</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">The market is less volatile</h4>
                    <p className="text-gray-600 text-sm">
                      DCA lessens the effects of timing the market by buying things over a number of market cycles. When prices are low, you buy more shares, and when prices are high, you buy fewer shares. This could lower the average cost of each share you own over time.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Discipline for emotional involvement</h4>
                    <p className="text-gray-600 text-sm">
                      When you invest in a planned way, you don't have to make emotional choices. You keep putting money into the market no matter what it's doing, so you don't give in to the urge to time the market or panic when it goes down.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">DCA makes it easy for regular investors to get to</h4>
                    <p className="text-gray-600 text-sm">
                      It lets people who don't have a lot of money invest. You can start with small amounts and grow your wealth over time by making regular contributions from your regular income.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Raising the Rate of Compound Growth</h4>
                    <p className="text-gray-600 text-sm">
                      When you invest regularly, your money grows faster because every time you buy something, it starts making money right away. Earlier purchases have more time to grow, but later purchases help your base grow.
                    </p>
                  </div>
                </div>
              </section>

              {/* Lump Sum vs DCA Comparison */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Investing a Lump Sum vs. Dollar-Cost Averaging</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">When DCA Is Better</h4>
                    <p className="text-gray-600 text-sm">
                      DCA usually works better than putting all your money in at once when the market is going down or is very unstable. It can help you lose less money when the market is going down. When the market is uncertain or too high, it can help you get better returns that take risk into account.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">When a Lump Sum Is the Best Option</h4>
                    <p className="text-gray-600 text-sm">
                      In markets that are going up (which has happened about 70% of the time in the past), lump sum investing usually does better than DCA because markets tend to go up over time. Investing your money sooner gives you more chances to grow.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Things to think about when it comes to how much risk you can take</h4>
                    <p className="text-gray-600 text-sm">
                      If you don't want to take risks or are worried about timing the market, DCA is the best way to go. Putting money into your plan a little bit at a time can help you stick to it, even if it doesn't always give you the best returns.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">A Plan for a Mixed Approach</h4>
                    <p className="text-gray-600 text-sm">
                      You could put some money in right away and then DCA the rest over the next six to twelve months. This gives you some immediate exposure to the market while lowering the risk of timing for the rest of your money.
                    </p>
                  </div>
                </div>
              </section>

              {/* Call to Action */}
              <section className="mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg text-center">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">Optimize Your Investment Strategy with DCA Analysis</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    Use our comprehensive calculator to compare dollar cost averaging to lump sum investing. Make informed investment timing decisions.
                  </p>
                  <Button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Analyze Your DCA Strategy Now
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default DollarCostAveragingCalculator;