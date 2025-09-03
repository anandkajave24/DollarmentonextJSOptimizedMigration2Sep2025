import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Home, Trophy, Target, TrendingUp, 
  DollarSign, Shield, Users, Briefcase, Heart, Brain,
  Coins, Star, CheckCircle, AlertTriangle, Info, Monitor
} from 'lucide-react';
import { freelancerStages, FreelancerGameStage, FreelancerStageOption } from '@/data/freelancerStages';

interface FreelancerFIREGameProps {
  onComplete: (results: any) => void;
  onBackToDashboard: () => void;
}

interface FreelancerGameState {
  currentStage: number;
  netWorth: number;
  totalSavings: number;
  totalDebt: number;
  emotionalScore: number;
  knowledgeScore: number;
  riskScore: number;
  independenceScore: number;
  clientBaseScore: number;
  skillLevelScore: number;
  age: number;
  monthlyIncome: number;
  decisions: any[];
  achievements: string[];
}

const FreelancerFIREGame: React.FC<FreelancerFIREGameProps> = ({ 
  onComplete, 
  onBackToDashboard 
}) => {
  const [gameState, setGameState] = useState<FreelancerGameState>({
    currentStage: 0,
    netWorth: 4500,
    totalSavings: 0,
    totalDebt: 0,
    emotionalScore: 0,
    knowledgeScore: 0,
    riskScore: 0,
    independenceScore: 0,
    clientBaseScore: 0,
    skillLevelScore: 0,
    age: 25,
    monthlyIncome: 2500,
    decisions: [],
    achievements: []
  });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Dynamic context generation based on previous decisions
  const getDynamicContext = (stageId: number) => {
    if (stageId === 2) { // Client Payment Crisis
      const firstDecision = gameState.decisions.find(d => d.stage.includes("Freelance Freedom"));
      if (firstDecision?.choice.includes("Survival Mode")) {
        return "⚠️ SURVIVAK MODE CONSEQUENCES: Your decision to take any project at low rates has attracted clients who don't value your work. They delay payments because they see you as desperate and replaceable.";
      } else if (firstDecision?.choice.includes("Strategic")) {
        return "🎯 STRATEGIC FOUNDATION IMPACT: Your selective approach attracted quality clients, but this major client seemed reliable. Your premium positioning gives you more leverage in payment recovery.";
      }
      return freelancerStages[stageId].context;
    }
    
    if (stageId === 15) { // Final FIRE Reality Check
      return generateFreelancerFIREAssessment();
    }
    
    return freelancerStages[stageId].context;
  };

  // Generate comprehensive FIRE assessment for freelancers
  const generateFreelancerFIREAssessment = () => {
    const fireAnalysis = calculateFreelancerFIREProgress();
    const { decisions, netWorth, totalDebt } = gameState;
    
    let fireStatus = "";
    let personalizedGuidance = "";
    
    if (netWorth >= 125000) {
      fireStatus = "🔥 FREELANCER FIRE ACHIEVED! 🔥";
      personalizedGuidance = "Your disciplined freelance journey has paid off! You've built multiple income streams and achieved financial independence.";
    } else if (netWorth >= 75000) {
      fireStatus = "⚡ CLOSE TO FREELANCER FIRE";
      personalizedGuidance = `You're $${((125000 - netWorth) / 1000).toFixed(0)}K away from FIRE. Your freelance experience gives you flexibility to reach the goal.`;
    } else if (netWorth >= 37500) {
      fireStatus = "📈 MODERATE FREELANCER SUCCESS";
      personalizedGuidance = "Your freelance journey shows mixed results. Income volatility has impacted wealth building significantly.";
    } else {
      fireStatus = "⚠️ FREELANCER FIRE UNLIKELY";
      personalizedGuidance = "Freelance income instability has made traditional FIRE very difficult. Consider hybrid approaches.";
    }
    
    return `FIRE Status: ${fireStatus} | ${personalizedGuidance}`;
  };

  // Calculate realistic FIRE progress for freelancers
  const calculateFreelancerFIREProgress = () => {
    const { netWorth, age, decisions, totalDebt } = gameState;
    const fireTarget = 125000;
    
    const badDecisions = decisions.filter(d => 
      d.choice.includes("Survival Mode") || 
      d.choice.includes("Panic") || 
      d.choice.includes("Doormat") ||
      d.choice.includes("FOMO")
    ).length;
    
    const goodDecisions = decisions.filter(d =>
      d.choice.includes("Strategic") ||
      d.choice.includes("Diversification") ||
      d.choice.includes("Investment") ||
      d.choice.includes("Education")
    ).length;
    
    const currentProgress = (netWorth / fireTarget) * 100;
    const disciplineScore = (goodDecisions - badDecisions) / Math.max(decisions.length, 1);
    const debtImpact = totalDebt / 25000;
    
    const adjustedProgress = Math.max(0, currentProgress + (disciplineScore * 20) - (debtImpact * 5));
    
    return {
      currentProgress: adjustedProgress,
      onTrack: adjustedProgress >= ((50 - age) / 25) * 100,
      projectedFireAge: age + Math.max(10, (fireTarget - netWorth) / (gameState.monthlyIncome * 12 * 0.25)),
      riskFactors: badDecisions,
      strengths: goodDecisions
    };
  };

  // Generate dynamic final stage content
  const getFinalStageContent = () => {
    if (gameState.currentStage !== 15) return null;
    
    const { decisions, netWorth, totalDebt } = gameState;
    
    let specificMistakes = [];
    let actionableAdvice = [];
    
    const survivalMistake = decisions.find(d => d.choice.includes("Survival Mode"));
    if (survivalMistake) {
      specificMistakes.push("❌ Stage 1: Survival mode pricing trapped you in low-value market segment");
      actionableAdvice.push("✅ Always position yourself as premium freelancer from day 1");
    }
    
    const paymentMistake = decisions.find(d => d.choice.includes("Doormat"));
    if (paymentMistake) {
      specificMistakes.push("❌ Stage 2: Accepting payment delays set bad precedent with clients");
      actionableAdvice.push("✅ Strong payment terms and enforcement are essential for freelancer success");
    }
    
    const skillMistake = decisions.find(d => d.choice.includes("Free Resources"));
    if (skillMistake) {
      specificMistakes.push("❌ Stage 3: Free learning approach limited your earning potential growth");
      actionableAdvice.push("✅ Invest in premium skill development for exponential rate increases");
    }

    const dynamicSituation = `
📊 **YOUR 25-YEAR FREELANCE JOURNEY ASSESSMENT**

${generateFreelancerFIREAssessment()}

**CURRENT FINANCIAK POSITION:**
• Net Worth: $${(netWorth/1000).toFixed(1)} K
• Total Debt: $${(totalDebt/1000).toFixed(1)} K  
• FIRE Target: $50K (Financial Independence)
• Gap: $${((5000000 - netWorth)/1000).toFixed(1)} K remaining

**FREELANCER SPECIFIC ANALYSIS:**
${specificMistakes.length > 0 ? specificMistakes.join('\n') : '✅ You navigated the freelance journey expertly!'}

**WHAT YOU SHOULD HAVE DONE DIFFERENTLY:**
${actionableAdvice.length > 0 ? actionableAdvice.join('\n') : '🎉 Your freelance strategy was excellent throughout!'}

**THE FREELANCER FIRE REALITY:**
Freelancers face unique challenges: irregular income, no employer benefits, and constant client acquisition. Your success in achieving FIRE depends on premium positioning, diversified income streams, and disciplined savings during high-income periods.

**REALITY CHECK:**
${netWorth >= 5000000 ? 
  "You've mastered the freelance FIRE journey! Your diverse skills and income streams provide true financial freedom." :
  `You need $${((5000000 - netWorth)/1000).toFixed(1)}K more for FIRE. Consider productizing your services or building passive income streams.`
}`;

    return dynamicSituation;
  };

  // Get current stage with dynamic context
  const currentStageData = gameState.currentStage === 15 ? {
    ...freelancerStages[gameState.currentStage],
    context: getDynamicContext(gameState.currentStage),
    situation: getFinalStageContent()
  } : { 
    ...freelancerStages[gameState.currentStage],
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
        independenceScore: prev.independenceScore + (option.impact.independence || 0),
        clientBaseScore: prev.clientBaseScore + option.impact.clientBase,
        skillLevelScore: prev.skillLevelScore + option.impact.skillLevel,
        age: currentStageData.age + 1,
        monthlyIncome: gameState.currentStage < freelancerStages.length - 1 
          ? freelancerStages[gameState.currentStage + 1].monthlyIncome 
          : prev.monthlyIncome,
        decisions: [...prev.decisions, {
          stage: currentStageData.title,
          choice: option.label,
          impact: option.impact,
          consequences: option.consequences
        }]
      };

      const newAchievements = [...prev.achievements];
      if (newState.netWorth >= 1000000 && !newAchievements.includes('First Million')) {
        newAchievements.push('First Million');
      }
      if (newState.skillLevelScore >= 15 && !newAchievements.includes('Skill Master')) {
        newAchievements.push('Skill Master');
      }
      if (newState.independenceScore >= 20 && !newAchievements.includes('Independent Professional')) {
        newAchievements.push('Independent Professional');
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
    const fireTarget = 5000000;
    return Math.min((gameState.netWorth / fireTarget) * 100, 100);
  };

  const getPersonalityDescription = () => {
    const { emotionalScore, knowledgeScore, riskScore, independenceScore } = gameState;
    
    if (independenceScore > 15 && knowledgeScore > 15) return "Master Freelancer";
    if (riskScore > 15) return "High-Risk Entrepreneur";
    if (independenceScore > 10) return "Independent Professional";
    if (knowledgeScore > 10) return "Skilled Freelancer";
    return "Developing Freelancer";
  };

  // Game completion check with comprehensive analysis
  if (gameState.currentStage >= freelancerStages.length) {
    const finalResults = {
      netWorth: gameState.netWorth,
      fireAchieved: gameState.netWorth >= 5000000,
      age: gameState.age,
      personality: getPersonalityDescription(),
      decisions: gameState.decisions,
      achievements: gameState.achievements,
      totalScore: gameState.emotionalScore + gameState.knowledgeScore + gameState.independenceScore - gameState.riskScore
    };

    // Analysis for missed opportunities
    const missedOpportunities = [];
    const improvementAreas = [];
    const actionPlan = [];

    if (gameState.decisions.find(d => d.choice.includes("Survival Mode"))) {
      missedOpportunities.push("Pricing Strategy: Survival mode pricing limited your lifetime earning potential by $50L+");
    }
    if (gameState.decisions.find(d => d.choice.includes("Doormat"))) {
      missedOpportunities.push("Client Management: Poor payment enforcement cost you $10-15K in delayed/lost payments");
    }
    if (gameState.decisions.find(d => d.choice.includes("Free Resources"))) {
      missedOpportunities.push("Skill Investment: Free learning approach limited rate growth by 200-300%");
    }

    if (gameState.netWorth >= 5000000) {
      actionPlan.push("🎉 Freelancer FIRE Achieved! Focus on passive income and knowledge sharing");
    } else if (gameState.netWorth >= 3000000) {
      actionPlan.push("Scale premium services to $2L+/month to achieve FIRE in 2-3 years");
    } else {
      actionPlan.push("⚠️ Immediate Action: Rebuild client base with premium positioning");
      actionPlan.push("Diversify income through productized services and passive income");
    }

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4"
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
              <Monitor className="w-20 h-20 text-purple-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {finalResults.fireAchieved ? "🔥 FREELANCER FIRE ACHIEVED! 🔥" : "Freelancer Journey Analysis"}
              </h1>
              <div className="text-5xl font-bold text-green-600 mb-2">
                ${(gameState.netWorth / 10000000).toFixed(1)} Cr
              </div>
              <p className="text-lg text-gray-700">Final Net Worth at Age {gameState.age}</p>
              <p className="text-sm text-purple-600">25 Years of Freelance Excellence</p>
            </motion.div>

            {/* Enhanced Analysis Sections */}
            <div className="space-y-8">
              
              {/* Critical Freelancer Mistakes */}
              <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-red-800">Freelancer-Specific Mistakes</h2>
                    <p className="text-red-600">Decisions that limited your earning potential</p>
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
                                Freelancer Impact: High - This affected your entire income trajectory
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
                    <h3 className="text-xl font-bold text-green-800 mb-2">Freelance Master!</h3>
                    <p className="text-green-700">You navigated all major freelance challenges expertly.</p>
                  </div>
                )}
              </div>

              {/* Freelancer Success Metrics */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                  <h4 className="font-bold text-purple-800 mb-2">Independence Score</h4>
                  <div className="text-2xl font-bold text-purple-600">{gameState.independenceScore}</div>
                  <p className="text-xs text-purple-600">Financial Independence Level</p>
                </div>
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-2">Skill Level</h4>
                  <div className="text-2xl font-bold text-blue-600">{gameState.skillLevelScore}</div>
                  <p className="text-xs text-blue-600">Professional Expertise</p>
                </div>
                <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                  <h4 className="font-bold text-green-800 mb-2">Client Base</h4>
                  <div className="text-2xl font-bold text-green-600">{gameState.clientBaseScore}</div>
                  <p className="text-xs text-green-600">Business Development</p>
                </div>
              </div>

              {/* Your Next Steps */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-800">Your Next Steps as a Freelancer</h3>
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
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-purple-800">Personality</h4>
                <p className="text-purple-600">{getPersonalityDescription()}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-green-800">FIRE Progress</h4>
                <p className="text-green-600">{calculateFIREProgress().toFixed(1)}%</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-blue-800">Achievements</h4>
                <p className="text-blue-600">{gameState.achievements.length} Unlocked</p>
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
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                Try Different Freelance Path
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={onBackToDashboard}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors bg-purple-50 px-4 py-2 rounded-lg"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Freelancer FIRE Journey</h1>
              <p className="text-gray-600">Stage {gameState.currentStage + 1} of {freelancerStages.length}</p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-600">Age {gameState.age} • ${(gameState.monthlyIncome/1000).toFixed(1)}K/month</div>
              <div className="text-lg font-bold text-green-600">${(gameState.netWorth/1000).toFixed(0)}K Net Worth</div>
            </div>
          </div>

          {/* Freelancer-specific Progress Bars */}
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
              <div className="text-xs text-gray-600 mb-1">Skills</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(Math.max(gameState.skillLevelScore * 4, 0), 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-blue-600 mt-1">{gameState.skillLevelScore}</div>
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
              <div className="text-xs text-gray-600 mb-1">Client Base</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(Math.max((gameState.clientBaseScore + 5) * 8, 0), 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-green-600 mt-1">{gameState.clientBaseScore}</div>
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
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStageData.title}</h2>
                  <p className="text-gray-600 mb-3">{currentStageData.description}</p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                    <p className="text-amber-800 text-sm"><strong>Context:</strong> {currentStageData.context}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-purple-800 whitespace-pre-line">{currentStageData.situation}</p>
                  </div>
                </div>
              </div>

              {!showFeedback ? (
                /* Choice Selection */
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    🎯 Choose Your Freelance Strategy:
                  </h3>
                  {currentStageData.options.map((option, index) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 hover:shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{option.label}</h4>
                          <p className="text-gray-700 text-sm mb-3">{option.description}</p>
                          <div className="flex gap-4 text-xs flex-wrap">
                            <span className={`px-2 py-1 rounded ${
                              option.impact.netWorth > 0 ? 'bg-green-100 text-green-700' : 
                              option.impact.netWorth < 0 ? 'bg-red-100 text-red-700' : 
                              'bg-gray-100 text-gray-700'
                            }`}>
                              Net Worth: {option.impact.netWorth > 0 ? '+' : ''}${(option.impact.netWorth/1000).toFixed(0)}K
                            </span>
                            <span className={`px-2 py-1 rounded ${
                              (option.impact.independence || 0) > 0 ? 'bg-purple-100 text-purple-700' : 
                              (option.impact.independence || 0) < 0 ? 'bg-red-100 text-red-700' : 
                              'bg-gray-100 text-gray-700'
                            }`}>
                              Independence: {(option.impact.independence || 0) > 0 ? '+' : ''}{option.impact.independence || 0}
                            </span>
                            <span className={`px-2 py-1 rounded ${
                              option.impact.skillLevel > 0 ? 'bg-blue-100 text-blue-700' : 
                              option.impact.skillLevel < 0 ? 'bg-red-100 text-red-700' : 
                              'bg-gray-100 text-gray-700'
                            }`}>
                              Skills: {option.impact.skillLevel > 0 ? '+' : ''}{option.impact.skillLevel}
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
                    const isGoodChoice = option.impact.netWorth >= 0 && (option.impact.independence || 0) >= 0;
                    
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
                              <p className="text-sm text-gray-600">Freelancer Impact Analysis</p>
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
                        
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Info className="w-5 h-5 text-purple-600" />
                            <span className="font-semibold text-purple-800">Freelancer Learning Point</span>
                          </div>
                          <p className="text-purple-700 text-sm">{currentStageData.learningPoint}</p>
                        </div>
                        
                        <div className="flex justify-center">
                          <button
                            onClick={proceedToNextStage}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors"
                          >
                            {gameState.currentStage < freelancerStages.length - 1 ? (
                              <>
                                Continue Freelance Journey
                                <ArrowRight className="w-5 h-5" />
                              </>
                            ) : (
                              <>
                                Complete Freelancer FIRE Assessment
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
              Freelancer Achievements
            </h4>
            <div className="space-y-2">
              {gameState.achievements.map((achievement, index) => (
                <div key={index} className="text-sm bg-purple-50 text-purple-800 px-2 py-1 rounded">
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

export default FreelancerFIREGame;