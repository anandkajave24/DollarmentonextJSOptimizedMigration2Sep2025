import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, DollarSign, Calculator, TrendingDown, Clock, PiggyBank, Info, HelpCircle, Target, AlertTriangle, CheckCircle, ChevronDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, ChartTooltip, Legend);

interface LoanInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  gracePeriod: number;
  annualIncome: number;
  familySize: number;
  state: string;
}

interface RepaymentPlan {
  name: string;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  payoffTime: number;
  description: string;
}

const StudentLoanCalculator = () => {
  const { toast } = useToast();

  // Loan inputs state
  const [loanInputs, setLoanInputs] = useState<LoanInputs>({
    loanAmount: 30000,
    interestRate: 5.5,
    loanTerm: 10,
    gracePeriod: 6,
    annualIncome: 50000,
    familySize: 1,
    state: 'NY'
  });

  // Update loan input helper
  const updateLoanInput = (field: keyof LoanInputs, value: string | number) => {
    setLoanInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? parseFloat(value) || 0 : value
    }));
  };

  // Calculate monthly payment using PMT formula
  const calculateMonthlyPayment = (principal: number, rate: number, periods: number): number => {
    if (rate === 0) return principal / periods;
    const monthlyRate = rate / 100 / 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, periods)) / (Math.pow(1 + monthlyRate, periods) - 1);
  };

  // Calculate repayment plans
  const calculateRepaymentPlans = (): RepaymentPlan[] => {
    const { loanAmount, interestRate, loanTerm } = loanInputs;
    const monthsInTerm = loanTerm * 12;
    
    // Standard Repayment (10 years)
    const standardMonths = 120; // 10 years
    const standardPayment = calculateMonthlyPayment(loanAmount, interestRate, standardMonths);
    const standardTotalCost = standardPayment * standardMonths;
    const standardInterest = standardTotalCost - loanAmount;

    // Graduated Repayment (10 years, starts low)
    const graduatedStartPayment = standardPayment * 0.5;
    const graduatedEndPayment = standardPayment * 1.5;
    const graduatedTotalCost = standardTotalCost * 1.15; // Typically 15% more
    const graduatedInterest = graduatedTotalCost - loanAmount;

    // Extended Repayment (25 years)
    const extendedMonths = 300; // 25 years
    const extendedPayment = calculateMonthlyPayment(loanAmount, interestRate, extendedMonths);
    const extendedTotalCost = extendedPayment * extendedMonths;
    const extendedInterest = extendedTotalCost - loanAmount;

    // Income-Driven Repayment (simplified calculation)
    const discretionaryIncome = Math.max(0, loanInputs.annualIncome - 15000); // Simplified poverty line
    const idrPayment = Math.max(0, discretionaryIncome * 0.10 / 12); // 10% of discretionary income
    const idrMonths = 300; // 25 years
    const idrTotalCost = Math.max(loanAmount, idrPayment * idrMonths);
    const idrInterest = idrTotalCost - loanAmount;

    return [
      {
        name: 'Standard Repayment',
        monthlyPayment: standardPayment,
        totalInterest: standardInterest,
        totalCost: standardTotalCost,
        payoffTime: 10,
        description: 'Fixed payments over 10 years'
      },
      {
        name: 'Graduated Repayment',
        monthlyPayment: graduatedStartPayment,
        totalInterest: graduatedInterest,
        totalCost: graduatedTotalCost,
        payoffTime: 10,
        description: 'Starts low, increases every 2 years'
      },
      {
        name: 'Extended Repayment',
        monthlyPayment: extendedPayment,
        totalInterest: extendedInterest,
        totalCost: extendedTotalCost,
        payoffTime: 25,
        description: 'Lower payments over 25 years'
      },
      {
        name: 'Income-Driven (IBR)',
        monthlyPayment: idrPayment,
        totalInterest: idrInterest,
        totalCost: idrTotalCost,
        payoffTime: 25,
        description: 'Based on income and family size'
      }
    ];
  };

  const repaymentPlans = calculateRepaymentPlans();
  const standardPlan = repaymentPlans[0];

  // Chart data for cost breakdown
  const chartData = {
    labels: ['Principal', 'Interest Paid'],
    datasets: [{
      data: [loanInputs.loanAmount, standardPlan.totalInterest],
      backgroundColor: ['#f59e0b', '#3b82f6'], // Orange for principal, blue for interest
      borderColor: ['#ffffff', '#ffffff'],
      borderWidth: 2
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label;
            const value = context.raw;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    }
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // US States for dropdown
  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  return (
    <>
      <Helmet>
        <title>Student Loan Calculator - Calculate College Loan Payments & Repayment Plans | DollarMento</title>
        <meta name="description" content="Calculate student loan payments, interest, and repayment options. Plan for federal and private college loans with income-driven repayment scenarios." />
        <meta name="keywords" content="student loan calculator, college loan payments, federal student loans, loan forgiveness calculator, income-driven repayment" />
        <link rel="canonical" href="https://dollarmento.com/student-loan-calculator" />
      </Helmet>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-900 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-3">
              <GraduationCap className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600" />
              <span>Student Loan Calculator</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">Make Smarter Decisions About Your Education Debt</p>
          </div>

          {/* How to Use This Calculator */}
          <Card className="mb-6 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-blue-800">
                How to Use This Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">1</span>
                  <span className="text-xs">Enter your loan amount and interest rate</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">2</span>
                  <span className="text-xs">Add income info for income-driven plans</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">3</span>
                  <span className="text-xs">Compare repayment plan options</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">4</span>
                  <span className="text-xs">Review optimization strategies</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content - 50/50 Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT SIDE - All Inputs (50%) */}
            <div className="space-y-6">
              
              {/* Loan Basics */}
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-blue-800 text-base">
                    <GraduationCap className="w-4 h-4" />
                    Loan Basics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Loan Amount
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total amount you borrowed or plan to borrow</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          type="number"
                          value={loanInputs.loanAmount}
                          onChange={(e) => updateLoanInput('loanAmount', e.target.value)}
                          className="pl-7"
                          placeholder="30,000"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Interest Rate (APR)
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Annual percentage rate for your student loan</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          type="number"
                          step="0.1"
                          value={loanInputs.interestRate}
                          onChange={(e) => updateLoanInput('interestRate', e.target.value)}
                          className="pr-7"
                          placeholder="5.5"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Loan Term
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Number of years for repayment</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Select value={loanInputs.loanTerm.toString()} onValueChange={(value) => updateLoanInput('loanTerm', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select term" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 years</SelectItem>
                          <SelectItem value="10">10 years</SelectItem>
                          <SelectItem value="15">15 years</SelectItem>
                          <SelectItem value="20">20 years</SelectItem>
                          <SelectItem value="25">25 years</SelectItem>
                          <SelectItem value="30">30 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Grace Period
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Months of deferment after graduation</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Select value={loanInputs.gracePeriod.toString()} onValueChange={(value) => updateLoanInput('gracePeriod', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0 months</SelectItem>
                          <SelectItem value="3">3 months</SelectItem>
                          <SelectItem value="6">6 months</SelectItem>
                          <SelectItem value="9">9 months</SelectItem>
                          <SelectItem value="12">12 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Income-Based Information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-green-800 text-base">
                    <DollarSign className="w-4 h-4" />
                    Income-Based Information
                  </CardTitle>
                  <p className="text-xs text-gray-600 mt-1">Required for income-driven repayment plans</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Annual Income
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Your current or expected annual gross income</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          type="number"
                          value={loanInputs.annualIncome}
                          onChange={(e) => updateLoanInput('annualIncome', e.target.value)}
                          className="pl-7"
                          placeholder="50,000"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Family Size
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Number of people in your household</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Select value={loanInputs.familySize.toString()} onValueChange={(value) => updateLoanInput('familySize', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 person</SelectItem>
                          <SelectItem value="2">2 people</SelectItem>
                          <SelectItem value="3">3 people</SelectItem>
                          <SelectItem value="4">4 people</SelectItem>
                          <SelectItem value="5">5 people</SelectItem>
                          <SelectItem value="6">6+ people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium flex items-center gap-1">
                        State of Residence
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Your state affects poverty guidelines for income calculations</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Select value={loanInputs.state} onValueChange={(value) => updateLoanInput('state', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Insights */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2 text-purple-800">
                    <Info className="w-4 h-4" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Standard repayment saves the most on total interest</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Income-driven plans offer payment flexibility based on earnings</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Loan forgiveness after 20-25 years may be taxable income</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <PiggyBank className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Extra payments significantly reduce total interest paid</span>
                  </div>
                </CardContent>
              </Card>

              {/* Important Disclaimers */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2 text-gray-700">
                    <AlertTriangle className="w-4 h-4" />
                    Important Disclaimers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <p>• Federal loan benefits may be lost when refinancing with private lenders</p>
                  <p>• Income-driven repayment calculations are estimates based on current rules</p>
                  <p>• Loan forgiveness may be subject to income tax in the year forgiven</p>
                  <p>• Grace period interest may capitalize when repayment begins</p>
                  <p>• This calculator provides estimates for educational purposes only</p>
                </CardContent>
              </Card>
            </div>

            {/* Results Section - 50% width */}
            <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-6">
              
              {/* Repayment Plans Comparison */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-blue-800 text-base">
                    <Calculator className="w-4 h-4" />
                    Repayment Plans Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {repaymentPlans.map((plan, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-1 text-sm">{plan.name}</h4>
                        <p className="text-xs text-gray-600 mb-2">{plan.description}</p>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-gray-500">Monthly Payment:</span>
                            <div className="font-semibold text-blue-600">{formatCurrency(plan.monthlyPayment)}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Payoff Time:</span>
                            <div className="font-semibold text-blue-600">{plan.payoffTime} years</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Total Interest:</span>
                            <div className="font-semibold text-blue-600">{formatCurrency(plan.totalInterest)}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Total Cost:</span>
                            <div className="font-semibold text-blue-600">{formatCurrency(plan.totalCost)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Cost Breakdown Chart */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-orange-800 text-base">
                    <TrendingDown className="w-4 h-4" />
                    Cost Breakdown (Standard Plan)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 mb-4">
                    <Doughnut data={chartData} options={chartOptions} />
                  </div>
                  
                  {/* Custom Legend */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-400 rounded"></div>
                      <span>Principal: {formatCurrency(loanInputs.loanAmount)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-400 rounded"></div>
                      <span>Interest: {formatCurrency(standardPlan.totalInterest)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Optimization Strategies */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-green-800 text-base">
                    <Target className="w-4 h-4" />
                    Optimization Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">💡 Smart Strategies</h4>
                    <ul className="space-y-1 text-xs">
                      <li>• Make biweekly payments to save on interest</li>
                      <li>• Apply tax refunds directly to principal</li>
                      <li>• Consider refinancing if you have good credit</li>
                      <li>• Explore Public Service Loan Forgiveness (PSLF)</li>
                      <li>• Pay more than minimum when income allows</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">🎯 Quick Scenarios</h4>
                    <ul className="space-y-1 text-xs">
                      <li>• Extra $100/month saves: ~{formatCurrency(standardPlan.totalInterest * 0.3)}</li>
                      <li>• Refinance to 4% saves: ~{formatCurrency(standardPlan.totalInterest * 0.2)}</li>
                      <li>• Graduate plan costs: {formatCurrency(repaymentPlans[1].totalCost - standardPlan.totalCost)} more</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

            </div>

          </div>

          {/* Blog Content Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <article className="max-w-none">
              
              {/* Main Blog Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  The Best USA Student Loan Calculator and Plan for Paying It Back
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Getting student loans is a big step toward your future, but you need to be careful about how you plan and use them. Our all-in-one student loan calculator can help you find the best ways to pay off your loans, the total cost of your education, and ways to lower your debt while still getting the most out of your education.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  There are different ways to pay back your loan, like income-driven plans, standard repayment plans, and refinancing options. Our calculator tells you everything you need to know about your student loans, such as federal loan forgiveness programs, how interest capitalization works, and things that are only true in your state.
                </p>
              </div>

              {/* How to Use Section */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Use This Student Loan Calculator</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">Fill in the loan information</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Please give us your total student loan balance, the average interest rate, and the normal time to pay it back. To find the weighted average rate for more than one loan, look at the balance and rate of each loan. Include both federal and private loans for a full analysis.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">Details about your income</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Your yearly income will determine whether you can get an income-driven repayment plan and how much you might have to pay each month. If you're still in school, use the salary you make now or the salary you expect to make when you start. How many people are in your family affects how much you have to pay back on federal loans.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">Making plans for the Grace Period</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      You have six months after you graduate to start paying back most federal loans. Interest usually keeps going up during this time. If you plan for this change, you'll be able to make a budget and think of ways to pay early.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">Looking at Different Repayment Plans</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Compare the standard 10-year repayment plan to the extended, graduated, and income-driven plans. Each choice has different monthly payments, total costs, and chances of getting the debt forgiven. Choose based on how much money you have and what you want to achieve in the long run.
                    </p>
                  </div>
                </div>
              </section>

              {/* Federal Repayment Plans Section */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Getting to Know Federal Repayment Plans</h3>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-base font-medium text-blue-800 mb-2">Plan for Standard Repayment</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Payments that stay the same every month for 10 years. This plan usually has the lowest total interest costs, but the highest monthly payments. Best for people who can afford to pay more and want to keep costs down.
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="text-base font-medium text-green-800 mb-2">Income-Based Repayment (IDR)</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The number of people in your family and how much money you make each month will affect your payments. They usually take up 10% to 20% of your extra money. IBR, PAYE, and REPAYE are all part of it. Gives people who have loans forgiveness after 20 to 25 years.
                    </p>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="text-base font-medium text-yellow-800 mb-2">Plan for Payments That Go Up</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Payments start out low and go up every two years for ten years. For people who borrow money and think their income will go up. The total cost of interest is less than the extended plan but more than the standard repayment plan.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="text-base font-medium text-purple-800 mb-2">Make Plans for Longer Payments</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      If you extend the term to 25 years, your monthly payments will be lower. For people who owe the government more than $30,000 in loans. It makes the total cost of interest much higher, but it lets you pay less.
                    </p>
                  </div>
                </div>
              </section>

              {/* Loan Forgiveness Programs Section */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Programs that let you get rid of your student loans</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-base font-medium text-gray-800 mb-2">Public Service Loan Forgiveness (PSLF)</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      If you work full-time for an eligible employer and make 120 qualifying payments (10 years), Public Service Loan Forgiveness (PSLF) will forgive the rest of your federal loan balance. These are government agencies, 501(c)(3) nonprofits, and other groups that serve the public. Needs Direct Loans and repayment plans that are in line with the rules.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-base font-medium text-gray-800 mb-2">Forgiveness of Loans for Teachers</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Teachers who work in schools with low-income students for five years in a row can have up to $17,500 of their loans forgiven. Teachers of all ages can apply, but math, science, and special education teachers can get more money forgiven.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-base font-medium text-gray-800 mb-2">Forgiveness for Repayment Based on Income</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      If you make qualifying payments on an income-driven plan for 20 to 25 years, the rest of your loan is forgiven. The amount that was forgiven could be taxable income. Best for people who have a lot of debt compared to their income and can make small monthly payments.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-base font-medium text-gray-800 mb-2">State and Professional Programs</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Many states and professions offer help with loans or forgiveness for healthcare workers, lawyers, veterinarians, and other professionals. A lot of the time, they make people promise to work in areas that don't get enough help or fields that need a lot of help.
                    </p>
                  </div>
                </div>
              </section>

              {/* Smart Payoff Strategies Section */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Pay Off Your Student Loans Wisely</h3>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="text-base font-medium text-gray-800 mb-2">The Avalanche Way</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Pay the least amount on all of your loans, and then use any extra money to pay off the loan with the highest interest rate. This is the best way to pay off debt because it costs the least in interest overall.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="text-base font-medium text-gray-800 mb-2">The Snowball Way</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Pay the least amount on all of your loans, and then use any extra money to pay off the loan with the least amount of money owed. This method gives you mental wins and motivation, which can help you stick to your plan to pay off your debt.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="text-base font-medium text-gray-800 mb-2">Every two weeks, payments</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Instead of paying the full amount every month, pay half of it every two weeks. In other words, you make 26 payments a year, which is the same as 13 payments every month. This makes your loan shorter and lowers the total interest.
                    </p>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="text-base font-medium text-gray-800 mb-2">Things to keep in mind when you refinance</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      If you refinance with a private lender, you may get lower interest rates, but you will lose federal protections like income-driven repayment and forgiveness programs. Best for people with good credit who don't need help from the government.
                    </p>
                  </div>
                </div>
              </section>

              {/* Tax Benefits Section */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Effects and Benefits of Taxes</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">Deduction for Student Loan Interest</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      You can deduct up to $2,500 from your taxes each year for the interest on your student loans that you paid during that year. Available for federal and private loans that are used to pay for qualified education costs. It goes away at higher income levels, but most borrowers get a lot of tax breaks from it.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">The Tax Effects of Forgiveness</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      You might have to pay taxes on the money you get back from your loan if you have an income-driven repayment plan and the loan is forgiven. PSLF forgiveness does not come with any taxes. Save money while you pay off your debt or think about how your plan will affect your taxes so you're ready for any tax bill that may come up.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">Tax Breaks for School</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      You can pay less in taxes while you are in school with the American Opportunity Tax Credit and the Lifetime Learning Credit. These credits can help you pay for school and cut down on the amount of money you need to borrow for school in the future.
                    </p>
                  </div>
                </div>
              </section>

              {/* Federal vs Private Loans Section */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Federal student loans and private student loans</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-base font-medium text-green-800 mb-3">Advantages of Federal Loans:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Income-driven repayment:</strong> means that payments are based on how much money you make and how many people live with you.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Programs for Forgiveness:</strong> PSLF and repayment based on income choices for forgiveness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Flexible Repayment:</strong> You have a number of options for how to pay back the loan and when to do so.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Rates of Interest That Don't Change:</strong> Rates set by Congress that are usually competitive</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span><strong>No Credit Check:</strong> Most students can get this, no matter what their credit history is.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-blue-800 mb-3">When you want to get a private loan, think about these things:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Cheaper Prices Possible:</strong> Could give borrowers with good credit lower rates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Higher borrowing limits:</strong> If federal aid isn't enough, you can pay for the whole cost of attendance.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Less Protection:</strong> There aren't many ways to pay back loans, and there aren't any forgiveness programs.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Credit Requirements:</strong> You need good credit or a cosigner to get the best rates.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Rates that change:</strong> The total cost will change if rates go up over time.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Pros and Cons Section */}
              <section className="mb-8">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Pros and Cons of Student Loans</h3>
                  <p className="text-sm text-gray-600">Understanding the advantages and disadvantages of student loan financing</p>
                </div>
                
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
                          <h4 className="font-semibold text-gray-800 text-sm">Access to Education</h4>
                          <p className="text-gray-600 text-sm">Makes higher education affordable and accessible for students regardless of financial background.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-2 mt-1">✓</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">Investment in Future</h4>
                          <p className="text-gray-600 text-sm">Education often leads to higher earning potential and better career opportunities.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-2 mt-1">✓</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">Flexible Repayment Options</h4>
                          <p className="text-gray-600 text-sm">Federal loans offer income-driven repayment plans and forbearance options.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-2 mt-1">✓</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">Build Credit History</h4>
                          <p className="text-gray-600 text-sm">Responsible loan repayment helps establish and improve your credit score.</p>
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
                          <h4 className="font-semibold text-gray-800 text-sm">Long-Term Debt Burden</h4>
                          <p className="text-gray-600 text-sm">Student loans can take 10-25 years to repay completely, affecting financial freedom.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-red-600 mr-2 mt-1">✗</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">Interest Accumulation</h4>
                          <p className="text-gray-600 text-sm">Interest compounds during school and repayment periods, increasing total cost.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-red-600 mr-2 mt-1">✗</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">Limited Discharge Options</h4>
                          <p className="text-gray-600 text-sm">Student loans are difficult to discharge in bankruptcy proceedings.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-red-600 mr-2 mt-1">✗</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">No Income Guarantee</h4>
                          <p className="text-gray-600 text-sm">Education doesn't guarantee employment or the expected salary to justify the debt.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Why Use Calculator Section */}
              <section className="mb-8">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Why Use a Student Loan Calculator?</h3>
                  <p className="text-sm text-gray-600">Make informed decisions about your education financing</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Calculator className="w-4 h-4 text-blue-600" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Financial Planning</h4>
                    <p className="text-xs text-gray-600">Understand your future payment obligations and plan your post-graduation budget</p>
                  </div>
                  <div className="text-center bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Target className="w-4 h-4 text-green-600" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Goal Setting</h4>
                    <p className="text-xs text-gray-600">Set realistic borrowing limits and repayment goals based on career expectations</p>
                  </div>
                  <div className="text-center bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <TrendingDown className="w-4 h-4 text-purple-600" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Smart Decisions</h4>
                    <p className="text-xs text-gray-600">Compare repayment plans and make informed choices about loan terms</p>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="mb-8">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Frequently Asked Questions</h3>
                  <p className="text-sm text-gray-600">Common questions about student loans and repayment</p>
                </div>
                
                <div>
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer py-2 text-base font-medium text-gray-900 border-b border-gray-200 list-none">
                      What is the difference between federal and private student loans?
                      <ChevronDown className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="pb-2 pt-1 text-sm text-gray-600">
                      Federal loans offer more flexible repayment options, forgiveness programs, and borrower protections, while private loans may offer lower interest rates for qualified borrowers but fewer protections.
                    </div>
                  </details>
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer py-2 text-base font-medium text-gray-900 border-b border-gray-200 list-none">
                      How do income-driven repayment plans work?
                      <ChevronDown className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="pb-2 pt-1 text-sm text-gray-600">
                      These plans calculate your monthly payment based on your income and family size, typically requiring 10-20% of your discretionary income. After 20-25 years of payments, remaining debt may be forgiven.
                    </div>
                  </details>
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer py-2 text-base font-medium text-gray-900 border-b border-gray-200 list-none">
                      Should I pay off student loans early or invest?
                      <ChevronDown className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="pb-2 pt-1 text-sm text-gray-600">
                      Consider your loan interest rate versus potential investment returns. If you can earn more investing than your loan rate, investing may be better. Also factor in loan tax deductions and your risk tolerance.
                    </div>
                  </details>
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer py-2 text-base font-medium text-gray-900 border-b border-gray-200 list-none">
                      What happens if I can't make my student loan payments?
                      <ChevronDown className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="pb-2 pt-1 text-sm text-gray-600">
                      Contact your loan servicer immediately. Options include deferment, forbearance, income-driven repayment plans, or loan consolidation. Avoiding contact can lead to default and serious consequences.
                    </div>
                  </details>
                </div>
              </section>

            </article>
          </div>

        </div>
      </div>
    </TooltipProvider>
    </>
  );
};

export default StudentLoanCalculator;
