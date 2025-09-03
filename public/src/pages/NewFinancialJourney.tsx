import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  usePortfolioSummary,
  useInvestments,
  useAssetAllocations,
  useSIPs,
  useTransactions,
  calculatePhaseProgress as calculatePhaseProgressUtil
} from "@/hooks/use-public-financial-data";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  AlertCircle,
  AlertTriangle, 
  ArrowLeft,
  ArrowRight,
  ArrowRightCircle,
  Award,
  BookOpen, 
  Check,
  CheckCircle,
  CheckCircle2,
  ChevronRight, 
  CircleDollarSign, 
  Clock,
  Download, 
  FileText,
  HelpCircle,
  Info,
  Landmark,
  Lightbulb,
  Lock,
  PiggyBank,
  Shield,
  Star,
  Target,
  Zap
} from "lucide-react";

// Define app pages for navigation
const appPages = {
  dashboard: { name: "Dashboard", path: "/dashboard" },
  budgetBuddy: { name: "Budget Buddy", path: "/budget-buddy" },
  budgetTracker: { name: "Budget Tracker", path: "/budget-tracker" },
  creditScore: { name: "Credit Score", path: "/credit-score" },
  debtPayoff: { name: "Debt Payoff", path: "/debt-payoff" },
  debtPayoffStrategies: { name: "Debt Payoff Strategies", path: "/debt-payoff-strategies" },
  expenseAnalyzer: { name: "Expense Analyzer", path: "/expense-analyzer" },
  financialCalculators: { name: "Financial Calculators", path: "/financial-calculators" },
  financialEducation: { name: "Financial Education", path: "/financial-education" },
  financialManagement: { name: "Financial Management", path: "/financial-management" },
  goalSettings: { name: "Goal Settings", path: "/goal-settings" },
  insights: { name: "Insights", path: "/insights" },
  insuranceGuide: { name: "Insurance Guide", path: "/insurance-guide" },
  investmentMarket: { name: "Investment Market", path: "/investment-market-menu" },
  learningHub: { name: "Learning Hub", path: "/learning-hub" },
  moneyMindfulness: { name: "Money Mindfulness", path: "/money-mindfulness" },
  portfolioSimulator: { name: "Portfolio Simulator", path: "/portfolio-simulator" },
  riskAssessment: { name: "Risk Assessment", path: "/risk-assessment" },
  sipCalculator: { name: "SIP Calculator", path: "/sip-calculator" },
  taxCalculator: { name: "Tax Calculator", path: "/tax-calculator" },
  emiCalculator: { name: "EMI Calculator", path: "/emi-calculator" },
  termInsurance: { name: "Term Insurance", path: "/term-insurance-calculator" },
  relationshipWithMoney: { name: "Relationship With Money", path: "/relationship-with-money" },
  futureProjection: { name: "Future Projection", path: "/future-projection" },
};
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  Line,
  LineChart,
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

// Define types
interface PhaseMetrics {
  [key: string]: number;
}

interface MilestoneType {
  id: number;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  category: "savings" | "investment" | "debt" | "income" | "protection" | "education";
  phase: PhaseType;
  learningResource?: {
    title: string;
    url: string;
    type: "article" | "video" | "tool" | "calculator" | "guide";
  };
}

interface AchievementType {
  id: number;
  date: string;
  description: string;
  type: string;
}

interface FutureGoalType {
  id: number;
  date: string;
  description: string;
  type: string;
  completed: boolean;
}

interface ProjectionDataType {
  currentSavings: number;
  monthlyContribution: number;
  expectedReturnConservative: number;
  expectedReturnModerate: number;
  expectedReturnAggressive: number;
  inflationRate: number;
  timeHorizonYears: number;
}

interface JourneyDataType {
  milestones: MilestoneType[];
  achievements: AchievementType[];
  futureGoals: FutureGoalType[];
  startedDate: string;
  currentPhase: PhaseType;
}

type PhaseType = "Learning" | "Stabilizing" | "Growing" | "Optimizing" | "Freedom";

interface PhaseInfo {
  name: PhaseType;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  focusAreas: string[];
  threshold: number;
  learningModules: {
    title: string;
    description: string;
    url: string;
    timeEstimate: string;
  }[];
}

export default function FinancialJourney() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("journey-map");

  // Fetch user's portfolio data from public API
  const { data: portfolioData } = usePortfolioSummary();

  // Fetch user's investments data from public API
  const { data: investmentsData } = useInvestments();

  // Fetch user's asset allocations data from public API
  const { data: assetAllocationsData } = useAssetAllocations();

  // Fetch user's SIPs data from public API (Systematic Investment Plans)
  const { data: sipsData } = useSIPs();

  // Fetch user's transactions data from public API
  const { data: transactionsData } = useTransactions();
  
  // Journey phases data
  const journeyPhases: PhaseInfo[] = [
    {
      name: "Learning",
      description: "Building financial knowledge and awareness",
      icon: <BookOpen className="h-5 w-5" />,
      color: "#FF5722",
      bgColor: "#FFF3F0",
      focusAreas: [
        "Financial education through our Learning Hub",
        "Tracking all income and expenses",
        "Building mindful money habits",
        "Identifying spending patterns"
      ],
      threshold: 80,
      learningModules: [
        {
          title: "Budgeting 101",
          description: "Learn the basics of creating and sticking to a budget",
          url: "/learning-hub/budgeting-101",
          timeEstimate: "15 mins"
        },
        {
          title: "Understanding Debt",
          description: "Know the difference between good and bad debt",
          url: "/learning-hub/understanding-debt",
          timeEstimate: "10 mins"
        },
        {
          title: "Saving Strategies",
          description: "Simple strategies to boost your savings rate",
          url: "/learning-hub/saving-strategies",
          timeEstimate: "12 mins"
        }
      ]
    },
    {
      name: "Stabilizing",
      description: "Managing debt and building emergency fund",
      icon: <Shield className="h-5 w-5" />,
      color: "#FF9800",
      bgColor: "#FFF8E1",
      focusAreas: [
        "Building emergency fund (3-6 months expenses)",
        "Eliminating high-interest debt",
        "Creating a sustainable budget",
        "Setting up basic insurance coverage"
      ],
      threshold: 75,
      learningModules: [
        {
          title: "Emergency Fund Builder",
          description: "How to build your safety net quickly and efficiently",
          url: "/learning-hub/emergency-fund",
          timeEstimate: "8 mins"
        },
        {
          title: "Debt Elimination Strategies",
          description: "Snow ball vs. avalanche methods for debt elimination",
          url: "/learning-hub/debt-elimination",
          timeEstimate: "15 mins"
        },
        {
          title: "Insurance Basics",
          description: "Understanding what insurance you really need",
          url: "/learning-hub/insurance-basics",
          timeEstimate: "20 mins"
        }
      ]
    },
    {
      name: "Growing",
      description: "Active saving and beginning investments",
      icon: <Target className="h-5 w-5" />,
      color: "#4CAF50",
      bgColor: "#E8F5E9",
      focusAreas: [
        "Maximizing retirement contributions",
        "Starting systematic investment plans",
        "Tax planning and optimization",
        "Setting medium-term financial goals"
      ],
      threshold: 70,
      learningModules: [
        {
          title: "Investing Fundamentals",
          description: "Understanding different investment vehicles",
          url: "/learning-hub/investing-fundamentals",
          timeEstimate: "25 mins"
        },
        {
          title: "SIP Master Class",
          description: "How to build wealth through Systematic Investment Plans",
          url: "/learning-hub/sip-masterclass",
          timeEstimate: "15 mins"
        },
        {
          title: "Tax Optimization",
          description: "Legal ways to reduce your tax burden in India",
          url: "/learning-hub/tax-optimization",
          timeEstimate: "18 mins"
        }
      ]
    },
    {
      name: "Optimizing",
      description: "Diversified investments and tax optimization",
      icon: <Zap className="h-5 w-5" />,
      color: "#2196F3",
      bgColor: "#E3F2FD",
      focusAreas: [
        "Diversifying investment portfolio",
        "Considering real estate investments",
        "Advanced tax optimization strategies",
        "Career growth and income expansion"
      ],
      threshold: 70,
      learningModules: [
        {
          title: "Portfolio Diversification",
          description: "Advanced strategies to diversify your investments",
          url: "/learning-hub/diversification",
          timeEstimate: "22 mins"
        },
        {
          title: "Real Estate Investing",
          description: "Is property investment right for you?",
          url: "/learning-hub/real-estate",
          timeEstimate: "30 mins"
        },
        {
          title: "Multiple Income Streams",
          description: "How to develop additional sources of income",
          url: "/learning-hub/income-streams",
          timeEstimate: "25 mins"
        }
      ]
    },
    {
      name: "Freedom",
      description: "Financial independence and wealth preservation",
      icon: <Award className="h-5 w-5" />,
      color: "#9C27B0",
      bgColor: "#F3E5F5",
      focusAreas: [
        "Planning for financial independence",
        "Creating passive income streams",
        "Estate planning and wealth transfer",
        "Charitable giving and legacy planning"
      ],
      threshold: 60,
      learningModules: [
        {
          title: "Financial Independence",
          description: "Strategies to achieve and maintain financial freedom",
          url: "/learning-hub/financial-independence",
          timeEstimate: "28 mins"
        },
        {
          title: "Passive Income Blueprint",
          description: "Building income streams that don't require active work",
          url: "/learning-hub/passive-income",
          timeEstimate: "35 mins"
        },
        {
          title: "Estate Planning",
          description: "Securing your legacy and protecting your wealth",
          url: "/learning-hub/estate-planning",
          timeEstimate: "20 mins"
        }
      ]
    }
  ];
  
  // Phase metrics (calculated from different data sources)
  const [phaseMetrics, setPhaseMetrics] = useState<PhaseMetrics>({
    Learning: 85.0,
    Stabilizing: 62.5,
    Growing: 27.0,
    Optimizing: 15.0,
    Freedom: 5.0
  });
  
  // User's current stage selection
  const [currentStage, setCurrentStage] = useState<string>("Just Getting Started");
  const [showStageWarning, setShowStageWarning] = useState<boolean>(false);
  const [previewNextStage, setPreviewNextStage] = useState<string | null>(null);
  const [stageToChangeTo, setStageToChangeTo] = useState<string | null>(null);
  
  // Journey data state
  const [journeyData, setJourneyData] = useState<JourneyDataType>({
    milestones: [
      {
        id: 1,
        title: "Start Emergency Fund",
        description: "Open high-yield savings account for emergency funds",
        date: "2023-08-15",
        completed: true,
        category: "savings",
        phase: "Learning",
        learningResource: {
          title: "Emergency Fund Guide",
          url: "/learning-hub/emergency-fund-guide",
          type: "guide"
        }
      },
      {
        id: 2,
        title: "Create Budget",
        description: "Set up monthly budget with spending categories",
        date: "2023-09-01",
        completed: true,
        category: "savings",
        phase: "Learning",
        learningResource: {
          title: "Budgeting Template",
          url: "/tools/budget-template",
          type: "tool"
        }
      },
      {
        id: 3,
        title: "Pay Off Credit Card",
        description: "Eliminate high-interest credit card debt",
        date: "2024-02-15",
        completed: false,
        category: "debt",
        phase: "Stabilizing",
        learningResource: {
          title: "Debt Repayment Calculator",
          url: "/calculators/debt-repayment",
          type: "calculator"
        }
      },
      {
        id: 4,
        title: "Start SIP",
        description: "Begin systematic investment plan in mutual funds",
        date: "2024-03-10",
        completed: false,
        category: "investment",
        phase: "Growing",
        learningResource: {
          title: "SIP Beginners Guide",
          url: "/learning-hub/sip-guide",
          type: "guide"
        }
      },
      {
        id: 5,
        title: "Complete Emergency Fund",
        description: "Reach target of 6 months expenses in emergency fund",
        date: "2024-08-20",
        completed: false,
        category: "savings",
        phase: "Stabilizing",
        learningResource: {
          title: "Emergency Fund Calculator",
          url: "/calculators/emergency-fund",
          type: "calculator"
        }
      },
      {
        id: 6,
        title: "Purchase Term Insurance",
        description: "Get life insurance coverage for family protection",
        date: "2024-11-01",
        completed: false,
        category: "protection",
        phase: "Stabilizing",
        learningResource: {
          title: "Term Insurance Guide",
          url: "/learning-hub/term-insurance",
          type: "guide"
        }
      }
    ],
    achievements: [
      {
        id: 1,
        date: "2023-08-01",
        description: "Started financial journey with RupeeSmart",
        type: "journey_start"
      },
      {
        id: 2,
        date: "2023-09-15",
        description: "First month of budget adherence achieved",
        type: "budget"
      },
      {
        id: 3,
        date: "2023-11-10",
        description: "Completed first financial education module",
        type: "learning"
      }
    ],
    futureGoals: [
      {
        id: 1,
        date: "2024-12-31",
        description: "Complete emergency fund target",
        type: "savings",
        completed: false
      },
      {
        id: 2,
        date: "2025-03-31",
        description: "Max out tax-saving investments",
        type: "investment",
        completed: false
      },
      {
        id: 3,
        date: "2025-06-30",
        description: "Increase monthly savings rate to 20%",
        type: "savings",
        completed: false
      }
    ],
    startedDate: "2023-08-01",
    currentPhase: "Learning"
  });
  
  // Projection data state
  const [projectionData, setProjectionData] = useState<ProjectionDataType>({
    currentSavings: 250000,
    monthlyContribution: 15000,
    expectedReturnConservative: 7.0,
    expectedReturnModerate: 10.0,
    expectedReturnAggressive: 12.0,
    inflationRate: 5.0,
    timeHorizonYears: 20
  });
  
  // Form states
  const [newMilestone, setNewMilestone] = useState<Omit<MilestoneType, "id" | "completed">>({
    title: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    category: "savings",
    phase: "Learning"
  });
  
  // Use our utility function to calculate phase metrics based on real financial data
  const calculatePhaseProgress = (): PhaseMetrics => {
    // Use the utility function if we have financial data
    if (portfolioData && investmentsData && transactionsData && sipsData && assetAllocationsData) {
      const phaseProgress = calculatePhaseProgressUtil(
        portfolioData,
        investmentsData,
        transactionsData, 
        sipsData,
        assetAllocationsData
      );
      
      // Map the results to our current phase naming convention
      return {
        Learning: phaseProgress.foundationPhase,
        Stabilizing: Math.floor(phaseProgress.foundationPhase * 0.8),
        Growing: phaseProgress.growthPhase,
        Optimizing: Math.floor(phaseProgress.independencePhase * 0.7),
        Freedom: phaseProgress.legacyPhase
      };
    }
    
    // Fallback to using milestones and achievements if no financial data
    const phaseMetricsCalculation: Record<string, {completed: number, total: number, weight: number}> = {
      Learning: {completed: 0, total: 0, weight: 1.0},
      Stabilizing: {completed: 0, total: 0, weight: 1.0},
      Growing: {completed: 0, total: 0, weight: 1.0},
      Optimizing: {completed: 0, total: 0, weight: 1.0},
      Freedom: {completed: 0, total: 0, weight: 1.0},
    };
    
    // 1. Count completed milestones for each phase (core component)
    journeyData.milestones.forEach(milestone => {
      const phase = milestone.phase;
      if (phaseMetricsCalculation[phase]) {
        // Milestones have highest weight in the calculation
        phaseMetricsCalculation[phase].total += 2;
        if (milestone.completed) {
          phaseMetricsCalculation[phase].completed += 2;
        }
      }
    });
    
    // 2. Add learning modules completion to progress
    journeyPhases.forEach(phase => {
      const phaseName = phase.name;
      
      // Add learning modules to total tasks
      const numModules = phase.learningModules.length;
      phaseMetricsCalculation[phaseName].total += numModules;
      
      // For current and previous phases, calculate completed learning modules
      // based on achievements or assume reasonable completion rate
      if (phaseName === journeyData.currentPhase) {
        // Count learning-related achievements
        const learningAchievements = journeyData.achievements.filter(a => 
          a.type === "learning" || a.type === "education"
        ).length;
        
        // Add at least some progress for current phase, but cap at total modules
        const completedModules = Math.min(
          numModules, 
          Math.max(learningAchievements, phaseName === "Learning" ? 2 : 1)
        );
        phaseMetricsCalculation[phaseName].completed += completedModules;
      }
      // For previous phases, assume higher completion rate
      else if (getCurrentPhaseIndex() > journeyPhases.findIndex(p => p.name === phaseName)) {
        phaseMetricsCalculation[phaseName].completed += Math.ceil(numModules * 0.8);
      }
    });
    
    // 3. Add real financial data metrics based on portfolio and investments
    try {
      // ---- LEARNING PHASE CRITERIA ----
      // Budget creation, expense tracking, basic financial awareness
      const hasCompletedBudgetMilestone = journeyData.milestones.some(m => 
        m.title.toLowerCase().includes("budget") && m.completed
      );
      
      const hasLoggedTransactions = transactionsData && Array.isArray(transactionsData) && transactionsData.length > 0;
      
      if (hasCompletedBudgetMilestone || hasLoggedTransactions) {
        phaseMetricsCalculation.Learning.total += 1;
        phaseMetricsCalculation.Learning.completed += 1;
      }
      
      // ---- STABILIZING PHASE CRITERIA ----
      // Emergency fund, debt management, basic insurance
      
      // Check for emergency fund milestone
      const hasStartedEmergencyFund = journeyData.milestones.some(m => 
        m.title.toLowerCase().includes("emergency fund") && 
        m.completed
      );
      
      // Check for insurance milestone
      const hasInsuranceCoverage = journeyData.milestones.some(m => 
        (m.title.toLowerCase().includes("insurance") || m.category === "protection") && 
        m.completed
      );
      
      // Calculate debt progress based on achievements
      const hasDebtProgress = journeyData.achievements.some(a => 
        a.description.toLowerCase().includes("debt") || a.type === "debt"
      );
      
      // Add stabilizing metrics based on these criteria
      if (hasStartedEmergencyFund) {
        phaseMetricsCalculation.Stabilizing.total += 1;
        phaseMetricsCalculation.Stabilizing.completed += 1;
      }
      
      if (hasInsuranceCoverage) {
        phaseMetricsCalculation.Stabilizing.total += 1;
        phaseMetricsCalculation.Stabilizing.completed += 1;
      }
      
      if (hasDebtProgress) {
        phaseMetricsCalculation.Stabilizing.total += 1;
        phaseMetricsCalculation.Stabilizing.completed += 1;
      }
      
      // ---- GROWING PHASE CRITERIA ----
      // Active investment, portfolio growth, SIPs
      
      // Check for investments
      const hasInvestments = investmentsData && Array.isArray(investmentsData) && investmentsData.length > 0;
      
      // Check for SIPs
      const hasActiveSips = sipsData && Array.isArray(sipsData) && 
        sipsData.filter((sip: {active: boolean}) => sip.active).length > 0;
      
      // Check for diversification (need at least 3 different investment types)
      const investmentTypesArray = Array.isArray(investmentsData) ? investmentsData : [];
      const uniqueInvestmentTypes = new Set(
        investmentTypesArray.map((inv: {type: string}) => inv.type)
      ).size;
      const hasDiversification = uniqueInvestmentTypes >= 3;
      
      // Add growing metrics based on these criteria
      if (hasInvestments) {
        phaseMetricsCalculation.Growing.total += 1;
        phaseMetricsCalculation.Growing.completed += (hasInvestments ? 1 : 0);
      }
      
      if (hasActiveSips) {
        phaseMetricsCalculation.Growing.total += 1;
        phaseMetricsCalculation.Growing.completed += (hasActiveSips ? 1 : 0);
      }
      
      // ---- OPTIMIZING PHASE CRITERIA ----
      // Portfolio diversification, advanced assets
      
      // Check for diversification (more detailed)
      if (assetAllocationsData && Array.isArray(assetAllocationsData) && assetAllocationsData.length > 0) {
        phaseMetricsCalculation.Optimizing.total += 1;
        phaseMetricsCalculation.Optimizing.completed += (hasDiversification ? 1 : 0);
      }
      
      // Check for portfolio value indicating progression
      if (portfolioData && typeof portfolioData === 'object' && 'total_value' in portfolioData && typeof portfolioData.total_value === 'number') {
        const significantPortfolio = portfolioData.total_value > 500000; // 5 lakh threshold
        phaseMetricsCalculation.Optimizing.total += 1;
        phaseMetricsCalculation.Optimizing.completed += (significantPortfolio ? 1 : 0);
      }
      
      // ---- FREEDOM PHASE CRITERIA ----
      // Financial independence progress, passive income
      
      // Check for passive income indicators
      const investmentsArray = Array.isArray(investmentsData) ? investmentsData : [];
      const hasPassiveIncome = investmentsArray.length > 0 && 
        investmentsArray.some(inv => inv.returnPercentage > 8);
      
      if (portfolioData && typeof portfolioData === 'object' && 'total_value' in portfolioData && typeof portfolioData.total_value === 'number') {
        const nearingFinancialIndependence = portfolioData.total_value > 2000000; // 20 lakh threshold
        phaseMetricsCalculation.Freedom.total += 1;
        phaseMetricsCalculation.Freedom.completed += (nearingFinancialIndependence ? 1 : 0);
        
        if (hasPassiveIncome) {
          phaseMetricsCalculation.Freedom.total += 1;
          phaseMetricsCalculation.Freedom.completed += 1;
        }
      }
      
    } catch (error) {
      console.error("Error calculating financial metrics:", error);
    }
    
    // Calculate percentages with weighted components
    const percentages: PhaseMetrics = {};
    Object.keys(phaseMetricsCalculation).forEach(phase => {
      const { completed, total, weight } = phaseMetricsCalculation[phase];
      
      // Calculate raw percentage
      let calculatedPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      // Apply logical constraints:
      
      // 1. Ensure minimum progress for each phase (especially important for early phases)
      if (phase === "Learning") calculatedPercentage = Math.max(calculatedPercentage, 10);
      if (phase === "Stabilizing") calculatedPercentage = Math.max(calculatedPercentage, 5);
      
      // 2. Guarantee current phase is at least 85% complete if user has significant progress
      if (phase === journeyData.currentPhase && 
          phaseMetricsCalculation[phase].completed >= Math.ceil(phaseMetricsCalculation[phase].total * 0.7) &&
          calculatedPercentage < 85) {
        calculatedPercentage = 85;
      }
      
      // 3. Cap at 100%
      calculatedPercentage = Math.min(calculatedPercentage, 100);
      
      // Store the final percentage
      percentages[phase] = calculatedPercentage;
    });
    
    // 4. Ensure logical progression between phases (each phase cannot be more complete than previous)
    const phaseOrder = ["Learning", "Stabilizing", "Growing", "Optimizing", "Freedom"];
    for (let i = 1; i < phaseOrder.length; i++) {
      const currentPhase = phaseOrder[i];
      const previousPhase = phaseOrder[i-1];
      
      // Current phase cannot be more complete than previous phase
      if (percentages[currentPhase] > percentages[previousPhase]) {
        percentages[currentPhase] = Math.min(percentages[currentPhase], percentages[previousPhase] - 5);
      }
    }
    
    console.log("Phase metrics calculation:", phaseMetricsCalculation);
    console.log("Final calculated percentages:", percentages);
    
    return percentages;
  };
  
  // Get the current phase information
  const getCurrentPhase = () => {
    return journeyPhases.find(phase => phase.name === journeyData.currentPhase) || journeyPhases[0];
  };
  
  // Calculate overall journey progress based on weighted metrics
  const calculateOverallProgress = (): number => {
    const totalPhases = journeyPhases.length;
    let completedPhasesWeight = 0;
    
    // Get the current phase index
    const currentPhaseIndex = journeyPhases.findIndex(phase => phase.name === journeyData.currentPhase);
    
    // Add 100% for each completed phase
    for (let i = 0; i < currentPhaseIndex; i++) {
      completedPhasesWeight += 1;
    }
    
    // Add the progress of the current phase
    const currentPhaseProgress = phaseMetrics[journeyData.currentPhase] / 100;
    completedPhasesWeight += currentPhaseProgress;
    
    // Calculate overall progress percentage
    return (completedPhasesWeight / totalPhases) * 100;
  };
  
  // Update phase metrics when component mounts or when relevant data changes
  useEffect(() => {
    // Use our comprehensive calculation strategy to set phase metrics
    setPhaseMetrics(calculatePhaseProgress());
  }, [
    // Financial data dependencies 
    portfolioData, 
    investmentsData, 
    assetAllocationsData, 
    sipsData, 
    transactionsData,
    // Journey data dependencies
    journeyData.milestones, 
    journeyData.achievements, 
    journeyData.currentPhase
  ]);
  
  // Get the index of the current phase
  const getCurrentPhaseIndex = (): number => {
    return journeyPhases.findIndex(phase => phase.name === journeyData.currentPhase);
  };
  
  // Handle adding a new milestone
  const handleAddMilestone = () => {
    if (!newMilestone.title) {
      toast({
        title: "Error",
        description: "Please enter a milestone title",
        variant: "destructive"
      });
      return;
    }
    
    const newId = Math.max(0, ...journeyData.milestones.map(m => m.id)) + 1;
    
    setJourneyData(prevData => {
      const updatedData = {
        ...prevData,
        milestones: [
          ...prevData.milestones,
          {
            id: newId,
            ...newMilestone,
            completed: false
          }
        ]
      };
      
      // Use the dynamic calculation to update metrics based on new milestone
      setTimeout(() => {
        setPhaseMetrics(calculatePhaseProgress());
      }, 0);
      
      return updatedData;
    });
    
    // Reset form
    setNewMilestone({
      title: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      category: "savings",
      phase: journeyData.currentPhase
    });
    
    toast({
      title: "Milestone Added to Timeline",
      description: "Your milestone has been added to your financial journey timeline"
    });
  };
  
  // Toggle milestone completion
  const handleToggleMilestone = (id: number) => {
    setJourneyData(prevData => {
      const updatedData = {
        ...prevData,
        milestones: prevData.milestones.map(milestone => 
          milestone.id === id ? { ...milestone, completed: !milestone.completed } : milestone
        )
      };
      
      // Use dynamic calculation to update metrics based on milestone completion
      setTimeout(() => {
        setPhaseMetrics(calculatePhaseProgress());
      }, 0);
      
      return updatedData;
    });
    
    // If marking as complete, also add an achievement
    const milestone = journeyData.milestones.find(m => m.id === id);
    if (milestone && !milestone.completed) {
      const newAchievement = {
        id: Math.max(0, ...journeyData.achievements.map(a => a.id)) + 1,
        date: new Date().toISOString().split('T')[0],
        description: `Completed milestone: ${milestone.title}`,
        type: milestone.category
      };
      
      setJourneyData(prev => {
        const updatedData = {
          ...prev,
          achievements: [...prev.achievements, newAchievement]
        };
        
        return updatedData;
      });
      
      toast({
        title: "Milestone Completed! 🎉",
        description: `Congratulations on completing: ${milestone.title}`,
      });
    }
  };
  
  // Complete a goal from the timeline
  const handleCompleteGoal = (id: number) => {
    setJourneyData({
      ...journeyData,
      futureGoals: journeyData.futureGoals.map(goal => 
        goal.id === id ? { ...goal, completed: true } : goal
      )
    });
    
    const goal = journeyData.futureGoals.find(g => g.id === id);
    if (goal) {
      const newAchievement = {
        id: Math.max(0, ...journeyData.achievements.map(a => a.id)) + 1,
        date: new Date().toISOString().split('T')[0],
        description: `Achieved goal: ${goal.description}`,
        type: goal.type
      };
      
      setJourneyData(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement]
      }));
      
      toast({
        title: "Goal Achieved! 🏆",
        description: `Well done on achieving: ${goal.description}`,
      });
    }
  };
  
  // Add a new future goal
  const handleAddFutureGoal = (description: string, type: string, date: string) => {
    if (!description) {
      toast({
        title: "Error",
        description: "Please enter a goal description",
        variant: "destructive"
      });
      return;
    }
    
    const newGoal: FutureGoalType = {
      id: Math.max(0, ...journeyData.futureGoals.map(g => g.id)) + 1,
      date,
      description,
      type,
      completed: false
    };
    
    setJourneyData({
      ...journeyData,
      futureGoals: [...journeyData.futureGoals, newGoal]
    });
    
    toast({
      title: "Success",
      description: "New goal added to your journey",
    });
  };
  
  // Calculate projection chart data
  const calculateProjectionData = () => {
    const years = Array.from({ length: projectionData.timeHorizonYears + 1 }, (_, i) => i);
    
    return years.map(year => {
      const conservative = calculateCompoundGrowth(
        projectionData.currentSavings,
        projectionData.monthlyContribution,
        projectionData.expectedReturnConservative / 100,
        year
      );
      
      const moderate = calculateCompoundGrowth(
        projectionData.currentSavings,
        projectionData.monthlyContribution,
        projectionData.expectedReturnModerate / 100,
        year
      );
      
      const aggressive = calculateCompoundGrowth(
        projectionData.currentSavings,
        projectionData.monthlyContribution,
        projectionData.expectedReturnAggressive / 100,
        year
      );
      
      return {
        year,
        conservative,
        moderate,
        aggressive
      };
    });
  };
  
  // Helper function to calculate compound growth
  const calculateCompoundGrowth = (
    principal: number,
    monthlyContribution: number,
    annualRate: number,
    years: number
  ): number => {
    // Convert annual rate to monthly rate
    const monthlyRate = annualRate / 12;
    
    // Calculate future value of the principal
    const principalFV = principal * Math.pow(1 + monthlyRate, years * 12);
    
    // Calculate future value of the monthly contributions
    let contributionsFV = 0;
    if (monthlyRate > 0) {
      contributionsFV = monthlyContribution * ((Math.pow(1 + monthlyRate, years * 12) - 1) / monthlyRate);
    } else {
      contributionsFV = monthlyContribution * years * 12;
    }
    
    return Math.round(principalFV + contributionsFV);
  };
  
  // Generate projection chart data
  const projectionChartData = calculateProjectionData();
  
  // Generate milestone data for projection tab
  const milestoneData = [
    { label: "First Lakh (₹1,00,000)", year: 1, actualAmount: 100000 },
    { label: "Five Lakhs (₹5,00,000)", year: 5, actualAmount: 500000 },
    { label: "Ten Lakhs (₹10,00,000)", year: 8, actualAmount: 1000000 },
    { label: "Fifty Lakhs (₹50,00,000)", year: 15, actualAmount: 5000000 }
  ].filter(milestone => {
    // Find when this milestone amount will be reached in moderate scenario
    const yearReached = projectionChartData.findIndex(data => data.moderate >= milestone.actualAmount);
    if (yearReached !== -1) {
      milestone.year = yearReached;
      return true;
    }
    return false;
  });
  
  // Helper function for formatting currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Define a type for timeline events
  type TimelineEvent = {
    id: string;
    date: string;
    description: string;
    type: string;
    isAchievement: boolean;
    goalId: number | null;
    completed?: boolean;
  };

  // Get all timeline events sorted by date
  const getTimelineEvents = (): TimelineEvent[] => {
    // Combine achievements and future goals into a single timeline
    const allEvents: TimelineEvent[] = [
      ...journeyData.achievements.map(achievement => ({
        id: `achievement_${achievement.id}`,
        date: achievement.date,
        description: achievement.description,
        type: achievement.type,
        isAchievement: true,
        goalId: null
      })),
      ...journeyData.futureGoals.map(goal => ({
        id: `goal_${goal.id}`,
        date: goal.date,
        description: goal.description,
        type: goal.type,
        isAchievement: false,
        completed: goal.completed,
        goalId: goal.id
      }))
    ];
    
    // Sort by date
    return allEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };
  
  // Format date to readable format
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };
  
  // Helper function to get category badge colors
  const getCategoryColor = (category: string): { bg: string, text: string } => {
    switch(category) {
      case "savings":
        return { bg: "bg-blue-100", text: "text-blue-800" };
      case "investment":
        return { bg: "bg-green-100", text: "text-green-800" };
      case "debt":
        return { bg: "bg-red-100", text: "text-red-800" };
      case "income":
        return { bg: "bg-purple-100", text: "text-purple-800" };
      case "protection":
        return { bg: "bg-amber-100", text: "text-amber-800" };
      case "education":
        return { bg: "bg-emerald-100", text: "text-emerald-800" };
      case "budget":
        return { bg: "bg-cyan-100", text: "text-cyan-800" };
      case "learning":
        return { bg: "bg-indigo-100", text: "text-indigo-800" };
      case "journey_start":
        return { bg: "bg-lime-100", text: "text-lime-800" };
      case "phase_change":
        return { bg: "bg-fuchsia-100", text: "text-fuchsia-800" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800" };
    }
  };
  
  // Get the index of a stage in the progression
  const getStageIndex = (stage: string): number => {
    const stages = ["Just Getting Started", "Trying to Budget", "Clearing Debt", "Investing for the Future", "Building Wealth & Long-Term Goals"];
    return stages.indexOf(stage);
  };

  // Check if a user can proceed to a stage
  const canProceedToStage = (stage: string): boolean => {
    const currentStageIndex = getStageIndex(currentStage);
    const targetStageIndex = getStageIndex(stage);
    
    // Only allow moving to completed stages or the current stage
    // Previous stages are considered completed
    if (targetStageIndex <= currentStageIndex) {
      return true; // Can move to current or previous stages
    }
    
    // For the next stage, check if current stage's phase is complete enough
    if (targetStageIndex === currentStageIndex + 1) {
      return phaseMetrics[journeyData.currentPhase] >= 85; // Allow next stage if at least 85% complete
    }
    
    // Cannot skip stages at all - if trying to skip more than one stage ahead, show warning
    return false;
  };

  // Get the completion requirements for a stage
  const getStageRequirements = (stage: string): string[] => {
    switch (stage) {
      case "Trying to Budget":
        return [
          "Create a monthly budget",
          "Track expenses for at least one month",
          "Identify spending categories"
        ];
      case "Clearing Debt":
        return [
          "List all debts with interest rates",
          "Create a debt repayment plan",
          "Cut unnecessary expenses"
        ];
      case "Investing for the Future":
        return [
          "Build emergency fund of 3 months expenses",
          "Clear high-interest debt",
          "Have a stable budgeting system"
        ];
      case "Building Wealth & Long-Term Goals":
        return [
          "Start systematic investments",
          "Max out tax-saving investments",
          "Create financial goals with timelines"
        ];
      default:
        return [];
    }
  };

  // Preview a stage
  const handlePreviewStage = (stage: string) => {
    setPreviewNextStage(stage);
  };

  // Handle stage selection change
  const handleStageChange = (stage: string) => {
    if (stage === currentStage) return;
    
    if (!canProceedToStage(stage)) {
      setStageToChangeTo(stage);
      setShowStageWarning(true);
      return;
    }
    
    // If we reach here, the user can proceed to this stage
    setCurrentStage(stage);
    
    // Based on stage, set appropriate milestones and current phase
    let newPhase: PhaseType = "Learning";
    
    switch(stage) {
      case "Just Getting Started":
        newPhase = "Learning";
        break;
      case "Trying to Budget":
        newPhase = "Learning";
        break;
      case "Clearing Debt":
        newPhase = "Stabilizing";
        break;
      case "Investing for the Future":
        newPhase = "Growing";
        break;
      case "Building Wealth & Long-Term Goals":
        newPhase = "Optimizing";
        break;
    }
    
    // Update journey data with new phase
    setJourneyData(prev => {
      const updatedData = { ...prev, currentPhase: newPhase };
      
      // Use dynamic calculation to update metrics based on phase change
      setTimeout(() => {
        setPhaseMetrics(calculatePhaseProgress());
      }, 10);
      
      return updatedData;
    });
    
    toast({
      title: "Your journey updated!",
      description: `Your personalized plan is now tailored for: ${stage}`,
    });
  };
  
  // Download journey as PDF
  const downloadJourney = () => {
    toast({
      title: "Preparing your journey PDF",
      description: "Your financial journey report is being generated...",
    });
    
    // This would typically create a PDF from the user's journey data
    // For this example, we'll just show a success message after a delay
    setTimeout(() => {
      toast({
        title: "Journey PDF Ready!",
        description: "Your financial journey report has been downloaded.",
      });
    }, 2000);
  };
  
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      {/* Warning Dialog for Stage Progression */}
      {showStageWarning && (
        <AlertDialog open={showStageWarning} onOpenChange={setShowStageWarning}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Complete Current Stage First</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-3">
                    <p>
                      You need to complete your current stage "{currentStage}" before moving to "{stageToChangeTo}".
                    </p>
                    <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
                      {phaseMetrics[journeyData.currentPhase]}% Complete
                    </Badge>
                  </div>
                  
                  {/* Current stage progress visualization */}
                  <div className="mb-4">
                    <Progress value={phaseMetrics[journeyData.currentPhase]} className="h-2 mb-1" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Just started</span>
                      <span>Complete (100%)</span>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-3 rounded-md border border-amber-100 mb-4">
                    <h4 className="font-medium text-amber-900 mb-2">Requirements to proceed:</h4>
                    <ul className="space-y-2">
                      {getStageRequirements(currentStage).map((req, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-100 mb-4">
                    <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Your Journey Progression
                    </h4>
                    <p className="text-sm text-blue-700">
                      Stages are unlocked as you complete milestones in your current financial stage. 
                      Continue working on the tasks above to advance to the next stage.
                    </p>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Want to learn what's in "{stageToChangeTo}" without changing your current stage?
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setStageToChangeTo(null)}>Stay on Current Stage</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handlePreviewStage(stageToChangeTo || "");
                  setStageToChangeTo(null);
                }}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Preview Next Stage
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <h1 className="text-3xl font-bold tracking-tight mb-1">
        Your Financial Journey
      </h1>
      <p className="text-gray-500 mb-6">
        Track your progress, step by step, with personalized milestones to guide you.
      </p>
      
      {/* Stage Selection */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Where Are You in Your Financial Journey?</CardTitle>
          <CardDescription>
            Select your current stage to see personalized recommendations and milestones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex flex-col md:flex-row justify-between w-full">
              {["Just Getting Started", "Trying to Budget", "Clearing Debt", "Investing for the Future", "Building Wealth & Long-Term Goals"].map((stage, index, array) => {
                const stageIndex = getStageIndex(stage);
                const currentStageIndex = getStageIndex(currentStage);
                const isCompleted = stageIndex < currentStageIndex;
                const isCurrent = stage === currentStage;
                const isPrevious = stageIndex < currentStageIndex;
                
                return (
                  <div key={stage} className="flex flex-col items-center mb-2 md:mb-0 md:w-1/5">
                    {/* Stage button */}
                    <Button
                      variant={isCurrent ? "default" : isCompleted ? "default" : "outline"}
                      className={`w-full justify-center text-center px-2 py-3 h-auto text-xs rounded-md
                        ${isCurrent ? "bg-blue-500 text-white" : isCompleted ? "bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-200" : "hover:bg-gray-50"}`}
                      onClick={() => handleStageChange(stage)}
                    >
                      <div className="max-w-full overflow-hidden">
                        <div className="font-medium break-words hyphens-auto">
                          {stage.length > 20 ? 
                            <>
                              {stage.split(' & ')[0]}
                              <br />
                              {stage.split(' & ')[1] || ''}
                            </> : 
                            stage
                          }
                        </div>
                        {isCurrent && (
                          <span className="text-xs text-white mt-1 block font-semibold">Selected</span>
                        )}
                        {isCompleted && (
                          <span className="text-xs text-blue-700 mt-1 block font-medium">Completed</span>
                        )}
                      </div>
                    </Button>
                    
                    {/* Arrow pointing to next stage - simplified cleaner version */}
                    {index < array.length - 1 && (
                      <div className="hidden md:flex items-center justify-center w-full h-8 mt-1 mb-1 relative overflow-hidden px-2">
                        <div className={`h-1 w-full ${isPrevious ? "bg-green-500" : "bg-gray-200"} absolute top-1/2 -translate-y-1/2`}></div>
                        <div 
                          className={`absolute right-1 w-0 h-0 
                          border-t-[6px] border-t-transparent 
                          border-l-[10px] ${isPrevious ? "border-l-green-500" : "border-l-gray-200"} 
                          border-b-[6px] border-b-transparent`}
                          style={{top: 'calc(50% - 6px)'}}
                        ></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Overall Progress */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Your Overall Financial Journey Progress</h3>
            <span className="text-sm text-gray-500">{Math.round(calculateOverallProgress())}% Complete</span>
          </div>
          <Progress value={calculateOverallProgress()} className="h-2" />
          
          <div className="mt-4 grid grid-cols-5 gap-1 text-xs text-center">
            {journeyPhases.map((phase, index) => (
              <div 
                key={phase.name} 
                className={`flex flex-col items-center ${journeyData.currentPhase === phase.name ? "font-medium" : ""}`}
              >
                <span 
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-white mb-1
                    ${getCurrentPhaseIndex() >= index ? "bg-blue-500" : "bg-gray-200"}`}
                >
                  {getCurrentPhaseIndex() > index ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span className={`${journeyData.currentPhase === phase.name ? "text-blue-500" : "text-gray-500"}`}>
                  {phase.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full mb-6">
          <TabsTrigger value="journey-map">Journey Map</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="projection">Future Projection</TabsTrigger>
        </TabsList>
        
        {/* Journey Map Tab */}
        <TabsContent value="journey-map" className="mt-0 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">You're in the {journeyData.currentPhase} Phase</CardTitle>
                  <CardDescription className="text-base">
                    {getCurrentPhase().description}
                  </CardDescription>
                </div>
                
                <div 
                  className="p-3 rounded-full"
                  style={{ backgroundColor: getCurrentPhase().bgColor }}
                >
                  {getCurrentPhase().icon}
                </div>
              </div>
              
              {/* Removing "Your Learning Phase Priorities" section as requested */}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left column - Phase information */}
                <div className="col-span-1">
                  <div className="p-4 border rounded-lg mb-4 bg-gray-100 border-gray-200">
                    <h3 className="font-medium mb-3 text-blue-700">Phase Progress</h3>
                    <Progress value={phaseMetrics[journeyData.currentPhase]} className="h-2 mb-1" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Just started</span>
                      <span>{phaseMetrics[journeyData.currentPhase]}%</span>
                      <span>Complete</span>
                    </div>
                    
                    <h3 className="font-medium mt-4 mb-2 text-blue-700">Focus Areas</h3>
                    <ul className="space-y-2 text-sm">
                      {getCurrentPhase().focusAreas.map((area, index) => {
                        // Define links for each focus area
                        let linkPath = "";
                        
                        if (area.includes("Learning Hub")) {
                          linkPath = appPages.learningHub.path;
                        } else if (area.includes("Tracking all income")) {
                          linkPath = appPages.budgetBuddy.path;
                        } else if (area.includes("mindful money habits")) {
                          linkPath = appPages.financialEducation.path;
                        } else if (area.includes("spending patterns")) {
                          linkPath = appPages.insights.path;
                        }
                        
                        return (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 shrink-0 mt-0.5 text-blue-600" />
                            {linkPath ? (
                              <Link to={linkPath} className="text-blue-600 hover:underline">
                                <span>{area}</span>
                              </Link>
                            ) : (
                              <span>{area}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg">
                    <div className="flex items-center mb-3">
                      <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="font-medium text-blue-700">Learning Resources</h3>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      Complete these mini-courses to advance in your current phase:
                    </p>
                    
                    <div className="space-y-3">
                      {getCurrentPhase().learningModules.map((module, index) => (
                        <div key={index} className="bg-white p-3 rounded border border-gray-200">
                          <h4 className="font-medium text-gray-800 mb-1">{module.title}</h4>
                          <p className="text-xs text-gray-600 mb-2">{module.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {module.timeEstimate}
                            </span>
                            <Link to={appPages.learningHub.path}>
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-blue-600">
                                Learn <ChevronRight className="h-3 w-3 ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right column - Phase transition and rewards */}
                <div className="col-span-1 md:col-span-2">
                  <div className="mb-4 p-4 bg-gray-100 border border-gray-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Lightbulb className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="font-medium text-blue-700">LEARNING PHASE ACTION PLAN</h3>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      Complete these learning activities to build your financial knowledge:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-md border border-gray-200">
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-gray-800">Track Your Spending Habits</h4>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-sm text-gray-600">Learn to identify and categorize your expenses</p>
                              <Link to={appPages.budgetBuddy.path}>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 h-auto">
                                  Start Tracking →
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 rounded-md border border-gray-200">
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-gray-800">Complete Budgeting 101</h4>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-sm text-gray-600">Master the fundamentals of creating a budget</p>
                              <Link to={appPages.learningHub.path}>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 h-auto">
                                  Start Learning →
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 rounded-md border border-gray-200">
                        <div className="flex items-start">
                          <ArrowRightCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-gray-800">Analyze Your Spending Patterns</h4>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-sm text-gray-600">Identify where your money is going each month</p>
                              <Link to={appPages.insights.path}>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 h-auto">
                                  View Insights →
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-gray-600 mr-2" />
                        <h3 className="font-medium text-gray-800">Current Phase Milestones</h3>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-blue-600 border-gray-200 hover:bg-gray-100"
                        onClick={() => setActiveTab("milestones")}
                      >
                        View All
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Completed milestone example - Start Emergency Fund */}
                      <div className="bg-white p-4 rounded-md border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">Start Emergency Fund</h4>
                          <div className="flex gap-2 items-center">
                            <Badge className="bg-blue-100 text-blue-600 border-0 rounded-full px-2 text-xs">savings</Badge>
                            <div className="p-1 rounded-md bg-green-100 text-green-700 flex items-center">
                              <Check className="h-4 w-4 mr-1" />
                              <span className="text-xs font-medium">Completed</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Open high-yield savings account for emergency funds</p>
                        <p className="text-xs text-gray-500 mb-3">Target: 15 Aug 2023</p>
                        
                        <div className="flex items-center gap-1 text-blue-600 text-xs mb-2">
                          <FileText className="h-3.5 w-3.5" />
                          <a href="#" className="hover:underline">Emergency Fund Guide</a>
                        </div>
                        
                        <div className="bg-green-50 p-2 rounded-md border border-green-100 mt-2">
                          <p className="text-sm text-green-600">
                            Congratulations! You've achieved this milestone. Keep up the great work!
                          </p>
                        </div>
                      </div>
                      
                      {/* Completed milestone example - Create Budget */}
                      <div className="bg-white p-4 rounded-md border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">Create Budget</h4>
                          <div className="flex gap-2 items-center">
                            <Badge className="bg-blue-100 text-blue-600 border-0 rounded-full px-2 text-xs">savings</Badge>
                            <div className="p-1 rounded-md bg-green-100 text-green-700 flex items-center">
                              <Check className="h-4 w-4 mr-1" />
                              <span className="text-xs font-medium">Completed</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Set up monthly budget with spending categories</p>
                        <p className="text-xs text-gray-500 mb-3">Target: 1 Sept 2023</p>
                        
                        <div className="flex items-center gap-1 text-blue-600 text-xs mb-2">
                          <FileText className="h-3.5 w-3.5" />
                          <a href="#" className="hover:underline">Budgeting Template</a>
                        </div>
                        
                        <div className="bg-green-50 p-2 rounded-md border border-green-100 mt-2">
                          <p className="text-sm text-green-600">
                            Congratulations! You've achieved this milestone. Keep up the great work!
                          </p>
                        </div>
                      </div>
                      
                      {/* In-progress milestone - Complete Emergency Fund */}
                      <div className="bg-white p-4 rounded-md border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">Complete Emergency Fund</h4>
                          <div className="flex gap-2 items-center">
                            <Badge className="bg-blue-100 text-blue-600 border-0 rounded-full px-2 text-xs">savings</Badge>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 h-8">
                              Mark Complete
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Reach target of 6 months expenses in emergency fund</p>
                        <p className="text-xs text-gray-500 mb-3">Target: 20 Aug 2024</p>
                        
                        <div className="flex items-center gap-1 text-blue-600 text-xs">
                          <FileText className="h-3.5 w-3.5" />
                          <a href="#" className="hover:underline">Emergency Fund Calculator</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-100 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Download className="h-5 w-5 text-blue-600 mr-2" />
                        <h3 className="font-medium text-blue-700">Save Your Journey</h3>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-blue-600 border-gray-200 hover:bg-gray-100"
                        onClick={downloadJourney}
                      >
                        Download Journey PDF
                      </Button>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      Get a detailed report of your financial journey progress, achievements, and personalized recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Milestones Tab */}
        <TabsContent value="milestones" className="mt-0 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Your Financial Milestones</CardTitle>
              <CardDescription>
                Track your progress through important financial goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add new milestone form */}
              <div className="bg-gray-100 p-4 rounded-lg mb-6 border border-gray-200">
                <h3 className="font-medium mb-3">Add New Milestone</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <Label htmlFor="milestone-title">Milestone Title</Label>
                    <Input 
                      id="milestone-title" 
                      placeholder="e.g., Start Emergency Fund"
                      value={newMilestone.title}
                      onChange={(e) => setNewMilestone({...newMilestone, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="milestone-date">Target Date</Label>
                    <Input 
                      id="milestone-date" 
                      type="date"
                      value={newMilestone.date}
                      onChange={(e) => setNewMilestone({...newMilestone, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label htmlFor="milestone-description">Description</Label>
                  <Input 
                    id="milestone-description" 
                    placeholder="Brief description of this milestone"
                    value={newMilestone.description}
                    onChange={(e) => setNewMilestone({...newMilestone, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="milestone-category">Category</Label>
                    <select 
                      id="milestone-category"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newMilestone.category}
                      onChange={(e) => setNewMilestone({
                        ...newMilestone, 
                        category: e.target.value as "savings" | "investment" | "debt" | "income" | "protection" | "education"
                      })}
                    >
                      <option value="savings">Savings</option>
                      <option value="investment">Investment</option>
                      <option value="debt">Debt</option>
                      <option value="income">Income</option>
                      <option value="protection">Protection</option>
                      <option value="education">Education</option>
                    </select>
                  </div>
                </div>
                <Button onClick={handleAddMilestone}>Add Milestone to Timeline</Button>
              </div>
              
              {/* Removed milestone listings per request */}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Timeline Tab */}
        <TabsContent value="timeline" className="mt-0 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Your Financial Journey Timeline</CardTitle>
              <CardDescription>
                Track your past achievements and future goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Timeline */}
                <div>
                  {/* Milestone Timeline */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-lg mb-4">Financial Milestones</h3>
                    
                    <div className="relative">
                      {/* Timeline vertical line */}
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-green-200"></div>
                      
                      {/* Milestones in vertical timeline */}
                      <div className="space-y-8 pl-4">
                        {journeyData.milestones
                          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                          .map((milestone, index) => {
                            const categoryColors = getCategoryColor(milestone.category);
                            const isCompleted = milestone.completed;
                            
                            return (
                              <div key={milestone.id} className="pl-8 relative">
                                {/* Timeline circle marker */}
                                <div className={`absolute -left-2 top-0 mt-1.5 w-6 h-6 rounded-full z-10 flex items-center justify-center ${
                                  isCompleted 
                                    ? "bg-green-500 border-2 border-green-100" 
                                    : "bg-white border-2 border-gray-300"
                                }`}>
                                  {isCompleted && <Check className="h-4 w-4 text-white" />}
                                </div>
                                
                                {/* Date badge */}
                                <div className="absolute left-8 -top-2.5 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                                  {formatDate(milestone.date)}
                                </div>
                                
                                {/* Card with milestone details */}
                                <div className={`mt-4 p-4 rounded-lg border shadow-sm ${
                                  isCompleted 
                                    ? "bg-white border-blue-200" 
                                    : "bg-white border-gray-200"
                                }`}>
                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                                      <Badge className={`${categoryColors.bg} ${categoryColors.text} border-0 px-2 rounded-full text-xs`}>
                                        {milestone.category}
                                      </Badge>
                                      <Badge className="bg-purple-100 text-purple-800 border-0 px-2 rounded-full text-xs">
                                        {milestone.phase || "Learning"}
                                      </Badge>
                                    </div>
                                    
                                    <p className="text-sm text-gray-600">{milestone.description}</p>
                                    
                                    {milestone.learningResource && (
                                      <div className="mt-1">
                                        <a 
                                          href={milestone.learningResource.url}
                                          className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                                        >
                                          <FileText className="h-3 w-3" />
                                          {milestone.learningResource.title}
                                        </a>
                                      </div>
                                    )}
                                    
                                    <div className="flex justify-end items-center mt-2">
                                      {!isCompleted && (
                                        <Button
                                          size="sm"
                                          variant="default"
                                          onClick={() => handleToggleMilestone(milestone.id)}
                                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                                        >
                                          Mark Complete
                                        </Button>
                                      )}
                                      
                                      {isCompleted && (
                                        <div className="flex items-center justify-end text-green-600 ml-auto">
                                          <span className="text-sm font-medium">Completed</span>
                                        </div>
                                      )}
                                    </div>
                                    
                                    {isCompleted && (
                                      <div className="mt-2 text-sm p-2 bg-green-50 text-green-700 rounded-md border border-green-100">
                                        <p>Congratulations! You've achieved this milestone.</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    
                    {/* If no milestones, show placeholder */}
                    {journeyData.milestones.length === 0 && (
                      <div className="text-center py-8 ml-8">
                        <div className="text-5xl mb-2">🎯</div>
                        <p className="text-gray-500">No milestones found</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Add milestones in the Milestones tab to see them here
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Right column - All Milestones Accordion */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">All Milestones</h3>
                  
                  <div className="space-y-2">
                    <Accordion type="multiple" className="w-full">
                      <AccordionItem value="completed">
                        <AccordionTrigger className="text-sm font-medium py-2">
                          Completed Milestones ({journeyData.milestones.filter(m => m.completed).length})
                        </AccordionTrigger>
                        <AccordionContent>
                          {journeyData.milestones
                            .filter(milestone => milestone.completed)
                            .map(milestone => {
                              const categoryColors = getCategoryColor(milestone.category);
                              
                              return (
                                <div 
                                  key={milestone.id}
                                  className="mb-3 p-3 border rounded-lg bg-gray-50"
                                >
                                  <div className="flex items-start">
                                    <div className="flex-1">
                                      <div className="flex items-center">
                                        <h4 className="font-medium text-sm">{milestone.title}</h4>
                                        <Badge 
                                          variant="outline" 
                                          className={`ml-2 ${categoryColors.bg} ${categoryColors.text} border-0 text-xs`}
                                        >
                                          {milestone.category}
                                        </Badge>
                                      </div>
                                      <p className="text-xs text-gray-600 mt-1">{milestone.description}</p>
                                      <p className="text-xs text-gray-500 mt-1">Completed: {formatDate(milestone.date)}</p>
                                    </div>
                                    
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-xs bg-green-50 hover:bg-green-100 text-green-700"
                                    >
                                      <Check className="h-3 w-3 mr-1" /> Done
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                            
                          {journeyData.milestones.filter(m => m.completed).length === 0 && (
                            <div className="text-center py-4">
                              <p className="text-gray-500 text-sm">No completed milestones yet</p>
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="upcoming">
                        <AccordionTrigger className="text-sm font-medium py-2">
                          Upcoming Milestones ({journeyData.milestones.filter(m => !m.completed).length})
                        </AccordionTrigger>
                        <AccordionContent>
                          {journeyData.milestones
                            .filter(milestone => !milestone.completed)
                            .map(milestone => {
                              const categoryColors = getCategoryColor(milestone.category);
                              
                              return (
                                <div 
                                  key={milestone.id}
                                  className="mb-3 p-3 border rounded-lg"
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center">
                                        <h4 className="font-medium text-sm">{milestone.title}</h4>
                                        <Badge 
                                          variant="outline" 
                                          className={`ml-2 ${categoryColors.bg} ${categoryColors.text} border-0 text-xs`}
                                        >
                                          {milestone.category}
                                        </Badge>
                                      </div>
                                      <p className="text-xs text-gray-600 mt-1">{milestone.description}</p>
                                      <p className="text-xs text-gray-500 mt-1">Target: {formatDate(milestone.date)}</p>
                                    </div>
                                    
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-7 text-xs"
                                      onClick={() => handleToggleMilestone(milestone.id)}
                                    >
                                      Mark Complete
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                            
                          {journeyData.milestones.filter(m => !m.completed).length === 0 && (
                            <div className="text-center py-4">
                              <p className="text-gray-500 text-sm">No upcoming milestones</p>
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="by-category">
                        <AccordionTrigger className="text-sm font-medium py-2">
                          Milestones by Category
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            {["savings", "investment", "debt", "income", "protection", "education"].map((category) => {
                              const count = journeyData.milestones.filter(m => m.category === category).length;
                              const categoryColors = getCategoryColor(category);
                              
                              return (
                                <Badge 
                                  key={category}
                                  variant="outline" 
                                  className={`${categoryColors.bg} ${categoryColors.text} border-0 justify-between py-2 px-3`}
                                >
                                  <span className="capitalize">{category}</span>
                                  <span className="bg-white text-gray-700 rounded-full px-2 py-0.5 text-xs ml-2">
                                    {count}
                                  </span>
                                </Badge>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Future Projection Tab */}
        <TabsContent value="projection" className="mt-0 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Your Financial Future Projection</CardTitle>
              <CardDescription>
                See how your savings can grow over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Warning notice */}
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 mb-4">
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> These projections are estimates based on current information and assumptions. 
                  Actual results may vary. Past performance does not guarantee future returns.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm text-slate-500 mb-1">Current Savings</p>
                  <p className="text-lg font-semibold">{formatCurrency(projectionData.currentSavings)}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm text-slate-500 mb-1">Monthly Contribution</p>
                  <p className="text-lg font-semibold">{formatCurrency(projectionData.monthlyContribution)}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm text-slate-500 mb-1">Time Horizon</p>
                  <p className="text-lg font-semibold">{projectionData.timeHorizonYears} years</p>
                </div>
              </div>
              
              <div className="h-72 w-full mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={projectionChartData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year" 
                      label={{ value: 'Years', position: 'insideBottom', offset: -5 }} 
                    />
                    <YAxis 
                      tickFormatter={(value) => new Intl.NumberFormat('en-IN', {
                        notation: 'compact',
                        compactDisplay: 'short',
                        currency: 'INR'
                      }).format(value)}
                      label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), 'Amount']}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="conservative" 
                      name={`Conservative (${projectionData.expectedReturnConservative}%)`}
                      stackId="1" 
                      stroke="#8884d8" 
                      fill="rgba(136, 132, 216, 0.6)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="moderate" 
                      name={`Moderate (${projectionData.expectedReturnModerate}%)`}
                      stackId="2" 
                      stroke="#82ca9d" 
                      fill="rgba(130, 202, 157, 0.6)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="aggressive" 
                      name={`Aggressive (${projectionData.expectedReturnAggressive}%)`}
                      stackId="3" 
                      stroke="#ffc658" 
                      fill="rgba(255, 198, 88, 0.6)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">Investment Growth Milestones</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Milestone</th>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {milestoneData.map((milestone, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{milestone.label}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Year {milestone.year}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{formatCurrency(milestone.actualAmount)}</td>
                        </tr>
                      ))}
                      {milestoneData.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-3 py-4 text-center text-sm text-gray-500">
                            No milestones reached within projected timeframe
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-6 border-t pt-4">
                <h4 className="font-medium mb-3">Adjust Projection Parameters</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="current-savings">Current Savings (₹)</Label>
                    <Input
                      id="current-savings"
                      type="number"
                      value={projectionData.currentSavings}
                      onChange={(e) => setProjectionData({...projectionData, currentSavings: Number(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="monthly-contribution">Monthly Contribution (₹)</Label>
                    <Input
                      id="monthly-contribution"
                      type="number"
                      value={projectionData.monthlyContribution}
                      onChange={(e) => setProjectionData({...projectionData, monthlyContribution: Number(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="time-horizon">Time Horizon (Years)</Label>
                    <Input
                      id="time-horizon"
                      type="number"
                      value={projectionData.timeHorizonYears}
                      onChange={(e) => setProjectionData({...projectionData, timeHorizonYears: Number(e.target.value) || 1})}
                      min={1}
                      max={50}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="inflation-rate">Inflation Rate (%)</Label>
                    <Input
                      id="inflation-rate"
                      type="number"
                      value={projectionData.inflationRate}
                      onChange={(e) => setProjectionData({...projectionData, inflationRate: Number(e.target.value) || 0})}
                      step={0.1}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label htmlFor="return-conservative">Conservative Return (%)</Label>
                    <Input
                      id="return-conservative"
                      type="number"
                      value={projectionData.expectedReturnConservative}
                      onChange={(e) => setProjectionData({...projectionData, expectedReturnConservative: Number(e.target.value) || 0})}
                      step={0.1}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="return-moderate">Moderate Return (%)</Label>
                    <Input
                      id="return-moderate"
                      type="number"
                      value={projectionData.expectedReturnModerate}
                      onChange={(e) => setProjectionData({...projectionData, expectedReturnModerate: Number(e.target.value) || 0})}
                      step={0.1}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="return-aggressive">Aggressive Return (%)</Label>
                    <Input
                      id="return-aggressive"
                      type="number"
                      value={projectionData.expectedReturnAggressive}
                      onChange={(e) => setProjectionData({...projectionData, expectedReturnAggressive: Number(e.target.value) || 0})}
                      step={0.1}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button 
                    onClick={() => {
                      // Show toast with update message
                      toast({
                        title: "Projection Updated",
                        description: "Future projection has been updated with your parameters.",
                      });
                    }} 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Update Projection
                  </Button>
                  <Link to={appPages.futureProjection.path}>
                    <Button variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                      Advanced Projection Tools
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}