import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useBudget } from "../../contexts/BudgetContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";

const MonthlyBudget = () => {
  const { budgetData, updateIncome, updateExpense, updateTargetSavingsRate } = useBudget();
  const { toast } = useToast();
  const [tempSavingsRate, setTempSavingsRate] = useState(budgetData.targetSavingsRate || 20);
  const [calculatedSummary, setCalculatedSummary] = useState(false);
  
  // Calculate total expenses and savings
  const totalExpenses = useMemo(() => {
    return Object.values(budgetData.expenses).reduce((sum, amount) => sum + amount, 0);
  }, [budgetData.expenses]);
  
  const savings = useMemo(() => {
    return budgetData.monthlyIncome - totalExpenses;
  }, [budgetData.monthlyIncome, totalExpenses]);
  
  const savingsPercentage = useMemo(() => {
    return budgetData.monthlyIncome > 0 
      ? (savings / budgetData.monthlyIncome * 100) 
      : 0;
  }, [budgetData.monthlyIncome, savings]);
  
  // Calculate target monthly savings amount
  const targetMonthlySavingsAmount = useMemo(() => {
    return budgetData.monthlyIncome * (tempSavingsRate / 100);
  }, [budgetData.monthlyIncome, tempSavingsRate]);
  
  // Calculate how much more needed to reach target
  const additionalSavingsNeeded = useMemo(() => {
    return Math.max(0, targetMonthlySavingsAmount - savings);
  }, [targetMonthlySavingsAmount, savings]);
  
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
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <div className="space-y-6 mt-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
            <CardTitle className="text-xl font-bold text-black dark:text-white">Income & Savings Target</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
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
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Target Monthly Savings (%)</Label>
                <span className="text-sm text-muted-foreground">Recommended: Save 20-30% of your income</span>
              </div>
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
              <div className="mt-1">
                <div className="text-xs text-muted-foreground">
                  Current savings rate: {savingsPercentage.toFixed(1)}%
                  {savingsPercentage < tempSavingsRate && (
                    <span className="text-amber-600 ml-1">(below target)</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
            <CardTitle className="text-xl font-bold text-black dark:text-white">Monthly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="pr-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                    <p className="text-2xl font-bold">₹{budgetData.monthlyIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                    <p className={`text-2xl font-bold ${totalExpenses > budgetData.monthlyIncome && budgetData.monthlyIncome > 0 ? 'text-red-600' : ''}`}>₹{totalExpenses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                    {budgetData.monthlyIncome > totalExpenses ? (
                      <p className="text-xs text-green-600">₹{(budgetData.monthlyIncome - totalExpenses).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} remaining</p>
                    ) : (
                      budgetData.monthlyIncome > 0 && <p className="text-xs text-red-600">Exceeds income by ₹{(totalExpenses - budgetData.monthlyIncome).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 border-l pl-4">
                <h3 className="font-semibold text-sm text-black dark:text-white">Savings & Investments</h3>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Savings</p>
                  <p className="text-xl font-bold">₹{savings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                  <p className={`text-xs ${savingsPercentage >= 20 ? 'text-green-600' : 'text-amber-600'}`}>
                    {savingsPercentage.toFixed(1)}% of income
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Target Monthly Savings</p>
                  <p className="text-xl font-bold">₹{targetMonthlySavingsAmount.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                  {additionalSavingsNeeded > 0 && (
                    <p className="text-xs text-amber-600">
                      Need ₹{additionalSavingsNeeded.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} more to reach target
                    </p>
                  )}
                </div>
                
                {/* Calculate investments total from financial category */}
                {(() => {
                  const investments = budgetData.expenses['Financial_Investments'] || 0;
                  const investmentPercentage = budgetData.monthlyIncome > 0 
                    ? (investments / budgetData.monthlyIncome * 100) 
                    : 0;
                  
                  const availableToInvest = savings - investments;
                  
                  return (
                    <>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Investments</p>
                        <p className="text-lg font-bold">₹{investments.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        <p className="text-xs text-muted-foreground">
                          {investmentPercentage.toFixed(1)}% of income
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Available to Invest</p>
                        <p className="text-lg font-bold">₹{availableToInvest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                      </div>
                    </>
                  );
                })()}
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
          <div className="space-y-5">
            <p className="text-sm text-muted-foreground">Set your monthly budget for each category:</p>
            
            <Accordion type="multiple" defaultValue={['Essential', 'Lifestyle', 'Financial', 'Others']}>
              {Object.entries(budgetData.categories).map(([category, items]) => (
                <AccordionItem key={category} value={category}>
                  <AccordionTrigger>{category} Expenses</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      {items.map(item => {
                        const key = `${category}_${item}`;
                        return (
                          <div key={key} className="space-y-2">
                            <Label htmlFor={key}>{item} (₹)</Label>
                            <Input
                              id={key}
                              type="number"
                              min={0}
                              step={100}
                              value={budgetData.expenses[key] || 0}
                              onChange={(e) => updateExpense(
                                category, 
                                item, 
                                parseInt(e.target.value) || 0
                              )}
                              className={`border-2 ${
                                // Color based on overall budget state
                                totalExpenses > budgetData.monthlyIncome && budgetData.monthlyIncome > 0
                                  ? 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
                                  : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            {/* Highlighted Subscriptions Section */}
            <div className="p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 mt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-md font-semibold">Monthly Subscriptions</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">Essential Expense</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subscriptions">Total Subscription Cost (₹)</Label>
                  <Input
                    id="subscriptions"
                    type="number"
                    min={0}
                    step={50}
                    value={budgetData.expenses['Essential_Subscriptions'] || 0}
                    onChange={(e) => {
                      updateExpense(
                        'Essential', 
                        'Subscriptions', 
                        parseInt(e.target.value) || 0
                      );
                    }}
                    className={`border-2 ${
                      // Color based on overall budget state
                      totalExpenses > budgetData.monthlyIncome && budgetData.monthlyIncome > 0
                        ? 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
                        : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                    }`}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Streaming services, music, gym, app subscriptions, etc.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    <p>Common subscriptions in India:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Netflix, Amazon Prime, Disney+</li>
                      <li>Spotify, JioSaavn, Gaana</li>
                      <li>Microsoft 365, iCloud, Google One</li>
                      <li>Gym, clubs, memberships</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
                    <Tooltip formatter={(value) => `₹${(value as number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} />
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
                            ₹{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{netSavings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {netSavings > 0 ? "Net Positive" : "Net Negative"}
                        </p>
                      </div>
                      
                      <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                        <h3 className="text-sm font-semibold text-black dark:text-white mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">Total Being Saved</h3>
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">₹{totalSaved.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Including investments and savings
                        </p>
                      </div>
                      
                      <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                        <h3 className="text-sm font-semibold text-black dark:text-white mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">Net Worth Change</h3>
                        <p className={`text-2xl font-bold ${netWorthChange >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                          {netWorthChange >= 0 ? "+" : ""}₹{netWorthChange.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
          
          {/* Remove duplicate budget buttons */}
        </>
      )}
    </div>
  );
};

export default MonthlyBudget;