import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { useBudget } from '@/contexts/BudgetContext';

interface ExpenseTransaction {
  id: string;
  amount: number;
  category: string;
  subcategory: string;
  description: string;
  date: string;
}

const SimpleExpenseTracker: React.FC = () => {
  const { budgetData, dailyExpenses, addDailyExpense } = useBudget();
  const { toast } = useToast();
  
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    subcategory: '',
    description: ''
  });

  // Generate all subcategory options from budget categories
  const getAllSubcategories = () => {
    const subcategories: { value: string; label: string; category: string }[] = [];
    Object.entries(budgetData.categories).forEach(([categoryName, items]) => {
      items.forEach(item => {
        subcategories.push({
          value: item,
          label: item,
          category: categoryName
        });
      });
    });
    return subcategories;
  };

  const subcategoryOptions = getAllSubcategories();

  // Handle adding new expense
  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.subcategory || !newExpense.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Limit description to 3 words maximum
    const limitedDescription = newExpense.description.split(' ').slice(0, 3).join(' ');

    const selectedSubcategory = subcategoryOptions.find(sub => sub.value === newExpense.subcategory);
    const expense = {
      date: format(new Date(), 'yyyy-MM-dd'),
      category: selectedSubcategory?.category || '',
      item: newExpense.subcategory,
      amount: parseFloat(newExpense.amount),
      note: limitedDescription
    };

    addDailyExpense(expense);
    setNewExpense({ amount: '', subcategory: '', description: '' });
    setIsAddExpenseOpen(false);
    
    toast({
      title: "Success",
      description: "Expense added successfully"
    });
  };

  // Group expenses by category for analysis
  const expensesByCategory = useMemo(() => {
    const grouped: Record<string, { expenses: any[]; total: number }> = {};
    
    Object.keys(budgetData.categories).forEach(category => {
      grouped[category] = { expenses: [], total: 0 };
    });

    dailyExpenses.forEach(expense => {
      if (grouped[expense.category]) {
        grouped[expense.category].expenses.push({
          id: expense.date + expense.item,
          amount: expense.amount,
          category: expense.category,
          subcategory: expense.item,
          description: expense.note,
          date: expense.date
        });
        grouped[expense.category].total += expense.amount;
      }
    });

    return grouped;
  }, [dailyExpenses, budgetData.categories]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Manual Transaction Tracking</h2>
                <p className="text-gray-600 dark:text-gray-400">Track your expenses manually for complete budget control and analysis</p>
              </div>
            </div>
            <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Expense</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount ($)</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={newExpense.subcategory} onValueChange={(value) => setNewExpense(prev => ({ ...prev, subcategory: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {subcategoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (max 3 words)</Label>
                    <Input
                      id="description"
                      placeholder="Brief description (3 words max)"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleAddExpense} className="flex-1">
                      Add Expense
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddExpenseOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Total Spending Summary */}
      {dailyExpenses.length > 0 && (
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900 dark:to-orange-900 border-red-200 dark:border-red-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-8 h-8 text-red-600 dark:text-red-400" />
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Total Spending</h3>
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                    ${dailyExpenses.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Across {Object.values(expensesByCategory).filter(cat => cat.expenses.length > 0).length} categories • {dailyExpenses.length} total expenses
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Spending Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Category Spending Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(expensesByCategory).map(([categoryName, categoryData], categoryIndex) => (
              <div key={categoryName} className="space-y-2">
                {/* Category Header Outside Box */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-bold">
                      {categoryIndex + 1}
                    </span>
                    {categoryName}
                  </h3>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      ${categoryData.total.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {categoryData.expenses.length} expense{categoryData.expenses.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                
                {/* Expenses as Single Lines */}
                {categoryData.expenses.length > 0 ? (
                  <div className="space-y-1 ml-8">
                    {categoryData.expenses.map((expense, expenseIndex) => (
                      <div key={expense.id} className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 min-w-[20px]">
                            {expenseIndex + 1}.
                          </span>
                          <div className="text-sm text-gray-800 dark:text-gray-200">
                            <span className="font-medium">{expense.description}</span>
                            <span className="text-gray-600 dark:text-gray-400 ml-2">• {expense.subcategory} • {expense.date}</span>
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-red-600 dark:text-red-400">
                          -${expense.amount.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="ml-8 py-2">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      No expenses recorded in this category
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleExpenseTracker;