import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
} from "../components/ui/card";
import { useToast } from "../hooks/use-toast";
import { generateInvestmentSuggestions } from "../lib/openai";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import FinancialDisclaimer from "../components/FinancialDisclaimer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { addDays, differenceInDays, format } from "date-fns";
import ResponsivePageWrapper from "../components/ResponsivePageWrapper";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import ConfettiCelebration from "../components/ConfettiCelebration";

// Defined goal types
const predefinedGoals = {
  "Short-Term": ["Emergency Fund", "Buying a Gadget", "Vacation & Travel", "Debt Payoff"],
  "Mid-Term": ["Buying a Vehicle", "Home Down Payment", "Child's School Fees", "Business Startup Fund"],
  "Long-Term": ["Retirement Fund", "Child's Higher Education", "Buying a Dream Home", "Wealth Creation"]
};

// Goal interface
interface Goal {
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

// Calculate monthly savings needed based on goal details
const calculateMonthlySavings = (targetAmount: number, currentSavings: number, months: number): number => {
  const remaining = targetAmount - currentSavings;
  return months > 0 ? Math.round(remaining / months) : 0;
};

export default function GoalSettings() {
  const { toast } = useToast();
  
  // State management
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showOverview, setShowOverview] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("goals");
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [investmentSuggestions, setInvestmentSuggestions] = useState<{[goalId: string]: string[]}>({});
  const [loadingSuggestions, setLoadingSuggestions] = useState<{[goalId: string]: boolean}>({});
  
  // Contribution modal state
  const [contributionGoalId, setContributionGoalId] = useState<string | null>(null);
  const [contributionAmount, setContributionAmount] = useState<number>(0);
  const [showContributionModal, setShowContributionModal] = useState<boolean>(false);
  
  // Confetti celebration state
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [completedGoalIds, setCompletedGoalIds] = useState<Set<string>>(new Set());
  
  // Form state
  const [goalType, setGoalType] = useState<"Standard Goal" | "Custom Goal">("Standard Goal");
  const [category, setCategory] = useState<"Short-Term" | "Mid-Term" | "Long-Term">("Short-Term");
  const [goalName, setGoalName] = useState(predefinedGoals["Short-Term"][0]);
  const [customGoalName, setCustomGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState(10000);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [targetDate, setTargetDate] = useState(format(addDays(new Date(), 90), "yyyy-MM-dd"));
  const [savingsPlan, setSavingsPlan] = useState<"Fixed Monthly Savings" | "Percentage of Income" | "Round-Up Savings">("Fixed Monthly Savings");
  const [monthlySavingsAmount, setMonthlySavingsAmount] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [savingsPercentage, setSavingsPercentage] = useState(20);
  const [autoSave, setAutoSave] = useState(false);
  
  // Load saved goals from localStorage on component mount
  useEffect(() => {
    const loadGoals = () => {
      console.log("Loading goals from localStorage");
      const savedGoals = localStorage.getItem("financialGoals");
      if (savedGoals) {
        try {
          const parsedGoals = JSON.parse(savedGoals);
          console.log("Loaded goals:", parsedGoals.length);
          setGoals(parsedGoals);
        } catch (e) {
          console.error("Error parsing goals from localStorage:", e);
          // Initialize with empty array if corrupted
          setGoals([]);
        }
      } else {
        // Initialize with empty array if not found
        console.log("No goals found in localStorage");
        setGoals([]);
      }
    };
    
    loadGoals();
    
    // Listen for storage events to update in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "financialGoals") {
        console.log("financialGoals changed in another tab/window");
        loadGoals();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Check for goals that were transferred from BudgetBuddy
  useEffect(() => {
    const checkForNewTransferredGoals = () => {
      const handleStorageChange = () => {
        const savedGoals = localStorage.getItem("financialGoals");
        if (savedGoals) {
          try {
            const currentGoals: Goal[] = JSON.parse(savedGoals);
            if (currentGoals.length > goals.length) {
              // Only update if there are new goals
              setGoals(currentGoals);
              
              // Show notification
              const newGoalsCount = currentGoals.length - goals.length;
              toast({
                title: "Goals Imported",
                description: `${newGoalsCount} new ${newGoalsCount === 1 ? 'goal has' : 'goals have'} been imported from BudgetBuddy.`,
              });
            }
          } catch (e) {
            console.error("Error parsing imported goals:", e);
          }
        }
      };
      
      // Add event listener for storage changes
      window.addEventListener('storage', handleStorageChange);
      
      // Also check for changes immediately
      handleStorageChange();
      
      // Clean up event listener when component unmounts
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    };
    
    // Only set up the storage change listener if we're on the goals tab
    if (activeTab === "goals" || activeTab === "overview") {
      return checkForNewTransferredGoals();
    }
  }, [activeTab, goals.length, toast]);

  // Calculate suggested monthly savings whenever relevant inputs change
  useEffect(() => {
    const today = new Date();
    const targetDateObj = new Date(targetDate);
    const daysToGoal = differenceInDays(targetDateObj, today);
    const monthsToGoal = daysToGoal / 30;
    
    const suggestedSavings = calculateMonthlySavings(targetAmount, currentSavings, monthsToGoal);
    setMonthlySavingsAmount(suggestedSavings);
  }, [targetAmount, currentSavings, targetDate]);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("financialGoals", JSON.stringify(goals));
  }, [goals]);

  // Load a goal for editing
  useEffect(() => {
    if (editingGoalId) {
      const goalToEdit = goals.find(goal => goal.id === editingGoalId);
      if (goalToEdit) {
        setGoalType(goalToEdit.type);
        setCategory(goalToEdit.category);
        
        if (goalToEdit.type === "Standard Goal") {
          setGoalName(goalToEdit.name);
        } else {
          setCustomGoalName(goalToEdit.name);
        }
        
        setTargetAmount(goalToEdit.targetAmount);
        setCurrentSavings(goalToEdit.currentSavings);
        setTargetDate(goalToEdit.targetDate);
        setSavingsPlan(goalToEdit.savingsPlan);
        setMonthlySavingsAmount(goalToEdit.savingsAmount);
        setAutoSave(goalToEdit.autoSave);
      }
    }
  }, [editingGoalId, goals]);

  // Aggregate metrics for overview
  const totalGoals = goals.length;
  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSavedAmount = goals.reduce((sum, goal) => sum + goal.currentSavings, 0);

  // Handle saving a new goal or updating an existing one
  const handleSaveGoal = () => {
    const finalGoalName = goalType === "Standard Goal" ? goalName : customGoalName;
    
    // Calculate actual savings amount based on the selected plan
    let finalSavingsAmount = monthlySavingsAmount;
    if (savingsPlan === "Percentage of Income") {
      finalSavingsAmount = (monthlyIncome * savingsPercentage) / 100;
    }
    
    const newGoal: Goal = {
      id: editingGoalId || `goal-${Date.now()}`,
      name: finalGoalName,
      type: goalType,
      category,
      targetAmount,
      currentSavings,
      targetDate,
      savingsPlan,
      savingsAmount: finalSavingsAmount,
      autoSave
    };
    
    if (editingGoalId) {
      // Update existing goal
      setGoals(goals.map(goal => goal.id === editingGoalId ? newGoal : goal));
      setEditingGoalId(null);
      
      // Show success notification for update
      toast({
        title: "Goal Updated",
        description: `Your ${finalGoalName} goal has been updated successfully.`,
      });
    } else {
      // Add new goal
      setGoals([...goals, newGoal]);
      
      // Show success notification for new goal
      toast({
        title: "Goal Created",
        description: `Your ${finalGoalName} goal has been created successfully.`,
      });
    }
    
    // Reset form and switch to goals tab
    resetForm();
    setActiveTab("goals");
  };

  // Reset the form to default values
  const resetForm = () => {
    setGoalType("Standard Goal");
    setCategory("Short-Term");
    setGoalName(predefinedGoals["Short-Term"][0]);
    setCustomGoalName("");
    setTargetAmount(10000);
    setCurrentSavings(0);
    setTargetDate(format(addDays(new Date(), 90), "yyyy-MM-dd"));
    setSavingsPlan("Fixed Monthly Savings");
    setMonthlyIncome(50000);
    setSavingsPercentage(20);
    setAutoSave(false);
  };

  // Delete a goal with confirmation
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingGoalId, setDeletingGoalId] = useState<string | null>(null);
  
  const handleDeleteGoal = (goalId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      setGoalToDelete(goal);
      setShowDeleteConfirm(true);
    }
  };
  
  const confirmDeleteGoal = () => {
    if (goalToDelete) {
      console.log("Deleting goal:", goalToDelete);
      
      // First set the deleting goal ID to trigger the animation
      setDeletingGoalId(goalToDelete.id);
      
      // Close the dialog immediately but keep the animation running
      setShowDeleteConfirm(false);
      
      // Delay the actual deletion to allow for the animation to run
      setTimeout(() => {
        // Get the current goals from localStorage to ensure we're working with the most up-to-date data
        const savedGoals = localStorage.getItem("financialGoals");
        let currentGoals = [];
        
        if (savedGoals) {
          try {
            currentGoals = JSON.parse(savedGoals);
          } catch (e) {
            console.error("Error parsing goals from localStorage:", e);
          }
        }
        
        // Filter out the goal to delete
        const updatedGoals = currentGoals.filter((goal: Goal) => goal.id !== goalToDelete.id);
        console.log("Goals before deletion:", currentGoals.length);
        console.log("Goals after deletion:", updatedGoals.length);
        
        // Update localStorage immediately
        localStorage.setItem("financialGoals", JSON.stringify(updatedGoals));
        
        // Update component state
        setGoals(updatedGoals);
        
        // Show detailed notification for delete
        toast({
          title: "Goal Deleted",
          description: (
            <div className="flex flex-col">
              <span className="font-medium">Your goal has been deleted:</span>
              <span>{goalToDelete.name} (₹{goalToDelete.targetAmount.toLocaleString()})</span>
            </div>
          ),
          variant: "destructive",
        });
        
        // Force a reload of goals from localStorage to ensure UI consistency
        const refreshedGoals = localStorage.getItem("financialGoals");
        if (refreshedGoals) {
          try {
            setGoals(JSON.parse(refreshedGoals));
          } catch (e) {
            console.error("Error refreshing goals:", e);
          }
        }
        
        // Reset state
        setGoalToDelete(null);
        setDeletingGoalId(null);
      }, 600); // Time to match the CSS transition duration
    }
  };
  
  const cancelDeleteGoal = () => {
    setGoalToDelete(null);
    setShowDeleteConfirm(false);
  };

  // Group goals by category for overview
  const getGoalsByCategory = (categoryName: string) => {
    return goals.filter(goal => goal.category === categoryName);
  };

  // Calculate goal completion percentage
  const calculateProgress = (goal: Goal) => {
    return (goal.currentSavings / goal.targetAmount) * 100;
  };
  
  // Open the contribution modal
  const openContributionModal = (goalId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      setContributionGoalId(goalId);
      setContributionAmount(goal.savingsAmount); // Default to monthly amount
      setShowContributionModal(true);
    }
  };
  
  // Handle contribution submission
  const handleContribution = () => {
    if (!contributionGoalId || contributionAmount <= 0) return;
    
    const goal = goals.find(g => g.id === contributionGoalId);
    if (!goal) {
      setShowContributionModal(false);
      return;
    }
    
    // Calculate new savings amount
    const newSavings = goal.currentSavings + contributionAmount;
    const wasCompleted = completedGoalIds.has(goal.id);
    const isNowCompleted = newSavings >= goal.targetAmount;
    
    // Update the goal
    const updatedGoal: Goal = {
      ...goal,
      currentSavings: newSavings
    };
    
    // Update goals array
    setGoals(goals.map(g => g.id === goal.id ? updatedGoal : g));
    
    // Show success notification
    toast({
      title: "Contribution Added",
      description: `You've added ₹${contributionAmount.toLocaleString()} to your ${goal.name} goal.`,
    });
    
    // If goal is now complete but wasn't before, trigger confetti
    if (isNowCompleted && !wasCompleted) {
      // Add to completed goals
      const newCompletedGoals = new Set(completedGoalIds);
      newCompletedGoals.add(goal.id);
      setCompletedGoalIds(newCompletedGoals);
      
      // Show celebration
      setShowConfetti(true);
      
      // Additional celebration notification
      toast({
        title: "Goal Achieved! 🎉",
        description: `Congratulations! You've reached your ${goal.name} goal of ₹${goal.targetAmount.toLocaleString()}.`,
        variant: "default",
      });
    }
    
    // Close modal
    setShowContributionModal(false);
    setContributionGoalId(null);
    setContributionAmount(0);
  };
  
  // Clear confetti after animation
  const handleConfettiComplete = () => {
    setShowConfetti(false);
  };

  // Get AI-powered investment suggestions for a goal
  const fetchInvestmentSuggestions = async (goal: Goal) => {
    if (investmentSuggestions[goal.id]?.length > 0) {
      return; // Already have suggestions for this goal
    }
    
    try {
      // Show loading indicator
      setLoadingSuggestions(prev => ({ ...prev, [goal.id]: true }));
      
      // Calculate time remaining in months
      const today = new Date();
      const targetDate = new Date(goal.targetDate);
      const monthsRemaining = Math.max(1, Math.round(differenceInDays(targetDate, today) / 30));
      
      // Determine risk level based on category
      let riskLevel = "moderate";
      if (goal.category === "Short-Term") {
        riskLevel = "low";
      } else if (goal.category === "Long-Term") {
        riskLevel = "moderate to high";
      }
      
      // Get timeframe description
      let timeframe = "short-term (less than 1 year)";
      if (monthsRemaining > 36) {
        timeframe = "long-term (more than 3 years)";
      } else if (monthsRemaining > 12) {
        timeframe = "medium-term (1-3 years)";
      }
      
      // Get personalized suggestions
      const suggestions = await generateInvestmentSuggestions(
        goal.name,
        goal.category,
        goal.targetAmount,
        timeframe,
        riskLevel
      );
      
      // Store the suggestions
      setInvestmentSuggestions(prev => ({
        ...prev,
        [goal.id]: suggestions
      }));
    } catch (error) {
      console.error("Error fetching investment suggestions:", error);
      // Set default suggestions in case of error
      const defaultSuggestions = [
        `Option: Recurring deposits with major Indian banks - Safe option for ${goal.category} goals with guaranteed returns.`,
        `Option: Liquid mutual funds - Better returns than savings accounts with high liquidity for ${goal.name}.`,
        `Option: Balanced advantage funds - Dynamic allocation between equity and debt based on market conditions.`
      ];
      
      setInvestmentSuggestions(prev => ({
        ...prev,
        [goal.id]: defaultSuggestions
      }));
    } finally {
      // Hide loading indicator
      setLoadingSuggestions(prev => ({ ...prev, [goal.id]: false }));
    }
  };

  return (
    <ResponsivePageWrapper>
      {/* Delete Goal Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this goal?</AlertDialogTitle>
            <AlertDialogDescription>
              {goalToDelete && (
                <div className="space-y-2">
                  <p>You are about to delete the following goal:</p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg my-2 border">
                    <span className="font-medium">{goalToDelete.name}</span>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Target amount: ₹{goalToDelete.targetAmount.toLocaleString()}
                    </div>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Category: {goalToDelete.category}
                    </div>
                  </div>
                  <p className="text-red-500 text-sm">This action cannot be undone.</p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDeleteGoal}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteGoal}
              className="bg-red-500 hover:bg-red-600"
            >
              Yes, Delete Goal
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <span className="material-icons text-blue-500 mr-2">flag</span>
            Financial Goal Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Set, track, and achieve your financial goals with personalized savings plans</p>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-5 text-sm text-gray-700 dark:text-gray-300 border">
          Define clear financial targets with realistic timelines and automated savings plans to help you achieve your dreams.
        </div>
        
        <Tabs defaultValue={showOverview ? "overview" : "goals"} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-transparent p-0 border-0 w-full">
            <TabsTrigger 
              value="goals" 
              onClick={() => setShowOverview(false)}
              className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500"
            >
              My Goals
            </TabsTrigger>
            <TabsTrigger 
              value="overview" 
              onClick={() => setShowOverview(true)}
              className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500"
            >
              Goals Overview
            </TabsTrigger>
            <TabsTrigger 
              value="add" 
              onClick={() => {
                setShowOverview(false);
                setEditingGoalId(null);
                resetForm();
              }}
              className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500"
            >
              Add New Goal
            </TabsTrigger>
          </TabsList>
          
          {/* Goals Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="overflow-hidden">
              <div className="bg-gray-200 dark:bg-gray-800 px-4 py-3 border-b">
                <h3 className="font-medium text-lg flex items-center text-black dark:text-white">
                  <span className="material-icons text-blue-500 mr-2">dashboard</span>
                  Goals Dashboard
                </h3>
              </div>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">Total Goals</div>
                    <div className="text-2xl font-bold">{totalGoals}</div>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">Total Target Amount</div>
                    <div className="text-2xl font-bold">₹{totalTargetAmount.toLocaleString()}</div>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">Total Saved</div>
                    <div className="text-2xl font-bold">₹{totalSavedAmount.toLocaleString()}</div>
                  </div>
                </div>
                
                {["Short-Term", "Mid-Term", "Long-Term"].map((cat) => {
                  const categoryGoals = getGoalsByCategory(cat);
                  if (categoryGoals.length === 0) return null;
                  
                  return (
                    <div key={cat} className="mb-6">
                      <h4 className="text-lg font-medium mb-3">{cat} Goals</h4>
                      <div className="space-y-4">
                        {categoryGoals.map((goal, index) => {
                          const progress = calculateProgress(goal);
                          
                          return (
                            <div key={goal.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <div className="font-medium">
                                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 text-black dark:text-white mr-2 font-medium">
                                    {index + 1}
                                  </span>
                                  {goal.name}
                                </div>
                                <div className={`text-sm ${
                                  progress >= 50 
                                    ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' 
                                    : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                                } px-2 py-0.5 rounded-full`}>
                                  {progress.toFixed(1)}%
                                </div>
                              </div>
                              <Progress 
                                value={progress} 
                                className={`h-2 mb-2 ${
                                  progress >= 50 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                                }`} 
                              />
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Progress: ₹{goal.currentSavings.toLocaleString()} of ₹{goal.targetAmount.toLocaleString()}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* My Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            {goals.length === 0 ? (
              <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-lg border">
                <span className="material-icons text-4xl text-gray-400 mb-2">flag</span>
                <h3 className="text-xl font-medium mb-2">No Goals Yet</h3>
                <p className="text-gray-500 mb-4">Start by creating your first financial goal</p>
                <Button 
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => {
                    setShowOverview(false);
                    setActiveTab("add");
                  }}
                >
                  <span className="material-icons mr-2">add</span>
                  Add a Goal
                </Button>
              </div>
            ) : (
              goals.map((goal, index) => {
                const progress = calculateProgress(goal);
                const pieData = [
                  { name: 'Saved', value: goal.currentSavings },
                  { name: 'Remaining', value: goal.targetAmount - goal.currentSavings },
                ];
                const COLORS = ['#00C853', '#FF5252'];
                
                return (
                  <Card 
                    key={goal.id} 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${deletingGoalId === goal.id ? 'opacity-0 scale-95 transform translate-x-8' : 'opacity-100'}`}
                  >
                    <div className="bg-gray-200 dark:bg-gray-800 px-4 py-3 border-b">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-lg flex items-center text-black dark:text-white">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-600 text-black dark:text-white mr-2 font-medium">
                            {index + 1}
                          </span>
                          {goal.name}
                        </h3>
                        <div className={`text-sm 
                          ${goal.category === 'Short-Term' 
                            ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' 
                            : goal.category === 'Mid-Term'
                              ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
                              : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                          } px-2 py-0.5 rounded-full font-medium`}>
                          {goal.category}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Progress 
                              value={progress} 
                              className={`h-3 mb-2 ${
                                progress >= 50 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                              }`} 
                            />
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                              <div>₹{goal.currentSavings.toLocaleString()}</div>
                              <div>{progress.toFixed(1)}%</div>
                              <div>₹{goal.targetAmount.toLocaleString()}</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                              <div className="text-xs text-gray-500 mb-1">Target Date</div>
                              <div className="font-medium">{format(new Date(goal.targetDate), "d MMM yyyy")}</div>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                              <div className="text-xs text-gray-500 mb-1">Monthly Savings</div>
                              <div className="font-medium">₹{goal.savingsAmount.toLocaleString()}</div>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                              <div className="text-xs text-gray-500 mb-1">Savings Plan</div>
                              <div className="font-medium">{goal.savingsPlan}</div>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                              <div className="text-xs text-gray-500 mb-1">Auto-Save</div>
                              <div className="font-medium">{goal.autoSave ? "Enabled" : "Disabled"}</div>
                            </div>
                          </div>
                          
                          {/* Removed added Investment Suggestions Section as per user request */}
                          
                          <div className="flex space-x-2 pt-3">
                            <Button
                              variant="outline"
                              onClick={() => openContributionModal(goal.id)}
                              className="flex-1 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800"
                            >
                              <span className="material-icons mr-1 text-sm">savings</span>
                              Add Savings
                            </Button>
                          </div>
                          <div className="flex space-x-2 pt-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setEditingGoalId(goal.id);
                                setActiveTab("add");
                              }}
                              className="flex-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
                            >
                              <span className="material-icons mr-1 text-sm">edit</span>
                              Edit Goal
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleDeleteGoal(goal.id)}
                              className="flex-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
                            >
                              <span className="material-icons mr-1 text-sm">delete</span>
                              Delete Goal
                            </Button>
                          </div>
                        </div>
                        
                        {/* Pie Chart for goal progress */}
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg flex flex-col h-full">
                          <div className="flex flex-col">
                            <div className="text-sm font-medium mb-1 text-center">Goal Progress</div>
                            <div className="h-36 flex items-center justify-center">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={false}
                                  >
                                    {pieData.map((entry, index) => (
                                      <Cell 
                                        key={`cell-${index}`} 
                                        fill={COLORS[index % COLORS.length]} 
                                        strokeWidth={1}
                                      />
                                    ))}
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                            
                            <div className="flex justify-between text-sm mb-2 px-4">
                              <div className="font-medium flex items-center">
                                <div className="w-3 h-3 bg-green-600 dark:bg-green-400 mr-2"></div>
                                <span className="text-green-600 dark:text-green-400 mr-1">Saved:</span>
                                {progress.toFixed(0)}%
                              </div>
                              <div className="font-medium flex items-center">
                                <div className="w-3 h-3 bg-red-500 dark:bg-red-400 mr-2"></div>
                                <span className="text-red-500 dark:text-red-400 mr-1">Remaining:</span>
                                {(100 - progress).toFixed(0)}%
                              </div>
                            </div>
                          </div>
                          
                          <div className={`mt-auto p-3 rounded-lg text-sm ${
                              progress >= 50 
                                ? 'bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-100' 
                                : 'bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-100'
                            }`}>
                            <div className="flex items-center">
                              <span className={`material-icons mr-2 text-sm ${
                                progress >= 50 ? 'text-green-500' : 'text-red-500'
                              }`}>info</span>
                              {progress < 25 ? (
                                "Just getting started! Keep adding to your savings regularly."
                              ) : progress < 50 ? (
                                "Good progress! You're on your way to achieving this goal."
                              ) : progress < 75 ? (
                                "Excellent progress! You're more than halfway there."
                              ) : progress < 100 ? (
                                "Almost there! Just a little more to reach your goal."
                              ) : (
                                "Congratulations! You've achieved your goal!"
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Investment Suggestions in bottom rectangle */}
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 mt-4 rounded-none mx-0 mb-0">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium">Investment Suggestions:</h4>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-7 w-7 p-0 rounded-full"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    fetchInvestmentSuggestions(goal);
                                  }}
                                  disabled={loadingSuggestions[goal.id]}
                                >
                                  <span className="material-icons text-green-500 text-lg">
                                    {investmentSuggestions[goal.id]?.length > 0 ? "refresh" : "bolt"}
                                  </span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{investmentSuggestions[goal.id]?.length > 0 ? "Refresh suggestions" : "Get AI suggestions"}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        
                        {loadingSuggestions[goal.id] ? (
                          <div className="flex items-center justify-center py-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Generating suggestions...</span>
                          </div>
                        ) : investmentSuggestions[goal.id]?.length > 0 ? (
                          <ul className="ml-5 space-y-2 list-disc">
                            {investmentSuggestions[goal.id].map((suggestion, idx) => (
                              <li key={idx}>{suggestion}</li>
                            ))}
                          </ul>
                        ) : (
                          <>
                            {goal.name === "Emergency Fund" ? (
                              <ul className="ml-5 space-y-2 list-disc">
                                <li>Option 1: High-yield Savings Account for immediate access</li>
                                <li>Option 2: Liquid Mutual Funds for better returns with high liquidity</li>
                                <li>Option 3: Short-term FDs with auto-renewal facility</li>
                              </ul>
                            ) : goal.name === "Buying a Gadget" || goal.name === "Vacation & Travel" ? (
                              <ul className="ml-5 space-y-2 list-disc">
                                <li>Option 1: Recurring deposits with monthly contributions</li>
                                <li>Option 2: Short-term debt mutual funds with SIP option</li>
                                <li>Option 3: Savings account with automatic transfers</li>
                              </ul>
                            ) : goal.name === "Buying a Vehicle" ? (
                              <ul className="ml-5 space-y-2 list-disc">
                                <li>Option 1: Fixed deposits with quarterly interest payouts</li>
                                <li>Option 2: Balanced mutual funds with moderate risk</li>
                                <li>Option 3: Corporate bonds with stable returns</li>
                              </ul>
                            ) : goal.name === "Retirement Fund" || goal.name === "Child's Higher Education" ? (
                              <ul className="ml-5 space-y-2 list-disc">
                                <li>Option 1: PPF account with tax benefits</li>
                                <li>Option 2: Equity mutual funds for long-term growth</li>
                                <li>Option 3: NPS account with systematic contributions</li>
                              </ul>
                            ) : (
                              <ul className="ml-5 space-y-2 list-disc">
                                <li>Option 1: Balanced investment approach with debt and equity</li>
                                <li>Option 2: SIP in index funds for steady growth</li>
                                <li>Option 3: Goal-based investment plans from insurers</li>
                              </ul>
                            )}
                            <div className="text-center mt-2">
                              <Button
                                size="sm"
                                onClick={() => fetchInvestmentSuggestions(goal)}
                                className="text-xs bg-green-600 hover:bg-green-700 text-white"
                              >
                                <span className="material-icons text-xs mr-1">bolt</span>
                                Get AI Suggestions
                              </Button>
                            </div>
                          </>
                        )}
                      </div>

                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>
          
          {/* Add New Goal Tab */}
          <TabsContent value="add" className="space-y-4">
            <Card className="overflow-hidden">
              <div className="bg-gray-200 dark:bg-gray-800 px-4 py-3 border-b">
                <h3 className="font-medium text-lg flex items-center text-black dark:text-white">
                  <span className="material-icons text-green-500 mr-2">add_circle</span>
                  {editingGoalId ? "Edit Goal" : "Add New Goal"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Define your financial targets and create a realistic savings plan</p>
              </div>
              <CardContent className="p-4">
                <div className="space-y-6">
                  {/* Step 1: Choose Goal Type */}
                  <div>
                    <h4 className="text-md font-medium mb-3">Step 1: Choose Goal Type</h4>
                    <RadioGroup 
                      value={goalType} 
                      onValueChange={(value) => setGoalType(value as "Standard Goal" | "Custom Goal")}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Standard Goal" id="standard" />
                        <Label htmlFor="standard">Standard Goal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Custom Goal" id="custom" />
                        <Label htmlFor="custom">Custom Goal</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  {/* Step 2: Goal Details */}
                  <div>
                    <h4 className="text-md font-medium mb-3">Step 2: Goal Details</h4>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="mb-2 block">Goal Category</Label>
                          <Select 
                            value={category} 
                            onValueChange={(value) => {
                              setCategory(value as "Short-Term" | "Mid-Term" | "Long-Term");
                              if (goalType === "Standard Goal") {
                                setGoalName(predefinedGoals[value as keyof typeof predefinedGoals][0]);
                              }
                            }}
                          >
                            <SelectTrigger className="bg-gray-50 border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Short-Term">Short-Term (less than 1 year)</SelectItem>
                              <SelectItem value="Mid-Term">Mid-Term (1-5 years)</SelectItem>
                              <SelectItem value="Long-Term">Long-Term (more than 5 years)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {goalType === "Standard Goal" ? (
                          <div>
                            <Label className="mb-2 block">Goal Name</Label>
                            <Select value={goalName} onValueChange={setGoalName}>
                              <SelectTrigger className="bg-gray-50 border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <SelectValue placeholder="Select a goal" />
                              </SelectTrigger>
                              <SelectContent>
                                {predefinedGoals[category].map((goal) => (
                                  <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ) : (
                          <div>
                            <Label htmlFor="custom-goal" className="mb-2 block">Custom Goal Name</Label>
                            <Input
                              id="custom-goal"
                              value={customGoalName}
                              onChange={(e) => setCustomGoalName(e.target.value)}
                              className="bg-gray-50 border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="target-amount" className="mb-2 block">Target Amount (₹)</Label>
                          <Input
                            id="target-amount"
                            type="number"
                            min={1000}
                            step={1000}
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(Number(e.target.value))}
                            className="bg-gray-50 border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="current-savings" className="mb-2 block">Current Savings (₹)</Label>
                          <Input
                            id="current-savings"
                            type="number"
                            min={0}
                            step={1000}
                            value={currentSavings}
                            onChange={(e) => setCurrentSavings(Number(e.target.value))}
                            className="bg-gray-50 border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="target-date" className="mb-2 block">Target Date</Label>
                        <Input
                          id="target-date"
                          type="date"
                          value={targetDate}
                          onChange={(e) => setTargetDate(e.target.value)}
                          min={format(new Date(), "yyyy-MM-dd")}
                          className="bg-gray-50 border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg">
                    <div className="flex items-center text-green-600 dark:text-green-100">
                      <span className="material-icons text-green-500 mr-2">lightbulb</span>
                      <div>
                        <div className="font-medium">Suggested Monthly Savings</div>
                        <div className="text-lg font-bold">₹{monthlySavingsAmount.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Step 3: Savings Plan */}
                  <div>
                    <h4 className="text-md font-medium mb-3">Step 3: Choose Savings Plan</h4>
                    
                    <RadioGroup 
                      value={savingsPlan} 
                      onValueChange={(value) => setSavingsPlan(value as "Fixed Monthly Savings" | "Percentage of Income" | "Round-Up Savings")}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Fixed Monthly Savings" id="fixed" />
                        <Label htmlFor="fixed">Fixed Monthly Savings</Label>
                      </div>
                      
                      {savingsPlan === "Fixed Monthly Savings" && (
                        <div className="ml-6 mb-3">
                          <Label htmlFor="monthly-amount" className="mb-2 block text-sm">Monthly Savings Amount (₹)</Label>
                          <Input
                            id="monthly-amount"
                            type="number"
                            min={100}
                            step={100}
                            value={monthlySavingsAmount}
                            onChange={(e) => setMonthlySavingsAmount(Number(e.target.value))}
                            className="bg-gray-50 border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 max-w-sm"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Percentage of Income" id="percentage" />
                        <Label htmlFor="percentage">Percentage of Income</Label>
                      </div>
                      
                      {savingsPlan === "Percentage of Income" && (
                        <div className="ml-6 space-y-3 mb-3">
                          <div>
                            <Label htmlFor="monthly-income" className="mb-2 block text-sm">Monthly Income (₹)</Label>
                            <Input
                              id="monthly-income"
                              type="number"
                              min={1000}
                              step={1000}
                              value={monthlyIncome}
                              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                              className="bg-gray-50 border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 max-w-sm"
                            />
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <Label htmlFor="percentage-slider" className="text-sm">Savings Percentage</Label>
                              <span className="text-sm bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-100 px-2 py-0.5 rounded-full">
                                {savingsPercentage}%
                              </span>
                            </div>
                            <Input
                              id="percentage-slider"
                              type="range"
                              min={1}
                              max={100}
                              value={savingsPercentage}
                              onChange={(e) => setSavingsPercentage(Number(e.target.value))}
                              className="bg-gray-50 border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 max-w-sm"
                            />
                            <div className="text-sm text-gray-500 mt-1">
                              Monthly Savings: ₹{((monthlyIncome * savingsPercentage) / 100).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Round-Up Savings" id="roundup" />
                        <Label htmlFor="roundup">Round-Up Savings</Label>
                      </div>
                      
                      {savingsPlan === "Round-Up Savings" && (
                        <div className="ml-6 text-sm text-gray-600 dark:text-gray-400">
                          Round-Up Savings will automatically save the spare change from your transactions to reach your goal.
                        </div>
                      )}
                    </RadioGroup>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="auto-save" 
                      checked={autoSave}
                      onCheckedChange={setAutoSave}
                    />
                    <Label htmlFor="auto-save">Enable Auto-Save</Label>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveGoal}>
                      {editingGoalId ? "Update Goal" : "Save Goal"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Contribution Modal */}
      <Dialog open={showContributionModal} onOpenChange={setShowContributionModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Contribution</DialogTitle>
            <DialogDescription>
              Add a new contribution to your goal to track your progress.
            </DialogDescription>
          </DialogHeader>
          
          {contributionGoalId && (
            <div className="space-y-4 py-4">
              {/* Goal details */}
              {goals.find(g => g.id === contributionGoalId) && (
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg border">
                  <div className="font-medium">
                    {goals.find(g => g.id === contributionGoalId)?.name}
                  </div>
                  <div className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                    Current: ₹{goals.find(g => g.id === contributionGoalId)?.currentSavings.toLocaleString()} of 
                    ₹{goals.find(g => g.id === contributionGoalId)?.targetAmount.toLocaleString()}
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={calculateProgress(goals.find(g => g.id === contributionGoalId)!)} 
                      className={`h-2 ${
                        calculateProgress(goals.find(g => g.id === contributionGoalId)!) >= 50 
                          ? 'bg-green-100 dark:bg-green-900' 
                          : 'bg-red-100 dark:bg-red-900'
                      }`}
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="contribution-amount">Contribution Amount (₹)</Label>
                <Input
                  id="contribution-amount"
                  type="number"
                  min={100}
                  step={100}
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(Number(e.target.value))}
                  className="bg-gray-50 border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setShowContributionModal(false);
                setContributionGoalId(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="default"
              onClick={handleContribution}
              disabled={contributionAmount <= 0}
              className="bg-green-600 hover:bg-green-700"
            >
              Add Contribution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Confetti Celebration */}
      <ConfettiCelebration 
        show={showConfetti} 
        duration={6000}
        onComplete={handleConfettiComplete}
        particleCount={300}
        colors={['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899']}
      />
      
      {/* Goal Settings Financial Disclaimer */}
      <div className="mt-6">
        <FinancialDisclaimer 
          variant="compact" 
          calculatorType="generic"
          size="md" 
        />
      </div>
    </ResponsivePageWrapper>
  );
}