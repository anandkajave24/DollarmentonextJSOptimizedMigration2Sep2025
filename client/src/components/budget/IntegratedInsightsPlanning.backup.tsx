import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  AlertCircle, 
  Loader2,
  PiggyBank,
  Home,
  Lightbulb,
  ShoppingCart,
  TrendingUp,
  Leaf,
  AlertTriangle,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useBudget } from "@/contexts/BudgetContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  LineChart, 
  Line, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Interface definitions
interface SpendingData {
  category: string;
  amount: number;
  date: string;
}

interface CategoryBreakdown {
  category: string;
  total: number;
  average: number;
  maximum: number;
  minimum: number;
}

interface SpendingMetrics {
  totalSpending: number;
  avgDailySpending: number;
  topCategory: string;
  monthOnMonthChange: number;
}

// Main component for the integrated insights and planning section
const IntegratedInsightsPlanning: React.FC = () => {
  const { toast } = useToast();
  const { savingsGoals } = useBudget();
  
  // Financial Health Score
  const [financialHealth, setFinancialHealth] = useState({
    score: 72,
    category: 'Good',
    color: 'bg-emerald-500',
  });
  
  // Financial metrics
  const [savingsRate, setSavingsRate] = useState(19.5);
  const [housingRatio, setHousingRatio] = useState(32.8);
  const [essentialRatio, setEssentialRatio] = useState(51.2);
  
  // Spending patterns data
  const [timePeriod, setTimePeriod] = useState("30");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [spendingData, setSpendingData] = useState<SpendingData[]>([]);
  const [metrics, setMetrics] = useState<SpendingMetrics | null>(null);
  const [breakdowns, setBreakdowns] = useState<CategoryBreakdown[]>([]);
  
  // Colors for charts
  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC926'];
  
  // Recommended actions
  const [recommendedActions, setRecommendedActions] = useState([
    {
      title: "Increase your savings rate",
      description: "Try to save at least 20% of your income. You're currently saving 19.5%, just short of the recommended amount.",
      impact: "High",
      effort: "Medium",
      cta: "Set up automatic transfers"
    },
    {
      title: "Review subscription services",
      description: "You have 5 subscription services totaling $3,200 monthly. Consider eliminating ones you don't use regularly.",
      impact: "Medium",
      effort: "Low",
      cta: "View subscriptions"
    },
    {
      title: "Build emergency fund",
      description: "Your emergency fund covers 4.2 months of expenses. Aim for 6 months of coverage.",
      impact: "High",
      effort: "High",
      cta: "Create a savings goal"
    }
  ]);
  
  // Calculate metrics from spending data
  const calculateMetrics = (data: SpendingData[]): SpendingMetrics => {
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    
    // Calculate average daily spending
    const days = parseInt(timePeriod);
    const avgDaily = total / days;
    
    // Find top category
    const categoryTotals: Record<string, number> = {};
    data.forEach(item => {
      categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount;
    });
    
    let topCategory = '';
    let maxAmount = 0;
    Object.entries(categoryTotals).forEach(([category, amount]) => {
      if (amount > maxAmount) {
        maxAmount = amount;
        topCategory = category;
      }
    });
    
    // Generate a random month-on-month change (-10% to +30%)
    const monthOnMonthChange = Math.random() * 40 - 10;
    
    return {
      totalSpending: total,
      avgDailySpending: avgDaily,
      topCategory,
      monthOnMonthChange
    };
  };
  
  // Generate category breakdowns from spending data
  const generateCategoryBreakdowns = (data: SpendingData[]): CategoryBreakdown[] => {
    const categories: Record<string, { total: number, values: number[] }> = {};
    
    data.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = {
          total: 0,
          values: []
        };
      }
      
      categories[item.category].total += item.amount;
      categories[item.category].values.push(item.amount);
    });
    
    return Object.entries(categories).map(([category, data]) => ({
      category,
      total: data.total,
      average: data.total / data.values.length,
      maximum: Math.max(...data.values),
      minimum: Math.min(...data.values)
    }));
  };
  
  // Generate synthetic spending data for testing purposes
  const generateSpendingData = (days: number): SpendingData[] => {
    const categories = ['Groceries', 'Dining Out', 'Entertainment', 'Transportation', 'Bills & Utilities', 'Shopping', 'Healthcare'];
    const result: SpendingData[] = [];
    const today = new Date();
    
    for (let i = 0; i < days * 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - Math.floor(Math.random() * days));
      
      const category = categories[Math.floor(Math.random() * categories.length)];
      const baseAmount = category === 'Bills & Utilities' ? 5000 : 
                        category === 'Groceries' ? 1000 : 
                        category === 'Dining Out' ? 500 : 300;
      
      const randomFactor = 0.5 + Math.random();
      const amount = Math.round(baseAmount * randomFactor);
      
      result.push({
        category,
        amount,
        date: date.toISOString().split('T')[0]
      });
    }
    
    return result;
  };
  
  // Handle loading spending data
  const handleLoadData = () => {
    setLoading(true);
    setError(null);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        const days = parseInt(timePeriod);
        const generatedData = generateSpendingData(days);
        setSpendingData(generatedData);
        setMetrics(calculateMetrics(generatedData));
        setBreakdowns(generateCategoryBreakdowns(generatedData));
        setLoading(false);
      } catch (err) {
        setError("Failed to load spending data. Please try again.");
        setLoading(false);
      }
    }, 1500);
  };
  
  // Load data on initial render
  useEffect(() => {
    handleLoadData();
  }, []);
  
  return (
    <div className="space-y-6">
      {error ? (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-8">
          {/* Section 1: Financial Health - Individual Card for each component */}
          <section id="financial-health" className="space-y-6">
            {/* Financial Health Score Card */}
            <Card>
              <CardHeader className="bg-gray-100 dark:bg-gray-800 border-b">
                <CardTitle className="text-xl font-bold">Financial Health Score</CardTitle>
                <CardDescription>Based on your budget and spending patterns</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center rounded-full w-40 h-40 border-8 border-gray-200 dark:border-gray-700 
                      shadow-lg relative">
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          fill="none" 
                          stroke="#e5e7eb" 
                          strokeWidth="8"
                        />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          fill="none" 
                          stroke={
                            financialHealth.category === 'Critical' ? '#ef4444' :
                            financialHealth.category === 'Needs Attention' ? '#f97316' :
                            financialHealth.category === 'Fair' ? '#f59e0b' :
                            financialHealth.category === 'Good' ? '#10b981' :
                            '#22c55e'
                          }
                          strokeWidth="8"
                          strokeDasharray="251.2"
                          strokeDashoffset={251.2 - (financialHealth.score/100 * 251.2)}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="text-center z-10">
                        <p className="text-5xl font-bold">{financialHealth.score}</p>
                        <p className="text-sm text-muted-foreground">out of 100</p>
                      </div>
                    </div>
                    <p className={`mt-4 font-semibold text-xl ${
                      financialHealth.category === 'Critical' ? 'text-red-600' :
                      financialHealth.category === 'Needs Attention' ? 'text-orange-600' :
                      financialHealth.category === 'Fair' ? 'text-amber-600' :
                      financialHealth.category === 'Good' ? 'text-emerald-600' :
                      'text-green-600'
                    }`}>
                      {financialHealth.category}
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">What This Score Means</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Your financial health score evaluates your budget across multiple dimensions including savings rate, 
                        investment habits, essential vs. discretionary spending balance, and housing affordability.
                      </p>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Critical</span>
                          <span>Excellent</span>
                        </div>
                        <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                          <div className="absolute inset-0 flex justify-between px-2">
                            <div className="h-full w-px bg-gray-400"></div>
                            <div className="h-full w-px bg-gray-400"></div>
                            <div className="h-full w-px bg-gray-400"></div>
                            <div className="h-full w-px bg-gray-400"></div>
                          </div>
                          <div 
                            className={`h-full ${financialHealth.color} rounded-full relative z-10`} 
                            style={{ width: `${financialHealth.score}%` }}
                          />
                        </div>
                        <div className="grid grid-cols-5 gap-1 text-xs text-center text-muted-foreground">
                          <div>0-35</div>
                          <div>36-50</div>
                          <div>51-65</div>
                          <div>66-80</div>
                          <div>81-100</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Financial Metrics Summary */}
            <Card className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <CardHeader className="bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
                <CardTitle className="text-center text-xl font-bold">Key Financial Metrics</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden hover:shadow-lg transition-all">
                    <div className={`absolute top-0 left-0 w-full h-1 ${savingsRate >= 20 ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center justify-center w-16 h-16 rounded-full mb-3 
                        ${savingsRate >= 20 ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
                        <PiggyBank className={`h-8 w-8 
                          ${savingsRate >= 20 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`} />
                      </div>
                      <h3 className="text-sm font-semibold mb-2">Savings Rate</h3>
                      <p className={`text-3xl font-bold ${savingsRate >= 20 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        {savingsRate.toFixed(1)}%
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {savingsRate >= 20 ? 'On target' : 'Below target'} (20% recommended)
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden hover:shadow-lg transition-all">
                    <div className={`absolute top-0 left-0 w-full h-1 ${housingRatio <= 35 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center justify-center w-16 h-16 rounded-full mb-3 
                        ${housingRatio <= 35 ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                        <Home className={`h-8 w-8 
                          ${housingRatio <= 35 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`} />
                      </div>
                      <h3 className="text-sm font-semibold mb-2">Housing Cost Ratio</h3>
                      <p className={`text-3xl font-bold ${housingRatio <= 35 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                        {housingRatio.toFixed(1)}%
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {housingRatio <= 35 ? 'Within healthy range' : 'Above recommended limit'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden hover:shadow-lg transition-all">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full mb-3 bg-blue-100 dark:bg-blue-900/30">
                        <ShoppingCart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-sm font-semibold mb-2">Essential Expenses</h3>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {essentialRatio.toFixed(1)}%
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Of total monthly income
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Section 2: Spending Patterns - In a Box Container */}
          <section id="spending-patterns" className="space-y-6">
            <div className="rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md">
              <div className="bg-gray-200 dark:bg-gray-700 px-6 py-4 border-b border-gray-300 dark:border-gray-600">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Spending Patterns
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Analyze and understand your spending habits</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 border shadow-sm">
                    <h3 className="font-medium mb-2 flex items-center text-blue-600 dark:text-blue-400">
                      <span className="material-icons text-sm mr-1">dataset</span>
                      Data Sources
                    </h3>
                    <ul className="space-y-1 pl-5 list-disc">
                      <li>Credit card transactions (if connected)</li>
                      <li>Manual expense entries</li>
                      <li>Budget allocations</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 border shadow-sm">
                    <h3 className="font-medium mb-2 flex items-center text-blue-600 dark:text-blue-400">
                      <span className="material-icons text-sm mr-1">analytics</span>
                      Pattern Analysis
                    </h3>
                    <ul className="space-y-1 pl-5 list-disc">
                      <li>Monthly trends (30-day rolling average)</li>
                      <li>Category distribution</li>
                      <li>Seasonal patterns</li>
                      <li>Spending anomalies</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  <div className="w-[180px]">
                    <Select
                      value={timePeriod}
                      onValueChange={setTimePeriod}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Time Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">Last 30 Days</SelectItem>
                        <SelectItem value="90">Last 3 Months</SelectItem>
                        <SelectItem value="180">Last 6 Months</SelectItem>
                        <SelectItem value="365">Last 1 Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={handleLoadData} 
                    disabled={loading}
                    className="px-6"
                  >
                    {loading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</>
                    ) : (
                      <>
                        <span className="material-icons mr-2 text-sm">analytics</span>
                        Load Spending Data
                      </>
                    )}
                  </Button>
                </div>
                
                {/* Show loader when data is loading */}
                {loading && (
                  <div className="flex justify-center items-center py-20">
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-12 w-12 animate-spin text-primary" />
                      <p className="mt-4 text-gray-600 dark:text-gray-400">Processing spending data...</p>
                    </div>
                  </div>
                )}
                
                {/* Show data when available */}
                {metrics && !loading && (
                  <>
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <CardContent className="p-4">
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Spending</div>
                          <div className="text-2xl font-bold text-red-500">${metrics.totalSpending.toLocaleString()}</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <CardContent className="p-4">
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Average Daily</div>
                          <div className="text-2xl font-bold text-red-500">${metrics.avgDailySpending.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <CardContent className="p-4">
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Top Category</div>
                          <div className="text-2xl font-bold text-red-500">{metrics.topCategory}</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <CardContent className="p-4">
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Month-on-Month</div>
                          <div className={`text-2xl font-bold ${metrics.monthOnMonthChange >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {metrics.monthOnMonthChange >= 0 ? '+' : ''}{metrics.monthOnMonthChange.toFixed(1)}%
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Monthly Trends Section */}
                    <div id="monthly-trends" className="mt-8">
                      <h3 className="text-xl font-bold mb-4 border-b pb-2">Monthly Trends</h3>
                      <Card className="border border-gray-200 dark:border-gray-700">
                        <CardContent className="p-6">
                          <h4 className="text-lg font-medium mb-4">Monthly Spending Trends</h4>
                          
                          <div className="h-80">
                            {spendingData.length > 0 && (
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                  data={(() => {
                                    // Transform data for monthly trends by category
                                    const uniqueCategories = Array.from(new Set(spendingData.map(d => d.category)));
                                    
                                    // Create a monthly record with all categories initialized
                                    const monthlyData: Record<string, Record<string, number | string>> = {};
                                    
                                    // Process the data
                                    spendingData.forEach(item => {
                                      const month = item.date.substring(0, 7); // YYYY-MM
                                      
                                      // Initialize the month if not exists
                                      if (!monthlyData[month]) {
                                        monthlyData[month] = { month };
                                        // Initialize all categories
                                        uniqueCategories.forEach(cat => {
                                          monthlyData[month][cat] = 0;
                                        });
                                      }
                                      
                                      // Add to the category amount
                                      const currentAmount = monthlyData[month][item.category] as number;
                                      monthlyData[month][item.category] = currentAmount + item.amount;
                                    });
                                    
                                    // Convert to array and sort by month
                                    return Object.values(monthlyData).sort((a, b) => 
                                      (a.month as string).localeCompare(b.month as string)
                                    );
                                  })()}
                                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                  <XAxis 
                                    dataKey="month" 
                                    tickFormatter={(value) => {
                                      // Format YYYY-MM to MMM YY (e.g., "Jan 23")
                                      const date = new Date(value + "-01");
                                      return new Intl.DateTimeFormat('en', { 
                                        month: 'short', 
                                        year: '2-digit' 
                                      }).format(date);
                                    }}
                                  />
                                  <YAxis 
                                    tickFormatter={(value) => 
                                      `$${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`
                                    } 
                                  />
                                  <RechartsTooltip 
                                    formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                                    labelFormatter={(label) => {
                                      // Format YYYY-MM to "Month Year" (e.g., "January 2023")
                                      const date = new Date(label + "-01");
                                      return new Intl.DateTimeFormat('en', { 
                                        month: 'long', 
                                        year: 'numeric' 
                                      }).format(date);
                                    }}
                                  />
                                  <Legend />
                                  
                                  {/* Dynamic lines for each spending category */}
                                  {(() => {
                                    // Colors for different categories
                                    const colors = [
                                      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
                                      '#9966FF', '#FF9F40', '#8AC926', '#1982C4'
                                    ];
                                    
                                    // Get unique categories
                                    const uniqueCategories = Array.from(new Set(spendingData.map(d => d.category)));
                                    
                                    return uniqueCategories.map((category, index) => (
                                      <Line
                                        key={category}
                                        type="monotone"
                                        dataKey={category}
                                        name={category}
                                        stroke={colors[index % colors.length]}
                                        strokeWidth={2}
                                        dot={{ r: 3 }}
                                        activeDot={{ r: 5 }}
                                      />
                                    ));
                                  })()}
                                </LineChart>
                              </ResponsiveContainer>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Categories Section */}
                    <div id="categories" className="mt-8">
                      <h3 className="text-xl font-bold mb-4 border-b pb-2">Categories</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border border-gray-200 dark:border-gray-700">
                          <CardContent className="p-6">
                            <h4 className="text-lg font-medium mb-4">Spending by Category</h4>
                            
                            <div className="h-80">
                              {spendingData.length > 0 && (
                                <ResponsiveContainer width="100%" height="100%">
                                  <RechartsPieChart>
                                    <Pie
                                      data={breakdowns.map(item => ({
                                        name: item.category,
                                        value: item.total
                                      }))}
                                      cx="50%"
                                      cy="50%"
                                      labelLine={false}
                                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                      outerRadius={80}
                                      fill="#8884d8"
                                      dataKey="value"
                                    >
                                      {breakdowns.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                      ))}
                                    </Pie>
                                    <RechartsTooltip 
                                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Total Spent']}
                                    />
                                  </RechartsPieChart>
                                </ResponsiveContainer>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border border-gray-200 dark:border-gray-700">
                          <CardContent className="p-6">
                            <h4 className="text-lg font-medium mb-4">Category Comparison</h4>
                            
                            <div className="h-80">
                              {breakdowns.length > 0 && (
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart
                                    data={breakdowns.map(item => ({
                                      name: item.category,
                                      total: item.total
                                    }))}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                    <XAxis 
                                      dataKey="name" 
                                      angle={-45} 
                                      textAnchor="end"
                                      height={70}
                                    />
                                    <YAxis 
                                      tickFormatter={(value) => 
                                        `$${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`
                                      } 
                                    />
                                    <RechartsTooltip 
                                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Total Spent']}
                                    />
                                    <Bar dataKey="total" fill="#8884d8">
                                      {breakdowns.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                      ))}
                                    </Bar>
                                  </BarChart>
                                </ResponsiveContainer>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    {/* Daily Pattern Section */}
                    <div id="daily-pattern" className="mt-8">
                      <h3 className="text-xl font-bold mb-4 border-b pb-2">Daily Pattern</h3>
                      <Card className="border border-gray-200 dark:border-gray-700">
                        <CardContent className="p-6">
                          <h4 className="text-lg font-medium mb-4">Daily Spending Pattern</h4>
                          
                          <div className="h-80">
                            {spendingData.length > 0 && (
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                  data={(() => {
                                    // Aggregate data by date
                                    const dailyData: Record<string, number> = {};
                                    
                                    spendingData.forEach(item => {
                                      if (!dailyData[item.date]) {
                                        dailyData[item.date] = 0;
                                      }
                                      dailyData[item.date] += item.amount;
                                    });
                                    
                                    // Convert to array and sort by date
                                    return Object.entries(dailyData)
                                      .map(([date, amount]) => ({ date, amount }))
                                      .sort((a, b) => a.date.localeCompare(b.date));
                                  })()}
                                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                  <XAxis 
                                    dataKey="date" 
                                    tickFormatter={(value) => {
                                      // Format YYYY-MM-DD to DD MMM
                                      const date = new Date(value);
                                      return new Intl.DateTimeFormat('en', { 
                                        day: '2-digit', 
                                        month: 'short'
                                      }).format(date);
                                    }}
                                  />
                                  <YAxis 
                                    tickFormatter={(value) => 
                                      `$${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`
                                    } 
                                  />
                                  <RechartsTooltip 
                                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Spent']}
                                    labelFormatter={(label) => {
                                      // Format YYYY-MM-DD to full date
                                      const date = new Date(label);
                                      return new Intl.DateTimeFormat('en', { 
                                        weekday: 'long',
                                        day: 'numeric', 
                                        month: 'long',
                                        year: 'numeric'
                                      }).format(date);
                                    }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="amount"
                                    name="Daily Spending"
                                    stroke="#4BC0C0"
                                    strokeWidth={2}
                                    dot={{ r: 2 }}
                                    activeDot={{ r: 5 }}
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            )}
                          </div>
                          
                          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            <h5 className="font-medium mb-2">Key Insights:</h5>
                            <ul className="pl-5 list-disc space-y-1">
                              <li>Highest spending days are typically around salary days (1st and 15th)</li>
                              <li>Weekend spending is 35% higher than weekday spending</li>
                              <li>Bills tend to concentrate in the first week of the month</li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
          
          {/* Section 3: Financial Planning - Add your own box container for this section */}
          <section id="financial-planning" className="space-y-6">
            <div className="rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md">
              <div className="bg-gray-200 dark:bg-gray-700 px-6 py-4 border-b border-gray-300 dark:border-gray-600">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Financial Planning
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Personalized recommendations to improve your financial health</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendedActions.map((action, index) => (
                    <Card key={index} className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                      <CardHeader className="bg-gray-100 dark:bg-gray-800 border-b">
                        <div className="flex items-center justify-between mb-1">
                          <div className={`px-2 py-1 rounded text-xs font-semibold ${
                            action.impact === 'High' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : action.impact === 'Medium'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                          }`}>
                            {action.impact} Impact
                          </div>
                          <div className={`px-2 py-1 rounded text-xs font-semibold ${
                            action.effort === 'Low' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : action.effort === 'Medium'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {action.effort} Effort
                          </div>
                        </div>
                        <CardTitle className="text-lg font-bold">{action.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{action.description}</p>
                        <Button className="w-full mt-2">{action.cta}</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card className="border border-gray-200 dark:border-gray-700">
                  <CardHeader className="bg-gray-100 dark:bg-gray-800 border-b">
                    <CardTitle className="text-xl font-bold">Long-Term Financial Projection</CardTitle>
                    <CardDescription>Based on your current financial behavior</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="h-80">
                      {/* Long-term financial projection chart */}
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            {year: 'Now', savings: 240000, investments: 120000, netWorth: 360000},
                            {year: '1 year', savings: 360000, investments: 240000, netWorth: 600000},
                            {year: '3 years', savings: 600000, investments: 660000, netWorth: 1260000},
                            {year: '5 years', savings: 840000, investments: 1320000, netWorth: 2160000},
                            {year: '10 years', savings: 1680000, investments: 4200000, netWorth: 5880000},
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                          <XAxis dataKey="year" />
                          <YAxis 
                            tickFormatter={(value) => 
                              `$${value >= 100000 ? (value/1000).toFixed(1) + 'L' : value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`
                            } 
                          />
                          <RechartsTooltip 
                            formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="savings" name="Savings" stroke="#36A2EB" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="investments" name="Investments" stroke="#FF6384" />
                          <Line type="monotone" dataKey="netWorth" name="Net Worth" stroke="#4BC0C0" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Projected Net Worth</h4>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">$58.8K</p>
                        <p className="text-xs text-blue-600/60 dark:text-blue-400/60">in 10 years</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Annual Growth Rate</h4>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">32.2%</p>
                        <p className="text-xs text-green-600/60 dark:text-green-400/60">from investments</p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">Financial Milestones</h4>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">7</p>
                        <p className="text-xs text-purple-600/60 dark:text-purple-400/60">achievable in 10 years</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default IntegratedInsightsPlanning;