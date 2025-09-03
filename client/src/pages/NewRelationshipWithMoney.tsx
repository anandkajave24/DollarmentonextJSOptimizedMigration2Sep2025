import { TabPills, TabItem } from "../components/ui/tab-pills";
import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { Slider } from "../components/ui/slider";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useLocation } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { SEO } from "../components/SEO";
import { useToast } from "../hooks/use-toast";

// Adding custom CSS for animations

// Helper function to get emoji based on score
const getMoodEmoji = (score: number) => {
  if (score < 0.4) return "😕";
  else if (score < 0.7) return "🙂";
  else return "🤩";
};

// Helper function to generate action plan based on responses
const getActionPlan = (responses: Record<string, number>) => {
  const actionPlans: Record<string, string[]> = {
    "spending_control": [
      "🎯 Implement 50-30-20 rule: 50% needs, 30% wants, 20% savings",
      "📝 Create a detailed spending diary with emotions tracker",
      "💰 Set up automatic alerts for category spending limits",
      "🛒 Make a shopping list before any purchase and stick to it",
      "⏰ Wait 72 hours before any purchase above $5000"
    ],
    "financial_anxiety": [
      "🧘‍♀️ Daily 10-minute money meditation focusing on abundance",
      "📊 Create an emergency fund targeting 6 months of expenses",
      "💪 List 3 financial wins daily, no matter how small",
      "📈 Schedule monthly money check-ins with yourself",
      "🎯 Break large financial goals into weekly micro-goals"
    ],
    "goal_clarity": [
      "✍️ Create vision board with specific financial milestones",
      "📅 Set 3 short-term (3 months) and 2 long-term (3 years) goals",
      "🎯 Write detailed action steps for each financial goal",
      "📊 Track progress weekly using goal achievement metrics",
      "🌟 Reward yourself for hitting financial milestones"
    ],
    "budget_adherence": [
      "📱 Set up automated expense categorization system",
      "🏦 Create separate accounts for bills, savings, and discretionary spending",
      "📝 Do weekly budget reviews every Sunday evening",
      "💸 Use cash envelope system for problem spending areas",
      "📊 Track savings rate and aim to increase by 1% monthly"
    ],
    "financial_knowledge": [
      "📚 Read one financial article daily from trusted sources",
      "💡 Practice calculating compound interest on investments",
      "🤝 Find an accountability partner for financial goals",
      "📱 Follow 3 credible financial experts on social media",
      "📈 Learn to read and understand your investment statements"
    ]
  };

  const weakAreas = Object.entries(responses)
    .filter(([_, score]) => score <= 3)
    .map(([area]) => area);

  if (weakAreas.length === 0) {
    return ["🌟 You're doing great! Keep maintaining your healthy money habits!"];
  }

  // Get one random action item from each weak area
  return weakAreas.map(area => {
    const randomIndex = Math.floor(Math.random() * actionPlans[area].length);
    return actionPlans[area][randomIndex];
  });
};

// Profile analysis based on financial health scores
const getFinancialProfile = (health: {
  financialAwareness: number;
  moneyManagement: number;
  emotionalHealth: number;
  overallScore: number;
}) => {
  // Profile types based on score combinations
  if (health.overallScore >= 4.0) {
    return {
      profileType: "Financial Master",
      description: "You have an excellent relationship with money, demonstrating strong financial awareness, effective money management, and emotional wellness around finances.",
      strengths: [
        "Advanced financial literacy and planning skills",
        "Strategic approach to money management",
        "Balanced emotional relationship with finances",
        "Goal-oriented financial decision making"
      ],
      areas_for_growth: [
        "Explore advanced wealth building strategies",
        "Consider mentoring others on financial wellness",
        "Optimize investment portfolio for long-term growth",
        "Further align financial decisions with personal values"
      ],
      recommended_resources: [
        "Advanced investment courses",
        "Estate planning education",
        "Tax optimization strategies",
        "Philanthropic financial planning"
      ]
    };
  } else if (health.overallScore >= 3.0) {
    if (health.emotionalHealth < 3.0) {
      return {
        profileType: "Anxious Achiever",
        description: "You have solid financial knowledge and management skills, but experience anxiety or stress around money matters.",
        strengths: [
          "Strong financial discipline",
          "Good planning and organization skills",
          "Proactive money management approach",
          "Attention to financial details"
        ],
        areas_for_growth: [
          "Develop healthier emotional relationship with money",
          "Practice mindful spending and financial self-compassion",
          "Balance long-term security with present enjoyment",
          "Reduce financial decision stress with automation"
        ],
        recommended_resources: [
          "Financial therapy or coaching",
          "Mindfulness practices for money management",
          "Automated savings and investment tools",
          "Regular financial check-ins with clear boundaries"
        ]
      };
    } else if (health.financialAwareness < 3.0) {
      return {
        profileType: "Intuitive Manager",
        description: "You have good emotional health around money and manage well, but could benefit from increasing your financial knowledge.",
        strengths: [
          "Healthy emotional relationship with money",
          "Good basic money management skills",
          "Low financial anxiety",
          "Balanced approach to spending and saving"
        ],
        areas_for_growth: [
          "Expand financial literacy and education",
          "Learn more about investment strategies",
          "Develop more structured financial planning",
          "Understand tax optimization and advanced concepts"
        ],
        recommended_resources: [
          "Fundamental financial education courses",
          "Investment basics workshops",
          "Financial planning tools and templates",
          "Regular financial newsletter subscriptions"
        ]
      };
    } else if (health.moneyManagement < 3.0) {
      return {
        profileType: "Knowledgeable Planner",
        description: "You understand financial concepts well and have emotional balance, but could improve on day-to-day money management execution.",
        strengths: [
          "Strong financial knowledge base",
          "Good emotional health around money",
          "Clear financial goals and vision",
          "Understanding of complex financial concepts"
        ],
        areas_for_growth: [
          "Improve practical money management systems",
          "Develop better budgeting habits",
          "Implement consistent tracking systems",
          "Bridge the gap between knowledge and action"
        ],
        recommended_resources: [
          "Budgeting apps and tools",
          "Habit-building financial programs",
          "Automated money management systems",
          "Regular financial review schedules"
        ]
      };
    } else {
      return {
        profileType: "Balanced Achiever",
        description: "You have a well-rounded financial profile with balanced knowledge, management skills, and emotional health.",
        strengths: [
          "Consistent financial habits",
          "Balanced approach to spending and saving",
          "Practical financial knowledge",
          "Healthy attitude toward money"
        ],
        areas_for_growth: [
          "Deepen knowledge in specific financial areas",
          "Refine money management systems",
          "Set more ambitious financial goals",
          "Further align finances with personal values"
        ],
        recommended_resources: [
          "Specialized financial education",
          "Improved tracking and management tools",
          "Community of like-minded financial learners",
          "Regular financial checkup schedule"
        ]
      };
    }
  } else if (health.overallScore >= 2.0) {
    if (health.financialAwareness <= 2.0 && health.emotionalHealth <= 2.0) {
      return {
        profileType: "Financial Beginner",
        description: "You're in the early stages of your financial journey, with opportunities to improve both knowledge and emotional relationship with money.",
        strengths: [
          "Awareness of financial growth opportunities",
          "Desire to improve financial situation",
          "Openness to learning new financial concepts",
          "Recognition of areas needing improvement"
        ],
        areas_for_growth: [
          "Build basic financial literacy foundation",
          "Develop healthier emotional relationship with money",
          "Create simple budgeting and tracking systems",
          "Set achievable short-term financial goals"
        ],
        recommended_resources: [
          "Basic financial literacy courses",
          "Simple budgeting apps and templates",
          "Financial mindfulness practices",
          "Supportive financial education communities"
        ]
      };
    } else if (health.moneyManagement <= 2.0) {
      return {
        profileType: "Aspiring Manager",
        description: "You have some financial knowledge and reasonable emotional health, but struggle with implementing effective money management systems.",
        strengths: [
          "Some financial awareness and literacy",
          "Understanding of financial concepts",
          "Interest in improving financial situation",
          "Reasonable emotional relationship with money"
        ],
        areas_for_growth: [
          "Develop consistent money management habits",
          "Implement practical budgeting systems",
          "Create balance between spending and saving",
          "Translate financial knowledge into action"
        ],
        recommended_resources: [
          "Practical budgeting templates and apps",
          "Financial habit-building programs",
          "Automated savings and bill payment systems",
          "Regular money management routines"
        ]
      };
    } else {
      return {
        profileType: "Developing Financial Self",
        description: "You're making progress in your financial journey, with some strengths to build upon and clear areas for growth.",
        strengths: [
          "Growing financial literacy",
          "Developing money management skills",
          "Interest in financial self-improvement",
          "Some effective financial habits established"
        ],
        areas_for_growth: [
          "Create more comprehensive financial plans",
          "Strengthen weaker financial areas",
          "Develop more systematic approach to money",
          "Build greater financial confidence"
        ],
        recommended_resources: [
          "Intermediate financial education",
          "Personalized financial planning tools",
          "Financial support communities",
          "Regular guided financial check-ins"
        ]
      };
    }
  } else {
    return {
      profileType: "Financial Renewal Seeker",
      description: "You're at the beginning of rebuilding your relationship with money, with significant opportunities for growth and transformation.",
      strengths: [
        "Courage to assess your financial situation",
        "Willingness to make positive changes",
        "Recognition of the importance of financial health",
        "Openness to learning and growth"
      ],
      areas_for_growth: [
        "Build basic financial foundations",
        "Develop healthy money mindsets and attitudes",
        "Create simple, sustainable financial habits",
        "Address sources of financial stress and anxiety"
      ],
      recommended_resources: [
        "Foundational financial education",
        "Simple money management tools",
        "Supportive financial communities",
        "Step-by-step financial improvement plans"
      ]
    };
  }
};

// Random weekly challenges
const weeklyMoneyChallenge = [
  "Zero spend days: Complete 3 no-spending days this week",
  "Savings sprint: Save $1000 in creative ways this week",
  "Knowledge boost: Learn and apply one investing concept",
  "Budget mastery: Track every expense to the last rupee",
  "Mindful spending: Write down emotion before each purchase",
  "Declutter & earn: Sell 3 unused items this week",
  "Financial fitness: Cut one recurring expense",
  "Money mindset: Write daily gratitude for your financial wins",
  "Skill building: Learn one new way to earn extra income",
  "Debt reduction: Make one extra payment towards debt"
];

export default function NewRelationshipWithMoney() {
  const [_, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("self-assessment");
  const [responses, setResponses] = useState<Record<string, number>>({
    spending_control: 3,
    financial_anxiety: 3,
    goal_clarity: 3,
    budget_adherence: 3,
    financial_knowledge: 3
  });
  
  // Spending tracker state
  const [spendingData, setSpendingData] = useState<Array<{
    amount: number;
    category: string;
    emotion: string;
    necessity: number;
  }>>([]);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [purchaseCategory, setPurchaseCategory] = useState("Necessities");
  const [emotion, setEmotion] = useState("Satisfied");
  const [necessity, setNecessity] = useState(3);
  
  // Goal settings state
  const [goalType, setGoalType] = useState("Emergency Fund");
  const [goalAmount, setGoalAmount] = useState(100000);
  const [timeline, setTimeline] = useState(12);
  const [monthlySaving, setMonthlySaving] = useState<number | null>(null);
  
  // Action plan state
  const [challengeIndex, setChallengeIndex] = useState(
    Math.floor(Math.random() * weeklyMoneyChallenge.length)
  );

  // Assessment completion state
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  
  // Questions for assessment
  const questions = {
    "spending_control": "How often do you make impulsive purchases?",
    "financial_anxiety": "How often do you feel anxious about your finances?",
    "goal_clarity": "How clear are your financial goals?",
    "budget_adherence": "How well do you stick to your budget?",
    "financial_knowledge": "How comfortable are you with financial terms and concepts?"
  };

  const { toast } = useToast();
  
  const handleBack = () => {
    setLocation("/learning");
  };
  
  const handleSliderChange = (key: string, value: number[]) => {
    setResponses({
      ...responses,
      [key]: value[0]
    });
  };
  
  const calculateMonthlyGoal = () => {
    const monthlySaving = goalAmount / timeline;
    setMonthlySaving(monthlySaving);
  };
  
  const logPurchase = () => {
    setSpendingData([
      ...spendingData,
      {
        amount: purchaseAmount,
        category: purchaseCategory,
        emotion: emotion,
        necessity: necessity
      }
    ]);
    
    // Reset form
    setPurchaseAmount(0);
    setPurchaseCategory("Necessities");
    setEmotion("Satisfied");
    setNecessity(3);
  };
  
  const getNewChallenge = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * weeklyMoneyChallenge.length);
    } while (newIndex === challengeIndex);
    setChallengeIndex(newIndex);
  };

  const handleCompleteAssessment = () => {
    setAssessmentCompleted(true);
    setActiveTab("progress-tracker");
    
    toast({
      title: "Assessment Completed!",
      description: "Your financial profile and personalized recommendations are ready.",
      variant: "default",
    });
  };
  
  // Calculate totals for financial health dashboard
  const calculateFinancialHealth = () => {
    const financialAwareness = (responses.financial_knowledge + responses.goal_clarity) / 2;
    const moneyManagement = (responses.spending_control + responses.budget_adherence) / 2;
    const emotionalHealth = 6 - responses.financial_anxiety; // Inverse of anxiety
    const overallScore = (financialAwareness + moneyManagement + emotionalHealth) / 3;
    
    return {
      financialAwareness,
      moneyManagement,
      emotionalHealth,
      overallScore
    };
  };

  const health = calculateFinancialHealth();
  const profile = getFinancialProfile(health);
  
  return (
    <div className="px-6 py-5 max-w-4xl mx-auto">
      <SEO 
        title="Your Relationship with Money - Financial Well-being"
        description="Understand and improve your relationship with money through self-assessment, goal setting, and mindful spending practices for better financial well-being."
        keywords="money relationship, financial well-being, money mindset, financial health, goal setting, mindful spending, financial anxiety"
        canonical="https://dollarmento.com/relationship-with-money"
      />
      
      <div className="flex items-center mb-3">
        <button 
          onClick={handleBack}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <h1 className="text-2xl font-bold flex items-center">
          <span className="text-2xl mr-2">💰</span>Your Relationship with Money
        </h1>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-5 text-sm text-gray-700 dark:text-gray-300 border">
        Transform your financial mindset by understanding your unique relationship with money and developing healthier financial habits.
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-transparent p-0 border-0 w-full">
          <TabsTrigger value="self-assessment" className="rounded-full px-6 py-2 text-sm font-medium bg-white dark:bg-gray-700 border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">
            Assessment
          </TabsTrigger>
          <TabsTrigger value="progress-tracker" className="rounded-full px-6 py-2 text-sm font-medium bg-white dark:bg-gray-700 border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">
            Your Profile
          </TabsTrigger>
          <TabsTrigger value="action-plan" className="rounded-full px-6 py-2 text-sm font-medium bg-white dark:bg-gray-700 border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">
            Action Plan
          </TabsTrigger>
        </TabsList>
        
        {/* Self Assessment Tab */}
        <TabsContent value="self-assessment" className="space-y-4">
          <Card className="overflow-hidden">
            <div className="bg-gray-200 dark:bg-gray-800 px-3 py-2 border-b">
              <h3 className="font-medium text-lg flex items-center text-black dark:text-white">
                <span className="material-icons text-blue-500 mr-2">psychology</span>
                Money Mindset Quiz
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Answer these 5 questions to discover your financial relationship patterns</p>
            </div>
            <CardContent className="p-3 space-y-2">
              {Object.entries(questions).map(([key, question]) => (
                <div key={key} className="bg-gray-50 py-2 px-3 rounded-md mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <Label className="text-sm">{question}</Label>
                    <span className="text-sm font-semibold w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-700">{responses[key]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-12">Rarely</span>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      value={[responses[key]]}
                      onValueChange={(value) => handleSliderChange(key, value)}
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-500 w-14 text-right">Always</span>
                  </div>
                </div>
              ))}
              
              <Button 
                onClick={handleCompleteAssessment}
                className="w-full mt-2"
                variant="default"
              >
                <span className="material-icons mr-1 text-sm">insights</span>
                Analyze My Money Mindset
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Progress Tracker Tab with Financial Profile */}
        <TabsContent value="progress-tracker" className="space-y-4">
          <Card className="overflow-hidden">
            <div className="bg-gray-200 dark:bg-gray-800 px-4 py-3 border-b">
              <h3 className="font-medium text-lg flex items-center text-black dark:text-white">
                <span className="material-icons text-blue-500 mr-2">monitoring</span>
                Your Financial Health Dashboard
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Understanding your relationship with money</p>
            </div>
            <CardContent className="p-4">
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 border relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 bg-indigo-100 rounded-bl-lg">
                      <span className="material-icons text-indigo-500 text-sm">school</span>
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Financial Awareness</div>
                    <div className="text-3xl font-bold text-indigo-700">{health.financialAwareness.toFixed(1)}</div>
                    <div className="text-xs text-gray-500 mt-1">out of 5.0</div>
                    <Progress 
                      value={(health.financialAwareness / 5) * 100} 
                      className="h-1.5 mt-2 bg-blue-100" 
                    />
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 bg-emerald-100 rounded-bl-lg">
                      <span className="material-icons text-emerald-500 text-sm">account_balance_wallet</span>
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Money Management</div>
                    <div className="text-3xl font-bold text-emerald-700">{health.moneyManagement.toFixed(1)}</div>
                    <div className="text-xs text-gray-500 mt-1">out of 5.0</div>
                    <Progress 
                      value={(health.moneyManagement / 5) * 100} 
                      className="h-1.5 mt-2 bg-green-100" 
                    />
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-4 border relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 bg-amber-100 rounded-bl-lg">
                      <span className="material-icons text-amber-500 text-sm">spa</span>
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Financial Peace</div>
                    <div className="text-3xl font-bold text-amber-700">{health.emotionalHealth.toFixed(1)}</div>
                    <div className="text-xs text-gray-500 mt-1">out of 5.0</div>
                    <Progress 
                      value={(health.emotionalHealth / 5) * 100} 
                      className="h-1.5 mt-2 bg-amber-100" 
                    />
                  </div>
                </div>

                {/* Money Profile Dimensions - Added from Assessment tab */}
                <div className="mb-6">
                  <Card className="overflow-hidden border">
                    <div className="bg-gray-200 dark:bg-gray-800 px-4 py-3 border-b">
                      <h3 className="font-medium text-lg flex items-center text-black dark:text-white">
                        <span className="material-icons text-indigo-500 mr-2">donut_large</span>
                        Financial Assessment Summary
                      </h3>
                    </div>
                    <CardContent className="p-4">
                      {/* Direct Grid without outer box */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Sub-Box: Money Profile Dimensions */}
                        <div className="bg-gray-100 rounded-lg p-4 border border-gray-200/50">
                          <h5 className="text-center text-sm font-medium text-gray-700 mb-2">Money Profile Dimensions</h5>
                            
                            {/* Compact visualization with only key dimensions */}
                            <div className="mt-1">
                              {Object.entries(questions).map(([key, question]) => {
                                // Define different colors for each dimension
                                interface ColorConfig {
                                  bg: string;
                                  light: string;
                                }
                                
                                const dimensionColors: Record<string, ColorConfig> = {
                                  "spending_control": { bg: "bg-blue-500", light: "bg-blue-100" },
                                  "financial_anxiety": { bg: "bg-indigo-500", light: "bg-indigo-100" },
                                  "goal_clarity": { bg: "bg-green-500", light: "bg-green-100" },
                                  "budget_adherence": { bg: "bg-amber-500", light: "bg-amber-100" },
                                  "financial_knowledge": { bg: "bg-purple-500", light: "bg-purple-100" }
                                };
                                
                                // Get color or default to blue
                                const colorConfig = dimensionColors[key as keyof typeof dimensionColors] || { bg: "bg-blue-500", light: "bg-blue-100" };
                                const colorClass = colorConfig.bg;
                                const lightColorClass = colorConfig.light;
                                
                                // Calculate percentage for score display
                                const scorePercent = (responses[key]/5)*100;
                                
                                return (
                                  <div key={key} className="mb-1.5">
                                    <div className="flex items-center justify-between mb-0.5">
                                      <div className="flex items-center">
                                        <div className={`w-2 h-2 rounded-full ${colorClass} mr-1.5`}></div>
                                        <span className="text-xs font-medium text-gray-800">
                                          {key.split('_').join(' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </span>
                                      </div>
                                      <div className={`text-xs px-1.5 rounded-md ${lightColorClass} text-gray-800`}>
                                        {responses[key]}/5
                                      </div>
                                    </div>
                                    <div className={`w-full h-1.5 ${lightColorClass} rounded-full overflow-hidden`}>
                                      <div 
                                        className={`h-1.5 rounded-full ${colorClass}`} 
                                        style={{ width: `${scorePercent}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          
                          {/* Second Sub-Box: Overall Money Mindset Score */}
                          <div className="bg-gray-100 rounded-lg p-4 border border-gray-200/50">
                            <h5 className="text-center text-sm font-medium text-gray-700 mb-3">Overall Money Mindset Score</h5>
                            {(() => {
                              const totalScore = Object.values(responses).reduce((sum, val) => sum + val, 0);
                              const maxScore = Object.keys(questions).length * 5;
                              const progress = totalScore / maxScore;
                              
                              // Get appropriate colors based on score
                              const getScoreColor = () => {
                                if (progress < 0.4) return {
                                  bg: "bg-amber-500",
                                  light: "bg-amber-100",
                                  text: "text-amber-600"
                                };
                                else if (progress < 0.7) return {
                                  bg: "bg-blue-500",
                                  light: "bg-blue-100",
                                  text: "text-blue-600"
                                };
                                else return {
                                  bg: "bg-emerald-500",
                                  light: "bg-emerald-100", 
                                  text: "text-emerald-600"
                                };
                              };
                              
                              const colors = getScoreColor();
                              
                              return (
                                <>
                                  <div className="flex items-center justify-center mb-4">
                                    <div className="w-16 h-16 rounded-full bg-white border-4 border-blue-200 flex items-center justify-center mr-3 shadow-sm">
                                      <span className="text-3xl">{getMoodEmoji(progress)}</span>
                                    </div>
                                    <div>
                                      <div className={`text-2xl font-bold ${colors.text}`}>{Math.round(progress * 100)}%</div>
                                      <div className="text-xs text-gray-500 font-medium">Money Mindset Score</div>
                                    </div>
                                  </div>
                                  
                                  <div className="relative mb-3">
                                    <div className={`w-full h-3 ${colors.light} rounded-full overflow-hidden`}>
                                      <div 
                                        className={`h-3 rounded-full ${colors.bg} transition-all duration-1000 ease-out`}
                                        style={{ width: `${progress * 100}%` }}
                                      ></div>
                                    </div>
                                    <div className="flex justify-between mt-1">
                                      <span className="text-xs text-gray-500">Beginner</span>
                                      <span className="text-xs text-gray-500">Intermediate</span>
                                      <span className="text-xs text-gray-500">Advanced</span>
                                    </div>
                                  </div>
                                  
                                  <div className={`mt-3 text-center p-2 rounded-lg ${colors.light} border border-${colors.bg.split('-')[1]}-200`}>
                                    {progress < 0.4 ? (
                                      <p className={`${colors.text} text-xs font-medium`}>Early stages, but you're on the right path! 🌱</p>
                                    ) : progress < 0.7 ? (
                                      <p className={`${colors.text} text-xs font-medium`}>Great progress! Keep building those money habits! 💪</p>
                                    ) : (
                                      <p className={`${colors.text} text-xs font-medium`}>Excellent money mindset! Keep thriving! 🌟</p>
                                    )}
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Financial Profile Section */}
                <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="material-icons text-blue-600">psychology</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Your Financial Profile: <span className="text-blue-700">{profile.profileType}</span></h3>
                      <p className="text-sm text-gray-600">{profile.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white rounded-lg border p-4">
                      <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <span className="material-icons text-emerald-500 mr-2 text-sm">stars</span>
                        Your Financial Strengths
                      </h4>
                      <ul className="space-y-2">
                        {profile.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start">
                            <span className="material-icons text-emerald-500 mr-2 text-sm mt-0.5">check_circle</span>
                            <span className="text-sm text-gray-700">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg border p-4">
                      <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <span className="material-icons text-amber-500 mr-2 text-sm">trending_up</span>
                        Areas for Growth
                      </h4>
                      <ul className="space-y-2">
                        {profile.areas_for_growth.map((area, index) => (
                          <li key={index} className="flex items-start">
                            <span className="material-icons text-amber-500 mr-2 text-sm mt-0.5">arrow_right</span>
                            <span className="text-sm text-gray-700">{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-blue-100/70 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                      <span className="material-icons text-blue-600 mr-2 text-sm">menu_book</span>
                      Recommended Resources
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {profile.recommended_resources.map((resource, index) => (
                        <li key={index} className="flex items-center bg-white/60 py-2 px-3 rounded border border-blue-200">
                          <span className="material-icons text-blue-600 mr-2 text-sm">auto_stories</span>
                          <span className="text-sm text-gray-700">{resource}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-col items-center">
                      <Button 
                        onClick={() => setActiveTab("action-plan")}
                        size="default" 
                        className="bg-blue-600 hover:bg-blue-700 py-3 px-6"
                      >
                        <span className="material-icons mr-2">format_list_bulleted</span>
                        See Your Personalized Action Plan
                      </Button>
                      
                      <div className="mt-3 flex space-x-4">
                        <Button 
                          onClick={() => setLocation("/goal-settings")}
                          variant="outline"
                          size="sm"
                          className="border-blue-200"
                        >
                          <span className="material-icons mr-1 text-sm">flag</span>
                          Goal Setting
                        </Button>
                        
                        <Button 
                          onClick={() => setLocation("/budget-buddy")}
                          variant="outline"
                          size="sm"
                          className="border-blue-200"
                        >
                          <span className="material-icons mr-1 text-sm">receipt_long</span>
                          Expense Tracker
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Action Plan Tab with personalized recommendations */}
        <TabsContent value="action-plan" className="space-y-4">
          <Card className="overflow-hidden">
            <div className="bg-gray-200 dark:bg-gray-800 px-4 py-3 border-b">
              <h3 className="font-medium text-lg flex items-center text-black dark:text-white">
                <span className="material-icons text-amber-500 mr-2">lightbulb</span>
                Your Personalized Action Plan
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Customized steps to improve your financial relationship based on your assessment</p>
            </div>
            <CardContent className="p-4">
              <div className="mb-6">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200 mb-6">
                  <div className="flex">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="material-icons text-amber-600">tips_and_updates</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Financial Insight for {profile.profileType}</h4>
                      <p className="text-sm text-gray-700">{profile.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="text-xs bg-amber-100 text-amber-700 rounded-full px-2 py-1 inline-flex items-center">
                          <span className="material-icons mr-1 text-xs">psychology</span>
                          Money Mindset
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-1 inline-flex items-center">
                          <span className="material-icons mr-1 text-xs">account_balance_wallet</span>
                          Financial Habits
                        </span>
                        <span className="text-xs bg-emerald-100 text-emerald-700 rounded-full px-2 py-1 inline-flex items-center">
                          <span className="material-icons mr-1 text-xs">trending_up</span>
                          Growth Path
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 mb-4">
                  <div className="flex items-center mb-2">
                    <span className="material-icons text-amber-500 mr-2 text-sm">info</span>
                    <p className="text-sm text-amber-800">
                      These recommendations are tailored to your unique financial profile. Focus on these actions to improve your financial well-being.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                    <span className="material-icons text-emerald-500 mr-2 text-sm">task_alt</span>
                    Priority Actions Based On Your Assessment
                  </h4>
                  
                  <div className="space-y-3">
                    {getActionPlan(responses).map((item, index) => (
                      <div key={index} className="p-4 bg-white dark:bg-gray-700 rounded-lg border border hover:border-amber-300 transition-all hover:shadow-sm">
                        <div className="flex">
                          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3 shrink-0">
                            <span className="material-icons text-amber-600 text-sm">check_circle</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-gray-800 flex-1">{item}</div>
                            <div className="mt-2 flex items-center">
                              <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-400 w-0 animate-progress-fill"></div>
                              </div>
                              <span className="text-xs text-gray-500 ml-2">Start this habit</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden border mb-6">
                <div className="bg-gray-200 dark:bg-gray-800 px-4 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium flex items-center">
                      <span className="material-icons text-purple-500 mr-2 text-sm">emoji_events</span>
                      Weekly Money Challenge
                    </h3>
                    <Button 
                      onClick={getNewChallenge} 
                      size="sm" 
                      variant="outline" 
                      className="h-8 bg-white dark:bg-gray-700 border-purple-200 text-purple-700 text-xs"
                    >
                      <span className="material-icons mr-1 text-xs">refresh</span>
                      New Challenge
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/30">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-800/30 flex items-center justify-center flex-shrink-0">
                      <span className="material-icons text-purple-600 dark:text-purple-300">flag</span>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 flex-1">
                      {weeklyMoneyChallenge[challengeIndex]}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <span className="material-icons text-blue-600 mr-2 text-sm">next_plan</span>
                  Next Steps for Financial Growth
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button 
                    onClick={() => setLocation("/goal-settings")}
                    variant="outline" 
                    className="justify-start px-3 py-2 h-auto text-left flex items-center"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="material-icons text-blue-600 text-sm">flag</span>
                    </div>
                    <div>
                      <div className="font-medium">Set Financial Goals</div>
                      <div className="text-xs text-gray-500">Define clear targets for your money</div>
                    </div>
                  </Button>
                  
                  <Button 
                    onClick={() => setLocation("/budget-buddy")}
                    variant="outline" 
                    className="justify-start px-3 py-2 h-auto text-left flex items-center"
                  >
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="material-icons text-emerald-600 text-sm">receipt_long</span>
                    </div>
                    <div>
                      <div className="font-medium">Track Expenses</div>
                      <div className="text-xs text-gray-500">Monitor your spending patterns</div>
                    </div>
                  </Button>
                  
                  <Button 
                    onClick={() => setLocation("/learning-hub")}
                    variant="outline" 
                    className="justify-start px-3 py-2 h-auto text-left flex items-center"
                  >
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="material-icons text-amber-600 text-sm">school</span>
                    </div>
                    <div>
                      <div className="font-medium">Learn New Skills</div>
                      <div className="text-xs text-gray-500">Expand your financial knowledge</div>
                    </div>
                  </Button>
                  
                  <Button 
                    onClick={() => setLocation("/financial-dashboard")}
                    variant="outline" 
                    className="justify-start px-3 py-2 h-auto text-left flex items-center"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="material-icons text-purple-600 text-sm">dashboard</span>
                    </div>
                    <div>
                      <div className="font-medium">Financial Dashboard</div>
                      <div className="text-xs text-gray-500">View your overall financial health</div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Quick Access Buttons */}
              <div className="mt-6 flex flex-col items-center">
                <h4 className="text-center font-medium text-gray-700 mb-4">Take Action Now</h4>
                <div className="flex space-x-4 w-full max-w-md">
                  <Button 
                    onClick={() => setLocation("/goal-settings")}
                    className="flex-1 py-6 rounded-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm hover:shadow"
                  >
                    <span className="font-medium">Goal Setting</span>
                  </Button>
                  
                  <Button 
                    onClick={() => setLocation("/budget-buddy")}
                    className="flex-1 py-6 rounded-full bg-blue-500 hover:bg-blue-600 text-white border border-blue-500 shadow-sm hover:shadow"
                  >
                    <span className="font-medium">Expense Tracker</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Keep existing Goal Setting and Mindful Spending tabs */}
        {/* These will be implemented but not shown in this sample for brevity */}
      </Tabs>
    </div>
  );
}