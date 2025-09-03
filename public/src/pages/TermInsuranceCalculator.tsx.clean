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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Checkbox } from "../components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import {
  Shield, FileCog, AlertTriangle, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  PieChart as ChartPie, BarChart4, LineChart, Save, User, Info, HelpCircle, Clock,
  ThumbsUp, Activity, Heart, UserPlus, DollarSign, Settings, ArrowRight, LifeBuoy,
  Smile, Users, Sparkles, Medal, Home, CreditCard, FileCheck, Briefcase
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
  const [annualIncome, setAnnualIncome] = useState<string>(() => {
    // Initialize from Budget Buddy data if available
    return budgetData.monthlyIncome > 0 
      ? (budgetData.monthlyIncome * 12).toString() 
      : "1000000";
  });
  const [coverAmount, setCoverAmount] = useState<string>("10000000");
  const [coverageTerm, setCoverageTerm] = useState<string>("30");
  const [paymentTerm, setPaymentTerm] = useState<string>("regular");
  const [showBudgetIntegration, setShowBudgetIntegration] = useState<boolean>(false);
  
  // State for tabs
  const [activeTab, setActiveTab] = useState("calculator");
  
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
    
    // Basic formula: (Cover Amount * Base Rate * Age Factor * Gender Factor * Smoker Factor * Term Factor) / 1000
    // This is a simplified formula for demonstration purposes
    
    const baseRate = 0.5; // Base rate per 1000 of cover
    const ageFactor = 1 + (age - 25) * 0.05; // Age factor increases by 5% for every year above 25
    const genderFactor = gender === "male" ? 1.2 : 1.0; // Males typically pay higher premiums
    const smokerFactor = smoker ? 1.5 : 1.0; // Smokers pay higher premiums
    const termFactor = 1 + termNum * 0.01; // Longer terms increase premium slightly
    const paymentTermFactor = paymentTerm === "regular" ? 1.0 : (paymentTerm === "limited" ? 1.2 : 1.5);
    
    // Add rider impact
    const riderFactor = 1 + (selectedRiders.length * 0.05); // Each rider adds 5% to the premium
    
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
      const annualPremium = Math.round((coverNum * baseRate * ageFactor * genderFactor * smokerFactor * termFactor * company.premiumMultiplier * paymentTermFactor * riderFactor) / 1000);
      
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
      
      // Calculate health risk score based on age and smoker status
      let riskScore = 50; // Base score
      
      // Age impact (higher age = higher risk)
      riskScore += (age - 30) * 1.5;
      
      // Smoker impact
      if (smoker) riskScore += 25;
      
      // Gender impact (males generally have higher mortality rates)
      if (gender === "male") riskScore += 5;
      
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
                      <Label htmlFor="annual-income">Annual Income (₹)</Label>
                      <Input
                        id="annual-income"
                        type="number"
                        value={annualIncome}
                        onChange={(e) => setAnnualIncome(e.target.value)}
                        placeholder="Enter your annual income"
                      />
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
                      <Label htmlFor="payment-term">Premium Payment Term</Label>
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
                      <Label className="mb-2 block">Add Policy Riders (Optional)</Label>
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
                    
                    <Button className="w-full" onClick={calculatePremiums}>
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
                              <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                              Monthly Budget Impact
                            </h3>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Monthly Income:</span>
                                <span className="text-sm font-medium">{formatCurrency(budgetData.monthlyIncome)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Current Expenses:</span>
                                <span className="text-sm font-medium">
                                  {formatCurrency(Object.values(budgetData.expenses).reduce((sum, amount) => sum + amount, 0))}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Suggested Premium:</span>
                                <span className="text-sm font-medium text-green-600">
                                  {formatCurrency(premiumEstimates[0].monthly)}
                                </span>
                              </div>
                              <div className="border-t border-gray-100 pt-2 mt-2">
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">Premium % of Income:</span>
                                  <span className="text-sm font-medium">
                                    {((premiumEstimates[0].monthly / budgetData.monthlyIncome) * 100).toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <p className="text-xs text-gray-500">
                                Ideally, insurance premiums should be 5-7% of your monthly income
                              </p>
                              
                              {premiumEstimates[0].monthly / budgetData.monthlyIncome > 0.07 ? (
                                <div className="mt-2 p-2 bg-amber-50 rounded text-xs text-amber-800">
                                  <AlertTriangle className="h-3 w-3 inline mr-1" />
                                  This premium may strain your budget. Consider adjusting coverage or exploring more affordable options.
                                </div>
                              ) : (
                                <div className="mt-2 p-2 bg-green-50 rounded text-xs text-green-800">
                                  <ThumbsUp className="h-3 w-3 inline mr-1" />
                                  This premium fits well within your budget! You're making a smart financial decision.
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-semibold mb-3 flex items-center">
                              <Briefcase className="h-4 w-4 mr-1 text-blue-600" />
                              Financial Planning Integration
                            </h3>
                            
                            <div className="space-y-4">
                              <div>
                                <p className="text-xs text-gray-600 font-medium">Current Insurance Budget:</p>
                                <p className="text-sm font-medium">
                                  {formatCurrency(budgetData.expenses['Financial_Insurance'] || 0)}
                                  <span className="text-xs text-gray-500 ml-1">/ month</span>
                                </p>
                                
                                {(budgetData.expenses['Financial_Insurance'] || 0) < premiumEstimates[0].monthly ? (
                                  <p className="text-xs text-amber-600 mt-1">
                                    <AlertTriangle className="h-3 w-3 inline mr-1" />
                                    Your current insurance budget needs to increase by {formatCurrency(premiumEstimates[0].monthly - (budgetData.expenses['Financial_Insurance'] || 0))}
                                  </p>
                                ) : (
                                  <p className="text-xs text-green-600 mt-1">
                                    <ThumbsUp className="h-3 w-3 inline mr-1" />
                                    This premium fits within your insurance budget
                                  </p>
                                )}
                              </div>
                              
                              <div>
                                <p className="text-xs text-gray-600 font-medium">Available Monthly Savings:</p>
                                <p className="text-sm font-medium">
                                  {formatCurrency(budgetData.monthlyIncome - Object.values(budgetData.expenses).reduce((sum, amount) => sum + amount, 0))}
                                </p>
                                
                                {budgetData.monthlyIncome - Object.values(budgetData.expenses).reduce((sum, amount) => sum + amount, 0) < premiumEstimates[0].monthly ? (
                                  <p className="text-xs text-amber-600 mt-1">
                                    <AlertTriangle className="h-3 w-3 inline mr-1" />
                                    You may need to adjust other budget categories to accommodate this premium
                                  </p>
                                ) : (
                                  <p className="text-xs text-green-600 mt-1">
                                    <ThumbsUp className="h-3 w-3 inline mr-1" />
                                    You have enough monthly savings to cover this premium
                                  </p>
                                )}
                              </div>
                              
                              <Button 
                                size="sm" 
                                className="w-full mt-2 bg-green-600 hover:bg-green-700"
                                onClick={() => {
                                  if (premiumEstimates) {
                                    // Update the insurance budget in Budget Buddy
                                    updateExpense(
                                      'Financial',
                                      'Insurance',
                                      premiumEstimates[0].monthly
                                    );
                                    
                                    toast({
                                      title: "Budget Updated",
                                      description: "Your term insurance premium has been added to your Budget Buddy.",
                                      duration: 3000,
                                    });
                                  }
                                }}
                              >
                                <FileCheck className="h-4 w-4 mr-1" />
                                Update Budget Buddy
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
          
          {premiumEstimates && healthRiskScore !== null && (
            <Card className="mb-4 bg-blue-50 border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Your Insurance Health Assessment
                </CardTitle>
                <CardDescription>
                  Based on your profile, we've calculated your insurance health risk score
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Risk Score</span>
                      <span className="text-sm font-medium">{healthRiskScore.toFixed(0)}/100</span>
                    </div>
                    <Progress value={healthRiskScore} className="h-3 bg-white" 
                      style={{
                        background: `linear-gradient(to right, #10B981, #FBBF24, #EF4444)`,
                      }}
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-green-500">Low Risk</span>
                      <span className="text-yellow-500">Medium Risk</span>
                      <span className="text-red-500">High Risk</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-white p-3 rounded-lg">
                      <h4 className="text-sm font-medium">Risk Factors</h4>
                      <ul className="mt-2 text-xs space-y-1">
                        {age > 40 && <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-yellow-500 mr-1" /> Age above 40 increases premium</li>}
                        {smoker && <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-red-500 mr-1" /> Smoking significantly raises health risk</li>}
                        {gender === "male" && <li className="flex items-center"><Info className="h-3 w-3 text-blue-500 mr-1" /> Males have higher statistical mortality rates</li>}
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <h4 className="text-sm font-medium">Recommendations</h4>
                      <ul className="mt-2 text-xs space-y-1">
                        <li className="flex items-center"><ThumbsUp className="h-3 w-3 text-green-500 mr-1" /> Consider adding Critical Illness rider</li>
                        {smoker && <li className="flex items-center"><ThumbsUp className="h-3 w-3 text-green-500 mr-1" /> Quitting smoking could reduce premium by 30-50%</li>}
                        {parseInt(coverageTerm) < 25 && <li className="flex items-center"><ThumbsUp className="h-3 w-3 text-green-500 mr-1" /> Longer coverage term for better protection</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Term Insurance Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm">What is Term Insurance?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs text-gray-600">
                      Term insurance provides death benefits to your nominees for a specific time period. 
                      Unlike other life insurance policies, it does not have a maturity benefit. It's the 
                      purest form of life insurance designed to provide financial protection to your 
                      dependents in case of your untimely demise.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-sm">How Much Cover Do I Need?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs text-gray-600">
                      Experts recommend 10-15 times your annual income as a suitable coverage amount. 
                      Consider your outstanding loans, future expenses like children's education, and 
                      family's lifestyle needs. Your ideal coverage should be enough to:
                    </p>
                    <ul className="list-disc list-inside text-xs text-gray-600 mt-2">
                      <li>Replace your income for your family</li>
                      <li>Pay off all outstanding debts (mortgage, loans)</li>
                      <li>Cover major future expenses (children's education)</li>
                      <li>Provide for any other financial goals you had</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-sm">What Affects Premium?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs text-gray-600">
                      Premiums are influenced by several factors:
                    </p>
                    <ul className="list-disc list-inside text-xs text-gray-600 mt-2">
                      <li>Age: The younger you are, the lower the premium</li>
                      <li>Gender: Males typically pay higher premiums</li>
                      <li>Health condition: Medical issues increase premiums</li>
                      <li>Smoking status: Smokers pay significantly higher</li>
                      <li>Coverage amount: Higher coverage means higher premium</li>
                      <li>Policy term: Longer terms may increase premium</li>
                      <li>Occupation: High-risk jobs may increase premium</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-sm">Additional Riders</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs text-gray-600">
                      Term insurance can be enhanced with additional riders:
                    </p>
                    <ul className="list-disc list-inside text-xs text-gray-600 mt-2">
                      <li><span className="font-medium">Critical Illness Rider:</span> Provides lump sum if diagnosed with specified critical illnesses</li>
                      <li><span className="font-medium">Accidental Death Benefit:</span> Additional payout in case of death due to accident</li>
                      <li><span className="font-medium">Disability Benefit:</span> Provides income if you become disabled</li>
                      <li><span className="font-medium">Premium Waiver:</span> Waives future premiums in certain circumstances</li>
                      <li><span className="font-medium">Return of Premium:</span> Returns all or part of premiums if you survive the term</li>
                    </ul>
                    <p className="text-xs text-gray-600 mt-2">
                      These provide extra protection but increase the premium. Choose riders based on your specific needs.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis">
          {premiumEstimates && (
            <>
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
                                fill={entry.age === age ? "#2563eb" : "#60a5fa"}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Key Insights</h4>
                      <ul className="text-xs space-y-1">
                        <li className="flex items-center"><Info className="h-3 w-3 text-blue-500 mr-1" /> The premium increases approximately 5% with each year of age</li>
                        <li className="flex items-center"><Info className="h-3 w-3 text-blue-500 mr-1" /> Buying term insurance early can save you significantly over time</li>
                        <li className="flex items-center"><Info className="h-3 w-3 text-blue-500 mr-1" /> After age 50, premiums rise more steeply due to increased mortality risk</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Coverage Comparison</CardTitle>
                    <CardDescription>
                      Different coverage levels based on your income
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={generateCoverageComparisonData()}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <RTooltip formatter={(value) => formatCurrency(value as number)} />
                          <Bar dataKey="value" fill="#3498db" name="Cover Amount">
                            {generateCoverageComparisonData().map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.value === parseFloat(coverAmount) ? "#2563eb" : "#60a5fa"}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Recommended Coverage</h4>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm">
                          Based on your age ({age}) and income ({formatCurrency(parseFloat(annualIncome))}), 
                          we recommend a coverage of{" "}
                          <span className="font-medium text-blue-700">
                            {formatCurrency(calculateRecommendedCoverage() || 0)}
                          </span>
                        </p>
                        <div className="mt-2 text-xs text-gray-600">
                          This provides adequate financial protection for your dependents while 
                          balancing premium affordability.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Policy Enhancement Impact</CardTitle>
                    <CardDescription>
                      How different factors affect your premium
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm">Smoker Status</Label>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-100 h-8 rounded-lg flex">
                            <div 
                              className="bg-blue-500 rounded-l-lg flex items-center justify-center text-white text-xs"
                              style={{ width: "100%" }}
                            >
                              Non-Smoker: ₹ Base
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-100 h-8 rounded-lg flex">
                            <div 
                              className="bg-red-500 rounded-l-lg flex items-center justify-center text-white text-xs"
                              style={{ width: "150%" }}
                            >
                              Smoker: +50%
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm">Critical Illness Rider</Label>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-100 h-8 rounded-lg flex">
                            <div 
                              className="bg-blue-500 rounded-l-lg flex items-center justify-center text-white text-xs"
                              style={{ width: "100%" }}
                            >
                              Without Rider: ₹ Base
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-100 h-8 rounded-lg flex">
                            <div 
                              className="bg-green-500 rounded-l-lg flex items-center justify-center text-white text-xs"
                              style={{ width: "130%" }}
                            >
                              With Rider: +30%
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm">Payment Term</Label>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-100 h-8 rounded-lg flex">
                            <div 
                              className="bg-blue-500 rounded-l-lg flex items-center justify-center text-white text-xs"
                              style={{ width: "100%" }}
                            >
                              Regular Pay: ₹ Base
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-100 h-8 rounded-lg flex">
                            <div 
                              className="bg-purple-500 rounded-l-lg flex items-center justify-center text-white text-xs"
                              style={{ width: "120%" }}
                            >
                              Limited Pay: +20%
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-100 h-8 rounded-lg flex">
                            <div 
                              className="bg-orange-500 rounded-l-lg flex items-center justify-center text-white text-xs"
                              style={{ width: "150%" }}
                            >
                              Single Pay: +50%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="compare">
          {premiumEstimates && (
            <>
              <Card className="mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Insurance Company Comparison</CardTitle>
                  <CardDescription>
                    Compare key metrics across insurance providers
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="mb-4">
                    <div className="flex space-x-2 mb-3">
                      <Button
                        variant={comparisonMetric === "premium" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setComparisonMetric("premium")}
                      >
                        Premium
                      </Button>
                      <Button
                        variant={comparisonMetric === "claimSettlement" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setComparisonMetric("claimSettlement")}
                      >
                        Claim Settlement
                      </Button>
                      <Button
                        variant={comparisonMetric === "customerRating" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setComparisonMetric("customerRating")}
                      >
                        Customer Rating
                      </Button>
                      <Button
                        variant={comparisonMetric === "processing" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setComparisonMetric("processing")}
                      >
                        Claim Processing
                      </Button>
                    </div>
                    
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={premiumEstimates.map(estimate => ({
                            name: estimate.company.name,
                            value: comparisonMetric === "premium" 
                              ? estimate.annual 
                              : comparisonMetric === "claimSettlement" 
                              ? estimate.company.claimSettlementRatio
                              : comparisonMetric === "customerRating"
                              ? estimate.company.customerRating * 20 // Scale to 0-100 for visualization
                              : 100 - (estimate.company.claimProcessingDays * 5) // Invert so lower is better
                          }))}
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
                            label={{ 
                              value: comparisonMetric === "premium" 
                                ? "Annual Premium (₹)" 
                                : comparisonMetric === "claimSettlement" 
                                ? "Claim Settlement Ratio (%)" 
                                : comparisonMetric === "customerRating"
                                ? "Customer Rating Score"
                                : "Claim Processing Efficiency",
                              angle: -90,
                              position: 'insideLeft'
                            }} 
                          />
                          <RTooltip 
                            formatter={(value) => {
                              if (comparisonMetric === "premium") return formatCurrency(value as number);
                              if (comparisonMetric === "claimSettlement") return `${value}%`;
                              if (comparisonMetric === "customerRating") return `${value / 20} / 5`;
                              return `${Math.round(20 - value / 5)} days`;
                            }}
                          />
                          <Bar 
                            dataKey="value" 
                            fill={
                              comparisonMetric === "premium" 
                                ? "#3498db" 
                                : comparisonMetric === "claimSettlement" 
                                ? "#2ecc71"
                                : comparisonMetric === "customerRating"
                                ? "#f1c40f"
                                : "#9b59b6"
                            }
                            name={
                              comparisonMetric === "premium" 
                                ? "Annual Premium" 
                                : comparisonMetric === "claimSettlement" 
                                ? "Claim Settlement Ratio" 
                                : comparisonMetric === "customerRating"
                                ? "Customer Rating"
                                : "Claim Processing Efficiency"
                            }
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Detailed Company Comparison</CardTitle>
                  <CardDescription>
                    Side-by-side comparison of all insurance providers
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company</TableHead>
                          <TableHead>Annual Premium</TableHead>
                          <TableHead>Monthly Premium</TableHead>
                          <TableHead>Claim Settlement</TableHead>
                          <TableHead>Founded</TableHead>
                          <TableHead>Solvency Ratio</TableHead>
                          <TableHead>Customer Rating</TableHead>
                          <TableHead>Claim Processing</TableHead>
                          <TableHead>Network Hospitals</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {premiumEstimates
                          .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
                          .map((estimate, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{estimate.company.name}</TableCell>
                              <TableCell>{formatCurrency(estimate.annual)}</TableCell>
                              <TableCell>{formatCurrency(estimate.monthly)}</TableCell>
                              <TableCell>{estimate.company.claimSettlementRatio}%</TableCell>
                              <TableCell>{estimate.company.foundedYear}</TableCell>
                              <TableCell>{estimate.company.solvencyRatio.toFixed(2)}</TableCell>
                              <TableCell>{estimate.company.customerRating}/5</TableCell>
                              <TableCell>{estimate.company.claimProcessingDays} days</TableCell>
                              <TableCell>{estimate.company.networkHospitals?.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {premiumEstimates.length > rowsPerPage && (
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(1)}
                          disabled={currentPage === 1}
                        >
                          <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        
                        <span className="text-sm">
                          Page {currentPage} of {Math.ceil(premiumEstimates.length / rowsPerPage)}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => 
                            setCurrentPage(prev => 
                              Math.min(Math.ceil(premiumEstimates.length / rowsPerPage), prev + 1)
                            )
                          }
                          disabled={currentPage === Math.ceil(premiumEstimates.length / rowsPerPage)}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(Math.ceil(premiumEstimates.length / rowsPerPage))}
                          disabled={currentPage === Math.ceil(premiumEstimates.length / rowsPerPage)}
                        >
                          <ChevronsRight className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Select
                        value={rowsPerPage.toString()}
                        onValueChange={(value) => {
                          setRowsPerPage(parseInt(value));
                          setCurrentPage(1);
                        }}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Rows" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4">4 rows</SelectItem>
                          <SelectItem value="6">6 rows</SelectItem>
                          <SelectItem value="8">8 rows</SelectItem>
                          <SelectItem value="10">10 rows</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Claim Settlement Comparison</CardTitle>
                  <CardDescription>
                    How companies compare in settling insurance claims
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={generateClaimSettlementData()}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {generateClaimSettlementData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Understanding Claim Settlement Ratio</h4>
                    <p className="text-xs text-gray-600">
                      The Claim Settlement Ratio (CSR) is the percentage of claims settled by an insurer against 
                      the total claims received in a year. A higher CSR indicates that the company honors more claims, 
                      making it more reliable for policyholders. Industry experts recommend choosing insurers with 
                      a CSR of 95% or higher for better claim experience.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Save Calculation Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Your Calculation</DialogTitle>
            <DialogDescription>
              Name your calculation so you can refer to it later.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Label htmlFor="calculation-name">Calculation Name</Label>
            <Input 
              id="calculation-name"
              placeholder="e.g., My Term Insurance Plan"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveCalculation}>
              <Save className="h-4 w-4 mr-2" />
              Save Calculation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}