import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Home, Trophy, Target, TrendingUp, 
  DollarSign, Shield, Users, Briefcase, Heart, Brain,
  Coins, Star, CheckCircle, AlertTriangle, Info
} from 'lucide-react';
import { salariedProfessionalStages, GameStage, StageOption } from '@/data/salariedProfessionalStages';

interface SalariedProfessionalFIREGameProps {
  onComplete: (results: any) => void;
  onBackToDashboard: () => void;
}

interface GameState {
  currentStage: number;
  netWorth: number;
  totalSavings: number;
  totalDebt: number;
  emotionalScore: number;
  knowledgeScore: number;
  riskScore: number;
  age: number;
  salary: number;
  decisions: any[];
  achievements: string[];
  fireOnTrack: boolean;
  careerGrowthRate: number;
  investmentDiscipline: number;
  emotionalDecisionCount: number;
}

const SalariedProfessionalFIREGame: React.FC<SalariedProfessionalFIREGameProps> = ({ 
  onComplete, 
  onBackToDashboard 
}) => {
  const [gameState, setGameState] = useState<GameState>({
    currentStage: 0,
    netWorth: 0,
    totalSavings: 0,
    totalDebt: 0,
    emotionalScore: 0,
    knowledgeScore: 0,
    riskScore: 0,
    age: 24,
    salary: 50000,
    decisions: [],
    achievements: [],
    fireOnTrack: true,
    careerGrowthRate: 1.0,
    investmentDiscipline: 0,
    emotionalDecisionCount: 0
  });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Dynamic context generation based on previous decisions
  const getDynamicContext = (stageId: number) => {
    if (stageId === 5) { // Relationship & Money stage
      const skillInvestmentDecision = gameState.decisions.find(d => d.stage.includes("Career Acceleration"));
      if (skillInvestmentDecision?.choice.includes("Decline Course")) {
        return "⚠️ CAREER STAGNATION IMPACT: Your decision to skip the $12K certification has limited your salary growth to $6K/month instead of potential $10K. This conservative approach is now affecting your financial capacity for major life decisions. Your partner notices the financial constraints.";
      } else if (skillInvestmentDecision?.choice.includes("Investment")) {
        return "🚀 CAREER GROWTH ACHIEVED: Your $12K investment in certification paid off! Your salary jumped to $9K/month, giving you financial confidence for major life decisions. Your partner is impressed by your strategic thinking.";
      }
      return "Career progression as expected. Now balancing personal life with financial goals.";
    }
    
    if (stageId === 15) { // Final FIRE Reality Check
      const assessment = generateFIREAssessment();
      return `FIRE Status: ${assessment.fireStatus} | ${assessment.personalizedGuidance}`;
    }
    
    return salariedProfessionalStages[stageId].context;
  };

  // Generate comprehensive FIRE assessment based on all decisions
  const generateFIREAssessment = () => {
    const fireAnalysis = calculateRealFIREProgress();
    const { decisions, netWorth, totalDebt } = gameState;
    
    // Analyze major decision categories
    const careerDecisions = decisions.filter(d => d.stage.includes("Career") || d.stage.includes("Skill"));
    const investmentDecisions = decisions.filter(d => d.stage.includes("Investment") || d.stage.includes("Market"));
    const lifestyleDecisions = decisions.filter(d => d.stage.includes("Lifestyle") || d.stage.includes("Wedding") || d.stage.includes("Social"));
    const emergencyDecisions = decisions.filter(d => d.stage.includes("Emergency") || d.stage.includes("Shock"));
    
    // Count good vs bad decisions
    const badCareerChoices = careerDecisions.filter(d => d.choice.includes("Decline") || d.choice.includes("Safe")).length;
    const badInvestmentChoices = investmentDecisions.filter(d => d.choice.includes("FOMO") || d.choice.includes("Panic")).length;
    const badLifestyleChoices = lifestyleDecisions.filter(d => d.choice.includes("Party") || d.choice.includes("Grand") || d.choice.includes("Live Like")).length;
    
    let fireStatus = "";
    let personalizedGuidance = "";
    
    if (netWorth >= 5000000) {
      fireStatus = "🔥 CONGRATULATIONS! FIRE ACHIEVED! 🔥";
      personalizedGuidance = "Your disciplined approach throughout 26 years has paid off. You've successfully built $1.25+ million and achieved financial independence.";
    } else if (netWorth >= 3000000) {
      fireStatus = "⚡ CLOSE TO FIRE - Need 2-3 More Years";
      personalizedGuidance = `You're $${((1250000 - netWorth) / 1000).toFixed(0)}K away from FIRE. Your journey has been mostly positive, but some decisions slowed your progress.`;
    } else if (netWorth >= 1500000) {
      fireStatus = "📈 MODERATE PROGRESS - FIRE Delayed to Age 55-60";
      personalizedGuidance = "Your financial journey shows mixed results. Several emotional decisions have significantly delayed your FIRE timeline.";
    } else {
      fireStatus = "⚠️ FIRE UNLIKELY - Major Course Correction Needed";
      personalizedGuidance = "Your financial decisions have made traditional FIRE very difficult. You'll need to work until 60+ or make dramatic changes.";
    }
    
    return {
      fireStatus,
      personalizedGuidance,
      netWorth,
      fireAnalysis,
      badCareerChoices,
      badInvestmentChoices,
      badLifestyleChoices,
      totalDebt
    };
  };

  // Calculate realistic FIRE progress based on actual decisions
  const calculateRealFIREProgress = () => {
    const { netWorth, age, decisions, totalDebt } = gameState;
    const yearsToRetirement = 60 - age;
    const fireTarget = 1250000; // $1.25 Million
    
    // Analyze decision patterns
    const badDecisions = decisions.filter(d => 
      d.choice.includes("Party") || 
      d.choice.includes("Lifestyle") || 
      d.choice.includes("Decline") ||
      d.choice.includes("FOMO") ||
      d.choice.includes("Grand Wedding")
    ).length;
    
    const goodDecisions = decisions.filter(d =>
      d.choice.includes("Strategic") ||
      d.choice.includes("Invest") ||
      d.choice.includes("Educate") ||
      d.choice.includes("Emergency")
    ).length;
    
    // Realistic projection
    const currentProgress = (netWorth / fireTarget) * 100;
    const disciplineScore = (goodDecisions - badDecisions) / Math.max(decisions.length, 1);
    const debtImpact = totalDebt / 25000; // Debt reduces progress
    
    const adjustedProgress = Math.max(0, currentProgress + (disciplineScore * 20) - (debtImpact * 5));
    
    return {
      currentProgress: adjustedProgress,
      onTrack: adjustedProgress >= ((50 - age) / 26) * 100, // Expected progress by age
      projectedFireAge: age + Math.max(10, (fireTarget - netWorth) / (gameState.salary * 12 * 0.3)),
      riskFactors: badDecisions,
      strengths: goodDecisions
    };
  };

  // Generate dynamic final stage content
  const getFinalStageContent = () => {
    if (gameState.currentStage !== 15) return null;
    
    const assessment = generateFIREAssessment();
    const { decisions, netWorth, totalDebt } = gameState;
    
    // Generate specific mistakes and guidance
    let specificMistakes = [];
    let actionableAdvice = [];
    
    // Career mistakes
    const careerMistake = decisions.find(d => d.stage.includes("Career") && d.choice.includes("Decline"));
    if (careerMistake) {
      specificMistakes.push("❌ Stage 4: Declined $12K skill investment - Cost you $375-500K in lifetime earnings");
      actionableAdvice.push("✅ Always invest in yourself first - skills compound more than savings");
    }
    
    // Lifestyle inflation mistakes
    const lifestyleMistake = decisions.find(d => d.choice.includes("Party") || d.choice.includes("Live Like"));
    if (lifestyleMistake) {
      specificMistakes.push("❌ Stage 1: Chose lifestyle over savings - Started 26-year journey with debt instead of assets");
      actionableAdvice.push("✅ First salary discipline sets lifetime patterns - save first, spend later");
    }
    
    // Investment mistakes
    const investmentMistake = decisions.find(d => d.choice.includes("FOMO") || d.choice.includes("Panic"));
    if (investmentMistake) {
      specificMistakes.push("❌ Investment Timing: Made emotional investment decisions - Lost 3-5% annual returns");
      actionableAdvice.push("✅ Time in market beats timing the market - stay disciplined during volatility");
    }
    
    // Wedding expense mistakes
    const weddingMistake = decisions.find(d => d.choice.includes("Grand Wedding"));
    if (weddingMistake) {
      specificMistakes.push("❌ Stage 5: $200K wedding debt - This $200K could have become $2M by age 50");
      actionableAdvice.push("✅ Celebrate meaningfully but don't mortgage your future for one day");
    }
    
    const dynamicSituation = `
📊 **YOUR 26-YEAR FINANCIAK JOURNEY ASSESSMENT**

${assessment.fireStatus}

**CURRENT FINANCIAK POSITION:**
• Net Worth: $${(netWorth/1000).toFixed(0)}K
• Total Debt: $${(totalDebt/1000).toFixed(0)}K  
• FIRE Target: $1,250K (Financial Independence)
• Gap: $${((1250000 - netWorth)/1000).toFixed(0)}K remaining

**DECISION ANALYSIS:**
${specificMistakes.length > 0 ? specificMistakes.join('\n') : '✅ You made mostly sound financial decisions throughout your journey!'}

**WHAT YOU SHOULD HAVE DONE DIFFERENTLY:**
${actionableAdvice.length > 0 ? actionableAdvice.join('\n') : '🎉 Your decision-making was excellent! You followed most best practices.'}

**THE COMPOUND EFFECT OF YOUR CHOICES:**
Your early decisions had massive compound effects. That $2K emergency fund from Stage 1 could have grown to $50K+ by now. Every emotional decision cost you years of FIRE progress.

${assessment.personalizedGuidance}

**REALITY CHECK:**
${netWorth >= 1250000 ? 
  "You can now generate $375-500K annually from your corpus. Work is now optional!" :
  `You need $${((1250000 - netWorth)/1000).toFixed(0)}K more for FIRE. At current trajectory, you'll achieve FIRE by age ${Math.ceil(50 + (1250000 - netWorth) / (gameState.salary * 12 * 0.2))}.`
}`;

    return dynamicSituation;
  };

  const currentStageData = gameState.currentStage === 15 ? {
    ...salariedProfessionalStages[gameState.currentStage],
    context: getDynamicContext(gameState.currentStage),
    situation: getFinalStageContent()
  } : { 
    ...salariedProfessionalStages[gameState.currentStage],
    context: getDynamicContext(gameState.currentStage)
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setShowFeedback(true);
  };

  const proceedToNextStage = () => {
    if (!selectedOption) return;

    const option = currentStageData.options.find(opt => opt.id === selectedOption);
    if (!option) return;

    setIsTransitioning(true);

    // Update game state based on choice
    setGameState(prev => {
      const newState = {
        ...prev,
        currentStage: prev.currentStage + 1,
        netWorth: prev.netWorth + option.impact.netWorth,
        totalSavings: prev.totalSavings + option.impact.savings,
        totalDebt: prev.totalDebt + (option.impact.debt || 0),
        emotionalScore: prev.emotionalScore + option.impact.emotion,
        knowledgeScore: prev.knowledgeScore + option.impact.knowledge,
        riskScore: prev.riskScore + option.impact.risk,
        age: currentStageData.age + 1,
        salary: gameState.currentStage < salariedProfessionalStages.length - 1 
          ? salariedProfessionalStages[gameState.currentStage + 1].salary 
          : prev.salary,
        decisions: [...prev.decisions, {
          stage: currentStageData.title,
          choice: option.label,
          impact: option.impact,
          consequences: option.consequences
        }]
      };

      // Check for achievements
      const newAchievements = [...prev.achievements];
      if (newState.netWorth >= 1000000 && !newAchievements.includes('First Million')) {
        newAchievements.push('First Million');
      }
      if (newState.knowledgeScore >= 20 && !newAchievements.includes('Financial Expert')) {
        newAchievements.push('Financial Expert');
      }
      if (newState.currentStage >= 10 && !newAchievements.includes('Mid-Career Master')) {
        newAchievements.push('Mid-Career Master');
      }

      return { ...newState, achievements: newAchievements };
    });

    setTimeout(() => {
      setSelectedOption(null);
      setShowFeedback(false);
      setIsTransitioning(false);
    }, 1500);
  };

  const calculateFIREProgress = () => {
    const fireTarget = 1250000; // $1.25 Million for FIRE
    return Math.min((gameState.netWorth / fireTarget) * 100, 100);
  };

  const getPersonalityDescription = () => {
    const { emotionalScore, knowledgeScore, riskScore } = gameState;
    
    if (knowledgeScore > 15 && emotionalScore > 10) return "Financial Sage";
    if (riskScore > 15) return "High-Risk Achiever";
    if (emotionalScore < 0) return "Stress-Prone Investor";
    if (knowledgeScore > 10) return "Educated Investor";
    return "Balanced Investor";
  };

  // Game completion check
  if (gameState.currentStage >= salariedProfessionalStages.length) {
    const finalResults = {
      netWorth: gameState.netWorth,
      fireAchieved: gameState.netWorth >= 5000000,
      age: gameState.age,
      personality: getPersonalityDescription(),
      decisions: gameState.decisions,
      achievements: gameState.achievements,
      totalScore: gameState.emotionalScore + gameState.knowledgeScore - gameState.riskScore
    };

    // Comprehensive analysis of missed opportunities
    const missedOpportunities = [];
    const improvementAreas = [];
    const actionPlan = [];

    // Analyze what they missed
    if (gameState.decisions.find(d => d.choice.includes("Decline Course"))) {
      missedOpportunities.push("Career Growth: Skipping $12K certification cost you $375-500K in lifetime earnings");
    }
    if (gameState.decisions.find(d => d.choice.includes("Party") || d.choice.includes("Live Like"))) {
      missedOpportunities.push("First Salary Discipline: Lifestyle inflation from day 1 cost you $125-200K over 26 years");
    }
    if (gameState.decisions.find(d => d.choice.includes("Grand Wedding"))) {
      missedOpportunities.push("Wedding Expenses: $200K wedding debt cost you $625K+ in compound interest");
    }
    if (gameState.decisions.find(d => d.choice.includes("FOMO") || d.choice.includes("Panic"))) {
      missedOpportunities.push("Investment Timing: Emotional decisions cost you 3-5% annual returns = $250-375K");
    }

    // What could have been better
    if (gameState.netWorth < 2000000) {
      improvementAreas.push("Emergency Planning: Should have prioritized 6-month emergency fund from Stage 1");
      improvementAreas.push("Investment Start: Starting index fund investing 6 months earlier = $75-125K difference");
    }
    if (gameState.totalDebt > 500000) {
      improvementAreas.push("Debt Management: High-interest debt cost you $125-200K in unnecessary interest");
    }

    // Action plan based on current position
    if (gameState.netWorth >= 5000000) {
      actionPlan.push("🎉 FIRE Achieved! Focus on portfolio management and legacy planning");
    } else if (gameState.netWorth >= 3000000) {
      actionPlan.push("Close to FIRE! Increase index fund investing by $2.5K monthly to achieve FIRE in 2-3 years");
      actionPlan.push("Focus on salary growth through additional skills");
    } else {
      actionPlan.push("⚠️ Course Correction Needed: Pay off all high-interest debt immediately");
      actionPlan.push("Increase income through skill development and career growth");
      actionPlan.push("Start aggressive systematic investing - $3.5K+ monthly index fund contributions");
      actionPlan.push("Consider working until 55-60 for FIRE achievement");
    }

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {/* Header */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="text-center mb-8"
            >
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {finalResults.fireAchieved ? "🔥 FIRE ACHIEVED! 🔥" : "FIRE Journey Analysis"}
              </h1>
              <div className="text-5xl font-bold text-green-600 mb-2">
                ${(gameState.netWorth / 1000000).toFixed(1)}M
              </div>
              <p className="text-lg text-gray-700">Final Net Worth at Age {gameState.age}</p>
            </motion.div>

            {/* Enhanced Analysis Sections */}
            <div className="space-y-8">
              
              {/* Conditional: Either Critical Mistakes OR Excellent Decisions */}
              {missedOpportunities.length > 0 ? (
                /* Critical Mistakes Section */
                <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-red-800">Critical Mistakes That Cost You Millions</h2>
                      <p className="text-red-600">These decisions had massive compound effects over 26 years</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {missedOpportunities.map((opportunity, index) => {
                      const parts = opportunity.split(': ');
                      return (
                        <div key={index} className="bg-white p-5 rounded-lg border-l-6 border-red-500 shadow-md">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-red-600 font-bold text-sm">❌</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-red-800 mb-2">{parts[0]}</h4>
                              <p className="text-red-700 text-sm">{parts[1]}</p>
                              <div className="mt-2 text-xs bg-red-50 text-red-600 px-2 py-1 rounded">
                                Impact: High - This single decision affected your entire FIRE timeline
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Excellent Decision Making Section */
                <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-green-800">Excellent Decision Making!</h2>
                      <p className="text-green-600">You avoided all major financial mistakes throughout your 26-year journey</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg text-center border-l-6 border-green-500 shadow-md">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Outstanding Financial Discipline!</h3>
                    <p className="text-green-700 mb-4">Your consistent smart choices throughout the 26-year journey have maximized your wealth potential. You demonstrated excellent financial discipline and strategic thinking.</p>
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="font-semibold text-green-800">Career Growth</div>
                        <div className="text-sm text-green-600">Optimal skill investments</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="font-semibold text-green-800">Investment Timing</div>
                        <div className="text-sm text-green-600">Disciplined market approach</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="font-semibold text-green-800">Lifestyle Balance</div>
                        <div className="text-sm text-green-600">Smart spending decisions</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Optimization Opportunities */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-100 border-2 border-yellow-300 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-yellow-800">Missed Optimization Opportunities</h2>
                    <p className="text-yellow-600">Small improvements that could have added thousands to your wealth</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-yellow-500">
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase className="w-5 h-5 text-yellow-600" />
                      <h4 className="font-bold text-yellow-800">Career Growth</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Earlier skill investment could have reached $16K+ monthly salary by age 35</p>
                    <div className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
                      Potential Impact: $375-500K additional lifetime earnings
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-500">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <h4 className="font-bold text-blue-800">Investment Timing</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Starting investment from month 1 instead of month 6</p>
                    <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      Potential Impact: $75-125K additional corpus
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-green-500">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-green-600" />
                      <h4 className="font-bold text-green-800">Emergency Planning</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">6-month emergency fund from Stage 1 would have prevented debt cycles</p>
                    <div className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                      Potential Impact: $125-200K saved in interest costs
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Plan */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-800">Your Next Steps</h3>
                  </div>
                  <div className="space-y-3">
                    {actionPlan.map((action, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-blue-600 font-bold text-xs">{index + 1}</span>
                          </div>
                          <p className="text-sm text-gray-800">{action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800">Master These Principles</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-green-800 mb-2">🧠 Mindset Mastery</h4>
                      <p className="text-sm text-gray-700">Always choose delayed gratification over instant pleasure</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-blue-800 mb-2">📈 Investment Priority</h4>
                      <p className="text-sm text-gray-700">Invest in yourself first - skills compound faster than money</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-purple-800 mb-2">⚙️ Automation Strategy</h4>
                      <p className="text-sm text-gray-700">Set up automatic investments before you see the money</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-red-800 mb-2">🎯 Emotional Control</h4>
                      <p className="text-sm text-gray-700">Make financial decisions with logic, never emotions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Replay Strategy */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-800">Perfect Replay Strategy</h3>
                    <p className="text-purple-600">Follow this path for optimal FIRE achievement</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-green-600 font-bold mb-2">✅ Stage 1: Strategic Foundation</div>
                    <p className="text-xs text-gray-600">Build emergency fund + start investing immediately</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-green-600 font-bold mb-2">✅ Stage 4: Invest in Career Growth</div>
                    <p className="text-xs text-gray-600">$12K skill investment = $500K lifetime returns</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-green-600 font-bold mb-2">✅ Stage 7: Stay Invested During Crashes</div>
                    <p className="text-xs text-gray-600">Increase investment when markets fall by 30%</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-green-600 font-bold mb-2">✅ Stage 8: Term + Mutual Fund investment</div>
                    <p className="text-xs text-gray-600">Separate insurance and investment for optimal returns</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Stats */}
            <div className="grid md:grid-cols-4 gap-4 mt-8 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-blue-800">Personality</h4>
                <p className="text-blue-600">{getPersonalityDescription()}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-green-800">FIRE Progress</h4>
                <p className="text-green-600">{calculateFIREProgress().toFixed(1)}%</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-purple-800">Achievements</h4>
                <p className="text-purple-600">{gameState.achievements.length} Unlocked</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-yellow-800">Journey Score</h4>
                <p className="text-yellow-600">{finalResults.totalScore}/100</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={onBackToDashboard}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors"
              >
                <Home className="w-5 h-5" />
                Back to Dashboard
              </button>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.reload();
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                Try Different Choices
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={onBackToDashboard}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-4 py-2 rounded-lg"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Salaried Professional FIRE Journey</h1>
              <p className="text-gray-600">Stage {gameState.currentStage + 1} of {salariedProfessionalStages.length}</p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-600">Age {gameState.age} • ${(gameState.salary/1000).toFixed(0)}K/month</div>
              <div className="text-lg font-bold text-green-600">${(gameState.netWorth/1000).toFixed(0)}K Net Worth</div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">FIRE Progress</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${calculateFIREProgress()}%` }}
                ></div>
              </div>
              <div className="text-xs text-orange-600 mt-1">{calculateFIREProgress().toFixed(0)}%</div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">Knowledge</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(Math.max(gameState.knowledgeScore * 4, 0), 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-blue-600 mt-1">{gameState.knowledgeScore}</div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">Emotional Health</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(Math.max((gameState.emotionalScore + 10) * 4, 0), 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-green-600 mt-1">{gameState.emotionalScore}</div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">Risk Level</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(Math.max(gameState.riskScore * 4, 0), 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-red-600 mt-1">{gameState.riskScore}</div>
            </div>
          </div>
        </div>

        {/* Main Game Content */}
        <AnimatePresence mode="wait">
          {!isTransitioning && (
            <motion.div
              key={gameState.currentStage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              {/* Stage Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStageData.title}</h2>
                  <p className="text-gray-600 mb-3">{currentStageData.description}</p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                    <p className="text-amber-800 text-sm"><strong>Context:</strong> {currentStageData.context}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-blue-800 whitespace-pre-line">{currentStageData.situation}</p>
                  </div>
                </div>
              </div>

              {!showFeedback ? (
                /* Choice Selection */
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    💭 Choose Your Financial Strategy:
                  </h3>
                  {currentStageData.options.map((option, index) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{option.label}</h4>
                          <p className="text-gray-700 text-sm mb-3">{option.description}</p>
                          <div className="flex gap-4 text-xs">
                            <span className={`px-2 py-1 rounded ${
                              option.impact.netWorth > 0 ? 'bg-green-100 text-green-700' : 
                              option.impact.netWorth < 0 ? 'bg-red-100 text-red-700' : 
                              'bg-gray-100 text-gray-700'
                            }`}>
                              Net Worth: {option.impact.netWorth > 0 ? '+' : ''}${(option.impact.netWorth/1000).toFixed(0)}K
                            </span>
                            <span className={`px-2 py-1 rounded ${
                              option.impact.knowledge > 0 ? 'bg-blue-100 text-blue-700' : 
                              option.impact.knowledge < 0 ? 'bg-red-100 text-red-700' : 
                              'bg-gray-100 text-gray-700'
                            }`}>
                              Knowledge: {option.impact.knowledge > 0 ? '+' : ''}{option.impact.knowledge}
                            </span>
                            <span className={`px-2 py-1 rounded ${
                              option.impact.emotion > 0 ? 'bg-green-100 text-green-700' : 
                              option.impact.emotion < 0 ? 'bg-red-100 text-red-700' : 
                              'bg-gray-100 text-gray-700'
                            }`}>
                              Emotion: {option.impact.emotion > 0 ? '+' : ''}{option.impact.emotion}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                /* Feedback Display */
                <div className="space-y-6">
                  {selectedOption && (() => {
                    const option = currentStageData.options.find(opt => opt.id === selectedOption)!;
                    const isGoodChoice = option.impact.netWorth >= 0 && option.impact.emotion >= 0;
                    
                    return (
                      <>
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-6 rounded-xl border ${
                            isGoodChoice ? 'bg-green-50 border-green-200' : 
                            option.impact.netWorth < -100000 ? 'bg-red-50 border-red-200' : 
                            'bg-yellow-50 border-yellow-200'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            {isGoodChoice ? (
                              <CheckCircle className="w-8 h-8 text-green-600" />
                            ) : (
                              <AlertTriangle className="w-8 h-8 text-orange-600" />
                            )}
                            <div>
                              <h3 className="text-lg font-bold">Choice: {option.label}</h3>
                              <p className="text-sm text-gray-600">Impact Analysis</p>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-white p-3 rounded-lg">
                              <div className="text-sm font-medium text-gray-700 mb-1">Immediate</div>
                              <div className="text-xs text-gray-600">{option.consequences.immediate}</div>
                            </div>
                            <div className="bg-white p-3 rounded-lg">
                              <div className="text-sm font-medium text-gray-700 mb-1">Short Term</div>
                              <div className="text-xs text-gray-600">{option.consequences.shortTerm}</div>
                            </div>
                            <div className="bg-white p-3 rounded-lg">
                              <div className="text-sm font-medium text-gray-700 mb-1">Long Term</div>
                              <div className="text-xs text-gray-600">{option.consequences.longTerm}</div>
                            </div>
                          </div>
                        </motion.div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Info className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-blue-800">Learning Point</span>
                          </div>
                          <p className="text-blue-700 text-sm">{currentStageData.learningPoint}</p>
                        </div>
                        
                        <div className="flex justify-center">
                          <button
                            onClick={proceedToNextStage}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors"
                          >
                            {gameState.currentStage < salariedProfessionalStages.length - 1 ? (
                              <>
                                Continue Journey
                                <ArrowRight className="w-5 h-5" />
                              </>
                            ) : (
                              <>
                                Complete FIRE Journey
                                <Trophy className="w-5 h-5" />
                              </>
                            )}
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Achievements Sidebar */}
        {gameState.achievements.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg max-w-xs"
          >
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              Achievements
            </h4>
            <div className="space-y-2">
              {gameState.achievements.map((achievement, index) => (
                <div key={index} className="text-sm bg-yellow-50 text-yellow-800 px-2 py-1 rounded">
                  {achievement}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SalariedProfessionalFIREGame;