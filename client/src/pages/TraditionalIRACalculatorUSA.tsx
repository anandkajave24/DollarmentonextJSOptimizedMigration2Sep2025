import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { Pie } from 'react-chartjs-2';
import { Helmet } from 'react-helmet';

interface TraditionalIRAInputs {
  annualContribution: number;
  currentAge: number;
  retirementAge: number;
  expectedReturn: number;
  currentTaxRate: number;
  retirementTaxRate: number;
  compoundingFrequency: string;
}

const TraditionalIRACalculatorUSA: React.FC = () => {
  const [inputs, setInputs] = useState<TraditionalIRAInputs>({
    annualContribution: 7000,
    currentAge: 30,
    retirementAge: 65,
    expectedReturn: 7.0,
    currentTaxRate: 22,
    retirementTaxRate: 22,
    compoundingFrequency: 'annually'
  });

  const handleInputChange = (field: keyof TraditionalIRAInputs, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: field === 'compoundingFrequency' ? value : parseFloat(value) || 0
    }));
  };

  const getContributionLimit = (age: number): number => {
    return age >= 50 ? 8000 : 7000;
  };

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

  const results = useMemo(() => {
    const years = inputs.retirementAge - inputs.currentAge;
    const monthlyRate = inputs.expectedReturn / 100 / 12;
    const annualRate = inputs.expectedReturn / 100;
    
    let futureValue: number;
    
    if (inputs.compoundingFrequency === 'monthly') {
      const months = years * 12;
      const monthlyContribution = inputs.annualContribution / 12;
      if (monthlyRate === 0) {
        futureValue = monthlyContribution * months;
      } else {
        futureValue = monthlyContribution * (((1 + monthlyRate) ** months - 1) / monthlyRate);
      }
    } else {
      if (annualRate === 0) {
        futureValue = inputs.annualContribution * years;
      } else {
        futureValue = inputs.annualContribution * (((1 + annualRate) ** years - 1) / annualRate);
      }
    }

    const totalInvested = inputs.annualContribution * years;
    const totalGrowth = futureValue - totalInvested;
    const currentTaxSavings = totalInvested * (inputs.currentTaxRate / 100);
    const taxesAtRetirement = futureValue * (inputs.retirementTaxRate / 100);
    const netAfterTaxWithdrawal = futureValue - taxesAtRetirement;

    return {
      futureValue,
      totalInvested,
      totalGrowth,
      currentTaxSavings,
      taxesAtRetirement,
      netAfterTaxWithdrawal,
      years
    };
  }, [inputs]);

  // Chart data for investment breakdown
  const chartData = {
    labels: ['Total Contributions', 'Investment Growth', 'Taxes at Retirement'],
    datasets: [
      {
        data: [results.totalInvested, results.totalGrowth, results.taxesAtRetirement],
        backgroundColor: ['#3b82f6', '#10b981', '#ef4444'], // Blue, Green, Red
        borderColor: ['#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 3,
        cutout: '50%',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
        <title>Traditional IRA Calculator - Tax-Deferred Retirement Planning USA | DollarMento</title>
        <meta name="description" content="Calculate Traditional IRA contributions, tax deductions, and retirement projections. Compare with Roth IRA and optimize tax-deferred growth strategies." />
        <meta name="keywords" content="traditional ira calculator, ira calculator, retirement calculator, tax deferred retirement, IRA contribution calculator, retirement planning calculator USA, tax deductible ira, traditional vs roth ira, ira tax benefits" />
        <link rel="canonical" href="https://dollarmento.com/traditional-ira-calculator" />
      </Helmet>
      <TooltipProvider>
      <div className="w-full px-4">
        {/* Header */}
        <div className="mb-8 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Traditional IRA Calculator USA
          </h1>
          <p className="text-sm text-gray-600 max-w-3xl">
            Smart Tax-Deferred Retirement Planning. Plan today. Retire wiser. Use this advanced Traditional IRA calculator to estimate your total retirement value, understand future tax liabilities, and see how tax deferral benefits your investments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Contribution Details */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-blue-800 text-base">
                    📥 Your Contributions
                  </CardTitle>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    📅 Tax Year: 2025
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Annual Traditional IRA Contribution
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Maximum annual contribution: $7,000 (under age 50) or $8,000 (age 50+). Tax-deductible from current income.</p>
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
                            <p>Target retirement age. Traditional IRA requires minimum distributions starting at age 73.</p>
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
                      Expected Annual Return
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Expected annual return on your investments. Historical S&P 500 average is ~10%, conservative estimate is 7%.</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        type="number"
                        step="0.1"
                        value={inputs.expectedReturn}
                        onChange={(e) => handleInputChange('expectedReturn', e.target.value)}
                        className="flex-1"
                        placeholder="7.0"
                      />
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Current Tax Rate
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Your current marginal tax rate. Used to calculate immediate tax savings from contributions.</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="number"
                          step="0.1"
                          value={inputs.currentTaxRate}
                          onChange={(e) => handleInputChange('currentTaxRate', e.target.value)}
                          className="flex-1"
                          placeholder="22"
                        />
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Retirement Tax Rate
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Expected tax rate at retirement. Withdrawals are taxed as ordinary income.</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="number"
                          step="0.1"
                          value={inputs.retirementTaxRate}
                          onChange={(e) => handleInputChange('retirementTaxRate', e.target.value)}
                          className="flex-1"
                          placeholder="22"
                        />
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                    </div>
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
              </CardContent>
            </Card>

            {/* Traditional vs Roth Comparison */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-purple-800 text-base">
                  ⚖️ Traditional IRA vs Roth IRA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">Feature</th>
                        <th className="text-left py-2 font-medium text-blue-600">Traditional IRA</th>
                        <th className="text-left py-2 font-medium text-green-600">Roth IRA</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-2">
                      <tr className="border-b border-gray-100">
                        <td className="py-2 text-gray-600">Tax on Contributions</td>
                        <td className="py-2 text-blue-600">Tax-Deductible</td>
                        <td className="py-2 text-green-600">After-Tax</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 text-gray-600">Tax on Growth</td>
                        <td className="py-2 text-blue-600">Deferred</td>
                        <td className="py-2 text-green-600">Tax-Free</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 text-gray-600">Tax on Withdrawals</td>
                        <td className="py-2 text-blue-600">Taxed as Income</td>
                        <td className="py-2 text-green-600">None</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 text-gray-600">RMD Required</td>
                        <td className="py-2 text-blue-600">Yes (from 73)</td>
                        <td className="py-2 text-green-600">None</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600">Best for</td>
                        <td className="py-2 text-blue-600">High tax bracket now</td>
                        <td className="py-2 text-green-600">Low tax bracket now</td>
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
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-medium min-w-[20px]">1.</span>
                    <span>Enter the amount you want to give each year (up to the IRS limits).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-medium min-w-[20px]">2.</span>
                    <span>For the timeline calculation, enter your current age and the age at which you plan to retire.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-medium min-w-[20px]">3.</span>
                    <span>Type in the tax rates that are currently in effect and those that are expected to be in effect when you retire.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-medium min-w-[20px]">4.</span>
                    <span>Check out the predictions and how taxes will affect them on the right</span>
                  </div>
                  <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
                    <p className="text-xs text-blue-800 font-medium">💡 If you want to know more about a field, hover over the help icons (?).</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assumptions Box */}
            <Card className="border-0 bg-gray-50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-gray-700 text-sm">
                  📌 Assumptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs text-gray-600">
                  <p>• The IRS sets annual contribution limits that go up with inflation.</p>
                  <p>• {formatPercentage(inputs.expectedReturn)} return on investment each year</p>
                  <p>• The current tax rate is {formatPercentage(inputs.currentTaxRate)}, and the tax rate for retirement is {formatPercentage(inputs.retirementTaxRate)}.</p>
                  <p>• No early withdrawals or penalties are allowed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-3">
            <div className="sticky top-6 space-y-4">
              {/* Investment Growth Summary */}
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-green-800 text-base">
                    📈 Investment Growth Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="text-xs text-blue-600 font-medium">Total Investment Value at Retirement</div>
                      <div className="text-lg font-bold text-blue-700">{formatCurrency(results.futureValue)}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-600 font-medium">Total Contributions</div>
                      <div className="text-lg font-bold text-gray-700">{formatCurrency(results.totalInvested)}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="text-xs text-green-600 font-medium">Investment Growth</div>
                      <div className="text-lg font-bold text-green-700">{formatCurrency(results.totalGrowth)}</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <div className="text-xs text-red-600 font-medium">Tax Due at Retirement</div>
                      <div className="text-lg font-bold text-red-700">{formatCurrency(results.taxesAtRetirement)}</div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-green-800">Net After-Tax Withdrawal</span>
                      <span className="text-xl font-bold text-green-700">{formatCurrency(results.netAfterTaxWithdrawal)}</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">After paying {formatPercentage(inputs.retirementTaxRate)} tax on withdrawals</p>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-800">Current Tax Savings</span>
                      <span className="text-lg font-bold text-blue-700">{formatCurrency(results.currentTaxSavings)}</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">Tax deduction from {formatPercentage(inputs.currentTaxRate)} current tax rate</p>
                  </div>
                </CardContent>
              </Card>

              {/* Investment Breakdown Chart */}
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-blue-800 text-base">
                    📊 Investment Breakdown
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
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span>Investment Growth</span>
                      </div>
                      <span className="font-medium">{formatCurrency(results.totalGrowth)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                        <span>Taxes at Retirement</span>
                      </div>
                      <span className="font-medium">{formatCurrency(results.taxesAtRetirement)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Tax Information */}
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-orange-800 text-base">
                    🔍 Important Tax Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>You can deduct your contributions from your taxes today, which lowers your taxable income for this year.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600">⚠</span>
                      <span>When you retire, withdrawals are taxed like regular income.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600">ℹ</span>
                      <span>If you make more money in the future, you'll have to pay more taxes.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">💡</span>
                      <span>It's best if your tax bracket is higher now than it will be when you retire.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Here are some tips for smart planning */}
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-purple-800 text-base">
                    🧠 Here are some tips for smart planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-medium min-w-[20px]">1.</span>
                      <span>Use a Traditional IRA if you need tax breaks right away.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-medium min-w-[20px]">2.</span>
                      <span>To make a hybrid tax strategy, use it with a Roth IRA or HSA.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-medium min-w-[20px]">3.</span>
                      <span>To stay in lower tax brackets, change how much you take out after you retire.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-medium min-w-[20px]">4.</span>
                      <span>If you don't make much money this year, you might want to do Roth conversions before you turn 70.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Educational Content Section */}
            <div className="w-full px-6 mt-8">
              <div className="space-y-8">
                
                {/* Overview Section */}
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Traditional IRA Tax-Deferred Retirement Planning</h2>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      You can deduct taxes right away with a traditional IRA, and your money can grow without you having to pay taxes on it until you take it out. This is why they are great for saving for retirement and lowering your taxes this year.
                    </p>
                    <p>
                      With our comprehensive calculator, you can find out how much your money will grow, what Required Minimum Distributions (RMDs) are, and how the taxes on this account compare to those on other retirement accounts.
                    </p>
                    <p>
                      You can now deduct contributions to a traditional IRA from your taxes, but when you take money out in retirement, it is taxed like regular income. This means that traditional IRAs are a good choice for people who pay a lot of taxes now but expect to pay less in retirement.
                    </p>
                  </div>
                </section>

                {/* Benefits Section */}
                <section className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Traditional IRA Benefits and Tax Advantages</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 space-y-4 md:space-y-0">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 text-base">Immediate Tax Deduction</h4>
                      <p className="text-gray-600 text-sm">
                        You can deduct contributions from your taxes in the year you make them. This lowers your taxable income for that year. In 2025, you can put in up to $7,000, or $8,000 if you are 50 or older.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 text-base">Tax-Deferred Growth</h4>
                      <p className="text-gray-600 text-sm">
                        You don't have to pay taxes on dividends, interest, or capital gains in a traditional IRA until you take the money out. This helps your investments grow over time.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 text-base">Required Minimum Distributions</h4>
                      <p className="text-gray-600 text-sm">
                        When you turn 73, you have to start taking Required Minimum Distributions (RMDs) based on IRS life expectancy tables. Make sure to include this required income in your retirement tax planning.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 text-base">Early Withdrawal Options</h4>
                      <p className="text-gray-600 text-sm">
                        Most of the time, people who take money out before they turn 59½ have to pay a 10% penalty. But there are exceptions for first-time home buyers (up to $10,000), qualified education costs, and medical bills.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Pros and Cons Section */}
                <section className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Traditional IRA vs Roth IRA: Pros and Cons</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Traditional IRA Pros */}
                    <section className="bg-green-50 p-6 rounded-lg">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                        <h4 className="text-lg font-semibold text-green-800">Traditional IRA Benefits</h4>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span className="text-sm text-gray-700"><strong>Immediate Tax Deduction:</strong> Reduce current year taxable income up to $7,000 ($8,000 if 50+).</span></li>
                        <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span className="text-sm text-gray-700"><strong>Tax-Deferred Growth:</strong> No taxes on gains, dividends, or interest until withdrawal.</span></li>
                        <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span className="text-sm text-gray-700"><strong>Lower Current Tax Bill:</strong> Ideal for high earners in peak earning years.</span></li>
                        <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span className="text-sm text-gray-700"><strong>Flexible Investment Options:</strong> Wide range of investment choices within the account.</span></li>
                      </ul>
                    </section>
                    
                    {/* Traditional IRA Cons */}
                    <section className="bg-red-50 p-6 rounded-lg">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">✗</span>
                        </div>
                        <h4 className="text-lg font-semibold text-red-800">Traditional IRA Drawbacks</h4>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span className="text-sm text-gray-700"><strong>Taxed at Withdrawal:</strong> All withdrawals are taxed as ordinary income in retirement.</span></li>
                        <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span className="text-sm text-gray-700"><strong>Required Minimum Distributions:</strong> Must start withdrawing at age 73, whether needed or not.</span></li>
                        <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span className="text-sm text-gray-700"><strong>Early Withdrawal Penalties:</strong> 10% penalty plus taxes if withdrawn before age 59.5.</span></li>
                        <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span className="text-sm text-gray-700"><strong>Income Limits Apply:</strong> Deduction phases out if you have employer retirement plan and higher income.</span></li>
                      </ul>
                    </section>
                  </div>
                </section>
                
                {/* Call to Action Section */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 text-center mt-12 rounded-lg">
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-4">Maximize Your Tax-Deferred Retirement Savings</h3>
                    <p className="text-blue-100 text-base mb-6 max-w-2xl mx-auto">
                      Use our comprehensive planning tool to see how much your Traditional IRA will help you and how to get the most out of your retirement tax strategy. Calculate your potential growth and tax benefits today.
                    </p>
                    <Button 
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                    >
                      Calculate Your Traditional IRA Growth
                    </Button>
                  </div>
                </section>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
    </>
  );
};

export default TraditionalIRACalculatorUSA;