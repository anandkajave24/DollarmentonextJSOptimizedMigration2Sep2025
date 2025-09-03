import React from "react";
import Link from "next/link";
import { Card } from "../components/ui/card";
import { SEO } from "../components/SEO";
import { 
  Brain, 
  BookOpen, 
  Gamepad2, 
  Puzzle, 
  Lightbulb, 
  TrendingUp, 
  Baby,
  ArrowRight
} from "lucide-react";

interface LearningCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  to: string;
  bgColor: string;
  iconText: string;
}

export default function Learning() {
  const learningCards: LearningCardProps[] = [
    {
      title: "Money Mindset & Habits",
      description: "Build a healthy relationship with money and develop smart spending habits for financial success.",
      icon: Brain,
      to: "/relationship-with-money",
      bgColor: "bg-blue-500",
      iconText: "psycho"
    },
    {
      title: "Financial Education Hub",
      description: "Learn about 401k, IRA, credit scores, budgeting, and essential personal finance topics.",
      icon: BookOpen,
      to: "/learning-hub",
      bgColor: "bg-indigo-500",
      iconText: "edu"
    },
    {
      title: "Wealth Building Games",
      description: "Interactive games teaching investment strategies, retirement planning, and wealth accumulation.",
      icon: Gamepad2,
      to: "/financial-freedom-game",
      bgColor: "bg-green-500",
      iconText: "s-exp"
    },
    {
      title: "Investment Challenge",
      description: "Solve puzzles about stocks, bonds, ETFs, and portfolio diversification strategies.",
      icon: Puzzle,
      to: "/investment-puzzles",
      bgColor: "bg-purple-500",
      iconText: "extend"
    },
    {
      title: "Financial Quiz Hub",
      description: "Test your knowledge on credit cards, mortgages, taxes, and retirement planning.",
      icon: Lightbulb,
      to: "/investment-riddles",
      bgColor: "bg-yellow-500",
      iconText: "tribu"
    },
    {
      title: "Financial Milestones",
      description: "Track your progress from beginner to expert with personalized financial growth levels.",
      icon: TrendingUp,
      to: "/financial-growth-levels",
      bgColor: "bg-emerald-500",
      iconText: "e-flag"
    },
    {
      title: "Kids Money Academy",
      description: "Teach children about saving, allowances, and smart money habits through fun activities.",
      icon: Baby,
      to: "/dollarmento-kids",
      bgColor: "bg-pink-500",
      iconText: "kid_ca"
    }
  ];

  return (
    <div className="px-6 py-5 max-w-4xl mx-auto">
      <SEO 
        title="Financial Education & Wealth Building Games"
        description="Master personal finance with interactive learning resources covering 401k, IRA, credit scores, mortgages, and investment strategies for Americans."
        keywords="401k education, IRA planning, credit score improvement, mortgage calculator, investment strategies, retirement planning, wealth building games, financial literacy USA"
        canonical="https://dollarmento.com/learning"
        ogType="website"
      />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Financial Education & Wealth Building</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {learningCards.map((card, index) => (
          <Link key={index} href={card.to}>
            <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
              <div className={`mb-3 w-12 h-12 rounded-full ${card.bgColor} flex items-center justify-center relative`}>
                <card.icon className="w-6 h-6 text-white" />
                <span className="absolute -bottom-1 -right-1 text-xs font-bold text-white bg-black bg-opacity-30 px-1 rounded">
                  {card.iconText}
                </span>
              </div>
              <h3 className="font-medium text-lg mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600 flex-grow">{card.description}</p>
              <div className="mt-4 text-primary font-medium text-sm flex items-center">
                Explore
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}