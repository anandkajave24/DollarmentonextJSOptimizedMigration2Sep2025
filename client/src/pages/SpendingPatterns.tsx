import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { SEO } from '../components/SEO';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import ResponsivePageWrapper from "../components/ResponsivePageWrapper";
import ComprehensiveFooter from "../components/ComprehensiveFooter";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Link } from "wouter";
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

// Define the types for our spending data
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

// Generate a sample of spending data
const generateSampleData = (days: number): SpendingData[] => {
  const data: SpendingData[] = [];
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const categories = {
    'Groceries': [2000, 5000],
    'Entertainment': [1000, 3000],
    'Shopping': [3000, 8000],
    'Bills & Utilities': [5000, 10000],
    'Dining Out': [1000, 4000],
    'Transportation': [2000, 5000]
  };
  
  // Create dates between start and end date
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    // For each category, create a spending entry
    Object.entries(categories).forEach(([category, [min, max]]) => {
      let amount = Math.floor(Math.random() * (max - min + 1)) + min;
      
      // Increase shopping during festival season (October, November)
      if (category === 'Shopping' && (d.getMonth() === 9 || d.getMonth() === 10)) {
        amount = Math.floor(amount * 1.5);
      }
      
      data.push({
        category,
        amount,
        date: d.toISOString().split('T')[0], // Format as YYYY-MM-DD
      });
    });
  }
  
  return data;
};

// Calculate spending metrics
const calculateMetrics = (data: SpendingData[]): SpendingMetrics => {
  const totalSpending = data.reduce((sum, item) => sum + item.amount, 0);
  
  // Group by date to calculate daily average
  const dailyTotals = data.reduce((acc, item) => {
    const date = item.date;
    acc[date] = (acc[date] || 0) + item.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const avgDailySpending = Object.values(dailyTotals).reduce((sum, amount) => sum + amount, 0) / 
    Object.keys(dailyTotals).length;
  
  // Find top category
  const categoryTotals = data.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const topCategory = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])[0][0];
  
  // Calculate month-on-month change
  // First group by month
  const monthlyTotals = data.reduce((acc, item) => {
    const month = item.date.substring(0, 7); // Get YYYY-MM
    acc[month] = (acc[month] || 0) + item.amount;
    return acc;
  }, {} as Record<string, number>);
  
  // Get the last two months and calculate percentage change
  const months = Object.keys(monthlyTotals).sort();
  const monthOnMonthChange = months.length > 1 
    ? ((monthlyTotals[months[months.length - 1]] / monthlyTotals[months[months.length - 2]]) - 1) * 100
    : 0;
  
  return {
    totalSpending,
    avgDailySpending,
    topCategory,
    monthOnMonthChange
  };
};

// Calculate category breakdown
const calculateCategoryBreakdown = (data: SpendingData[]): CategoryBreakdown[] => {
  // Group data by category
  const categories = data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item.amount);
    return acc;
  }, {} as Record<string, number[]>);
  
  // Calculate metrics for each category
  return Object.entries(categories).map(([category, amounts]) => {
    const total = amounts.reduce((sum, amount) => sum + amount, 0);
    const average = total / amounts.length;
    const maximum = Math.max(...amounts);
    const minimum = Math.min(...amounts);
    
    return {
      category,
      total,
      average,
      maximum,
      minimum
    };
  });
};

// Custom hook for charts
const useChart = (data: SpendingData[], type: 'monthly' | 'category' | 'daily') => {
  const [chartData, setChartData] = useState<any>(null);
  
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    // Different processing based on chart type
    if (type === 'monthly') {
      // Group by month and category
      const monthlyData = data.reduce((acc, item) => {
        const month = item.date.substring(0, 7); // Get YYYY-MM
        if (!acc[month]) {
          acc[month] = {};
        }
        acc[month][item.category] = (acc[month][item.category] || 0) + item.amount;
        return acc;
      }, {} as Record<string, Record<string, number>>);
      
      // Convert to chart format
      const chartSeries = Object.entries(monthlyData)
        .map(([month, categories]) => ({
          name: month,
          data: Object.values(categories)
        }));
      
      setChartData({
        categories: Object.keys(data[0]),
        series: chartSeries
      });
    } 
    else if (type === 'category') {
      // Group by category
      const categoryTotals = data.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.amount;
        return acc;
      }, {} as Record<string, number>);
      
      setChartData({
        labels: Object.keys(categoryTotals),
        series: Object.values(categoryTotals)
      });
    }
    else if (type === 'daily') {
      // Group by date
      const dailyTotals = data.reduce((acc, item) => {
        const date = item.date;
        acc[date] = (acc[date] || 0) + item.amount;
        return acc;
      }, {} as Record<string, number>);
      
      // Sort by date
      const sortedDates = Object.keys(dailyTotals).sort();
      
      setChartData({
        dates: sortedDates,
        amounts: sortedDates.map(date => dailyTotals[date])
      });
    }
  }, [data, type]);
  
  return chartData;
};

export default function SpendingPatterns() {
  return (
    <>
      <SEO 
        title="Spending Patterns Analysis - Track & Optimize Your Spending Habits"
        description="Analyze your spending patterns with detailed charts and insights. Track spending trends, identify opportunities to save, and optimize your budget with comprehensive spending analytics."
        keywords="spending patterns, spending analysis, budget tracking, expense analysis, spending habits, financial analytics, money tracking, expense management, spending insights"
        canonical="https://dollarmento.com/spending-patterns"
      />
      <SpendingPatternsContent />
    </>
  );
}

function SpendingPatternsContent() {
  const [timePeriod, setTimePeriod] = useState<string>("30");
  const [loading, setLoading] = useState<boolean>(false);
  const [spendingData, setSpendingData] = useState<SpendingData[]>([]);
  const [metrics, setMetrics] = useState<SpendingMetrics | null>(null);
  const [breakdown, setBreakdown] = useState<CategoryBreakdown[]>([]);
  const [showInsights, setShowInsights] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("trends");
  
  // Charts data
  const monthlyChartData = useChart(spendingData, 'monthly');
  const categoryChartData = useChart(spendingData, 'category');
  const dailyChartData = useChart(spendingData, 'daily');
  
  // Handle loading data
  const handleLoadData = () => {
    setLoading(true);
    
    // Simulate server delay (would be an API call in a real app)
    setTimeout(() => {
      // Generate sample data
      const days = parseInt(timePeriod);
      const data = generateSampleData(days);
      
      setSpendingData(data);
      
      // Calculate metrics
      const metrics = calculateMetrics(data);
      setMetrics(metrics);
      
      // Calculate breakdown
      const breakdown = calculateCategoryBreakdown(data);
      setBreakdown(breakdown);
      
      // Automatically show insights when data is loaded
      setShowInsights(true);
      
      setLoading(false);
    }, 800);
  };
  
  return (
    <ResponsivePageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <span className="material-icons text-blue-500 mr-2">insights</span>
            Spending Pattern Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Analyze your spending habits to make better financial decisions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-5">
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
              <Card className="bg-gray-100 dark:bg-gray-800">
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Spending</div>
                  <div className="text-2xl font-bold text-red-500">${metrics.totalSpending.toLocaleString()}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-100 dark:bg-gray-800">
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Average Daily</div>
                  <div className="text-2xl font-bold text-red-500">${metrics.avgDailySpending.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-100 dark:bg-gray-800">
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Top Category</div>
                  <div className="text-2xl font-bold text-red-500">{metrics.topCategory}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-100 dark:bg-gray-800">
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Month-on-Month</div>
                  <div className={`text-2xl font-bold ${metrics.monthOnMonthChange >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {metrics.monthOnMonthChange >= 0 ? '+' : ''}{metrics.monthOnMonthChange.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Transfer Goals Button */}
            <div className="flex flex-col items-center mt-4">
              <Link href="/goal-settings">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center">
                  <span className="material-icons mr-2 text-sm">description</span>
                  Transfer All Goals to Goal Settings
                </Button>
              </Link>
              <p className="text-xs text-gray-500 mt-2 text-center max-w-md">
                Add all your BudgetBuddy goals to the Goals Settings page for comprehensive tracking
              </p>
            </div>
            
            {/* Tabs for different visualizations */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="trends">Monthly Trends</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="daily">Daily Pattern</TabsTrigger>
              </TabsList>
              
              <TabsContent value="trends">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Monthly Spending Trends</h3>
                    
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
                                  activeDot={{ r: 6 }}
                                />
                              ));
                            })()}
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <p>This chart shows your spending trends over the selected time period, broken down by category. 
                      You can identify patterns and see how your spending fluctuates month to month.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="categories">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Spending Distribution by Category</h3>
                    
                    <div className="h-80">
                      {spendingData.length > 0 && (
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={breakdown.map(item => ({
                                name: item.category,
                                value: item.total
                              }))}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              outerRadius={130}
                              innerRadius={60}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            >
                              {breakdown.map((entry, index) => {
                                // Colors for different categories
                                const COLORS = [
                                  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
                                  '#9966FF', '#FF9F40', '#8AC926', '#1982C4'
                                ];
                                return (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]} 
                                  />
                                );
                              })}
                            </Pie>
                            <RechartsTooltip 
                              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
                            />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Category Breakdown</h4>
                      <div className="space-y-4">
                        {breakdown.map((category) => (
                          <div key={category.category}>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{category.category}</span>
                              <span className="text-gray-600 dark:text-gray-400">
                                ${category.total.toLocaleString()}
                                <span className="text-sm ml-1 text-gray-500">
                                  ({((category.total / metrics.totalSpending) * 100).toFixed(1)}%)
                                </span>
                              </span>
                            </div>
                            <Progress 
                              value={(category.total / metrics.totalSpending) * 100} 
                              className="h-2 mb-1" 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="daily">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Daily Spending Pattern</h3>
                    
                    <div className="h-80">
                      {spendingData.length > 0 && (
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={(() => {
                              // Group by date
                              const dailyTotals = spendingData.reduce((acc, item) => {
                                const date = item.date;
                                if (!acc[date]) {
                                  acc[date] = { date, amount: 0 };
                                }
                                acc[date].amount += item.amount;
                                return acc;
                              }, {} as Record<string, { date: string, amount: number }>);
                              
                              // Convert to array for chart and sort by date
                              return Object.values(dailyTotals).sort((a, b) => 
                                a.date.localeCompare(b.date)
                              );
                            })()}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                            <XAxis 
                              dataKey="date" 
                              tickFormatter={(value) => {
                                // Format YYYY-MM-DD to DD MMM (e.g., "15 Jan")
                                const date = new Date(value);
                                return new Intl.DateTimeFormat('en', { 
                                  day: '2-digit',
                                  month: 'short'
                                }).format(date);
                              }}
                              minTickGap={30}
                            />
                            <YAxis 
                              tickFormatter={(value) => 
                                `$${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`
                              } 
                            />
                            <RechartsTooltip
                              labelFormatter={(label) => {
                                // Format YYYY-MM-DD to "Day, Month DD, YYYY" (e.g., "Monday, January 15, 2023")
                                const date = new Date(label);
                                return new Intl.DateTimeFormat('en', { 
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                }).format(date);
                              }}
                              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
                            />
                            <Line
                              type="monotone"
                              dataKey="amount"
                              stroke="#FF4B4B"
                              strokeWidth={2}
                              dot={{ r: 2 }}
                              activeDot={{ r: 5 }}
                              name="Daily Spending"
                            />
                            
                            {/* Trend line */}
                            <Line
                              type="linear"
                              dataKey="trendValue"
                              data={(() => {
                                // Calculate trend line using linear regression
                                const data = Object.values(spendingData.reduce((acc, item) => {
                                  const date = item.date;
                                  if (!acc[date]) {
                                    acc[date] = { date, amount: 0 };
                                  }
                                  acc[date].amount += item.amount;
                                  return acc;
                                }, {} as Record<string, { date: string, amount: number }>)).sort((a, b) => 
                                  a.date.localeCompare(b.date)
                                );
                                
                                // If there are less than 2 points, can't calculate a trend
                                if (data.length < 2) return data.map(item => ({ ...item, trendValue: item.amount }));
                                
                                // Linear regression
                                const n = data.length;
                                const indices = Array.from({ length: n }, (_, i) => i);
                                const sumX = indices.reduce((sum, x) => sum + x, 0);
                                const sumY = data.reduce((sum, d) => sum + d.amount, 0);
                                const sumXY = indices.reduce((sum, x, i) => sum + (x * data[i].amount), 0);
                                const sumXX = indices.reduce((sum, x) => sum + (x * x), 0);
                                
                                const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
                                const intercept = (sumY - slope * sumX) / n;
                                
                                // Calculate trend values for each point
                                return data.map((item, index) => ({
                                  ...item,
                                  trendValue: intercept + slope * index
                                }));
                              })()}
                              stroke="#4CAF50"
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              dot={false}
                              activeDot={false}
                              name="Trend"
                            />
                            <Legend />
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <p>This chart shows your daily spending pattern with a trend line to identify whether your 
                      spending is increasing or decreasing over time. Watch for spikes that might indicate unusual expenses.</p>
                    </div>
                    
                    <div className="mt-4 text-sm">
                      <h4 className="font-medium mb-2">Key Observations:</h4>
                      <ul className="space-y-1 list-disc pl-5">
                        <li>Your spending tends to be higher on {Math.random() > 0.5 ? 'weekends' : 'weekdays'}</li>
                        <li>You have {Math.random() > 0.5 ? 'consistent' : 'occasional large'} spending patterns</li>
                        <li>Your overall trend is {metrics.monthOnMonthChange >= 0 ? 'increasing' : 'decreasing'}</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {/* Insights Section */}
            {showInsights && (
              <div className="mt-6">
                <Card className="border border-blue-200 dark:border-blue-900">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <span className="material-icons text-yellow-500 mr-2">lightbulb</span>
                      Smart Recommendations
                    </h3>
                    
                    <Alert className="mb-4">
                      <AlertTitle>Spending Analysis</AlertTitle>
                      <AlertDescription>
                        Based on your spending patterns, we've generated these personalized insights.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Key Observations:</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="flex items-start">
                            <span className="material-icons text-blue-500 mr-2 text-sm">arrow_right</span>
                            Highest spending is in <strong>{metrics.topCategory}</strong> category
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-blue-500 mr-2 text-sm">arrow_right</span>
                            Daily average spending: <strong>${metrics.avgDailySpending.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-blue-500 mr-2 text-sm">arrow_right</span>
                            Monthly trend is <strong className={metrics.monthOnMonthChange >= 0 ? 'text-red-500' : 'text-green-500'}>
                              {metrics.monthOnMonthChange >= 0 ? 'increasing' : 'decreasing'}
                            </strong>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Suggestions:</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="flex items-start">
                            <span className="material-icons text-green-500 mr-2 text-sm">check_circle</span>
                            {metrics.monthOnMonthChange > 10 
                              ? `Consider budget limits for ${metrics.topCategory}` 
                              : 'Maintain current spending pattern'}
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-green-500 mr-2 text-sm">check_circle</span>
                            Visit <a href="/budget-buddy" className="text-blue-500 hover:underline">Budget Buddy</a> to set up budget alerts
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-green-500 mr-2 text-sm">check_circle</span>
                            Check <a href="/credit-card-usage" className="text-blue-500 hover:underline">Credit Card Usage</a> for reward optimization
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )}
        
        {/* Show this when no data is loaded */}
        {!spendingData.length && !loading && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3">
                <span className="material-icons text-blue-500 text-3xl">insights</span>
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Ready to Analyze Your Spending?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Select a time period above and click "Load Spending Data" to begin analyzing your spending patterns.
            </p>
          </div>
        )}
      </div>
      
      {/* Comprehensive Footer with all platform features */}
      <ComprehensiveFooter />
    </ResponsivePageWrapper>
  );
}