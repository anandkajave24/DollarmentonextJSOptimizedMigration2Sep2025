import { useState, useEffect } from "react";
import { SEO } from '../components/SEO';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Slider } from "../components/ui/slider";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
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
  monthlyIncome?: number;
  monthlySavings?: number;
  dependents?: {
    relation: string;
    age: number;
    educationYear?: number;
    educationCost?: number;
  }[];
}

// Risk profile return rates
const riskReturns = {
  conservative: { min: 6, max: 8, label: "Conservative (6-8%)" },
  moderate: { min: 10, max: 12, label: "Moderate (10-12%)" },
  aggressive: { min: 14, max: 16, label: "Aggressive (14-16%)" }
};

// Default growth rates for different asset types
const assetTypeDefaultGrowth = {
  "savings": 4,
  "mutual-funds": 12,
  "nps": 9,
  "ppf": 7.1,
  "sukanya-samriddhi": 7.6,
  "cash": 0,
  "gold": 8,
  "real-estate": 7,
  "fixed-deposit": 6.5,
  "stocks": 14,
  "epf": 8.15,
  "other": 5
};

// Default liquidity scores for different asset types (1-10, 10 being most liquid)
const assetTypeLiquidity = {
  "cash": 10,
  "savings": 9,
  "fixed-deposit": 7,
  "mutual-funds": 6,
  "stocks": 5,
  "gold": 4,
  "other": 3,
  "nps": 2,
  "ppf": 2,
  "sukanya-samriddhi": 2,
  "epf": 2,
  "real-estate": 1
};

// Default risk scores for different asset types (1-10, 10 being highest risk)
const assetTypeRisk = {
  "savings": 1,
  "cash": 1,
  "fixed-deposit": 2,
  "ppf": 1,
  "sukanya-samriddhi": 1,
  "epf": 1,
  "nps": 4,
  "gold": 6,
  "real-estate": 5,
  "mutual-funds": 7,
  "stocks": 9,
  "other": 5
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
        notes: "Monthly investments"
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
        notes: "Monthly investments"
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
        notes: "investments in index and active funds"
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
  },
  {
    id: "retirement-plan",
    name: "Basic Retirement Plan",
    type: "retirement",
    initialInvestment: 100000,
    monthlyInvestment: 10000,
    years: 25,
    riskProfile: "moderate",
    inflationRate: 5,
    taxRate: 20,
    expectedReturns: 11,
    additionalContributions: [],
    withdrawals: []
  },
  {
    id: "education-fund",
    name: "Child's Education Fund",
    type: "education",
    initialInvestment: 50000,
    monthlyInvestment: 5000,
    years: 15,
    riskProfile: "moderate",
    inflationRate: 6,
    taxRate: 10,
    expectedReturns: 11,
    additionalContributions: [],
    withdrawals: []
  }
];

export default function FinancialPlanner() {
  const [scenarios, setScenarios] = useState<Scenario[]>(defaultScenarios);
  const [currentScenario, setCurrentScenario] = useState<Scenario>(defaultScenarios[0]);
  const [activeTab, setActiveTab] = useState<string>("portfolio");
  const [scenarioResults, setScenarioResults] = useState<any[]>([]);
  const [comparisonMode, setComparisonMode] = useState<boolean>(false);
  const [comparedScenarios, setComparedScenarios] = useState<Scenario[]>([]);
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [summaryVisible, setSummaryVisible] = useState<boolean>(true);
  
  // Add empty states for new scenario creation
  const [newAssetType, setNewAssetType] = useState<AssetType>("mutual-funds");
  const [newAssetName, setNewAssetName] = useState<string>("");
  const [newAssetValue, setNewAssetValue] = useState<string>("0");
  const [newDependentRelation, setNewDependentRelation] = useState<string>("");
  const [newDependentAge, setNewDependentAge] = useState<string>("0");

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
        age: (scenario.currentAge || currentAge) + year,
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
        contrib => contrib.age === ((scenario.currentAge || currentAge) + year)
      );
      
      if (contributions.length > 0) {
        contributions.forEach(contrib => {
          currentAmount += contrib.amount;
          totalInvested += contrib.amount;
        });
      }
      
      // Apply any withdrawals for this year
      const yearWithdrawals = scenario.withdrawals.filter(
        withdrawal => withdrawal.age === ((scenario.currentAge || currentAge) + year)
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

  // Risk profile label based on returns
  const getRiskProfileLabel = (profile: RiskProfile) => {
    return riskReturns[profile].label;
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
  const createNewScenario = (type: ScenarioType) => {
    let newScenario: Scenario;
    
    if (type === "portfolio-analysis") {
      newScenario = {
        id: `new-portfolio-${Date.now()}`,
        name: "My Financial Portfolio",
        type: type,
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
        currentAssets: [
          {
            type: "savings",
            name: "Savings Account",
            value: 200000,
            annualGrowthRate: assetTypeDefaultGrowth["savings"],
            liquidityScore: assetTypeLiquidity["savings"],
            riskScore: assetTypeRisk["savings"],
            notes: "Emergency fund"
          }
        ]
      };
    } else if (type === "retirement") {
      newScenario = {
        id: `new-retirement-${Date.now()}`,
        name: "My Retirement Plan",
        type: type,
        initialInvestment: 100000,
        monthlyInvestment: 10000,
        years: 25,
        riskProfile: "moderate",
        inflationRate: 5,
        taxRate: 20,
        expectedReturns: 0, // Will be calculated from risk profile
        additionalContributions: [],
        withdrawals: [],
        currentAge: 30,
        retirementAge: 60
      };
    } else if (type === "education") {
      newScenario = {
        id: `new-education-${Date.now()}`,
        name: "Child's Education Fund",
        type: type,
        initialInvestment: 50000,
        monthlyInvestment: 5000,
        years: 15,
        riskProfile: "moderate",
        inflationRate: 6,
        taxRate: 10,
        expectedReturns: 0,
        additionalContributions: [],
        withdrawals: [],
        dependents: [
          {
            relation: "Child",
            age: 3,
            educationYear: 15,
            educationCost: 3000000
          }
        ]
      };
    } else {
      // Home, wealth or custom
      newScenario = {
        id: `new-${type}-${Date.now()}`,
        name: `My ${type.charAt(0).toUpperCase() + type.slice(1)} Plan`,
        type: type,
        initialInvestment: 100000,
        monthlyInvestment: 10000,
        years: type === "home" ? 5 : 10,
        riskProfile: type === "home" ? "conservative" : "moderate",
        inflationRate: 5,
        taxRate: 20,
        expectedReturns: 0,
        additionalContributions: [],
        withdrawals: []
      };
    }
    
    setCurrentScenario(newScenario);
    setActiveTab("portfolio");
  };

  // Add scenario to comparison
  const addToComparison = (scenario: Scenario) => {
    // Check if already in comparison
    if (!comparedScenarios.find(s => s.id === scenario.id)) {
      setComparedScenarios([...comparedScenarios, scenario]);
    }
    setComparisonMode(true);
  };

  // Remove scenario from comparison
  const removeFromComparison = (scenarioId: string) => {
    setComparedScenarios(comparedScenarios.filter(s => s.id !== scenarioId));
    if (comparedScenarios.length <= 1) {
      setComparisonMode(false);
    }
  };

  // Add new asset to portfolio
  const addAsset = () => {
    if (newAssetName && parseFloat(newAssetValue) > 0) {
      const newAsset: AssetAllocation = {
        type: newAssetType,
        name: newAssetName,
        value: parseFloat(newAssetValue),
        annualGrowthRate: assetTypeDefaultGrowth[newAssetType],
        liquidityScore: assetTypeLiquidity[newAssetType],
        riskScore: assetTypeRisk[newAssetType],
        notes: ""
      };
      
      const currentAssets = [...(currentScenario.currentAssets || [])];
      updateScenarioParam('currentAssets', [...currentAssets, newAsset]);
      
      // Reset form
      setNewAssetName("");
      setNewAssetValue("0");
      
      // Calculate new scenario results
      calculateScenarioResults();
    }
  };

  // Add new dependent to portfolio
  const addDependent = () => {
    if (newDependentRelation && parseInt(newDependentAge) >= 0) {
      const newDependent = {
        relation: newDependentRelation,
        age: parseInt(newDependentAge),
        educationYear: 18 - parseInt(newDependentAge),
        educationCost: 3000000
      };
      
      const dependents = [...(currentScenario.dependents || [])];
      updateScenarioParam('dependents', [...dependents, newDependent]);
      
      // Reset form
      setNewDependentRelation("");
      setNewDependentAge("0");
      
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
    <>
      <SEO 
        title="Financial Planner - Comprehensive Retirement & Investment Planning Tool"
        description="Advanced financial planning tool for retirement, education, and wealth building. Create comprehensive financial plans with scenario analysis, asset allocation, and goal-based investment strategies."
        keywords="financial planner, retirement planning tool, investment calculator, financial planning software, wealth building planner, retirement calculator, goal based investing, financial advisor tool"
        canonical="https://dollarmento.com/financial-planner"
      />
      <div className="p-6 max-w-4xl mx-auto">
      <Helmet>
        <title>Financial Planner | DollarMento</title>
        <meta name="description" content="Plan your financial future with DollarMento's interactive financial planner. Analyze your current portfolio and get personalized projections." />
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Financial Planner</h1>
          <p className="text-gray-600">Plan your financial future and analyze your portfolio performance</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 w-full flex">
          <TabsTrigger value="portfolio" className="flex-1">
            <span className="flex items-center">
              <span className="material-icons mr-2">account_balance</span>
              My Portfolio
            </span>
          </TabsTrigger>
          <TabsTrigger value="scenarios" className="flex-1">
            <span className="flex items-center">
              <span className="material-icons mr-2">timeline</span>
              Saved Scenarios
            </span>
          </TabsTrigger>
          <TabsTrigger value="compare" className="flex-1">
            <span className="flex items-center">
              <span className="material-icons mr-2">compare</span>
              Compare Plans
            </span>
          </TabsTrigger>
        </TabsList>

        {/* My Portfolio Tab */}
        <TabsContent value="portfolio" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{currentScenario.name}</h2>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={saveScenario}
                  >
                    <span className="material-icons mr-1 text-sm">save</span>
                    Save Plan
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => addToComparison(currentScenario)}
                  >
                    <span className="material-icons mr-1 text-sm">compare_arrows</span>
                    Compare
                  </Button>
                </div>
              </div>

              {/* Portfolio Summary Section */}
              {summaryVisible && scenarioResults.length > 0 && scenarioResults[0].portfolioAnalysis && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-lg">Portfolio Summary</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSummaryVisible(false)}
                    >
                      <span className="material-icons text-sm">expand_less</span>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-3 rounded-md border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium">CURRENT NET WORTH</p>
                      <p className="text-lg font-bold text-gray-900">
                        {formatCurrency(scenarioResults[0].portfolioAnalysis.currentValue)}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">Age: {currentScenario.currentAge}</span>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-md border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium">PROJECTED IN {currentScenario.years} YEARS</p>
                      <p className="text-lg font-bold text-gray-900">
                        {formatCurrency(scenarioResults[0].summary.finalAmount)}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">Age: {currentScenario.currentAge && currentScenario.currentAge + currentScenario.years}</span>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-md border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium">WEALTH GROWTH</p>
                      <p className="text-lg font-bold text-gray-900">
                        {scenarioResults[0].summary.wealthMultiplier.toFixed(2)}x
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">CAGR: {formatPercentage(((scenarioResults[0].summary.wealthMultiplier) ** (1 / currentScenario.years) - 1) * 100)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-md border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium">EMERGENCY FUND</p>
                      <p className="text-lg font-bold text-gray-900">
                        {scenarioResults[0].portfolioAnalysis.emergencyFundMonths.toFixed(1)} months
                      </p>
                      <div className="flex items-center mt-1">
                        <span className={`text-xs ${
                          scenarioResults[0].portfolioAnalysis.emergencyFundMonths > 6 
                            ? "text-green-500" 
                            : "text-amber-500"
                        }`}>
                          {scenarioResults[0].portfolioAnalysis.emergencyFundMonths > 12 
                            ? "Very Strong" 
                            : scenarioResults[0].portfolioAnalysis.emergencyFundMonths > 6 
                              ? "Good" 
                              : "Needs Attention"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Portfolio Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column - Basic Information */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="plan-name">Plan Name</Label>
                      <Input 
                        id="plan-name"
                        value={currentScenario.name} 
                        onChange={(e) => updateScenarioParam('name', e.target.value)}
                        className="mt-1" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="current-age">Current Age</Label>
                        <Input 
                          id="current-age"
                          type="number"
                          value={currentScenario.currentAge || currentAge} 
                          onChange={(e) => {
                            const age = parseInt(e.target.value);
                            updateScenarioParam('currentAge', age);
                            setCurrentAge(age);
                          }}
                          className="mt-1" 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="retirement-age">Retirement Age</Label>
                        <Input 
                          id="retirement-age"
                          type="number"
                          value={currentScenario.retirementAge || 60} 
                          onChange={(e) => updateScenarioParam('retirementAge', parseInt(e.target.value))}
                          className="mt-1" 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="monthly-income">Monthly Income ($)</Label>
                        <Input 
                          id="monthly-income"
                          type="number"
                          value={currentScenario.monthlyIncome || 0} 
                          onChange={(e) => updateScenarioParam('monthlyIncome', parseInt(e.target.value))}
                          className="mt-1" 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="monthly-savings">Monthly Savings ($)</Label>
                        <Input 
                          id="monthly-savings"
                          type="number"
                          value={currentScenario.monthlySavings || 0} 
                          onChange={(e) => updateScenarioParam('monthlySavings', parseInt(e.target.value))}
                          className="mt-1" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="monthly-expenses">Monthly Expenses ($)</Label>
                      <Input 
                        id="monthly-expenses"
                        type="number"
                        value={currentScenario.monthlyExpenses || 0} 
                        onChange={(e) => updateScenarioParam('monthlyExpenses', parseInt(e.target.value))}
                        className="mt-1" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <Label htmlFor="projection-years">Projection Years</Label>
                        <span className="text-sm text-gray-500">{currentScenario.years} years</span>
                      </div>
                      <Slider 
                        id="projection-years"
                        value={[currentScenario.years]}
                        min={1}
                        max={40}
                        step={1}
                        onValueChange={(value) => updateScenarioParam('years', value[0])}
                        className="mt-2" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <Label htmlFor="inflation-rate">Inflation Rate (%)</Label>
                        <span className="text-sm text-gray-500">{currentScenario.inflationRate}%</span>
                      </div>
                      <Slider 
                        id="inflation-rate"
                        value={[currentScenario.inflationRate]}
                        min={2}
                        max={10}
                        step={0.5}
                        onValueChange={(value) => updateScenarioParam('inflationRate', value[0])}
                        className="mt-2" 
                      />
                    </div>
                    
                    <div>
                      <Button 
                        className="w-full"
                        variant="outline"
                        onClick={() => calculateScenarioResults()}
                      >
                        <span className="material-icons mr-2">calculate</span>
                        Calculate Projections
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Middle Column - Current Assets */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-900">My Assets</h3>
                    {!summaryVisible && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSummaryVisible(true)}
                      >
                        <span className="material-icons text-sm mr-1">show_chart</span>
                        Show Summary
                      </Button>
                    )}
                  </div>
                  
                  <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <Label htmlFor="asset-type" className="text-xs">Asset Type</Label>
                        <Select 
                          value={newAssetType}
                          onValueChange={(value: AssetType) => setNewAssetType(value)}
                        >
                          <SelectTrigger id="asset-type" className="mt-1">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="savings">Savings Account</SelectItem>
                            <SelectItem value="mutual-funds">Mutual Funds</SelectItem>
                            <SelectItem value="stocks">Stocks</SelectItem>
                            <SelectItem value="fixed-deposit">Fixed Deposit</SelectItem>
                            <SelectItem value="ppf">PPF</SelectItem>
                            <SelectItem value="epf">EPF</SelectItem>
                            <SelectItem value="nps">NPS</SelectItem>
                            <SelectItem value="sukanya-samriddhi">Sukanya Samriddhi</SelectItem>
                            <SelectItem value="gold">Gold</SelectItem>
                            <SelectItem value="real-estate">Real Estate</SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="asset-name" className="text-xs">Asset Name</Label>
                        <Input
                          id="asset-name"
                          value={newAssetName}
                          onChange={(e) => setNewAssetName(e.target.value)}
                          placeholder="Name/Description"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <Label htmlFor="asset-value" className="text-xs">Current Value ($)</Label>
                        <Input
                          id="asset-value"
                          type="number"
                          value={newAssetValue}
                          onChange={(e) => setNewAssetValue(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="flex items-end">
                        <Button 
                          onClick={addAsset}
                          className="w-full"
                          disabled={!newAssetName || parseFloat(newAssetValue) <= 0}
                        >
                          <span className="material-icons mr-1 text-sm">add</span>
                          Add Asset
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="max-h-[400px] overflow-y-auto pr-2">
                    {currentScenario.currentAssets && currentScenario.currentAssets.length > 0 ? (
                      currentScenario.currentAssets.map((asset, index) => (
                        <div key={index} className="p-3 bg-white border border-gray-200 rounded-md mb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{asset.name}</p>
                              <div className="flex items-center mt-1">
                                <Badge variant="secondary" className="mr-2">
                                  {getAssetTypeDisplayName(asset.type)}
                                </Badge>
                                <span className="text-sm text-gray-500">{formatCurrency(asset.value)}</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {asset.annualGrowthRate}% annual growth
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAsset(index)}
                              className="h-8 w-8 p-0"
                            >
                              <span className="material-icons text-red-500">delete</span>
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <span className="material-icons text-4xl mb-2">account_balance_wallet</span>
                        <p>No assets added yet</p>
                        <p className="text-sm">Add your assets to see portfolio insights</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Right Column - Dependents */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Dependents & Goals</h3>
                  
                  <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <Label htmlFor="dependent-relation" className="text-xs">Relation</Label>
                        <Input
                          id="dependent-relation"
                          value={newDependentRelation}
                          onChange={(e) => setNewDependentRelation(e.target.value)}
                          placeholder="Child, Spouse, etc."
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="dependent-age" className="text-xs">Current Age</Label>
                        <Input
                          id="dependent-age"
                          type="number"
                          value={newDependentAge}
                          onChange={(e) => setNewDependentAge(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={addDependent}
                        disabled={!newDependentRelation || parseInt(newDependentAge) < 0}
                      >
                        <span className="material-icons mr-1 text-sm">person_add</span>
                        Add Dependent
                      </Button>
                    </div>
                  </div>
                  
                  <div className="max-h-[230px] overflow-y-auto pr-2 mb-4">
                    {currentScenario.dependents && currentScenario.dependents.length > 0 ? (
                      currentScenario.dependents.map((dependent, index) => (
                        <div key={index} className="p-3 bg-white border border-gray-200 rounded-md mb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{dependent.relation}</p>
                              <p className="text-sm text-gray-500">Age: {dependent.age}</p>
                              {dependent.educationYear && (
                                <p className="text-xs text-gray-500">
                                  Education in {dependent.educationYear} years
                                  {dependent.educationCost && ` (${formatCurrency(dependent.educationCost)})`}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDependent(index)}
                              className="h-8 w-8 p-0"
                            >
                              <span className="material-icons text-red-500">delete</span>
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <span className="material-icons text-3xl mb-2">family_restroom</span>
                        <p className="text-sm">No dependents added</p>
                      </div>
                    )}
                  </div>
                  

                </div>
              </div>
              
              {/* Portfolio Analysis Results */}
              {scenarioResults.length > 0 && scenarioResults[0].portfolioAnalysis && (
                <div className="mt-8">
                  <h3 className="font-medium text-lg mb-4">Portfolio Analysis</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Asset Allocation Chart */}
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-4">Asset Allocation</h4>
                        <div className="h-[250px]">
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
                    
                    {/* Portfolio Health Indicators */}
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-4">Portfolio Health</h4>
                        
                        <div className="space-y-5">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Risk Level</span>
                              <span className="text-sm font-medium">
                                {scenarioResults[0].portfolioAnalysis.riskScore < 3
                                  ? "Conservative" 
                                  : scenarioResults[0].portfolioAnalysis.riskScore < 5
                                    ? "Moderate"
                                    : scenarioResults[0].portfolioAnalysis.riskScore < 7
                                      ? "Balanced"
                                      : "Aggressive"}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${(scenarioResults[0].portfolioAnalysis.riskScore / 10) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Portfolio risk score: {scenarioResults[0].portfolioAnalysis.riskScore.toFixed(1)}/10</p>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Liquidity</span>
                              <span className="text-sm font-medium">
                                {scenarioResults[0].portfolioAnalysis.liquidityScore < 3
                                  ? "Low" 
                                  : scenarioResults[0].portfolioAnalysis.liquidityScore < 5
                                    ? "Moderate"
                                    : scenarioResults[0].portfolioAnalysis.liquidityScore < 7
                                      ? "Good"
                                      : "Excellent"}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${(scenarioResults[0].portfolioAnalysis.liquidityScore / 10) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Liquidity score: {scenarioResults[0].portfolioAnalysis.liquidityScore.toFixed(1)}/10</p>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Retirement Readiness</span>
                              <span className="text-sm font-medium">
                                {scenarioResults[0].portfolioAnalysis.retirementReadiness.fundingPercentage < 30
                                  ? "Needs Attention" 
                                  : scenarioResults[0].portfolioAnalysis.retirementReadiness.fundingPercentage < 60
                                    ? "On Track"
                                    : scenarioResults[0].portfolioAnalysis.retirementReadiness.fundingPercentage < 90
                                      ? "Strong"
                                      : "Excellent"}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`${
                                  scenarioResults[0].portfolioAnalysis.retirementReadiness.fundingPercentage < 30
                                    ? "bg-red-500"
                                    : scenarioResults[0].portfolioAnalysis.retirementReadiness.fundingPercentage < 60
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                } h-2 rounded-full`} 
                                style={{ width: `${Math.min(100, scenarioResults[0].portfolioAnalysis.retirementReadiness.fundingPercentage)}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Your portfolio can support {scenarioResults[0].portfolioAnalysis.retirementReadiness.yearsOfExpensesCovered.toFixed(1)} years of retirement expenses
                            </p>
                          </div>
                          
                          {/* Education Funding Progress if there are dependents */}
                          {currentScenario.dependents && currentScenario.dependents.length > 0 && (
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm">Education Funding</span>
                                <span className="text-sm font-medium">
                                  {scenarioResults[0].portfolioAnalysis.educationGoalFunding.fundingPercentage < 30
                                    ? "Needs Attention" 
                                    : scenarioResults[0].portfolioAnalysis.educationGoalFunding.fundingPercentage < 60
                                      ? "On Track"
                                      : scenarioResults[0].portfolioAnalysis.educationGoalFunding.fundingPercentage < 90
                                        ? "Strong"
                                        : "Excellent"}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`${
                                    scenarioResults[0].portfolioAnalysis.educationGoalFunding.fundingPercentage < 30
                                      ? "bg-red-500"
                                      : scenarioResults[0].portfolioAnalysis.educationGoalFunding.fundingPercentage < 60
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                  } h-2 rounded-full`} 
                                  style={{ width: `${Math.min(100, scenarioResults[0].portfolioAnalysis.educationGoalFunding.fundingPercentage)}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {scenarioResults[0].portfolioAnalysis.educationGoalFunding.fundingPercentage >= 100
                                  ? "Education fully funded!"
                                  : `Shortfall: ${formatCurrency(scenarioResults[0].portfolioAnalysis.educationGoalFunding.shortfall)}`}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Projection Chart */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-4">Portfolio Growth Projection</h4>
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
                              tickFormatter={(value) => `$${(value / 100000).toFixed(1)}L`}
                              label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} 
                            />
                            <Tooltip 
                              formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]}
                              labelFormatter={(label) => `Year ${label} (Age ${scenarioResults[0].data[label].age})`}
                            />
                            <Legend />
                            <Area 
                              type="monotone" 
                              dataKey="totalAmount" 
                              stackId="1"
                              name="Total Portfolio Value" 
                              stroke="#4f46e5" 
                              fill="#4f46e5" 
                              fillOpacity={0.6}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="inflationAdjustedValue" 
                              stackId="3"
                              name="Inflation-Adjusted Value" 
                              stroke="#f97316" 
                              fill="#f97316" 
                              fillOpacity={0.3} 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Saved Scenarios Tab */}
        <TabsContent value="scenarios" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Saved Financial Plans</h2>
                <div>
                  <Button 
                    variant="default"
                    onClick={() => createNewScenario("portfolio-analysis")}
                  >
                    <span className="material-icons mr-1 text-sm">add</span>
                    Create New Plan
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scenarios.map((scenario) => (
                  <Card key={scenario.id} className="overflow-hidden">
                    <div className={`h-1 ${
                      scenario.type === "portfolio-analysis" ? "bg-teal-500" :
                      scenario.type === "retirement" ? "bg-blue-500" :
                      scenario.type === "education" ? "bg-green-500" :
                      "bg-purple-500"
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
                            setActiveTab("portfolio");
                            calculateScenarioResults();
                          }}
                        >
                          <span className="material-icons mr-1 text-sm">edit</span>
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => addToComparison(scenario)}
                        >
                          <span className="material-icons mr-1 text-sm">compare</span>
                          Compare
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Quick Start Templates */}
              <div className="mt-8">
                <h3 className="font-medium text-lg mb-4">Start a New Plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center p-6 h-auto"
                    onClick={() => createNewScenario("portfolio-analysis")}
                  >
                    <span className="material-icons text-teal-500 mb-2 text-3xl">analytics</span>
                    <span className="font-medium">Portfolio Analysis</span>
                    <span className="text-xs text-gray-500 mt-1">Analyze your current investments</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center p-6 h-auto"
                    onClick={() => createNewScenario("retirement")}
                  >
                    <span className="material-icons text-blue-500 mb-2 text-3xl">elderly</span>
                    <span className="font-medium">Retirement Plan</span>
                    <span className="text-xs text-gray-500 mt-1">Plan for your retirement</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center p-6 h-auto"
                    onClick={() => createNewScenario("education")}
                  >
                    <span className="material-icons text-green-500 mb-2 text-3xl">school</span>
                    <span className="font-medium">Education Fund</span>
                    <span className="text-xs text-gray-500 mt-1">Save for children's education</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center p-6 h-auto"
                    onClick={() => createNewScenario("home")}
                  >
                    <span className="material-icons text-amber-500 mb-2 text-3xl">home</span>
                    <span className="font-medium">Home Purchase</span>
                    <span className="text-xs text-gray-500 mt-1">Save for a down payment</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compare Scenarios Tab */}
        <TabsContent value="compare" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Compare Financial Plans</h2>
                <div>
                  <Button 
                    variant="outline"
                    onClick={() => setComparedScenarios([])}
                    disabled={comparedScenarios.length === 0}
                  >
                    <span className="material-icons mr-1 text-sm">clear</span>
                    Clear All
                  </Button>
                </div>
              </div>
              
              {comparedScenarios.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {comparedScenarios.map((scenario, index) => (
                      <Card key={scenario.id} className={`bg-${index === 0 ? 'blue' : index === 1 ? 'green' : index === 2 ? 'purple' : 'amber'}-50`}>
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
                            onClick={() => setActiveTab("scenarios")}
                          >
                            <span className="material-icons mr-1">add</span>
                            Add Plan
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-medium text-lg mb-4">Growth Comparison</h3>
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
                            tickFormatter={(value) => `$${(value / 100000).toFixed(1)}L`}
                            label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} 
                          />
                          <Tooltip 
                            formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]}
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
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-medium text-lg mb-4">Comparison Summary</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Years</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Profile</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invested Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Multiple</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {scenarioResults.map((result, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.scenario.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.scenario.years}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {result.scenario.type !== "portfolio-analysis" 
                                  ? getRiskProfileLabel(result.scenario.riskProfile)
                                  : "Portfolio Analysis"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(result.summary.totalInvestmentAmount)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(result.summary.finalAmount)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.summary.wealthMultiplier.toFixed(2)}x</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <span className="material-icons text-5xl text-gray-300 mb-4">compare</span>
                  <h3 className="text-xl font-medium text-gray-700">No plans to compare</h3>
                  <p className="text-gray-500 mt-2">Add financial plans to compare their performance</p>
                  <Button 
                    className="mt-4"
                    onClick={() => setActiveTab("scenarios")}
                  >
                    Select Plans
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

    </div>
    </>
  );
}