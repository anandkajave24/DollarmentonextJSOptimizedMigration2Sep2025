import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Alert, AlertDescription } from '@/components/ui/alert';

import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PiggyBank, 
  CreditCard, 
  Home,
  Car,
  ShoppingCart,
  Info,
  Heart,
  Plane,
  Zap,
  Shield,
  Users,
  Gift,
  BarChart3
} from 'lucide-react';
import { useBudget } from '@/contexts/BudgetContext';
import { useIncomeExpenses } from '@/contexts/IncomeExpensesContext';

const SimpleBudgetBuddy: React.FC = () => {
  const { budgetData, dailyExpenses } = useBudget();
  const {
    getExpectedMonthlyIncome,
    getGuaranteedMonthlyIncome,
    getTotalMonthlyExpenses,
    getExpensesByCategory
  } = useIncomeExpenses();

  // Calculate totals for each category
  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    Object.entries(budgetData.categories).forEach(([categoryName, items]) => {
      let categoryTotal = 0;
      items.forEach(item => {
        const key = `${categoryName}_${item}`;
        categoryTotal += budgetData.expenses[key] || 0;
      });
      totals[categoryName] = categoryTotal;
    });
    return totals;
  }, [budgetData.categories, budgetData.expenses]);

  // Calculate actual spending from expense tracker
  const actualSpending = useMemo(() => {
    return dailyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [dailyExpenses]);

  // Calculate overall budget statistics
  const totalBudgetAllocation = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);
  const remainingBudget = budgetData.monthlyIncome - totalBudgetAllocation;
  const budgetUtilization = budgetData.monthlyIncome > 0 ? (totalBudgetAllocation / budgetData.monthlyIncome) * 100 : 0;
  
  // Calculate savings from "Savings & Investments" category
  const savingsCategory = 'Savings & Investments (15–20%)';
  const budgetedSavings = categoryTotals[savingsCategory] || 0;
  const savingsRate = budgetData.monthlyIncome > 0 ? (budgetedSavings / budgetData.monthlyIncome) * 100 : 0;

  // Calculate actual spending by category
  const actualSpendingByCategory = useMemo(() => {
    const categorySpending: Record<string, number> = {};
    
    // Initialize all categories with 0
    Object.keys(budgetData.categories).forEach(category => {
      categorySpending[category] = 0;
    });

    // Sum actual expenses by category
    dailyExpenses.forEach(expense => {
      if (categorySpending.hasOwnProperty(expense.category)) {
        categorySpending[expense.category] += expense.amount;
      }
    });

    return categorySpending;
  }, [dailyExpenses, budgetData.categories]);

  // Get category icons and colors
  const getCategoryIcon = (categoryName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'Housing (25–35%)': <Home className="w-5 h-5" />,
      'Transportation (10–15%)': <Car className="w-5 h-5" />,
      'Food (10–15%)': <ShoppingCart className="w-5 h-5" />,
      'Utilities & Bills (5–10%)': <Zap className="w-5 h-5" />,
      'Insurance (5–10%)': <Shield className="w-5 h-5" />,
      'Health & Medical (5–10%)': <Heart className="w-5 h-5" />,
      'Debt Repayment (5–15%)': <CreditCard className="w-5 h-5" />,
      'Savings & Investments (15–20%)': <PiggyBank className="w-5 h-5" />,
      'Personal & Family Expenses (5–10%)': <Users className="w-5 h-5" />,
      'Entertainment & Lifestyle (5–10%)': <TrendingUp className="w-5 h-5" />,
      'Travel (5%)': <Plane className="w-5 h-5" />,
      'Giving / Charity (1–5%)': <Gift className="w-5 h-5" />,
      'Miscellaneous (2–5%)': <Info className="w-5 h-5" />
    };
    return iconMap[categoryName] || <DollarSign className="w-5 h-5" />;
  };

  const getCategoryColor = (categoryName: string) => {
    const colorMap: Record<string, string> = {
      'Housing (25–35%)': 'bg-blue-500',
      'Transportation (10–15%)': 'bg-green-500',
      'Food (10–15%)': 'bg-orange-500',
      'Utilities & Bills (5–10%)': 'bg-yellow-500',
      'Insurance (5–10%)': 'bg-purple-500',
      'Health & Medical (5–10%)': 'bg-pink-500',
      'Debt Repayment (5–15%)': 'bg-red-500',
      'Savings & Investments (15–20%)': 'bg-emerald-500',
      'Personal & Family Expenses (5–10%)': 'bg-cyan-500',
      'Entertainment & Lifestyle (5–10%)': 'bg-indigo-500',
      'Travel (5%)': 'bg-teal-500',
      'Giving / Charity (1–5%)': 'bg-rose-500',
      'Miscellaneous (2–5%)': 'bg-gray-500'
    };
    return colorMap[categoryName] || 'bg-gray-500';
  };



  const getBudgetStatus = () => {
    if (budgetUtilization <= 70) return { status: 'success', color: 'text-green-600', message: 'Great budgeting!' };
    if (budgetUtilization <= 90) return { status: 'warning', color: 'text-yellow-600', message: 'Watch spending' };
    return { status: 'danger', color: 'text-red-600', message: 'Over budget!' };
  };

  const budgetStatus = getBudgetStatus();

  return (
    <div className="space-y-6">
      {/* Budget Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {/* Monthly Income */}
        <Card className="bg-gray-200 dark:bg-gray-800 border-none">
          <CardContent className="p-4 text-center">
            <div className="h-12 flex items-center justify-center mb-3">
              <h4 className="text-base font-bold text-black dark:text-white">Monthly Income</h4>
            </div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              ${budgetData.monthlyIncome.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Budget Allocation */}
        <Card className="bg-gray-200 dark:bg-gray-800 border-none">
          <CardContent className="p-4 text-center">
            <div className="h-12 flex items-center justify-center mb-3">
              <h4 className="text-base font-bold text-black dark:text-white">Budget Allocation</h4>
            </div>
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              ${totalBudgetAllocation.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Actual Spending */}
        <Card className="bg-gray-200 dark:bg-gray-800 border-none">
          <CardContent className="p-4 text-center">
            <div className="h-12 flex items-center justify-center mb-3">
              <h4 className="text-base font-bold text-black dark:text-white">Actual Spending</h4>
            </div>
            <div className="text-xl font-bold text-red-600 dark:text-red-400">
              ${actualSpending.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Budgeted Savings */}
        <Card className="bg-gray-200 dark:bg-gray-800 border-none">
          <CardContent className="p-4 text-center">
            <div className="h-12 flex items-center justify-center mb-3">
              <h4 className="text-base font-bold text-black dark:text-white">Budgeted Savings</h4>
            </div>
            <div className="text-xl font-bold text-green-600 dark:text-green-400">
              ${budgetedSavings.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {savingsRate.toFixed(1)}% of income
              {savingsRate < 15 && (
                <div className="text-orange-600 dark:text-orange-400">
                  (below target)
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Remaining Budget */}
        <Card className="bg-gray-200 dark:bg-gray-800 border-none">
          <CardContent className="p-4 text-center">
            <div className="h-12 flex items-center justify-center mb-3">
              <h4 className="text-base font-bold text-black dark:text-white">Remaining Budget</h4>
            </div>
            <div className={`text-xl font-bold ${remainingBudget >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              ${remainingBudget.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {remainingBudget >= 0 ? "Available for savings" : "Over budget"}
            </div>
          </CardContent>
        </Card>

        {/* Budget Score */}
        <Card className={`border-none ${
          budgetUtilization <= 70 ? 'bg-green-100 dark:bg-green-900' : 
          budgetUtilization <= 85 ? 'bg-blue-100 dark:bg-blue-900' : 
          budgetUtilization <= 100 ? 'bg-yellow-100 dark:bg-yellow-900' : 
          'bg-red-100 dark:bg-red-900'
        }`}>
          <CardContent className="p-4 text-center">
            <div className="h-12 flex items-center justify-center mb-3">
              <h4 className="text-base font-bold text-black dark:text-white">Budget Score</h4>
            </div>
            <div className={`text-xl font-bold ${
              budgetUtilization <= 70 ? 'text-green-600 dark:text-green-400' : 
              budgetUtilization <= 85 ? 'text-blue-600 dark:text-blue-400' : 
              budgetUtilization <= 100 ? 'text-yellow-600 dark:text-yellow-400' : 
              'text-red-600 dark:text-red-400'
            }`}>
              {budgetUtilization <= 70 ? 'A+' : 
               budgetUtilization <= 85 ? 'B+' : 
               budgetUtilization <= 100 ? 'C' : 
               'D'}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {budgetUtilization.toFixed(1)}% used
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Vs Actual Spend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Budget Vs Actual Spend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(budgetData.categories).map(([categoryName, items]) => {
              const budgetAmount = categoryTotals[categoryName];
              const actualAmount = actualSpendingByCategory[categoryName] || 0;
              const categoryIcon = getCategoryIcon(categoryName);
              const maxAmount = Math.max(budgetAmount, actualAmount, 1); // Avoid division by zero
              const budgetPercentage = (budgetAmount / maxAmount) * 100;
              const actualPercentage = (actualAmount / maxAmount) * 100;
              const isOverBudget = actualAmount > budgetAmount;
              
              return (
                <div key={categoryName} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800 relative">
                  {/* Over/Under Spending Indicator */}
                  <div className="absolute top-4 right-4">
                    {actualAmount > budgetAmount ? (
                      <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-medium px-2 py-1 rounded-full">
                        Over Spending
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium px-2 py-1 rounded-full">
                        Under Spending
                      </span>
                    )}
                  </div>

                  {/* Category Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-full bg-blue-600 text-white">
                      {categoryIcon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {categoryName.replace(/\s*\([^)]*\)/, '')}
                      </h4>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {items.length} budget item{items.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  
                  {/* Budget vs Actual Amounts */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Budgeted:</span>
                      <span className="font-semibold text-orange-600 dark:text-orange-400">
                        ${budgetAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Actual:</span>
                      <span className={`font-semibold ${isOverBudget ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                        ${actualAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2">
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Difference:</span>
                      <span className={`font-bold ${budgetAmount - actualAmount >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        ${Math.abs(budgetAmount - actualAmount).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Bar Chart Visualization */}
                  <div className="space-y-3">
                    {/* Budget Bar */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <span>Budget</span>
                        <span>{budgetPercentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-orange-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${budgetPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Actual Bar */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <span>Actual</span>
                        <span>{actualPercentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-300 ${isOverBudget ? 'bg-red-500' : 'bg-green-500'}`}
                          style={{ width: `${actualPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Budget Alert */}
      {budgetUtilization > 90 && (
        <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900 dark:border-yellow-700">
          <Info className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Budget Alert:</strong> You're using {budgetUtilization.toFixed(1)}% of your monthly income. 
            Consider reviewing your expenses to stay within budget.
          </AlertDescription>
        </Alert>
      )}

      {/* Budget Summary */}
      <Card className="bg-gray-200 dark:bg-gray-800 border-none">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-black dark:text-white">
            Budget Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Financial Overview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Monthly Income:</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    ${budgetData.monthlyIncome.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Budget Allocated:</span>
                  <span className="font-medium text-orange-600 dark:text-orange-400">
                    ${totalBudgetAllocation.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Actual Spending:</span>
                  <span className="font-medium text-red-600 dark:text-red-400">
                    ${actualSpending.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Budgeted Savings:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    ${budgetedSavings.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-800 dark:text-gray-200 font-medium">Remaining Budget:</span>
                  <span className={`font-bold ${remainingBudget >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    ${remainingBudget.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Budget Performance</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Budget Utilization:</span>
                  <span className={`font-medium ${
                    budgetUtilization <= 70 ? 'text-green-600 dark:text-green-400' : 
                    budgetUtilization <= 85 ? 'text-blue-600 dark:text-blue-400' : 
                    budgetUtilization <= 100 ? 'text-yellow-600 dark:text-yellow-400' : 
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {budgetUtilization.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Savings Rate:</span>
                  <span className={`font-medium ${savingsRate >= 15 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                    {savingsRate.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Budget Grade:</span>
                  <span className={`font-bold text-lg ${
                    budgetUtilization <= 70 ? 'text-green-600 dark:text-green-400' : 
                    budgetUtilization <= 85 ? 'text-blue-600 dark:text-blue-400' : 
                    budgetUtilization <= 100 ? 'text-yellow-600 dark:text-yellow-400' : 
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {budgetUtilization <= 70 ? 'A+' : 
                     budgetUtilization <= 85 ? 'B+' : 
                     budgetUtilization <= 100 ? 'C' : 
                     'D'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Active Categories:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {Object.keys(budgetData.categories).length}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-800 dark:text-gray-200 font-medium">Status:</span>
                  <span className={`font-medium ${
                    budgetUtilization <= 70 ? 'text-green-600 dark:text-green-400' : 
                    budgetUtilization <= 85 ? 'text-blue-600 dark:text-blue-400' : 
                    budgetUtilization <= 100 ? 'text-yellow-600 dark:text-yellow-400' : 
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {budgetUtilization <= 70 ? 'Excellent' : 
                     budgetUtilization <= 85 ? 'Good' : 
                     budgetUtilization <= 100 ? 'Monitor' : 
                     'Over Budget'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Insights */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Quick Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-gray-600 dark:text-gray-400 mb-1">Top Spending Category</div>
                <div className="font-medium text-gray-800 dark:text-gray-200">
                  {Object.entries(actualSpendingByCategory).length > 0 
                    ? Object.entries(actualSpendingByCategory)
                        .sort(([,a], [,b]) => b - a)[0]?.[0]?.replace(/\s*\([^)]*\)/, '') || 'None'
                    : 'None'}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-gray-600 dark:text-gray-400 mb-1">Budget Efficiency</div>
                <div className={`font-medium ${actualSpending <= totalBudgetAllocation ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {actualSpending <= totalBudgetAllocation ? 'On Track' : 'Over Budget'}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-gray-600 dark:text-gray-400 mb-1">Savings Goal</div>
                <div className={`font-medium ${savingsRate >= 15 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                  {savingsRate >= 15 ? 'Meeting Target' : 'Below Target'}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Overview - Using Real Income & Expenses Data */}
      <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
        <CardHeader>
          <CardTitle className="text-black dark:text-white">Financial Overview</CardTitle>
          <p className="text-sm text-muted-foreground">Summary of your actual income and expenses</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {(() => {
            const expectedMonthlyIncome = getExpectedMonthlyIncome();
            const guaranteedMonthlyIncome = getGuaranteedMonthlyIncome();
            const totalMonthlyExpenses = getTotalMonthlyExpenses();
            const essentialExpenses = getExpensesByCategory("essential");
            const importantExpenses = getExpensesByCategory("important");
            const discretionaryExpenses = getExpensesByCategory("discretionary");
            
            const surplus = expectedMonthlyIncome - totalMonthlyExpenses;
            const monthlyBuffer = expectedMonthlyIncome > 0 ? (guaranteedMonthlyIncome / expectedMonthlyIncome) * 100 : 0;

            return (
              <>
                {/* Income vs Expenses Overview */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Income vs Expenses</h3>
                    <span className={`text-sm font-medium ${surplus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {surplus >= 0 ? 'Surplus' : 'Deficit'}: ${Math.abs(surplus).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Expected Monthly Income</span>
                        <span className="font-medium">${expectedMonthlyIncome.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Guaranteed Monthly Income</span>
                        <span className="font-medium">${guaranteedMonthlyIncome.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-green-100 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${monthlyBuffer}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Total Monthly Expenses</span>
                        <span className="font-medium">${totalMonthlyExpenses.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-red-100 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: `${expectedMonthlyIncome > 0 ? (totalMonthlyExpenses / expectedMonthlyIncome) * 100 : 0}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Expense Breakdown */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Expense Breakdown</h3>
                  
                  {/* Essential Expenses */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span>Essential Expenses</span>
                      <span className="font-medium">${essentialExpenses.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-red-100 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${expectedMonthlyIncome > 0 ? (essentialExpenses / expectedMonthlyIncome) * 100 : 0}%` }}></div>
                    </div>
                  </div>
                  
                  {/* Important Expenses */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span>Important Expenses</span>
                      <span className="font-medium">${importantExpenses.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-yellow-100 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${expectedMonthlyIncome > 0 ? (importantExpenses / expectedMonthlyIncome) * 100 : 0}%` }}></div>
                    </div>
                  </div>
                  
                  {/* Discretionary Expenses */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span>Discretionary Expenses</span>
                      <span className="font-medium">${discretionaryExpenses.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${expectedMonthlyIncome > 0 ? (discretionaryExpenses / expectedMonthlyIncome) * 100 : 0}%` }}></div>
                    </div>
                  </div>
                </div>
                
                {/* Income Stability */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Income Stability</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Guaranteed vs Expected</span>
                    <span className={`text-sm font-medium ${
                      monthlyBuffer >= 80 ? 'text-green-600' : 
                      monthlyBuffer >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {monthlyBuffer.toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Stability Rating: {monthlyBuffer >= 80 ? 'Excellent' : monthlyBuffer >= 60 ? 'Good' : 'Needs Improvement'}
                  </div>
                </div>
              </>
            );
          })()}
        </CardContent>
      </Card>

      {/* Educational Spending Insights */}
      <Card className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-800 dark:text-blue-200 flex items-center gap-2">
            📚 Educational Spending Insights
          </CardTitle>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Learn about typical spending patterns and budget optimization strategies
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Housing Tips - Based on actual housing budget */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Housing Tips</h4>
              {(() => {
                const housingBudget = Number(budgetData.categories['1. Housing (25-35%)'] || 0);
                const housingPercentage = budgetData.monthlyIncome > 0 ? (housingBudget / budgetData.monthlyIncome) * 100 : 0;
                const recommendedMax = budgetData.monthlyIncome * 0.30;
                
                if (housingBudget === 0) {
                  return (
                    <>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Set up your housing budget to get personalized tips.
                      </p>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                        Recommended max: ${recommendedMax.toLocaleString()} (30% of income)
                      </div>
                    </>
                  );
                } else if (housingPercentage <= 30) {
                  return (
                    <>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Great! Your housing costs are ${housingBudget.toLocaleString()} ({housingPercentage.toFixed(1)}% of income), well within the 30% guideline.
                      </p>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                        You have ${(recommendedMax - housingBudget).toLocaleString()} extra housing capacity for upgrades.
                      </div>
                    </>
                  );
                } else if (housingPercentage <= 35) {
                  return (
                    <>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">
                        Your housing costs are ${housingBudget.toLocaleString()} ({housingPercentage.toFixed(1)}% of income). Consider reducing by ${(housingBudget - recommendedMax).toLocaleString()}.
                      </p>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                        Target: ${recommendedMax.toLocaleString()} or less (30% of income)
                      </div>
                    </>
                  );
                } else {
                  return (
                    <>
                      <p className="text-sm text-red-600 dark:text-red-400">
                        Housing costs are ${housingBudget.toLocaleString()} ({housingPercentage.toFixed(1)}% of income). Reduce by ${(housingBudget - recommendedMax).toLocaleString()} for better financial health.
                      </p>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                        Critical: Should be ${recommendedMax.toLocaleString()} or less
                      </div>
                    </>
                  );
                }
              })()}
            </div>

            {/* Savings Tips - Based on actual savings budget */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Savings Tips</h4>
              {(() => {
                const savingsPercentage = budgetData.monthlyIncome > 0 ? (budgetedSavings / budgetData.monthlyIncome) * 100 : 0;
                const recommendedSavings = budgetData.monthlyIncome * 0.20;
                
                if (budgetedSavings === 0) {
                  return (
                    <>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Start building your savings habit by allocating to "Savings & Investments".
                      </p>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                        Target: ${recommendedSavings.toLocaleString()} monthly (20% of income)
                      </div>
                    </>
                  );
                } else if (savingsPercentage >= 20) {
                  return (
                    <>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Excellent! You're saving ${budgetedSavings.toLocaleString()} ({savingsPercentage.toFixed(1)}% of income), exceeding the 20% target.
                      </p>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                        You're saving ${(budgetedSavings - recommendedSavings).toLocaleString()} more than recommended!
                      </div>
                    </>
                  );
                } else if (savingsPercentage >= 15) {
                  return (
                    <>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Good progress! You're saving ${budgetedSavings.toLocaleString()} ({savingsPercentage.toFixed(1)}% of income). Try to reach ${recommendedSavings.toLocaleString()}.
                      </p>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                        Increase by ${(recommendedSavings - budgetedSavings).toLocaleString()} to reach 20% target
                      </div>
                    </>
                  );
                } else {
                  return (
                    <>
                      <p className="text-sm text-orange-600 dark:text-orange-400">
                        You're saving ${budgetedSavings.toLocaleString()} ({savingsPercentage.toFixed(1)}% of income). Increase savings by ${(recommendedSavings - budgetedSavings).toLocaleString()}.
                      </p>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                        Target: ${recommendedSavings.toLocaleString()} monthly (20% of income)
                      </div>
                    </>
                  );
                }
              })()}
            </div>

            {/* Emergency Fund Tips - Based on actual spending patterns */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Emergency Fund Tips</h4>
              {(() => {
                const monthlyExpenses = actualSpending > 0 ? actualSpending : totalBudgetAllocation;
                const emergencyFundMin = monthlyExpenses * 3;
                const emergencyFundMax = monthlyExpenses * 6;
                const currentSavingsRate = budgetData.monthlyIncome > 0 ? (budgetedSavings / budgetData.monthlyIncome) * 100 : 0;
                
                if (monthlyExpenses === 0) {
                  return (
                    <>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Track your expenses to calculate your emergency fund target.
                      </p>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                        Emergency fund should cover 3-6 months of expenses
                      </div>
                    </>
                  );
                } else if (currentSavingsRate >= 20) {
                  return (
                    <>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        With ${monthlyExpenses.toLocaleString()} monthly expenses, build an emergency fund of ${emergencyFundMin.toLocaleString()}-${emergencyFundMax.toLocaleString()}.
                      </p>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                        Your strong savings rate will help build this quickly!
                      </div>
                    </>
                  );
                } else if (currentSavingsRate >= 10) {
                  return (
                    <>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Target emergency fund: ${emergencyFundMin.toLocaleString()}-${emergencyFundMax.toLocaleString()} (based on ${monthlyExpenses.toLocaleString()} monthly expenses).
                      </p>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                        At current savings rate, you'll reach minimum in {Math.ceil(emergencyFundMin / budgetedSavings)} months
                      </div>
                    </>
                  );
                } else {
                  return (
                    <>
                      <p className="text-sm text-orange-600 dark:text-orange-400">
                        Emergency fund target: ${emergencyFundMin.toLocaleString()}-${emergencyFundMax.toLocaleString()}. Increase savings to build this faster.
                      </p>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                        Start with $1,000 emergency starter fund first
                      </div>
                    </>
                  );
                }
              })()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleBudgetBuddy;