import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown,
  CreditCard, 
  Clock, 
  Target,
  AlertTriangle,
  CheckCircle,
  Info,
  DollarSign,
  Calendar,
  Shield
} from "lucide-react";
import { SEO } from "@/components/SEO";

interface CreditFactor {
  name: string;
  weight: number;
  currentValue: string;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  description: string;
  improvement: string;
}

interface SimulationScenario {
  id: string;
  action: string;
  impact: number;
  description: string;
  timeframe: string;
  type: 'positive' | 'negative';
}

export default function CreditScoreSimulator() {
  const [currentScore, setCurrentScore] = useState(756);
  const [utilization, setUtilization] = useState(32);
  const [onTimePayments, setOnTimePayments] = useState(98);
  const [creditAge, setCreditAge] = useState(76); // months
  const [hardInquiries, setHardInquiries] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const [simulatedScore, setSimulatedScore] = useState(756);
  const [activeTab, setActiveTab] = useState('current');
  
  // Interactive scenario states
  const [newUtilization, setNewUtilization] = useState(utilization);
  const [newPaymentHistory, setNewPaymentHistory] = useState(onTimePayments);
  const [newInquiries, setNewInquiries] = useState(hardInquiries);
  const [creditLimitIncrease, setCreditLimitIncrease] = useState(0);
  const [payoffAmount, setPayoffAmount] = useState(0);
  const [totalCreditLimit, setTotalCreditLimit] = useState(15000);
  const [currentBalance, setCurrentBalance] = useState(4800);

  const creditFactors: CreditFactor[] = [
    {
      name: "Payment History",
      weight: 35,
      currentValue: `${onTimePayments}% on-time`,
      status: onTimePayments >= 95 ? 'excellent' : onTimePayments >= 85 ? 'good' : onTimePayments >= 70 ? 'fair' : 'poor',
      description: "On-time payments are critical. Even one missed payment can drop your score.",
      improvement: "Set up automatic payments and payment reminders"
    },
    {
      name: "Credit Utilization",
      weight: 30,
      currentValue: `${utilization}%`,
      status: utilization <= 10 ? 'excellent' : utilization <= 30 ? 'good' : utilization <= 50 ? 'fair' : 'poor',
      description: "The amount of credit you're using vs. your total credit limit. Keep it below 30%.",
      improvement: "Pay down balances to under 30%, ideally below 10%"
    },
    {
      name: "Length of Credit History",
      weight: 15,
      currentValue: `${Math.floor(creditAge / 12)} years, ${creditAge % 12} months`,
      status: creditAge >= 84 ? 'excellent' : creditAge >= 60 ? 'good' : creditAge >= 36 ? 'fair' : 'poor',
      description: "The longer your history, the better. Age matters.",
      improvement: "Keep older accounts open and avoid closing your oldest cards"
    },
    {
      name: "Credit Mix",
      weight: 10,
      currentValue: "Very Good",
      status: 'good',
      description: "Variety helps — revolving credit (cards) and installment credit (loans).",
      improvement: "Consider adding different types of credit responsibly"
    },
    {
      name: "New Credit Inquiries",
      weight: 10,
      currentValue: `${hardInquiries} in 6 months`,
      status: hardInquiries === 0 ? 'excellent' : hardInquiries <= 2 ? 'good' : hardInquiries <= 4 ? 'fair' : 'poor',
      description: "Hard credit pulls lower your score temporarily. Avoid too many in short time.",
      improvement: "Only apply for credit when necessary"
    }
  ];

  // Calculate credit score based on factors
  const calculateCreditScore = (
    paymentHistory: number,
    utilization: number,
    creditAge: number,
    inquiries: number,
    creditMix = 8 // Default good credit mix score out of 10
  ) => {
    let score = 300; // Base score
    
    // Payment History (35% weight) - 245 points possible
    const paymentScore = (paymentHistory / 100) * 245;
    score += paymentScore;
    
    // Credit Utilization (30% weight) - 210 points possible
    let utilizationScore = 0;
    if (utilization <= 10) utilizationScore = 210;
    else if (utilization <= 30) utilizationScore = 168; // 80% of 210
    else if (utilization <= 50) utilizationScore = 126; // 60% of 210
    else if (utilization <= 70) utilizationScore = 84;  // 40% of 210
    else utilizationScore = 42; // 20% of 210
    score += utilizationScore;
    
    // Credit History Length (15% weight) - 105 points possible
    let ageScore = Math.min(105, (creditAge / 120) * 105); // 10 years = full points
    score += ageScore;
    
    // Credit Mix (10% weight) - 70 points possible
    const mixScore = (creditMix / 10) * 70;
    score += mixScore;
    
    // New Credit Inquiries (10% weight) - 70 points possible
    let inquiryScore = Math.max(0, 70 - (inquiries * 15)); // Each inquiry = -15 points
    score += inquiryScore;
    
    return Math.round(Math.max(300, Math.min(850, score)));
  };

  const scenarios: SimulationScenario[] = [
    {
      id: 'paydown',
      action: 'Pay down all credit cards to 10% utilization',
      impact: 32,
      description: 'Reducing utilization from 32% to 10% significantly improves your score',
      timeframe: '1-2 months',
      type: 'positive'
    },
    {
      id: 'missed_payment',
      action: 'Miss one payment this month',
      impact: -85,
      description: 'Missing payments has severe impact on your credit score',
      timeframe: 'Immediate',
      type: 'negative'
    },
    {
      id: 'new_card',
      action: 'Open a new credit card account',
      impact: -10,
      description: 'Hard inquiry and reduced average account age',
      timeframe: '1-3 months',
      type: 'negative'
    },
    {
      id: 'limit_increase',
      action: 'Increase credit limit by $5,000 (without spending)',
      impact: 15,
      description: 'Lower utilization ratio without changing spending',
      timeframe: '1-2 months',
      type: 'positive'
    },
    {
      id: 'close_oldest',
      action: 'Close oldest credit card',
      impact: -20,
      description: 'Reduces average account age and available credit',
      timeframe: '3-6 months',
      type: 'negative'
    },
    {
      id: 'dispute_error',
      action: 'Dispute and remove negative error',
      impact: 37,
      description: 'Removing inaccurate negative items can boost score significantly',
      timeframe: '2-3 months',
      type: 'positive'
    }
  ];

  const getScoreRating = (score: number) => {
    if (score >= 800) return { rating: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (score >= 740) return { rating: 'Very Good', color: 'text-blue-600', bgColor: 'bg-blue-50' };
    if (score >= 670) return { rating: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    if (score >= 580) return { rating: 'Fair', color: 'text-orange-600', bgColor: 'bg-orange-50' };
    return { rating: 'Poor', color: 'text-red-600', bgColor: 'bg-red-50' };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'good': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'fair': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'poor': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'fair': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Real-time calculation of simulated score
  useEffect(() => {
    if (activeTab === 'simulator') {
      const newScore = calculateCreditScore(
        newPaymentHistory,
        newUtilization,
        creditAge,
        newInquiries
      );
      setSimulatedScore(newScore);
    }
  }, [newUtilization, newPaymentHistory, newInquiries, creditAge, activeTab]);

  // Update current score based on factors
  useEffect(() => {
    const score = calculateCreditScore(onTimePayments, utilization, creditAge, hardInquiries);
    setCurrentScore(score);
  }, [utilization, onTimePayments, creditAge, hardInquiries]);

  const handleScenarioSelect = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      const newScore = Math.max(300, Math.min(850, currentScore + scenario.impact));
      setSimulatedScore(newScore);
    } else {
      setSimulatedScore(currentScore);
    }
  };

  const calculatePayoffImpact = () => {
    const newBalance = Math.max(0, currentBalance - payoffAmount);
    const newUtil = Math.round((newBalance / totalCreditLimit) * 100);
    setNewUtilization(newUtil);
  };

  const calculateLimitIncreaseImpact = () => {
    const newLimit = totalCreditLimit + creditLimitIncrease;
    const newUtil = Math.round((currentBalance / newLimit) * 100);
    setNewUtilization(newUtil);
  };

  const resetSimulator = () => {
    setNewUtilization(utilization);
    setNewPaymentHistory(onTimePayments);
    setNewInquiries(hardInquiries);
    setCreditLimitIncrease(0);
    setPayoffAmount(0);
  };

  const scoreRating = getScoreRating(currentScore);
  const simulatedRating = getScoreRating(simulatedScore);

  // Credit Score Gauge Component
  const CreditScoreGauge = ({ score, size = 200 }: { score: number; size?: number }) => {
    const percentage = ((score - 300) / 550) * 100;
    const strokeDasharray = `${percentage * 2.51327} 251.327`; // Circumference = 2πr where r=40
    
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r="80"
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r="80"
            stroke={score >= 740 ? "#10b981" : score >= 670 ? "#3b82f6" : score >= 580 ? "#f59e0b" : "#ef4444"}
            strokeWidth="12"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-gray-800">{score}</div>
          <div className={`text-sm font-medium ${scoreRating.color}`}>
            {getScoreRating(score).rating}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto px-4 py-6">
      <SEO 
        title="Credit Score Simulator - Understand & Improve Your Credit Score"
        description="Interactive credit score simulator to understand your score and learn how to improve it. See real-time impact of financial decisions on your credit score."
        keywords="credit score simulator, credit score calculator, improve credit score, credit utilization, payment history, credit factors"
        canonical="https://dollarmento.com/credit-score-simulator"
      />
      
      {/* Header */}
      <div className="flex items-center mb-6">
        <button 
          onClick={() => window.history.back()}
          className="mr-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <CreditCard className="h-8 w-8 text-blue-500 mr-3" />
            Credit Score Simulator
          </h1>
          <p className="text-gray-600 mt-1">Understand your score. Learn how to improve it.</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('current')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'current'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Current Score
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'simulator'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Interactive Simulator
            </button>
            <button
              onClick={() => setActiveTab('scenarios')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'scenarios'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Quick Scenarios
            </button>
          </nav>
        </div>
      </div>

      {/* Current Score Tab */}
      {activeTab === 'current' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className={`${scoreRating.bgColor} border-2`}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 text-blue-600 mr-2" />
                Your Credit Score Today
              </CardTitle>
              <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <CreditScoreGauge score={currentScore} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Adjust Your Current Factors</CardTitle>
              <CardDescription>Change these to see how they affect your score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Credit Utilization: {utilization}%</Label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={utilization}
                  onChange={(e) => setUtilization(Number(e.target.value))}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <Label>On-Time Payments: {onTimePayments}%</Label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={onTimePayments}
                  onChange={(e) => setOnTimePayments(Number(e.target.value))}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <Label>Hard Inquiries (last 6 months): {hardInquiries}</Label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={hardInquiries}
                  onChange={(e) => setHardInquiries(Number(e.target.value))}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>

              <div>
                <Label>Credit History Age: {Math.floor(creditAge / 12)} years, {creditAge % 12} months</Label>
                <input
                  type="range"
                  min="6"
                  max="240"
                  value={creditAge}
                  onChange={(e) => setCreditAge(Number(e.target.value))}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>6mo</span>
                  <span>10yr</span>
                  <span>20yr</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Interactive Simulator Tab */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Calculator className="h-5 w-5 text-purple-600 mr-2" />
                  Interactive Simulator
                </span>
                <Button onClick={resetSimulator} variant="outline" size="sm">
                  Reset
                </Button>
              </CardTitle>
              <CardDescription>
                Experiment with different scenarios and see real-time impact
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">💳 Credit Card Payoff</h4>
                <div className="space-y-3">
                  <div>
                    <Label>Current Balance: ${currentBalance.toLocaleString()}</Label>
                    <Input
                      type="number"
                      value={currentBalance}
                      onChange={(e) => setCurrentBalance(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Total Credit Limit: ${totalCreditLimit.toLocaleString()}</Label>
                    <Input
                      type="number"
                      value={totalCreditLimit}
                      onChange={(e) => setTotalCreditLimit(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Pay Off Amount: ${payoffAmount.toLocaleString()}</Label>
                    <Input
                      type="number"
                      value={payoffAmount}
                      onChange={(e) => setPayoffAmount(Number(e.target.value))}
                      className="mt-1"
                      placeholder="0"
                    />
                    <Button onClick={calculatePayoffImpact} className="w-full mt-2" size="sm">
                      Calculate Impact
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">📈 Credit Limit Increase</h4>
                <div className="space-y-3">
                  <div>
                    <Label>Additional Credit Limit: ${creditLimitIncrease.toLocaleString()}</Label>
                    <Input
                      type="number"
                      value={creditLimitIncrease}
                      onChange={(e) => setCreditLimitIncrease(Number(e.target.value))}
                      className="mt-1"
                      placeholder="0"
                    />
                    <Button onClick={calculateLimitIncreaseImpact} className="w-full mt-2" size="sm">
                      Calculate Impact
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">⚠️ Negative Actions</h4>
                <div className="space-y-3">
                  <div>
                    <Label>New Hard Inquiries: {newInquiries}</Label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={newInquiries}
                      onChange={(e) => setNewInquiries(Number(e.target.value))}
                      className="w-full mt-2"
                    />
                  </div>
                  <div>
                    <Label>Payment History: {newPaymentHistory}%</Label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={newPaymentHistory}
                      onChange={(e) => setNewPaymentHistory(Number(e.target.value))}
                      className="w-full mt-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Simulated Result</CardTitle>
              <CardDescription>
                Your potential new credit score
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center">
                <CreditScoreGauge score={simulatedScore} size={180} />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Current Score:</span>
                    <div className="font-bold text-lg">{currentScore}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Simulated Score:</span>
                    <div className="font-bold text-lg">{simulatedScore}</div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Change:</span>
                    <div className={`font-bold text-lg flex items-center ${
                      simulatedScore > currentScore ? 'text-green-600' : 
                      simulatedScore < currentScore ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {simulatedScore > currentScore && <TrendingUp className="h-4 w-4 mr-1" />}
                      {simulatedScore < currentScore && <TrendingDown className="h-4 w-4 mr-1" />}
                      {simulatedScore > currentScore ? '+' : ''}{simulatedScore - currentScore} points
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Current Factors:</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Utilization:</span>
                    <span>{newUtilization}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment History:</span>
                    <span>{newPaymentHistory}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hard Inquiries:</span>
                    <span>{newInquiries}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Scenarios Tab */}
      {activeTab === 'scenarios' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 text-purple-600 mr-2" />
                Quick Scenarios
              </CardTitle>
              <CardDescription>
                See instant impact of common credit actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>How would your score change if...</Label>
                <select 
                  className="w-full mt-1 p-2 border rounded-md"
                  value={selectedScenario}
                  onChange={(e) => handleScenarioSelect(e.target.value)}
                >
                  <option value="">Select a scenario</option>
                  {scenarios.map((scenario) => (
                    <option key={scenario.id} value={scenario.id}>
                      {scenario.action}
                    </option>
                  ))}
                </select>
              </div>

              {selectedScenario && (
                <div className="space-y-3">
                  {scenarios.filter(s => s.id === selectedScenario).map((scenario) => (
                    <Alert key={scenario.id} className={`border-2 ${scenario.type === 'positive' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                      {scenario.type === 'positive' ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />}
                      <AlertDescription>
                        <div className="font-semibold">
                          {scenario.type === 'positive' ? 'Score Increase:' : 'Score Decrease:'} {Math.abs(scenario.impact)} points
                        </div>
                        <div className="text-sm mt-1">{scenario.description}</div>
                        <div className="text-xs text-gray-600 mt-1">Timeframe: {scenario.timeframe}</div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scenario Result</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <CreditScoreGauge score={simulatedScore} size={180} />
              {selectedScenario && (
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    {simulatedScore > currentScore ? <TrendingUp className="h-5 w-5 text-green-500 mr-2" /> : <TrendingDown className="h-5 w-5 text-red-500 mr-2" />}
                    <span className={`font-semibold ${simulatedScore > currentScore ? 'text-green-600' : 'text-red-600'}`}>
                      {simulatedScore > currentScore ? '+' : ''}{simulatedScore - currentScore} points
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {currentScore} → {simulatedScore}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Credit Factors */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="h-5 w-5 text-blue-600 mr-2" />
            What Affects Your Credit Score?
          </CardTitle>
          <CardDescription>
            These five key factors determine your credit score
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {creditFactors.map((factor, index) => (
              <Card key={index} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <div className="flex items-center mb-1">
                      {getStatusIcon(factor.status)}
                      <span className="ml-2 font-medium">{factor.name}</span>
                    </div>
                    <Badge className={getStatusColor(factor.status)}>
                      {factor.weight}% Weight
                    </Badge>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{factor.currentValue}</div>
                    <Badge className={`${getStatusColor(factor.status)} text-xs`}>
                      {factor.status.charAt(0).toUpperCase() + factor.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {factor.description}
                  </div>
                  <div className="text-sm text-blue-600">
                    💡 {factor.improvement}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>



      {/* Improvement Roadmap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 text-orange-600 mr-2" />
              Short-Term Actions (1-3 Months)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start">
                <DollarSign className="h-5 w-5 text-green-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold">Pay Down High-Interest Cards</h4>
                  <p className="text-sm text-gray-600">Prioritize reducing balances with high APRs first</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold">Dispute Report Errors</h4>
                  <p className="text-sm text-gray-600">Download free credit reports from all 3 bureaus</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-purple-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold">Set Up Automatic Payments</h4>
                  <p className="text-sm text-gray-600">Avoid late payments with autopay</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
              Long-Term Actions (6+ Months)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold">Build Strong Payment History</h4>
                  <p className="text-sm text-gray-600">Consistency is key for long-term growth</p>
                </div>
              </div>
              <div className="flex items-start">
                <CreditCard className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold">Request Credit Line Increases</h4>
                  <p className="text-sm text-gray-600">Periodic increases to reduce utilization</p>
                </div>
              </div>
              <div className="flex items-start">
                <Target className="h-5 w-5 text-purple-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold">Diversify Credit Portfolio</h4>
                  <p className="text-sm text-gray-600">Add different types of credit responsibly</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Why Credit Score Matters */}
      <Card>
        <CardHeader>
          <CardTitle>Why Your Credit Score Matters</CardTitle>
          <CardDescription>
            Understanding the real-world impact of your credit score
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
              <span className="text-sm">Loan and mortgage approval</span>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-sm">Better interest rates</span>
            </div>
            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
              <span className="text-sm">Higher credit limits</span>
            </div>
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-yellow-500 mr-3" />
              <span className="text-sm">Employment background checks</span>
            </div>
            <div className="flex items-center p-3 bg-orange-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-orange-500 mr-3" />
              <span className="text-sm">Rental applications</span>
            </div>
            <div className="flex items-center p-3 bg-red-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-red-500 mr-3" />
              <span className="text-sm">Insurance premiums</span>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}