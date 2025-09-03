import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Home, Trophy, Target, TrendingUp, 
  DollarSign, Shield, Users, Briefcase, Heart, Brain,
  Coins, Star, CheckCircle, AlertTriangle, Info, PlayCircle,
  User, Monitor, PiggyBank, MapPin, Flag, Zap
} from 'lucide-react';

interface AnimatedFIREJourneyProps {
  avatarType: 'professional' | 'freelancer' | 'housewife';
  onComplete: (results: any) => void;
  onBackToDashboard: () => void;
}

interface StageChoice {
  id: string;
  label: string;
  description: string;
  outcome: 'good' | 'bad' | 'neutral';
  impact: {
    netWorth: number;
    happiness: number;
    stress: number;
  };
  animation: string;
}

interface LifeStage {
  id: number;
  title: string;
  age: number;
  description: string;
  character: {
    mood: 'happy' | 'neutral' | 'stressed' | 'excited';
    wealth: 'poor' | 'middle' | 'rich' | 'wealthy';
    environment: 'home' | 'office' | 'cafe' | 'bank' | 'celebration';
  };
  choices: StageChoice[];
  learningPoint: string;
}

const AnimatedFIREJourney: React.FC<AnimatedFIREJourneyProps> = ({ 
  avatarType, 
  onComplete, 
  onBackToDashboard 
}) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showChoices, setShowChoices] = useState(false);
  const [gameState, setGameState] = useState({
    netWorth: 0,
    happiness: 50,
    stress: 20,
    age: 25,
    decisions: [] as any[],
    achievements: [] as string[]
  });
  const [showRoadmap, setShowRoadmap] = useState(false);

  // Define character journey stages based on avatar type
  const getStagesForAvatar = (avatar: string): LifeStage[] => {
    const commonStages: LifeStage[] = [
      {
        id: 1,
        title: "First Job Reality",
        age: 25,
        description: "Your character just got their first real income!",
        character: {
          mood: 'excited',
          wealth: 'poor',
          environment: 'office'
        },
        choices: [
          {
            id: 'save_smart',
            label: 'Save 30% immediately',
            description: 'Build emergency fund and start investing',
            outcome: 'good',
            impact: { netWorth: 50000, happiness: 10, stress: -5 },
            animation: 'piggy-bank-fill'
          },
          {
            id: 'spend_lifestyle',
            label: 'Enjoy the new lifestyle',
            description: 'Buy nice things, celebrate success',
            outcome: 'bad',
            impact: { netWorth: -20000, happiness: 20, stress: 10 },
            animation: 'shopping-spree'
          },
          {
            id: 'balanced_approach',
            label: 'Balanced saving & spending',
            description: 'Save some, enjoy some',
            outcome: 'neutral',
            impact: { netWorth: 15000, happiness: 15, stress: 0 },
            animation: 'balanced-scale'
          }
        ],
        learningPoint: "Early financial habits set the foundation for your entire financial future."
      },
      {
        id: 2,
        title: "Emergency Crisis",
        age: 28,
        description: "Unexpected medical emergency hits your character!",
        character: {
          mood: 'stressed',
          wealth: 'middle',
          environment: 'home'
        },
        choices: [
          {
            id: 'emergency_fund',
            label: 'Use emergency fund',
            description: 'Handle crisis without debt',
            outcome: 'good',
            impact: { netWorth: -30000, happiness: 5, stress: -10 },
            animation: 'emergency-handled'
          },
          {
            id: 'credit_card',
            label: 'Use credit cards',
            description: 'Borrow money for emergency',
            outcome: 'bad',
            impact: { netWorth: -50000, happiness: -10, stress: 20 },
            animation: 'debt-burden'
          },
          {
            id: 'family_help',
            label: 'Ask family for help',
            description: 'Rely on family support',
            outcome: 'neutral',
            impact: { netWorth: -10000, happiness: -5, stress: 5 },
            animation: 'family-support'
          }
        ],
        learningPoint: "Emergency funds are not optional - they prevent debt spirals during crises."
      },
      {
        id: 3,
        title: "Investment Awakening",
        age: 32,
        description: "Your character discovers the power of investing!",
        character: {
          mood: 'neutral',
          wealth: 'middle',
          environment: 'bank'
        },
        choices: [
          {
            id: 'systematic_sip',
            label: 'Start systematic investment',
            description: 'Regular monthly investments',
            outcome: 'good',
            impact: { netWorth: 100000, happiness: 15, stress: -5 },
            animation: 'investment-growth'
          },
          {
            id: 'stock_gambling',
            label: 'Try stock trading',
            description: 'Look for quick gains',
            outcome: 'bad',
            impact: { netWorth: -30000, happiness: -10, stress: 25 },
            animation: 'market-crash'
          },
          {
            id: 'safe_fd',
            label: 'Stick to fixed deposits',
            description: 'Play it completely safe',
            outcome: 'neutral',
            impact: { netWorth: 20000, happiness: 5, stress: -10 },
            animation: 'slow-growth'
          }
        ],
        learningPoint: "Systematic investing beats market timing. Start early, stay consistent."
      },
      {
        id: 4,
        title: "Peak Career Decision",
        age: 38,
        description: "Major career opportunity with trade-offs appears!",
        character: {
          mood: 'neutral',
          wealth: 'rich',
          environment: 'office'
        },
        choices: [
          {
            id: 'take_promotion',
            label: 'Accept big promotion',
            description: 'Higher income but more stress',
            outcome: 'good',
            impact: { netWorth: 200000, happiness: 10, stress: 15 },
            animation: 'career-climb'
          },
          {
            id: 'work_balance',
            label: 'Maintain work-life balance',
            description: 'Steady growth, better life',
            outcome: 'neutral',
            impact: { netWorth: 50000, happiness: 20, stress: -10 },
            animation: 'life-balance'
          },
          {
            id: 'early_retirement',
            label: 'Plan early retirement',
            description: 'Coast on current savings',
            outcome: 'neutral',
            impact: { netWorth: -50000, happiness: 25, stress: -20 },
            animation: 'relaxation'
          }
        ],
        learningPoint: "Peak earning years are crucial for building wealth, but balance matters too."
      },
      {
        id: 5,
        title: "FIRE Reality Check",
        age: 50,
        description: "Time to see if your character achieved financial freedom!",
        character: {
          mood: 'happy',
          wealth: 'wealthy',
          environment: 'celebration'
        },
        choices: [
          {
            id: 'fire_achieved',
            label: 'Celebrate FIRE Success',
            description: 'Financial independence achieved!',
            outcome: 'good',
            impact: { netWorth: 0, happiness: 50, stress: -30 },
            animation: 'fire-celebration'
          },
          {
            id: 'close_to_fire',
            label: 'Almost there',
            description: 'Need few more years',
            outcome: 'neutral',
            impact: { netWorth: 0, happiness: 20, stress: 5 },
            animation: 'almost-there'
          },
          {
            id: 'fire_missed',
            label: 'FIRE not achieved',
            description: 'Need to keep working',
            outcome: 'bad',
            impact: { netWorth: 0, happiness: -10, stress: 20 },
            animation: 'keep-working'
          }
        ],
        learningPoint: "FIRE achievement depends on decades of consistent financial decisions."
      }
    ];

    return commonStages;
  };

  const stages = getStagesForAvatar(avatarType);
  const currentStageData = stages[currentStage];

  // Realistic Character Animation
  const getCharacterAnimation = () => {
    const { mood, wealth, environment } = currentStageData.character;
    
    return (
      <div className="relative">
        {/* Realistic Character SVG Animation */}
        <motion.div 
          className="w-48 h-64 mx-auto mb-4"
          animate={{ 
            y: mood === 'happy' || mood === 'excited' ? [-3, 3, -3] : mood === 'stressed' ? [-1, 1, -1] : [0],
            scale: mood === 'excited' ? [1, 1.05, 1] : [1]
          }}
          transition={{ 
            duration: mood === 'stressed' ? 0.5 : 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <svg viewBox="0 0 200 280" className="w-full h-full">
            {/* Character Head */}
            <ellipse 
              cx="100" 
              cy="50" 
              rx="25" 
              ry="30" 
              fill="#F4C2A1"
              className="transition-all duration-1000"
            />
            
            {/* Hair */}
            <path 
              d="M 75 25 Q 100 15 125 25 Q 130 30 125 45 Q 100 35 75 45 Q 70 30 75 25" 
              fill="#8B4513"
            />
            
            {/* Eyes with expressions */}
            <motion.g
              animate={mood === 'stressed' ? { scaleY: [1, 0.3, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ellipse cx="90" cy="45" rx="4" ry="3" fill="#FFF" />
              <ellipse cx="110" cy="45" rx="4" ry="3" fill="#FFF" />
              <circle cx="90" cy="45" r="2" fill="#000" />
              <circle cx="110" cy="45" r="2" fill="#000" />
              {mood === 'happy' && (
                <>
                  <circle cx="90" cy="44" r="0.5" fill="#FFF" />
                  <circle cx="110" cy="44" r="0.5" fill="#FFF" />
                </>
              )}
            </motion.g>
            
            {/* Eyebrows */}
            <motion.g
              animate={mood === 'stressed' ? { rotate: [0, -10, 0] } : mood === 'happy' ? { y: [0, -2, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformOrigin: '100px 40px' }}
            >
              <path d="M 85 38 Q 90 36 95 38" stroke="#8B4513" strokeWidth="2" fill="none" />
              <path d="M 105 38 Q 110 36 115 38" stroke="#8B4513" strokeWidth="2" fill="none" />
            </motion.g>
            
            {/* Nose */}
            <path d="M 100 50 K 98 55 K 102 55 Z" fill="#E6A477" />
            
            {/* Mouth with mood expressions */}
            <motion.path
              d={
                mood === 'happy' || mood === 'excited' ? "M 92 60 Q 100 68 108 60" :
                mood === 'stressed' ? "M 92 65 Q 100 58 108 65" :
                "M 92 62 K 108 62"
              }
              stroke="#8B4513" 
              strokeWidth="2" 
              fill="none"
              animate={mood === 'excited' ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ transformOrigin: '100px 62px' }}
            />
            
            {/* Neck */}
            <rect x="92" y="75" width="16" height="15" fill="#F4C2A1" />
            
            {/* Body - changes with wealth */}
            <motion.rect 
              x="75" 
              y="90" 
              width="50" 
              height="80" 
              fill={
                wealth === 'wealthy' ? '#1a365d' : // Navy suit
                wealth === 'rich' ? '#2563eb' : // Blue shirt
                wealth === 'middle' ? '#64748b' : // Gray shirt
                '#94a3b8' // Light gray
              }
              rx="8"
              className="transition-colors duration-1000"
              animate={mood === 'excited' ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformOrigin: '100px 130px' }}
            />
            
            {/* Arms */}
            <motion.g
              animate={
                mood === 'happy' ? { rotate: [0, 5, 0] } :
                mood === 'stressed' ? { rotate: [0, -3, 0] } : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformOrigin: '100px 100px' }}
            >
              <ellipse cx="60" cy="110" rx="8" ry="25" fill="#F4C2A1" />
              <ellipse cx="140" cy="110" rx="8" ry="25" fill="#F4C2A1" />
            </motion.g>
            
            {/* Hands */}
            <circle cx="60" cy="135" r="6" fill="#F4C2A1" />
            <circle cx="140" cy="135" r="6" fill="#F4C2A1" />
            
            {/* Legs */}
            <rect x="85" y="170" width="12" height="40" fill="#1f2937" />
            <rect x="103" y="170" width="12" height="40" fill="#1f2937" />
            
            {/* Feet */}
            <ellipse cx="91" cy="215" rx="8" ry="4" fill="#000" />
            <ellipse cx="109" cy="215" rx="8" ry="4" fill="#000" />
            
            {/* Wealth Accessories */}
            {wealth === 'wealthy' && (
              <motion.g
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Watch */}
                <rect x="135" y="125" width="8" height="6" fill="#FFD700" rx="1" />
                {/* Tie */}
                <path d="M 98 90 K 102 90 K 105 120 K 95 120 Z" fill="#8B0000" />
                {/* Briefcase */}
                <rect x="145" y="140" width="15" height="10" fill="#8B4513" rx="2" />
              </motion.g>
            )}
            
            {wealth === 'rich' && (
              <motion.g
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Watch */}
                <rect x="135" y="125" width="6" height="4" fill="#C0C0C0" rx="1" />
                {/* Simple tie */}
                <path d="M 99 90 K 101 90 K 103 115 K 97 115 Z" fill="#4169E1" />
              </motion.g>
            )}
            
            {/* Stress indicators */}
            {mood === 'stressed' && (
              <motion.g
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <text x="75" y="30" fontSize="12" fill="#FF0000">💢</text>
                <text x="115" y="35" fontSize="10" fill="#FF0000">💢</text>
              </motion.g>
            )}
            
            {/* Happiness sparkles */}
            {(mood === 'happy' || mood === 'excited') && (
              <motion.g
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ transformOrigin: '100px 50px' }}
              >
                <text x="70" y="25" fontSize="14" fill="#FFD700">✨</text>
                <text x="125" y="30" fontSize="12" fill="#FFD700">✨</text>
                <text x="65" y="70" fontSize="10" fill="#FFD700">✨</text>
                <text x="130" y="75" fontSize="10" fill="#FFD700">✨</text>
              </motion.g>
            )}
          </svg>
        </motion.div>

        {/* Environment Background */}
        <motion.div 
          className="absolute inset-0 -z-10 rounded-xl opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          style={{
            backgroundColor: 
              environment === 'office' ? '#1976D2' :
              environment === 'home' ? '#4CAF50' :
              environment === 'bank' ? '#FF9800' :
              environment === 'celebration' ? '#E91E63' :
              '#9E9E9E'
          }}
        />

        {/* Floating Icons */}
        <AnimatePresence>
          {mood === 'excited' && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: [-10, -30, -10] }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2"
            >
              <Star className="w-6 h-6 text-yellow-400" />
            </motion.div>
          )}
          
          {mood === 'stressed' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute top-2 right-2"
            >
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Progress visualization
  const getProgressVisualization = () => {
    const progress = (currentStage / (stages.length - 1)) * 100;
    
    return (
      <div className="relative mb-8">
        {/* Progress Road */}
        <div className="h-4 bg-gray-200 rounded-full relative overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          
          {/* Milestones */}
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              className={`absolute top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                index <= currentStage 
                  ? 'bg-green-500 border-green-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-400'
              }`}
              style={{ left: `${(index / (stages.length - 1)) * 100}%`, marginLeft: '-16px' }}
              initial={{ scale: 0 }}
              animate={{ scale: index <= currentStage ? 1 : 0.8 }}
              transition={{ delay: index * 0.2 }}
            >
              {index < currentStage ? (
                <CheckCircle className="w-4 h-4" />
              ) : index === currentStage ? (
                <MapPin className="w-4 h-4" />
              ) : (
                <span className="text-xs">{index + 1}</span>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Age and Stage Labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>Age 25</span>
          <span>Age 35</span>
          <span>Age 50</span>
        </div>
      </div>
    );
  };

  // Handle choice selection
  const handleChoiceSelect = (choiceId: string) => {
    const choice = currentStageData.choices.find(c => c.id === choiceId);
    if (!choice) return;

    setSelectedChoice(choiceId);
    
    // Update game state
    setGameState(prev => ({
      ...prev,
      netWorth: prev.netWorth + choice.impact.netWorth,
      happiness: Math.max(0, Math.min(100, prev.happiness + choice.impact.happiness)),
      stress: Math.max(0, Math.min(100, prev.stress + choice.impact.stress)),
      age: currentStageData.age,
      decisions: [...prev.decisions, {
        stage: currentStageData.title,
        choice: choice.label,
        outcome: choice.outcome,
        impact: choice.impact
      }]
    }));

    // Show animation and move to next stage
    setTimeout(() => {
      if (currentStage < stages.length - 1) {
        setCurrentStage(currentStage + 1);
        setSelectedChoice(null);
        setShowChoices(false);
      } else {
        setShowRoadmap(true);
      }
    }, 2000);
  };

  // Generate final roadmap analysis
  const generateRoadmapAnalysis = () => {
    const goodDecisions = gameState.decisions.filter(d => d.outcome === 'good').length;
    const badDecisions = gameState.decisions.filter(d => d.outcome === 'bad').length;
    const finalNetWorth = gameState.netWorth;
    
    const fireStatus = finalNetWorth >= 500000 && goodDecisions >= 3 ? 'achieved' : 
                      finalNetWorth >= 200000 ? 'close' : 'missed';
    
    return {
      fireStatus,
      goodDecisions,
      badDecisions,
      finalNetWorth,
      happiness: gameState.happiness,
      stress: gameState.stress,
      improvements: gameState.decisions
        .filter(d => d.outcome === 'bad')
        .map(d => `Stage: ${d.stage} - Consider: Better planning for ${d.stage.toLowerCase()}`)
    };
  };

  if (showRoadmap) {
    const analysis = generateRoadmapAnalysis();
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Financial Journey Complete!
              </h1>
              <div className="text-2xl font-bold text-green-600">
                Final Net Worth: ${(gameState.netWorth / 100000).toFixed(1)} K
              </div>
            </div>

            {/* Journey Roadmap Visualization */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Your Journey Roadmap</h3>
              <div className="space-y-4">
                {gameState.decisions.map((decision, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.3 }}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      decision.outcome === 'good' ? 'bg-green-50 border-l-4 border-green-500' :
                      decision.outcome === 'bad' ? 'bg-red-50 border-l-4 border-red-500' :
                      'bg-yellow-50 border-l-4 border-yellow-500'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      decision.outcome === 'good' ? 'bg-green-500' :
                      decision.outcome === 'bad' ? 'bg-red-500' :
                      'bg-yellow-500'
                    }`}>
                      {decision.outcome === 'good' ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : decision.outcome === 'bad' ? (
                        <AlertTriangle className="w-6 h-6 text-white" />
                      ) : (
                        <Info className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold">{decision.stage}</h4>
                      <p className="text-sm text-gray-600">{decision.choice}</p>
                      <p className="text-xs text-gray-500">
                        Impact: ${(decision.impact.netWorth / 1000).toFixed(0)}K net worth change
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FIRE Status */}
            <div className={`p-6 rounded-xl mb-6 ${
              analysis.fireStatus === 'achieved' ? 'bg-green-100 border border-green-300' :
              analysis.fireStatus === 'close' ? 'bg-yellow-100 border border-yellow-300' :
              'bg-red-100 border border-red-300'
            }`}>
              <h3 className="text-xl font-bold mb-2">
                {analysis.fireStatus === 'achieved' ? '🔥 FIRE ACHIEVED!' :
                 analysis.fireStatus === 'close' ? '⚡ CLOSE TO FIRE' :
                 '⚠️ FIRE NOT ACHIEVED'}
              </h3>
              <p className="text-gray-700">
                {analysis.fireStatus === 'achieved' ? 
                  'Congratulations! Your character achieved financial independence through smart decisions!' :
                 analysis.fireStatus === 'close' ?
                  'Almost there! A few more years of smart investing could achieve FIRE.' :
                  'Your character needs to continue working. Better financial decisions could have changed this outcome.'}
              </p>
            </div>

            {/* Improvements Section */}
            {analysis.improvements.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">What Could Have Been Better</h3>
                <div className="space-y-2">
                  {analysis.improvements.map((improvement, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg">
                      <p className="text-sm text-blue-700">💡 {improvement}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Final Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{analysis.goodDecisions}</div>
                <div className="text-green-800">Good Decisions</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{gameState.happiness}%</div>
                <div className="text-blue-800">Happiness Level</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{100 - gameState.stress}%</div>
                <div className="text-purple-800">Peace of Mind</div>
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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
              <h1 className="text-2xl font-bold text-gray-900">Animated FIRE Journey</h1>
              <p className="text-gray-600">{avatarType.charAt(0).toUpperCase() + avatarType.slice(1)} Path</p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-600">Age {currentStageData.age}</div>
              <div className="text-lg font-bold text-green-600">${(gameState.netWorth/1000).toFixed(1)}L</div>
            </div>
          </div>

          {getProgressVisualization()}
        </div>

        {/* Main Game Area */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Character Animation */}
          <div className="text-center mb-8">
            {getCharacterAnimation()}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStageData.title}</h2>
            <p className="text-gray-600 mb-4">{currentStageData.description}</p>
          </div>

          {/* Game State Display */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-green-600">{gameState.happiness}%</div>
              <div className="text-xs text-green-800">Happiness</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-blue-600">${(gameState.netWorth/1000).toFixed(0)}K</div>
              <div className="text-xs text-blue-800">Net Worth</div>
            </div>
            <div className="bg-red-50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-red-600">{gameState.stress}%</div>
              <div className="text-xs text-red-800">Stress</div>
            </div>
          </div>

          {/* Choices */}
          {!selectedChoice ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center mb-6">
                🎯 Choose your character's next move:
              </h3>
              {currentStageData.choices.map((choice, index) => (
                <motion.button
                  key={choice.id}
                  onClick={() => handleChoiceSelect(choice.id)}
                  className={`w-full p-6 text-left border-2 rounded-xl transition-all duration-300 hover:shadow-lg ${
                    choice.outcome === 'good' ? 'border-green-200 hover:border-green-400 hover:bg-green-50' :
                    choice.outcome === 'bad' ? 'border-red-200 hover:border-red-400 hover:bg-red-50' :
                    'border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      choice.outcome === 'good' ? 'bg-green-100 text-green-600' :
                      choice.outcome === 'bad' ? 'bg-red-100 text-red-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{choice.label}</h4>
                      <p className="text-gray-700 text-sm">{choice.description}</p>
                      <div className="flex gap-2 mt-2 text-xs">
                        <span className={`px-2 py-1 rounded ${
                          choice.impact.netWorth > 0 ? 'bg-green-100 text-green-700' : 
                          choice.impact.netWorth < 0 ? 'bg-red-100 text-red-700' : 
                          'bg-gray-100 text-gray-700'
                        }`}>
                          ${(choice.impact.netWorth/1000).toFixed(0)}K
                        </span>
                        <span className={`px-2 py-1 rounded ${
                          choice.impact.happiness > 0 ? 'bg-blue-100 text-blue-700' : 
                          choice.impact.happiness < 0 ? 'bg-red-100 text-red-700' : 
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {choice.impact.happiness > 0 ? '+' : ''}{choice.impact.happiness} Joy
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-10 h-10 text-blue-600" />
                </motion.div>
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Processing your choice...</h3>
              <p className="text-gray-600">Watch how this decision shapes your character's future!</p>
            </div>
          )}

          {/* Learning Point */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Learning Point</span>
            </div>
            <p className="text-blue-700 text-sm">{currentStageData.learningPoint}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedFIREJourney;