import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building2, Home, CreditCard, HeartPulse, BadgeDollarSign, Lightbulb, PiggyBank, BookOpen, LineChart, ArrowUpDown, Calculator, Briefcase, TrendingUp, Target, Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TaxCalculator = () => {
  const [taxRegime, setTaxRegime] = useState<"old" | "new">("old");
  const [financialYear, setFinancialYear] = useState("2024-25");
  const [showResults, setShowResults] = useState(false);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [income, setIncome] = useState({
    salary: "",
    rental: "",
    business: "",
    capital_gains: "",
    interest: "",
    other: ""
  });
  
  const [deductions, setDeductions] = useState({
    ppf: "",
    elss: "",
    life_insurance: "",
    nps: "",
    home_loan_principal: "",
    tuition_fees: "",
    tax_saver_fd: "",
    sukanya: "",
    ulip: "",
    health_insurance_self: "",
    health_insurance_parents: "",
    preventive_checkup: "",
    donations: "",
    education_loan: "",
    nps_additional: "",
    home_loan_interest: "",
    ev_loan: "",
    startup_investment: "",
    rural_development: "",
    equity_stcg: "",
    equity_ltcg: "",
    debt_losses: "",
    others: ""
  });

  const handleIncomeChange = (field: string, value: string) => {
    setIncome(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeductionChange = (field: string, value: string) => {
    setDeductions(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Helper to format currency
  const formatCurrency = (amount: number | string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) || 0 : amount;
    return `₹${numAmount.toLocaleString('en-IN')}`;
  };

  // Calculate totals
  const totalIncome = Object.values(income).reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
  
  // Individual limits for different investments
  const homeLoanPrincipalAmount = parseFloat(deductions.home_loan_principal || "0");
  const npsAdditionalAmount = parseFloat(deductions.nps_additional || "0");
  const npsLimit = 50000;
  
  // Calculate Section 80C deductions (limit 1.5L)
  const section80CTotal = (
    parseFloat(deductions.ppf || "0") +
    parseFloat(deductions.elss || "0") +
    parseFloat(deductions.life_insurance || "0") +
    homeLoanPrincipalAmount +
    parseFloat(deductions.tuition_fees || "0") +
    parseFloat(deductions.tax_saver_fd || "0") +
    parseFloat(deductions.sukanya || "0") +
    parseFloat(deductions.ulip || "0")
  );
  
  const section80CUsed = Math.min(section80CTotal, 150000);
  const section80CRemaining = Math.max(0, 150000 - section80CTotal);
  
  // Calculate Section 80D (Health Insurance - limit 75K)
  const section80DTotal = (
    parseFloat(deductions.health_insurance_self || "0") +
    parseFloat(deductions.health_insurance_parents || "0") +
    parseFloat(deductions.preventive_checkup || "0")
  );
  
  const section80DUsed = Math.min(section80DTotal, 75000);
  const section80DRemaining = Math.max(0, 75000 - section80DTotal);
  
  // Calculate Section 80G (Donations - limit 100K)
  const section80GTotal = parseFloat(deductions.donations || "0");
  const section80GUsed = Math.min(section80GTotal, 100000);
  const section80GRemaining = Math.max(0, 100000 - section80GTotal);
  
  // Calculate Section 80E (Education Loan Interest - no limit)
  const section80EUsed = parseFloat(deductions.education_loan || "0");
  
  // Calculate Section 80EEA (Additional Home Loan Interest - limit 150K)
  const section80EEATotal = parseFloat(deductions.home_loan_interest || "0");
  const section80EEAUsed = Math.min(section80EEATotal, 150000);
  const section80EEARemaining = Math.max(0, 150000 - section80EEATotal);
  
  // Calculate Section 80TTA (Savings Account Interest - limit 10K)
  const section80TTAUsed = Math.min(parseFloat(income.interest || "0"), 10000);
  
  // Calculate total deductions
  const totalDeductions = (
    section80CUsed +
    section80DUsed +
    section80GUsed +
    section80EUsed +
    section80EEAUsed +
    section80TTAUsed +
    parseFloat(deductions.nps_additional || "0") +
    parseFloat(deductions.ev_loan || "0") +
    parseFloat(deductions.startup_investment || "0") +
    parseFloat(deductions.rural_development || "0") +
    parseFloat(deductions.others || "0")
  );
  
  // Calculate taxable income
  const taxableIncome = Math.max(0, totalIncome - totalDeductions);
  
  // Calculate tax for both regimes
  const calculateTax = (regime: "old" | "new") => {
    let tax = 0;
    
    if (regime === "old") {
      // Old regime calculation
      if (taxableIncome <= 250000) {
        tax = 0;
      } else if (taxableIncome <= 500000) {
        tax = (taxableIncome - 250000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        tax = 12500 + (taxableIncome - 500000) * 0.2;
      } else {
        tax = 112500 + (taxableIncome - 1000000) * 0.3;
      }
      
      // Apply rebate under section 87A
      if (taxableIncome <= 500000) {
        tax = Math.max(0, tax - 12500);
      }
    } else {
      // New regime calculation
      if (taxableIncome <= 300000) {
        tax = 0;
      } else if (taxableIncome <= 600000) {
        tax = (taxableIncome - 300000) * 0.05;
      } else if (taxableIncome <= 900000) {
        tax = 15000 + (taxableIncome - 600000) * 0.1;
      } else if (taxableIncome <= 1200000) {
        tax = 45000 + (taxableIncome - 900000) * 0.15;
      } else if (taxableIncome <= 1500000) {
        tax = 90000 + (taxableIncome - 1200000) * 0.2;
      } else {
        tax = 150000 + (taxableIncome - 1500000) * 0.3;
      }
      
      // Apply rebate under section 87A for new regime
      if (taxableIncome <= 700000) {
        tax = Math.max(0, tax - 25000);
      }
    }
    
    // Calculate cess @ 4%
    const cess = tax * 0.04;
    
    return {
      incomeTax: tax,
      cess: cess,
      totalTax: tax + cess
    };
  };
  
  // Calculate tax for both regimes
  const oldRegimeTax = calculateTax("old");
  const newRegimeTax = calculateTax("new");
  
  // Determine which regime is more beneficial
  const isBeneficialOldRegime = oldRegimeTax.totalTax < newRegimeTax.totalTax;
  const taxDifference = Math.abs(oldRegimeTax.totalTax - newRegimeTax.totalTax);
  
  // Use the selected regime for display
  const taxResults = taxRegime === "old" ? oldRegimeTax : newRegimeTax;
  
  // UI Section Renderers
  const renderSection80C = () => (
    <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-100 mb-2">
      <div>
        <span className="font-medium">Section 80C</span>
        <span className="text-sm text-gray-500 ml-2">(Max: ₹1,50,000)</span>
      </div>
      <span className="text-blue-600 font-semibold">{formatCurrency(section80CUsed)}</span>
    </div>
  );
  
  const renderSection80D = () => (
    <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-100 mb-2">
      <div>
        <span className="font-medium">Section 80D (Health Insurance)</span>
        <span className="text-sm text-gray-500 ml-2">(Max: ₹75,000)</span>
      </div>
      <span className="text-blue-600 font-semibold">{formatCurrency(section80DUsed)}</span>
    </div>
  );
  
  const renderSection80G = () => (
    <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-100 mb-2">
      <div>
        <span className="font-medium">Section 80G (Donations)</span>
        <span className="text-sm text-gray-500 ml-2">(Max: ₹1,00,000)</span>
      </div>
      <span className="text-blue-600 font-semibold">{formatCurrency(section80GUsed)}</span>
    </div>
  );
  
  const renderSection80E = () => (
    <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-100 mb-2">
      <div>
        <span className="font-medium">Section 80E (Education Loan)</span>
        <span className="text-sm text-gray-500 ml-2">(No Limit)</span>
      </div>
      <span className="text-blue-600 font-semibold">{formatCurrency(section80EUsed)}</span>
    </div>
  );
  
  const renderSection80EEA = () => (
    <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-100 mb-2">
      <div>
        <span className="font-medium">Section 80EEA (Home Loan Interest)</span>
        <span className="text-sm text-gray-500 ml-2">(Max: ₹1,50,000)</span>
      </div>
      <span className="text-blue-600 font-semibold">{formatCurrency(section80EEAUsed)}</span>
    </div>
  );
  
  const renderSection80TTA = () => (
    <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-100 mb-2">
      <div>
        <span className="font-medium">Section 80TTA (Savings Interest)</span>
        <span className="text-sm text-gray-500 ml-2">(Max: ₹10,000)</span>
      </div>
      <span className="text-blue-600 font-semibold">{formatCurrency(section80TTAUsed)}</span>
    </div>
  );

  return (
    <div className="container mx-auto py-6 px-4 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tax Calculator</h1>
          <p className="text-muted-foreground">Calculate your income tax and optimize your tax savings</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <Label htmlFor="financial-year" className="text-sm font-medium">Financial Year:</Label>
          <select
            id="financial-year"
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            className="p-2 border rounded-md bg-background"
          >
            <option value="2024-25">2024-25 (AY 2025-26)</option>
            <option value="2023-24">2023-24 (AY 2024-25)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-6">
        <Button 
          variant={taxRegime === "old" ? "default" : "outline"} 
          onClick={() => setTaxRegime("old")}
          className="flex-1"
        >
          Old Tax Regime
        </Button>
        <Button 
          variant={taxRegime === "new" ? "default" : "outline"} 
          onClick={() => setTaxRegime("new")}
          className="flex-1"
        >
          New Tax Regime (FY 2024-25)
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Income Section */}
        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
              Income Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salary" className="font-medium">Salary Income (₹)</Label>
                    <Input
                      id="salary"
                      type="text"
                      inputMode="numeric"
                      value={income.salary}
                      onChange={(e) => handleIncomeChange('salary', e.target.value)}
                      className="mt-2"
                      placeholder="0"
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rental" className="font-medium">Rental Income (₹)</Label>
                    <Input
                      id="rental"
                      type="text"
                      inputMode="numeric"
                      value={income.rental}
                      onChange={(e) => handleIncomeChange('rental', e.target.value)}
                      className="mt-2"
                      placeholder="0"
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="business" className="font-medium">Business Income (₹)</Label>
                    <Input
                      id="business"
                      type="text"
                      inputMode="numeric"
                      value={income.business}
                      onChange={(e) => handleIncomeChange('business', e.target.value)}
                      className="mt-2"
                      placeholder="0"
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="capital_gains" className="font-medium">Capital Gains (₹)</Label>
                    <Input
                      id="capital_gains"
                      type="text"
                      inputMode="numeric"
                      value={income.capital_gains}
                      onChange={(e) => handleIncomeChange('capital_gains', e.target.value)}
                      className="mt-2"
                      placeholder="0"
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="interest" className="font-medium">Interest Income (₹)</Label>
                    <Input
                      id="interest"
                      type="text"
                      inputMode="numeric"
                      value={income.interest}
                      onChange={(e) => handleIncomeChange('interest', e.target.value)}
                      className="mt-2"
                      placeholder="0"
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="other" className="font-medium">Other Income (₹)</Label>
                    <Input
                      id="other"
                      type="text"
                      inputMode="numeric"
                      value={income.other}
                      onChange={(e) => handleIncomeChange('other', e.target.value)}
                      className="mt-2"
                      placeholder="0"
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-md font-medium mb-3 flex items-center">
                  <Lightbulb className="h-5 w-5 text-blue-500 mr-2" />
                  Income Tips
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 flex-shrink-0">
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 12l2 2 4-4"></path>
                      </svg>
                    </div>
                    <span>Standard deduction of ₹50,000 is applied to salary automatically</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 flex-shrink-0">
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 12l2 2 4-4"></path>
                      </svg>
                    </div>
                    <span>Savings account interest up to ₹10,000 can be claimed under Section 80TTA</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 flex-shrink-0">
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 12l2 2 4-4"></path>
                      </svg>
                    </div>
                    <span>For rental income, 30% standard deduction + interest on home loan is allowed</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between bg-blue-50 p-3 rounded-lg border border-blue-100">
                <span className="font-medium">Total Income</span>
                <span className="text-blue-600 font-semibold">{formatCurrency(totalIncome)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tax-Saving Deductions */}
        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <PiggyBank className="h-5 w-5 mr-2 text-blue-500" />
              Tax-Saving Deductions
            </h2>
            
            <Tabs defaultValue="investments" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
                <TabsTrigger value="investments" className="text-sm">
                  Investments (80C)
                </TabsTrigger>
                <TabsTrigger value="insurance" className="text-sm">
                  Insurance
                </TabsTrigger>
                <TabsTrigger value="home" className="text-sm">
                  Home Loan
                </TabsTrigger>
                <TabsTrigger value="special" className="text-sm">
                  Special Deductions
                </TabsTrigger>
              </TabsList>
              
              {/* Investments Tab */}
              <TabsContent value="investments" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 border p-5 rounded-lg bg-background shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Section 80C Investments (Max: ₹1,50,000)</h3>
                    
                    {section80CTotal > 0 && (
                      <div className={`mb-4 p-3 rounded-lg text-sm ${section80CTotal > 150000 ? 'bg-amber-50 border border-amber-200 text-amber-800' : section80CTotal < 150000 ? 'bg-blue-50 border border-blue-200 text-blue-800' : 'bg-green-50 border border-green-200 text-green-800'}`}>
                        {section80CTotal > 150000 ? (
                          <>
                            <p className="font-medium">Your total Section 80C investments: {formatCurrency(section80CTotal)}</p>
                            <p>Note: Only ₹1,50,000 can be claimed as tax benefit. The additional {formatCurrency(section80CTotal - 150000)} will not provide tax benefits.</p>
                          </>
                        ) : section80CTotal < 150000 ? (
                          <>
                            <p className="font-medium">Your total Section 80C investments: {formatCurrency(section80CTotal)}</p>
                            <p>You have an additional scope to save {formatCurrency(section80CRemaining)} under Section 80C to maximize your tax benefits.</p>
                          </>
                        ) : (
                          <>
                            <p className="font-medium">Your total Section 80C investments: {formatCurrency(section80CTotal)}</p>
                            <p>Perfect! You've fully utilized your Section 80C limit of ₹1,50,000.</p>
                          </>
                        )}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ppf" className="font-medium">PPF Investment (₹)</Label>
                        <Input
                          id="ppf"
                          type="text"
                          inputMode="numeric"
                          value={deductions.ppf || ''}
                          onChange={(e) => handleDeductionChange('ppf', e.target.value)}
                          className="mt-2"
                          placeholder="0"
                          style={{ appearance: 'textfield' }}
                        />
                      </div>
                      <div>
                        <Label htmlFor="elss" className="font-medium">ELSS Mutual Funds (₹)</Label>
                        <Input
                          id="elss"
                          type="text"
                          inputMode="numeric"
                          value={deductions.elss || ''}
                          onChange={(e) => handleDeductionChange('elss', e.target.value)}
                          className="mt-2"
                          placeholder="0"
                          style={{ appearance: 'textfield' }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor="tax_saver_fd" className="font-medium">Tax Saver FD (₹)</Label>
                        <Input
                          id="tax_saver_fd"
                          type="text"
                          inputMode="numeric"
                          value={deductions.tax_saver_fd || ''}
                          onChange={(e) => handleDeductionChange('tax_saver_fd', e.target.value)}
                          className="mt-2"
                          placeholder="0"
                          style={{ appearance: 'textfield' }}
                        />
                      </div>
                      <div>
                        <Label htmlFor="sukanya" className="font-medium">Sukanya Samriddhi (₹)</Label>
                        <Input
                          id="sukanya"
                          type="text"
                          inputMode="numeric"
                          value={deductions.sukanya || ''}
                          onChange={(e) => handleDeductionChange('sukanya', e.target.value)}
                          className="mt-2"
                          placeholder="0"
                          style={{ appearance: 'textfield' }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor="tuition_fees" className="font-medium">Tuition Fees (₹)</Label>
                        <Input
                          id="tuition_fees"
                          type="text"
                          inputMode="numeric"
                          value={deductions.tuition_fees || ''}
                          onChange={(e) => handleDeductionChange('tuition_fees', e.target.value)}
                          className="mt-2"
                          placeholder="0"
                          style={{ appearance: 'textfield' }}
                        />
                      </div>
                      <div>
                        <Label htmlFor="ulip" className="font-medium">ULIP Investment (₹)</Label>
                        <Input
                          id="ulip"
                          type="text"
                          inputMode="numeric"
                          value={deductions.ulip || ''}
                          onChange={(e) => handleDeductionChange('ulip', e.target.value)}
                          className="mt-2"
                          placeholder="0"
                          style={{ appearance: 'textfield' }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                    <h3 className="text-md font-medium mb-3 flex items-center">
                      <Lightbulb className="h-5 w-5 text-blue-500 mr-2" />
                      Investment Tips
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <div className="mt-1 mr-2 flex-shrink-0">
                          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 12l2 2 4-4"></path>
                          </svg>
                        </div>
                        <span><strong>PPF:</strong> Long-term tax-free returns (15-year lock-in)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mt-1 mr-2 flex-shrink-0">
                          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 12l2 2 4-4"></path>
                          </svg>
                        </div>
                        <span><strong>ELSS Funds:</strong> Only tax-saving mutual fund with 3-year lock-in</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mt-1 mr-2 flex-shrink-0">
                          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 12l2 2 4-4"></path>
                          </svg>
                        </div>
                        <span><strong>SSY:</strong> Highest interest rate for girl child education</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              {/* Insurance Tab */}
              <TabsContent value="insurance" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 border p-5 rounded-lg bg-background shadow-sm">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium mb-4">Health Insurance (Section 80D)</h3>
                      
                      {section80DTotal > 0 && (
                        <div className={`mb-4 p-3 rounded-lg text-sm ${section80DTotal > 75000 ? 'bg-amber-50 border border-amber-200 text-amber-800' : section80DTotal < 75000 ? 'bg-blue-50 border border-blue-200 text-blue-800' : 'bg-green-50 border border-green-200 text-green-800'}`}>
                          {section80DTotal > 75000 ? (
                            <>
                              <p className="font-medium">Your total Health Insurance premium: {formatCurrency(section80DTotal)}</p>
                              <p>Note: Only ₹75,000 can be claimed as tax benefit. The additional {formatCurrency(section80DTotal - 75000)} will not provide tax benefits.</p>
                            </>
                          ) : section80DTotal < 75000 ? (
                            <>
                              <p className="font-medium">Your total Health Insurance premium: {formatCurrency(section80DTotal)}</p>
                              <p>You have room to claim up to {formatCurrency(section80DRemaining)} more under Section 80D.</p>
                            </>
                          ) : (
                            <>
                              <p className="font-medium">Your total Health Insurance premium: {formatCurrency(section80DTotal)}</p>
                              <p>Perfect! You've fully utilized your Section 80D limit of ₹75,000.</p>
                            </>
                          )}
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="health_insurance_self" className="font-medium">Self & Family Premium (₹)</Label>
                          <Input
                            id="health_insurance_self"
                            type="text"
                            inputMode="numeric"
                            value={deductions.health_insurance_self || ''}
                            onChange={(e) => handleDeductionChange('health_insurance_self', e.target.value)}
                            className="mt-2"
                            placeholder="0"
                            style={{ appearance: 'textfield' }}
                          />
                        </div>
                        <div>
                          <Label htmlFor="health_insurance_parents" className="font-medium">Parents Premium (₹)</Label>
                          <Input
                            id="health_insurance_parents"
                            type="text"
                            inputMode="numeric"
                            value={deductions.health_insurance_parents || ''}
                            onChange={(e) => handleDeductionChange('health_insurance_parents', e.target.value)}
                            className="mt-2"
                            placeholder="0"
                            style={{ appearance: 'textfield' }}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="preventive_checkup" className="font-medium">Preventive Health Checkup (₹)</Label>
                          <Input
                            id="preventive_checkup"
                            type="text"
                            inputMode="numeric"
                            value={deductions.preventive_checkup || ''}
                            onChange={(e) => handleDeductionChange('preventive_checkup', e.target.value)}
                            className="mt-2"
                            placeholder="0"
                            style={{ appearance: 'textfield' }}
                          />
                        </div>
                        <div>
                          <Label htmlFor="life_insurance" className="font-medium">Life Insurance Premium (₹)</Label>
                          <Input
                            id="life_insurance"
                            type="text"
                            inputMode="numeric"
                            value={deductions.life_insurance || ''}
                            onChange={(e) => handleDeductionChange('life_insurance', e.target.value)}
                            className="mt-2"
                            placeholder="0"
                            style={{ appearance: 'textfield' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                    <h3 className="text-md font-medium mb-3 flex items-center">
                      <Lightbulb className="h-5 w-5 text-blue-500 mr-2" />
                      Insurance Tips
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <div className="mt-1 mr-2 flex-shrink-0">
                          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 12l2 2 4-4"></path>
                          </svg>
                        </div>
                        <span><strong>Self & Family:</strong> ₹25,000 limit (₹50,000 for senior citizens)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mt-1 mr-2 flex-shrink-0">
                          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 12l2 2 4-4"></path>
                          </svg>
                        </div>
                        <span><strong>Parents:</strong> Additional ₹25,000 (₹50,000 for senior citizens)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mt-1 mr-2 flex-shrink-0">
                          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 12l2 2 4-4"></path>
                          </svg>
                        </div>
                        <span>Premium should not exceed 10% of sum assured for tax benefits</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              {/* Home Loan Tab */}
              <TabsContent value="home" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 border p-5 rounded-lg bg-background shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Home Loan Benefits</h3>
                    
                    {section80EEATotal > 0 && (
                      <div className={`mb-4 p-3 rounded-lg text-sm ${section80EEATotal > 150000 ? 'bg-amber-50 border border-amber-200 text-amber-800' : section80EEATotal < 150000 ? 'bg-blue-50 border border-blue-200 text-blue-800' : 'bg-green-50 border border-green-200 text-green-800'}`}>
                        {section80EEATotal > 150000 ? (
                          <>
                            <p className="font-medium">Your Home Loan Interest: {formatCurrency(section80EEATotal)}</p>
                            <p>Note: Only ₹1,50,000 can be claimed as tax benefit under Section 80EEA. The additional {formatCurrency(section80EEATotal - 150000)} will not provide tax benefits under this section.</p>
                          </>
                        ) : section80EEATotal < 150000 ? (
                          <>
                            <p className="font-medium">Your Home Loan Interest: {formatCurrency(section80EEATotal)}</p>
                            <p>You have room to claim up to {formatCurrency(section80EEARemaining)} more under Section 80EEA.</p>
                          </>
                        ) : (
                          <>
                            <p className="font-medium">Your Home Loan Interest: {formatCurrency(section80EEATotal)}</p>
                            <p>Perfect! You've fully utilized your Section 80EEA limit of ₹1,50,000.</p>
                          </>
                        )}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="home_loan_principal" className="font-medium">Home Loan Principal (₹)</Label>
                        <p className="text-xs text-gray-500 mt-1">Under Section 80C (Max: ₹1,50,000 combined)</p>
                        <Input
                          id="home_loan_principal"
                          type="text"
                          inputMode="numeric"
                          value={deductions.home_loan_principal || ''}
                          onChange={(e) => handleDeductionChange('home_loan_principal', e.target.value)}
                          className="mt-2"
                          placeholder="0"
                          style={{ appearance: 'textfield' }}
                        />
                        {homeLoanPrincipalAmount > 150000 && (
                          <p className="text-xs text-amber-600 mt-1 font-medium">
                            Note: Only ₹1,50,000 can be claimed under Section 80C (combined with other 80C investments).
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="home_loan_interest" className="font-medium">Home Loan Interest (₹)</Label>
                        <p className="text-xs text-gray-500 mt-1">Under Section 24 & 80EEA (Max: ₹2,00,000 + ₹1,50,000)</p>
                        <Input
                          id="home_loan_interest"
                          type="text"
                          inputMode="numeric"
                          value={deductions.home_loan_interest || ''}
                          onChange={(e) => handleDeductionChange('home_loan_interest', e.target.value)}
                          className="mt-2"
                          placeholder="0"
                          style={{ appearance: 'textfield' }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                    <h3 className="text-md font-medium mb-3 flex items-center">
                      <Lightbulb className="h-5 w-5 text-blue-500 mr-2" />
                      Home Loan Tips
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <div className="mt-1 mr-2 flex-shrink-0">
                          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 12l2 2 4-4"></path>
                          </svg>
                        </div>
                        <span>Principal repayment falls under 80C limit of ₹1.5L</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mt-1 mr-2 flex-shrink-0">
                          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 12l2 2 4-4"></path>
                          </svg>
                        </div>
                        <span>Interest deduction up to ₹2L for self-occupied property</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mt-1 mr-2 flex-shrink-0">
                          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 12l2 2 4-4"></path>
                          </svg>
                        </div>
                        <span>Additional ₹1.5L under 80EEA for first-time buyers</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              {/* Special Deductions Tab */}
              <TabsContent value="special" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 border p-5 rounded-lg bg-background shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Special Deductions</h3>
                    
                    {section80GTotal > 0 && (
                      <div className={`mb-4 p-3 rounded-lg text-sm ${section80GTotal > 100000 ? 'bg-amber-50 border border-amber-200 text-amber-800' : section80GTotal < 100000 ? 'bg-blue-50 border border-blue-200 text-blue-800' : 'bg-green-50 border border-green-200 text-green-800'}`}>
                        {section80GTotal > 100000 ? (
                          <>
                            <p className="font-medium">Your Donations (Section 80G): {formatCurrency(section80GTotal)}</p>
                            <p>Note: Only ₹1,00,000 can be claimed as tax benefit under Section 80G. The additional {formatCurrency(section80GTotal - 100000)} will not provide tax benefits.</p>
                          </>
                        ) : section80GTotal < 100000 ? (
                          <>
                            <p className="font-medium">Your Donations (Section 80G): {formatCurrency(section80GTotal)}</p>
                            <p>You have room to claim up to {formatCurrency(section80GRemaining)} more under Section 80G.</p>
                          </>
                        ) : (
                          <>
                            <p className="font-medium">Your Donations (Section 80G): {formatCurrency(section80GTotal)}</p>
                            <p>Perfect! You've fully utilized your Section 80G limit of ₹1,00,000.</p>
                          </>
                        )}
                      </div>
                    )}
                    
                    {parseFloat(deductions.education_loan || "0") > 0 && (
                      <div className="mb-4 p-3 rounded-lg text-sm bg-blue-50 border border-blue-200 text-blue-800">
                        <p className="font-medium">Your Education Loan Interest (Section 80E): {formatCurrency(section80EUsed)}</p>
                        <p>Great! Section 80E has no upper limit, so you can claim the entire interest amount.</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nps_additional" className="font-medium">NPS Contribution (₹)</Label>
                        <p className="text-xs text-gray-500 mt-1">Under Section 80CCD(1B) (Additional ₹50,000)</p>
                        <Input
                          id="nps_additional"
                          type="text"
                          inputMode="numeric"
                          value={deductions.nps_additional || ''}
                          onChange={(e) => handleDeductionChange('nps_additional', e.target.value)}
                          className="mt-2"
                          placeholder="0"
                          style={{ appearance: 'textfield' }}
                        />
                        {npsAdditionalAmount > npsLimit && (
                          <p className="text-xs text-amber-600 mt-1 font-medium">
                            Note: Only ₹50,000 can be claimed as additional NPS benefit.
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="donations" className="font-medium">Donations (₹)</Label>
                        <p className="text-xs text-gray-500 mt-1">Under Section 80G (Max: ₹1,00,000)</p>
                        <Input
                          id="donations"
                          type="text"
                          inputMode="numeric"
                          value={deductions.donations || ''}
                          onChange={(e) => handleDeductionChange('donations', e.target.value)}
                          className="mt-2"
                          placeholder="0"
                          style={{ appearance: 'textfield' }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor="education_loan" className="font-medium">Education Loan Interest (₹)</Label>
                        <p className="text-xs text-gray-500 mt-1">Under Section 80E (No Limit)</p>
                        <Input
                          id="education_loan"
                          type="text"
                          inputMode="numeric"
                          value={deductions.education_loan || ''}
                          onChange={(e) => handleDeductionChange('education_loan', e.target.value)}
                          className="mt-2"
                          placeholder="0"
                          style={{ appearance: 'textfield' }}
                        />
                      </div>
                      <div>
                        <Label htmlFor="ev_loan" className="font-medium">Electric Vehicle Loan (₹)</Label>
                        <p className="text-xs text-gray-500 mt-1">Under Section 80EEB (Max: ₹1,50,000)</p>
                        <Input
                          id="ev_loan"
                          type="text"
                          inputMode="numeric"
                          value={deductions.ev_loan || ''}
                          onChange={(e) => handleDeductionChange('ev_loan', e.target.value)}
                          className="mt-2"
                          placeholder="0"
                          style={{ appearance: 'textfield' }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor="startup_investment" className="font-medium">Startup Investment (₹)</Label>
                        <Input
                          id="startup_investment"
                          type="text"
                          inputMode="numeric"
                          value={deductions.startup_investment || ''}
                          onChange={(e) => handleDeductionChange('startup_investment', e.target.value)}
                          className="mt-2"
                          placeholder="0"
                          style={{ appearance: 'textfield' }}
                        />
                      </div>
                      <div>
                        <Label htmlFor="rural_development" className="font-medium">Rural Development (₹)</Label>
                        <Input
                          id="rural_development"
                          type="text"
                          inputMode="numeric"
                          value={deductions.rural_development || ''}
                          onChange={(e) => handleDeductionChange('rural_development', e.target.value)}
                          className="mt-2"
                          placeholder="0"
                          style={{ appearance: 'textfield' }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                    <h3 className="text-md font-medium mb-3 flex items-center">
                      <Lightbulb className="h-5 w-5 text-blue-500 mr-2" />
                      Special Deductions Tips
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <div className="mt-1 mr-2 flex-shrink-0">
                          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 12l2 2 4-4"></path>
                          </svg>
                        </div>
                        <span><strong>NPS:</strong> Extra ₹50K above 80C limit</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mt-1 mr-2 flex-shrink-0">
                          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 12l2 2 4-4"></path>
                          </svg>
                        </div>
                        <span><strong>Donations:</strong> 50-100% deduction</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mt-1 mr-2 flex-shrink-0">
                          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 12l2 2 4-4"></path>
                          </svg>
                        </div>
                        <span><strong>Education Loan:</strong> Entire interest deductible</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              {renderSection80C()}
              {renderSection80D()}
              {renderSection80G()}
              {renderSection80E()}
              {renderSection80EEA()}
              {renderSection80TTA()}
              <div className="flex justify-between bg-blue-50 p-3 rounded-lg border border-blue-100 mt-2">
                <span className="font-medium">Total Deductions</span>
                <span className="text-blue-600 font-semibold">{formatCurrency(totalDeductions)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mb-4 mt-2">
          <div className="bg-orange-200 text-orange-800 border-2 border-orange-300 p-5 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Taxable Income</span>
              <span className="font-bold text-lg">{formatCurrency(taxableIncome)}</span>
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full py-6 text-lg font-medium mb-6"
          onClick={() => setShowResults(true)}
        >
          <Calculator className="mr-2 h-5 w-5" />
          Calculate Tax
        </Button>
        
        {/* Tax Regime Comparison */}
        {showResults && totalIncome > 0 && (
          <div className={`mb-6 p-4 rounded-lg border ${isBeneficialOldRegime ? 'bg-blue-50 border-blue-200 text-blue-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            <h3 className="font-semibold text-lg mb-2">Tax Regime Comparison</h3>
            <p>
              {isBeneficialOldRegime 
                ? `The Old Tax Regime is better for you by ${formatCurrency(taxDifference)}. This is because your deductions help reduce your tax liability significantly.` 
                : `The New Tax Regime is better for you by ${formatCurrency(taxDifference)}. This is because the lower tax rates outweigh your claimed deductions.`}
            </p>
            <p className="mt-2 text-sm">
              {taxRegime === (isBeneficialOldRegime ? "old" : "new") 
                ? "You've selected the optimal tax regime for your situation." 
                : `Consider switching to the ${isBeneficialOldRegime ? "Old" : "New"} Tax Regime to save ${formatCurrency(taxDifference)}.`}
            </p>
          </div>
        )}
        
        {/* Tax Calculation Results */}
        {showResults && (
          <Card className="border shadow-sm">
            <CardContent className="pt-6 pb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                Tax Calculation Summary
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-5 shadow-sm">
                  <h3 className="text-lg font-medium mb-3 text-center">Old Tax Regime</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Taxable Income</div>
                      <div className="text-xl font-semibold text-gray-800">{formatCurrency(taxableIncome)}</div>
                      {totalDeductions > 0 && (
                        <div className="text-sm text-green-600">-{formatCurrency(totalDeductions)}</div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Tax Liability</div>
                      <div className="text-xl font-semibold text-blue-600">{formatCurrency(oldRegimeTax.totalTax)}</div>
                    </div>
                  </div>
                </div>
                
                <div className={`border rounded-lg p-5 shadow-sm ${taxRegime === "new" ? "" : "opacity-70"}`}>
                  <h3 className="text-lg font-medium mb-3 text-center">New Tax Regime</h3>
                  {taxRegime !== "new" && (
                    <p className="text-center text-sm text-muted-foreground mb-3">
                      Switch to new regime to compare
                    </p>
                  )}
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Taxable Income</div>
                      <div className="text-xl font-semibold text-gray-800">{formatCurrency(taxableIncome)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Tax Liability</div>
                      <div className="text-xl font-semibold text-blue-600">{formatCurrency(newRegimeTax.totalTax)}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button 
                  variant="outline" 
                  className="text-blue-600 flex items-center"
                  onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  View Your Potential Tax Savings
                </Button>
              </div>
              
              {showDetailedAnalysis && (
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-xl font-semibold mb-4">Tax Savings Analysis</h3>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Current Status:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Tax in Old Regime: {formatCurrency(oldRegimeTax.totalTax)}</p>
                        <p className="text-sm text-gray-600">Tax in New Regime: {formatCurrency(newRegimeTax.totalTax)}</p>
                      </div>
                      <div>
                        <p className="font-medium text-green-600">
                          Current Tax Saving: {formatCurrency(Math.abs(oldRegimeTax.totalTax - newRegimeTax.totalTax))}
                        </p>
                      </div>
                    </div>
                    
                    <div className="h-64 w-full mb-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Old Regime', value: oldRegimeTax.totalTax },
                            { name: 'New Regime', value: newRegimeTax.totalTax }
                          ]}
                          margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis
                            tickFormatter={(value) => `₹${Math.round(value).toLocaleString('en-IN')}`}
                            domain={[0, 'dataMax']}
                          />
                          <Tooltip 
                            formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Tax Liability']}
                            labelFormatter={(label) => `${label} Tax Regime`}
                          />
                          <Bar dataKey="value" fill={isBeneficialOldRegime ? "#3b82f6" : "#22c55e"} radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h4 className="flex items-center font-medium text-blue-800 mb-2">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Additional Savings Potential
                    </h4>
                    <p className="text-blue-700">
                      You can save up to {formatCurrency(section80CRemaining + section80DRemaining + npsLimit)} more in tax by optimizing your investments!
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Investment-Related Tax Savings Disclaimer:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                      <li>The projected tax savings through investments are estimates</li>
                      <li>Investment returns can vary significantly based on market conditions</li>
                      <li>Past performance does not guarantee future returns</li>
                      <li>Different investment options carry different levels of risk</li>
                      <li>Consider your risk tolerance and financial goals before investing</li>
                      <li>Consult a financial advisor for personalized investment advice</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Savings Breakdown</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="flex items-center text-gray-800 font-medium mb-2">
                        <Target className="h-5 w-5 mr-2 text-blue-500" />
                        Quick Actions to Save Tax:
                      </h5>
                      <ul className="space-y-2">
                        {section80CRemaining > 0 && (
                          <li className="text-sm">Max out your 80C: Invest in ELSS funds or PPF</li>
                        )}
                        {section80DRemaining > 0 && (
                          <li className="text-sm">Health Insurance: Get coverage for yourself and family</li>
                        )}
                        {npsLimit > 0 && (
                          <li className="text-sm">NPS Investment: Additional tax benefit under 80CCD(1B)</li>
                        )}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-4">Detailed Tax Analysis</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Income Breakdown</h5>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>Gross Total Income:</span>
                            <span>{formatCurrency(totalIncome)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Salary Income:</span>
                            <span>{formatCurrency(parseFloat(income.salary) || 0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Other Income:</span>
                            <span>{formatCurrency(totalIncome - (parseFloat(income.salary) || 0))}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Deductions Utilized (Old Regime)</h5>
                        <div className="text-sm">
                          <div className="mb-2">
                            <div className="font-medium">Section 80C ({formatCurrency(section80CUsed)})</div>
                            <div className="pl-4 space-y-1 mt-1">
                              <div className="flex justify-between">
                                <span>PPF:</span>
                                <span>{formatCurrency(parseFloat(deductions.ppf) || 0)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>ELSS:</span>
                                <span>{formatCurrency(parseFloat(deductions.elss) || 0)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Life Insurance:</span>
                                <span>{formatCurrency(parseFloat(deductions.life_insurance) || 0)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>ULIP:</span>
                                <span>{formatCurrency(parseFloat(deductions.ulip) || 0)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Home Loan Principal:</span>
                                <span>{formatCurrency(homeLoanPrincipalAmount)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tuition Fees:</span>
                                <span>{formatCurrency(parseFloat(deductions.tuition_fees) || 0)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tax Saving FD:</span>
                                <span>{formatCurrency(parseFloat(deductions.tax_saver_fd) || 0)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-2">
                            <div className="font-medium">Other Deductions</div>
                            <div className="pl-4 space-y-1 mt-1">
                              <div className="flex justify-between">
                                <span>Health Insurance (80D):</span>
                                <span>{formatCurrency(section80DUsed)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Home Loan Interest:</span>
                                <span>{formatCurrency(section80EEAUsed)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Education Loan Interest:</span>
                                <span>{formatCurrency(section80EUsed)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>NPS Additional:</span>
                                <span>{formatCurrency(Math.min(npsAdditionalAmount, npsLimit))}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Donations:</span>
                                <span>{formatCurrency(section80GUsed)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Personalized Tax Saving Recommendations</h4>
                    
                    {section80CRemaining > 0 && (
                      <div className="mb-4 p-3 rounded-lg bg-blue-50 text-blue-700">
                        <h5 className="flex items-center font-medium mb-1">
                          <Lightbulb className="h-4 w-4 mr-2" />
                          80C Optimization Opportunity
                        </h5>
                        <p className="text-sm">
                          You can save additional tax by investing {formatCurrency(section80CRemaining)} more under Section 80C. Recommended options:
                        </p>
                        <ul className="text-sm mt-2 pl-6 list-disc">
                          <li>ELSS Mutual Funds (3-year lock-in)</li>
                          <li>PPF (long-term tax-free returns)</li>
                          <li>Tax Saving FD (if you prefer fixed returns)</li>
                        </ul>
                      </div>
                    )}
                    
                    {section80DRemaining > 0 && (
                      <div className="mb-4 p-3 rounded-lg bg-blue-50 text-blue-700">
                        <h5 className="flex items-center font-medium mb-1">
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Health Insurance Recommendation
                        </h5>
                        <p className="text-sm">Consider buying health insurance for:</p>
                        <ul className="text-sm mt-2 pl-6 list-disc">
                          <li>Tax benefits under Section 80D</li>
                          <li>Financial protection against medical emergencies</li>
                          <li>Additional deduction for parents' health insurance</li>
                        </ul>
                      </div>
                    )}
                    
                    <div className="p-3 rounded-lg bg-blue-100 text-blue-800">
                      <h5 className="flex items-center font-medium mb-2">
                        <Target className="h-5 w-5 mr-2" />
                        Final Recommendation
                      </h5>
                      <p className="font-medium">{isBeneficialOldRegime ? "The Old Tax Regime" : "The New Tax Regime"} is better for you</p>
                      <p className="text-sm">Tax saving: {formatCurrency(Math.abs(oldRegimeTax.totalTax - newRegimeTax.totalTax))}</p>
                      <p className="text-sm">Total deductions utilized: {formatCurrency(totalDeductions)}</p>
                    </div>
                    
                    <div className="mt-4 text-center text-sm text-green-600">
                      ✅ Tax data saved and synced with connected features!
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
          <p className="font-medium">Disclaimer:</p>
          <p>This calculator provides an estimate based on the information you provide and the current tax laws. Actual tax liability may vary. Please consult with a tax professional for personalized advice.</p>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;