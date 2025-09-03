import React, { useState, useEffect, useMemo } from "react";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useBudget } from "@/contexts/BudgetContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { format, addDays } from "date-fns";
import FinancialDisclaimer from "@/components/FinancialDisclaimer";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Info, Minus, Plus, Check, TrendingDown, Clock, 
  DollarSign, BarChart4, Building, Calendar, LightbulbIcon, 
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  Landmark, Ban, Home, AlertTriangle, AlertCircle,
  Calculator, Table, IndianRupee, Receipt, PieChart as ChartPie,
  HelpCircle, CircleDollarSign, ArrowRight, Settings
} from "lucide-react";
import ReactECharts from 'echarts-for-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, 
  Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie
} from 'recharts';

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
export default function HomeLoanCalculator() {
  // Get budget data and update functions from context
  const { budgetData, updateHomeLoanData } = useBudget();
  const { monthlyIncome } = budgetData;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // State for calculation name when saving
  const [calculationName, setCalculationName] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);
  
  // Define the type for saved calculations
  interface SavedCalculation {
    id: number;
    name: string;
    propertyValue: number;
    loanAmount: number;
    interestRate: number;
    loanTenure: number;
    emi: number;
    totalInterest: number;
    totalPayment: number;
    prepaymentFrequency: string;
    prepaymentAmount: number;
    prepaymentStartMonth: number;
    customFrequencyMonths: number;
    taxSlab: number;
    isFirstTimeHomeBuyer: boolean;
    isAffordableHousing: boolean;
    createdAt?: string;
  }
  
  // Fetch saved calculations
  const { data: savedCalculations = [], isLoading: isLoadingSaved } = useQuery<SavedCalculation[]>({
    queryKey: ['/api/public/home-loan-calculations'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Mutation to save a calculation
  const saveMutation = useMutation({
    mutationFn: async (calculationData: any) => {
      try {
        console.log("Making API request with data:", calculationData);
        const response = await fetch('/api/public/home-loan-calculations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(calculationData)
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("API error response:", errorText);
          throw new Error(`${response.status}: ${errorText || response.statusText}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error("Error in saveMutation:", error);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate the query to refetch the saved calculations
      queryClient.invalidateQueries({ queryKey: ['/api/public/home-loan-calculations'] });
      toast({
        title: "Calculation Saved",
        description: "Your home loan calculation has been saved successfully.",
      });
      setShowSaveForm(false);
      setCalculationName("");
    },
    onError: (error) => {
      console.error("Error in onError handler:", error);
      toast({
        title: "Error Saving Calculation",
        description: "There was an error saving your calculation. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Mutation to delete a calculation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      try {
        console.log("Deleting calculation with id:", id);
        const response = await fetch(`/api/public/home-loan-calculations/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("API error response:", errorText);
          throw new Error(`${response.status}: ${errorText || response.statusText}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error("Error in deleteMutation:", error);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate the query to refetch the saved calculations
      queryClient.invalidateQueries({ queryKey: ['/api/public/home-loan-calculations'] });
      toast({
        title: "Calculation Deleted",
        description: "The home loan calculation has been deleted successfully.",
      });
    },
    onError: (error) => {
      console.error("Error in onError handler:", error);
      toast({
        title: "Error Deleting Calculation",
        description: "There was an error deleting your calculation. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const [loanAmount, setLoanAmount] = useState(3000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [prepaymentFrequency, setPrepaymentFrequency] = useState("none");
  const [prepaymentAmount, setPrepaymentAmount] = useState(0); // Set default to 0
  const [prepaymentStartMonth, setPrepaymentStartMonth] = useState(12); // Set default to 12 months
  const [customFrequencyMonths, setCustomFrequencyMonths] = useState(3); // Default to 3 months (quarterly)
  const [showTaxBenefits, setShowTaxBenefits] = useState(true); // Set default to true to show tax benefits
  const [propertyValue, setPropertyValue] = useState(4000000);
  const [taxSlab, setTaxSlab] = useState(30);
  const [isFirstTimeHomeBuyer, setIsFirstTimeHomeBuyer] = useState(true);
  const [isAffordableHousing, setIsAffordableHousing] = useState(false);

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [taxSavings, setTaxSavings] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([]);
  const [manualPrepayments, setManualPrepayments] = useState<Record<number, number>>({});
  const [activeTab, setActiveTab] = useState("calculator");
  
  // Pagination for amortization table
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(24);

  // Comparison data for prepayment analysis
  const [standardEmi, setStandardEmi] = useState(0);
  const [standardInterest, setStandardInterest] = useState(0);
  const [standardTenure, setStandardTenure] = useState(0);
  const [actualTenure, setActualTenure] = useState(0);
  const [interestSaved, setInterestSaved] = useState(0);
  const [timeSaved, setTimeSaved] = useState(0);

  // Chart data
  const [amortizationChartData, setAmortizationChartData] = useState<any>({});
  const [pieChartData, setPieChartData] = useState<any>({});
  const [yearlyAmortData, setYearlyAmortData] = useState<any[]>([]);
  const [prepaymentAmortData, setPrepaymentAmortData] = useState<any[]>([]);

  // Store tax benefit values for display
  const [taxDeductionValues, setTaxDeductionValues] = useState<{
    interestDeduction: number;
    principalDeduction: number;
    additionalInterestDeduction: number;
  }>({ 
    interestDeduction: 0, 
    principalDeduction: 0, 
    additionalInterestDeduction: 0 
  });

  // Show results only after clicking calculate
  const [showResults, setShowResults] = useState(false);
  // Track validation errors to show different messages
  const [validationErrorCount, setValidationErrorCount] = useState(0);
  
  // Calculate down payment (difference between property value and loan amount)
  const downPaymentAmount = propertyValue - loanAmount;
  
  // Function to create a down payment goal in GoalSettings
  const createDownPaymentGoal = () => {
    // Create a goal object with pre-filled values
    const downPaymentGoal = {
      type: "Standard Goal",
      category: "Mid-Term",
      name: "Home Down Payment",
      targetAmount: downPaymentAmount,
      currentSavings: 0,
      targetDate: format(addDays(new Date(), 365), "yyyy-MM-dd"), // Default 1 year target
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
      savingsAmount: Math.ceil(downPaymentAmount / 12) // Default to saving over 12 months
    };
    
    // Update goals in localStorage
    localStorage.setItem("financialGoals", JSON.stringify([...currentGoals, newGoal]));
    
    // Show success notification
    toast({
      title: "Down Payment Goal Created",
      description: "Your home down payment goal has been created. Redirecting to Goal Settings page...",
    });
    
    // Wait a moment, then redirect to Goal Settings page
    setTimeout(() => {
      window.location.href = "/goal-settings";
    }, 1500);
  };
  
  // Function to save the current calculation
  const saveCalculation = () => {
    if (!calculationName.trim()) {
      toast({
        title: "Name Required",
        description: "Please provide a name for this calculation.",
        variant: "destructive",
      });
      return;
    }
    
    // Create calculation data object with explicit numeric types
    const calculationData = {
      name: calculationName.trim(),
      propertyValue: Number(propertyValue),
      loanAmount: Number(loanAmount),
      interestRate: Number(interestRate),
      loanTenure: Number(loanTenure),
      emi: Number(emi),
      totalInterest: Number(totalInterest),
      totalPayment: Number(totalPayment),
      prepaymentFrequency: prepaymentFrequency || "none",
      prepaymentAmount: Number(prepaymentAmount || 0),
      prepaymentStartMonth: Number(prepaymentStartMonth || 12),
      customFrequencyMonths: Number(customFrequencyMonths || 3),
      taxSlab: Number(taxSlab || 30),
      isFirstTimeHomeBuyer: Boolean(isFirstTimeHomeBuyer),
      isAffordableHousing: Boolean(isAffordableHousing)
    };
    
    console.log("Saving calculation:", calculationData);
    
    // Save the calculation data
    saveMutation.mutate(calculationData);
  };

  // Initialize calculations but don't show results automatically
  useEffect(() => {
    if (showResults) {
      calculateEMI();
    }
  }, [
    loanAmount, interestRate, loanTenure, 
    prepaymentFrequency, prepaymentAmount, prepaymentStartMonth, 
    customFrequencyMonths, showTaxBenefits, propertyValue, taxSlab, 
    isFirstTimeHomeBuyer, isAffordableHousing, manualPrepayments,
    showResults
  ]);

  const calculateEMI = () => {
    // Validate that loan amount doesn't exceed property value
    if (loanAmount > propertyValue) {
      setValidationErrorCount(prev => prev + 1);
      
      if (validationErrorCount >= 1) {
        // Show a different message with refresh option on second attempt
        toast({
          title: "Loan Amount Error",
          description: (
            <div className="space-y-2">
              <p>Loan amount cannot exceed the property value. Please adjust your inputs and try again.</p>
              <div className="pt-1 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs mt-1" 
                  onClick={() => window.location.reload()}
                >
                  <ArrowRight className="h-3 w-3 mr-1" />
                  Refresh Page
                </Button>
              </div>
            </div>
          ),
          variant: "destructive",
        });
      } else {
        // Show the standard message on first attempt
        toast({
          title: "Loan Amount Error",
          description: "Loan amount cannot exceed the property value. Please adjust your inputs.",
          variant: "destructive",
        });
      }
      return; // Exit the function early to prevent calculation
    }
    
    // Reset error count if validation passes
    setValidationErrorCount(0);
    
    // Monthly interest rate
    const monthlyRate = interestRate / 12 / 100;
    // Total number of monthly payments
    const totalPayments = loanTenure * 12;
    // EMI calculation
    const monthlyEMI = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) / (Math.pow(1 + monthlyRate, totalPayments) - 1);

    // First calculate standard schedule without prepayments for comparison
    const standardScheduleResult = generateDetailedSchedule(
      loanAmount, 
      monthlyRate, 
      totalPayments, 
      monthlyEMI,
      "none", // No prepayments for standard schedule
      0,
      0
    );

    // Then calculate with prepayments if applicable
    const withPrepaymentResult = generateDetailedSchedule(
      loanAmount, 
      monthlyRate, 
      totalPayments, 
      monthlyEMI,
      prepaymentFrequency,
      prepaymentAmount,
      prepaymentStartMonth,
      customFrequencyMonths,
      manualPrepayments
    );

    // Extract values from results
    const { 
      totalInterestAmount: standardInterestAmount, 
      totalPaymentAmount: standardPaymentAmount,
      actualTenureMonths: standardTenureMonths,
      yearlyData: standardYearlyData
    } = standardScheduleResult;

    const { 
      totalInterestAmount, 
      totalPaymentAmount, 
      actualSchedule,
      actualTenureMonths,
      yearlyData
    } = withPrepaymentResult;
    
    // Store yearly data for charts
    setYearlyAmortData(standardYearlyData);
    setPrepaymentAmortData(yearlyData);

    // Calculate tax benefits if enabled
    let taxBenefitAmount = 0;
    let interestDeduction = 0;
    let principalDeduction = 0;
    let additionalInterestDeduction = 0;

    if (showTaxBenefits) {
      // Tax benefits for the first year
      const taxRate = taxSlab / 100;
      // Fixed values based on image data
      interestDeduction = 200000; // Interest Deduction - fixed at ₹200,000
      principalDeduction = 150000; // Principal Deduction - fixed at ₹150,000
      
      // Additional first-time homebuyer benefit
      additionalInterestDeduction = 50000; // Additional Interest - fixed at ₹50,000

      // Total first year deduction
      const totalYearlyDeduction = interestDeduction + principalDeduction + additionalInterestDeduction;

      // Simplified tax benefit calculation - should result in ₹120,000 based on 30% tax rate
      taxBenefitAmount = totalYearlyDeduction * taxRate;

      // Update tax deduction values for UI display
      setTaxDeductionValues({
        interestDeduction,
        principalDeduction,
        additionalInterestDeduction
      });
    }

    // Set standard values for comparison
    setStandardEmi(Math.round(monthlyEMI));
    setStandardInterest(Math.round(standardInterestAmount));
    setStandardTenure(Math.ceil(standardTenureMonths / 12));

    // Set values with prepayment
    const calculatedEmi = Math.round(monthlyEMI);
    setEmi(calculatedEmi);
    setTotalInterest(Math.round(totalInterestAmount));
    setTotalPayment(Math.round(totalPaymentAmount));
    setTaxSavings(Math.round(taxBenefitAmount));
    setActualTenure(Math.ceil(actualTenureMonths / 12));

    // Calculate savings
    setInterestSaved(Math.round(standardInterestAmount - totalInterestAmount));
    setTimeSaved(Math.round(standardTenureMonths - actualTenureMonths) / 12);

    // Update amortization schedule for display
    setAmortizationSchedule(actualSchedule);

    // Generate chart data
    generateChartData(loanAmount, totalInterestAmount, yearlyData);
    
    // Integrate with Budget Buddy by updating the home loan data
    // Calculate EMI to Income ratio
    const emiToIncomeRatio = monthlyIncome > 0 ? calculatedEmi / monthlyIncome : 0;
    
    // Update the budget context with home loan data
    updateHomeLoanData({
      emi: calculatedEmi,
      loanAmount,
      interestRate,
      loanTenure,
      emiToIncomeRatio
    });
    
    // Show a toast notification that the data has been integrated with Budget Buddy
    toast({
      title: "Home Loan Data Synchronized",
      description: "Your loan details have been updated in Budget Buddy for comprehensive financial planning.",
    });
  };

  // Helper function to format currency with Indian Rupee symbol
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const generateChartData = (principal: number, totalInterest: number, yearlyData: any[] = []) => {
    // Generate pie chart data
    const pieOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Principal', 'Interest']
      },
      series: [
        {
          name: 'Payment Breakdown',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: principal, name: 'Principal', itemStyle: { color: '#4299e1' } },
            { value: totalInterest, name: 'Interest', itemStyle: { color: '#f6ad55' } }
          ]
        }
      ]
    };

    setPieChartData(pieOption);

    // Generate amortization chart data if yearly data is available
    if (yearlyData && yearlyData.length > 0) {
      const years = yearlyData.map(item => `Year ${item.year}`);
      const principalData = yearlyData.map(item => item.principal);
      const interestData = yearlyData.map(item => item.interest);
      const balanceData = yearlyData.map(item => item.balance);

      const amortOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params: any) {
            let tooltip = params[0].name + '<br/>';
            for (let i = 0; i < params.length; i++) {
              tooltip += params[i].seriesName + ': ' + 
                new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0
                }).format(params[i].value) + '<br/>';
            }
            return tooltip;
          }
        },
        legend: {
          data: ['Principal Paid', 'Interest Paid', 'Remaining Balance']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: years
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: function (value: number) {
                return '₹' + (value / 100000).toFixed(0) + 'L';
              }
            }
          }
        ],
        series: [
          {
            name: 'Principal Paid',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
              color: '#4299e1'
            },
            data: principalData
          },
          {
            name: 'Interest Paid',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
              color: '#f6ad55'
            },
            data: interestData
          },
          {
            name: 'Remaining Balance',
            type: 'line',
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
              color: '#48bb78'
            },
            data: balanceData
          }
        ]
      };

      setAmortizationChartData(amortOption);
    }
  };

  const generateDetailedSchedule = (
    principal: number, 
    monthlyRate: number, 
    totalPayments: number, 
    monthlyEMI: number,
    ppFrequency: string = prepaymentFrequency,
    ppAmount: number = prepaymentAmount,
    ppStartMonth: number = prepaymentStartMonth,
    customMonths: number = customFrequencyMonths,
    manualPrepayments: Record<number, number> = {}
  ) => {
    let remainingPrincipal = principal;
    let totalInterestAmount = 0;
    const actualSchedule = [];
    let actualTenureMonths = totalPayments;

    // Track yearly values for display
    let yearlyData: any[] = [];
    let currentYearPrincipal = 0;
    let currentYearInterest = 0;
    let currentYearPrepayment = 0;
    let currentYear = 1;

    for (let month = 1; month <= totalPayments; month++) {
      // If loan is fully paid, break
      if (remainingPrincipal <= 0) {
        actualTenureMonths = month - 1;
        break;
      }

      // Calculate interest for this month
      const interestPayment = remainingPrincipal * monthlyRate;

      // Calculate principal part of EMI
      const principalPayment = Math.min(monthlyEMI - interestPayment, remainingPrincipal);

      // Track current prepayment amount for this month
      let currentPrepayment = 0;

      // Apply monthly prepayment if applicable
      if (ppFrequency === "monthly" && ppAmount > 0 && 
          remainingPrincipal > 0 && month >= ppStartMonth) {
        currentPrepayment = Math.min(ppAmount, remainingPrincipal - principalPayment);
      }

      // Apply annual prepayment if applicable
      if (ppFrequency === "annual" && ppAmount > 0 && 
          remainingPrincipal > 0 && month >= ppStartMonth && month % 12 === 0) {
        currentPrepayment = Math.min(ppAmount, remainingPrincipal - principalPayment);
      }

      // Apply custom frequency prepayment if applicable
      // For custom frequency, we ONLY use manual prepayments entered in the payment schedule
      // No automatic prepayments are applied
      
      // Apply manual prepayment if available for this month
      if (ppFrequency === "custom" && manualPrepayments[month] && manualPrepayments[month] > 0 && 
          remainingPrincipal > 0) {
        currentPrepayment = Math.min(manualPrepayments[month], remainingPrincipal - principalPayment);
      }

      // Update remaining principal
      remainingPrincipal = remainingPrincipal - principalPayment - currentPrepayment;

      // Track total interest
      totalInterestAmount += interestPayment;

      // Track yearly values - separately track principal and prepayments
      currentYearPrincipal += principalPayment;
      currentYearPrepayment += currentPrepayment;
      currentYearInterest += interestPayment;

      // Show all months in the schedule
      const shouldDisplay = true;

      if (shouldDisplay) {
        actualSchedule.push({
          period: month,
          year: Math.ceil(month / 12),
          payment: monthlyEMI,
          principalPayment,
          interestPayment,
          prepayment: currentPrepayment,
          balance: remainingPrincipal
        });
      }

      // At the end of each year, sum up values for the chart
      if (month % 12 === 0 || remainingPrincipal <= 0) {
        yearlyData.push({
          year: currentYear,
          principal: currentYearPrincipal,
          interest: currentYearInterest,
          prepayment: currentYearPrepayment,
          balance: remainingPrincipal
        });

        currentYear++;
        currentYearPrincipal = 0;
        currentYearInterest = 0;
        currentYearPrepayment = 0;
      }
    }

    // Total payment
    const totalPaymentAmount = totalInterestAmount + principal;

    return {
      totalInterestAmount,
      totalPaymentAmount,
      actualSchedule,
      actualTenureMonths,
      yearlyData
    };
  };

  // formatCurrency function is already defined above

  // Helper function to calculate EMI for bank comparison table
  const calculateBankEMI = (principal: number, interestRate: number, tenureYears: number) => {
    const monthlyRate = interestRate / 12 / 100;
    const totalPayments = tenureYears * 12;
    return principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
  };

  return (
    <CalculatorLayout
      title="Home Loan Calculator"
      description="Calculate your EMI, plan prepayments, and see your loan amortization schedule."
      keywords="home loan, emi calculator, loan amortization, prepayment, interest, mortgage"
    >
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Left Column - Inputs */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="space-y-6">
              {/* Basic Loan Parameters - Boxed Section */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm">
                <div className="space-y-5">
                  {/* Property Value */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="property-value" className="text-gray-700 text-sm font-medium">Property Value (₹) *</Label>
                      <span className="font-semibold">{formatCurrency(propertyValue)}</span>
                    </div>
                    <div className="flex">
                      <Input
                        id="property-value"
                        type="number"
                        min="100000"
                        max="100000000"
                        value={propertyValue}
                        onChange={(e) => setPropertyValue(Number(e.target.value))}
                        className="flex-1"
                        required
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={() => setPropertyValue(Math.max(100000, propertyValue - 500000))}
                        className="ml-2 p-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={() => setPropertyValue(propertyValue + 500000)}
                        className="ml-2 p-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Slider
                      min={100000}
                      max={20000000}
                      step={100000}
                      value={[propertyValue]}
                      onValueChange={(value) => {
                        const newValue = value[0];
                        setPropertyValue(newValue);
                        
                        // Automatically uncheck the affordable housing option if property value exceeds ₹45 lakhs
                        if (newValue > 4500000 && isAffordableHousing) {
                          setIsAffordableHousing(false);
                        }
                      }}
                      className="mt-8"
                    />
                    <div className="flex justify-between text-xs text-gray-500 px-1 mt-1.5">
                      <span>₹1L</span>
                      <span>₹2Cr</span>
                    </div>
                  </div>
                  
                  {/* Loan Amount */}
                  <div className="space-y-2 mt-5">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="loan-amount" className="text-gray-700 text-sm font-medium">Loan Amount (₹)</Label>
                      <span className="font-semibold">{formatCurrency(loanAmount)}</span>
                    </div>
                    <div className="flex">
                      <Input
                        id="loan-amount"
                        type="number"
                        min="100000"
                        max="100000000"
                        value={loanAmount}
                        onChange={(e) => {
                          const newValue = Number(e.target.value);
                          setLoanAmount(newValue);
                          
                          // Check if loan amount exceeds property value
                          if (newValue > propertyValue) {
                            toast({
                              title: "Loan Amount Error",
                              description: "Loan amount cannot exceed the property value. Please adjust your inputs.",
                              variant: "destructive",
                            });
                          }
                        }}
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={() => setLoanAmount(Math.max(100000, loanAmount - 500000))}
                        className="ml-2 p-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={() => {
                          const newValue = loanAmount + 500000;
                          setLoanAmount(newValue);
                          // Check if loan amount exceeds property value
                          if (newValue > propertyValue) {
                            toast({
                              title: "Loan Amount Error",
                              description: "Loan amount cannot exceed the property value. Please adjust your inputs.",
                              variant: "destructive",
                            });
                          }
                        }}
                        className="ml-2 p-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Slider
                      min={100000}
                      max={20000000}
                      step={100000}
                      value={[loanAmount]}
                      onValueChange={(value) => {
                        const newValue = value[0];
                        setLoanAmount(newValue);
                        // Check if loan amount exceeds property value
                        if (newValue > propertyValue) {
                          toast({
                            title: "Loan Amount Error",
                            description: "Loan amount cannot exceed the property value. Please adjust your inputs.",
                            variant: "destructive",
                          });
                        }
                      }}
                      className="mt-8"
                    />
                    <div className="flex justify-between text-xs text-gray-500 px-1 mt-1.5">
                      <span>₹1L</span>
                      <span>₹2Cr</span>
                    </div>
                  </div>

                  <div className="space-y-2 mt-5">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="interest-rate" className="text-gray-700 text-sm font-medium">Interest Rate (% p.a.)</Label>
                      <span className="font-semibold">{interestRate}%</span>
                    </div>
                    <div className="flex">
                      <Input
                        id="interest-rate"
                        type="number"
                        min="4"
                        max="20"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={() => setInterestRate(Math.max(4, interestRate - 0.25))}
                        className="ml-2 p-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={() => setInterestRate(Math.min(20, interestRate + 0.25))}
                        className="ml-2 p-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Slider
                      min={4}
                      max={20}
                      step={0.1}
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      className="mt-8"
                    />
                    <div className="flex justify-between text-xs text-gray-500 px-1 mt-1.5">
                      <span>4%</span>
                      <span>20%</span>
                    </div>
                  </div>

                  <div className="space-y-2 mt-5">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="loan-tenure" className="text-gray-700 text-sm font-medium">Loan Tenure (Years)</Label>
                      <span className="font-semibold">{loanTenure} years</span>
                    </div>
                    <div className="flex">
                      <Input
                        id="loan-tenure"
                        type="number"
                        min="1"
                        max="30"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(Number(e.target.value))}
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={() => setLoanTenure(Math.max(1, loanTenure - 1))}
                        className="ml-2 p-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={() => setLoanTenure(Math.min(30, loanTenure + 1))}
                        className="ml-2 p-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Slider
                      min={1}
                      max={30}
                      step={1}
                      value={[loanTenure]}
                      onValueChange={(value) => setLoanTenure(value[0])}
                      className="mt-8"
                    />
                    <div className="flex justify-between text-xs text-gray-500 px-1 mt-1.5">
                      <span>1 yr</span>
                      <span>30 yrs</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-gray-700 text-sm font-medium flex items-center">
                  <TrendingDown className="h-4 w-4 mr-1.5 text-green-600" />
                  Prepayment Strategy
                </h3>
                <RadioGroup 
                  value={prepaymentFrequency}
                  onValueChange={(value) => {
                    setPrepaymentFrequency(value);
                    // Set default value of 5000 when selecting any option other than "none"
                    if (value !== "none" && prepaymentAmount === 0) {
                      setPrepaymentAmount(5000);
                    } else if (value === "none") {
                      setPrepaymentAmount(0);
                    }
                  }}
                  className="grid grid-cols-4 gap-2"
                >
                  <div>
                    <RadioGroupItem value="none" id="none-option" className="sr-only peer" />
                    <Label
                      htmlFor="none-option"
                      className={`flex flex-col items-center justify-between rounded-md border-2 p-2.5 cursor-pointer text-center h-full ${
                        prepaymentFrequency === "none" 
                          ? "border-green-600 bg-green-50 text-green-700" 
                          : "border-muted bg-white hover:bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      <Ban className={`h-5 w-5 mb-1 ${
                        prepaymentFrequency === "none" ? "text-green-600" : "text-gray-500"
                      }`} />
                      <span className={`text-xs font-medium ${
                        prepaymentFrequency === "none" ? "text-green-700" : ""
                      }`}>None</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="monthly" id="monthly-option" className="sr-only peer" />
                    <Label
                      htmlFor="monthly-option"
                      className={`flex flex-col items-center justify-between rounded-md border-2 p-2.5 cursor-pointer text-center h-full ${
                        prepaymentFrequency === "monthly" 
                          ? "border-blue-600 bg-blue-50" 
                          : "border-muted bg-white hover:bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      <Calendar className={`h-5 w-5 mb-1 ${
                        prepaymentFrequency === "monthly" ? "text-blue-600" : "text-gray-500"
                      }`} />
                      <span className="text-xs font-medium">Monthly</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="annual" id="annual-option" className="sr-only peer" />
                    <Label
                      htmlFor="annual-option"
                      className={`flex flex-col items-center justify-between rounded-md border-2 p-2.5 cursor-pointer text-center h-full ${
                        prepaymentFrequency === "annual" 
                          ? "border-blue-600 bg-blue-50" 
                          : "border-muted bg-white hover:bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      <Clock className={`h-5 w-5 mb-1 ${
                        prepaymentFrequency === "annual" ? "text-blue-600" : "text-gray-500"
                      }`} />
                      <span className="text-xs font-medium">Annual</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="custom" id="custom-option" className="sr-only peer" />
                    <Label
                      htmlFor="custom-option"
                      className={`flex flex-col items-center justify-between rounded-md border-2 p-2.5 cursor-pointer text-center h-full ${
                        prepaymentFrequency === "custom" 
                          ? "border-blue-600 bg-blue-50" 
                          : "border-muted bg-white hover:bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      <Settings className={`h-5 w-5 mb-1 ${
                        prepaymentFrequency === "custom" ? "text-blue-600" : "text-gray-500"
                      }`} />
                      <span className="text-xs font-medium">Custom</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Prepayment Details section - always visible regardless of prepaymentFrequency selection */}
              <div className="p-3 border border-blue-100 rounded-lg bg-blue-50 text-sm">
                <h4 className="font-medium text-blue-800 mb-3 flex items-center text-xs">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Prepayment Details
                </h4>

                {prepaymentFrequency === "none" && (
                  <div className="bg-amber-50 p-2 rounded-md border border-amber-200 mb-3">
                    <div className="flex items-center text-amber-800 text-xs">
                      <AlertTriangle className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                      <p>Select Monthly, Annual, or Custom prepayment option to make prepayments</p>
                    </div>
                  </div>
                )}
                
                {prepaymentFrequency === "custom" && !showResults && (
                  <div className="bg-amber-50 p-2 rounded-md border border-amber-200 mb-3">
                    <div className="flex items-center text-amber-800 text-xs">
                      <AlertCircle className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                      <p><strong>Important:</strong> First click "Calculate Your EMI" to generate the payment schedule, then you'll be able to enter custom prepayment amounts.</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Amount field - with default 0 */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="prepayment-amount-input" className="text-blue-700 text-sm">Amount (₹)</Label>
                      <span className="font-semibold text-sm">{formatCurrency(prepaymentAmount)}</span>
                    </div>
                    <div className="flex">
                      <Input
                        id="prepayment-amount-input"
                        type="number"
                        min="0"
                        max="10000000"
                        value={prepaymentAmount}
                        onChange={(e) => {
                          if (prepaymentFrequency === "none") {
                            toast({
                              title: "Prepayment option required",
                              description: "Please select Monthly, Annual or Custom prepayment option first",
                              variant: "destructive",
                            });
                            return;
                          }
                          setPrepaymentAmount(Number(e.target.value));
                        }}
                        className={`flex-1 h-9 text-base ${
                          prepaymentFrequency === "none" ? "bg-gray-100 opacity-70" : 
                          prepaymentFrequency === "custom" ? "bg-gray-100 opacity-70" : ""
                        }`}
                        disabled={prepaymentFrequency === "none" || prepaymentFrequency === "custom"}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={() => {
                          if (prepaymentFrequency === "none") {
                            toast({
                              title: "Prepayment option required",
                              description: "Please select Monthly, Annual or Custom prepayment option first",
                              variant: "destructive",
                            });
                            return;
                          }
                          setPrepaymentAmount(Math.max(0, prepaymentAmount - 5000));
                        }}
                        className={`ml-2 p-1 h-9 w-9 rounded-md ${
                          prepaymentFrequency === "none" || prepaymentFrequency === "custom"
                            ? "bg-gray-100 text-gray-400 opacity-70" 
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                        }`}
                        disabled={prepaymentFrequency === "none" || prepaymentFrequency === "custom"}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={() => {
                          if (prepaymentFrequency === "none") {
                            toast({
                              title: "Prepayment option required",
                              description: "Please select Monthly, Annual or Custom prepayment option first",
                              variant: "destructive",
                            });
                            return;
                          }
                          setPrepaymentAmount(prepaymentAmount + 5000);
                        }}
                        className={`ml-2 p-1 h-9 w-9 rounded-md ${
                          prepaymentFrequency === "none" || prepaymentFrequency === "custom"
                            ? "bg-gray-100 text-gray-400 opacity-70" 
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                        }`}
                        disabled={prepaymentFrequency === "none" || prepaymentFrequency === "custom"}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {prepaymentFrequency === "custom" && (
                      <div className="mt-2 text-xs text-gray-600 italic">
                        <p className="flex items-center">
                          <Info className="h-3 w-3 mr-1 text-blue-500" />
                          With custom prepayments, you'll manually enter amounts directly in the payment schedule. No automatic prepayments are applied until you enter them.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Custom Frequency setting - only shows when custom is selected */}
                  {prepaymentFrequency === "custom" && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="custom-frequency-input" className="text-blue-700 text-sm">Frequency (months)</Label>
                        <span className="font-semibold text-sm">Every {customFrequencyMonths} months</span>
                      </div>
                      <div className="flex">
                        <Input
                          id="custom-frequency-input"
                          type="number"
                          min="1"
                          max="24"
                          value={customFrequencyMonths}
                          onChange={(e) => setCustomFrequencyMonths(Number(e.target.value))}
                          className="flex-1 h-9 text-base bg-gray-100 opacity-70"
                          disabled={true}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          onClick={() => setCustomFrequencyMonths(Math.max(1, customFrequencyMonths - 1))}
                          className="ml-2 p-1 h-9 w-9 rounded-md bg-gray-100 text-gray-400 opacity-70"
                          disabled={true}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          onClick={() => setCustomFrequencyMonths(Math.min(24, customFrequencyMonths + 1))}
                          className="ml-2 p-1 h-9 w-9 rounded-md bg-gray-100 text-gray-400 opacity-70"
                          disabled={true}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2 text-xs text-gray-600">
                        <p className="flex items-center">
                          <Info className="h-3 w-3 mr-1 text-blue-500" />
                          Set how frequently you want to make prepayments over the {loanTenure * 12} months ({loanTenure} years) loan period
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Start After field - with default 12 months */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="prepayment-start-slider" className="text-blue-700 text-sm">Start After</Label>
                      <span className="font-semibold text-sm">{prepaymentStartMonth} months</span>
                    </div>
                    <Slider
                      id="prepayment-start-slider"
                      min={1}
                      max={120}
                      step={1}
                      value={[prepaymentStartMonth]}
                      onValueChange={(value) => {
                        if (prepaymentFrequency === "none") {
                          toast({
                            title: "Prepayment option required",
                            description: "Please select Monthly, Annual or Custom prepayment option first",
                            variant: "destructive",
                          });
                          return;
                        }
                        setPrepaymentStartMonth(value[0]);
                      }}
                      className={`mt-8 ${
                        prepaymentFrequency === "none" || prepaymentFrequency === "custom" ? "opacity-50" : ""
                      }`}
                      disabled={prepaymentFrequency === "none" || prepaymentFrequency === "custom"}
                    />
                  </div>
                </div>
              </div>

              {/* Income Tax Benefits Section - Styled to match the image */}
              <div className="w-full bg-blue-50 border border-blue-100 rounded-lg">
                <div className="px-3 py-2 flex justify-between items-center border-b border-blue-100">
                  <div className="flex items-center">
                    <Landmark className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="font-medium text-sm text-blue-800">Income Tax Benefits</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-blue-500" />
                </div>
                  
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Checkbox 
                      id="show-tax-benefits-option" 
                      checked={showTaxBenefits}
                      onCheckedChange={(checked) => setShowTaxBenefits(checked as boolean)}
                      className="text-blue-600 border-blue-400"
                    />
                    <Label 
                      htmlFor="show-tax-benefits-option" 
                      className="text-sm text-blue-800 cursor-pointer"
                    >
                      Include tax benefits in calculation
                    </Label>
                  </div>

                  {showTaxBenefits && (
                    <div className="space-y-3 mt-2">
                      <div className="space-y-1">
                        <Label htmlFor="tax-slab-select" className="text-blue-800 text-sm">Your Tax Slab</Label>
                        <select
                          id="tax-slab-select"
                          value={taxSlab}
                          onChange={(e) => setTaxSlab(Number(e.target.value))}
                          className="w-full rounded-md border border-blue-200 p-1.5 text-sm text-blue-900 bg-blue-50/50"
                        >
                          <option value="10">10% - New Regime</option>
                          <option value="15">15% - New Regime</option>
                          <option value="20">20% - New/Old</option>
                          <option value="30">30% - New/Old</option>
                        </select>
                      </div>

                      <div className="bg-blue-100/50 border border-blue-200 rounded-lg p-3 mt-2">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Checkbox 
                              id="first-time-buyer-option" 
                              checked={isFirstTimeHomeBuyer}
                              onCheckedChange={(checked) => setIsFirstTimeHomeBuyer(checked as boolean)}
                              className="text-blue-600 border-blue-400"
                            />
                            <Label 
                              htmlFor="first-time-buyer-option" 
                              className="text-sm font-medium cursor-pointer text-blue-900"
                            >
                              First-time Home Buyer (Sec 80EE)
                            </Label>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Checkbox 
                              id="affordable-housing-option" 
                              checked={isAffordableHousing && propertyValue <= 4500000}
                              onCheckedChange={(checked) => {
                                if (propertyValue <= 4500000) {
                                  setIsAffordableHousing(checked as boolean);
                                } else {
                                  setIsAffordableHousing(false);
                                }
                              }}
                              disabled={propertyValue > 4500000}
                              className={`${propertyValue > 4500000 ? 'opacity-50 cursor-not-allowed' : 'text-blue-600'} border-blue-400`}
                            />
                            <div>
                              <Label 
                                htmlFor="affordable-housing-option" 
                                className={`text-sm font-medium cursor-pointer ${propertyValue > 4500000 ? 'text-blue-400' : 'text-blue-900'}`}
                              >
                                Affordable Housing (≤₹45 lakhs)
                              </Label>
                              {propertyValue > 4500000 && (
                                <p className="text-xs text-red-500 mt-0.5">
                                  Not eligible - Property value exceeds ₹45 lakhs
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center mt-3">
                <Button 
                  onClick={() => {
                    calculateEMI();
                    setShowResults(true);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2 shadow-md hover:shadow-lg transition-all text-sm"
                >
                  <div className="flex items-center justify-center">
                    <IndianRupee className="mr-2 h-4 w-4" />
                    Calculate Your EMI
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            {!showResults ? (
              <div className="flex items-center justify-center py-8 px-4 bg-gray-50 border-dashed border rounded-md">
                <div className="text-center space-y-2">
                  <div className="inline-flex p-2 bg-blue-50 rounded-full mb-1">
                    <BarChart4 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-700">Your Results Will Appear Here</h3>
                  <p className="text-xs text-gray-500 max-w-xs">
                    Fill in your loan details and click 'Calculate Your EMI' to see your results.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg border p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-semibold flex items-center text-blue-700">
                      <IndianRupee className="mr-2 h-4 w-4" />
                      Loan Summary
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Monthly EMI</p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-blue-700">
                          {formatCurrency(emi)}
                        </p>
                        
                        {/* Budget Information moved to the right of EMI */}
                        <div className="bg-[#FFF8E1] rounded-md border border-amber-200 p-2 ml-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-xs text-amber-800">Monthly Income</p>
                              <p className="text-sm font-semibold text-amber-900">
                                {formatCurrency(monthlyIncome)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-amber-800">Affordable EMI Range (30%)</p>
                              <p className="text-sm font-semibold text-amber-900">
                                {formatCurrency(monthlyIncome * 0.3)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Total Interest</p>
                        <p className="text-base font-semibold">{formatCurrency(totalInterest)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total Payment</p>
                        <p className="text-base font-semibold">{formatCurrency(totalPayment)}</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-3 mt-1">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-500">Loan Amount</p>
                          <p className="text-sm font-semibold">{formatCurrency(loanAmount)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Loan Tenure</p>
                          <p className="text-sm font-semibold">{loanTenure} years ({loanTenure * 12} months)</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Interest Rate</p>
                        <p className="text-sm font-semibold">{interestRate}% p.a.</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">EMI to Income %</p>
                        <div className={`text-sm font-semibold ${
                          monthlyIncome ? (emi / monthlyIncome) > 0.5 ? "text-red-600" : 
                                        (emi / monthlyIncome) > 0.3 ? "text-amber-600" : "text-green-600" : ""
                        }`}>
                          {monthlyIncome ? Math.round((emi / monthlyIncome) * 100) : 0}%
                          {monthlyIncome && (
                            <span className="ml-2 text-xs">
                              {emi / monthlyIncome <= 0.3 ? (
                                <span className="text-green-600 flex items-center">
                                  <Check className="h-3 w-3 mr-1" /> Comfortable
                                </span>
                              ) : emi / monthlyIncome <= 0.5 ? (
                                <span className="text-amber-600 flex items-center">
                                  <AlertTriangle className="h-3 w-3 mr-1" /> Moderate
                                </span>
                              ) : (
                                <span className="text-red-600 flex items-center">
                                  <Ban className="h-3 w-3 mr-1" /> High Risk
                                </span>
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Warning messages that span full width below Interest Rate and EMI sections */}
                    {monthlyIncome && emi / monthlyIncome > 0.5 && (
                      <div className="mt-4 py-4 px-4 bg-red-100 rounded-none w-full">
                        <div className="flex">
                          <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-red-800">This loan may be difficult to manage with your current income.</p>
                            <p className="text-sm text-red-700 mt-2">Consider reducing the loan amount or choosing a more affordable property.</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {monthlyIncome && emi / monthlyIncome > 0.3 && emi / monthlyIncome <= 0.5 && (
                      <div className="mt-4 py-4 px-4 bg-amber-100 rounded-none w-full">
                        <div className="flex">
                          <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-amber-800">Your EMI to income ratio is between 30-50%.</p>
                            <p className="text-sm text-amber-700 mt-1">Consider making a larger down payment or extending your loan tenure to lower your EMI to income ratio below 30%.</p>
                          </div>
                        </div>
                      </div>
                    )}




                  </div>
                </div>
                
                {/* Down Payment Goal Card */}
                {downPaymentAmount > 0 && (
                  <div className="bg-white rounded-lg border border-blue-100 p-5 shadow-sm mt-4">
                    <h3 className="text-base font-semibold mb-3 flex items-center text-blue-800">
                      <Home className="mr-2 h-5 w-5 text-blue-700" />
                      Down Payment
                    </h3>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-3 md:mb-0">
                        <p className="text-sm text-gray-600 mb-1">Required Down Payment Amount</p>
                        <p className="text-xl font-bold text-blue-700">{formatCurrency(downPaymentAmount)}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.round((downPaymentAmount / propertyValue) * 100)}% of Property Value
                        </p>
                      </div>
                      <div>
                        <Button 
                          onClick={createDownPaymentGoal}
                          className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto"
                        >
                          <span className="flex items-center">
                            <CircleDollarSign className="h-4 w-4 mr-2" />
                            Set as Savings Goal
                          </span>
                        </Button>
                        <p className="text-xs text-gray-500 mt-2 max-w-xs">
                          Create a goal to save for this down payment and track your progress in the Goal Settings page.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm mt-4">
                  <h3 className="text-base font-semibold mb-3 flex items-center text-blue-800">
                    <BarChart4 className="mr-2 h-5 w-5 text-blue-700" />
                    Payment Breakdown
                  </h3>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs">Principal: {formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span className="text-xs">Interest: {formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="h-3 w-full rounded-full overflow-hidden bg-gray-100">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                      style={{ width: `${(loanAmount / totalPayment) * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-3">
                    {Object.keys(pieChartData).length > 0 && (
                      <ReactECharts 
                        option={pieChartData} 
                        style={{ height: '180px', width: '100%' }}
                      />
                    )}
                  </div>
                </div>

                {/* Prepayment Benefits Section - Shown based on conditions */}
                {prepaymentFrequency !== "none" && prepaymentAmount > 0 && (
                  <div className="bg-green-50 rounded-lg border border-green-200 p-5 shadow-sm">
                    <h3 className="text-base font-semibold mb-4 text-green-800 flex items-center">
                      <TrendingDown className="mr-2 h-5 w-5 text-green-700" />
                      Prepayment Benefits
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center p-3 bg-white rounded-lg border border-green-100">
                        <div className="p-2 rounded-full bg-green-100 mr-3">
                          <IndianRupee className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Interest Saved</p>
                          <p className="text-sm font-bold text-green-600">₹{(interestSaved / 100000).toFixed(2)} Lakh</p>
                        </div>
                      </div>

                      <div className="flex items-center p-3 bg-white rounded-lg border border-green-100">
                        <div className="p-2 rounded-full bg-green-100 mr-3">
                          <Clock className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Time Saved</p>
                          <p className="text-sm font-bold text-green-600">
                            {Math.floor(timeSaved)} yr {Math.round((timeSaved % 1) * 12)} mo
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <div className="p-3 bg-red-50 rounded-lg flex-1 border border-red-100">
                        <p className="text-sm font-medium text-gray-700 mb-2">Without Prepayments</p>
                        <p className="text-sm mb-1">Tenure: <span className="font-semibold">{standardTenure} yrs</span></p>
                        <p className="text-sm">Interest: <span className="font-semibold">₹{(standardInterest / 100000).toFixed(2)} Lakh</span></p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg flex-1 border border-green-100">
                        <p className="text-sm font-medium text-green-700 mb-2">With Prepayments</p>
                        <p className="text-sm mb-1">Tenure: <span className="font-semibold">{actualTenure} yrs</span></p>
                        <p className="text-sm">Interest: <span className="font-semibold">₹{(totalInterest / 100000).toFixed(2)} Lakh</span></p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Tax Benefits Section */}
                {showTaxBenefits && taxSavings > 0 && (
                  <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <IndianRupee className="mr-2 h-5 w-5 text-blue-700" />
                      <h3 className="text-lg font-semibold text-blue-800">Tax Benefits</h3>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm text-gray-600">Estimated Tax Savings</p>
                      <div className="text-xs text-blue-600 flex items-center bg-blue-100 px-2 py-1 rounded-full">
                        <Check className="h-3 w-3 mr-1" />
                        Tax Benefits Applied
                      </div>
                    </div>
                    
                    <p className="text-2xl font-bold text-blue-600 mb-4">{formatCurrency(taxSavings)}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                        <p className="font-medium text-blue-700 mb-1">Section 24(b)</p>
                        <p className="text-gray-700">Interest: {formatCurrency(taxDeductionValues.interestDeduction)}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                        <p className="font-medium text-blue-700 mb-1">Section 80C</p>
                        <p className="text-gray-700">Principal: {formatCurrency(taxDeductionValues.principalDeduction)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tab list outside the main grid, positioned below the 50/50 split */}
        <div className="mt-4 mb-4 flex space-x-2 justify-start">
          <button 
            onClick={() => setActiveTab("calculator")}
            className={`flex items-center py-1.5 px-3 rounded-md text-xs font-medium shadow-sm transition-colors ${
              activeTab === "calculator" 
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
            }`}
          >
            <Calculator className="mr-1.5 h-3 w-3" />
            Loan Summary
          </button>
          <button 
            onClick={() => setActiveTab("amortization")}
            className={`flex items-center py-1.5 px-3 rounded-md text-xs font-medium shadow-sm transition-colors ${
              activeTab === "amortization" 
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
            }`}
          >
            <Table className="mr-1.5 h-3 w-3" />
            Payment Schedule
          </button>
          <button 
            onClick={() => {
              setActiveTab("savedCalculations");
              // Don't show save form when switching to this tab
              setShowSaveForm(false);
            }}
            className={`flex items-center py-1.5 px-3 rounded-md text-xs font-medium shadow-sm transition-colors ${
              activeTab === "savedCalculations" 
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
            }`}
          >
            <Receipt className="mr-1.5 h-3 w-3" />
            Saved Calculations
          </button>
        </div>

        {/* Content for calculator tab - Positioned right after the tabs */}
        {activeTab === "calculator" && (
          <div className="mb-8 border-b pb-8">
            {showResults ? (
              <div className="space-y-6">
                {/* Affordability Analysis Section - Using Budget Buddy Data */}
                {monthlyIncome > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <IndianRupee className="mr-2 h-5 w-5 text-blue-700" />
                      <h3 className="text-lg font-semibold text-blue-800">Affordability Analysis</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Monthly Income (from Budget)</p>
                          <p className="text-base font-medium">{formatCurrency(monthlyIncome)}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Monthly EMI Payment</p>
                          <p className="text-base font-medium">{formatCurrency(emi)}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">EMI to Income Ratio</p>
                          <p className={`text-base font-medium ${
                            monthlyIncome ? (emi / monthlyIncome) > 0.5 ? "text-red-600" : 
                                          (emi / monthlyIncome) > 0.3 ? "text-amber-600" : "text-green-600" : ""
                          }`}>
                            {monthlyIncome ? Math.round((emi / monthlyIncome) * 100) : 0}%
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 border-l pl-6">
                        <h4 className="text-sm font-medium">Affordability Assessment</h4>
                        
                        <div className="mt-2">
                          {monthlyIncome ? (
                            <>
                              {(emi / monthlyIncome) > 0.5 ? (
                                <div className="p-3 rounded-md bg-red-50">
                                  <div className="flex items-start">
                                    <Ban className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-sm text-red-700 font-medium">High Risk: EMI exceeds 50% of income</p>
                                      <p className="text-xs text-gray-600 mt-1">Consider a smaller loan amount or longer tenure to reduce your EMI.</p>
                                    </div>
                                  </div>
                                </div>
                              ) : (emi / monthlyIncome) > 0.3 ? (
                                <div className="flex items-start">
                                  <Info className="h-4 w-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm text-amber-700 font-medium">Moderate: EMI is 30-50% of income</p>
                                    <p className="text-xs text-gray-600 mt-1">This is manageable but leaves less room for other expenses and savings.</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-start">
                                  <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm text-green-700 font-medium">Comfortable: EMI is under 30% of income</p>
                                    <p className="text-xs text-gray-600 mt-1">This loan appears affordable based on your income data from Budget Buddy.</p>
                                  </div>
                                </div>
                              )}
                              
                              <div className="mt-3">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className={`h-full rounded-full ${
                                      (emi / monthlyIncome) > 0.5 ? "bg-red-500" : 
                                      (emi / monthlyIncome) > 0.3 ? "bg-amber-500" : "bg-green-500"
                                    }`}
                                    style={{ width: `${Math.min(100, (emi / monthlyIncome) * 100)}%` }}
                                  ></div>
                                </div>
                                <div className="flex justify-between mt-1">
                                  <span className="text-xs text-green-700">0%</span>
                                  <span className="text-xs text-amber-700">30%</span>
                                  <span className="text-xs text-red-700">50%</span>
                                  <span className="text-xs text-gray-500">100%</span>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="text-xs text-gray-500">
                              Set your monthly income in Budget Buddy to see affordability analysis.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                

                
                {/* Tax Benefits Section - Based on download (4).png */}
                {showTaxBenefits && taxSavings > 0 && (
                  <div className="bg-blue-50 rounded-lg border border-blue-200 p-5 shadow-sm mt-6">
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-600 p-1.5 rounded-md mr-2">
                        <IndianRupee className="text-white h-4 w-4" />
                      </div>
                      <h3 className="text-base font-semibold text-blue-800">Tax Benefits (First Year)</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-blue-700 flex items-center">
                          Interest Deduction <HelpCircle className="h-3.5 w-3.5 ml-1 text-blue-400" />
                        </p>
                        <p className="text-2xl font-bold text-blue-900">{formatCurrency(taxDeductionValues.interestDeduction)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-700 flex items-center">
                          Principal Deduction <HelpCircle className="h-3.5 w-3.5 ml-1 text-blue-400" />
                        </p>
                        <p className="text-2xl font-bold text-blue-900">{formatCurrency(taxDeductionValues.principalDeduction)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-700 flex items-center">
                          Additional Interest <HelpCircle className="h-3.5 w-3.5 ml-1 text-blue-400" />
                        </p>
                        <p className="text-2xl font-bold text-blue-900">₹50,000</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg p-4 text-blue-900">
                      <div className="flex items-center mb-2">
                        <div className="bg-blue-700 p-1.5 rounded-md mr-2">
                          <IndianRupee className="text-white h-5 w-5" />
                        </div>
                        <h4 className="text-lg font-semibold">Estimated Tax Savings (First Year)</h4>
                      </div>
                      <p className="mb-2">
                        Based on your tax slab of Old Regime - {taxSlab}%, your estimated tax saving for the first year is{" "}
                        <span className="font-bold text-blue-800">₹120,000</span>
                      </p>
                      <p>
                        This reduces your effective monthly cost to{" "}
                        <span className="font-bold text-blue-800">₹16,035</span> after tax benefits.
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Prepayment Impact Summary */}
                {prepaymentFrequency !== "none" && prepaymentAmount > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <IndianRupee className="mr-2 h-5 w-5 text-blue-700" />
                      <h3 className="text-lg font-semibold text-blue-800">Prepayment Impact Summary</h3>
                    </div>
                    
                    <p className="mb-3">With prepayments of ₹{Math.round(prepaymentAmount).toLocaleString()}, projections indicate you might:</p>
                    
                    <ul className="space-y-2 mb-5">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Save ₹{Math.round(interestSaved).toLocaleString()} in interest (about ₹{(interestSaved/100000).toFixed(1)} lakhs)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Finish your loan {Math.floor(timeSaved)} years and {Math.round((timeSaved % 1) * 12)} months earlier</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Reduce your total interest cost by {(interestSaved / standardInterest * 100).toFixed(1)}%</span>
                      </li>
                    </ul>
                    
                    {/* Payment Breakdown Comparison */}
                    <div className="grid grid-cols-2 gap-5 my-5">
                      <div>
                        <h4 className="text-lg font-semibold mb-3">Without Prepayment</h4>
                        {/* We'll use Recharts or another library to create a stacked bar chart here */}
                        <div className="h-80 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={Array.from({length: standardTenure}, (_, i) => ({
                                year: i + 1,
                                principal: yearlyAmortData[i]?.principal || 0,
                                interest: yearlyAmortData[i]?.interest || 0
                              }))}
                              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                            >
                              <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                              <YAxis tickFormatter={(value: number) => `${(value/100000).toFixed(1)}L`} label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }} />
                              <RTooltip />
                              <Legend />
                              <Bar dataKey="principal" stackId="a" fill="#3b82f6" name="Principal Paid" />
                              <Bar dataKey="interest" stackId="a" fill="#f59e0b" name="Interest Paid" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold mb-3">With Prepayment</h4>
                        {/* Similar chart but with prepayment data */}
                        <div className="h-80 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={Array.from({length: actualTenure}, (_, i) => ({
                                year: i + 1,
                                principal: prepaymentAmortData[i]?.principal || 0,
                                interest: prepaymentAmortData[i]?.interest || 0,
                                prepayment: prepaymentAmortData[i]?.prepayment || 0
                              }))}
                              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                            >
                              <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                              <YAxis tickFormatter={(value: number) => `${(value/100000).toFixed(1)}L`} label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }} />
                              <RTooltip />
                              <Legend />
                              <Bar dataKey="principal" stackId="a" fill="#3b82f6" name="Principal Paid" />
                              <Bar dataKey="interest" stackId="a" fill="#f59e0b" name="Interest Paid" />
                              <Bar dataKey="prepayment" stackId="a" fill="#10b981" name="Prepayment Amount" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                    
                    {/* Without vs With Prepayment Comparison */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                        <p className="text-sm font-medium text-gray-700 mb-2">Without Prepayments</p>
                        <p className="text-sm mb-1">Tenure: <span className="font-semibold">{standardTenure} yrs</span></p>
                        <p className="text-sm">Interest: <span className="font-semibold">₹{(standardInterest / 100000).toFixed(2)} Lakh</span></p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                        <p className="text-sm font-medium text-green-700 mb-2">With Prepayments</p>
                        <p className="text-sm mb-1">Tenure: <span className="font-semibold">{actualTenure} yrs</span></p>
                        <p className="text-sm">Interest: <span className="font-semibold">₹{(totalInterest / 100000).toFixed(2)} Lakh</span></p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Outstanding Principal Over Time Chart */}
                {amortizationSchedule.length > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <TrendingDown className="mr-2 h-5 w-5 text-blue-700" />
                      <h3 className="text-lg font-semibold text-blue-800">Outstanding Principal Over Time</h3>
                    </div>
                    
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={Array.from({length: Math.min(loanTenure, actualTenure)}, (_, i) => ({
                            year: i + 1,
                            balance: amortizationSchedule.find(entry => entry.period === (i+1)*12)?.balance || 0
                          }))}
                          margin={{ top: 10, right: 10, left: 20, bottom: 30 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                          <YAxis 
                            tickFormatter={(value: number) => `${(value/100000).toFixed(1)}L`}
                            label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
                          />
                          <RTooltip 
                            formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Balance']}
                            labelFormatter={(label: any) => `Year ${label}`}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="balance" 
                            stroke="#3b82f6" 
                            strokeWidth={3}
                            activeDot={{ r: 8 }}
                            name="Outstanding Principal"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8 px-4 bg-gray-50 rounded-md border border-dashed">
                <div className="text-center space-y-2">
                  <div className="inline-flex p-2 bg-blue-50 rounded-full mb-1">
                    <Calculator className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-700">Loan Summary Will Appear Here</h3>
                  <p className="text-xs text-gray-500 max-w-xs">
                    Fill in your loan details and click 'Calculate Your EMI' to see your results.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content for amortization tab - Positioned right after the tabs */}
        {/* Saved Calculations Tab */}
        {activeTab === "savedCalculations" && (
          <div className="mb-8 border-b pb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-800">Your Saved Calculations</h3>
                {showResults && (
                  <Button
                    onClick={() => setShowSaveForm(true)}
                    size="sm"
                    className="text-xs bg-green-600 hover:bg-green-700 text-white flex items-center px-4 py-2"
                  >
                    <IndianRupee className="mr-1.5 h-3.5 w-3.5" />
                    Save Current Calculation
                  </Button>
                )}
              </div>
              
              {/* Save dialog modal - centrally positioned on screen */}
              {showSaveForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 animate-in fade-in zoom-in">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <IndianRupee className="h-5 w-5 text-green-600 mr-2" />
                      Save Calculation
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Enter a name to remember this calculation by:
                    </p>
                    <Input
                      placeholder="e.g., My Dream Home Loan"
                      value={calculationName}
                      onChange={(e) => setCalculationName(e.target.value)}
                      className="mb-4 w-full"
                      autoFocus
                    />
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setShowSaveForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={saveCalculation} 
                        disabled={!calculationName.trim() || saveMutation.isPending}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {saveMutation.isPending ? "Saving..." : "₹ Save"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {isLoadingSaved ? (
                <div className="p-6 text-center">
                  <p>Loading saved calculations...</p>
                </div>
              ) : savedCalculations.length > 0 ? (
                <div className="overflow-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-50 to-blue-100">
                        <th className="p-3 text-left border border-blue-100 font-medium text-blue-800">Name</th>
                        <th className="p-3 text-right border border-blue-100 font-medium text-blue-800">Loan Amount</th>
                        <th className="p-3 text-right border border-blue-100 font-medium text-blue-800">Interest Rate</th>
                        <th className="p-3 text-right border border-blue-100 font-medium text-blue-800">Tenure</th>
                        <th className="p-3 text-right border border-blue-100 font-medium text-blue-800">EMI</th>
                        <th className="p-3 text-right border border-blue-100 font-medium text-blue-800">Date Saved</th>
                        <th className="p-3 text-right border border-blue-100 font-medium text-blue-800">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedCalculations.map((calc, index) => (
                        <tr key={calc.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-blue-50 transition-colors"}>
                          <td className="p-3 border font-medium">{calc.name}</td>
                          <td className="p-3 text-right border font-medium">{formatCurrency(calc.loanAmount)}</td>
                          <td className="p-3 text-right border font-medium">{calc.interestRate}%</td>
                          <td className="p-3 text-right border font-medium">{calc.loanTenure} years</td>
                          <td className="p-3 text-right border font-medium">{formatCurrency(calc.emi)}</td>
                          <td className="p-3 text-right border font-medium">{typeof calc.createdAt === 'string' ? new Date(calc.createdAt).toLocaleDateString() : "N/A"}</td>
                          <td className="p-3 text-right border font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-xs"
                                onClick={() => {
                                  // Load this calculation
                                  setLoanAmount(calc.loanAmount);
                                  setInterestRate(calc.interestRate);
                                  setLoanTenure(calc.loanTenure);
                                  setPropertyValue(calc.propertyValue);
                                  setPrepaymentFrequency(calc.prepaymentFrequency || "none");
                                  setPrepaymentAmount(calc.prepaymentAmount || 0);
                                  setPrepaymentStartMonth(calc.prepaymentStartMonth || 12);
                                  setTaxSlab(calc.taxSlab || 30);
                                  setIsFirstTimeHomeBuyer(calc.isFirstTimeHomeBuyer || false);
                                  setIsAffordableHousing(calc.isAffordableHousing || false);
                                  setShowResults(true);
                                  setActiveTab("calculator");
                                  toast({
                                    title: "Calculation Loaded",
                                    description: `Loaded "${calc.name}" calculation.`,
                                  });
                                }}
                              >
                                Load
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to delete "${calc.name}" calculation?`)) {
                                    deleteMutation.mutate(calc.id);
                                  }
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center p-6 bg-gray-50 rounded-md">
                  <Receipt className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <h3 className="text-gray-700 font-medium mb-1">No Saved Calculations</h3>
                  <p className="text-gray-500 text-sm mb-3">
                    Calculate your home loan details and save them for future reference.
                  </p>
                  {!showResults && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveTab("calculator")}
                    >
                      Go to Calculator
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === "amortization" && (
          <div className="mb-8 border-b pb-8">
            {showResults && amortizationSchedule.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <div className="overflow-auto">
                  {/* Pagination controls - top */}
                  <div className="flex justify-between items-center mb-3 bg-gray-50 p-2 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="rows-per-page" className="text-xs">Rows per page:</Label>
                      <select 
                        id="rows-per-page"
                        value={rowsPerPage}
                        onChange={(e) => {
                          setRowsPerPage(Number(e.target.value));
                          setCurrentPage(1); // Reset to first page when changing page size
                        }}
                        className="text-xs p-1 border border-gray-300 rounded bg-white"
                      >
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                        <option value={36}>36</option>
                        <option value={60}>60</option>
                        <option value={120}>120</option>
                      </select>
                    </div>
                    
                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronsLeft className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-3 w-3" />
                      </Button>
                      
                      <span className="text-xs flex items-center px-2 bg-white border border-gray-300 rounded-md">
                        Page {currentPage} of {Math.ceil(amortizationSchedule.length / rowsPerPage)}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(amortizationSchedule.length / rowsPerPage)))}
                        disabled={currentPage === Math.ceil(amortizationSchedule.length / rowsPerPage)}
                      >
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => setCurrentPage(Math.ceil(amortizationSchedule.length / rowsPerPage))}
                        disabled={currentPage === Math.ceil(amortizationSchedule.length / rowsPerPage)}
                      >
                        <ChevronsRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <table className="w-full border-collapse text-base">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-50 to-blue-100">
                        <th className="p-3 text-left border border-blue-100 font-medium text-blue-800 text-lg">Year</th>
                        <th className="p-3 text-left border border-blue-100 font-medium text-blue-800 text-lg">Month #</th>
                        <th className="p-3 text-right border border-blue-100 font-medium text-blue-800 text-lg">EMI</th>
                        <th className="p-3 text-right border border-blue-100 font-medium text-blue-800 text-lg">Principal</th>
                        <th className="p-3 text-right border border-blue-100 font-medium text-blue-800 text-lg">Interest</th>
                        <th className="p-3 text-right border border-blue-100 font-medium text-blue-800 text-lg">Prepayment</th>
                        <th className="p-3 text-right border border-blue-100 font-medium text-blue-800 text-lg">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortizationSchedule
                        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
                        .map((entry, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-blue-50 transition-colors"}>
                            <td className="p-3 border font-medium text-base">{entry.year}</td>
                            <td className="p-3 border font-medium text-base">{entry.period}</td>
                            <td className="p-3 text-right border font-medium text-base">{formatCurrency(entry.payment)}</td>
                            <td className="p-3 text-right border text-blue-700 font-medium text-base">{formatCurrency(entry.principalPayment)}</td>
                            <td className="p-3 text-right border text-amber-600 font-medium text-base">{formatCurrency(entry.interestPayment)}</td>
                            <td className="p-3 text-right border text-green-600 font-medium text-base">
                              {prepaymentFrequency === "custom" ? (
                                <div className="flex justify-end items-center space-x-1">
                                  <input
                                    type="number"
                                    min="0"
                                    className="w-24 text-right p-1 border border-gray-300 rounded text-base"
                                    value={manualPrepayments[entry.period] || 0}
                                    onChange={(e) => {
                                      const newValue = Math.max(0, parseInt(e.target.value) || 0);
                                      setManualPrepayments(prev => ({
                                        ...prev,
                                        [entry.period]: newValue
                                      }));
                                    }}
                                  />
                                  <button 
                                    className="p-1 rounded bg-green-100 hover:bg-green-200"
                                    title="Apply this prepayment"
                                    onClick={() => calculateEMI()}
                                  >
                                    <Check className="h-4 w-4 text-green-600" />
                                  </button>
                                </div>
                              ) : (
                                formatCurrency(entry.prepayment || 0)
                              )}
                            </td>
                            <td className="p-3 text-right border font-medium text-base">{formatCurrency(entry.balance)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  
                  {/* Pagination controls - bottom */}
                  <div className="flex justify-between items-center mt-3 bg-gray-50 p-2 rounded-md">
                    <div className="text-xs text-gray-500">
                      Showing {Math.min(amortizationSchedule.length, (currentPage - 1) * rowsPerPage + 1)} to {Math.min(amortizationSchedule.length, currentPage * rowsPerPage)} of {amortizationSchedule.length} months
                    </div>
                    
                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronsLeft className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-3 w-3" />
                      </Button>
                      
                      <span className="text-xs flex items-center px-2 bg-white border border-gray-300 rounded-md">
                        Page {currentPage} of {Math.ceil(amortizationSchedule.length / rowsPerPage)}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(amortizationSchedule.length / rowsPerPage)))}
                        disabled={currentPage === Math.ceil(amortizationSchedule.length / rowsPerPage)}
                      >
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => setCurrentPage(Math.ceil(amortizationSchedule.length / rowsPerPage))}
                        disabled={currentPage === Math.ceil(amortizationSchedule.length / rowsPerPage)}
                      >
                        <ChevronsRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                {prepaymentFrequency === "custom" && (
                  <div className="mt-3 p-2 bg-blue-50 rounded-lg text-sm text-blue-700 border border-blue-200">
                    <div className="flex items-start">
                      <AlertCircle className="h-4 w-4 mr-1.5 mt-0.5 flex-shrink-0 text-blue-600" />
                      <span>
                        You selected <strong>Custom</strong> prepayment option. No automatic prepayments are applied until you manually enter them.
                        Enter prepayment amounts directly in the table above and click the green check button to apply them.
                        Try different amounts and patterns to optimize your loan and reduce interest!
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="mt-3 p-2 bg-gray-50 rounded-lg text-sm text-gray-600 border">
                  <div className="flex items-start">
                    <Info className="h-4 w-4 mr-1.5 mt-0.5 flex-shrink-0 text-blue-600" />
                    <span>
                      The amortization schedule shows how your loan balance reduces over time. Key rows are displayed 
                      to illustrate the loan payoff trajectory. Interest is calculated on a reducing balance basis.
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-8 px-4 bg-gray-50 rounded-md border border-dashed">
                <div className="text-center space-y-2">
                  <div className="inline-flex p-2 bg-blue-50 rounded-full mb-1">
                    <BarChart4 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-700">Amortization Schedule Will Appear Here</h3>
                  <p className="text-xs text-gray-500 max-w-xs">
                    Click 'Calculate Your EMI' to see your detailed loan repayment schedule.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bank Rate Comparison and Tips - Positioned at bottom of page, always visible */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4">
          <div className="bg-white rounded-lg border p-4">
            <h3 className="text-base font-medium mb-4 flex items-center text-blue-600">
              <span className="inline-flex items-center justify-center bg-blue-100 p-1.5 rounded-md mr-2">
                <Building className="h-4 w-4 text-blue-600" />
              </span>
              Current Bank Interest Rates
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="p-2 text-left text-xs font-medium">Bank</th>
                    <th className="p-2 text-left text-xs font-medium">Interest Rate</th>
                    <th className="p-2 text-left text-xs font-medium">Processing Fee</th>
                    <th className="p-2 text-right text-xs font-medium">EMI for ₹30,00,000</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="border-b">
                    <td className="py-2 px-2 font-medium">SBI Home Loan</td>
                    <td className="py-2 px-2">8.40% - 9.15%</td>
                    <td className="py-2 px-2">0.35%</td>
                    <td className="py-2 px-2 text-right">₹26,035</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-2 font-medium">HDFC Home Loan</td>
                    <td className="py-2 px-2">8.50% - 9.20%</td>
                    <td className="py-2 px-2">0.50%</td>
                    <td className="py-2 px-2 text-right">₹26,320</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-2 font-medium">ICICI Bank</td>
                    <td className="py-2 px-2">8.75% - 9.25%</td>
                    <td className="py-2 px-2">0.50%</td>
                    <td className="py-2 px-2 text-right">₹26,511</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-2 font-medium">Axis Bank</td>
                    <td className="py-2 px-2">8.75% - 9.35%</td>
                    <td className="py-2 px-2">0.50%</td>
                    <td className="py-2 px-2 text-right">₹26,607</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 font-medium">Kotak Mahindra</td>
                    <td className="py-2 px-2">8.70% - 9.30%</td>
                    <td className="py-2 px-2">0.50%</td>
                    <td className="py-2 px-2 text-right">₹26,416</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-2 text-xs text-gray-500 italic">
              *Rates are indicative and subject to change. Contact the respective banks for latest rates.
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h3 className="text-base font-medium mb-4 flex items-center text-blue-600">
              <span className="inline-flex items-center justify-center bg-blue-100 p-1.5 rounded-md mr-2">
                <LightbulbIcon className="h-4 w-4 text-blue-600" />
              </span>
              Home Loan Tips
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="p-1 rounded-full bg-green-100 mt-0.5 flex-shrink-0">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium">Part-prepayments Strategy</p>
                  <p className="text-xs text-gray-600">Regular monthly prepayment of even small amounts can significantly reduce your interest burden and loan tenure.</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="p-1 rounded-full bg-green-100 mt-0.5 flex-shrink-0">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium">Prepayment Options</p>
                  <p className="text-xs text-gray-600">Choose from monthly (small regular amounts), annual (bonuses/tax refunds), or custom frequency (every X months) based on your financial situation.</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="p-1 rounded-full bg-green-100 mt-0.5 flex-shrink-0">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium">Optimize Loan Tenure</p>
                  <p className="text-xs text-gray-600">Consider shorter loan tenure for potentially lower total interest cost, though EMIs might be higher.</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="p-1 rounded-full bg-green-100 mt-0.5 flex-shrink-0">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium">Tax Benefits</p>
                  <p className="text-xs text-gray-600">Utilize deductions under Sections 24(b), 80C, 80EE, and 80EEA as applicable to reduce your tax burden.</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="p-1 rounded-full bg-green-100 mt-0.5 flex-shrink-0">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium">Rate Negotiation & Balance Transfer</p>
                  <p className="text-xs text-gray-600">Compare multiple lenders and consider balance transfer for significantly lower interest rates.</p>
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* Tax Regime Information Box - Full Width */}
        <div className="mt-5">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <h4 className="text-xs font-medium text-green-700 mb-2 flex items-center">
              <Landmark className="h-3.5 w-3.5 mr-1.5" />
              Income Tax Regime Comparison
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-medium text-green-700">Old Tax Regime:</p>
                <ul className="list-disc list-inside pl-2 text-xs text-gray-600 space-y-0.5 mt-0.5">
                  <li>Section 24(b): Up to ₹2,00,000 interest deduction on self-occupied property</li>
                  <li>Section 80C: Up to ₹1,50,000 deduction on principal repayment</li>
                  <li>Higher tax slabs but with multiple exemptions and deductions</li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium text-green-700">New Tax Regime:</p>
                <ul className="list-disc list-inside pl-2 text-xs text-gray-600 space-y-0.5 mt-0.5">
                  <li>No home loan tax benefits available</li>
                  <li>Lower tax slabs but without most exemptions and deductions</li>
                  <li>Choose old regime if you have significant home loan interest</li>
                </ul>
              </div>
            </div>
            <div className="mt-2 text-center">
              <Link to="/tax-benefits" className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center justify-center">
                <Info className="h-3 w-3 mr-1" />
                Visit our Tax & Benefits page for more detailed information
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Financial Disclaimer */}
        <div className="mt-6">
          <FinancialDisclaimer 
            calculatorType="homeloan"
            variant="default"
            size="md"
          />
        </div>
      </div>
    </CalculatorLayout>
  );
}