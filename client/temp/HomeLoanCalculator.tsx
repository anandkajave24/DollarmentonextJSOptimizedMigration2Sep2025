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
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Info, Minus, Plus, Check, TrendingDown, Clock, 
  DollarSign, BarChart4, Building, Calendar, LightbulbIcon, 
  ChevronDown, ChevronUp, Landmark, Ban, Home
} from "lucide-react";
import ReactECharts from 'echarts-for-react';

export default function HomeLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(3000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [prepaymentFrequency, setPrepaymentFrequency] = useState("none");
  const [prepaymentAmount, setPrepaymentAmount] = useState(0);
  const [prepaymentStartMonth, setPrepaymentStartMonth] = useState(12);
  const [showTaxBenefits, setShowTaxBenefits] = useState(false);
  const [propertyValue, setPropertyValue] = useState(4000000);
  const [taxSlab, setTaxSlab] = useState(30);
  const [isFirstTimeHomeBuyer, setIsFirstTimeHomeBuyer] = useState(true);
  const [isAffordableHousing, setIsAffordableHousing] = useState(false);
  
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [taxSavings, setTaxSavings] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("calculator");
  
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

  // Initialize calculations but don't show results automatically
  useEffect(() => {
    if (showResults) {
      calculateEMI();
    }
  }, [
    loanAmount, interestRate, loanTenure, 
    prepaymentFrequency, prepaymentAmount, prepaymentStartMonth, 
    showTaxBenefits, propertyValue, taxSlab, 
    isFirstTimeHomeBuyer, isAffordableHousing, 
    showResults
  ]);

  const calculateEMI = () => {
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
      prepaymentStartMonth
    );
    
    // Extract values from results
    const { 
      totalInterestAmount: standardInterestAmount, 
      totalPaymentAmount: standardPaymentAmount,
      actualTenureMonths: standardTenureMonths
    } = standardScheduleResult;
    
    const { 
      totalInterestAmount, 
      totalPaymentAmount, 
      actualSchedule,
      actualTenureMonths,
      yearlyData
    } = withPrepaymentResult;

    // Calculate tax benefits if enabled
    let taxBenefitAmount = 0;
    let interestDeduction = 0;
    let principalDeduction = 0;
    let additionalInterestDeduction = 0;
    
    if (showTaxBenefits) {
      // Tax benefits per the Python implementation
      const taxRate = taxSlab / 100;
      interestDeduction = Math.min(totalInterestAmount / loanTenure, 200000); // Section 24(b)
      principalDeduction = Math.min(loanAmount / loanTenure, 150000); // Section 80C
      
      // Additional first-time homebuyer benefit
      additionalInterestDeduction = isFirstTimeHomeBuyer ? 50000 : 0; // Section 80EE if applicable
      
      // Total first year deduction
      const totalYearlyDeduction = interestDeduction + principalDeduction + additionalInterestDeduction;
      
      // Simplified tax benefit calculation
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
    setEmi(Math.round(monthlyEMI));
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
    ppStartMonth: number = prepaymentStartMonth
  ) => {
    let remainingPrincipal = principal;
    let totalInterestAmount = 0;
    const actualSchedule = [];
    let actualTenureMonths = totalPayments;
    
    // Track yearly values for display
    let yearlyData: any[] = [];
    let currentYearPrincipal = 0;
    let currentYearInterest = 0;
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
      
      // Apply custom (quarterly) prepayment if applicable
      if (ppFrequency === "custom" && ppAmount > 0 && 
          remainingPrincipal > 0 && month >= ppStartMonth && month % 3 === 0) {
        currentPrepayment = Math.min(ppAmount, remainingPrincipal - principalPayment);
      }
      
      // Reduce principal by regular payment and prepayment
      remainingPrincipal -= (principalPayment + currentPrepayment);
      
      // Track total values
      totalInterestAmount += interestPayment;
      currentYearPrincipal += (principalPayment + currentPrepayment);
      currentYearInterest += interestPayment;
      
      // Add key rows to the amortization schedule for display
      if (month % 12 === 0 || month === 1 || month === totalPayments || remainingPrincipal <= 0) {
        actualSchedule.push({
          period: month,
          year: Math.ceil(month / 12),
          payment: monthlyEMI,
          principalPayment: principalPayment,
          interestPayment: interestPayment,
          prepayment: currentPrepayment,
          balance: Math.max(0, remainingPrincipal)
        });
      }
      
      // Track yearly data for charts
      if (month % 12 === 0 || month === totalPayments || remainingPrincipal <= 0) {
        yearlyData.push({
          year: currentYear,
          principal: currentYearPrincipal,
          interest: currentYearInterest,
          balance: Math.max(0, remainingPrincipal)
        });
        
        // Reset yearly tracking
        currentYear++;
        currentYearPrincipal = 0;
        currentYearInterest = 0;
      }
    }
    
    // Calculate total payment (principal + total interest)
    const totalPaymentAmount = principal + totalInterestAmount;
    
    return { 
      totalInterestAmount,
      totalPaymentAmount,
      actualSchedule,
      actualTenureMonths,
      yearlyData
    };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <CalculatorLayout
      title="Home Loan EMI Calculator"
      description="Calculate your home loan EMI and understand the total cost of borrowing including interest payments. This calculator provides a detailed breakdown of your home loan repayment schedule, allowing you to visualize the impact of interest payments over time. It also offers insights into the total cost of borrowing, helping you make informed financial decisions about your home loan."
      keywords="home loan calculator, EMI calculator, home loan EMI, mortgage calculator, interest calculation, loan repayment, RupeeSmart"
      icon="home"
      calculatorType="Loan"
    >
      <div className="space-y-6">
        <div className="bg-gray-100 text-gray-800 p-4 rounded-lg border border-gray-300">
          <h3 className="font-semibold mb-1">Disclaimer:</h3>
          <p className="text-sm">Home Loan EMI calculations are based on a fixed interest rate. Actual EMI amounts may vary based on lender policies and other factors. This calculator is for illustrative purposes only and should not be considered financial advice. Consult a financial advisor for personalized home loan guidance.</p>
        </div>

        <Card className="p-6 mb-6">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 items-center">
                <div className="flex items-center gap-2">
                  <Label htmlFor="loan-amount">Loan Amount (₹)</Label>
                  <div className="text-gray-500 cursor-help">
                    <Info className="h-4 w-4" />
                  </div>
                </div>
                <span>{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex gap-4 items-center">
                <Input
                  id="loan-amount"
                  type="number"
                  min="100000"
                  max="10000000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex items-center mt-2 mb-1">
                <Slider
                  value={[loanAmount]}
                  min={100000}
                  max={10000000}
                  step={50000}
                  onValueChange={(value) => setLoanAmount(value[0])}
                  className="flex-grow"
                />
                <button 
                  className="ml-2 p-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => setLoanAmount(Math.max(100000, loanAmount - 50000))}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button 
                  className="ml-2 p-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => setLoanAmount(Math.min(10000000, loanAmount + 50000))}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹1L</span>
                <span>₹1Cr</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2 items-center">
                <div className="flex items-center gap-2">
                  <Label htmlFor="interest-rate">Interest Rate (% p.a.)</Label>
                  <div className="text-gray-500 cursor-help">
                    <Info className="h-4 w-4" />
                  </div>
                </div>
                <span>{interestRate}%</span>
              </div>
              <div className="flex gap-4 items-center">
                <Input
                  id="interest-rate"
                  type="number"
                  min="4"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex items-center mt-2 mb-1">
                <Slider
                  value={[interestRate]}
                  min={4}
                  max={20}
                  step={0.1}
                  onValueChange={(value) => setInterestRate(value[0])}
                  className="flex-grow"
                />
                <button 
                  className="ml-2 p-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => setInterestRate(Math.max(4, interestRate - 0.1))}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button 
                  className="ml-2 p-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => setInterestRate(Math.min(20, interestRate + 0.1))}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>4%</span>
                <span>20%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2 items-center">
                <div className="flex items-center gap-2">
                  <Label htmlFor="loan-tenure">Loan Tenure (Years)</Label>
                  <div className="text-gray-500 cursor-help">
                    <Info className="h-4 w-4" />
                  </div>
                </div>
                <span>{loanTenure} years</span>
              </div>
              <div className="flex gap-4 items-center">
                <Input
                  id="loan-tenure"
                  type="number"
                  min="1"
                  max="30"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex items-center mt-2 mb-1">
                <Slider
                  value={[loanTenure]}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={(value) => setLoanTenure(value[0])}
                  className="flex-grow"
                />
                <button 
                  className="ml-2 p-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => setLoanTenure(Math.max(1, loanTenure - 1))}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button 
                  className="ml-2 p-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => setLoanTenure(Math.min(30, loanTenure + 1))}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 year</span>
                <span>30 years</span>
              </div>
            </div>

            <div className="space-y-4 border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold flex items-center">
                <TrendingDown className="h-5 w-5 mr-2 text-green-600" />
                Prepayment Strategy
              </h3>
              
              <div>
                <Label className="mb-2 block font-medium">Choose prepayment frequency</Label>
                <RadioGroup 
                  value={prepaymentFrequency} 
                  onValueChange={setPrepaymentFrequency}
                  className="grid grid-cols-2 md:grid-cols-4 gap-2"
                >
                  <div>
                    <RadioGroupItem value="none" id="none-option" className="peer sr-only" />
                    <Label
                      htmlFor="none-option"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-3 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer text-center h-full"
                    >
                      <Ban className="h-5 w-5 mb-1 text-gray-500 peer-data-[state=checked]:text-blue-600" />
                      <span className="text-sm font-medium">None</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem value="monthly" id="monthly-option" className="peer sr-only" />
                    <Label
                      htmlFor="monthly-option"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-3 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer text-center h-full"
                    >
                      <Calendar className="h-5 w-5 mb-1 text-gray-500 peer-data-[state=checked]:text-blue-600" />
                      <span className="text-sm font-medium">Monthly</span>
                      <span className="text-xs text-gray-500 mt-1">Small regular payments</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem value="annual" id="annual-option" className="peer sr-only" />
                    <Label
                      htmlFor="annual-option"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-3 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer text-center h-full"
                    >
                      <Clock className="h-5 w-5 mb-1 text-gray-500 peer-data-[state=checked]:text-blue-600" />
                      <span className="text-sm font-medium">Annual</span>
                      <span className="text-xs text-gray-500 mt-1">Yearly lump sum</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem value="custom" id="custom-option" className="peer sr-only" />
                    <Label
                      htmlFor="custom-option"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-3 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer text-center h-full"
                    >
                      <DollarSign className="h-5 w-5 mb-1 text-gray-500 peer-data-[state=checked]:text-blue-600" />
                      <span className="text-sm font-medium">Quarterly</span>
                      <span className="text-xs text-gray-500 mt-1">Every 3 months</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {prepaymentFrequency !== "none" && (
                <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
                  <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                    <TrendingDown className="h-4 w-4 mr-1.5" />
                    Prepayment Details
                  </h4>
                  
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="prepayment-amount-input" className="text-blue-700">Amount (₹)</Label>
                        <span className="font-semibold">{formatCurrency(prepaymentAmount)}</span>
                      </div>
                      <div className="flex">
                        <Input
                          id="prepayment-amount-input"
                          type="number"
                          min="1000"
                          max="10000000"
                          value={prepaymentAmount}
                          onChange={(e) => setPrepaymentAmount(Number(e.target.value))}
                          className="flex-1"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          onClick={() => setPrepaymentAmount(Math.max(1000, prepaymentAmount - 5000))}
                          className="ml-2 p-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          onClick={() => setPrepaymentAmount(prepaymentAmount + 5000)}
                          className="ml-2 p-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-blue-600">
                        The amount you'll pay in addition to your regular EMI
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="prepayment-start-slider" className="text-blue-700">Start After (months)</Label>
                        <span className="font-semibold">{prepaymentStartMonth}</span>
                      </div>
                      <div className="pt-1">
                        <Slider
                          id="prepayment-start-slider"
                          min={1}
                          max={60}
                          step={1}
                          value={[prepaymentStartMonth]}
                          onValueChange={(value) => setPrepaymentStartMonth(value[0])}
                          className="mt-2"
                        />
                      </div>
                      <p className="text-xs text-blue-600">
                        When you want to start making prepayments
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-white rounded-lg p-3 border border-blue-100">
                    <h5 className="text-sm font-medium text-blue-800 mb-1">Strategy explanation:</h5>
                    <p className="text-xs text-gray-600">
                      {prepaymentFrequency === "monthly" && "Monthly prepayments allow you to continuously reduce your principal, compounding your savings over time even with smaller amounts."}
                      {prepaymentFrequency === "annual" && "Annual prepayments are perfect for utilizing yearly bonuses or tax refunds to make a significant impact on your loan."}
                      {prepaymentFrequency === "custom" && "Quarterly prepayments provide a balanced approach, allowing you to reduce principal consistently without monthly commitment."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Accordion type="single" collapsible className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Landmark className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold">Income Tax Benefits</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="show-tax-benefits-option" 
                        checked={showTaxBenefits}
                        onCheckedChange={(checked) => setShowTaxBenefits(checked as boolean)}
                      />
                      <Label 
                        htmlFor="show-tax-benefits-option" 
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        Include tax benefits in calculation
                      </Label>
                    </div>
                    
                    {showTaxBenefits && (
                      <div className="mt-2 space-y-4 border-t border-gray-100 pt-4">
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="tax-slab-select" className="text-gray-700 font-medium">Your Tax Slab</Label>
                            <select
                              id="tax-slab-select"
                              value={taxSlab}
                              onChange={(e) => setTaxSlab(Number(e.target.value))}
                              className="w-full rounded-md border border-gray-300 p-2"
                            >
                              <option value="10">10% - New Regime (₹3-6 lakh)</option>
                              <option value="15">15% - New Regime (₹6-9 lakh)</option>
                              <option value="20">20% - New/Old Regime (₹9-12/₹5-10 lakh)</option>
                              <option value="30">30% - New/Old Regime (₹12+ lakh/₹10+ lakh)</option>
                            </select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="property-value-input" className="text-gray-700 font-medium">Property Value (₹)</Label>
                            <Input
                              id="property-value-input"
                              type="number"
                              min="100000"
                              value={propertyValue}
                              onChange={(e) => setPropertyValue(Number(e.target.value))}
                              className="w-full"
                            />
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 bg-blue-50 border-blue-100">
                          <h4 className="font-medium text-blue-700 mb-3">Additional Benefits</h4>
                          
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Checkbox 
                                id="first-time-buyer-option" 
                                checked={isFirstTimeHomeBuyer}
                                onCheckedChange={(checked) => setIsFirstTimeHomeBuyer(checked as boolean)}
                              />
                              <Label htmlFor="first-time-buyer-option" className="text-sm text-gray-700 cursor-pointer">
                                First-time Home Buyer (Extra ₹50,000 deduction under Section 80EE)
                              </Label>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Checkbox 
                                id="affordable-housing-option" 
                                checked={isAffordableHousing}
                                onCheckedChange={(checked) => setIsAffordableHousing(checked as boolean)}
                              />
                              <Label htmlFor="affordable-housing-option" className="text-sm text-gray-700 cursor-pointer">
                                Affordable Housing (Property value ≤₹45 lakhs)
                              </Label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 border border-gray-200">
                          <h5 className="font-medium text-gray-700 mb-1">Available Tax Deductions:</h5>
                          <ul className="space-y-1 text-xs">
                            <li className="flex items-start gap-1">
                              <span className="text-green-500 font-bold">•</span>
                              <span><span className="font-medium">Section 24(b):</span> Interest paid on housing loan (up to ₹2,00,000 per year)</span>
                            </li>
                            <li className="flex items-start gap-1">
                              <span className="text-green-500 font-bold">•</span>
                              <span><span className="font-medium">Section 80C:</span> Principal repayment (up to ₹1,50,000 per year)</span>
                            </li>
                            <li className="flex items-start gap-1">
                              <span className="text-green-500 font-bold">•</span>
                              <span><span className="font-medium">Section 80EE:</span> Additional interest deduction for first-time homebuyers (up to ₹50,000)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button 
              onClick={() => {
                calculateEMI();
                setShowResults(true);
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Calculate Your EMI
              </div>
            </Button>
            
            {!showResults ? (
              <div className="flex items-center justify-center p-16 bg-gray-50 rounded-lg border border-dashed">
                <div className="text-center space-y-3">
                  <div className="inline-flex p-4 bg-blue-50 rounded-full">
                    <BarChart4 className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700">Your Results Will Appear Here</h3>
                  <p className="text-sm text-gray-500 max-w-xs">
                    Fill in your loan details and click 'Calculate Your EMI' to see your personalized results.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-5 bg-gradient-to-br from-blue-50 to-white rounded-lg border shadow-sm">
                  <h3 className="text-lg font-semibold mb-5 flex items-center text-blue-700">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Loan Summary
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm text-gray-500">Monthly EMI</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        {formatCurrency(emi)}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Total Interest</p>
                        <p className="text-xl font-semibold">{formatCurrency(totalInterest)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Payment</p>
                        <p className="text-xl font-semibold">{formatCurrency(totalPayment)}</p>
                      </div>
                    </div>
                    
                    {showTaxBenefits && taxSavings > 0 && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">Est. Tax Savings</p>
                            <p className="text-xl font-semibold text-green-600">{formatCurrency(taxSavings)}</p>
                          </div>
                          <div className="text-xs text-green-600 flex items-center bg-green-50 px-2 py-1 rounded-full">
                            <Check className="h-4 w-4 mr-1" />
                            Tax Benefits Applied
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 bg-white rounded-lg border shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-700">
                    <BarChart4 className="mr-2 h-5 w-5" />
                    Payment Breakdown
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Principal: {formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm">Interest: {formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="h-4 w-full rounded-full overflow-hidden bg-gray-100">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                      style={{ width: `${(loanAmount / totalPayment) * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-6">
                    {Object.keys(pieChartData).length > 0 && (
                      <ReactECharts 
                        option={pieChartData} 
                        style={{ height: '250px', width: '100%' }}
                      />
                    )}
                  </div>
                </div>
                
                {/* Prepayment Benefits Section */}
                {prepaymentFrequency !== "none" && prepaymentAmount > 0 && (
                  <div className="p-5 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-100 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-green-700">
                      <div className="flex items-center">
                        <TrendingDown className="mr-2 h-5 w-5" />
                        Prepayment Benefits
                      </div>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-green-100">
                        <div className="p-2 rounded-full bg-green-100 mr-3">
                          <DollarSign className="h-7 w-7 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Interest Saved</p>
                          <p className="text-xl font-bold text-green-600">{formatCurrency(interestSaved)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-green-100">
                        <div className="p-2 rounded-full bg-green-100 mr-3">
                          <Clock className="h-7 w-7 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Time Saved</p>
                          <p className="text-xl font-bold text-green-600">
                            {Math.floor(timeSaved)} years {Math.round((timeSaved % 1) * 12)} months
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-white rounded-lg border border-green-100">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg flex-1">
                          <p className="text-sm font-medium text-gray-700 mb-2">Without Prepayments</p>
                          <p className="text-sm">Loan tenure: <span className="font-semibold">{standardTenure} years</span></p>
                          <p className="text-sm">Total interest: <span className="font-semibold">{formatCurrency(standardInterest)}</span></p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg flex-1">
                          <p className="text-sm font-medium text-green-700 mb-2">With Prepayments</p>
                          <p className="text-sm">Loan tenure: <span className="font-semibold">{actualTenure} years</span></p>
                          <p className="text-sm">Total interest: <span className="font-semibold">{formatCurrency(totalInterest)}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Tab list outside the card, as per user request */}
        <TabsList className="mb-6 grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger 
            value="calculator" 
            onClick={() => setActiveTab("calculator")}
            className={activeTab === "calculator" ? "bg-blue-600 text-white" : ""}
          >
            <CalculatorIcon className="mr-2 h-4 w-4" />
            Loan Summary
          </TabsTrigger>
          <TabsTrigger 
            value="amortization" 
            onClick={() => setActiveTab("amortization")}
            className={activeTab === "amortization" ? "bg-blue-600 text-white" : ""}
          >
            <TableProperties className="mr-2 h-4 w-4" />
            Amortization Schedule
          </TabsTrigger>
        </TabsList>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <Card className="p-6">

            <TabsContent value="calculator" className="space-y-6">
              {/* Year-wise Amortization Chart */}
              {showResults && Object.keys(amortizationChartData).length > 0 ? (
                <div className="bg-gray-100 border border-gray-300 shadow-lg rounded-lg p-6 text-gray-800">
                  <h3 className="text-xl font-semibold mb-5 flex items-center">
                    <BarChart4 className="mr-2 h-6 w-6 text-gray-600" />
                    Year-wise Amortization
                  </h3>
                  <ReactECharts 
                    option={amortizationChartData} 
                    style={{ height: '350px', width: '100%' }}
                  />
                  <div className="mt-4 p-3 bg-gray-200 rounded-lg text-sm">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-gray-600" />
                      <span>
                        See how your loan is gradually paid off over time. In the early years, most of your payment goes toward interest,
                        but as time progresses, more of your EMI reduces your principal.
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center p-16 bg-gray-50 rounded-lg border border-dashed">
                  <div className="text-center space-y-3">
                    <div className="inline-flex p-4 bg-blue-50 rounded-full">
                      <BarChart4 className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700">Visualization Will Appear Here</h3>
                    <p className="text-sm text-gray-500 max-w-xs">
                      Click 'Calculate Your EMI' to see detailed payment visualizations.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Prepayment Comparison */}
              {showResults && interestSaved > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-gray-100 border border-gray-300 shadow-lg rounded-lg p-6 text-gray-800">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <TrendingDown className="mr-2 h-6 w-6 text-green-600" />
                      Prepayment Benefits
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-200 rounded-lg p-4 border border-gray-300">
                        <p className="text-gray-700 text-sm font-medium mb-1">Interest Saved</p>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(interestSaved)}</p>
                        <p className="text-gray-600 text-xs mt-1">
                          {((interestSaved / standardInterest) * 100).toFixed(1)}% of total interest
                        </p>
                      </div>
                      
                      <div className="bg-gray-200 rounded-lg p-4 border border-gray-300">
                        <p className="text-gray-700 text-sm font-medium mb-1">Time Saved</p>
                        <p className="text-2xl font-bold text-green-600">{timeSaved.toFixed(1)} years</p>
                        <p className="text-gray-600 text-xs mt-1">
                          {((timeSaved / standardTenure) * 100).toFixed(1)}% of loan term
                        </p>
                      </div>
                      
                      <div className="bg-gray-200 rounded-lg p-4 border border-gray-300">
                        <p className="text-gray-700 text-sm font-medium mb-1">Effective Interest Rate</p>
                        <p className="text-2xl font-bold text-green-600">{((totalInterest / loanAmount) * 100 / actualTenure).toFixed(2)}%</p>
                        <p className="text-gray-600 text-xs mt-1">
                          vs. {interestRate}% nominal rate
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <LightbulbIcon className="h-4 w-4 mr-1 text-yellow-500" /> Smart Insight
                      </h4>
                      <p className="text-sm">
                        With your {prepaymentFrequency} prepayment of {formatCurrency(prepaymentAmount)}, 
                        you'll pay off your loan {timeSaved.toFixed(1)} years earlier and save {formatCurrency(interestSaved)} in interest!
                        That's equivalent to {Math.round(interestSaved / emi)} months of EMI payments.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
              
              {/* Tax Benefits Section */}
              {showResults && showTaxBenefits ? (
                <div className="bg-gray-100 border border-gray-300 shadow-lg rounded-lg p-6 text-gray-800">
                  <h3 className="text-xl font-semibold mb-5 flex items-center">
                    <Landmark className="mr-2 h-6 w-6 text-blue-600" />
                    Tax Benefits (First Year)
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-200 rounded-lg p-4 border border-gray-300">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-gray-700 text-sm font-medium">Interest Deduction</p>
                        <Info className="h-4 w-4 text-gray-500" />
                      </div>
                      <p className="text-2xl font-bold text-blue-600">₹{Math.round(taxDeductionValues.interestDeduction).toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-gray-200 rounded-lg p-4 border border-gray-300">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-gray-700 text-sm font-medium">Principal Deduction</p>
                        <Info className="h-4 w-4 text-gray-500" />
                      </div>
                      <p className="text-2xl font-bold text-blue-600">₹{Math.round(taxDeductionValues.principalDeduction).toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-gray-200 rounded-lg p-4 border border-gray-300">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-gray-700 text-sm font-medium">Additional Interest</p>
                        <Info className="h-4 w-4 text-gray-500" />
                      </div>
                      <p className="text-2xl font-bold text-blue-600">₹{Math.round(taxDeductionValues.additionalInterestDeduction).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
                    <h4 className="flex items-center text-base font-semibold text-gray-800">
                      <DollarSign className="h-5 w-5 mr-1 text-blue-600" /> Estimated Tax Savings (First Year)
                    </h4>
                    <p className="mt-2 text-gray-700">
                      Based on your tax slab of Old Regime - {taxSlab}%, your estimated tax saving for the first year is <span className="font-bold">₹{Math.round(taxSavings).toLocaleString()}</span>
                    </p>
                    <p className="mt-1 text-gray-800 font-medium">
                      This reduces your effective monthly cost to <span className="font-bold">₹{Math.round(emi - (taxSavings/12)).toLocaleString()}</span> after tax benefits.
                    </p>
                  </div>
                </div>
              ) : null}
              

              
              {/* Home Loan Tips - moved outside tabs */}
              
              {/* Income Tax Benefits Accordion */}
              {showResults && showTaxBenefits ? (
                <Accordion type="single" collapsible className="bg-gray-100 border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                  <AccordionItem value="income-tax" className="border-b-0">
                    <AccordionTrigger className="px-6 py-4 text-gray-800 hover:no-underline hover:bg-gray-200">
                      <div className="flex items-center gap-2">
                        <Landmark className="h-5 w-5 text-blue-600" />
                        <span className="text-lg font-semibold">Income Tax Benefits</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 text-gray-700">
                      <h4 className="text-gray-800 text-lg font-semibold mb-4">Available Income Tax Benefits:</h4>
                      
                      <div className="space-y-3">
                        <p><span className="font-semibold text-blue-600">Section 24(b):</span> Interest paid on housing loan (up to ₹2,00,000 per year)</p>
                        <p><span className="font-semibold text-blue-600">Section 80C:</span> Principal repayment (up to ₹1,50,000 per year along with other eligible investments)</p>
                        <p><span className="font-semibold text-blue-600">Section 80EE:</span> Additional interest deduction for first-time homebuyers (up to ₹50,000 per year)</p>
                        <p><span className="font-semibold text-blue-600">Section 80EEA:</span> Additional interest deduction for affordable housing (up to ₹1,50,000 per year)</p>
                      </div>
                      
                      <div className="mt-4 grid gap-3">
                        <div className="flex items-center">
                          <div className="flex-1">
                            <Label className="text-gray-800 mb-1 block">Income Tax Slab</Label>
                            <select 
                              className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-800"
                              value={`Old Regime - ${taxSlab}%`}
                              onChange={(e) => {
                                const value = parseInt(e.target.value.split(" - ")[1]);
                                setTaxSlab(value);
                              }}
                            >
                              <option>Old Regime - 10%</option>
                              <option>Old Regime - 20%</option>
                              <option>Old Regime - 30%</option>
                              <option>New Regime - 5%</option>
                              <option>New Regime - 10%</option>
                              <option>New Regime - 15%</option>
                              <option>New Regime - 20%</option>
                              <option>New Regime - 30%</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <Checkbox 
                            id="first-time-buyer" 
                            checked={isFirstTimeHomeBuyer}
                            onCheckedChange={(checked) => setIsFirstTimeHomeBuyer(checked as boolean)}
                            className="border-gray-300 text-blue-600"
                          />
                          <Label htmlFor="first-time-buyer" className="text-gray-800 cursor-pointer">
                            First-time Home Buyer <Info className="h-4 w-4 inline ml-1 text-gray-500" />
                          </Label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="affordable-housing" 
                            checked={isAffordableHousing}
                            onCheckedChange={(checked) => setIsAffordableHousing(checked as boolean)}
                            className="border-gray-300 text-blue-600"
                          />
                          <Label htmlFor="affordable-housing" className="text-gray-800 cursor-pointer">
                            Affordable Housing (Property value ≤ ₹45 lakhs) <Info className="h-4 w-4 inline ml-1 text-gray-500" />
                          </Label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : null}
              
              {/* Key points - moved outside tabs */}
            </TabsContent>

            <TabsContent value="amortization">
              {showResults && amortizationSchedule.length > 0 ? (
                <>
                  <div className="bg-white border shadow-sm rounded-lg p-4 mb-6">
                    <div className="overflow-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gradient-to-r from-blue-50 to-blue-100">
                            <th className="p-3 text-left border border-blue-100">Year</th>
                            <th className="p-3 text-left border border-blue-100">Payment No.</th>
                            <th className="p-3 text-right border border-blue-100">EMI</th>
                            <th className="p-3 text-right border border-blue-100">Principal</th>
                            <th className="p-3 text-right border border-blue-100">Interest</th>
                            <th className="p-3 text-right border border-blue-100">Prepayment</th>
                            <th className="p-3 text-right border border-blue-100">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {amortizationSchedule.map((entry, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-blue-50 transition-colors"}>
                              <td className="p-3 border">{entry.year}</td>
                              <td className="p-3 border">{entry.period}</td>
                              <td className="p-3 text-right border font-medium">{formatCurrency(entry.payment)}</td>
                              <td className="p-3 text-right border text-blue-700">{formatCurrency(entry.principalPayment)}</td>
                              <td className="p-3 text-right border text-amber-600">{formatCurrency(entry.interestPayment)}</td>
                              <td className="p-3 text-right border text-green-600">{formatCurrency(entry.prepayment || 0)}</td>
                              <td className="p-3 text-right border font-medium">{formatCurrency(entry.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 border">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-blue-600" />
                        <span>
                          The amortization schedule shows how your loan balance reduces over time. Key rows are displayed 
                          to illustrate the loan payoff trajectory. Interest is calculated on a reducing balance basis.
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center p-16 bg-gray-50 rounded-lg border border-dashed">
                  <div className="text-center space-y-3">
                    <div className="inline-flex p-4 bg-blue-50 rounded-full">
                      <BarChart4 className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700">Amortization Schedule Will Appear Here</h3>
                    <p className="text-sm text-gray-500 max-w-xs">
                      Click 'Calculate Your EMI' to see your detailed loan repayment schedule.
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
        
        {/* These sections are outside the tabs, common to both tabs */}
        {showResults ? (
          <div className="mt-6 space-y-6">
            {/* Home Loan Tips - Combined with Key Points */}
            <div className="bg-white border shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <LightbulbIcon className="mr-2 h-6 w-6 text-yellow-500" />
                Home Loan Tips
              </h3>
              <ol className="space-y-4 list-decimal list-inside text-gray-700">
                <li>
                  <span className="font-semibold text-gray-800">Part-prepayments:</span> Regular monthly prepayment of even small amounts can significantly reduce your interest burden and loan tenure
                </li>
                <li>
                  <span className="font-semibold text-gray-800">Prepayment strategies:</span> Choose the prepayment option that works best for you:
                  <ul className="ml-6 mt-2 space-y-2">
                    <li className="text-gray-600">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Monthly prepayments: Small regular amounts that compound over time
                    </li>
                    <li className="text-gray-600">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Annual prepayments: Larger lump sums from bonuses or tax refunds
                    </li>
                    <li className="text-gray-600">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Custom schedule: Target specific months based on your financial situation
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold text-gray-800">Loan tenure:</span> Shorter loan tenure means higher EMI but much lower total interest cost
                </li>
                <li>
                  <span className="font-semibold text-gray-800">Tax benefits:</span> Utilize all available deductions under Sections 24(b), 80C, 80EE, and 80EEA as applicable
                </li>
                <li>
                  <span className="font-semibold text-gray-800">Rate negotiation:</span> Compare offers from multiple lenders and negotiate for the best interest rate
                </li>
              </ol>
              
              <div className="border-t border-gray-200 mt-6 pt-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Key Points to Note</h4>
                <ul className="space-y-4">
                  <li className="flex items-start bg-gray-50 p-3 rounded-lg">
                    <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Home loan EMIs are calculated on a reducing balance basis where interest is computed on the outstanding loan amount.</span>
                  </li>
                  <li className="flex items-start bg-gray-50 p-3 rounded-lg">
                    <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Pre-payment of loans can significantly reduce your interest burden and loan tenure.</span>
                  </li>
                  <li className="flex items-start bg-gray-50 p-3 rounded-lg">
                    <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Tax benefits under Section 24 allow deduction of up to ₹2 lakhs per year on interest paid for self-occupied property.</span>
                  </li>
                  <li className="flex items-start bg-gray-50 p-3 rounded-lg">
                    <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Principal repayment qualifies for tax deduction under Section 80C up to ₹1.5 lakhs per year.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Bank Interest Rates Comparison */}
            <div className="bg-gray-100 border border-gray-300 shadow-lg rounded-lg overflow-hidden">
              <div className="p-5 border-b border-gray-300">
                <h3 className="text-xl font-semibold flex items-center text-gray-800">
                  <Building className="mr-2 h-6 w-6 text-blue-600" />
                  Home Loan Interest Rates Comparison
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700 text-left">
                      <th className="p-3 border-b border-gray-300">Bank</th>
                      <th className="p-3 border-b border-gray-300">Interest Rate (%)</th>
                      <th className="p-3 border-b border-gray-300">Processing Fee</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-300">SBI Home Loan</td>
                      <td className="p-3 border-b border-gray-300">8.40 - 9.15</td>
                      <td className="p-3 border-b border-gray-300">0.35% (Max ₹10,000)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-300">HDFC Home Loan</td>
                      <td className="p-3 border-b border-gray-300">8.50 - 9.20</td>
                      <td className="p-3 border-b border-gray-300">0.50% (Max ₹15,000)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-300">ICICI Home Loan</td>
                      <td className="p-3 border-b border-gray-300">8.75 - 9.25</td>
                      <td className="p-3 border-b border-gray-300">0.50% (Max ₹15,000)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-300">Axis Bank Home Loan</td>
                      <td className="p-3 border-b border-gray-300">8.60 - 9.35</td>
                      <td className="p-3 border-b border-gray-300">0.50% (Max ₹12,500)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-300">PNB Home Loan</td>
                      <td className="p-3 border-b border-gray-300">8.45 - 9.25</td>
                      <td className="p-3 border-b border-gray-300">0.35% (Max ₹11,500)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </CalculatorLayout>
  );
}