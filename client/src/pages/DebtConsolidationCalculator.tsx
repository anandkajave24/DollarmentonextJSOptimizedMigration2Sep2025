import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, DollarSign, CreditCard, TrendingDown, Clock, PiggyBank, Info, HelpCircle, Plus, X, Target, AlertTriangle, CheckCircle, BarChart3 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "../components/SEO";
import { Helmet } from 'react-helmet';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, ChartTooltip, Legend);

interface Debt {
  id: string;
  type: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  isEditing?: boolean;
}

const DebtConsolidationCalculator = () => {
  const { toast } = useToast();

  // Current debts state
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', type: 'Credit Card 1', balance: 6000, interestRate: 22, minimumPayment: 180, isEditing: false }
  ]);

  // Consolidation loan state
  const [consolidationLoan, setConsolidationLoan] = useState({
    loanAmount: 20000,
    interestRate: 9,
    loanTerm: 60,
    originationFee: 3,
    originationFeeAmount: 600
  });

  // Calculation functions
  const calculateCurrentDebtMetrics = () => {
    const totalBalance = debts.reduce((sum, debt) => sum + debt.balance, 0);
    const totalMinPayment = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);
    
    // Calculate weighted average interest rate
    const weightedRate = debts.reduce((sum, debt) => sum + (debt.balance * debt.interestRate), 0) / totalBalance;
    
    // Calculate payoff time using minimum payments (simplified approximation)
    const averagePayoffTime = totalBalance > 0 ? Math.round((totalBalance / totalMinPayment) * 1.5) : 0;
    
    // Calculate total interest (approximation based on average rate and time)
    const totalInterest = totalBalance * (weightedRate / 100) * (averagePayoffTime / 12);
    
    return {
      totalBalance,
      totalMinPayment,
      weightedRate,
      averagePayoffTime,
      totalInterest,
      totalCost: totalBalance + totalInterest
    };
  };

  const calculateConsolidationMetrics = () => {
    const monthlyRate = consolidationLoan.interestRate / 100 / 12;
    const numPayments = consolidationLoan.loanTerm;
    
    // Calculate monthly payment using PMT formula
    const monthlyPayment = monthlyRate > 0 
      ? (consolidationLoan.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : consolidationLoan.loanAmount / numPayments;
    
    const totalInterest = (monthlyPayment * numPayments) - consolidationLoan.loanAmount;
    const totalCost = consolidationLoan.loanAmount + totalInterest + consolidationLoan.originationFeeAmount;
    
    return {
      monthlyPayment,
      totalInterest,
      totalCost,
      payoffTime: consolidationLoan.loanTerm,
      totalWithFees: totalCost
    };
  };

  const currentMetrics = calculateCurrentDebtMetrics();
  const consolidationMetrics = calculateConsolidationMetrics();

  // Savings calculations
  const interestSaved = currentMetrics.totalInterest - consolidationMetrics.totalInterest;
  const timeSaved = currentMetrics.averagePayoffTime - (consolidationLoan.loanTerm / 12);
  const monthlyPaymentChange = consolidationMetrics.monthlyPayment - currentMetrics.totalMinPayment;
  const totalSavings = currentMetrics.totalCost - consolidationMetrics.totalCost;

  // Chart data
  const chartData = {
    labels: ['Principal', 'Interest (Current)', 'Interest (Consolidated)', 'Fees'],
    datasets: [
      {
        data: [
          currentMetrics.totalBalance,
          currentMetrics.totalInterest,
          consolidationMetrics.totalInterest,
          consolidationLoan.originationFeeAmount
        ],
        backgroundColor: ['#f59e0b', '#ef4444', '#22c55e', '#6b7280'],
        borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            const percentage = ((value / currentMetrics.totalBalance) * 100).toFixed(1);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
  };

  // Helper functions
  const addDebt = () => {
    if (debts.length < 10) {
      const newDebt: Debt = {
        id: Date.now().toString(),
        type: '',
        balance: 0,
        interestRate: 0,
        minimumPayment: 0,
        isEditing: true
      };
      setDebts([...debts, newDebt]);
    }
  };

  const removeDebt = (id: string) => {
    if (debts.length > 1) {
      setDebts(debts.filter(debt => debt.id !== id));
    }
  };

  const updateDebt = (id: string, field: keyof Debt, value: string | number) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
  };

  const toggleEdit = (id: string) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, isEditing: !debt.isEditing } : debt
    ));
  };

  const updateConsolidationLoan = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setConsolidationLoan(prev => {
      const updated = { ...prev, [field]: numValue };
      
      // Calculate origination fee amount
      if (field === 'originationFee' || field === 'loanAmount') {
        updated.originationFeeAmount = (updated.loanAmount * updated.originationFee) / 100;
      }
      
      return updated;
    });
  };

  // Update loan amount when total debt changes
  useEffect(() => {
    const totalBalance = debts.reduce((sum, debt) => sum + debt.balance, 0);
    setConsolidationLoan(prev => ({
      ...prev,
      loanAmount: totalBalance,
      originationFeeAmount: (totalBalance * prev.originationFee) / 100
    }));
  }, [debts]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Helmet>
        <title>Debt Consolidation Calculator - Compare Debt Consolidation Options | DollarMento</title>
        <meta name="description" content="Calculate debt consolidation savings with multiple debt payoff scenarios. Compare interest rates, monthly payments, and total costs for debt management." />
        <meta name="keywords" content="debt consolidation calculator, debt payoff calculator, debt management calculator, consolidation loan calculator, debt restructuring calculator" />
        <link rel="canonical" href="https://dollarmento.com/debt-consolidation-calculator" />
      </Helmet>
      <TooltipProvider>
      <SEO 
        title="Debt Consolidation Calculator - Compare Loan Benefits & Savings"
        description="Calculate debt consolidation savings with our free calculator. Compare interest rates, monthly payments, and payoff time. See if consolidating multiple debts saves money."
        keywords="debt consolidation calculator, debt consolidation loan, consolidate credit card debt, debt payoff calculator, multiple debt calculator, credit card consolidation, debt management calculator, lower interest rate loan, debt refinancing calculator, personal loan consolidation"
        canonical="https://dollarmento.com/debt-consolidation-calculator"
      />
      <div className="w-full px-4">
        <div className="mb-8 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Debt Consolidation Calculator</h1>
          <p className="text-sm text-gray-600 max-w-3xl">Compare consolidating multiple debts into one payment and see your potential savings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Sections - 40% width */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Current Debts */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-red-800 text-base">
                  <CreditCard className="w-4 h-4" />
                  Current Debts Summary
                </CardTitle>
                <p className="text-xs text-gray-600 mt-0.5">Add all your current debts to see consolidation benefits</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {debts.map((debt, index) => (
                    <div key={debt.id}>
                      {debt.isEditing ? (
                        /* Editing Mode */
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs font-medium text-gray-700 mb-1 block">Debt Type</Label>
                              <Input
                                placeholder="e.g., Credit Card 1"
                                value={debt.type}
                                onChange={(e) => updateDebt(debt.id, 'type', e.target.value)}
                                className="text-sm h-8"
                              />
                            </div>
                            <div>
                              <Label className="text-xs font-medium text-gray-700 mb-1 block">Current Balance</Label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                                <Input
                                  type="number"
                                  placeholder="6,000"
                                  value={debt.balance}
                                  onChange={(e) => updateDebt(debt.id, 'balance', parseFloat(e.target.value) || 0)}
                                  className="text-sm h-8 pl-7"
                                />
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs font-medium text-gray-700 mb-1 block">Interest Rate</Label>
                              <div className="relative">
                                <Input
                                  type="number"
                                  step="0.1"
                                  placeholder="22.0"
                                  value={debt.interestRate}
                                  onChange={(e) => updateDebt(debt.id, 'interestRate', parseFloat(e.target.value) || 0)}
                                  className="text-sm h-8 pr-7"
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs font-medium text-gray-700 mb-1 block">Min. Payment</Label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                                <Input
                                  type="number"
                                  placeholder="180"
                                  value={debt.minimumPayment}
                                  onChange={(e) => updateDebt(debt.id, 'minimumPayment', parseFloat(e.target.value) || 0)}
                                  className="text-sm h-8 pl-7"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => toggleEdit(debt.id)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Save
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleEdit(debt.id)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        /* Summary View - Compact Horizontal */
                        <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 text-sm mb-1">{debt.type || `Debt ${index + 1}`}</h4>
                              <div className="flex items-center gap-6 text-sm">
                                <div className="flex flex-col">
                                  <span className="text-gray-500 text-xs">Balance</span>
                                  <span className="font-semibold text-red-600">{formatCurrency(debt.balance)}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-gray-500 text-xs">Rate</span>
                                  <span className="font-semibold text-red-600">{debt.interestRate}%</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-gray-500 text-xs">Min Payment</span>
                                  <span className="font-semibold text-red-600">{formatCurrency(debt.minimumPayment)}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-1 ml-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleEdit(debt.id)}
                                className="p-1.5 h-7 w-7 hover:bg-blue-100"
                                title="Edit"
                              >
                                <Target className="w-3.5 h-3.5 text-blue-600" />
                              </Button>
                              {debts.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeDebt(debt.id)}
                                  className="p-1.5 h-7 w-7 hover:bg-red-100"
                                  title="Delete"
                                >
                                  <X className="w-3.5 h-3.5 text-red-500" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Add Another Debt Button - appears after each debt */}
                      {index === debts.length - 1 && debts.length < 10 && (
                        <Button
                          variant="outline"
                          onClick={addDebt}
                          className="w-full mt-2 py-2 h-8 border-dashed border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-sm"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Another Debt
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Current Debt Summary - Compact */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2 text-sm">
                    <Calculator className="w-3 h-3" />
                    Your Current Debt Situation
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-2 bg-white rounded shadow-sm">
                      <div className="text-xs text-gray-500 mb-0.5">TOTAL DEBT AMOUNT</div>
                      <div className="text-lg font-bold text-gray-700">{formatCurrency(currentMetrics.totalBalance)}</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded shadow-sm">
                      <div className="text-xs text-gray-500 mb-0.5">WEIGHTED AVG. RATE</div>
                      <div className="text-lg font-bold text-gray-700">{currentMetrics.weightedRate.toFixed(1)}%</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded shadow-sm">
                      <div className="text-xs text-gray-500 mb-0.5">MONTHLY PAYMENTS</div>
                      <div className="text-lg font-bold text-gray-700">{formatCurrency(currentMetrics.totalMinPayment)}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-600 text-center">
                    💡 Paying minimums only will take ~{currentMetrics.averagePayoffTime} years to pay off
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Consolidation Loan Offer */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <PiggyBank className="w-5 h-5" />
                  New Consolidation Loan Details
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">Enter the terms offered by your lender for the new consolidation loan</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Loan Amount
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total amount needed to pay off all your current debts</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          type="number"
                          value={consolidationLoan.loanAmount}
                          onChange={(e) => updateConsolidationLoan('loanAmount', e.target.value)}
                          className="pl-7"
                          placeholder="20,000"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Interest Rate (APR)
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Annual percentage rate for the new consolidation loan</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          type="number"
                          step="0.1"
                          value={consolidationLoan.interestRate}
                          onChange={(e) => updateConsolidationLoan('interestRate', e.target.value)}
                          className="pr-7"
                          placeholder="9.0"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Loan Term
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Number of months to repay the consolidation loan</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Select value={consolidationLoan.loanTerm.toString()} onValueChange={(value) => updateConsolidationLoan('loanTerm', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select term" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="36">3 years (36 months)</SelectItem>
                          <SelectItem value="48">4 years (48 months)</SelectItem>
                          <SelectItem value="60">5 years (60 months)</SelectItem>
                          <SelectItem value="72">6 years (72 months)</SelectItem>
                          <SelectItem value="84">7 years (84 months)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Origination Fee
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>One-time fee charged when the loan is issued (typically 1-8%)</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          type="number"
                          step="0.1"
                          value={consolidationLoan.originationFee}
                          onChange={(e) => updateConsolidationLoan('originationFee', e.target.value)}
                          className="pr-7"
                          placeholder="3.0"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Fee Amount: {formatCurrency(consolidationLoan.originationFeeAmount)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Loan Preview */}
                  <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">New Loan Preview</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Monthly Payment:</span>
                        <div className="font-semibold text-green-700">{formatCurrency(consolidationMetrics.monthlyPayment)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Payoff Time:</span>
                        <div className="font-semibold text-green-700">{(consolidationLoan.loanTerm / 12).toFixed(1)} years</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Insights */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-blue-800">
                  <Info className="w-4 h-4" />
                  Important Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>A lower interest rate can make a big difference in the total amount of interest paid.</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>When figuring out how much money you will save, don't forget about origination fees.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Longer loan terms mean lower payments but more total interest.</span>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-gray-700">
                  <AlertTriangle className="w-4 h-4" />
                  Important Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <p>• Your credit score and income may affect the actual terms of the loan.</p>
                <p>• Think about how it will affect your credit score and credit utilization.</p>
                <p>• Look for fees for paying off debts early</p>
                <p>• This calculator is only for educational purposes and gives estimates</p>
              </CardContent>
            </Card>
          </div>

          {/* Results Section - 60% width */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Comparison Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-purple-800 text-base">
                  <BarChart3 className="w-4 h-4" />
                  Comparison Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <h3 className="font-medium text-red-800 mb-2 text-center text-sm">Current Debts</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Payoff Time:</span>
                        <span className="font-semibold text-red-700 text-sm">~{currentMetrics.averagePayoffTime} years</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Total Interest:</span>
                        <span className="font-semibold text-red-700 text-sm">{formatCurrency(currentMetrics.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Total Cost:</span>
                        <span className="font-semibold text-red-700 text-sm">{formatCurrency(currentMetrics.totalCost)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-medium text-green-800 mb-2 text-center text-sm">With Consolidation</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Payoff Time:</span>
                        <span className="font-semibold text-green-700 text-sm">{(consolidationLoan.loanTerm / 12).toFixed(1)} years</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Total Interest:</span>
                        <span className="font-semibold text-green-700 text-sm">{formatCurrency(consolidationMetrics.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Total Cost:</span>
                        <span className="font-semibold text-green-700 text-sm">{formatCurrency(consolidationMetrics.totalCost)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Savings Summary */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-3 text-left">💰 Savings Summary</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Interest Saved:</span>
                      <span className={`font-bold ${interestSaved > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(Math.abs(interestSaved))}
                        {interestSaved > 0 ? ' saved' : ' more'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Time Saved:</span>
                      <span className={`font-bold ${timeSaved > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {Math.abs(timeSaved).toFixed(1)} years
                        {timeSaved > 0 ? ' faster' : ' longer'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Monthly Payment:</span>
                      <span className={`font-bold ${monthlyPaymentChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(consolidationMetrics.monthlyPayment)}
                        ({monthlyPaymentChange < 0 ? '-' : '+'}{formatCurrency(Math.abs(monthlyPaymentChange))})
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Breakdown Chart */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <TrendingDown className="w-5 h-5" />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-4">
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
                
                {/* Custom Legend */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-400 rounded"></div>
                    <span>Principal: {formatCurrency(currentMetrics.totalBalance)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-400 rounded"></div>
                    <span>Interest (Current): {formatCurrency(currentMetrics.totalInterest)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-400 rounded"></div>
                    <span>Interest (Consolidated): {formatCurrency(consolidationMetrics.totalInterest)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                    <span>Origination Fee: {formatCurrency(consolidationLoan.originationFeeAmount)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Optimization Tips */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Target className="w-5 h-5" />
                  Optimization Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-medium text-green-800 mb-1">💡 Reinvestment Strategy</div>
                  <div className="text-green-700">
                    If you save {formatCurrency(Math.abs(monthlyPaymentChange))} monthly, consider putting it toward the loan to pay off faster
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-medium text-blue-800 mb-1">🎯 Balance Transfer Option</div>
                  <div className="text-blue-700">
                    Consider 0% APR balance transfer cards for high-interest credit card debt
                  </div>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="font-medium text-yellow-800 mb-1">⚖️ Debt Avalanche Method</div>
                  <div className="text-yellow-700">
                    If not consolidating, pay minimums on all debts and extra on highest interest rate first
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="w-full">
          <div className="px-6 py-8">
            <div className="space-y-6">
              
              {/* Ultimate Debt Consolidation Calculator */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Ultimate USA Debt Consolidation Calculator and Plan Maker</h2>
                
                <p className="text-gray-600 text-sm mb-3">
                  When you consolidate your debts, you combine several of them into one loan with lower interest rates and easier payments. Our all-in-one calculator helps you figure out the benefits of consolidation, compare loan options, and come up with the best ways to pay off your debt.
                </p>
                <p className="text-gray-600 text-sm">
                  Consolidation can help you get out of debt faster by lowering your monthly payments, lowering the total interest you pay, and helping you plan your finances better. This is true whether you have high-interest credit cards, personal loans, or medical debt.
                </p>
              </section>

              {/* What Is Debt Consolidation and How It Can Help */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What Is Debt Consolidation and How It Can Help</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Lowering the Interest Rate</h4>
                    <p className="text-gray-600 text-sm">
                      Instead of paying off credit card debt with high interest rates (18–25%), get a consolidation loan with lower interest rates (6–15%). Even small drops in interest rates can save you thousands over the life of the loan.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Making Payments Easier</h4>
                    <p className="text-gray-600 text-sm">
                      Turn a bunch of payments with different due dates into one monthly payment that you can count on. This lowers the risk of missing payments and makes budgeting and planning easier.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Structure of Fixed Payments</h4>
                    <p className="text-gray-600 text-sm">
                      Consolidation loans have fixed payments and clear due dates, unlike revolving credit cards. This gives you peace of mind and helps you avoid the minimum payment trap, which keeps debt going on forever.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Better Credit Score</h4>
                    <p className="text-gray-600 text-sm">
                      Paying off credit card balances can lower your credit utilization ratio, which could help your credit score. But don't close cards that you've already paid off, because this can lower your available credit and length of your credit history.
                    </p>
                  </div>
                </div>
              </section>

              {/* Debt Consolidation Pros and Cons */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Debt Consolidation: Pros and Cons</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pros Section */}
                  <section className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        ✓
                      </div>
                      <h4 className="font-semibold text-green-700 text-base">Benefits of Debt Consolidation</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Lower Interest Rates:</strong> Reduce overall interest costs significantly.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Simplified Payments:</strong> One monthly payment instead of multiple bills.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Fixed Payment Schedule:</strong> Predictable monthly amounts and clear payoff date.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Potential Credit Improvement:</strong> Lower credit utilization ratio.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Faster Debt Payoff:</strong> Structured plan to become debt-free sooner.</span></li>
                    </ul>
                  </section>

                  {/* Cons Section */}
                  <section className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        ✗
                      </div>
                      <h4 className="font-semibold text-red-700 text-base">Drawbacks of Debt Consolidation</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Qualification Requirements:</strong> Need good credit for best rates.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Origination Fees:</strong> Upfront costs can add to total debt.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Temptation to Spend:</strong> Risk of running up new debt on cleared cards.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Longer Repayment:</strong> Extended terms may increase total interest paid.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Not a Cure-All:</strong> Doesn't address underlying spending habits.</span></li>
                    </ul>
                  </section>
                </div>
              </section>
            </div>
          </div>
        
        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 text-center mt-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Calculate Your Debt Consolidation Savings Today</h3>
            <p className="text-blue-100 text-base mb-6 max-w-2xl mx-auto">
              Our comprehensive debt consolidation calculator helps you compare multiple debts, analyze consolidation benefits, and find the best strategy to become debt-free faster while saving money.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Your Debt Consolidation Analysis
            </Button>
          </div>
        </section>
      </div>
    </div>
    </TooltipProvider>
    </>
  );
};

export default DebtConsolidationCalculator;