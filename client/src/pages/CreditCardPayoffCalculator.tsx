import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { CreditCard, DollarSign, Clock, TrendingDown, Zap, HelpCircle } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { SEO } from '../components/SEO';
import { Helmet } from 'react-helmet';

interface CreditCardDebt {
  id: number;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

export default function CreditCardPayoffCalculator() {
  const [cards, setCards] = useState<CreditCardDebt[]>([
    {
      id: 1,
      name: "Credit Card 1",
      balance: 5000,
      interestRate: 18.9,
      minimumPayment: 125
    }
  ]);
  
  const [totalExtraPayment, setTotalExtraPayment] = useState(200);
  const [payoffStrategy, setPayoffStrategy] = useState('avalanche');
  
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalMinimum, setTotalMinimum] = useState(0);
  const [payoffTime, setPayoffTime] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalInterestSaved, setTotalInterestSaved] = useState(0);

  useEffect(() => {
    calculatePayoff();
  }, [cards, totalExtraPayment, payoffStrategy]);

  const calculatePayoff = () => {
    const totalBal = cards.reduce((sum, card) => sum + card.balance, 0);
    const totalMin = cards.reduce((sum, card) => sum + card.minimumPayment, 0);
    
    setTotalBalance(totalBal);
    setTotalMinimum(totalMin);
    
    // Calculate payoff with strategy
    const result = calculateDebtPayoff(cards, totalExtraPayment, payoffStrategy);
    setPayoffTime(result.months);
    setTotalInterest(result.totalInterest);
    
    // Calculate minimum payment scenario for comparison
    const minimumResult = calculateDebtPayoff(cards, 0, payoffStrategy);
    setTotalInterestSaved(minimumResult.totalInterest - result.totalInterest);
  };

  const calculateDebtPayoff = (debts: CreditCardDebt[], extraPayment: number, strategy: string) => {
    let workingDebts = debts.map(debt => ({ ...debt }));
    let totalInterest = 0;
    let months = 0;
    
    // Sort debts based on strategy
    if (strategy === 'avalanche') {
      workingDebts.sort((a, b) => b.interestRate - a.interestRate);
    } else if (strategy === 'snowball') {
      workingDebts.sort((a, b) => a.balance - b.balance);
    }
    
    while (workingDebts.some(debt => debt.balance > 0) && months < 600) {
      let remainingExtra = extraPayment;
      
      // Apply minimum payments and interest
      workingDebts.forEach(debt => {
        if (debt.balance > 0) {
          const monthlyInterest = (debt.balance * debt.interestRate / 100) / 12;
          totalInterest += monthlyInterest;
          debt.balance += monthlyInterest;
          
          const payment = Math.min(debt.minimumPayment, debt.balance);
          debt.balance -= payment;
        }
      });
      
      // Apply extra payment to strategy debt
      if (strategy === 'avalanche' || strategy === 'snowball') {
        const targetDebt = workingDebts.find(debt => debt.balance > 0);
        if (targetDebt && remainingExtra > 0) {
          const extraPaymentToApply = Math.min(remainingExtra, targetDebt.balance);
          targetDebt.balance -= extraPaymentToApply;
          remainingExtra -= extraPaymentToApply;
        }
      } else if (strategy === 'balanced') {
        // Distribute extra payment proportionally
        const totalBalance = workingDebts.reduce((sum, debt) => sum + debt.balance, 0);
        workingDebts.forEach(debt => {
          if (debt.balance > 0 && totalBalance > 0) {
            const proportion = debt.balance / totalBalance;
            const extraPaymentToApply = Math.min(remainingExtra * proportion, debt.balance);
            debt.balance -= extraPaymentToApply;
          }
        });
      }
      
      months++;
    }
    
    return { months, totalInterest };
  };

  const addCard = () => {
    const newCard: CreditCardDebt = {
      id: cards.length + 1,
      name: `Credit Card ${cards.length + 1}`,
      balance: 2000,
      interestRate: 19.9,
      minimumPayment: 50
    };
    setCards([...cards, newCard]);
  };

  const updateCard = (id: number, field: keyof CreditCardDebt, value: string | number) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  const removeCard = (id: number) => {
    if (cards.length > 1) {
      setCards(cards.filter(card => card.id !== id));
    }
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
    const remainingMonths = months % 12;
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
    return `${months} month${months !== 1 ? 's' : ''}`;
  };

  const chartData = [
    {
      name: 'Principal',
      value: totalBalance,
      color: '#3b82f6'
    },
    {
      name: 'Interest',
      value: totalInterest,
      color: '#ef4444'
    }
  ];

  const strategyData = [
    { strategy: 'Minimum Only', months: calculateDebtPayoff(cards, 0, 'avalanche').months, interest: calculateDebtPayoff(cards, 0, 'avalanche').totalInterest },
    { strategy: 'Current Plan', months: payoffTime, interest: totalInterest }
  ];

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
        <title>Credit Card Payoff Calculator - Calculate Credit Card Debt Payoff | DollarMento</title>
        <meta name="description" content="Calculate credit card debt payoff with different payment strategies. Compare minimum payments vs. extra payments and debt avalanche methods." />
        <meta name="keywords" content="credit card payoff calculator, credit card debt calculator, debt payoff calculator, credit card payment calculator, debt avalanche calculator" />
        <link rel="canonical" href="https://dollarmento.com/credit-card-payoff-calculator" />
      </Helmet>
      <TooltipProvider>
      <SEO 
        title="Credit Card Payoff Calculator - Debt Avalanche vs Snowball Method"
        description="Calculate credit card payoff strategies using avalanche and snowball methods. Find the fastest way to eliminate debt and save on interest payments."
        keywords="credit card payoff calculator, debt avalanche calculator, debt snowball calculator, credit card debt calculator, payoff strategy calculator, debt elimination calculator, credit card interest calculator"
        canonical="https://dollarmento.com/credit-card-payoff-calculator"
      />
      <div className="w-full px-4">
        <div className="mb-8 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Credit Card Payoff Calculator</h1>
          <p className="text-sm text-gray-600 max-w-3xl">Develop a strategy to pay off credit card debt faster and save on interest</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Panel - 40% width */}
          <div className="lg:col-span-2 space-y-4">
            {/* Credit Card Debts */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Credit Card Debts
                  </CardTitle>
                  <Button onClick={addCard} size="sm" variant="outline">
                    Add Card
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {cards.map((card, index) => (
                  <div key={card.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <Input
                        value={card.name}
                        onChange={(e) => updateCard(card.id, 'name', e.target.value)}
                        className="font-medium max-w-40"
                      />
                      {cards.length > 1 && (
                        <Button 
                          onClick={() => removeCard(card.id)} 
                          size="sm" 
                          variant="ghost"
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs">Balance</Label>
                        <Input
                          type="number"
                          value={card.balance}
                          onChange={(e) => updateCard(card.id, 'balance', Number(e.target.value))}
                          placeholder="$5,000"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">APR (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={card.interestRate}
                          onChange={(e) => updateCard(card.id, 'interestRate', Number(e.target.value))}
                          placeholder="18.9"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Min Payment</Label>
                        <Input
                          type="number"
                          value={card.minimumPayment}
                          onChange={(e) => updateCard(card.id, 'minimumPayment', Number(e.target.value))}
                          placeholder="$125"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payoff Strategy */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Payoff Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="totalExtraPayment">Extra Payment per Month</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Additional amount beyond minimum payments</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Input
                    id="totalExtraPayment"
                    type="number"
                    value={totalExtraPayment}
                    onChange={(e) => setTotalExtraPayment(Number(e.target.value))}
                    placeholder="$200"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label>Debt Repayment Method</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Strategy for applying extra payments</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Select value={payoffStrategy} onValueChange={setPayoffStrategy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avalanche">Debt Avalanche (Highest Interest First)</SelectItem>
                      <SelectItem value="snowball">Debt Snowball (Smallest Balance First)</SelectItem>
                      <SelectItem value="balanced">Balanced Approach</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium mb-1">Current Strategy:</div>
                  <div className="text-sm text-gray-600">
                    {payoffStrategy === 'avalanche' && "Focus extra payments on highest interest rate debt first"}
                    {payoffStrategy === 'snowball' && "Focus extra payments on smallest balance debt first"}
                    {payoffStrategy === 'balanced' && "Distribute extra payments proportionally across all debts"}
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
                    <span>Fill out the information for each credit card debt</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Add the extra payment amount you can afford.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Pick the way you want to pay off your debt</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Look over the payoff schedule and interest savings.</span>
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
                  <p>• The calculations assume that no new charges will be made to the cards.</p>
                  <p>• The minimum payments and interest rates may go up or down.</p>
                  <p>• The results are only estimates for planning.</p>
                  <p>• Think about getting help with your credit if you have a lot of debt.</p>
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
                      <p className="text-sm text-gray-600">Total Debt</p>
                      <p className="text-2xl font-bold text-red-600">{formatCurrency(totalBalance)}</p>
                    </div>
                    <CreditCard className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Payoff Time</p>
                      <p className="text-xl font-bold text-blue-600">{formatMonths(payoffTime)}</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-600" />
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
                    <DollarSign className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Interest Saved</p>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(totalInterestSaved)}</p>
                    </div>
                    <TrendingDown className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Debt Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Debt Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Credit Card Debt:</span>
                    <span className="font-medium text-red-600">{formatCurrency(totalBalance)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Minimum Payments:</span>
                    <span className="font-medium">{formatCurrency(totalMinimum)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Extra Payment:</span>
                    <span className="font-medium text-green-600">+{formatCurrency(totalExtraPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Monthly Payment:</span>
                    <span className="font-medium text-blue-600">{formatCurrency(totalMinimum + totalExtraPayment)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Time Saved vs Minimum:</span>
                    <span className="text-green-600">{formatMonths(calculateDebtPayoff(cards, 0, 'avalanche').months - payoffTime)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payoff Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Payoff Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={strategyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="strategy" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number, name: string) => [
                          name === 'months' ? formatMonths(value) : formatCurrency(value), 
                          name === 'months' ? 'Time' : 'Interest'
                        ]}
                      />
                      <Bar dataKey="months" fill="#3b82f6" name="months" />
                      <Bar dataKey="interest" fill="#ef4444" name="interest" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Tips for Paying Off Debt */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tips for Paying Off Debt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Don't Use Credit Cards Anymore</h4>
                      <p className="text-sm text-gray-600">Don't take on more debt while you're paying off what you already owe.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Pay More Than the Minimum</h4>
                      <p className="text-sm text-gray-600">Even small extra payments can save a lot of interest.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Think about balance transfers</h4>
                      <p className="text-sm text-gray-600">0% APR deals can help for a short time.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Make an emergency fund</h4>
                      <p className="text-sm text-gray-600">Have money set aside for emergencies so you don't get into debt again.</p>
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
              
              {/* Main Educational Section */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">The Best USA Credit Card Payoff Calculator and Plan for Getting Out of Debt</h2>
                
                <p className="text-gray-600 text-sm mb-3">
                  To get rid of credit card debt, you need to make a plan that cuts down on interest costs and speeds up the time it takes to pay off the debt. Our full calculator compares the avalanche and snowball methods, figures out how much interest you can save, and finds the best way to spread your payments across several cards.
                </p>
                <p className="text-gray-600 text-sm">
                  You could be stuck in minimum payment cycles for decades if you have a lot of high-interest credit card debt. You can get out of debt faster and save thousands of dollars in interest charges by learning about payment plans, balance transfer options, and budgeting methods.
                </p>
              </section>

              {/* Credit Card Payoff Strategies */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ways to Pay Off Your Credit Card and Make the Most of It</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Avalanche Method (Math)</h4>
                    <p className="text-gray-600 text-sm">
                      Pay the minimum on all of your cards, then put any extra money toward the card with the highest interest rate first. This way of doing things saves the most money on interest and pays off debt the fastest.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">The Snowball Method (Psychological)</h4>
                    <p className="text-gray-600 text-sm">
                      Pay the minimum amount on all your cards first, then pay off the one with the lowest balance. This gives you quick wins and keeps you going, but it might cost you a little more in total interest over time.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Plan for a Balance Transfer</h4>
                    <p className="text-gray-600 text-sm">
                      Put high-interest balances on promotional cards with 0% APR. Be aware of transfer fees, which are usually between 3% and 5%, and make sure you can pay off your balances before the promotional rates end.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Minimum Payment Trap</h4>
                    <p className="text-gray-600 text-sm">
                      If you only pay the minimum, it could take 20 years or more to pay off the loan and cost thousands in interest. Even an extra $50 to $100 a month can cut years off the time it takes to pay off a loan and save a lot of interest.
                    </p>
                  </div>
                </div>
              </section>

              {/* Credit Card Debt Payoff Pros and Cons */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Credit Card Debt Payoff: Pros and Cons</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pros Section */}
                  <section className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        ✓
                      </div>
                      <h4 className="font-semibold text-green-700 text-base">Benefits of Strategic Payoff</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Interest Savings:</strong> Save thousands by paying more than minimums.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Faster Freedom:</strong> Get out of debt years sooner with extra payments.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Credit Score Boost:</strong> Lower utilization improves credit rating.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Financial Peace:</strong> Reduce stress and improve financial stability.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Clear Strategy:</strong> Avalanche and snowball methods provide focused approach.</span></li>
                    </ul>
                  </section>

                  {/* Cons Section */}
                  <section className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        ✗
                      </div>
                      <h4 className="font-semibold text-red-700 text-base">Challenges of Debt Payoff</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Requires Discipline:</strong> Need consistent extra payments and budget control.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Tight Budget:</strong> Less money available for other financial goals temporarily.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Temptation Risk:</strong> May want to use cleared credit cards again.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Emergency Vulnerability:</strong> Less cash reserves during aggressive payoff.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Time Investment:</strong> Requires ongoing tracking and commitment.</span></li>
                    </ul>
                  </section>
                </div>
              </section>
            </div>
          </div>
        
        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 text-center mt-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Calculate Your Credit Card Payoff Strategy Today</h3>
            <p className="text-blue-100 text-base mb-6 max-w-2xl mx-auto">
              Our comprehensive credit card payoff calculator compares avalanche and snowball methods, calculates interest savings, and shows you the fastest path to debt freedom.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Your Debt Payoff Plan
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