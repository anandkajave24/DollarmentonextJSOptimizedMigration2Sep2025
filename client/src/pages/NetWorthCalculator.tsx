"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import dynamic from 'next/dynamic';
import { LazyChart, ChartSkeleton } from '../components/LazyChart';

// Import recharts components normally
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Helmet } from 'react-helmet';

interface AssetItem {
  id: string;
  name: string;
  value: number;
  category: 'liquid' | 'investments' | 'personal' | 'real-estate';
}

interface LiabilityItem {
  id: string;
  name: string;
  value: number;
  category: 'mortgage' | 'credit-cards' | 'student-loans' | 'other-debt';
}

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState<AssetItem[]>([
    { id: '1', name: 'Checking Account', value: 5000, category: 'liquid' },
    { id: '2', name: '401(k)', value: 75000, category: 'investments' },
    { id: '3', name: 'Home Value', value: 350000, category: 'real-estate' }
  ]);

  const [liabilities, setLiabilities] = useState<LiabilityItem[]>([
    { id: '1', name: 'Mortgage', value: 280000, category: 'mortgage' },
    { id: '2', name: 'Credit Cards', value: 8500, category: 'credit-cards' }
  ]);

  const addAsset = () => {
    const newAsset: AssetItem = {
      id: Date.now().toString(),
      name: '',
      value: 0,
      category: 'liquid'
    };
    setAssets([...assets, newAsset]);
  };

  const addLiability = () => {
    const newLiability: LiabilityItem = {
      id: Date.now().toString(),
      name: '',
      value: 0,
      category: 'credit-cards'
    };
    setLiabilities([...liabilities, newLiability]);
  };

  const updateAsset = (id: string, field: keyof AssetItem, value: string | number) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, [field]: value } : asset
    ));
  };

  const updateLiability = (id: string, field: keyof LiabilityItem, value: string | number) => {
    setLiabilities(liabilities.map(liability => 
      liability.id === id ? { ...liability, [field]: value } : liability
    ));
  };

  const removeAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const removeLiability = (id: string) => {
    setLiabilities(liabilities.filter(liability => liability.id !== id));
  };

  // Calculations
  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.value, 0);
  const netWorth = totalAssets - totalLiabilities;

  // Asset breakdown by category
  const assetsByCategory = {
    liquid: assets.filter(a => a.category === 'liquid').reduce((sum, a) => sum + a.value, 0),
    investments: assets.filter(a => a.category === 'investments').reduce((sum, a) => sum + a.value, 0),
    personal: assets.filter(a => a.category === 'personal').reduce((sum, a) => sum + a.value, 0),
    'real-estate': assets.filter(a => a.category === 'real-estate').reduce((sum, a) => sum + a.value, 0)
  };

  // Liability breakdown by category
  const liabilitiesByCategory = {
    mortgage: liabilities.filter(l => l.category === 'mortgage').reduce((sum, l) => sum + l.value, 0),
    'credit-cards': liabilities.filter(l => l.category === 'credit-cards').reduce((sum, l) => sum + l.value, 0),
    'student-loans': liabilities.filter(l => l.category === 'student-loans').reduce((sum, l) => sum + l.value, 0),
    'other-debt': liabilities.filter(l => l.category === 'other-debt').reduce((sum, l) => sum + l.value, 0)
  };

  // Chart data
  const pieData = [
    { name: 'Liquid Assets', value: assetsByCategory.liquid, fill: '#3b82f6' },
    { name: 'Investments', value: assetsByCategory.investments, fill: '#10b981' },
    { name: 'Personal Assets', value: assetsByCategory.personal, fill: '#f59e0b' },
    { name: 'Real Estate', value: assetsByCategory['real-estate'], fill: '#8b5cf6' }
  ].filter(item => item.value > 0);

  const comparisonData = [
    { name: 'Total Assets', value: totalAssets, fill: '#10b981' },
    { name: 'Total Liabilities', value: totalLiabilities, fill: '#ef4444' },
    { name: 'Net Worth', value: netWorth, fill: netWorth >= 0 ? '#3b82f6' : '#ef4444' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      'liquid': 'Liquid Assets',
      'investments': 'Investments',
      'personal': 'Personal Assets',
      'real-estate': 'Real Estate',
      'mortgage': 'Mortgage',
      'credit-cards': 'Credit Cards',
      'student-loans': 'Student Loans',
      'other-debt': 'Other Debt'
    };
    return labels[category as keyof typeof labels] || category;
  };

  return (
    <>
      <Helmet>
        <title>Net Worth Calculator - Calculate Your Total Net Worth & Financial Position | DollarMento</title>
        <meta name="description" content="Calculate your net worth by tracking assets and liabilities. Monitor your financial progress with our comprehensive net worth calculator and wealth tracking tool." />
        <meta name="keywords" content="net worth calculator, wealth calculator, assets liabilities calculator, financial position calculator, personal finance calculator, wealth tracking calculator" />
        <link rel="canonical" href="https://dollarmento.com/net-worth-calculator" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
      
      <div className="w-full px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Net Worth Calculator</h1>
          <p className="text-lg text-gray-600 w-full">
            Track your assets, liabilities, and net worth over time to monitor your financial progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            {/* Assets Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Assets
                  <Button 
                    onClick={addAsset}
                    size="sm"
                    className="ml-auto flex items-center gap-1 bg-green-500 hover:bg-green-600"
                  >
                    <Plus className="w-4 h-4" />
                    Add Asset
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-80 overflow-y-auto">
                {assets.map((asset) => (
                  <div key={asset.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <Input
                        placeholder="Asset name"
                        value={asset.name}
                        onChange={(e) => updateAsset(asset.id, 'name', e.target.value)}
                        className="h-8 mb-2"
                      />
                      <select 
                        value={asset.category}
                        onChange={(e) => updateAsset(asset.id, 'category', e.target.value as any)}
                        className="w-full h-8 px-2 border border-gray-300 rounded text-sm"
                      >
                        <option value="liquid">Liquid Assets</option>
                        <option value="investments">Investments</option>
                        <option value="personal">Personal Assets</option>
                        <option value="real-estate">Real Estate</option>
                      </select>
                    </div>
                    <div className="w-24">
                      <Input
                        type="number"
                        placeholder="Value"
                        value={asset.value || ''}
                        onChange={(e) => updateAsset(asset.id, 'value', Number(e.target.value))}
                        className="h-8"
                        min="0"
                      />
                    </div>
                    <Button
                      onClick={() => removeAsset(asset.id)}
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700 p-1 h-8 w-8"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Liabilities Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-red-500 rounded"></span>
                  Liabilities
                  <Button 
                    onClick={addLiability}
                    size="sm"
                    className="ml-auto flex items-center gap-1 bg-red-500 hover:bg-red-600"
                  >
                    <Plus className="w-4 h-4" />
                    Add Liability
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-80 overflow-y-auto">
                {liabilities.map((liability) => (
                  <div key={liability.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <Input
                        placeholder="Liability name"
                        value={liability.name}
                        onChange={(e) => updateLiability(liability.id, 'name', e.target.value)}
                        className="h-8 mb-2"
                      />
                      <select 
                        value={liability.category}
                        onChange={(e) => updateLiability(liability.id, 'category', e.target.value as any)}
                        className="w-full h-8 px-2 border border-gray-300 rounded text-sm"
                      >
                        <option value="mortgage">Mortgage</option>
                        <option value="credit-cards">Credit Cards</option>
                        <option value="student-loans">Student Loans</option>
                        <option value="other-debt">Other Debt</option>
                      </select>
                    </div>
                    <div className="w-24">
                      <Input
                        type="number"
                        placeholder="Value"
                        value={liability.value || ''}
                        onChange={(e) => updateLiability(liability.id, 'value', Number(e.target.value))}
                        className="h-8"
                        min="0"
                      />
                    </div>
                    <Button
                      onClick={() => removeLiability(liability.id)}
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700 p-1 h-8 w-8"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
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
                    <span>Add all your assets (cash, investments, property)</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>List all liabilities (debts, loans, mortgages)</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Review your net worth calculation</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Track changes over time</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Net Worth Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-500 rounded"></span>
                  Net Worth Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">{formatCurrency(totalAssets)}</div>
                    <div className="text-sm text-gray-600">Total Assets</div>
                  </div>
                  <div className="text-center p-6 bg-red-50 rounded-lg">
                    <div className="text-3xl font-bold text-red-600">{formatCurrency(totalLiabilities)}</div>
                    <div className="text-sm text-gray-600">Total Liabilities</div>
                  </div>
                  <div className={`text-center p-6 rounded-lg ${
                    netWorth >= 0 ? 'bg-blue-50' : 'bg-orange-50'
                  }`}>
                    <div className={`text-4xl font-bold ${
                      netWorth >= 0 ? 'text-blue-600' : 'text-orange-600'
                    }`}>
                      {formatCurrency(netWorth)}
                    </div>
                    <div className="text-sm text-gray-600">Net Worth</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Asset Breakdown Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Asset Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <LazyChart height={256}>
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
                </LazyChart>
              </CardContent>
            </Card>

            {/* Financial Health Indicators */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-yellow-500 rounded"></span>
                  Financial Health Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Debt-to-Asset Ratio</span>
                    <span className="font-medium">
                      {totalAssets > 0 ? ((totalLiabilities / totalAssets) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Liquid Asset Ratio</span>
                    <span className="font-medium">
                      {totalAssets > 0 ? ((assetsByCategory.liquid / totalAssets) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Investment Allocation</span>
                    <span className="font-medium">
                      {totalAssets > 0 ? ((assetsByCategory.investments / totalAssets) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Financial Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <LazyChart height={192}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </LazyChart>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="w-full mt-12 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                💡 Ways to Increase Your Net Worth
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• Get more assets</p>
              <p>• Get the most out of your employer's 401(k) match</p>
              <p>• Put money into a Roth IRA every year</p>
              <p>• Put your money into low-cost index funds and set up an emergency fund with three to six months' worth of expenses.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                📊 Reduce Debt
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• Pay off credit cards with high interest rates first.</p>
              <p>• Think about consolidating your debts.</p>
              <p>• Make extra payments on your mortgage.</p>
              <p>• Don't take on new debt that you don't need.</p>
            </CardContent>
          </Card>



          {/* Final Call to Action */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Track Your Wealth Building Progress</h3>
              <p className="text-gray-700 text-sm mb-4">
                Calculate and monitor your net worth to optimize your financial strategy and build long-term wealth effectively.
              </p>
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Calculate Your Net Worth Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </>
  );
}