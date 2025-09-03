import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Home, Trophy, Target, TrendingUp, 
  DollarSign, Shield, Users, Briefcase, Heart, Brain,
  Coins, Star, CheckCircle, AlertTriangle, Info
} from 'lucide-react';
import { housewifeStages, HousewifeGameStage, HousewifeStageOption } from '@/data/housewifeStages';

interface HousewifeFIREGameProps {
  onComplete: (results: any) => void;
  onBackToDashboard: () => void;
}

interface HousewifeGameState {
  currentStage: number;
  netWorth: number;
  totalSavings: number;
  totalDebt: number;
  emotionalScore: number;
  knowledgeScore: number;
  riskScore: number;
  independenceScore: number;
  familyHappinessScore: number;
  age: number;
  householdIncome: number;
  personalIncome: number;
  decisions: any[];
  achievements: string[];
}

const HousewifeFIREGame: React.FC<HousewifeFIREGameProps> = ({ 
  onComplete, 
  onBackToDashboard 
}) => {
  const [gameState, setGameState] = useState<HousewifeGameState>({
    currentStage: 0,
    netWorth: 0,
    totalSavings: 0,
    totalDebt: 0,
    emotionalScore: 0,
    knowledgeScore: 0,
    riskScore: 0,
    independenceScore: 0,
    familyHappinessScore: 0,
    age: 26,
    householdIncome: 80000,
    personalIncome: 0,
    decisions: [],
    achievements: []
  });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Dynamic context generation based on previous decisions
  const getDynamicContext = (stageId: number) => {
    if (stageId === 2) { // First Pregnancy Financial Planning
      const firstDecision = gameState.decisions.find(d => d.stage.includes("Financial Invisibility"));
      if (firstDecision?.choice.includes("Traditional")) {
        return "⚠️ TRADITIONAK CHOICE IMPACT: Your decision to remain financially dependent is now creating stress as pregnancy expenses mount and you have no personal financial resources to contribute.";
      } else if (firstDecision?.choice.includes("Independence")) {
        return "🚀 INDEPENDENCE FOUNDATION: Your early focus on financial independence is paying off. You have some personal income and savings to contribute to pregnancy expenses, reducing family financial stress.";
      }
      return housewifeStages[stageId].context;
    }
    
    if (stageId === 15) { // Final FIRE Reality Check
      return generateHousewifeFIREAssessment();
    }
    
    return housewifeStages[stageId].context;
  };

  // Generate comprehensive FIRE assessment for housewives
  const generateHousewifeFIREAssessment = () => {
    const fireAnalysis = calculateHousewifeFIREProgress();
    const { decisions, netWorth, totalDebt } = gameState;
    
    let fireStatus = "";
    let personalizedGuidance = "";
    
    if (netWorth >= 750000 && gameState.independenceScore >= 15) {
      fireStatus = "🔥 BALANCED FIRE ACHIEVED! 🔥";
      personalizedGuidance = "You've successfully balanced family responsibilities with financial independence! A rare achievement that provides both security and fulfillment.";
    } else if (netWorth >= 500000) {
      fireStatus = "⚡ FAMILY-SUPPORTED FINANCIAK SECURITY";
      personalizedGuidance = "You've built good financial security through family income and smart planning, though personal independence could be stronger.";
    } else if (gameState.familyHappinessScore >= 15) {
      fireStatus = "💝 FAMILY-FIRST SUCCESS";
      personalizedGuidance = "You prioritized family happiness and relationships. While financial independence is limited, your family bonds are strong.";
    } else {
      fireStatus = "⚠️ FINANCIAK VULNERABILITY";
      personalizedGuidance = "The balance between family and finances has been challenging. Consider strategies to build both security and independence.";
    }
    
    return `FIRE Status: ${fireStatus} | ${personalizedGuidance}`;
  };

  // Calculate realistic FIRE progress for housewives
  const calculateHousewifeFIREProgress = () => {
    const { netWorth, age, decisions, totalDebt, independenceScore, familyHappinessScore } = gameState;
    const fireTarget = 750000; // Lower target considering family context
    
    const badDecisions = decisions.filter(d => 
      d.choice.includes("Traditional") || 
      d.choice.includes("Premium") || 
      d.choice.includes("Full Focus") ||
      d.choice.includes("Dependent")
    ).length;
    
    const goodDecisions = decisions.filter(d =>
      d.choice.includes("Independence") ||
      d.choice.includes("Strategic") ||
      d.choice.includes("Balanced") ||
      d.choice.includes("Investment")
    ).length;
    
    const currentProgress = (netWorth / fireTarget) * 100;
    const disciplineScore = (goodDecisions - badDecisions) / Math.max(decisions.length, 1);
    const independenceBonus = independenceScore * 2; // Independence is crucial for housewife FIRE
    const familyBalance = Math.min(familyHappinessScore, 10); // Family happiness up to a point
    
    const adjustedProgress = Math.max(0, currentProgress + (disciplineScore * 15) + independenceBonus + familyBalance);
    
    return {
      currentProgress: adjustedProgress,
      onTrack: adjustedProgress >= ((60 - age) / 34) * 100,
      projectedFireAge: age + Math.max(5, (fireTarget - netWorth) / (gameState.personalIncome * 12 * 0.5 + gameState.householdIncome * 12 * 0.1)),
      riskFactors: badDecisions,
      strengths: goodDecisions,
      balanceScore: (independenceScore + familyHappinessScore) / 2
    };
  };

  // Generate dynamic final stage content
  const getFinalStageContent = () => {
    if (gameState.currentStage !== 15) return null;
    
    const { decisions, netWorth, totalDebt, independenceScore, familyHappinessScore } = gameState;
    
    let specificMistakes = [];
    let actionableAdvice = [];
    
    const traditionalMistake = decisions.find(d => d.choice.includes("Traditional"));
    if (traditionalMistake) {
      specificMistakes.push("❌ Stage 1: Traditional approach limited your financial independence and career growth");
      actionableAdvice.push("✅ Financial independence and family happiness can coexist with proper planning");
    }
    
    const premiumMistake = decisions.find(d => d.choice.includes("Premium"));
    if (premiumMistake) {
      specificMistakes.push("❌ Lifestyle Inflation: Premium choices throughout life created financial stress and limited savings");
      actionableAdvice.push("✅ Thoughtful spending allows for both family comfort and financial security");
    }
    
    const careerMistake = decisions.find(d => d.choice.includes("Full Focus") && d.stage.includes("Maternity"));
    if (careerMistake) {
      specificMistakes.push("❌ Career Gap: Extended break from income generation created long-term financial vulnerability");
      actionableAdvice.push("✅ Maintaining some income stream, even small, prevents career gaps and builds confidence");
    }

    const dynamicSituation = `
📊 **YOUR 34-YEAR FAMILY & FINANCIAK JOURNEY ASSESSMENT**

${generateHousewifeFIREAssessment()}

**CURRENT FINANCIAK POSITION:**
• Personal Net Worth: $${(netWorth/1000).toFixed(1)} K
• Household Income: $${(gameState.householdIncome/1000).toFixed(0)}K/month
• Personal Income: $${(gameState.personalIncome/1000).toFixed(0)}K/month
• Financial Independence Score: ${independenceScore}/25
• Family Happiness Score: ${familyHappinessScore}/25

**HOUSEWIFE-SPECIFIC ANALYSIS:**
${specificMistakes.length > 0 ? specificMistakes.join('\n') : '✅ You balanced family and finances excellently throughout your journey!'}

**WHAT YOU SHOULD HAVE DONE DIFFERENTLY:**
${actionableAdvice.length > 0 ? actionableAdvice.join('\n') : '🎉 Your family-finance balance strategy was exemplary!'}

**THE HOUSEWIFE FIRE REALITY:**
Housewives face unique challenges: career gaps, financial dependence, family-first decisions, and balancing personal growth with family needs. True success is measured by both financial security AND family happiness.

**YOUR LEGACY:**
Independence Score: ${independenceScore}/25 | Family Happiness: ${familyHappinessScore}/25
${independenceScore >= 15 && familyHappinessScore >= 15 ? 
  "You've achieved the rare balance of financial independence AND family happiness - a true inspiration!" :
  independenceScore >= 15 ? 
    "Strong financial independence achieved, though family relationships may need attention." :
    familyHappinessScore >= 15 ?
      "Excellent family relationships, but financial independence could be stronger for long-term security." :
      "Both financial independence and family happiness need strengthening for optimal life balance."
}`;

    return dynamicSituation;
  };

  // Get current stage with dynamic context
  const currentStageData = gameState.currentStage === 15 ? {
    ...housewifeStages[gameState.currentStage],
    context: getDynamicContext(gameState.currentStage),
    situation: getFinalStageContent()
  } : { 
    ...housewifeStages[gameState.currentStage],
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
        independenceScore: prev.independenceScore + option.impact.independence,
        familyHappinessScore: prev.familyHappinessScore + option.impact.familyHappiness,
        age: currentStageData.age + 1,
        householdIncome: gameState.currentStage < housewifeStages.length - 1 
          ? housewifeStages[gameState.currentStage + 1].householdIncome 
          : prev.householdIncome,
        personalIncome: gameState.currentStage < housewifeStages.length - 1 
          ? housewifeStages[gameState.currentStage + 1].personalIncome 
          : prev.personalIncome,
        decisions: [...prev.decisions, {
          stage: currentStageData.title,
          choice: option.label,
          impact: option.impact,
          consequences: option.consequences
        }]
      };

      const newAchievements = [...prev.achievements];
      if (newState.independenceScore >= 15 && !newAchievements.includes('Financial Independence')) {
        newAchievements.push('Financial Independence');
      }
      if (newState.familyHappinessScore >= 15 && !newAchievements.includes('Family Harmony')) {
        newAchievements.push('Family Harmony');
      }
      if (newState.independenceScore >= 10 && newState.familyHappinessScore >= 10 && !newAchievements.includes('Balanced Life')) {
        newAchievements.push('Balanced Life');
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
    const fireTarget = 3000000; // Adjusted for housewife context
    return Math.min((gameState.netWorth / fireTarget) * 100, 100);
  };

  const getPersonalityDescription = () => {
    const { independenceScore, familyHappinessScore, knowledgeScore } = gameState;
    
    if (independenceScore > 15 && familyHappinessScore > 15) return "Balanced Achiever";
    if (independenceScore > 15) return "Independent Woman";
    if (familyHappinessScore > 15) return "Family Champion";
    if (knowledgeScore > 10) return "Learning Enthusiast";
    return "Developing Balance";
  };

  // Game completion check with comprehensive analysis
  if (gameState.currentStage >= housewifeStages.length) {
    const finalResults = {
      netWorth: gameState.netWorth,
      fireAchieved: gameState.netWorth >= 3000000 && gameState.independenceScore >= 15,
      age: gameState.age,
      personality: getPersonalityDescription(),
      decisions: gameState.decisions,
      achievements: gameState.achievements,
      totalScore: gameState.emotionalScore + gameState.knowledgeScore + gameState.independenceScore + gameState.familyHappinessScore - gameState.riskScore,
      balanceScore: (gameState.independenceScore + gameState.familyHappinessScore) / 2
    };

    // Analysis for missed opportunities
    const missedOpportunities = [];
    const improvementAreas = [];
    const actionPlan = [];

    if (gameState.decisions.find(d => d.choice.includes("Traditional") && d.stage.includes("Invisibility"))) {
      missedOpportunities.push("Financial Independence: Traditional approach limited earning potential by $30-50K over 34 years");
    }
    if (gameState.decisions.find(d => d.choice.includes("Full Focus") && d.stage.includes("Maternity"))) {
      missedOpportunities.push("Career Continuity: Extended career break created 3-5 year income gap affecting lifetime earnings");
    }
    if (gameState.decisions.find(d => d.choice.includes("Premium"))) {
      missedOpportunities.push("Lifestyle Management: Premium lifestyle choices reduced savings rate by 40-50%");
    }

    if (finalResults.fireAchieved) {
      actionPlan.push("🎉 Balanced FIRE Achieved! You're a role model for family-finance balance");
    } else if (gameState.familyHappinessScore >= 15) {
      actionPlan.push("Focus on building passive income streams while maintaining family harmony");
    } else {
      actionPlan.push("⚠️ Strengthen both financial independence and family relationships");
      actionPlan.push("Consider part-time income generation and family investment education");
    }

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4"
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
              <Heart className="w-20 h-20 text-pink-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {finalResults.fireAchieved ? "💝 BALANCED FIRE ACHIEVED! 💝" : "Family & Financial Journey Analysis"}
              </h1>
              <div className="text-5xl font-bold text-green-600 mb-2">
                ${(gameState.netWorth / 10000000).toFixed(1)} Cr
              </div>
              <p className="text-lg text-gray-700">Final Net Worth at Age {gameState.age}</p>
              <p className="text-sm text-pink-600">34 Years of Balancing Family & Finances</p>
            </motion.div>

            {/* Balance Score Display */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-center text-pink-800 mb-4">Your Life Balance Achievement</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600">{gameState.independenceScore}/25</div>
                  <div className="text-purple-800 font-semibold">Financial Independence</div>
                  <div className="w-full bg-purple-200 rounded-full h-3 mt-2">
                    <div 
                      className="bg-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(gameState.independenceScore/25)*100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-600">{gameState.familyHappinessScore}/25</div>
                  <div className="text-pink-800 font-semibold">Family Happiness</div>
                  <div className="w-full bg-pink-200 rounded-full h-3 mt-2">
                    <div 
                      className="bg-pink-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(gameState.familyHappinessScore/25)*100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <div className="text-2xl font-bold text-gray-800">Balance Score: {finalResults.balanceScore.toFixed(1)}/25</div>
                <div className="text-sm text-gray-600">
                  {finalResults.balanceScore >= 20 ? "Exceptional Balance Achieved!" :
                   finalResults.balanceScore >= 15 ? "Great Balance - Minor adjustments needed" :
                   finalResults.balanceScore >= 10 ? "Good foundation - Room for improvement" :
                   "Focus needed on both family and financial aspects"}
                </div>
              </div>
            </div>

            {/* Enhanced Analysis Sections */}
            <div className="space-y-8">
              
              {/* Family-Finance Balance Mistakes */}
              <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-red-800">Balance Challenges</h2>
                    <p className="text-red-600">Decisions that impacted your family-finance balance</p>
                  </div>
                </div>
                
                {missedOpportunities.length > 0 ? (
                  <div className="grid md:grid-cols-1 gap-4">
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
                                Family Impact: This affected both financial security and family dynamics
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-green-100 border border-green-300 p-6 rounded-lg text-center">
                    <CheckCircle className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white" />
                    <h3 className="text-xl font-bold text-green-800 mb-2">Perfect Balance!</h3>
                    <p className="text-green-700">You successfully balanced family happiness with financial independence.</p>
                  </div>
                )}
              </div>

              {/* Your Legacy */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-800">Your Legacy & Next Steps</h3>
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
            </div>

            {/* Final Stats */}
            <div className="grid md:grid-cols-4 gap-4 mt-8 mb-6">
              <div className="bg-pink-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-pink-800">Personality</h4>
                <p className="text-pink-600">{getPersonalityDescription()}</p>
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
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                Try Different Family Path
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={onBackToDashboard}
              className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors bg-pink-50 px-4 py-2 rounded-lg"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Housewife Financial Independence Journey</h1>
              <p className="text-gray-600">Stage {gameState.currentStage + 1} of {housewifeStages.length}</p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-600">Age {gameState.age} • Household: ${(gameState.householdIncome/1000).toFixed(0)}K</div>
              <div className="text-lg font-bold text-green-600">Personal: ${(gameState.personalIncome/1000).toFixed(0)}K/month</div>
            </div>
          </div>

          {/* Housewife-specific Progress Bars */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
              <div className="text-xs text-gray-600 mb-1">Independence</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(Math.max(gameState.independenceScore * 4, 0), 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-purple-600 mt-1">{gameState.independenceScore}</div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">Family Joy</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(Math.max(gameState.familyHappinessScore * 4, 0), 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-pink-600 mt-1">{gameState.familyHappinessScore}</div>
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
              <div className="text-xs text-gray-600 mb-1">Balance</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(Math.max(((gameState.independenceScore + gameState.familyHappinessScore)/2) * 4, 0), 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-green-600 mt-1">{((gameState.independenceScore + gameState.familyHappinessScore)/2).toFixed(1)}</div>
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
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStageData.title}</h2>
                  <p className="text-gray-600 mb-3">{currentStageData.description}</p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                    <p className="text-amber-800 text-sm"><strong>Context:</strong> {currentStageData.context}</p>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <p className="text-pink-800 whitespace-pre-line">{currentStageData.situation}</p>
                  </div>
                </div>
              </div>

              {!showFeedback ? (
                /* Choice Selection */
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    💝 Choose Your Family-Finance Balance:
                  </h3>
                  {currentStageData.options.map((option, index) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-pink-400 hover:bg-pink-50 transition-all duration-300 hover:shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold text-sm">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{option.label}</h4>
                          <p className="text-gray-700 text-sm mb-3">{option.description}</p>
                          <div className="flex gap-4 text-xs flex-wrap">
                            <span className={`px-2 py-1 rounded ${
                              option.impact.independence > 0 ? 'bg-purple-100 text-purple-700' : 
                              option.impact.independence < 0 ? 'bg-red-100 text-red-700' : 
                              'bg-gray-100 text-gray-700'
                            }`}>
                              Independence: {option.impact.independence > 0 ? '+' : ''}{option.impact.independence}
                            </span>
                            <span className={`px-2 py-1 rounded ${
                              option.impact.familyHappiness > 0 ? 'bg-pink-100 text-pink-700' : 
                              option.impact.familyHappiness < 0 ? 'bg-red-100 text-red-700' : 
                              'bg-gray-100 text-gray-700'
                            }`}>
                              Family Joy: {option.impact.familyHappiness > 0 ? '+' : ''}{option.impact.familyHappiness}
                            </span>
                            <span className={`px-2 py-1 rounded ${
                              option.impact.netWorth > 0 ? 'bg-green-100 text-green-700' : 
                              option.impact.netWorth < 0 ? 'bg-red-100 text-red-700' : 
                              'bg-gray-100 text-gray-700'
                            }`}>
                              Net Worth: {option.impact.netWorth > 0 ? '+' : ''}${(option.impact.netWorth/1000).toFixed(0)}K
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
                    const isGoodChoice = option.impact.independence >= 0 && option.impact.familyHappiness >= 0;
                    
                    return (
                      <>
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-6 rounded-xl border ${
                            isGoodChoice ? 'bg-green-50 border-green-200' : 
                            option.impact.familyHappiness < -1 ? 'bg-red-50 border-red-200' : 
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
                              <p className="text-sm text-gray-600">Family-Finance Balance Impact</p>
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
                        
                        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Info className="w-5 h-5 text-pink-600" />
                            <span className="font-semibold text-pink-800">Family-Finance Learning Point</span>
                          </div>
                          <p className="text-pink-700 text-sm">{currentStageData.learningPoint}</p>
                        </div>
                        
                        <div className="flex justify-center">
                          <button
                            onClick={proceedToNextStage}
                            className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors"
                          >
                            {gameState.currentStage < housewifeStages.length - 1 ? (
                              <>
                                Continue Family Journey
                                <ArrowRight className="w-5 h-5" />
                              </>
                            ) : (
                              <>
                                Complete Life Balance Assessment
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
              Life Achievements
            </h4>
            <div className="space-y-2">
              {gameState.achievements.map((achievement, index) => (
                <div key={index} className="text-sm bg-pink-50 text-pink-800 px-2 py-1 rounded">
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

export default HousewifeFIREGame;