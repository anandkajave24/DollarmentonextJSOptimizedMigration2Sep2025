import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '../components/SEO';
import { 
  Calculator, 
  TrendingUp, 
  Shield, 
  BookOpen, 
  Target, 
  PiggyBank,
  Users,
  Home,
  CreditCard,
  GraduationCap,
  DollarSign,
  BarChart3,
  Brain,
  Play,
  Globe,
  FileText,
  Briefcase,
  Receipt,
  Wallet,
  LineChart,
  ShieldCheck,
  Building,
  Activity,
  User
} from 'lucide-react';

export default function Sitemap() {
  const sitePages = {
    'Financial Calculators': [
      { name: '401(k) Calculator', href: '/401k-calculator', icon: PiggyBank },
      { name: 'Mortgage Calculator', href: '/mortgage-calculator', icon: Home },
      { name: 'Tax Calculator', href: '/tax-calculator', icon: Receipt },
      { name: 'EMI Calculator', href: '/emi-calculator', icon: Calculator },
      { name: 'SIP Calculator', href: '/sip-calculator', icon: TrendingUp },
      { name: 'Retirement Calculator', href: '/retirement-calculator', icon: PiggyBank },
      { name: 'Term Insurance Calculator', href: '/term-insurance-calculator', icon: Shield },
      { name: 'Financial Calculators Hub', href: '/financial-calculators', icon: Calculator },
      { name: 'PPF Calculator', href: '/ppf-calculator', icon: PiggyBank },
      { name: 'SWP Calculator', href: '/swp-calculator', icon: TrendingUp },
      { name: 'Home Down Payment Calculator', href: '/home-down-payment-calculator', icon: Home },
      { name: 'Rent vs Buy Calculator', href: '/rent-vs-buy-calculator', icon: Home },
      { name: 'Roth IRA Calculator', href: '/roth-ira-calculator', icon: PiggyBank },
      { name: 'Traditional IRA Calculator', href: '/traditional-ira-calculator', icon: PiggyBank },
      { name: 'Social Security Calculator', href: '/social-security-calculator', icon: Shield },
      { name: 'Dollar Cost Averaging Calculator', href: '/dollar-cost-averaging-calculator', icon: TrendingUp },
      { name: 'CD Calculator', href: '/cd-calculator', icon: Calculator },
      { name: 'Debt Consolidation Calculator', href: '/debt-consolidation-calculator', icon: CreditCard },
      { name: 'Student Loan Calculator', href: '/student-loan-calculator', icon: GraduationCap },
      { name: 'Auto Loan Calculator', href: '/auto-loan-calculator', icon: Calculator },
      { name: 'Personal Loan Calculator', href: '/personal-loan-calculator', icon: Calculator },
      { name: '529 Plan Calculator', href: '/529-plan-calculator', icon: GraduationCap },
      { name: 'Compound Interest Calculator', href: '/compound-interest-calculator', icon: TrendingUp },
      { name: 'Emergency Fund Calculator', href: '/emergency-fund-calculator', icon: Shield },
      { name: 'Credit Card Payoff Calculator', href: '/credit-card-payoff-calculator', icon: CreditCard },
      { name: 'Simple Interest Calculator', href: '/simple-interest-calculator', icon: Calculator },
      { name: 'CAGR Calculator', href: '/cagr-calculator', icon: TrendingUp },
      { name: 'HSA Calculator', href: '/hsa-calculator', icon: Shield },
      { name: 'Loan Prepayment Calculator', href: '/loan-prepayment-calculator', icon: Calculator },
      { name: 'Capital Gains Tax Calculator', href: '/capital-gains-tax-calculator', icon: Receipt },
      { name: 'Tax Loss Harvesting Calculator', href: '/tax-loss-harvesting-calculator', icon: Receipt },
      { name: 'Real Estate Calculator', href: '/real-estate-calculator', icon: Home },
      { name: 'Currency Converter', href: '/currency-converter', icon: Globe },
      { name: 'Life Insurance Calculator', href: '/life-insurance-calculator', icon: Shield },
      { name: 'Refinance Calculator', href: '/refinance-calculator', icon: Home },
      { name: 'Payroll Tax Calculator', href: '/payroll-tax-calculator', icon: Receipt },
      { name: 'Fixed Deposit Calculator', href: '/fd-calculator', icon: Calculator },
      { name: 'Lumpsum Calculator', href: '/lumpsum-calculator', icon: TrendingUp },
      { name: 'Net Worth Calculator', href: '/net-worth-calculator', icon: BarChart3 },
      { name: 'Stock Average Calculator', href: '/stock-average-calculator', icon: TrendingUp },
      { name: 'Brokerage Fees Calculator', href: '/brokerage-fees-calculator', icon: Calculator },
      { name: 'Mutual Fund Calculator', href: '/mutual-fund-calculator', icon: TrendingUp },
      { name: 'ETF Calculator', href: '/etf-calculator', icon: TrendingUp },
      { name: 'Savings Calculator', href: '/savings-calculator', icon: PiggyBank },
      { name: 'Money Market Calculator', href: '/money-market-calculator', icon: Calculator },
      { name: 'Budget Planner Calculator', href: '/budget-planner-calculator', icon: Calculator },
      { name: 'Money Saving Challenge Generator', href: '/money-saving-challenge-generator', icon: Target },
      { name: 'Yes Bank FD Calculator', href: '/yes-bank-fd-calculator', icon: Calculator }
    ],
    'Personal Finance Tools': [
      { name: 'Budget Buddy', href: '/budget-buddy', icon: Wallet },
      { name: 'Debt Payoff Calculator', href: '/debt-payoff', icon: CreditCard },
      { name: 'Credit Score Simulator', href: '/credit-score-simulator', icon: BarChart3 },
      { name: 'Goal Settings', href: '/goal-settings', icon: Target },
      { name: 'Spending Patterns', href: '/spending-patterns', icon: Activity },
      { name: 'Smart Credit Card Usage', href: '/smart-credit-card-usage', icon: CreditCard },
      { name: 'Credit-Debt Overview', href: '/credit-debt-overview', icon: CreditCard },
      { name: 'Debt Payoff Strategies', href: '/debt-payoff-strategies', icon: CreditCard },
      { name: 'Smart Credit Card', href: '/smart-credit-card', icon: CreditCard },
      { name: 'Credit Card Usage', href: '/credit-card-usage', icon: CreditCard },
      { name: 'Financial Management', href: '/financial-management', icon: BarChart3 },
      { name: 'Irregular Income', href: '/irregular-income', icon: Wallet },
      { name: 'Risk Assessment', href: '/risk-assessment', icon: ShieldCheck },
      { name: 'Explore', href: '/explore', icon: Globe },
      { name: 'Insights', href: '/insights', icon: Brain },
      { name: 'Goals', href: '/goals', icon: Target },
      { name: 'Smart Life Manager', href: '/smart-life-manager', icon: Target },
      { name: 'Financial Growth Levels', href: '/financial-growth-levels', icon: TrendingUp },
      { name: 'Smart Financial Checklist', href: '/smart-financial-checklist', icon: Target },
      { name: 'Financial Health Report', href: '/financial-health-report', icon: FileText },
      { name: 'Financial Planner Pro', href: '/run-financial-scenario', icon: Briefcase },
      { name: 'Checkpoints', href: '/checkpoints', icon: Target },
      { name: 'Profile', href: '/profile', icon: User }
    ],
    'Investment & Markets': [
      { name: 'Investment Market Menu', href: '/investment-market-menu', icon: TrendingUp },
      { name: 'Stocks Screener', href: '/stocks-screener', icon: Activity },
      { name: 'Market Behaviour', href: '/market-behaviour', icon: LineChart },
      { name: 'American Investments', href: '/indian-investments', icon: Globe },
      { name: 'Investment Options Overview', href: '/investment-options-overview', icon: Briefcase },
      { name: 'Tax Saving Investments', href: '/tax-saving-investments', icon: Receipt },
      { name: 'Tax Harvesting', href: '/tax-harvesting', icon: Receipt },
      { name: 'Market Data', href: '/market-data', icon: LineChart },
      { name: 'Historical Chart', href: '/historical-chart', icon: LineChart },
      { name: 'Portfolio Simulator', href: '/portfolio-simulator', icon: Briefcase },
      { name: 'Investment Rules', href: '/investment-rules', icon: FileText }
    ],
    'Education & Learning': [
      { name: 'Learning Hub', href: '/learning-hub', icon: BookOpen },
      { name: 'Financial Education', href: '/financial-education', icon: GraduationCap },
      { name: 'Financial Journey', href: '/financial-journey', icon: Target },
      { name: 'Financial Freedom Game', href: '/financial-freedom-game', icon: Play },
      { name: 'USA Wealth Building Games', href: '/usa-wealth-building-games', icon: Play },
      { name: 'Investment Puzzles', href: '/investment-puzzles', icon: Brain },
      { name: 'Investment Riddles', href: '/investment-riddles', icon: Brain },
      { name: 'Financial Word Search', href: '/word-search', icon: Brain },
      { name: 'Learning', href: '/learning', icon: BookOpen },
      { name: 'Relationship with Money', href: '/relationship-with-money', icon: DollarSign },
      { name: 'DollarMento Kids', href: '/dollarmento-kids', icon: GraduationCap },
      { name: 'Guide', href: '/guide', icon: BookOpen }
    ],
    'Insurance & Protection': [
      { name: 'Insurance Hub V2', href: '/insurance-hub', icon: Shield },
      { name: 'Insurance Guide', href: '/insurance-guide', icon: ShieldCheck },
      { name: 'Term Insurance Calculator', href: '/term-insurance-calculator', icon: Shield }
    ],
    'Community & Social': [
      { name: 'Community', href: '/community', icon: Users },
      { name: 'Community Features', href: '/community-features', icon: Users }
    ],
    'Account & Settings': [
    ],
    'Legal & Information': [
      { name: 'Privacy Policy', href: '/privacy-policy', icon: FileText },
      { name: 'Terms of Service', href: '/terms-of-service', icon: FileText },
      { name: 'Data Deletion', href: '/data-deletion', icon: FileText },
      { name: 'Legal', href: '/legal', icon: FileText },
      { name: 'CMS Admin', href: '/admin/cms', icon: Building }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Sitemap - DollarMento Financial Platform"
        description="Complete sitemap of DollarMento's financial education platform including calculators, tools, learning resources, and community features."
        keywords="sitemap, financial tools, calculators, investment education, personal finance"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">DollarMento Sitemap</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore all pages and tools available on DollarMento's comprehensive financial education platform.
            Find calculators, learning resources, investment tools, and community features.
          </p>
        </div>

        {/* Navigation Link */}
        <div className="mb-8">
          <Link href="/">
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Homepage
            </button>
          </Link>
        </div>

        {/* Sitemap Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(sitePages).map(([category, pages]) => (
            <Card key={category} className="h-fit">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pages.map((page, index) => (
                    <Link key={index} href={page.href}>
                      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <page.icon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700 hover:text-blue-600">
                          {page.name}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SEO Information */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About DollarMento</h2>
          <div className="max-w-4xl mx-auto text-gray-600 space-y-4">
            <p>
              DollarMento is a comprehensive financial education platform designed to help Americans achieve financial literacy and independence. 
              Our platform offers over 45+ financial calculators, educational resources, investment tools, and community features.
            </p>
            <p>
              Whether you're planning for retirement with our 401(k) calculator, managing debt with our payoff strategies, 
              or learning about investments through our educational games, DollarMento provides the tools and knowledge you need.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">45+</div>
                <div className="text-sm text-gray-500">Financial Calculators</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">114+</div>
                <div className="text-sm text-gray-500">Total Pages</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">20+</div>
                <div className="text-sm text-gray-500">Educational Tools</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-gray-500">Free Access</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© 2025 DollarMento. All rights reserved. Free financial education for everyone.</p>
          <p className="mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}