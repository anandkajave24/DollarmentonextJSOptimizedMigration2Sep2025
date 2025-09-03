"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types
export interface IncomeSource {
  id: number;
  name: string;
  type: "salary" | "freelance" | "contract" | "passive" | "other";
  amount: number;
  frequency: "weekly" | "monthly" | "quarterly" | "annual";
  reliability: number; // 1-10 scale, 10 being most reliable
  isGuaranteed: boolean;
}

export interface ExpenseItem {
  id: number;
  name: string;
  amount: number;
  category: "essential" | "important" | "discretionary";
  frequency: "weekly" | "monthly" | "quarterly" | "annual";
}

interface IncomeExpensesData {
  incomeSources: IncomeSource[];
  expenses: ExpenseItem[];
}

interface IncomeExpensesContextType {
  data: IncomeExpensesData;
  addIncomeSource: (source: Omit<IncomeSource, "id">) => void;
  updateIncomeSource: (id: number, source: Partial<IncomeSource>) => void;
  deleteIncomeSource: (id: number) => void;
  addExpense: (expense: Omit<ExpenseItem, "id">) => void;
  updateExpense: (id: number, expense: Partial<ExpenseItem>) => void;
  deleteExpense: (id: number) => void;
  getExpectedMonthlyIncome: () => number;
  getGuaranteedMonthlyIncome: () => number;
  getTotalMonthlyExpenses: () => number;
  getExpensesByCategory: (category: "essential" | "important" | "discretionary") => number;
}

// Create context
const IncomeExpensesContext = createContext<IncomeExpensesContextType | null>(null);

// Default data
const DEFAULT_DATA: IncomeExpensesData = {
  incomeSources: [
    {
      id: 1,
      name: "Primary Job",
      type: "salary",
      amount: 6000,
      frequency: "monthly",
      reliability: 10,
      isGuaranteed: true
    }
  ],
  expenses: [
    {
      id: 1,
      name: "Rent",
      amount: 1800,
      category: "essential",
      frequency: "monthly"
    },
    {
      id: 2,
      name: "Groceries",
      amount: 400,
      category: "essential",
      frequency: "monthly"
    },
    {
      id: 3,
      name: "Car Payment",
      amount: 350,
      category: "important",
      frequency: "monthly"
    },
    {
      id: 4,
      name: "Entertainment",
      amount: 200,
      category: "discretionary",
      frequency: "monthly"
    }
  ]
};

// Provider component
export const IncomeExpensesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<IncomeExpensesData>(DEFAULT_DATA);

  useEffect(() => {
    // Load data on client side only
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem("incomeExpensesData");
      if (saved) {
        try {
          setData(JSON.parse(saved));
        } catch (e) {
          console.error('Error parsing income expenses data:', e);
        }
      }
    }
  }, []);

  // Save to session storage whenever data changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("incomeExpensesData", JSON.stringify(data));
    }
  }, [data]);

  // Helper functions
  const convertToMonthly = (amount: number, frequency: string): number => {
    switch (frequency) {
      case "weekly":
        return amount * 4.33; // average weeks in a month
      case "quarterly":
        return amount / 3;
      case "annual":
        return amount / 12;
      default: // monthly
        return amount;
    }
  };

  const getExpectedMonthlyIncome = (): number => {
    return data.incomeSources.reduce((total, source) => {
      return total + convertToMonthly(source.amount, source.frequency);
    }, 0);
  };

  const getGuaranteedMonthlyIncome = (): number => {
    return data.incomeSources
      .filter(source => source.isGuaranteed && source.reliability >= 8)
      .reduce((total, source) => {
        return total + convertToMonthly(source.amount, source.frequency);
      }, 0);
  };

  const getTotalMonthlyExpenses = (): number => {
    return data.expenses.reduce((total, expense) => {
      return total + convertToMonthly(expense.amount, expense.frequency);
    }, 0);
  };

  const getExpensesByCategory = (category: "essential" | "important" | "discretionary"): number => {
    return data.expenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => {
        return total + convertToMonthly(expense.amount, expense.frequency);
      }, 0);
  };

  const addIncomeSource = (source: Omit<IncomeSource, "id">) => {
    const newId = Math.max(...data.incomeSources.map(s => s.id), 0) + 1;
    setData(prev => ({
      ...prev,
      incomeSources: [...prev.incomeSources, { ...source, id: newId }]
    }));
  };

  const updateIncomeSource = (id: number, updates: Partial<IncomeSource>) => {
    setData(prev => ({
      ...prev,
      incomeSources: prev.incomeSources.map(source =>
        source.id === id ? { ...source, ...updates } : source
      )
    }));
  };

  const deleteIncomeSource = (id: number) => {
    setData(prev => ({
      ...prev,
      incomeSources: prev.incomeSources.filter(source => source.id !== id)
    }));
  };

  const addExpense = (expense: Omit<ExpenseItem, "id">) => {
    const newId = Math.max(...data.expenses.map(e => e.id), 0) + 1;
    setData(prev => ({
      ...prev,
      expenses: [...prev.expenses, { ...expense, id: newId }]
    }));
  };

  const updateExpense = (id: number, updates: Partial<ExpenseItem>) => {
    setData(prev => ({
      ...prev,
      expenses: prev.expenses.map(expense =>
        expense.id === id ? { ...expense, ...updates } : expense
      )
    }));
  };

  const deleteExpense = (id: number) => {
    setData(prev => ({
      ...prev,
      expenses: prev.expenses.filter(expense => expense.id !== id)
    }));
  };

  const value: IncomeExpensesContextType = {
    data,
    addIncomeSource,
    updateIncomeSource,
    deleteIncomeSource,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpectedMonthlyIncome,
    getGuaranteedMonthlyIncome,
    getTotalMonthlyExpenses,
    getExpensesByCategory
  };

  return (
    <IncomeExpensesContext.Provider value={value}>
      {children}
    </IncomeExpensesContext.Provider>
  );
};

// Hook to use the context
export const useIncomeExpenses = () => {
  const context = useContext(IncomeExpensesContext);
  if (!context) {
    throw new Error("useIncomeExpenses must be used within an IncomeExpensesProvider");
  }
  return context;
};