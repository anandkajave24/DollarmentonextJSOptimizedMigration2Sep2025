import React, { useState, useEffect, useMemo } from "react";
import { CalculatorLayout } from "../components/calculators/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card";
import { Slider } from "../components/ui/slider";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Progress } from "../components/ui/progress";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../components/ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { useBudget } from "../contexts/BudgetContext";
import { useToast } from "../hooks/use-toast";
import { format, addDays, addMonths, addYears, differenceInMonths } from "date-fns";
import {
  Home, Wallet, Calculator, Calendar, TrendingUp, Landmark, 
  DollarSign, Save, ArrowRight, BarChart4, LineChart, PieChart as ChartPie,
  IndianRupee, Settings, Info, AlertCircle, HelpCircle, ChevronRight, 
  CreditCard, Percent, Target, CheckCircle, ChevronDown, ChevronUp, Clock,
  Building, Users, Coins, PiggyBank, Check, Activity, CircleDollarSign,
  BadgePercent
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, 
  Legend, ResponsiveContainer, LineChart as RLineChart, Line, Area, AreaChart,
  PieChart, Pie, Cell, ReferenceLine, ComposedChart
} from 'recharts';
import ReactECharts from 'echarts-for-react';

// Custom Tooltip component
const CustomTooltip = ({ text, children }: { text: string, children: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className="cursor-help">{children}</span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default function HomeDownPaymentCalculator() {
  const { toast } = useToast();
  const { budgetData, updateExpense } = useBudget();
  const { monthlyIncome, expenses } = budgetData;
  
  // State for property details
  const [propertyValue, setPropertyValue] = useState(5000000); // 50 lakhs
  const [targetDownPaymentPercent, setTargetDownPaymentPercent] = useState(20);
  const [desiredPurchaseDate, setDesiredPurchaseDate] = useState(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 3); // Default to 3 years from now
    return format(date, "yyyy-MM-dd");
  });
  
  // State for savings & investment details
  const [currentSavings, setCurrentSavings] = useState(500000); // 5 lakhs
  const [monthlySavings, setMonthlySavings] = useState(25000);
  const [expectedReturnRate, setExpectedReturnRate] = useState(8);
  const [inflationRate, setInflationRate] = useState(6);
  const [savingsFrequency, setSavingsFrequency] = useState("monthly");
  
  // State for additional financial factors
  const [includeOtherSources, setIncludeOtherSources] = useState(false);
  const [otherSourcesAmount, setOtherSourcesAmount] = useState(0);
  const [otherSourcesType, setOtherSourcesType] = useState("bonus");
  const [propertyAppreciationRate, setPropertyAppreciationRate] = useState(5);
  
  // State for strategy options
  const [selectedStrategy, setSelectedStrategy] = useState("balanced");
  const [investmentAllocation, setInvestmentAllocation] = useState({
    equity: 40,
    debt: 40,
    liquid: 20
  });
  
  // State for goal tracking
  const [showAddToGoal, setShowAddToGoal] = useState(false);
  const [goalName, setGoalName] = useState("Home Down Payment");
  const [goalDialogOpen, setGoalDialogOpen] = useState(false);
  
  // State for UI
  const [activeTab, setActiveTab] = useState("calculator");
  const [showResults, setShowResults] = useState(false);
  
  // State for investment recommendations
  const [timeToGoal, setTimeToGoal] = useState(3); // Default to 3 years
  
  // Derived calculation values
  const targetDownPaymentAmount = useMemo(() => 
    propertyValue * (targetDownPaymentPercent / 100),
  [propertyValue, targetDownPaymentPercent]);
  
  const remainingLoanAmount = useMemo(() => 
    propertyValue - targetDownPaymentAmount,
  [propertyValue, targetDownPaymentAmount]);
  
  const monthsUntilPurchase = useMemo(() => {
    const targetDate = new Date(desiredPurchaseDate);
    return differenceInMonths(targetDate, new Date());
  }, [desiredPurchaseDate]);
  
  const projectedPropertyValue = useMemo(() => {
    // Calculate future property value based on appreciation
    const years = monthsUntilPurchase / 12;
    return propertyValue * Math.pow(1 + (propertyAppreciationRate / 100), years);
  }, [propertyValue, propertyAppreciationRate, monthsUntilPurchase]);
  
  const projectedDownPaymentAmount = useMemo(() => 
    projectedPropertyValue * (targetDownPaymentPercent / 100),
  [projectedPropertyValue, targetDownPaymentPercent]);
  
  // Calculate future savings value with compound interest
  const projectedSavings = useMemo(() => {
    // Current savings with compound growth
    const years = monthsUntilPurchase / 12;
    const growthFactor = Math.pow(1 + (expectedReturnRate / 100), years);
    let futureSavings = currentSavings * growthFactor;
    
    // Calculate future value of periodic investments
    const monthlyRate = expectedReturnRate / 100 / 12;
    let periodicAmount = monthlySavings;
    
    if (savingsFrequency === "quarterly") {
      periodicAmount = monthlySavings * 3;
    } else if (savingsFrequency === "annually") {
      periodicAmount = monthlySavings * 12;
    }
    
    const periods = savingsFrequency === "monthly" ? monthsUntilPurchase : 
                   savingsFrequency === "quarterly" ? monthsUntilPurchase / 3 : 
                   monthsUntilPurchase / 12;
    
    // Future value of periodic investments formula
    if (monthlyRate > 0 && periods > 0) {
      const periodicRate = savingsFrequency === "monthly" ? monthlyRate : 
                          savingsFrequency === "quarterly" ? monthlyRate * 3 : 
                          monthlyRate * 12;
      futureSavings += periodicAmount * ((Math.pow(1 + periodicRate, periods) - 1) / periodicRate);
    } else {
      futureSavings += periodicAmount * periods;
    }
    
    // Add other sources if applicable
    if (includeOtherSources && otherSourcesAmount > 0) {
      if (otherSourcesType === "bonus" || otherSourcesType === "gift") {
        // One-time addition
        futureSavings += otherSourcesAmount * Math.pow(1 + (expectedReturnRate / 100), years - 0.5);
      } else if (otherSourcesType === "inheritance") {
        // Assuming inheritance mid-way through the plan
        futureSavings += otherSourcesAmount * Math.pow(1 + (expectedReturnRate / 100), years / 2);
      }
    }
    
    return Math.round(futureSavings);
  }, [currentSavings, monthlySavings, expectedReturnRate, monthsUntilPurchase, savingsFrequency, includeOtherSources, otherSourcesAmount, otherSourcesType]);
  
  // Gap analysis
  const savingsGap = projectedDownPaymentAmount - projectedSavings;
  const savingsPercentageAchieved = (projectedSavings / projectedDownPaymentAmount) * 100;
  const isOnTrack = projectedSavings >= projectedDownPaymentAmount;
  
  // Additional monthly savings needed to reach goal
  const additionalSavingsNeeded = useMemo(() => {
    if (isOnTrack) return 0;
    
    // Calculate how much additional monthly savings needed to close the gap
    const months = monthsUntilPurchase > 0 ? monthsUntilPurchase : 1;
    const monthlyRate = expectedReturnRate / 100 / 12;
    
    // If return rate is very close to zero, use simpler calculation
    if (Math.abs(monthlyRate) < 0.0001) {
      return savingsGap / months;
    }
    
    // Future value of annuity formula, solved for payment
    return savingsGap * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
  }, [savingsGap, monthsUntilPurchase, expectedReturnRate, isOnTrack]);
  
  // EMI calculation function
  const calculateEMI = (loanAmount: number, interestRate: number, tenureYears: number) => {
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;
    
    // EMI calculation formula
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    return Math.round(emi);
  };
  
  // EMI estimate for the remaining loan amount
  const estimatedEMI = useMemo(() => {
    return calculateEMI(remainingLoanAmount, 8.5, 20);
  }, [remainingLoanAmount]);
  
  // Generate savings growth chart data
  const savingsGrowthData = useMemo(() => {
    const data = [];
    let currentValue = currentSavings;
    const monthlyRate = expectedReturnRate / 100 / 12;
    
    let periodicSavings = 0;
    let frequencyMonths = 1;
    
    if (savingsFrequency === "monthly") {
      periodicSavings = monthlySavings;
      frequencyMonths = 1;
    } else if (savingsFrequency === "quarterly") {
      periodicSavings = monthlySavings * 3;
      frequencyMonths = 3;
    } else { // annually
      periodicSavings = monthlySavings * 12;
      frequencyMonths = 12;
    }
    
    for (let month = 0; month <= monthsUntilPurchase; month++) {
      // Add entry for this month
      data.push({
        month,
        value: Math.round(currentValue),
        target: Math.round(projectedPropertyValue * (targetDownPaymentPercent / 100) * 
                          Math.pow(1 + (propertyAppreciationRate / 100), month / 12) / 
                          Math.pow(1 + (propertyAppreciationRate / 100), monthsUntilPurchase / 12))
      });
      
      // Calculate next month's value
      // Grow existing savings with interest
      currentValue = currentValue * (1 + monthlyRate);
      
      // Add periodic contributions
      if (month % frequencyMonths === 0 && month > 0) {
        currentValue += periodicSavings;
      }
      
      // Add one-time amounts if applicable
      if (includeOtherSources && otherSourcesAmount > 0) {
        if (otherSourcesType === "bonus" && month === 6) {
          currentValue += otherSourcesAmount;
        } else if (otherSourcesType === "inheritance" && month === Math.floor(monthsUntilPurchase / 2)) {
          currentValue += otherSourcesAmount;
        } else if (otherSourcesType === "gift" && month === 3) {
          currentValue += otherSourcesAmount;
        }
      }
    }
    
    return data;
  }, [currentSavings, monthlySavings, expectedReturnRate, monthsUntilPurchase, savingsFrequency, 
      includeOtherSources, otherSourcesAmount, otherSourcesType, targetDownPaymentPercent, 
      projectedPropertyValue, propertyAppreciationRate]);
  
  // Generate strategy comparison data
  const strategyComparisonData = useMemo(() => {
    const conservativeReturn = 6;
    const balancedReturn = 8;
    const aggressiveReturn = 10;
    
    // Calculate future values for each strategy
    const calculate = (rate: number) => {
      const years = monthsUntilPurchase / 12;
      let value = currentSavings * Math.pow(1 + (rate / 100), years);
      
      // Add periodic contributions
      const monthlyRate = rate / 100 / 12;
      const periods = savingsFrequency === "monthly" ? monthsUntilPurchase : 
                     savingsFrequency === "quarterly" ? Math.floor(monthsUntilPurchase / 3) : 
                     Math.floor(monthsUntilPurchase / 12);
      
      let periodicAmount = monthlySavings;
      if (savingsFrequency === "quarterly") periodicAmount *= 3;
      if (savingsFrequency === "annually") periodicAmount *= 12;
      
      const periodicRate = savingsFrequency === "monthly" ? monthlyRate : 
                          savingsFrequency === "quarterly" ? monthlyRate * 3 : 
                          monthlyRate * 12;
      
      if (periodicRate > 0 && periods > 0) {
        value += periodicAmount * ((Math.pow(1 + periodicRate, periods) - 1) / periodicRate);
      } else {
        value += periodicAmount * periods;
      }
      
      return Math.round(value);
    };
    
    return [
      {
        name: "Conservative",
        value: calculate(conservativeReturn),
        risk: "Low",
        return: conservativeReturn,
        allocation: "20% Equity / 60% Debt / 20% Liquid",
        selected: selectedStrategy === "conservative"
      },
      {
        name: "Balanced",
        value: calculate(balancedReturn),
        risk: "Medium",
        return: balancedReturn,
        allocation: "40% Equity / 40% Debt / 20% Liquid",
        selected: selectedStrategy === "balanced"
      },
      {
        name: "Aggressive",
        value: calculate(aggressiveReturn),
        risk: "High",
        return: aggressiveReturn,
        allocation: "60% Equity / 30% Debt / 10% Liquid",
        selected: selectedStrategy === "aggressive"
      }
    ];
  }, [currentSavings, monthlySavings, monthsUntilPurchase, savingsFrequency, selectedStrategy]);
  
  // Generate allocation chart data
  const allocationData = useMemo(() => {
    let allocation = { equity: 40, debt: 40, liquid: 20 }; // Default balanced
    
    if (selectedStrategy === "conservative") {
      allocation = { equity: 20, debt: 60, liquid: 20 };
    } else if (selectedStrategy === "aggressive") {
      allocation = { equity: 60, debt: 30, liquid: 10 };
    } else if (selectedStrategy === "custom") {
      allocation = investmentAllocation;
    }
    
    return [
      { name: "Equity", value: allocation.equity, color: "#4f46e5" },
      { name: "Debt", value: allocation.debt, color: "#14b8a6" },
      { name: "Liquid", value: allocation.liquid, color: "#2563eb" }
    ];
  }, [selectedStrategy, investmentAllocation]);
  
  // Suggested milestone checkpoints
  const milestones = useMemo(() => {
    const targetDate = new Date(desiredPurchaseDate);
    const totalMonths = monthsUntilPurchase;
    
    return [
      {
        name: "First Checkpoint",
        date: format(addMonths(new Date(), Math.round(totalMonths * 0.25)), "MMM yyyy"),
        targetSavings: Math.round(projectedDownPaymentAmount * 0.3),
        progress: 30
      },
      {
        name: "Halfway Point",
        date: format(addMonths(new Date(), Math.round(totalMonths * 0.5)), "MMM yyyy"),
        targetSavings: Math.round(projectedDownPaymentAmount * 0.6),
        progress: 60
      },
      {
        name: "Final Stretch",
        date: format(addMonths(new Date(), Math.round(totalMonths * 0.75)), "MMM yyyy"),
        targetSavings: Math.round(projectedDownPaymentAmount * 0.85),
        progress: 85
      }
    ];
  }, [desiredPurchaseDate, monthsUntilPurchase, projectedDownPaymentAmount]);
  
  // Update expected return rate based on selected strategy
  useEffect(() => {
    if (selectedStrategy === "conservative") {
      setExpectedReturnRate(6);
    } else if (selectedStrategy === "balanced") {
      setExpectedReturnRate(8);
    } else if (selectedStrategy === "aggressive") {
      setExpectedReturnRate(10);
    }
    // Don't change if custom
  }, [selectedStrategy]);
  
  // Calculate results when inputs change
  useEffect(() => {
    if (showResults) {
      // If we already had results showing, recalculate automatically
      calculateResults();
    }
  }, [propertyValue, targetDownPaymentPercent, currentSavings, monthlySavings, 
      expectedReturnRate, monthsUntilPurchase, savingsFrequency, includeOtherSources,
      otherSourcesAmount, otherSourcesType, propertyAppreciationRate]);
  
  // Function to handle calculation
  const calculateResults = () => {
    setShowResults(true);
    
    // Simple validation
    if (propertyValue <= 0 || targetDownPaymentPercent <= 0 || currentSavings < 0 || monthlySavings < 0) {
      toast({
        title: "Invalid Inputs",
        description: "Please check that you've entered valid positive values for all required fields.",
        variant: "destructive"
      });
      setShowResults(false);
      return;
    }
    
    if (monthsUntilPurchase <= 0) {
      toast({
        title: "Purchase Date Error",
        description: "Please select a future date for your property purchase.",
        variant: "destructive"
      });
      setShowResults(false);
      return;
    }
    
    // Calculate time to goal in years for investment recommendations
    const yearsToGoal = Math.ceil(monthsUntilPurchase / 12);
    setTimeToGoal(yearsToGoal);
    
    // Trigger UI updates with the calculated values
    if (isOnTrack) {
      toast({
        title: "Calculation Complete",
        description: "Good news! You're on track to reach your down payment goal.",
      });
    } else {
      toast({
        title: "Calculation Complete",
        description: `You need to save an additional ₹${Math.round(additionalSavingsNeeded).toLocaleString('en-IN')} monthly to reach your goal.`,
      });
    }
  };
  
  // Update budget with down payment savings
  const addToBudget = () => {
    updateExpense('Savings', 'Home Down Payment', monthlySavings);
    
    toast({
      title: "Added to Budget",
      description: `Monthly home down payment savings of ₹${monthlySavings.toLocaleString('en-IN')} added to your budget.`,
    });
  };
  
  // Save/load functionality removed
  
  // Create a financial goal for the down payment
  const createDownPaymentGoal = () => {
    // Create a goal object with pre-filled values
    const downPaymentGoal = {
      type: "Standard Goal",
      category: "Mid-Term",
      name: goalName,
      targetAmount: projectedDownPaymentAmount,
      currentSavings: currentSavings,
      targetDate: desiredPurchaseDate,
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
    
    // Add new down payment goal with unique ID
    const newGoal = {
      ...downPaymentGoal,
      id: `goal-${Date.now()}`,
      autoSave: false,
      savingsAmount: monthlySavings
    };
    
    // Update goals in localStorage
    localStorage.setItem("financialGoals", JSON.stringify([...currentGoals, newGoal]));
    
    // Show success notification
    toast({
      title: "Down Payment Goal Created",
      description: "Your home down payment goal has been created. Redirecting to Goal Settings page...",
    });
    
    // Close dialog
    setGoalDialogOpen(false);
    
    // Wait a moment, then redirect to Goal Settings page
    setTimeout(() => {
      window.location.href = "/goal-settings";
    }, 1500);
  };
  
  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Format percentage helper
  const formatPercent = (percent: number) => {
    return `${percent.toFixed(1)}%`;
  };
  
  // COLORS for charts
  const COLORS = ['#4f46e5', '#3b82f6', '#0ea5e9', '#06b6d4', '#14b8a6', '#10b981', '#84cc16', '#ef4444'];
  
  return (
    <CalculatorLayout
      title="Home Down Payment Calculator"
      description="Calculate how much to save for your home down payment, plan your savings strategy, and track your progress towards owning your dream home."
      keywords="home down payment, saving for house, property down payment, home buying, real estate, down payment calculator, house down payment"
      calculatorType="Savings"
      icon="home"
    >
      <div className="w-full">
        {/* Tabs for different sections */}
        <Tabs defaultValue="calculator" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full grid grid-cols-4 md:grid-cols-4">
            <TabsTrigger value="calculator" className="text-sm">
              Calculator
            </TabsTrigger>
            <TabsTrigger value="planning" className="text-sm">
              Planning
            </TabsTrigger>
            <TabsTrigger value="strategy" className="text-sm">
              Savings Strategy
            </TabsTrigger>
            <TabsTrigger value="tracking" className="text-sm">
              Progress Tracking
            </TabsTrigger>
          </TabsList>
          
          {/* Main Calculator Tab */}
          <TabsContent value="calculator" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Inputs */}
              <div className="bg-white rounded-lg border border-gray-200 px-5 pt-5 pb-5 shadow-sm" style={{ height: 'min-content' }}>
                <h2 className="text-lg font-semibold mb-4 text-blue-800 flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-blue-600" />
                  Down Payment Calculator
                </h2>
                
                <div className="space-y-2" style={{ overflow: 'hidden' }}>
                  {/* Property Details Section */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm">
                    <h3 className="text-base font-semibold mb-3 flex items-center text-blue-800">
                      <Home className="mr-2 h-5 w-5 text-blue-600" />
                      Property Details
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Property Value */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="property-value" className="text-gray-700 text-sm font-medium">
                            Property Value (₹)
                          </Label>
                          <span className="font-semibold">{formatCurrency(propertyValue)}</span>
                        </div>
                        <div className="flex">
                          <Input
                            id="property-value"
                            type="number"
                            min="500000"
                            max="100000000"
                            value={propertyValue}
                            onChange={(e) => setPropertyValue(Number(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 px-1">
                          <span>₹5 Lakhs</span>
                          <span>₹10 Crore</span>
                        </div>
                        <Slider
                          value={[propertyValue]}
                          min={500000}
                          max={100000000}
                          step={100000}
                          onValueChange={(value) => setPropertyValue(value[0])}
                        />
                      </div>
                      
                      {/* Target Down Payment Percentage */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Label htmlFor="down-payment-percent" className="text-gray-700 text-sm font-medium mr-2">
                              Down Payment %
                            </Label>
                            <CustomTooltip text="The percentage of property value you plan to pay upfront. Higher down payment means lower loan amount and EMI.">
                              <Info className="h-4 w-4 text-gray-400" />
                            </CustomTooltip>
                          </div>
                          <span className="font-semibold">{targetDownPaymentPercent}%</span>
                        </div>
                        <div className="flex">
                          <Input
                            id="down-payment-percent"
                            type="number"
                            min="10"
                            max="80"
                            value={targetDownPaymentPercent}
                            onChange={(e) => setTargetDownPaymentPercent(Number(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 px-1">
                          <span>10%</span>
                          <span>80%</span>
                        </div>
                        <Slider
                          value={[targetDownPaymentPercent]}
                          min={10}
                          max={80}
                          step={5}
                          onValueChange={(value) => setTargetDownPaymentPercent(value[0])}
                        />
                      </div>
                      
                      {/* Target Down Payment Amount */}
                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-700 text-sm">Target Down Payment Amount:</span>
                          <span className="font-semibold text-blue-700">{formatCurrency(targetDownPaymentAmount)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 text-sm">Remaining Loan Amount:</span>
                          <span className="font-semibold text-gray-700">{formatCurrency(remainingLoanAmount)}</span>
                        </div>
                      </div>
                      
                      {/* Purchase Date */}
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Label htmlFor="purchase-date" className="text-gray-700 text-sm font-medium mr-2">
                              Desired Purchase Date
                            </Label>
                            <CustomTooltip text="When do you plan to buy the property? This affects how long you have to save.">
                              <Info className="h-4 w-4 text-gray-400" />
                            </CustomTooltip>
                          </div>
                          <span className="text-xs text-gray-500">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {monthsUntilPurchase} months from now
                          </span>
                        </div>
                        <Input
                          id="purchase-date"
                          type="date"
                          value={desiredPurchaseDate}
                          onChange={(e) => setDesiredPurchaseDate(e.target.value)}
                          className="w-full"
                          min={format(addDays(new Date(), 1), "yyyy-MM-dd")}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Savings & Investment Details */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm">
                    <h3 className="text-base font-semibold mb-3 flex items-center text-blue-800">
                      <Wallet className="mr-2 h-5 w-5 text-blue-600" />
                      Current Savings & Investment Details
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Current Savings */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="current-savings" className="text-gray-700 text-sm font-medium">
                            Current Savings (₹)
                          </Label>
                          <span className="font-semibold">{formatCurrency(currentSavings)}</span>
                        </div>
                        <div className="flex">
                          <Input
                            id="current-savings"
                            type="number"
                            min="0"
                            max="100000000"
                            value={currentSavings}
                            onChange={(e) => setCurrentSavings(Number(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 px-1">
                          <span>₹0</span>
                          <span>₹1 Crore</span>
                        </div>
                        <Slider
                          value={[currentSavings]}
                          min={0}
                          max={10000000}
                          step={10000}
                          onValueChange={(value) => setCurrentSavings(value[0])}
                        />
                      </div>
                      
                      {/* Monthly Savings */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Label htmlFor="monthly-savings" className="text-gray-700 text-sm font-medium mr-2">
                              Monthly Savings (₹)
                            </Label>
                            <CustomTooltip text="How much you can save each month towards your down payment goal.">
                              <Info className="h-4 w-4 text-gray-400" />
                            </CustomTooltip>
                          </div>
                          <span className="font-semibold">{formatCurrency(monthlySavings)}</span>
                        </div>
                        <div className="flex">
                          <Input
                            id="monthly-savings"
                            type="number"
                            min="0"
                            max="1000000"
                            value={monthlySavings}
                            onChange={(e) => setMonthlySavings(Number(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 px-1">
                          <span>₹0</span>
                          <span>₹1 Lakh</span>
                        </div>
                        <Slider
                          value={[monthlySavings]}
                          min={0}
                          max={100000}
                          step={1000}
                          onValueChange={(value) => setMonthlySavings(value[0])}
                        />
                      </div>
                      
                      {/* Savings Frequency */}
                      <div className="space-y-2">
                        <Label htmlFor="savings-frequency" className="text-gray-700 text-sm font-medium">
                          Savings Frequency
                        </Label>
                        <Select
                          value={savingsFrequency}
                          onValueChange={setSavingsFrequency}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="annually">Annually</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="text-xs text-gray-500">
                          {savingsFrequency === "monthly" ? "Regular monthly deposits" :
                           savingsFrequency === "quarterly" ? `₹${(monthlySavings * 3).toLocaleString('en-IN')} every 3 months` :
                           `₹${(monthlySavings * 12).toLocaleString('en-IN')} once a year`}
                        </div>
                      </div>
                      
                      {/* Expected Return Rate */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Label htmlFor="return-rate" className="text-gray-700 text-sm font-medium mr-2">
                              Expected Return Rate (%)
                            </Label>
                            <CustomTooltip text="Estimated annual returns on your investments. Higher returns involve higher risk.">
                              <Info className="h-4 w-4 text-gray-400" />
                            </CustomTooltip>
                          </div>
                          <span className="font-semibold">{expectedReturnRate}%</span>
                        </div>
                        <div className="flex">
                          <Input
                            id="return-rate"
                            type="number"
                            min="2"
                            max="15"
                            value={expectedReturnRate}
                            onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 px-1">
                          <span>2%</span>
                          <span>15%</span>
                        </div>
                        <Slider
                          value={[expectedReturnRate]}
                          min={2}
                          max={15}
                          step={0.5}
                          onValueChange={(value) => setExpectedReturnRate(value[0])}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Factors Toggle Section */}
                  <Accordion type="single" collapsible className="border rounded-lg mb-0">
                    <AccordionItem value="additional-factors" className="border-0">
                      <AccordionTrigger className="px-4 py-2 text-sm font-medium hover:no-underline">
                        <div className="flex items-center text-blue-700">
                          <Settings className="h-4 w-4 mr-2" />
                          <span>Additional Financial Factors</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-2 pt-0">
                        <div className="space-y-4">
                          {/* Other Income Sources */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="include-other-sources"
                                checked={includeOtherSources}
                                onCheckedChange={(checked) => setIncludeOtherSources(checked as boolean)}
                              />
                              <Label htmlFor="include-other-sources" className="text-sm font-medium">
                                Include Other Income Sources
                              </Label>
                            </div>
                            
                            {includeOtherSources && (
                              <div className="pl-6 pt-2 space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="other-amount" className="text-sm text-gray-700">
                                    Amount (₹)
                                  </Label>
                                  <Input
                                    id="other-amount"
                                    type="number"
                                    min="0"
                                    value={otherSourcesAmount}
                                    onChange={(e) => setOtherSourcesAmount(Number(e.target.value))}
                                    className="w-full"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="other-type" className="text-sm text-gray-700">
                                    Type of Income
                                  </Label>
                                  <Select value={otherSourcesType} onValueChange={setOtherSourcesType}>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="bonus">Annual Bonus</SelectItem>
                                      <SelectItem value="inheritance">Expected Inheritance</SelectItem>
                                      <SelectItem value="gift">Financial Gift</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Property Appreciation Rate */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <Label htmlFor="appreciation-rate" className="text-gray-700 text-sm font-medium mr-2">
                                  Property Appreciation Rate (%)
                                </Label>
                                <CustomTooltip text="Estimated annual increase in property value. This affects your future down payment needs.">
                                  <Info className="h-4 w-4 text-gray-400" />
                                </CustomTooltip>
                              </div>
                              <span className="font-semibold">{propertyAppreciationRate}%</span>
                            </div>
                            <Input
                              id="appreciation-rate"
                              type="number"
                              min="0"
                              max="15"
                              value={propertyAppreciationRate}
                              onChange={(e) => setPropertyAppreciationRate(Number(e.target.value))}
                              className="w-full"
                            />
                            <Slider
                              value={[propertyAppreciationRate]}
                              min={0}
                              max={15}
                              step={0.5}
                              onValueChange={(value) => setPropertyAppreciationRate(value[0])}
                            />
                          </div>
                          
                          {/* Inflation Rate */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <Label htmlFor="inflation-rate" className="text-gray-700 text-sm font-medium mr-2">
                                  Inflation Rate (%)
                                </Label>
                                <CustomTooltip text="Estimated annual inflation rate affecting the purchasing power of your savings.">
                                  <Info className="h-4 w-4 text-gray-400" />
                                </CustomTooltip>
                              </div>
                              <span className="font-semibold">{inflationRate}%</span>
                            </div>
                            <Input
                              id="inflation-rate"
                              type="number"
                              min="2"
                              max="15"
                              value={inflationRate}
                              onChange={(e) => setInflationRate(Number(e.target.value))}
                              className="w-full"
                            />
                            <Slider
                              value={[inflationRate]}
                              min={2}
                              max={15}
                              step={0.5}
                              onValueChange={(value) => setInflationRate(value[0])}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  {/* Calculate Button */}
                  <div className="flex justify-center mt-6 mb-4">
                    <Button 
                      onClick={calculateResults}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
                      size="lg"
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      Calculate Down Payment Plan
                    </Button>
                  </div>
                  
                  {/* Loan & EMI Estimate */}
                  {showResults && (
                    <>
                      <Card className="mt-4">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base text-blue-800">Loan & EMI Estimate</CardTitle>
                          <CardDescription>
                            Based on your future loan amount of {formatCurrency(propertyValue - targetDownPaymentAmount)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-100">
                              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Landmark className="h-4 w-4 mr-2 text-blue-600" />
                                Loan Details
                              </h4>
                              <div className="space-y-1.5 mt-0.5">
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-600">Loan Amount:</span>
                                  <span className="text-xs font-medium">{formatCurrency(propertyValue - targetDownPaymentAmount)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-600">Interest Rate:</span>
                                  <span className="text-xs font-medium">8.5%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-600">Loan Term:</span>
                                  <span className="text-xs font-medium">20 years</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-600">LTV Ratio:</span>
                                  <span className="text-xs font-medium">{(100 - targetDownPaymentPercent)}%</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex-1 p-3 bg-blue-50 rounded-lg border border-blue-100">
                              <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                                <CircleDollarSign className="h-4 w-4 mr-2 text-blue-700" />
                                Monthly EMI Estimate
                              </h4>
                              <div className="text-center pb-1">
                                <div className="text-2xl font-bold text-blue-700">
                                  {formatCurrency(
                                    calculateEMI(
                                      propertyValue - targetDownPaymentAmount,
                                      8.5,
                                      20
                                    )
                                  )}
                                </div>
                                <div className="text-[10px] text-blue-600">per month</div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="text-blue-700">EMI to Income Ratio:</span>
                                  <span className="font-medium text-blue-800">
                                    {monthlyIncome > 0 ? 
                                      `${((calculateEMI(propertyValue - targetDownPaymentAmount, 8.5, 20) / monthlyIncome) * 100).toFixed(0)}%` : 
                                      "N/A"
                                    }
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-blue-700">Affordability Status:</span>
                                  <span className={`font-medium ${
                                    monthlyIncome > 0 && 
                                    (calculateEMI(propertyValue - targetDownPaymentAmount, 8.5, 20) / monthlyIncome) <= 0.5 
                                      ? 'text-green-600' 
                                      : 'text-amber-600'
                                  }`}>
                                    {monthlyIncome > 0 ? 
                                      (calculateEMI(propertyValue - targetDownPaymentAmount, 8.5, 20) / monthlyIncome) <= 0.4 
                                        ? "Comfortable" 
                                        : (calculateEMI(propertyValue - targetDownPaymentAmount, 8.5, 20) / monthlyIncome) <= 0.5 
                                          ? "Moderate" 
                                          : "Stretched"
                                      : "Set income in Budget Buddy"
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 text-xs text-gray-500">
                            <div className="flex items-start mb-1">
                              <Info className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                              <span>EMI calculations are based on a 20-year loan term at 8.5% interest rate. Actual rates may vary.</span>
                            </div>
                            <div className="flex items-start">
                              <Info className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                              <span>Financial experts recommend keeping your EMI to Income ratio below 40% for comfortable repayment.</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Smart Down Payment Planning Tips */}
                      <Card className="mt-4 border-blue-100">
                        <CardHeader className="pb-2 bg-blue-50 border-b border-blue-100">
                          <CardTitle className="text-base text-blue-800 flex items-center">
                            <BarChart4 className="h-4 w-4 mr-2 text-blue-600" />
                            Smart Down Payment Planning
                          </CardTitle>
                          <CardDescription>
                            Effective strategies to help you reach your down payment goal faster
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-4">
                            <div className="pb-4 border-b border-gray-100">
                              <h4 className="font-medium text-blue-800 mb-2">Planning Tips</h4>
                              <p className="text-sm text-gray-700 mb-2">
                                Consistent savings in a separate high-interest account can accelerate your down payment fund growth
                              </p>
                              <p className="text-sm text-gray-700 mb-2">
                                Tax advantages from specific savings accounts like ELSS funds can provide additional benefits
                              </p>
                              <p className="text-sm text-gray-700">
                                Consider inflation when setting your target - property prices may increase during your saving period
                              </p>
                            </div>
                            
                            <div className="pb-4 border-b border-gray-100">
                              <h4 className="font-medium text-blue-800 mb-2">Accelerate Your Down Payment</h4>
                              <p className="text-sm text-gray-700 mb-2">
                                Set up automatic transfers to your down payment fund
                              </p>
                              <p className="text-sm text-gray-700 mb-2">
                                Consider a side hustle dedicated solely to your down payment goal
                              </p>
                              <p className="text-sm text-gray-700 mb-2">
                                Track your progress monthly to stay motivated
                              </p>
                              <p className="text-sm text-gray-700">
                                Temporarily reduce discretionary expenses until you reach your goal
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-blue-800 mb-2">Smart Investment Options</h4>
                              <div className={`mb-3 p-2 rounded ${timeToGoal <= 3 ? 'bg-green-50 border border-green-100' : ''}`}>
                                <p className="text-sm font-medium text-gray-700 mb-1">Short-term goals (1-3 years)</p>
                                <p className="text-sm text-gray-600">High-yield savings accounts, fixed deposits, and liquid funds</p>
                                {timeToGoal <= 3 && (
                                  <div className="mt-2 flex items-start bg-green-100 p-2 rounded">
                                    <Info className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-green-700">
                                      Suitable for your {timeToGoal}-year goal. These options provide good liquidity and safety, ideal for preserving capital before your purchase.
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className={`mb-3 p-2 rounded ${timeToGoal > 3 && timeToGoal <= 5 ? 'bg-green-50 border border-green-100' : ''}`}>
                                <p className="text-sm font-medium text-gray-700 mb-1">Medium-term goals (3-5 years)</p>
                                <p className="text-sm text-gray-600">Debt mutual funds, corporate deposits, and balanced funds</p>
                                {timeToGoal > 3 && timeToGoal <= 5 && (
                                  <div className="mt-2 flex items-start bg-green-100 p-2 rounded">
                                    <Info className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-green-700">
                                      Well-suited for your {timeToGoal}-year timeframe. These options balance moderate growth with stability, potentially outperforming inflation.
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className={`p-2 rounded ${timeToGoal > 5 ? 'bg-green-50 border border-green-100' : ''}`}>
                                <p className="text-sm font-medium text-gray-700 mb-1">Long-term goals (5+ years)</p>
                                <p className="text-sm text-gray-600">Equity mutual funds, index funds, and PPF</p>
                                {timeToGoal > 5 && (
                                  <div className="mt-2 flex items-start bg-green-100 p-2 rounded">
                                    <Info className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-green-700">
                                      Appropriate for your {timeToGoal}-year horizon. These growth-oriented investments can provide higher returns over longer periods, helping you beat inflation.
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  
                  {/* Bottom padding is now part of the parent container */}
                </div>
              </div>
              
              {/* Right Column - Results */}
              {showResults ? (
                <div className="space-y-6">
                  {/* Summary Card */}
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-blue-50 pb-3">
                      <CardTitle className="text-lg text-blue-800">Down Payment Summary</CardTitle>
                      <CardDescription>
                        Based on your inputs and projected returns
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          {/* Target Column */}
                          <div className="flex-1 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                              <Target className="h-4 w-4 mr-2 text-blue-600" />
                              Your Target
                            </h4>
                            <div className="space-y-3">
                              <div>
                                <div className="text-xs text-gray-500">Future Property Value</div>
                                <div className="text-lg font-bold text-blue-800">{formatCurrency(projectedPropertyValue)}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500">Target Down Payment ({targetDownPaymentPercent}%)</div>
                                <div className="text-2xl font-bold text-blue-700">{formatCurrency(projectedDownPaymentAmount)}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500">Time Until Purchase</div>
                                <div className="text-base font-semibold">
                                  {monthsUntilPurchase < 12 ? 
                                    `${monthsUntilPurchase} month${monthsUntilPurchase === 1 ? '' : 's'}` : 
                                    `${Math.floor(monthsUntilPurchase / 12)} year${Math.floor(monthsUntilPurchase / 12) === 1 ? '' : 's'} ${monthsUntilPurchase % 12} month${monthsUntilPurchase % 12 === 1 ? '' : 's'}`
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Projection Column */}
                          <div className="flex-1 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                              <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                              Your Projection
                            </h4>
                            <div className="space-y-3">
                              <div>
                                <div className="text-xs text-gray-500">Current Savings</div>
                                <div className="text-lg font-semibold">{formatCurrency(currentSavings)}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500">Projected Future Savings</div>
                                <div className="text-2xl font-bold text-green-700">{formatCurrency(projectedSavings)}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500">Gap Analysis</div>
                                <div className={`text-base font-semibold ${isOnTrack ? 'text-green-600' : 'text-red-600'}`}>
                                  {isOnTrack ? 
                                    `Surplus: ${formatCurrency(Math.abs(savingsGap))}` : 
                                    `Shortfall: ${formatCurrency(Math.abs(savingsGap))}`
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="pt-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">Progress Towards Target</span>
                            <span className="font-medium">{Math.min(100, Math.round(savingsPercentageAchieved))}%</span>
                          </div>
                          <Progress 
                            value={Math.min(100, savingsPercentageAchieved)} 
                            className="h-2.5"
                          />
                          <div className="flex justify-between mt-2">
                            <div className={`text-sm ${isOnTrack ? 'text-green-600' : 'text-amber-600'} font-medium flex items-center`}>
                              {isOnTrack ? 
                                <><CheckCircle className="h-4 w-4 mr-1" /> On Track</> : 
                                <><AlertCircle className="h-4 w-4 mr-1" /> Action Needed</>
                              }
                            </div>
                            <div className="text-xs text-gray-500">
                              Projected: {formatCurrency(projectedSavings)} / {formatCurrency(projectedDownPaymentAmount)}
                            </div>
                          </div>
                        </div>
                        
                        {/* Recommendation and Actions */}
                        <div className={`p-4 rounded-lg ${isOnTrack ? 'bg-green-50 border border-green-100' : 'bg-amber-50 border border-amber-100'}`}>
                          <h4 className={`text-sm font-medium mb-2 ${isOnTrack ? 'text-green-800' : 'text-amber-800'}`}>
                            {isOnTrack ? "You're on track! 🎉" : "Recommendation"}
                          </h4>
                          <p className={`text-sm ${isOnTrack ? 'text-green-700' : 'text-amber-700'} mb-3`}>
                            {isOnTrack ? 
                              `Your current savings plan is sufficient to reach your down payment goal by ${format(new Date(desiredPurchaseDate), "MMMM yyyy")}. You'll have a projected surplus of ${formatCurrency(Math.abs(savingsGap))}.` : 
                              `To reach your down payment goal by ${format(new Date(desiredPurchaseDate), "MMMM yyyy")}, you'll need to increase your monthly savings by ${formatCurrency(additionalSavingsNeeded)}, for a total of ${formatCurrency(monthlySavings + additionalSavingsNeeded)} per month.`
                            }
                          </p>
                          
                          <div className="flex flex-col sm:flex-row gap-2">
                            {/* Set as Goal Button */}
                            <Button 
                              onClick={() => setGoalDialogOpen(true)}
                              className="text-sm bg-blue-600 hover:bg-blue-700 text-white flex-1"
                              size="sm"
                            >
                              <Target className="h-4 w-4 mr-1" />
                              Set as Goal
                            </Button>
                            
                            {/* Add to Budget Button */}
                            <Button 
                              onClick={addToBudget}
                              className="text-sm bg-green-600 hover:bg-green-700 text-white flex-1"
                              size="sm"
                            >
                              <PiggyBank className="h-4 w-4 mr-1" />
                              Add to Budget
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Investment Strategy Card - FROM MOCKUP */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-blue-800">Investment Strategy</CardTitle>
                      <CardDescription>
                        Choose an investment approach based on your risk tolerance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <RadioGroup 
                          name="investment-strategy-mockup"
                          value={selectedStrategy}
                          onValueChange={setSelectedStrategy}
                          className="space-y-3"
                        >
                          {/* Conservative Option */}
                          <div className={`flex items-start p-4 rounded-lg border ${selectedStrategy === 'conservative' ? 'border-blue-300 bg-blue-50' : 'border-gray-100'}`}>
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <RadioGroupItem id="strategy-conservative-mockup" value="conservative" className="mr-2" />
                                <Label 
                                  htmlFor="strategy-conservative-mockup" 
                                  className="font-medium text-gray-800"
                                >
                                  Conservative (6% return)
                                </Label>
                              </div>
                              <div className="ml-6">
                                <div className="text-sm text-gray-600 mb-1">20% Equity / 60% Debt / 20% Liquid</div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                                    Low Risk
                                  </span>
                                  <span className="text-sm font-semibold">₹15,46,258</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Balanced Option */}
                          <div className={`flex items-start p-4 rounded-lg border ${selectedStrategy === 'balanced' ? 'border-blue-300 bg-blue-50' : 'border-gray-100'}`}>
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <RadioGroupItem id="strategy-balanced-mockup" value="balanced" className="mr-2" />
                                <Label 
                                  htmlFor="strategy-balanced-mockup" 
                                  className="font-medium text-gray-800"
                                >
                                  Balanced (8% return)
                                </Label>
                              </div>
                              <div className="ml-6">
                                <div className="text-sm text-gray-600 mb-1">40% Equity / 40% Debt / 20% Liquid</div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                                    Medium Risk
                                  </span>
                                  <span className="text-sm font-semibold">₹16,07,673</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Aggressive Option */}
                          <div className={`flex items-start p-4 rounded-lg border ${selectedStrategy === 'aggressive' ? 'border-blue-300 bg-blue-50' : 'border-gray-100'}`}>
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <RadioGroupItem id="strategy-aggressive-mockup" value="aggressive" className="mr-2" />
                                <Label 
                                  htmlFor="strategy-aggressive-mockup" 
                                  className="font-medium text-gray-800"
                                >
                                  Aggressive (10% return)
                                </Label>
                              </div>
                              <div className="ml-6">
                                <div className="text-sm text-gray-600 mb-1">60% Equity / 30% Debt / 10% Liquid</div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                                    High Risk
                                  </span>
                                  <span className="text-sm font-semibold">₹16,71,355</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Custom Allocation Option */}
                          <div className={`flex items-start p-4 rounded-lg border ${selectedStrategy === 'custom' ? 'border-blue-300 bg-blue-50' : 'border-gray-100'}`}>
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <RadioGroupItem id="strategy-custom-mockup" value="custom" className="mr-2" />
                                <Label 
                                  htmlFor="strategy-custom-mockup" 
                                  className="font-medium text-gray-800"
                                >
                                  Custom Allocation
                                </Label>
                              </div>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Strategy Comparison Card - FROM MOCKUP */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-blue-800">Strategy Comparison</CardTitle>
                      <CardDescription>
                        Projected down payment savings with different strategies
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: "Conservative", value: 1546258 },
                              { name: "Balanced", value: 1607673 },
                              { name: "Aggressive", value: 1671355 }
                            ]}
                            margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis 
                              tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                              domain={['dataMin - 100000', 'dataMax + 200000']} 
                            />
                            <RTooltip 
                              formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`}
                              labelFormatter={(name) => `${name} Strategy`}
                            />
                            <Bar 
                              name="Projected Savings" 
                              dataKey="value" 
                              fill="#4f46e5" 
                              radius={[4, 4, 0, 0]}
                            />
                            {/* Reference line for target amount */}
                            <ReferenceLine 
                              y={1800000} 
                              stroke="#ef4444" 
                              strokeDasharray="3 3"
                              label={{ 
                                value: 'Target', 
                                position: 'right', 
                                fill: '#ef4444', 
                                fontSize: 12 
                              }} 
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Key Insights</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>
                              Balanced strategy provides moderate growth with manageable risk.
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Loan & EMI Estimate Card - Moved to left column */}
                  
                  {/* Savings Growth Chart */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-blue-800">Savings Growth Projection</CardTitle>
                      <CardDescription>
                        How your savings will grow over time to reach your down payment goal
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={savingsGrowthData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="month" 
                              tickFormatter={(month) => {
                                if (month === 0) return 'Now';
                                if (month === monthsUntilPurchase) return 'Goal';
                                if (monthsUntilPurchase > 36) {
                                  // For longer timeframes, show years
                                  if (month % 12 === 0) return `${month/12}yr`;
                                  return '';
                                }
                                // For shorter timeframes, show months
                                if (month % 3 === 0) return `${month}m`;
                                return '';
                              }}
                            />
                            <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                            <RTooltip 
                              formatter={(value, name) => [
                                `₹${Number(value).toLocaleString('en-IN')}`, 
                                name === 'value' ? 'Projected Savings' : 'Target Amount'
                              ]}
                              labelFormatter={(month) => {
                                if (month === 0) return 'Now';
                                if (month === monthsUntilPurchase) return 'Purchase Date';
                                
                                const date = new Date();
                                date.setMonth(date.getMonth() + month);
                                return format(date, "MMM yyyy");
                              }}
                            />
                            <Legend />
                            <Area 
                              type="monotone" 
                              dataKey="target" 
                              name="Target Amount" 
                              stroke="#ef4444" 
                              fill="rgba(239, 68, 68, 0.1)" 
                              activeDot={{ r: 6 }} 
                            />
                            <Area 
                              type="monotone" 
                              dataKey="value" 
                              name="Projected Savings" 
                              stroke="#3b82f6" 
                              fill="rgba(59, 130, 246, 0.2)" 
                              activeDot={{ r: 6 }} 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
                        {milestones.map((milestone, index) => (
                          <div key={index} className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                            <h4 className="text-sm font-medium text-blue-700 mb-1">{milestone.name}</h4>
                            <div className="flex justify-between mb-1 text-xs">
                              <span className="text-blue-600">{milestone.date}</span>
                              <span className="font-medium text-blue-800">{formatCurrency(milestone.targetSavings)}</span>
                            </div>
                            <Progress value={milestone.progress} className="h-1.5" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Welcome Instructions Card */}
                  <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Home className="h-8 w-8 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold text-blue-800 mb-2">Plan Your Home Down Payment</h2>
                        <p className="text-gray-600 mb-6">
                          Enter your property details, savings information, and goals to create a personalized down payment savings plan.
                        </p>
                        <div className="space-y-4">
                          <div className="flex items-start text-left">
                            <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                              <span className="text-blue-600 font-bold">1</span>
                            </div>
                            <div>
                              <h3 className="font-medium text-blue-700">Set your property target</h3>
                              <p className="text-sm text-gray-600">Enter your expected property value and down payment percentage.</p>
                            </div>
                          </div>
                          <div className="flex items-start text-left">
                            <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                              <span className="text-blue-600 font-bold">2</span>
                            </div>
                            <div>
                              <h3 className="font-medium text-blue-700">Add your current savings</h3>
                              <p className="text-sm text-gray-600">Input your current savings and monthly contribution amounts.</p>
                            </div>
                          </div>
                          <div className="flex items-start text-left">
                            <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                              <span className="text-blue-600 font-bold">3</span>
                            </div>
                            <div>
                              <h3 className="font-medium text-blue-700">Get your personalized plan</h3>
                              <p className="text-sm text-gray-600">View projected savings growth, gap analysis, and strategies to reach your goal.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Financial Tips Card - This is the new card in the circled area from the mockup */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-blue-800">Financial Tips for Down Payment</CardTitle>
                      <CardDescription>
                        Strategies to accelerate your home buying journey
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                          <div className="flex">
                            <div className="mr-3 mt-0.5">
                              <PiggyBank className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-800 mb-1">Create a Dedicated Savings Account</h4>
                              <p className="text-sm text-gray-600">Set up an account specifically for your down payment to avoid the temptation to use these funds for other expenses.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                          <div className="flex">
                            <div className="mr-3 mt-0.5">
                              <TrendingUp className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-800 mb-1">Automate Your Savings</h4>
                              <p className="text-sm text-gray-600">Set up automatic transfers to your down payment fund right after you receive your salary.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                          <div className="flex">
                            <div className="mr-3 mt-0.5">
                              <ChartPie className="h-5 w-5 text-purple-500" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-800 mb-1">Diversify Your Investments</h4>
                              <p className="text-sm text-gray-600">Consider a mix of investment vehicles based on your timeframe. Shorter horizons should have less volatile investments.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                          <div className="flex">
                            <div className="mr-3 mt-0.5">
                              <BadgePercent className="h-5 w-5 text-amber-500" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-800 mb-1">Consider Government Schemes</h4>
                              <p className="text-sm text-gray-600">Research first-time homebuyer programs and tax benefits available for home purchases in your area.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500 italic">
                          Remember: The larger your down payment, the smaller your loan amount and the less interest you'll pay over time.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Planning Tab */}
          <TabsContent value="planning" className="mt-6">
            <Card className="border-green-100">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <CardTitle className="text-lg font-semibold text-blue-800 flex items-center">
                  <BarChart4 className="h-5 w-5 mr-2 text-blue-600" />
                  Smart Down Payment Planning
                </CardTitle>
                <CardDescription>
                  Effective strategies to help you reach your down payment goal faster
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* Smart Down Payment Planning Card */}
                  <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                    <div className="flex items-start mb-4">
                      <div className="rounded-full bg-blue-100 p-2 mr-3">
                        <BarChart4 className="h-4 w-4 text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-blue-800">Smart Down Payment Planning</h4>
                    </div>
                    
                    <div className="space-y-4 ml-2">
                      <div className="flex items-start">
                        <div className="rounded-full bg-green-100 p-1 mr-3 mt-0.5">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Consistent savings</span> in a separate high-interest account can accelerate your down payment fund growth
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="rounded-full bg-green-100 p-1 mr-3 mt-0.5">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Tax advantages</span> from specific savings accounts like ELSS funds can provide additional benefits
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="rounded-full bg-amber-100 p-1 mr-3 mt-0.5">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Consider inflation</span> when setting your target - property prices may increase during your saving period
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* More Planning Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Saving Tips */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium flex items-center">
                          <Save className="h-4 w-4 mr-2 text-blue-600" />
                          Accelerate Your Down Payment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Set up automatic transfers to your down payment fund</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Consider a side hustle dedicated solely to your down payment goal</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Track your progress monthly to stay motivated</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Temporarily reduce discretionary expenses until you reach your goal</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    {/* Investment Options */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium flex items-center">
                          <IndianRupee className="h-4 w-4 mr-2 text-blue-600" />
                          Smart Investment Options
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 text-sm">
                          <div>
                            <h4 className="font-medium mb-1">Short-term goals (1-3 years)</h4>
                            <p className="text-gray-600">High-yield savings accounts, fixed deposits, and liquid funds</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Medium-term goals (3-5 years)</h4>
                            <p className="text-gray-600">Debt mutual funds, corporate deposits, and balanced funds</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Long-term goals (5+ years)</h4>
                            <p className="text-gray-600">Equity mutual funds, index funds, and PPF</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Savings Strategy Tab */}
          <TabsContent value="strategy" className="mt-6">
            <div className="space-y-6">
              {/* Top row - Strategy Comparison and Investment Strategy side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. Strategy Comparison Card - MOVED TO LEFT */}
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-blue-800">Strategy Comparison</CardTitle>
                    <CardDescription>
                      Projected down payment savings with different strategies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={strategyComparisonData}
                          margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis 
                            tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                            domain={['dataMin - 100000', 'dataMax + 200000']} 
                          />
                          <RTooltip 
                            formatter={(value) => formatCurrency(value as number)}
                            labelFormatter={(name) => `${name} Strategy`}
                          />
                          <Bar 
                            name="Projected Savings" 
                            dataKey="value" 
                            fill="#4f46e5" 
                            radius={[4, 4, 0, 0]}
                          >
                            {strategyComparisonData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.selected ? '#3b82f6' : '#60a5fa'} 
                              />
                            ))}
                          </Bar>
                          {/* Reference line for target amount */}
                          <ReferenceLine 
                            y={projectedDownPaymentAmount} 
                            stroke="#ef4444" 
                            strokeDasharray="3 3"
                            label={{ 
                              value: 'Target', 
                              position: 'right', 
                              fill: '#ef4444', 
                              fontSize: 12 
                            }} 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Key Insights</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            {selectedStrategy === "conservative" ? 
                              <span>Conservative strategy provides stability but may not reach your target.</span> :
                             selectedStrategy === "aggressive" ? 
                              <span>Aggressive strategy offers higher potential returns but with increased risk.</span> :
                             selectedStrategy === "custom" ?
                              <span>Your custom allocation balances risk and return based on your preferences.</span> :
                              <span>Balanced strategy provides moderate growth with manageable risk.</span>
                            }
                          </span>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            {monthsUntilPurchase < 24 ? 
                              "For short timeframes, consider higher allocation to liquid and debt instruments." :
                             monthsUntilPurchase < 60 ? 
                              "For medium timeframes, a balanced approach helps manage risk while building returns." :
                              "For longer timeframes, you could potentially benefit from higher equity allocation."
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* 2. Investment Strategy Card */}
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-blue-800">Investment Strategy</CardTitle>
                    <CardDescription>
                      Choose an investment approach based on your risk tolerance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <RadioGroup 
                        value={selectedStrategy}
                        onValueChange={setSelectedStrategy}
                        className="space-y-3"
                      >
                        {/* Conservative Option */}
                        <div 
                          className={`flex items-start p-4 rounded-lg border ${
                            selectedStrategy === 'conservative' ? 'border-blue-300 bg-blue-50' : 'border-gray-100'
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <RadioGroupItem id="strategy-conservative" value="conservative" className="mr-2" />
                              <Label 
                                htmlFor="strategy-conservative" 
                                className="font-medium text-gray-800"
                              >
                                Conservative (6% return)
                              </Label>
                            </div>
                            <div className="ml-6">
                              <div className="text-sm text-gray-600 mb-1">20% Equity / 60% Debt / 20% Liquid</div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                                  Low Risk
                                </span>
                                <span className="text-sm font-semibold">{formatCurrency(strategyComparisonData[0].value)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Balanced Option */}
                        <div 
                          className={`flex items-start p-4 rounded-lg border ${
                            selectedStrategy === 'balanced' ? 'border-blue-300 bg-blue-50' : 'border-gray-100'
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <RadioGroupItem id="strategy-balanced" value="balanced" className="mr-2" />
                              <Label 
                                htmlFor="strategy-balanced" 
                                className="font-medium text-gray-800"
                              >
                                Balanced (8% return)
                              </Label>
                            </div>
                            <div className="ml-6">
                              <div className="text-sm text-gray-600 mb-1">40% Equity / 40% Debt / 20% Liquid</div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                                  Medium Risk
                                </span>
                                <span className="text-sm font-semibold">{formatCurrency(strategyComparisonData[1].value)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Aggressive Option */}
                        <div 
                          className={`flex items-start p-4 rounded-lg border ${
                            selectedStrategy === 'aggressive' ? 'border-blue-300 bg-blue-50' : 'border-gray-100'
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <RadioGroupItem id="strategy-aggressive" value="aggressive" className="mr-2" />
                              <Label 
                                htmlFor="strategy-aggressive" 
                                className="font-medium text-gray-800"
                              >
                                Aggressive (10% return)
                              </Label>
                            </div>
                            <div className="ml-6">
                              <div className="text-sm text-gray-600 mb-1">60% Equity / 30% Debt / 10% Liquid</div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                                  High Risk
                                </span>
                                <span className="text-sm font-semibold">{formatCurrency(strategyComparisonData[2].value)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Custom Strategy Option */}
                        <div 
                          className={`flex items-start p-4 rounded-lg border ${
                            selectedStrategy === 'custom' ? 'border-blue-300 bg-blue-50' : 'border-gray-100'
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <RadioGroupItem id="strategy-custom" value="custom" className="mr-2" />
                              <Label 
                                htmlFor="strategy-custom" 
                                className="font-medium text-gray-800"
                              >
                                Custom Allocation
                              </Label>
                            </div>
                            
                            {selectedStrategy === 'custom' && (
                              <div className="ml-6 mt-3 space-y-4">
                                {/* Equity Allocation */}
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <Label className="text-sm text-gray-700">Equity Allocation: {investmentAllocation.equity}%</Label>
                                  </div>
                                  <Slider 
                                    value={[investmentAllocation.equity]}
                                    min={0}
                                    max={100}
                                    step={5}
                                    onValueChange={(value) => {
                                      const equity = value[0];
                                      const remaining = 100 - equity;
                                      // Distribute remaining between debt and liquid proportionally
                                      const currentSum = investmentAllocation.debt + investmentAllocation.liquid;
                                      const debt = currentSum > 0 ? Math.round((investmentAllocation.debt / currentSum) * remaining) : Math.round(remaining * 0.7);
                                      const liquid = remaining - debt;
                                      
                                      setInvestmentAllocation({
                                        equity,
                                        debt,
                                        liquid
                                      });
                                    }}
                                  />
                                </div>
                                
                                {/* Debt Allocation */}
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <Label className="text-sm text-gray-700">Debt Allocation: {investmentAllocation.debt}%</Label>
                                  </div>
                                  <Slider 
                                    value={[investmentAllocation.debt]}
                                    min={0}
                                    max={100 - investmentAllocation.equity}
                                    step={5}
                                    onValueChange={(value) => {
                                      const debt = value[0];
                                      setInvestmentAllocation({
                                        ...investmentAllocation,
                                        debt,
                                        liquid: 100 - investmentAllocation.equity - debt
                                      });
                                    }}
                                  />
                                </div>
                                
                                {/* Liquid Allocation */}
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <Label className="text-sm text-gray-700">Liquid Allocation: {investmentAllocation.liquid}%</Label>
                                  </div>
                                  <Slider 
                                    value={[investmentAllocation.liquid]}
                                    min={0}
                                    max={100 - investmentAllocation.equity - investmentAllocation.debt}
                                    step={5}
                                    onValueChange={(value) => {
                                      const liquid = value[0];
                                      setInvestmentAllocation({
                                        ...investmentAllocation,
                                        liquid,
                                        debt: 100 - investmentAllocation.equity - liquid
                                      });
                                    }}
                                  />
                                </div>
                                
                                {/* Custom Expected Return */}
                                <div className="space-y-2 pt-2 border-t border-gray-200">
                                  <Label className="text-sm text-gray-700">Expected Return Rate</Label>
                                  <div className="flex items-center">
                                    <Input
                                      type="number"
                                      min={2}
                                      max={15}
                                      value={expectedReturnRate}
                                      onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
                                      className="w-24"
                                    />
                                    <span className="ml-2 text-sm">%</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
                
              </div>
              
              {/* Second row - Additional charts and details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Asset Allocation Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-blue-800">Asset Allocation</CardTitle>
                    <CardDescription>
                      Suggested investment mix based on your selected strategy
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={allocationData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                            labelLine={true}
                          >
                            {allocationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Legend 
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            formatter={(value) => <span style={{ color: '#374151' }}>{value}</span>}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      <div className="flex items-start text-sm">
                        <div className="w-3 h-3 rounded-full bg-[#4f46e5] mt-1 mr-2"></div>
                        <div>
                          <span className="font-medium text-gray-700">Equity:</span> Higher risk, higher potential returns. 
                          Includes stocks, equity mutual funds, ETFs.
                        </div>
                      </div>
                      <div className="flex items-start text-sm">
                        <div className="w-3 h-3 rounded-full bg-[#14b8a6] mt-1 mr-2"></div>
                        <div>
                          <span className="font-medium text-gray-700">Debt:</span> Moderate risk, stable returns. 
                          Includes bonds, debt funds, FDs.
                        </div>
                      </div>
                      <div className="flex items-start text-sm">
                        <div className="w-3 h-3 rounded-full bg-[#2563eb] mt-1 mr-2"></div>
                        <div>
                          <span className="font-medium text-gray-700">Liquid:</span> Low risk, easy access. 
                          Includes savings accounts, liquid funds.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Investment Vehicles Card - Based on mockup */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-blue-800">Investment Vehicles</CardTitle>
                    <CardDescription>
                      Suggested financial products for your down payment savings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="equity">
                        <AccordionTrigger className="hover:no-underline py-3">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#4f46e5] mr-2"></div>
                            <span className="font-medium">Equity Investments</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-sm text-gray-700">
                          <div className="space-y-3">
                            <p>Suitable for longer time horizons (3+ years)</p>
                            <div className="space-y-2">
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Equity Mutual Funds</div>
                                <p className="text-xs text-gray-600">Professionally managed diversified stock investments</p>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Index Funds</div>
                                <p className="text-xs text-gray-600">Low-cost funds that track market indices like Nifty or Sensex</p>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Balanced/Hybrid Funds</div>
                                <p className="text-xs text-gray-600">Mix of stocks and bonds for moderate risk</p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="debt">
                        <AccordionTrigger className="hover:no-underline py-3">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#14b8a6] mr-2"></div>
                            <span className="font-medium">Debt Investments</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-sm text-gray-700">
                          <div className="space-y-3">
                            <p>Good for medium timeframes (1-3 years)</p>
                            <div className="space-y-2">
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Debt Mutual Funds</div>
                                <p className="text-xs text-gray-600">Different varieties based on duration and risk profile</p>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Fixed Deposits</div>
                                <p className="text-xs text-gray-600">Bank deposits with guaranteed returns</p>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Government Bonds</div>
                                <p className="text-xs text-gray-600">Low-risk bonds issued by the government</p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="liquid">
                        <AccordionTrigger className="hover:no-underline py-3">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#2563eb] mr-2"></div>
                            <span className="font-medium">Liquid Investments</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-sm text-gray-700">
                          <div className="space-y-3">
                            <p>Best for short timeframes or emergency funds</p>
                            <div className="space-y-2">
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Savings Accounts</div>
                                <p className="text-xs text-gray-600">Basic bank accounts with low interest but high liquidity</p>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Liquid Funds</div>
                                <p className="text-xs text-gray-600">Mutual funds investing in very short-term debt instruments</p>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Ultra Short-Term Debt Funds</div>
                                <p className="text-xs text-gray-600">Slightly higher returns than liquid funds with similar safety</p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                      <div className="flex items-start">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div className="text-amber-700">
                          <p className="font-medium mb-1">Important Disclaimer</p>
                          <p className="text-xs">
                            This information is provided for educational purposes only and does not constitute investment advice. 
                            All investments involve risk and may lose value. Consider consulting with a qualified financial advisor 
                            before making investment decisions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right Column - Recommendations */}
              <div className="space-y-6">
                {/* Strategy Comparison Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-blue-800">Strategy Comparison</CardTitle>
                    <CardDescription>
                      Projected down payment savings with different strategies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[280px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={strategyComparisonData}
                          margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                          <RTooltip 
                            formatter={(value) => formatCurrency(value as number)}
                            labelFormatter={(name) => `${name} Strategy`}
                          />
                          <Legend />
                          <Bar 
                            name="Projected Savings" 
                            dataKey="value" 
                            fill="#3b82f6" 
                            radius={[4, 4, 0, 0]}
                          >
                            {strategyComparisonData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.selected ? '#1d4ed8' : '#3b82f6'} 
                              />
                            ))}
                          </Bar>
                          {/* Reference line for target amount */}
                          <ReferenceLine 
                            y={projectedDownPaymentAmount} 
                            stroke="#ef4444" 
                            strokeDasharray="3 3"
                            label={{ 
                              value: 'Target', 
                              position: 'right', 
                              fill: '#ef4444', 
                              fontSize: 12 
                            }} 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Key Insights</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            {selectedStrategy === "conservative" ? 
                              <span>Conservative strategy provides stability but may not reach your target.</span> :
                             selectedStrategy === "aggressive" ? 
                              <span>Aggressive strategy offers higher potential returns but with increased risk.</span> :
                             selectedStrategy === "custom" ?
                              <span>Your custom allocation balances risk and return based on your preferences.</span> :
                              <span>Balanced strategy provides moderate growth with manageable risk.</span>
                            }
                          </span>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            {monthsUntilPurchase < 24 ? 
                              "For short timeframes, consider higher allocation to liquid and debt instruments." :
                             monthsUntilPurchase < 60 ? 
                              "For medium timeframes, a balanced approach helps manage risk while building returns." :
                              "For longer timeframes, you could potentially benefit from higher equity allocation."
                            }
                          </span>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            {isOnTrack ? 
                              "You're on track to reach your goal with your current strategy." :
                              "Consider increasing your monthly savings or adjusting your strategy to close the gap."
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Investment Recommendations */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-blue-800">Investment Vehicles</CardTitle>
                    <CardDescription>
                      Suggested financial products for your down payment savings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="equity">
                        <AccordionTrigger className="hover:no-underline py-3">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#4f46e5] mr-2"></div>
                            <span className="font-medium">Equity Investments</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-sm text-gray-700">
                          <div className="space-y-3">
                            <p>Suitable for longer time horizons (3+ years)</p>
                            <div className="space-y-2">
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Equity Mutual Funds</div>
                                <p className="text-xs text-gray-600">Professionally managed diversified stock investments</p>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Index Funds</div>
                                <p className="text-xs text-gray-600">Low-cost funds that track market indices like Nifty or Sensex</p>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Balanced/Hybrid Funds</div>
                                <p className="text-xs text-gray-600">Mix of stocks and bonds for moderate risk</p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="debt">
                        <AccordionTrigger className="hover:no-underline py-3">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#14b8a6] mr-2"></div>
                            <span className="font-medium">Debt Investments</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-sm text-gray-700">
                          <div className="space-y-3">
                            <p>Good for medium timeframes (1-3 years)</p>
                            <div className="space-y-2">
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Debt Mutual Funds</div>
                                <p className="text-xs text-gray-600">Different varieties based on duration and risk profile</p>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Fixed Deposits</div>
                                <p className="text-xs text-gray-600">Bank deposits with guaranteed returns</p>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Government Bonds</div>
                                <p className="text-xs text-gray-600">Low-risk bonds issued by the government</p>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Corporate Bonds</div>
                                <p className="text-xs text-gray-600">Higher yield but with more risk than government bonds</p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="liquid">
                        <AccordionTrigger className="hover:no-underline py-3">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#2563eb] mr-2"></div>
                            <span className="font-medium">Liquid Investments</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-sm text-gray-700">
                          <div className="space-y-3">
                            <p>Best for short timeframes or emergency funds</p>
                            <div className="space-y-2">
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Savings Accounts</div>
                                <p className="text-xs text-gray-600">Basic bank accounts with low interest but high liquidity</p>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Liquid Funds</div>
                                <p className="text-xs text-gray-600">Mutual funds investing in very short-term debt instruments</p>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Ultra Short-Term Debt Funds</div>
                                <p className="text-xs text-gray-600">Slightly higher returns than liquid funds with similar safety</p>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="font-medium">Money Market Funds</div>
                                <p className="text-xs text-gray-600">Funds investing in high-quality, short-term debt</p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-sm">
                      <div className="flex items-start">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div className="text-amber-700">
                          <p className="font-medium mb-1">Important Disclaimer</p>
                          <p className="text-xs">
                            This information is provided for educational purposes only and does not constitute investment advice. All investments involve risk and may lose value. 
                            Consider consulting with a qualified financial advisor before making investment decisions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Progress Tracking Tab */}
          <TabsContent value="tracking" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Plan and Milestones */}
              <div className="space-y-6">
                {/* Down Payment Plan Summary */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-blue-800">Down Payment Plan</CardTitle>
                    <CardDescription>
                      Your customized home down payment savings roadmap
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      {/* Current Status */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Current Status</h4>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div>
                            <div className="text-xs text-gray-500">Current Savings</div>
                            <div className="text-lg font-bold">{formatCurrency(currentSavings)}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Monthly Contribution</div>
                            <div className="text-lg font-bold">{formatCurrency(monthlySavings)}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Time Remaining</div>
                            <div className="text-lg font-bold">
                              {monthsUntilPurchase < 12 ? 
                                `${monthsUntilPurchase} month${monthsUntilPurchase === 1 ? '' : 's'}` : 
                                `${Math.floor(monthsUntilPurchase / 12)} year${Math.floor(monthsUntilPurchase / 12) === 1 ? '' : 's'} ${monthsUntilPurchase % 12} month${monthsUntilPurchase % 12 === 1 ? '' : 's'}`
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress to Goal */}
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 className="text-sm font-medium text-blue-700 mb-3">Progress to Goal</h4>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="p-3 bg-white rounded-lg">
                            <div className="text-xs text-gray-500">Target Down Payment</div>
                            <div className="text-lg font-bold">{formatCurrency(targetDownPaymentAmount)}</div>
                          </div>
                          <div className="p-3 bg-white rounded-lg">
                            <div className="text-xs text-gray-500">Current Savings</div>
                            <div className="text-lg font-bold">{formatCurrency(currentSavings)}</div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between mb-1 text-sm">
                            <span className="font-medium">Progress</span>
                            <span>{Math.min(100, Math.round((currentSavings / targetDownPaymentAmount) * 100) || 0).toFixed(1)}%</span>
                          </div>
                          <Progress value={Math.min(100, Math.round((currentSavings / targetDownPaymentAmount) * 100) || 0)} className="h-2" />
                        </div>
                      </div>
                      
                      {/* Target Breakdown */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-700">Target Breakdown</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                            <div className="text-xs text-blue-600 mb-1">Target Property Value</div>
                            <div className="text-lg font-bold text-blue-800">{formatCurrency(projectedPropertyValue)}</div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                            <div className="text-xs text-green-600 mb-1">Target Down Payment</div>
                            <div className="text-lg font-bold text-green-800">{formatCurrency(projectedDownPaymentAmount)}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Overall Progress</span>
                          <span className="font-medium">{Math.min(100, Math.round(savingsPercentageAchieved))}%</span>
                        </div>
                        <Progress 
                          value={Math.min(100, savingsPercentageAchieved)} 
                          className="h-2.5"
                        />
                        <div className="flex justify-between mt-2">
                          <div className={`text-sm ${isOnTrack ? 'text-green-600' : 'text-amber-600'} font-medium flex items-center`}>
                            {isOnTrack ? 
                              <><CheckCircle className="h-4 w-4 mr-1" /> On Track</> : 
                              <><AlertCircle className="h-4 w-4 mr-1" /> Action Needed</>
                            }
                          </div>
                          <div className="text-xs text-gray-500">
                            Projected: {formatCurrency(projectedSavings)} / {formatCurrency(projectedDownPaymentAmount)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Target Date Info */}
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 className="text-sm font-medium text-blue-700 mb-2">Target Purchase Date</h4>
                        <div className="flex items-center mb-2">
                          <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="text-lg font-bold text-blue-800">{format(new Date(desiredPurchaseDate), "MMMM d, yyyy")}</span>
                        </div>
                        
                        {!isOnTrack && (
                          <div className="mt-2 pt-2 border-t border-blue-200">
                            <h5 className="text-xs font-medium text-blue-700 mb-1">Suggested Adjustments</h5>
                            <div className="flex flex-col space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Increase monthly savings:</span>
                                <span className="font-medium">+ {formatCurrency(additionalSavingsNeeded)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Extend timeline by:</span>
                                <span className="font-medium">
                                  {Math.ceil(savingsGap / (monthlySavings * (1 + expectedReturnRate / 100 / 12)))} months
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Reduce target percentage:</span>
                                <span className="font-medium">
                                  {targetDownPaymentPercent > 15 ? `${targetDownPaymentPercent - 5}%` : "Not recommended"}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Milestone Tracker */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-blue-800">Milestone Tracker</CardTitle>
                    <CardDescription>
                      Key checkpoints on your journey to homeownership
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative pt-3">
                      {/* Connecting line */}
                      <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 ml-[7px]"></div>
                      
                      {/* Milestones */}
                      <div className="space-y-8 relative">
                        {/* Starting Point */}
                        <div className="flex">
                          <div className="flex-shrink-0 h-4 w-4 rounded-full bg-blue-600 mt-1.5 mr-4 z-10"></div>
                          <div>
                            <h5 className="text-sm font-medium mb-1">Starting Point</h5>
                            <div className="text-xs text-gray-600 mb-1">{format(new Date(), "MMMM yyyy")}</div>
                            <div className="bg-blue-50 rounded-lg p-2 text-xs text-blue-700">
                              <span className="font-medium">{formatCurrency(currentSavings)}</span> initial savings
                            </div>
                          </div>
                        </div>
                        
                        {/* Dynamic Milestones */}
                        {milestones.map((milestone, index) => (
                          <div className="flex" key={index}>
                            <div className="flex-shrink-0 h-4 w-4 rounded-full bg-gray-300 mt-1.5 mr-4 z-10"></div>
                            <div>
                              <h5 className="text-sm font-medium mb-1">{milestone.name}</h5>
                              <div className="text-xs text-gray-600 mb-1">{milestone.date}</div>
                              <div className="bg-gray-50 rounded-lg p-2 text-xs text-gray-700">
                                <div className="flex justify-between mb-1">
                                  <span>Target Savings:</span>
                                  <span className="font-medium">{formatCurrency(milestone.targetSavings)}</span>
                                </div>
                                <Progress value={milestone.progress} className="h-1.5 mb-1" />
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Final Target */}
                        <div className="flex">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 border-2 border-green-600 mt-1 mr-4 z-10"></div>
                          <div>
                            <h5 className="text-sm font-medium text-green-700 mb-1">Purchase Ready!</h5>
                            <div className="text-xs text-gray-600 mb-1">{format(new Date(desiredPurchaseDate), "MMMM yyyy")}</div>
                            <div className="bg-green-50 rounded-lg p-2 text-xs text-green-700">
                              <div className="flex justify-between">
                                <span>Goal Amount:</span>
                                <span className="font-medium">{formatCurrency(projectedDownPaymentAmount)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <Button 
                        onClick={() => setGoalDialogOpen(true)}
                        className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Set as Financial Goal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right Column - Tools */}
              <div className="space-y-6">
                {/* Save & Load functionality removed */}
                
                {/* Integration with Budget Tools */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-blue-800">Budget Integration</CardTitle>
                    <CardDescription>
                      Connect your down payment plan with Budget Buddy
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <div className="flex">
                        <div className="mr-3 mt-1">
                          <Activity className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-green-700 mb-1">Recommended Monthly Savings</h4>
                          <div className="text-xl font-bold text-green-800 mb-1">
                            {formatCurrency(monthlySavings)}
                          </div>
                          <p className="text-xs text-green-600">
                            {monthlyIncome > 0 ? 
                              `${((monthlySavings / monthlyIncome) * 100).toFixed(1)}% of your monthly income` : 
                              "Add income in Budget Buddy to see percentage"
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-3">
                      <Button 
                        onClick={addToBudget}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <IndianRupee className="h-4 w-4 mr-2" />
                        Add to Monthly Budget
                      </Button>
                      
                      <Button 
                        onClick={() => window.location.href = '/budget-buddy'}
                        variant="outline"
                        className="border-gray-200"
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Go to Budget Buddy
                      </Button>
                    </div>
                    
                    {monthlyIncome > 0 && (
                      <div className="pt-3 border-t border-gray-100">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Monthly Budget Analysis</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600">Income:</span>
                              <span className="font-medium">{formatCurrency(monthlyIncome)}</span>
                            </div>
                            <Progress 
                              value={100} 
                              className="h-1.5 bg-gray-100"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600">Total Expenses:</span>
                              <span className="font-medium">
                                {formatCurrency(Object.values(expenses).reduce((a, b) => a + b, 0))}
                              </span>
                            </div>
                            <Progress 
                              value={(Object.values(expenses).reduce((a, b) => a + b, 0) / monthlyIncome) * 100} 
                              className="h-1.5 bg-gray-100"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600">Home Down Payment Savings:</span>
                              <span className="font-medium">{formatCurrency(monthlySavings)}</span>
                            </div>
                            <Progress 
                              value={(monthlySavings / monthlyIncome) * 100} 
                              className="h-1.5 bg-gray-100"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Mortgage Loan Insights */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-blue-800">Mortgage Loan Insights</CardTitle>
                    <CardDescription>
                      How your down payment affects your loan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Down Payment Impact */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Down Payment Impact</h4>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                              data={[
                                { percent: 10, emi: remainingLoanAmount * 0.9 * 0.00733, interest: remainingLoanAmount * 0.9 * 0.00733 * 240 - remainingLoanAmount * 0.9 },
                                { percent: 15, emi: remainingLoanAmount * 0.85 * 0.00733, interest: remainingLoanAmount * 0.85 * 0.00733 * 240 - remainingLoanAmount * 0.85 },
                                { percent: 20, emi: remainingLoanAmount * 0.8 * 0.00733, interest: remainingLoanAmount * 0.8 * 0.00733 * 240 - remainingLoanAmount * 0.8 },
                                { percent: 25, emi: remainingLoanAmount * 0.75 * 0.00733, interest: remainingLoanAmount * 0.75 * 0.00733 * 240 - remainingLoanAmount * 0.75 },
                                { percent: 30, emi: remainingLoanAmount * 0.7 * 0.00733, interest: remainingLoanAmount * 0.7 * 0.00733 * 240 - remainingLoanAmount * 0.7 },
                              ]}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="percent" tickFormatter={(value) => `${value}%`} />
                              <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                              <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                              <RTooltip formatter={(value, name) => [
                                name === "emi" ? formatCurrency(value as number) : formatCurrency(value as number),
                                name === "emi" ? "Monthly EMI" : "Total Interest"
                              ]} />
                              <Legend />
                              <Bar 
                                yAxisId="left" 
                                dataKey="emi" 
                                name="Monthly EMI" 
                                fill="#3b82f6" 
                                radius={[4, 4, 0, 0]} 
                                barSize={20}
                              />
                              <Line 
                                yAxisId="right" 
                                type="monotone" 
                                dataKey="interest" 
                                name="Total Interest" 
                                stroke="#ef4444" 
                                strokeWidth={2} 
                                dot={{ r: 4 }} 
                              />
                              {/* Highlight current down payment % */}
                              <ReferenceLine 
                                x={targetDownPaymentPercent} 
                                stroke="#10b981" 
                                strokeWidth={2}
                                strokeDasharray="3 3"
                                label={{ 
                                  value: 'Current', 
                                  position: 'top', 
                                  fill: '#10b981', 
                                  fontSize: 12 
                                }} 
                              />
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      {/* Key Benefits */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-700">Key Benefits of a Higher Down Payment</h4>
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">
                              Lower EMI - reduces your monthly payment obligations
                            </span>
                          </div>
                          <div className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">
                              Reduced total interest paid over the loan term
                            </span>
                          </div>
                          <div className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">
                              Improved loan approval chances with better LTV ratio
                            </span>
                          </div>
                          <div className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">
                              Potentially lower interest rates from lenders
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-100">
                        <Button 
                          onClick={() => window.location.href = '/home-loan-calculator'}
                          className="w-full flex items-center justify-center"
                          variant="outline"
                        >
                          <Home className="h-4 w-4 mr-2" />
                          Go to Home Loan Calculator
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      
      {/* Goal Dialog */}
      <Dialog open={goalDialogOpen} onOpenChange={setGoalDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Down Payment Goal</DialogTitle>
            <DialogDescription>
              Add this down payment to your financial goals for tracking.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="goal-name" className="text-right">
                Goal Name
              </Label>
              <Input
                id="goal-name"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Amount</Label>
              <div className="col-span-3 font-medium">
                {formatCurrency(projectedDownPaymentAmount)}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Target Date</Label>
              <div className="col-span-3 font-medium">
                {format(new Date(desiredPurchaseDate), "MMMM d, yyyy")}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Monthly Savings</Label>
              <div className="col-span-3 font-medium">
                {formatCurrency(monthlySavings)}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGoalDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createDownPaymentGoal}>
              Create Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CalculatorLayout>
  );
}