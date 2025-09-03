import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEO } from "../components/SEO";
import { 
  Receipt, 
  Calculator, 
  PiggyBank, 
  Home, 
  School, 
  Heart, 
  Banknote, 
  HelpCircle, 
  FileText, 
  Calendar, 
  ShieldCheck, 
  Car, 
  Scissors, 
  AlertTriangle,
  Wallet,
  Landmark,
  ClipboardList,
  CheckCircle2
} from "lucide-react";

export default function TaxSavingInvestments() {
  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <SEO 
        title="Tax Saving Investments - RupeeSmart"
        description="Explore comprehensive tax saving investment options and deductions available for FY 2024-25 (AY 2025-26) in India."
        keywords="tax saving, section 80c, tax deductions, investments, income tax, tax planning, tax benefits, 80D, home loan interest, deductions"
        canonical="https://rupeesmart.com/tax-saving-investments"
      />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Receipt className="h-6 w-6 mr-2 text-amber-500" />
          <h1 className="text-2xl font-bold">Tax Saving Investments & Deductions</h1>
        </div>
        <p className="text-gray-600">Comprehensive guide for FY 2024-25 / AY 2025-26</p>
        <div className="flex items-center mt-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            FY 2024-25
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 font-medium ml-2">
            <Calendar className="h-3 w-3 mr-1" />
            Deadline: 31 March 2025 (for investments)
          </Badge>
        </div>
      </div>

      {/* Tax Regime Overview */}
      <Card className="border-blue-200 shadow-md mb-8">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 pb-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <div className="text-2xl">🏛️</div>
            </div>
            <CardTitle className="text-xl text-blue-800">Tax Regime Overview</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table className="border border-gray-200 rounded-lg shadow-sm">
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-100 to-indigo-50">
                  <TableHead className="font-semibold text-blue-900 px-4 py-3 border-b border-blue-200">Regime</TableHead>
                  <TableHead className="font-semibold text-blue-900 px-4 py-3 border-b border-blue-200">Can Claim Deductions?</TableHead>
                  <TableHead className="font-semibold text-blue-900 px-4 py-3 border-b border-blue-200">Who Should Choose</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-white hover:bg-blue-50">
                  <TableCell className="font-medium text-blue-800 border-b px-4 py-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                        <span className="text-blue-800 font-semibold">Old</span>
                      </div>
                      <span>Old Regime</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-emerald-600 font-semibold border-b px-4 py-4">
                    <div className="flex items-center">
                      <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center mr-2">✓</span>
                      <span>Yes</span>
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-4">If you have investments, home loan, insurance, HRA, etc.</TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-blue-50">
                  <TableCell className="font-medium text-blue-800 border-b px-4 py-4">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                        <span className="text-indigo-800 font-semibold">New</span>
                      </div>
                      <span>New Regime (Updated)</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-amber-600 font-semibold border-b px-4 py-4">
                    <div className="flex items-start">
                      <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">⚠️</span>
                      <div>
                        <span>Limited</span>
                        <div className="text-gray-500 text-sm font-normal mt-1">(from FY 2023-24, standard deduction allowed)</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-4">If you don't claim many deductions</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Section 80C Investments */}
      <Card className="mb-8 border-emerald-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-emerald-100 p-2 rounded-full mr-3">
                <ShieldCheck className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-emerald-800">Section 80C Investments</CardTitle>
                <CardDescription className="text-emerald-700 mt-1">Eligible in: Old Regime Only</CardDescription>
              </div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-base px-3 py-1 font-medium">
              Max: ₹1.5 Lakh
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table className="border border-gray-200 rounded-lg shadow-sm">
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-emerald-100 to-teal-50">
                  <TableHead className="font-semibold text-emerald-900 px-4 py-3 border-b border-emerald-200">Investment / Expense</TableHead>
                  <TableHead className="font-semibold text-emerald-900 px-4 py-3 border-b border-emerald-200">Lock-in</TableHead>
                  <TableHead className="font-semibold text-emerald-900 px-4 py-3 border-b border-emerald-200">Returns</TableHead>
                  <TableHead className="font-semibold text-emerald-900 px-4 py-3 border-b border-emerald-200">Tax Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-white hover:bg-emerald-50">
                  <TableCell className="font-medium text-emerald-800 border-b px-4 py-3">EPF (Employee Provident Fund)</TableCell>
                  <TableCell className="border-b px-4 py-3">Till retirement</TableCell>
                  <TableCell className="border-b px-4 py-3 text-green-600 font-medium">~8.15%</TableCell>
                  <TableCell className="border-b px-4 py-3"><Badge className="bg-green-100 text-green-800 hover:bg-green-100">Tax-free (EEE)</Badge></TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-emerald-50">
                  <TableCell className="font-medium text-emerald-800 border-b px-4 py-3">PPF (Public Provident Fund)</TableCell>
                  <TableCell className="border-b px-4 py-3">15 years</TableCell>
                  <TableCell className="border-b px-4 py-3 text-green-600 font-medium">~7.1% (updated quarterly)</TableCell>
                  <TableCell className="border-b px-4 py-3"><Badge className="bg-green-100 text-green-800 hover:bg-green-100">Tax-free (EEE)</Badge></TableCell>
                </TableRow>
                <TableRow className="bg-white hover:bg-emerald-50">
                  <TableCell className="font-medium text-emerald-800 border-b px-4 py-3">ELSS (Equity Linked Savings Scheme)</TableCell>
                  <TableCell className="border-b px-4 py-3">3 years</TableCell>
                  <TableCell className="border-b px-4 py-3 text-blue-600 font-medium">Market-linked</TableCell>
                  <TableCell className="border-b px-4 py-3"><Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Tax-free after 1L LTCG</Badge></TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-emerald-50">
                  <TableCell className="font-medium text-emerald-800 border-b px-4 py-3">Life Insurance Premiums (LIC, term insurance)</TableCell>
                  <TableCell className="border-b px-4 py-3">NA</TableCell>
                  <TableCell className="border-b px-4 py-3">NA</TableCell>
                  <TableCell className="border-b px-4 py-3"><Badge className="bg-green-100 text-green-800 hover:bg-green-100">Tax-free maturity (Sec 10(10D))</Badge></TableCell>
                </TableRow>
                <TableRow className="bg-white hover:bg-emerald-50">
                  <TableCell className="font-medium text-emerald-800 border-b px-4 py-3">5-Year Tax-Saver FD (Bank FD)</TableCell>
                  <TableCell className="border-b px-4 py-3">5 years</TableCell>
                  <TableCell className="border-b px-4 py-3 text-amber-600 font-medium">~6.5%-7.5%</TableCell>
                  <TableCell className="border-b px-4 py-3"><Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Interest taxable</Badge></TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-emerald-50">
                  <TableCell className="font-medium text-emerald-800 border-b px-4 py-3">Sukanya Samriddhi Yojana (SSY)</TableCell>
                  <TableCell className="border-b px-4 py-3">Girl child, till 21 yrs</TableCell>
                  <TableCell className="border-b px-4 py-3 text-green-600 font-medium">~8.2%</TableCell>
                  <TableCell className="border-b px-4 py-3"><Badge className="bg-green-100 text-green-800 hover:bg-green-100">Tax-free (EEE)</Badge></TableCell>
                </TableRow>
                <TableRow className="bg-white hover:bg-emerald-50">
                  <TableCell className="font-medium text-emerald-800 border-b px-4 py-3">Senior Citizen Savings Scheme (SCSS)</TableCell>
                  <TableCell className="border-b px-4 py-3">5 years</TableCell>
                  <TableCell className="border-b px-4 py-3 text-green-600 font-medium">~8.2%</TableCell>
                  <TableCell className="border-b px-4 py-3"><Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Interest taxable</Badge></TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-emerald-50">
                  <TableCell className="font-medium text-emerald-800 border-b px-4 py-3">National Savings Certificate (NSC)</TableCell>
                  <TableCell className="border-b px-4 py-3">5 years</TableCell>
                  <TableCell className="border-b px-4 py-3 text-green-600 font-medium">~7.7%</TableCell>
                  <TableCell className="border-b px-4 py-3"><Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Interest taxable, reinvested qualifies for 80C</Badge></TableCell>
                </TableRow>
                <TableRow className="bg-white hover:bg-emerald-50">
                  <TableCell className="font-medium text-emerald-800 border-b px-4 py-3">Tuition Fees for Children</TableCell>
                  <TableCell className="border-b px-4 py-3">NA</TableCell>
                  <TableCell className="border-b px-4 py-3">NA</TableCell>
                  <TableCell className="border-b px-4 py-3">Only for full-time education, up to 2 children</TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-emerald-50">
                  <TableCell className="font-medium text-emerald-800 border-b px-4 py-3">Home Loan Principal Repayment</TableCell>
                  <TableCell className="border-b px-4 py-3">5 years lock-in</TableCell>
                  <TableCell className="border-b px-4 py-3">NA</TableCell>
                  <TableCell className="border-b px-4 py-3">Deduction allowed for self-occupied house</TableCell>
                </TableRow>
                <TableRow className="bg-white hover:bg-emerald-50">
                  <TableCell className="font-medium text-emerald-800 border-b px-4 py-3">Stamp Duty & Registration Charges</TableCell>
                  <TableCell className="border-b px-4 py-3">NA</TableCell>
                  <TableCell className="border-b px-4 py-3">NA</TableCell>
                  <TableCell className="border-b px-4 py-3">One-time deduction allowed in year of purchase</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Other Deductions - Tabbed Interface */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Calculator className="h-5 w-5 mr-2 text-indigo-600" />
            Other Tax Deductions & Benefits
          </CardTitle>
          <CardDescription>Beyond Section 80C - Additional tax saving opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="medical" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="medical" className="text-xs md:text-sm">Medical</TabsTrigger>
              <TabsTrigger value="home" className="text-xs md:text-sm">Home Loan</TabsTrigger>
              <TabsTrigger value="education" className="text-xs md:text-sm">Education</TabsTrigger>
              <TabsTrigger value="disability" className="text-xs md:text-sm">Disability</TabsTrigger>
              <TabsTrigger value="donations" className="text-xs md:text-sm">Donations</TabsTrigger>
              <TabsTrigger value="others" className="text-xs md:text-sm">Others</TabsTrigger>
            </TabsList>
            
            {/* Medical Insurance - Section 80D */}
            <TabsContent value="medical" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-pink-500" />
                  <h3 className="text-base font-medium">Section 80D – Medical Insurance</h3>
                </div>
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-medium">Type</TableHead>
                      <TableHead className="font-medium">Maximum Deduction</TableHead>
                      <TableHead className="font-medium">Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Self + Family (&lt;60 yrs)</TableCell>
                      <TableCell>₹25,000</TableCell>
                      <TableCell>Includes spouse and children</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Parents (&lt;60 yrs)</TableCell>
                      <TableCell>₹25,000</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Parents (&gt;60 yrs)</TableCell>
                      <TableCell>₹50,000</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Self (senior citizen)</TableCell>
                      <TableCell>₹50,000</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Preventive Health Checkup</TableCell>
                      <TableCell>₹5,000</TableCell>
                      <TableCell>Allowed within 25k/50k limit</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium mb-2 flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-blue-600" />
                    Section 80DDB – Treatment of Specified Diseases
                  </h4>
                  <Table>
                    <TableHeader className="bg-white">
                      <TableRow>
                        <TableHead className="font-medium">Patient Age</TableHead>
                        <TableHead className="font-medium">Max Deduction</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>&lt;60 yrs</TableCell>
                        <TableCell>₹40,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>&gt;60 yrs</TableCell>
                        <TableCell>₹1 lakh</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <p className="text-xs text-gray-600 mt-2">Diseases include cancer, kidney failure, neurological issues, etc.</p>
                </div>
              </div>
            </TabsContent>
            
            {/* Home Loan - Section 24(b) */}
            <TabsContent value="home" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Home className="h-5 w-5 mr-2 text-blue-500" />
                  <h3 className="text-base font-medium">Section 24(b) – Home Loan Interest</h3>
                </div>
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-medium">Type</TableHead>
                      <TableHead className="font-medium">Limit</TableHead>
                      <TableHead className="font-medium">Regime</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Self-Occupied Property</TableCell>
                      <TableCell>₹2 lakh/year</TableCell>
                      <TableCell>Old Regime only</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Let-Out Property</TableCell>
                      <TableCell>No upper limit (but capped total loss at ₹2L)</TableCell>
                      <TableCell>Old Regime</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium mb-2 flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-blue-600" />
                    Section 80EE / 80EEA – First-time Home Buyers
                  </h4>
                  <Table>
                    <TableHeader className="bg-white">
                      <TableRow>
                        <TableHead className="font-medium">Section</TableHead>
                        <TableHead className="font-medium">Limit</TableHead>
                        <TableHead className="font-medium">Conditions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>80EE</TableCell>
                        <TableCell>₹50,000</TableCell>
                        <TableCell>Loan sanctioned between 2016–2017, property &lt; ₹50L</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>80EEA</TableCell>
                        <TableCell>₹1.5 lakh</TableCell>
                        <TableCell>Loan between Apr 2019–Mar 2022, not extended post FY22</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            {/* Education Loan - Section 80E */}
            <TabsContent value="education" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center">
                  <School className="h-5 w-5 mr-2 text-purple-500" />
                  <h3 className="text-base font-medium">Section 80E – Education Loan Interest</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">Key Benefits</h4>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">✓</span>
                        <span>Full interest deduction (no limit)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">✓</span>
                        <span>For higher education (India or abroad)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">✓</span>
                        <span>Only interest component qualifies, not principal</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">Eligibility Criteria</h4>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">✓</span>
                        <span>Duration: 8 years from start of repayment</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">✓</span>
                        <span>For self, spouse, children or ward</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">✓</span>
                        <span>Loan must be from financial institution or approved charity</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Disability Deductions */}
            <TabsContent value="disability" className="mt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center mb-3">
                      <HelpCircle className="h-5 w-5 mr-2 text-indigo-600" />
                      <h3 className="text-base font-medium">Section 80U – Disability of Individual</h3>
                    </div>
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="font-medium">Disability Type</TableHead>
                          <TableHead className="font-medium">Deduction</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>40%–79%</TableCell>
                          <TableCell>₹75,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>80%+ (severe)</TableCell>
                          <TableCell>₹1.25 lakh</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <p className="text-xs text-gray-600 mt-2">(Claimed by the disabled person)</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-3">
                      <HelpCircle className="h-5 w-5 mr-2 text-indigo-600" />
                      <h3 className="text-base font-medium">Section 80DD – Dependent with Disability</h3>
                    </div>
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="font-medium">Disability Type</TableHead>
                          <TableHead className="font-medium">Deduction</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>40%–79%</TableCell>
                          <TableCell>₹75,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>80%+</TableCell>
                          <TableCell>₹1.25 lakh</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <p className="text-xs text-gray-600 mt-2">(Claimed by the caregiver)</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Donations - Section 80G */}
            <TabsContent value="donations" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center">
                  <PiggyBank className="h-5 w-5 mr-2 text-green-500" />
                  <h3 className="text-base font-medium">Section 80G – Donations</h3>
                </div>
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-medium">Type</TableHead>
                      <TableHead className="font-medium">Deduction</TableHead>
                      <TableHead className="font-medium">Regime</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>PM CARES, PMNRF, National Defence Fund</TableCell>
                      <TableCell>100% without limit</TableCell>
                      <TableCell>Both Regimes</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>NGOs, Charitable Trusts</TableCell>
                      <TableCell>50% or 100%, with/without qualifying limit (10% of Gross Total Income)</TableCell>
                      <TableCell>Old Regime only (most cases)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                  <p className="text-sm flex items-start">
                    <AlertTriangle className="h-4 w-4 mr-2 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Always ensure the organization has valid 80G certification and verify on the Income Tax portal before making donations for tax benefits.</span>
                  </p>
                </div>
              </div>
            </TabsContent>
            
            {/* Other Deductions */}
            <TabsContent value="others" className="mt-4">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <Banknote className="h-5 w-5 mr-2 text-green-600" />
                      <h3 className="text-base font-medium">Interest Income Deductions</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="border-b pb-2">
                        <h4 className="font-medium text-sm">Section 80TTB – Senior Citizens</h4>
                        <p className="text-sm text-gray-600">Up to ₹50,000 interest from savings + FDs/RDs</p>
                        <Badge className="mt-1 bg-blue-100 text-blue-800 hover:bg-blue-100">Only for 60+ years</Badge>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Section 80TTA – Savings Account Interest</h4>
                        <p className="text-sm text-gray-600">Up to ₹10,000 deduction</p>
                        <p className="text-sm text-gray-600">Only for non-senior citizens</p>
                        <Badge className="mt-1 bg-blue-100 text-blue-800 hover:bg-blue-100">Savings account only, not FDs</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <Car className="h-5 w-5 mr-2 text-indigo-600" />
                      <h3 className="text-base font-medium">Section 80EEB – Electric Vehicle Loan</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="bg-indigo-100 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">✓</span>
                        <span className="text-sm">Deduction up to ₹1.5 lakh on interest</span>
                      </div>
                      <div className="flex items-start">
                        <span className="bg-indigo-100 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">✓</span>
                        <span className="text-sm">Only for individuals</span>
                      </div>
                      <div className="flex items-start">
                        <span className="bg-indigo-100 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">✓</span>
                        <span className="text-sm">Loan must be taken between Apr 2019 and Mar 2023</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium mb-3 flex items-center">
                    <Scissors className="h-4 w-4 mr-2 text-blue-600" />
                    Standard Deduction (Available in Both Regimes)
                  </h4>
                  <Table>
                    <TableHeader className="bg-white">
                      <TableRow>
                        <TableHead className="font-medium">Taxpayer Type</TableHead>
                        <TableHead className="font-medium">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Salaried / Pensioners</TableCell>
                        <TableCell>₹50,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Family Pensioners</TableCell>
                        <TableCell>₹15,000 or 1/3rd of pension (whichever lower)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <p className="text-xs text-gray-600 mt-2">Note: This was made available in the New Regime from FY 2023-24 onwards.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Comparison New vs Old Regime */}
      <Card className="mb-8 border-red-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 border-b border-red-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <Calculator className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-xl text-red-800">Deductions NOT Allowed in New Regime</CardTitle>
            </div>
            <Badge className="bg-red-100 text-red-800 border-red-200">
              With Exceptions
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table className="border border-gray-200 rounded-lg shadow-sm">
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-red-100 to-rose-50">
                  <TableHead className="font-semibold text-red-900 px-4 py-3 border-b border-red-200">Deduction</TableHead>
                  <TableHead className="font-semibold text-red-900 px-4 py-3 border-b border-red-200">New Regime Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-white hover:bg-red-50">
                  <TableCell className="font-medium text-gray-800 border-b px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">80C</Badge>
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">80D</Badge>
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">HRA</Badge>
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">LTA</Badge>
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">24(b)</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="flex items-center">
                      <div className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center mr-2">❌</div>
                      <span className="font-medium">Not allowed</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-green-50">
                  <TableCell className="font-medium text-gray-800 border-b px-4 py-3">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Standard Deduction</Badge>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="flex items-center">
                      <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2">✓</div>
                      <span className="font-medium text-green-700">Allowed</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-white hover:bg-green-50">
                  <TableCell className="font-medium text-gray-800 border-b px-4 py-3">
                    <div className="flex items-center">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">80CCD(2)</Badge>
                      <span className="ml-2">Employer NPS Contribution</span>
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="flex items-center">
                      <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2">✓</div>
                      <span className="font-medium text-green-700">Allowed</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-green-50">
                  <TableCell className="font-medium text-gray-800 border-b px-4 py-3">
                    <div className="flex items-center">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">80JJAA</Badge>
                      <span className="ml-2">New employment deduction</span>
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="flex items-center">
                      <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2">✓</div>
                      <span className="font-medium text-green-700">Allowed</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-white hover:bg-green-50">
                  <TableCell className="font-medium text-gray-800 border-b px-4 py-3">
                    <div className="flex items-center">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">80CCH</Badge>
                      <span className="ml-2">Agniveer corpus</span>
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="flex items-center">
                      <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2">✓</div>
                      <span className="font-medium text-green-700">Allowed</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pro Tips Section */}
      <Card className="mb-8 border-amber-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
          <div className="flex items-center">
            <div className="bg-amber-100 p-2 rounded-full mr-3">
              <HelpCircle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <CardTitle className="text-xl text-amber-800">Pro-Tip: Which Regime Should You Choose?</CardTitle>
              <CardDescription className="text-amber-700 mt-1">Compare your personal situation with these scenarios</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table className="border border-gray-200 rounded-lg shadow-sm">
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-amber-100 to-amber-50">
                  <TableHead className="font-semibold text-amber-900 px-4 py-3 border-b border-amber-200">Scenario</TableHead>
                  <TableHead className="font-semibold text-amber-900 px-4 py-3 border-b border-amber-200">Suggested Regime</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-white hover:bg-amber-50">
                  <TableCell className="font-medium text-gray-800 border-b px-4 py-3">No deductions/investments</TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="flex items-center">
                      <Badge className="bg-indigo-100 text-indigo-800">New Regime</Badge>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-amber-50">
                  <TableCell className="font-medium text-gray-800 border-b px-4 py-3">Home loan, 80C, insurance, etc.</TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="flex items-center">
                      <Badge className="bg-blue-100 text-blue-800">Old Regime</Badge>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-white hover:bg-amber-50">
                  <TableCell className="font-medium text-gray-800 border-b px-4 py-3">Salaried with employer NPS & standard deduction only</TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="flex items-center">
                      <Badge className="bg-indigo-100 text-indigo-800">New Regime</Badge>
                      <span className="ml-2 text-sm text-gray-600">may benefit</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-amber-50">
                  <TableCell className="font-medium text-gray-800 border-b px-4 py-3">Freelancer with business expenses</TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="flex items-center">
                      <Badge className="bg-blue-100 text-blue-800">Old Regime</Badge>
                      <span className="ml-2 text-sm text-gray-600">(more deductions available)</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 bg-white p-4 rounded-lg border border-amber-100 flex items-center">
            <div className="bg-amber-100 rounded-full p-2 mr-3 flex-shrink-0">
              <Calculator className="h-5 w-5 text-amber-600" />
            </div>
            <p className="text-gray-700">
              <span className="font-medium">Recommendation:</span> Use the comparison tool on the Income Tax Portal to simulate both regimes before filing, based on your actual income and deductions.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Filing & Planning Tips */}
      <Card className="border-blue-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl text-blue-800">Filing & Planning Tips</CardTitle>
              <CardDescription className="text-blue-700 mt-1">Important dates and strategies for tax optimization</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-4">
              <div className="flex items-center mb-2">
                <div className="bg-red-100 rounded-full p-1.5 mr-2">
                  <Calendar className="h-4 w-4 text-red-600" />
                </div>
                <h3 className="font-semibold text-red-800">Filing Deadline</h3>
              </div>
              <div className="flex items-center ml-1">
                <Badge className="bg-red-100 text-red-800 border-red-200 font-medium">
                  31 July 2025
                </Badge>
                <span className="ml-2 text-gray-600 text-sm">for individuals without audit requirement</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-4">
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 rounded-full p-1.5 mr-2">
                  <PiggyBank className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="font-semibold text-blue-800">Investment Deadline</h3>
              </div>
              <div className="flex items-center ml-1">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-medium">
                  31 March 2025
                </Badge>
                <span className="ml-2 text-gray-600 text-sm">for all tax-saving investments</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-5">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
              <Wallet className="h-5 w-5 mr-2 text-blue-600" />
              Smart Tax Planning Strategies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                  <span className="text-sm">1</span>
                </div>
                <p className="text-gray-700">Plan deductions throughout the year—not just at the end</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                  <span className="text-sm">2</span>
                </div>
                <p className="text-gray-700">For freelancers and gig workers, track income & expenses monthly</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                  <span className="text-sm">3</span>
                </div>
                <p className="text-gray-700">Use online tax calculators to estimate liability before investing</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                  <span className="text-sm">4</span>
                </div>
                <p className="text-gray-700">Compare old vs new regime with your actual data before choosing</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}