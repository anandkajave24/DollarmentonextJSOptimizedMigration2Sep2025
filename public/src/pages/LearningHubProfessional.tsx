import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, Play, CheckCircle, Lock, Trophy, BookOpen, Award, Users, Star, Download, FileText } from "lucide-react";
import { Link } from "wouter";

interface Course {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  students: number;
  price: number;
  originalPrice?: number;
  category: string;
  modules: CourseModule[];
  skills: string[];
  certificate: boolean;
  preview: boolean;
  bestseller?: boolean;
  new?: boolean;
}

interface CourseModule {
  id: number;
  title: string;
  lessons: Lesson[];
  duration: string;
  locked: boolean;
  completed: boolean;
}

interface Lesson {
  id: number;
  title: string;
  type: "video" | "reading" | "quiz" | "assignment" | "live" | "resource";
  duration: string;
  completed: boolean;
  locked: boolean;
  resources?: string[];
}

export default function LearningHubProfessional() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("courses");

  const courses: Course[] = [
    {
      id: 1,
      title: "Complete Personal Finance Mastery",
      subtitle: "From Zero to Financial Freedom",
      description: "Master personal finance, budgeting, investing, and wealth building with India's most comprehensive course. Learn from industry experts with real-world case studies.",
      instructor: "Priya Sharma, CFA",
      duration: "12.5 hours",
      level: "Beginner",
      rating: 4.8,
      students: 15420,
      price: 2999,
      originalPrice: 4999,
      category: "Personal Finance",
      bestseller: true,
      certificate: true,
      preview: true,
      skills: ["Budgeting", "Investment Planning", "Tax Optimization", "Goal Setting"],
      modules: [
        {
          id: 1,
          title: "Financial Foundation & Mindset",
          duration: "2.5 hours",
          locked: false,
          completed: false,
          lessons: [
            { id: 1, title: "Welcome & Course Overview", type: "video", duration: "15 min", completed: false, locked: false },
            { id: 2, title: "Your Money Mindset Assessment", type: "quiz", duration: "10 min", completed: false, locked: false },
            { id: 3, title: "Building Financial Discipline", type: "video", duration: "25 min", completed: false, locked: false },
            { id: 4, title: "Setting SMART Financial Goals", type: "assignment", duration: "30 min", completed: false, locked: false },
            { id: 5, title: "Resources: Goal Setting Templates", type: "resource", duration: "5 min", completed: false, locked: false, resources: ["Goal Worksheet", "Budget Template"] }
          ]
        },
        {
          id: 2,
          title: "Budgeting & Money Management",
          duration: "3 hours",
          locked: false,
          completed: false,
          lessons: [
            { id: 6, title: "The 50/30/20 Rule Explained", type: "video", duration: "20 min", completed: false, locked: false },
            { id: 7, title: "Expense Tracking Methods", type: "video", duration: "18 min", completed: false, locked: false },
            { id: 8, title: "Building Your First Budget", type: "assignment", duration: "45 min", completed: false, locked: false },
            { id: 9, title: "Emergency Fund Strategies", type: "video", duration: "22 min", completed: false, locked: false },
            { id: 10, title: "Case Study: Budget Transformation", type: "reading", duration: "15 min", completed: false, locked: false }
          ]
        },
        {
          id: 3,
          title: "Investment Fundamentals",
          duration: "4 hours",
          locked: true,
          completed: false,
          lessons: [
            { id: 11, title: "Introduction to Indian Markets", type: "video", duration: "30 min", completed: false, locked: true },
            { id: 12, title: "Mutual Funds Deep Dive", type: "video", duration: "35 min", completed: false, locked: true },
            { id: 13, title: "SIP Strategy & Implementation", type: "video", duration: "25 min", completed: false, locked: true },
            { id: 14, title: "Portfolio Construction Workshop", type: "assignment", duration: "60 min", completed: false, locked: true },
            { id: 15, title: "Live Q&A: Investment Strategies", type: "live", duration: "45 min", completed: false, locked: true }
          ]
        },
        {
          id: 4,
          title: "Tax Planning & Optimization",
          duration: "2.5 hours",
          locked: true,
          completed: false,
          lessons: [
            { id: 16, title: "Income Tax Basics", type: "video", duration: "25 min", completed: false, locked: true },
            { id: 17, title: "Section 80C Investments", type: "video", duration: "20 min", completed: false, locked: true },
            { id: 18, title: "Tax Filing Masterclass", type: "video", duration: "30 min", completed: false, locked: true },
            { id: 19, title: "Tax Saving Calculator", type: "assignment", duration: "20 min", completed: false, locked: true }
          ]
        },
        {
          id: 5,
          title: "Wealth Building & Retirement",
          duration: "2.5 hours",
          locked: true,
          completed: false,
          lessons: [
            { id: 20, title: "Retirement Corpus Calculation", type: "video", duration: "25 min", completed: false, locked: true },
            { id: 21, title: "EPF vs PPF vs NPS", type: "video", duration: "30 min", completed: false, locked: true },
            { id: 22, title: "Creating Your Retirement Plan", type: "assignment", duration: "45 min", completed: false, locked: true },
            { id: 23, title: "Final Assessment", type: "quiz", duration: "30 min", completed: false, locked: true }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Advanced Stock Market Mastery",
      subtitle: "Professional Trading & Analysis",
      description: "Master technical analysis, fundamental analysis, and advanced trading strategies used by professional traders and analysts.",
      instructor: "Rajesh Kumar, CFA, FRM",
      duration: "18 hours",
      level: "Advanced",
      rating: 4.9,
      students: 8750,
      price: 4999,
      originalPrice: 7999,
      category: "Investing",
      certificate: true,
      preview: true,
      skills: ["Technical Analysis", "Fundamental Analysis", "Risk Management", "Portfolio Strategy"],
      modules: [
        {
          id: 1,
          title: "Market Structure & Psychology",
          duration: "3 hours",
          locked: false,
          completed: false,
          lessons: [
            { id: 1, title: "Indian Stock Market Overview", type: "video", duration: "30 min", completed: false, locked: false },
            { id: 2, title: "Market Psychology & Behavioral Finance", type: "video", duration: "40 min", completed: false, locked: false },
            { id: 3, title: "Reading Market Sentiment", type: "video", duration: "35 min", completed: false, locked: false },
            { id: 4, title: "Market Analysis Assignment", type: "assignment", duration: "45 min", completed: false, locked: false }
          ]
        },
        {
          id: 2,
          title: "Technical Analysis Mastery",
          duration: "6 hours",
          locked: true,
          completed: false,
          lessons: [
            { id: 5, title: "Chart Patterns & Indicators", type: "video", duration: "50 min", completed: false, locked: true },
            { id: 6, title: "Moving Averages & Trends", type: "video", duration: "45 min", completed: false, locked: true },
            { id: 7, title: "Support & Resistance Levels", type: "video", duration: "40 min", completed: false, locked: true },
            { id: 8, title: "Volume Analysis Techniques", type: "video", duration: "35 min", completed: false, locked: true },
            { id: 9, title: "Technical Analysis Workshop", type: "assignment", duration: "90 min", completed: false, locked: true },
            { id: 10, title: "Live Trading Session", type: "live", duration: "60 min", completed: false, locked: true }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Tax Planning Strategies 2024",
      subtitle: "Maximize Savings Legally",
      description: "Complete guide to Indian tax planning, optimization strategies, and legal ways to minimize tax liability for salaried and business professionals.",
      instructor: "Anita Desai, CA",
      duration: "8 hours",
      level: "Intermediate",
      rating: 4.7,
      students: 12300,
      price: 1999,
      originalPrice: 2999,
      category: "Tax Planning",
      new: true,
      certificate: true,
      preview: true,
      skills: ["Tax Planning", "Investment Selection", "Deduction Optimization", "ITR Filing"],
      modules: [
        {
          id: 1,
          title: "Tax Fundamentals & Regimes",
          duration: "2 hours",
          locked: false,
          completed: false,
          lessons: [
            { id: 1, title: "Old vs New Tax Regime", type: "video", duration: "25 min", completed: false, locked: false },
            { id: 2, title: "Income Tax Slabs & Calculations", type: "video", duration: "30 min", completed: false, locked: false },
            { id: 3, title: "Regime Selection Strategy", type: "assignment", duration: "20 min", completed: false, locked: false }
          ]
        }
      ]
    }
  ];

  const categories = ["All Courses", "Personal Finance", "Investing", "Tax Planning", "Insurance", "Real Estate"];

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
          <Play className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div className="absolute top-3 left-3 flex gap-2">
          {course.bestseller && <Badge className="bg-orange-500">Bestseller</Badge>}
          {course.new && <Badge className="bg-green-500">New</Badge>}
        </div>
        
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-white">
            {course.level}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>
        </div>
        
        <h3 className="text-lg font-bold mb-1 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-1">
          {course.subtitle}
        </p>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <span>By {course.instructor}</span>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {course.rating}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {course.students.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">₹{course.price}</span>
            {course.originalPrice && (
              <span className="text-lg text-gray-500 line-through">₹{course.originalPrice}</span>
            )}
          </div>
          {course.certificate && (
            <Badge variant="outline" className="text-xs">
              <Award className="w-3 h-3 mr-1" />
              Certificate
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Enroll Now
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Preview
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CourseDetail = ({ course }: { course: Course }) => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
              <p className="text-lg text-gray-600 mb-4">{course.subtitle}</p>
              <p className="text-gray-700 mb-4">{course.description}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-gray-600">({course.students.toLocaleString()} students)</span>
                </div>
                <Badge variant="outline">{course.level}</Badge>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration} total
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {course.modules.length} modules
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  Certificate included
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">What you'll learn:</h4>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="ml-6">
              <Card className="w-80">
                <CardContent className="p-4">
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold">₹{course.price}</span>
                      {course.originalPrice && (
                        <span className="text-xl text-gray-500 line-through">₹{course.originalPrice}</span>
                      )}
                    </div>
                    {course.originalPrice && (
                      <Badge className="bg-red-500">
                        {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                      Enroll Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      Preview Course
                    </Button>
                    <Button variant="outline" className="w-full">
                      Add to Wishlist
                    </Button>
                  </div>
                  
                  <div className="mt-4 text-center text-sm text-gray-600">
                    30-day money-back guarantee
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {course.modules.map((module) => (
              <Card key={module.id} className={`border ${module.locked ? 'bg-gray-50' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {module.locked ? (
                        <Lock className="w-5 h-5 text-gray-400" />
                      ) : module.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-blue-500" />
                      )}
                      <div>
                        <h4 className={`font-semibold ${module.locked ? 'text-gray-400' : ''}`}>
                          Module {module.id}: {module.title}
                        </h4>
                        <p className="text-sm text-gray-600">{module.lessons.length} lessons • {module.duration}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      {module.locked ? 'Locked' : 'Expand'}
                    </Button>
                  </div>
                </CardHeader>
                
                {!module.locked && (
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {module.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50">
                          <div className="w-6 h-6 flex items-center justify-center">
                            {lesson.type === 'video' && <Play className="w-4 h-4 text-blue-500" />}
                            {lesson.type === 'quiz' && <Trophy className="w-4 h-4 text-yellow-500" />}
                            {lesson.type === 'reading' && <FileText className="w-4 h-4 text-green-500" />}
                            {lesson.type === 'assignment' && <BookOpen className="w-4 h-4 text-purple-500" />}
                            {lesson.type === 'live' && <Users className="w-4 h-4 text-red-500" />}
                            {lesson.type === 'resource' && <Download className="w-4 h-4 text-gray-500" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{lesson.title}</span>
                              <span className="text-xs text-gray-500">{lesson.duration}</span>
                            </div>
                          </div>
                          {lesson.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">RupeeSmart Academy</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="courses">All Courses</TabsTrigger>
            <TabsTrigger value="my-learning">My Learning</TabsTrigger>
            <TabsTrigger value="instructors">Instructors</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            {selectedCourse ? (
              <div>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedCourse(null)}
                  className="mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Courses
                </Button>
                <CourseDetail course={courses.find(c => c.id === selectedCourse)!} />
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      size="sm"
                      className="hover:bg-blue-50"
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div key={course.id} onClick={() => setSelectedCourse(course.id)}>
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-learning">
            <Card>
              <CardContent className="p-8 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Start Your Learning Journey</h3>
                <p className="text-gray-600 mb-6">Enroll in courses to track your progress here</p>
                <Button onClick={() => setActiveTab("courses")}>Browse Courses</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructors">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Priya Sharma, CFA", "Rajesh Kumar, CFA, FRM", "Anita Desai, CA"].map((instructor, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{instructor}</h3>
                    <p className="text-gray-600 text-sm mb-4">Expert Financial Advisor</p>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                      <span>4.8★</span>
                      <span>10+ courses</span>
                      <span>50K+ students</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certificates">
            <Card>
              <CardContent className="p-8 text-center">
                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Earn Professional Certificates</h3>
                <p className="text-gray-600 mb-6">Complete courses to earn industry-recognized certificates</p>
                <Button onClick={() => setActiveTab("courses")}>View Courses</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}