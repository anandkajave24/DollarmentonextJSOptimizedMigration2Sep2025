import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Star, Target, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";

interface Checkpoint {
  id: number;
  name: string;
  description: string;
  category: string;
  level: number;
  points: number;
  isFree: boolean;
  actionItems: Array<{ id: number; title: string; completed: boolean }>;
  rewards: { badge: string; points: number };
  estimatedTimeMinutes: number;
  order: number;
}

interface UserProgress {
  id: number;
  checkpointId: number;
  status: string;
  progress: number;
  completedActions: number[];
  pointsEarned: number;
}

interface LearningProfile {
  id: number;
  userId: string;
  totalPoints: number;
  currentLevel: number;
  completedCheckpoints: number;
  currentStreak: number;
  longestStreak: number;
}

export default function Checkpoints() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Initialize free checkpoints on component mount
  const initMutation = useMutation({
    mutationFn: () => fetch('/api/checkpoints/initialize-free', { method: 'POST' }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/checkpoints'] });
    }
  });

  useEffect(() => {
    initMutation.mutate();
  }, []);

  // Fetch checkpoints
  const { data: checkpointsData, isLoading: checkpointsLoading } = useQuery({
    queryKey: ['/api/checkpoints', { category: selectedCategory === 'all' ? undefined : selectedCategory, isFree: true }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      params.append('isFree', 'true');
      
      const response = await fetch(`/api/checkpoints?${params}`);
      return response.json();
    }
  });

  // Fetch user progress
  const { data: progressData } = useQuery({
    queryKey: ['/api/user/checkpoints/progress'],
    queryFn: () => fetch('/api/user/checkpoints/progress').then(res => res.json())
  });

  // Fetch learning profile
  const { data: profileData } = useQuery({
    queryKey: ['/api/user/learning-profile'],
    queryFn: () => fetch('/api/user/learning-profile').then(res => res.json())
  });

  // Start checkpoint mutation
  const startCheckpointMutation = useMutation({
    mutationFn: async (checkpointId: number) => {
      const response = await fetch('/api/user/checkpoints/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkpointId,
          status: 'in_progress',
          progress: 0,
          completedActions: [],
          startedAt: new Date().toISOString()
        })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/checkpoints/progress'] });
      toast({ title: "Checkpoint Started!", description: "You've successfully started this learning checkpoint." });
    }
  });

  // Complete action mutation
  const completeActionMutation = useMutation({
    mutationFn: async ({ progressId, actionId, currentActions }: { progressId: number; actionId: number; currentActions: number[] }) => {
      const newActions = [...currentActions, actionId];
      const response = await fetch(`/api/user/checkpoints/progress/${progressId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completedActions: newActions,
          progress: Math.round((newActions.length / 4) * 100), // Assuming 4 actions per checkpoint
          ...(newActions.length >= 4 && {
            status: 'completed',
            completedAt: new Date().toISOString()
          })
        })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/checkpoints/progress'] });
      queryClient.invalidateQueries({ queryKey: ['/api/user/learning-profile'] });
      toast({ title: "Action Completed!", description: "Great progress on your financial learning journey!" });
    }
  });

  const checkpoints: Checkpoint[] = checkpointsData?.data || [];
  const progressRecords: UserProgress[] = progressData?.data || [];
  const profile: LearningProfile = profileData?.data;

  const categories = ["all", "budgeting", "investing", "taxation", "insurance", "debt_management"];

  const getProgressForCheckpoint = (checkpointId: number) => {
    return progressRecords.find(p => p.checkpointId === checkpointId);
  };

  const getLevelBadgeColor = (level: number) => {
    switch (level) {
      case 1: return "bg-green-500";
      case 2: return "bg-blue-500";
      case 3: return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'budgeting': return <Target className="h-4 w-4" />;
      case 'investing': return <TrendingUp className="h-4 w-4" />;
      case 'taxation': return <Star className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  if (checkpointsLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading your financial learning checkpoints...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Financial Learning Checkpoints - Free Financial Education Journey | DollarMento</title>
        <meta name="description" content="Start your free financial education journey with guided learning checkpoints. Complete budgeting, investing, taxation, and debt management milestones to build financial literacy." />
        <meta name="keywords" content="financial learning, financial education, budgeting checkpoints, investment learning, financial literacy, free financial courses, personal finance education" />
        <link rel="canonical" href="https://dollarmento.com/checkpoints" />
      </Helmet>
      <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Financial Learning Checkpoints</h1>
        <p className="text-xl text-gray-600">
          Start your free financial education journey with guided learning checkpoints
        </p>
      </div>

      {/* Learning Profile Stats */}
      {profile && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Your Learning Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{profile.totalPoints}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{profile.currentLevel}</div>
                <div className="text-sm text-gray-600">Current Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{profile.completedCheckpoints}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{profile.currentStreak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category.replace('_', ' ')}
          </Button>
        ))}
      </div>

      {/* Checkpoints Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {checkpoints.map((checkpoint) => {
          const progress = getProgressForCheckpoint(checkpoint.id);
          const isStarted = progress?.status === 'in_progress';
          const isCompleted = progress?.status === 'completed';
          const progressPercentage = progress?.progress || 0;

          return (
            <Card key={checkpoint.id} className={`relative ${isCompleted ? 'ring-2 ring-green-500' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(checkpoint.category)}
                    <Badge className={getLevelBadgeColor(checkpoint.level)}>
                      Level {checkpoint.level}
                    </Badge>
                  </div>
                  {isCompleted && <CheckCircle className="h-6 w-6 text-green-500" />}
                </div>
                <CardTitle className="text-lg">{checkpoint.name}</CardTitle>
                <CardDescription>{checkpoint.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Bar */}
                {isStarted && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                )}

                {/* Action Items */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Action Items:</h4>
                  <div className="space-y-1">
                    {checkpoint.actionItems?.map((action) => {
                      const isActionCompleted = progress?.completedActions?.includes(action.id);
                      return (
                        <div
                          key={action.id}
                          className={`flex items-center gap-2 text-sm p-2 rounded ${
                            isActionCompleted ? 'bg-green-50 text-green-700' : 'bg-gray-50'
                          }`}
                        >
                          {isActionCompleted ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                          )}
                          <span className={isActionCompleted ? 'line-through' : ''}>{action.title}</span>
                          {isStarted && !isActionCompleted && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                completeActionMutation.mutate({
                                  progressId: progress.id,
                                  actionId: action.id,
                                  currentActions: progress.completedActions || []
                                })
                              }
                              disabled={completeActionMutation.isPending}
                            >
                              Complete
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Rewards & Info */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {checkpoint.estimatedTimeMinutes} min
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {checkpoint.points} points
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  {!isStarted && !isCompleted && (
                    <Button
                      onClick={() => startCheckpointMutation.mutate(checkpoint.id)}
                      disabled={startCheckpointMutation.isPending}
                      className="w-full"
                    >
                      Start Checkpoint
                    </Button>
                  )}
                  {isStarted && !isCompleted && (
                    <Button variant="outline" className="w-full" disabled>
                      In Progress...
                    </Button>
                  )}
                  {isCompleted && (
                    <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                      ✓ Completed - {progress?.pointsEarned || checkpoint.points} Points Earned
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {checkpoints.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">No Checkpoints Available</h3>
            <p className="text-gray-600 mb-4">
              Free checkpoints are being initialized. Please refresh the page in a moment.
            </p>
            <Button onClick={() => window.location.reload()}>Refresh Page</Button>
          </CardContent>
        </Card>
      )}
      </div>
    </>
  );
}