import React, { ReactNode } from "react";
import { SEO } from "../SEO";
import { Card } from "../ui/card";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  keywords: string;
  children: ReactNode;
  calculatorType?: string;
  icon?: string;
}

export function CalculatorLayout({
  title,
  description,
  keywords,
  children,
  calculatorType,
  icon = "calculate"
}: CalculatorLayoutProps) {
  return (
    <div className="px-6 py-6 max-w-4xl mx-auto">
      <SEO
        title={`${title} | DollarMento Financial Tools`}
        description={description}
        keywords={keywords}
        canonical={`https://dollarmento.com/${title.toLowerCase().replace(/\s+/g, '-')}`}
        ogType="website"
      />

      <div className="mb-8">
        <Link href="/financial-calculators" className="flex items-center text-blue-600 hover:text-blue-800 mb-5">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Back to All Calculators</span>
        </Link>

        <div className="flex items-center gap-3 mb-3">
          {icon && (
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="material-icons text-blue-700">{icon}</span>
            </div>
          )}
          <h1 className="text-2xl font-bold text-blue-800">{title}</h1>
        </div>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        {calculatorType && (
          <div className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-4 font-medium">
            {calculatorType} Calculator
          </div>
        )}
      </div>

      <div>{children}</div>

      <div className="mt-10 bg-gray-50 rounded-lg p-6 border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold mb-5 text-blue-800">Calculator Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex">
            <div className="mr-3 mt-1">
              <span className="flex items-center justify-center rounded-full bg-blue-100 w-9 h-9">
                <span className="material-icons text-blue-700 text-sm">tips_and_updates</span>
              </span>
            </div>
            <div>
              <h3 className="font-medium mb-1 text-blue-700">Compare Scenarios</h3>
              <p className="text-sm text-gray-600">
                Try different input values to see how they affect the results. This can help you make better financial decisions.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-3 mt-1">
              <span className="flex items-center justify-center rounded-full bg-blue-100 w-9 h-9">
                <span className="material-icons text-blue-700 text-sm">sync</span>
              </span>
            </div>
            <div>
              <h3 className="font-medium mb-1 text-blue-700">Regular Updates</h3>
              <p className="text-sm text-gray-600">
                Financial parameters change over time. Remember to recalculate when interest rates, inflation, or other factors change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}