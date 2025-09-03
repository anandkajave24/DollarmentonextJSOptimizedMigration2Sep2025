import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, TrendingUp, Target, DollarSign, Users, Crown, ChevronRight, Play, BookOpen, Calculator } from "lucide-react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";

interface FinancialLevel {
  id: number;
  title: string;
  description: string;
  characteristics: string[];
  nextSteps: string[];
  color: string;
  bgColor: string;
  icon: any;
}

const financialLevels: FinancialLevel[] = [
  {
    id: 1,
    title: "Survival",
    description: "You're barely managing essentials. Bills, debts, end-of-month panic.",
    characteristics: [
      "Living paycheck to paycheck",
      "Struggling with monthly bills",
      "High debt burden",
      "No emergency savings",
      "Financial stress affects daily life"
    ],
    nextSteps: [
      "Track all expenses for one month",
      "Create a basic budget using 50/30/20 rule",
      "Build $5,000 emergency fund first",
      "Focus on reducing high-interest debt"
    ],
    color: "text-red-600",
    bgColor: "bg-red-50",
    icon: DollarSign
  },
  {
    id: 2,
    title: "Stability",
    description: "You've started saving. Expenses are under control.",
    characteristics: [
      "Monthly expenses under control",
      "Some savings accumulated",
      "Emergency fund building up",
      "Debt manageable or reducing",
      "Can handle minor financial surprises"
    ],
    nextSteps: [
      "Build 3-6 months emergency fund",
      "Start learning about investments",
      "Open demat account",
      "Begin with investment in index funds"
    ],
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    icon: Target
  },
  {
    id: 3,
    title: "Growth",
    description: "You're investing. Setting financial goals. Building assets.",
    characteristics: [
      "Regular investing habits established",
      "Clear financial goals set",
      "Diversified investment portfolio",
      "Understanding of risk and returns",
      "Consistent savings rate above 20%"
    ],
    nextSteps: [
      "Increase investment amounts systematically",
      "Learn about tax-saving instruments",
      "Consider real estate investments",
      "Start retirement planning seriously"
    ],
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    icon: TrendingUp
  },
  {
    id: 4,
    title: "Freedom",
    description: "Multiple income streams. Less or no financial stress.",
    characteristics: [
      "Multiple income sources",
      "Passive income generating",
      "Financial independence achievable",
      "Can take calculated risks",
      "Money anxiety significantly reduced"
    ],
    nextSteps: [
      "Optimize tax strategies",
      "Explore business opportunities",
      "Consider international investments",
      "Plan for early retirement"
    ],
    color: "text-green-600",
    bgColor: "bg-green-50",
    icon: Crown
  },
  {
    id: 5,
    title: "Impact",
    description: "You're thinking beyond yourself — giving, guiding, creating real change.",
    characteristics: [
      "Wealth exceeds personal needs",
      "Actively helping others financially",
      "Creating employment opportunities",
      "Philanthropic activities",
      "Legacy building mindset"
    ],
    nextSteps: [
      "Set up charitable foundations",
      "Mentor others in financial growth",
      "Create scalable businesses",
      "Focus on societal impact"
    ],
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    icon: Users
  }
];

const levelQuestions = [
  {
    question: "How would you describe your current financial situation?",
    options: [
      { text: "Struggling to pay bills, living paycheck to paycheck", level: 1 },
      { text: "Managing expenses, starting to save small amounts", level: 2 },
      { text: "Saving regularly and beginning to invest", level: 3 },
      { text: "Multiple income streams, investing significantly", level: 4 },
      { text: "Wealth beyond personal needs, helping others", level: 5 }
    ]
  },
  {
    question: "What's your approach to investing?",
    options: [
      { text: "Haven't started investing yet", level: 1 },
      { text: "Just learning about investments", level: 2 },
      { text: "Regular investments and building portfolio", level: 3 },
      { text: "Diversified investments across asset classes", level: 4 },
      { text: "Advanced strategies and alternative investments", level: 5 }
    ]
  },
  {
    question: "How do you handle financial emergencies?",
    options: [
      { text: "Would need to borrow money", level: 1 },
      { text: "Have some savings but not enough", level: 2 },
      { text: "Have 3-6 months emergency fund", level: 3 },
      { text: "Multiple safety nets and backup plans", level: 4 },
      { text: "Emergencies don't affect my lifestyle", level: 5 }
    ]
  }
];

export default function FinancialGrowthLevels() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'assessment' | 'results'>('intro');
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [userLevel, setUserLevel] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const calculateLevel = () => {
    const averageLevel = answers.reduce((sum, level) => sum + level, 0) / answers.length;
    const calculatedLevel = Math.round(averageLevel);
    setUserLevel(calculatedLevel);
    setCurrentStep('results');
  };

  const handleAnswerSelect = (level: number) => {
    const newAnswers = [...answers, level];
    setAnswers(newAnswers);

    if (assessmentStep < levelQuestions.length - 1) {
      setAssessmentStep(assessmentStep + 1);
    } else {
      calculateLevel();
    }
  };

  const resetAssessment = () => {
    setCurrentStep('intro');
    setAssessmentStep(0);
    setAnswers([]);
    setUserLevel(null);
    setSelectedLevel(null);
  };

  const LevelCard = ({ level, isUserLevel = false, isSelected = false }: { level: FinancialLevel; isUserLevel?: boolean; isSelected?: boolean }) => {
    const Icon = level.icon;
    return (
      <Card 
        className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
          isSelected ? 'shadow-lg' : ''
        } ${isUserLevel ? 'bg-green-50' : ''}`}
        onClick={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
      >
        <CardHeader className={`${level.bgColor} rounded-t-lg py-3 px-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-full bg-white ${level.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className={`text-base ${level.color}`}>
                  Level {level.id}: {level.title}
                  {isUserLevel && <Badge className="ml-2 bg-green-500 text-xs">Your Level</Badge>}
                </CardTitle>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
          </div>
          <p className="text-sm text-gray-600 mt-1">{level.description}</p>
        </CardHeader>

        {(isSelected || isUserLevel) && (
          <CardContent className="p-4 space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">Characteristics:</h4>
              <ul className="space-y-0.5">
                {level.characteristics.slice(0, 3).map((char, index) => (
                  <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">Next Steps:</h4>
              <ul className="space-y-0.5">
                {level.nextSteps.slice(0, 2).map((step, index) => (
                  <li key={index} className="text-xs text-blue-600 flex items-start gap-2">
                    <ArrowRight className="w-2.5 h-2.5 mt-1 flex-shrink-0" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {isUserLevel && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Recommended Actions:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Link to="/learning-hub">
                    <Button variant="outline" size="sm" className="w-full">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </Link>
                  <Link to="/financial-management">
                    <Button variant="outline" size="sm" className="w-full">
                      <Calculator className="w-4 h-4 mr-2" />
                      Use Tools
                    </Button>
                  </Link>
                  <Link to="/portfolio-tracker">
                    <Button variant="outline" size="sm" className="w-full">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Track Progress
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    );
  };

  if (currentStep === 'intro') {
    return (
      <div className="px-4 py-6">
        <SEO 
          title="Financial Growth Levels Assessment"
          description="Discover your current financial level with our interactive assessment. Get personalized roadmap from survival to financial impact with actionable next steps."
          keywords="financial assessment, financial growth levels, financial planning, money management, financial freedom, personal finance evaluation"
          canonical="https://dollarmento.com/financial-growth-levels"
        />

        <div className="mb-6">
          <h1 className="text-2xl font-bold">Financial Growth Levels</h1>
          <p className="text-lg text-red-600 font-medium mt-3">
            "If you don't know where you stand, you won't know where to go next."
          </p>
          <p className="text-lg text-blue-600 font-medium">
            Discover your financial level and create your roadmap to financial freedom.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">

          <Card className="mb-8 bg-card border shadow-md">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    Your Financial Journey Roadmap
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Just like school has classes from 1 to 12, your financial growth also happens in levels. 
                    This isn't a race - it's an honest journey with yourself.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">1</span>
                      </div>
                      <span className="text-foreground">Take a quick 3-question assessment</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">2</span>
                      </div>
                      <span className="text-foreground">Discover your current financial level</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">3</span>
                      </div>
                      <span className="text-foreground">Get personalized next steps</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Target className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Financial Growth Begins with Awareness
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Understanding where you are is the first step to building lasting wealth
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <Button 
              onClick={() => setCurrentStep('assessment')}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Financial Level Assessment
            </Button>
            <p className="text-sm text-muted-foreground">Takes less than 2 minutes</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-center text-foreground mb-4">
              Preview: Financial Growth Levels
            </h3>
            <div className="grid gap-2">
              {financialLevels.map((level) => (
                <LevelCard key={level.id} level={level} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'assessment') {
    const currentQuestion = levelQuestions[assessmentStep];
    const progress = ((assessmentStep + 1) / levelQuestions.length) * 100;

    return (
      <div className="px-4 py-6">
        <SEO 
          title="Financial Level Assessment - DollarMento"
          description="Take our quick 3-question assessment to discover your current financial level and get personalized recommendations."
          keywords="financial assessment, financial level test, money management assessment, financial planning quiz"
          canonical="https://dollarmento.com/financial-growth-levels"
        />

        <div className="mb-6">
          <h1 className="text-2xl font-bold">Financial Level Assessment</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Question {assessmentStep + 1} of {levelQuestions.length}</h2>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {currentQuestion.question}
              </h2>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full p-4 h-auto text-left justify-start hover:bg-blue-50 hover:border-blue-300"
                    onClick={() => handleAnswerSelect(option.level)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold">{String.fromCharCode(65 + index)}</span>
                      </div>
                      <span className="text-sm">{option.text}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === 'results' && userLevel) {
    const userLevelData = financialLevels[userLevel - 1];
    const nextLevel = userLevel < 5 ? financialLevels[userLevel] : null;

    return (
      <div className="px-4 py-6">
        <SEO 
          title="Your Financial Growth Level Results - DollarMento"
          description="View your personalized financial assessment results and get actionable next steps to advance to the next financial level."
          keywords="financial results, financial level assessment results, personalized financial plan, financial growth roadmap"
          canonical="https://dollarmento.com/financial-growth-levels"
        />

        <div className="mb-6">
          <h1 className="text-2xl font-bold">Your Financial Level Results</h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Level {userLevel}: {userLevelData.title}
            </h2>
            <p className="text-lg text-gray-600">
              Based on your assessment, here's where you stand and where you can go next.
            </p>
          </div>

          {/* Main Level Card */}
          <Card className={`${userLevelData.bgColor} border-2 ${userLevelData.color.replace('text-', 'border-')} mb-8`}>
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Level {userLevel}: {userLevelData.title}
                </Badge>
                <span className="text-sm font-medium text-gray-600">Your Level</span>
              </div>
              <p className="text-lg font-medium text-gray-800">{userLevelData.description}</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Characteristics:</h4>
                  <ul className="space-y-2">
                    {userLevelData.characteristics.map((char, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Next Steps:</h4>
                  <ul className="space-y-2">
                    {userLevelData.nextSteps.map((step, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 mt-1 text-blue-500 flex-shrink-0" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Recommended Actions:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Link to="/learning-hub">
                    <Button variant="outline" size="sm" className="w-full">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </Link>
                  <Link to="/financial-management">
                    <Button variant="outline" size="sm" className="w-full">
                      <Calculator className="w-4 h-4 mr-2" />
                      Use Tools
                    </Button>
                  </Link>
                  <Link to="/portfolio-tracker">
                    <Button variant="outline" size="sm" className="w-full">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Track Progress
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-green-50 border-green-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-green-700 text-xl">What You're Doing Well</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {userLevelData.characteristics.map((char, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      {char}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-700 text-xl">Next Level Goals</CardTitle>
              </CardHeader>
              <CardContent>
                {nextLevel ? (
                  <div>
                    <p className="text-sm text-gray-700 mb-4 font-medium">
                      Your next goal: <span className="font-semibold text-blue-700">
                        Level {userLevel + 1} - {nextLevel.title}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mb-3 italic">{nextLevel.description}</p>
                    <ul className="space-y-2">
                      {nextLevel.characteristics.slice(0, 3).map((char, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-3">
                          <Target className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-semibold text-blue-700 mb-3">🎉 Maximum Level Achieved!</p>
                    <p className="text-sm text-gray-700">
                      Congratulations! You've reached the highest level. Continue making impact and helping others grow financially.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4">Ready to Level Up?</h3>
              <p className="mb-6 text-blue-100">
                Use DollarMento's tools and resources to accelerate your financial growth journey.
              </p>
              <div className="grid md:grid-cols-4 gap-4">
                <Link to="/learning-hub">
                  <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Learn
                  </Button>
                </Link>
                <Link to="/financial-management">
                  <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate
                  </Button>
                </Link>
                <Link to="/portfolio-tracker">
                  <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Track
                  </Button>
                </Link>
                <Link to="/smart-financial-checklist">
                  <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    <Target className="w-4 h-4 mr-2" />
                    Organize
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Navigation */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={resetAssessment}
                variant="outline"
                className="px-6 py-3"
              >
                Retake Assessment
              </Button>
              <Link to="/dashboard">
                <Button className="px-6 py-3">
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          </div>


        </div>
      </div>
    );
  }

  return null;
}