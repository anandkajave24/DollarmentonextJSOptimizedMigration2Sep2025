"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Shield, DollarSign, Clock, AlertTriangle, Target, HelpCircle } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Helmet } from 'react-helmet';

export default function EmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(4500);
  const [monthsCoverage, setMonthsCoverage] = useState(6);
  const [currentSavings, setCurrentSavings] = useState(8000);
  const [monthlySavings, setMonthlySavings] = useState(500);
  const [jobStability, setJobStability] = useState('stable');
  const [dependents, setDependents] = useState(2);
  const [incomeStreams, setIncomeStreams] = useState(1);

  const [targetFund, setTargetFund] = useState(0);
  const [shortfall, setShortfall] = useState(0);
  const [monthsToGoal, setMonthsToGoal] = useState(0);
  const [recommendedMonths, setRecommendedMonths] = useState(6);

  useEffect(() => {
    calculateEmergencyFund();
  }, [monthlyExpenses, monthsCoverage, currentSavings, monthlySavings, jobStability, dependents, incomeStreams]);

  const calculateEmergencyFund = () => {
    // Calculate recommended months based on situation
    let recommended = 6; // Base recommendation
    
    if (jobStability === 'unstable') recommended += 2;
    if (jobStability === 'contract') recommended += 1;
    if (dependents > 2) recommended += 1;
    if (incomeStreams === 1) recommended += 1;
    
    recommended = Math.min(12, recommended); // Cap at 12 months
    
    const target = monthlyExpenses * monthsCoverage;
    const gap = Math.max(0, target - currentSavings);
    const months = monthlySavings > 0 ? Math.ceil(gap / monthlySavings) : 0;
    
    setTargetFund(target);
    setShortfall(gap);
    setMonthsToGoal(months);
    setRecommendedMonths(recommended);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getJobStabilityText = (stability: string) => {
    switch (stability) {
      case 'stable': return 'Stable Employment';
      case 'unstable': return 'Unstable/At Risk';
      case 'contract': return 'Contract/Freelance';
      case 'business': return 'Business Owner';
      default: return 'Stable Employment';
    }
  };

  const getStabilityColor = (stability: string) => {
    switch (stability) {
      case 'stable': return 'text-green-600';
      case 'unstable': return 'text-red-600';
      case 'contract': return 'text-orange-600';
      case 'business': return 'text-purple-600';
      default: return 'text-green-600';
    }
  };

  const expenseBreakdown = [
    { name: 'Housing', amount: monthlyExpenses * 0.30, color: '#3b82f6' },
    { name: 'Food & Groceries', amount: monthlyExpenses * 0.15, color: '#10b981' },
    { name: 'Transportation', amount: monthlyExpenses * 0.15, color: '#f59e0b' },
    { name: 'Utilities', amount: monthlyExpenses * 0.10, color: '#ef4444' },
    { name: 'Insurance', amount: monthlyExpenses * 0.10, color: '#8b5cf6' },
    { name: 'Other Expenses', amount: monthlyExpenses * 0.20, color: '#6b7280' }
  ];

  const savingsProgress = [
    { name: 'Current Savings', amount: currentSavings, color: '#10b981' },
    { name: 'Remaining Goal', amount: shortfall, color: '#e5e7eb' }
  ];

  const timelineData = [];
  for (let month = 0; month <= Math.min(24, monthsToGoal); month++) {
    const accumulated = currentSavings + (monthlySavings * month);
    timelineData.push({
      month: month,
      savings: Math.min(accumulated, targetFund),
      target: targetFund
    });
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">
            {formatCurrency(data.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Helmet>
        <title>Emergency Fund Calculator - Calculate Your Emergency Savings Goal | DollarMento</title>
        <meta name="description" content="Calculate how much you need for your emergency fund based on monthly expenses and income. Plan for financial security with our emergency savings calculator." />
        <meta name="keywords" content="emergency fund calculator, emergency savings calculator, emergency fund goal calculator, financial security calculator, savings goal calculator" />
        <link rel="canonical" href="https://dollarmento.com/emergency-fund-calculator" />
      </Helmet>
      <TooltipProvider>
      <div className="w-full p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Emergency Fund Calculator</h1>
          <p className="text-gray-600">Calculate how much you need to save for unexpected expenses and financial emergencies</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            {/* Monthly Expenses */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Monthly Expenses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="monthlyExpenses">Total Monthly Expenses</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>All essential monthly expenses including rent, food, utilities, insurance, and minimum debt payments</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Input
                    id="monthlyExpenses"
                    type="number"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                    placeholder="$4,500"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label>Months of Coverage Desired</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Number of months you want your emergency fund to cover</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <div className="space-y-3">
                    <Slider
                      value={[monthsCoverage]}
                      onValueChange={(value) => setMonthsCoverage(value[0])}
                      max={12}
                      min={3}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>3 months</span>
                      <span className="font-medium">{monthsCoverage} months</span>
                      <span>12 months</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Situation */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Current Situation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="currentSavings">Current Emergency Savings</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Amount already saved specifically for emergencies</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Input
                    id="currentSavings"
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    placeholder="$8,000"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="monthlySavings">Monthly Savings Capacity</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Amount you can save monthly toward emergency fund</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Input
                    id="monthlySavings"
                    type="number"
                    value={monthlySavings}
                    onChange={(e) => setMonthlySavings(Number(e.target.value))}
                    placeholder="$500"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label>Job Stability</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your employment situation affects recommended fund size</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Select value={jobStability} onValueChange={setJobStability}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stable">Stable Employment</SelectItem>
                      <SelectItem value="unstable">Unstable/At Risk</SelectItem>
                      <SelectItem value="contract">Contract/Freelance</SelectItem>
                      <SelectItem value="business">Business Owner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label>Number of Dependents</Label>
                      <UITooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Family members who depend on your income</p>
                        </TooltipContent>
                      </UITooltip>
                    </div>
                    <Select value={dependents.toString()} onValueChange={(value) => setDependents(Number(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label>Income Streams</Label>
                      <UITooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Number of income sources (job, side business, etc.)</p>
                        </TooltipContent>
                      </UITooltip>
                    </div>
                    <Select value={incomeStreams.toString()} onValueChange={(value) => setIncomeStreams(Number(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 (Single income)</SelectItem>
                        <SelectItem value="2">2 (Dual income)</SelectItem>
                        <SelectItem value="3">3+ (Multiple income)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How to Use This Calculator */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">How to Use This Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">1.</span>
                    <span>Calculate your total monthly essential expenses</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Set desired months of coverage (3-12 months)</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Enter current savings and capacity to save</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Review timeline to reach your emergency fund goal</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Disclaimers */}
            <Card className="bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Important Disclaimers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• Emergency fund should be separate from other savings</p>
                  <p>• Keep funds in easily accessible, low-risk accounts</p>
                  <p>• Adjust fund size based on personal circumstances</p>
                  <p>• Review and update fund needs annually</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Target Emergency Fund</p>
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency(targetFund)}</p>
                    </div>
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Amount Needed</p>
                      <p className="text-2xl font-bold text-orange-600">{formatCurrency(shortfall)}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Months to Goal</p>
                      <p className="text-2xl font-bold text-green-600">{monthsToGoal}</p>
                    </div>
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Coverage Period</p>
                      <p className="text-2xl font-bold text-purple-600">{monthsCoverage} mo.</p>
                    </div>
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Personalized Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Personalized Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Recommended Emergency Fund</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(monthlyExpenses * recommendedMonths)}</p>
                    <p className="text-sm text-gray-600">{recommendedMonths} months of expenses</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p><strong>Based on your situation:</strong></p>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex justify-between">
                        <span>Job Stability:</span>
                        <span className={getStabilityColor(jobStability)}>{getJobStabilityText(jobStability)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dependents:</span>
                        <span className="font-medium">{dependents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Income Streams:</span>
                        <span className="font-medium">{incomeStreams}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Savings Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Savings Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -10 }} />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
                      <Bar dataKey="savings" fill="#10b981" name="Emergency Savings" />
                      <Bar dataKey="target" fill="#e5e7eb" name="Target Amount" fillOpacity={0.3} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Fund Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Emergency Fund Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">High-Yield Savings Account</h4>
                      <p className="text-sm text-gray-600">Keep funds in easily accessible accounts that earn interest</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Separate from Other Savings</h4>
                      <p className="text-sm text-gray-600">Don't mix emergency funds with vacation or other goal savings</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Start Small, Build Consistently</h4>
                      <p className="text-sm text-gray-600">Begin with $1,000 then work toward full fund systematically</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Review Annually</h4>
                      <p className="text-sm text-gray-600">Update fund size as expenses and life situation change</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Fund Strategy */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-700">Emergency Fund Strategy & Financial Security Planning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Fund Size Guidelines</h3>
                    <p className="text-gray-600 text-sm">
                      Standard recommendation is 3-6 months of expenses, but adjust based on job stability, dependents, and income variability. Self-employed and single-income households need larger funds (9-12 months).
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Where to Keep Emergency Funds</h3>
                    <p className="text-gray-600 text-sm">
                      High-yield savings accounts offer liquidity with better returns than traditional savings. Money market accounts and short-term CDs provide alternatives. Avoid investing emergency funds in volatile assets.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Building Your Fund</h3>
                    <p className="text-gray-600 text-sm">
                      Start with $1,000 mini-emergency fund, then build systematically. Automate transfers to separate emergency account. Use windfalls like tax refunds or bonuses to accelerate funding.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">When to Use Emergency Funds</h3>
                    <p className="text-gray-600 text-sm">
                      True emergencies include job loss, major medical expenses, urgent home repairs, or family emergencies. Avoid using for planned expenses, vacations, or non-urgent purchases.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Final Call to Action */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-blue-800 mb-2">Build Your Financial Safety Net</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Calculate your emergency fund needs and create a plan to achieve financial security with our comprehensive planning tool.
                </p>
                <Button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Plan Your Emergency Fund Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
    </>
  );
}