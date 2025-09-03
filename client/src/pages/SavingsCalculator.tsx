import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Helmet } from 'react-helmet';
import { Target, TrendingUp, DollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export default function SavingsCalculator() {
  const [initialAmount, setInitialAmount] = useState(1000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(200);
  const [interestRate, setInterestRate] = useState(2.5);
  const [compoundFrequency, setCompoundFrequency] = useState('monthly');
  const [timePeriod, setTimePeriod] = useState(5);
  const [savingsGoal, setSavingsGoal] = useState(15000);

  const compoundingPeriods = {
    'annually': 1,
    'quarterly': 4,
    'monthly': 12,
    'daily': 365
  };

  // Calculations
  const periodsPerYear = compoundingPeriods[compoundFrequency as keyof typeof compoundingPeriods];
  const totalPeriods = timePeriod * periodsPerYear;
  const periodRate = interestRate / 100 / periodsPerYear;
  const monthlyPeriodRate = interestRate / 100 / 12;
  
  // Future value with compound interest and regular deposits
  const futureValuePrincipal = initialAmount * Math.pow(1 + periodRate, totalPeriods);
  const futureValueAnnuity = monthlyDeposit * ((Math.pow(1 + monthlyPeriodRate, timePeriod * 12) - 1) / monthlyPeriodRate);
  const totalFutureValue = futureValuePrincipal + futureValueAnnuity;
  
  const totalDeposits = initialAmount + (monthlyDeposit * timePeriod * 12);
  const totalInterestEarned = totalFutureValue - totalDeposits;
  
  // Goal analysis
  const monthsToGoal = savingsGoal > initialAmount ? 
    Math.log(1 + (savingsGoal - initialAmount) * monthlyPeriodRate / monthlyDeposit) / Math.log(1 + monthlyPeriodRate) : 0;
  const yearsToGoal = monthsToGoal / 12;
  
  // Required monthly deposit to reach goal
  const requiredMonthlyDeposit = savingsGoal > initialAmount ?
    ((savingsGoal - initialAmount * Math.pow(1 + monthlyPeriodRate, timePeriod * 12)) * monthlyPeriodRate) / 
    (Math.pow(1 + monthlyPeriodRate, timePeriod * 12) - 1) : 0;

  // Chart data
  const chartData = [];
  for (let year = 0; year <= timePeriod; year++) {
    const months = year * 12;
    const principalValue = initialAmount * Math.pow(1 + monthlyPeriodRate, months);
    const depositValue = months === 0 ? 0 : monthlyDeposit * ((Math.pow(1 + monthlyPeriodRate, months) - 1) / monthlyPeriodRate);
    const totalValue = principalValue + depositValue;
    const totalDeposited = initialAmount + (monthlyDeposit * months);
    
    chartData.push({
      year,
      totalValue,
      totalDeposited,
      interestEarned: totalValue - totalDeposited
    });
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    });
  };

  return (
    <>
      <Helmet>
        <title>Savings Calculator - Calculate Savings Growth & Interest Earnings | DollarMento</title>
        <meta name="description" content="Calculate your savings growth with regular deposits and compound interest. Plan your financial goals with our comprehensive savings calculator." />
        <meta name="keywords" content="savings calculator, savings growth calculator, compound interest calculator, savings goal calculator, interest calculator, savings plan calculator" />
        <link rel="canonical" href="https://dollarmento.com/savings-calculator" />
      </Helmet>
      <div className="w-full p-6 space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Savings Account Calculator</h1>
          <p className="text-sm text-gray-600">
            Calculate savings account growth with compound interest and regular deposits
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Input Panel - 40% width */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-500 rounded"></span>
                  Savings Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="initialAmount" className="flex items-center gap-1">
                      Initial Deposit
                      <span className="text-blue-500 cursor-help" title="Starting amount in your savings account">ⓘ</span>
                    </Label>
                    <Input
                      id="initialAmount"
                      type="number"
                      value={initialAmount}
                      onChange={(e) => setInitialAmount(Number(e.target.value))}
                      className="mt-1"
                      min="0"
                      step="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="monthlyDeposit" className="flex items-center gap-1">
                      Monthly Deposit
                      <span className="text-blue-500 cursor-help" title="Amount you plan to save each month">ⓘ</span>
                    </Label>
                    <Input
                      id="monthlyDeposit"
                      type="number"
                      value={monthlyDeposit}
                      onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                      className="mt-1"
                      min="0"
                      step="50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="interestRate" className="flex items-center gap-1">
                      Annual Interest Rate (%)
                      <span className="text-blue-500 cursor-help" title="Annual percentage yield (APY) of your savings account">ⓘ</span>
                    </Label>
                    <Input
                      id="interestRate"
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="mt-1"
                      min="0"
                      max="10"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timePeriod" className="flex items-center gap-1">
                      Time Period (Years)
                      <span className="text-blue-500 cursor-help" title="How long you plan to save">ⓘ</span>
                    </Label>
                    <Input
                      id="timePeriod"
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="mt-1"
                      min="1"
                      max="50"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="compoundFrequency">Compounding Frequency</Label>
                  <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Savings Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="savingsGoal" className="flex items-center gap-1">
                    Target Amount
                    <span className="text-blue-500 cursor-help" title="Your savings goal target amount">ⓘ</span>
                  </Label>
                  <Input
                    id="savingsGoal"
                    type="number"
                    value={savingsGoal}
                    onChange={(e) => setSavingsGoal(Number(e.target.value))}
                    className="mt-1"
                    min="1000"
                    step="1000"
                  />
                </div>
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
                    <span>Enter your initial deposit and monthly savings</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Input your account's interest rate (APY)</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Set your savings timeline and goals</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Review growth projections and goal timeline</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel - 60% width */}
          <div className="lg:col-span-3 space-y-6">
            {/* Savings Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Savings Projection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(totalFutureValue)}</div>
                    <div className="text-sm text-gray-600">Total Savings</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalDeposits)}</div>
                    <div className="text-sm text-gray-600">Total Deposits</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(totalInterestEarned)}</div>
                    <div className="text-sm text-gray-600">Interest Earned</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{formatNumber((totalInterestEarned / totalDeposits) * 100, 1)}%</div>
                    <div className="text-sm text-gray-600">Return on Deposits</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Savings Growth Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line type="monotone" dataKey="totalDeposited" stroke="#6b7280" strokeWidth={2} name="Total Deposited" />
                      <Line type="monotone" dataKey="totalValue" stroke="#10b981" strokeWidth={2} name="Total Value" />
                      <Line type="monotone" dataKey="interestEarned" stroke="#3b82f6" strokeWidth={2} name="Interest Earned" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Goal Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-yellow-500 rounded"></span>
                  Goal Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="text-lg font-bold text-yellow-800 mb-2">
                      Goal: {formatCurrency(savingsGoal)}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Time to Goal:</span>
                        <div className="font-medium">
                          {yearsToGoal > 0 ? `${formatNumber(yearsToGoal, 1)} years` : 'Goal already met!'}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Progress at {timePeriod} years:</span>
                        <div className="font-medium">
                          {formatNumber((totalFutureValue / savingsGoal) * 100, 1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Required monthly deposit to reach goal in {timePeriod} years:</div>
                    <div className="text-lg font-bold text-blue-700">
                      {requiredMonthlyDeposit > 0 ? formatCurrency(requiredMonthlyDeposit) : 'Goal achievable with current plan!'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">High-Yield Savings Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Online Banks (Marcus, Ally):</span>
                    <span className="font-medium">4.0-5.0% APY</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Credit Union Accounts:</span>
                    <span className="font-medium">3.5-4.5% APY</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Money Market Accounts:</span>
                    <span className="font-medium">3.0-4.0% APY</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Traditional Big Banks:</span>
                    <span className="font-medium">0.01-0.50% APY</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="w-full mt-12 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                💡 Ways to Get the Most Out of Your Savings
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p><strong>Make Your Savings Automatic</strong></p>
              <p>Set up automatic transfers to your savings account on payday to make sure your money keeps growing.</p>
              
              <p><strong>Shop for Better Rates</strong></p>
              <p>Most of the time, online banks have better interest rates than regular banks.</p>
              
              <p><strong>Get Going Early</strong></p>
              <p>Time makes compound interest work even better. Begin saving as soon as you can.</p>
              
              <p><strong>Think about inflation</strong></p>
              <p>Make sure your interest rate is higher than inflation so you can keep buying things over time.</p>
            </CardContent>
          </Card>



          {/* Pros and Cons of High-Yield Savings */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold text-gray-800">Pros and Cons of High-Yield Savings Accounts</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Understanding the advantages and disadvantages of high-yield savings</p>
            </CardHeader>
            <CardContent>
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
                        <h4 className="font-semibold text-gray-800 text-sm">Higher Interest Rates</h4>
                        <p className="text-gray-600 text-sm">Earn significantly more interest than traditional savings accounts.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">FDIC Insured</h4>
                        <p className="text-gray-600 text-sm">Your deposits are protected up to $250,000 per account.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Liquidity</h4>
                        <p className="text-gray-600 text-sm">Easy access to your money when you need it for emergencies.</p>
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
                        <h4 className="font-semibold text-gray-800 text-sm">Lower Than Inflation</h4>
                        <p className="text-gray-600 text-sm">Interest rates often don't keep pace with inflation over time.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-600 mr-2 mt-1">✗</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Variable Rates</h4>
                        <p className="text-gray-600 text-sm">Interest rates can change based on market conditions and bank policies.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-600 mr-2 mt-1">✗</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Transaction Limits</h4>
                        <p className="text-gray-600 text-sm">Federal regulations may limit certain types of withdrawals and transfers.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why Use a Savings Calculator */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold text-gray-800">Why Use a Savings Calculator?</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Make informed decisions about your savings strategy and goals</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Goal Planning</h4>
                  <p className="text-sm text-gray-600">
                    Set realistic savings targets and see exactly how to reach your financial goals.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Growth Tracking</h4>
                  <p className="text-sm text-gray-600">
                    Visualize how compound interest helps your savings grow over time.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Smart Decisions</h4>
                  <p className="text-sm text-gray-600">
                    Compare different saving strategies and find the best approach for your situation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frequently Asked Questions */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold text-gray-800">Frequently Asked Questions</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Common questions about savings calculations and strategies</p>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    What's the best savings account interest rate I can get?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    High-yield savings accounts currently offer rates between 4.5% to 5.5% APY. Online banks typically offer the highest rates because they have lower overhead costs than traditional brick-and-mortar banks.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    How much should I save each month?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Financial experts recommend saving 20% of your after-tax income if possible. Start with whatever you can afford, even $25-50 per month, and gradually increase as your income grows or expenses decrease.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    Should I save for emergencies or other goals first?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Build an emergency fund of 3-6 months of expenses first. This provides financial security before focusing on other goals like vacation, home down payment, or retirement savings.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    How accurate are savings calculator projections?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Our calculator uses precise compound interest formulas and provides accurate projections based on your inputs. However, actual results may vary due to interest rate changes, fees, and changes in your contribution amounts.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Final Call to Action */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Calculate Your Savings Strategy Today</h3>
              <p className="text-gray-700 text-sm mb-4">
                Turn your financial goals into achievable plans with our comprehensive savings calculator. Start building wealth through the power of consistent saving and compound interest.
              </p>
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Plan Your Savings Strategy Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}