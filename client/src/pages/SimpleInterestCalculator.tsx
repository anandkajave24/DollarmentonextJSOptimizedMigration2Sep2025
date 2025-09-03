import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Calculator, DollarSign, Percent, Clock, TrendingUp, HelpCircle } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Helmet } from 'react-helmet';

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [interestRate, setInterestRate] = useState(5);
  const [timePeriod, setTimePeriod] = useState(3);
  const [timeUnit, setTimeUnit] = useState('years');

  const [simpleInterest, setSimpleInterest] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  useEffect(() => {
    calculateSimpleInterest();
  }, [principal, interestRate, timePeriod, timeUnit]);

  const calculateSimpleInterest = () => {
    // Convert time to years if needed
    let timeInYears = timePeriod;
    if (timeUnit === 'months') {
      timeInYears = timePeriod / 12;
    } else if (timeUnit === 'days') {
      timeInYears = timePeriod / 365;
    }

    // Simple Interest = P × R × T / 100
    const interest = (principal * interestRate * timeInYears) / 100;
    const total = principal + interest;

    setSimpleInterest(interest);
    setFinalAmount(total);
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
      name: 'Principal',
      value: principal,
      color: '#3b82f6'
    },
    {
      name: 'Simple Interest',
      value: simpleInterest,
      color: '#10b981'
    }
  ];

  const comparisonData = [];
  const maxTime = timeUnit === 'years' ? timePeriod : timeUnit === 'months' ? Math.min(timePeriod, 120) : Math.min(timePeriod, 1825);
  
  for (let t = 0; t <= maxTime; t += Math.max(1, Math.floor(maxTime / 10))) {
    let timeInYears = t;
    if (timeUnit === 'months') timeInYears = t / 12;
    if (timeUnit === 'days') timeInYears = t / 365;
    
    const interest = (principal * interestRate * timeInYears) / 100;
    const total = principal + interest;
    
    comparisonData.push({
      time: t,
      simpleInterest: total,
      principal: principal
    });
  }

  const getTimeLabel = () => {
    switch (timeUnit) {
      case 'years': return 'Years';
      case 'months': return 'Months';
      case 'days': return 'Days';
      default: return 'Time';
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">
            {formatCurrency(data.value)} ({((data.value / finalAmount) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Helmet>
        <title>Simple Interest Calculator - Calculate Simple Interest & Returns | DollarMento</title>
        <meta name="description" content="Calculate simple interest on investments and loans. Compare simple vs compound interest and understand interest calculations with our easy-to-use calculator." />
        <meta name="keywords" content="simple interest calculator, interest calculator, simple interest formula calculator, loan interest calculator, savings interest calculator" />
        <link rel="canonical" href="https://dollarmento.com/simple-interest-calculator" />
      </Helmet>
      <TooltipProvider>
      <div className="w-full p-6 space-y-8">
        <div className="text-left space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Simple Interest Calculator</h1>
          <p className="text-lg text-gray-600 max-w-3xl">Calculate interest earned on principal only, with no compounding effects. Perfect for understanding basic interest concepts and loan calculations.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            {/* Investment Details */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Investment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="principal">Principal Amount</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Initial amount invested or borrowed</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Input
                    id="principal"
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    placeholder="$10,000"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label>Annual Interest Rate (%)</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Annual interest rate as a percentage</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <div className="space-y-3">
                    <Slider
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      max={20}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>0.1%</span>
                      <span className="font-medium">{interestRate}%</span>
                      <span>20%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="timePeriod">Time Period</Label>
                      <UITooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Duration of the investment or loan</p>
                        </TooltipContent>
                      </UITooltip>
                    </div>
                    <Input
                      id="timePeriod"
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      placeholder="3"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label>Time Unit</Label>
                      <UITooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Unit of time measurement</p>
                        </TooltipContent>
                      </UITooltip>
                    </div>
                    <Select value={timeUnit} onValueChange={setTimeUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="years">Years</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Formula Explanation */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Simple Interest Formula
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-lg font-mono font-bold">SI = P × R × T / 100</p>
                      <p className="text-sm text-gray-600 mt-2">Simple Interest = Principal × Rate × Time / 100</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium">P = Principal:</span>
                      <span className="ml-2">{formatCurrency(principal)}</span>
                    </div>
                    <div>
                      <span className="font-medium">R = Rate:</span>
                      <span className="ml-2">{interestRate}% per annum</span>
                    </div>
                    <div>
                      <span className="font-medium">T = Time:</span>
                      <span className="ml-2">{timePeriod} {timeUnit}</span>
                    </div>
                    <div>
                      <span className="font-medium">SI = Interest:</span>
                      <span className="ml-2">{formatCurrency(simpleInterest)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Using this Calculator */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Using this Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">1.</span>
                    <span>Enter the amount of money you want to invest.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Set the interest rate for the year.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Pick the time frame and unit (days, months, or years)</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Look over the final amount and the interest that was calculated</span>
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
                  <p>• Simple interest doesn't build up over time</p>
                  <p>• Instead, real investments may use compound interest.</p>
                  <p>• Think about how inflation affects how much you can buy.</p>
                  <p>• Talk to financial advisors before making investment choices</p>
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
                      <p className="text-sm text-gray-600">Simple Interest</p>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(simpleInterest)}</p>
                    </div>
                    <Percent className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Final Amount</p>
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency(finalAmount)}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Principal</p>
                      <p className="text-2xl font-bold text-purple-600">{formatCurrency(principal)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Time Period</p>
                      <p className="text-2xl font-bold text-orange-600">{timePeriod}</p>
                      <p className="text-xs text-gray-500">{timeUnit}</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Amount Breakdown Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Amount Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="#fff"
                        strokeWidth={2}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Principal ({formatCurrency(principal)})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Interest ({formatCurrency(simpleInterest)})</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Growth Over Time */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Growth Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="time" 
                        label={{ value: getTimeLabel(), position: 'insideBottom', offset: -10 }} 
                      />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
                      <Bar dataKey="principal" stackId="a" fill="#3b82f6" name="Principal" />
                      <Bar dataKey="simpleInterest" stackId="a" fill="#10b981" name="With Interest" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Interest Calculation Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Calculation Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Principal Amount:</span>
                    <span className="font-medium">{formatCurrency(principal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="font-medium">{interestRate}% per annum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time Period:</span>
                    <span className="font-medium">{timePeriod} {timeUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Simple Interest:</span>
                    <span className="font-medium text-green-600">{formatCurrency(simpleInterest)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Final Amount:</span>
                    <span className="text-blue-600">{formatCurrency(finalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Return on Investment:</span>
                    <span>{((simpleInterest / principal) * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Simple Interest vs. Compound Interest */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Simple Interest vs. Compound Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Simple Interest:</h4>
                      <p className="text-sm text-gray-600">Interest that is only calculated on the principal amount</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Compound Interest:</h4>
                      <p className="text-sm text-gray-600">Interest that is based on the principal plus any interest that has already been earned.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Examples of Use</h4>
                      <p className="text-sm text-gray-600">Simple interest: loans and bonds; compound interest: savings and investments</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>





          </div>
        </div>
      </div>

      {/* Educational Content Section - Full Width */}
      <div className="w-full">
        <div className="px-6 py-8">
          <div className="space-y-6">
            
            {/* Main Introduction */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Understanding Simple Interest Calculations
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Simple interest is the most basic form of interest calculation, making it easy to understand loan costs and basic investment returns. Unlike compound interest, simple interest is calculated only on the principal amount, providing predictable and transparent results.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                This calculator helps you understand exactly how much interest you'll pay on loans or earn on basic investments using the simple interest formula: Interest = Principal × Rate × Time.
              </p>
            </div>

            {/* Simple vs Compound Interest */}
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Simple Interest vs. Compound Interest</h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-1">Simple Interest</h4>
                  <p className="text-gray-600 text-sm">
                    Interest calculated only on the principal amount. The interest earned or paid remains constant throughout the investment or loan period.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-1">Compound Interest</h4>
                  <p className="text-gray-600 text-sm">
                    Interest calculated on both the principal and previously earned interest. This creates exponential growth over time for investments.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-1">When Each is Used</h4>
                  <p className="text-gray-600 text-sm">
                    Simple interest: Most loans, bonds, and basic calculations. Compound interest: Savings accounts, investments, and long-term financial planning.
                  </p>
                </div>
              </div>
            </section>

            {/* Pros and Cons Section */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Pros and Cons of Simple Interest</h2>
              <p className="text-sm text-gray-600 mb-6">Understanding the advantages and disadvantages of simple interest calculations</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pros Column */}
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-semibold">✓</span>
                    </div>
                    <h3 className="font-semibold text-green-700 text-lg">Pros</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Easy to Calculate</h4>
                        <p className="text-gray-600 text-sm">Simple formula makes calculations straightforward and predictable.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Transparent Costs</h4>
                        <p className="text-gray-600 text-sm">Borrowers know exactly what they'll pay in interest over time.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Lower Interest Costs</h4>
                        <p className="text-gray-600 text-sm">Generally results in lower total interest compared to compound interest.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cons Column */}
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-semibold">✗</span>
                    </div>
                    <h3 className="font-semibold text-red-700 text-lg">Cons</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-red-600 mr-2 mt-1">✗</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Limited Growth Potential</h4>
                        <p className="text-gray-600 text-sm">Doesn't take advantage of compounding for investment growth.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-600 mr-2 mt-1">✗</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Less Common</h4>
                        <p className="text-gray-600 text-sm">Most modern investments and savings use compound interest instead.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-600 mr-2 mt-1">✗</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Linear Growth Only</h4>
                        <p className="text-gray-600 text-sm">Growth rate remains constant and doesn't accelerate over time.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Use Calculator Section */}
            <section className="mb-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Why Use a Simple Interest Calculator?</h3>
                <p className="text-sm text-gray-600">Make informed decisions about loans and basic investments</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-1">Loan Planning</h4>
                  <p className="text-gray-600 text-sm">
                    Calculate exact interest costs for personal loans, auto loans, and mortgages.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-1">Quick Calculations</h4>
                  <p className="text-gray-600 text-sm">
                    Get instant results for short-term investments and simple financial planning.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-1">Educational Tool</h4>
                  <p className="text-gray-600 text-sm">
                    Learn basic interest concepts before moving to compound interest investments.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Frequently Asked Questions</h3>
                <p className="text-sm text-gray-600">Common questions about simple interest calculations</p>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    What is the simple interest formula?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Simple Interest = Principal × Rate × Time (SI = P × R × T). The rate should be expressed as a decimal, and time in years. For example: $1,000 × 0.05 × 2 = $100 interest.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    When is simple interest used instead of compound interest?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Simple interest is commonly used for auto loans, personal loans, and some bonds. It's also used for educational purposes and short-term investments where compounding doesn't significantly impact returns.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    How do I convert monthly rates to annual rates?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Multiply the monthly rate by 12 to get the annual rate. For example, 0.5% monthly = 6% annually. Always verify whether rates are quoted as monthly, annual, or another period.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    What's the difference between APR and simple interest rate?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    APR (Annual Percentage Rate) includes fees and other costs beyond just interest, giving you the true cost of borrowing. Simple interest rate only reflects the basic interest calculation without additional fees.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Call to Action Section */}
            <section className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-blue-800 mb-3">Start Your Simple Interest Calculations</h3>
              <p className="text-sm text-gray-700 mb-4">
                Use our calculator to understand loan costs and basic investment returns with simple interest.
              </p>
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Calculate Now
              </Button>
            </section>

          </div>
        </div>
      </div>
    </TooltipProvider>
    </>
  );
}