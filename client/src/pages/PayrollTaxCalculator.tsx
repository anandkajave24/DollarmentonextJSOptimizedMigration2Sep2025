import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { DollarSign, Percent, Users, Calculator, HelpCircle } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Helmet } from 'react-helmet';

export default function PayrollTaxCalculator() {
  const [grossSalary, setGrossSalary] = useState(75000);
  const [payFrequency, setPayFrequency] = useState('monthly');
  const [state, setState] = useState('california');
  const [filingStatus, setFilingStatus] = useState('single');
  const [allowances, setAllowances] = useState(1);
  const [additionalWithholding, setAdditionalWithholding] = useState(0);

  const [federalTax, setFederalTax] = useState(0);
  const [stateTax, setStateTax] = useState(0);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [medicare, setMedicare] = useState(0);
  const [medicareAdditional, setMedicareAdditional] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const [netPay, setNetPay] = useState(0);

  // State tax rates for major states
  const stateTaxRates = {
    'california': 5.5,
    'new-york': 4.0,
    'texas': 0,
    'florida': 0,
    'illinois': 3.25,
    'pennsylvania': 3.07,
    'ohio': 2.85,
    'georgia': 5.75,
    'north-carolina': 5.25,
    'michigan': 4.25
  };

  // Federal tax brackets for 2024
  const federalBrackets = {
    single: [
      { min: 0, max: 11000, rate: 0.10 },
      { min: 11000, max: 44725, rate: 0.12 },
      { min: 44725, max: 95375, rate: 0.22 },
      { min: 95375, max: 182050, rate: 0.24 },
      { min: 182050, max: 231250, rate: 0.32 },
      { min: 231250, max: 578125, rate: 0.35 },
      { min: 578125, max: Infinity, rate: 0.37 }
    ],
    'married-jointly': [
      { min: 0, max: 22000, rate: 0.10 },
      { min: 22000, max: 89450, rate: 0.12 },
      { min: 89450, max: 190750, rate: 0.22 },
      { min: 190750, max: 364200, rate: 0.24 },
      { min: 364200, max: 462500, rate: 0.32 },
      { min: 462500, max: 693750, rate: 0.35 },
      { min: 693750, max: Infinity, rate: 0.37 }
    ]
  };

  const standardDeductions = {
    single: 13850,
    'married-jointly': 27700
  };

  useEffect(() => {
    calculatePayrollTaxes();
  }, [grossSalary, payFrequency, state, filingStatus, allowances, additionalWithholding]);

  const calculatePayrollTaxes = () => {
    // Calculate taxable income
    const standardDeduction = standardDeductions[filingStatus as keyof typeof standardDeductions] || 13850;
    const taxableIncome = Math.max(0, grossSalary - standardDeduction);

    // Federal income tax calculation
    const brackets = federalBrackets[filingStatus as keyof typeof federalBrackets] || federalBrackets.single;
    let fedTax = 0;
    for (const bracket of brackets) {
      if (taxableIncome > bracket.min) {
        const taxableAtThisBracket = Math.min(taxableIncome - bracket.min, bracket.max - bracket.min);
        fedTax += taxableAtThisBracket * bracket.rate;
      }
    }
    
    // Adjust for allowances and additional withholding
    fedTax = Math.max(0, fedTax - (allowances * 4300) + additionalWithholding);

    // State income tax
    const stateRate = stateTaxRates[state as keyof typeof stateTaxRates] || 0;
    const stateTaxAmount = (taxableIncome * stateRate) / 100;

    // Social Security tax (6.2% up to wage base)
    const ssWageBase = 160200; // 2024 limit
    const ssRate = 0.062;
    const socialSecurityTax = Math.min(grossSalary * ssRate, ssWageBase * ssRate);

    // Medicare tax (1.45% + 0.9% additional for high earners)
    const medicareRate = 0.0145;
    const medicareThreshold = filingStatus === 'married-jointly' ? 250000 : 200000;
    const baseMedicare = grossSalary * medicareRate;
    const additionalMedicare = grossSalary > medicareThreshold ? 
      (grossSalary - medicareThreshold) * 0.009 : 0;

    // Calculate totals
    const totalTaxes = fedTax + stateTaxAmount + socialSecurityTax + baseMedicare + additionalMedicare;
    const takeHome = grossSalary - totalTaxes;

    setFederalTax(fedTax);
    setStateTax(stateTaxAmount);
    setSocialSecurity(socialSecurityTax);
    setMedicare(baseMedicare);
    setMedicareAdditional(additionalMedicare);
    setTotalDeductions(totalTaxes);
    setNetPay(takeHome);
  };

  const getPayPeriodAmount = (annualAmount: number) => {
    const periods = {
      weekly: 52,
      'bi-weekly': 26,
      'semi-monthly': 24,
      monthly: 12,
      quarterly: 4,
      annually: 1
    };
    return annualAmount / (periods[payFrequency as keyof typeof periods] || 12);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPayPeriod = (amount: number) => {
    return formatCurrency(getPayPeriodAmount(amount));
  };

  const taxBreakdownData = [
    {
      name: 'Federal Tax',
      value: federalTax,
      color: '#ef4444'
    },
    {
      name: 'State Tax',
      value: stateTax,
      color: '#f97316'
    },
    {
      name: 'Social Security',
      value: socialSecurity,
      color: '#8b5cf6'
    },
    {
      name: 'Medicare',
      value: medicare + medicareAdditional,
      color: '#06b6d4'
    },
    {
      name: 'Net Pay',
      value: netPay,
      color: '#10b981'
    }
  ];

  const payBreakdownData = [
    {
      name: 'Gross Pay',
      annual: grossSalary,
      payPeriod: getPayPeriodAmount(grossSalary)
    },
    {
      name: 'Federal Tax',
      annual: -federalTax,
      payPeriod: -getPayPeriodAmount(federalTax)
    },
    {
      name: 'State Tax',
      annual: -stateTax,
      payPeriod: -getPayPeriodAmount(stateTax)
    },
    {
      name: 'Social Security',
      annual: -socialSecurity,
      payPeriod: -getPayPeriodAmount(socialSecurity)
    },
    {
      name: 'Medicare',
      annual: -(medicare + medicareAdditional),
      payPeriod: -getPayPeriodAmount(medicare + medicareAdditional)
    },
    {
      name: 'Net Pay',
      annual: netPay,
      payPeriod: getPayPeriodAmount(netPay)
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">
            {formatCurrency(data.value)} ({((data.value / grossSalary) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const getEffectiveTaxRate = () => {
    return ((totalDeductions / grossSalary) * 100).toFixed(1);
  };

  return (
    <>
      <Helmet>
        <title>Payroll Tax Calculator - Social Security & Medicare Tax Calculator | DollarMento</title>
        <meta name="description" content="Calculate payroll taxes including Social Security, Medicare, and unemployment taxes. Understand employer and employee tax obligations and deductions." />
        <meta name="keywords" content="payroll tax calculator, social security tax calculator, medicare tax calculator, unemployment tax calculator, payroll deduction calculator, employer tax calculator" />
        <link rel="canonical" href="https://dollarmento.com/payroll-tax-calculator" />
      </Helmet>
      <TooltipProvider>
      <div className="w-full p-6 space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Payroll Tax Calculator</h1>
          <p className="text-sm text-gray-600">Calculate federal, state, and payroll taxes withheld from your paycheck</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Input Panel - 40% width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Income Information */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Income Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="grossSalary">Annual Gross Salary</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your total annual salary before taxes and deductions</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Input
                    id="grossSalary"
                    type="number"
                    value={grossSalary || ''}
                    onChange={(e) => setGrossSalary(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                    placeholder="$75,000"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label>Pay Frequency</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>How often you receive paychecks</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Select value={payFrequency} onValueChange={setPayFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly (52 pays/year)</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly (26 pays/year)</SelectItem>
                      <SelectItem value="semi-monthly">Semi-monthly (24 pays/year)</SelectItem>
                      <SelectItem value="monthly">Monthly (12 pays/year)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tax Information */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Tax Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label>State</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>State where you work and pay income tax</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="california">California (5.5%)</SelectItem>
                      <SelectItem value="new-york">New York (4.0%)</SelectItem>
                      <SelectItem value="texas">Texas (0% - No Income Tax)</SelectItem>
                      <SelectItem value="florida">Florida (0% - No Income Tax)</SelectItem>
                      <SelectItem value="illinois">Illinois (3.25%)</SelectItem>
                      <SelectItem value="pennsylvania">Pennsylvania (3.07%)</SelectItem>
                      <SelectItem value="ohio">Ohio (2.85%)</SelectItem>
                      <SelectItem value="georgia">Georgia (5.75%)</SelectItem>
                      <SelectItem value="north-carolina">North Carolina (5.25%)</SelectItem>
                      <SelectItem value="michigan">Michigan (4.25%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label>Filing Status</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your tax filing status affects your tax brackets</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Select value={filingStatus} onValueChange={setFilingStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married-jointly">Married Filing Jointly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="allowances">W-4 Allowances</Label>
                      <UITooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Number of withholding allowances on your W-4</p>
                        </TooltipContent>
                      </UITooltip>
                    </div>
                    <Input
                      id="allowances"
                      type="number"
                      value={allowances || ''}
                      onChange={(e) => setAllowances(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                      placeholder="1"
                      min="0"
                      max="10"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="additionalWithholding">Additional Withholding</Label>
                      <UITooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Additional annual federal tax withholding</p>
                        </TooltipContent>
                      </UITooltip>
                    </div>
                    <Input
                      id="additionalWithholding"
                      type="number"
                      value={additionalWithholding || ''}
                      onChange={(e) => setAdditionalWithholding(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                      placeholder="$0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payroll Tax Breakdown */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Percent className="w-4 h-4" />
                  Payroll Tax Rates (2024)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Social Security:</span>
                    <span className="font-medium">6.2% (up to $160,200)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Medicare:</span>
                    <span className="font-medium">1.45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Additional Medicare:</span>
                    <span className="font-medium">0.9% (on income over $200K/$250K)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">State Tax Rate:</span>
                    <span className="font-medium">{stateTaxRates[state as keyof typeof stateTaxRates] || 0}%</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Effective Tax Rate:</span>
                    <span className="text-red-600">{getEffectiveTaxRate()}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How to Use This Calculator */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">How to Use This Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">1.</span>
                    <span>Enter your annual gross salary</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Select your pay frequency and state</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Choose filing status and W-4 allowances</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Review tax withholdings and net pay</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Disclaimers */}
            <Card className="bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Important Disclaimers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• Estimates based on 2024 federal and state tax tables</p>
                  <p>• Does not include pre-tax deductions (401k, health insurance)</p>
                  <p>• Local taxes and SUTA/FUTA not included</p>
                  <p>• Consult payroll professionals for precise calculations</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel - 60% width */}
          <div className="lg:col-span-3 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Annual Net Pay</p>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(netPay)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Per Pay Period</p>
                      <p className="text-2xl font-bold text-blue-600">{formatPayPeriod(netPay)}</p>
                    </div>
                    <Calculator className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Deductions</p>
                      <p className="text-2xl font-bold text-red-600">{formatCurrency(totalDeductions)}</p>
                    </div>
                    <Percent className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Effective Tax Rate</p>
                      <p className="text-2xl font-bold text-purple-600">{getEffectiveTaxRate()}%</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tax Breakdown Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tax & Deduction Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taxBreakdownData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="#fff"
                        strokeWidth={2}
                      >
                        {taxBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                  {taxBreakdownData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span>{item.name}: {formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Tax Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Detailed Tax Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gross Annual Salary:</span>
                    <span className="font-medium">{formatCurrency(grossSalary)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-red-600">
                      <span>Federal Income Tax:</span>
                      <span className="font-medium">{formatCurrency(federalTax)}</span>
                    </div>
                    <div className="flex justify-between text-orange-600">
                      <span>State Income Tax:</span>
                      <span className="font-medium">{formatCurrency(stateTax)}</span>
                    </div>
                    <div className="flex justify-between text-purple-600">
                      <span>Social Security (6.2%):</span>
                      <span className="font-medium">{formatCurrency(socialSecurity)}</span>
                    </div>
                    <div className="flex justify-between text-cyan-600">
                      <span>Medicare (1.45%):</span>
                      <span className="font-medium">{formatCurrency(medicare)}</span>
                    </div>
                    {medicareAdditional > 0 && (
                      <div className="flex justify-between text-cyan-700">
                        <span>Additional Medicare (0.9%):</span>
                        <span className="font-medium">{formatCurrency(medicareAdditional)}</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total Deductions:</span>
                    <span className="text-red-600">{formatCurrency(totalDeductions)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Net Annual Pay:</span>
                    <span className="text-green-600">{formatCurrency(netPay)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pay Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Annual vs Pay Period Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={payBreakdownData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value: number) => [formatCurrency(Math.abs(value)), '']} />
                      <Bar dataKey="annual" fill="#3b82f6" name="Annual" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Educational Content Section */}
        <div className="w-full mt-8 space-y-6">
          {/* Payroll Tax Calculator Guide */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Use the Payroll Calculator and Paycheck Calculator</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Our comprehensive payroll calculator helps you determine exact take-home pay by calculating federal, state, Social Security, and Medicare taxes based on your specific circumstances. This paycheck calculator provides accurate estimates for all pay frequencies.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">1. Enter your annual gross salary</p>
                  <p className="text-sm text-gray-600">2. Select pay frequency and state</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">3. Choose filing status and W-4 allowances</p>
                  <p className="text-sm text-gray-600">4. Review detailed tax withholdings and net pay</p>
                </div>
              </div>
            </div>
          </section>

          {/* Payroll Tax Optimization Strategies */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Payroll Tax Planning and Optimization Strategies</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Maximizing Pre-Tax Benefits</h4>
                <p className="text-sm text-gray-600">
                  Reduce taxable income through 401(k) contributions, health insurance premiums, HSA contributions, and dependent care FSAs. These pre-tax deductions significantly lower your overall tax burden.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Withholding Adjustments</h4>
                <p className="text-sm text-gray-600">
                  Use IRS Form W-4 to optimize paycheck withholdings based on your tax situation. Proper allowance adjustments prevent large refunds (interest-free loans to government) or underpayment penalties.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Social Security Wage Cap</h4>
                <p className="text-sm text-gray-600">
                  Social Security tax applies only to wages up to $168,600 in 2025. High earners see reduced effective payroll tax rates above this threshold, though Medicare tax continues on all wages.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">State Tax Considerations</h4>
                <p className="text-sm text-gray-600">
                  Consider state income tax rates when evaluating job offers or relocating. States like Texas, Florida, and Nevada have no state income tax, while California and New York have higher rates.
                </p>
              </div>
            </div>
          </section>

          {/* Payroll Tax Calculator Pros and Cons */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Payroll Tax Calculator Benefits and Limitations</h3>
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
                  <p className="text-sm text-green-700">✓ Accurate tax calculations based on current federal and state rates</p>
                  <p className="text-sm text-green-700">✓ Instant estimates for different pay frequencies</p>
                  <p className="text-sm text-green-700">✓ Comprehensive breakdown of all tax components</p>
                  <p className="text-sm text-green-700">✓ Helps optimize tax withholdings and financial planning</p>
                  <p className="text-sm text-green-700">✓ Free and accessible for immediate calculations</p>
                </div>
              </div>

              {/* Limitations Section */}
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✗</span>
                  </div>
                  <h4 className="text-xl font-bold text-red-800">Important Disclaimers</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-red-700">✗ Estimates only - not substitute for professional tax advice</p>
                  <p className="text-sm text-red-700">✗ Excludes pre-tax deductions like health insurance and 401k</p>
                  <p className="text-sm text-red-700">✗ Local taxes and SUTA/FUTA not included</p>
                  <p className="text-sm text-red-700">✗ Based on 2024 tax tables - may change annually</p>
                  <p className="text-sm text-red-700">✗ Consult payroll professionals for precise calculations</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg text-center text-white">
            <h3 className="text-xl font-bold mb-2">Optimize Your Paycheck Calculator Strategy Today</h3>
            <p className="text-sm mb-4 opacity-90">
              Use our advanced payroll calculator to determine exact take-home pay and optimize your tax withholdings for maximum financial efficiency.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Calculate Your Payroll Taxes Now
            </Button>
          </section>

          {/* Payroll Tax Calculator Tags */}
          <section className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Related Topics</h4>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#PayrollCalculator</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#PaycheckCalculator</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TaxWithholding</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TakeHomePay</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#PayrollTax</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#SalaryCalculator</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TaxPlanning</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#PersonalFinance</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#FinancialPlanning</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#NetPay</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#IncomeTax</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#W4</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </TooltipProvider>
    </>
  );
}