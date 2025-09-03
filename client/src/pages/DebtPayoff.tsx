import { TabPills, TabItem } from "../components/ui/tab-pills";
import { SEO } from '../components/SEO';
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";

interface DebtItem {
  id: number;
  name: string;
  balance: number;
  interestRate: number;
  minPayment: number;
  monthsToPayoff: number;
  totalInterest: number;
}

export default function DebtPayoff() {
  const [debts, setDebts] = useState<DebtItem[]>([
    {
      id: 1,
      name: "Credit Card 1",
      balance: 50000,
      interestRate: 36,
      minPayment: 1500,
      monthsToPayoff: 76,
      totalInterest: 44324
    },
    {
      id: 2,
      name: "Personal Loan",
      balance: 200000,
      interestRate: 14,
      minPayment: 8000,
      monthsToPayoff: 28,
      totalInterest: 24000
    },
    {
      id: 3,
      name: "Home Loan",
      balance: 1500000,
      interestRate: 7.5,
      minPayment: 12500,
      monthsToPayoff: 180,
      totalInterest: 750000
    }
  ]);
  
  const [extraPayment, setExtraPayment] = useState(2000);
  const [strategy, setStrategy] = useState<"avalanche" | "snowball">("avalanche");
  
  const totalDebt = debts.reduce((acc, debt) => acc + debt.balance, 0);
  const totalMinPayment = debts.reduce((acc, debt) => acc + debt.minPayment, 0);
  const totalInterest = debts.reduce((acc, debt) => acc + debt.totalInterest, 0);
  
  // Sort debts according to strategy
  const sortedDebts = [...debts].sort((a, b) => {
    if (strategy === "avalanche") {
      return b.interestRate - a.interestRate;
    } else {
      return a.balance - b.balance;
    }
  });
  
  return (
    <>
      <SEO 
        title="Debt Payoff Strategies - Debt Consolidation & Management Tools"
        description="Master debt payoff strategies with our comprehensive debt management tools. Learn debt avalanche, debt snowball methods, and get personalized debt consolidation recommendations to become debt-free faster."
        keywords="debt payoff, debt consolidation, debt management, debt snowball, debt avalanche, debt elimination, debt reduction strategies, debt free, debt calculator, loan payoff"
        canonical="https://dollarmento.com/debt-payoff"
      />
    <div className="px-4 py-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => window.history.back()}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <h1 className="text-2xl font-bold">Debt Payoff</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2 bg-gray-200 dark:bg-gray-800 border-b">
            <CardTitle className="text-black dark:text-white">Debt Overview</CardTitle>
            <CardDescription>Your current debt situation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Total Debt</span>
                  <span className="text-sm font-medium">${totalDebt.toLocaleString()}</span>
                </div>
                <Progress value={100} className="h-2 bg-red-100" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span>Monthly Minimum Payment</span>
                  <span>${totalMinPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span>Extra Payment</span>
                  <span className="text-green-600">+${extraPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-medium mt-2 pt-2 border-t">
                  <span>Total Monthly Payment</span>
                  <span>${(totalMinPayment + extraPayment).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <h4 className="text-sm font-medium mb-2">Extra Payment Amount</h4>
                <div className="flex space-x-2">
                  <Input 
                    type="number" 
                    value={extraPayment} 
                    onChange={e => setExtraPayment(Number(e.target.value))}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExtraPayment(extraPayment + 1000)}
                    className="whitespace-nowrap"
                  >
                    + $1,000
                  </Button>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <h4 className="text-sm font-medium mb-2">Payoff Strategy</h4>
                <Tabs defaultValue="avalanche" onValueChange={(value) => setStrategy(value as "avalanche" | "snowball")}>
                  <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-transparent p-0 border-0 w-full">
                    <TabsTrigger value="avalanche" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Avalanche</TabsTrigger>
                    <TabsTrigger value="snowball" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Snowball</TabsTrigger>
                  </TabsList>
                  <div className="mt-2 text-xs text-gray-500">
                    {strategy === "avalanche" 
                      ? "Pay highest interest debt first (saves the most money)" 
                      : "Pay smallest balance first (builds motivation)"}
                  </div>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
            <CardTitle className="text-black dark:text-white">Debt Payoff Plan</CardTitle>
            <CardDescription>Payoff order based on {strategy === "avalanche" ? "highest interest rate" : "lowest balance"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedDebts.map((debt, index) => (
                <div key={debt.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-medium mr-2">
                          {index + 1}
                        </div>
                        <h3 className="font-medium">{debt.name}</h3>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500 space-x-3">
                        <div>${debt.balance.toLocaleString()}</div>
                        <div>•</div>
                        <div>{debt.interestRate}% APR</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        ${debt.minPayment.toLocaleString()}/mo
                      </div>
                      {index === 0 && (
                        <div className="text-sm text-green-600 font-medium">
                          +${extraPayment.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Estimated Payoff Time</span>
                      <span>Total Interest Paid</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        {index === 0 
                          ? Math.max(1, Math.floor(debt.monthsToPayoff * debt.minPayment / (debt.minPayment + extraPayment)))
                          : debt.monthsToPayoff} months
                      </span>
                      <span className="text-sm font-medium">
                        ${index === 0 
                          ? Math.floor(debt.totalInterest * debt.minPayment / (debt.minPayment + extraPayment)).toLocaleString()
                          : debt.totalInterest.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="p-4 border border-green-100 rounded-lg bg-green-50">
                <div className="flex">
                  <div className="mr-3 mt-1">
                    <span className="flex items-center justify-center rounded-full bg-green-100 w-8 h-8">
                      <span className="material-icons text-green-600 text-sm">savings</span>
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">Potential Interest Savings</h4>
                    <p className="text-sm text-gray-600">
                      By applying an extra ${extraPayment.toLocaleString()}/month to your debts with the 
                      {strategy === "avalanche" ? " avalanche" : " snowball"} method, you could save 
                      approximately ${Math.floor(totalInterest * 0.25).toLocaleString()} in interest charges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
          <CardTitle className="text-black dark:text-white">Risk Assessment</CardTitle>
          <CardDescription>Evaluating your debt-to-income ratio and risk factors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Debt-to-Income Ratio</h3>
              <div className="relative h-32 w-32 mx-auto">
                <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                <div 
                  className="absolute inset-0 rounded-full border-8 border-transparent border-t-amber-500 border-r-amber-500"
                  style={{ transform: 'rotate(144deg)' }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold">40%</span>
                  <span className="text-xs text-gray-500">Moderately High</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Your debt-to-income ratio is the percentage of your monthly income that goes toward debt payments. 
                The ideal ratio is below 30%.
              </p>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-3">Risk Factors</h3>
              <div className="space-y-4">
                <div className="flex">
                  <div className="mr-3 flex-shrink-0">
                    <span className="flex items-center justify-center rounded-full bg-amber-100 w-8 h-8">
                      <span className="material-icons text-amber-600 text-sm">warning</span>
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">High Credit Card Interest</h4>
                    <p className="text-sm text-gray-600">
                      Your credit card interest rate of 36% is significantly above the average. Consider 
                      balance transfer options to cards with lower interest rates.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-3 flex-shrink-0">
                    <span className="flex items-center justify-center rounded-full bg-red-100 w-8 h-8">
                      <span className="material-icons text-red-600 text-sm">priority_high</span>
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">Debt-to-Income Exceeds Recommendation</h4>
                    <p className="text-sm text-gray-600">
                      Your debt-to-income ratio of 40% exceeds the recommended 30%, which may make it 
                      difficult to secure additional loans or handle financial emergencies.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-3 flex-shrink-0">
                    <span className="flex items-center justify-center rounded-full bg-green-100 w-8 h-8">
                      <span className="material-icons text-green-600 text-sm">check_circle</span>
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">Consistent Payment History</h4>
                    <p className="text-sm text-gray-600">
                      You have a strong record of making on-time payments, which is positive for your 
                      credit health and financial stability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
      </>
    );
}