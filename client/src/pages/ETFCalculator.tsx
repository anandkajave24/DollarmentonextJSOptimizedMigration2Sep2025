import { useState } from "react";
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { SEO } from "../components/SEO";

interface ETFComparison {
  id: string;
  name: string;
  expenseRatio: number;
  tracking: string;
}

export default function ETFCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [investmentPeriod, setInvestmentPeriod] = useState(15);
  
  const [etfs] = useState<ETFComparison[]>([
    { id: '1', name: 'VXUS (International)', expenseRatio: 0.08, tracking: 'FTSE Global All Cap ex US' },
    { id: '2', name: 'VTI (Total Stock)', expenseRatio: 0.03, tracking: 'CRSP US Total Market' },
    { id: '3', name: 'VOO (S&P 500)', expenseRatio: 0.03, tracking: 'S&P 500' },
    { id: '4', name: 'VEA (Developed Markets)', expenseRatio: 0.05, tracking: 'FTSE Developed All Cap ex US' }
  ]);

  // Calculate returns for each ETF
  const calculateETFReturns = (expenseRatio: number) => {
    const netReturn = expectedReturn - expenseRatio;
    const monthlyReturn = netReturn / 100 / 12;
    const totalMonths = investmentPeriod * 12;
    
    const futureValue = initialInvestment * Math.pow(1 + monthlyReturn, totalMonths) +
      monthlyInvestment * ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn);
    
    const totalInvested = initialInvestment + (monthlyInvestment * totalMonths);
    const totalGains = futureValue - totalInvested;
    const totalFees = futureValue * (expenseRatio / 100) * investmentPeriod;
    
    return {
      futureValue,
      totalInvested,
      totalGains,
      totalFees,
      netReturn
    };
  };

  // Comparison data
  const comparisonData = etfs.map(etf => {
    const results = calculateETFReturns(etf.expenseRatio);
    return {
      name: etf.name.split(' ')[0],
      fullName: etf.name,
      expenseRatio: etf.expenseRatio,
      futureValue: results.futureValue,
      totalFees: results.totalFees,
      netReturn: results.netReturn
    };
  });

  // Best performing ETF
  const bestETF = comparisonData.reduce((best, current) => 
    current.futureValue > best.futureValue ? current : best
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (num: number, decimals: number = 2) => {
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    }) + '%';
  };

  // Pie chart data for best ETF
  const bestETFResults = calculateETFReturns(bestETF.expenseRatio);
  const pieData = [
    { name: 'Principal', value: bestETFResults.totalInvested, fill: '#3b82f6' },
    { name: 'Investment Gains', value: bestETFResults.totalGains, fill: '#10b981' }
  ];

  return (
    <>
      <Helmet>
        <title>ETF Calculator - Exchange-Traded Fund Investment Calculator | DollarMento</title>
        <meta name="description" content="Calculate ETF investment returns, fees, and performance. Compare expense ratios and analyze long-term ETF investment growth with dividend reinvestment." />
        <meta name="keywords" content="etf calculator, exchange traded fund calculator, etf investment calculator, etf returns calculator, etf fee calculator, etf performance calculator, index fund calculator, etf comparison calculator" />
        <link rel="canonical" href="https://dollarmento.com/etf-calculator" />
      </Helmet>
      <div className="w-full p-6 space-y-6">
        <SEO 
          title="ETF Calculator - Compare Exchange-Traded Fund Returns"
          description="Compare ETF investments with different expense ratios. Calculate returns and analyze the impact of fees on your ETF portfolio performance."
          keywords="ETF calculator, exchange traded fund calculator, expense ratio comparison, ETF fees, investment calculator, index fund calculator"
          canonical="https://dollarmento.com/etf-calculator"
        />
        
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">ETF Calculator</h1>
          <p className="text-sm text-gray-600">
            Compare ETF investments with different expense ratios and find the most cost-effective options
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Input Panel - 40% width */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-500 rounded"></span>
                  Investment Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="initialInvestment" className="flex items-center gap-1">
                      Initial Investment
                      <span className="text-blue-500 cursor-help" title="One-time initial investment amount">ⓘ</span>
                    </Label>
                    <Input
                      id="initialInvestment"
                      type="number"
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(Number(e.target.value))}
                      className="mt-1"
                      min="0"
                      step="1000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="monthlyInvestment" className="flex items-center gap-1">
                      Monthly Investment
                      <span className="text-blue-500 cursor-help" title="Regular monthly contribution amount">ⓘ</span>
                    </Label>
                    <Input
                      id="monthlyInvestment"
                      type="number"
                      value={monthlyInvestment}
                      onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                      className="mt-1"
                      min="0"
                      step="100"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expectedReturn" className="flex items-center gap-1">
                      Expected Annual Return (%)
                      <span className="text-blue-500 cursor-help" title="Expected annual return before fees">ⓘ</span>
                    </Label>
                    <Input
                      id="expectedReturn"
                      type="number"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="mt-1"
                      min="1"
                      max="25"
                      step="0.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="investmentPeriod" className="flex items-center gap-1">
                      Investment Period (Years)
                      <span className="text-blue-500 cursor-help" title="How long you plan to invest">ⓘ</span>
                    </Label>
                    <Input
                      id="investmentPeriod"
                      type="number"
                      value={investmentPeriod}
                      onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                      className="mt-1"
                      min="1"
                      max="50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ETF Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Popular ETFs Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {etfs.map((etf) => (
                    <div key={etf.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-sm">{etf.name}</div>
                          <div className="text-xs text-gray-500">{etf.tracking}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm">{formatPercent(etf.expenseRatio)}</div>
                          <div className="text-xs text-gray-500">Expense Ratio</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How to Use Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">How to Use This Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">1.</span>
                    <span>Enter your investment amounts and timeline</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Set expected return based on market outlook</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Compare expense ratios across different ETFs</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Choose the most cost-effective option</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel - 60% width */}
          <div className="lg:col-span-3 space-y-6">
            {/* Best ETF Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Recommended ETF
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-green-50 rounded-lg mb-4">
                  <div className="text-lg font-bold text-green-800">{bestETF.fullName}</div>
                  <div className="text-sm text-green-600">Lowest cost with highest projected returns</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(bestETF.futureValue)}</div>
                    <div className="text-sm text-gray-600">Projected Value</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{formatPercent(bestETF.expenseRatio)}</div>
                    <div className="text-sm text-gray-600">Expense Ratio</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">ETF Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip 
                        formatter={(value, name) => [formatCurrency(Number(value)), name]}
                        labelFormatter={(label) => `ETF: ${label}`}
                      />
                      <Bar dataKey="futureValue" fill="#3b82f6" name="Future Value" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Investment Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Best ETF Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} stroke="#fff" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>Principal: {formatCurrency(bestETFResults.totalInvested)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Gains: {formatCurrency(bestETFResults.totalGains)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Detailed Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {comparisonData.map((etf, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">{etf.fullName}</span>
                        <span className={`text-sm font-medium ${
                          etf.name === bestETF.name ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {etf.name === bestETF.name ? '⭐ Best' : ''}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Future Value:</span>
                          <div className="font-medium">{formatCurrency(etf.futureValue)}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Total Fees:</span>
                          <div className="font-medium">{formatCurrency(etf.totalFees)}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Net Return:</span>
                          <div className="font-medium">{formatPercent(etf.netReturn, 1)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="w-full mt-8 space-y-6">
          {/* ETF Calculator Guide */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">ETF Calculator and Investment Strategy Guide</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Our ETF calculator helps you compare exchange-traded funds based on expense ratios, track investment growth, and make informed decisions for long-term wealth building.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Expense Ratio Impact</h4>
                  <p className="text-sm text-gray-600">
                    Compare how different expense ratios affect long-term returns. Even small differences can compound to significant amounts over time.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Diversification Benefits</h4>
                  <p className="text-sm text-gray-600">
                    ETFs provide instant diversification across hundreds or thousands of stocks, reducing individual stock risk while maintaining market exposure.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ETF Investment Strategies */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">ETF Investment Strategies and Best Practices</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Cost-Conscious Investing</h4>
                <p className="text-sm text-gray-600">
                  Look for ETFs with expense ratios below 0.20% for better long-term returns. Lower fees mean more money working for you over time.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Tax Efficiency</h4>
                <p className="text-sm text-gray-600">
                  ETFs are generally more tax-efficient than actively managed mutual funds due to their structure and lower turnover rates.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Asset Allocation</h4>
                <p className="text-sm text-gray-600">
                  Use different ETFs to build a balanced portfolio across domestic stocks, international markets, and bonds based on your risk tolerance.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Dollar-Cost Averaging</h4>
                <p className="text-sm text-gray-600">
                  Regular monthly investments help smooth out market volatility and can lead to better average purchase prices over time.
                </p>
              </div>
            </div>
          </section>

          {/* ETF Calculator Pros and Cons */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">ETF Investment Benefits and Considerations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Benefits Section */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <h4 className="text-xl font-bold text-green-800">Benefits</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-green-700">✓ Instant diversification across hundreds of stocks</p>
                  <p className="text-sm text-green-700">✓ Lower expense ratios than actively managed funds</p>
                  <p className="text-sm text-green-700">✓ Tax-efficient structure with lower distributions</p>
                  <p className="text-sm text-green-700">✓ Liquid trading during market hours</p>
                  <p className="text-sm text-green-700">✓ Transparent holdings and daily pricing</p>
                </div>
              </div>

              {/* Considerations Section */}
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✗</span>
                  </div>
                  <h4 className="text-xl font-bold text-red-800">Considerations</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-red-700">✗ Market risk affects overall portfolio value</p>
                  <p className="text-sm text-red-700">✗ Cannot beat market returns - tracks index performance</p>
                  <p className="text-sm text-red-700">✗ Intraday pricing can lead to emotional trading</p>
                  <p className="text-sm text-red-700">✗ Some sector ETFs may lack diversification</p>
                  <p className="text-sm text-red-700">✗ Currency risk in international ETFs</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg text-center text-white">
            <h3 className="text-xl font-bold mb-2">Build Your ETF Investment Portfolio Today</h3>
            <p className="text-sm mb-4 opacity-90">
              Use our comprehensive ETF calculator to compare costs, analyze returns, and optimize your investment strategy for long-term wealth building.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Analyze ETF Investments Now
            </Button>
          </section>
        </div>
      </div>
    </>
  );
}