import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Slider } from "../components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

import { Helmet } from 'react-helmet';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, LineChart, Line } from 'recharts';
import { ArrowLeft, Save, Plus, Minus, DollarSign, TrendingUp, Calculator, Info, CheckCircle, MapPin, Calendar, Target, PieChart as PieChartIcon, FileText, Settings, Lightbulb } from 'lucide-react';

interface RetirementData {
  currentAge: number;
  retirementAge: number;
  currentBalance: number;
  annualSalary: number;
  salaryIncrease: number;
  employeeContribution: number;
  employerMatch: number;
  employerMatchType: 'fixed' | 'tiered' | 'capped';
  expectedReturn: number;
  inflationRate: number;
  retirementTaxRate: number;
  contributionType: 'traditional' | 'roth';
  socialSecurityIncluded: boolean;
  socialSecurityAmount: number;
  currentState: string;
  retirementState: string;
  catchUpEnabled: boolean;
}

interface ProjectionData {
  year: number;
  age: number;
  salary: number;
  employeeContribution: number;
  employerContribution: number;
  totalContribution: number;
  balance: number;
  inflationAdjustedBalance: number;
}

// US States with retirement tax rates
const US_STATES = [
  { name: 'Alabama', taxRate: 5, noRetirementTax: false },
  { name: 'Alaska', taxRate: 0, noRetirementTax: true },
  { name: 'Arizona', taxRate: 4.5, noRetirementTax: false },
  { name: 'Arkansas', taxRate: 6.9, noRetirementTax: false },
  { name: 'California', taxRate: 13.3, noRetirementTax: false },
  { name: 'Colorado', taxRate: 4.4, noRetirementTax: false },
  { name: 'Connecticut', taxRate: 6.99, noRetirementTax: false },
  { name: 'Delaware', taxRate: 6.6, noRetirementTax: false },
  { name: 'Florida', taxRate: 0, noRetirementTax: true },
  { name: 'Georgia', taxRate: 5.75, noRetirementTax: false },
  { name: 'Hawaii', taxRate: 11, noRetirementTax: false },
  { name: 'Idaho', taxRate: 6.5, noRetirementTax: false },
  { name: 'Illinois', taxRate: 4.95, noRetirementTax: false },
  { name: 'Indiana', taxRate: 3.23, noRetirementTax: false },
  { name: 'Iowa', taxRate: 8.53, noRetirementTax: false },
  { name: 'Kansas', taxRate: 5.7, noRetirementTax: false },
  { name: 'Kentucky', taxRate: 5, noRetirementTax: false },
  { name: 'Louisiana', taxRate: 6, noRetirementTax: false },
  { name: 'Maine', taxRate: 7.15, noRetirementTax: false },
  { name: 'Maryland', taxRate: 5.75, noRetirementTax: false },
  { name: 'Massachusetts', taxRate: 5, noRetirementTax: false },
  { name: 'Michigan', taxRate: 4.25, noRetirementTax: false },
  { name: 'Minnesota', taxRate: 9.85, noRetirementTax: false },
  { name: 'Mississippi', taxRate: 5, noRetirementTax: false },
  { name: 'Missouri', taxRate: 5.4, noRetirementTax: false },
  { name: 'Montana', taxRate: 6.9, noRetirementTax: false },
  { name: 'Nebraska', taxRate: 6.84, noRetirementTax: false },
  { name: 'Nevada', taxRate: 0, noRetirementTax: true },
  { name: 'New Hampshire', taxRate: 0, noRetirementTax: true },
  { name: 'New Jersey', taxRate: 10.75, noRetirementTax: false },
  { name: 'New Mexico', taxRate: 5.9, noRetirementTax: false },
  { name: 'New York', taxRate: 10.9, noRetirementTax: false },
  { name: 'North Carolina', taxRate: 4.99, noRetirementTax: false },
  { name: 'North Dakota', taxRate: 2.9, noRetirementTax: false },
  { name: 'Ohio', taxRate: 3.99, noRetirementTax: false },
  { name: 'Oklahoma', taxRate: 5, noRetirementTax: false },
  { name: 'Oregon', taxRate: 9.9, noRetirementTax: false },
  { name: 'Pennsylvania', taxRate: 3.07, noRetirementTax: false },
  { name: 'Rhode Island', taxRate: 5.99, noRetirementTax: false },
  { name: 'South Carolina', taxRate: 7, noRetirementTax: false },
  { name: 'South Dakota', taxRate: 0, noRetirementTax: true },
  { name: 'Tennessee', taxRate: 0, noRetirementTax: true },
  { name: 'Texas', taxRate: 0, noRetirementTax: true },
  { name: 'Utah', taxRate: 4.95, noRetirementTax: false },
  { name: 'Vermont', taxRate: 8.75, noRetirementTax: false },
  { name: 'Virginia', taxRate: 5.75, noRetirementTax: false },
  { name: 'Washington', taxRate: 0, noRetirementTax: true },
  { name: 'West Virginia', taxRate: 6.5, noRetirementTax: false },
  { name: 'Wisconsin', taxRate: 7.65, noRetirementTax: false },
  { name: 'Wyoming', taxRate: 0, noRetirementTax: true }
];

export default function Calculator401k() {
  const [retirement, setRetirement] = useState<RetirementData>({
    currentAge: 30,
    retirementAge: 65,
    currentBalance: 25000,
    annualSalary: 75000,
    salaryIncrease: 3,
    employeeContribution: 10,
    employerMatch: 5,
    employerMatchType: 'fixed',
    expectedReturn: 7,
    inflationRate: 2.5,
    retirementTaxRate: 22,
    contributionType: 'traditional',
    socialSecurityIncluded: true,
    socialSecurityAmount: 2000,
    currentState: 'Texas',
    retirementState: 'Texas',
    catchUpEnabled: false
  });

  const [activeTab, setActiveTab] = useState("calculator");
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Auto-enable catch-up contributions for age 50+
  const catchUpEnabled = retirement.currentAge >= 50;

  // Get state-specific data
  const getCurrentStateData = () => US_STATES.find(s => s.name === retirement.currentState) || US_STATES[42]; // Default to Texas
  const getRetirementStateData = () => US_STATES.find(s => s.name === retirement.retirementState) || US_STATES[42];

  // Smart geo-specific nudges
  const getGeoSpecificNudges = () => {
    const currentState = getCurrentStateData();
    const retirementState = getRetirementStateData();
    const nudges: Array<{icon: string, title: string, description: string}> = [];
    
    // State-specific tax nudge
    if (currentState.noRetirementTax || currentState.taxRate === 0) {
      nudges.push({
        icon: "🏛️",
        title: `${retirement.currentState} Tax Advantage`,
        description: `In ${retirement.currentState}, you pay no state income tax—Roth contributions might benefit you more since you're already in a low-tax environment.`
      });
    } else if (currentState.taxRate >= 10) {
      nudges.push({
        icon: "🧾", 
        title: "High Tax State Strategy",
        description: `${retirement.currentState} has high retirement taxes (${currentState.taxRate}%). Consider Traditional 401(k) if you plan to relocate to a tax-friendly state later.`
      });
    }
    
    // Employer match nudge
    if (retirement.employerMatch > 0) {
      const annualMatch = (retirement.annualSalary * retirement.employerMatch / 100);
      nudges.push({
        icon: "💼",
        title: "Free Money Alert",
        description: `Your employer's match policy is worth ${formatCurrency(annualMatch)}/year — that's essentially a ${retirement.employerMatch}% raise on your contributions.`
      });
    }
    
    // Retirement state relocation nudge
    if (retirement.retirementState !== retirement.currentState) {
      const retirementStateData = getRetirementStateData();
      if (retirementStateData.noRetirementTax || retirementStateData.taxRate === 0) {
        nudges.push({
          icon: "🏖️",
          title: "Smart Retirement Location",
          description: `Planning to retire in ${retirement.retirementState}? Excellent choice: no state income tax means more of your 401(k) stays in your pocket.`
        });
      }
    }
    
    // Inflation protection nudge
    if (retirement.expectedReturn <= retirement.inflationRate + 2) {
      nudges.push({
        icon: "📉",
        title: "Inflation Risk Warning",
        description: `With ${retirement.expectedReturn}% returns vs ${retirement.inflationRate}% inflation, your purchasing power could decline. Consider more aggressive investments.`
      });
    }
    
    // Age-specific catch-up nudge
    if (retirement.currentAge >= 47 && retirement.currentAge < 50) {
      nudges.push({
        icon: "⏰",
        title: "Catch-Up Contributions Coming",
        description: `You're ${50 - retirement.currentAge} years from catch-up eligibility. At 50, you can contribute an extra $7,500/year ($31,000 total limit).`
      });
    }
    
    return nudges.slice(0, 3); // Show max 3 nudges to avoid overwhelming
  };

  // 2025 IRS Contribution Limits
  const IRS_LIMITS = {
    regularContribution: 23500,
    catchUpContribution: 7500,
    totalLimit: 31000 // For 50+
  };

  const updateValue = (field: keyof RetirementData, value: number | string | boolean) => {
    setRetirement(prev => ({ ...prev, [field]: value }));
  };

  // Calculate annual projections with state-specific considerations
  const projections = useMemo(() => {
    const years = retirement.retirementAge - retirement.currentAge;
    const projectionData: ProjectionData[] = [];
    
    let currentBalance = retirement.currentBalance;
    let currentSalary = retirement.annualSalary;
    
    for (let i = 0; i <= years; i++) {
      const age = retirement.currentAge + i;
      const isCatchUpEligible = age >= 50;
      
      // Enhanced contribution calculation with catch-up
      const regularLimit = IRS_LIMITS.regularContribution;
      const catchUpLimit = isCatchUpEligible ? IRS_LIMITS.catchUpContribution : 0;
      const totalLimit = regularLimit + catchUpLimit;
      
      const employeeContrib = Math.min(
        (currentSalary * retirement.employeeContribution / 100),
        totalLimit
      );
      
      // Enhanced employer match calculation
      let employerContrib = 0;
      if (retirement.employerMatchType === 'fixed') {
        employerContrib = Math.min(
          currentSalary * retirement.employerMatch / 100,
          employeeContrib
        );
      } else if (retirement.employerMatchType === 'tiered') {
        // Tiered matching: 100% on first 3%, 50% on next 2%
        const firstTier = Math.min(employeeContrib, currentSalary * 0.03);
        const secondTier = Math.min(Math.max(employeeContrib - currentSalary * 0.03, 0), currentSalary * 0.02);
        employerContrib = firstTier + (secondTier * 0.5);
      } else if (retirement.employerMatchType === 'capped') {
        // Capped at specific dollar amount
        employerContrib = Math.min(
          currentSalary * retirement.employerMatch / 100,
          3000 // $3,000 cap
        );
      }
      
      const totalContrib = employeeContrib + employerContrib;
      
      currentBalance = currentBalance * (1 + retirement.expectedReturn / 100) + totalContrib;
      const inflationAdjustedBalance = currentBalance / Math.pow(1 + retirement.inflationRate / 100, i);
      
      projectionData.push({
        year: new Date().getFullYear() + i,
        age,
        salary: currentSalary,
        employeeContribution: employeeContrib,
        employerContribution: employerContrib,
        totalContribution: totalContrib,
        balance: currentBalance,
        inflationAdjustedBalance
      });
      
      if (i < years) {
        currentSalary *= (1 + retirement.salaryIncrease / 100);
      }
    }
    
    return projectionData;
  }, [retirement, catchUpEnabled]);

  // Calculate summary statistics with state-specific considerations
  const summaryStats = useMemo(() => {
    const finalProjection = projections[projections.length - 1];
    const totalEmployeeContributions = projections.reduce((sum, p) => sum + p.employeeContribution, 0);
    const totalEmployerContributions = projections.reduce((sum, p) => sum + p.employerContribution, 0);
    const totalContributions = totalEmployeeContributions + totalEmployerContributions;
    
    // State-specific tax calculations
    const retirementStateData = getRetirementStateData();
    const federalTaxRate = retirement.retirementTaxRate / 100;
    const stateTaxRate = retirementStateData.taxRate / 100;
    
    const federalTaxOwed = retirement.contributionType === 'traditional' 
      ? (finalProjection?.balance || 0) * federalTaxRate : 0;
    const stateTaxOwed = retirement.contributionType === 'traditional' 
      ? (finalProjection?.balance || 0) * stateTaxRate : 0;
    

    const totalTaxOwed = federalTaxOwed + stateTaxOwed;
    
    const netAfterTax = (finalProjection?.balance || 0) - totalTaxOwed;
    const monthlyWithdrawal = (netAfterTax * 0.04) / 12; // 4% rule
    const inflationAdjustedWithdrawal = monthlyWithdrawal / Math.pow(1 + retirement.inflationRate / 100, retirement.retirementAge - retirement.currentAge);
    
    // Social Security calculation (simplified)
    const socialSecurityMonthly = retirement.socialSecurityIncluded ? 
      (retirement.annualSalary > 0 ? Math.min(3500, retirement.annualSalary * 0.0015) : retirement.socialSecurityAmount) : 0;
    
    return {
      futureValue: finalProjection?.balance || 0,
      inflationAdjustedValue: finalProjection?.inflationAdjustedBalance || 0,
      totalContributions,
      totalEmployeeContributions,
      totalEmployerContributions,
      federalTaxOwed,
      stateTaxOwed,
      totalTaxOwed,
      netAfterTax,
      monthlyWithdrawal,
      inflationAdjustedWithdrawal,
      employerMatchValue: totalEmployerContributions,
      socialSecurityMonthly,
      totalMonthlyRetirement: monthlyWithdrawal + socialSecurityMonthly
    };
  }, [projections, retirement, getRetirementStateData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Chart data for different visualizations
  const growthChartData = projections.map((p, index) => {
    // Calculate cumulative contributions up to this year
    const cumulativeEmployeeContributions = projections.slice(0, index + 1)
      .reduce((sum, proj) => sum + proj.employeeContribution, 0);
    const cumulativeEmployerContributions = projections.slice(0, index + 1)
      .reduce((sum, proj) => sum + proj.employerContribution, 0);
    
    const totalContributions = cumulativeEmployeeContributions + cumulativeEmployerContributions;
    const investmentGrowth = Math.max(0, p.balance - totalContributions);
    
    return {
      year: p.year,
      age: p.age,
      'Employee Contributions': cumulativeEmployeeContributions,
      'Employer Contributions': cumulativeEmployerContributions,
      'Investment Growth': investmentGrowth
    };
  });

  const contributionBreakdownData = [
    { name: 'Employee Contributions', value: summaryStats.totalEmployeeContributions, color: '#3B82F6' },
    { name: 'Employer Match', value: summaryStats.totalEmployerContributions, color: '#10B981' },
    { name: 'Investment Growth', value: summaryStats.futureValue - summaryStats.totalContributions, color: '#F59E0B' }
  ];

  const rothVsTraditionalData = [
    {
      type: 'Traditional 401(k)',
      grossAmount: summaryStats.futureValue,
      taxOwed: summaryStats.federalTaxOwed + summaryStats.stateTaxOwed,
      netAmount: summaryStats.netAfterTax
    },
    {
      type: 'Roth 401(k)',
      grossAmount: summaryStats.futureValue,
      taxOwed: 0,
      netAmount: summaryStats.futureValue
    }
  ];

  const benefits = [
    { icon: CheckCircle, title: "Employer Matching", desc: "Free money up to company match limit", value: formatCurrency(summaryStats.employerMatchValue) },
    { icon: CheckCircle, title: "Tax-Deferred Growth", desc: "No taxes on gains until withdrawal", value: "Tax Savings" },
    { icon: CheckCircle, title: "High Contribution Limits", desc: `Up to ${formatCurrency(IRS_LIMITS.regularContribution)} annually`, value: "Current Limit" },
    { icon: CheckCircle, title: "Compound Interest", desc: "Exponential growth over time", value: `${retirement.expectedReturn}% Return` },
    { icon: CheckCircle, title: "Catch-Up Contributions", desc: "Extra $7,500 after age 50", value: "Age 50+" },
    { icon: CheckCircle, title: "Low Expense Ratios", desc: "Institutional-grade investment options", value: "Cost Effective" }
  ];



  return (
    <>
      <Helmet>
        <title>401(k) Calculator - Ultimate USA Retirement Planner | DollarMento</title>
        <meta name="description" content="Free 401k calculator with employer match, state tax optimization, and retirement projections. Plan your 401k contributions for maximum growth. Compare traditional vs Roth options." />
        <meta name="keywords" content="401k calculator, retirement calculator, 401k planner, employer match calculator, roth 401k calculator, traditional 401k, retirement planning, retirement savings calculator, 401k growth calculator, 401k contribution calculator, retirement fund calculator, pension calculator, retirement income calculator, 401k projection calculator, 401k retirement planner, retirement savings planner, 401k estimator, retirement planning calculator, 401k investment calculator, retirement calculator usa" />
        <link rel="canonical" href="https://dollarmento.com/401k-calculator" />
        
        {/* Override any fallback meta tags */}
        <meta key="title" property="title" content="401(k) Calculator - Ultimate USA Retirement Planner | DollarMento" />
        <meta key="description" name="description" content="Free 401k calculator with employer match, state tax optimization, and retirement projections. Plan your 401k contributions for maximum growth. Compare traditional vs Roth options." />
        
        {/* Open Graph for better sharing - with keys for uniqueness */}
        <meta key="og:title" property="og:title" content="401(k) Calculator - Ultimate USA Retirement Planner" />
        <meta key="og:description" property="og:description" content="Calculate your 401k retirement savings with employer match, tax optimization, and state-specific projections. Free comprehensive retirement planning tool." />
        <meta key="og:url" property="og:url" content="https://dollarmento.com/401k-calculator" />
        <meta key="og:site_name" property="og:site_name" content="DollarMento" />
        <meta key="og:locale" property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://dollarmento.com/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="401k Calculator - Plan Your Retirement Savings" />
        <meta property="og:site_name" content="DollarMento" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dollarmento" />
        <meta name="twitter:title" content="401(k) Calculator - Plan Your Retirement" />
        <meta name="twitter:description" content="Free 401k calculator with employer match, tax optimization, and retirement projections. Start planning your retirement today!" />
        <meta name="twitter:image" content="https://dollarmento.com/logo.png" />
        <meta name="twitter:url" content="https://dollarmento.com/401k-calculator" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "401(k) Calculator",
            "description": "Free 401k retirement calculator with employer match, tax optimization, and state-specific projections",
            "url": "https://dollarmento.com/401k-calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "provider": {
              "@type": "Organization",
              "name": "DollarMento",
              "url": "https://dollarmento.com"
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-gray-50 font-inter">
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="w-full px-4 py-4">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to All Calculators</span>
            </button>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 font-inter">
                  401(k) Calculator
                </h1>
                <p className="text-gray-600 font-inter font-normal">Ultimate USA Retirement Planner</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-2 lg:px-4 py-4 lg:py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 lg:gap-6">
          {/* Left Panel - Input Controls */}
          <div className="xl:col-span-1 space-y-3 lg:space-y-4">
            {/* Basic Information */}
            <Card className="border border-blue-100 shadow-lg">
              <CardHeader className="pb-2 lg:pb-3">
                <CardTitle className="text-base lg:text-lg font-semibold text-gray-900 flex items-center gap-2 font-inter">
                  <DollarSign className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 lg:space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 font-inter">Current Age</Label>
                  <Input 
                    type="text"
                    inputMode="numeric"
                    value={retirement.currentAge.toString()}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      if (value === '') {
                        updateValue('currentAge', 18);
                        return;
                      }
                      const numValue = parseInt(value);
                      if (numValue >= 18 && numValue <= 70) {
                        updateValue('currentAge', numValue);
                        // Auto-adjust retirement age if it becomes invalid
                        if (retirement.retirementAge <= numValue) {
                          updateValue('retirementAge', Math.min(70, numValue + 1));
                        }
                      }
                    }}
                    className="mt-1"
                    placeholder="30"
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">Retirement Age</Label>
                  <Input 
                    type="text"
                    inputMode="numeric"
                    value={retirement.retirementAge.toString()}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      if (value === '') {
                        updateValue('retirementAge', Math.max(65, retirement.currentAge + 1));
                        return;
                      }
                      const numValue = parseInt(value);
                      if (numValue >= 55 && numValue <= 70) {
                        updateValue('retirementAge', numValue);
                      }
                    }}
                    className={`mt-1 ${retirement.retirementAge <= retirement.currentAge ? 'border-red-500' : ''}`}
                    placeholder="65"
                  />
                  {retirement.retirementAge <= retirement.currentAge && (
                    <p className="text-red-500 text-xs mt-1">
                      Retirement age must be greater than current age
                    </p>
                  )}
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">Current 401(k) Balance</Label>
                  <Input 
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={retirement.currentBalance === 0 ? '' : retirement.currentBalance.toString()}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      updateValue('currentBalance', value === '' ? 0 : parseInt(value) || 0);
                    }}
                    className="mt-1"
                    placeholder="25000"
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">Annual Salary</Label>
                  <Input 
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={retirement.annualSalary === 0 ? '' : retirement.annualSalary.toString()}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      updateValue('annualSalary', value === '' ? 0 : parseInt(value) || 0);
                    }}
                    className="mt-1"
                    placeholder="75000"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contribution Settings */}
            <Card className="border border-green-100 shadow-lg">
              <CardHeader className="pb-2 lg:pb-3">
                <CardTitle className="text-base lg:text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                  Contribution Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 lg:space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium text-gray-700">Employee Contribution</Label>
                    <span className="text-lg font-bold text-green-600">{retirement.employeeContribution}%</span>
                  </div>
                  <Slider
                    value={[retirement.employeeContribution]}
                    onValueChange={([value]) => updateValue('employeeContribution', value)}
                    max={25}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>25</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium text-gray-700">Employer Match</Label>
                    <span className="text-lg font-bold text-blue-600">{retirement.employerMatch}%</span>
                  </div>
                  <Slider
                    value={[retirement.employerMatch]}
                    onValueChange={([value]) => updateValue('employerMatch', value)}
                    max={10}
                    min={0}
                    step={0.25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>10</span>
                  </div>
                  
                  {/* Dynamic Employer Match Note */}
                  {retirement.employerMatch > 0 && retirement.employeeContribution < retirement.employerMatch && (
                    <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-white font-bold">💡</span>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-medium text-blue-700">Note:</span> To get the maximum benefit, increase your contribution to at least{' '}
                          <span className="font-bold text-green-600">{retirement.employerMatch}%</span>{' '}
                          to fully match your employer's contribution.
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium text-gray-700">Annual Salary Increase</Label>
                    <span className="text-lg font-bold text-purple-600">{retirement.salaryIncrease}%</span>
                  </div>
                  <Slider
                    value={[retirement.salaryIncrease]}
                    onValueChange={([value]) => updateValue('salaryIncrease', value)}
                    max={10}
                    min={0}
                    step={0.25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>10</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Employer Match Type</Label>
                  <Select value={retirement.employerMatchType} onValueChange={(value) => updateValue('employerMatchType', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Percentage</SelectItem>
                      <SelectItem value="tiered">Tiered Match</SelectItem>
                      <SelectItem value="capped">Dollar Cap</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Contribution Type</Label>
                  <Select value={retirement.contributionType} onValueChange={(value) => updateValue('contributionType', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="traditional">Traditional 401(k)</SelectItem>
                      <SelectItem value="roth">Roth 401(k)</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="mt-2 p-2 bg-gray-50 rounded-md text-xs text-gray-600">
                    {retirement.contributionType === 'traditional' ? (
                      <span><strong>Traditional 401(k):</strong> Contributions are made with pre-tax dollars, reducing your current taxable income. You'll pay taxes when you withdraw in retirement.</span>
                    ) : (
                      <span><strong>Roth 401(k):</strong> Contributions are made with after-tax dollars. Your money grows tax-free and withdrawals in retirement are tax-free.</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* State Settings */}
            <Card className="border border-orange-100 shadow-lg">
              <CardHeader className="pb-2 lg:pb-3">
                <CardTitle className="text-base lg:text-lg font-semibold text-gray-900 flex items-center gap-2">
                  🗺️ Location Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 lg:space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Current State</Label>
                  <Select value={retirement.currentState} onValueChange={(value) => updateValue('currentState', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((state) => (
                        <SelectItem key={state.name} value={state.name}>
                          {state.name} {state.noRetirementTax ? '(No Tax)' : `(${state.taxRate}%)`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">Retirement State</Label>
                  <Select value={retirement.retirementState} onValueChange={(value) => updateValue('retirementState', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((state) => (
                        <SelectItem key={state.name} value={state.name}>
                          {state.name} {state.noRetirementTax ? '(No Tax)' : `(${state.taxRate}%)`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Geo-aware nudge */}
                <div className="mt-3 p-3 bg-blue-50 rounded-md border border-blue-200">
                  <div className="text-xs font-medium text-blue-800 mb-1">💡 State-Specific Insight</div>
                  <div className="text-xs text-blue-700">
                    {getCurrentStateData().noRetirementTax || getCurrentStateData().taxRate === 0 
                      ? `${retirement.currentState} has no state income tax—consider Roth contributions for maximum tax-free growth.`
                      : `${retirement.currentState} taxes retirement income at ${getCurrentStateData().taxRate}%. Consider your long-term state residency plans.`
                    }
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Settings */}
            <Card className="border border-purple-100 shadow-lg">
              <CardHeader className="pb-2 lg:pb-3">
                <CardTitle className="text-base lg:text-lg font-semibold text-gray-900">Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 lg:space-y-4">
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Expected Return (%)</Label>
                    <Input 
                      type="number"
                      value={retirement.expectedReturn || ''}
                      onChange={(e) => updateValue('expectedReturn', e.target.value === '' ? 0 : parseFloat(e.target.value) || 0)}
                      step="0.25"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Inflation Rate (%)</Label>
                    <Input 
                      type="number"
                      value={retirement.inflationRate || ''}
                      onChange={(e) => updateValue('inflationRate', e.target.value === '' ? 0 : parseFloat(e.target.value) || 0)}
                      step="0.25"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">Federal Tax Rate in Retirement</Label>
                  <div className="flex items-center mt-1">
                    <Input 
                      type="number"
                      value={retirement.retirementTaxRate || ''}
                      onChange={(e) => updateValue('retirementTaxRate', e.target.value === '' ? 0 : parseFloat(e.target.value) || 0)}
                      className="w-20"
                    />
                    <span className="ml-2 text-sm text-gray-600">%</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="socialSecurity"
                    checked={retirement.socialSecurityIncluded}
                    onChange={(e) => updateValue('socialSecurityIncluded', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="socialSecurity" className="text-sm font-medium text-gray-700">
                    Include Social Security Estimate
                  </Label>
                </div>
                
                {catchUpEnabled && (
                  <div className="p-2 bg-green-50 rounded-md border border-green-200">
                    <div className="text-xs font-medium text-green-800">✅ Catch-Up Contributions Enabled</div>
                    <div className="text-xs text-green-700">You're eligible for an additional ${IRS_LIMITS.catchUpContribution.toLocaleString()} annually (age 50+)</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Results */}
          <div className="xl:col-span-2 space-y-3 lg:space-y-6">
            {/* Main Summary - Compact Mobile 2x2 Layout */}
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3">
              <Card className="border border-orange-200 bg-orange-50">
                <CardContent className="p-1.5 lg:p-3">
                  <div className="text-xs font-bold text-black text-center mb-1">Invested Value</div>
                  <div className="text-sm lg:text-lg font-bold text-orange-800 text-center">{formatCurrency(summaryStats.totalContributions)}</div>
                  <div className="text-center mt-0.5 hidden lg:block leading-tight">
                    <div className="text-black text-[10px]">Employee: {formatCurrency(summaryStats.totalEmployeeContributions)}</div>
                    <div className="text-black text-[10px]">Employer: {formatCurrency(summaryStats.totalEmployerContributions)}</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-blue-200 bg-blue-50">
                <CardContent className="p-1.5 lg:p-3">
                  <div className="text-xs font-bold text-black text-center mb-1">Future Value</div>
                  <div className="text-sm lg:text-lg font-bold text-blue-800 text-center">{formatCurrency(summaryStats.futureValue)}</div>
                  <div className="text-xs text-gray-600 text-center mt-0.5 hidden lg:block">At {retirement.expectedReturn}% Return</div>
                </CardContent>
              </Card>
              
              <Card className="border border-green-200 bg-green-50">
                <CardContent className="p-1.5 lg:p-3">
                  <div className="text-xs font-bold text-black text-center mb-1">After-Tax Value</div>
                  <div className="text-sm lg:text-lg font-bold text-green-800 text-center">{formatCurrency(summaryStats.netAfterTax)}</div>
                  <div className="text-xs text-black text-center mt-0.5 hidden lg:block">In {retirement.retirementState}</div>
                </CardContent>
              </Card>
              
              <Card className="border border-orange-200 bg-orange-50">
                <CardContent className="p-1.5 lg:p-3">
                  <div className="text-xs font-bold text-black text-center mb-1">Monthly Income</div>
                  <div className="text-sm lg:text-lg font-bold text-orange-800 text-center">{formatCurrency(summaryStats.totalMonthlyRetirement)}</div>
                  <div className="text-xs text-black text-center mt-0.5 hidden lg:block">401(k) + Social Security</div>
                </CardContent>
              </Card>
            </div>

            {/* Tax Details - Compact Mobile 2x2 Layout */}
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3">
              <Card className="border border-yellow-200 bg-yellow-50">
                <CardContent className="p-1.5 lg:p-3">
                  <div className="text-xs font-bold text-black text-center mb-1">Taxable Income</div>
                  <div className="text-sm lg:text-lg font-bold text-yellow-800 text-center">{formatCurrency(summaryStats.futureValue)}</div>
                </CardContent>
              </Card>
              
              <Card className="border border-red-200 bg-red-50">
                <CardContent className="p-1.5 lg:p-3">
                  <div className="text-xs font-bold text-black text-center mb-1">Federal Tax</div>
                  <div className="text-sm lg:text-lg font-bold text-red-800 text-center">{formatCurrency(summaryStats.federalTaxOwed)}</div>
                  <div className="text-xs text-gray-600 text-center mt-0.5 hidden lg:block">{retirement.retirementTaxRate}% tax</div>
                </CardContent>
              </Card>
              
              <Card className="border border-indigo-200 bg-indigo-50">
                <CardContent className="p-1.5 lg:p-3">
                  <div className="text-xs font-bold text-black text-center mb-1">State Tax</div>
                  <div className="text-sm lg:text-lg font-bold text-indigo-800 text-center">{formatCurrency(summaryStats.stateTaxOwed)}</div>
                  <div className="text-xs text-black text-center mt-0.5 hidden lg:block">{getRetirementStateData().taxRate}% tax</div>
                </CardContent>
              </Card>
              
              <Card className="border border-purple-200 bg-purple-50">
                <CardContent className="p-1.5 lg:p-3">
                  <div className="text-xs font-bold text-black text-center mb-1">Tax Payable</div>
                  <div className="text-sm lg:text-lg font-bold text-purple-800 text-center">{formatCurrency(summaryStats.totalTaxOwed)}</div>
                  <div className="text-xs text-gray-600 text-center mt-0.5 hidden lg:block">{((summaryStats.totalTaxOwed / summaryStats.futureValue) * 100).toFixed(1)}% effective rate</div>
                </CardContent>
              </Card>
            </div>





            {/* Note Section */}
            <div className="mt-4 text-left ml-4">
              <p className="text-xs text-blue-600 font-medium">
                Note: Employer contribution {formatCurrency(summaryStats.totalEmployerContributions)} is free money
              </p>
            </div>

            {/* Interactive Charts */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="calculator">Growth Over Time</TabsTrigger>
                <TabsTrigger value="breakdown">Contribution Mix</TabsTrigger>
                <TabsTrigger value="comparison">Roth vs Traditional</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
              </TabsList>

              <TabsContent value="calculator" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      401(k) Growth Projection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={growthChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="year" 
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis 
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(0)}k`}
                          />
                          <Tooltip 
                            formatter={(value) => [formatCurrency(Number(value)), '']}
                            labelFormatter={(label) => `Year ${label}`}
                          />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="Employee Contributions" 
                            stackId="1"
                            stroke="#3B82F6" 
                            fill="#3B82F6" 
                            fillOpacity={0.8}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="Employer Contributions" 
                            stackId="1"
                            stroke="#10B981" 
                            fill="#10B981" 
                            fillOpacity={0.8}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="Investment Growth" 
                            stackId="1"
                            stroke="#F59E0B" 
                            fill="#F59E0B" 
                            fillOpacity={0.6}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Final Balance Breakdown Donut Chart */}
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChartIcon className="w-5 h-5 text-blue-600" />
                      Final Balance Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={contributionBreakdownData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {contributionBreakdownData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {contributionBreakdownData.map((item, index) => (
                        <div key={index} className="text-center h-16 flex flex-col justify-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <div 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-xs font-medium leading-tight">{item.name}</span>
                          </div>
                          <div className="text-sm font-bold">{formatCurrency(item.value)}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="breakdown" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contribution Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={contributionBreakdownData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {contributionBreakdownData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {contributionBreakdownData.map((item, index) => (
                        <div key={index} className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          <div className="text-lg font-bold">{formatCurrency(item.value)}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comparison" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Traditional vs Roth 401(k) Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={rothVsTraditionalData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="type" />
                          <YAxis tickFormatter={(value) => formatCurrency(value)} />
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          <Legend />
                          <Bar dataKey="grossAmount" fill="#3B82F6" name="Gross Amount" />
                          <Bar dataKey="taxOwed" fill="#EF4444" name="Tax Owed" />
                          <Bar dataKey="netAmount" fill="#10B981" name="Net Amount" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="benefits" className="mt-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <span className="text-blue-600">ℹ️</span> 401(k) Key Facts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {/* 2024 Contribution Limit */}
                      <div className="text-center p-3 bg-gray-50 rounded-lg border">
                        <div className="text-xs text-gray-600 mb-1">2024 Contribution Limit</div>
                        <div className="text-lg font-bold text-gray-900">$23,500</div>
                        <div className="text-xs text-gray-500">+ $7,500 catch-up (50+)</div>
                      </div>
                      
                      {/* Tax Treatment */}
                      <div className="text-center p-3 bg-gray-50 rounded-lg border">
                        <div className="text-xs text-gray-600 mb-1">Tax Treatment</div>
                        <div className="text-lg font-bold text-gray-900">Deferred</div>
                        <div className="text-xs text-gray-500">Pay taxes in retirement</div>
                      </div>
                      
                      {/* Early Withdrawal */}
                      <div className="text-center p-3 bg-gray-50 rounded-lg border">
                        <div className="text-xs text-gray-600 mb-1">Early Withdrawal</div>
                        <div className="text-lg font-bold text-red-600">10% Penalty</div>
                        <div className="text-xs text-gray-500">Before age 59½</div>
                      </div>
                      
                      {/* Required Distributions */}
                      <div className="text-center p-3 bg-gray-50 rounded-lg border">
                        <div className="text-xs text-gray-600 mb-1">Required Distributions</div>
                        <div className="text-lg font-bold text-gray-900">Age 73</div>
                        <div className="text-xs text-gray-500">Must start withdrawals</div>
                      </div>
                      
                      {/* Withdrawal Rate */}
                      <div className="text-center p-3 bg-gray-50 rounded-lg border">
                        <div className="text-xs text-gray-600 mb-1">Withdrawal Rate</div>
                        <div className="text-lg font-bold text-blue-600">4% Rule</div>
                        <div className="text-xs text-gray-500">Safe annual withdrawal</div>
                      </div>
                      
                      {/* Employer Match */}
                      <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-xs text-green-600 mb-1">Employer Match</div>
                        <div className="text-lg font-bold text-green-700">Free Money</div>
                        <div className="text-xs text-green-600">Always maximize this</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Smart Insights Section */}
            <div className="space-y-4">
              {/* State-Specific Smart Nudge */}
              {retirement.retirementState && (
                <Card className="border border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-blue-900 mb-1">
                          {retirement.retirementState === 'Texas' || retirement.retirementState === 'Florida' || 
                           retirement.retirementState === 'Nevada' || retirement.retirementState === 'Washington' ? 
                           `${retirement.retirementState} Tax Advantage` : `${retirement.retirementState} Tax Planning`}
                        </h3>
                        <p className="text-sm text-blue-800">
                          {retirement.retirementState === 'Texas' || retirement.retirementState === 'Florida' || 
                           retirement.retirementState === 'Nevada' || retirement.retirementState === 'Washington' ? 
                           `No state income tax in ${retirement.retirementState}! Consider maximizing Traditional 401(k) for federal tax deferral, or Roth for tax-free growth.` :
                           retirement.retirementState === 'California' || retirement.retirementState === 'New York' ?
                           `${retirement.retirementState} has high retirement taxes. Traditional 401(k) may provide better tax deferral, especially if you plan to relocate.` :
                           `Plan for ${retirement.retirementState} tax implications on your retirement withdrawals.`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Investment Growth Insight */}
              {summaryStats.futureValue > summaryStats.totalContributions && (
                <Card className="border border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-green-900 mb-1">Compound Growth Power</h3>
                        <p className="text-sm text-green-800">
                          Your {formatCurrency(summaryStats.totalContributions)} in contributions will grow to{' '}
                          <span className="font-semibold">{formatCurrency(summaryStats.futureValue)}</span> through compound growth.
                          That's <span className="font-semibold">{formatCurrency(summaryStats.futureValue - summaryStats.totalContributions)}</span> in pure investment gains!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Employer Match Optimization */}
              {summaryStats.employerMatchValue > 0 && (
                <Card className="border border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-purple-900 mb-1">Free Money Alert</h3>
                        <p className="text-sm text-purple-800">
                          Your employer match is worth <span className="font-semibold">{formatCurrency(summaryStats.employerMatchValue)}</span> over your career.
                          That's essentially a {((summaryStats.employerMatchValue / summaryStats.totalContributions) * 100).toFixed(0)}% instant return on your contributions!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Catch-up Contribution Reminder */}
              {retirement.currentAge >= 50 && (
                <Card className="border border-orange-200 bg-orange-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-orange-900 mb-1">Catch-Up Eligible</h3>
                        <p className="text-sm text-orange-800">
                          You're eligible for catch-up contributions! Add an extra $7,500/year (total limit: $30,500 in 2024) 
                          to accelerate your retirement savings.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>





          </div>
        </div>
        
        {/* Your Personalized Action Plan */}
        <div className="mt-8">
          <Card className="border border-green-200 bg-green-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-800">
                <span className="text-green-600">📋</span> Your Personalized Action Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-100">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-lg font-bold text-green-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Maximize Employer Match</h4>
                    <p className="text-sm text-green-800">
                      Contribute at least {retirement.employerMatch}% to get full employer match. 
                      This gives you an instant {((summaryStats.employerMatchValue / summaryStats.totalContributions) * 100).toFixed(0)}% return.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-100">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-lg font-bold text-green-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Choose Your Tax Strategy</h4>
                    <p className="text-sm text-green-800">
                      {retirement.retirementState === 'Texas' || retirement.retirementState === 'Florida' || 
                       retirement.retirementState === 'Nevada' || retirement.retirementState === 'Washington' ? 
                       'Consider Roth 401(k) since you\'ll have no state taxes in retirement.' :
                       'Traditional 401(k) may be better if you expect lower tax rates in retirement.'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-100">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-lg font-bold text-green-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Review Investment Options</h4>
                    <p className="text-sm text-green-800">
                      Focus on low-cost index funds with expense ratios under 0.5%. Target funds are good for hands-off investing.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-100">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-lg font-bold text-green-600">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Increase Contributions Annually</h4>
                    <p className="text-sm text-green-800">
                      Set up automatic increases of 1-2% each year. Small increases compound to significant retirement wealth.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3 border border-green-100">
                  <h4 className="font-semibold text-orange-800 mb-2">💰 Maximize Benefits:</h4>
                  <ul className="space-y-1 text-orange-700 text-xs">
                    <li>• Contribute {retirement.employerMatch}% for full {formatCurrency(summaryStats.employerMatchValue)} match</li>
                    <li>• Increase by 1% each year with salary raises</li>
                    {catchUpEnabled && <li>• You're eligible for ${IRS_LIMITS.catchUpContribution.toLocaleString()} catch-up (age 50+)</li>}
                    <li>• Aim for 15-20% total savings rate</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-3 border border-green-100">
                  <h4 className="font-semibold text-purple-800 mb-2">🏛️ State-Specific Strategy:</h4>
                  <ul className="space-y-1 text-purple-700 text-xs">
                    <li>• {retirement.currentState}: {getCurrentStateData().noRetirementTax ? 'No state tax - consider Roth' : `${getCurrentStateData().taxRate}% state tax - Traditional may save more`}</li>
                    <li>• Retiring in {retirement.retirementState}: {getRetirementStateData().noRetirementTax ? 'Tax-free withdrawals!' : `${getRetirementStateData().taxRate}% tax on withdrawals`}</li>
                    <li>• {retirement.currentState !== retirement.retirementState ? 'Relocation strategy could save thousands' : 'Staying put - consistent tax planning'}</li>
                    <li>• Consider moving to FL, TX, NV, or WA for tax-free retirement</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-3 border border-green-100">
                  <h4 className="font-semibold text-blue-800 mb-2">📊 Advanced Optimization:</h4>
                  <ul className="space-y-1 text-blue-700 text-xs">
                    <li>• Set up automatic 1% annual increases</li>
                    <li>• Retiring in {retirement.retirementState}: Tax-free withdrawals!</li>
                    <li>• Rebalance quarterly to maintain target allocation</li>
                    <li>• Consider Roth if in lower tax bracket</li>
                    <li>• Max out employer match before IRA contributions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Educational Content Section */}
        <div className="w-full mt-8 space-y-6">
          {/* Ultimate USA Retirement Planner */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ultimate USA Retirement Planner with 401k Calculator</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                U.S. residents do not need to be overwhelmed when they plan for retirement. You can get a clear understanding of your future finances with a specifically designed 401k calculator. There are no more worries, even if you just start your career or are nearing retirement age. This 401k calculator with match is helpful to you by serving as both a 401k estimator and a comprehensive planning tool. As a result, you can see your contribution, employer match, and investment growth over time.
              </p>
              <p className="text-sm text-gray-600">
                Moreover, you have an additional possible chance to explore different scenarios by using the 401k loan calculator, roth 401k calculator, the 401k growth calculator, and the 401k withdrawal calculator. Overall, the retirement calculator 401k gives you full control over your financial decisions. Use a 401k calculator to find your retirement growth and understand taxes on 401k withdrawal calculator scenarios.
              </p>
            </div>
          </section>

          {/* How to Use This Calculator */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Use This Calculator</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Basic Information</h4>
                <p className="text-sm text-gray-600">
                  Whenever you want to begin with the 401 (k) estimator, you have to provide some important details: your current age, planned retirement age, present 401 (k) balance, and annual salary. Once you submit your inputs, the 401 (k) calculator will quickly estimate your potential savings. Overall, accurate information and projections will help you to decide something smartly about your retirement goal.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Contribution Setting with 401k Calculator</h4>
                <p className="text-sm text-gray-600">
                  Here, it is all about contributions from both you and your employer. The 401k contribution calculator will easily forecast your account balance through contribution percentage, employer match, and expected annual salary. Moreover, you can also select employer match type: fixed percentage and contribution type: traditional 401k. You should know about traditional contributions (it reduces taxable income now, but at the retirement stage, you need to pay tax upon withdrawal using our 401k withdrawal calculator).
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Location Settings</h4>
                <p className="text-sm text-gray-600">
                  The other important detail you should know is that your current and future residence can affect the taxes. When you use a 401 (k) calculator with a match, it will consider your current state and your retirement state. For example, if you retire in Texas, there is no state income tax. So Roth contributions become more useful in this case. Overall, the retirement calculator 401 (k) will show more accurate results with state-based details.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Advanced Settings</h4>
                <p className="text-sm text-gray-600">
                  With the help of advanced setting features, you can adjust key assumptions. You should set your expected annual returns, inflation rates, and federal tax estimates for retirement in the 401 (k) growth calculator. Once you set all the details, along with your social security income estimate, the 401 (k) estimator will clearly show you a complete picture of your post-retirement finances.
                </p>
              </div>
            </div>
          </section>

          {/* Understanding Your Results */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding Your Results</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Calculation Results</h4>
                <p className="text-sm text-gray-600">
                  You can get details regarding invested value, future value, after-tax value, and projected monthly income once you enter your data at the 401 (k) calculator. Moreover, the tool will provide your details regarding taxable income, federal and state taxes, and total tax payable. Overall, the 401 (k) calculator with a match will highlight how much your employer contributes and the benefit of using the full match.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">401 (k) Growth Projection</h4>
                <p className="text-sm text-gray-600">
                  The 401 (k) growth calculator will offer you more details than just numbers. Through the visual chart, you can understand the account balance growth year by year. Moreover, you can see contributions, employer matches, and investment returns separately. As a result, it will help you to know the growth path clearly in your retirement calculator 401 (k).
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Final Balance Breakdown</h4>
                <p className="text-sm text-gray-600">
                  Generally, you may know that at the time of retirement, your total balance will come from contributions, employer match, and investment growth. But the 401 (k) contribution calculator will show you the proportion of each source. Therefore, you can easily get insight into how your wealth has accumulated over time.
                </p>
              </div>
            </div>
          </section>

          {/* Key Benefits */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Key Benefits of 401(k) Planning</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Texas Tax Advantage (State-Specific Strategy)</h4>
                <p className="text-sm text-gray-600">
                  If you retire in a state like Texas (a no-income tax state), you can keep more money at your withdrawal time. To get to know the difference between paying taxes now and later, you can utilize the Roth 401 (k) calculator. As a result, you can choose the best strategy for your situation.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Compound Growth Power</h4>
                <p className="text-sm text-gray-600">
                  Compounding is an important factor in seeing the growth of your wealth. If you start saving earlier, your money also grows at the same time. Above all, when you want to know how your small increases in contribution lead to substantial growth over a decade, the 401 (k) growth calculator will help you to know it transparently.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Free Money Alert</h4>
                <p className="text-sm text-gray-600">
                  The 401 (k) calculator with a match will make you understand the value of employer contributions. Moreover, when you get the full match, you can experience the free money. As a matter of fact, it will be an instant and risk-free return on your investment.
                </p>
              </div>
            </div>
          </section>

          {/* Personalized Action Plan */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Personalized Action Plan</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Using the 401 (k) estimator will give you clear, actionable steps to increase your retirement savings. The following tips will help you save more money as well as plan in a better way.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Maximize Employer Match</h4>
                  <p className="text-sm text-gray-600">
                    You have to contribute something to get the full match from your employer. The 401 (k) calculator with a match will show you exactly how much your employer adds. You can get this for free money, and that will increase your retirement savings without any additional risk.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Review Investment Options</h4>
                  <p className="text-sm text-gray-600">
                    You should check the funds available in your 401 (k) and choose the one based on your comfort, your risk tolerance, and goals. Through using the 401 (k) estimator, you can understand how different fund choices affect your retirement growth over time.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Choose Your Tax Strategy</h4>
                  <p className="text-sm text-gray-600">
                    It is a good idea to use the Roth 401 (k) calculator and traditional 401 (k) comparison to know which tax option will work for you. From this, you can get more knowledge regarding the difference between the current tax payable and a later one. It will help you to choose the tax approach that maximizes your savings.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Increase Contribution Annually</h4>
                  <p className="text-sm text-gray-600">
                    If you try to raise your contribution a little bit every year, even by just 1%, you can receive more money when you retire. Moreover, the 401 (k) estimator will show you the long-term impact of consistent growth.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 401k Benefits and Considerations */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">401k Investment Benefits and Considerations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Benefits Section */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <h4 className="text-xl font-bold text-green-800">Benefits</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-green-700">✓ Employer matching provides instant free money on contributions</p>
                  <p className="text-sm text-green-700">✓ Pre-tax contributions reduce current taxable income</p>
                  <p className="text-sm text-green-700">✓ Tax-deferred growth compounds savings over time</p>
                  <p className="text-sm text-green-700">✓ High contribution limits ($23,500 + $7,500 catch-up)</p>
                  <p className="text-sm text-green-700">✓ Automatic payroll deduction builds consistent savings</p>
                  <p className="text-sm text-green-700">✓ Professional investment management options</p>
                </div>
              </div>

              {/* Considerations Section */}
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✗</span>
                  </div>
                  <h4 className="text-xl font-bold text-red-800">Considerations</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-red-700">✗ Early withdrawal penalties (10%) before age 59½</p>
                  <p className="text-sm text-red-700">✗ Limited investment options compared to IRAs</p>
                  <p className="text-sm text-red-700">✗ Required minimum distributions starting at age 73</p>
                  <p className="text-sm text-red-700">✗ Traditional withdrawals taxed as ordinary income</p>
                  <p className="text-sm text-red-700">✗ Potential for loan defaults affecting long-term growth</p>
                  <p className="text-sm text-red-700">✗ Future tax rate uncertainty at retirement</p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Use a 401K Calculator */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use a 401K Calculator?</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Financial Planning</h4>
                <p className="text-sm text-gray-600">
                  Visualize your retirement savings growth and plan accordingly for your future financial needs.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Goal Setting</h4>
                <p className="text-sm text-gray-600">
                  Set realistic retirement goals based on accurate calculations and projections.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Smart Decisions</h4>
                <p className="text-sm text-gray-600">
                  Make informed choices about contribution amounts and investment strategies.
                </p>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm font-medium text-left">
                    What is the maximum 401K contribution for 2025?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    The maximum contribution limit for 2025 is $23,000 for individuals under 50, and $30,500 for those 50 and older with catch-up contributions.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-sm font-medium text-left">
                    How accurate are 401K calculator projections?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Our 401K calculator provides estimates based on the information you provide. Actual results may vary due to market conditions, changes in contribution amounts, and other factors. The projections assume consistent contributions and average market returns.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-sm font-medium text-left">
                    When can I withdraw from my 401K without penalty?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    You can generally withdraw from your 401K without the 10% early withdrawal penalty after age 59½. However, you'll still owe income taxes on traditional 401K withdrawals. Required minimum distributions begin at age 73.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-sm font-medium text-left">
                    Should I contribute to 401K or Roth IRA first?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Generally, contribute enough to your 401K to get the full employer match first (it's free money), then consider maxing out a Roth IRA if you're eligible. After that, return to maxing out your 401K. The exact strategy depends on your income, tax situation, and retirement goals.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* Final Call to Action */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-white mb-2">Use the 401k calculator estimator today for a secure future</h3>
            <p className="text-blue-100 text-sm mb-4">
              Take control of your retirement planning with our comprehensive 401k calculator and start building your financial security today.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Calculate Your 401k Now
            </Button>
          </section>

          {/* 401k Calculator Tags */}
          <section className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Related Topics</h4>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#401kCalculator</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#RetirementPlanning</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#FinancialFitness</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#WealthBuilding</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#SavingsGoals</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#InvestSmart</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#FutureWealth</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#MoneyManagement</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#PersonalFinance</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#RetirementSavings</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#InvestmentStrategy</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#FinancialLiteracy</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#SecureYourFuture</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#Roth401k</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#EmployerMatch</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#CompoundGrowth</span>
              </div>
            </div>
          </section>
        </div>
      </div>
      </div>
    </>
  );
}