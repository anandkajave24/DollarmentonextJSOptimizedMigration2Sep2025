import { TabPills, TabItem } from "@/components/ui/tab-pills";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEO } from "@/components/SEO";

// Adding custom CSS for animations
import "../styles/money-relationships.css";

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
      "💰 Set up automatic alerts for category spending limits using apps like Mint or YNAB",
      "🛒 Make a shopping list before any purchase and stick to it",
      "⏰ Wait 72 hours before any purchase above $500"
    ],
    "financial_anxiety": [
      "🧘‍♀️ Daily 10-minute money meditation focusing on abundance mindset",
      "📊 Build emergency fund in high-yield savings account (aim for 6 months expenses)",
      "💪 List 3 financial wins daily, including debt payments and savings milestones",
      "📈 Schedule monthly financial check-ins to review credit score and net worth",
      "🎯 Break large goals into micro-goals (like maxing 401k contribution)"
    ],
    "goal_clarity": [
      "✍️ Create vision board with specific financial milestones",
      "📅 Set 3 short-term (3 months) and 2 long-term (3 years) goals",
      "🎯 Write detailed action steps for each financial goal",
      "📊 Track progress weekly using goal achievement metrics",
      "🌟 Reward yourself for hitting financial milestones"
    ],
    "budget_adherence": [
      "📱 Set up automated expense tracking with apps like Personal Capital or Mint",
      "🏦 Open separate accounts: checking for bills, high-yield savings, and fun money",
      "📝 Conduct weekly budget reviews every Sunday using zero-based budgeting",
      "💸 Use cash envelope method for discretionary categories like dining and entertainment",
      "📊 Track savings rate and aim to save 15-20% of gross income for retirement"
    ],
    "financial_knowledge": [
      "📚 Read daily from sources like WSJ, Morningstar, or Bogleheads community",
      "💡 Learn about 401k, IRA contribution limits and compound interest calculations",
      "🤝 Join financial accountability groups or find a money buddy",
      "📱 Follow experts like Suze Orman, Dave Ramsey, or Bogleheads philosophy",
      "📈 Understand your 401k statements, expense ratios, and asset allocation"
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
        "Bogleheads investment philosophy courses",
        "Estate planning and trust education",
        "Tax-loss harvesting and Roth conversion strategies",
        "Charitable giving and donor-advised funds planning"
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
          "Financial therapy or fee-only financial advisors",
          "Mindfulness apps like Headspace for money stress",
          "Automated 401k and IRA contributions",
          "Monthly net worth tracking with Personal Capital"
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
          "Khan Academy Personal Finance course",
          "Bogleheads 3-fund portfolio basics",
          "YNAB budgeting methodology training",
          "Morningstar and WSJ financial newsletters"
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
          "YNAB or Mint for comprehensive budgeting",
          "Atomic Habits for building financial routines",
          "Automated transfers to 401k and savings accounts",
          "Monthly financial review using spreadsheets or apps"
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
          "CFA Institute or CFP Board continuing education",
          "Personal Capital for advanced tracking and net worth monitoring",
          "Bogleheads community and local FIRE meetups",
          "Quarterly financial advisor consultations"
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
          "Khan Academy Personal Finance and Dave Ramsey basics",
          "Mint or YNAB starter guides and free budgeting templates",
          "Money mindfulness apps and debt payoff calculators",
          "Local financial literacy workshops and online support groups"
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
  "Budget mastery: Track every expense to the last dollar",
  "Mindful spending: Write down emotion before each purchase",
  "Declutter & earn: Sell 3 unused items this week",
  "Financial fitness: Cut one recurring expense",
  "Money mindset: Write daily gratitude for your financial wins",
  "Skill building: Learn one new way to earn extra income",
  "Debt reduction: Make one extra payment towards debt"
];

export default function RelationshipWithMoney() {
  const [_, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("self-assessment");
  const [responses, setResponses] = useState<Record<string, number>>({});
  
  // Track if user has interacted with assessment - always start fresh
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
  
  // Reset assessment state on component mount to ensure fresh start every time
  useEffect(() => {
    setResponses({});
    setHasCompletedAssessment(false);
    setActiveTab("self-assessment");
  }, []);
  
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
  
  // Questions for assessment
  const questions = {
    "spending_control": "How often do you make impulsive purchases?",
    "financial_anxiety": "How often do you feel anxious about your finances?",
    "goal_clarity": "How clear are your financial goals?",
    "budget_adherence": "How well do you stick to your budget?",
    "financial_knowledge": "How comfortable are you with financial terms and concepts?"
  };
  
  const handleBack = () => {
    setLocation("/learning");
  };
  
  const handleSliderChange = (key: string, value: number[]) => {
    const newResponses = {
      ...responses,
      [key]: value[0]
    };
    setResponses(newResponses);
    
    // Note: hasCompletedAssessment is only set to true when user clicks "Analyze My Money Mindset" button
    // This ensures Your Profile and Action Plan tabs remain empty until explicit analysis
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
  
  // Calculate totals for financial health dashboard
  const calculateFinancialHealth = () => {
    if (!hasCompletedAssessment) {
      return {
        financialAwareness: 0,
        moneyManagement: 0,
        emotionalHealth: 0,
        overallScore: 0
      };
    }
    
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

  const health = hasCompletedAssessment ? calculateFinancialHealth() : null;
  
  return (
    <div className="px-6 py-5 max-w-4xl mx-auto">
      <SEO 
        title="Money Mindset & Habits - Build Healthy Financial Relationships"
        description="Discover your money personality and build healthy financial habits with our comprehensive assessment covering 401k planning, budgeting, and wealth-building strategies for Americans."
        keywords="money mindset, financial habits, 401k planning, retirement savings, budgeting apps, credit score improvement, wealth building, financial wellness USA"
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
          <span className="text-2xl mr-2">💰</span>Money Mindset & Habits
        </h1>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-5 text-sm text-gray-700 dark:text-gray-300 border">
        Build a healthy relationship with money and develop smart spending habits for financial success. Learn about 401k optimization, emergency funds, and wealth-building strategies.
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-transparent p-0 border-0 w-full">
          <TabsTrigger value="self-assessment" className="rounded-full px-6 py-2 text-sm font-medium bg-white dark:bg-gray-700 border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">
            Assessment
          </TabsTrigger>
          <TabsTrigger value="goal-setting" className="rounded-full px-6 py-2 text-sm font-medium bg-white dark:bg-gray-700 border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">
            Goal Setting
          </TabsTrigger>
          <TabsTrigger value="mindful-spending" className="rounded-full px-6 py-2 text-sm font-medium bg-white dark:bg-gray-700 border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">
            Expense Tracker
          </TabsTrigger>
          <TabsTrigger value="progress-tracker" className="rounded-full px-6 py-2 text-sm font-medium bg-white dark:bg-gray-700 border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">
            Progress
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
                    <span className="text-sm font-semibold w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-700">{responses[key] || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-12">Rarely</span>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      value={[responses[key] || 1]}
                      onValueChange={(value) => handleSliderChange(key, value)}
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-500 w-14 text-right">Always</span>
                  </div>
                </div>
              ))}
              
              <Button 
                onClick={() => {
                  // Only analyze if all questions have been answered
                  const questionKeys = Object.keys(questions);
                  const answeredQuestions = Object.keys(responses).filter(key => 
                    questionKeys.includes(key) && responses[key] !== undefined && responses[key] > 0
                  );
                  
                  if (answeredQuestions.length === questionKeys.length) {
                    setHasCompletedAssessment(true);
                    setActiveTab("progress-tracker");
                  } else {
                    alert("Please answer all questions before analyzing your money mindset.");
                  }
                }}
                className="w-full mt-2"
                variant="default"
                disabled={Object.keys(responses).filter(key => 
                  Object.keys(questions).includes(key) && responses[key] !== undefined && responses[key] > 0
                ).length !== Object.keys(questions).length}
              >
                <span className="material-icons mr-1 text-sm">insights</span>
                Analyze My Money Mindset
              </Button>
            </CardContent>
          </Card>
          

        </TabsContent>
        
        {/* Goal Setting Tab */}
        <TabsContent value="goal-setting" className="space-y-4">
          <Card className="overflow-hidden border-b">
            <div className="bg-gray-200 dark:bg-gray-800 px-4 py-3 border-b">
              <h3 className="font-medium text-lg flex items-center text-black dark:text-white">
                <span className="material-icons text-green-500 mr-2">flag</span>
                Set Financial Goals
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Define clear targets to improve your financial well-being</p>
            </div>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <Label className="text-sm font-medium mb-2 block">Goal Type</Label>
                    <Select value={goalType} onValueChange={setGoalType}>
                      <SelectTrigger className="bg-gray-50 border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <SelectValue placeholder="Select goal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Emergency Fund">Emergency Fund</SelectItem>
                        <SelectItem value="Debt Repayment">Debt Repayment</SelectItem>
                        <SelectItem value="Investment">Investment</SelectItem>
                        <SelectItem value="Major Purchase">Major Purchase</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <Label htmlFor="goal-amount" className="text-sm font-medium mb-2 block">Target Amount</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <Input
                        id="goal-amount"
                        type="number"
                        value={goalAmount}
                        onChange={(e) => setGoalAmount(Number(e.target.value))}
                        min={0}
                        className="pl-8 bg-gray-50 border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <div className="flex justify-between mb-2">
                      <Label className="text-sm font-medium">Timeline</Label>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">{timeline} months</span>
                    </div>
                    <Slider
                      min={1}
                      max={60}
                      step={1}
                      value={[timeline]}
                      onValueChange={(value) => setTimeline(value[0])}
                      className="mt-1"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 month</span>
                      <span>30 months</span>
                      <span>60 months</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={calculateMonthlyGoal}
                    className="w-full"
                    variant="outline"
                  >
                    <span className="material-icons mr-1 text-sm">calculate</span>
                    Calculate Monthly Savings
                  </Button>
                </div>
                
                <div className="flex items-center justify-center">
                  {monthlySaving !== null ? (
                    <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg border text-center w-full">
                      <div className="text-sm text-gray-600 mb-2">Monthly savings needed</div>
                      <div className="text-3xl font-bold text-green-700 mb-1">${monthlySaving.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                      <div className="text-xs text-gray-500 mb-3">per month</div>
                      <Progress value={(1/timeline) * 100} className="h-2 bg-green-100 mb-2" />
                      <div className="text-sm mt-3">
                        <span className="font-medium">Goal:</span> ${goalAmount.toLocaleString()} in {timeline} months
                      </div>
                      <div className="mt-3 text-xs bg-white dark:bg-gray-700 p-2 rounded border">
                        <span className="material-icons text-green-500 text-sm inline-block align-text-bottom mr-1">lightbulb</span>
                        Setting up an automatic transfer to a separate savings account can help you stay on track.
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 text-center w-full h-64 flex flex-col items-center justify-center">
                      <span className="material-icons text-4xl text-gray-300 mb-2">calculate</span>
                      <div className="text-lg font-medium text-gray-400 mb-1">Calculate Your Plan</div>
                      <p className="text-sm text-gray-500 max-w-xs">
                        Fill in your goal details and calculate how much you need to save monthly
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Mindful Spending Tab */}
        <TabsContent value="mindful-spending" className="space-y-4">
          <Card className="overflow-hidden border-b">
            <div className="bg-gray-200 dark:bg-gray-800 px-4 py-3 border-b">
              <h3 className="font-medium text-lg flex items-center text-black dark:text-white">
                <span className="material-icons text-purple-500 mr-2">psychology_alt</span>
                Mindful Spending Tracker
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Track the emotional and practical aspects of your spending habits</p>
            </div>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                    <div className="flex items-center mb-3">
                      <span className="material-icons text-purple-500 mr-2 text-sm">receipt_long</span>
                      <h4 className="text-sm font-medium">Record a Purchase</h4>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="purchase-amount" className="text-xs text-gray-500">Purchase Amount</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">$</span>
                          </div>
                          <Input
                            id="purchase-amount"
                            type="number"
                            value={purchaseAmount}
                            onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                            min={0}
                            className="pl-8 bg-gray-50 border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-xs text-gray-500">Category</Label>
                        <Select value={purchaseCategory} onValueChange={setPurchaseCategory}>
                          <SelectTrigger className="bg-gray-50 border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Necessities">Necessities</SelectItem>
                            <SelectItem value="Entertainment">Entertainment</SelectItem>
                            <SelectItem value="Shopping">Shopping</SelectItem>
                            <SelectItem value="Food">Food</SelectItem>
                            <SelectItem value="Transport">Transport</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-xs text-gray-500">How did you feel?</Label>
                        <Select value={emotion} onValueChange={setEmotion}>
                          <SelectTrigger className="bg-gray-50 border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <SelectValue placeholder="Select emotion" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Happy">😊 Happy</SelectItem>
                            <SelectItem value="Satisfied">😌 Satisfied</SelectItem>
                            <SelectItem value="Neutral">😐 Neutral</SelectItem>
                            <SelectItem value="Regretful">😕 Regretful</SelectItem>
                            <SelectItem value="Stressed">😰 Stressed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between mb-1">
                          <Label className="text-xs text-gray-500">Necessity Level</Label>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">{necessity}/5</span>
                        </div>
                        <Slider
                          min={1}
                          max={5}
                          step={1}
                          value={[necessity]}
                          onValueChange={(value) => setNecessity(value[0])}
                          className="mt-1"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>Want</span>
                          <span>Need</span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={logPurchase} 
                        className="w-full"
                        variant="outline"
                      >
                        <span className="material-icons mr-1 text-sm">add_circle_outline</span>
                        Log Purchase
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  {spendingData.length > 0 ? (
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="material-icons text-purple-500 mr-2 text-sm">list_alt</span>
                        <h4 className="text-sm font-medium">Recent Purchases</h4>
                      </div>
                      <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                        {spendingData.map((item, index) => (
                          <div key={index} className="bg-white dark:bg-gray-700 p-3 border rounded-md hover:border-purple-200 transition-colors">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <span className="material-icons text-gray-400 mr-2 text-sm">
                                  {item.category === 'Necessities' ? 'home' : 
                                   item.category === 'Entertainment' ? 'movie' :
                                   item.category === 'Shopping' ? 'shopping_bag' :
                                   item.category === 'Food' ? 'restaurant' :
                                   item.category === 'Transport' ? 'directions_car' : 'category'}
                                </span>
                                <span className="font-medium text-sm">{item.category}</span>
                              </div>
                              <span className="font-semibold text-purple-700">${item.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                              <div className="flex items-center">
                                <span className="mr-1">Felt:</span>
                                <span>
                                  {item.emotion === 'Happy' ? '😊' : 
                                   item.emotion === 'Satisfied' ? '😌' :
                                   item.emotion === 'Neutral' ? '😐' :
                                   item.emotion === 'Regretful' ? '😕' : '😰'}
                                </span>
                                <span className="ml-1">{item.emotion}</span>
                              </div>
                              <div>
                                <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700">
                                  {item.necessity < 3 ? 'Want' : item.necessity < 5 ? 'Mixed' : 'Need'}
                                </span>
                              </div>
                            </div>
                            {item.necessity < 3 && (item.emotion === "Regretful" || item.emotion === "Stressed") && (
                              <div className="mt-2 text-xs flex items-start p-1.5 bg-amber-50 border border rounded">
                                <span className="material-icons text-amber-500 mr-1 text-sm">tips_and_updates</span>
                                <p className="text-amber-700 leading-tight">
                                  This may have been an impulse purchase. Try waiting 24 hours before buying non-essentials.
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 text-center w-full h-64 flex flex-col items-center justify-center">
                      <span className="material-icons text-4xl text-gray-300 mb-2">receipt_long</span>
                      <div className="text-lg font-medium text-gray-400 mb-1">No Purchases Logged</div>
                      <p className="text-sm text-gray-500 max-w-xs">
                        Start tracking your spending to understand your emotional spending patterns
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Progress Tracker Tab */}
        <TabsContent value="progress-tracker" className="space-y-4">
          <Card className="overflow-hidden">
            <div className="bg-gray-200 dark:bg-gray-800 px-4 py-3 border-b">
              <h3 className="font-medium text-lg flex items-center text-black dark:text-white">
                <span className="material-icons text-blue-500 mr-2">monitoring</span>
                Your Profile
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Understanding your relationship with money</p>
            </div>
            <CardContent className="p-4">
              {!hasCompletedAssessment ? (
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center w-full h-96 flex flex-col items-center justify-center">
                  <span className="material-icons text-6xl text-gray-300 mb-4">psychology</span>
                  <div className="text-xl font-medium text-gray-400 mb-2">Complete Assessment First</div>
                  <p className="text-sm text-gray-500 max-w-md mb-4">
                    Take the Money Mindset Quiz in the Assessment tab to discover your financial personality and get personalized insights.
                  </p>
                  <Button 
                    onClick={() => setActiveTab("self-assessment")}
                    className="mt-2"
                    variant="outline"
                  >
                    <span className="material-icons mr-1 text-sm">psychology</span>
                    Start Assessment
                  </Button>
                </div>
              ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 border relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 bg-indigo-100 rounded-bl-lg">
                      <span className="material-icons text-indigo-500 text-sm">school</span>
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Financial Awareness</div>
                    <div className="text-3xl font-bold text-indigo-700">{health?.financialAwareness?.toFixed(1)}</div>
                    <div className="text-xs text-gray-500 mt-1">out of 5.0</div>
                    <Progress 
                      value={(health?.financialAwareness || 0) / 5 * 100} 
                      className="h-1.5 mt-2 bg-blue-100" 
                    />
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 bg-emerald-100 rounded-bl-lg">
                      <span className="material-icons text-emerald-500 text-sm">account_balance_wallet</span>
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Money Management</div>
                    <div className="text-3xl font-bold text-emerald-700">{health?.moneyManagement?.toFixed(1)}</div>
                    <div className="text-xs text-gray-500 mt-1">out of 5.0</div>
                    <Progress 
                      value={(health?.moneyManagement || 0) / 5 * 100} 
                      className="h-1.5 mt-2 bg-green-100" 
                    />
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-4 border border relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 bg-amber-100 rounded-bl-lg">
                      <span className="material-icons text-amber-500 text-sm">spa</span>
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Financial Peace</div>
                    <div className="text-3xl font-bold text-amber-700">{health?.emotionalHealth?.toFixed(1)}</div>
                    <div className="text-xs text-gray-500 mt-1">out of 5.0</div>
                    <Progress 
                      value={(health?.emotionalHealth || 0) / 5 * 100} 
                      className="h-1.5 mt-2 bg-amber-100" 
                    />
                  </div>
                </div>

                <div className="mt-6 p-5 bg-gray-50 dark:bg-gray-700 rounded-xl border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="material-icons text-blue-500 mr-2">insights</span>
                      <h3 className="text-lg font-medium">Overall Financial Health</h3>
                    </div>
                    <div className="py-1 px-3 rounded-full bg-white dark:bg-gray-700 border font-medium text-blue-700">
                      {health?.overallScore.toFixed(1)}/5.0
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Progress 
                      value={(health?.overallScore || 0) / 5 * 100} 
                      className="h-3 bg-blue-100" 
                    />
                    
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Needs Attention</span>
                      <span>Making Progress</span>
                      <span>Thriving</span>
                    </div>
                  </div>
                  
                  <div className="mt-5 p-4 bg-white dark:bg-gray-700 rounded-lg border flex">
                    <div className="mr-3 text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        (health?.overallScore || 0) < 2.5 ? "bg-red-100 text-red-600" : 
                        (health?.overallScore || 0) < 3.5 ? "bg-amber-100 text-amber-600" : 
                        "bg-emerald-100 text-emerald-600"
                      }`}>
                        <span className="material-icons">
                          {(health?.overallScore || 0) < 2.5 ? "priority_high" : 
                           (health?.overallScore || 0) < 3.5 ? "trending_up" : 
                           "verified"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">
                        {(health?.overallScore || 0) < 2.5 ? "Focus Areas Identified" : 
                         (health?.overallScore || 0) < 3.5 ? "Positive Progress" : 
                         "Financial Wellness"}
                      </h4>
                      {(health?.overallScore || 0) < 2.5 ? (
                        <p className="text-sm text-gray-600 dark:text-gray-400">Your financial health needs attention. Start with the action plan below to build strong financial habits.</p>
                      ) : (health?.overallScore || 0) < 3.5 ? (
                        <p className="text-sm text-gray-600">You're making good progress! Keep working on your financial habits to improve your overall health.</p>
                      ) : (
                        <p className="text-sm text-gray-600">Excellent financial health! Maintain these positive habits and consider helping others with their journey.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Action Plan Tab */}
        <TabsContent value="action-plan" className="space-y-4">
          <Card className="overflow-hidden">
            <div className="bg-gray-200 dark:bg-gray-800 px-4 py-3 border-b">
              <h3 className="font-medium text-lg flex items-center text-black dark:text-white">
                <span className="material-icons text-amber-500 mr-2">lightbulb</span>
                Action Plan
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Customized steps to improve your financial relationship based on your assessment</p>
            </div>
            <CardContent className="p-4">
              {!hasCompletedAssessment ? (
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center w-full h-96 flex flex-col items-center justify-center">
                  <span className="material-icons text-6xl text-gray-300 mb-4">lightbulb</span>
                  <div className="text-xl font-medium text-gray-400 mb-2">Assessment Required</div>
                  <p className="text-sm text-gray-500 max-w-md mb-4">
                    Complete the Money Mindset Quiz to receive a personalized action plan with specific steps to improve your financial well-being.
                  </p>
                  <Button 
                    onClick={() => setActiveTab("self-assessment")}
                    className="mt-2"
                    variant="outline"
                  >
                    <span className="material-icons mr-1 text-sm">psychology</span>
                    Take Assessment
                  </Button>
                </div>
              ) : (
              <>
              <div className="mb-6">
                <div className="bg-amber-50 p-3 rounded-lg border border mb-4">
                  <div className="flex items-center mb-2">
                    <span className="material-icons text-amber-500 mr-2 text-sm">info</span>
                    <p className="text-sm text-amber-800">
                      These recommendations are tailored to the areas where you scored lower in the assessment. Focus on these actions to improve your financial well-being.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {getActionPlan(responses).map((item, index) => (
                    <div key={index} className="p-4 bg-white dark:bg-gray-700 rounded-lg border border hover:border-amber-300 transition-all hover:shadow-sm">
                      <div className="flex">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3 shrink-0">
                          <span className="material-icons text-amber-600 text-sm">check_circle</span>
                        </div>
                        <div>
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
                  <div className="flex">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3 shrink-0">
                      <span className="material-icons text-purple-600">check_circle</span>
                    </div>
                    <div>
                      <div className="font-medium text-purple-800 mb-1">This Week's Challenge:</div>
                      <p className="text-gray-700">{weeklyMoneyChallenge[challengeIndex]}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border hover:border-blue-200 transition-all">
                  <div className="flex items-center mb-3">
                    <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                      <span className="material-icons text-blue-600 text-sm">menu_book</span>
                    </span>
                    <h3 className="font-medium text-blue-800">Recommended Reading</h3>
                  </div>
                  <ul className="space-y-2 pl-10">
                    <li className="text-sm text-gray-700 relative">
                      <span className="absolute -left-5 top-1 material-icons text-blue-400 text-xs">arrow_right</span>
                      "Psychology of Money" by Morgan Housel
                    </li>
                    <li className="text-sm text-gray-700 relative">
                      <span className="absolute -left-5 top-1 material-icons text-blue-400 text-xs">arrow_right</span>
                      "Your Money or Your Life" by Vicki Robin
                    </li>
                    <li className="text-sm text-gray-700 relative">
                      <span className="absolute -left-5 top-1 material-icons text-blue-400 text-xs">arrow_right</span>
                      "Atomic Habits" by James Clear
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border hover:border-green-200 transition-all">
                  <div className="flex items-center mb-3">
                    <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <span className="material-icons text-green-600 text-sm">apps</span>
                    </span>
                    <h3 className="font-medium text-green-800">Helpful Tools</h3>
                  </div>
                  <ul className="space-y-2 pl-10">
                    <li className="text-sm text-gray-700 relative">
                      <span className="absolute -left-5 top-1 material-icons text-green-400 text-xs">arrow_right</span>
                      Expense tracking apps
                    </li>
                    <li className="text-sm text-gray-700 relative">
                      <span className="absolute -left-5 top-1 material-icons text-green-400 text-xs">arrow_right</span>
                      Automated savings apps
                    </li>
                    <li className="text-sm text-gray-700 relative">
                      <span className="absolute -left-5 top-1 material-icons text-green-400 text-xs">arrow_right</span>
                      Budget templates
                    </li>
                    <li className="text-sm text-gray-700 relative">
                      <span className="absolute -left-5 top-1 material-icons text-green-400 text-xs">arrow_right</span>
                      Financial goal visualization tools
                    </li>
                  </ul>
                </div>
              </div>
              </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}