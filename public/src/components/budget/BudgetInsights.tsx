import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useBudget } from "@/contexts/BudgetContext";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Home,
  Lightbulb, 
  PiggyBank,
  ShoppingCart,
  TrendingUp, 
  Award, 
  BarChart3 
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const BudgetInsights = () => {
  const { budgetData } = useBudget();
  const { toast } = useToast();
  const [insights, setInsights] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [strengths, setStrengths] = useState<any[]>([]);
  const [financialHealth, setFinancialHealth] = useState({
    score: 0,
    category: '',
    color: '',
  });
  
  // Calculate key metrics
  const totalExpenses = useMemo(() => {
    return Object.values(budgetData.expenses).reduce((sum, amount) => sum + amount, 0);
  }, [budgetData.expenses]);
  
  const income = budgetData.monthlyIncome;
  const savings = income - totalExpenses;
  const savingsRate = income > 0 ? (savings / income * 100) : 0;
  
  // Calculate expense ratios by category
  const expenseRatios = useMemo(() => {
    const result: Record<string, number> = {};
    
    Object.entries(budgetData.categories).forEach(([category, items]) => {
      const categoryTotal = items.reduce((sum, item) => {
        const key = `${category}_${item}`;
        return sum + (budgetData.expenses[key] || 0);
      }, 0);
      
      result[category] = income > 0 ? (categoryTotal / income * 100) : 0;
    });
    
    return result;
  }, [budgetData.categories, budgetData.expenses, income]);
  
  // Calculate housing costs (Rent/EMI + Utilities)
  const housingCost = useMemo(() => {
    const rent = budgetData.expenses['Essential_Rent/Home EMI'] || 0;
    const utilities = budgetData.expenses['Essential_Utilities'] || 0;
    return rent + utilities;
  }, [budgetData.expenses]);
  
  const housingRatio = income > 0 ? (housingCost / income * 100) : 0;
  
  // Essential vs. Discretionary spending
  const essentialSpending = useMemo(() => {
    return budgetData.categories.Essential.reduce((sum, item) => {
      const key = `Essential_${item}`;
      return sum + (budgetData.expenses[key] || 0);
    }, 0);
  }, [budgetData.categories.Essential, budgetData.expenses]);
  
  const essentialRatio = income > 0 ? (essentialSpending / income * 100) : 0;
  
  // Financial health assessment
  const getSavingsRateAssessment = () => {
    if (savingsRate < 20) {
      return {
        status: "error",
        title: "Low Savings Rate",
        description: "Your savings rate is below the recommended 20%",
        icon: <AlertCircle className="h-4 w-4" />,
        recommendations: [
          "Review non-essential expenses",
          "Look for areas to reduce spending",
          "Consider additional income sources"
        ]
      };
    } else if (savingsRate >= 20 && savingsRate < 30) {
      return {
        status: "default",
        title: "Good Savings Rate",
        description: "Your savings rate is good, but there's room for improvement",
        icon: <AlertTriangle className="h-4 w-4" />,
        recommendations: [
          "Look for small optimizations in your budget",
          "Consider increasing retirement contributions",
          "Build up your emergency fund"
        ]
      };
    } else {
      return {
        status: "default",
        title: "Excellent Savings Rate",
        description: "Keep up the good work! You're saving at an excellent rate",
        icon: <CheckCircle2 className="h-4 w-4" />,
        recommendations: [
          "Consider investing the surplus for long-term growth",
          "Review your investment allocation",
          "Set additional financial goals"
        ]
      };
    }
  };
  
  const savingsAssessment = getSavingsRateAssessment();
  
  // Calculate investment percentage
  const investments = budgetData.expenses['Financial_Investments'] || 0;
  const investmentRate = income > 0 ? (investments / income * 100) : 0;
  
  // Generate advanced insights
  useEffect(() => {
    if (income > 0 && totalExpenses > 0) {
      generateInsights();
    }
  }, [income, totalExpenses, savingsRate, housingRatio, essentialRatio, expenseRatios]);
  
  const generateInsights = () => {
    // Generate insights based on financial ratios
    const newInsights = [];
    const newSuggestions = [];
    const newStrengths = [];
    
    // Savings rate insight
    if (savingsRate < 0) {
      newInsights.push({
        title: "Negative Savings Rate",
        description: "Your expenses exceed your income. This is leading to debt or depleting savings.",
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        severity: "high",
      });
      newSuggestions.push({
        title: "Reduce Non-Essential Expenses",
        description: "Identify and cut back on lifestyle expenses to bring your budget back to positive.",
      });
    } else if (savingsRate < 20) {
      newInsights.push({
        title: "Savings Below Target",
        description: `Your current savings rate (${savingsRate.toFixed(1)}%) is below the recommended 20%.`,
        icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
        severity: "medium",
      });
      newSuggestions.push({
        title: "Optimize Your Budget",
        description: `Try to increase your savings by ₹${((20 - savingsRate) * income / 100).toFixed(0)} per month to reach the target.`,
      });
    } else {
      newStrengths.push({
        title: "Great Savings Rate",
        description: `Your savings rate of ${savingsRate.toFixed(1)}% meets or exceeds the 20% recommended target.`,
      });
    }

    // Housing expense insight
    if (housingRatio > 40) {
      newInsights.push({
        title: "High Housing Costs",
        description: `${housingRatio.toFixed(1)}% of your income goes to housing costs, which exceeds the recommended 35-40% limit.`,
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        severity: "high",
      });
      newSuggestions.push({
        title: "Reconsider Housing Expenses",
        description: "Look for ways to reduce housing costs through refinancing, finding a roommate, or potentially moving to a more affordable place.",
      });
    } else if (housingRatio <= 35) {
      newStrengths.push({
        title: "Affordable Housing",
        description: `Your housing costs at ${housingRatio.toFixed(1)}% of income are within the recommended limit, giving you more flexibility.`,
      });
    }

    // Investment insight
    if (investmentRate < 10) {
      newInsights.push({
        title: "Low Investment Rate",
        description: `You're only investing ${investmentRate.toFixed(1)}% of your income, which may impact long-term wealth growth.`,
        icon: <TrendingUp className="h-5 w-5 text-amber-500" />,
        severity: "medium",
      });
      newSuggestions.push({
        title: "Increase Investments",
        description: "Consider setting up automatic investments of at least 10-15% of your income for long-term growth.",
      });
    } else {
      newStrengths.push({
        title: "Good Investment Habits",
        description: `You're investing ${investmentRate.toFixed(1)}% of your income, which supports long-term wealth building.`,
      });
    }
    
    // Lifestyle spending insight
    if (expenseRatios.Lifestyle > 30) {
      newInsights.push({
        title: "High Lifestyle Spending",
        description: `${expenseRatios.Lifestyle.toFixed(1)}% of your income goes to lifestyle expenses, which may be impacting your savings.`,
        icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
        severity: "medium",
      });
      newSuggestions.push({
        title: "Review Discretionary Spending",
        description: "Look for ways to reduce entertainment, dining out, or subscription services to improve savings.",
      });
    } else if (savingsRate > 30 && expenseRatios.Lifestyle < 10) {
      newInsights.push({
        title: "Very Low Lifestyle Spending",
        description: "While you're saving well, your lifestyle spending is quite restricted. Consider balancing saving and enjoying life.",
        icon: <Lightbulb className="h-5 w-5 text-blue-500" />,
        severity: "low",
      });
    }

    // Calculate financial health score (0-100)
    let healthScore = 0;
    
    // Savings rate contributes 40 points max
    healthScore += Math.min(40, (savingsRate / 20) * 30);
    
    // Investment rate contributes 20 points max
    healthScore += Math.min(20, investmentRate * 2);
    
    // Essential vs lifestyle balance contributes 20 points max
    const balanceScore = essentialRatio <= 50 ? 10 : (60 - essentialRatio) / 10;
    const lifestyleScore = expenseRatios.Lifestyle <= 30 ? 10 : (40 - expenseRatios.Lifestyle) / 10;
    healthScore += Math.max(0, balanceScore + lifestyleScore);
    
    // Housing ratio contributes 20 points max
    healthScore += housingRatio <= 35 ? 20 : housingRatio <= 40 ? 15 : (50 - housingRatio) / 2;
    
    // Cap score between 0-100
    healthScore = Math.max(0, Math.min(100, healthScore));
    
    // Determine health category and color
    let category = '';
    let color = '';
    
    if (healthScore >= 80) {
      category = 'Excellent';
      color = 'bg-green-500';
    } else if (healthScore >= 65) {
      category = 'Good';
      color = 'bg-emerald-500';
    } else if (healthScore >= 50) {
      category = 'Fair';
      color = 'bg-amber-500';
    } else if (healthScore >= 35) {
      category = 'Needs Attention';
      color = 'bg-orange-500';
    } else {
      category = 'Critical';
      color = 'bg-red-500';
    }

    setFinancialHealth({
      score: Math.round(healthScore),
      category,
      color,
    });
    setInsights(newInsights);
    setSuggestions(newSuggestions);
    setStrengths(newStrengths);
  };
  
  // Budget tips
  const budgetTips = [
    "Consider the 50/30/20 rule: 50% needs, 30% wants, 20% savings",
    "Track daily expenses to identify spending patterns",
    "Look for opportunities to reduce fixed costs",
    "Build an emergency fund covering 6 months of expenses",
    "Review and adjust your budget monthly"
  ];
  
  const refreshInsights = () => {
    generateInsights();
    toast({
      title: "Insights Refreshed",
      description: "Your financial insights have been updated with the latest data.",
    });
  };
  
  return (
    <div className="space-y-6">
      {!totalExpenses ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Budget Data</AlertTitle>
          <AlertDescription>
            Please set up your monthly budget first to get personalized insights.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <Card>
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
              <CardTitle className="text-xl font-bold text-black dark:text-white">Financial Health Score</CardTitle>
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
          
          {insights.length > 0 && (
            <Card>
              <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
                <CardTitle className="text-xl font-bold text-black dark:text-white">Key Insights</CardTitle>
                <CardDescription>Areas that need your attention</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {insights.map((insight, index) => {
                    // Determine background color based on severity
                    const bgColor = 
                      insight.severity === "high" ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800" :
                      insight.severity === "medium" ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800" :
                      "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
                    
                    return (
                      <div 
                        key={index} 
                        className={`flex items-start gap-4 p-5 border-2 rounded-lg ${bgColor} transition-all duration-200 hover:shadow-md`}
                      >
                        <div className="shrink-0">
                          {insight.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-black dark:text-white text-lg">{insight.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
              <CardTitle className="text-xl font-bold text-black dark:text-white">Category Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-black dark:text-white mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">Housing Costs</h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Rent/EMI + Utilities</span>
                    <span>₹{housingCost.toLocaleString('en-IN')} ({housingRatio.toFixed(1)}% of income)</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${housingRatio > 40 ? 'bg-red-500' : 'bg-green-500'}`} 
                      style={{ width: `${Math.min(housingRatio, 100)}%` }}
                    ></div>
                  </div>
                  {housingRatio > 40 && (
                    <p className="text-xs text-red-500 mt-1">
                      Housing costs are {housingRatio.toFixed(1)}% of your income. 
                      Consider options to reduce this below 40%.
                    </p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-black dark:text-white mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">Essential vs. Discretionary Spending</h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Essential expenses</span>
                    <span>₹{essentialSpending.toLocaleString('en-IN')} ({essentialRatio.toFixed(1)}% of income)</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${Math.min(essentialRatio, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                {expenseRatios.Lifestyle > 30 && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>High Lifestyle Expenses</AlertTitle>
                    <AlertDescription>
                      Lifestyle expenses are {expenseRatios.Lifestyle.toFixed(1)}% of your income.
                      Consider reducing discretionary spending.
                    </AlertDescription>
                  </Alert>
                )}
                
                {expenseRatios.Financial < 10 && (
                  <Alert className="mt-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Low Financial Allocation</AlertTitle>
                    <AlertDescription>
                      Consider increasing allocation to investments and emergency fund
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-black dark:text-white">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Smart Budget Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {budgetTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
                <CardTitle className="text-xl font-bold text-black dark:text-white">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    <span>Personalized Suggestions</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="multiple" className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`suggestion-${index}`} 
                      className="border-2 border-amber-200 dark:border-amber-800 rounded-lg overflow-hidden bg-amber-50 dark:bg-amber-900/20 shadow-sm"
                    >
                      <AccordionTrigger className="px-4 py-3 hover:bg-amber-100 dark:hover:bg-amber-800/30 font-medium">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                          <span>{suggestion.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3 border-t border-amber-200 dark:border-amber-800 bg-white dark:bg-gray-900">
                        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                  {suggestions.length === 0 && (
                    <div className="text-center p-6 border-2 border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
                      <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                      <p className="font-medium text-green-800 dark:text-green-300">Great job! We don't have any major suggestions based on your current budget.</p>
                    </div>
                  )}
                </Accordion>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
                <CardTitle className="text-xl font-bold text-black dark:text-white">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    <span>Financial Strengths</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {strengths.map((strength, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-4 p-5 border-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 
                      dark:border-emerald-800 transition-all duration-200 hover:shadow-md"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black dark:text-white text-lg">{strength.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{strength.description}</p>
                      </div>
                    </div>
                  ))}
                  {strengths.length === 0 && (
                    <div className="text-center p-6 text-muted-foreground">
                      <p>Keep working on your budget to develop financial strengths!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Financial Metrics Summary */}
          <Card className="mt-8 bg-gray-100 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700">
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
              <CardTitle className="text-center text-xl font-bold text-black dark:text-white">Financial Metrics Summary</CardTitle>
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
                    <h3 className="text-sm font-semibold text-black dark:text-white mb-2">Savings Rate</h3>
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
                    <h3 className="text-sm font-semibold text-black dark:text-white mb-2">Housing Cost Ratio</h3>
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
                    <h3 className="text-sm font-semibold text-black dark:text-white mb-2">Essential Expenses</h3>
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
          
          <div className="mt-8 text-center">
            <div className="max-w-md mx-auto p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 shadow-md">
              <h3 className="text-lg font-medium mb-2">Keep Your Insights Up to Date</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Refresh your financial insights whenever you make changes to your budget or expenses
              </p>
              <Button 
                size="lg"
                className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900/50 dark:hover:bg-blue-900/60 dark:text-blue-300 
                  border-2 border-blue-300 dark:border-blue-800 shadow-sm font-medium transition-all"
                onClick={refreshInsights}
              >
                <svg className="w-5 h-5 mr-2 animate-spin-slow" viewBox="0 0 24 24">
                  <path 
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"
                    opacity="0.3"
                  />
                  <path 
                    fill="currentColor"
                    d="M12 4V2C6.48 2 2 6.48 2 12h2c0-4.41 3.59-8 8-8z"
                  />
                </svg>
                Refresh Financial Insights
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BudgetInsights;