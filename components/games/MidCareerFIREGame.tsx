import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Brain, Heart, AlertTriangle, Briefcase, Target } from 'lucide-react';
import { midCareerStages, type MidCareerGameStage, type MidCareerStageOption } from '@/data/midCareerStages';

interface GameState {
  currentStage: number;
  netWorth: number;
  savings: number;
  debt: number;
  emotion: number;
  knowledge: number;
  risk: number;
  retirement401k: number;
  taxOptimization: number;
  gameCompleted: boolean;
  choices: string[];
}

const MidCareerFIREGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentStage: 0,
    netWorth: 485000,
    savings: 125000,
    debt: 145000,
    emotion: 5,
    knowledge: 6,
    risk: 4,
    retirement401k: 285000,
    taxOptimization: 3,
    gameCompleted: false,
    choices: []
  });

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const currentStageData = midCareerStages[gameState.currentStage];

  const handleChoice = (option: MidCareerStageOption) => {
    const newState = {
      currentStage: gameState.currentStage + 1,
      netWorth: Math.max(0, gameState.netWorth + option.impact.netWorth),
      savings: Math.max(0, gameState.savings + option.impact.savings),
      debt: Math.max(0, gameState.debt + (option.impact.debt || 0)),
      emotion: Math.max(0, Math.min(10, gameState.emotion + option.impact.emotion)),
      knowledge: Math.max(0, Math.min(10, gameState.knowledge + option.impact.knowledge)),
      risk: Math.max(0, Math.min(10, gameState.risk + option.impact.risk)),
      retirement401k: Math.max(0, gameState.retirement401k + option.impact.retirement401k),
      taxOptimization: Math.max(0, Math.min(10, gameState.taxOptimization + option.impact.taxOptimization)),
      gameCompleted: gameState.currentStage + 1 >= midCareerStages.length,
      choices: [...gameState.choices, option.id]
    };

    setGameState(newState);
    setSelectedOption('');
    setShowResults(true);

    setTimeout(() => {
      setShowResults(false);
    }, 3000);
  };

  const resetGame = () => {
    setGameState({
      currentStage: 0,
      netWorth: 485000,
      savings: 125000,
      debt: 145000,
      emotion: 5,
      knowledge: 6,
      risk: 4,
      retirement401k: 285000,
      taxOptimization: 3,
      gameCompleted: false,
      choices: []
    });
    setShowResults(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getScoreColor = (score: number, isRisk: boolean = false) => {
    if (isRisk) {
      if (score <= 3) return 'text-green-600';
      if (score <= 6) return 'text-yellow-600';
      return 'text-red-600';
    }
    if (score <= 3) return 'text-red-600';
    if (score <= 6) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (gameState.gameCompleted) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-800 flex items-center justify-center gap-2">
              <Target className="w-8 h-8" />
              Mid-Career Professional Journey Complete!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-600">{formatCurrency(gameState.netWorth)}</div>
                <div className="text-sm text-gray-600">Net Worth</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-blue-600">{formatCurrency(gameState.retirement401k)}</div>
                <div className="text-sm text-gray-600">401k Balance</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-purple-600">{gameState.knowledge}/10</div>
                <div className="text-sm text-gray-600">Financial Knowledge</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <Target className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-orange-600">{gameState.taxOptimization}/10</div>
                <div className="text-sm text-gray-600">Tax Optimization</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="text-lg text-gray-700">
                Congratulations! You've navigated the complex world of peak earning years, maximizing retirement contributions while balancing multiple financial priorities.
              </div>
              <div className="text-md text-gray-600">
                Your strategic decisions about 401k contributions, tax optimization, and college planning have set you up for a strong retirement while supporting your family's goals.
              </div>
              <Button onClick={resetGame} className="bg-green-600 hover:bg-green-700">
                Play Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
            <Briefcase className="w-6 h-6" />
            Mid-Career Professional Journey - Stage {gameState.currentStage + 1} of {midCareerStages.length}
          </CardTitle>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${((gameState.currentStage + 1) / midCareerStages.length) * 100}%` }}
            />
          </div>
        </CardHeader>
      </Card>

      {/* Financial Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-lg font-bold">{formatCurrency(gameState.netWorth)}</div>
            <div className="text-sm text-gray-600">Net Worth</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Briefcase className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-lg font-bold">{formatCurrency(gameState.retirement401k)}</div>
            <div className="text-sm text-gray-600">401k Balance</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Brain className={`w-8 h-8 mx-auto mb-2 ${getScoreColor(gameState.knowledge)}`} />
            <div className={`text-lg font-bold ${getScoreColor(gameState.knowledge)}`}>{gameState.knowledge}/10</div>
            <div className="text-sm text-gray-600">Knowledge</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className={`w-8 h-8 mx-auto mb-2 ${getScoreColor(gameState.taxOptimization)}`} />
            <div className={`text-lg font-bold ${getScoreColor(gameState.taxOptimization)}`}>{gameState.taxOptimization}/10</div>
            <div className="text-sm text-gray-600">Tax Optimization</div>
          </CardContent>
        </Card>
      </div>

      {/* Current Stage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{currentStageData.title}</CardTitle>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Age: {currentStageData.age}</span>
            <span>Monthly Income: {formatCurrency(currentStageData.monthlyIncome)}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium mb-2">Situation:</div>
            <div className="text-sm whitespace-pre-line">{currentStageData.situation}</div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm font-medium mb-2">Context:</div>
            <div className="text-sm">{currentStageData.context}</div>
          </div>
        </CardContent>
      </Card>

      {/* Options */}
      <div className="grid gap-4">
        {currentStageData.options.map((option, index) => (
          <Card 
            key={option.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedOption === option.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{option.label}</h3>
                  <p className="text-gray-600 text-sm mt-1">{option.description}</p>
                </div>
                <div className="flex gap-2">
                  {option.impact.netWorth > 0 && (
                    <Badge variant="outline" className="text-green-600 border-green-300">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{formatCurrency(option.impact.netWorth)}
                    </Badge>
                  )}
                  {option.impact.netWorth < 0 && (
                    <Badge variant="outline" className="text-red-600 border-red-300">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      {formatCurrency(option.impact.netWorth)}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Immediate:</span>
                  <p className="text-gray-600">{option.consequences.immediate}</p>
                </div>
                <div>
                  <span className="font-medium">Short-term:</span>
                  <p className="text-gray-600">{option.consequences.shortTerm}</p>
                </div>
                <div>
                  <span className="font-medium">Long-term:</span>
                  <p className="text-gray-600">{option.consequences.longTerm}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Button */}
      {selectedOption && (
        <div className="text-center">
          <Button 
            onClick={() => {
              const option = currentStageData.options.find(o => o.id === selectedOption);
              if (option) handleChoice(option);
            }}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
          >
            Make This Choice
          </Button>
        </div>
      )}

      {/* Learning Point */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <div className="font-medium text-green-800 mb-1">Learning Point:</div>
              <div className="text-sm text-green-700">{currentStageData.learningPoint}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-4">Choice Impact</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Net Worth:</span>
                  <span className={gameState.netWorth > 485000 ? 'text-green-600' : 'text-red-600'}>
                    {formatCurrency(gameState.netWorth)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>401k Balance:</span>
                  <span className="text-blue-600">{formatCurrency(gameState.retirement401k)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Knowledge:</span>
                  <span className={getScoreColor(gameState.knowledge)}>{gameState.knowledge}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax Optimization:</span>
                  <span className={getScoreColor(gameState.taxOptimization)}>{gameState.taxOptimization}/10</span>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500">Moving to next stage...</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MidCareerFIREGame;