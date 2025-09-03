"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { SEO } from "../components/SEO";

export default function LumpsumCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [inflationRate, setInflationRate] = useState(3);

  // Calculate lumpsum investment returns
  const futureValue = investmentAmount * Math.pow(1 + expectedReturn / 100, investmentPeriod);
  const totalGains = futureValue - investmentAmount;
  const realValue = futureValue / Math.pow(1 + inflationRate / 100, investmentPeriod);
  const realGains = realValue - investmentAmount;

  // Calculate CAGR
  const cagr = ((futureValue / investmentAmount) ** (1 / investmentPeriod) - 1) * 100;

  // Yearly growth data
  const yearlyData = [];
  for (let year = 0; year <= investmentPeriod; year++) {
    const nominalValue = investmentAmount * Math.pow(1 + expectedReturn / 100, year);
    const inflationAdjusted = nominalValue / Math.pow(1 + inflationRate / 100, year);
    
    yearlyData.push({
      year: year,
      nominalValue: Math.round(nominalValue),
      realValue: Math.round(inflationAdjusted),
      principal: investmentAmount
    });
  }

  // Chart data for breakdown
  const breakdownData = [
    { name: 'Initial Investment', value: investmentAmount, fill: '#3b82f6' },
    { name: 'Capital Gains', value: totalGains, fill: '#10b981' }
  ];

  // Returns comparison data
  const comparisonData = [
    { 
      name: 'Conservative (8%)', 
      value: investmentAmount * Math.pow(1.08, investmentPeriod),
      color: '#ef4444'
    },
    { 
      name: 'Moderate (12%)', 
      value: investmentAmount * Math.pow(1.12, investmentPeriod),
      color: '#f59e0b' 
    },
    { 
      name: 'Aggressive (15%)', 
      value: investmentAmount * Math.pow(1.15, investmentPeriod),
      color: '#10b981' 
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <SEO 
        title="Lumpsum Calculator - One-time Investment Calculator"
        description="Calculate lumpsum investment returns with compound growth. Compare different return rates and analyze inflation impact on investments."
        keywords="lumpsum calculator, one-time investment, compound interest, investment calculator, CAGR calculator, inflation impact"
        canonical="https://dollarmento.com/lumpsum-calculator"
      />
      
      <div className="w-full px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Lumpsum Calculator</h1>
          <p className="text-lg text-gray-600 w-full">
            Calculate the future value of your one-time investments with compound growth and inflation analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-500 rounded"></span>
                  Investment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="investmentAmount" className="flex items-center gap-1">
                    One-time Investment Amount
                    <span className="text-blue-500 cursor-help" title="Total amount you want to invest at once">ⓘ</span>
                  </Label>
                  <Input
                    id="investmentAmount"
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="mt-1"
                    min="1000"
                    step="1000"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expectedReturn" className="flex items-center gap-1">
                      Expected Annual Return (%)
                      <span className="text-blue-500 cursor-help" title="Expected annual rate of return on your investment">ⓘ</span>
                    </Label>
                    <Input
                      id="expectedReturn"
                      type="number"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="mt-1"
                      min="1"
                      max="30"
                      step="0.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="investmentPeriod" className="flex items-center gap-1">
                      Investment Period (Years)
                      <span className="text-blue-500 cursor-help" title="How long you plan to stay invested">ⓘ</span>
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
                <div>
                  <Label htmlFor="inflationRate" className="flex items-center gap-1">
                    Expected Inflation Rate (%)
                    <span className="text-blue-500 cursor-help" title="Expected annual inflation rate to calculate real returns">ⓘ</span>
                  </Label>
                  <Input
                    id="inflationRate"
                    type="number"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(Number(e.target.value))}
                    className="mt-1"
                    min="0"
                    max="15"
                    step="0.5"
                  />
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
                    <span>Enter the one-time investment amount</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Set expected annual return rate</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Choose investment period and inflation rate</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Review future value and real returns</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Investment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Investment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(investmentAmount)}</div>
                    <div className="text-sm text-gray-600">Initial Investment</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(futureValue)}</div>
                    <div className="text-sm text-gray-600">Future Value</div>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">{formatCurrency(totalGains)}</div>
                    <div className="text-sm text-gray-600">Total Gains</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatNumber(cagr, 1)}%</div>
                    <div className="text-sm text-gray-600">CAGR</div>
                  </div>
                </div>
                
                {/* Inflation Impact */}
                <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{formatCurrency(realValue)}</div>
                    <div className="text-sm text-gray-600">Inflation-Adjusted Value</div>
                    <div className="text-xs text-orange-600 mt-1">
                      Real purchasing power after {inflationRate}% inflation
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Breakdown Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Investment vs Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={breakdownData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {breakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} stroke="#fff" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Growth Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip 
                        formatter={(value, name) => [formatCurrency(Number(value)), name]}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="principal" stroke="#94a3b8" name="Principal" strokeWidth={2} strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="nominalValue" stroke="#10b981" name="Nominal Value" strokeWidth={3} />
                      <Line type="monotone" dataKey="realValue" stroke="#f59e0b" name="Real Value" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Returns Comparison */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Returns Comparison (Different Risk Levels)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Educational Content Section */}
        <div className="w-full mt-12 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                💡 Lumpsum Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• <strong>Immediate Deployment:</strong> Full amount working immediately</p>
              <p>• <strong>Compound Growth:</strong> Maximum time for compounding</p>
              <p>• <strong>Market Timing:</strong> Benefit from favorable market conditions</p>
              <p>• <strong>Lower Costs:</strong> Single transaction cost</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                📊 Investment Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• <strong>Risk Assessment:</strong> Align with risk tolerance</p>
              <p>• <strong>Diversification:</strong> Spread across asset classes</p>
              <p>• <strong>Time Horizon:</strong> Longer periods reduce risk</p>
              <p>• <strong>Review Regularly:</strong> Monitor and rebalance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                ⚖️ Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• Past performance doesn't guarantee future returns</p>
              <p>• Consider inflation impact on real returns</p>
              <p>• Market volatility affects short-term returns</p>
              <p>• Consult financial advisor for personalized advice</p>
            </CardContent>
          </Card>

        {/* Calculator Advice */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              💡 Calculator Advice
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-xs">📊</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Look at different situations</h4>
                <p className="text-gray-600">Change the input values to see how they change the results. This can help you make better choices about money.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 text-xs">🔄</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Updates on a regular basis</h4>
                <p className="text-gray-600">The rules about money change over time. When interest rates, inflation, or other things change, don't forget to recalculate.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}