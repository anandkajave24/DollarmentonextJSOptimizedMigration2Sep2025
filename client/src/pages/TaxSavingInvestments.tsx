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
  CheckCircle2,
  Target,
  TrendingUp,
  ArrowRight
} from "lucide-react";

export default function TaxSavingInvestments() {
  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <SEO 
        title="USA Tax-Saving Investments & Deductions - DollarMento"
        description="Comprehensive guide to tax-advantaged investments and deductions for FY 2025 tax year in the United States. Maximize your retirement savings, health accounts, and tax benefits."
        keywords="USA tax saving, 401k, IRA, HSA, tax deductions, retirement accounts, tax benefits, american tax planning, investment tax strategies, US tax system"
        canonical="https://dollarmento.com/tax-saving-investments"
      />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Receipt className="h-6 w-6 mr-2 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-800">USA Tax-Saving Investments & Deductions</h1>
        </div>
        <p className="text-gray-600 text-lg">Comprehensive Guide for FY 2025 / Tax Year 2025</p>
        <div className="flex flex-wrap items-center mt-3 gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
            📅 Tax Year: January 1 - December 31, 2025
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 font-medium px-3 py-1">
            <Calendar className="h-3 w-3 mr-1" />
            Filing Deadline: April 15, 2026
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 px-3 py-1">
            💰 Contribution Deadline: April 15, 2026
          </Badge>
        </div>
      </div>

      {/* Understanding the USA Tax System */}
      <Card className="border-blue-200 shadow-md mb-8">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 pb-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <div className="text-2xl">🏛️</div>
            </div>
            <CardTitle className="text-xl text-blue-800">Understanding the USA Tax System</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table className="border border-gray-200 rounded-lg shadow-sm">
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-100 to-indigo-50">
                  <TableHead className="font-semibold text-blue-900 px-4 py-3 border-b border-blue-200">Regime Type</TableHead>
                  <TableHead className="font-semibold text-blue-900 px-4 py-3 border-b border-blue-200">Key Features</TableHead>
                  <TableHead className="font-semibold text-blue-900 px-4 py-3 border-b border-blue-200">Best For</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-white hover:bg-blue-50">
                  <TableCell className="font-medium text-blue-800 border-b px-4 py-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                        <span className="text-blue-800 font-semibold">📄</span>
                      </div>
                      <span>Standard Deduction</span>
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-4">
                    <div className="space-y-1">
                      <div>Most taxpayers choose this. No itemizing needed.</div>
                      <div className="text-sm text-gray-600">2025: $15,000 (Single), $30,000 (MFJ), $22,500 (HOH)</div>
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-4">Simplicity, salaried individuals</TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-blue-50">
                  <TableCell className="font-medium text-blue-800 border-b px-4 py-4">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                        <span className="text-indigo-800 font-semibold">📝</span>
                      </div>
                      <span>Itemized Deduction</span>
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-4">
                    <div className="space-y-1">
                      <div>Claim individual deductions (mortgage interest, SALT, medical, etc.)</div>
                      <div className="text-sm text-gray-600">SALT cap: $10,000, Mortgage interest: $750K limit</div>
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-4">High expenses, homeowners, self-employed</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Retirement Accounts */}
      <Card className="mb-8 border-emerald-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-emerald-100 p-2 rounded-full mr-3">
                <PiggyBank className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-emerald-800">🏦 Major Tax-Advantaged Retirement Accounts</CardTitle>
                <CardDescription className="text-emerald-700 mt-1">These accounts either defer tax, grow tax-free, or offer deductions upfront</CardDescription>
              </div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-base px-3 py-1 font-medium">
              2025 Limits
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table className="border border-gray-200 rounded-lg shadow-sm">
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-emerald-100 to-teal-50">
                  <TableHead className="font-semibold text-emerald-900 px-4 py-3 border-b border-emerald-200">Account Type</TableHead>
                  <TableHead className="font-semibold text-emerald-900 px-4 py-3 border-b border-emerald-200">Max Contribution (2025)</TableHead>
                  <TableHead className="font-semibold text-emerald-900 px-4 py-3 border-b border-emerald-200">Tax Benefit</TableHead>
                  <TableHead className="font-semibold text-emerald-900 px-4 py-3 border-b border-emerald-200">Withdrawal Tax</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-white hover:bg-emerald-50">
                  <TableCell className="font-medium text-emerald-800 border-b px-4 py-3">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🏢</span>
                      401(k), 403(b), 457(b)
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="space-y-1">
                      <div className="font-medium">$23,500</div>
                      <div className="text-sm text-gray-600">+ $7,500 (50+ catch-up)</div>
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3 text-green-600 font-medium">Pre-tax deduction</TableCell>
                  <TableCell className="border-b px-4 py-3"><Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Fully taxable</Badge></TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-emerald-50">
                  <TableCell className="font-medium text-emerald-800 border-b px-4 py-3">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🏛️</span>
                      Traditional IRA
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="space-y-1">
                      <div className="font-medium">$7,000</div>
                      <div className="text-sm text-gray-600">+ $1,000 (50+)</div>
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3 text-green-600 font-medium">Deductible if income limits met</TableCell>
                  <TableCell className="border-b px-4 py-3"><Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Fully taxable</Badge></TableCell>
                </TableRow>
                <TableRow className="bg-white hover:bg-emerald-50">
                  <TableCell className="font-medium text-emerald-800 border-b px-4 py-3">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">💎</span>
                      Roth IRA
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="space-y-1">
                      <div className="font-medium">$7,000</div>
                      <div className="text-sm text-gray-600">+ $1,000 (50+)</div>
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3 text-amber-600 font-medium">No upfront deduction</TableCell>
                  <TableCell className="border-b px-4 py-3"><Badge className="bg-green-100 text-green-800 hover:bg-green-100">Tax-free withdrawals</Badge></TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-emerald-50">
                  <TableCell className="font-medium text-emerald-800 border-b px-4 py-3">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🚀</span>
                      SEP IRA
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="space-y-1">
                      <div className="font-medium">25% of income</div>
                      <div className="text-sm text-gray-600">up to $69,000</div>
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3 text-green-600 font-medium">Deductible for business income</TableCell>
                  <TableCell className="border-b px-4 py-3"><Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Fully taxable</Badge></TableCell>
                </TableRow>
                <TableRow className="bg-white hover:bg-emerald-50">
                  <TableCell className="font-medium text-emerald-800 border-b px-4 py-3">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">⚡</span>
                      Solo 401(k)
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="space-y-1">
                      <div className="font-medium">Up to $69,000</div>
                      <div className="text-sm text-gray-600">(combined employee+employer)</div>
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3 text-green-600 font-medium">Deductible</TableCell>
                  <TableCell className="border-b px-4 py-3"><Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Fully taxable</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <span className="text-blue-600 mr-2 mt-0.5">💡</span>
                <div className="text-sm text-blue-800">
                  <strong>Pro Tip:</strong> Employer match is not taxed when contributed; taxed on withdrawal. Always try to contribute enough to get full match - it's free money!
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health-Related Accounts */}
      <Card className="mb-8 border-pink-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-pink-100 p-2 rounded-full mr-3">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-pink-800">🩺 Health-Related Tax-Advantaged Accounts</CardTitle>
                <CardDescription className="text-pink-700 mt-1">Triple tax benefits for health expenses</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table className="border border-gray-200 rounded-lg shadow-sm">
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-pink-100 to-rose-50">
                  <TableHead className="font-semibold text-pink-900 px-4 py-3 border-b border-pink-200">Account</TableHead>
                  <TableHead className="font-semibold text-pink-900 px-4 py-3 border-b border-pink-200">Max Contribution (2025)</TableHead>
                  <TableHead className="font-semibold text-pink-900 px-4 py-3 border-b border-pink-200">Tax Benefit</TableHead>
                  <TableHead className="font-semibold text-pink-900 px-4 py-3 border-b border-pink-200">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-white hover:bg-pink-50">
                  <TableCell className="font-medium text-pink-800 border-b px-4 py-3">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">💎</span>
                      HSA (Health Savings Account)
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="space-y-1">
                      <div className="font-medium">$4,300 (single)</div>
                      <div className="font-medium">$8,550 (family)</div>
                      <div className="text-sm text-gray-600">+ $1,000 (50+)</div>
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="space-y-1">
                      <div className="text-green-600 font-medium">Triple tax-free</div>
                      <div className="text-xs text-gray-600">(deductible, grows tax-free, withdrawals for medical tax-free)</div>
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Must have HDHP</Badge>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-pink-50">
                  <TableCell className="font-medium text-pink-800 border-b px-4 py-3">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">📅</span>
                      FSA (Flexible Spending Account)
                    </div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="font-medium">$3,300</div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <div className="text-green-600 font-medium">Pre-tax salary reduction</div>
                  </TableCell>
                  <TableCell className="border-b px-4 py-3">
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Use-it-or-lose-it rule</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Education Tax Benefits */}
      <Card className="mb-8 border-blue-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <School className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl text-blue-800">🎓 Education Tax Benefits</CardTitle>
              <CardDescription className="text-blue-700 mt-1">Tax-advantaged education savings and credits</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Benefit</TableHead>
                  <TableHead className="font-medium">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🎓</span>
                      529 Plans
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">Tax-free growth + withdrawals</div>
                      <div className="text-sm text-gray-600">for education expenses</div>
                    </div>
                  </TableCell>
                  <TableCell>No federal deduction, but state-level deduction available in many states</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">📚</span>
                      Student Loan Interest Deduction
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Up to $2,500</div>
                  </TableCell>
                  <TableCell>Above-the-line deduction</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🎯</span>
                      Lifetime Learning Credit
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">20% of expenses up to $10,000</div>
                      <div className="text-sm text-gray-600">($2,000 max)</div>
                    </div>
                  </TableCell>
                  <TableCell>Phased out above $80K/$160K income</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🏆</span>
                      American Opportunity Credit
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Up to $2,500 per student</div>
                  </TableCell>
                  <TableCell>First 4 years of college</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Homeownership Tax Benefits */}
      <Card className="mb-8 border-green-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <Home className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-xl text-green-800">🏠 Homeownership Tax Benefits</CardTitle>
              <CardDescription className="text-green-700 mt-1">Deductions and benefits for homeowners</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Limit</TableHead>
                  <TableHead className="font-medium">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🏠</span>
                      Mortgage Interest Deduction
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Up to $750,000 loan amount</div>
                  </TableCell>
                  <TableCell>Must itemize deductions</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🏛️</span>
                      Property Tax Deduction
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Up to $10,000</div>
                  </TableCell>
                  <TableCell>Combined with state and local income taxes (SALT cap)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">💰</span>
                      Points Deduction
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Full deduction in year paid</div>
                  </TableCell>
                  <TableCell>For primary residence purchase</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🔧</span>
                      Home Office Deduction
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">$5 per sq ft</div>
                      <div className="text-sm text-gray-600">(up to 300 sq ft = $1,500)</div>
                    </div>
                  </TableCell>
                  <TableCell>Must be used exclusively for business</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="font-medium mb-2 flex items-center">
                <span className="text-green-600 mr-2">🎯</span>
                First-Time Homebuyer Benefits
              </h4>
              <Table>
                <TableHeader className="bg-white">
                  <TableRow>
                    <TableHead className="font-medium">Benefit</TableHead>
                    <TableHead className="font-medium">Amount</TableHead>
                    <TableHead className="font-medium">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>IRA Withdrawal (First Home)</TableCell>
                    <TableCell>Up to $10,000</TableCell>
                    <TableCell>Penalty-free from traditional IRA</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Roth IRA Withdrawal</TableCell>
                    <TableCell>Contributions + up to $10,000 earnings</TableCell>
                    <TableCell>Tax and penalty-free for first home</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Takeaways */}
      <Card className="mb-8 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg">
            <Target className="h-5 w-5 mr-2 text-gray-700" />
            Key Takeaways for Smart USA Tax Planning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center mb-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm font-bold">1</span>
                <h4 className="font-medium">Maximize Retirement Accounts</h4>
              </div>
              <p className="text-sm text-gray-600">401(k), IRA, and HSA contributions offer immediate tax benefits while building long-term wealth.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center mb-2">
                <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm font-bold">2</span>
                <h4 className="font-medium">Choose Deduction Strategy</h4>
              </div>
              <p className="text-sm text-gray-600">Compare standard vs itemized deductions. Homeowners often benefit from itemizing mortgage interest and property taxes.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center mb-2">
                <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm font-bold">3</span>
                <h4 className="font-medium">Plan for Healthcare</h4>
              </div>
              <p className="text-sm text-gray-600">HSAs offer triple tax benefits and FSAs reduce taxable income for medical expenses.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Strategy */}
      <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg text-indigo-800">
            <TrendingUp className="h-5 w-5 mr-2" />
            Smart USA Tax-Advantaged Investment Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">✓</span>
                Annual Contribution Priorities
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>401(k) Employer Match</span>
                  <span className="font-medium">Get full match first</span>
                </div>
                <div className="flex justify-between">
                  <span>HSA (if eligible)</span>
                  <span className="font-medium">$4,150/$8,300</span>
                </div>
                <div className="flex justify-between">
                  <span>Roth IRA</span>
                  <span className="font-medium">$7,000 (+$1,000 if 50+)</span>
                </div>
                <div className="flex justify-between">
                  <span>Max 401(k)</span>
                  <span className="font-medium">$23,000 (+$7,500 if 50+)</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">💡</span>
                Pro Tips
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Start 401(k) contributions early to benefit from compound growth</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>HSAs become retirement accounts after age 65 with no withdrawal penalties</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Consider Roth conversions during low-income years for tax diversification</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
