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
        title="Credit & Tax Management Tools"
        description="Manage your credit wisely, create effective debt payoff strategies, and optimize your tax planning with comprehensive tools for credit cards, debt elimination, and tax-saving investments."
        keywords="credit card management, credit score improvement, debt payoff strategies, tax saving investments, debt snowball, debt avalanche, debt consolidation, creditworthiness"
        canonical="https://dollarmento.com/credit-debt-overview"
      />
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Credit & Tax Management</h1>
        <p className="text-gray-600 mt-2">Complete tools for credit management, debt elimination, and tax-saving investments</p>
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
    id: "smart-card-optimization",
    title: "Smart Card Optimization",
    description: "Use interactive tools to analyze credit utilization, payment strategies, and explore options that may help improve your credit health.",
    icon: "credit_score",
    route: "/smart-credit-card",
    color: "bg-red-500"
  },
  {
    id: "credit-card-mastery",
    title: "Credit Card Mastery",
    description: "Learn strategies to maximize credit card benefits, manage your credit cards wisely, and avoid debt traps and interest charges.",
    icon: "credit_card",
    route: "/smart-credit-card-usage",
    color: "bg-purple-500"
  },

  {
    id: "credit-score-simulator",
    title: "Credit Score Simulator",
    description: "Interactive credit score simulator to understand your score and learn how to improve it. See real-time impact of financial decisions on your credit score and get personalized improvement strategies.",
    icon: "assessment",
    route: "/credit-score-simulator",
    color: "bg-indigo-500"
  },
  {
    id: "debt-payoff-strategies",
    title: "Debt Payoff Strategies",
    description: "Discover powerful, easy-to-follow debt repayment strategies—like the Snowball and Avalanche methods—that help you eliminate credit card balances, personal loans, and student debt faster. Learn how to prioritize, budget, and regain control of your financial future with confidence.",
    icon: "trending_down",
    route: "/debt-payoff-strategies",
    color: "bg-green-500"
  },
  {
    id: "tax-saving-investments",
    title: "Tax Saving Investments",
    description: "Discover tax-advantaged investment options like 401(k)s, IRAs, and HSAs that help you grow wealth while lowering your taxable income. Make the most of government-backed incentives and optimize your savings for both retirement and tax season.",
    icon: "savings",
    route: "/tax-saving-investments",
    color: "bg-amber-500"
  }
];