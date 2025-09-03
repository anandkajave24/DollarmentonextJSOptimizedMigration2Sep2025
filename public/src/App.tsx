import React from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WebSocketProvider } from "./contexts/WebSocketContext";
import { AuthProvider } from "./hooks/use-auth";
import { BudgetProvider } from "./contexts/BudgetContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import ResponsivePageWrapper from "./components/ResponsivePageWrapper";
import NotFound from "./pages/not-found";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import Insights from "./pages/Insights";
import Goals from "./pages/Goals";
import BudgetBuddy from "./pages/BudgetBuddy";
import TaxCalculator from "./pages/TaxCalculator";
import EMICalculator from "./pages/EMICalculator";
import SIPCalculator from "./pages/SIPCalculator";
import RetirementCalculator from "./pages/RetirementCalculator";
import FinancialEducation from "./pages/FinancialEducation";
import FinancialDashboard from "./pages/Dashboard";
import StocksScreener from "./pages/StocksScreener";
import DebtPayoff from "./pages/DebtPayoff";
import RiskAssessment from "./pages/RiskAssessment";
import SpendingPatterns from "./pages/SpendingPatterns";
import InsuranceGuide from "./pages/InsuranceGuide";
import InsuranceHub from "./pages/InsuranceHub";
import InsuranceHubSimple from "./pages/InsuranceHubSimple";
import InsuranceHubV2 from "./pages/InsuranceHubV2";
import TermInsuranceCalculator from "./pages/TermInsuranceCalculator";
import FinancialFreedomGame from "./pages/FinancialFreedomGame";
import CreditCardUsage from "./pages/CreditCardUsage";
// New credit-debt pages
import SmartCreditCardUsage from "./pages/SmartCreditCardUsage";
import SmartCreditCard from "./pages/SmartCreditCard";
import CreditScore from "./pages/CreditScore";
import DebtPayoffStrategies from "./pages/DebtPayoffStrategies";
// import FinancialJourney from "./pages/NewFinancialJourney";

import AlertSettings from "./pages/AlertSettings";
import AlertDemo from "./pages/AlertDemo";
import IndianInvestments from "./pages/IndianInvestments";
import InvestmentOptionsOverview from "./pages/InvestmentOptionsOverview";
import NotificationsPage from "./pages/Notifications";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import TaxFilingGuide from "./pages/TaxFilingGuide";
import TaxSavingInvestments from "./pages/TaxSavingInvestments";
import ComparisonTool from "./pages/ComparisonTool";
import MarketBehaviour from "./pages/MarketBehaviour";
import YesBankFDCalculator from "./pages/YesBankFDCalculator";
import InvestmentPuzzles from "./pages/InvestmentPuzzlesFixed";
import InvestmentRiddlesSequential from "./pages/InvestmentRiddlesSequential";
import FinancialWordSearch from "./pages/FinancialWordSearch";

import AccountConnections from "./pages/AccountConnections";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import DataDeletion from "./pages/DataDeletion";
// New components
import CommunityFeatures from "./pages/CommunityFeatures";
import TaxHarvesting from "./pages/TaxHarvesting";
import CreditDebtOverview from "./pages/CreditDebtOverview";
import FinancialCalculators from "./pages/FinancialCalculators";
import FinancialManagement from "./pages/FinancialManagement";
import GoalSettings from "./pages/GoalSettings";
import Guide from "./pages/Guide";
import IrregularIncome from "./pages/IrregularIncome";
import LearningHubEducational from "./pages/LearningHubEducational";
import MarketData from "./pages/MarketData";
import PortfolioSimulator from "./pages/PortfolioSimulator";
import RupeesmartKidsEnhanced from "./pages/RupeesmartKidsEnhanced";
import FirebaseSetup from "./pages/FirebaseSetup";
import InvestmentMarketMenu from "./pages/InvestmentMarketMenu";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import TaxAndBenefits from "./pages/TaxAndBenefits";
import Learning from "./pages/Learning";
import RelationshipWithMoney from "./pages/NewRelationshipWithMoney";
import Legal from "./pages/Legal";
import AuthPage from "./pages/auth-page";
import FinancialPlanner from "./pages/FinancialPlannerPro";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
// Calculator Router
import { CalculatorRouter } from "./components/calculators/CalculatorRouter";

function Router() {
  
  // Wrapper component to apply responsive layout to each route
  const RouteWithResponsiveWrapper = ({ component: Component, ...rest }: any) => (
    <Route {...rest}>
      {(params: any) => (
        <ResponsivePageWrapper>
          <Component {...params} />
        </ResponsivePageWrapper>
      )}
    </Route>
  );
  
  // Check if we're on the auth page
  const [location] = useLocation();
  const isAuthPage = location === '/auth';
  
  if (isAuthPage) {
    return (
      <div className="min-h-screen">
        <Switch>
          <Route path="/auth" component={AuthPage} />
        </Switch>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <div className="fixed top-0 z-20 w-full">
        <Header />
      </div>
      <Sidebar />
      <div className="flex-1 overflow-x-hidden md:ml-20 mt-16 pb-16 md:pb-10">
        <div className="w-full">
          <Switch>
            <RouteWithResponsiveWrapper path="/" component={Learning} />
            <RouteWithResponsiveWrapper path="/explore" component={Explore} />
            <RouteWithResponsiveWrapper path="/insights" component={Insights} />
            <RouteWithResponsiveWrapper path="/goals" component={Goals} />
            <RouteWithResponsiveWrapper path="/budget-buddy" component={BudgetBuddy} />
            
            {/* Override specific calculators that have their own implementations */}
            <RouteWithResponsiveWrapper path="/tax-calculator" component={TaxCalculator} />
            <RouteWithResponsiveWrapper path="/emi-calculator" component={EMICalculator} />
            <RouteWithResponsiveWrapper path="/sip-calculator" component={SIPCalculator} />
            <RouteWithResponsiveWrapper path="/retirement-calculator" component={RetirementCalculator} />
            <RouteWithResponsiveWrapper path="/term-insurance-calculator" component={TermInsuranceCalculator} />
            <RouteWithResponsiveWrapper path="/yes-bank-fd-calculator" component={YesBankFDCalculator} />
            
            {/* Financial Education and Tools */}
            <RouteWithResponsiveWrapper path="/financial-education" component={FinancialEducation} />
            <RouteWithResponsiveWrapper path="/stocks-screener" component={StocksScreener} />
            <RouteWithResponsiveWrapper path="/debt-payoff" component={DebtPayoff} />
            <RouteWithResponsiveWrapper path="/risk-assessment" component={RiskAssessment} />
            <RouteWithResponsiveWrapper path="/spending-patterns" component={SpendingPatterns} />
            <RouteWithResponsiveWrapper path="/insurance-guide" component={InsuranceGuide} />
            <RouteWithResponsiveWrapper path="/insurance-hub" component={InsuranceHubV2} />
            <RouteWithResponsiveWrapper path="/financial-freedom-game" component={FinancialFreedomGame} />
            <RouteWithResponsiveWrapper path="/credit-card-usage" component={CreditCardUsage} />
            
            {/* Credit & Debt Management pages */}
            <RouteWithResponsiveWrapper path="/credit-debt-overview" component={CreditDebtOverview} />
            <RouteWithResponsiveWrapper path="/smart-credit-card-usage" component={SmartCreditCardUsage} />
            <RouteWithResponsiveWrapper path="/smart-credit-card" component={SmartCreditCard} />
            <RouteWithResponsiveWrapper path="/credit-score" component={CreditScore} />
            <RouteWithResponsiveWrapper path="/debt-payoff-strategies" component={DebtPayoffStrategies} />
            {/* <RouteWithResponsiveWrapper path="/financial-journey" component={FinancialJourney} /> */}

            <RouteWithResponsiveWrapper path="/alert-settings" component={AlertSettings} />
            <RouteWithResponsiveWrapper path="/indian-investments" component={IndianInvestments} />
            <RouteWithResponsiveWrapper path="/investment-options-overview" component={InvestmentOptionsOverview} />
            <RouteWithResponsiveWrapper path="/government-schemes" component={GovernmentSchemes} />
            <RouteWithResponsiveWrapper path="/tax-filing-guide" component={TaxFilingGuide} />
            <RouteWithResponsiveWrapper path="/tax-saving-investments" component={TaxSavingInvestments} />
            <RouteWithResponsiveWrapper path="/comparison-tool" component={ComparisonTool} />
            <RouteWithResponsiveWrapper path="/alert-demo" component={AlertDemo} />
            
            {/* New routes */}
            <RouteWithResponsiveWrapper path="/community-features" component={CommunityFeatures} />
            <RouteWithResponsiveWrapper path="/financial-calculators" component={FinancialCalculators} />
            <RouteWithResponsiveWrapper path="/financial-management" component={FinancialManagement} />
            <RouteWithResponsiveWrapper path="/financial-dashboard" component={FinancialDashboard} />
            <RouteWithResponsiveWrapper path="/goal-settings" component={GoalSettings} />
            <RouteWithResponsiveWrapper path="/guide" component={Guide} />
            <RouteWithResponsiveWrapper path="/profile" component={Profile} />
            <RouteWithResponsiveWrapper path="/notifications" component={Notifications} />
            <RouteWithResponsiveWrapper path="/tax-and-benefits" component={TaxAndBenefits} />
            <RouteWithResponsiveWrapper path="/irregular-income" component={IrregularIncome} />
            <RouteWithResponsiveWrapper path="/learning-hub" component={LearningHubEducational} />
            <RouteWithResponsiveWrapper path="/investment-market-menu" component={InvestmentMarketMenu} />
            <RouteWithResponsiveWrapper path="/market-data" component={MarketData} />
            <RouteWithResponsiveWrapper path="/market-behaviour" component={MarketBehaviour} />
            <RouteWithResponsiveWrapper path="/portfolio-simulator" component={PortfolioSimulator} />
            <RouteWithResponsiveWrapper path="/rupeesmart-kids" component={RupeesmartKidsEnhanced} />
            <RouteWithResponsiveWrapper path="/tax-harvesting" component={TaxHarvesting} />
            <RouteWithResponsiveWrapper path="/learning" component={Learning} />
            <RouteWithResponsiveWrapper path="/relationship-with-money" component={RelationshipWithMoney} />
            <RouteWithResponsiveWrapper path="/investment-puzzles" component={InvestmentPuzzles} />
            <RouteWithResponsiveWrapper path="/investment-riddles" component={InvestmentRiddlesSequential} />
            <RouteWithResponsiveWrapper path="/word-search" component={FinancialWordSearch} />
            <RouteWithResponsiveWrapper path="/legal" component={Legal} />

            <RouteWithResponsiveWrapper path="/account-connections" component={AccountConnections} />
            <RouteWithResponsiveWrapper path="/run-financial-scenario" component={FinancialPlanner} />
            <RouteWithResponsiveWrapper path="/privacy-policy" component={PrivacyPolicy} />
            <RouteWithResponsiveWrapper path="/privacypolicy" component={PrivacyPolicy} />
            <RouteWithResponsiveWrapper path="/terms-of-service" component={TermsOfService} />
            <RouteWithResponsiveWrapper path="/termsofservice" component={TermsOfService} />
            <RouteWithResponsiveWrapper path="/data-deletion" component={DataDeletion} />
            <RouteWithResponsiveWrapper path="/datadeletion" component={DataDeletion} />
            <RouteWithResponsiveWrapper path="/firebase-setup" component={FirebaseSetup} />
            
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
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Default SEO settings for the entire application */}
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>RupeeSmart - Financial Management Platform for Indian Investors</title>
        <meta name="description" content="RupeeSmart provides comprehensive financial management tools including portfolio tracking, budget management, financial education, tax calculators, and more." />
        <meta name="keywords" content="financial management, personal finance, investment tracking, budget planning, tax calculator, financial education, Indian finance" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="RupeeSmart - Financial Management Platform" />
        <meta property="og:description" content="Comprehensive financial management tools for Indian investors" />
        <meta property="og:site_name" content="RupeeSmart" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="RupeeSmart" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="RupeeSmart" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#f59e0b" />
        
        {/* Structured Data - Organization */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "RupeeSmart",
            "url": "https://rupeesmart.com",
            "logo": "https://rupeesmart.com/logo.png",
            "description": "Comprehensive financial management platform for Indian investors",
            "sameAs": [
              "https://www.facebook.com/rupeesmart",
              "https://twitter.com/rupeesmart",
              "https://www.linkedin.com/company/rupeesmart"
            ]
          }
        `}</script>
      </Helmet>
      
      <ThemeProvider>
        <AuthProvider>
          <WebSocketProvider>
            <BudgetProvider>
              <NotificationProvider>
                <Router />
                <Toaster />
              </NotificationProvider>
            </BudgetProvider>
          </WebSocketProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
