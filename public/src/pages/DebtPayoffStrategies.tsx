import { TabPills, TabItem } from "../components/ui/tab-pills";
import { useState } from "react";
import { SEO } from "../components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

interface DebtItem {
  id: number;
  name: string;
  balance: number;
  interestRate: number;
  minPayment: number;
}

export default function DebtPayoffStrategies() {
  const [activeTab, setActiveTab] = useState("strategies");
  const [payoffStrategy, setPayoffStrategy] = useState<"avalanche" | "snowball">("avalanche");
  const [extraPayment, setExtraPayment] = useState<number>(2000);
  const [debts, setDebts] = useState<DebtItem[]>([
    {
      id: 1,
      name: "Credit Card A",
      balance: 95000,
      interestRate: 18.99,
      minPayment: 2850
    },
    {
      id: 2,
      name: "Personal Loan",
      balance: 150000,
      interestRate: 12.5,
      minPayment: 5000
    },
    {
      id: 3,
      name: "Car Loan",
      balance: 325000,
      interestRate: 9.75,
      minPayment: 7500
    },
    {
      id: 4,
      name: "Credit Card B",
      balance: 45000,
      interestRate: 22.9,
      minPayment: 1350
    }
  ]);

  // Sort debts based on strategy
  const sortedDebts = [...debts].sort((a, b) => {
    if (payoffStrategy === "avalanche") {
      return b.interestRate - a.interestRate;
    } else {
      return a.balance - b.balance;
    }
  });

  // Calculate total debt and monthly payment
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinPayment = debts.reduce((sum, debt) => sum + debt.minPayment, 0);
  
  return (
    <div className="px-4 py-6">
      <SEO 
        title="Debt Payoff Strategies"
        description="Learn effective strategies to eliminate debt, including the debt snowball, debt avalanche, and debt consolidation methods to become debt-free faster."
        keywords="debt payoff, debt snowball, debt avalanche, debt consolidation, debt elimination, financial freedom, debt-free strategies"
        canonical="https://rupeesmart.com/debt-payoff-strategies"
      />
      <div className="flex items-center mb-6">
        <button 
          onClick={() => window.history.back()}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <h1 className="text-2xl font-bold">Debt Payoff Strategies</h1>
      </div>

      <Tabs defaultValue="strategies" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-transparent p-0 border-0 w-full">
          <TabsTrigger value="strategies" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Strategies</TabsTrigger>
          <TabsTrigger value="calculator" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Payoff Calculator</TabsTrigger>
          <TabsTrigger value="consolidation" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Debt Consolidation</TabsTrigger>
        </TabsList>
        
        {/* Strategies Tab */}
        <TabsContent value="strategies" className="space-y-6">
          <Card>
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
              <CardTitle className="text-black dark:text-white">Debt Payoff Methods</CardTitle>
              <CardDescription>
                Compare different debt elimination strategies to find what works for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 p-5 rounded-lg mb-6">
                  <h3 className="font-medium mb-3">Debt Strategy Basics</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Getting out of debt requires a strategic approach. Different strategies work better for different people depending on your financial situation and personality. Here are the most effective debt payoff methods.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader className="bg-blue-50 border-b border-blue-100">
                      <div className="flex items-center mb-2">
                        <span className="material-icons text-blue-500 mr-2">insights</span>
                        <CardTitle className="text-lg text-black dark:text-white">Debt Avalanche</CardTitle>
                      </div>
                      <CardDescription>
                        Mathematically optimal strategy that minimizes interest paid
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-5">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">How It Works</h4>
                          <ol className="space-y-2 text-sm text-gray-600 list-decimal pl-5">
                            <li>List all your debts from highest to lowest interest rate</li>
                            <li>Make minimum payments on all debts</li>
                            <li>Put any extra money toward the highest-interest debt</li>
                            <li>Once the highest-interest debt is paid off, move to the next highest</li>
                            <li>Continue until all debts are paid off</li>
                          </ol>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Pros</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li className="flex items-start">
                              <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                              <div>Saves the most money in interest</div>
                            </li>
                            <li className="flex items-start">
                              <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                              <div>Usually pays off debt faster than other methods</div>
                            </li>
                            <li className="flex items-start">
                              <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                              <div>Financially optimal approach</div>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Cons</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li className="flex items-start">
                              <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                              <div>May take longer to see first debt eliminated</div>
                            </li>
                            <li className="flex items-start">
                              <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                              <div>Less psychological reward early in the process</div>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Best For</h4>
                          <p className="text-sm text-gray-600">
                            People who are motivated by saving money and prefer the mathematically optimal approach.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200">
                    <CardHeader className="bg-green-50 border-b border-green-100">
                      <div className="flex items-center mb-2">
                        <span className="material-icons text-green-500 mr-2">fitness_center</span>
                        <CardTitle className="text-lg text-black dark:text-white">Debt Snowball</CardTitle>
                      </div>
                      <CardDescription>
                        Psychologically powerful strategy that builds momentum
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-5">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">How It Works</h4>
                          <ol className="space-y-2 text-sm text-gray-600 list-decimal pl-5">
                            <li>List all your debts from smallest to largest balance</li>
                            <li>Make minimum payments on all debts</li>
                            <li>Put any extra money toward the smallest balance</li>
                            <li>Once the smallest debt is paid off, move to the next smallest</li>
                            <li>Continue until all debts are paid off</li>
                          </ol>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Pros</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li className="flex items-start">
                              <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                              <div>Quick wins provide psychological motivation</div>
                            </li>
                            <li className="flex items-start">
                              <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                              <div>Reduces number of monthly payments faster</div>
                            </li>
                            <li className="flex items-start">
                              <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                              <div>Creates momentum and sense of progress</div>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Cons</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li className="flex items-start">
                              <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                              <div>Usually pays more in interest over time</div>
                            </li>
                            <li className="flex items-start">
                              <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                              <div>Not mathematically optimal</div>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Best For</h4>
                          <p className="text-sm text-gray-600">
                            People who are motivated by small victories and need psychological wins to stay committed to debt repayment.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="border-purple-200">
                  <CardHeader className="bg-purple-50 border-b border-purple-100">
                    <div className="flex items-center mb-2">
                      <span className="material-icons text-purple-500 mr-2">merge_type</span>
                      <CardTitle className="text-lg text-black dark:text-white">Debt Consolidation</CardTitle>
                    </div>
                    <CardDescription>
                      Simplify repayment and potentially lower interest rates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-5">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">How It Works</h4>
                          <ol className="space-y-2 text-sm text-gray-600 list-decimal pl-5">
                            <li>Take out a new loan or credit product</li>
                            <li>Use it to pay off multiple higher-interest debts</li>
                            <li>Make a single payment on the new consolidation loan</li>
                            <li>Benefit from potentially lower interest rate and simplified payments</li>
                          </ol>
                          
                          <h4 className="font-medium mt-4 mb-2">Common Consolidation Options</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                              <span className="material-icons text-purple-500 text-sm mr-2 mt-0.5">local_atm</span>
                              <div><span className="font-medium">Personal Loan:</span> Unsecured loan with fixed interest rate and term</div>
                            </li>
                            <li className="flex items-start">
                              <span className="material-icons text-purple-500 text-sm mr-2 mt-0.5">credit_card</span>
                              <div><span className="font-medium">Balance Transfer Credit Card:</span> 0% introductory APR for a limited time</div>
                            </li>
                            <li className="flex items-start">
                              <span className="material-icons text-purple-500 text-sm mr-2 mt-0.5">home</span>
                              <div><span className="font-medium">Home Equity Loan/HELOC:</span> Uses home as collateral for lower rates</div>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Pros</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li className="flex items-start">
                              <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                              <div>Simplifies debt management with one payment</div>
                            </li>
                            <li className="flex items-start">
                              <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                              <div>Can significantly lower interest rates</div>
                            </li>
                            <li className="flex items-start">
                              <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                              <div>May improve credit score by lowering credit utilization</div>
                            </li>
                            <li className="flex items-start">
                              <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                              <div>Fixed repayment schedule (except with HELOC)</div>
                            </li>
                          </ul>
                          
                          <h4 className="font-medium mt-4 mb-2">Cons</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li className="flex items-start">
                              <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                              <div>May require good credit for best rates</div>
                            </li>
                            <li className="flex items-start">
                              <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                              <div>Could tempt you to take on more debt if old cards are paid off</div>
                            </li>
                            <li className="flex items-start">
                              <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                              <div>Some options put your home at risk (HELOC/Home Equity)</div>
                            </li>
                            <li className="flex items-start">
                              <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                              <div>May include fees (balance transfer, origination, closing costs)</div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Best For</h4>
                        <p className="text-sm text-gray-600">
                          People with multiple high-interest debts, good credit, and the discipline to avoid accumulating new debt after consolidation.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <div className="flex items-start">
                    <span className="material-icons text-yellow-500 mr-3 mt-0.5">tips_and_updates</span>
                    <div>
                      <h4 className="font-medium mb-1">Expert Advice</h4>
                      <p className="text-sm text-gray-600">
                        No matter which strategy you choose, the key to success is consistency. Always pay at least the minimum on all debts, and put any extra funds toward the debt you're focusing on based on your chosen strategy. Create a budget that allows for debt repayment while covering necessary expenses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payoff Calculator Tab */}
        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
                <CardTitle className="text-black dark:text-white">Debt Summary</CardTitle>
                <CardDescription>Your current debt situation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Total Debt</span>
                      <span className="text-sm font-medium">₹{totalDebt.toLocaleString()}</span>
                    </div>
                    <Progress value={100} className="h-2 bg-red-100" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Monthly Minimum Payment</span>
                      <span>₹{totalMinPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>Extra Payment</span>
                      <span className="text-green-600">+₹{extraPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium mt-2 pt-2 border-t">
                      <span>Total Monthly Payment</span>
                      <span>₹{(totalMinPayment + extraPayment).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <Label className="mb-2 block">Payoff Strategy</Label>
                    <RadioGroup value={payoffStrategy} onValueChange={(value: any) => setPayoffStrategy(value)} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="avalanche" id="avalanche" />
                        <Label htmlFor="avalanche" className="font-normal cursor-pointer">Debt Avalanche (Highest Interest First)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="snowball" id="snowball" />
                        <Label htmlFor="snowball" className="font-normal cursor-pointer">Debt Snowball (Lowest Balance First)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label htmlFor="extra-payment" className="mb-2 block">Extra Monthly Payment</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="extra-payment"
                        type="number"
                        value={extraPayment}
                        onChange={(e) => setExtraPayment(parseInt(e.target.value) || 0)}
                        min="0"
                        step="500"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setExtraPayment(Math.max(0, extraPayment - 500))}
                      >
                        -
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setExtraPayment(extraPayment + 500)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
                <CardTitle className="text-black dark:text-white">Debt Payoff Plan</CardTitle>
                <CardDescription>Payoff order based on {payoffStrategy === "avalanche" ? "highest interest rate" : "lowest balance"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedDebts.map((debt, index) => {
                    // Estimate months to payoff
                    // Simple calculation (doesn't account for compounding)
                    const monthlyPayment = index === 0 
                      ? debt.minPayment + extraPayment 
                      : debt.minPayment;
                    
                    const monthsToPayoff = Math.ceil(debt.balance / monthlyPayment);
                    const totalInterest = Math.round(debt.balance * (debt.interestRate / 100) * (monthsToPayoff / 12));
                    
                    return (
                      <div key={debt.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-medium mr-2">
                                {index + 1}
                              </div>
                              <h3 className="font-medium">{debt.name}</h3>
                              {index === 0 && (
                                <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">Focus Debt</Badge>
                              )}
                            </div>
                            <div className="flex items-center mt-1 text-sm text-gray-500 space-x-3">
                              <div>₹{debt.balance.toLocaleString()}</div>
                              <div>•</div>
                              <div>{debt.interestRate}% APR</div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              ₹{debt.minPayment.toLocaleString()}/mo
                            </div>
                            {index === 0 && (
                              <div className="text-sm text-green-600 font-medium">
                                +₹{extraPayment.toLocaleString()}
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
                              {monthsToPayoff} months
                            </span>
                            <span className="text-sm font-medium">
                              ₹{totalInterest.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="p-4 border border-green-100 rounded-lg bg-green-50">
                    <div className="flex items-start">
                      <span className="material-icons text-green-600 mr-3">lightbulb</span>
                      <div>
                        <h4 className="font-medium mb-1">Pro Tip</h4>
                        <p className="text-sm text-gray-600">
                          After you pay off your first debt, roll that entire payment (minimum + extra) into the next debt on your list. This "snowball" effect accelerates your debt payoff with each debt you eliminate.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Debt Consolidation Tab */}
        <TabsContent value="consolidation" className="space-y-6">
          <Card>
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
              <CardTitle className="text-black dark:text-white">Debt Consolidation Options</CardTitle>
              <CardDescription>
                Explore ways to simplify your debt and potentially lower your interest rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 p-5 rounded-lg mb-6">
                  <h3 className="font-medium mb-3">What is Debt Consolidation?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Debt consolidation is the process of combining multiple debts into a single loan or credit product, usually with a lower interest rate. This can simplify repayment, potentially save money, and help you get out of debt faster.
                  </p>
                </div>
                
                <div className="space-y-5">
                  <h3 className="font-medium mb-3">Popular Consolidation Methods</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-purple-50 p-4 border-b">
                        <div className="flex items-center">
                          <span className="material-icons text-purple-600 mr-2">account_balance</span>
                          <h4 className="font-medium">Personal Loan</h4>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-gray-500">Interest Rates</span>
                            <p className="font-medium">10-20% (depends on credit score)</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Best For</span>
                            <p className="text-sm">Those with good credit looking to consolidate high-interest debt</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Pros</span>
                            <div className="text-sm">
                              <div className="flex items-start mt-1">
                                <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                                <div>Fixed interest rate and payment schedule</div>
                              </div>
                              <div className="flex items-start mt-1">
                                <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                                <div>No collateral required</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Cons</span>
                            <div className="text-sm">
                              <div className="flex items-start mt-1">
                                <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                                <div>May have origination fees</div>
                              </div>
                              <div className="flex items-start mt-1">
                                <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                                <div>Higher rates than secured options</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-purple-50 p-4 border-b">
                        <div className="flex items-center">
                          <span className="material-icons text-purple-600 mr-2">credit_card</span>
                          <h4 className="font-medium">Balance Transfer Credit Card</h4>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-gray-500">Interest Rates</span>
                            <p className="font-medium">0% intro APR for 6-21 months, then 14-25%</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Best For</span>
                            <p className="text-sm">Those who can pay off debt during the 0% intro period</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Pros</span>
                            <div className="text-sm">
                              <div className="flex items-start mt-1">
                                <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                                <div>0% interest during promotional period</div>
                              </div>
                              <div className="flex items-start mt-1">
                                <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                                <div>Can save substantial interest</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Cons</span>
                            <div className="text-sm">
                              <div className="flex items-start mt-1">
                                <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                                <div>Balance transfer fees (typically 3-5%)</div>
                              </div>
                              <div className="flex items-start mt-1">
                                <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                                <div>High interest after promo period ends</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-purple-50 p-4 border-b">
                        <div className="flex items-center">
                          <span className="material-icons text-purple-600 mr-2">home</span>
                          <h4 className="font-medium">Home Equity Loan</h4>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-gray-500">Interest Rates</span>
                            <p className="font-medium">7-10% fixed rate</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Best For</span>
                            <p className="text-sm">Homeowners with substantial equity needing a large amount</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Pros</span>
                            <div className="text-sm">
                              <div className="flex items-start mt-1">
                                <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                                <div>Lower interest rates than unsecured loans</div>
                              </div>
                              <div className="flex items-start mt-1">
                                <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                                <div>Fixed payment schedule</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Cons</span>
                            <div className="text-sm">
                              <div className="flex items-start mt-1">
                                <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                                <div>Puts your home at risk if you default</div>
                              </div>
                              <div className="flex items-start mt-1">
                                <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                                <div>Closing costs and fees</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-purple-50 p-4 border-b">
                        <div className="flex items-center">
                          <span className="material-icons text-purple-600 mr-2">work</span>
                          <h4 className="font-medium">Debt Management Plan (DMP)</h4>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-gray-500">Interest Rates</span>
                            <p className="font-medium">Negotiated reduced rates (varies)</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Best For</span>
                            <p className="text-sm">Those struggling with payments who need professional help</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Pros</span>
                            <div className="text-sm">
                              <div className="flex items-start mt-1">
                                <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                                <div>Professional counseling and support</div>
                              </div>
                              <div className="flex items-start mt-1">
                                <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                                <div>Single monthly payment</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Cons</span>
                            <div className="text-sm">
                              <div className="flex items-start mt-1">
                                <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                                <div>May need to close credit accounts</div>
                              </div>
                              <div className="flex items-start mt-1">
                                <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                                <div>Monthly fees for the service</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <div className="flex items-start">
                    <span className="material-icons text-yellow-500 mr-3">warning</span>
                    <div>
                      <h4 className="font-medium mb-1">Important Considerations</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Before pursuing debt consolidation, consider these factors:
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <span className="material-icons text-yellow-500 text-sm mr-2 mt-0.5">arrow_right</span>
                          <div>
                            <span className="font-medium">Total Cost:</span> Calculate the total interest and fees to ensure consolidation will actually save you money.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-yellow-500 text-sm mr-2 mt-0.5">arrow_right</span>
                          <div>
                            <span className="font-medium">Risk Factors:</span> Be cautious about securing unsecured debt with collateral like your home.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-yellow-500 text-sm mr-2 mt-0.5">arrow_right</span>
                          <div>
                            <span className="font-medium">Behavior Change:</span> Consolidation won't help if you continue accumulating new debt. Address the root causes of debt.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-yellow-500 text-sm mr-2 mt-0.5">arrow_right</span>
                          <div>
                            <span className="font-medium">Credit Impact:</span> Applying for new credit may temporarily lower your score, but reducing debt utilization can improve it long-term.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}