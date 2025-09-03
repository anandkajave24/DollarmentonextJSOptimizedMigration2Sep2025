import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useIncomeExpenses } from "../../contexts/IncomeExpensesContext";

export const IncomeExpensesOverview: React.FC = () => {
  const {
    data,
    getExpectedMonthlyIncome,
    getGuaranteedMonthlyIncome,
    getTotalMonthlyExpenses,
    getExpensesByCategory
  } = useIncomeExpenses();

  const expectedMonthlyIncome = getExpectedMonthlyIncome();
  const guaranteedMonthlyIncome = getGuaranteedMonthlyIncome();
  const totalMonthlyExpenses = getTotalMonthlyExpenses();
  const essentialExpenses = getExpensesByCategory("essential");
  const importantExpenses = getExpensesByCategory("important");
  const discretionaryExpenses = getExpensesByCategory("discretionary");
  
  const surplus = expectedMonthlyIncome - totalMonthlyExpenses;
  const monthlyBuffer = (guaranteedMonthlyIncome / expectedMonthlyIncome) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Financial Overview */}
      <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
        <CardHeader>
          <CardTitle className="text-black dark:text-white">Financial Overview</CardTitle>
          <CardDescription>Summary of your income and expenses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Income vs Expenses Overview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Income vs Expenses</h3>
              <span className={`text-sm font-medium ${surplus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {surplus >= 0 ? 'Surplus' : 'Deficit'}: ${Math.abs(surplus).toLocaleString()}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Expected Monthly Income</span>
                  <span className="font-medium">${expectedMonthlyIncome.toLocaleString()}</span>
                </div>
                <Progress value={100} className="h-2 bg-blue-100" indicatorClassName="bg-blue-500" />
              </div>
              
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Guaranteed Monthly Income</span>
                  <span className="font-medium">${guaranteedMonthlyIncome.toLocaleString()}</span>
                </div>
                <Progress 
                  value={monthlyBuffer} 
                  className="h-2 bg-green-100" 
                  indicatorClassName="bg-green-500" 
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Total Monthly Expenses</span>
                  <span className="font-medium">${totalMonthlyExpenses.toLocaleString()}</span>
                </div>
                <Progress 
                  value={(totalMonthlyExpenses / expectedMonthlyIncome) * 100} 
                  className="h-2 bg-red-100" 
                  indicatorClassName="bg-red-500" 
                />
              </div>
            </div>
          </div>
          
          {/* Expense Breakdown */}
          <div>
            <h3 className="text-sm font-medium mb-3">Expense Breakdown</h3>
            
            {/* Essential Expenses */}
            <div className="mb-3">
              <div className="flex justify-between items-center text-sm mb-1">
                <span>Essential Expenses</span>
                <span className="font-medium">${essentialExpenses.toLocaleString()}</span>
              </div>
              <Progress 
                value={(essentialExpenses / expectedMonthlyIncome) * 100} 
                className="h-2 bg-red-100" 
                indicatorClassName="bg-red-500" 
              />
            </div>
            
            {/* Important Expenses */}
            <div className="mb-3">
              <div className="flex justify-between items-center text-sm mb-1">
                <span>Important Expenses</span>
                <span className="font-medium">${importantExpenses.toLocaleString()}</span>
              </div>
              <Progress 
                value={(importantExpenses / expectedMonthlyIncome) * 100} 
                className="h-2 bg-yellow-100" 
                indicatorClassName="bg-yellow-500" 
              />
            </div>
            
            {/* Discretionary Expenses */}
            <div className="mb-3">
              <div className="flex justify-between items-center text-sm mb-1">
                <span>Discretionary Expenses</span>
                <span className="font-medium">${discretionaryExpenses.toLocaleString()}</span>
              </div>
              <Progress 
                value={(discretionaryExpenses / expectedMonthlyIncome) * 100} 
                className="h-2 bg-blue-100" 
                indicatorClassName="bg-blue-500" 
              />
            </div>
          </div>
          
          {/* Income Stability */}
          <div>
            <h3 className="text-sm font-medium mb-2">Income Stability</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm">Guaranteed vs Expected</span>
              <span className={`text-sm font-medium ${
                monthlyBuffer >= 80 ? 'text-green-600' : 
                monthlyBuffer >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {monthlyBuffer.toFixed(1)}%
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Stability Rating: {monthlyBuffer >= 80 ? 'Excellent' : monthlyBuffer >= 60 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-black dark:text-white">Quick Actions</CardTitle>
          <CardDescription>Manage your finances</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full justify-start" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Income Source
          </Button>
          
          <Button className="w-full justify-start" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
          
          <Button className="w-full justify-start" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Create Monthly Plan
          </Button>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">Safety Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Essential Expenses Covered</span>
                <Badge variant={guaranteedMonthlyIncome >= essentialExpenses ? "default" : "destructive"}>
                  {guaranteedMonthlyIncome >= essentialExpenses ? "Yes" : "No"}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Income Sources</span>
                <span className="text-sm font-medium">{data.incomeSources.length}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Monthly Buffer</span>
                <span className={`text-sm font-medium ${surplus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {surplus >= 0 ? `+$${surplus.toLocaleString()}` : `-$${Math.abs(surplus).toLocaleString()}`}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeExpensesOverview;