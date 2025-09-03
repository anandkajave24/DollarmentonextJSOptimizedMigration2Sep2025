import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Progress } from "../components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import { Download, FileText, Info, Eye, EyeOff, TrendingUp, TrendingDown, Calendar, Shield, Target, PieChart as PieIcon, BarChart3, Calculator, Wallet, Building, AlertTriangle, CheckCircle, Users, Home, Car, Plane, BookOpen, Baby, Heart, DollarSign, Clock, User, MapPin, GraduationCap, Star, Briefcase } from "lucide-react";
import { Helmet } from "react-helmet";
import { SEO } from '../components/SEO';
import { differenceInDays } from "date-fns";

// Investment interfaces for linking
interface LinkedInvestment {
  id: string;
  type: "mutual_fund" | "equity" | "bank_account" | "nps";
  name: string;
  currentValue: number;
  riskLevel: "Low" | "Medium" | "High";
}

// Goal interface from Goal Settings
interface Goal {
  id: string;
  name: string;
  type: "Standard Goal" | "Custom Goal";
  category: "Short-Term" | "Mid-Term" | "Long-Term";
  targetAmount: number;
  currentSavings: number;
  targetDate: string;
  priority: "High" | "Medium" | "Low";
  savingsPlan: "Fixed Monthly Savings" | "Percentage of Income" | "Round-Up Savings";
  savingsAmount: number;
  autoSave: boolean;
  linkedInvestments?: LinkedInvestment[];
}

export default function FinancialHealthReportSidebar() {
  const [reportSection, setReportSection] = useState('executive');
  const [showSensitiveData, setShowSensitiveData] = useState(true);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [realGoals, setRealGoals] = useState<Goal[]>([]);

  // Load real goals from localStorage
  useEffect(() => {
    const loadGoals = () => {
      const savedGoals = localStorage.getItem("financialGoals");
      
      if (savedGoals) {
        try {
          const parsedGoals = JSON.parse(savedGoals);
          setRealGoals(parsedGoals);
        } catch (e) {
          console.error("Error parsing goals from localStorage:", e);
          setRealGoals([]);
        }
      } else {
        setRealGoals([]);
      }
    };
    
    loadGoals();
    
    // Listen for storage events to update in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "financialGoals") {
        loadGoals();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Convert Goal interface to Financial Health Report format
  const convertGoalToReportFormat = (goal: Goal) => {
    const today = new Date();
    const targetDate = new Date(goal.targetDate);
    const daysRemaining = differenceInDays(targetDate, today);
    const years = Math.max(0.1, daysRemaining / 365.25); // Minimum 0.1 years to avoid division by zero
    
    // Calculate total current savings including linked investments
    const linkedInvestmentValue = goal.linkedInvestments ? 
      goal.linkedInvestments.reduce((sum: number, investment: LinkedInvestment) => sum + investment.currentValue, 0) : 0;
    const totalCurrentSavings = goal.currentSavings + linkedInvestmentValue;
    
    // Calculate required monthly savings based on total current savings
    const remaining = goal.targetAmount - totalCurrentSavings;
    const monthsRemaining = Math.max(1, daysRemaining / 30.44); // Average days per month
    const required = Math.round(Math.max(0, remaining) / monthsRemaining);
    
    return {
      name: goal.name,
      target: goal.targetAmount,
      currentSaving: totalCurrentSavings,
      years: Math.round(years * 10) / 10, // Round to 1 decimal place
      required: Math.max(0, required),
      priority: goal.priority || 'Medium', // Use the actual user-selected priority
      linkedInvestments: goal.linkedInvestments || [],
      manualSavings: goal.currentSavings,
      linkedValue: linkedInvestmentValue
    };
  };

  // Get processed goals for the report
  const getProcessedGoals = () => {
    if (realGoals.length === 0) {
      return [];
    }
    return realGoals.map(convertGoalToReportFormat);
  };

  // Comprehensive financial data for demonstration
  const mockFinancialData = {
    income: {
      monthly: 8500,
      annual: 102000,
      other: 1200,
      sources: ['Salary', 'Rental Income', 'Freelance'],
      growth: 8
    },
    expenses: {
      monthly: 5200,
      annual: 62400,
      emi: 2100,
      categories: {
        housing: 1800,
        transportation: 850,
        food: 700,
        utilities: 450,
        entertainment: 600,
        healthcare: 350,
        other: 450
      }
    },
    assets: {
      total: 285000,
      realEstate: 180000,
      mutualFunds: 45000,
      stocks: 35000,
      cds: 25000,
      retirement401k: 35000,
      bankSavings: 18000,
      investmentAccounts: 12000
    },
    liabilities: {
      total: 75000,
      mortgage: 55000,
      carLoan: 12000,
      creditCards: 8000
    },
    netWorth: {
      totalAssets: 285000,
      totalLiabilities: 75000,
      netWorth: 210000,
      assets: {
        realEstate: 180000,
        mutualFunds: 45000,
        stocks: 35000,
        cds: 25000,
        retirement401k: 35000,
        bankSavings: 18000,
        investmentAccounts: 12000
      },
      liabilities: {
        mortgage: 55000,
        carLoan: 12000,
        creditCards: 8000,
        studentLoans: 0
      }
    },
    goals: getProcessedGoals(),
    riskProfile: {
      current: { stocks: 45, bonds: 40, reits: 10, cash: 5 },
      recommended: { stocks: 65, bonds: 25, reits: 5, cash: 5 },
      tolerance: 'Moderate',
      timeHorizon: 'Long-term'
    },
    insurance: {
      life: {
        current: 150000,
        required: 500000,
        gap: 350000
      },
      health: {
        current: 5000,
        required: 10000,
        gap: 5000
      },
      vehicle: {
        current: 25000,
        required: 25000,
        gap: 0
      }
    },
    emergencyFund: {
      required: 31200,
      current: 8500,
      monthsCovered: 1.6,
      target: 6
    },
    taxPlanning: {
      currentTaxLiability: 18500,
      potentialSavings: 4200,
      utilizationStatus: {
        traditional401k: 12000,
        rothIRA: 6000,
        hsa: 3600,
        taxLossHarvesting: 0
      }
    }
  };

  // Calculate comprehensive health score
  const calculateHealthScore = () => {
    let score = 0;
    const checks = [
      mockFinancialData.netWorth.netWorth > 0 ? 15 : 0, // Positive net worth
      (mockFinancialData.income.monthly - mockFinancialData.expenses.monthly) > 0 ? 15 : 0, // Positive cash flow
      mockFinancialData.insurance.life.current >= mockFinancialData.insurance.life.required * 0.5 ? 10 : 0, // Adequate life insurance
      mockFinancialData.emergencyFund.current >= mockFinancialData.emergencyFund.required * 0.3 ? 10 : 0, // Emergency fund
      mockFinancialData.netWorth.assets.mutualFunds + mockFinancialData.netWorth.assets.stocks > 50000 ? 15 : 0, // Investment portfolio
      mockFinancialData.netWorth.totalLiabilities / mockFinancialData.income.annual < 3 ? 10 : 0, // Debt to income ratio
      mockFinancialData.goals.filter(g => g.currentSaving >= g.required * 0.8).length >= 2 ? 15 : 0, // Goal funding
      mockFinancialData.riskProfile.current.stocks >= 40 ? 10 : 0 // Age-appropriate stock allocation
    ];
    return checks.reduce((a, b) => a + b, 0);
  };

  const healthScore = calculateHealthScore();
  const getHealthGrade = (score: number) => {
    if (score >= 85) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 75) return { grade: 'A', color: 'text-green-500', bg: 'bg-green-50' };
    if (score >= 65) return { grade: 'B+', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 55) return { grade: 'B', color: 'text-blue-500', bg: 'bg-blue-50' };
    if (score >= 45) return { grade: 'C+', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (score >= 35) return { grade: 'C', color: 'text-yellow-500', bg: 'bg-yellow-50' };
    return { grade: 'D', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const healthGrade = getHealthGrade(healthScore);

  const reportSections = [
    { id: 'executive', name: 'Executive Summary', icon: <FileText className="h-4 w-4" /> },
    { id: 'profile', name: 'My Profile', icon: <Users className="h-4 w-4" /> },
    { id: 'networth', name: 'Net Worth', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'cashflow', name: 'Cash Flow', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'goals', name: 'Goals Analysis', icon: <Target className="h-4 w-4" /> },
    { id: 'risk', name: 'Risk Profiling', icon: <Shield className="h-4 w-4" /> },
    { id: 'insurance', name: 'Insurance', icon: <Heart className="h-4 w-4" /> },
    { id: 'portfolio', name: 'Portfolio Review', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'allocation', name: 'Asset Allocation', icon: <PieIcon className="h-4 w-4" /> },
    { id: 'strategy', name: 'Investment Strategy', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'products', name: 'Product Details', icon: <Calculator className="h-4 w-4" /> },
    { id: 'tax', name: 'Tax Planning', icon: <Building className="h-4 w-4" /> },
    { id: 'estate', name: 'Estate Planning', icon: <Home className="h-4 w-4" /> },
    { id: 'implementation', name: 'Implementation', icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'monitoring', name: 'Monitoring', icon: <Clock className="h-4 w-4" /> },
    { id: 'appendix', name: 'Appendix', icon: <BookOpen className="h-4 w-4" /> }
  ];

  const generatePDFReport = async () => {
    setGeneratingReport(true);
    setTimeout(() => {
      setGeneratingReport(false);
      alert('Report generation would happen here - PDF download functionality to be implemented');
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Generate chart data
  const assetAllocationData = [
    { name: 'Real Estate', value: mockFinancialData.netWorth.assets.realEstate, color: '#10B981' },
    { name: 'Mutual Funds', value: mockFinancialData.netWorth.assets.mutualFunds, color: '#3B82F6' },
    { name: 'Stocks', value: mockFinancialData.netWorth.assets.stocks, color: '#F59E0B' },
    { name: 'CDs', value: mockFinancialData.netWorth.assets.cds, color: '#EF4444' },
    { name: '401(k)', value: mockFinancialData.netWorth.assets.retirement401k, color: '#8B5CF6' },
    { name: 'Bank Savings', value: mockFinancialData.netWorth.assets.bankSavings, color: '#06B6D4' },
    { name: 'Investment Accounts', value: mockFinancialData.netWorth.assets.investmentAccounts, color: '#F97316' }
  ];

  const expenseData = Object.entries(mockFinancialData.expenses.categories).map(([key, value]) => ({
    category: key.charAt(0).toUpperCase() + key.slice(1),
    amount: value,
    percentage: ((value / mockFinancialData.expenses.monthly) * 100).toFixed(1)
  }));

  const renderSectionContent = () => {
    switch (reportSection) {
      case 'executive':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Executive Summary</h2>
              <p className="text-gray-600 mb-6">
                A comprehensive overview of your current financial position and educational insights for learning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-3">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-green-900 mb-1">Net Worth</h3>
                    <p className="text-lg font-bold text-green-700">
                      {showSensitiveData ? formatCurrency(mockFinancialData.netWorth.netWorth) : '$XXX,XXX'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-3">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-blue-900 mb-1">Monthly Savings</h3>
                    <p className="text-lg font-bold text-blue-700">
                      {showSensitiveData ? formatCurrency(mockFinancialData.income.monthly - mockFinancialData.expenses.monthly) : '$X,XXX'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-3">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-purple-900 mb-1">Goals Progress</h3>
                    <p className="text-lg font-bold text-purple-700">
                      {Math.round((mockFinancialData.goals.reduce((sum, goal) => sum + (goal.currentSaving / goal.target), 0) / mockFinancialData.goals.length) * 100)}%
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-3">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-red-900 mb-1">Insurance Gap</h3>
                    <p className="text-lg font-bold text-red-700">
                      {showSensitiveData ? formatCurrency(mockFinancialData.insurance.life.gap) : '$ XX.XX L'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Position Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="font-medium">Total Assets</span>
                      <span className="font-bold text-green-600">
                        {showSensitiveData ? formatCurrency(mockFinancialData.netWorth.totalAssets) : '$ XX.XX L'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                      <span className="font-medium">Total Liabilities</span>
                      <span className="font-bold text-red-600">
                        {showSensitiveData ? formatCurrency(mockFinancialData.netWorth.totalLiabilities) : '$ XX.XX L'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="font-bold">Net Worth</span>
                      <span className="font-bold text-blue-600">
                        {showSensitiveData ? formatCurrency(mockFinancialData.netWorth.netWorth) : '$ XX.XX L'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Savings Rate: {Math.round(((mockFinancialData.income.monthly - mockFinancialData.expenses.monthly) / mockFinancialData.income.monthly) * 100)}% monthly
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Action Items Priority</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded-r">
                      <h5 className="font-medium text-red-700">Critical (Immediate)</h5>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>• Build Emergency Fund ($5.1K needed)</li>
                        <li>• Increase Life Insurance by $95L</li>
                        <li>• Health Insurance Enhancement</li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-3 rounded-r">
                      <h5 className="font-medium text-yellow-700">High Priority (1-3 months)</h5>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>• Learning about Equity Allocation (example: 65%)</li>
                        <li>• Understanding Goal-based investment Concepts</li>
                        <li>• Tax Planning Education</li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded-r">
                      <h5 className="font-medium text-green-700">Medium Priority (3-12 months)</h5>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>• Estate Planning Education & Will Basics</li>
                        <li>• Portfolio Balancing Concepts</li>
                        <li>• Regular Review Habits</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Financial Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-600 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Strengths
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Positive net worth of {showSensitiveData ? formatCurrency(mockFinancialData.netWorth.netWorth) : '$ XX.XX L'}</li>
                      <li>• Good monthly cash flow surplus</li>
                      <li>• Diversified asset portfolio</li>
                      <li>• Active investment in equity markets</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-600 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Learning Opportunities
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Understanding life insurance gaps</li>
                      <li>• Learning about emergency fund planning</li>
                      <li>• Exploring equity allocation for your age</li>
                      <li>• Health insurance coverage education</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">My Profile</h2>
              <p className="text-gray-600 mb-6">
                Comprehensive personal and financial profile analysis for intelligent planning and goal achievement.
              </p>
            </div>

            {/* Profile Overview Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm text-gray-600">Financial Health Score</p>
                        <p className="text-2xl font-bold text-blue-600">{healthScore}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        healthGrade.grade === 'A' ? 'bg-green-100 text-green-800' :
                        healthGrade.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                        healthGrade.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        Grade {healthGrade.grade}+
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm text-gray-600">Net Worth</p>
                        <p className="text-2xl font-bold text-green-600">
                          {showSensitiveData ? formatCurrency(mockFinancialData.assets.total - mockFinancialData.liabilities.total) : '$33,00,000'}
                        </p>
                      </div>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm text-gray-600">Monthly Savings Rate</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {showSensitiveData ? `${Math.round(((mockFinancialData.income.monthly - mockFinancialData.expenses.monthly) / mockFinancialData.income.monthly) * 100)}%` : '43%'}
                        </p>
                      </div>
                    </div>
                    <Target className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Personal Information Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-600">Age</p>
                        <p className="font-semibold text-sm">35 years</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Heart className="h-4 w-4 text-gray-600" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-600">Family Status</p>
                        <p className="font-semibold text-sm">Married, 1 Child</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Briefcase className="h-4 w-4 text-gray-600" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-600">Employment</p>
                        <p className="font-semibold text-sm">IT Professional</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="h-4 w-4 text-gray-600" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-600">Location</p>
                        <p className="font-semibold text-sm">Austin, Texas</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <GraduationCap className="h-4 w-4 text-gray-600" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-600">Education</p>
                        <p className="font-semibold text-sm">Engineering Graduate</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Shield className="h-4 w-4 text-gray-600" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-600">Risk Tolerance</p>
                        <p className="font-semibold text-sm">Moderate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Profile Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Income Analysis</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-gray-600">Annual Income</span>
                        <span className="font-semibold text-green-700">
                          {showSensitiveData ? formatCurrency(mockFinancialData.income.annual) : '$XXX,XXX'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-600">Monthly Income</span>
                        <span className="font-semibold text-blue-700">
                          {showSensitiveData ? formatCurrency(mockFinancialData.income.monthly) : '$X,XXX'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-gray-600">Other Income</span>
                        <span className="font-semibold text-purple-700">
                          {showSensitiveData ? formatCurrency(mockFinancialData.income.other) : '$X,XXX'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Expense Analysis</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-gray-600">Monthly Expenses</span>
                        <span className="font-semibold text-red-700">
                          {showSensitiveData ? formatCurrency(mockFinancialData.expenses.monthly) : '$ XX,XXX'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="text-gray-600">EMI Payments</span>
                        <span className="font-semibold text-orange-700">
                          {showSensitiveData ? formatCurrency(mockFinancialData.expenses.emi) : '$ XX,XXX'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span className="text-gray-600">Monthly Savings</span>
                        <span className="font-semibold text-yellow-700">
                          {showSensitiveData ? formatCurrency(mockFinancialData.income.monthly - mockFinancialData.expenses.monthly) : '$ XX,XXX'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Profile Section - Compact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Investment Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600 mb-1">Experience</p>
                    <p className="font-semibold text-blue-700 text-sm">5+ years</p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <Target className="h-4 w-4 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600 mb-1">Planning Horizon</p>
                    <p className="font-semibold text-green-700 text-sm">Long-term<br/>(20+ years)</p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                    <BarChart3 className="h-4 w-4 text-purple-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600 mb-1">Risk Profile</p>
                    <p className="font-semibold text-purple-700 text-sm">Moderate</p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                    <Star className="h-4 w-4 text-yellow-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600 mb-1">Investment Style</p>
                    <p className="font-semibold text-yellow-700 text-sm">Balanced Growth</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Goals & Priorities Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Financial Goals & Priorities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getProcessedGoals().length === 0 ? (
                    <div className="p-8 text-center">
                      <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No Financial Goals Found</h3>
                      <p className="text-gray-500 mb-4">
                        Start planning your financial future by setting up your goals.
                      </p>
                      <Button variant="outline" onClick={() => window.location.href = '/goals'}>
                        Set Up Goals
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getProcessedGoals().map((goal, index) => {
                        const progress = (goal.currentSaving / goal.target) * 100;
                        const priorityConfig = goal.priority === 'High' 
                          ? { bg: 'from-red-50 to-red-100', text: 'text-red-800', badge: 'bg-red-200 text-red-800', progress: 'bg-red-600', progressBg: 'bg-red-200' }
                          : goal.priority === 'Medium' 
                          ? { bg: 'from-orange-50 to-orange-100', text: 'text-orange-800', badge: 'bg-orange-200 text-orange-800', progress: 'bg-orange-600', progressBg: 'bg-orange-200' }
                          : { bg: 'from-green-50 to-green-100', text: 'text-green-800', badge: 'bg-green-200 text-green-800', progress: 'bg-green-600', progressBg: 'bg-green-200' };

                        return (
                          <div key={index} className={`p-4 border rounded-lg bg-gradient-to-r ${priorityConfig.bg}`}>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className={`font-semibold ${priorityConfig.text}`}>{goal.name}</h4>
                              <span className={`text-xs px-2 py-1 rounded ${priorityConfig.badge}`}>
                                {goal.priority} Priority
                              </span>
                            </div>
                            <p className={`text-sm mb-2 ${priorityConfig.text.replace('text-', 'text-').replace('-800', '-700')}`}>
                              Target: ${goal.target.toLocaleString()} in {goal.years} years
                            </p>
                            <div className={`w-full rounded-full h-2 ${priorityConfig.progressBg}`}>
                              <div className={`h-2 rounded-full ${priorityConfig.progress}`} style={{ width: `${Math.min(progress, 100)}%` }}></div>
                            </div>
                            <p className={`text-xs mt-1 ${priorityConfig.text.replace('text-', 'text-').replace('-800', '-600')}`}>
                              {Math.round(progress)}% Complete
                            </p>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <p className={priorityConfig.text.replace('text-', 'text-').replace('-800', '-600')}>Current Value</p>
                                <p className={`font-medium ${priorityConfig.text}`}>${goal.currentSaving.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className={priorityConfig.text.replace('text-', 'text-').replace('-800', '-600')}>Monthly Required</p>
                                <p className={`font-medium ${priorityConfig.text}`}>${goal.required.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'networth':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Net Worth Analysis</h2>
              <p className="text-gray-600 mb-6">
                Detailed breakdown of your assets and liabilities with visual distribution.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                  <CardDescription>Current distribution of your assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={assetAllocationData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {assetAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => showSensitiveData ? formatCurrency(Number(value)) : '$ XX.XX L'} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Color-coded brick legend */}
                  <div className="flex flex-wrap justify-start gap-3 mt-6">
                    {assetAllocationData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: entry.color }}
                        ></div>
                        <span className="text-sm text-gray-700">{entry.name}</span>
                        <span className="text-sm font-medium">
                          {((entry.value / assetAllocationData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assets vs Liabilities</CardTitle>
                  <CardDescription>Your financial position breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Total Assets</span>
                      <span className="font-bold text-green-600">
                        {showSensitiveData ? formatCurrency(mockFinancialData.netWorth.totalAssets) : '$ XX.XX L'}
                      </span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Total Liabilities</span>
                      <span className="font-bold text-red-600">
                        {showSensitiveData ? formatCurrency(mockFinancialData.netWorth.totalLiabilities) : '$ XX.XX L'}
                      </span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Net Worth</span>
                      <span className="font-bold text-lg text-blue-600">
                        {showSensitiveData ? formatCurrency(mockFinancialData.netWorth.netWorth) : '$ XX.XX L'}
                      </span>
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Your debt-to-asset ratio is {((mockFinancialData.netWorth.totalLiabilities / mockFinancialData.netWorth.totalAssets) * 100).toFixed(1)}%. 
                      A ratio below 30% is considered healthy.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">Assets Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(mockFinancialData.netWorth.assets).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="font-medium">
                        {showSensitiveData ? formatCurrency(value) : '$ XX.XX L'}
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-3 flex justify-between font-bold text-green-700">
                    <span>Total Assets:</span>
                    <span>
                      {showSensitiveData ? formatCurrency(mockFinancialData.netWorth.totalAssets) : '$ XX.XX L'}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-700">Liabilities Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(mockFinancialData.netWorth.liabilities).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="font-medium">
                        {showSensitiveData ? formatCurrency(value) : '$ XX.XX L'}
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-3 flex justify-between font-bold text-red-700">
                    <span>Total Liabilities:</span>
                    <span>
                      {showSensitiveData ? formatCurrency(mockFinancialData.netWorth.totalLiabilities) : '$ XX.XX L'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'cashflow':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Cash Flow Analysis</h2>
              <p className="text-gray-600 mb-6">
                Current income vs expenses with detailed breakdown and future projections.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Monthly Cash Flow
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="font-medium">Monthly Income</span>
                      <span className="font-bold text-green-600">
                        {showSensitiveData ? formatCurrency(mockFinancialData.income.monthly) : '$ XX,XXX'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                      <span className="font-medium">Monthly Expenses</span>
                      <span className="font-bold text-red-600">
                        {showSensitiveData ? formatCurrency(mockFinancialData.expenses.monthly) : '$ XX,XXX'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="font-bold">Net Surplus</span>
                      <span className="font-bold text-blue-600">
                        {showSensitiveData ? formatCurrency(mockFinancialData.income.monthly - mockFinancialData.expenses.monthly) : '$ XX,XXX'}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      Savings Rate: {Math.round(((mockFinancialData.income.monthly - mockFinancialData.expenses.monthly) / mockFinancialData.income.monthly) * 100)}% monthly
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {expenseData.map((expense, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600">{expense.category}</span>
                        <div className="text-right">
                          <div className="font-medium">
                            {showSensitiveData ? formatCurrency(expense.amount) : '$ XX,XXX'}
                          </div>
                          <div className="text-xs text-gray-500">{expense.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Expense Distribution Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expenseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip formatter={(value) => showSensitiveData ? formatCurrency(Number(value)) : '$ XX,XXX'} />
                      <Bar dataKey="amount" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'goals':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Goals Analysis</h2>
              <p className="text-gray-600 mb-6">
                Detailed analysis of your financial goals and progress tracking.
              </p>
              

            </div>

            <div className="grid grid-cols-1 gap-6">
              {getProcessedGoals().length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No Financial Goals Found</h3>
                    <p className="text-gray-500 mb-4">
                      Start planning your financial future by setting up your goals in the Goal Settings page.
                    </p>
                    <Button variant="outline" onClick={() => window.location.href = '/goals'}>
                      Set Up Goals
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                getProcessedGoals().map((goal, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        {goal.name}
                      </CardTitle>
                      <Badge 
                        className={
                          goal.priority === 'High' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                          goal.priority === 'Medium' ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' :
                          goal.priority === 'Low' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                          'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }
                        variant="outline"
                      >
                        {goal.priority} Priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Target Amount</div>
                          <div className="font-bold">
                            {showSensitiveData ? formatCurrency(goal.target) : '$ XX.XX L'}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Current Savings</div>
                          <div className="font-bold">
                            {showSensitiveData ? formatCurrency(goal.currentSaving) : '$ XX.XX L'}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Time Frame</div>
                          <div className="font-bold">{goal.years} years</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Monthly Required</div>
                          <div className="font-bold">
                            {showSensitiveData ? formatCurrency(goal.required) : '$ XX,XXX'}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{Math.round((goal.currentSaving / goal.target) * 100)}%</span>
                        </div>
                        <Progress value={(goal.currentSaving / goal.target) * 100} className="h-2" />
                      </div>
                      
                      <Alert>
                        <AlertDescription>
                          {(() => {
                            const progressPercent = (goal.currentSaving / goal.target) * 100;
                            if (progressPercent >= 80) {
                              return (
                                <span className="text-green-600 font-medium">
                                  ✓ Excellent progress! You're on track to achieve this goal.
                                </span>
                              );
                            } else if (goal.currentSaving === 0) {
                              return (
                                <span className="text-red-600 font-medium">
                                  ⚠ Action Required: Begin investing {showSensitiveData ? formatCurrency(goal.required) : '$ XX,XXX'} monthly to reach your goal in {goal.years} {goal.years === 1 ? 'year' : 'years'}.
                                </span>
                              );
                            } else {
                              const remaining = goal.target - goal.currentSaving;
                              const monthsLeft = goal.years * 12;
                              const requiredMonthly = Math.round(remaining / monthsLeft);
                              return (
                                <span className="text-orange-600 font-medium">
                                  ⚠ Boost Required: Increase your monthly investment to {showSensitiveData ? formatCurrency(requiredMonthly) : '$ XX,XXX'} to achieve your target on time.
                                </span>
                              );
                            }
                          })()}
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
                ))
              )}
            </div>
          </div>
        );

      case 'risk':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Risk Profiling</h2>
              <p className="text-gray-600 mb-6">
                Assessment of your risk tolerance and investment allocation recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Risk Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {mockFinancialData.riskProfile.tolerance}
                      </div>
                      <p className="text-sm text-gray-600">Risk Tolerance Level</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Stocks</span>
                        <span className="font-medium">{mockFinancialData.riskProfile.current.stocks}%</span>
                      </div>
                      <Progress value={mockFinancialData.riskProfile.current.stocks} className="h-2" />
                      
                      <div className="flex justify-between">
                        <span>Bonds</span>
                        <span className="font-medium">{mockFinancialData.riskProfile.current.bonds}%</span>
                      </div>
                      <Progress value={mockFinancialData.riskProfile.current.bonds} className="h-2" />
                      
                      <div className="flex justify-between">
                        <span>REITs</span>
                        <span className="font-medium">{mockFinancialData.riskProfile.current.reits}%</span>
                      </div>
                      <Progress value={mockFinancialData.riskProfile.current.reits} className="h-2" />
                      
                      <div className="flex justify-between">
                        <span>Cash</span>
                        <span className="font-medium">{mockFinancialData.riskProfile.current.cash}%</span>
                      </div>
                      <Progress value={mockFinancialData.riskProfile.current.cash} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Based on your age, income, and goals, here's the recommended allocation:
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Stocks</span>
                        <span className="font-medium text-green-600">{mockFinancialData.riskProfile.recommended.stocks}%</span>
                      </div>
                      <Progress value={mockFinancialData.riskProfile.recommended.stocks} className="h-2" />
                      
                      <div className="flex justify-between">
                        <span>Bonds</span>
                        <span className="font-medium">{mockFinancialData.riskProfile.recommended.bonds}%</span>
                      </div>
                      <Progress value={mockFinancialData.riskProfile.recommended.bonds} className="h-2" />
                      
                      <div className="flex justify-between">
                        <span>REITs</span>
                        <span className="font-medium">{mockFinancialData.riskProfile.recommended.reits}%</span>
                      </div>
                      <Progress value={mockFinancialData.riskProfile.recommended.reits} className="h-2" />
                      
                      <div className="flex justify-between">
                        <span>Cash</span>
                        <span className="font-medium">{mockFinancialData.riskProfile.recommended.cash}%</span>
                      </div>
                      <Progress value={mockFinancialData.riskProfile.recommended.cash} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded">
                    <div className="font-bold text-blue-600">Moderate</div>
                    <div className="text-sm text-gray-600">Risk Appetite</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded">
                    <div className="font-bold text-green-600">20+ Years</div>
                    <div className="text-sm text-gray-600">Time Horizon</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded">
                    <div className="font-bold text-purple-600">Growth Focused</div>
                    <div className="text-sm text-gray-600">Investment Objective</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'insurance':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Insurance Analysis</h2>
              <p className="text-gray-600 mb-6">
                Comprehensive review of your insurance coverage and protection gaps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-red-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-red-700 text-base font-bold">
                    <Heart className="h-5 w-5" />
                    Life Insurance
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Current</span>
                      <span className="font-medium">
                        {showSensitiveData ? '$25,00,000' : '$25,00,000'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">Coverage</div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Required</span>
                      <span className="font-medium">
                        {showSensitiveData ? '$1,20,00,000' : '$1,20,00,000'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">Coverage</div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-red-600">Coverage</span>
                      <span className="font-bold text-red-600">
                        {showSensitiveData ? '$95,00,000' : '$95,00,000'}
                      </span>
                    </div>
                    <div className="text-xs text-red-600 font-medium">Gap</div>
                    
                    <Progress value={21} className="h-1 mt-1" />
                    <div className="text-xs text-gray-400">
                      21% covered
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-blue-700 text-base font-bold">
                    <Shield className="h-5 w-5" />
                    Health Insurance
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Current</span>
                      <span className="font-medium">
                        {showSensitiveData ? '$5,00,000' : '$5,00,000'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">Coverage</div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Required</span>
                      <span className="font-medium">
                        {showSensitiveData ? '$10,00,000' : '$10,00,000'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">Coverage</div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-blue-600">Coverage</span>
                      <span className="font-bold text-blue-600">
                        {showSensitiveData ? '$5,00,000' : '$5,00,000'}
                      </span>
                    </div>
                    <div className="text-xs text-blue-600 font-medium">Gap</div>
                    
                    <Progress value={50} className="h-1 mt-1" />
                    <div className="text-xs text-gray-400">
                      50% covered
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-green-700 text-base font-bold">
                    <Car className="h-5 w-5" />
                    Vehicle Insurance
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Current</span>
                      <span className="font-medium">
                        {showSensitiveData ? '$3,00,000' : '$3,00,000'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">Coverage</div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Required</span>
                      <span className="font-medium">
                        {showSensitiveData ? '$3,00,000' : '$3,00,000'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">Coverage</div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-green-600">Status</span>
                      <span className="font-bold text-green-600">Adequate</span>
                    </div>
                    
                    <Progress value={100} className="h-1 mt-1" />
                    <div className="text-xs text-gray-400">100% covered</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Insurance Learning Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="border-red-200">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Learning Focus:</strong> Understanding life insurance gaps like {showSensitiveData ? '$95,00,000' : '$ XX.XX L'} example coverage shortfall. 
                      Exploring term plans for cost-effective protection concepts.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border-yellow-200">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Important:</strong> Enhance health insurance by {showSensitiveData ? formatCurrency(mockFinancialData.insurance.health.gap) : '$ X.XX L'} to cover inflation and medical cost escalation.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border-green-200">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Good:</strong> Vehicle insurance coverage is adequate. Ensure timely renewals.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'allocation':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Asset Allocation Analysis</h2>
              <p className="text-gray-600 mb-6">
                Detailed breakdown of your current asset allocation with recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Asset Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={assetAllocationData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                        >
                          {assetAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => showSensitiveData ? formatCurrency(Number(value)) : '$ XX.XX L'} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Color-coded brick legend */}
                  <div className="flex flex-wrap justify-start gap-3 mt-6">
                    {assetAllocationData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: entry.color }}
                        ></div>
                        <span className="text-sm text-gray-700">{entry.name}</span>
                        <span className="text-sm font-medium">
                          {((entry.value / assetAllocationData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Asset Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assetAllocationData.map((asset, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{asset.name}</span>
                          <span className="text-sm">
                            {showSensitiveData ? formatCurrency(asset.value) : '$ XX.XX L'}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{((asset.value / mockFinancialData.netWorth.totalAssets) * 100).toFixed(1)}% of portfolio</span>
                          <span className="text-green-600">+8.5% returns</span>
                        </div>
                        <Progress value={(asset.value / mockFinancialData.netWorth.totalAssets) * 100} className="h-1" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Rebalancing Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Increase Allocation</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 bg-green-50 rounded">
                        <span>Equity (Mutual Funds/Stocks)</span>
                        <span className="font-medium text-green-600">+20%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-blue-50 rounded">
                        <span>International Funds</span>
                        <span className="font-medium text-blue-600">+5%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Reduce Allocation</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 bg-red-50 rounded">
                        <span>Fixed Deposits</span>
                        <span className="font-medium text-red-600">-15%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-yellow-50 rounded">
                        <span>Bank Savings</span>
                        <span className="font-medium text-yellow-600">-10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'client':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">My Profile</h2>
              <p className="text-gray-600 mb-6">
                Personal and financial background information for customized planning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Age</div>
                      <div className="font-medium">35 years</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Occupation</div>
                      <div className="font-medium">Software Engineer</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Experience</div>
                      <div className="font-medium">12 years</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Family Status</div>
                      <div className="font-medium">Married, 1 Child</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Objectives</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Wealth Creation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Retirement Planning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Child Education</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Tax Optimization</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Investment Experience & Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded">
                    <div className="font-bold text-blue-600">Moderate</div>
                    <div className="text-sm text-gray-600">Investment Knowledge</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded">
                    <div className="font-bold text-green-600">8 Years</div>
                    <div className="text-sm text-gray-600">Investment Experience</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded">
                    <div className="font-bold text-purple-600">Growth</div>
                    <div className="text-sm text-gray-600">Investment Approach</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'portfolio':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Portfolio Review</h2>
              <p className="text-gray-600 mb-6">
                Comprehensive analysis of your current investment portfolio and performance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="font-medium">1 Year Return</span>
                      <span className="font-bold text-green-600">+12.8%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="font-medium">3 Year CAGR</span>
                      <span className="font-bold text-blue-600">+15.2%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <span className="font-medium">Since Inception</span>
                      <span className="font-bold text-purple-600">+18.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Volatility</span>
                      <span className="font-medium">14.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sharpe Ratio</span>
                      <span className="font-medium">1.24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Drawdown</span>
                      <span className="font-medium">-8.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Beta</span>
                      <span className="font-medium">0.85</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Fund-wise Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'HDFC Top 100 Fund', allocation: 25, returns: '+14.5%', rating: 4 },
                    { name: 'ICICI Pru Blue Chip Fund', allocation: 20, returns: '+12.8%', rating: 5 },
                    { name: 'Axis Mid Cap Fund', allocation: 15, returns: '+18.2%', rating: 4 },
                    { name: 'SBI Small Cap Fund', allocation: 10, returns: '+22.1%', rating: 3 },
                    { name: 'HDFC Hybrid Equity Fund', allocation: 30, returns: '+11.2%', rating: 4 }
                  ].map((fund, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <div className="font-medium text-sm">{fund.name}</div>
                        <div className="text-xs text-gray-600">{fund.allocation}% allocation</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">{fund.returns}</div>
                        <div className="text-xs">{'★'.repeat(fund.rating)}{'☆'.repeat(5-fund.rating)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'strategy':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Investment Strategy</h2>
              <p className="text-gray-600 mb-6">
                Educational examples of goal-based investing and strategic asset allocation concepts.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Strategic Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Example Allocation</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Large Cap Equity</span>
                        <span className="font-medium">35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                      <div className="flex justify-between">
                        <span>Mid/Small Cap Equity</span>
                        <span className="font-medium">30%</span>
                      </div>
                      <Progress value={30} className="h-2" />
                      <div className="flex justify-between">
                        <span>Debt/Hybrid</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                      <div className="flex justify-between">
                        <span>Alternative Assets</span>
                        <span className="font-medium">10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Investment Themes</h4>
                    <div className="space-y-2">
                      <Badge variant="secondary">Technology & Innovation</Badge>
                      <Badge variant="secondary">Healthcare & Pharma</Badge>
                      <Badge variant="secondary">Financial Services</Badge>
                      <Badge variant="secondary">Infrastructure & Energy</Badge>
                      <Badge variant="secondary">Consumer Discretionary</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Systematic Investment Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600 text-lg">$75,000</div>
                      <div className="text-sm text-gray-600">Monthly investment Example</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Equity Funds</span>
                        <span>$50,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Debt Funds</span>
                        <span>$15,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>ELSS (Tax Saving)</span>
                        <span>$10,000</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rebalancing Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Review and rebalance portfolio quarterly to maintain target allocation.
                      </AlertDescription>
                    </Alert>
                    <div className="text-sm space-y-2">
                      <div>• Book profits when equity allocation exceeds 70%</div>
                      <div>• Increase equity exposure during market corrections</div>
                      <div>• Maintain 6-month emergency fund separately</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Product Details</h2>
              <p className="text-gray-600 mb-6">
                Educational examples of financial products and investment options for learning purposes.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  category: 'Mutual Funds',
                  products: [
                    { name: 'HDFC Top 100 Fund - Direct Growth', type: 'Large Cap', expense: '0.45%', minSip: '$500' },
                    { name: 'Axis Mid Cap Fund - Direct Growth', type: 'Mid Cap', expense: '0.85%', minSip: '$1,000' },
                    { name: 'Parag Parikh Flexi Cap Fund', type: 'Flexi Cap', expense: '0.72%', minSip: '$1,000' }
                  ]
                },
                {
                  category: 'Insurance Products',
                  products: [
                    { name: 'HDFC Life Click 2 Protect Plus', type: 'Term Life', expense: 'N/A', minSip: '$15,000/year' },
                    { name: 'Star Health Comprehensive', type: 'Health Insurance', expense: 'N/A', minSip: '$25,000/year' }
                  ]
                },
                {
                  category: 'Tax Saving Products',
                  products: [
                    { name: 'ELSS Mutual Funds', type: 'Equity', expense: '0.65%', minSip: '$500' },
                    { name: 'PPF Account', type: 'Debt', expense: '0%', minSip: '$500' },
                    { name: 'NPS Tier-I', type: 'Hybrid', expense: '0.25%', minSip: '$1,000' }
                  ]
                }
              ].map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.products.map((product, pIndex) => (
                        <div key={pIndex} className="border rounded p-3">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <div className="font-medium text-sm">{product.name}</div>
                              <div className="text-xs text-gray-600">{product.type}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Expense Ratio</div>
                              <div className="font-medium">{product.expense}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Min Investment</div>
                              <div className="font-medium">{product.minSip}</div>
                            </div>
                            <div className="flex items-center">
                              <Badge variant="outline">Example</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'tax':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Tax Planning</h2>
              <p className="text-gray-600 mb-6">
                Educational insights on tax planning concepts and deduction opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Tax Position</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                      <span className="font-medium">Annual Income</span>
                      <span className="font-bold">
                        {showSensitiveData ? formatCurrency(mockFinancialData.income.annual) : '$ XX.XX L'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                      <span className="font-medium">Current Tax Liability</span>
                      <span className="font-bold text-red-600">
                        {showSensitiveData ? formatCurrency(mockFinancialData.taxPlanning.currentTaxLiability) : '$ X.XX L'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="font-medium">Potential Savings</span>
                      <span className="font-bold text-green-600">
                        {showSensitiveData ? formatCurrency(mockFinancialData.taxPlanning.potentialSavings) : '$ X.XX L'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deduction Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Section 80C</span>
                        <span>$75,000 / $1,50,000</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Section 80D</span>
                        <span>$25,000 / $50,000</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>NPS (80CCD)</span>
                        <span>$50,000 / $50,000</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tax Learning Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Current Learning Focus</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Understanding 80C deductions (example: $75,000 gap)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Learning about health insurance tax benefits</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Exploring HRA optimization concepts</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Advanced Learning Topics</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Tax-efficient mutual fund concepts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Capital gains harvesting education</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Debt fund tax efficiency learning</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'estate':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Estate Planning</h2>
              <p className="text-gray-600 mb-6">
                Educational content on succession planning and wealth transfer concepts for family financial learning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Will & Testament</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert className="border-yellow-200">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        No will found. Learning about will creation can be valuable for estate planning education.
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-2">
                      <h5 className="font-medium">Will Creation Checklist:</h5>
                      <div className="space-y-1 text-sm">
                        <div>• Asset inventory and valuation</div>
                        <div>• Beneficiary identification</div>
                        <div>• Executor appointment</div>
                        <div>• Legal documentation</div>
                        <div>• Registration and safekeeping</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Nomination Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { item: 'Bank Accounts', status: 'Complete', color: 'green' },
                      { item: 'Mutual Funds', status: 'Pending', color: 'red' },
                      { item: 'Insurance Policies', status: 'Complete', color: 'green' },
                      { item: 'EPF/PPF', status: 'Complete', color: 'green' },
                      { item: 'Demat Account', status: 'Pending', color: 'red' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{item.item}</span>
                        <Badge variant={item.color === 'green' ? 'default' : 'destructive'}>
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Wealth Transfer Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded">
                    <div className="font-bold text-blue-600">Gift Tax Exemption</div>
                    <div className="text-sm text-gray-600">$50,000 annually per beneficiary</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded">
                    <div className="font-bold text-green-600">Trust Structures</div>
                    <div className="text-sm text-gray-600">For large estate planning</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded">
                    <div className="font-bold text-purple-600">Insurance Benefits</div>
                    <div className="text-sm text-gray-600">Tax-free wealth transfer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'implementation':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Implementation Guide</h2>
              <p className="text-gray-600 mb-6">
                Step-by-step educational implementation roadmap for your financial learning journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Priority Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <p className="font-medium">Enhance Life Insurance Coverage</p>
                        <p className="text-sm text-gray-600">Learning opportunity: Explore term insurance concepts with $95K coverage gap</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <p className="font-medium">Health Insurance Enhancement</p>
                        <p className="text-sm text-gray-600">Educational example: $5K additional coverage for medical inflation protection</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <p className="font-medium">Emergency Fund Building</p>
                        <p className="text-sm text-gray-600">Learning concept: 6 months of expenses in liquid savings</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Timeline & Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Immediate (0-3 months)</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Research term insurance options</li>
                        <li>• Set up emergency fund account</li>
                        <li>• Review health insurance plans</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 mb-2">Short-term (3-12 months)</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Complete insurance coverage</li>
                        <li>• Build emergency fund target</li>
                        <li>• Optimize tax-saving investments</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-700 mb-2">Long-term (1-3 years)</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Achieve retirement planning goals</li>
                        <li>• Diversify investment portfolio</li>
                        <li>• Estate planning completion</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Educational Action Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 mb-2">Insurance Learning</h4>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Research term vs. traditional life insurance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Compare health insurance providers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Understand insurance claim processes</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 mb-2">Investment Learning</h4>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Learn about investment vs. lump sum</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Understand risk tolerance concepts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Study diversification principles</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'monitoring':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Monitoring & Review Framework</h2>
              <p className="text-gray-600 mb-6">
                Educational framework for tracking your financial learning progress and portfolio development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Key Performance Indicators (KPIs)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Net Worth Growth</span>
                        <span className="text-sm text-green-600">+12% YoY</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Savings Rate</span>
                        <span className="text-sm text-blue-600">25%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Debt-to-Income Ratio</span>
                        <span className="text-sm text-orange-600">26.7%</span>
                      </div>
                      <Progress value={73} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Emergency Fund Coverage</span>
                        <span className="text-sm text-green-600">4.2 months</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Alert Triggers & Learning Signals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        <strong>Insurance Gap Alert:</strong> Life insurance coverage below 70% of requirement. Time to explore term insurance concepts.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        <strong>Rebalancing Opportunity:</strong> Equity allocation above target range. Consider learning about portfolio rebalancing.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        <strong>Goal On Track:</strong> Retirement planning progressing well. Continue current learning path.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Review Schedule & Learning Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Monthly Reviews</h4>
                    <p className="text-sm text-blue-700">Budget tracking, expense analysis, and savings rate monitoring</p>
                    <p className="text-xs text-blue-600 mt-2">Next: Jan 15, 2025</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Quarterly Assessments</h4>
                    <p className="text-sm text-green-700">Portfolio performance, goal progress, and strategy adjustments</p>
                    <p className="text-xs text-green-600 mt-2">Next: Mar 31, 2025</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Annual Reviews</h4>
                    <p className="text-sm text-purple-700">Comprehensive financial health assessment and planning updates</p>
                    <p className="text-xs text-purple-600 mt-2">Next: Dec 31, 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'appendix':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Appendix & Resources</h2>
              <p className="text-gray-600 mb-6">
                Educational resources, calculations, and reference materials for your financial learning journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-600" />
                    investment Projections & Calculations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Goal-based investment Calculations</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>House Purchase Goal:</span>
                          <span className="font-medium">$15,000/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Child Education:</span>
                          <span className="font-medium">$8,000/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Retirement Planning:</span>
                          <span className="font-medium">$12,000/month</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Expected Returns Assumptions</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Equity Funds:</span>
                          <span>12% p.a.</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Debt Funds:</span>
                          <span>7% p.a.</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hybrid Funds:</span>
                          <span>9% p.a.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    Financial Glossary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong>Asset Allocation:</strong> The distribution of investments across different asset classes like equity, debt, and gold.
                    </div>
                    <div>
                      <strong>investment (Systematic Investment Plan):</strong> A method of investing fixed amounts regularly in index funds.
                    </div>
                    <div>
                      <strong>NAV (Net Asset Value):</strong> The per-unit price of a mutual fund scheme.
                    </div>
                    <div>
                      <strong>XIRR:</strong> Extended Internal Rate of Return, used to calculate returns on investments made at different times.
                    </div>
                    <div>
                      <strong>CAGR:</strong> Compound Annual Growth Rate, the rate at which an investment grows annually.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  Risk Assessment Questionnaire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Investment Horizon Questions</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-3 bg-gray-50 rounded">
                        <strong>Q1:</strong> What is your primary investment timeline?
                        <br />
                        <span className="text-gray-600">Selected: Long-term (&gt;7 years)</span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <strong>Q2:</strong> How would you react to a 20% portfolio decline?
                        <br />
                        <span className="text-gray-600">Selected: Hold investments and continue investments</span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <strong>Q3:</strong> What percentage of equity allocation are you comfortable with?
                        <br />
                        <span className="text-gray-600">Selected: 60-80% equity exposure</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-orange-600" />
                  Educational Disclaimers & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    <strong>Educational Purpose:</strong> This report is designed for educational purposes to help you understand financial concepts and planning principles.
                  </p>
                  <p>
                    <strong>Learning Framework:</strong> All calculations and projections are educational examples based on standard financial planning assumptions.
                  </p>
                  <p>
                    <strong>RBI-AA Compliance:</strong> Data sourced through authorized Account Aggregator framework under RBI guidelines for educational analysis.
                  </p>
                  <p>
                    <strong>Investment Learning:</strong> Past performance does not guarantee future results. All investment concepts presented are for educational understanding.
                  </p>
                  <p>
                    <strong>Professional Guidance:</strong> Consider consulting certified financial planners for personalized advice beyond educational content.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">
                {reportSections.find(s => s.id === reportSection)?.name || 'Section'}
              </h2>
              <p className="text-gray-600 mb-6">
                Detailed content for this section is being prepared. This comprehensive report will include all necessary analysis and recommendations.
              </p>
            </div>

            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Content Coming Soon</h3>
                <p className="text-gray-600">
                  This section is part of our comprehensive 65-page financial health report template.
                  Detailed analysis and recommendations will be available here.
                </p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <>
      <SEO 
        title="Financial Health Report - Comprehensive 65-Page Financial Analysis"
        description="Generate a comprehensive 65-page financial health report with detailed analysis of your portfolio, goals, risk assessment, and personalized recommendations for financial planning."
        keywords="financial health report, comprehensive financial analysis, portfolio health check, financial planning report, financial assessment, wealth analysis, financial dashboard"
        canonical="https://dollarmento.com/financial-health-report"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-600">Financial Health Report</h1>
                  <p className="text-xs text-gray-500">Educational analysis for financial planning</p>
                </div>
              </div>
              
              {/* Smart Compact Health Score */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-green-50 px-3 py-1.5 rounded-full border">
                  <div className={`w-2 h-2 rounded-full ${healthGrade.color.replace('text-', 'bg-')}`}></div>
                  <span className="text-xs font-medium text-gray-700">Score:</span>
                  <span className={`text-sm font-bold ${healthGrade.color}`}>{healthScore}</span>
                  <Badge variant="secondary" className={`text-xs ${healthGrade.bg} ${healthGrade.color} border-0 px-1 py-0`}>
                    {healthGrade.grade}
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSensitiveData(!showSensitiveData)}
                    className="flex items-center gap-1"
                  >
                    {showSensitiveData ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    {showSensitiveData ? 'Hide' : 'Show'}
                  </Button>
                  <Button
                    size="sm"
                    onClick={generatePDFReport}
                    disabled={generatingReport}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-3 w-3" />
                    PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex max-w-4xl mx-auto">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-white shadow-sm border-r min-h-screen">
            <div className="p-4">
              <nav className="space-y-1">
                {reportSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setReportSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      reportSection === section.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {section.icon}
                    <span className="truncate">{section.name}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Compliance Notice in Sidebar */}
            <div className="px-4 pb-4">
              <Alert className="text-xs">
                <Info className="h-3 w-3" />
                <AlertDescription className="text-xs">
                  <strong>Disclaimer:</strong> Educational report only. Not investment advice. 
                  DollarMento is not SEBI registered. RBI-AA compliant.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white">
            <div className="p-6">
              {renderSectionContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}