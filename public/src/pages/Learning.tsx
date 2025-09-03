import React from "react";
import { Link } from "wouter";
import { Card } from "../components/ui/card";
import { SEO } from "../components/SEO";

interface LearningCardProps {
  title: string;
  description: string;
  icon: string;
  to: string;
  bgColor: string;
}

export default function Learning() {
  const learningCards: LearningCardProps[] = [
    {
      title: "Relationship with Money",
      description: "Explore your personal relationship with money and develop healthier financial habits.",
      icon: "psychology",
      to: "/relationship-with-money",
      bgColor: "bg-blue-500"
    },
    {
      title: "Learning Hub",
      description: "Access educational resources, articles, and tutorials on personal finance concepts.",
      icon: "local_library",
      to: "/learning-hub",
      bgColor: "bg-indigo-500"
    },
    {
      title: "Financial Freedom Games",
      description: "Interactive games designed to teach financial freedom concepts in an engaging way.",
      icon: "sports_esports",
      to: "/financial-freedom-game",
      bgColor: "bg-green-500"
    },
    {
      title: "Investment Puzzles",
      description: "Solve investment puzzles to enhance your understanding of investment concepts.",
      icon: "extension",
      to: "/investment-puzzles",
      bgColor: "bg-purple-500"
    },
    {
      title: "Investment Riddles",
      description: "Test your financial knowledge with challenging investment riddles and scenarios.",
      icon: "lightbulb",
      to: "/investment-riddles",
      bgColor: "bg-yellow-500"
    },
    {
      title: "RupeeSmart Kids",
      description: "Financial education resources and activities designed specifically for children.",
      icon: "child_care",
      to: "/rupeesmart-kids",
      bgColor: "bg-pink-500"
    }
  ];

  return (
    <div className="px-6 py-5 max-w-4xl mx-auto">
      <SEO 
        title="Financial Learning & Educational Games"
        description="Improve your financial literacy with our interactive learning resources, educational games, and financial concepts taught in an engaging way."
        keywords="financial education, money games, financial literacy, investment learning, personal finance education, financial concepts, money management learning"
        canonical="https://rupeesmart.com/learning"
        ogType="website"
      />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Learning & Games</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {learningCards.map((card, index) => (
          <Link key={index} href={card.to}>
            <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
              <div className={`mb-3 w-12 h-12 rounded-full ${card.bgColor} flex items-center justify-center`}>
                <span className="material-icons text-white">{card.icon}</span>
              </div>
              <h3 className="font-medium text-lg mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600 flex-grow">{card.description}</p>
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