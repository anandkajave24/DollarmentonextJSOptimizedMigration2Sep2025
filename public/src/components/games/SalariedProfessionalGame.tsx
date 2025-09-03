import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  User, Briefcase, Calculator, BookOpen, AlertTriangle, TrendingDown,
  Shield, CreditCard, TrendingUp, Umbrella, FileText, Zap,
  Target, Brain, Trophy, Coins, Star, CheckCircle, XCircle,
  PiggyBank, Wallet, DollarSign, Heart, Clock, Smartphone, ArrowRight,
  ArrowDown, MapPin, Route, Navigation, Lightbulb, Eye, AlertCircle,
  Home, Car, Coffee, ShoppingBag, Map, Compass, Flag
} from 'lucide-react';

interface GameState {
  currentStage: number;
  playerName: string;
  salary: number;
  savings: number;
  expenses: number;
  debt: number;
  creditScore: number;
  investments: number;
  emergencyFund: number;
  happiness: number;
  knowledge: number;
  confidence: number;
  stageProgress: { [key: number]: boolean };
  currentScenario: string | null;
  choices: any[];
  gameScore: number;
  pathTaken: string[];
  financialFreedomScore: number;
  barriers: string[];
  achievements: string[];
  currentMonth: number;
  monthlyProgress: { [key: number]: any };
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  situation: string;
  visualIcon: any;
  choices: {
    id: string;
    text: string;
    pathName: string;
    consequences: {
      salary?: number;
      savings?: number;
      expenses?: number;
      debt?: number;
      creditScore?: number;
      investments?: number;
      emergencyFund?: number;
      happiness?: number;
      knowledge?: number;
      confidence?: number;
      financialFreedomScore?: number;
    };
    feedback: string;
    warning?: string;
    futureOutcome: string;
    barriers?: string[];
    achievements?: string[];
    isCorrect: boolean;
    pathColor: string;
  }[];
}

interface SalariedProfessionalGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const SalariedProfessionalGame: React.FC<SalariedProfessionalGameProps> = ({ onComplete, onBack }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentStage: 1,
    playerName: 'Professional',
    salary: 50000, // Starting ₹50,000 monthly
    savings: 0, // Starting with no savings
    expenses: 0,
    debt: 0,
    creditScore: 0, // No credit history yet - will build through journey
    investments: 0,
    emergencyFund: 0,
    happiness: 50, // Neutral starting point
    knowledge: 0, // Starting with no financial knowledge
    confidence: 0, // Will build confidence through learning
    stageProgress: {},
    currentScenario: 'first_salary',
    choices: [],
    gameScore: 0,
    pathTaken: [],
    financialFreedomScore: 0, // Start at 0%
    barriers: ['No Financial Knowledge', 'No Emergency Fund', 'No Investment Plan'],
    achievements: [],
    currentMonth: 1,
    monthlyProgress: {}
  });

  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showPathVisualization, setShowPathVisualization] = useState(false);
  const [showFinalResults, setShowFinalResults] = useState(false);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);

  // Comprehensive 5-stage journey with detailed learning objectives
  const stageInfo = {
    1: {
      name: "Financial Awareness & Identity",
      description: "Build your financial foundation and understand money psychology",
      learningObjectives: ["Understand financial mindset", "Learn basic money management", "Develop financial discipline"],
      totalScenarios: 2
    },
    2: {
      name: "Income Sources & Diversification", 
      description: "Master income generation and create multiple revenue streams",
      learningObjectives: ["Explore income diversification", "Understand job security", "Build freelancing skills"],
      totalScenarios: 2
    },
    3: {
      name: "Budgeting & Expense Management",
      description: "Control spending and create sustainable budgets",
      learningObjectives: ["Master expense tracking", "Overcome impulse spending", "Build budgeting habits"],
      totalScenarios: 2
    },
    4: {
      name: "Emergency Fund & Crisis Management", 
      description: "Build financial security and handle emergencies",
      learningObjectives: ["Build emergency funds", "Handle financial crises", "Plan for uncertainties"],
      totalScenarios: 2
    },
    5: {
      name: "Smart Borrowing & Debt Management",
      description: "Make intelligent borrowing decisions and manage debt",
      learningObjectives: ["Understand good vs bad debt", "Make smart loan decisions", "Build credit score"],
      totalScenarios: 2
    }
  };

  // Immersive financial journey scenarios with visual decision paths
  const stageScenarios: { [key: number]: Scenario[] } = {
    1: [ // Financial Awareness & Identity
      {
        id: 'first_salary',
        title: 'Your First Salary Milestone!',
        description: 'Month 1: You just received your first ₹50,000 salary. It\'s a huge moment!',
        situation: 'Your bank account shows ₹50,000. Your friends want to celebrate with an expensive party (₹8,000). Your family expects you to contribute ₹15,000 home. You need to make your first major financial decision.',
        visualIcon: Wallet,
        choices: [
          {
            id: 'party_path',
            text: 'Join the expensive celebration - I deserve this!',
            pathName: 'The Celebration Path',
            consequences: { expenses: 8000, happiness: 15, knowledge: -5, confidence: -10, financialFreedomScore: -5 },
            feedback: 'You chose instant gratification! This feels great now, but you\'ve started a dangerous spending pattern.',
            warning: '⚠️ Warning: This path leads to lifestyle inflation and difficulty saving later.',
            futureOutcome: 'In 6 months: You\'ll struggle to save money as your celebration expenses keep increasing.',
            barriers: ['Impulse Spending Habit', 'Peer Pressure Vulnerability'],
            isCorrect: false,
            pathColor: 'from-red-500 to-orange-500'
          },
          {
            id: 'balanced_path',
            text: 'Suggest a modest celebration (₹2,000) + save the rest',
            pathName: 'The Balanced Path',
            consequences: { expenses: 2000, savings: 6000, happiness: 8, knowledge: 10, confidence: 15, financialFreedomScore: 10 },
            feedback: 'Excellent choice! You\'re learning to balance enjoyment with financial responsibility.',
            futureOutcome: 'In 6 months: You\'ll have ₹36,000 saved while still enjoying life responsibly.',
            achievements: ['Smart Budgeting', 'Peer Influence Resistance'],
            isCorrect: true,
            pathColor: 'from-green-500 to-emerald-500'
          },
          {
            id: 'extreme_saving',
            text: 'Skip all celebrations, save everything possible',
            pathName: 'The Extreme Saver Path',
            consequences: { savings: 15000, happiness: -10, knowledge: 5, confidence: 5, financialFreedomScore: 5 },
            feedback: 'You\'re being very disciplined, but this extreme approach might not be sustainable long-term.',
            warning: '⚠️ Warning: Extreme frugality can lead to burnout and social isolation.',
            futureOutcome: 'In 6 months: You\'ll have great savings but might feel deprived and stressed.',
            barriers: ['Social Isolation Risk', 'Burnout Potential'],
            isCorrect: false,
            pathColor: 'from-blue-500 to-indigo-500'
          }
        ]
      },
      {
        id: 'financial_awareness',
        title: 'Building Financial Knowledge',
        description: 'Month 2: Your colleague mentions investment options. You realize you know very little about money management.',
        situation: 'Your colleague earns the same salary but seems financially smarter. They mention SIPs, FDs, and credit scores. You feel overwhelmed but curious.',
        visualIcon: BookOpen,
        choices: [
          {
            id: 'learn_path',
            text: 'Dedicate 1 hour daily to learn about personal finance',
            pathName: 'The Learning Path',
            consequences: { knowledge: 25, confidence: 20, financialFreedomScore: 15 },
            feedback: 'Fantastic! Knowledge is the foundation of financial freedom. You\'re building lasting skills.',
            futureOutcome: 'In 6 months: You\'ll understand investments, taxes, and make informed financial decisions.',
            achievements: ['Financial Education Commitment', 'Self-Improvement Mindset'],
            isCorrect: true,
            pathColor: 'from-purple-500 to-violet-500'
          },
          {
            id: 'ignore_path',
            text: 'It\'s too complicated - I\'ll figure it out later',
            pathName: 'The Procrastination Path',
            consequences: { knowledge: -5, confidence: -10, financialFreedomScore: -10 },
            feedback: 'You\'ve chosen to stay in your comfort zone, but this will cost you opportunities.',
            warning: '⚠️ Warning: Financial ignorance leads to poor decisions and missed opportunities.',
            futureOutcome: 'In 6 months: You\'ll still be confused about money and making costly mistakes.',
            barriers: ['Financial Illiteracy', 'Missed Investment Opportunities'],
            isCorrect: false,
            pathColor: 'from-gray-500 to-slate-500'
          },
          {
            id: 'follow_blindly',
            text: 'Just copy whatever my colleague does',
            pathName: 'The Follower Path',
            consequences: { knowledge: 5, confidence: -5, financialFreedomScore: 0 },
            feedback: 'You\'re taking action but without understanding. This can be risky.',
            warning: '⚠️ Warning: Blind following can lead to unsuitable financial decisions.',
            futureOutcome: 'In 6 months: You might have some investments but won\'t understand why.',
            barriers: ['Lack of Personal Strategy', 'Dependency on Others'],
            isCorrect: false,
            pathColor: 'from-yellow-500 to-amber-500'
          }
        ]
      }
    ]
  };

  // Calculate financial freedom progress - starts at 0%
  const calculateFinancialFreedom = () => {
    const savingsScore = Math.min(30, (gameState.savings / 500000) * 30);
    const knowledgeScore = (gameState.knowledge / 100) * 25;
    const confidenceScore = (gameState.confidence / 100) * 20;
    const investmentScore = Math.min(15, (gameState.investments / 200000) * 15);
    const emergencyScore = Math.min(10, (gameState.emergencyFund / 100000) * 10);
    return Math.round(savingsScore + knowledgeScore + confidenceScore + investmentScore + emergencyScore);
  };

  const getCurrentScenarios = () => {
    return stageScenarios[gameState.currentStage] || [];
  };

  const selectChoice = (scenarioId: string, choiceId: string) => {
    const scenarios = getCurrentScenarios();
    const scenario = scenarios.find(s => s.id === scenarioId);
    const choice = scenario?.choices.find(c => c.id === choiceId);
    
    if (choice) {
      setSelectedChoice(choiceId);
      setShowFeedback(true);
      
      // Apply consequences with enhanced tracking
      setGameState(prev => ({
        ...prev,
        salary: prev.salary + (choice.consequences.salary || 0),
        savings: Math.max(0, prev.savings + (choice.consequences.savings || 0)),
        expenses: prev.expenses + (choice.consequences.expenses || 0),
        debt: Math.max(0, prev.debt + (choice.consequences.debt || 0)),
        creditScore: Math.min(850, Math.max(300, prev.creditScore + (choice.consequences.creditScore || 0))),
        investments: prev.investments + (choice.consequences.investments || 0),
        emergencyFund: Math.max(0, prev.emergencyFund + (choice.consequences.emergencyFund || 0)),
        happiness: Math.min(100, Math.max(0, prev.happiness + (choice.consequences.happiness || 0))),
        knowledge: Math.min(100, Math.max(0, prev.knowledge + (choice.consequences.knowledge || 0))),
        confidence: Math.min(100, Math.max(0, prev.confidence + (choice.consequences.confidence || 0))),
        financialFreedomScore: Math.min(100, Math.max(0, prev.financialFreedomScore + (choice.consequences.financialFreedomScore || 0))),
        gameScore: prev.gameScore + (choice.isCorrect ? 10 : 0),
        pathTaken: [...prev.pathTaken, choice.pathName],
        barriers: choice.barriers ? [...prev.barriers, ...choice.barriers] : prev.barriers,
        achievements: choice.achievements ? [...prev.achievements, ...choice.achievements] : prev.achievements,
        choices: [...prev.choices, { scenarioId, choiceId, isCorrect: choice.isCorrect, pathName: choice.pathName }],
        currentMonth: prev.currentMonth + 1
      }));
    }
  };

  const nextScenario = () => {
    setSelectedChoice(null);
    setShowFeedback(false);
    
    const scenarios = getCurrentScenarios();
    
    if (currentScenarioIndex < scenarios.length - 1) {
      // Move to next scenario in same stage
      setCurrentScenarioIndex(prev => prev + 1);
      setGameState(prev => ({
        ...prev,
        currentScenario: scenarios[currentScenarioIndex + 1].id
      }));
    } else {
      // Complete current stage and move to next stage
      setGameState(prev => ({
        ...prev,
        stageProgress: { ...prev.stageProgress, [prev.currentStage]: true }
      }));
      
      if (gameState.currentStage < 5) {
        setGameState(prev => ({
          ...prev,
          currentStage: prev.currentStage + 1,
          currentScenario: null
        }));
        setCurrentScenarioIndex(0);
      } else {
        // All stages complete - show final results
        setShowFinalResults(true);
      }
    }
  };

  const startStage = (stage: number) => {
    const scenarios = stageScenarios[stage];
    if (scenarios && scenarios.length > 0) {
      setGameState(prev => ({
        ...prev,
        currentStage: stage,
        currentScenario: scenarios[0].id
      }));
      setCurrentScenarioIndex(0);
    }
  };

  const goBackToStageSelection = () => {
    setGameState(prev => ({
      ...prev,
      currentScenario: null
    }));
    setCurrentScenarioIndex(0);
    setSelectedChoice(null);
    setShowFeedback(false);
  };

  const currentScenarios = getCurrentScenarios();
  const currentScenario = currentScenarios.find(s => s.id === gameState.currentScenario);

  // Skip stage selection - go directly to scenarios
  if (false) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Salaried Professional Journey</h1>
          <p className="text-gray-600">Navigate your financial journey from first salary to financial freedom</p>
        </div>

        {/* Player Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-blue-600">₹{gameState.salary.toLocaleString()}</div>
            <div className="text-xs text-blue-500">Monthly Income</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-600">₹{gameState.savings.toLocaleString()}</div>
            <div className="text-xs text-green-500">Savings</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-purple-600">{gameState.knowledge}%</div>
            <div className="text-xs text-purple-500">Knowledge</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-yellow-600">{gameState.happiness}%</div>
            <div className="text-xs text-yellow-500">Happiness</div>
          </div>
        </div>

        {/* Detailed Stage Selection */}
        <div className="space-y-6 mb-6">
          {[1, 2, 3, 4, 5].map(stage => {
            const info = stageInfo[stage as keyof typeof stageInfo];
            const isCompleted = gameState.stageProgress[stage];
            const isUnlocked = stage === 1 || gameState.stageProgress[stage - 1];
            
            return (
              <div
                key={stage}
                className={`rounded-xl border-2 p-6 transition-all ${
                  isCompleted 
                    ? 'border-green-500 bg-green-50' 
                    : isUnlocked 
                      ? 'border-blue-200 bg-white hover:border-blue-400 hover:shadow-md' 
                      : 'border-gray-200 bg-gray-50 opacity-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${
                        isCompleted ? 'bg-green-500' : isUnlocked ? 'bg-blue-500' : 'bg-gray-400'
                      }`}>
                        {stage}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{info.name}</h3>
                        <p className="text-sm text-gray-600">{info.description}</p>
                      </div>
                      {isCompleted && <CheckCircle className="w-6 h-6 text-green-500" />}
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Learning Objectives:</h4>
                      <div className="grid md:grid-cols-3 gap-2">
                        {info.learningObjectives.map((objective, index) => (
                          <div key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            • {objective}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-4">
                      {info.totalScenarios} scenarios • Real-world financial decisions
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    {isCompleted ? (
                      <button
                        onClick={() => startStage(stage)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        Review Stage
                      </button>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => startStage(stage)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Start Stage
                      </button>
                    ) : (
                      <div className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg text-sm">
                        Locked
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button onClick={onBack} variant="outline">
            ← Back to Game Selection
          </Button>
        </div>
      </div>
    );
  }

  // Immersive Visual Scenario Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Clear Stage Header with Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowDown className="w-4 h-4 rotate-90" />
                Back to Game
              </button>
              <div className="border-l border-gray-300 pl-4">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    {gameState.currentStage}
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Stage {gameState.currentStage}: {stageInfo[gameState.currentStage as keyof typeof stageInfo]?.name}
                  </h1>
                </div>
                <p className="text-gray-600">{stageInfo[gameState.currentStage as keyof typeof stageInfo]?.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{calculateFinancialFreedom()}%</div>
              <div className="text-sm text-gray-500">Financial Freedom</div>
            </div>
          </div>

          {/* Stage Progress Indicator */}
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Stage Progress</span>
              <span className="text-sm text-gray-600">
                Scenario {currentScenarioIndex + 1} of {getCurrentScenarios().length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentScenarioIndex + 1) / getCurrentScenarios().length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Just started</span>
              <span>Stage complete</span>
            </div>
          </div>

          {/* Visual Journey Path */}
          <div className="flex items-center justify-between mb-4">
            {gameState.pathTaken.slice(-3).map((path, index) => (
              <div key={index} className="flex items-center">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{path}</div>
                {index < 2 && <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />}
              </div>
            ))}
          </div>

          {/* Financial Health Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg p-3 text-center">
              <PiggyBank className="w-6 h-6 mx-auto mb-1" />
              <div className="text-lg font-bold">₹{(gameState.savings / 1000).toFixed(0)}K</div>
              <div className="text-xs opacity-90">Savings</div>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg p-3 text-center">
              <CreditCard className="w-6 h-6 mx-auto mb-1" />
              <div className="text-lg font-bold">₹{(gameState.debt / 1000).toFixed(0)}K</div>
              <div className="text-xs opacity-90">Debt</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg p-3 text-center">
              <Brain className="w-6 h-6 mx-auto mb-1" />
              <div className="text-lg font-bold">
                {gameState.knowledge === 0 ? "Beginner" : `${gameState.knowledge}%`}
              </div>
              <div className="text-xs opacity-90">Knowledge</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg p-3 text-center">
              <Heart className="w-6 h-6 mx-auto mb-1" />
              <div className="text-lg font-bold">
                {gameState.happiness === 50 ? "Neutral" : `${gameState.happiness}%`}
              </div>
              <div className="text-xs opacity-90">Happiness</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg p-3 text-center">
              <Star className="w-6 h-6 mx-auto mb-1" />
              <div className="text-lg font-bold">
                {gameState.confidence === 0 ? "No Confidence" : `${gameState.confidence}%`}
              </div>
              <div className="text-xs opacity-90">Confidence</div>
            </div>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-3 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-1" />
              <div className="text-lg font-bold">
                {gameState.creditScore === 0 ? "No History" : gameState.creditScore}
              </div>
              <div className="text-xs opacity-90">Credit Score</div>
            </div>
          </div>
        </div>

        {currentScenario && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Scenario */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                {/* Scenario Header with Icon */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <currentScenario.visualIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{currentScenario.title}</h2>
                    <p className="text-gray-600 mb-3">{currentScenario.description}</p>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-blue-800 text-sm">{currentScenario.situation}</p>
                    </div>
                  </div>
                </div>

                {/* Decision Paths */}
                {!showFeedback ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🛤️ Choose Your Path:</h3>
                    {currentScenario.choices.map(choice => (
                      <button
                        key={choice.id}
                        onClick={() => selectChoice(currentScenario.id, choice.id)}
                        className={`w-full p-4 text-left border-2 rounded-xl transition-all duration-300 hover:shadow-lg bg-gradient-to-r ${choice.pathColor} hover:scale-102 text-white`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{choice.pathName}</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                        <p className="text-sm opacity-90">{choice.text}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentScenario.choices.map(choice => (
                      <div
                        key={choice.id}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          choice.id === selectedChoice
                            ? choice.isCorrect
                              ? 'border-green-500 bg-green-50 shadow-lg'
                              : 'border-red-500 bg-red-50 shadow-lg'
                            : 'border-gray-200 bg-gray-50 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold">{choice.pathName}</span>
                          {choice.id === selectedChoice && (
                            choice.isCorrect ? 
                              <CheckCircle className="w-6 h-6 text-green-500" /> :
                              <XCircle className="w-6 h-6 text-red-500" />
                          )}
                        </div>
                        
                        {choice.id === selectedChoice && (
                          <div className="space-y-3">
                            <p className="text-sm text-gray-700">{choice.feedback}</p>
                            
                            {choice.warning && (
                              <div className="bg-orange-100 border border-orange-300 rounded-lg p-3">
                                <div className="flex items-start gap-2">
                                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                  <p className="text-sm text-orange-800">{choice.warning}</p>
                                </div>
                              </div>
                            )}
                            
                            <div className="bg-blue-100 rounded-lg p-3">
                              <p className="text-sm text-blue-800">
                                <strong>Future Outcome:</strong> {choice.futureOutcome}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <div className="flex justify-center mt-8">
                      {currentScenarioIndex < getCurrentScenarios().length - 1 ? (
                        <Button onClick={nextScenario} className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Next Scenario →
                        </Button>
                      ) : (
                        <div className="text-center space-y-4">
                          <div className="bg-green-100 border border-green-300 rounded-lg p-4">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <CheckCircle className="w-6 h-6 text-green-600" />
                              <span className="font-bold text-green-800">Stage {gameState.currentStage} Complete!</span>
                            </div>
                            <p className="text-green-700 text-sm">
                              You've mastered: {stageInfo[gameState.currentStage as keyof typeof stageInfo]?.name}
                            </p>
                          </div>
                          <Button onClick={nextScenario} className="px-8 py-3 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                            {gameState.currentStage < 5 ? 'Complete Stage & Continue →' : 'Complete Final Stage →'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Journey Insights Sidebar */}
            <div className="space-y-4">
              {/* Barriers */}
              {gameState.barriers.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Current Barriers
                  </h3>
                  <div className="space-y-2">
                    {gameState.barriers.slice(-3).map((barrier, index) => (
                      <div key={index} className="text-sm text-red-700 bg-red-100 rounded-lg p-2">
                        {barrier}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {gameState.achievements.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Achievements
                  </h3>
                  <div className="space-y-2">
                    {gameState.achievements.slice(-3).map((achievement, index) => (
                      <div key={index} className="text-sm text-green-700 bg-green-100 rounded-lg p-2">
                        ✓ {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Tips */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Financial Wisdom
                </h3>
                <div className="text-sm text-purple-700 space-y-2">
                  <p>💡 Every decision shapes your financial future</p>
                  <p>🎯 Focus on building both knowledge and wealth</p>
                  <p>⚖️ Balance is key to sustainable growth</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalariedProfessionalGame;