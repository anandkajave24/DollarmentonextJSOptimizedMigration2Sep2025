import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, TrendingUp, DollarSign, Home, PiggyBank, BookOpen } from 'lucide-react';
import { Link } from 'wouter';

// SEO Landing Pages for High-Impression Keywords
export const MortgageCalculator2025 = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Free Mortgage Calculator 2025 - Calculate Your Monthly Payment
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Use our comprehensive mortgage calculator to determine your monthly payment, total interest, and affordability. 
          Updated with 2025 rates and tax benefits.
        </p>
      </div>

      {/* FAQ Section for Featured Snippets */}
      <Card className="bg-blue-50 dark:bg-blue-950">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">How much can I afford for a mortgage in 2025?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Use the 28/36 rule: your housing costs should not exceed 28% of gross monthly income, 
              and total debt payments should not exceed 36%. Our calculator factors in your income, 
              debts, down payment, and current interest rates to determine your affordability.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">What is included in a mortgage payment?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              A mortgage payment typically includes Principal, Interest, Taxes, and Insurance (PITI). 
              Additional costs may include PMI (Private Mortgage Insurance), HOA fees, and utility costs.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">How do I calculate mortgage interest rates for 2025?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Current mortgage rates vary by loan type, credit score, down payment, and loan term. 
              Our calculator uses real-time rate data to provide accurate payment estimates.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Related Calculator Links */}
      <div className="grid md:grid-cols-3 gap-6">

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Investment Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Plan your investments with compound interest calculations.
            </p>
            <Link href="/compound-interest-calculator">
              <Button className="w-full">
                Start Planning <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="w-5 h-5" />
              Retirement Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Plan for retirement with 401k and IRA calculations.
            </p>
            <Link href="/retirement-calculator">
              <Button className="w-full">
                Plan Retirement <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Educational Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Mortgage Planning Guide 2025
          </CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <h3>Understanding Mortgage Types</h3>
          <p>
            Choose from various mortgage options including conventional loans, FHA loans, 
            VA loans, and USDA loans. Each has different requirements and benefits.
          </p>

          <h3>Credit Score Impact</h3>
          <p>
            Your credit score significantly affects your mortgage rate. Scores above 740 
            typically qualify for the best rates, while scores below 620 may require 
            special loan programs.
          </p>

          <h3>Down Payment Strategies</h3>
          <p>
            While 20% down avoids PMI, many programs allow lower down payments. 
            FHA loans require as little as 3.5% down, and VA loans offer 0% down options.
          </p>

          <h3>2025 Market Outlook</h3>
          <p>
            Stay informed about current market conditions, interest rate trends, 
            and housing market forecasts to make the best decisions for your situation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export const RetirementCalculatorUSA = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Retirement Planning Calculator USA - 401k & IRA Planner
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Plan your retirement with our comprehensive calculator including 401k, IRA, 
          Social Security, and employer matching. Updated for 2025 contribution limits.
        </p>
      </div>

      {/* Quick Tips for Better Rankings */}
      <Card className="bg-green-50 dark:bg-green-950">
        <CardHeader>
          <CardTitle>What percentage should I save for retirement?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Financial experts recommend saving 10-15% of your income for retirement, 
            including employer match. Use our calculator to determine your specific needs 
            based on your age, income, and retirement goals.
          </p>
        </CardContent>
      </Card>

      {/* Related Tools Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>401k Calculator with Employer Match</CardTitle>
            <CardDescription>
              Maximize your 401k contributions and employer matching benefits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/calculators">
              <Button className="w-full">Access 401k Calculator</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Security Benefits Calculator</CardTitle>
            <CardDescription>
              Estimate your Social Security benefits and optimize claiming strategy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/calculators">
              <Button className="w-full">Calculate Benefits</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const TaxCalculator2025IRS = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Tax Calculator 2025 IRS - Federal & State Tax Estimator
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Calculate your 2025 federal and state income taxes with updated tax brackets, 
          deductions, and credits. Optimize your tax strategy with professional guidance.
        </p>
      </div>

      {/* Tax FAQ */}
      <Card className="bg-yellow-50 dark:bg-yellow-950">
        <CardHeader>
          <CardTitle>2025 Tax Planning Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">What are the 2025 tax brackets?</h3>
            <p>Tax brackets for 2025 have been adjusted for inflation. Use our calculator 
            to see how your income fits into the current bracket structure.</p>
          </div>
          <div>
            <h3 className="font-semibold">How much can I contribute to retirement accounts in 2025?</h3>
            <p>2025 contribution limits: 401k - $23,000 ($30,500 with catch-up), 
            IRA - $7,000 ($8,000 with catch-up).</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/tax-calculator">
          <Button className="w-full h-20 text-lg">Federal Tax Calculator</Button>
        </Link>
        <Link href="/calculators">
          <Button className="w-full h-20 text-lg">State Tax Calculator</Button>
        </Link>
        <Link href="/calculators">
          <Button className="w-full h-20 text-lg">Tax Deduction Optimizer</Button>
        </Link>
      </div>
    </div>
  );
};