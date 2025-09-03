import React, { useState, useEffect, useMemo } from "react";
import { CalculatorLayout } from "../components/calculators/CalculatorLayout";
import { Card } from "../components/ui/card";
import { Slider } from "../components/ui/slider";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { Link } from "wouter";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";
import { Progress } from "../components/ui/progress";
import { Checkbox } from "../components/ui/checkbox";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import FinancialDisclaimer from "../components/FinancialDisclaimer";
import ReactECharts from 'echarts-for-react';
import {
  BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  Legend, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, 
  Pie, Cell, Area, AreaChart, ComposedChart, ReferenceLine
} from 'recharts';
// Aliasing chart components to avoid naming conflicts with Lucide icons
const RBarChart = RechartsBarChart;
const RLineChart = RechartsLineChart;
import {
  Calculator, IndianRupee, Info, TrendingUp, Calendar,
  BarChart4, PieChart as ChartPie, ArrowRight,
  Clock, Sigma, Scale, BadgePercent,
  Target, Gift, Briefcase, GraduationCap as Graduation, Home, Heart, Plane, 
  Download, Share2, AlertTriangle, MessageSquare, Tag, HelpCircle,
  Check, ArrowDown, ArrowUp, Square, AlertCircle,
  RefreshCw, Brain, LifeBuoy, Wallet, Award, Zap, Settings
} from "lucide-react";

// Custom Tooltip component
const Tooltip = ({ text, children }: { text: string, children: React.ReactNode }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md shadow-lg z-10 w-max max-w-xs">
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

// Retirement lifestyle templates
interface LifestyleTemplate {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  multiplier: number; // Factor to multiply basic expenses
}

export default function RetirementCalculator() {
  const { toast } = useToast();

  // Input state variables with realistic defaults for typical Indian user
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [monthlyExpenses, setMonthlyExpenses] = useState(60000); // Realistic urban expense
  const [inflationRate, setInflationRate] = useState(6); // Average inflation in India
  const [existingSavings, setExistingSavings] = useState(1500000); // 15 Lakhs existing retirement savings
  const [preRetirementReturn, setPreRetirementReturn] = useState(12); // Realistic equity-heavy portfolio return
  const [postRetirementReturn, setPostRetirementReturn] = useState(7.5); // Conservative post-retirement return
  const [monthlyContribution, setMonthlyContribution] = useState(15000); // Realistic SIP amount
  const [annualIncreaseRate, setAnnualIncreaseRate] = useState(8); // Matching typical salary growth
  const [riskProfile, setRiskProfile] = useState("moderate");
  const [selectedLifestyle, setSelectedLifestyle] = useState("standard");
  
  // Visualization options state
  const [chartView, setChartView] = useState("corpus");
  const [showRealValues, setShowRealValues] = useState(true);
  
  // Results state variables
  const [showResults, setShowResults] = useState(false);
  const [targetCorpus, setTargetCorpus] = useState(0);
  const [requiredMonthlySIP, setRequiredMonthlySIP] = useState(0);
  const [monthlyPension, setMonthlyPension] = useState(0);
  const [shortfallOrSurplus, setShortfallOrSurplus] = useState(0);
  const [corpusGrowthData, setCorpusGrowthData] = useState<any[]>([]);
  const [incomeDrawdownData, setIncomeDrawdownData] = useState<any[]>([]);
  const [detailedAnalysis, setDetailedAnalysis] = useState<any[]>([]);
  
  // Retirement lifestyle templates
  const lifestyleTemplates: LifestyleTemplate[] = [
    {
      id: "basic",
      name: "Simple Living",
      icon: <Home className="h-4 w-4" />,
      description: "Essential expenses covered with minimal discretionary spending. Comfortable but frugal lifestyle.",
      multiplier: 0.8,
    },
    {
      id: "standard",
      name: "Comfortable",
      icon: <Briefcase className="h-4 w-4" />,
      description: "Maintain your current lifestyle with moderate indulgences and occasional travel.",
      multiplier: 1.0,
    },
    {
      id: "premium",
      name: "Premium",
      icon: <Award className="h-4 w-4" />,
      description: "Enhanced lifestyle with regular travel, better healthcare, and more leisure activities.",
      multiplier: 1.3,
    },
    {
      id: "luxury",
      name: "Luxury",
      icon: <Plane className="h-4 w-4" />,
      description: "High-end living with premium amenities, extensive travel, and maximum comfort.",
      multiplier: 1.6,
    },
    {
      id: "spiritual",
      name: "Spiritual",
      icon: <LifeBuoy className="h-4 w-4" />,
      description: "Minimalist, purpose-driven lifestyle focused on meaningful experiences over material goods.",
      multiplier: 0.7,
    }
  ];

  // Create an array of years from current age to life expectancy
  const getYearsArray = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i <= lifeExpectancy - currentAge; i++) {
      years.push(currentYear + i);
    }
    return years;
  };

  // Calculate retirement corpus needed
  const calculateRetirementRequirements = () => {
    // Years until retirement
    const yearsToRetirement = retirementAge - currentAge;
    
    // Years in retirement
    const yearsInRetirement = lifeExpectancy - retirementAge;
    
    // Get lifestyle multiplier
    const lifestyleMultiplier = lifestyleTemplates.find(t => t.id === selectedLifestyle)?.multiplier || 1;
    
    // Adjust monthly expenses based on lifestyle
    const adjustedMonthlyExpenses = monthlyExpenses * lifestyleMultiplier;
    
    // Calculate future monthly expenses at retirement (accounting for inflation)
    const futureMonthlyExpenses = adjustedMonthlyExpenses * Math.pow(1 + inflationRate/100, yearsToRetirement);
    
    // Annual expenses in retirement
    const annualExpensesAtRetirement = futureMonthlyExpenses * 12;
    
    // Calculate corpus needed at retirement
    // Using the formula for Present Value of an Annuity
    const monthlyReturnRate = postRetirementReturn / 100 / 12;
    const monthsInRetirement = yearsInRetirement * 12;
    
    // Formula: PMT * ((1 - (1 + r)^-n) / r)
    // Where PMT is the monthly withdrawal, r is the monthly return rate, and n is the number of months
    let targetCorpusRequired = futureMonthlyExpenses * 
      ((1 - Math.pow(1 + monthlyReturnRate, -monthsInRetirement)) / monthlyReturnRate);
    
    // Adjust for slight buffer (optional)
    targetCorpusRequired *= 1.05; // Add 5% buffer for safety
    
    // Calculate future value of existing savings
    const futureValueOfExistingSavings = existingSavings * Math.pow(1 + preRetirementReturn/100, yearsToRetirement);
    
    // Calculate monthly SIP required
    // Using SIP formula: FV = P * ((1 + r)^n - 1) / r * (1 + r)
    // Rearranged to solve for P (monthly investment)
    const monthlyPreReturnRate = preRetirementReturn / 100 / 12;
    const monthsToRetirement = yearsToRetirement * 12;
    
    // How much corpus still needs to be built after accounting for existing savings
    const corpusToBeBuilt = targetCorpusRequired - futureValueOfExistingSavings;
    
    let requiredMonthlySIP = 0;
    if (corpusToBeBuilt > 0) {
      // Basic SIP formula without annual increase
      if (annualIncreaseRate === 0) {
        requiredMonthlySIP = corpusToBeBuilt / 
          (((Math.pow(1 + monthlyPreReturnRate, monthsToRetirement) - 1) / monthlyPreReturnRate) * 
           (1 + monthlyPreReturnRate));
      } else {
        // For step-up SIP, we need to use numeric approximation
        // This is a simplification. A more precise calculation would use a loop
        const stepUpFactor = 1 + annualIncreaseRate/100;
        
        // Calculate equivalent of normal SIP for step-up SIP
        // This is a heuristic approximation
        const effectiveMonths = (Math.pow(stepUpFactor, yearsToRetirement) - 1) / 
                               (stepUpFactor - 1) * 12;
        
        requiredMonthlySIP = corpusToBeBuilt / 
          (((Math.pow(1 + monthlyPreReturnRate, monthsToRetirement) - 1) / monthlyPreReturnRate) * 
           (1 + monthlyPreReturnRate)) / 
          (effectiveMonths / monthsToRetirement);
      }
    }
    
    // Calculate expected monthly pension
    // This is the amount that can be withdrawn monthly from the corpus
    // Using the 4% rule as a simple approximation
    const monthlyPensionAmount = targetCorpusRequired * (postRetirementReturn/100) / 12;
    
    // Calculate shortfall or surplus
    // Compare what user will have vs what they need
    let projectedCorpus = futureValueOfExistingSavings;
    
    // Calculate future value of monthly SIP contributions
    if (annualIncreaseRate === 0) {
      // Without step-up
      projectedCorpus += monthlyContribution * 
        ((Math.pow(1 + monthlyPreReturnRate, monthsToRetirement) - 1) / monthlyPreReturnRate) * 
        (1 + monthlyPreReturnRate);
    } else {
      // With step-up, use a more precise method - calculate year by year
      let currentSIP = monthlyContribution;
      let currentCorpus = futureValueOfExistingSavings;
      
      for (let year = 1; year <= yearsToRetirement; year++) {
        // Add monthly contributions for this year
        for (let month = 1; month <= 12; month++) {
          currentCorpus = currentCorpus * (1 + monthlyPreReturnRate) + currentSIP;
        }
        
        // Increase SIP for next year
        if (year < yearsToRetirement) {
          currentSIP *= (1 + annualIncreaseRate/100);
        }
      }
      
      projectedCorpus = currentCorpus;
    }
    
    const shortfallSurplus = projectedCorpus - targetCorpusRequired;
    
    // Generate corpus growth data for visualization
    const corpusGrowthDataPoints = [];
    let yearlyCorpus = existingSavings;
    let currentSIP = monthlyContribution;
    
    // Pre-retirement growth
    for (let year = 0; year <= yearsToRetirement; year++) {
      const age = currentAge + year;
      
      corpusGrowthDataPoints.push({
        year: new Date().getFullYear() + year,
        age,
        corpus: yearlyCorpus,
        phase: "accumulation"
      });
      
      // Update corpus for next year
      if (year < yearsToRetirement) {
        // One year of growth with monthly contributions
        let yearEndCorpus = yearlyCorpus;
        
        for (let month = 1; month <= 12; month++) {
          yearEndCorpus = yearEndCorpus * (1 + monthlyPreReturnRate) + currentSIP;
        }
        
        yearlyCorpus = yearEndCorpus;
        
        // Step up SIP for next year
        if (annualIncreaseRate > 0) {
          currentSIP *= (1 + annualIncreaseRate/100);
        }
      }
    }
    
    // Retirement phase corpus drawdown
    let retirementCorpus = yearlyCorpus; // Final corpus at retirement
    const drawdownDataPoints = [];
    const postMonthlyReturnRate = postRetirementReturn / 100 / 12;
    
    // Inflation-adjusted monthly expenses in first year of retirement
    let currentMonthlyExpense = futureMonthlyExpenses;
    
    // Generate a combined array for both phases (used for Income Flow view)
    const incomeDrawdownData = [...corpusGrowthDataPoints.map(point => ({
      ...point,
      monthlyIncome: 0
    }))];
    
    for (let year = 0; year <= yearsInRetirement; year++) {
      const age = retirementAge + year;
      const retirementYear = year;
      
      // For drawdown data points (used in retirement details)
      drawdownDataPoints.push({
        year: new Date().getFullYear() + yearsToRetirement + year,
        age,
        retirementYear,
        corpus: retirementCorpus,
        monthlyIncome: currentMonthlyExpense,
        phase: "withdrawal"
      });
      
      // For combined income drawdown data (used in Income Flow chart)
      incomeDrawdownData.push({
        year: new Date().getFullYear() + yearsToRetirement + year,
        age,
        corpus: retirementCorpus,
        monthlyIncome: currentMonthlyExpense,
        phase: "withdrawal"
      });
      
      // Update corpus for next year
      if (year < yearsInRetirement) {
        // One year of withdrawals and growth
        let yearEndCorpus = retirementCorpus;
        
        for (let month = 1; month <= 12; month++) {
          // Withdraw expenses first, then apply growth
          yearEndCorpus = (yearEndCorpus - currentMonthlyExpense) * (1 + postMonthlyReturnRate);
        }
        
        retirementCorpus = yearEndCorpus;
        
        // Increase expenses with inflation for next year
        currentMonthlyExpense *= (1 + inflationRate/100);
      }
    }
    
    // Create detailed analysis table
    const detailedAnalysisData = [];
    
    // Pre-retirement phase
    yearlyCorpus = existingSavings;
    currentSIP = monthlyContribution;
    
    for (let year = 0; year <= yearsToRetirement; year++) {
      const age = currentAge + year;
      const yearStart = yearlyCorpus;
      
      // Calculate yearly contribution
      let yearlyContribution = 0;
      if (year < yearsToRetirement) {
        // Calculate total contributions for this year
        yearlyContribution = currentSIP * 12;
      }
      
      // Calculate returns for this year
      let yearEndCorpus = yearlyCorpus;
      let yearlyReturns = 0;
      
      if (year < yearsToRetirement) {
        // Simulate monthly contributions and returns
        for (let month = 1; month <= 12; month++) {
          const monthStart = yearEndCorpus;
          yearEndCorpus = yearEndCorpus * (1 + monthlyPreReturnRate) + currentSIP;
          const monthReturn = yearEndCorpus - monthStart - currentSIP;
          yearlyReturns += monthReturn;
        }
        
        // Step up SIP for next year
        if (annualIncreaseRate > 0) {
          currentSIP *= (1 + annualIncreaseRate/100);
        }
      }
      
      yearlyCorpus = yearEndCorpus;
      
      detailedAnalysisData.push({
        year: new Date().getFullYear() + year,
        age,
        corpusStart: yearStart,
        contribution: yearlyContribution,
        returnsEarned: yearlyReturns,
        corpusEnd: yearEndCorpus,
        phase: "accumulation",
        postRetirementIncome: 0
      });
    }
    
    // Retirement phase
    retirementCorpus = yearlyCorpus; // Final corpus at retirement
    currentMonthlyExpense = futureMonthlyExpenses;
    
    for (let year = 1; year <= yearsInRetirement; year++) {
      const age = retirementAge + year;
      const yearStart = retirementCorpus;
      
      // Calculate yearly withdrawals
      const yearlyWithdrawal = currentMonthlyExpense * 12;
      
      // Calculate returns and end corpus for this year
      let yearEndCorpus = retirementCorpus;
      let yearlyReturns = 0;
      
      // Simulate monthly withdrawals and returns
      for (let month = 1; month <= 12; month++) {
        const monthStart = yearEndCorpus;
        // Withdraw expenses first, then apply growth
        yearEndCorpus = (yearEndCorpus - currentMonthlyExpense) * (1 + postMonthlyReturnRate);
        const monthReturn = yearEndCorpus - (monthStart - currentMonthlyExpense);
        yearlyReturns += monthReturn;
      }
      
      retirementCorpus = yearEndCorpus;
      
      // Increase expenses with inflation for next year
      currentMonthlyExpense *= (1 + inflationRate/100);
      
      detailedAnalysisData.push({
        year: new Date().getFullYear() + yearsToRetirement + year,
        age,
        corpusStart: yearStart,
        contribution: 0,
        returnsEarned: yearlyReturns,
        corpusEnd: yearEndCorpus,
        phase: "withdrawal",
        postRetirementIncome: yearlyWithdrawal
      });
    }
    
    // Update state with calculated values
    setTargetCorpus(targetCorpusRequired);
    setRequiredMonthlySIP(requiredMonthlySIP);
    setMonthlyPension(monthlyPensionAmount);
    setShortfallOrSurplus(shortfallSurplus);
    setCorpusGrowthData([...corpusGrowthDataPoints, ...drawdownDataPoints]);
    setIncomeDrawdownData(incomeDrawdownData);
    setDetailedAnalysis(detailedAnalysisData);
    setShowResults(true);
  };

  // Format currency for display
  const formatCurrency = (amount: number): string => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

  // Calculate retirement requirements when component loads or key parameters change
  useEffect(() => {
    calculateRetirementRequirements();
  }, [
    currentAge, 
    retirementAge, 
    lifeExpectancy, 
    monthlyExpenses, 
    inflationRate, 
    existingSavings, 
    preRetirementReturn, 
    postRetirementReturn, 
    monthlyContribution, 
    annualIncreaseRate,
    selectedLifestyle
  ]);

  // Create a goal for this retirement plan
  const createRetirementGoal = () => {
    // Create a goal object with pre-filled values
    const retirementGoal = {
      type: "Retirement",
      category: "Long-Term",
      name: `Retirement Corpus (${formatCurrency(targetCorpus)})`,
      targetAmount: targetCorpus,
      currentSavings: existingSavings,
      targetDate: new Date(new Date().getFullYear() + (retirementAge - currentAge), 0, 1).toISOString().split('T')[0],
      savingsPlan: annualIncreaseRate > 0 ? "Step-Up SIP" : "Fixed Monthly Savings"
    };
    
    // Save goal data to localStorage for GoalSettings to pick up
    const savedGoals = localStorage.getItem("financialGoals");
    let currentGoals = [];
    
    if (savedGoals) {
      try {
        currentGoals = JSON.parse(savedGoals);
      } catch (e) {
        console.error("Error parsing goals from localStorage:", e);
      }
    }
    
    // Add new retirement goal with unique ID
    const newGoal = {
      ...retirementGoal,
      id: `goal-${Date.now()}`,
      autoSave: false,
      savingsAmount: monthlyContribution
    };
    
    // Update goals in localStorage
    localStorage.setItem("financialGoals", JSON.stringify([...currentGoals, newGoal]));
    
    // Show success notification
    toast({
      title: "Retirement Goal Created",
      description: "Your retirement goal has been created. Redirecting to Goal Settings page...",
    });
    
    // Wait a moment, then redirect to Goal Settings page
    setTimeout(() => {
      window.location.href = "/goal-settings";
    }, 1500);
  };

  // Generate and download PDF report
  const downloadReport = () => {
    toast({
      title: "Report Generated",
      description: "Your retirement planning report has been downloaded.",
    });
  };

  // Get educational retirement planning insights based on calculation results
  const getPersonalizedInsights = () => {
    const insights = [];
    
    // Shortfall or surplus insight with cautious language
    if (shortfallOrSurplus < 0) {
      // Potential shortfall
      const shortfallPercentage = Math.abs(shortfallOrSurplus) / targetCorpus * 100;
      
      if (shortfallPercentage > 30) {
        insights.push(`Based on these inputs, there might be a potential difference of ${formatCurrency(Math.abs(shortfallOrSurplus))} (approximately ${shortfallPercentage.toFixed(0)}%) between projected savings and estimated needs.`);
      } else {
        insights.push(`These calculations suggest there could potentially be a difference of ${formatCurrency(Math.abs(shortfallOrSurplus))} (approximately ${shortfallPercentage.toFixed(0)}%) between projected savings and estimated requirements.`);
      }
      
      // Educational suggestions about closing gaps
      const additionalSIP = Math.ceil((requiredMonthlySIP - monthlyContribution) / 1000) * 1000;
      insights.push(`In similar situations, some retirement planners might consider reviewing their monthly contribution amounts. A difference of around ${formatCurrency(additionalSIP)} could potentially affect long-term outcomes, though individual circumstances vary greatly.`);
      
      // Educational point about retirement timing
      if (retirementAge < 65) {
        const delayYears = Math.min(5, 65 - retirementAge);
        insights.push(`Some financial educators suggest that adjusting retirement timing by ${delayYears} years might potentially influence corpus requirements in certain situations.`);
      }
    } else {
      // Potential surplus
      const surplusPercentage = shortfallOrSurplus / targetCorpus * 100;
      
      if (surplusPercentage > 30) {
        insights.push(`Based on current inputs, calculations suggest a potential positive difference of ${formatCurrency(shortfallOrSurplus)} (approximately ${surplusPercentage.toFixed(0)}%) beyond the estimated requirement.`);
        insights.push(`When discussing such scenarios with a SEBI-registered financial advisor, some individuals might explore various options including timing adjustments, lifestyle considerations, or legacy planning.`);
      } else {
        insights.push(`These hypothetical projections indicate a potential positive difference of ${formatCurrency(shortfallOrSurplus)} (approximately ${surplusPercentage.toFixed(0)}%) beyond estimated requirements.`);
      }
    }
    
    // Inflation impact insight with cautious language
    const inflationImpact = monthlyExpenses * Math.pow(1 + inflationRate/100, retirementAge - currentAge);
    insights.push(`For educational purposes, with an inflation rate assumption of ${inflationRate}%, expenses of ₹${monthlyExpenses.toLocaleString('en-IN')} today might potentially grow to approximately ₹${Math.round(inflationImpact).toLocaleString('en-IN')} after ${retirementAge - currentAge} years. Actual inflation may vary significantly over time.`);
    
    // Retirement duration insight with cautious language
    const retirementDuration = lifeExpectancy - retirementAge;
    if (retirementDuration > 25) {
      insights.push(`This scenario involves planning for approximately ${retirementDuration} years in retirement. For longer timeframes like this, some financial educators suggest discussing more conservative investment approaches with a SEBI-registered financial advisor.`);
    }
    
    return insights;
  };

  // Function to get educational retirement planning points
  const getRiskRecommendations = () => {
    const recommendations = [];
    const yearsToRetirement = retirementAge - currentAge;
    
    if (yearsToRetirement < 5) {
      recommendations.push("When the retirement timeline is less than 5 years away, some financial educators suggest that investors might want to explore more capital preservation strategies to potentially reduce volatility risk.");
    } else if (yearsToRetirement < 10) {
      recommendations.push("For retirement timelines between 5-10 years, financial education materials often discuss balanced approaches where moderate equity exposure (around 40-50%) might be worth exploring with a qualified advisor.");
    } else {
      recommendations.push("With retirement potentially more than 10 years away, some investors might discuss higher equity allocation strategies (perhaps 60-70%) with their SEBI-registered financial advisor, though individual circumstances vary greatly.");
    }
    
    // Add educational points about allocation based on risk profile
    if (riskProfile === "conservative") {
      recommendations.push("Those who identify with more conservative approaches might potentially discuss portfolios with lower equity proportions (perhaps around 30%), higher fixed income components (around 50%), and some allocation to hybrid instruments (around 20%), though these are educational examples only.");
    } else if (riskProfile === "moderate") {
      recommendations.push("For educational purposes, moderate risk profiles are sometimes discussed in financial literature as potentially including balanced allocations between equity (around 50%), fixed income (around 40%), and possibly some diversifiers (around 10%), though individual advice should come from a qualified advisor.");
    } else {
      recommendations.push("In educational contexts, more growth-focused approaches might involve discussions about higher equity allocations (around 70%), lower fixed income components (around 20%), and some allocation to potential growth assets (around 10%), though these are hypothetical examples requiring professional advice.");
    }
    
    // Add educational point based on corpus size
    if (targetCorpus > 50000000) { // > 5 Cr
      recommendations.push("For larger financial planning scenarios like this one, comprehensive financial planning with a SEBI-registered advisor could be beneficial for discussing diversification strategies across multiple asset classes appropriate to your specific situation.");
    }
    
    return recommendations;
  };

  return (
    <CalculatorLayout 
      title="Retirement Planning Calculator"
      description="Plan for a financially secure retirement with our comprehensive calculator."
      keywords="retirement planning, retirement calculator, corpus planning, retirement corpus, SIP for retirement, pension planning, retirement age, financial independence"
      icon="calculate"
    >
      <div className="mb-6">
        
        {/* Results Summary - Top Fixed Card */}
        {showResults && (
          <Card className="p-6 mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Retirement Corpus Needed</h3>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(targetCorpus)}</p>
                <p className="text-xs text-gray-500 mt-1">At age {retirementAge}</p>
              </div>
              
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Monthly SIP Required</h3>
                <p className="text-2xl font-bold text-indigo-600">{formatCurrency(requiredMonthlySIP)}</p>
                <p className="text-xs text-gray-500 mt-1">For {retirementAge - currentAge} years</p>
              </div>
              
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Monthly Retirement Income</h3>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(monthlyPension)}</p>
                <p className="text-xs text-gray-500 mt-1">For {lifeExpectancy - retirementAge} years</p>
              </div>
              
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  {shortfallOrSurplus >= 0 ? "Surplus" : "Shortfall"}
                </h3>
                <p className={`text-2xl font-bold ${shortfallOrSurplus >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {formatCurrency(Math.abs(shortfallOrSurplus))}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {shortfallOrSurplus >= 0 ? "Extra corpus" : "Funding gap"}
                </p>
              </div>
            </div>
            
            {/* Retirement Corpus Status */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium">Current Progress</span>
                <span className="text-xs font-medium">
                  {formatCurrency(existingSavings)} of {formatCurrency(targetCorpus)}
                </span>
              </div>
              <Progress 
                value={(existingSavings / targetCorpus) * 100} 
                className="h-2" 
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={createRetirementGoal}
              >
                <Target className="h-4 w-4 mr-2" />
                Set as Retirement Goal
              </Button>
              
              <Button
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
                onClick={downloadReport}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </Card>
        )}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Inputs - Left Column */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-blue-600" />
              Basic Information
            </h3>
            
            {/* Current Age */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="currentAge" className="text-sm">Current Age</Label>
                <div className="flex items-center gap-1">
                  <Input
                    id="currentAge"
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    className="w-16 h-7 text-sm"
                  />
                  <span className="text-sm">years</span>
                </div>
              </div>
              <Slider
                id="currentAge-slider"
                min={18}
                max={70}
                step={1}
                value={[currentAge]}
                onValueChange={(value) => setCurrentAge(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>18 years</span>
                <span>70 years</span>
              </div>
            </div>
            
            {/* Retirement Age */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="retirementAge" className="text-sm">Retirement Age</Label>
                <div className="flex items-center gap-1">
                  <Input
                    id="retirementAge"
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                    className="w-16 h-7 text-sm"
                  />
                  <span className="text-sm">years</span>
                </div>
              </div>
              <Slider
                id="retirementAge-slider"
                min={45}
                max={75}
                step={1}
                value={[retirementAge]}
                onValueChange={(value) => setRetirementAge(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>45 years</span>
                <span>75 years</span>
              </div>
            </div>
            
            {/* Life Expectancy */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Label htmlFor="lifeExpectancy" className="text-sm">Life Expectancy</Label>
                  <Tooltip text="The age to which you expect to live. The average life expectancy in India is around 70-75 years, but it's advisable to plan for longer.">
                    <Info className="h-3.5 w-3.5 text-gray-400" />
                  </Tooltip>
                </div>
                <div className="flex items-center gap-1">
                  <Input
                    id="lifeExpectancy"
                    type="number"
                    value={lifeExpectancy}
                    onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                    className="w-16 h-7 text-sm"
                  />
                  <span className="text-sm">years</span>
                </div>
              </div>
              <Slider
                id="lifeExpectancy-slider"
                min={70}
                max={100}
                step={1}
                value={[lifeExpectancy]}
                onValueChange={(value) => setLifeExpectancy(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>70 years</span>
                <span>100 years</span>
              </div>
            </div>
            
            {/* Monthly Expenses */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Label htmlFor="monthlyExpenses" className="text-sm">Monthly Expenses (Today)</Label>
                  <Tooltip text="Your current monthly expenses. This is used as the base to calculate your retirement needs.">
                    <Info className="h-3.5 w-3.5 text-gray-400" />
                  </Tooltip>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm">₹</span>
                  <Input
                    id="monthlyExpenses"
                    type="number"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                    className="w-28 h-7 text-sm"
                  />
                </div>
              </div>
              <Slider
                id="monthlyExpenses-slider"
                min={10000}
                max={500000}
                step={5000}
                value={[monthlyExpenses]}
                onValueChange={(value) => setMonthlyExpenses(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹10,000</span>
                <span>₹5,00,000</span>
              </div>
            </div>
            
            {/* Inflation Rate */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Label htmlFor="inflationRate" className="text-sm">Expected Inflation Rate</Label>
                  <Tooltip text="The average annual inflation rate. In India, this has historically been around 6%.">
                    <Info className="h-3.5 w-3.5 text-gray-400" />
                  </Tooltip>
                </div>
                <div className="flex items-center gap-1">
                  <Input
                    id="inflationRate"
                    type="number"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(Number(e.target.value))}
                    className="w-16 h-7 text-sm"
                  />
                  <span className="text-sm">%</span>
                </div>
              </div>
              <Slider
                id="inflationRate-slider"
                min={3}
                max={15}
                step={0.5}
                value={[inflationRate]}
                onValueChange={(value) => setInflationRate(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>3%</span>
                <span>15%</span>
              </div>
            </div>
            
            {/* Existing Retirement Savings */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Label htmlFor="existingSavings" className="text-sm">Existing Retirement Savings</Label>
                  <Tooltip text="Any savings or investments already earmarked for retirement.">
                    <Info className="h-3.5 w-3.5 text-gray-400" />
                  </Tooltip>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm">₹</span>
                  <Input
                    id="existingSavings"
                    type="number"
                    value={existingSavings}
                    onChange={(e) => setExistingSavings(Number(e.target.value))}
                    className="w-28 h-7 text-sm"
                  />
                </div>
              </div>
              <Slider
                id="existingSavings-slider"
                min={0}
                max={50000000}
                step={100000}
                value={[existingSavings]}
                onValueChange={(value) => setExistingSavings(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹0</span>
                <span>₹5 Cr</span>
              </div>
            </div>
          </Card>
          
          {/* Lifestyle Selection */}
          <Card className="p-6">
            <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-blue-600" />
              Retirement Lifestyle
            </h3>
            
            <p className="text-sm text-gray-600 mb-4">
              Select the lifestyle you envision for your retirement. This will adjust your expense requirements accordingly.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
              {lifestyleTemplates.map(template => (
                <div
                  key={template.id}
                  onClick={() => setSelectedLifestyle(template.id)}
                  className={`p-3 border rounded-md cursor-pointer transition ${
                    template.id === selectedLifestyle ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className={`flex justify-center mb-2 ${
                    template.id === selectedLifestyle ? "text-blue-600" : "text-gray-500"
                  }`}>
                    {template.icon}
                  </div>
                  <p className="text-xs font-medium text-center">{template.name}</p>
                </div>
              ))}
            </div>
            
            {/* Selected Lifestyle Description */}
            {selectedLifestyle && (
              <div className="bg-gray-50 p-3 rounded-md text-sm border border-gray-200">
                <p className="text-gray-700">
                  {lifestyleTemplates.find(t => t.id === selectedLifestyle)?.description}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  Expense Multiplier: {lifestyleTemplates.find(t => t.id === selectedLifestyle)?.multiplier}x
                </div>
              </div>
            )}
          </Card>
        </div>
        
        {/* Investment Inputs - Right Column */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Investment Parameters
            </h3>
            
            {/* Pre-Retirement Return Rate */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Label htmlFor="preRetirementReturn" className="text-sm">Expected Pre-Retirement Return</Label>
                  <Tooltip text="The expected annual return on your investments before retirement. For long-term investments in India, equity has historically delivered 12-14% returns.">
                    <Info className="h-3.5 w-3.5 text-gray-400" />
                  </Tooltip>
                </div>
                <div className="flex items-center gap-1">
                  <Input
                    id="preRetirementReturn"
                    type="number"
                    value={preRetirementReturn}
                    onChange={(e) => setPreRetirementReturn(Number(e.target.value))}
                    className="w-16 h-7 text-sm"
                  />
                  <span className="text-sm">%</span>
                </div>
              </div>
              <Slider
                id="preRetirementReturn-slider"
                min={7}
                max={15}
                step={0.5}
                value={[preRetirementReturn]}
                onValueChange={(value) => setPreRetirementReturn(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>7%</span>
                <span>15%</span>
              </div>
            </div>
            
            {/* Post-Retirement Return Rate */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Label htmlFor="postRetirementReturn" className="text-sm">Expected Post-Retirement Return</Label>
                  <Tooltip text="The expected annual return on your investments after retirement. This is typically lower as the portfolio becomes more conservative.">
                    <Info className="h-3.5 w-3.5 text-gray-400" />
                  </Tooltip>
                </div>
                <div className="flex items-center gap-1">
                  <Input
                    id="postRetirementReturn"
                    type="number"
                    value={postRetirementReturn}
                    onChange={(e) => setPostRetirementReturn(Number(e.target.value))}
                    className="w-16 h-7 text-sm"
                  />
                  <span className="text-sm">%</span>
                </div>
              </div>
              <Slider
                id="postRetirementReturn-slider"
                min={5}
                max={10}
                step={0.5}
                value={[postRetirementReturn]}
                onValueChange={(value) => setPostRetirementReturn(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5%</span>
                <span>10%</span>
              </div>
            </div>
            
            {/* Monthly Contribution */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Label htmlFor="monthlyContribution" className="text-sm">Current Monthly Contribution</Label>
                  <Tooltip text="The amount you currently save or invest each month towards retirement.">
                    <Info className="h-3.5 w-3.5 text-gray-400" />
                  </Tooltip>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm">₹</span>
                  <Input
                    id="monthlyContribution"
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="w-28 h-7 text-sm"
                  />
                </div>
              </div>
              <Slider
                id="monthlyContribution-slider"
                min={1000}
                max={100000}
                step={1000}
                value={[monthlyContribution]}
                onValueChange={(value) => setMonthlyContribution(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹1,000</span>
                <span>₹1,00,000</span>
              </div>
            </div>
            
            {/* Annual Increase Rate */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Label htmlFor="annualIncreaseRate" className="text-sm">Annual Increase in Contribution</Label>
                  <Tooltip text="The percentage by which you'll increase your monthly contribution each year (Step-up SIP).">
                    <Info className="h-3.5 w-3.5 text-gray-400" />
                  </Tooltip>
                </div>
                <div className="flex items-center gap-1">
                  <Input
                    id="annualIncreaseRate"
                    type="number"
                    value={annualIncreaseRate}
                    onChange={(e) => setAnnualIncreaseRate(Number(e.target.value))}
                    className="w-16 h-7 text-sm"
                  />
                  <span className="text-sm">%</span>
                </div>
              </div>
              <Slider
                id="annualIncreaseRate-slider"
                min={0}
                max={10}
                step={1}
                value={[annualIncreaseRate]}
                onValueChange={(value) => setAnnualIncreaseRate(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>10%</span>
              </div>
            </div>
            
            {/* Risk Profile */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="riskProfile" className="text-sm">Risk Profile</Label>
              </div>
              <Select
                value={riskProfile}
                onValueChange={(value) => setRiskProfile(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your risk profile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-2 text-xs text-gray-500">
                {riskProfile === "conservative" && "Lower risk, stable returns, capital preservation focus."}
                {riskProfile === "moderate" && "Balanced approach with moderate growth and reasonable risk."}
                {riskProfile === "aggressive" && "Higher risk tolerance, focus on maximizing long-term growth."}
              </div>
            </div>
          </Card>
          
          {/* Calculate Button */}
          <Button 
            className="w-full font-medium text-base"
            size="lg"
            onClick={calculateRetirementRequirements}
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Retirement Plan
          </Button>
          
          {/* Risk & Recommendation Card */}
          {showResults && (
            <Card className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                Risk Assessment
              </h3>
              
              {/* Risk Level Indicator */}
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <span className="text-xs">Low Risk</span>
                  <span className="text-xs">High Risk</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      shortfallOrSurplus >= 0 
                        ? "bg-green-500" 
                        : shortfallOrSurplus > -targetCorpus * 0.2 
                          ? "bg-yellow-500" 
                          : "bg-red-500"
                    }`}
                    style={{ 
                      width: shortfallOrSurplus >= 0 
                        ? "20%" 
                        : shortfallOrSurplus > -targetCorpus * 0.2 
                          ? "60%" 
                          : "100%" 
                    }}
                  />
                </div>
                <p className={`text-sm mt-2 ${
                  shortfallOrSurplus >= 0 
                    ? "text-green-600" 
                    : shortfallOrSurplus > -targetCorpus * 0.2 
                      ? "text-yellow-600" 
                      : "text-red-600"
                }`}>
                  {shortfallOrSurplus >= 0 
                    ? "On Track: Your current savings plan is likely to meet your retirement goals." 
                    : shortfallOrSurplus > -targetCorpus * 0.2 
                      ? "Moderate Risk: There's a gap in your retirement plan that needs attention." 
                      : "High Risk: Significant shortfall detected. Immediate action recommended."}
                </p>
              </div>
              
              {/* Recommendations */}
              <div>
                <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                <ul className="space-y-2">
                  {getRiskRecommendations().map((rec, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <div className="flex-shrink-0 mr-2 mt-0.5">
                        <div className="h-4 w-4 rounded-full bg-amber-100 flex items-center justify-center">
                          <Info className="h-2.5 w-2.5 text-amber-600" />
                        </div>
                      </div>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          )}
        </div>
      </div>
      
      {/* Results Section */}
      {showResults && (
        <div className="mt-10 space-y-8">
          {/* Visualizations */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart4 className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium">Retirement Journey Visualizer</h3>
              </div>
              
              <div className="flex items-center gap-2">
                <Tabs
                  value={chartView}
                  onValueChange={setChartView}
                  className="w-auto"
                >
                  <TabsList>
                    <TabsTrigger value="corpus">Corpus Growth</TabsTrigger>
                    <TabsTrigger value="income">Income Flow</TabsTrigger>
                    <TabsTrigger value="inflation">Inflation Impact</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center text-sm gap-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-blue-500 rounded-full mr-1.5"></div>
                  <span>Accumulation Phase</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-purple-500 rounded-full mr-1.5"></div>
                  <span>Withdrawal Phase</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-real-values"
                  checked={showRealValues}
                  onCheckedChange={setShowRealValues}
                />
                <Label 
                  htmlFor="show-real-values"
                  className="text-sm cursor-pointer"
                >
                  Show inflation-adjusted values
                </Label>
              </div>
            </div>
            
            {/* Interactive alert for retirement phase transition */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-md mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Your <span className="font-semibold">retirement transition point</span> occurs at age {retirementAge}. 
                    Before this, you're in the accumulation phase. After this, you begin the withdrawal phase.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Chart content based on selected view */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartView === "corpus" ? (
                  <AreaChart data={corpusGrowthData}>
                    <defs>
                      <linearGradient id="colorAccumulation" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorWithdrawal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="age"
                      label={{ 
                        value: 'Age', 
                        position: 'insideBottomRight', 
                        offset: -5 
                      }}
                    />
                    <YAxis 
                      tickFormatter={(value) => {
                        if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
                        if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
                        return value;
                      }}
                      label={{ 
                        value: 'Corpus Value (₹)', 
                        angle: -90, 
                        position: 'insideLeft' 
                      }}
                    />
                    <RTooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          const year = data.year;
                          return (
                            <div className="bg-white p-3 border rounded shadow-md">
                              <p className="text-sm font-medium">{`Year: ${year} (Age: ${label})`}</p>
                              <p className="text-blue-600 font-medium">{`Corpus: ${formatCurrency(data.corpus)}`}</p>
                              <p className="text-sm text-gray-700">
                                {data.phase === "accumulation" 
                                  ? `Building wealth: ${retirementAge - label} years to retirement` 
                                  : `Drawing income: ${label - retirementAge} years into retirement`
                                }
                              </p>
                              {data.phase === "withdrawal" && (
                                <p className="text-purple-600 font-medium">{`Monthly Income: ${formatCurrency(data.monthlyIncome)}`}</p>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="corpus" 
                      name="Retirement Corpus" 
                      stroke="#3b82f6" 
                      fillOpacity={1}
                      fill="url(#colorAccumulation)"
                      activeDot={{ r: 6 }}
                      dot={false}
                    />
                    {/* Reference line for retirement age */}
                    <ReferenceLine 
                      x={retirementAge} 
                      stroke="#6d28d9" 
                      strokeDasharray="3 3"
                      label={{
                        value: 'Retirement',
                        position: 'top',
                        fill: '#6d28d9',
                        fontSize: 12
                      }}
                    />
                  </AreaChart>
                ) : chartView === "income" ? (
                  <div className="flex flex-col items-center justify-center h-full p-8">
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8 text-center w-full max-w-2xl">
                      <h3 className="text-lg font-medium text-blue-700 mb-2">Retirement Monthly Income</h3>
                      <p className="text-3xl font-bold text-indigo-600 mb-2">
                        {formatCurrency(monthlyPension)}
                        <span className="text-sm text-gray-500 ml-2">per month</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        This is the sustainable monthly income you can withdraw during retirement.
                      </p>
                      <div className="mt-4 p-3 bg-white rounded border border-blue-100">
                        <h4 className="text-sm font-medium text-blue-700 mb-1">Income Flow During Retirement</h4>
                        <p className="text-sm text-gray-600">
                          Your monthly pension at retirement (age {retirementAge}) will begin at <span className="font-medium text-purple-600">{formatCurrency(monthlyPension)}</span>. 
                          Due to inflation, by age {lifeExpectancy}, your monthly income needs will increase to 
                          <span className="font-medium text-red-600"> {formatCurrency(monthlyPension * Math.pow(1 + inflationRate/100, lifeExpectancy - retirementAge))}</span>.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 justify-center w-full">
                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 flex-1 min-w-[200px] max-w-[300px]">
                        <h3 className="text-sm font-medium text-indigo-700 mb-2">Initial Withdrawal Rate</h3>
                        <p className="text-2xl font-bold text-indigo-600">
                          {((monthlyPension * 12) / targetCorpus * 100).toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Annual withdrawal as percentage of corpus
                        </p>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 flex-1 min-w-[200px] max-w-[300px]">
                        <h3 className="text-sm font-medium text-purple-700 mb-2">Years of Income</h3>
                        <p className="text-2xl font-bold text-purple-600">
                          {lifeExpectancy - retirementAge}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Years of retirement income planned
                        </p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex-1 min-w-[200px] max-w-[300px]">
                        <h3 className="text-sm font-medium text-green-700 mb-2">Total Withdrawals</h3>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(monthlyPension * 12 * (lifeExpectancy - retirementAge))}
                        </p>
                        <div className="flex flex-col">
                          <p className="text-xs text-gray-600 mt-1">
                            Lifetime income from retirement corpus
                          </p>
                          <p className="text-[10px] text-gray-500 mt-1">
                            Values adjusted for {inflationRate}% inflation
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <RLineChart data={[
                    {
                      age: currentAge,
                      label: "Today",
                      value: monthlyExpenses,
                      future: monthlyExpenses
                    },
                    {
                      age: Math.floor((retirementAge - currentAge) / 2) + currentAge,
                      label: "Mid-point",
                      value: monthlyExpenses,
                      future: monthlyExpenses * Math.pow(1 + inflationRate/100, Math.floor((retirementAge - currentAge) / 2))
                    },
                    {
                      age: retirementAge,
                      label: "Retirement",
                      value: monthlyExpenses,
                      future: monthlyExpenses * Math.pow(1 + inflationRate/100, retirementAge - currentAge)
                    },
                    {
                      age: Math.floor((lifeExpectancy - retirementAge) / 2) + retirementAge,
                      label: "Mid-retirement",
                      value: monthlyExpenses,
                      future: monthlyExpenses * Math.pow(1 + inflationRate/100, Math.floor((lifeExpectancy - retirementAge) / 2) + retirementAge - currentAge)
                    },
                    {
                      age: lifeExpectancy,
                      label: "Life Expectancy",
                      value: monthlyExpenses,
                      future: monthlyExpenses * Math.pow(1 + inflationRate/100, lifeExpectancy - currentAge)
                    }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" label={{ value: 'Age', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis 
                      tickFormatter={(value) => {
                        if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
                        if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                        return value;
                      }}
                      label={{ 
                        value: 'Monthly Expenses (₹)',
                        angle: -90, 
                        position: 'insideLeft' 
                      }}
                    />
                    <RTooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const valueNow = Number(payload[0]?.value || 0);
                          const valueFuture = Number(payload[1]?.value || 0);
                          const age = Number(label) || currentAge;
                          const inflationMultiple = valueFuture / valueNow;
                          
                          return (
                            <div className="bg-white p-3 border rounded shadow-md">
                              <p className="text-sm font-medium">{`Age: ${age}`}</p>
                              <p className="text-green-600 font-medium">{`Today's value: ${formatCurrency(valueNow)}/month`}</p>
                              <p className="text-red-600 font-medium">{`Future value: ${formatCurrency(valueFuture)}/month`}</p>
                              <p className="text-sm text-gray-600 mt-1">
                                {`Inflation effect: ${inflationMultiple.toFixed(1)}x`}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="Today's Value" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="future" name="Future Value (with Inflation)" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
                    {/* Reference line for Retirement age */}
                    <ReferenceLine x={retirementAge} stroke="#6d28d9" strokeDasharray="3 3" label={{ value: 'Retirement', position: 'top' }} />
                  </RLineChart>
                )}
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <div className="flex flex-col mb-3">
                <h4 className="text-sm font-medium mb-1">Key Financial Milestones</h4>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors cursor-pointer">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Calendar className="h-3.5 w-3.5 text-blue-500" />
                    <p className="text-xs font-medium text-blue-700">Today (Age {currentAge})</p>
                  </div>
                  <p className="text-lg font-medium text-blue-700">{formatCurrency(existingSavings)}</p>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-600">Starting Corpus</p>
                    <p className="text-xs font-medium text-blue-600">{new Date().getFullYear()}</p>
                  </div>
                </div>
                
                <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 hover:border-indigo-300 transition-colors cursor-pointer">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Briefcase className="h-3.5 w-3.5 text-indigo-500" />
                    <p className="text-xs font-medium text-indigo-700">Retirement (Age {retirementAge})</p>
                  </div>
                  <p className="text-lg font-medium text-indigo-700">{formatCurrency(targetCorpus)}</p>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-600">Target Corpus</p>
                    <p className="text-xs font-medium text-indigo-600">{new Date().getFullYear() + (retirementAge - currentAge)}</p>
                  </div>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 hover:border-purple-300 transition-colors cursor-pointer">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Target className="h-3.5 w-3.5 text-purple-500" />
                    <p className="text-xs font-medium text-purple-700">Final (Age {lifeExpectancy})</p>
                  </div>
                  <p className="text-lg font-medium text-purple-700">
                    {formatCurrency(incomeDrawdownData.length > 0 ? incomeDrawdownData[incomeDrawdownData.length - 1].corpus : 0)}
                  </p>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-600">Remaining Corpus</p>
                    <p className="text-xs font-medium text-purple-600">{new Date().getFullYear() + (lifeExpectancy - currentAge)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Scenario Testing */}
            <div className="mt-6 pt-5 border-t">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-4 w-4 text-blue-600" />
                <h4 className="text-sm font-medium">Quick Scenario Testing</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <Button 
                  variant="outline" 
                  className="p-3 h-auto flex flex-col items-center justify-center border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                  onClick={() => {
                    setMonthlyContribution(monthlyContribution * 1.25);
                    toast({
                      title: "Scenario Updated",
                      description: "Increased monthly SIP by 25% to see the impact.",
                    });
                  }}
                >
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <ArrowUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium">Increase SIP by 25%</p>
                  <p className="text-xs text-gray-500 mt-1 px-1">
                    Boost your retirement corpus
                  </p>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="p-3 h-auto flex flex-col items-center justify-center border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50"
                  onClick={() => {
                    setRetirementAge(retirementAge + 2);
                    toast({
                      title: "Scenario Updated",
                      description: "Delayed retirement by 2 years to see the impact.",
                    });
                  }}
                >
                  <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                    <Clock className="h-4 w-4 text-indigo-600" />
                  </div>
                  <p className="text-sm font-medium">Delay Retirement by 2 Years</p>
                  <p className="text-xs text-gray-500 mt-1 px-1">
                    Work longer, retire better
                  </p>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="p-3 h-auto flex flex-col items-center justify-center border-purple-200 hover:border-purple-400 hover:bg-purple-50"
                  onClick={() => {
                    setPreRetirementReturn(preRetirementReturn + 1);
                    toast({
                      title: "Scenario Updated",
                      description: "Increased return expectation by 1% to see the impact.",
                    });
                  }}
                >
                  <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                  </div>
                  <p className="text-sm font-medium">Increase Returns by 1%</p>
                  <p className="text-xs text-gray-500 mt-1 px-1">
                    Grow your wealth faster
                  </p>
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Personalized Insights */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium">Smart Retirement Insights</h3>
              </div>
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200" variant="secondary">
                <div className="flex items-center gap-1">
                  <span className="animate-pulse bg-blue-500 h-1.5 w-1.5 rounded-full"></span>
                  AI Powered
                </div>
              </Badge>
            </div>
            
            <ul className="space-y-3">
              {getPersonalizedInsights().map((insight, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-0.5">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <Zap className="h-3 w-3 text-blue-600" />
                    </div>
                  </div>
                  <span className="text-sm text-gray-700">{insight}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2">
              {/* Action Button 1 */}
              <div className="bg-white p-4 rounded-md border border-blue-100 shadow-sm hover:border-blue-300 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <IndianRupee className="h-4 w-4 text-green-600" />
                  </div>
                  <h4 className="text-sm font-medium">Optimize Your SIP</h4>
                </div>
                <p className="text-xs text-gray-600">
                  {shortfallOrSurplus < 0 ? 
                    `Increase your monthly SIP by ₹${Math.abs(Math.ceil((requiredMonthlySIP - monthlyContribution) / 500) * 500).toLocaleString('en-IN')} to reach your target.` :
                    `You're on track! Consider investing ₹${Math.ceil(monthlyContribution * 0.2 / 500) * 500} more monthly for additional security.`
                  }
                </p>
              </div>
              
              {/* Action Button 2 */}
              <div className="bg-white p-4 rounded-md border border-blue-100 shadow-sm hover:border-blue-300 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Target className="h-4 w-4 text-blue-600" />
                  </div>
                  <h4 className="text-sm font-medium">Adjust Retirement Age</h4>
                </div>
                <p className="text-xs text-gray-600">
                  {shortfallOrSurplus < 0 ? 
                    `Working ${Math.min(5, Math.ceil(Math.abs(shortfallOrSurplus) / targetCorpus * 10))} more years can significantly improve your retirement readiness.` :
                    `You could retire up to ${Math.min(3, Math.floor(shortfallOrSurplus / targetCorpus * 10))} years earlier than planned given your current corpus.`
                  }
                </p>
              </div>
            </div>
            
            <div className="mt-4 bg-white p-4 rounded-md border border-blue-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-4 w-4 text-blue-600" />
                <h4 className="text-sm font-medium">Recommended Allocation Strategy</h4>
              </div>
              <div className="mt-3 mb-4">
                <div className="flex space-x-1 rounded-lg overflow-hidden h-3">
                  <div className="bg-blue-600" style={{ width: `${Math.max(5, 70 - (retirementAge - currentAge))}%` }}></div>
                  <div className="bg-amber-500" style={{ width: `${Math.min(70, Math.max(20, (retirementAge - currentAge) * 2))}%` }}></div>
                  <div className="bg-green-500" style={{ width: `${Math.min(35, (retirementAge - currentAge))}%` }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>Equity</span>
                  <span>Debt</span>
                  <span>Gold</span>
                </div>
              </div>
              <p className="text-xs text-gray-600">
                {retirementAge - currentAge > 15 ?
                  "With over 15 years to retirement, we recommend an aggressive equity-focused portfolio (65-70% equity, 20-25% debt, 5-10% gold)." :
                  retirementAge - currentAge > 7 ?
                    "With 7-15 years to retirement, we recommend a balanced portfolio (50% equity, 40% debt, 10% gold)." :
                    "With less than 7 years to retirement, we recommend a conservative portfolio (30% equity, 60% debt, 10% gold)."
                }
              </p>
            </div>
            
            <div className="mt-4 bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-md border border-blue-100">
              <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-blue-600" />
                Time-Sensitive Actions
              </h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5 mr-2">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <Check className="h-3 w-3 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Max out EPF/PPF</p>
                    <p className="text-[10px] text-gray-500">For tax benefits & guaranteed returns</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5 mr-2">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <Check className="h-3 w-3 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Set up automatic SIPs</p>
                    <p className="text-[10px] text-gray-500">For disciplined wealth building</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5 mr-2">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <Check className="h-3 w-3 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Review your plan yearly</p>
                    <p className="text-[10px] text-gray-500">To stay on track with your goals</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5 mr-2">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <Check className="h-3 w-3 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Get adequate insurance</p>
                    <p className="text-[10px] text-gray-500">To protect your retirement savings</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Detailed Analysis Table */}
          <Card className="p-6">
            <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
              <Sigma className="h-5 w-5 text-blue-600" />
              Detailed Analysis
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-2 font-medium border">Year</th>
                    <th className="px-4 py-2 font-medium border">Age</th>
                    <th className="px-4 py-2 font-medium text-right border">Corpus Start (₹)</th>
                    <th className="px-4 py-2 font-medium text-right border">Contribution (₹)</th>
                    <th className="px-4 py-2 font-medium text-right border">Returns (₹)</th>
                    <th className="px-4 py-2 font-medium text-right border">Corpus End (₹)</th>
                    <th className="px-4 py-2 font-medium text-right border">Monthly Income (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedAnalysis.slice(0, 5).map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 border">{item.year}</td>
                      <td className="px-4 py-2 border">{item.age}</td>
                      <td className="px-4 py-2 text-right border">{item.corpusStart.toLocaleString('en-IN', {maximumFractionDigits: 0})}</td>
                      <td className="px-4 py-2 text-right border">{item.contribution.toLocaleString('en-IN', {maximumFractionDigits: 0})}</td>
                      <td className="px-4 py-2 text-right border text-green-600">{item.returnsEarned.toLocaleString('en-IN', {maximumFractionDigits: 0})}</td>
                      <td className="px-4 py-2 text-right border font-medium">{item.corpusEnd.toLocaleString('en-IN', {maximumFractionDigits: 0})}</td>
                      <td className="px-4 py-2 text-right border text-purple-600">{
                        item.postRetirementIncome > 0 
                          ? (item.postRetirementIncome / 12).toLocaleString('en-IN', {maximumFractionDigits: 0})
                          : "-"
                      }</td>
                    </tr>
                  ))}
                  
                  {/* Retirement Year */}
                  <tr className="bg-blue-50 border-t-2 border-b-2 border-blue-200">
                    <td className="px-4 py-2 border">{new Date().getFullYear() + (retirementAge - currentAge)}</td>
                    <td className="px-4 py-2 border font-medium">{retirementAge} (Retirement)</td>
                    <td className="px-4 py-2 text-right border">{
                      detailedAnalysis
                        .find(item => item.age === retirementAge)?.corpusStart
                        .toLocaleString('en-IN', {maximumFractionDigits: 0})
                    }</td>
                    <td className="px-4 py-2 text-right border">-</td>
                    <td className="px-4 py-2 text-right border text-green-600">{
                      detailedAnalysis
                        .find(item => item.age === retirementAge)?.returnsEarned
                        .toLocaleString('en-IN', {maximumFractionDigits: 0})
                    }</td>
                    <td className="px-4 py-2 text-right border font-medium">{
                      detailedAnalysis
                        .find(item => item.age === retirementAge)?.corpusEnd
                        .toLocaleString('en-IN', {maximumFractionDigits: 0})
                    }</td>
                    <td className="px-4 py-2 text-right border text-purple-600">-</td>
                  </tr>
                  
                  {/* Post-retirement years (first few) */}
                  {detailedAnalysis
                    .filter(item => item.age > retirementAge && item.age <= retirementAge + 3)
                    .map((item, index) => (
                      <tr key={`post-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-2 border">{item.year}</td>
                        <td className="px-4 py-2 border">{item.age}</td>
                        <td className="px-4 py-2 text-right border">{item.corpusStart.toLocaleString('en-IN', {maximumFractionDigits: 0})}</td>
                        <td className="px-4 py-2 text-right border">-</td>
                        <td className="px-4 py-2 text-right border text-green-600">{item.returnsEarned.toLocaleString('en-IN', {maximumFractionDigits: 0})}</td>
                        <td className="px-4 py-2 text-right border font-medium">{item.corpusEnd.toLocaleString('en-IN', {maximumFractionDigits: 0})}</td>
                        <td className="px-4 py-2 text-right border text-purple-600">{
                          (item.postRetirementIncome / 12).toLocaleString('en-IN', {maximumFractionDigits: 0})
                        }</td>
                      </tr>
                    ))
                  }
                  
                  {/* Last year */}
                  <tr className="bg-purple-50 border-t-2 border-purple-200">
                    <td className="px-4 py-2 border">{
                      detailedAnalysis[detailedAnalysis.length - 1].year
                    }</td>
                    <td className="px-4 py-2 border font-medium">{
                      detailedAnalysis[detailedAnalysis.length - 1].age
                    }</td>
                    <td className="px-4 py-2 text-right border">{
                      detailedAnalysis[detailedAnalysis.length - 1].corpusStart
                        .toLocaleString('en-IN', {maximumFractionDigits: 0})
                    }</td>
                    <td className="px-4 py-2 text-right border">-</td>
                    <td className="px-4 py-2 text-right border text-green-600">{
                      detailedAnalysis[detailedAnalysis.length - 1].returnsEarned
                        .toLocaleString('en-IN', {maximumFractionDigits: 0})
                    }</td>
                    <td className="px-4 py-2 text-right border font-medium">{
                      detailedAnalysis[detailedAnalysis.length - 1].corpusEnd
                        .toLocaleString('en-IN', {maximumFractionDigits: 0})
                    }</td>
                    <td className="px-4 py-2 text-right border text-purple-600">{
                      (detailedAnalysis[detailedAnalysis.length - 1].postRetirementIncome / 12)
                        .toLocaleString('en-IN', {maximumFractionDigits: 0})
                    }</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="text-xs text-center text-gray-500 mt-3">
                Showing partial data. Calculations are based on assumptions and actual results may vary.
              </div>
            </div>
          </Card>
          
          {/* Retirement-specific Financial Disclaimer */}
          <div className="mt-6">
            <FinancialDisclaimer
              variant="default"
              calculatorType="retirement"
              size="md"
            />
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}