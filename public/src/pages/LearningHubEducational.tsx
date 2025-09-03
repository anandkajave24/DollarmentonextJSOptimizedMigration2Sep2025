import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, Play, CheckCircle, ChevronDown, ChevronRight, BookOpen, Users, Award, FileText, Download, Home, DollarSign, Calculator, CreditCard, BarChart3, Landmark, Crosshair, FileText as Tax, Shield, Clock as Retirement, Brain, Globe } from "lucide-react";
import { Link } from "wouter";

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  totalDuration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  students: number;
  category: string;
  modules: Module[];
  skills: string[];
  certificate: boolean;
  completionRate: number;
}

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  videos: Video[];
  resources?: Resource[];
  completed: boolean;
  unlocked: boolean;
}

interface Video {
  id: number;
  title: string;
  duration: string;
  subtopics: Subtopic[];
  completed: boolean;
  videoUrl?: string;
}

interface Subtopic {
  id: number;
  title: string;
  timestamp: string;
  description: string;
  keyPoints: string[];
}

interface Resource {
  id: number;
  title: string;
  type: "pdf" | "excel" | "template" | "checklist";
  description: string;
  downloadUrl: string;
}

const levelData = {
  "0": {
    title: "LEVEL 0: Welcome to RupeeSmart",
    description: "Introduction to RupeeSmart and financial learning journey",
    videos: [
      { id: 1, title: "What is RupeeSmart?", duration: "4 min", description: "How it helps you learn, act & grow financially" },
      { id: 2, title: "Why Learn About Money?", duration: "4 min", description: "Real-life examples of money gaps & smart action" },
      { id: 3, title: "How This Learning Journey Works", duration: "4 min", description: "Levels, videos, habit tracking, & real-life impact" }
    ]
  },
  "0.5": {
    title: "LEVEL 0.5: Money Basics for Absolute Beginners",
    description: "Foundation concepts about money for complete beginners",
    videos: [
      { id: 1, title: "What is Money Used For?", duration: "3 min", description: "Exchange, store, measure of value, & financial stability" },
      { id: 2, title: "Where Does Your Money Go?", duration: "4 min", description: "Hidden expenses, subscriptions, emotional spending" },
      { id: 3, title: "Why Saving is Not Optional", duration: "3 min", description: "Saving = peace, protection, power" },
      { id: 4, title: "How to Save Your First ₹5000", duration: "4 min", description: "Step-by-step, RupeeSmart goal-setting" },
      { id: 5, title: "Wants vs Needs", duration: "3 min", description: "iPhone EMI vs basic phone logic" },
      { id: 6, title: "Pay Yourself First", duration: "3 min", description: "First thing: save, not spend" },
      { id: 7, title: "Cash Flow is King", duration: "4 min", description: "Earnings - Expenses = Future" },
      { id: 8, title: "How to Track Your Daily Money", duration: "4 min", description: "UPI, cash, digital logs using RupeeSmart" },
      { id: 9, title: "How Emotions Affect Money", duration: "4 min", description: "FOMO, status, guilt, family pressure" },
      { id: 10, title: "Respecting Small Amounts", duration: "3 min", description: "Why ₹10/day can change your life" }
    ]
  },
  "1": {
    title: "LEVEL 1: Budgeting & Financial Control",
    description: "Master budgeting and take control of your finances",
    videos: [
      { id: 1, title: "What is a Budget (Indian Style)", duration: "4 min", description: "Not boring charts – control, clarity, calm" },
      { id: 2, title: "50-30-20 Rule for India", duration: "5 min", description: "Adjusting for rent, family, income irregularity" },
      { id: 3, title: "How to Budget with No Salary", duration: "4 min", description: "Freelancers, gig workers, students" },
      { id: 4, title: "Budgeting Tools: RupeeSmart Demo", duration: "3 min", description: "Monthly budget builder" },
      { id: 5, title: "Emergency Fund: Why & How", duration: "4 min", description: "₹5000 to 3 months' income" },
      { id: 6, title: "How to Stop Overspending", duration: "3 min", description: "RupeeSmart limits, alerts, and behavior nudges" }
    ]
  }
};

export default function LearningHubEducational() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [expandedVideos, setExpandedVideos] = useState<number[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");

  const courses: Course[] = [
    {
      id: 1,
      title: "RupeeSmart Financial Freedom Quest - Level by Level",
      description: "Gamified journey from financial novice to wealth master. 11 progressive levels with interactive tools, real-world actions, and milestone rewards.",
      instructor: "RupeeSmart Financial Team",
      totalDuration: "12 hours",
      level: "Beginner",
      students: 35420,
      category: "Complete Journey",
      certificate: true,
      completionRate: 15,
      skills: ["Money Mindset", "Budgeting Mastery", "Investment Planning", "Tax Optimization", "Wealth Building", "Financial Psychology"],
      modules: [
        {
          id: 0,
          title: "🧠 LEVEL 0: Orientation & Money Mindset",
          description: "Setup mindset, why money matters, emotional triggers",
          duration: "45 min",
          completed: false,
          unlocked: true,
          videos: [
            {
              id: 1,
              title: "Why Money Habits Matter",
              duration: "4 min",
              completed: false,
              subtopics: [
                {
                  id: 1,
                  title: "Your Beliefs Shape Behavior",
                  timestamp: "0:00",
                  description: "Understanding how childhood money beliefs control your financial decisions",
                  keyPoints: ["Family money patterns", "Cultural money messages", "Subconscious triggers"]
                },
                {
                  id: 2,
                  title: "RupeeSmart Helps Shift Them",
                  timestamp: "2:30",
                  description: "How our tools and approach transform your money mindset",
                  keyPoints: ["Awareness building", "Habit tracking", "Positive reinforcement"]
                }
              ]
            },
            {
              id: 2,
              title: "Emotional Money Triggers",
              duration: "5 min",
              completed: false,
              subtopics: [
                {
                  id: 3,
                  title: "Fear, Greed, and Comparison",
                  timestamp: "0:00",
                  description: "Identifying the three main emotional drivers of poor money decisions",
                  keyPoints: ["FOMO spending", "Status purchases", "Security hoarding"]
                },
                {
                  id: 4,
                  title: "Building Emotional Awareness",
                  timestamp: "3:00",
                  description: "Practical techniques to pause before financial decisions",
                  keyPoints: ["24-hour rule", "Value alignment check", "Future self visualization"]
                }
              ]
            },
            {
              id: 3,
              title: "Your Financial Why",
              duration: "3 min",
              completed: false,
              subtopics: [
                {
                  id: 5,
                  title: "Finding Your Money Purpose",
                  timestamp: "0:00",
                  description: "Connecting money goals to deeper life values and dreams",
                  keyPoints: ["Life vision", "Family security", "Freedom goals"]
                },
                {
                  id: 6,
                  title: "Creating Your Money Mission",
                  timestamp: "1:30",
                  description: "Writing a personal financial mission statement",
                  keyPoints: ["Clear objectives", "Value-based decisions", "Motivation anchor"]
                }
              ]
            }
          ],
          resources: [
            {
              id: 1,
              title: "Mindset Journal Tool",
              type: "template",
              description: "Daily money mindset tracker and reflection prompts",
              downloadUrl: "#"
            }
          ]
        },
        {
          id: 1,
          title: "💰 LEVEL 1: Budgeting & Control",
          description: "Budgeting, emergency funds, daily tracking",
          duration: "1 hour",
          completed: false,
          unlocked: false,
          videos: [
            {
              id: 4,
              title: "The 50/30/20 Rule Made Simple",
              duration: "5 min",
              completed: false,
              subtopics: [
                {
                  id: 7,
                  title: "Breaking Down Your Income",
                  timestamp: "0:00",
                  description: "How to categorize every rupee for maximum impact",
                  keyPoints: ["50% needs", "30% wants", "20% savings", "Flexibility rules"]
                },
                {
                  id: 8,
                  title: "Common Budgeting Mistakes",
                  timestamp: "3:00",
                  description: "Why most budgets fail and how to avoid the traps",
                  keyPoints: ["Unrealistic expectations", "No emergency buffer", "Ignoring small expenses"]
                }
              ]
            },
            {
              id: 5,
              title: "Emergency Fund in 90 Days",
              duration: "4 min",
              completed: false,
              subtopics: [
                {
                  id: 9,
                  title: "The 3-Month Safety Net",
                  timestamp: "0:00",
                  description: "Why 3 months of expenses is your financial armor",
                  keyPoints: ["Job loss protection", "Medical emergencies", "Peace of mind"]
                },
                {
                  id: 10,
                  title: "Where to Keep Emergency Money",
                  timestamp: "2:30",
                  description: "Best places for instant access without losing value",
                  keyPoints: ["Savings account", "Liquid funds", "Avoid fixed deposits"]
                }
              ]
            },
            {
              id: 6,
              title: "Daily Expense Tracking Hacks",
              duration: "3 min",
              completed: false,
              subtopics: [
                {
                  id: 11,
                  title: "The 2-Minute Rule",
                  timestamp: "0:00",
                  description: "How to track expenses without feeling overwhelmed",
                  keyPoints: ["Instant logging", "Photo receipts", "Weekly reviews"]
                },
                {
                  id: 12,
                  title: "Finding Money Leaks",
                  timestamp: "1:30",
                  description: "Discovering where your money actually goes",
                  keyPoints: ["Subscription audits", "Impulse purchases", "Hidden fees"]
                }
              ]
            }
          ],
          resources: [
            {
              id: 2,
              title: "Budget Planner Tool",
              type: "excel",
              description: "Interactive 50/30/20 budget calculator and tracker",
              downloadUrl: "#"
            },
            {
              id: 3,
              title: "Emergency Fund Calculator",
              type: "template",
              description: "Calculate your emergency fund target and track progress",
              downloadUrl: "#"
            }
          ]
        },
        {
          id: 2,
          title: "🏦 LEVEL 2: Banking & Credit",
          description: "Bank accounts, credit scores, loans",
          duration: "55 min",
          completed: false,
          unlocked: false,
          videos: [
            {
              id: 7,
              title: "Choosing the Right Bank Account",
              duration: "4 min",
              completed: false,
              subtopics: [
                {
                  id: 13,
                  title: "Savings vs Current vs Zero Balance",
                  timestamp: "0:00",
                  description: "Which account type fits your financial stage",
                  keyPoints: ["Minimum balance", "Interest rates", "Transaction limits"]
                },
                {
                  id: 14,
                  title: "Digital Banking Benefits",
                  timestamp: "2:30",
                  description: "Why online banks often offer better deals",
                  keyPoints: ["Lower fees", "Higher interest", "24/7 access"]
                }
              ]
            },
            {
              id: 8,
              title: "Credit Score Fundamentals",
              duration: "5 min",
              completed: false,
              subtopics: [
                {
                  id: 15,
                  title: "What Affects Your CIBIL Score",
                  timestamp: "0:00",
                  description: "The 5 factors that determine your creditworthiness",
                  keyPoints: ["Payment history", "Credit utilization", "Credit age", "Credit mix"]
                },
                {
                  id: 16,
                  title: "Building Credit from Zero",
                  timestamp: "3:00",
                  description: "Step-by-step guide for credit beginners",
                  keyPoints: ["Secured credit card", "Small loans", "Bill payments"]
                }
              ]
            },
            {
              id: 9,
              title: "Smart Loan Decisions",
              duration: "4 min",
              completed: false,
              subtopics: [
                {
                  id: 17,
                  title: "Good Debt vs Bad Debt",
                  timestamp: "0:00",
                  description: "Which loans help build wealth vs destroy it",
                  keyPoints: ["Home loans", "Education loans", "Credit card debt"]
                },
                {
                  id: 18,
                  title: "Loan Application Strategy",
                  timestamp: "2:30",
                  description: "How to get the best rates and terms",
                  keyPoints: ["Credit score optimization", "Income documentation", "Comparison shopping"]
                }
              ]
            }
          ]
        },
        {
          id: 3,
          title: "📈 LEVEL 3: Basics of Investing",
          description: "Mutual funds, SIPs, risk, compounding",
          duration: "1.2 hours",
          completed: false,
          unlocked: false,
          videos: [
            {
              id: 10,
              title: "Investing vs Saving",
              duration: "4 min",
              completed: false,
              subtopics: [
                {
                  id: 19,
                  title: "Why Savings Accounts Lose Money",
                  timestamp: "0:00",
                  description: "How inflation silently steals your wealth",
                  keyPoints: ["Inflation reality", "Real returns", "Purchasing power"]
                },
                {
                  id: 20,
                  title: "The Magic of Compounding",
                  timestamp: "2:30",
                  description: "How small amounts become large fortunes",
                  keyPoints: ["Time advantage", "Compound interest", "Einstein's 8th wonder"]
                }
              ]
            },
            {
              id: 11,
              title: "Mutual Funds Made Simple",
              duration: "5 min",
              completed: false,
              subtopics: [
                {
                  id: 21,
                  title: "What Are Mutual Funds Really",
                  timestamp: "0:00",
                  description: "Pool money concept explained in plain language",
                  keyPoints: ["Professional management", "Diversification", "Shared costs"]
                },
                {
                  id: 22,
                  title: "Equity vs Debt Funds",
                  timestamp: "3:00",
                  description: "Risk and return profiles of different fund types",
                  keyPoints: ["Growth potential", "Safety levels", "Time horizons"]
                }
              ]
            },
            {
              id: 12,
              title: "SIP - Your Wealth Machine",
              duration: "6 min",
              completed: false,
              subtopics: [
                {
                  id: 23,
                  title: "Why SIP Beats Lump Sum",
                  timestamp: "0:00",
                  description: "Rupee cost averaging and market timing myths",
                  keyPoints: ["Average cost benefit", "Discipline building", "Market volatility handling"]
                },
                {
                  id: 24,
                  title: "Starting Your First SIP",
                  timestamp: "3:30",
                  description: "Practical steps to begin systematic investing",
                  keyPoints: ["Amount selection", "Fund choice", "Auto-debit setup"]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const toggleVideo = (videoId: number) => {
    setExpandedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group h-fit">
      <div className="relative">
        <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-t-lg flex items-center justify-center">
          <Play className="w-10 h-10 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-white/90 text-xs">
            {course.level}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <Progress value={course.completionRate} className="h-1" />
          <div className="text-white text-xs mt-1">{course.completionRate}% Complete</div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>
        </div>
        
        <h3 className="text-base font-semibold mb-1 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-1 mb-2 text-xs text-gray-600">
          <span>By {course.instructor}</span>
        </div>

        <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {course.totalDuration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {course.students.toLocaleString()}
          </div>
        </div>

        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {course.skills.slice(0, 2).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {course.skills.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{course.skills.length - 2} more
              </Badge>
            )}
          </div>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
          Start Learning
        </Button>
      </CardContent>
    </Card>
  );

  const CourseDetail = ({ course }: { course: Course }) => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedCourse(null)}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{course.title}</h1>
              <p className="text-gray-600">{course.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
        {/* Main Video Area - 3/4 width */}
        <div className="lg:col-span-3 bg-black">
          <div className="aspect-video bg-black flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="w-20 h-20 mx-auto mb-4 opacity-60" />
              <h3 className="text-xl font-semibold mb-2">Level 0: Orientation & Money Mindset</h3>
              <p className="text-gray-300">Click any video from the course content to start learning</p>
            </div>
          </div>
          
          {/* Video Description Area */}
          <div className="bg-white p-6">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold mb-4">Welcome to Your Financial Journey</h2>
              <p className="text-gray-600 mb-6">
                Start your transformation from financial novice to wealth master. This comprehensive course 
                is designed with a gamified approach that makes learning about money engaging and practical.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <div className="font-semibold">{course.totalDuration}</div>
                  <div className="text-sm text-gray-600">Total Duration</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Users className="w-8 h-8 mx-auto text-green-600 mb-2" />
                  <div className="font-semibold">{course.students.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Award className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                  <div className="font-semibold">Certificate</div>
                  <div className="text-sm text-gray-600">Upon Completion</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Skills You'll Master</h3>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Sidebar - 1/4 width */}
        <div className="lg:col-span-1 bg-white border-l border-gray-200 max-h-screen overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-lg">Course Content</h3>
            <p className="text-sm text-gray-600">{course.modules.length} levels • {course.totalDuration}</p>
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{course.completionRate}%</span>
              </div>
              <Progress value={course.completionRate} className="h-2" />
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {course.modules.map((module) => (
              <div key={module.id} className="">
                <div 
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${module.unlocked ? '' : 'opacity-50'}`}
                  onClick={() => module.unlocked && toggleModule(module.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {expandedModules.includes(module.id) ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      {module.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full border-2 ${module.unlocked ? 'border-blue-500' : 'border-gray-300'}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{module.title}</h4>
                      <p className="text-xs text-gray-500">{module.videos.length} videos • {module.duration}</p>
                    </div>
                  </div>
                </div>
                
                {expandedModules.includes(module.id) && (
                  <div className="bg-gray-50">
                    {module.videos.map((video) => (
                      <div key={video.id}>
                        <div 
                          className="px-4 py-3 pl-12 cursor-pointer hover:bg-gray-100 transition-colors border-l-2 border-transparent hover:border-l-blue-500"
                          onClick={() => setSelectedVideo(video.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Play className="w-3 h-3 text-gray-500" />
                            <div className="flex-1">
                              <h5 className="font-medium text-sm">{video.title}</h5>
                              <p className="text-xs text-gray-500">{video.duration}</p>
                            </div>
                            {video.completed && <CheckCircle className="w-3 h-3 text-green-500" />}
                          </div>
                        </div>
                        
                        {expandedVideos.includes(video.id) && (
                          <div className="px-4 py-2 pl-16 bg-gray-100">
                            {video.subtopics.map((subtopic) => (
                              <div key={subtopic.id} className="py-1">
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="font-medium text-blue-600">{subtopic.timestamp}</span>
                                  <span className="text-gray-600">{subtopic.title}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Module Resources */}
                    {module.resources && module.resources.length > 0 && (
                      <div className="px-4 py-3 pl-12 bg-blue-50">
                        <h6 className="text-xs font-semibold text-blue-800 mb-2 flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          Resources
                        </h6>
                        {module.resources.map((resource) => (
                          <div key={resource.id} className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <FileText className="w-3 h-3 text-blue-600" />
                              <span className="text-xs font-medium">{resource.title}</span>
                            </div>
                            <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                              Get
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const LevelDetail = ({ levelKey }: { levelKey: string }) => {
    const level = levelData[levelKey as keyof typeof levelData];
    if (!level) return null;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-slate-800 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedLevel(null)}
                className="text-white hover:bg-slate-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{level.title}</h1>
                <p className="text-slate-300">{level.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Video Player */}
            <div className="lg:col-span-2">
              <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-6">
                <div className="text-center text-white">
                  <Play className="h-16 w-16 mx-auto mb-4 opacity-60" />
                  <h3 className="text-xl font-semibold mb-2">{level.videos[0]?.title}</h3>
                  <p className="text-gray-300">Click any video from the course content to start learning</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Welcome to Your Financial Journey</h2>
                <p className="text-gray-600 mb-4">
                  Start your transformation from financial novice to wealth master. This
                  comprehensive course is designed with a gamified approach that makes learning
                  about money engaging and practical.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Course Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Content</CardTitle>
                  <p className="text-sm text-gray-600">{level.videos.length} videos • {level.videos.reduce((acc, v) => acc + parseInt(v.duration), 0)} min</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    {level.videos.map((video, index) => (
                      <div key={video.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                          {index === 0 ? (
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          ) : (
                            <div className="w-3 h-3 border-2 border-gray-300 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{video.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{video.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{video.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (selectedLevel) {
    return <LevelDetail levelKey={selectedLevel} />;
  }

  if (selectedCourse) {
    const course = courses.find(c => c.id === selectedCourse);
    if (!course) return null;
    return <CourseDetail course={course} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-slate-700 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold mb-1">RupeeSmart Financial Mastery</h1>
              <p className="text-base mb-4">Complete Financial Freedom Journey</p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                onClick={() => setSelectedCourse(1)}
              >
                Resume Course
              </Button>
            </div>
            
            {/* Language Dropdown */}
            <div className="relative">
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-slate-600 text-white border border-slate-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                <option value="English">English</option>
                <option value="Hindi">हिंदी</option>
                <option value="Marathi">मराठी</option>
                <option value="Bengali">বাংলা</option>
              </select>
              <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-xl font-bold mb-4">Welcome to RupeeSmart Financial Mastery!</h2>
              
              {/* Course Overview */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                  <div className="w-10 h-10 bg-red-500 rounded-md flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">Welcome To The Course!</h3>
                    <p className="text-xs text-gray-600">Hello and welcome to RupeeSmart Financial Mastery! I'm thrilled you've joined this program.</p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>

                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                  <div className="w-10 h-10 bg-red-500 rounded-md flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">Join The Private Mastermind Group!</h3>
                    <p className="text-xs text-gray-600">Join The Facebook Group: https://www.facebook.com/groups/272109120126823/ Before asking questions.</p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>

                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                  <div className="w-10 h-10 bg-red-500 rounded-md flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">How to Use This Course</h3>
                    <p className="text-xs text-gray-600">In this video I'll walk you through how to maximize your experience with RupeeSmart.</p>
                  </div>
                </div>
              </div>

              {/* Course Levels */}
              <div>
                <h3 className="text-sm font-bold mb-2">Course Curriculum</h3>
                <div className="space-y-1">
                  <div 
                    className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-md cursor-pointer hover:bg-blue-100 transition-colors"
                    onClick={() => setSelectedLevel("0")}
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                      <Home className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">LEVEL 0: Welcome to RupeeSmart</h4>
                      <p className="text-xs text-gray-600">What is RupeeSmart? Why Learn About Money? How This Learning Journey Works</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">3 videos</div>
                      <div className="text-xs text-gray-500">12 min</div>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setSelectedLevel("0.5")}
                  >
                    <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">LEVEL 0.5: Money Basics for Absolute Beginners</h4>
                      <p className="text-xs text-gray-600">What is Money Used For? Wants vs Needs, Pay Yourself First, Cash Flow Basics</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">10 videos</div>
                      <div className="text-xs text-gray-500">35 min</div>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setSelectedLevel("1")}
                  >
                    <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                      <Calculator className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">LEVEL 1: Budgeting & Control</h4>
                      <p className="text-xs text-gray-600">50-30-20 Rule, Emergency Fund, Daily Expense Tracking</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">6 videos</div>
                      <div className="text-xs text-gray-500">23 min</div>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setSelectedLevel("2")}
                  >
                    <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">LEVEL 2: Banking & Credit</h4>
                      <p className="text-xs text-gray-600">Bank Accounts, Credit Score, Smart Loan Decisions</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">6 videos</div>
                      <div className="text-xs text-gray-500">28 min</div>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setSelectedCourse(1)}
                  >
                    <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">LEVEL 3: Introduction to Investing</h4>
                      <p className="text-xs text-gray-600">Why Investing is Non-Negotiable, Power of Compounding, Investment Options</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">6 videos</div>
                      <div className="text-xs text-gray-500">25 min</div>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setSelectedCourse(1)}
                  >
                    <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">LEVEL 4: Indian Stock Market Basics</h4>
                      <p className="text-xs text-gray-600">Stock Market, Shares, Sensex & Nifty, First Stock Purchase</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">6 videos</div>
                      <div className="text-xs text-gray-500">22 min</div>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setSelectedCourse(1)}
                  >
                    <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                      <Landmark className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">LEVEL 5: Gold, Bonds & Alternate Assets</h4>
                      <p className="text-xs text-gray-600">Digital Gold, Government Bonds, Real Estate, Crypto Basics</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">5 videos</div>
                      <div className="text-xs text-gray-500">18 min</div>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setSelectedCourse(1)}
                  >
                    <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                      <Crosshair className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">LEVEL 6: Goal Setting & Future Planning</h4>
                      <p className="text-xs text-gray-600">Financial Goals, SMART Goals, Investment Planning, Milestone Tracking</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">5 videos</div>
                      <div className="text-xs text-gray-500">20 min</div>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setSelectedCourse(1)}
                  >
                    <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                      <Tax className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">LEVEL 7: Taxation Simplified</h4>
                      <p className="text-xs text-gray-600">Income Tax Basics, Tax-Saving Investments, ITR Filing, GST</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">5 videos</div>
                      <div className="text-xs text-gray-500">22 min</div>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setSelectedCourse(1)}
                  >
                    <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">LEVEL 8: Insurance & Protection</h4>
                      <p className="text-xs text-gray-600">Life Insurance, Health Insurance, Vehicle Insurance, Smart Buying</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">5 videos</div>
                      <div className="text-xs text-gray-500">19 min</div>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setSelectedCourse(1)}
                  >
                    <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                      <Retirement className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">LEVEL 9: Retirement Planning</h4>
                      <p className="text-xs text-gray-600">Early Planning, NPS/EPF/PPF, Retirement Calculator, Pension Plans</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">4 videos</div>
                      <div className="text-xs text-gray-500">16 min</div>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setSelectedCourse(1)}
                  >
                    <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">LEVEL 10: Financial Mindset & Habits</h4>
                      <p className="text-xs text-gray-600">Rich vs Poor Mindset, Wealthy Habits, Community, Monthly Routine</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">5 videos</div>
                      <div className="text-xs text-gray-500">21 min</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-red-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">RS</span>
                </div>
                <h3 className="font-bold text-lg">RupeeSmart Financial Mastery</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-1">3 of 60 Lessons Completed</div>
                  <Progress value={5} className="h-2" />
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Instructor</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">RS</span>
                    </div>
                    <div>
                      <div className="font-medium">RupeeSmart</div>
                      <div className="text-sm text-gray-600">Financial Expert</div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  Hey there! RupeeSmart helps you master personal finance through practical, gamified learning. Our goal is to make financial literacy accessible and actionable for everyone in India.
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setSelectedCourse(1)}
                >
                  Start Learning
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}