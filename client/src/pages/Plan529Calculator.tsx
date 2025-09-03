import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Calculator, GraduationCap, DollarSign, TrendingUp, BookOpen, HelpCircle } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Helmet } from 'react-helmet';

export default function Plan529Calculator() {
  const [childAge, setChildAge] = useState(5);
  const [collegeAge, setCollegeAge] = useState(18);
  const [currentSavings, setCurrentSavings] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(300);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [inflationRate, setInflationRate] = useState(3);
  const [educationCost, setEducationCost] = useState(25000);
  const [stateTaxBenefit, setStateTaxBenefit] = useState(true);

  const [futureValue, setFutureValue] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalGrowth, setTotalGrowth] = useState(0);
  const [projectedCost, setProjectedCost] = useState(0);
  const [shortfall, setShortfall] = useState(0);

  useEffect(() => {
    calculate529Plan();
  }, [childAge, collegeAge, currentSavings, monthlyContribution, annualReturn, inflationRate, educationCost]);

  const calculate529Plan = () => {
    const yearsToCollege = collegeAge - childAge;
    const monthsToCollege = yearsToCollege * 12;
    const monthlyRate = annualReturn / 100 / 12;
    
    // Calculate future value of current savings
    const currentSavingsFV = currentSavings * Math.pow(1 + annualReturn / 100, yearsToCollege);
    
    // Calculate future value of monthly contributions
    let monthlyContributionsFV = 0;
    if (monthlyRate > 0) {
      monthlyContributionsFV = monthlyContribution * 
        ((Math.pow(1 + monthlyRate, monthsToCollege) - 1) / monthlyRate);
    } else {
      monthlyContributionsFV = monthlyContribution * monthsToCollege;
    }
    
    const totalFV = currentSavingsFV + monthlyContributionsFV;
    const totalContrib = currentSavings + (monthlyContribution * monthsToCollege);
    const growth = totalFV - totalContrib;
    
    // Calculate projected education cost with inflation
    const projectedEducationCost = educationCost * Math.pow(1 + inflationRate / 100, yearsToCollege) * 4; // 4 years of college
    
    // Calculate shortfall/surplus
    const fundingGap = projectedEducationCost - totalFV;
    
    setFutureValue(totalFV);
    setTotalContributions(totalContrib);
    setTotalGrowth(growth);
    setProjectedCost(projectedEducationCost);
    setShortfall(fundingGap);
  };

  const generateProjectionData = () => {
    const yearsToCollege = collegeAge - childAge;
    const data = [];
    
    for (let year = 0; year <= yearsToCollege; year++) {
      const currentAge = childAge + year;
      const monthsElapsed = year * 12;
      const monthlyRate = annualReturn / 100 / 12;
      
      // Future value of initial savings
      const currentSavingsFV = currentSavings * Math.pow(1 + annualReturn / 100, year);
      
      // Future value of contributions so far
      let contributionsFV = 0;
      if (monthsElapsed > 0 && monthlyRate > 0) {
        contributionsFV = monthlyContribution * 
          ((Math.pow(1 + monthlyRate, monthsElapsed) - 1) / monthlyRate);
      } else if (monthsElapsed > 0) {
        contributionsFV = monthlyContribution * monthsElapsed;
      }
      
      const totalValue = currentSavingsFV + contributionsFV;
      const totalContributed = currentSavings + (monthlyContribution * monthsElapsed);
      const growth = totalValue - totalContributed;
      
      data.push({
        age: currentAge,
        totalValue: totalValue,
        contributions: totalContributed,
        growth: growth
      });
    }
    
    return data;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const chartData = [
    {
      name: 'Contributions',
      value: totalContributions,
      color: '#3b82f6'
    },
    {
      name: 'Investment Growth',
      value: totalGrowth,
      color: '#10b981'
    }
  ];

  const projectionData = generateProjectionData();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">
            {formatCurrency(data.value)} ({((data.value / futureValue) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Helmet>
        <title>529 Plan Calculator - Education Savings Plan Calculator | DollarMento</title>
        <meta name="description" content="Calculate 529 education savings plan growth and college funding needs. Plan for future education costs with tax-advantaged 529 college savings." />
        <meta name="keywords" content="529 calculator, 529 plan calculator, college savings calculator, education savings calculator, college funding calculator, 529 college savings plan calculator" />
        <link rel="canonical" href="https://dollarmento.com/529-calculator" />
      </Helmet>
      <TooltipProvider>
      <div className="w-full px-4">
        <div className="mb-8 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">529 Education Savings Plan Calculator</h1>
          <p className="text-sm text-gray-600 max-w-3xl">Plan for your child's education expenses with tax-advantaged 529 savings plans</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Child & Education Info */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Child & Education Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="childAge">Child's Current Age</Label>
                      <UITooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Your child's current age in years</p>
                        </TooltipContent>
                      </UITooltip>
                    </div>
                    <Select value={childAge.toString()} onValueChange={(value) => setChildAge(Number(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 18 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>{i} years old</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="collegeAge">College Starting Age</Label>
                      <UITooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Age when your child will start college</p>
                        </TooltipContent>
                      </UITooltip>
                    </div>
                    <Select value={collegeAge.toString()} onValueChange={(value) => setCollegeAge(Number(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="17">17 years old</SelectItem>
                        <SelectItem value="18">18 years old</SelectItem>
                        <SelectItem value="19">19 years old</SelectItem>
                        <SelectItem value="20">20 years old</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="educationCost">Annual Education Cost (Today's Dollars)</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Current annual cost of tuition, room, board, and expenses</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Input
                    id="educationCost"
                    type="number"
                    value={educationCost}
                    onChange={(e) => setEducationCost(Number(e.target.value))}
                    placeholder="$25,000"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Savings Plan */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Savings Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="currentSavings">Current 529 Balance</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Amount already saved in the 529 plan</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Input
                    id="currentSavings"
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    placeholder="$5,000"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Amount you plan to contribute each month</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Input
                    id="monthlyContribution"
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    placeholder="$300"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label>Expected Annual Return (%)</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Expected annual investment return rate</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <div className="space-y-3">
                    <Slider
                      value={[annualReturn]}
                      onValueChange={(value) => setAnnualReturn(value[0])}
                      max={12}
                      min={3}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>3%</span>
                      <span className="font-medium">{annualReturn}%</span>
                      <span>12%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label>Education Inflation Rate (%)</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Annual rate at which education costs increase</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <div className="space-y-3">
                    <Slider
                      value={[inflationRate]}
                      onValueChange={(value) => setInflationRate(value[0])}
                      max={8}
                      min={1}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>1%</span>
                      <span className="font-medium">{inflationRate}%</span>
                      <span>8%</span>
                    </div>
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
                    <span>Put in the child's age and the date they start college.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Figure out how much school costs right now</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Set monthly contributions and current savings</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Look over the projected savings and the cost of education.</span>
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
                  <p>• The calculations are just guesses for planning purposes</p>
                  <p>• There is no guarantee of returns on investments</p>
                  <p>• The benefits of state taxes depend on the state and the plan.</p>
                  <p>• Talk to a financial advisor for advice that is specific to you</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-3 space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">529 Plan Value</p>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(futureValue)}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Contributions</p>
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalContributions)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Investment Growth</p>
                      <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalGrowth)}</p>
                    </div>
                    <Calculator className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Education Cost</p>
                      <p className="text-2xl font-bold text-orange-600">{formatCurrency(projectedCost)}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Funding Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Funding Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Education Funding Status:</span>
                      <span className={`font-bold ${shortfall > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {shortfall > 0 ? `Shortfall: ${formatCurrency(shortfall)}` : `Surplus: ${formatCurrency(-shortfall)}`}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${shortfall > 0 ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min(100, (futureValue / projectedCost) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      {shortfall > 0 
                        ? `You need an additional ${formatCurrency(shortfall / ((collegeAge - childAge) * 12))} per month`
                        : 'You are on track to fully fund education costs'
                      }
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Years to College:</span>
                      <span className="font-medium ml-2">{collegeAge - childAge} years</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Coverage Percentage:</span>
                      <span className="font-medium ml-2">{((futureValue / projectedCost) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Growth Projection Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Growth Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" label={{ value: 'Child Age', position: 'insideBottom', offset: -10 }} />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
                      <Line type="monotone" dataKey="totalValue" stroke="#10b981" strokeWidth={3} name="Total Value" />
                      <Line type="monotone" dataKey="contributions" stroke="#3b82f6" strokeWidth={2} name="Contributions" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Benefits of a 529 Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Benefits of a 529 Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Tax-Free Growth</h4>
                      <p className="text-sm text-gray-600">When used for qualified expenses, earnings grow tax-free at the federal level.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Benefits of State Taxes</h4>
                      <p className="text-sm text-gray-600">Many states let you deduct or credit your donations on your taxes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Use it however you want</h4>
                      <p className="text-sm text-gray-600">Can be used to pay for K–12 tuition, college, trade schools, and more.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">High Limits on Contributions</h4>
                      <p className="text-sm text-gray-600">Lifetime contribution limits are usually $300,000 or more for each beneficiary.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
        
        {/* Educational Content Section */}
        <div className="w-full">
          <div className="px-6 py-8">
            <div className="space-y-6">
              
              {/* 529 College Planner */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">529 Education Savings Plan Planning</h2>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    529 Education Savings Plans are great tax-advantaged accounts that help families save money for school costs. Our all-in-one 529 calculator can help you prepare for rising education costs, make the most of your savings plan, and take advantage of state tax breaks while building a large education fund for your beneficiary.
                  </p>
                  <p>
                    Look into different amounts you can contribute, how your investments might grow, and how much school will cost in the future. Our calculator looks at state tax benefits, age-based portfolio choices, and ways to get the most out of your education savings.
                  </p>
                </div>
              </section>

              {/* How to Use This Calculator */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Use This Calculator</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Child Age and Timeline</h4>
                    <p className="text-gray-600 text-sm">
                      Type in your child's current age and the age they are expected to start college (usually 18). This sets the time frame for your investments, which changes how you allocate your assets.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Current Savings and Contributions</h4>
                    <p className="text-gray-600 text-sm">
                      Enter your current 529 balance and the amount you plan to contribute each month. Dollar-cost averaging and compound growth help regular monthly contributions grow.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Investment Return Expectations</h4>
                    <p className="text-gray-600 text-sm">
                      Conservative portfolios might expect 5–7% a year, while aggressive portfolios might expect 7–9%. Age-based portfolios usually start off risky and get safer as college gets closer.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Education Cost Planning</h4>
                    <p className="text-gray-600 text-sm">
                      Find out how much your target schools cost now, and then add 3–5% for inflation each year. Think about the cost of tuition for in-state and out-of-state students.
                    </p>
                  </div>
                </div>
              </section>

              {/* Understanding 529 Education Savings Plans */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Understanding 529 Education Savings Plans</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Tax-Free Growth and Withdrawals</h4>
                    <p className="text-gray-600 text-sm">
                      529 plans grow tax-free at the federal level, and withdrawals for qualified education expenses are also tax-free. This includes tuition, fees, books, supplies, and room and board.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Qualified Education Expenses</h4>
                    <p className="text-gray-600 text-sm">
                      You can use the money to pay for college, graduate school, trade schools, and K–12 tuition (up to $10,000 a year). Qualified expenses include tuition, required fees, books, supplies, equipment, and room and board.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">High Contribution Limits</h4>
                    <p className="text-gray-600 text-sm">
                      Most states let you give $300,000 to $500,000 to each beneficiary over their lifetime. There are no limits on how much you can give each year.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Beneficiary Flexibility</h4>
                    <p className="text-gray-600 text-sm">
                      If the original beneficiary doesn't use all of the money, you can change the beneficiary to another family member. This includes your siblings, cousins, parents, and even you.
                    </p>
                  </div>
                </div>
              </section>

              {/* Plan Selection and State Tax Benefits */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Plan Selection and State Tax Benefits</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">State Tax Deductions</h4>
                    <p className="text-gray-600 text-sm">
                      More than 30 states give tax breaks or credits for 529 contributions. Some states make you use their plan, while others let you deduct any state's plan.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">In-State vs Out-of-State Plans</h4>
                    <p className="text-gray-600 text-sm">
                      If your state has tax breaks, look at them next to other states' plans that might have better investment options. In some cases, the tax break makes up for higher fees.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Plan Fees and Costs</h4>
                    <p className="text-gray-600 text-sm">
                      Look at the expense ratios, administrative fees, and costs of the investments themselves. Plans that cost less can have a big effect on long-term growth.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Investment Options</h4>
                    <p className="text-gray-600 text-sm">
                      Find plans that offer target-date funds, age-based portfolios, and individual fund options. Age-based portfolios automatically switch from growth to conservative as college gets closer.
                    </p>
                  </div>
                </div>
              </section>

              {/* Advanced 529 Planning Strategies */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced 529 Planning Strategies</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Superfunding Strategy</h4>
                    <p className="text-gray-600 text-sm">
                      You can give someone five years' worth of annual gift tax exclusions ($85,000 in 2023) in one year without having to pay gift tax. This puts a lot of money into the account at the start so it can grow as much as possible.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Grandparent Ownership</h4>
                    <p className="text-gray-600 text-sm">
                      Grandparents can have 529 accounts, which might help lower the amount of financial aid they need. But money taken out of accounts owned by grandparents counts as student income on the FAFSA.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Multiple Beneficiary Plan</h4>
                    <p className="text-gray-600 text-sm">
                      To get the most state tax breaks and make estate planning easier, some families open separate accounts for each child. Some people like having one account and changing the beneficiaries.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Scholarship Contingency</h4>
                    <p className="text-gray-600 text-sm">
                      If your child gets scholarships, you can take out the same amount from the 529 without paying the 10% penalty. You can use the rest of the money for graduate school or give it to other family members.
                    </p>
                  </div>
                </div>
              </section>

              {/* 529 Plans Pros and Cons */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">529 Education Savings Plans: Pros and Cons</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pros Section */}
                  <section className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        ✓
                      </div>
                      <h4 className="font-semibold text-green-700 text-base">Benefits of 529 Plans</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Tax-Free Growth:</strong> Tax-free growth and withdrawals for qualified expenses at federal and often state level.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>High Contribution Limits:</strong> Much higher than Coverdell ESAs or savings bonds ($300,000+ per beneficiary).</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>State Tax Benefits:</strong> Many states offer deductions or credits for contributions.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Professional Management:</strong> Age-based portfolios automatically adjust allocation over time.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Flexible Use:</strong> Can be used for K–12 tuition, college, graduate school, and trade schools.</span></li>
                    </ul>
                  </section>

                  {/* Cons Section */}
                  <section className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        ✗
                      </div>
                      <h4 className="font-semibold text-red-700 text-base">Drawbacks of 529 Plans</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Limited Investment Control:</strong> Restricted to plan's investment options, cannot pick individual stocks.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Penalties for Non-Education Use:</strong> 10% penalty plus income tax on earnings for non-qualified withdrawals.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>State Plan Restrictions:</strong> Some states require using in-state plan for tax benefits.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Impact on Financial Aid:</strong> Assets count toward Expected Family Contribution calculations.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Plan Fees:</strong> Administrative fees and investment expense ratios can reduce returns over time.</span></li>
                    </ul>
                  </section>
                </div>
              </section>

            </div>
          </div>
        
        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 text-center mt-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Calculate Your 529 Education Savings Today</h3>
            <p className="text-blue-100 text-base mb-6 max-w-2xl mx-auto">
              Plan for your child's future with our comprehensive 529 calculator. Maximize tax-free growth and ensure you're on track to meet education costs with strategic planning.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Your 529 Calculation
            </Button>
          </div>
        </section>
        </div>
      </div>
    </TooltipProvider>
    </>
  );
}