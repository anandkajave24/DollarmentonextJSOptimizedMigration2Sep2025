import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Plus, Trash2 } from 'lucide-react';
import { SEO } from '../SEO';

interface ETFData {
  id: string;
  name: string;
  ticker: string;
  expectedReturn: number;
  expenseRatio: number;
  allocation: number;
}

const ETFCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [holdingPeriod, setHoldingPeriod] = useState<number>(10);
  const [etfs, setETFs] = useState<ETFData[]>([
    { id: '1', name: 'S&P 500 ETF', ticker: 'SPY', expectedReturn: 10, expenseRatio: 0.09, allocation: 60 },
    { id: '2', name: 'Total Stock Market ETF', ticker: 'VTI', expectedReturn: 9.5, expenseRatio: 0.03, allocation: 30 },
    { id: '3', name: 'International ETF', ticker: 'VTIAX', expectedReturn: 8, expenseRatio: 0.11, allocation: 10 }
  ]);

  const updateETF = (id: string, field: keyof ETFData, value: number | string) => {
    setETFs(etfs.map(etf => 
      etf.id === id ? { ...etf, [field]: value } : etf
    ));
  };

  const addETF = () => {
    const newETF: ETFData = {
      id: Date.now().toString(),
      name: 'New ETF',
      ticker: '',
      expectedReturn: 8,
      expenseRatio: 0.1,
      allocation: 0
    };
    setETFs([...etfs, newETF]);
  };

  const removeETF = (id: string) => {
    setETFs(etfs.filter(etf => etf.id !== id));
  };

  const totalAllocation = etfs.reduce((sum, etf) => sum + etf.allocation, 0);

  const calculateETFPerformance = (etf: ETFData) => {
    const investmentAmount = (initialInvestment * etf.allocation) / 100;
    const netReturn = etf.expectedReturn - etf.expenseRatio;
    const finalValue = investmentAmount * Math.pow(1 + netReturn / 100, holdingPeriod);
    const totalFees = investmentAmount * (Math.pow(1 + etf.expectedReturn / 100, holdingPeriod) - Math.pow(1 + netReturn / 100, holdingPeriod));
    
    return {
      investmentAmount,
      finalValue,
      totalReturn: finalValue - investmentAmount,
      totalFees,
      annualizedReturn: netReturn
    };
  };

  const portfolioPerformance = etfs.map(etf => ({
    ...etf,
    ...calculateETFPerformance(etf)
  }));

  const totalFinalValue = portfolioPerformance.reduce((sum, etf) => sum + etf.finalValue, 0);
  const totalReturn = totalFinalValue - initialInvestment;
  const totalFees = portfolioPerformance.reduce((sum, etf) => sum + etf.totalFees, 0);
  const portfolioCAGR = Math.pow(totalFinalValue / initialInvestment, 1 / holdingPeriod) - 1;

  // Yearly projection
  const yearlyData = [];
  for (let year = 0; year <= holdingPeriod; year++) {
    let yearValue = 0;
    etfs.forEach(etf => {
      const allocation = (initialInvestment * etf.allocation) / 100;
      const netReturn = etf.expectedReturn - etf.expenseRatio;
      yearValue += allocation * Math.pow(1 + netReturn / 100, year);
    });
    
    yearlyData.push({
      year,
      portfolioValue: Math.round(yearValue),
      totalReturn: Math.round(yearValue - initialInvestment)
    });
  }

  // Popular ETF presets
  const popularETFs = [
    { name: 'SPDR S&P 500 ETF', ticker: 'SPY', expectedReturn: 10, expenseRatio: 0.09 },
    { name: 'Vanguard Total Stock Market', ticker: 'VTI', expectedReturn: 9.5, expenseRatio: 0.03 },
    { name: 'Vanguard Total International', ticker: 'VTIAX', expectedReturn: 8, expenseRatio: 0.11 },
    { name: 'iShares Core MSCI Total International', ticker: 'IXUS', expectedReturn: 7.5, expenseRatio: 0.09 },
    { name: 'Vanguard Real Estate ETF', ticker: 'VNQ', expectedReturn: 8.5, expenseRatio: 0.12 },
    { name: 'iShares Core U.S. Aggregate Bond', ticker: 'AGG', expectedReturn: 4, expenseRatio: 0.03 }
  ];

  return (
    <>
      <SEO 
        title="ETF Calculator - Exchange Traded Fund Portfolio Performance Calculator"
        description="Calculate ETF portfolio returns, diversification benefits, and long-term growth. Compare ETF expense ratios, allocation strategies, and optimize your ETF investments."
        keywords="ETF calculator, exchange traded fund calculator, ETF portfolio calculator, ETF returns calculator, passive investing calculator, index fund calculator, ETF allocation calculator"
        canonical="https://rupeesmart.com/etf-calculator"
      />
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">ETF Comparison Calculator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compare total returns across multiple ETFs, including fees and growth projections over your investment horizon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Investment Parameters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Investment Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
                      <Input
                        id="initialInvestment"
                        type="number"
                        value={initialInvestment}
                        onChange={(e) => setInitialInvestment(Number(e.target.value) || 0)}
                        placeholder="10000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="holdingPeriod">Holding Period (Years)</Label>
                      <Input
                        id="holdingPeriod"
                        type="number"
                        value={holdingPeriod}
                        onChange={(e) => setHoldingPeriod(Number(e.target.value) || 1)}
                        placeholder="10"
                      />
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-gray-700 font-medium">Portfolio Allocation</div>
                    <div className={`text-gray-800 font-bold ${totalAllocation !== 100 ? 'text-red-600' : 'text-green-600'}`}>
                      {totalAllocation}% {totalAllocation !== 100 && '(Should equal 100%)'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ETF Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-700 flex justify-between items-center">
                  ETF Portfolio
                  <button 
                    onClick={addETF}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {etfs.map((etf, index) => (
                    <div key={etf.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-medium text-gray-800">ETF #{index + 1}</span>
                        {etfs.length > 1 && (
                          <button 
                            onClick={() => removeETF(etf.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Name</Label>
                          <Input
                            value={etf.name}
                            onChange={(e) => updateETF(etf.id, 'name', e.target.value)}
                            placeholder="ETF Name"
                          />
                        </div>
                        <div>
                          <Label>Ticker</Label>
                          <Input
                            value={etf.ticker}
                            onChange={(e) => updateETF(etf.id, 'ticker', e.target.value.toUpperCase())}
                            placeholder="SPY"
                          />
                        </div>
                        <div>
                          <Label>Expected Return (%)</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={etf.expectedReturn}
                            onChange={(e) => updateETF(etf.id, 'expectedReturn', Number(e.target.value) || 0)}
                            placeholder="10"
                          />
                        </div>
                        <div>
                          <Label>Expense Ratio (%)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={etf.expenseRatio}
                            onChange={(e) => updateETF(etf.id, 'expenseRatio', Number(e.target.value) || 0)}
                            placeholder="0.09"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label>Portfolio Allocation (%)</Label>
                          <Input
                            type="number"
                            value={etf.allocation}
                            onChange={(e) => updateETF(etf.id, 'allocation', Number(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular ETFs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-green-700">Popular ETFs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {popularETFs.map((etf, index) => (
                    <div key={index} className="p-2 bg-green-50 rounded-lg text-sm">
                      <div className="font-medium text-green-800">{etf.ticker} - {etf.name}</div>
                      <div className="text-green-600">
                        Expected: {etf.expectedReturn}% | Expense: {etf.expenseRatio}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Portfolio Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-blue-700 font-medium">Initial Investment</div>
                      <div className="text-blue-800 font-bold text-lg">
                        ${initialInvestment.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-green-700 font-medium">Final Value</div>
                      <div className="text-green-800 font-bold text-lg">
                        ${totalFinalValue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                    <div className="text-orange-700 font-bold">Portfolio CAGR</div>
                    <div className="text-orange-800 font-bold text-xl">
                      {(portfolioCAGR * 100).toFixed(2)}% per year
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-purple-700 font-medium">Total Return</div>
                      <div className="text-purple-800 font-bold text-lg">
                        ${totalReturn.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="text-red-700 font-medium">Total Fees</div>
                      <div className="text-red-800 font-bold text-lg">
                        ${totalFees.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Portfolio Growth Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        `$${Number(value).toLocaleString()}`,
                        name === 'portfolioValue' ? 'Portfolio Value' : 'Total Return'
                      ]}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="portfolioValue" stroke="#3b82f6" strokeWidth={3} />
                    <Line type="monotone" dataKey="totalReturn" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* ETF Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">ETF Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={portfolioPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ticker" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Final Value']}
                    />
                    <Bar dataKey="finalValue" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* ETF Details Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Individual ETF Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {portfolioPerformance.map((etf, index) => (
                    <div key={etf.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-800 mb-2">
                        {etf.ticker} - {etf.name}
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">Investment:</span>
                          <span className="font-medium ml-1">${etf.investmentAmount.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Final Value:</span>
                          <span className="font-medium ml-1">${etf.finalValue.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Net Return:</span>
                          <span className="font-medium ml-1">{etf.annualizedReturn.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Investment Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">ETF Investment Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-1">Diversification</h4>
                    <p className="text-blue-600">
                      ETFs provide instant diversification across hundreds or thousands of stocks.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-1">Low Costs</h4>
                    <p className="text-green-600">
                      Look for ETFs with expense ratios below 0.20% for better long-term returns.
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-700 mb-1">Tax Efficiency</h4>
                    <p className="text-orange-600">
                      ETFs are generally more tax-efficient than actively managed mutual funds.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ETFCalculator;