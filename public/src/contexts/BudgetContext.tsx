import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "../hooks/use-toast";

// Types
export type ExpenseItem = {
  date: string;
  category: string;
  item: string;
  amount: number;
  note: string;
};

export type SavingsGoal = {
  name: string;
  targetAmount: number;
  targetDate: string;
  priority: 'High' | 'Medium' | 'Low';
  currentAmount: number;
};

export type BudgetCategory = {
  Essential: string[];
  Lifestyle: string[];
  Financial: string[];
  Others: string[];
};

export interface BudgetData {
  monthlyIncome: number;
  expenses: Record<string, number>;
  savingsGoal: number;
  targetSavingsRate: number;
  categories: BudgetCategory;
  homeLoanData?: {
    emi: number;
    loanAmount: number;
    interestRate: number;
    loanTenure: number;
    emiToIncomeRatio: number;
  };
}

interface BudgetContextType {
  budgetData: BudgetData;
  dailyExpenses: ExpenseItem[];
  savingsGoals: SavingsGoal[];
  updateIncome: (income: number) => void;
  updateExpense: (category: string, item: string, amount: number) => void;
  updateTargetSavingsRate: (rate: number) => void;
  addDailyExpense: (expense: ExpenseItem) => void;
  editDailyExpense: (index: number, expense: ExpenseItem) => void;
  deleteDailyExpense: (index: number) => void;
  addSavingsGoal: (goal: SavingsGoal) => void;
  updateSavingsGoalProgress: (index: number, amount: number) => void;
  updateHomeLoanData: (data: BudgetData['homeLoanData']) => void;
}

// Create context
const BudgetContext = createContext<BudgetContextType | null>(null);

// Default budget data
export const DEFAULT_BUDGET_DATA: BudgetData = {
  monthlyIncome: 0,
  expenses: {},
  savingsGoal: 0,
  targetSavingsRate: 20, // Default target savings rate of 20%
  categories: {
    Essential: [
      'Groceries',
      'Rent/Home EMI',
      'Utilities',
      'House Help Salary',
      'Milk/Daily Essentials',
      'Transportation',
      'Subscriptions'
    ],
    Lifestyle: [
      'Dining Out',
      'Entertainment',
      'Shopping',
      'Personal Care'
    ],
    Financial: [
      'Insurance',
      'Investments',
      'Loan Payments',
      'Emergency Fund'
    ],
    Others: [
      'Education',
      'Healthcare',
      'Miscellaneous'
    ]
  }
};

// Provider component
export function BudgetProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [budgetData, setBudgetData] = useState<BudgetData>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('budgetData');
    return saved ? JSON.parse(saved) : DEFAULT_BUDGET_DATA;
  });
  
  const [dailyExpenses, setDailyExpenses] = useState<ExpenseItem[]>(() => {
    const saved = localStorage.getItem('dailyExpenses');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(() => {
    const saved = localStorage.getItem('savingsGoals');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('budgetData', JSON.stringify(budgetData));
  }, [budgetData]);
  
  useEffect(() => {
    localStorage.setItem('dailyExpenses', JSON.stringify(dailyExpenses));
  }, [dailyExpenses]);
  
  useEffect(() => {
    localStorage.setItem('savingsGoals', JSON.stringify(savingsGoals));
  }, [savingsGoals]);
  
  // Update functions
  const updateIncome = (income: number) => {
    setBudgetData(prev => ({ ...prev, monthlyIncome: income }));
  };
  
  const updateExpense = (category: string, item: string, amount: number) => {
    const key = `${category}_${item}`;
    
    // Calculate the total expenses if this expense is updated
    setBudgetData(prev => {
      // Calculate what the total expenses would be with this new amount
      const currentAmount = prev.expenses[key] || 0;
      const difference = amount - currentAmount;
      
      // Calculate current total expenses (excluding the current item)
      const currentTotalExpenses = Object.entries(prev.expenses).reduce((sum, [k, val]) => {
        // Don't include the current item being updated
        return k === key ? sum : sum + val;
      }, 0);
      
      // Calculate what the new total would be
      const newTotalExpenses = currentTotalExpenses + amount;
      
      // Check if the new total exceeds income
      if (newTotalExpenses > prev.monthlyIncome && prev.monthlyIncome > 0) {
        // Calculate how much we need to reduce expenses
        const excessAmount = newTotalExpenses - prev.monthlyIncome;
        
        // Find other expenses that could be reduced
        const otherExpenses = Object.entries(prev.expenses)
          .filter(([k, val]) => k !== key && val > 0)
          .sort((a, b) => b[1] - a[1]); // Sort by amount, highest first
        
        let suggestions = '';
        
        if (otherExpenses.length > 0) {
          const topExpenses = otherExpenses.slice(0, 2); // Get top 2 other expenses
          suggestions = `Consider reducing: ${topExpenses.map(([k, val]) => {
            const [cat, itm] = k.split('_');
            return `${itm} (₹${val.toLocaleString()})`;
          }).join(', ')}`;
        }
        
        // Display a warning toast
        toast({
          title: "Exceeds monthly income",
          description: `Total budget exceeds income by ₹${excessAmount.toLocaleString()}. ${suggestions}`,
          variant: "destructive",
        });
      }
      
      // Still update the amount even if it exceeds income
      return {
        ...prev,
        expenses: {
          ...prev.expenses,
          [key]: amount
        }
      };
    });
  };
  
  const addDailyExpense = (expense: ExpenseItem) => {
    setDailyExpenses(prev => [expense, ...prev]);
    toast({
      title: "Expense added",
      description: `₹${expense.amount} added for ${expense.item}`,
    });
  };
  
  const editDailyExpense = (index: number, expense: ExpenseItem) => {
    setDailyExpenses(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = expense;
      }
      return updated;
    });
    toast({
      title: "Expense updated",
      description: `₹${expense.amount} for ${expense.item}`,
    });
  };
  
  const deleteDailyExpense = (index: number) => {
    setDailyExpenses(prev => {
      const updated = [...prev];
      const deleted = updated.splice(index, 1)[0];
      toast({
        title: "Expense deleted",
        description: `₹${deleted.amount} for ${deleted.item}`,
      });
      return updated;
    });
  };
  
  const addSavingsGoal = (goal: SavingsGoal) => {
    setSavingsGoals(prev => [...prev, goal]);
    toast({
      title: "Savings goal added",
      description: `${goal.name} with target ₹${goal.targetAmount}`,
    });
  };
  
  const updateSavingsGoalProgress = (index: number, amount: number) => {
    setSavingsGoals(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = { ...updated[index], currentAmount: amount };
      }
      return updated;
    });
    toast({
      title: "Goal progress updated",
      description: `New amount: ₹${amount}`,
    });
  };
  
  // Update target savings rate
  const updateTargetSavingsRate = (rate: number) => {
    setBudgetData(prev => ({ ...prev, targetSavingsRate: rate }));
    toast({
      title: "Savings target updated",
      description: `New target: ${rate}% of income`,
    });
  };
  
  // Update home loan data
  const updateHomeLoanData = (data: BudgetData['homeLoanData']) => {
    setBudgetData(prev => ({ ...prev, homeLoanData: data }));
    
    // Also update the "Rent/Home EMI" expense if the EMI exists
    if (data && data.emi > 0) {
      const key = "Essential_Rent/Home EMI";
      setBudgetData(prev => ({
        ...prev,
        expenses: {
          ...prev.expenses,
          [key]: data.emi
        }
      }));
      
      // Notify the user
      toast({
        title: "Home Loan EMI updated",
        description: `Monthly EMI of ₹${data.emi.toLocaleString()} has been synced with your budget`,
      });
    }
  };
  
  return (
    <BudgetContext.Provider
      value={{
        budgetData,
        dailyExpenses,
        savingsGoals,
        updateIncome,
        updateExpense,
        updateTargetSavingsRate,
        addDailyExpense,
        editDailyExpense,
        deleteDailyExpense,
        addSavingsGoal,
        updateSavingsGoalProgress,
        updateHomeLoanData
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

// Hook for using the budget context
export function useBudget() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
}