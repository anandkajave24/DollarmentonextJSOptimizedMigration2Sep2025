import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { useToast } from "../hooks/use-toast";
import { SEO } from "../components/SEO";
import { 
  BookOpen, 
  Trophy, 
  Star, 
  Gamepad2, 
  Target, 
  Clock, 
  Play, 
  CheckCircle,
  Lock,
  ArrowLeft,
  Coins,
  PiggyBank,
  Calculator,
  ShoppingCart,
  TrendingUp,
  Award,
  Sparkles,
  Gift,
  Users,
  Heart,
  Zap,
  Flame,
  PartyPopper,
  Crown,
  Rocket,
  Music,
  Volume2,
  X,
  RefreshCw,
  Plus,
  Minus
} from "lucide-react";

interface LearningModule {
  id: number;
  title: string;
  description: string;
  ageGroup: "5-8" | "9-12" | "13-16";
  difficulty: "beginner" | "intermediate" | "advanced";
  progress: number;
  lessons: Lesson[];
  duration: number;
  category: string;
  color: string;
  emoji: string;
}

interface Lesson {
  id: number;
  title: string;
  type: "story" | "game" | "quiz" | "activity" | "video";
  duration: number;
  completed: boolean;
  description: string;
}

interface ActivityCard {
  id: number;
  title: string;
  description: string;
  type: "money-game" | "saving-challenge" | "quiz" | "story" | "calculator" | "shopping";
  ageGroup: "5-8" | "9-12" | "13-16";
  isNew: boolean;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  icon: any;
  color: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress: number;
  date?: string;
  category: string;
  points: number;
}

interface GameState {
  currentGame: string | null;
  score: number;
  level: number;
  coins: number;
  activeLesson: Lesson | null;
  streakDays: number;
  monthlyGoal: number;
  monthlySaved: number;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface SavingsGoal {
  id: number;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

const modules: LearningModule[] = [
  {
    id: 1,
    title: "Money Basics",
    description: "Learn what money is and how it works in everyday life",
    ageGroup: "5-8",
    difficulty: "beginner",
    progress: 75,
    duration: 20,
    category: "Foundation",
    color: "bg-orange-400",
    emoji: "💰",
    lessons: [
      { id: 1, title: "What is Money?", type: "story", duration: 5, completed: true, description: "Learn about different types of money" },
      { id: 2, title: "Counting Coins", type: "game", duration: 8, completed: true, description: "Practice counting rupee coins" },
      { id: 3, title: "Money Quiz", type: "quiz", duration: 7, completed: false, description: "Test your money knowledge" }
    ]
  },
  {
    id: 2,
    title: "Saving Smart",
    description: "Discover the magic of saving money for your dreams",
    ageGroup: "5-8",
    difficulty: "beginner",
    progress: 40,
    duration: 25,
    category: "Saving",
    color: "bg-green-400",
    emoji: "🐷",
    lessons: [
      { id: 1, title: "Why Save Money?", type: "story", duration: 6, completed: true, description: "Learn why saving is important" },
      { id: 2, title: "Piggy Bank Adventure", type: "game", duration: 10, completed: false, description: "Help characters save money" },
      { id: 3, title: "Saving Goals", type: "activity", duration: 9, completed: false, description: "Set your first saving goal" }
    ]
  },
  {
    id: 3,
    title: "Smart Shopping",
    description: "Learn how to make wise spending decisions",
    ageGroup: "9-12",
    difficulty: "intermediate",
    progress: 60,
    duration: 30,
    category: "Spending",
    color: "bg-purple-400",
    emoji: "🛒",
    lessons: [
      { id: 1, title: "Needs vs Wants", type: "story", duration: 8, completed: true, description: "Learn the difference between needs and wants" },
      { id: 2, title: "Budget Challenge", type: "game", duration: 12, completed: true, description: "Practice budgeting with limited money" },
      { id: 3, title: "Smart Shopper Quiz", type: "quiz", duration: 10, completed: false, description: "Test your shopping skills" }
    ]
  },
  {
    id: 4,
    title: "Investment Basics",
    description: "Introduction to growing money through investments",
    ageGroup: "13-16",
    difficulty: "advanced",
    progress: 20,
    duration: 35,
    category: "Investing",
    color: "bg-orange-400",
    emoji: "📈",
    lessons: [
      { id: 1, title: "What is Investment?", type: "video", duration: 10, completed: true, description: "Learn about growing money" },
      { id: 2, title: "Risk and Reward", type: "story", duration: 12, completed: false, description: "Understand investment risks" },
      { id: 3, title: "Investment Game", type: "game", duration: 13, completed: false, description: "Practice investing virtually" }
    ]
  }
];

const activities: ActivityCard[] = [
  {
    id: 1,
    title: "Coin Counting Game",
    description: "Practice counting rupee coins and notes",
    type: "money-game",
    ageGroup: "5-8",
    isNew: true,
    difficulty: "easy",
    points: 50,
    icon: Coins,
    color: "bg-yellow-400"
  },
  {
    id: 2,
    title: "Savings Challenge",
    description: "Set and track your monthly savings goal",
    type: "saving-challenge",
    ageGroup: "9-12",
    isNew: false,
    difficulty: "medium",
    points: 100,
    icon: Target,
    color: "bg-green-400"
  },
  {
    id: 3,
    title: "Budget Calculator",
    description: "Learn to plan your spending with our kid-friendly calculator",
    type: "calculator",
    ageGroup: "9-12",
    isNew: true,
    difficulty: "medium",
    points: 75,
    icon: Calculator,
    color: "bg-blue-400"
  },
  {
    id: 4,
    title: "Smart Shopping Quiz",
    description: "Test your knowledge about making smart purchases",
    type: "quiz",
    ageGroup: "13-16",
    isNew: false,
    difficulty: "hard",
    points: 150,
    icon: ShoppingCart,
    color: "bg-purple-400"
  }
];

const achievements: Achievement[] = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first lesson",
    icon: Star,
    unlocked: true,
    progress: 100,
    date: "Mar 15",
    category: "Learning",
    points: 50
  },
  {
    id: 2,
    title: "Coin Master",
    description: "Score 100% in coin counting game",
    icon: Coins,
    unlocked: true,
    progress: 100,
    date: "Mar 20",
    category: "Games",
    points: 100
  },
  {
    id: 3,
    title: "Saving Star",
    description: "Complete a savings challenge",
    icon: PiggyBank,
    unlocked: false,
    progress: 65,
    category: "Saving",
    points: 200
  },
  {
    id: 4,
    title: "Quiz Champion",
    description: "Score 90% or higher on 5 quizzes",
    icon: Trophy,
    unlocked: false,
    progress: 40,
    category: "Knowledge",
    points: 300
  }
];

export default function RupeesmartKidsEnhanced() {
  const { toast } = useToast();
  const [activeAgeGroup, setActiveAgeGroup] = useState<"all" | "5-8" | "9-12" | "13-16">("all");
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentGame: null,
    score: 0,
    level: 1,
    coins: 250,
    activeLesson: null,
    streakDays: 5,
    monthlyGoal: 500,
    monthlySaved: 285
  });

  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState<{
    type: 'achievement' | 'lesson' | 'streak' | 'goal';
    title: string;
    points: number;
    message: string;
  } | null>(null);

  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [coinCountingGame, setCoinCountingGame] = useState<{
    active: boolean;
    targetAmount: number;
    currentAmount: number;
    coins: { value: number; count: number }[];
    attempts: number;
    score: number;
  }>({
    active: false,
    targetAmount: 0,
    currentAmount: 0,
    coins: [],
    attempts: 0,
    score: 0
  });

  const [savingsGame, setSavingsGame] = useState<{
    active: boolean;
    currentSavings: number;
    goal: number;
    week: number;
    allowance: number;
    expenses: { name: string; cost: number; necessary: boolean }[];
  }>({
    active: false,
    currentSavings: 0,
    goal: 100,
    week: 1,
    allowance: 50,
    expenses: []
  });

  const [mathQuiz, setMathQuiz] = useState<{
    active: boolean;
    question: string;
    answer: number;
    userAnswer: string;
    score: number;
    questionCount: number;
  }>({
    active: false,
    question: "",
    answer: 0,
    userAnswer: "",
    score: 0,
    questionCount: 0
  });

  const filteredModules = modules.filter(module => 
    activeAgeGroup === "all" || module.ageGroup === activeAgeGroup
  );
  
  const filteredActivities = activities.filter(activity => 
    activeAgeGroup === "all" || activity.ageGroup === activeAgeGroup
  );

  // Quiz Questions Data
  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What should you do first when you get pocket money?",
      options: ["Spend it all immediately", "Save some of it", "Give it all away", "Hide it under the bed"],
      correctAnswer: 1,
      explanation: "It's smart to save some money first before spending. This helps you buy bigger things later!"
    },
    {
      id: 2,
      question: "What is the difference between needs and wants?",
      options: ["There is no difference", "Needs are things we must have, wants are things we would like", "Wants are more important", "Needs cost more money"],
      correctAnswer: 1,
      explanation: "Needs are essential things like food, water, and shelter. Wants are nice to have but not necessary."
    },
    {
      id: 3,
      question: "How much of your money should you try to save?",
      options: ["None", "All of it", "At least some of it", "Only when you're older"],
      correctAnswer: 2,
      explanation: "Saving at least some money helps you reach your goals and be prepared for emergencies!"
    }
  ];

  const triggerCelebration = (type: 'achievement' | 'lesson' | 'streak' | 'goal', title: string, points: number, message: string) => {
    setCelebrationData({ type, title, points, message });
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const handleCompleteLesson = (moduleId: number, lessonId: number) => {
    const newCoins = 25;
    const newPoints = 100;
    
    setGameState(prev => ({ 
      ...prev, 
      coins: prev.coins + newCoins,
      score: prev.score + newPoints,
      streakDays: prev.streakDays + 1
    }));

    triggerCelebration('lesson', 'Lesson Complete!', newPoints, `Amazing work! You earned ${newCoins} coins!`);
    
    // Check for streak achievements
    if (gameState.streakDays === 6) {
      setTimeout(() => {
        triggerCelebration('streak', 'Learning Streak!', 200, '7 days in a row! You\'re on fire!');
      }, 3500);
    }
  };

  const startCoinCountingGame = () => {
    const targetAmount = Math.floor(Math.random() * 50) + 10;
    setCoinCountingGame({
      active: true,
      targetAmount,
      currentAmount: 0,
      attempts: 0,
      score: 0,
      coins: [
        { value: 1, count: 0 },
        { value: 2, count: 0 },
        { value: 5, count: 0 },
        { value: 10, count: 0 }
      ]
    });
  };

  const startSavingsGame = () => {
    const expenses = [
      { name: "Ice Cream", cost: 15, necessary: false },
      { name: "School Lunch", cost: 20, necessary: true },
      { name: "Toy Car", cost: 25, necessary: false },
      { name: "School Books", cost: 30, necessary: true },
      { name: "Video Game", cost: 40, necessary: false },
      { name: "New Shoes", cost: 35, necessary: true }
    ];
    
    setSavingsGame({
      active: true,
      currentSavings: 0,
      goal: 100,
      week: 1,
      allowance: 50,
      expenses: expenses.sort(() => Math.random() - 0.5).slice(0, 3)
    });
  };

  const startMathQuiz = () => {
    generateMathQuestion();
    setMathQuiz(prev => ({
      ...prev,
      active: true,
      score: 0,
      questionCount: 0
    }));
  };

  const generateMathQuestion = () => {
    const operations = [
      { type: 'add', symbol: '+' },
      { type: 'subtract', symbol: '-' },
      { type: 'multiply', symbol: '×' }
    ];
    
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer, question;
    
    switch (operation.type) {
      case 'add':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        answer = num1 + num2;
        question = `₹${num1} + ₹${num2} = ?`;
        break;
      case 'subtract':
        num1 = Math.floor(Math.random() * 50) + 20;
        num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
        answer = num1 - num2;
        question = `₹${num1} - ₹${num2} = ?`;
        break;
      case 'multiply':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 * num2;
        question = `₹${num1} × ${num2} = ?`;
        break;
      default:
        num1 = 5;
        num2 = 3;
        answer = 8;
        question = `₹5 + ₹3 = ?`;
    }
    
    setMathQuiz(prev => ({
      ...prev,
      question,
      answer,
      userAnswer: ""
    }));
  };

  const updateCoinCount = (coinValue: number, increment: boolean) => {
    setCoinCountingGame(prev => {
      const newCoins = prev.coins.map(coin => {
        if (coin.value === coinValue) {
          const newCount = increment ? coin.count + 1 : Math.max(0, coin.count - 1);
          return { ...coin, count: newCount };
        }
        return coin;
      });

      const newAmount = newCoins.reduce((sum, coin) => sum + (coin.value * coin.count), 0);
      
      return {
        ...prev,
        coins: newCoins,
        currentAmount: newAmount
      };
    });
  };

  const checkCoinGame = () => {
    const newAttempts = coinCountingGame.attempts + 1;
    
    if (coinCountingGame.currentAmount === coinCountingGame.targetAmount) {
      const points = Math.max(200 - (newAttempts * 20), 50);
      triggerCelebration('achievement', 'Perfect Count!', points, 'You counted the exact amount!');
      setGameState(prev => ({ ...prev, coins: prev.coins + 50, score: prev.score + points }));
      
      // Start new round
      setTimeout(() => {
        const newTarget = Math.floor(Math.random() * 50) + 10;
        setCoinCountingGame(prev => ({
          ...prev,
          targetAmount: newTarget,
          currentAmount: 0,
          score: prev.score + points,
          attempts: 0,
          coins: prev.coins.map(c => ({ ...c, count: 0 }))
        }));
      }, 2000);
    } else {
      setCoinCountingGame(prev => ({ ...prev, attempts: newAttempts }));
      
      if (newAttempts >= 3) {
        triggerCelebration('achievement', 'Good Try!', 25, 'Keep practicing! The answer was ₹' + coinCountingGame.targetAmount);
        setTimeout(() => {
          setCoinCountingGame(prev => ({ ...prev, active: false }));
        }, 3000);
      }
    }
  };

  const handleSavingsChoice = (expense: { name: string; cost: number; necessary: boolean }, buy: boolean) => {
    setSavingsGame(prev => {
      const remaining = prev.allowance - (buy ? expense.cost : 0);
      const newSavings = prev.currentSavings + remaining;
      
      if (buy && !expense.necessary) {
        triggerCelebration('lesson', 'Think Again!', 0, `${expense.name} is a want, not a need. Try to save more!`);
      } else if (!buy && expense.necessary) {
        triggerCelebration('lesson', 'Careful!', 0, `${expense.name} is necessary. You need this!`);
      } else {
        triggerCelebration('achievement', 'Smart Choice!', 50, buy ? 'Good purchase!' : 'Great saving!');
      }

      if (prev.week >= 4) {
        setTimeout(() => {
          if (newSavings >= prev.goal) {
            triggerCelebration('goal', 'Savings Goal Achieved!', 300, `You saved ₹${newSavings}! Excellent!`);
            setGameState(prevGame => ({ ...prevGame, coins: prevGame.coins + 100 }));
          }
          setSavingsGame(prevSavings => ({ ...prevSavings, active: false }));
        }, 2000);
      }

      return {
        ...prev,
        currentSavings: newSavings,
        week: prev.week + 1,
        expenses: prev.expenses.slice(1)
      };
    });
  };

  const submitMathAnswer = () => {
    const userAnswer = parseInt(mathQuiz.userAnswer);
    const isCorrect = userAnswer === mathQuiz.answer;
    
    if (isCorrect) {
      const newScore = mathQuiz.score + 1;
      setMathQuiz(prev => ({ ...prev, score: newScore }));
      triggerCelebration('achievement', 'Correct!', 50, 'Great math skills!');
    } else {
      triggerCelebration('lesson', 'Try Again!', 0, `The answer was ₹${mathQuiz.answer}`);
    }

    const newQuestionCount = mathQuiz.questionCount + 1;
    
    if (newQuestionCount >= 5) {
      setTimeout(() => {
        const finalPoints = mathQuiz.score * 50;
        triggerCelebration('achievement', 'Math Quiz Complete!', finalPoints, `You got ${mathQuiz.score}/5 correct!`);
        setGameState(prev => ({ ...prev, coins: prev.coins + finalPoints }));
        setMathQuiz(prev => ({ ...prev, active: false }));
      }, 2000);
    } else {
      setMathQuiz(prev => ({ ...prev, questionCount: newQuestionCount }));
      setTimeout(() => {
        generateMathQuestion();
      }, 1500);
    }
  };

  const startQuiz = () => {
    setActiveQuiz(quizQuestions);
    setCurrentQuestionIndex(0);
    setQuizScore(0);
    setShowQuizResults(false);
  };

  const answerQuestion = (selectedAnswer: number) => {
    const currentQuestion = activeQuiz[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      triggerCelebration('achievement', 'Correct!', 50, currentQuestion.explanation);
    }

    setTimeout(() => {
      if (currentQuestionIndex < activeQuiz.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setShowQuizResults(true);
        const finalScore = quizScore + (isCorrect ? 1 : 0);
        const earnedCoins = finalScore * 25;
        setGameState(prev => ({ ...prev, coins: prev.coins + earnedCoins, score: prev.score + (finalScore * 100) }));
        
        setTimeout(() => {
          triggerCelebration('achievement', 'Quiz Complete!', finalScore * 100, `You got ${finalScore}/${activeQuiz.length} correct! Earned ${earnedCoins} coins!`);
        }, 1000);
      }
    }, 1500);
  };

  const updateSavingsGoal = (amount: number) => {
    setGameState(prev => {
      const newSaved = Math.min(prev.monthlySaved + amount, prev.monthlyGoal);
      const goalReached = newSaved >= prev.monthlyGoal && prev.monthlySaved < prev.monthlyGoal;
      
      if (goalReached) {
        setTimeout(() => {
          triggerCelebration('goal', 'Goal Achieved!', 500, 'You reached your monthly savings goal!');
        }, 500);
      }
      
      return { ...prev, monthlySaved: newSaved };
    });
  };

  const handleStartActivity = (activity: ActivityCard) => {
    setGameState(prev => ({ ...prev, currentGame: activity.type }));
    
    if (activity.type === 'money-game') {
      startCoinCountingGame();
    } else if (activity.type === 'quiz') {
      startQuiz();
    } else if (activity.type === 'saving-challenge') {
      startSavingsGame();
    } else if (activity.type === 'calculator') {
      startMathQuiz();
    }
  };

  const calculateOverallProgress = () => {
    const totalLessons = modules.reduce((total, module) => total + module.lessons.length, 0);
    const completedLessons = modules.reduce(
      (total, module) => total + module.lessons.filter(lesson => lesson.completed).length, 
      0
    );
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="RupeeSmart Kids - Fun Financial Learning"
        description="Interactive financial education for children with games, stories, and activities"
        keywords="kids finance, financial education, money learning, children finance"
      />
      
      <div className="px-4 py-6 max-w-7xl mx-auto">
        {selectedModule ? (
          <ModuleDetailView 
            module={selectedModule} 
            onBack={() => setSelectedModule(null)} 
            onComplete={handleCompleteLesson}
            gameState={gameState}
            setGameState={setGameState}
          />
        ) : (
          <>
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center mb-6"
            >
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
                className="mr-3"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  RupeeSmart Kids
                </h1>
                <p className="text-gray-600">Make learning about money fun and easy!</p>
              </div>
            </motion.div>

            {/* Celebration Overlay */}
            <AnimatePresence>
              {showCelebration && celebrationData && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                >
                  <motion.div
                    initial={{ scale: 0.5, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.5, y: 50 }}
                    className="bg-white rounded-2xl p-8 mx-4 max-w-md text-center shadow-2xl"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-400 flex items-center justify-center"
                    >
                      {celebrationData.type === 'achievement' && <Trophy className="w-10 h-10 text-white" />}
                      {celebrationData.type === 'lesson' && <Star className="w-10 h-10 text-white" />}
                      {celebrationData.type === 'streak' && <Flame className="w-10 h-10 text-white" />}
                      {celebrationData.type === 'goal' && <Crown className="w-10 h-10 text-white" />}
                    </motion.div>
                    
                    <motion.h2 
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      className="text-2xl font-bold text-gray-800 mb-2"
                    >
                      {celebrationData.title}
                    </motion.h2>
                    
                    <motion.p
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-gray-600 mb-4"
                    >
                      {celebrationData.message}
                    </motion.p>
                    
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center bg-yellow-100 px-4 py-2 rounded-full"
                    >
                      <Coins className="w-5 h-5 text-yellow-600 mr-2" />
                      <span className="font-bold text-yellow-800">+{celebrationData.points} points</span>
                    </motion.div>

                    <div className="mt-6 flex justify-center space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: 0 }}
                          animate={{ scale: 1, rotate: 360 }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className="w-3 h-3 bg-yellow-400 rounded-full"
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Coin Counting Game Overlay */}
            <AnimatePresence>
              {coinCountingGame.active && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                >
                  <motion.div
                    initial={{ scale: 0.8, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: 50 }}
                    className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">💰 Coin Counting Game</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCoinCountingGame(prev => ({ ...prev, active: false }))}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-center mb-6">
                      <p className="text-lg mb-2">Make exactly: <span className="font-bold text-green-600">₹{coinCountingGame.targetAmount}</span></p>
                      <p className="text-sm text-gray-600">Your amount: <span className={`font-bold ${coinCountingGame.currentAmount === coinCountingGame.targetAmount ? 'text-green-600' : 'text-red-500'}`}>₹{coinCountingGame.currentAmount}</span></p>
                      <p className="text-xs text-gray-500 mt-1">Attempts: {coinCountingGame.attempts}/3</p>
                    </div>

                    <div className="space-y-4 mb-6">
                      {coinCountingGame.coins.map((coin) => (
                        <div key={coin.value} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                              <span className="text-xs font-bold text-white">₹{coin.value}</span>
                            </div>
                            <span className="font-medium">x {coin.count}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateCoinCount(coin.value, false)}
                              disabled={coin.count === 0}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateCoinCount(coin.value, true)}
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        onClick={checkCoinGame}
                        className="flex-1 bg-green-500 hover:bg-green-600"
                      >
                        Check Answer
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setCoinCountingGame(prev => ({
                          ...prev,
                          coins: prev.coins.map(c => ({ ...c, count: 0 })),
                          currentAmount: 0
                        }))}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Savings Game Overlay */}
            <AnimatePresence>
              {savingsGame.active && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                >
                  <motion.div
                    initial={{ scale: 0.8, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">🏦 Savings Challenge</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSavingsGame(prev => ({ ...prev, active: false }))}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-center mb-6">
                      <div className="bg-green-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-600">Week {savingsGame.week}/4</p>
                        <p className="text-lg font-bold text-green-600">Weekly Allowance: ₹{savingsGame.allowance}</p>
                        <p className="text-sm">Current Savings: ₹{savingsGame.currentSavings}</p>
                        <p className="text-sm">Goal: ₹{savingsGame.goal}</p>
                      </div>
                    </div>

                    {savingsGame.expenses.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3">Should you buy this?</h4>
                        <div className="bg-blue-50 rounded-lg p-4 mb-4">
                          <h5 className="font-bold text-lg">{savingsGame.expenses[0].name}</h5>
                          <p className="text-blue-600">Cost: ₹{savingsGame.expenses[0].cost}</p>
                          <p className="text-sm text-gray-600">
                            {savingsGame.expenses[0].necessary ? "This is a NEED" : "This is a WANT"}
                          </p>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button
                            onClick={() => handleSavingsChoice(savingsGame.expenses[0], true)}
                            className="flex-1 bg-red-500 hover:bg-red-600"
                          >
                            Buy It
                          </Button>
                          <Button
                            onClick={() => handleSavingsChoice(savingsGame.expenses[0], false)}
                            className="flex-1 bg-green-500 hover:bg-green-600"
                          >
                            Save Money
                          </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Math Quiz Overlay */}
            <AnimatePresence>
              {mathQuiz.active && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                >
                  <motion.div
                    initial={{ scale: 0.8, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">🧮 Money Math Quiz</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setMathQuiz(prev => ({ ...prev, active: false }))}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-600 mb-2">Question {mathQuiz.questionCount + 1}/5</p>
                      <p className="text-sm text-green-600">Score: {mathQuiz.score} correct</p>
                    </div>

                    <div className="mb-6">
                      <div className="bg-blue-50 rounded-lg p-6 text-center mb-4">
                        <h4 className="text-2xl font-bold text-blue-800 mb-4">{mathQuiz.question}</h4>
                        <input
                          type="number"
                          value={mathQuiz.userAnswer}
                          onChange={(e) => setMathQuiz(prev => ({ ...prev, userAnswer: e.target.value }))}
                          placeholder="Enter your answer"
                          className="w-full p-3 text-lg text-center border-2 border-blue-200 rounded-lg focus:border-blue-500 outline-none"
                        />
                      </div>
                      
                      <Button
                        onClick={submitMathAnswer}
                        disabled={!mathQuiz.userAnswer}
                        className="w-full bg-blue-500 hover:bg-blue-600"
                      >
                        Submit Answer
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quiz Overlay */}
            <AnimatePresence>
              {activeQuiz.length > 0 && !showQuizResults && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                >
                  <motion.div
                    initial={{ scale: 0.8, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Money Quiz</h3>
                      <Badge variant="outline">
                        Question {currentQuestionIndex + 1} of {activeQuiz.length}
                      </Badge>
                    </div>

                    <div className="mb-6">
                      <Progress value={((currentQuestionIndex + 1) / activeQuiz.length) * 100} className="mb-4" />
                      <h4 className="text-lg font-semibold mb-4">
                        {activeQuiz[currentQuestionIndex]?.question}
                      </h4>
                      
                      <div className="space-y-3">
                        {activeQuiz[currentQuestionIndex]?.options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full text-left justify-start h-auto p-4"
                            onClick={() => answerQuestion(index)}
                          >
                            <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                              {String.fromCharCode(65 + index)}
                            </span>
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quiz Results */}
            <AnimatePresence>
              {showQuizResults && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                >
                  <motion.div
                    initial={{ scale: 0.8, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-400 flex items-center justify-center">
                      <Trophy className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
                    <p className="text-gray-600 mb-4">
                      You scored {quizScore} out of {activeQuiz.length}
                    </p>
                    
                    <div className="bg-yellow-100 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-center">
                        <Coins className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="font-bold text-yellow-800">+{quizScore * 25} coins earned!</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        setActiveQuiz([]);
                        setShowQuizResults(false);
                        setGameState(prev => ({ ...prev, currentGame: null }));
                      }}
                      className="w-full"
                    >
                      Continue Learning
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stats Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border border-gray-200 bg-white hover:shadow-md transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-gray-800">{gameState.coins}</div>
                    <div className="text-sm text-gray-600">Coins Earned</div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 bg-white hover:shadow-md transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-gray-800">{unlockedAchievements}</div>
                    <div className="text-sm text-gray-600">Badges Won</div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 bg-white hover:shadow-md transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-gray-800">{gameState.streakDays}</div>
                    <div className="text-sm text-gray-600">Learning Days</div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 bg-white hover:shadow-md transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-gray-800">{calculateOverallProgress()}%</div>
                    <div className="text-sm text-gray-600">Complete</div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Age Group Filter */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose Your Age Group</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: "all", label: "All Ages", emoji: "🌟" },
                  { key: "5-8", label: "5-8 Years", emoji: "🎈" },
                  { key: "9-12", label: "9-12 Years", emoji: "⚡" },
                  { key: "13-16", label: "13-16 Years", emoji: "🚀" }
                ].map(({ key, label, emoji }) => (
                  <Card
                    key={key}
                    className={`cursor-pointer transition-all border ${
                      activeAgeGroup === key 
                        ? "border-blue-500 bg-blue-50 shadow-md" 
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                    onClick={() => setActiveAgeGroup(key as any)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{emoji}</div>
                      <div className={`font-medium text-sm ${
                        activeAgeGroup === key ? "text-blue-700" : "text-gray-700"
                      }`}>
                        {label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            <Tabs defaultValue="modules" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-white shadow-sm rounded-lg p-1 border border-gray-200">
                <TabsTrigger 
                  value="modules" 
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all text-sm"
                >
                  📚 Learn
                </TabsTrigger>
                <TabsTrigger 
                  value="activities"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all text-sm"
                >
                  🎮 Play
                </TabsTrigger>
                <TabsTrigger 
                  value="achievements"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all text-sm"
                >
                  🏆 Rewards
                </TabsTrigger>
              </TabsList>

              {/* Learning Modules Tab */}
              <TabsContent value="modules">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Learning Modules</h2>
                  <p className="text-gray-600">Choose a topic to start learning about money!</p>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredModules.map((module, index) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="cursor-pointer"
                      onClick={() => setSelectedModule(module)}
                    >
                      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className={`${module.color} p-8 text-white relative`}>
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-white text-gray-800 font-medium text-xs">
                              {module.difficulty}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-col items-center text-center">
                            <div className="text-6xl mb-4">{module.emoji}</div>
                            <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                              <span className="text-sm font-medium">Ages {module.ageGroup}</span>
                            </div>
                          </div>
                        </div>
                        
                        <CardContent className="p-6 flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{module.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-500">Progress</span>
                              <span className="font-semibold text-gray-700">{module.progress}%</span>
                            </div>
                            <Progress value={module.progress} className="h-2" />
                            
                            <div className="flex justify-between items-center text-sm text-gray-500 pt-2">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {module.duration} min
                              </div>
                              <div className="flex items-center">
                                <BookOpen className="w-4 h-4 mr-1" />
                                {module.lessons.length} lessons
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              {/* Activities Tab */}
              <TabsContent value="activities">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Fun Activities</h2>
                  <p className="text-gray-600">Play games and complete challenges to earn coins!</p>
                </div>

                {/* Interactive Savings Goal Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <Card className="border-0 shadow-xl bg-green-400 overflow-hidden">
                    <CardContent className="p-6 text-white">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2 flex items-center">
                            🎯 Monthly Savings Challenge
                          </h3>
                          <p className="opacity-90">Save ₹{gameState.monthlyGoal} this month!</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">₹{gameState.monthlySaved}</div>
                          <div className="text-sm opacity-80">saved so far</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <Progress 
                          value={(gameState.monthlySaved / gameState.monthlyGoal) * 100} 
                          className="h-3 bg-white/20" 
                        />
                      </div>
                      
                      <div className="flex gap-3">
                        <Button
                          onClick={() => updateSavingsGoal(10)}
                          className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full"
                          variant="outline"
                        >
                          +₹10
                        </Button>
                        <Button
                          onClick={() => updateSavingsGoal(25)}
                          className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full"
                          variant="outline"
                        >
                          +₹25
                        </Button>
                        <Button
                          onClick={() => updateSavingsGoal(50)}
                          className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full"
                          variant="outline"
                        >
                          +₹50
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                >
                  {filteredActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                        <div className={`${activity.color} p-6 text-white relative`}>
                          {activity.isNew && (
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-green-500 text-white animate-pulse">
                                NEW
                              </Badge>
                            </div>
                          )}
                          <div className="flex flex-col items-center text-center">
                            <div className="text-5xl mb-3">
                              {activity.type === "money-game" ? "🎮" :
                               activity.type === "saving-challenge" ? "💰" :
                               activity.type === "quiz" ? "🧠" :
                               activity.type === "calculator" ? "🧮" :
                               activity.type === "shopping" ? "🛒" : "📖"}
                            </div>
                            <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                              <span className="text-sm font-medium">Ages {activity.ageGroup}</span>
                            </div>
                          </div>
                        </div>
                        
                        <CardContent className="p-6 flex-1">
                          <h3 className="text-lg font-bold text-gray-800 mb-2">{activity.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                          
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <Badge 
                                variant="outline"
                                className={
                                  activity.difficulty === "easy" ? "border-green-300 text-green-700 bg-green-50" :
                                  activity.difficulty === "medium" ? "border-yellow-300 text-yellow-700 bg-yellow-50" :
                                  "border-red-300 text-red-700 bg-red-50"
                                }
                              >
                                {activity.difficulty}
                              </Badge>
                              <div className="flex items-center text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                                <Coins className="w-4 h-4 mr-1" />
                                <span className="text-sm font-medium">{activity.points} coins</span>
                              </div>
                            </div>
                            
                            <Button 
                              className="w-full bg-purple-500 hover:bg-purple-600 rounded-xl"
                              onClick={() => handleStartActivity(activity)}
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Start Activity
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Achievements</h2>
                  <p className="text-gray-600">Earn badges and points by completing lessons and activities!</p>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Achievement Stats */}
                  <Card className="border-0 shadow-xl bg-yellow-400 overflow-hidden">
                    <CardContent className="p-8 text-white">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                          <div className="text-4xl mb-2">🏆</div>
                          <div className="text-3xl font-bold">{unlockedAchievements}</div>
                          <div className="opacity-90">Badges Earned</div>
                        </div>
                        <div>
                          <div className="text-4xl mb-2">⭐</div>
                          <div className="text-3xl font-bold">{totalPoints}</div>
                          <div className="opacity-90">Total Points</div>
                        </div>
                        <div>
                          <div className="text-4xl mb-2">🎯</div>
                          <div className="text-3xl font-bold">{achievements.length - unlockedAchievements}</div>
                          <div className="opacity-90">Goals Left</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Achievements Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={`border-0 shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                          achievement.unlocked 
                            ? "bg-yellow-50 hover:shadow-xl" 
                            : "bg-gray-50 hover:shadow-md"
                        }`}>
                          <CardContent className="p-6 text-center">
                            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                              achievement.unlocked 
                                ? "bg-yellow-400 text-white shadow-lg" 
                                : "bg-gray-200 text-gray-400"
                            }`}>
                              <achievement.icon className="w-10 h-10" />
                            </div>
                            
                            <h3 className={`font-bold text-lg mb-2 ${
                              achievement.unlocked ? "text-gray-800" : "text-gray-500"
                            }`}>
                              {achievement.title}
                            </h3>
                            
                            <p className={`text-sm mb-4 ${
                              achievement.unlocked ? "text-gray-600" : "text-gray-400"
                            }`}>
                              {achievement.description}
                            </p>
                            
                            {achievement.unlocked ? (
                              <div className="space-y-2">
                                <Badge className="bg-green-500 text-white">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Unlocked {achievement.date}
                                </Badge>
                                <div className="flex items-center justify-center text-yellow-600">
                                  <Coins className="w-4 h-4 mr-1" />
                                  +{achievement.points} points
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                  <span>Progress</span>
                                  <span>{achievement.progress}%</span>
                                </div>
                                <Progress value={achievement.progress} className="h-2" />
                                <Badge variant="outline" className="text-gray-500">
                                  <Lock className="w-3 h-3 mr-1" />
                                  {achievement.points} points when unlocked
                                </Badge>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}

// Enhanced Module Detail View
function ModuleDetailView({ 
  module,
  onBack,
  onComplete,
  gameState,
  setGameState
}: { 
  module: LearningModule;
  onBack: () => void;
  onComplete: (moduleId: number, lessonId: number) => void;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}) {
  const { toast } = useToast();

  const handleStartLesson = (lesson: Lesson) => {
    if (lesson.completed) return;
    
    // Simulate lesson completion
    setTimeout(() => {
      onComplete(module.id, lesson.id);
      setGameState(prev => ({ 
        ...prev, 
        coins: prev.coins + 25,
        score: prev.score + 100 
      }));
      
      toast({
        title: "Lesson Completed! 🎉",
        description: `Great job! You earned 25 coins and 100 points.`,
      });
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{module.title}</h1>
          <p className="text-gray-600">{module.description}</p>
        </div>
      </div>

      {/* Module Info Card */}
      <Card className="border-0 shadow-xl overflow-hidden">
        <div className={`h-40 ${module.color} relative rounded-t-lg`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl">{module.emoji}</span>
          </div>
          <div className="absolute top-6 right-6">
            <Badge className="bg-white text-gray-800 font-medium">
              Ages {module.ageGroup}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span className="font-semibold">{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="h-3" />
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-3">What You'll Learn:</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  {module.lessons.map((lesson, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                      {lesson.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <div className="font-semibold">{module.duration} minutes</div>
                <div className="text-sm text-gray-600">Total duration</div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="font-semibold">{module.lessons.length} lessons</div>
                <div className="text-sm text-gray-600">In this module</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lessons */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Module Lessons</h2>
        
        {module.lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`border-0 shadow-md hover:shadow-lg transition-all ${
              lesson.completed ? "bg-green-50" : "bg-white"
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      lesson.completed 
                        ? "bg-green-500 text-white" 
                        : "bg-gray-200 text-gray-600"
                    }`}>
                      {lesson.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="font-semibold">{index + 1}</span>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg">{lesson.title}</h3>
                      <p className="text-gray-600 text-sm">{lesson.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          {lesson.type === "story" && <BookOpen className="w-4 h-4 mr-1" />}
                          {lesson.type === "game" && <Gamepad2 className="w-4 h-4 mr-1" />}
                          {lesson.type === "quiz" && <Target className="w-4 h-4 mr-1" />}
                          {lesson.type === "video" && <Play className="w-4 h-4 mr-1" />}
                          {lesson.type === "activity" && <Star className="w-4 h-4 mr-1" />}
                          <span className="capitalize">{lesson.type}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {lesson.duration} min
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleStartLesson(lesson)}
                    disabled={lesson.completed}
                    className={lesson.completed ? "bg-green-500" : ""}
                  >
                    {lesson.completed ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Lesson
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}