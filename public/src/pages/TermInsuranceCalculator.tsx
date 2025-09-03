import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Slider } from "../components/ui/slider";
import { useToast } from "../hooks/use-toast";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import {
  Shield, FileCog, AlertTriangle, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  PieChart as ChartPie, BarChart4, LineChart, Save, User, Info, HelpCircle, Clock,
  ThumbsUp, Activity, Heart, UserPlus, IndianRupee, DollarSign, Settings, ArrowRight, LifeBuoy,
  Smile, Users, Sparkles, Medal, Home, CreditCard, FileCheck, Briefcase,
  CheckSquare, CheckCircle2, CircleDot
} from "lucide-react";
import ReactECharts from 'echarts-for-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell, Line
} from 'recharts';
import { useBudget } from "../contexts/BudgetContext";

type InsuranceCompany = {
  id: string;
  name: string;
  claimSettlementRatio: number;
  features: string[];
  riderOptions: string[];
  logoIcon: string;
  premiumMultiplier: number;
  foundedYear: number;
  solvencyRatio: number;
  customerRating: number;
  networkHospitals?: number;
  claimProcessingDays: number;
};

type PremiumEstimate = {
  company: InsuranceCompany;
  annual: number;
  monthly: number;
};

export default function TermInsuranceCalculator() {
  const { toast } = useToast();
  const { budgetData, updateExpense } = useBudget();
  
  // Form state
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [smoker, setSmoker] = useState<boolean>(false);
  // Additional health risk factors
  const [alcohol, setAlcohol] = useState<"none" | "occasional" | "regular">("none");
  const [familyHistory, setFamilyHistory] = useState<string[]>([]);
  const [bmi, setBmi] = useState<"normal" | "overweight" | "obese" | "underweight">("normal");
  const [occupation, setOccupation] = useState<"low" | "medium" | "high">("low");
  const [preExistingConditions, setPreExistingConditions] = useState<string[]>([]);
  const [showHealthFactors, setShowHealthFactors] = useState<boolean>(true);
  
  const [annualIncome, setAnnualIncome] = useState<string>(() => {
    // Initialize from Budget Buddy data if available
    return budgetData.monthlyIncome > 0 
      ? (budgetData.monthlyIncome * 12).toString() 
      : "1000000";
  });

  // Update annual income whenever Budget Buddy data changes
  useEffect(() => {
    if (budgetData.monthlyIncome > 0) {
      setAnnualIncome((budgetData.monthlyIncome * 12).toString());
    }
  }, [budgetData.monthlyIncome]);
  const [coverAmount, setCoverAmount] = useState<string>("10000000");
  const [coverageTerm, setCoverageTerm] = useState<string>("30");
  const [paymentTerm, setPaymentTerm] = useState<string>("regular");
  const [showBudgetIntegration, setShowBudgetIntegration] = useState<boolean>(false);
  
  // State for saved calculations
  const [savedCalculations, setSavedCalculations] = useState<{name: string, data: any}[]>([]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  
  // State for rider selection
  const [selectedRiders, setSelectedRiders] = useState<string[]>([]);
  
  // State for premium breakdown
  const [premiumBreakdown, setPremiumBreakdown] = useState<{category: string, amount: number, percentage: number}[]>([]);
  
  // State for company comparison analytics
  const [comparisonMetric, setComparisonMetric] = useState<"premium" | "claimSettlement" | "customerRating" | "processing">("premium");
  
  // Pagination for company comparison
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  
  // Health risk assessment
  const [healthRiskScore, setHealthRiskScore] = useState<number | null>(null);
  
  // Result state
  const [premiumEstimates, setPremiumEstimates] = useState<PremiumEstimate[] | null>(null);
  
  // Insurance companies data with enhanced details
  const insuranceCompanies: InsuranceCompany[] = [
    {
      id: "hdfc",
      name: "HDFC Life",
      claimSettlementRatio: 97.8,
      features: ["Terminal Illness Benefit", "Accidental Death Benefit", "Premium Waiver"],
      riderOptions: ["Critical Illness Cover", "Accidental Death Benefit", "Disability Benefit", "Income Benefit"],
      logoIcon: "shield",
      premiumMultiplier: 1.0,
      foundedYear: 2000,
      solvencyRatio: 2.01,
      customerRating: 4.2,
      networkHospitals: 10500,
      claimProcessingDays: 7
    },
    {
      id: "lic",
      name: "LIC",
      claimSettlementRatio: 98.7,
      features: ["Maturity Benefit Option", "Critical Illness Rider", "Guaranteed Returns"],
      riderOptions: ["Accidental Death Benefit", "Disability Benefit", "Critical Illness", "Premium Waiver"],
      logoIcon: "shield",
      premiumMultiplier: 0.95,
      foundedYear: 1956,
      solvencyRatio: 1.55,
      customerRating: 4.0,
      networkHospitals: 7200,
      claimProcessingDays: 15
    },
    {
      id: "max",
      name: "Max Life",
      claimSettlementRatio: 99.2,
      features: ["Premium Break Option", "Spouse Coverage", "Job Loss Protection"],
      riderOptions: ["Critical Illness Cover", "Premium Waiver", "Accelerated Sum Assured", "Income Benefit"],
      logoIcon: "shield",
      premiumMultiplier: 1.05,
      foundedYear: 2000,
      solvencyRatio: 2.32,
      customerRating: 4.5,
      networkHospitals: 9100,
      claimProcessingDays: 6
    },
    {
      id: "icici",
      name: "ICICI Prudential",
      claimSettlementRatio: 97.9,
      features: ["Tax Benefits", "Lifestage Protection", "Income Replacement"],
      riderOptions: ["Accidental Death & Disability", "Critical Illness", "Waiver of Premium", "Hospital Cash Benefit"],
      logoIcon: "shield",
      premiumMultiplier: 0.98,
      foundedYear: 2000,
      solvencyRatio: 1.95,
      customerRating: 4.1,
      networkHospitals: 8700,
      claimProcessingDays: 9
    },
    {
      id: "tata",
      name: "Tata AIA",
      claimSettlementRatio: 98.1,
      features: ["Critical Illness Cover", "Accidental Death Benefit", "Disability Cover"],
      riderOptions: ["Critical Illness Benefit", "Accidental Total Permanent Disability", "Income Benefit", "Return of Premium"],
      logoIcon: "shield",
      premiumMultiplier: 1.02,
      foundedYear: 2001,
      solvencyRatio: 2.12,
      customerRating: 4.3,
      networkHospitals: 9500,
      claimProcessingDays: 8
    },
    {
      id: "sbi",
      name: "SBI Life",
      claimSettlementRatio: 98.0,
      features: ["Return of Premium Option", "Level Cover", "Life Stage Benefit"],
      riderOptions: ["Accidental Death Benefit", "Critical Illness Benefit", "Term Rider", "Accidental Total & Permanent Disability"],
      logoIcon: "shield",
      premiumMultiplier: 0.96,
      foundedYear: 2001,
      solvencyRatio: 2.09,
      customerRating: 4.1,
      networkHospitals: 8000,
      claimProcessingDays: 10
    },
    {
      id: "bajaj",
      name: "Bajaj Allianz",
      claimSettlementRatio: 98.5,
      features: ["Child Education Support", "Index-Linked Cover", "Return of Premium"],
      riderOptions: ["Critical Illness Benefit", "Accidental Permanent Total/Partial Disability", "Hospital Cash Benefit", "Surgical Cash Benefit"],
      logoIcon: "shield",
      premiumMultiplier: 0.98,
      foundedYear: 2001,
      solvencyRatio: 2.14,
      customerRating: 4.2,
      networkHospitals: 7800,
      claimProcessingDays: 8
    }
  ];
  
  // Charts data
  const generateAgeImpactData = () => {
    const data = [];
    const baseAge = age;
    const baseCover = parseFloat(coverAmount);
    const baseTerm = parseInt(coverageTerm);
    
    // Calculate premiums for different ages
    for (let i = Math.max(18, baseAge - 10); i <= Math.min(65, baseAge + 10); i += 5) {
      const ageFactor = 1 + (i - 25) * 0.05;
      const genderFactor = gender === "male" ? 1.2 : 1.0;
      const smokerFactor = smoker ? 1.5 : 1.0;
      const termFactor = 1 + baseTerm * 0.01;
      
      const premium = Math.round((baseCover * 0.5 * ageFactor * genderFactor * smokerFactor * termFactor) / 1000);
      
      data.push({
        age: i,
        premium: premium
      });
    }
    
    return data;
  };
  
  const generateCoverageComparisonData = () => {
    if (!annualIncome) return [];
    
    const incomeNum = parseFloat(annualIncome);
    return [
      { name: '5x Income', value: incomeNum * 5 },
      { name: '10x Income', value: incomeNum * 10 },
      { name: '15x Income', value: incomeNum * 15 },
      { name: '20x Income', value: incomeNum * 20 }
    ];
  };
  
  const generateClaimSettlementData = () => {
    return insuranceCompanies.map(company => ({
      name: company.name,
      value: company.claimSettlementRatio
    }));
  };
  
  // Function to calculate age-based recommended coverage
  const calculateRecommendedCoverage = () => {
    if (!annualIncome) return null;
    
    const incomeNum = parseFloat(annualIncome);
    let multiplier = 10; // Default for ages 18-30
    
    if (age > 30 && age <= 40) multiplier = 12;
    else if (age > 40 && age <= 50) multiplier = 15;
    else if (age > 50) multiplier = 7;
    
    return incomeNum * multiplier;
  };
  
  // Check if Budget Buddy has income data
  const hasBudgetData = budgetData.monthlyIncome > 0;
  
  // Calculate premium estimates
  const calculatePremiums = () => {
    if (!age || !annualIncome || !coverAmount || !coverageTerm) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to calculate premium estimates.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    const incomeNum = parseFloat(annualIncome);
    const coverNum = parseFloat(coverAmount);
    const termNum = parseFloat(coverageTerm);
    
    // Enhanced formula that includes all health factors
    // (Cover Amount * Base Rate * Age Factor * Gender Factor * Lifestyle Factors * Health Factors * Term Factor) / 1000
    
    const baseRate = 0.5; // Base rate per 1000 of cover
    const ageFactor = 1 + (age - 25) * 0.05; // Age factor increases by 5% for every year above 25
    const genderFactor = gender === "male" ? 1.2 : 1.0; // Males typically pay higher premiums
    
    // Lifestyle factors
    const smokerFactor = smoker ? 1.5 : 1.0; // Smokers pay higher premiums
    const alcoholFactor = alcohol === "none" ? 1.0 : (alcohol === "occasional" ? 1.15 : 1.35); // Alcohol consumption impact
    const occupationFactor = occupation === "low" ? 1.0 : (occupation === "medium" ? 1.1 : 1.3); // Occupation risk impact
    
    // Health factors
    const bmiFactor = bmi === "normal" ? 1.0 : (bmi === "underweight" ? 1.1 : (bmi === "overweight" ? 1.2 : 1.4)); // BMI impact
    const familyHistoryFactor = 1 + (familyHistory.length * 0.08); // Each condition in family history adds 8%
    const preExistingConditionsFactor = 1 + (preExistingConditions.length * 0.15); // Each pre-existing condition adds 15%
    
    const termFactor = 1 + termNum * 0.01; // Longer terms increase premium slightly
    const paymentTermFactor = paymentTerm === "regular" ? 1.0 : (paymentTerm === "limited" ? 1.2 : 1.5);
    
    // Add rider impact
    const riderFactor = 1 + (selectedRiders.length * 0.05); // Each rider adds 5% to the premium
    
    // Combined lifestyle and health factor
    const lifestyleFactor = smokerFactor * alcoholFactor * occupationFactor;
    const healthFactor = bmiFactor * familyHistoryFactor * preExistingConditionsFactor;
    
    // Check if cover amount is reasonable based on income
    if (coverNum > incomeNum * 20) {
      toast({
        title: "High Coverage Amount",
        description: "The coverage amount seems high compared to your income. Consider reducing it for more affordable premiums.",
        duration: 5000,
      });
    }
    
    // Calculate for each company
    const estimates = insuranceCompanies.map(company => {
      const annualPremium = Math.round((coverNum * baseRate * ageFactor * genderFactor * lifestyleFactor * healthFactor * termFactor * company.premiumMultiplier * paymentTermFactor * riderFactor) / 1000);
      
      return {
        company,
        annual: annualPremium,
        monthly: Math.round(annualPremium / 12)
      };
    });
    
    // Sort by annual premium (ascending)
    estimates.sort((a, b) => a.annual - b.annual);
    
    setPremiumEstimates(estimates);
    
    toast({
      title: "Premium Estimates Calculated",
      description: "We've estimated premiums from top insurance providers.",
      duration: 3000,
    });
  };
  
  // Calculate premium breakdown when estimates are available
  useEffect(() => {
    if (premiumEstimates && premiumEstimates.length > 0) {
      const premium = premiumEstimates[0].annual;
      
      // Create a premium breakdown
      setPremiumBreakdown([
        { category: "Mortality Cost", amount: premium * 0.65, percentage: 65 },
        { category: "Admin Expenses", amount: premium * 0.15, percentage: 15 },
        { category: "Distribution Cost", amount: premium * 0.10, percentage: 10 },
        { category: "Profit Margin", amount: premium * 0.10, percentage: 10 }
      ]);
      
      // Calculate comprehensive health risk score based on all factors
      let riskScore = 40; // Base score
      
      // Age impact (higher age = higher risk)
      riskScore += (age - 30) * 1.5;
      
      // Gender impact (males generally have higher mortality rates)
      if (gender === "male") riskScore += 5;
      
      // Lifestyle factors
      if (smoker) riskScore += 20;
      if (alcohol === "occasional") riskScore += 5;
      if (alcohol === "regular") riskScore += 15;
      if (occupation === "medium") riskScore += 3;
      if (occupation === "high") riskScore += 8;
      
      // Health factors
      if (bmi === "underweight") riskScore += 5;
      if (bmi === "overweight") riskScore += 8;
      if (bmi === "obese") riskScore += 15;
      
      // Family history impact
      riskScore += familyHistory.length * 4;
      
      // Pre-existing conditions impact
      riskScore += preExistingConditions.length * 6;
      
      // Normalize between 0-100
      riskScore = Math.max(0, Math.min(100, riskScore));
      
      setHealthRiskScore(riskScore);
      
      // Auto-show budget integration if user has budget data
      if (budgetData.monthlyIncome > 0) {
        setShowBudgetIntegration(true);
      }
    }
  }, [premiumEstimates, budgetData.monthlyIncome]);
  
  // Save calculation function
  const saveCalculation = () => {
    if (!saveName.trim() || !premiumEstimates) return;
    
    const calculationData = {
      age,
      gender,
      smoker,
      annualIncome,
      coverAmount,
      coverageTerm,
      paymentTerm,
      premiumEstimates: premiumEstimates[0], // Save the best premium estimate
      date: new Date().toISOString()
    };
    
    setSavedCalculations([...savedCalculations, { name: saveName, data: calculationData }]);
    setSaveDialogOpen(false);
    setSaveName("");
    
    toast({
      title: "Calculation Saved",
      description: `Your calculation has been saved as "${saveName}"`,
      duration: 3000,
    });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const getStarRating = (rating: number) => {
    const percentage = (rating / 100) * 5; // Convert percentage to 5-star scale
    const fullStars = Math.floor(percentage);
    const hasHalfStar = percentage - fullStars >= 0.5;
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="material-icons text-yellow-400 text-sm">star</span>
        ))}
        {hasHalfStar && <span className="material-icons text-yellow-400 text-sm">star_half</span>}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <span key={`empty-${i}`} className="material-icons text-yellow-400 text-sm">star_outline</span>
        ))}
      </div>
    );
  };
  
  const recommendedCover = annualIncome ? parseFloat(annualIncome) * 10 : 0;
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  return (
    <div className="px-4 py-3">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button 
            onClick={() => window.history.back()}
            className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h2 className="text-xl font-semibold">Term Insurance Calculator</h2>
        </div>
        
        {premiumEstimates && (
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setSaveDialogOpen(true)}
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </Button>
        )}
      </div>
      
      <Alert className="mb-4 bg-blue-50 border-blue-200">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Disclaimer</AlertTitle>
        <AlertDescription>
          This calculator provides estimates for educational purposes only. These are not actual premium quotes. 
          Please consult with a certified insurance advisor for personalized recommendations.
        </AlertDescription>
      </Alert>
      
      {!hasBudgetData && (
        <Alert className="mb-4 bg-amber-50 border-amber-200">
          <Info className="h-4 w-4 text-amber-500" />
          <AlertTitle>Budget Data Required</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <p>
              For more accurate recommendations, please update your monthly income in Budget Buddy first. 
              This will help us provide personalized coverage recommendations and budget integration.
            </p>
            <Button 
              size="sm" 
              variant="outline" 
              className="self-start border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={() => window.location.href = '/budget-buddy'}
            >
              Go to Budget Buddy
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Card className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Your Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <Label htmlFor="age">Your Age</Label>
                      <span className="text-sm font-medium">{age} years</span>
                    </div>
                    <Slider
                      id="age-slider"
                      min={18}
                      max={65}
                      step={1}
                      value={[age]}
                      onValueChange={(value) => setAge(value[0])}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>18 years</span>
                      <span>65 years</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Gender</Label>
                    <RadioGroup value={gender} onValueChange={(value) => setGender(value as "male" | "female")} className="flex space-x-4 mt-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="cursor-pointer">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="cursor-pointer">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label>Smoker</Label>
                    <RadioGroup value={smoker ? "yes" : "no"} onValueChange={(value) => setSmoker(value === "yes")} className="flex space-x-4 mt-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="non-smoker" />
                        <Label htmlFor="non-smoker" className="cursor-pointer">Non-Smoker</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="smoker" />
                        <Label htmlFor="smoker" className="cursor-pointer">Smoker</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <Label htmlFor="annual-income">Annual Income (₹)</Label>
                      {hasBudgetData && (
                        <span className="text-xs text-green-600 font-medium flex items-center">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Using 12x monthly income from Budget Buddy
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Input
                        id="annual-income"
                        type="number"
                        value={annualIncome}
                        onChange={(e) => !hasBudgetData && setAnnualIncome(e.target.value)}
                        placeholder="Enter your annual income"
                        className={hasBudgetData ? "border-green-200 bg-green-50 pr-[120px]" : ""}
                        readOnly={hasBudgetData}
                      />
                      {hasBudgetData && (
                        <Button 
                          size="sm" 
                          className="absolute right-0 top-0 h-full rounded-l-none text-xs text-white bg-blue-600 hover:bg-blue-700 flex items-center border-0"
                          onClick={() => window.location.href = '/budget-buddy'}
                        >
                          <IndianRupee className="h-3 w-3 mr-1" />
                          <span>Update Income</span>
                        </Button>
                      )}
                    </div>
                    {hasBudgetData && (
                      <p className="text-xs text-gray-500 mt-1">
                        <Info className="h-3 w-3 inline-block mr-1" />
                        To change your income, please update it in Budget Buddy
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <Label>Health & Lifestyle Factors</Label>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-primary text-xs font-medium"
                        onClick={() => setShowHealthFactors(!showHealthFactors)}
                      >
                        {showHealthFactors ? "Hide Factors" : "Show Factors"}
                      </Button>
                    </div>
                    
                    {showHealthFactors && (
                      <div className="space-y-3 bg-gray-50 p-3 rounded-md mt-1">
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Label>Alcohol Consumption</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-3.5 w-3.5 text-blue-500 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[250px]">
                                  <p>Regular alcohol consumption can increase premiums by 20-40%. Moderate drinkers may pay 10-20% extra. Underwriters assess your drinking frequency and amount.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <RadioGroup value={alcohol} onValueChange={(value) => setAlcohol(value as "none" | "occasional" | "regular")} className="flex flex-wrap gap-x-4 mt-1">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="none" id="alcohol-none" />
                              <Label htmlFor="alcohol-none" className="cursor-pointer text-sm">None</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="occasional" id="alcohol-occasional" />
                              <Label htmlFor="alcohol-occasional" className="cursor-pointer text-sm">Occasional</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="regular" id="alcohol-regular" />
                              <Label htmlFor="alcohol-regular" className="cursor-pointer text-sm">Regular</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Label>Body Mass Index (BMI)</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-3.5 w-3.5 text-blue-500 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[250px]">
                                  <p>Your BMI significantly impacts premiums. Normal BMI (18.5-25) gets the best rates. Obesity can increase rates by 25-50%, while being underweight may add 10-15% due to associated health risks.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <RadioGroup value={bmi} onValueChange={(value) => setBmi(value as "normal" | "overweight" | "obese" | "underweight")} className="flex flex-wrap gap-x-4 mt-1">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="underweight" id="bmi-underweight" />
                              <Label htmlFor="bmi-underweight" className="cursor-pointer text-sm">Underweight</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="normal" id="bmi-normal" />
                              <Label htmlFor="bmi-normal" className="cursor-pointer text-sm">Normal</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="overweight" id="bmi-overweight" />
                              <Label htmlFor="bmi-overweight" className="cursor-pointer text-sm">Overweight</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="obese" id="bmi-obese" />
                              <Label htmlFor="bmi-obese" className="cursor-pointer text-sm">Obese</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Label>Occupation Risk Level</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-3.5 w-3.5 text-blue-500 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[250px]">
                                  <p>High-risk occupations (mining, construction, military) can increase premiums by 10-40%. Medium-risk jobs (drivers, factory workers) may add 5-15%. Low-risk desk jobs get standard rates.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <RadioGroup value={occupation} onValueChange={(value) => setOccupation(value as "low" | "medium" | "high")} className="flex space-x-4 mt-1">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="low" id="occupation-low" />
                              <Label htmlFor="occupation-low" className="cursor-pointer text-sm">Low Risk</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="medium" id="occupation-medium" />
                              <Label htmlFor="occupation-medium" className="cursor-pointer text-sm">Medium Risk</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="high" id="occupation-high" />
                              <Label htmlFor="occupation-high" className="cursor-pointer text-sm">High Risk</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Label>Family Medical History</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-3.5 w-3.5 text-blue-500 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[250px]">
                                  <p>Family history of diseases like heart conditions, cancer, or diabetes in first-degree relatives (parents or siblings) can increase premiums by 10-30% depending on the condition and your age.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="family-heart" 
                                checked={familyHistory.includes("heart")}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFamilyHistory([...familyHistory, "heart"]);
                                  } else {
                                    setFamilyHistory(familyHistory.filter(item => item !== "heart"));
                                  }
                                }}
                              />
                              <Label htmlFor="family-heart" className="cursor-pointer text-sm">Heart Disease</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="family-cancer" 
                                checked={familyHistory.includes("cancer")}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFamilyHistory([...familyHistory, "cancer"]);
                                  } else {
                                    setFamilyHistory(familyHistory.filter(item => item !== "cancer"));
                                  }
                                }}
                              />
                              <Label htmlFor="family-cancer" className="cursor-pointer text-sm">Cancer</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="family-diabetes" 
                                checked={familyHistory.includes("diabetes")}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFamilyHistory([...familyHistory, "diabetes"]);
                                  } else {
                                    setFamilyHistory(familyHistory.filter(item => item !== "diabetes"));
                                  }
                                }}
                              />
                              <Label htmlFor="family-diabetes" className="cursor-pointer text-sm">Diabetes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="family-stroke" 
                                checked={familyHistory.includes("stroke")}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFamilyHistory([...familyHistory, "stroke"]);
                                  } else {
                                    setFamilyHistory(familyHistory.filter(item => item !== "stroke"));
                                  }
                                }}
                              />
                              <Label htmlFor="family-stroke" className="cursor-pointer text-sm">Stroke</Label>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Label>Pre-existing Medical Conditions</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-3.5 w-3.5 text-blue-500 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[250px]">
                                  <p>Pre-existing conditions can increase premiums by 15-50% or result in exclusions. Chronic conditions like diabetes and hypertension have the most significant impact. Well-managed conditions may receive lower premium loadings.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="condition-hypertension" 
                                checked={preExistingConditions.includes("hypertension")}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setPreExistingConditions([...preExistingConditions, "hypertension"]);
                                  } else {
                                    setPreExistingConditions(preExistingConditions.filter(item => item !== "hypertension"));
                                  }
                                }}
                              />
                              <Label htmlFor="condition-hypertension" className="cursor-pointer text-sm">Hypertension</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="condition-diabetes" 
                                checked={preExistingConditions.includes("diabetes")}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setPreExistingConditions([...preExistingConditions, "diabetes"]);
                                  } else {
                                    setPreExistingConditions(preExistingConditions.filter(item => item !== "diabetes"));
                                  }
                                }}
                              />
                              <Label htmlFor="condition-diabetes" className="cursor-pointer text-sm">Diabetes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="condition-thyroid" 
                                checked={preExistingConditions.includes("thyroid")}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setPreExistingConditions([...preExistingConditions, "thyroid"]);
                                  } else {
                                    setPreExistingConditions(preExistingConditions.filter(item => item !== "thyroid"));
                                  }
                                }}
                              />
                              <Label htmlFor="condition-thyroid" className="cursor-pointer text-sm">Thyroid Disorder</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="condition-asthma" 
                                checked={preExistingConditions.includes("asthma")}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setPreExistingConditions([...preExistingConditions, "asthma"]);
                                  } else {
                                    setPreExistingConditions(preExistingConditions.filter(item => item !== "asthma"));
                                  }
                                }}
                              />
                              <Label htmlFor="condition-asthma" className="cursor-pointer text-sm">Asthma</Label>
                            </div>
                          </div>
                        </div>
                        
                        {(familyHistory.length > 0 || preExistingConditions.length > 0) && (
                          <div className="mt-2 text-xs text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
                            <AlertTriangle className="h-3 w-3 inline-block mr-1" />
                            <span>
                              Health factors may require additional medical evaluation during the insurance application process. 
                              Some conditions might lead to policy loading or exclusions.
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Coverage Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <Label htmlFor="cover-amount">Cover Amount (₹)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span 
                              className="text-xs text-primary cursor-pointer font-medium"
                              onClick={() => setCoverAmount(recommendedCover.toString())}
                            >
                              Set Recommended: {formatCurrency(recommendedCover)}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Based on 10x your annual income</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="cover-amount"
                      type="number"
                      value={coverAmount}
                      onChange={(e) => setCoverAmount(e.target.value)}
                      placeholder="Enter cover amount"
                      className={annualIncome && parseFloat(coverAmount) < parseFloat(annualIncome) * 10 ? "border-amber-300" : ""}
                    />
                    <div className="flex items-center mt-1">
                      <Info className="h-3 w-3 text-muted-foreground mr-1" />
                      <p className="text-xs text-gray-500 font-semibold">
                        Typically, 10-15x annual income provides optimal protection
                      </p>
                    </div>
                    
                    {annualIncome && parseFloat(coverAmount) < parseFloat(annualIncome) * 10 && (
                      <div className="mt-2 p-2 bg-amber-50 rounded text-sm text-amber-800 border border-amber-200">
                        <AlertTriangle className="h-4 w-4 inline-block mr-1 text-amber-500" />
                        <span className="font-medium">Coverage Warning: </span>
                        <span>
                          Your insurance coverage is less than 10x your annual income (₹{formatCurrency(parseFloat(annualIncome))}). 
                          Consider ₹{formatCurrency(parseFloat(annualIncome) * 10)} for better protection.
                        </span>
                      </div>
                    )}
                    
                    {!annualIncome && (
                      <div className="mt-2 p-2 bg-amber-50 rounded text-sm text-amber-800 border border-amber-200">
                        <AlertTriangle className="h-4 w-4 inline-block mr-1 text-amber-500" />
                        <span className="font-medium">Income Required: </span>
                        <span>
                          Please enter your annual income to get personalized coverage recommendations.
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <Label htmlFor="coverage-term">Coverage Term (Years)</Label>
                      <span className="text-sm font-medium">{coverageTerm} years</span>
                    </div>
                    <Slider
                      id="term-slider"
                      min={5}
                      max={40}
                      step={5}
                      value={[parseInt(coverageTerm)]}
                      onValueChange={(value) => setCoverageTerm(value[0].toString())}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>5 years</span>
                      <span>40 years</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Label htmlFor="payment-term">Premium Payment Term</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-blue-500 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[250px]">
                            <p>Regular Pay: Pay premiums throughout the policy term.<br/>Limited Pay: Higher premiums, but only for a shorter period (10-15 years).<br/>Single Pay: One large upfront payment with no future obligations.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select value={paymentTerm} onValueChange={setPaymentTerm}>
                      <SelectTrigger id="payment-term">
                        <SelectValue placeholder="Select payment term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Regular Pay (Until End of Term)</SelectItem>
                        <SelectItem value="limited">Limited Pay (For 10-15 Years)</SelectItem>
                        <SelectItem value="single">Single Pay (One-Time Payment)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <Label>Add Policy Riders (Optional)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-blue-500 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[250px]">
                            <p>Riders are additional benefits that enhance your base term policy. Each rider typically adds 5-10% to the premium but provides specialized coverage like critical illness benefits, income protection, or accidental death benefits.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {['Critical Illness Cover', 'Accidental Death Benefit', 'Disability Benefit', 'Income Benefit'].map((rider) => (
                        <div key={rider} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`rider-${rider}`} 
                            checked={selectedRiders.includes(rider)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedRiders([...selectedRiders, rider]);
                              } else {
                                setSelectedRiders(selectedRiders.filter(r => r !== rider));
                              }
                            }}
                          />
                          <Label htmlFor={`rider-${rider}`} className="text-xs cursor-pointer">{rider}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={calculatePremiums}>
                    Calculate Premium
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {premiumEstimates && (
          <>
            {showBudgetIntegration && budgetData.monthlyIncome > 0 && (
              <Card className="mb-4 border-green-200">
                <CardHeader className="pb-2 bg-green-50 border-b border-green-100">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Budget Buddy Integration
                  </CardTitle>
                  <CardDescription>
                    See how this insurance fits into your overall financial plan
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {premiumEstimates && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                          <h3 className="text-sm font-semibold mb-3 flex items-center">
                            <IndianRupee className="h-4 w-4 mr-1 text-green-600" />
                            Monthly Budget Impact
                          </h3>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Monthly Income:</span>
                              <span className="text-sm font-medium">{formatCurrency(budgetData.monthlyIncome)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Estimated Premium (Monthly):</span>
                              <span className="text-sm font-medium">{formatCurrency(premiumEstimates[0].monthly)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Percentage of Income:</span>
                              <span className="text-sm font-medium">
                                {((premiumEstimates[0].monthly / budgetData.monthlyIncome) * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>0%</span>
                              <span className={
                                ((premiumEstimates[0].monthly / budgetData.monthlyIncome) * 100) > 15 
                                  ? "text-red-500 font-medium" 
                                  : "text-gray-500"
                              }>
                                {((premiumEstimates[0].monthly / budgetData.monthlyIncome) * 100).toFixed(1)}%
                              </span>
                              <span>20%</span>
                            </div>
                            <Progress 
                              value={(premiumEstimates[0].monthly / budgetData.monthlyIncome) * 100 * 5} 
                              className={`h-2 bg-gray-100 ${
                                ((premiumEstimates[0].monthly / budgetData.monthlyIncome) * 100) > 15
                                  ? "data-[value]:bg-red-400"
                                  : ((premiumEstimates[0].monthly / budgetData.monthlyIncome) * 100) > 10
                                    ? "data-[value]:bg-amber-400"
                                    : "data-[value]:bg-green-400"
                              }`}
                            />
                            <p className="text-xs mt-2 text-gray-500">
                              {((premiumEstimates[0].monthly / budgetData.monthlyIncome) * 100) > 15 
                                ? "Premium seems high compared to your income. Consider adjusting coverage."
                                : ((premiumEstimates[0].monthly / budgetData.monthlyIncome) * 100) > 10
                                  ? "Premium is moderate relative to your income."
                                  : "Premium is within a reasonable range for your income."}
                            </p>
                            
                            <div className="mt-4 pt-3 border-t border-gray-100">
                              <p className="text-xs text-gray-600 font-medium mb-1">Ideal Insurance budget: 3-5% of monthly income</p>
                              <p className="text-xs text-gray-500">
                                {(((budgetData.expenses['Financial_Insurance'] || 0) + premiumEstimates[0].monthly) / budgetData.monthlyIncome) * 100 > 5 
                                  ? "Your insurance expenses will exceed ideal range after adding this premium."
                                  : "Your insurance expenses are within ideal budget range."}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                          <h3 className="text-sm font-semibold mb-3 flex items-center">
                            <Activity className="h-4 w-4 mr-1 text-green-600" />
                            Budget Allocation
                          </h3>
                          
                          <div className="flex gap-2 items-center mb-4">
                            <Button 
                              size="sm" 
                              className="text-xs h-8 text-white bg-blue-600 hover:bg-blue-700 border-0"
                              onClick={() => {
                                updateExpense('Financial', "Insurance", premiumEstimates[0].monthly);
                                toast({
                                  title: "Budget Updated",
                                  description: "Your insurance expense has been added to Budget Buddy.",
                                  duration: 3000,
                                });
                              }}
                            >
                              <IndianRupee className="h-3 w-3 mr-1" />
                              <span>Add to Budget</span>
                            </Button>
                            <p className="text-xs text-gray-500">
                              Add this premium to your monthly budget
                            </p>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-600">Current Insurance Budget:</span>
                                <span className="font-medium">{formatCurrency(budgetData.expenses['Financial_Insurance'] || 0)}</span>
                              </div>
                              <Progress 
                                value={((budgetData.expenses['Financial_Insurance'] || 0) / budgetData.monthlyIncome) * 100 * 5} 
                                className="h-1.5 bg-gray-100"
                              />
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-600">After Adding This Premium:</span>
                                <span className="font-medium">{formatCurrency((budgetData.expenses['Financial_Insurance'] || 0) + premiumEstimates[0].monthly)}</span>
                              </div>
                              <Progress 
                                value={(((budgetData.expenses['Financial_Insurance'] || 0) + premiumEstimates[0].monthly) / budgetData.monthlyIncome) * 100 * 5} 
                                className="h-1.5 bg-gray-100"
                              />
                            </div>
                          </div>
                          
                          {/* Recommendation info moved to Monthly Budget Impact section */}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Premium Analysis content moved directly onto main page */}
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Premium Breakdown</CardTitle>
                    <CardDescription>
                      How your premium is allocated
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={premiumBreakdown}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="amount"
                          >
                            {premiumBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Breakdown Details</h4>
                      <div className="space-y-2">
                        {premiumBreakdown.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              ></div>
                              <span className="text-sm">{item.category}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-medium">{formatCurrency(item.amount)}</span>
                              <span className="text-xs text-gray-500 ml-1">({item.percentage}%)</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Payment Term Comparison</CardTitle>
                    <CardDescription>
                      How premium payment options affect your costs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            {
                              term: 'Regular Pay',
                              annual: premiumEstimates ? premiumEstimates[0].annual : 0,
                              total: premiumEstimates ? premiumEstimates[0].annual * parseInt(coverageTerm) : 0
                            },
                            {
                              term: 'Limited Pay (12yr)',
                              annual: premiumEstimates ? Math.round(premiumEstimates[0].annual * 1.2) : 0,
                              total: premiumEstimates ? Math.round(premiumEstimates[0].annual * 1.2) * 12 : 0
                            },
                            {
                              term: 'Single Pay',
                              annual: premiumEstimates ? Math.round(premiumEstimates[0].annual * parseInt(coverageTerm) * 0.75) : 0,
                              total: premiumEstimates ? Math.round(premiumEstimates[0].annual * parseInt(coverageTerm) * 0.75) : 0
                            }
                          ]}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="term" />
                          <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                          <RTooltip formatter={(value) => formatCurrency(value as number)} />
                          <Legend />
                          <Bar name="Annual Premium" dataKey="annual" fill="#3b82f6">
                            {[
                              <Cell key="cell-0" fill={paymentTerm === "regular" ? '#1e40af' : '#3b82f6'} />,
                              <Cell key="cell-1" fill={paymentTerm === "limited" ? '#1e40af' : '#3b82f6'} />,
                              <Cell key="cell-2" fill={paymentTerm === "single" ? '#1e40af' : '#3b82f6'} />
                            ]}
                          </Bar>
                          <Bar name="Total Cost" dataKey="total" fill="#10b981">
                            {[
                              <Cell key="cell-3" fill={paymentTerm === "regular" ? '#047857' : '#10b981'} />,
                              <Cell key="cell-4" fill={paymentTerm === "limited" ? '#047857' : '#10b981'} />,
                              <Cell key="cell-5" fill={paymentTerm === "single" ? '#047857' : '#10b981'} />
                            ]}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="text-sm font-medium mb-2 text-blue-700">Payment Term Impact</h4>
                      <ul className="space-y-1 text-xs text-blue-700">
                        <li className="flex items-start">
                          <CircleDot className="h-3 w-3 mr-1 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span><span className="font-medium">Regular Pay:</span> Lower annual premiums but higher total cost over the full term</span>
                        </li>
                        <li className="flex items-start">
                          <CircleDot className="h-3 w-3 mr-1 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span><span className="font-medium">Limited Pay:</span> Higher annual premiums for a shorter duration (typically 10-15 years)</span>
                        </li>
                        <li className="flex items-start">
                          <CircleDot className="h-3 w-3 mr-1 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span><span className="font-medium">Single Pay:</span> One-time large payment with overall discounted total cost</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Age Impact Analysis</CardTitle>
                    <CardDescription>
                      How your age affects premium costs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={generateAgeImpactData()}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="age" label={{ value: "Age (years)", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "Annual Premium (₹)", angle: -90, position: "insideLeft" }} />
                          <RTooltip formatter={(value) => formatCurrency(value as number)} />
                          <Bar dataKey="premium" fill="#3498db" name="Annual Premium">
                            {generateAgeImpactData().map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.age === age ? '#2563eb' : '#93c5fd'} 
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Smoker vs. Non-Smoker Impact</CardTitle>
                    <CardDescription>
                      How smoking affects your premium
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            {
                              type: "Non-Smoker",
                              premium: premiumEstimates ? Math.round(premiumEstimates[0].annual / (smoker ? 1.5 : 1)) : 0,
                            },
                            {
                              type: "Smoker",
                              premium: premiumEstimates ? Math.round(premiumEstimates[0].annual * (smoker ? 1 : 1.5)) : 0,
                            }
                          ]}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="type" />
                          <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                          <RTooltip formatter={(value) => formatCurrency(value as number)} />
                          <Bar dataKey="premium" name="Annual Premium">
                            <Cell fill={!smoker ? "#10b981" : "#94a3b8"} />
                            <Cell fill={smoker ? "#ef4444" : "#94a3b8"} />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-2 p-3 rounded-lg border border-gray-100 bg-gray-50">
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">Impact: </span>
                        Smokers typically pay up to 50% more in premiums due to higher health risks. 
                        This can amount to {premiumEstimates ? formatCurrency(Math.round(premiumEstimates[0].annual * 0.5)) : "significantly"} more per year.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Coverage Comparison</CardTitle>
                    <CardDescription>
                      Compare your coverage against recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            {
                              name: 'Current',
                              amount: parseFloat(coverAmount)
                            },
                            {
                              name: '10x Income',
                              amount: annualIncome ? parseFloat(annualIncome) * 10 : 0
                            },
                            {
                              name: '15x Income',
                              amount: annualIncome ? parseFloat(annualIncome) * 15 : 0
                            }
                          ]}
                          layout="vertical"
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                          <YAxis dataKey="name" type="category" />
                          <RTooltip formatter={(value) => formatCurrency(value as number)} />
                          <Bar dataKey="amount" fill="#3498db">
                            {[
                              <Cell key="cell-0" fill="#3b82f6" />,
                              <Cell key="cell-1" fill="#10b981" />,
                              <Cell key="cell-2" fill="#8b5cf6" />
                            ]}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <h4 className="text-sm font-medium mb-2">Your Coverage</h4>
                        <p className="text-lg font-bold text-blue-600">₹{formatCurrency(parseFloat(coverAmount))}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <h4 className="text-sm font-medium mb-2">10x Annual Income</h4>
                        <p className="text-lg font-bold text-green-600">
                          {formatCurrency(calculateRecommendedCoverage() || 0)}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <h4 className="text-sm font-medium mb-2">Coverage Gap</h4>
                        <p className={`text-lg font-bold ${parseFloat(coverAmount) >= (annualIncome ? parseFloat(annualIncome) * 10 : 0) ? "text-green-600" : "text-red-600"}`}>
                          {parseFloat(coverAmount) >= (annualIncome ? parseFloat(annualIncome) * 10 : 0) 
                            ? "Adequate Coverage" 
                            : `-₹${formatCurrency(Math.abs(parseFloat(coverAmount) - (annualIncome ? parseFloat(annualIncome) * 10 : 0)))}`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Smart Selection Criteria Section */}
              <div className="grid grid-cols-1 gap-4 mb-4">
                <Card className="border-blue-100">
                  <CardHeader className="pb-2 bg-blue-50">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckSquare className="h-5 w-5 text-blue-600" />
                      Smart Criteria for Term Insurance Selection
                    </CardTitle>
                    <CardDescription>
                      Essential factors to consider before purchasing a term insurance policy
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-semibold mb-3 flex items-center text-blue-700">
                          <Shield className="h-4 w-4 mr-2" />
                          Mandatory Checks Before Buying
                        </h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Claim Settlement Ratio:</span> Verify the insurer's claim settlement ratio (ideally above 95%)</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Solvency Ratio:</span> Check financial health of the insurer (minimum 1.5 is recommended)</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Coverage Adequacy:</span> Ensure coverage is at least 10-15 times your annual income</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Term Duration:</span> Cover should extend at least until your planned retirement age</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Premium Payment Options:</span> Evaluate regular pay vs. limited pay based on your cash flow</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Policy Exclusions:</span> Review what scenarios are not covered by the policy</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold mb-3 flex items-center text-blue-700">
                          <FileCheck className="h-4 w-4 mr-2" />
                          Advanced Evaluation Criteria
                        </h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Rider Benefits:</span> Assess critical illness, accidental death, and disability riders</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Claim Processing Time:</span> Faster claim settlement (under 10 days) is preferable</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Premium Loading:</span> Check for additional charges for occupation, health or lifestyle</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Death Benefit Payout Options:</span> Lump sum vs. monthly income vs. combination</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Premium Waiver:</span> Availability of premium waiver in case of disability</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Policy Revival Options:</span> Terms for reinstating a lapsed policy</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-3 bg-amber-50 rounded-lg border border-amber-100">
                      <h4 className="text-sm font-medium mb-2 text-amber-800 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                        Important Reminders
                      </h4>
                      <ul className="space-y-1 text-xs text-amber-800">
                        <li className="flex items-start">
                          <CircleDot className="h-3 w-3 mr-1 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>Always disclose complete information about your health, lifestyle, and occupation to avoid claim rejection.</span>
                        </li>
                        <li className="flex items-start">
                          <CircleDot className="h-3 w-3 mr-1 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>Compare at least 3-5 policies before making a decision. Look beyond just premium costs.</span>
                        </li>
                        <li className="flex items-start">
                          <CircleDot className="h-3 w-3 mr-1 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>Read the policy document thoroughly, especially the fine print regarding claims and exclusions.</span>
                        </li>
                        <li className="flex items-start">
                          <CircleDot className="h-3 w-3 mr-1 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>Consider inflation when determining coverage amount for long-term protection needs.</span>
                        </li>
                      </ul>
                      <p className="text-xs mt-3 text-amber-800">This checklist is for educational purposes only. Please consult a certified insurance advisor for personalized recommendations.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Health Factors & Insurance Section */}
              <div className="grid grid-cols-1 gap-4 mb-4">
                <Card className="border-blue-100">
                  <CardHeader className="pb-2 bg-blue-50">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      Health Factors & Insurance
                    </CardTitle>
                    <CardDescription>
                      How lifestyle and health impact your premiums and what to do about it
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                        <h4 className="text-sm font-medium mb-2 text-blue-700">Impact on Premiums</h4>
                        <ul className="space-y-1 text-xs text-blue-700">
                          <li className="flex items-start">
                            <CircleDot className="h-3 w-3 mr-1 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Smoking/Tobacco:</span> 40-70% premium increase due to higher mortality risk</span>
                          </li>
                          <li className="flex items-start">
                            <CircleDot className="h-3 w-3 mr-1 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Alcohol Consumption:</span> Regular drinking can increase premiums by 20-40%</span>
                          </li>
                          <li className="flex items-start">
                            <CircleDot className="h-3 w-3 mr-1 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Family History:</span> Conditions like heart disease or cancer may add 10-30%</span>
                          </li>
                          <li className="flex items-start">
                            <CircleDot className="h-3 w-3 mr-1 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">BMI/Weight:</span> Obesity can increase premiums by 25-50%</span>
                          </li>
                          <li className="flex items-start">
                            <CircleDot className="h-3 w-3 mr-1 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Occupation:</span> High-risk jobs may lead to 10-40% loading</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                        <h4 className="text-sm font-medium mb-2 text-green-700">Steps to Improve Insurability</h4>
                        <ul className="space-y-1 text-xs text-green-700">
                          <li className="flex items-start">
                            <CircleDot className="h-3 w-3 mr-1 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Quit Smoking/Tobacco:</span> Most insurers offer lower rates after 12+ months tobacco-free</span>
                          </li>
                          <li className="flex items-start">
                            <CircleDot className="h-3 w-3 mr-1 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Moderate Drinking:</span> Reduce or eliminate alcohol for better rates</span>
                          </li>
                          <li className="flex items-start">
                            <CircleDot className="h-3 w-3 mr-1 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Weight Management:</span> Aim for BMI between 18.5-25 for optimal rates</span>
                          </li>
                          <li className="flex items-start">
                            <CircleDot className="h-3 w-3 mr-1 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Regular Check-ups:</span> Managing conditions like hypertension or diabetes improves insurability</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <h4 className="text-sm font-medium mb-2 text-amber-800">Avoiding Complications</h4>
                        <ul className="space-y-1 text-xs text-amber-800">
                          <li className="flex items-start">
                            <AlertTriangle className="h-3 w-3 mr-1 text-amber-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Full Disclosure:</span> Always provide complete and accurate health information</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-3 w-3 mr-1 text-amber-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Medical Tests:</span> Follow insurer guidelines for medical check-ups</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-3 w-3 mr-1 text-amber-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Pre-existing Conditions:</span> Disclose all medical conditions, even if controlled</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-3 w-3 mr-1 text-amber-500 flex-shrink-0 mt-0.5" />
                            <span><span className="font-medium">Waiting Periods:</span> Some policies impose waiting periods for specific conditions</span>
                          </li>
                        </ul>
                        <p className="text-xs mt-3 text-amber-800">Note: Non-disclosure of health conditions can lead to claim denial, even years after policy issuance.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
      
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Calculation</DialogTitle>
            <DialogDescription>
              Give your calculation a name to save it for future reference.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="save-name">Calculation Name</Label>
            <Input
              id="save-name"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="e.g. My Term Insurance Plan"
              className="mt-1"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveCalculation}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}