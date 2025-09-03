import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Puzzle, ArrowLeft, CheckCircle, XCircle, Trophy, Star, 
  Search, Shuffle, Target, TrendingUp, Brain, Clock,
  RotateCcw, Lightbulb, Award, Zap, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import InvestmentPuzzlesDashboard from './InvestmentPuzzlesDashboard';

// Puzzle data with Indian financial terms
const crypticClues = [
  {
    id: 1,
    clue: "India's premier market pointer (5 letters)",
    answer: "NIFTY",
    options: ["NIFTY", "SENSEX", "INDEX", "STOCK"],
    explanation: "NIFTY 50 is India's benchmark stock market index representing the top 50 companies."
  },
  {
    id: 2,
    clue: "Secure savings with time lock (2 letters)",
    answer: "FD",
    options: ["FD", "RD", "CD", "BD"],
    explanation: "Fixed Deposit (FD) locks your money for a specific time period at guaranteed returns."
  },
  {
    id: 3,
    clue: "Royal returns from company profits (8 letters)",
    answer: "DIVIDEND",
    options: ["DIVIDEND", "INTEREST", "RETURNS", "PROFITS"],
    explanation: "Dividends are payments made by companies to shareholders from their profits."
  },
  {
    id: 4,
    clue: "A metal that shines in portfolio during market storms (4 letters)",
    answer: "GOLD",
    options: ["GOLD", "SILVER", "COPPER", "STEEL"],
    explanation: "Gold is considered a safe haven asset during market volatility and economic uncertainty."
  },
  {
    id: 5,
    clue: "Guardian of Indian markets (4 letters)",
    answer: "SEBI",
    options: ["SEBI", "RBI", "NSE", "BSE"],
    explanation: "SEBI (Securities and Exchange Board of India) regulates India's capital markets."
  },
  {
    id: 6,
    clue: "Monthly discipline that compounds wealth (3 letters)",
    answer: "SIP",
    options: ["SIP", "EMI", "PPF", "EPF"],
    explanation: "SIP (Systematic Investment Plan) allows regular monthly investments in mutual funds."
  },
  {
    id: 7,
    clue: "Tax-saving trio that builds retirement (3 letters)",
    answer: "PPF",
    options: ["PPF", "EPF", "NSC", "KVP"],
    explanation: "PPF (Public Provident Fund) offers tax benefits and long-term wealth creation."
  },
  {
    id: 8,
    clue: "Street's favorite measure of company value (2 letters)",
    answer: "PE",
    options: ["PE", "PB", "ROE", "EPS"],
    explanation: "P/E (Price-to-Earnings) ratio helps evaluate if a stock is overvalued or undervalued."
  }
];

const marketTerms = [
  {
    term: "BULL MARKET",
    definition: "A period of rising stock prices and investor optimism",
    category: "Market Trends"
  },
  {
    term: "BEAR MARKET",
    definition: "A period of falling stock prices and pessimism",
    category: "Market Trends"
  },
  {
    term: "MUTUAL FUND",
    definition: "Pooled investment vehicle managed by professionals",
    category: "Investment Products"
  },
  {
    term: "DEMAT ACCOUNT",
    definition: "Electronic account for holding securities in digital form",
    category: "Trading Infrastructure"
  },
  {
    term: "VOLATILITY",
    definition: "Measure of price fluctuation in financial instruments",
    category: "Risk Metrics"
  },
  {
    term: "PORTFOLIO",
    definition: "Collection of investments held by an individual",
    category: "Investment Management"
  }
];

const wordSearchGrid = [
  ['S', 'P', '5', '0', '0', 'P', 'O', 'R'],
  ['S', 'E', 'C', 'X', 'N', 'A', 'S', 'D'],
  ['M', 'U', 'T', 'U', 'A', 'L', 'F', 'F'],
  ['D', 'I', 'V', 'I', 'D', 'E', 'N', 'D'],
  ['F', 'D', 'D', 'C', 'A', 'G', 'O', 'L'],
  ['G', 'O', 'L', 'D', 'E', 'T', 'F', 'D'],
  ['B', 'U', 'L', 'L', 'M', 'A', 'R', 'K'],
  ['S', 'T', 'O', 'C', 'K', '4', '0', '1']
];

const wordsToFind = ['SP500', 'SEC', 'MUTUAL', 'DIVIDEND', 'DCA', 'GOLD', 'BULL', 'STOCK'];

const wordDefinitions = {
  'SP500': {
    term: 'S&P 500',
    definition: 'America\'s benchmark stock market index representing the top 500 companies by market capitalization.',
    icon: '📈',
    color: 'from-blue-500 to-cyan-500'
  },
  'SEC': {
    term: 'SEC',
    definition: 'Securities and Exchange Commission - the regulatory authority for America\'s capital markets.',
    icon: '🛡️',
    color: 'from-green-500 to-emerald-500'
  },
  'MUTUAL': {
    term: 'Mutual Fund',
    definition: 'A pooled investment vehicle where multiple investors contribute money managed by professionals.',
    icon: '🏦',
    color: 'from-purple-500 to-violet-500'
  },
  'DIVIDEND': {
    term: 'Dividend',
    definition: 'Cash payments made by companies to shareholders from their profits as a reward for investing.',
    icon: '💰',
    color: 'from-yellow-500 to-orange-500'
  },
  'DCA': {
    term: 'DCA',
    definition: 'Dollar-Cost Averaging - allows regular monthly investments in funds and stocks for wealth building.',
    icon: '🔄',
    color: 'from-indigo-500 to-purple-500'
  },
  'GOLD': {
    term: 'Gold Investment',
    definition: 'A precious metal considered a safe haven asset during market volatility and economic uncertainty.',
    icon: '✨',
    color: 'from-yellow-400 to-yellow-600'
  },
  'BULL': {
    term: 'Bull Market',
    definition: 'A period of rising stock prices and investor optimism, characterized by sustained upward trends.',
    icon: '🐂',
    color: 'from-green-400 to-green-600'
  },
  'STOCK': {
    term: 'Stock',
    definition: 'A share representing ownership in a company, entitling the holder to dividends and voting rights.',
    icon: '📊',
    color: 'from-red-500 to-pink-500'
  }
};

const financialRatios = [
  {
    name: "P/E Ratio",
    formula: "Stock Price ÷ Earnings Per Share",
    description: "Measures how much investors pay per rupee of earnings",
    example: { price: 100, eps: 5, answer: 20 }
  },
  {
    name: "Debt-to-Equity",
    formula: "Total Debt ÷ Total Equity",
    description: "Shows company's financial leverage",
    example: { debt: 50, equity: 100, answer: 0.5 }
  },
  {
    name: "ROE",
    formula: "Net Income ÷ Shareholders' Equity × 100",
    description: "Return on Equity - profitability measure",
    example: { income: 20, equity: 100, answer: 20 }
  }
];

// Open maze with multiple paths - life has many choices!
const investmentMaze = [
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 0, 1, 0, 0]
];

// Multiple starting paths with hidden consequences
const lifeStartingPaths = [
  {
    id: "conservative_saver",
    name: "The Conservative Saver",
    description: "Focus on safety and guaranteed returns",
    hiddenTraits: ["risk_averse", "steady_growth", "emergency_prepared"],
    futureEvents: ["market_crash_advantage", "missed_growth_opportunities", "family_safety_net"]
  },
  {
    id: "aggressive_investor", 
    name: "The Risk Taker",
    description: "High risk, high reward investment strategy",
    hiddenTraits: ["risk_tolerant", "volatile_returns", "growth_focused"],
    futureEvents: ["market_boom_advantage", "crash_vulnerability", "early_retirement_potential"]
  },
  {
    id: "balanced_planner",
    name: "The Balanced Planner", 
    description: "Mix of safety and growth investments",
    hiddenTraits: ["moderate_risk", "diversified", "steady_progress"],
    futureEvents: ["stable_growth", "moderate_setbacks", "consistent_progress"]
  }
];

const lifeJourneyScenarios = [
  // Starting Point - Multiple early choices
  {
    x: 0, y: 0, 
    stage: "Life Path Choice",
    age: 22,
    scenario: "🎓 You just graduated! Before making specific financial decisions, you need to choose your overall life approach. This choice will shape all your future opportunities and challenges.",
    question: "Choose your financial personality (you won't see what happens next!):",
    options: [
      { text: "The Conservative Saver - Play it safe", impact: "conservative", points: 0, pathId: "conservative_saver" },
      { text: "The Risk Taker - High risk, high reward", impact: "aggressive", points: 0, pathId: "aggressive_investor" },
      { text: "The Balanced Planner - Mix of safety and growth", impact: "balanced", points: 0, pathId: "balanced_planner" }
    ],
    feedback: {
      conservative: "🛡️ You've chosen the path of safety and security. Your future will have stability but also some surprises...",
      aggressive: "🚀 You've chosen the high-risk path. Prepare for a wild financial roller coaster with unexpected twists!",
      balanced: "⚖️ You've chosen the middle path. Steady progress awaits, but life will still throw curveballs..."
    }
  },

  // Early Career - Row 1 choices
  {
    x: 2, y: 0,
    stage: "First Job Decisions",
    age: 23,
    scenario: "💼 Six months into your first job, you're earning ₹45,000/month. Your manager offers overtime work for extra ₹15,000/month, but it means 60-hour weeks.",
    question: "Work-life balance vs money?",
    options: [
      { text: "Take overtime - build wealth early", impact: "money_focused", points: 15 },
      { text: "Maintain work-life balance", impact: "balanced", points: 10 },
      { text: "Use free time for skill development", impact: "growth_focused", points: 20 }
    ],
    feedback: {
      money_focused: "💰 Short-term gain but potential burnout risks ahead...",
      balanced: "⚖️ Sustainable approach, but slower wealth building...",
      growth_focused: "📚 Investment in yourself - this will pay dividends later!"
    }
  },

  {
    x: 5, y: 0,
    stage: "Peer Pressure",
    age: 24,
    scenario: "🎉 Your friends are upgrading to iPhones and branded clothes. Social media shows everyone's luxurious lifestyle. You feel left out with your basic phone and clothes.",
    question: "Social pressure vs financial discipline?",
    options: [
      { text: "Buy iPhone and branded items on EMI", impact: "lifestyle_inflation", points: -15 },
      { text: "Compromise - buy mid-range phone, basic brands", impact: "moderate", points: 0 },
      { text: "Stick to basics, focus on savings", impact: "disciplined", points: 25 }
    ],
    feedback: {
      lifestyle_inflation: "📱 You fit in socially but EMIs are eating your salary...",
      moderate: "👕 Reasonable compromise between wants and needs...",
      disciplined: "💪 Strong willpower! Your future self will thank you."
    }
  },

  {
    x: 6, y: 0,
    stage: "Investment Learning",
    age: 24,
    scenario: "📚 A financial literacy workshop at your office teaches about SIPs and compound interest. The trainer shows how ₹5,000 monthly SIP can become ₹1 crore in 20 years.",
    question: "Time to start investing?",
    options: [
      { text: "Start ₹10,000 monthly SIP immediately", impact: "aggressive_sip", points: 30 },
      { text: "Start ₹5,000 monthly SIP", impact: "moderate_sip", points: 20 },
      { text: "Wait until salary increases", impact: "delayed_start", points: -5 }
    ],
    feedback: {
      aggressive_sip: "🚀 Ambitious start! Compound interest is now your best friend.",
      moderate_sip: "📈 Good beginning - consistency is key to wealth building.",
      delayed_start: "⏰ Time is money in investments - you're losing precious years!"
    }
  },

  // Mid-twenties challenges - Row 2
  {
    x: 0, y: 1,
    stage: "Family Responsibilities",
    age: 25,
    scenario: "👨‍👩‍👧‍👦 Your father needs ₹3L for a medical procedure. Family looks to you as the earning member. Your savings are ₹2L and you have ongoing SIPs.",
    question: "Family emergency vs investment goals?",
    options: [
      { text: "Stop SIP, use all savings for father", impact: "family_first", points: 10 },
      { text: "Use ₹1.5L, take personal loan for rest", impact: "balanced_support", points: 15 },
      { text: "Ask relatives to contribute, minimize impact", impact: "collaborative", points: 20 }
    ],
    pathSpecific: {
      conservative_saver: {
        scenario: "👨‍👩‍👧‍👦 Your disciplined saving paid off! You have ₹4L in FDs. Father needs ₹3L surgery. Your conservative approach gives you options.",
        options: [
          { text: "Break ₹3L FD, pay penalty but help family", impact: "family_sacrifice", points: 20 },
          { text: "Use ₹2L from FD, arrange ₹1L from relatives", impact: "smart_planning", points: 25 },
          { text: "Take loan against FD at lower interest", impact: "financial_wisdom", points: 30 }
        ]
      }
    }
  },

  {
    x: 4, y: 1,
    stage: "Career Crossroads",
    age: 26,
    scenario: "🎯 You get two job offers: 1) ₹80K/month at stable MNC, 2) ₹60K + equity at promising startup. Your current salary is ₹55K.",
    question: "Stability vs opportunity?",
    options: [
      { text: "Join MNC for higher fixed salary", impact: "stability_choice", points: 15 },
      { text: "Join startup for equity upside", impact: "risk_taking", points: 25 },
      { text: "Negotiate with current company", impact: "loyalty_play", points: 10 }
    ],
    pathSpecific: {
      aggressive_investor: {
        scenario: "🚀 Your risk-taking reputation opened doors! The startup founder personally headhunted you, offering ₹65K + 0.1% equity. The company just raised Series A funding.",
        options: [
          { text: "Join startup - equity could be worth millions", impact: "equity_bet", points: 40 },
          { text: "Negotiate for ₹70K + 0.05% equity", impact: "balanced_risk", points: 25 },
          { text: "Stay safe at current job with increment", impact: "missed_opportunity", points: 5 }
        ]
      }
    }
  },

  // Late twenties - relationship and major decisions
  {
    x: 2, y: 2,
    stage: "Relationship Finances",
    age: 28,
    scenario: "💕 You're in a serious relationship. Your partner earns ₹70K, you earn ₹90K. Discussion about marriage, combined finances, and future planning begins.",
    question: "Financial compatibility approach?",
    options: [
      { text: "Keep finances separate even after marriage", impact: "independent", points: 10 },
      { text: "Combine everything - joint accounts and goals", impact: "unified", points: 20 },
      { text: "Hybrid - joint goals, separate fun money", impact: "balanced_approach", points: 25 }
    ]
  },

  {
    x: 6, y: 2,
    stage: "Real Estate Temptation",
    age: 29,
    scenario: "🏠 Property prices in your city have risen 20% this year. Friends are buying houses with loans. You have ₹8L savings. A 2BHK costs ₹60L.",
    question: "To buy or not to buy?",
    options: [
      { text: "Buy house with maximum loan", impact: "property_purchase", points: 5 },
      { text: "Wait and continue renting, invest the difference", impact: "rent_invest", points: 20 },
      { text: "Buy smaller 1BHK with lower EMI burden", impact: "conservative_buy", points: 15 }
    ]
  },

  // Early thirties - major life changes
  {
    x: 1, y: 3,
    stage: "Marriage Expenses",
    age: 30,
    scenario: "💍 Wedding planning is in full swing! Costs are spiraling: venue ₹5L, catering ₹3L, photography ₹1L, shopping ₹2L. Families have expectations.",
    question: "Wedding budget philosophy?",
    options: [
      { text: "Grand wedding ₹15L - once in lifetime", impact: "lavish_wedding", points: -10 },
      { text: "Moderate wedding ₹8L - balance expectations", impact: "balanced_wedding", points: 10 },
      { text: "Simple ceremony ₹3L - invest the rest", impact: "frugal_wedding", points: 25 }
    ]
  },

  {
    x: 5, y: 3,
    stage: "Dual Income Planning",
    age: 31,
    scenario: "👫 Both partners are earning well now - combined ₹2L/month. Time to optimize your financial strategy as a couple.",
    question: "Joint financial strategy?",
    options: [
      { text: "Aggressive investing - 70% of income to investments", impact: "aggressive_couple", points: 30 },
      { text: "Balanced approach - 50% savings, 50% lifestyle", impact: "balanced_couple", points: 20 },
      { text: "Enjoy life now - 30% savings, 70% experiences", impact: "lifestyle_couple", points: 5 }
    ]
  },

  // Mid-thirties challenges
  {
    x: 0, y: 4,
    stage: "Child Planning",
    age: 33,
    scenario: "👶 Planning for a baby! Need to factor in maternity costs ₹2L, baby expenses ₹15K/month, childcare ₹25K/month after maternity leave.",
    question: "Financial preparation for parenthood?",
    options: [
      { text: "Build ₹10L child fund before conceiving", impact: "well_prepared", points: 25 },
      { text: "Start child fund now, adjust expenses later", impact: "adaptive", points: 15 },
      { text: "Have baby, figure out finances on the go", impact: "wing_it", points: -5 }
    ]
  },

  {
    x: 4, y: 4,
    stage: "Career Peak Decisions",
    age: 35,
    scenario: "🎯 You're offered a VP role with ₹3L/month salary but requires relocation to Bangalore. Current salary is ₹1.8L in your hometown.",
    question: "Career vs comfort zone?",
    options: [
      { text: "Take VP role - accelerate career and income", impact: "career_acceleration", points: 30 },
      { text: "Negotiate remote VP role with lower salary", impact: "remote_negotiation", points: 20 },
      { text: "Stay put - prioritize family stability", impact: "stability_priority", points: 10 }
    ]
  },

  // Late thirties - wealth accumulation phase
  {
    x: 2, y: 5,
    stage: "Investment Diversification",
    age: 37,
    scenario: "📊 Your portfolio has grown to ₹25L. Financial advisor suggests diversifying into international markets, REITs, and alternative investments.",
    question: "Portfolio evolution strategy?",
    options: [
      { text: "Diversify globally - add US stocks, REITs", impact: "global_diversification", points: 25 },
      { text: "Stick to Indian markets - add bonds and gold", impact: "domestic_focus", points: 15 },
      { text: "Keep it simple - just equity and debt funds", impact: "simple_portfolio", points: 10 }
    ]
  },

  {
    x: 6, y: 5,
    stage: "Child Education Planning",
    age: 38,
    scenario: "🎓 Your 5-year-old shows academic promise. Good private schools cost ₹2L/year now, engineering colleges will cost ₹25L in 13 years.",
    question: "Education funding strategy?",
    options: [
      { text: "Start aggressive education fund ₹25K/month", impact: "education_focused", points: 25 },
      { text: "Moderate fund ₹15K/month, use general investments", impact: "balanced_education", points: 15 },
      { text: "General wealth building, decide funding later", impact: "delayed_planning", points: 0 }
    ]
  },

  // Early forties - pre-retirement acceleration
  {
    x: 1, y: 6,
    stage: "Mid-life Financial Check",
    age: 42,
    scenario: "🔍 Financial health check reveals you have ₹75L in investments. Target is ₹3Cr by 50 for comfortable retirement at 55.",
    question: "Retirement acceleration strategy?",
    options: [
      { text: "Increase SIP by 50%, cut lifestyle expenses", impact: "retirement_focused", points: 30 },
      { text: "Maintain current pace, extend working years", impact: "extended_career", points: 15 },
      { text: "Take calculated risks - start side business", impact: "entrepreneurial", points: 25 }
    ]
  },

  {
    x: 3, y: 6,
    stage: "Property Investment",
    age: 44,
    scenario: "🏢 Commercial real estate opportunity - ₹50L investment for shop in prime location. Expected rental yield 8% per year.",
    question: "Real estate diversification?",
    options: [
      { text: "Invest ₹50L in commercial property", impact: "property_investor", points: 20 },
      { text: "Invest ₹25L, keep ₹25L in equity", impact: "mixed_investment", points: 15 },
      { text: "Skip property, focus on equity for liquidity", impact: "equity_focused", points: 10 }
    ]
  },

  {
    x: 5, y: 6,
    stage: "Legacy Planning",
    age: 46,
    scenario: "📜 Wealth has grown significantly. Financial planner suggests estate planning, will creation, and tax optimization strategies.",
    question: "Wealth preservation approach?",
    options: [
      { text: "Comprehensive estate planning with trusts", impact: "sophisticated_planning", points: 25 },
      { text: "Basic will and nominee updates", impact: "basic_planning", points: 15 },
      { text: "Focus on wealth growth first, plan later", impact: "growth_priority", points: 10 }
    ]
  },

  // Final stretch - retirement preparation
  {
    x: 7, y: 6,
    stage: "FIRE Achievement",
    age: 50,
    scenario: "🏖️ You've reached your financial independence milestone! Time to evaluate your life choices and plan your next phase.",
    question: "Your retirement lifestyle?",
    options: [
      { text: "Early retirement - travel and pursue passions", impact: "fire_achieved", points: 50 },
      { text: "Semi-retirement - consulting and part-time work", impact: "gradual_transition", points: 30 },
      { text: "Continue working - build generational wealth", impact: "wealth_builder", points: 40 }
    ]
  }
];

const InvestmentPuzzles: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'cryptic' | 'terms' | 'wordsearch' | 'matching' | 'ratios' | 'maze'>('dashboard');
  const [currentClue, setCurrentClue] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [dailyScore, setDailyScore] = useState(0);
  const [matchingPairs, setMatchingPairs] = useState<{[key: string]: string}>({});
  const [completedPuzzles, setCompletedPuzzles] = useState<string[]>([]);
  
  // Word Search state
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<{row: number, col: number}[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showWordDefinition, setShowWordDefinition] = useState<string | null>(null);
  
  // Term matching state
  const [draggedTerm, setDraggedTerm] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<{[key: string]: string}>({});
  
  // Financial ratios state
  const [currentRatio, setCurrentRatio] = useState(0);
  const [ratioAnswer, setRatioAnswer] = useState('');
  const [ratioResults, setRatioResults] = useState<boolean[]>([]);
  
  // Life Journey Maze state
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [journeyCompleted, setJourneyCompleted] = useState(false);
  const [currentScenario, setCurrentScenario] = useState<number | null>(null);
  const [playerChoices, setPlayerChoices] = useState<{[key: number]: {choice: number, impact: string, points: number}}>({});
  const [totalLifePoints, setTotalLifePoints] = useState(0);
  const [financialProfile, setFinancialProfile] = useState({
    age: 22,
    netWorth: 0,
    monthlyIncome: 40000,
    emergencyFund: 0,
    investments: 0,
    lifestyle: "minimal"
  });
  const [journeyHistory, setJourneyHistory] = useState<string[]>([]);
  const [showDetailedFeedback, setShowDetailedFeedback] = useState(false);
  const [chosenPath, setChosenPath] = useState<string | null>(null);
  const [pathTraits, setPathTraits] = useState<string[]>([]);
  const [randomEvents, setRandomEvents] = useState<string[]>([]);

  // Daily rotation logic
  const today = new Date().toDateString();
  const [dailyPuzzles, setDailyPuzzles] = useState(() => {
    // Rotate puzzles based on date for daily challenges
    const dayIndex = new Date().getDate() % crypticClues.length;
    return crypticClues.slice(dayIndex).concat(crypticClues.slice(0, dayIndex));
  });

  const handleAnswerSubmit = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === dailyPuzzles[currentClue].answer;
    if (isCorrect) {
      setScore(score + 10);
      setStreak(streak + 1);
      setDailyScore(dailyScore + 10);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentClue < dailyPuzzles.length - 1) {
        setCurrentClue(currentClue + 1);
        setSelectedAnswer('');
        setShowResult(false);
      } else {
        // Puzzle completed
        setCompletedPuzzles([...completedPuzzles, 'cryptic']);
      }
    }, 2000);
  };

  const resetPuzzle = () => {
    setCurrentClue(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setStreak(0);
  };

  const renderCrypticClues = () => {
    const clue = dailyPuzzles[currentClue];
    
    return (
      <div className="space-y-6">
        {/* Progress and Score */}
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-gray-700">
              Question {currentClue + 1} of {dailyPuzzles.length}
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentClue + 1) / dailyPuzzles.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Score: {score}
            </div>
            <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
              Streak: {streak}
            </div>
          </div>
        </div>

        {/* Current Clue */}
        <motion.div
          key={currentClue}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cryptic Clue</h3>
              <p className="text-gray-700 text-lg italic">{clue.clue}</p>
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-3">
            {clue.options.map((option, index) => (
              <motion.button
                key={option}
                onClick={() => handleAnswerSubmit(option)}
                disabled={showResult}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  showResult
                    ? option === clue.answer
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : option === selectedAnswer
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-gray-100 border-gray-300 text-gray-600'
                    : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                }`}
                whileHover={{ scale: showResult ? 1 : 1.02 }}
                whileTap={{ scale: showResult ? 1 : 0.98 }}
              >
                <div className="font-semibold">{option}</div>
              </motion.button>
            ))}
          </div>

          {/* Result Display */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  {selectedAnswer === clue.answer ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                  <span className={`font-bold text-lg ${
                    selectedAnswer === clue.answer ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {selectedAnswer === clue.answer ? 'Correct!' : 'Incorrect!'}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{clue.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={resetPuzzle}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </Button>
        </div>
      </div>
    );
  };

  const renderMarketTerms = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [showDefinition, setShowDefinition] = useState<{[key: string]: boolean}>({});
    
    const categories = ['all', ...Array.from(new Set(marketTerms.map(t => t.category)))];
    const filteredTerms = selectedCategory === 'all' 
      ? marketTerms 
      : marketTerms.filter(t => t.category === selectedCategory);

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">📊 Market Terms Dictionary</h3>
          <p className="text-gray-600">Learn essential financial terms by category</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All Terms' : category}
            </button>
          ))}
        </div>

        {/* Terms Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredTerms.map((term, index) => (
            <motion.div
              key={term.term}
              className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-all cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowDefinition(prev => ({
                ...prev,
                [term.term]: !prev[term.term]
              }))}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-gray-900">{term.term}</h4>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {term.category}
                </span>
              </div>
              <AnimatePresence>
                {showDefinition[term.term] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-gray-700 text-sm border-t border-gray-200 pt-2"
                  >
                    {term.definition}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderTermMatching = () => {
    const handleDrop = (definition: string, term: string) => {
      const correctTerm = marketTerms.find(t => t.definition === definition)?.term;
      if (correctTerm === term) {
        setMatchedPairs(prev => ({ ...prev, [term]: definition }));
        setScore(score + 10);
      }
    };

    const isMatched = (term: string) => matchedPairs[term];
    const allMatched = Object.keys(matchedPairs).length === marketTerms.length;

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">🔄 Term Matching Challenge</h3>
          <p className="text-gray-600">Click terms and definitions to match them</p>
          <div className="text-sm text-blue-600 mt-2">
            Matched: {Object.keys(matchedPairs).length}/{marketTerms.length}
          </div>
        </div>

        {allMatched && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-100 border border-green-300 rounded-xl p-4 text-center"
          >
            <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-bold text-green-800">Perfect Match! 🎉</h4>
            <p className="text-green-700 text-sm">You've matched all terms correctly!</p>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Terms */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-4 h-4 bg-blue-500 rounded"></span>
              Terms
            </h4>
            {marketTerms.map((item) => (
              <motion.div
                key={item.term}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  isMatched(item.term)
                    ? 'bg-green-100 text-green-800 border-2 border-green-300'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
                whileHover={{ scale: isMatched(item.term) ? 1 : 1.02 }}
                onClick={() => !isMatched(item.term) && setDraggedTerm(item.term)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.term}</span>
                  {isMatched(item.term) && <CheckCircle className="w-4 h-4" />}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Definitions */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-4 h-4 bg-purple-500 rounded"></span>
              Definitions
            </h4>
            {marketTerms.map((item) => {
              const matchedTerm = Object.keys(matchedPairs).find(term => matchedPairs[term] === item.definition);
              return (
                <div
                  key={item.definition}
                  className={`p-3 rounded-lg border-2 border-dashed min-h-[60px] flex items-center cursor-pointer transition-all ${
                    matchedTerm
                      ? 'bg-green-100 border-green-300'
                      : draggedTerm
                      ? 'border-purple-400 bg-purple-50 hover:bg-purple-100'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                  onClick={() => {
                    if (draggedTerm && !matchedTerm) {
                      handleDrop(item.definition, draggedTerm);
                      setDraggedTerm(null);
                    }
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-gray-700 text-sm">{item.definition}</span>
                    {matchedTerm && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-700 font-medium text-sm">{matchedTerm}</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={() => {
              setMatchedPairs({});
              setDraggedTerm(null);
            }}
            variant="outline"
            className="flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </div>
    );
  };

  const renderWordSearch = () => {
    const handleCellClick = (row: number, col: number) => {
      const cellKey = `${row}-${col}`;
      if (selectedCells.find(c => c.row === row && c.col === col)) {
        return; // Already selected
      }
      
      if (!isSelecting) {
        setSelectedCells([{ row, col }]);
        setIsSelecting(true);
      } else {
        const newSelection = [...selectedCells, { row, col }];
        setSelectedCells(newSelection);
        
        // Check if word is found
        const selectedWord = newSelection.map(c => wordSearchGrid[c.row][c.col]).join('');
        if (wordsToFind.includes(selectedWord) && !foundWords.includes(selectedWord)) {
          setFoundWords([...foundWords, selectedWord]);
          setScore(score + 15);
          setSelectedCells([]);
          setIsSelecting(false);
          
          // Show educational message
          setShowWordDefinition(selectedWord);
          setTimeout(() => setShowWordDefinition(null), 4000);
        }
      }
    };

    const resetSelection = () => {
      setSelectedCells([]);
      setIsSelecting(false);
    };

    const isSelected = (row: number, col: number) => 
      selectedCells.some(c => c.row === row && c.col === col);

    const isFoundWord = (row: number, col: number) => {
      // Check if this cell is part of any found word
      return foundWords.some(word => {
        // This is simplified - in a real implementation you'd track word positions
        return false;
      });
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">📝 Financial Word Search</h3>
          <p className="text-gray-600">Find hidden investment terms in the grid</p>
          <div className="text-sm text-blue-600 mt-2">
            Found: {foundWords.length}/{wordsToFind.length} words
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Word Grid */}
          <div className="flex-1 relative">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="grid grid-cols-8 gap-1 max-w-md mx-auto">
                {wordSearchGrid.map((row, rowIndex) =>
                  row.map((letter, colIndex) => (
                    <motion.button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      className={`w-8 h-8 border border-gray-300 flex items-center justify-center text-sm font-mono font-bold transition-all ${
                        isSelected(rowIndex, colIndex)
                          ? 'bg-blue-500 text-white'
                          : isFoundWord(rowIndex, colIndex)
                          ? 'bg-green-200 text-green-800'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {letter}
                    </motion.button>
                  ))
                )}
              </div>
              
              <div className="flex gap-4 justify-center mt-4">
                <Button onClick={resetSelection} variant="outline" size="sm">
                  Reset Selection
                </Button>
              </div>
            </div>

            {/* Flashy Educational Message */}
            <AnimatePresence>
              {showWordDefinition && wordDefinitions[showWordDefinition as keyof typeof wordDefinitions] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: -50 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center z-50"
                >
                  <motion.div
                    className={`bg-gradient-to-br ${wordDefinitions[showWordDefinition as keyof typeof wordDefinitions].color} p-6 rounded-2xl shadow-2xl max-w-sm mx-4 border-4 border-white`}
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.5)",
                        "0 0 30px rgba(16, 185, 129, 0.5)",
                        "0 0 20px rgba(59, 130, 246, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="text-center text-white">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-4xl mb-3"
                      >
                        {wordDefinitions[showWordDefinition as keyof typeof wordDefinitions].icon}
                      </motion.div>
                      
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl font-bold mb-2"
                      >
                        🎉 Word Found!
                      </motion.h3>
                      
                      <motion.h4
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg font-semibold mb-2"
                      >
                        {wordDefinitions[showWordDefinition as keyof typeof wordDefinitions].term}
                      </motion.h4>
                      
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-sm leading-relaxed"
                      >
                        {wordDefinitions[showWordDefinition as keyof typeof wordDefinitions].definition}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, type: "spring" }}
                        className="mt-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 inline-block"
                      >
                        <span className="text-sm font-bold">+15 Points! 🌟</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Words to Find */}
          <div className="lg:w-64">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Words to Find:</h4>
              <div className="space-y-2">
                {wordsToFind.map(word => (
                  <div
                    key={word}
                    className={`flex items-center gap-2 p-2 rounded ${
                      foundWords.includes(word)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {foundWords.includes(word) && <CheckCircle className="w-4 h-4" />}
                    <span className={foundWords.includes(word) ? 'line-through' : ''}>{word}</span>
                  </div>
                ))}
              </div>

              {foundWords.length === wordsToFind.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg text-center"
                >
                  <Trophy className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <div className="text-green-800 font-bold text-sm">All Words Found! 🎉</div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFinancialRatios = () => {
    const currentRatioData = financialRatios[currentRatio];
    
    const handleRatioSubmit = () => {
      const userAnswer = parseFloat(ratioAnswer);
      const isCorrect = Math.abs(userAnswer - currentRatioData.example.answer) < 0.1;
      
      const newResults = [...ratioResults];
      newResults[currentRatio] = isCorrect;
      setRatioResults(newResults);
      
      if (isCorrect) {
        setScore(score + 20);
      }
      
      setTimeout(() => {
        if (currentRatio < financialRatios.length - 1) {
          setCurrentRatio(currentRatio + 1);
          setRatioAnswer('');
        }
      }, 2000);
    };

    const resetRatios = () => {
      setCurrentRatio(0);
      setRatioAnswer('');
      setRatioResults([]);
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">📈 Financial Ratios Challenge</h3>
          <p className="text-gray-600">Calculate important financial ratios</p>
          <div className="text-sm text-blue-600 mt-2">
            Ratio {currentRatio + 1} of {financialRatios.length}
          </div>
        </div>

        <motion.div
          key={currentRatio}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 mb-1">{currentRatioData.name}</h4>
              <p className="text-gray-600 text-sm mb-2">{currentRatioData.description}</p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <span className="font-mono text-blue-800">{currentRatioData.formula}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 className="font-semibold text-gray-800 mb-2">Calculate:</h5>
            {currentRatioData.name === "P/E Ratio" && (
              <div className="text-sm text-gray-700">
                Stock Price: ₹{currentRatioData.example.price} | EPS: ₹{currentRatioData.example.eps}
              </div>
            )}
            {currentRatioData.name === "Debt-to-Equity" && (
              <div className="text-sm text-gray-700">
                Total Debt: ₹{currentRatioData.example.debt}L | Total Equity: ₹{currentRatioData.example.equity}L
              </div>
            )}
            {currentRatioData.name === "ROE" && (
              <div className="text-sm text-gray-700">
                Net Income: ₹{currentRatioData.example.income}L | Shareholders' Equity: ₹{currentRatioData.example.equity}L
              </div>
            )}
          </div>

          <div className="flex gap-4 items-center">
            <input
              type="number"
              value={ratioAnswer}
              onChange={(e) => setRatioAnswer(e.target.value)}
              placeholder="Enter your answer"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              step="0.1"
            />
            <Button 
              onClick={handleRatioSubmit}
              disabled={!ratioAnswer || ratioResults[currentRatio] !== undefined}
              className="px-6"
            >
              Submit
            </Button>
          </div>

          {ratioResults[currentRatio] !== undefined && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`mt-4 p-4 rounded-lg ${
                ratioResults[currentRatio] ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
              }`}
            >
              <div className="flex items-center gap-2">
                {ratioResults[currentRatio] ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-bold ${ratioResults[currentRatio] ? 'text-green-800' : 'text-red-800'}`}>
                  {ratioResults[currentRatio] ? 'Correct!' : 'Incorrect!'}
                </span>
              </div>
              <p className="text-sm text-gray-700 mt-1">
                Correct answer: {currentRatioData.example.answer}
              </p>
            </motion.div>
          )}
        </motion.div>

        <div className="flex justify-center gap-4">
          <Button onClick={resetRatios} variant="outline" className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        {/* Progress */}
        <div className="grid grid-cols-3 gap-3">
          {financialRatios.map((ratio, index) => (
            <div
              key={ratio.name}
              className={`p-3 rounded-lg text-center text-sm ${
                ratioResults[index] === true
                  ? 'bg-green-100 text-green-800'
                  : ratioResults[index] === false
                  ? 'bg-red-100 text-red-800'
                  : index === currentRatio
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {ratio.name}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderInvestmentMaze = () => {
    const handleMazeMove = (newX: number, newY: number) => {
      if (newX < 0 || newX >= 8 || newY < 0 || newY >= 8) return;
      if (investmentMaze[newY][newX] === 1) return; // Wall
      
      // Life is a one-way journey - only allow forward progression
      const currentAge = financialProfile.age;
      const scenario = lifeJourneyScenarios.find(s => s.x === newX && s.y === newY);
      
      if (scenario && scenario.age < currentAge) {
        // Cannot go back to younger age - show message
        alert("⏰ You cannot go back in time! Life moves forward only. Make your current decision first.");
        return;
      }
      
      setPlayerPosition({ x: newX, y: newY });
      
      // Check for life scenario points
      if (scenario) {
        setCurrentScenario(lifeJourneyScenarios.indexOf(scenario));
      }
      
      // Check if reached retirement
      if (newX === 7 && newY === 6) {
        setJourneyCompleted(true);
        calculateFinalOutcome();
      }
    };

    const handleLifeDecision = (choiceIndex: number) => {
      const scenario = lifeJourneyScenarios[currentScenario!];
      let actualScenario = scenario;
      let actualChoice;

      // Handle path-specific scenarios
      if (scenario.pathSpecific && chosenPath) {
        const pathSpecificScenario = scenario.pathSpecific[chosenPath as keyof typeof scenario.pathSpecific];
        if (pathSpecificScenario) {
          actualScenario = { ...scenario, ...pathSpecificScenario };
          actualChoice = pathSpecificScenario.options?.[choiceIndex];
        }
      }
      
      if (!actualChoice) {
        actualChoice = scenario.options?.[choiceIndex];
      }

      if (!actualChoice) return;

      // Handle first choice (path selection)
      if (currentScenario === 0 && (actualChoice as any).pathId) {
        setChosenPath((actualChoice as any).pathId);
        const selectedPath = lifeStartingPaths.find(p => p.id === (actualChoice as any).pathId);
        if (selectedPath) {
          setPathTraits(selectedPath.hiddenTraits);
          setRandomEvents(selectedPath.futureEvents);
        }
      }
      
      // Record the choice
      setPlayerChoices({
        ...playerChoices,
        [currentScenario!]: {
          choice: choiceIndex,
          impact: actualChoice.impact,
          points: actualChoice.points
        }
      });
      
      // Update life points and financial profile
      setTotalLifePoints(totalLifePoints + actualChoice.points);
      updateFinancialProfile(actualScenario, actualChoice);
      
      // Add to journey history
      setJourneyHistory([
        ...journeyHistory,
        `Age ${actualScenario.age}: ${actualChoice.text} (${actualChoice.impact})`
      ]);
      
      setScore(score + Math.max(actualChoice.points, 0));
      setCurrentScenario(null);
      setShowDetailedFeedback(true);
      
      // Show detailed consequence feedback
      setTimeout(() => {
        const feedbackMessage = actualScenario.feedback?.[actualChoice.impact as keyof typeof actualScenario.feedback] || "Decision recorded.";
        
        alert(`💡 SURPRISE REVEALED!\n\n${feedbackMessage}\n\nYour chosen path is shaping your destiny... Click OK to continue!`);
        setShowDetailedFeedback(false);
      }, 1000);
    };

    const updateFinancialProfile = (scenario: any, choice: any) => {
      const newProfile = { ...financialProfile };
      newProfile.age = scenario.age;
      
      switch (scenario.stage) {
        case "Fresh Graduate":
          if (choice.impact === "excellent") {
            newProfile.emergencyFund = 240000;
            newProfile.investments = 0;
            newProfile.netWorth = 240000;
          } else if (choice.impact === "good") {
            newProfile.emergencyFund = 120000;
            newProfile.netWorth = 120000;
          }
          break;
        case "Building Foundation":
          newProfile.monthlyIncome = 70000;
          if (choice.impact === "excellent") {
            newProfile.investments = 300000;
            newProfile.netWorth = 540000;
          } else if (choice.impact === "average") {
            newProfile.investments = 100000;
            newProfile.netWorth = 220000;
          }
          break;
        case "Market Reality Check":
          if (choice.impact === "excellent") {
            newProfile.investments = 2500000;
            newProfile.netWorth = 2740000;
          } else if (choice.impact === "good") {
            newProfile.investments = 1800000;
            newProfile.netWorth = 2040000;
          }
          break;
      }
      
      setFinancialProfile(newProfile);
    };

    const calculateFinalOutcome = () => {
      const excellentChoices = Object.values(playerChoices).filter(c => c.impact === "excellent").length;
      const totalChoices = Object.keys(playerChoices).length;
      
      if (excellentChoices >= totalChoices * 0.8) {
        setFinancialProfile(prev => ({ ...prev, netWorth: 50000000 })); // 5Cr+
      } else if (excellentChoices >= totalChoices * 0.5) {
        setFinancialProfile(prev => ({ ...prev, netWorth: 25000000 })); // 2.5Cr
      } else {
        setFinancialProfile(prev => ({ ...prev, netWorth: 8000000 })); // 80L
      }
    };

    const resetJourney = () => {
      setPlayerPosition({ x: 1, y: 1 });
      setJourneyCompleted(false);
      setCurrentScenario(null);
      setPlayerChoices({});
      setTotalLifePoints(0);
      setFinancialProfile({
        age: 22,
        netWorth: 0,
        monthlyIncome: 40000,
        emergencyFund: 0,
        investments: 0,
        lifestyle: "minimal"
      });
      setJourneyHistory([]);
      setShowDetailedFeedback(false);
    };

  // Show Dashboard first when entering Investment Puzzles
  if (activeTab === 'dashboard') {
    return (
      <InvestmentPuzzlesDashboard
        score={score}
        streak={streak}
        dailyScore={dailyScore}
        completedPuzzles={completedPuzzles}
        onGameSelect={(gameId) => setActiveTab(gameId as any)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-2xl shadow-xl mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => setActiveTab('dashboard')} 
                variant="ghost" 
                size="sm"
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {activeTab === 'cryptic' && 'Cryptic Clues'}
                  {activeTab === 'terms' && 'Market Terms'}
                  {activeTab === 'wordsearch' && 'Word Search'}
                  {activeTab === 'matching' && 'Term Matching'}
                  {activeTab === 'ratios' && 'Financial Ratios'}
                  {activeTab === 'maze' && 'Investment Maze'}
                </h1>
                <p className="text-white text-opacity-90">Master Indian financial markets through interactive learning</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  <span className="font-semibold">Score: {score}</span>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span className="font-semibold">Streak: {streak}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Game Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeTab === 'cryptic' && <div>Cryptic Clues Game Content</div>}
          {activeTab === 'terms' && <div>Market Terms Game Content</div>}
          {activeTab === 'wordsearch' && <div>Word Search Game Content</div>}
          {activeTab === 'matching' && <div>Term Matching Game Content</div>}
          {activeTab === 'ratios' && <div>Financial Ratios Game Content</div>}
          {activeTab === 'maze' && (
            <div className="space-y-4">
              {/* Game Instructions - Show until first decision for maze */}
              {Object.keys(playerChoices).length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6 mb-4"
          >
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">🎮 How to Play Your Financial Life</h3>
              <p className="text-gray-700 text-lg">Experience 40 years of financial decisions from age 22 to 60</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-bold text-blue-800">📋 Game Rules:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>One-way journey:</strong> Life moves forward only - no going back in time!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Real consequences:</strong> Every decision affects your future net worth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Life stages:</strong> Graduate → Career → Marriage → Retirement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Goal:</strong> Achieve Financial Independence (FIRE) by age 60</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-bold text-purple-800">🎯 What You'll Experience:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">📍</span>
                    <span><strong>Age 22:</strong> First salary decisions & saving habits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">📍</span>
                    <span><strong>Age 25:</strong> Career growth & investment choices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">📍</span>
                    <span><strong>Age 28:</strong> Marriage & family financial planning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">📍</span>
                    <span><strong>Age 32:</strong> Market crashes & crisis management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">📍</span>
                    <span><strong>Age 45:</strong> Children's education & wealth planning</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-6 p-4 bg-white rounded-lg border-2 border-green-300">
              <p className="text-green-800 font-bold mb-2">🚀 Ready to Start Your Financial Journey?</p>
              <p className="text-sm text-gray-600">Click the graduation cap (🎓) to begin at age 22 and make your first life decision!</p>
            </div>
          </motion.div>
        )}

        {/* Life Journey Header */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">🌟 Your Financial Life Story</h3>
          <div className="flex justify-center gap-6 mt-2 text-sm">
            <div className="bg-blue-100 px-3 py-1 rounded-full">
              <span className="text-blue-800 font-medium">Age: {financialProfile.age}</span>
            </div>
            <div className="bg-green-100 px-3 py-1 rounded-full">
              <span className="text-green-800 font-medium">Net Worth: ₹{(financialProfile.netWorth / 100000).toFixed(1)}L</span>
            </div>
            <div className="bg-purple-100 px-3 py-1 rounded-full">
              <span className="text-purple-800 font-medium">Decisions: {Object.keys(playerChoices).length}/6</span>
            </div>
          </div>
        </div>

        {/* Journey Completion */}
        {journeyCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 rounded-xl p-6 text-center"
          >
            <Trophy className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h4 className="text-2xl font-bold text-green-800 mb-2">Your Financial Journey Complete! 🎉</h4>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-3 rounded-lg">
                <div className="text-lg font-bold text-green-600">₹{(financialProfile.netWorth / 10000000).toFixed(1)} Cr</div>
                <div className="text-sm text-gray-600">Retirement Corpus</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{Object.keys(playerChoices).length}</div>
                <div className="text-sm text-gray-600">Life Decisions Made</div>
              </div>
            </div>
            <p className="text-green-700 text-sm mt-3">
              {financialProfile.netWorth >= 50000000 ? "🏆 FIRE Achieved! You can retire comfortably!" :
               financialProfile.netWorth >= 20000000 ? "👍 Good planning! Comfortable retirement ahead." :
               "⚠️ More planning needed for secure retirement."}
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Sidebar - Journey Info */}
          <div className="xl:col-span-1 space-y-4">
            {/* Current Status Card */}
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">👤</span>
                </div>
                Your Journey
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Age:</span>
                  <span className="font-bold text-blue-600 text-lg">{financialProfile.age}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Net Worth:</span>
                  <span className="font-bold text-green-600">₹{(financialProfile.netWorth / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Decisions:</span>
                  <span className="font-bold text-purple-600">{Object.keys(playerChoices).length}/18</span>
                </div>
                {chosenPath && (
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-xs text-gray-500">Your Path:</span>
                    <div className="text-sm font-medium text-indigo-600">
                      {lifeStartingPaths.find(p => p.id === chosenPath)?.name}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Tracker */}
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">Life Progress</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Journey Completion</span>
                  <span className="font-medium">{Math.round((Object.keys(playerChoices).length / lifeJourneyScenarios.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full flex items-center justify-end pr-2"
                    animate={{ width: `${(Object.keys(playerChoices).length / lifeJourneyScenarios.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  >
                    {Object.keys(playerChoices).length > 0 && (
                      <span className="text-xs text-white font-bold">
                        {Math.round((Object.keys(playerChoices).length / lifeJourneyScenarios.length) * 100)}%
                      </span>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">Legend</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded border"></div>
                  <span>🎓 Starting Point</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-200 border border-orange-400 rounded"></div>
                  <span>📍 Life Decision</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-400 rounded border"></div>
                  <span>✓ Decision Made</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded border"></div>
                  <span>🏖️ Retirement</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded border"></div>
                  <span>👤 Your Position</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Life Journey Grid */}
          <div className="xl:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="text-center mb-4">
                <h4 className="text-xl font-bold text-gray-800 mb-2">Your Financial Life Path</h4>
                <p className="text-sm text-gray-600">Navigate through life's financial decisions</p>
              </div>
              
              <div className="grid grid-cols-8 gap-2 max-w-2xl mx-auto">
                {investmentMaze.map((row, y) =>
                  row.map((cell, x) => {
                    const isPlayer = playerPosition.x === x && playerPosition.y === y;
                    const isWall = cell === 1;
                    const isStart = x === 0 && y === 0;
                    const isRetirement = x === 7 && y === 6;
                    const hasScenario = lifeJourneyScenarios.some(s => s.x === x && s.y === y);
                    const scenario = lifeJourneyScenarios.find(s => s.x === x && s.y === y);
                    const scenarioIndex = scenario ? lifeJourneyScenarios.indexOf(scenario) : -1;
                    const isCompleted = scenarioIndex >= 0 && !!playerChoices[scenarioIndex];
                    const canAccess = !scenario || scenario.age <= financialProfile.age + 3;
                    
                    return (
                      <motion.button
                        key={`${x}-${y}`}
                        onClick={() => handleMazeMove(x, y)}
                        className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold transition-all rounded-lg ${
                          isWall
                            ? 'bg-gray-800 border-gray-900 cursor-not-allowed'
                            : isPlayer
                            ? 'bg-blue-500 text-white border-blue-600 scale-110 shadow-lg'
                            : isRetirement
                            ? 'bg-green-500 text-white border-green-600 shadow-md'
                            : isStart
                            ? 'bg-yellow-500 text-white border-yellow-600 shadow-md'
                            : isCompleted
                            ? 'bg-purple-400 text-white border-purple-500 shadow-md'
                            : hasScenario && canAccess
                            ? 'bg-orange-200 border-orange-400 hover:bg-orange-300 hover:shadow-md'
                            : hasScenario
                            ? 'bg-gray-300 border-gray-400 opacity-50 cursor-not-allowed'
                            : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                        }`}
                        whileHover={{ scale: isWall ? 1 : 1.05 }}
                        whileTap={{ scale: isWall ? 1 : 0.95 }}
                        disabled={isWall || (hasScenario && !canAccess)}
                        title={scenario ? `${scenario.stage} (Age ${scenario.age})` : ''}
                      >
                        {isPlayer && '👤'}
                        {isStart && !isPlayer && '🎓'}
                        {isRetirement && !isPlayer && '🏖️'}
                        {hasScenario && !isPlayer && (
                          isCompleted ? '✓' :
                          scenario?.stage === "Life Path Choice" ? '🎓' :
                          scenario?.stage === "First Job Decisions" ? '💼' :
                          scenario?.stage === "Peer Pressure" ? '🎉' :
                          scenario?.stage === "Investment Learning" ? '📚' :
                          scenario?.stage === "Family Responsibilities" ? '👨‍👩‍👧‍👦' :
                          scenario?.stage === "Career Crossroads" ? '🎯' :
                          scenario?.stage === "Relationship Finances" ? '💕' :
                          scenario?.stage === "Real Estate Temptation" ? '🏠' :
                          scenario?.stage === "Marriage Expenses" ? '💍' :
                          scenario?.stage === "Dual Income Planning" ? '👫' :
                          scenario?.stage === "Child Planning" ? '👶' :
                          scenario?.stage === "Career Peak Decisions" ? '🎯' :
                          scenario?.stage === "Investment Diversification" ? '📊' :
                          scenario?.stage === "Child Education Planning" ? '🎓' :
                          scenario?.stage === "Mid-life Financial Check" ? '🔍' :
                          scenario?.stage === "Property Investment" ? '🏢' :
                          scenario?.stage === "Legacy Planning" ? '📜' :
                          scenario?.stage === "FIRE Achievement" ? '🏖️' :
                          '📍'
                        )}
                      </motion.button>
                    );
                  })
                )}
              </div>
              
              {/* Navigation Controls */}
              <div className="flex gap-3 justify-center mt-6">
                <Button 
                  onClick={() => handleMazeMove(playerPosition.x, playerPosition.y - 1)} 
                  variant="outline" 
                  size="sm"
                  className="w-10 h-10 p-0"
                >
                  ↑
                </Button>
                <div className="flex gap-1">
                  <Button 
                    onClick={() => handleMazeMove(playerPosition.x - 1, playerPosition.y)} 
                    variant="outline" 
                    size="sm"
                    className="w-10 h-10 p-0"
                  >
                    ←
                  </Button>
                  <Button 
                    onClick={() => handleMazeMove(playerPosition.x + 1, playerPosition.y)} 
                    variant="outline" 
                    size="sm"
                    className="w-10 h-10 p-0"
                  >
                    →
                  </Button>
                </div>
                <Button 
                  onClick={() => handleMazeMove(playerPosition.x, playerPosition.y + 1)} 
                  variant="outline" 
                  size="sm"
                  className="w-10 h-10 p-0"
                >
                  ↓
                </Button>
              </div>
            </div>
          </div>

          {/* Journey Info & Decisions */}
          <div className="space-y-4">
            {/* Legend */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Journey Guide:</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 border border-yellow-600 rounded"></div>
                  <span>🎓 Start (Age 22)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-200 border border-orange-400 rounded"></div>
                  <span>📍 Life Decision</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-300 border border-purple-500 rounded"></div>
                  <span>✓ Decision Made</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 border border-green-600 rounded"></div>
                  <span>🏖️ Retirement (Age 60)</span>
                </div>
              </div>
            </div>

            {/* Current Financial Profile */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Financial Profile:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Age:</span>
                  <span className="font-medium">{financialProfile.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Income:</span>
                  <span className="font-medium">₹{(financialProfile.monthlyIncome / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span>Emergency Fund:</span>
                  <span className="font-medium">₹{(financialProfile.emergencyFund / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex justify-between">
                  <span>Investments:</span>
                  <span className="font-medium">₹{(financialProfile.investments / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Net Worth:</span>
                  <span className="font-bold text-green-600">₹{(financialProfile.netWorth / 100000).toFixed(1)}L</span>
                </div>
              </div>
            </div>

            {/* Life Decision */}
            {currentScenario !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl shadow-lg border-2 border-blue-300"
              >
                {(() => {
                  const scenario = lifeJourneyScenarios[currentScenario];
                  let displayScenario = scenario;
                  let displayOptions = scenario.options || [];

                  // Use path-specific content if available
                  if (scenario.pathSpecific && chosenPath) {
                    const pathSpecific = scenario.pathSpecific[chosenPath as keyof typeof scenario.pathSpecific];
                    if (pathSpecific) {
                      displayScenario = { ...scenario, ...pathSpecific };
                      displayOptions = pathSpecific.options || scenario.options || [];
                    }
                  }

                  return (
                    <>
                      <div className="text-center mb-3">
                        <h4 className="font-bold text-gray-800">{displayScenario.stage}</h4>
                        <p className="text-sm text-blue-600">Age {displayScenario.age}</p>
                        {chosenPath && currentScenario > 0 && (
                          <p className="text-xs text-purple-600 mt-1">
                            Path: {lifeStartingPaths.find(p => p.id === chosenPath)?.name}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                        {displayScenario.scenario}
                      </p>
                      <p className="font-medium text-gray-800 mb-3">
                        {displayScenario.question}
                      </p>
                      <div className="space-y-2">
                        {displayOptions.map((option: any, index: number) => (
                          <button
                            key={index}
                            onClick={() => handleLifeDecision(index)}
                            className={`w-full p-3 text-left text-sm rounded-lg transition-all border-2 ${
                              currentScenario === 0 ? 'bg-yellow-50 hover:bg-yellow-100 border-yellow-300' :
                              option.impact === 'excellent' ? 'bg-green-50 hover:bg-green-100 border-green-300' :
                              option.impact === 'good' ? 'bg-blue-50 hover:bg-blue-100 border-blue-300' :
                              'bg-orange-50 hover:bg-orange-100 border-orange-300'
                            }`}
                          >
                            <div className="font-medium">{option.text}</div>
                            {currentScenario === 0 ? (
                              <div className="text-xs text-gray-600 mt-1">
                                🔮 Hidden consequences await...
                              </div>
                            ) : (
                              <div className="text-xs text-gray-600 mt-1">
                                Impact: {option.impact} | Points: {option.points > 0 ? '+' : ''}{option.points}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            )}

            <Button 
              onClick={resetJourney} 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Start New Life
            </Button>
          </div>
        </div>

        {/* Journey History */}
        {journeyHistory.length > 0 && (
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h4 className="font-semibold text-gray-800 mb-3">Your Financial Journey So Far:</h4>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {journeyHistory.map((entry, index) => (
                <div key={index} className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                  {entry}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDailyChallenge = () => (
    <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 p-3 rounded-xl border border-orange-200 mb-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1 text-sm">🌟 Daily Challenge</h3>
            <p className="text-gray-700 text-xs">Today's Score: <span className="text-orange-600 font-bold">{dailyScore} points</span></p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Completion</div>
            <div className="text-sm font-bold text-orange-600">
              {Math.round((score / (dailyPuzzles.length * 10)) * 100)}%
            </div>
          </div>
        </div>
      </div>
      
      {/* Compact Progress Bar */}
      <div className="mt-2">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Daily Progress</span>
          <span>{score} / {dailyPuzzles.length * 10} points</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <motion.div 
            className="bg-gradient-to-r from-orange-400 to-red-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((score / (dailyPuzzles.length * 10)) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-3">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header Layout */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-4">
          {/* Top Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shadow-lg">
                  <Puzzle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Financial Investment Puzzles
                  </h1>
                  <p className="text-white/80 text-sm">Master Indian financial markets through interactive learning</p>
                </div>
              </div>
              
              {/* Stats in Header */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Trophy className="w-4 h-4 text-yellow-300" />
                    <span className="text-xs text-white/80">Score</span>
                  </div>
                  <div className="text-lg font-bold text-white">{score}</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 text-green-300" />
                    <span className="text-xs text-white/80">Streak</span>
                  </div>
                  <div className="text-lg font-bold text-white">{streak}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Challenge & Tabs Combined */}
          <div className="p-4">
            <div className="grid lg:grid-cols-3 gap-4 items-center">
              {/* Daily Challenge - More Compact */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">Daily Challenge</h3>
                      <p className="text-xs text-gray-600">{dailyScore} points today</p>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-xs text-orange-600 font-bold">
                        {Math.round((score / (dailyPuzzles.length * 10)) * 100)}%
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <motion.div 
                      className="bg-gradient-to-r from-orange-400 to-red-500 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((score / (dailyPuzzles.length * 10)) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Puzzle Tabs - Better Organized */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
                  {[
                    { id: 'cryptic', label: 'Cryptic Clues', emoji: '🔍', color: 'from-purple-500 to-blue-600' },
                    { id: 'terms', label: 'Market Terms', emoji: '📊', color: 'from-green-500 to-emerald-600' },
                    { id: 'wordsearch', label: 'Word Search', emoji: '📝', color: 'from-blue-500 to-cyan-600' },
                    { id: 'matching', label: 'Term Matching', emoji: '🔄', color: 'from-orange-500 to-red-600' },
                    { id: 'ratios', label: 'Financial Ratios', emoji: '📈', color: 'from-pink-500 to-purple-600' },
                    { id: 'maze', label: 'Investment Maze', emoji: '🎯', color: 'from-indigo-500 to-purple-600' }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`relative p-2 rounded-lg text-center transition-all duration-300 group ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-400 shadow-md'
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`w-10 h-10 bg-gradient-to-br ${tab.color} rounded-lg flex items-center justify-center mx-auto mb-1 group-hover:scale-110 transition-transform shadow-sm`}>
                        <span className="text-xl">{tab.emoji}</span>
                      </div>
                      <div className="text-xs font-semibold text-gray-800 leading-tight">{tab.label}</div>
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-full"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Puzzle Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Compact Content Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                {activeTab === 'cryptic' && <span className="text-lg">🔍</span>}
                {activeTab === 'terms' && <span className="text-lg">📊</span>}
                {activeTab === 'wordsearch' && <span className="text-lg">📝</span>}
                {activeTab === 'matching' && <span className="text-lg">🔄</span>}
                {activeTab === 'ratios' && <span className="text-lg">📈</span>}
                {activeTab === 'maze' && <span className="text-lg">🎯</span>}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {activeTab === 'cryptic' && 'Cryptic Clues Challenge'}
                  {activeTab === 'terms' && 'Market Terms Dictionary'}
                  {activeTab === 'wordsearch' && 'Financial Word Search'}
                  {activeTab === 'matching' && 'Term Matching Game'}
                  {activeTab === 'ratios' && 'Financial Ratios Calculator'}
                  {activeTab === 'maze' && 'Investment Decision Maze'}
                </h2>
                <p className="text-white/80 text-sm">
                  {activeTab === 'cryptic' && 'Solve cryptic clues about Indian financial terms'}
                  {activeTab === 'terms' && 'Learn essential financial terminology'}
                  {activeTab === 'wordsearch' && 'Find hidden investment terms in the grid'}
                  {activeTab === 'matching' && 'Match financial terms with their definitions'}
                  {activeTab === 'ratios' && 'Calculate important financial ratios'}
                  {activeTab === 'maze' && 'Navigate through financial decisions to reach FIRE'}
                </p>
              </div>
            </div>
          </div>

          {/* Compact Content Body */}
          <div className="p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'cryptic' && renderCrypticClues()}
                {activeTab === 'terms' && renderMarketTerms()}
                {activeTab === 'wordsearch' && renderWordSearch()}
                {activeTab === 'matching' && renderTermMatching()}
                {activeTab === 'ratios' && renderFinancialRatios()}
                {activeTab === 'maze' && renderInvestmentMaze()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Compact Achievement Section */}
        {completedPuzzles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-50 via-emerald-50 to-blue-50 rounded-xl p-4 mt-4 border border-green-200 shadow-lg"
          >
            <div className="text-center mb-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md"
              >
                <Award className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
                🎉 Achievements Unlocked!
              </h3>
              <p className="text-green-700 text-sm">You've mastered {completedPuzzles.length} financial puzzle(s)!</p>
            </div>

            {/* Compact Achievement Grid */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-3">
              {completedPuzzles.map((puzzle, index) => (
                <motion.div
                  key={puzzle}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-2 rounded-lg shadow-sm text-center border border-green-200"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-1">
                    <Trophy className="w-3 h-3 text-white" />
                  </div>
                  <div className="text-xs font-semibold text-green-800 capitalize">{puzzle}</div>
                </motion.div>
              ))}
            </div>

            {/* Compact Progress */}
            <div className="bg-white/70 backdrop-blur-sm p-2 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-700">Progress</span>
                <span className="text-xs text-green-600 font-bold">
                  {Math.round((completedPuzzles.length / 6) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedPuzzles.length / 6) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-1.5 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Compact Stats Footer */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          <div className="bg-white rounded-lg p-3 shadow-md text-center border border-gray-200">
            <div className="text-lg font-bold text-blue-600">{score}</div>
            <div className="text-xs text-gray-600">Points</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-md text-center border border-gray-200">
            <div className="text-lg font-bold text-green-600">{streak}</div>
            <div className="text-xs text-gray-600">Streak</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-md text-center border border-gray-200">
            <div className="text-lg font-bold text-purple-600">{completedPuzzles.length}</div>
            <div className="text-xs text-gray-600">Mastered</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-md text-center border border-gray-200">
            <div className="text-lg font-bold text-orange-600">{dailyScore}</div>
            <div className="text-xs text-gray-600">Daily</div>
          </div>
            )}
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentPuzzles;