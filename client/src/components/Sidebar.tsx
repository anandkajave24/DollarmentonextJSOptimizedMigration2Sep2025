import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { 
  GraduationCap, 
  DollarSign, 
  Calculator, 
  TrendingUp, 
  CreditCard,
  Building 
} from "lucide-react";

const Sidebar = React.memo(() => {
  const router = useRouter();
  const location = router.asPath || '';
  
  // Check if current location is one of the financial management pages
  const isFinancialManagementActive = [
    "/financial-management",
    "/budget-buddy",
    "/spending-patterns",
    "/goal-settings",
    "/enhanced-goal-settings",
    "/real-portfolio-manager",
    "/financial-journey",
    "/irregular-income",
    "/portfolio-simulator",
    "/account-connections",
    "/smart-life-manager"
  ].some(path => location.includes(path));
  
  // Check if current location is financial calculators
  const isFinancialCalculatorsActive = location.includes("/financial-calculators");
  
  // Check if current location is one of the credit & debt pages (including moved tax tools)
  const isCreditDebtActive = [
    "/credit-debt-overview",
    "/smart-credit-card-usage",
    "/smart-credit-card",
    "/credit-score",
    "/debt-payoff-strategies",
    "/credit-card-usage",
    "/debt-payoff",
    "/risk-assessment",
    "/tax-calculator",
    "/tax-harvesting",
    "/tax-saving-investments"
  ].some(path => location.includes(path));
  

  
  // Check if current location is one of the learning pages or home page
  // Default highlight Learning & Games
  const isLearningActive = location === "/" || [
    "/learning",
    "/checkpoints",
    "/relationship-with-money",
    "/learning-hub",
    "/financial-freedom-game",
    "/financial-growth-levels",
    "/investment-puzzles",
    "/investment-riddles",
    "/dollarmento-kids"
  ].some(path => location.includes(path));
  
  // Check if current location is one of the investment pages
  const isInvestmentActive = [
    "/investment-market-menu",
    "/indian-investments",
    "/insurance-guide",
    "/comparison-tool",
    "/market-data",
    "/market-behaviour",
    "/future-projection",
    "/investment-rules",
    "/risk-calculator"
  ].some(path => location.includes(path));
  

  

  
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed top-16 left-0 h-[calc(100vh-64px)] w-20 bg-white shadow-md flex-col items-center z-10">
        <div className="flex flex-col h-full items-center justify-around py-4">
          {/* Financial Literacy & Learning */}
          <Link href="/learning">
            <div className={`w-16 h-16 flex flex-col items-center justify-center cursor-pointer py-1 px-0.5 transition-all duration-200 ${isLearningActive ? "text-blue-600 scale-110 font-semibold" : "text-slate-700"}`}>
              <div className={`${isLearningActive ? "w-12 h-12" : "w-11 h-11"} rounded-full bg-[#4c6ef5] flex items-center justify-center mb-1 shadow-md transition-all duration-200`}>
                <GraduationCap className={`text-white ${isLearningActive ? 'h-7 w-7' : 'h-6 w-6'}`} />
              </div>
              <span className={`${isLearningActive ? "text-xs" : "text-[10px]"} text-center leading-tight transition-all duration-200`}>Money<br />101</span>
            </div>
          </Link>
          
          {/* Financial Management & Planning */}
          <Link href="/financial-management">
            <div className={`w-16 h-16 flex flex-col items-center justify-center cursor-pointer py-1 px-0.5 transition-all duration-200 ${isFinancialManagementActive ? "text-blue-600 scale-110 font-semibold" : "text-slate-700"}`}>
              <div className={`${isFinancialManagementActive ? "w-12 h-12" : "w-11 h-11"} rounded-full bg-[#3cb179] flex items-center justify-center mb-1 shadow-md transition-all duration-200`}>
                <DollarSign className={`text-white ${isFinancialManagementActive ? 'h-7 w-7' : 'h-6 w-6'}`} />
              </div>
              <span className={`${isFinancialManagementActive ? "text-xs" : "text-[10px]"} text-center leading-tight transition-all duration-200`}>Budget &<br />Spend</span>
            </div>
          </Link>
          
          {/* Financial Calculators */}
          <Link href="/financial-calculators">
            <div className={`w-16 h-16 flex flex-col items-center justify-center cursor-pointer py-1 px-0.5 transition-all duration-200 ${isFinancialCalculatorsActive ? "text-blue-600 scale-110 font-semibold" : "text-slate-700"}`}>
              <div className={`${isFinancialCalculatorsActive ? "w-12 h-12" : "w-11 h-11"} rounded-full bg-[#f59e0b] flex items-center justify-center mb-1 shadow-md transition-all duration-200`}>
                <Calculator className={`text-white ${isFinancialCalculatorsActive ? 'h-7 w-7' : 'h-6 w-6'}`} />
              </div>
              <span className={`${isFinancialCalculatorsActive ? "text-xs" : "text-[10px]"} text-center leading-tight transition-all duration-200`}>Financial<br />Calculators</span>
            </div>
          </Link>
          
          {/* Investment & Market Tools */}
          <Link href="/investment-market-menu">
            <div className={`w-16 h-16 flex flex-col items-center justify-center cursor-pointer py-1 px-0.5 transition-all duration-200 ${isInvestmentActive ? "text-blue-600 scale-110 font-semibold" : "text-slate-700"}`}>
              <div className={`${isInvestmentActive ? "w-12 h-12" : "w-11 h-11"} rounded-full bg-[#a855f7] flex items-center justify-center mb-1 shadow-md transition-all duration-200`}>
                <TrendingUp className={`text-white ${isInvestmentActive ? 'h-7 w-7' : 'h-6 w-6'}`} />
              </div>
              <span className={`${isInvestmentActive ? "text-xs" : "text-[10px]"} text-center leading-tight transition-all duration-200`}>Invest &<br />Grow</span>
            </div>
          </Link>
          



          {/* Credit & Taxes Management */}
          <Link href="/credit-debt-overview">
            <div className={`w-16 h-16 flex flex-col items-center justify-center cursor-pointer py-1 px-0.5 transition-all duration-200 ${isCreditDebtActive ? "text-blue-600 scale-110 font-semibold" : "text-slate-700"}`}>
              <div className={`${isCreditDebtActive ? "w-12 h-12" : "w-11 h-11"} rounded-full bg-[#ef4444] flex items-center justify-center mb-1 shadow-md transition-all duration-200`}>
                <CreditCard className={`text-white ${isCreditDebtActive ? 'h-7 w-7' : 'h-6 w-6'}`} />
              </div>
              <span className={`${isCreditDebtActive ? "text-xs" : "text-[10px]"} text-center leading-tight transition-all duration-200`}>Credit & Taxes</span>
            </div>
          </Link>
          


        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex items-center justify-around z-50">
        <Link href="/learning">
          <div className={`flex flex-col items-center justify-center h-full px-1 ${isLearningActive ? "text-blue-600" : "text-gray-600"}`}>
            <GraduationCap className="h-6 w-6" />
            <span className="text-[9px] mt-0.5">Money 101</span>
          </div>
        </Link>
        
        <Link href="/financial-management">
          <div className={`flex flex-col items-center justify-center h-full px-1 ${isFinancialManagementActive ? "text-green-600" : "text-gray-600"}`}>
            <DollarSign className="h-6 w-6" />
            <span className="text-[9px] mt-0.5">Budget</span>
          </div>
        </Link>
        
        <Link href="/financial-calculators">
          <div className={`flex flex-col items-center justify-center h-full px-1 ${isFinancialCalculatorsActive ? "text-amber-600" : "text-gray-600"}`}>
            <Calculator className="h-6 w-6" />
            <span className="text-[9px] mt-0.5">Calculators</span>
          </div>
        </Link>
        
        <Link href="/investment-market-menu">
          <div className={`flex flex-col items-center justify-center h-full px-1 ${isInvestmentActive ? "text-purple-600" : "text-gray-600"}`}>
            <TrendingUp className="h-6 w-6" />
            <span className="text-[9px] mt-0.5">Invest & Grow</span>
          </div>
        </Link>
        

        
        <Link href="/credit-debt-overview">
          <div className={`flex flex-col items-center justify-center h-full px-1 ${isCreditDebtActive ? "text-red-600" : "text-gray-600"}`}>
            <CreditCard className="h-6 w-6" />
            <span className="text-[9px] mt-0.5">Credit & Tax</span>
          </div>
        </Link>
      </div>
    </>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;