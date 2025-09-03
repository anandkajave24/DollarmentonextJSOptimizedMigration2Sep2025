import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, DollarSign, Home, Heart, GraduationCap, Car, Building, PiggyBank, FileText, TrendingUp, Info, Shield, Receipt, Target, Download, Flag, PieChart, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from 'react-helmet';
import { useToast } from "@/hooks/use-toast";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, ChartTooltip, Legend);

// Tax constants for 2025
const TAX_CONSTANTS = {
  STANDARD_DEDUCTION: {
    single: 15000,
    marriedFilingJointly: 30000,
    marriedFilingSeparately: 15000,
    headOfHousehold: 22500
  },
  CONTRIBUTION_LIMITS: {
    traditional401k: 23500,
    roth401k: 23500,
    traditionalIRA: 7000,
    rothIRA: 7000,
    hsa: 4300,
    hsaFamily: 8550
  },
  TAX_BRACKETS: {
    single: [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 }
    ]
  },
  FICA_RATES: {
    socialSecurity: 0.062,
    medicare: 0.0145,
    additionalMedicare: 0.009,
    additionalMedicareThreshold: 200000
  },
  SALT_CAP: 10000
};

const TaxCalculatorUSA = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("income");
  const [filingStatus, setFilingStatus] = useState("single");
  const [taxYear, setTaxYear] = useState("2025");

  // Income state
  const [income, setIncome] = useState({
    salary: 102000,
    rental: 18000,
    business: 0,
    capitalGains: 0,
    capitalLosses: 0,
    interest: 0,
    other: 0
  });

  // Retirement contributions
  const [retirement, setRetirement] = useState({
    traditional401k: 15000,
    roth401k: 0,
    traditionalIRA: 7000,
    rothIRA: 0,
    hsa: 4150
  });

  // Itemized deductions
  const [deductions, setDeductions] = useState({
    mortgageInterest: 20000,
    propertyTaxes: 8000,
    healthInsurance: 2500,
    studentLoanInterest: 2500,
    charitableDonations: 5000,
    saltDeduction: 8000
  });

  // Tax credits
  const [credits, setCredits] = useState({
    childTaxCredit: 0,
    evCredit: 0,
    educationCredit: 0,
    saversCredit: 0
  });

  // Helper functions
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US')}`;
  };

  const handleIncomeChange = (field: keyof typeof income, value: string) => {
    setIncome(prev => ({ ...prev, [field]: Number(value) || 0 }));
  };

  const handleRetirementChange = (field: keyof typeof retirement, value: string) => {
    setRetirement(prev => ({ ...prev, [field]: Number(value) || 0 }));
  };

  const handleDeductionChange = (field: keyof typeof deductions, value: string) => {
    setDeductions(prev => ({ ...prev, [field]: Number(value) || 0 }));
  };

  const handleCreditChange = (field: keyof typeof credits, value: string) => {
    setCredits(prev => ({ ...prev, [field]: Number(value) || 0 }));
  };

  // Calculate tax metrics
  const calculateTaxMetrics = () => {
    // Total income calculation
    const totalIncome = income.salary + income.rental + income.business + 
                       Math.max(0, income.capitalGains - income.capitalLosses) + 
                       income.interest + income.other;

    // Pre-tax retirement contributions (reduce AGI)
    const preTaxRetirement = retirement.traditional401k + retirement.traditionalIRA + retirement.hsa;
    
    // Adjusted Gross Income
    const adjustedGrossIncome = Math.max(0, totalIncome - preTaxRetirement - deductions.studentLoanInterest);

    // Standard vs Itemized deductions
    const standardDeduction = TAX_CONSTANTS.STANDARD_DEDUCTION[filingStatus as keyof typeof TAX_CONSTANTS.STANDARD_DEDUCTION];
    const saltCapped = Math.min(deductions.saltDeduction, TAX_CONSTANTS.SALT_CAP);
    const itemizedDeductions = deductions.mortgageInterest + deductions.propertyTaxes + 
                              saltCapped + deductions.charitableDonations + deductions.healthInsurance;
    
    const totalDeductions = Math.max(standardDeduction, itemizedDeductions);
    const usingItemized = itemizedDeductions > standardDeduction;

    // Taxable income
    const taxableIncome = Math.max(0, adjustedGrossIncome - totalDeductions);

    // Federal income tax calculation
    let federalTax = 0;
    const brackets = TAX_CONSTANTS.TAX_BRACKETS.single;
    
    for (const bracket of brackets) {
      if (taxableIncome > bracket.min) {
        const taxableAtRate = Math.min(taxableIncome, bracket.max) - bracket.min;
        federalTax += taxableAtRate * bracket.rate;
      }
    }

    // FICA taxes
    const socialSecurityTax = Math.min(income.salary, 160200) * TAX_CONSTANTS.FICA_RATES.socialSecurity;
    const medicareTax = income.salary * TAX_CONSTANTS.FICA_RATES.medicare;
    const additionalMedicareTax = Math.max(0, income.salary - TAX_CONSTANTS.FICA_RATES.additionalMedicareThreshold) * 
                                 TAX_CONSTANTS.FICA_RATES.additionalMedicare;
    
    const totalFicaTax = socialSecurityTax + medicareTax + additionalMedicareTax;

    // Tax credits
    const totalCredits = credits.childTaxCredit + credits.evCredit + credits.educationCredit + credits.saversCredit;

    // Final calculations
    const totalFederalTax = Math.max(0, federalTax - totalCredits);
    const totalTax = totalFederalTax + totalFicaTax;
    const afterTaxIncome = totalIncome - totalTax;
    const effectiveTaxRate = totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0;
    
    // Marginal tax rate
    let marginalTaxRate = 10;
    for (const bracket of brackets) {
      if (taxableIncome > bracket.min) {
        marginalTaxRate = bracket.rate * 100;
      }
    }

    return {
      totalIncome,
      adjustedGrossIncome,
      taxableIncome,
      federalTax: totalFederalTax,
      ficaTax: totalFicaTax,
      socialSecurityTax,
      medicareTax,
      totalTax,
      afterTaxIncome,
      effectiveTaxRate,
      marginalTaxRate,
      standardDeduction,
      itemizedDeductions,
      totalDeductions,
      usingItemized,
      preTaxRetirement,
      totalCredits
    };
  };

  const taxMetrics = calculateTaxMetrics();

  return (
    <>
      <Helmet>
        <title>Tax Calculator USA - Federal & State Income Tax Calculator 2025 | DollarMento</title>
        <meta name="description" content="Calculate your 2025 federal and state income taxes with our comprehensive USA tax calculator. Get accurate tax estimates, deductions, and planning strategies." />
        <meta name="keywords" content="tax calculator usa, federal tax calculator, state tax calculator, income tax calculator 2025, tax calculator 2025, tax estimator, tax planning calculator, irs tax calculator" />
        <link rel="canonical" href="https://dollarmento.com/tax-calculator" />
      </Helmet>
      <TooltipProvider>
      <div className="w-full">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 mb-2">
              <Flag className="w-8 h-8 text-blue-600" />
              <span>US Federal Tax Calculator</span>
            </h1>
            <p className="text-lg text-gray-600">Accurately calculate your Federal taxes, maximize deductions, and project retirement benefits — all in one place.</p>
          </div>

        {/* Filing Status & Tax Year Selection */}
        <Card className="mb-6 border-0 bg-white shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Filing Status</Label>
              <Select value={filingStatus} onValueChange={setFilingStatus}>
                <SelectTrigger className="w-full bg-white border shadow-sm">
                  <SelectValue placeholder="Select Filing Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="marriedFilingJointly">Married Filing Jointly</SelectItem>
                  <SelectItem value="marriedFilingSeparately">Married Filing Separately</SelectItem>
                  <SelectItem value="headOfHousehold">Head of Household</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Tax Year</Label>
              <Select value={taxYear} onValueChange={setTaxYear}>
                <SelectTrigger className="w-full bg-white border shadow-sm">
                  <SelectValue placeholder="Select Tax Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Sections - 50% width */}
        <div className="lg:col-span-1 space-y-6">
          {/* Income Overview */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Receipt className="w-5 h-5" />
                Income Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    💼 Salary Income
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter your total W-2 salary, wages, and tips from all employers</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="number"
                    value={income.salary}
                    onChange={(e) => handleIncomeChange('salary', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    🏘️ Rental Income
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Net rental income from real estate properties (after expenses)</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="number"
                    value={income.rental}
                    onChange={(e) => handleIncomeChange('rental', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    📊 Business Income
                  </Label>
                  <Input
                    type="number"
                    value={income.business}
                    onChange={(e) => handleIncomeChange('business', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    💳 Interest Income
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Interest from savings accounts, CDs, bonds, and other investments</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="number"
                    value={income.interest}
                    onChange={(e) => handleIncomeChange('interest', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    📈 Capital Gains
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Profits from selling stocks, bonds, real estate, or other investments</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="number"
                    value={income.capitalGains}
                    onChange={(e) => handleIncomeChange('capitalGains', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    📉 Capital Losses
                  </Label>
                  <Input
                    type="number"
                    value={income.capitalLosses}
                    onChange={(e) => handleIncomeChange('capitalLosses', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-green-800">🔢 Total Gross Income</span>
                  <span className="text-xl font-bold text-green-700">{formatCurrency(taxMetrics.totalIncome)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Retirement Contributions */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <PiggyBank className="w-5 h-5" />
                Retirement Contributions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    Traditional 401(k)
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Pre-tax contributions reduce your current taxable income. 2025 limit: $23,500</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="number"
                    value={retirement.traditional401k}
                    onChange={(e) => handleRetirementChange('traditional401k', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Max: ${TAX_CONSTANTS.CONTRIBUTION_LIMITS.traditional401k.toLocaleString()} | 
                    Remaining: ${(TAX_CONSTANTS.CONTRIBUTION_LIMITS.traditional401k - retirement.traditional401k).toLocaleString()}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    Roth 401(k)
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>After-tax contributions that grow tax-free. No tax on qualified withdrawals in retirement</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="number"
                    value={retirement.roth401k}
                    onChange={(e) => handleRetirementChange('roth401k', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Max: ${TAX_CONSTANTS.CONTRIBUTION_LIMITS.roth401k.toLocaleString()} | 
                    Remaining: ${(TAX_CONSTANTS.CONTRIBUTION_LIMITS.roth401k - retirement.roth401k).toLocaleString()}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    Traditional IRA
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Tax-deductible IRA contributions. Subject to income limits if you have a 401(k)</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="number"
                    value={retirement.traditionalIRA}
                    onChange={(e) => handleRetirementChange('traditionalIRA', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Max: ${TAX_CONSTANTS.CONTRIBUTION_LIMITS.traditionalIRA.toLocaleString()} | 
                    Remaining: ${(TAX_CONSTANTS.CONTRIBUTION_LIMITS.traditionalIRA - retirement.traditionalIRA).toLocaleString()}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    Roth IRA
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>After-tax IRA contributions. Subject to income limits but tax-free in retirement</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="number"
                    value={retirement.rothIRA}
                    onChange={(e) => handleRetirementChange('rothIRA', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Max: ${TAX_CONSTANTS.CONTRIBUTION_LIMITS.rothIRA.toLocaleString()} | 
                    Remaining: ${(TAX_CONSTANTS.CONTRIBUTION_LIMITS.rothIRA - retirement.rothIRA).toLocaleString()}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Health Savings Account (HSA)</Label>
                  <Input
                    type="number"
                    value={retirement.hsa}
                    onChange={(e) => handleRetirementChange('hsa', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Max: ${TAX_CONSTANTS.CONTRIBUTION_LIMITS.hsa.toLocaleString()} | 
                    Remaining: ${(TAX_CONSTANTS.CONTRIBUTION_LIMITS.hsa - retirement.hsa).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="mt-4 p-2 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-800">✅ Total Retirement Contribution</span>
                  <span className="text-sm font-bold text-blue-700">{formatCurrency(taxMetrics.preTaxRetirement)}</span>
                </div>
                <p className="text-xs text-blue-600 mt-1">🧠 Traditional contributions reduce taxable income, Roth does not.</p>
              </div>
            </CardContent>
          </Card>

          {/* Itemized Deductions */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Home className="w-5 h-5" />
                Itemized Deductions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    🏠 Mortgage Interest
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Interest paid on your primary residence mortgage (up to $750K loan limit)</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="number"
                    value={deductions.mortgageInterest}
                    onChange={(e) => handleDeductionChange('mortgageInterest', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">🏡 Property Taxes</Label>
                  <Input
                    type="number"
                    value={deductions.propertyTaxes}
                    onChange={(e) => handleDeductionChange('propertyTaxes', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">🏥 Health Insurance</Label>
                  <Input
                    type="number"
                    value={deductions.healthInsurance}
                    onChange={(e) => handleDeductionChange('healthInsurance', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">🎓 Student Loan Interest</Label>
                  <Input
                    type="number"
                    value={deductions.studentLoanInterest}
                    onChange={(e) => handleDeductionChange('studentLoanInterest', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                  <div className="text-xs text-gray-500 mt-1">Max limit: $2,500</div>
                </div>
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    💖 Charitable Donations
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Donations to qualified 501(c)(3) organizations. Keep receipts for documentation</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="number"
                    value={deductions.charitableDonations}
                    onChange={(e) => handleDeductionChange('charitableDonations', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    🌎 SALT (Capped at $10,000)
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>State and Local Tax deduction includes state income tax, property tax, and sales tax. Capped at $10,000</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="number"
                    value={deductions.saltDeduction}
                    onChange={(e) => handleDeductionChange('saltDeduction', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                  <div className="text-xs text-gray-500 mt-1">State & Local Tax deduction cap</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-orange-800">📌 Total Itemized Deductions</span>
                  <span className="text-lg font-bold text-orange-700">{formatCurrency(taxMetrics.itemizedDeductions)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-orange-700">(Standard Deduction: {formatCurrency(taxMetrics.standardDeduction)})</span>
                  <span className="text-sm font-medium text-orange-800">
                    {taxMetrics.usingItemized ? '✅ Using Itemized' : '📋 Using Standard'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tax Credits */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Target className="w-5 h-5" />
                Tax Credits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    👶 Child Tax Credit
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>$2,000 per qualifying child under 17. Phases out at higher incomes</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="number"
                    value={credits.childTaxCredit}
                    onChange={(e) => handleCreditChange('childTaxCredit', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                  <div className="text-xs text-gray-500 mt-1">Up to $2,000/child</div>
                </div>
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    🚗 EV Credit
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Up to $7,500 for qualifying electric vehicles. Subject to assembly and income requirements</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="number"
                    value={credits.evCredit}
                    onChange={(e) => handleCreditChange('evCredit', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                  <div className="text-xs text-gray-500 mt-1">Up to $7,500</div>
                </div>
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    📚 Education Credits
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>American Opportunity Credit ($2,500) or Lifetime Learning Credit ($2,000). Based on qualified education expenses</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="number"
                    value={credits.educationCredit}
                    onChange={(e) => handleCreditChange('educationCredit', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                  <div className="text-xs text-gray-500 mt-1">Based on eligibility</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel - 50% width */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Federal Tax Summary */}
            <Card className="border-0 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Calculator className="w-5 h-5" />
                  Federal Tax Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Total Income</span>
                    <span className="font-bold">{formatCurrency(taxMetrics.totalIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Adjusted Gross Income (AGI)</span>
                    <span className="font-bold">{formatCurrency(taxMetrics.adjustedGrossIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Taxable Income</span>
                    <span className="font-bold">{formatCurrency(taxMetrics.taxableIncome)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Federal Income Tax</span>
                      <span className="font-bold text-red-600">{formatCurrency(taxMetrics.federalTax)}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm font-medium">FICA Taxes</span>
                      <span className="font-bold text-red-600">{formatCurrency(taxMetrics.ficaTax)}</span>
                    </div>
                    <div className="text-xs text-gray-600 ml-4">
                      <div className="flex justify-between">
                        <span>👉 Social Security</span>
                        <span>{formatCurrency(taxMetrics.socialSecurityTax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>👉 Medicare</span>
                        <span>{formatCurrency(taxMetrics.medicareTax)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-2 bg-red-50 p-3 rounded-lg -mx-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-red-800">Total Federal Tax</span>
                      <span className="font-bold text-xl text-red-700">{formatCurrency(taxMetrics.totalTax)}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">💡 Effective Tax Rate</span>
                      <span className="font-bold text-blue-600">{taxMetrics.effectiveTaxRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">🔼 Marginal Tax Rate</span>
                      <span className="font-bold text-purple-600">{taxMetrics.marginalTaxRate.toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">💰 After-Tax Income</span>
                      <span className="font-bold text-green-600">{formatCurrency(taxMetrics.afterTaxIncome)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tax Breakdown Pie Chart */}
            <Card className="border-0 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-purple-800 text-lg">
                  <PieChart className="w-5 h-5" />
                  Tax Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Pie
                    data={{
                      labels: ['After-Tax Income', 'Federal Income Tax', 'Social Security', 'Medicare'],
                      datasets: [
                        {
                          data: [
                            taxMetrics.afterTaxIncome,
                            taxMetrics.federalTax,
                            taxMetrics.socialSecurityTax,
                            taxMetrics.medicareTax
                          ],
                          backgroundColor: [
                            '#10b981', // Green for after-tax income
                            '#ef4444', // Red for federal income tax
                            '#3b82f6', // Blue for social security
                            '#f59e0b'  // Orange for medicare
                          ],
                          borderWidth: 2,
                          borderColor: '#ffffff'
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            padding: 20,
                            font: {
                              size: 12
                            },
                            usePointStyle: true,
                            pointStyle: 'rect'
                          }
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              const label = context.label || '';
                              const value = context.raw as number;
                              const percentage = ((value / taxMetrics.totalIncome) * 100).toFixed(1);
                              return `${label}: ${formatCurrency(value)} (${percentage}%)`;
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Optimization Tips */}
            <Card className="border-0 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-green-800 text-lg">
                  <TrendingUp className="w-5 h-5" />
                  Optimization Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-white rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-1">✅ Smart Auto-Comparison</h4>
                    <p className="text-green-700">Standard vs Itemized deductions</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-1">📈 Instant Optimization</h4>
                    <p className="text-green-700">See how 401(k), IRA, and HSA affect your taxes</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-1">🔐 Retirement Ready</h4>
                    <p className="text-green-700">Estimate future tax liabilities</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-1">🧠 Filing Ready</h4>
                    <p className="text-green-700">Understand what goes into Form 1040</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-100 rounded-lg border border-blue-200">
                  <p className="text-xs font-semibold text-blue-800">📍 Complies with IRS 2025 thresholds</p>
                </div>
              </CardContent>
            </Card>

            {/* How to Use This Calculator */}
            <Card className="border-0 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-blue-800 text-base">
                  <Info className="w-4 h-4" />
                  How to Use This Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-sm">1️⃣</span>
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm">Enter Your Income</h4>
                      <p className="text-gray-600 text-xs">Add all income sources from your tax documents (W-2, 1099s, etc.)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm">2️⃣</span>
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm">Maximize Retirement Contributions</h4>
                      <p className="text-gray-600 text-xs">Traditional 401(k) and HSA contributions reduce current taxes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm">3️⃣</span>
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm">Add Deductions</h4>
                      <p className="text-gray-600 text-xs">Calculator automatically chooses standard vs itemized for maximum benefit</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm">4️⃣</span>
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm">Include Credits</h4>
                      <p className="text-gray-600 text-xs">Credits directly reduce your tax bill dollar-for-dollar</p>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
                    <p className="text-xs text-blue-800 font-medium">💡 Hover over help icons (?) for detailed explanations of each field</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>

        {/* Educational Content Section */}
        <div className="w-full mt-8 space-y-6">
          {/* The best tool for planning and calculating taxes in the US */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">The best US federal tax calculator for planning and calculating US income tax</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                With our comprehensive us federal income tax calculator, you can easily navigate the complicated U.S. tax system. Our us tax calculation tool helps you figure out how much you owe in federal taxes, get the most out of your deductions, and use tax-saving strategies for all income levels and filing situations, whether you're planning for the current tax year or making long-term plans.
              </p>
              <p className="text-sm text-gray-600">
                The tax brackets, standard deductions, and contribution limits for 2025 are all up to date in our us federal tax calculator. It also has advanced features for tax credits, itemized deductions, and contributions to retirement accounts. Get accurate us income tax estimates and planning scenarios so you can make smart decisions about your financial planning.
              </p>
            </div>
          </section>

          {/* How to Use This Tax Tool */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Use This Tax Tool</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Choosing Your Filing Status for US Income Tax</h4>
                <p className="text-sm text-gray-600">
                  Be careful when you choose your filing status because it will change your tax brackets, standard deduction amounts, and whether or not you can get certain credits. This us federal tax calculator provides different limits for people who file alone and people who are married. People who are taking care of dependents or are single parents can benefit from Head of Household status for their us tax calculation.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Income Entry for Federal Tax Calculation</h4>
                <p className="text-sm text-gray-600">
                  You should list all of your sources of income, like W-2 wages, money you make from being self-employed, rental properties, capital gains, interest, and dividends. There may be different ways to tax different kinds of income in this us federal income tax calculator. For example, long-term capital gains are taxed at lower rates, while income from self-employment is taxed at higher FICA rates.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">How to Take Off</h4>
                <p className="text-sm text-gray-600">
                  Check out the differences between taking the standard deduction and itemizing your deductions. The standard deduction for people who file alone in 2025 is $15,000. For people who file with their spouse, it is $30,000. You need to write down all of your deductions if they are more than the standard amount. These can be things like mortgage interest, state taxes (up to $10,000), and gifts to charities.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">What Tax Credits Do</h4>
                <p className="text-sm text-gray-600">
                  Tax credits are better than deductions because they cut your tax bill by a dollar for every dollar you owe. Include credits for kids, school costs, money you make, and energy-saving home improvements. Some credits are refundable, which means you can get the extra money back even if it is more than what you owe in taxes.
                </p>
              </div>
            </div>
          </section>

          {/* How to Make Sense of Your Tax Calculation Results */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Make Sense of Your Tax Calculation Results</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">The difference between the marginal tax rate and the effective tax rate</h4>
                <p className="text-sm text-gray-600">
                  Your marginal tax rate is the amount of taxes you pay on your last dollar of income. The effective tax rate is the amount of taxes you pay divided by your total income. The U.S. has a progressive tax system, which means that the more money you make, the higher your tax rates will be. But this only applies to income that falls within each bracket.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">AGI and Taxable Income</h4>
                <p className="text-sm text-gray-600">
                  Your Adjusted Gross Income (AGI) is the amount of money you make after taking out certain deductions, like money you put into a retirement account or a health savings account. Your taxable income is your AGI minus the standard or itemized deduction. A lot of tax breaks go away when your AGI goes up.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">FICA taxes</h4>
                <p className="text-sm text-gray-600">
                  The Federal Insurance Contributions Act (FICA) taxes pay for Medicare (1.45% on all income, plus an extra 0.9% for high earners) and Social Security (6.2% up to the wage cap). People who work for themselves pay both the employee and employer parts, which come to 15.3%.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Every three months, payments</h4>
                <p className="text-sm text-gray-600">
                  If you owe more than $1,000 in taxes and don't have enough withheld, you may need to make quarterly estimated payments to avoid penalties. This is often the case for people who are self-employed, retired people who make a lot of money from investments, or people who have more than one job.
                </p>
              </div>
            </div>
          </section>

          {/* How to Plan Your Taxes Smartly */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Plan Your Taxes Smartly</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Putting money into retirement</h4>
                <p className="text-sm text-gray-600">
                  Make the most of your 401(k) and IRA contributions to lower your taxes this year. In 2025, the most you can put into a 401(k) is $23,500, and the most you can put into an IRA is $7,000. You can now take traditional contributions off your taxes, but you'll have to pay taxes on them when you retire. Roth contributions, on the other hand, use money that has already been taxed and grow without being taxed.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Health Savings Accounts (HSAs)</h4>
                <p className="text-sm text-gray-600">
                  There are three tax benefits to Health Savings Accounts (HSAs): you can deduct your contributions from your taxes, the money grows tax-free, and you can take money out for medical expenses without paying taxes. For 2025, the maximum amounts are $4,300 for individuals and $8,550 for families. You can use HSAs for things other than medical expenses after you turn 65, just like you can with regular IRAs.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Tax-Loss Harvesting</h4>
                <p className="text-sm text-gray-600">
                  Use capital losses to cancel out capital gains to lower your taxable income. You can take off up to $3,000 in net capital losses each year. You can carry over any losses over that amount to the next year. Be aware of wash-sale rules if you buy back the same investments within 30 days.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Donating to a good cause</h4>
                <p className="text-sm text-gray-600">
                  Instead of cash, give away things that have gone up in value to avoid paying capital gains taxes. You will still be able to deduct the asset's fair market value in full. If you want to go over the standard deduction limit, you could give a lot of money to charity every other year.
                </p>
              </div>
            </div>
          </section>

          {/* Changes and updates to taxes that are important in 2025 */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Changes and updates to taxes that are important in 2025</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Increasing the Standard Deduction</h4>
                <p className="text-sm text-gray-600">
                  The standard deduction for 2025 went up to $15,000 for single filers and $30,000 for married couples filing together because of changes in inflation. This means that fewer people who pay taxes will be able to use itemized deductions.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Limits on Plans for Retirement</h4>
                <p className="text-sm text-gray-600">
                  The most you can put into a 401(k) in 2025 is $23,500. If you're 50 or older, you can put in an extra $7,500. You can still put $7,000 into an IRA, plus an extra $1,000 for catch-up contributions. An individual can put up to $4,300 into an HSA, and a family can put up to $8,550.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Changes to Tax Rates</h4>
                <p className="text-sm text-gray-600">
                  Tax brackets change every year to keep up with the cost of living. The rates are still the same (10%, 12%, 22%, 24%, 32%, 35%, and 37%), but the amount of money you can make in each bracket has gone up. This could lower the amount of tax you pay on the same amount of money.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">SALT Deduction Limit</h4>
                <p className="text-sm text-gray-600">
                  The SALT deduction for state and local taxes will stay at $10,000 until 2025. This has a big impact on people who live in states with high taxes. If the cap has a big effect on you, you might want to think about how to deal with it, like moving to a state with lower taxes or paying your property taxes at certain times.
                </p>
              </div>
            </div>
          </section>

          {/* Big Tax Credits and Who Can Get Them */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Big Tax Credits and Who Can Get Them</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-2">Refundable Credits (Can Lead to Refunds):</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <strong>The Earned Income Tax Credit:</strong> gives families with three or more kids up to $7,430, but they lose it at higher incomes.</li>
                  <li>• <strong>Child Tax Credit:</strong> For each qualifying child under 17, you can get up to $2,000 back in taxes.</li>
                  <li>• <strong>American Opportunity Credit:</strong> You can get back up to $2,500 for eligible school costs.</li>
                  <li>• <strong>Tax Credit for Premiums:</strong> For health insurance bought through marketplaces, there are income-based benefits.</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-blue-700 mb-2">Non-Refundable Credits that only lower the amount of tax owed:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <strong>Credit for Child and Dependent Care:</strong> 20–35% of up to $3,000 in child care costs for each dependent</li>
                  <li>• <strong>Lifetime Learning Credit:</strong> You can get up to $2,000 a year to help pay for school costs that qualify.</li>
                  <li>• <strong>Residential Energy Credits:</strong> can help pay for 30% of the cost of solar, geothermal, and other renewable energy systems.</li>
                  <li>• <strong>Retirement Savings Credit:</strong> Taxpayers with low incomes who put money into retirement accounts can get up to $1,000.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tax Planning Benefits and Considerations */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tax Planning Benefits and Considerations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Benefits Section */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <h4 className="text-xl font-bold text-green-800">Benefits</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-green-700">✓ Maximize deductions to reduce taxable income and save money</p>
                  <p className="text-sm text-green-700">✓ Better financial planning and retirement contribution optimization</p>
                  <p className="text-sm text-green-700">✓ Avoid underpayment penalties with accurate calculations</p>
                  <p className="text-sm text-green-700">✓ Strategic timing of income and deductions</p>
                  <p className="text-sm text-green-700">✓ Take advantage of available tax credits</p>
                  <p className="text-sm text-green-700">✓ Plan for future tax liabilities and savings</p>
                </div>
              </div>

              {/* Considerations Section */}
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✗</span>
                  </div>
                  <h4 className="text-xl font-bold text-red-800">Considerations</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-red-700">✗ Complex tax laws that change frequently</p>
                  <p className="text-sm text-red-700">✗ Time-consuming record-keeping and planning required</p>
                  <p className="text-sm text-red-700">✗ Professional fees for complex tax situations</p>
                  <p className="text-sm text-red-700">✗ Risk of errors without proper knowledge</p>
                  <p className="text-sm text-red-700">✗ Penalties for mistakes or missed deadlines</p>
                  <p className="text-sm text-red-700">✗ State and local tax variations add complexity</p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Use a Tax Calculator */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use a Tax Calculator?</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Financial Planning</h4>
                <p className="text-sm text-gray-600">
                  Estimate your tax liability and plan your finances accordingly for the year ahead.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Goal Setting</h4>
                <p className="text-sm text-gray-600">
                  Set realistic tax-saving goals and retirement contribution targets.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Smart Decisions</h4>
                <p className="text-sm text-gray-600">
                  Make informed choices about deductions and tax strategies.
                </p>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm font-medium text-left">
                    What is the standard deduction for 2025?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    The standard deduction for 2025 is $15,000 for single filers, $30,000 for married filing jointly, and $22,500 for head of household. These amounts are adjusted annually for inflation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-sm font-medium text-left">
                    How accurate are tax calculator projections?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Our calculations use current IRS tax brackets and rules for highly accurate estimates. Results may vary based on specific circumstances, complex deductions, or tax law changes during the year.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-sm font-medium text-left">
                    Should I itemize or take the standard deduction?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Itemize if your total deductions exceed the standard deduction. Common itemized deductions include mortgage interest, state/local taxes (up to $10,000), and charitable contributions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-sm font-medium text-left">
                    When should I start tax planning for next year?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Start tax planning early in the year to maximize deductions and retirement contributions. Key dates include IRA contribution deadlines and quarterly estimated payment dates.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* Final Call to Action */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-white mb-2">Complete your US federal tax calculation for 2025 now</h3>
            <p className="text-blue-100 text-sm mb-4">
              Our complete us federal income tax calculator will help you manage your tax plan. Plan ahead, take full advantage of your deductions, and lower your us income tax bill legally and effectively.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Calculate Your US Federal Tax Now
            </Button>
          </section>
          
          {/* Tax Calculator Tags */}
          <section className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Related Topics</h4>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#USIncomeTax</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TaxSeason</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TaxPreparation</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TaxDeductions</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TaxAdvice</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TaxPlanning</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TaxTips</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#IRS</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#FileYourTaxes</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TaxReturn</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TaxLaw</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#IncomeTax</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#PersonalFinance</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#FinancialLiteracy</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TaxRefund</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#MoneyMatters</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TaxEducation</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TaxFiling</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#WealthBuilding</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#FinanceGuru</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#USTaxCalculation</span>
              </div>
            </div>
          </section>
        </div>
      </div>
      </div>
    </TooltipProvider>
    </>
  );
};

export default TaxCalculatorUSA;
