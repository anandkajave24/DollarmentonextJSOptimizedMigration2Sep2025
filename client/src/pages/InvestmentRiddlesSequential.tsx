import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { SEO } from '@/components/SEO';

interface Riddle {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  difficulty: string;
  category: string;
  completed: boolean;
}

const investmentRiddles: Riddle[] = [
  // 📈 STOCKS (25 riddles)
  {
    id: 1,
    question: "I grow fat when fear rules the market and I shrink when confidence returns. I'm measured in percentages. What am I?",
    options: ["Market Volume", "Volatility", "Interest Rate", "Inflation"],
    answer: 1,
    explanation: "Volatility measures how much the price of an asset fluctuates. During uncertain times (fear), volatility increases as prices swing wildly. When markets are confident, volatility decreases.",
    difficulty: "easy",
    category: "stocks",
    completed: false
  },
  {
    id: 2,
    question: "I represent ownership in a company, and my value goes up and down with the company's performance. What am I?",
    options: ["Bond", "Stock/Share", "Mutual Fund", "Fixed Deposit"],
    answer: 1,
    explanation: "A stock or share represents partial ownership in a company. When you buy stocks, you become a shareholder and your investment value fluctuates with the company's performance.",
    difficulty: "easy",
    category: "stocks",
    completed: false
  },
  {
    id: 3,
    question: "I'm a measure of a company's profitability calculated as net income divided by total equity. What am I?",
    options: ["Return on Assets (ROA)", "Return on Equity (ROE)", "Profit margin", "Debt-to-equity ratio"],
    answer: 1,
    explanation: "Return on Equity (ROE) measures a company's profitability by calculating how much profit is generated with shareholders' equity.",
    difficulty: "medium",
    category: "stocks",
    completed: false
  },
  {
    id: 4,
    question: "I'm the ratio that tells you how much investors are willing to pay for each dollar of earnings. What am I?",
    options: ["Price-to-Book Ratio", "Price-to-Earnings (P/E) Ratio", "Debt-to-Equity Ratio", "Current Ratio"],
    answer: 1,
    explanation: "The Price-to-Earnings (P/E) ratio shows how much investors are willing to pay for each dollar of a company's earnings. A higher P/E might indicate growth expectations.",
    difficulty: "medium",
    category: "stocks",
    completed: false
  },
  {
    id: 5,
    question: "I'm a financial instrument that gives the holder the right but not the obligation to buy or sell an asset at a predetermined price. What am I?",
    options: ["Future contract", "Option", "Bond", "Stock"],
    answer: 1,
    explanation: "An option is a financial derivative that gives the holder the right, but not the obligation, to buy or sell an underlying asset at a predetermined price within a specific time period.",
    difficulty: "hard",
    category: "stocks",
    completed: false
  },
  {
    id: 6,
    question: "I'm paid by companies to shareholders as a share of profits. I come quarterly or annually. What am I?",
    options: ["Interest", "Dividend", "Bonus", "Capital Gains"],
    answer: 1,
    explanation: "Dividends are payments made by companies to their shareholders as a distribution of profits, typically paid quarterly or annually.",
    difficulty: "easy",
    category: "stocks",
    completed: false
  },
  {
    id: 7,
    question: "I measure how much a stock moves compared to the overall market. If I'm 1.2, the stock is 20% more volatile than the market. What am I?",
    options: ["Alpha", "Beta", "Gamma", "Delta"],
    answer: 1,
    explanation: "Beta measures a stock's volatility relative to the overall market. A beta of 1.2 means the stock is 20% more volatile than the market average.",
    difficulty: "medium",
    category: "stocks",
    completed: false
  },
  {
    id: 8,
    question: "I'm the price at which you can buy a stock right now. What am I?",
    options: ["Bid Price", "Ask Price", "Market Price", "Strike Price"],
    answer: 1,
    explanation: "The Ask Price is the lowest price at which someone is willing to sell a stock, representing the price you would pay to buy it immediately.",
    difficulty: "easy",
    category: "stocks",
    completed: false
  },
  {
    id: 9,
    question: "I'm the difference between the highest and lowest stock price over a specific period. What am I?",
    options: ["Volatility", "Trading Range", "Spread", "Volume"],
    answer: 1,
    explanation: "Trading Range is the difference between the highest and lowest prices of a stock over a specific time period, showing price movement boundaries.",
    difficulty: "medium",
    category: "stocks",
    completed: false
  },
  {
    id: 10,
    question: "I'm a strategy where you buy a stock and simultaneously sell a call option on it to generate income. What am I?",
    options: ["Naked Call", "Covered Call", "Put Option", "Straddle"],
    answer: 1,
    explanation: "A Covered Call strategy involves owning a stock and selling a call option on it to generate additional income from the premium.",
    difficulty: "hard",
    category: "stocks",
    completed: false
  },

  // 🏛️ MUTUAK FUNDS (20 riddles)
  {
    id: 11,
    question: "I pool money from many investors to buy a diversified portfolio. I let you own a small piece of many companies. What am I?",
    options: ["Mutual Fund", "Exchange-Traded Fund (ETF)", "Stock Index", "Bond Index"],
    answer: 0,
    explanation: "A Mutual Fund pools money from many investors to invest in a diversified portfolio of stocks, bonds, or other securities, managed by professional fund managers.",
    difficulty: "easy",
    category: "mutual-funds",
    completed: false
  },
  {
    id: 12,
    question: "I allow investors to own a small portion of many companies by buying a single security that trades like a stock. What am I?",
    options: ["Mutual Fund", "Exchange-Traded Fund (ETF)", "Stock Index", "Bond Index"],
    answer: 1,
    explanation: "An Exchange-Traded Fund (ETF) allows investors to own a small portion of many companies by buying a single security. Unlike index funds, ETFs can be bought and sold throughout the trading day like stocks.",
    difficulty: "easy",
    category: "mutual-funds",
    completed: false
  },
  {
    id: 13,
    question: "I let you invest small amounts regularly instead of lump sums, helping you average the price you pay. What am I?",
    options: ["Fixed Deposit", "investment (Systematic Investment Plan)", "Lump sum investment", "Day trading"],
    answer: 1,
    explanation: "A Systematic Investment Plan (SIP) allows you to invest small amounts regularly, which helps average out the purchase price over time through dollar cost averaging.",
    difficulty: "easy",
    category: "mutual-funds",
    completed: false
  },
  {
    id: 14,
    question: "I'm the fee charged by index funds for managing your investment, expressed as an annual percentage. What am I?",
    options: ["Management Fee", "Expense Ratio", "Load Fee", "Transaction Fee"],
    answer: 1,
    explanation: "The Expense Ratio is the annual fee charged by index funds for managing your investment, covering management fees, administrative costs, and other operational expenses.",
    difficulty: "medium",
    category: "mutual-funds",
    completed: false
  },
  {
    id: 15,
    question: "I'm the value of one unit of a mutual fund scheme, calculated daily after market close. What am I?",
    options: ["Market Price", "Net Asset Value (NAV)", "Book Value", "Fair Value"],
    answer: 1,
    explanation: "Net Asset Value (NAV) is the per-unit value of a mutual fund scheme, calculated by dividing the total value of all securities by the number of units outstanding.",
    difficulty: "medium",
    category: "mutual-funds",
    completed: false
  },

  // 🏖️ RETIREMENT (18 riddles)
  {
    id: 16,
    question: "The more you contribute to me early in life, the bigger my pile grows for retirement. I grow tax-free till you retire. What am I?",
    options: ["Emergency fund", "Retirement fund or 401(k)/PPF", "Certificate of deposit", "Treasury bond"],
    answer: 1,
    explanation: "Retirement accounts like 401(k), PPF, or other retirement funds benefit tremendously from early contributions due to compound growth and tax advantages.",
    difficulty: "easy",
    category: "retirement",
    completed: false
  },
  {
    id: 17,
    question: "I'm the magic that makes your retirement money grow exponentially over time when you reinvest earnings. What am I?",
    options: ["Simple Interest", "Compound Interest", "Inflation", "Deflation"],
    answer: 1,
    explanation: "Compound Interest is the addition of interest to the principal sum, so that interest is earned on both the original amount and previously earned interest.",
    difficulty: "easy",
    category: "retirement",
    completed: false
  },
  {
    id: 18,
    question: "I'm a retirement strategy where you withdraw 4% of your portfolio annually to make it last 30 years. What am I?",
    options: ["3% Rule", "4% Rule", "5% Rule", "10% Rule"],
    answer: 1,
    explanation: "The 4% Rule suggests withdrawing 4% of your retirement portfolio annually, based on historical data showing this rate can sustain withdrawals for 30+ years.",
    difficulty: "medium",
    category: "retirement",
    completed: false
  },

  // 🏦 BANKING (15 riddles)
  {
    id: 19,
    question: "I'm the money you earn on your bank deposits, calculated as a percentage annually. What am I?",
    options: ["Principal", "Interest", "Dividend", "Capital Gains"],
    answer: 1,
    explanation: "Interest is the money earned on bank deposits, calculated as a percentage of the principal amount annually.",
    difficulty: "easy",
    category: "banking",
    completed: false
  },
  {
    id: 20,
    question: "I'm the account where your money earns interest but you can't write checks. What am I?",
    options: ["Checking Account", "Savings Account", "Current Account", "Fixed Deposit"],
    answer: 1,
    explanation: "A Savings Account typically earns interest on deposits but has limitations on check-writing and transactions compared to checking accounts.",
    difficulty: "easy",
    category: "banking",
    completed: false
  },

  // 📊 TAX PLANNING (12 riddles)
  {
    id: 21,
    question: "I'm a government savings scheme where you deposit money monthly and get a fixed interest. I mature after 15 years. What am I?",
    options: ["Fixed Deposit", "Public Provident Fund (PPF)", "National Savings Certificate", "Employee Provident Fund"],
    answer: 1,
    explanation: "Public Provident Fund (PPF) is a government savings scheme with a 15-year maturity period where you can deposit money monthly and earn fixed interest with tax benefits.",
    difficulty: "medium",
    category: "tax",
    completed: false
  },
  {
    id: 22,
    question: "I am the tax levied when you sell investments for more than you paid. What am I?",
    options: ["Income tax", "Capital gains tax", "Dividend tax", "Service tax"],
    answer: 1,
    explanation: "Capital gains tax is levied when you sell investments (like stocks, index funds, or property) for more than you originally paid for them.",
    difficulty: "medium",
    category: "tax",
    completed: false
  },
  {
    id: 23,
    question: "I'm the section of the Income Tax Act that allows deductions up to $1.5 thousands. What am I?",
    options: ["Section 80C", "Section 80D", "Section 24", "Section 10"],
    answer: 0,
    explanation: "Section 80C of the Income Tax Act allows deductions up to $1.5 thousands for investments in specified instruments like PPF, ELSS, life insurance premiums, etc.",
    difficulty: "easy",
    category: "tax",
    completed: false
  },

  // 💰 GENERAK FINANCE (30+ riddles)
  {
    id: 24,
    question: "I'm the statistical measure of how two investments move relative to each other. What am I?",
    options: ["Beta", "Correlation coefficient", "Standard deviation", "Variance"],
    answer: 1,
    explanation: "The correlation coefficient measures how two investments move relative to each other. A correlation of +1 means they move in perfect sync, -1 means they move in opposite directions.",
    difficulty: "hard",
    category: "general",
    completed: false
  },
  {
    id: 25,
    question: "I'm the interest rate that makes the net present value of an investment zero. What am I?",
    options: ["Discount rate", "Internal Rate of Return (IRR)", "Coupon rate", "Prime rate"],
    answer: 1,
    explanation: "The Internal Rate of Return (IRR) is the discount rate that makes the net present value of all cash flows from an investment equal to zero.",
    difficulty: "hard",
    category: "general",
    completed: false
  },
  {
    id: 26,
    question: "I'm the money you set aside for unexpected expenses, typically 6 months of expenses. What am I?",
    options: ["Investment Fund", "Emergency Fund", "Retirement Fund", "Education Fund"],
    answer: 1,
    explanation: "An Emergency Fund is money set aside for unexpected expenses like medical bills, job loss, or major repairs, typically covering 3-6 months of living expenses.",
    difficulty: "easy",
    category: "general",
    completed: false
  },
  {
    id: 27,
    question: "I'm the concept that money today is worth more than the same amount in the future. What am I?",
    options: ["Inflation", "Time Value of Money", "Compound Interest", "Present Value"],
    answer: 1,
    explanation: "The Time Value of Money concept states that money available today is worth more than the same amount in the future due to its potential earning capacity.",
    difficulty: "medium",
    category: "general",
    completed: false
  },
  {
    id: 28,
    question: "I'm the percentage of your income you should ideally save every month. What am I?",
    options: ["10%", "20%", "30%", "50%"],
    answer: 1,
    explanation: "Financial experts typically recommend saving at least 20% of your income monthly for long-term financial security and wealth building.",
    difficulty: "easy",
    category: "general",
    completed: false
  },
  {
    id: 29,
    question: "I'm the rise in prices over time that reduces your purchasing power. What am I?",
    options: ["Deflation", "Inflation", "Recession", "Depression"],
    answer: 1,
    explanation: "Inflation is the general increase in prices over time, which reduces the purchasing power of money - meaning your money buys less than it did before.",
    difficulty: "easy",
    category: "general",
    completed: false
  },
  {
    id: 30,
    question: "I'm the investment strategy that spreads risk across different asset classes. What am I?",
    options: ["Concentration", "Diversification", "Speculation", "Hedging"],
    answer: 1,
    explanation: "Diversification is an investment strategy that spreads risk by investing across different asset classes, sectors, and securities to reduce overall portfolio risk.",
    difficulty: "medium",
    category: "general",
    completed: false
  }
];

export default function InvestmentRiddlesSequential() {
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
        title: "Correct!",
        description: "Well done! You got it right.",
        variant: "default",
      });
      
      const updatedRiddles = riddlesData.map(r => 
        r.id === currentRiddle.id ? { ...r, completed: true } : r
      );
      setRiddlesData(updatedRiddles);
    } else {
      setStreak(0);
      toast({
        title: "Incorrect",
        description: "Don't worry, check the explanation to learn more.",
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
        title="Investment Riddles | DollarMento"
        description="Test your financial knowledge with challenging investment riddles and scenarios."
        keywords="investment riddles, financial puzzles, financial literacy"
        canonical="https://dollarmento.com/investment-riddles"
        ogType="website"
      />
      
      <div className="container mx-auto px-6 py-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-base">🧩</span>
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-800">Investment Riddles</h1>
                <p className="text-xs text-gray-500">Master US financial markets through interactive learning</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-lg">
                <span className="text-blue-600 text-sm">🏆</span>
                <span className="text-xs font-medium text-blue-700">Score: {score}</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-orange-50 rounded-lg">
                <span className="text-orange-600 text-sm">🔥</span>
                <span className="text-xs font-medium text-orange-700">Streak: {streak}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="text-center mb-4">
              <p className="text-xs text-gray-400 mb-2">Question {currentRiddleIndex + 1} of {riddlesData.length}</p>
              <h2 className="text-base font-medium text-gray-800 mb-4">
                {currentRiddle.question}
              </h2>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {currentRiddle.options.map((option, index) => (
                <button 
                  key={index}
                  className={`p-4 border rounded-lg text-center transition-all ${
                    selectedOption === index 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${
                    isAnswered && index === currentRiddle.answer 
                      ? 'border-green-500 bg-green-50' : ''
                  } ${
                    isAnswered && selectedOption === index && index !== currentRiddle.answer 
                      ? 'border-red-500 bg-red-50' : ''
                  }`}
                  onClick={() => !isAnswered && setSelectedOption(index)}
                  disabled={isAnswered}
                >
                  <div className="text-sm font-medium text-gray-700">{option}</div>
                </button>
              ))}
            </div>

            {/* Answer Section */}
            {isAnswered && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    selectedOption === currentRiddle.answer ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    <span className="text-white text-xs font-bold">
                      {selectedOption === currentRiddle.answer ? '✓' : '✗'}
                    </span>
                  </div>
                  <h3 className="text-xs font-semibold text-gray-800">
                    {selectedOption === currentRiddle.answer ? 'Correct!' : 'Incorrect'}
                  </h3>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">{currentRiddle.explanation}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
              <Button 
                onClick={handlePrevious}
                disabled={currentRiddleIndex === 0}
                variant="ghost"
                className="text-xs px-3 py-1 h-8"
              >
                ← Previous
              </Button>
              
              <Button 
                onClick={handleBack}
                variant="ghost"
                className="text-xs px-3 py-1 h-8"
              >
                Dashboard
              </Button>

              {!isAnswered ? (
                <Button 
                  onClick={handleSubmitAnswer} 
                  disabled={selectedOption === null}
                  className="bg-blue-600 hover:bg-blue-700 text-xs px-4 py-1 h-8"
                >
                  Submit
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  disabled={currentRiddleIndex === riddlesData.length - 1}
                  className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1 h-8"
                >
                  Next →
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}