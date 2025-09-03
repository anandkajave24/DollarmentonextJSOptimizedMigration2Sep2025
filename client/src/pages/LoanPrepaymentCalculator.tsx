import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { SEO } from "../components/SEO";
import { Helmet } from "react-helmet";

export default function LoanPrepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(250000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [prepaymentType, setPrepaymentType] = useState('monthly');
  const [prepaymentAmount, setPrepaymentAmount] = useState(200);
  const [prepaymentStart, setPrepaymentStart] = useState(1);

  // Original loan calculations
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  // Original loan totals
  const originalTotalPayments = monthlyPayment * numberOfPayments;
  const originalTotalInterest = originalTotalPayments - loanAmount;

  // Prepayment calculations
  const calculatePrepaymentScenario = () => {
    let balance = loanAmount;
    let month = 1;
    let totalPaid = 0;
    let totalInterest = 0;
    const payments = [];

    while (balance > 0.01 && month <= numberOfPayments * 2) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = Math.min(monthlyPayment - interestPayment, balance);
      
      let extraPayment = 0;
      if (month >= prepaymentStart) {
        if (prepaymentType === 'monthly') {
          extraPayment = Math.min(prepaymentAmount, balance - principalPayment);
        } else if (prepaymentType === 'yearly' && month % 12 === 0) {
          extraPayment = Math.min(prepaymentAmount, balance - principalPayment);
        } else if (prepaymentType === 'lump-sum' && month === prepaymentStart) {
          extraPayment = Math.min(prepaymentAmount, balance - principalPayment);
        }
      }

      const totalPrincipal = principalPayment + extraPayment;
      balance -= totalPrincipal;
      totalPaid += monthlyPayment + extraPayment;
      totalInterest += interestPayment;

      payments.push({
        month,
        balance: Math.max(0, balance),
        payment: monthlyPayment + extraPayment,
        interestPayment,
        principalPayment: totalPrincipal,
        extraPayment
      });

      month++;
    }

    return {
      totalPayments: totalPaid,
      totalInterest,
      monthsPaid: month - 1,
      yearsSaved: (numberOfPayments - (month - 1)) / 12,
      interestSaved: originalTotalInterest - totalInterest,
      payments
    };
  };

  const prepaymentScenario = calculatePrepaymentScenario();

  // Chart data
  const chartData = [];
  let originalBalance = loanAmount;
  const maxMonths = Math.max(numberOfPayments, prepaymentScenario.monthsPaid);
  
  for (let month = 0; month <= Math.min(maxMonths, 360); month += 12) {
    // Original loan balance
    if (month === 0) {
      originalBalance = loanAmount;
    } else if (month <= numberOfPayments) {
      const payments = month;
      originalBalance = loanAmount * ((Math.pow(1 + monthlyRate, numberOfPayments) - Math.pow(1 + monthlyRate, payments)) / 
                                     (Math.pow(1 + monthlyRate, numberOfPayments) - 1));
    } else {
      originalBalance = 0;
    }

    const prepaymentData = prepaymentScenario.payments[month] || { balance: 0 };
    
    chartData.push({
      year: month / 12,
      originalBalance: Math.max(0, originalBalance),
      prepaymentBalance: prepaymentData.balance || 0
    });
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number, decimals: number = 1) => {
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    });
  };

  return (
    <TooltipProvider>
      <Helmet>
        <title>Loan Prepayment Calculator - Calculate Interest Savings & Payoff Time | DollarMento</title>
        <meta name="description" content="Calculate loan prepayment benefits, interest savings, and time reduction. See how extra payments affect your mortgage or loan payoff schedule." />
        <meta name="keywords" content="loan prepayment calculator, extra payment calculator, mortgage prepayment, loan payoff calculator, interest savings" />
        <link rel="canonical" href="https://dollarmento.com/loan-prepayment-calculator" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
      <SEO 
        title="Loan Prepayment Calculator - Extra Payment Savings"
        description="Calculate savings from extra loan payments. See how prepayments reduce interest costs and shorten loan terms for mortgages and other loans."
        keywords="loan prepayment calculator, extra payment calculator, mortgage prepayment, loan payoff calculator, early payment savings"
        canonical="https://dollarmento.com/loan-prepayment-calculator"
      />
      
      <div className="w-full px-4">
        <div className="mb-8 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Loan Prepayment Calculator</h1>
          <p className="text-sm text-gray-600 max-w-3xl">
            Calculate how extra payments can save thousands in interest and years off your loan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Panel - 40% width */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-500 rounded"></span>
                  Loan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="loanAmount" className="flex items-center gap-1">
                      Loan Amount
                      <span className="text-blue-500 cursor-help" title="Original loan principal amount">ⓘ</span>
                    </Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="mt-1"
                      min="10000"
                      step="1000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="interestRate" className="flex items-center gap-1">
                      Interest Rate (%)
                      <span className="text-blue-500 cursor-help" title="Annual interest rate">ⓘ</span>
                    </Label>
                    <Input
                      id="interestRate"
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="mt-1"
                      min="0.1"
                      max="20"
                      step="0.1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="loanTerm" className="flex items-center gap-1">
                    Loan Term (Years)
                    <span className="text-blue-500 cursor-help" title="Original loan term in years">ⓘ</span>
                  </Label>
                  <Input
                    id="loanTerm"
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="mt-1"
                    min="5"
                    max="50"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Prepayment Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="prepaymentType">Prepayment Type</Label>
                  <Select value={prepaymentType} onValueChange={setPrepaymentType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly Extra Payment</SelectItem>
                      <SelectItem value="yearly">Annual Extra Payment</SelectItem>
                      <SelectItem value="lump-sum">One-Time Lump Sum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="prepaymentAmount" className="flex items-center gap-1">
                      Extra Payment Amount
                      <span className="text-blue-500 cursor-help" title="Additional payment amount based on selected type">ⓘ</span>
                    </Label>
                    <Input
                      id="prepaymentAmount"
                      type="number"
                      value={prepaymentAmount}
                      onChange={(e) => setPrepaymentAmount(Number(e.target.value))}
                      className="mt-1"
                      min="0"
                      step="50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prepaymentStart" className="flex items-center gap-1">
                      Start Month
                      <span className="text-blue-500 cursor-help" title="Month to start prepayments (1 = first payment)">ⓘ</span>
                    </Label>
                    <Input
                      id="prepaymentStart"
                      type="number"
                      value={prepaymentStart}
                      onChange={(e) => setPrepaymentStart(Number(e.target.value))}
                      className="mt-1"
                      min="1"
                      max={numberOfPayments}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How to Use This Math Tool */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">How to Use This Math Tool</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">1.</span>
                    <span>Enter the amount, interest rate, and length of your loan.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Choose a way to pay off your loan early.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Decide how much extra you want to pay and when it will start.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Check your savings and how long it will take to pay them off.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel - 60% width */}
          <div className="lg:col-span-3 space-y-4">
            {/* Savings Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Prepayment Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(prepaymentScenario.interestSaved)}</div>
                    <div className="text-sm text-gray-600">Interest Saved</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatNumber(prepaymentScenario.yearsSaved, 1)}</div>
                    <div className="text-sm text-gray-600">Years Saved</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{Math.floor(prepaymentScenario.monthsPaid / 12)}y {prepaymentScenario.monthsPaid % 12}m</div>
                    <div className="text-sm text-gray-600">New Payoff Time</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{formatCurrency(prepaymentScenario.totalInterest)}</div>
                    <div className="text-sm text-gray-600">Total Interest Paid</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loan Balance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Loan Balance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line type="monotone" dataKey="originalBalance" stroke="#ef4444" strokeWidth={2} name="Original Loan" />
                      <Line type="monotone" dataKey="prepaymentBalance" stroke="#10b981" strokeWidth={2} name="With Prepayments" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-yellow-500 rounded"></span>
                  Loan Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm font-medium border-b pb-2">
                    <div>Metric</div>
                    <div>Original Loan</div>
                    <div>With Prepayments</div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-3 gap-4">
                      <div>Monthly Payment</div>
                      <div>{formatCurrency(monthlyPayment)}</div>
                      <div>{formatCurrency(monthlyPayment + (prepaymentType === 'monthly' ? prepaymentAmount : 0))}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>Total Payments</div>
                      <div>{formatCurrency(originalTotalPayments)}</div>
                      <div>{formatCurrency(prepaymentScenario.totalPayments)}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>Total Interest</div>
                      <div>{formatCurrency(originalTotalInterest)}</div>
                      <div>{formatCurrency(prepaymentScenario.totalInterest)}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>Payoff Time</div>
                      <div>{loanTerm} years</div>
                      <div>{Math.floor(prepaymentScenario.monthsPaid / 12)}y {prepaymentScenario.monthsPaid % 12}m</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ROI Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Return on Investment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-800 mb-2">
                      Effective Return Rate: {formatNumber((prepaymentScenario.interestSaved / 
                        (prepaymentAmount * (prepaymentType === 'monthly' ? prepaymentScenario.monthsPaid : 
                         prepaymentType === 'yearly' ? Math.floor(prepaymentScenario.monthsPaid / 12) : 1))) * 100, 1)}%
                    </div>
                    <div className="text-sm text-blue-600">
                      This is equivalent to earning {formatNumber(interestRate, 1)}% guaranteed return on your extra payments
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">Extra Payments Total:</div>
                      <div className="text-lg">
                        {formatCurrency(prepaymentAmount * (prepaymentType === 'monthly' ? prepaymentScenario.monthsPaid : 
                                       prepaymentType === 'yearly' ? Math.floor(prepaymentScenario.monthsPaid / 12) : 1))}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">Interest Savings:</div>
                      <div className="text-lg">{formatCurrency(prepaymentScenario.interestSaved)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        </div>
        
        {/* Educational Content Section */}
        <div className="w-full">
          <div className="px-6 py-8">
            <div className="space-y-6">
              
              {/* Tips for Early Payoff */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tips for Paying Off Early</h2>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• <strong>Monthly Extra:</strong> Save money over time</p>
                  <p>• <strong>Yearly Bonus:</strong> Use your tax refunds or bonuses</p>
                  <p>• <strong>Lump Sum:</strong> Money you get from an inheritance or a big win</p>
                  <p>• <strong>Payments every two weeks:</strong> 26 payments = 13 months</p>
                </div>
              </section>
              
              {/* When to Prepay */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">When to Prepay</h3>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• <strong>Rates of 6% or more are best.</strong></p>
                  <p>• <strong>Steady income:</strong> First, make sure you have an emergency fund.</p>
                  <p>• <strong>No Fees:</strong> Check the loan terms for fees</p>
                  <p>• <strong>Effects on Taxes:</strong> Consider the mortgage interest deduction</p>
                </div>
              </section>
              
              {/* Alternatives to Consider */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Alternatives to Consider</h3>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Put money into an IRA or 401(k) to save on taxes</p>
                  <p>• High-yield savings for a fund for emergencies</p>
                  <p>• Pay off debt with higher interest rates first</p>
                  <p>• Consider the cost of not investing your money</p>
                </div>
              </section>

              {/* Paying Off Early vs Investing */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Paying Off a Loan Early or Investing</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">When to Pay Off Loans Early</h4>
                    <p className="text-gray-600 text-sm">
                      If the interest rate on your loan is higher than what you expect to make from your investments, you want to save money, or you're getting close to retirement and want to lower your monthly payments, pay off your loan early.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">When to Put Money Into Something Else</h4>
                    <p className="text-gray-600 text-sm">
                      Put money into something else when you expect to get more back than you pay in interest, when you have high-interest debt that needs to be paid off first, when you need money for emergencies, or when you can make tax-advantaged contributions to your retirement account.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">The Advantages of a Mixed Approach</h4>
                    <p className="text-gray-600 text-sm">
                      If you want to save money and have the chance to grow, split your extra payments between paying off loans early and investing. Use your emergency fund first, then take full advantage of your employer's 401k match, and finally split the rest of your money.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Things to Keep in Mind for Taxes</h4>
                    <p className="text-gray-600 text-sm">
                      Think about how the mortgage interest deduction affects state taxes, the different kinds of investment accounts, and how much they are worth. People who make a lot of money might be better off with tax-deferred investments than paying off their mortgage early.
                    </p>
                  </div>
                </div>
              </section>

              {/* Loan Prepayment Pros and Cons */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Loan Prepayment: Pros and Cons</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pros Section */}
                  <section className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        ✓
                      </div>
                      <h4 className="font-semibold text-green-700 text-base">Benefits of Loan Prepayment</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Interest Savings:</strong> Save thousands in total interest payments.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Faster Freedom:</strong> Pay off loans years ahead of schedule.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Guaranteed Return:</strong> Savings equal to your loan's interest rate.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Peace of Mind:</strong> Reduce monthly obligations and financial stress.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Equity Building:</strong> Build home equity faster with mortgage prepayments.</span></li>
                    </ul>
                  </section>

                  {/* Cons Section */}
                  <section className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        ✗
                      </div>
                      <h4 className="font-semibold text-red-700 text-base">Drawbacks of Loan Prepayment</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Opportunity Cost:</strong> May miss higher investment returns.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Liquidity Loss:</strong> Money tied up in illiquid home equity.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Tax Benefits:</strong> Lose mortgage interest deduction for taxes.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Emergency Funds:</strong> May reduce available cash for emergencies.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Prepayment Penalties:</strong> Some loans charge fees for early payoff.</span></li>
                    </ul>
                  </section>
                </div>
              </section>
            </div>
          </div>
        
        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 text-center mt-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Calculate Your Loan Prepayment Strategy Today</h3>
            <p className="text-blue-100 text-base mb-6 max-w-2xl mx-auto">
              Our comprehensive loan prepayment calculator helps you analyze interest savings, payoff timelines, and return on investment for extra payments. Make smart financial decisions with accurate calculations.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Your Prepayment Analysis
            </Button>
          </div>
        </section>
        </div>
      </div>
    </TooltipProvider>
  );
}