import React from "react";
import { Link, useLocation } from "wouter";

export default function Sidebar() {
  const [location] = useLocation();
  
  // Check if current location is one of the financial management pages
  const isFinancialManagementActive = [
    "/financial-management",
    "/budget-buddy",
    "/dashboard",
    "/spending-patterns",
    "/goal-settings",
    "/financial-journey",
    "/irregular-income",
    "/portfolio-simulator",
    "/account-connections"
  ].some(path => location.includes(path));
  
  // Check if current location is financial calculators
  const isFinancialCalculatorsActive = location.includes("/financial-calculators");
  
  // Check if current location is one of the credit & debt pages
  const isCreditDebtActive = [
    "/credit-debt-overview",
    "/smart-credit-card-usage",
    "/smart-credit-card",
    "/credit-score",
    "/debt-payoff-strategies",
    "/credit-card-usage",
    "/debt-payoff",
    "/risk-assessment"
  ].some(path => location.includes(path));
  
  // Check if current location is one of the tax & benefits pages
  const isTaxBenefitsActive = [
    "/tax-and-benefits",
    "/tax-calculator",
    "/tax-harvesting",
    "/tax-filing-guide",
    "/government-schemes",
    "/insights"
  ].some(path => location.includes(path));
  
  // Check if current location is one of the learning pages or home page
  // Default highlight Learning & Games
  const isLearningActive = location === "/" || [
    "/learning",
    "/relationship-with-money",
    "/learning-hub",
    "/financial-freedom-game",
    "/investment-puzzles",
    "/investment-riddles",
    "/rupeesmart-kids"
  ].some(path => location.includes(path));
  
  // Check if current location is one of the investment pages
  const isInvestmentActive = [
    "/investment-market-menu",
    "/indian-investments",
    "/insurance-guide",
    "/comparison-tool",
    "/market-data",
    "/market-behaviour",
    "/future-projection"
  ].some(path => location.includes(path));
  
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed top-0 left-0 h-full w-20 bg-white shadow-md flex-col items-center z-10">
        <div className="flex flex-col h-[calc(100vh-65px)] items-center justify-around py-1 mt-20">
          {/* Financial Literacy & Learning */}
          <Link href="/learning">
            <div className={`w-16 h-16 flex flex-col items-center justify-center cursor-pointer py-1 px-0.5 transition-all duration-200 ${isLearningActive ? "text-blue-600 scale-110 font-semibold" : "text-slate-700"}`}>
              <div className={`${isLearningActive ? "w-12 h-12" : "w-11 h-11"} rounded-full bg-[#4c6ef5] flex items-center justify-center mb-1 shadow-md transition-all duration-200`}>
                <span className="material-icons text-white" style={{fontSize: isLearningActive ? '28px' : '24px'}}>school</span>
              </div>
              <span className={`${isLearningActive ? "text-xs" : "text-[10px]"} text-center leading-tight transition-all duration-200`}>Learning &<br />Games</span>
            </div>
          </Link>
          
          {/* Financial Management & Planning */}
          <Link href="/financial-management">
            <div className={`w-16 h-16 flex flex-col items-center justify-center cursor-pointer py-1 px-0.5 transition-all duration-200 ${isFinancialManagementActive ? "text-blue-600 scale-110 font-semibold" : "text-slate-700"}`}>
              <div className={`${isFinancialManagementActive ? "w-12 h-12" : "w-11 h-11"} rounded-full bg-[#3cb179] flex items-center justify-center mb-1 shadow-md transition-all duration-200`}>
                <span className="material-icons text-white" style={{fontSize: isFinancialManagementActive ? '28px' : '24px'}}>currency_rupee</span>
              </div>
              <span className={`${isFinancialManagementActive ? "text-xs" : "text-[10px]"} text-center leading-tight transition-all duration-200`}>Financial<br />Management</span>
            </div>
          </Link>
          
          {/* Financial Calculators */}
          <Link href="/financial-calculators">
            <div className={`w-16 h-16 flex flex-col items-center justify-center cursor-pointer py-1 px-0.5 transition-all duration-200 ${isFinancialCalculatorsActive ? "text-blue-600 scale-110 font-semibold" : "text-slate-700"}`}>
              <div className={`${isFinancialCalculatorsActive ? "w-12 h-12" : "w-11 h-11"} rounded-full bg-[#f59e0b] flex items-center justify-center mb-1 shadow-md transition-all duration-200`}>
                <span className="material-icons text-white" style={{fontSize: isFinancialCalculatorsActive ? '28px' : '24px'}}>calculate</span>
              </div>
              <span className={`${isFinancialCalculatorsActive ? "text-xs" : "text-[10px]"} text-center leading-tight transition-all duration-200`}>Financial<br />Calculators</span>
            </div>
          </Link>
          
          {/* Investment & Market Tools */}
          <Link href="/investment-market-menu">
            <div className={`w-16 h-16 flex flex-col items-center justify-center cursor-pointer py-1 px-0.5 transition-all duration-200 ${isInvestmentActive ? "text-blue-600 scale-110 font-semibold" : "text-slate-700"}`}>
              <div className={`${isInvestmentActive ? "w-12 h-12" : "w-11 h-11"} rounded-full bg-[#a855f7] flex items-center justify-center mb-1 shadow-md transition-all duration-200`}>
                <span className="material-icons text-white" style={{fontSize: isInvestmentActive ? '28px' : '24px'}}>trending_up</span>
              </div>
              <span className={`${isInvestmentActive ? "text-xs" : "text-[10px]"} text-center leading-tight transition-all duration-200`}>Investment &<br />Markets</span>
            </div>
          </Link>
          
          {/* Financial Scenario Planner */}
          <Link href="/run-financial-scenario">
            <div className={`w-16 h-16 flex flex-col items-center justify-center cursor-pointer py-1 px-0.5 transition-all duration-200 ${location === "/run-financial-scenario" ? "text-blue-600 scale-110 font-semibold" : "text-slate-700"}`}>
              <div className={`${location === "/run-financial-scenario" ? "w-12 h-12" : "w-11 h-11"} rounded-full bg-[#10b981] flex items-center justify-center mb-1 shadow-md transition-all duration-200`}>
                <span className="material-icons text-white" style={{fontSize: location === "/run-financial-scenario" ? '28px' : '24px'}}>analytics</span>
              </div>
              <span className={`${location === "/run-financial-scenario" ? "text-xs" : "text-[10px]"} text-center leading-tight transition-all duration-200`}>Financial<br />Scenarios</span>
            </div>
          </Link>
          
          {/* Credit & Debt Management */}
          <Link href="/credit-debt-overview">
            <div className={`w-16 h-16 flex flex-col items-center justify-center cursor-pointer py-1 px-0.5 transition-all duration-200 ${isCreditDebtActive ? "text-blue-600 scale-110 font-semibold" : "text-slate-700"}`}>
              <div className={`${isCreditDebtActive ? "w-12 h-12" : "w-11 h-11"} rounded-full bg-[#ef4444] flex items-center justify-center mb-1 shadow-md transition-all duration-200`}>
                <span className="material-icons text-white" style={{fontSize: isCreditDebtActive ? '28px' : '24px'}}>credit_card</span>
              </div>
              <span className={`${isCreditDebtActive ? "text-xs" : "text-[10px]"} text-center leading-tight transition-all duration-200`}>Credit & Debt</span>
            </div>
          </Link>
          
          {/* Tax & Government Benefits */}
          <Link href="/tax-and-benefits">
            <div className={`w-16 h-16 flex flex-col items-center justify-center cursor-pointer py-1 px-0.5 transition-all duration-200 ${isTaxBenefitsActive ? "text-blue-600 scale-110 font-semibold" : "text-slate-700"}`}>
              <div className={`${isTaxBenefitsActive ? "w-12 h-12" : "w-11 h-11"} rounded-full bg-[#0ea5e9] flex items-center justify-center mb-1 shadow-md transition-all duration-200`}>
                <span className="material-icons text-white" style={{fontSize: isTaxBenefitsActive ? '28px' : '24px'}}>receipt_long</span>
              </div>
              <span className={`${isTaxBenefitsActive ? "text-xs" : "text-[10px]"} text-center leading-tight transition-all duration-200`}>Tax & Benefits</span>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex items-center justify-around z-50">
        <Link href="/learning">
          <div className={`flex flex-col items-center justify-center h-full px-1 ${isLearningActive ? "text-blue-600" : "text-gray-600"}`}>
            <span className="material-icons" style={{fontSize: '22px'}}>school</span>
            <span className="text-[9px] mt-0.5">Learning</span>
          </div>
        </Link>
        
        <Link href="/financial-management">
          <div className={`flex flex-col items-center justify-center h-full px-1 ${isFinancialManagementActive ? "text-green-600" : "text-gray-600"}`}>
            <span className="material-icons" style={{fontSize: '22px'}}>currency_rupee</span>
            <span className="text-[9px] mt-0.5">Finance</span>
          </div>
        </Link>
        
        <Link href="/financial-calculators">
          <div className={`flex flex-col items-center justify-center h-full px-1 ${isFinancialCalculatorsActive ? "text-amber-600" : "text-gray-600"}`}>
            <span className="material-icons" style={{fontSize: '22px'}}>calculate</span>
            <span className="text-[9px] mt-0.5">Calculators</span>
          </div>
        </Link>
        
        <Link href="/investment-market-menu">
          <div className={`flex flex-col items-center justify-center h-full px-1 ${isInvestmentActive ? "text-purple-600" : "text-gray-600"}`}>
            <span className="material-icons" style={{fontSize: '22px'}}>trending_up</span>
            <span className="text-[9px] mt-0.5">Invest</span>
          </div>
        </Link>
        
        <Link href="/credit-debt-overview">
          <div className={`flex flex-col items-center justify-center h-full px-1 ${isCreditDebtActive ? "text-red-600" : "text-gray-600"}`}>
            <span className="material-icons" style={{fontSize: '22px'}}>credit_card</span>
            <span className="text-[9px] mt-0.5">Credit</span>
          </div>
        </Link>
      </div>
    </>
  );
}