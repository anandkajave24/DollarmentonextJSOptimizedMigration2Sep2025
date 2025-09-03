import { useState } from "react";
import { Link } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BottomNavigationProps {
  currentPath: string;
}

export default function BottomNavigation({ currentPath }: BottomNavigationProps) {
  const [toolsDialogOpen, setToolsDialogOpen] = useState(false);
  
  const toolPages = [
    { path: "/budget-buddy", name: "Budget Buddy", icon: "savings" },
    { path: "/spending-patterns", name: "Spending Analysis", icon: "insights" },
    { path: "/tax-calculator", name: "Tax Calculator", icon: "receipt_long" },
    { path: "/credit-score", name: "Credit Score", icon: "credit_score" },
    { path: "/emi-calculator", name: "EMI Calculator", icon: "calculate" },
    { path: "/sip-calculator", name: "SIP Calculator", icon: "trending_up" },
    { path: "/debt-payoff", name: "Debt Payoff", icon: "paid" },
    { path: "/risk-assessment", name: "Risk Profile", icon: "tune" },
    { path: "/financial-education", name: "Learn", icon: "school" },
    { path: "/stocks-screener", name: "Stocks Screener", icon: "candlestick_chart" },
    { path: "/insurance-guide", name: "Insurance Guide", icon: "shield" },
    { path: "/term-insurance-calculator", name: "Term Insurance", icon: "health_and_safety" },
    { path: "/financial-freedom-game", name: "Finance Game", icon: "videogame_asset" },
    { path: "/credit-card-usage", name: "Credit Cards", icon: "credit_card" },
    { path: "/financial-journey", name: "Financial Journey", icon: "timeline" },
    { path: "/future-projection", name: "Future Projection", icon: "moving" },
    { path: "/alert-settings", name: "Alert Settings", icon: "notifications" },
    { path: "/indian-investments", name: "Indian Investments", icon: "currency_rupee" },
    { path: "/government-schemes", name: "Government Schemes", icon: "account_balance" },
    { path: "/comparison-tool", name: "Comparison Tool", icon: "compare" },
    { path: "/market-behaviour", name: "Market Behaviour", icon: "trending_up" },
    { path: "/investment-puzzles", name: "Investment Puzzles", icon: "extension" },
    { path: "/investment-riddles", name: "Investment Riddles", icon: "psychology" },
    { path: "/yes-bank-fd-calculator", name: "Yes Bank FD", icon: "savings" },
  ];
  
  const isToolsActive = toolPages.some(tool => currentPath === tool.path);
  
  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
        <div className="flex justify-around">
          <Link href="/">
            <div className={`flex flex-col items-center px-3 py-2 cursor-pointer ${currentPath === "/" ? "text-primary" : "text-[#757575]"}`}>
              <span className="material-icons">home</span>
              <span className="text-xs">Home</span>
            </div>
          </Link>
          <Link href="/explore">
            <div className={`flex flex-col items-center px-3 py-2 cursor-pointer ${currentPath === "/explore" ? "text-primary" : "text-[#757575]"}`}>
              <span className="material-icons">explore</span>
              <span className="text-xs">Explore</span>
            </div>
          </Link>
          <button 
            onClick={() => setToolsDialogOpen(true)}
            className={`flex flex-col items-center px-3 py-2 ${isToolsActive ? "text-primary" : "text-[#757575]"}`}
          >
            <span className="material-icons">build</span>
            <span className="text-xs">Tools</span>
          </button>
          <Link href="/insights">
            <div className={`flex flex-col items-center px-3 py-2 cursor-pointer ${currentPath === "/insights" ? "text-primary" : "text-[#757575]"}`}>
              <span className="material-icons">insights</span>
              <span className="text-xs">Insights</span>
            </div>
          </Link>
          <Link href="/goals">
            <div className={`flex flex-col items-center px-3 py-2 cursor-pointer ${currentPath === "/goals" ? "text-primary" : "text-[#757575]"}`}>
              <span className="material-icons">flag</span>
              <span className="text-xs">Goals</span>
            </div>
          </Link>
        </div>
      </nav>
      
      <Dialog open={toolsDialogOpen} onOpenChange={setToolsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Financial Tools</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 p-2">
            {toolPages.map((tool) => (
              <div key={tool.path} className="flex flex-col items-center">
                <Link href={tool.path}>
                  <div 
                    className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 w-full cursor-pointer"
                    onClick={() => setToolsDialogOpen(false)}
                  >
                    <span className="material-icons text-primary text-2xl mb-2">{tool.icon}</span>
                    <span className="text-sm font-medium text-center">{tool.name}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
