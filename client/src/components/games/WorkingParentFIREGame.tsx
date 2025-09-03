import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { workingParentStages, WorkingParentGameStage, WorkingParentStageOption } from '@/data/workingParentStages';
import { Baby, Users, Heart, Brain, TrendingUp, Home, DollarSign, ArrowLeft } from 'lucide-react';

interface GameState {
  currentStage: number;
  netWorth: number;
  savings: number;
  debt: number;
  emotion: number;
  knowledge: number;
  risk: number;
  familyStability: number;
  careerGrowth: number;
  history: Array<{
    stage: number;
    choice: string;
    impact: string;
  }>;
}

interface WorkingParentFIREGameProps {
  onBack?: () => void;
}

const WorkingParentFIREGame: React.FC<WorkingParentFIREGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentStage: 0,
    netWorth: 45000,
    savings: 25000,
    debt: 15000,
    emotion: 0,
    knowledge: 0,
    risk: 0,
    familyStability: 0,
    careerGrowth: 0,
    history: []
  });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const currentStageData = workingParentStages[gameState.currentStage];
  const isGameComplete = gameState.currentStage >= workingParentStages.length;

  const handleOptionSelect = (option: WorkingParentStageOption) => {
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
        familyStability: Math.max(-5, Math.min(5, prev.familyStability + option.impact.familyStability)),
        careerGrowth: Math.max(-5, Math.min(5, prev.careerGrowth + option.impact.careerGrowth)),
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
      netWorth: 45000,
      savings: 25000,
      debt: 15000,
      emotion: 0,
      knowledge: 0,
      risk: 0,
      familyStability: 0,
      careerGrowth: 0,
      history: []
    });
    setSelectedOption(null);
    setShowResults(false);
  };

  const getEmotionColor = (value: number) => {
    if (value >= 2) return 'text-green-600';
    if (value >= 0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage >= 70) return 'bg-green-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (isGameComplete) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-800">Working Parent Journey Complete! 🎉</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">${gameState.netWorth.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Net Worth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{gameState.familyStability}/5</div>
                <div className="text-sm text-gray-600">Family Stability</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{gameState.careerGrowth}/5</div>
                <div className="text-sm text-gray-600">Career Growth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{gameState.knowledge}/10</div>
                <div className="text-sm text-gray-600">Knowledge</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Your Journey Summary:</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {gameState.history.map((entry, index) => (
                  <div key={index} className="p-3 bg-white rounded border-l-4 border-blue-400">
                    <div className="font-medium">Stage {entry.stage + 1}: {entry.choice}</div>
                    <div className="text-sm text-gray-600">{entry.impact}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <Button onClick={resetGame} className="w-full">
              Start New Working Parent Journey
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
              {onBack && (
                <Button variant="outline" size="sm" onClick={onBack} className="mr-2">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              )}
              <Baby className="h-8 w-8 text-pink-600" />
              <div>
                <CardTitle className="text-xl">Working Parent Financial Journey</CardTitle>
                <p className="text-gray-600">Stage {gameState.currentStage + 1} of {workingParentStages.length}</p>
              </div>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Age {currentStageData.age}
            </Badge>
          </div>
          <Progress value={((gameState.currentStage) / workingParentStages.length) * 100} className="mt-4" />
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
                <span className="text-sm font-medium">Monthly Income</span>
                <span className="font-medium">${currentStageData.monthlyIncome.toLocaleString()}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    Family Stability
                  </span>
                  <span className={getEmotionColor(gameState.familyStability)}>{gameState.familyStability}/5</span>
                </div>
                <Progress value={((gameState.familyStability + 5) / 10) * 100} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Career Growth
                  </span>
                  <span className={getEmotionColor(gameState.careerGrowth)}>{gameState.careerGrowth}/5</span>
                </div>
                <Progress value={((gameState.careerGrowth + 5) / 10) * 100} className="h-2" />
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
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
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
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">{option.label}</h4>
                        {selectedOption === option.id && (
                          <Badge className="bg-blue-500">Selected</Badge>
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
                            <div>Family: <span className={option.impact.familyStability >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {option.impact.familyStability >= 0 ? '+' : ''}{option.impact.familyStability}
                            </span></div>
                            <div>Career: <span className={option.impact.careerGrowth >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {option.impact.careerGrowth >= 0 ? '+' : ''}{option.impact.careerGrowth}
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

export default WorkingParentFIREGame;