import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { SEO } from "../components/SEO";
import FinancialDisclaimer from "../components/FinancialDisclaimer";

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    score: number;
  }[];
}

// Updated questions based on the Streamlit code
const questions: Question[] = [
  {
    id: 1,
    text: "How long do you plan to invest your money?",
    options: [
      { id: "1a", text: "Less than 3 years", score: 1 },
      { id: "1b", text: "3-5 years", score: 2 },
      { id: "1c", text: "5-10 years", score: 3 },
      { id: "1d", text: "More than 10 years", score: 4 }
    ]
  },
  {
    id: 2,
    text: "How would you react if your investment value dropped by 20%?",
    options: [
      { id: "2a", text: "Sell immediately to prevent further losses", score: 1 },
      { id: "2b", text: "Sell some investments", score: 2 },
      { id: "2c", text: "Hold and wait for recovery", score: 3 },
      { id: "2d", text: "Buy more at lower prices", score: 4 }
    ]
  },
  {
    id: 3,
    text: "What is your primary investment goal?",
    options: [
      { id: "3a", text: "Preserve capital", score: 1 },
      { id: "3b", text: "Generate steady income", score: 2 },
      { id: "3c", text: "Balanced growth and income", score: 3 },
      { id: "3d", text: "Maximize long-term growth", score: 4 }
    ]
  },
  {
    id: 4,
    text: "What is your investment experience level?",
    options: [
      { id: "4a", text: "No experience", score: 1 },
      { id: "4b", text: "Some experience", score: 2 },
      { id: "4c", text: "Experienced", score: 3 },
      { id: "4d", text: "Very experienced", score: 4 }
    ]
  },
  {
    id: 5,
    text: "What percentage of your monthly income can you invest?",
    options: [
      { id: "5a", text: "Less than 10%", score: 1 },
      { id: "5b", text: "10-20%", score: 2 },
      { id: "5c", text: "20-30%", score: 3 },
      { id: "5d", text: "More than 30%", score: 4 }
    ]
  }
];

// Define the interface for the allocation
interface Allocation {
  [key: string]: number;
}

// Updated risk profiles and allocations based on Streamlit code
const riskProfiles: {
  name: string;
  range: [number, number];
  description: string;
  allocation: Allocation;
}[] = [
  {
    name: "Conservative",
    range: [5, 7],
    description: "You prioritize protecting your capital over growth. A portfolio with mostly fixed income instruments and a small allocation to equities may be suitable.",
    allocation: {
      'Fixed Deposits': 40,
      'Government Bonds': 30,
      'Blue-chip Stocks': 20,
      'Gold': 10
    }
  },
  {
    name: "Moderate",
    range: [8, 14],
    description: "You seek a balance between growth and stability. A diversified portfolio with a mix of equities and fixed income may be appropriate.",
    allocation: {
      'Mutual Funds': 40,
      'Stocks': 30,
      'Fixed Deposits': 20,
      'Gold': 10
    }
  },
  {
    name: "Aggressive",
    range: [15, 20],
    description: "You aim for high growth and can tolerate significant fluctuations. A portfolio with a higher allocation to equities may align with your goals.",
    allocation: {
      'Stocks': 50,
      'Mutual Funds': 30,
      'Fixed Deposits': 10,
      'Gold': 10
    }
  }
];

export default function RiskAssessment() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [completed, setCompleted] = useState(false);
  
  const totalScore = Object.entries(answers).reduce((total, [questionId, answerId]) => {
    const question = questions.find(q => q.id === parseInt(questionId));
    if (!question) return total;
    
    const option = question.options.find(o => o.id === answerId);
    if (!option) return total;
    
    return total + option.score;
  }, 0);
  
  const riskProfile = riskProfiles.find(profile => 
    totalScore >= profile.range[0] && totalScore <= profile.range[1]
  ) || riskProfiles[0];
  
  const handleAnswer = (questionId: number, answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };
  
  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const handleReset = () => {
    setAnswers({});
    setCurrentQuestion(1);
    setCompleted(false);
  };
  
  const progressPercentage = (Object.keys(answers).length / questions.length) * 100;
  
  return (
    <div className="px-6 py-6 max-w-4xl mr-auto ml-4">
      <SEO 
        title="Investment Risk Assessment"
        description="Take this quick quiz to understand your risk appetite and get personalized investment suggestions tailored to your financial goals."
        keywords="risk assessment, investment risk profile, risk tolerance, financial quiz, investment suggestions, portfolio allocation, conservative investor, aggressive investor"
        canonical="https://dollarmento.com/risk-assessment"
      />
      <div className="flex items-center mb-6">
        <button 
          onClick={() => window.history.back()}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <h1 className="text-2xl font-bold">Investment Risk Assessment</h1>
      </div>
      
      <p className="text-gray-600 mb-6">
        Take this quick quiz to understand your risk appetite and get personalized investment suggestions.
      </p>

      {!completed ? (
        <Card className="w-full">
          <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
            <CardTitle className="text-black dark:text-white">Financial Risk Tolerance Assessment</CardTitle>
            <CardDescription>Answer the following questions to determine your risk profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Question {currentQuestion} of {questions.length}</span>
                <span>{Math.round(progressPercentage)}% Complete</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">{questions[currentQuestion - 1].text}</h3>
              
              <RadioGroup 
                value={answers[currentQuestion] || ""}
                onValueChange={(value) => handleAnswer(currentQuestion, value)}
                className="space-y-3"
              >
                {questions[currentQuestion - 1].options.map(option => (
                  <div key={option.id} className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-gray-50">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="flex-1 cursor-pointer">{option.text}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 1}
            >
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
            >
              {currentQuestion === questions.length ? "See Results" : "Next"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
              <CardTitle className="text-black dark:text-white">Your Risk Profile</CardTitle>
              <CardDescription>Based on your answers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mb-4">
                  <div className="text-white font-bold text-lg">{riskProfile.name}</div>
                </div>
                
                <div className="text-sm text-gray-600 mb-6">
                  {riskProfile.description}
                </div>
                
                <div className="w-full">
                  <h4 className="font-medium text-center mb-3">Recommended Asset Allocation</h4>
                  <div className="space-y-3 w-full">
                    {Object.entries(riskProfile.allocation).map(([asset, percentage]) => (
                      <div key={asset}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{asset}</span>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                        <Progress value={percentage} className="h-2 bg-gray-200" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={handleReset}>
                Retake Assessment
              </Button>
            </CardFooter>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
              <CardTitle className="text-black dark:text-white">Investment Recommendations</CardTitle>
              <CardDescription>Tailored to your {riskProfile.name.toLowerCase()} risk profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {riskProfile.name === "Conservative" && (
                  <>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Fixed Income Options</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Government bonds and treasury bills</li>
                        <li>High-quality corporate bonds</li>
                        <li>Fixed deposits with reputable banks</li>
                        <li>Debt index funds with short to medium duration</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Limited Equity Exposure</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Blue-chip stocks with history of stable dividends</li>
                        <li>Large-cap equity funds with lower volatility</li>
                        <li>Index funds tracking established markets</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Risk Management Strategies</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Maintain 6-12 months of expenses in emergency fund</li>
                        <li>Diversify across banks and financial institutions</li>
                        <li>Consider inflation-indexed bonds for inflation protection</li>
                      </ul>
                    </div>
                  </>
                )}
                
                {riskProfile.name === "Moderate" && (
                  <>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Balanced Investment Approach</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Balanced index funds with equity and debt components</li>
                        <li>Mix of large-cap and mid-cap equity funds</li>
                        <li>Regular investment through investments to average market fluctuations</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Fixed Income Stability</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Corporate bonds with moderate duration</li>
                        <li>Banking and PSU debt funds</li>
                        <li>Government securities for safety</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Diversification Strategies</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Consider international equity exposure for geographical diversification</li>
                        <li>Gold ETFs or Sovereign Gold Bonds as hedge against uncertainty</li>
                        <li>REITs for real estate exposure without direct property investment</li>
                      </ul>
                    </div>
                  </>
                )}
                
                {riskProfile.name === "Aggressive" && (
                  <>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">High Growth Equity Focus</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Diversified equity funds with focus on growth</li>
                        <li>Sectoral and thematic funds in promising industries</li>
                        <li>Mid-cap and small-cap funds for higher growth potential</li>
                        <li>International equity funds for global market exposure</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Strategic Debt Allocation</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Dynamic bond funds for flexibility</li>
                        <li>Credit risk funds for higher yields (with careful selection)</li>
                        <li>Strategic allocation to debt for portfolio rebalancing</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Advanced Investment Strategies</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Consider tactical asset allocation based on market conditions</li>
                        <li>Systematic transfer plans from debt to equity during market corrections</li>
                        <li>Portfolio rebalancing at regular intervals</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="secondary">
                <span className="material-icons mr-2 text-sm">download</span>
                Download Full Report
              </Button>
            </CardFooter>
          </Card>
          
          {/* Risk Assessment Disclaimer */}
          <div className="md:col-span-3 mt-2">
            <FinancialDisclaimer 
              variant="default" 
              calculatorType="generic" 
              size="md" 
            />
          </div>
        </div>
      )}
    </div>
  );
}