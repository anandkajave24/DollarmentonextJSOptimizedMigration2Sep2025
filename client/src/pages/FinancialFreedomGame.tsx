import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { SEO } from '../components/SEO';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SalariedProfessionalGame from '@/components/games/SalariedProfessionalGame';
import EnhancedSalariedGame from '@/components/games/EnhancedSalariedGame';
import ComprehensiveStage1 from '@/components/games/ComprehensiveStage1';
import MultiPathStage1 from '@/components/games/MultiPathStage1';
import SalariedProfessionalFIREGame from '@/components/games/SalariedProfessionalFIREGame';
import FreelancerFIREGame from '@/components/games/FreelancerFIREGame';
import HousewifeFIREGame from '@/components/games/HousewifeFIREGame';
import WorkingParentFIREGame from '@/components/games/WorkingParentFIREGame';
import HomeBuyerFIREGame from '@/components/games/HomeBuyerFIREGame';
import SmallBusinessFIREGame from '@/components/games/SmallBusinessFIREGame';
import MidCareerFIREGame from '@/components/games/MidCareerFIREGame';
import PreRetireeFIREGame from '@/components/games/PreRetireeFIREGame';
import RetireeFIREGame from '@/components/games/RetireeFIREGame';
import NewAmericanFIREGame from '@/components/games/NewAmericanFIREGame';
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
  Laptop,
  Home,
  Edit3,
  Check,
  X,
  Clock,
  Globe
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
  const [showWorkingParentFIREGame, setShowWorkingParentFIREGame] = useState<boolean>(false);
  const [showHomeBuyerFIREGame, setShowHomeBuyerFIREGame] = useState<boolean>(false);
  const [showSmallBusinessFIREGame, setShowSmallBusinessFIREGame] = useState<boolean>(false);
  const [showMidCareerFIREGame, setShowMidCareerFIREGame] = useState<boolean>(false);
  const [showPreRetireeFIREGame, setShowPreRetireeFIREGame] = useState<boolean>(false);
  const [showRetireeFIREGame, setShowRetireeFIREGame] = useState<boolean>(false);
  const [showNewAmericanFIREGame, setShowNewAmericanFIREGame] = useState<boolean>(false);
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);
  const [showCollegeStudentGame, setShowCollegeStudentGame] = useState<boolean>(false);

  // Complete Avatar definitions - USA-specific financial situations
  const avatars: Avatar[] = [
    {
      id: 'student',
      name: 'College Student',
      description: 'Student learning money management and building credit',
      icon: GraduationCap,
      color: 'from-blue-400 to-blue-600',
      scenarios: [
        'Living on student loans and part-time job',
        'Building first credit history with student card',
        'Learning about compound interest',
        'Considering summer internship savings',
        'Planning post-graduation budget'
      ]
    },
    {
      id: 'professional',
      name: 'Young Professional',
      description: 'Early career worker building wealth with 401k',
      icon: Briefcase,
      color: 'from-green-400 to-green-600',
      scenarios: [
        'First job with 401k matching opportunity',
        'Paying off student loans aggressively',
        'Building emergency fund in high-yield savings',
        'Learning about Roth IRA benefits',
        'Considering first apartment vs roommates'
      ]
    },
    {
      id: 'freelancer',
      name: 'Freelancer/Gig Worker',
      description: 'Independent contractor managing irregular income',
      icon: Monitor,
      color: 'from-purple-400 to-purple-600',
      scenarios: [
        'Setting aside taxes from each payment',
        'No employer health insurance coverage',
        'Opening SEP-IRA for retirement savings',
        'Using budgeting apps for irregular income',
        'Building larger emergency fund for stability'
      ]
    },
    {
      id: 'parent',
      name: 'Working Parent',
      description: 'Managing family finances and future planning',
      icon: Heart,
      color: 'from-pink-400 to-pink-600',
      scenarios: [
        'Balancing childcare costs with savings',
        'Starting 529 college savings plans',
        'Increasing life insurance coverage',
        'Managing family health insurance premiums',
        'Teaching kids about money and allowances'
      ]
    },
    {
      id: 'homebuyer',
      name: 'First-Time Home Buyer',
      description: 'Saving for down payment and homeownership',
      icon: Home,
      color: 'from-emerald-400 to-emerald-600',
      scenarios: [
        'Saving 20% down payment in high-yield account',
        'Improving credit score for better mortgage rates',
        'Learning about PMI and closing costs',
        'Researching first-time buyer programs',
        'Budgeting for home maintenance expenses'
      ]
    },
    {
      id: 'business',
      name: 'Small Business Owner',
      description: 'Entrepreneur managing business and personal finances',
      icon: Store,
      color: 'from-orange-400 to-orange-600',
      scenarios: [
        'Separating business and personal accounts',
        'Understanding quarterly tax payments',
        'Setting up Solo 401k for retirement',
        'Managing business credit vs personal credit',
        'Planning for seasonal cash flow variations'
      ]
    },
    {
      id: 'midcareer',
      name: 'Mid-Career Professional',
      description: 'Peak earning years focused on wealth building',
      icon: TrendingUp,
      color: 'from-indigo-400 to-indigo-600',
      scenarios: [
        'Maximizing 401k contributions to IRS limits',
        'Considering backdoor Roth IRA strategies',
        'Balancing taxable vs tax-advantaged investing',
        'Planning for children\'s college expenses',
        'Evaluating term vs whole life insurance'
      ]
    },
    {
      id: 'preretired',
      name: 'Pre-Retiree',
      description: 'Approaching retirement with catch-up contributions',
      icon: Clock,
      color: 'from-purple-400 to-purple-600',
      scenarios: [
        'Making catch-up contributions to 401k and IRA',
        'Planning Social Security claiming strategy',
        'Converting traditional IRA to Roth gradually',
        'Considering long-term care insurance',
        'Creating retirement withdrawal strategy'
      ]
    },
    {
      id: 'retiree',
      name: 'Retiree',
      description: 'Managing retirement income and healthcare costs',
      icon: Home,
      color: 'from-blue-400 to-blue-600',
      scenarios: [
        'Withdrawing from 401k and IRA accounts',
        'Managing Medicare and supplement insurance',
        'Following 4% withdrawal rule for sustainability',
        'Considering part-time work for extra income',
        'Planning estate and inheritance strategies'
      ]
    },
    {
      id: 'immigrant',
      name: 'New American',
      description: 'Recent immigrant building US financial foundation',
      icon: Globe,
      color: 'from-green-400 to-green-600',
      scenarios: [
        'Building US credit history from scratch',
        'Learning about 401k and IRA systems',
        'Understanding US tax obligations',
        'Sending money to family overseas',
        'Navigating health insurance marketplace'
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
      description: "Start investing: investments, RD/FD, index funds, etc.",
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

  // Reset all game data to initial state
  const resetGameData = () => {
    setGameState({
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
    
    // Reset all game display states
    setShowSalariedProfessionalGame(false);
    setShowComprehensiveStage1(false);
    setShowSalariedFIREGame(false);
    setShowFreelancerFIREGame(false);
    setShowHousewifeFIREGame(false);
    setShowWorkingParentFIREGame(false);
    setShowHomeBuyerFIREGame(false);
    setShowSmallBusinessFIREGame(false);
    setShowMidCareerFIREGame(false);
    setShowPreRetireeFIREGame(false);
    setShowRetireeFIREGame(false);
    setShowNewAmericanFIREGame(false);
    setShowCollegeStudentGame(false);
    setGameStarted(false);
    setSelectedStage(1);
  };

  const selectAvatar = (avatarId: string, scenario: string) => {
    console.log('Selecting avatar:', avatarId, scenario);
    
    // Reset all game data first
    resetGameData();
    
    // Set new avatar data
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
    } else if (avatarId === 'parent') {
      setShowWorkingParentFIREGame(true);
      setShowAvatarSelection(false);
    } else if (avatarId === 'homebuyer') {
      setShowHomeBuyerFIREGame(true);
      setShowAvatarSelection(false);
    } else if (avatarId === 'business') {
      setShowSmallBusinessFIREGame(true);
      setShowAvatarSelection(false);
    } else if (avatarId === 'midcareer') {
      setShowMidCareerFIREGame(true);
      setShowAvatarSelection(false);
    } else if (avatarId === 'preretired') {
      setShowPreRetireeFIREGame(true);
      setShowAvatarSelection(false);
    } else if (avatarId === 'retiree') {
      setShowRetireeFIREGame(true);
      setShowAvatarSelection(false);
    } else if (avatarId === 'immigrant') {
      setShowNewAmericanFIREGame(true);
      setShowAvatarSelection(false);
    } else if (avatarId === 'student') {
      setShowCollegeStudentGame(true);
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

  // Show Working Parent FIRE Game if selected
  if (showWorkingParentFIREGame) {
    return <WorkingParentFIREGame onBack={() => {
      setShowWorkingParentFIREGame(false);
      setShowAvatarSelection(true);
    }} />;
  }

  // Show Home Buyer FIRE Game if selected
  if (showHomeBuyerFIREGame) {
    return <HomeBuyerFIREGame />;
  }

  // Show Small Business FIRE Game if selected
  if (showSmallBusinessFIREGame) {
    return <SmallBusinessFIREGame />;
  }

  // Show Mid-Career FIRE Game if selected
  if (showMidCareerFIREGame) {
    return <MidCareerFIREGame />;
  }

  // Show Pre-Retiree FIRE Game if selected
  if (showPreRetireeFIREGame) {
    return <PreRetireeFIREGame />;
  }

  // Show Retiree FIRE Game if selected
  if (showRetireeFIREGame) {
    return <RetireeFIREGame />;
  }

  // Show New American FIRE Game if selected
  if (showNewAmericanFIREGame) {
    return <NewAmericanFIREGame />;
  }

  // Show College Student Game if selected - First Salary Reality Matrix
  if (showCollegeStudentGame) {
    return <CollegeStudentFirstSalaryGame onBackToDashboard={() => setShowCollegeStudentGame(false)} />;
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
                  <p className="text-gray-700 text-xs">Select from 11 unique avatars - College Student, Young Professional, Freelancer, Working Parent, First-Time Home Buyer, Small Business Owner, Mid-Career Professional, Pre-Retiree, Retiree, and New American. Each has distinct financial challenges and opportunities.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-3xl">📊</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">Navigate 15 Life Stages</h3>
                  <p className="text-gray-700 text-xs">Progress through realistic scenarios from initial financial awareness to advanced wealth management. Face real financial decisions like emergency crises, investment choices, and career transitions tailored to your avatar.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-3xl">💡</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">Learn from Consequences</h3>
                  <p className="text-gray-700 text-xs">Every choice has realistic outcomes. Poor decisions lead to debt stress, while smart planning builds wealth. Experience the true cost of financial mistakes safely with avatar-specific scenarios.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-3xl">🏆</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">Achieve FIRE or Learn Why Not</h3>
                  <p className="text-gray-700 text-xs">Reach financial independence through consistent smart decisions, or discover exactly what went wrong with detailed analysis and improvement guidance. Each avatar path leads to different FIRE strategies.</p>
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
      <>
        <SEO 
          title="Financial Freedom Game - Interactive FIRE Journey & Financial Independence Planning"
          description="Master your path to Financial Independence and Early Retirement (FIRE) through interactive games, avatar-based scenarios, and comprehensive financial planning simulations for all life stages."
          keywords="FIRE game, financial freedom game, financial independence game, retirement planning game, investment simulation game, financial literacy game, money management game, wealth building game"
          canonical="https://dollarmento.com/financial-freedom-game"
        />
        <div className="min-h-screen bg-gray-100">
          <Helmet>
            <title>Financial Freedom Game - DollarMento</title>
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
                  <div className="text-gray-500 text-sm">11 unique life situations - each with distinct financial challenges and opportunities.</div>
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
      </>
    );
  }

  // Avatar Selection Screen - Enhanced Compact Design
  if (showAvatarSelection && !gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Helmet>
          <title>Choose Your Avatar - Financial Freedom Game</title>
        </Helmet>

        <div className="max-w-4xl mx-auto px-4 py-4">
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
        <title>Financial Freedom Game - DollarMento</title>
      </Helmet>

      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
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
                <div className="text-2xl font-bold text-green-600">${Math.floor(gameState.netWorth / 1000)}K</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Net Worth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">${gameState.coins}</div>
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

      <div className="max-w-4xl mx-auto px-6 py-8">
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
                    9: { icon: TrendingUp, bg: 'from-cyan-500 to-cyan-600', desc: 'Start investing: investments, RD/FD, index funds...' },
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
                      <div className="text-base font-bold text-yellow-600">+${currentStageData.coinReward}</div>
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

// College Student First Salary Reality Matrix Game Component
function CollegeStudentFirstSalaryGame({ onBackToDashboard }: { onBackToDashboard: () => void }) {
  // State for customizable inputs
  const [customSalary, setCustomSalary] = useState(4200);
  const [customRent, setCustomRent] = useState(1000);
  const [customFamilySupport, setCustomFamilySupport] = useState(300);

  // State for editing mode
  const [isEditingSalary, setIsEditingSalary] = useState(false);
  const [isEditingRent, setIsEditingRent] = useState(false);
  const [isEditingFamilySupport, setIsEditingFamilySupport] = useState(false);

  // Temporary input values
  const [tempSalary, setTempSalary] = useState(customSalary.toString());
  const [tempRent, setTempRent] = useState(customRent.toString());
  const [tempFamilySupport, setTempFamilySupport] = useState(customFamilySupport.toString());

  // Game state
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Optimized compound growth calculation
  const calculateGrowth = (principal: number, monthlyContribution: number, annualRate: number, months: number): number[] => {
    const results = [principal];
    let currentValue = principal;
    const monthlyRate = annualRate / 12;
    
    for (let month = 1; month <= months; month++) {
      currentValue = (currentValue + monthlyContribution) * (1 + monthlyRate);
      results.push(currentValue);
    }
    
    return results;
  };

  // Calculate dynamic breakdown based on custom salary and obligations
  const calculateDynamicBreakdown = (baseBreakdown: any, salaryRatio: number) => {
    const newBreakdown: any = {};
    Object.keys(baseBreakdown).forEach(key => {
      if (key === 'rent') {
        newBreakdown[key] = customRent;
      } else if (key === 'familySupport') {
        newBreakdown[key] = customFamilySupport;
      } else {
        newBreakdown[key] = Math.round(baseBreakdown[key] * salaryRatio);
      }
    });
    return newBreakdown;
  };

  const salaryRatio = customSalary / 4200; // Base salary ratio

  // Memoized strategies to prevent recalculation - All 4 original strategies
  const baseStrategies = useMemo(() => [
    {
      id: 'systematic',
      title: 'The Systematic Wealth Builder',
      subtitle: 'BALANCED',
      icon: <Target className="w-8 h-8" />,
      color: 'bg-blue-500',
      successRate: 85,
      description: 'Build wealth through systematic investing and disciplined spending',
      baseBreakdown: {
        emergencyFund: 500,
        familySupport: 300,
        rent: 1000,
        investment: 800,
        professionalDev: 200,
        wardrobe: 150,
        remaining: 1250
      },
      pros: [
        'Strong financial foundation',
        'Balanced approach to spending and saving',
        'Long-term wealth building potential',
        'Maintains social relationships'
      ],
      cons: [
        'Slower lifestyle improvements',
        'Requires discipline and patience',
        'May miss some social opportunities'
      ]
    },
    {
      id: 'social',
      title: 'The Social Status Seeker',
      subtitle: 'RISKY',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-orange-500',
      successRate: 15,
      description: 'Prioritize social status and immediate lifestyle upgrades',
      baseBreakdown: {
        celebration: 400,
        wardrobe: 600,
        devices: 1200,
        familySupport: 200,
        rent: 1000,
        remaining: 800
      },
      pros: [
        'Immediate social acceptance',
        'Enhanced confidence and status',
        'Better professional appearance',
        'Instant gratification'
      ],
      cons: [
        'High debt risk',
        'No emergency fund',
        'Lifestyle inflation trap',
        'Long-term financial stress'
      ]
    },
    {
      id: 'ascetic',
      title: 'The Financial Ascetic',
      subtitle: 'CONSERVATIVE',
      icon: <PiggyBank className="w-8 h-8" />,
      color: 'bg-green-500',
      successRate: 75,
      description: 'Maximum savings through extreme financial discipline',
      baseBreakdown: {
        essentials: 1300,
        survival: 200,
        savings: 2700,
        socialSpending: 0,
        upgrades: 0
      },
      pros: [
        'Highest savings rate (64%)',
        'Financial independence by 35-40',
        'Zero debt stress',
        'Maximum compound interest benefits'
      ],
      cons: [
        'Social isolation',
        'Limited career networking',
        'Missed life experiences',
        'Potential mental health impact'
      ]
    },
    {
      id: 'credit',
      title: 'The Credit Strategist',
      subtitle: 'AGGRESSIVE',
      icon: <CreditCard className="w-8 h-8" />,
      color: 'bg-purple-500',
      successRate: 12,
      description: 'Use credit optimization and leverage for wealth building',
      baseBreakdown: {
        creditLimit: 5000,
        cashKept: 3800,
        utilization: 1500,
        rewards: 400,
        interest: 0 // initially
      },
      pros: [
        'Maintains full lifestyle',
        'Builds credit history fast',
        'Earns rewards and cashback',
        'Keeps cash liquid for opportunities'
      ],
      cons: [
        'High debt risk (24.99% APR)',
        'Requires exceptional discipline',
        'Lifestyle inflation trap',
        '68% end up in debt within 1 year'
      ]
    }
  ], [customRent, customFamilySupport]);

  // Memoized dynamic strategies
  const strategies = useMemo(() => 
    baseStrategies.map(strategy => ({
      ...strategy,
      breakdown: calculateDynamicBreakdown(strategy.baseBreakdown, salaryRatio)
    })), [baseStrategies, salaryRatio, customRent, customFamilySupport]
  );

  const handleStrategySelect = (strategyId: string) => {
    setSelectedStrategy(strategyId);
    setGameStarted(true);
    setCurrentStep(1);
  };

  const resetGame = () => {
    setSelectedStrategy(null);
    setGameStarted(false);
    setCurrentStep(0);
  };

  const getStrategyById = (id: string) => strategies.find(s => s.id === id);

  // Handler functions for editing functionality
  const handleSalaryEdit = () => {
    setIsEditingSalary(true);
    setTempSalary(customSalary.toString());
  };

  const handleSalarySave = () => {
    const newSalary = parseInt(tempSalary);
    if (newSalary >= 1000 && newSalary <= 50000) {
      setCustomSalary(newSalary);
    }
    setIsEditingSalary(false);
  };

  const handleSalaryCancel = () => {
    setTempSalary(customSalary.toString());
    setIsEditingSalary(false);
  };

  const handleSalaryKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSalarySave();
    } else if (e.key === 'Escape') {
      handleSalaryCancel();
    }
  };

  const handleRentEdit = () => {
    setIsEditingRent(true);
    setTempRent(customRent.toString());
  };

  const handleRentSave = () => {
    const newRent = parseInt(tempRent);
    if (newRent >= 0 && newRent <= 5000) {
      setCustomRent(newRent);
    }
    setIsEditingRent(false);
  };

  const handleRentCancel = () => {
    setTempRent(customRent.toString());
    setIsEditingRent(false);
  };

  const handleRentKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRentSave();
    } else if (e.key === 'Escape') {
      handleRentCancel();
    }
  };

  const handleFamilySupportEdit = () => {
    setIsEditingFamilySupport(true);
    setTempFamilySupport(customFamilySupport.toString());
  };

  const handleFamilySupportSave = () => {
    const newFamilySupport = parseInt(tempFamilySupport);
    if (newFamilySupport >= 0 && newFamilySupport <= 3000) {
      setCustomFamilySupport(newFamilySupport);
    }
    setIsEditingFamilySupport(false);
  };

  const handleFamilySupportCancel = () => {
    setTempFamilySupport(customFamilySupport.toString());
    setIsEditingFamilySupport(false);
  };

  const handleFamilySupportKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFamilySupportSave();
    } else if (e.key === 'Escape') {
      handleFamilySupportCancel();
    }
  };

  if (!gameStarted) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <Rocket className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              First Salary Reality Matrix
            </h1>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center mb-3">
              <DollarSign className="w-6 h-6 text-green-600 mr-2" />
              {isEditingSalary ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={tempSalary}
                    onChange={(e) => setTempSalary(e.target.value)}
                    onKeyDown={handleSalaryKeyPress}
                    className="w-24 text-2xl font-bold text-center border-2 border-yellow-400 bg-yellow-50"
                    autoFocus
                    min="1000"
                    max="50000"
                  />
                  <Button size="sm" onClick={handleSalarySave} className="bg-green-600 hover:bg-green-700">
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleSalaryCancel}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">${customSalary.toLocaleString()}</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={handleSalaryEdit}
                    className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <span className="text-sm text-gray-600 ml-2">• Month 1, Day 1</span>
            </div>
            <p className="text-base text-gray-700 leading-relaxed">
              Your first salary decision creates ripple effects for the next 40 years. 
              Financial habits formed in the first 90 days persist for decades.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-red-700 text-lg">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Obligations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span>Rent (Due in 3 days):</span>
                {isEditingRent ? (
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={tempRent}
                      onChange={(e) => setTempRent(e.target.value)}
                      onKeyDown={handleRentKeyPress}
                      className="w-20 text-sm font-semibold text-right border-2 border-yellow-400 bg-yellow-50"
                      autoFocus
                      min="0"
                      max="5000"
                    />
                    <Button size="sm" onClick={handleRentSave} className="bg-green-600 hover:bg-green-700 p-1">
                      <Check className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleRentCancel} className="p-1">
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">${customRent.toLocaleString()}</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={handleRentEdit}
                      className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 p-1"
                    >
                      <Edit3 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <span>Family Support:</span>
                {isEditingFamilySupport ? (
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={tempFamilySupport}
                      onChange={(e) => setTempFamilySupport(e.target.value)}
                      onKeyDown={handleFamilySupportKeyPress}
                      className="w-20 text-sm font-semibold text-right border-2 border-yellow-400 bg-yellow-50"
                      autoFocus
                      min="0"
                      max="3000"
                    />
                    <Button size="sm" onClick={handleFamilySupportSave} className="bg-green-600 hover:bg-green-700 p-1">
                      <Check className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleFamilySupportCancel} className="p-1">
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">${customFamilySupport.toLocaleString()}</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={handleFamilySupportEdit}
                      className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 p-1"
                    >
                      <Edit3 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <span>401k (Auto 10%):</span>
                <span className="font-semibold">${Math.round(customSalary * 0.1).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-blue-700 text-lg">
                <Info className="w-4 h-4 mr-2" />
                Key Facts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p>• Age 24 (41 years to retirement)</p>
              <p>• No savings or credit history</p>
              <p>• Inflation 3.2%, Savings 4.5%</p>
              <p>• Only income source</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Financial Strategy</h2>
          <p className="text-gray-600">Your decision determines your next 40 years of financial outcomes</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {strategies.map((strategy, index) => {
            const colorClasses = [
              'bg-blue-500',
              'bg-orange-500', 
              'bg-green-500',
              'bg-purple-500'
            ];
            
            return (
              <Card key={strategy.id} className="relative overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full" onClick={() => handleStrategySelect(strategy.id)}>
                <CardHeader className={`${colorClasses[index]} text-white h-36 flex flex-col items-center text-center p-3 relative`}>
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 flex items-center justify-center mb-1">
                      {React.cloneElement(strategy.icon as React.ReactElement, { className: "w-5 h-5" })}
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col justify-center min-h-0 pb-6">
                    <CardTitle className="text-sm text-white leading-tight mb-1 px-1">{strategy.title}</CardTitle>
                    <div className="text-lg font-bold leading-none mb-0.5">{strategy.successRate}%</div>
                    <div className="text-xs opacity-90 leading-none">Success</div>
                  </div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs py-0 px-2 h-4">
                      {strategy.subtitle}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="bg-white p-4 flex flex-col justify-between flex-grow">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{strategy.description}</p>
                  
                  <Button className="w-full mt-auto" onClick={() => handleStrategySelect(strategy.id)}>
                    Choose This Strategy
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={onBackToDashboard}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Get the selected strategy details
  const selectedStrategyDetails = getStrategyById(selectedStrategy!);
  
  // 5-Year Projection Logic
  const calculate5YearProjection = (strategy: any) => {
    const monthlyContribution = strategy.id === 'systematic' ? 800 + 500 : // investment + emergency
                               strategy.id === 'ascetic' ? 2700 : // high savings
                               strategy.id === 'credit' ? 0 : // credit strategy has no initial savings
                               0; // social strategy has no savings

    const years = [];
    let totalSavings = 0;
    let debt = 0;
    let creditScore = strategy.id === 'credit' ? 750 : 650;
    let emergencyFund = strategy.id === 'systematic' ? 500 * 12 : strategy.id === 'ascetic' ? 1300 * 12 : 0;
    let investments = 0;
    let netWorth = 0;

    for (let year = 1; year <= 5; year++) {
      // Calculate growth based on strategy
      if (strategy.id === 'systematic') {
        investments += (800 * 12) * Math.pow(1.08, year); // 8% annual return
        emergencyFund = Math.min(emergencyFund + (500 * 12), customSalary * 6); // Cap at 6 months salary
        totalSavings = investments + emergencyFund;
        netWorth = totalSavings;
      } else if (strategy.id === 'ascetic') {
        totalSavings += (2700 * 12) * Math.pow(1.08, year); // Conservative 8% return
        netWorth = totalSavings;
      } else if (strategy.id === 'social') {
        debt += 1200 * 12 * Math.pow(1.25, year - 1); // 25% credit card debt accumulation
        netWorth = -debt;
        creditScore = Math.max(300, creditScore - (year * 50)); // Credit score deteriorates
      } else if (strategy.id === 'credit') {
        if (year <= 2) {
          // First 2 years: managing credit well
          creditScore = Math.min(850, 750 + (year * 25));
          totalSavings = 3800 * 12 * Math.pow(1.045, year); // 4.5% savings return
          netWorth = totalSavings;
        } else {
          // Years 3-5: high risk of debt spiral (68% failure rate)
          debt = 5000 * Math.pow(1.25, year - 2); // Debt spiral
          netWorth = totalSavings - debt;
          creditScore = Math.max(400, creditScore - ((year - 2) * 75));
        }
      }

      years.push({
        year,
        totalSavings: Math.max(0, totalSavings),
        debt: Math.max(0, debt),
        netWorth,
        creditScore: Math.round(creditScore),
        emergencyFund: Math.max(0, emergencyFund),
        investments: Math.max(0, investments)
      });
    }

    return years;
  };

  const projectionData = selectedStrategyDetails ? calculate5YearProjection(selectedStrategyDetails) : [];

  // Detailed scenario content for each strategy
  const getStrategyScenario = () => {
    if (!selectedStrategyDetails) return null;

    const finalYear = projectionData[4];
    
    switch (selectedStrategyDetails.id) {
      case 'systematic':
        return {
          title: "The Systematic Wealth Builder Journey",
          subtitle: "Balanced Growth & Financial Security",
          outcomes: [
            `Built $${finalYear.netWorth.toLocaleString()} in net worth over 5 years`,
            `Emergency fund of $${finalYear.emergencyFund.toLocaleString()} (6 months expenses)`,
            `Investment portfolio worth $${finalYear.investments.toLocaleString()}`,
            `Credit score improved to ${finalYear.creditScore}`,
            "Strong foundation for long-term wealth building"
          ],
          risks: [
            "Requires consistent discipline and patience",
            "Slower lifestyle improvements in early years", 
            "May miss some immediate opportunities",
            "Success depends on market performance"
          ],
          keyMilestones: [
            "Year 1: Emergency fund fully established",
            "Year 2: Investment portfolio shows growth",
            "Year 3: Compound interest becomes visible",
            "Year 4: Financial confidence increases",
            "Year 5: Strong position for major goals"
          ]
        };
      
      case 'social':
        return {
          title: "The Social Status Seeker Reality",
          subtitle: "High Risk, High Consequence Path",
          outcomes: [
            `Accumulated $${finalYear.debt.toLocaleString()} in credit card debt`,
            `Net worth of -$${Math.abs(finalYear.netWorth).toLocaleString()} (negative)`,
            `Credit score dropped to ${finalYear.creditScore}`,
            "No emergency fund or investments",
            "High financial stress and limited options"
          ],
          risks: [
            "68% end up in serious debt within 1 year",
            "Lifestyle inflation trap is difficult to escape",
            "High interest rates (24.99% APR) compound rapidly",
            "Career mobility limited by financial stress",
            "Relationship strain due to money problems"
          ],
          keyMilestones: [
            "Month 3: Credit utilization exceeds 50%",
            "Year 1: First missed payment warnings",
            "Year 2: Debt exceeds annual salary",
            "Year 3: Credit applications rejected",
            "Year 5: Considering bankruptcy options"
          ]
        };

      case 'ascetic':
        return {
          title: "The Financial Ascetic Achievement",
          subtitle: "Maximum Savings, Minimal Lifestyle",
          outcomes: [
            `Accumulated $${finalYear.netWorth.toLocaleString()} in total savings`,
            "Highest savings rate at 64% of income",
            `On track for financial independence by age 35-40`,
            "Zero debt and maximum compound growth",
            "Strong financial position but social trade-offs"
          ],
          risks: [
            "Potential social isolation and relationship strain",
            "Limited career networking opportunities",
            "Missed life experiences during prime years",
            "Possible mental health impact from extreme restriction",
            "Difficulty adjusting lifestyle when needed"
          ],
          keyMilestones: [
            "Year 1: Savings exceed annual salary",
            "Year 2: Investment portfolio diversification",
            "Year 3: Compound interest acceleration",
            "Year 4: FIRE (Financial Independence) planning",
            "Year 5: Multiple income stream development"
          ]
        };

      case 'credit':
        return {
          title: "The Credit Strategist Gamble",
          subtitle: "High Skill Required, High Risk",
          outcomes: finalYear.netWorth > 0 ? [
            `Built $${finalYear.netWorth.toLocaleString()} while optimizing credit`,
            `Achieved excellent credit score of ${finalYear.creditScore}`,
            "Successfully managed credit utilization",
            "Earned substantial rewards and cashback",
            "Maintained liquid cash for opportunities"
          ] : [
            `Lost $${Math.abs(finalYear.netWorth).toLocaleString()} to debt spiral`,
            `Credit score damaged to ${finalYear.creditScore}`,
            "Failed to manage credit discipline",
            "High interest costs overwhelmed rewards",
            "Limited financial options available"
          ],
          risks: [
            "Requires exceptional financial discipline",
            "68% failure rate leads to debt within 1 year",
            "Credit utilization can spiral quickly",
            "Lifestyle inflation extremely difficult to control",
            "Market downturns can trigger debt cascade"
          ],
          keyMilestones: finalYear.netWorth > 0 ? [
            "Year 1: Credit optimization success",
            "Year 2: Reward maximization achieved",
            "Year 3: Advanced credit strategies",
            "Year 4: Investment leverage opportunities",
            "Year 5: Credit mastery and wealth building"
          ] : [
            "Year 1: Initial credit management",
            "Year 2: Warning signs appear",
            "Year 3: Debt spiral begins",
            "Year 4: Credit damage accelerates",
            "Year 5: Financial recovery planning"
          ]
        };

      default:
        return null;
    }
  };

  const scenarioContent = getStrategyScenario();

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center justify-center mb-4">
          {selectedStrategyDetails?.icon}
          <h1 className="text-3xl font-bold text-gray-900 ml-3">
            {scenarioContent?.title}
          </h1>
        </div>
        <p className="text-center text-gray-600 text-lg">{scenarioContent?.subtitle}</p>
      </div>

      {/* 5-Year Projection Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">5-Year Financial Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4 mb-6">
            {projectionData.map((yearData, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Year {yearData.year}</h3>
                <div className="space-y-1 text-sm">
                  <div>
                    <span className="text-gray-600">Net Worth:</span>
                    <div className={`font-bold ${yearData.netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${yearData.netWorth >= 0 ? yearData.netWorth.toLocaleString() : `-$${Math.abs(yearData.netWorth).toLocaleString()}`}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Credit Score:</span>
                    <div className="font-bold">{yearData.creditScore}</div>
                  </div>
                  {yearData.debt > 0 && (
                    <div>
                      <span className="text-gray-600">Debt:</span>
                      <div className="font-bold text-red-600">${yearData.debt.toLocaleString()}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Key Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {scenarioContent?.outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">{outcome}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-700">Risks & Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {scenarioContent?.risks.map((risk, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">⚠</span>
                  <span className="text-sm">{risk}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Key Milestones */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Key Milestones & Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scenarioContent?.keyMilestones.map((milestone, index) => (
              <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <span className="text-sm">{milestone}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button onClick={resetGame} className="bg-green-600 hover:bg-green-700">
          Choose Different Strategy
        </Button>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}