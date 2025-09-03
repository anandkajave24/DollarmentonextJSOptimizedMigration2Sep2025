"use client"

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  TrendingUp, 
  Shield, 
  BookOpen, 
  Target, 
  PiggyBank,
  ChevronDown,
  Users,
  Smartphone,
  Award,
  ArrowRight,
  Home,
  CreditCard,
  GraduationCap,
  DollarSign,
  BarChart3,
  Brain,
  Star,
  Check,
  Play,
  Zap,
  Globe,
  Lock,
  Rocket,
  Menu,
  Search,
  Bell,
  User,
  Clock,
  Calendar,
  Eye,
  MessageCircle,
  Activity,
  FileText,
  Briefcase,
  ChevronRight,
  ChevronUp,
  Building,
  Banknote,
  Receipt,
  Wallet,
  LineChart,
  ShieldCheck,
  Heart,
  X,
  Map
} from 'lucide-react';
import { SEO } from '../components/SEO';
// Logo now served from public folder
const dollarmentoLogo = '/logo.png';

const Landing = React.memo(() => {
  const [activeTab, setActiveTab] = useState('featured');
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Ensure mobile menu closes on desktop resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [marketData, setMarketData] = useState([
    { name: 'S&P 500', value: '5,446.68', change: '+12.44', percent: '+0.23%', positive: true },
    { name: 'DOW', value: '40,842.79', change: '-23.85', percent: '-0.06%', positive: false },
    { name: 'NASDAQ', value: '17,019.88', change: '+19.46', percent: '+0.11%', positive: true },
    { name: 'Gold', value: '$2,402.50', change: '+8.20', percent: '+0.34%', positive: true },
  ]);

  // Dropdown menu data
  const menuItems = {
    'news-learn': [
      { name: 'Learning Hub', href: '/learning-hub', icon: BookOpen },
      { name: 'Financial Education', href: '/financial-education', icon: GraduationCap },
      { name: 'DollarMento Kids', href: '/dollarmento-kids', icon: GraduationCap },
      { name: 'Financial Journey', href: '/financial-journey', icon: Map },
      { name: 'Relationship with Money', href: '/relationship-with-money', icon: Heart },
      { name: 'Market Behavior', href: '/market-behaviour', icon: LineChart }
    ],
    'markets': [
      { name: 'Investment Menu', href: '/investment-market-menu', icon: BarChart3 },
      { name: 'Indian Investments', href: '/indian-investments', icon: Globe },
      { name: 'Stock Screener', href: '/stocks-screener', icon: Activity },
      { name: 'Market Analysis', href: '/market-behaviour', icon: LineChart },
      { name: 'Portfolio Tools', href: '/portfolio-simulator', icon: Briefcase }
    ],
    'calculators': [
      { name: 'All Calculators', href: '/financial-calculators', icon: Calculator },
      { name: '401(k) Calculator', href: '/401k-calculator', icon: PiggyBank },
      { name: 'Roth IRA Calculator', href: '/roth-ira-calculator', icon: PiggyBank },
      { name: 'EMI Calculator', href: '/emi-calculator', icon: Home },
      { name: 'Tax Calculator', href: '/tax-calculator', icon: Receipt },
      { name: 'Budget Tools', href: '/budget-buddy', icon: Wallet }
    ],
    'personal-finance': [
      { name: 'Budget Buddy', href: '/budget-buddy', icon: Wallet },
      { name: 'Smart Financial Checklist', href: '/smart-financial-checklist', icon: Check },
      { name: 'Smart Life Manager', href: '/smart-life-manager', icon: Target },
      { name: 'Goal Settings', href: '/goal-settings', icon: Target },
      { name: 'Spending Patterns', href: '/spending-patterns', icon: BarChart3 },
      { name: 'Financial Growth Levels', href: '/financial-growth-levels', icon: TrendingUp }
    ],
    'community': [
      { name: 'Community Hub', href: '/community', icon: Users },
      { name: 'Financial Freedom Game', href: '/financial-freedom-game', icon: Play },
      { name: 'USA Wealth Building Games', href: '/usa-wealth-building-games', icon: Rocket },
      { name: 'Investment Puzzles', href: '/investment-puzzles', icon: Brain },
      { name: 'Investment Riddles', href: '/investment-riddles', icon: Search },
      { name: 'Financial Word Search', href: '/financial-word-search', icon: BookOpen }
    ]
  };

  // For static export, use client-side market data only
  React.useEffect(() => {
    // Static data that works with Next.js static export
    const staticMarketData = [
      { name: 'S&P 500', value: '5,446.68', change: '+12.44', percent: '+0.23%', positive: true },
      { name: 'DOW', value: '40,842.79', change: '-23.85', percent: '-0.06%', positive: false },
      { name: 'NASDAQ', value: '17,019.88', change: '+19.46', percent: '+0.11%', positive: true },
      { name: 'Gold', value: '$2,402.50', change: '+8.20', percent: '+0.34%', positive: true },
    ];
    
    setMarketData(staticMarketData);
  }, []);

  // Featured articles/tools in news-style format
  const featuredArticles = [
    {
      id: 1,
      title: "401(k) Calculator: Plan Your Retirement Savings",
      description: "Calculate your retirement contributions, employer matching, and projected growth with our comprehensive 401(k) planner.",
      category: "Retirement",
      readTime: "5 min tool",
      href: "/401k-calculator",
      tags: ["Retirement", "Calculator"]
    },
    {
      id: 2,
      title: "EMI Calculator: Loan Payment Planner", 
      description: "Calculate monthly EMI payments, total interest, and amortization schedules for your loan decisions.",
      category: "Loans",
      readTime: "3 min tool",
      href: "/emi-calculator",
      tags: ["Mortgage", "Real Estate"]
    },
    {
      id: 3,
      title: "Tax Calculator: Federal & State Tax Estimator",
      description: "Estimate your federal and state income taxes, deductions, and refunds for accurate tax planning.",
      category: "Tax Planning",
      readTime: "7 min tool",
      href: "/tax-calculator",
      tags: ["Tax", "Planning"]
    },
    {
      id: 4,
      title: "Budget Buddy: Complete Financial Planning Tool",
      description: "Track income, expenses, and savings goals with our comprehensive budget management system.",
      category: "Budgeting",
      readTime: "10 min tool",
      href: "/budget-buddy",
      tags: ["Budget", "Planning"]
    },
    {
      id: 5,
      title: "Investment Hub: Portfolio Analysis & Planning",
      description: "Analyze your investment portfolio, track performance, and plan your investment strategy.",
      category: "Investing",
      readTime: "8 min tool",
      href: "/investment-market-menu",
      tags: ["Investment", "Portfolio"]
    }
  ];

  const calculatorCategories = [
    { name: "Retirement", count: 5, icon: Users, href: "/financial-calculators?category=Retirement" },
    { name: "Mortgage & Real Estate", count: 6, icon: Home, href: "/financial-calculators?category=Mortgage" },
    { name: "Tax & Income", count: 7, icon: Calculator, href: "/financial-calculators?category=Tax" },
    { name: "Credit & Debt", count: 5, icon: CreditCard, href: "/financial-calculators?category=Credit" },
    { name: "Savings & Investment", count: 12, icon: TrendingUp, href: "/financial-calculators?category=Investment" },
    { name: "Insurance", count: 4, icon: Shield, href: "/financial-calculators?category=Insurance" }
  ];

  const topRates = [
    { name: "High-Yield Savings", rate: "5.00%", provider: "Marcus by Goldman Sachs", type: "APY" },
    { name: "6-Month CD", rate: "4.85%", provider: "Ally Bank", type: "APY" },
    { name: "30-Year Mortgage", rate: "6.78%", provider: "National Average", type: "APR" },
    { name: "Personal Loan", rate: "11.69%", provider: "LightStream", type: "APR" }
  ];

  const quickLinks = [
    { name: "Budget Tools", href: "/budget-buddy", icon: BarChart3 },
    { name: "Financial Games", href: "/financial-freedom-game", icon: Play },
    { name: "Smart Checklist", href: "/smart-financial-checklist", icon: Check },
    { name: "Learning Hub", href: "/learning-hub", icon: BookOpen },
    { name: "Tax Tools", href: "/tax-calculator", icon: Calculator },
    { name: "Investment Puzzles", href: "/investment-puzzles", icon: Brain },
    { name: "Kids Education", href: "/dollarmento-kids", icon: GraduationCap },
    { name: "Life Manager", href: "/smart-life-manager", icon: Target },
    { name: "Retirement Tools", href: "/401k-calculator", icon: PiggyBank },
    { name: "EMI Calculator", href: "/emi-calculator", icon: Home },
    { name: "Community", href: "/community", icon: Users },
    { name: "Goal Settings", href: "/goal-settings", icon: Target }
  ];

  const latestNews = [
    {
      title: "Fed Signals Potential Rate Cuts in 2024 as Inflation Cools",
      description: "Federal Reserve officials hint at possible interest rate reductions as inflation shows signs of stabilizing.",
      time: "2 hours ago",
      category: "Markets"
    },
    {
      title: "Best CD Rates Hit 5% APY as Banks Compete for Deposits",
      description: "Several major banks are offering competitive certificate of deposit rates to attract savers.",
      time: "4 hours ago", 
      category: "Banking"
    },
    {
      title: "Tax Season 2024: Key Changes Every Taxpayer Should Know",
      description: "Important updates to tax brackets, deductions, and filing requirements for the current tax year.",
      time: "1 day ago",
      category: "Taxes"
    }
  ];

  // Gaming & Interactive Tools
  const gamingTools = [
    {
      id: 1,
      title: "Financial Freedom Game",
      description: "Interactive game to learn investment strategies and build wealth through smart financial decisions.",
      category: "Game",
      duration: "15-30 min",
      href: "/financial-freedom-game",
      icon: Play,
      difficulty: "Beginner",
      tags: ["Interactive", "Learning"]
    },
    {
      id: 2,
      title: "USA Wealth Building Games",
      description: "Collection of games focused on American wealth-building strategies and financial independence.",
      category: "Game Collection",
      duration: "20-45 min",
      href: "/usa-wealth-building-games",
      icon: Rocket,
      difficulty: "Intermediate",
      tags: ["Strategy", "Wealth Building"]
    },
    {
      id: 3,
      title: "Investment Puzzles",
      description: "Solve investment-related puzzles to enhance your understanding of market dynamics and portfolio strategies.",
      category: "Puzzle",
      duration: "10-20 min",
      href: "/investment-puzzles",
      icon: Brain,
      difficulty: "All Levels",
      tags: ["Puzzle", "Investment"]
    },
    {
      id: 4,
      title: "Investment Riddles",
      description: "Challenge yourself with thought-provoking riddles about finance, investing, and money management.",
      category: "Riddle",
      duration: "5-15 min",
      href: "/investment-riddles",
      icon: Search,
      difficulty: "All Levels",
      tags: ["Critical Thinking", "Finance"]
    },
    {
      id: 5,
      title: "Financial Word Search",
      description: "Educational word search puzzles featuring financial terms, concepts, and investment vocabulary.",
      category: "Word Game",
      duration: "5-10 min",
      href: "/financial-word-search",
      icon: BookOpen,
      difficulty: "Beginner",
      tags: ["Educational", "Vocabulary"]
    }
  ];

  // Checklists & Planning Tools
  const checklistTools = [
    {
      id: 1,
      title: "Smart Financial Checklist",
      description: "Comprehensive financial health checklist covering budgeting, investing, insurance, and retirement planning.",
      category: "Checklist",
      items: "50+ Tasks",
      href: "/smart-financial-checklist",
      icon: Check,
      priority: "Essential",
      tags: ["Planning", "Organization"]
    },
    {
      id: 2,
      title: "Smart Life Manager",
      description: "Holistic life management tool integrating financial goals with personal and professional objectives.",
      category: "Life Planning",
      items: "Complete System",
      href: "/smart-life-manager",
      icon: Target,
      priority: "Advanced",
      tags: ["Goals", "Life Planning"]
    },
    {
      id: 3,
      title: "Goal Settings",
      description: "Set, track, and achieve your financial goals with our comprehensive goal management system.",
      category: "Goal Tracking",
      items: "Unlimited Goals",
      href: "/goal-settings",
      icon: Target,
      priority: "Important",
      tags: ["Goals", "Tracking"]
    },
    {
      id: 4,
      title: "Financial Growth Levels",
      description: "Track your financial progress through different growth stages from beginner to advanced investor.",
      category: "Progress Tracking",
      items: "10 Levels",
      href: "/financial-growth-levels",
      icon: TrendingUp,
      priority: "Motivational",
      tags: ["Progress", "Achievement"]
    }
  ];

  // Educational & Kids Content
  const educationalTools = [
    {
      id: 1,
      title: "DollarMento Kids",
      description: "Age-appropriate financial education for children, teaching money basics through interactive content.",
      category: "Kids Education",
      ageRange: "6-16 years",
      href: "/dollarmento-kids",
      icon: GraduationCap,
      level: "Child-Friendly",
      tags: ["Kids", "Education"]
    },
    {
      id: 2,
      title: "Financial Journey",
      description: "Guided journey through personal finance milestones from first job to retirement planning.",
      category: "Learning Path",
      ageRange: "Adults",
      href: "/financial-journey",
      icon: Map,
      level: "Progressive",
      tags: ["Journey", "Milestones"]
    },
    {
      id: 3,
      title: "Relationship with Money",
      description: "Explore and understand your psychological relationship with money and develop healthy financial habits.",
      category: "Psychology",
      ageRange: "Adults",
      href: "/relationship-with-money",
      icon: Heart,
      level: "Introspective",
      tags: ["Psychology", "Habits"]
    },
    {
      id: 4,
      title: "Learning Hub",
      description: "Comprehensive collection of financial education resources, courses, and expert guidance.",
      category: "Education Center",
      ageRange: "All Ages",
      href: "/learning-hub",
      icon: BookOpen,
      level: "Comprehensive",
      tags: ["Education", "Resources"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Configuration */}
      <SEO 
        title="Financial Planning Calculator Platform & Personal Finance Tools USA"
        description="DollarMento: 45+ free financial calculators for Americans. 401k planner, mortgage calculator, retirement planning, tax optimizer, investment tools & budget planner. Complete financial education platform."
        keywords="financial calculator, retirement calculator, budget calculator, investment calculator, mortgage calculator, tax calculator, loan calculator, savings calculator, financial planning, personal finance, 401k calculator, financial education, financial planning tools, budget planner, investment tools, retirement planning, financial literacy, money management, wealth building, personal finance calculator suite, financial planning platform, american financial tools, dollar mento, comprehensive financial calculators, financial planning calculator, budget planning calculator, personal finance tools usa"
        canonical="https://dollarmento.com"
        ogType="website"
      />

      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img 
                  src={dollarmentoLogo} 
                  alt="DollarMento" 
                  className="h-12 w-auto hover:opacity-90 transition-opacity"
                />
              </div>
            </Link>

            {/* Navigation Links with Dropdowns */}
            <div className="hidden md:flex items-center space-x-6 relative">
              {Object.entries({
                'news-learn': 'News & Learn',
                'markets': 'Markets', 
                'calculators': 'Calculators',
                'personal-finance': 'Personal Finance',
                'community': 'Community'
              }).map(([key, label]) => (
                <div key={key} className="relative">
                  <button
                    className="flex items-center space-x-1 text-slate-600 hover:text-blue-600 font-medium text-sm"
                    onMouseEnter={() => setDropdownOpen(key)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <span>{label}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  
                  {dropdownOpen === key && (
                    <div 
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      onMouseEnter={() => setDropdownOpen(key)}
                      onMouseLeave={() => setDropdownOpen(null)}
                    >
                      {menuItems[key as keyof typeof menuItems].map((item, index) => (
                        <Link key={index} href={item.href}>
                          <div className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors">
                            <item.icon className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-slate-700">{item.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Search & Actions */}
            <div className="flex items-center space-x-3">
              <Search className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600 hidden sm:block" />
              <Link href="/financial-calculators">
                <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-3 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                  Get Started
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 z-[59] bg-black bg-opacity-30 transition-opacity duration-300 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu Sidebar */}
        <div 
          className={`fixed right-0 top-0 h-full w-1/2 min-w-[280px] max-w-[400px] bg-white shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out overflow-y-auto md:hidden ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
            {/* Sidebar Header */}
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <img 
                  src={dollarmentoLogo} 
                  alt="DollarMento" 
                  className="h-8 w-auto"
                />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-md text-slate-400 hover:text-slate-600 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="px-6 py-4 space-y-6">
              {Object.entries({
                'news-learn': 'News & Learn',
                'markets': 'Markets', 
                'calculators': 'Calculators',
                'personal-finance': 'Personal Finance',
                'community': 'Community'
              }).map(([key, label]) => (
                <div key={key} className="space-y-3">
                  <div className="font-semibold text-slate-800 text-base border-b border-gray-200 pb-2">
                    {label}
                  </div>
                  <div className="space-y-1">
                    {menuItems[key as keyof typeof menuItems].map((item, index) => (
                      <Link key={index} href={item.href}>
                        <div 
                          className="flex items-center space-x-3 py-3 px-3 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Get Started Button */}
              <div className="pt-6 border-t border-gray-200">
                <Link href="/financial-calculators">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
      </nav>

      {/* Market Ticker */}
      <div className="bg-slate-800 text-white py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6 overflow-x-auto text-sm">
            {marketData.map((item, index) => (
              <div key={index} className="flex items-center space-x-1.5 whitespace-nowrap">
                <span className="font-medium text-sm">{item.name}</span>
                <span className="text-gray-300 text-sm">{item.value}</span>
                <span className={`font-medium text-sm ${item.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {item.change} ({item.percent})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Hero Article */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4">
                <Badge className="mb-2 bg-blue-100 text-blue-800 text-xs">Featured</Badge>
                <h1 className="text-xl font-bold text-slate-800 mb-2 leading-tight">
                  One Tool You'll Ever Need to Secure Your Financial Future
                </h1>
                <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                  Say goodbye to guesswork. Gain lifetime access to a powerful financial companion designed to help you make smarter money moves. From expert calculators to personalized insights, this all-in-one platform helps you plan, grow, and protect your wealth—forever.
                </p>
                <div className="flex items-center space-x-2">
                  <Link href="/financial-calculators">
                    <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 cursor-pointer">
                      <Calculator className="w-3.5 h-3.5 mr-1" />
                      Start Calculating
                    </div>
                  </Link>
                  <Link href="/learning-hub">
                    <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-gray-300 bg-background hover:bg-accent hover:text-accent-foreground px-3 py-1.5 cursor-pointer">
                      <BookOpen className="w-3.5 h-3.5 mr-1" />
                      Learn More
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Access Section - Hidden on desktop, visible on mobile */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 md:hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-slate-800">Quick Access</h2>
              </div>
              <div className="p-4 landing-quick-access">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 tools-grid">
                  <Link href="/budget-buddy">
                    <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer text-center">
                      <BarChart3 className="w-8 h-8 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-slate-700">Budget Tools</span>
                    </div>
                  </Link>
                  <Link href="/portfolio-simulator">
                    <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer text-center">
                      <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-slate-700">Investment Tools</span>
                    </div>
                  </Link>
                  <Link href="/learning-hub">
                    <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer text-center">
                      <BookOpen className="w-8 h-8 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-slate-700">Learning Hub</span>
                    </div>
                  </Link>
                  <Link href="/tax-calculator">
                    <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer text-center">
                      <Receipt className="w-8 h-8 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-slate-700">Tax Tools</span>
                    </div>
                  </Link>
                  <Link href="/financial-calculators?category=Retirement">
                    <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer text-center">
                      <PiggyBank className="w-8 h-8 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-slate-700">Retirement Tools</span>
                    </div>
                  </Link>
                  <Link href="/emi-calculator">
                    <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer text-center">
                      <Calculator className="w-8 h-8 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-slate-700">EMI Calculator</span>
                    </div>
                  </Link>
                  <Link href="/community">
                    <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer text-center">
                      <Users className="w-8 h-8 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-slate-700">Community</span>
                    </div>
                  </Link>
                  <Link href="/goal-settings">
                    <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer text-center">
                      <Target className="w-8 h-8 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-slate-700">Goal Settings</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Financial Calculators Section - Hidden on desktop, visible on mobile */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 md:hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-slate-800">Financial Calculators</h2>
              </div>
              <div className="p-4 space-y-3">
                <Link href="/financial-calculators?category=Retirement">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <PiggyBank className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-slate-700">Retirement</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-500">5</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </Link>
                <Link href="/emi-calculator">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Home className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-slate-700">Mortgage & Real Estate</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-500">6</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </Link>
                <Link href="/tax-calculator">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Receipt className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-slate-700">Tax & Income</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-500">7</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </Link>
                <Link href="/budget-buddy">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-slate-700">Credit & Debt</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-500">5</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </Link>
                <Link href="/portfolio-simulator">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-slate-700">Savings & Investment</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-500">12</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </Link>
                <Link href="/insurance-hub">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-slate-700">Insurance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-500">4</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Featured Articles Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-slate-800">Featured Financial Tools</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {featuredArticles.map((article) => (
                  <Link key={article.id} href={article.href}>
                    <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {article.category}
                            </Badge>
                            <span className="text-xs text-slate-500">{article.readTime}</span>
                          </div>
                          <h3 className="text-base font-semibold text-slate-800 mb-1.5 hover:text-blue-600">
                            {article.title}
                          </h3>
                          <p className="text-slate-600 text-sm mb-2">{article.description}</p>
                          <div className="flex items-center space-x-1.5">
                            {article.tags.map((tag, index) => (
                              <span key={index} className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 ml-3" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Gaming & Interactive Tools Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-slate-800">Financial Games & Interactive Learning</h2>
                <p className="text-sm text-slate-600 mt-1">Learn finance through engaging games, puzzles, and interactive content</p>
              </div>
              <div className="divide-y divide-gray-200">
                {gamingTools.map((tool) => (
                  <Link key={tool.id} href={tool.href}>
                    <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {tool.category}
                            </Badge>
                            <span className="text-xs text-slate-500">{tool.duration}</span>
                            <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                              {tool.difficulty}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mb-1.5">
                            <tool.icon className="w-4 h-4 text-blue-600" />
                            <h3 className="text-base font-semibold text-slate-800 hover:text-blue-600">
                              {tool.title}
                            </h3>
                          </div>
                          <p className="text-slate-600 text-sm mb-2">{tool.description}</p>
                          <div className="flex items-center space-x-1.5">
                            {tool.tags.map((tag, index) => (
                              <span key={index} className="text-xs text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 ml-3" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Financial Checklists & Planning Tools Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-slate-800">Financial Checklists & Planning Tools</h2>
                <p className="text-sm text-slate-600 mt-1">Organized planning tools and checklists to manage your financial life</p>
              </div>
              <div className="divide-y divide-gray-200">
                {checklistTools.map((tool) => (
                  <Link key={tool.id} href={tool.href}>
                    <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {tool.category}
                            </Badge>
                            <span className="text-xs text-slate-500">{tool.items}</span>
                            <span className="text-xs text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                              {tool.priority}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mb-1.5">
                            <tool.icon className="w-4 h-4 text-blue-600" />
                            <h3 className="text-base font-semibold text-slate-800 hover:text-blue-600">
                              {tool.title}
                            </h3>
                          </div>
                          <p className="text-slate-600 text-sm mb-2">{tool.description}</p>
                          <div className="flex items-center space-x-1.5">
                            {tool.tags.map((tag, index) => (
                              <span key={index} className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 ml-3" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Educational & Kids Content Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-slate-800">Educational Resources & Kids Content</h2>
                <p className="text-sm text-slate-600 mt-1">Comprehensive financial education for all ages and learning levels</p>
              </div>
              <div className="divide-y divide-gray-200">
                {educationalTools.map((tool) => (
                  <Link key={tool.id} href={tool.href}>
                    <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {tool.category}
                            </Badge>
                            <span className="text-xs text-slate-500">{tool.ageRange}</span>
                            <span className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                              {tool.level}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mb-1.5">
                            <tool.icon className="w-4 h-4 text-blue-600" />
                            <h3 className="text-base font-semibold text-slate-800 hover:text-blue-600">
                              {tool.title}
                            </h3>
                          </div>
                          <p className="text-slate-600 text-sm mb-2">{tool.description}</p>
                          <div className="flex items-center space-x-1.5">
                            {tool.tags.map((tag, index) => (
                              <span key={index} className="text-xs text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 ml-3" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Latest News Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-slate-800">Latest Financial Insights</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {latestNews.map((news, index) => (
                  <Link key={index} href="/learning-hub">
                    <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {news.category}
                            </Badge>
                            <span className="text-xs text-slate-500">{news.time}</span>
                          </div>
                          <h3 className="text-base font-semibold text-slate-800 mb-1.5 hover:text-blue-600">
                            {news.title}
                          </h3>
                          <p className="text-slate-600 text-sm">{news.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 ml-3" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            
            {/* Calculator Categories - Hidden on mobile */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 hidden lg:block">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-base font-semibold text-slate-800">Financial Calculators</h3>
              </div>
              <div className="p-3">
                <div className="space-y-2">
                  {calculatorCategories.map((category, index) => (
                    <Link key={index} href={category.href}>
                      <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-2.5">
                          <category.icon className="w-4 h-4 text-blue-600" />
                          <span className="text-slate-700 font-medium text-sm">{category.name}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs text-slate-500">{category.count}</span>
                          <ChevronRight className="w-3 h-3 text-slate-400" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Rates Widget - Visible on all screen sizes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-base font-semibold text-slate-800">Today's Best Rates</h3>
              </div>
              <div className="p-3">
                <div className="space-y-3">
                  {topRates.map((rate, index) => (
                    <div key={index} className="border-l-3 border-green-500 pl-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-slate-800 text-sm">{rate.name}</h4>
                          <p className="text-xs text-slate-600">{rate.provider}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-base font-bold text-green-600">{rate.rate}</div>
                          <div className="text-xs text-slate-500">{rate.type}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links - Hidden on mobile */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 hidden lg:block">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-base font-semibold text-slate-800">Quick Access</h3>
              </div>
              <div className="p-3 sidebar-quick-access">
                <div className="grid grid-cols-2 gap-2 tools-grid">
                  {quickLinks.slice(0, 8).map((link, index) => (
                    <Link key={index} href={link.href}>
                      <div className="p-2.5 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer text-center">
                        <link.icon className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                        <span className="text-xs font-medium text-slate-700">{link.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter Signup - Visible on all screen sizes */}
            <div className="bg-blue-600 rounded-lg text-white p-4">
              <h3 className="text-base font-semibold mb-2">Stay Informed</h3>
              <p className="text-blue-100 text-xs mb-3">
                Get weekly financial insights and updates delivered to your inbox.
              </p>
              <Link href="/learning-hub">
                <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors w-full bg-white text-blue-600 hover:bg-gray-50 py-2 cursor-pointer">
                  Explore Learning Hub
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-1 md:col-span-2">
              <Link href="/">
                <div className="flex items-center space-x-2 mb-3 cursor-pointer">
                  <DollarSign className="w-5 h-5 text-blue-400" />
                  <span className="text-lg font-semibold">DollarMento</span>
                </div>
              </Link>
              <p className="text-gray-400 mb-3 max-w-md text-sm">
                The most trusted financial education platform. Making financial literacy accessible to everyone.
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-base">💡</span>
                <span className="text-gray-400 text-xs">Empowering financial education worldwide</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Quick Access</h4>
              <div className="space-y-1.5">
                <Link href="/financial-calculators" className="block text-gray-400 hover:text-white transition-colors text-xs">All Calculators</Link>
                <Link href="/learning-hub" className="block text-gray-400 hover:text-white transition-colors text-xs">Learning Hub</Link>
                <Link href="/budget-buddy" className="block text-gray-400 hover:text-white transition-colors text-xs">Budget Tools</Link>
                <Link href="/community" className="block text-gray-400 hover:text-white transition-colors text-xs">Community</Link>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Legal</h4>
              <div className="space-y-1.5">
                <Link href="/legal?tab=privacy" className="block text-gray-400 hover:text-white transition-colors text-xs">Privacy Policy</Link>
                <Link href="/terms-of-service" className="block text-gray-400 hover:text-white transition-colors text-xs">Terms of Service</Link>
                <Link href="/data-deletion" className="block text-gray-400 hover:text-white transition-colors text-xs">Delete Data</Link>
                <Link href="/sitemap" className="block text-gray-400 hover:text-white transition-colors text-xs">Sitemap</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-6 pt-4 text-center">
            <p className="text-gray-400 text-xs">
              © 2024 DollarMento. All rights reserved. Free financial education for everyone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
});

Landing.displayName = 'Landing';

export default Landing;