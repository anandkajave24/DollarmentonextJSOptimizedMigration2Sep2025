import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Home, CheckCircle, AlertTriangle,
  Brain, Heart, Star, Trophy, Target, Zap, PiggyBank, TrendingUp
} from 'lucide-react';

interface Stage1Props {
  onComplete: (results: any) => void;
  onBackToDashboard: () => void;
}

interface PathChoice {
  id: string;
  text: string;
  pathName: string;
  nextScenarios: string[]; // Array of possible next scenarios based on this choice
  pathType: 'conservative' | 'balanced' | 'aggressive' | 'risky';
  consequences: {
    immediate: string;
    mediumTerm: string;
    longTerm: string;
  };
}

interface ScenarioResult {
  scenarioId: string;
  choice: string;
  score: number;
  personality: {
    riskTolerance: number;
    knowledge: number;
    confidence: number;
    discipline: number;
  };
}

const ComprehensiveStage1: React.FC<Stage1Props> = ({ onComplete, onBackToDashboard }) => {
  const [currentScenarioId, setCurrentScenarioId] = useState('money_mindset_start');
  const [scenarioResults, setScenarioResults] = useState<ScenarioResult[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userPath, setUserPath] = useState<string[]>([]);
  const [pathType, setPathType] = useState<'conservative' | 'balanced' | 'aggressive' | 'risky'>('balanced');
  
  // Comprehensive Stage 1 Financial Awareness Scenarios
  const scenarios = [
    {
      id: 'money_mindset_assessment',
      title: 'Your Money Mindset Discovery',
      question: 'You receive $10,000 as a bonus. Your immediate thought is:',
      description: 'This reveals your core relationship with money and financial priorities.',
      choices: [
        {
          id: 'invest_future',
          text: 'This is an opportunity to invest for my future - let me research the best investment options',
          personality: { riskTolerance: 30, knowledge: 25, confidence: 20, discipline: 30 },
          score: 90,
          feedback: 'Excellent mindset! You see money as a tool for building future wealth.',
          consequence: 'This forward-thinking approach typically leads to strong wealth accumulation over time.'
        },
        {
          id: 'emergency_fund',
          text: 'Perfect timing - I need to build my emergency fund first before anything else',
          personality: { riskTolerance: 15, knowledge: 20, confidence: 15, discipline: 35 },
          score: 85,
          feedback: 'Smart priority! Emergency funds provide crucial financial security.',
          consequence: 'This safety-first approach creates strong financial foundations.'
        },
        {
          id: 'immediate_purchase',
          text: 'Great! I can finally buy that gadget/clothes I\'ve been wanting',
          personality: { riskTolerance: 40, knowledge: 5, confidence: 25, discipline: -10 },
          score: 20,
          feedback: 'This shows instant gratification preference - dangerous for wealth building.',
          consequence: 'This pattern typically leads to lifestyle inflation and saving difficulties.'
        },
        {
          id: 'family_contribution',
          text: 'I should give this to my family - they need it more than me',
          personality: { riskTolerance: 10, knowledge: 10, confidence: 5, discipline: 20 },
          score: 50,
          feedback: 'Generous but you also need to secure your own financial future.',
          consequence: 'Balance between family support and personal financial growth is crucial.'
        }
      ]
    },
    {
      id: 'budget_philosophy',
      title: 'Your Budgeting Philosophy',
      question: 'When it comes to tracking every rupee you spend, your approach is:',
      description: 'Budgeting discipline determines long-term financial success more than income level.',
      choices: [
        {
          id: 'detailed_tracker',
          text: 'I track every expense in detail using apps/spreadsheets - knowledge is power',
          personality: { riskTolerance: 20, knowledge: 35, confidence: 25, discipline: 40 },
          score: 95,
          feedback: 'Outstanding discipline! Detailed tracking creates financial awareness and control.',
          consequence: 'People who track expenses save 15-20% more than those who don\'t.'
        },
        {
          id: 'rough_estimates',
          text: 'I keep rough mental notes of major expenses - too much detail is overwhelming',
          personality: { riskTolerance: 25, knowledge: 15, confidence: 15, discipline: 10 },
          score: 60,
          feedback: 'Moderate approach but you might miss important spending patterns.',
          consequence: 'This can work short-term but detailed tracking reveals money leaks.'
        },
        {
          id: 'no_tracking',
          text: 'I don\'t track at all - if money is in account, I can spend it',
          personality: { riskTolerance: 50, knowledge: -10, confidence: 20, discipline: -20 },
          score: 15,
          feedback: 'This approach often leads to overspending and financial surprises.',
          consequence: 'Without tracking, most people spend 30-40% more than they realize.'
        },
        {
          id: 'automatic_savings',
          text: 'I set up automatic savings first, then spend whatever remains freely',
          personality: { riskTolerance: 30, knowledge: 25, confidence: 30, discipline: 35 },
          score: 90,
          feedback: 'Smart automation! "Pay yourself first" is a proven wealth-building strategy.',
          consequence: 'Automated savers accumulate 3x more wealth than manual savers.'
        }
      ]
    },
    {
      id: 'investment_readiness',
      title: 'Investment Readiness Assessment',
      question: 'The stock market drops 20% overnight. Your reaction would be:',
      description: 'Market volatility tests emotional resilience - crucial for investment success.',
      choices: [
        {
          id: 'buying_opportunity',
          text: 'This is a buying opportunity! Markets historically recover and grow long-term',
          personality: { riskTolerance: 40, knowledge: 30, confidence: 35, discipline: 25 },
          score: 90,
          feedback: 'Excellent investor mindset! You understand market cycles and stay rational.',
          consequence: 'Contrarian investors who buy during crashes often achieve best returns.'
        },
        {
          id: 'stay_calm',
          text: 'Stay calm and do nothing - market fluctuations are normal',
          personality: { riskTolerance: 30, knowledge: 25, confidence: 20, discipline: 30 },
          score: 80,
          feedback: 'Good emotional control! Not panicking is crucial for investment success.',
          consequence: 'Patient investors who don\'t react to volatility outperform active traders.'
        },
        {
          id: 'panic_sell',
          text: 'Panic and sell everything - I can\'t afford to lose more money',
          personality: { riskTolerance: 5, knowledge: 5, confidence: -10, discipline: -15 },
          score: 10,
          feedback: 'This emotional reaction destroys wealth! Panic selling locks in losses.',
          consequence: 'Emotional investors typically buy high and sell low, losing money consistently.'
        },
        {
          id: 'seek_advice',
          text: 'Immediately call financial advisor/research expert opinions before deciding',
          personality: { riskTolerance: 20, knowledge: 20, confidence: 10, discipline: 25 },
          score: 70,
          feedback: 'Seeking advice is wise, but develop your own understanding too.',
          consequence: 'Relying solely on others\' opinions can delay decision-making during opportunities.'
        }
      ]
    },
    {
      id: 'debt_philosophy',
      title: 'Debt Management Philosophy',
      question: 'Your friend suggests taking a personal loan to invest in stocks promising 20% returns:',
      description: 'Understanding good vs bad debt is fundamental to financial health.',
      choices: [
        {
          id: 'never_borrow_invest',
          text: 'Never borrow money to invest - this violates basic financial safety principles',
          personality: { riskTolerance: 10, knowledge: 30, confidence: 25, discipline: 35 },
          score: 95,
          feedback: 'Absolutely correct! Leveraged investing is extremely risky and often disastrous.',
          consequence: 'This conservative approach protects you from devastating losses and debt traps.'
        },
        {
          id: 'small_amount_only',
          text: 'Maybe a very small amount just to test - $25,000 maximum',
          personality: { riskTolerance: 25, knowledge: 15, confidence: 15, discipline: 10 },
          score: 40,
          feedback: 'Still risky! Even small leveraged bets can create problems.',
          consequence: 'Small mistakes in leveraged investing often lead to bigger ones.'
        },
        {
          id: 'go_big',
          text: 'If returns are guaranteed, why not take maximum loan and multiply gains?',
          personality: { riskTolerance: 70, knowledge: -15, confidence: 30, discipline: -25 },
          score: 5,
          feedback: 'Extremely dangerous thinking! No returns are guaranteed, and this could ruin you financially.',
          consequence: 'This approach has bankrupted countless people throughout history.'
        },
        {
          id: 'research_first',
          text: 'Research the investment thoroughly, understand risks, then decide with own money only',
          personality: { riskTolerance: 35, knowledge: 25, confidence: 20, discipline: 30 },
          score: 85,
          feedback: 'Smart approach! Research and using only your own money reduces risk significantly.',
          consequence: 'Thorough research and avoiding leverage leads to more consistent returns.'
        }
      ]
    },
    {
      id: 'emergency_planning',
      title: 'Emergency Fund Strategy',
      question: 'How much emergency fund should a person earning $50,000/month maintain?',
      description: 'Emergency funds are the foundation of financial security and peace of mind.',
      choices: [
        {
          id: 'six_months',
          text: '6 months expenses ($3 thousands) - enough to handle most emergencies',
          personality: { riskTolerance: 25, knowledge: 25, confidence: 20, discipline: 30 },
          score: 90,
          feedback: 'Perfect! 6 months is the gold standard for emergency fund adequacy.',
          consequence: 'This amount provides security for job loss, medical emergencies, and major repairs.'
        },
        {
          id: 'three_months',
          text: '3 months expenses ($1.5 thousands) - should be sufficient for most situations',
          personality: { riskTolerance: 30, knowledge: 20, confidence: 25, discipline: 25 },
          score: 75,
          feedback: 'Good start but may not cover extended emergencies like job loss.',
          consequence: '3 months covers short-term issues but longer crises need more buffer.'
        },
        {
          id: 'one_month',
          text: '1 month expenses ($50,000) - can always arrange money from family/friends',
          personality: { riskTolerance: 40, knowledge: 10, confidence: 15, discipline: 10 },
          score: 30,
          feedback: 'Inadequate! Relying on others during emergencies creates dependency and stress.',
          consequence: 'Insufficient emergency funds force bad financial decisions during crises.'
        },
        {
          id: 'twelve_months',
          text: '12 months expenses ($6 thousands) - maximum security against any situation',
          personality: { riskTolerance: 10, knowledge: 15, confidence: 10, discipline: 35 },
          score: 60,
          feedback: 'Very conservative! While safe, this might limit investment opportunities.',
          consequence: 'Excessive emergency funds create opportunity cost - money not growing optimally.'
        }
      ]
    },
    {
      id: 'financial_goals',
      title: 'Financial Goal Setting',
      question: 'Your primary financial goal for the next 5 years should be:',
      description: 'Clear financial goals drive disciplined saving and investment decisions.',
      choices: [
        {
          id: 'wealth_building',
          text: 'Build a diversified investment portfolio worth $25+ thousands through systematic investing',
          personality: { riskTolerance: 35, knowledge: 30, confidence: 30, discipline: 35 },
          score: 95,
          feedback: 'Excellent long-term thinking! Systematic wealth building creates financial freedom.',
          consequence: 'This approach typically results in achieving financial independence early.'
        },
        {
          id: 'home_purchase',
          text: 'Save for down payment to buy a house - real estate is the best investment',
          personality: { riskTolerance: 20, knowledge: 15, confidence: 20, discipline: 30 },
          score: 70,
          feedback: 'Good goal but don\'t put all eggs in real estate basket.',
          consequence: 'Home ownership is valuable but diversified investing often provides better returns.'
        },
        {
          id: 'high_lifestyle',
          text: 'Increase lifestyle and enjoy life - money should be spent, not hoarded',
          personality: { riskTolerance: 45, knowledge: 5, confidence: 25, discipline: -10 },
          score: 20,
          feedback: 'This lifestyle inflation mindset prevents wealth accumulation.',
          consequence: 'High lifestyle expenses typically trap people in earning-spending cycles.'
        },
        {
          id: 'maximum_savings',
          text: 'Save maximum possible amount in FDs - safety and guaranteed returns matter most',
          personality: { riskTolerance: 5, knowledge: 10, confidence: 10, discipline: 40 },
          score: 50,
          feedback: 'Disciplined saving is good but inflation will erode FD returns over time.',
          consequence: 'Excessive conservatism may not build enough wealth for long-term goals.'
        }
      ]
    },
    {
      id: 'peer_pressure_test',
      title: 'Social Pressure Resilience',
      question: 'Friends pressure you to join expensive weekend trips every month ($8,000 each):',
      description: 'Social pressure is one of the biggest obstacles to wealth building for young professionals.',
      choices: [
        {
          id: 'alternative_suggest',
          text: 'Suggest budget-friendly alternatives - good friends will understand financial priorities',
          personality: { riskTolerance: 25, knowledge: 25, confidence: 30, discipline: 35 },
          score: 90,
          feedback: 'Perfect balance! Maintaining relationships while protecting financial goals.',
          consequence: 'This approach builds stronger friendships and financial discipline simultaneously.'
        },
        {
          id: 'occasional_join',
          text: 'Join occasionally (2-3 times per year) and politely decline the rest',
          personality: { riskTolerance: 20, knowledge: 20, confidence: 25, discipline: 25 },
          score: 80,
          feedback: 'Reasonable compromise between social life and financial discipline.',
          consequence: 'Selective participation maintains relationships without breaking budget.'
        },
        {
          id: 'always_join',
          text: 'Always join - relationships and experiences matter more than money',
          personality: { riskTolerance: 40, knowledge: 5, confidence: 20, discipline: -15 },
          score: 25,
          feedback: 'This choice prioritizes short-term social gratification over financial security.',
          consequence: 'Consistent overspending on social activities prevents wealth accumulation.'
        },
        {
          id: 'never_join',
          text: 'Never join any expensive activities - focus solely on saving money',
          personality: { riskTolerance: 10, knowledge: 15, confidence: 5, discipline: 40 },
          score: 40,
          feedback: 'While financially disciplined, complete social isolation has hidden costs.',
          consequence: 'Extreme frugality can damage relationships and mental health long-term.'
        }
      ]
    },
    {
      id: 'financial_education',
      title: 'Learning & Knowledge Building',
      question: 'How do you plan to improve your financial knowledge and skills?',
      description: 'Financial education is the best investment you can make - it pays dividends forever.',
      choices: [
        {
          id: 'systematic_learning',
          text: 'Dedicate 1 hour daily to reading books, courses, and following credible financial experts',
          personality: { riskTolerance: 30, knowledge: 40, confidence: 30, discipline: 35 },
          score: 95,
          feedback: 'Outstanding commitment! Continuous learning is the key to financial success.',
          consequence: 'Systematic financial education typically results in 2-3x better investment returns.'
        },
        {
          id: 'practical_experience',
          text: 'Learn by doing - start small investments and learn from real market experience',
          personality: { riskTolerance: 35, knowledge: 25, confidence: 30, discipline: 25 },
          score: 80,
          feedback: 'Good approach! Practical experience combined with study works best.',
          consequence: 'Hands-on learning with small amounts builds confidence and knowledge safely.'
        },
        {
          id: 'professional_advice',
          text: 'Rely on financial advisors and professionals - they know better than me',
          personality: { riskTolerance: 15, knowledge: 5, confidence: 5, discipline: 20 },
          score: 50,
          feedback: 'Advisors help but you need basic knowledge to make informed decisions.',
          consequence: 'Blind reliance on others can lead to unsuitable advice and poor outcomes.'
        },
        {
          id: 'no_time_learning',
          text: 'No time for financial education - I\'ll figure it out as situations arise',
          personality: { riskTolerance: 30, knowledge: -10, confidence: 15, discipline: 5 },
          score: 15,
          feedback: 'This reactive approach often leads to costly financial mistakes.',
          consequence: 'Lack of financial education typically costs 10-20x more than time invested in learning.'
        }
      ]
    }
  ];

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    } else {
      // Complete Stage 1
      const totalScore = scenarioResults.reduce((sum, result) => sum + result.score, 0);
      const avgScore = totalScore / scenarioResults.length;
      onComplete({
        totalScore,
        averageScore: avgScore,
        scenarioResults,
        stage: 1,
        completed: true
      });
    }
  };

  const selectChoice = (choiceId: string) => {
    const scenario = scenarios[currentScenario];
    const choice = scenario.choices.find(c => c.id === choiceId);
    
    if (choice) {
      setSelectedChoice(choiceId);
      setShowFeedback(true);
      
      const result: ScenarioResult = {
        scenarioId: scenario.id,
        choice: choiceId,
        score: choice.score,
        personality: choice.personality
      };
      
      setScenarioResults([...scenarioResults, result]);
    }
  };

  const currentScenarioData = scenarios[currentScenario];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={onBackToDashboard}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-4 py-2 rounded-lg"
            >
              <Home className="w-4 h-4" />
              Back to Dashboard
            </button>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">Stage 1</div>
              <div className="text-sm text-gray-600">Financial Awareness & Identity</div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-bold text-gray-800">
                {currentScenario + 1} of {scenarios.length}
              </div>
              <div className="text-sm text-gray-600">Scenarios</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500" 
              style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Scenario content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentScenarioData.title}
            </h2>
            <p className="text-gray-600 mb-4">{currentScenarioData.description}</p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800 font-medium">{currentScenarioData.question}</p>
            </div>
          </div>

          {!showFeedback ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Choose your response:
              </h3>
              {currentScenarioData.choices.map((choice, index) => (
                <button
                  key={choice.id}
                  onClick={() => selectChoice(choice.id)}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all duration-200 hover:bg-blue-50"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800">{choice.text}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {selectedChoice && (() => {
                const choice = currentScenarioData.choices.find(c => c.id === selectedChoice)!;
                const isGoodChoice = choice.score >= 80;
                
                return (
                  <div className={`p-6 rounded-xl ${isGoodChoice ? 'bg-green-50 border border-green-200' : choice.score >= 50 ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      {isGoodChoice ? (
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-8 h-8 text-orange-600" />
                      )}
                      <div>
                        <h3 className="text-lg font-bold">Score: {choice.score}/100</h3>
                        <p className="text-sm text-gray-600">
                          {isGoodChoice ? 'Excellent Choice!' : choice.score >= 50 ? 'Moderate Choice' : 'Needs Improvement'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className={`${isGoodChoice ? 'text-green-800' : choice.score >= 50 ? 'text-yellow-800' : 'text-red-800'}`}>
                        <strong>Feedback:</strong> {choice.feedback}
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg mb-4">
                      <p className="text-gray-700">
                        <strong>Long-term Consequence:</strong> {choice.consequence}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">
                          {choice.personality.riskTolerance > 0 ? '+' : ''}{choice.personality.riskTolerance}
                        </div>
                        <div className="text-sm text-gray-600">Risk Tolerance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">
                          {choice.personality.knowledge > 0 ? '+' : ''}{choice.personality.knowledge}
                        </div>
                        <div className="text-sm text-gray-600">Knowledge</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">
                          {choice.personality.confidence > 0 ? '+' : ''}{choice.personality.confidence}
                        </div>
                        <div className="text-sm text-gray-600">Confidence</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">
                          {choice.personality.discipline > 0 ? '+' : ''}{choice.personality.discipline}
                        </div>
                        <div className="text-sm text-gray-600">Discipline</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
              
              <div className="flex justify-center">
                <button
                  onClick={nextScenario}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors"
                >
                  {currentScenario < scenarios.length - 1 ? (
                    <>
                      Next Scenario
                      <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Complete Stage 1
                      <CheckCircle className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveStage1;