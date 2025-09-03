import { TabPills, TabItem } from "../components/ui/tab-pills";
import { useState } from "react";
import { SEO } from "../components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function SmartCreditCardUsage() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="px-4 py-6">
      <SEO 
        title="Smart Credit Card Usage"
        description="Learn strategies to use credit cards effectively, maximize benefits while avoiding debt traps and interest charges."
        keywords="credit card management, credit utilization, credit card tips, avoid interest charges, credit card rewards, credit card best practices"
        canonical="https://rupeesmart.com/smart-credit-card-usage"
      />
      <div className="flex items-center mb-6">
        <button 
          onClick={() => window.history.back()}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <h1 className="text-2xl font-bold">Smart Credit Card Use</h1>
      </div>

      <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-transparent p-0 border-0 w-full">
          <TabsTrigger value="overview" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Overview</TabsTrigger>
          <TabsTrigger value="utilization" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Credit Utilization</TabsTrigger>
          <TabsTrigger value="best-practices" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Best Practices</TabsTrigger>
          <TabsTrigger value="rewards" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Rewards Optimization</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Credit Card Usage Overview</CardTitle>
              <CardDescription>
                Learn how to use credit cards effectively and avoid debt traps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span className="material-icons text-blue-500 mr-2">credit_card</span>
                      <h3 className="font-medium">Understanding Credit Cards</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      A credit card is a financial tool that lets you borrow money up to a certain limit to pay for purchases, which you can pay back later.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span className="material-icons text-green-500 mr-2">check_circle</span>
                      <h3 className="font-medium">Benefits</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Build credit history, get purchase protection, earn rewards, and manage emergency expenses.
                    </p>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span className="material-icons text-red-500 mr-2">error</span>
                      <h3 className="font-medium">Risks</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      High interest rates, debt accumulation, damaged credit score, and fees if not managed properly.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Credit Card Anatomy</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Key Terms to Understand</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="material-icons text-blue-500 text-sm mr-2 mt-0.5">arrow_right</span>
                            <div>
                              <span className="font-medium">Credit Limit:</span> Maximum amount you can borrow
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-blue-500 text-sm mr-2 mt-0.5">arrow_right</span>
                            <div>
                              <span className="font-medium">APR:</span> Annual Percentage Rate - the interest charged on balances
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-blue-500 text-sm mr-2 mt-0.5">arrow_right</span>
                            <div>
                              <span className="font-medium">Grace Period:</span> Time to pay balance without incurring interest
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-blue-500 text-sm mr-2 mt-0.5">arrow_right</span>
                            <div>
                              <span className="font-medium">Minimum Payment:</span> Smallest amount required to keep account in good standing
                            </div>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2">Common Fees to Watch For</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">arrow_right</span>
                            <div>
                              <span className="font-medium">Annual Fee:</span> Yearly charge for card membership
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">arrow_right</span>
                            <div>
                              <span className="font-medium">Late Payment Fee:</span> Charged when payment deadline is missed
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">arrow_right</span>
                            <div>
                              <span className="font-medium">Cash Advance Fee:</span> Charged when withdrawing cash
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">arrow_right</span>
                            <div>
                              <span className="font-medium">Foreign Transaction Fee:</span> For purchases in foreign currencies
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Credit Utilization Tab */}
        <TabsContent value="utilization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Credit Utilization</CardTitle>
              <CardDescription>
                Keep your credit utilization under 30% to maintain a good credit score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-medium">Current Utilization</h3>
                      <p className="text-sm text-gray-500">32% (₹16,000 of ₹50,000)</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={32 < 30 ? "outline" : "secondary"} className="mb-1">
                        Ideal: Below 30%
                      </Badge>
                      <p className="text-sm text-gray-500">Target: ₹15,000 or less</p>
                    </div>
                  </div>
                  <Progress value={32} className="h-3" />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">What is Credit Utilization?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Credit utilization is the percentage of your total available credit that you're currently using. It's a key factor that affects your credit score.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Why it Matters</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="material-icons text-blue-500 text-sm mr-2 mt-0.5">info</span>
                          <div>
                            Makes up 30% of your credit score
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-blue-500 text-sm mr-2 mt-0.5">info</span>
                          <div>
                            Shows lenders how dependent you are on credit
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-blue-500 text-sm mr-2 mt-0.5">info</span>
                          <div>
                            Lower utilization indicates better credit management
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">How to Improve</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check_circle</span>
                          <div>
                            Pay down existing balances
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check_circle</span>
                          <div>
                            Request credit limit increases
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check_circle</span>
                          <div>
                            Keep unused cards open to maintain total available credit
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check_circle</span>
                          <div>
                            Pay balances before statement closing date
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Your Credit Cards</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">HDFC Bank Regalia</h4>
                        <Badge variant="outline">28% Used</Badge>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Balance: ₹8,400</span>
                        <span>Limit: ₹30,000</span>
                      </div>
                      <Progress value={28} className="h-2" />
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">SBI Card Elite</h4>
                        <Badge variant="secondary">38% Used</Badge>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Balance: ₹7,600</span>
                        <span>Limit: ₹20,000</span>
                      </div>
                      <Progress value={38} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Best Practices Tab */}
        <TabsContent value="best-practices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
              <CardDescription>
                Follow these best practices to use credit cards responsibly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <span className="material-icons text-green-600">check_circle</span>
                      </div>
                      <h3 className="font-medium">Pay in Full Each Month</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Avoid interest charges by paying your balance in full before the due date.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <span className="material-icons text-green-600">date_range</span>
                      </div>
                      <h3 className="font-medium">Set Payment Reminders</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Never miss a payment by setting up automatic payments or calendar reminders.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <span className="material-icons text-green-600">trending_down</span>
                      </div>
                      <h3 className="font-medium">Keep Utilization Low</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Try to keep your credit utilization below 30% to maintain a good credit score.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 mt-6">
                  <h3 className="font-medium mb-2">Do's and Don'ts</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-700 mb-3">Do's ✓</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                          <div className="text-sm">
                            <span className="font-medium">Review statements regularly</span>
                            <p className="text-gray-600 mt-1">Check for unauthorized charges and errors monthly</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                          <div className="text-sm">
                            <span className="font-medium">Use for budgeted expenses only</span>
                            <p className="text-gray-600 mt-1">Only charge what you can afford to pay in full</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                          <div className="text-sm">
                            <span className="font-medium">Take advantage of card benefits</span>
                            <p className="text-gray-600 mt-1">Use purchase protection, extended warranties, and rewards</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-green-500 text-sm mr-2 mt-0.5">check</span>
                          <div className="text-sm">
                            <span className="font-medium">Monitor your credit score</span>
                            <p className="text-gray-600 mt-1">Check your credit score regularly to track progress</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border border-red-200 rounded-lg p-4">
                      <h4 className="font-medium text-red-700 mb-3">Don'ts ✗</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                          <div className="text-sm">
                            <span className="font-medium">Make only minimum payments</span>
                            <p className="text-gray-600 mt-1">This leads to high interest charges and prolonged debt</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                          <div className="text-sm">
                            <span className="font-medium">Use for cash advances</span>
                            <p className="text-gray-600 mt-1">These often have higher interest rates and no grace period</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                          <div className="text-sm">
                            <span className="font-medium">Apply for too many cards</span>
                            <p className="text-gray-600 mt-1">Multiple applications can temporarily lower your credit score</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-red-500 text-sm mr-2 mt-0.5">close</span>
                          <div className="text-sm">
                            <span className="font-medium">Close old cards unnecessarily</span>
                            <p className="text-gray-600 mt-1">This can reduce your credit history length and available credit</p>
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
        
        {/* Rewards Optimization Tab */}
        <TabsContent value="rewards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rewards Optimization</CardTitle>
              <CardDescription>
                Maximize the benefits from your credit card rewards programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-3">Your Rewards Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">HDFC Regalia</h4>
                      <div className="font-medium text-lg">4,320 Points</div>
                      <div className="text-sm text-gray-500 mt-1">≈ ₹1,080 value</div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">SBI Card Elite</h4>
                      <div className="font-medium text-lg">2,850 Points</div>
                      <div className="text-sm text-gray-500 mt-1">≈ ₹710 value</div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Total Value</h4>
                      <div className="font-medium text-lg text-green-600">₹1,790</div>
                      <div className="text-sm text-gray-500 mt-1">Redeemable rewards</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Reward Types Explained</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="mb-3">
                        <span className="material-icons text-amber-500 text-xl">stars</span>
                      </div>
                      <h4 className="font-medium mb-2">Points Programs</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Earn points based on spending that can be redeemed for cashback, travel, merchandise, or gift cards.
                      </p>
                      <div className="text-sm text-primary font-medium">
                        Best for: Flexibility
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="mb-3">
                        <span className="material-icons text-blue-500 text-xl">flight</span>
                      </div>
                      <h4 className="font-medium mb-2">Travel Rewards</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Earn miles or points specifically designed for travel redemptions, often with airline or hotel partners.
                      </p>
                      <div className="text-sm text-primary font-medium">
                        Best for: Frequent travelers
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="mb-3">
                        <span className="material-icons text-green-500 text-xl">savings</span>
                      </div>
                      <h4 className="font-medium mb-2">Cashback</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Earn a percentage of your purchases back as statement credits or direct deposits.
                      </p>
                      <div className="text-sm text-primary font-medium">
                        Best for: Simplicity
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Optimization Strategies</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                          <span className="material-icons text-purple-600 text-sm">category</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Category Optimization</h4>
                          <p className="text-sm text-gray-600">
                            Use different cards for different spending categories. For example, use a card with high dining rewards at restaurants and another with high fuel rewards at gas stations.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                          <span className="material-icons text-purple-600 text-sm">redeem</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Value Maximization</h4>
                          <p className="text-sm text-gray-600">
                            Calculate the value per point for different redemption options. Travel and statement credits often provide the best value compared to merchandise.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                          <span className="material-icons text-purple-600 text-sm">card_giftcard</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Welcome Bonuses</h4>
                          <p className="text-sm text-gray-600">
                            Take advantage of welcome bonuses when signing up for new cards, but be strategic and only apply for cards that fit your spending habits.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                          <span className="material-icons text-purple-600 text-sm">calendar_month</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Timing Matters</h4>
                          <p className="text-sm text-gray-600">
                            Keep track of limited-time offers and bonus categories that rotate quarterly. Mark your calendar for redemption opportunities.
                          </p>
                        </div>
                      </div>
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