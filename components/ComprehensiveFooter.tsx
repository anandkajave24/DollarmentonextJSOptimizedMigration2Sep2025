import React from "react";
import { useLocation } from "wouter";

export default function ComprehensiveFooter() {
  const [location, setLocation] = useLocation();
  
  const handleNavigation = (path: string) => {
    setLocation(path);
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const footerSections = [
    {
      title: "Financial Calculators",
      links: [
        { name: "Tax Calculator", path: "/tax-calculator" },
        { name: "EMI Calculator", path: "/emi-calculator" },
        { name: "Retirement Calculator", path: "/retirement-calculator" },
        { name: "401(k) Calculator", path: "/401k-calculator" },
        { name: "Term Insurance Calculator", path: "/term-insurance-calculator" },
        { name: "Auto Loan Calculator", path: "/auto-loan-calculator" },
        { name: "Emergency Fund Calculator", path: "/emergency-fund-calculator" }
      ]
    },
    {
      title: "Investment Tools",
      links: [
        { name: "Portfolio Simulator", path: "/portfolio-simulator" },
        { name: "Risk Assessment", path: "/risk-assessment" },
        { name: "Investment Options", path: "/investment-options-overview" },
        { name: "CAGR Calculator", path: "/cagr-calculator" },
        { name: "Compound Interest Calculator", path: "/compound-interest-calculator" },
        { name: "CD Calculator", path: "/cd-calculator" },
        { name: "529 Plan Calculator", path: "/plan529-calculator" },
        { name: "Roth IRA Calculator", path: "/roth-ira-calculator" }
      ]
    },
    {
      title: "Budget & Planning",
      links: [
        { name: "Budget Buddy", path: "/budget-buddy" },
        { name: "Goal Settings", path: "/goal-settings" },
        { name: "Spending Patterns", path: "/spending-patterns" },
        { name: "Debt Payoff", path: "/debt-payoff" },
        { name: "Credit Score Simulator", path: "/credit-score-simulator" },
        { name: "Financial Management", path: "/financial-management" },
        { name: "Smart Life Manager", path: "/smart-life-manager" },
        { name: "Financial Checklist", path: "/smart-financial-checklist" }
      ]
    },
    {
      title: "Education & Learning",
      links: [
        { name: "Financial Education", path: "/financial-education" },
        { name: "Learning Hub", path: "/learning-hub" },
        { name: "DollarMento Kids", path: "/dollarmento-kids" },
        { name: "Financial Journey", path: "/financial-journey" },
        { name: "Investment Puzzles", path: "/investment-puzzles" },
        { name: "Investment Riddles", path: "/investment-riddles" },
        { name: "Financial Word Search", path: "/financial-word-search" },
        { name: "Guide", path: "/guide" }
      ]
    },
    {
      title: "Market Data",
      links: [
        { name: "Market Data", path: "/market-data" },
        { name: "Stocks Screener", path: "/stocks-screener" },
        { name: "Historical Charts", path: "/historical-chart" },
        { name: "Market Behavior", path: "/market-behaviour" },
        { name: "Insights", path: "/insights" },
        { name: "Explore", path: "/explore" }
      ]
    },
    {
      title: "Community & Games",
      links: [
        { name: "Community", path: "/community" },
        { name: "Financial Freedom Game", path: "/financial-freedom-game" },
        { name: "USA Wealth Building Games", path: "/usa-wealth-building-games" },
        { name: "Relationship with Money", path: "/relationship-with-money" },
        { name: "Profile", path: "/profile" }
      ]
    },
    {
      title: "Insurance & Protection",
      links: [
        { name: "Insurance Hub", path: "/insurance-hub" },
        { name: "Insurance Guide", path: "/insurance-guide" },
        { name: "Term Insurance Calculator", path: "/term-insurance-calculator" },
        { name: "Credit Card Usage", path: "/smart-credit-card" },
        { name: "Debt Strategies", path: "/debt-payoff-strategies" }
      ]
    },
    {
      title: "Reports & Analysis",
      links: [
        { name: "Financial Health Report", path: "/financial-health-report-sidebar" },
        { name: "Tax Harvesting", path: "/tax-harvesting" },
        { name: "Credit-Debt Overview", path: "/credit-debt-overview" },
        { name: "Financial Growth Levels", path: "/financial-growth-levels" },
        { name: "Investment Rules", path: "/investment-rules" }
      ]
    }
  ];

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Support", path: "/support" },
    { name: "Sitemap", path: "/sitemap" },
    { name: "Privacy Policy", path: "/legal?tab=privacy" },
    { name: "Terms of Service", path: "/legal?tab=terms" },
    { name: "Disclaimer", path: "/legal?tab=disclaimer" },
    { name: "Data Deletion", path: "/data-deletion" }
  ];

  return (
    <footer className="bg-white border-t mt-12 py-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-3">
              <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.links.slice(0, 6).map((link, linkIndex) => (
                  <button
                    key={linkIndex}
                    onClick={() => handleNavigation(link.path)}
                    className="block text-sm text-gray-600 hover:text-blue-600 transition-colors text-left"
                  >
                    {link.name}
                  </button>
                ))}
                {section.links.length > 6 && (
                  <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                    Less ↗
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links Section */}
        <div className="border-t pt-6 mb-6">
          <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-3">
            Quick Links
          </h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(link.path)}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t pt-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} DollarMento. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}