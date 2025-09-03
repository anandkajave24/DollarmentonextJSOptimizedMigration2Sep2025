import React, { useState } from 'react';
import { 
  Wallet, TrendingUp, DollarSign, Shield, Home, 
  Brain, Heart, Star, Trophy, CreditCard, 
  ArrowRight, ArrowDown, CheckCircle, AlertTriangle,
  Target, Briefcase, PiggyBank, Zap
} from 'lucide-react';

interface EnhancedGameState {
  currentStage: number;
  currentScenario: string | null;
  playerProfile: {
    name: string;
    age: number;
    city: string;
    jobLevel: 'fresher' | 'experienced' | 'senior';
  };
  financialMetrics: {
    monthlyIncome: number;
    totalSavings: number;
    investments: number;
    debt: number;
    emergencyFund: number;
    creditScore: number;
    expenses: number;
  };
  personalityTraits: {
    riskTolerance: number; // 0-100
    financialKnowledge: number; // 0-100
    confidence: number; // 0-100
    discipline: number; // 0-100
    socialInfluence: number; // 0-100
  };
  gameProgress: {
    scenariosCompleted: string[];
    achievements: string[];
    barriers: string[];
    lifestyleMilestones: string[];
    monthsPassed: number;
    totalScore: number;
  };
  realWorldImpact: {
    familyRelationship: number; // 0-100
    careerGrowth: number; // 0-100
    socialStanding: number; // 0-100
    mentalHealth: number; // 0-100
    futureReadiness: number; // 0-100
  };
}

interface EnhancedScenario {
  id: string;
  title: string;
  description: string;
  context: string; // Detailed background
  urgency: 'low' | 'medium' | 'high' | 'critical';
  complexity: 'basic' | 'intermediate' | 'advanced' | 'expert';
  realWorldData: {
    statisticalContext: string;
    marketConditions: string;
    economicFactors: string;
  };
  choices: EnhancedChoice[];
  learningObjectives: string[];
  skillsRequired: string[];
}

interface EnhancedChoice {
  id: string;
  text: string;
  pathName: string;
  pathDescription: string;
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  timeHorizon: 'immediate' | 'short-term' | 'medium-term' | 'long-term';
  consequences: {
    financial: {
      income?: number;
      savings?: number;
      investments?: number;
      debt?: number;
      expenses?: number;
      creditScore?: number;
      emergencyFund?: number;
    };
    personality: {
      riskTolerance?: number;
      knowledge?: number;
      confidence?: number;
      discipline?: number;
      socialInfluence?: number;
    };
    realWorld: {
      familyRelationship?: number;
      careerGrowth?: number;
      socialStanding?: number;
      mentalHealth?: number;
      futureReadiness?: number;
    };
  };
  feedback: {
    immediate: string;
    shortTerm: string; // 3 months
    mediumTerm: string; // 1 year
    longTerm: string; // 5 years
  };
  marketReality: string; // Real market data context
  expertInsight: string; // Professional financial advice
  warningFlags: string[];
  successIndicators: string[];
  isOptimal: boolean;
  pathColor: string;
}

interface EnhancedSalariedGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const EnhancedSalariedGame: React.FC<EnhancedSalariedGameProps> = ({ onComplete, onBack }) => {
  const [gameState, setGameState] = useState<EnhancedGameState>({
    currentStage: 1,
    currentScenario: 'financial_personality_assessment',
    playerProfile: {
      name: 'Professional',
      age: 24,
      city: 'Mumbai',
      jobLevel: 'fresher'
    },
    financialMetrics: {
      monthlyIncome: 50000,
      totalSavings: 0,
      investments: 0,
      debt: 0,
      emergencyFund: 0,
      creditScore: 0, // No credit history
      expenses: 0
    },
    personalityTraits: {
      riskTolerance: 30, // Conservative start
      financialKnowledge: 0, // Complete beginner
      confidence: 20, // Low confidence
      discipline: 40, // Moderate discipline
      socialInfluence: 60 // High social influence
    },
    gameProgress: {
      scenariosCompleted: [],
      achievements: [],
      barriers: ['No Financial Knowledge', 'No Emergency Fund', 'No Credit History'],
      lifestyleMilestones: [],
      monthsPassed: 1,
      totalScore: 0
    },
    realWorldImpact: {
      familyRelationship: 70, // Good starting relationship
      careerGrowth: 50, // Neutral career position
      socialStanding: 60, // Decent social position
      mentalHealth: 70, // Good mental health
      futureReadiness: 10 // Very low future preparedness
    }
  });

  // Enhanced scenario definitions with comprehensive Stage 1 scenarios
  const enhancedScenarios: { [key: string]: EnhancedScenario } = {
    financial_personality_assessment: {
      id: 'financial_personality_assessment',
      title: 'Financial Personality Discovery',
      description: 'Before making any decisions, let\'s understand your financial mindset and risk profile through real-world scenarios.',
      context: 'Your financial personality determines 80% of your financial success. This assessment will reveal your money beliefs, risk tolerance, and decision-making patterns.',
      urgency: 'medium',
      complexity: 'basic',
      realWorldData: {
        statisticalContext: 'Research shows financial personality formed by age 25 predicts lifetime wealth accumulation patterns.',
        marketConditions: 'Understanding your risk profile helps in asset allocation and investment strategy.',
        economicFactors: 'Financial personality affects every major life decision from career choices to retirement planning.'
      },
      choices: [
        {
          id: 'risk_aware_planner',
          text: 'I prefer understanding all risks before investing, even if it means missing some opportunities',
          pathName: 'Risk-Aware Strategic Planner',
          pathDescription: 'You prioritize security and thorough analysis before making financial decisions.',
          riskLevel: 'low',
          timeHorizon: 'long-term',
          consequences: {
            financial: {},
            personality: { riskTolerance: 20, knowledge: 25, discipline: 30, confidence: 15 },
            realWorld: { futureReadiness: 20 }
          },
          feedback: {
            immediate: 'Your cautious approach provides stability but may limit growth potential.',
            shortTerm: 'You build strong emergency funds and low-risk investments.',
            mediumTerm: 'Conservative portfolio grows steadily but underperforms market.',
            longTerm: 'Secure retirement but missed wealth building opportunities.'
          },
          marketReality: 'Conservative investors average 8% returns vs 12% for balanced approaches.',
          expertInsight: 'Risk awareness is valuable, but excessive caution can be a wealth killer.',
          warningFlags: ['Opportunity cost risk'],
          successIndicators: ['Strong emergency planning', 'Low stress levels'],
          isOptimal: false,
          pathColor: 'from-blue-400 to-blue-600'
        },
        {
          id: 'balanced_optimizer',
          text: 'I believe in balanced approach - some risk for growth, some safety for security',
          pathName: 'Balanced Portfolio Optimizer',
          pathDescription: 'You seek optimal risk-reward balance across different asset classes.',
          riskLevel: 'medium',
          timeHorizon: 'long-term',
          consequences: {
            financial: {},
            personality: { riskTolerance: 50, knowledge: 35, discipline: 25, confidence: 30 },
            realWorld: { futureReadiness: 35 }
          },
          feedback: {
            immediate: 'Excellent balanced mindset! This approach maximizes long-term wealth while managing risks.',
            shortTerm: 'Diversified portfolio across equity, debt, and emergency funds.',
            mediumTerm: 'Consistent 12-15% portfolio growth with manageable volatility.',
            longTerm: 'Strong wealth accumulation with financial security and flexibility.'
          },
          marketReality: 'Balanced investors achieve 12-15% long-term returns with lower volatility.',
          expertInsight: 'This is the gold standard approach recommended by most financial planners.',
          warningFlags: [],
          successIndicators: ['Optimal risk-return', 'Diversification', 'Disciplined approach'],
          isOptimal: true,
          pathColor: 'from-green-500 to-emerald-600'
        },
        {
          id: 'aggressive_growth',
          text: 'I am willing to take high risks for potentially high returns - fortune favors the bold',
          pathName: 'Aggressive Growth Investor',
          pathDescription: 'You prioritize maximum growth potential over safety and stability.',
          riskLevel: 'high',
          timeHorizon: 'long-term',
          consequences: {
            financial: {},
            personality: { riskTolerance: 80, knowledge: 15, confidence: 40, discipline: -10 },
            realWorld: { futureReadiness: 25, mentalHealth: -10 }
          },
          feedback: {
            immediate: 'High risk appetite can create wealth but requires exceptional discipline and knowledge.',
            shortTerm: 'Volatile portfolio with potential for significant gains and losses.',
            mediumTerm: 'Either exceptional returns (20%+) or substantial losses (-30%).',
            longTerm: 'Could achieve financial freedom early or face devastating setbacks.'
          },
          marketReality: 'Aggressive investors face 40% volatility but can achieve 18%+ returns over decades.',
          expertInsight: 'High-risk strategies work only with deep knowledge and emotional control.',
          warningFlags: ['High volatility risk', 'Emotional stress', 'Potential for large losses'],
          successIndicators: ['High growth potential'],
          isOptimal: false,
          pathColor: 'from-red-500 to-orange-600'
        },
        {
          id: 'safety_first',
          text: 'I prioritize capital preservation above all - better safe than sorry',
          pathName: 'Capital Preservation Specialist',
          pathDescription: 'You focus on protecting your money from any potential losses.',
          riskLevel: 'low',
          timeHorizon: 'short-term',
          consequences: {
            financial: {},
            personality: { riskTolerance: 10, knowledge: 10, confidence: 5, discipline: 20 },
            realWorld: { futureReadiness: 5 }
          },
          feedback: {
            immediate: 'Ultra-safe approach protects capital but may not beat inflation over time.',
            shortTerm: 'All money in FDs and savings accounts earning 4-7% returns.',
            mediumTerm: 'Capital preserved but purchasing power eroded by 6% inflation.',
            longTerm: 'Safe but significantly behind inflation - effectively losing money.'
          },
          marketReality: 'Ultra-conservative portfolios lose 2-3% annually in real terms to inflation.',
          expertInsight: 'Excessive safety is actually risky - inflation is a guaranteed wealth destroyer.',
          warningFlags: ['Inflation risk', 'Opportunity cost', 'Wealth erosion'],
          successIndicators: ['No nominal losses'],
          isOptimal: false,
          pathColor: 'from-gray-400 to-gray-600'
        }
      ],
      learningObjectives: [
        'Discover your natural financial personality',
        'Understand risk-return relationship',
        'Learn about inflation impact on conservative investments',
        'Recognize the importance of balanced approaches'
      ],
      skillsRequired: ['Self-assessment', 'Risk evaluation', 'Long-term thinking']
    },
    salary_reality_check: {
      id: 'salary_reality_check',
      title: 'The First Salary Financial Reality Matrix',
      description: 'Your first ₹50,000 salary brings exciting possibilities but also complex financial responsibilities that will shape your entire career trajectory.',
      context: 'This is your defining financial moment. Research shows that financial habits formed in the first 6 months of earning stay with people for decades. Your decisions here will compound over 40+ years of your career.',
      urgency: 'critical',
      complexity: 'intermediate',
      realWorldData: {
        statisticalContext: 'Studies show 73% of Indian professionals make debt-creating decisions in their first year of earning, leading to 5+ years of financial recovery.',
        marketConditions: 'Current inflation: 6.2%, FD rates: 6.8%, Equity market 10-year average: 12.5%, Real estate growth: 8.3%',
        economicFactors: 'Rising living costs in metros, increasing healthcare expenses, and the need for retirement planning starting early due to longer life expectancy.'
      },
      choices: [
        {
          id: 'strategic_wealth_builder',
          text: 'The Strategic Wealth Builder: Create a comprehensive financial framework - Emergency fund (₹10K), Family contribution (₹12K), Strategic investments (₹8K), Lifestyle budget (₹15K), Learning fund (₹2K)',
          pathName: 'The Wealth Creation Strategist',
          pathDescription: 'You choose to build a systematic approach to wealth creation from day one, balancing all life aspects.',
          riskLevel: 'medium',
          timeHorizon: 'long-term',
          consequences: {
            financial: {
              savings: 10000,
              investments: 8000,
              expenses: 29000,
              emergencyFund: 10000
            },
            personality: {
              knowledge: 35,
              confidence: 30,
              discipline: 25,
              riskTolerance: 15
            },
            realWorld: {
              familyRelationship: 15,
              careerGrowth: 20,
              mentalHealth: 10,
              futureReadiness: 40
            }
          },
          feedback: {
            immediate: '🎯 Exceptional financial maturity! You\'ve created a balanced foundation that addresses present needs while building future wealth.',
            shortTerm: 'Month 3: Your systematic approach has built ₹30K emergency fund, ₹24K investments showing 8% growth, family proud of your responsibility.',
            mediumTerm: 'Year 1: ₹120K emergency fund, ₹96K investment portfolio (15% growth), promoted due to demonstrated financial responsibility, colleagues seek your advice.',
            longTerm: '5 Years: ₹8L emergency fund, ₹12L investment portfolio, excellent credit score, bought first property, became team lead, financial mentor to others.'
          },
          marketReality: 'Based on Indian market data: Systematic investment over 5 years in diversified equity has delivered 13.2% CAGR, while emergency funds in liquid funds provided 6.8% returns.',
          expertInsight: 'Financial planners recommend exactly this approach - emergency fund first, then systematic investment. You\'re following the gold standard of wealth building.',
          warningFlags: [],
          successIndicators: ['Balanced approach', 'Emergency fund priority', 'Investment discipline', 'Family responsibility'],
          isOptimal: true,
          pathColor: 'from-emerald-500 to-green-600'
        },
        {
          id: 'lifestyle_inflation_trap',
          text: 'The Lifestyle Upgrader: This salary means freedom! Expensive restaurants (₹8K), trendy clothes (₹10K), gadgets (₹12K), parties (₹6K), cab rides (₹5K), family gets remaining ₹9K',
          pathName: 'The Lifestyle Inflation Victim',
          pathDescription: 'You prioritize immediate lifestyle upgrades and social image over financial security.',
          riskLevel: 'extreme',
          timeHorizon: 'immediate',
          consequences: {
            financial: {
              expenses: 50000,
              debt: 15000,
              savings: -15000
            },
            personality: {
              knowledge: -20,
              confidence: -15,
              discipline: -30,
              socialInfluence: 25
            },
            realWorld: {
              familyRelationship: -25,
              socialStanding: 20,
              mentalHealth: -15,
              futureReadiness: -30
            }
          },
          feedback: {
            immediate: '😰 You\'ve fallen into the lifestyle inflation trap! Spending your entire salary plus credit creates a dangerous cycle that\'s hard to break.',
            shortTerm: 'Month 3: ₹45K debt accumulated, family disappointed with reduced contribution, friends expect you to maintain this lifestyle, financial stress beginning.',
            mediumTerm: 'Year 1: ₹180K debt, 35% of salary goes to EMIs, credit score damaged, family relationships strained, constant money worries, health impact from stress.',
            longTerm: '5 Years: ₹8L debt, financial slavery, career growth hampered by money stress, missed life opportunities, family trust broken, mental health severely affected.'
          },
          marketReality: 'Credit card debt in India averages 36-42% annual interest. ₹15K debt compounds to ₹60K in 4 years with minimum payments.',
          expertInsight: 'This is the #1 wealth destroyer for young professionals. Lifestyle inflation in the first year creates patterns that persist for decades.',
          warningFlags: ['Debt spiral', 'Family relationship damage', 'No emergency fund', 'Unsustainable lifestyle'],
          successIndicators: [],
          isOptimal: false,
          pathColor: 'from-red-500 to-pink-600'
        },
        {
          id: 'extreme_saver_hermit',
          text: 'The Extreme Saving Hermit: Live like a student! Minimal expenses (₹20K), basic family contribution (₹8K), save everything else (₹22K), invest in FDs only',
          pathName: 'The Ultra-Frugal Accumulator',
          pathDescription: 'You choose extreme frugality and conservative investments, avoiding all risks and social expenses.',
          riskLevel: 'low',
          timeHorizon: 'long-term',
          consequences: {
            financial: {
              savings: 22000,
              expenses: 28000,
              investments: 0
            },
            personality: {
              knowledge: 10,
              discipline: 30,
              riskTolerance: -20,
              socialInfluence: -25
            },
            realWorld: {
              familyRelationship: -15,
              socialStanding: -30,
              mentalHealth: -20,
              careerGrowth: -15
            }
          },
          feedback: {
            immediate: '💰 Impressive saving discipline! But extreme frugality comes with hidden costs - social isolation and missed growth opportunities.',
            shortTerm: 'Month 3: ₹66K saved but colleagues stopped inviting you out, family concerned about your antisocial behavior, missing networking opportunities.',
            mediumTerm: 'Year 1: ₹264K saved in FDs but inflation eroding value, social circle shrunk, career growth stagnant due to poor networking, family tensions.',
            longTerm: '5 Years: ₹13L saved but lost ₹25L potential from equity investments, career plateau due to poor relationships, social isolation, regret about missed experiences.'
          },
          marketReality: 'FD returns at 6.8% vs inflation at 6.2% provide minimal real returns. Equity markets delivered 12.5% over 10 years, resulting in ₹25L opportunity cost.',
          expertInsight: 'Extreme frugality without balance damages career growth and relationship capital, which are crucial for long-term wealth building.',
          warningFlags: ['Social isolation', 'Career impact', 'Opportunity cost', 'Inflation erosion'],
          successIndicators: ['High savings rate', 'Disciplined approach'],
          isOptimal: false,
          pathColor: 'from-gray-500 to-slate-600'
        },
        {
          id: 'credit_card_genius',
          text: 'The Credit Card Strategist: Use credit smartly! Maximize credit cards for everything, earn rewards, pay strategically, maintain cash flow, build credit history',
          pathName: 'The Credit Optimization Expert',
          pathDescription: 'You attempt to use credit cards strategically for rewards and credit building while maintaining lifestyle.',
          riskLevel: 'high',
          timeHorizon: 'medium-term',
          consequences: {
            financial: {
              expenses: 48000,
              debt: 25000,
              creditScore: -50
            },
            personality: {
              knowledge: -15,
              confidence: 20,
              riskTolerance: 30
            },
            realWorld: {
              socialStanding: 15,
              futureReadiness: -25,
              mentalHealth: -10
            }
          },
          feedback: {
            immediate: '💳 Credit optimization seems smart initially, but you\'re walking a tightrope between strategy and trap without sufficient income buffer.',
            shortTerm: 'Month 3: ₹75K credit utilized, earning ₹2K rewards but paying ₹8K interest, credit utilization too high affecting score, stress increasing.',
            mediumTerm: 'Year 1: ₹300K debt, credit score damaged despite payments, reward points meaningless compared to interest costs, financial anxiety constant.',
            longTerm: '5 Years: Credit addiction developed, ₹15L debt, financial slavery, all rewards consumed by interest, credit applications rejected, career affected by stress.'
          },
          marketReality: 'Credit card interest averages 38% annually in India. Even with 2% rewards, net cost is 36%. Only ultra-disciplined users benefit from credit strategies.',
          expertInsight: 'Credit card optimization requires high financial literacy and discipline. For beginners, it\'s more often a trap than a strategy.',
          warningFlags: ['High interest debt', 'Credit score damage', 'Addiction risk', 'Stress accumulation'],
          successIndicators: ['Credit building attempt', 'Rewards optimization'],
          isOptimal: false,
          pathColor: 'from-orange-500 to-red-600'
        }
      ],
      learningObjectives: [
        'Understand the power of financial habits formed early',
        'Learn to balance present enjoyment with future security',
        'Recognize the hidden costs of lifestyle inflation',
        'Appreciate the importance of emergency funds'
      ],
      skillsRequired: [
        'Priority setting',
        'Budget allocation',
        'Risk assessment',
        'Long-term thinking'
      ]
    }
  };

  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  
  // Stage 1 comprehensive scenario sequence
  const stage1Scenarios = [
    'financial_personality_assessment',
    'salary_reality_check',
    'budget_priority_matrix',
    'emergency_fund_philosophy',
    'investment_mindset_test',
    'family_money_dynamics',
    'peer_pressure_resilience',
    'financial_goal_setting'
  ];

  const selectChoice = (choiceId: string) => {
    const scenario = enhancedScenarios[gameState.currentScenario!];
    const choice = scenario.choices.find(c => c.id === choiceId);
    
    if (choice) {
      setSelectedChoice(choiceId);
      setShowFeedback(true);
      
      // Apply comprehensive consequences
      setGameState(prev => ({
        ...prev,
        financialMetrics: {
          ...prev.financialMetrics,
          monthlyIncome: prev.financialMetrics.monthlyIncome + (choice.consequences.financial.income || 0),
          totalSavings: Math.max(0, prev.financialMetrics.totalSavings + (choice.consequences.financial.savings || 0)),
          investments: prev.financialMetrics.investments + (choice.consequences.financial.investments || 0),
          debt: Math.max(0, prev.financialMetrics.debt + (choice.consequences.financial.debt || 0)),
          expenses: prev.financialMetrics.expenses + (choice.consequences.financial.expenses || 0),
          creditScore: Math.max(0, Math.min(900, prev.financialMetrics.creditScore + (choice.consequences.financial.creditScore || 0))),
          emergencyFund: Math.max(0, prev.financialMetrics.emergencyFund + (choice.consequences.financial.emergencyFund || 0))
        },
        personalityTraits: {
          ...prev.personalityTraits,
          riskTolerance: Math.max(0, Math.min(100, prev.personalityTraits.riskTolerance + (choice.consequences.personality.riskTolerance || 0))),
          financialKnowledge: Math.max(0, Math.min(100, prev.personalityTraits.financialKnowledge + (choice.consequences.personality.knowledge || 0))),
          confidence: Math.max(0, Math.min(100, prev.personalityTraits.confidence + (choice.consequences.personality.confidence || 0))),
          discipline: Math.max(0, Math.min(100, prev.personalityTraits.discipline + (choice.consequences.personality.discipline || 0))),
          socialInfluence: Math.max(0, Math.min(100, prev.personalityTraits.socialInfluence + (choice.consequences.personality.socialInfluence || 0)))
        },
        realWorldImpact: {
          ...prev.realWorldImpact,
          familyRelationship: Math.max(0, Math.min(100, prev.realWorldImpact.familyRelationship + (choice.consequences.realWorld.familyRelationship || 0))),
          careerGrowth: Math.max(0, Math.min(100, prev.realWorldImpact.careerGrowth + (choice.consequences.realWorld.careerGrowth || 0))),
          socialStanding: Math.max(0, Math.min(100, prev.realWorldImpact.socialStanding + (choice.consequences.realWorld.socialStanding || 0))),
          mentalHealth: Math.max(0, Math.min(100, prev.realWorldImpact.mentalHealth + (choice.consequences.realWorld.mentalHealth || 0))),
          futureReadiness: Math.max(0, Math.min(100, prev.realWorldImpact.futureReadiness + (choice.consequences.realWorld.futureReadiness || 0)))
        },
        gameProgress: {
          ...prev.gameProgress,
          totalScore: prev.gameProgress.totalScore + (choice.isOptimal ? 100 : choice.riskLevel === 'low' ? 20 : 0),
          monthsPassed: prev.gameProgress.monthsPassed + 1
        }
      }));
    }
  };

  const currentScenario = enhancedScenarios[gameState.currentScenario!];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with comprehensive metrics */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowDown className="w-4 h-4 rotate-90" />
              Back to Game
            </button>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">
                {Math.round(gameState.realWorldImpact.futureReadiness)}%
              </div>
              <div className="text-sm text-gray-600">Future Readiness</div>
            </div>
          </div>

          {/* Comprehensive dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg p-3 text-center">
              <PiggyBank className="w-6 h-6 mx-auto mb-1" />
              <div className="text-lg font-bold">₹{(gameState.financialMetrics.totalSavings / 1000).toFixed(0)}K</div>
              <div className="text-xs opacity-90">Savings</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg p-3 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-1" />
              <div className="text-lg font-bold">₹{(gameState.financialMetrics.investments / 1000).toFixed(0)}K</div>
              <div className="text-xs opacity-90">Investments</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg p-3 text-center">
              <Brain className="w-6 h-6 mx-auto mb-1" />
              <div className="text-lg font-bold">
                {gameState.personalityTraits.financialKnowledge === 0 ? "Beginner" : `${gameState.personalityTraits.financialKnowledge}%`}
              </div>
              <div className="text-xs opacity-90">Knowledge</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg p-3 text-center">
              <Star className="w-6 h-6 mx-auto mb-1" />
              <div className="text-lg font-bold">
                {gameState.personalityTraits.confidence === 0 ? "No Confidence" : `${gameState.personalityTraits.confidence}%`}
              </div>
              <div className="text-xs opacity-90">Confidence</div>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg p-3 text-center">
              <CreditCard className="w-6 h-6 mx-auto mb-1" />
              <div className="text-lg font-bold">₹{(gameState.financialMetrics.debt / 1000).toFixed(0)}K</div>
              <div className="text-xs opacity-90">Debt</div>
            </div>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-3 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-1" />
              <div className="text-lg font-bold">
                {gameState.financialMetrics.creditScore === 0 ? "No History" : gameState.financialMetrics.creditScore}
              </div>
              <div className="text-xs opacity-90">Credit Score</div>
            </div>
          </div>
        </div>

        {/* Enhanced scenario content */}
        {currentScenario && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{currentScenario.title}</h2>
                    <p className="text-gray-600 mb-3">{currentScenario.description}</p>
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <p className="text-blue-800 text-sm">{currentScenario.context}</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3">
                      <div className="text-sm text-amber-800">
                        <strong>Market Context:</strong> {currentScenario.realWorldData.marketConditions}
                      </div>
                    </div>
                  </div>
                </div>

                {!showFeedback ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Choose Your Financial Strategy:</h3>
                    {currentScenario.choices.map(choice => (
                      <button
                        key={choice.id}
                        onClick={() => selectChoice(choice.id)}
                        className={`w-full p-4 text-left border-2 rounded-xl transition-all duration-300 hover:shadow-lg bg-gradient-to-r ${choice.pathColor} hover:scale-[1.02] text-white`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{choice.pathName}</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded ${
                              choice.riskLevel === 'low' ? 'bg-green-200 text-green-800' :
                              choice.riskLevel === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                              choice.riskLevel === 'high' ? 'bg-orange-200 text-orange-800' :
                              'bg-red-200 text-red-800'
                            }`}>
                              {choice.riskLevel.toUpperCase()}
                            </span>
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                        <p className="text-sm opacity-90 mb-2">{choice.text}</p>
                        <p className="text-xs opacity-75">{choice.pathDescription}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {selectedChoice && (() => {
                      const choice = currentScenario.choices.find(c => c.id === selectedChoice)!;
                      return (
                        <div>
                          <div className={`p-6 rounded-xl ${choice.isOptimal ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                              {choice.isOptimal ? <CheckCircle className="w-6 h-6 text-green-600" /> : <AlertTriangle className="w-6 h-6 text-red-600" />}
                              Path Chosen: {choice.pathName}
                            </h3>
                            <p className={`mb-4 ${choice.isOptimal ? 'text-green-800' : 'text-red-800'}`}>
                              {choice.feedback.immediate}
                            </p>
                            
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                              <div className="bg-white p-3 rounded-lg">
                                <div className="text-sm font-medium text-gray-700 mb-1">3 Months</div>
                                <div className="text-xs text-gray-600">{choice.feedback.shortTerm}</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg">
                                <div className="text-sm font-medium text-gray-700 mb-1">1 Year</div>
                                <div className="text-xs text-gray-600">{choice.feedback.mediumTerm}</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg">
                                <div className="text-sm font-medium text-gray-700 mb-1">5 Years</div>
                                <div className="text-xs text-gray-600">{choice.feedback.longTerm}</div>
                              </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                              <div className="text-sm font-medium text-blue-900 mb-2">📊 Expert Analysis:</div>
                              <div className="text-xs text-blue-800">{choice.expertInsight}</div>
                            </div>

                            {choice.warningFlags.length > 0 && (
                              <div className="bg-red-50 p-4 rounded-lg">
                                <div className="text-sm font-medium text-red-900 mb-2">⚠️ Warning Flags:</div>
                                <ul className="text-xs text-red-800 space-y-1">
                                  {choice.warningFlags.map((flag, idx) => (
                                    <li key={idx}>• {flag}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced sidebar with real-world impact tracking */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Real-World Impact
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Family Relations</span>
                      <span>{gameState.realWorldImpact.familyRelationship}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${gameState.realWorldImpact.familyRelationship}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Career Growth</span>
                      <span>{gameState.realWorldImpact.careerGrowth}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${gameState.realWorldImpact.careerGrowth}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Mental Health</span>
                      <span>{gameState.realWorldImpact.mentalHealth}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${gameState.realWorldImpact.mentalHealth}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-600" />
                  Financial Personality
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Risk Tolerance</span>
                      <span>{gameState.personalityTraits.riskTolerance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${gameState.personalityTraits.riskTolerance}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Discipline</span>
                      <span>{gameState.personalityTraits.discipline}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${gameState.personalityTraits.discipline}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedSalariedGame;