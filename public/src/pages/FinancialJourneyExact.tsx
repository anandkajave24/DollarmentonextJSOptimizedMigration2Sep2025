import { useState, useEffect } from "react";
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  AlertTriangle, 
  ArrowLeft, 
  Award,
  BookOpen, 
  Check, 
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
  icon: string;
  color: string;
  bgColor: string;
  focusAreas: string[];
  threshold: number;
}

export default function FinancialJourney() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("journey-map");
  
  // Journey phases data
  const journeyPhases: PhaseInfo[] = [
    {
      name: "Learning",
      description: "Building financial knowledge and awareness",
      icon: "📚",
      color: "#FF9E80",
      bgColor: "#FFEBEE",
      focusAreas: [
        "Financial education through our Learning Hub",
        "Tracking all income and expenses",
        "Building mindful money habits",
        "Identifying spending patterns"
      ],
      threshold: 80
    },
    {
      name: "Stabilizing",
      description: "Managing debt and building emergency fund",
      icon: "🛡️",
      color: "#FFD180",
      bgColor: "#FFF3E0",
      focusAreas: [
        "Building emergency fund (3-6 months expenses)",
        "Eliminating high-interest debt",
        "Creating a sustainable budget",
        "Setting up basic insurance coverage"
      ],
      threshold: 75
    },
    {
      name: "Growing",
      description: "Active saving and beginning investments",
      icon: "🌱",
      color: "#FFFF8D",
      bgColor: "#FFFDE7",
      focusAreas: [
        "Maximizing retirement contributions",
        "Starting systematic investment plans",
        "Tax planning and optimization",
        "Setting medium-term financial goals"
      ],
      threshold: 70
    },
    {
      name: "Optimizing",
      description: "Diversified investments and tax optimization",
      icon: "📈",
      color: "#CCFF90",
      bgColor: "#F1F8E9",
      focusAreas: [
        "Diversifying investment portfolio",
        "Considering real estate investments",
        "Advanced tax optimization strategies",
        "Career growth and income expansion"
      ],
      threshold: 70
    },
    {
      name: "Freedom",
      description: "Financial independence and wealth preservation",
      icon: "🦅",
      color: "#A7FFEB",
      bgColor: "#E0F7FA",
      focusAreas: [
        "Planning for financial independence",
        "Creating passive income streams",
        "Estate planning and wealth transfer",
        "Charitable giving and legacy planning"
      ],
      threshold: 60
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
  
  // Journey data state
  const [journeyData, setJourneyData] = useState<JourneyDataType>({
    milestones: [
      {
        id: 1,
        title: "Start Emergency Fund",
        description: "Open high-yield savings account for emergency funds",
        date: "2022-08-15",
        completed: true,
        category: "savings"
      },
      {
        id: 2,
        title: "Create Budget",
        description: "Set up monthly budget with spending categories",
        date: "2022-09-01",
        completed: true,
        category: "savings"
      },
      {
        id: 3,
        title: "Pay Off Credit Card",
        description: "Eliminate high-interest credit card debt",
        date: "2023-02-15",
        completed: true,
        category: "debt"
      },
      {
        id: 4,
        title: "Start SIP",
        description: "Begin systematic investment plan in mutual funds",
        date: "2023-03-10",
        completed: true,
        category: "investment"
      },
      {
        id: 5,
        title: "Complete Emergency Fund",
        description: "Reach target of 6 months expenses in emergency fund",
        date: "2023-08-20",
        completed: false,
        category: "savings"
      },
      {
        id: 6,
        title: "Purchase Term Insurance",
        description: "Get life insurance coverage for family protection",
        date: "2023-11-01",
        completed: false,
        category: "protection"
      }
    ],
    achievements: [
      {
        id: 1,
        date: "2022-08-01",
        description: "Started financial journey with RupeeSmart",
        type: "journey_start"
      },
      {
        id: 2,
        date: "2022-09-15",
        description: "First month of budget adherence achieved",
        type: "budget"
      },
      {
        id: 3,
        date: "2022-11-10",
        description: "Completed first financial education module",
        type: "learning"
      },
      {
        id: 4,
        date: "2023-02-15",
        description: "Paid off credit card debt completely!",
        type: "debt"
      },
      {
        id: 5,
        date: "2023-03-10",
        description: "Started first SIP in equity mutual funds",
        type: "investment"
      },
      {
        id: 6,
        date: "2023-06-01",
        description: "Advanced to Stabilizing Phase! 🎉",
        type: "phase_change"
      }
    ],
    futureGoals: [
      {
        id: 1,
        date: "2023-12-31",
        description: "Complete emergency fund target",
        type: "savings",
        completed: false
      },
      {
        id: 2,
        date: "2024-03-31",
        description: "Max out tax-saving investments",
        type: "investment",
        completed: false
      },
      {
        id: 3,
        date: "2024-06-30",
        description: "Increase monthly savings rate to 20%",
        type: "savings",
        completed: false
      }
    ],
    startedDate: "2022-08-01",
    currentPhase: "Stabilizing"
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
    category: "savings"
  });
  
  // Determine the current phase information
  const getCurrentPhase = () => {
    return journeyPhases.find(phase => phase.name === journeyData.currentPhase) || journeyPhases[0];
  };
  
  // Determine recommended phase based on metrics
  const getRecommendedPhase = (): PhaseType => {
    // Start with Learning phase
    let recommendedPhase: PhaseType = "Learning";
    
    // Check if Learning phase is completed to recommended Stabilizing
    if (phaseMetrics.Learning >= journeyPhases[0].threshold) {
      recommendedPhase = "Stabilizing";
      
      // Check if Stabilizing phase is completed to recommend Growing
      if (phaseMetrics.Stabilizing >= journeyPhases[1].threshold) {
        recommendedPhase = "Growing";
        
        // Check if Growing phase is completed to recommend Optimizing
        if (phaseMetrics.Growing >= journeyPhases[2].threshold) {
          recommendedPhase = "Optimizing";
          
          // Check if Optimizing phase is completed to recommend Freedom
          if (phaseMetrics.Optimizing >= journeyPhases[3].threshold) {
            recommendedPhase = "Freedom";
          }
        }
      }
    }
    
    return recommendedPhase;
  };
  
  // Calculate overall journey progress
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
    
    setJourneyData({
      ...journeyData,
      milestones: [
        ...journeyData.milestones,
        {
          id: newId,
          ...newMilestone,
          completed: false
        }
      ]
    });
    
    // Reset the form
    setNewMilestone({
      title: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      category: "savings"
    });
    
    toast({
      title: "Success",
      description: "New milestone added to your journey",
    });
  };
  
  // Toggle milestone completion
  const handleToggleMilestone = (id: number) => {
    setJourneyData({
      ...journeyData,
      milestones: journeyData.milestones.map(milestone => {
        if (milestone.id === id) {
          // If marking as complete, add to achievements
          if (!milestone.completed) {
            const newAchievementId = Math.max(0, ...journeyData.achievements.map(a => a.id)) + 1;
            
            setJourneyData(prev => ({
              ...prev,
              achievements: [
                ...prev.achievements,
                {
                  id: newAchievementId,
                  date: new Date().toISOString().split('T')[0],
                  description: milestone.title + " completed!",
                  type: milestone.category
                }
              ]
            }));
          }
          
          return {
            ...milestone,
            completed: !milestone.completed
          };
        }
        return milestone;
      })
    });
  };
  
  // Handle phase advancement
  const handlePhaseAdvancement = () => {
    const currentPhaseIndex = getCurrentPhaseIndex();
    
    if (currentPhaseIndex < journeyPhases.length - 1) {
      const nextPhase = journeyPhases[currentPhaseIndex + 1].name;
      
      // Add achievement for phase advancement
      const newAchievementId = Math.max(0, ...journeyData.achievements.map(a => a.id)) + 1;
      
      setJourneyData({
        ...journeyData,
        currentPhase: nextPhase,
        achievements: [
          ...journeyData.achievements,
          {
            id: newAchievementId,
            date: new Date().toISOString().split('T')[0],
            description: `Advanced to ${nextPhase} Phase! 🎉`,
            type: "phase_change"
          }
        ]
      });
      
      toast({
        title: "Congratulations!",
        description: `You've advanced to the ${nextPhase} phase of your financial journey!`,
      });
    }
  };
  
  // Mark a future goal as complete
  const handleCompleteGoal = (id: number) => {
    const goalIndex = journeyData.futureGoals.findIndex(goal => goal.id === id);
    
    if (goalIndex !== -1) {
      const updatedGoals = [...journeyData.futureGoals];
      updatedGoals[goalIndex] = {
        ...updatedGoals[goalIndex],
        completed: true
      };
      
      // Add to achievements
      const goalToComplete = journeyData.futureGoals[goalIndex];
      const newAchievementId = Math.max(0, ...journeyData.achievements.map(a => a.id)) + 1;
      
      setJourneyData({
        ...journeyData,
        futureGoals: updatedGoals,
        achievements: [
          ...journeyData.achievements,
          {
            id: newAchievementId,
            date: new Date().toISOString().split('T')[0],
            description: goalToComplete.description + " completed! 🎉",
            type: goalToComplete.type
          }
        ]
      });
      
      toast({
        title: "Goal Completed",
        description: "Congratulations on reaching your financial goal!"
      });
    }
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
  
  // Generate data for milestone projection
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
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get color for different milestone categories
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'savings': return 'bg-green-600';
      case 'investment': return 'bg-purple-600';
      case 'debt': return 'bg-red-600';
      case 'income': return 'bg-blue-600';
      case 'protection': return 'bg-amber-600';
      case 'education': return 'bg-indigo-600';
      case 'journey_start': return 'bg-blue-500';
      case 'budget': return 'bg-green-500';
      case 'learning': return 'bg-indigo-500';
      case 'phase_change': return 'bg-amber-500';
      default: return 'bg-gray-600';
    }
  };
  
  // Get color for phase metrics
  const getPhaseColor = (phase: PhaseType): string => {
    const phaseInfo = journeyPhases.find(p => p.name === phase);
    return phaseInfo ? phaseInfo.bgColor : '#f1f5f9'; // Default to slate-100
  };
  
  // Get icon for phase
  const getPhaseIcon = (phase: PhaseType): string => {
    const phaseInfo = journeyPhases.find(p => p.name === phase);
    return phaseInfo ? phaseInfo.icon : '📚'; // Default icon
  };
  
  // Calculate if the user can advance to the next phase
  const canAdvancePhase = (): boolean => {
    const currentPhaseIndex = getCurrentPhaseIndex();
    
    // If already at the last phase, can't advance
    if (currentPhaseIndex >= journeyPhases.length - 1) {
      return false;
    }
    
    // Check if the current phase has met the threshold for advancement
    const currentPhase = journeyData.currentPhase;
    const threshold = journeyPhases[currentPhaseIndex].threshold;
    
    return phaseMetrics[currentPhase] >= threshold;
  };
  
  // Get label for milestone category
  const getCategoryLabel = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  // Get the overall journey progress
  const overallProgress = calculateOverallProgress();
  
  // Get the recommended phase
  const recommendedPhase = getRecommendedPhase();
  
  // Check if there is a recommendation to advance phases
  const hasAdvancementRecommendation = recommendedPhase !== journeyData.currentPhase &&
    journeyPhases.findIndex(p => p.name === recommendedPhase) > journeyPhases.findIndex(p => p.name === journeyData.currentPhase);
  
  // Get the milestones sorted by date
  const sortedMilestones = [...journeyData.milestones].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Get all timeline events sorted by date
  const getTimelineEvents = () => {
    // Combine achievements and future goals
    const allEvents = [
      ...journeyData.achievements.map(a => ({
        id: `a-${a.id}`,
        date: a.date,
        description: a.description,
        type: a.type,
        isPast: true
      })),
      ...journeyData.futureGoals.filter(g => !g.completed).map(g => ({
        id: `g-${g.id}`,
        date: g.date,
        description: g.description,
        type: g.type,
        isPast: false,
        goalId: g.id
      }))
    ];
    
    // Sort by date
    return allEvents.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };
  
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
      
      {/* Disclaimer */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
        <div className="text-sm text-blue-800 italic flex items-start">
          <AlertTriangle className="h-4 w-4 inline-block mr-2 mt-0.5 flex-shrink-0" />
          <span>Disclaimer: Past performance does not guarantee future returns. This visualization is based on your information and is for educational purposes only.</span>
        </div>
      </div>
      
      {/* Show advancement recommendation if applicable */}
      {hasAdvancementRecommendation && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
          <div className="text-sm text-green-800 flex items-start">
            <span className="mr-2 text-lg">🎉</span>
            <span>Based on your financial progress, you've reached the criteria to advance to the <strong>{recommendedPhase}</strong> phase!</span>
          </div>
          <Button 
            onClick={handlePhaseAdvancement}
            className="mt-2 bg-green-600 hover:bg-green-700"
          >
            Advance to {recommendedPhase} Phase
          </Button>
        </div>
      )}
      
      {/* Main Tabs */}
      <Tabs defaultValue="journey-map" onValueChange={setActiveTab}>
        <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-transparent p-0 border-0 w-full mb-4">
          <TabsTrigger value="journey-map" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">
            Your Journey Map
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
        
        {/* Journey Map Tab */}
        <TabsContent value="journey-map" className="mt-0 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Your Financial Journey Map</CardTitle>
              <CardDescription>
                Where are you in your journey to financial freedom?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Journey Progress</span>
                  <span>{overallProgress.toFixed(0)}%</span>
                </div>
                <Progress value={overallProgress} className="h-2.5" />
              </div>
              
              {/* Phase Metrics Details */}
              <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-slate-200">
                <h4 className="text-sm font-medium mb-3">Detailed Phase Metrics</h4>
                <div className="space-y-3">
                  {journeyPhases.map((phase) => (
                    <div key={phase.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium">{phase.name} Phase</span>
                        <span>{phaseMetrics[phase.name].toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={phaseMetrics[phase.name]} 
                          className="h-2" 
                          style={{backgroundColor: phase.bgColor}}
                        />
                        <span className="text-xs">
                          {phase.threshold}% needed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Journey Map Visualization */}
              <div className="space-y-8 mt-6">
                {journeyPhases.map((phase, index) => {
                  const isCurrentPhase = phase.name === journeyData.currentPhase;
                  const isCompleted = phaseMetrics[phase.name] >= phase.threshold;
                  const isPast = index < getCurrentPhaseIndex();
                  
                  return (
                    <div 
                      key={phase.name}
                      className={`relative flex ${isCurrentPhase ? 'opacity-100' : isPast ? 'opacity-90' : 'opacity-50'}`}
                    >
                      {/* Phase icon and connecting line */}
                      <div className="flex flex-col items-center mr-4">
                        <div 
                          className={`flex items-center justify-center w-12 h-12 rounded-full mb-1 text-2xl`}
                          style={{backgroundColor: phase.bgColor}}
                        >
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
                              <span>{phaseMetrics[phase.name].toFixed(0)}%</span>
                            </div>
                            <Progress value={phaseMetrics[phase.name]} className="h-1.5" />
                          </div>
                        )}
                        
                        {/* Focus areas */}
                        {isCurrentPhase && (
                          <div className="mt-3 space-y-1">
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
                <h4 className="text-sm font-medium mb-1">Current Phase: {journeyData.currentPhase}</h4>
                <p className="text-xs text-gray-500">Complete current phase requirements to advance</p>
              </div>
              <Button 
                onClick={handlePhaseAdvancement}
                disabled={!canAdvancePhase()}
                className="bg-gradient-to-r from-blue-500 to-blue-600"
              >
                Advance to Next Phase
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Milestones Tab */}
        <TabsContent value="milestones" className="mt-0 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Your Financial Milestones</CardTitle>
              <CardDescription>
                Track progress on your major financial goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sortedMilestones.length > 0 ? (
                sortedMilestones.map((milestone) => (
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
                      
                      <div className="flex justify-between mt-2 ml-6 text-xs text-gray-500">
                        <span>Target date: {formatDate(milestone.date)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-2">🎯</div>
                  <p className="text-gray-500">No milestones found</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Add your first milestone to get started
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full space-y-4">
                <h4 className="text-sm font-medium">Add New Milestone</h4>
                
                <div className="space-y-3">
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
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="milestone-category">Category</Label>
                      <select 
                        id="milestone-category"
                        className="w-full mt-1 rounded-md border border-gray-300 px-3 py-1.5"
                        value={newMilestone.category}
                        onChange={(e) => setNewMilestone({...newMilestone, category: e.target.value as any})}
                      >
                        <option value="savings">Savings</option>
                        <option value="investment">Investment</option>
                        <option value="debt">Debt</option>
                        <option value="income">Income</option>
                        <option value="protection">Protection</option>
                        <option value="education">Education</option>
                      </select>
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
                  
                  <Button 
                    onClick={handleAddMilestone}
                    className="w-full"
                  >
                    Add Milestone
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Timeline Tab */}
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
                  Past Events
                </Badge>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  Future Goals
                </Badge>
              </div>
              
              <div className="relative pl-8 border-l-2 border-gray-200 space-y-6">
                {getTimelineEvents().map((event) => (
                  <div key={event.id} className="relative -ml-8">
                    <div 
                      className={`absolute -left-3 mt-1.5 w-6 h-6 rounded-full flex items-center justify-center bg-white border-2 ${
                        event.isPast ? 'border-blue-500' : 'border-amber-500'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${getCategoryColor(event.type)}`}></div>
                    </div>
                    <div className="ml-8 pt-0.5">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium">{event.description}</p>
                        <Badge variant="outline" className={`text-xs ${
                          event.isPast 
                            ? 'bg-blue-50 text-blue-700 border-blue-200' 
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {formatDate(event.date)}
                        </Badge>
                      </div>
                      
                      {!event.isPast && 'goalId' in event && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs hover:bg-green-50 text-green-600 px-2 py-0 h-6 mt-1"
                          onClick={() => handleCompleteGoal(event.goalId as number)}
                        >
                          <Check className="h-3 w-3 mr-1" /> Mark as Completed
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* If no events, show placeholder */}
                {getTimelineEvents().length === 0 && (
                  <div className="text-center py-8 ml-8">
                    <div className="text-5xl mb-2">📅</div>
                    <p className="text-gray-500">No timeline events found</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Complete milestones or add future goals to see your timeline
                    </p>
                  </div>
                )}
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}