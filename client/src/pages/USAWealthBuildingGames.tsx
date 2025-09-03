import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { SEO } from '../components/SEO';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  Target, 
  Brain,
  Users,
  CreditCard,
  PiggyBank,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Rocket,
  BarChart3,
  Calendar,
  Edit3,
  Check,
  X
} from 'lucide-react';

// Optimized compound growth calculation using simplified math
const calculateGrowth = (principal: number, monthlyContribution: number, annualRate: number, months: number): number[] => {
  const results = [principal];
  let currentValue = principal;
  const monthlyRate = annualRate / 12;
  
  for (let month = 1; month <= months; month++) {
    currentValue = (currentValue + monthlyContribution) * (1 + monthlyRate);
    results.push(currentValue);
  }
  
  return results;
};

// 5-Year Financial Simulation Component
const FiveYearSimulation = ({ strategy, baseIncome }: { strategy: any; baseIncome: number }) => {
  const [selectedYear, setSelectedYear] = useState(1);
  
  // Strategy-specific parameters
  const getSimulationData = () => {
    const years = 5;
    const months = years * 12;
    
    switch (strategy.id) {
      case 'systematic':
        return {
          monthlyInvestment: 800,
          monthlySavings: 500,
          monthlyExpenses: 2900,
          investmentReturn: 0.10, // 10% annual
          savingsReturn: 0.045, // 4.5% high-yield savings
          salaryGrowth: 0.06, // 6% annual raises
          debtAccumulation: 0,
          creditScore: [650, 680, 710, 740, 750],
          lifestyle: 'Modest but improving',
          stressLevel: 'Low',
        };
      case 'social':
        return {
          monthlyInvestment: 0,
          monthlySavings: 0,
          monthlyExpenses: 4400, // Higher due to lifestyle inflation
          investmentReturn: 0,
          savingsReturn: 0,
          salaryGrowth: 0.04, // Slower growth due to debt stress
          debtAccumulation: 200, // Monthly debt accumulation
          creditScore: [650, 620, 580, 560, 540],
          lifestyle: 'High initially, declining',
          stressLevel: 'High',
        };
      case 'ascetic':
        return {
          monthlyInvestment: 2700,
          monthlySavings: 0, // All goes to investment
          monthlyExpenses: 1500,
          investmentReturn: 0.10,
          savingsReturn: 0,
          salaryGrowth: 0.05, // Moderate growth, less networking
          debtAccumulation: 0,
          creditScore: [650, 700, 720, 740, 760],
          lifestyle: 'Minimal but financially secure',
          stressLevel: 'Medium (social isolation)',
        };
      case 'credit':
        return {
          monthlyInvestment: 1000,
          monthlySavings: 0,
          monthlyExpenses: 3200,
          investmentReturn: 0.10,
          savingsReturn: 0,
          salaryGrowth: 0.07, // Good growth if managed well
          debtAccumulation: 150, // Moderate debt if not careful
          creditScore: [650, 720, 750, 780, 800], // If managed well
          lifestyle: 'High quality',
          stressLevel: 'Medium-High (debt risk)',
        };
      default:
        return {
          monthlyInvestment: 0,
          monthlySavings: 0,
          monthlyExpenses: 4200,
          investmentReturn: 0,
          savingsReturn: 0,
          salaryGrowth: 0.03,
          debtAccumulation: 0,
          creditScore: [650],
          lifestyle: 'Baseline',
          stressLevel: 'Medium',
        };
    }
  };

  const simData = getSimulationData();
  
  // Calculate year-by-year projections
  const yearlyProjections = [];
  let currentIncome = baseIncome;
  let totalDebt = 0;
  
  for (let year = 1; year <= 5; year++) {
    currentIncome *= (1 + simData.salaryGrowth);
    totalDebt += simData.debtAccumulation * 12;
    
    const investmentGrowth = calculateGrowth(
      year === 1 ? 0 : yearlyProjections[year - 2]?.investments || 0,
      simData.monthlyInvestment,
      simData.investmentReturn,
      12
    );
    
    const savingsGrowth = calculateGrowth(
      year === 1 ? 0 : yearlyProjections[year - 2]?.savings || 0,
      simData.monthlySavings,
      simData.savingsReturn,
      12
    );
    
    yearlyProjections.push({
      year,
      income: currentIncome,
      investments: investmentGrowth[investmentGrowth.length - 1],
      savings: savingsGrowth[savingsGrowth.length - 1],
      debt: totalDebt,
      netWorth: investmentGrowth[investmentGrowth.length - 1] + savingsGrowth[savingsGrowth.length - 1] - totalDebt,
      creditScore: simData.creditScore[year - 1] || simData.creditScore[simData.creditScore.length - 1],
      annualExpenses: simData.monthlyExpenses * 12,
    });
  }

  return (
    <div className="space-y-4">
      {/* Year-by-Year Summary */}
      <div className="grid grid-cols-5 gap-2">
        {yearlyProjections.map((proj) => (
          <Card 
            key={proj.year}
            className={`cursor-pointer transition-all ${
              selectedYear === proj.year 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:shadow-sm'
            }`}
            onClick={() => setSelectedYear(proj.year)}
          >
            <CardHeader className="pb-2 pt-3">
              <CardTitle className="text-center text-sm font-medium">Year {proj.year}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-3">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  ${Math.round(proj.netWorth / 1000)}K
                </div>
                <div className="text-xs text-gray-500">Net Worth</div>
              </div>
              <div className="space-y-1 text-xs mt-2">
                <div className="flex justify-between">
                  <span>Income:</span>
                  <span>${Math.round(proj.income / 1000)}K</span>
                </div>
                <div className="flex justify-between">
                  <span>Credit:</span>
                  <span>{proj.creditScore}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View for Selected Year */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <BarChart3 className="w-4 h-4 mr-2" />
              Year {selectedYear} Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const proj = yearlyProjections[selectedYear - 1];
              return (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">
                        ${Math.round(proj.income / 1000)}K
                      </div>
                      <div className="text-xs text-gray-600">Annual Income</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">
                        ${Math.round(proj.netWorth / 1000)}K
                      </div>
                      <div className="text-xs text-gray-600">Net Worth</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Investments:</span>
                      <span className="font-semibold text-green-600">
                        ${Math.round(proj.investments / 1000)}K
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Savings:</span>
                      <span className="font-semibold text-blue-600">
                        ${Math.round(proj.savings / 1000)}K
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Debt:</span>
                      <span className="font-semibold text-red-600">
                        ${Math.round(proj.debt / 1000)}K
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Credit Score:</span>
                      <span className="font-semibold">
                        {proj.creditScore}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Annual Expenses:</span>
                      <span className="font-semibold">
                        ${Math.round(proj.annualExpenses / 1000)}K
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Calendar className="w-4 h-4 mr-2" />
              Risk & Lifestyle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Stress Risk</span>
                  <Badge 
                    variant={
                      simData.stressLevel === 'Low' ? 'secondary' :
                      simData.stressLevel === 'Medium' ? 'default' :
                      simData.stressLevel.includes('High') ? 'destructive' : 'default'
                    }
                  >
                    {simData.stressLevel}
                  </Badge>
                </div>
                <Progress 
                  value={
                    simData.stressLevel === 'Low' ? 25 :
                    simData.stressLevel === 'Medium' ? 50 :
                    simData.stressLevel.includes('Medium-High') ? 75 : 90
                  } 
                  className="h-1.5"
                />
              </div>
              
              <div>
                <span className="text-sm font-medium">Lifestyle:</span>
                <p className="text-sm text-gray-600 mt-1">{simData.lifestyle}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2">Year {selectedYear} Milestones:</h4>
                <ul className="text-xs space-y-1 text-gray-700">
                  {strategy.id === 'systematic' && (
                    <>
                      <li>• Emergency fund: ${Math.round((simData.monthlySavings * 12 * selectedYear) / 1000)}K</li>
                      <li>• Diversified portfolio growing</li>
                      <li>• Professional development active</li>
                      {selectedYear >= 3 && <li>• Home purchase planning</li>}
                    </>
                  )}
                  {strategy.id === 'social' && (
                    <>
                      <li>• High lifestyle costs</li>
                      <li>• Credit utilization rising</li>
                      {selectedYear >= 2 && <li>• Debt consolidation needed</li>}
                      {selectedYear >= 4 && <li>• Financial stress increasing</li>}
                    </>
                  )}
                  {strategy.id === 'ascetic' && (
                    <>
                      <li>• Investment portfolio: ${Math.round(yearlyProjections[selectedYear - 1].investments / 1000)}K</li>
                      <li>• Financial independence track</li>
                      {selectedYear >= 3 && <li>• Early retirement planning</li>}
                      <li>• Social connections limited</li>
                    </>
                  )}
                  {strategy.id === 'credit' && (
                    <>
                      <li>• High credit limits available</li>
                      <li>• Leveraged growth strategy</li>
                      <li>• Constant debt management</li>
                      {selectedYear >= 3 && <li>• Debt spiral risk</li>}
                    </>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5-Year Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">5-Year Outcome Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                ${Math.round(yearlyProjections[4].netWorth / 1000)}K
              </div>
              <div className="text-xs text-gray-600">Final Net Worth</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {yearlyProjections[4].creditScore}
              </div>
              <div className="text-xs text-gray-600">Credit Score</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {Math.round(((yearlyProjections[4].netWorth / (baseIncome * 12 * 5)) * 100))}%
              </div>
              <div className="text-xs text-gray-600">Wealth ROI</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const USAWealthBuildingGames = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [customSalary, setCustomSalary] = useState<number>(4200);
  const [isEditingSalary, setIsEditingSalary] = useState(false);
  const [tempSalary, setTempSalary] = useState<string>('4200');
  
  const [customRent, setCustomRent] = useState<number>(1000);
  const [isEditingRent, setIsEditingRent] = useState(false);
  const [tempRent, setTempRent] = useState<string>('1000');
  
  const [customFamilySupport, setCustomFamilySupport] = useState<number>(300);
  const [isEditingFamilySupport, setIsEditingFamilySupport] = useState(false);
  const [tempFamilySupport, setTempFamilySupport] = useState<string>('300');

  const handleSalaryEdit = () => {
    setIsEditingSalary(true);
    setTempSalary(customSalary.toString());
  };

  const handleSalarySave = () => {
    const newSalary = parseFloat(tempSalary);
    if (!isNaN(newSalary) && newSalary > 0) {
      setCustomSalary(newSalary);
      setIsEditingSalary(false);
    }
  };

  const handleSalaryCancel = () => {
    setIsEditingSalary(false);
    setTempSalary(customSalary.toString());
  };

  const handleSalaryKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSalarySave();
    } else if (e.key === 'Escape') {
      handleSalaryCancel();
    }
  };

  // Rent editing handlers
  const handleRentEdit = () => {
    setIsEditingRent(true);
    setTempRent(customRent.toString());
  };

  const handleRentSave = () => {
    const newRent = parseFloat(tempRent);
    if (!isNaN(newRent) && newRent > 0) {
      setCustomRent(newRent);
      setIsEditingRent(false);
    }
  };

  const handleRentCancel = () => {
    setIsEditingRent(false);
    setTempRent(customRent.toString());
  };

  const handleRentKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRentSave();
    } else if (e.key === 'Escape') {
      handleRentCancel();
    }
  };

  // Family support editing handlers
  const handleFamilySupportEdit = () => {
    setIsEditingFamilySupport(true);
    setTempFamilySupport(customFamilySupport.toString());
  };

  const handleFamilySupportSave = () => {
    const newFamilySupport = parseFloat(tempFamilySupport);
    if (!isNaN(newFamilySupport) && newFamilySupport >= 0) {
      setCustomFamilySupport(newFamilySupport);
      setIsEditingFamilySupport(false);
    }
  };

  const handleFamilySupportCancel = () => {
    setIsEditingFamilySupport(false);
    setTempFamilySupport(customFamilySupport.toString());
  };

  const handleFamilySupportKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFamilySupportSave();
    } else if (e.key === 'Escape') {
      handleFamilySupportCancel();
    }
  };

  // Calculate dynamic breakdown based on custom salary and obligations
  const calculateDynamicBreakdown = (baseBreakdown: any, salaryRatio: number) => {
    const newBreakdown: any = {};
    Object.keys(baseBreakdown).forEach(key => {
      if (key === 'rent') {
        // Use custom rent value
        newBreakdown[key] = customRent;
      } else if (key === 'familySupport') {
        // Use custom family support value
        newBreakdown[key] = customFamilySupport;
      } else {
        // Scale other expenses proportionally
        newBreakdown[key] = Math.round(baseBreakdown[key] * salaryRatio);
      }
    });
    return newBreakdown;
  };

  const salaryRatio = customSalary / 4200; // Base salary ratio

  // Memoize strategies to prevent unnecessary recalculations
  const baseStrategies = useMemo(() => [
    {
      id: 'systematic',
      title: 'The Systematic Wealth Builder',
      subtitle: 'BALANCED',
      icon: <Target className="w-8 h-8" />,
      color: 'bg-blue-500',
      successRate: 85,
      description: 'Build wealth through systematic investing and disciplined spending',
      baseBreakdown: {
        emergencyFund: 500,
        familySupport: 300,
        rent: 1000,
        investment: 800,
        professionalDev: 200,
        wardrobe: 150,
        remaining: 1250
      },
      pros: [
        'Strong financial foundation',
        'Balanced approach to spending and saving',
        'Long-term wealth building potential',
        'Maintains social relationships'
      ],
      cons: [
        'Slower lifestyle improvements',
        'Requires discipline and patience',
        'May miss some social opportunities'
      ]
    },
    {
      id: 'social',
      title: 'The Social Status Seeker',
      subtitle: 'RISKY',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-orange-500',
      successRate: 15,
      description: 'Prioritize social status and immediate lifestyle upgrades',
      baseBreakdown: {
        celebration: 400,
        wardrobe: 600,
        devices: 1200,
        familySupport: 200,
        rent: 1000,
        remaining: 800
      },
      pros: [
        'Immediate social acceptance',
        'Enhanced confidence and status',
        'Better professional appearance',
        'Instant gratification'
      ],
      cons: [
        'High debt risk',
        'No emergency fund',
        'Lifestyle inflation trap',
        'Long-term financial stress'
      ]
    },
    {
      id: 'ascetic',
      title: 'The Financial Ascetic',
      subtitle: 'CONSERVATIVE',
      icon: <PiggyBank className="w-8 h-8" />,
      color: 'bg-green-500',
      successRate: 75,
      description: 'Maximum savings through extreme financial discipline',
      baseBreakdown: {
        essentials: 1300,
        survival: 200,
        savings: 2700,
        socialSpending: 0,
        upgrades: 0
      },
      pros: [
        'Highest savings rate (64%)',
        'Financial independence by 35-40',
        'Zero debt stress',
        'Maximum compound interest benefits'
      ],
      cons: [
        'Social isolation',
        'Limited career networking',
        'Missed life experiences',
        'Potential mental health impact'
      ]
    },
    {
      id: 'credit',
      title: 'The Credit Strategist',
      subtitle: 'AGGRESSIVE',
      icon: <CreditCard className="w-8 h-8" />,
      color: 'bg-purple-500',
      successRate: 12,
      description: 'Use credit optimization and leverage for wealth building',
      baseBreakdown: {
        creditLimit: 5000,
        cashKept: 3800,
        utilization: 1500,
        rewards: 400,
        interest: 0 // initially
      },
      pros: [
        'Maintains full lifestyle',
        'Builds credit history fast',
        'Earns rewards and cashback',
        'Keeps cash liquid for opportunities'
      ],
      cons: [
        'High debt risk (24.99% APR)',
        'Requires exceptional discipline',
        'Lifestyle inflation trap',
        '68% end up in debt within 1 year'
      ]
    }
  ], [customRent, customFamilySupport]); // Add dependency array for memoization

  // Memoize dynamic strategies to prevent recalculation on every render
  const strategies = useMemo(() => 
    baseStrategies.map(strategy => ({
      ...strategy,
      breakdown: calculateDynamicBreakdown(strategy.baseBreakdown, salaryRatio)
    })), [baseStrategies, salaryRatio, customRent, customFamilySupport]
  );

  const handleStrategySelect = (strategyId: string) => {
    setSelectedStrategy(strategyId);
    setGameStarted(true);
    setCurrentStep(1);
  };

  const resetGame = () => {
    setSelectedStrategy(null);
    setGameStarted(false);
    setCurrentStep(0);
  };

  const getStrategyById = (id: string) => strategies.find(s => s.id === id);

  if (!gameStarted) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <Rocket className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              First Salary Reality Matrix
            </h1>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center mb-3">
              <DollarSign className="w-6 h-6 text-green-600 mr-2" />
              {isEditingSalary ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={tempSalary}
                    onChange={(e) => setTempSalary(e.target.value)}
                    onKeyDown={handleSalaryKeyPress}
                    className="w-24 text-2xl font-bold text-center border-2 border-yellow-400 bg-yellow-50"
                    autoFocus
                    min="1000"
                    max="50000"
                  />
                  <Button size="sm" onClick={handleSalarySave} className="bg-green-600 hover:bg-green-700">
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleSalaryCancel}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">${customSalary.toLocaleString()}</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={handleSalaryEdit}
                    className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <span className="text-sm text-gray-600 ml-2">• Month 1, Day 1</span>
            </div>
            <p className="text-base text-gray-700 leading-relaxed">
              Your first salary decision creates ripple effects for the next 40 years. 
              Financial habits formed in the first 90 days persist for decades.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-red-700 text-lg">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Obligations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span>Rent (Due in 3 days):</span>
                {isEditingRent ? (
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={tempRent}
                      onChange={(e) => setTempRent(e.target.value)}
                      onKeyDown={handleRentKeyPress}
                      className="w-20 text-sm font-semibold text-right border-2 border-yellow-400 bg-yellow-50"
                      autoFocus
                      min="0"
                      max="5000"
                    />
                    <Button size="sm" onClick={handleRentSave} className="bg-green-600 hover:bg-green-700 p-1">
                      <Check className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleRentCancel} className="p-1">
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">${customRent.toLocaleString()}</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={handleRentEdit}
                      className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 p-1"
                    >
                      <Edit3 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span>Family Support:</span>
                {isEditingFamilySupport ? (
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={tempFamilySupport}
                      onChange={(e) => setTempFamilySupport(e.target.value)}
                      onKeyDown={handleFamilySupportKeyPress}
                      className="w-20 text-sm font-semibold text-right border-2 border-yellow-400 bg-yellow-50"
                      autoFocus
                      min="0"
                      max="2000"
                    />
                    <Button size="sm" onClick={handleFamilySupportSave} className="bg-green-600 hover:bg-green-700 p-1">
                      <Check className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleFamilySupportCancel} className="p-1">
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">${customFamilySupport.toLocaleString()}</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={handleFamilySupportEdit}
                      className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 p-1"
                    >
                      <Edit3 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <span>401K (Auto 10%):</span>
                <span className="font-semibold">${Math.round(customSalary * 0.1).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-blue-700 text-lg">
                <Target className="w-4 h-4 mr-2" />
                Key Facts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <div>• Age 24 (41 years to retirement)</div>
              <div>• No savings or credit history</div>
              <div>• Inflation 3.2%, Savings 4.5%</div>
              <div>• Only income source</div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Choose Your Financial Strategy
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Your decision determines your next 40 years of financial outcomes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {strategies.map((strategy) => (
            <Card 
              key={strategy.id}
              className="hover:shadow-md transition-all cursor-pointer group border-2 hover:border-blue-200"
              onClick={() => handleStrategySelect(strategy.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${strategy.color} rounded-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform`}>
                    {strategy.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base leading-tight">{strategy.title}</CardTitle>
                    <Badge 
                      variant={strategy.subtitle === 'BALANCED' ? 'default' : 
                              strategy.subtitle === 'RISKY' ? 'destructive' :
                              strategy.subtitle === 'CONSERVATIVE' ? 'secondary' : 'outline'}
                      className="mt-1"
                    >
                      {strategy.subtitle}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{strategy.description}</p>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Success Rate</span>
                    <span className="font-medium">{strategy.successRate}%</span>
                  </div>
                  <Progress value={strategy.successRate} className="h-1.5" />
                </div>
                <Button className="w-full" size="sm" variant="outline">
                  Select Strategy
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Alert className="mt-6">
          <Brain className="h-4 w-4" />
          <AlertDescription className="text-sm">
            This simulation uses real financial data and behavioral patterns from thousands of young professionals.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const selectedStrat = getStrategyById(selectedStrategy!);
  
  return (
    <>
      <SEO 
        title="USA Wealth Building Games - Interactive Financial Learning & Investment Simulation"
        description="Master wealth building through interactive financial games and simulations. Learn investment strategies, budgeting, retirement planning, and financial decision-making skills."
        keywords="wealth building games, financial literacy games, investment simulation, money management games, financial education games, budget planning games, retirement planning simulation"
        canonical="https://dollarmento.com/usa-wealth-building-games"
      />
      <div className="container mx-auto px-4 py-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Strategy Simulation</h1>
          <p className="text-sm text-gray-600">Path: {selectedStrat?.title}</p>
        </div>
        <Button onClick={resetGame} variant="outline" size="sm">
          Try Different Path
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
          <TabsTrigger value="breakdown" className="text-sm">Budget</TabsTrigger>
          <TabsTrigger value="outcomes" className="text-sm">Outcomes</TabsTrigger>
          <TabsTrigger value="simulation" className="text-sm">5-Year Sim</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {selectedStrat?.icon}
                  <span className="ml-2">{selectedStrat?.title}</span>
                </CardTitle>
                <CardDescription>{selectedStrat?.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Success Probability</span>
                    <span>{selectedStrat?.successRate}%</span>
                  </div>
                  <Progress value={selectedStrat?.successRate} className="h-3" />
                </div>
                <Badge 
                  variant={selectedStrat?.subtitle === 'BALANCED' ? 'default' : 
                          selectedStrat?.subtitle === 'RISKY' ? 'destructive' :
                          selectedStrat?.subtitle === 'CONSERVATIVE' ? 'secondary' : 'outline'}
                >
                  {selectedStrat?.subtitle} APPROACH
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pros & Cons Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-700 flex items-center mb-2">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Advantages
                    </h4>
                    <ul className="text-sm space-y-1">
                      {selectedStrat?.pros.map((pro, index) => (
                        <li key={index} className="text-green-600">• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 flex items-center mb-2">
                      <XCircle className="w-4 h-4 mr-1" />
                      Risks
                    </h4>
                    <ul className="text-sm space-y-1">
                      {selectedStrat?.cons.map((con, index) => (
                        <li key={index} className="text-red-600">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Month 1 Budget Allocation</CardTitle>
              <CardDescription>How your $4,200 salary would be distributed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(selectedStrat?.breakdown || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b">
                    <span className="capitalize font-medium">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="font-bold text-lg">
                      ${typeof value === 'number' ? value.toLocaleString() : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outcomes" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Best Case Scenario (1 Year)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedStrat?.id === 'systematic' && (
                    <>
                      <div>Net Worth Growth: <span className="font-bold">+$15,600</span></div>
                      <div>Investment Portfolio: <span className="font-bold">$9,600</span></div>
                      <div>Emergency Fund: <span className="font-bold">$6,000</span></div>
                      <div>Credit Score: <span className="font-bold">720+</span></div>
                    </>
                  )}
                  {selectedStrat?.id === 'social' && (
                    <>
                      <div>Social Network: <span className="font-bold">Strong</span></div>
                      <div>Career Advancement: <span className="font-bold">Possible</span></div>
                      <div>Lifestyle Quality: <span className="font-bold">High</span></div>
                      <div>Debt Level: <span className="font-bold">$2,400</span></div>
                    </>
                  )}
                  {selectedStrat?.id === 'ascetic' && (
                    <>
                      <div>Savings Rate: <span className="font-bold">64%</span></div>
                      <div>Total Saved: <span className="font-bold">$32,400</span></div>
                      <div>Investment Growth: <span className="font-bold">$35,640</span></div>
                      <div>Debt: <span className="font-bold">$0</span></div>
                    </>
                  )}
                  {selectedStrat?.id === 'credit' && (
                    <>
                      <div>Credit Score: <span className="font-bold">750+</span></div>
                      <div>Rewards Earned: <span className="font-bold">$480</span></div>
                      <div>Investments: <span className="font-bold">$45,600</span></div>
                      <div>Available Credit: <span className="font-bold">$15,000+</span></div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <TrendingDown className="w-5 h-5 mr-2" />
                  Worst Case Scenario (1 Year)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedStrat?.id === 'systematic' && (
                    <>
                      <div>Market Downturn Loss: <span className="font-bold">-$1,920</span></div>
                      <div>Job Loss Impact: <span className="font-bold">6 months covered</span></div>
                      <div>Social Isolation: <span className="font-bold">Moderate</span></div>
                      <div>Missed Opportunities: <span className="font-bold">Few</span></div>
                    </>
                  )}
                  {selectedStrat?.id === 'social' && (
                    <>
                      <div>Credit Card Debt: <span className="font-bold">$8,500</span></div>
                      <div>Interest Payments: <span className="font-bold">$2,125/year</span></div>
                      <div>Net Worth: <span className="font-bold">-$8,500</span></div>
                      <div>Financial Stress: <span className="font-bold">High</span></div>
                    </>
                  )}
                  {selectedStrat?.id === 'ascetic' && (
                    <>
                      <div>Social Isolation: <span className="font-bold">Severe</span></div>
                      <div>Career Impact: <span className="font-bold">Limited networking</span></div>
                      <div>Relationship Issues: <span className="font-bold">Possible</span></div>
                      <div>Mental Health: <span className="font-bold">Stress from restriction</span></div>
                    </>
                  )}
                  {selectedStrat?.id === 'credit' && (
                    <>
                      <div>Credit Card Debt: <span className="font-bold">$12,000</span></div>
                      <div>Interest Charges: <span className="font-bold">$2,988/year</span></div>
                      <div>Credit Score Drop: <span className="font-bold">580</span></div>
                      <div>Bankruptcy Risk: <span className="font-bold">Moderate</span></div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="simulation" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>5-Year Financial Projection</CardTitle>
                <CardDescription>Month-by-month progression based on your chosen strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <FiveYearSimulation strategy={selectedStrat!} baseIncome={customSalary} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </>
  );
};

export default USAWealthBuildingGames;