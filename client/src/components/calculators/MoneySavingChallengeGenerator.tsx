import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Shuffle, DollarSign, Calendar, Target, TrendingUp, Star, Gift, Coffee, Wallet } from 'lucide-react';

interface Challenge {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  totalSavings: number;
  weeklyGoal: number;
  category: string;
  icon: React.ReactNode;
  rules: string[];
  tips: string[];
  milestones: { week: number; amount: number; reward: string }[];
}

const MoneySavingChallengeGenerator: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [weeklyProgress, setWeeklyProgress] = useState<number[]>([]);

  const challenges: Challenge[] = [
    {
      id: '52week',
      name: '52-Week Challenge',
      description: 'Save $1 the first week, $2 the second week, and so on for 52 weeks',
      duration: '52 weeks',
      difficulty: 'Medium',
      totalSavings: 1378,
      weeklyGoal: 26.5,
      category: 'Classic',
      icon: <Calendar className="w-5 h-5" />,
      rules: [
        'Week 1: Save $1',
        'Week 2: Save $2',
        'Continue increasing by $1 each week',
        'Week 52: Save $52'
      ],
      tips: [
        'Start in January for best results',
        'Use a dedicated savings jar or account',
        'Set weekly reminders on your phone',
        'Consider doing it backwards (start with $52)'
      ],
      milestones: [
        { week: 13, amount: 91, reward: 'Treat yourself to a nice coffee' },
        { week: 26, amount: 351, reward: 'Buy a book or small gadget' },
        { week: 39, amount: 780, reward: 'Plan a weekend getaway' },
        { week: 52, amount: 1378, reward: 'Major purchase or vacation!' }
      ]
    },
    {
      id: 'penny',
      name: 'Penny Challenge',
      description: 'Save 1 penny on day 1, 2 pennies on day 2, doubling your way to $655',
      duration: '31 days',
      difficulty: 'Hard',
      totalSavings: 655.35,
      weeklyGoal: 150,
      category: 'Exponential',
      icon: <TrendingUp className="w-5 h-5" />,
      rules: [
        'Day 1: Save $0.01',
        'Day 2: Save $0.02',
        'Double the amount each day',
        'Day 31: Save $10.74 million (simplified to $655 total)'
      ],
      tips: [
        'This gets expensive quickly - be prepared',
        'Consider stopping at day 20 for $5.24',
        'Great for teaching exponential growth',
        'Use a calculator to track daily amounts'
      ],
      milestones: [
        { week: 1, amount: 1.27, reward: 'You\'re off to a great start!' },
        { week: 2, amount: 40.95, reward: 'Halfway there - keep going!' },
        { week: 3, amount: 327.67, reward: 'Amazing progress!' },
        { week: 4, amount: 655.35, reward: 'Challenge completed!' }
      ]
    },
    {
      id: 'roundup',
      name: 'Round-Up Challenge',
      description: 'Round up every purchase to the nearest dollar and save the difference',
      duration: '12 months',
      difficulty: 'Easy',
      totalSavings: 600,
      weeklyGoal: 11.5,
      category: 'Automatic',
      icon: <Coffee className="w-5 h-5" />,
      rules: [
        'Purchase for $4.23 → Save $0.77',
        'Purchase for $15.67 → Save $0.33',
        'Round up every single transaction',
        'Transfer rounded amount to savings'
      ],
      tips: [
        'Use apps like Acorns or Qapital for automation',
        'Track manually with a notebook initially',
        'Average person saves $50-60 per month',
        'Works best with frequent small purchases'
      ],
      milestones: [
        { week: 13, amount: 150, reward: 'Nice dinner out' },
        { week: 26, amount: 300, reward: 'New clothing item' },
        { week: 39, amount: 450, reward: 'Electronics purchase' },
        { week: 52, amount: 600, reward: 'Weekend trip!' }
      ]
    },
    {
      id: 'noSpend',
      name: 'No-Spend Month',
      description: 'Only spend on essentials (rent, groceries, utilities) for 30 days',
      duration: '30 days',
      difficulty: 'Hard',
      totalSavings: 800,
      weeklyGoal: 200,
      category: 'Lifestyle',
      icon: <Wallet className="w-5 h-5" />,
      rules: [
        'Essentials only: rent, utilities, groceries',
        'No dining out, entertainment, or shopping',
        'Use what you already have',
        'Find free activities for fun'
      ],
      tips: [
        'Plan meals from pantry items',
        'Explore free local events',
        'Use library for books and movies',
        'Practice gratitude for what you have'
      ],
      milestones: [
        { week: 1, amount: 200, reward: 'You\'re doing great!' },
        { week: 2, amount: 400, reward: 'Halfway milestone reached!' },
        { week: 3, amount: 600, reward: 'So close to the finish!' },
        { week: 4, amount: 800, reward: 'Challenge mastered!' }
      ]
    },
    {
      id: 'weather',
      name: 'Weather Savings',
      description: 'Save money based on daily temperature - the higher the temp, the more you save',
      duration: '12 months',
      difficulty: 'Easy',
      totalSavings: 1095,
      weeklyGoal: 21,
      category: 'Fun',
      icon: <Star className="w-5 h-5" />,
      rules: [
        'Check daily high temperature',
        'Save that amount in cents',
        '75°F = Save $0.75',
        'Negative temps = $1 minimum'
      ],
      tips: [
        'Use weather app for daily tracking',
        'Summer months will be higher savings',
        'Winter provides easier saving days',
        'Great conversation starter!'
      ],
      milestones: [
        { week: 13, amount: 275, reward: 'Spring shopping spree' },
        { week: 26, amount: 550, reward: 'Summer vacation fund' },
        { week: 39, amount: 825, reward: 'Fall wardrobe update' },
        { week: 52, amount: 1095, reward: 'Holiday celebration!' }
      ]
    },
    {
      id: 'habit',
      name: 'Bad Habit Jar',
      description: 'Save money every time you do a bad habit you\'re trying to break',
      duration: '12 months',
      difficulty: 'Medium',
      totalSavings: 520,
      weeklyGoal: 10,
      category: 'Self-Improvement',
      icon: <Gift className="w-5 h-5" />,
      rules: [
        'Choose a bad habit (swearing, nail biting, etc.)',
        'Set a penalty amount ($1-5)',
        'Pay immediately when you slip up',
        'Use the money for something positive'
      ],
      tips: [
        'Start with smaller penalty amounts',
        'Be honest with yourself',
        'Track frequency to see improvement',
        'Reward progress with the saved money'
      ],
      milestones: [
        { week: 13, amount: 130, reward: 'Spa day or massage' },
        { week: 26, amount: 260, reward: 'New hobby equipment' },
        { week: 39, amount: 390, reward: 'Professional development course' },
        { week: 52, amount: 520, reward: 'Celebrate your new habits!' }
      ]
    }
  ];

  const generateRandomChallenge = () => {
    let availableChallenges = challenges;
    
    if (selectedDifficulty !== 'all') {
      availableChallenges = availableChallenges.filter(c => c.difficulty === selectedDifficulty);
    }
    
    if (selectedDuration !== 'all') {
      const durationMap: Record<string, string[]> = {
        'short': ['30 days', '31 days'],
        'medium': ['12 months'],
        'long': ['52 weeks']
      };
      const targetDurations = durationMap[selectedDuration] || [];
      if (targetDurations.length > 0) {
        availableChallenges = availableChallenges.filter(c => targetDurations.includes(c.duration));
      }
    }

    if (availableChallenges.length === 0) {
      availableChallenges = challenges; // Fallback to all challenges
    }

    const randomChallenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
    setCurrentChallenge(randomChallenge);
    
    // Generate sample weekly progress data
    const weeks = Math.ceil(parseFloat(randomChallenge.duration.split(' ')[0]) / 7);
    const progressData = Array.from({ length: Math.min(weeks, 52) }, (_, i) => {
      const baseAmount = (randomChallenge.totalSavings / weeks) * (i + 1);
      const variation = baseAmount * 0.1 * (Math.random() - 0.5);
      return Math.max(0, baseAmount + variation);
    });
    setWeeklyProgress(progressData);
  };

  const chartData = weeklyProgress.map((amount, index) => ({
    week: index + 1,
    savings: Math.round(amount),
    target: Math.round((currentChallenge?.totalSavings || 0) * (index + 1) / weeklyProgress.length)
  }));

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Whimsical Money-Saving Challenge Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover fun and creative ways to save money with personalized challenges that make building wealth enjoyable and rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Challenge Generator */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shuffle className="w-5 h-5" />
                  Generate Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Duration Preference</label>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Duration</SelectItem>
                      <SelectItem value="short">Short (1 month)</SelectItem>
                      <SelectItem value="medium">Medium (3-6 months)</SelectItem>
                      <SelectItem value="long">Long (1 year)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={generateRandomChallenge}
                  className="w-full"
                  size="lg"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Generate My Challenge
                </Button>
              </CardContent>
            </Card>

            {/* Challenge Overview */}
            {currentChallenge && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {currentChallenge.icon}
                    Your Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{currentChallenge.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{currentChallenge.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge className={getDifficultyColor(currentChallenge.difficulty)}>
                      {currentChallenge.difficulty}
                    </Badge>
                    <Badge variant="outline">{currentChallenge.duration}</Badge>
                    <Badge variant="outline">{currentChallenge.category}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        ${currentChallenge.totalSavings.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">Total Savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        ${currentChallenge.weeklyGoal.toFixed(0)}
                      </div>
                      <div className="text-sm text-gray-500">Avg/Week</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Challenge Details */}
          <div className="lg:col-span-2 space-y-6">
            {currentChallenge ? (
              <>
                {/* Progress Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Projected Savings Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="week" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, '']} />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="savings" 
                            stroke="#10b981" 
                            strokeWidth={3}
                            name="Actual Savings"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="target" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="Target Goal"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Challenge Rules */}
                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Challenge Rules
                        </h4>
                        <ul className="space-y-2">
                          {currentChallenge.rules.map((rule, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <span className="text-blue-500 font-semibold">{index + 1}.</span>
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Success Tips
                        </h4>
                        <ul className="space-y-2">
                          {currentChallenge.tips.map((tip, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <span className="text-green-500">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Milestones */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="w-5 h-5" />
                      Reward Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentChallenge.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-sm">{milestone.week}</span>
                            </div>
                            <div>
                              <div className="font-semibold">${milestone.amount.toLocaleString()}</div>
                              <div className="text-sm text-gray-600">Week {milestone.week}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-green-600">{milestone.reward}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Shuffle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready for a Challenge?</h3>
                  <p className="text-gray-500 mb-6">
                    Click "Generate My Challenge" to discover a fun way to boost your savings!
                  </p>
                  <Button onClick={generateRandomChallenge}>
                    <Shuffle className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneySavingChallengeGenerator;