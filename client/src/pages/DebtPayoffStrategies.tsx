import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calculator, 
  Target, 
  DollarSign, 
  Plus, 
  TrendingUp, 
  Snowflake, 
  Mountain, 
  Trophy,
  Trash2
} from "lucide-react";
import { SEO } from "@/components/SEO";

interface DebtItem {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minPayment: number;
  category: string;
  lender: string;
  dueDate: string;
  isActive: boolean;
  notes?: string;
}

interface PayoffResult {
  method: 'snowball' | 'avalanche';
  totalMonths: number;
  totalInterest: number;
  totalPayments: number;
  monthlyBreakdown: {
    month: number;
    debts: {
      name: string;
      payment: number;
      balance: number;
      isComplete: boolean;
    }[];
    totalPayment: number;
    remainingDebt: number;
  }[];
}

export default function DebtPayoffStrategies() {
  const [extraPayment, setExtraPayment] = useState(500);
  const [debts, setDebts] = useState<DebtItem[]>([
    {
      id: "1",
      name: "Credit Card A",
      balance: 5000,
      interestRate: 22.0,
      minPayment: 150,
      category: "credit_card",
      lender: "Chase",
      dueDate: "2025-01-15",
      isActive: true,
      notes: "High interest card"
    },
    {
      id: "2", 
      name: "Personal Loan",
      balance: 12000,
      interestRate: 18.0,
      minPayment: 350,
      category: "personal_loan",
      lender: "Wells Fargo",
      dueDate: "2025-01-20",
      isActive: true,
      notes: "Fixed rate loan"
    },
    {
      id: "3",
      name: "Credit Card B", 
      balance: 8000,
      interestRate: 25.0,
      minPayment: 200,
      category: "credit_card",
      lender: "Capital One",
      dueDate: "2025-01-25",
      isActive: true,
      notes: "Highest interest rate"
    }
  ]);
  const [showAddDebt, setShowAddDebt] = useState(false);
  const [snowballResult, setSnowballResult] = useState<PayoffResult | null>(null);
  const [avalancheResult, setAvalancheResult] = useState<PayoffResult | null>(null);

  // Calculate debt payoff using Snowball method (smallest balance first)
  const calculateSnowball = (debts: DebtItem[], extraPayment: number): PayoffResult => {
    const sortedDebts = [...debts].sort((a, b) => a.balance - b.balance);
    return calculatePayoff(sortedDebts, extraPayment, 'snowball');
  };

  // Calculate debt payoff using Avalanche method (highest interest first)
  const calculateAvalanche = (debts: DebtItem[], extraPayment: number): PayoffResult => {
    const sortedDebts = [...debts].sort((a, b) => b.interestRate - a.interestRate);
    return calculatePayoff(sortedDebts, extraPayment, 'avalanche');
  };

  // Generic payoff calculation function
  const calculatePayoff = (sortedDebts: DebtItem[], extraPayment: number, method: 'snowball' | 'avalanche'): PayoffResult => {
    let workingDebts = sortedDebts.map(debt => ({ ...debt }));
    let month = 0;
    let totalInterest = 0;
    let totalPayments = 0;
    const monthlyBreakdown: PayoffResult['monthlyBreakdown'] = [];

    while (workingDebts.some(debt => debt.balance > 0)) {
      month++;
      let monthlyPayment = 0;
      let remainingExtra = extraPayment;

      // Pay minimum payments on all debts
      workingDebts.forEach(debt => {
        if (debt.balance > 0) {
          const monthlyInterest = (debt.balance * (debt.interestRate / 100)) / 12;
          const principalPayment = Math.min(debt.minPayment - monthlyInterest, debt.balance);
          debt.balance = Math.max(0, debt.balance - principalPayment);
          totalInterest += monthlyInterest;
          monthlyPayment += debt.minPayment;
          totalPayments += debt.minPayment;
        }
      });

      // Apply extra payment to priority debt
      const priorityDebt = workingDebts.find(debt => debt.balance > 0);
      if (priorityDebt && remainingExtra > 0) {
        const extraToApply = Math.min(remainingExtra, priorityDebt.balance);
        priorityDebt.balance -= extraToApply;
        monthlyPayment += extraToApply;
        totalPayments += extraToApply;
      }

      // Record monthly breakdown
      monthlyBreakdown.push({
        month,
        debts: workingDebts.map(debt => ({
          name: debt.name,
          payment: debt.balance > 0 ? debt.minPayment : 0,
          balance: debt.balance,
          isComplete: debt.balance === 0
        })),
        totalPayment: monthlyPayment,
        remainingDebt: workingDebts.reduce((sum, debt) => sum + debt.balance, 0)
      });

      // Safety check to prevent infinite loops
      if (month > 600) break;
    }

    return {
      method,
      totalMonths: month,
      totalInterest,
      totalPayments,
      monthlyBreakdown
    };
  };

  // Calculate both methods when debts or extra payment changes
  useEffect(() => {
    if (debts.length > 0) {
      setSnowballResult(calculateSnowball(debts, extraPayment));
      setAvalancheResult(calculateAvalanche(debts, extraPayment));
    }
  }, [debts, extraPayment]);

  // Calculate totals
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinPayment = debts.reduce((sum, debt) => sum + debt.minPayment, 0);

  // Add debt function
  const addDebt = () => {
    const debtName = (document.getElementById('debtName') as HTMLInputElement)?.value;
    const debtBalance = parseFloat((document.getElementById('debtBalance') as HTMLInputElement)?.value || '0');
    const debtInterest = parseFloat((document.getElementById('debtInterest') as HTMLInputElement)?.value || '0');
    const debtMinPayment = parseFloat((document.getElementById('debtMinPayment') as HTMLInputElement)?.value || '0');

    if (debtName && debtBalance > 0 && debtInterest > 0 && debtMinPayment > 0) {
      const newDebt: DebtItem = {
        id: Date.now().toString(),
        name: debtName,
        balance: debtBalance,
        interestRate: debtInterest,
        minPayment: debtMinPayment,
        category: "other",
        lender: "Custom",
        dueDate: "2025-02-01",
        isActive: true
      };
      setDebts([...debts, newDebt]);
      setShowAddDebt(false);
      
      // Clear form
      (document.getElementById('debtName') as HTMLInputElement).value = '';
      (document.getElementById('debtBalance') as HTMLInputElement).value = '';
      (document.getElementById('debtInterest') as HTMLInputElement).value = '';
      (document.getElementById('debtMinPayment') as HTMLInputElement).value = '';
    }
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <SEO 
        title="Debt Payoff Calculator - Snowball vs Avalanche Comparison"
        description="Compare debt payoff strategies with our interactive calculator. See how much money you save and how fast you pay off debt using Snowball vs Avalanche methods."
        keywords="debt payoff calculator, debt snowball, debt avalanche, debt elimination, debt payoff comparison, debt strategy calculator"
        canonical="https://dollarmento.com/debt-payoff-strategies"
      />
      
      {/* Header */}
      <div className="flex items-center mb-6">
        <button 
          onClick={() => window.history.back()}
          className="mr-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Calculator className="h-8 w-8 text-blue-500 mr-3" />
            Debt Payoff Calculator
          </h1>
          <p className="text-gray-600 mt-1">Compare Snowball vs Avalanche methods and see which saves more money</p>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Total Debt</p>
              <p className="text-2xl font-bold text-blue-800">${totalDebt.toLocaleString()}</p>
            </div>
            <Target className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Min Payments</p>
              <p className="text-2xl font-bold text-green-800">${totalMinPayment.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4 bg-purple-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">Extra Payment</p>
              <p className="text-2xl font-bold text-purple-800">${extraPayment.toLocaleString()}</p>
            </div>
            <Plus className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600">Total Payment</p>
              <p className="text-2xl font-bold text-orange-800">${(totalMinPayment + extraPayment).toLocaleString()}</p>
            </div>
            <Calculator className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="h-5 w-5 text-blue-600 mr-2" />
              Debt Input & Settings
            </CardTitle>
            <CardDescription>
              Enter your debts and extra payment to compare payoff strategies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="extraPayment">Extra Monthly Payment</Label>
              <Input
                id="extraPayment"
                type="number"
                value={extraPayment}
                onChange={(e) => setExtraPayment(Number(e.target.value))}
                className="mt-1"
                placeholder="200"
              />
              <p className="text-xs text-gray-500 mt-1">Additional amount beyond minimum payments</p>
            </div>
            
            <div className="space-y-3">
              <Label>Your Debts</Label>
              {Array.isArray(debts) && debts.map((debt, index) => (
                <Card key={debt.id} className="p-3 bg-gray-50">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium">{debt.name}</span>
                      <div className="text-gray-600">{debt.lender}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${debt.balance.toLocaleString()}</div>
                      <div className="text-gray-600">{debt.interestRate}% APR</div>
                    </div>
                    <div className="col-span-2 flex justify-between text-xs text-gray-500">
                      <span>Min Payment: ${debt.minPayment}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => setDebts(debts.filter(d => d.id !== debt.id))}
                        className="h-6 px-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              
              <Button 
                onClick={() => setShowAddDebt(true)} 
                variant="outline" 
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Debt
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
              Strategy Comparison
            </CardTitle>
            <CardDescription>
              See which method saves more money and time
            </CardDescription>
          </CardHeader>
          <CardContent>
            {snowballResult && avalancheResult ? (
              <div className="space-y-6">
                {/* Method Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 border-2 border-blue-200 bg-blue-50">
                    <div className="flex items-center mb-2">
                      <Snowflake className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="font-semibold text-blue-800">Snowball</h3>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span className="font-medium">{snowballResult.totalMonths} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest:</span>
                        <span className="font-medium">${snowballResult.totalInterest.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Paid:</span>
                        <span className="font-medium">${snowballResult.totalPayments.toFixed(0)}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 border-2 border-orange-200 bg-orange-50">
                    <div className="flex items-center mb-2">
                      <Mountain className="h-5 w-5 text-orange-600 mr-2" />
                      <h3 className="font-semibold text-orange-800">Avalanche</h3>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span className="font-medium">{avalancheResult.totalMonths} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest:</span>
                        <span className="font-medium">${avalancheResult.totalInterest.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Paid:</span>
                        <span className="font-medium">${avalancheResult.totalPayments.toFixed(0)}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Winner Banner */}
                {(() => {
                  const avalancheSaves = snowballResult.totalInterest - avalancheResult.totalInterest;
                  const timeDiff = snowballResult.totalMonths - avalancheResult.totalMonths;
                  const winner = avalancheSaves > 0 ? 'Avalanche' : 'Snowball';
                  const savings = Math.abs(avalancheSaves);
                  
                  return (
                    <Alert className={`border-2 ${winner === 'Avalanche' ? 'border-orange-200 bg-orange-50' : 'border-blue-200 bg-blue-50'}`}>
                      <Trophy className={`h-4 w-4 ${winner === 'Avalanche' ? 'text-orange-600' : 'text-blue-600'}`} />
                      <AlertDescription>
                        <div className="font-semibold">
                          {winner} Method Wins!
                        </div>
                        <div className="text-sm">
                          Saves ${savings.toFixed(0)} in interest
                          {timeDiff !== 0 && ` and ${Math.abs(timeDiff)} months`}
                        </div>
                      </AlertDescription>
                    </Alert>
                  );
                })()}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Add debts to see comparison</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Method Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Snowflake className="h-5 w-5 text-blue-600 mr-2" />
              Debt Snowball Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Pay off debts from smallest to largest balance, regardless of interest rate.
              </p>
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">✓ Pros:</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Quick psychological wins</li>
                  <li>• Builds momentum and motivation</li>
                  <li>• Simplifies monthly payments faster</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-red-600">✗ Cons:</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• May pay more interest overall</li>
                  <li>• Takes longer mathematically</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mountain className="h-5 w-5 text-orange-600 mr-2" />
              Debt Avalanche Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Pay off debts from highest to lowest interest rate for maximum savings.
              </p>
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">✓ Pros:</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Saves the most money</li>
                  <li>• Mathematically optimal</li>
                  <li>• Reduces total interest paid</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-red-600">✗ Cons:</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Takes longer to see progress</li>
                  <li>• Requires more discipline</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Debt Modal */}
      {showAddDebt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Add New Debt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="debtName">Debt Name</Label>
                <Input id="debtName" placeholder="e.g., Credit Card A" />
              </div>
              <div>
                <Label htmlFor="debtBalance">Balance</Label>
                <Input id="debtBalance" type="number" placeholder="5000" />
              </div>
              <div>
                <Label htmlFor="debtInterest">Interest Rate (%)</Label>
                <Input id="debtInterest" type="number" placeholder="18.5" />
              </div>
              <div>
                <Label htmlFor="debtMinPayment">Minimum Payment</Label>
                <Input id="debtMinPayment" type="number" placeholder="250" />
              </div>
              <div className="flex space-x-2">
                <Button onClick={addDebt} className="flex-1">Add Debt</Button>
                <Button variant="outline" onClick={() => setShowAddDebt(false)} className="flex-1">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}