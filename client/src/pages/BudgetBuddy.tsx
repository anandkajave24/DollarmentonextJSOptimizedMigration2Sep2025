import React from "react";
import { SEO } from "../components/SEO";
import MonthlyBudget from "../components/budget/MonthlyBudget";
import SimpleExpenseTracker from "../components/budget/SimpleExpenseTracker";
import SimpleBudgetBuddy from "../components/budget/SimpleBudgetBuddy";
import IncomeExpensesOverview from "../components/budget/IncomeExpensesOverview";
import { TabPills, TabItem } from "../components/ui/tab-pills";

const BudgetBuddy = () => {
  const tabs: TabItem[] = [
    {
      value: "dashboard",
      label: "Dashboard",
      content: <SimpleBudgetBuddy />
    },
    {
      value: "budget-setting",
      label: "Budget Allocation",
      content: <MonthlyBudget />
    },
    {
      value: "actual-spendings",
      label: "Actual Spendings",
      content: <SimpleExpenseTracker />
    }
  ];

  return (
    <>
      <SEO 
        title="Budget Buddy - Personal Budget Planner & Expense Tracker USA"
        description="Complete budget management tool for American households. Track income, expenses, and savings across 13+ categories including housing, transportation, healthcare, and 401k planning."
        keywords="budget calculator, personal budget planner, monthly budget calculator, budget tracker, expense planner, household budget calculator, family budget planner, monthly household budget calculator, personal budget planning tool, family expense tracker calculator, zero-based budget calculator, 50/30/20 budget rule calculator, envelope budgeting system, budget management tool, expense tracking calculator, income expense tracker, financial budget planner, money management tool, american budget planner"
        canonical="https://dollarmento.com/budget-buddy"
        ogType="website"
      />

      <div className="flex flex-col gap-6">
        <div className="px-1 py-2">
          <h1 className="text-3xl font-bold mb-1">💰 Budget Buddy</h1>
          <h2 className="text-xl font-medium text-blue-600 mb-2">Fixed Monthly Income</h2>
          <p className="text-muted-foreground">
            Create and manage personalized budgets tailored for American households. Track expenses across categories like housing, transportation, healthcare, and savings with built-in tools for 401(k) planning and emergency fund management.
          </p>
        </div>

        <TabPills tabs={tabs} defaultValue="dashboard" />
      </div>
    </>
  );
};

export default BudgetBuddy;