import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import { useBudget, SavingsGoal } from "../../contexts/BudgetContext";
import { format, differenceInDays, parseISO } from "date-fns";
import { Target, Calendar, ArrowUp, TrendingUp, Flag } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

// Define Goal interface that matches GoalSettings
interface GoalSettingsGoal {
  id: string;
  name: string;
  type: "Standard Goal" | "Custom Goal";
  category: "Short-Term" | "Mid-Term" | "Long-Term";
  targetAmount: number;
  currentSavings: number;
  targetDate: string;
  savingsPlan: "Fixed Monthly Savings" | "Percentage of Income" | "Round-Up Savings";
  savingsAmount: number;
  autoSave: boolean;
}

const SavingsGoals = () => {
  const { savingsGoals, addSavingsGoal, updateSavingsGoalProgress } = useBudget();
  const { toast } = useToast();

  // New goal form state
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState(10000);
  const [targetDate, setTargetDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  
  // Function to transfer a savings goal to GoalSettings
  const transferGoalToGoalSettings = (goal: SavingsGoal) => {
    // Convert priority to category
    let category: "Short-Term" | "Mid-Term" | "Long-Term" = "Short-Term";
    
    // Calculate time to target date to determine category
    try {
      const targetDateObj = parseISO(goal.targetDate);
      const today = new Date();
      const monthsToTarget = differenceInDays(targetDateObj, today) / 30;
      
      if (monthsToTarget > 36) { // More than 3 years
        category = "Long-Term";
      } else if (monthsToTarget > 12) { // 1-3 years
        category = "Mid-Term";
      } else { // Less than 1 year
        category = "Short-Term";
      }
    } catch (error) {
      // Fallback to short-term if date parsing fails
      category = "Short-Term";
    }
    
    // Create a GoalSettings goal from the BudgetBuddy goal
    const goalSettingsGoal: GoalSettingsGoal = {
      id: `goal-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: goal.name,
      type: "Custom Goal",
      category,
      targetAmount: goal.targetAmount,
      currentSavings: goal.currentAmount,
      targetDate: goal.targetDate,
      savingsPlan: "Fixed Monthly Savings",
      savingsAmount: calculateGoalMetrics(goal).monthlyNeeded,
      autoSave: false
    };
    
    if (typeof window !== 'undefined') {
      // Get existing goals from localStorage
      const existingGoalsJSON = localStorage.getItem("financialGoals");
      const existingGoals: GoalSettingsGoal[] = existingGoalsJSON ? JSON.parse(existingGoalsJSON) : [];
      
      // Add the new goal to the existing goals
      const updatedGoals = [...existingGoals, goalSettingsGoal];
      
      // Save the updated goals to localStorage
      localStorage.setItem("financialGoals", JSON.stringify(updatedGoals));
    }
    
    toast({
      title: "Goal Transferred",
      description: `'${goal.name}' has been added to Goal Settings`,
    });
  };

  const handleAddGoal = () => {
    if (!goalName || targetAmount <= 0) {
      return; // Validate input
    }

    const newGoal: SavingsGoal = {
      name: goalName,
      targetAmount,
      targetDate,
      priority,
      currentAmount: 0
    };

    addSavingsGoal(newGoal);

    // Reset form
    setGoalName("");
    setTargetAmount(10000);
    setPriority("Medium");
  };

  // Calculate goal metrics
  const calculateGoalMetrics = (goal: SavingsGoal) => {
    const current = goal.currentAmount;
    const target = goal.targetAmount;

    const progress = target > 0 ? (current / target * 100) : 0;

    try {
      const targetDateObj = parseISO(goal.targetDate);
      const today = new Date();
      const daysRemaining = differenceInDays(targetDateObj, today);

      let monthlyNeeded = 0;
      if (daysRemaining > 0) {
        monthlyNeeded = (target - current) / (daysRemaining / 30);
      } else {
        monthlyNeeded = target - current;
      }

      return {
        progress: Math.min(progress, 100),
        daysRemaining: Math.max(daysRemaining, 0),
        monthlyNeeded: Math.max(monthlyNeeded, 0),
        isOverdue: daysRemaining < 0
      };
    } catch (error) {
      return {
        progress: Math.min(progress, 100),
        daysRemaining: 0,
        monthlyNeeded: target - current,
        isOverdue: false
      };
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
          <CardTitle className="text-xl font-bold text-black dark:text-white">Add New Savings Goal</CardTitle>
          <CardDescription>
            Set specific goals to save towards big purchases, emergency funds, or investments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input
                  id="goal-name"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  placeholder="e.g., Emergency Fund"
                  className="bg-gray-50 border-2 border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-amount">Target Amount ($)</Label>
                <Input
                  id="target-amount"
                  type="number"
                  min={1000}
                  step={1000}
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(parseInt(e.target.value) || 0)}
                  className="bg-gray-50 border-2 border-gray-200"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target-date">Target Date</Label>
                <Input
                  id="target-date"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  min={format(new Date(), "yyyy-MM-dd")}
                  className="bg-gray-50 border-2 border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={(value) => setPriority(value as "High" | "Medium" | "Low")}>
                  <SelectTrigger id="priority" className="bg-gray-50 border-2 border-gray-200">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button 
            className="w-full mt-6" 
            onClick={handleAddGoal}
            disabled={!goalName || targetAmount <= 0}
          >
            Add Goal
          </Button>
        </CardContent>
      </Card>

      {savingsGoals.length > 0 && (
        <>
          <div>
            <h3 className="text-lg font-semibold mb-4">Your Savings Goals</h3>
            <div className="grid grid-cols-1 gap-4">
              {savingsGoals.map((goal, index) => {
                const metrics = calculateGoalMetrics(goal);

                return (
                  <Card key={index}>
                    <CardHeader className="pb-2 bg-gray-200 dark:bg-gray-800 border-b">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-black dark:text-white" />
                          <CardTitle className="font-bold text-black dark:text-white">{goal.name}</CardTitle>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-semibold ${
                          goal.priority === "High" 
                            ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-500" 
                            : goal.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-500"
                              : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-500"
                        }`}>
                          {goal.priority} Priority
                        </div>
                      </div>
                      <CardDescription>
                        Target: ${goal.targetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} by {format(parseISO(goal.targetDate), "PP")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Current Progress</span>
                            <span className="font-medium">
                              ${goal.currentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              <span className={`ml-1 ${metrics.progress >= 20 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                                ({metrics.progress.toFixed(1)}%)
                              </span>
                            </span>
                          </div>
                          <Progress 
                            value={metrics.progress} 
                            className={`${metrics.progress >= 20 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-sm">
                              <TrendingUp className={`h-4 w-4 ${metrics.monthlyNeeded < goal.targetAmount * 0.05 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`} />
                              <span>Monthly Saving Needed</span>
                            </div>
                            <span className={`font-medium text-sm ${metrics.monthlyNeeded < goal.targetAmount * 0.05 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                              ${Math.round(metrics.monthlyNeeded).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className={`h-4 w-4 ${metrics.isOverdue ? 'text-red-600 dark:text-red-500' : 'text-green-600 dark:text-green-500'}`} />
                              <span>Time Remaining</span>
                            </div>
                            <span className={`text-sm ${metrics.isOverdue ? 'text-red-600 dark:text-red-500' : 'text-green-600 dark:text-green-500'}`}>
                              {metrics.isOverdue 
                                ? 'Goal date has passed' 
                                : `${metrics.daysRemaining} days`}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t space-y-3">
                        <Label htmlFor={`update-${index}`}>Update Current Amount</Label>
                        <div className="flex gap-2">
                          <Input
                            id={`update-${index}`}
                            type="number"
                            min={0}
                            step={1000}
                            value={goal.currentAmount}
                            onChange={(e) => {
                              const newValue = parseFloat(e.target.value) || 0;
                              updateSavingsGoalProgress(index, newValue);
                            }}
                            className="bg-gray-50 border-2 border-gray-200"
                          />
                          <Button 
                            variant="outline"
                            onClick={() => {
                              const newValue = goal.currentAmount + 1000;
                              updateSavingsGoalProgress(index, newValue);
                            }}
                          >
                            <ArrowUp className="h-4 w-4 mr-1" />
                            +1,000
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => transferGoalToGoalSettings(goal)}
                            className="ml-2 bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-100"
                          >
                            <Flag className="h-4 w-4 mr-1 text-green-700 dark:text-green-400" />
                            Add to Goal Settings
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Savings Goals Summary */}
          <Card className="mt-8 bg-gray-100 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700">
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
              <CardTitle className="text-center text-xl font-bold text-black dark:text-white">Savings Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(() => {
                  // Calculate summary metrics
                  const totalSavingsTarget = savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
                  const totalCurrentSavings = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
                  const totalProgress = totalSavingsTarget > 0 
                    ? (totalCurrentSavings / totalSavingsTarget) * 100 
                    : 0;

                  // Find closest goal
                  const goalsWithDates = savingsGoals
                    .filter(goal => !calculateGoalMetrics(goal).isOverdue)
                    .map(goal => ({
                      name: goal.name,
                      daysRemaining: calculateGoalMetrics(goal).daysRemaining,
                      target: goal.targetAmount,
                      current: goal.currentAmount,
                      gap: goal.targetAmount - goal.currentAmount
                    }))
                    .sort((a, b) => a.daysRemaining - b.daysRemaining);

                  const closestGoal = goalsWithDates.length > 0 ? goalsWithDates[0] : null;

                  return (
                    <>
                      <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                        <h3 className="text-sm font-semibold text-black dark:text-white mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">Total Progress</h3>
                        <p className={`text-2xl font-bold ${
                          totalProgress >= 50 
                            ? 'text-green-600 dark:text-green-500' 
                            : 'text-red-600 dark:text-red-500'
                          }`}>
                          {totalProgress.toFixed(1)}%
                        </p>
                        <p className={`text-xs mt-1 ${
                          totalProgress >= 50 
                            ? 'text-green-600 dark:text-green-500' 
                            : 'text-red-600 dark:text-red-500'
                          }`}>
                          Across all savings goals
                        </p>
                      </div>

                      <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                        <h3 className="text-sm font-semibold text-black dark:text-white mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">Total Saved</h3>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-500">
                          ${totalCurrentSavings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                          Of ${totalSavingsTarget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} target
                        </p>
                      </div>

                      {closestGoal ? (
                        <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                          <h3 className="text-sm font-semibold text-black dark:text-white mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">Next Goal</h3>
                          <p className="text-lg font-bold text-green-600 dark:text-green-500">
                            {closestGoal.name}
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                            ${closestGoal.gap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} needed in {closestGoal.daysRemaining} days
                          </p>
                        </div>
                      ) : (
                        <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                          <h3 className="text-sm font-semibold text-black dark:text-white mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">Goals Status</h3>
                          <p className="text-lg font-bold text-red-600 dark:text-red-500">
                            No upcoming goals
                          </p>
                          <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                            Add a goal with a future date
                          </p>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
              
              {/* Add a button to transfer all goals at once */}
              <div className="mt-4 flex flex-col items-center justify-center">
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center mt-4 mx-auto px-8 py-3 text-lg rounded-xl shadow-md"
                  onClick={() => {
                    // Transfer all goals
                    savingsGoals.forEach(goal => transferGoalToGoalSettings(goal));
                    
                    toast({
                      title: "All Goals Transferred",
                      description: `${savingsGoals.length} goals have been added to Goal Settings`,
                    });
                  }}
                >
                  <Flag className="h-6 w-6 mr-3 text-white" />
                  Transfer All Goals to Goal Settings
                </Button>
                <p className="text-xs text-gray-500 mt-2 text-center max-w-md mx-auto">
                  Add all your BudgetBuddy goals to the Goals Settings page for comprehensive tracking
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default SavingsGoals;