import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { SEO } from '../SEO';

interface Asset {
  category: string;
  amount: number;
}

interface Liability {
  category: string;
  amount: number;
}

const NetWorthCalculator: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([
    { category: 'Cash & Checking', amount: 0 },
    { category: 'Savings Account', amount: 0 },
    { category: '401(k)/403(b)', amount: 0 },
    { category: 'IRA/Roth IRA', amount: 0 },
    { category: 'Stocks & Investments', amount: 0 },
    { category: 'Primary Residence', amount: 0 },
    { category: 'Vehicles', amount: 0 },
    { category: 'Other Assets', amount: 0 }
  ]);

  const [liabilities, setLiabilities] = useState<Liability[]>([
    { category: 'Home Mortgage', amount: 0 },
    { category: 'Credit Cards', amount: 0 },
    { category: 'Student Loans', amount: 0 },
    { category: 'Auto Loans', amount: 0 },
    { category: 'Personal Loans', amount: 0 },
    { category: 'Other Debt', amount: 0 }
  ]);

  const [age, setAge] = useState<number>(30);

  const updateAsset = (index: number, value: number) => {
    const newAssets = [...assets];
    newAssets[index].amount = value;
    setAssets(newAssets);
  };

  const updateLiability = (index: number, value: number) => {
    const newLiabilities = [...liabilities];
    newLiabilities[index].amount = value;
    setLiabilities(newLiabilities);
  };

  const totalAssets = assets.reduce((sum, asset) => sum + asset.amount, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.amount, 0);
  const netWorth = totalAssets - totalLiabilities;

  const pieData = [
    { name: 'Assets', value: totalAssets, fill: '#10b981' },
    { name: 'Liabilities', value: totalLiabilities, fill: '#ef4444' }
  ];

  const assetBreakdown = assets.filter(asset => asset.amount > 0);
  const liabilityBreakdown = liabilities.filter(liability => liability.amount > 0);

  const getNetWorthPercentile = (netWorth: number, age: number): string => {
    // Simplified percentile calculation based on US averages
    const ageGroups = {
      20: { p50: 8000, p75: 25000, p90: 75000 },
      30: { p50: 45000, p75: 130000, p90: 300000 },
      40: { p50: 165000, p75: 350000, p90: 750000 },
      50: { p50: 320000, p75: 650000, p90: 1200000 },
      60: { p50: 510000, p75: 1100000, p90: 2000000 }
    };

    const ageGroup = age < 25 ? 20 : age < 35 ? 30 : age < 45 ? 40 : age < 55 ? 50 : 60;
    const benchmarks = ageGroups[ageGroup];

    if (netWorth >= benchmarks.p90) return "Top 10%";
    if (netWorth >= benchmarks.p75) return "Top 25%";
    if (netWorth >= benchmarks.p50) return "Above Median";
    return "Below Median";
  };

  return (
    <>
      <SEO 
        title="Net Worth Calculator - Calculate Your Total Financial Worth"
        description="Calculate your net worth by tracking assets and liabilities. Get personalized insights, percentile rankings, and tips to improve your financial health and wealth building."
        keywords="net worth calculator, financial net worth, assets and liabilities calculator, personal finance calculator, wealth calculator, financial health assessment, net worth tracker, financial planning calculator"
        canonical="https://rupeesmart.com/net-worth-calculator"
      />
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Net Worth Calculator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your net worth by tracking your total assets and liabilities to understand your overall financial health.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="age">Your Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      placeholder="30"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assets */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-green-700">Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {assets.map((asset, index) => (
                    <div key={index}>
                      <Label htmlFor={`asset-${index}`}>{asset.category}</Label>
                      <Input
                        id={`asset-${index}`}
                        type="number"
                        value={asset.amount || ''}
                        onChange={(e) => updateAsset(index, Number(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Liabilities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-red-700">Liabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {liabilities.map((liability, index) => (
                    <div key={index}>
                      <Label htmlFor={`liability-${index}`}>{liability.category}</Label>
                      <Input
                        id={`liability-${index}`}
                        type="number"
                        value={liability.amount || ''}
                        onChange={(e) => updateLiability(index, Number(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Net Worth Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Net Worth Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700 font-medium">Total Assets</span>
                    <span className="text-green-800 font-bold text-lg">
                      ${totalAssets.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-red-700 font-medium">Total Liabilities</span>
                    <span className="text-red-800 font-bold text-lg">
                      ${totalLiabilities.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <span className="text-blue-700 font-bold text-xl">Net Worth</span>
                    <span className={`font-bold text-xl ${netWorth >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                      ${netWorth.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">
                      <span className="font-semibold">Percentile Rank:</span> {getNetWorthPercentile(netWorth, age)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Based on your age group ({age} years old)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visualization */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Assets vs Liabilities</CardTitle>
              </CardHeader>
              <CardContent>
                {totalAssets > 0 || totalLiabilities > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Enter your assets and liabilities to see the breakdown
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Asset Breakdown */}
            {assetBreakdown.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-green-700">Asset Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {assetBreakdown.map((asset, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-700">{asset.category}</span>
                        <span className="text-green-800 font-semibold">
                          ${asset.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Liability Breakdown */}
            {liabilityBreakdown.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-red-700">Liability Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {liabilityBreakdown.map((liability, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-700">{liability.category}</span>
                        <span className="text-red-800 font-semibold">
                          ${liability.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Tips to Improve Your Net Worth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Increase Assets</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Maximize 401(k) employer match</li>
                  <li>• Contribute to Roth IRA annually</li>
                  <li>• Invest in low-cost index funds</li>
                  <li>• Build emergency fund (3-6 months expenses)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-2">Reduce Liabilities</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Pay off high-interest credit cards first</li>
                  <li>• Consider debt consolidation</li>
                  <li>• Make extra mortgage payments</li>
                  <li>• Avoid taking on new unnecessary debt</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </>
  );
};

export default NetWorthCalculator;