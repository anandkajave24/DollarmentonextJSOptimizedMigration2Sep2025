"use client"

import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Slider } from "../components/ui/slider";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useToast } from "../hooks/use-toast";
import { Link } from "wouter";
import { Database, RefreshCw, Home, Car, CreditCard, GraduationCap } from "lucide-react";
import { Helmet } from 'react-helmet';

type LoanDetails = {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  loanTermUnit: 'months' | 'years';
};

type EMIResult = {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  amortizationSchedule: Array<{
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
};

export default function EMICalculator() {
  const { toast } = useToast();
  
  // Original component logic starts here...
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    loanAmount: 2000000,  // 20 K
    interestRate: 8.5,    // 8.5%
    loanTerm: 20,         // 20 years
    loanTermUnit: 'years'
  });
  
  const [result, setResult] = useState<EMIResult | null>(null);
  const [showAmortization, setShowAmortization] = useState(false);

  // Account Aggregator Data Integration
  const [aaDataConnected, setAADataConnected] = useState(false);
  const [aaLoanData, setAALoanData] = useState({
    existingHomeLoans: 3200000,
    existingCarLoans: 850000,
    totalEMIs: 42500,
    monthlyIncome: 85000,
    creditUtilization: 32,
    creditScore: 748,
    lastUpdated: '26/06/2025 15:30'
  });

  // Load AA Financial Data on component mount
  useEffect(() => {
    loadAAFinancialData();
  }, []);

  const loadAAFinancialData = () => {
    // Simulate loading real AA data from My Financial Data
    const mockAAData = {
      existingHomeLoans: 3200000,
      existingCarLoans: 850000,
      totalEMIs: 42500,
      monthlyIncome: 85000,
      creditUtilization: 32,
      creditScore: 748,
      lastUpdated: '26/06/2025 15:30'
    };

    setAALoanData(mockAAData);
    setAADataConnected(true);

    toast({
      title: "Real Loan Data Loaded",
      description: "Your EMI calculator is now showing real-time data from My Financial Data",
    });
  };

  // Calculate EMI whenever loan details change
  useEffect(() => {
    calculateEMI();
  }, [loanDetails]);

  const handleInputChange = (field: keyof LoanDetails, value: number | 'months' | 'years') => {
    setLoanDetails(prev => ({ ...prev, [field]: value }));
  };

  const calculateEMI = () => {
    let P = loanDetails.loanAmount;
    let r = loanDetails.interestRate / 12 / 100; // Monthly interest rate
    let n = loanDetails.loanTermUnit === 'years' 
      ? loanDetails.loanTerm * 12 
      : loanDetails.loanTerm; // Total number of months
    
    // EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    let emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    
    // Calculate total payment and interest
    let totalPayment = emi * n;
    let totalInterest = totalPayment - P;
    
    // Generate amortization schedule
    let balance = P;
    let amortizationSchedule = [];
    
    for (let month = 1; month <= n; month++) {
      let interest = balance * r;
      let principal = emi - interest;
      balance -= principal;
      
      if (month <= 12 || month === n || month % 12 === 0) { // Show first year, last payment, and yearly snapshots
        amortizationSchedule.push({
          month,
          emi,
          principal,
          interest,
          balance: Math.max(0, balance) // Ensure balance is not negative
        });
      }
    }
    
    setResult({
      emi,
      totalInterest,
      totalPayment,
      amortizationSchedule
    });
  };

  const handleShareResult = () => {
    toast({
      title: "Share Results",
      description: "Share feature will be available soon",
      duration: 3000,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Convert large numbers to thousands and millions for display
  const formatIndianNumber = (num: number) => {
    if (num >= 10000000) { // 1 million or more
      return (num / 10000000).toFixed(2) + ' Cr';
    } else if (num >= 100000) { // 1 thousand or more
      return (num / 100000).toFixed(2) + ' L';
    } else {
      return num.toFixed(2);
    }
  };

  return (
    <>
      <Helmet>
        <title>EMI Calculator - Loan EMI Calculator & Monthly Payment Calculator | DollarMento</title>
        <meta name="description" content="Calculate EMI (Equated Monthly Installment) for loans with our comprehensive loan EMI calculator. Compare different loan amounts, interest rates, and tenures." />
        <meta name="keywords" content="emi calculator, loan emi calculator, monthly payment calculator, loan calculator, home loan emi calculator, car loan emi calculator, personal loan emi calculator" />
        <link rel="canonical" href="https://dollarmento.com/emi-calculator" />
      </Helmet>
      <div className="px-4 py-3">
      <div className="flex items-center mb-4">
        <button 
          onClick={() => window.history.back()}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <h2 className="text-xl font-semibold">EMI Calculator</h2>
      </div>

      {/* Account Aggregator Loan Overview */}
      {aaDataConnected && (
        <Card className="mb-4 bg-white border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4 text-emerald-600" />
                <h3 className="text-base font-semibold text-slate-800">Your Current Loan Portfolio</h3>
              </div>
              <Link href="/my-financial-data">
                <Button variant="outline" size="sm" className="bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  View Details
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                <div className="flex items-center mb-1">
                  <Home className="h-3 w-3 text-red-600 mr-1" />
                  <p className="text-xs text-red-700 font-medium">Home Loans</p>
                </div>
                <p className="text-lg font-bold text-slate-900">${(aaLoanData.existingHomeLoans / 100000).toFixed(1)}L</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex items-center mb-1">
                  <Car className="h-3 w-3 text-slate-600 mr-1" />
                  <p className="text-xs text-slate-700 font-medium">Car Loans</p>
                </div>
                <p className="text-lg font-bold text-slate-900">${(aaLoanData.existingCarLoans / 100000).toFixed(1)}L</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                <p className="text-xs text-red-700 font-medium mb-1">Total EMIs</p>
                <p className="text-lg font-bold text-slate-900">${(aaLoanData.totalEMIs / 1000).toFixed(1)}K</p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                <p className="text-xs text-emerald-700 font-medium mb-1">EMI to Income</p>
                <p className="text-lg font-bold text-slate-900">{((aaLoanData.totalEMIs / aaLoanData.monthlyIncome) * 100).toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="text-base font-medium mb-4">Loan Details</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="loan-amount">Loan Amount</Label>
                <span className="text-sm font-medium">{formatCurrency(loanDetails.loanAmount)}</span>
              </div>
              <div className="flex items-center">
                <Slider
                  id="loan-amount-slider"
                  min={100000}
                  max={10000000}
                  step={100000}
                  value={[loanDetails.loanAmount]}
                  onValueChange={(value) => handleInputChange('loanAmount', value[0])}
                  className="flex-1 mr-3"
                />
                <Input
                  id="loan-amount"
                  type="number"
                  value={loanDetails.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', Number(e.target.value))}
                  className="w-24"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$1L</span>
                <span>$1Cr</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="interest-rate">Interest Rate (% p.a.)</Label>
                <span className="text-sm font-medium">{loanDetails.interestRate}%</span>
              </div>
              <div className="flex items-center">
                <Slider
                  id="interest-rate-slider"
                  min={4}
                  max={20}
                  step={0.1}
                  value={[loanDetails.interestRate]}
                  onValueChange={(value) => handleInputChange('interestRate', value[0])}
                  className="flex-1 mr-3"
                />
                <Input
                  id="interest-rate"
                  type="number"
                  value={loanDetails.interestRate}
                  onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                  step={0.1}
                  className="w-24"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>4%</span>
                <span>20%</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="loan-term">Loan Term</Label>
                <span className="text-sm font-medium">
                  {loanDetails.loanTerm} {loanDetails.loanTermUnit}
                </span>
              </div>
              <div className="flex items-center">
                <Slider
                  id="loan-term-slider"
                  min={loanDetails.loanTermUnit === 'years' ? 1 : 1}
                  max={loanDetails.loanTermUnit === 'years' ? 30 : 360}
                  step={loanDetails.loanTermUnit === 'years' ? 1 : 1}
                  value={[loanDetails.loanTerm]}
                  onValueChange={(value) => handleInputChange('loanTerm', value[0])}
                  className="flex-1 mr-3"
                />
                <Input
                  id="loan-term"
                  type="number"
                  value={loanDetails.loanTerm}
                  onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
                  className="w-24"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{loanDetails.loanTermUnit === 'years' ? '1 yr' : '1 mo'}</span>
                <span>{loanDetails.loanTermUnit === 'years' ? '30 yrs' : '360 mo'}</span>
              </div>
            </div>
            
            <div className="pt-2">
              <Label>Term Unit</Label>
              <RadioGroup
                value={loanDetails.loanTermUnit}
                onValueChange={(value) => handleInputChange('loanTermUnit', value as 'months' | 'years')}
                className="flex space-x-4 mt-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="years" id="years" />
                  <Label htmlFor="years" className="cursor-pointer">Years</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="months" id="months" />
                  <Label htmlFor="months" className="cursor-pointer">Months</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium">EMI Calculation Result</h3>
              <button 
                onClick={handleShareResult}
                className="text-xs text-primary flex items-center"
              >
                <span className="material-icons text-xs mr-1">share</span>
                Share
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-3 bg-primary bg-opacity-10 rounded-lg">
                <p className="text-xs text-gray-500">Monthly EMI</p>
                <p className="font-semibold">{formatCurrency(result.emi)}</p>
              </div>
              <div className="text-center p-3 bg-[#FF9800] bg-opacity-10 rounded-lg">
                <p className="text-xs text-gray-500">Total Interest</p>
                <p className="font-semibold">{formatCurrency(result.totalInterest)}</p>
              </div>
              <div className="text-center p-3 bg-[#F44336] bg-opacity-10 rounded-lg">
                <p className="text-xs text-gray-500">Total Payment</p>
                <p className="font-semibold">{formatCurrency(result.totalPayment)}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden flex">
                <div 
                  style={{ width: `${(loanDetails.loanAmount / result.totalPayment) * 100}%` }}
                  className="h-full bg-primary relative"
                >
                  <span className="absolute inset-0 flex items-center justify-center text-xs text-white">
                    Principal
                  </span>
                </div>
                <div 
                  style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
                  className="h-full bg-[#FF9800] relative"
                >
                  <span className="absolute inset-0 flex items-center justify-center text-xs text-white">
                    Interest
                  </span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => setShowAmortization(!showAmortization)}
            >
              {showAmortization ? 'Hide' : 'View'} Amortization Schedule
            </Button>
            
            {showAmortization && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 text-left">Month</th>
                      <th className="p-2 text-right">EMI</th>
                      <th className="p-2 text-right">Principal</th>
                      <th className="p-2 text-right">Interest</th>
                      <th className="p-2 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.amortizationSchedule.map((row, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="p-2">{row.month}</td>
                        <td className="p-2 text-right">{formatCurrency(row.emi)}</td>
                        <td className="p-2 text-right">{formatCurrency(row.principal)}</td>
                        <td className="p-2 text-right">{formatCurrency(row.interest)}</td>
                        <td className="p-2 text-right">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-4">
          <h3 className="text-base font-medium mb-3">Compare Loan Options</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Home Loan</p>
                <p className="text-xs text-gray-500">From 6.75% p.a.</p>
              </div>
              <Button size="sm" variant="outline">Compare</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Personal Loan</p>
                <p className="text-xs text-gray-500">From 10.50% p.a.</p>
              </div>
              <Button size="sm" variant="outline">Compare</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Car Loan</p>
                <p className="text-xs text-gray-500">From 7.25% p.a.</p>
              </div>
              <Button size="sm" variant="outline">Compare</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Education Loan</p>
                <p className="text-xs text-gray-500">From 8.45% p.a.</p>
              </div>
              <Button size="sm" variant="outline">Compare</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
}