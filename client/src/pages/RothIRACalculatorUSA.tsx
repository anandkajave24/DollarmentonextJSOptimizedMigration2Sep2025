"use client"

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calculator, PiggyBank, TrendingUp, HelpCircle, Info, DollarSign, Target, Crown } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Helmet } from 'react-helmet';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface RothIRAInputs {
  annualContribution: number;
  currentAge: number;
  retirementAge: number;
  expectedReturn: number;
  compoundingFrequency: string;
}

interface RothIRAResults {
  totalContributionYears: number;
  totalInvested: number;
  futureValue: number;
  totalGrowth: number;
  taxFreeWithdrawal: number;
}

const RothIRACalculatorUSA: React.FC = () => {
  const [inputs, setInputs] = useState<RothIRAInputs>({
    annualContribution: 7000,
    currentAge: 30,
    retirementAge: 65,
    expectedReturn: 7.0,
    compoundingFrequency: 'annually'
  });

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (rate: number): string => {
    return `${rate.toFixed(1)}%`;
  };

  const handleInputChange = (field: keyof RothIRAInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? parseFloat(value) || 0 : value
    }));
  };

  const getContributionLimit = (age: number): number => {
    return age >= 50 ? 8000 : 7000; // 2025 limits with catch-up
  };

  const results = useMemo((): RothIRAResults => {
    const years = inputs.retirementAge - inputs.currentAge;
    const rate = inputs.expectedReturn / 100;
    const compoundsPerYear = inputs.compoundingFrequency === 'monthly' ? 12 : 1;
    const periodicRate = rate / compoundsPerYear;
    const totalPeriods = years * compoundsPerYear;
    const periodicContribution = inputs.annualContribution / compoundsPerYear;

    // Future Value of Annuity formula
    const futureValue = periodicContribution * 
      (Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate;

    const totalInvested = inputs.annualContribution * years;
    const totalGrowth = futureValue - totalInvested;

    return {
      totalContributionYears: years,
      totalInvested,
      futureValue,
      totalGrowth,
      taxFreeWithdrawal: futureValue // 100% tax-free for Roth IRA
    };
  }, [inputs]);

  // Chart data for growth breakdown - Doughnut chart with blue/orange design
  const chartData = {
    labels: ['Total Contributions', 'Tax-Free Growth'],
    datasets: [
      {
        data: [results.totalInvested, results.totalGrowth],
        backgroundColor: ['#3b82f6', '#f59e0b'], // Blue and Orange
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 3,
        cutout: '50%', // Creates doughnut effect
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = formatCurrency(context.parsed);
            const percentage = ((context.parsed / results.futureValue) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Roth IRA Calculator - Tax-Free Retirement Savings Calculator USA | DollarMento</title>
        <meta name="description" content="Free Roth IRA calculator with contribution limits and tax-free growth projections. Calculate your tax-free retirement savings, contribution strategies, and long-term growth potential." />
        <meta name="keywords" content="roth ira calculator, roth ira contribution calculator, traditional ira calculator, ira calculator, retirement calculator, roth vs traditional ira calculator, tax-free retirement calculator, ira contribution limit calculator, roth ira planning calculator, retirement savings calculator, ira investment calculator, tax-advantaged retirement calculator, roth ira growth calculator, ira comparison calculator, retirement planning calculator, individual retirement account calculator" />
        <link rel="canonical" href="https://dollarmento.com/roth-ira-calculator" />
      </Helmet>
      <TooltipProvider>
      <SEO 
        title="Roth IRA Calculator - Tax-Free Retirement Savings Calculator USA"
        description="Free Roth IRA calculator with contribution limits and tax-free growth projections. Calculate your tax-free retirement savings, contribution strategies, and long-term growth potential."
        keywords="roth ira calculator, roth ira contribution calculator, traditional ira calculator, ira calculator, retirement calculator, roth vs traditional ira calculator, tax-free retirement calculator, ira contribution limit calculator, roth ira planning calculator, retirement savings calculator, ira investment calculator, tax-advantaged retirement calculator, roth ira growth calculator, ira comparison calculator, retirement planning calculator, individual retirement account calculator"
        canonical="https://dollarmento.com/roth-ira-calculator"
        ogType="website"
      />
      <div className="w-full p-6 space-y-6">
        {/* Header */}
        <div className="text-left space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Roth IRA Calculator USA
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Maximize Your Tax-Free Retirement Wealth. Plan your retirement with confidence using this powerful calculator to estimate tax-free growth and make smarter investment decisions.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel - 50% width */}
          <div className="space-y-6">
            {/* Contribution Details */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-blue-800 text-base">
                    Your Contributions
                  </CardTitle>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Tax Year: 2025
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Annual Roth IRA Contribution
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Maximum annual contribution: $7,000 (under age 50) or $8,000 (age 50+). After-tax dollars only.</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Input
                      type="number"
                      value={inputs.annualContribution}
                      onChange={(e) => handleInputChange('annualContribution', e.target.value)}
                      className="mt-1"
                      placeholder="7000"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Max: ${getContributionLimit(inputs.currentAge).toLocaleString()} | 
                      Remaining: ${Math.max(0, getContributionLimit(inputs.currentAge) - inputs.annualContribution).toLocaleString()}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Current Age
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Your current age. Determines catch-up contribution eligibility and investment timeline.</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Input
                        type="number"
                        value={inputs.currentAge}
                        onChange={(e) => handleInputChange('currentAge', e.target.value)}
                        className="mt-1"
                        placeholder="30"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Retirement Age
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Target retirement age. Roth IRA has no required minimum distributions, so this is flexible.</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Input
                        type="number"
                        value={inputs.retirementAge}
                        onChange={(e) => handleInputChange('retirementAge', e.target.value)}
                        className="mt-1"
                        placeholder="65"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Expected Annual Return (%)
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Expected annual return on your investments. Historical S&P 500 average is ~10%, conservative estimate is 7%.</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={inputs.expectedReturn}
                      onChange={(e) => handleInputChange('expectedReturn', e.target.value)}
                      className="mt-1"
                      placeholder="7.0"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Compounding Frequency
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>How often returns are compounded. Monthly compounding assumes monthly contributions and reinvestment.</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Select value={inputs.compoundingFrequency} onValueChange={(value) => handleInputChange('compoundingFrequency', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annually">Annually</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-800">Total Contribution Years</span>
                    <span className="text-sm font-bold text-blue-700">{results.totalContributionYears} years</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm font-medium text-blue-800">Total Invested (Principal)</span>
                    <span className="text-sm font-bold text-blue-700">{formatCurrency(results.totalInvested)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Traditional vs Roth Comparison */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-purple-800 text-base">
                  Traditional vs Roth IRA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">Feature</th>
                        <th className="text-left py-2 font-medium text-orange-600">Traditional IRA</th>
                        <th className="text-left py-2 font-medium text-green-600">Roth IRA</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-2">
                      <tr className="border-b">
                        <td className="py-2 font-medium">Tax on Contributions</td>
                        <td className="py-2 text-orange-600">Tax-Deductible</td>
                        <td className="py-2 text-green-600">After-Tax</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Tax on Withdrawals</td>
                        <td className="py-2 text-orange-600">Taxed</td>
                        <td className="py-2 text-green-600">Tax-Free</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Required Distributions (RMD)</td>
                        <td className="py-2 text-orange-600">Yes (Age 73)</td>
                        <td className="py-2 text-green-600">No</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Best For</td>
                        <td className="py-2 text-orange-600">High Tax Bracket Now</td>
                        <td className="py-2 text-green-600">Low Tax Bracket Now</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* How to Use This Calculator */}
            <Card className="border-0 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-blue-800 text-base">
                  How to Use This Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-sm">1️⃣</span>
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm">Write down your plan for how much you will give</h4>
                      <p className="text-gray-600 text-xs">Decide how much money you want to put in each year (up to $7,000 or $8,000 if you're 50 or older) and how long you want to invest it.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm">2️⃣</span>
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm">Choose the expected returns</h4>
                      <p className="text-gray-600 text-xs">7% for a safe strategy or 10% for a risky one.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm">3️⃣</span>
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm">Check out tax-free growth</h4>
                      <p className="text-gray-600 text-xs">Learn how your after-tax contributions grow tax-free when you retire.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm">4️⃣</span>
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm">Compare to a normal IRA</h4>
                      <p className="text-gray-600 text-xs">Understand the benefits and drawbacks of getting a tax break right away as opposed to not paying taxes on withdrawals.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assumptions Box - Moved to bottom left */}
            <Card className="border-0 bg-gray-50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-gray-700 text-sm">
                  Assumptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs text-gray-600">
                  <p>• The IRS says that inflation can only affect annual contributions to a certain extent.</p>
                  <p>• Your income is low enough to open a Roth IRA (for single filers in 2025, it has to be less than $161,000).</p>
                  <p>• No fees or early withdrawals</p>
                  <p>• The investment grows by {formatPercentage(inputs.expectedReturn)} each year.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel - 50% width */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Tax-Free Growth Summary */}
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-green-800 text-base">
                    📈 Tax-Free Growth Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="text-xs text-green-600 font-medium">Future Value (at Age {inputs.retirementAge})</div>
                      <div className="text-lg font-bold text-green-700">{formatCurrency(results.futureValue)}</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="text-xs text-blue-600 font-medium">Total Growth (Earnings)</div>
                      <div className="text-lg font-bold text-blue-700">{formatCurrency(results.totalGrowth)}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-600 font-medium">Total Contributions</div>
                      <div className="text-lg font-bold text-gray-700">{formatCurrency(results.totalInvested)}</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                      <div className="text-xs text-purple-600 font-medium">Taxes on Withdrawal</div>
                      <div className="text-lg font-bold text-purple-700">$0 (Tax-Free)</div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-green-800">Net Available at Retirement</span>
                      <span className="text-xl font-bold text-green-700">{formatCurrency(results.taxFreeWithdrawal)}</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">(100% Yours - Completely Tax-Free)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Investment Breakdown Chart */}
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-blue-800 text-base">
                    Investment Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 relative">
                    <Pie data={chartData} options={chartOptions} />
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        <span>Contributions</span>
                      </div>
                      <span className="font-medium">{formatCurrency(results.totalInvested)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-500 rounded"></div>
                        <span>Tax-Free Growth</span>
                      </div>
                      <span className="font-medium">{formatCurrency(results.totalGrowth)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Roth IRA Benefits */}
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-green-800 text-base">
                    💎 Why Roth IRA Stands Out
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✅</span>
                      <span className="text-sm">All Withdrawals Are Tax-Free at Retirement (If qualified)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✅</span>
                      <span className="text-sm">No RMDs Required (Unlike Traditional IRA)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✅</span>
                      <span className="text-sm">Great for Younger Investors: Tax-free compounding for decades</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✅</span>
                      <span className="text-sm">Future Tax Rates Won't Impact You</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✅</span>
                      <span className="text-sm">Use Contributions Anytime (No Penalty)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actionable Tips */}
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-orange-800 text-base">
                    Actionable Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600">•</span>
                      <span className="text-sm">Max out Roth IRA each year — it grows tax-free!</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600">•</span>
                      <span className="text-sm">Combine with 401(k) and HSA to optimize all tax advantages</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600">•</span>
                      <span className="text-sm">Invest in diversified assets (index funds, ETFs, etc.)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600">•</span>
                      <span className="text-sm">Rebalance annually for optimized performance</span>
                    </div>
                  </div>
                </CardContent>
              </Card>


            </div>
          </div>
        </div>
      </div>

      {/* Educational Content Section - Full Width */}
      <div className="w-full">
        <div className="px-6 py-12">
          <div className="space-y-8">
              {/* Main Blog Header */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Last United States Calculator for Roth IRAs and a tool for planning a tax-free retirement
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  If you want to build wealth over the long term, Roth IRAs are a great option because they let you grow and take out money tax-free when you retire. Our all-in-one calculator lets you see how much your Roth IRA will grow, learn about contribution limits, and weigh the pros and cons of Roth IRAs and other retirement accounts.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  You put money into a Roth IRA after taxes, but you don't have to pay taxes on the money you make or take out when you retire. Younger investors and people who think their tax rates will be higher in retirement should think about using a Roth IRA.
                </p>
              </div>

              {/* Roth IRA Benefits Section */}
              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">The advantages of a Roth IRA and how to put money into one</h3>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">Growth and withdrawals that don't have to pay taxes</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      You don't have to pay taxes on any growth in a Roth IRA, and you also don't have to pay taxes on qualified withdrawals when you retire. This keeps your tax rate from going up in the future and gives you the most money possible after taxes when you retire.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">Who can contribute and how much they can contribute</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      In 2025, you can only give $7,000 a year at most. You can also make an extra $1,000 catch-up contribution if you are 50 or older. You can't make more than a certain amount of money. For single filers, the phase-out starts at $146,000, and for married couples filing jointly, it starts at $230,000.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">No Required Minimum Distributions</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      You don't have to take out a certain amount of money from a Roth IRA when you turn 73, like you do with a traditional IRA. Roth IRAs are great for planning your estate because your money can grow tax-free for as long as you live.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">You can easily take out your contributions.</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      You can get your contributions back at any time without having to pay taxes or fees. Roth IRAs are good for emergency funds because they are flexible, but you should only use them as a last resort to protect your retirement savings.
                    </p>
                  </div>
                </div>
              </section>

              {/* Roth vs Traditional IRA Section */}
              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Roth IRA vs. Traditional IRA Plan</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">Choose a Roth IRA</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      If you're young and have a long time to grow tax-free, you're in a lower tax bracket now than you thought you would be when you retire. You want estate planning benefits, or you think tax rates will go up in the future.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">Choose a Traditional IRA</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      You need tax breaks right away if you're in a high tax bracket now and expect rates to go down when you retire. Or if you're getting close to retirement and don't have much time for tax-free growth, you need tax breaks right away.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">Taking a Look at Tax Brackets</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Look at the tax rate you pay now and the tax rate you expect to pay when you retire. Roth usually wins when rates are lower right now. If rates go up, traditional IRAs might give you better tax breaks.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">Ways to Convert</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      When your income is low or the market is down, you might want to think about changing your regular IRAs to Roth IRAs. You will have to pay taxes on the money you change, but after that, your money will grow tax-free.
                    </p>
                  </div>
                </div>
              </section>

              {/* Why Roth IRA is Different */}
              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Roth IRA is Different:</h3>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <p className="text-sm text-gray-700">All Withdrawals Are Tax-Free at Retirement (If qualified)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <p className="text-sm text-gray-700">No RMDs Required (Unlike Traditional IRA)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <p className="text-sm text-gray-700">Great for Younger Investors: Tax-free compounding for decades</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <p className="text-sm text-gray-700">Future tax rates won't affect you</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <p className="text-sm text-gray-700">You can use your contributions anytime (no penalty)</p>
                  </div>
                </div>
              </section>

              {/* Tips Section */}
              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">✨ Here are some tips you can use:</h3>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 mr-2 mt-1">💡</span>
                    <p className="text-sm text-gray-700">Every year, put as much money as you can into your Roth IRA. It will grow tax-free!</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 mr-2 mt-1">💡</span>
                    <p className="text-sm text-gray-700">To get the most tax benefits, combine with a 401(k) and an HSA.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 mr-2 mt-1">💡</span>
                    <p className="text-sm text-gray-700">Invest in a mix of things, like index funds and ETFs.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 mr-2 mt-1">💡</span>
                    <p className="text-sm text-gray-700">To get the best results, you should rebalance your investments every year.</p>
                  </div>
                </div>
              </section>

              {/* Pros and Cons of Roth IRA */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Pros and Cons of Roth IRA</h2>
                <p className="text-sm text-gray-600 mb-6">Understanding the advantages and disadvantages of Roth IRA investments</p>
                
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
                          <h4 className="font-semibold text-gray-800 text-sm">Tax-Free Growth</h4>
                          <p className="text-gray-600 text-sm">Your investments grow completely tax-free for decades.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-2 mt-1">✓</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">No Required Distributions</h4>
                          <p className="text-gray-600 text-sm">Unlike traditional IRAs, you're never forced to withdraw money.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-2 mt-1">✓</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">Flexible Access</h4>
                          <p className="text-gray-600 text-sm">Withdraw contributions anytime without penalties.</p>
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
                          <h4 className="font-semibold text-gray-800 text-sm">No Immediate Tax Deduction</h4>
                          <p className="text-gray-600 text-sm">Contributions are made with after-tax dollars.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-red-600 mr-2 mt-1">✗</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">Income Limits</h4>
                          <p className="text-gray-600 text-sm">High earners may not be eligible for direct contributions.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-red-600 mr-2 mt-1">✗</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">Contribution Limits</h4>
                          <p className="text-gray-600 text-sm">Annual contribution limits are relatively low ($7,000 in 2025).</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Why Use Calculator Section */}
              <section className="mb-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Why Use a Roth IRA Calculator?</h3>
                  <p className="text-sm text-gray-600">Make informed decisions about your retirement planning</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-2">Financial Planning</h4>
                    <p className="text-sm text-gray-600">
                      Visualize your retirement savings growth and plan accordingly for your future financial needs.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-2">Goal Setting</h4>
                    <p className="text-sm text-gray-600">
                      Set realistic retirement goals based on accurate calculations and projections.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-2">Smart Decisions</h4>
                    <p className="text-sm text-gray-600">
                      Make informed choices about contribution amounts and investment strategies.
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="mb-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Frequently Asked Questions</h3>
                  <p className="text-sm text-gray-600">Common questions about Roth IRA investments and calculations</p>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left font-semibold text-gray-800">
                      What is the maximum Roth IRA contribution for 2025?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                      The maximum contribution for 2025 is $7,000 for individuals under 50, and $8,000 for those 50 and older (includes $1,000 catch-up contribution). These limits are subject to income restrictions.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left font-semibold text-gray-800">
                      How accurate are Roth IRA calculator projections?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                      Our calculations use compound interest formulas and are highly accurate for projection purposes. Actual returns will vary based on market performance, investment choices, and contribution consistency.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left font-semibold text-gray-800">
                      When can I withdraw from my Roth IRA without penalty?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                      You can withdraw contributions anytime tax and penalty-free. Earnings can be withdrawn tax-free after age 59½ and the account has been open for 5 years. Earlier withdrawals of earnings may incur penalties.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left font-semibold text-gray-800">
                      Should I contribute to Roth IRA or traditional IRA first?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                      Choose Roth IRA if you expect to be in a higher tax bracket in retirement or want tax-free withdrawals. Choose traditional IRA if you want immediate tax deductions and expect lower tax rates in retirement.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>

              {/* Call to Action Section */}
              <section className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold text-blue-800 mb-3">A Roth IRA is a way to save money for retirement without paying taxes</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Use our full planning tool to find out how much your Roth IRA could grow and how to get money for retirement without paying taxes.
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  <strong>Ready to start?</strong> Use the calculator above to see your personalized Roth IRA growth projections and plan your tax-free retirement today.
                </p>
                <Button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Calculate Your Roth IRA Growth Now
                </Button>
              </section>
          </div>
        </div>
      </div>
    </TooltipProvider>
    </>
  );
};

export default RothIRACalculatorUSA;