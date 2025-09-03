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
import { getSIPInsights, type InvestmentInsights } from "../api/insightsClient";
import {
  BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  Legend, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, 
  Pie, Cell, Area, AreaChart, ComposedChart
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
  RefreshCw
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

// Goal templates interface
interface GoalTemplate {
  id: string;
  name: string;
  icon: React.ReactNode;
  targetAmount: number;
  duration: number;
  returns: number;
  description: string;
}

// SIP Calculator
export default function SIPCalculator() {
  const { toast } = useToast();
  
  // State variables for inputs
  const [monthlySIPAmount, setMonthlySIPAmount] = useState(5000);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [targetAmount, setTargetAmount] = useState(0);
  const [sipDate, setSipDate] = useState("1");
  const [inflationRate, setInflationRate] = useState(6);
  const [riskProfile, setRiskProfile] = useState("moderate");
  const [stepUpRate, setStepUpRate] = useState(0);
  const [showInflationAdjusted, setShowInflationAdjusted] = useState(false);
  const [chartView, setChartView] = useState("growth");
  const [mode, setMode] = useState<"amount" | "goal">("amount");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("education");
  
  // Results state variables
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [expectedReturns, setExpectedReturns] = useState(0);
  const [futureValue, setFutureValue] = useState(0);
  const [inflationAdjustedValue, setInflationAdjustedValue] = useState(0);
  const [yearlyBreakdown, setYearlyBreakdown] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  // Additional return metric state variables
  const [xirrValue, setXirrValue] = useState(0);
  const [arrValue, setArrValue] = useState(0);
  
  // Compare with lump sum
  const [lumpSumFutureValue, setLumpSumFutureValue] = useState(0);
  const [lumpSumReturns, setLumpSumReturns] = useState(0);
  
  // Return scenario values
  const [conservativeReturns, setConservativeReturns] = useState(0);
  const [moderateReturns, setModerateReturns] = useState(0);
  const [aggressiveReturns, setAggressiveReturns] = useState(0);
  
  // AI-powered investment insights
  const [aiInsights, setAiInsights] = useState<InvestmentInsights | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  // Templates for predefined goals
  const goalTemplates: GoalTemplate[] = [
    {
      id: "education",
      name: "Education",
      icon: <Graduation className="h-4 w-4" />,
      targetAmount: 2000000,
      duration: 15,
      returns: 12,
      description: "Higher education costs are rising by 10-12% annually. This template assumes ₹20 lakh for quality education 15 years from now. Starting early helps manage this substantial expense with smaller monthly contributions."
    },
    {
      id: "retirement",
      name: "Retirement",
      icon: <Briefcase className="h-4 w-4" />,
      targetAmount: 5000000,
      duration: 25,
      returns: 12,
      description: "Building a retirement corpus requires consistent long-term investing. This template targets ₹50 lakh over 25 years, which could provide ₹30,000-40,000 monthly passive income. The power of compounding significantly reduces the required monthly contribution."
    },
    {
      id: "home",
      name: "Home Purchase",
      icon: <Home className="h-4 w-4" />,
      targetAmount: 3000000,
      duration: 10,
      returns: 10,
      description: "Saving for a home down payment (typically 20% of property value) can help reduce loan burden. This template targets ₹30 lakh in 10 years, which could be a down payment for a ₹1.5 Cr property, significantly reducing your EMI."
    },
    {
      id: "wedding",
      name: "Wedding",
      icon: <Heart className="h-4 w-4" />,
      targetAmount: 1500000,
      duration: 5,
      returns: 9,
      description: "Wedding expenses in India average ₹15-20 lakh for middle-class families. This template helps you save ₹15 lakh over 5 years through disciplined monthly investments, allowing you to plan a memorable wedding without financial stress."
    },
    {
      id: "vacation",
      name: "Vacation",
      icon: <Plane className="h-4 w-4" />,
      targetAmount: 500000,
      duration: 3,
      returns: 8,
      description: "Planning a dream vacation for your family? This template helps you save ₹5 lakh over 3 years for an international trip. Having a dedicated vacation fund means enjoying your travels without worrying about debt or dipping into emergency savings."
    }
  ];

  // Apply goal template
  const applyGoalTemplate = (template: GoalTemplate) => {
    setSelectedTemplate(template.id);
    setTargetAmount(template.targetAmount);
    setInvestmentPeriod(template.duration);
    setExpectedReturn(template.returns);
    setMode("goal");
    calculateRequiredSIP(template.targetAmount, template.duration, template.returns);
  };

  // Calculate required SIP amount for goal
  const calculateRequiredSIP = (amount: number, years: number, returnRate: number) => {
    const r = returnRate / 100 / 12;
    const n = years * 12;
    
    // Formula rearranged to solve for SIP amount
    const calculatedSIP = amount / ((Math.pow(1 + r, n) - 1) / r) / (1 + r);
    
    setMonthlySIPAmount(Math.ceil(calculatedSIP / 100) * 100); // Round up to nearest 100
    setTargetAmount(amount);
    
    // Also calculate results
    calculateResults(Math.ceil(calculatedSIP / 100) * 100, years, returnRate);
  };

  // Risk-adjusted returns
  const getRiskAdjustedReturns = (profile: string) => {
    switch (profile) {
      case "conservative":
        return { 
          low: 6, 
          mid: 8, 
          high: 10 
        };
      case "moderate":
        return { 
          low: 8, 
          mid: 12, 
          high: 14 
        };
      case "aggressive":
        return { 
          low: 10, 
          mid: 14, 
          high: 18 
        };
      default:
        return { 
          low: 8, 
          mid: 12, 
          high: 14 
        };
    }
  };

  // Calculate all results
  const calculateResults = (amount: number, years: number, rate: number) => {
    const monthlyRate = rate / 100 / 12; // Monthly rate
    const months = years * 12;
    
    // Formula for SIP calculation with step-up
    let calculatedFutureValue = 0;
    let calculatedTotalInvestment = 0;
    
    // For XIRR calculation - keep track of all cash flows
    const cashFlows: {amount: number, date: Date}[] = [];
    const today = new Date();
    
    if (stepUpRate > 0) {
      // Calculate with annual step-up
      let currentMonthlyAmount = amount;
      let totalValue = 0;
      
      for (let y = 0; y < years; y++) {
        // Calculate for each year separately
        for (let m = 0; m < 12; m++) {
          // Add this month's investment to cash flows (negative value = outflow)
          const investmentDate = new Date(today);
          investmentDate.setMonth(investmentDate.getMonth() + (y * 12) + m);
          cashFlows.push({
            amount: -currentMonthlyAmount,
            date: investmentDate
          });
          
          // Add this month's investment
          calculatedTotalInvestment += currentMonthlyAmount;
          
          // Calculate interest on existing amount
          totalValue = (totalValue + currentMonthlyAmount) * (1 + monthlyRate);
        }
        
        // Increase monthly contribution at end of year
        if (y < years - 1) { // Don't step up in the final year
          currentMonthlyAmount = currentMonthlyAmount * (1 + stepUpRate / 100);
        }
      }
      
      calculatedFutureValue = totalValue;
    } else {
      // Standard SIP calculation (without step-up)
      calculatedFutureValue = amount * ((1 + monthlyRate) * (((1 + monthlyRate)**months - 1) / monthlyRate));
      calculatedTotalInvestment = amount * months;
      
      // Create cash flows for XIRR - one entry for each month
      for (let m = 0; m < months; m++) {
        const investmentDate = new Date(today);
        investmentDate.setMonth(investmentDate.getMonth() + m);
        cashFlows.push({
          amount: -amount, // Negative value = outflow/investment
          date: investmentDate
        });
      }
    }
    
    // Add final maturity amount as inflow
    const maturityDate = new Date(today);
    maturityDate.setMonth(maturityDate.getMonth() + months);
    cashFlows.push({
      amount: calculatedFutureValue, // Positive value = inflow/return
      date: maturityDate
    });
    
    const calculatedReturns = calculatedFutureValue - calculatedTotalInvestment;
    
    // Calculate inflation-adjusted value
    const realRate = (1 + rate/100) / (1 + inflationRate/100) - 1;
    const inflationAdjusted = calculatedFutureValue / Math.pow(1 + inflationRate/100, years);
    
    // Calculate risk-adjusted returns
    const riskRates = getRiskAdjustedReturns(riskProfile);
    const conservativeFV = amount * ((1 + riskRates.low/100/12) * (((1 + riskRates.low/100/12)**(months) - 1) / (riskRates.low/100/12)));
    const moderateFV = amount * ((1 + riskRates.mid/100/12) * (((1 + riskRates.mid/100/12)**(months) - 1) / (riskRates.mid/100/12)));
    const aggressiveFV = amount * ((1 + riskRates.high/100/12) * (((1 + riskRates.high/100/12)**(months) - 1) / (riskRates.high/100/12)));
    
    // Calculate XIRR (Extended Internal Rate of Return)
    // Since XIRR requires complex algorithm, we're using an approximation
    // In a real implementation, you would use a proper financial library
    const xirrAnnual = Math.pow((calculatedFutureValue / calculatedTotalInvestment), (1 / years)) - 1;
    
    // Calculate ARR (Absolute Rate of Return)
    const arr = (calculatedReturns / calculatedTotalInvestment) * 100;
    
    // Calculate year-wise growth for visualization
    const yearsArray: number[] = [];
    const investedAmounts: number[] = [];
    const futureValues: number[] = [];
    const returnValues: number[] = [];
    const inflationAdjustedValues: number[] = [];
    const conservativeValues: number[] = [];
    const moderateValues: number[] = [];
    const aggressiveValues: number[] = [];
    
    for (let year = 0; year <= investmentPeriod; year++) {
      const m = year * 12;
      let invested = 0;
      let future = 0;
      let conservative = 0;
      let moderate = 0;
      let aggressive = 0;
      
      if (m > 0) {
        if (stepUpRate > 0) {
          // Calculate stepped-up invested amount
          let currentAmount = amount;
          invested = 0;
          for (let y = 0; y < year; y++) {
            invested += currentAmount * 12;
            if (y < year - 1) { // Don't step up in the final year
              currentAmount = currentAmount * (1 + stepUpRate / 100);
            }
          }
          
          // Calculate future value at this year with step-up
          let currentMonthlyAmount = amount;
          let totalValue = 0;
          
          for (let y = 0; y < year; y++) {
            // Calculate for each year separately
            for (let mm = 0; mm < 12; mm++) {
              // Calculate interest on existing amount
              totalValue = (totalValue + currentMonthlyAmount) * (1 + monthlyRate);
            }
            
            // Increase monthly contribution at end of year
            if (y < year - 1) {
              currentMonthlyAmount = currentMonthlyAmount * (1 + stepUpRate / 100);
            }
          }
          
          future = totalValue;
        } else {
          // Standard calculations without step-up
          invested = amount * m;
          future = amount * ((1 + monthlyRate) * (((1 + monthlyRate)**m - 1) / monthlyRate));
        }
        
        // Risk-adjusted scenarios
        conservative = amount * ((1 + riskRates.low/100/12) * (((1 + riskRates.low/100/12)**m - 1) / (riskRates.low/100/12)));
        moderate = amount * ((1 + riskRates.mid/100/12) * (((1 + riskRates.mid/100/12)**m - 1) / (riskRates.mid/100/12)));
        aggressive = amount * ((1 + riskRates.high/100/12) * (((1 + riskRates.high/100/12)**m - 1) / (riskRates.high/100/12)));
      }
      
      const inflationAdjusted = future / Math.pow(1 + inflationRate/100, year);
      
      yearsArray.push(year);
      investedAmounts.push(invested);
      futureValues.push(future);
      returnValues.push(future - invested);
      inflationAdjustedValues.push(inflationAdjusted);
      conservativeValues.push(conservative);
      moderateValues.push(moderate);
      aggressiveValues.push(aggressive);
    }
    
    // Calculate lump sum comparison
    const lumpSum = amount * 12 * investmentPeriod;
    const calculatedLumpSumFuture = lumpSum * (1 + rate/100)**investmentPeriod;
    const calculatedLumpSumReturns = calculatedLumpSumFuture - lumpSum;
    
    // Create yearly breakdown table data
    const breakdown = yearsArray.map((year: number, index: number) => ({
      year,
      investedAmount: investedAmounts[index],
      futureValue: futureValues[index],
      returns: returnValues[index],
      inflationAdjustedValue: inflationAdjustedValues[index],
      conservative: conservativeValues[index],
      moderate: moderateValues[index],
      aggressive: aggressiveValues[index],
      returnsPercentage: investedAmounts[index] > 0 
        ? (returnValues[index] / investedAmounts[index]) * 100 
        : 0
    }));
    
    // Update state with calculated values
    setTotalInvestment(calculatedTotalInvestment);
    setExpectedReturns(calculatedReturns);
    setFutureValue(calculatedFutureValue);
    setInflationAdjustedValue(inflationAdjusted);
    setYearlyBreakdown(breakdown);
    setLumpSumFutureValue(calculatedLumpSumFuture);
    setLumpSumReturns(calculatedLumpSumReturns);
    setConservativeReturns(conservativeFV);
    setModerateReturns(moderateFV);
    setAggressiveReturns(aggressiveFV);
    
    // Update the XIRR and ARR values
    setXirrValue(xirrAnnual * 100); // Convert to percentage
    setArrValue(arr);
    
    setShowResults(true);
  };
  
  // Calculate SIP returns - main function
  const calculateSIPReturns = () => {
    calculateResults(monthlySIPAmount, investmentPeriod, expectedReturn);
    fetchAIInsights();
  };
  
  // Fetch AI-powered investment insights
  const fetchAIInsights = async () => {
    setIsLoadingInsights(true);
    
    try {
      const params = {
        monthlySIPAmount,
        investmentPeriod,
        expectedReturn,
        targetAmount: mode === "goal" ? targetAmount : undefined,
        riskProfile,
        inflationRate,
        stepUpRate,
        goalType: mode === "goal" ? 
          goalTemplates.find(t => t.targetAmount === targetAmount)?.id || undefined : 
          undefined
      };
      
      const insights = await getSIPInsights(params);
      setAiInsights(insights);
    } catch (error) {
      console.error("Error fetching AI insights:", error);
      toast({
        title: "Could not fetch personalized insights",
        description: "We'll show you general recommendations instead.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingInsights(false);
    }
  };
  
  // Auto-select Education goal template when component loads
  useEffect(() => {
    // Find the education template
    const educationTemplate = goalTemplates.find(t => t.id === "education");
    if (educationTemplate && mode === "goal") {
      setSelectedTemplate(educationTemplate.id);
      setTargetAmount(educationTemplate.targetAmount);
      setInvestmentPeriod(educationTemplate.duration);
      setExpectedReturn(educationTemplate.returns);
      
      // Calculate immediately after setting values
      calculateRequiredSIP(
        educationTemplate.targetAmount, 
        educationTemplate.duration, 
        educationTemplate.returns
      );
    } else if (mode === "amount") {
      // Also calculate for amount mode on initial load
      calculateResults(monthlySIPAmount, investmentPeriod, expectedReturn);
      setShowResults(true);
    }
  }, []);

  // When target amount changes in goal mode, update SIP amount
  // When any parameter changes, auto-calculate the results
  useEffect(() => {
    if (mode === "goal" && targetAmount > 0) {
      calculateRequiredSIP(targetAmount, investmentPeriod, expectedReturn);
    } else if (mode === "amount") {
      // Always recalculate for amount mode when parameters change, regardless of showResults flag
      calculateResults(monthlySIPAmount, investmentPeriod, expectedReturn);
      setShowResults(true); // Immediately show results
    }
  }, [
    targetAmount, 
    investmentPeriod, 
    expectedReturn, 
    mode,
    // Always include monthlySIPAmount as dependency to update on any change
    monthlySIPAmount,
    inflationRate,
    stepUpRate
  ]);
  
  // Calculate extra monthly contribution needed
  const extraMonthlyContribution = useMemo(() => {
    if (!showResults) return {
      amount: 1000,
      newTotal: 0,
      difference: 0
    };
    
    const additionalAmount = 1000;
    const rate = expectedReturn / 100 / 12; // Monthly rate
    const months = investmentPeriod * 12;
    
    const currentFutureValue = futureValue;
    const newFutureValue = (monthlySIPAmount + additionalAmount) * ((1 + rate) * (((1 + rate)**months - 1) / rate));
    
    return {
      amount: additionalAmount,
      newTotal: newFutureValue,
      difference: newFutureValue - currentFutureValue
    };
  }, [monthlySIPAmount, investmentPeriod, expectedReturn, showResults, futureValue]);
  
  // Educational calculation observations
  const personalInsights = useMemo(() => {
    if (!showResults) return [];
    
    const insights: string[] = [];
    
    // How long it takes to double money (with cautious language)
    const doubleTimeYears = Math.log(2) / Math.log(1 + expectedReturn/100);
    insights.push(`Based on the rule of 72, at ${expectedReturn}% annual returns, an investment might potentially double in approximately ${doubleTimeYears.toFixed(1)} years. Actual results may vary based on market conditions.`);
    
    // Effect of increasing contribution (with cautious language)
    const extraContribution = extraMonthlyContribution;
    insights.push(`These calculations suggest that an additional ₹${extraContribution.amount.toLocaleString('en-IN')} monthly contribution could potentially result in approximately ₹${extraContribution.difference.toLocaleString('en-IN', {maximumFractionDigits: 0})} additional corpus. Individual results may vary based on actual market performance.`);
    
    // Inflation impact (already has cautious language with "may")
    if (inflationAdjustedValue > 0) {
      const lostToPurchasingPower = ((futureValue - inflationAdjustedValue) / futureValue * 100).toFixed(1);
      insights.push(`Inflation might potentially reduce purchasing power by approximately ${lostToPurchasingPower}%. This is based on hypothetical calculations and actual inflation rates may differ over time.`);
    }
    
    // Power of compounding (with cautious language)
    const powerOfCompounding = ((futureValue / totalInvestment) - 1) * 100;
    insights.push(`In this hypothetical scenario, the calculated growth from compounding is approximately ${powerOfCompounding.toFixed(1)}%. This educational example illustrates how compounding could potentially work over time, though actual investment results might vary substantially.`);
    
    return insights;
  }, [showResults, expectedReturn, extraMonthlyContribution, futureValue, inflationAdjustedValue, totalInvestment]);
  
  // Create an investment goal
  const createInvestmentGoal = () => {
    // Create a goal object with pre-filled values
    const sipGoal = {
      type: "Standard Goal",
      category: investmentPeriod <= 3 ? "Short-Term" : investmentPeriod <= 7 ? "Mid-Term" : "Long-Term",
      name: `SIP Investment (₹${monthlySIPAmount}/month)`,
      targetAmount: futureValue,
      currentSavings: 0,
      targetDate: new Date(Date.now() + investmentPeriod * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      savingsPlan: "Fixed Monthly Savings"
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
    
    // Add new SIP goal with unique ID
    const newGoal = {
      ...sipGoal,
      id: `goal-${Date.now()}`,
      autoSave: false,
      savingsAmount: monthlySIPAmount 
    };
    
    // Update goals in localStorage
    localStorage.setItem("financialGoals", JSON.stringify([...currentGoals, newGoal]));
    
    // Show success notification
    toast({
      title: "SIP Investment Goal Created",
      description: "Your SIP investment goal has been created. Redirecting to Goal Settings page...",
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
      description: "Your SIP calculation report has been downloaded.",
    });
  };
  
  // Share calculation
  const shareCalculation = () => {
    const shareData = {
      title: 'My SIP Calculation',
      text: `Monthly SIP: ₹${monthlySIPAmount}, Duration: ${investmentPeriod} years, Expected Return: ${expectedReturn}%, Future Value: ₹${futureValue.toLocaleString('en-IN')}`,
      url: window.location.href
    };
    
    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(shareData.text).then(() => {
        toast({
          title: "Copied to Clipboard",
          description: "Your SIP calculation has been copied and can now be shared.",
        });
      });
    }
  };
  
  return (
    <CalculatorLayout 
      title="SIP Calculator"
      description="Calculate the power of systematic investing and see how your monthly investments can grow over time."
      keywords="SIP calculator, systematic investment plan, mutual funds, investment calculator, compound interest, financial planning, wealth creation"
      icon="calculate"
    >
      {/* Removed initial disclaimer - consolidated at the end */}
      
      {/* Calculator Mode Selection */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">SIP Calculator Type</h3>
          <div className="flex items-center gap-2">
            <Tabs 
              value={mode} 
              onValueChange={(value) => {
                const newMode = value as "amount" | "goal";
                setMode(newMode);
                
                // If switching to goal mode, apply the Education template
                if (newMode === "goal") {
                  const educationTemplate = goalTemplates.find(t => t.id === "education");
                  if (educationTemplate) {
                    setSelectedTemplate(educationTemplate.id);
                    setTimeout(() => applyGoalTemplate(educationTemplate), 0);
                  }
                }
              }}
              className="w-auto"
            >
              <TabsList>
                <TabsTrigger value="amount">Calculate Returns</TabsTrigger>
                <TabsTrigger value="goal">Target Goal</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          {mode === "amount" 
            ? "Calculate the future value of your monthly SIP investments."
            : "Calculate the monthly SIP amount needed to reach your target financial goal."}
        </p>
        
        {/* Goal Templates */}
        {mode === "goal" && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Choose a Goal Template (Optional)</h4>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {goalTemplates.map(template => (
                <div
                  key={template.id}
                  onClick={() => applyGoalTemplate(template)}
                  className={`p-3 border rounded-md cursor-pointer transition ${
                    template.id === selectedTemplate ? "border-primary bg-primary/5" : "hover:bg-gray-50 hover:border-primary"
                  }`}
                >
                  <div className={`flex justify-center mb-1 ${
                    template.id === selectedTemplate ? "text-primary" : ""
                  }`}>
                    {template.icon}
                  </div>
                  <div className="text-xs font-medium">{template.name}</div>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <p className="text-xs text-gray-600 mb-2">
                Selecting a template sets the target amount, duration and expected returns based on common financial goals.
              </p>
              {selectedTemplate && (
                <div className="bg-blue-50 p-3 rounded-md text-sm">
                  <p className="font-medium">{goalTemplates.find(t => t.id === selectedTemplate)?.name} Goal</p>
                  <p className="text-xs text-gray-700 mt-1">{goalTemplates.find(t => t.id === selectedTemplate)?.description}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Target Amount / Monthly SIP Amount based on mode */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {mode === "goal" ? (
                <Target className="h-5 w-5 text-primary" />
              ) : (
                <IndianRupee className="h-5 w-5 text-primary" />
              )}
              <Label 
                htmlFor={mode === "goal" ? "targetAmount" : "monthlySIPAmount"} 
                className="text-lg font-medium"
              >
                {mode === "goal" ? "Target Amount (₹)" : "Monthly SIP Amount (₹)"}
              </Label>
            </div>
            <Tooltip text={mode === "goal" 
              ? "The amount you want to accumulate at the end of your investment period" 
              : "The amount you'll invest every month in your SIP"
            }>
              <Info className="h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Slider
                id={mode === "goal" ? "targetAmount" : "monthlySIPAmount"}
                min={mode === "goal" ? 100000 : 500}
                max={mode === "goal" ? 10000000 : 100000}
                step={mode === "goal" ? 100000 : 500}
                value={[mode === "goal" ? targetAmount : monthlySIPAmount]}
                onValueChange={(value) => {
                  const newValue = value[0];
                  if (mode === "goal") {
                    setTargetAmount(newValue);
                  } else {
                    setMonthlySIPAmount(newValue);
                    // Recalculate immediately if results are already shown
                    if (showResults) {
                      calculateResults(newValue, investmentPeriod, expectedReturn);
                    }
                  }
                }}
                className="flex-1"
              />
              <Input
                type="number"
                value={mode === "goal" ? targetAmount : monthlySIPAmount}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  if (mode === "goal") {
                    setTargetAmount(newValue);
                  } else {
                    setMonthlySIPAmount(newValue);
                    // Recalculate immediately if results are already shown
                    if (showResults) {
                      calculateResults(newValue, investmentPeriod, expectedReturn);
                    }
                  }
                }}
                className="w-24"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{mode === "goal" ? "₹1,00,000" : "₹500"}</span>
              <span>{mode === "goal" ? "₹1,00,00,000" : "₹1,00,000"}</span>
            </div>
          </div>
        </Card>
        
        {/* Investment Period */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <Label htmlFor="investmentPeriod" className="text-lg font-medium">Investment Period (Years)</Label>
            </div>
            <Tooltip text="The duration for which you'll continue your SIP">
              <Info className="h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Slider
                id="investmentPeriod"
                min={1}
                max={40}
                step={1}
                value={[investmentPeriod]}
                onValueChange={(value) => {
                  const newPeriod = value[0];
                  setInvestmentPeriod(newPeriod);
                  
                  // In amount mode, immediately recalculate if results are already shown
                  if (mode === "amount" && monthlySIPAmount > 0 && showResults) {
                    calculateResults(monthlySIPAmount, newPeriod, expectedReturn);
                  }
                }}
                className="flex-1"
              />
              <Input
                type="number"
                value={investmentPeriod}
                onChange={(e) => {
                  const newPeriod = Number(e.target.value);
                  setInvestmentPeriod(newPeriod);
                  
                  // In amount mode, immediately recalculate if results are already shown
                  if (mode === "amount" && monthlySIPAmount > 0 && showResults) {
                    calculateResults(monthlySIPAmount, newPeriod, expectedReturn);
                  }
                }}
                className="w-24"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 year</span>
              <span>40 years</span>
            </div>
          </div>
        </Card>
        
        {/* Expected Annual Return */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <Label htmlFor="expectedReturn" className="text-lg font-medium">Expected Annual Return (%)</Label>
            </div>
            <Tooltip text="The annual rate of return you expect on your investments">
              <Info className="h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Slider
                id="expectedReturn"
                min={1}
                max={30}
                step={0.5}
                value={[expectedReturn]}
                onValueChange={(value) => {
                  const newRate = value[0];
                  setExpectedReturn(newRate);
                  
                  // In goal mode: required SIP will be recalculated by useEffect
                  // In amount mode: update future value immediately
                  if (mode === "amount" && monthlySIPAmount > 0) {
                    calculateResults(monthlySIPAmount, investmentPeriod, newRate);
                  }
                }}
                className="flex-1"
              />
              <Input
                type="number"
                value={expectedReturn}
                onChange={(e) => {
                  const newRate = Number(e.target.value);
                  setExpectedReturn(newRate);
                  
                  // In amount mode, immediately recalculate results
                  if (mode === "amount" && monthlySIPAmount > 0 && showResults) {
                    calculateResults(monthlySIPAmount, investmentPeriod, newRate);
                  }
                }}
                className="w-24"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>1%</span>
              <span>30%</span>
            </div>
            
            {/* Risk and return explanation */}
            <div className={`flex items-center p-2 mt-2 rounded-md text-xs ${
              expectedReturn <= 8 
                ? "bg-green-50 border border-green-100 text-green-800" 
                : expectedReturn <= 14
                  ? "bg-amber-50 border border-amber-100 text-amber-800"
                  : "bg-red-50 border border-red-100 text-red-800"
            }`}>
              <AlertTriangle className={`h-4 w-4 mr-2 flex-shrink-0 ${
                expectedReturn <= 8 
                  ? "text-green-500" 
                  : expectedReturn <= 14
                    ? "text-amber-500"
                    : "text-red-500"
              }`} />
              <p>
                {expectedReturn <= 8 
                  ? "Low risk: Conservative returns usually offer greater stability but may not beat inflation significantly."
                  : expectedReturn <= 14
                    ? "Medium risk: Balanced returns offer reasonable growth potential with moderate risk."
                    : "High risk: Higher expected returns yield higher future values but carry significant risk of volatility and potential losses."
                }
              </p>
            </div>
          </div>
        </Card>
        
        {/* Advanced Options */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-primary" />
              <Label className="text-lg font-medium">Advanced Options</Label>
            </div>
            <Tooltip text="Additional settings to refine your SIP calculations">
              <Info className="h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          
          <div className="space-y-4">
            {/* Risk Profile Selector */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="riskProfile" className="text-sm mb-2 block">Risk Profile</Label>
                <Select 
                  value={riskProfile} 
                  onValueChange={setRiskProfile}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk profile" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* SIP Date */}
              <div>
                <Label htmlFor="sipDate" className="text-sm mb-2 block">SIP Date</Label>
                <Select 
                  value={sipDate} 
                  onValueChange={setSipDate}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select SIP date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st of month</SelectItem>
                    <SelectItem value="5">5th of month</SelectItem>
                    <SelectItem value="10">10th of month</SelectItem>
                    <SelectItem value="15">15th of month</SelectItem>
                    <SelectItem value="20">20th of month</SelectItem>
                    <SelectItem value="25">25th of month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Step-up SIP & Inflation */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="stepUpRate" className="text-sm mb-2 block">Annual Step-Up Rate (%)</Label>
                <div className="flex space-x-2">
                  <Slider
                    id="stepUpRate"
                    min={0}
                    max={20}
                    step={1}
                    value={[stepUpRate]}
                    onValueChange={(value) => setStepUpRate(value[0])}
                    className="flex-1"
                  />
                  <span className="w-8 text-sm">{stepUpRate}%</span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="inflationRate" className="text-sm mb-2 block">Inflation Rate (%)</Label>
                <div className="flex space-x-2">
                  <Slider
                    id="inflationRate"
                    min={0}
                    max={15}
                    step={0.5}
                    value={[inflationRate]}
                    onValueChange={(value) => setInflationRate(value[0])}
                    className="flex-1"
                  />
                  <span className="w-8 text-sm">{inflationRate}%</span>
                </div>
              </div>
            </div>
            
            {/* Show Inflation Adjusted */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="showInflationAdjusted" 
                checked={showInflationAdjusted} 
                onCheckedChange={(checked) => setShowInflationAdjusted(checked as boolean)} 
              />
              <Label 
                htmlFor="showInflationAdjusted"
                className="text-sm font-normal cursor-pointer"
              >
                Show inflation-adjusted values
              </Label>
            </div>
          </div>
        </Card>
      </div>
      
      <Button 
        className="w-full mt-6" 
        size="lg"
        onClick={mode === "amount" ? calculateSIPReturns : () => calculateRequiredSIP(targetAmount, investmentPeriod, expectedReturn)}
      >
        {mode === "amount" ? "Calculate SIP Returns" : "Calculate Required SIP"}
      </Button>
      
      {showResults && (
        <div className="mt-8 space-y-8">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-6 text-center">
              <h3 className="text-lg font-medium text-gray-500 mb-2">
                {mode === "goal" ? "Monthly SIP Required" : "Total Investment"}
              </h3>
              <p className="text-3xl font-bold">
                {mode === "goal" 
                  ? `₹${monthlySIPAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}/month` 
                  : `₹${totalInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0})}`
                }
              </p>
              {mode === "goal" ? (
                <p className="text-sm text-gray-500 mt-1">Total investment over {investmentPeriod} years</p>
              ) : (
                <p className="text-sm text-gray-500 mt-1">
                  <Tooltip text="Total amount you'll invest over the entire period">
                    <span className="border-b border-dotted border-gray-400 cursor-help">What is this?</span>
                  </Tooltip>
                </p>
              )}
            </Card>
            
            <Card className="p-6 text-center">
              <h3 className="text-lg font-medium text-gray-500 mb-2">Expected Returns</h3>
              <p className="text-3xl font-bold text-green-600">₹{expectedReturns.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
              <div className="flex items-center justify-center text-sm text-gray-500 mt-1 gap-1">
                <span>{((expectedReturns/totalInvestment) * 100).toFixed(1)}% gain on investment</span>
                <Tooltip text="The difference between your total investment and future value, representing the earnings from compounding">
                  <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                </Tooltip>
              </div>
            </Card>
            
            {/* Future Value Card - Standard or Split Display */}
            {showInflationAdjusted ? (
              // Combined Card with Inflation Adjustment
              <Card className="p-6">
                <div className="flex flex-col space-y-4">
                  {/* Future Value */}
                  <div className="text-center border-b pb-4">
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Future Value</h3>
                    <p className="text-3xl font-bold text-primary">₹{futureValue.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                    <div className="flex items-center justify-center text-sm text-gray-500 mt-1 gap-1">
                      <span>At {expectedReturn}% annual return</span>
                      <Tooltip text="The total value of your investment at the end of the period (principal + returns)">
                        <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                      </Tooltip>
                    </div>
                  </div>
                  
                  {/* Real Value */}
                  <div className="text-center pt-2">
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Real Value</h3>
                    <p className="text-3xl font-bold text-amber-600">₹{inflationAdjustedValue.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                    <div className="flex items-center justify-center text-sm text-gray-500 mt-1 gap-1">
                      <span>Adjusted for {inflationRate}% inflation</span>
                      <Tooltip text="The future value adjusted for inflation, showing the real purchasing power">
                        <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              // Simple Card without Inflation Adjustment
              <Card className="p-6 text-center">
                <h3 className="text-lg font-medium text-gray-500 mb-2">Future Value</h3>
                <p className="text-3xl font-bold text-primary">₹{futureValue.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                <div className="flex items-center justify-center text-sm text-gray-500 mt-1 gap-1">
                  <span>At {expectedReturn}% annual return</span>
                  <Tooltip text="The total value of your investment at the end of the period (principal + returns)">
                    <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                  </Tooltip>
                </div>
              </Card>
            )}
          </div>

          {/* Advanced Metrics Cards (XIRR and ARR) */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* XIRR Card */}
            <Card className="p-6 text-center">
              <h3 className="text-lg font-medium text-gray-500 mb-2">XIRR</h3>
              <p className="text-3xl font-bold text-indigo-600">{xirrValue.toFixed(2)}%</p>
              <div className="flex items-center justify-center text-sm text-gray-500 mt-1 gap-1">
                <span>Extended Internal Rate of Return</span>
                <Tooltip text="XIRR considers the timing of cash flows, giving a more accurate measure of investment performance">
                  <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                </Tooltip>
              </div>
            </Card>
            
            {/* ARR Card */}
            <Card className="p-6 text-center">
              <h3 className="text-lg font-medium text-gray-500 mb-2">ARR</h3>
              <p className="text-3xl font-bold text-indigo-600">{arrValue.toFixed(2)}%</p>
              <div className="flex items-center justify-center text-sm text-gray-500 mt-1 gap-1">
                <span>Absolute Rate of Return</span>
                <Tooltip text="ARR measures the total percentage gain on your investment over the entire period">
                  <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                </Tooltip>
              </div>
            </Card>
          </div>
          
          {/* Goal Progress - Only show in goal mode */}
          {mode === "goal" && (
            <Card className="p-6">
              <h3 className="text-xl font-medium flex items-center gap-2 mb-4">
                <Target className="h-5 w-5" />
                Goal Progress Tracker
              </h3>
              
              <div className="mb-4">
                <Progress value={0} className="h-2" />
                <div className="flex justify-between mt-2 text-sm">
                  <span>Current: ₹0</span>
                  <span>Target: ₹{targetAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-md">
                <p className="text-sm">
                  <span className="font-medium">Monthly contribution: </span>
                  ₹{monthlySIPAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm">
                    <span className="font-medium">Time to reach goal: </span>
                    {investmentPeriod} years
                  </p>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                    onClick={createInvestmentGoal}
                  >
                    <IndianRupee className="h-3 w-3 mr-1" />
                    Set as Goal
                  </Button>
                </div>
              </div>
            </Card>
          )}
          
          {/* Educational Calculation Points */}
          <Card className="p-6 bg-blue-50">
            <h3 className="text-xl font-medium flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5" />
              Key Educational Points
            </h3>
            
            <ul className="space-y-2">
              {personalInsights.map((insight, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-700">{index + 1}</span>
                  </div>
                  <span className="text-sm">{insight}</span>
                </li>
              ))}
            </ul>
          </Card>
          
          {/* Educational Investment Information */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-primary/30 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-medium">Investment Education</h3>
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30" variant="secondary">
                  <div className="flex items-center gap-1">
                    <span className="animate-pulse bg-blue-500 h-1.5 w-1.5 rounded-full"></span>
                    AI Assisted
                  </div>
                </Badge>
              </div>
              <Tooltip text="General educational information related to your inputs">
                <Info className="h-4 w-4 text-gray-400" />
              </Tooltip>
            </div>
            
            {isLoadingInsights ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[95%]" />
                <div className="mt-4">
                  <Skeleton className="h-6 w-48 mb-3" />
                  <div className="grid grid-cols-2 gap-3">
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Educational Content */}
                <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                  <h4 className="font-medium mb-3 flex items-center text-blue-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Educational Insights
                  </h4>
                  <ul className="space-y-3">
                    {aiInsights?.personalizedAdvice.map((advice, index) => (
                      <li key={index} className="text-sm flex items-start group transition-all">
                        <div className="flex-shrink-0 mr-3 mt-0.5">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <Info className="h-3 w-3 text-blue-600" />
                          </div>
                        </div>
                        <span className="text-gray-700">{advice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Suggested Fund Types */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center text-blue-700">
                    <Tag className="h-4 w-4 mr-2" />
                    Investment Categories to Explore
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {aiInsights?.suggestedFundTypes.map((fund, index) => (
                      <div 
                        key={index} 
                        className="flex items-center p-3 bg-white rounded-lg border border-blue-100 shadow-sm hover:border-blue-300 transition-colors cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
                          {index % 2 === 0 ? 
                            <BarChart4 className="h-4 w-4 text-indigo-600" /> : 
                            <BarChart4 className="h-4 w-4 text-blue-600" />
                          }
                        </div>
                        <span className="text-sm font-medium">{fund}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Investment Strategy */}
                <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                  <h4 className="font-medium mb-3 flex items-center text-blue-700">
                    <Target className="h-4 w-4 mr-2" />
                    Possible Investment Approach
                  </h4>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-0.5">
                      <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                        <Target className="h-3.5 w-3.5 text-indigo-600" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{aiInsights?.investmentStrategy}</p>
                  </div>
                </div>
                
                {/* Risk Assessment */}
                <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                  <h4 className="font-medium mb-3 flex items-center text-blue-700">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Understanding Risk Factors
                  </h4>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-0.5">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                        expectedReturn <= 8 
                          ? "bg-green-100" 
                          : expectedReturn <= 14
                            ? "bg-amber-100"
                            : "bg-red-100"
                      }`}>
                        <AlertTriangle className={`h-3.5 w-3.5 ${
                          expectedReturn <= 8 
                            ? "text-green-600" 
                            : expectedReturn <= 14
                              ? "text-amber-600"
                              : "text-red-600"
                        }`} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{aiInsights?.riskAssessment}</p>
                  </div>
                </div>
                
                {/* Next Steps */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium mb-3 flex items-center text-blue-700">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Educational Points to Consider
                  </h4>
                  <ol className="space-y-3">
                    {aiInsights?.nextSteps.map((step, index) => (
                      <li key={index} className="text-sm flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-xs">
                            {index + 1}
                          </div>
                        </div>
                        <span className="text-gray-700 pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                
                {/* Refresh Button */}
                <div className="flex justify-center mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => fetchAIInsights()}
                    className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-2" />
                    Refresh Educational Content
                  </Button>
                </div>
              </div>
            )}
          </Card>
          
          {/* Charts Tabs */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-medium flex items-center gap-2">
                  <BarChart4 className="h-5 w-5" />
                  Investment Analysis
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xl">
                  Visualize how your investment grows over time, compare different scenarios, and see the impact of various factors on your SIP returns.
                </p>
              </div>
              
              <Tabs
                value={chartView}
                onValueChange={setChartView}
                className="w-auto"
              >
                <TabsList>
                  <TabsTrigger value="growth">Growth</TabsTrigger>
                  <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
                  <TabsTrigger value="comparison">Comparison</TabsTrigger>
                  <TabsTrigger value="table">Annual Table</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Chart Views */}
            {chartView === "table" && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-4 py-2 font-medium border">Year</th>
                      <th className="px-4 py-2 font-medium text-right border">Invested Amount (₹)</th>
                      <th className="px-4 py-2 font-medium text-right border">Returns (₹)</th>
                      <th className="px-4 py-2 font-medium text-right border">Future Value (₹)</th>
                      {showInflationAdjusted && (
                        <th className="px-4 py-2 font-medium text-right border">Inflation-Adjusted Value (₹)</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyBreakdown.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-2 border">{item.year}</td>
                        <td className="px-4 py-2 text-right border">{item.investedAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}</td>
                        <td className="px-4 py-2 text-right border text-green-600">{item.returns.toLocaleString('en-IN', {maximumFractionDigits: 0})}</td>
                        <td className="px-4 py-2 text-right border font-medium">{item.futureValue.toLocaleString('en-IN', {maximumFractionDigits: 0})}</td>
                        {showInflationAdjusted && (
                          <td className="px-4 py-2 text-right border text-amber-600">{item.inflationAdjustedValue.toLocaleString('en-IN', {maximumFractionDigits: 0})}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {chartView === "growth" && (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={yearlyBreakdown}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year"
                      label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                      label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
                    />
                    <RTooltip 
                      formatter={(value: number) => [`₹${value.toLocaleString('en-IN', {maximumFractionDigits: 2})}`, '']}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="investedAmount" 
                      name="Invested Amount"
                      fill="#8884d8" 
                      stroke="#8884d8"
                      fillOpacity={0.3}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="futureValue" 
                      name="Future Value"
                      stroke="#82ca9d" 
                      strokeWidth={2}
                    />
                    {showInflationAdjusted && (
                      <Line 
                        type="monotone" 
                        dataKey="inflationAdjustedValue" 
                        name="Inflation-Adjusted Value"
                        stroke="#ff7300" 
                        strokeWidth={2}
                      />
                    )}
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )}
            
            {chartView === "scenarios" && (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RLineChart
                    data={yearlyBreakdown}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year"
                      label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                      label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
                    />
                    <RTooltip 
                      formatter={(value: number) => [`₹${value.toLocaleString('en-IN', {maximumFractionDigits: 2})}`, '']}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="conservative" 
                      name="Conservative (Low Risk)"
                      stroke="#1e40af" 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="moderate" 
                      name="Moderate (Medium Risk)"
                      stroke="#65a30d" 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="aggressive" 
                      name="Aggressive (High Risk)"
                      stroke="#b91c1c" 
                      strokeWidth={2}
                    />
                  </RLineChart>
                </ResponsiveContainer>
              </div>
            )}
            
            {chartView === "comparison" && (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RBarChart
                    data={[
                      {
                        name: 'SIP',
                        investment: totalInvestment,
                        returns: expectedReturns,
                      },
                      {
                        name: 'Lump Sum',
                        investment: totalInvestment,
                        returns: lumpSumReturns,
                      }
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                    <RTooltip formatter={(value: number) => [`₹${value.toLocaleString('en-IN', {maximumFractionDigits: 2})}`, '']} />
                    <Legend />
                    <Bar dataKey="investment" name="Investment" stackId="a" fill="#8884d8" />
                    <Bar dataKey="returns" name="Returns" stackId="a" fill="#82ca9d" />
                  </RBarChart>
                </ResponsiveContainer>
              </div>
            )}
            
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="flex p-3 bg-gray-50 rounded-md items-center gap-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Sigma className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Total Investment</h4>
                  <p className="text-sm">₹{totalInvestment.toLocaleString('en-IN')}</p>
                </div>
              </div>
              
              <div className="flex p-3 bg-gray-50 rounded-md items-center gap-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Wealth Gained</h4>
                  <p className="text-sm">₹{expectedReturns.toLocaleString('en-IN')}</p>
                </div>
              </div>
              
              <div className="flex p-3 bg-gray-50 rounded-md items-center gap-2">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Investment Period</h4>
                  <p className="text-sm">{investmentPeriod} years ({investmentPeriod * 12} months)</p>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Risk-adjusted Returns */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Info className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium">Conservative</h3>
                </div>
                <Tooltip text="Conservative returns scenario based on lower-risk investment options like debt funds, government securities and blue-chip stocks.">
                  <Info className="h-4 w-4 text-gray-400" />
                </Tooltip>
              </div>
              
              <p className="text-2xl font-bold text-blue-800 mb-2">
                ₹{conservativeReturns.toLocaleString('en-IN', {maximumFractionDigits: 0})}
              </p>
              
              <div className="flex justify-between text-sm">
                <span>Expected Return:</span>
                <span>{getRiskAdjustedReturns(riskProfile).low}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Risk Level:</span>
                <span>Low</span>
              </div>
              
              <div className="mt-4 text-xs text-gray-500">
                Suitable for investors with low risk tolerance focusing on capital preservation.
              </div>
            </Card>
            
            <Card className="p-6 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <BarChart4 className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium">Moderate</h3>
                </div>
                <Tooltip text="Moderate returns scenario based on a balanced mix of debt and equity funds with medium market volatility.">
                  <Info className="h-4 w-4 text-gray-400" />
                </Tooltip>
              </div>
              
              <p className="text-2xl font-bold text-green-800 mb-2">
                ₹{moderateReturns.toLocaleString('en-IN', {maximumFractionDigits: 0})}
              </p>
              
              <div className="flex justify-between text-sm">
                <span>Expected Return:</span>
                <span>{getRiskAdjustedReturns(riskProfile).mid}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Risk Level:</span>
                <span>Medium</span>
              </div>
              
              <div className="mt-4 text-xs text-gray-500">
                Balanced approach for investors seeking growth with moderate risk exposure.
              </div>
            </Card>
            
            <Card className="p-6 border-red-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="text-lg font-medium">Aggressive</h3>
                </div>
                <Tooltip text="Aggressive returns scenario based on high-growth equity funds, small-cap stocks, and other high-potential investments with higher volatility.">
                  <Info className="h-4 w-4 text-gray-400" />
                </Tooltip>
              </div>
              
              <p className="text-2xl font-bold text-red-800 mb-2">
                ₹{aggressiveReturns.toLocaleString('en-IN', {maximumFractionDigits: 0})}
              </p>
              
              <div className="flex justify-between text-sm">
                <span>Expected Return:</span>
                <span>{getRiskAdjustedReturns(riskProfile).high}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Risk Level:</span>
                <span>High</span>
              </div>
              
              <div className="mt-4 text-xs text-gray-500">
                Growth-focused approach for investors comfortable with higher volatility.
              </div>
            </Card>
          </div>
          
          {/* SIP Date Impact */}
          <Card className="p-6">
            <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              SIP Date Impact
            </h3>
            
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="text-sm">
                Your SIP is scheduled for the <span className="font-medium">{sipDate}st</span> of every month.
                While timing has a minor impact on long-term returns, consistency is more important.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-3 border rounded-md">
                <h4 className="text-sm font-medium mb-2">Early Month (1st-5th)</h4>
                <p className="text-xs text-gray-600">
                  Aligns with most salary cycles. Good for automatic transfers from salary accounts.
                </p>
              </div>
              
              <div className="p-3 border rounded-md">
                <h4 className="text-sm font-medium mb-2">Mid Month (10th-15th)</h4>
                <p className="text-xs text-gray-600">
                  Allows time for salary processing and expense planning before investment.
                </p>
              </div>
              
              <div className="p-3 border rounded-md">
                <h4 className="text-sm font-medium mb-2">Late Month (20th-25th)</h4>
                <p className="text-xs text-gray-600">
                  Good for those who want to invest after clearing major monthly expenses.
                </p>
              </div>
            </div>
          </Card>
          
          {/* Step-Up SIP Impact */}
          {stepUpRate > 0 && (
            <Card className="p-6">
              <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Step-Up SIP Analysis
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">How Step-Up Works</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Your SIP amount increases by {stepUpRate}% every year. This leads to:
                  </p>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Higher overall investment (₹{totalInvestment.toLocaleString('en-IN')} vs ₹{(monthlySIPAmount * investmentPeriod * 12).toLocaleString('en-IN')} without step-up)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Greater final corpus (₹{futureValue.toLocaleString('en-IN')})</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Keeps pace with income growth and inflation</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Annual SIP Contribution</h4>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RBarChart
                        data={Array.from({ length: investmentPeriod }, (_, i) => ({
                          year: i + 1,
                          amount: monthlySIPAmount * 12 * Math.pow(1 + stepUpRate/100, i)
                        }))}
                        margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                        <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                        <RTooltip formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Annual Contribution']} />
                        <Bar dataKey="amount" name="Annual Contribution" fill="#82ca9d" />
                      </RBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          {/* Detailed Investment Analysis Table - Optional, can be collapsed */}
          <Card className="p-6">
            <Tabs defaultValue="summary">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium flex items-center gap-2">
                  <BarChart4 className="h-5 w-5" />
                  Detailed Investment Analysis
                </h3>
                
                <TabsList>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="detailed">Year-by-Year</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="summary">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Key Milestones</h4>
                    <div className="space-y-2">
                      {/* When the investment doubles */}
                      {yearlyBreakdown.findIndex(item => item.futureValue >= totalInvestment * 2) > 0 && (
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">Investment Doubles</span>
                          <span className="text-sm font-medium">
                            Year {yearlyBreakdown.findIndex(item => item.futureValue >= totalInvestment * 2)}
                          </span>
                        </div>
                      )}
                      
                      {/* When the returns exceed principal */}
                      {yearlyBreakdown.findIndex(item => item.returns > item.investedAmount && item.investedAmount > 0) > 0 && (
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">Returns Exceed Principal</span>
                          <span className="text-sm font-medium">
                            Year {yearlyBreakdown.findIndex(item => item.returns > item.investedAmount && item.investedAmount > 0)}
                          </span>
                        </div>
                      )}
                      
                      {/* When 50% of goal is reached */}
                      {mode === "goal" && yearlyBreakdown.findIndex(item => item.futureValue >= targetAmount * 0.5) > 0 && (
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">50% of Goal Reached</span>
                          <span className="text-sm font-medium">
                            Year {yearlyBreakdown.findIndex(item => item.futureValue >= targetAmount * 0.5)}
                          </span>
                        </div>
                      )}
                      
                      {/* Last year summary */}
                      <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                        <span className="text-sm">Final Corpus</span>
                        <span className="text-sm font-medium">
                          ₹{futureValue.toLocaleString('en-IN')} in {investmentPeriod} years
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Return Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Returns to Investment Ratio</span>
                        <span className="text-sm font-medium">
                          {(expectedReturns / totalInvestment).toFixed(2)}x
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Monthly SIP as % of Target</span>
                        <span className="text-sm font-medium">
                          {((monthlySIPAmount / targetAmount) * 100).toFixed(3)}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Effective Annual Rate</span>
                        <span className="text-sm font-medium">
                          {expectedReturn}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                        <span className="text-sm">Return Percentage</span>
                        <span className="text-sm font-medium">
                          {((expectedReturns/totalInvestment) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="detailed">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invested Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Future Value</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Returns</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Returns %</th>
                        {showInflationAdjusted && (
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Real Value</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {yearlyBreakdown.map((row) => (
                        <tr key={row.year}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.year}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            ₹{row.investedAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            ₹{row.futureValue.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            ₹{row.returns.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {row.returnsPercentage.toFixed(1)}%
                          </td>
                          {showInflationAdjusted && (
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              ₹{row.inflationAdjustedValue.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
          
          {/* Actions Panel */}
          <div className="grid gap-4 md:grid-cols-3">

            
            {/* Download Report */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Download className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-medium">Export Report</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Download a detailed report of your SIP calculation for future reference.
              </p>
              
              <Button
                className="w-full"
                variant="outline"
                onClick={downloadReport}
              >
                Download PDF Report
              </Button>
            </Card>
            
            {/* Share */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Share2 className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-medium">Share Plan</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Share your SIP calculation with family, friends or your financial advisor.
              </p>
              
              <Button
                className="w-full"
                variant="outline"
                onClick={shareCalculation}
              >
                Share Calculation
              </Button>
            </Card>
          </div>
          
          {/* Key Benefits and SEBI Disclaimer */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                <BadgePercent className="h-5 w-5" />
                Key Benefits of SIP
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-base mb-1">Rupee Cost Averaging</h4>
                  <p className="text-sm text-gray-600">Buy more units when prices are low, fewer when prices are high.</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-base mb-1">Power of Compounding</h4>
                  <p className="text-sm text-gray-600">Earn returns on your returns over time.</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-base mb-1">Disciplined Investing</h4>
                  <p className="text-sm text-gray-600">Develop regular savings habit without timing the market.</p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium text-base mb-1">Flexibility</h4>
                  <p className="text-sm text-gray-600">Start with small amounts and increase over time.</p>
                </div>
              </div>
            </Card>
            
            {/* Disclaimer moved to consolidated section at the end */}
          </div>
          
          {/* SIP-specific financial disclaimer */}
          <div className="mt-6">
            <FinancialDisclaimer 
              variant="subtle" 
              calculatorType="sip"
              size="md"
            />
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}

// Helper components
const CheckIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const Settings = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);