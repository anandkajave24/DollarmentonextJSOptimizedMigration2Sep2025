import React from "react";
import { CalculatorLayout } from "./CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface ComingSoonCalculatorProps {
  title: string;
  description: string;
  icon?: string;
  calculatorType?: string;
}

export function ComingSoonCalculator({
  title,
  description,
  icon = "calculate",
  calculatorType
}: ComingSoonCalculatorProps) {
  const keywords = `financial calculator, ${title.toLowerCase()}, RupeeSmart, financial planning`;

  return (
    <CalculatorLayout
      title={title}
      description={description}
      keywords={keywords}
      icon={icon}
      calculatorType={calculatorType}
    >
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-6">
          <span className="material-icons text-amber-600 text-2xl">hourglass_top</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          We're currently fine-tuning this calculator to provide you with the most accurate results. 
          Please check back soon!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/financial-calculators">
            <Button variant="outline">
              Browse Other Calculators
            </Button>
          </Link>
          <Link href="/">
            <Button>
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </CalculatorLayout>
  );
}