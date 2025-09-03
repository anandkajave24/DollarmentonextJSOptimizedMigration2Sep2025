import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';
import { Calculator, Car, DollarSign, TrendingUp, Calendar, HelpCircle, AlertTriangle, CheckCircle, Info, Zap, Shield, Fuel, Wrench, ChevronDown } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { SEO } from '../components/SEO';
import { Helmet } from 'react-helmet';

// State-specific data
const US_STATES = {
  'Alabama': { tax: [2.0, 4.0], dmv: 25, insurance: 180 },
  'Alaska': { tax: [0, 0], dmv: 20, insurance: 140 },
  'Arizona': { tax: [5.6, 8.35], dmv: 25, insurance: 160 },
  'Arkansas': { tax: [6.5, 8.5], dmv: 25, insurance: 170 },
  'California': { tax: [7.25, 10.25], dmv: 400, insurance: 240 },
  'Colorado': { tax: [2.9, 8.3], dmv: 75, insurance: 200 },
  'Connecticut': { tax: [6.35, 6.35], dmv: 120, insurance: 220 },
  'Delaware': { tax: [0, 0], dmv: 40, insurance: 180 },
  'Florida': { tax: [6.0, 8.0], dmv: 200, insurance: 250 },
  'Georgia': { tax: [4.0, 8.0], dmv: 20, insurance: 190 },
  'Hawaii': { tax: [4.0, 4.5], dmv: 45, insurance: 160 },
  'Idaho': { tax: [6.0, 8.5], dmv: 25, insurance: 140 },
  'Illinois': { tax: [6.25, 10.25], dmv: 150, insurance: 180 },
  'Indiana': { tax: [7.0, 7.0], dmv: 30, insurance: 160 },
  'Iowa': { tax: [6.0, 7.0], dmv: 25, insurance: 140 },
  'Kansas': { tax: [6.5, 8.5], dmv: 25, insurance: 160 },
  'Kentucky': { tax: [6.0, 6.0], dmv: 25, insurance: 180 },
  'Louisiana': { tax: [4.45, 9.0], dmv: 68, insurance: 220 },
  'Maine': { tax: [5.5, 5.5], dmv: 35, insurance: 120 },
  'Maryland': { tax: [6.0, 6.0], dmv: 135, insurance: 200 },
  'Massachusetts': { tax: [6.25, 6.25], dmv: 75, insurance: 180 },
  'Michigan': { tax: [6.0, 6.0], dmv: 150, insurance: 320 },
  'Minnesota': { tax: [6.875, 7.875], dmv: 75, insurance: 180 },
  'Mississippi': { tax: [7.0, 8.0], dmv: 25, insurance: 170 },
  'Missouri': { tax: [4.225, 8.225], dmv: 25, insurance: 160 },
  'Montana': { tax: [0, 0], dmv: 25, insurance: 140 },
  'Nebraska': { tax: [5.5, 7.0], dmv: 25, insurance: 150 },
  'Nevada': { tax: [6.85, 8.375], dmv: 33, insurance: 220 },
  'New Hampshire': { tax: [0, 0], dmv: 25, insurance: 130 },
  'New Jersey': { tax: [6.625, 6.625], dmv: 60, insurance: 200 },
  'New Mexico': { tax: [5.125, 8.4375], dmv: 25, insurance: 160 },
  'New York': { tax: [4.0, 8.0], dmv: 75, insurance: 220 },
  'North Carolina': { tax: [4.75, 7.0], dmv: 40, insurance: 160 },
  'North Dakota': { tax: [5.0, 7.0], dmv: 5, insurance: 140 },
  'Ohio': { tax: [5.75, 8.0], dmv: 25, insurance: 160 },
  'Oklahoma': { tax: [4.5, 8.5], dmv: 25, insurance: 170 },
  'Oregon': { tax: [0, 0], dmv: 112, insurance: 180 },
  'Pennsylvania': { tax: [6.0, 8.0], dmv: 36, insurance: 180 },
  'Rhode Island': { tax: [7.0, 7.0], dmv: 30, insurance: 200 },
  'South Carolina': { tax: [6.0, 8.0], dmv: 40, insurance: 170 },
  'South Dakota': { tax: [4.0, 6.0], dmv: 25, insurance: 140 },
  'Tennessee': { tax: [7.0, 9.75], dmv: 25, insurance: 160 },
  'Texas': { tax: [6.25, 8.25], dmv: 51, insurance: 180 },
  'Utah': { tax: [5.95, 8.35], dmv: 150, insurance: 160 },
  'Vermont': { tax: [6.0, 7.0], dmv: 76, insurance: 140 },
  'Virginia': { tax: [4.15, 5.75], dmv: 40, insurance: 160 },
  'Washington': { tax: [6.5, 10.4], dmv: 30, insurance: 180 },
  'West Virginia': { tax: [6.0, 7.0], dmv: 30, insurance: 160 },
  'Wisconsin': { tax: [5.0, 5.6], dmv: 75, insurance: 160 },
  'Wyoming': { tax: [4.0, 6.0], dmv: 30, insurance: 140 }
};

// Credit score scenarios
const CREDIT_SCENARIOS = {
  'excellent': { name: 'Excellent (781-850)', newRate: 4.0, usedRate: 5.0, color: '#10b981' },
  'good': { name: 'Good (661-780)', newRate: 6.0, usedRate: 8.0, color: '#3b82f6' },
  'fair': { name: 'Fair (601-660)', newRate: 9.0, usedRate: 12.0, color: '#f59e0b' },
  'poor': { name: 'Poor (500-600)', newRate: 15.0, usedRate: 18.0, color: '#ef4444' },
  'bad': { name: 'Bad (<500)', newRate: 20.0, usedRate: 22.0, color: '#991b1b' }
};

export default function AutoLoanCalculator() {
  // Basic loan inputs
  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(7000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(60);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [fees, setFees] = useState(1500);
  
  // State-specific inputs
  const [selectedState, setSelectedState] = useState('California');
  const [salesTax, setSalesTax] = useState(8.5);
  const [vehicleType, setVehicleType] = useState('new'); // 'new' or 'used'
  const [creditScore, setCreditScore] = useState('good');
  const [isEV, setIsEV] = useState(false);
  
  // Hidden costs
  const [monthlyInsurance, setMonthlyInsurance] = useState(200);
  const [monthlyMaintenance, setMonthlyMaintenance] = useState(150);
  const [monthlyFuel, setMonthlyFuel] = useState(120);
  const [warranty, setWarranty] = useState(0);
  
  // Advanced options
  const [prepayment, setPrepayment] = useState(0);
  const [compareMode, setCompareMode] = useState('terms'); // 'terms', 'credit', 'lease'
  
  // Active tab
  const [activeTab, setActiveTab] = useState('calculator');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // Update sales tax when state changes
  useEffect(() => {
    if (selectedState && US_STATES[selectedState as keyof typeof US_STATES]) {
      const stateData = US_STATES[selectedState as keyof typeof US_STATES];
      setSalesTax((stateData.tax[0] + stateData.tax[1]) / 2);
      setMonthlyInsurance(stateData.insurance);
    }
  }, [selectedState]);

  // Update interest rate based on credit score and vehicle type
  useEffect(() => {
    if (creditScore && CREDIT_SCENARIOS[creditScore as keyof typeof CREDIT_SCENARIOS]) {
      const rate = vehicleType === 'new' 
        ? CREDIT_SCENARIOS[creditScore as keyof typeof CREDIT_SCENARIOS].newRate 
        : CREDIT_SCENARIOS[creditScore as keyof typeof CREDIT_SCENARIOS].usedRate;
      setInterestRate(rate);
    }
  }, [creditScore, vehicleType]);

  const calculateAutoLoan = () => {
    const netVehiclePrice = vehiclePrice - tradeInValue;
    const taxAmount = (netVehiclePrice * salesTax) / 100;
    const stateData = US_STATES[selectedState as keyof typeof US_STATES] || { dmv: 100 };
    const totalPrice = netVehiclePrice + taxAmount + fees + stateData.dmv;
    const loanAmount = Math.max(0, totalPrice - downPayment);
    
    if (loanAmount <= 0) {
      return {
        monthlyPayment: 0,
        totalInterest: 0,
        totalLoanAmount: 0,
        totalCost: totalPrice,
        taxAmount,
        dmvFees: stateData.dmv
      };
    }

    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm;
    
    let payment = 0;
    if (monthlyRate > 0) {
      payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      payment = loanAmount / numPayments;
    }

    // Apply prepayment if any
    let totalPayments = payment * numPayments;
    let interest = totalPayments - loanAmount;
    
    if (prepayment > 0) {
      // Calculate savings from prepayment
      const extraPayment = prepayment;
      const totalWithExtra = payment + extraPayment;
      let balance = loanAmount;
      let months = 0;
      let totalInterestWithPrepay = 0;
      
      while (balance > 0 && months < numPayments) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = Math.min(totalWithExtra - interestPayment, balance);
        totalInterestWithPrepay += interestPayment;
        balance -= principalPayment;
        months++;
      }
      
      interest = totalInterestWithPrepay;
    }

    return {
      monthlyPayment: payment,
      totalInterest: interest,
      totalLoanAmount: loanAmount,
      totalCost: totalPrice,
      taxAmount,
      dmvFees: stateData.dmv
    };
  };

  const calculateLeasing = () => {
    // Simplified leasing calculation
    const residualValue = vehiclePrice * 0.55; // Typical 55% residual for 3 years
    const depreciation = (vehiclePrice - residualValue) / 36;
    const financeCharge = (vehiclePrice + residualValue) * (interestRate / 100) / 24;
    const monthlyLease = depreciation + financeCharge;
    
    return {
      monthlyLease,
      totalLeaseCost: monthlyLease * 36,
      residualValue
    };
  };

  const loan = calculateAutoLoan();
  const lease = calculateLeasing();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get loan scenario comparison data
  const getLoanComparisons = () => {
    const terms = [36, 48, 60, 72, 84];
    return terms.map(term => {
      const loanAmount = Math.max(0, vehiclePrice + (vehiclePrice * salesTax / 100) + fees - downPayment - tradeInValue);
      const monthlyRate = interestRate / 100 / 12;
      const payment = loanAmount > 0 ? 
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
        (Math.pow(1 + monthlyRate, term) - 1) : 0;
      const totalInterest = (payment * term) - loanAmount;
      
      return {
        term,
        monthlyPayment: payment,
        totalInterest,
        totalCost: payment * term,
        label: `${term}mo`
      };
    });
  };

  // Get credit score comparison data
  const getCreditComparisons = () => {
    return Object.entries(CREDIT_SCENARIOS).map(([key, scenario]) => {
      const rate = vehicleType === 'new' ? scenario.newRate : scenario.usedRate;
      const loanAmount = Math.max(0, vehiclePrice + (vehiclePrice * salesTax / 100) + fees - downPayment - tradeInValue);
      const monthlyRate = rate / 100 / 12;
      const payment = loanAmount > 0 ? 
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
        (Math.pow(1 + monthlyRate, loanTerm) - 1) : 0;
      
      return {
        creditScore: scenario.name.split(' ')[0],
        rate: rate,
        monthlyPayment: payment,
        totalInterest: (payment * loanTerm) - loanAmount,
        color: scenario.color
      };
    });
  };

  // Total cost of ownership
  const totalOwnershipCost = loan.monthlyPayment + monthlyInsurance + monthlyMaintenance + monthlyFuel + (warranty / loanTerm);

  // Risk assessment
  const getRiskAssessment = () => {
    const risks = [];
    const benefits = [];
    
    if (interestRate > 15) risks.push("Very high interest rate");
    if (loanTerm > 72) risks.push("Extended loan term increases total cost");
    if (downPayment < vehiclePrice * 0.1) risks.push("Low down payment increases risk");
    if (loan.totalLoanAmount > vehiclePrice * 0.8) risks.push("High loan-to-value ratio");
    
    if (interestRate < 7) benefits.push("Good interest rate");
    if (loanTerm <= 60) benefits.push("Reasonable loan term");
    if (downPayment >= vehiclePrice * 0.2) benefits.push("Strong down payment");
    
    return { risks, benefits };
  };

  const riskAssessment = getRiskAssessment();

  // Chart data
  const chartData = [
    { name: 'Principal', value: loan.totalLoanAmount, color: '#3b82f6' },
    { name: 'Interest', value: loan.totalInterest, color: '#f59e0b' }
  ];

  const ownershipData = [
    { name: 'Loan Payment', value: loan.monthlyPayment, color: '#3b82f6' },
    { name: 'Insurance', value: monthlyInsurance, color: '#10b981' },
    { name: 'Maintenance', value: monthlyMaintenance, color: '#f59e0b' },
    { name: 'Fuel', value: monthlyFuel, color: '#ef4444' },
    { name: 'Warranty', value: warranty / loanTerm, color: '#8b5cf6' }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">{formatCurrency(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Helmet>
        <title>Auto Loan Calculator - Complete Car Financing & Leasing Tool | DollarMento</title>
        <meta name="description" content="Advanced auto loan calculator with state-specific costs, credit score impact, leasing vs buying comparison, and total cost of ownership. Make smarter car financing decisions." />
        <meta name="keywords" content="auto loan calculator, car loan calculator, vehicle financing, car leasing calculator, auto loan rates, down payment calculator, state car tax, credit score impact, total cost ownership, car financing calculator" />
        <link rel="canonical" href="https://dollarmento.com/auto-loan-calculator" />
      </Helmet>
      <TooltipProvider>
        <div className="w-full px-4">
          <div className="mb-8 text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Ultimate Auto Loan Calculator</h1>
            <p className="text-sm text-gray-600 max-w-4xl">
              Complete car financing tool with state-specific costs, credit score impact, leasing comparison, and total ownership costs. Make informed decisions and save thousands on your next vehicle purchase.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="compare">Compare</TabsTrigger>
              <TabsTrigger value="ownership">Total Costs</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Input Panel */}
                <div className="space-y-4">
                  {/* Vehicle & Location */}
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        Vehicle & Location
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Vehicle Type</Label>
                          <Select value={vehicleType} onValueChange={setVehicleType}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New Vehicle</SelectItem>
                              <SelectItem value="used">Used Vehicle</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>State</Label>
                          <Select value={selectedState} onValueChange={setSelectedState}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(US_STATES).map(state => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Label>Vehicle Price</Label>
                            <UITooltip>
                              <TooltipTrigger>
                                <HelpCircle className="w-4 h-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>MSRP or agreed purchase price. Always negotiate 5-10% below MSRP for new cars.</p>
                              </TooltipContent>
                            </UITooltip>
                          </div>
                          <Input
                            type="number"
                            value={vehiclePrice || ''}
                            onChange={(e) => setVehiclePrice(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                            placeholder="$35,000"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Label>Trade-in Value</Label>
                            <UITooltip>
                              <TooltipTrigger>
                                <HelpCircle className="w-4 h-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Check KBB or Edmunds for accurate trade-in values</p>
                              </TooltipContent>
                            </UITooltip>
                          </div>
                          <Input
                            type="number"
                            value={tradeInValue || ''}
                            onChange={(e) => setTradeInValue(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                            placeholder="$0"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Label>Down Payment</Label>
                            <UITooltip>
                              <TooltipTrigger>
                                <HelpCircle className="w-4 h-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Aim for 20% down for new cars, 10% for used to get better rates</p>
                              </TooltipContent>
                            </UITooltip>
                          </div>
                          <Input
                            type="number"
                            value={downPayment || ''}
                            onChange={(e) => setDownPayment(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                            placeholder="$7,000"
                          />
                          <div className="text-xs mt-1">
                            {((downPayment / vehiclePrice) * 100).toFixed(1)}% down
                          </div>
                        </div>
                        <div>
                          <Label>Fees & Add-ons</Label>
                          <Input
                            type="number"
                            value={fees || ''}
                            onChange={(e) => setFees(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                            placeholder="$1,500"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isEV"
                          checked={isEV}
                          onChange={(e) => setIsEV(e.target.checked)}
                          className="rounded"
                        />
                        <Label htmlFor="isEV" className="text-sm">Electric Vehicle (eligible for tax credits)</Label>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Loan Terms */}
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Calculator className="w-4 h-4" />
                        Loan Terms
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Credit Score Range</Label>
                        <Select value={creditScore} onValueChange={setCreditScore}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(CREDIT_SCENARIOS).map(([key, scenario]) => (
                              <SelectItem key={key} value={key}>{scenario.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="text-xs mt-1 text-gray-600">
                          Auto-updates interest rate based on credit score
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Interest Rate (%)</Label>
                          <span className="text-sm font-medium">{interestRate}%</span>
                        </div>
                        <Slider
                          value={[interestRate]}
                          onValueChange={(value) => setInterestRate(value[0])}
                          max={25}
                          min={0.1}
                          step={0.1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                          <span>0.1%</span>
                          <span>25%</span>
                        </div>
                        {interestRate > 15 && (
                          <p className="text-xs text-red-600 mt-1">
                            ⚠️ Warning: &gt;15% APR is very high - consider improving credit first
                          </p>
                        )}
                        {interestRate < 7 && (
                          <p className="text-xs text-green-600 mt-1">
                            ✅ Good Zone: Excellent rate for auto loans
                          </p>
                        )}
                      </div>

                      <div>
                        <Label>Loan Term</Label>
                        <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="36">36 months (3 years)</SelectItem>
                            <SelectItem value="48">48 months (4 years)</SelectItem>
                            <SelectItem value="60">60 months (5 years)</SelectItem>
                            <SelectItem value="72">72 months (6 years)</SelectItem>
                            <SelectItem value="84">84 months (7 years)</SelectItem>
                          </SelectContent>
                        </Select>
                        {loanTerm >= 72 && (
                          <p className="text-xs text-red-600 mt-1">
                            ⚠️ Risk Zone: Longer terms = thousands more in interest
                          </p>
                        )}
                        {loanTerm <= 60 && (
                          <p className="text-xs text-green-600 mt-1">
                            ✅ Good Zone: Reasonable loan term
                          </p>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Sales Tax Rate (%)</Label>
                          <span className="text-sm font-medium">{salesTax.toFixed(2)}%</span>
                        </div>
                        <div className="text-xs text-gray-600 mb-2">
                          Auto-filled for {selectedState}: {US_STATES[selectedState as keyof typeof US_STATES]?.tax[0]}% - {US_STATES[selectedState as keyof typeof US_STATES]?.tax[1]}%
                        </div>
                        <Slider
                          value={[salesTax]}
                          onValueChange={(value) => setSalesTax(value[0])}
                          max={15}
                          min={0}
                          step={0.1}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <Label>Extra Monthly Payment (optional)</Label>
                        <Input
                          type="number"
                          value={prepayment || ''}
                          onChange={(e) => setPrepayment(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                          placeholder="$0"
                          className="mt-1"
                        />
                        {prepayment > 0 && (
                          <div className="text-xs text-green-600 mt-1">
                            Saves ~${((loan.totalInterest * 0.15)).toLocaleString()} in interest
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Results Panel */}
                <div className="space-y-4">
                  {/* Risk Assessment */}
                  <Card className={`shadow-lg ${riskAssessment.risks.length > riskAssessment.benefits.length ? 'bg-red-50' : 'bg-green-50'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        {riskAssessment.risks.length > riskAssessment.benefits.length ? (
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        <h3 className="font-semibold">
                          {riskAssessment.risks.length > riskAssessment.benefits.length ? 'Risk Zone' : 'Good Zone'}
                        </h3>
                      </div>
                      
                      {riskAssessment.benefits.length > 0 && (
                        <div className="mb-2">
                          <h4 className="text-sm font-medium text-green-700 mb-1">✅ Benefits:</h4>
                          {riskAssessment.benefits.map((benefit, index) => (
                            <p key={index} className="text-xs text-green-600">• {benefit}</p>
                          ))}
                        </div>
                      )}
                      
                      {riskAssessment.risks.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-red-700 mb-1">⚠️ Risks:</h4>
                          {riskAssessment.risks.map((risk, index) => (
                            <p key={index} className="text-xs text-red-600">• {risk}</p>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Monthly Payment</p>
                            <p className="text-2xl font-bold text-green-600">{formatCurrency(loan.monthlyPayment)}</p>
                          </div>
                          <DollarSign className="w-8 h-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Total Interest</p>
                            <p className="text-2xl font-bold text-orange-600">{formatCurrency(loan.totalInterest)}</p>
                          </div>
                          <TrendingUp className="w-8 h-8 text-orange-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Loan Amount</p>
                            <p className="text-2xl font-bold text-blue-600">{formatCurrency(loan.totalLoanAmount)}</p>
                          </div>
                          <Calculator className="w-8 h-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Total Cost</p>
                            <p className="text-2xl font-bold text-purple-600">{formatCurrency(loan.totalCost)}</p>
                          </div>
                          <Car className="w-8 h-8 text-purple-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* State-Specific Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">State-Specific Cost Breakdown ({selectedState})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Vehicle Price:</span>
                          <span className="font-medium">{formatCurrency(vehiclePrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Trade-in Value:</span>
                          <span className="font-medium text-green-600">-{formatCurrency(tradeInValue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sales Tax ({salesTax.toFixed(2)}%):</span>
                          <span className="font-medium">{formatCurrency(loan.taxAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>DMV/Registration Fees:</span>
                          <span className="font-medium">{formatCurrency(loan.dmvFees)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dealer Fees:</span>
                          <span className="font-medium">{formatCurrency(fees)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Down Payment:</span>
                          <span className="font-medium text-green-600">-{formatCurrency(downPayment)}</span>
                        </div>
                        {isEV && (
                          <div className="flex justify-between">
                            <span>Federal EV Tax Credit:</span>
                            <span className="font-medium text-green-600">-$7,500</span>
                          </div>
                        )}
                        <div className="border-t pt-2 flex justify-between font-bold">
                          <span>Final Loan Amount:</span>
                          <span>{formatCurrency(loan.totalLoanAmount)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Breakdown Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Payment Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={chartData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={5}
                              dataKey="value"
                              stroke="#fff"
                              strokeWidth={2}
                            >
                              {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">Principal ({formatCurrency(loan.totalLoanAmount)})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-sm">Interest ({formatCurrency(loan.totalInterest)})</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compare">
              <div className="space-y-6">
                <div className="flex gap-4 mb-4">
                  <Button
                    variant={compareMode === 'terms' ? 'default' : 'outline'}
                    onClick={() => setCompareMode('terms')}
                  >
                    Loan Terms
                  </Button>
                  <Button
                    variant={compareMode === 'credit' ? 'default' : 'outline'}
                    onClick={() => setCompareMode('credit')}
                  >
                    Credit Scores
                  </Button>
                  <Button
                    variant={compareMode === 'lease' ? 'default' : 'outline'}
                    onClick={() => setCompareMode('lease')}
                  >
                    Buy vs Lease
                  </Button>
                </div>

                {compareMode === 'terms' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Loan Term Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {getLoanComparisons().map((comparison) => (
                          <div key={comparison.term} className={`p-4 border rounded-lg ${comparison.term === loanTerm ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                            <h3 className="font-semibold text-center mb-2">{comparison.term} months</h3>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-gray-600">Monthly:</span>
                                <div className="font-bold">{formatCurrency(comparison.monthlyPayment)}</div>
                              </div>
                              <div>
                                <span className="text-gray-600">Total Interest:</span>
                                <div className="font-medium text-orange-600">{formatCurrency(comparison.totalInterest)}</div>
                              </div>
                              <div>
                                <span className="text-gray-600">Total Cost:</span>
                                <div className="font-medium">{formatCurrency(comparison.totalCost)}</div>
                              </div>
                            </div>
                            {comparison.term <= 60 && (
                              <div className="text-xs text-green-600 mt-2">✅ Recommended</div>
                            )}
                            {comparison.term >= 72 && (
                              <div className="text-xs text-red-600 mt-2">⚠️ Avoid if possible</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {compareMode === 'credit' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Credit Score Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={getCreditComparisons()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="creditScore" />
                            <YAxis />
                            <Tooltip 
                              formatter={(value) => [formatCurrency(Number(value)), 'Monthly Payment']}
                              labelFormatter={(label) => `Credit Score: ${label}`}
                            />
                            <Bar dataKey="monthlyPayment" fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {getCreditComparisons().map((comparison) => (
                          <div key={comparison.creditScore} className="p-3 border rounded-lg">
                            <h3 className="font-semibold text-center mb-1">{comparison.creditScore}</h3>
                            <div className="text-center text-sm">
                              <div className="font-bold" style={{color: comparison.color}}>
                                {comparison.rate}% APR
                              </div>
                              <div className="text-gray-600">Monthly:</div>
                              <div className="font-medium">{formatCurrency(comparison.monthlyPayment)}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                Interest: {formatCurrency(comparison.totalInterest)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {compareMode === 'lease' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5" />
                          Buying (Financing)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <span className="text-gray-600">Monthly Payment:</span>
                            <div className="text-2xl font-bold text-blue-600">{formatCurrency(loan.monthlyPayment)}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Total Cost ({loanTerm}mo):</span>
                            <div className="font-semibold">{formatCurrency(loan.monthlyPayment * loanTerm)}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Equity After {loanTerm}mo:</span>
                            <div className="font-semibold text-green-600">{formatCurrency(vehiclePrice * 0.4)}</div>
                          </div>
                          <div className="mt-4 p-3 bg-green-50 rounded">
                            <h4 className="font-semibold text-green-800 mb-2">Buying Pros:</h4>
                            <ul className="text-sm text-green-700 space-y-1">
                              <li>• Build equity/ownership</li>
                              <li>• No mileage restrictions</li>
                              <li>• Can modify vehicle</li>
                              <li>• Better long-term value</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          Leasing
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <span className="text-gray-600">Monthly Payment:</span>
                            <div className="text-2xl font-bold text-orange-600">{formatCurrency(lease.monthlyLease)}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Total Cost (36mo):</span>
                            <div className="font-semibold">{formatCurrency(lease.totalLeaseCost)}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Equity After 36mo:</span>
                            <div className="font-semibold text-red-600">$0</div>
                          </div>
                          <div className="mt-4 p-3 bg-orange-50 rounded">
                            <h4 className="font-semibold text-orange-800 mb-2">Leasing Pros:</h4>
                            <ul className="text-sm text-orange-700 space-y-1">
                              <li>• Lower monthly payments</li>
                              <li>• Always under warranty</li>
                              <li>• Drive newer cars</li>
                              <li>• Lower down payment</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="ownership">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Cost of Ownership Calculator</CardTitle>
                    <p className="text-sm text-gray-600">
                      Your car payment is just the beginning. Here's the real monthly cost of owning a vehicle.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-4 h-4" />
                            <Label>Monthly Insurance ({selectedState} avg: ${US_STATES[selectedState as keyof typeof US_STATES]?.insurance})</Label>
                          </div>
                          <Input
                            type="number"
                            value={monthlyInsurance || ''}
                            onChange={(e) => setMonthlyInsurance(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                            placeholder="$200"
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Wrench className="w-4 h-4" />
                            <Label>Monthly Maintenance & Repairs</Label>
                          </div>
                          <Input
                            type="number"
                            value={monthlyMaintenance || ''}
                            onChange={(e) => setMonthlyMaintenance(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                            placeholder="$150"
                          />
                          <div className="text-xs text-gray-600 mt-1">
                            New: $100-150/mo, Used: $150-250/mo
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Fuel className="w-4 h-4" />
                            <Label>Monthly Fuel/Energy</Label>
                          </div>
                          <Input
                            type="number"
                            value={monthlyFuel || ''}
                            onChange={(e) => setMonthlyFuel(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                            placeholder="$120"
                          />
                          <div className="text-xs text-gray-600 mt-1">
                            {isEV ? 'EV: $40-80/mo for electricity' : 'Gas: $100-200/mo depending on driving'}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4" />
                            <Label>Extended Warranty (total cost)</Label>
                          </div>
                          <Input
                            type="number"
                            value={warranty || ''}
                            onChange={(e) => setWarranty(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                            placeholder="$0"
                          />
                          <div className="text-xs text-gray-600 mt-1">
                            Usually $2,000-4,000 total (often not worth it)
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="h-64 mb-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={ownershipData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="#fff"
                                strokeWidth={2}
                              >
                                {ownershipData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="text-center">
                          <div className="text-sm text-gray-600">Total Monthly Cost</div>
                          <div className="text-3xl font-bold text-purple-600">{formatCurrency(totalOwnershipCost)}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            Annual: {formatCurrency(totalOwnershipCost * 12)}
                          </div>
                        </div>

                        <div className="space-y-2 mt-4 text-sm">
                          <div className="flex justify-between">
                            <span>Loan Payment:</span>
                            <span className="font-medium">{formatCurrency(loan.monthlyPayment)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Insurance:</span>
                            <span className="font-medium">{formatCurrency(monthlyInsurance)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Maintenance:</span>
                            <span className="font-medium">{formatCurrency(monthlyMaintenance)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fuel:</span>
                            <span className="font-medium">{formatCurrency(monthlyFuel)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Warranty:</span>
                            <span className="font-medium">{formatCurrency(warranty / loanTerm)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-yellow-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-5 h-5 text-yellow-600" />
                        <h3 className="font-semibold">Hidden Costs Tip</h3>
                      </div>
                      <p className="text-sm text-gray-700">
                        Most people only budget for the loan payment, but the real cost is 40-60% higher when including insurance, maintenance, and fuel.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold">Budget Rule</h3>
                      </div>
                      <p className="text-sm text-gray-700">
                        Keep total transportation costs (loan + insurance + maintenance + fuel) under 20% of your take-home income.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold">Smart Savings</h3>
                      </div>
                      <p className="text-sm text-gray-700">
                        Buying a 2-3 year old car can save $10,000+ in depreciation while still having warranty coverage.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

          </Tabs>

          {/* Educational Content - Compact Blog Style */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="max-w-4xl mx-auto space-y-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Ultimate USA Auto Loan Financing Guide</h2>
                <p className="text-sm text-gray-600">
                  U.S. car buyers do not need to be overwhelmed when financing their next vehicle. You can get a clear understanding of your auto loan terms with our specifically designed auto loan calculator. Whether you're buying your first car or upgrading your current vehicle, this comprehensive auto loan calculator with state-specific costs serves as both an auto loan estimator and a complete financing planning tool. See your monthly payments, total interest costs, and state-specific fees over time.
                </p>
              </div>

              <div className="space-y-4">
                <section>
                  <h3 className="text-base font-bold text-gray-900 mb-2">How to Use This Auto Loan Calculator</h3>
                  
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Basic Vehicle Information</h4>
                      <p className="text-sm text-gray-600">
                        When you begin with the auto loan estimator, provide essential details: vehicle price, down payment amount, trade-in value, and loan term. The calculator will instantly estimate your monthly payment and total cost. Accurate information leads to better financial decisions for your vehicle purchase.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">State-Specific Cost Settings</h4>
                      <p className="text-sm text-gray-600">
                        Your location significantly affects the total cost. Our auto loan calculator includes state-specific sales tax rates, DMV fees, and average insurance costs. For example, buying in Delaware has no sales tax, while California can add over 10% to your total cost. The calculator automatically adjusts these costs based on your selected state.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Credit Score Impact Analysis</h4>
                      <p className="text-sm text-gray-600">
                        Your credit score dramatically affects your interest rate. The calculator shows how different credit scores impact your monthly payment and total interest. A 100-point credit score improvement can save you thousands over the loan term. Use the credit score comparison feature to see the financial benefit of improving your credit before applying.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Total Cost of Ownership Planning</h4>
                      <p className="text-sm text-gray-600">
                        Beyond the loan payment, factor in insurance, maintenance, fuel, and warranties. The total ownership calculator reveals the true monthly cost of vehicle ownership. Most buyers focus only on the loan payment, but the real cost is 40-60% higher when including all ownership expenses.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Understanding Your Auto Loan Results</h3>
                  
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Payment Calculation Results</h4>
                      <p className="text-sm text-gray-600">
                        The calculator provides detailed breakdowns including principal amount, total interest, monthly payment, and final loan cost. It shows state-specific taxes, DMV fees, and dealer costs. The tool highlights how down payment amount affects your monthly obligation and total interest paid over the loan term.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Interest Cost Visualization</h4>
                      <p className="text-sm text-gray-600">
                        Visual charts display the proportion of principal versus interest in your payments. You can see how loan term length affects total interest costs. The calculator demonstrates why shorter terms save money despite higher monthly payments, helping you make informed decisions about loan duration.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Risk Assessment Analysis</h4>
                      <p className="text-sm text-gray-600">
                        The smart risk assessment feature evaluates your loan scenario and identifies potential issues like high interest rates, extended loan terms, or insufficient down payments. It provides actionable recommendations to improve your financing terms and avoid common pitfalls that cost thousands.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Key Benefits of Smart Auto Loan Planning</h3>
                  
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">State Tax Optimization</h4>
                      <p className="text-sm text-gray-600">
                        Understanding state-specific costs helps you plan better. Some states like Montana, New Hampshire, and Delaware have no sales tax on vehicles, potentially saving thousands. If you're relocating, timing your purchase in a tax-friendly state can significantly reduce your total cost.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Credit Score Leverage</h4>
                      <p className="text-sm text-gray-600">
                        Small improvements in credit score create substantial savings. Moving from fair to good credit (660 to 720) can reduce your rate by 3-4%, saving $50-100 monthly on a typical auto loan. The calculator shows exactly how much credit improvement is worth in dollar terms.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Down Payment Strategy</h4>
                      <p className="text-sm text-gray-600">
                        Strategic down payments reduce monthly obligations and interest costs while avoiding negative equity situations. The calculator demonstrates how different down payment amounts affect your loan-to-value ratio and overall financial risk. Higher down payments often qualify you for better interest rates.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Term Length Optimization</h4>
                      <p className="text-sm text-gray-600">
                        Choosing optimal loan terms balances monthly affordability with total cost. While 72-84 month loans offer lower monthly payments, they cost significantly more in interest. The calculator shows how term length affects both monthly cash flow and long-term wealth accumulation.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Personalized Auto Financing Action Plan</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Using our comprehensive auto loan calculator provides clear, actionable steps to optimize your vehicle financing. Follow these strategies to save money and make smarter financing decisions.
                  </p>
                  
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Get Pre-approved Before Shopping</h4>
                      <p className="text-sm text-gray-600">
                        Secure financing from banks, credit unions, or online lenders before visiting dealerships. Pre-approval gives you negotiating power and prevents dealers from marking up your interest rate. Use the calculator to determine your target payment range and stick to your budget.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Research Vehicle Values Thoroughly</h4>
                      <p className="text-sm text-gray-600">
                        Use resources like KBB, Edmunds, and Cargurus to understand fair market values. This knowledge helps you negotiate better prices and avoid overpaying. Enter realistic vehicle prices in the calculator to get accurate payment projections for your budget planning.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Optimize Your Credit Score</h4>
                      <p className="text-sm text-gray-600">
                        Even small credit improvements can save thousands in interest. Pay down credit cards, avoid new credit applications, and check your credit report for errors before applying. Use the credit score comparison feature to see how improvements affect your financing costs.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Plan for Total Ownership Costs</h4>
                      <p className="text-sm text-gray-600">
                        Budget for insurance, maintenance, fuel, and unexpected repairs. Use the total cost of ownership calculator to ensure your transportation budget remains under 20% of take-home income. This prevents financial strain and maintains your long-term financial health.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Auto Loan Benefits and Considerations</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <section className="bg-green-50 p-4 rounded">
                      <h4 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        Benefits
                      </h4>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>✓ Build credit history with consistent payments</li>
                        <li>✓ Competitive interest rates for qualified buyers</li>
                        <li>✓ Preserve cash flow with manageable monthly payments</li>
                        <li>✓ Vehicle ownership and equity building</li>
                        <li>✓ No mileage restrictions or wear charges</li>
                        <li>✓ Freedom to modify or customize vehicle</li>
                        <li>✓ Option to sell or trade anytime</li>
                      </ul>
                    </section>

                    <section className="bg-red-50 p-4 rounded">
                      <h4 className="text-sm font-semibold text-red-800 mb-2 flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✗</span>
                        </div>
                        Considerations
                      </h4>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>✗ Vehicle depreciates faster than loan paydown initially</li>
                        <li>✗ Full coverage insurance required throughout loan term</li>
                        <li>✗ Monthly payment obligation regardless of vehicle condition</li>
                        <li>✗ Interest costs add significantly to total vehicle price</li>
                        <li>✗ Early payoff may include prepayment penalties</li>
                        <li>✗ Negative equity risk with minimal down payment</li>
                        <li>✗ Credit score impact if payments are missed</li>
                      </ul>
                    </section>
                  </div>
                </section>

                <section>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Why Use an Auto Loan Calculator?</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Calculator className="w-8 h-8 text-blue-600 mb-2" />
                      <h4 className="text-sm font-semibold mb-1">Financial Planning</h4>
                      <p className="text-xs text-gray-600">
                        Visualize your auto loan costs and plan accordingly for your vehicle budget and total transportation expenses.
                      </p>
                    </div>
                    <div>
                      <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
                      <h4 className="text-sm font-semibold mb-1">Smart Decisions</h4>
                      <p className="text-xs text-gray-600">
                        Make informed choices about loan terms, down payments, and vehicle selection based on accurate calculations.
                      </p>
                    </div>
                    <div>
                      <DollarSign className="w-8 h-8 text-purple-600 mb-2" />
                      <h4 className="text-sm font-semibold mb-1">Cost Optimization</h4>
                      <p className="text-xs text-gray-600">
                        Compare different scenarios to find the most cost-effective financing strategy for your situation.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Frequently Asked Questions</h3>
                  
                  <div className="space-y-2">
                    <div className="border border-gray-200 rounded">
                      <button 
                        onClick={() => setOpenFaq(openFaq === 'credit' ? null : 'credit')}
                        className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 flex justify-between items-center"
                      >
                        What credit score do I need for a good auto loan rate?
                        <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === 'credit' ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === 'credit' && (
                        <div className="px-3 pb-2">
                          <p className="text-xs text-gray-600">
                            Credit scores above 720 typically qualify for the best rates (3-6% APR). Scores 620-719 get moderate rates (6-12% APR), while scores below 620 may face higher rates (12-20% APR) or require cosigners.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="border border-gray-200 rounded">
                      <button 
                        onClick={() => setOpenFaq(openFaq === 'downPayment' ? null : 'downPayment')}
                        className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 flex justify-between items-center"
                      >
                        How much should I put down on a car loan?
                        <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === 'downPayment' ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === 'downPayment' && (
                        <div className="px-3 pb-2">
                          <p className="text-xs text-gray-600">
                            Aim for 20% down on new cars and 10% down on used cars. Higher down payments reduce monthly payments, lower interest rates, and prevent negative equity situations where you owe more than the car's worth.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="border border-gray-200 rounded">
                      <button 
                        onClick={() => setOpenFaq(openFaq === 'terms' ? null : 'terms')}
                        className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 flex justify-between items-center"
                      >
                        What's the ideal auto loan term length?
                        <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === 'terms' ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === 'terms' && (
                        <div className="px-3 pb-2">
                          <p className="text-xs text-gray-600">
                            36-60 months offers the best balance of affordability and total cost. Avoid 72-84 month loans despite lower monthly payments, as they cost significantly more in interest and increase negative equity risk.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="border border-gray-200 rounded">
                      <button 
                        onClick={() => setOpenFaq(openFaq === 'financing' ? null : 'financing')}
                        className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 flex justify-between items-center"
                      >
                        Should I finance through the dealer or my bank?
                        <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === 'financing' ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === 'financing' && (
                        <div className="px-3 pb-2">
                          <p className="text-xs text-gray-600">
                            Get pre-approved from banks, credit unions, and online lenders first, then compare with dealer financing. Dealers sometimes offer promotional rates, but they may also mark up rates for profit. Having external pre-approval gives you leverage.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="border border-gray-200 rounded">
                      <button 
                        onClick={() => setOpenFaq(openFaq === 'accuracy' ? null : 'accuracy')}
                        className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 flex justify-between items-center"
                      >
                        How accurate are auto loan calculator projections?
                        <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === 'accuracy' ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === 'accuracy' && (
                        <div className="px-3 pb-2">
                          <p className="text-xs text-gray-600">
                            Our calculator provides highly accurate estimates based on current market rates and state-specific costs. Final rates depend on your exact credit profile, chosen lender, and vehicle details, but projections typically vary by less than 0.5% APR.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* Enhanced Call-to-Action */}
                <section className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded text-center mt-8">
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    Use the Auto Loan Calculator Today for Smart Financing
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Take control of your vehicle financing with our comprehensive auto loan calculator and start making informed decisions that save you money.
                  </p>
                  <Button 
                    onClick={() => {
                      setActiveTab('calculator');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                  >
                    Calculate Your Auto Loan Now
                  </Button>
                </section>

                <section>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Related Topics</h3>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">#AutoLoanCalculator</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">#CarFinancing</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">#VehicleLoans</span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">#AutoRates</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full">#CarBuying</span>
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">#CreditScore</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">#DownPayment</span>
                    <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full">#LoanTerms</span>
                    <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full">#StateSpecificCosts</span>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">#TotalCostOwnership</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">#LeaseVsBuy</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">#SmartFinancing</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">#AutoDeals</span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">#CarInsurance</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full">#VehicleValue</span>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </>
  );
}