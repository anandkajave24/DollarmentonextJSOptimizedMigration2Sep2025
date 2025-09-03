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
import { format, addYears, addMonths } from "date-fns";
import { useBudget } from "../contexts/BudgetContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import {
  Info, TrendingUp, Clock, Target, Calendar,
  TrendingDown, DollarSign, LineChart as LineChartIcon, ArrowUp, ArrowDown,
  Table, IndianRupee, Receipt, PieChart, Calculator as CalculatorIcon,
  HelpCircle, ArrowRight, Download, Save, AlertCircle, CheckCircle2,
  Wallet, Sparkles, Briefcase, Gift, LifeBuoy, Settings, BookOpen
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
  DialogFooter,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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

// Withdrawal frequency options
type WithdrawalFrequency = 'monthly' | 'quarterly' | 'semi-annually' | 'annually';

// Withdrawal strategy options
type WithdrawalStrategy = 'fixed' | 'inflation-adjusted' | 'percentage-based' | 'variable';

// Withdraw approach (capital preservation vs capital depletion)
type WithdrawApproach = 'preserve-capital' | 'deplete-capital';

// Investment allocation model
type InvestmentModel = 'conservative' | 'balanced' | 'growth' | 'custom';

// Income profile templates for different life stages
interface IncomeProfileTemplate {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  withdrawalRate: number;
  withdrawalFrequency: WithdrawalFrequency;
  investmentReturns: number;
  inflationRate: number;
  strategy: WithdrawalStrategy;
  approach: WithdrawApproach;
  investmentModel: InvestmentModel;
  equityAllocation?: number;
  debtAllocation?: number;
  goldAllocation?: number;
  cashAllocation?: number;
}

// Risk level based on equity allocation
const getRiskLevel = (equityPercentage: number): string => {
  if (equityPercentage < 20) return "Very Low";
  if (equityPercentage < 40) return "Low";
  if (equityPercentage < 60) return "Moderate";
  if (equityPercentage < 80) return "High";
  return "Very High";
};

// Income timeline data interface
interface IncomeTimelineData {
  month: number;
  date: string;
  withdrawal: number;
  cumulativeWithdrawal: number;
  remainingCorpus: number;
  inflation: number;
  realValue: number;
}

const SWPCalculator: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("calculator");
  const [initialCorpus, setInitialCorpus] = useState(5000000); // Default: ₹50 lakhs
  const [withdrawalAmount, setWithdrawalAmount] = useState(25000); // Default: ₹25,000
  const [withdrawalFrequency, setWithdrawalFrequency] = useState<WithdrawalFrequency>("monthly");
  const [withdrawalPeriod, setWithdrawalPeriod] = useState(20); // Default: 20 years
  const [expectedReturns, setExpectedReturns] = useState(8); // Default: 8%
  const [inflationRate, setInflationRate] = useState(5); // Default: 5%
  const [withdrawalStrategy, setWithdrawalStrategy] = useState<WithdrawalStrategy>("fixed");
  const [withdrawalPercentage, setWithdrawalPercentage] = useState(4); // Default: 4% for percentage-based
  const [withdrawApproach, setWithdrawApproach] = useState<WithdrawApproach>("preserve-capital");
  const [investmentModel, setInvestmentModel] = useState<InvestmentModel>("balanced");
  const [equityAllocation, setEquityAllocation] = useState(50); // Default: 50%
  const [debtAllocation, setDebtAllocation] = useState(30); // Default: 30%
  const [goldAllocation, setGoldAllocation] = useState(10); // Default: 10%
  const [cashAllocation, setCashAllocation] = useState(10); // Default: 10%
  const [advancedMode, setAdvancedMode] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [incomeTimeline, setIncomeTimeline] = useState<IncomeTimelineData[]>([]);
  const [showMilestones, setShowMilestones] = useState(true);
  const [withInflationAdjustment, setWithInflationAdjustment] = useState(true);
  const [chartType, setChartType] = useState<'area' | 'line' | 'bar' | 'radar'>('area');
  const [calculationComplete, setCalculationComplete] = useState(false);
  const [isSaveDialogOpen, setSaveDialogOpen] = useState(false);
  const [calculatorName, setCalculatorName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showNotes, setShowNotes] = useState(true);
  const [showVariableInputs, setShowVariableInputs] = useState(false);
  const [variableRates, setVariableRates] = useState<{year: number, rate: number}[]>([
    {year: 1, rate: 8},
    {year: 5, rate: 7.5},
    {year: 10, rate: 7},
    {year: 15, rate: 6.5}
  ]);
  
  // Summary metrics
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [finalCorpus, setFinalCorpus] = useState(0);
  const [sustainabilityScore, setSustainabilityScore] = useState(0);
  const [longevityYears, setLongevityYears] = useState(0);
  const [inflationImpact, setInflationImpact] = useState(0);
  const [realWithdrawalPower, setRealWithdrawalPower] = useState(0);
  
  // Income profile templates with predefined scenarios
  const incomeProfileTemplates: IncomeProfileTemplate[] = [
    {
      id: "early-retirement",
      name: "Early Retirement",
      icon: <LifeBuoy size={20} />,
      description: "For those who've retired earlier and need a long-term sustainable income strategy.",
      withdrawalRate: 3.5,
      withdrawalFrequency: "monthly",
      investmentReturns: 7,
      inflationRate: 5,
      strategy: "inflation-adjusted",
      approach: "preserve-capital",
      investmentModel: "balanced",
      equityAllocation: 55,
      debtAllocation: 35,
      goldAllocation: 5,
      cashAllocation: 5
    },
    {
      id: "standard-retirement",
      name: "Standard Retirement",
      icon: <Briefcase size={20} />,
      description: "Balanced approach for conventional retirement needs with inflation protection.",
      withdrawalRate: 4,
      withdrawalFrequency: "monthly",
      investmentReturns: 8,
      inflationRate: 5,
      strategy: "inflation-adjusted",
      approach: "preserve-capital",
      investmentModel: "balanced",
      equityAllocation: 40,
      debtAllocation: 40,
      goldAllocation: 10,
      cashAllocation: 10
    },
    {
      id: "senior-retirement",
      name: "Senior Retirement",
      icon: <Clock size={20} />,
      description: "More conservative approach with higher income stability for seniors.",
      withdrawalRate: 5,
      withdrawalFrequency: "monthly",
      investmentReturns: 6.5,
      inflationRate: 5,
      strategy: "fixed",
      approach: "deplete-capital",
      investmentModel: "conservative",
      equityAllocation: 25,
      debtAllocation: 55,
      goldAllocation: 10,
      cashAllocation: 10
    },
    {
      id: "passive-income",
      name: "Passive Income",
      icon: <TrendingUp size={20} />,
      description: "For creating a secondary income stream while preserving your capital.",
      withdrawalRate: 3,
      withdrawalFrequency: "monthly",
      investmentReturns: 9,
      inflationRate: 5,
      strategy: "percentage-based",
      approach: "preserve-capital",
      investmentModel: "growth",
      equityAllocation: 65,
      debtAllocation: 25,
      goldAllocation: 5,
      cashAllocation: 5
    },
    {
      id: "education-funding",
      name: "Education Funding",
      icon: <BookOpen size={20} />,
      description: "Higher initial withdrawals reducing over time for education expenses.",
      withdrawalRate: 6,
      withdrawalFrequency: "quarterly",
      investmentReturns: 7.5,
      inflationRate: 6,
      strategy: "variable",
      approach: "deplete-capital",
      investmentModel: "balanced",
      equityAllocation: 40,
      debtAllocation: 40,
      goldAllocation: 10,
      cashAllocation: 10
    }
  ];

  // Apply income profile template
  const applyIncomeTemplate = (template: IncomeProfileTemplate) => {
    setSelectedTemplate(template.id);
    
    if (template.strategy === "percentage-based") {
      // For percentage-based, we set the withdrawal percentage
      setWithdrawalPercentage(template.withdrawalRate);
      // Calculate the withdrawal amount based on the initial corpus
      const calculatedAmount = (initialCorpus * template.withdrawalRate) / 100;
      setWithdrawalAmount(Math.round(calculatedAmount / 12));
    } else {
      // For other strategies, set the withdrawal amount directly
      const annualAmount = initialCorpus * (template.withdrawalRate / 100);
      
      switch (template.withdrawalFrequency) {
        case "monthly":
          setWithdrawalAmount(Math.round(annualAmount / 12));
          break;
        case "quarterly":
          setWithdrawalAmount(Math.round(annualAmount / 4));
          break;
        case "semi-annually":
          setWithdrawalAmount(Math.round(annualAmount / 2));
          break;
        case "annually":
          setWithdrawalAmount(Math.round(annualAmount));
          break;
      }
    }
    
    setWithdrawalFrequency(template.withdrawalFrequency);
    setExpectedReturns(template.investmentReturns);
    setInflationRate(template.inflationRate);
    setWithdrawalStrategy(template.strategy);
    setWithdrawApproach(template.approach);
    setInvestmentModel(template.investmentModel);
    
    if (template.equityAllocation !== undefined) {
      setEquityAllocation(template.equityAllocation);
    }
    if (template.debtAllocation !== undefined) {
      setDebtAllocation(template.debtAllocation);
    }
    if (template.goldAllocation !== undefined) {
      setGoldAllocation(template.goldAllocation);
    }
    if (template.cashAllocation !== undefined) {
      setCashAllocation(template.cashAllocation);
    }
    
    // Set advanced mode for variable strategy
    if (template.strategy === 'variable') {
      setAdvancedMode(true);
      setShowVariableInputs(true);
    } else {
      if (showVariableInputs) {
        setShowVariableInputs(false);
      }
    }
    
    // Recalculate if results were already showing
    if (showResults) {
      calculateSWP();
    }
    
    toast({
      title: `${template.name} profile applied`,
      description: "Calculator updated with this income profile settings."
    });
  };

  // Calculate effective frequency multiplier
  const getFrequencyMultiplier = (frequency: WithdrawalFrequency): number => {
    switch (frequency) {
      case "monthly": return 12;
      case "quarterly": return 4;
      case "semi-annually": return 2;
      case "annually": return 1;
      default: return 12;
    }
  };

  // Get return rate for a specific year (used for variable returns)
  const getReturnRateForYear = (year: number): number => {
    if (!advancedMode || withdrawalStrategy !== 'variable') {
      return expectedReturns;
    }
    
    // Sort by year ascending
    const sortedRates = [...variableRates].sort((a, b) => a.year - b.year);
    
    // Find the applicable rate
    for (let i = sortedRates.length - 1; i >= 0; i--) {
      if (year >= sortedRates[i].year) {
        return sortedRates[i].rate;
      }
    }
    
    return expectedReturns; // Default if no specific rate found
  };

  // Calculate SWP
  const calculateSWP = useCallback(() => {
    try {
      // Reset metrics
      setCalculationComplete(false);
      
      // Validate inputs
      if (initialCorpus <= 0 || withdrawalAmount <= 0 || withdrawalPeriod <= 0) {
        toast({
          title: "Invalid Input",
          description: "All values must be greater than zero.",
          variant: "destructive"
        });
        return;
      }
      
      // For percentage-based withdrawal, calculate initial withdrawal
      let currentWithdrawal = withdrawalAmount;
      if (withdrawalStrategy === "percentage-based") {
        const annualWithdrawal = initialCorpus * (withdrawalPercentage / 100);
        
        switch (withdrawalFrequency) {
          case "monthly":
            currentWithdrawal = annualWithdrawal / 12;
            break;
          case "quarterly":
            currentWithdrawal = annualWithdrawal / 4;
            break;
          case "semi-annually":
            currentWithdrawal = annualWithdrawal / 2;
            break;
          case "annually":
            currentWithdrawal = annualWithdrawal;
            break;
        }
      }
      
      const frequencyMultiplier = getFrequencyMultiplier(withdrawalFrequency);
      const totalMonths = withdrawalPeriod * 12;
      const withdrawalMonths = Array.from(
        { length: Math.ceil(totalMonths / (12 / frequencyMultiplier)) },
        (_, i) => (i + 1) * (12 / frequencyMultiplier)
      );
      
      let remainingCorpus = initialCorpus;
      let timeline: IncomeTimelineData[] = [];
      let totalWithdrawn = 0;
      let corpusDepletedAtMonth = -1;
      
      // Calculate monthly compounding
      for (let month = 1; month <= totalMonths; month++) {
        const currentYear = Math.ceil(month / 12);
        const currentReturnRate = getReturnRateForYear(currentYear);
        const monthlyReturn = currentReturnRate / 12 / 100;
        
        // Apply monthly return on the corpus
        remainingCorpus = remainingCorpus * (1 + monthlyReturn);
        
        let isWithdrawalMonth = false;
        let withdrawal = 0;
        
        // Check if this is a withdrawal month
        if (withdrawalFrequency === "monthly" || 
            (withdrawalFrequency === "quarterly" && month % 3 === 0) || 
            (withdrawalFrequency === "semi-annually" && month % 6 === 0) || 
            (withdrawalFrequency === "annually" && month % 12 === 0)) {
          isWithdrawalMonth = true;
          
          // Calculate inflation-adjusted withdrawal if applicable
          if (withdrawalStrategy === "inflation-adjusted") {
            const monthsElapsed = month - 1;
            const yearsElapsed = monthsElapsed / 12;
            withdrawal = currentWithdrawal * Math.pow(1 + inflationRate / 100, yearsElapsed);
          } 
          // Calculate percentage-based withdrawal if applicable
          else if (withdrawalStrategy === "percentage-based") {
            withdrawal = remainingCorpus * (withdrawalPercentage / 100) / frequencyMultiplier;
          } 
          // For variable strategy, allow custom rate adjustments
          else if (withdrawalStrategy === "variable") {
            // The variable rates are handled by getReturnRateForYear function
            withdrawal = currentWithdrawal;
          }
          // For fixed withdrawal
          else {
            withdrawal = currentWithdrawal;
          }
          
          // Apply withdrawal
          if (remainingCorpus >= withdrawal) {
            remainingCorpus -= withdrawal;
            totalWithdrawn += withdrawal;
          } else {
            // Corpus depleted
            if (corpusDepletedAtMonth === -1) {
              corpusDepletedAtMonth = month;
            }
            withdrawal = remainingCorpus;
            totalWithdrawn += withdrawal;
            remainingCorpus = 0;
          }
        }
        
        // Create timeline entry
        if (isWithdrawalMonth || month === 1 || month % 12 === 0 || month === totalMonths) {
          const date = format(addMonths(new Date(), month - 1), "MMM yyyy");
          const yearsElapsed = (month - 1) / 12;
          const inflationFactor = Math.pow(1 + inflationRate / 100, yearsElapsed);
          const realValue = withdrawal / inflationFactor;
          
          timeline.push({
            month,
            date,
            withdrawal,
            cumulativeWithdrawal: totalWithdrawn,
            remainingCorpus,
            inflation: inflationFactor,
            realValue
          });
        }
        
        // Stop if corpus is depleted
        if (remainingCorpus <= 0) {
          break;
        }
      }
      
      // Calculate sustainability metrics
      const finalIndex = timeline.length - 1;
      const finalMonth = timeline[finalIndex]?.month || 0;
      const longevityYears = finalMonth / 12;
      
      // Calculate real withdrawal power (end vs start)
      const startWithdrawal = timeline[0]?.withdrawal || 0;
      const endWithdrawal = timeline[finalIndex]?.withdrawal || 0;
      const endRealValue = timeline[finalIndex]?.realValue || 0;
      const inflationImpact = (startWithdrawal - endRealValue) / startWithdrawal * 100;
      
      // Calculate sustainability score (0-100)
      let sustainabilityScore = 100;
      
      if (withdrawApproach === "preserve-capital") {
        // For capital preservation, score based on final corpus vs initial
        const finalCorpusRatio = timeline[finalIndex]?.remainingCorpus / initialCorpus;
        sustainabilityScore = Math.min(100, Math.max(0, finalCorpusRatio * 100));
      } else {
        // For capital depletion, score based on how long the corpus lasted
        sustainabilityScore = Math.min(100, Math.max(0, (longevityYears / withdrawalPeriod) * 100));
      }
      
      // Update state with results
      setIncomeTimeline(timeline);
      setTotalWithdrawals(totalWithdrawn);
      setFinalCorpus(timeline[finalIndex]?.remainingCorpus || 0);
      setSustainabilityScore(Math.round(sustainabilityScore));
      setLongevityYears(longevityYears);
      setInflationImpact(inflationImpact);
      setRealWithdrawalPower(endRealValue);
      setCalculationComplete(true);
      setShowResults(true);
      setActiveTab("results");
      
    } catch (error) {
      console.error("SWP calculation error:", error);
      toast({
        title: "Calculation Error",
        description: "There was a problem calculating your SWP. Please check your inputs and try again.",
        variant: "destructive"
      });
    }
  }, [
    initialCorpus, 
    withdrawalAmount, 
    withdrawalPeriod, 
    expectedReturns, 
    inflationRate,
    withdrawalStrategy,
    withdrawalFrequency,
    withdrawalPercentage,
    withdrawApproach,
    investmentModel,
    equityAllocation,
    debtAllocation,
    goldAllocation,
    cashAllocation,
    advancedMode,
    variableRates,
    toast
  ]);
  
  // Handle variable return rate updates
  const updateVariableRate = (index: number, field: 'year' | 'rate', value: number) => {
    const newRates = [...variableRates];
    newRates[index][field] = value;
    setVariableRates(newRates);
  };
  
  // Add new variable rate
  const addVariableRate = () => {
    const lastYear = variableRates[variableRates.length - 1]?.year || 0;
    setVariableRates([...variableRates, { year: lastYear + 5, rate: expectedReturns }]);
  };
  
  // Remove variable rate
  const removeVariableRate = (index: number) => {
    if (variableRates.length > 1) {
      const newRates = [...variableRates];
      newRates.splice(index, 1);
      setVariableRates(newRates);
    }
  };
  
  // Generate educational insights
  const educationalInsights = useMemo(() => {
    if (!calculationComplete) return [];
    
    const insights: string[] = [];
    
    // Withdrawal sustainability insight
    if (withdrawApproach === "preserve-capital") {
      if (sustainabilityScore >= 90) {
        insights.push("This withdrawal strategy appears highly sustainable, potentially preserving your initial capital while generating income.");
      } else if (sustainabilityScore >= 70) {
        insights.push("This plan could maintain most of your initial capital while providing regular income, though inflation might affect purchasing power over time.");
      } else if (sustainabilityScore >= 50) {
        insights.push("While this approach might provide income for the desired period, it could gradually reduce your initial capital over time.");
      } else {
        insights.push("This withdrawal rate might be higher than what's typically considered sustainable for capital preservation over this timeframe.");
      }
    } else {
      if (longevityYears >= withdrawalPeriod) {
        insights.push(`This strategy might provide income for the entire ${withdrawalPeriod} year period while gradually depleting capital as intended.`);
      } else {
        insights.push(`With these parameters, funds might be depleted after approximately ${longevityYears.toFixed(1)} years, which is less than your target of ${withdrawalPeriod} years.`);
      }
    }
    
    // Inflation impact insight
    if (inflationImpact > 40) {
      insights.push(`Inflation could significantly reduce your purchasing power by approximately ${inflationImpact.toFixed(0)}% over this time period.`);
    } else if (inflationImpact > 20) {
      insights.push(`Inflation might moderately affect your purchasing power, reducing it by approximately ${inflationImpact.toFixed(0)}% over time.`);
    } else {
      insights.push(`Your withdrawal strategy appears to maintain reasonable purchasing power against the projected inflation rate.`);
    }
    
    // Asset allocation insight
    const riskLevel = getRiskLevel(equityAllocation);
    insights.push(`Your ${riskLevel.toLowerCase()} risk asset allocation (${equityAllocation}% equity) could be an important factor in this income strategy's long-term performance.`);
    
    // Withdrawal strategy insight
    switch (withdrawalStrategy) {
      case "fixed":
        insights.push("A fixed withdrawal strategy might provide predictable income but could potentially lose purchasing power due to inflation over time.");
        break;
      case "inflation-adjusted":
        insights.push("Adjusting withdrawals for inflation might help maintain purchasing power, though it could potentially accelerate capital depletion.");
        break;
      case "percentage-based":
        insights.push(`Taking ${withdrawalPercentage}% of your portfolio value each year could potentially provide natural adjustments based on market performance.`);
        break;
      case "variable":
        insights.push("A variable withdrawal strategy might help adapt to changing market conditions and personal needs throughout retirement.");
        break;
    }
    
    return insights;
  }, [
    calculationComplete,
    withdrawApproach,
    sustainabilityScore,
    longevityYears,
    withdrawalPeriod,
    inflationImpact,
    equityAllocation,
    withdrawalStrategy,
    withdrawalPercentage
  ]);
  
  // Calculate portfolio allocation colors and data
  const portfolioAllocationData = useMemo(() => {
    return [
      { name: "Equity", value: equityAllocation, color: "#4f46e5" },
      { name: "Debt", value: debtAllocation, color: "#0ea5e9" },
      { name: "Gold", value: goldAllocation, color: "#eab308" },
      { name: "Cash", value: cashAllocation, color: "#22c55e" }
    ].filter(item => item.value > 0);
  }, [equityAllocation, debtAllocation, goldAllocation, cashAllocation]);
  
  // Handle balancing allocation when one value changes
  const handleAllocationChange = (type: 'equity' | 'debt' | 'gold' | 'cash', value: number) => {
    const diff = value - (
      type === 'equity' ? equityAllocation :
      type === 'debt' ? debtAllocation :
      type === 'gold' ? goldAllocation : cashAllocation
    );
    
    // Update the chosen allocation directly
    if (type === 'equity') setEquityAllocation(value);
    else if (type === 'debt') setDebtAllocation(value);
    else if (type === 'gold') setGoldAllocation(value);
    else setCashAllocation(value);
    
    // Adjust other allocations to maintain 100% total
    if (diff !== 0) {
      const othersTotal = 100 - value;
      const otherTypes = ['equity', 'debt', 'gold', 'cash'].filter(t => t !== type) as ('equity' | 'debt' | 'gold' | 'cash')[];
      const otherValues = otherTypes.map(t => 
        t === 'equity' ? equityAllocation :
        t === 'debt' ? debtAllocation :
        t === 'gold' ? goldAllocation : cashAllocation
      );
      const otherValuesSum = otherValues.reduce((sum, v) => sum + v, 0);
      
      if (otherValuesSum > 0) {
        // Proportionally adjust other allocations
        otherTypes.forEach((t, i) => {
          const newValue = Math.round(othersTotal * (otherValues[i] / otherValuesSum));
          if (t === 'equity') setEquityAllocation(newValue);
          else if (t === 'debt') setDebtAllocation(newValue);
          else if (t === 'gold') setGoldAllocation(newValue);
          else setCashAllocation(newValue);
        });
      }
    }
  };
  
  // Handle saving calculator
  const handleSaveCalculator = () => {
    if (!calculatorName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for your calculation."
      });
      return;
    }
    
    const savedData = {
      name: calculatorName,
      initialCorpus,
      withdrawalAmount,
      withdrawalFrequency,
      withdrawalPeriod,
      expectedReturns,
      inflationRate,
      withdrawalStrategy,
      withdrawalPercentage,
      withdrawApproach,
      investmentModel,
      equityAllocation,
      debtAllocation,
      goldAllocation,
      cashAllocation,
      totalWithdrawals,
      finalCorpus,
      sustainabilityScore,
      savedAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const existingSaved = localStorage.getItem('savedSWPCalculations');
    const savedCalculations = existingSaved ? JSON.parse(existingSaved) : [];
    localStorage.setItem('savedSWPCalculations', JSON.stringify([...savedCalculations, savedData]));
    
    setSaveDialogOpen(false);
    setCalculatorName("");
    
    toast({
      title: "Calculation Saved",
      description: "Your SWP calculation has been saved successfully."
    });
  };
  
  // Get frequency text for display
  const getFrequencyText = (frequency: WithdrawalFrequency): string => {
    switch (frequency) {
      case "monthly": return "Monthly";
      case "quarterly": return "Quarterly";
      case "semi-annually": return "Semi-Annual";
      case "annually": return "Annual";
      default: return "Monthly";
    }
  };

  return (
    <CalculatorLayout
      title="SWP Calculator"
      description="Plan your systematic withdrawals from investments for regular income during retirement."
      keywords="SWP calculator, systematic withdrawal plan, retirement planning, investment withdrawal, retirement income, financial planning"
      icon="account_balance"
    >
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full md:w-auto mb-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="results" disabled={!showResults}>Results</TabsTrigger>
            <TabsTrigger value="insights" disabled={!showResults}>Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator">
            <Card>
              <CardHeader className="pb-4 border-b">
                <CardTitle className="flex items-center">
                  <CalculatorIcon className="mr-2 h-5 w-5 text-blue-600" />
                  SWP (Systematic Withdrawal Plan) Calculator
                </CardTitle>
                <CardDescription>
                  Plan your retirement income through systematic withdrawals from your investments
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6 space-y-6">
                {/* Income Profile Templates */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Income Profile Templates (Optional)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {incomeProfileTemplates.map(template => (
                      <div
                        key={template.id}
                        onClick={() => applyIncomeTemplate(template)}
                        className={`p-3 border rounded-md cursor-pointer transition flex flex-col items-center ${
                          selectedTemplate === template.id ? "border-primary bg-primary/5" : "hover:bg-gray-50 hover:border-primary"
                        }`}
                      >
                        <div className={`flex justify-center mb-1 ${
                          selectedTemplate === template.id ? "text-primary" : ""
                        }`}>
                          {template.icon}
                        </div>
                        <div className="text-xs font-medium text-center">{template.name}</div>
                      </div>
                    ))}
                  </div>
                  
                  {selectedTemplate && (
                    <div className="mt-3 bg-blue-50 p-3 rounded-md">
                      <p className="text-sm font-medium">
                        {incomeProfileTemplates.find(t => t.id === selectedTemplate)?.name} Profile
                      </p>
                      <p className="text-xs text-gray-700 mt-1">
                        {incomeProfileTemplates.find(t => t.id === selectedTemplate)?.description}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Advanced Mode Toggle */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="advanced-mode" className="text-lg font-medium">Basic Calculator</Label>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="advanced-mode" className={advancedMode ? "text-gray-400" : "text-blue-600 font-medium"}>Basic</Label>
                    <div>
                      <input
                        type="checkbox"
                        id="advanced-mode"
                        className="peer sr-only"
                        checked={advancedMode}
                        onChange={e => setAdvancedMode(e.target.checked)}
                      />
                      <div className="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 relative transition-colors">
                        <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white peer-checked:left-6 transition-all"></div>
                      </div>
                    </div>
                    <Label htmlFor="advanced-mode" className={advancedMode ? "text-blue-600 font-medium" : "text-gray-400"}>Advanced</Label>
                  </div>
                </div>
                
                {/* Investment Corpus */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="initial-corpus" className="text-base font-medium">Initial Investment Corpus (₹)</Label>
                    <Tooltip text="The total investment amount from which you'll make systematic withdrawals">
                      <Info className="h-4 w-4 text-gray-400" />
                    </Tooltip>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Slider
                      id="initial-corpus"
                      min={100000}
                      max={50000000}
                      step={100000}
                      value={[initialCorpus]}
                      onValueChange={(value) => setInitialCorpus(value[0])}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={initialCorpus}
                      onChange={(e) => setInitialCorpus(Number(e.target.value))}
                      className="w-28"
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹1 Lakh</span>
                    <span>₹5 Crore</span>
                  </div>
                </div>
                
                {/* Withdrawal Amount */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="withdrawal-amount" className="text-base font-medium">
                      {withdrawalStrategy === "percentage-based" 
                        ? "Withdrawal Percentage (%)" 
                        : `${getFrequencyText(withdrawalFrequency)} Withdrawal Amount (₹)`}
                    </Label>
                    <Tooltip text={withdrawalStrategy === "percentage-based"
                      ? "Percentage of your corpus to be withdrawn per year"
                      : "Amount to be withdrawn at each interval"}>
                      <Info className="h-4 w-4 text-gray-400" />
                    </Tooltip>
                  </div>
                  
                  {withdrawalStrategy === "percentage-based" ? (
                    <div className="flex items-center space-x-4">
                      <Slider
                        id="withdrawal-percentage"
                        min={1}
                        max={10}
                        step={0.5}
                        value={[withdrawalPercentage]}
                        onValueChange={(value) => setWithdrawalPercentage(value[0])}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={withdrawalPercentage}
                        onChange={(e) => setWithdrawalPercentage(Number(e.target.value))}
                        className="w-28"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <Slider
                        id="withdrawal-amount"
                        min={1000}
                        max={withdrawalFrequency === "monthly" ? 100000 : 
                             withdrawalFrequency === "quarterly" ? 300000 :
                             withdrawalFrequency === "semi-annually" ? 600000 : 1200000}
                        step={1000}
                        value={[withdrawalAmount]}
                        onValueChange={(value) => setWithdrawalAmount(value[0])}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
                        className="w-28"
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    {withdrawalStrategy === "percentage-based" ? (
                      <>
                        <span>1%</span>
                        <span>10%</span>
                      </>
                    ) : (
                      <>
                        <span>₹1,000</span>
                        <span>{withdrawalFrequency === "monthly" ? "₹1,00,000" : 
                               withdrawalFrequency === "quarterly" ? "₹3,00,000" :
                               withdrawalFrequency === "semi-annually" ? "₹6,00,000" : "₹12,00,000"}</span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Withdrawal Duration and Frequency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="withdrawal-period" className="text-base font-medium">Withdrawal Period (Years)</Label>
                      <Tooltip text="How long you need to receive income from this investment">
                        <Info className="h-4 w-4 text-gray-400" />
                      </Tooltip>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Slider
                        id="withdrawal-period"
                        min={1}
                        max={50}
                        step={1}
                        value={[withdrawalPeriod]}
                        onValueChange={(value) => setWithdrawalPeriod(value[0])}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={withdrawalPeriod}
                        onChange={(e) => setWithdrawalPeriod(Number(e.target.value))}
                        className="w-20"
                      />
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 year</span>
                      <span>50 years</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-base font-medium">Withdrawal Frequency</Label>
                      <Tooltip text="How often you want to withdraw money from your investment">
                        <Info className="h-4 w-4 text-gray-400" />
                      </Tooltip>
                    </div>
                    
                    <Select
                      value={withdrawalFrequency}
                      onValueChange={(value) => setWithdrawalFrequency(value as WithdrawalFrequency)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="semi-annually">Semi-Annual</SelectItem>
                          <SelectItem value="annually">Annual</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Expected Returns and Inflation Rate */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="expected-returns" className="text-base font-medium">Expected Returns (%)</Label>
                      <Tooltip text="The annualized returns you expect from your investment portfolio">
                        <Info className="h-4 w-4 text-gray-400" />
                      </Tooltip>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Slider
                        id="expected-returns"
                        min={4}
                        max={16}
                        step={0.5}
                        value={[expectedReturns]}
                        onValueChange={(value) => setExpectedReturns(value[0])}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={expectedReturns}
                        onChange={(e) => setExpectedReturns(Number(e.target.value))}
                        className="w-20"
                      />
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>4%</span>
                      <span>16%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="inflation-rate" className="text-base font-medium">Inflation Rate (%)</Label>
                      <Tooltip text="The annual rate at which the cost of living increases">
                        <Info className="h-4 w-4 text-gray-400" />
                      </Tooltip>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Slider
                        id="inflation-rate"
                        min={2}
                        max={10}
                        step={0.5}
                        value={[inflationRate]}
                        onValueChange={(value) => setInflationRate(value[0])}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(Number(e.target.value))}
                        className="w-20"
                      />
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>2%</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>
                
                {/* Advanced Settings */}
                {advancedMode && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium flex items-center">
                      <Settings className="mr-2 h-5 w-5" />
                      Advanced Settings
                    </h3>
                    
                    {/* Withdrawal Strategy */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-base font-medium">Withdrawal Strategy</Label>
                        <Tooltip text="How your withdrawal amount changes over time">
                          <Info className="h-4 w-4 text-gray-400" />
                        </Tooltip>
                      </div>
                      
                      <RadioGroup
                        value={withdrawalStrategy}
                        onValueChange={(value) => {
                          setWithdrawalStrategy(value as WithdrawalStrategy);
                          if (value === 'variable') {
                            setShowVariableInputs(true);
                          } else {
                            setShowVariableInputs(false);
                          }
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-2"
                      >
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="fixed" id="fixed" />
                          <div className="grid gap-1.5">
                            <Label htmlFor="fixed" className="font-medium">Fixed Withdrawal</Label>
                            <p className="text-sm text-muted-foreground">Constant amount regardless of market conditions</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="inflation-adjusted" id="inflation-adjusted" />
                          <div className="grid gap-1.5">
                            <Label htmlFor="inflation-adjusted" className="font-medium">Inflation-Adjusted</Label>
                            <p className="text-sm text-muted-foreground">Increases withdrawals with inflation</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="percentage-based" id="percentage-based" />
                          <div className="grid gap-1.5">
                            <Label htmlFor="percentage-based" className="font-medium">Percentage-Based</Label>
                            <p className="text-sm text-muted-foreground">Withdraws a percentage of current balance</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="variable" id="variable" />
                          <div className="grid gap-1.5">
                            <Label htmlFor="variable" className="font-medium">Variable Returns</Label>
                            <p className="text-sm text-muted-foreground">Different return rates over time</p>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {/* Variable Return Rates */}
                    {showVariableInputs && (
                      <div className="p-4 border rounded-md space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Variable Return Rates</h4>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={addVariableRate}
                            className="text-xs"
                          >
                            + Add Year
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          {variableRates.map((rate, index) => (
                            <div key={index} className="grid grid-cols-12 gap-2 items-center">
                              <div className="col-span-5">
                                <Label htmlFor={`year-${index}`} className="text-xs mb-1 block">Year</Label>
                                <Input
                                  id={`year-${index}`}
                                  type="number"
                                  value={rate.year}
                                  onChange={(e) => updateVariableRate(index, 'year', Number(e.target.value))}
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div className="col-span-5">
                                <Label htmlFor={`rate-${index}`} className="text-xs mb-1 block">Return Rate (%)</Label>
                                <Input
                                  id={`rate-${index}`}
                                  type="number"
                                  value={rate.rate}
                                  onChange={(e) => updateVariableRate(index, 'rate', Number(e.target.value))}
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div className="col-span-2 pt-5">
                                {index > 0 && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeVariableRate(index)}
                                    className="h-8 w-8 p-0"
                                  >
                                    &times;
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <p className="text-xs text-gray-500">
                          Define different return rates starting at specific years. The calculator will use these rates for the periods between years.
                        </p>
                      </div>
                    )}
                    
                    {/* Withdrawl Approach */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-base font-medium">Withdrawal Approach</Label>
                        <Tooltip text="Whether you want to preserve your capital or are willing to deplete it">
                          <Info className="h-4 w-4 text-gray-400" />
                        </Tooltip>
                      </div>
                      
                      <RadioGroup
                        value={withdrawApproach}
                        onValueChange={(value) => setWithdrawApproach(value as WithdrawApproach)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-2"
                      >
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="preserve-capital" id="preserve-capital" />
                          <div className="grid gap-1.5">
                            <Label htmlFor="preserve-capital" className="font-medium">Preserve Capital</Label>
                            <p className="text-sm text-muted-foreground">Try to maintain or grow initial investment</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="deplete-capital" id="deplete-capital" />
                          <div className="grid gap-1.5">
                            <Label htmlFor="deplete-capital" className="font-medium">Deplete Capital</Label>
                            <p className="text-sm text-muted-foreground">Gradually use up investment over withdrawal period</p>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {/* Investment Portfolio Allocation */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-medium">Investment Portfolio Allocation</Label>
                        <Tooltip text="The distribution of your investments across asset classes">
                          <Info className="h-4 w-4 text-gray-400" />
                        </Tooltip>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <Label htmlFor="equity-allocation" className="text-sm">Equity ({equityAllocation}%)</Label>
                              <span className={`text-xs ${getRiskLevel(equityAllocation) === "Very High" ? "text-red-600" : 
                                getRiskLevel(equityAllocation) === "High" ? "text-amber-600" :
                                getRiskLevel(equityAllocation) === "Moderate" ? "text-blue-600" : "text-green-600"}`}>
                                {getRiskLevel(equityAllocation)} Risk
                              </span>
                            </div>
                            <Slider
                              id="equity-allocation"
                              min={0}
                              max={100}
                              step={5}
                              value={[equityAllocation]}
                              onValueChange={(value) => handleAllocationChange('equity', value[0])}
                              className="flex-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="debt-allocation" className="text-sm">Debt ({debtAllocation}%)</Label>
                            <Slider
                              id="debt-allocation"
                              min={0}
                              max={100}
                              step={5}
                              value={[debtAllocation]}
                              onValueChange={(value) => handleAllocationChange('debt', value[0])}
                              className="flex-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="gold-allocation" className="text-sm">Gold ({goldAllocation}%)</Label>
                            <Slider
                              id="gold-allocation"
                              min={0}
                              max={100}
                              step={5}
                              value={[goldAllocation]}
                              onValueChange={(value) => handleAllocationChange('gold', value[0])}
                              className="flex-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="cash-allocation" className="text-sm">Cash ({cashAllocation}%)</Label>
                            <Slider
                              id="cash-allocation"
                              min={0}
                              max={100}
                              step={5}
                              value={[cashAllocation]}
                              onValueChange={(value) => handleAllocationChange('cash', value[0])}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center">
                          <div className="h-48 w-48">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChartComponent>
                                <Pie
                                  data={portfolioAllocationData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={40}
                                  outerRadius={80}
                                  paddingAngle={2}
                                  dataKey="value"
                                  label={({ name, value }) => `${name}: ${value}%`}
                                >
                                  {portfolioAllocationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                              </PieChartComponent>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEquityAllocation(25);
                            setDebtAllocation(55);
                            setGoldAllocation(10);
                            setCashAllocation(10);
                            setInvestmentModel('conservative');
                          }}
                          className={`text-xs ${investmentModel === 'conservative' ? 'bg-blue-50 border-blue-200' : ''}`}
                        >
                          Conservative
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEquityAllocation(50);
                            setDebtAllocation(30);
                            setGoldAllocation(10);
                            setCashAllocation(10);
                            setInvestmentModel('balanced');
                          }}
                          className={`text-xs ${investmentModel === 'balanced' ? 'bg-blue-50 border-blue-200' : ''}`}
                        >
                          Balanced
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEquityAllocation(70);
                            setDebtAllocation(20);
                            setGoldAllocation(5);
                            setCashAllocation(5);
                            setInvestmentModel('growth');
                          }}
                          className={`text-xs ${investmentModel === 'growth' ? 'bg-blue-50 border-blue-200' : ''}`}
                        >
                          Growth
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setInvestmentModel('custom');
                          }}
                          className={`text-xs ${investmentModel === 'custom' ? 'bg-blue-50 border-blue-200' : ''}`}
                        >
                          Custom
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Educational Notes */}
                {showNotes && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 relative">
                    <button 
                      className="absolute top-2 right-2 text-blue-700 hover:text-blue-900"
                      onClick={() => setShowNotes(false)}
                    >
                      &times;
                    </button>
                    <h3 className="text-sm font-medium text-blue-800 flex items-center mb-2">
                      <BookOpen className="h-4 w-4 mr-1.5" />
                      Understanding SWP (Systematic Withdrawal Plan)
                    </h3>
                    <div className="text-xs text-blue-800 space-y-2">
                      <p>
                        A Systematic Withdrawal Plan (SWP) is a method to withdraw fixed or variable amounts from your investments at regular intervals.
                      </p>
                      <p>
                        This calculator helps you understand how long your corpus might last or how much income it might generate based on your withdrawal pattern and investment returns.
                      </p>
                      <p>
                        The sustainability of your withdrawals depends on factors like withdrawal rate, investment returns, inflation, and asset allocation.
                      </p>
                      <Accordion type="single" collapsible className="border-0">
                        <AccordionItem value="withdrawal-rule" className="border-0">
                          <AccordionTrigger className="py-1 text-xs font-medium text-blue-800">Learn about the 4% Withdrawal Rule</AccordionTrigger>
                          <AccordionContent className="text-xs text-blue-700 pt-2">
                            <p>
                              The 4% rule is a guideline suggesting that withdrawing 4% of your initial retirement corpus in the first year, and then adjusting that amount for inflation each year thereafter, might provide a sustainable income for a 30-year retirement period.
                            </p>
                            <p className="mt-1">
                              This rule was developed based on historical U.S. market returns and might not apply to all situations or market conditions. It's advisable to work with a financial planner to develop a personalized withdrawal strategy.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between border-t p-6 bg-gray-50">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setInitialCorpus(5000000);
                    setWithdrawalAmount(25000);
                    setWithdrawalFrequency("monthly");
                    setWithdrawalPeriod(20);
                    setExpectedReturns(8);
                    setInflationRate(5);
                    setWithdrawalStrategy("fixed");
                    setWithdrawalPercentage(4);
                    setWithdrawApproach("preserve-capital");
                    setInvestmentModel("balanced");
                    setEquityAllocation(50);
                    setDebtAllocation(30);
                    setGoldAllocation(10);
                    setCashAllocation(10);
                    setAdvancedMode(false);
                    setSelectedTemplate(null);
                    toast({
                      title: "Calculator Reset",
                      description: "All values have been reset to defaults."
                    });
                  }}
                >
                  Reset Calculator
                </Button>
                <Button 
                  onClick={calculateSWP}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <LineChartIcon className="mr-2 h-4 w-4" />
                  Calculate SWP
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="results">
            {calculationComplete && (
              <div className="space-y-6">
                {/* Results Header */}
                <div className="bg-[#2563eb] p-6 rounded-lg shadow-md text-white">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <Wallet className="w-10 h-10 mr-4" />
                      <div>
                        <h2 className="text-2xl font-bold">SWP Results</h2>
                        <p className="text-blue-100">
                          {formatCurrency(initialCorpus)} corpus with {getFrequencyText(withdrawalFrequency).toLowerCase()} 
                          {withdrawalStrategy === "percentage-based" 
                            ? ` ${withdrawalPercentage}% withdrawals` 
                            : ` ${formatCurrency(withdrawalAmount)} withdrawals`} for {withdrawalPeriod} years
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 py-1 px-4 rounded-full text-sm">
                        {getRiskLevel(equityAllocation)} Risk
                      </div>
                      <div className="bg-white/20 py-1 px-4 rounded-full text-sm">
                        {formatPercentage(expectedReturns)} Return
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="border-blue-200 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2 border-b bg-blue-50">
                      <CardTitle className="text-blue-800 text-base flex items-center">
                        <Wallet className="w-5 h-5 mr-2" />
                        Total Withdrawals
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-xl font-bold text-blue-700">
                        {formatCurrency(totalWithdrawals)}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Total money withdrawn over {longevityYears.toFixed(1)} years
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2 border-b bg-blue-50">
                      <CardTitle className="text-blue-800 text-base flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Final Corpus
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-xl font-bold text-blue-700">
                        {formatCurrency(finalCorpus)}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Remaining amount after {withdrawalPeriod} years
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2 border-b bg-blue-50">
                      <CardTitle className="text-blue-800 text-base flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Sustainability Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex items-center">
                        <div className="text-xl font-bold text-blue-700">
                          {sustainabilityScore}%
                        </div>
                        <div className="ml-2">
                          {sustainabilityScore >= 80 ? (
                            <div className="bg-green-100 text-green-800 text-xs rounded px-2 py-0.5">Excellent</div>
                          ) : sustainabilityScore >= 60 ? (
                            <div className="bg-blue-100 text-blue-800 text-xs rounded px-2 py-0.5">Good</div>
                          ) : sustainabilityScore >= 40 ? (
                            <div className="bg-amber-100 text-amber-800 text-xs rounded px-2 py-0.5">Moderate</div>
                          ) : (
                            <div className="bg-red-100 text-red-800 text-xs rounded px-2 py-0.5">Low</div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Based on {withdrawApproach === 'preserve-capital' ? 'capital preservation' : 'capital longevity'}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2 border-b bg-blue-50">
                      <CardTitle className="text-blue-800 text-base flex items-center">
                        <ArrowDown className="w-5 h-5 mr-2" />
                        Inflation Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-xl font-bold text-blue-700">
                        {inflationImpact.toFixed(1)}%
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Loss in purchasing power over time
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Corpus and Withdrawal Visualization */}
                <Card>
                  <CardHeader className="border-b flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <LineChartIcon className="w-5 h-5 mr-2" />
                        Corpus & Withdrawal Projection
                      </CardTitle>
                      <CardDescription>
                        Visualize how your investment corpus and withdrawals change over time
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Select value={chartType} onValueChange={(value) => setChartType(value as any)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Chart Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="area">Area Chart</SelectItem>
                            <SelectItem value="line">Line Chart</SelectItem>
                            <SelectItem value="bar">Bar Chart</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        {chartType === 'area' ? (
                          <AreaChart
                            data={incomeTimeline.filter(d => d.month % 12 === 0 || d.month === 1 || d.month === incomeTimeline[incomeTimeline.length - 1].month)}
                            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                          >
                            <defs>
                              <linearGradient id="colorCorpus" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                              </linearGradient>
                              <linearGradient id="colorWithdrawal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                              </linearGradient>
                              {withInflationAdjustment && (
                                <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                                </linearGradient>
                              )}
                            </defs>
                            <XAxis 
                              dataKey="date"
                              label={{ value: 'Year', position: 'insideBottomRight', offset: 0 }}
                            />
                            <YAxis 
                              tickFormatter={(value) => new Intl.NumberFormat('en-IN', {
                                notation: 'compact',
                                compactDisplay: 'short',
                                maximumFractionDigits: 1
                              }).format(value)}
                              label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
                            />
                            <RTooltip
                              formatter={(value: number) => [formatCurrency(value), ""]}
                              labelFormatter={(label) => `Date: ${label}`}
                            />
                            <Legend />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Area 
                              type="monotone" 
                              dataKey="remainingCorpus" 
                              stroke="#3b82f6" 
                              fillOpacity={1} 
                              fill="url(#colorCorpus)" 
                              name="Remaining Corpus"
                            />
                            <Area 
                              type="monotone" 
                              dataKey="withdrawal" 
                              stroke="#22c55e" 
                              fillOpacity={1} 
                              fill="url(#colorWithdrawal)" 
                              name="Withdrawal Amount"
                            />
                            {withInflationAdjustment && (
                              <Area 
                                type="monotone" 
                                dataKey="realValue" 
                                stroke="#f59e0b" 
                                fillOpacity={1} 
                                fill="url(#colorReal)" 
                                name="Real Value (Inflation Adjusted)"
                              />
                            )}
                          </AreaChart>
                        ) : chartType === 'line' ? (
                          <LineChart
                            data={incomeTimeline.filter(d => d.month % 12 === 0 || d.month === 1 || d.month === incomeTimeline[incomeTimeline.length - 1].month)}
                            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                          >
                            <XAxis 
                              dataKey="date"
                              label={{ value: 'Year', position: 'insideBottomRight', offset: 0 }}
                            />
                            <YAxis 
                              tickFormatter={(value) => new Intl.NumberFormat('en-IN', {
                                notation: 'compact',
                                compactDisplay: 'short',
                                maximumFractionDigits: 1
                              }).format(value)}
                              label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
                            />
                            <RTooltip
                              formatter={(value: number) => [formatCurrency(value), ""]}
                              labelFormatter={(label) => `Date: ${label}`}
                            />
                            <Legend />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Line 
                              type="monotone" 
                              dataKey="remainingCorpus" 
                              stroke="#3b82f6" 
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 6 }}
                              name="Remaining Corpus"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="withdrawal" 
                              stroke="#22c55e" 
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 6 }}
                              name="Withdrawal Amount"
                            />
                            {withInflationAdjustment && (
                              <Line 
                                type="monotone" 
                                dataKey="realValue" 
                                stroke="#f59e0b" 
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 6 }}
                                name="Real Value (Inflation Adjusted)"
                              />
                            )}
                          </LineChart>
                        ) : (
                          <BarChart
                            data={incomeTimeline.filter(d => d.month % 12 === 0 || d.month === 1 || d.month === incomeTimeline[incomeTimeline.length - 1].month)}
                            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                          >
                            <XAxis 
                              dataKey="date"
                              label={{ value: 'Year', position: 'insideBottomRight', offset: 0 }}
                            />
                            <YAxis 
                              tickFormatter={(value) => new Intl.NumberFormat('en-IN', {
                                notation: 'compact',
                                compactDisplay: 'short',
                                maximumFractionDigits: 1
                              }).format(value)}
                              label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
                            />
                            <RTooltip
                              formatter={(value: number) => [formatCurrency(value), ""]}
                              labelFormatter={(label) => `Date: ${label}`}
                            />
                            <Legend />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar 
                              dataKey="remainingCorpus" 
                              fill="#3b82f6" 
                              name="Remaining Corpus"
                            />
                            <Bar 
                              dataKey="withdrawal" 
                              fill="#22c55e" 
                              name="Withdrawal Amount"
                            />
                            {withInflationAdjustment && (
                              <Bar 
                                dataKey="realValue" 
                                fill="#f59e0b" 
                                name="Real Value (Inflation Adjusted)"
                              />
                            )}
                          </BarChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="flex justify-center mt-4 space-x-4">
                      <label className="inline-flex items-center">
                        <Checkbox 
                          checked={withInflationAdjustment}
                          onCheckedChange={(checked) => setWithInflationAdjustment(checked === true)}
                          className="mr-2"
                        />
                        <span className="text-sm">Show Inflation-Adjusted Values</span>
                      </label>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Annual Breakdown Table */}
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center">
                      <Table className="w-5 h-5 mr-2" />
                      Income Timeline
                    </CardTitle>
                    <CardDescription>
                      Year-by-year breakdown of your SWP income and corpus
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-700">
                          <tr>
                            <th className="px-4 py-3 text-left">Year</th>
                            <th className="px-4 py-3 text-right">Date</th>
                            <th className="px-4 py-3 text-right">Withdrawal</th>
                            <th className="px-4 py-3 text-right">Remaining Corpus</th>
                            {withInflationAdjustment && (
                              <th className="px-4 py-3 text-right">Real Value</th>
                            )}
                            <th className="px-4 py-3 text-right">Total Withdrawn</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {incomeTimeline.filter(entry => entry.month === 1 || entry.month % 12 === 0).map((entry, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-left">{Math.ceil(entry.month / 12)}</td>
                              <td className="px-4 py-3 text-right">{entry.date}</td>
                              <td className="px-4 py-3 text-right">{formatCurrency(entry.withdrawal)}</td>
                              <td className="px-4 py-3 text-right font-medium">{formatCurrency(entry.remainingCorpus)}</td>
                              {withInflationAdjustment && (
                                <td className="px-4 py-3 text-right text-amber-600">{formatCurrency(entry.realValue)}</td>
                              )}
                              <td className="px-4 py-3 text-right">{formatCurrency(entry.cumulativeWithdrawal)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-end">
                  <Button 
                    variant="outline"
                    className="flex items-center"
                    onClick={() => setActiveTab("calculator")}
                  >
                    <CalculatorIcon className="mr-2 h-4 w-4" />
                    Adjust Parameters
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex items-center"
                    onClick={() => setSaveDialogOpen(true)}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Calculation
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex items-center"
                    onClick={() => {
                      // Simulate PDF download
                      toast({
                        title: "Report Generated",
                        description: "Your SWP calculation report has been downloaded."
                      });
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="insights">
            {calculationComplete && (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                      Key Educational Points
                    </CardTitle>
                    <CardDescription>
                      Educational insights to help you understand your SWP strategy
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {educationalInsights.map((insight, index) => (
                        <div key={index} className="flex items-start">
                          <ArrowRight className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                          <p>{insight}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Sustainability Analysis */}
                  <Card>
                    <CardHeader className="border-b">
                      <CardTitle className="flex items-center">
                        <Target className="w-5 h-5 mr-2 text-blue-600" />
                        Withdrawal Sustainability Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Sustainability Score</span>
                          <span className="text-lg font-bold">{sustainabilityScore}%</span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              sustainabilityScore >= 80 ? "bg-green-600" :
                              sustainabilityScore >= 60 ? "bg-blue-600" :
                              sustainabilityScore >= 40 ? "bg-amber-500" : "bg-red-600"
                            }`}
                            style={{ width: `${sustainabilityScore}%` }}
                          ></div>
                        </div>
                        
                        <div className="mt-6 space-y-4">
                          <div className="flex items-start">
                            <div className="p-1 rounded-full bg-green-100 mt-0.5 flex-shrink-0">
                              <CheckCircle2 className="h-3 w-3 text-green-600" />
                            </div>
                            <div className="ml-2">
                              <p className="text-sm font-medium">4% Rule Perspective</p>
                              <p className="text-xs text-gray-600">
                                {withdrawalStrategy === 'percentage-based' 
                                  ? `Your ${withdrawalPercentage}% withdrawal rate is ${withdrawalPercentage <= 4 ? 'at or below' : 'above'} the traditional 4% guideline.`
                                  : `Your initial withdrawal rate is approximately ${((withdrawalAmount * getFrequencyMultiplier(withdrawalFrequency)) / initialCorpus * 100).toFixed(1)}% of your corpus, which is ${((withdrawalAmount * getFrequencyMultiplier(withdrawalFrequency)) / initialCorpus * 100) <= 4 ? 'at or below' : 'above'} the traditional 4% guideline.`
                                }
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="p-1 rounded-full bg-green-100 mt-0.5 flex-shrink-0">
                              <CheckCircle2 className="h-3 w-3 text-green-600" />
                            </div>
                            <div className="ml-2">
                              <p className="text-sm font-medium">Longevity Analysis</p>
                              <p className="text-xs text-gray-600">
                                {longevityYears >= withdrawalPeriod 
                                  ? `Your corpus might last for the entire ${withdrawalPeriod} year period with the current withdrawal strategy.`
                                  : `With current parameters, your corpus might last approximately ${longevityYears.toFixed(1)} years out of your target ${withdrawalPeriod} years.`
                                }
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="p-1 rounded-full bg-green-100 mt-0.5 flex-shrink-0">
                              <CheckCircle2 className="h-3 w-3 text-green-600" />
                            </div>
                            <div className="ml-2">
                              <p className="text-sm font-medium">Capital Preservation</p>
                              <p className="text-xs text-gray-600">
                                {finalCorpus >= initialCorpus
                                  ? `Your strategy might preserve and potentially grow your initial capital from ₹${(initialCorpus/100000).toFixed(1)} lakhs to ₹${(finalCorpus/100000).toFixed(1)} lakhs.`
                                  : finalCorpus >= initialCorpus * 0.5
                                  ? `Your strategy might preserve about ${(finalCorpus / initialCorpus * 100).toFixed(0)}% of your initial capital.`
                                  : `Your strategy might utilize a significant portion of your capital, with approximately ${(finalCorpus / initialCorpus * 100).toFixed(0)}% remaining.`
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Inflation Impact */}
                  <Card>
                    <CardHeader className="border-b">
                      <CardTitle className="flex items-center">
                        <TrendingDown className="w-5 h-5 mr-2 text-blue-600" />
                        Inflation Impact Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <p className="text-sm">
                          Inflation at {inflationRate}% per year could reduce the purchasing power of your withdrawals over time.
                        </p>
                        
                        <div className="bg-amber-50 p-4 rounded-md">
                          <h4 className="text-sm font-medium text-amber-800 mb-2">Purchasing Power Impact</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-amber-800">Initial Withdrawal</span>
                            <span className="text-sm font-medium">{formatCurrency(incomeTimeline[0]?.withdrawal || 0)}</span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-amber-800">Final Real Value</span>
                            <span className="text-sm font-medium">{formatCurrency(realWithdrawalPower)}</span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-amber-800">Loss in Purchasing Power</span>
                            <span className="text-sm font-medium text-amber-700">{inflationImpact.toFixed(1)}%</span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">What This Means</h4>
                          <div className="space-y-2">
                            <p className="text-xs text-gray-600">
                              {inflationImpact > 50
                                ? "High inflation impact could significantly reduce your standard of living over time if withdrawals remain fixed."
                                : inflationImpact > 25
                                ? "Moderate inflation impact may cause gradual reduction in your purchasing power over time."
                                : "The inflation impact appears manageable with your chosen withdrawal strategy."
                              }
                            </p>
                            
                            {withdrawalStrategy !== "inflation-adjusted" && (
                              <p className="text-xs text-gray-600">
                                Consider exploring inflation-adjusted withdrawal strategies to help maintain your purchasing power over time.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Portfolio Allocation Analysis */}
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center">
                      <PieChart className="w-5 h-5 mr-2 text-blue-600" />
                      Portfolio Allocation Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-3">Asset Allocation</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChartComponent>
                              <Pie
                                data={portfolioAllocationData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}%`}
                              >
                                {portfolioAllocationData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                            </PieChartComponent>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium">Risk Profile: {getRiskLevel(equityAllocation)}</h4>
                        <p className="text-xs text-gray-600">
                          Your portfolio has {equityAllocation}% in equity, which is generally considered
                          {equityAllocation >= 70 ? " high risk with potential for higher returns." :
                            equityAllocation >= 40 ? " moderately risky with balanced growth potential." :
                            " relatively conservative with focus on capital preservation."}
                        </p>
                        
                        <div className="mt-2">
                          <h4 className="text-sm font-medium mb-2">Educational Insights</h4>
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <ArrowRight className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-gray-600">
                                A more conservative allocation might be considered for shorter withdrawal periods or if capital preservation is a priority.
                              </p>
                            </div>
                            
                            <div className="flex items-start">
                              <ArrowRight className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-gray-600">
                                A higher equity allocation might potentially provide better inflation protection over long periods but could introduce more short-term volatility.
                              </p>
                            </div>
                            
                            <div className="flex items-start">
                              <ArrowRight className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-gray-600">
                                Diversification across asset classes might help manage risk while potentially capturing growth opportunities.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Financial Disclaimer */}
        <div className="mt-6 mb-4">
          <FinancialDisclaimer 
            variant="default"
            calculatorType="retirement"
            size="md"
          />
        </div>
        
        {/* Save Dialog */}
        <Dialog open={isSaveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save SWP Calculation</DialogTitle>
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
                placeholder="e.g., My Retirement Income Plan"
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
      </div>
    </CalculatorLayout>
  );
};

export default SWPCalculator;