import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Search, Star, Clock, Users, BookOpen, Play, FileText, CheckCircle, Lock, Trophy, Target } from "lucide-react";
import { Link } from "wouter";

interface LearningStage {
  id: number;
  title: string;
  emoji: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Pro";
  color: string;
  bgColor: string;
  description: string;
  progress: number;
  unlocked: boolean;
  modules: LearningModule[];
}

interface LearningModule {
  id: number;
  title: string;
  description: string;
  duration: string;
  videoLength: string;
  completed: boolean;
  locked: boolean;
  tools: string[];
  tasks: string[];
  type: "video" | "interactive" | "practical" | "bonus" | "advanced";
}

export default function LearningHub() {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const learningStages: LearningStage[] = [
    {
      id: 1,
      title: "MONEY MINDSET & BASICS",
      emoji: "🟢",
      level: "Beginner",
      color: "text-green-700",
      bgColor: "bg-green-50 border-green-200",
      description: "Build your financial foundation and healthy money mindset",
      progress: 85,
      unlocked: true,
      modules: [
        {
          id: 1,
          title: "Welcome to RupeeSmart: Your Money Companion",
          description: "Why this platform exists, what it offers: tools, courses, trackers, community. Mindset before money.",
          duration: "15 min",
          videoLength: "8 min",
          completed: true,
          locked: false,
          tools: ["Platform Overview", "Goal Setting Tool"],
          tasks: ["Complete profile setup", "Set your first financial goal"],
          type: "video"
        },
        {
          id: 2,
          title: "Understanding Your Relationship With Money",
          description: "Childhood beliefs, money fears, and emotional patterns. The importance of awareness.",
          duration: "20 min",
          videoLength: "12 min",
          completed: true,
          locked: false,
          tools: ["Money Mindset Journal", "Budgeting Tool"],
          tasks: ["Complete money mindset assessment", "Write 3 money beliefs"],
          type: "interactive"
        },
        {
          id: 3,
          title: "Why Saving Matters (and How to Start)",
          description: "Delayed gratification, compounding, saving 20% rule, income buckets.",
          duration: "18 min",
          videoLength: "10 min",
          completed: false,
          locked: false,
          tools: ["Auto-Budget Setup", "Savings Calculator"],
          tasks: ["Set up automatic savings", "Calculate compound interest"],
          type: "practical"
        },
        {
          id: 4,
          title: "Emergency Fund 101",
          description: "What is an emergency fund, how much to save (3-6 months), where to park it.",
          duration: "25 min",
          videoLength: "15 min",
          completed: false,
          locked: false,
          tools: ["Emergency Fund Calculator", "Liquid Fund Tracker"],
          tasks: ["Calculate emergency fund target", "Open liquid fund account"],
          type: "practical"
        }
      ]
    },
    {
      id: 2,
      title: "FOUNDATION SETUP",
      emoji: "🟡",
      level: "Beginner",
      color: "text-yellow-700",
      bgColor: "bg-yellow-50 border-yellow-200",
      description: "Set up your financial systems and basic protection",
      progress: 60,
      unlocked: true,
      modules: [
        {
          id: 5,
          title: "Financial Planning for Young Professionals",
          description: "50/30/20 Rule, tracking expenses, starting SIPs, salary negotiation tips, SMART goals setup.",
          duration: "30 min",
          videoLength: "18 min",
          completed: true,
          locked: false,
          tools: ["Goal-Setting Tool", "Income Planner", "SIP Calculator"],
          tasks: ["Create monthly budget", "Start first SIP"],
          type: "practical"
        },
        {
          id: 6,
          title: "Introduction to Indian Financial System",
          description: "RBI, SEBI, banking, NBFCs, credit system. Difference between saving, investing, and insuring.",
          duration: "22 min",
          videoLength: "14 min",
          completed: false,
          locked: false,
          tools: ["Visual Glossary", "System Navigator"],
          tasks: ["Complete financial literacy quiz", "Identify your bank type"],
          type: "video"
        },
        {
          id: 7,
          title: "Health Insurance Demystified",
          description: "Policy types, premium calculation, claim process, network hospitals, riders and exclusions.",
          duration: "28 min",
          videoLength: "16 min",
          completed: false,
          locked: false,
          tools: ["Health Policy Selector", "Premium Calculator"],
          tasks: ["Compare 3 health policies", "Calculate ideal sum insured"],
          type: "practical"
        },
        {
          id: 8,
          title: "Understanding Debt: Good vs Bad",
          description: "Types of loans, credit cards, EMIs. What's healthy debt? Credit score basics.",
          duration: "24 min",
          videoLength: "12 min",
          completed: false,
          locked: false,
          tools: ["Debt Manager", "EMI Planner", "Credit Score Tracker"],
          tasks: ["Check your credit score", "List all current debts"],
          type: "practical"
        }
      ]
    },
    {
      id: 3,
      title: "INTRO TO INVESTING",
      emoji: "🔵",
      level: "Intermediate",
      color: "text-blue-700",
      bgColor: "bg-blue-50 border-blue-200",
      description: "Start your investment journey with confidence",
      progress: 40,
      unlocked: true,
      modules: [
        {
          id: 9,
          title: "Investing Fundamentals for Beginners",
          description: "What are stocks, bonds, mutual funds. Risk-return mindset, Demat account setup & first investment.",
          duration: "35 min",
          videoLength: "20 min",
          completed: false,
          locked: false,
          tools: ["Investment Walkthrough", "Risk Assessment", "Demat Account Guide"],
          tasks: ["Open Demat account", "Make first ₹500 investment"],
          type: "practical"
        },
        {
          id: 10,
          title: "Mutual Funds & SIP Simplified",
          description: "Types of funds: equity, hybrid, debt. Direct vs Regular, Active vs Passive, SIP myths.",
          duration: "32 min",
          videoLength: "18 min",
          completed: false,
          locked: false,
          tools: ["SIP Planner", "Fund Screener", "Performance Tracker"],
          tasks: ["Select 3 mutual funds", "Start SIP in chosen fund"],
          type: "practical"
        },
        {
          id: 11,
          title: "Gold, Real Estate & Alternative Assets",
          description: "Digital gold, SGBs, REITs. Physical vs digital pros/cons.",
          duration: "26 min",
          videoLength: "14 min",
          completed: false,
          locked: false,
          tools: ["Asset Tracker", "Gold Calculator", "REIT Analyzer"],
          tasks: ["Buy ₹1000 digital gold", "Research one REIT"],
          type: "practical"
        }
      ]
    },
    {
      id: 4,
      title: "INDIAN STOCK MARKET MASTERY",
      emoji: "🔴",
      level: "Advanced",
      color: "text-red-700",
      bgColor: "bg-red-50 border-red-200",
      description: "Master stock market investing and advanced strategies",
      progress: 20,
      unlocked: false,
      modules: [
        {
          id: 12,
          title: "How the Indian Stock Market Works",
          description: "NSE, BSE, indices (Nifty/Sensex), market timings, trading process.",
          duration: "28 min",
          videoLength: "16 min",
          completed: false,
          locked: true,
          tools: ["Live Market Watchlist", "Market Simulator"],
          tasks: ["Create watchlist of 10 stocks", "Practice paper trading"],
          type: "practical"
        },
        {
          id: 13,
          title: "Advanced Stock Market Strategies",
          description: "Technical Analysis: patterns, indicators, volume. Fundamental Analysis: balance sheet, ratios.",
          duration: "45 min",
          videoLength: "25 min",
          completed: false,
          locked: true,
          tools: ["Charting Tool", "Stock Screener", "Portfolio Analyzer"],
          tasks: ["Analyze 5 stocks technically", "Create model portfolio"],
          type: "advanced"
        }
      ]
    },
    {
      id: 5,
      title: "TAXATION & SMART SAVING",
      emoji: "🟣",
      level: "Intermediate",
      color: "text-purple-700",
      bgColor: "bg-purple-50 border-purple-200",
      description: "Optimize taxes and maximize savings legally",
      progress: 0,
      unlocked: false,
      modules: [
        {
          id: 14,
          title: "Tax Planning Strategies for Indian Taxpayers",
          description: "New vs Old regime, 80C, 80D, 80CCD, HRA, capital gains & loss harvesting.",
          duration: "40 min",
          videoLength: "22 min",
          completed: false,
          locked: true,
          tools: ["Tax Planner", "Investment Suggestions", "Regime Comparator"],
          tasks: ["Calculate tax liability", "Choose optimal regime"],
          type: "practical"
        },
        {
          id: 15,
          title: "Optimizing Your Salary Structuring",
          description: "Tax-free allowances, PF, Gratuity, bonus structures, freelancer/consultant tax hacks.",
          duration: "35 min",
          videoLength: "18 min",
          completed: false,
          locked: true,
          tools: ["Salary Optimizer Tool", "Allowance Calculator"],
          tasks: ["Restructure salary components", "Maximize tax savings"],
          type: "practical"
        }
      ]
    },
    {
      id: 6,
      title: "LONG-TERM WEALTH BUILDING",
      emoji: "🟤",
      level: "Advanced",
      color: "text-amber-700",
      bgColor: "bg-amber-50 border-amber-200",
      description: "Build generational wealth and plan for retirement",
      progress: 0,
      unlocked: false,
      modules: [
        {
          id: 16,
          title: "Retirement Planning for Indians",
          description: "EPF, NPS, PPF explained. Calculating retirement corpus, withdrawal strategy & estate planning.",
          duration: "50 min",
          videoLength: "28 min",
          completed: false,
          locked: true,
          tools: ["Retirement Goal Simulator", "Corpus Calculator"],
          tasks: ["Calculate retirement needs", "Optimize retirement portfolio"],
          type: "practical"
        },
        {
          id: 17,
          title: "Building Generational Wealth",
          description: "Why it's not about just 'getting rich'. Inheritance, trust funds, life insurance.",
          duration: "42 min",
          videoLength: "24 min",
          completed: false,
          locked: true,
          tools: ["Family Finance Planner", "Wealth Tracker"],
          tasks: ["Create family financial plan", "Set up succession planning"],
          type: "advanced"
        }
      ]
    },
    {
      id: 7,
      title: "DEBT & DISCIPLINE MASTERY",
      emoji: "⚫",
      level: "Pro",
      color: "text-gray-700",
      bgColor: "bg-gray-50 border-gray-200",
      description: "Master debt management and financial discipline",
      progress: 0,
      unlocked: false,
      modules: [
        {
          id: 18,
          title: "Debt Repayment Mastery",
          description: "Debt avalanche vs snowball, credit card traps, prepayment vs refinancing.",
          duration: "38 min",
          videoLength: "20 min",
          completed: false,
          locked: true,
          tools: ["Custom Debt-Elimination Plan", "Repayment Calculator"],
          tasks: ["Create debt payoff strategy", "Implement repayment plan"],
          type: "practical"
        }
      ]
    },
    {
      id: 8,
      title: "REAL LIFE STRATEGY & BEHAVIOUR",
      emoji: "⚪",
      level: "Pro",
      color: "text-slate-700",
      bgColor: "bg-slate-50 border-slate-200",
      description: "Master money psychology and family finance",
      progress: 0,
      unlocked: false,
      modules: [
        {
          id: 19,
          title: "Managing Money as a Couple or Family",
          description: "Joint accounts, partner transparency, budgeting with kids or spouse.",
          duration: "32 min",
          videoLength: "18 min",
          completed: false,
          locked: true,
          tools: ["Family Money Dashboard", "Couple's Budget Planner"],
          tasks: ["Set up joint budget", "Create family financial goals"],
          type: "practical"
        },
        {
          id: 20,
          title: "Money Psychology & Emotional Triggers",
          description: "Fear of loss, greed, comparison trap, FOMO & investing behavior, mindfulness with spending.",
          duration: "36 min",
          videoLength: "20 min",
          completed: false,
          locked: true,
          tools: ["Mindful Spending Reminders", "Behavior Tracker"],
          tasks: ["Complete psychology assessment", "Set spending boundaries"],
          type: "interactive"
        }
      ]
    }
  ];

  const totalModules = learningStages.reduce((total, stage) => total + stage.modules.length, 0);
  const completedModules = learningStages.reduce((total, stage) => 
    total + stage.modules.filter(module => module.completed).length, 0);
  const overallProgress = Math.round((completedModules / totalModules) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">RupeeSmart Learning Hub</h1>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Learning Journey</h2>
                <p className="text-gray-600">Complete systematic financial education from basics to mastery</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">{overallProgress}%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>
            <Progress value={overallProgress} className="h-3 mb-2" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{completedModules} of {totalModules} modules completed</span>
              <span>8 Learning Stages</span>
            </div>
          </CardContent>
        </Card>

        {/* Learning Stages */}
        <div className="space-y-6">
          {learningStages.map((stage) => (
            <Card key={stage.id} className={`border-2 ${stage.bgColor} ${stage.unlocked ? 'hover:shadow-lg transition-shadow' : 'opacity-75'}`}>
              <CardHeader 
                className="cursor-pointer" 
                onClick={() => stage.unlocked && setSelectedStage(selectedStage === stage.id ? null : stage.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{stage.emoji}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`text-xl font-bold ${stage.color}`}>
                          STAGE {stage.id}: {stage.title}
                        </h3>
                        <Badge variant="outline" className={stage.color}>
                          {stage.level}
                        </Badge>
                        {!stage.unlocked && <Lock className="w-4 h-4 text-gray-400" />}
                      </div>
                      <p className="text-gray-600">{stage.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{stage.progress}%</div>
                    <div className="text-sm text-gray-600">{stage.modules.length} modules</div>
                  </div>
                </div>
                <Progress value={stage.progress} className="mt-3 h-2" />
              </CardHeader>

              {selectedStage === stage.id && stage.unlocked && (
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {stage.modules.map((module) => (
                      <Card key={module.id} className={`border ${module.locked ? 'bg-gray-50' : 'bg-white hover:shadow-md transition-shadow'}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {module.completed ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : module.locked ? (
                                  <Lock className="w-5 h-5 text-gray-400" />
                                ) : (
                                  <Play className="w-5 h-5 text-blue-500" />
                                )}
                                <h4 className={`font-semibold ${module.locked ? 'text-gray-400' : 'text-gray-900'}`}>
                                  {module.title}
                                </h4>
                                <Badge variant="outline" className="text-xs">
                                  {module.type}
                                </Badge>
                              </div>
                              
                              <p className={`text-sm mb-3 ${module.locked ? 'text-gray-400' : 'text-gray-600'}`}>
                                {module.description}
                              </p>

                              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {module.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Play className="w-3 h-3" />
                                  {module.videoLength} video
                                </span>
                              </div>

                              <div className="mb-3">
                                <div className="text-xs font-medium text-gray-700 mb-1">🔧 Tools:</div>
                                <div className="flex flex-wrap gap-1">
                                  {module.tools.map((tool, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tool}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <div className="text-xs font-medium text-gray-700 mb-1">✅ Tasks:</div>
                                <ul className="text-xs text-gray-600">
                                  {module.tasks.map((task, index) => (
                                    <li key={index} className="flex items-start gap-1">
                                      <span>•</span>
                                      <span>{task}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            <div className="ml-4">
                              <Button 
                                size="sm" 
                                disabled={module.locked}
                                className={module.completed ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}
                              >
                                {module.completed ? "Completed" : module.locked ? "Locked" : "Start"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Bonus Section */}
        <Card className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-yellow-600" />
              <div>
                <h3 className="text-xl font-bold text-yellow-800">🏁 BONUS: RupeeSmart Success System</h3>
                <p className="text-yellow-700">Comprehensive recap and long-term success strategies</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <h4 className="font-semibold mb-2">Module 21: Your Financial Success Blueprint</h4>
              <p className="text-sm text-gray-600 mb-3">
                Complete journey recap, long-term checklist, and strategies for continuous financial growth with RupeeSmart tools.
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Duration: 30 min</span>
                <span>Video: 20 min</span>
                <span>Tools: Success Tracker, Milestone Planner</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Stats */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Learning Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">21</div>
                <div className="text-sm text-gray-600">Total Modules</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-gray-600">Learning Stages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-gray-600">Interactive Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">100+</div>
                <div className="text-sm text-gray-600">Practical Tasks</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}