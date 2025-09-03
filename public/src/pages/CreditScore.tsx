import { TabPills, TabItem } from "../components/ui/tab-pills";
import { SEO } from "../components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useState } from "react";

export default function CreditScore() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for credit score
  const creditScore = 756;
  // Get score range based on credit score
  const getScoreRange = (score: number) => {
    if (score >= 800) return { range: "Excellent", color: "bg-green-500" };
    if (score >= 750) return { range: "Very Good", color: "bg-green-400" };
    if (score >= 700) return { range: "Good", color: "bg-blue-500" };
    if (score >= 650) return { range: "Fair", color: "bg-yellow-500" };
    if (score >= 600) return { range: "Poor", color: "bg-orange-500" };
    return { range: "Very Poor", color: "bg-red-500" };
  };
  
  // Calculate score percentage (assuming 850 is max)
  const scorePercentage = Math.min(100, Math.round((creditScore / 850) * 100));
  const scoreRange = getScoreRange(creditScore);
  
  return (
    <div className="px-4 py-6">
      <SEO 
        title="Credit Score Monitoring and Improvement"
        description="Understand your credit score, factors affecting it, and strategies to improve your creditworthiness for better financial opportunities."
        keywords="credit score, credit report, credit history, improve credit score, creditworthiness, CIBIL score, credit factors"
        canonical="https://rupeesmart.com/credit-score"
      />
      <div className="flex items-center mb-6">
        <button 
          onClick={() => window.history.back()}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <h1 className="text-2xl font-bold">Credit Score</h1>
      </div>

      <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-transparent p-0 border-0 w-full">
          <TabsTrigger value="overview" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Overview</TabsTrigger>
          <TabsTrigger value="factors" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Score Factors</TabsTrigger>
          <TabsTrigger value="history" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Credit History</TabsTrigger>
          <TabsTrigger value="improvement" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Improvement</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
              <CardTitle className="text-black dark:text-white">Your Credit Score</CardTitle>
              <CardDescription>
                Last updated: April 10, 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-5xl font-bold mb-2">{creditScore}</div>
                  <div className="mb-4">
                    <Badge className={`${scoreRange.color} text-white`}>{scoreRange.range}</Badge>
                  </div>
                  <div className="w-full max-w-md mb-2">
                    <Progress value={scorePercentage} className="h-3" />
                  </div>
                  <div className="flex justify-between w-full max-w-md text-xs text-gray-500">
                    <span>300</span>
                    <span>500</span>
                    <span>650</span>
                    <span>750</span>
                    <span>850</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">Payment History</div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Excellent</div>
                      <Badge variant="outline" className="bg-green-50">On-time: 98%</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-white border rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">Credit Age</div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">6 years, 4 months</div>
                      <Badge variant="outline" className="bg-blue-50">Good</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-white border rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">Credit Mix</div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Diverse</div>
                      <Badge variant="outline" className="bg-green-50">Very Good</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">What is a Credit Score?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    A credit score is a three-digit number that represents your creditworthiness based on your credit history. In India, credit scores typically range from 300 to 850, with higher scores indicating better creditworthiness.
                  </p>
                  
                  <h4 className="font-medium text-sm mb-2">Why Your Credit Score Matters</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="material-icons text-blue-500 text-sm mr-2 mt-0.5">check_circle</span>
                        <div>
                          Determines loan and credit card approval
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="material-icons text-blue-500 text-sm mr-2 mt-0.5">check_circle</span>
                        <div>
                          Affects interest rates offered to you
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="material-icons text-blue-500 text-sm mr-2 mt-0.5">check_circle</span>
                        <div>
                          May influence employment opportunities
                        </div>
                      </li>
                    </ul>
                    
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="material-icons text-blue-500 text-sm mr-2 mt-0.5">check_circle</span>
                        <div>
                          Impacts rental application approvals
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="material-icons text-blue-500 text-sm mr-2 mt-0.5">check_circle</span>
                        <div>
                          Determines insurance premiums in some cases
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="material-icons text-blue-500 text-sm mr-2 mt-0.5">check_circle</span>
                        <div>
                          Affects utility deposit requirements
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Score Factors Tab */}
        <TabsContent value="factors" className="space-y-6">
          <Card>
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
              <CardTitle className="text-black dark:text-white">Credit Score Factors</CardTitle>
              <CardDescription>
                Understand the key factors that influence your credit score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-5 rounded-lg">
                    <h3 className="font-medium mb-4">What Affects Your Score</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Payment History</span>
                          <span className="text-sm">35%</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Credit Utilization</span>
                          <span className="text-sm">30%</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Length of Credit History</span>
                          <span className="text-sm">15%</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Credit Mix</span>
                          <span className="text-sm">10%</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">New Credit Inquiries</span>
                          <span className="text-sm">10%</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Your Score Breakdown</h3>
                    <div className="space-y-4">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="material-icons text-green-500 mr-2">thumb_up</span>
                            <h4 className="font-medium">Payment History</h4>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Excellent</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          You've made 98% of your payments on time, which is excellent. Continue maintaining this record.
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="material-icons text-yellow-500 mr-2">priority_high</span>
                            <h4 className="font-medium">Credit Utilization</h4>
                          </div>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Fair</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Your credit utilization is 32%, which is slightly above the recommended 30%. Consider reducing your balances.
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="material-icons text-blue-500 mr-2">history</span>
                            <h4 className="font-medium">Length of Credit History</h4>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">Good</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Your average account age is 6 years, 4 months, which is good. Keep your oldest accounts open to improve this factor.
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="material-icons text-green-500 mr-2">diversity_3</span>
                            <h4 className="font-medium">Credit Mix</h4>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Very Good</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          You have a good mix of credit types, including credit cards, personal loan, and auto loan.
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="material-icons text-green-500 mr-2">search</span>
                            <h4 className="font-medium">New Credit</h4>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Excellent</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          You have 0 hard inquiries in the last 6 months, which is excellent for your score.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Credit History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
              <CardTitle className="text-black dark:text-white">Credit History</CardTitle>
              <CardDescription>
                View your credit accounts and payment history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Your Credit Accounts</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">HDFC Bank Regalia Credit Card</h4>
                        <Badge variant="outline" className="bg-green-50">Active</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <div className="text-gray-500">Opened</div>
                          <div>Feb 2020</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Credit Limit</div>
                          <div>₹30,000</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Current Balance</div>
                          <div>₹8,400</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Payment Status</div>
                          <div className="text-green-600">On Time</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">SBI Card Elite Credit Card</h4>
                        <Badge variant="outline" className="bg-green-50">Active</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <div className="text-gray-500">Opened</div>
                          <div>Jul 2019</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Credit Limit</div>
                          <div>₹20,000</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Current Balance</div>
                          <div>₹7,600</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Payment Status</div>
                          <div className="text-green-600">On Time</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">ICICI Personal Loan</h4>
                        <Badge variant="outline" className="bg-green-50">Active</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <div className="text-gray-500">Opened</div>
                          <div>Sep 2021</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Original Amount</div>
                          <div>₹2,00,000</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Current Balance</div>
                          <div>₹1,42,000</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Payment Status</div>
                          <div className="text-green-600">On Time</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">HDFC Car Loan</h4>
                        <Badge variant="outline" className="bg-green-50">Active</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <div className="text-gray-500">Opened</div>
                          <div>Jan 2022</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Original Amount</div>
                          <div>₹4,50,000</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Current Balance</div>
                          <div>₹3,25,000</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Payment Status</div>
                          <div className="text-green-600">On Time</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Recent Payment History</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Account
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Mar 2025
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Feb 2025
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Jan 2025
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Dec 2024
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nov 2024
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Oct 2024
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              HDFC Regalia
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              SBI Card Elite
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                              <span className="material-icons text-sm">warning</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              ICICI Personal Loan
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              HDFC Car Loan
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              <span className="material-icons text-sm">check_circle</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="p-3 bg-gray-50 border-t">
                      <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center">
                          <span className="material-icons text-green-600 text-sm mr-1">check_circle</span>
                          <span>Paid on time</span>
                        </div>
                        <div className="flex items-center">
                          <span className="material-icons text-yellow-600 text-sm mr-1">warning</span>
                          <span>30-59 days late</span>
                        </div>
                        <div className="flex items-center">
                          <span className="material-icons text-red-600 text-sm mr-1">error</span>
                          <span>60+ days late</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Improvement Tab */}
        <TabsContent value="improvement" className="space-y-6">
          <Card>
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
              <CardTitle className="text-black dark:text-white">Credit Score Improvement</CardTitle>
              <CardDescription>
                Strategies to boost your credit score over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-2">Your Improvement Opportunities</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                        <span className="material-icons text-yellow-600 text-sm">priority_high</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Reduce Credit Utilization</h4>
                        <p className="text-sm text-gray-600">
                          Your current utilization is 32%. Pay down balances to bring it below 30% for a quick score boost.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                        <span className="material-icons text-blue-600 text-sm">info</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Continue Building Credit History</h4>
                        <p className="text-sm text-gray-600">
                          Keep your oldest accounts open and active to increase your average account age over time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Short-Term Strategies (1-3 months)</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="material-icons text-green-600 text-sm">credit_card</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Pay Down Credit Card Balances</h4>
                          <p className="text-sm text-gray-600">
                            Focus on paying down high-interest credit card balances to reduce your credit utilization ratio quickly.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="material-icons text-green-600 text-sm">error</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Dispute Errors on Credit Report</h4>
                          <p className="text-sm text-gray-600">
                            Review your credit report for errors and dispute any inaccuracies with the credit bureaus.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="material-icons text-green-600 text-sm">calendar_today</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Set Up Automatic Payments</h4>
                          <p className="text-sm text-gray-600">
                            Ensure all your bills are paid on time by setting up automatic payments or payment reminders.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Long-Term Strategies (6+ months)</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="material-icons text-blue-600 text-sm">history</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Build Payment History</h4>
                          <p className="text-sm text-gray-600">
                            Consistently make on-time payments for all your accounts to strengthen your payment history over time.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="material-icons text-blue-600 text-sm">diversity_3</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Diversify Credit Mix</h4>
                          <p className="text-sm text-gray-600">
                            Consider adding different types of credit accounts over time, such as installment loans and revolving credit.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="material-icons text-blue-600 text-sm">trending_up</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Request Credit Limit Increases</h4>
                          <p className="text-sm text-gray-600">
                            Periodically request credit limit increases on existing cards to improve your credit utilization ratio.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="material-icons text-blue-600 text-sm">search_off</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Limit Hard Inquiries</h4>
                          <p className="text-sm text-gray-600">
                            Avoid applying for multiple new credit accounts in a short period to minimize hard inquiries.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <div className="flex items-start">
                    <span className="material-icons text-yellow-500 mr-3">lightbulb</span>
                    <div>
                      <h4 className="font-medium mb-1">Credit Score Tip</h4>
                      <p className="text-sm text-gray-600">
                        Building good credit takes time. Be patient and consistent with your credit habits. Even small improvements can lead to significant benefits over time.
                      </p>
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