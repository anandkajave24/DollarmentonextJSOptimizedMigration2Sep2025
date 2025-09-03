import { Link } from "wouter";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { TargetIcon } from "../components/icons/TargetIcon";
import { SmartLifeManagerIcon } from "../components/icons/SmartLifeManagerIcon";
import { SEO } from "../components/SEO";
import FinancialDisclaimer from "../components/FinancialDisclaimer";

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

export default function FinancialManagement() {
  return (
    <div className="px-4 py-6">
      <SEO 
        title="Financial Management Tools"
        description="Access a wide range of financial management tools to help track budgets, set goals, analyze spending patterns, and plan your financial journey."
        keywords="financial management, budget planning, financial goals, spending analysis, expense tracking, personal finance, financial journey"
        canonical="https://dollarmento.com/financial-management"
      />
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Financial Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {features.map((feature) => (
          <Link key={feature.id} href={feature.route}>
            <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
              <div className={`mb-3 w-12 h-12 rounded-full ${feature.color} flex items-center justify-center`}>
                {feature.icon === "target" ? (
                  <TargetIcon size="lg" className="text-white" />
                ) : feature.icon === "smart-life-manager" ? (
                  <SmartLifeManagerIcon size={28} className="text-white" />
                ) : (
                  <span className="material-icons text-white">{feature.icon}</span>
                )}
              </div>
              <h3 className="font-medium text-lg mb-1">{feature.title}
                {feature.id === "budget-buddy" && (
                  <span className="text-xs text-green-600 block">Fixed Monthly Income</span>
                )}
                {feature.id === "irregular-income" && (
                  <span className="text-xs text-amber-600 block">Irregular Income</span>
                )}
              </h3>
              <p className="text-sm text-gray-600 flex-grow">{feature.description}</p>
              <div className="mt-4 text-primary font-medium text-sm flex items-center">
                Explore
                <span className="material-icons text-sm ml-1">arrow_forward</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      
      {/* Financial Management Disclaimer */}
      <div className="mb-8">
        <FinancialDisclaimer 
          variant="compact" 
          calculatorType="generic"
          size="md"
        />
      </div>
    </div>
  );
}

const features: FeatureCard[] = [

  {
    id: "budget-buddy",
    title: "Budget Buddy",
    description: "Create and manage personalized budgets with fixed monthly income to keep your spending in check and achieve financial goals.",
    icon: "account_balance_wallet",
    route: "/budget-buddy",
    color: "bg-green-500"
  },
  {
    id: "irregular-income",
    title: "Budget Buddy",
    description: "Tools to manage fluctuating income streams with specialized budgeting techniques for freelancers and contractors.",
    icon: "sync_alt",
    route: "/irregular-income",
    color: "bg-amber-500"
  },

  {
    id: "goal-settings",
    title: "Goal Settings",
    description: "Set and track financial goals with customizable targets and progress tracking.",
    icon: "target", // Custom icon identifier
    route: "/goal-settings",
    color: "bg-red-500"
  },

  {
    id: "risk-assessment",
    title: "Risk Assessment",
    description: "Evaluate your investment risk tolerance and get personalized asset allocation recommendations.",
    icon: "analytics",
    route: "/risk-assessment",
    color: "bg-indigo-600"
  },
  {
    id: "portfolio-simulator",
    title: "Portfolio Simulator",
    description: "Simulate performance of different portfolio allocations and optimize your investment strategy.",
    icon: "leaderboard",
    route: "/portfolio-simulator",
    color: "bg-purple-600"
  },

  {
    id: "financial-journey",
    title: "Financial Journey",
    description: "Track your progress over time with milestone tracking and personalized financial roadmaps.",
    icon: "route",
    route: "/financial-journey",
    color: "bg-cyan-500"
  },
  {
    id: "spending-patterns",
    title: "Spending Patterns",
    description: "Analyze your spending habits with visual breakdowns and identify areas where you can save more.",
    icon: "pie_chart",
    route: "/spending-patterns",
    color: "bg-purple-500"
  },

  {
    id: "smart-life-manager",
    title: "Smart Life Manager",
    description: "One place to store everything that matters - manage important documents, policies, and family records securely.",
    icon: "smart-life-manager",
    route: "/smart-life-manager",
    color: "bg-teal-500"
  },
  {
    id: "smart-financial-checklist",
    title: "Smart Checklist",
    description: "Priority-ordered financial tasks covering essential foundation, investments, debt management, and protection planning.",
    icon: "checklist",
    route: "/smart-financial-checklist",
    color: "bg-emerald-600"
  },
  {
    id: "financial-health-report",
    title: "Financial Health Report",
    description: "Comprehensive 65-page style financial analysis with educational insights, gap analysis, and improvement recommendations. Non-advisory, RBI compliant.",
    icon: "assessment",
    route: "/financial-health-report",
    color: "bg-indigo-600"
  },

];