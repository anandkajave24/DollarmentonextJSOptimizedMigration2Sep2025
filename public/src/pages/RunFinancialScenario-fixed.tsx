import { useState, useEffect } from "react";
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
  // Real world portfolio analysis scenarios
  {
    id: "portfolio-analysis-38yr-retirement",
    name: "38yr Professional with Home Loan",
    type: "portfolio-analysis",
    initialInvestment: 0,
    monthlyInvestment: 0,
    years: 17,
    riskProfile: "moderate",
    inflationRate: 6,
    taxRate: 30,
    expectedReturns: 0,
    additionalContributions: [],
    withdrawals: [],
    currentAge: 38,
    retirementAge: 55,
    monthlyExpenses: 100000,
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
        name: "Parag Parikh Flexi cap",
        value: 443000,
        annualGrowthRate: 12,
        liquidityScore: 6,
        riskScore: 7,
        notes: "SIP 10k/month"
      },
      {
        type: "mutual-funds",
        name: "ICICI Prudential Nifty Next 50",
        value: 294000,
        annualGrowthRate: 11,
        liquidityScore: 6,
        riskScore: 8,
        notes: "SIP 5k/month"
      },
      {
        type: "mutual-funds",
        name: "Kotak Equity Opportunities",
        value: 150000,
        annualGrowthRate: 12,
        liquidityScore: 6,
        riskScore: 7,
        notes: "Growth fund"
      },
      {
        type: "mutual-funds",
        name: "Franklin ELSS",
        value: 70000,
        annualGrowthRate: 11,
        liquidityScore: 6,
        riskScore: 7,
        notes: "Tax saving fund"
      },
      {
        type: "mutual-funds",
        name: "HDFC Mid Cap Opportunities",
        value: 100000,
        annualGrowthRate: 13,
        liquidityScore: 6,
        riskScore: 8,
        notes: "SIP 5k/month"
      },
      {
        type: "mutual-funds",
        name: "Nippon India Small Cap",
        value: 150000,
        annualGrowthRate: 14,
        liquidityScore: 6,
        riskScore: 9,
        notes: "SIP 5k/month"
      },
      {
        type: "stocks",
        name: "Direct Equities",
        value: 900000,
        annualGrowthRate: 13,
        liquidityScore: 7,
        riskScore: 9,
        notes: "Direct stock portfolio"
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
        name: "Public Provident Fund",
        value: 150000,
        annualGrowthRate: 7.1,
        liquidityScore: 2,
        riskScore: 1,
        notes: "Long-term savings"
      },
      {
        type: "epf",
        name: "Employee Provident Fund",
        value: 200000,
        annualGrowthRate: 8.15,
        liquidityScore: 2,
        riskScore: 1,
        notes: "Retirement savings"
      }
    ]
  },
  {
    id: "portfolio-analysis-39yr-home-loan",
    name: "39yr Professional with Home Loan",
    type: "portfolio-analysis",
    initialInvestment: 0,
    monthlyInvestment: 0,
    years: 21,
    riskProfile: "moderate",
    inflationRate: 5.5,
    taxRate: 30,
    expectedReturns: 0,
    additionalContributions: [],
    withdrawals: [],
    currentAge: 39,
    retirementAge: 60,
    monthlyExpenses: 70000,
    dependents: [
      {
        relation: "Daughter",
        age: 9,
        educationYear: 9,
        educationCost: 3500000
      }
    ],
    currentAssets: [
      {
        type: "epf",
        name: "Provident Fund",
        value: 1800000,
        annualGrowthRate: 8.15,
        liquidityScore: 2,
        riskScore: 1,
        notes: "Retirement savings"
      },
      {
        type: "mutual-funds",
        name: "Mutual Fund Portfolio",
        value: 1900000,
        annualGrowthRate: 12,
        liquidityScore: 6,
        riskScore: 7,
        notes: "Monthly SIP 40k"
      },
      {
        type: "stocks",
        name: "Shares",
        value: 800000,
        annualGrowthRate: 13,
        liquidityScore: 7,
        riskScore: 8,
        notes: "Direct equities"
      }
    ]
  },
  {
    id: "portfolio-analysis-35yr-diverse",
    name: "35yr Investor with Diverse Portfolio",
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
    currentAge: 35,
    retirementAge: 60,
    monthlyExpenses: 30000,
    dependents: [
      {
        relation: "Daughter",
        age: 5,
        educationYear: 13,
        educationCost: 4000000
      }
    ],
    currentAssets: [
      {
        type: "stocks",
        name: "Shares",
        value: 1500000,
        annualGrowthRate: 13,
        liquidityScore: 7,
        riskScore: 8,
        notes: "Direct equity investments"
      },
      {
        type: "mutual-funds",
        name: "Mutual Fund SIPs",
        value: 700000,
        annualGrowthRate: 12,
        liquidityScore: 6,
        riskScore: 7,
        notes: "Mix of regular and index funds"
      },
      {
        type: "gold",
        name: "Gold Bonds",
        value: 700000,
        annualGrowthRate: 8,
        liquidityScore: 4,
        riskScore: 6,
        notes: "Sovereign gold bonds"
      },
      {
        type: "gold",
        name: "Physical Gold",
        value: 1600000,
        annualGrowthRate: 8,
        liquidityScore: 3,
        riskScore: 6,
        notes: "Gold holdings"
      },
      {
        type: "nps",
        name: "National Pension System",
        value: 200000,
        annualGrowthRate: 9,
        liquidityScore: 2,
        riskScore: 4,
        notes: "Monthly 18k contribution"
      },
      {
        type: "other",
        name: "Monthly Income Scheme",
        value: 900000,
        annualGrowthRate: 7,
        liquidityScore: 5,
        riskScore: 3,
        notes: "Generates 5550/month for Sukanya Samriddhi"
      },
      {
        type: "fixed-deposit",
        name: "Fixed Deposit",
        value: 500000,
        annualGrowthRate: 6.5,
        liquidityScore: 7,
        riskScore: 2,
        notes: "Bank FD"
      }
    ]
  },
  {
    id: "portfolio-analysis-33yr-aggressive",
    name: "33.5yr Couple with Aggressive Goals",
    type: "portfolio-analysis",
    initialInvestment: 0,
    monthlyInvestment: 0,
    years: 6.5,
    riskProfile: "aggressive",
    inflationRate: 6,
    taxRate: 30,
    expectedReturns: 0,
    additionalContributions: [],
    withdrawals: [],
    currentAge: 33.5,
    retirementAge: 40,
    monthlyExpenses: 150000,
    dependents: [],
    currentAssets: [
      {
        type: "mutual-funds",
        name: "Mutual Fund Portfolio",
        value: 3700000,
        annualGrowthRate: 12,
        liquidityScore: 6,
        riskScore: 7,
        notes: "Monthly SIP 2 lakh"
      },
      {
        type: "fixed-deposit",
        name: "Fixed Deposits",
        value: 5000000,
        annualGrowthRate: 6.5,
        liquidityScore: 7,
        riskScore: 2,
        notes: "Bank FDs"
      },
      {
        type: "ppf",
        name: "Public Provident Fund",
        value: 2500000,
        annualGrowthRate: 7.1,
        liquidityScore: 2,
        riskScore: 1,
        notes: "Monthly 25k contribution"
      },
      {
        type: "gold",
        name: "Gold and Gold Bonds",
        value: 2000000,
        annualGrowthRate: 8,
        liquidityScore: 4,
        riskScore: 6,
        notes: "Adding 12g sovereign gold yearly"
      },
      {
        type: "stocks",
        name: "Indian Stocks",
        value: 100000,
        annualGrowthRate: 13,
        liquidityScore: 7,
        riskScore: 8,
        notes: "Mainly HDFC"
      },
      {
        type: "other",
        name: "US Stocks ETFs",
        value: 700000,
        annualGrowthRate: 10,
        liquidityScore: 7,
        riskScore: 7,
        notes: "International diversification"
      }
    ]
  },
  // Standard scenario templates
  {
    id: "portfolio-analysis-1",
    name: "Mid-career Portfolio Analysis",
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
    currentAge: 45,
    retirementAge: 60,
    monthlyExpenses: 120000,
    dependents: [
      {
        relation: "Daughter",
        age: 13,
        educationYear: 5,
        educationCost: 5000000
      }
    ],
    currentAssets: [
      {
        type: "savings",
        name: "Savings Account",
        value: 1200000,
        annualGrowthRate: 3.5,
        liquidityScore: 9,
        riskScore: 1,
        notes: "Emergency fund"
      },
      {
        type: "mutual-funds",
        name: "Equity Mutual Funds",
        value: 33400000,
        annualGrowthRate: 12,
        liquidityScore: 6,
        riskScore: 7,
        notes: "Core wealth-building asset"
      },
      {
        type: "nps",
        name: "National Pension System",
        value: 779000,
        annualGrowthRate: 9,
        liquidityScore: 2,
        riskScore: 4,
        notes: "Retirement focused investment with tax benefits"
      },
      {
        type: "sukanya-samriddhi",
        name: "Sukanya Samriddhi Yojana",
        value: 1600000,
        annualGrowthRate: 7.6,
        liquidityScore: 2,
        riskScore: 1,
        notes: "For daughter's education/marriage"
      },
      {
        type: "cash",
        name: "Cash Holdings",
        value: 1600000,
        annualGrowthRate: 0,
        liquidityScore: 10,
        riskScore: 1,
        notes: "Immediate liquidity"
      },
      {
        type: "gold",
        name: "Gold Investments",
        value: 1500000,
        annualGrowthRate: 8,
        liquidityScore: 4,
        riskScore: 6,
        notes: "Portfolio hedge"
      },
      {
        type: "real-estate",
        name: "Residential Property",
        value: 20000000,
        annualGrowthRate: 7,
        liquidityScore: 1,
        riskScore: 5,
        notes: "Primary residence"
      },
      {
        type: "other",
        name: "Other Assets",
        value: 2200000,
        annualGrowthRate: 5,
        liquidityScore: 3,
        riskScore: 5,
        notes: "Various smaller investments"
      }
    ]
  },
  {
    id: "retirement-1",
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
    id: "education-1",
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
  },
  {
    id: "home-1",
    name: "Home Down Payment",
    type: "home",
    initialInvestment: 200000,
    monthlyInvestment: 15000,
    years: 5,
    riskProfile: "conservative",
    inflationRate: 5,
    taxRate: 10,
    expectedReturns: 7,
    additionalContributions: [],
    withdrawals: []
  }
];

export default function RunFinancialScenario() {
  const [scenarios, setScenarios] = useState<Scenario[]>(defaultScenarios);
  const [currentScenario, setCurrentScenario] = useState<Scenario>(defaultScenarios[0]);
  const [activeTab, setActiveTab] = useState<string>("setup");
  const [activeSubTab, setActiveSubTab] = useState<string>("personal");
  const [comparisonMode, setComparisonMode] = useState<boolean>(false);
  const [comparedScenarios, setComparedScenarios] = useState<Scenario[]>([]);
  const [scenarioResults, setScenarioResults] = useState<any[]>([]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);
  const [currentAge, setCurrentAge] = useState<number>(30);

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
        age: currentAge + year,
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
        contrib => contrib.age === (currentAge + year)
      );
      
      if (contributions.length > 0) {
        contributions.forEach(contrib => {
          currentAmount += contrib.amount;
          totalInvested += contrib.amount;
        });
      }
      
      // Apply any withdrawals for this year
      const yearWithdrawals = scenario.withdrawals.filter(
        withdrawal => withdrawal.age === (currentAge + year)
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
        name: "My Personal Portfolio Analysis",
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
          },
          {
            type: "mutual-funds",
            name: "Equity Mutual Funds",
            value: 300000,
            annualGrowthRate: assetTypeDefaultGrowth["mutual-funds"],
            liquidityScore: assetTypeLiquidity["mutual-funds"],
            riskScore: assetTypeRisk["mutual-funds"],
            notes: "Monthly SIP"
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
        currentAge: 35,
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
    } else if (type === "home") {
      newScenario = {
        id: `new-home-${Date.now()}`,
        name: "Home Down Payment",
        type: type,
        initialInvestment: 200000,
        monthlyInvestment: 15000,
        years: 5,
        riskProfile: "conservative",
        inflationRate: 5,
        taxRate: 10,
        expectedReturns: 0,
        additionalContributions: [],
        withdrawals: []
      };
    } else {
      // Wealth building or custom
      newScenario = {
        id: `new-${type}-${Date.now()}`,
        name: `My ${type.charAt(0).toUpperCase() + type.slice(1)} Building Plan`,
        type: type,
        initialInvestment: 100000,
        monthlyInvestment: 10000,
        years: 10,
        riskProfile: "moderate",
        inflationRate: 5,
        taxRate: 20,
        expectedReturns: 0,
        additionalContributions: [],
        withdrawals: []
      };
    }
    
    setCurrentScenario(newScenario);
    setActiveTab("setup");
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Helmet>
        <title>Run Financial Scenario | RupeeSmart</title>
        <meta name="description" content="Simulate various financial scenarios like retirement, education planning, or wealth building to visualize your financial future." />
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Run Financial Scenarios</h1>
          <p className="text-gray-600">Create and compare different financial scenarios to make informed decisions</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="comparison-mode" className="text-sm">Comparison Mode</Label>
            <Switch 
              id="comparison-mode" 
              checked={comparisonMode} 
              onCheckedChange={setComparisonMode} 
            />
          </div>
        </div>
      </div>

      {!comparisonMode ? (
        <div>
          <Tabs
            defaultValue="setup"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="setup">Scenario Setup</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="manage">Manage Scenarios</TabsTrigger>
            </TabsList>

            <TabsContent value="setup" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                      <div className="space-y-4">
                        <div className="mb-6">
                          <h3 className="text-lg font-medium mb-3">Common Financial Situations</h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Start with these templates or create your own personalized financial plan
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Button 
                              variant="outline" 
                              className="flex justify-between items-center p-3 h-auto w-full"
                              onClick={() => {
                                const selected = scenarios.find(s => s.id === "portfolio-analysis-38yr-retirement");
                                if (selected) {
                                  setCurrentScenario(selected);
                                  calculateScenarioResults();
                                  setActiveTab("results");
                                }
                              }}
                            >
                              <div className="flex flex-col items-start text-left">
                                <span className="font-medium">Family Planning</span>
                                <span className="text-xs text-gray-600">Education & retirement goals, multiple assets</span>
                              </div>
                              <span className="material-icons text-teal-500">family_restroom</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex justify-between items-center p-3 h-auto w-full"
                              onClick={() => {
                                const selected = scenarios.find(s => s.id === "portfolio-analysis-39yr-home-loan");
                                if (selected) {
                                  setCurrentScenario(selected);
                                  calculateScenarioResults();
                                  setActiveTab("results");
                                }
                              }}
                            >
                              <div className="flex flex-col items-start text-left">
                                <span className="font-medium">Home Owner</span>
                                <span className="text-xs text-gray-600">Balancing loan & investments</span>
                              </div>
                              <span className="material-icons text-blue-500">home</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex justify-between items-center p-3 h-auto w-full"
                              onClick={() => {
                                const selected = scenarios.find(s => s.id === "portfolio-analysis-35yr-diverse");
                                if (selected) {
                                  setCurrentScenario(selected);
                                  calculateScenarioResults();
                                  setActiveTab("results");
                                }
                              }}
                            >
                              <div className="flex flex-col items-start text-left">
                                <span className="font-medium">Diversified Investor</span>
                                <span className="text-xs text-gray-600">Multiple asset classes & investments</span>
                              </div>
                              <span className="material-icons text-amber-500">pie_chart</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex justify-between items-center p-3 h-auto w-full"
                              onClick={() => {
                                const selected = scenarios.find(s => s.id === "portfolio-analysis-33yr-aggressive");
                                if (selected) {
                                  setCurrentScenario(selected);
                                  calculateScenarioResults();
                                  setActiveTab("results");
                                }
                              }}
                            >
                              <div className="flex flex-col items-start text-left">
                                <span className="font-medium">Aggressive Growth</span>
                                <span className="text-xs text-gray-600">Accelerated wealth building strategy</span>
                              </div>
                              <span className="material-icons text-purple-500">rocket_launch</span>
                            </Button>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h3 className="text-lg font-medium mb-3">Create New Scenario</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <Button 
                              variant="outline" 
                              className="flex flex-col items-center p-4 h-auto"
                              onClick={() => createNewScenario("portfolio-analysis")}
                            >
                              <span className="material-icons text-teal-500 mb-2">analytics</span>
                              <span className="text-sm">Portfolio Analysis</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex flex-col items-center p-4 h-auto"
                              onClick={() => createNewScenario("retirement")}
                            >
                              <span className="material-icons text-blue-500 mb-2">elderly</span>
                              <span className="text-sm">Retirement</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex flex-col items-center p-4 h-auto"
                              onClick={() => createNewScenario("education")}
                            >
                              <span className="material-icons text-green-500 mb-2">school</span>
                              <span className="text-sm">Education</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex flex-col items-center p-4 h-auto"
                              onClick={() => createNewScenario("home")}
                            >
                              <span className="material-icons text-amber-500 mb-2">home</span>
                              <span className="text-sm">Home</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex flex-col items-center p-4 h-auto"
                              onClick={() => createNewScenario("wealth")}
                            >
                              <span className="material-icons text-purple-500 mb-2">diamond</span>
                              <span className="text-sm">Wealth</span>
                            </Button>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-3">Load Saved Scenario</h3>
                          <Select 
                            onValueChange={(value) => {
                              const selected = scenarios.find(s => s.id === value);
                              if (selected) {
                                setCurrentScenario(selected);
                              }
                            }}
                            value={currentScenario.id}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a scenario" />
                            </SelectTrigger>
                            <SelectContent>
                              {scenarios.map((scenario) => (
                                <SelectItem key={scenario.id} value={scenario.id}>
                                  {scenario.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-3 space-y-6">
                      <div>
                        <h3 className="font-medium text-lg mb-4">Configure Scenario Parameters</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <Label htmlFor="scenario-name">Scenario Name</Label>
                            <Input 
                              id="scenario-name"
                              value={currentScenario.name} 
                              onChange={(e) => updateScenarioParam('name', e.target.value)}
                              className="mt-1" 
                            />
                          </div>
                          
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
                        </div>

                        {currentScenario.type === "portfolio-analysis" ? (
                          <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                              
                              <div>
                                <Label htmlFor="monthly-expenses">Monthly Expenses (₹)</Label>
                                <Input 
                                  id="monthly-expenses"
                                  type="number"
                                  value={currentScenario.monthlyExpenses || 100000} 
                                  onChange={(e) => updateScenarioParam('monthlyExpenses', parseInt(e.target.value))}
                                  className="mt-1" 
                                />
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <div className="flex justify-between">
                                <Label htmlFor="projection-years">Projection Duration (Years)</Label>
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
                            
                            <div className="mb-6">
                              <div className="flex justify-between mb-2">
                                <Label htmlFor="inflation-rate">Assumed Inflation Rate (%)</Label>
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
                            
                            <div className="mb-6">
                              <h4 className="font-medium text-sm mb-2">Dependents</h4>
                              {currentScenario.dependents && currentScenario.dependents.map((dependent, index) => (
                                <div key={index} className="p-3 border border-gray-200 rounded-md mb-2">
                                  <div className="grid grid-cols-2 gap-2 mb-2">
                                    <div>
                                      <Label htmlFor={`dependent-relation-${index}`}>Relation</Label>
                                      <Input 
                                        id={`dependent-relation-${index}`}
                                        value={dependent.relation} 
                                        onChange={(e) => {
                                          const newDependents = [...(currentScenario.dependents || [])];
                                          newDependents[index] = {...newDependents[index], relation: e.target.value};
                                          updateScenarioParam('dependents', newDependents);
                                        }}
                                        className="mt-1" 
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor={`dependent-age-${index}`}>Age</Label>
                                      <Input 
                                        id={`dependent-age-${index}`}
                                        type="number"
                                        value={dependent.age} 
                                        onChange={(e) => {
                                          const newDependents = [...(currentScenario.dependents || [])];
                                          newDependents[index] = {...newDependents[index], age: parseInt(e.target.value)};
                                          updateScenarioParam('dependents', newDependents);
                                        }}
                                        className="mt-1" 
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <Label htmlFor={`education-year-${index}`}>Education in (years)</Label>
                                      <Input 
                                        id={`education-year-${index}`}
                                        type="number"
                                        value={dependent.educationYear || 5} 
                                        onChange={(e) => {
                                          const newDependents = [...(currentScenario.dependents || [])];
                                          newDependents[index] = {...newDependents[index], educationYear: parseInt(e.target.value)};
                                          updateScenarioParam('dependents', newDependents);
                                        }}
                                        className="mt-1" 
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor={`education-cost-${index}`}>Education Cost (₹)</Label>
                                      <Input 
                                        id={`education-cost-${index}`}
                                        type="number"
                                        value={dependent.educationCost || 3000000} 
                                        onChange={(e) => {
                                          const newDependents = [...(currentScenario.dependents || [])];
                                          newDependents[index] = {...newDependents[index], educationCost: parseInt(e.target.value)};
                                          updateScenarioParam('dependents', newDependents);
                                        }}
                                        className="mt-1" 
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  const newDependents = [...(currentScenario.dependents || [])];
                                  newDependents.push({
                                    relation: "Child",
                                    age: 10,
                                    educationYear: 8,
                                    educationCost: 3000000
                                  });
                                  updateScenarioParam('dependents', newDependents);
                                }}
                                className="mt-2"
                              >
                                <span className="material-icons mr-1 text-sm">add</span>
                                Add Dependent
                              </Button>
                            </div>
                            
                            <div className="mb-6">
                              <h4 className="font-medium text-sm mb-2">Current Assets</h4>
                              <div className="max-h-80 overflow-y-auto pr-2">
                                {currentScenario.currentAssets && currentScenario.currentAssets.map((asset, index) => (
                                  <div key={index} className="p-3 border border-gray-200 rounded-md mb-2">
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                      <div>
                                        <Label htmlFor={`asset-type-${index}`}>Type</Label>
                                        <Select 
                                          value={asset.type}
                                          onValueChange={(value: AssetType) => {
                                            const newAssets = [...(currentScenario.currentAssets || [])];
                                            newAssets[index] = {
                                              ...newAssets[index], 
                                              type: value,
                                              annualGrowthRate: assetTypeDefaultGrowth[value],
                                              liquidityScore: assetTypeLiquidity[value],
                                              riskScore: assetTypeRisk[value]
                                            };
                                            updateScenarioParam('currentAssets', newAssets);
                                          }}
                                        >
                                          <SelectTrigger id={`asset-type-${index}`} className="mt-1">
                                            <SelectValue placeholder="Select asset type" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="savings">Savings Account</SelectItem>
                                            <SelectItem value="mutual-funds">Mutual Funds</SelectItem>
                                            <SelectItem value="nps">National Pension System</SelectItem>
                                            <SelectItem value="ppf">Public Provident Fund</SelectItem>
                                            <SelectItem value="sukanya-samriddhi">Sukanya Samriddhi Yojana</SelectItem>
                                            <SelectItem value="cash">Cash</SelectItem>
                                            <SelectItem value="gold">Gold</SelectItem>
                                            <SelectItem value="real-estate">Real Estate</SelectItem>
                                            <SelectItem value="fixed-deposit">Fixed Deposit</SelectItem>
                                            <SelectItem value="stocks">Stocks</SelectItem>
                                            <SelectItem value="epf">Employee Provident Fund</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label htmlFor={`asset-name-${index}`}>Name</Label>
                                        <Input
                                          id={`asset-name-${index}`}
                                          value={asset.name}
                                          onChange={(e) => {
                                            const newAssets = [...(currentScenario.currentAssets || [])];
                                            newAssets[index] = {...newAssets[index], name: e.target.value};
                                            updateScenarioParam('currentAssets', newAssets);
                                          }}
                                          className="mt-1"
                                        />
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                      <div>
                                        <Label htmlFor={`asset-value-${index}`}>Current Value (₹)</Label>
                                        <Input
                                          id={`asset-value-${index}`}
                                          type="number"
                                          value={asset.value}
                                          onChange={(e) => {
                                            const newAssets = [...(currentScenario.currentAssets || [])];
                                            newAssets[index] = {...newAssets[index], value: parseInt(e.target.value)};
                                            updateScenarioParam('currentAssets', newAssets);
                                          }}
                                          className="mt-1"
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor={`asset-growth-${index}`}>Annual Growth Rate (%)</Label>
                                        <Input
                                          id={`asset-growth-${index}`}
                                          type="number"
                                          step="0.1"
                                          value={asset.annualGrowthRate}
                                          onChange={(e) => {
                                            const newAssets = [...(currentScenario.currentAssets || [])];
                                            newAssets[index] = {...newAssets[index], annualGrowthRate: parseFloat(e.target.value)};
                                            updateScenarioParam('currentAssets', newAssets);
                                          }}
                                          className="mt-1"
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <Label htmlFor={`asset-notes-${index}`}>Notes</Label>
                                      <Input
                                        id={`asset-notes-${index}`}
                                        value={asset.notes || ""}
                                        onChange={(e) => {
                                          const newAssets = [...(currentScenario.currentAssets || [])];
                                          newAssets[index] = {...newAssets[index], notes: e.target.value};
                                          updateScenarioParam('currentAssets', newAssets);
                                        }}
                                        className="mt-1"
                                      />
                                    </div>
                                    <div className="flex justify-end mt-2">
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                          const newAssets = [...(currentScenario.currentAssets || [])];
                                          newAssets.splice(index, 1);
                                          updateScenarioParam('currentAssets', newAssets);
                                        }}
                                      >
                                        <span className="material-icons mr-1 text-sm">delete</span>
                                        Remove
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  const newAssets = [...(currentScenario.currentAssets || [])];
                                  newAssets.push({
                                    type: "savings",
                                    name: "New Asset",
                                    value: 100000,
                                    annualGrowthRate: assetTypeDefaultGrowth["savings"],
                                    liquidityScore: assetTypeLiquidity["savings"],
                                    riskScore: assetTypeRisk["savings"]
                                  });
                                  updateScenarioParam('currentAssets', newAssets);
                                }}
                                className="mt-2"
                              >
                                <span className="material-icons mr-1 text-sm">add</span>
                                Add Asset
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                              <div>
                                <div className="flex justify-between">
                                  <Label htmlFor="initial-investment">Initial Investment</Label>
                                  <span className="text-sm text-gray-500">{formatCurrency(currentScenario.initialInvestment)}</span>
                                </div>
                                <Input 
                                  id="initial-investment"
                                  type="number"
                                  value={currentScenario.initialInvestment} 
                                  onChange={(e) => updateScenarioParam('initialInvestment', parseInt(e.target.value))}
                                  className="mt-1" 
                                />
                              </div>
                              
                              <div>
                                <div className="flex justify-between">
                                  <Label htmlFor="monthly-investment">Monthly Investment</Label>
                                  <span className="text-sm text-gray-500">{formatCurrency(currentScenario.monthlyInvestment)}</span>
                                </div>
                                <Input 
                                  id="monthly-investment"
                                  type="number"
                                  value={currentScenario.monthlyInvestment} 
                                  onChange={(e) => updateScenarioParam('monthlyInvestment', parseInt(e.target.value))}
                                  className="mt-1" 
                                />
                              </div>
                              
                              <div>
                                <div className="flex justify-between">
                                  <Label htmlFor="investment-years">Investment Duration (Years)</Label>
                                  <span className="text-sm text-gray-500">{currentScenario.years} years</span>
                                </div>
                                <Slider 
                                  id="investment-years"
                                  value={[currentScenario.years]}
                                  min={1}
                                  max={40}
                                  step={1}
                                  onValueChange={(value) => updateScenarioParam('years', value[0])}
                                  className="mt-2" 
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-6">
                              <div>
                                <Label htmlFor="risk-profile">Risk Profile</Label>
                                <Select 
                                  onValueChange={(value: RiskProfile) => updateScenarioParam('riskProfile', value)}
                                  value={currentScenario.riskProfile}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select risk profile" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="conservative">{getRiskProfileLabel('conservative')}</SelectItem>
                                    <SelectItem value="moderate">{getRiskProfileLabel('moderate')}</SelectItem>
                                    <SelectItem value="aggressive">{getRiskProfileLabel('aggressive')}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <div className="flex justify-between">
                                  <Label htmlFor="inflation-rate">Assumed Inflation Rate (%)</Label>
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
                              
                              <div className="pt-2">
                                <Button 
                                  variant="outline" 
                                  className="w-full flex items-center justify-center"
                                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                                >
                                  <span className="material-icons mr-2 text-sm">
                                    {showAdvancedOptions ? 'expand_less' : 'expand_more'}
                                  </span>
                                  {showAdvancedOptions ? 'Hide' : 'Show'} Advanced Options
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {showAdvancedOptions && currentScenario.type !== "portfolio-analysis" && (
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <h3 className="font-medium mb-4">Advanced Options</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <div className="flex justify-between">
                                  <Label htmlFor="tax-rate">Expected Tax Rate (%)</Label>
                                  <span className="text-sm text-gray-500">{currentScenario.taxRate}%</span>
                                </div>
                                <Slider 
                                  id="tax-rate"
                                  value={[currentScenario.taxRate]}
                                  min={0}
                                  max={40}
                                  step={1}
                                  onValueChange={(value) => updateScenarioParam('taxRate', value[0])}
                                  className="mt-2" 
                                />
                              </div>
                              
                              <div>
                                <div className="flex justify-between">
                                  <Label htmlFor="expected-returns">Manual Expected Returns (%)</Label>
                                  <span className="text-sm text-gray-500">
                                    {currentScenario.expectedReturns > 0 
                                      ? `${currentScenario.expectedReturns}%` 
                                      : 'Using risk profile'}
                                  </span>
                                </div>
                                <div className="flex items-center mt-1 space-x-2">
                                  <Slider 
                                    id="expected-returns"
                                    value={[currentScenario.expectedReturns || applyRiskProfile(currentScenario)]}
                                    min={1}
                                    max={25}
                                    step={0.5}
                                    onValueChange={(value) => updateScenarioParam('expectedReturns', value[0])}
                                    className="flex-1" 
                                  />
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => updateScenarioParam('expectedReturns', 0)}
                                    className="whitespace-nowrap"
                                  >
                                    Reset to Risk Profile
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-8 flex justify-between">
                          <Button
                            variant="outline"
                            onClick={() => setActiveTab("manage")}
                          >
                            Manage Scenarios
                          </Button>
                          
                          <div className="space-x-2">
                            <Button
                              variant="outline"
                              onClick={saveScenario}
                            >
                              Save Scenario
                            </Button>
                            <Button
                              onClick={() => {
                                calculateScenarioResults();
                                setActiveTab("results");
                              }}
                            >
                              Calculate Results
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results">
              {scenarioResults.length > 0 && (
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                          <h3 className="text-xl font-bold">{currentScenario.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="font-normal">
                              {currentScenario.type.charAt(0).toUpperCase() + currentScenario.type.slice(1)}
                            </Badge>
                            {currentScenario.type !== "portfolio-analysis" && (
                              <Badge variant="outline" className="font-normal">
                                {getRiskProfileLabel(currentScenario.riskProfile)}
                              </Badge>
                            )}
                            <Badge variant="outline" className="font-normal">
                              {currentScenario.years} years
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <Button 
                            variant="outline"
                            className="text-sm"
                            onClick={() => addToComparison(currentScenario)}
                          >
                            <span className="material-icons mr-1 text-sm">compare</span>
                            Add to Comparison
                          </Button>
                        </div>
                      </div>
                      
                      {/* Portfolio Analysis View */}
                      {currentScenario.type === "portfolio-analysis" && scenarioResults[0].portfolioAnalysis && (
                        <div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <Card className="bg-blue-50">
                              <CardContent className="p-4">
                                <p className="text-xs text-blue-700 font-medium">CURRENT NET WORTH</p>
                                <p className="text-xl font-bold text-blue-900">
                                  {formatCurrency(scenarioResults[0].portfolioAnalysis.currentValue)}
                                </p>
                                <p className="text-xs text-blue-700 mt-1">
                                  Age {currentScenario.currentAge}
                                </p>
                              </CardContent>
                            </Card>
                            
                            <Card className="bg-green-50">
                              <CardContent className="p-4">
                                <p className="text-xs text-green-700 font-medium">PROJECTED WORTH IN {currentScenario.years} YEARS</p>
                                <p className="text-xl font-bold text-green-900">
                                  {formatCurrency(scenarioResults[0].summary.finalAmount)}
                                </p>
                                <p className="text-xs text-green-700 mt-1">
                                  At age {currentScenario.currentAge && currentScenario.currentAge + currentScenario.years}
                                </p>
                              </CardContent>
                            </Card>
                            
                            <Card className="bg-amber-50">
                              <CardContent className="p-4">
                                <p className="text-xs text-amber-700 font-medium">EMERGENCY FUND</p>
                                <p className="text-xl font-bold text-amber-900">
                                  {scenarioResults[0].portfolioAnalysis.emergencyFundMonths.toFixed(1)} months
                                </p>
                                <p className="text-xs text-amber-700 mt-1">
                                  {scenarioResults[0].portfolioAnalysis.emergencyFundMonths > 12 
                                    ? "Very Strong" 
                                    : scenarioResults[0].portfolioAnalysis.emergencyFundMonths > 6 
                                      ? "Good" 
                                      : "Needs Attention"}
                                </p>
                              </CardContent>
                            </Card>
                            
                            <Card className="bg-purple-50">
                              <CardContent className="p-4">
                                <p className="text-xs text-purple-700 font-medium">WEALTH GROWTH</p>
                                <p className="text-xl font-bold text-purple-900">
                                  {scenarioResults[0].summary.wealthMultiplier.toFixed(2)}x
                                </p>
                                <p className="text-xs text-purple-700 mt-1">
                                  {formatPercentage(((scenarioResults[0].summary.wealthMultiplier) ** (1 / currentScenario.years) - 1) * 100)} CAGR
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <Card>
                              <CardContent className="p-4">
                                <h3 className="text-base font-medium mb-4">Asset Allocation</h3>
                                <div className="h-[280px]">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                      <Pie
                                        data={scenarioResults[0].portfolioAnalysis.assetClassDistribution}
                                        dataKey="value"
                                        nameKey="category"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
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
                                        }) => {
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
                            
                            <Card>
                              <CardContent className="p-4">
                                <h3 className="text-base font-medium mb-4">Portfolio Health</h3>
                                
                                <div className="space-y-6">
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-sm">Risk Level</span>
                                      <span className="text-sm font-medium">
                                        {scenarioResults[0].portfolioAnalysis.riskScore < 3
                                          ? "Conservative" 
                                          : scenarioResults[0].portfolioAnalysis.riskScore < 5
                                            ? "Moderately Conservative"
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
                        </div>
                      )}
                      
                      {/* Regular Scenario View */}
                      {currentScenario.type !== "portfolio-analysis" && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                          <Card className="bg-blue-50">
                            <CardContent className="p-4">
                              <p className="text-xs text-blue-700 font-medium">FINAL AMOUNT</p>
                              <p className="text-xl font-bold text-blue-900">
                                {formatCurrency(scenarioResults[0].summary.finalAmount)}
                              </p>
                              <p className="text-xs text-blue-700 mt-1">
                                At age {currentAge + currentScenario.years}
                              </p>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-green-50">
                            <CardContent className="p-4">
                              <p className="text-xs text-green-700 font-medium">TOTAL INVESTED</p>
                              <p className="text-xl font-bold text-green-900">
                                {formatCurrency(scenarioResults[0].summary.totalInvestmentAmount)}
                              </p>
                              <p className="text-xs text-green-700 mt-1">
                                Over {currentScenario.years} years
                              </p>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-purple-50">
                            <CardContent className="p-4">
                              <p className="text-xs text-purple-700 font-medium">INVESTMENT RETURNS</p>
                              <p className="text-xl font-bold text-purple-900">
                                {formatCurrency(scenarioResults[0].summary.totalReturns)}
                              </p>
                              <p className="text-xs text-purple-700 mt-1">
                                {formatPercentage((scenarioResults[0].summary.totalReturns / scenarioResults[0].summary.totalInvestmentAmount) * 100)} return on investment
                              </p>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-amber-50">
                            <CardContent className="p-4">
                              <p className="text-xs text-amber-700 font-medium">WEALTH MULTIPLIER</p>
                              <p className="text-xl font-bold text-amber-900">
                                {scenarioResults[0].summary.wealthMultiplier.toFixed(2)}x
                              </p>
                              <p className="text-xs text-amber-700 mt-1">
                                Your money grew {scenarioResults[0].summary.wealthMultiplier.toFixed(2)} times
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                      
                      <div className="mt-8">
                        <h3 className="font-semibold mb-4">Investment Growth Projection</h3>
                        <div className="h-[400px]">
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
                                label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }} 
                              />
                              <Tooltip 
                                formatter={(value) => [`₹${Number(value).toLocaleString()}`, undefined]}
                                labelFormatter={(label) => `Year ${label} (Age ${scenarioResults[0].data[label].age})`}
                              />
                              <Legend />
                              <Area 
                                type="monotone" 
                                dataKey="totalAmount" 
                                stackId="1"
                                name="Total Amount" 
                                stroke="#4f46e5" 
                                fill="#4f46e5" 
                                fillOpacity={0.6}
                              />
                              <Area 
                                type="monotone" 
                                dataKey="totalInvested" 
                                stackId="2"
                                name="Amount Invested" 
                                stroke="#22c55e" 
                                fill="#22c55e" 
                                fillOpacity={0.4} 
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
                      </div>
                      
                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="font-semibold mb-4">Year by Year Growth</h3>
                          <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={scenarioResults[0].data}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                                <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, undefined]} />
                                <Legend />
                                <Bar dataKey="yearlyInvestment" name="Yearly Investment" fill="#22c55e" />
                                <Bar dataKey="yearlyReturn" name="Yearly Return" fill="#6366f1" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold mb-4">Inflation Impact</h3>
                          <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={scenarioResults[0].data}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis 
                                  yAxisId="left" 
                                  orientation="left"
                                  tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                                />
                                <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, undefined]} />
                                <Legend />
                                <Line 
                                  yAxisId="left"
                                  type="monotone" 
                                  dataKey="totalAmount" 
                                  name="Nominal Value" 
                                  stroke="#4f46e5" 
                                  activeDot={{ r: 8 }} 
                                />
                                <Line 
                                  yAxisId="left"
                                  type="monotone" 
                                  dataKey="inflationAdjustedValue" 
                                  name="Inflation-Adjusted Value" 
                                  stroke="#f97316"
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 pt-4 border-t border-gray-200">
                        <h3 className="font-semibold mb-4">Key Insights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="bg-blue-50 border-blue-100">
                            <CardContent className="p-4">
                              <div className="flex items-start">
                                <span className="material-icons text-blue-600 mr-2">insights</span>
                                <div>
                                  <h4 className="font-medium text-blue-900">Power of Compounding</h4>
                                  <p className="text-sm text-blue-700 mt-1">
                                    Your investment returns ({formatCurrency(scenarioResults[0].summary.totalReturns)}) 
                                    are {(scenarioResults[0].summary.totalReturns / scenarioResults[0].summary.totalInvestmentAmount).toFixed(2)}x 
                                    your invested amount, showing the power of compounding.
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-green-50 border-green-100">
                            <CardContent className="p-4">
                              <div className="flex items-start">
                                <span className="material-icons text-green-600 mr-2">trending_up</span>
                                <div>
                                  <h4 className="font-medium text-green-900">Annual Growth Rate</h4>
                                  <p className="text-sm text-green-700 mt-1">
                                    Your investments grew at an effective rate of {formatPercentage(scenarioResults[0].summary.cagr * 100)} 
                                    annually, compounded over {currentScenario.years} years.
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-amber-50 border-amber-100">
                            <CardContent className="p-4">
                              <div className="flex items-start">
                                <span className="material-icons text-amber-600 mr-2">attach_money</span>
                                <div>
                                  <h4 className="font-medium text-amber-900">Inflation Impact</h4>
                                  <p className="text-sm text-amber-700 mt-1">
                                    Due to inflation at {currentScenario.inflationRate}%, your final amount of {formatCurrency(scenarioResults[0].summary.finalAmount)} 
                                    will have a real purchasing power of approximately {formatCurrency(scenarioResults[0].data[scenarioResults[0].data.length - 1].inflationAdjustedValue)}.
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-purple-50 border-purple-100">
                            <CardContent className="p-4">
                              <div className="flex items-start">
                                <span className="material-icons text-purple-600 mr-2">schedule</span>
                                <div>
                                  <h4 className="font-medium text-purple-900">Time Horizon</h4>
                                  <p className="text-sm text-purple-700 mt-1">
                                    With a {currentScenario.years}-year investment horizon, you'll reach your financial goal 
                                    at age {currentAge + currentScenario.years}. Increasing your time horizon can significantly 
                                    amplify your returns.
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
                          <div className="flex items-start">
                            <span className="material-icons text-blue-600 mr-2">help_outline</span>
                            <div>
                              <h4 className="font-medium text-blue-900">Create Your Own Scenario</h4>
                              <p className="text-sm text-blue-700 mt-1">
                                To simulate your personal financial situation, go back to "Scenario Setup" and either:
                              </p>
                              <ul className="list-disc pl-5 text-sm text-blue-700 mt-2 space-y-1">
                                <li>Start with an existing scenario that's closest to your situation and customize it</li>
                                <li>Create a new scenario from scratch and input your actual financial data</li>
                                <li>Add your exact assets, liabilities, and financial goals</li>
                              </ul>
                              <div className="mt-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-blue-700 border-blue-300 bg-blue-50 hover:bg-blue-100"
                                  onClick={() => setActiveTab("setup")}
                                >
                                  <span className="material-icons mr-1 text-sm">edit</span>
                                  Customize Your Scenario
                                </Button>
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

            <TabsContent value="manage">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Manage Your Scenarios</h3>
                  <div className="divide-y divide-gray-200">
                    {scenarios.map((scenario) => (
                      <div key={scenario.id} className="py-4 flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{scenario.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {scenario.type.charAt(0).toUpperCase() + scenario.type.slice(1)}
                            </Badge>
                            {scenario.type !== "portfolio-analysis" && (
                              <Badge variant="outline" className="text-xs">
                                {getRiskProfileLabel(scenario.riskProfile)}
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {scenario.years} years
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setCurrentScenario(scenario);
                              setActiveTab("setup");
                            }}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setCurrentScenario(scenario);
                              calculateScenarioResults();
                              setActiveTab("results");
                            }}
                          >
                            View Results
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => addToComparison(scenario)}
                          >
                            Compare
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => {
                              setScenarios(scenarios.filter(s => s.id !== scenario.id));
                              if (currentScenario.id === scenario.id && scenarios.length > 1) {
                                setCurrentScenario(scenarios.find(s => s.id !== scenario.id) || scenarios[0]);
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Scenario Comparison</h3>
                <Button 
                  variant="outline" 
                  onClick={() => setComparisonMode(false)}
                >
                  Exit Comparison
                </Button>
              </div>
              
              {comparedScenarios.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    {comparedScenarios.map((scenario, index) => (
                      <Card key={scenario.id} className={`bg-${index === 0 ? 'blue' : index === 1 ? 'green' : index === 2 ? 'purple' : 'amber'}-50`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <p className="text-xs font-medium">{scenario.name}</p>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-6 w-6 p-0 rounded-full"
                              onClick={() => removeFromComparison(scenario.id)}
                            >
                              <span className="material-icons text-xs">close</span>
                            </Button>
                          </div>
                          <p className="text-lg font-bold mt-1">
                            {scenarioResults[index] && formatCurrency(scenarioResults[index].summary.finalAmount)}
                          </p>
                          <div className="flex items-center mt-1 space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {scenario.type.charAt(0).toUpperCase() + scenario.type.slice(1)}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {scenario.years} yrs
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-semibold mb-4">Growth Comparison</h3>
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
                            label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }} 
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
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-semibold mb-4">Investment vs Returns Comparison</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scenario</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Years</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Profile</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Invested</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Returns</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wealth Multiplier</th>
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
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(result.summary.totalReturns)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.summary.wealthMultiplier.toFixed(2)}x</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <span className="material-icons text-4xl text-gray-300 mb-2">compare</span>
                  <h3 className="text-lg font-medium text-gray-800">No scenarios to compare</h3>
                  <p className="text-sm text-gray-500 mt-1">Add scenarios to the comparison to see their differences</p>
                  <Button 
                    className="mt-4"
                    onClick={() => setComparisonMode(false)}
                  >
                    Go Back to Setup
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-4">Financial Scenario Planning Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start">
            <span className="material-icons text-blue-600 mr-3">tips_and_updates</span>
            <div>
              <h4 className="font-medium text-blue-800">Start Early</h4>
              <p className="text-sm text-blue-700 mt-1">
                The earlier you start investing, the more time your money has to grow through compounding. Even small investments can grow significantly over time.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="material-icons text-blue-600 mr-3">diversity_3</span>
            <div>
              <h4 className="font-medium text-blue-800">Diversify Investments</h4>
              <p className="text-sm text-blue-700 mt-1">
                Don't put all your eggs in one basket. Spread your investments across different asset classes based on your risk profile and goals.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="material-icons text-blue-600 mr-3">update</span>
            <div>
              <h4 className="font-medium text-blue-800">Regular Reviews</h4>
              <p className="text-sm text-blue-700 mt-1">
                Review your financial plan regularly and make adjustments based on life changes, market conditions, and progress toward your goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}