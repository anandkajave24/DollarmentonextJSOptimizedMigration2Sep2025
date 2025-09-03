import React from "react";
import { Link } from "wouter";
import { Card } from "../components/ui/card";
import { SEO } from "../components/SEO";

interface MenuItemProps {
  title: string;
  description: string;
  icon: string;
  to: string;
  bgColor: string;
}

export default function TaxAndBenefits() {
  const menuItems: MenuItemProps[] = [
    {
      title: "Tax Calculator",
      description: "Calculate your income tax liability based on income and deductions.",
      icon: "calculate",
      to: "/tax-calculator",
      bgColor: "bg-purple-500"
    },
    {
      title: "Tax Harvesting",
      description: "Minimize taxes on your investments through strategic tax-loss harvesting.",
      icon: "content_cut",
      to: "/tax-harvesting",
      bgColor: "bg-cyan-500"
    },
    {
      title: "Government Schemes",
      description: "Explore government financial schemes and benefits available to Indian citizens.",
      icon: "account_balance",
      to: "/government-schemes",
      bgColor: "bg-blue-500"
    },
    {
      title: "Tax Filing Guide",
      description: "Step-by-step guide for filing your income tax returns in India.",
      icon: "description",
      to: "/tax-filing-guide",
      bgColor: "bg-green-500"
    },
    {
      title: "Tax Saving Investments",
      description: "Explore investments that help you save taxes under Section 80C and other provisions.",
      icon: "savings",
      to: "/tax-saving-investments",
      bgColor: "bg-amber-500"
    }
  ];
  
  return (
    <div className="px-4 py-6">
      <SEO 
        title="Tax & Government Benefits"
        description="Navigate tax planning, understand government benefits, and optimize your financial decisions with our comprehensive tax tools and resources."
        keywords="tax calculator, tax harvesting, government schemes, tax filing, tax saving investments, tax planning"
        canonical="https://rupeesmart.com/tax-and-benefits"
      />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tax & Government Benefits</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.to}>
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