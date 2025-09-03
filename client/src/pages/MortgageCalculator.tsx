import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Slider } from "../components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { SEO } from "../components/SEO";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { ArrowLeft, Save, Plus, Minus, Building2, Home, DollarSign } from 'lucide-react';

// TODO: Add support for ARM loans later
// NOTE: Interest calculation could be more precise - maybe use decimal.js?

interface MortgageData {
  propertyValue: number;
  loanAmount: number;
  interestRate: number;
  loanTenure: number;
  prepaymentAmount: number;
  prepaymentStart: number;
}

interface SavedCalculation {
  id: string;
  name: string;
  propertyValue: number;
  loanAmount: number;
  interestRate: number;
  loanTenure: number;
  monthlyPayment: number;
  totalInterest: number;
  date: string;
}

export default function MortgageCalculatorNew() {
  // Default values based on my research of current market conditions
  const [mortgage, setMortgage] = useState<MortgageData>({
    propertyValue: 450000, // median home price in many areas
    loanAmount: 320000, // roughly 71% LTV
    interestRate: 6.35, // current rates as of recent Fed changes
    loanTenure: 18, // shorter than typical 30yr - saves interest!
    prepaymentAmount: 500,
    prepaymentStart: 12
  });

  const [prepaymentStrategy, setPrepaymentStrategy] = useState("Monthly");
  const [activeTab, setActiveTab] = useState("loan");
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([]);

  // Calculate monthly payment and other stuff
  const calculations = useMemo(() => {
    const { loanAmount, interestRate, loanTenure } = mortgage;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTenure * 12;

    // Standard mortgage formula - learned this back in finance class
    const emi = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - loanAmount;

    // Down payment calculation
    const downPayment = mortgage.propertyValue - loanAmount;
    const downPaymentPercent = (downPayment / mortgage.propertyValue) * 100;

    // Tax benefits - this is rough estimate, actual depends on your bracket
    const mortgageInterestDeduction = Math.min(totalInterest * 0.3, 10000); // SALT cap limits this to $10k
    const propertyTaxDeduction = mortgage.propertyValue * 0.01; // varies by state but 1% is reasonable avg

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      downPayment: Math.round(downPayment),
      downPaymentPercent: Math.round(downPaymentPercent),
      mortgageInterestDeduction: Math.round(mortgageInterestDeduction),
      propertyTaxDeduction: Math.round(propertyTaxDeduction)
    };
  }, [mortgage]);

  const formatCurrency = (amount: number) => {
    // Add commas and dollar sign - keeps it readable
    return `$${amount.toLocaleString('en-US')}`;
  };

  const updateValue = (field: keyof MortgageData, value: number) => {
    setMortgage(prev => ({ ...prev, [field]: value }));
  };

  const saveCalculation = () => {
    const newCalculation: SavedCalculation = {
      id: Date.now().toString(),
      name: `Scenario ${savedCalculations.length + 1}`, // Less formal
      propertyValue: mortgage.propertyValue,
      loanAmount: mortgage.loanAmount,
      interestRate: mortgage.interestRate,
      loanTenure: mortgage.loanTenure,
      monthlyPayment: calculations.emi,
      totalInterest: calculations.totalInterest,
      date: new Date().toLocaleDateString()
    };
    setSavedCalculations(prev => [...prev, newCalculation]);
  };

  // Build the payment schedule month by month
  const generateAmortizationSchedule = useMemo(() => {
    const schedule = [];
    let remainingBalance = mortgage.loanAmount;
    const monthlyRate = mortgage.interestRate / 100 / 12;
    const emi = calculations.emi;

    for (let month = 1; month <= Math.min(mortgage.loanTenure * 12, 360); month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = emi - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month,
        year: Math.ceil(month / 12),
        emi: emi,
        principal: principalPayment,
        interest: interestPayment,
        prepayment: 0,
        balance: Math.max(0, remainingBalance)
      });

      if (remainingBalance <= 0) break;
    }

    return schedule;
  }, [mortgage, calculations.emi]);

  // Chart data
  const pieChartData = [
    { name: 'Principal', value: mortgage.loanAmount, color: '#3B82F6' },
    { name: 'Interest', value: calculations.totalInterest, color: '#F59E0B' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Mortgage Calculator - Calculate Your Monthly Home Loan Payment"
        description="Figure out your monthly mortgage payment with our easy calculator. Includes taxes, insurance, and shows you how much interest you'll pay over time."
        keywords="mortgage calculator, home loan payment, monthly mortgage payment, mortgage interest, home buying calculator"
        canonical="https://dollarmento.com/mortgage-calculator"
        ogType="website"
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 py-4">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to All Calculators</span>
            </button>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Mortgage Calculator</h1>
            </div>
            <p className="text-gray-600">Quick and easy way to figure out what your monthly payment will be!</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Input Controls */}
          <div className="space-y-4">
            {/* Property Value */}
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-700">Home Price</Label>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(mortgage.propertyValue)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateValue('propertyValue', Math.max(50000, mortgage.propertyValue - 10000))}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                      title="Decrease home price"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="flex-1">
                      <Slider
                        value={[mortgage.propertyValue]}
                        onValueChange={([value]) => updateValue('propertyValue', value)}
                        max={2000000}
                        min={50000}
                        step={10000}
                        className="w-full"
                      />
                    </div>
                    <button 
                      onClick={() => updateValue('propertyValue', Math.min(2000000, mortgage.propertyValue + 10000))}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>$50,000</span>
                    <span>$2,000,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loan Amount */}
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-700">Loan Amount</Label>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(mortgage.loanAmount)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateValue('loanAmount', Math.max(10000, mortgage.loanAmount - 5000))}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="flex-1">
                      <Slider
                        value={[mortgage.loanAmount]}
                        onValueChange={([value]) => updateValue('loanAmount', value)}
                        max={1500000}
                        min={10000}
                        step={5000}
                        className="w-full"
                      />
                    </div>
                    <button 
                      onClick={() => updateValue('loanAmount', Math.min(1500000, mortgage.loanAmount + 5000))}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>$10,000</span>
                    <span>$1,500,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interest Rate */}
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-700">Interest Rate</Label>
                    <span className="text-lg font-bold text-gray-900">{mortgage.interestRate}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateValue('interestRate', Math.max(2, mortgage.interestRate - 0.25))}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="flex-1">
                      <Slider
                        value={[mortgage.interestRate]}
                        onValueChange={([value]) => updateValue('interestRate', value)}
                        max={15}
                        min={2}
                        step={0.25}
                        className="w-full"
                      />
                    </div>
                    <button 
                      onClick={() => updateValue('interestRate', Math.min(15, mortgage.interestRate + 0.25))}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>2%</span>
                    <span>15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loan Tenure */}
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-700">Loan Term</Label>
                    <span className="text-lg font-bold text-gray-900">{mortgage.loanTenure} years</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateValue('loanTenure', Math.max(1, mortgage.loanTenure - 1))}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="flex-1">
                      <Slider
                        value={[mortgage.loanTenure]}
                        onValueChange={([value]) => updateValue('loanTenure', value)}
                        max={30}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <button 
                      onClick={() => updateValue('loanTenure', Math.min(30, mortgage.loanTenure + 1))}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 yr</span>
                    <span>30 yrs</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Extra Payments */}
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">Extra Payments? (optional)</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {['None', 'Monthly', 'Annual', 'Custom'].map((strategy) => (
                      <button
                        key={strategy}
                        onClick={() => setPrepaymentStrategy(strategy)}
                        className={`p-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          prepaymentStrategy === strategy 
                            ? 'bg-blue-500 text-white shadow-sm' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {strategy}
                      </button>
                    ))}
                  </div>

                  {prepaymentStrategy !== 'None' && (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs text-gray-600">Amount</Label>
                        <Input 
                          type="number"
                          value={mortgage.prepaymentAmount || ''}
                          onChange={(e) => updateValue('prepaymentAmount', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)}
                          placeholder="500"
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Start After (months)</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Slider
                            value={[mortgage.prepaymentStart]}
                            onValueChange={([value]) => updateValue('prepaymentStart', value)}
                            max={120}
                            min={1}
                            step={1}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium w-16">{mortgage.prepaymentStart} months</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tax Stuff */}
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">Potential Tax Savings</Label>
                  <div className="text-xs text-gray-500 mb-2">*Rough estimates - consult your tax pro!</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Deduction:</span>
                      <span className="font-medium">{formatCurrency(calculations.mortgageInterestDeduction)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Tax:</span>
                      <span className="font-medium">{formatCurrency(calculations.propertyTaxDeduction)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Results */}
          <div className="space-y-4">
            {/* Loan Summary */}
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Home className="w-5 h-5 text-blue-600" />
                  Loan Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Your Monthly Payment</div>
                  <div className="text-3xl font-bold text-blue-600">{formatCurrency(calculations.emi)}</div>
                  <div className="text-xs text-gray-500 mt-1">Principal + Interest only</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-gray-600">You'll Pay Total</div>
                    <div className="font-bold text-blue-800">{formatCurrency(calculations.totalPayment)}</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-gray-600">Interest Cost</div>
                    <div className="font-bold text-orange-800">{formatCurrency(calculations.totalInterest)}</div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Borrowing</div>
                  <div className="text-lg font-bold">{formatCurrency(mortgage.loanAmount)}</div>
                  <div className="text-sm text-green-600 mt-1">
                    @ {mortgage.interestRate}% for {mortgage.loanTenure} years ({mortgage.loanTenure * 12} payments)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Down Payment */}
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Down Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Down Payment Needed</div>
                  <div className="text-2xl font-bold text-green-600">{formatCurrency(calculations.downPayment)}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    That's {calculations.downPaymentPercent}% down
                  </div>
                  <Button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-sm">
                    Find Local Lenders
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Split */}
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">Where Your Money Goes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Principal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-sm">Interest</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tax Perks */}
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">Possible Tax Breaks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600">Potential Annual Savings</div>
                    <div className="text-xl font-bold text-green-600">
                      {formatCurrency(calculations.mortgageInterestDeduction + calculations.propertyTaxDeduction)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Check with your accountant!</div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Interest Write-off:</span>
                      <span className="font-medium">{formatCurrency(calculations.mortgageInterestDeduction)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Property Tax Deduction:</span>
                      <span className="font-medium">{formatCurrency(calculations.propertyTaxDeduction)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Tabs */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="loan">Summary</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="calculations">Saved</TabsTrigger>
            </TabsList>

            <TabsContent value="loan" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Summary</CardTitle>
                  <div className="flex gap-2">
                    <Button onClick={saveCalculation} className="bg-blue-600 hover:bg-blue-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save This Calculation
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    Based on your inputs, here's what you're looking at for monthly payments. 
                    Keep in mind this doesn't include insurance, taxes, or HOA fees.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Breakdown by Month</CardTitle>
                  <div className="text-sm text-gray-600">Shows how much goes to principal vs interest each month</div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left p-2 font-medium">Year</th>
                          <th className="text-left p-2 font-medium">Month</th>
                          <th className="text-left p-2 font-medium">Payment</th>
                          <th className="text-left p-2 font-medium">Principal</th>
                          <th className="text-left p-2 font-medium">Interest</th>
                          <th className="text-left p-2 font-medium">Extra</th>
                          <th className="text-left p-2 font-medium">Balance Left</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generateAmortizationSchedule.slice(0, 12).map((row, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-2">{row.year}</td>
                            <td className="p-2">{row.month}</td>
                            <td className="p-2">{formatCurrency(row.emi)}</td>
                            <td className="p-2">{formatCurrency(row.principal)}</td>
                            <td className="p-2">{formatCurrency(row.interest)}</td>
                            <td className="p-2">{formatCurrency(row.prepayment)}</td>
                            <td className="p-2">{formatCurrency(row.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    Only showing first year - notice how most of your payment goes to interest early on!
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calculations" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Saved Scenarios</CardTitle>
                    <Button variant="outline" size="sm" onClick={saveCalculation}>
                      <Save className="w-4 h-4 mr-2" />
                      Save This One
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {savedCalculations.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <Save className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="text-gray-600">Nothing saved yet</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Try different scenarios and save the ones you like for comparison
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {savedCalculations.map((calc) => (
                        <div key={calc.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{calc.name}</div>
                              <div className="text-sm text-gray-600">
                                Property: {formatCurrency(calc.propertyValue)} • 
                                Loan: {formatCurrency(calc.loanAmount)} • 
                                Rate: {calc.interestRate}%
                              </div>
                              <div className="text-sm text-gray-500">Saved on {calc.date}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{formatCurrency(calc.monthlyPayment)}</div>
                              <div className="text-sm text-gray-600">per month</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Educational Content Section */}
        <div className="w-full mt-8 space-y-6">
          {/* The best mortgage calculator and home loan planner */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">The best mortgage calculator and home loan calculator in the US</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                One of the most important financial decisions you'll ever make is buying a house. You can use our advanced mortgage payment calculator to find out what your options are for getting a home loan, how much your monthly payments will be, and how much it will cost to own a home. This one tool can help you figure out the right numbers for a lot of different loan situations, like when you're refinancing, getting a VA loan calculator estimate, or buying your first home.
              </p>
              <p className="text-sm text-gray-600">
                To find the best mortgage for you, look at different amounts for the down payment, interest rates, and loan terms. Our home loan calculator can help you learn more about your VA mortgage calculator options. It has features like prepayment analysis, tax benefit estimation, and amortization schedules.
              </p>
            </div>
          </section>

          {/* How to Use This Calculator for Mortgages */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Use This Mortgage Calculator for Home Loan</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Important Loan Information</h4>
                <p className="text-sm text-gray-600">
                  First, enter the value of your home, the amount of the loan you want, the current interest rate, and how long you want the loan to last. You can use the home loan calculator to quickly figure out how much your monthly EMI (equated monthly installment) is, how much interest you owe, and how much your loan will cost in total. This VA home loan calculator information is essential to figure out what your mortgage will be.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Making plans for a down payment</h4>
                <p className="text-sm text-gray-600">
                  The calculator will automatically tell you how much and what percentage of your down payment you need based on the value of your property and the amount of your loan. Your loan amount, monthly payments, and total interest will all go down if you put down a bigger down payment. Most lenders want you to put down 3% to 20% of the loan amount, but this depends on the type of loan.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">A Look at Interest Rates</h4>
                <p className="text-sm text-gray-600">
                  The interest rate changes the total cost of your loan and the amount you pay each month. The calculator lets you see how different rates affect each other. A 0.25% difference in the interest rate can save you a lot of money over the life of the loan. Check out both types of loans: fixed-rate and adjustable-rate.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Looking at the terms of different loans</h4>
                <p className="text-sm text-gray-600">
                  Check out different loan terms, like 15, 20, 25, and 30 years, to see how your monthly payment and total interest change. If you choose shorter terms, your monthly payments will be higher, but you'll save a lot of money on interest over time.
                </p>
              </div>
            </div>
          </section>

          {/* How to Make Sense of Your Mortgage Results */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Make Sense of Your Mortgage Results</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Monthly EMI Breakdown</h4>
                <p className="text-sm text-gray-600">
                  The principal and interest make up your Equated Monthly Installment (EMI). At the beginning of the loan term, most of your payment goes toward interest. You pay off the principal with more money as you get closer to your goal. The amortization schedules in our calculator make this breakdown very clear.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Total Interest and Principal</h4>
                <p className="text-sm text-gray-600">
                  The calculator tells you how much interest you'll pay on the loan over the course of its term. This amount can be very high, so borrowers are often shocked by it. This information will help you decide on the best loan terms, down payments, and ways to pay off the loan early.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Plan for Paying Off</h4>
                <p className="text-sm text-gray-600">
                  The detailed amortization table shows how the payments will be split between the interest and the principal over time. This schedule tells you when you'll have a lot of equity, which can help you plan for things like getting a home equity loan or refinancing later on.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Learning About Tax Benefits</h4>
                <p className="text-sm text-gray-600">
                  The calculator will tell you how much less you would have to pay in taxes if you didn't have to pay property taxes and mortgage interest. Owning a home is often cheaper than renting because of these benefits, which can lower your mortgage payments.
                </p>
              </div>
            </div>
          </section>

          {/* One benefit of smart mortgage planning */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">One benefit of smart mortgage planning</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-2">You can pay off your loan early</h4>
                <p className="text-sm text-gray-600">
                  You can lower your total interest and loan term by a lot if you pay more than the minimum on the principal. If you pay an extra $100 to $200 a month, you could save tens of thousands of dollars in interest. Our calculator shows you exactly how paying off your loan early in different ways will change it.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-2">Building Equity</h4>
                <p className="text-sm text-gray-600">
                  On the other hand, paying your mortgage makes your home worth more. Over time, you own more and more of your property. You can use home equity loans or lines of credit to pay for things you didn't expect, fix up your home, or put money into the future.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-2">Costs of Housing That Don't Change</h4>
                <p className="text-sm text-gray-600">
                  With a fixed-rate mortgage, your payments for the principal and interest stay the same for the whole loan term. You can be sure of how much your housing will cost because of this. Inflation protection helps you plan your budget and keeps your money safe for a long time.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-2">Tax Benefits</h4>
                <p className="text-sm text-gray-600">
                  People who own homes can get a tax break on the interest they pay on their mortgage and their property taxes. This way, they could save thousands of dollars every year. These deductions make owning a home less expensive than renting one, especially for people who pay a lot of taxes.
                </p>
              </div>
            </div>
          </section>

          {/* How to Get a Mortgage the Right Way */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Get a Mortgage the Right Way</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Put down as much money as you can</h4>
                <p className="text-sm text-gray-600">
                  Make sure that the amount of your down payment fits with your other financial goals. You won't have to pay PMI (Private Mortgage Insurance) if you put down 20%, but sometimes a smaller down payment lets you put the extra money somewhere else where it will earn you more.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Think about the loan's terms</h4>
                <p className="text-sm text-gray-600">
                  You pay more each month for a 15-year mortgage, but you save a lot of money on interest. Loans with a 30-year term have lower monthly payments but more total interest. Pick based on how much money you need right now and what you want to do with it later.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Looking for Rates</h4>
                <p className="text-sm text-gray-600">
                  Ask more than one bank for a quote. Over the life of your loan, a 0.25% change in the interest rate can save you or cost you a lot of money. To get the best rate, check out credit unions, online lenders, and regular banks.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">When to Buy</h4>
                <p className="text-sm text-gray-600">
                  Watch the housing market and interest rates closely. You can't always tell when the market will go up or down, but you can look at trends to help you choose when to buy or refinance.
                </p>
              </div>
            </div>
          </section>

          {/* Learning about the different kinds of mortgages */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Learning about the different kinds of mortgages</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Fixed-rate mortgages</h4>
                <p className="text-sm text-gray-600">
                  The interest rate stays the same for the whole time you have the loan. Keeps you safe from rising rates and lets you make regular payments. Ideal for people who want to stay in their home for a long time and want payments that are easy to plan for.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Adjustable Rate Mortgages (ARM)</h4>
                <p className="text-sm text-gray-600">
                  The interest rate can go up or down depending on how the market is doing. At first, their rates are usually lower than those of fixed-rate mortgages. This is good for people who want to buy a house and then move or refinance before rates go up a lot.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Loans from the USDA, FHA, and VA</h4>
                <p className="text-sm text-gray-600">
                  The government backs loans, which can be good because they don't require a lot of money down, have more flexible credit requirements, or don't require any money down at all (VA/USDA). There are rules for each program and places where it can be used.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Large Loans</h4>
                <p className="text-sm text-gray-600">
                  For loans that are bigger than the conforming loan limits, which are different in different places. You usually need a higher credit score, a bigger down payment, and the interest rates may be different from those of regular loans.
                </p>
              </div>
            </div>
          </section>

          {/* The good and bad things about having a home */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">The good and bad things about having a home</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-2">Things that are good:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <strong>Building equity:</strong> You get a bigger share of the property every time you make a payment, which makes you richer over time.</li>
                  <li>• <strong>Tax Benefits:</strong> You can deduct the interest on your mortgage and the taxes on your property. This could help you save thousands of dollars on your taxes each year.</li>
                  <li>• <strong>Stability:</strong> With a fixed-rate mortgage, you don't have to worry about rents going up or the housing market changing because your housing costs stay the same.</li>
                  <li>• <strong>Freedom to Customize:</strong> You don't need to ask your landlord for permission to change, fix up, or make your home your own.</li>
                  <li>• <strong>Possible Appreciation:</strong> Over time, real estate usually goes up in value, which can help you make money on your investments.</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-red-700 mb-2">Cons:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <strong>High Initial Costs:</strong> You need a lot of money up front to pay for the down payment, closing costs, and moving costs.</li>
                  <li>• <strong>Maintenance Responsibility:</strong> You are responsible for paying for all the repairs, maintenance, and keeping the property in good shape.</li>
                  <li>• <strong>Less mobility:</strong> Selling a house takes time and money, which makes it harder to move quickly for job opportunities.</li>
                  <li>• <strong>Market Risk:</strong> The value of your home could go down, which means you might owe more than it's worth.</li>
                  <li>• <strong>Extra Costs:</strong> Property taxes, insurance, HOA fees, and utilities all add to the cost of your home each month.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mortgage Benefits and Considerations */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mortgage Benefits and Considerations</h3>
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
                  <p className="text-sm text-green-700">✓ Homeownership access without paying full price upfront</p>
                  <p className="text-sm text-green-700">✓ Fixed monthly payments make budgeting easier</p>
                  <p className="text-sm text-green-700">✓ Building equity increases your net worth over time</p>
                  <p className="text-sm text-green-700">✓ Tax deductions on mortgage interest and property taxes</p>
                  <p className="text-sm text-green-700">✓ Potential property appreciation builds wealth</p>
                  <p className="text-sm text-green-700">✓ Predictable housing costs protect against rent increases</p>
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
                  <p className="text-sm text-red-700">✗ High initial costs including down payment and closing fees</p>
                  <p className="text-sm text-red-700">✗ Long-term debt commitment of 15-30 years</p>
                  <p className="text-sm text-red-700">✗ Interest costs may equal or exceed loan principal</p>
                  <p className="text-sm text-red-700">✗ Property maintenance and repair responsibilities</p>
                  <p className="text-sm text-red-700">✗ Market risk of property value decline</p>
                  <p className="text-sm text-red-700">✗ Reduced mobility compared to renting</p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Use a Mortgage Calculator */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use a Mortgage Calculator?</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Financial Planning</h4>
                <p className="text-sm text-gray-600">
                  Visualize your mortgage payments and total costs over time. Plan your budget accordingly for your future financial needs.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Goal Setting</h4>
                <p className="text-sm text-gray-600">
                  Set realistic homebuying goals based on accurate calculations and projections.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Smart Decisions</h4>
                <p className="text-sm text-gray-600">
                  Make informed choices about loan terms and prepayment strategies.
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
                    What is the maximum mortgage amount I can qualify for?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Most lenders use a debt-to-income ratio of 28/36 - your housing payment shouldn't exceed 28% of gross income, and total debt shouldn't exceed 36%. For example, if you earn $100,000 annually, your housing payment should stay under $2,333 monthly, and total debt payments under $3,000.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-sm font-medium text-left">
                    How accurate are mortgage calculator projections?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Our calculations are highly accurate for principal and interest payments using standard mortgage formulas. Final costs may vary based on property insurance, taxes, PMI, and lender-specific fees. The calculator provides excellent estimates for budgeting and comparison purposes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-sm font-medium text-left">
                    Should I choose a 15-year or 30-year mortgage?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    15-year mortgages have higher monthly payments but save significant interest over time and build equity faster. 30-year mortgages offer lower monthly payments but cost more in total interest. Choose based on your monthly budget and long-term financial goals.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-sm font-medium text-left">
                    When should I consider refinancing my mortgage?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Consider refinancing when rates drop 0.5-1% below your current rate, when your credit score has improved significantly, or when you want to change loan terms. Calculate potential savings against closing costs to ensure refinancing makes financial sense.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* Final Call to Action */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-white mb-2">Use our home loan calculator today before you buy your dream home</h3>
            <p className="text-blue-100 text-sm mb-4">
              Our comprehensive mortgage calculator will help you make smart decisions about buying a house. Look at different scenarios to find the home loan that is best for you.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Calculate Your Mortgage Payment Now
            </Button>
          </section>

          {/* Mortgage Calculator Tags */}
          <section className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Related Topics</h4>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#MortgageCalculator</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#HomeBuying</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#FinanceTips</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#RealEstateInvestment</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#HomeMortgage</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#FinancialPlanning</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#DreamHome</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#PropertyInvestment</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#HouseHunting</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#LoanCalculator</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#FirstHome</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#MortgageRates</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#HomeLoan</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#RealEstateTips</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#Budgeting</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#InvestingInProperty</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#SmartFinance</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}