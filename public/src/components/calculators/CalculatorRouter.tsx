import React from "react";
import { ComingSoonCalculator } from "./ComingSoonCalculator";
import { Route, Switch } from "wouter";

// Import implemented calculators
import HomeLoanCalculator from "../../pages/HomeLoanCalculator";
import PPFCalculator from "../../pages/PPFCalculator";
import SWPCalculator from "../../pages/SWPCalculator";
import HomeDownPaymentCalculator from "../../pages/HomeDownPaymentCalculator";

// Catalog of all calculators with their metadata
const calculatorCatalog: Record<string, { 
  title: string; 
  description: string; 
  icon: string;
  category: string;
  isImplemented: boolean;
}> = {
  "home-loan-calculator": {
    title: "Home Loan EMI Calculator",
    description: "Calculate your monthly EMI, total interest payable, and amortization schedule for home loans.",
    icon: "home",
    category: "Loan",
    isImplemented: true
  },
  "sip-calculator": {
    title: "SIP Calculator",
    description: "Calculate the future value of your systematic investment plans and visualize your wealth growth.",
    icon: "savings",
    category: "Investment",
    isImplemented: false
  },
  "emi-calculator": {
    title: "Loan EMI Calculator",
    description: "Calculate EMI, total interest and payments for any loan.",
    icon: "payments",
    category: "Loan",
    isImplemented: false
  },
  "tax-calculator": {
    title: "Income Tax Calculator",
    description: "Estimate your income tax liability for the current financial year based on the latest tax slabs.",
    icon: "receipt_long",
    category: "Tax",
    isImplemented: false
  },
  "fd-calculator": {
    title: "Fixed Deposit Calculator",
    description: "Calculate returns on your fixed deposits with compound interest calculations.",
    icon: "account_balance",
    category: "Savings",
    isImplemented: false
  },
  "ppf-calculator": {
    title: "PPF Calculator",
    description: "Estimate returns on your Public Provident Fund investments over the 15-year lock-in period.",
    icon: "account_balance_wallet",
    category: "Savings",
    isImplemented: true
  },
  "lumpsum-calculator": {
    title: "Lumpsum Calculator",
    description: "Calculate the future value of your one-time investments with compound interest.",
    icon: "money",
    category: "Investment",
    isImplemented: false
  },
  "retirement-calculator": {
    title: "Retirement Planning Calculator",
    description: "Plan your retirement corpus and monthly savings needed for a comfortable retirement.",
    icon: "elderly",
    category: "Retirement",
    isImplemented: false
  },
  "swp-calculator": {
    title: "SWP Calculator",
    description: "Plan your systematic withdrawals from investments for regular income during retirement.",
    icon: "account_balance",
    category: "Retirement",
    isImplemented: true
  },
  "home-down-payment-calculator": {
    title: "Home Down Payment Calculator",
    description: "Calculate and plan your savings for a home down payment with personalized strategies.",
    icon: "home",
    category: "Savings",
    isImplemented: true
  }
};

export function CalculatorRouter() {
  // Add routes for all calculators in our catalog
  return (
    <Switch>
      {/* Add implemented calculators with their specific components */}
      <Route path="/home-loan-calculator" component={HomeLoanCalculator} />
      <Route path="/ppf-calculator" component={PPFCalculator} />
      <Route path="/swp-calculator" component={SWPCalculator} />
      <Route path="/home-down-payment-calculator" component={HomeDownPaymentCalculator} />
      
      {/* Generic handler for all other calculators */}
      {Object.entries(calculatorCatalog).map(([route, details]) => {
        // Skip routes that have specific implementations already
        if (details.isImplemented) return null;
        
        return (
          <Route key={route} path={`/${route}`}>
            <ComingSoonCalculator
              title={details.title}
              description={details.description}
              icon={details.icon}
              calculatorType={details.category}
            />
          </Route>
        );
      })}
      
      {/* Fallback for any calculator routes not in our catalog */}
      <Route path="/:calculatorRoute">
        {(params) => {
          const route = params.calculatorRoute;
          // Only handle routes that end with -calculator
          if (!route.endsWith('-calculator')) return null;
          
          // Default metadata for unknown calculators
          const title = route
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
            
          return (
            <ComingSoonCalculator
              title={title}
              description={`Calculate and plan your finances with our ${title}.`}
              calculatorType="Financial"
            />
          );
        }}
      </Route>
    </Switch>
  );
}