import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { 
  usePortfolioSummary,
  useInvestments,
  useAssetAllocations,
  useSIPs,
  useTransactions
} from "@/hooks/use-public-financial-data";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3,
  CircleDollarSign, 
  Wallet,
  ArrowRightCircle
} from "lucide-react";
import QuickActionsCard from "@/components/QuickActionsCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function FinancialDashboard() {
  // Get data from the public API
  const { data: portfolioData } = usePortfolioSummary();
  const { data: investmentsData } = useInvestments();
  const { data: assetAllocationsData } = useAssetAllocations();
  const { data: sipsData } = useSIPs();
  const { data: transactionsData } = useTransactions();
  
  const { toast } = useToast();

  // Calculate relevant values for display
  const expectedMonthlyIncome = 145916.667;
  const guaranteedMonthlyIncome = 46000;
  const totalMonthlyExpenses = 89000;
  const essentialExpenses = 54000;
  const importantExpenses = 17500;
  const discretionaryExpenses = 17500;
  const surplus = expectedMonthlyIncome - totalMonthlyExpenses;
  
  // Toasts for the Quick Actions buttons
  const handleAddIncome = () => {
    toast({
      title: "Add Income Source",
      description: "Income source form will be completed in the next version",
    });
  };

  const handleAddExpense = () => {
    toast({
      title: "Add Expense",
      description: "Expense form will be completed in the next version",
    });
  };

  const handleCreateMonthlyPlan = () => {
    toast({
      title: "Create Monthly Plan",
      description: "Monthly planning tool will be completed in the next version",
    });
  };

  return (
    <div className="container px-4 py-6 mx-auto">
      {/* Navigation Tabs */}
      <Tabs defaultValue="dashboard" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard" className="px-6 py-3">
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="income-expenses" className="px-6 py-3">
            Income & Expenses
          </TabsTrigger>
          <TabsTrigger value="monthly-plans" className="px-6 py-3">
            Monthly Plans
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Financial Overview */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Summary of your income and expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Income vs Expenses */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium">Income vs Expenses</h3>
                      <span className="text-sm font-medium text-emerald-600">
                        Surplus: ₹{surplus.toLocaleString()}
                      </span>
                    </div>
                    
                    {/* Expected Monthly Income */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Expected Monthly Income</span>
                        <span className="font-medium">₹{expectedMonthlyIncome.toLocaleString()}</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    
                    {/* Guaranteed Monthly Income */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Guaranteed Monthly Income</span>
                        <span className="font-medium">₹{guaranteedMonthlyIncome.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(guaranteedMonthlyIncome / expectedMonthlyIncome) * 100} 
                        className="h-2" 
                      />
                    </div>
                    
                    {/* Total Monthly Expenses */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Total Monthly Expenses</span>
                        <span className="font-medium">₹{totalMonthlyExpenses.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(totalMonthlyExpenses / expectedMonthlyIncome) * 100} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                  
                  {/* Expense Breakdown */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Expense Breakdown</h3>
                    
                    {/* Essential Expenses */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Essential Expenses</span>
                        <span className="font-medium">₹{essentialExpenses.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(essentialExpenses / totalMonthlyExpenses) * 100} 
                        className="h-2" 
                      />
                    </div>
                    
                    {/* Important Expenses */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Important Expenses</span>
                        <span className="font-medium">₹{importantExpenses.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(importantExpenses / totalMonthlyExpenses) * 100} 
                        className="h-2" 
                      />
                    </div>
                    
                    {/* Discretionary Expenses */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Discretionary Expenses</span>
                        <span className="font-medium">₹{discretionaryExpenses.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(discretionaryExpenses / totalMonthlyExpenses) * 100} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <QuickActionsCard 
              essentialExpensesCovered={guaranteedMonthlyIncome >= essentialExpenses}
              incomeSources={6}
              monthlyBuffer={64}
            />
          </div>
          
          {/* Financial Health Score */}
          <Card>
            <CardHeader>
              <CardTitle>Your Financial Health Score</CardTitle>
              <CardDescription>
                Based on your income, expenses, savings, and investments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">68/100</h3>
                  <p className="text-sm text-muted-foreground">
                    Your score is better than 72% of users
                  </p>
                  <Button size="sm" className="mt-2" variant="outline">
                    <Link href="/financial-journey">
                      View Financial Journey
                      <ArrowRightCircle className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="space-y-2 text-right">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Savings Rate</span>
                    <span className="font-medium">38.3%</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Debt-to-Income</span>
                    <span className="font-medium">21.2%</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Emergency Fund</span>
                    <span className="font-medium">4.2 months</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Financial Activities</CardTitle>
              <CardDescription>
                Latest transactions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactionsData && transactionsData.slice(0, 5).map((transaction, index) => (
                  <div key={index} className="flex items-start justify-between border-b pb-3 last:border-0">
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5 bg-gray-100 p-2 rounded-full">
                        {transaction.type === 'purchase' ? (
                          <Wallet className="h-4 w-4 text-blue-500" />
                        ) : (
                          <CircleDollarSign className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {transaction.type === 'purchase' ? 'Purchase' : 'Deposit'} - {transaction.investmentId}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className={`text-right ${transaction.type === 'purchase' ? 'text-red-500' : 'text-green-500'}`}>
                      <p className="font-medium">
                        {transaction.type === 'purchase' ? '-' : '+'}₹{transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">{transaction.type === 'purchase' ? 'Expense' : 'Income'}</p>
                    </div>
                  </div>
                ))}
                
                {(!transactionsData || transactionsData.length === 0) && (
                  <div className="text-center py-6">
                    <BarChart3 className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="font-medium">No recent activities</h3>
                    <p className="text-sm text-muted-foreground">
                      Your financial activities will appear here
                    </p>
                  </div>
                )}
                
                <div className="text-center pt-4">
                  <Button variant="outline" size="sm">
                    <Link href="/financial-management">
                      View All Transactions
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="income-expenses">
          <div className="flex flex-col items-center justify-center h-64">
            <h3 className="text-xl font-medium mb-2">Income & Expenses</h3>
            <p className="text-muted-foreground mb-4">
              More detailed income and expense tracking will be available soon.
            </p>
            <Button onClick={() => toast({
              title: "Coming Soon",
              description: "The detailed income and expenses tracking will be available in the next version."
            })}>
              Notify Me When Available
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="monthly-plans">
          <div className="flex flex-col items-center justify-center h-64">
            <h3 className="text-xl font-medium mb-2">Monthly Budget Plans</h3>
            <p className="text-muted-foreground mb-4">
              Monthly budget planning will be available soon.
            </p>
            <Button onClick={() => toast({
              title: "Coming Soon",
              description: "The monthly budget planning tool will be available in the next version."
            })}>
              Notify Me When Available
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}