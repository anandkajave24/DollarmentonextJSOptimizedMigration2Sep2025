import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { SEO } from "../components/SEO";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

const SmartCreditCard = () => {
  // Interactive simulation state
  const [currentBalance, setCurrentBalance] = useState(50000);
  const [creditLimit, setCreditLimit] = useState(100000);
  const [monthlyPayment, setMonthlyPayment] = useState(2500);
  const [annualFee, setAnnualFee] = useState(500);
  const [interestRate, setInterestRate] = useState(18.0);
  const [monthlySpend, setMonthlySpend] = useState(25000);
  const [rewardsRate, setRewardsRate] = useState(1.5);
  
  // Spending categories with amounts
  const [spendingBreakdown, setSpendingBreakdown] = useState({
    groceries: 8000,
    travel: 6000,
    dining: 4000,
    shopping: 3000,
    entertainment: 2000,
    fuel: 2000
  });

  // Calculate real-time metrics
  const utilizationRate = Math.round((currentBalance / creditLimit) * 100);
  const availableCredit = creditLimit - currentBalance;
  
  // Credit score impact calculation
  const calculateCreditScore = () => {
    let baseScore = 750;
    
    // Utilization impact (35% of score)
    if (utilizationRate <= 10) baseScore += 50;
    else if (utilizationRate <= 30) baseScore += 20;
    else if (utilizationRate <= 50) baseScore -= 20;
    else if (utilizationRate <= 80) baseScore -= 60;
    else baseScore -= 100;
    
    // Payment history impact (simulated)
    baseScore += 28; // Assuming perfect payment history
    
    return Math.max(300, Math.min(850, baseScore));
  };

  const creditScore = calculateCreditScore();

  // Optimization score calculation
  const calculateOptimizationScore = () => {
    let score = 0;
    
    // Utilization optimization (40 points)
    if (utilizationRate <= 10) score += 40;
    else if (utilizationRate <= 30) score += 25;
    else if (utilizationRate <= 50) score += 10;
    
    // Payment optimization (30 points)
    const minPayment = currentBalance * 0.02;
    if (monthlyPayment >= currentBalance * 0.1) score += 30;
    else if (monthlyPayment >= minPayment * 3) score += 20;
    else if (monthlyPayment >= minPayment * 2) score += 10;
    
    // Rewards optimization (20 points)
    const monthlyRewards = monthlySpend * (rewardsRate / 100);
    if (monthlyRewards >= monthlySpend * 0.02) score += 20;
    else if (monthlyRewards >= monthlySpend * 0.015) score += 15;
    else if (monthlyRewards >= monthlySpend * 0.01) score += 10;
    
    // Fee optimization (10 points)
    const annualRewards = monthlyRewards * 12;
    if (annualRewards > annualFee * 2) score += 10;
    else if (annualRewards > annualFee) score += 5;
    
    return Math.round(score);
  };

  const optimizationScore = calculateOptimizationScore();

  // Monthly rewards calculation
  const monthlyRewards = Math.round(monthlySpend * (rewardsRate / 100));
  const annualRewards = monthlyRewards * 12;

  // Payoff timeline calculation
  const calculatePayoffTime = () => {
    if (monthlyPayment <= currentBalance * (interestRate / 100 / 12)) {
      return "Never (payment too low)";
    }
    
    const monthlyInterestRate = interestRate / 100 / 12;
    const months = Math.log(1 + (currentBalance * monthlyInterestRate) / monthlyPayment) / Math.log(1 + monthlyInterestRate);
    
    if (months <= 12) return `${Math.round(months)} months`;
    return `${Math.round(months / 12 * 10) / 10} years`;
  };

  // Interest cost calculation
  const calculateTotalInterest = () => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const months = Math.log(1 + (currentBalance * monthlyInterestRate) / monthlyPayment) / Math.log(1 + monthlyInterestRate);
    return Math.round((monthlyPayment * months) - currentBalance);
  };

  // Spending category data for charts
  const spendingData = Object.entries(spendingBreakdown).map(([category, amount]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    amount,
    percentage: Math.round((amount / monthlySpend) * 100)
  }));

  // Update spending category
  const updateSpendingCategory = (category: string, amount: number) => {
    setSpendingBreakdown(prev => ({
      ...prev,
      [category]: amount
    }));
    
    const newTotal = Object.values({...spendingBreakdown, [category]: amount}).reduce((sum, val) => sum + val, 0);
    setMonthlySpend(newTotal);
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="px-4 py-6">
      <SEO 
        title="Smart Card Optimization - Interactive Credit Card Simulator"
        description="Interactive tools to manage credit utilization, optimize payments, and maximize rewards. Real-time credit score impact simulation."
        keywords="credit card optimization, credit utilization simulator, payment calculator, rewards optimizer, credit score simulator"
        canonical="https://dollarmento.com/smart-credit-card"
      />
      
      <div className="flex items-center mb-6">
        <button 
          onClick={() => window.history.back()}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <h1 className="text-2xl font-bold">Smart Card Optimization</h1>
      </div>

      {/* Current Status Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{creditScore}</div>
              <div className="text-sm text-gray-600">Credit Score</div>
              <Badge className={creditScore >= 750 ? "bg-green-500" : creditScore >= 700 ? "bg-yellow-500" : "bg-red-500"}>
                {creditScore >= 750 ? "Excellent" : creditScore >= 700 ? "Good" : "Fair"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${currentBalance.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Current Balance</div>
              <div className="text-xs text-gray-500">${availableCredit.toLocaleString()} available</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{utilizationRate}%</div>
              <div className="text-sm text-gray-600">Utilization Rate</div>
              <Progress value={utilizationRate} className="h-2 mt-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{optimizationScore}</div>
              <div className="text-sm text-gray-600">Optimization Score</div>
              <div className="text-xs text-gray-500">out of 100</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="utilization" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="utilization">Utilization Manager</TabsTrigger>
          <TabsTrigger value="payments">Payment Planner</TabsTrigger>
          <TabsTrigger value="rewards">Rewards Optimizer</TabsTrigger>
          <TabsTrigger value="spending">Spending Analyzer</TabsTrigger>
        </TabsList>

        {/* Utilization Manager */}
        <TabsContent value="utilization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Utilization Manager</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Current Balance: ${currentBalance.toLocaleString()}</Label>
                    <Slider
                      value={[currentBalance]}
                      onValueChange={(value) => setCurrentBalance(value[0])}
                      max={creditLimit}
                      min={0}
                      step={1000}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>Credit Limit: ${creditLimit.toLocaleString()}</Label>
                    <Slider
                      value={[creditLimit]}
                      onValueChange={(value) => setCreditLimit(value[0])}
                      max={200000}
                      min={currentBalance}
                      step={5000}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Real-time Impact</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Utilization Rate:</span>
                      <span className={`font-semibold ${utilizationRate <= 30 ? 'text-green-600' : utilizationRate <= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {utilizationRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Credit Score Impact:</span>
                      <span className={`font-semibold ${creditScore >= 750 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {creditScore}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available Credit:</span>
                      <span className="font-semibold">${availableCredit.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">💡 Smart Recommendations</h3>
                {utilizationRate > 30 && (
                  <p className="text-sm">• Reduce balance by ${((currentBalance - (creditLimit * 0.3))).toLocaleString()} to reach 30% utilization</p>
                )}
                {utilizationRate <= 10 && (
                  <p className="text-sm text-green-600">✓ Excellent! Your utilization is optimal for credit scoring</p>
                )}
                {utilizationRate > 10 && utilizationRate <= 30 && (
                  <p className="text-sm text-blue-600">• Good utilization. Consider lowering to under 10% for maximum score benefit</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Planner */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Payment Planner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Monthly Payment: ${monthlyPayment.toLocaleString()}</Label>
                    <Slider
                      value={[monthlyPayment]}
                      onValueChange={(value) => setMonthlyPayment(value[0])}
                      max={currentBalance}
                      min={Math.round(currentBalance * 0.01)}
                      step={100}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>Interest Rate: {interestRate}% APR</Label>
                    <Slider
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      max={36}
                      min={8}
                      step={0.5}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Payoff Analysis</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Payoff Time:</span>
                      <span className="font-semibold">{calculatePayoffTime()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Interest:</span>
                      <span className="font-semibold text-red-600">${calculateTotalInterest().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minimum Payment:</span>
                      <span className="text-sm">${Math.round(currentBalance * 0.02).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-semibold text-blue-600">Double Payment</div>
                  <div className="text-sm text-gray-600">
                    Pay ${(monthlyPayment * 2).toLocaleString()}/month
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => setMonthlyPayment(monthlyPayment * 2)}
                  >
                    Try This
                  </Button>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-semibold text-purple-600">Aggressive Payoff</div>
                  <div className="text-sm text-gray-600">
                    Pay ${Math.round(currentBalance * 0.1).toLocaleString()}/month
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => setMonthlyPayment(Math.round(currentBalance * 0.1))}
                  >
                    Try This
                  </Button>
                </div>

                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-semibold text-green-600">Minimum Only</div>
                  <div className="text-sm text-gray-600">
                    Pay ${Math.round(currentBalance * 0.02).toLocaleString()}/month
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => setMonthlyPayment(Math.round(currentBalance * 0.02))}
                  >
                    Try This
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rewards Optimizer */}
        <TabsContent value="rewards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Rewards Optimizer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Monthly Spending: ${monthlySpend.toLocaleString()}</Label>
                    <Slider
                      value={[monthlySpend]}
                      onValueChange={(value) => setMonthlySpend(value[0])}
                      max={100000}
                      min={5000}
                      step={1000}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>Rewards Rate: {rewardsRate}%</Label>
                    <Slider
                      value={[rewardsRate]}
                      onValueChange={(value) => setRewardsRate(value[0])}
                      max={5}
                      min={0.5}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Annual Fee: ${annualFee}</Label>
                    <Slider
                      value={[annualFee]}
                      onValueChange={(value) => setAnnualFee(value[0])}
                      max={2000}
                      min={0}
                      step={50}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Rewards Analysis</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monthly Rewards:</span>
                      <span className="font-semibold text-green-600">${monthlyRewards}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual Rewards:</span>
                      <span className="font-semibold text-green-600">${annualRewards}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual Fee:</span>
                      <span className="font-semibold text-red-600">${annualFee}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Net Annual Value:</span>
                      <span className={`font-semibold ${annualRewards - annualFee > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${(annualRewards - annualFee).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">💰 Value Optimization</h3>
                {annualRewards > annualFee * 2 && (
                  <p className="text-sm text-green-600">✓ Excellent value! Your rewards far exceed the annual fee</p>
                )}
                {annualRewards <= annualFee && (
                  <p className="text-sm text-red-600">⚠ Consider a no-fee card or increase spending in bonus categories</p>
                )}
                {annualRewards > annualFee && annualRewards <= annualFee * 2 && (
                  <p className="text-sm text-yellow-600">• Decent value, but could be optimized further</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Spending Analyzer */}
        <TabsContent value="spending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Spending Analyzer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Adjust Spending Categories</h3>
                  {Object.entries(spendingBreakdown).map(([category, amount]) => (
                    <div key={category}>
                      <Label className="capitalize">{category}: ${amount.toLocaleString()}</Label>
                      <Slider
                        value={[amount]}
                        onValueChange={(value) => updateSpendingCategory(category, value[0])}
                        max={20000}
                        min={0}
                        step={500}
                        className="mt-2"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Spending Breakdown</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={spendingData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="amount"
                      >
                        {spendingData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => [`$${value.toLocaleString()}`, 'Amount']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {spendingData.slice(0, 3).map((category, index) => (
                  <div key={category.name} className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-semibold" style={{color: COLORS[index]}}>{category.name}</div>
                      <div className="text-2xl font-bold">${category.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{category.percentage}% of spending</div>
                      <div className="text-xs text-gray-500 mt-1">
                        ${Math.round(category.amount * (rewardsRate / 100))} rewards/month
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartCreditCard;