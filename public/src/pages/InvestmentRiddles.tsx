import { TabPills, TabItem } from "../components/ui/tab-pills";
import React, { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { useToast } from "../hooks/use-toast";
import { SEO } from "../components/SEO";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface Riddle {
  id: number;
  question: string;
  options: string[];
  answer: number; // index of the correct option
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  category: "stocks" | "mutual-funds" | "retirement" | "banking" | "tax" | "general";
  completed: boolean;
}

// Comprehensive investment riddles collection
const investmentRiddles: Riddle[] = [
  {
    id: 1,
    question: "I grow fat when fear rules the market, and I shrink when confidence returns. I'm your secret shield when prices tumble. What am I?",
    options: [
      "Put option or hedge",
      "Bull market", 
      "Stock portfolio", 
      "Market index"
    ],
    answer: 0, // Put option or hedge
    explanation: "A put option or hedge grows in value when market fear increases (prices fall) and shrinks when confidence returns (prices rise). It's used as protection against market downturns.",
    difficulty: "easy",
    category: "stocks",
    completed: false
  },
  {
    id: 2,
    question: "I'm your one-ticket entry into hundreds of companies. You can trade me as easily as a single stock. What am I?",
    options: [
      "Mutual Fund", 
      "Exchange-Traded Fund (ETF)", 
      "Stock Index", 
      "Bond Index"
    ],
    answer: 1, // ETF
    explanation: "An Exchange-Traded Fund (ETF) allows investors to own a small portion of many companies by buying a single security. Unlike mutual funds, ETFs can be bought and sold throughout the trading day like stocks.",
    difficulty: "easy",
    category: "mutual-funds",
    completed: false
  },
  {
    id: 3,
    question: "The more you contribute to me early in life, the bigger my pile grows for retirement. I grow tax-free till you retire. What am I?",
    options: [
      "Emergency fund", 
      "Retirement fund or 401(k)/PPF", 
      "Certificate of deposit", 
      "Treasury bond"
    ],
    answer: 1, // Retirement fund
    explanation: "Retirement accounts like 401(k), PPF, or other retirement funds benefit tremendously from early contributions due to compound growth. The earlier you start contributing, the less you need to save later to reach your retirement goals.",
    difficulty: "easy",
    category: "retirement",
    completed: false
  },
  {
    id: 4,
    question: "I let you invest small amounts regularly instead of lump sums, helping you average the price you pay. What am I?",
    options: [
      "Fixed Deposit", 
      "SIP (Systematic Investment Plan)", 
      "Lump sum investment", 
      "Day trading"
    ],
    answer: 1, // SIP
    explanation: "A Systematic Investment Plan (SIP) allows you to invest small amounts regularly, which helps average out the purchase price over time through rupee cost averaging.",
    difficulty: "easy",
    category: "mutual-funds",
    completed: false
  },
  {
    id: 5,
    question: "I measure how fast your money grows annually. The higher I am, the quicker your investments multiply. What am I?",
    options: [
      "Inflation rate", 
      "Rate of Return", 
      "Interest rate", 
      "Tax rate"
    ],
    answer: 1, // Rate of Return
    explanation: "The rate of return measures how fast your money grows annually. A higher rate of return means your investments multiply more quickly over time.",
    difficulty: "easy",
    category: "general",
    completed: false
  },
  {
    id: 6,
    question: "I'm a government savings scheme where you deposit money monthly and get a fixed interest. I mature after 15 years. What am I?",
    options: [
      "Fixed Deposit", 
      "Public Provident Fund (PPF)", 
      "National Savings Certificate", 
      "Employee Provident Fund"
    ],
    answer: 1, // PPF
    explanation: "Public Provident Fund (PPF) is a government savings scheme with a 15-year maturity period where you can deposit money monthly and earn fixed interest with tax benefits.",
    difficulty: "medium",
    category: "tax",
    completed: false
  },
  {
    id: 7,
    question: "I'm a measure of a company's profitability calculated as net income divided by total equity. What am I?",
    options: [
      "Return on Assets (ROA)", 
      "Return on Equity (ROE)", 
      "Profit margin", 
      "Debt-to-equity ratio"
    ],
    answer: 1, // ROE
    explanation: "Return on Equity (ROE) measures a company's profitability by calculating how much profit is generated with shareholders' equity. It's calculated as net income divided by total equity.",
    difficulty: "medium",
    category: "stocks",
    completed: false
  },
  {
    id: 8,
    question: "I am the tax levied when you sell investments for more than you paid. What am I?",
    options: [
      "Income tax", 
      "Capital gains tax", 
      "Dividend tax", 
      "Service tax"
    ],
    answer: 1, // Capital gains tax
    explanation: "Capital gains tax is levied when you sell investments (like stocks, mutual funds, or property) for more than you originally paid for them. The profit from the sale is subject to this tax.",
    difficulty: "medium",
    category: "tax",
    completed: false
  },
  {
    id: 9,
    question: "I'm a financial instrument that gives the holder the right but not the obligation to buy or sell an asset at a predetermined price. What am I?",
    options: [
      "Future contract", 
      "Option", 
      "Bond", 
      "Stock"
    ],
    answer: 1, // Option
    explanation: "An option is a financial derivative that gives the holder the right, but not the obligation, to buy or sell an underlying asset at a predetermined price within a specific time period.",
    difficulty: "hard",
    category: "stocks",
    completed: false
  },
  {
    id: 10,
    question: "I'm the statistical measure of how two investments move relative to each other. What am I?",
    options: [
      "Beta", 
      "Correlation coefficient", 
      "Standard deviation", 
      "Variance"
    ],
    answer: 1, // Correlation coefficient
    explanation: "The correlation coefficient measures how two investments move relative to each other. A correlation of +1 means they move in perfect sync, -1 means they move in opposite directions, and 0 means no relationship.",
    difficulty: "hard",
    category: "general",
    completed: false
  },
  {
    id: 3,
    question: "I pay you more when others fear uncertainty, and less when confidence is high. What am I?",
    options: [
      "Stock dividend", 
      "Bond yield", 
      "Savings account interest", 
      "Commodity futures"
    ],
    answer: 1, // Bond yield
    explanation: "Bond yields generally rise during periods of economic uncertainty as investors demand higher returns for taking on risk. When confidence is high, bond yields typically fall as demand for safe investments decreases.",
    difficulty: "medium",
    category: "stocks",
    completed: false
  },
  {
    id: 4,
    question: "I help you pay less to the government each year, but you must use me before December 31st. What am I?",
    options: [
      "Tax-loss harvesting", 
      "Roth IRA conversion", 
      "Charitable donation", 
      "All of the above"
    ],
    answer: 3, // All of the above
    explanation: "Tax-loss harvesting, Roth IRA conversions, and charitable donations are all strategies that must be implemented before the end of the tax year (December 31st) to provide tax benefits for that year.",
    difficulty: "medium",
    category: "tax",
    completed: false
  },
  {
    id: 5,
    question: "The more you put in me early, the less you need to add later. I grow tax-free until you retire. What am I?",
    options: [
      "Emergency fund", 
      "Retirement account", 
      "Certificate of deposit", 
      "Treasury bond"
    ],
    answer: 1, // Retirement account
    explanation: "Retirement accounts like 401(k)s and IRAs benefit tremendously from early contributions due to compound growth. The earlier you start contributing, the less you need to save later to reach your retirement goals.",
    difficulty: "easy",
    category: "retirement",
    completed: false
  },
  {
    id: 6,
    question: "I'm a number banks watch closely. The higher I am, the less you pay for loans. What am I?",
    options: [
      "Credit score", 
      "Deposit balance", 
      "Account age", 
      "Debt-to-income ratio"
    ],
    answer: 0, // Credit score
    explanation: "A credit score is a number that banks use to determine creditworthiness. A higher credit score generally results in better loan terms and lower interest rates, as it indicates lower risk to lenders.",
    difficulty: "easy",
    category: "banking",
    completed: false
  },
  {
    id: 7,
    question: "I rise in value when a company succeeds, but if the company fails, I might be worthless. Yet I'm often considered safer than my younger sibling. What am I?",
    options: [
      "Preferred stock", 
      "Common stock", 
      "Corporate bond", 
      "Stock option"
    ],
    answer: 0, // Preferred stock
    explanation: "Preferred stock rises in value with company success but can become worthless in bankruptcy. It's considered safer than common stock (its 'younger sibling') because preferred shareholders have priority over common shareholders for dividend payments and in the event of liquidation.",
    difficulty: "hard",
    category: "stocks",
    completed: false
  },
  {
    id: 8,
    question: "Three investors each have ₹10,000. The first earns 8% annually for 10 years. The second earns 6% annually for 15 years. The third earns 4% annually for 20 years. Who has the most money in the end?",
    options: [
      "First investor", 
      "Second investor", 
      "Third investor", 
      "They all have the same amount"
    ],
    answer: 1, // Second investor
    explanation: "The final amounts would be: First investor: ₹21,589 (10,000 × 1.08^10), Second investor: ₹23,966 (10,000 × 1.06^15), Third investor: ₹21,911 (10,000 × 1.04^20). The second investor has the most money despite having a lower interest rate than the first investor.",
    difficulty: "hard",
    category: "general",
    completed: false
  }
];

export default function InvestmentRiddles() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedRiddle, setSelectedRiddle] = useState<Riddle | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeDifficulty, setActiveDifficulty] = useState<string>("all");
  const [riddlesData, setRiddlesData] = useState<Riddle[]>(investmentRiddles);
  
  // Handler for going back to Learning page
  const handleBack = () => {
    setLocation("/learning");
  };
  
  // Filter riddles based on active category and difficulty
  const filteredRiddles = riddlesData.filter(riddle => {
    const matchesCategory = activeCategory === "all" || riddle.category === activeCategory;
    const matchesDifficulty = activeDifficulty === "all" || riddle.difficulty === activeDifficulty;
    return matchesCategory && matchesDifficulty;
  });
  
  // Categorize riddles by difficulty
  const easyRiddles = riddlesData.filter(riddle => riddle.difficulty === "easy");
  const mediumRiddles = riddlesData.filter(riddle => riddle.difficulty === "medium");
  const hardRiddles = riddlesData.filter(riddle => riddle.difficulty === "hard");
  
  // Handle selecting a riddle
  const handleSelectRiddle = (riddle: Riddle) => {
    setSelectedRiddle(riddle);
    setSelectedOption(null);
    setIsAnswered(false);
  };
  
  // Handle submitting an answer
  const handleSubmitAnswer = () => {
    if (selectedOption === null || !selectedRiddle) return;
    
    const isCorrect = selectedOption === selectedRiddle.answer;
    setIsAnswered(true);
    
    if (isCorrect) {
      toast({
        title: "Correct!",
        description: "Great job solving this investment riddle!",
        variant: "default",
      });
      
      // Mark the riddle as completed
      const updatedRiddles = riddlesData.map(r => 
        r.id === selectedRiddle.id ? { ...r, completed: true } : r
      );
      setRiddlesData(updatedRiddles);
    } else {
      toast({
        title: "Not quite right",
        description: "Try again or check the explanation to learn more.",
        variant: "destructive",
      });
    }
  };
  
  // Calculate progress
  const progress = Math.round((riddlesData.filter(r => r.completed).length / riddlesData.length) * 100);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <SEO 
        title="Investment Riddles | RupeeSmart"
        description="Test your financial knowledge with challenging investment riddles and scenarios. Learn financial concepts in an engaging way."
        keywords="investment riddles, financial puzzles, financial literacy, financial education, money riddles, financial knowledge test"
        canonical="https://rupeesmart.com/investment-riddles"
        ogType="website"
      />
      
      {selectedRiddle ? (
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setSelectedRiddle(null)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="text-lg">←</span>
                <span className="font-medium">Back to Riddles</span>
              </button>
              <div className="flex items-center gap-3">
                <Badge 
                  className={`px-4 py-1 text-sm font-bold ${
                    selectedRiddle.difficulty === "easy" ? "bg-green-100 text-green-800" : 
                    selectedRiddle.difficulty === "medium" ? "bg-yellow-100 text-yellow-800" : 
                    "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedRiddle.difficulty.toUpperCase()}
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 px-4 py-1 text-sm">
                  {selectedRiddle.category.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Riddle Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🧩</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Investment Riddle #{selectedRiddle.id}</h1>
                    <p className="text-purple-100">Challenge your financial knowledge</p>
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-medium leading-relaxed">{selectedRiddle.question}</h2>
                </div>
              </div>

              <div className="p-8">
                {/* Options */}
                <div className="grid gap-4 mb-8">
                  {selectedRiddle.options.map((option, index) => (
                    <div 
                      key={index}
                      className={`group relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                        selectedOption === index 
                          ? 'border-purple-500 bg-purple-50 shadow-lg transform scale-[1.02]' 
                          : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                      } ${
                        isAnswered && index === selectedRiddle.answer 
                          ? 'border-green-500 bg-green-50 shadow-lg' : ''
                      } ${
                        isAnswered && selectedOption === index && index !== selectedRiddle.answer 
                          ? 'border-red-500 bg-red-50 shadow-lg' : ''
                      }`}
                      onClick={() => !isAnswered && setSelectedOption(index)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                          selectedOption === index && !isAnswered
                            ? 'border-purple-500 bg-purple-500 text-white' 
                            : 'border-gray-300 text-gray-400'
                        } ${
                          isAnswered && index === selectedRiddle.answer 
                            ? 'border-green-500 bg-green-500 text-white' : ''
                        } ${
                          isAnswered && selectedOption === index && index !== selectedRiddle.answer 
                            ? 'border-red-500 bg-red-500 text-white' : ''
                        }`}>
                          {isAnswered && index === selectedRiddle.answer && '✓'}
                          {isAnswered && selectedOption === index && index !== selectedRiddle.answer && '✗'}
                          {!isAnswered && selectedOption === index && '✓'}
                          {!isAnswered && selectedOption !== index && String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-lg font-medium text-gray-800">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Answer Section */}
                {isAnswered ? (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedOption === selectedRiddle.answer ? 'bg-green-500' : 'bg-blue-500'
                      }`}>
                        <span className="text-white text-xl">
                          {selectedOption === selectedRiddle.answer ? '🎉' : '💡'}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {selectedOption === selectedRiddle.answer ? 'Excellent Work!' : 'Good Try!'}
                      </h3>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">{selectedRiddle.explanation}</p>
                    
                    <div className="flex gap-4">
                      <Button 
                        onClick={() => setSelectedRiddle(null)} 
                        className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 px-8 py-3 text-lg"
                      >
                        More Riddles
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          const nextRiddle = riddlesData.find(r => r.id > selectedRiddle.id);
                          if (nextRiddle) {
                            setSelectedRiddle(nextRiddle);
                            setSelectedOption(null);
                            setIsAnswered(false);
                          }
                        }}
                        className="px-8 py-3 text-lg"
                      >
                        Next Riddle →
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    onClick={handleSubmitAnswer} 
                    disabled={selectedOption === null}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 py-4 text-xl font-bold rounded-2xl shadow-lg"
                  >
                    {selectedOption !== null ? 'Submit My Answer' : 'Select an Answer First'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <button 
                onClick={handleBack}
                className="absolute left-6 top-8 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="text-lg">←</span>
                <span className="font-medium">Back</span>
              </button>
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <span className="text-4xl">🧩</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Investment Riddles
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Challenge your financial wisdom with brain-teasing riddles that make learning fun and memorable
            </p>
          </div>
          
          {/* Progress Dashboard */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Your Progress</h3>
                <p className="text-gray-600">Keep solving riddles to become a financial expert!</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{riddlesData.filter(r => r.completed).length}</div>
                  <div className="text-sm text-gray-500">Solved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{riddlesData.length}</div>
                  <div className="text-sm text-gray-500">Total</div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>Progress</span>
                <span>{progress}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { id: "easy", name: "Easy Riddles", icon: "🟢", count: easyRiddles.length, color: "green" },
              { id: "medium", name: "Medium Riddles", icon: "🟡", count: mediumRiddles.length, color: "yellow" },
              { id: "hard", name: "Hard Riddles", icon: "🔴", count: hardRiddles.length, color: "red" }
            ].map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                onClick={() => setActiveDifficulty(category.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{category.icon}</div>
                  <Badge className={`bg-${category.color}-100 text-${category.color}-800 px-3 py-1`}>
                    {category.count} Riddles
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {category.id === "easy" && "Perfect for beginners to start their financial learning journey"}
                  {category.id === "medium" && "Test your growing financial knowledge with these challenges"}
                  {category.id === "hard" && "Advanced riddles for financial experts and professionals"}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {riddlesData.filter(r => r.difficulty === category.id && r.completed).length} completed
                  </span>
                  <button className={`px-4 py-2 bg-${category.color}-500 text-white rounded-lg hover:bg-${category.color}-600 transition-colors`}>
                    Start →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Topic Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Filter by Topic</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { id: "all", name: "All Topics", icon: "📋" },
                { id: "stocks", name: "Stocks", icon: "📈" },
                { id: "mutual-funds", name: "Mutual Funds", icon: "🏛️" },
                { id: "retirement", name: "Retirement", icon: "🏖️" },
                { id: "banking", name: "Banking", icon: "🏦" },
                { id: "tax", name: "Tax Planning", icon: "📊" },
                { id: "general", name: "General Finance", icon: "💰" }
              ].map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveCategory(topic.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    activeCategory === topic.id 
                      ? 'bg-purple-500 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                  }`}
                >
                  <span>{topic.icon}</span>
                  <span className="font-medium">{topic.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Riddles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRiddles.map(riddle => (
              <div
                key={riddle.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] overflow-hidden ${
                  riddle.completed ? 'ring-2 ring-green-200' : ''
                }`}
                onClick={() => handleSelectRiddle(riddle)}
              >
                <div className={`p-6 ${
                  riddle.difficulty === 'easy' ? 'bg-gradient-to-br from-green-50 to-green-100' :
                  riddle.difficulty === 'medium' ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' :
                  'bg-gradient-to-br from-red-50 to-red-100'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        riddle.difficulty === 'easy' ? 'bg-green-500' :
                        riddle.difficulty === 'medium' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}>
                        #{riddle.id}
                      </div>
                      {riddle.completed && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`${
                        riddle.difficulty === 'easy' ? 'bg-green-200 text-green-800' :
                        riddle.difficulty === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {riddle.difficulty}
                      </Badge>
                    </div>
                  </div>
                  
                  <Badge className="bg-blue-100 text-blue-800 mb-3">
                    {riddle.category.replace('-', ' ')}
                  </Badge>
                  
                  <h3 className="font-bold text-gray-800 text-lg mb-3 line-clamp-3 leading-tight">
                    {riddle.question}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {riddle.completed ? 'Completed' : 'Not solved yet'}
                    </span>
                    <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      riddle.completed 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}>
                      {riddle.completed ? 'Review' : 'Solve'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
                {easyRiddles
                  .filter(riddle => activeCategory === "all" || riddle.category === activeCategory)
                  .map(riddle => (
                    <Card key={riddle.id} className={`overflow-hidden ${riddle.completed ? 'bg-green-50 border-green-100' : ''}`}>
                      <CardHeader className="pb-2 bg-gray-200 dark:bg-gray-800 border-b">
                        <div className="flex justify-between">
                          <Badge variant="secondary">Easy</Badge>
                          <Badge variant="outline">{riddle.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="font-medium mb-2 line-clamp-2">{riddle.question}</p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between pt-0">
                        {riddle.completed && (
                          <div className="flex items-center text-green-600">
                            <span className="material-icons mr-1" style={{fontSize: '16px'}}>check_circle</span>
                            <span className="text-xs">Solved</span>
                          </div>
                        )}
                        {!riddle.completed && <div></div>}
                        <Button size="sm" onClick={() => handleSelectRiddle(riddle)}>
                          {riddle.completed ? 'Review' : 'Solve'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="medium" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mediumRiddles
                  .filter(riddle => activeCategory === "all" || riddle.category === activeCategory)
                  .map(riddle => (
                    <Card key={riddle.id} className={`overflow-hidden ${riddle.completed ? 'bg-green-50 border-green-100' : ''}`}>
                      <CardHeader className="pb-2 bg-gray-200 dark:bg-gray-800 border-b">
                        <div className="flex justify-between">
                          <Badge>Medium</Badge>
                          <Badge variant="outline">{riddle.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="font-medium mb-2 line-clamp-2">{riddle.question}</p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between pt-0">
                        {riddle.completed && (
                          <div className="flex items-center text-green-600">
                            <span className="material-icons mr-1" style={{fontSize: '16px'}}>check_circle</span>
                            <span className="text-xs">Solved</span>
                          </div>
                        )}
                        {!riddle.completed && <div></div>}
                        <Button size="sm" onClick={() => handleSelectRiddle(riddle)}>
                          {riddle.completed ? 'Review' : 'Solve'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="hard" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hardRiddles
                  .filter(riddle => activeCategory === "all" || riddle.category === activeCategory)
                  .map(riddle => (
                    <Card key={riddle.id} className={`overflow-hidden ${riddle.completed ? 'bg-green-50 border-green-100' : ''}`}>
                      <CardHeader className="pb-2 bg-gray-200 dark:bg-gray-800 border-b">
                        <div className="flex justify-between">
                          <Badge variant="destructive">Hard</Badge>
                          <Badge variant="outline">{riddle.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="font-medium mb-2 line-clamp-2">{riddle.question}</p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between pt-0">
                        {riddle.completed && (
                          <div className="flex items-center text-green-600">
                            <span className="material-icons mr-1" style={{fontSize: '16px'}}>check_circle</span>
                            <span className="text-xs">Solved</span>
                          </div>
                        )}
                        {!riddle.completed && <div></div>}
                        <Button size="sm" onClick={() => handleSelectRiddle(riddle)}>
                          {riddle.completed ? 'Review' : 'Solve'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}