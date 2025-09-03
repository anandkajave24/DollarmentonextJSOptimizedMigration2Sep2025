import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  CreditCard,
  TrendingUp,
  Sparkles,
  LineChart,
  Target,
  Award,
  FileBarChart,
  ChevronsUp,
  Clock,
  ShieldCheck,
  CalendarClock,
  Wallet,
  Calculator,
  BadgeIndianRupee,
  Percent
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart as RechartLineChart, Line } from 'recharts';

const SmartCreditCard = () => {
  // Card analyzer state
  const [cardType, setCardType] = useState('Rewards');
  const [monthlySpend, setMonthlySpend] = useState(25000);
  const [spendingCategories, setSpendingCategories] = useState<string[]>([]);
  const [cardLimit, setCardLimit] = useState(50000);
  const [showCardOptions, setShowCardOptions] = useState(false);
  
  // Credit score improvement state
  const [utilizationRate, setUtilizationRate] = useState(35);
  const [scoreImprovementShown, setScoreImprovementShown] = useState(false);
  const [scoreImprovement, setScoreImprovement] = useState(0);
  
  // Minimum payment impact state
  const [balance, setBalance] = useState(50000);
  const [interestRate, setInterestRate] = useState(36);
  const [showPaymentAnalysis, setShowPaymentAnalysis] = useState(false);
  
  // Smart spending state
  const [selectedSpendingCategory, setSelectedSpendingCategory] = useState('Travel');
  const [showSpendingTips, setShowSpendingTips] = useState(false);
  
  // Gamification state
  const [challenges, setChallenges] = useState([
    {
      name: "Perfect Payment Streak",
      description: "Make all payments on time for 3 months",
      progress: 2,
      total: 3,
      reward: "Gold Badge + ₹500 Cashback"
    },
    {
      name: "Low Utilization Master",
      description: "Keep utilization below 30% for 2 months",
      progress: 1,
      total: 2,
      reward: "Silver Badge + ₹300 Cashback"
    },
    {
      name: "Credit Mix Pro",
      description: "Maintain diverse credit types",
      progress: 2,
      total: 4,
      reward: "Platinum Badge + Free Credit Report"
    }
  ]);

  // Calculate utilization percentage based on monthly spend and card limit
  useEffect(() => {
    const calculatedUtilization = Math.round((monthlySpend / cardLimit) * 100);
    setUtilizationRate(Math.min(Math.max(calculatedUtilization, 0), 100));
  }, [monthlySpend, cardLimit]);
  
  // Handling score improvement calculation
  const calculateScoreImprovement = () => {
    let improvement = 0;
    
    // Improvement from lowering utilization (if over 30%)
    if (utilizationRate > 30) {
      improvement += Math.round((utilizationRate - 30) / 5) * 5;
    }
    
    // Add other factors for improvement
    if (spendingCategories.length >= 3) {
      improvement += 10; // Diverse spending pattern
    }
    
    improvement = Math.min(improvement, 50); // Cap improvement at 50 points
    setScoreImprovement(improvement);
    setScoreImprovementShown(true);
  };
  
  // Payment analysis data
  const calculatePaymentAnalysis = () => {
    // Minimum payment (typically 2.5% of balance)
    const minPayment = Math.max(balance * 0.025, 100);
    
    // Calculate months to pay off with minimum payments
    let remainingBalance = balance;
    let months = 0;
    let totalInterest = 0;
    let totalPaid = 0;
    const monthlyPayments: { month: number; balance: number; interest: number; payment: number }[] = [];
    
    while (remainingBalance > 0 && months < 360) {
      months += 1;
      const monthlyInterest = (remainingBalance * (interestRate / 100)) / 12;
      totalInterest += monthlyInterest;
      
      const payment = Math.max(minPayment, remainingBalance + monthlyInterest);
      totalPaid += payment;
      remainingBalance = remainingBalance + monthlyInterest - payment;
      
      monthlyPayments.push({
        month: months,
        balance: remainingBalance,
        interest: monthlyInterest,
        payment
      });
      
      // Break early for preview purposes if there are too many payments
      if (months >= 24) break;
    }
    
    return {
      minPayment,
      months,
      totalInterest,
      totalPaid,
      monthlyPayments,
      monthlyInterestAmount: (balance * (interestRate / 100)) / 12
    };
  };
  
  // Credit utilization impact data for chart
  const utilizationData = [
    { utilization: 10, impact: 95 },
    { utilization: 20, impact: 90 },
    { utilization: 30, impact: 85 },
    { utilization: 50, impact: 70 },
    { utilization: 70, impact: 50 },
    { utilization: 90, impact: 30 },
    { utilization: 100, impact: 20 }
  ];

  // Card usage options based on spending pattern and card type
  const getCardUsageOptions = (category: string, type: string) => {
    const usageOptions: { [key: string]: { [key: string]: string } } = {
      "Rewards": {
        "Groceries": "Use card for monthly groceries to earn 5x rewards",
        "Travel": "Book through card portal for bonus miles",
        "Dining": "Use on weekends for 2x dining rewards",
        "Shopping": "Time big purchases with reward multipliers",
        "Entertainment": "Pay for subscriptions to earn consistent points",
        "Fuel": "Use at partner fuel stations for 2% cashback"
      },
      "Travel": {
        "Travel": "Use complimentary lounge access and forex benefits",
        "Dining": "Extra rewards on international transactions",
        "Hotels": "Get free hotel nights with point conversion",
        "Fuel": "Earn miles on fuel purchases",
        "Shopping": "Shop at airport duty-free for point multipliers",
        "Entertainment": "Book event tickets through travel portal"
      },
      "Shopping": {
        "Online": "Stack card offers with e-commerce sales",
        "Electronics": "Use extended warranty protection",
        "Fashion": "Access exclusive brand partnerships",
        "Groceries": "Use for monthly bulk purchases",
        "Dining": "Use for dining to earn shopping vouchers",
        "Entertainment": "Book movie tickets for shopping cashback"
      },
      "Business": {
        "Travel": "Use for business trips to earn travel insurance",
        "Dining": "Business meals earn 3x points",
        "Fuel": "Track business transport expenses automatically",
        "Shopping": "Office supplies purchases get GST benefits",
        "Groceries": "Office pantry purchases get 2% back",
        "Entertainment": "Client entertainment expenses categorized automatically"
      },
      "Fuel": {
        "Fuel": "Get 5% cashback at all fuel stations",
        "Travel": "Earn highway toll benefits",
        "Dining": "Roadside restaurants earn extra points",
        "Shopping": "Auto accessory purchases get extended warranty",
        "Groceries": "Convenience store purchases at fuel stations get bonus",
        "Entertainment": "Road trip expenses categorized for tax purposes"
      },
      "Premium": {
        "Travel": "Access premium lounges and concierge services",
        "Dining": "Priority restaurant reservations and chef's table",
        "Shopping": "Personal shopping assistant at partner stores",
        "Entertainment": "VIP event access and preferred seating",
        "Groceries": "Premium grocery delivery with no minimum",
        "Fuel": "Valet parking benefits at premium malls"
      }
    };
    
    return usageOptions[type]?.[category] || "Maximize regular spending rewards to earn points";
  };
  
  // Smart spending tips
  const getSmartSpendingTips = (category: string) => {
    const tips: { [key: string]: { title: string; tips: string[] } } = {
      "Travel": {
        title: "Travel Smart",
        tips: [
          "Book flights Tuesday afternoon for best prices",
          "Use card travel portal for bonus points (2x-5x)",
          "Travel insurance is included - save on separate policies",
          "Foreign transaction fees waived when booking in advance",
          "Airport lounge access saves ₹1,500 per visit"
        ]
      },
      "Dining": {
        title: "Dining Deals",
        tips: [
          "Weekend dining earns 3x points at partner restaurants",
          "Dining between 2-5pm offers special discounts",
          "Set up card autopay for subscription services",
          "Link food delivery apps for exclusive offers",
          "Pre-book tables through card concierge for VIP treatment"
        ]
      },
      "Shopping": {
        title: "Shop Savvy",
        tips: [
          "Track price drops for 90 days with purchase protection",
          "Stack card offers with store promotions for 2x savings",
          "Extended warranty adds 1 year to manufacturer warranty",
          "Use card shopping portal for exclusive discounts",
          "Thursday flash deals offer 10% extra cashback"
        ]
      },
      "Entertainment": {
        title: "Entertainment Edge",
        tips: [
          "Book movie tickets Tuesday for BOGO offers",
          "Stream service annual subscriptions save 18%",
          "Exclusive pre-sale tickets for cardholders",
          "Free movie ticket each quarter when spending threshold met",
          "Discounted theme park tickets through rewards portal"
        ]
      },
      "Groceries": {
        title: "Grocery Gains",
        tips: [
          "First weekend of month offers 5% extra on groceries",
          "Link loyalty programs for automatic point doubling",
          "Scheduled grocery deliveries earn bonus points",
          "Special offers on seasonal produce quarterly",
          "Partner store promotions stack with card rewards"
        ]
      },
      "Fuel": {
        title: "Fuel Finances",
        tips: [
          "Fill up on Wednesday mornings for lowest prices",
          "Partner stations offer 4% cashback vs standard 2%",
          "Link FASTag for automatic tollway discounts",
          "Scheduled maintenance at partner centers earns points",
          "Track business vs personal fill-ups for tax season"
        ]
      }
    };
    
    return tips[category] || { title: "Smart Spending", tips: ["Use card for regular expenses to maximize rewards"] };
  };

  // Format currency for display
  const formatCurrency = (amount: number): string => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <CreditCard className="h-6 w-6 mr-2 text-blue-500" />
            Smart Credit Card Management
          </h1>
          <p className="text-muted-foreground">Optimize your credit card usage and improve your financial health</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center bg-blue-50 px-4 py-2 rounded-lg">
          <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
          <div>
            <span className="text-sm text-gray-600">Current Credit Score:</span>
            <span className="ml-2 font-semibold text-blue-600">728</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="col-span-1 shadow-sm border-blue-100">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <BadgeIndianRupee className="h-5 w-5 mr-2 text-blue-500" />
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Current Balance</div>
                <div className="text-xl font-semibold text-gray-800">{formatCurrency(balance)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Available Credit</div>
                <div className="text-xl font-semibold text-green-600">{formatCurrency(cardLimit - monthlySpend)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Utilization Rate</div>
                <div className="flex items-center">
                  <span className={`text-xl font-semibold ${utilizationRate > 30 ? 'text-amber-600' : 'text-green-600'}`}>
                    {utilizationRate}%
                  </span>
                  <Progress 
                    value={utilizationRate} 
                    max={100} 
                    className={`h-2 ml-2 flex-1 ${
                      utilizationRate > 70 
                        ? 'bg-gradient-to-r from-red-500 to-red-400' 
                        : utilizationRate > 30 
                          ? 'bg-gradient-to-r from-amber-500 to-amber-400' 
                          : 'bg-gradient-to-r from-green-600 to-green-400'
                    }`}
                  />
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Annual Interest Rate</div>
                <div className="text-xl font-semibold text-amber-600">{interestRate}% APR</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-3 shadow-sm border-blue-100">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-blue-500" />
              Credit Health Overview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Card Usage
                </h4>
                <div className="mt-2">
                  <span className="text-sm text-gray-600">Optimization Score</span>
                  <div className="flex items-center mt-1">
                    <span className="text-xl font-semibold text-blue-600 mr-2">78</span>
                    <span className="text-sm text-green-600">/100</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Based on spending patterns and rewards</p>
                </div>
                <Button variant="link" className="text-blue-600 text-sm p-0 mt-2">
                  View details
                </Button>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-700 mb-2 flex items-center">
                  <CalendarClock className="h-4 w-4 mr-2" />
                  Payment History
                </h4>
                <div className="mt-2">
                  <span className="text-sm text-gray-600">On-time Payments</span>
                  <div className="flex items-center mt-1">
                    <span className="text-xl font-semibold text-green-600 mr-2">100%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Last 12 months: 12/12 on-time</p>
                </div>
                <Button variant="link" className="text-green-600 text-sm p-0 mt-2">
                  View history
                </Button>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-700 mb-2 flex items-center">
                  <Wallet className="h-4 w-4 mr-2" />
                  Rewards Status
                </h4>
                <div className="mt-2">
                  <span className="text-sm text-gray-600">Available Points</span>
                  <div className="flex items-center mt-1">
                    <span className="text-xl font-semibold text-purple-600 mr-2">5,280</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Value: Approx. ₹1,320</p>
                </div>
                <Button variant="link" className="text-purple-600 text-sm p-0 mt-2">
                  Redeem rewards
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analyzer" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="analyzer" className="text-sm">
            Card Analyzer
          </TabsTrigger>
          <TabsTrigger value="score" className="text-sm">
            Score Improvement
          </TabsTrigger>
          <TabsTrigger value="spending" className="text-sm">
            Smart Spending
          </TabsTrigger>
          <TabsTrigger value="payment" className="text-sm">
            Payment Impact
          </TabsTrigger>
          <TabsTrigger value="benefits" className="text-sm">
            Challenges & Benefits
          </TabsTrigger>
        </TabsList>
        
        {/* Card Analyzer Tab */}
        <TabsContent value="analyzer" className="space-y-6">
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <LineChart className="h-5 w-5 mr-2 text-blue-500" />
                Smart Card Analyzer
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="card-type" className="font-medium">Card Type</Label>
                    <Select 
                      value={cardType}
                      onValueChange={(value) => setCardType(value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select card type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rewards">Rewards</SelectItem>
                        <SelectItem value="Travel">Travel</SelectItem>
                        <SelectItem value="Shopping">Shopping</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Fuel">Fuel</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="monthly-spend" className="font-medium">Monthly Spend (₹)</Label>
                    <Input
                      id="monthly-spend"
                      type="number"
                      value={monthlySpend}
                      onChange={(e) => setMonthlySpend(Number(e.target.value))}
                      className="mt-1"
                      min={0}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="font-medium">Major Spending Categories</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {["Groceries", "Travel", "Dining", "Shopping", "Entertainment", "Fuel"].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category}`}
                            checked={spendingCategories.includes(category)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSpendingCategories([...spendingCategories, category]);
                              } else {
                                setSpendingCategories(
                                  spendingCategories.filter((cat) => cat !== category)
                                );
                              }
                            }}
                          />
                          <label 
                            htmlFor={`category-${category}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="card-limit" className="font-medium">Credit Limit (₹)</Label>
                    <Input
                      id="card-limit"
                      type="number"
                      value={cardLimit}
                      onChange={(e) => setCardLimit(Number(e.target.value))}
                      className="mt-1"
                      min={0}
                    />
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6"
                onClick={() => setShowCardOptions(true)}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                View Card Usage Options
              </Button>
              
              {showCardOptions && (
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Smart Card Usage Options</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-5 bg-gradient-to-br from-blue-50 to-white">
                      <h4 className="font-medium text-blue-700 mb-3">Optimal Card Usage Strategy</h4>
                      
                      <div className="space-y-4">
                        {spendingCategories.length > 0 ? (
                          spendingCategories.map((category) => (
                            <div key={category} className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                              <h5 className="font-medium text-gray-800 mb-1">{category}</h5>
                              <p className="text-sm text-gray-600">{getCardUsageOptions(category, cardType)}</p>
                            </div>
                          ))
                        ) : (
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                            <p className="text-sm text-gray-600">Select spending categories to see relevant card usage options.</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-5 bg-gradient-to-br from-purple-50 to-white">
                      <h4 className="font-medium text-purple-700 mb-3">Optimization Insights</h4>
                      
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-3 shadow-sm border border-purple-100">
                          <h5 className="font-medium text-gray-800 mb-1">Credit Utilization</h5>
                          <p className="text-sm text-gray-600">
                            Your current utilization is <span className={utilizationRate > 30 ? "text-amber-600 font-medium" : "text-green-600 font-medium"}>
                              {utilizationRate}%
                            </span>. 
                            {utilizationRate > 30 
                              ? " Consider keeping utilization below 30% to improve your credit score."
                              : " Great job keeping utilization below 30%, which positively impacts your credit score."}
                          </p>
                        </div>
                        
                        <div className="bg-white rounded-lg p-3 shadow-sm border border-purple-100">
                          <h5 className="font-medium text-gray-800 mb-1">Rewards Optimization</h5>
                          <p className="text-sm text-gray-600">
                            {cardType === 'Rewards' 
                              ? "With your Rewards card, you could earn approximately " + formatCurrency(monthlySpend * 0.02) + " worth of cashback monthly by optimizing categories."
                              : cardType === 'Travel'
                              ? "With your Travel card, you could earn approximately " + Math.floor(monthlySpend * 0.01) + " travel points monthly (Value: ~" + formatCurrency(monthlySpend * 0.015) + ")."
                              : "With your " + cardType + " card, focus on category bonuses to maximize value."}
                          </p>
                        </div>
                        
                        <div className="bg-white rounded-lg p-3 shadow-sm border border-purple-100">
                          <h5 className="font-medium text-gray-800 mb-1">Interest Savings</h5>
                          <p className="text-sm text-gray-600">
                            Paying in full each month saves you approximately {formatCurrency((balance * (interestRate/100))/12)} in monthly interest charges.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Credit Score Improvement Tab */}
        <TabsContent value="score" className="space-y-6">
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <ChevronsUp className="h-5 w-5 mr-2 text-blue-500" />
                Credit Score Improvement
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Credit Utilization Impact</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Credit utilization accounts for approximately 30% of your credit score. Keeping utilization low demonstrates responsible credit management.
                  </p>
                  
                  <div className="mb-6">
                    <Label htmlFor="utilization-slider" className="font-medium">
                      Credit Utilization Rate: {utilizationRate}%
                    </Label>
                    <input
                      id="utilization-slider"
                      type="range"
                      min="0"
                      max="100"
                      value={utilizationRate}
                      onChange={(e) => setUtilizationRate(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                      style={{
                        background: 'linear-gradient(to right, #22c55e, #f59e0b, #ef4444)',
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span className="text-green-600">30%</span>
                      <span className="text-amber-500">50%</span>
                      <span className="text-red-500">100%</span>
                    </div>
                  </div>
                  
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartLineChart
                        data={utilizationData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="utilization" 
                          label={{ value: 'Utilization %', position: 'bottom', offset: -15 }} 
                        />
                        <YAxis 
                          domain={[0, 100]} 
                          label={{ value: 'Credit Score Impact', angle: -90, position: 'insideLeft', offset: -5 }}
                        />
                        <Tooltip formatter={(value) => [`${value}%`, 'Score Impact']} />
                        <Line 
                          type="monotone" 
                          dataKey="impact" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={{ fill: '#3b82f6' }}
                          activeDot={{ r: 8 }}
                        />
                        {/* Current utilization marker */}
                        <Tooltip
                          formatter={(value) => [`${value}%`, 'Score Impact']}
                          labelFormatter={() => `Your Utilization: ${utilizationRate}%`}
                        />
                        {utilizationData.map((entry, index) => (
                          entry.utilization <= utilizationRate && index < utilizationData.length - 1 && 
                          utilizationData[index + 1].utilization > utilizationRate ? (
                            <Line
                              key="userPoint"
                              type="monotone"
                              data={[
                                { utilization: utilizationRate, impact: entry.impact - ((entry.impact - utilizationData[index + 1].impact) * ((utilizationRate - entry.utilization) / (utilizationData[index + 1].utilization - entry.utilization))) }
                              ]}
                              dataKey="impact"
                              stroke="transparent"
                              dot={{ r: 8, fill: '#ef4444', stroke: '#ffffff', strokeWidth: 2 }}
                            />
                          ) : null
                        ))}
                      </RechartLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Improvement Plan</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Take these actions to improve your credit score over the next 3-6 months.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h4 className="font-medium text-blue-700 flex items-center mb-2">
                        <Percent className="h-4 w-4 mr-2" />
                        Reduce Utilization
                      </h4>
                      <p className="text-sm mb-2">
                        {utilizationRate > 30 ? (
                          <>Lowering your utilization from {utilizationRate}% to 30% could improve your score by up to {Math.round((utilizationRate - 30) / 5) * 5} points.</>
                        ) : (
                          <>Great job! Your utilization is already below the 30% threshold. Keep it up.</>
                        )}
                      </p>
                      {utilizationRate > 30 && (
                        <div className="bg-white p-2 rounded border border-blue-100 text-sm">
                          <strong>Required action:</strong> Reduce card balance by approximately {formatCurrency(((utilizationRate - 30) / 100) * cardLimit)}
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <h4 className="font-medium text-green-700 flex items-center mb-2">
                        <CalendarClock className="h-4 w-4 mr-2" />
                        Payment History
                      </h4>
                      <p className="text-sm mb-2">
                        Payment history accounts for 35% of your credit score. Ensure all payments are made on time.
                      </p>
                      <div className="bg-white p-2 rounded border border-green-100 text-sm">
                        <strong>Tip:</strong> Set up automatic payments to never miss a due date
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <h4 className="font-medium text-purple-700 flex items-center mb-2">
                        <Clock className="h-4 w-4 mr-2" />
                        Credit Age
                      </h4>
                      <p className="text-sm mb-2">
                        The age of your credit history affects 15% of your score. Keep your oldest accounts open.
                      </p>
                      <div className="bg-white p-2 rounded border border-purple-100 text-sm">
                        <strong>Tip:</strong> Make small charges on older cards to keep them active
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                      <h4 className="font-medium text-amber-700 flex items-center mb-2">
                        <FileBarChart className="h-4 w-4 mr-2" />
                        Credit Mix
                      </h4>
                      <p className="text-sm mb-2">
                        Having diverse credit types (cards, loans) affects 10% of your score.
                      </p>
                      <div className="bg-white p-2 rounded border border-amber-100 text-sm">
                        <strong>Tip:</strong> Consider a small secured loan if you only have credit cards
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-6"
                    onClick={calculateScoreImprovement}
                  >
                    <Target className="mr-2 h-4 w-4" />
                    Calculate Potential Improvement
                  </Button>
                  
                  {scoreImprovementShown && scoreImprovement > 0 && (
                    <div className="mt-4 p-4 text-center bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg border border-yellow-200 animate-bounce">
                      <h3 className="text-xl font-bold text-amber-700">🎉 +{scoreImprovement} Points! 🎉</h3>
                      <p className="text-sm text-amber-600">Potential improvement by following these steps</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Smart Spending Guide Tab */}
        <TabsContent value="spending" className="space-y-6">
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-blue-500" />
                Smart Spending Guide
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <h3 className="font-medium text-gray-700 mb-3">Choose Spending Category</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-2 mb-4">
                    {["Travel", "Dining", "Shopping", "Entertainment", "Groceries", "Fuel"].map((category) => (
                      <Button
                        key={category}
                        variant={selectedSpendingCategory === category ? "default" : "outline"}
                        className={`justify-start ${selectedSpendingCategory === category ? "" : "border-gray-200"}`}
                        onClick={() => {
                          setSelectedSpendingCategory(category);
                          setShowSpendingTips(true);
                        }}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mt-4">
                    <h4 className="font-medium text-blue-700 mb-2">Key Benefits</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Maximize rewards on every purchase</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Save money with insider timing tricks</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Access hidden card benefits most people miss</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Leverage special merchant partnerships</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  {showSpendingTips && (
                    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 border rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-blue-700 mb-4">
                        {getSmartSpendingTips(selectedSpendingCategory).title}
                      </h3>
                      
                      <div className="bg-white rounded-lg border border-blue-100 p-4 mb-6">
                        <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                          <Sparkles className="h-4 w-4 text-blue-500 mr-2" />
                          Insider Tips
                        </h4>
                        
                        <div className="space-y-4">
                          {getSmartSpendingTips(selectedSpendingCategory).tips.map((tip, index) => (
                            <div key={index} className="flex items-start">
                              <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                <span className="text-blue-700 text-sm font-medium">{index + 1}</span>
                              </div>
                              <p className="text-gray-700">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-50 to-white border border-green-100 rounded-lg p-4">
                        <h4 className="font-medium text-green-700 mb-2">Potential Annual Savings</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={[
                                { category: "Regular Use", saving: 4800 },
                                { category: "Smart Strategy", saving: 12600 }
                              ]}
                              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis dataKey="category" />
                              <YAxis 
                                tickFormatter={(value) => `₹${value/1000}K`} 
                                label={{ value: 'Annual Savings (₹)', angle: -90, position: 'insideLeft' }}
                              />
                              <Tooltip formatter={(value: any) => [formatCurrency(value), 'Annual Saving']} />
                              <Bar 
                                dataKey="saving" 
                                fill="#10b981" 
                                radius={[4, 4, 0, 0]}
                                label={{ 
                                  position: 'top', 
                                  formatter: (value: any) => formatCurrency(value),
                                  fill: '#047857',
                                  fontSize: 12
                                }}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <p className="text-sm text-gray-600 text-center mt-3">
                          Smart strategies can save you ₹7,800+ annually compared to regular card usage.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {!showSpendingTips && (
                    <div className="h-full flex items-center justify-center p-10 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-center">
                        <Sparkles className="h-12 w-12 mx-auto text-blue-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Select a Spending Category</h3>
                        <p className="text-gray-500">Choose from the categories on the left to see smart spending strategies</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Minimum Payment Impact Tab */}
        <TabsContent value="payment" className="space-y-6">
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                Minimum Payment Impact Analysis
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="balance" className="font-medium">Current Balance (₹)</Label>
                  <Input
                    id="balance"
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(Number(e.target.value))}
                    className="mt-1"
                    min={0}
                  />
                </div>
                
                <div>
                  <Label htmlFor="interest-rate" className="font-medium">Annual Interest Rate (%)</Label>
                  <Input
                    id="interest-rate"
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="mt-1"
                    min={0}
                    max={100}
                  />
                </div>
              </div>
              
              <Button 
                className="w-full mb-6"
                onClick={() => setShowPaymentAnalysis(true)}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Payment Impact
              </Button>
              
              {showPaymentAnalysis && (
                <div className="space-y-6">
                  {(() => {
                    const analysis = calculatePaymentAnalysis();
                    return (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <h3 className="font-medium text-blue-700 mb-1">Monthly Minimum Due</h3>
                            <p className="text-2xl font-semibold">{formatCurrency(analysis.minPayment)}</p>
                            <p className="text-xs text-gray-500">2.5% of balance or ₹100, whichever is higher</p>
                          </div>
                          
                          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                            <h3 className="font-medium text-red-700 mb-1">Time to Pay Off</h3>
                            <p className="text-2xl font-semibold text-red-600">
                              {analysis.months} months
                              <span className="text-sm font-normal ml-1">
                                ({(analysis.months / 12).toFixed(1)} years)
                              </span>
                            </p>
                            <p className="text-xs text-gray-500">Assuming no new purchases</p>
                          </div>
                          
                          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                            <h3 className="font-medium text-amber-700 mb-1">Total Interest Paid</h3>
                            <p className="text-2xl font-semibold text-amber-600">{formatCurrency(analysis.totalInterest)}</p>
                            <p className="text-xs text-gray-500">
                              {((analysis.totalInterest / balance) * 100).toFixed(1)}% of original balance
                            </p>
                          </div>
                        </div>
                        
                        <div className="h-72">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartLineChart
                              data={analysis.monthlyPayments}
                              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis 
                                dataKey="month" 
                                label={{ value: 'Month', position: 'bottom', offset: -15 }}
                              />
                              <YAxis 
                                tickFormatter={(value) => `₹${value/1000}K`} 
                                label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
                              />
                              <Tooltip 
                                formatter={(value: any) => [formatCurrency(value), 'Amount']} 
                                labelFormatter={(value: any) => `Month ${value}`}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="balance" 
                                name="Remaining Balance"
                                stroke="#ef4444" 
                                strokeWidth={2}
                                dot={{ r: 1 }}
                                activeDot={{ r: 6 }}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="interest" 
                                name="Monthly Interest"
                                stroke="#f59e0b" 
                                strokeWidth={2}
                                dot={{ r: 1 }}
                                activeDot={{ r: 6 }}
                              />
                            </RechartLineChart>
                          </ResponsiveContainer>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border">
                          <h3 className="font-medium text-gray-800 mb-3">📊 Credit Score Impact</h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Making only minimum payments can significantly affect your credit score in multiple ways:
                          </p>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              <span><strong>Credit Utilization:</strong> High balances carried forward increase your credit utilization ratio</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-amber-500 mr-2">•</span>
                              <span><strong>Payment History:</strong> While minimum payments maintain a positive payment history, high utilization may offset this benefit</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              <span><strong>Debt Burden:</strong> Long-term high balances suggest higher credit risk to lenders</span>
                            </li>
                          </ul>
                          <p className="mt-3 text-sm font-medium text-red-600">
                            Recommendation: Pay more than the minimum whenever possible to reduce interest and improve credit score.
                          </p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-100">
                          <h3 className="font-medium text-blue-700 mb-3">💡 Smart Payment Strategies</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded border border-blue-100">
                              <h4 className="font-medium text-gray-800 mb-1">Fixed Amount Strategy</h4>
                              <p className="text-sm text-gray-600">Pay ₹{formatCurrency(balance * 0.1)} (10% of balance) monthly to pay off in {Math.ceil(Math.log(1 / (1 - ((interestRate/1200) / (0.1 + (interestRate/1200))))) / Math.log(1 + (interestRate/1200)))} months</p>
                            </div>
                            
                            <div className="bg-white p-3 rounded border border-blue-100">
                              <h4 className="font-medium text-gray-800 mb-1">Percentage Strategy</h4>
                              <p className="text-sm text-gray-600">Pay 10-15% of the balance instead of 2.5% to significantly reduce payoff time</p>
                            </div>
                            
                            <div className="bg-white p-3 rounded border border-blue-100">
                              <h4 className="font-medium text-gray-800 mb-1">Full Balance Strategy</h4>
                              <p className="text-sm text-gray-600">Pay the full balance to avoid all interest charges and maintain excellent credit score</p>
                            </div>
                            
                            <div className="bg-white p-3 rounded border border-blue-100">
                              <h4 className="font-medium text-gray-800 mb-1">Debt Avalanche</h4>
                              <p className="text-sm text-gray-600">With multiple cards, pay minimum on all but put extra money on highest-interest card first</p>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Gamification & Benefits Tab */}
        <TabsContent value="benefits" className="space-y-6">
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-blue-500" />
                Credit Score Challenges
              </h2>
              
              <div className="space-y-4">
                {challenges.map((challenge, index) => (
                  <div key={index} className="bg-white rounded-lg border shadow-sm overflow-hidden">
                    <div className="p-4">
                      <h3 className="font-medium text-gray-800 mb-1">{challenge.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                      
                      <div className="flex justify-between items-center text-sm mb-2">
                        <span>Progress: {challenge.progress}/{challenge.total}</span>
                        <span>{Math.round((challenge.progress / challenge.total) * 100)}%</span>
                      </div>
                      
                      <Progress 
                        value={(challenge.progress / challenge.total) * 100} 
                        max={100} 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="bg-blue-50 px-4 py-2 border-t border-blue-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-blue-700 flex items-center">
                          <Award className="h-3.5 w-3.5 mr-1" />
                          Reward:
                        </span>
                        <span className="text-sm">{challenge.reward}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium text-gray-800 mb-4">Card Benefits Status</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-purple-50 rounded-lg border border-purple-100 p-4 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-16 h-16">
                      <div className="absolute transform rotate-45 bg-purple-500 text-white text-xs font-semibold py-1 right-[-35px] top-[20px] w-[170px] text-center">
                        ACTIVE
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-purple-700 mb-2">Global Airport Lounge Access</h4>
                    <p className="text-sm text-gray-600 mb-4">2 complimentary lounge visits per quarter</p>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span>Remaining this quarter:</span>
                      <span className="font-semibold">2 visits</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span>Value:</span>
                      <span className="font-semibold">₹3,000</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg border border-blue-100 p-4 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-16 h-16">
                      <div className="absolute transform rotate-45 bg-blue-500 text-white text-xs font-semibold py-1 right-[-35px] top-[20px] w-[170px] text-center">
                        ACTIVE
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-blue-700 mb-2">Purchase Protection</h4>
                    <p className="text-sm text-gray-600 mb-4">Coverage for theft or damage within 90 days</p>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span>Coverage limit:</span>
                      <span className="font-semibold">₹50,000</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span>Eligibility:</span>
                      <span className="font-semibold">All card purchases</span>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg border border-green-100 p-4 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-16 h-16">
                      <div className="absolute transform rotate-45 bg-amber-500 text-white text-xs font-semibold py-1 right-[-35px] top-[20px] w-[170px] text-center">
                        UNLOCK AT ₹5L
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-green-700 mb-2">Travel Insurance</h4>
                    <p className="text-sm text-gray-600 mb-4">Coverage for travel emergencies</p>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span>Spend requirement:</span>
                      <span className="font-semibold">₹5,00,000 annually</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span>Your spend:</span>
                      <span className="font-semibold">₹2,75,000</span>
                    </div>
                    <Progress 
                      value={55} 
                      max={100} 
                      className="h-1.5 mt-2"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium text-gray-800 mb-4">Milestone Tracker</h3>
                
                <div className="relative">
                  <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200"></div>
                  
                  <div className="space-y-8">
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1.5 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center z-10">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg border border-green-100 p-4">
                        <h4 className="font-medium text-green-700 mb-1">Perfect Payment Streak - 6 Months</h4>
                        <p className="text-sm text-gray-600">Achieved on April 15, 2025</p>
                        <div className="mt-2 text-sm flex items-center text-green-600">
                          <Award className="h-4 w-4 mr-1" />
                          <span>Reward: ₹500 cashback credited to your account</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1.5 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center z-10">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg border border-green-100 p-4">
                        <h4 className="font-medium text-green-700 mb-1">Utilization Master - Below 30% for 3 Months</h4>
                        <p className="text-sm text-gray-600">Achieved on March 10, 2025</p>
                        <div className="mt-2 text-sm flex items-center text-green-600">
                          <Award className="h-4 w-4 mr-1" />
                          <span>Reward: Annual fee waiver worth ₹1,000</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1.5 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center z-10 border-2 border-blue-300">
                        <span className="text-blue-600 font-medium">30d</span>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
                        <h4 className="font-medium text-blue-700 mb-1">Spend Goal - ₹50,000 in Quarterly Spend</h4>
                        <p className="text-sm text-gray-600">In progress - ₹35,000 / ₹50,000</p>
                        <Progress 
                          value={70} 
                          max={100} 
                          className="h-1.5 mt-2 mb-2"
                        />
                        <div className="text-sm flex items-center text-blue-600">
                          <Award className="h-4 w-4 mr-1" />
                          <span>Reward: Movie ticket vouchers worth ₹1,000</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1.5 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center z-10 border-2 border-gray-300">
                        <span className="text-gray-600 font-medium">?</span>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                        <h4 className="font-medium text-gray-700 mb-1">Mystery Challenge</h4>
                        <p className="text-sm text-gray-600">Complete 3 other challenges to unlock</p>
                        <div className="mt-2 text-sm flex items-center text-gray-600">
                          <Award className="h-4 w-4 mr-1" />
                          <span>Reward: Premium surprise gift</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartCreditCard;