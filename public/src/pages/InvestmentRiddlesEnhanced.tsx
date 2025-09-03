import React, { useState } from "react";
import { useLocation } from "wouter";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { useToast } from "../hooks/use-toast";
import { SEO } from "../components/SEO";
import { motion } from "framer-motion";

interface Riddle {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  category: "stocks" | "mutual-funds" | "retirement" | "banking" | "tax" | "general";
  completed: boolean;
}

// Enhanced riddles collection from your document
const investmentRiddles: Riddle[] = [
  {
    id: 1,
    question: "I grow fat when fear rules the market, and I shrink when confidence returns. I'm your secret shield when prices tumble. What am I?",
    options: ["Put option or hedge", "Bull market", "Stock portfolio", "Market index"],
    answer: 0,
    explanation: "A put option or hedge grows in value when market fear increases (prices fall) and shrinks when confidence returns (prices rise). It's used as protection against market downturns.",
    difficulty: "easy",
    category: "stocks",
    completed: false
  },
  {
    id: 2,
    question: "I'm your one-ticket entry into hundreds of companies. You can trade me as easily as a single stock. What am I?",
    options: ["Mutual Fund", "Exchange-Traded Fund (ETF)", "Stock Index", "Bond Index"],
    answer: 1,
    explanation: "An Exchange-Traded Fund (ETF) allows investors to own a small portion of many companies by buying a single security. Unlike mutual funds, ETFs can be bought and sold throughout the trading day like stocks.",
    difficulty: "easy",
    category: "mutual-funds",
    completed: false
  },
  {
    id: 3,
    question: "The more you contribute to me early in life, the bigger my pile grows for retirement. I grow tax-free till you retire. What am I?",
    options: ["Emergency fund", "Retirement fund or 401(k)/PPF", "Certificate of deposit", "Treasury bond"],
    answer: 1,
    explanation: "Retirement accounts like 401(k), PPF, or other retirement funds benefit tremendously from early contributions due to compound growth.",
    difficulty: "easy",
    category: "retirement",
    completed: false
  },
  {
    id: 4,
    question: "I let you invest small amounts regularly instead of lump sums, helping you average the price you pay. What am I?",
    options: ["Fixed Deposit", "SIP (Systematic Investment Plan)", "Lump sum investment", "Day trading"],
    answer: 1,
    explanation: "A Systematic Investment Plan (SIP) allows you to invest small amounts regularly, which helps average out the purchase price over time through rupee cost averaging.",
    difficulty: "easy",
    category: "mutual-funds",
    completed: false
  },
  {
    id: 5,
    question: "I'm a government savings scheme where you deposit money monthly and get a fixed interest. I mature after 15 years. What am I?",
    options: ["Fixed Deposit", "Public Provident Fund (PPF)", "National Savings Certificate", "Employee Provident Fund"],
    answer: 1,
    explanation: "Public Provident Fund (PPF) is a government savings scheme with a 15-year maturity period where you can deposit money monthly and earn fixed interest with tax benefits.",
    difficulty: "medium",
    category: "tax",
    completed: false
  },
  {
    id: 6,
    question: "I'm a measure of a company's profitability calculated as net income divided by total equity. What am I?",
    options: ["Return on Assets (ROA)", "Return on Equity (ROE)", "Profit margin", "Debt-to-equity ratio"],
    answer: 1,
    explanation: "Return on Equity (ROE) measures a company's profitability by calculating how much profit is generated with shareholders' equity.",
    difficulty: "medium",
    category: "stocks",
    completed: false
  },
  {
    id: 7,
    question: "I am the tax levied when you sell investments for more than you paid. What am I?",
    options: ["Income tax", "Capital gains tax", "Dividend tax", "Service tax"],
    answer: 1,
    explanation: "Capital gains tax is levied when you sell investments (like stocks, mutual funds, or property) for more than you originally paid for them.",
    difficulty: "medium",
    category: "tax",
    completed: false
  },
  {
    id: 8,
    question: "I'm a financial instrument that gives the holder the right but not the obligation to buy or sell an asset at a predetermined price. What am I?",
    options: ["Future contract", "Option", "Bond", "Stock"],
    answer: 1,
    explanation: "An option is a financial derivative that gives the holder the right, but not the obligation, to buy or sell an underlying asset at a predetermined price within a specific time period.",
    difficulty: "hard",
    category: "stocks",
    completed: false
  },
  {
    id: 9,
    question: "I'm the statistical measure of how two investments move relative to each other. What am I?",
    options: ["Beta", "Correlation coefficient", "Standard deviation", "Variance"],
    answer: 1,
    explanation: "The correlation coefficient measures how two investments move relative to each other. A correlation of +1 means they move in perfect sync, -1 means they move in opposite directions.",
    difficulty: "hard",
    category: "general",
    completed: false
  },
  {
    id: 10,
    question: "I'm the interest rate that makes the net present value of an investment zero. What am I?",
    options: ["Discount rate", "Internal Rate of Return (IRR)", "Coupon rate", "Prime rate"],
    answer: 1,
    explanation: "The Internal Rate of Return (IRR) is the discount rate that makes the net present value of all cash flows from an investment equal to zero.",
    difficulty: "hard",
    category: "general",
    completed: false
  }
];

export default function InvestmentRiddlesEnhanced() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedRiddle, setSelectedRiddle] = useState<Riddle | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeDifficulty, setActiveDifficulty] = useState<string>("all");
  const [riddlesData, setRiddlesData] = useState<Riddle[]>(investmentRiddles);
  
  const handleBack = () => {
    setLocation("/learning");
  };
  
  const filteredRiddles = riddlesData.filter(riddle => {
    const matchesCategory = activeCategory === "all" || riddle.category === activeCategory;
    const matchesDifficulty = activeDifficulty === "all" || riddle.difficulty === activeDifficulty;
    return matchesCategory && matchesDifficulty;
  });
  
  const easyRiddles = riddlesData.filter(riddle => riddle.difficulty === "easy");
  const mediumRiddles = riddlesData.filter(riddle => riddle.difficulty === "medium");
  const hardRiddles = riddlesData.filter(riddle => riddle.difficulty === "hard");
  
  const handleSelectRiddle = (riddle: Riddle) => {
    setSelectedRiddle(riddle);
    setSelectedOption(null);
    setIsAnswered(false);
  };
  
  const handleSubmitAnswer = () => {
    if (selectedOption === null || !selectedRiddle) return;
    
    const isCorrect = selectedOption === selectedRiddle.answer;
    setIsAnswered(true);
    
    if (isCorrect) {
      toast({
        title: "Excellent!",
        description: "You solved this financial riddle perfectly!",
        variant: "default",
      });
      
      const updatedRiddles = riddlesData.map(r => 
        r.id === selectedRiddle.id ? { ...r, completed: true } : r
      );
      setRiddlesData(updatedRiddles);
    } else {
      toast({
        title: "Good try!",
        description: "Check the explanation to learn more about this concept.",
        variant: "destructive",
      });
    }
  };
  
  const progress = Math.round((riddlesData.filter(r => r.completed).length / riddlesData.length) * 100);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <SEO 
        title="Investment Riddles | RupeeSmart"
        description="Test your financial knowledge with challenging investment riddles and scenarios."
        keywords="investment riddles, financial puzzles, financial literacy"
        canonical="https://rupeesmart.com/investment-riddles"
        ogType="website"
      />
      
      {selectedRiddle ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 py-8"
        >
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setSelectedRiddle(null)}
                className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <span className="text-xl">←</span>
                <span className="font-bold">Back to Riddles</span>
              </button>
              <div className="flex items-center gap-3">
                <Badge className={`px-4 py-2 text-sm font-bold ${
                  selectedRiddle.difficulty === "easy" ? "bg-green-500 text-white" : 
                  selectedRiddle.difficulty === "medium" ? "bg-yellow-500 text-white" : 
                  "bg-red-500 text-white"
                }`}>
                  {selectedRiddle.difficulty.toUpperCase()}
                </Badge>
                <Badge className="bg-blue-500 text-white px-4 py-2 text-sm font-bold">
                  {selectedRiddle.category.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Riddle Card */}
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <span className="text-3xl">🧩</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Financial Riddle #{selectedRiddle.id}</h1>
                    <p className="text-purple-100 text-lg">Test your investment knowledge</p>
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">
                  <h2 className="text-2xl font-medium leading-relaxed">{selectedRiddle.question}</h2>
                </div>
              </div>

              <div className="p-8">
                {/* Options */}
                <div className="grid gap-4 mb-8">
                  {selectedRiddle.options.map((option, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ scale: !isAnswered ? 1.02 : 1 }}
                      whileTap={{ scale: !isAnswered ? 0.98 : 1 }}
                      className={`group relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                        selectedOption === index 
                          ? 'border-purple-500 bg-purple-50 shadow-xl transform scale-[1.02]' 
                          : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                      } ${
                        isAnswered && index === selectedRiddle.answer 
                          ? 'border-green-500 bg-green-50 shadow-xl' : ''
                      } ${
                        isAnswered && selectedOption === index && index !== selectedRiddle.answer 
                          ? 'border-red-500 bg-red-50 shadow-xl' : ''
                      }`}
                      onClick={() => !isAnswered && setSelectedOption(index)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-lg ${
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
                        <span className="text-xl font-medium text-gray-800">{option}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Answer Section */}
                {isAnswered ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        selectedOption === selectedRiddle.answer ? 'bg-green-500' : 'bg-blue-500'
                      }`}>
                        <span className="text-white text-2xl">
                          {selectedOption === selectedRiddle.answer ? '🎉' : '💡'}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {selectedOption === selectedRiddle.answer ? 'Outstanding!' : 'Keep Learning!'}
                      </h3>
                    </div>
                    <p className="text-gray-700 text-xl leading-relaxed mb-8">{selectedRiddle.explanation}</p>
                    
                    <div className="flex gap-4">
                      <Button 
                        onClick={() => setSelectedRiddle(null)} 
                        className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 px-8 py-4 text-lg font-bold"
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
                        className="px-8 py-4 text-lg font-bold border-2"
                      >
                        Next Challenge →
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <Button 
                    onClick={handleSubmitAnswer} 
                    disabled={selectedOption === null}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 py-6 text-2xl font-bold rounded-2xl shadow-xl transform transition-all hover:scale-105"
                  >
                    {selectedOption !== null ? '🚀 Submit My Answer' : '👆 Select an Answer First'}
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <div className="container mx-auto px-6 py-8">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-8">
              <button 
                onClick={handleBack}
                className="absolute left-6 top-8 flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <span className="text-xl">←</span>
                <span className="font-bold">Back</span>
              </button>
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <span className="text-5xl">🧩</span>
              </div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Investment Riddles
            </h1>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Challenge your financial wisdom with brain-teasing riddles that transform learning into an adventure
            </p>
          </motion.div>

          {/* Progress Dashboard */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-2xl p-10 mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">Your Progress</h3>
                <p className="text-xl text-gray-600">Master financial concepts one riddle at a time!</p>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-purple-600">{riddlesData.filter(r => r.completed).length}</div>
                  <div className="text-lg text-gray-500">Solved</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600">{riddlesData.length}</div>
                  <div className="text-lg text-gray-500">Total</div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between text-lg font-medium text-gray-700 mb-3">
                <span>Completion Progress</span>
                <span>{progress}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 h-6 rounded-full"
                ></motion.div>
              </div>
            </div>
          </motion.div>

          {/* Difficulty Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              { id: "easy", name: "Easy Riddles", icon: "🟢", count: easyRiddles.length, color: "green", desc: "Perfect for beginners starting their financial journey" },
              { id: "medium", name: "Medium Riddles", icon: "🟡", count: mediumRiddles.length, color: "yellow", desc: "Test your growing financial knowledge" },
              { id: "hard", name: "Hard Riddles", icon: "🔴", count: hardRiddles.length, color: "red", desc: "Advanced challenges for financial experts" }
            ].map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => setActiveDifficulty(category.id)}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-5xl">{category.icon}</div>
                  <Badge className={`${
                    category.color === 'green' ? 'bg-green-100 text-green-800' :
                    category.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  } px-4 py-2 text-lg font-bold`}>
                    {category.count} Riddles
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{category.name}</h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">{category.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg text-gray-500">
                    {riddlesData.filter(r => r.difficulty === category.id && r.completed).length} completed
                  </span>
                  <button className={`px-6 py-3 ${
                    category.color === 'green' ? 'bg-green-500 hover:bg-green-600' :
                    category.color === 'yellow' ? 'bg-yellow-500 hover:bg-yellow-600' :
                    'bg-red-500 hover:bg-red-600'
                  } text-white rounded-xl font-bold text-lg transition-colors shadow-lg`}>
                    Start Challenge →
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Topic Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Topic</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {[
                { id: "all", name: "All Topics", icon: "📋" },
                { id: "stocks", name: "Stocks", icon: "📈" },
                { id: "mutual-funds", name: "Mutual Funds", icon: "🏛️" },
                { id: "retirement", name: "Retirement", icon: "🏖️" },
                { id: "banking", name: "Banking", icon: "🏦" },
                { id: "tax", name: "Tax Planning", icon: "📊" },
                { id: "general", name: "General Finance", icon: "💰" }
              ].map((topic) => (
                <motion.button
                  key={topic.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(topic.id)}
                  className={`flex flex-col items-center gap-3 p-6 rounded-2xl transition-all font-bold ${
                    activeCategory === topic.id 
                      ? 'bg-purple-500 text-white shadow-xl transform scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700 shadow-md'
                  }`}
                >
                  <span className="text-3xl">{topic.icon}</span>
                  <span className="text-sm text-center">{topic.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Riddles Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredRiddles.map((riddle, index) => (
              <motion.div
                key={riddle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden ${
                  riddle.completed ? 'ring-4 ring-green-200' : ''
                }`}
                onClick={() => handleSelectRiddle(riddle)}
              >
                <div className={`p-8 ${
                  riddle.difficulty === 'easy' ? 'bg-gradient-to-br from-green-50 to-green-100' :
                  riddle.difficulty === 'medium' ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' :
                  'bg-gradient-to-br from-red-50 to-red-100'
                }`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                        riddle.difficulty === 'easy' ? 'bg-green-500' :
                        riddle.difficulty === 'medium' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}>
                        #{riddle.id}
                      </div>
                      {riddle.completed && (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">✓</span>
                        </div>
                      )}
                    </div>
                    <Badge className={`${
                      riddle.difficulty === 'easy' ? 'bg-green-200 text-green-800' :
                      riddle.difficulty === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-red-200 text-red-800'
                    } px-3 py-1 font-bold`}>
                      {riddle.difficulty}
                    </Badge>
                  </div>
                  
                  <Badge className="bg-blue-100 text-blue-800 mb-4 px-3 py-1 font-bold">
                    {riddle.category.replace('-', ' ')}
                  </Badge>
                  
                  <h3 className="font-bold text-gray-800 text-xl mb-6 line-clamp-3 leading-tight">
                    {riddle.question}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-600 font-medium">
                      {riddle.completed ? '✅ Solved' : '🎯 Ready to solve'}
                    </span>
                    <button className={`px-6 py-3 rounded-xl font-bold text-lg transition-colors shadow-lg ${
                      riddle.completed 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}>
                      {riddle.completed ? 'Review' : 'Solve'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}