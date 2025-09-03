import React, { useState, useEffect } from 'react';
import { useBudget } from '@/contexts/BudgetContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, TrendingUp, BarChart3, Lightbulb, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const FinancialInsights = () => {
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

  useEffect(() => {
    if (budgetData) {
      generateInsights();
    }
  }, [budgetData]);

  const generateInsights = () => {
    // Calculate basic metrics
    const totalIncome = budgetData.monthlyIncome;
    const totalExpenses = Object.values(budgetData.expenses).reduce((sum: number, amount: number) => sum + amount, 0);
    const savings = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (savings / totalIncome * 100) : 0;
    const targetSavingsRate = budgetData.targetSavingsRate || 20;
    
    // Get investments and other important categories
    const investments = budgetData.expenses['Financial_Investments'] || 0;
    const investmentRate = totalIncome > 0 ? (investments / totalIncome * 100) : 0;
    const essentialExpenses = calculateCategoryTotal('Essential');
    const lifestyleExpenses = calculateCategoryTotal('Lifestyle');
    const essentialRate = totalIncome > 0 ? (essentialExpenses / totalIncome * 100) : 0;
    const lifestyleRate = totalIncome > 0 ? (lifestyleExpenses / totalIncome * 100) : 0;

    // Generate insights based on financial ratios
    const newInsights = [];
    const newSuggestions = [];
    const newStrengths = [];
    
    // 1. Savings rate insight
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
    } else if (savingsRate < targetSavingsRate) {
      newInsights.push({
        title: "Savings Below Target",
        description: `Your current savings rate (${savingsRate.toFixed(1)}%) is below your target of ${targetSavingsRate}%.`,
        icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
        severity: "medium",
      });
      newSuggestions.push({
        title: "Optimize Your Budget",
        description: `Try to increase your savings by ₹${((targetSavingsRate - savingsRate) * totalIncome / 100).toFixed(0)} per month to reach your target.`,
      });
    } else {
      newStrengths.push({
        title: "Great Savings Rate",
        description: `Your savings rate of ${savingsRate.toFixed(1)}% meets or exceeds your ${targetSavingsRate}% target.`,
      });
    }

    // 2. Essential spending insight
    if (essentialRate > 50) {
      newInsights.push({
        title: "High Essential Expenses",
        description: `${essentialRate.toFixed(1)}% of your income goes to essential expenses, which may limit financial flexibility.`,
        icon: <BarChart3 className="h-5 w-5 text-amber-500" />,
        severity: "medium",
      });
      newSuggestions.push({
        title: "Review Essential Costs",
        description: "Consider negotiating bills or finding more affordable alternatives for housing, utilities, etc.",
      });
    } else {
      newStrengths.push({
        title: "Balanced Essential Spending",
        description: `Your essential expenses are kept at a manageable ${essentialRate.toFixed(1)}% of income, giving you financial flexibility.`,
      });
    }

    // 3. Investment insight
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
    
    // 4. Lifestyle spending insight
    if (lifestyleRate > 30) {
      newInsights.push({
        title: "High Lifestyle Spending",
        description: `${lifestyleRate.toFixed(1)}% of your income goes to lifestyle expenses, which may be impacting your savings.`,
        icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
        severity: "medium",
      });
      newSuggestions.push({
        title: "Review Discretionary Spending",
        description: "Look for ways to reduce entertainment, dining out, or subscription services to improve savings.",
      });
    } else if (savingsRate > targetSavingsRate * 1.5 && lifestyleRate < 10) {
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
    healthScore += Math.min(40, (savingsRate / targetSavingsRate) * 30);
    
    // Investment rate contributes 20 points max
    healthScore += Math.min(20, investmentRate * 2);
    
    // Essential vs lifestyle balance contributes 20 points max
    const balanceScore = essentialRate <= 50 ? 10 : (60 - essentialRate) / 10;
    const lifestyleScore = lifestyleRate <= 30 ? 10 : (40 - lifestyleRate) / 10;
    healthScore += Math.max(0, balanceScore + lifestyleScore);
    
    // Positive cash flow contributes 20 points max
    healthScore += savingsRate > 0 ? 20 : (savingsRate / -20) * 20;
    
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

  const calculateCategoryTotal = (category: string) => {
    return Object.entries(budgetData.expenses)
      .filter(([key]) => key.startsWith(category))
      .reduce((sum, [_, amount]) => sum + (amount as number), 0);
  };

  const refreshInsights = () => {
    generateInsights();
    toast({
      title: "Insights Refreshed",
      description: "Your financial insights have been updated with the latest data.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
          <CardTitle className="text-xl font-bold text-black dark:text-white">Financial Health Score</CardTitle>
          <CardDescription>Based on your budget and spending patterns</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center rounded-full w-32 h-32 border-8 border-gray-100 dark:border-gray-700">
              <div className="text-center">
                <p className="text-4xl font-bold">{financialHealth.score}</p>
                <p className="text-sm text-muted-foreground">out of 100</p>
              </div>
            </div>
            <p className={`mt-2 font-semibold text-lg ${
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
              <div className="flex justify-between text-sm mb-1">
                <span>Weak</span>
                <span>Strong</span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${financialHealth.color} rounded-full`} 
                  style={{ width: `${financialHealth.score}%` }}
                />
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
              {insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
                  {insight.icon}
                  <div>
                    <h3 className="font-medium text-black dark:text-white">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
            <CardTitle className="text-xl font-bold text-black dark:text-white">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                <span>Suggestions</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Accordion type="multiple" className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <AccordionItem key={index} value={`suggestion-${index}`} className="border rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-900">{suggestion.title}</AccordionTrigger>
                  <AccordionContent className="px-4 pb-3">
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
              {suggestions.length === 0 && (
                <div className="text-center p-6 text-muted-foreground">
                  <p>Great job! We don't have any major suggestions based on your current budget.</p>
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
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <div>
                    <h3 className="font-medium text-black dark:text-white">{strength.title}</h3>
                    <p className="text-sm text-muted-foreground">{strength.description}</p>
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
      
      <div className="mt-6 text-center">
        <Button 
          size="lg"
          className="w-full max-w-md bg-gray-100 hover:bg-gray-200 text-black"
          onClick={refreshInsights}
        >
          Refresh Insights
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Update insights with your latest budget and expense data
        </p>
      </div>
    </div>
  );
};

export default FinancialInsights;