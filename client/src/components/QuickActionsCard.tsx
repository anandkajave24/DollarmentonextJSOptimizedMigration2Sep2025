"use client"

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MinusCircle, Calendar, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface QuickActionsCardProps {
  essentialExpensesCovered?: boolean;
  incomeSources?: number;
  monthlyBuffer?: number;
}

export default function QuickActionsCard({
  essentialExpensesCovered = false,
  incomeSources = 6,
  monthlyBuffer = 64
}: QuickActionsCardProps) {
  const { toast } = useToast();
  
  // Dialog open states
  const [incomeDialogOpen, setIncomeDialogOpen] = useState(false);
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  
  // Form states
  const [incomeSource, setIncomeSource] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeFrequency, setIncomeFrequency] = useState("monthly");
  const [incomeNotes, setIncomeNotes] = useState("");
  
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseFrequency, setExpenseFrequency] = useState("monthly");
  const [expenseNotes, setExpenseNotes] = useState("");
  
  const [planName, setPlanName] = useState("");
  const [planStartDate, setPlanStartDate] = useState("");
  const [planEndDate, setPlanEndDate] = useState("");
  const [planGoal, setPlanGoal] = useState("");
  const [planNotes, setPlanNotes] = useState("");

  const handleAddIncome = () => {
    setIncomeDialogOpen(true);
  };

  const handleAddExpense = () => {
    setExpenseDialogOpen(true);
  };

  const handleCreateMonthlyPlan = () => {
    setPlanDialogOpen(true);
  };
  
  const handleSubmitIncome = () => {
    // Handle form submission - in a real app, this would be an API call
    toast({
      title: "Income Source Added",
      description: `Added ${incomeSource} with amount $${incomeAmount} (${incomeFrequency})`,
    });
    
    // Reset form and close dialog
    setIncomeSource("");
    setIncomeAmount("");
    setIncomeFrequency("monthly");
    setIncomeNotes("");
    setIncomeDialogOpen(false);
  };
  
  const handleSubmitExpense = () => {
    // Handle form submission - in a real app, this would be an API call
    toast({
      title: "Expense Added",
      description: `Added ${expenseCategory} expense with amount $${expenseAmount} (${expenseFrequency})`,
    });
    
    // Reset form and close dialog
    setExpenseCategory("");
    setExpenseAmount("");
    setExpenseFrequency("monthly");
    setExpenseNotes("");
    setExpenseDialogOpen(false);
  };
  
  const handleSubmitPlan = () => {
    // Handle form submission - in a real app, this would be an API call
    toast({
      title: "Monthly Plan Created",
      description: `Created plan "${planName}" from ${planStartDate} to ${planEndDate}`,
    });
    
    // Reset form and close dialog
    setPlanName("");
    setPlanStartDate("");
    setPlanEndDate("");
    setPlanGoal("");
    setPlanNotes("");
    setPlanDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your finances</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleAddIncome}
          >
            <PlusCircle className="mr-2 h-5 w-5 text-green-500" />
            Add Income Source
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleAddExpense}
          >
            <MinusCircle className="mr-2 h-5 w-5 text-red-500" />
            Add Expense
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleCreateMonthlyPlan}
          >
            <Calendar className="mr-2 h-5 w-5 text-blue-500" />
            Create Monthly Plan
          </Button>
        </CardContent>
        
        <CardHeader className="pb-2 pt-2 border-t">
          <CardTitle className="text-base">Safety Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Essential Expenses Covered</span>
              <Badge 
                variant={essentialExpensesCovered ? "default" : "destructive"}
              >
                {essentialExpensesCovered ? "Yes" : "No"}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Income Sources</span>
              <span className="font-medium">{incomeSources}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Monthly Buffer</span>
              <span className="font-medium">{monthlyBuffer}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Add Income Source Dialog */}
      <Dialog open={incomeDialogOpen} onOpenChange={setIncomeDialogOpen}>
        <DialogContent className="sm:max-w-[425px] my-8 max-h-[85vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-background pb-4 pt-2 z-10">
            <DialogTitle>Add Income Source</DialogTitle>
            <DialogDescription>
              Enter the details of your income source below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="income-source">Source Name</Label>
              <Input
                id="income-source"
                placeholder="e.g., Salary, Freelance, Rental"
                value={incomeSource}
                onChange={(e) => setIncomeSource(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="income-amount">Amount ($)</Label>
              <Input
                id="income-amount"
                type="number"
                placeholder="e.g., 50000"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="income-frequency">Frequency</Label>
              <Select value={incomeFrequency} onValueChange={setIncomeFrequency}>
                <SelectTrigger id="income-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="irregular">Irregular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="income-notes">Notes (Optional)</Label>
              <Textarea
                id="income-notes"
                placeholder="Add any additional information"
                value={incomeNotes}
                onChange={(e) => setIncomeNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sticky bottom-0 bg-background pt-4 mt-2">
            <Button variant="outline" onClick={() => setIncomeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitIncome}>Add Income</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Expense Dialog */}
      <Dialog open={expenseDialogOpen} onOpenChange={setExpenseDialogOpen}>
        <DialogContent className="sm:max-w-[425px] my-8 max-h-[85vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-background pb-4 pt-2 z-10">
            <DialogTitle>Add Expense</DialogTitle>
            <DialogDescription>
              Enter the details of your expense below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="expense-category">Category</Label>
              <Select value={expenseCategory} onValueChange={setExpenseCategory}>
                <SelectTrigger id="expense-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="housing">Housing</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="debt">Debt Payment</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="personal">Personal Care</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="investments">Investments</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expense-amount">Amount ($)</Label>
              <Input
                id="expense-amount"
                type="number"
                placeholder="e.g., 5000"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expense-frequency">Frequency</Label>
              <Select value={expenseFrequency} onValueChange={setExpenseFrequency}>
                <SelectTrigger id="expense-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One-time</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expense-notes">Notes (Optional)</Label>
              <Textarea
                id="expense-notes"
                placeholder="Add any additional information"
                value={expenseNotes}
                onChange={(e) => setExpenseNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sticky bottom-0 bg-background pt-4 mt-2">
            <Button variant="outline" onClick={() => setExpenseDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitExpense}>Add Expense</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Create Monthly Plan Dialog */}
      <Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
        <DialogContent className="sm:max-w-[425px] my-8 max-h-[85vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-background pb-4 pt-2 z-10">
            <DialogTitle>Create Monthly Plan</DialogTitle>
            <DialogDescription>
              Set up your monthly budget and savings plan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="plan-name">Plan Name</Label>
              <Input
                id="plan-name"
                placeholder="e.g., July 2025 Budget"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="plan-start-date">Start Date</Label>
                <Input
                  id="plan-start-date"
                  type="date"
                  value={planStartDate}
                  onChange={(e) => setPlanStartDate(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="plan-end-date">End Date</Label>
                <Input
                  id="plan-end-date"
                  type="date"
                  value={planEndDate}
                  onChange={(e) => setPlanEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="plan-goal">Monthly Savings Goal ($)</Label>
              <Input
                id="plan-goal"
                type="number"
                placeholder="e.g., 15000"
                value={planGoal}
                onChange={(e) => setPlanGoal(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="plan-notes">Notes (Optional)</Label>
              <Textarea
                id="plan-notes"
                placeholder="Add any budget goals or restrictions"
                value={planNotes}
                onChange={(e) => setPlanNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sticky bottom-0 bg-background pt-4 mt-2">
            <Button variant="outline" onClick={() => setPlanDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitPlan}>Create Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}