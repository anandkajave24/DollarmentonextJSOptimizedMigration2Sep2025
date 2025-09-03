import React from "react";
import { ComingSoonCalculator } from "./ComingSoonCalculator";
import { Route, Switch } from "wouter";
import ScrollToTop from "../ScrollToTop";

// Import implemented calculators
// USA focus only - retirement calculators focus on drawdown planning
import HomeDownPaymentCalculator from "../../pages/HomeDownPaymentCalculator";
import RentVsBuyCalculator from "./RentVsBuyCalculator";
import MortgageCalculator from "../../pages/MortgageCalculator";
import TaxCalculatorUSA from "../../pages/TaxCalculatorUSA";
import RothIRACalculatorUSA from "../../pages/RothIRACalculatorUSA";
import TraditionalIRACalculatorUSA from "../../pages/TraditionalIRACalculatorUSA";
import SocialSecurityCalculatorUSA from "../../pages/SocialSecurityCalculatorUSA";
import DollarCostAveragingCalculator from "../../pages/DollarCostAveragingCalculator";
import CDCalculator from "../../pages/CDCalculator";
import DebtConsolidationCalculator from "../../pages/DebtConsolidationCalculator";
import StudentLoanCalculator from "../../pages/StudentLoanCalculator";
import AutoLoanCalculator from "../../pages/AutoLoanCalculator";
import PersonalLoanCalculator from "../../pages/PersonalLoanCalculator";
import Plan529Calculator from "../../pages/Plan529Calculator";
import CompoundInterestCalculator from "../../pages/CompoundInterestCalculator";
import EmergencyFundCalculator from "../../pages/EmergencyFundCalculator";
import CreditCardPayoffCalculator from "../../pages/CreditCardPayoffCalculator";
import SimpleInterestCalculator from "../../pages/SimpleInterestCalculator";
import CAGRCalculator from "../../pages/CAGRCalculator";
import HSACalculator from "../../pages/HSACalculator";
import LoanPrepaymentCalculator from "../../pages/LoanPrepaymentCalculator";
import CapitalGainsTaxCalculator from "../../pages/CapitalGainsTaxCalculator";
import TaxLossHarvestingCalculator from "../../pages/TaxLossHarvestingCalculator";
import RealEstateCalculator from "../../pages/RealEstateCalculator";
import CurrencyConverter from "../../pages/CurrencyConverter";
import LifeInsuranceCalculator from "../../pages/LifeInsuranceCalculator";
import TermInsuranceCalculator from "../../pages/TermInsuranceCalculator";
import RefinanceCalculator from "../../pages/RefinanceCalculator";
import PayrollTaxCalculator from "../../pages/PayrollTaxCalculator";
// Removed SIPCalculator, FixedDepositCalculator, LumpsumCalculator - USA focus only

// Import new calculator components
import NetWorthCalculator from "./NetWorthCalculator";
import StockAverageCalculator from "./StockAverageCalculator";
import BrokerageFeesCalculator from "./BrokerageFeesCalculator";
import MutualFundCalculator from "./MutualFundCalculator";
import ETFCalculator from "./ETFCalculator";
import SavingsCalculator from "./SavingsCalculator";
import MoneyMarketCalculator from "./MoneyMarketCalculator";

import MoneySavingChallengeGenerator from "./MoneySavingChallengeGenerator";
import BudgetPlannerCalculator from "./BudgetPlannerCalculator";
import RetirementDrawdownCalculator from "./RetirementDrawdownCalculator";

// Catalog of all calculators with their metadata
const calculatorCatalog: Record<string, { 
  title: string; 
  description: string; 
  icon: string;
  category: string;
  isImplemented: boolean;
}> = {
  "sip-calculator": {
    title: "SIP Calculator",
    description: "Calculate the future value of your systematic investment plans and visualize your wealth growth.",
    icon: "savings",
    category: "Investment",
    isImplemented: true
  },
  "emi-calculator": {
    title: "Loan EMI Calculator",
    description: "Calculate EMI, total interest and payments for any loan.",
    icon: "payments",
    category: "Loan",
    isImplemented: true
  },
  "tax-calculator": {
    title: "US Federal Tax Calculator",
    description: "Calculate your federal income tax based on current tax brackets and deductions.",
    icon: "receipt_long",
    category: "Tax",
    isImplemented: true
  },
  "fd-calculator": {
    title: "Fixed Deposit Calculator",
    description: "Calculate returns on your fixed deposits with compound interest calculations.",
    icon: "account_balance",
    category: "Savings",
    isImplemented: true
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
    isImplemented: true
  },
  "retirement-calculator": {
    title: "Retirement Planning Calculator",
    description: "Plan your retirement corpus and monthly savings needed for a comfortable retirement.",
    icon: "elderly",
    category: "Retirement",
    isImplemented: true
  },

  "home-down-payment-calculator": {
    title: "Home Down Payment Calculator",
    description: "Calculate and plan your savings for a home down payment with personalized strategies.",
    icon: "home",
    category: "Savings",
    isImplemented: true
  },
  "rent-vs-buy-calculator": {
    title: "Rent vs Buy Home Calculator",
    description: "Compare the financial impact of renting versus buying a home and make informed housing decisions.",
    icon: "house",
    category: "Savings",
    isImplemented: true
  },
  "roth-ira-calculator": {
    title: "Roth IRA Calculator USA",
    description: "Maximize your tax-free retirement wealth. Plan your retirement with powerful tax-free growth calculations.",
    icon: "savings",
    category: "Retirement",
    isImplemented: true
  },
  "traditional-ira-calculator": {
    title: "Traditional IRA Calculator USA",
    description: "Smart tax-deferred retirement planning. Plan today. Retire wiser with comprehensive tax analysis.",
    icon: "account_balance",
    category: "Retirement",
    isImplemented: true
  },
  "social-security-calculator": {
    title: "Social Security Benefits Calculator USA",
    description: "Plan smarter. Retire confidently. Estimate your monthly Social Security income with comprehensive analysis.",
    icon: "elderly",
    category: "Retirement",
    isImplemented: true
  },
  "dca-calculator": {
    title: "Dollar Cost Averaging (DCA) Calculator",
    description: "Invest steadily. Reduce risk. Grow confidently. Simulate regular investments over time regardless of market volatility.",
    icon: "trending_up",
    category: "Investment",
    isImplemented: true
  },
  "cd-calculator": {
    title: "Certificate of Deposit (CD) Calculator",
    description: "Lock your money. Watch it grow. Know your exact returns. FDIC-insured savings with guaranteed fixed rates.",
    icon: "account_balance",
    category: "Savings",
    isImplemented: true
  },
  "debt-consolidation-calculator": {
    title: "Debt Consolidation Calculator",
    description: "Compare consolidating multiple debts into one payment. See your potential savings and accelerate your payoff journey.",
    icon: "merge",
    category: "Loan",
    isImplemented: true
  },
  "student-loan-calculator": {
    title: "Student Loan Calculator",
    description: "Make smarter decisions about your education debt. Compare repayment plans and find the best strategy for your student loans.",
    icon: "school",
    category: "Loan",
    isImplemented: true
  },
  "auto-loan-calculator": {
    title: "Auto Loan Calculator",
    description: "Calculate monthly car loan payments with taxes, fees, and trade-in value for smart vehicle financing decisions.",
    icon: "directions_car",
    category: "Loan",
    isImplemented: true
  },
  "personal-loan-calculator": {
    title: "Personal Loan Calculator",
    description: "Plan repayment strategies for unsecured personal loans with processing fees and effective rate calculations.",
    icon: "payments",
    category: "Loan",
    isImplemented: true
  },
  "529-calculator": {
    title: "529 Education Savings Plan Calculator",
    description: "Plan for your child's education expenses with tax-advantaged 529 savings and inflation projections.",
    icon: "school",
    category: "Savings",
    isImplemented: true
  },
  "compound-interest-calculator": {
    title: "Compound Interest Calculator",
    description: "Calculate interest earned on both principal and accumulated interest with various compounding frequencies.",
    icon: "trending_up",
    category: "Investment",
    isImplemented: true
  },
  "emergency-fund-calculator": {
    title: "Emergency Fund Calculator",
    description: "Determine how much to save for unexpected expenses based on your monthly costs and financial situation.",
    icon: "security",
    category: "Savings",
    isImplemented: true
  },
  "credit-card-payoff-calculator": {
    title: "Credit Card Payoff Calculator",
    description: "Develop strategies to pay off credit card debt faster using avalanche, snowball, or balanced approaches.",
    icon: "credit_card",
    category: "Loan",
    isImplemented: true
  },
  "simple-interest-calculator": {
    title: "Simple Interest Calculator",
    description: "Calculate interest earned on principal only, with no compounding effects for loans and basic investments.",
    icon: "percent",
    category: "Investment",
    isImplemented: true
  },
  "cagr-calculator": {
    title: "CAGR Calculator",
    description: "Measure the compound annual growth rate of investments to evaluate performance over time.",
    icon: "trending_up",
    category: "Investment",
    isImplemented: true
  },
  "hsa-calculator": {
    title: "HSA Calculator",
    description: "Plan healthcare expenses and build wealth with Health Savings Account triple tax advantages.",
    icon: "shield",
    category: "Tax & Protection",
    isImplemented: true
  },
  "term-insurance-calculator": {
    title: "Term Insurance Calculator",
    description: "Calculate term life insurance premiums and compare coverage options from multiple providers.",
    icon: "shield",
    category: "Tax & Protection",
    isImplemented: true
  },
  "refinance-calculator": {
    title: "Refinance Calculator",
    description: "Analyze if refinancing your mortgage will save money and determine break-even timeline.",
    icon: "refresh_ccw",
    category: "Loan",
    isImplemented: true
  },
  "payroll-tax-calculator": {
    title: "Payroll Tax Calculator",
    description: "Calculate federal, state, and payroll taxes withheld from your paycheck.",
    icon: "users",
    category: "Tax & Protection",
    isImplemented: true
  },
  "net-worth-calculator": {
    title: "Net Worth Calculator",
    description: "Understand your overall financial health by calculating net worth from assets and liabilities.",
    icon: "account_balance",
    category: "Investment",
    isImplemented: true
  },
  "stock-average-calculator": {
    title: "Stock Average Calculator",
    description: "Calculate your average purchase price when buying stocks at different prices over time.",
    icon: "trending_up",
    category: "Investment",
    isImplemented: true
  },
  "brokerage-fees-calculator": {
    title: "Brokerage Fees Calculator",
    description: "Calculate total trading costs including commissions, fees, and expense ratios for informed investing.",
    icon: "receipt",
    category: "Investment",
    isImplemented: true
  },
  "mutual-fund-calculator": {
    title: "Mutual Fund Calculator",
    description: "Forecast the long-term value of your mutual fund investments considering compounding and expense ratios.",
    icon: "pie_chart",
    category: "Investment",
    isImplemented: true
  },
  "etf-calculator": {
    title: "ETF Calculator",
    description: "Compare total returns across multiple ETFs, including fees and growth projections over time.",
    icon: "trending_up",
    category: "Investment",
    isImplemented: true
  },
  "savings-calculator": {
    title: "Savings Calculator",
    description: "Project how your savings account will grow with regular deposits and compound interest over time.",
    icon: "savings",
    category: "Savings",
    isImplemented: true
  },
  "money-market-calculator": {
    title: "Money Market Calculator",
    description: "Estimate potential returns from money market accounts with tiered interest rates and flexible access.",
    icon: "account_balance_wallet",
    category: "Savings",
    isImplemented: true
  },
  "budget-planner-calculator": {
    title: "Budget Planner Calculator",
    description: "Plan and track your monthly budget with detailed category analysis and spending insights.",
    icon: "pie_chart",
    category: "Savings",
    isImplemented: true
  },
  "money-saving-challenge-generator": {
    title: "Money-Saving Challenge Generator",
    description: "Discover fun and creative ways to save money with personalized challenges that make building wealth enjoyable.",
    icon: "star",
    category: "Savings",
    isImplemented: true
  },
  "retirement-drawdown-calculator": {
    title: "Retirement Drawdown Calculator",
    description: "Plan smarter withdrawals from your retirement savings. See how long your money will last with inflation adjustments and portfolio growth.",
    icon: "trending_down",
    category: "Retirement",
    isImplemented: true
  }
};

export function CalculatorRouter() {
  // Add routes for all calculators in our catalog
  return (
    <>
      <ScrollToTop />
      <Switch>
      {/* Add implemented calculators with their specific components */}
      {/* USA focus - comprehensive retirement drawdown planning */}
      <Route path="/home-down-payment-calculator" component={HomeDownPaymentCalculator} />
      <Route path="/rent-vs-buy-calculator" component={RentVsBuyCalculator} />
      <Route path="/mortgage-calculator" component={MortgageCalculator} />
      <Route path="/mortgage-payment-calculator" component={MortgageCalculator} />
      <Route path="/tax-calculator" component={TaxCalculatorUSA} />
      <Route path="/roth-ira-calculator" component={RothIRACalculatorUSA} />
      <Route path="/traditional-ira-calculator" component={TraditionalIRACalculatorUSA} />
      <Route path="/social-security-calculator" component={SocialSecurityCalculatorUSA} />
      <Route path="/dca-calculator" component={DollarCostAveragingCalculator} />
      <Route path="/cd-calculator" component={CDCalculator} />
      <Route path="/debt-consolidation-calculator" component={DebtConsolidationCalculator} />
      <Route path="/student-loan-calculator" component={StudentLoanCalculator} />
      <Route path="/auto-loan-calculator" component={AutoLoanCalculator} />
      <Route path="/personal-loan-calculator" component={PersonalLoanCalculator} />
      <Route path="/529-calculator" component={Plan529Calculator} />
      <Route path="/compound-interest-calculator" component={CompoundInterestCalculator} />
      <Route path="/emergency-fund-calculator" component={EmergencyFundCalculator} />
      <Route path="/credit-card-payoff-calculator" component={CreditCardPayoffCalculator} />
      <Route path="/simple-interest-calculator" component={SimpleInterestCalculator} />
      <Route path="/cagr-calculator" component={CAGRCalculator} />
      <Route path="/hsa-calculator" component={HSACalculator} />
      <Route path="/refinance-calculator" component={RefinanceCalculator} />
      <Route path="/payroll-tax-calculator" component={PayrollTaxCalculator} />
      <Route path="/loan-prepayment-calculator" component={LoanPrepaymentCalculator} />
      <Route path="/capital-gains-tax-calculator" component={CapitalGainsTaxCalculator} />
      <Route path="/tax-loss-harvesting-calculator" component={TaxLossHarvestingCalculator} />
      <Route path="/real-estate-calculator" component={RealEstateCalculator} />
      <Route path="/currency-converter" component={CurrencyConverter} />
      <Route path="/life-insurance-calculator" component={LifeInsuranceCalculator} />
      <Route path="/term-insurance-calculator" component={TermInsuranceCalculator} />
      {/* Removed SIP, FD, and Lumpsum calculators - USA focus only */}
      
      {/* New calculator routes */}
      <Route path="/net-worth-calculator" component={NetWorthCalculator} />
      <Route path="/stock-average-calculator" component={StockAverageCalculator} />
      <Route path="/brokerage-fees-calculator" component={BrokerageFeesCalculator} />
      <Route path="/mutual-fund-calculator" component={MutualFundCalculator} />
      <Route path="/etf-calculator" component={ETFCalculator} />
      <Route path="/savings-calculator" component={SavingsCalculator} />
      <Route path="/money-market-calculator" component={MoneyMarketCalculator} />

      <Route path="/retirement-drawdown-calculator" component={RetirementDrawdownCalculator} />
      <Route path="/money-saving-challenge-generator" component={MoneySavingChallengeGenerator} />
      <Route path="/budget-planner-calculator" component={BudgetPlannerCalculator} />
      
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
    </>
  );
}