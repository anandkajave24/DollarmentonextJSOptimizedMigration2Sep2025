import { Link } from "wouter";
import { Card } from "../components/ui/card";
import { SEO } from "../components/SEO";

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

export default function CreditDebtOverview() {
  return (
    <div className="px-4 py-6">
      <SEO 
        title="Credit & Debt Management Tools"
        description="Manage your credit wisely and create effective debt payoff strategies with tools focused on credit card usage, credit score improvement, and debt elimination."
        keywords="credit card management, credit score improvement, debt payoff strategies, debt snowball, debt avalanche, debt consolidation, creditworthiness"
        canonical="https://rupeesmart.com/credit-debt-overview"
      />
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Credit & Debt Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {features.map((feature) => (
          <Link key={feature.id} href={feature.route}>
            <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
              <div className={`mb-3 w-12 h-12 rounded-full ${feature.color} flex items-center justify-center`}>
                <span className="material-icons text-white">{feature.icon}</span>
              </div>
              <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 flex-grow">{feature.description}</p>
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

const features: FeatureCard[] = [
  {
    id: "smart-credit-card",
    title: "Smart Credit Card Management",
    description: "Use interactive tools to analyze credit utilization, payment strategies, and explore options that may help improve your credit health.",
    icon: "credit_score",
    route: "/smart-credit-card",
    color: "bg-red-500"
  },
  {
    id: "smart-credit-card-usage",
    title: "Credit Card Usage Guide",
    description: "Learn strategies to maximize credit card benefits, manage your credit cards wisely, and avoid debt traps and interest charges.",
    icon: "credit_card",
    route: "/smart-credit-card-usage",
    color: "bg-purple-500"
  },
  {
    id: "credit-score",
    title: "Credit Score",
    description: "Monitor your credit score, understand credit report factors, and discover effective ways to improve your creditworthiness.",
    icon: "analytics",
    route: "/credit-score",
    color: "bg-blue-500"
  },
  {
    id: "debt-payoff-strategies",
    title: "Debt Payoff Strategies",
    description: "Explore proven strategies for eliminating debt efficiently using methods like debt snowball, avalanche, and debt consolidation.",
    icon: "trending_down",
    route: "/debt-payoff-strategies",
    color: "bg-green-500"
  }
];