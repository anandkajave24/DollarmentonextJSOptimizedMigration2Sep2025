import React, { useState } from "react";
import { useLocation } from "wouter";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import { SEO } from "../components/SEO";

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

export default function InvestmentRiddlesFixed() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [riddlesData, setRiddlesData] = useState<Riddle[]>(investmentRiddles);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  
  const currentRiddle = riddlesData[currentRiddleIndex];
  
  const handleBack = () => {
    setLocation("/learning");
  };
  
  const handleNext = () => {
    if (currentRiddleIndex < riddlesData.length - 1) {
      setCurrentRiddleIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };
  
  const handlePrevious = () => {
    if (currentRiddleIndex > 0) {
      setCurrentRiddleIndex(prev => prev - 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };
  
  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentRiddle) return;
    
    const isCorrect = selectedOption === currentRiddle.answer;
    setIsAnswered(true);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      toast({
        title: "Excellent!",
        description: "You solved this financial riddle perfectly!",
        variant: "default",
      });
      
      const updatedRiddles = riddlesData.map(r => 
        r.id === currentRiddle.id ? { ...r, completed: true } : r
      );
      setRiddlesData(updatedRiddles);
    } else {
      setStreak(0);
      toast({
        title: "Good try!",
        description: "Check the explanation to learn more about this concept.",
        variant: "destructive",
      });
    }
  };
  
  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'stocks': '📈',
      'mutual-funds': '🏛️',
      'retirement': '🏖️',
      'banking': '🏦',
      'tax': '📊',
      'general': '💰'
    };
    return icons[category] || '💰';
  };
  
  const getCategoryName = (category: string) => {
    const names: { [key: string]: string } = {
      'stocks': 'Stocks',
      'mutual-funds': 'Mutual Funds',
      'retirement': 'Retirement',
      'banking': 'Banking',
      'tax': 'Tax Planning',
      'general': 'General Finance'
    };
    return names[category] || 'General Finance';
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Investment Riddles | RupeeSmart"
        description="Test your financial knowledge with challenging investment riddles and scenarios."
        keywords="investment riddles, financial puzzles, financial literacy"
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
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🧩</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Financial Riddle #{selectedRiddle.id}</h1>
                    <p className="text-blue-100 text-sm">Test your investment knowledge</p>
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h2 className="text-lg font-medium leading-relaxed">{selectedRiddle.question}</h2>
                </div>
              </div>

              <div className="p-8">
                {/* Options */}
                <div className="grid gap-4 mb-8">
                  {selectedRiddle.options.map((option, index) => (
                    <div 
                      key={index}
                      className={`group relative p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedOption === index 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      } ${
                        isAnswered && index === selectedRiddle.answer 
                          ? 'border-green-500 bg-green-50' : ''
                      } ${
                        isAnswered && selectedOption === index && index !== selectedRiddle.answer 
                          ? 'border-red-500 bg-red-50' : ''
                      }`}
                      onClick={() => !isAnswered && setSelectedOption(index)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-medium text-sm ${
                          selectedOption === index && !isAnswered
                            ? 'border-blue-500 bg-blue-500 text-white' 
                            : 'border-gray-300 text-gray-500'
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
                        <span className="text-base font-medium text-gray-800">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Answer Section */}
                {isAnswered ? (
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedOption === selectedRiddle.answer ? 'bg-green-500' : 'bg-blue-500'
                      }`}>
                        <span className="text-white text-lg">
                          {selectedOption === selectedRiddle.answer ? '✓' : 'i'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {selectedOption === selectedRiddle.answer ? 'Correct!' : 'Keep Learning!'}
                      </h3>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-6">{selectedRiddle.explanation}</p>
                    
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => setSelectedRiddle(null)} 
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm"
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
                        className="px-4 py-2 text-sm"
                      >
                        Next →
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    onClick={handleSubmitAnswer} 
                    disabled={selectedOption === null}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-base font-medium rounded-lg"
                  >
                    {selectedOption !== null ? 'Submit Answer' : 'Select an Answer First'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-3">
              <button 
                onClick={handleBack}
                className="absolute left-6 top-6 flex items-center gap-1 px-3 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <span className="text-base">←</span>
                <span className="font-medium text-sm">Back</span>
              </button>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-xl">🧩</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Investment Riddles
            </h1>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              Test your financial knowledge with these brain-teasing riddles
            </p>
          </div>





          {/* Topic Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Choose Your Topic</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
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
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all text-sm ${
                    activeCategory === topic.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                  }`}
                >
                  <span className="text-xl">{topic.icon}</span>
                  <span className="text-xs text-center font-medium">{topic.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Riddles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRiddles.map((riddle) => (
              <div
                key={riddle.id}
                className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden ${
                  riddle.completed ? 'border border-green-200' : ''
                }`}
                onClick={() => handleSelectRiddle(riddle)}
              >
                <div className={`p-4 ${
                  riddle.difficulty === 'easy' ? 'bg-green-50' :
                  riddle.difficulty === 'medium' ? 'bg-yellow-50' :
                  'bg-red-50'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        riddle.difficulty === 'easy' ? 'bg-green-600' :
                        riddle.difficulty === 'medium' ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}>
                        #{riddle.id}
                      </div>
                      {riddle.completed && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <Badge className={`${
                      riddle.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      riddle.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    } px-2 py-1 text-xs`}>
                      {riddle.difficulty}
                    </Badge>
                  </div>
                  
                  <Badge className="bg-blue-100 text-blue-700 mb-3 px-2 py-1 text-xs">
                    {riddle.category.replace('-', ' ')}
                  </Badge>
                  
                  <h3 className="font-bold text-gray-800 text-sm mb-4 line-clamp-3 leading-tight">
                    {riddle.question}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">
                      {riddle.completed ? '✅ Solved' : '🎯 Ready'}
                    </span>
                    <button className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      riddle.completed 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
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