import React from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WebSocketProvider } from "./contexts/WebSocketContext";
import { useScrollToTop } from "./hooks/useScrollToTop";
import ScrollToTop from "./components/ScrollToTop";

import { BudgetProvider } from "./contexts/BudgetContext";
import { IncomeExpensesProvider } from "./contexts/IncomeExpensesContext";

import ResponsivePageWrapper from "./components/ResponsivePageWrapper";
import NotFound from "./pages/not-found";

import Explore from "./pages/Explore";
import Insights from "./pages/Insights";
import Goals from "./pages/Goals";
import BudgetBuddy from "./pages/BudgetBuddy";
import TaxCalculatorUSA from "./pages/TaxCalculatorUSA";
import EMICalculator from "./pages/EMICalculator";

import RetirementCalculator from "./pages/RetirementCalculator";
import Calculator401k from "./pages/Calculator401k";
import FinancialEducation from "./pages/FinancialEducation";

import StocksScreener from "./pages/StocksScreener";
import DebtPayoff from "./pages/DebtPayoff";
import RiskAssessment from "./pages/RiskAssessment";
import SpendingPatterns from "./pages/SpendingPatterns";
import InsuranceGuide from "./pages/InsuranceGuide";
import InsuranceHub from "./pages/InsuranceHub";

import InsuranceHubV2 from "./pages/InsuranceHubV2";
import TermInsuranceCalculator from "./pages/TermInsuranceCalculator";
import FinancialFreedomGame from "./pages/FinancialFreedomGame";
import USAWealthBuildingGames from "./pages/USAWealthBuildingGames";
import CreditCardUsage from "./pages/CreditCardUsage";
// New credit-debt pages
import SmartCreditCardUsage from "./pages/SmartCreditCardUsage";
import SmartCreditCard from "./pages/SmartCreditCard";

import DebtPayoffStrategies from "./pages/DebtPayoffStrategies";
import CreditScoreSimulator from "./pages/CreditScoreSimulator";
import FinancialJourney from "./pages/FinancialJourney";


import USAInvestments from "./pages/USAInvestments";
import InvestmentOptionsOverview from "./pages/InvestmentOptionsOverview";



import TaxSavingInvestments from "./pages/TaxSavingInvestments";

import MarketBehaviour from "./pages/MarketBehaviour";
// Removed YesBankFDCalculator - USA focus only
import InvestmentPuzzles from "./pages/InvestmentPuzzlesFixed";
import InvestmentRiddlesSequential from "./pages/InvestmentRiddlesSequential";
import FinancialWordSearch from "./pages/FinancialWordSearch";

import CMSAdmin from "./pages/CMSAdmin";


import TermsOfService from "./pages/TermsOfService";
import DataDeletion from "./pages/DataDeletion";
// New components
import CommunityFeatures from "./pages/CommunityFeatures";
import Community from "./pages/Community";
import TaxHarvesting from "./pages/TaxLossHarvestingCalculator";
import CreditDebtOverview from "./pages/CreditDebtOverview";

// SEO Landing Pages for High-Impression Keywords
import { MortgageCalculator2025, RetirementCalculatorUSA, TaxCalculator2025IRS } from "./pages/SEOLandingPages";
import FinancialCalculators from "./pages/FinancialCalculators";
import FinancialManagement from "./pages/FinancialManagement";
import GoalSettings from "./pages/GoalSettings";
import Guide from "./pages/Guide";
import IrregularIncome from "./pages/IrregularIncome";
import LearningHub from "./pages/LearningHub";

import MarketData from "./pages/MarketData";
import HistoricalChart from "./pages/HistoricalChart";
import PortfolioSimulator from "./pages/PortfolioSimulator";
// Removed RupeesmartKidsEnhanced - USA focus only
import InvestmentMarketMenu from "./pages/InvestmentMarketMenu";
import Profile from "./pages/Profile";
import DollarmentoKids from "./pages/DollarmentoKids";



// Removed ITD API integration for cleaner platform
import Learning from "./pages/Learning";
import RelationshipWithMoney from "./pages/NewRelationshipWithMoney";
import Legal from "./pages/Legal";
// Authentication pages removed - public access only
import Landing from "./pages/Landing";

import FinancialPlanner from "./pages/FinancialPlannerPro";
import SmartLifeManager from "./pages/SmartLifeManager";
import FinancialGrowthLevels from "./pages/FinancialGrowthLevels";

import SmartFinancialChecklist from "./pages/SmartFinancialChecklist";



// Admin pages removed - public platform only
import FinancialHealthReportSidebar from "./pages/FinancialHealthReportSidebar";
import Sitemap from "./pages/Sitemap";

import InvestmentRules from "./pages/InvestmentRules";

import Checkpoints from "./pages/Checkpoints";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
// Calculator Router
import { CalculatorRouter } from "./components/calculators/CalculatorRouter";

function Router() {
  // Wrapper component to apply responsive layout to each route
  const RouteWithResponsiveWrapper = ({ component: Component, ...rest }: any) => (
    <Route {...rest}>
      {(params: any) => (
        <ResponsivePageWrapper showFooter={true}>
          <Component {...params} />
        </ResponsivePageWrapper>
      )}
    </Route>
  );

  // Wrapper for pages that already have their own footer to prevent duplicates
  const RouteWithResponsiveWrapperNoFooter = ({ component: Component, ...rest }: any) => (
    <Route {...rest}>
      {(params: any) => (
        <ResponsivePageWrapper showFooter={false}>
          <Component {...params} />
        </ResponsivePageWrapper>
      )}
    </Route>
  );

  // No authentication required - direct access to all features
  
  return (
    <>
      <ScrollToTop />
      <Switch>
      {/* Landing page without header/sidebar */}
      <Route path="/" component={Landing} />
      
      {/* All other pages with header/sidebar */}
      <Route path="*">
        {() => (
          <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
            <div className="fixed top-0 z-20 w-full">
              <Header />
            </div>
            <Sidebar />
            <div className="flex-1 overflow-x-hidden md:ml-20 mt-16">
              <div className="w-full">
                <Switch>
            <RouteWithResponsiveWrapper path="/explore" component={Explore} />
            <RouteWithResponsiveWrapper path="/insights" component={Insights} />
            <RouteWithResponsiveWrapper path="/goals" component={Goals} />
            <RouteWithResponsiveWrapper path="/budget-buddy" component={BudgetBuddy} />
            
            {/* Override specific calculators that have their own implementations */}
            <RouteWithResponsiveWrapper path="/tax-calculator" component={TaxCalculatorUSA} />
            <RouteWithResponsiveWrapper path="/emi-calculator" component={EMICalculator} />
            
            {/* SEO Landing Pages for High-Impression Keywords */}
            <RouteWithResponsiveWrapper path="/free-mortgage-calculator-2025" component={MortgageCalculator2025} />
            <RouteWithResponsiveWrapper path="/retirement-planning-calculator-usa" component={RetirementCalculatorUSA} />
            <RouteWithResponsiveWrapper path="/tax-calculator-2025-irs" component={TaxCalculator2025IRS} />

            <RouteWithResponsiveWrapper path="/retirement-calculator" component={RetirementCalculator} />
            <RouteWithResponsiveWrapper path="/401k-calculator" component={Calculator401k} />
            <RouteWithResponsiveWrapper path="/term-insurance-calculator" component={TermInsuranceCalculator} />
            {/* Removed yes-bank-fd-calculator route - USA focus only */}
            
            {/* Financial Education and Tools */}
            <RouteWithResponsiveWrapper path="/financial-education" component={FinancialEducation} />
            <RouteWithResponsiveWrapper path="/stocks-screener" component={StocksScreener} />
            <RouteWithResponsiveWrapper path="/debt-payoff" component={DebtPayoff} />
            <RouteWithResponsiveWrapper path="/risk-assessment" component={RiskAssessment} />
            <RouteWithResponsiveWrapperNoFooter path="/spending-patterns" component={SpendingPatterns} />
            <RouteWithResponsiveWrapper path="/insurance-guide" component={InsuranceGuide} />
            <RouteWithResponsiveWrapper path="/insurance-hub" component={InsuranceHubV2} />
            <RouteWithResponsiveWrapper path="/financial-freedom-game" component={FinancialFreedomGame} />
            <RouteWithResponsiveWrapper path="/usa-wealth-building-games" component={USAWealthBuildingGames} />

            <RouteWithResponsiveWrapper path="/credit-card-usage" component={CreditCardUsage} />
            
            {/* Credit & Debt Management pages */}
            <RouteWithResponsiveWrapper path="/credit-debt-overview" component={CreditDebtOverview} />
            <RouteWithResponsiveWrapper path="/smart-credit-card-usage" component={SmartCreditCardUsage} />
            <RouteWithResponsiveWrapper path="/smart-credit-card" component={SmartCreditCard} />

            <RouteWithResponsiveWrapper path="/credit-score-simulator" component={CreditScoreSimulator} />
            <RouteWithResponsiveWrapper path="/debt-payoff-strategies" component={DebtPayoffStrategies} />
            <RouteWithResponsiveWrapper path="/financial-journey" component={FinancialJourney} />


            <RouteWithResponsiveWrapper path="/usa-investments" component={USAInvestments} />
            <RouteWithResponsiveWrapper path="/investment-options-overview" component={InvestmentOptionsOverview} />
            <RouteWithResponsiveWrapper path="/tax-saving-investments" component={TaxSavingInvestments} />


            
            {/* New routes */}
            <RouteWithResponsiveWrapper path="/community-features" component={CommunityFeatures} />
            <RouteWithResponsiveWrapper path="/community" component={Community} />
            <RouteWithResponsiveWrapper path="/financial-calculators" component={FinancialCalculators} />
            <RouteWithResponsiveWrapper path="/financial-management" component={FinancialManagement} />

            <RouteWithResponsiveWrapperNoFooter path="/goal-settings" component={GoalSettings} />
            <RouteWithResponsiveWrapperNoFooter path="/goal-tracker" component={GoalSettings} />

            <RouteWithResponsiveWrapper path="/investment-rules" component={InvestmentRules} />

            <RouteWithResponsiveWrapper path="/checkpoints" component={Checkpoints} />
            <RouteWithResponsiveWrapper path="/guide" component={Guide} />
            <RouteWithResponsiveWrapper path="/profile" component={Profile} />



            {/* Removed ITD API integration route for cleaner platform */}
            <RouteWithResponsiveWrapper path="/irregular-income" component={IrregularIncome} />
            <RouteWithResponsiveWrapper path="/learning-hub" component={LearningHub} />

            <RouteWithResponsiveWrapper path="/investment-market-menu" component={InvestmentMarketMenu} />
            <RouteWithResponsiveWrapper path="/market-data" component={MarketData} />
            <RouteWithResponsiveWrapper path="/historical-chart" component={HistoricalChart} />
            <RouteWithResponsiveWrapper path="/market-behaviour" component={MarketBehaviour} />

            <RouteWithResponsiveWrapper path="/portfolio-simulator" component={PortfolioSimulator} />
            <RouteWithResponsiveWrapper path="/dollarmento-kids" component={DollarmentoKids} />
            <RouteWithResponsiveWrapper path="/tax-harvesting" component={TaxHarvesting} />
            <RouteWithResponsiveWrapper path="/learning" component={Learning} />
            <RouteWithResponsiveWrapper path="/relationship-with-money" component={RelationshipWithMoney} />
            <RouteWithResponsiveWrapper path="/investment-puzzles" component={InvestmentPuzzles} />
            <RouteWithResponsiveWrapper path="/investment-riddles" component={InvestmentRiddlesSequential} />
            <RouteWithResponsiveWrapper path="/smart-life-manager" component={SmartLifeManager} />
            <RouteWithResponsiveWrapper path="/financial-growth-levels" component={FinancialGrowthLevels} />
            <RouteWithResponsiveWrapper path="/smart-financial-checklist" component={SmartFinancialChecklist} />

            <RouteWithResponsiveWrapper path="/financial-health-report" component={FinancialHealthReportSidebar} />

            {/* CMS Admin - Always available for SEO collaboration */}
            <RouteWithResponsiveWrapper path="/admin/cms" component={CMSAdmin} />
            {/* Admin functionality removed - public platform only */}
            <RouteWithResponsiveWrapper path="/word-search" component={FinancialWordSearch} />
            <RouteWithResponsiveWrapper path="/legal" component={Legal} />


            <RouteWithResponsiveWrapper path="/run-financial-scenario" component={FinancialPlanner} />
            {/* Redirect privacy policy to Legal page with privacy tab */}
            <Route path="/privacy-policy">
              {() => {
                window.location.href = '/legal?tab=privacy';
                return null;
              }}
            </Route>
            <Route path="/privacypolicy">
              {() => {
                window.location.href = '/legal?tab=privacy';
                return null;
              }}
            </Route>
            <RouteWithResponsiveWrapper path="/terms-of-service" component={TermsOfService} />
            <RouteWithResponsiveWrapper path="/termsofservice" component={TermsOfService} />
            <RouteWithResponsiveWrapper path="/data-deletion" component={DataDeletion} />
            <RouteWithResponsiveWrapper path="/datadeletion" component={DataDeletion} />
            <RouteWithResponsiveWrapper path="/sitemap" component={Sitemap} />
            {/* Firebase setup removed - using Replit deployment */}
            
            {/* Router for all calculator pages */}
            <Route>
              {() => (
                <ResponsivePageWrapper>
                  <CalculatorRouter />
                </ResponsivePageWrapper>
              )}
            </Route>
            
                    <RouteWithResponsiveWrapper component={NotFound} />
                  </Switch>
                </div>
              </div>
            </div>
          )
        }
        </Route>
      </Switch>
    </>
    );
}

function App() {
  // Apply scroll-to-top functionality across all pages
  useScrollToTop();
  
  return (
    <QueryClientProvider client={queryClient}>
      {/* Default SEO settings for the entire application */}
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>DollarMento - Complete Financial Planning & Calculator Platform USA</title>
        <meta name="description" content="America's most comprehensive financial platform: 45+ calculators, retirement planning, tax optimization, investment tools, budget planners & financial education. Free access to 401k calculator, mortgage calculator, and complete financial planning suite." />
        <meta name="keywords" content="financial calculator, retirement calculator, mortgage calculator, budget calculator, investment calculator, tax calculator, personal finance, financial planning, 401k calculator, savings calculator, loan calculator, financial education, money management, financial planning tools, retirement planning, investment tools, budget planner, wealth building, financial literacy, personal finance calculator, compound interest calculator, debt payoff calculator, financial planning platform, american financial tools, usa financial calculators, dollar mento, comprehensive financial suite" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="DollarMento - Financial Mastery Platform" />
        <meta property="og:description" content="Comprehensive financial education and tools for American investors" />
        <meta property="og:site_name" content="DollarMento" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="DollarMento" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DollarMento" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#f59e0b" />
        
        {/* Structured Data - Organization */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "DollarMento",
            "url": "https://dollarwise.com",
            "logo": "https://dollarwise.com/logo.png",
            "description": "Comprehensive financial mastery education platform for American investors",
            "sameAs": [
              "https://www.facebook.com/rupeesmart",
              "https://twitter.com/rupeesmart",
              "https://www.linkedin.com/company/rupeesmart"
            ]
          }
        `}</script>
      </Helmet>
      
      <ThemeProvider>
        <WebSocketProvider>
          <BudgetProvider>
            <IncomeExpensesProvider>
                <Router />
                <Toaster />
            </IncomeExpensesProvider>
          </BudgetProvider>
        </WebSocketProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
