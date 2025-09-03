import { TabPills, TabItem } from "../components/ui/tab-pills";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { useToast } from "../hooks/use-toast";

interface LearningModule {
  id: number;
  title: string;
  description: string;
  ageGroup: "5-8" | "9-12" | "13-16";
  difficulty: "beginner" | "intermediate" | "advanced";
  progress: number;
  lessons: Lesson[];
  imageUrl: string;
  duration: number; // in minutes
}

interface Lesson {
  id: number;
  title: string;
  type: "story" | "game" | "quiz" | "activity" | "video";
  duration: number; // in minutes
  completed: boolean;
}

interface ActivityCard {
  id: number;
  title: string;
  description: string;
  type: "money-game" | "saving-challenge" | "quiz" | "story";
  ageGroup: "5-8" | "9-12" | "13-16";
  imageUrl: string;
  isNew: boolean;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  progress: number; // 0-100
  date?: string;
}

export default function RupeesmartKids() {
  const { toast } = useToast();
  const [activeAgeGroup, setActiveAgeGroup] = useState<"all" | "5-8" | "9-12" | "13-16">("all");
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  
  // Filter modules based on active age group
  const filteredModules = modules.filter(module => 
    activeAgeGroup === "all" || module.ageGroup === activeAgeGroup
  );
  
  // Filter activities based on active age group
  const filteredActivities = activities.filter(activity => 
    activeAgeGroup === "all" || activity.ageGroup === activeAgeGroup
  );
  
  // Handle marking a lesson as completed
  const handleCompleteLesson = (moduleId: number, lessonId: number) => {
    // In a real application, this would be connected to an API
    // For this demo, we'll just update our local state
    
    toast({
      title: "Lesson Completed",
      description: "Great job! Your progress has been saved.",
    });
  };
  
  // Calculate overall progress
  const calculateOverallProgress = () => {
    const totalLessons = modules.reduce(
      (total, module) => total + module.lessons.length, 
      0
    );
    
    const completedLessons = modules.reduce(
      (total, module) => total + module.lessons.filter(lesson => lesson.completed).length, 
      0
    );
    
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };
  
  return (
    <div className="px-4 py-6">
      {selectedModule ? (
        <ModuleDetailView 
          module={selectedModule} 
          onBack={() => setSelectedModule(null)} 
          onComplete={handleCompleteLesson}
        />
      ) : (
        <>
          <div className="flex items-center mb-6">
            <button 
              onClick={() => window.history.back()}
              className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
            >
              <span className="material-icons text-sm">arrow_back</span>
            </button>
            <h1 className="text-2xl font-bold">RupeeSmart Kids</h1>
          </div>
          
          {/* Kid-friendly welcome card */}
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold text-blue-700 mb-2">Welcome to RupeeSmart Kids! 👋</h2>
                  <p className="text-blue-600 mb-4">Learn about money in a fun way with games, stories, and activities!</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-green-500">Games</Badge>
                    <Badge className="bg-yellow-500">Stories</Badge>
                    <Badge className="bg-blue-500">Activities</Badge>
                    <Badge className="bg-purple-500">Quizzes</Badge>
                    <Badge className="bg-pink-500">Rewards</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-blue-700">Your Learning Progress</span>
                        <span className="font-medium text-blue-700">{calculateOverallProgress()}%</span>
                      </div>
                      <Progress value={calculateOverallProgress()} className="h-2" />
                    </div>
                    
                    <p className="text-xs text-blue-600">
                      Keep learning to earn more badges and complete all modules!
                    </p>
                  </div>
                </div>
                
                <div className="hidden md:block">
                  {/* This would be an actual image in a real application */}
                  <div className="aspect-square bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="material-icons text-7xl text-blue-500">school</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Age group selection */}
          <div className="mb-6">
            <div className="flex overflow-x-auto space-x-2 py-2">
              <Button 
                variant={activeAgeGroup === "all" ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setActiveAgeGroup("all")}
              >
                All Ages
              </Button>
              <Button 
                variant={activeAgeGroup === "5-8" ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setActiveAgeGroup("5-8")}
              >
                Ages 5-8
              </Button>
              <Button 
                variant={activeAgeGroup === "9-12" ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setActiveAgeGroup("9-12")}
              >
                Ages 9-12
              </Button>
              <Button 
                variant={activeAgeGroup === "13-16" ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setActiveAgeGroup("13-16")}
              >
                Ages 13-16
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="modules" className="w-full">
            <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-transparent p-0 border-0 w-full">
              <TabsTrigger value="modules" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Learning Modules</TabsTrigger>
              <TabsTrigger value="activities" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Fun Activities</TabsTrigger>
              <TabsTrigger value="achievements" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Achievements</TabsTrigger>
            </TabsList>
            
            {/* Learning Modules Tab */}
            <TabsContent value="modules">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {filteredModules.map(module => (
                  <Card 
                    key={module.id} 
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedModule(module)}
                  >
                    <div className="h-40 bg-blue-100 relative">
                      <div className="absolute bottom-2 right-2">
                        <Badge 
                          className={
                            module.difficulty === "beginner" 
                              ? "bg-green-500" 
                              : module.difficulty === "intermediate" 
                                ? "bg-yellow-500" 
                                : "bg-red-500"
                          }
                        >
                          {module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-icons text-5xl text-blue-500">school</span>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2 bg-gray-200 dark:bg-gray-800 border-b">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-black dark:text-white">{module.title}</CardTitle>
                        <Badge variant="outline">Ages {module.ageGroup}</Badge>
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pb-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    </CardContent>
                    
                    <CardFooter className="border-t pt-3">
                      <div className="flex justify-between items-center w-full text-sm text-gray-500">
                        <div className="flex items-center">
                          <span className="material-icons text-xs mr-1">schedule</span>
                          {module.duration} min
                        </div>
                        <div className="flex items-center">
                          <span className="material-icons text-xs mr-1">menu_book</span>
                          {module.lessons.length} lessons
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredModules.length === 0 && (
                <div className="text-center py-10">
                  <span className="material-icons text-4xl text-gray-400 mb-2">school</span>
                  <h3 className="text-lg font-medium mb-1">No modules found</h3>
                  <p className="text-sm text-gray-500">Try selecting a different age group</p>
                </div>
              )}
              
              <div className="mt-6">
                <h2 className="text-lg font-medium mb-4">Learning Path Recommendations</h2>
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2 bg-gray-200 dark:bg-gray-800 border-b">
                      <CardTitle className="text-base">Recommended Next Steps</CardTitle>
                      <CardDescription>Based on your progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                            <span className="material-icons text-green-600 text-sm">arrow_forward</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">Complete "Money Basics" Module</p>
                            <p className="text-xs text-gray-500">Finish the remaining lessons to build a strong foundation</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                            <span className="material-icons text-blue-600 text-sm">arrow_forward</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">Try the "Saving Challenge" Activity</p>
                            <p className="text-xs text-gray-500">Put your savings knowledge into practice</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                            <span className="material-icons text-purple-600 text-sm">arrow_forward</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">Move to "Smart Spending" Module</p>
                            <p className="text-xs text-gray-500">Learn how to make wise spending decisions</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Fun Activities Tab */}
            <TabsContent value="activities">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {filteredActivities.map(activity => (
                  <Card key={activity.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                    <div className="h-40 bg-yellow-100 relative">
                      {activity.isNew && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-green-500">NEW</Badge>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-icons text-5xl text-yellow-500">
                          {activity.type === "money-game" ? "videogame_asset" :
                           activity.type === "saving-challenge" ? "savings" :
                           activity.type === "quiz" ? "quiz" : "auto_stories"}
                        </span>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2 bg-gray-200 dark:bg-gray-800 border-b">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-black dark:text-white">{activity.title}</CardTitle>
                        <Badge variant="outline">Ages {activity.ageGroup}</Badge>
                      </div>
                      <CardDescription>{activity.description}</CardDescription>
                    </CardHeader>
                    
                    <CardFooter className="border-t pt-3">
                      <Button className="w-full">Start Activity</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredActivities.length === 0 && (
                <div className="text-center py-10">
                  <span className="material-icons text-4xl text-gray-400 mb-2">extension</span>
                  <h3 className="text-lg font-medium mb-1">No activities found</h3>
                  <p className="text-sm text-gray-500">Try selecting a different age group</p>
                </div>
              )}
              
              <div className="mt-6">
                <h2 className="text-lg font-medium mb-4">Monthly Challenges</h2>
                
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
                  <CardHeader className="pb-2 bg-gray-200 dark:bg-gray-800 border-b">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-purple-700">April Savings Challenge</CardTitle>
                      <Badge className="bg-purple-500">15 DAYS LEFT</Badge>
                    </div>
                    <CardDescription className="text-purple-600">See how much you can save this month!</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1 text-purple-700">
                        <span>Current Savings: ₹250</span>
                        <span>Goal: ₹500</span>
                      </div>
                      <Progress value={50} className="h-3" indicatorClassName="bg-purple-500" />
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 mb-4">
                      <h4 className="font-medium text-sm text-purple-700 mb-2">Challenge Steps:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full border-2 border-purple-500 flex items-center justify-center mr-2">
                            <span className="material-icons text-purple-500 text-xs">check</span>
                          </div>
                          <p className="text-xs text-purple-700">Set a savings goal for the month</p>
                        </div>
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full border-2 border-purple-500 flex items-center justify-center mr-2">
                            <span className="material-icons text-purple-500 text-xs">check</span>
                          </div>
                          <p className="text-xs text-purple-700">Create a plan for how you'll save</p>
                        </div>
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full border-2 border-purple-500 mr-2"></div>
                          <p className="text-xs text-purple-700">Record your savings every week</p>
                        </div>
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full border-2 border-purple-500 mr-2"></div>
                          <p className="text-xs text-purple-700">Reach your goal by the end of the month</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t border-purple-200 pt-3">
                    <Button className="w-full bg-purple-500 hover:bg-purple-600">Update Progress</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <div className="mb-6">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-yellow-700">Your Achievement Score</h3>
                    <p className="text-yellow-600 text-sm">Keep learning to earn more badges!</p>
                  </div>
                  <div className="text-3xl font-bold text-yellow-700">680</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {achievements.map(achievement => (
                  <Card 
                    key={achievement.id} 
                    className={`${achievement.unlocked ? "" : "opacity-70"}`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto rounded-full ${
                        achievement.unlocked 
                          ? "bg-yellow-100" 
                          : "bg-gray-100"
                      } flex items-center justify-center mb-4`}>
                        <span className={`material-icons text-3xl ${
                          achievement.unlocked 
                            ? "text-yellow-500" 
                            : "text-gray-400"
                        }`}>
                          {achievement.iconName}
                        </span>
                      </div>
                      
                      <h3 className="font-medium mb-1">{achievement.title}</h3>
                      <p className="text-xs text-gray-500 mb-3">{achievement.description}</p>
                      
                      {achievement.unlocked ? (
                        <Badge className="bg-green-500">
                          Unlocked {achievement.date}
                        </Badge>
                      ) : (
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-1.5" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6">
                <h2 className="text-lg font-medium mb-4">Your Badge Collection</h2>
                
                <Card>
                  <CardContent className="py-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                      {badgeCollection.map((badge, index) => (
                        <div key={index} className="text-center">
                          <div className={`w-12 h-12 mx-auto rounded-full ${
                            badge.unlocked 
                              ? "bg-indigo-100" 
                              : "bg-gray-100"
                          } flex items-center justify-center mb-2`}>
                            <span className={`material-icons ${
                              badge.unlocked 
                                ? "text-indigo-500" 
                                : "text-gray-300"
                            }`}>
                              {badge.icon}
                            </span>
                          </div>
                          <p className={`text-xs font-medium ${
                            badge.unlocked 
                              ? "text-gray-700" 
                              : "text-gray-400"
                          }`}>
                            {badge.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

// Module Detail View Component
function ModuleDetailView({ 
  module,
  onBack,
  onComplete
}: { 
  module: LearningModule;
  onBack: () => void;
  onComplete: (moduleId: number, lessonId: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center mb-4">
        <button 
          onClick={onBack}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <h2 className="text-lg font-medium">Module Details</h2>
      </div>
      
      <Card className="mb-6">
        <div className="h-40 bg-blue-100 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-icons text-5xl text-blue-500">school</span>
          </div>
        </div>
        
        <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl text-black dark:text-white">{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </div>
            <Badge variant="outline">Ages {module.ageGroup}</Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Your Progress</span>
              <span>{module.progress}% Complete</span>
            </div>
            <Progress value={module.progress} className="h-2" />
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-700 mb-2">What You'll Learn:</h3>
            <ul className="space-y-2 text-sm text-blue-600">
              <li className="flex items-center">
                <span className="material-icons text-blue-500 text-sm mr-2">check_circle</span>
                Understand what money is and how it works
              </li>
              <li className="flex items-center">
                <span className="material-icons text-blue-500 text-sm mr-2">check_circle</span>
                Learn the difference between needs and wants
              </li>
              <li className="flex items-center">
                <span className="material-icons text-blue-500 text-sm mr-2">check_circle</span>
                Discover the importance of saving money
              </li>
              <li className="flex items-center">
                <span className="material-icons text-blue-500 text-sm mr-2">check_circle</span>
                Develop good money habits for the future
              </li>
            </ul>
          </div>
          
          <h3 className="font-medium mb-3">Module Lessons</h3>
          
          <div className="space-y-3">
            {module.lessons.map((lesson, index) => (
              <div key={lesson.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-500 font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{lesson.title}</h4>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="material-icons text-xs mr-1">
                          {lesson.type === "story" ? "auto_stories" : 
                           lesson.type === "game" ? "videogame_asset" : 
                           lesson.type === "quiz" ? "quiz" :
                           lesson.type === "video" ? "play_circle" : "extension"}
                        </span>
                        <span className="capitalize">{lesson.type}</span>
                        <span className="mx-1">•</span>
                        <span>{lesson.duration} min</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    {lesson.completed ? (
                      <Badge className="bg-green-500">Completed</Badge>
                    ) : (
                      <Button 
                        size="sm"
                        onClick={() => onComplete(module.id, lesson.id)}
                      >
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-4 flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back to Modules
          </Button>
          
          {module.progress === 100 ? (
            <Button>
              Review Module
            </Button>
          ) : (
            <Button>
              Continue Learning
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
            <CardTitle className="text-lg text-black dark:text-white">Parents' Guide</CardTitle>
            <CardDescription>How to support your child's learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <span className="material-icons text-green-500 text-sm">lightbulb</span>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Discussion Topics</h4>
                  <p className="text-xs text-gray-600">After each lesson, ask your child questions about what they learned. Discuss how these concepts apply to your family's finances.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <span className="material-icons text-blue-500 text-sm">extension</span>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Practical Activities</h4>
                  <p className="text-xs text-gray-600">Create a savings jar at home. Help your child set a small savings goal for something they want and track their progress.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <span className="material-icons text-purple-500 text-sm">book</span>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Recommended Resources</h4>
                  <p className="text-xs text-gray-600">Check out "Money Matters for Kids" by Larry Burkett or "The Everything Kids' Money Book" for additional money lessons.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
            <CardTitle className="text-lg text-black dark:text-white">Related Activities</CardTitle>
            <CardDescription>Fun ways to reinforce learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="material-icons text-yellow-500">videogame_asset</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Money Match Game</h4>
                    <p className="text-xs text-gray-500">A fun game to practice identifying coins and notes</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="material-icons text-green-500">savings</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Piggy Bank Challenge</h4>
                    <p className="text-xs text-gray-500">A 30-day saving challenge with daily tasks</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="material-icons text-blue-500">quiz</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Money Quiz</h4>
                    <p className="text-xs text-gray-500">Test your knowledge with interactive questions</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Sample Data
const modules: LearningModule[] = [
  {
    id: 1,
    title: "Money Basics",
    description: "Learn what money is, why we use it, and how it works",
    ageGroup: "5-8",
    difficulty: "beginner",
    progress: 75,
    imageUrl: "/modules/money-basics.jpg",
    duration: 45,
    lessons: [
      {
        id: 1,
        title: "What is Money?",
        type: "story",
        duration: 10,
        completed: true
      },
      {
        id: 2,
        title: "Counting Coins and Notes",
        type: "game",
        duration: 15,
        completed: true
      },
      {
        id: 3,
        title: "Needs vs. Wants",
        type: "activity",
        duration: 10,
        completed: true
      },
      {
        id: 4,
        title: "Money Quiz",
        type: "quiz",
        duration: 10,
        completed: false
      }
    ]
  },
  {
    id: 2,
    title: "Saving is Super!",
    description: "Discover the importance of saving money and how to start",
    ageGroup: "5-8",
    difficulty: "beginner",
    progress: 25,
    imageUrl: "/modules/saving.jpg",
    duration: 40,
    lessons: [
      {
        id: 5,
        title: "Why Save Money?",
        type: "video",
        duration: 8,
        completed: true
      },
      {
        id: 6,
        title: "Setting a Savings Goal",
        type: "activity",
        duration: 12,
        completed: false
      },
      {
        id: 7,
        title: "Piggy Bank Adventure",
        type: "game",
        duration: 15,
        completed: false
      },
      {
        id: 8,
        title: "Savings Quiz",
        type: "quiz",
        duration: 5,
        completed: false
      }
    ]
  },
  {
    id: 3,
    title: "Smart Spending",
    description: "Learn how to make good choices when spending money",
    ageGroup: "9-12",
    difficulty: "intermediate",
    progress: 0,
    imageUrl: "/modules/spending.jpg",
    duration: 50,
    lessons: [
      {
        id: 9,
        title: "Spending Wisely",
        type: "story",
        duration: 10,
        completed: false
      },
      {
        id: 10,
        title: "Making a Budget",
        type: "activity",
        duration: 15,
        completed: false
      },
      {
        id: 11,
        title: "Shopping Challenge",
        type: "game",
        duration: 20,
        completed: false
      },
      {
        id: 12,
        title: "Spending Quiz",
        type: "quiz",
        duration: 5,
        completed: false
      }
    ]
  },
  {
    id: 4,
    title: "Earning Money",
    description: "Explore different ways kids can earn money",
    ageGroup: "9-12",
    difficulty: "intermediate",
    progress: 0,
    imageUrl: "/modules/earning.jpg",
    duration: 45,
    lessons: [
      {
        id: 13,
        title: "Ways to Earn",
        type: "video",
        duration: 8,
        completed: false
      },
      {
        id: 14,
        title: "Your First Business",
        type: "story",
        duration: 12,
        completed: false
      },
      {
        id: 15,
        title: "Business Simulation",
        type: "game",
        duration: 20,
        completed: false
      },
      {
        id: 16,
        title: "Earning Quiz",
        type: "quiz",
        duration: 5,
        completed: false
      }
    ]
  },
  {
    id: 5,
    title: "Introduction to Investing",
    description: "Learn the basics of investing and how money can grow",
    ageGroup: "13-16",
    difficulty: "advanced",
    progress: 0,
    imageUrl: "/modules/investing.jpg",
    duration: 60,
    lessons: [
      {
        id: 17,
        title: "What is Investing?",
        type: "video",
        duration: 12,
        completed: false
      },
      {
        id: 18,
        title: "Types of Investments",
        type: "activity",
        duration: 15,
        completed: false
      },
      {
        id: 19,
        title: "Stock Market Game",
        type: "game",
        duration: 25,
        completed: false
      },
      {
        id: 20,
        title: "Investing Quiz",
        type: "quiz",
        duration: 8,
        completed: false
      }
    ]
  },
  {
    id: 6,
    title: "Digital Money",
    description: "Explore online banking, UPI, and digital payments",
    ageGroup: "13-16",
    difficulty: "intermediate",
    progress: 0,
    imageUrl: "/modules/digital-money.jpg",
    duration: 55,
    lessons: [
      {
        id: 21,
        title: "Online Banking Basics",
        type: "video",
        duration: 10,
        completed: false
      },
      {
        id: 22,
        title: "Digital Payment Methods",
        type: "story",
        duration: 12,
        completed: false
      },
      {
        id: 23,
        title: "Digital Safety",
        type: "activity",
        duration: 15,
        completed: false
      },
      {
        id: 24,
        title: "UPI Simulation",
        type: "game",
        duration: 10,
        completed: false
      },
      {
        id: 25,
        title: "Digital Money Quiz",
        type: "quiz",
        duration: 8,
        completed: false
      }
    ]
  }
];

const activities: ActivityCard[] = [
  {
    id: 1,
    title: "Coin Collector",
    description: "A fun game to learn about different coins and their values",
    type: "money-game",
    ageGroup: "5-8",
    imageUrl: "/activities/coin-collector.jpg",
    isNew: false
  },
  {
    id: 2,
    title: "Budget Builder",
    description: "Create your own budget and learn to manage your pocket money",
    type: "money-game",
    ageGroup: "9-12",
    imageUrl: "/activities/budget-builder.jpg",
    isNew: true
  },
  {
    id: 3,
    title: "Saving Challenge",
    description: "Complete daily tasks to save for a goal over 30 days",
    type: "saving-challenge",
    ageGroup: "5-8",
    imageUrl: "/activities/saving-challenge.jpg",
    isNew: false
  },
  {
    id: 4,
    title: "Money Mastermind Quiz",
    description: "Test your financial knowledge with this fun quiz",
    type: "quiz",
    ageGroup: "9-12",
    imageUrl: "/activities/money-quiz.jpg",
    isNew: false
  },
  {
    id: 5,
    title: "Stock Market Challenge",
    description: "Invest virtual money and see how your stocks perform",
    type: "money-game",
    ageGroup: "13-16",
    imageUrl: "/activities/stock-market.jpg",
    isNew: true
  },
  {
    id: 6,
    title: "The Money Tree Story",
    description: "An interactive story about growing your own money tree",
    type: "story",
    ageGroup: "5-8",
    imageUrl: "/activities/money-tree.jpg",
    isNew: false
  },
  {
    id: 7,
    title: "Entrepreneur Adventure",
    description: "Start and grow your own business in this simulation game",
    type: "money-game",
    ageGroup: "13-16",
    imageUrl: "/activities/entrepreneur.jpg",
    isNew: false
  },
  {
    id: 8,
    title: "Savings Goals Tracker",
    description: "Set savings goals and track your progress over time",
    type: "saving-challenge",
    ageGroup: "9-12",
    imageUrl: "/activities/goals-tracker.jpg",
    isNew: false
  }
];

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Money Basics Graduate",
    description: "Complete the Money Basics module",
    iconName: "school",
    unlocked: false,
    progress: 75,
  },
  {
    id: 2,
    title: "Super Saver",
    description: "Complete the Saving is Super! module",
    iconName: "savings",
    unlocked: false,
    progress: 25,
  },
  {
    id: 3,
    title: "Quiz Master",
    description: "Score 100% on 5 different quizzes",
    iconName: "quiz",
    unlocked: false,
    progress: 60,
  },
  {
    id: 4,
    title: "Game Champion",
    description: "Complete 10 money games",
    iconName: "videogame_asset",
    unlocked: true,
    date: "Mar 15, 2025"
  },
  {
    id: 5,
    title: "Consistent Learner",
    description: "Use the app for 10 consecutive days",
    iconName: "calendar_today",
    unlocked: true,
    date: "Mar 28, 2025"
  },
  {
    id: 6,
    title: "Explorer",
    description: "Try all types of activities (games, stories, quizzes)",
    iconName: "explore",
    unlocked: true,
    date: "Feb 18, 2025"
  }
];

const badgeCollection = [
  { icon: "school", name: "Scholar", unlocked: true },
  { icon: "psychology", name: "Thinker", unlocked: true },
  { icon: "savings", name: "Saver", unlocked: true },
  { icon: "calculate", name: "Calculator", unlocked: true },
  { icon: "emoji_events", name: "Champion", unlocked: false },
  { icon: "card_giftcard", name: "Generous", unlocked: false },
  { icon: "toll", name: "Investor", unlocked: false },
  { icon: "trending_up", name: "Planner", unlocked: false },
  { icon: "insights", name: "Analyst", unlocked: false },
  { icon: "forum", name: "Communicator", unlocked: true },
  { icon: "bolt", name: "Fast Learner", unlocked: false },
  { icon: "workspace_premium", name: "Expert", unlocked: false },
];