import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Home, DollarSign, Clock, TrendingDown, RefreshCcw, HelpCircle } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Helmet } from 'react-helmet';

export default function RefinanceCalculator() {
  const [currentLoanBalance, setCurrentLoanBalance] = useState(250000);
  const [currentInterestRate, setCurrentInterestRate] = useState(6.5);
  const [currentMonthlyPayment, setCurrentMonthlyPayment] = useState(1778);
  const [remainingYears, setRemainingYears] = useState(25);
  
  const [newInterestRate, setNewInterestRate] = useState(5.5);
  const [newLoanTerm, setNewLoanTerm] = useState(30);
  const [closingCosts, setClosingCosts] = useState(3500);
  const [cashOutAmount, setCashOutAmount] = useState(0);
  const [refinanceType, setRefinanceType] = useState('rate-term');

  const [newMonthlyPayment, setNewMonthlyPayment] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [totalInterestOld, setTotalInterestOld] = useState(0);
  const [totalInterestNew, setTotalInterestNew] = useState(0);
  const [breakEvenMonths, setBreakEvenMonths] = useState(0);
  const [newLoanAmount, setNewLoanAmount] = useState(0);

  useEffect(() => {
    calculateRefinance();
  }, [currentLoanBalance, currentInterestRate, currentMonthlyPayment, remainingYears, newInterestRate, newLoanTerm, closingCosts, cashOutAmount, refinanceType]);

  const calculateRefinance = () => {
    // Calculate new loan amount
    const loanAmount = refinanceType === 'cash-out' ? currentLoanBalance + cashOutAmount + closingCosts : currentLoanBalance + closingCosts;
    setNewLoanAmount(loanAmount);

    // Calculate new monthly payment
    const monthlyRate = newInterestRate / 100 / 12;
    const numPayments = newLoanTerm * 12;
    
    const newPayment = monthlyRate > 0 ? 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1) : 
      loanAmount / numPayments;

    setNewMonthlyPayment(newPayment);
    setMonthlySavings(currentMonthlyPayment - newPayment);

    // Calculate total interest for both loans
    const totalOldInterest = (currentMonthlyPayment * remainingYears * 12) - currentLoanBalance;
    const totalNewInterest = (newPayment * numPayments) - loanAmount;
    
    setTotalInterestOld(totalOldInterest);
    setTotalInterestNew(totalNewInterest);

    // Calculate break-even point
    const monthsToBreakEven = monthlySavings > 0 ? closingCosts / monthlySavings : 0;
    setBreakEvenMonths(monthsToBreakEven);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = Math.round(months % 12);
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
    return `${Math.round(months)} month${Math.round(months) !== 1 ? 's' : ''}`;
  };

  const comparisonData = [
    {
      name: 'Current Loan',
      monthlyPayment: currentMonthlyPayment,
      totalInterest: totalInterestOld,
      totalCost: currentLoanBalance + totalInterestOld
    },
    {
      name: 'Refinanced Loan',
      monthlyPayment: newMonthlyPayment,
      totalInterest: totalInterestNew,
      totalCost: newLoanAmount + totalInterestNew
    }
  ];

  const savingsData = [
    {
      name: 'Monthly Payment Savings',
      value: monthlySavings,
      color: '#10b981'
    },
    {
      name: 'Closing Costs',
      value: closingCosts,
      color: '#ef4444'
    }
  ];

  const yearlyData = [];
  let cumulativeSavings = -closingCosts;
  for (let year = 1; year <= 10; year++) {
    cumulativeSavings += monthlySavings * 12;
    yearlyData.push({
      year: year,
      savings: cumulativeSavings,
      monthlySavings: monthlySavings * year * 12
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
        <title>Mortgage Refinance Calculator - Compare Refinancing Benefits & Break-Even | DollarMento</title>
        <meta name="description" content="Calculate mortgage refinance savings, break-even point, and monthly payment changes. Compare current vs new loan terms and closing costs." />
        <meta name="keywords" content="refinance calculator, mortgage refinance, refinancing benefits, break even calculator, mortgage rates comparison" />
        <link rel="canonical" href="https://dollarmento.com/refinance-calculator" />
      </Helmet>
      <TooltipProvider>
      <div className="w-full px-4">
        <div className="mb-8 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mortgage Refinance Calculator</h1>
          <p className="text-sm text-gray-600 max-w-3xl">Analyze if refinancing your mortgage will save money and when you'll break even</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Panel - 40% width */}
          <div className="lg:col-span-2 space-y-4">
            {/* Current Loan Details */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Current Loan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="currentLoanBalance">Remaining Balance</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Current outstanding balance on your mortgage</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Input
                    id="currentLoanBalance"
                    type="number"
                    value={currentLoanBalance}
                    onChange={(e) => setCurrentLoanBalance(Number(e.target.value))}
                    placeholder="$250,000"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label>Current Interest Rate (%)</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your current mortgage interest rate</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <div className="space-y-3">
                    <Slider
                      value={[currentInterestRate]}
                      onValueChange={(value) => setCurrentInterestRate(value[0])}
                      max={10}
                      min={2}
                      step={0.125}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>2%</span>
                      <span className="font-medium">{currentInterestRate}%</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="currentMonthlyPayment">Monthly Payment</Label>
                      <UITooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Current monthly principal and interest payment</p>
                        </TooltipContent>
                      </UITooltip>
                    </div>
                    <Input
                      id="currentMonthlyPayment"
                      type="number"
                      value={currentMonthlyPayment}
                      onChange={(e) => setCurrentMonthlyPayment(Number(e.target.value))}
                      placeholder="$1,778"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="remainingYears">Remaining Years</Label>
                      <UITooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Years left on your current mortgage</p>
                        </TooltipContent>
                      </UITooltip>
                    </div>
                    <Input
                      id="remainingYears"
                      type="number"
                      value={remainingYears}
                      onChange={(e) => setRemainingYears(Number(e.target.value))}
                      placeholder="25"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* New Loan Details */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <RefreshCcw className="w-4 h-4" />
                  New Loan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label>Refinance Type</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Rate-and-term or cash-out refinance</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Select value={refinanceType} onValueChange={setRefinanceType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rate-term">Rate-and-Term Refinance</SelectItem>
                      <SelectItem value="cash-out">Cash-Out Refinance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label>New Interest Rate (%)</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Interest rate for the new mortgage</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <div className="space-y-3">
                    <Slider
                      value={[newInterestRate]}
                      onValueChange={(value) => setNewInterestRate(value[0])}
                      max={10}
                      min={2}
                      step={0.125}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>2%</span>
                      <span className="font-medium">{newInterestRate}%</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="newLoanTerm">New Loan Term (Years)</Label>
                      <UITooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Term length for the new mortgage</p>
                        </TooltipContent>
                      </UITooltip>
                    </div>
                    <Select value={newLoanTerm.toString()} onValueChange={(value) => setNewLoanTerm(Number(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 Years</SelectItem>
                        <SelectItem value="20">20 Years</SelectItem>
                        <SelectItem value="25">25 Years</SelectItem>
                        <SelectItem value="30">30 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="closingCosts">Closing Costs</Label>
                      <UITooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total closing costs for refinancing</p>
                        </TooltipContent>
                      </UITooltip>
                    </div>
                    <Input
                      id="closingCosts"
                      type="number"
                      value={closingCosts}
                      onChange={(e) => setClosingCosts(Number(e.target.value))}
                      placeholder="$3,500"
                    />
                  </div>
                </div>

                {refinanceType === 'cash-out' && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="cashOutAmount">Cash-Out Amount</Label>
                      <UITooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Additional cash you want to borrow</p>
                        </TooltipContent>
                      </UITooltip>
                    </div>
                    <Input
                      id="cashOutAmount"
                      type="number"
                      value={cashOutAmount}
                      onChange={(e) => setCashOutAmount(Number(e.target.value))}
                      placeholder="$0"
                    />
                  </div>
                )}
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
                    <span>Enter your current mortgage details</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Set new loan terms and interest rate</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Include closing costs and cash-out amount</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Review savings analysis and break-even timeline</span>
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
                  <p>• Actual rates may vary based on credit and market conditions</p>
                  <p>• Consider tax implications and lost interest deductions</p>
                  <p>• Factor in home value and loan-to-value requirements</p>
                  <p>• Consult with mortgage professionals for personalized advice</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel - 60% width */}
          <div className="lg:col-span-3 space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">New Monthly Payment</p>
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency(newMonthlyPayment)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Monthly Savings</p>
                      <p className={`text-2xl font-bold ${monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {monthlySavings >= 0 ? '+' : ''}{formatCurrency(monthlySavings)}
                      </p>
                    </div>
                    <TrendingDown className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Break-Even Time</p>
                      <p className="text-xl font-bold text-purple-600">{formatMonths(breakEvenMonths)}</p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Interest Rate Reduction</p>
                      <p className={`text-2xl font-bold ${currentInterestRate - newInterestRate > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {currentInterestRate - newInterestRate > 0 ? '-' : '+'}{Math.abs(currentInterestRate - newInterestRate).toFixed(3)}%
                      </p>
                    </div>
                    <RefreshCcw className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Refinance Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Refinance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">New Loan Amount:</span>
                    <span className="font-medium">{formatCurrency(newLoanAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Closing Costs:</span>
                    <span className="font-medium text-red-600">{formatCurrency(closingCosts)}</span>
                  </div>
                  {refinanceType === 'cash-out' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cash-Out Amount:</span>
                      <span className="font-medium text-green-600">{formatCurrency(cashOutAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Payment Change:</span>
                    <span className={`font-medium ${monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {monthlySavings >= 0 ? '-' : '+'}{formatCurrency(Math.abs(monthlySavings))}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Interest Savings (Lifetime):</span>
                    <span className={`${totalInterestOld - totalInterestNew > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(totalInterestOld - totalInterestNew)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loan Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Loan Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
                      <Bar dataKey="monthlyPayment" fill="#3b82f6" name="Monthly Payment" />
                      <Bar dataKey="totalInterest" fill="#ef4444" name="Total Interest" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Cumulative Savings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cumulative Savings Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="year" 
                        label={{ value: 'Years', position: 'insideBottom', offset: -10 }} 
                      />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value: number) => [formatCurrency(value), 'Net Savings']} />
                      <Bar dataKey="savings" fill="#10b981" name="Net Savings" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Refinance Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Refinance Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {monthlySavings > 0 ? (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-green-800">Potentially Beneficial</span>
                      </div>
                      <p className="text-sm text-green-700">
                        You could save {formatCurrency(monthlySavings)} per month and break even in {formatMonths(breakEvenMonths)}.
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="font-medium text-red-800">May Not Be Beneficial</span>
                      </div>
                      <p className="text-sm text-red-700">
                        Your monthly payment would increase by {formatCurrency(Math.abs(monthlySavings))}. Consider other options.
                      </p>
                    </div>
                  )}

                  <div className="space-y-2 text-sm">
                    <p><strong>Key Considerations:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Break-even point is {formatMonths(breakEvenMonths)}</li>
                      <li>Interest rate reduction: {(currentInterestRate - newInterestRate).toFixed(3)}%</li>
                      <li>Closing costs: {formatCurrency(closingCosts)}</li>
                      {totalInterestOld - totalInterestNew > 0 && (
                        <li>Lifetime interest savings: {formatCurrency(totalInterestOld - totalInterestNew)}</li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Refinance Strategy Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-700">Mortgage Refinance Strategy & Timing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Rate and Term Refinance</h3>
                  <p className="text-gray-600 text-sm">
                    Focus on lowering interest rate or changing loan term. Generally worthwhile when you can reduce rate by 0.5-0.75%, plan to stay in home beyond break-even point, and have good credit to qualify for best rates.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Cash-Out Refinance Benefits</h3>
                  <p className="text-gray-600 text-sm">
                    Access home equity for renovations, debt consolidation, or investments. Best when mortgage rates are lower than other debt, you need significant capital, and increased payment fits your budget comfortably.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Market Timing Considerations</h3>
                  <p className="text-gray-600 text-sm">
                    Monitor interest rate trends, economic indicators, and Federal Reserve policy. Lock rates when favorable, but don't try to time the absolute bottom. Focus on break-even analysis rather than perfect timing.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Credit Score Optimization</h3>
                  <p className="text-gray-600 text-sm">
                    Improve credit score before refinancing to qualify for best rates. Pay down credit cards, avoid new credit inquiries, and review credit reports for errors. Even small score improvements can save thousands.
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
        
        {/* Educational Content Section */}
        <div className="w-full">
          <div className="px-6 py-8">
            <div className="space-y-6">
              
              {/* Refinance Strategy Overview */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Mortgage Refinance Strategy & Timing</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 text-base">Rate and Term Refinance</h3>
                    <p className="text-gray-600 text-sm">
                      Focus on lowering interest rate or changing loan term. Generally worthwhile when you can reduce rate by 0.5-0.75%, plan to stay in home beyond break-even point, and have good credit to qualify for best rates.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 text-base">Cash-Out Refinance Benefits</h3>
                    <p className="text-gray-600 text-sm">
                      Access home equity for renovations, debt consolidation, or investments. Best when mortgage rates are lower than other debt, you need significant capital, and increased payment fits your budget comfortably.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 text-base">Market Timing Considerations</h3>
                    <p className="text-gray-600 text-sm">
                      Monitor interest rate trends, economic indicators, and Federal Reserve policy. Lock rates when favorable, but don't try to time the absolute bottom. Focus on break-even analysis rather than perfect timing.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 text-base">Credit Score Optimization</h3>
                    <p className="text-gray-600 text-sm">
                      Improve credit score before refinancing to qualify for best rates. Pay down credit cards, avoid new credit inquiries, and review credit reports for errors. Even small score improvements can save thousands.
                    </p>
                  </div>
                </div>
              </section>
              
              {/* Refinance Pros and Cons */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Mortgage Refinance: Pros and Cons</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pros Section */}
                  <section className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        ✓
                      </div>
                      <h4 className="font-semibold text-green-700 text-base">Benefits of Refinancing</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Lower Monthly Payments:</strong> Reduce interest rate to decrease monthly payments.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Interest Savings:</strong> Save thousands in total interest over loan life.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Shorter Loan Term:</strong> Pay off mortgage faster with 15-year refinance.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Cash-Out Option:</strong> Access home equity for major expenses.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Loan Type Switch:</strong> Change from ARM to fixed-rate mortgage.</span></li>
                    </ul>
                  </section>

                  {/* Cons Section */}
                  <section className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        ✗
                      </div>
                      <h4 className="font-semibold text-red-700 text-base">Drawbacks of Refinancing</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Closing Costs:</strong> Typically 2-5% of loan amount in fees.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Break-Even Period:</strong> May take years to recoup closing costs.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Extended Timeline:</strong> Longer loan term increases total interest paid.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Qualification Risk:</strong> Credit or income changes may affect approval.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Market Volatility:</strong> Rate fluctuations during application process.</span></li>
                    </ul>
                  </section>
                </div>
              </section>
            </div>
          </div>
        
        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 text-center mt-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Calculate Your Refinance Potential Today</h3>
            <p className="text-blue-100 text-base mb-6 max-w-2xl mx-auto">
              Our comprehensive refinance calculator analyzes your potential savings, break-even timeline, and monthly payment changes. Make informed refinancing decisions with accurate calculations.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Your Refinance Analysis
            </Button>
          </div>
        </section>
        </div>
      </div>
      </TooltipProvider>
    </>
  );
}