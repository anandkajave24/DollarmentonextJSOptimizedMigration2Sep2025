import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { SEO } from "../components/SEO";
import { 
  AlertCircle, 
  BarChart2, 
  Target, 
  TrendingUp, 
  PieChart, 
  IndianRupee, 
  Shield, 
  Briefcase,
  Activity,
  Percent,
  CreditCard,
  Layers,
  Clock
} from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

// Helper functions
const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-500';
  if (score >= 65) return 'text-emerald-500';
  if (score >= 50) return 'text-amber-500';
  if (score >= 35) return 'text-orange-500';
  return 'text-red-500';
};

const getIconBgColor = (textColor: string) => {
  switch(textColor) {
    case 'text-green-500': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
    case 'text-emerald-500': return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
    case 'text-amber-500': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
    case 'text-orange-500': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
    case 'text-red-500': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
    case 'text-blue-500': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
    case 'text-purple-500': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
    default: return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
  }
};

const getGradientColor = (textColor: string) => {
  switch(textColor) {
    case 'text-green-500': return 'bg-gradient-to-r from-green-400 to-green-500';
    case 'text-emerald-500': return 'bg-gradient-to-r from-emerald-400 to-emerald-500';
    case 'text-amber-500': return 'bg-gradient-to-r from-amber-400 to-amber-500';
    case 'text-orange-500': return 'bg-gradient-to-r from-orange-400 to-orange-500';
    case 'text-red-500': return 'bg-gradient-to-r from-red-400 to-red-500';
    case 'text-blue-500': return 'bg-gradient-to-r from-blue-400 to-blue-500';
    case 'text-purple-500': return 'bg-gradient-to-r from-purple-400 to-purple-500';
    default: return 'bg-gradient-to-r from-gray-400 to-gray-500';
  }
};

// Mock data for demonstration
const dashboardData = {
  overall_health: {
    score: 78,
    delta: 5.2
  },
  budget_health: {
    score: 82,
    delta: 3.8
  },
  risk: {
    diversification_score: 75,
    portfolio_risk: 68,
    risk_tolerance: 65,
    insurance_coverage: 80
  },
  spending: {
    monthly_income: 85000,
    monthly_spending: 59500,
    savings_rate: 0.3
  },
  portfolio: {
    net_worth: 4250000,
    net_worth_change: 8.5,
    asset_allocation: {
      'Equity': 55,
      'Debt': 25,
      'Gold': 10,
      'Real Estate': 10
    }
  },
  market: {
    return_rate: 12.5,
    sector_performance: {
      'IT': 15.2,
      'Finance': 8.5,
      'Healthcare': 12.8,
      'Energy': -3.2,
      'Manufacturing': 4.5
    }
  },
  goals: {
    emergency_fund: {
      current: 275000,
      target: 350000
    },
    investment: {
      current: 850000,
      target: 1500000
    },
    retirement: {
      current: 1250000,
      target: 10000000
    },
    debt_reduction: {
      current: 150000,
      target: 500000
    }
  },
  tax: {
    tax_savings: 85000,
    tax_efficiency: 78,
    potential_savings: 35000
  },
  credit: {
    used_credit: 150000,
    credit_score: 780
  }
};

// Color constants
const COLORS = {
  GREEN: '#22c55e',
  RED: '#ef4444',
  AMBER: '#f59e0b',
  BLUE: '#3b82f6',
  PURPLE: '#8b5cf6',
  CYAN: '#06b6d4',
  PINK: '#ec4899',
  ORANGE: '#f97316',
  INDIGO: '#6366f1',
  TEAL: '#14b8a6',
  LIME: '#84cc16',
  EMERALD: '#10b981'
};

const pieColors = [COLORS.BLUE, COLORS.GREEN, COLORS.AMBER, COLORS.PURPLE];

// Component types
interface SummaryCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  prefix?: string;
  suffix?: string;
  valueColor?: string;
}

interface GoalProgressBarProps {
  label: string;
  current: number;
  total: number;
  color: string;
  showCurrency?: boolean;
  showPercentage?: boolean;
}

interface ConnectedFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  route: string;
  color: string;
}

// Component implementations
const SummaryCard = ({ title, value, change, icon, prefix = '', suffix = '', valueColor = 'text-foreground' }: SummaryCardProps) => {
  return (
    <Card className="overflow-hidden border-0 shadow-md bg-white dark:bg-gray-950">
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
            <div className="flex items-baseline">
              <p className={`text-2xl font-bold ${valueColor}`}>
                {prefix}{value.toLocaleString(undefined, { maximumFractionDigits: value % 1 === 0 ? 0 : 1 })}
              </p>
              <span className="text-base ml-1">{suffix}</span>
            </div>
            <div className={`text-sm font-medium mt-2 flex items-center ${change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              <span className="inline-block mr-1">
                {change >= 0 ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>
              {Math.abs(change).toFixed(1)}%
            </div>
          </div>
          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${getIconBgColor(valueColor)}`}>
            {icon}
          </div>
        </div>
        
        {/* Subtle bottom border gradient */}
        <div className="h-1 w-full mt-4 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          <div 
            className={`h-full ${getGradientColor(valueColor)}`} 
            style={{ width: `${Math.min(100, value)}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

const GoalProgressBar = ({ label, current, total, color, showCurrency = true, showPercentage = false }: GoalProgressBarProps) => {
  const progress = Math.min((current / total) * 100, 100);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">
          {showCurrency && '₹'}{current.toLocaleString()} 
          {showPercentage && `${progress.toFixed(1)}%`}
          {!showPercentage && ` / ${showCurrency && '₹'}${total.toLocaleString()}`}
        </span>
      </div>
      <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full" 
          style={{ width: `${progress}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

const ConnectedFeatureCard = ({ icon, title, route, color }: ConnectedFeatureCardProps) => {
  return (
    <a 
      href={route} 
      className="block text-decoration-none"
    >
      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg text-center hover:shadow-md transition-shadow hover:bg-white dark:hover:bg-gray-700">
        <div className={`${color} h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white shadow-md`}>
          {icon}
        </div>
        <div className="text-sm font-medium">{title}</div>
      </div>
    </a>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <SEO 
        title="Financial Health Dashboard"
        description="Get a comprehensive overview of your financial health with key metrics and insights at a glance."
        keywords="financial health, dashboard, portfolio, investments, budgeting, goals, risk assessment"
        canonical="https://rupeesmart.com/dashboard"
      />
      
      <div className="mb-8 relative">
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/10 p-2 rounded-lg">
              <BarChart2 className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Financial Health Dashboard</h1>
          </div>
          <p className="text-slate-300 ml-12 text-lg">
            A comprehensive overview of your financial status, goals, and wellness indicators
          </p>
          <div className="absolute top-0 right-0 -z-10 opacity-10">
            <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 100 A90 90 0 0 1 190 100 A90 90 0 0 1 10 100 Z" fill="none" stroke="white" strokeWidth="10" />
              <path d="M30 100 A70 70 0 0 1 170 100 A70 70 0 0 1 30 100 Z" fill="none" stroke="white" strokeWidth="8" />
              <path d="M50 100 A50 50 0 0 1 150 100 A50 50 0 0 1 50 100 Z" fill="none" stroke="white" strokeWidth="6" />
              <path d="M70 100 A30 30 0 0 1 130 100 A30 30 0 0 1 70 100 Z" fill="none" stroke="white" strokeWidth="4" />
              <path d="M90 100 A10 10 0 0 1 110 100 A10 10 0 0 1 90 100 Z" fill="none" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Financial Health Indicators */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="bg-slate-200 dark:bg-slate-800/70 p-2 rounded-lg mr-3">
            <Activity className="h-6 w-6 text-slate-700 dark:text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Financial Health Indicators
          </h2>
          <div className="ml-auto flex items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400 mr-2">Last updated: Today</div>
            <div className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 p-1.5 rounded-full cursor-pointer transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                className="text-gray-500 dark:text-gray-400 animate-spin-slow">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.67 2.21"></path>
                <path d="M21 3v9h-9"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard 
            title="Overall Health Score" 
            value={dashboardData.overall_health.score} 
            change={dashboardData.overall_health.delta}
            icon={<Activity className="h-6 w-6 text-blue-500" />}
            prefix=""
            suffix="/100"
            valueColor={getScoreColor(dashboardData.overall_health.score)}
          />
          <SummaryCard 
            title="Budget Health" 
            value={dashboardData.budget_health.score} 
            change={dashboardData.budget_health.delta}
            icon={<IndianRupee className="h-6 w-6 text-green-500" />}
            prefix=""
            suffix="/100"
            valueColor={getScoreColor(dashboardData.budget_health.score)}
          />
          <SummaryCard 
            title="Investment Health" 
            value={dashboardData.risk.diversification_score} 
            change={5.5}
            icon={<TrendingUp className="h-6 w-6 text-purple-500" />}
            prefix=""
            suffix="/100"
            valueColor={getScoreColor(dashboardData.risk.diversification_score)}
          />
          <SummaryCard 
            title="Savings Health" 
            value={Math.min((dashboardData.spending.savings_rate / 0.3) * 100, 100)} 
            change={dashboardData.spending.savings_rate * 100}
            icon={<Briefcase className="h-6 w-6 text-amber-500" />}
            prefix=""
            suffix="/100"
            valueColor={getScoreColor(Math.min((dashboardData.spending.savings_rate / 0.3) * 100, 100))}
          />
        </div>
      </div>

      {/* Financial Overview */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="bg-slate-200 dark:bg-slate-800/70 p-2 rounded-lg mr-3">
            <IndianRupee className="h-6 w-6 text-slate-700 dark:text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Financial Overview
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard 
            title="Net Worth" 
            value={dashboardData.portfolio.net_worth} 
            change={dashboardData.portfolio.net_worth_change}
            icon={<IndianRupee className="h-6 w-6 text-green-500" />}
            prefix="₹"
            suffix=""
            valueColor="text-green-500"
          />
          <SummaryCard 
            title="Monthly Savings" 
            value={dashboardData.spending.monthly_income - dashboardData.spending.monthly_spending} 
            change={dashboardData.spending.savings_rate * 100}
            icon={<Briefcase className="h-6 w-6 text-blue-500" />}
            prefix="₹"
            suffix=""
            valueColor="text-blue-500"
          />
          <SummaryCard 
            title="Investment Returns" 
            value={dashboardData.market.return_rate} 
            change={2.5}
            icon={<TrendingUp className="h-6 w-6 text-amber-500" />}
            prefix=""
            suffix="%"
            valueColor="text-amber-500"
          />
          <SummaryCard 
            title="Risk Score" 
            value={dashboardData.risk.risk_tolerance} 
            change={5.5}
            icon={<Shield className="h-6 w-6 text-purple-500" />}
            prefix=""
            suffix=""
            valueColor="text-purple-500"
          />
        </div>
      </div>

      {/* Investment Portfolio & Market Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-0 shadow-md bg-white dark:bg-gray-950">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="bg-slate-100 dark:bg-slate-800/70 p-1.5 rounded">
                <PieChart className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              Asset Allocation
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={Object.entries(dashboardData.portfolio.asset_allocation).map(([name, value]) => ({ name, value }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {Object.entries(dashboardData.portfolio.asset_allocation).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white dark:bg-gray-950">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="bg-slate-100 dark:bg-slate-800/70 p-1.5 rounded">
                <BarChart2 className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              Sector Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {Object.entries(dashboardData.market.sector_performance).map(([sector, performance], index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: pieColors[index % pieColors.length] }}></div>
                    <span className="font-medium">{sector}</span>
                  </div>
                  <span className={`font-semibold ${performance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {performance >= 0 ? '+' : ''}{performance.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Goals */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="bg-slate-200 dark:bg-slate-800/70 p-2 rounded-lg mr-3">
            <Target className="h-6 w-6 text-slate-700 dark:text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Financial Goals
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md bg-white dark:bg-gray-950">
            <CardHeader className="border-b border-gray-100 dark:border-gray-800">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <div className="bg-slate-100 dark:bg-slate-800/70 p-1.5 rounded">
                  <Clock className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </div>
                Short-term Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-6">
              <GoalProgressBar 
                label="Emergency Fund" 
                current={dashboardData.goals.emergency_fund.current} 
                total={dashboardData.goals.emergency_fund.target} 
                color={COLORS.AMBER}
              />
              <GoalProgressBar 
                label="Investment Goal" 
                current={dashboardData.goals.investment.current} 
                total={dashboardData.goals.investment.target} 
                color={COLORS.CYAN}
              />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white dark:bg-gray-950">
            <CardHeader className="border-b border-gray-100 dark:border-gray-800">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <div className="bg-slate-100 dark:bg-slate-800/70 p-1.5 rounded">
                  <Target className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </div>
                Long-term Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-6">
              <GoalProgressBar 
                label="Retirement" 
                current={dashboardData.goals.retirement.current} 
                total={dashboardData.goals.retirement.target} 
                color={COLORS.PURPLE}
              />
              <GoalProgressBar 
                label="Debt Reduction" 
                current={dashboardData.goals.debt_reduction.current} 
                total={dashboardData.goals.debt_reduction.target} 
                color={COLORS.RED}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Risk & Tax Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-0 shadow-md bg-white dark:bg-gray-950">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="bg-slate-100 dark:bg-slate-800/70 p-1.5 rounded">
                <Shield className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              Risk Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={[
                    { name: 'Portfolio Risk', value: dashboardData.risk.portfolio_risk, fill: COLORS.GREEN },
                    { name: 'Diversification', value: dashboardData.risk.diversification_score, fill: COLORS.AMBER },
                    { name: 'Insurance Coverage', value: dashboardData.risk.insurance_coverage, fill: COLORS.CYAN }
                  ]}
                  margin={{ top: 20, right: 20, bottom: 20, left: 80 }}
                >
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {[
                      { name: 'Portfolio Risk', value: dashboardData.risk.portfolio_risk },
                      { name: 'Diversification', value: dashboardData.risk.diversification_score },
                      { name: 'Insurance Coverage', value: dashboardData.risk.insurance_coverage }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === 'Portfolio Risk' ? COLORS.GREEN : entry.name === 'Diversification' ? COLORS.AMBER : COLORS.CYAN} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white dark:bg-gray-950">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="bg-slate-100 dark:bg-slate-800/70 p-1.5 rounded">
                <Percent className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              Tax Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">Tax Savings</span>
                <span className="font-semibold text-green-500">₹{dashboardData.tax.tax_savings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">Tax Efficiency Score</span>
                <span className="font-semibold text-green-500">{dashboardData.tax.tax_efficiency}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Potential Additional Savings</span>
                <span className="font-semibold text-amber-500">₹{dashboardData.tax.potential_savings.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mt-2 pt-3 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-base font-semibold mb-2">Tax Optimization Suggestions</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Maximize your Section 80C contributions (₹1.5L)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Consider NPS for additional ₹50,000 deduction</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Review health insurance premium for Section 80D</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Wellness Analysis */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="bg-slate-200 dark:bg-slate-800/70 p-2 rounded-lg mr-3">
            <Activity className="h-6 w-6 text-slate-700 dark:text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Financial Wellness Analysis
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md bg-white dark:bg-gray-950">
            <CardHeader className="border-b border-gray-100 dark:border-gray-800">
              <CardTitle className="text-lg font-semibold">Key Financial Ratios</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-6">
              <GoalProgressBar 
                label="Debt Service Coverage" 
                current={Math.min(
                  (dashboardData.spending.monthly_income / (dashboardData.credit.used_credit / 12)) * 100 || 100,
                  100
                )} 
                total={100} 
                color={COLORS.GREEN}
                showCurrency={false}
                showPercentage={true}
              />
              <GoalProgressBar 
                label="Emergency Fund Coverage" 
                current={Math.min(
                  (dashboardData.goals.emergency_fund.current / (dashboardData.spending.monthly_spending * 6)) * 100,
                  100
                )} 
                total={100} 
                color={COLORS.AMBER}
                showCurrency={false}
                showPercentage={true}
              />
              <GoalProgressBar 
                label="Portfolio Diversification" 
                current={dashboardData.risk.diversification_score} 
                total={100} 
                color={COLORS.BLUE}
                showCurrency={false}
                showPercentage={true}
              />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white dark:bg-gray-950">
            <CardHeader className="border-b border-gray-100 dark:border-gray-800">
              <CardTitle className="text-lg font-semibold">Risk & Tax Efficiency</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-6">
              <GoalProgressBar 
                label="Tax Optimization" 
                current={dashboardData.tax.tax_efficiency} 
                total={100} 
                color={COLORS.GREEN}
                showCurrency={false}
                showPercentage={true}
              />
              <GoalProgressBar 
                label="Risk Management" 
                current={dashboardData.risk.portfolio_risk} 
                total={100} 
                color={COLORS.TEAL}
                showCurrency={false}
                showPercentage={true}
              />
              <GoalProgressBar 
                label="Credit Health" 
                current={(dashboardData.credit.credit_score / 900) * 100} 
                total={100} 
                color={COLORS.BLUE}
                showCurrency={false}
                showPercentage={true}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Goals Balance */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="bg-slate-200 dark:bg-slate-800/70 p-2 rounded-lg mr-3">
            <Target className="h-6 w-6 text-slate-700 dark:text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Goals Balance
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard 
            title="Short-term Goals Progress" 
            value={(dashboardData.goals.emergency_fund.current / dashboardData.goals.emergency_fund.target) * 100} 
            change={5.5}
            icon={<Clock className="h-6 w-6 text-amber-500" />}
            prefix=""
            suffix="%"
            valueColor="text-amber-500"
          />
          <SummaryCard 
            title="Mid-term Goals Progress" 
            value={(dashboardData.goals.investment.current / dashboardData.goals.investment.target) * 100} 
            change={3.2}
            icon={<Clock className="h-6 w-6 text-cyan-500" />}
            prefix=""
            suffix="%"
            valueColor="text-cyan-500"
          />
          <SummaryCard 
            title="Long-term Goals Progress" 
            value={(dashboardData.goals.retirement.current / dashboardData.goals.retirement.target) * 100} 
            change={2.8}
            icon={<Clock className="h-6 w-6 text-purple-500" />}
            prefix=""
            suffix="%"
            valueColor="text-purple-500"
          />
        </div>
      </div>

      {/* Connected Features */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="bg-slate-200 dark:bg-slate-800/70 p-2 rounded-lg mr-3">
            <Layers className="h-6 w-6 text-slate-700 dark:text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Connected Features
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <ConnectedFeatureCard 
            icon={<BarChart2 className="h-6 w-6" />}
            title="Investment Comparison"
            route="/comparison-tool"
            color="bg-slate-600"
          />
          <ConnectedFeatureCard 
            icon={<Percent className="h-6 w-6" />}
            title="Tax Calculator"
            route="/tax-calculator"
            color="bg-slate-600"
          />
          <ConnectedFeatureCard 
            icon={<CreditCard className="h-6 w-6" />}
            title="Debt Payoff"
            route="/debt-payoff"
            color="bg-slate-600"
          />
          <ConnectedFeatureCard 
            icon={<AlertCircle className="h-6 w-6" />}
            title="Risk Assessment"
            route="/risk-assessment"
            color="bg-slate-600"
          />
          <ConnectedFeatureCard 
            icon={<PieChart className="h-6 w-6" />}
            title="Portfolio Analyzer"
            route="/portfolio-analyzer"
            color="bg-slate-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;