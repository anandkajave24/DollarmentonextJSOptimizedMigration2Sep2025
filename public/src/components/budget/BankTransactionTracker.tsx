import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBudget } from "@/contexts/BudgetContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  source: "bank" | "credit";
  status: "credited" | "debited" | "pending";
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: new Date(2025, 4, 1), // May 1, 2025
    description: "Salary deposit",
    amount: 85000,
    category: "Income",
    source: "bank",
    status: "credited"
  },
  {
    id: "2",
    date: new Date(2025, 4, 2), // May 2, 2025
    description: "Grocery shopping - Big Bazaar",
    amount: 2500,
    category: "Groceries",
    source: "bank",
    status: "debited"
  },
  {
    id: "3",
    date: new Date(2025, 4, 2), // May 2, 2025
    description: "Electricity bill payment",
    amount: 1800,
    category: "Utilities",
    source: "bank",
    status: "debited"
  },
  {
    id: "4",
    date: new Date(2025, 4, 3), // May 3, 2025
    description: "Amazon purchase - Electronics",
    amount: 15000,
    category: "Shopping",
    source: "credit",
    status: "debited"
  },
  {
    id: "5",
    date: new Date(2025, 4, 3), // May 3, 2025
    description: "Mobile recharge",
    amount: 499,
    category: "Utilities",
    source: "credit",
    status: "debited"
  },
  {
    id: "6",
    date: new Date(2025, 4, 4), // May 4, 2025
    description: "Restaurant - Dinner with family",
    amount: 3200,
    category: "Dining",
    source: "credit",
    status: "debited"
  },
  {
    id: "7",
    date: new Date(2025, 4, 5), // May 5, 2025
    description: "Uber rides",
    amount: 850,
    category: "Transportation",
    source: "credit",
    status: "debited"
  },
  {
    id: "8",
    date: new Date(2025, 4, 5), // May 5, 2025
    description: "Netflix subscription",
    amount: 649,
    category: "Entertainment",
    source: "bank",
    status: "debited"
  },
  {
    id: "9",
    date: new Date(2025, 4, 5), // May 5, 2025
    description: "Credit card payment",
    amount: 25000,
    category: "Credit Card",
    source: "bank",
    status: "debited"
  },
  {
    id: "10",
    date: new Date(2025, 4, 1), // May 1, 2025
    description: "Investment in mutual fund",
    amount: 10000,
    category: "Investment",
    source: "bank",
    status: "debited"
  }
];

const BankTransactionTracker = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [filter, setFilter] = useState<"all" | "bank" | "credit">("all");
  const { addDailyExpense } = useBudget();

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === "all") return true;
    return transaction.source === filter;
  }).sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date, newest first

  const getTotalAmount = (source: "bank" | "credit" | "all", status: "credited" | "debited") => {
    return transactions
      .filter(t => (source === "all" || t.source === source) && t.status === status)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  };

  const bankCredits = getTotalAmount("bank", "credited");
  const bankDebits = getTotalAmount("bank", "debited");
  const creditCardSpending = getTotalAmount("credit", "debited");
  
  const { toast } = useToast();
  
  const handleAddToExpense = (transaction: Transaction) => {
    if (transaction.status === "debited") {
      addDailyExpense({
        date: transaction.date.toISOString(),
        category: transaction.category,
        item: transaction.description,
        amount: transaction.amount,
        note: `Added from ${transaction.source === "bank" ? "bank transaction" : "credit card"}`
      });
      
      // Show toast notification
      toast({
        title: "Added to Expense Tracker",
        description: `₹${transaction.amount.toLocaleString()} for ${transaction.description}`,
      });
    }
  };

  // Format currency in Indian Rupees
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (date: Date) => {
    return format(date, 'dd MMM yyyy');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bank Summary Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Bank Account</CardTitle>
            <CardDescription>Summary of bank transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Credits:</span>
                <span className="font-medium text-green-600">{formatCurrency(bankCredits)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Debits:</span>
                <span className="font-medium text-red-600">{formatCurrency(bankDebits)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between">
                <span className="font-medium">Balance:</span>
                <span className="font-bold">{formatCurrency(bankCredits - bankDebits)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Card Summary Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Credit Card</CardTitle>
            <CardDescription>Summary of credit card usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Spending:</span>
                <span className="font-medium text-red-600">{formatCurrency(creditCardSpending)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Limit Utilized:</span>
                <span className="font-medium">{Math.round((creditCardSpending / 100000) * 100)}%</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between">
                <span className="font-medium">Available Credit:</span>
                <span className="font-bold">{formatCurrency(100000 - creditCardSpending)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Filters */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Transaction Filters</CardTitle>
            <CardDescription>View specific transaction types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className="justify-start"
              >
                <span className="mr-2">🔄</span>
                All Transactions
              </Button>
              <Button
                variant={filter === "bank" ? "default" : "outline"}
                onClick={() => setFilter("bank")}
                className="justify-start"
              >
                <span className="mr-2">🏦</span>
                Bank Transactions
              </Button>
              <Button
                variant={filter === "credit" ? "default" : "outline"}
                onClick={() => setFilter("credit")}
                className="justify-start"
              >
                <span className="mr-2">💳</span>
                Credit Card Transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Your recent bank and credit card activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] rounded-md border p-4">
            <div className="space-y-6">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        {formatDate(transaction.date)}
                        <Badge
                          variant="outline"
                          className={
                            transaction.source === "bank"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                          }
                        >
                          {transaction.source === "bank" ? "Bank" : "Credit Card"}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={transaction.status === "credited" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }
                        >
                          {transaction.status === "credited" ? "Credit" : "Debit"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span 
                        className={`font-semibold ${
                          transaction.status === "credited" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.status === "credited" ? "+" : "-"}{formatCurrency(transaction.amount)}
                      </span>
                      <Badge className="mt-1 bg-gray-100 text-gray-800">{transaction.category}</Badge>
                    </div>
                  </div>
                  
                  {transaction.status === "debited" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="self-end mt-1"
                      onClick={() => handleAddToExpense(transaction)}
                    >
                      Add to Expense Tracker
                    </Button>
                  )}
                  
                  <Separator className="mt-4" />
                </div>
              ))}
              
              {filteredTransactions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No transactions found
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* SMS Integration Notice */}
      <Card className="bg-slate-50 dark:bg-slate-900">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">📱 Connect Your SMS Messages</h3>
            <p className="text-sm text-muted-foreground">
              To automatically track all your bank and credit card transactions, allow RupeeSmart to access your SMS messages. We'll only read financial transaction messages from banks and credit card providers.
            </p>
            <Button className="mt-2 w-full sm:w-auto">
              Connect SMS Messages
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankTransactionTracker;