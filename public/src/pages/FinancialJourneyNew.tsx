import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BookOpen,
  Shield,
  Zap,
  Target,
  Landmark,
  Award,
  CircleDollarSign,
  Lock,
  Check,
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  Calendar,
  PlusCircle,
  LineChart,
  Clock
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

// Type definitions
type FinancialPhase = 'Learning' | 'Stabilizing' | 'Growing' | 'Optimizing' | 'Freedom';

interface Phase {
  name: FinancialPhase;
  description: string;
  icon: React.ReactNode;
  color: string;
  focusAreas: string[];
}

interface PhasesMetrics {
  [key: string]: number;
}

interface Achievement {
  id: number;
  date: string;
  description: string;
  type: string;
}

interface FutureGoal {
  id: number;
  date: string;
  description: string;
  type: string;
  completed: boolean;
}

interface MilestoneType {
  id: number;
  title: string;
  description: string;
  category: "savings" | "investment" | "debt" | "income" | "protection" | "education";
  completed: boolean;
  completedDate?: string;
  targetDate?: string;
  progress: number;
}

interface ProjectionData {
  currentSavings: number;
  monthlyContribution: number;
  expectedReturnConservative: number;
  expectedReturnModerate: number;
  expectedReturnAggressive: number;
  inflationRate: number;
  timeHorizonYears: number;
}

// Generate example timeline data
const generateTimelineEvents = (): Achievement[] => {
  const today = new Date();
  const startDate = new Date();
  startDate.setFullYear(today.getFullYear() - 2);
  
  return [
    {
      id: 1,
      date: startDate.toISOString().split('T')[0],
      description: "Started financial journey with RupeeSmart",
      type: "journey_start"
    },
    {
      id: 2,
      date: new Date(startDate.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: "Completed first emergency fund savings goal",
      type: "saving"
    },
    {
      id: 3,
      date: new Date(startDate.getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: "Started SIP in equity mutual funds",
      type: "investment"
    },
    {
      id: 4,
      date: new Date(startDate.getTime() + 240 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: "Paid off credit card debt completely",
      type: "debt"
    },
    {
      id: 5,
      date: new Date(startDate.getTime() + 350 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: "Advanced to Stabilizing Phase! 🎉",
      type: "phase_change"
    },
    {
      id: 6,
      date: new Date(startDate.getTime() + 500 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: "Purchased term life insurance",
      type: "protection"
    },
  ];
};

export default function FinancialJourney() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("journey-map");
  const [currentPhase, setCurrentPhase] = useState<FinancialPhase>("Stabilizing");
  const [phaseMetrics, setPhaseMetrics] = useState<PhasesMetrics>({
    Learning: 100,
    Stabilizing: 75,
    Growing: 25,
    Optimizing: 0,
    Freedom: 0
  });
  
  // Achievements and goals
  const [achievements, setAchievements] = useState<Achievement[]>(generateTimelineEvents());
  const [futureGoals, setFutureGoals] = useState<FutureGoal[]>([
    {
      id: 1,
      date: new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: "Max out tax-advantaged investments",
      type: "investment",
      completed: false
    },
    {
      id: 2,
      date: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: "Build diversified investment portfolio",
      type: "investment",
      completed: false
    }
  ]);
  
  // Milestones data
  const [milestones, setMilestones] = useState<MilestoneType[]>([
    {
      id: 1,
      title: "Build Emergency Fund",
      description: "Save 3-6 months of expenses in a high-yield savings account",
      category: "savings",
      completed: true,
      completedDate: "2022-10-15",
      progress: 100
    },
    {
      id: 2,
      title: "Start Retirement Contributions",
      description: "Open a PPF/EPF account and contribute regularly",
      category: "investment",
      completed: true,
      completedDate: "2022-08-20",
      progress: 100
    },
    {
      id: 3,
      title: "Pay Off High-Interest Debt",
      description: "Eliminate credit card debt and personal loans",
      category: "debt",
      completed: false,
      targetDate: "2023-12-31",
      progress: 65
    },
    {
      id: 4,
      title: "Purchase Term Life Insurance",
      description: "Get coverage equal to 10x annual income",
      category: "protection",
      completed: false,
      targetDate: "2023-06-30",
      progress: 40
    },
    {
      id: 5,
      title: "Start SIP in Equity Mutual Funds",
      description: "Begin systematic investment in diversified equity funds",
      category: "investment",
      completed: true,
      completedDate: "2023-01-10",
      progress: 100
    }
  ]);
  
  const [showCompletedMilestones, setShowCompletedMilestones] = useState<boolean>(true);
  
  // Financial projection data
  const [projectionData, setProjectionData] = useState<ProjectionData>({
    currentSavings: 250000,
    monthlyContribution: 20000,
    expectedReturnConservative: 7.0,
    expectedReturnModerate: 10.0,
    expectedReturnAggressive: 13.0,
    inflationRate: 5.0,
    timeHorizonYears: 25
  });
  
  // New milestone form
  const [newMilestone, setNewMilestone] = useState<Omit<MilestoneType, "id" | "completed" | "progress">>({
    title: "",
    description: "",
    category: "savings",
    targetDate: undefined
  });
  
  // New achievement form
  const [newAchievement, setNewAchievement] = useState<Omit<Achievement, "id">>({
    description: "",
    type: "saving",
    date: new Date().toISOString().split('T')[0]
  });
  
  // Phases configuration
  const journeyPhases: Phase[] = [
    {
      name: "Learning",
      description: "Building financial knowledge and awareness",
      icon: <BookOpen className="h-8 w-8" />,
      color: "bg-amber-300 text-amber-900",
      focusAreas: [
        "Financial education through our Learning Hub",
        "Tracking all income and expenses",
        "Building mindful money habits",
        "Identifying spending patterns"
      ]
    },
    {
      name: "Stabilizing",
      description: "Managing debt and building emergency fund",
      icon: <Shield className="h-8 w-8" />,
      color: "bg-orange-300 text-orange-900",
      focusAreas: [
        "Building emergency fund (3-6 months expenses)",
        "Eliminating high-interest debt",
        "Creating a sustainable budget",
        "Setting up basic insurance coverage"
      ]
    },
    {
      name: "Growing",
      description: "Active saving and beginning investments",
      icon: <Zap className="h-8 w-8" />,
      color: "bg-green-300 text-green-900",
      focusAreas: [
        "Maximizing retirement contributions",
        "Starting systematic investment plans",
        "Tax planning and optimization",
        "Setting medium-term financial goals"
      ]
    },
    {
      name: "Optimizing",
      description: "Diversified investments and tax optimization",
      icon: <Target className="h-8 w-8" />,
      color: "bg-blue-300 text-blue-900",
      focusAreas: [
        "Diversifying investment portfolio",
        "Considering real estate investments",
        "Advanced tax optimization strategies",
        "Career growth and income expansion"
      ]
    },
    {
      name: "Freedom",
      description: "Financial independence and wealth preservation",
      icon: <Landmark className="h-8 w-8" />,
      color: "bg-purple-300 text-purple-900",
      focusAreas: [
        "Planning for financial independence",
        "Creating passive income streams",
        "Estate planning and wealth transfer",
        "Charitable giving and legacy planning"
      ]
    }
  ];
  
  // Phase advancement requirements
  const phaseRequirements: { [key in FinancialPhase]?: string[] } = {
    Learning: [
      "✅ Complete Budget Setup in Budget Buddy",
      "✅ Track expenses for at least 30 days",
      "✅ Complete the Financial Wellness introduction",
      "⬜ Complete at least 3 videos in the Learning Hub",
      "⬜ Set up your first financial goal"
    ],
    Stabilizing: [
      "✅ Build emergency fund to cover 3 months expenses",
      "✅ Reduce high-interest debt by 50% or more",
      "⬜ Maintain budget adherence for 3 consecutive months",
      "⬜ Set up basic insurance coverage"
    ],
    Growing: [
      "⬜ Max out tax-advantaged investments",
      "⬜ Create and follow a diversified investment plan",
      "⬜ Save 20% or more of monthly income for 6 months",
      "⬜ Complete advanced risk assessment"
    ],
    Optimizing: [
      "⬜ Investment portfolio exceeding ₹10 Lakhs",
      "⬜ Multiple income streams established",
      "⬜ Debt-to-income ratio below 20%",
      "⬜ Comprehensive insurance and estate planning"
    ]
  };
  
  // Get current phase index
  const getCurrentPhaseIndex = (): number => {
    return journeyPhases.findIndex(phase => phase.name === currentPhase);
  };
  
  // Function to handle adding a new milestone
  const handleAddMilestone = () => {
    if (!newMilestone.title) {
      toast({
        title: "Error",
        description: "Please enter a milestone title",
        variant: "destructive"
      });
      return;
    }
    
    const newMilestoneId = Math.max(0, ...milestones.map(m => m.id)) + 1;
    
    setMilestones([
      ...milestones,
      {
        id: newMilestoneId,
        ...newMilestone,
        completed: false,
        progress: 0
      }
    ]);
    
    // Reset form
    setNewMilestone({
      title: "",
      description: "",
      category: "savings",
      targetDate: undefined
    });
    
    toast({
      title: "Success",
      description: "New milestone added to your journey",
    });
  };
  
  // Function to handle adding a new achievement
  const handleAddAchievement = () => {
    if (!newAchievement.description) {
      toast({
        title: "Error",
        description: "Please enter an achievement description",
        variant: "destructive"
      });
      return;
    }
    
    const newAchievementId = Math.max(0, ...achievements.map(a => a.id)) + 1;
    
    setAchievements([
      ...achievements,
      {
        id: newAchievementId,
        ...newAchievement
      }
    ]);
    
    // Reset form
    setNewAchievement({
      description: "",
      type: "saving",
      date: new Date().toISOString().split('T')[0]
    });
    
    toast({
      title: "Success",
      description: "New achievement added to your journey",
    });
  };
  
  // Function to handle advancing to next phase
  const handlePhaseAdvancement = () => {
    const currentIndex = getCurrentPhaseIndex();
    
    if (currentIndex < journeyPhases.length - 1) {
      const nextPhase = journeyPhases[currentIndex + 1].name;
      setCurrentPhase(nextPhase);
      
      // Update phase metrics
      const updatedMetrics = { ...phaseMetrics };
      
      // Current phase is now 100%
      const currentPhaseName = journeyPhases[currentIndex].name;
      updatedMetrics[currentPhaseName] = 100;
      
      // Next phase starts at some progress
      updatedMetrics[nextPhase] = 10;
      
      setPhaseMetrics(updatedMetrics);
      
      // Add achievement for phase advancement
      const newAchievementId = Math.max(0, ...achievements.map(a => a.id)) + 1;
      
      setAchievements([
        ...achievements,
        {
          id: newAchievementId,
          date: new Date().toISOString().split('T')[0],
          description: `Advanced to ${nextPhase} Phase! 🎉`,
          type: "phase_change"
        }
      ]);
      
      toast({
        title: "Congratulations!",
        description: `You've advanced to the ${nextPhase} phase of your financial journey!`,
      });
    }
  };
  
  // Function to mark a future goal as complete
  const handleCompleteGoal = (index: number) => {
    const updatedGoals = [...futureGoals];
    updatedGoals[index].completed = true;
    setFutureGoals(updatedGoals);
    
    // Add to achievements
    const goalToComplete = futureGoals[index];
    const newAchievementId = Math.max(0, ...achievements.map(a => a.id)) + 1;
    
    setAchievements([
      ...achievements,
      {
        id: newAchievementId,
        date: new Date().toISOString().split('T')[0],
        description: goalToComplete.description + " 🎉",
        type: goalToComplete.type
      }
    ]);
    
    toast({
      title: "Goal Completed",
      description: "Congratulations on reaching your financial goal!"
    });
  };
  
  // Function to toggle milestone completion
  const handleToggleMilestone = (id: number) => {
    setMilestones(milestones.map(milestone => {
      if (milestone.id === id) {
        return {
          ...milestone,
          completed: !milestone.completed,
          completedDate: !milestone.completed ? new Date().toISOString().split('T')[0] : undefined,
          progress: !milestone.completed ? 100 : milestone.progress
        };
      }
      return milestone;
    }));
  };
  
  // Function to update milestone progress
  const handleUpdateProgress = (id: number, newProgress: number) => {
    setMilestones(milestones.map(milestone => {
      if (milestone.id === id) {
        return {
          ...milestone,
          progress: newProgress,
          completed: newProgress >= 100
        };
      }
      return milestone;
    }));
  };
  
  // Function to add a new future goal
  const handleAddFutureGoal = () => {
    if (!newAchievement.description) {
      toast({
        title: "Error",
        description: "Please enter a goal description",
        variant: "destructive"
      });
      return;
    }
    
    const newGoalId = Math.max(0, ...futureGoals.map(g => g.id)) + 1;
    
    setFutureGoals([
      ...futureGoals,
      {
        id: newGoalId,
        date: newAchievement.date,
        description: newAchievement.description,
        type: newAchievement.type,
        completed: false
      }
    ]);
    
    // Reset form
    setNewAchievement({
      description: "",
      type: "saving",
      date: new Date().toISOString().split('T')[0]
    });
    
    toast({
      title: "Future Goal Added",
      description: "Your financial goal has been added to your timeline"
    });
  };
  
  // Generate projection data for charts
  const generateProjectionData = () => {
    const years = Array.from({length: projectionData.timeHorizonYears + 1}, (_, i) => i);
    
    // Calculate growth for different scenarios
    const conservativeGrowth = [projectionData.currentSavings];
    const moderateGrowth = [projectionData.currentSavings];
    const aggressiveGrowth = [projectionData.currentSavings];
    
    for (let year = 1; year <= projectionData.timeHorizonYears; year++) {
      // Conservative scenario
      const prevConservative = conservativeGrowth[year - 1];
      const newConservative = prevConservative * (1 + projectionData.expectedReturnConservative/100) + 
        projectionData.monthlyContribution * 12;
      conservativeGrowth.push(newConservative);
      
      // Moderate scenario
      const prevModerate = moderateGrowth[year - 1];
      const newModerate = prevModerate * (1 + projectionData.expectedReturnModerate/100) + 
        projectionData.monthlyContribution * 12;
      moderateGrowth.push(newModerate);
      
      // Aggressive scenario
      const prevAggressive = aggressiveGrowth[year - 1];
      const newAggressive = prevAggressive * (1 + projectionData.expectedReturnAggressive/100) + 
        projectionData.monthlyContribution * 12;
      aggressiveGrowth.push(newAggressive);
    }
    
    // Create data for chart
    return years.map(year => ({
      year,
      conservative: Math.round(conservativeGrowth[year]),
      moderate: Math.round(moderateGrowth[year]),
      aggressive: Math.round(aggressiveGrowth[year])
    }));
  };
  
  // Generate milestone data
  const generateMilestoneData = () => {
    const milestoneAmounts = [
      { label: "First ₹5 Lakhs", amount: 500000 },
      { label: "First ₹10 Lakhs", amount: 1000000 },
      { label: "First ₹25 Lakhs", amount: 2500000 },
      { label: "First ₹50 Lakhs", amount: 5000000 },
      { label: "First ₹1 Crore", amount: 10000000 },
    ];
    
    const moderateGrowth = generateProjectionData().map(d => d.moderate);
    
    const milestoneData = [];
    
    for (const milestone of milestoneAmounts) {
      for (let i = 0; i < moderateGrowth.length; i++) {
        if (moderateGrowth[i] >= milestone.amount && i > 0) {
          milestoneData.push({
            label: milestone.label,
            year: i,
            amount: milestone.amount,
            actualAmount: moderateGrowth[i]
          });
          break;
        }
      }
    }
    
    return milestoneData.sort((a, b) => a.year - b.year);
  };
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Format date
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get icon for milestone type
  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'journey_start': return <Zap className="h-5 w-5 text-blue-500" />;
      case 'phase_change': return <Award className="h-5 w-5 text-amber-500" />;
      case 'saving': return <CircleDollarSign className="h-5 w-5 text-green-500" />;
      case 'investment': return <Landmark className="h-5 w-5 text-purple-500" />;
      case 'debt': return <Lock className="h-5 w-5 text-red-500" />;
      case 'protection': return <Shield className="h-5 w-5 text-blue-500" />;
      case 'learning': return <BookOpen className="h-5 w-5 text-indigo-500" />;
      case 'goal_complete': return <Target className="h-5 w-5 text-green-500" />;
      default: return <CircleDollarSign className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Get color based on milestone category
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'savings': return 'bg-green-600';
      case 'investment': return 'bg-purple-600';
      case 'debt': return 'bg-red-600';
      case 'income': return 'bg-blue-600';
      case 'protection': return 'bg-amber-600';
      case 'education': return 'bg-indigo-600';
      default: return 'bg-gray-600';
    }
  };
  
  // Get label for milestone category
  const getCategoryLabel = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  // Show correct phase progress
  const phaseProgress = (phaseName: string): number => {
    return phaseMetrics[phaseName] || 0;
  };
  
  // Calculate overall journey progress
  const journeyProgress = Object.values(phaseMetrics).reduce((sum, value) => sum + value, 0) / Object.keys(phaseMetrics).length;
  
  // Filter milestones based on completion status
  const filteredMilestones = showCompletedMilestones 
    ? milestones 
    : milestones.filter(milestone => !milestone.completed);
    
  // Get projection data for charts
  const projectionChartData = generateProjectionData();
  const milestoneData = generateMilestoneData();
  
  return (
    <div className="px-4 py-3">
      <div className="flex items-center mb-4">
        <button 
          onClick={() => window.history.back()}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h2 className="text-xl font-semibold flex items-center">
          <span className="mr-2">🚀</span>
          Your Financial Journey
        </h2>
      </div>
      
      {/* Header Section */}
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
        <div className="text-sm text-slate-600 italic mb-2">
          <AlertTriangle className="h-4 w-4 inline-block mr-1" />
          <span>Disclaimer: Past performance does not guarantee future returns. This visualization is based on your information and is for educational purposes only.</span>
        </div>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue="journey-map" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-transparent p-0 border-0 w-full mb-4">
          <TabsTrigger value="journey-map" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">
            Journey Map
          </TabsTrigger>
          <TabsTrigger value="milestones" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">
            Milestones
          </TabsTrigger>
          <TabsTrigger value="timeline" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">
            Timeline
          </TabsTrigger>
          <TabsTrigger value="projection" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">
            Future Projection
          </TabsTrigger>
        </TabsList>
        
        {/* Journey Map Content */}
        <TabsContent value="journey-map" className="mt-0 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Your Financial Journey</CardTitle>
              <CardDescription>
                Track your progress through the 5 phases of financial growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Journey Progress</span>
                  <span>{journeyProgress.toFixed(0)}%</span>
                </div>
                <Progress value={journeyProgress} className="h-2" />
              </div>
              
              <div className="space-y-8 mt-6">
                {journeyPhases.map((phase, index) => {
                  const isCurrentPhase = phase.name === currentPhase;
                  const isCompleted = phaseProgress(phase.name) >= 100;
                  const isPast = index < getCurrentPhaseIndex();
                  
                  return (
                    <div 
                      key={phase.name}
                      className={`relative flex ${isCurrentPhase ? 'opacity-100' : isPast ? 'opacity-90' : 'opacity-50'}`}
                    >
                      {/* Phase icon and connecting line */}
                      <div className="flex flex-col items-center mr-4">
                        <div className={`flex items-center justify-center w-14 h-14 rounded-full ${phase.color} mb-1`}>
                          {phase.icon}
                        </div>
                        {index < journeyPhases.length - 1 && (
                          <div className={`w-0.5 h-20 ${isPast ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        )}
                      </div>
                      
                      {/* Phase content */}
                      <div className="flex-1">
                        <h3 className="text-base font-semibold flex items-center">
                          {phase.name}
                          {isCompleted && <Check className="h-4 w-4 text-green-500 ml-2" />}
                          {isCurrentPhase && (
                            <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                              Current Phase
                            </Badge>
                          )}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">{phase.description}</p>
                        
                        {/* Progress bar for current phase */}
                        {(isCurrentPhase || isPast) && (
                          <div className="mb-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Phase Progress</span>
                              <span>{phaseProgress(phase.name).toFixed(0)}%</span>
                            </div>
                            <Progress value={phaseProgress(phase.name)} className="h-1.5" />
                          </div>
                        )}
                        
                        {/* Focus areas */}
                        {isCurrentPhase && (
                          <div className="mt-3">
                            <h4 className="text-sm font-medium mb-1">Current Focus Areas:</h4>
                            <ul className="text-sm space-y-1">
                              {phase.focusAreas.map((area, idx) => (
                                <li key={idx} className="flex items-start">
                                  <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 mr-1 flex-shrink-0" />
                                  <span>{area}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div>
                <h4 className="text-sm font-medium mb-1">Current Phase: {currentPhase}</h4>
                <p className="text-xs text-gray-500">Complete current phase requirements to advance</p>
              </div>
              <Button 
                onClick={handlePhaseAdvancement}
                disabled={phaseProgress(currentPhase) < 75 || getCurrentPhaseIndex() >= journeyPhases.length - 1}
                className="bg-gradient-to-r from-blue-500 to-blue-600"
              >
                Advance to Next Phase
              </Button>
            </CardFooter>
          </Card>
          
          {/* Phase Requirements */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Phase Requirements</CardTitle>
              <CardDescription>
                Complete these steps to advance to the next phase
              </CardDescription>
            </CardHeader>
            <CardContent>
              {phaseRequirements[currentPhase] && (
                <ul className="space-y-2">
                  {phaseRequirements[currentPhase]?.map((req, index) => (
                    <li key={index} className="text-sm">
                      {req}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Milestones Content */}
        <TabsContent value="milestones" className="mt-0 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <div>
                  <CardTitle>Your Financial Milestones</CardTitle>
                  <CardDescription>
                    Track progress on your major financial goals
                  </CardDescription>
                </div>
                <div className="flex items-center">
                  <Label htmlFor="show-completed" className="text-xs mr-2">Show Completed</Label>
                  <input 
                    id="show-completed"
                    type="checkbox" 
                    checked={showCompletedMilestones} 
                    onChange={() => setShowCompletedMilestones(!showCompletedMilestones)}
                    className="rounded text-primary"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredMilestones.length > 0 ? (
                filteredMilestones.map((milestone) => (
                  <Card key={milestone.id} className={`${milestone.completed ? 'border-green-200 bg-green-50' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={milestone.completed}
                              onChange={() => handleToggleMilestone(milestone.id)}
                              className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <h4 className={`font-medium ${milestone.completed ? 'line-through text-gray-500' : ''}`}>
                              {milestone.title}
                            </h4>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 ml-6">{milestone.description}</p>
                        </div>
                        <Badge 
                          className={`ml-2 ${getCategoryColor(milestone.category)} text-white`}
                        >
                          {getCategoryLabel(milestone.category)}
                        </Badge>
                      </div>
                      
                      {!milestone.completed && (
                        <div className="ml-6">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{milestone.progress}%</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Progress value={milestone.progress} className="h-2 flex-1" />
                            <div className="flex space-x-1">
                              <button 
                                onClick={() => handleUpdateProgress(milestone.id, Math.max(0, milestone.progress - 10))}
                                className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-700"
                              >
                                <span>-</span>
                              </button>
                              <button 
                                onClick={() => handleUpdateProgress(milestone.id, Math.min(100, milestone.progress + 10))}
                                className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-700"
                              >
                                <span>+</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between mt-2 ml-6 text-xs text-gray-500">
                        {milestone.completed ? (
                          <span>Completed on: {formatDate(milestone.completedDate)}</span>
                        ) : milestone.targetDate ? (
                          <span>Target date: {formatDate(milestone.targetDate)}</span>
                        ) : (
                          <span>No target date set</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No milestones found</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {showCompletedMilestones ? "Add a milestone to get started" : "All milestones completed! Toggle to show completed ones."}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button 
                onClick={() => setActiveTab("add-milestone")}
                className="w-full"
                variant="outline"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Milestone
              </Button>
            </CardFooter>
          </Card>
          
          {/* Add New Milestone Form */}
          {activeTab === "add-milestone" && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Milestone</CardTitle>
                <CardDescription>Create a new financial goal to track</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="milestone-title">Title</Label>
                  <Input
                    id="milestone-title"
                    placeholder="e.g., Save for Emergency Fund"
                    value={newMilestone.title}
                    onChange={(e) => setNewMilestone({...newMilestone, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="milestone-description">Description</Label>
                  <Input
                    id="milestone-description"
                    placeholder="e.g., Save 3 months of expenses"
                    value={newMilestone.description}
                    onChange={(e) => setNewMilestone({...newMilestone, description: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="milestone-category">Category</Label>
                  <Select 
                    value={newMilestone.category} 
                    onValueChange={(value: any) => setNewMilestone({...newMilestone, category: value})}
                  >
                    <SelectTrigger id="milestone-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings">Savings</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="debt">Debt</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="protection">Protection</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="milestone-target-date">Target Date (Optional)</Label>
                  <Input
                    id="milestone-target-date"
                    type="date"
                    value={newMilestone.targetDate || ''}
                    onChange={(e) => setNewMilestone({...newMilestone, targetDate: e.target.value || undefined})}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("milestones")}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddMilestone}>
                  Add Milestone
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        {/* Timeline Content */}
        <TabsContent value="timeline" className="mt-0 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Your Financial Timeline</CardTitle>
              <CardDescription>
                View your past achievements and future goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-4">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Clock className="h-3 w-3 mr-1" /> Past Events
                </Badge>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  <Calendar className="h-3 w-3 mr-1" /> Future Goals
                </Badge>
              </div>
              
              <div className="relative pl-8 border-l-2 border-gray-200 space-y-6">
                {/* Render achievements (past events) */}
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="relative -ml-8">
                    <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full flex items-center justify-center bg-white border-2 border-blue-500">
                      {getMilestoneIcon(achievement.type)}
                    </div>
                    <div className="ml-8 pt-0.5">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium">{achievement.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {formatDate(achievement.date)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Today marker */}
                <div className="relative -ml-8">
                  <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full flex items-center justify-center bg-white border-2 border-amber-500">
                    <Clock className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="ml-8 pt-0.5">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium">Today</p>
                      <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                        {formatDate(new Date().toISOString().split('T')[0])}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Render future goals */}
                {futureGoals.filter(goal => !goal.completed).map((goal, index) => (
                  <div key={goal.id} className="relative -ml-8">
                    <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full flex items-center justify-center bg-white border-2 border-amber-500">
                      {getMilestoneIcon(goal.type)}
                    </div>
                    <div className="ml-8 pt-0.5">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium">{goal.description}</p>
                        <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                          {formatDate(goal.date)}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs hover:bg-green-50 text-green-600 px-2 py-0 h-6 mt-1"
                        onClick={() => handleCompleteGoal(index)}
                      >
                        <Check className="h-3 w-3 mr-1" /> Mark as Completed
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button 
                variant="outline"
                onClick={() => setActiveTab("add-timeline-event")}
                className="w-full"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Timeline Event
              </Button>
            </CardFooter>
          </Card>
          
          {/* Add Timeline Event Form */}
          {activeTab === "add-timeline-event" && (
            <Card>
              <CardHeader>
                <CardTitle>Add Timeline Event</CardTitle>
                <CardDescription>Record a new achievement or set a future goal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="event-description">Description</Label>
                  <Input
                    id="event-description"
                    placeholder="e.g., Started investing in mutual funds"
                    value={newAchievement.description}
                    onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="event-type">Type</Label>
                  <Select 
                    value={newAchievement.type} 
                    onValueChange={(value) => setNewAchievement({...newAchievement, type: value})}
                  >
                    <SelectTrigger id="event-type">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saving">Saving</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="debt">Debt</SelectItem>
                      <SelectItem value="protection">Protection</SelectItem>
                      <SelectItem value="learning">Learning</SelectItem>
                      <SelectItem value="journey_start">Journey Start</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="event-date">Date</Label>
                  <Input
                    id="event-date"
                    type="date"
                    value={newAchievement.date}
                    onChange={(e) => setNewAchievement({...newAchievement, date: e.target.value})}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleAddAchievement()}
                    className="flex-1"
                  >
                    <span className="mr-1">📝</span> Add as Achievement
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleAddFutureGoal()}
                    className="flex-1"
                  >
                    <span className="mr-1">🎯</span> Add as Future Goal
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="ghost"
                  onClick={() => setActiveTab("timeline")}
                  className="w-full"
                >
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        {/* Future Projection Content */}
        <TabsContent value="projection" className="mt-0 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Investment Projection</CardTitle>
              <CardDescription>
                See how your savings can grow over time
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                      name="Conservative (7%)" 
                      stackId="1" 
                      stroke="#8884d8" 
                      fill="rgba(136, 132, 216, 0.6)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="moderate" 
                      name="Moderate (10%)" 
                      stackId="2" 
                      stroke="#82ca9d" 
                      fill="rgba(130, 202, 157, 0.6)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="aggressive" 
                      name="Aggressive (13%)" 
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
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button 
                variant="outline"
                onClick={() => setActiveTab("adjust-projection")}
                className="w-full"
              >
                <LineChart className="h-4 w-4 mr-2" />
                Adjust Projection Parameters
              </Button>
            </CardFooter>
          </Card>
          
          {/* Adjust Projection Parameters Form */}
          {activeTab === "adjust-projection" && (
            <Card>
              <CardHeader>
                <CardTitle>Adjust Projection Parameters</CardTitle>
                <CardDescription>Update the values to see how your investments might grow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="current-savings">Current Savings</Label>
                  <Input
                    id="current-savings"
                    type="number"
                    value={projectionData.currentSavings}
                    onChange={(e) => setProjectionData({...projectionData, currentSavings: Number(e.target.value) || 0})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="monthly-contribution">Monthly Contribution</Label>
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="return-conservative">Conservative Return Rate (%)</Label>
                    <Input
                      id="return-conservative"
                      type="number"
                      value={projectionData.expectedReturnConservative}
                      onChange={(e) => setProjectionData({...projectionData, expectedReturnConservative: Number(e.target.value) || 0})}
                      step={0.1}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="return-moderate">Moderate Return Rate (%)</Label>
                    <Input
                      id="return-moderate"
                      type="number"
                      value={projectionData.expectedReturnModerate}
                      onChange={(e) => setProjectionData({...projectionData, expectedReturnModerate: Number(e.target.value) || 0})}
                      step={0.1}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="return-aggressive">Aggressive Return Rate (%)</Label>
                    <Input
                      id="return-aggressive"
                      type="number"
                      value={projectionData.expectedReturnAggressive}
                      onChange={(e) => setProjectionData({...projectionData, expectedReturnAggressive: Number(e.target.value) || 0})}
                      step={0.1}
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
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("projection")}
                >
                  Cancel
                </Button>
                <Button onClick={() => setActiveTab("projection")}>
                  Update Projection
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}