import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CalculatorLayout } from "../components/calculators/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card";
import { Slider } from "../components/ui/slider";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { Checkbox } from "../components/ui/checkbox";
import { format, addYears } from "date-fns";
import { useBudget } from "../contexts/BudgetContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import {
  Info, TrendingUp, Clock, Target,
  DollarSign, BarChart4, Calendar, LightbulbIcon, 
  Table, IndianRupee, Receipt, PieChart, Calculator as CalculatorIcon,
  HelpCircle, ArrowRight, Download, Save, AlertCircle, CheckCircle2,
  BadgeIndianRupee, Medal, Wallet, Sparkles, Briefcase, Gift
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, 
  Legend, ResponsiveContainer, LineChart, Line, PieChart as PieChartComponent, 
  Pie, Cell, Area, AreaChart, Scatter, ScatterChart, ZAxis, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ReferenceLine
} from 'recharts';
import FinancialDisclaimer from "../components/FinancialDisclaimer";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  RadioGroup,
  RadioGroupItem,
} from "../components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

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
        <div className="absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-800 rounded-md shadow-lg -left-28 top-full">
          {text}
        </div>
      )}
    </div>
  );
};

// Format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format percentage
const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

// Investment strategies
type InvestmentStrategy = 'fixed' | 'increasing' | 'aggressive' | 'moderate' | 'conservative';

interface PPFYearData {
  year: number;
  yearLabel: string;
  deposit: number;
  interest: number;
  balance: number;
  cumulativeDeposit: number;
  cumulativeInterest: number;
  withdrawalAllowed: boolean;
  loanEligible: boolean;
  inflationAdjustedValue?: number;
  taxes?: { section80C: number };
  milestones?: string[];
}

interface GoalData {
  name: string;
  targetAmount: number;
  targetYear: number;
  icon: string;
  color: string;
}

interface ComparisonData {
  name: string;
  ppf: number;
  fd: number;
  mutualFund: number;
  stockMarket: number;
}

const PPFCalculator: React.FC = () => {
  const { toast } = useToast();
  const budgetContext = useBudget();
  const queryClient = useQueryClient();
  const [calculationComplete, setCalculationComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("calculator");
  const [comparisonView, setComparisonView] = useState<'chart' | 'table'>('chart');
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar' | 'radar'>('area');
  
  // Input state variables
  const [annualInvestment, setAnnualInvestment] = useState(50000);
  const [interestRate, setInterestRate] = useState(7.1);
  const [investmentPeriod, setInvestmentPeriod] = useState(15);
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [inflationRate, setInflationRate] = useState(5.0);
  const [investmentStrategy, setInvestmentStrategy] = useState<InvestmentStrategy>('fixed');
  const [increaseRate, setIncreaseRate] = useState(10);
  const [yearlyIncreaseLimit, setYearlyIncreaseLimit] = useState(150000);
  const [extendPeriod, setExtendPeriod] = useState(false);
  const [extensionYears, setExtensionYears] = useState(5);
  const [includeWithdrawals, setIncludeWithdrawals] = useState(false);
  const [withdrawalYear, setWithdrawalYear] = useState(7);
  const [withdrawalPercentage, setWithdrawalPercentage] = useState(50);
  const [enablePartialWithdrawals, setEnablePartialWithdrawals] = useState(false);
  const [withInflationAdjustment, setWithInflationAdjustment] = useState(true);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [financialGoal, setFinancialGoal] = useState<string | null>(null);
  const [customGoalAmount, setCustomGoalAmount] = useState(1000000);
  const [showMilestones, setShowMilestones] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  
  // Results state variables
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [yearlyData, setYearlyData] = useState<PPFYearData[]>([]);
  const [realPurchasingPower, setRealPurchasingPower] = useState(0);
  const [taxSavings, setTaxSavings] = useState(0);
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [investmentEfficiency, setInvestmentEfficiency] = useState(0);
  const [cagr, setCagr] = useState(0);
  const [absoluteReturn, setAbsoluteReturn] = useState(0);
  const [readableSummary, setReadableSummary] = useState('');
  
  // Calculator name save dialog
  const [isSaveDialogOpen, setSaveDialogOpen] = useState(false);
  const [calculatorName, setCalculatorName] = useState("");
  const [goalDialogOpen, setGoalDialogOpen] = useState(false);
  const [goalName, setGoalName] = useState("");
  
  // Available financial goals
  const financialGoals: Record<string, GoalData> = {
    'education': {
      name: 'Child Education',
      targetAmount: 2500000,
      targetYear: startYear + 15,
      icon: 'school',
      color: '#6366f1'
    },
    'retirement': {
      name: 'Retirement Corpus',
      targetAmount: 10000000,
      targetYear: startYear + 30,
      icon: 'elderly',
      color: '#8b5cf6'
    },
    'home': {
      name: 'Home Purchase',
      targetAmount: 5000000,
      targetYear: startYear + 10,
      icon: 'home',
      color: '#ec4899'
    },
    'emergency': {
      name: 'Emergency Fund',
      targetAmount: 600000,
      targetYear: startYear + 5,
      icon: 'shield',
      color: '#f59e0b'
    },
    'vacation': {
      name: 'Dream Vacation',
      targetAmount: 1000000,
      targetYear: startYear + 7,
      icon: 'globe',
      color: '#10b981'
    },
    'custom': {
      name: 'Custom Goal',
      targetAmount: customGoalAmount,
      targetYear: startYear + investmentPeriod,
      icon: 'target',
      color: '#3b82f6'
    }
  };
  
  // Input validation function
  const validateInputs = (): boolean => {
    if (annualInvestment < 500) {
      toast({
        title: "Invalid input",
        description: "Annual investment must be at least ₹500",
        variant: "destructive"
      });
      return false;
    }
    
    if (annualInvestment > 150000) {
      toast({
        title: "Invalid input",
        description: "Annual investment cannot exceed ₹1,50,000",
        variant: "destructive"
      });
      return false;
    }
    
    if (interestRate < 1.0 || interestRate > 10.0) {
      toast({
        title: "Invalid input",
        description: "Interest rate must be between 1.0% and 10.0%",
        variant: "destructive"
      });
      return false;
    }
    
    if (investmentPeriod < 1 || investmentPeriod > 50) {
      toast({
        title: "Invalid input",
        description: "Investment period must be between 1 and 50 years",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  // Get investment amount for the year based on strategy
  const getYearlyInvestment = (year: number, previousDeposit: number): number => {
    switch (investmentStrategy) {
      case 'fixed':
        return annualInvestment;
      case 'increasing':
        const increasedAmount = previousDeposit * (1 + increaseRate / 100);
        return Math.min(increasedAmount, yearlyIncreaseLimit);
      case 'aggressive':
        // Start low and increase aggressively
        const baseIncrease = 1 + (0.15 + (year * 0.01));
        return Math.min(previousDeposit * baseIncrease, yearlyIncreaseLimit);
      case 'moderate':
        // Standard increase with some year-specific adjustments
        let modIncrease = previousDeposit * (1 + (increaseRate / 100));
        // Every 5 years, give a bonus boost
        if (year % 5 === 0) {
          modIncrease *= 1.1;
        }
        return Math.min(modIncrease, yearlyIncreaseLimit);
      case 'conservative':
        // Smaller increases, with occasional decreases
        if (year % 7 === 0) {
          return Math.max(previousDeposit * 0.95, annualInvestment); // Occasional decrease
        }
        return Math.min(previousDeposit * (1 + (increaseRate / 100) * 0.5), yearlyIncreaseLimit);
      default:
        return annualInvestment;
    }
  };
  
  // Calculate PPF returns with enhanced options
  const calculatePPF = () => {
    if (!validateInputs()) return;
    
    const yearlyBreakdown: PPFYearData[] = [];
    const comparisonYears: ComparisonData[] = [];
    let balance = 0;
    let totalDeposit = 0;
    let totalInterestEarned = 0;
    let previousDeposit = annualInvestment;
    let totalTaxSavings = 0;
    let finalYear = investmentPeriod;
    
    if (extendPeriod) {
      finalYear += extensionYears;
    }
    
    // Tax bracket for Section 80C calculations
    const taxBracket = 0.3; // Assuming 30% tax bracket
    
    for (let year = 1; year <= finalYear; year++) {
      // Determine if this is a withdrawal year
      const canWithdraw = year >= 7;
      const canGetLoan = year >= 3 && year <= 6;
      const isWithdrawalYear = includeWithdrawals && enablePartialWithdrawals && year === withdrawalYear;
      
      // Determine deposit for this year
      let deposit = year === 1 ? annualInvestment : getYearlyInvestment(year, previousDeposit);
      previousDeposit = deposit;
      
      // Apply withdrawal if applicable
      let withdrawal = 0;
      if (isWithdrawalYear) {
        withdrawal = (balance * withdrawalPercentage) / 100;
        balance -= withdrawal;
      }
      
      // Add current year's deposit
      totalDeposit += deposit;
      
      // Calculate interest (on opening balance + deposit)
      const interest = ((balance + deposit) * interestRate) / 100;
      totalInterestEarned += interest;
      
      // Update balance at end of year
      balance += deposit + interest;
      
      // Calculate tax saving under Section 80C
      const section80CSaving = Math.min(deposit, 150000) * taxBracket;
      totalTaxSavings += section80CSaving;
      
      // Calculate inflation-adjusted value
      const inflationAdjustedValue = withInflationAdjustment 
        ? balance / Math.pow(1 + (inflationRate / 100), year) 
        : balance;
      
      // Generate milestones
      const milestones: string[] = [];
      if (showMilestones) {
        if (year === 1) {
          milestones.push('PPF account opened');
        }
        if (year === 3) {
          milestones.push('Loan eligibility started');
        }
        if (year === 7) {
          milestones.push('Partial withdrawal eligibility started');
        }
        if (year === 15) {
          milestones.push('Initial lock-in period completed');
        }
        if (extendPeriod && year === 15 + extensionYears) {
          milestones.push('Extension period completed');
        }
        
        // Goal-based milestones
        if (financialGoal && financialGoal !== 'custom' && balance >= financialGoals[financialGoal].targetAmount) {
          milestones.push(`${financialGoals[financialGoal].name} target achieved`);
        } else if (financialGoal === 'custom' && balance >= customGoalAmount) {
          milestones.push('Custom goal target achieved');
        }
        
        // Balance-based milestones
        if (balance >= 100000 && balance < 200000 && !yearlyBreakdown.some(y => y.balance >= 100000)) {
          milestones.push('First ₹1 lakh milestone achieved');
        } else if (balance >= 500000 && balance < 1000000 && !yearlyBreakdown.some(y => y.balance >= 500000)) {
          milestones.push('₹5 lakh milestone achieved');
        } else if (balance >= 1000000 && balance < 2000000 && !yearlyBreakdown.some(y => y.balance >= 1000000)) {
          milestones.push('₹10 lakh milestone achieved');
        } else if (balance >= 5000000 && !yearlyBreakdown.some(y => y.balance >= 5000000)) {
          milestones.push('₹50 lakh milestone achieved');
        }
      }
      
      // Add to yearly breakdown
      yearlyBreakdown.push({
        year,
        yearLabel: `${startYear + year - 1}-${(startYear + year).toString().slice(2)}`,
        deposit,
        interest,
        balance,
        cumulativeDeposit: totalDeposit,
        cumulativeInterest: totalInterestEarned,
        withdrawalAllowed: canWithdraw,
        loanEligible: canGetLoan,
        inflationAdjustedValue,
        taxes: { section80C: section80CSaving },
        milestones
      });
      
      // Add to comparison data (every 5 years and final year)
      if (year % 5 === 0 || year === finalYear) {
        // Simple approximations for comparison
        const fdInterestRate = 6.0;
        const mutualFundRate = 11.0;
        const stockMarketRate = 13.0;
        
        const fdValue = totalDeposit * Math.pow(1 + fdInterestRate / 100, year);
        const mutualFundValue = totalDeposit * Math.pow(1 + mutualFundRate / 100, year);
        const stockMarketValue = totalDeposit * Math.pow(1 + stockMarketRate / 100, year);
        
        comparisonYears.push({
          name: `Year ${year}`,
          ppf: balance,
          fd: fdValue,
          mutualFund: mutualFundValue,
          stockMarket: stockMarketValue
        });
      }
    }
    
    // Calculate investment metrics
    const absoluteReturnValue = ((maturityAmount - totalDeposit) / totalDeposit) * 100;
    const cagrValue = (Math.pow(maturityAmount / totalDeposit, 1 / finalYear) - 1) * 100;
    const efficiencyRatio = totalInterestEarned / totalDeposit;
    
    // Generate human-readable summary with educational language
    const formattedMaturityAmount = formatCurrency(balance);
    const formattedTotalInvestment = formatCurrency(totalDeposit);
    const formattedInterest = formatCurrency(totalInterestEarned);
    const realValue = formatCurrency(yearlyBreakdown[yearlyBreakdown.length - 1].inflationAdjustedValue || 0);
    
    let summary = `If you invest ${formattedTotalInvestment} over ${finalYear} years, your PPF balance might grow to approximately ${formattedMaturityAmount}, potentially earning around ${formattedInterest} in interest.`;
    
    if (withInflationAdjustment) {
      summary += ` Considering a hypothetical inflation rate of ${inflationRate}%, the real purchasing power could be around ${realValue}.`;
    }
    
    if (totalTaxSavings > 0) {
      summary += ` You might save approximately ${formatCurrency(totalTaxSavings)} in taxes through Section 80C deductions, depending on your tax situation.`;
    }
    
    // Update state with calculated values
    setTotalInvestment(totalDeposit);
    setTotalInterest(totalInterestEarned);
    setMaturityAmount(balance);
    setYearlyData(yearlyBreakdown);
    setRealPurchasingPower(yearlyBreakdown[yearlyBreakdown.length - 1].inflationAdjustedValue || 0);
    setTaxSavings(totalTaxSavings);
    setComparisonData(comparisonYears);
    setInvestmentEfficiency(efficiencyRatio);
    setCagr(cagrValue);
    setAbsoluteReturn(absoluteReturnValue);
    setReadableSummary(summary);
    setCalculationComplete(true);
    
    // Switch to results tab
    setActiveTab("results");
  };
  
  // Set a financial goal
  const setGoal = (goalType: string | null) => {
    setFinancialGoal(goalType);
    
    if (goalType && goalType !== 'custom') {
      // Adjust investment period to match goal's target year
      const goalYears = financialGoals[goalType].targetYear - startYear;
      if (goalYears > 0) {
        setInvestmentPeriod(Math.min(goalYears, 50));
      }
    }
  };
  
  // Calculate recommended annual investment for goal
  const calculateRecommendedInvestment = (goalType: string): number => {
    if (!goalType || goalType === 'custom') return annualInvestment;
    
    const goal = financialGoals[goalType];
    const targetAmount = goal.targetAmount;
    const years = goal.targetYear - startYear;
    
    if (years <= 0) return annualInvestment;
    
    // Simple formula to back-calculate required annual investment
    // This is an approximation assuming the current interest rate
    const r = interestRate / 100;
    const n = years;
    
    // FV = PMT * ((1 + r)^n - 1) / r
    // Solving for PMT:
    // PMT = FV * r / ((1 + r)^n - 1)
    
    const denominator = Math.pow(1 + r, n) - 1;
    const recommendedAmount = (targetAmount * r) / denominator;
    
    // Ensure the recommended amount is within PPF limits
    return Math.min(Math.max(Math.round(recommendedAmount), 500), 150000);
  };
  
  // Handle save calculator
  const handleSaveCalculator = () => {
    if (!calculatorName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your calculation",
        variant: "destructive"
      });
      return;
    }
    
    // In a real implementation, this would save to a database
    toast({
      title: "Calculation saved",
      description: `Your PPF calculation "${calculatorName}" has been saved`,
    });
    
    setSaveDialogOpen(false);
    setCalculatorName("");
  };
  
  // Handle setting as a goal
  const handleSetAsGoal = () => {
    if (!goalName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your financial goal",
        variant: "destructive"
      });
      return;
    }
    
    // In a real implementation, this would save to a goals database
    toast({
      title: "Goal created",
      description: `Your PPF investment goal "${goalName}" has been added to your goal tracker`,
      variant: "default"
    });
    
    setGoalDialogOpen(false);
    setGoalName("");
  };

  // Reset calculator
  const resetCalculator = () => {
    setAnnualInvestment(50000);
    setInterestRate(7.1);
    setInvestmentPeriod(15);
    setStartYear(new Date().getFullYear());
    setInflationRate(5.0);
    setInvestmentStrategy('fixed');
    setIncreaseRate(10);
    setYearlyIncreaseLimit(150000);
    setExtendPeriod(false);
    setExtensionYears(5);
    setIncludeWithdrawals(false);
    setWithdrawalYear(7);
    setWithdrawalPercentage(50);
    setEnablePartialWithdrawals(false);
    setWithInflationAdjustment(true);
    setAdvancedMode(false);
    setFinancialGoal(null);
    setCustomGoalAmount(1000000);
    setSelectedPreset(null);
    setCalculationComplete(false);
    setActiveTab("calculator");
  };
  
  // Apply a preset strategy
  const applyPreset = (preset: 'balanced' | 'aggressive' | 'conservative' | 'taxSaver' | 'wealthBuilder') => {
    // Set the selected preset
    setSelectedPreset(preset);
    
    switch (preset) {
      case 'balanced':
        setAnnualInvestment(75000);
        setInvestmentStrategy('fixed');
        setInvestmentPeriod(15);
        break;
      case 'aggressive':
        setAnnualInvestment(50000);
        setInvestmentStrategy('increasing');
        setIncreaseRate(15);
        setInvestmentPeriod(20);
        break;
      case 'conservative':
        setAnnualInvestment(120000);
        setInvestmentStrategy('fixed');
        setInvestmentPeriod(15);
        break;
      case 'taxSaver':
        setAnnualInvestment(150000);
        setInvestmentStrategy('fixed');
        setInvestmentPeriod(15);
        break;
      case 'wealthBuilder':
        setAnnualInvestment(100000);
        setInvestmentStrategy('moderate');
        setIncreaseRate(10);
        setInvestmentPeriod(25);
        setExtendPeriod(true);
        break;
    }
    
    // Show toast for applied preset
    toast({
      title: `${preset.charAt(0).toUpperCase() + preset.slice(1)} Preset Applied`,
      description: "Investment parameters have been updated. Calculate to see results.",
    });
  };
  
  // Generate pie chart data for investment vs interest
  const pieChartData = useMemo(() => [
    { name: 'Total Investment', value: totalInvestment, color: '#3b82f6' },
    { name: 'Interest Earned', value: totalInterest, color: '#10b981' },
  ], [totalInvestment, totalInterest]);
  
  // Generate advanced breakdown data
  const breakdownData = useMemo(() => [
    { name: 'Principal', value: totalInvestment, color: '#3b82f6' },
    { name: 'Interest', value: totalInterest, color: '#10b981' },
    { name: 'Tax Savings', value: taxSavings, color: '#f59e0b' },
  ], [totalInvestment, totalInterest, taxSavings]);
  
  // Calculate if goal will be reached
  const goalReached = useMemo(() => {
    if (!financialGoal || yearlyData.length === 0) return false;
    
    const goalAmount = financialGoal === 'custom' 
      ? customGoalAmount 
      : financialGoals[financialGoal].targetAmount;
    
    const finalAmount = yearlyData[yearlyData.length - 1].balance;
    return finalAmount >= goalAmount;
  }, [financialGoal, customGoalAmount, yearlyData]);
  
  // Get recommended investment if goal selected
  useEffect(() => {
    if (financialGoal && financialGoal !== 'custom') {
      const recommendedAmount = calculateRecommendedInvestment(financialGoal);
      // Don't automatically set it, just show as suggestion
    }
  }, [financialGoal, interestRate, startYear]);
  
  return (
    <CalculatorLayout
      title="PPF Calculator"
      description="Calculate returns on your Public Provident Fund (PPF) investments and plan your tax-saving investments."
      keywords="PPF calculator, Public Provident Fund, tax savings, compound interest, 15-year investment, India PPF, section 80C"
      calculatorType="Investment"
      icon="account_balance_wallet"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator" className="text-center">
            <span className="flex items-center">
              <CalculatorIcon className="w-4 h-4 mr-2" />
              Calculator
            </span>
          </TabsTrigger>
          <TabsTrigger value="strategy" className="text-center">
            <span className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              Strategy
            </span>
          </TabsTrigger>
          <TabsTrigger value="results" className="text-center" disabled={!calculationComplete}>
            <span className="flex items-center">
              <BarChart4 className="w-4 h-4 mr-2" />
              Results
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="mt-6">
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#2563eb] rounded-lg p-3 sm:p-4 text-white">
            <div className="flex items-center mb-2 sm:mb-0">
              <BadgeIndianRupee className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
              <div>
                <h2 className="font-bold text-base sm:text-lg">RupeeSmart PPF Calculator</h2>
                <p className="text-xs sm:text-sm text-blue-100">Plan your tax-free investment journey</p>
              </div>
            </div>
            <div className="w-full sm:w-auto flex items-center gap-2">
              <Button 
                size="sm" 
                className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50 border border-white text-xs sm:text-sm py-1 h-8 sm:h-9"
                onClick={() => setAdvancedMode(!advancedMode)}
              >
                {advancedMode ? 'Basic Mode' : 'Advanced Mode'}
              </Button>
            </div>
          </div>
          

          
          {/* Quick Strategy Presets */}
          <div className="mb-6">
            <Label className="text-base font-medium mb-2 block">Quick Presets</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
              <Button 
                variant={selectedPreset === 'balanced' ? 'default' : 'outline'} 
                className={`h-auto py-2 sm:py-3 flex flex-col items-center ${
                  selectedPreset === 'balanced' 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-blue-200 hover:border-blue-500 hover:bg-blue-50'
                }`}
                onClick={() => applyPreset('balanced')}
              >
                <BadgeIndianRupee className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 ${selectedPreset === 'balanced' ? 'text-white' : 'text-blue-600'}`} />
                <span className="text-xs sm:text-sm font-medium">Balanced</span>
                <span className={`text-[10px] sm:text-xs ${selectedPreset === 'balanced' ? 'text-blue-100' : 'text-muted-foreground'}`}>Mid-range</span>
              </Button>
              <Button 
                variant={selectedPreset === 'aggressive' ? 'default' : 'outline'} 
                className={`h-auto py-2 sm:py-3 flex flex-col items-center ${
                  selectedPreset === 'aggressive' 
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : 'border-purple-200 hover:border-purple-500 hover:bg-purple-50'
                }`}
                onClick={() => applyPreset('aggressive')}
              >
                <TrendingUp className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 ${selectedPreset === 'aggressive' ? 'text-white' : 'text-purple-600'}`} />
                <span className="text-xs sm:text-sm font-medium">Aggressive</span>
                <span className={`text-[10px] sm:text-xs ${selectedPreset === 'aggressive' ? 'text-purple-100' : 'text-muted-foreground'}`}>Growth-focused</span>
              </Button>
              <Button 
                variant={selectedPreset === 'conservative' ? 'default' : 'outline'} 
                className={`h-auto py-2 sm:py-3 flex flex-col items-center ${
                  selectedPreset === 'conservative' 
                    ? 'bg-green-600 border-green-600 text-white' 
                    : 'border-green-200 hover:border-green-500 hover:bg-green-50'
                }`}
                onClick={() => applyPreset('conservative')}
              >
                <Wallet className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 ${selectedPreset === 'conservative' ? 'text-white' : 'text-green-600'}`} />
                <span className="text-xs sm:text-sm font-medium">Conservative</span>
                <span className={`text-[10px] sm:text-xs ${selectedPreset === 'conservative' ? 'text-green-100' : 'text-muted-foreground'}`}>Steady</span>
              </Button>
              <Button 
                variant={selectedPreset === 'taxSaver' ? 'default' : 'outline'} 
                className={`h-auto py-2 sm:py-3 flex flex-col items-center ${
                  selectedPreset === 'taxSaver' 
                    ? 'bg-amber-600 border-amber-600 text-white' 
                    : 'border-amber-200 hover:border-amber-500 hover:bg-amber-50'
                }`}
                onClick={() => applyPreset('taxSaver')}
              >
                <Receipt className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 ${selectedPreset === 'taxSaver' ? 'text-white' : 'text-amber-600'}`} />
                <span className="text-xs sm:text-sm font-medium">Tax Saver</span>
                <span className={`text-[10px] sm:text-xs ${selectedPreset === 'taxSaver' ? 'text-amber-100' : 'text-muted-foreground'}`}>80C benefit</span>
              </Button>
              <Button 
                variant={selectedPreset === 'wealthBuilder' ? 'default' : 'outline'} 
                className={`h-auto py-2 sm:py-3 flex flex-col items-center ${
                  selectedPreset === 'wealthBuilder' 
                    ? 'bg-indigo-600 border-indigo-600 text-white' 
                    : 'border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50'
                }`}
                onClick={() => applyPreset('wealthBuilder')}
              >
                <Sparkles className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 ${selectedPreset === 'wealthBuilder' ? 'text-white' : 'text-indigo-600'}`} />
                <span className="text-xs sm:text-sm font-medium">Wealth Builder</span>
                <span className={`text-[10px] sm:text-xs ${selectedPreset === 'wealthBuilder' ? 'text-indigo-100' : 'text-muted-foreground'}`}>Long-term</span>
              </Button>
            </div>
          </div>
          
          {/* Goal Selection */}
          <div className="mb-6">
            <Label className="text-base font-medium flex items-center mb-2">
              Financial Goal
              <Tooltip text="Select a financial goal to get recommended investment amounts and timelines.">
                <Info className="h-4 w-4 ml-2 text-muted-foreground" />
              </Tooltip>
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
              {Object.entries(financialGoals).map(([key, goal]) => (
                <Button 
                  key={key}
                  variant={financialGoal === key ? "default" : "outline"}
                  className={`h-auto py-2 sm:py-3 flex flex-col items-center ${financialGoal === key ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`}
                  onClick={() => setGoal(key)}
                >
                  <span className="material-icons text-base sm:text-xl mb-1">{goal.icon}</span>
                  <span className="text-xs sm:text-sm font-medium">{goal.name}</span>
                  <span className="text-[10px] sm:text-xs">{formatCurrency(goal.targetAmount)}</span>
                </Button>
              ))}
              <Button 
                variant={financialGoal === null ? "default" : "outline"}
                className={`h-auto py-2 sm:py-3 flex flex-col items-center ${financialGoal === null ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`}
                onClick={() => setGoal(null)}
              >
                <span className="material-icons text-base sm:text-xl mb-1">not_interested</span>
                <span className="text-xs sm:text-sm font-medium">No Goal</span>
                <span className="text-[10px] sm:text-xs">Flexible</span>
              </Button>
            </div>
            
            {financialGoal === 'custom' && (
              <div className="mt-3 p-2 sm:p-3 border rounded-md bg-gray-50">
                <Label className="text-sm">Custom Goal Amount</Label>
                <div className="flex flex-col sm:flex-row sm:items-center mt-1 gap-2 sm:gap-3">
                  <Slider
                    value={[customGoalAmount]}
                    min={100000}
                    max={10000000}
                    step={100000}
                    onValueChange={(value) => setCustomGoalAmount(value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={customGoalAmount}
                    onChange={(e) => setCustomGoalAmount(Number(e.target.value))}
                    className="w-full sm:w-32 mt-2 sm:mt-0"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>₹1 Lakh</span>
                  <span>₹1 Crore</span>
                </div>
              </div>
            )}
            
            {financialGoal && financialGoal !== 'custom' && (
              <div className="mt-3 p-2 sm:p-3 border rounded-md bg-blue-50">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Educational Projection:</span>{' '}
                  You might consider around {formatCurrency(calculateRecommendedInvestment(financialGoal))} annually for this goal, but your needs could vary.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 mt-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-xs h-8 w-full sm:w-auto"
                    onClick={() => setAnnualInvestment(calculateRecommendedInvestment(financialGoal))}
                  >
                    Try This Example
                  </Button>
                  <p className="text-xs text-blue-600 text-center sm:text-right">
                    Target Year: {financialGoals[financialGoal].targetYear}
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <Card className="border shadow-sm">
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-blue-800 flex items-center">
                <IndianRupee className="w-5 h-5 mr-2" />
                PPF Investment Details
              </CardTitle>
              <CardDescription>
                Enter your Public Provident Fund investment details
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-8">
                {/* Annual Investment */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-base font-medium flex items-center">
                      Annual Investment
                      <Tooltip text="The amount you plan to invest every year in your PPF account. Min: ₹500, Max: ₹1,50,000 per financial year.">
                        <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                      </Tooltip>
                    </Label>
                    <span className="text-right font-medium text-lg">
                      {formatCurrency(annualInvestment)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Slider
                      value={[annualInvestment]}
                      min={500}
                      max={150000}
                      step={500}
                      onValueChange={(value) => setAnnualInvestment(value[0])}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={annualInvestment}
                      onChange={(e) => setAnnualInvestment(Number(e.target.value))}
                      className="w-24"
                      min={500}
                      max={150000}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹500</span>
                    <span>₹1,50,000</span>
                  </div>
                </div>
                
                {/* Interest Rate */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <Label className="text-base font-medium flex items-center">
                      Interest Rate
                      <Tooltip text="Current PPF interest rate is 7.1% per annum (as of May 2025). Interest is compounded annually.">
                        <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                      </Tooltip>
                    </Label>
                    <span className="text-left sm:text-right font-medium text-lg mt-1 sm:mt-0">
                      {formatPercentage(interestRate)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <Slider
                      value={[interestRate]}
                      min={1.0}
                      max={10.0}
                      step={0.1}
                      onValueChange={(value) => setInterestRate(value[0])}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-16 sm:w-24"
                      min={1.0}
                      max={10.0}
                      step={0.1}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1.0%</span>
                    <span>10.0%</span>
                  </div>
                </div>
                
                {/* Investment Period */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <Label className="text-base font-medium flex items-center">
                      Investment Period
                      <Tooltip text="PPF has a lock-in period of 15 years, but can be extended in blocks of 5 years. Withdrawals are allowed from the 7th year onwards.">
                        <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                      </Tooltip>
                    </Label>
                    <span className="text-left sm:text-right font-medium text-lg mt-1 sm:mt-0">
                      {investmentPeriod} years
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <Slider
                      value={[investmentPeriod]}
                      min={1}
                      max={50}
                      step={1}
                      onValueChange={(value) => setInvestmentPeriod(value[0])}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={investmentPeriod}
                      onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                      className="w-16 sm:w-24"
                      min={1}
                      max={50}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 year</span>
                    <span>50 years</span>
                  </div>
                </div>
                
                {/* Start Year */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <Label className="text-base font-medium flex items-center">
                      Start Year
                      <Tooltip text="The financial year when you start your PPF investment. This is for display purposes only.">
                        <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                      </Tooltip>
                    </Label>
                    <span className="text-left sm:text-right font-medium text-lg mt-1 sm:mt-0">
                      {startYear}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <Slider
                      value={[startYear]}
                      min={new Date().getFullYear() - 10}
                      max={new Date().getFullYear() + 10}
                      step={1}
                      onValueChange={(value) => setStartYear(value[0])}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={startYear}
                      onChange={(e) => setStartYear(Number(e.target.value))}
                      className="w-16 sm:w-24"
                      min={new Date().getFullYear() - 10}
                      max={new Date().getFullYear() + 10}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{new Date().getFullYear() - 10}</span>
                    <span>{new Date().getFullYear() + 10}</span>
                  </div>
                </div>
                
                {/* Advanced Settings */}
                {advancedMode && (
                  <>
                    {/* Inflation Rate */}
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <Label className="text-base font-medium flex items-center">
                          Inflation Rate
                          <Tooltip text="Used to calculate the real purchasing power of your investment after inflation.">
                            <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                          </Tooltip>
                        </Label>
                        <span className="text-left sm:text-right font-medium text-lg mt-1 sm:mt-0">
                          {formatPercentage(inflationRate)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-4">
                        <Slider
                          value={[inflationRate]}
                          min={1.0}
                          max={15.0}
                          step={0.1}
                          onValueChange={(value) => setInflationRate(value[0])}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={inflationRate}
                          onChange={(e) => setInflationRate(Number(e.target.value))}
                          className="w-16 sm:w-24"
                          min={1.0}
                          max={15.0}
                          step={0.1}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1.0%</span>
                        <span>15.0%</span>
                      </div>
                    </div>
                    
                    {/* Extension Options */}
                    <div className="border p-3 sm:p-4 rounded-md space-y-4">
                      <div className="flex items-center">
                        <Checkbox 
                          id="extend-period" 
                          checked={extendPeriod}
                          onCheckedChange={(checked) => setExtendPeriod(checked === true)}
                          className="w-4 h-4 sm:w-5 sm:h-5"
                        />
                        <Label htmlFor="extend-period" className="ml-2 font-medium text-sm sm:text-base">
                          Extend PPF after lock-in period
                        </Label>
                      </div>
                      
                      {extendPeriod && (
                        <div className="pl-4 sm:pl-6 space-y-2">
                          <Label className="text-xs sm:text-sm">Extension Years</Label>
                          <div className="flex items-center space-x-2 sm:space-x-4">
                            <Slider
                              value={[extensionYears]}
                              min={1}
                              max={15}
                              step={1}
                              onValueChange={(value) => setExtensionYears(value[0])}
                              className="flex-1"
                            />
                            <span className="w-16 sm:w-20 text-center font-medium text-sm">
                              {extensionYears} years
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Withdrawal Options */}
                    <div className="border p-3 sm:p-4 rounded-md space-y-4">
                      <div className="flex items-center">
                        <Checkbox 
                          id="include-withdrawals" 
                          checked={includeWithdrawals}
                          onCheckedChange={(checked) => setIncludeWithdrawals(checked === true)}
                          className="w-4 h-4 sm:w-5 sm:h-5"
                        />
                        <Label htmlFor="include-withdrawals" className="ml-2 font-medium text-sm sm:text-base">
                          Include partial withdrawals in calculation
                        </Label>
                      </div>
                      
                      {includeWithdrawals && (
                        <div className="pl-4 sm:pl-6 space-y-4">
                          <div className="flex items-center">
                            <Checkbox 
                              id="enable-withdrawals" 
                              checked={enablePartialWithdrawals}
                              onCheckedChange={(checked) => setEnablePartialWithdrawals(checked === true)}
                              className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                            <Label htmlFor="enable-withdrawals" className="ml-2 text-sm sm:text-base">
                              Schedule a specific withdrawal
                            </Label>
                          </div>
                          
                          {enablePartialWithdrawals && (
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label className="text-xs sm:text-sm">Withdrawal Year (must be ≥ 7)</Label>
                                <div className="flex items-center space-x-2 sm:space-x-4">
                                  <Slider
                                    value={[withdrawalYear]}
                                    min={7}
                                    max={investmentPeriod}
                                    step={1}
                                    onValueChange={(value) => setWithdrawalYear(value[0])}
                                    className="flex-1"
                                    disabled={investmentPeriod < 7}
                                  />
                                  <span className="w-16 sm:w-20 text-center font-medium text-sm">
                                    Year {withdrawalYear}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label className="text-xs sm:text-sm">Withdrawal Percentage</Label>
                                <div className="flex items-center space-x-2 sm:space-x-4">
                                  <Slider
                                    value={[withdrawalPercentage]}
                                    min={1}
                                    max={100}
                                    step={1}
                                    onValueChange={(value) => setWithdrawalPercentage(value[0])}
                                    className="flex-1"
                                  />
                                  <span className="w-16 sm:w-20 text-center font-medium text-sm">
                                    {withdrawalPercentage}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Visualization Options */}
                    <div className="border p-3 sm:p-4 rounded-md">
                      <div className="flex items-center">
                        <Checkbox 
                          id="inflation-adjustment" 
                          checked={withInflationAdjustment}
                          onCheckedChange={(checked) => setWithInflationAdjustment(checked === true)}
                          className="w-4 h-4 sm:w-5 sm:h-5"
                        />
                        <Label htmlFor="inflation-adjustment" className="ml-2 text-sm sm:text-base">
                          Show inflation-adjusted values
                        </Label>
                      </div>
                      
                      <div className="flex items-center mt-3">
                        <Checkbox 
                          id="show-milestones" 
                          checked={showMilestones}
                          onCheckedChange={(checked) => setShowMilestones(checked === true)}
                          className="w-4 h-4 sm:w-5 sm:h-5"
                        />
                        <Label htmlFor="show-milestones" className="ml-2 text-sm sm:text-base">
                          Show investment milestones
                        </Label>
                      </div>
                    </div>
                  </>
                )}
                
                {/* PPF Info Box */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-blue-800 font-medium flex items-center mb-2">
                    <Medal className="h-5 w-5 mr-2 text-blue-600" />
                    Why PPF is a Smart Investment
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-1 ml-6 list-disc">
                    <li>EEE Tax Status - Exempt at investment, interest & maturity</li>
                    <li>Government-backed safety with decent returns (7.1% currently)</li>
                    <li>Compounding power over long-term lock-in period</li>
                    <li>Loan facility available from 3rd to 6th year</li>
                    <li>Partial withdrawals allowed from 7th year onwards</li>
                    <li>Option to extend in blocks of 5 years after 15 years</li>
                    <li>Section 80C tax benefits on investments up to ₹1,50,000</li>
                    <li>Ideal for long-term wealth building with zero risk</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-3 border-t p-6 bg-gray-50">
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  onClick={resetCalculator}
                  className="flex-1 sm:flex-none"
                >
                  Reset
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 sm:flex-none flex items-center text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={() => setActiveTab("strategy")}
                >
                  Investment Strategy
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <Button 
                onClick={() => {
                  try {
                    calculatePPF();
                    setActiveTab("results");
                  } catch (error) {
                    toast({
                      title: "Calculation Error",
                      description: "There was a problem with the calculation. Please check your inputs and try again.",
                      variant: "destructive"
                    });
                    console.error("PPF calculation error:", error);
                  }
                }}
                className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
              >
                <IndianRupee className="w-4 h-4 mr-2" />
                Calculate Returns
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="strategy" className="mt-6">
          <Card className="border shadow-sm">
            <CardHeader className="bg-[#2563eb] text-white border-b">
              <CardTitle className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Investment Strategy
              </CardTitle>
              <CardDescription className="text-blue-100">
                Customize how your PPF investments grow over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Investment Strategy Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Investment Pattern</Label>
                  <RadioGroup 
                    value={investmentStrategy} 
                    onValueChange={(value) => setInvestmentStrategy(value as InvestmentStrategy)}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="fixed" id="strategy-fixed" className="peer sr-only" />
                      <Label 
                        htmlFor="strategy-fixed" 
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 [&:has([data-state=checked])]:border-blue-500 cursor-pointer"
                      >
                        <IndianRupee className="mb-2 h-5 w-5 text-blue-500" />
                        <span className="font-medium">Fixed Investment</span>
                        <span className="text-sm text-muted-foreground text-center">
                          Same amount every year
                        </span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem value="increasing" id="strategy-increasing" className="peer sr-only" />
                      <Label 
                        htmlFor="strategy-increasing" 
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-50 [&:has([data-state=checked])]:border-green-500 cursor-pointer"
                      >
                        <TrendingUp className="mb-2 h-5 w-5 text-green-500" />
                        <span className="font-medium">Steadily Increasing</span>
                        <span className="text-sm text-muted-foreground text-center">
                          Regular yearly increases
                        </span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem value="aggressive" id="strategy-aggressive" className="peer sr-only" />
                      <Label 
                        htmlFor="strategy-aggressive" 
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-50 [&:has([data-state=checked])]:border-purple-500 cursor-pointer"
                      >
                        <Sparkles className="mb-2 h-5 w-5 text-purple-500" />
                        <span className="font-medium">Aggressive Growth</span>
                        <span className="text-sm text-muted-foreground text-center">
                          Accelerated increases
                        </span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem value="moderate" id="strategy-moderate" className="peer sr-only" />
                      <Label 
                        htmlFor="strategy-moderate" 
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-amber-500 peer-data-[state=checked]:bg-amber-50 [&:has([data-state=checked])]:border-amber-500 cursor-pointer"
                      >
                        <Target className="mb-2 h-5 w-5 text-amber-500" />
                        <span className="font-medium">Moderate</span>
                        <span className="text-sm text-muted-foreground text-center">
                          Balanced with periodic boosts
                        </span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem value="conservative" id="strategy-conservative" className="peer sr-only" />
                      <Label 
                        htmlFor="strategy-conservative" 
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-red-500 peer-data-[state=checked]:bg-red-50 [&:has([data-state=checked])]:border-red-500 cursor-pointer"
                      >
                        <Wallet className="mb-2 h-5 w-5 text-red-500" />
                        <span className="font-medium">Conservative</span>
                        <span className="text-sm text-muted-foreground text-center">
                          Slow growth with adjustments
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Strategy Description */}
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                  {investmentStrategy === 'fixed' && (
                    <div className="flex">
                      <IndianRupee className="w-5 h-5 mt-1 text-blue-600 flex-shrink-0 mr-3" />
                      <div>
                        <h3 className="font-medium text-blue-900">Fixed Investment Strategy</h3>
                        <p className="text-sm text-blue-700 mt-1">
                          With this strategy, you invest the same amount (₹{annualInvestment.toLocaleString()}) every year. 
                          This is the simplest approach and provides predictable growth. Ideal for those who prefer 
                          consistency and have a fixed budget for tax-saving investments.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {investmentStrategy === 'increasing' && (
                    <div className="flex">
                      <TrendingUp className="w-5 h-5 mt-1 text-green-600 flex-shrink-0 mr-3" />
                      <div>
                        <h3 className="font-medium text-green-900">Steadily Increasing Strategy</h3>
                        <p className="text-sm text-green-700 mt-1">
                          Start with ₹{annualInvestment.toLocaleString()} and increase your investment by {increaseRate}% each year.
                          This strategy helps your investment grow with your income. Maximum yearly investment 
                          is capped at ₹{yearlyIncreaseLimit.toLocaleString()} as per PPF rules.
                        </p>
                        
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-green-800">Annual Increase Rate</Label>
                            <div className="flex items-center space-x-3 mt-1">
                              <Slider
                                value={[increaseRate]}
                                min={1}
                                max={25}
                                step={1}
                                onValueChange={(value) => setIncreaseRate(value[0])}
                                className="flex-1"
                              />
                              <span className="text-sm font-medium w-12 text-right">{increaseRate}%</span>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-xs text-green-800">Maximum Yearly Investment</Label>
                            <div className="flex items-center space-x-3 mt-1">
                              <Slider
                                value={[yearlyIncreaseLimit]}
                                min={50000}
                                max={150000}
                                step={10000}
                                onValueChange={(value) => setYearlyIncreaseLimit(value[0])}
                                className="flex-1"
                              />
                              <span className="text-sm font-medium w-20 text-right">₹{(yearlyIncreaseLimit/1000).toFixed(0)}K</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {investmentStrategy === 'aggressive' && (
                    <div className="flex">
                      <Sparkles className="w-5 h-5 mt-1 text-purple-600 flex-shrink-0 mr-3" />
                      <div>
                        <h3 className="font-medium text-purple-900">Aggressive Growth Strategy</h3>
                        <p className="text-sm text-purple-700 mt-1">
                          Start with ₹{annualInvestment.toLocaleString()} and increase aggressively each year with 
                          accelerating increments (15% + 1% extra per year). This strategy is designed for those with 
                          rapidly growing income who want to maximize their PPF investment over time.
                        </p>
                        
                        <div className="mt-3">
                          <Label className="text-xs text-purple-800">Maximum Yearly Investment</Label>
                          <div className="flex items-center space-x-3 mt-1">
                            <Slider
                              value={[yearlyIncreaseLimit]}
                              min={50000}
                              max={150000}
                              step={10000}
                              onValueChange={(value) => setYearlyIncreaseLimit(value[0])}
                              className="flex-1"
                            />
                            <span className="text-sm font-medium w-20 text-right">₹{(yearlyIncreaseLimit/1000).toFixed(0)}K</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {investmentStrategy === 'moderate' && (
                    <div className="flex">
                      <Target className="w-5 h-5 mt-1 text-amber-600 flex-shrink-0 mr-3" />
                      <div>
                        <h3 className="font-medium text-amber-900">Moderate Strategy</h3>
                        <p className="text-sm text-amber-700 mt-1">
                          Start with ₹{annualInvestment.toLocaleString()} and increase by {increaseRate}% each year.
                          Additionally, every 5 years you make a 10% bonus contribution. This strategy balances
                          steady growth with periodic boosts to accelerate your PPF corpus.
                        </p>
                        
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-amber-800">Annual Increase Rate</Label>
                            <div className="flex items-center space-x-3 mt-1">
                              <Slider
                                value={[increaseRate]}
                                min={1}
                                max={20}
                                step={1}
                                onValueChange={(value) => setIncreaseRate(value[0])}
                                className="flex-1"
                              />
                              <span className="text-sm font-medium w-12 text-right">{increaseRate}%</span>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-xs text-amber-800">Maximum Yearly Investment</Label>
                            <div className="flex items-center space-x-3 mt-1">
                              <Slider
                                value={[yearlyIncreaseLimit]}
                                min={50000}
                                max={150000}
                                step={10000}
                                onValueChange={(value) => setYearlyIncreaseLimit(value[0])}
                                className="flex-1"
                              />
                              <span className="text-sm font-medium w-20 text-right">₹{(yearlyIncreaseLimit/1000).toFixed(0)}K</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {investmentStrategy === 'conservative' && (
                    <div className="flex">
                      <Wallet className="w-5 h-5 mt-1 text-red-600 flex-shrink-0 mr-3" />
                      <div>
                        <h3 className="font-medium text-red-900">Conservative Strategy</h3>
                        <p className="text-sm text-red-700 mt-1">
                          Start with ₹{annualInvestment.toLocaleString()} and increase by {increaseRate/2}% each year
                          (half of standard rate). Every 7 years, you slightly reduce your contribution by 5% to adjust for 
                          other financial priorities. This strategy is designed for cautious investors who prefer stability.
                        </p>
                        
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-red-800">Base Increase Rate (applied at 50%)</Label>
                            <div className="flex items-center space-x-3 mt-1">
                              <Slider
                                value={[increaseRate]}
                                min={2}
                                max={20}
                                step={2}
                                onValueChange={(value) => setIncreaseRate(value[0])}
                                className="flex-1"
                              />
                              <span className="text-sm font-medium w-16 text-right">{increaseRate/2}%</span>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-xs text-red-800">Maximum Yearly Investment</Label>
                            <div className="flex items-center space-x-3 mt-1">
                              <Slider
                                value={[yearlyIncreaseLimit]}
                                min={50000}
                                max={150000}
                                step={10000}
                                onValueChange={(value) => setYearlyIncreaseLimit(value[0])}
                                className="flex-1"
                              />
                              <span className="text-sm font-medium w-20 text-right">₹{(yearlyIncreaseLimit/1000).toFixed(0)}K</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Investment Schedule Preview */}
                <div>
                  <h3 className="text-base font-medium mb-3">Investment Schedule Preview</h3>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Year</th>
                          <th className="px-4 py-2 text-right">Financial Year</th>
                          <th className="px-4 py-2 text-right">Investment Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {Array.from({ length: Math.min(5, investmentPeriod) }).map((_, index) => {
                          const year = index + 1;
                          let amount = year === 1 ? annualInvestment : 0;
                          
                          // Calculate preview amounts based on strategy
                          if (year > 1) {
                            let prevAmount = year === 2 ? annualInvestment : 0;
                            
                            if (year === 2) {
                              switch (investmentStrategy) {
                                case 'fixed':
                                  amount = annualInvestment;
                                  break;
                                case 'increasing':
                                  amount = Math.min(annualInvestment * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                  break;
                                case 'aggressive':
                                  amount = Math.min(annualInvestment * (1 + 0.15 + (0.01)), yearlyIncreaseLimit);
                                  break;
                                case 'moderate':
                                  amount = Math.min(annualInvestment * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                  break;
                                case 'conservative':
                                  amount = Math.min(annualInvestment * (1 + (increaseRate / 100) * 0.5), yearlyIncreaseLimit);
                                  break;
                              }
                            } else if (year === 3) {
                              const year2Amount = (() => {
                                switch (investmentStrategy) {
                                  case 'fixed':
                                    return annualInvestment;
                                  case 'increasing':
                                    return Math.min(annualInvestment * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                  case 'aggressive':
                                    return Math.min(annualInvestment * (1 + 0.15 + (0.01)), yearlyIncreaseLimit);
                                  case 'moderate':
                                    return Math.min(annualInvestment * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                  case 'conservative':
                                    return Math.min(annualInvestment * (1 + (increaseRate / 100) * 0.5), yearlyIncreaseLimit);
                                  default:
                                    return annualInvestment;
                                }
                              })();
                              
                              switch (investmentStrategy) {
                                case 'fixed':
                                  amount = annualInvestment;
                                  break;
                                case 'increasing':
                                  amount = Math.min(year2Amount * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                  break;
                                case 'aggressive':
                                  amount = Math.min(year2Amount * (1 + 0.15 + (0.02)), yearlyIncreaseLimit);
                                  break;
                                case 'moderate':
                                  amount = Math.min(year2Amount * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                  break;
                                case 'conservative':
                                  amount = Math.min(year2Amount * (1 + (increaseRate / 100) * 0.5), yearlyIncreaseLimit);
                                  break;
                              }
                            } else if (year === 4) {
                              const year3Amount = (() => {
                                const year2Amount = (() => {
                                  switch (investmentStrategy) {
                                    case 'fixed':
                                      return annualInvestment;
                                    case 'increasing':
                                      return Math.min(annualInvestment * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                    case 'aggressive':
                                      return Math.min(annualInvestment * (1 + 0.15 + (0.01)), yearlyIncreaseLimit);
                                    case 'moderate':
                                      return Math.min(annualInvestment * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                    case 'conservative':
                                      return Math.min(annualInvestment * (1 + (increaseRate / 100) * 0.5), yearlyIncreaseLimit);
                                    default:
                                      return annualInvestment;
                                  }
                                })();
                                
                                switch (investmentStrategy) {
                                  case 'fixed':
                                    return annualInvestment;
                                  case 'increasing':
                                    return Math.min(year2Amount * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                  case 'aggressive':
                                    return Math.min(year2Amount * (1 + 0.15 + (0.02)), yearlyIncreaseLimit);
                                  case 'moderate':
                                    return Math.min(year2Amount * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                  case 'conservative':
                                    return Math.min(year2Amount * (1 + (increaseRate / 100) * 0.5), yearlyIncreaseLimit);
                                  default:
                                    return annualInvestment;
                                }
                              })();
                              
                              switch (investmentStrategy) {
                                case 'fixed':
                                  amount = annualInvestment;
                                  break;
                                case 'increasing':
                                  amount = Math.min(year3Amount * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                  break;
                                case 'aggressive':
                                  amount = Math.min(year3Amount * (1 + 0.15 + (0.03)), yearlyIncreaseLimit);
                                  break;
                                case 'moderate':
                                  amount = Math.min(year3Amount * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                  break;
                                case 'conservative':
                                  amount = Math.min(year3Amount * (1 + (increaseRate / 100) * 0.5), yearlyIncreaseLimit);
                                  break;
                              }
                            } else if (year === 5) {
                              const year4Amount = (() => {
                                const year3Amount = (() => {
                                  const year2Amount = (() => {
                                    switch (investmentStrategy) {
                                      case 'fixed':
                                        return annualInvestment;
                                      case 'increasing':
                                        return Math.min(annualInvestment * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                      case 'aggressive':
                                        return Math.min(annualInvestment * (1 + 0.15 + (0.01)), yearlyIncreaseLimit);
                                      case 'moderate':
                                        return Math.min(annualInvestment * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                      case 'conservative':
                                        return Math.min(annualInvestment * (1 + (increaseRate / 100) * 0.5), yearlyIncreaseLimit);
                                      default:
                                        return annualInvestment;
                                    }
                                  })();
                                  
                                  switch (investmentStrategy) {
                                    case 'fixed':
                                      return annualInvestment;
                                    case 'increasing':
                                      return Math.min(year2Amount * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                    case 'aggressive':
                                      return Math.min(year2Amount * (1 + 0.15 + (0.02)), yearlyIncreaseLimit);
                                    case 'moderate':
                                      return Math.min(year2Amount * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                    case 'conservative':
                                      return Math.min(year2Amount * (1 + (increaseRate / 100) * 0.5), yearlyIncreaseLimit);
                                    default:
                                      return annualInvestment;
                                  }
                                })();
                                
                                switch (investmentStrategy) {
                                  case 'fixed':
                                    return annualInvestment;
                                  case 'increasing':
                                    return Math.min(year3Amount * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                  case 'aggressive':
                                    return Math.min(year3Amount * (1 + 0.15 + (0.03)), yearlyIncreaseLimit);
                                  case 'moderate':
                                    return Math.min(year3Amount * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                  case 'conservative':
                                    return Math.min(year3Amount * (1 + (increaseRate / 100) * 0.5), yearlyIncreaseLimit);
                                  default:
                                    return annualInvestment;
                                }
                              })();
                              
                              switch (investmentStrategy) {
                                case 'fixed':
                                  amount = annualInvestment;
                                  break;
                                case 'increasing':
                                  amount = Math.min(year4Amount * (1 + increaseRate / 100), yearlyIncreaseLimit);
                                  break;
                                case 'aggressive':
                                  amount = Math.min(year4Amount * (1 + 0.15 + (0.04)), yearlyIncreaseLimit);
                                  break;
                                case 'moderate':
                                  // Year 5 gets the bonus in moderate strategy
                                  amount = Math.min(year4Amount * (1 + increaseRate / 100) * 1.1, yearlyIncreaseLimit);
                                  break;
                                case 'conservative':
                                  amount = Math.min(year4Amount * (1 + (increaseRate / 100) * 0.5), yearlyIncreaseLimit);
                                  break;
                              }
                            }
                          }
                          
                          return (
                            <tr key={year} className="hover:bg-gray-50">
                              <td className="px-4 py-2 text-left">{year}</td>
                              <td className="px-4 py-2 text-right">{`${startYear + year - 1}-${(startYear + year).toString().slice(2)}`}</td>
                              <td className="px-4 py-2 text-right font-medium">{formatCurrency(Math.round(amount))}</td>
                            </tr>
                          );
                        })}
                        {investmentPeriod > 5 && (
                          <tr>
                            <td colSpan={3} className="px-4 py-2 text-center text-muted-foreground">
                              ...and so on up to year {investmentPeriod}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6 bg-gray-50">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab("calculator")}
                className="flex items-center"
              >
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Back to Calculator
              </Button>
              <Button 
                onClick={() => {
                  try {
                    calculatePPF();
                    setActiveTab("results");
                  } catch (error) {
                    toast({
                      title: "Calculation Error",
                      description: "There was a problem with the calculation. Please check your inputs and try again.",
                      variant: "destructive"
                    });
                    console.error("PPF calculation error:", error);
                  }
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                <IndianRupee className="w-4 h-4 mr-2" />
                Calculate Returns
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="results" className="mt-6">
          {calculationComplete && (
            <div className="space-y-6">
              {/* Results Header */}
              <div className="bg-[#2563eb] p-6 rounded-lg shadow-md text-white">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <BadgeIndianRupee className="w-10 h-10 mr-4" />
                    <div>
                      <h2 className="text-2xl font-bold">PPF Investment Results</h2>
                      <p className="text-blue-100">
                        {formatCurrency(annualInvestment)} {investmentStrategy !== 'fixed' ? '(initial) ' : ''}
                        invested annually for {investmentPeriod} years{extendPeriod ? ` + ${extensionYears} extension years` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 py-1 px-4 rounded-full text-sm">
                      Interest Rate: {formatPercentage(interestRate)}
                    </div>
                    <div className="bg-white/20 py-1 px-4 rounded-full text-sm">
                      Strategy: {investmentStrategy.charAt(0).toUpperCase() + investmentStrategy.slice(1)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <p className="text-base md:text-lg">{readableSummary}</p>
                </div>
                
                {financialGoal && (
                  <div className={`mt-4 p-3 rounded-lg flex items-center ${goalReached ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
                    <span className="material-icons mr-2 text-2xl">
                      {goalReached ? 'check_circle' : 'warning'}
                    </span>
                    <div>
                      <p className="font-medium">
                        Goal: {financialGoals[financialGoal].name} ({formatCurrency(financialGoal === 'custom' ? customGoalAmount : financialGoals[financialGoal].targetAmount)})
                      </p>
                      <p className="text-sm">
                        {goalReached 
                          ? 'Your investment might potentially achieve this financial goal based on these projections.' 
                          : 'Based on these projections, your investment might fall short of this goal. You could consider adjusting your contribution.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Summary Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-blue-50 border-blue-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-blue-800 text-base flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Total Investment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-700">
                      {formatCurrency(totalInvestment)}
                    </div>
                    <div className="mt-1 flex items-center text-sm text-blue-600">
                      <span className="inline-block h-2 w-2 rounded-full bg-blue-600 mr-1"></span>
                      <span>{investmentPeriod + (extendPeriod ? extensionYears : 0)} years total</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50 border-green-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-800 text-base flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Interest Earned
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-700">
                      {formatCurrency(totalInterest)}
                    </div>
                    <div className="mt-1 flex items-center text-sm text-green-600">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-600 mr-1"></span>
                      <span>{interestRate}% compounded annually</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50 border-blue-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-blue-800 text-base flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Maturity Amount
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-700">
                      {formatCurrency(maturityAmount)}
                    </div>
                    <div className="mt-1 flex items-center text-sm text-blue-600">
                      <span className="inline-block h-2 w-2 rounded-full bg-blue-600 mr-1"></span>
                      <span>By {startYear + investmentPeriod + (extendPeriod ? extensionYears : 0) - 1}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-amber-50 border-amber-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-amber-800 text-base flex items-center">
                      <Receipt className="w-5 h-5 mr-2" />
                      Tax Savings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-amber-700">
                      {formatCurrency(taxSavings)}
                    </div>
                    <div className="mt-1 flex items-center text-sm text-amber-600">
                      <span className="inline-block h-2 w-2 rounded-full bg-amber-600 mr-1"></span>
                      <span>Section 80C benefit (30% bracket)</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Advanced Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-blue-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 border-b bg-blue-50">
                    <CardTitle className="text-blue-800 text-base flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      CAGR
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="text-xl font-bold text-blue-700">
                      {cagr.toFixed(2)}%
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Compound Annual Growth Rate measures the mean annual growth rate over the investment period
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 border-b bg-blue-50">
                    <CardTitle className="text-blue-800 text-base flex items-center">
                      <ArrowRight className="w-5 h-5 mr-2" />
                      Absolute Return
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="text-xl font-bold text-blue-700">
                      {absoluteReturn.toFixed(2)}%
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Total percentage return on your investment over the entire period
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 border-b bg-blue-50">
                    <CardTitle className="text-blue-800 text-base flex items-center">
                      <Wallet className="w-5 h-5 mr-2" />
                      Real Purchasing Power
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="text-xl font-bold text-blue-700">
                      {formatCurrency(realPurchasingPower)}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Value adjusted for inflation of {inflationRate}% per annum
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Visualization Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                  <Label htmlFor="chart-type" className="whitespace-nowrap">Chart Type:</Label>
                  <Select value={chartType} onValueChange={(value) => setChartType(value as any)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select chart" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="area">Area Chart</SelectItem>
                        <SelectItem value="line">Line Chart</SelectItem>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                        <SelectItem value="radar">Radar Chart</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-x-2">
                  <label className="inline-flex items-center">
                    <Checkbox 
                      checked={withInflationAdjustment}
                      onCheckedChange={(checked) => setWithInflationAdjustment(checked === true)}
                      className="mr-2"
                    />
                    <span className="text-sm">Show Inflation-Adjusted Values</span>
                  </label>
                  <label className="inline-flex items-center ml-4">
                    <Checkbox 
                      checked={showMilestones}
                      onCheckedChange={(checked) => setShowMilestones(checked === true)}
                      className="mr-2"
                    />
                    <span className="text-sm">Show Milestones</span>
                  </label>
                </div>
              </div>
              
              {/* Investment Growth Chart */}
              <Card>
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center">
                    <BarChart4 className="w-5 h-5 mr-2" />
                    Investment Growth Over Time
                  </CardTitle>
                  <CardDescription>
                    Year-by-year growth of your PPF investment
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={yearlyData}
                        margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
                      >
                        <defs>
                          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="colorDeposit" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="yearLabel" />
                        <YAxis
                          tickFormatter={(value) => 
                            new Intl.NumberFormat('en-IN', {
                              style: 'currency',
                              currency: 'INR',
                              notation: 'compact',
                              maximumFractionDigits: 1
                            }).format(value)
                          }
                        />
                        <RTooltip 
                          formatter={(value) => formatCurrency(Number(value))}
                          labelFormatter={(label) => {
                            const year = yearlyData.find(y => y.yearLabel === label);
                            return `Financial Year: ${label}${year?.milestones?.length ? '\nMilestones: ' + year.milestones.join(', ') : ''}`;
                          }}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          name="Total Balance" 
                          dataKey="balance" 
                          stroke="#8884d8" 
                          fillOpacity={1}
                          fill="url(#colorBalance)"
                          strokeWidth={2}
                        />
                        <Area 
                          type="monotone" 
                          name="Total Deposits" 
                          dataKey="cumulativeDeposit" 
                          stroke="#3b82f6" 
                          fillOpacity={1}
                          fill="url(#colorDeposit)"
                          strokeWidth={2}
                        />
                        <Area 
                          type="monotone" 
                          name="Total Interest" 
                          dataKey="cumulativeInterest" 
                          stroke="#10b981" 
                          fillOpacity={1}
                          fill="url(#colorInterest)"
                          strokeWidth={2}
                        />
                        {withInflationAdjustment && (
                          <Area 
                            type="monotone" 
                            name="Real Purchasing Power" 
                            dataKey="inflationAdjustedValue" 
                            stroke="#f59e0b" 
                            fillOpacity={0}
                            strokeWidth={2}
                            strokeDasharray="5 5"
                          />
                        )}
                        {financialGoal && financialGoal !== 'custom' && (
                          <ReferenceLine 
                            y={financialGoals[financialGoal].targetAmount} 
                            stroke="#ef4444" 
                            strokeDasharray="3 3" 
                            label={{ 
                              value: `${financialGoals[financialGoal].name} Target: ${formatCurrency(financialGoals[financialGoal].targetAmount)}`, 
                              position: 'top',
                              fill: '#ef4444',
                              fontSize: 12
                            }} 
                          />
                        )}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Investment Comparison */}
              <Card>
                <CardHeader className="border-b flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <BarChart4 className="w-5 h-5 mr-2" />
                      Investment Comparison
                    </CardTitle>
                    <CardDescription>
                      Compare PPF with other popular investment options
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant={comparisonView === 'chart' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setComparisonView('chart')}
                      className="text-xs h-8"
                    >
                      Chart View
                    </Button>
                    <Button 
                      variant={comparisonView === 'table' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setComparisonView('table')}
                      className="text-xs h-8"
                    >
                      Table View
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {comparisonView === 'chart' && (
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={comparisonData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis
                            tickFormatter={(value) => 
                              new Intl.NumberFormat('en-IN', {
                                style: 'currency',
                                currency: 'INR',
                                notation: 'compact',
                                maximumFractionDigits: 1
                              }).format(value)
                            }
                          />
                          <RTooltip formatter={(value) => formatCurrency(Number(value))} />
                          <Legend />
                          <Bar dataKey="ppf" name="PPF (7.1%)" fill="#8884d8" />
                          <Bar dataKey="fd" name="Fixed Deposit (6.0%)" fill="#3b82f6" />
                          <Bar dataKey="mutualFund" name="Mutual Fund (11.0%)" fill="#10b981" />
                          <Bar dataKey="stockMarket" name="Stock Market (13.0%)" fill="#f59e0b" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                  
                  {comparisonView === 'table' && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-700">
                          <tr>
                            <th className="px-4 py-3 text-left">Investment Period</th>
                            <th className="px-4 py-3 text-right">PPF (7.1%)</th>
                            <th className="px-4 py-3 text-right">Fixed Deposit (6.0%)</th>
                            <th className="px-4 py-3 text-right">Mutual Fund (11.0%)</th>
                            <th className="px-4 py-3 text-right">Stock Market (13.0%)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {comparisonData.map((data, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-left font-medium">{data.name}</td>
                              <td className="px-4 py-3 text-right">{formatCurrency(data.ppf)}</td>
                              <td className="px-4 py-3 text-right">{formatCurrency(data.fd)}</td>
                              <td className="px-4 py-3 text-right">{formatCurrency(data.mutualFund)}</td>
                              <td className="px-4 py-3 text-right">{formatCurrency(data.stockMarket)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="p-4 text-xs text-gray-500">
                        <p>Note: This is a simplified comparison for illustrative purposes. Actual returns may vary.</p>
                        <p>PPF offers sovereign guarantee and tax benefits under Section 80C that are not available with all instruments.</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Investment Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Breakdown Chart */}
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center">
                      <PieChart className="w-5 h-5 mr-2" />
                      Investment Breakdown
                    </CardTitle>
                    <CardDescription>
                      Distribution of your investment components
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="h-64 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChartComponent>
                          <Pie
                            data={advancedMode ? breakdownData : pieChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }: { name: string, percent: number }) => 
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {(advancedMode ? breakdownData : pieChartData).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChartComponent>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Investment</p>
                        <p className="text-lg font-semibold">{((totalInvestment / maturityAmount) * 100).toFixed(1)}%</p>
                        <p className="text-sm font-medium text-blue-600">{formatCurrency(totalInvestment)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Interest</p>
                        <p className="text-lg font-semibold">{((totalInterest / maturityAmount) * 100).toFixed(1)}%</p>
                        <p className="text-sm font-medium text-green-600">{formatCurrency(totalInterest)}</p>
                      </div>
                      {advancedMode && (
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Tax Savings</p>
                          <p className="text-lg font-semibold">{((taxSavings / maturityAmount) * 100).toFixed(1)}%</p>
                          <p className="text-sm font-medium text-amber-600">{formatCurrency(taxSavings)}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Milestones */}
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center">
                      <Gift className="w-5 h-5 mr-2" />
                      PPF Investment Journey
                    </CardTitle>
                    <CardDescription>
                      Key milestones during your investment period
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4 max-h-64 overflow-y-auto px-1">
                      <div className="relative pl-10 pb-10 border-l-2 border-blue-200">
                        <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-600"></div>
                        <h3 className="font-medium">PPF Account Opening</h3>
                        <p className="text-sm text-gray-600">
                          Year 1 ({startYear}): Initial investment of {formatCurrency(annualInvestment)}
                        </p>
                      </div>
                      
                      <div className="relative pl-10 pb-10 border-l-2 border-blue-200">
                        <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-indigo-600"></div>
                        <h3 className="font-medium">Loan Eligibility Starts</h3>
                        <p className="text-sm text-gray-600">
                          Year 3 ({startYear + 2}): You can take a loan against your PPF account between years 3-6
                        </p>
                      </div>
                      
                      <div className="relative pl-10 pb-10 border-l-2 border-blue-200">
                        <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-purple-600"></div>
                        <h3 className="font-medium">Partial Withdrawal Eligibility</h3>
                        <p className="text-sm text-gray-600">
                          Year 7 ({startYear + 6}): You can make partial withdrawals for specific needs
                        </p>
                      </div>
                      
                      {includeWithdrawals && enablePartialWithdrawals && (
                        <div className="relative pl-10 pb-10 border-l-2 border-blue-200">
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-red-600"></div>
                          <h3 className="font-medium">Scheduled Withdrawal</h3>
                          <p className="text-sm text-gray-600">
                            Year {withdrawalYear} ({startYear + withdrawalYear - 1}): {withdrawalPercentage}% withdrawal from account balance
                          </p>
                        </div>
                      )}
                      
                      <div className="relative pl-10 pb-10 border-l-2 border-blue-200">
                        <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-600"></div>
                        <h3 className="font-medium">Lock-in Period Complete</h3>
                        <p className="text-sm text-gray-600">
                          Year 15 ({startYear + 14}): Initial lock-in period ends, you can withdraw the full amount or extend
                        </p>
                      </div>
                      
                      {extendPeriod && (
                        <div className="relative pl-10 pb-10 border-l-2 border-blue-200">
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-amber-600"></div>
                          <h3 className="font-medium">Extension Period Complete</h3>
                          <p className="text-sm text-gray-600">
                            Year {15 + extensionYears} ({startYear + 14 + extensionYears}): Extended investment period ends
                          </p>
                        </div>
                      )}
                      
                      {financialGoal && yearlyData.some(data => 
                        financialGoal === 'custom' 
                          ? data.balance >= customGoalAmount
                          : data.balance >= financialGoals[financialGoal].targetAmount
                      ) && (
                        <div className="relative pl-10 pb-10 border-l-2 border-blue-200">
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-600"></div>
                          <h3 className="font-medium">Financial Goal Achieved</h3>
                          <p className="text-sm text-gray-600">
                            {(() => {
                              const targetAmount = financialGoal === 'custom' 
                                ? customGoalAmount 
                                : financialGoals[financialGoal].targetAmount;
                              const achievementYear = yearlyData.findIndex(data => data.balance >= targetAmount) + 1;
                              return `Year ${achievementYear} (${startYear + achievementYear - 1}): ${financialGoal === 'custom' ? 'Custom goal' : financialGoals[financialGoal].name} target of ${formatCurrency(targetAmount)} reached`;
                            })()}
                          </p>
                        </div>
                      )}
                      
                      <div className="relative pl-10">
                        <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-800"></div>
                        <h3 className="font-medium">Final Maturity</h3>
                        <p className="text-sm text-gray-600">
                          Year {investmentPeriod + (extendPeriod ? extensionYears : 0)} ({startYear + investmentPeriod + (extendPeriod ? extensionYears : 0) - 1}): Final maturity value of {formatCurrency(maturityAmount)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Annual Breakdown Table */}
              <Card>
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center">
                    <Table className="w-5 h-5 mr-2" />
                    Annual Breakdown
                  </CardTitle>
                  <CardDescription>
                    Year-by-year breakdown of your PPF investment
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left">Year</th>
                          <th className="px-4 py-3 text-right">Financial Year</th>
                          <th className="px-4 py-3 text-right">Investment</th>
                          <th className="px-4 py-3 text-right">Interest Earned</th>
                          <th className="px-4 py-3 text-right">Year-End Balance</th>
                          {withInflationAdjustment && (
                            <th className="px-4 py-3 text-right">Real Value</th>
                          )}
                          <th className="px-4 py-3 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {yearlyData.map((year) => (
                          <tr key={year.year} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-left">{year.year}</td>
                            <td className="px-4 py-3 text-right">{year.yearLabel}</td>
                            <td className="px-4 py-3 text-right">{formatCurrency(year.deposit)}</td>
                            <td className="px-4 py-3 text-right">{formatCurrency(year.interest)}</td>
                            <td className="px-4 py-3 text-right font-medium">{formatCurrency(year.balance)}</td>
                            {withInflationAdjustment && (
                              <td className="px-4 py-3 text-right text-amber-600">{formatCurrency(year.inflationAdjustedValue || 0)}</td>
                            )}
                            <td className="px-4 py-3 text-left">
                              <div className="flex flex-wrap gap-1">
                                {year.loanEligible && !year.withdrawalAllowed && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                    Loan Eligible
                                  </span>
                                )}
                                {year.withdrawalAllowed && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                    Withdrawals Allowed
                                  </span>
                                )}
                                {year.year === 15 && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                    Lock-in Complete
                                  </span>
                                )}
                                {year.milestones && year.milestones.length > 0 && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                                    {year.milestones[0]} {year.milestones.length > 1 ? `+${year.milestones.length - 1} more` : ''}
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50 text-gray-900 font-medium">
                        <tr>
                          <td className="px-4 py-3 text-left" colSpan={2}>Total</td>
                          <td className="px-4 py-3 text-right">{formatCurrency(totalInvestment)}</td>
                          <td className="px-4 py-3 text-right">{formatCurrency(totalInterest)}</td>
                          <td className="px-4 py-3 text-right">{formatCurrency(maturityAmount)}</td>
                          {withInflationAdjustment && (
                            <td className="px-4 py-3 text-right text-amber-600">{formatCurrency(realPurchasingPower)}</td>
                          )}
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("calculator")} 
                    className="flex-1 sm:flex-none"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                    Edit Values
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={resetCalculator}
                    className="flex-1 sm:flex-none"
                  >
                    Reset Calculator
                  </Button>
                </div>
                <div className="flex gap-4">
                  <Button 
                    className="bg-indigo-600 hover:bg-indigo-700 flex-1 sm:flex-none"
                    onClick={() => setGoalDialogOpen(true)}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Set as Goal
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
                    onClick={() => setSaveDialogOpen(true)}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Calculation
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none"
                    onClick={() => {
                      toast({
                        title: "Report generation initiated",
                        description: "Your PPF calculation details are being compiled into a PDF report",
                      });
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </div>
              
              {/* PPF Tax Benefits */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-800 flex items-center">
                    <Receipt className="w-5 h-5 mr-2" />
                    PPF Tax Benefits and Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-700">
                    <div className="space-y-3">
                      <h3 className="font-medium text-blue-900">Tax Advantages</h3>
                      <p className="flex items-start">
                        <ArrowRight className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                        <span>Investments up to ₹1,50,000 per year qualify for tax deduction under Section 80C of the Income Tax Act.</span>
                      </p>
                      <p className="flex items-start">
                        <ArrowRight className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                        <span>Interest earned on PPF is completely tax-free under Section 10(11) of the Income Tax Act.</span>
                      </p>
                      <p className="flex items-start">
                        <ArrowRight className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                        <span>Maturity amount withdrawn after completion of the lock-in period is also tax-free.</span>
                      </p>
                      <p className="flex items-start">
                        <ArrowRight className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                        <span>PPF falls under the Exempt-Exempt-Exempt (EEE) category, where contributions, interest, and withdrawals are all tax-free.</span>
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-medium text-blue-900">Strategic Benefits</h3>
                      <p className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-green-600" />
                        <span>Government-backed security with zero risk and decent returns.</span>
                      </p>
                      <p className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-green-600" />
                        <span>Loan facility from 3rd to 6th year up to 25% of balance from 2 years prior.</span>
                      </p>
                      <p className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-green-600" />
                        <span>Partial withdrawals allowed from 7th year onwards for specific needs.</span>
                      </p>
                      <p className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-green-600" />
                        <span>Protection from creditors - PPF account has immunity from attachment under court orders.</span>
                      </p>
                      <p className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-green-600" />
                        <span>Extension option after 15 years in blocks of 5 years with continued tax benefits.</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Calculator Save Dialog */}
      <Dialog open={isSaveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save PPF Calculation</DialogTitle>
            <DialogDescription>
              Give your calculation a name to save it for future reference
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="calculator-name">Calculation Name</Label>
            <Input
              id="calculator-name"
              value={calculatorName}
              onChange={(e) => setCalculatorName(e.target.value)}
              placeholder="e.g., My PPF Investment Plan"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCalculator}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Set as Goal Dialog */}
      <Dialog open={goalDialogOpen} onOpenChange={setGoalDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-600" />
              Set as Financial Goal
            </DialogTitle>
            <DialogDescription>
              Add this PPF investment as a tracked financial goal
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label htmlFor="goal-name">Goal Name</Label>
              <Input
                id="goal-name"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="e.g., My PPF Retirement Fund"
                className="mt-2"
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md text-sm">
              <div className="font-medium text-blue-800 mb-2">Goal Summary</div>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-start">
                  <span className="inline-block w-24 font-medium">Target:</span>
                  <span>{formatCurrency(maturityAmount)}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-24 font-medium">Timeline:</span>
                  <span>{investmentPeriod + (extendPeriod ? extensionYears : 0)} years (by {startYear + investmentPeriod + (extendPeriod ? extensionYears : 0) - 1})</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-24 font-medium">Investment:</span>
                  <span>{formatCurrency(annualInvestment)}/year {investmentStrategy !== 'fixed' ? '(starting amount)' : ''}</span>
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGoalDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSetAsGoal} className="bg-blue-600 hover:bg-blue-700">
              Add to Goals
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* PPF-specific Financial Disclaimer */}
      <div className="mt-6 mb-4">
        <FinancialDisclaimer 
          variant="default"
          calculatorType="ppf"
          size="md"
        />
      </div>
    </CalculatorLayout>
  );
};

export default PPFCalculator;