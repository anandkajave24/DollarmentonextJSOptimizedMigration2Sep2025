import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SEO } from "../components/SEO";
import { Helmet } from 'react-helmet';

export default function InflationCalculator() {
  const [presentValue, setPresentValue] = useState(1000);
  const [inflationRate, setInflationRate] = useState(3);
  const [timePeriod, setTimePeriod] = useState(20);
  const [targetYear, setTargetYear] = useState(2044);

  // Calculations
  const futureValue = presentValue * Math.pow(1 + inflationRate / 100, timePeriod);
  const purchasingPowerLoss = presentValue - (presentValue / Math.pow(1 + inflationRate / 100, timePeriod));
  const totalInflation = ((futureValue - presentValue) / presentValue) * 100;
  const requiredIncomeToday = presentValue / Math.pow(1 + inflationRate / 100, timePeriod);

  // Chart data
  const chartData = [];
  for (let year = 0; year <= timePeriod; year++) {
    const inflatedValue = presentValue * Math.pow(1 + inflationRate / 100, year);
    const realValue = presentValue / Math.pow(1 + inflationRate / 100, year);
    
    chartData.push({
      year: new Date().getFullYear() + year,
      inflatedValue,
      realValue,
      baseline: presentValue
    });
  }

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
    <>
      <Helmet>
        <title>Inflation Calculator - Calculate Future Value & Purchasing Power Impact | DollarMento</title>
        <meta name="description" content="Calculate the impact of inflation on purchasing power over time. See how inflation affects the real value of money and plan for future expenses." />
        <meta name="keywords" content="inflation calculator, purchasing power calculator, future value inflation calculator, cost of living calculator, inflation impact calculator" />
        <link rel="canonical" href="https://dollarmento.com/inflation-calculator" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
      <SEO 
        title="Inflation Calculator - Calculate Impact on Purchasing Power"
        description="Calculate how inflation affects your money's purchasing power over time. Plan for future expenses and understand the real cost of inflation."
        keywords="inflation calculator, purchasing power, cost of living, inflation impact, money value, economic planning"
        canonical="https://dollarmento.com/inflation-calculator"
      />
      
      <div className="w-full px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Inflation Calculator</h1>
          <p className="text-lg text-gray-600 w-full">
            Calculate how inflation affects your money's purchasing power over time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-500 rounded"></span>
                  Inflation Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="presentValue" className="flex items-center gap-1">
                      Current Amount ($)
                      <span className="text-blue-500 cursor-help" title="Current value or cost in today's dollars">ⓘ</span>
                    </Label>
                    <Input
                      id="presentValue"
                      type="number"
                      value={presentValue || ''}
                      onChange={(e) => setPresentValue(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                      className="mt-1"
                      min="1"
                      step="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="inflationRate" className="flex items-center gap-1">
                      Annual Inflation Rate (%)
                      <span className="text-blue-500 cursor-help" title="Expected average annual inflation rate">ⓘ</span>
                    </Label>
                    <Input
                      id="inflationRate"
                      type="number"
                      value={inflationRate || ''}
                      onChange={(e) => setInflationRate(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                      className="mt-1"
                      min="0"
                      max="20"
                      step="0.1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timePeriod" className="flex items-center gap-1">
                      Time Period (Years)
                      <span className="text-blue-500 cursor-help" title="Number of years to calculate inflation impact">ⓘ</span>
                    </Label>
                    <Input
                      id="timePeriod"
                      type="number"
                      value={timePeriod}
                      onChange={(e) => {
                        const years = e.target.value === '' ? 0 : Number(e.target.value) || 0;
                        setTimePeriod(years);
                        setTargetYear(new Date().getFullYear() + years);
                      }}
                      className="mt-1"
                      min="1"
                      max="50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetYear">Target Year</Label>
                    <Input
                      id="targetYear"
                      type="number"
                      value={targetYear}
                      onChange={(e) => {
                        const year = e.target.value === '' ? 0 : Number(e.target.value) || 0;
                        setTargetYear(year);
                        setTimePeriod(year - new Date().getFullYear());
                      }}
                      className="mt-1"
                      min={new Date().getFullYear()}
                      max={new Date().getFullYear() + 50}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Historical Inflation Rates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-yellow-500 rounded"></span>
                  US Historical Inflation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>2020-2024 Average:</span>
                    <span className="font-medium">4.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2010-2019 Average:</span>
                    <span className="font-medium">1.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2000-2009 Average:</span>
                    <span className="font-medium">2.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Long-term Average (1926-2023):</span>
                    <span className="font-medium">2.9%</span>
                  </div>
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
                    <span>Enter the current cost or amount in today's dollars</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Set the expected inflation rate (use historical data)</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Choose your time horizon or target year</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Review the impact on purchasing power</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Inflation Impact Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-red-500 rounded"></span>
                  Inflation Impact in {targetYear}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{formatCurrency(futureValue)}</div>
                    <div className="text-sm text-gray-600">Future Cost</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{formatCurrency(purchasingPowerLoss)}</div>
                    <div className="text-sm text-gray-600">Purchasing Power Loss</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatNumber(totalInflation, 1)}%</div>
                    <div className="text-sm text-gray-600">Total Inflation</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(requiredIncomeToday)}</div>
                    <div className="text-sm text-gray-600">Equivalent Value Today</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inflation Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Inflation Impact Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line type="monotone" dataKey="baseline" stroke="#6b7280" strokeWidth={2} strokeDasharray="5 5" name="Today's Value" />
                      <Line type="monotone" dataKey="inflatedValue" stroke="#ef4444" strokeWidth={2} name="Future Cost" />
                      <Line type="monotone" dataKey="realValue" stroke="#3b82f6" strokeWidth={2} name="Real Value" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 border-dashed border-2"></div>
                    <span>Today's Value</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Future Cost</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>Real Value</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real-World Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Real-World Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="font-medium text-sm mb-1">What costs {formatCurrency(presentValue)} today will cost:</div>
                    <div className="text-lg font-bold text-yellow-700">{formatCurrency(futureValue)} in {targetYear}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Annual increase needed:</div>
                      <div className="font-medium">{formatNumber(inflationRate)}% per year</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Purchasing power in {targetYear}:</div>
                      <div className="font-medium">{formatNumber((1 / Math.pow(1 + inflationRate / 100, timePeriod)) * 100, 1)}%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Protection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Protect Against Inflation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium mb-1">Required Investment Return:</div>
                    <div className="text-lg font-bold text-blue-700">{formatNumber(inflationRate + 2)}% annually</div>
                    <div className="text-xs text-gray-600">To beat inflation by 2%</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>I Bonds (inflation-adjusted):</span>
                      <span className="font-medium text-green-600">Protected</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TIPS (Treasury securities):</span>
                      <span className="font-medium text-green-600">Protected</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Real Estate (historically):</span>
                      <span className="font-medium text-yellow-600">Partial hedge</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stock Market (S&P 500):</span>
                      <span className="font-medium text-green-600">Long-term hedge</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="w-full mt-12 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                💡 Understanding Inflation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• <strong>Definition:</strong> General increase in prices over time</p>
              <p>• <strong>Measurement:</strong> Consumer Price Index (CPI)</p>
              <p>• <strong>Causes:</strong> Demand, supply, monetary policy</p>
              <p>• <strong>Target Rate:</strong> Fed targets 2% annually</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                📊 Planning Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• <strong>Conservative:</strong> Use 3-4% inflation assumption</p>
              <p>• <strong>Long-term:</strong> Consider compound effects</p>
              <p>• <strong>Income Planning:</strong> Ensure raises match inflation</p>
              <p>• <strong>Retirement:</strong> Plan for 25-30 years of inflation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                ⚖️ Inflation Hedges
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• I Bonds and TIPS for guaranteed protection</p>
              <p>• Real estate as historical inflation hedge</p>
              <p>• Stocks for long-term inflation beating</p>
              <p>• Avoid cash and fixed-rate bonds long-term</p>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </>
  );
}