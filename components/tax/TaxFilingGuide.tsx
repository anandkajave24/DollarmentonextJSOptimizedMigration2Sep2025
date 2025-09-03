import React, { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Download, 
  FileText, 
  Users, 
  Briefcase, 
  Calculator, 
  Calendar,
  CheckCircle2,
  ClipboardList,
  HelpCircle,
  FileCheck,
  Landmark,
  Laptop,
  PiggyBank,
  Wallet,
  Share2,
  Info
} from "lucide-react";

type UserType = 'salaried' | 'freelancer' | 'business';

export default function TaxFilingGuide() {
  const [userType, setUserType] = useState<UserType>('salaried');
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm border border-blue-100">
        <h1 className="text-2xl font-bold text-blue-800 mb-2">Income Tax Filing Guide</h1>
        <p className="text-gray-600">
          Complete guidance for FY 2024-25 / AY 2025-26 tax filing
        </p>
        <div className="flex items-center mt-3 gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            FY 2024-25
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 font-medium">
            <Calendar className="h-3 w-3 mr-1" />
            Deadline: 31 July 2025
          </Badge>
        </div>
      </div>

      {/* User Type Selection */}
      <div className="my-6">
        <h2 className="text-lg font-semibold mb-3">Select your profile:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card 
            className={`cursor-pointer transition-all ${userType === 'salaried' ? 'ring-2 ring-blue-500 bg-blue-50/50' : 'hover:bg-gray-50'}`}
            onClick={() => setUserType('salaried')}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Salaried Individual</CardTitle>
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <CardDescription>For employees with Form 16</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer transition-all ${userType === 'freelancer' ? 'ring-2 ring-blue-500 bg-blue-50/50' : 'hover:bg-gray-50'}`}
            onClick={() => setUserType('freelancer')}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Freelancer</CardTitle>
                <Laptop className="h-5 w-5 text-indigo-600" />
              </div>
              <CardDescription>For independent professionals</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer transition-all ${userType === 'business' ? 'ring-2 ring-blue-500 bg-blue-50/50' : 'hover:bg-gray-50'}`}
            onClick={() => setUserType('business')}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Business Owner</CardTitle>
                <Briefcase className="h-5 w-5 text-orange-600" />
              </div>
              <CardDescription>For small businesses & proprietors</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="steps" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1.5 rounded-lg shadow-sm border border-gray-200">
          <TabsTrigger 
            value="steps" 
            className="font-medium text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            <ClipboardList className="h-4 w-4 mr-1.5" />
            Step-by-Step
          </TabsTrigger>
          <TabsTrigger 
            value="documents" 
            className="font-medium text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            <FileText className="h-4 w-4 mr-1.5" />
            Documents
          </TabsTrigger>
          <TabsTrigger 
            value="regimes" 
            className="font-medium text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            <Landmark className="h-4 w-4 mr-1.5" />
            Tax Regimes
          </TabsTrigger>
          <TabsTrigger 
            value="faq" 
            className="font-medium text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            <HelpCircle className="h-4 w-4 mr-1.5" />
            FAQs
          </TabsTrigger>
        </TabsList>
        
        {/* Step by Step Guide */}
        <TabsContent value="steps" className="space-y-4 mt-6">
          <div className="bg-white rounded-lg">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="step1">
                <AccordionTrigger className="hover:bg-gray-50 px-4 py-3 rounded-t-lg">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">1</span>
                    <span className="font-medium">Gather All Documents</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4">
                  <div className="space-y-3">
                    {userType === 'salaried' && (
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>PAN & Aadhaar</li>
                        <li>Form 16 (issued by employer)</li>
                        <li>Form 26AS, AIS & TIS (from Income Tax Portal)</li>
                        <li>Salary slips</li>
                        <li>Investment proofs (80C, 80D, NPS, etc.)</li>
                        <li>Rent receipts (for HRA claim)</li>
                      </ul>
                    )}
                    
                    {userType === 'freelancer' && (
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>PAN & Aadhaar</li>
                        <li>Bank statements</li>
                        <li>Invoices/receipts from clients</li>
                        <li>Expense records (rent, internet, laptop, etc.)</li>
                        <li>TDS Certificates (Form 16A)</li>
                        <li>GST details (if applicable)</li>
                        <li>Form 26AS & AIS for TDS/other incomes</li>
                      </ul>
                    )}
                    
                    {userType === 'business' && (
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>PAN & Aadhaar</li>
                        <li>Business income records (sales, invoices, stock)</li>
                        <li>Expense records (rent, salary, electricity, marketing, etc.)</li>
                        <li>GST returns (if registered)</li>
                        <li>Bank statements (linked to business)</li>
                        <li>Books of accounts (unless under presumptive scheme)</li>
                        <li>Form 26AS & AIS</li>
                      </ul>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step2">
                <AccordionTrigger className="hover:bg-gray-50 px-4 py-3">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">2</span>
                    <span className="font-medium">Login to Income Tax Portal</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4">
                  <div className="space-y-3">
                    <p>Access the official income tax portal at <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.incometax.gov.in</a></p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Login using your PAN as User ID</li>
                      <li>Link Aadhaar if not already done</li>
                      <li>Use net banking or password login</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step3">
                <AccordionTrigger className="hover:bg-gray-50 px-4 py-3">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">3</span>
                    <span className="font-medium">Choose the Correct ITR Form</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className={userType === 'salaried' ? 'border-blue-300 bg-blue-50/50' : ''}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">ITR-1 (Sahaj)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">Salary income ≤ $50L, one house property, other income like interest</p>
                          {userType === 'salaried' && (
                            <Badge className="mt-2 bg-blue-100 text-blue-800 hover:bg-blue-200">Recommended for you</Badge>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">ITR-2</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">Salary + Capital gains + Multiple house properties</p>
                        </CardContent>
                      </Card>
                      
                      <Card className={userType === 'freelancer' ? 'border-blue-300 bg-blue-50/50' : ''}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">ITR-3</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">Business income, Professional income, Capital Gains</p>
                          {userType === 'freelancer' && !userType.includes('business') && (
                            <Badge className="mt-2 bg-blue-100 text-blue-800 hover:bg-blue-200">Recommended for you</Badge>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card className={userType === 'business' ? 'border-blue-300 bg-blue-50/50' : ''}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">ITR-4 (Sugam)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">Presumptive Income (u/s 44AD for business, 44ADA for professionals)</p>
                          {userType === 'business' && (
                            <Badge className="mt-2 bg-blue-100 text-blue-800 hover:bg-blue-200">Recommended for you</Badge>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step4">
                <AccordionTrigger className="hover:bg-gray-50 px-4 py-3">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">4</span>
                    <span className="font-medium">Choose Tax Regime</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2 bg-amber-50">
                          <CardTitle className="text-md">Old Tax Regime</CardTitle>
                          <CardDescription>With deductions & exemptions</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Applicable Deductions:</p>
                            <ul className="list-disc list-inside space-y-1 ml-2 text-sm text-gray-600">
                              <li>Section 80C (LIC, PPF, ELSS, etc.)</li>
                              <li>Section 80D (Medical Insurance)</li>
                              <li>HRA, Home Loan Interest</li>
                              <li>Standard Deduction $50,000 (salaried)</li>
                              <li>Section 80E (Education loan interest)</li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2 bg-blue-50">
                          <CardTitle className="text-md">New Tax Regime</CardTitle>
                          <CardDescription>Lower tax rates, no deductions</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Benefits:</p>
                            <ul className="list-disc list-inside space-y-1 ml-2 text-sm text-gray-600">
                              <li>Lower tax slabs (5-30%)</li>
                              <li>Simplified filing</li>
                              <li>No need to maintain proofs</li>
                              <li>Standard deduction of $50,000 available</li>
                              <li>Good for those with few investments</li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <HelpCircle className="h-4 w-4 inline mr-2 text-amber-500" />
                        Compare both regimes during filing using calculators on the income tax portal 
                        or tools like ClearTax to determine which is more beneficial for your situation.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step5">
                <AccordionTrigger className="hover:bg-gray-50 px-4 py-3">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">5</span>
                    <span className="font-medium">Check 26AS, AIS & TIS</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4">
                  <div className="space-y-3">
                    <p>Verify all your tax-related information on these statements:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Form 26AS:</strong> Tax deducted (TDS), advance tax paid, refunds</li>
                      <li><strong>AIS (Annual Information Statement):</strong> Comprehensive view of financial transactions</li>
                      <li><strong>TIS (Taxpayer Information Summary):</strong> Processed version of AIS</li>
                    </ul>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mt-2">
                      <p className="text-sm text-blue-800">
                        <CheckCircle2 className="h-4 w-4 inline mr-2" />
                        Cross-check these with your bank statements and other financial records to ensure accuracy.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step6">
                <AccordionTrigger className="hover:bg-gray-50 px-4 py-3">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">6</span>
                    <span className="font-medium">Calculate Total Income</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4">
                  <div className="space-y-3">
                    {userType === 'salaried' && (
                      <div>
                        <p className="font-medium mb-2">For Salaried Individuals:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Start with Gross Salary</li>
                          <li>Subtract HRA, LTA, Standard Deduction</li>
                          <li>Subtract eligible deductions (Section 80C, 80D, etc.)</li>
                          <li>Calculate Net Taxable Income</li>
                        </ul>
                      </div>
                    )}
                    
                    {userType === 'freelancer' && (
                      <div>
                        <p className="font-medium mb-2">For Freelancers:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Record Gross Receipts from freelancing</li>
                          <li>Subtract Business expenses (software, internet, rent, laptop, etc.)</li>
                          <li className="font-medium text-emerald-700">Optional: Use Section 44ADA</li>
                          <li className="ml-8">- Declare 50% of gross receipts as income</li>
                          <li className="ml-8">- No need to maintain expense proof</li>
                          <li className="ml-8">- For professionals like IT, design, content creators, etc.</li>
                        </ul>
                      </div>
                    )}
                    
                    {userType === 'business' && (
                      <div>
                        <p className="font-medium mb-2">For Small Business Owners:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Calculate Gross Turnover</li>
                          <li>Subtract Business expenses</li>
                          <li className="font-medium text-emerald-700">Or use Section 44AD (Presumptive Tax)</li>
                          <li className="ml-8">- If turnover ≤ $2 million (soon $3 million with {'>'}95% digital)</li>
                          <li className="ml-8">- Declare 8% (or 6% for digital) as income</li>
                          <li className="ml-8">- File using ITR-4</li>
                          <li className="ml-8">- No need to maintain complex books of accounts</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step7">
                <AccordionTrigger className="hover:bg-gray-50 px-4 py-3">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">7</span>
                    <span className="font-medium">Pay Outstanding Tax</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4">
                  <div className="space-y-3">
                    <p>If TDS or advance tax doesn't cover your full tax liability:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Pay Self-Assessment Tax using Challan 280</li>
                      <li>Available on income tax portal</li>
                      <li>Pay via Net Banking, UPI, Debit Card</li>
                      <li>Keep payment confirmation for records</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step8">
                <AccordionTrigger className="hover:bg-gray-50 px-4 py-3">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">8</span>
                    <span className="font-medium">File ITR Online</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4">
                  <div className="space-y-3">
                    <p>Navigate to e-File → Income Tax Returns → File Income Tax Return, and:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Select Assessment Year 2025-26</li>
                      <li>Choose Online Mode filing</li>
                      <li>Select the appropriate ITR Form</li>
                      <li>Review and edit pre-filled data</li>
                      <li>Choose your preferred tax regime</li>
                      <li>Complete all schedules and compute tax</li>
                      <li>Submit the return</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step9">
                <AccordionTrigger className="hover:bg-gray-50 px-4 py-3">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">9</span>
                    <span className="font-medium">e-Verify Your Return</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4">
                  <div className="space-y-3">
                    <p>Verify your ITR within 30 days of filing using one of these methods:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Aadhaar OTP</li>
                      <li>Net Banking</li>
                      <li>Bank Account or Demat Account</li>
                      <li>Post signed ITR-V to CPC, Bengaluru (if using physical verification)</li>
                    </ul>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-100 mt-2">
                      <p className="text-sm text-red-700">
                        <CheckCircle2 className="h-4 w-4 inline mr-2" />
                        Your ITR filing is incomplete without verification. This is a crucial step!
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step10">
                <AccordionTrigger className="hover:bg-gray-50 px-4 py-3 rounded-b-lg">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">10</span>
                    <span className="font-medium">Keep Acknowledgment</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4">
                  <div className="space-y-3">
                    <p>Once verified, download and save important documents:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>ITR-V acknowledgment</li>
                      <li>Tax computation form</li>
                      <li>Payment challans</li>
                    </ul>
                    <p className="mt-2 text-sm">These will be useful for loans, visas, credit cards, and future reference.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          {userType === 'freelancer' && (
            <div className="mt-8 bg-indigo-50 p-5 rounded-lg border border-indigo-100">
              <h3 className="text-lg font-semibold text-indigo-800 mb-3 flex items-center">
                <Landmark className="h-5 w-5 mr-2" />
                For Freelancers with Foreign Clients
              </h3>
              <div className="space-y-3">
                <p className="text-gray-700">If you receive payments via PayPal, Wise, SWIFT, etc.:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                  <li>Report income under "Professional Income"</li>
                  <li>Maintain invoice trail + bank credit evidence</li>
                  <li>Report foreign assets under Schedule FA (if required)</li>
                  <li>Use Form 10F & TRC for DTAA benefits</li>
                  <li>If foreign client deducts tax, you may claim foreign tax credit</li>
                </ul>
              </div>
            </div>
          )}
        </TabsContent>
        
        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Essential Documents Checklist</CardTitle>
              <CardDescription>
                Required documents for {userType === 'salaried' ? 'salaried individuals' : userType === 'freelancer' ? 'freelancers' : 'business owners'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center text-green-700">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Identity & Basic Documents
                  </h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-1">PAN Card</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help inline-flex">
                              <Info className="h-4 w-4 text-blue-500" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="w-80 p-3">
                            <p>Permanent Account Number (PAN) is a 10-digit alphanumeric identifier issued by the Income Tax Department. It's mandatory for filing tax returns and serves as your primary tax identification.</p>
                            <p className="mt-2 text-sm text-blue-600 font-medium">Where to get it: Apply online through NSDK (https://www.onlineservices.nsdl.com) or UTITSK portals. You can also download e-PAN instantly through the income tax portal.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-1">Aadhaar Card</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help inline-flex">
                              <Info className="h-4 w-4 text-blue-500" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="w-80 p-3">
                            <p>Aadhaar is a 12-digit unique identity number issued by UIDAI. Linking Aadhaar with PAN is mandatory for tax filing. This helps prevent duplicate PAN cards and tax evasion.</p>
                            <p className="mt-2 text-sm text-blue-600 font-medium">Where to get it: Apply at nearest Aadhaar enrollment center or update existing Aadhaar at UIDAI portal (https://uidai.gov.in). You can download e-Aadhaar using registered mobile number.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-1">Bank Account Details</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help inline-flex">
                              <Info className="h-4 w-4 text-blue-500" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="w-80 p-3">
                            <p>Bank account details are required for receiving tax refunds directly via ECS (Electronic Clearing Service). Providing your pre-validated bank account ensures faster processing of refunds.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-1">Mobile Number linked to Aadhaar</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help inline-flex">
                              <Info className="h-4 w-4 text-blue-500" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="w-80 p-3">
                            <p>A mobile number linked to your Aadhaar is essential for e-verification of your tax return. You'll receive OTPs for various authentication steps during the filing process on this number.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  </ul>
                </div>
                
                {userType === 'salaried' && (
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center text-green-700">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Income & Tax Documents
                    </h3>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                      <li className="flex items-start">
                        <span className="mr-1">Form 16 from employer</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help inline-flex">
                                <Info className="h-4 w-4 text-blue-500" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="w-80 p-3">
                              <p>Form 16 is a certificate issued by your employer showing the TDS (Tax Deducted at Source) on your salary income. It contains details of your salary, allowances, deductions, and tax paid, making it the primary document for filing your tax return as a salaried employee.</p>
                              <p className="mt-2 text-sm text-blue-600 font-medium">Where to get it: Your employer is required to provide Form 16 by June 15th each year. Usually sent via email or company HRMS portal. Request it from your HR/payroll department if not received.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-1">Form 26AS (Tax Credit Statement)</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help inline-flex">
                                <Info className="h-4 w-4 text-blue-500" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="w-80 p-3">
                              <p>Form 26AS is your consolidated tax statement showing all taxes deducted/collected/paid on your behalf and deposited with the government. It helps verify that all tax deductions by your employer or others have been correctly reported to the tax department.</p>
                              <p className="mt-2 text-sm text-blue-600 font-medium">Where to get it: Download from the Income Tax e-filing portal (https://www.incometax.gov.in) under "View Form 26AS (Tax Credit)" in your registered account. Also available through your net banking account of authorized banks.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-1">Annual Information Statement (AIS)</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help inline-flex">
                                <Info className="h-4 w-4 text-blue-500" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="w-80 p-3">
                              <p>AIS is a comprehensive statement displaying all financial transactions reported to the Income Tax Department from various sources, including banks, index funds, employers, and other entities. It shows high-value transactions, interest income, dividends, and more, helping ensure complete income reporting.</p>
                              <p className="mt-2 text-sm text-blue-600 font-medium">Where to get it: Access through the Compliance Portal on the Income Tax e-filing website (https://www.incometax.gov.in) under "Services → AIS". Available after logging in with your PAN and password/OTP.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-1">Taxpayer Information Summary (TIS)</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help inline-flex">
                                <Info className="h-4 w-4 text-blue-500" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="w-80 p-3">
                              <p>TIS is a simplified version of your AIS that categorizes and aggregates information for easier tax filing. It shows processed financial data that can be used directly for your tax return preparation, helping you file accurately.</p>
                              <p className="mt-2 text-sm text-blue-600 font-medium">Where to get it: Available alongside AIS in the Compliance Portal of the Income Tax e-filing website. After logging in, go to "Services → AIS" and select "TIS" tab to view and download your Taxpayer Information Summary.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-1">Salary Slips</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help inline-flex">
                                <Info className="h-4 w-4 text-blue-500" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="w-80 p-3">
                              <p>Monthly salary slips provide a detailed breakdown of your earnings, deductions, and allowances. These help verify that your Form 16 accurately reflects all components of your salary and can be used to cross-check the amounts reported in your tax return.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-1">Bank Statements</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help inline-flex">
                                <Info className="h-4 w-4 text-blue-500" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="w-80 p-3">
                              <p>Bank statements help verify income and expenses reported in your tax return. They're particularly important for tracking interest income, dividends, and capital gains. Keep statements for all accounts, especially those used for investments or receiving salary.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    </ul>
                  </div>
                )}
                
                {userType === 'freelancer' && (
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center text-green-700">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Income & Business Documents
                    </h3>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                      <li>Client Invoices/Bills</li>
                      <li>Bank Statements showing receipts</li>
                      <li>Form 16A (if TDS deducted by clients)</li>
                      <li>GST Returns (if registered)</li>
                      <li>Expense Records (workspace, internet, equipment)</li>
                      <li>Professional Tax receipts (if applicable)</li>
                    </ul>
                  </div>
                )}
                
                {userType === 'business' && (
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center text-green-700">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Business Documents
                    </h3>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                      <li>Business Registration Documents</li>
                      <li>Books of Accounts (or Bank Statement for Presumptive)</li>
                      <li>Sales and Purchase Invoices</li>
                      <li>GST Returns</li>
                      <li>Inventory Records</li>
                      <li>Receipt and Payment Vouchers</li>
                      <li>Employee Salary Records (if applicable)</li>
                    </ul>
                  </div>
                )}
                
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center text-green-700">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Deduction-Related Documents
                  </h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                    <li>Section 80C: LIC, ELSS, PPF, Tax-saving FD receipts</li>
                    <li>Section 80D: Health Insurance premium receipts</li>
                    <li>Section 80G: Donation receipts</li>
                    <li>Home Loan: Interest and principal repayment certificates</li>
                    <li>HRA: Rent receipts/agreement (for salaried)</li>
                    <li>Education Loan: Interest payment certificate</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tax Regimes Tab */}
        <TabsContent value="regimes" className="space-y-4 mt-6">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Landmark className="h-5 w-5 mr-2 text-blue-600" />
                🏛️ Tax Regime Overview
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help inline-flex ml-2">
                        <Info className="h-4 w-4 text-blue-500" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="w-80 p-3">
                      <p>India has two tax regime options: Old (with deductions) and New (with lower rates but fewer deductions). Compare both to determine which saves you more tax based on your income and eligible deductions.</p>
                      <p className="mt-2 text-sm text-blue-600 font-medium">Where to learn more: Visit the Income Tax Department website (https://www.incometax.gov.in) or use their official tax calculator under "Services → e-Calculator". Tax professionals like Chartered Accountants can also provide personalized advice.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
              <CardDescription className="pt-2">
                Starting from FY 2023-24, the New Tax Regime is the default regime, but you can still opt for the Old Tax Regime if it's more beneficial.
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help inline-flex ml-1">
                        <Info className="h-4 w-4 text-blue-500" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="w-80 p-3">
                      <p>The default selection will be the New Tax Regime in the ITR forms, but you can actively choose the Old Regime by checking the appropriate option. Salaried individuals can switch between regimes each year, while business owners have restrictions on switching back after choosing the New Regime.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-blue-200 rounded-lg">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-blue-800 border-b">Regime</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-blue-800 border-b">Can Claim Deductions?</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-blue-800 border-b">Who Should Choose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-200 bg-white">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">Old Regime</td>
                      <td className="px-4 py-3 text-sm text-emerald-600 font-medium">✅ Yes</td>
                      <td className="px-4 py-3 text-sm">If you have investments, home loan, insurance, HRA, etc.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">New Regime (Updated)</td>
                      <td className="px-4 py-3 text-sm text-amber-600 font-medium">⚠️ Limited <span className="text-gray-500 font-normal">(from FY 2023-24, standard deduction allowed)</span></td>
                      <td className="px-4 py-3 text-sm">If you don't claim many deductions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                Old vs New Tax Regime Comparison
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help inline-flex ml-2">
                        <Info className="h-4 w-4 text-blue-500" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="w-80 p-3">
                      <p>Tax slabs determine the rate at which different portions of your income are taxed. The New Regime offers lower rates but fewer deductions, while the Old Regime has higher rates but allows various deductions and exemptions.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
              <CardDescription>
                FY 2024-25 / AY 2025-26 tax slab rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3 text-amber-700 flex items-center">
                    Old Tax Regime
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help inline-flex ml-2">
                            <Info className="h-4 w-4 text-blue-500" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="w-80 p-3">
                          <p>The Old Tax Regime allows you to claim various deductions and exemptions such as Section 80C (up to $1.5 thousand), Section 80D (medical insurance), HRA, home loan interest, and more. This may be beneficial if you have significant eligible deductions.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead className="bg-amber-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 border-b">Income Range ($)</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 border-b">Tax Rate</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 text-sm">0 - 2.5 thousand</td>
                          <td className="px-4 py-2 text-sm">Nil</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">2.5 - 5 thousand</td>
                          <td className="px-4 py-2 text-sm">5%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">5 - 7.5 thousand</td>
                          <td className="px-4 py-2 text-sm">20%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">7.5 - 10 thousand</td>
                          <td className="px-4 py-2 text-sm">20%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">10 - 12.5 thousand</td>
                          <td className="px-4 py-2 text-sm">30%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">12.5 - 15 thousand</td>
                          <td className="px-4 py-2 text-sm">30%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">Above 15 thousand</td>
                          <td className="px-4 py-2 text-sm">30%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <h4 className="font-medium text-sm">Available Deductions & Exemptions:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-sm text-gray-700">
                      <li>Section 80C: Up to $1.5 thousand</li>
                      <li>Section 80D: Up to $25,000 ($50,000 for senior citizens)</li>
                      <li>HRA Exemption</li>
                      <li>LTA Exemption</li>
                      <li>Standard Deduction: $50,000</li>
                      <li>Home Loan Interest: Up to $2 thousand</li>
                      <li>NPS Additional Deduction: Up to $50,000</li>
                      <li>And many more...</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 text-blue-700 flex items-center">
                    New Tax Regime
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help inline-flex ml-2">
                            <Info className="h-4 w-4 text-blue-500" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="w-80 p-3">
                          <p>The New Tax Regime offers lower tax rates but restricts most deductions and exemptions. It's suitable for those with limited tax-saving investments or those who prefer simplicity over tax planning. Since Budget 2023, standard deduction of $50,000 is also available in this regime.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead className="bg-blue-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 border-b">Income Range ($)</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 border-b">Tax Rate</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 text-sm">0 - 3 thousand</td>
                          <td className="px-4 py-2 text-sm">Nil</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">3 - 5 thousand</td>
                          <td className="px-4 py-2 text-sm">5%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">6 - 9 thousand</td>
                          <td className="px-4 py-2 text-sm">10%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">9 - 12 thousand</td>
                          <td className="px-4 py-2 text-sm">15%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">12 - 15 thousand</td>
                          <td className="px-4 py-2 text-sm">20%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">Above 15 thousand</td>
                          <td className="px-4 py-2 text-sm">30%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <h4 className="font-medium text-sm">Limited Deductions Available:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-sm text-gray-700">
                      <li>Standard Deduction: $50,000</li>
                      <li>Employer's NPS Contribution</li>
                      <li>Transport Allowance for specially abled</li>
                    </ul>
                    
                    <div className="mt-3 bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <HelpCircle className="h-4 w-4 inline mr-2" />
                        The New Tax Regime offers lower tax rates but removes most deductions and exemptions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center">
                  Which Regime Should You Choose?
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help inline-flex ml-2">
                          <Info className="h-4 w-4 text-blue-500" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="w-80 p-3">
                        <p>The choice between tax regimes depends on your specific financial situation. For an accurate comparison, calculate your tax liability under both regimes using tax calculators or consult with a tax professional before making a decision.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-amber-700 mb-1">Old Regime is better if you:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-sm text-gray-700">
                      <li>Have significant eligible investments</li>
                      <li>Pay home loan interest</li>
                      <li>Have HRA or pay high rent</li>
                      <li>Contribute heavily to EPF/NPS</li>
                      <li>Have medical insurance premiums</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-blue-700 mb-1">New Regime is better if you:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-sm text-gray-700">
                      <li>Don't have many tax-saving investments</li>
                      <li>Have income below $7 thousand</li>
                      <li>Want simplified tax filing</li>
                      <li>Prefer higher take-home salary</li>
                      <li>Are early in career with fewer deductions</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" className="text-sm">
                    <Calculator className="h-4 w-4 mr-2" />
                    Use Tax Calculator
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* FAQs Tab */}
        <TabsContent value="faq" className="space-y-4 mt-6">
          <div className="flex items-center mb-4">
            <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
            <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help inline-flex ml-2">
                    <Info className="h-4 w-4 text-blue-500" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="w-80 p-3">
                  <p>This section addresses common questions about income tax filing in India for FY 2024-25. For personalized tax advice, consider consulting a registered tax professional.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq1">
              <AccordionTrigger className="hover:bg-gray-50 px-4 py-3 rounded-t-lg flex items-center">
                <span>Who needs to file an income tax return?</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help inline-flex ml-2">
                        <Info className="h-4 w-4 text-blue-500" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="w-80 p-3">
                      <p>Filing requirements depend on your income level, residency status, and specific financial transactions. Even if your income is below taxable limits, filing can be beneficial for loan applications and claiming refunds.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                <p>You must file your Income Tax Return if:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>Your total income exceeds $2.5 thousand ($3 thousand for senior citizens)</li>
                  <li>You want to claim a tax refund</li>
                  <li>You have foreign income or assets</li>
                  <li>You're filing to carry forward losses (capital/business)</li>
                  <li>You're a freelancer, gig worker, content creator, or small business owner earning in India or abroad</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="faq2">
              <AccordionTrigger className="hover:bg-gray-50 px-4 py-3">
                What is the last date to file ITR for FY 2024-25?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                <p>The last date to file Income Tax Return for FY 2024-25 (AY 2025-26) without late fee is July 31, 2025. Filing after this date but before December 31, 2025 attracts a late fee of up to $5,000.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="faq3">
              <AccordionTrigger className="hover:bg-gray-50 px-4 py-3">
                What is Section 44AD and 44ADA?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                <p className="mb-3">These are presumptive taxation schemes that simplify tax filing:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Section 44AD:</strong> For small businesses with turnover up to $2 million ($3 million if {'>'}&nbsp;95% digital). Declare 8% of turnover (or 6% for digital transactions) as taxable income without maintaining detailed books.</li>
                  <li><strong>Section 44ADA:</strong> For professionals with gross receipts up to $50 thousand. Declare 50% of receipts as income without maintaining detailed expense records.</li>
                </ul>
                <p className="mt-3">These sections significantly simplify tax compliance for small businesses and professionals.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="faq4">
              <AccordionTrigger className="hover:bg-gray-50 px-4 py-3">
                How do I report foreign income in ITR?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Report foreign income in appropriate schedules based on income type (salary, business, etc.)</li>
                  <li>If you have foreign assets, fill Schedule FA (Foreign Assets)</li>
                  <li>If tax was paid abroad, claim relief under DTAA using Form 67</li>
                  <li>For freelancers receiving payments from abroad, report as "Professional Income"</li>
                  <li>Keep documentation of foreign income sources and tax payments</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="faq5">
              <AccordionTrigger className="hover:bg-gray-50 px-4 py-3">
                Do I need to file ITR if TDS is already deducted?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                <p>Yes, TDS is just a method of collecting tax in advance. Filing ITR is still mandatory if your total income exceeds the basic exemption limit. Even if all your tax has been paid through TDS, you must file a return to claim tax refunds, carry forward losses, and maintain a clean tax record.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="faq6">
              <AccordionTrigger className="hover:bg-gray-50 px-4 py-3">
                What expenses can freelancers claim?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                <p className="mb-3">Freelancers can claim these business expenses:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Workspace/office rent (proportionate if home office)</li>
                  <li>Internet, mobile, and communication costs</li>
                  <li>Computer, software, and equipment (with depreciation)</li>
                  <li>Professional subscriptions and learning resources</li>
                  <li>Travel expenses related to work</li>
                  <li>Marketing and advertising expenses</li>
                  <li>Banking and payment gateway charges</li>
                  <li>Professional insurance premiums</li>
                  <li>Office supplies and stationery</li>
                </ul>
                <p className="mt-3">Maintain proper documentation of all expenses to support your claims.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="faq7">
              <AccordionTrigger className="hover:bg-gray-50 px-4 py-3">
                What happens if I don't file ITR?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                <p className="mb-2">Not filing ITR when required can lead to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Late filing fees up to $5,000</li>
                  <li>Interest on unpaid tax at 1% per month</li>
                  <li>Potential penalties up to 50% of tax amount</li>
                  <li>Prosecution in severe cases</li>
                  <li>Inability to carry forward certain losses</li>
                  <li>Difficulties getting loans, credit cards, or visas</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="faq8">
              <AccordionTrigger className="hover:bg-gray-50 px-4 py-3 rounded-b-lg">
                How do I check my tax refund status?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                <p className="mb-3">You can check your tax refund status through:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Income Tax e-filing portal (incometax.gov.in) under "Services &gt; Refund/Demand Status"</li>
                  <li>NSDK TIN website using your PAN</li>
                  <li>By calling the Income Tax Department's helpline</li>
                </ul>
                <p className="mt-3">Refunds are generally processed within 2-3 months after filing and verification. Make sure your bank account is pre-validated on the tax portal for faster refunds.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
      
      {/* Actions Footer */}
      <div className="mt-8 flex flex-wrap gap-3 justify-between items-center border-t pt-4">
        <div>
          <p className="text-sm text-gray-500">
            <Calendar className="inline h-4 w-4 mr-1" />
            Last Updated: May 14, 2025
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Guide
          </Button>
        </div>
      </div>
    </div>
  );
}