import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import SalariedProfessionalGame from '@/components/games/SalariedProfessionalGame';
import EnhancedSalariedGame from '@/components/games/EnhancedSalariedGame';
import ComprehensiveStage1 from '@/components/games/ComprehensiveStage1';
import MultiPathStage1 from '@/components/games/MultiPathStage1';
import SalariedProfessionalFIREGame from '@/components/games/SalariedProfessionalFIREGame';
import FreelancerFIREGame from '@/components/games/FreelancerFIREGame';
import HousewifeFIREGame from '@/components/games/HousewifeFIREGame';
import { 
  User, 
  Briefcase, 
  PiggyBank, 
  Building2, 
  Users, 
  Calculator, 
  AlertTriangle, 
  Target, 
  Flag,
  Trophy,
  Star,
  Coins,
  TrendingUp,
  Shield,
  Zap,
  Award,
  CheckCircle,
  Lock,
  Info,
  Monitor,
  Heart,
  Leaf,
  Store,
  TrendingDown,
  BookOpen,
  Brain,
  CreditCard,
  Umbrella,
  FileText,
  Rocket,
  Plane,
  Play,
  ArrowRight,
  DollarSign,
  Wallet,
  GraduationCap,
  Lightbulb,
  MousePointer,
  Laptop
} from 'lucide-react';

interface Avatar {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  scenarios: string[];
}

interface GameStage {
  id: number;
  title: string;
  icon: any;
  description: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  xpReward: number;
  coinReward: number;
  challenge: string;
  simulation?: string;
  theme: string;
}

interface GameState {
  currentStage: number;
  totalXP: number;
  netWorth: number;
  coins: number;
  level: number;
  completedStages: number[];
  selectedAvatar: string | null;
  selectedScenario: string | null;
  stressLevel: number;
  freedomPoints: number;
}

export default function FinancialFreedomGame() {
  const [gameState, setGameState] = useState<GameState>({
    currentStage: 1,
    totalXP: 0,
    netWorth: 0,
    coins: 100,
    level: 1,
    completedStages: [],
    selectedAvatar: null,
    selectedScenario: null,
    stressLevel: 0,
    freedomPoints: 0
  });

  const [selectedStage, setSelectedStage] = useState<number>(1);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [showAvatarSelection, setShowAvatarSelection] = useState<boolean>(false);
  const [showSalariedProfessionalGame, setShowSalariedProfessionalGame] = useState<boolean>(false);
  const [showComprehensiveStage1, setShowComprehensiveStage1] = useState<boolean>(false);
  const [showSalariedFIREGame, setShowSalariedFIREGame] = useState<boolean>(false);
  const [showFreelancerFIREGame, setShowFreelancerFIREGame] = useState<boolean>(false);
  const [showHousewifeFIREGame, setShowHousewifeFIREGame] = useState<boolean>(false);
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);

  // Complete Avatar definitions - All 10 categories from your framework
  const avatars: Avatar[] = [
    {
      id: 'student',
      name: 'Student',
      description: 'College student learning money management',
      icon: User,
      color: 'from-blue-400 to-blue-600',
      scenarios: [
        'Gets pocket money from parents',
        'Has taken an education loan',
        'Wants to start side hustle',
        'Gets scholarship & invests',
        'Credit card trap'
      ]
    },
    {
      id: 'professional',
      name: 'Salaried Professional',
      description: 'Working professional building wealth',
      icon: Briefcase,
      color: 'from-green-400 to-green-600',
      scenarios: [
        'Gets 1st job, spends entire salary',
        'No savings, EMI for mobile',
        'Realizes need for PF, PPF',
        'Friend talks about mutual funds',
        'Health scare — no insurance'
      ]
    },
    {
      id: 'freelancer',
      name: 'Freelancer',
      description: 'Independent worker with irregular income',
      icon: Monitor,
      color: 'from-purple-400 to-purple-600',
      scenarios: [
        'Income is irregular',
        'Struggles with rent + bills',
        'Gets paid via UPI',
        'No medical insurance',
        'Learns about tax planning'
      ]
    },
    {
      id: 'housewife',
      name: 'Housewife',
      description: 'Managing family finances and building wealth',
      icon: Heart,
      color: 'from-pink-400 to-pink-600',
      scenarios: [
        'Handles family budget',
        'Joins kitty party savings group',
        'Learns about inflation',
        'Opens savings account',
        'Family resists investing in non-gold'
      ]
    },
    {
      id: 'farmer',
      name: 'Farmer',
      description: 'Agricultural worker with seasonal income',
      icon: Leaf,
      color: 'from-emerald-400 to-emerald-600',
      scenarios: [
        'Gets seasonal income',
        'Keeps money in cash',
        'Faces bad crop year',
        'No insurance, learns its need',
        'Borrows from money lender'
      ]
    },
    {
      id: 'business',
      name: 'Small Business Owner',
      description: 'Entrepreneur managing business finances',
      icon: Store,
      color: 'from-orange-400 to-orange-600',
      scenarios: [
        'Starts small business',
        'Mixes personal & business money',
        'Takes business loan',
        'Faces cash flow issues',
        'Learns GST compliance'
      ]
    },
    {
      id: 'jobseeker',
      name: 'Job Seeker',
      description: 'Looking for employment and managing finances',
      icon: Target,
      color: 'from-indigo-400 to-indigo-600',
      scenarios: [
        'Unemployed with limited savings',
        'Preparing for interviews',
        'Living on family support',
        'Considering skill development',
        'Exploring gig work options'
      ]
    },
    {
      id: 'retired',
      name: 'Retired Individual',
      description: 'Managing retirement funds and healthcare',
      icon: Shield,
      color: 'from-gray-400 to-gray-600',
      scenarios: [
        'Fixed pension income',
        'Managing medical expenses',
        'Depends on children for support',
        'Has provident fund corpus',
        'Considering reverse mortgage'
      ]
    },
    {
      id: 'nri',
      name: 'NRI Returning to India',
      description: 'Managing cross-border finances',
      icon: Plane,
      color: 'from-teal-400 to-teal-600',
      scenarios: [
        'Has foreign savings to transfer',
        'Unfamiliar with Indian tax rules',
        'Wants to buy property in India',
        'Managing currency exchange',
        'Planning children\'s education'
      ]
    },
    {
      id: 'bluecollar',
      name: 'Blue-Collar Worker',
      description: 'Daily wage earner or service worker',
      icon: Users,
      color: 'from-amber-400 to-amber-600',
      scenarios: [
        'Daily wage income',
        'Cash-based transactions',
        'No formal banking',
        'Family dependent on single income',
        'Limited financial literacy'
      ]
    }
  ];

  // Complete 15-Stage Universal Framework
  const gameStages: GameStage[] = [
    {
      id: 1,
      title: "Initial Awareness",
      icon: User,
      description: "Clueless or just beginning with money awareness",
      isUnlocked: true,
      isCompleted: gameState.completedStages.includes(1),
      xpReward: 50,
      coinReward: 25,
      challenge: "Set up your financial profile and choose your avatar",
      simulation: "Profile Setup Wizard",
      theme: "Financial Awakening"
    },
    {
      id: 2,
      title: "Income Understanding",
      icon: Briefcase,
      description: "Learn how money is earned (job, gig, business, family)",
      isUnlocked: gameState.completedStages.includes(1),
      isCompleted: gameState.completedStages.includes(2),
      xpReward: 75,
      coinReward: 50,
      challenge: "Build your first income stream and understand money flow",
      simulation: "Income Generation Simulator",
      theme: "Earning Money"
    },
    {
      id: 3,
      title: "Tracking & Budgeting",
      icon: Calculator,
      description: "Learn to track expenses and budget basics",
      isUnlocked: gameState.completedStages.includes(2),
      isCompleted: gameState.completedStages.includes(3),
      xpReward: 100,
      coinReward: 75,
      challenge: "Master expense tracking and create your first budget",
      simulation: "Budget Management Tool",
      theme: "Money Management"
    },
    {
      id: 4,
      title: "Financial Literacy",
      icon: BookOpen,
      description: "Understand interest, debt, credit score, basics of investing",
      isUnlocked: gameState.completedStages.includes(3),
      isCompleted: gameState.completedStages.includes(4),
      xpReward: 125,
      coinReward: 100,
      challenge: "Learn financial fundamentals and key concepts",
      simulation: "Financial Education Hub",
      theme: "Learning Fundamentals"
    },
    {
      id: 5,
      title: "Overcoming Temptation",
      icon: AlertTriangle,
      description: "Face lifestyle creep, emotional spending, peer pressure",
      isUnlocked: gameState.completedStages.includes(4),
      isCompleted: gameState.completedStages.includes(5),
      xpReward: 150,
      coinReward: 125,
      challenge: "Resist financial temptations and build discipline",
      simulation: "Temptation Resistance Game",
      theme: "Self Control"
    },
    {
      id: 6,
      title: "First Financial Setback",
      icon: TrendingDown,
      description: "Face debt, unexpected expense, wrong decision",
      isUnlocked: gameState.completedStages.includes(5),
      isCompleted: gameState.completedStages.includes(6),
      xpReward: 175,
      coinReward: 150,
      challenge: "Navigate your first major financial challenge",
      simulation: "Crisis Management Simulator",
      theme: "Learning from Mistakes"
    },
    {
      id: 7,
      title: "Emergency Fund Realization",
      icon: Shield,
      description: "Build or regret not having emergency funds",
      isUnlocked: gameState.completedStages.includes(6),
      isCompleted: gameState.completedStages.includes(7),
      xpReward: 200,
      coinReward: 175,
      challenge: "Build a robust emergency fund for security",
      simulation: "Emergency Fund Calculator",
      theme: "Financial Security"
    },
    {
      id: 8,
      title: "Loan Trap or Planning",
      icon: CreditCard,
      description: "Enter or avoid loans (education, personal, car, housing)",
      isUnlocked: gameState.completedStages.includes(7),
      isCompleted: gameState.completedStages.includes(8),
      xpReward: 225,
      coinReward: 200,
      challenge: "Make smart borrowing decisions",
      simulation: "Loan Planning Tool",
      theme: "Smart Borrowing"
    },
    {
      id: 9,
      title: "Wealth Accumulation Begins",
      icon: TrendingUp,
      description: "Start investing: SIPs, RD/FD, mutual funds, etc.",
      isUnlocked: gameState.completedStages.includes(8),
      isCompleted: gameState.completedStages.includes(9),
      xpReward: 250,
      coinReward: 225,
      challenge: "Begin systematic wealth building through investments",
      simulation: "Investment Portfolio Builder",
      theme: "Wealth Building"
    },
    {
      id: 10,
      title: "Insurance & Risk Protection",
      icon: Umbrella,
      description: "Understand and buy health, life insurance, etc.",
      isUnlocked: gameState.completedStages.includes(9),
      isCompleted: gameState.completedStages.includes(10),
      xpReward: 275,
      coinReward: 250,
      challenge: "Protect yourself and family with proper insurance",
      simulation: "Insurance Planning Tool",
      theme: "Risk Management"
    },
    {
      id: 11,
      title: "Tax & Compliance Awareness",
      icon: FileText,
      description: "Learn about tax saving, PF, digital filing, etc.",
      isUnlocked: gameState.completedStages.includes(10),
      isCompleted: gameState.completedStages.includes(11),
      xpReward: 300,
      coinReward: 275,
      challenge: "Optimize taxes and ensure compliance",
      simulation: "Tax Planning Calculator",
      theme: "Tax Optimization"
    },
    {
      id: 12,
      title: "Secondary Income / Side Hustle",
      icon: Zap,
      description: "Start passive/secondary income (freelance, rent, online store)",
      isUnlocked: gameState.completedStages.includes(11),
      isCompleted: gameState.completedStages.includes(12),
      xpReward: 325,
      coinReward: 300,
      challenge: "Develop multiple income streams",
      simulation: "Side Hustle Planner",
      theme: "Income Diversification"
    },
    {
      id: 13,
      title: "Goal-Based Investing",
      icon: Target,
      description: "Plan for child's education, retirement, dream home",
      isUnlocked: gameState.completedStages.includes(12),
      isCompleted: gameState.completedStages.includes(13),
      xpReward: 350,
      coinReward: 325,
      challenge: "Align investments with specific life goals",
      simulation: "Goal Planning Calculator",
      theme: "Goal Achievement"
    },
    {
      id: 14,
      title: "Mindset & Lifestyle Shift",
      icon: Brain,
      description: "Minimalism, long-term thinking, delay gratification",
      isUnlocked: gameState.completedStages.includes(13),
      isCompleted: gameState.completedStages.includes(14),
      xpReward: 400,
      coinReward: 350,
      challenge: "Develop wealthy mindset and sustainable habits",
      simulation: "Mindset Assessment Tool",
      theme: "Mental Transformation"
    },
    {
      id: 15,
      title: "Financial Freedom Achieved",
      icon: Trophy,
      description: "Assets > Expenses. Freedom to work by choice",
      isUnlocked: gameState.completedStages.includes(14),
      isCompleted: gameState.completedStages.includes(15),
      xpReward: 500,
      coinReward: 500,
      challenge: "Achieve complete financial independence",
      simulation: "FIRE Achievement Dashboard",
      theme: "Ultimate Freedom"
    }
  ];

  const completeStage = (stageId: number) => {
    if (!gameState.completedStages.includes(stageId)) {
      const stage = gameStages.find(s => s.id === stageId);
      if (stage) {
        setGameState(prev => ({
          ...prev,
          completedStages: [...prev.completedStages, stageId],
          totalXP: prev.totalXP + stage.xpReward,
          coins: prev.coins + stage.coinReward,
          level: Math.floor((prev.totalXP + stage.xpReward) / 500) + 1,
          netWorth: prev.netWorth + (stage.coinReward * 100),
          freedomPoints: prev.freedomPoints + 10
        }));
      }
    }
  };

  const handleGameComplete = (score: number) => {
    setGameState(prev => ({
      ...prev,
      totalXP: prev.totalXP + score,
      coins: prev.coins + Math.floor(score / 2),
      completedStages: [1, 2, 3, 4, 5] // Mark stages as completed
    }));
    setShowSalariedProfessionalGame(false);
  };

  const selectAvatar = (avatarId: string, scenario: string) => {
    console.log('Selecting avatar:', avatarId, scenario);
    setGameState(prev => ({
      ...prev,
      selectedAvatar: avatarId,
      selectedScenario: scenario
    }));
    
    // Route to specific games based on avatar
    if (avatarId === 'professional') {
      setShowSalariedFIREGame(true);
      setShowAvatarSelection(false);
    } else if (avatarId === 'freelancer') {
      setShowFreelancerFIREGame(true);
      setShowAvatarSelection(false);
    } else if (avatarId === 'housewife') {
      setShowHousewifeFIREGame(true);
      setShowAvatarSelection(false);
    } else if (avatarId === 'student') {
      setShowComprehensiveStage1(true);
      setShowAvatarSelection(false);
    } else {
      // Other avatars - start basic game for now
      setShowAvatarSelection(false);
      setGameStarted(true);
    }
    console.log('Avatar selected, game started:', { avatarId, scenario, gameStarted: true });
  };

  const getProgressPercentage = () => {
    return (gameState.completedStages.length / gameStages.length) * 100;
  };

  const currentStageData = gameStages.find(stage => stage.id === selectedStage);

  // Show Multi-Path Stage 1 if selected
  if (showComprehensiveStage1) {
    return (
      <MultiPathStage1 
        onComplete={(results) => {
          console.log('Stage 1 completed with results:', results);
          setGameState(prev => ({
            ...prev,
            totalXP: prev.totalXP + results.totalScore,
            coins: prev.coins + Math.floor(results.averageScore / 2),
            completedStages: [...prev.completedStages, 1],
            freedomPoints: prev.freedomPoints + 30,
            netWorth: prev.netWorth + results.totalScore * 100
          }));
          setShowComprehensiveStage1(false);
        }}
        onBackToDashboard={() => setShowComprehensiveStage1(false)}
      />
    );
  }

  // Show Comprehensive Salaried Professional FIRE Game if selected
  if (showSalariedFIREGame) {
    return (
      <SalariedProfessionalFIREGame 
        onComplete={(results) => {
          console.log('FIRE Game completed with results:', results);
          setGameState(prev => ({
            ...prev,
            totalXP: prev.totalXP + results.totalScore,
            coins: prev.coins + Math.floor(results.netWorth / 10000),
            completedStages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            freedomPoints: prev.freedomPoints + (results.fireAchieved ? 100 : 50),
            netWorth: results.netWorth
          }));
          setShowSalariedFIREGame(false);
        }}
        onBackToDashboard={() => setShowSalariedFIREGame(false)}
      />
    );
  }

  // Show Freelancer FIRE Game if selected
  if (showFreelancerFIREGame) {
    return (
      <FreelancerFIREGame 
        onComplete={(results) => {
          console.log('Freelancer FIRE Game completed with results:', results);
          setGameState(prev => ({
            ...prev,
            totalXP: prev.totalXP + results.totalScore,
            coins: prev.coins + Math.floor(results.netWorth / 10000),
            completedStages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            freedomPoints: prev.freedomPoints + (results.fireAchieved ? 100 : 50),
            netWorth: results.netWorth
          }));
          setShowFreelancerFIREGame(false);
        }}
        onBackToDashboard={() => setShowFreelancerFIREGame(false)}
      />
    );
  }

  // Show Housewife FIRE Game if selected
  if (showHousewifeFIREGame) {
    return (
      <HousewifeFIREGame 
        onComplete={(results) => {
          console.log('Housewife FIRE Game completed with results:', results);
          setGameState(prev => ({
            ...prev,
            totalXP: prev.totalXP + results.totalScore,
            coins: prev.coins + Math.floor(results.netWorth / 10000),
            completedStages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            freedomPoints: prev.freedomPoints + (results.fireAchieved ? 100 : 50),
            netWorth: results.netWorth
          }));
          setShowHousewifeFIREGame(false);
        }}
        onBackToDashboard={() => setShowHousewifeFIREGame(false)}
      />
    );
  }



  // Show Salaried Professional Game if selected
  if (showSalariedProfessionalGame) {
    return (
      <SalariedProfessionalGame 
        onComplete={handleGameComplete}
        onBack={() => setShowSalariedProfessionalGame(false)}
      />
    );
  }

  // How to Play Modal
  if (showHowToPlay) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-2xl mx-auto py-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-1">How to Play</h1>
              <p className="text-gray-600 text-sm">Master your financial journey to achieve FIRE (Financial Independence, Retire Early)</p>
            </div>

            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="text-3xl">🎯</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">Choose Your Path</h3>
                  <p className="text-gray-700 text-xs">Select from 3 unique avatars - Professional, Freelancer, or Housewife. Each has distinct financial challenges and opportunities spanning 25+ years.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-3xl">📊</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">Navigate 15 Life Stages</h3>
                  <p className="text-gray-700 text-xs">Progress through realistic scenarios from first salary to retirement planning. Face real financial decisions like emergency crises, investment choices, and career transitions.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-3xl">💡</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">Learn from Consequences</h3>
                  <p className="text-gray-700 text-xs">Every choice has realistic outcomes. Poor decisions lead to debt stress, while smart planning builds wealth. Experience the true cost of financial mistakes safely.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-3xl">🏆</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">Achieve FIRE or Learn Why Not</h3>
                  <p className="text-gray-700 text-xs">Reach financial independence through consistent smart decisions, or discover exactly what went wrong with detailed analysis and improvement guidance.</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-3 justify-center">
              <Button 
                onClick={() => {
                  setShowHowToPlay(false);
                  setShowAvatarSelection(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              >
                Start Your Journey
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowHowToPlay(false)}
                className="px-6 py-2"
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Welcome Screen
  if (!gameStarted && !showAvatarSelection) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Helmet>
          <title>Financial Freedom Game - RupeeSmart</title>
        </Helmet>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>

            <h1 className="text-xl font-bold text-gray-900 mb-2">
              Master Your FIRE Journey!
            </h1>

            <p className="text-gray-500 mb-4 text-sm">
              Experience realistic financial stages from first income to financial independence. Make decisions that shape your financial destiny.
            </p>

            {/* Features */}
            <div className="space-y-2 mb-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-blue-600 rounded flex items-center justify-center flex-shrink-0 shadow-sm">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">Choose Your Avatar</div>
                  <div className="text-gray-500 text-sm">Professional, Freelancer, or Housewife - each with unique challenges.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-emerald-600 rounded flex items-center justify-center flex-shrink-0 shadow-sm">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">Realistic FIRE Scenarios</div>
                  <div className="text-gray-500 text-sm">Experience actual financial decisions with real consequences and learning.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 bg-gradient-to-br from-yellow-500 to-orange-600 rounded flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">Achieve Financial Freedom</div>
                  <div className="text-gray-500 text-sm">Build wealth through smart decisions and reach true financial independence.</div>
                </div>
              </div>
            </div>

            {/* Start Game Button */}
            <Button 
              onClick={() => setShowAvatarSelection(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4"
            >
              Start Game
            </Button>

            {/* How to Play */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowHowToPlay(true)}
            >
              How to Play
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Avatar Selection Screen - Enhanced Compact Design
  if (showAvatarSelection && !gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Helmet>
          <title>Choose Your Avatar - Financial Freedom Game</title>
        </Helmet>

        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="text-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Choose Your Financial Journey</h1>
            <p className="text-gray-600 text-sm">Select the avatar that best represents your current situation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {avatars.map((avatar) => {
              const IconComponent = avatar.icon;
              return (
                <button
                  key={avatar.id}
                  onClick={() => selectAvatar(avatar.id, avatar.scenarios[0])}
                  className="group relative bg-white rounded-lg p-2 border-2 border-gray-200 hover:border-transparent hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 aspect-square flex flex-col justify-center items-center cursor-pointer"
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${avatar.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                  
                  {/* Icon with gradient background */}
                  <div className={`relative w-14 h-14 bg-gradient-to-br ${avatar.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative text-center flex-1 flex flex-col justify-center">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm group-hover:text-gray-800">{avatar.name}</h3>
                    <p className="text-gray-600 text-xs mb-3 leading-relaxed">{avatar.description}</p>
                    
                    {/* Compact scenarios */}
                    <div className="space-y-1">
                      {avatar.scenarios.slice(0, 2).map((scenario, index) => (
                        <div key={index} className="text-xs text-gray-500">
                          • {scenario}
                        </div>
                      ))}
                      {avatar.scenarios.length > 2 && (
                        <div className="text-xs text-gray-400">
                          +{avatar.scenarios.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => setShowAvatarSelection(false)}
              variant="outline"
              className="px-8 py-3"
            >
              ← Back to Welcome
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Main Game Interface - Completely New Layout
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Financial Freedom Game - RupeeSmart</title>
      </Helmet>

      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Financial Freedom Quest</h1>
                <p className="text-sm text-gray-500">Your Journey to Financial Independence</p>
              </div>
            </div>
            
            {/* Stats Dashboard */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{gameState.level}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">₹{Math.floor(gameState.netWorth / 1000)}K</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Net Worth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">₹{gameState.coins}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Coins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{gameState.freedomPoints}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Freedom</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Compact Progress Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-medium text-gray-900">Journey Progress</h2>
            <span className="text-xs text-gray-500">{gameState.completedStages.length} of {gameStages.length} stages completed</span>
          </div>
          
          {/* Compact Progress Track */}
          <div className="relative">
            <div className="bg-gray-200 rounded-full h-3 relative overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-3 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.max(6, getProgressPercentage())}%` }}
              />
            </div>
            
            {/* Compact Avatar Icon */}
            <div 
              className="absolute -top-2 transform -translate-x-1/2 transition-all duration-700 ease-out"
              style={{ left: `${Math.max(3, Math.min(97, getProgressPercentage()))}%` }}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 border-white ${
                gameState.selectedAvatar && avatars.find(a => a.id === gameState.selectedAvatar) 
                  ? avatars.find(a => a.id === gameState.selectedAvatar)!.color 
                  : 'bg-blue-500'
              }`}>
                {gameState.selectedAvatar && avatars.find(a => a.id === gameState.selectedAvatar)?.icon ? (
                  React.createElement(avatars.find(a => a.id === gameState.selectedAvatar)!.icon, { 
                    className: "w-3 h-3 text-white" 
                  })
                ) : (
                  <User className="w-3 h-3 text-white" />
                )}
              </div>
            </div>
            
            {/* Compact Stage Labels */}
            <div className="flex justify-between mt-4 text-xs text-gray-400">
              <span>Stage 1</span>
              <span>Stage 6</span>
              <span>Stage 12</span>
              <span>Stage 15</span>
            </div>
          </div>
          
          {/* Compact Status */}
          <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
            <span>Financial Awareness</span>
            <span className="font-medium text-gray-700">
              {gameState.completedStages.length === 0 && "🌱 Starting Your Journey"}
              {gameState.completedStages.length > 0 && gameState.completedStages.length <= 3 && "📚 Building Knowledge"}
              {gameState.completedStages.length > 3 && gameState.completedStages.length <= 6 && "💼 Managing Money"}
              {gameState.completedStages.length > 6 && gameState.completedStages.length <= 9 && "📈 Growing Wealth"}
              {gameState.completedStages.length > 9 && gameState.completedStages.length <= 12 && "🎯 Advanced Planning"}
              {gameState.completedStages.length > 12 && gameState.completedStages.length < 15 && "🚀 Almost Free"}
              {gameState.completedStages.length === 15 && "🎉 Freedom Achieved!"}
            </span>
            <span>Financial Freedom</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Stage Selection - Card Grid Layout */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Choose Your Stage</h3>
              
              <div className="grid grid-cols-3 gap-4">
                {gameStages.map((stage, index) => {
                  const IconComponent = stage.icon;
                  const stageImages = {
                    1: { icon: GraduationCap, bg: 'from-blue-500 to-blue-600', desc: 'Clueless or just beginning with money...' },
                    2: { icon: Wallet, bg: 'from-green-500 to-green-600', desc: 'Learn how money is earned (job, gig...)' },
                    3: { icon: Calculator, bg: 'from-purple-500 to-purple-600', desc: 'Learn to track expenses and budget basics' },
                    4: { icon: BookOpen, bg: 'from-orange-500 to-orange-600', desc: 'Understand interest, debt, credit score...' },
                    5: { icon: AlertTriangle, bg: 'from-red-500 to-red-600', desc: 'Face lifestyle creep, emotional spending...' },
                    6: { icon: TrendingDown, bg: 'from-pink-500 to-pink-600', desc: 'Face debt, unexpected expense, wrong decision' },
                    7: { icon: Shield, bg: 'from-teal-500 to-teal-600', desc: 'Build or regret not having emergency funds' },
                    8: { icon: CreditCard, bg: 'from-indigo-500 to-indigo-600', desc: 'Enter or avoid loans (education, personal...)' },
                    9: { icon: TrendingUp, bg: 'from-cyan-500 to-cyan-600', desc: 'Start investing: SIPs, RD/FD, mutual funds...' },
                    10: { icon: Umbrella, bg: 'from-emerald-500 to-emerald-600', desc: 'Understand and buy health, life insurance...' },
                    11: { icon: FileText, bg: 'from-amber-500 to-amber-600', desc: 'Learn about tax saving, PF, digital filing...' },
                    12: { icon: Zap, bg: 'from-violet-500 to-violet-600', desc: 'Start passive/secondary income (freelance...)' },
                    13: { icon: Target, bg: 'from-lime-500 to-lime-600', desc: 'Plan for child\'s education, retirement...' },
                    14: { icon: Brain, bg: 'from-rose-500 to-rose-600', desc: 'Minimalism, long-term thinking, delay gratification' },
                    15: { icon: Trophy, bg: 'from-yellow-500 to-yellow-600', desc: 'Assets > Expenses. Freedom to work by choice' }
                  };
                  
                  const stageImage = stageImages[stage.id as keyof typeof stageImages];
                  
                  return (
                    <button
                      key={stage.id}
                      onClick={() => setSelectedStage(stage.id)}
                      disabled={!stage.isUnlocked}
                      className={`relative aspect-square rounded-2xl border transition-all duration-300 group cursor-pointer disabled:cursor-not-allowed bg-white hover:shadow-md ${
                        selectedStage === stage.id 
                          ? 'border-yellow-400 shadow-lg ring-2 ring-yellow-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      } ${!stage.isUnlocked ? 'opacity-50' : ''}`}
                    >
                      {/* Status Badge */}
                      {stage.isCompleted && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10 shadow-lg">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      {!stage.isUnlocked && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center z-10 shadow-lg">
                          <Lock className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center">
                        {/* Clean colorful icon */}
                        <div className="flex-shrink-0 mb-3">
                          <div className={`w-12 h-12 mx-auto bg-gradient-to-br ${stageImage.bg} rounded-xl flex items-center justify-center shadow-sm`}>
                            <stageImage.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        
                        {/* Clean title */}
                        <h4 className="font-medium text-sm text-gray-900 leading-tight">{stage.title}</h4>
                        
                        {/* Subtle theme label */}
                        <p className="text-xs text-gray-500 mt-1">{stage.theme}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stage Details */}
          <div className="lg:col-span-4">
            {/* Selected Avatar Display */}
            {gameState.selectedAvatar && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${avatars.find(a => a.id === gameState.selectedAvatar)?.color || 'from-blue-500 to-blue-600'} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    {React.createElement(avatars.find(a => a.id === gameState.selectedAvatar)?.icon || User, { 
                      className: "w-8 h-8 text-white" 
                    })}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    {avatars.find(a => a.id === gameState.selectedAvatar)?.name || 'Player'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {avatars.find(a => a.id === gameState.selectedAvatar)?.description || 'Your financial journey'}
                  </p>
                </div>
              </div>
            )}

            {currentStageData && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="text-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <currentStageData.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{currentStageData.title}</h3>
                  <p className="text-xs text-gray-600">{currentStageData.theme}</p>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 mb-1 text-sm">Challenge</h4>
                    <p className="text-xs text-gray-600">{currentStageData.challenge}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-blue-50 rounded-lg p-2 text-center">
                      <div className="text-base font-bold text-blue-600">+{currentStageData.xpReward}</div>
                      <div className="text-xs text-blue-500">XP Reward</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-2 text-center">
                      <div className="text-base font-bold text-yellow-600">+₹{currentStageData.coinReward}</div>
                      <div className="text-xs text-yellow-500">Coins</div>
                    </div>
                  </div>

                  {currentStageData.simulation && (
                    <div className="bg-green-50 rounded-lg p-3">
                      <h4 className="font-medium text-green-900 mb-1 text-sm">Interactive Tool</h4>
                      <p className="text-xs text-green-700 mb-2">{currentStageData.simulation}</p>
                    </div>
                  )}

                  <div className="mt-6">
                    {gameState.selectedAvatar === 'professional' ? (
                      <button
                        onClick={() => setShowComprehensiveStage1(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
                      >
                        <Play className="w-5 h-5" />
                        Start
                      </button>
                    ) : currentStageData.isCompleted ? (
                      <div className="bg-green-100 text-green-800 rounded-xl p-4 text-center">
                        <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                        <div className="font-semibold">Stage Completed!</div>
                      </div>
                    ) : currentStageData.isUnlocked ? (
                      <button
                        onClick={() => completeStage(currentStageData.id)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
                      >
                        <Play className="w-5 h-5" />
                        Start
                      </button>
                    ) : (
                      <div className="bg-gray-100 text-gray-500 rounded-xl p-4 text-center">
                        <Lock className="w-8 h-8 mx-auto mb-2" />
                        <div className="text-sm">Complete previous stages to unlock</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}