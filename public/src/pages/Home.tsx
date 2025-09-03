import React from "react";
import { Link } from "wouter";
import { SEO } from "../components/SEO";
import { Card } from "@/components/ui/card";

// Define the feature card interface
interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  iconColor: string;
  bgColor: string;
}

export default function Home() {
  // Feature cards data - excluding Future Projection as requested
  const featureCards: FeatureCard[] = [
    {
      id: "indian-investments",
      title: "Indian Investments",
      description: "Explore various investment options available in the Indian market",
      icon: "currency_rupee",
      route: "/indian-investments",
      iconColor: "text-amber-500",
      bgColor: "bg-amber-100"
    },
    {
      id: "insurance-hub",
      title: "Insurance Hub",
      description: "Interactive guides, calculators and comparison tools for all your insurance needs",
      icon: "shield",
      route: "/insurance-hub-v2",
      iconColor: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      id: "comparison-tool",
      title: "Comparison Tool",
      description: "Compare different investment options side by side",
      icon: "balance",
      route: "/comparison-tool",
      iconColor: "text-cyan-600",
      bgColor: "bg-cyan-100"
    },
    {
      id: "market-data",
      title: "Market Data",
      description: "Real-time market data, indices, and trends",
      icon: "show_chart",
      route: "/market-data",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      id: "market-behaviour",
      title: "Market Behaviour",
      description: "Understand market patterns and investor psychology",
      icon: "insights",
      route: "/market-behaviour",
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-100"
    }
    // Future Projection card removed as requested
  ];

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <SEO 
        title="RupeeSmart - Smart Finance Solutions"
        description="RupeeSmart provides personalized financial tools for investment guidance, insurance planning, and market insights."
      />
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to RupeeSmart</h1>
        <p className="text-gray-600 mt-2">Your personalized financial companion for smarter decisions</p>
      </div>
      
      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {featureCards.map((card) => (
          <Link key={card.id} href={card.route}>
            <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
              <div className="flex items-start mb-4">
                <div className={`w-12 h-12 rounded-full ${card.bgColor} flex items-center justify-center mr-3`}>
                  <span className={`material-icons ${card.iconColor}`}>{card.icon}</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg text-gray-900">{card.title}</h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 flex-grow">{card.description}</p>
              <div className="mt-4 text-primary font-medium text-sm flex items-center">
                Explore
                <span className="material-icons text-sm ml-1">arrow_forward</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      
      {/* Footer section with disclaimer */}
      <div className="text-center text-xs text-gray-500 mt-8">
        © 2025 RupeeSmart. All rights reserved.
      </div>
    </div>
  );
}