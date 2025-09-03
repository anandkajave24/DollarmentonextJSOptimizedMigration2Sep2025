import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Calculator, DollarSign, TrendingUp, Calendar, CreditCard, HelpCircle } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Helmet } from 'react-helmet';

export default function PersonalLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(15000);
  const [interestRate, setInterestRate] = useState(12.5);
  const [loanTerm, setLoanTerm] = useState(36);
  const [processingFee, setProcessingFee] = useState(2);
  const [prepaymentAmount, setPrepaymentAmount] = useState(0);

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [effectiveRate, setEffectiveRate] = useState(0);

  useEffect(() => {
    calculatePersonalLoan();
  }, [loanAmount, interestRate, loanTerm, processingFee, prepaymentAmount]);

  const calculatePersonalLoan = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm;
    
    // Calculate processing fee
    const processingFeeAmount = (principal * processingFee) / 100;
    const netLoanAmount = principal - processingFeeAmount;
    
    let payment = 0;
    if (monthlyRate > 0) {
      payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      payment = principal / numPayments;
    }

    const totalPayments = payment * numPayments;
    const interest = totalPayments - principal;
    const total = totalPayments + processingFeeAmount;
    
    // Calculate effective rate including processing fee
    const effectiveInterestRate = ((total - netLoanAmount) / netLoanAmount) * (12 / loanTerm) * 100;

    setMonthlyPayment(payment);
    setTotalInterest(interest);
    setTotalAmount(total);
    setEffectiveRate(effectiveInterestRate);
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
      value: loanAmount,
      color: '#3b82f6'
    },
    {
      name: 'Interest',
      value: totalInterest,
      color: '#f59e0b'
    },
    {
      name: 'Processing Fee',
      value: (loanAmount * processingFee) / 100,
      color: '#ef4444'
    }
  ];

  // Amortization sample for first 6 months
  const generateAmortization = () => {
    const monthlyRate = interestRate / 100 / 12;
    let balance = loanAmount;
    const amortization = [];

    for (let month = 1; month <= Math.min(6, loanTerm); month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      amortization.push({
        month: `Month ${month}`,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }
    return amortization;
  };

  const amortizationData = generateAmortization();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">
            {formatCurrency(data.value)} ({((data.value / (loanAmount + totalInterest + (loanAmount * processingFee) / 100)) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Helmet>
        <title>Personal Loan Calculator - Calculate Payments, Interest & EMI | DollarMento</title>
        <meta name="description" content="Calculate personal loan EMI, monthly payments, total interest, and processing fees. Compare loan terms and interest rates for personal finance planning." />
        <meta name="keywords" content="personal loan calculator, personal loan EMI, loan payments, interest calculator, processing fee calculator, personal finance" />
        <link rel="canonical" href="https://dollarmento.com/personal-loan-calculator" />
      </Helmet>
      <TooltipProvider>
      <div className="w-full px-4">
        <div className="mb-8 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Personal Loan Calculator</h1>
          <p className="text-sm text-gray-600 max-w-3xl">Calculate monthly payments for unsecured personal loans with fees and effective rates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Loan Information */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Loan Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="loanAmount">Loan Amount</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total amount you want to borrow</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    placeholder="$15,000"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label>Interest Rate (% per annum)</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Annual interest rate charged by the lender</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <div className="space-y-3">
                    <Slider
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      max={30}
                      min={5}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>5%</span>
                      <span className="font-medium">{interestRate}%</span>
                      <span>30%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label>Loan Term</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Duration of the loan in months</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 months (1 year)</SelectItem>
                      <SelectItem value="24">24 months (2 years)</SelectItem>
                      <SelectItem value="36">36 months (3 years)</SelectItem>
                      <SelectItem value="48">48 months (4 years)</SelectItem>
                      <SelectItem value="60">60 months (5 years)</SelectItem>
                      <SelectItem value="72">72 months (6 years)</SelectItem>
                      <SelectItem value="84">84 months (7 years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label>Processing Fee (%)</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>One-time fee charged by lender as percentage of loan amount</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <div className="space-y-3">
                    <Slider
                      value={[processingFee]}
                      onValueChange={(value) => setProcessingFee(value[0])}
                      max={5}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>0%</span>
                      <span className="font-medium">{processingFee}%</span>
                      <span>5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loan Comparison */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Loan Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stated Interest Rate:</span>
                    <span className="font-medium">{interestRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Effective Interest Rate:</span>
                    <span className="font-medium text-orange-600">{effectiveRate.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee Amount:</span>
                    <span className="font-medium">{formatCurrency((loanAmount * processingFee) / 100)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Amount Received:</span>
                    <span className="font-medium text-green-600">{formatCurrency(loanAmount - (loanAmount * processingFee) / 100)}</span>
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
                    <span>Enter the loan amount and the interest rate you want.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Choose a loan term that fits your budget.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>To get the right price, add a processing fee.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Check the difference between the stated and the actual interest rates.</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Important Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• These calculations are only rough estimates for educational purposes</p>
                  <p>• Your credit score and income will determine the actual rates.</p>
                  <p>• Fees for things like paying late are not included.</p>
                  <p>• Before making a choice, look at offers from a number of lenders.</p>
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
                      <p className="text-sm text-gray-600">Monthly Payment</p>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(monthlyPayment)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Interest</p>
                      <p className="text-2xl font-bold text-orange-600">{formatCurrency(totalInterest)}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalAmount)}</p>
                    </div>
                    <Calculator className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Effective Rate</p>
                      <p className="text-2xl font-bold text-red-600">{effectiveRate.toFixed(1)}%</p>
                    </div>
                    <CreditCard className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cost Breakdown Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cost Breakdown</CardTitle>
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
                <div className="flex justify-center gap-4 mt-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Principal ({formatCurrency(loanAmount)})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Interest ({formatCurrency(totalInterest)})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Fees ({formatCurrency((loanAmount * processingFee) / 100)})</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Schedule Sample */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Payment Schedule (First 6 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={amortizationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => [formatCurrency(value), '']}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Bar dataKey="principal" stackId="a" fill="#3b82f6" name="Principal" />
                      <Bar dataKey="interest" stackId="a" fill="#f59e0b" name="Interest" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Loan Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Personal Loan Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">No collateral is needed</h4>
                      <p className="text-sm text-gray-600">A loan that doesn't require collateral and is based on your credit score</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Quick Processing</h4>
                      <p className="text-sm text-gray-600">Getting approved is faster than for secured loans.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Use as needed</h4>
                      <p className="text-sm text-gray-600">Use for any personal money needs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Payments that stay the same</h4>
                      <p className="text-sm text-gray-600">Payments every month that are easy to plan for</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        {/* Educational Content Section */}
        <div className="w-full">
          <div className="px-6 py-8">
            <div className="space-y-6">
              
              {/* The Best Personal Loan Calculator */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">The Best Debt Financing Planner and Personal Loan Calculator in the US</h2>
                
                <p className="text-gray-600 text-sm mb-3">
                  You can use personal loans to get money for a lot of different things, like paying off debt, fixing up your home, paying for medical bills, or buying big things. Our personal loan calculator shows you the real cost of borrowing so you can compare offers and make smart money decisions.
                </p>
                <p className="text-gray-600 text-sm">
                  You can find the best monthly payment and total cost by comparing different loan amounts, interest rates, and repayment terms. You can see the whole picture of how much your personal loan will cost by using our calculator to figure out the processing fees and the effective interest rate.
                </p>
              </section>

              {/* How to Use This Personal Loan Calculator */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Use This Personal Loan Calculator</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Making a Plan for the Loan Amount</h4>
                    <p className="text-gray-600 text-sm">
                      Based on what you want to do with the money, figure out how much you need to borrow. Don't take out more money than you need. This will make your monthly payment go up and the total amount of interest you pay. Most personal loans are between $2,000 and $100,000, but this depends on your income and credit score.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Study of Interest Rates</h4>
                    <p className="text-gray-600 text-sm">
                      Personal loan rates usually range from 6% to 36% APR, but they can be higher or lower depending on your credit score, income, and the lender. Look at rates from banks, credit unions, and websites to see which ones are the best. You can use pre-qualification tools to check rates without hurting your credit score.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Picking a Term Strategy</h4>
                    <p className="text-gray-600 text-sm">
                      Loans with shorter terms (2–3 years) have higher monthly payments but less total interest. Longer terms (5–7 years) lower monthly payments but raise the total cost. Choose a term that fits your budget and financial goals, and that is both affordable and has a low total cost.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Looking at the Fees</h4>
                    <p className="text-gray-600 text-sm">
                      Think about the costs of processing, starting the loan, and paying it off early. Some lenders charge an origination fee of 1% to 8% of the loan amount. When you compare loan offers from different lenders, make sure to add these costs to the total cost of borrowing.
                    </p>
                  </div>
                </div>
              </section>

              {/* Understanding Your Personal Loan Results */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Understanding Your Personal Loan Results and Monthly Payments</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Effect on Your Monthly Payments</h4>
                    <p className="text-gray-600 text-sm">
                      Your monthly payment should fit into your budget without making it hard to pay for other things. If you get this new personal loan, your total monthly debt payments shouldn't be more than 36–40% of your gross monthly income.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Total Cost of Interest</h4>
                    <p className="text-gray-600 text-sm">
                      This is how much it will cost you to borrow money for the whole time your loan is open. If you took out a $15,000 loan with a 12% interest rate over 5 years, you would pay about $4,000 in interest. To find the best deal, look at the total costs of different rates and terms.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">The Interest Rate That Works</h4>
                    <p className="text-gray-600 text-sm">
                      If you include fees, your effective rate may be higher than the APR. Our calculator helps you compare loans with different fee structures by showing you how much this loan really costs. If you can, it might be better to get a loan with no fees but a higher rate than one with fees and a lower stated rate.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Benefits of Paying Early</h4>
                    <p className="text-gray-600 text-sm">
                      If you make extra payments on the principal, you can pay less interest and have a shorter loan. But first, check with your lender to see if they charge fees for paying off your loan early. Some lenders will let you pay off your loan early without charging you a fee, so it's a good idea to make extra payments.
                    </p>
                  </div>
                </div>
              </section>

              {/* How to Get a Personal Loan the Smart Way */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Get a Personal Loan the Smart Way</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">How to Raise Your Credit Score</h4>
                    <p className="text-gray-600 text-sm">
                      You could save thousands of dollars in interest if your credit score is higher. You might want to wait to apply until you've paid off your debts and made all of your payments on time if your score needs to go up. A 50-point rise in your credit score can lower your rate by a lot.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">The Benefits of Debt Consolidation</h4>
                    <p className="text-gray-600 text-sm">
                      A personal loan can help you pay off multiple high-interest credit cards with one lower-interest payment. This makes your money easier to manage and could save you money if the interest rate on your personal loan is lower than the interest rates on your credit cards, which are usually between 18% and 29% APR.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Check Out All the Options</h4>
                    <p className="text-gray-600 text-sm">
                      Before getting a personal loan, think about other options, such as home equity loans, 401(k) loans, or borrowing money from family. You can get unsecured personal loans easily, but they usually cost more than secured loans.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">When to Apply</h4>
                    <p className="text-gray-600 text-sm">
                      If you want to keep your credit score from going down too much, apply for loans within 14 to 45 days. First, use tools for pre-qualification to look at different rates. Then, in this short amount of time, formally apply to your top choices.
                    </p>
                  </div>
                </div>
              </section>

              {/* Types of Personal Loans and How to Use Them */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Types of Personal Loans and How to Use Them</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Loans to Pay Off Debt</h4>
                    <p className="text-gray-600 text-sm">
                      You can combine a number of debts with high interest rates into one payment, which may have a lower interest rate. Works best when the interest rate on your personal loan is much lower than the interest rates on your other debts, like credit cards or store financing.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Loans to Make Your Home Better</h4>
                    <p className="text-gray-600 text-sm">
                      Pay for repairs, upgrades, or renovations that will raise the value of your home. Personal loans have higher interest rates than home equity loans, but you don't have to put your home up as collateral, and they usually get approved faster.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Loans to Pay for Medical Bills</h4>
                    <p className="text-gray-600 text-sm">
                      Pay for medical bills that come up out of the blue or for procedures that insurance won't cover. Check out the interest rates on personal loans, medical payment plans, or medical credit cards. Some of these might have special rates for certain types of work.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Getting Money for Big Purchases</h4>
                    <p className="text-gray-600 text-sm">
                      Pay for big things like vacations, electronics, or appliances. Before you buy something, ask yourself if you really need it and if you could save up instead of borrowing money. You should only use personal loans for important financial needs, not wants.
                    </p>
                  </div>
                </div>
              </section>

              {/* Personal Loans Pros and Cons */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Loans: Pros and Cons</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pros Section */}
                  <section className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        ✓
                      </div>
                      <h4 className="font-semibold text-green-700 text-base">Benefits of Personal Loans</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>No Collateral Needed:</strong> Your home or other assets won't be at risk with an unsecured loan.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Fixed Payments:</strong> Monthly payments that are easy to plan for make it easier to stick to a budget.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Quick Funding:</strong> You get approved and get the money faster than with secured loans.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Flexible Use:</strong> You can use it for almost any personal financial need.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Debt Consolidation:</strong> Combine many debts into one payment.</span></li>
                    </ul>
                  </section>

                  {/* Cons Section */}
                  <section className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        ✗
                      </div>
                      <h4 className="font-semibold text-red-700 text-base">Drawbacks of Personal Loans</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Higher Interest Rates:</strong> Usually higher than secured debt, like mortgages or auto loans.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Origination Fees:</strong> Many lenders charge fees up front that make the total cost higher.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Credit Requirements:</strong> You need to have good credit to get the best rates.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Fixed Terms:</strong> Not as flexible as credit lines for ongoing financial needs.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Debt Risk:</strong> If you get into debt and don't change spending habits, finances could worsen.</span></li>
                    </ul>
                  </section>
                </div>
              </section>

            </div>
          </div>
        
        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 text-center mt-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Calculate Your Personal Loan Today</h3>
            <p className="text-blue-100 text-base mb-6 max-w-2xl mx-auto">
              Our comprehensive personal loan calculator helps you compare rates, terms, and total costs. Make informed borrowing decisions with accurate calculations including processing fees and effective rates.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Your Personal Loan Calculation
            </Button>
          </div>
        </section>
        </div>
        </div>
      </div>
    </TooltipProvider>
    </>
  );
}