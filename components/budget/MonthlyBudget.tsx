import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useBudget } from "../../contexts/BudgetContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Alert, AlertDescription } from "../ui/alert";
import { useToast } from "../../hooks/use-toast";
import { 
  Shield, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";

// Simple budget interfaces for manual management
interface BudgetTip {
  category: string;
  message: string;
  type: 'info' | 'warning' | 'success';
}

const MonthlyBudget = () => {
  const { budgetData, updateIncome, updateExpense, updateTargetSavingsRate } = useBudget();
  const { toast } = useToast();
  const [tempSavingsRate, setTempSavingsRate] = useState(budgetData.targetSavingsRate || 20);
  const [calculatedSummary, setCalculatedSummary] = useState(false);
  
  // Simple budget tips for education
  const [budgetTips] = useState<BudgetTip[]>([
    {
      category: 'Housing',
      message: 'Keep housing costs under 30% of income for financial stability.',
      type: 'info'
    },
    {
      category: 'Savings',
      message: 'Aim to save at least 20% of your monthly income.',
      type: 'success'
    },
    {
      category: 'Emergency Fund',
      message: 'Build an emergency fund covering 3-6 months of expenses.',
      type: 'info'
    }
  ]);
  
  // Calculate savings from "Savings & Investments" category
  const totalSavings = useMemo(() => {
    const savingsCategory = 'Savings & Investments (15–20%)';
    const savingsItems = budgetData.categories[savingsCategory as keyof typeof budgetData.categories] || [];
    return savingsItems.reduce((sum: number, item: string) => {
      const key = `${savingsCategory}_${item}`;
      return sum + (budgetData.expenses[key] || 0);
    }, 0);
  }, [budgetData.categories, budgetData.expenses]);

  // Calculate total expenses (excluding savings)
  const totalExpenses = useMemo(() => {
    const savingsCategory = 'Savings & Investments (15–20%)';
    return Object.entries(budgetData.expenses).reduce((sum, [key, amount]) => {
      // Exclude savings category from expenses
      if (!key.startsWith(savingsCategory)) {
        return sum + amount;
      }
      return sum;
    }, 0);
  }, [budgetData.expenses]);
  
  const remainingAfterExpensesAndSavings = useMemo(() => {
    return budgetData.monthlyIncome - totalExpenses - totalSavings;
  }, [budgetData.monthlyIncome, totalExpenses, totalSavings]);
  
  const savingsPercentage = useMemo(() => {
    return budgetData.monthlyIncome > 0 
      ? (totalSavings / budgetData.monthlyIncome * 100) 
      : 0;
  }, [budgetData.monthlyIncome, totalSavings]);
  
  // Calculate target monthly savings amount
  const targetMonthlySavingsAmount = useMemo(() => {
    return budgetData.monthlyIncome * (tempSavingsRate / 100);
  }, [budgetData.monthlyIncome, tempSavingsRate]);
  
  // Calculate how much more needed to reach target
  const additionalSavingsNeeded = useMemo(() => {
    return Math.max(0, targetMonthlySavingsAmount - totalSavings);
  }, [targetMonthlySavingsAmount, totalSavings]);
  
  // Group expenses by category for visualization
  const expensesByCategory = useMemo(() => {
    const result: Record<string, number> = {};
    
    Object.entries(budgetData.expenses).forEach(([key, amount]) => {
      if (amount > 0) {
        const [category] = key.split('_');
        result[category] = (result[category] || 0) + amount;
      }
    });
    
    return Object.entries(result).map(([name, value]) => ({ name, value }));
  }, [budgetData.expenses]);
  
  // Detailed expense data for treemap
  const detailedExpenses = useMemo(() => {
    return Object.entries(budgetData.expenses)
      .filter(([_, amount]) => amount > 0)
      .map(([key, amount]) => {
        const [category, ...itemParts] = key.split('_');
        const item = itemParts.join('_'); // Handle items with underscores
        return { category, item, value: amount };
      });
  }, [budgetData.expenses]);
  
  // Colors for pie chart - blue theme
  const COLORS = ['#0088FE', '#0078D4', '#4A9EFF', '#6BB6FF'];

  // Save budget settings
  const saveBudgetSettings = () => {
    updateTargetSavingsRate(tempSavingsRate);
    toast({
      title: "Budget Settings Saved",
      description: "Your budget allocations and targets have been updated successfully.",
    });
    setCalculatedSummary(true);
  };
  
  return (
    <div className="space-y-6 mt-6">

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
            <CardTitle className="text-xl font-bold text-black dark:text-white">Income & Savings Target</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Monthly Income ($)</Label>
              <Input
                id="monthlyIncome"
                type="number"
                min={0}
                step={1000}
                value={budgetData.monthlyIncome}
                onChange={(e) => updateIncome(parseInt(e.target.value) || 0)}
                className="bg-gray-50 border-2 border-gray-200"
              />
            </div>
            
            <div className="space-y-3">
              <Label>Target Monthly Savings (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[tempSavingsRate]}
                  max={70}
                  step={1}
                  onValueChange={(value) => setTempSavingsRate(value[0])}
                  className="flex-grow"
                />
                <span className="font-medium w-12 text-center">{tempSavingsRate}%</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Current: {savingsPercentage.toFixed(1)}%
                {savingsPercentage < tempSavingsRate && (
                  <span className="text-amber-600 ml-1">(below target)</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
            <CardTitle className="text-xl font-bold text-black dark:text-white">Budget Monthly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6 text-center">
              {/* First Row */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Income</p>
                <p className="text-2xl font-bold text-blue-600">${budgetData.monthlyIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Expenses</p>
                <p className={`text-2xl font-bold ${totalExpenses > budgetData.monthlyIncome && budgetData.monthlyIncome > 0 ? 'text-red-600' : 'text-gray-800 dark:text-gray-200'}`}>
                  ${totalExpenses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>
              
              {/* Second Row */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Savings</p>
                <p className="text-2xl font-bold text-green-600">
                  ${totalSavings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {savingsPercentage.toFixed(1)}% saved
                  {savingsPercentage < tempSavingsRate && (
                    <span className="text-amber-600 ml-1">(below target)</span>
                  )}
                </p>
                {savingsPercentage < tempSavingsRate && (
                  <p className="text-xs text-amber-600 mt-1">
                    You can increase your savings to reach {tempSavingsRate}% target!
                  </p>
                )}
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Remaining</p>
                <p className="text-2xl font-bold text-green-600">
                  ${remainingAfterExpensesAndSavings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
                <p className="text-xs text-muted-foreground">
                  Can be used to save more
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
          <CardTitle className="text-xl font-bold text-black dark:text-white">Budget Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 mt-4">
            {Object.entries(budgetData.categories).map(([category, items], categoryIndex) => {
              // Calculate category total
              const categoryTotal = items.reduce((sum, item) => {
                const key = `${category}_${item}`;
                return sum + (budgetData.expenses[key] || 0);
              }, 0);

              return (
                <div key={category} className="space-y-3">
                  {/* Category Header Outside Box */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-bold">
                        {categoryIndex + 1}
                      </span>
                      {category}
                    </h3>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        ${categoryTotal.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {items.length} item{items.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>

                  {/* Budget Items Inside Box */}
                  <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map((item, itemIndex) => {
                        const key = `${category}_${item}`;
                        return (
                          <div key={key} className="space-y-2">
                            <Label htmlFor={key} className="text-sm font-medium text-gray-700 dark:text-gray-300 block whitespace-nowrap overflow-hidden text-ellipsis">
                              {item} ($)
                            </Label>
                            <Input
                              id={key}
                              type="number"
                              min={0}
                              step={100}
                              placeholder="0"
                              value={budgetData.expenses[key] || 0}
                              onChange={(e) => updateExpense(
                                category, 
                                item, 
                                parseInt(e.target.value) || 0
                              )}
                              className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      {/* Save Budget Settings - Moved outside Budget Allocation box */}
      <div className="mt-8">
        <div className="flex flex-col items-center space-y-2">
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white w-60"
            onClick={() => {
              updateTargetSavingsRate(tempSavingsRate);
              toast({
                title: "Budget Settings Updated",
                description: "Your monthly budget settings have been saved.",
              });
            }}
          >
            Save Budget Settings
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Save all budget allocations and targets to update your financial plan
          </p>
        </div>
      </div>
      
      {totalExpenses > 0 && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
                <CardTitle className="text-xl font-bold text-black dark:text-white">Expense Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expensesByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent, cx, cy, midAngle, innerRadius, outerRadius }) => {
                        // Custom label position logic
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
                        let x = cx + radius * Math.cos(-midAngle * RADIAN);
                        let y = cy + radius * Math.sin(-midAngle * RADIAN);
                        
                        // Special positioning for Lifestyle 
                        if (name === 'Lifestyle') {
                          y += 40; // Move lifestyle label down
                        }
                        
                        return (
                          <text 
                            x={x} 
                            y={y} 
                            fill={name === 'Lifestyle' ? "#f59e0b" : "#000000"}
                            textAnchor={x > cx ? 'start' : 'end'} 
                            dominantBaseline="central"
                          >
                            {name}: {(percent * 100).toFixed(0)}%
                          </text>
                        );
                      }}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expensesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${(value as number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
                <CardTitle className="text-xl font-bold text-black dark:text-white">Expenses by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(budgetData.categories).map(([category, _]) => {
                    const total = detailedExpenses
                      .filter(item => item.category === category)
                      .reduce((sum, item) => sum + item.value, 0);
                      
                    const percentage = (total / totalExpenses * 100) || 0;
                    
                    return (
                      <div key={category} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{category}</span>
                          <span 
                            className={`${
                              // Highlight if over recommended thresholds
                              (category === 'Essential' && percentage > 60) ||
                              (category === 'Lifestyle' && percentage > 30) ||
                              totalExpenses > budgetData.monthlyIncome
                                ? 'text-red-600 font-semibold' 
                                : ''
                            }`}
                          >
                            ${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            {(category === 'Essential' && percentage > 60) && 
                              <span className="text-xs ml-1">(high)</span>
                            }
                            {(category === 'Lifestyle' && percentage > 30) && 
                              <span className="text-xs ml-1">(high)</span>
                            }
                          </span>
                        </div>
                        <div className="h-2 w-full bg-secondary overflow-hidden rounded-full">
                          <div 
                            className={`h-full rounded-full ${
                              // Color coding
                              (category === 'Essential' && percentage > 60) ||
                              (category === 'Lifestyle' && percentage > 30) ||
                              totalExpenses > budgetData.monthlyIncome
                                ? 'bg-red-500' 
                                : (category === 'Financial' && percentage > 20)
                                  ? 'bg-green-500'
                                  : 'bg-primary'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="text-xs text-right text-muted-foreground">
                          {percentage.toFixed(1)}% of total expenses
                          {category === 'Essential' && 
                            <span className={`ml-1 ${percentage > 60 ? 'text-red-600' : 'text-muted-foreground'}`}>
                              (target: ≤ 60%)
                            </span>
                          }
                          {category === 'Lifestyle' && 
                            <span className={`ml-1 ${percentage > 30 ? 'text-red-600' : 'text-muted-foreground'}`}>
                              (target: ≤ 30%)
                            </span>
                          }
                          {category === 'Financial' && 
                            <span className={`ml-1 ${percentage < 20 ? 'text-amber-600' : 'text-green-600'}`}>
                              (target: ≥ 20%)
                            </span>
                          }
                        </div>
                        

                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Net Financial Summary Section */}
          <Card className="mt-8 bg-gray-100 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700">
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b-0">
              <CardTitle className="text-center text-xl font-bold text-black dark:text-white">Net Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(() => {
                  const netSavings = budgetData.monthlyIncome - totalExpenses;
                  const investments = budgetData.expenses['Financial_Investments'] || 0;
                  const totalSaved = netSavings + investments;
                  const netWorthChange = totalSaved;
                  
                  return (
                    <>
                      <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                        <h3 className="text-sm font-semibold text-black dark:text-white mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">Income vs. Expenses</h3>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${netSavings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {netSavings > 0 ? "Net Positive" : "Net Negative"}
                        </p>
                      </div>
                      
                      <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                        <h3 className="text-sm font-semibold text-black dark:text-white mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">Total Being Saved</h3>
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">${totalSaved.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Including investments and savings
                        </p>
                      </div>
                      
                      <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                        <h3 className="text-sm font-semibold text-black dark:text-white mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">Net Worth Change</h3>
                        <p className={`text-2xl font-bold ${netWorthChange >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                          {netWorthChange >= 0 ? "+" : ""}${netWorthChange.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Monthly impact on net worth
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </CardContent>
          </Card>
          
          {/* Educational Spending Insights */}
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Educational Spending Insights
              </CardTitle>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                📚 Learn about typical spending patterns and budget optimization strategies
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetTips.map((tip, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200">{tip.category} Tips</h4>
                      <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">
                        Educational
                      </Badge>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
                      <p className="text-sm text-blue-700 dark:text-blue-300">{tip.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Remove duplicate budget buttons */}
        </>
      )}
      
      {/* Educational Platform Disclaimer */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Educational Platform:</strong> This budget management tool is designed for learning and educational purposes. 
          All data is entered manually and stored locally in your browser session for a personalized learning experience.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default MonthlyBudget;