import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Slider } from "../components/ui/slider";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import { Helmet } from "react-helmet";

// Define types for scenario parameters
type ScenarioType = "retirement" | "education" | "home" | "wealth" | "custom" | "portfolio-analysis";
type RiskProfile = "conservative" | "moderate" | "aggressive";

// Define asset types for portfolio analysis
type AssetType = 
  | "savings" 
  | "mutual-funds" 
  | "nps" 
  | "ppf" 
  | "sukanya-samriddhi" 
  | "cash" 
  | "gold" 
  | "real-estate" 
  | "fixed-deposit" 
  | "stocks" 
  | "epf" 
  | "other";

interface AssetAllocation {
  type: AssetType;
  name: string;
  value: number;
  annualGrowthRate: number;
  liquidityScore: number; // 1-10 (1 = least liquid, 10 = most liquid)
  riskScore: number; // 1-10 (1 = lowest risk, 10 = highest risk)
  notes?: string;
}

interface Dependent {
  relation: string;
  age: number;
  educationYear?: number;
  educationCost?: number;
}

interface Scenario {
  id: string;
  name: string;
  type: ScenarioType;
  initialInvestment: number;
  monthlyInvestment: number;
  years: number;
  riskProfile: RiskProfile;
  inflationRate: number;
  taxRate: number;
  expectedReturns: number;
  additionalContributions: {
    age: number;
    amount: number;
  }[];
  withdrawals: {
    age: number;
    amount: number;
  }[];
  // Portfolio analysis data
  currentAge?: number;
  retirementAge?: number;
  currentAssets?: AssetAllocation[];
  monthlyExpenses?: number;
  dependents?: Dependent[];
}

// Risk profile return rates
const riskReturns = {
  conservative: { min: 6, max: 8, label: "Conservative (6-8%)" },
  moderate: { min: 10, max: 12, label: "Moderate (10-12%)" },
  aggressive: { min: 14, max: 16, label: "Aggressive (14-16%)" }
};

// Default growth rates, liquidity and risk scores for different asset types
const assetTypeInfo = {
  "savings": { growth: 4, liquidity: 9, risk: 1, icon: "savings", color: "blue" },
  "mutual-funds": { growth: 12, liquidity: 6, risk: 7, icon: "trending_up", color: "indigo" },
  "nps": { growth: 9, liquidity: 2, risk: 4, icon: "elderly", color: "cyan" },
  "ppf": { growth: 7.1, liquidity: 2, risk: 1, icon: "account_balance", color: "teal" },
  "sukanya-samriddhi": { growth: 7.6, liquidity: 2, risk: 1, icon: "favorite", color: "pink" },
  "cash": { growth: 0, liquidity: 10, risk: 1, icon: "payments", color: "green" },
  "gold": { growth: 8, liquidity: 4, risk: 6, icon: "diamond", color: "amber" },
  "real-estate": { growth: 7, liquidity: 1, risk: 5, icon: "home", color: "orange" },
  "fixed-deposit": { growth: 6.5, liquidity: 7, risk: 2, icon: "lock_clock", color: "blue" },
  "stocks": { growth: 14, liquidity: 5, risk: 9, icon: "candlestick_chart", color: "red" },
  "epf": { growth: 8.15, liquidity: 2, risk: 1, icon: "work", color: "teal" },
  "other": { growth: 5, liquidity: 3, risk: 5, icon: "widgets", color: "gray" }
};

// Default scenarios
const defaultScenarios: Scenario[] = [
  {
    id: "family-portfolio",
    name: "Family Financial Plan",
    type: "portfolio-analysis",
    initialInvestment: 0,
    monthlyInvestment: 0,
    years: 15,
    riskProfile: "moderate",
    inflationRate: 6,
    taxRate: 30,
    expectedReturns: 0,
    additionalContributions: [],
    withdrawals: [],
    currentAge: 38,
    retirementAge: 60,
    monthlyExpenses: 80000,
    dependents: [
      {
        relation: "Daughter",
        age: 9,
        educationYear: 9,
        educationCost: 3000000
      },
      {
        relation: "Son",
        age: 4,
        educationYear: 14,
        educationCost: 4000000
      }
    ],
    currentAssets: [
      {
        type: "mutual-funds",
        name: "Equity Mutual Funds",
        value: 1200000,
        annualGrowthRate: 12,
        liquidityScore: 6,
        riskScore: 7,
        notes: "Monthly SIPs"
      },
      {
        type: "stocks",
        name: "Direct Equity Portfolio",
        value: 900000,
        annualGrowthRate: 13,
        liquidityScore: 7,
        riskScore: 9,
        notes: "Direct stock investments"
      },
      {
        type: "sukanya-samriddhi",
        name: "Sukanya Samriddhi Yojana",
        value: 300000,
        annualGrowthRate: 7.6,
        liquidityScore: 2,
        riskScore: 1,
        notes: "For daughter's education"
      },
      {
        type: "ppf",
        name: "PPF Account",
        value: 400000,
        annualGrowthRate: 7.1,
        liquidityScore: 2,
        riskScore: 1,
        notes: "Tax-saving investment"
      },
      {
        type: "epf",
        name: "EPF Account",
        value: 800000,
        annualGrowthRate: 8.15,
        liquidityScore: 2,
        riskScore: 1,
        notes: "Employer contribution"
      }
    ]
  },
  {
    id: "homeowner-portfolio",
    name: "Homeowner's Financial Plan",
    type: "portfolio-analysis",
    initialInvestment: 0,
    monthlyInvestment: 0,
    years: 20,
    riskProfile: "moderate",
    inflationRate: 5.5,
    taxRate: 30,
    expectedReturns: 0,
    additionalContributions: [],
    withdrawals: [],
    currentAge: 35,
    retirementAge: 60,
    monthlyExpenses: 60000,
    dependents: [
      {
        relation: "Child",
        age: 5,
        educationYear: 13,
        educationCost: 3500000
      }
    ],
    currentAssets: [
      {
        type: "mutual-funds",
        name: "Mutual Fund Portfolio",
        value: 1500000,
        annualGrowthRate: 12,
        liquidityScore: 6,
        riskScore: 7,
        notes: "Monthly SIPs"
      },
      {
        type: "real-estate",
        name: "Home Property",
        value: 6000000,
        annualGrowthRate: 7,
        liquidityScore: 1,
        riskScore: 5,
        notes: "Primary residence"
      },
      {
        type: "epf",
        name: "Provident Fund",
        value: 1200000,
        annualGrowthRate: 8.15,
        liquidityScore: 2,
        riskScore: 1,
        notes: "Retirement savings"
      }
    ]
  },
  {
    id: "diversified-portfolio",
    name: "Diversified Investment Portfolio",
    type: "portfolio-analysis",
    initialInvestment: 0,
    monthlyInvestment: 0,
    years: 10,
    riskProfile: "moderate",
    inflationRate: 6,
    taxRate: 30,
    expectedReturns: 0,
    additionalContributions: [],
    withdrawals: [],
    currentAge: 40,
    retirementAge: 60,
    monthlyExpenses: 50000,
    dependents: [],
    currentAssets: [
      {
        type: "stocks",
        name: "Stock Portfolio",
        value: 1500000,
        annualGrowthRate: 14,
        liquidityScore: 7,
        riskScore: 9,
        notes: "Direct equity investments"
      },
      {
        type: "mutual-funds",
        name: "Equity Mutual Funds",
        value: 1800000,
        annualGrowthRate: 12,
        liquidityScore: 6,
        riskScore: 7,
        notes: "SIPs in index and active funds"
      },
      {
        type: "gold",
        name: "Gold Investments",
        value: 1000000,
        annualGrowthRate: 8,
        liquidityScore: 4,
        riskScore: 6,
        notes: "Physical gold and SGBs"
      },
      {
        type: "fixed-deposit",
        name: "Fixed Deposits",
        value: 800000,
        annualGrowthRate: 6.5,
        liquidityScore: 7,
        riskScore: 2,
        notes: "Bank FDs"
      },
      {
        type: "nps",
        name: "NPS Account",
        value: 500000,
        annualGrowthRate: 9,
        liquidityScore: 2,
        riskScore: 4,
        notes: "Tax-saving retirement fund"
      }
    ]
  },
  {
    id: "aggressive-growth",
    name: "Aggressive Growth Portfolio",
    type: "portfolio-analysis",
    initialInvestment: 0,
    monthlyInvestment: 0,
    years: 10,
    riskProfile: "aggressive",
    inflationRate: 6,
    taxRate: 30,
    expectedReturns: 0,
    additionalContributions: [],
    withdrawals: [],
    currentAge: 30,
    retirementAge: 55,
    monthlyExpenses: 70000,
    dependents: [],
    currentAssets: [
      {
        type: "mutual-funds",
        name: "Equity Fund Portfolio",
        value: 2500000,
        annualGrowthRate: 14,
        liquidityScore: 6,
        riskScore: 8,
        notes: "High-growth equity funds"
      },
      {
        type: "stocks",
        name: "Direct Stock Investments",
        value: 3000000,
        annualGrowthRate: 15,
        liquidityScore: 7,
        riskScore: 9,
        notes: "Focused stock portfolio"
      },
      {
        type: "other",
        name: "International Investments",
        value: 1000000,
        annualGrowthRate: 10,
        liquidityScore: 7,
        riskScore: 8,
        notes: "US equity ETFs"
      },
      {
        type: "ppf",
        name: "PPF Account",
        value: 600000,
        annualGrowthRate: 7.1,
        liquidityScore: 2,
        riskScore: 1,
        notes: "Debt component"
      }
    ]
  }
];

export default function FinancialPlannerPro() {
  // State for active scenario and display options
  const [scenarios, setScenarios] = useState<Scenario[]>(defaultScenarios);
  const [currentScenario, setCurrentScenario] = useState<Scenario>(defaultScenarios[0]);
  const [scenarioResults, setScenarioResults] = useState<any[]>([]);
  const [activeView, setActiveView] = useState<string>("dashboard");
  const [activeSection, setActiveSection] = useState<string>("overview");
  
  // State for comparison mode
  const [comparisonMode, setComparisonMode] = useState<boolean>(false);
  const [comparedScenarios, setComparedScenarios] = useState<Scenario[]>([]);

  // State for form inputs
  const [newAsset, setNewAsset] = useState<{
    type: AssetType;
    name: string;
    value: string;
  }>({
    type: "mutual-funds",
    name: "",
    value: ""
  });
  
  const [newDependent, setNewDependent] = useState<{
    relation: string;
    age: string;
    educationYear?: string;
    educationCost?: string;
  }>({
    relation: "",
    age: "",
    educationYear: "",
    educationCost: ""
  });

  // Calculate scenario results when current scenario changes
  useEffect(() => {
    calculateScenarioResults();
  }, [currentScenario]);

  // Calculate scenario results for comparison mode
  useEffect(() => {
    if (comparisonMode && comparedScenarios.length > 0) {
      const allResults = comparedScenarios.map(scenario => {
        return calculateScenario(scenario);
      });
      setScenarioResults(allResults);
    }
  }, [comparisonMode, comparedScenarios]);

  // Calculate the results of the current scenario
  const calculateScenarioResults = () => {
    const results = calculateScenario(currentScenario);
    setScenarioResults([results]);
  };

  // Apply risk profile returns
  const applyRiskProfile = (scenario: Scenario): number => {
    const profile = riskReturns[scenario.riskProfile];
    // Return the average of min and max for the selected risk profile
    return (profile.min + profile.max) / 2;
  };

  // Calculate financial scenario
  const calculateScenario = (scenario: Scenario) => {
    // Special handling for portfolio analysis
    if (scenario.type === "portfolio-analysis" && scenario.currentAssets) {
      return calculatePortfolioAnalysis(scenario);
    }
    
    const { initialInvestment, monthlyInvestment, years, inflationRate, expectedReturns } = scenario;
    
    // Apply the risk profile to get expected returns if not manually set
    const annualReturn = scenario.expectedReturns || applyRiskProfile(scenario);
    const monthlyReturn = Math.pow(1 + annualReturn / 100, 1 / 12) - 1;
    
    let data = [];
    let currentAmount = initialInvestment;
    let totalInvested = initialInvestment;
    
    // Inflation adjusted monthly investment (increases yearly)
    let inflationAdjustedMonthly = monthlyInvestment;
    
    // Calculate year by year growth
    for (let year = 0; year <= years; year++) {
      // Add year data
      data.push({
        year,
        age: (scenario.currentAge || 30) + year,
        totalAmount: Math.round(currentAmount),
        totalInvested: Math.round(totalInvested),
        yearlyInvestment: Math.round(inflationAdjustedMonthly * 12),
        yearlyReturn: Math.round(currentAmount * (annualReturn / 100)),
        inflationAdjustedValue: Math.round(currentAmount / Math.pow(1 + inflationRate / 100, year))
      });
      
      // Monthly compounding for the next year
      for (let month = 1; month <= 12; month++) {
        // Only apply for future years
        if (year < years) {
          // Add monthly investment
          currentAmount += inflationAdjustedMonthly;
          // Add investment returns for the month
          currentAmount *= (1 + monthlyReturn);
          // Track total invested
          totalInvested += inflationAdjustedMonthly;
        }
      }
      
      // Increase monthly investment for inflation after each year
      if (year < years) {
        inflationAdjustedMonthly *= (1 + inflationRate / 100);
      }
      
      // Apply any additional contributions for this year
      const contributions = scenario.additionalContributions.filter(
        contrib => contrib.age === ((scenario.currentAge || 30) + year)
      );
      
      if (contributions.length > 0) {
        contributions.forEach(contrib => {
          currentAmount += contrib.amount;
          totalInvested += contrib.amount;
        });
      }
      
      // Apply any withdrawals for this year
      const yearWithdrawals = scenario.withdrawals.filter(
        withdrawal => withdrawal.age === ((scenario.currentAge || 30) + year)
      );
      
      if (yearWithdrawals.length > 0) {
        yearWithdrawals.forEach(withdrawal => {
          currentAmount -= withdrawal.amount;
        });
      }
    }
    
    // Final calculations
    const finalAmount = data[data.length - 1].totalAmount;
    const totalInvestmentAmount = data[data.length - 1].totalInvested;
    const totalReturns = finalAmount - totalInvestmentAmount;
    const wealthMultiplier = finalAmount / totalInvestmentAmount;
    
    return {
      scenario: scenario,
      data: data,
      summary: {
        finalAmount,
        totalInvestmentAmount,
        totalReturns,
        wealthMultiplier,
        years: years,
        cagr: Math.pow(finalAmount / totalInvestmentAmount, 1 / years) - 1
      }
    };
  };
  
  // Calculate portfolio analysis
  const calculatePortfolioAnalysis = (scenario: Scenario) => {
    if (!scenario.currentAssets || !scenario.currentAge || !scenario.years) {
      return {
        scenario,
        data: [],
        summary: {
          finalAmount: 0,
          totalInvestmentAmount: 0,
          totalReturns: 0,
          wealthMultiplier: 0,
          years: 0,
          cagr: 0
        },
        portfolioAnalysis: null
      };
    }
    
    const { currentAssets, years, inflationRate, currentAge, monthlyExpenses = 0 } = scenario;
    
    // Calculate total current portfolio value
    const totalPortfolioValue = currentAssets.reduce((sum, asset) => sum + asset.value, 0);
    
    // Asset class distribution
    const assetClassDistribution = currentAssets.reduce((acc, asset) => {
      const category = asset.type;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += asset.value;
      return acc;
    }, {} as Record<string, number>);
    
    // Convert to percentage
    const assetClassPercentages = Object.entries(assetClassDistribution).map(([category, value]) => ({
      category,
      value,
      percentage: (value / totalPortfolioValue) * 100
    }));
    
    // Calculate risk score
    const weightedRiskScore = currentAssets.reduce(
      (sum, asset) => sum + (asset.riskScore * (asset.value / totalPortfolioValue)),
      0
    );
    
    // Calculate liquidity score
    const weightedLiquidityScore = currentAssets.reduce(
      (sum, asset) => sum + (asset.liquidityScore * (asset.value / totalPortfolioValue)),
      0
    );
    
    // Calculate emergency fund coverage (assuming liquid assets are those with liquidity score >= 7)
    const liquidAssets = currentAssets
      .filter(asset => asset.liquidityScore >= 7)
      .reduce((sum, asset) => sum + asset.value, 0);
    
    const emergencyFundMonths = monthlyExpenses > 0 ? liquidAssets / monthlyExpenses : 0;
    
    // Project portfolio growth
    let projectedData = [];
    let currentPortfolioValue = totalPortfolioValue;
    
    // For each year, grow each asset by its expected return rate
    for (let year = 0; year <= years; year++) {
      let yearlyPortfolioValue = 0;
      let yearlyReturn = 0;
      
      // Calculate the value of each asset for this year
      const assetValues = currentAssets.map(asset => {
        const growthFactor = Math.pow(1 + (asset.annualGrowthRate / 100), year);
        const projectedValue = asset.value * growthFactor;
        yearlyPortfolioValue += projectedValue;
        yearlyReturn += asset.value * (growthFactor - 1);
        
        return {
          ...asset,
          projectedValue
        };
      });
      
      // Apply inflation adjustment
      const inflationFactor = Math.pow(1 + (inflationRate / 100), year);
      const inflationAdjustedValue = yearlyPortfolioValue / inflationFactor;
      
      // Add data for this year
      projectedData.push({
        year,
        age: currentAge + year,
        totalAmount: Math.round(yearlyPortfolioValue),
        totalInvested: Math.round(totalPortfolioValue),
        yearlyReturn: Math.round(yearlyReturn),
        inflationAdjustedValue: Math.round(inflationAdjustedValue),
        assetValues
      });
    }
    
    // Check for goals funding
    const educationGoalFunding = {
      funded: false,
      fundingPercentage: 0,
      shortfall: 0
    };
    
    if (scenario.dependents && scenario.dependents.length > 0) {
      const educationDependent = scenario.dependents.find(dep => dep.educationYear !== undefined);
      
      if (educationDependent && educationDependent.educationYear !== undefined && educationDependent.educationCost) {
        const educationYear = educationDependent.educationYear;
        const educationCost = educationDependent.educationCost;
        
        if (educationYear <= years && projectedData[educationYear]) {
          const availableFunds = projectedData[educationYear].totalAmount;
          const sukanyaFunds = currentAssets.find(a => a.type === "sukanya-samriddhi")?.value || 0;
          const growthFactor = Math.pow(1 + (7.6 / 100), educationYear); // Assuming 7.6% growth
          const projectedSukanyaFunds = sukanyaFunds * growthFactor;
          
          educationGoalFunding.fundingPercentage = Math.min(100, (projectedSukanyaFunds / educationCost) * 100);
          educationGoalFunding.funded = educationGoalFunding.fundingPercentage >= 100;
          educationGoalFunding.shortfall = Math.max(0, educationCost - projectedSukanyaFunds);
        }
      }
    }
    
    // Calculate retirement readiness
    const retirementReadiness = {
      funded: false,
      fundingPercentage: 0,
      shortfall: 0,
      yearsOfExpensesCovered: 0
    };
    
    if (scenario.retirementAge && scenario.retirementAge <= currentAge + years) {
      const retirementYear = scenario.retirementAge - currentAge;
      
      if (retirementYear >= 0 && projectedData[retirementYear]) {
        const retirementCorpus = projectedData[retirementYear].totalAmount;
        // Assuming 25x monthly expenses as ideal retirement corpus
        const idealRetirementCorpus = monthlyExpenses * 12 * 25;
        
        retirementReadiness.fundingPercentage = Math.min(100, (retirementCorpus / idealRetirementCorpus) * 100);
        retirementReadiness.funded = retirementReadiness.fundingPercentage >= 100;
        retirementReadiness.shortfall = Math.max(0, idealRetirementCorpus - retirementCorpus);
        retirementReadiness.yearsOfExpensesCovered = monthlyExpenses > 0 ? retirementCorpus / (monthlyExpenses * 12) : 0;
      }
    }
    
    // Final calculations
    const finalAmount = projectedData[years].totalAmount;
    const totalReturns = finalAmount - totalPortfolioValue;
    const wealthMultiplier = finalAmount / totalPortfolioValue;
    
    return {
      scenario,
      data: projectedData,
      summary: {
        finalAmount,
        totalInvestmentAmount: totalPortfolioValue,
        totalReturns,
        wealthMultiplier,
        years,
        cagr: Math.pow(wealthMultiplier, 1 / years) - 1
      },
      portfolioAnalysis: {
        currentValue: totalPortfolioValue,
        assetClassDistribution: assetClassPercentages,
        riskScore: weightedRiskScore,
        liquidityScore: weightedLiquidityScore,
        emergencyFundMonths,
        educationGoalFunding,
        retirementReadiness
      }
    };
  };

  // Handle scenario parameter changes
  const updateScenarioParam = (param: keyof Scenario, value: any) => {
    setCurrentScenario(prev => ({ ...prev, [param]: value }));
  };

  // Save current scenario
  const saveScenario = () => {
    // Check if this is an edit or a new scenario
    const existingIndex = scenarios.findIndex(s => s.id === currentScenario.id);
    
    if (existingIndex >= 0) {
      // Update existing scenario
      const newScenarios = [...scenarios];
      newScenarios[existingIndex] = { ...currentScenario };
      setScenarios(newScenarios);
    } else {
      // Add new scenario with unique ID
      const newScenario = {
        ...currentScenario,
        id: `scenario-${Date.now()}`
      };
      setScenarios([...scenarios, newScenario]);
    }
  };

  // Create a new scenario
  const createNewScenario = () => {
    const newScenario: Scenario = {
      id: `new-portfolio-${Date.now()}`,
      name: "My Financial Plan",
      type: "portfolio-analysis",
      initialInvestment: 0,
      monthlyInvestment: 0,
      years: 15,
      riskProfile: "moderate",
      inflationRate: 5,
      taxRate: 20,
      expectedReturns: 0,
      additionalContributions: [],
      withdrawals: [],
      currentAge: 30,
      retirementAge: 60,
      monthlyExpenses: 30000,
      dependents: [],
      currentAssets: []
    };
    
    setCurrentScenario(newScenario);
    setActiveView("edit");
    setActiveSection("basic");
  };

  // Add scenario to comparison
  const addToComparison = (scenario: Scenario) => {
    // Check if already in comparison
    if (!comparedScenarios.find(s => s.id === scenario.id)) {
      setComparedScenarios([...comparedScenarios, scenario]);
    }
    setComparisonMode(true);
    setActiveView("compare");
  };

  // Remove scenario from comparison
  const removeFromComparison = (scenarioId: string) => {
    setComparedScenarios(comparedScenarios.filter(s => s.id !== scenarioId));
    if (comparedScenarios.length <= 1) {
      setComparisonMode(false);
    }
  };

  // Add asset to portfolio
  const addAsset = () => {
    if (newAsset.name && parseFloat(newAsset.value) > 0) {
      const asset: AssetAllocation = {
        type: newAsset.type,
        name: newAsset.name,
        value: parseFloat(newAsset.value),
        annualGrowthRate: assetTypeInfo[newAsset.type].growth,
        liquidityScore: assetTypeInfo[newAsset.type].liquidity,
        riskScore: assetTypeInfo[newAsset.type].risk,
        notes: ""
      };
      
      const currentAssets = [...(currentScenario.currentAssets || [])];
      updateScenarioParam('currentAssets', [...currentAssets, asset]);
      
      // Reset form
      setNewAsset({
        type: "mutual-funds",
        name: "",
        value: ""
      });
      
      // Calculate new scenario results
      calculateScenarioResults();
    }
  };

  // Add dependent to portfolio
  const addDependent = () => {
    if (newDependent.relation && parseInt(newDependent.age) >= 0) {
      const dependent: Dependent = {
        relation: newDependent.relation,
        age: parseInt(newDependent.age)
      };
      
      if (newDependent.educationYear) {
        dependent.educationYear = parseInt(newDependent.educationYear);
      }
      
      if (newDependent.educationCost) {
        dependent.educationCost = parseInt(newDependent.educationCost);
      }
      
      const dependents = [...(currentScenario.dependents || [])];
      updateScenarioParam('dependents', [...dependents, dependent]);
      
      // Reset form
      setNewDependent({
        relation: "",
        age: "",
        educationYear: "",
        educationCost: ""
      });
      
      // Calculate new scenario results
      calculateScenarioResults();
    }
  };

  // Remove asset from portfolio
  const removeAsset = (index: number) => {
    if (currentScenario.currentAssets) {
      const currentAssets = [...currentScenario.currentAssets];
      currentAssets.splice(index, 1);
      updateScenarioParam('currentAssets', currentAssets);
      calculateScenarioResults();
    }
  };

  // Remove dependent from portfolio
  const removeDependent = (index: number) => {
    if (currentScenario.dependents) {
      const dependents = [...currentScenario.dependents];
      dependents.splice(index, 1);
      updateScenarioParam('dependents', dependents);
      calculateScenarioResults();
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    });
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Get asset type display name
  const getAssetTypeDisplayName = (type: AssetType): string => {
    const displayNames: Record<AssetType, string> = {
      "savings": "Savings Account",
      "mutual-funds": "Mutual Funds",
      "nps": "National Pension System",
      "ppf": "Public Provident Fund",
      "sukanya-samriddhi": "Sukanya Samriddhi Yojana",
      "cash": "Cash",
      "gold": "Gold",
      "real-estate": "Real Estate",
      "fixed-deposit": "Fixed Deposit",
      "stocks": "Stocks",
      "epf": "Employee Provident Fund",
      "other": "Other Assets"
    };
    
    return displayNames[type] || type;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Helmet>
        <title>Financial Planner | RupeeSmart</title>
        <meta name="description" content="Plan your financial future with RupeeSmart's interactive financial planner. Analyze your current portfolio and get personalized projections." />
      </Helmet>

      {/* Main Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Planner</h1>
          <p className="text-gray-600">Analyze your portfolio and plan your financial future</p>
        </div>
        <div className="flex space-x-2">
          {activeView !== "dashboard" && (
            <Button 
              variant="outline"
              onClick={() => setActiveView("dashboard")}
              className="flex items-center"
            >
              <span className="material-icons mr-2 text-sm">dashboard</span>
              Dashboard
            </Button>
          )}
          {activeView !== "edit" && currentScenario && (
            <Button 
              variant="outline"
              onClick={() => {
                setActiveView("edit");
                setActiveSection("basic");
              }}
              className="flex items-center"
            >
              <span className="material-icons mr-2 text-sm">edit</span>
              Edit
            </Button>
          )}
          <Button 
            variant="default"
            onClick={() => createNewScenario()}
            className="flex items-center"
          >
            <span className="material-icons mr-2 text-sm">add</span>
            New Plan
          </Button>
        </div>
      </div>

      {/* Dashboard View */}
      {activeView === "dashboard" && (
        <div className="space-y-6">
          {/* Portfolio Summary */}
          {scenarioResults.length > 0 && scenarioResults[0].portfolioAnalysis && (
            <Card className="overflow-hidden">
              <div className="bg-gray-200 px-6 py-4">
                <h2 className="text-gray-800 text-xl font-medium flex items-center">
                  <span className="material-icons mr-2">account_balance</span>
                  {currentScenario.name}
                </h2>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card className="shadow-sm border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="material-icons text-blue-600">account_balance_wallet</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">CURRENT NET WORTH</p>
                          <p className="text-xl font-bold text-gray-900">{formatCurrency(scenarioResults[0].portfolioAnalysis.currentValue)}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">Age: {currentScenario.currentAge}</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <span className="material-icons text-green-600">trending_up</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">PROJECTED {currentScenario.years}Y</p>
                          <p className="text-xl font-bold text-gray-900">{formatCurrency(scenarioResults[0].summary.finalAmount)}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">At age {currentScenario.currentAge && currentScenario.currentAge + currentScenario.years}</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <span className="material-icons text-purple-600">show_chart</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">GROWTH MULTIPLE</p>
                          <p className="text-xl font-bold text-gray-900">{scenarioResults[0].summary.wealthMultiplier.toFixed(2)}x</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">CAGR: {formatPercentage(((scenarioResults[0].summary.wealthMultiplier) ** (1 / currentScenario.years) - 1) * 100)}</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                          <span className="material-icons text-amber-600">savings</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">EMERGENCY FUND</p>
                          <p className="text-xl font-bold text-gray-900">{scenarioResults[0].portfolioAnalysis.emergencyFundMonths.toFixed(1)} mo</p>
                        </div>
                      </div>
                      <p className={`text-xs ${
                        scenarioResults[0].portfolioAnalysis.emergencyFundMonths > 6 
                          ? "text-green-500" 
                          : "text-amber-500"
                      }`}>
                        {scenarioResults[0].portfolioAnalysis.emergencyFundMonths > 12 
                          ? "Very Strong" 
                          : scenarioResults[0].portfolioAnalysis.emergencyFundMonths > 6 
                            ? "Good" 
                            : "Needs Attention"}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Asset Allocation */}
                  <Card className="shadow-sm border border-gray-200">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg font-medium">Asset Allocation</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <div className="h-[240px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={scenarioResults[0].portfolioAnalysis.assetClassDistribution}
                              dataKey="value"
                              nameKey="category"
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              labelLine={false}
                              label={({
                                cx,
                                cy,
                                midAngle,
                                innerRadius,
                                outerRadius,
                                percent,
                                category
                              }: any) => {
                                const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
                                const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                                const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                                return (
                                  <text
                                    x={x}
                                    y={y}
                                    textAnchor={x > cx ? 'start' : 'end'}
                                    dominantBaseline="central"
                                    fill="#ffffff"
                                    fontSize={12}
                                  >
                                    {percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''}
                                  </text>
                                );
                              }}
                            >
                              {scenarioResults[0].portfolioAnalysis.assetClassDistribution.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={
                                  ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f', '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab', '#6b9ac4', '#d37295'][index % 12]
                                } />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [formatCurrency(value as number), null]} />
                            <Legend layout="vertical" verticalAlign="middle" align="right" />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Portfolio Health */}
                  <Card className="shadow-sm border border-gray-200">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg font-medium">Portfolio Health</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <div className="space-y-5">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Risk Level</span>
                            <span className="text-sm">
                              {scenarioResults[0].portfolioAnalysis.riskScore < 3
                                ? "Conservative" 
                                : scenarioResults[0].portfolioAnalysis.riskScore < 5
                                  ? "Moderate"
                                  : scenarioResults[0].portfolioAnalysis.riskScore < 7
                                    ? "Balanced"
                                    : "Aggressive"}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${(scenarioResults[0].portfolioAnalysis.riskScore / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Liquidity</span>
                            <span className="text-sm">
                              {scenarioResults[0].portfolioAnalysis.liquidityScore < 3
                                ? "Low" 
                                : scenarioResults[0].portfolioAnalysis.liquidityScore < 5
                                  ? "Moderate"
                                  : scenarioResults[0].portfolioAnalysis.liquidityScore < 7
                                    ? "Good"
                                    : "Excellent"}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-green-500 h-2.5 rounded-full" 
                              style={{ width: `${(scenarioResults[0].portfolioAnalysis.liquidityScore / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Retirement Readiness</span>
                            <span className="text-sm">
                              {scenarioResults[0].portfolioAnalysis.retirementReadiness.fundingPercentage < 30
                                ? "Needs Attention" 
                                : scenarioResults[0].portfolioAnalysis.retirementReadiness.fundingPercentage < 60
                                  ? "On Track"
                                  : scenarioResults[0].portfolioAnalysis.retirementReadiness.fundingPercentage < 90
                                    ? "Strong"
                                    : "Excellent"}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`${
                                scenarioResults[0].portfolioAnalysis.retirementReadiness.fundingPercentage < 30
                                  ? "bg-red-500"
                                  : scenarioResults[0].portfolioAnalysis.retirementReadiness.fundingPercentage < 60
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              } h-2.5 rounded-full`} 
                              style={{ width: `${Math.min(100, scenarioResults[0].portfolioAnalysis.retirementReadiness.fundingPercentage)}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {scenarioResults[0].portfolioAnalysis.retirementReadiness.yearsOfExpensesCovered.toFixed(1)} years of expenses covered
                          </p>
                        </div>

                        {/* Education Funding if there are dependents */}
                        {currentScenario.dependents && currentScenario.dependents.length > 0 && (
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Education Funding</span>
                              <span className="text-sm">
                                {scenarioResults[0].portfolioAnalysis.educationGoalFunding.fundingPercentage < 30
                                  ? "Needs Attention" 
                                  : scenarioResults[0].portfolioAnalysis.educationGoalFunding.fundingPercentage < 60
                                    ? "On Track"
                                    : scenarioResults[0].portfolioAnalysis.educationGoalFunding.fundingPercentage < 90
                                      ? "Strong"
                                      : "Excellent"}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className={`${
                                  scenarioResults[0].portfolioAnalysis.educationGoalFunding.fundingPercentage < 30
                                    ? "bg-red-500"
                                    : scenarioResults[0].portfolioAnalysis.educationGoalFunding.fundingPercentage < 60
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                } h-2.5 rounded-full`} 
                                style={{ width: `${Math.min(100, scenarioResults[0].portfolioAnalysis.educationGoalFunding.fundingPercentage)}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Portfolio Growth Chart */}
                <Card className="shadow-sm border border-gray-200">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg font-medium">Portfolio Growth Projection</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={scenarioResults[0].data}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="year" 
                            label={{ value: 'Years', position: 'insideBottomRight', offset: 0 }}
                          />
                          <YAxis 
                            tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                          />
                          <Tooltip 
                            formatter={(value) => [`₹${Number(value).toLocaleString()}`, undefined]}
                            labelFormatter={(label) => `Year ${label} (Age ${scenarioResults[0].data[label].age})`}
                          />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="totalAmount" 
                            name="Portfolio Value" 
                            stroke="#4f46e5" 
                            fill="#4f46e5" 
                            fillOpacity={0.6}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="inflationAdjustedValue" 
                            name="Inflation-Adjusted" 
                            stroke="#f97316" 
                            fill="#f97316" 
                            fillOpacity={0.3} 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* Saved Plans */}
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg font-medium">Saved Financial Plans</CardTitle>
              <CardDescription>Select a plan to view or edit</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scenarios.map((scenario) => (
                  <Card key={scenario.id} className="overflow-hidden border border-gray-200 shadow-sm">
                    <div className={`h-1 ${
                      scenario.type === "portfolio-analysis" ? "bg-blue-600" :
                      scenario.type === "retirement" ? "bg-green-600" :
                      scenario.type === "education" ? "bg-purple-600" :
                      "bg-amber-600"
                    }`}></div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{scenario.name}</h3>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="text-xs">
                              {scenario.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </Badge>
                            {scenario.years && (
                              <span className="text-xs text-gray-500 ml-2">{scenario.years} years</span>
                            )}
                          </div>
                        </div>
                        <Badge variant={scenario.riskProfile === "conservative" ? "secondary" : 
                                          scenario.riskProfile === "moderate" ? "outline" : 
                                          "default"} className="text-xs">
                          {scenario.riskProfile.charAt(0).toUpperCase() + scenario.riskProfile.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-3">
                        {scenario.type === "portfolio-analysis" && scenario.currentAssets ? (
                          <div>
                            <p>{scenario.currentAssets.length} assets · {formatCurrency(scenario.currentAssets.reduce((sum, asset) => sum + asset.value, 0))}</p>
                            {scenario.dependents && scenario.dependents.length > 0 && (
                              <p>{scenario.dependents.length} dependent{scenario.dependents.length > 1 ? 's' : ''}</p>
                            )}
                          </div>
                        ) : (
                          <div>
                            <p>Initial: {formatCurrency(scenario.initialInvestment)}</p>
                            <p>Monthly: {formatCurrency(scenario.monthlyInvestment)}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setCurrentScenario(scenario);
                            calculateScenarioResults();
                          }}
                        >
                          <span className="material-icons mr-1 text-sm">visibility</span>
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setCurrentScenario(scenario);
                            setActiveView("edit");
                            setActiveSection("basic");
                          }}
                        >
                          <span className="material-icons mr-1 text-sm">edit</span>
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-none"
                          onClick={() => addToComparison(scenario)}
                        >
                          <span className="material-icons text-sm">compare</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Templates */}
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg font-medium">Start from Template</CardTitle>
              <CardDescription>Choose a template to create a new financial plan</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto p-6 flex flex-col items-center justify-center border border-gray-200 shadow-sm"
                  onClick={() => {
                    const selected = scenarios.find(s => s.id === "family-portfolio");
                    if (selected) {
                      setCurrentScenario({...selected, id: `new-family-${Date.now()}`});
                      setActiveView("edit");
                      setActiveSection("basic");
                    }
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <span className="material-icons text-blue-600">family_restroom</span>
                  </div>
                  <span className="font-medium">Family Plan</span>
                  <span className="text-xs text-gray-500 mt-1">For families with children</span>
                </Button>

                <Button 
                  variant="outline" 
                  className="h-auto p-6 flex flex-col items-center justify-center border border-gray-200 shadow-sm"
                  onClick={() => {
                    const selected = scenarios.find(s => s.id === "homeowner-portfolio");
                    if (selected) {
                      setCurrentScenario({...selected, id: `new-homeowner-${Date.now()}`});
                      setActiveView("edit");
                      setActiveSection("basic");
                    }
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                    <span className="material-icons text-green-600">home</span>
                  </div>
                  <span className="font-medium">Homeowner</span>
                  <span className="text-xs text-gray-500 mt-1">For property owners</span>
                </Button>

                <Button 
                  variant="outline" 
                  className="h-auto p-6 flex flex-col items-center justify-center border border-gray-200 shadow-sm"
                  onClick={() => {
                    const selected = scenarios.find(s => s.id === "diversified-portfolio");
                    if (selected) {
                      setCurrentScenario({...selected, id: `new-diversified-${Date.now()}`});
                      setActiveView("edit");
                      setActiveSection("basic");
                    }
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                    <span className="material-icons text-purple-600">pie_chart</span>
                  </div>
                  <span className="font-medium">Diversified</span>
                  <span className="text-xs text-gray-500 mt-1">Balanced investment mix</span>
                </Button>

                <Button 
                  variant="outline" 
                  className="h-auto p-6 flex flex-col items-center justify-center border border-gray-200 shadow-sm"
                  onClick={() => {
                    const selected = scenarios.find(s => s.id === "aggressive-growth");
                    if (selected) {
                      setCurrentScenario({...selected, id: `new-aggressive-${Date.now()}`});
                      setActiveView("edit");
                      setActiveSection("basic");
                    }
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                    <span className="material-icons text-amber-600">rocket_launch</span>
                  </div>
                  <span className="font-medium">Growth</span>
                  <span className="text-xs text-gray-500 mt-1">For aggressive investors</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit View */}
      {activeView === "edit" && (
        <Card>
          <CardHeader className="border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-medium">
                {currentScenario.name}
              </CardTitle>
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={saveScenario}
                >
                  <span className="material-icons mr-1 text-sm">save</span>
                  Save
                </Button>
                <Button 
                  variant="default"
                  size="sm"
                  onClick={() => {
                    calculateScenarioResults();
                    setActiveView("dashboard");
                  }}
                >
                  <span className="material-icons mr-1 text-sm">done</span>
                  Done
                </Button>
              </div>
            </div>
          </CardHeader>

          <div className="flex border-t border-gray-200">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200 bg-gray-50">
              <div className="p-2 space-y-2">
                <div className={`w-full rounded-md overflow-hidden ${activeSection === "basic" ? "bg-blue-100 shadow-sm" : ""}`}>
                  <Button 
                    variant="ghost"
                    className="w-full justify-start text-left py-2 px-2 h-auto"
                    onClick={() => setActiveSection("basic")}
                  >
                    <div className="flex items-center">
                      <div className="mr-2 w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center">
                        <span className="material-icons text-sm text-blue-700">person</span>
                      </div>
                      <div>
                        <span className={`font-medium text-sm ${activeSection === "basic" ? "text-blue-700" : "text-gray-700"}`}>Basic Information</span>
                        <p className="text-xs text-gray-600">Personal details & goals</p>
                      </div>
                    </div>
                  </Button>
                </div>
                
                <div className={`w-full rounded-md overflow-hidden ${activeSection === "assets" ? "bg-green-100 shadow-sm" : ""}`}>
                  <Button 
                    variant="ghost"
                    className="w-full justify-start text-left py-2 px-2 h-auto"
                    onClick={() => setActiveSection("assets")}
                  >
                    <div className="flex items-center">
                      <div className="mr-2 w-7 h-7 rounded-full bg-green-200 flex items-center justify-center">
                        <span className="material-icons text-sm text-green-700">account_balance_wallet</span>
                      </div>
                      <div>
                        <span className={`font-medium text-sm ${activeSection === "assets" ? "text-green-700" : "text-gray-700"}`}>Assets</span>
                        <p className="text-xs text-gray-600">Investments & properties</p>
                      </div>
                    </div>
                  </Button>
                </div>
                
                <div className={`w-full rounded-md overflow-hidden ${activeSection === "dependents" ? "bg-purple-100 shadow-sm" : ""}`}>
                  <Button 
                    variant="ghost"
                    className="w-full justify-start text-left py-2 px-2 h-auto"
                    onClick={() => setActiveSection("dependents")}
                  >
                    <div className="flex items-center">
                      <div className="mr-2 w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center">
                        <span className="material-icons text-sm text-purple-700">family_restroom</span>
                      </div>
                      <div>
                        <span className={`font-medium text-sm ${activeSection === "dependents" ? "text-purple-700" : "text-gray-700"}`}>Dependents</span>
                        <p className="text-xs text-gray-600">Family & education planning</p>
                      </div>
                    </div>
                  </Button>
                </div>
                
                <div className={`w-full rounded-md overflow-hidden ${activeSection === "assumptions" ? "bg-amber-100 shadow-sm" : ""}`}>
                  <Button 
                    variant="ghost"
                    className="w-full justify-start text-left py-2 px-2 h-auto"
                    onClick={() => setActiveSection("assumptions")}
                  >
                    <div className="flex items-center">
                      <div className="mr-2 w-7 h-7 rounded-full bg-amber-200 flex items-center justify-center">
                        <span className="material-icons text-sm text-amber-700">settings</span>
                      </div>
                      <div>
                        <span className={`font-medium text-sm ${activeSection === "assumptions" ? "text-amber-700" : "text-gray-700"}`}>Assumptions</span>
                        <p className="text-xs text-gray-600">Future rates & projections</p>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-6">
              {/* Basic Information */}
              {activeSection === "basic" && (
                <div>
                  <h3 className="text-md font-medium mb-2">Basic Information</h3>
                  <div className="max-w-xl">
                    <div className="mb-2">
                      <Label htmlFor="plan-name" className="text-xs block mb-0.5">Plan Name</Label>
                      <Input 
                        id="plan-name"
                        value={currentScenario.name} 
                        onChange={(e) => updateScenarioParam('name', e.target.value)}
                        className="h-8 text-sm py-0 px-2" 
                        placeholder="My Financial Plan"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                      <div>
                        <Label htmlFor="current-age" className="text-xs block mb-0.5">Current Age</Label>
                        <Input 
                          id="current-age"
                          type="number"
                          value={currentScenario.currentAge || 30} 
                          onChange={(e) => updateScenarioParam('currentAge', parseInt(e.target.value))}
                          className="h-8 text-sm py-0 px-2" 
                          placeholder="30"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="retirement-age" className="text-xs block mb-0.5">Retirement Age</Label>
                        <Input 
                          id="retirement-age"
                          type="number"
                          value={currentScenario.retirementAge || 60} 
                          onChange={(e) => updateScenarioParam('retirementAge', parseInt(e.target.value))}
                          className="h-8 text-sm py-0 px-2" 
                          placeholder="60"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                      <div>
                        <Label htmlFor="monthly-income" className="text-xs block mb-0.5">Monthly Income (₹)</Label>
                        <Input 
                          id="monthly-income"
                          type="number"
                          value={currentScenario.monthlyIncome || 0} 
                          onChange={(e) => updateScenarioParam('monthlyIncome', parseInt(e.target.value))}
                          className="h-8 text-sm py-0 px-2" 
                          placeholder="50000"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="monthly-savings" className="text-xs block mb-0.5">Monthly Savings (₹)</Label>
                        <Input 
                          id="monthly-savings"
                          type="number"
                          value={currentScenario.monthlySavings || 0} 
                          onChange={(e) => updateScenarioParam('monthlySavings', parseInt(e.target.value))}
                          className="h-8 text-sm py-0 px-2" 
                          placeholder="10000"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                      <div>
                        <Label htmlFor="monthly-expenses" className="text-xs block mb-0.5">Monthly Expenses (₹)</Label>
                        <Input 
                          id="monthly-expenses"
                          type="number"
                          value={currentScenario.monthlyExpenses || 0} 
                          onChange={(e) => updateScenarioParam('monthlyExpenses', parseInt(e.target.value))}
                          className="h-8 text-sm py-0 px-2" 
                          placeholder="30000"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="projection-years" className="text-xs block mb-0.5">Projection Years</Label>
                        <Input 
                          id="projection-years"
                          type="number"
                          value={currentScenario.years} 
                          onChange={(e) => updateScenarioParam('years', parseInt(e.target.value))}
                          className="h-8 text-sm py-0 px-2" 
                          placeholder="15"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="risk-profile" className="text-xs block mb-0.5">Risk Profile</Label>
                      <Select 
                        value={currentScenario.riskProfile}
                        onValueChange={(value: RiskProfile) => updateScenarioParam('riskProfile', value)}
                      >
                        <SelectTrigger id="risk-profile" className="h-8 text-sm py-0 px-2">
                          <SelectValue placeholder="Select risk profile" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conservative">Conservative (6-8% returns)</SelectItem>
                          <SelectItem value="moderate">Moderate (10-12% returns)</SelectItem>
                          <SelectItem value="aggressive">Aggressive (14-16% returns)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Assets */}
              {activeSection === "assets" && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-md font-medium">Assets</h3>
                    {currentScenario.currentAssets && (
                      <div className="text-sm font-medium">
                        Total: {formatCurrency(currentScenario.currentAssets.reduce((sum, asset) => sum + asset.value, 0))}
                      </div>
                    )}
                  </div>

                  {/* Add Asset Form */}
                  <div className="mb-3 border border-gray-200 rounded-md bg-white">
                    <div className="px-3 py-2 border-b border-gray-200">
                      <h4 className="text-sm font-medium">Add New Asset</h4>
                    </div>
                    <div className="p-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <div>
                          <Label htmlFor="asset-type" className="text-xs block mb-0.5">Asset Type</Label>
                          <Select 
                            value={newAsset.type}
                            onValueChange={(value: AssetType) => 
                              setNewAsset(prev => ({...prev, type: value}))
                            }
                          >
                            <SelectTrigger id="asset-type" className="h-10 text-sm border-2 border-gray-300 rounded-md">
                              <SelectValue placeholder="Select asset type" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px] overflow-y-auto" position="popper" align="start">
                              <SelectItem value="mutual-funds">Mutual Funds</SelectItem>
                              <SelectItem value="stocks">Stocks</SelectItem>
                              <SelectItem value="savings">Savings Account</SelectItem>
                              <SelectItem value="fixed-deposit">Fixed Deposit</SelectItem>
                              <SelectItem value="ppf">Public Provident Fund (PPF)</SelectItem>
                              <SelectItem value="epf">Employee Provident Fund (EPF)</SelectItem>
                              <SelectItem value="nps">National Pension System (NPS)</SelectItem>
                              <SelectItem value="sukanya-samriddhi">Sukanya Samriddhi Yojana</SelectItem>
                              <SelectItem value="gold">Gold</SelectItem>
                              <SelectItem value="real-estate">Real Estate</SelectItem>
                              <SelectItem value="cash">Cash</SelectItem>
                              <SelectItem value="other">Other Investments</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="asset-name" className="text-xs block mb-0.5">Asset Name</Label>
                          <Input
                            id="asset-name"
                            value={newAsset.name}
                            onChange={(e) => 
                              setNewAsset(prev => ({...prev, name: e.target.value}))
                            }
                            placeholder="E.g., HDFC Bank Savings"
                            className="h-8 text-sm py-0 px-2"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="asset-value" className="text-xs block mb-0.5">Current Value (₹)</Label>
                          <Input
                            id="asset-value"
                            type="number"
                            value={newAsset.value}
                            onChange={(e) => 
                              setNewAsset(prev => ({...prev, value: e.target.value}))
                            }
                            placeholder="E.g., 100000"
                            className="h-8 text-sm py-0 px-2"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          onClick={addAsset}
                          disabled={!newAsset.name || parseFloat(newAsset.value) <= 0}
                          className="bg-green-100 hover:bg-green-200 text-green-700 h-7 text-xs px-2 py-0"
                        >
                          <span className="material-icons mr-1 text-xs">add</span>
                          Add Asset
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Asset List */}
                  <div className="space-y-2">
                    {currentScenario.currentAssets && currentScenario.currentAssets.length > 0 ? (
                      currentScenario.currentAssets.map((asset, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-md overflow-hidden">
                          <div className="flex items-center p-2">
                            <div className="mr-3">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <span className="material-icons text-sm text-green-600">
                                  {assetTypeInfo[asset.type].icon}
                                </span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">{asset.name}</h4>
                                <div className="flex items-center">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeAsset(index)}
                                    className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                                  >
                                    <span className="material-icons text-sm">delete</span>
                                  </Button>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Badge variant="outline" className="mr-2 text-xs px-1 py-0">
                                  {getAssetTypeDisplayName(asset.type)}
                                </Badge>
                                <span className="text-gray-600 text-xs font-medium">{formatCurrency(asset.value)}</span>
                              </div>
                              <p className="text-xs text-gray-500">
                                {asset.annualGrowthRate}% annual growth · Liquidity: {asset.liquidityScore}/10 · Risk: {asset.riskScore}/10
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 bg-gray-50 border border-dashed border-gray-300 rounded-md">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
                          <span className="material-icons text-sm text-gray-400">account_balance_wallet</span>
                        </div>
                        <h4 className="text-sm font-medium text-gray-700">No assets added yet</h4>
                        <p className="text-xs text-gray-500">Add your assets to see portfolio insights</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Dependents */}
              {activeSection === "dependents" && (
                <div>
                  <h3 className="text-md font-medium mb-2">Dependents & Education Goals</h3>

                  {/* Add Dependent Form */}
                  <div className="mb-3 border border-gray-200 rounded-md bg-white">
                    <div className="px-3 py-2 border-b border-gray-200">
                      <h4 className="text-sm font-medium">Add Dependent</h4>
                    </div>
                    <div className="p-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                        <div>
                          <Label htmlFor="dependent-relation" className="text-xs block mb-0.5">Relation</Label>
                          <Input
                            id="dependent-relation"
                            value={newDependent.relation}
                            onChange={(e) => 
                              setNewDependent(prev => ({...prev, relation: e.target.value}))
                            }
                            placeholder="E.g., Son, Daughter"
                            className="h-8 text-sm py-0 px-2"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="dependent-age" className="text-xs block mb-0.5">Current Age</Label>
                          <Input
                            id="dependent-age"
                            type="number"
                            value={newDependent.age}
                            onChange={(e) => 
                              setNewDependent(prev => ({...prev, age: e.target.value}))
                            }
                            placeholder="E.g., 5"
                            className="h-8 text-sm py-0 px-2"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                        <div>
                          <Label htmlFor="education-year" className="text-xs block mb-0.5">Education in Years</Label>
                          <Input
                            id="education-year"
                            type="number"
                            value={newDependent.educationYear}
                            onChange={(e) => 
                              setNewDependent(prev => ({...prev, educationYear: e.target.value}))
                            }
                            placeholder="E.g., 15"
                            className="h-8 text-sm py-0 px-2"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="education-cost" className="text-xs block mb-0.5">Education Cost (₹)</Label>
                          <Input
                            id="education-cost"
                            type="number"
                            value={newDependent.educationCost}
                            onChange={(e) => 
                              setNewDependent(prev => ({...prev, educationCost: e.target.value}))
                            }
                            placeholder="E.g., 3000000"
                            className="h-8 text-sm py-0 px-2"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          onClick={addDependent}
                          disabled={!newDependent.relation || parseInt(newDependent.age) < 0}
                          className="bg-purple-100 hover:bg-purple-200 text-purple-700 h-7 text-xs px-2 py-0"
                        >
                          <span className="material-icons mr-1 text-xs">person_add</span>
                          Add Dependent
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Dependent List */}
                  <div className="space-y-2">
                    {currentScenario.dependents && currentScenario.dependents.length > 0 ? (
                      currentScenario.dependents.map((dependent, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-md overflow-hidden">
                          <div className="flex items-center p-2">
                            <div className="mr-2">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <span className="material-icons text-sm text-purple-600">person</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">{dependent.relation}</h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeDependent(index)}
                                  className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                                >
                                  <span className="material-icons text-sm">delete</span>
                                </Button>
                              </div>
                              <p className="text-xs text-gray-500">Age: {dependent.age}</p>
                              {dependent.educationYear && (
                                <p className="text-xs text-gray-500">
                                  Education in {dependent.educationYear} years
                                  {dependent.educationCost && ` (${formatCurrency(dependent.educationCost)})`}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 bg-gray-50 border border-dashed border-gray-300 rounded-md">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-1">
                          <span className="material-icons text-sm text-gray-400">family_restroom</span>
                        </div>
                        <h4 className="text-sm font-medium text-gray-700">No dependents added</h4>
                        <p className="text-xs text-gray-500">Add dependents to plan for education</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Assumptions */}
              {activeSection === "assumptions" && (
                <div>
                  <h3 className="text-md font-medium mb-2">Projection Assumptions</h3>
                  <div className="space-y-4 max-w-xl">
                    <div>
                      <div className="flex justify-between mb-0.5">
                        <Label htmlFor="inflation-rate" className="text-xs">Inflation Rate (%)</Label>
                        <span className="text-xs text-gray-500">{currentScenario.inflationRate}%</span>
                      </div>
                      <Slider 
                        id="inflation-rate"
                        value={[currentScenario.inflationRate]}
                        min={2}
                        max={10}
                        step={0.5}
                        onValueChange={(value) => updateScenarioParam('inflationRate', value[0])}
                        className="my-1 h-3" 
                      />
                      <p className="text-xs text-gray-500">
                        The average annual increase in prices (long-term average in India: 5-6%)
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-0.5">
                        <Label htmlFor="tax-rate" className="text-xs">Tax Rate (%)</Label>
                        <span className="text-xs text-gray-500">{currentScenario.taxRate}%</span>
                      </div>
                      <Slider 
                        id="tax-rate"
                        value={[currentScenario.taxRate]}
                        min={0}
                        max={40}
                        step={1}
                        onValueChange={(value) => updateScenarioParam('taxRate', value[0])}
                        className="my-1 h-3" 
                      />
                      <p className="text-xs text-gray-500">
                        Your expected income tax rate for investment returns
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="expected-returns" className="text-xs block mb-0.5">Expected Returns Override (%)</Label>
                      <Input 
                        id="expected-returns"
                        type="number"
                        value={currentScenario.expectedReturns || applyRiskProfile(currentScenario)} 
                        onChange={(e) => updateScenarioParam('expectedReturns', parseFloat(e.target.value))}
                        className="h-8 text-sm py-0 px-2" 
                        placeholder="0"
                      />
                      <p className="text-xs text-gray-500">
                        Override default returns (0 = use profile default)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Compare View */}
      {activeView === "compare" && (
        <Card>
          <CardHeader className="border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-medium">
                Compare Financial Plans
              </CardTitle>
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setComparedScenarios([])}
                  disabled={comparedScenarios.length === 0}
                >
                  <span className="material-icons mr-1 text-sm">clear_all</span>
                  Clear All
                </Button>
                <Button 
                  variant="default"
                  size="sm"
                  onClick={() => setActiveView("dashboard")}
                >
                  <span className="material-icons mr-1 text-sm">arrow_back</span>
                  Back
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {comparedScenarios.length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {comparedScenarios.map((scenario, index) => (
                    <Card key={scenario.id} className={`border border-gray-200 shadow-sm bg-${
                      index === 0 ? 'blue' : index === 1 ? 'green' : index === 2 ? 'purple' : 'amber'
                    }-50`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <p className="font-medium">{scenario.name}</p>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full"
                            onClick={() => removeFromComparison(scenario.id)}
                          >
                            <span className="material-icons text-xs">close</span>
                          </Button>
                        </div>
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs mr-1">
                            {scenario.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {scenario.years} years
                          </Badge>
                        </div>
                        {scenarioResults[index] && (
                          <p className="text-lg font-bold mt-2">
                            {formatCurrency(scenarioResults[index].summary.finalAmount)}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  
                  {comparedScenarios.length < 4 && (
                    <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
                      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <Button 
                          variant="ghost"
                          className="h-auto py-3"
                          onClick={() => setActiveView("dashboard")}
                        >
                          <span className="material-icons mr-1">add</span>
                          Add Plan
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg font-medium">Growth Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="year" 
                            allowDuplicatedCategory={false}
                            label={{ value: 'Years', position: 'insideBottomRight', offset: 0 }}
                          />
                          <YAxis 
                            tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                          />
                          <Tooltip 
                            formatter={(value) => [`₹${Number(value).toLocaleString()}`, undefined]}
                          />
                          <Legend />
                          {scenarioResults.map((result, index) => (
                            <Line 
                              key={index}
                              data={result.data} 
                              type="monotone" 
                              dataKey="totalAmount" 
                              name={result.scenario.name} 
                              stroke={index === 0 ? '#4f46e5' : index === 1 ? '#22c55e' : index === 2 ? '#a855f7' : '#f59e0b'} 
                              activeDot={{ r: 8 }} 
                            />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg font-medium">Comparison Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Years</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Profile</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth Multiple</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Growth</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {scenarioResults.map((result, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.scenario.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.scenario.years}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {result.scenario.type !== "portfolio-analysis" 
                                  ? result.scenario.riskProfile.charAt(0).toUpperCase() + result.scenario.riskProfile.slice(1)
                                  : "Portfolio Analysis"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(result.summary.totalInvestmentAmount)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(result.summary.finalAmount)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.summary.wealthMultiplier.toFixed(2)}x</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPercentage(result.summary.cagr * 100)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-16">
                <span className="material-icons text-5xl text-gray-300 mb-4">compare</span>
                <h3 className="text-xl font-medium text-gray-700">No plans to compare</h3>
                <p className="text-gray-500 mt-2">Add financial plans to compare their performance</p>
                <Button 
                  className="mt-4"
                  onClick={() => setActiveView("dashboard")}
                >
                  Select Plans
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}