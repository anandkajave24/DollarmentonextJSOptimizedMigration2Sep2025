import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { smallBusinessStages, SmallBusinessGameStage, SmallBusinessStageOption } from '@/data/smallBusiness';
import { Building2, TrendingUp, Brain, AlertTriangle, DollarSign, Briefcase } from 'lucide-react';

interface GameState {
  currentStage: number;
  netWorth: number;
  savings: number;
  debt: number;
  emotion: number;
  knowledge: number;
  risk: number;
  businessValue: number;
  cashFlow: number;
  history: Array<{
    stage: number;
    choice: string;
    impact: string;
  }>;
}

const SmallBusinessFIREGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentStage: 0,
    netWorth: 40000,
    savings: 18000,
    debt: 5000,
    emotion: 0,
    knowledge: 0,
    risk: 0,
    businessValue: 0,
    cashFlow: 0,
    history: []
  });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const currentStageData = smallBusinessStages[gameState.currentStage];
  const isGameComplete = gameState.currentStage >= smallBusinessStages.length;

  const handleOptionSelect = (option: SmallBusinessStageOption) => {
    if (selectedOption === option.id) {
      // Execute the choice
      setGameState(prev => ({
        ...prev,
        currentStage: prev.currentStage + 1,
        netWorth: prev.netWorth + option.impact.netWorth,
        savings: prev.savings + option.impact.savings,
        debt: prev.debt + (option.impact.debt || 0),
        emotion: Math.max(-5, Math.min(5, prev.emotion + option.impact.emotion)),
        knowledge: Math.max(0, Math.min(10, prev.knowledge + option.impact.knowledge)),
        risk: Math.max(0, Math.min(10, prev.risk + option.impact.risk)),
        businessValue: Math.max(0, prev.businessValue + option.impact.businessValue),
        cashFlow: prev.cashFlow + option.impact.cashFlow,
        history: [...prev.history, {
          stage: prev.currentStage,
          choice: option.label,
          impact: option.consequences.immediate
        }]
      }));
      setSelectedOption(null);
      setShowResults(true);
    } else {
      setSelectedOption(option.id);
      setShowResults(false);
    }
  };

  const resetGame = () => {
    setGameState({
      currentStage: 0,
      netWorth: 40000,
      savings: 18000,
      debt: 5000,
      emotion: 0,
      knowledge: 0,
      risk: 0,
      businessValue: 0,
      cashFlow: 0,
      history: []
    });
    setSelectedOption(null);
    setShowResults(false);
  };

  const getCashFlowColor = (value: number) => {
    if (value >= 1000) return 'text-green-600';
    if (value >= 0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEmotionColor = (value: number) => {
    if (value >= 2) return 'text-green-600';
    if (value >= 0) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isGameComplete) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-purple-800">Small Business Journey Complete! 🚀</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">${gameState.netWorth.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Net Worth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">${gameState.businessValue.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Business Value</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getCashFlowColor(gameState.cashFlow)}`}>
                  ${gameState.cashFlow.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Monthly Cash Flow</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{gameState.knowledge}/10</div>
                <div className="text-sm text-gray-600">Knowledge</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Your Entrepreneurial Journey:</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {gameState.history.map((entry, index) => (
                  <div key={index} className="p-3 bg-white rounded border-l-4 border-purple-400">
                    <div className="font-medium">Stage {entry.stage + 1}: {entry.choice}</div>
                    <div className="text-sm text-gray-600">{entry.impact}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <Button onClick={resetGame} className="w-full">
              Start New Business Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Game Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-purple-600" />
              <div>
                <CardTitle className="text-xl">Small Business Owner Journey</CardTitle>
                <p className="text-gray-600">Stage {gameState.currentStage + 1} of {smallBusinessStages.length}</p>
              </div>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Age {currentStageData.age}
            </Badge>
          </div>
          <Progress value={((gameState.currentStage) / smallBusinessStages.length) * 100} className="mt-4" />
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Status Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Financial Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Net Worth</span>
                <span className="font-bold">${gameState.netWorth.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Savings</span>
                <span className="text-green-600">${gameState.savings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Debt</span>
                <span className="text-red-600">${gameState.debt.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Business Value</span>
                <span className="text-purple-600">${gameState.businessValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Monthly Income</span>
                <span className="font-medium">${currentStageData.monthlyIncome.toLocaleString()}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Cash Flow
                  </span>
                  <span className={getCashFlowColor(gameState.cashFlow)}>
                    ${gameState.cashFlow.toLocaleString()}/mo
                  </span>
                </div>
                <Progress 
                  value={Math.max(0, Math.min(100, ((gameState.cashFlow + 5000) / 10000) * 100))} 
                  className="h-2" 
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Risk Level
                  </span>
                  <span className="text-orange-600">{gameState.risk}/10</span>
                </div>
                <Progress value={(gameState.risk / 10) * 100} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium flex items-center">
                    <Brain className="h-4 w-4 mr-1" />
                    Knowledge
                  </span>
                  <span className="text-blue-600">{gameState.knowledge}/10</span>
                </div>
                <Progress value={(gameState.knowledge / 10) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Game Content */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">{currentStageData.title}</CardTitle>
            <p className="text-gray-600">{currentStageData.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Situation Description */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-purple-600" />
                Current Situation
              </h3>
              <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed">
                {currentStageData.situation}
              </pre>
            </div>

            {/* Decision Options */}
            <div className="space-y-4">
              <h3 className="font-semibold">Choose Your Strategy:</h3>
              <div className="grid gap-4">
                {currentStageData.options.map((option) => (
                  <Card 
                    key={option.id}
                    className={`cursor-pointer transition-all ${
                      selectedOption === option.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">{option.label}</h4>
                        {selectedOption === option.id && (
                          <Badge className="bg-purple-500">Selected</Badge>
                        )}
                      </div>
                      <p className="text-gray-700 mb-3">{option.description}</p>
                      
                      {selectedOption === option.id && (
                        <div className="mt-4 space-y-3 border-t pt-4">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>Net Worth: <span className={option.impact.netWorth >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {option.impact.netWorth >= 0 ? '+' : ''}${option.impact.netWorth.toLocaleString()}
                            </span></div>
                            <div>Savings: <span className={option.impact.savings >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {option.impact.savings >= 0 ? '+' : ''}${option.impact.savings.toLocaleString()}
                            </span></div>
                            <div>Business Value: <span className={option.impact.businessValue >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {option.impact.businessValue >= 0 ? '+' : ''}${option.impact.businessValue.toLocaleString()}
                            </span></div>
                            <div>Cash Flow: <span className={option.impact.cashFlow >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {option.impact.cashFlow >= 0 ? '+' : ''}${option.impact.cashFlow.toLocaleString()}
                            </span></div>
                          </div>
                          
                          <div className="space-y-2">
                            <div><span className="font-medium">Immediate:</span> {option.consequences.immediate}</div>
                            <div><span className="font-medium">Short-term:</span> {option.consequences.shortTerm}</div>
                            <div><span className="font-medium">Long-term:</span> {option.consequences.longTerm}</div>
                          </div>
                          
                          <Button className="w-full mt-4">
                            Confirm This Choice
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Learning Point */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-green-800">💡 Key Learning</h3>
              <p className="text-green-700">{currentStageData.learningPoint}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmallBusinessFIREGame;