import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend } from 'recharts';
import { Calculator, DollarSign, TrendingUp, Clock, Percent, HelpCircle, PieChart as PieChartIcon, BarChart3, Target, CreditCard, GraduationCap, Building } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { SEO } from '../components/SEO';
import { Helmet } from 'react-helmet';

export default function CompoundInterestCalculator() {
  // Core calculation inputs
  const [principal, setPrincipal] = useState(10000);
  const [annualRate, setAnnualRate] = useState(7);
  const [years, setYears] = useState(30);
  const [compoundingFreq, setCompoundingFreq] = useState(12); // Monthly
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [contributionFreq, setContributionFreq] = useState<'monthly' | 'yearly'>('monthly');
  
  // USA-specific features
  const [inflationRate, setInflationRate] = useState(3);
  const [taxEnabled, setTaxEnabled] = useState(false);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married_jointly' | 'married_separately' | 'head_household'>('single');
  const [state, setState] = useState('tx'); // Default to Texas (no state tax)
  const [currentIncome, setCurrentIncome] = useState(75000);
  
  // Calculator modes
  const [calculatorMode, setCalculatorMode] = useState<'investment' | 'debt' | 'college' | 'retirement' | 'goal'>('investment');
  const [compareMode, setCompareMode] = useState(false);
  
  // Savings goal tracker
  const [savingsGoal, setSavingsGoal] = useState(1000000);
  const [targetAge, setTargetAge] = useState(65);
  const [currentAge, setCurrentAge] = useState(25);
  
  // Scenario comparison
  const [scenario1, setScenario1] = useState({ name: 'Scenario A', rate: 7, contribution: 500 });
  const [scenario2, setScenario2] = useState({ name: 'Scenario B', rate: 9, contribution: 300 });
  
  // Chart preferences
  const [chartType, setChartType] = useState<'line' | 'pie' | 'bar'>('line');
  
  // Results
  const [results, setResults] = useState({
    futureValue: 0,
    totalContributions: 0,
    totalInterest: 0,
    inflationAdjustedValue: 0,
    afterTaxValue: 0,
    monthsToGoal: 0,
    requiredMonthlyPayment: 0
  });

  // USA Federal Tax Brackets 2025
  const getFederalTaxBrackets = () => {
    const brackets = {
      single: [
        { min: 0, max: 11925, rate: 0.10 },
        { min: 11925, max: 48475, rate: 0.12 },
        { min: 48475, max: 103350, rate: 0.22 },
        { min: 103350, max: 197300, rate: 0.24 },
        { min: 197300, max: 250525, rate: 0.32 },
        { min: 250525, max: 626350, rate: 0.35 },
        { min: 626350, max: Infinity, rate: 0.37 }
      ],
      married_jointly: [
        { min: 0, max: 23850, rate: 0.10 },
        { min: 23850, max: 96950, rate: 0.12 },
        { min: 96950, max: 206700, rate: 0.22 },
        { min: 206700, max: 394600, rate: 0.24 },
        { min: 394600, max: 501050, rate: 0.32 },
        { min: 501050, max: 751600, rate: 0.35 },
        { min: 751600, max: Infinity, rate: 0.37 }
      ],
      married_separately: [
        { min: 0, max: 11925, rate: 0.10 },
        { min: 11925, max: 48475, rate: 0.12 },
        { min: 48475, max: 103350, rate: 0.22 },
        { min: 103350, max: 197300, rate: 0.24 },
        { min: 197300, max: 250525, rate: 0.32 },
        { min: 250525, max: 375800, rate: 0.35 },
        { min: 375800, max: Infinity, rate: 0.37 }
      ],
      head_household: [
        { min: 0, max: 17000, rate: 0.10 },
        { min: 17000, max: 65400, rate: 0.12 },
        { min: 65400, max: 103350, rate: 0.22 },
        { min: 103350, max: 197300, rate: 0.24 },
        { min: 197300, max: 250500, rate: 0.32 },
        { min: 250500, max: 626350, rate: 0.35 },
        { min: 626350, max: Infinity, rate: 0.37 }
      ]
    };
    return brackets[filingStatus] || brackets.single;
  };

  // USA State Tax Data
  const getStateData = () => ({
    al: { name: 'Alabama', rate: 0.05, hasStateTax: true },
    ak: { name: 'Alaska', rate: 0, hasStateTax: false },
    az: { name: 'Arizona', rate: 0.025, hasStateTax: true },
    ar: { name: 'Arkansas', rate: 0.0590, hasStateTax: true },
    ca: { name: 'California', rate: 0.133, hasStateTax: true },
    co: { name: 'Colorado', rate: 0.044, hasStateTax: true },
    ct: { name: 'Connecticut', rate: 0.0699, hasStateTax: true },
    de: { name: 'Delaware', rate: 0.066, hasStateTax: true },
    fl: { name: 'Florida', rate: 0, hasStateTax: false },
    ga: { name: 'Georgia', rate: 0.0575, hasStateTax: true },
    hi: { name: 'Hawaii', rate: 0.11, hasStateTax: true },
    id: { name: 'Idaho', rate: 0.058, hasStateTax: true },
    il: { name: 'Illinois', rate: 0.0495, hasStateTax: true },
    in: { name: 'Indiana', rate: 0.0323, hasStateTax: true },
    ia: { name: 'Iowa', rate: 0.0853, hasStateTax: true },
    ks: { name: 'Kansas', rate: 0.057, hasStateTax: true },
    ky: { name: 'Kentucky', rate: 0.045, hasStateTax: true },
    la: { name: 'Louisiana', rate: 0.0425, hasStateTax: true },
    me: { name: 'Maine', rate: 0.0715, hasStateTax: true },
    md: { name: 'Maryland', rate: 0.0575, hasStateTax: true },
    ma: { name: 'Massachusetts', rate: 0.05, hasStateTax: true },
    mi: { name: 'Michigan', rate: 0.0425, hasStateTax: true },
    mn: { name: 'Minnesota', rate: 0.0985, hasStateTax: true },
    ms: { name: 'Mississippi', rate: 0.05, hasStateTax: true },
    mo: { name: 'Missouri', rate: 0.054, hasStateTax: true },
    mt: { name: 'Montana', rate: 0.0675, hasStateTax: true },
    ne: { name: 'Nebraska', rate: 0.0684, hasStateTax: true },
    nv: { name: 'Nevada', rate: 0, hasStateTax: false },
    nh: { name: 'New Hampshire', rate: 0.04, hasStateTax: true },
    nj: { name: 'New Jersey', rate: 0.1075, hasStateTax: true },
    nm: { name: 'New Mexico', rate: 0.0590, hasStateTax: true },
    ny: { name: 'New York', rate: 0.109, hasStateTax: true },
    nc: { name: 'North Carolina', rate: 0.0475, hasStateTax: true },
    nd: { name: 'North Dakota', rate: 0.0264, hasStateTax: true },
    oh: { name: 'Ohio', rate: 0.0399, hasStateTax: true },
    ok: { name: 'Oklahoma', rate: 0.05, hasStateTax: true },
    or: { name: 'Oregon', rate: 0.099, hasStateTax: true },
    pa: { name: 'Pennsylvania', rate: 0.0307, hasStateTax: true },
    ri: { name: 'Rhode Island', rate: 0.0599, hasStateTax: true },
    sc: { name: 'South Carolina', rate: 0.07, hasStateTax: true },
    sd: { name: 'South Dakota', rate: 0, hasStateTax: false },
    tn: { name: 'Tennessee', rate: 0, hasStateTax: false },
    tx: { name: 'Texas', rate: 0, hasStateTax: false },
    ut: { name: 'Utah', rate: 0.0495, hasStateTax: true },
    vt: { name: 'Vermont', rate: 0.0875, hasStateTax: true },
    va: { name: 'Virginia', rate: 0.0575, hasStateTax: true },
    wa: { name: 'Washington', rate: 0, hasStateTax: false },
    wv: { name: 'West Virginia', rate: 0.065, hasStateTax: true },
    wi: { name: 'Wisconsin', rate: 0.0765, hasStateTax: true },
    wy: { name: 'Wyoming', rate: 0, hasStateTax: false }
  });

  // USA Investment Rate Benchmarks
  const getUSABenchmarks = () => [
    { name: 'Savings Account', rate: 0.45, min: 0.01, max: 0.5, description: 'FDIC insured, instant access', risk: 'Very Low' },
    { name: 'High-Yield Savings', rate: 4.5, min: 4.0, max: 5.0, description: 'Online banks, FDIC insured', risk: 'Very Low' },
    { name: 'Money Market', rate: 4.2, min: 3.5, max: 4.8, description: 'Higher yield, some restrictions', risk: 'Very Low' },
    { name: 'CDs (1-5 years)', rate: 4.0, min: 1.0, max: 5.0, description: 'Guaranteed return, penalty for early withdrawal', risk: 'Very Low' },
    { name: 'Government Bonds', rate: 4.5, min: 3.0, max: 5.0, description: 'Treasury bills, notes, and bonds', risk: 'Low' },
    { name: 'Corporate Bonds', rate: 5.5, min: 4.0, max: 7.0, description: 'Higher yield than government bonds', risk: 'Medium' },
    { name: 'Bond Index Funds', rate: 4.8, min: 3.5, max: 6.0, description: 'Diversified bond portfolio', risk: 'Low-Medium' },
    { name: 'Balanced Funds', rate: 6.5, min: 5.0, max: 8.0, description: '60% stocks, 40% bonds mix', risk: 'Medium' },
    { name: 'Target Date Funds', rate: 7.5, min: 6.0, max: 9.0, description: 'Automatically adjusts allocation', risk: 'Medium' },
    { name: 'S&P 500 Index', rate: 10.0, min: 7.0, max: 12.0, description: 'Historical average since 1926', risk: 'High' },
    { name: 'Total Stock Market', rate: 9.5, min: 6.5, max: 12.5, description: 'Broad US stock market exposure', risk: 'High' },
    { name: 'Real Estate (REITs)', rate: 8.0, min: 5.0, max: 11.0, description: 'Real estate investment trusts', risk: 'Medium-High' },
    { name: 'International Stocks', rate: 8.5, min: 5.0, max: 12.0, description: 'Global market diversification', risk: 'High' },
    { name: 'Small Cap Stocks', rate: 11.0, min: 7.0, max: 15.0, description: 'Higher growth potential', risk: 'Very High' }
  ];

  // Calculate federal tax using progressive brackets
  const calculateFederalTax = (income: number) => {
    const brackets = getFederalTaxBrackets();
    let tax = 0;
    let remainingIncome = income;

    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;
      
      const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
      tax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
    }

    return tax;
  };

  // Calculate state tax
  const calculateStateTax = (income: number) => {
    const stateData = getStateData()[state as keyof ReturnType<typeof getStateData>];
    if (!stateData?.hasStateTax) return 0;
    
    // Simplified calculation using top marginal rate
    return income * stateData.rate * 0.7; // Approximate effective rate
  };

  // Calculate capital gains tax rate based on income
  const getCapitalGainsRate = () => {
    if (currentIncome <= 47025) return 0; // 0% for low income
    if (currentIncome <= 518900) return 0.15; // 15% for middle income
    return 0.20; // 20% for high income
  };

  // Core compound interest calculation
  const calculateCompoundInterest = () => {
    const P = principal;
    const r = annualRate / 100;
    const n = compoundingFreq;
    const t = years;
    
    // Calculate future value of principal: A = P(1 + r/n)^(nt)
    const principalFV = P * Math.pow(1 + r/n, n * t);
    
    // Calculate future value of contributions (annuity)
    let contributionsFV = 0;
    let totalContributions = P;
    
    if (monthlyContribution > 0) {
      const monthlyRate = r / 12;
      const totalMonths = t * 12;
      
      if (contributionFreq === 'monthly') {
        // Future value of ordinary annuity: PMT * [((1+r)^n - 1) / r]
        contributionsFV = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
        totalContributions += monthlyContribution * totalMonths;
      } else {
        // Yearly contributions
        const yearlyContribution = monthlyContribution * 12;
        contributionsFV = yearlyContribution * ((Math.pow(1 + r, t) - 1) / r);
        totalContributions += yearlyContribution * t;
      }
    }
    
    const futureValue = principalFV + contributionsFV;
    const totalInterest = futureValue - totalContributions;
    
    // Calculate inflation-adjusted value
    const inflationAdjustedValue = futureValue / Math.pow(1 + inflationRate/100, t);
    
    // Calculate after-tax value
    let afterTaxValue = futureValue;
    if (taxEnabled) {
      switch (calculatorMode) {
        case 'investment':
          // Taxable account - capital gains tax on gains only
          const capitalGainsRate = getCapitalGainsRate();
          afterTaxValue = totalContributions + (totalInterest * (1 - capitalGainsRate));
          break;
        case 'retirement':
          // Traditional IRA/401k - ordinary income tax on entire withdrawal
          const federalTax = calculateFederalTax(futureValue);
          const stateTax = calculateStateTax(futureValue);
          afterTaxValue = futureValue - federalTax - stateTax;
          break;
        case 'college':
          // 529 Plan - tax-free for qualified education expenses
          afterTaxValue = futureValue;
          break;
        case 'debt':
          // Credit card debt grows with compound interest
          afterTaxValue = futureValue; // No tax benefit for debt
          break;
      }
    }

    // Goal calculation - how much to invest monthly to reach target
    const goalYears = targetAge - currentAge;
    const goalMonths = goalYears * 12;
    const goalMonthlyRate = r / 12;
    
    // Calculate required monthly payment to reach savings goal
    const futureValueOfPrincipal = P * Math.pow(1 + goalMonthlyRate, goalMonths);
    const remainingGoal = Math.max(0, savingsGoal - futureValueOfPrincipal);
    const requiredMonthlyPayment = remainingGoal / ((Math.pow(1 + goalMonthlyRate, goalMonths) - 1) / goalMonthlyRate);

    setResults({
      futureValue: futureValue,
      totalContributions: totalContributions,
      totalInterest: totalInterest,
      inflationAdjustedValue: inflationAdjustedValue,
      afterTaxValue: afterTaxValue,
      monthsToGoal: goalYears * 12,
      requiredMonthlyPayment: isFinite(requiredMonthlyPayment) ? requiredMonthlyPayment : 0
    });
  };

  // Scenario comparison calculation
  const calculateScenarioComparison = () => {
    const scenarios = [scenario1, scenario2];
    return scenarios.map(scenario => {
      const r = scenario.rate / 100;
      const P = principal;
      const t = years;
      const PMT = scenario.contribution;
      
      const principalFV = P * Math.pow(1 + r/12, 12 * t);
      const contributionsFV = PMT * ((Math.pow(1 + r/12, 12 * t) - 1) / (r/12));
      const totalFV = principalFV + contributionsFV;
      const totalContrib = P + (PMT * 12 * t);
      const totalInterest = totalFV - totalContrib;
      
      return {
        name: scenario.name,
        futureValue: totalFV,
        totalContributions: totalContrib,
        totalInterest: totalInterest,
        rate: scenario.rate,
        monthlyPayment: scenario.contribution
      };
    });
  };

  // Generate data for charts
  const generateChartData = () => {
    const data = [];
    const monthlyRate = annualRate / 100 / 12;
    
    for (let year = 0; year <= years; year++) {
      const months = year * 12;
      let yearPrincipal = principal * Math.pow(1 + monthlyRate, months);
      let yearContributions = monthlyContribution * months;
      let yearContributionsFV = months > 0 ? monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) : 0;
      let totalValue = yearPrincipal + yearContributionsFV;
      let interest = totalValue - principal - yearContributions;
      
      data.push({
        year: year,
        principal: principal,
        contributions: yearContributions,
        interest: Math.max(0, interest),
        totalValue: totalValue,
        inflationAdjusted: totalValue / Math.pow(1 + inflationRate/100, year)
      });
    }
    
    return data;
  };

  // Apply investment presets
  const applyPreset = (type: string) => {
    switch (type) {
      case 'conservative':
        setAnnualRate(4);
        setInflationRate(2.5);
        setPrincipal(10000);
        setMonthlyContribution(300);
        break;
      case 'balanced':
        setAnnualRate(7);
        setInflationRate(3);
        setPrincipal(10000);
        setMonthlyContribution(500);
        break;
      case 'aggressive':
        setAnnualRate(10);
        setInflationRate(3.5);
        setPrincipal(15000);
        setMonthlyContribution(750);
        break;
      case 'retirement':
        setCalculatorMode('retirement');
        setAnnualRate(8);
        setPrincipal(0);
        setMonthlyContribution(500);
        setYears(40);
        break;
      case 'college':
        setCalculatorMode('college');
        setAnnualRate(6);
        setPrincipal(5000);
        setMonthlyContribution(200);
        setYears(18);
        break;
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format percentage
  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Calculate all results when inputs change
  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, annualRate, years, compoundingFreq, monthlyContribution, contributionFreq, 
      inflationRate, taxEnabled, filingStatus, state, currentIncome, calculatorMode, 
      savingsGoal, targetAge, currentAge]);

  const chartData = generateChartData();
  const comparisonData = compareMode ? calculateScenarioComparison() : [];
  const benchmarks = getUSABenchmarks();

  // Pie chart data
  const pieData = [
    { name: 'Principal', value: principal, color: '#3b82f6' },
    { name: 'Contributions', value: results.totalContributions - principal, color: '#f59e0b' },
    { name: 'Interest Earned', value: results.totalInterest, color: '#10b981' }
  ].filter(item => item.value > 0);

  return (
    <>
      <Helmet>
        <title>Advanced Compound Interest Calculator USA - Investment Growth & Tax Planning Tool</title>
        <meta name="description" content="Comprehensive compound interest calculator with USA tax integration, investment benchmarks, goal tracking, and what-if scenarios. Plan your financial future with precision." />
        <meta name="keywords" content="compound interest calculator USA, investment growth calculator, tax planning tool, savings goal calculator, retirement planning calculator, 529 college fund calculator" />
        <link rel="canonical" href="https://dollarmento.com/compound-interest-calculator" />
      </Helmet>
      
      <SEO 
        title="Advanced Compound Interest Calculator USA - Investment & Tax Planning Tool"
        description="Complete compound interest calculator with USA tax integration, state tax calculations, investment benchmarks, goal tracking, and what-if scenarios. Free financial planning tool."
        keywords="compound interest calculator USA, compound interest formula calculator, investment growth calculator with tax, compound interest calculator with monthly payments, savings goal calculator, retirement planning calculator, 529 college fund calculator, compound interest vs debt calculator, investment benchmark calculator, what if investment scenarios"
        canonical="https://dollarmento.com/compound-interest-calculator"
        ogType="website"
      />

      <TooltipProvider>
        <div className="w-full p-6 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Advanced Compound Interest Calculator</h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Comprehensive USA financial planning tool with tax calculations, investment benchmarks, 
              and goal tracking. Plan your investment growth with confidence and precision.
            </p>
          </div>

          {/* Calculator Mode Selection */}
          <div className="flex justify-center">
            <Tabs value={calculatorMode} onValueChange={(value) => setCalculatorMode(value as any)} className="w-full max-w-2xl">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="investment" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Investment
                </TabsTrigger>
                <TabsTrigger value="debt" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Debt
                </TabsTrigger>
                <TabsTrigger value="college" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  529 College
                </TabsTrigger>
                <TabsTrigger value="retirement" className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Retirement
                </TabsTrigger>
                <TabsTrigger value="goal" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Goal
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" onClick={() => applyPreset('conservative')} className="text-sm">
              Conservative Portfolio (4%)
            </Button>
            <Button variant="outline" onClick={() => applyPreset('balanced')} className="text-sm">
              Balanced Portfolio (7%)
            </Button>
            <Button variant="outline" onClick={() => applyPreset('aggressive')} className="text-sm">
              Aggressive Portfolio (10%)
            </Button>
            <Button variant="outline" onClick={() => applyPreset('retirement')} className="text-sm">
              401k/IRA Setup
            </Button>
            <Button variant="outline" onClick={() => applyPreset('college')} className="text-sm">
              529 College Fund
            </Button>
          </div>

          {/* Mode-specific alerts */}
          {calculatorMode === 'debt' && (
            <Alert className="bg-red-50 border-red-200">
              <CreditCard className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Credit Card Debt Mode:</strong> This shows how debt grows with compound interest. 
                Higher interest rates work against you - pay off high-interest debt first!
              </AlertDescription>
            </Alert>
          )}

          {calculatorMode === 'college' && (
            <Alert className="bg-blue-50 border-blue-200">
              <GraduationCap className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>529 College Savings Plan:</strong> Tax-free growth for qualified education expenses. 
                State tax benefits may apply depending on your state plan.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Panel */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Basic Inputs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    {calculatorMode === 'debt' ? 'Debt Details' : 
                     calculatorMode === 'goal' ? 'Goal Settings' : 'Investment Details'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  {calculatorMode === 'goal' ? (
                    <>
                      <div>
                        <Label htmlFor="savingsGoal" className="flex items-center gap-2">
                          Savings Goal
                          <UITooltip>
                            <TooltipTrigger><HelpCircle className="w-4 h-4 text-gray-400" /></TooltipTrigger>
                            <TooltipContent><p>Target amount you want to save</p></TooltipContent>
                          </UITooltip>
                        </Label>
                        <Input
                          id="savingsGoal"
                          type="number"
                          value={savingsGoal}
                          onChange={(e) => setSavingsGoal(Number(e.target.value))}
                          placeholder="1000000"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="currentAge">Current Age</Label>
                          <Input
                            id="currentAge"
                            type="number"
                            value={currentAge}
                            onChange={(e) => setCurrentAge(Number(e.target.value))}
                            placeholder="25"
                          />
                        </div>
                        <div>
                          <Label htmlFor="targetAge">Target Age</Label>
                          <Input
                            id="targetAge"
                            type="number"
                            value={targetAge}
                            onChange={(e) => setTargetAge(Number(e.target.value))}
                            placeholder="65"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="principal" className="flex items-center gap-2">
                          {calculatorMode === 'debt' ? 'Initial Debt Amount' : 'Principal Amount'}
                          <UITooltip>
                            <TooltipTrigger><HelpCircle className="w-4 h-4 text-gray-400" /></TooltipTrigger>
                            <TooltipContent>
                              <p>{calculatorMode === 'debt' ? 'Starting debt balance' : 'Initial one-time investment'}</p>
                            </TooltipContent>
                          </UITooltip>
                        </Label>
                        <Input
                          id="principal"
                          type="number"
                          value={principal}
                          onChange={(e) => setPrincipal(Number(e.target.value))}
                          placeholder="10000"
                        />
                      </div>

                      <div>
                        <Label htmlFor="monthlyContribution" className="flex items-center gap-2">
                          {calculatorMode === 'debt' ? 'Monthly Payment' : 'Monthly Contribution'}
                          <UITooltip>
                            <TooltipTrigger><HelpCircle className="w-4 h-4 text-gray-400" /></TooltipTrigger>
                            <TooltipContent>
                              <p>{calculatorMode === 'debt' ? 'Monthly debt payment amount' : 'Regular monthly investment amount'}</p>
                            </TooltipContent>
                          </UITooltip>
                        </Label>
                        <Input
                          id="monthlyContribution"
                          type="number"
                          value={monthlyContribution}
                          onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                          placeholder="500"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <Label className="flex items-center justify-between mb-2">
                      <span className="flex items-center gap-2">
                        Annual {calculatorMode === 'debt' ? 'Interest Rate' : 'Return Rate'} (%)
                        <UITooltip>
                          <TooltipTrigger><HelpCircle className="w-4 h-4 text-gray-400" /></TooltipTrigger>
                          <TooltipContent>
                            <p>{calculatorMode === 'debt' ? 
                                'Credit card or loan interest rate' : 
                                'Expected annual rate of return'}</p>
                          </TooltipContent>
                        </UITooltip>
                      </span>
                      <Badge variant="secondary">{annualRate}%</Badge>
                    </Label>
                    <Slider
                      value={[annualRate]}
                      onValueChange={(value) => setAnnualRate(value[0])}
                      max={calculatorMode === 'debt' ? 30 : 15}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>0.1%</span>
                      <span>{calculatorMode === 'debt' ? '30%' : '15%'}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="flex items-center justify-between mb-2">
                      <span className="flex items-center gap-2">
                        Time Period (Years)
                        <UITooltip>
                          <TooltipTrigger><HelpCircle className="w-4 h-4 text-gray-400" /></TooltipTrigger>
                          <TooltipContent>
                            <p>{calculatorMode === 'debt' ? 
                                'Time to pay off debt completely' : 
                                'Investment time horizon'}</p>
                          </TooltipContent>
                        </UITooltip>
                      </span>
                      <Badge variant="secondary">{years} years</Badge>
                    </Label>
                    <Slider
                      value={[years]}
                      onValueChange={(value) => setYears(value[0])}
                      max={50}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>1 year</span>
                      <span>50 years</span>
                    </div>
                  </div>

                  <div>
                    <Label className="flex items-center gap-2">
                      Compounding Frequency
                      <UITooltip>
                        <TooltipTrigger><HelpCircle className="w-4 h-4 text-gray-400" /></TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <div className="text-sm space-y-1">
                            <p><strong>Daily (365x):</strong> Bank savings, some CDs</p>
                            <p><strong>Monthly (12x):</strong> Most investments, mortgages</p>
                            <p><strong>Quarterly (4x):</strong> Some bonds, CDs</p>
                            <p><strong>Annually (1x):</strong> Simple bonds, basic savings</p>
                          </div>
                        </TooltipContent>
                      </UITooltip>
                    </Label>
                    <Select value={compoundingFreq.toString()} onValueChange={(value) => setCompoundingFreq(Number(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="365">Daily (365x/year) - Bank Savings</SelectItem>
                        <SelectItem value="12">Monthly (12x/year) - Most Common</SelectItem>
                        <SelectItem value="4">Quarterly (4x/year) - Some CDs</SelectItem>
                        <SelectItem value="1">Annually (1x/year) - Simple Bonds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* USA Tax Integration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Percent className="w-5 h-5" />
                    USA Tax Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      Enable Tax Calculations
                      <UITooltip>
                        <TooltipTrigger><HelpCircle className="w-4 h-4 text-gray-400" /></TooltipTrigger>
                        <TooltipContent>
                          <p>Include Federal and State tax impact on your returns</p>
                        </TooltipContent>
                      </UITooltip>
                    </Label>
                    <Switch checked={taxEnabled} onCheckedChange={setTaxEnabled} />
                  </div>

                  {taxEnabled && (
                    <>
                      <div>
                        <Label>Current Annual Income</Label>
                        <Input
                          type="number"
                          value={currentIncome}
                          onChange={(e) => setCurrentIncome(Number(e.target.value))}
                          placeholder="75000"
                        />
                      </div>

                      <div>
                        <Label>Filing Status</Label>
                        <Select value={filingStatus} onValueChange={(value) => setFilingStatus(value as any)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married_jointly">Married Filing Jointly</SelectItem>
                            <SelectItem value="married_separately">Married Filing Separately</SelectItem>
                            <SelectItem value="head_household">Head of Household</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>State</Label>
                        <Select value={state} onValueChange={setState}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-48 overflow-y-auto">
                            {Object.entries(getStateData()).map(([code, data]) => (
                              <SelectItem key={code} value={code}>
                                {data.name} {data.hasStateTax ? `(${(data.rate * 100).toFixed(1)}%)` : '(No Tax)'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Advanced Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Advanced Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="flex items-center justify-between mb-2">
                      <span className="flex items-center gap-2">
                        Inflation Rate (%)
                        <UITooltip>
                          <TooltipTrigger><HelpCircle className="w-4 h-4 text-gray-400" /></TooltipTrigger>
                          <TooltipContent>
                            <p>Used to calculate purchasing power in today's dollars</p>
                          </TooltipContent>
                        </UITooltip>
                      </span>
                      <Badge variant="secondary">{inflationRate}%</Badge>
                    </Label>
                    <Slider
                      value={[inflationRate]}
                      onValueChange={(value) => setInflationRate(value[0])}
                      max={8}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label>Contribution Frequency</Label>
                    <Select value={contributionFreq} onValueChange={(value) => setContributionFreq(value as any)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly Contributions</SelectItem>
                        <SelectItem value="yearly">Annual Contributions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Show Comparison Mode</Label>
                    <Switch checked={compareMode} onCheckedChange={setCompareMode} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Key Results */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="text-center p-4">
                  <CardContent className="pt-2">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(results.futureValue)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {calculatorMode === 'debt' ? 'Total Debt Cost' : 'Final Amount'}
                    </div>
                  </CardContent>
                </Card>

                <Card className="text-center p-4">
                  <CardContent className="pt-2">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(results.totalContributions)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {calculatorMode === 'debt' ? 'Total Payments' : 'Total Contributed'}
                    </div>
                  </CardContent>
                </Card>

                <Card className="text-center p-4">
                  <CardContent className="pt-2">
                    <div className={`text-2xl font-bold ${calculatorMode === 'debt' ? 'text-red-600' : 'text-purple-600'}`}>
                      {formatCurrency(results.totalInterest)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {calculatorMode === 'debt' ? 'Interest Paid' : 'Interest Earned'}
                    </div>
                  </CardContent>
                </Card>

                <Card className="text-center p-4">
                  <CardContent className="pt-2">
                    <div className="text-2xl font-bold text-orange-600">
                      {formatCurrency(results.inflationAdjustedValue)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Today's Buying Power
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Goal Results */}
              {calculatorMode === 'goal' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Goal Achievement Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-700">
                          {formatCurrency(results.requiredMonthlyPayment)}
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                          Required Monthly Investment
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          To reach {formatCurrency(savingsGoal)} by age {targetAge}
                        </div>
                      </div>
                      
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-700">
                          {targetAge - currentAge}
                        </div>
                        <div className="text-sm text-blue-600 font-medium">
                          Years to Goal
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          At {annualRate}% annual return
                        </div>
                      </div>
                    </div>

                    {results.requiredMonthlyPayment > 10000 && (
                      <Alert className="mt-4 bg-yellow-50 border-yellow-200">
                        <AlertDescription className="text-yellow-800">
                          <strong>High Monthly Requirement:</strong> Consider increasing your time horizon, 
                          target return rate, or initial investment to make this goal more achievable.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Tax Impact Display */}
              {taxEnabled && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Percent className="w-5 h-5" />
                      Tax Impact Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-xl font-bold text-red-700">
                          {formatCurrency(results.futureValue - results.afterTaxValue)}
                        </div>
                        <div className="text-sm text-red-600">Estimated Taxes</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-700">
                          {formatCurrency(results.afterTaxValue)}
                        </div>
                        <div className="text-sm text-green-600">After-Tax Value</div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Federal Tax Rate: Based on {filingStatus.replace('_', ' ')} filing status</p>
                      <p>• State: {getStateData()[state as keyof ReturnType<typeof getStateData>]?.name}</p>
                      <p>• Capital Gains Rate: {(getCapitalGainsRate() * 100).toFixed(0)}% (based on ${currentIncome.toLocaleString()} income)</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Charts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Growth Visualization
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant={chartType === 'line' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setChartType('line')}
                      >
                        Timeline
                      </Button>
                      <Button
                        variant={chartType === 'pie' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setChartType('pie')}
                      >
                        Breakdown
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ width: '100%', height: '300px' }}>
                    <ResponsiveContainer>
                      {chartType === 'line' ? (
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis tickFormatter={(value) => formatCurrency(value)} />
                          <Tooltip formatter={(value, name) => [formatCurrency(Number(value)), name]} />
                          <Legend />
                          <Line type="monotone" dataKey="totalValue" stroke="#3b82f6" strokeWidth={3} name="Total Value" />
                          <Line type="monotone" dataKey="contributions" stroke="#f59e0b" strokeWidth={2} name="Contributions" />
                          <Line type="monotone" dataKey="interest" stroke="#10b981" strokeWidth={2} name="Interest" />
                          {inflationRate > 0 && (
                            <Line type="monotone" dataKey="inflationAdjusted" stroke="#ef4444" strokeDasharray="5 5" strokeWidth={2} name="Inflation Adjusted" />
                          )}
                        </LineChart>
                      ) : (
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        </PieChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* What-If Scenarios Comparison */}
          {compareMode && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  What-If Scenario Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-blue-700">Scenario A</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Rate (%)</Label>
                        <Input
                          type="number"
                          value={scenario1.rate}
                          onChange={(e) => setScenario1({...scenario1, rate: Number(e.target.value)})}
                        />
                      </div>
                      <div>
                        <Label>Monthly ($)</Label>
                        <Input
                          type="number"
                          value={scenario1.contribution}
                          onChange={(e) => setScenario1({...scenario1, contribution: Number(e.target.value)})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-green-700">Scenario B</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Rate (%)</Label>
                        <Input
                          type="number"
                          value={scenario2.rate}
                          onChange={(e) => setScenario2({...scenario2, rate: Number(e.target.value)})}
                        />
                      </div>
                      <div>
                        <Label>Monthly ($)</Label>
                        <Input
                          type="number"
                          value={scenario2.contribution}
                          onChange={(e) => setScenario2({...scenario2, contribution: Number(e.target.value)})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {comparisonData.map((scenario, index) => (
                    <div key={index} className={`p-4 rounded-lg border-2 ${index === 0 ? 'border-blue-200 bg-blue-50' : 'border-green-200 bg-green-50'}`}>
                      <h5 className={`font-bold text-lg ${index === 0 ? 'text-blue-700' : 'text-green-700'}`}>
                        {scenario.name}
                      </h5>
                      <div className="space-y-2 mt-2">
                        <p><strong>Final Value:</strong> {formatCurrency(scenario.futureValue)}</p>
                        <p><strong>Total Interest:</strong> {formatCurrency(scenario.totalInterest)}</p>
                        <p><strong>Monthly Investment:</strong> {formatCurrency(scenario.monthlyPayment)}</p>
                        <p><strong>Rate:</strong> {scenario.rate}% annually</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* USA Investment Benchmarks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                USA Investment Rate Benchmarks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {benchmarks.map((benchmark, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                       onClick={() => setAnnualRate(benchmark.rate)}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800">{benchmark.name}</h4>
                      <Badge variant="secondary" className="text-xs">{benchmark.risk}</Badge>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {benchmark.rate}%
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      Range: {benchmark.min}% - {benchmark.max}%
                    </div>
                    <div className="text-xs text-gray-600">
                      {benchmark.description}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">💡 Pro Tips for USA Investors</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>Roth IRA:</strong> Tax-free growth for retirement (income limits apply)</li>
                  <li>• <strong>High-yield savings:</strong> Beat inflation with 4%+ APY accounts</li>
                  <li>• <strong>401k match:</strong> Always contribute enough to get full employer match (free money!)</li>
                  <li>• <strong>Emergency fund:</strong> Keep 3-6 months expenses in high-yield savings first</li>
                  <li>• <strong>Tax loss harvesting:</strong> Offset gains with losses in taxable accounts</li>
                  <li>• <strong>Dollar-cost averaging:</strong> Invest regularly regardless of market conditions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Insights & Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Personalized Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Dynamic recommendations based on inputs */}
                {annualRate < 4 && (
                  <Alert className="bg-yellow-50 border-yellow-200">
                    <AlertDescription className="text-yellow-800">
                      <strong>Low Return Rate:</strong> Your {annualRate}% return may not beat inflation ({inflationRate}%). 
                      Consider higher-yield investments like index funds or target-date funds.
                    </AlertDescription>
                  </Alert>
                )}

                {years < 10 && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertDescription className="text-blue-800">
                      <strong>Short Time Horizon:</strong> With only {years} years, consider less volatile investments 
                      like CDs or high-yield savings to protect your principal.
                    </AlertDescription>
                  </Alert>
                )}

                {monthlyContribution < 100 && calculatorMode === 'retirement' && (
                  <Alert className="bg-orange-50 border-orange-200">
                    <AlertDescription className="text-orange-800">
                      <strong>Low Monthly Contribution:</strong> For retirement planning, consider increasing to at least $400/month. 
                      Even small increases compound significantly over time.
                    </AlertDescription>
                  </Alert>
                )}

                {calculatorMode === 'investment' && !taxEnabled && (
                  <Alert className="bg-purple-50 border-purple-200">
                    <AlertDescription className="text-purple-800">
                      <strong>Tax Planning:</strong> Enable tax calculations to see the real impact on your returns. 
                      Tax-advantaged accounts like IRAs can save thousands in taxes.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Rule of 72 insight */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">📊 Rule of 72</h4>
                  <p className="text-sm text-gray-600">
                    At {annualRate}% annual return, your money will double every{' '}
                    <strong>{Math.round(72 / annualRate)} years</strong>. 
                    This means ${principal.toLocaleString()} becomes{' '}
                    ${(principal * 2).toLocaleString()} in {Math.round(72 / annualRate)} years without additional contributions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Educational Content */}
          <div className="space-y-8 bg-gray-50 p-8 rounded-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Master Compound Interest: The Ultimate USA Financial Planning Guide
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Compound interest is often called the eighth wonder of the world. Learn how to harness its power 
                to build wealth, plan for retirement, and achieve your financial goals in the USA.
              </p>
            </div>

            {/* How to Use This Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>🚀 How to Use This Advanced Compound Interest Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Step 1: Choose Your Calculator Mode</h4>
                    <p className="text-sm text-gray-600">
                      Select the appropriate mode based on your financial goal: <strong>Investment Growth</strong> for building wealth, 
                      <strong>Credit Card Debt</strong> to see how debt compounds against you, <strong>529 College</strong> for education savings, 
                      <strong>Retirement</strong> for 401(k)/IRA planning, or <strong>Goal</strong> mode to reverse-calculate required monthly investments.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Step 2: Enter Your Financial Details</h4>
                    <p className="text-sm text-gray-600">
                      Input your starting amount (principal), expected annual return rate, and time horizon. For regular investing, 
                      add your planned monthly contributions. Use the preset buttons for common investment portfolio allocations 
                      or click benchmark rates to see realistic USA investment returns.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Step 3: Configure USA Tax Settings</h4>
                    <p className="text-sm text-gray-600">
                      Enable tax calculations to see your real after-tax returns. Enter your income, filing status, and state 
                      to get accurate Federal and State tax calculations. This shows the true power of tax-advantaged accounts 
                      like IRAs and 401(k)s vs taxable investments.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Step 4: Analyze Your Results</h4>
                    <p className="text-sm text-gray-600">
                      Review your projected growth using interactive charts, compare different scenarios with the What-If tool, 
                      and read personalized recommendations. The calculator provides inflation-adjusted values to show real 
                      purchasing power and includes the Rule of 72 for quick doubling time estimates.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How to Make Sense of Your Results */}
            <Card>
              <CardHeader>
                <CardTitle>📊 How to Make Sense of Your Compound Interest Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Final Amount vs Today's Value</h4>
                    <p className="text-sm text-gray-600">
                      Your future value shows what your investment will be worth, but the inflation-adjusted value shows 
                      what that money can actually buy in today's purchasing power. A $500,000 future value might only 
                      have $300,000 of today's buying power after 20 years of 3% inflation.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Interest Earned vs Contributions</h4>
                    <p className="text-sm text-gray-600">
                      The magic of compounding shows in how much interest you earn versus how much you put in. 
                      Over long periods, interest often becomes the largest component of your wealth. This is why 
                      starting early is so powerful – even small amounts compound into large sums.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Tax Impact Analysis</h4>
                    <p className="text-sm text-gray-600">
                      The difference between pre-tax and after-tax values shows why tax-advantaged accounts matter. 
                      A Roth IRA keeps all growth tax-free, while taxable accounts lose 15-20% to capital gains taxes. 
                      This difference compounds over decades into hundreds of thousands of dollars.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Goal Achievement Planning</h4>
                    <p className="text-sm text-gray-600">
                      In Goal mode, the required monthly payment shows what you need to save to reach your target. 
                      If this amount seems too high, adjust your timeline, target amount, or expected return rate. 
                      Small changes in time or return rate dramatically affect required contributions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits of Understanding Compound Interest */}
            <Card>
              <CardHeader>
                <CardTitle>💎 Life-Changing Benefits of Mastering Compound Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-green-700 mb-2">Early Retirement Becomes Possible</h4>
                    <p className="text-sm text-gray-600">
                      Understanding compound interest enables early retirement through strategic investing. Someone starting 
                      at age 25 with $500/month can accumulate over $1 million by age 55 with 8% returns. This is the 
                      foundation of the Financial Independence, Retire Early (FIRE) movement.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-green-700 mb-2">Debt Freedom Strategy</h4>
                    <p className="text-sm text-gray-600">
                      Compound interest works against you in debt but for you in investments. By understanding this, 
                      you can prioritize paying off high-interest debt (credit cards at 18-25%) while simultaneously 
                      investing in lower-risk, compound-growth vehicles.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-green-700 mb-2">Wealth Building Acceleration</h4>
                    <p className="text-sm text-gray-600">
                      Each additional year of investing is exponentially more powerful than the last. Starting at 22 
                      instead of 32 often means retiring with twice the wealth, even with the same contributions. 
                      Time is the most powerful factor in wealth building.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-green-700 mb-2">Financial Security and Peace of Mind</h4>
                    <p className="text-sm text-gray-600">
                      Compound growth creates financial security that provides peace of mind. Knowing your money works 
                      for you 24/7, growing even while you sleep, reduces financial stress and enables you to take 
                      calculated risks in your career and life.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Types of Compound Interest Accounts */}
            <Card>
              <CardHeader>
                <CardTitle>🏦 USA Account Types and Compound Growth Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-blue-700 mb-2">Tax-Advantaged Accounts</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                        <h5 className="font-medium text-blue-800">Roth IRA</h5>
                        <p className="text-xs text-blue-700">Tax-free compound growth forever. $7,000 annual limit. Best for young investors.</p>
                      </div>
                      <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                        <h5 className="font-medium text-green-800">Traditional 401(k)</h5>
                        <p className="text-xs text-green-700">Tax-deferred growth with employer match. $23,500 limit. Immediate tax deduction.</p>
                      </div>
                      <div className="p-3 bg-purple-50 border-l-4 border-purple-500 rounded">
                        <h5 className="font-medium text-purple-800">529 College Plans</h5>
                        <p className="text-xs text-purple-700">Tax-free growth for education. State tax benefits. High contribution limits.</p>
                      </div>
                      <div className="p-3 bg-orange-50 border-l-4 border-orange-500 rounded">
                        <h5 className="font-medium text-orange-800">Health Savings Account (HSA)</h5>
                        <p className="text-xs text-orange-700">Triple tax advantage. $4,300 limit. Best tax-advantaged account available.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-red-700 mb-2">Taxable Accounts & Debt</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 border-l-4 border-gray-500 rounded">
                        <h5 className="font-medium text-gray-800">Taxable Investment Accounts</h5>
                        <p className="text-xs text-gray-700">Flexible access, but pay capital gains taxes. Good for goals before retirement.</p>
                      </div>
                      <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                        <h5 className="font-medium text-yellow-800">High-Yield Savings</h5>
                        <p className="text-xs text-yellow-700">FDIC insured, 4-5% rates. Perfect for emergency funds and short-term goals.</p>
                      </div>
                      <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                        <h5 className="font-medium text-red-800">Credit Card Debt</h5>
                        <p className="text-xs text-red-700">Compounds against you at 18-29%. Pay off immediately before investing.</p>
                      </div>
                      <div className="p-3 bg-pink-50 border-l-4 border-pink-500 rounded">
                        <h5 className="font-medium text-pink-800">Student Loans</h5>
                        <p className="text-xs text-pink-700">Federal rates 5-7%. Balance repayment with investment based on rates.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smart Compound Interest Planning */}
            <Card>
              <CardHeader>
                <CardTitle>🎯 Smart Compound Interest Planning for Americans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Maximize Your Compounding Period</h4>
                    <p className="text-sm text-gray-600">
                      Time is your greatest asset. Starting at age 22 with $300/month beats starting at age 32 with $600/month. 
                      Every year you delay costs you exponentially more. The "magic" of compounding accelerates after year 15-20 
                      when interest begins earning more interest than your contributions.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Optimize Your Tax Strategy</h4>
                    <p className="text-sm text-gray-600">
                      Use tax-advantaged accounts first: 401(k) match → Roth IRA → max 401(k) → taxable accounts. 
                      A $1,000 investment in a Roth IRA growing at 8% for 40 years becomes $21,725 tax-free, 
                      while the same investment in a taxable account becomes only $17,380 after taxes.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Choose the Right Investment Vehicle</h4>
                    <p className="text-sm text-gray-600">
                      Low-cost index funds (0.03-0.1% expense ratios) preserve more of your returns for compounding. 
                      High-fee investments (1%+ expenses) can reduce your final wealth by 20-30% over decades. 
                      Consistency beats complexity – regular investments in simple index funds often outperform active trading.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Automate Your Success</h4>
                    <p className="text-sm text-gray-600">
                      Set up automatic transfers to ensure consistency. Dollar-cost averaging through regular investments 
                      reduces market timing risk and makes compounding work regardless of market conditions. 
                      Automatic investing removes emotions from financial decisions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Understanding Compound Interest in Different Life Stages */}
            <Card>
              <CardHeader>
                <CardTitle>📅 Compound Interest Strategies by Life Stage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Ages 20-35: The Power Building Phase</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-green-700 mb-2">Focus Areas</h5>
                        <ul className="text-sm text-green-600 space-y-1">
                          <li>• Start immediately, even with $50/month</li>
                          <li>• Maximize employer 401(k) match (free money)</li>
                          <li>• Open Roth IRA for tax-free future growth</li>
                          <li>• Invest aggressively (80-90% stocks)</li>
                          <li>• Automate everything to build habits</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-green-700 mb-2">Compound Interest Impact</h5>
                        <p className="text-sm text-green-600">
                          <strong>Example:</strong> $500/month from age 25-65 at 8% return = $1,745,503. 
                          The same $500/month from age 35-65 = $745,180. Starting 10 years earlier 
                          results in $1 million more wealth with the same effort.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Ages 35-50: The Acceleration Phase</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-blue-700 mb-2">Focus Areas</h5>
                        <ul className="text-sm text-blue-600 space-y-1">
                          <li>• Increase contributions with salary growth</li>
                          <li>• Max out tax-advantaged accounts</li>
                          <li>• Balance growth with some stability (70% stocks)</li>
                          <li>• Consider 529 plans for children's education</li>
                          <li>• Pay off high-interest debt completely</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-blue-700 mb-2">Compound Interest Impact</h5>
                        <p className="text-sm text-blue-600">
                          <strong>Peak earning years:</strong> This is when compound interest really accelerates. 
                          Your earlier investments are now earning substantial returns that compound into 
                          even larger returns. Focus on maximizing contributions during high-income years.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">Ages 50+: The Preservation Phase</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-purple-700 mb-2">Focus Areas</h5>
                        <ul className="text-sm text-purple-600 space-y-1">
                          <li>• Use catch-up contributions ($7,500 extra to 401k)</li>
                          <li>• Gradually shift to conservative allocations</li>
                          <li>• Plan withdrawal strategies to minimize taxes</li>
                          <li>• Consider Roth conversions in low-income years</li>
                          <li>• Protect accumulated wealth from major losses</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-purple-700 mb-2">Compound Interest Impact</h5>
                        <p className="text-sm text-purple-600">
                          <strong>Wealth preservation:</strong> Your money has had decades to compound. Focus shifts 
                          from growth to preservation. Even conservative 4-5% returns on a large balance 
                          generate substantial annual income through compounding.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real-World Compound Interest Examples */}
            <Card>
              <CardHeader>
                <CardTitle>💰 Real-World Compound Interest Success Stories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">The $2 Million Coffee Story</h4>
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800 mb-3">
                        <strong>Daily Coffee:</strong> $5/day × 365 days = $1,825/year
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>If invested instead:</strong> $1,825/year for 40 years at 8% return = <span className="font-bold text-green-700">$517,307</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>With inflation adjustment:</strong> That's <span className="font-bold text-blue-700">$159,000</span> of today's buying power!
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">The Early Start Advantage</h4>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-sm text-gray-600 space-y-2">
                        <p><strong>Sarah (starts at 22):</strong> Invests $300/month for 10 years, then stops</p>
                        <p><strong>Total invested:</strong> $36,000 → <span className="font-bold text-green-700">Grows to $868,000</span> by age 65</p>
                        <hr className="border-green-200" />
                        <p><strong>Mike (starts at 32):</strong> Invests $300/month for 33 years straight</p>
                        <p><strong>Total invested:</strong> $118,800 → <span className="font-bold text-blue-700">Grows to $735,000</span> by age 65</p>
                        <div className="mt-3 p-2 bg-green-100 rounded">
                          <p className="font-bold text-green-800">Sarah wins with $133,000 more despite investing $82,800 less!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Core Formula Explanation */}
            <Card>
              <CardHeader>
                <CardTitle>🧮 The Compound Interest Formula</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="text-center text-xl font-mono mb-2">
                    A = P × (1 + r/n)^(n×t)
                  </div>
                  <div className="text-sm text-gray-600 grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div><strong>A</strong> = Final amount</div>
                    <div><strong>P</strong> = Principal ($)</div>
                    <div><strong>r</strong> = Annual rate (decimal)</div>
                    <div><strong>n</strong> = Compounding frequency</div>
                    <div><strong>t</strong> = Time (years)</div>
                  </div>
                </div>

                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>With Regular Contributions:</strong> The formula becomes more complex, adding the future value of an ordinary annuity.</p>
                  <p><strong>Example:</strong> $10,000 at 7% for 30 years = ${formatCurrency(10000 * Math.pow(1.07, 30))}</p>
                  <p><strong>Power of Time:</strong> Starting 10 years earlier often beats doubling your contribution amount!</p>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>❓ Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left">
                      What's the difference between compound and simple interest?
                    </AccordionTrigger>
                    <AccordionContent>
                      Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus all previously earned interest. With compound interest, you earn "interest on interest," which creates exponential growth over time.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left">
                      How do taxes affect my compound interest calculations?
                    </AccordionTrigger>
                    <AccordionContent>
                      Taxes can significantly impact your returns. In taxable accounts, you pay capital gains tax on investment profits (0%, 15%, or 20% based on income). Tax-advantaged accounts like IRAs and 401(k)s allow tax-deferred or tax-free growth, maximizing the power of compounding.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left">
                      What's a realistic annual return for long-term investing?
                    </AccordionTrigger>
                    <AccordionContent>
                      The S&P 500 has averaged about 10% annually since 1926, but returns vary significantly year to year. Conservative estimates use 6-8% for planning. Diversified portfolios typically aim for 7-9% long-term returns. Always consider inflation (historically ~3%) when planning.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left">
                      Should I pay off debt or invest first?
                    </AccordionTrigger>
                    <AccordionContent>
                      Generally, pay off high-interest debt (credit cards, personal loans) before investing, as debt interest compounds against you. However, contribute enough to your 401(k) to get full employer matching first – it's free money with immediate 100% return!
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left">
                      How does compounding frequency affect my returns?
                    </AccordionTrigger>
                    <AccordionContent>
                      More frequent compounding (daily vs. annually) increases returns, but the difference is usually small. The impact of compounding frequency is much less important than your interest rate and time invested. Focus on finding good investments rather than optimizing compounding frequency.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Investment Strategies */}
            <Card>
              <CardHeader>
                <CardTitle>🎯 USA Investment Strategies for Maximum Compound Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Tax-Advantaged Accounts (Priority Order)</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
                        <h5 className="font-medium text-green-800">1. 401(k) Match</h5>
                        <p className="text-sm text-green-700">Contribute enough to get full employer match first</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                        <h5 className="font-medium text-blue-800">2. Roth IRA</h5>
                        <p className="text-sm text-blue-700">$7,000/year limit, tax-free growth and withdrawals</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-500">
                        <h5 className="font-medium text-purple-800">3. Max 401(k)</h5>
                        <p className="text-sm text-purple-700">$23,500/year limit, tax-deferred growth</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded border-l-4 border-orange-500">
                        <h5 className="font-medium text-orange-800">4. Taxable Account</h5>
                        <p className="text-sm text-orange-700">After maxing tax-advantaged accounts</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Investment Allocation by Age</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded">
                        <h5 className="font-medium text-gray-800">20s-30s (Growth Phase)</h5>
                        <p className="text-sm text-gray-600">80-90% stocks, 10-20% bonds. Focus on growth.</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <h5 className="font-medium text-gray-800">40s-50s (Accumulation Phase)</h5>
                        <p className="text-sm text-gray-600">70-80% stocks, 20-30% bonds. Balance growth and stability.</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <h5 className="font-medium text-gray-800">60s+ (Preservation Phase)</h5>
                        <p className="text-sm text-gray-600">40-60% stocks, 40-60% bonds. Preserve capital.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-800 mb-2">⚠️ Common Compound Interest Mistakes</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• <strong>Starting too late:</strong> Time is your biggest advantage – start now, even with small amounts</li>
                    <li>• <strong>Frequent trading:</strong> Disrupts compounding and increases taxes/fees</li>
                    <li>• <strong>Early withdrawals:</strong> Breaks the compounding chain and may trigger penalties</li>
                    <li>• <strong>High fees:</strong> Expense ratios above 1% significantly reduce long-term growth</li>
                    <li>• <strong>Market timing:</strong> Missing the best days can cost decades of growth</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TooltipProvider>
    </>
  );
}