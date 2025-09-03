import React from "react";
import { Link } from "wouter";
import { Card } from "../components/ui/card";
import { SEO } from "../components/SEO";

interface MenuItemProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  bgColor: string;
}

export default function InvestmentMarketMenu() {
  const menuItems: MenuItemProps[] = [
    {
      id: "investment-options",
      title: "Investment Options",
      description: "Explore comprehensive investment options available in the USA market",
      icon: "account_balance",
      route: "/usa-investments",
      bgColor: "bg-amber-500"
    },
    {
      id: "insurance-hub",
      title: "Insurance Hub",
      description: "Interactive guides, calculators and comparison tools for all your insurance needs",
      icon: "health_and_safety",
      route: "/insurance-hub",
      bgColor: "bg-emerald-500"
    },

    {
      id: "market-data",
      title: "Market Data",
      description: "Real-time market data, indices, and trends",
      icon: "trending_up",
      route: "/market-data",
      bgColor: "bg-blue-500"
    },
    {
      id: "market-behaviour",
      title: "Market Behaviour",
      description: "Understand market patterns and investor psychology",
      icon: "psychology",
      route: "/market-behaviour",
      bgColor: "bg-indigo-600"
    }
  ];
  
  return (
    <div className="px-4 py-6">
      <SEO 
        title="Investment & Market Tools"
        description="Explore investment options, compare financial products, analyze market data, and understand market behavior with our comprehensive suite of investment tools."
        keywords="USA investments, investment options, stock market, bonds, ETFs, mutual funds, retirement accounts, 401k, IRA, investment tools, investment analysis, market behavior, future projection"
        canonical="https://dollarmento.com/investment-market-menu"
      />
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Investment & Markets</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {menuItems.map(item => (
          <Link key={item.id} href={item.route}>
            <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
              <div className={`mb-3 w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center`}>
                <span className="material-icons text-white">{item.icon}</span>
              </div>
              <h3 className="font-medium text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 flex-grow">{item.description}</p>
              <div className="mt-4 text-primary font-medium text-sm flex items-center">
                Explore
                <span className="material-icons text-sm ml-1">arrow_forward</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}