import { TabPills, TabItem } from "../components/ui/tab-pills";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Textarea } from "../components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "../components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

// Types
interface IncomeSource {
  id: number;
  name: string;
  type: "freelance" | "contract" | "seasonal" | "commission" | "passive" | "other";
  expectedAmount: number;
  frequency: "weekly" | "monthly" | "quarterly" | "biannual" | "annual" | "irregular";
  reliability: number; // 1-10 scale, 10 being most reliable
  notes: string;
}

interface Expense {
  id: number;
  name: string;
  amount: number;
  category: "essential" | "important" | "discretionary";
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "annual";
  fixedOrVariable: "fixed" | "variable";
}

interface MonthlyPlan {
  id: number;
  month: string;
  year: number;
  expectedIncome: number;
  guaranteedIncome: number;
  essentialExpenses: number;
  importantExpenses: number;
  discretionaryExpenses: number;
  savingsGoal: number;
  notes: string;
}

export default function IrregularIncome() {
  const { toast } = useToast();
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>(sampleIncomeSources);
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);
  const [monthlyPlans, setMonthlyPlans] = useState<MonthlyPlan[]>(sampleMonthlyPlans);
  const [selectedMonth, setSelectedMonth] = useState<MonthlyPlan | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingIncome, setIsAddingIncome] = useState(false);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  
  // New income source form state
  const [newIncomeSource, setNewIncomeSource] = useState<Omit<IncomeSource, "id">>({
    name: "",
    type: "freelance",
    expectedAmount: 0,
    frequency: "monthly",
    reliability: 5,
    notes: ""
  });
  
  // New expense form state
  const [newExpense, setNewExpense] = useState<Omit<Expense, "id">>({
    name: "",
    amount: 0,
    category: "essential",
    frequency: "monthly",
    fixedOrVariable: "fixed"
  });
  
  // New monthly plan form state
  const [newMonthlyPlan, setNewMonthlyPlan] = useState<Omit<MonthlyPlan, "id">>({
    month: "",
    year: new Date().getFullYear(),
    expectedIncome: 0,
    guaranteedIncome: 0,
    essentialExpenses: 0,
    importantExpenses: 0,
    discretionaryExpenses: 0,
    savingsGoal: 0,
    notes: ""
  });
  
  // Derived states
  const totalExpectedMonthlyIncome = calculateExpectedMonthlyIncome();
  const totalGuaranteedMonthlyIncome = calculateGuaranteedMonthlyIncome();
  const totalMonthlyExpenses = calculateTotalMonthlyExpenses();
  const essentialMonthlyExpenses = calculateMonthlyExpensesByCategory("essential");
  const importantMonthlyExpenses = calculateMonthlyExpensesByCategory("important");
  const discretionaryMonthlyExpenses = calculateMonthlyExpensesByCategory("discretionary");
  
  // Helper functions
  function calculateExpectedMonthlyIncome(): number {
    return incomeSources.reduce((total, source) => {
      let monthlyAmount = source.expectedAmount;
      
      switch (source.frequency) {
        case "weekly":
          monthlyAmount = source.expectedAmount * 4.33; // average weeks in a month
          break;
        case "quarterly":
          monthlyAmount = source.expectedAmount / 3;
          break;
        case "biannual":
          monthlyAmount = source.expectedAmount / 6;
          break;
        case "annual":
          monthlyAmount = source.expectedAmount / 12;
          break;
        case "irregular":
          monthlyAmount = source.expectedAmount / 12; // rough estimate
          break;
      }
      
      return total + monthlyAmount;
    }, 0);
  }
  
  function calculateGuaranteedMonthlyIncome(): number {
    return incomeSources
      .filter(source => source.reliability >= 8) // Reliability threshold for "guaranteed"
      .reduce((total, source) => {
        let monthlyAmount = source.expectedAmount;
        
        switch (source.frequency) {
          case "weekly":
            monthlyAmount = source.expectedAmount * 4.33;
            break;
          case "quarterly":
            monthlyAmount = source.expectedAmount / 3;
            break;
          case "biannual":
            monthlyAmount = source.expectedAmount / 6;
            break;
          case "annual":
            monthlyAmount = source.expectedAmount / 12;
            break;
          case "irregular":
            monthlyAmount = 0; // Irregular income isn't counted as guaranteed
            break;
        }
        
        return total + monthlyAmount;
      }, 0);
  }
  
  function calculateTotalMonthlyExpenses(): number {
    return expenses.reduce((total, expense) => {
      let monthlyAmount = expense.amount;
      
      switch (expense.frequency) {
        case "daily":
          monthlyAmount = expense.amount * 30; // approximate days in a month
          break;
        case "weekly":
          monthlyAmount = expense.amount * 4.33; // average weeks in a month
          break;
        case "quarterly":
          monthlyAmount = expense.amount / 3;
          break;
        case "annual":
          monthlyAmount = expense.amount / 12;
          break;
      }
      
      return total + monthlyAmount;
    }, 0);
  }
  
  function calculateMonthlyExpensesByCategory(category: "essential" | "important" | "discretionary"): number {
    return expenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => {
        let monthlyAmount = expense.amount;
        
        switch (expense.frequency) {
          case "daily":
            monthlyAmount = expense.amount * 30;
            break;
          case "weekly":
            monthlyAmount = expense.amount * 4.33;
            break;
          case "quarterly":
            monthlyAmount = expense.amount / 3;
            break;
          case "annual":
            monthlyAmount = expense.amount / 12;
            break;
        }
        
        return total + monthlyAmount;
      }, 0);
  }
  
  // Handler functions
  const handleAddIncomeSource = () => {
    if (!newIncomeSource.name || !newIncomeSource.expectedAmount) {
      toast({
        title: "Incomplete Form",
        description: "Please provide both a name and amount for your income source.",
        variant: "destructive"
      });
      return;
    }
    
    const incomeToAdd: IncomeSource = {
      ...newIncomeSource,
      id: Math.max(0, ...incomeSources.map(source => source.id)) + 1
    };
    
    setIncomeSources([...incomeSources, incomeToAdd]);
    setIsAddingIncome(false);
    setNewIncomeSource({
      name: "",
      type: "freelance",
      expectedAmount: 0,
      frequency: "monthly",
      reliability: 5,
      notes: ""
    });
    
    toast({
      title: "Income Source Added",
      description: "Your new income source has been added successfully."
    });
  };
  
  const handleAddExpense = () => {
    if (!newExpense.name || !newExpense.amount) {
      toast({
        title: "Incomplete Form",
        description: "Please provide both a name and amount for your expense.",
        variant: "destructive"
      });
      return;
    }
    
    const expenseToAdd: Expense = {
      ...newExpense,
      id: Math.max(0, ...expenses.map(expense => expense.id)) + 1
    };
    
    setExpenses([...expenses, expenseToAdd]);
    setIsAddingExpense(false);
    setNewExpense({
      name: "",
      amount: 0,
      category: "essential",
      frequency: "monthly",
      fixedOrVariable: "fixed"
    });
    
    toast({
      title: "Expense Added",
      description: "Your new expense has been added successfully."
    });
  };
  
  const handleCreateMonthlyPlan = () => {
    if (!newMonthlyPlan.month) {
      toast({
        title: "Incomplete Form",
        description: "Please select a month for your plan.",
        variant: "destructive"
      });
      return;
    }
    
    const monthYearKey = `${newMonthlyPlan.month}-${newMonthlyPlan.year}`;
    const existingPlan = monthlyPlans.find(
      plan => `${plan.month}-${plan.year}` === monthYearKey
    );
    
    if (existingPlan) {
      toast({
        title: "Plan Already Exists",
        description: `A plan for ${newMonthlyPlan.month} ${newMonthlyPlan.year} already exists.`,
        variant: "destructive"
      });
      return;
    }
    
    const planToAdd: MonthlyPlan = {
      ...newMonthlyPlan,
      id: Math.max(0, ...monthlyPlans.map(plan => plan.id)) + 1,
      expectedIncome: newMonthlyPlan.expectedIncome || totalExpectedMonthlyIncome,
      guaranteedIncome: newMonthlyPlan.guaranteedIncome || totalGuaranteedMonthlyIncome,
      essentialExpenses: newMonthlyPlan.essentialExpenses || essentialMonthlyExpenses,
      importantExpenses: newMonthlyPlan.importantExpenses || importantMonthlyExpenses,
      discretionaryExpenses: newMonthlyPlan.discretionaryExpenses || discretionaryMonthlyExpenses
    };
    
    setMonthlyPlans([...monthlyPlans, planToAdd]);
    setIsCreatingPlan(false);
    setNewMonthlyPlan({
      month: "",
      year: new Date().getFullYear(),
      expectedIncome: 0,
      guaranteedIncome: 0,
      essentialExpenses: 0,
      importantExpenses: 0,
      discretionaryExpenses: 0,
      savingsGoal: 0,
      notes: ""
    });
    
    toast({
      title: "Monthly Plan Created",
      description: `Your plan for ${planToAdd.month} ${planToAdd.year} has been created successfully.`
    });
  };
  
  const handleSelectMonth = (plan: MonthlyPlan) => {
    setSelectedMonth(plan);
  };
  
  const handleUpdateIncome = (id: number, updatedData: Partial<IncomeSource>) => {
    setIncomeSources(incomeSources.map(source => 
      source.id === id ? { ...source, ...updatedData } : source
    ));
  };
  
  const handleUpdateExpense = (id: number, updatedData: Partial<Expense>) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, ...updatedData } : expense
    ));
  };
  
  const handleDeleteIncome = (id: number) => {
    setIncomeSources(incomeSources.filter(source => source.id !== id));
    toast({
      title: "Income Source Deleted",
      description: "The income source has been removed."
    });
  };
  
  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    toast({
      title: "Expense Deleted",
      description: "The expense has been removed."
    });
  };
  
  // Get reliability color
  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 8) return "bg-green-500";
    if (reliability >= 5) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  // Get category badge variant
  const getCategoryVariant = (category: "essential" | "important" | "discretionary") => {
    switch (category) {
      case "essential":
        return "destructive";
      case "important":
        return "outline";
      case "discretionary":
        return "secondary";
    }
  };
  
  // Format frequency label
  const formatFrequency = (frequency: string) => {
    return frequency.charAt(0).toUpperCase() + frequency.slice(1);
  };
  
  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            onClick={() => window.history.back()}
            className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
          >
            <span className="material-icons text-sm">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold">Irregular Income Manager</h1>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-transparent p-0 border-0 w-full">
          <TabsTrigger value="dashboard" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Dashboard</TabsTrigger>
          <TabsTrigger value="income-expenses" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Income & Expenses</TabsTrigger>
          <TabsTrigger value="monthly-plans" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Monthly Plans</TabsTrigger>
        </TabsList>
        
        {/* Dashboard Tab */}
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Financial Overview */}
            <Card className="md:col-span-2">
              <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
                <CardTitle className="text-black dark:text-white">Financial Overview</CardTitle>
                <CardDescription>Summary of your income and expenses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Income vs Expenses Overview */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Income vs Expenses</h3>
                    <span className={`text-sm ${totalExpectedMonthlyIncome > totalMonthlyExpenses ? 'text-green-600' : 'text-red-600'}`}>
                      {totalExpectedMonthlyIncome > totalMonthlyExpenses ? 'Surplus' : 'Deficit'}: 
                      ₹{Math.abs(totalExpectedMonthlyIncome - totalMonthlyExpenses).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Expected Monthly Income</span>
                        <span className="font-medium">₹{totalExpectedMonthlyIncome.toLocaleString()}</span>
                      </div>
                      <Progress value={100} className="h-2 bg-blue-100" indicatorClassName="bg-blue-500" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Guaranteed Monthly Income</span>
                        <span className="font-medium">₹{totalGuaranteedMonthlyIncome.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(totalGuaranteedMonthlyIncome / totalExpectedMonthlyIncome) * 100} 
                        className="h-2 bg-blue-100" 
                        indicatorClassName="bg-green-500" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Total Monthly Expenses</span>
                        <span className="font-medium">₹{totalMonthlyExpenses.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(totalMonthlyExpenses / totalExpectedMonthlyIncome) * 100} 
                        className="h-2 bg-blue-100" 
                        indicatorClassName="bg-red-500" 
                      />
                    </div>
                  </div>
                </div>
                
                {/* Expense Breakdown */}
                <div>
                  <h3 className="font-medium mb-2">Expense Breakdown</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Essential Expenses</span>
                        <span className="font-medium">₹{essentialMonthlyExpenses.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(essentialMonthlyExpenses / totalMonthlyExpenses) * 100} 
                        className="h-2 bg-gray-100" 
                        indicatorClassName="bg-red-500" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Important Expenses</span>
                        <span className="font-medium">₹{importantMonthlyExpenses.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(importantMonthlyExpenses / totalMonthlyExpenses) * 100} 
                        className="h-2 bg-gray-100" 
                        indicatorClassName="bg-yellow-500" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Discretionary Expenses</span>
                        <span className="font-medium">₹{discretionaryMonthlyExpenses.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(discretionaryMonthlyExpenses / totalMonthlyExpenses) * 100} 
                        className="h-2 bg-gray-100" 
                        indicatorClassName="bg-blue-500" 
                      />
                    </div>
                  </div>
                </div>
                
                {/* Income Stability */}
                <div>
                  <h3 className="font-medium mb-2">Income Stability</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-sm text-gray-500">Guaranteed vs Expected</p>
                        <p className="font-medium">
                          {Math.round((totalGuaranteedMonthlyIncome / totalExpectedMonthlyIncome) * 100)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Stability Rating</p>
                        <p className="font-medium">
                          {totalGuaranteedMonthlyIncome >= essentialMonthlyExpenses 
                            ? "Good" 
                            : totalGuaranteedMonthlyIncome >= essentialMonthlyExpenses * 0.75 
                              ? "Moderate" 
                              : "Low"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Progress 
                        value={(totalGuaranteedMonthlyIncome / totalExpectedMonthlyIncome) * 100} 
                        className="h-1.5 bg-gray-200" 
                        indicatorClassName="bg-green-500" 
                      />
                      
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Low Stability</span>
                        <span>High Stability</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
                <CardTitle className="text-black dark:text-white">Quick Actions</CardTitle>
                <CardDescription>Manage your finances</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog open={isAddingIncome} onOpenChange={setIsAddingIncome}>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start" variant="outline">
                      <span className="material-icons mr-2 text-green-500">add_circle</span>
                      Add Income Source
                    </Button>
                  </DialogTrigger>
                </Dialog>
                
                <Dialog open={isAddingExpense} onOpenChange={setIsAddingExpense}>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start" variant="outline">
                      <span className="material-icons mr-2 text-red-500">remove_circle</span>
                      Add Expense
                    </Button>
                  </DialogTrigger>
                </Dialog>
                
                <Dialog open={isCreatingPlan} onOpenChange={setIsCreatingPlan}>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start" variant="outline">
                      <span className="material-icons mr-2 text-blue-500">calendar_today</span>
                      Create Monthly Plan
                    </Button>
                  </DialogTrigger>
                </Dialog>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Safety Status</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Essential Expenses Covered</span>
                      <Badge variant={totalGuaranteedMonthlyIncome >= essentialMonthlyExpenses ? "success" : "destructive"}>
                        {totalGuaranteedMonthlyIncome >= essentialMonthlyExpenses ? "Yes" : "No"}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Income Sources</span>
                      <Badge variant={incomeSources.length > 2 ? "success" : "outline"}>
                        {incomeSources.length}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Monthly Buffer</span>
                      <Badge variant={totalExpectedMonthlyIncome > totalMonthlyExpenses * 1.2 ? "success" : "outline"}>
                        {Math.round(((totalExpectedMonthlyIncome / totalMonthlyExpenses) - 1) * 100)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Financial Tips */}
            <Card className="md:col-span-3">
              <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
                <CardTitle className="text-black dark:text-white">Tips for Managing Irregular Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <span className="material-icons text-blue-600">account_balance</span>
                    </div>
                    <h3 className="font-medium mb-1">Build an Income Buffer</h3>
                    <p className="text-sm text-gray-600">Aim to save 3-6 months of essential expenses in an emergency fund to cover income gaps.</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-3">
                      <span className="material-icons text-green-600">layers</span>
                    </div>
                    <h3 className="font-medium mb-1">Create a Tiered Budget</h3>
                    <p className="text-sm text-gray-600">Categorize expenses into essentials (must-pay), important, and discretionary (can be delayed).</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                      <span className="material-icons text-purple-600">account_balance_wallet</span>
                    </div>
                    <h3 className="font-medium mb-1">Use Separate Accounts</h3>
                    <p className="text-sm text-gray-600">Maintain different accounts for income collection, bill payments, and discretionary spending.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Income & Expenses Tab */}
        <TabsContent value="income-expenses">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Income Sources */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-black dark:text-white">Income Sources</CardTitle>
                  <CardDescription>Manage your income streams</CardDescription>
                </div>
                
                <Dialog open={isAddingIncome} onOpenChange={setIsAddingIncome}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <span className="material-icons text-sm mr-1">add</span>
                      Add Income
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Add Income Source</DialogTitle>
                      <DialogDescription>
                        Track a new source of income to better manage your irregular earnings.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="income-name">Name</Label>
                        <Input 
                          id="income-name" 
                          placeholder="e.g., Freelance Design, Rental Income" 
                          value={newIncomeSource.name}
                          onChange={(e) => setNewIncomeSource({...newIncomeSource, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="income-type">Type</Label>
                          <Select 
                            value={newIncomeSource.type} 
                            onValueChange={(value) => setNewIncomeSource({...newIncomeSource, type: value as any})}
                          >
                            <SelectTrigger id="income-type">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="freelance">Freelance</SelectItem>
                              <SelectItem value="contract">Contract</SelectItem>
                              <SelectItem value="seasonal">Seasonal</SelectItem>
                              <SelectItem value="commission">Commission</SelectItem>
                              <SelectItem value="passive">Passive</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="income-frequency">Frequency</Label>
                          <Select 
                            value={newIncomeSource.frequency} 
                            onValueChange={(value) => setNewIncomeSource({...newIncomeSource, frequency: value as any})}
                          >
                            <SelectTrigger id="income-frequency">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                              <SelectItem value="biannual">Biannual</SelectItem>
                              <SelectItem value="annual">Annual</SelectItem>
                              <SelectItem value="irregular">Irregular</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="income-amount">Expected Amount (₹)</Label>
                        <Input 
                          id="income-amount" 
                          type="number" 
                          placeholder="10000" 
                          value={newIncomeSource.expectedAmount || ""}
                          onChange={(e) => setNewIncomeSource({
                            ...newIncomeSource, 
                            expectedAmount: Number(e.target.value)
                          })}
                        />
                        <p className="text-xs text-gray-500">
                          Enter the amount you expect per {newIncomeSource.frequency} payment
                        </p>
                      </div>
                      
                      <div className="grid gap-2">
                        <div className="flex justify-between">
                          <Label htmlFor="income-reliability">Reliability (1-10)</Label>
                          <span className="text-sm">{newIncomeSource.reliability}/10</span>
                        </div>
                        <Slider
                          id="income-reliability"
                          min={1}
                          max={10}
                          step={1}
                          value={[newIncomeSource.reliability]}
                          onValueChange={(value) => setNewIncomeSource({
                            ...newIncomeSource, 
                            reliability: value[0]
                          })}
                        />
                        <p className="text-xs text-gray-500">
                          How reliable is this income source? (10 = extremely reliable)
                        </p>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="income-notes">Notes (Optional)</Label>
                        <Textarea 
                          id="income-notes" 
                          placeholder="Additional details about this income source" 
                          value={newIncomeSource.notes}
                          onChange={(e) => setNewIncomeSource({...newIncomeSource, notes: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingIncome(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddIncomeSource}>
                        Add Income Source
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              
              <CardContent>
                {incomeSources.length === 0 ? (
                  <div className="text-center py-6">
                    <span className="material-icons text-gray-400 text-4xl mb-2">payments</span>
                    <h3 className="font-medium mb-1">No income sources</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Start by adding your income streams
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddingIncome(true)}
                      className="mx-auto"
                    >
                      <span className="material-icons text-sm mr-1">add</span>
                      Add Income Source
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {incomeSources.map(income => (
                      <div key={income.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{income.name}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="capitalize">{income.type}</span>
                              <span className="mx-1">•</span>
                              <span>{formatFrequency(income.frequency)}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button 
                              className="text-gray-500 hover:text-gray-700"
                              onClick={() => handleDeleteIncome(income.id)}
                            >
                              <span className="material-icons text-sm">delete</span>
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <span className="text-sm text-gray-500">Expected Amount</span>
                            <p className="font-medium">₹{income.expectedAmount.toLocaleString()}</p>
                          </div>
                          
                          <div>
                            <span className="text-sm text-gray-500">Reliability</span>
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full ${getReliabilityColor(income.reliability)} mr-1`}></div>
                              <p className="font-medium">{income.reliability}/10</p>
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-sm text-gray-500">Monthly Equivalent</span>
                            <p className="font-medium">
                              ₹{(income.frequency === "weekly" 
                                ? income.expectedAmount * 4.33
                                : income.frequency === "monthly" 
                                  ? income.expectedAmount
                                  : income.frequency === "quarterly" 
                                    ? income.expectedAmount / 3
                                    : income.frequency === "biannual" 
                                      ? income.expectedAmount / 6
                                      : income.frequency === "annual" 
                                        ? income.expectedAmount / 12
                                        : income.expectedAmount / 12
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        {income.notes && (
                          <div className="text-sm text-gray-600 border-t pt-2 mt-2">
                            {income.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Expenses */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-black dark:text-white">Expenses</CardTitle>
                  <CardDescription>Manage your spending</CardDescription>
                </div>
                
                <Dialog open={isAddingExpense} onOpenChange={setIsAddingExpense}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <span className="material-icons text-sm mr-1">add</span>
                      Add Expense
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Add Expense</DialogTitle>
                      <DialogDescription>
                        Track a new expense to better manage your finances.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expense-name">Name</Label>
                        <Input 
                          id="expense-name" 
                          placeholder="e.g., Rent, Utilities, Groceries" 
                          value={newExpense.name}
                          onChange={(e) => setNewExpense({...newExpense, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="expense-amount">Amount (₹)</Label>
                        <Input 
                          id="expense-amount" 
                          type="number" 
                          placeholder="5000" 
                          value={newExpense.amount || ""}
                          onChange={(e) => setNewExpense({
                            ...newExpense, 
                            amount: Number(e.target.value)
                          })}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expense-category">Category</Label>
                          <Select 
                            value={newExpense.category} 
                            onValueChange={(value) => setNewExpense({...newExpense, category: value as any})}
                          >
                            <SelectTrigger id="expense-category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="essential">Essential</SelectItem>
                              <SelectItem value="important">Important</SelectItem>
                              <SelectItem value="discretionary">Discretionary</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="expense-frequency">Frequency</Label>
                          <Select 
                            value={newExpense.frequency} 
                            onValueChange={(value) => setNewExpense({...newExpense, frequency: value as any})}
                          >
                            <SelectTrigger id="expense-frequency">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                              <SelectItem value="annual">Annual</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="expense-type">Expense Type</Label>
                        <Select 
                          value={newExpense.fixedOrVariable} 
                          onValueChange={(value) => setNewExpense({...newExpense, fixedOrVariable: value as any})}
                        >
                          <SelectTrigger id="expense-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fixed">Fixed</SelectItem>
                            <SelectItem value="variable">Variable</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500">
                          Fixed expenses have consistent amounts, while variable expenses fluctuate
                        </p>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingExpense(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddExpense}>
                        Add Expense
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              
              <CardContent>
                {expenses.length === 0 ? (
                  <div className="text-center py-6">
                    <span className="material-icons text-gray-400 text-4xl mb-2">receipt_long</span>
                    <h3 className="font-medium mb-1">No expenses</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Start by adding your regular expenses
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddingExpense(true)}
                      className="mx-auto"
                    >
                      <span className="material-icons text-sm mr-1">add</span>
                      Add Expense
                    </Button>
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="essential">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <Badge variant="destructive" className="mr-2">Essential</Badge>
                          <span>Must-pay expenses</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {expenses
                            .filter(expense => expense.category === "essential")
                            .map(expense => (
                              <div key={expense.id} className="border rounded-lg p-3 flex justify-between items-center">
                                <div>
                                  <h4 className="font-medium">{expense.name}</h4>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <span>{formatFrequency(expense.frequency)}</span>
                                    <span className="mx-1">•</span>
                                    <span className="capitalize">{expense.fixedOrVariable}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                  <div className="text-right">
                                    <p className="font-medium">₹{expense.amount.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">
                                      Monthly: ₹{(expense.frequency === "daily" 
                                        ? expense.amount * 30
                                        : expense.frequency === "weekly" 
                                          ? expense.amount * 4.33
                                          : expense.frequency === "monthly" 
                                            ? expense.amount
                                            : expense.frequency === "quarterly" 
                                              ? expense.amount / 3
                                              : expense.amount / 12
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                  
                                  <button 
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => handleDeleteExpense(expense.id)}
                                  >
                                    <span className="material-icons text-sm">delete</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                            
                          {expenses.filter(expense => expense.category === "essential").length === 0 && (
                            <div className="text-center py-2">
                              <p className="text-sm text-gray-500">No essential expenses added</p>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="important">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">Important</Badge>
                          <span>Should-pay expenses</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {expenses
                            .filter(expense => expense.category === "important")
                            .map(expense => (
                              <div key={expense.id} className="border rounded-lg p-3 flex justify-between items-center">
                                <div>
                                  <h4 className="font-medium">{expense.name}</h4>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <span>{formatFrequency(expense.frequency)}</span>
                                    <span className="mx-1">•</span>
                                    <span className="capitalize">{expense.fixedOrVariable}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                  <div className="text-right">
                                    <p className="font-medium">₹{expense.amount.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">
                                      Monthly: ₹{(expense.frequency === "daily" 
                                        ? expense.amount * 30
                                        : expense.frequency === "weekly" 
                                          ? expense.amount * 4.33
                                          : expense.frequency === "monthly" 
                                            ? expense.amount
                                            : expense.frequency === "quarterly" 
                                              ? expense.amount / 3
                                              : expense.amount / 12
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                  
                                  <button 
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => handleDeleteExpense(expense.id)}
                                  >
                                    <span className="material-icons text-sm">delete</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                            
                          {expenses.filter(expense => expense.category === "important").length === 0 && (
                            <div className="text-center py-2">
                              <p className="text-sm text-gray-500">No important expenses added</p>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="discretionary">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <Badge variant="secondary" className="mr-2">Discretionary</Badge>
                          <span>Can-delay expenses</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {expenses
                            .filter(expense => expense.category === "discretionary")
                            .map(expense => (
                              <div key={expense.id} className="border rounded-lg p-3 flex justify-between items-center">
                                <div>
                                  <h4 className="font-medium">{expense.name}</h4>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <span>{formatFrequency(expense.frequency)}</span>
                                    <span className="mx-1">•</span>
                                    <span className="capitalize">{expense.fixedOrVariable}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                  <div className="text-right">
                                    <p className="font-medium">₹{expense.amount.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">
                                      Monthly: ₹{(expense.frequency === "daily" 
                                        ? expense.amount * 30
                                        : expense.frequency === "weekly" 
                                          ? expense.amount * 4.33
                                          : expense.frequency === "monthly" 
                                            ? expense.amount
                                            : expense.frequency === "quarterly" 
                                              ? expense.amount / 3
                                              : expense.amount / 12
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                  
                                  <button 
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => handleDeleteExpense(expense.id)}
                                  >
                                    <span className="material-icons text-sm">delete</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                            
                          {expenses.filter(expense => expense.category === "discretionary").length === 0 && (
                            <div className="text-center py-2">
                              <p className="text-sm text-gray-500">No discretionary expenses added</p>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Monthly Plans Tab */}
        <TabsContent value="monthly-plans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Monthly Plans List */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-black dark:text-white">Monthly Plans</CardTitle>
                    <CardDescription>Plan for income fluctuations</CardDescription>
                  </div>
                  
                  <Dialog open={isCreatingPlan} onOpenChange={setIsCreatingPlan}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <span className="material-icons text-sm mr-1">add</span>
                        New Plan
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Create Monthly Plan</DialogTitle>
                        <DialogDescription>
                          Create a financial plan for a specific month.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="plan-month">Month</Label>
                            <Select 
                              value={newMonthlyPlan.month} 
                              onValueChange={(value) => setNewMonthlyPlan({...newMonthlyPlan, month: value})}
                            >
                              <SelectTrigger id="plan-month">
                                <SelectValue placeholder="Select month" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="January">January</SelectItem>
                                <SelectItem value="February">February</SelectItem>
                                <SelectItem value="March">March</SelectItem>
                                <SelectItem value="April">April</SelectItem>
                                <SelectItem value="May">May</SelectItem>
                                <SelectItem value="June">June</SelectItem>
                                <SelectItem value="July">July</SelectItem>
                                <SelectItem value="August">August</SelectItem>
                                <SelectItem value="September">September</SelectItem>
                                <SelectItem value="October">October</SelectItem>
                                <SelectItem value="November">November</SelectItem>
                                <SelectItem value="December">December</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="plan-year">Year</Label>
                            <Select 
                              value={newMonthlyPlan.year.toString()} 
                              onValueChange={(value) => setNewMonthlyPlan({...newMonthlyPlan, year: Number(value)})}
                            >
                              <SelectTrigger id="plan-year">
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={(new Date().getFullYear()).toString()}>
                                  {new Date().getFullYear()}
                                </SelectItem>
                                <SelectItem value={(new Date().getFullYear() + 1).toString()}>
                                  {new Date().getFullYear() + 1}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="expected-income">Expected Income (₹)</Label>
                          <Input 
                            id="expected-income" 
                            type="number" 
                            placeholder={totalExpectedMonthlyIncome.toString()}
                            value={newMonthlyPlan.expectedIncome || ""}
                            onChange={(e) => setNewMonthlyPlan({
                              ...newMonthlyPlan, 
                              expectedIncome: Number(e.target.value)
                            })}
                          />
                          <p className="text-xs text-gray-500">
                            Default: ₹{totalExpectedMonthlyIncome.toLocaleString()} (from your income sources)
                          </p>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="guaranteed-income">Guaranteed Income (₹)</Label>
                          <Input 
                            id="guaranteed-income" 
                            type="number" 
                            placeholder={totalGuaranteedMonthlyIncome.toString()}
                            value={newMonthlyPlan.guaranteedIncome || ""}
                            onChange={(e) => setNewMonthlyPlan({
                              ...newMonthlyPlan, 
                              guaranteedIncome: Number(e.target.value)
                            })}
                          />
                          <p className="text-xs text-gray-500">
                            Default: ₹{totalGuaranteedMonthlyIncome.toLocaleString()} (from reliable sources)
                          </p>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="savings-goal">Savings Goal (₹)</Label>
                          <Input 
                            id="savings-goal" 
                            type="number" 
                            placeholder="5000" 
                            value={newMonthlyPlan.savingsGoal || ""}
                            onChange={(e) => setNewMonthlyPlan({
                              ...newMonthlyPlan, 
                              savingsGoal: Number(e.target.value)
                            })}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="plan-notes">Notes (Optional)</Label>
                          <Textarea 
                            id="plan-notes" 
                            placeholder="Additional details about this month's plan" 
                            value={newMonthlyPlan.notes}
                            onChange={(e) => setNewMonthlyPlan({...newMonthlyPlan, notes: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreatingPlan(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateMonthlyPlan}>
                          Create Plan
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                
                <CardContent>
                  {monthlyPlans.length === 0 ? (
                    <div className="text-center py-6">
                      <span className="material-icons text-gray-400 text-4xl mb-2">calendar_today</span>
                      <h3 className="font-medium mb-1">No monthly plans</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Create plans to manage monthly income variations
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsCreatingPlan(true)}
                        className="mx-auto"
                      >
                        <span className="material-icons text-sm mr-1">add</span>
                        Create Plan
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {monthlyPlans.map(plan => (
                        <div 
                          key={plan.id}
                          className={`border rounded-lg p-3 cursor-pointer transition-colors hover:bg-gray-50 ${
                            selectedMonth?.id === plan.id ? "border-primary bg-primary/5" : ""
                          }`}
                          onClick={() => handleSelectMonth(plan)}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-medium">
                              {plan.month} {plan.year}
                            </h3>
                            <Badge variant={
                              plan.guaranteedIncome >= plan.essentialExpenses 
                                ? "success" 
                                : "destructive"
                            }>
                              {plan.guaranteedIncome >= plan.essentialExpenses 
                                ? "Covered" 
                                : "At Risk"}
                            </Badge>
                          </div>
                          
                          <div className="mb-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Expected: ₹{plan.expectedIncome.toLocaleString()}</span>
                              <span>Expenses: ₹{(plan.essentialExpenses + plan.importantExpenses + plan.discretionaryExpenses).toLocaleString()}</span>
                            </div>
                            <Progress 
                              value={(plan.essentialExpenses + plan.importantExpenses + plan.discretionaryExpenses) / plan.expectedIncome * 100} 
                              className="h-1.5" 
                            />
                          </div>
                          
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Savings Goal: ₹{plan.savingsGoal.toLocaleString()}</span>
                            <span>
                              Surplus: 
                              <span className={
                                plan.expectedIncome > (plan.essentialExpenses + plan.importantExpenses + plan.discretionaryExpenses + plan.savingsGoal)
                                  ? " text-green-600"
                                  : " text-red-600"
                              }>
                                {" "}₹{Math.abs(plan.expectedIncome - (plan.essentialExpenses + plan.importantExpenses + plan.discretionaryExpenses + plan.savingsGoal)).toLocaleString()}
                              </span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Monthly Plan Details */}
            <div className="md:col-span-2">
              {selectedMonth ? (
                <Card>
                  <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-black dark:text-white">{selectedMonth.month} {selectedMonth.year} Plan</CardTitle>
                        <CardDescription>
                          Financial plan for {selectedMonth.month}
                        </CardDescription>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <span className="material-icons text-sm mr-1">edit</span>
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <span className="material-icons text-sm mr-1">content_copy</span>
                          Duplicate
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Income vs Expenses */}
                    <div>
                      <h3 className="font-medium mb-3">Income vs Expenses</h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center mb-1">
                            <span className="material-icons text-green-500 mr-1">trending_up</span>
                            <h4 className="font-medium">Income</h4>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Expected</span>
                                <span className="font-medium">₹{selectedMonth.expectedIncome.toLocaleString()}</span>
                              </div>
                              <Progress value={100} className="h-1.5 bg-gray-100" indicatorClassName="bg-green-500" />
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Guaranteed</span>
                                <span className="font-medium">₹{selectedMonth.guaranteedIncome.toLocaleString()}</span>
                              </div>
                              <Progress 
                                value={(selectedMonth.guaranteedIncome / selectedMonth.expectedIncome) * 100} 
                                className="h-1.5 bg-gray-100" 
                                indicatorClassName="bg-blue-500" 
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center mb-1">
                            <span className="material-icons text-red-500 mr-1">trending_down</span>
                            <h4 className="font-medium">Expenses</h4>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Essential</span>
                                <span className="font-medium">₹{selectedMonth.essentialExpenses.toLocaleString()}</span>
                              </div>
                              <Progress 
                                value={(selectedMonth.essentialExpenses / selectedMonth.expectedIncome) * 100} 
                                className="h-1.5 bg-gray-100" 
                                indicatorClassName="bg-red-500" 
                              />
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Important</span>
                                <span className="font-medium">₹{selectedMonth.importantExpenses.toLocaleString()}</span>
                              </div>
                              <Progress 
                                value={(selectedMonth.importantExpenses / selectedMonth.expectedIncome) * 100} 
                                className="h-1.5 bg-gray-100" 
                                indicatorClassName="bg-yellow-500" 
                              />
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Discretionary</span>
                                <span className="font-medium">₹{selectedMonth.discretionaryExpenses.toLocaleString()}</span>
                              </div>
                              <Progress 
                                value={(selectedMonth.discretionaryExpenses / selectedMonth.expectedIncome) * 100} 
                                className="h-1.5 bg-gray-100" 
                                indicatorClassName="bg-purple-500" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
                            <p className="font-medium text-lg">
                              ₹{(selectedMonth.essentialExpenses + selectedMonth.importantExpenses + selectedMonth.discretionaryExpenses).toLocaleString()}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Savings Goal</p>
                            <p className="font-medium text-lg">₹{selectedMonth.savingsGoal.toLocaleString()}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Net Balance</p>
                            <p className={`font-medium text-lg ${
                              selectedMonth.expectedIncome - (selectedMonth.essentialExpenses + selectedMonth.importantExpenses + selectedMonth.discretionaryExpenses + selectedMonth.savingsGoal) >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}>
                              ₹{(selectedMonth.expectedIncome - (selectedMonth.essentialExpenses + selectedMonth.importantExpenses + selectedMonth.discretionaryExpenses + selectedMonth.savingsGoal)).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Risk Assessment */}
                    <div>
                      <h3 className="font-medium mb-3">Risk Assessment</h3>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Essential Expenses Coverage</p>
                            <div className="flex items-center">
                              <Badge variant={
                                selectedMonth.guaranteedIncome >= selectedMonth.essentialExpenses 
                                  ? "success" 
                                  : "destructive"
                              }>
                                {selectedMonth.guaranteedIncome >= selectedMonth.essentialExpenses 
                                  ? "Fully Covered" 
                                  : "Partially Covered"}
                              </Badge>
                              <span className="ml-2 text-sm">
                                {Math.round((selectedMonth.guaranteedIncome / selectedMonth.essentialExpenses) * 100)}%
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Income Uncertainty</p>
                            <Badge variant={
                              (selectedMonth.expectedIncome - selectedMonth.guaranteedIncome) / selectedMonth.expectedIncome <= 0.3
                                ? "success"
                                : (selectedMonth.expectedIncome - selectedMonth.guaranteedIncome) / selectedMonth.expectedIncome <= 0.6
                                  ? "outline"
                                  : "destructive"
                            }>
                              {(selectedMonth.expectedIncome - selectedMonth.guaranteedIncome) / selectedMonth.expectedIncome <= 0.3
                                ? "Low"
                                : (selectedMonth.expectedIncome - selectedMonth.guaranteedIncome) / selectedMonth.expectedIncome <= 0.6
                                  ? "Medium"
                                  : "High"}
                            </Badge>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Budget Flexibility</p>
                            <Badge variant={
                              selectedMonth.discretionaryExpenses / (selectedMonth.essentialExpenses + selectedMonth.importantExpenses + selectedMonth.discretionaryExpenses) >= 0.2
                                ? "success"
                                : "outline"
                            }>
                              {selectedMonth.discretionaryExpenses / (selectedMonth.essentialExpenses + selectedMonth.importantExpenses + selectedMonth.discretionaryExpenses) >= 0.2
                                ? "Good"
                                : "Limited"}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded p-3">
                          <h4 className="font-medium mb-2">Recommendations</h4>
                          <ul className="text-sm space-y-2">
                            {selectedMonth.guaranteedIncome < selectedMonth.essentialExpenses && (
                              <li className="flex items-start">
                                <span className="material-icons text-red-500 text-sm mr-1 mt-0.5">warning</span>
                                Prioritize securing additional guaranteed income of at least 
                                ₹{(selectedMonth.essentialExpenses - selectedMonth.guaranteedIncome).toLocaleString()} 
                                to cover essential expenses.
                              </li>
                            )}
                            
                            {selectedMonth.expectedIncome < (selectedMonth.essentialExpenses + selectedMonth.importantExpenses + selectedMonth.savingsGoal) && (
                              <li className="flex items-start">
                                <span className="material-icons text-yellow-500 text-sm mr-1 mt-0.5">priority_high</span>
                                Consider reducing discretionary expenses by 
                                ₹{(selectedMonth.essentialExpenses + selectedMonth.importantExpenses + selectedMonth.savingsGoal - selectedMonth.expectedIncome).toLocaleString()} 
                                to balance your budget.
                              </li>
                            )}
                            
                            {selectedMonth.guaranteedIncome >= selectedMonth.essentialExpenses && 
                             selectedMonth.expectedIncome >= (selectedMonth.essentialExpenses + selectedMonth.importantExpenses + selectedMonth.discretionaryExpenses + selectedMonth.savingsGoal) && (
                              <li className="flex items-start">
                                <span className="material-icons text-green-500 text-sm mr-1 mt-0.5">check_circle</span>
                                Your budget looks healthy! Consider allocating the surplus of 
                                ₹{(selectedMonth.expectedIncome - (selectedMonth.essentialExpenses + selectedMonth.importantExpenses + selectedMonth.discretionaryExpenses + selectedMonth.savingsGoal)).toLocaleString()} 
                                to your emergency fund or extra savings.
                              </li>
                            )}
                            
                            {(selectedMonth.expectedIncome - selectedMonth.guaranteedIncome) / selectedMonth.expectedIncome > 0.5 && (
                              <li className="flex items-start">
                                <span className="material-icons text-yellow-500 text-sm mr-1 mt-0.5">info</span>
                                Your income uncertainty is high. Create a backup plan for covering expenses if expected income doesn't materialize.
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    {/* Notes */}
                    {selectedMonth.notes && (
                      <div>
                        <h3 className="font-medium mb-2">Notes</h3>
                        <div className="border rounded-lg p-4 text-sm">
                          {selectedMonth.notes}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <span className="material-icons text-gray-400 text-5xl mb-4">calendar_month</span>
                    <h2 className="text-xl font-medium mb-2">Select a Monthly Plan</h2>
                    <p className="text-gray-500 text-center mb-6 max-w-md">
                      Select a monthly plan from the list to view details, or create a new plan to get started
                    </p>
                    <Button onClick={() => setIsCreatingPlan(true)}>
                      <span className="material-icons text-sm mr-1">add</span>
                      Create New Plan
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Sample data
const sampleIncomeSources: IncomeSource[] = [
  {
    id: 1,
    name: "Freelance Web Development",
    type: "freelance",
    expectedAmount: 60000,
    frequency: "monthly",
    reliability: 7,
    notes: "Work with regular clients, but project timelines can vary"
  },
  {
    id: 2,
    name: "Content Writing",
    type: "freelance",
    expectedAmount: 25000,
    frequency: "monthly",
    reliability: 6,
    notes: "Approximately 5 articles per month at ₹5,000 each"
  },
  {
    id: 3,
    name: "Digital Marketing Consulting",
    type: "contract",
    expectedAmount: 40000,
    frequency: "monthly",
    reliability: 9,
    notes: "6-month contract, renewed twice so far"
  },
  {
    id: 4,
    name: "Online Course Sales",
    type: "passive",
    expectedAmount: 12000,
    frequency: "monthly",
    reliability: 5,
    notes: "Fluctuates based on marketing efforts and seasonality"
  },
  {
    id: 5,
    name: "Wedding Photography",
    type: "seasonal",
    expectedAmount: 35000,
    frequency: "irregular",
    reliability: 3,
    notes: "Higher demand during wedding season (Oct-Feb)"
  },
  {
    id: 6,
    name: "Dividends",
    type: "passive",
    expectedAmount: 18000,
    frequency: "quarterly",
    reliability: 8,
    notes: "From diversified stock portfolio"
  }
];

const sampleExpenses: Expense[] = [
  {
    id: 1,
    name: "Rent",
    amount: 22000,
    category: "essential",
    frequency: "monthly",
    fixedOrVariable: "fixed"
  },
  {
    id: 2,
    name: "Utilities",
    amount: 4500,
    category: "essential",
    frequency: "monthly",
    fixedOrVariable: "variable"
  },
  {
    id: 3,
    name: "Groceries",
    amount: 12000,
    category: "essential",
    frequency: "monthly",
    fixedOrVariable: "variable"
  },
  {
    id: 4,
    name: "Internet & Phone",
    amount: 2500,
    category: "essential",
    frequency: "monthly",
    fixedOrVariable: "fixed"
  },
  {
    id: 5,
    name: "Health Insurance",
    amount: 3000,
    category: "essential",
    frequency: "monthly",
    fixedOrVariable: "fixed"
  },
  {
    id: 6,
    name: "Term Life Insurance",
    amount: 2000,
    category: "important",
    frequency: "monthly",
    fixedOrVariable: "fixed"
  },
  {
    id: 7,
    name: "Loan Repayment",
    amount: 10000,
    category: "essential",
    frequency: "monthly",
    fixedOrVariable: "fixed"
  },
  {
    id: 8,
    name: "Transportation",
    amount: 5000,
    category: "important",
    frequency: "monthly",
    fixedOrVariable: "variable"
  },
  {
    id: 9,
    name: "Dining Out",
    amount: 8000,
    category: "discretionary",
    frequency: "monthly",
    fixedOrVariable: "variable"
  },
  {
    id: 10,
    name: "Entertainment",
    amount: 4000,
    category: "discretionary",
    frequency: "monthly",
    fixedOrVariable: "variable"
  },
  {
    id: 11,
    name: "Clothing",
    amount: 3000,
    category: "discretionary",
    frequency: "monthly",
    fixedOrVariable: "variable"
  },
  {
    id: 12,
    name: "Professional Development",
    amount: 5000,
    category: "important",
    frequency: "monthly",
    fixedOrVariable: "variable"
  },
  {
    id: 13,
    name: "Software Subscriptions",
    amount: 3500,
    category: "important",
    frequency: "monthly",
    fixedOrVariable: "fixed"
  },
  {
    id: 14,
    name: "Home Maintenance",
    amount: 2000,
    category: "important",
    frequency: "monthly",
    fixedOrVariable: "variable"
  },
  {
    id: 15,
    name: "Electronics & Equipment",
    amount: 30000,
    category: "discretionary",
    frequency: "annual",
    fixedOrVariable: "variable"
  }
];

const sampleMonthlyPlans: MonthlyPlan[] = [
  {
    id: 1,
    month: "April",
    year: 2025,
    expectedIncome: 137000,
    guaranteedIncome: 58000,
    essentialExpenses: 56000,
    importantExpenses: 18000,
    discretionaryExpenses: 17500,
    savingsGoal: 25000,
    notes: "Expecting a one-time photography gig worth ₹35,000"
  },
  {
    id: 2,
    month: "May",
    year: 2025,
    expectedIncome: 155000,
    guaranteedIncome: 58000,
    essentialExpenses: 56000,
    importantExpenses: 18000,
    discretionaryExpenses: 17500,
    savingsGoal: 25000,
    notes: "Web development project payment of ₹90,000 expected"
  },
  {
    id: 3,
    month: "June",
    year: 2025,
    expectedIncome: 120000,
    guaranteedIncome: 58000,
    essentialExpenses: 56000,
    importantExpenses: 18000,
    discretionaryExpenses: 17500,
    savingsGoal: 25000,
    notes: "Quarterly dividend payment of ₹18,000 due"
  }
];