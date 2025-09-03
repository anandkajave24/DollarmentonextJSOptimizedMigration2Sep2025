import React from "react";
import { Helmet } from "react-helmet";
import MonthlyBudget from "../components/budget/MonthlyBudget";
import ExpenseTracker from "../components/budget/ExpenseTracker";
import IntegratedInsightsPlanning from "../components/budget/IntegratedInsightsPlanning";
import SavingsGoals from "../components/budget/SavingsGoals";
import SpendingInsights from "../components/budget/SpendingInsights";
import { ResetBudgetData } from "../components/budget/ResetBudgetData";
import { TabPills, TabItem } from "../components/ui/tab-pills";

const BudgetBuddy = () => {
  const tabs: TabItem[] = [
    {
      value: "monthly",
      label: "Monthly Budget",
      content: <MonthlyBudget />
    },
    {
      value: "expenses",
      label: "Expense Tracker",
      content: <ExpenseTracker />
    },
    {
      value: "spending-insights",
      label: "Spending Insights",
      content: <SpendingInsights />
    },
    {
      value: "insights",
      label: "Insights & Planning",
      content: <IntegratedInsightsPlanning />
    },
    {
      value: "savings",
      label: "Savings Goals",
      content: <SavingsGoals />
    }
  ];

  return (
    <>
      <Helmet>
        <title>Budget Buddy | RupeeSmart</title>
      </Helmet>

      <div className="flex flex-col gap-6">
        <div className="px-1 py-2">
          <h1 className="text-3xl font-bold mb-1">💰 Budget Buddy</h1>
          <h2 className="text-xl font-medium text-green-600 mb-2">Fixed Monthly Income</h2>
          <p className="text-muted-foreground">
            Create and manage personalized budgets with fixed monthly income to keep your spending in check and achieve financial goals.
          </p>
        </div>

        <TabPills tabs={tabs} defaultValue="monthly" />
        
        {/* Reset button for clearing budget data */}
        <div className="mt-4 max-w-md mx-auto">
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
            <h3 className="text-sm font-semibold mb-2">Debug Tools</h3>
            <p className="text-xs text-muted-foreground mb-2">
              Use this button to reset all budget data if you're experiencing issues or want to start fresh.
            </p>
            <ResetBudgetData />
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetBuddy;