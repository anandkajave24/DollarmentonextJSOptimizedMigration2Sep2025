import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { SEO } from '../SEO';


const MutualFundCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [expectedReturn, setExpectedReturn] = useState<number>(8);
  const [expenseRatio, setExpenseRatio] = useState<number>(0.75);
  const [investmentDuration, setInvestmentDuration] = useState<number>(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('monthly');

  const calculateMutualFundGrowth = () => {
    const years = investmentDuration;
    const monthlyRate = expectedReturn / 100 / 12;
    const expenseRate = expenseRatio / 100;
    const compoundingPeriods = compoundingFrequency === 'monthly' ? 12 : 
                             compoundingFrequency === 'quarterly' ? 4 : 1;
    
    const yearlyData = [];
    let currentValue = initialInvestment;
    let totalContributions = initialInvestment;
    let totalFees = 0;

    for (let year = 0; year <= years; year++) {
      if (year > 0) {
        // Add monthly contributions throughout the year
        for (let month = 1; month <= 12; month++) {
          currentValue += monthlyContribution;
          totalContributions += monthlyContribution;
          
          // Apply monthly growth
          currentValue *= (1 + monthlyRate);
        }
        
        // Subtract annual expense ratio
        const annualFee = currentValue * expenseRate;
        currentValue -= annualFee;
        totalFees += annualFee;
      }

      yearlyData.push({
        year,
        value: Math.round(currentValue),
        contributions: totalContributions,
        growth: Math.round(currentValue - totalContributions),
        fees: Math.round(totalFees),
        netValue: Math.round(currentValue)
      });
    }

    return yearlyData;
  };

  const calculateWithoutFees = () => {
    const years = investmentDuration;
    const monthlyRate = expectedReturn / 100 / 12;
    
    let currentValue = initialInvestment;
    
    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        currentValue += monthlyContribution;
        currentValue *= (1 + monthlyRate);
      }
    }
    
    return currentValue;
  };

  const projectionData = calculateMutualFundGrowth();
  const finalValue = projectionData[projectionData.length - 1];
  const valueWithoutFees = calculateWithoutFees();
  const totalFeeImpact = valueWithoutFees - finalValue.netValue;
  const totalContributions = initialInvestment + (monthlyContribution * 12 * investmentDuration);

  // Comparison with different expense ratios
  const expenseComparison = [0.1, 0.5, 0.75, 1.0, 1.5].map(ratio => {
    const tempExpenseRatio = ratio;
    const years = investmentDuration;
    const monthlyRate = expectedReturn / 100 / 12;
    
    let currentValue = initialInvestment;
    let totalFees = 0;
    
    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        currentValue += monthlyContribution;
        currentValue *= (1 + monthlyRate);
      }
      const annualFee = currentValue * (tempExpenseRatio / 100);
      currentValue -= annualFee;
      totalFees += annualFee;
    }
    
    return {
      expenseRatio: `${ratio}%`,
      finalValue: Math.round(currentValue),
      totalFees: Math.round(totalFees),
      feeImpact: Math.round(valueWithoutFees - currentValue)
    };
  });

  return (
    <>
      <SEO 
        title="Mutual Fund Calculator - Investment Growth & SIP Returns Calculator"
        description="Calculate mutual fund returns, SIP investments, and long-term wealth creation. Compare fund performance, expense ratios, and optimize your mutual fund portfolio."
        keywords="mutual fund calculator, SIP calculator, mutual fund returns calculator, investment calculator, fund performance calculator, wealth building calculator, SIP investment calculator"
        canonical="https://rupeesmart.com/mutual-fund-calculator"
      />
      <div className="w-full p-6 space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Mutual Fund Investment Calculator</h1>
          <p className="text-sm text-gray-600">
            Forecast the long-term value of your mutual fund investments considering compounding growth and expense ratios.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Input Panel - 40% width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Investment Details */}
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
                      <Label htmlFor="monthlyContribution">Monthly Investment ($)</Label>
                      <Input
                        id="monthlyContribution"
                        type="number"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)}
                        placeholder="500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                      <Input
                        id="expectedReturn"
                        type="number"
                        step="0.1"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(Number(e.target.value) || 0)}
                        placeholder="8.0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expenseRatio">Expense Ratio (%)</Label>
                      <Input
                        id="expenseRatio"
                        type="number"
                        step="0.01"
                        value={expenseRatio}
                        onChange={(e) => setExpenseRatio(Number(e.target.value) || 0)}
                        placeholder="0.75"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="investmentDuration">Investment Duration (Years)</Label>
                      <Input
                        id="investmentDuration"
                        type="number"
                        value={investmentDuration}
                        onChange={(e) => setInvestmentDuration(Number(e.target.value) || 1)}
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="compounding">Compounding Frequency</Label>
                      <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="annually">Annually</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fund Type Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-700">Common Fund Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 rounded-lg cursor-pointer" 
                       onClick={() => {setExpectedReturn(10); setExpenseRatio(0.5);}}>
                    <h4 className="font-semibold text-green-700">Index Funds</h4>
                    <p className="text-green-600">Expected Return: ~10% | Expense Ratio: ~0.5%</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg cursor-pointer"
                       onClick={() => {setExpectedReturn(8); setExpenseRatio(0.75);}}>
                    <h4 className="font-semibold text-blue-700">Large Cap Funds</h4>
                    <p className="text-blue-600">Expected Return: ~8% | Expense Ratio: ~0.75%</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg cursor-pointer"
                       onClick={() => {setExpectedReturn(12); setExpenseRatio(1.2);}}>
                    <h4 className="font-semibold text-orange-700">Small Cap Funds</h4>
                    <p className="text-orange-600">Expected Return: ~12% | Expense Ratio: ~1.2%</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg cursor-pointer"
                       onClick={() => {setExpectedReturn(6); setExpenseRatio(0.6);}}>
                    <h4 className="font-semibold text-purple-700">Bond Funds</h4>
                    <p className="text-purple-600">Expected Return: ~6% | Expense Ratio: ~0.6%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel - 60% width */}
          <div className="lg:col-span-3 space-y-6">
            {/* Investment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Investment Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-blue-700 font-medium">Total Contributions</div>
                      <div className="text-blue-800 font-bold text-lg">
                        ${totalContributions.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-green-700 font-medium">Investment Growth</div>
                      <div className="text-green-800 font-bold text-lg">
                        ${finalValue.growth.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                    <div className="text-orange-700 font-bold text-xl">Final Portfolio Value</div>
                    <div className="text-orange-800 font-bold text-2xl">
                      ${finalValue.netValue.toLocaleString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="text-red-700 font-medium">Total Fees Paid</div>
                      <div className="text-red-800 font-bold text-lg">
                        ${finalValue.fees.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-purple-700 font-medium">Fee Impact</div>
                      <div className="text-purple-800 font-bold text-lg">
                        ${totalFeeImpact.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Portfolio Growth Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        `$${Number(value).toLocaleString()}`,
                        name === 'contributions' ? 'Contributions' :
                        name === 'growth' ? 'Growth' :
                        name === 'netValue' ? 'Net Value' : name
                      ]}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="contributions" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="growth" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="netValue" stroke="#f59e0b" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Expense Ratio Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Expense Ratio Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={expenseComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="expenseRatio" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Final Value']}
                    />
                    <Bar dataKey="finalValue" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 text-sm text-gray-600">
                  <p className="font-medium">Key Insight:</p>
                  <p>Reducing expense ratio by 0.5% could save you <span className="font-bold text-green-600">
                    ${(expenseComparison[1].finalValue - expenseComparison[3].finalValue).toLocaleString()}
                  </span> over {investmentDuration} years.</p>
                </div>
              </CardContent>
            </Card>

            {/* Investment Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Advice on how to optimize</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-1">Pick funds that don't cost much</h4>
                    <p className="text-green-600">
                      Find funds with expense ratios that are less than 0.5%. Most of the time, index funds have the lowest fees.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-1">Investing in SIPs on a regular basis</h4>
                    <p className="text-blue-600">
                      Regular monthly investments benefit from rupee-cost averaging and compound growth.
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-700 mb-1">A Long-Term View</h4>
                    <p className="text-orange-600">
                      Over periods of 10 years or more, the power of compounding becomes very important.
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-700 mb-1">Different kinds of things</h4>
                    <p className="text-purple-600">
                      Think about investing in a mix of large-cap, mid-cap, and international funds.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default MutualFundCalculator;