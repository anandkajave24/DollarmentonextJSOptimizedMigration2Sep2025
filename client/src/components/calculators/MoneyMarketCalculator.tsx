import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface TieredRate {
  threshold: number;
  rate: number;
}

const MoneyMarketCalculator: React.FC = () => {
  const [initialBalance, setInitialBalance] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [savingsDuration, setSavingsDuration] = useState<number>(3);
  const [selectedBank, setSelectedBank] = useState<string>('custom');
  const [useTieredRates, setUseTieredRates] = useState<boolean>(true);
  const [flatRate, setFlatRate] = useState<number>(4.5);

  // Popular money market accounts with tiered rates
  const moneyMarketAccounts = {
    'ally': {
      name: 'Ally Money Market',
      rates: [{ threshold: 0, rate: 4.20 }],
      minBalance: 0
    },
    'capitalone': {
      name: 'Capital One 360 Money Market',
      rates: [{ threshold: 0, rate: 4.25 }],
      minBalance: 0
    },
    'discover': {
      name: 'Discover Money Market',
      rates: [{ threshold: 0, rate: 4.30 }],
      minBalance: 2500
    },
    'schwab': {
      name: 'Charles Schwab Money Market',
      rates: [
        { threshold: 0, rate: 3.50 },
        { threshold: 25000, rate: 4.00 },
        { threshold: 100000, rate: 4.25 }
      ],
      minBalance: 0
    },
    'fidelity': {
      name: 'Fidelity Money Market',
      rates: [
        { threshold: 0, rate: 3.00 },
        { threshold: 10000, rate: 4.00 },
        { threshold: 100000, rate: 4.50 }
      ],
      minBalance: 2500
    },
    'custom': {
      name: 'Custom Settings',
      rates: [
        { threshold: 0, rate: 3.00 },
        { threshold: 10000, rate: 4.00 },
        { threshold: 50000, rate: 4.50 }
      ],
      minBalance: 0
    }
  };

  const [customRates, setCustomRates] = useState<TieredRate[]>(moneyMarketAccounts.custom.rates);

  const getCurrentAccount = () => moneyMarketAccounts[selectedBank as keyof typeof moneyMarketAccounts] || moneyMarketAccounts.custom;
  const currentRates = selectedBank === 'custom' ? customRates : getCurrentAccount().rates;

  const calculateTieredInterest = (balance: number, rates: TieredRate[]) => {
    let totalInterest = 0;
    let remainingBalance = balance;

    // Sort rates by threshold in descending order
    const sortedRates = [...rates].sort((a, b) => b.threshold - a.threshold);

    for (let i = 0; i < sortedRates.length; i++) {
      const currentTier = sortedRates[i];
      const nextTier = sortedRates[i + 1];
      
      if (remainingBalance > currentTier.threshold) {
        const tierBalance = nextTier 
          ? Math.min(remainingBalance, remainingBalance - nextTier.threshold)
          : remainingBalance - currentTier.threshold;
        
        totalInterest += tierBalance * (currentTier.rate / 100 / 12);
        remainingBalance -= tierBalance;
      }
    }

    return totalInterest;
  };

  const calculateMoneyMarketGrowth = () => {
    const yearlyData = [];
    let currentBalance = initialBalance;
    let totalContributions = initialBalance;
    let totalInterest = 0;

    for (let year = 0; year <= savingsDuration; year++) {
      if (year > 0) {
        for (let month = 1; month <= 12; month++) {
          // Add monthly contribution
          currentBalance += monthlyContribution;
          totalContributions += monthlyContribution;
          
          // Calculate interest based on rate structure
          let monthlyInterest;
          if (useTieredRates) {
            monthlyInterest = calculateTieredInterest(currentBalance, currentRates);
          } else {
            monthlyInterest = currentBalance * (flatRate / 100 / 12);
          }
          
          currentBalance += monthlyInterest;
          totalInterest += monthlyInterest;
        }
      }

      yearlyData.push({
        year,
        balance: Math.round(currentBalance),
        contributions: totalContributions,
        interest: Math.round(totalInterest),
        effectiveRate: year > 0 ? ((currentBalance / initialBalance) ** (1/year) - 1) * 100 : 0
      });
    }

    return yearlyData;
  };

  const projectionData = calculateMoneyMarketGrowth();
  const finalResult = projectionData[projectionData.length - 1];
  const totalContributions = initialBalance + (monthlyContribution * 12 * savingsDuration);

  // Comparison between different accounts
  const accountComparison = Object.entries(moneyMarketAccounts).filter(([key]) => key !== 'custom').map(([key, account]) => {
    let balance = initialBalance;
    let totalInterest = 0;
    
    for (let month = 1; month <= savingsDuration * 12; month++) {
      balance += monthlyContribution;
      const monthlyInterest = calculateTieredInterest(balance, account.rates);
      balance += monthlyInterest;
      totalInterest += monthlyInterest;
    }
    
    return {
      name: account.name.split(' ')[0],
      finalBalance: Math.round(balance),
      totalInterest: Math.round(totalInterest),
      minBalance: account.minBalance
    };
  });

  const updateCustomRate = (index: number, field: 'threshold' | 'rate', value: number) => {
    const newRates = [...customRates];
    newRates[index] = { ...newRates[index], [field]: value };
    setCustomRates(newRates);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Money Market Calculator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estimate potential returns from money market accounts with tiered interest rates and flexible access to your funds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Account Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Money Market Account</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bank">Select Bank/Institution</Label>
                    <Select value={selectedBank} onValueChange={setSelectedBank}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ally">Ally Bank</SelectItem>
                        <SelectItem value="capitalone">Capital One 360</SelectItem>
                        <SelectItem value="discover">Discover Bank</SelectItem>
                        <SelectItem value="schwab">Charles Schwab</SelectItem>
                        <SelectItem value="fidelity">Fidelity</SelectItem>
                        <SelectItem value="custom">Custom Settings</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">{getCurrentAccount().name}</h4>
                    <div className="text-sm text-blue-600">
                      <div>Minimum Balance: ${getCurrentAccount().minBalance.toLocaleString()}</div>
                      <div className="mt-2">
                        <strong>Rate Structure:</strong>
                        {currentRates.map((rate: TieredRate, index: number) => (
                          <div key={index} className="ml-2">
                            • ${rate.threshold.toLocaleString()}+: {rate.rate}% APY
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Parameters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-700">Investment Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="initialBalance">Initial Balance ($)</Label>
                      <Input
                        id="initialBalance"
                        type="number"
                        value={initialBalance}
                        onChange={(e) => setInitialBalance(Number(e.target.value) || 0)}
                        placeholder="10000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
                      <Input
                        id="monthlyContribution"
                        type="number"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)}
                        placeholder="500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="savingsDuration">Savings Duration (Years)</Label>
                    <Input
                      id="savingsDuration"
                      type="number"
                      value={savingsDuration}
                      onChange={(e) => setSavingsDuration(Number(e.target.value) || 1)}
                      placeholder="3"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="tieredRates"
                      checked={useTieredRates}
                      onCheckedChange={setUseTieredRates}
                    />
                    <Label htmlFor="tieredRates">Use Tiered Rates</Label>
                  </div>

                  {!useTieredRates && (
                    <div>
                      <Label htmlFor="flatRate">Flat Interest Rate (%)</Label>
                      <Input
                        id="flatRate"
                        type="number"
                        step="0.1"
                        value={flatRate}
                        onChange={(e) => setFlatRate(Number(e.target.value) || 0)}
                        placeholder="4.5"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Custom Rate Configuration */}
            {selectedBank === 'custom' && useTieredRates && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-green-700">Custom Rate Tiers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {customRates.map((rate, index) => (
                      <div key={index} className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
                        <div>
                          <Label>Balance Threshold ($)</Label>
                          <Input
                            type="number"
                            value={rate.threshold}
                            onChange={(e) => updateCustomRate(index, 'threshold', Number(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <Label>Interest Rate (%)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={rate.rate}
                            onChange={(e) => updateCustomRate(index, 'rate', Number(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Account Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Account Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-blue-700 font-medium">Total Deposits</div>
                      <div className="text-blue-800 font-bold text-lg">
                        ${totalContributions.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-green-700 font-medium">Interest Earned</div>
                      <div className="text-green-800 font-bold text-lg">
                        ${finalResult.interest.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                    <div className="text-orange-700 font-bold text-xl">Final Balance</div>
                    <div className="text-orange-800 font-bold text-2xl">
                      ${finalResult.balance.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-purple-700 font-medium">Effective Annual Rate</div>
                    <div className="text-purple-800 font-bold text-lg">
                      {finalResult.effectiveRate.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Account Growth Over Time</CardTitle>
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

            {/* Account Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Institution Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={accountComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Final Balance']}
                    />
                    <Bar dataKey="finalBalance" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Money Market vs Other Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Money Market Advantages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-1">Higher Interest Rates</h4>
                    <p className="text-green-600">
                      Money market accounts typically offer higher rates than traditional savings accounts.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-1">Limited Check Writing</h4>
                    <p className="text-blue-600">
                      Many money market accounts allow limited check writing and debit card access.
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-700 mb-1">FDIC Insured</h4>
                    <p className="text-orange-600">
                      Money market accounts are FDIC insured up to $250,000 per depositor, per bank.
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-700 mb-1">Tiered Rate Benefits</h4>
                    <p className="text-purple-600">
                      Larger balances often earn higher interest rates through tiered rate structures.
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

export default MoneyMarketCalculator;