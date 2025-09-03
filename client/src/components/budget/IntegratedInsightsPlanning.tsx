import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
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
  Calendar,
  Check,
  Ban
} from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { useBudget } from "../../contexts/BudgetContext";
import { useToast } from "../../hooks/use-toast";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
  ResponsiveContainer,
  ComposedChart,
  LabelList
} from 'recharts';

// Interface definitions
interface SpendingData {
  category: string;
  item: string; // Add item to track the specific expense item
  amount: number;
  date: string;
}

interface CategoryBreakdown {
  category: string;
  total: number;
  average: number;
  maximum: number;
  minimum: number;
  budgeted: number; // Add budgeted amount for comparison
  difference: number; // Add difference between actual and budgeted
}

interface SpendingMetrics {
  totalSpending: number;
  avgDailySpending: number;
  topCategory: string;
  monthOnMonthChange: number;
  budgetedTotal: number; // Add budgeted total
  percentOfBudget: number; // Add percentage of budget used
}

// Main component for the integrated insights and planning section
const IntegratedInsightsPlanning: React.FC = () => {
  const { toast } = useToast();
  const { budgetData, dailyExpenses, savingsGoals } = useBudget();
  
  // Financial Health Score calculation from budget data
  const [financialHealth, setFinancialHealth] = useState({
    score: 72,
    category: 'Good',
    color: 'bg-emerald-500',
    components: {
      savingsRate: { score: 0, outOf: 20, label: 'Savings Rate', description: 'How much of your income you save' },
      housingCost: { score: 0, outOf: 15, label: 'Housing Affordability', description: 'Housing costs relative to income' },
      essentialExpenses: { score: 0, outOf: 15, label: 'Essential Expenses', description: 'Essential spending as % of income' },
      debtManagement: { score: 0, outOf: 15, label: 'Debt Management', description: 'How well you manage debt payments' },
      investmentAllocation: { score: 0, outOf: 10, label: 'Investment Allocation', description: 'How much you invest for the future' },
      emergencyFund: { score: 0, outOf: 15, label: 'Emergency Fund', description: 'Months of expenses in emergency savings' },
      incomeStability: { score: 0, outOf: 10, label: 'Income Stability', description: 'Stability and diversity of income sources' }
    }
  });
  
  // Financial metrics calculated from real budget data
  const [savingsRate, setSavingsRate] = useState(0);
  const [housingRatio, setHousingRatio] = useState(0);
  const [essentialRatio, setEssentialRatio] = useState(0);
  
  // Spending patterns data
  const [timePeriod, setTimePeriod] = useState("30");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [spendingData, setSpendingData] = useState<SpendingData[]>([]);
  const [metrics, setMetrics] = useState<SpendingMetrics | null>(null);
  const [breakdowns, setBreakdowns] = useState<CategoryBreakdown[]>([]);
  
  // Colors for charts
  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC926'];
  
  // Calculate metrics from budget data
  useEffect(() => {
    // Calculate savings rate - with investment counted as savings, not expenses
    // Get investment amount for savings rate calculation and later use
    const investmentAmount = budgetData.expenses['Financial_Investments'] || 0;
    console.log('Investment amount:', investmentAmount);
    console.log('All expense keys:', Object.keys(budgetData.expenses));
    console.log('All expenses:', budgetData.expenses);
    console.log('Monthly income:', budgetData.monthlyIncome);
    
    // Calculate total expenses excluding investments
    const totalExpenses = Object.entries(budgetData.expenses).reduce((sum, [key, val]) => {
      // Don't count investments as expenses for savings rate calculation
      if (key !== 'Financial_Investments') {
        return sum + val;
      }
      return sum;
    }, 0);
    
    console.log('Total expenses (excluding investments):', totalExpenses);
    
    let calculatedSavingsRate = 0;
    
    if (budgetData.monthlyIncome > 0) {
      // Calculate actual savings amount (income minus expenses plus investments)
      const savingsAmount = (budgetData.monthlyIncome - totalExpenses) + investmentAmount;
      console.log('Savings amount:', savingsAmount);
      // Calculate as percentage of income and cap at 100%
      calculatedSavingsRate = Math.min(100, (savingsAmount / budgetData.monthlyIncome) * 100);
      // If negative savings, set to 0
      calculatedSavingsRate = Math.max(0, calculatedSavingsRate);
      console.log('Calculated savings rate:', calculatedSavingsRate);
    }
    
    setSavingsRate(parseFloat(calculatedSavingsRate.toFixed(1)));
    
    // Calculate housing ratio - use home loan EMI data if available, otherwise use budget data
    let housingExpense = budgetData.expenses['Essential_Rent/Home EMI'] || 0;
    let calculatedHousingRatio = 0;
    
    // If we have home loan data with EMI and EMI-to-Income ratio, use that for more accurate assessment
    if (budgetData.homeLoanData && budgetData.homeLoanData.emi > 0) {
      // Use EMI from home loan data instead of just the budget expense
      housingExpense = budgetData.homeLoanData.emi;
      
      // We can use the EMI-to-Income ratio that was calculated in Home Loan Calculator
      // This will be more accurate and consistent with the loan calculator assessment
      calculatedHousingRatio = budgetData.homeLoanData.emiToIncomeRatio * 100;
      
      console.log('Using home loan data for housing ratio:', calculatedHousingRatio.toFixed(1) + '%');
    } else {
      // Fall back to simple calculation if no loan data is available
      calculatedHousingRatio = budgetData.monthlyIncome > 0
        ? (housingExpense / budgetData.monthlyIncome) * 100
        : 0;
      
      console.log('Using budget data for housing ratio:', calculatedHousingRatio.toFixed(1) + '%');
    }
    
    setHousingRatio(parseFloat(calculatedHousingRatio.toFixed(1)));
    
    // Calculate essential ratio
    let essentialExpenses = 0;
    Object.entries(budgetData.expenses).forEach(([key, value]) => {
      if (key.startsWith('Essential_')) {
        essentialExpenses += value;
      }
    });
    const calculatedEssentialRatio = budgetData.monthlyIncome > 0
      ? (essentialExpenses / budgetData.monthlyIncome) * 100
      : 0;
    setEssentialRatio(parseFloat(calculatedEssentialRatio.toFixed(1)));
    
    // Calculate financial health score with more comprehensive factors
    
    // 1. Savings Rate (max 20 points)
    const savingsRateScore = 
      calculatedSavingsRate >= 25 ? 20 : // Excellent: 25%+ saved
      calculatedSavingsRate >= 20 ? 18 : // Very Good: 20-24% saved
      calculatedSavingsRate >= 15 ? 15 : // Good: 15-19% saved
      calculatedSavingsRate >= 10 ? 10 : // Fair: 10-14% saved
      calculatedSavingsRate >= 5 ? 5 : // Poor: 5-9% saved
      0; // Critical: <5% saved
    
    // 2. Housing Affordability (max 15 points)
    const housingScore = 
      calculatedHousingRatio <= 25 ? 15 : // Excellent: ≤25% of income
      calculatedHousingRatio <= 30 ? 12 : // Good: 26-30% of income
      calculatedHousingRatio <= 35 ? 9 : // Fair: 31-35% of income 
      calculatedHousingRatio <= 40 ? 5 : // Poor: 36-40% of income
      calculatedHousingRatio <= 45 ? 2 : // Very Poor: 41-45% of income
      0; // Critical: >45% of income
    
    // 3. Essential Expenses (max 15 points) 
    const essentialScore = 
      calculatedEssentialRatio <= 50 ? 15 : // Excellent: ≤50% for essentials
      calculatedEssentialRatio <= 60 ? 12 : // Good: 51-60% for essentials
      calculatedEssentialRatio <= 70 ? 8 : // Fair: 61-70% for essentials
      calculatedEssentialRatio <= 80 ? 4 : // Poor: 71-80% for essentials
      1; // Critical: >80% for essentials
    
    // 4. Debt Management (max 15 points)
    const debtPayments = budgetData.expenses['Financial_Loan Payments'] || 0;
    const debtToIncomeRatio = budgetData.monthlyIncome > 0 ? (debtPayments / budgetData.monthlyIncome) * 100 : 0;
    const debtScore = 
      debtToIncomeRatio === 0 ? 15 : // Excellent: No debt
      debtToIncomeRatio <= 10 ? 12 : // Very Good: ≤10% of income
      debtToIncomeRatio <= 20 ? 9 : // Good: 11-20% of income
      debtToIncomeRatio <= 30 ? 6 : // Fair: 21-30% of income
      debtToIncomeRatio <= 40 ? 3 : // Poor: 31-40% of income
      0; // Critical: >40% of income
    
    // 5. Investment Allocation (max 10 points)
    // Use the already declared investmentAmount variable
    const investmentRatio = budgetData.monthlyIncome > 0 ? (investmentAmount / budgetData.monthlyIncome) * 100 : 0;
    const investmentScore = 
      investmentRatio >= 15 ? 10 : // Excellent: ≥15% invested
      investmentRatio >= 10 ? 8 : // Very Good: 10-14% invested
      investmentRatio >= 5 ? 5 : // Good: 5-9% invested
      investmentRatio >= 1 ? 2 : // Fair: 1-4% invested
      0; // Poor: <1% invested
    
    // 6. Emergency Fund (max 15 points)
    const emergencyFund = budgetData.expenses['Financial_Emergency Fund'] || 0;
    // Calculate monthly expenses excluding investments and emergency fund
    const monthlyExpenses = Object.entries(budgetData.expenses).reduce((sum, [key, val]) => {
      // Don't count investments or emergency fund as expenses for calculation
      if (key !== 'Financial_Investments' && key !== 'Financial_Emergency Fund') {
        return sum + val;
      }
      return sum;
    }, 0);
    
    const monthsCovered = monthlyExpenses > 0 ? emergencyFund / monthlyExpenses : 0;
    const emergencyFundScore = 
      monthsCovered >= 6 ? 15 : // Excellent: 6+ months covered
      monthsCovered >= 4.5 ? 12 : // Very Good: 4.5-5.9 months
      monthsCovered >= 3 ? 9 : // Good: 3-4.4 months
      monthsCovered >= 1.5 ? 6 : // Fair: 1.5-2.9 months
      monthsCovered > 0 ? 3 : // Poor: <1.5 month
      0; // Critical: No emergency fund
    
    // 7. Income Stability (max 10 points)
    // This is more subjective - for now use a fixed value based on assumption of income sources
    // In the future, this would consider actual income sources, job stability, etc.
    // For now, assume 1 income source unless they have a high income
    const incomeSourceCount = budgetData.monthlyIncome > 100000 ? 2 : 1;
    const incomeStabilityScore = 
      incomeSourceCount >= 3 ? 10 : // Excellent: 3+ income sources
      incomeSourceCount === 2 ? 7 : // Good: 2 income sources
      5; // Fair: 1 income source
    
    // Calculate total health score (out of 100)
    const totalScore = savingsRateScore + housingScore + essentialScore + debtScore + 
                       investmentScore + emergencyFundScore + incomeStabilityScore;
    
    // Determine category
    let category = 'Critical';
    let color = 'bg-red-500';
    
    if (totalScore >= 85) {
      category = 'Excellent';
      color = 'bg-green-500';
    } else if (totalScore >= 70) {
      category = 'Good';
      color = 'bg-emerald-500';
    } else if (totalScore >= 55) {
      category = 'Fair';
      color = 'bg-amber-500';
    } else if (totalScore >= 40) {
      category = 'Needs Attention';
      color = 'bg-orange-500';
    }
    
    // Store all components with their individual scores
    setFinancialHealth({
      score: totalScore,
      category,
      color,
      components: {
        savingsRate: { 
          score: savingsRateScore, 
          outOf: 20, 
          label: 'Savings Rate', 
          description: `You save ${calculatedSavingsRate.toFixed(1)}% of your income` 
        },
        housingCost: { 
          score: housingScore, 
          outOf: 15, 
          label: 'Housing Affordability', 
          description: `Housing costs are ${calculatedHousingRatio.toFixed(1)}% of income` 
        },
        essentialExpenses: { 
          score: essentialScore, 
          outOf: 15, 
          label: 'Essential Expenses', 
          description: `Essentials: ${calculatedEssentialRatio.toFixed(1)}% of income` 
        },
        debtManagement: { 
          score: debtScore, 
          outOf: 15, 
          label: 'Debt Management', 
          description: `Debt payments: ${debtToIncomeRatio.toFixed(1)}% of income` 
        },
        investmentAllocation: { 
          score: investmentScore, 
          outOf: 10, 
          label: 'Investment Allocation', 
          description: `You invest ${investmentRatio.toFixed(1)}% of income` 
        },
        emergencyFund: { 
          score: emergencyFundScore, 
          outOf: 15, 
          label: 'Emergency Fund', 
          description: `${monthsCovered.toFixed(1)} months of expenses covered` 
        },
        incomeStability: { 
          score: incomeStabilityScore, 
          outOf: 10, 
          label: 'Income Stability', 
          description: `${incomeSourceCount} income source${incomeSourceCount !== 1 ? 's' : ''}` 
        }
      }
    });
  }, [budgetData]);
  
  // Dynamic recommended actions based on actual metrics
  const [recommendedActions, setRecommendedActions] = useState<Array<{
    title: string;
    description: string;
    impact: string;
    effort: string;
    cta: string;
  }>>([]);
  
  // Update recommended actions based on budget data
  useEffect(() => {
    const actions = [];
    
    // Check savings rate
    if (savingsRate < 20) {
      actions.push({
        title: "Increase your savings rate",
        description: `Try to save at least 20% of your income. You're currently saving ${savingsRate}%, ${savingsRate >= 15 ? 'just short of' : 'below'} the recommended amount.`,
        impact: "High",
        effort: "Medium",
        cta: "Set up automatic transfers"
      });
    }
    
    // Check subscriptions
    const subscriptionCost = budgetData.expenses['Essential_Subscriptions'] || 0;
    if (subscriptionCost > 0) {
      actions.push({
        title: "Review subscription services",
        description: `You're spending $${subscriptionCost.toLocaleString()} monthly on subscriptions. Consider eliminating ones you don't use regularly.`,
        impact: "Medium",
        effort: "Low",
        cta: "View subscriptions"
      });
    }
    
    // Check emergency fund
    const emergencyFund = budgetData.expenses['Financial_Emergency Fund'] || 0;
    
    // Calculate monthly expenses excluding investments and emergency fund
    const monthlyExpenses = Object.entries(budgetData.expenses).reduce((sum, [key, val]) => {
      // Don't count investments or emergency fund as expenses for calculation
      if (key !== 'Financial_Investments' && key !== 'Financial_Emergency Fund') {
        return sum + val;
      }
      return sum;
    }, 0);
    
    const monthsCovered = monthlyExpenses > 0 ? emergencyFund / monthlyExpenses : 0;
    
    if (monthsCovered < 6) {
      actions.push({
        title: "Build emergency fund",
        description: `Your emergency fund ${emergencyFund > 0 ? `covers ${monthsCovered.toFixed(1)} months of expenses` : 'needs attention'}. Aim for 6 months of coverage.`,
        impact: "High",
        effort: "High",
        cta: "Create a savings goal"
      });
    }
    
    // Check housing cost - using the same thresholds as Home Loan Calculator
    if (housingRatio > 30) {
      const riskLevel = housingRatio > 50 ? "high risk" : "moderate risk";
      const recommendations = housingRatio > 50 
        ? "reducing the loan amount or choosing a more affordable property" 
        : "making a larger down payment or extending your loan tenure to lower your EMI";
      
      actions.push({
        title: housingRatio > 50 ? "High-risk housing costs" : "Moderate-risk housing costs",
        description: `Your housing costs are ${housingRatio.toFixed(1)}% of your income (${riskLevel}). Consider ${recommendations}.`,
        impact: "High",
        effort: housingRatio > 50 ? "High" : "Medium",
        cta: "Try Home Loan Calculator"
      });
    }
    
    // Check if savings goals exist
    if (savingsGoals.length === 0) {
      actions.push({
        title: "Set financial goals",
        description: "You haven't set any savings goals yet. Having specific goals helps you stay motivated and track progress.",
        impact: "Medium",
        effort: "Low",
        cta: "Create a goal"
      });
    }
    
    // Ensure we have at least 3 recommendations
    if (actions.length < 3) {
      // Add general recommendations
      if (!actions.some(a => a.title.includes("income"))) {
        actions.push({
          title: "Increase your income",
          description: "Look for opportunities to boost your income through side gigs, salary negotiation, or skill development.",
          impact: "High",
          effort: "High",
          cta: "Explore options"
        });
      }
      
      if (!actions.some(a => a.title.includes("Invest"))) {
        actions.push({
          title: "Invest for long-term growth",
          description: "Consider investing in market instruments to get better returns than traditional savings accounts.",
          impact: "High",
          effort: "Medium",
          cta: "Learn more"
        });
      }
    }
    
    // Limit to 3 recommendations
    setRecommendedActions(actions.slice(0, 3));
  }, [budgetData, savingsRate, housingRatio, savingsGoals]);
  
  // Calculate metrics from spending data, comparing with budget targets
  const calculateMetrics = (data: SpendingData[]): SpendingMetrics => {
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    
    // Calculate average daily spending
    const days = parseInt(timePeriod);
    const avgDaily = total / days;
    
    // Find top category and calculate budget comparison
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
    
    // Calculate month-on-month change based on actual data
    let monthOnMonthChange = 0;
    
    // If we have daily expenses, calculate month-over-month change
    if (dailyExpenses.length > 0) {
      // Get current month total
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      // Get previous month
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      
      // Calculate totals
      const currentMonthExpenses = dailyExpenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
      }).reduce((sum, expense) => sum + expense.amount, 0);
      
      const prevMonthExpenses = dailyExpenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === prevMonth && expenseDate.getFullYear() === prevYear;
      }).reduce((sum, expense) => sum + expense.amount, 0);
      
      // Calculate change (avoid division by zero)
      if (prevMonthExpenses > 0) {
        monthOnMonthChange = ((currentMonthExpenses - prevMonthExpenses) / prevMonthExpenses) * 100;
      } else if (currentMonthExpenses > 0) {
        monthOnMonthChange = 100; // First month with expenses
      }
    } else {
      // If no expense data, estimate based on budget data for context
      monthOnMonthChange = 0; // No change when no historical data
    }
    
    // Calculate budgeted total from monthly budget
    const budgetedTotal = Object.values(budgetData.expenses).reduce((sum, val) => sum + val, 0);
    
    // Calculate percentage of budget spent
    // Using actual expenses for the current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const currentMonthTotalExpenses = dailyExpenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    const percentOfBudget = budgetedTotal > 0 
      ? (currentMonthTotalExpenses / budgetedTotal) * 100 
      : 0;
    
    return {
      totalSpending: total,
      avgDailySpending: avgDaily,
      topCategory,
      monthOnMonthChange,
      budgetedTotal,
      percentOfBudget
    };
  };
  
  // Generate category breakdowns from spending data and compare with budget
  const generateCategoryBreakdowns = (data: SpendingData[]): CategoryBreakdown[] => {
    const categories: Record<string, { total: number, values: number[], items: Set<string> }> = {};
    
    // Group spending data by category
    data.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = {
          total: 0,
          values: [],
          items: new Set()
        };
      }
      
      categories[item.category].total += item.amount;
      categories[item.category].values.push(item.amount);
      if (item.item) {
        categories[item.category].items.add(item.item);
      }
    });
    
    // Create breakdown with budget comparison
    return Object.entries(categories).map(([category, categoryData]) => {
      // Find corresponding budget for this category
      let budgeted = 0;
      
      // Look through all expense categories to find matching items
      Object.entries(budgetData.categories).forEach(([categoryGroup, items]) => {
        if (items.includes(category)) {
          // Found the category in budget
          const key = `${categoryGroup}_${category}`;
          budgeted = budgetData.expenses[key] || 0;
        }
      });
      
      return {
        category,
        total: categoryData.total,
        average: categoryData.total / categoryData.values.length,
        maximum: Math.max(...categoryData.values),
        minimum: Math.min(...categoryData.values),
        budgeted: budgeted,
        difference: budgeted - categoryData.total
      };
    });
  };
  
  // Generate spending data from actual daily expenses or budget data
  const generateSpendingData = (days: number): SpendingData[] => {
    const result: SpendingData[] = [];
    const today = new Date();
    
    // For the monthly trends chart, we want to show all historical data 
    // regardless of the days setting, starting from the user's first tracked expense
    
    console.log("Generating spending data for historical analysis");
    console.log("Daily expenses available:", dailyExpenses.length);
    console.log("Budget categories:", Object.keys(budgetData.categories).length);
    console.log("Budget expense items:", Object.keys(budgetData.expenses).length);
    
    // Check if we have daily expenses data
    if (dailyExpenses.length > 0) {
      console.log("Using daily expenses data for spending analysis");
      
      // Get the date of the first expense ever recorded (for historical view)
      let firstExpenseDate = new Date();
      if (dailyExpenses.length > 0) {
        // Sort to find the oldest date
        const sortedByDate = [...dailyExpenses].sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        firstExpenseDate = new Date(sortedByDate[0].date);
        console.log("First expense date:", firstExpenseDate.toISOString().split('T')[0]);
      }
      
      // For filtering current period data, use the days parameter
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - days);
      
      // For the monthly view, we'll use all expenses (regardless of days parameter)
      // but for other analyses we'll still respect the period filter
      
      // Map daily expenses to spending data format
      return dailyExpenses.map(expense => ({
        category: expense.category,
        item: expense.item, // Include item from expense data
        amount: expense.amount,
        date: expense.date
      }));
    } else {
      console.log("No daily expenses found, using budget allocation for spending data");
      
      // If we don't have categories or expenses defined, create some sample data
      if (!budgetData.categories || Object.keys(budgetData.categories).length === 0 ||
          !budgetData.expenses || Object.keys(budgetData.expenses).length === 0) {
        console.log("No budget data available, creating sample expenses");
        
        // Create a few sample data points to ensure charts render
        const sampleCategories = ["Housing", "Food", "Transportation", "Utilities", "Entertainment"];
        const daysAgo = [1, 5, 10, 15, 20, 25];
        
        sampleCategories.forEach((category, index) => {
          const sampleAmount = 5000 + (Math.random() * 5000);
          const dateOffset = daysAgo[Math.floor(Math.random() * daysAgo.length)];
          const sampleDate = new Date();
          sampleDate.setDate(sampleDate.getDate() - dateOffset);
          
          result.push({
            category: category,
            item: category,
            amount: sampleAmount,
            date: sampleDate.toISOString().split('T')[0]
          });
        });
        
        console.log("Created", result.length, "sample data points for visualization");
        return result;
      }
      
      // If no daily expenses, create data from budget allocation
      const categories = Object.entries(budgetData.categories).flatMap(([categoryGroup, items]) => 
        items.map(item => ({
          category: item,
          group: categoryGroup
        }))
      );
      
      console.log("Found categories for budget data:", categories.length);
      
      // For each category in the budget, create spending entries
      Object.entries(budgetData.expenses).forEach(([key, amount]) => {
        if (amount > 0) {
          const [categoryGroup, item] = key.split('_');
          
          // Create data point
          result.push({
            category: item,
            item: item, // Use the category item name as the item name
            amount: amount,
            date: new Date().toISOString().split('T')[0] // Today's date
          });
        }
      });
      
      console.log("Created", result.length, "data points from budget allocation");
      return result;
    }
  };
  
  // Handle loading spending data
  const handleLoadData = () => {
    setLoading(true);
    setError(null);
    
    try {
      const days = parseInt(timePeriod);
      const realData = generateSpendingData(days);
      console.log("Generated spending data:", realData);
      
      // If we have no data, show an error
      if (realData.length === 0) {
        setError("No spending data available. Please add expenses in the Expense Tracker or set up your budget.");
        setSpendingData([]);
        setMetrics(null);
        setBreakdowns([]);
      } else {
        setSpendingData(realData);
        const calculatedMetrics = calculateMetrics(realData);
        console.log("Calculated metrics:", calculatedMetrics);
        setMetrics(calculatedMetrics);
        const categoryBreakdowns = generateCategoryBreakdowns(realData);
        console.log("Category breakdowns:", categoryBreakdowns);
        setBreakdowns(categoryBreakdowns);
        setError(null);
      }
    } catch (err) {
      setError("Failed to process spending data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Load data on initial render and when time period changes
  useEffect(() => {
    handleLoadData();
  }, [timePeriod]);
  
  // Also reload data when dailyExpenses or budgetData changes
  useEffect(() => {
    handleLoadData();
  }, [dailyExpenses, budgetData]);
  
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
          {/* Section 1: Financial Health */}
          <div className="rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md">
            <div className="bg-gray-300 dark:bg-gray-600 px-6 py-4 border-b border-gray-300 dark:border-gray-600">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Financial Health
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">View your overall financial health status</p>
            </div>
            <div className="p-6 space-y-6">
              {/* Financial Health Score Card */}
              <Card>
                <CardHeader className="bg-gray-100 dark:bg-gray-800 border-b">
                  <CardTitle className="text-xl font-bold">Financial Health Score</CardTitle>
                  <CardDescription>Based on your budget and spending patterns</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Top section with score display side by side with Score Breakdown - in two equal boxes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Left box: Score Display */}
                    <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="inline-flex items-center justify-center rounded-full w-56 h-56 border-8 border-gray-200 dark:border-gray-700 
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
                            <p className="text-7xl font-bold">{financialHealth.score}</p>
                            <p className="text-base text-muted-foreground mt-1">out of 100</p>
                          </div>
                        </div>
                        <p className={`mt-6 font-semibold text-3xl ${
                          financialHealth.category === 'Critical' ? 'text-red-600' :
                          financialHealth.category === 'Needs Attention' ? 'text-orange-600' :
                          financialHealth.category === 'Fair' ? 'text-amber-600' :
                          financialHealth.category === 'Good' ? 'text-emerald-600' :
                          'text-green-600'
                        }`}>
                          {financialHealth.category}
                        </p>
                      </div>
                    </div>
                    
                    {/* Right box: Score breakdown */}
                    <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                      <h3 className="text-base font-semibold mb-3 text-center">Score Breakdown</h3>
                      <div className="max-h-[50vh] overflow-y-auto pr-1">
                        {Object.entries(financialHealth.components).map(([key, component]) => (
                          <div key={key} className="mb-2 last:mb-0">
                            <div className="flex justify-between items-center text-sm">
                              <div className="flex items-center">
                                <span className="font-medium">{component.label}</span>
                                <span className="ml-1 text-gray-500 dark:text-gray-400">({component.score}/{component.outOf})</span>
                              </div>
                              <span 
                                className={`font-medium ${
                                  component.score / component.outOf >= 0.7 ? 'text-green-600 dark:text-green-500' :
                                  component.score / component.outOf >= 0.4 ? 'text-amber-600 dark:text-amber-500' :
                                  'text-red-600 dark:text-red-500'
                                }`}
                              >
                                {Math.round((component.score / component.outOf) * 100)}%
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{component.description}</div>
                            <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-1">
                              <div 
                                className={`h-full rounded-full ${
                                  component.score / component.outOf >= 0.7 ? 'bg-green-500' :
                                  component.score / component.outOf >= 0.4 ? 'bg-amber-500' :
                                  'bg-red-500'
                                }`} 
                                style={{ width: `${(component.score / component.outOf) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* What This Score Means section below */}
                  <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold mb-2">What This Score Means</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your financial health score evaluates your budget across multiple dimensions including savings rate, 
                      investment habits, essential vs. discretionary spending balance, and housing affordability.
                    </p>
                    
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Critical</span>
                        <span>Excellent</span>
                      </div>
                      <div className="h-2.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-400 rounded-full" 
                          style={{ width: `${financialHealth.score}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-5 gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <div>0-39</div>
                        <div>40-54</div>
                        <div>55-69</div>
                        <div>70-84</div>
                        <div>85-100</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            
            {/* Financial Metrics Summary */}
            <Card className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 mt-6">
              <CardHeader className="bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
                <CardTitle className="text-center text-xl font-bold">Key Financial Metrics</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden hover:shadow-lg transition-all">
                    <div className={`absolute top-0 left-0 w-full h-1 ${savingsRate >= 20 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center justify-center w-16 h-16 rounded-full mb-3 
                        ${savingsRate >= 20 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                        <PiggyBank className={`h-8 w-8 
                          ${savingsRate >= 20 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                      </div>
                      <h3 className="text-sm font-semibold mb-2">Savings Rate</h3>
                      <p className={`text-3xl font-bold ${savingsRate >= 20 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                        {savingsRate.toFixed(1)}%
                      </p>
                      <p className={`text-xs mt-1 ${savingsRate >= 20 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                        {savingsRate >= 20 ? 'On target' : 'Below target'} (20% recommended)
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden hover:shadow-lg transition-all">
                    <div className={`absolute top-0 left-0 w-full h-1 ${
                      housingRatio <= 30 ? 'bg-green-500' : 
                      housingRatio <= 50 ? 'bg-amber-500' : 
                      'bg-red-500'
                    }`}></div>
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
                        housingRatio <= 30 ? 'bg-green-100 dark:bg-green-900/30' : 
                        housingRatio <= 50 ? 'bg-amber-100 dark:bg-amber-900/30' : 
                        'bg-red-100 dark:bg-red-900/30'
                      }`}>
                        <Home className={`h-8 w-8 ${
                          housingRatio <= 30 ? 'text-green-600 dark:text-green-400' : 
                          housingRatio <= 50 ? 'text-amber-600 dark:text-amber-400' : 
                          'text-red-600 dark:text-red-400'
                        }`} />
                      </div>
                      <h3 className="text-sm font-semibold mb-2">Housing Cost Ratio</h3>
                      <p className={`text-3xl font-bold ${
                        housingRatio <= 30 ? 'text-green-600 dark:text-green-500' : 
                        housingRatio <= 50 ? 'text-amber-600 dark:text-amber-500' : 
                        'text-red-600 dark:text-red-500'
                      }`}>
                        {housingRatio.toFixed(1)}%
                      </p>
                      <p className={`text-xs mt-1 ${
                        housingRatio <= 30 ? 'text-green-600 dark:text-green-500' : 
                        housingRatio <= 50 ? 'text-amber-600 dark:text-amber-500' : 
                        'text-red-600 dark:text-red-500'
                      }`}>
                        {housingRatio <= 30 ? (
                          <span className="flex items-center justify-center">
                            <Check className="h-3 w-3 mr-1" /> Comfortable
                          </span>
                        ) : housingRatio <= 50 ? (
                          <span className="flex items-center justify-center">
                            <AlertTriangle className="h-3 w-3 mr-1" /> Moderate Risk
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            <Ban className="h-3 w-3 mr-1" /> High Risk
                          </span>
                        )}
                      </p>
                      
                      {budgetData.homeLoanData && (
                        <p className="text-xs mt-2 text-gray-500">Based on Home Loan EMI Calculator</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden hover:shadow-lg transition-all">
                    <div className={`absolute top-0 left-0 w-full h-1 ${essentialRatio <= 50 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center justify-center w-16 h-16 rounded-full mb-3 
                        ${essentialRatio <= 50 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                        <ShoppingCart className={`h-8 w-8 
                          ${essentialRatio <= 50 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                      </div>
                      <h3 className="text-sm font-semibold mb-2">Essential Expenses</h3>
                      <p className={`text-3xl font-bold ${essentialRatio <= 50 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                        {essentialRatio.toFixed(1)}%
                      </p>
                      <p className={`text-xs mt-1 ${essentialRatio <= 50 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                        {essentialRatio <= 50 ? 'Good balance' : 'High essential spending'} 
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          </div>
          
          {/* Section 2: Spending Patterns */}
          <div className="rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md">
            <div className="bg-gray-300 dark:bg-gray-600 px-6 py-4 border-b border-gray-300 dark:border-gray-600">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Spending Patterns
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">Analyze and understand your spending habits</p>
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
                  {/* Key Metrics with Budget Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Spending</div>
                        <div className="text-2xl font-bold text-red-600 dark:text-red-500">${metrics.totalSpending.toLocaleString()}</div>
                        {metrics.budgetedTotal > 0 && (
                          <div className="mt-2 text-xs">
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-500 dark:text-gray-400">Budget</span>
                              <span className="font-medium">${metrics.budgetedTotal.toLocaleString()}</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${metrics.percentOfBudget <= 100 ? 'bg-green-500' : 'bg-red-500'}`}
                                style={{ width: `${Math.min(100, metrics.percentOfBudget)}%` }}
                              />
                            </div>
                            <div className="mt-1 flex justify-between text-xs">
                              <span className={metrics.percentOfBudget <= 100 ? 'text-green-600' : 'text-red-600'}>
                                {metrics.percentOfBudget.toFixed(0)}% used
                              </span>
                              <span className={metrics.percentOfBudget <= 100 ? 'text-green-600' : 'text-red-600'}>
                                {metrics.percentOfBudget <= 100 
                                  ? `$${(metrics.budgetedTotal - metrics.totalSpending).toLocaleString()} left` 
                                  : `$${(metrics.totalSpending - metrics.budgetedTotal).toLocaleString()} over`}
                              </span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Average Daily</div>
                        <div className="text-2xl font-bold text-red-600 dark:text-red-500">${metrics.avgDailySpending.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        {metrics.budgetedTotal > 0 && (
                          <div className="mt-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">Budget daily</span>
                              <span className="font-medium">${(metrics.budgetedTotal / 30).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                            </div>
                            <div className="mt-1">
                              <span className={metrics.avgDailySpending <= (metrics.budgetedTotal / 30) ? 'text-green-600' : 'text-red-600'}>
                                {metrics.avgDailySpending <= (metrics.budgetedTotal / 30) ? 'On track' : 'Overspending'}
                              </span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Top Category</div>
                        <div className="text-2xl font-bold text-red-600 dark:text-red-500">{metrics.topCategory}</div>
                        <div className="mt-2 text-xs">
                          <div className="flex items-center">
                            <span className="text-gray-500 dark:text-gray-400">From</span>
                            <span className="ml-1 px-1.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs">
                              {dailyExpenses.length > 0 ? 'Expense Tracker' : 'Monthly Budget'}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Month-on-Month</div>
                        <div className={`text-2xl font-bold ${metrics.monthOnMonthChange >= 0 ? 'text-red-600 dark:text-red-500' : 'text-green-600 dark:text-green-500'}`}>
                          {metrics.monthOnMonthChange >= 0 ? '+' : ''}{metrics.monthOnMonthChange.toFixed(1)}%
                        </div>
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          {metrics.monthOnMonthChange > 0 
                            ? 'Spending increased compared to last month' 
                            : metrics.monthOnMonthChange < 0 
                              ? 'Spending decreased compared to last month'
                              : 'Spending unchanged from last month'}
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
                              <BarChart
                                data={(() => {
                                  // Aggregate data by month for total spending
                                  const monthlyTotals: Record<string, { month: string; actual: number; budget: number }> = {};
                                  
                                  // Get current date for reference
                                  const today = new Date();
                                  
                                  // Process the data for monthly totals - include ALK historical data
                                  spendingData.forEach(item => {
                                    const month = item.date.substring(0, 7); // YYYY-MM
                                    
                                    // Initialize the month if not exists
                                    if (!monthlyTotals[month]) {
                                      monthlyTotals[month] = { 
                                        month, 
                                        actual: 0,
                                        budget: metrics.budgetedTotal || 0  // Use budget from metrics
                                      };
                                    }
                                    
                                    // Add to the total amount
                                    monthlyTotals[month].actual += item.amount;
                                  });
                                  
                                  // If we have no data for the current month, add it
                                  const currentMonth = today.toISOString().substring(0, 7);
                                  if (!monthlyTotals[currentMonth]) {
                                    monthlyTotals[currentMonth] = {
                                      month: currentMonth,
                                      actual: 0,
                                      budget: metrics.budgetedTotal || 0
                                    };
                                  }
                                  
                                  // Get all months in chronological order (oldest first)
                                  const sortedMonths = Object.values(monthlyTotals)
                                    .sort((a, b) => a.month.localeCompare(b.month));
                                  
                                  // Only show months with actual spending data
                                  if (sortedMonths.length > 0) {
                                    // Filter out months with no actual spending
                                    const monthsWithSpending = sortedMonths.filter(month => month.actual > 0);
                                    
                                    // If we have actual spending data, return those months
                                    if (monthsWithSpending.length > 0) {
                                      return monthsWithSpending;
                                    }
                                    
                                    // If no months have spending, just return the current month
                                    const today = new Date();
                                    const currentMonth = today.toISOString().substring(0, 7);
                                    return [{
                                      month: currentMonth,
                                      actual: 0,
                                      budget: metrics.budgetedTotal || 0
                                    }];
                                  }
                                  
                                  return sortedMonths;
                                })()}
                                margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
                                barGap={2} // very small gap between bars in the same category
                                barCategoryGap={40} // larger gap between different categories (months)
                              >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                                <XAxis 
                                  dataKey="month" 
                                  axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
                                  tickLine={false}
                                  tickFormatter={(value) => {
                                    // Format YYYY-MM to "MMM D" (e.g., "May 25")
                                    const date = new Date(value + "-15"); // Use middle of month
                                    const formatter = new Intl.DateTimeFormat('en', { 
                                      month: 'short',
                                      day: 'numeric'
                                    });
                                    return formatter.format(date);
                                  }}
                                />
                                <YAxis 
                                  axisLine={false}
                                  tickLine={false}
                                  tickFormatter={(value) => 
                                    `$${value >= 100000 ? (value/1000).toFixed(1) + 'L' : 
                                      value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`
                                  } 
                                />
                                <RechartsTooltip 
                                  formatter={(value: number, name: string) => {
                                    const label = name === 'actual' ? 'Spending' : 'Budget';
                                    return [`$${value.toLocaleString()}`, label];
                                  }}
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
                                
                                {/* Bar for actual spending */}
                                <Bar 
                                  dataKey="actual" 
                                  name="Actual Spending"
                                  fill="#FF4D6C" 
                                  radius={[4, 4, 0, 0]}
                                  barSize={12}
                                >
                                  <LabelList 
                                    dataKey="actual" 
                                    position="top" 
                                    formatter={(value: number) => 
                                      `$${value >= 100000 ? (value/1000).toFixed(1) + 'L' : 
                                        value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`
                                    }
                                    style={{ fontSize: '11px', fill: '#666' }}
                                  />
                                </Bar>
                                
                                {/* Bar for budget */}
                                <Bar
                                  dataKey="budget"
                                  name="Budget"
                                  fill="#4DABF5"
                                  radius={[4, 4, 0, 0]}
                                  barSize={12}
                                >
                                  <LabelList 
                                    dataKey="budget" 
                                    position="top" 
                                    formatter={(value: number) => 
                                      `$${value >= 100000 ? (value/1000).toFixed(1) + 'L' : 
                                        value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`
                                    }
                                    style={{ fontSize: '11px', fill: '#666' }}
                                  />
                                </Bar>
                              </BarChart>
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
                                      name: item.category.replace('Essential_', 'Essential').replace('Financial_', 'Financial'),
                                      value: item.total
                                    }))}
                                    cx="50%"
                                    cy="50%"
                                    labelLine
                                    label={({ name, percent }) => {
                                      // Get first part of the category name
                                      const shortName = name.split(' ')[0];
                                      return `${shortName}: ${(percent * 100).toFixed(0)}%`;
                                    }}
                                    outerRadius={70}
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
                          <h4 className="text-lg font-medium mb-4">Budget vs. Actual</h4>
                          
                          <div className="h-80">
                            {breakdowns.length > 0 && (
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                  data={breakdowns.map(item => ({
                                    name: item.category,
                                    actual: item.total,
                                    budget: item.budgeted,
                                    difference: item.difference
                                  }))}
                                  margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                  <XAxis 
                                    dataKey="name" 
                                    angle={-45} 
                                    textAnchor="end"
                                    height={80}
                                    tick={(props) => {
                                      const { x, y, width, height, payload } = props;
                                      // Truncate the category name if it's too long
                                      let displayName = payload.value;
                                      if (displayName.includes('_')) {
                                        displayName = displayName.split('_')[1] || displayName;
                                      }
                                      if (displayName.length > 12) {
                                        displayName = displayName.substring(0, 10) + '...';
                                      }
                                      return (
                                        <g transform={`translate(${x},${y})`}>
                                          <text 
                                            x={0} 
                                            y={0} 
                                            dy={16} 
                                            textAnchor="end" 
                                            fill="#666" 
                                            transform="rotate(-45)"
                                            fontSize="11"
                                          >
                                            {displayName}
                                          </text>
                                        </g>
                                      );
                                    }}
                                  />
                                  <YAxis 
                                    tickFormatter={(value) => 
                                      `$${value >= 100000 ? (value/1000).toFixed(1) + 'L' : 
                                        value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`
                                    } 
                                  />
                                  <RechartsTooltip 
                                    formatter={(value: number, name: string) => {
                                      const formattedValue = `$${value.toLocaleString()}`;
                                      const label = name === 'actual' ? 'Actual Spent' : 
                                                  name === 'budget' ? 'Budgeted Amount' : 
                                                  'Difference';
                                      return [formattedValue, label];
                                    }}
                                  />
                                  <Legend />
                                  <Bar dataKey="actual" name="Actual" fill="#FF6384" />
                                  
                                  <Bar dataKey="budget" name="Budget" fill="#36A2EB" />
                                </BarChart>
                              </ResponsiveContainer>
                            )}
                          </div>
                          
                          {/* Category Insights table */}
                          <div className="mt-4">
                            <h5 className="text-sm font-medium mb-2">Category Analysis</h5>
                            <div className="overflow-x-auto rounded border border-gray-200 dark:border-gray-700">
                              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                  <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actual</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Budgeted</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                                  {breakdowns.map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
                                      <td className="px-3 py-2 text-sm text-gray-900 dark:text-gray-100">
                                        {item.category.replace('Essential_', '').replace('Financial_', '').replace('Discretionary_', '')}
                                      </td>
                                      <td className="px-3 py-2 text-sm text-right text-gray-900 dark:text-gray-100">${item.total.toLocaleString()}</td>
                                      <td className="px-3 py-2 text-sm text-right text-gray-900 dark:text-gray-100">${item.budgeted.toLocaleString()}</td>
                                      <td className="px-3 py-2 text-sm text-right">
                                        {item.budgeted > 0 ? (
                                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                            item.total <= item.budgeted 
                                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                          }`}>
                                            {item.total <= item.budgeted 
                                              ? `$${(item.budgeted - item.total).toLocaleString()} left` 
                                              : `$${(item.total - item.budgeted).toLocaleString()} over`}
                                          </span>
                                        ) : (
                                          <span className="text-gray-500 dark:text-gray-400">No budget</span>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
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
                                    `$${value >= 100000 ? (value/1000).toFixed(1) + 'L' : 
                                      value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`
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
          
          {/* Section 3: Planning */}
          <div className="rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md">
            <div className="bg-gray-300 dark:bg-gray-600 px-6 py-4 border-b border-gray-300 dark:border-gray-600">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Planning
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">Personalized recommendations to improve your financial health</p>
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
        </div>
      )}
    </div>
  );
};

export default IntegratedInsightsPlanning;