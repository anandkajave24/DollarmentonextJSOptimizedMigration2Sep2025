import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';
import { SEO } from '../components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Shield, 
  DollarSign, 
  PiggyBank, 
  Building2, 
  GraduationCap,
  Heart,
  ArrowLeft,
  ChevronRight,
  Info,
  Star,
  BarChart3
} from 'lucide-react';

interface InvestmentOption {
  id: string;
  category: string;
  name: string;
  description: string;
  returns: string;
  risk: 'Very Low' | 'Low' | 'Low-Medium' | 'Medium' | 'High' | 'Very High';
  liquidity: 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low';
  taxBenefit: string;
  bestFor: string;
  minInvestment: string;
  icon: React.ReactNode;
  color: string;
  popular?: boolean;
}

const USAInvestments: React.FC = () => {
  return (
    <>
      <SEO 
        title="USA Investments Guide - Best Investment Options in America"
        description="Comprehensive guide to investment options in the USA including stocks, bonds, ETFs, real estate, and retirement accounts. Find the best investment strategies for American investors."
        keywords="USA investments, American investment options, US stocks, ETFs, bonds, 401k, IRA, real estate investing, investment guide USA, retirement investing"
        canonical="https://dollarmento.com/usa-investments"
      />
      <USAInvestmentsContent />
    </>
  );
};

const USAInvestmentsContent: React.FC = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');

  const investmentOptions: InvestmentOption[] = [
    // Stocks (Equities)
    {
      id: 'blue-chip-stocks',
      category: 'Stocks',
      name: 'Blue-Chip Stocks',
      description: 'Stable, well-established companies like Apple, Microsoft, Coca-Cola with strong dividend history.',
      returns: '7-10% annually',
      risk: 'Medium',
      liquidity: 'Very High',
      taxBenefit: 'Long-term capital gains tax benefits',
      bestFor: 'Conservative growth investors, dividend seekers',
      minInvestment: '$100+',
      icon: <Building2 className="w-6 h-6" />,
      color: 'bg-blue-500',
      popular: true
    },
    {
      id: 'growth-stocks',
      category: 'Stocks',
      name: 'Growth Stocks',
      description: 'High-potential companies like Tesla, tech startups with rapid growth prospects.',
      returns: '10-15% annually (volatile)',
      risk: 'High',
      liquidity: 'Very High',
      taxBenefit: 'Long-term capital gains if held >1 year',
      bestFor: 'Young investors, high risk tolerance',
      minInvestment: '$50+',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      id: 'dividend-stocks',
      category: 'Stocks',
      name: 'Dividend Stocks',
      description: 'Companies that regularly distribute profits to shareholders as dividends.',
      returns: '4-8% + dividends',
      risk: 'Medium',
      liquidity: 'Very High',
      taxBenefit: 'Qualified dividends taxed at capital gains rates',
      bestFor: 'Income-focused investors, retirees',
      minInvestment: '$100+',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-purple-500'
    },

    // Bonds
    {
      id: 'treasury-bonds',
      category: 'Bonds',
      name: 'U.S. Treasury Bonds',
      description: 'Government-issued bonds backed by full faith and credit of the U.S. government.',
      returns: '2-5% annually',
      risk: 'Very Low',
      liquidity: 'High',
      taxBenefit: 'Federal tax on interest, state tax exempt',
      bestFor: 'Conservative investors, capital preservation',
      minInvestment: '$100',
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-emerald-500',
      popular: true
    },
    {
      id: 'municipal-bonds',
      category: 'Bonds',
      name: 'Municipal Bonds',
      description: 'Bonds issued by state and local governments, often providing tax-free income.',
      returns: '3-5% tax-free',
      risk: 'Low',
      liquidity: 'Medium',
      taxBenefit: 'Federal tax-free, often state tax-free',
      bestFor: 'High-income investors, tax optimization',
      minInvestment: '$1,000+',
      icon: <Building2 className="w-6 h-6" />,
      color: 'bg-teal-500'
    },
    {
      id: 'corporate-bonds',
      category: 'Bonds',
      name: 'Corporate Bonds',
      description: 'Bonds issued by companies, offering higher yields than government bonds.',
      returns: '4-7% annually',
      risk: 'Low-Medium',
      liquidity: 'Medium',
      taxBenefit: 'Interest taxed as ordinary income',
      bestFor: 'Income seekers, moderate risk tolerance',
      minInvestment: '$1,000+',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-orange-500'
    },

    // ETFs
    {
      id: 'index-etfs',
      category: 'ETFs',
      name: 'Index ETFs (S&P 500)',
      description: 'Track major market indices like S&P 500, providing instant diversification.',
      returns: '8-12% annually',
      risk: 'Medium',
      liquidity: 'Very High',
      taxBenefit: 'Tax-efficient, long-term capital gains',
      bestFor: 'Passive investors, beginners, diversification',
      minInvestment: '$1 (fractional shares)',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-indigo-500',
      popular: true
    },
    {
      id: 'sector-etfs',
      category: 'ETFs',
      name: 'Sector ETFs',
      description: 'Focus on specific sectors like technology, healthcare, energy, or clean energy.',
      returns: '5-15% (sector dependent)',
      risk: 'Medium',
      liquidity: 'Very High',
      taxBenefit: 'Tax-efficient structure',
      bestFor: 'Sector-specific investing, thematic exposure',
      minInvestment: '$50+',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-cyan-500'
    },

    // Mutual Funds
    {
      id: 'equity-mutual-funds',
      category: 'Mutual Funds',
      name: 'Equity Mutual Funds',
      description: 'Professionally managed funds investing in diversified stock portfolios.',
      returns: '5-10% annually',
      risk: 'Medium',
      liquidity: 'High',
      taxBenefit: 'Tax-deferred in retirement accounts',
      bestFor: 'Passive investors, 401(k) contributions',
      minInvestment: '$1,000+ (lower in 401k)',
      icon: <PiggyBank className="w-6 h-6" />,
      color: 'bg-rose-500'
    },
    {
      id: 'target-date-funds',
      category: 'Mutual Funds',
      name: 'Target-Date Funds',
      description: 'Automatically adjust asset allocation based on retirement date proximity.',
      returns: '6-9% annually',
      risk: 'Medium',
      liquidity: 'High',
      taxBenefit: 'Tax-deferred in retirement accounts',
      bestFor: 'Retirement planning, hands-off investors',
      minInvestment: '$1,000+',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'bg-violet-500',
      popular: true
    },

    // Retirement Accounts
    {
      id: '401k',
      category: 'Retirement',
      name: '401(k) Plans',
      description: 'Employer-sponsored retirement plans with potential employer matching.',
      returns: '6-10% (investment dependent)',
      risk: 'Medium',
      liquidity: 'Very Low',
      taxBenefit: 'Pre-tax contributions, tax-deferred growth',
      bestFor: 'Long-term retirement savers, employer match',
      minInvestment: 'Varies by employer',
      icon: <Building2 className="w-6 h-6" />,
      color: 'bg-amber-500',
      popular: true
    },
    {
      id: 'roth-ira',
      category: 'Retirement',
      name: 'Roth IRA',
      description: 'Individual retirement account with tax-free withdrawals in retirement.',
      returns: '6-10% (investment dependent)',
      risk: 'Medium',
      liquidity: 'Low',
      taxBenefit: 'Tax-free growth and withdrawals',
      bestFor: 'Young investors, tax diversification',
      minInvestment: '$100+',
      icon: <PiggyBank className="w-6 h-6" />,
      color: 'bg-emerald-600'
    },
    {
      id: 'traditional-ira',
      category: 'Retirement',
      name: 'Traditional IRA',
      description: 'Individual retirement account with potential tax deductions on contributions.',
      returns: '6-10% (investment dependent)',
      risk: 'Medium',
      liquidity: 'Low',
      taxBenefit: 'Tax-deductible contributions, tax-deferred growth',
      bestFor: 'Current tax deduction seekers',
      minInvestment: '$100+',
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-blue-600'
    },

    // Real Estate
    {
      id: 'reits',
      category: 'Real Estate',
      name: 'REITs',
      description: 'Real Estate Investment Trusts that trade like stocks and pay dividends.',
      returns: '4-8% dividends + appreciation',
      risk: 'Medium',
      liquidity: 'High',
      taxBenefit: 'Some dividends may be tax-advantaged',
      bestFor: 'Real estate exposure, dividend income',
      minInvestment: '$100+',
      icon: <Building2 className="w-6 h-6" />,
      color: 'bg-yellow-500'
    },

    // Education & Health
    {
      id: '529-plan',
      category: 'Education',
      name: '529 Education Plans',
      description: 'Tax-advantaged savings plans designed for future education expenses.',
      returns: '5-10% (investment dependent)',
      risk: 'Medium',
      liquidity: 'Medium',
      taxBenefit: 'Tax-free growth for qualified education expenses',
      bestFor: 'Parents, education planning',
      minInvestment: '$25+',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'bg-pink-500'
    },
    {
      id: 'hsa',
      category: 'Health',
      name: 'Health Savings Account (HSA)',
      description: 'Triple tax-advantaged account for healthcare expenses, investable after $1,000.',
      returns: '5-10% (if invested)',
      risk: 'Low-Medium',
      liquidity: 'High',
      taxBenefit: 'Triple tax advantage (deduction, growth, withdrawals)',
      bestFor: 'High-deductible health plan holders',
      minInvestment: '$1+',
      icon: <Heart className="w-6 h-6" />,
      color: 'bg-red-500'
    },

    // Cash Equivalents
    {
      id: 'high-yield-savings',
      category: 'Cash',
      name: 'High-Yield Savings',
      description: 'FDIC-insured savings accounts offering competitive interest rates.',
      returns: '4-5% APY',
      risk: 'Very Low',
      liquidity: 'Very High',
      taxBenefit: 'Interest taxed as ordinary income',
      bestFor: 'Emergency funds, short-term goals',
      minInvestment: '$1+',
      icon: <PiggyBank className="w-6 h-6" />,
      color: 'bg-green-600'
    },
    {
      id: 'cds',
      category: 'Cash',
      name: 'Certificates of Deposit (CDs)',
      description: 'Fixed-term deposits offering guaranteed returns with FDIC insurance.',
      returns: '3-5% (term dependent)',
      risk: 'Very Low',
      liquidity: 'Low',
      taxBenefit: 'Interest taxed as ordinary income',
      bestFor: 'Capital preservation, guaranteed returns',
      minInvestment: '$500+',
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-gray-500'
    }
  ];

  const categories = ['all', 'Stocks', 'Bonds', 'ETFs', 'Mutual Funds', 'Retirement', 'Real Estate', 'Education', 'Health', 'Cash'];
  const riskLevels = ['all', 'Very Low', 'Low', 'Low-Medium', 'Medium', 'High', 'Very High'];

  const filteredOptions = investmentOptions.filter(option => {
    const categoryMatch = selectedCategory === 'all' || option.category === selectedCategory;
    const riskMatch = selectedRisk === 'all' || option.risk === selectedRisk;
    return categoryMatch && riskMatch;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Very Low': return 'bg-green-100 text-green-800';
      case 'Low': return 'bg-green-50 text-green-700';
      case 'Low-Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'High': return 'bg-red-100 text-red-800';
      case 'Very High': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="px-4 py-3 max-w-4xl mx-auto">
      <Helmet>
        <title>Investment Options USA - Comprehensive Guide to American Investments</title>
        <meta name="description" content="Explore comprehensive investment options in the USA including stocks, bonds, ETFs, mutual funds, retirement accounts, REITs, and more. Learn about returns, risks, and tax benefits." />
        <meta name="keywords" content="USA investments, stocks, bonds, ETFs, mutual funds, 401k, IRA, Roth IRA, REITs, investment options, American investing, retirement planning" />
      </Helmet>

      {/* Header */}
      <div className="flex items-center mb-6">
        <button 
          onClick={() => window.history.back()}
          className="mr-3 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <DollarSign className="w-8 h-8 mr-3 text-green-600" />
            Investment Options USA
          </h1>
          <p className="text-gray-600 mt-1">Comprehensive guide to investment opportunities in America</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Risk Level</label>
              <select 
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {riskLevels.map(risk => (
                  <option key={risk} value={risk}>
                    {risk === 'all' ? 'All Risk Levels' : risk + ' Risk'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOptions.map(option => (
          <Card key={option.id} className="hover:shadow-lg transition-shadow duration-200 relative">
            {option.popular && (
              <div className="absolute -top-2 -right-2 z-10">
                <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              </div>
            )}
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg ${option.color} flex items-center justify-center text-white`}>
                    {option.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">{option.name}</CardTitle>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {option.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600 line-clamp-2">{option.description}</p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-medium text-gray-500">Expected Returns:</span>
                  <div className="text-green-600 font-semibold">{option.returns}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Risk Level:</span>
                  <div>
                    <Badge className={`text-xs ${getRiskColor(option.risk)}`}>
                      {option.risk}
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Liquidity:</span>
                  <div className="text-blue-600 font-medium">{option.liquidity}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Min Investment:</span>
                  <div className="text-purple-600 font-medium">{option.minInvestment}</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-medium text-gray-500">Tax Benefits:</span>
                  <p className="text-gray-700">{option.taxBenefit}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Best For:</span>
                  <p className="text-gray-700">{option.bestFor}</p>
                </div>
              </div>

              <Button 
                className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800"
                variant="outline"
              >
                Learn More <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Takeaways */}
      <Card className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-xl text-green-900 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2" />
            Key Investment Principles for Americans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-800">Getting Started</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Maximize employer 401(k) match first (free money)</li>
                <li>• Build emergency fund in high-yield savings</li>
                <li>• Consider Roth IRA for tax-free retirement growth</li>
                <li>• Start with broad market index funds (S&P 500)</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-green-800">Advanced Strategies</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Diversify across asset classes and geographies</li>
                <li>• Use HSA as retirement account if eligible</li>
                <li>• Consider tax-loss harvesting for taxable accounts</li>
                <li>• Dollar-cost average for consistent investing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom CTA */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to Start Investing?</h3>
        <div className="flex flex-wrap justify-center gap-3">
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => router.push('/investment-risk-assessment')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Take Risk Assessment
          </Button>
          <Button 
            variant="outline"
            onClick={() => router.push('/portfolio-simulator')}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Try Portfolio Simulator
          </Button>
          <Button 
            variant="outline"
            onClick={() => router.push('/financial-calculators')}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Financial Calculators
          </Button>
        </div>
      </div>
    </div>
  );
};

export default USAInvestments;