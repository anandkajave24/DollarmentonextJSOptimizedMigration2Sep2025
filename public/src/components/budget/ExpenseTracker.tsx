import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useBudget, ExpenseItem } from "../../contexts/BudgetContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { format, subDays, isAfter, parseISO, isWithinInterval } from "date-fns";
import { Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

const ExpenseTracker = () => {
  const { budgetData, dailyExpenses, addDailyExpense, editDailyExpense, deleteDailyExpense } = useBudget();
  const { toast } = useToast();
  const [category, setCategory] = useState("Essential");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [usingCreditCard, setUsingCreditCard] = useState(false);
  const [showCreditCardOption, setShowCreditCardOption] = useState(false);
  
  // State for editing expenses
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Initialize with today's date
  const [expenseDate, setExpenseDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  // Set item options based on selected category
  const itemOptions = useMemo(() => {
    return budgetData.categories[category as keyof typeof budgetData.categories] || [];
  }, [category, budgetData.categories]);

  // Set initial item when category changes
  React.useEffect(() => {
    if (itemOptions.length > 0) {
      setItem(itemOptions[0]);
    }
  }, [itemOptions]);

  const handleAddExpense = () => {
    if (!item || !amount || parseFloat(amount) <= 0) {
      return; // Validate input
    }

    const expenseAmount = parseFloat(amount);
    const newExpense: ExpenseItem = {
      date: expenseDate,
      category,
      item,
      amount: expenseAmount,
      note: usingCreditCard ? `${note} [Paid with Credit Card]` : note
    };

    // If editing, just update directly
    if (isEditing && editIndex !== null) {
      // Update existing expense
      editDailyExpense(editIndex, newExpense);
      setIsEditing(false);
      setEditIndex(null);
      setEditDialogOpen(false);
      setUsingCreditCard(false);
      setShowCreditCardOption(false);
    } else {
      // Check if this new expense would exceed monthly income
      const currentMonthExpenses = calculateCurrentMonthExpenses();
      const totalAfterNewExpense = currentMonthExpenses + expenseAmount;
      
      if (totalAfterNewExpense > budgetData.monthlyIncome && budgetData.monthlyIncome > 0 && !showCreditCardOption) {
        // Show credit card option
        setShowCreditCardOption(true);
        toast({
          title: "Expense exceeds monthly income",
          description: "This expense will exceed your monthly income. Please confirm if you want to use a credit card or find additional income sources.",
          variant: "destructive",
        });
        return; // Don't proceed until user confirms
      }
      
      // After confirmation or if expense doesn't exceed income, add it
      addDailyExpense(newExpense);
      
      // If using credit card consistently, give warning about financial sustainability
      if (usingCreditCard) {
        const creditCardCount = dailyExpenses.filter(exp => exp.note.includes("[Paid with Credit Card]")).length;
        if (creditCardCount >= 3) {
          toast({
            title: "Frequent Credit Card Usage",
            description: "You're frequently using credit cards for expenses. Consider finding additional income sources to avoid potential debt issues.",
            variant: "destructive",
            duration: 7000, // Show for longer
          });
        }
      }
    }

    // Reset form fields 
    setAmount("");
    setNote("");
    setUsingCreditCard(false);
    setShowCreditCardOption(false);
  };
  
  // Helper function to calculate current month expenses
  const calculateCurrentMonthExpenses = () => {
    const currentMonth = format(today, 'yyyy-MM');
    return dailyExpenses
      .filter(expense => expense.date.startsWith(currentMonth))
      .reduce((sum, expense) => sum + expense.amount, 0);
  };
  
  // Open the edit dialog with the expense data
  const handleEditExpense = (expense: ExpenseItem, index: number) => {
    setExpenseDate(expense.date);
    setCategory(expense.category);
    setItem(expense.item);
    setAmount(expense.amount.toString());
    setNote(expense.note);
    setIsEditing(true);
    setEditIndex(index);
    setEditDialogOpen(true);
  };
  
  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditIndex(null);
    setEditDialogOpen(false);
    
    // Reset form
    setExpenseDate(format(new Date(), "yyyy-MM-dd"));
    setCategory("Essential");
    setAmount("");
    setNote("");
  };

  // Calculate summary metrics
  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");

  const todayExpenses = useMemo(() => {
    return dailyExpenses
      .filter(expense => expense.date === todayStr)
      .reduce((sum, expense) => sum + expense.amount, 0);
  }, [dailyExpenses, todayStr]);

  const weekExpenses = useMemo(() => {
    const weekAgo = subDays(today, 7);
    return dailyExpenses
      .filter(expense => {
        const expDate = parseISO(expense.date);
        return isAfter(expDate, weekAgo);
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
  }, [dailyExpenses, today]);

  const monthExpenses = useMemo(() => {
    const monthAgo = subDays(today, 30);
    return dailyExpenses
      .filter(expense => {
        const expDate = parseISO(expense.date);
        return isAfter(expDate, monthAgo);
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
  }, [dailyExpenses, today]);

  // Daily totals for trend chart
  const dailyTotals = useMemo(() => {
    const last14Days = Array.from({ length: 14 }, (_, i) => {
      const date = subDays(today, 13 - i);
      return {
        date,
        dateStr: format(date, "yyyy-MM-dd"),
        displayDate: format(date, "MMM dd"),
        amount: 0
      };
    });

    // Sum expenses by date
    dailyExpenses.forEach(expense => {
      const dayData = last14Days.find(day => day.dateStr === expense.date);
      if (dayData) {
        dayData.amount += expense.amount;
      }
    });

    return last14Days;
  }, [dailyExpenses, today]);

  return (
    <div className="space-y-6">
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Expense' : 'Add New Expense'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update expense details below' : 'Enter the details of your expense'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="space-y-2">
              <Label htmlFor="edit-expense-date">Date</Label>
              <Input
                id="edit-expense-date"
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                max={format(today, "yyyy-MM-dd")}
                className="bg-gray-50 border-2 border-gray-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-expense-category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="edit-expense-category" className="bg-gray-50 border-2 border-gray-200">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(budgetData.categories).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-expense-item">Item</Label>
              <Select value={item} onValueChange={setItem}>
                <SelectTrigger id="edit-expense-item" className="bg-gray-50 border-2 border-gray-200">
                  <SelectValue placeholder="Select item" />
                </SelectTrigger>
                <SelectContent>
                  {itemOptions.map((itemOption) => (
                    <SelectItem key={itemOption} value={itemOption}>
                      {itemOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-expense-amount">Amount (₹)</Label>
              <Input
                id="edit-expense-amount"
                type="number"
                min={0}
                step={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="bg-gray-50 border-2 border-gray-200"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-expense-note">Note (optional)</Label>
            <Input
              id="edit-expense-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add details about the expense"
              className="bg-gray-50 border-2 border-gray-200"
            />
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddExpense}
              disabled={!item || !amount || parseFloat(amount) <= 0}
            >
              {isEditing ? 'Update Expense' : 'Add Expense'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
          <CardTitle className="text-xl font-bold text-black dark:text-white">Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expense-date">Date</Label>
              <Input
                id="expense-date"
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                max={format(today, "yyyy-MM-dd")}
                className="bg-gray-50 border-2 border-gray-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expense-category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="expense-category" className="bg-gray-50 border-2 border-gray-200">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(budgetData.categories).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expense-item">Item</Label>
              <Select value={item} onValueChange={setItem}>
                <SelectTrigger id="expense-item" className="bg-gray-50 border-2 border-gray-200">
                  <SelectValue placeholder="Select item" />
                </SelectTrigger>
                <SelectContent>
                  {itemOptions.map((itemOption) => (
                    <SelectItem key={itemOption} value={itemOption}>
                      {itemOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="expense-amount">Amount (₹)</Label>
              <Input
                id="expense-amount"
                type="number"
                min={0}
                step={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="bg-gray-50 border-2 border-gray-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expense-note">Note (optional)</Label>
              <Input
                id="expense-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add details about the expense"
                className="bg-gray-50 border-2 border-gray-200"
              />
            </div>
          </div>
          
          {showCreditCardOption ? (
            <div className="mt-6 space-y-4 p-4 border border-amber-300 rounded-lg bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">Warning: Expense Exceeds Monthly Income</h3>
                  <div className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                    <p>This expense of ₹{parseFloat(amount).toLocaleString()} will exceed your monthly income. You have a few options:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Reduce the expense amount</li>
                      <li>Find additional income sources</li>
                      <li>Use a credit card (not recommended for non-essential expenses)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex items-center">
                <input
                  id="use-credit-card"
                  type="checkbox"
                  className="h-4 w-4 text-primary border-gray-300 rounded"
                  checked={usingCreditCard}
                  onChange={(e) => setUsingCreditCard(e.target.checked)}
                />
                <label htmlFor="use-credit-card" className="ml-2 text-sm text-amber-700 dark:text-amber-300">
                  I understand and want to use a credit card for this expense
                </label>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowCreditCardOption(false);
                    setUsingCreditCard(false);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  disabled={!usingCreditCard}
                  onClick={handleAddExpense}
                >
                  Proceed with Credit Card
                </Button>
              </div>
            </div>
          ) : (
            <Button 
              className="mt-6 w-full" 
              onClick={handleAddExpense}
              disabled={!item || !amount || parseFloat(amount) <= 0}
            >
              Add Expense
            </Button>
          )}
        </CardContent>
      </Card>
      
      {dailyExpenses.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-black dark:text-white text-sm font-semibold mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">Today's Expenses</h3>
                  <p className="text-3xl font-bold mt-2">₹{todayExpenses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-black dark:text-white text-sm font-semibold mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">This Week</h3>
                  <p className="text-3xl font-bold mt-2">₹{weekExpenses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-black dark:text-white text-sm font-semibold mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">This Month</h3>
                  <p className="text-3xl font-bold mt-2">₹{monthExpenses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
              <CardTitle className="text-xl font-bold text-black dark:text-white">Expense Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dailyTotals}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="displayDate"
                    tickMargin={10}
                  />
                  <YAxis 
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <RechartsTooltip 
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, "Expenses"]}
                    labelFormatter={(label: string) => `Date: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
              <CardTitle className="text-xl font-bold text-black dark:text-white">Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Note</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dailyExpenses.slice(0, 10).map((expense, index) => (
                      <TableRow key={index}>
                        <TableCell>{format(parseISO(expense.date), "dd MMM yyyy")}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell>{expense.item}</TableCell>
                        <TableCell className="text-right font-medium">
                          ₹{expense.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{expense.note}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleEditExpense(expense, index)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => deleteDailyExpense(index)}
                                className="text-red-600 dark:text-red-400"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          {/* Net Financial Summary */}
          <Card className="mt-8 bg-gray-100 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700">
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
              <CardTitle className="text-center text-xl font-bold text-black dark:text-white">Expense Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                  <h3 className="text-sm font-semibold text-black dark:text-white mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">Daily Average</h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ₹{Math.round(monthExpenses / 30).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on last 30 days
                  </p>
                </div>
                
                <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                  <h3 className="text-sm font-semibold text-black dark:text-white mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">Largest Expense</h3>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{Math.max(...dailyExpenses.map(e => e.amount)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Highest single transaction
                  </p>
                </div>
                
                <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                  <h3 className="text-sm font-semibold text-black dark:text-white mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">Current Month Total</h3>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    ₹{monthExpenses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Monthly spending so far
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ExpenseTracker;