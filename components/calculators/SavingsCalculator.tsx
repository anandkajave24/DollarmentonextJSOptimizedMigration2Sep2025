import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';


const SavingsCalculator: React.FC = () => {
  const [initialDeposit, setInitialDeposit] = useState<number>(5000);
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(300);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(4.5);
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('monthly');
  const [savingsTermYears, setSavingsTermYears] = useState<number>(5);

  const calculateSavingsGrowth = () => {
    const monthlyRate = annualInterestRate / 100 / 12;
    const compoundingPeriods = compoundingFrequency === 'daily' ? 365 : 
                             compoundingFrequency === 'monthly' ? 12 : 
                             compoundingFrequency === 'quarterly' ? 4 : 1;
    
    const periodicRate = annualInterestRate / 100 / compoundingPeriods;
    const totalPeriods = savingsTermYears * compoundingPeriods;
    
    const yearlyData = [];
    let currentBalance = initialDeposit;
    let totalContributions = initialDeposit;
    let totalInterest = 0;

    for (let year = 0; year <= savingsTermYears; year++) {
      if (year > 0) {
        // Add monthly deposits and calculate interest
        for (let month = 1; month <= 12; month++) {
          currentBalance += monthlyDeposit;
          totalContributions += monthlyDeposit;
          
          // Calculate compound interest based on frequency
          const monthlyCompounds = compoundingPeriods / 12;
          for (let i = 0; i < monthlyCompounds; i++) {
            const interestEarned = currentBalance * periodicRate;
            currentBalance += interestEarned;
            totalInterest += interestEarned;
          }
        }
      }

      yearlyData.push({
        year,
        balance: Math.round(currentBalance),
        contributions: totalContributions,
        interest: Math.round(totalInterest)
      });
    }

    return yearlyData;
  };

  const projectionData = calculateSavingsGrowth();
  const finalResult = projectionData[projectionData.length - 1];
  const totalContributions = initialDeposit + (monthlyDeposit * 12 * savingsTermYears);
  const totalInterestEarned = finalResult.balance - totalContributions;
  const effectiveRate = Math.pow(finalResult.balance / initialDeposit, 1 / savingsTermYears) - 1;

  // Inflation adjustment (assuming 3% inflation)
  const inflationRate = 3;
  const realValue = finalResult.balance / Math.pow(1 + inflationRate / 100, savingsTermYears);

  // Compare different interest rates
  const rateComparison = [3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0].map(rate => {
    const monthlyRate = rate / 100 / 12;
    let balance = initialDeposit;
    
    for (let month = 1; month <= savingsTermYears * 12; month++) {
      balance += monthlyDeposit;
      balance *= (1 + monthlyRate);
    }
    
    return {
      rate: `${rate}%`,
      finalBalance: Math.round(balance),
      totalInterest: Math.round(balance - totalContributions)
    };
  });

  // High-yield savings account examples
  const highYieldAccounts = [
    { bank: 'Marcus by Goldman Sachs', apy: 4.50, minBalance: 0 },
    { bank: 'American Express Personal Savings', apy: 4.35, minBalance: 0 },
    { bank: 'Discover Online Savings', apy: 4.30, minBalance: 0 },
    { bank: 'Capital One 360 Performance', apy: 4.25, minBalance: 0 },
    { bank: 'Ally Online Savings', apy: 4.20, minBalance: 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Savings Calculator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Project how your savings account will grow with regular deposits and compound interest over time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Savings Parameters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Savings Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="initialDeposit">Initial Deposit ($)</Label>
                      <Input
                        id="initialDeposit"
                        type="number"
                        value={initialDeposit}
                        onChange={(e) => setInitialDeposit(Number(e.target.value) || 0)}
                        placeholder="5000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthlyDeposit">Monthly Deposit ($)</Label>
                      <Input
                        id="monthlyDeposit"
                        type="number"
                        value={monthlyDeposit}
                        onChange={(e) => setMonthlyDeposit(Number(e.target.value) || 0)}
                        placeholder="300"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="annualInterestRate">Annual Interest Rate (%)</Label>
                      <Input
                        id="annualInterestRate"
                        type="number"
                        step="0.1"
                        value={annualInterestRate}
                        onChange={(e) => setAnnualInterestRate(Number(e.target.value) || 0)}
                        placeholder="4.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="compounding">Compounding Frequency</Label>
                      <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="annually">Annually</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="savingsTermYears">Savings Term (Years)</Label>
                    <Input
                      id="savingsTermYears"
                      type="number"
                      value={savingsTermYears}
                      onChange={(e) => setSavingsTermYears(Number(e.target.value) || 1)}
                      placeholder="5"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* High-Yield Savings Accounts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-green-700">High-Yield Savings Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {highYieldAccounts.map((account, index) => (
                    <div 
                      key={index} 
                      className="p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                      onClick={() => setAnnualInterestRate(account.apy)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-green-800">{account.bank}</div>
                          <div className="text-sm text-green-600">
                            Min Balance: {account.minBalance === 0 ? 'None' : `$${account.minBalance.toLocaleString()}`}
                          </div>
                        </div>
                        <div className="text-green-800 font-bold">{account.apy}% APY</div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Click on any account to use its APY in your calculation
                </p>
              </CardContent>
            </Card>

            {/* Savings Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-700">Common Savings Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-700">Emergency Fund</h4>
                    <p className="text-sm text-blue-600">Save 3-6 months of expenses ($15,000 - $30,000)</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-700">House Down Payment</h4>
                    <p className="text-sm text-orange-600">20% of home price ($60,000 for $300K home)</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-700">Vacation Fund</h4>
                    <p className="text-sm text-purple-600">Plan ahead for travel ($5,000 - $15,000)</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-700">New Car Fund</h4>
                    <p className="text-sm text-green-600">Avoid financing with cash purchase ($25,000 - $40,000)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Savings Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Savings Projection</CardTitle>
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
                      <div className="text-green-700 font-medium">Interest Earned</div>
                      <div className="text-green-800 font-bold text-lg">
                        ${totalInterestEarned.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                    <div className="text-orange-700 font-bold text-xl">Final Balance</div>
                    <div className="text-orange-800 font-bold text-2xl">
                      ${finalResult.balance.toLocaleString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-purple-700 font-medium">Effective Rate</div>
                      <div className="text-purple-800 font-bold text-lg">
                        {(effectiveRate * 100).toFixed(2)}% annually
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-gray-700 font-medium">Real Value (Inflation Adj.)</div>
                      <div className="text-gray-800 font-bold text-lg">
                        ${realValue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Savings Growth Over Time</CardTitle>
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
                        name === 'interest' ? 'Interest Earned' : 'Total Balance'
                      ]}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="contributions" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="interest" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="balance" stroke="#f59e0b" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Interest Rate Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Interest Rate Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={rateComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rate" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Final Balance']}
                    />
                    <Bar dataKey="finalBalance" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 text-sm text-gray-600">
                  <p className="font-medium">Impact of Higher Rates:</p>
                  <p>Increasing your rate by 1% could add <span className="font-bold text-green-600">
                    ${(rateComparison[5].finalBalance - rateComparison[3].finalBalance).toLocaleString()}
                  </span> to your savings over {savingsTermYears} years.</p>
                </div>
              </CardContent>
            </Card>

            {/* Savings Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Savings Optimization Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-1">Automate Your Savings</h4>
                    <p className="text-green-600">
                      Set up automatic transfers to your savings account on payday to ensure consistent growth.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-1">Shop for Higher Rates</h4>
                    <p className="text-blue-600">
                      Online banks typically offer higher interest rates than traditional brick-and-mortar banks.
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-700 mb-1">Start Early</h4>
                    <p className="text-orange-600">
                      The power of compound interest is maximized with time. Start saving as early as possible.
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-700 mb-1">Consider Inflation</h4>
                    <p className="text-purple-600">
                      Ensure your interest rate beats inflation to maintain purchasing power over time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsCalculator;