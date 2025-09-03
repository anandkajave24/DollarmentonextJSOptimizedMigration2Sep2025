import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle, Target, PiggyBank } from 'lucide-react';
import { SEO } from '../SEO';

interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  actual: number;
  percentage: number;
  color: string;
  icon: React.ReactNode;
  description: string;
  recommended: number;
}

const BudgetPlannerCalculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(5000);
  const [categories, setCategories] = useState<BudgetCategory[]>([
    {
      id: 'housing',
      name: 'Housing',
      budgeted: 1500,
      actual: 1450,
      percentage: 30,
      color: '#3b82f6',
      icon: <DollarSign className="w-4 h-4" />,
      description: 'Rent/mortgage, utilities, maintenance',
      recommended: 30
    },
    {
      id: 'transportation',
      name: 'Transportation',
      budgeted: 600,
      actual: 650,
      percentage: 12,
      color: '#10b981',
      icon: <TrendingUp className="w-4 h-4" />,
      description: 'Car payment, gas, insurance, maintenance',
      recommended: 15
    },
    {
      id: 'food',
      name: 'Food & Dining',
      budgeted: 500,
      actual: 520,
      percentage: 10,
      color: '#f59e0b',
      icon: <PiggyBank className="w-4 h-4" />,
      description: 'Groceries, restaurants, takeout',
      recommended: 12
    },
    {
      id: 'utilities',
      name: 'Utilities',
      budgeted: 200,
      actual: 180,
      percentage: 4,
      color: '#8b5cf6',
      icon: <CheckCircle className="w-4 h-4" />,
      description: 'Electricity, water, internet, phone',
      recommended: 5
    },
    {
      id: 'insurance',
      name: 'Insurance',
      budgeted: 300,
      actual: 300,
      percentage: 6,
      color: '#ef4444',
      icon: <AlertTriangle className="w-4 h-4" />,
      description: 'Health, auto, life insurance',
      recommended: 8
    },
    {
      id: 'savings',
      name: 'Savings',
      budgeted: 1000,
      actual: 800,
      percentage: 20,
      color: '#06b6d4',
      icon: <Target className="w-4 h-4" />,
      description: 'Emergency fund, retirement, investments',
      recommended: 20
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      budgeted: 300,
      actual: 350,
      percentage: 6,
      color: '#84cc16',
      icon: <DollarSign className="w-4 h-4" />,
      description: 'Movies, streaming, hobbies, recreation',
      recommended: 5
    },
    {
      id: 'personal',
      name: 'Personal Care',
      budgeted: 150,
      actual: 160,
      percentage: 3,
      color: '#f97316',
      icon: <CheckCircle className="w-4 h-4" />,
      description: 'Healthcare, grooming, clothing',
      recommended: 5
    },
    {
      id: 'miscellaneous',
      name: 'Miscellaneous',
      budgeted: 200,
      actual: 180,
      percentage: 4,
      color: '#6b7280',
      icon: <TrendingUp className="w-4 h-4" />,
      description: 'Gifts, donations, unexpected expenses',
      recommended: 5
    }
  ]);

  const updateCategoryBudget = (id: string, value: number) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id 
        ? { 
            ...cat, 
            budgeted: value,
            percentage: Math.round((value / monthlyIncome) * 100)
          }
        : cat
    ));
  };

  const updateCategoryActual = (id: string, value: number) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, actual: value } : cat
    ));
  };

  // Calculate totals
  const totalBudgeted = categories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalActual = categories.reduce((sum, cat) => sum + cat.actual, 0);
  const remainingBudget = monthlyIncome - totalBudgeted;
  const actualVariance = totalActual - totalBudgeted;

  // Budget health analysis
  const getBudgetHealth = () => {
    if (totalBudgeted > monthlyIncome) return { status: 'over', color: 'text-red-600', message: 'Over Budget!' };
    if (remainingBudget < monthlyIncome * 0.05) return { status: 'tight', color: 'text-yellow-600', message: 'Tight Budget' };
    return { status: 'healthy', color: 'text-green-600', message: 'Healthy Budget' };
  };

  const budgetHealth = getBudgetHealth();

  // Data for charts
  const pieChartData = categories.map(cat => ({
    name: cat.name,
    value: cat.budgeted,
    color: cat.color
  }));

  const comparisonData = categories.map(cat => ({
    name: cat.name.split(' ')[0], // Shorter names for chart
    budgeted: cat.budgeted,
    actual: cat.actual,
    recommended: Math.round((cat.recommended / 100) * monthlyIncome)
  }));

  const resetToRecommended = () => {
    setCategories(prev => prev.map(cat => ({
      ...cat,
      budgeted: Math.round((cat.recommended / 100) * monthlyIncome),
      percentage: cat.recommended
    })));
  };

  return (
    <>
      <SEO 
        title="Budget Planner Calculator - Personal Budget & Expense Tracking Tool"
        description="Create and manage your personal budget with our comprehensive budget planner. Track expenses, set financial goals, and optimize your spending across categories."
        keywords="budget planner calculator, personal budget calculator, expense tracking calculator, monthly budget calculator, budget management tool, financial planning calculator, spending tracker"
        canonical="https://rupeesmart.com/budget-planner-calculator"
      />
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📊 Budget Planner Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plan and track your monthly budget with detailed category analysis and spending insights.
          </p>
        </div>

        {/* Monthly Income Input */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Monthly Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="income">Monthly After-Tax Income</Label>
                <Input
                  id="income"
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="text-lg font-semibold"
                />
              </div>
              <Button onClick={resetToRecommended} variant="outline">
                Use Recommended %
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Monthly Income</p>
                <p className="text-2xl font-bold text-blue-600">${monthlyIncome.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Budgeted</p>
                <p className="text-2xl font-bold text-gray-900">${totalBudgeted.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Remaining</p>
                <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${remainingBudget.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Budget Health</p>
                <p className={`text-lg font-bold ${budgetHealth.color}`}>
                  {budgetHealth.message}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Budget Categories */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            {category.icon}
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            (Rec: {category.recommended}%)
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {category.percentage}% of income
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">Budgeted Amount</Label>
                          <Input
                            type="number"
                            value={category.budgeted}
                            onChange={(e) => updateCategoryBudget(category.id, Number(e.target.value))}
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Actual Spent</Label>
                          <Input
                            type="number"
                            value={category.actual}
                            onChange={(e) => updateCategoryActual(category.id, Number(e.target.value))}
                            className="text-sm"
                          />
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Spent: ${category.actual}</span>
                          <span>Budget: ${category.budgeted}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min((category.actual / category.budgeted) * 100, 100)}%`,
                              backgroundColor: category.actual > category.budgeted ? '#ef4444' : category.color
                            }}
                          />
                        </div>
                        {category.actual > category.budgeted && (
                          <p className="text-xs text-red-600 mt-1">
                            Over budget by ${(category.actual - category.budgeted).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Analysis */}
          <div className="space-y-6">
            {/* Budget Distribution Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: $${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Budget vs Actual vs Recommended */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, '']} />
                      <Legend />
                      <Bar dataKey="recommended" fill="#94a3b8" name="Recommended" />
                      <Bar dataKey="budgeted" fill="#3b82f6" name="Budgeted" />
                      <Bar dataKey="actual" fill="#ef4444" name="Actual" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Budget Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Savings Rate</h4>
                    <p className="text-blue-700">
                      You're saving {((categories.find(c => c.id === 'savings')?.budgeted || 0) / monthlyIncome * 100).toFixed(1)}% of your income.
                      {((categories.find(c => c.id === 'savings')?.budgeted || 0) / monthlyIncome * 100) >= 20 
                        ? " Excellent job!" 
                        : " Consider increasing to 20% for optimal financial health."}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Top Spending Categories</h4>
                    <div className="space-y-1">
                      {categories
                        .sort((a, b) => b.budgeted - a.budgeted)
                        .slice(0, 3)
                        .map((cat, index) => (
                          <p key={cat.id} className="text-green-700 text-sm">
                            {index + 1}. {cat.name}: ${cat.budgeted} ({cat.percentage}%)
                          </p>
                        ))}
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">Budget Recommendations</h4>
                    <div className="space-y-1 text-yellow-700 text-sm">
                      <p>• Housing should be ≤30% of income</p>
                      <p>• Save at least 20% for emergency & retirement</p>
                      <p>• Keep entertainment under 5% for better savings</p>
                      <p>• Review and adjust monthly for optimal results</p>
                    </div>
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

export default BudgetPlannerCalculator;