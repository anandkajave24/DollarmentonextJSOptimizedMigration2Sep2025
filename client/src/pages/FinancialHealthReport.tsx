import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { SEO } from '../components/SEO';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, ResponsiveContainer, RadialBarChart, RadialBar
} from 'recharts';
import {
  FileText, Download, TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  Shield, Target, PiggyBank, CreditCard, Home, Briefcase, Heart, GraduationCap,
  Calculator, Info, BookOpen, Eye, EyeOff
} from 'lucide-react';

// Mock data - in real implementation, this would come from Account Aggregator or user input
const mockFinancialData = {
  personalInfo: {
    name: "Sample User",
    age: 35,
    occupation: "Software Engineer",
    location: "Mumbai",
    maritalStatus: "Married",
    family: {
      spouse: true,
      spouseName: "Mrs. Sample User",
      spouseAge: 32,
      spouseOccupation: "Teacher",
      children: 1,
      childrenDetails: [
        { name: "Child 1", age: 5, education: "Kindergarten" }
      ],
      dependents: 2
    },
    contact: {
      email: "sample@email.com",
      phone: "+91-9876543210"
    },
    lifestyle: {
      current: "Comfortable",
      future: "Upgrade lifestyle with growing income",
      priorities: ["Child Education", "Retirement", "Healthcare"]
    }
  },
  netWorth: {
    totalAssets: 4500000,
    totalLiabilities: 1800000,
    netWorth: 2700000,
    assets: {
      realEstate: 3000000,
      mutualFunds: 800000,
      stocks: 400000,
      fixedDeposits: 200000,
      epfPpf: 100000,
      cash: 0
    },
    liabilities: {
      homeLoan: 1500000,
      carLoan: 200000,
      creditCard: 50000,
      personalLoan: 50000
    }
  },
  income: {
    monthly: 125000,
    annual: 1500000,
    sources: ['Salary', 'Rental Income']
  },
  expenses: {
    monthly: 85000,
    categories: {
      housing: 35000,
      food: 15000,
      transportation: 8000,
      utilities: 5000,
      entertainment: 7000,
      healthcare: 5000,
      education: 10000
    }
  },
  goals: [
    { name: 'Child Education', target: 6000000, timeline: 13, currentSaving: 15000, required: 22000 },
    { name: 'Retirement', target: 25000000, timeline: 25, currentSaving: 18000, required: 28000 },
    { name: 'Emergency Fund', target: 850000, timeline: 1, currentSaving: 0, required: 70000 },
    { name: 'Home Down Payment', target: 1500000, timeline: 3, currentSaving: 25000, required: 35000 }
  ],
  insurance: {
    life: { current: 2500000, required: 10000000 },
    health: { current: 500000, required: 1000000 },
    disability: { current: 0, required: 5000000 },
    criticalIllness: { current: 0, required: 2500000 }
  },
  riskProfile: {
    score: 7,
    category: 'Moderate Aggressive',
    recommended: { equity: 65, debt: 30, alternatives: 5 },
    current: { equity: 40, debt: 55, alternatives: 5 },
    questionnaire: {
      timeHorizon: 'Long-term (10+ years)',
      volatilityTolerance: 'Moderate',
      experienceLevel: 'Intermediate',
      primaryGoal: 'Wealth Creation'
    }
  },
  existingPortfolio: {
    mutualFunds: [
      { name: 'HDFC Equity Fund', amount: 400000, category: 'Large Cap', returns: '12.5%', expense: '1.8%' },
      { name: 'SBI Small Cap Fund', amount: 200000, category: 'Small Cap', returns: '15.2%', expense: '2.1%' },
      { name: 'ICICI Debt Fund', amount: 200000, category: 'Debt', returns: '7.8%', expense: '1.2%' }
    ],
    stocks: [
      { name: 'Reliance Industries', amount: 150000, sector: 'Energy', allocation: '37.5%' },
      { name: 'HDFC Bank', amount: 100000, sector: 'Banking', allocation: '25%' },
      { name: 'TCS', amount: 150000, sector: 'IT', allocation: '37.5%' }
    ],
    fixedDeposits: [
      { bank: 'SBI', amount: 100000, rate: '6.5%', maturity: '2026' },
      { bank: 'HDFC', amount: 100000, rate: '6.8%', maturity: '2025' }
    ]
  },
  taxPlanning: {
    currentIncome: 1500000,
    taxableIncome: 1200000,
    currentTax: 130000,
    section80C: 150000,
    section80D: 25000,
    section24b: 200000,
    potentialSavings: 45000,
    suggestions: [
      'Increase ELSS investment',
      'Maximize health insurance premium',
      'Consider NPS for additional deduction'
    ]
  },
  estatePlanning: {
    will: false,
    nominations: {
      bankAccounts: 'Partial',
      mutualFunds: 'Complete',
      insurance: 'Complete',
      demat: 'Pending'
    },
    succession: {
      guardianship: 'Not defined',
      trust: 'Not setup'
    }
  },
  productRecommendations: [
    {
      goal: 'Child Education',
      product: 'ICICI Bluechip Fund (Direct)',
      type: 'investment',
      amount: 15000,
      rationale: 'Large cap stability for long-term goal'
    },
    {
      goal: 'Retirement',
      product: 'Nifty Next 50 ETF',
      type: 'investment',
      amount: 18000,
      rationale: 'Diversified mid-cap exposure'
    },
    {
      goal: 'Emergency Fund',
      product: 'SBI Liquid Fund',
      type: 'Lumpsum',
      amount: 850000,
      rationale: 'High liquidity with better returns than savings'
    }
  ]
};

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

export default function FinancialHealthReport() {
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [reportSection, setReportSection] = useState('executive');
  const [generatingReport, setGeneratingReport] = useState(false);

  const formatCurrency = (amount: number, masked = false) => {
    if (masked && !showSensitiveData) {
      return '$ XX,XX,XXX';
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateHealthScore = () => {
    let score = 0;
    const checks = [
      mockFinancialData.netWorth.netWorth > 0 ? 15 : 0, // Positive net worth
      (mockFinancialData.income.monthly - mockFinancialData.expenses.monthly) > 0 ? 15 : 0, // Positive cash flow
      mockFinancialData.insurance.life.current >= mockFinancialData.insurance.life.required * 0.5 ? 10 : 0, // Adequate life insurance
      mockFinancialData.income.monthly * 6 <= 500000 ? 10 : 0, // Emergency fund
      mockFinancialData.netWorth.assets.mutualFunds + mockFinancialData.netWorth.assets.stocks > 1000000 ? 15 : 0, // Investment portfolio
      mockFinancialData.netWorth.totalLiabilities / mockFinancialData.income.annual < 3 ? 10 : 0, // Debt to income ratio
      mockFinancialData.goals.filter(g => g.currentSaving >= g.required * 0.8).length >= 2 ? 15 : 0, // Goal funding
      mockFinancialData.riskProfile.current.equity >= 40 ? 10 : 0 // Age-appropriate equity allocation
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

  const assetAllocationData = [
    { name: 'Real Estate', value: mockFinancialData.netWorth.assets.realEstate, color: '#10B981' },
    { name: 'Mutual Funds', value: mockFinancialData.netWorth.assets.mutualFunds, color: '#3B82F6' },
    { name: 'Stocks', value: mockFinancialData.netWorth.assets.stocks, color: '#F59E0B' },
    { name: 'Fixed Deposits', value: mockFinancialData.netWorth.assets.fixedDeposits, color: '#EF4444' },
    { name: 'EPF/PPF', value: mockFinancialData.netWorth.assets.epfPpf, color: '#8B5CF6' }
  ];

  const expenseData = Object.entries(mockFinancialData.expenses.categories).map(([key, value]) => ({
    category: key.charAt(0).toUpperCase() + key.slice(1),
    amount: value,
    percentage: ((value / mockFinancialData.expenses.monthly) * 100).toFixed(1)
  }));

  const generatePDFReport = async () => {
    setGeneratingReport(true);
    // Simulate report generation
    setTimeout(() => {
      setGeneratingReport(false);
      // In real implementation, generate and download PDF
      alert('Report generation would happen here - PDF download functionality to be implemented');
    }, 2000);
  };

  return (
    <>
      <SEO 
        title="Financial Health Report - Comprehensive 65-Page Financial Analysis"
        description="Get your comprehensive financial health report with detailed analysis of income, expenses, investments, insurance, and personalized recommendations for financial improvement."
        keywords="financial health report, financial analysis, personal finance assessment, financial planning report, wealth analysis, financial checkup, money health report"
        canonical="https://dollarmento.com/financial-health-report"
      />
      <div className="max-w-4xl mx-auto p-4 space-y-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <FileText className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Comprehensive Financial Health Report</h1>
        </div>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          A detailed analysis of your financial position with educational insights and improvement recommendations.
          This is a non-advisory educational report generated by DollarMento.
        </p>
        
        {/* Smart Compact Health Score */}
        <div className="flex items-center justify-center gap-3 mt-3">
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-green-50 px-4 py-2 rounded-full border">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${healthGrade.color.replace('text-', 'bg-')}`}></div>
              <span className="text-sm font-medium text-gray-700">Health Score:</span>
              <span className={`text-lg font-bold ${healthGrade.color}`}>{healthScore}</span>
              <Badge variant="secondary" className={`text-xs ${healthGrade.bg} ${healthGrade.color} border-0`}>
                {healthGrade.grade}
              </Badge>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {healthScore >= 75 ? 'Strong' : healthScore >= 60 ? 'Good' : healthScore >= 45 ? 'Fair' : 'Needs Work'}
          </div>
        </div>
        
        {/* Compliance Notice */}
        <Alert className="max-w-3xl mx-auto text-sm">
          <Info className="h-3 w-3" />
          <AlertDescription className="text-xs">
            <strong>Important Disclaimer:</strong> This report is for educational purposes only and does not constitute financial advice. 
            DollarMento is not a SEBI registered investment advisor. Please consult qualified financial professionals for investment decisions.
            All data is processed locally and complies with RBI-AA guidelines.
          </AlertDescription>
        </Alert>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSensitiveData(!showSensitiveData)}
            className="flex items-center gap-2"
          >
            {showSensitiveData ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            {showSensitiveData ? 'Hide' : 'Show'} Financial Data
          </Button>
          <Button
            size="sm"
            onClick={generatePDFReport}
            disabled={generatingReport}
            className="flex items-center gap-2"
          >
            <Download className="h-3 w-3" />
            {generatingReport ? 'Generating...' : 'Download PDF Report'}
          </Button>
        </div>
      </div>



      {/* Main Report Tabs */}
      <Tabs value={reportSection} onValueChange={setReportSection} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="executive">Executive Summary</TabsTrigger>
          <TabsTrigger value="profile">Client Profile</TabsTrigger>
          <TabsTrigger value="networth">Net Worth</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          <TabsTrigger value="goals">Goals Analysis</TabsTrigger>
          <TabsTrigger value="risk">Risk Profiling</TabsTrigger>
        </TabsList>
        
        <div className="mt-4">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio Review</TabsTrigger>
            <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
            <TabsTrigger value="strategy">Investment Strategy</TabsTrigger>
            <TabsTrigger value="products">Product Details</TabsTrigger>
            <TabsTrigger value="tax">Tax Planning</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="mt-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="estate">Estate Planning</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="appendix">Appendix</TabsTrigger>
          </TabsList>
        </div>

        {/* Executive Summary Tab */}
        <TabsContent value="executive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Executive Summary
              </CardTitle>
              <CardDescription>Key highlights and recommendations from your comprehensive financial analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Financial Position Summary</h4>
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Net Worth</span>
                        <span className="font-bold text-green-600">{formatCurrency(mockFinancialData.netWorth.netWorth, true)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Monthly Surplus</span>
                        <span className="font-bold text-blue-600">{formatCurrency(mockFinancialData.income.monthly - mockFinancialData.expenses.monthly, true)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Savings Rate</span>
                        <span className="font-bold">{(((mockFinancialData.income.monthly - mockFinancialData.expenses.monthly) / mockFinancialData.income.monthly) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Financial Health Score</span>
                        <Badge className={`${healthGrade.bg} ${healthGrade.color} text-lg px-3 py-1`}>
                          {healthScore}/100 ({healthGrade.grade})
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-medium">Key Financial Goals Status</h5>
                    <div className="space-y-2">
                      {mockFinancialData.goals.slice(0, 4).map((goal, index) => (
                        <div key={index} className="flex justify-between items-center p-2 border rounded">
                          <span className="text-sm">{goal.name}</span>
                          <Badge variant={goal.currentSaving >= goal.required * 0.8 ? "default" : "destructive"}>
                            {goal.currentSaving >= goal.required * 0.8 ? "On Track" : "Gap"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Summary of Recommendations</h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded-r">
                      <h5 className="font-medium text-red-700">Immediate Actions (Week 1-2)</h5>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>• Buy Adequate Term Life Insurance ($1 Cr)</li>
                        <li>• Enhance Health Insurance Coverage ($10L)</li>
                        <li>• Build Emergency Fund Immediately ($8.5L)</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-3 rounded-r">
                      <h5 className="font-medium text-yellow-700">Short-term Improvements (1-3 months)</h5>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>• Increase Equity Allocation to 65%</li>
                        <li>• Start Goal-based investment Investments</li>
                        <li>• Optimize Tax Planning Strategy</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded-r">
                      <h5 className="font-medium text-green-700">Long-term Planning (3-12 months)</h5>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>• Initiate Estate Planning & Will Creation</li>
                        <li>• Portfolio Rebalancing & Monitoring</li>
                        <li>• Annual Financial Health Review</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <h5 className="font-medium mb-2">Investment Priority</h5>
                  <div className="text-3xl font-bold text-blue-600">65%</div>
                  <p className="text-sm text-gray-600">Recommended Equity Allocation</p>
                </div>
                <div className="text-center">
                  <h5 className="font-medium mb-2">Protection Gap</h5>
                  <div className="text-3xl font-bold text-red-600">{formatCurrency(mockFinancialData.insurance.life.required - mockFinancialData.insurance.life.current, true)}</div>
                  <p className="text-sm text-gray-600">Life Insurance Shortfall</p>
                </div>
                <div className="text-center">
                  <h5 className="font-medium mb-2">Implementation Timeline</h5>
                  <div className="text-3xl font-bold text-green-600">90</div>
                  <p className="text-sm text-gray-600">Days to Complete Setup</p>
                </div>
              </div>

              <Alert className="mt-6">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Executive Note:</strong> Your financial foundation is solid with positive net worth and good cash flow. 
                  Priority focus should be on adequate insurance protection and emergency fund establishment before 
                  optimizing investment allocation. Implementation of these recommendations can significantly improve 
                  your financial health score from {healthScore} to an estimated 85+ within 12 months.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Client Information & Profile
              </CardTitle>
              <CardDescription>Personal and family details used for financial planning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Personal Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Name</p>
                      <p className="font-medium">{mockFinancialData.personalInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Age</p>
                      <p className="font-medium">{mockFinancialData.personalInfo.age} years</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Occupation</p>
                      <p className="font-medium">{mockFinancialData.personalInfo.occupation}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Location</p>
                      <p className="font-medium">{mockFinancialData.personalInfo.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Marital Status</p>
                      <p className="font-medium">{mockFinancialData.personalInfo.maritalStatus}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Dependents</p>
                      <p className="font-medium">{mockFinancialData.personalInfo.family.dependents}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Family Snapshot</h4>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-3">
                      <h5 className="font-medium">Spouse Details</h5>
                      <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                        <div>
                          <p className="text-gray-600">Name</p>
                          <p>{mockFinancialData.personalInfo.family.spouseName}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Age</p>
                          <p>{mockFinancialData.personalInfo.family.spouseAge} years</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-600">Occupation</p>
                          <p>{mockFinancialData.personalInfo.family.spouseOccupation}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <h5 className="font-medium">Children Details</h5>
                      {mockFinancialData.personalInfo.family.childrenDetails.map((child, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2 text-sm mt-2">
                          <div>
                            <p className="text-gray-600">Name</p>
                            <p>{child.name}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Age</p>
                            <p>{child.age} years</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Education</p>
                            <p>{child.education}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Lifestyle & Preferences</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-600 text-sm">Current Lifestyle</p>
                      <p className="font-medium">{mockFinancialData.personalInfo.lifestyle.current}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Future Aspirations</p>
                      <p className="font-medium">{mockFinancialData.personalInfo.lifestyle.future}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Financial Priorities</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {mockFinancialData.personalInfo.lifestyle.priorities.map((priority, index) => (
                          <Badge key={index} variant="secondary">{priority}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Planning Assumptions</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Inflation Rate</p>
                        <p className="font-bold">6.0% p.a.</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Equity Returns</p>
                        <p className="font-bold">12.0% p.a.</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Debt Returns</p>
                        <p className="font-bold">7.5% p.a.</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Salary Growth</p>
                        <p className="font-bold">8.0% p.a.</p>
                      </div>
                    </div>
                    <Alert className="mt-3">
                      <Info className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        These assumptions are based on historical averages and may vary with market conditions.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(mockFinancialData.netWorth.netWorth, true)}</div>
                <p className="text-xs text-muted-foreground">Assets minus liabilities</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Surplus</CardTitle>
                <PiggyBank className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(mockFinancialData.income.monthly - mockFinancialData.expenses.monthly, true)}</div>
                <p className="text-xs text-muted-foreground">Income after expenses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Insurance Gap</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(mockFinancialData.insurance.life.required - mockFinancialData.insurance.life.current, true)}</div>
                <p className="text-xs text-muted-foreground">Life insurance shortfall</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Goal Readiness</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockFinancialData.goals.filter(g => g.currentSaving >= g.required * 0.8).length}/{mockFinancialData.goals.length}
                </div>
                <p className="text-xs text-muted-foreground">Goals on track</p>
              </CardContent>
            </Card>
          </div>

          {/* Key Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Key Financial Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-600 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Strengths
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Positive net worth of {formatCurrency(mockFinancialData.netWorth.netWorth, true)}</li>
                    <li>• Good monthly cash flow surplus</li>
                    <li>• Diversified asset portfolio</li>
                    <li>• Active investment in index funds and stocks</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-600 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Insufficient life insurance coverage</li>
                    <li>• No emergency fund established</li>
                    <li>• Under-allocated to equity for age</li>
                    <li>• Health insurance needs enhancement</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Net Worth Tab */}
        <TabsContent value="networth" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Current distribution of your assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={assetAllocationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {assetAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value), true)} />
                    </PieChart>
                  </ResponsiveContainer>
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
                    <span className="font-bold text-green-600">{formatCurrency(mockFinancialData.netWorth.totalAssets, true)}</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Total Liabilities</span>
                    <span className="font-bold text-red-600">{formatCurrency(mockFinancialData.netWorth.totalLiabilities, true)}</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>

                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Net Worth</span>
                  <span className="font-bold text-lg text-blue-600">{formatCurrency(mockFinancialData.netWorth.netWorth, true)}</span>
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
        </TabsContent>

        {/* Cash Flow Tab */}
        <TabsContent value="cashflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Comprehensive Cash Flow Analysis
              </CardTitle>
              <CardDescription>Current income vs expenses with future projections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Current Monthly Cash Flow */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Current Monthly Cash Flow</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                        <span className="font-medium">Monthly Income</span>
                        <span className="font-bold text-green-600">{formatCurrency(mockFinancialData.income.monthly, true)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                        <span className="font-medium">Monthly Expenses</span>
                        <span className="font-bold text-red-600">{formatCurrency(mockFinancialData.expenses.monthly, true)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                        <span className="font-bold">Net Surplus</span>
                        <span className="font-bold text-blue-600">
                          {formatCurrency(mockFinancialData.income.monthly - mockFinancialData.expenses.monthly, true)}
                        </span>
                      </div>

                      <div className="mt-4">
                        <h5 className="font-semibold mb-2">Savings Rate Analysis</h5>
                        <Progress 
                          value={((mockFinancialData.income.monthly - mockFinancialData.expenses.monthly) / mockFinancialData.income.monthly) * 100} 
                          className="h-3" 
                        />
                        <p className="text-sm text-gray-600 mt-1">
                          You save {(((mockFinancialData.income.monthly - mockFinancialData.expenses.monthly) / mockFinancialData.income.monthly) * 100).toFixed(1)}% of your income. 
                          Target: 20-30% for optimal financial health.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Expense Categories</h4>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={expenseData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" angle={-45} textAnchor="end" height={60} />
                          <YAxis />
                          <Tooltip formatter={(value) => formatCurrency(Number(value), true)} />
                          <Bar dataKey="amount" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Annual Cash Flow Summary */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Annual Cash Flow Summary</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <h5 className="font-medium text-green-700">Annual Income</h5>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(mockFinancialData.income.annual, true)}</p>
                      <p className="text-sm text-gray-600">Including all sources</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg text-center">
                      <h5 className="font-medium text-red-700">Annual Expenses</h5>
                      <p className="text-2xl font-bold text-red-600">{formatCurrency(mockFinancialData.expenses.monthly * 12, true)}</p>
                      <p className="text-sm text-gray-600">Total spending</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <h5 className="font-medium text-blue-700">Annual Surplus</h5>
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency((mockFinancialData.income.monthly - mockFinancialData.expenses.monthly) * 12, true)}</p>
                      <p className="text-sm text-gray-600">Available for investment</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg text-center">
                      <h5 className="font-medium text-purple-700">EMI Obligations</h5>
                      <p className="text-2xl font-bold text-purple-600">{formatCurrency(35000, true)}</p>
                      <p className="text-sm text-gray-600">Monthly EMI total</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Future Cash Flow Projections */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Future Cash Flow Projections (5, 10, 20 years)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-3 text-left">Year</th>
                          <th className="border border-gray-300 p-3 text-center">Projected Income</th>
                          <th className="border border-gray-300 p-3 text-center">Projected Expenses</th>
                          <th className="border border-gray-300 p-3 text-center">Net Surplus</th>
                          <th className="border border-gray-300 p-3 text-center">Cumulative Surplus</th>
                          <th className="border border-gray-300 p-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[5, 10, 15, 20].map((year) => {
                          const projectedIncome = mockFinancialData.income.annual * Math.pow(1.08, year);
                          const projectedExpenses = mockFinancialData.expenses.monthly * 12 * Math.pow(1.06, year);
                          const netSurplus = projectedIncome - projectedExpenses;
                          const cumulativeSurplus = netSurplus * year * 0.7; // Simplified calculation
                          
                          return (
                            <tr key={year}>
                              <td className="border border-gray-300 p-3 font-medium">Year {year}</td>
                              <td className="border border-gray-300 p-3 text-center">{formatCurrency(projectedIncome, true)}</td>
                              <td className="border border-gray-300 p-3 text-center">{formatCurrency(projectedExpenses, true)}</td>
                              <td className="border border-gray-300 p-3 text-center">
                                <span className={netSurplus > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                                  {formatCurrency(netSurplus, true)}
                                </span>
                              </td>
                              <td className="border border-gray-300 p-3 text-center">{formatCurrency(cumulativeSurplus, true)}</td>
                              <td className="border border-gray-300 p-3 text-center">
                                <Badge variant={netSurplus > 0 ? "default" : "destructive"}>
                                  {netSurplus > 0 ? 'Surplus' : 'Deficit'}
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <Separator />

                {/* Cash Surplus/Deficit Analysis */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Cash Surplus/Deficit Analysis</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h5 className="font-medium">Key Observations</h5>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 p-3 bg-green-50 rounded">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-700">Positive Cash Flow</p>
                            <p className="text-sm text-gray-600">Current surplus of {formatCurrency(mockFinancialData.income.monthly - mockFinancialData.expenses.monthly, true)}/month</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded">
                          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-700">Growing Income Trajectory</p>
                            <p className="text-sm text-gray-600">8% annual growth expected in line with career progression</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-yellow-700">Inflation Impact</p>
                            <p className="text-sm text-gray-600">Expenses growing at 6% annually due to inflation</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-medium">Future Projections</h5>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={[5, 10, 15, 20].map(year => ({
                            year,
                            income: mockFinancialData.income.annual * Math.pow(1.08, year) / 100000,
                            expenses: mockFinancialData.expenses.monthly * 12 * Math.pow(1.06, year) / 100000,
                            surplus: (mockFinancialData.income.annual * Math.pow(1.08, year) - mockFinancialData.expenses.monthly * 12 * Math.pow(1.06, year)) / 100000
                          }))}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip formatter={(value) => `$${Number(value).toFixed(1)}L`} />
                            <Legend />
                            <Line type="monotone" dataKey="income" stroke="#10B981" name="Income" />
                            <Line type="monotone" dataKey="expenses" stroke="#EF4444" name="Expenses" />
                            <Line type="monotone" dataKey="surplus" stroke="#3B82F6" name="Surplus" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Comprehensive Financial Goals Analysis
              </CardTitle>
              <CardDescription>Detailed analysis and projections for each financial objective</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Goals Summary Table */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Goals Summary Matrix</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-3 text-left">Goal</th>
                          <th className="border border-gray-300 p-3 text-center">Time Horizon</th>
                          <th className="border border-gray-300 p-3 text-center">Future Value</th>
                          <th className="border border-gray-300 p-3 text-center">Current investment</th>
                          <th className="border border-gray-300 p-3 text-center">Required investment</th>
                          <th className="border border-gray-300 p-3 text-center">Gap</th>
                          <th className="border border-gray-300 p-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockFinancialData.goals.map((goal, index) => {
                          const gap = goal.required - goal.currentSaving;
                          const progress = (goal.currentSaving / goal.required) * 100;
                          const isOnTrack = goal.currentSaving >= goal.required * 0.8;
                          
                          return (
                            <tr key={index}>
                              <td className="border border-gray-300 p-3 font-medium">{goal.name}</td>
                              <td className="border border-gray-300 p-3 text-center">{goal.timeline} yrs</td>
                              <td className="border border-gray-300 p-3 text-center">{formatCurrency(goal.target, true)}</td>
                              <td className="border border-gray-300 p-3 text-center">{formatCurrency(goal.currentSaving, true)}</td>
                              <td className="border border-gray-300 p-3 text-center">{formatCurrency(goal.required, true)}</td>
                              <td className="border border-gray-300 p-3 text-center">
                                <span className={gap > 0 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}>
                                  {gap > 0 ? formatCurrency(gap, true) : 'On Track'}
                                </span>
                              </td>
                              <td className="border border-gray-300 p-3 text-center">
                                <Badge variant={isOnTrack ? "default" : "destructive"}>
                                  {isOnTrack ? "On Track" : "Gap"}
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <Separator />

                {/* Goal-wise Funding Status Chart */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Goal-wise Funding Status</h4>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockFinancialData.goals.map(goal => ({
                        name: goal.name.replace(' ', '\n'),
                        current: goal.currentSaving,
                        required: goal.required,
                        progress: (goal.currentSaving / goal.required) * 100
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(Number(value), true)} />
                        <Legend />
                        <Bar dataKey="current" fill="#10B981" name="Current investment" />
                        <Bar dataKey="required" fill="#EF4444" name="Required investment" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <Separator />

                {/* Detailed Goal Analysis */}
                <div className="space-y-6">
                  <h4 className="font-semibold text-lg">Detailed Goal Projections</h4>
                  {mockFinancialData.goals.map((goal, index) => {
                    const progress = (goal.currentSaving / goal.required) * 100;
                    const isOnTrack = goal.currentSaving >= goal.required * 0.8;
                    const projectedAmount = goal.currentSaving * 12 * (((1 + 0.12) ** goal.timeline - 1) / 0.12);
                    const shortfall = Math.max(0, goal.target - projectedAmount);
                    
                    return (
                      <div key={index} className="border rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h5 className="font-semibold text-xl">{goal.name}</h5>
                          <Badge variant={isOnTrack ? "default" : "destructive"} className="text-sm px-3 py-1">
                            {isOnTrack ? "On Track" : "Needs Attention"}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-3 bg-blue-50 rounded">
                                <p className="text-sm text-gray-600">Target Amount</p>
                                <p className="text-xl font-bold text-blue-600">{formatCurrency(goal.target, true)}</p>
                              </div>
                              <div className="p-3 bg-green-50 rounded">
                                <p className="text-sm text-gray-600">Time Horizon</p>
                                <p className="text-xl font-bold text-green-600">{goal.timeline} years</p>
                              </div>
                              <div className="p-3 bg-yellow-50 rounded">
                                <p className="text-sm text-gray-600">Current investment</p>
                                <p className="text-xl font-bold text-yellow-600">{formatCurrency(goal.currentSaving, true)}</p>
                              </div>
                              <div className="p-3 bg-purple-50 rounded">
                                <p className="text-sm text-gray-600">Required investment</p>
                                <p className="text-xl font-bold text-purple-600">{formatCurrency(goal.required, true)}</p>
                              </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded">
                              <h6 className="font-medium mb-2">Projection Analysis</h6>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Expected Amount (Current investment)</span>
                                  <span className="font-bold">{formatCurrency(projectedAmount, true)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Target Amount</span>
                                  <span className="font-bold">{formatCurrency(goal.target, true)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Shortfall</span>
                                  <span className={shortfall > 0 ? 'font-bold text-red-600' : 'font-bold text-green-600'}>
                                    {shortfall > 0 ? formatCurrency(shortfall, true) : 'Target Achieved'}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Success Probability</span>
                                  <span className="font-bold">{isOnTrack ? '94%' : '72%'}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h6 className="font-medium">Investment Growth Projection</h6>
                            <div className="h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={Array.from({ length: goal.timeline + 1 }, (_, year) => {
                                  const investedAmount = goal.required * 12 * year;
                                  const futureValue = year === 0 ? 0 : goal.required * 12 * (((1 + 0.12) ** year - 1) / 0.12);
                                  return {
                                    year,
                                    invested: investedAmount,
                                    value: futureValue,
                                    target: goal.target
                                  };
                                })}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="year" />
                                  <YAxis />
                                  <Tooltip formatter={(value) => formatCurrency(Number(value), true)} />
                                  <Legend />
                                  <Line type="monotone" dataKey="invested" stroke="#3B82F6" name="Total Invested" />
                                  <Line type="monotone" dataKey="value" stroke="#10B981" name="Projected Value" />
                                  <Line type="monotone" dataKey="target" stroke="#EF4444" strokeDasharray="5 5" name="Target" />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>

                            {!isOnTrack && (
                              <Alert>
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>
                                  <strong>Action Required:</strong> Increase monthly investment by {formatCurrency(goal.required - goal.currentSaving)} 
                                  to achieve your {goal.name} goal. Consider starting additional investments or increasing existing ones.
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>
                        </div>

                        <Separator className="my-4" />

                        {/* Year-wise Contribution Table */}
                        <div className="space-y-3">
                          <h6 className="font-medium">Year-wise Investment Plan</h6>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="border border-gray-300 p-2">Year</th>
                                  <th className="border border-gray-300 p-2">Annual Investment</th>
                                  <th className="border border-gray-300 p-2">Cumulative Investment</th>
                                  <th className="border border-gray-300 p-2">Projected Value</th>
                                  <th className="border border-gray-300 p-2">Growth</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Array.from({ length: Math.min(5, goal.timeline) }, (_, i) => {
                                  const year = i + 1;
                                  const annualInvestment = goal.required * 12;
                                  const cumulativeInvestment = annualInvestment * year;
                                  const futureValue = goal.required * 12 * (((1 + 0.12) ** year - 1) / 0.12);
                                  const growth = futureValue - cumulativeInvestment;
                                  
                                  return (
                                    <tr key={year}>
                                      <td className="border border-gray-300 p-2 text-center">{year}</td>
                                      <td className="border border-gray-300 p-2 text-center">{formatCurrency(annualInvestment, true)}</td>
                                      <td className="border border-gray-300 p-2 text-center">{formatCurrency(cumulativeInvestment, true)}</td>
                                      <td className="border border-gray-300 p-2 text-center">{formatCurrency(futureValue, true)}</td>
                                      <td className="border border-gray-300 p-2 text-center text-green-600">{formatCurrency(growth, true)}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insurance Tab */}
        <TabsContent value="insurance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Insurance Coverage Analysis
              </CardTitle>
              <CardDescription>Protection gaps and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(mockFinancialData.insurance).map(([type, coverage], index) => {
                  const gap = coverage.required - coverage.current;
                  const adequacy = (coverage.current / coverage.required) * 100;
                  
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold capitalize">{type.replace(/([A-Z])/g, ' $1')} Insurance</h4>
                        <Badge variant={adequacy >= 100 ? "default" : adequacy >= 50 ? "secondary" : "destructive"}>
                          {adequacy >= 100 ? "Adequate" : adequacy >= 50 ? "Partial" : "Insufficient"}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Current Coverage</p>
                          <p className="font-bold">{formatCurrency(coverage.current, true)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Recommended Coverage</p>
                          <p className="font-bold">{formatCurrency(coverage.required, true)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Coverage Gap</p>
                          <p className="font-bold text-red-600">{formatCurrency(gap, true)}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Coverage Adequacy</span>
                          <span>{adequacy.toFixed(1)}%</span>
                        </div>
                        <Progress value={Math.min(adequacy, 100)} className="h-2" />
                        
                        {gap > 0 && (
                          <Alert>
                            <Info className="h-4 w-4" />
                            <AlertDescription>
                              Consider increasing your {type} insurance coverage by {formatCurrency(gap)} 
                              to ensure adequate protection for your family.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Profile Tab */}
        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Risk Profiling & Suitability Analysis
              </CardTitle>
              <CardDescription>Understanding your risk tolerance and investment suitability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Risk Assessment Summary</h4>
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{mockFinancialData.riskProfile.score}/10</p>
                        <p className="text-sm text-gray-600">Risk Score</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
                        {mockFinancialData.riskProfile.category}
                      </Badge>
                    </div>
                    <Progress value={mockFinancialData.riskProfile.score * 10} className="h-3" />
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-medium">Risk Questionnaire Summary</h5>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">Investment Time Horizon</span>
                        <span className="font-medium">{mockFinancialData.riskProfile.questionnaire.timeHorizon}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">Volatility Tolerance</span>
                        <span className="font-medium">{mockFinancialData.riskProfile.questionnaire.volatilityTolerance}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">Experience Level</span>
                        <span className="font-medium">{mockFinancialData.riskProfile.questionnaire.experienceLevel}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">Primary Goal</span>
                        <span className="font-medium">{mockFinancialData.riskProfile.questionnaire.primaryGoal}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Recommended Asset Allocation</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Equity', value: mockFinancialData.riskProfile.recommended.equity, color: '#10B981' },
                            { name: 'Debt', value: mockFinancialData.riskProfile.recommended.debt, color: '#3B82F6' },
                            { name: 'Alternatives', value: mockFinancialData.riskProfile.recommended.alternatives, color: '#F59E0B' }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name} ${value}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[
                            { name: 'Equity', value: mockFinancialData.riskProfile.recommended.equity, color: '#10B981' },
                            { name: 'Debt', value: mockFinancialData.riskProfile.recommended.debt, color: '#3B82F6' },
                            { name: 'Alternatives', value: mockFinancialData.riskProfile.recommended.alternatives, color: '#F59E0B' }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Based on your risk profile, this allocation balances growth potential with stability. 
                      The equity allocation of {mockFinancialData.riskProfile.recommended.equity}% is suitable for your age and goals.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Suitability vs. Market Risk Analysis</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-2 text-left">Risk Level</th>
                        <th className="border border-gray-300 p-2 text-left">Market Condition</th>
                        <th className="border border-gray-300 p-2 text-left">Your Suitability</th>
                        <th className="border border-gray-300 p-2 text-left">Recommendation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2">High Risk (Equity 80%+)</td>
                        <td className="border border-gray-300 p-2">Bull Market</td>
                        <td className="border border-gray-300 p-2">
                          <Badge variant="secondary">Moderate</Badge>
                        </td>
                        <td className="border border-gray-300 p-2">Consider gradual increase</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Moderate Risk (Equity 50-70%)</td>
                        <td className="border border-gray-300 p-2">Volatile Market</td>
                        <td className="border border-gray-300 p-2">
                          <Badge className="bg-green-100 text-green-800">High</Badge>
                        </td>
                        <td className="border border-gray-300 p-2">Ideal match for your profile</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Low Risk (Equity {'<'}50%)</td>
                        <td className="border border-gray-300 p-2">Bear Market</td>
                        <td className="border border-gray-300 p-2">
                          <Badge variant="secondary">Moderate</Badge>
                        </td>
                        <td className="border border-gray-300 p-2">Temporary defensive allocation</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Portfolio Review Tab */}
        <TabsContent value="portfolio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Existing Portfolio Review & Analysis
              </CardTitle>
              <CardDescription>Comprehensive analysis of your current investment holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Mutual Funds Analysis */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Mutual Funds: Fund-wise Analysis</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-3 text-left">Fund Name</th>
                          <th className="border border-gray-300 p-3 text-center">Category</th>
                          <th className="border border-gray-300 p-3 text-center">Investment</th>
                          <th className="border border-gray-300 p-3 text-center">3Y Return</th>
                          <th className="border border-gray-300 p-3 text-center">Expense Ratio</th>
                          <th className="border border-gray-300 p-3 text-center">Risk Level</th>
                          <th className="border border-gray-300 p-3 text-center">Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockFinancialData.existingPortfolio.mutualFunds.map((fund, index) => (
                          <tr key={index}>
                            <td className="border border-gray-300 p-3 font-medium">{fund.name}</td>
                            <td className="border border-gray-300 p-3 text-center">{fund.category}</td>
                            <td className="border border-gray-300 p-3 text-center">{formatCurrency(fund.amount, true)}</td>
                            <td className="border border-gray-300 p-3 text-center text-green-600">{fund.returns}</td>
                            <td className="border border-gray-300 p-3 text-center">{fund.expense}</td>
                            <td className="border border-gray-300 p-3 text-center">
                              <Badge variant={fund.category === 'Large Cap' ? 'default' : fund.category === 'Small Cap' ? 'destructive' : 'secondary'}>
                                {fund.category === 'Large Cap' ? 'Low' : fund.category === 'Small Cap' ? 'High' : 'Medium'}
                              </Badge>
                            </td>
                            <td className="border border-gray-300 p-3 text-center">
                              <Badge className="bg-green-100 text-green-800">4.5★</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <Separator />

                {/* Stock Holdings Analysis */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Stocks: Sectoral & Concentration Risk</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-3">Current Stock Holdings</h5>
                      <div className="space-y-2">
                        {mockFinancialData.existingPortfolio.stocks.map((stock, index) => (
                          <div key={index} className="flex justify-between items-center p-3 border rounded">
                            <div>
                              <p className="font-medium">{stock.name}</p>
                              <p className="text-sm text-gray-600">{stock.sector}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{formatCurrency(stock.amount, true)}</p>
                              <p className="text-sm text-gray-600">{stock.allocation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-3">Sectoral Concentration Risk</h5>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'IT', value: 37.5, color: '#10B981' },
                                { name: 'Energy', value: 37.5, color: '#3B82F6' },
                                { name: 'Banking', value: 25, color: '#F59E0B' }
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, value }) => `${name} ${value}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {[
                                { name: 'IT', value: 37.5, color: '#10B981' },
                                { name: 'Energy', value: 37.5, color: '#3B82F6' },
                                { name: 'Banking', value: 25, color: '#F59E0B' }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <Alert className="mt-3">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          High concentration in IT and Energy sectors (75%). Consider diversifying across more sectors.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Debt Instruments Analysis */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Debt Instruments: Returns vs. Liquidity</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-3">Fixed Deposit Portfolio</h5>
                      <div className="space-y-2">
                        {mockFinancialData.existingPortfolio.fixedDeposits.map((fd, index) => (
                          <div key={index} className="flex justify-between items-center p-3 border rounded">
                            <div>
                              <p className="font-medium">{fd.bank}</p>
                              <p className="text-sm text-gray-600">Maturity: {fd.maturity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{formatCurrency(fd.amount, true)}</p>
                              <p className="text-sm text-green-600">{fd.rate}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-3">Debt Allocation Analysis</h5>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded">
                          <h6 className="font-medium">Current Debt Allocation</h6>
                          <p className="text-2xl font-bold text-blue-600">55%</p>
                          <p className="text-sm text-gray-600">Higher than recommended for your age</p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded">
                          <h6 className="font-medium">Average Return</h6>
                          <p className="text-2xl font-bold text-yellow-600">6.65%</p>
                          <p className="text-sm text-gray-600">Post-tax returns may be lower</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded">
                          <h6 className="font-medium">Liquidity Score</h6>
                          <p className="text-2xl font-bold text-green-600">Medium</p>
                          <p className="text-sm text-gray-600">FDs have lock-in periods</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Portfolio Health Check */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Portfolio Health Check</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h5 className="font-medium">Diversification Score</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Asset Classes</span>
                          <Badge className="bg-green-100 text-green-800">Good</Badge>
                        </div>
                        <Progress value={75} className="h-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Sector Spread</span>
                          <Badge variant="secondary">Moderate</Badge>
                        </div>
                        <Progress value={60} className="h-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Fund Houses</span>
                          <Badge className="bg-green-100 text-green-800">Good</Badge>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-medium">Asset Allocation Drift</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                          <span className="text-sm">Equity Underweight</span>
                          <span className="font-bold text-red-600">-25%</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                          <span className="text-sm">Debt Overweight</span>
                          <span className="font-bold text-yellow-600">+25%</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="text-sm">Alternatives</span>
                          <span className="font-bold text-green-600">On Track</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-medium">Historical Performance</h5>
                      <div className="space-y-2">
                        <div className="text-center p-2 border rounded">
                          <p className="text-sm text-gray-600">Portfolio CAGR</p>
                          <p className="text-xl font-bold text-blue-600">9.2%</p>
                        </div>
                        <div className="text-center p-2 border rounded">
                          <p className="text-sm text-gray-600">XIRR</p>
                          <p className="text-xl font-bold text-green-600">8.8%</p>
                        </div>
                        <div className="text-center p-2 border rounded">
                          <p className="text-sm text-gray-600">vs. Benchmark</p>
                          <p className="text-xl font-bold text-yellow-600">-1.2%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Portfolio Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Asset Allocation</CardTitle>
                <CardDescription>Your current investment mix</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Equity</span>
                    <span className="font-bold">{mockFinancialData.riskProfile.current.equity}%</span>
                  </div>
                  <Progress value={mockFinancialData.riskProfile.current.equity} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span>Debt</span>
                    <span className="font-bold">{mockFinancialData.riskProfile.current.debt}%</span>
                  </div>
                  <Progress value={mockFinancialData.riskProfile.current.debt} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span>Alternatives</span>
                    <span className="font-bold">{mockFinancialData.riskProfile.current.alternatives}%</span>
                  </div>
                  <Progress value={mockFinancialData.riskProfile.current.alternatives} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Allocation</CardTitle>
                <CardDescription>Based on your risk profile: {mockFinancialData.riskProfile.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Equity</span>
                    <span className="font-bold text-green-600">{mockFinancialData.riskProfile.recommended.equity}%</span>
                  </div>
                  <Progress value={mockFinancialData.riskProfile.recommended.equity} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span>Debt</span>
                    <span className="font-bold text-blue-600">{mockFinancialData.riskProfile.recommended.debt}%</span>
                  </div>
                  <Progress value={mockFinancialData.riskProfile.recommended.debt} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span>Alternatives</span>
                    <span className="font-bold text-purple-600">{mockFinancialData.riskProfile.recommended.alternatives}%</span>
                  </div>
                  <Progress value={mockFinancialData.riskProfile.recommended.alternatives} className="h-2" />
                </div>

                <Alert className="mt-4">
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    Consider increasing equity allocation by {mockFinancialData.riskProfile.recommended.equity - mockFinancialData.riskProfile.current.equity}% 
                    to align with your risk profile and age.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Asset Allocation Tab */}
        <TabsContent value="allocation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Recommended Asset Allocation Strategy
              </CardTitle>
              <CardDescription>Optimal portfolio mix based on your risk profile and goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Current vs. Recommended Allocation</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-3 text-left">Asset Class</th>
                          <th className="border border-gray-300 p-3 text-center">Current (%)</th>
                          <th className="border border-gray-300 p-3 text-center">Recommended (%)</th>
                          <th className="border border-gray-300 p-3 text-right">Value ($)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-3 font-medium">Equity</td>
                          <td className="border border-gray-300 p-3 text-center">{mockFinancialData.riskProfile.current.equity}%</td>
                          <td className="border border-gray-300 p-3 text-center text-green-600 font-bold">{mockFinancialData.riskProfile.recommended.equity}%</td>
                          <td className="border border-gray-300 p-3 text-right">{formatCurrency(2300000, true)}</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-medium">Debt</td>
                          <td className="border border-gray-300 p-3 text-center">{mockFinancialData.riskProfile.current.debt}%</td>
                          <td className="border border-gray-300 p-3 text-center text-blue-600 font-bold">{mockFinancialData.riskProfile.recommended.debt}%</td>
                          <td className="border border-gray-300 p-3 text-right">{formatCurrency(1400000, true)}</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-medium">Gold/REITs</td>
                          <td className="border border-gray-300 p-3 text-center">{mockFinancialData.riskProfile.current.alternatives}%</td>
                          <td className="border border-gray-300 p-3 text-center text-purple-600 font-bold">{mockFinancialData.riskProfile.recommended.alternatives}%</td>
                          <td className="border border-gray-300 p-3 text-right">{formatCurrency(500000, true)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <Alert>
                    <TrendingUp className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Key Change:</strong> Increase equity allocation by {mockFinancialData.riskProfile.recommended.equity - mockFinancialData.riskProfile.current.equity}% 
                      to align with your age and long-term goals. This matches your moderate-aggressive risk profile.
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Allocation Rationale</h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-green-500 pl-4">
                      <h5 className="font-medium text-green-600">Equity (65%)</h5>
                      <p className="text-sm text-gray-600">
                        Higher equity allocation suitable for your age (35) and long-term goals. 
                        Focus on large-cap and diversified funds for stability with growth potential.
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h5 className="font-medium text-blue-600">Debt (30%)</h5>
                      <p className="text-sm text-gray-600">
                        Reduced debt allocation provides stability and liquidity. 
                        Mix of short-term and medium-term debt funds for different goals.
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h5 className="font-medium text-purple-600">Alternatives (5%)</h5>
                      <p className="text-sm text-gray-600">
                        Small allocation to gold ETFs and REITs for diversification and inflation protection.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Implementation Strategy</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Gradually shift from debt to equity over 6 months</li>
                      <li>• Use STP (Systematic Transfer Plan) for smooth transition</li>
                      <li>• Monitor and rebalance quarterly</li>
                      <li>• Maintain +/- 5% threshold for rebalancing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Investment Strategy Tab */}
        <TabsContent value="strategy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Goal-Based Investment Strategy
              </CardTitle>
              <CardDescription>Detailed investment approach for each financial goal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockFinancialData.goals.map((goal, index) => {
                  const successProbability = goal.currentSaving >= goal.required * 0.8 ? 94 : 72;
                  
                  return (
                    <div key={index} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold text-lg">{goal.name}</h4>
                        <Badge className="bg-blue-100 text-blue-800">
                          Success Probability: {successProbability}%
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">Target Amount</p>
                              <p className="text-xl font-bold">{formatCurrency(goal.target, true)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Time Horizon</p>
                              <p className="text-xl font-bold">{goal.timeline} years</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Monthly investment</p>
                              <p className="text-xl font-bold">{formatCurrency(goal.required, true)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Expected Return</p>
                              <p className="text-xl font-bold">{goal.timeline > 10 ? '12%' : '9%'} CAGR</p>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h5 className="font-medium mb-2">Investment Mix</h5>
                            <div className="space-y-2">
                              {goal.timeline > 10 ? (
                                <>
                                  <div className="flex justify-between">
                                    <span>Equity Funds</span>
                                    <span className="font-bold">80%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Debt Funds</span>
                                    <span className="font-bold">20%</span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="flex justify-between">
                                    <span>Equity Funds</span>
                                    <span className="font-bold">60%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Debt Funds</span>
                                    <span className="font-bold">40%</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h5 className="font-medium">Recommended Funds</h5>
                          <div className="space-y-3">
                            <div className="border rounded p-3">
                              <p className="font-medium">ICICI Bluechip Fund (Direct)</p>
                              <p className="text-sm text-gray-600">Large Cap • Low Risk • ${(goal.required * 0.6).toLocaleString()}/month</p>
                              <p className="text-xs text-green-600">3-year return: 12.5% • Expense: 1.2%</p>
                            </div>
                            <div className="border rounded p-3">
                              <p className="font-medium">SBI Small Cap Fund (Direct)</p>
                              <p className="text-sm text-gray-600">Small Cap • High Risk • ${(goal.required * 0.2).toLocaleString()}/month</p>
                              <p className="text-xs text-green-600">3-year return: 15.2% • Expense: 1.8%</p>
                            </div>
                            <div className="border rounded p-3">
                              <p className="font-medium">HDFC Medium Term Debt Fund</p>
                              <p className="text-sm text-gray-600">Debt • Low Risk • ${(goal.required * 0.2).toLocaleString()}/month</p>
                              <p className="text-xs text-blue-600">3-year return: 7.8% • Expense: 0.9%</p>
                            </div>
                          </div>

                          <Alert>
                            <Info className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                              This strategy provides {successProbability}% probability of achieving your {goal.name} goal 
                              with the recommended monthly investment of {formatCurrency(goal.required, true)}.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Product Recommendations Tab */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Detailed Product Recommendations
              </CardTitle>
              <CardDescription>Specific financial products tailored to your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockFinancialData.productRecommendations.map((product, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{product.goal}</h4>
                        <p className="text-blue-600 font-medium">{product.product}</p>
                      </div>
                      <div className="text-right">
                        <Badge>{product.type}</Badge>
                        <p className="text-xl font-bold mt-1">{formatCurrency(product.amount, true)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div>
                        <h5 className="font-medium mb-2">Product Details</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Category</span>
                            <span>Large Cap Equity</span>
                          </div>
                          <div className="flex justify-between">
                            <span>AUM</span>
                            <span>$45,000 Cr</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Expense Ratio</span>
                            <span>1.2% p.a.</span>
                          </div>
                          <div className="flex justify-between">
                            <span>3-year Return</span>
                            <span className="text-green-600">12.5% CAGR</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Risk Level</span>
                            <span>Moderate</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Why Recommended</h5>
                        <p className="text-sm text-gray-600 mb-3">{product.rationale}</p>
                        <ul className="text-sm space-y-1">
                          <li>• Consistent track record over 10+ years</li>
                          <li>• Low expense ratio compared to peers</li>
                          <li>• Diversified portfolio across sectors</li>
                          <li>• Suitable for long-term wealth creation</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Risk Factors</h5>
                        <div className="space-y-2">
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                              <strong>Market Risk:</strong> Subject to equity market volatility
                            </AlertDescription>
                          </Alert>
                          <Alert>
                            <Info className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                              <strong>Concentration Risk:</strong> Large cap focus may limit upside
                            </AlertDescription>
                          </Alert>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-medium text-green-800 mb-2">Investment Process</h5>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-1">1</div>
                          <p>Open Account</p>
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-1">2</div>
                          <p>Complete KYC</p>
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-1">3</div>
                          <p>Setup investment</p>
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-1">4</div>
                          <p>Monitor Progress</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Planning Tab */}
        <TabsContent value="tax" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Comprehensive Tax Planning Strategy
              </CardTitle>
              <CardDescription>Optimize your tax liability through strategic planning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Current Tax Position</h4>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Gross Annual Income</span>
                        <span className="font-bold">{formatCurrency(mockFinancialData.taxPlanning.currentIncome, true)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxable Income</span>
                        <span className="font-bold">{formatCurrency(mockFinancialData.taxPlanning.taxableIncome, true)}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Current Tax Liability</span>
                        <span className="font-bold">{formatCurrency(mockFinancialData.taxPlanning.currentTax, true)}</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-semibold text-lg">Current Deductions</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Section 80C</span>
                      <span className="font-medium">{formatCurrency(mockFinancialData.taxPlanning.section80C, true)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Section 80D (Health Insurance)</span>
                      <span className="font-medium">{formatCurrency(mockFinancialData.taxPlanning.section80D, true)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Section 24(b) (Home Loan)</span>
                      <span className="font-medium">{formatCurrency(mockFinancialData.taxPlanning.section24b, true)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Tax Optimization Strategy</h4>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Potential Tax Savings</span>
                        <span className="font-bold text-green-600">{formatCurrency(mockFinancialData.taxPlanning.potentialSavings, true)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Optimized Tax Liability</span>
                        <span className="font-bold">{formatCurrency(mockFinancialData.taxPlanning.currentTax - mockFinancialData.taxPlanning.potentialSavings, true)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-medium">Recommended Actions</h5>
                    {mockFinancialData.taxPlanning.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">{suggestion}</p>
                          <p className="text-sm text-gray-600">
                            {index === 0 && "Increase from $1.5K to $1.5K limit"}
                            {index === 1 && "Enhance family coverage to $10L"}
                            {index === 2 && "Additional $50K deduction available"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Tax-Efficient Investment Plan</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-3 text-left">Investment</th>
                        <th className="border border-gray-300 p-3 text-center">Section</th>
                        <th className="border border-gray-300 p-3 text-center">Limit</th>
                        <th className="border border-gray-300 p-3 text-center">Current</th>
                        <th className="border border-gray-300 p-3 text-center">Recommended</th>
                        <th className="border border-gray-300 p-3 text-center">Tax Savings</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3">ELSS Mutual Funds</td>
                        <td className="border border-gray-300 p-3 text-center">80C</td>
                        <td className="border border-gray-300 p-3 text-center">$1.5L</td>
                        <td className="border border-gray-300 p-3 text-center">$1.2L</td>
                        <td className="border border-gray-300 p-3 text-center">$1.5L</td>
                        <td className="border border-gray-300 p-3 text-center text-green-600">$9,300</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">Health Insurance</td>
                        <td className="border border-gray-300 p-3 text-center">80D</td>
                        <td className="border border-gray-300 p-3 text-center">$25K</td>
                        <td className="border border-gray-300 p-3 text-center">$15K</td>
                        <td className="border border-gray-300 p-3 text-center">$25K</td>
                        <td className="border border-gray-300 p-3 text-center text-green-600">$3,100</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">NPS</td>
                        <td className="border border-gray-300 p-3 text-center">80CCD(1B)</td>
                        <td className="border border-gray-300 p-3 text-center">$50K</td>
                        <td className="border border-gray-300 p-3 text-center">$0</td>
                        <td className="border border-gray-300 p-3 text-center">$50K</td>
                        <td className="border border-gray-300 p-3 text-center text-green-600">$15,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Estate Planning Tab */}
        <TabsContent value="estate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Succession & Estate Planning
              </CardTitle>
              <CardDescription>Protect your family's financial future through proper estate planning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Current Status</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span>Will Documentation</span>
                      <Badge variant={mockFinancialData.estatePlanning.will ? "default" : "destructive"}>
                        {mockFinancialData.estatePlanning.will ? "Complete" : "Not Created"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium">Nomination Status</h5>
                      {Object.entries(mockFinancialData.estatePlanning.nominations).map(([key, status]) => (
                        <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <Badge variant={status === 'Complete' ? "default" : status === 'Partial' ? "secondary" : "destructive"}>
                            {status}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-medium">Succession Planning</h5>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>Guardianship for Minor</span>
                        <Badge variant="destructive">{mockFinancialData.estatePlanning.succession.guardianship}</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>Trust Setup</span>
                        <Badge variant="destructive">{mockFinancialData.estatePlanning.succession.trust}</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Immediate Actions Required</h4>
                  <div className="space-y-3">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Critical:</strong> No will exists. This could lead to legal complications for your family.
                      </AlertDescription>
                    </Alert>

                    <div className="border-l-4 border-red-500 pl-4">
                      <h5 className="font-medium text-red-600">High Priority</h5>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>• Create comprehensive will document</li>
                        <li>• Complete demat account nominations</li>
                        <li>• Define guardianship for minor child</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h5 className="font-medium text-yellow-600">Medium Priority</h5>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>• Update partial bank nominations</li>
                        <li>• Consider trust setup for child's education</li>
                        <li>• Create emergency contact list</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Will Creation Checklist</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h5 className="font-medium">Assets to Include</h5>
                    <div className="space-y-2">
                      {[
                        'Real Estate Properties',
                        'Bank Accounts & Fixed Deposits',
                        'Mutual Fund Investments',
                        'Stock Portfolio (Demat)',
                        'Insurance Policies',
                        'EPF/PPF Accounts',
                        'Gold & Other Valuables'
                      ].map((asset, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{asset}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-medium">Key Decisions</h5>
                    <div className="space-y-2">
                      {[
                        'Primary Beneficiaries',
                        'Alternate Beneficiaries',
                        'Executor Appointment',
                        'Guardian for Minor Child',
                        'Specific Bequests',
                        'Charitable Donations',
                        'Digital Assets Access'
                      ].map((decision, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">{decision}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Professional Advice:</strong> Consult with a qualified legal professional to ensure your will 
                    complies with applicable laws and adequately protects your family's interests.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Monitoring & Review Framework
              </CardTitle>
              <CardDescription>Systematic approach to track progress and maintain financial health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Review Schedule</h4>
                    <div className="space-y-3">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium">Monthly Review</h5>
                          <Badge>Required</Badge>
                        </div>
                        <ul className="text-sm space-y-1">
                          <li>• Portfolio performance tracking</li>
                          <li>• Budget vs actual spending</li>
                          <li>• investment payment confirmations</li>
                          <li>• Emergency fund status</li>
                        </ul>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium">Quarterly Review</h5>
                          <Badge variant="secondary">Important</Badge>
                        </div>
                        <ul className="text-sm space-y-1">
                          <li>• Goal progress assessment</li>
                          <li>• Asset allocation rebalancing</li>
                          <li>• Insurance coverage adequacy</li>
                          <li>• Tax planning adjustments</li>
                        </ul>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium">Annual Review</h5>
                          <Badge variant="destructive">Critical</Badge>
                        </div>
                        <ul className="text-sm space-y-1">
                          <li>• Complete financial health assessment</li>
                          <li>• Goal timeline and amount revisions</li>
                          <li>• Risk profile reassessment</li>
                          <li>• Estate planning updates</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Key Performance Indicators</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h5 className="font-medium mb-2">Portfolio Performance</h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-600">Current XIRR</p>
                            <p className="font-bold text-blue-600">8.8%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Target XIRR</p>
                            <p className="font-bold">12.0%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Benchmark</p>
                            <p className="font-bold">Nifty 50</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Alpha</p>
                            <p className="font-bold text-red-600">-1.2%</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg">
                        <h5 className="font-medium mb-2">Goal Achievement</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Goals on Track</span>
                            <span className="font-bold">1/4</span>
                          </div>
                          <Progress value={25} className="h-2" />
                          <p className="text-xs text-gray-600">Target: 80% goals on track</p>
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <h5 className="font-medium mb-2">Financial Health</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Current Score</span>
                            <span className="font-bold">{healthScore}/100</span>
                          </div>
                          <Progress value={healthScore} className="h-2" />
                          <p className="text-xs text-gray-600">Target: 85+ within 12 months</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Alert System & Triggers</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h5 className="font-medium">Market-Based Triggers</h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">Market Correction {'>'} 15%</span>
                          <Badge variant="destructive">High Priority</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">Portfolio Underperformance {'>'} 6 months</span>
                          <Badge variant="secondary">Medium Priority</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">Asset Allocation Drift {'>'} 10%</span>
                          <Badge>Low Priority</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-medium">Life Event Triggers</h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">Income Change {'>'} 25%</span>
                          <Badge variant="destructive">High Priority</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">Family Addition/Change</span>
                          <Badge variant="destructive">High Priority</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">Goal Timeline Change</span>
                          <Badge variant="secondary">Medium Priority</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Tools for Monitoring</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Portfolio Tracking</p>
                      <p>Consolidated account view via Account Aggregator</p>
                    </div>
                    <div>
                      <p className="font-medium">Performance Analysis</p>
                      <p>XIRR calculation and benchmark comparison</p>
                    </div>
                    <div>
                      <p className="font-medium">Goal Tracking</p>
                      <p>investment progress and target achievement status</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appendix Tab */}
        <TabsContent value="appendix" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Appendix & Supporting Documents
              </CardTitle>
              <CardDescription>Additional resources, calculations, and regulatory information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Risk Profile Questionnaire</h4>
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium">1. Investment Time Horizon</p>
                          <p className="text-sm text-blue-600">✓ Long-term (10+ years)</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">2. Risk Tolerance</p>
                          <p className="text-sm text-blue-600">✓ Moderate volatility acceptable</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">3. Investment Experience</p>
                          <p className="text-sm text-blue-600">✓ Intermediate level</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">4. Primary Investment Goal</p>
                          <p className="text-sm text-blue-600">✓ Wealth creation for long-term goals</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">5. Market Volatility Response</p>
                          <p className="text-sm text-blue-600">✓ Would continue investments during market downturns</p>
                        </div>
                      </div>
                      <div className="mt-4 p-2 bg-blue-100 rounded">
                        <p className="text-sm font-medium">Final Risk Score: 7/10 (Moderate Aggressive)</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">investment Growth Projections</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300 text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 p-2">Year</th>
                            <th className="border border-gray-300 p-2">Investment</th>
                            <th className="border border-gray-300 p-2">Value @12%</th>
                            <th className="border border-gray-300 p-2">Cumulative</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: 5 }, (_, i) => {
                            const year = i + 1;
                            const monthlyInvestment = 25000;
                            const totalInvested = monthlyInvestment * 12 * year;
                            const futureValue = monthlyInvestment * 12 * (((1 + 0.12) ** year - 1) / 0.12);
                            return (
                              <tr key={year}>
                                <td className="border border-gray-300 p-2 text-center">{year}</td>
                                <td className="border border-gray-300 p-2 text-center">{formatCurrency(totalInvested, true)}</td>
                                <td className="border border-gray-300 p-2 text-center">{formatCurrency(futureValue, true)}</td>
                                <td className="border border-gray-300 p-2 text-center">{formatCurrency(futureValue, true)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Regulatory Disclosures</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h5 className="font-medium">RBI-AA Compliance</h5>
                      <div className="text-sm space-y-2">
                        <p>• Data accessed through India's Account Aggregator framework</p>
                        <p>• All data processing complies with RBI Master Directions</p>
                        <p>• Data cached temporarily for session duration only</p>
                        <p>• Automatic data purging on logout or session expiry</p>
                        <p>• No permanent storage of financial data</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-medium">SEBI Guidelines</h5>
                      <div className="text-sm space-y-2">
                        <p>• DollarMento is not a SEBI registered investment advisor</p>
                        <p>• This report is for educational purposes only</p>
                        <p>• No investment advice provided - recommendations are educational</p>
                        <p>• Past performance does not guarantee future results</p>
                        <p>• Consult qualified advisors for investment decisions</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Financial Terms Glossary</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="border-l-4 border-blue-500 pl-3">
                        <p className="font-medium">CAGR</p>
                        <p className="text-sm text-gray-600">Compound Annual Growth Rate - measures annual growth rate</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-3">
                        <p className="font-medium">XIRR</p>
                        <p className="text-sm text-gray-600">Extended Internal Rate of Return - actual returns including timing</p>
                      </div>
                      <div className="border-l-4 border-yellow-500 pl-3">
                        <p className="font-medium">investment</p>
                        <p className="text-sm text-gray-600">Systematic Investment Plan - regular monthly investments</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-3">
                        <p className="font-medium">Asset Allocation</p>
                        <p className="text-sm text-gray-600">Distribution of investments across different asset classes</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="border-l-4 border-red-500 pl-3">
                        <p className="font-medium">Emergency Fund</p>
                        <p className="text-sm text-gray-600">6-12 months expenses in liquid investments</p>
                      </div>
                      <div className="border-l-4 border-indigo-500 pl-3">
                        <p className="font-medium">Term Insurance</p>
                        <p className="text-sm text-gray-600">Pure life cover without investment component</p>
                      </div>
                      <div className="border-l-4 border-pink-500 pl-3">
                        <p className="font-medium">Rebalancing</p>
                        <p className="text-sm text-gray-600">Adjusting portfolio to maintain target allocation</p>
                      </div>
                      <div className="border-l-4 border-cyan-500 pl-3">
                        <p className="font-medium">Risk Profile</p>
                        <p className="text-sm text-gray-600">Assessment of investor's risk tolerance and capacity</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Cash Flow Year-wise Tables */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Cash Flow Year-wise Tables</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-3 text-left">Year</th>
                          <th className="border border-gray-300 p-3 text-center">Age</th>
                          <th className="border border-gray-300 p-3 text-center">Annual Income</th>
                          <th className="border border-gray-300 p-3 text-center">Annual Expenses</th>
                          <th className="border border-gray-300 p-3 text-center">Investment Surplus</th>
                          <th className="border border-gray-300 p-3 text-center">Cumulative Wealth</th>
                          <th className="border border-gray-300 p-3 text-center">Financial Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = i + 1;
                          const age = mockFinancialData.personalInfo.age + year;
                          const income = mockFinancialData.income.annual * Math.pow(1.08, year);
                          const expenses = mockFinancialData.expenses.monthly * 12 * Math.pow(1.06, year);
                          const surplus = income - expenses;
                          const cumulativeWealth = surplus * year * 1.5; // Simplified calculation with growth
                          
                          return (
                            <tr key={year}>
                              <td className="border border-gray-300 p-3 text-center">{year}</td>
                              <td className="border border-gray-300 p-3 text-center">{age}</td>
                              <td className="border border-gray-300 p-3 text-center">{formatCurrency(income, true)}</td>
                              <td className="border border-gray-300 p-3 text-center">{formatCurrency(expenses, true)}</td>
                              <td className="border border-gray-300 p-3 text-center">
                                <span className={surplus > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                                  {formatCurrency(surplus, true)}
                                </span>
                              </td>
                              <td className="border border-gray-300 p-3 text-center">{formatCurrency(cumulativeWealth, true)}</td>
                              <td className="border border-gray-300 p-3 text-center">
                                <Badge variant={surplus > 0 ? "default" : "destructive"}>
                                  {surplus > 0 ? 'Building Wealth' : 'Deficit'}
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <Separator />

                {/* Detailed Goal Projection Graphs Data */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Detailed Goal Projection Graphs</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {mockFinancialData.goals.slice(0, 2).map((goal, index) => (
                      <div key={index} className="space-y-3">
                        <h5 className="font-medium">{goal.name} - Growth Projection</h5>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={Array.from({ length: goal.timeline + 1 }, (_, year) => {
                              const invested = goal.required * 12 * year;
                              const value = year === 0 ? 0 : goal.required * 12 * (((1 + 0.12) ** year - 1) / 0.12);
                              return { year, invested, value, target: goal.target };
                            })}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="year" />
                              <YAxis />
                              <Tooltip formatter={(value) => formatCurrency(Number(value), true)} />
                              <Legend />
                              <Line type="monotone" dataKey="invested" stroke="#3B82F6" name="Invested" />
                              <Line type="monotone" dataKey="value" stroke="#10B981" name="Projected" />
                              <Line type="monotone" dataKey="target" stroke="#EF4444" strokeDasharray="5 5" name="Target" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Product Factsheets */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Product Factsheets</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {mockFinancialData.productRecommendations.map((product, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h5 className="font-medium text-blue-600 mb-3">{product.product}</h5>
                        
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="p-2 bg-gray-50 rounded">
                              <p className="text-gray-600">Category</p>
                              <p className="font-medium">Large Cap Equity</p>
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                              <p className="text-gray-600">Risk Level</p>
                              <p className="font-medium">Moderate</p>
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                              <p className="text-gray-600">AUM</p>
                              <p className="font-medium">$45,000 Cr</p>
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                              <p className="text-gray-600">Expense Ratio</p>
                              <p className="font-medium">1.2% p.a.</p>
                            </div>
                            <div className="p-2 bg-green-50 rounded">
                              <p className="text-gray-600">3Y Return</p>
                              <p className="font-medium text-green-600">12.5%</p>
                            </div>
                            <div className="p-2 bg-blue-50 rounded">
                              <p className="text-gray-600">Rating</p>
                              <p className="font-medium text-blue-600">4.5★</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h6 className="font-medium">Key Features</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Diversified large-cap portfolio</li>
                              <li>• Low expense ratio compared to peers</li>
                              <li>• Consistent long-term performance</li>
                              <li>• Suitable for systematic investing</li>
                            </ul>
                          </div>

                          <div className="p-3 bg-yellow-50 rounded">
                            <h6 className="font-medium text-yellow-700">Investment Thesis</h6>
                            <p className="text-sm">{product.rationale}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Report Preparation Details</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Prepared By</p>
                      <p>DollarMento Financial Analysis Engine</p>
                    </div>
                    <div>
                      <p className="font-medium">Report Date</p>
                      <p>{new Date().toLocaleDateString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="font-medium">Version</p>
                      <p>1.0 - Comprehensive Analysis</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Implementation Tab */}
        <TabsContent value="implementation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Implementation Roadmap & Monitoring
              </CardTitle>
              <CardDescription>Step-by-step action plan with timelines and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-red-600">Immediate (Week 1-2)</h4>
                    <div className="space-y-3">
                      {[
                        { action: 'Buy Term Plan $1 Cr', deadline: 'Within 15 days', status: 'Pending' },
                        { action: 'Top-Up Health Cover $5L', deadline: 'Within 7 days', status: 'Pending' },
                        { action: 'Start Emergency Fund $8L', deadline: 'Immediate', status: 'Pending' }
                      ].map((item, index) => (
                        <div key={index} className="border rounded p-3">
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-medium text-sm">{item.action}</p>
                            <Badge variant="destructive">{item.status}</Badge>
                          </div>
                          <p className="text-xs text-gray-600">{item.deadline}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-yellow-600">Short-term (Month 1-3)</h4>
                    <div className="space-y-3">
                      {[
                        { action: 'Initiate investments for Goals', deadline: 'Within 10 days', status: 'Pending' },
                        { action: 'Invest Debt Allocation $15L', deadline: 'Within 1 month', status: 'Pending' },
                        { action: 'Create Will & Nominations', deadline: 'Within 2 months', status: 'Pending' }
                      ].map((item, index) => (
                        <div key={index} className="border rounded p-3">
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-medium text-sm">{item.action}</p>
                            <Badge variant="secondary">{item.status}</Badge>
                          </div>
                          <p className="text-xs text-gray-600">{item.deadline}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-green-600">Long-term (3-12 months)</h4>
                    <div className="space-y-3">
                      {[
                        { action: 'Portfolio Rebalancing', deadline: 'Quarterly', status: 'Ongoing' },
                        { action: 'Tax Planning Review', deadline: 'Annual', status: 'Scheduled' },
                        { action: 'Goal Progress Review', deadline: 'Half-yearly', status: 'Scheduled' }
                      ].map((item, index) => (
                        <div key={index} className="border rounded p-3">
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-medium text-sm">{item.action}</p>
                            <Badge>{item.status}</Badge>
                          </div>
                          <p className="text-xs text-gray-600">{item.deadline}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Monitoring & Review Framework</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h5 className="font-medium">Review Frequency</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span>Portfolio Performance</span>
                          <Badge>Monthly</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span>Goal Progress</span>
                          <Badge>Quarterly</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span>Asset Allocation</span>
                          <Badge>Half-yearly</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span>Complete Review</span>
                          <Badge>Annual</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-medium">Key Triggers for Review</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <span>Market correction {'>'} 15%</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <span>Major life event (job change, inheritance)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <span>Income change {'>'} 20%</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <span>Goal timeline changes</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Educational Recommendations
              </CardTitle>
              <CardDescription>Non-advisory educational insights to improve your financial health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-600 mb-2">Immediate Actions Required</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Emergency Fund:</strong> Build $8.5K emergency fund covering 6 months of expenses</li>
                    <li>• <strong>Life Insurance:</strong> Increase coverage to $1 Crore for family protection</li>
                    <li>• <strong>Health Insurance:</strong> Enhance to $10K for medical emergencies</li>
                  </ul>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-yellow-600 mb-2">Short-term Improvements (3-12 months)</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Asset Rebalancing:</strong> Increase equity to 65% of investment portfolio</li>
                    <li>• <strong>Goal Funding:</strong> Increase investment amounts to meet goal requirements</li>
                    <li>• <strong>Debt Optimization:</strong> Consider prepaying high-interest loans</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-600 mb-2">Long-term Strategies (1-5 years)</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Retirement Planning:</strong> Increase retirement corpus target with inflation</li>
                    <li>• <strong>Tax Optimization:</strong> Utilize all available tax-saving instruments</li>
                    <li>• <strong>Estate Planning:</strong> Create will and nomination updates</li>
                  </ul>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Educational Note:</strong> These are general financial education principles. 
                    Always consult with SEBI registered investment advisors for personalized advice.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Action Plan Tab */}
        <TabsContent value="action" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                90-Day Action Plan
              </CardTitle>
              <CardDescription>Prioritized steps to improve your financial health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4 bg-red-50">
                  <h4 className="font-semibold text-red-600 mb-3">Week 1-2: Emergency Actions</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-xs font-bold text-red-600">1</div>
                      <div>
                        <p className="font-medium">Open Emergency Fund Account</p>
                        <p className="text-sm text-gray-600">Start with liquid fund or high-yield savings account</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-xs font-bold text-red-600">2</div>
                      <div>
                        <p className="font-medium">Research Term Life Insurance</p>
                        <p className="text-sm text-gray-600">Compare online term plans for $1 Crore coverage</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-yellow-50">
                  <h4 className="font-semibold text-yellow-600 mb-3">Week 3-6: Foundation Building</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-xs font-bold text-yellow-600">3</div>
                      <div>
                        <p className="font-medium">Purchase Term & Health Insurance</p>
                        <p className="text-sm text-gray-600">Complete applications and medical tests if required</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-xs font-bold text-yellow-600">4</div>
                      <div>
                        <p className="font-medium">Start Emergency Fund investment</p>
                        <p className="text-sm text-gray-600">Set up automatic monthly transfer of $70,000</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-blue-50">
                  <h4 className="font-semibold text-blue-600 mb-3">Week 7-12: Portfolio Optimization</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">5</div>
                      <div>
                        <p className="font-medium">Rebalance Investment Portfolio</p>
                        <p className="text-sm text-gray-600">Increase equity allocation to 65% gradually</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">6</div>
                      <div>
                        <p className="font-medium">Increase Goal-based investments</p>
                        <p className="text-sm text-gray-600">Adjust investment amounts to meet target requirements</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Progress Tracking:</strong> Review this action plan monthly and adjust based on your progress. 
                    Consider working with a qualified financial advisor for complex decisions.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Disclaimer */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-gray-900">Important Disclaimers</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• This report is for educational purposes only and does not constitute financial advice</p>
              <p>• DollarMento is not a SEBI registered investment advisor</p>
              <p>• Past performance does not guarantee future results</p>
              <p>• Please consult qualified financial professionals before making investment decisions</p>
              <p>• All calculations are based on assumptions and may vary with actual market conditions</p>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Generated on {new Date().toLocaleDateString('en-IN')} | 
              Report Version 1.0 | 
              Compliant with RBI-AA Guidelines
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
}