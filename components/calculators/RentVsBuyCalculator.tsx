import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Home, TrendingUp, Calculator, Info, Calendar, Percent } from 'lucide-react';
import { SEO } from '../SEO';

interface RentVsBuyData {
  city: string;
  monthlyRent: number;
  rentIncrease: number;
  propertyPrice: number;
  downPayment: number;
  loanInterestRate: number;
  loanTenure: number;
  investmentStrategy: string;
  optimismLevel: number;
}

interface ComparisonResult {
  netHomeValue: number;
  investmentValue: number;
  totalSavings: number;
  recommendation: string;
  breakEvenYear: number;
  monthlyEMI: number;
  totalInterestPaid: number;
  propertyAppreciation: number;
  investmentReturns: number;
}

const RentVsBuyCalculator = () => {
  const [data, setData] = useState<RentVsBuyData>({
    city: 'New York',
    monthlyRent: 2000,
    rentIncrease: 5,
    propertyPrice: 800000,
    downPayment: 10,
    loanInterestRate: 7,
    loanTenure: 20,
    investmentStrategy: 'Moderately',
    optimismLevel: 50
  });

  const [activeTab, setActiveTab] = useState('calculator');

  // City-wise property appreciation rates (based on historical data)
  const cityAppreciationRates = {
    'New York': 3.8,
    'Los Angeles': 4.2,
    'Chicago': 3.1,
    'Houston': 3.9,
    'Phoenix': 5.2,
    'Philadelphia': 2.9,
    'San Antonio': 3.7,
    'San Diego': 4.5,
    'Dallas': 4.1,
    'Austin': 5.8
  };

  // Investment strategy returns
  const investmentReturns = {
    'Conservative': 6.5,
    'Moderately': 9.0,
    'Aggressive': 12.0
  };

  // Calculate EMI using standard formula
  const calculateEMI = (principal: number, rate: number, tenure: number): number => {
    const monthlyRate = rate / (12 * 100);
    const months = tenure * 12;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
           (Math.pow(1 + monthlyRate, months) - 1);
  };

  // Comprehensive calculation logic
  const calculations = useMemo((): ComparisonResult => {
    const loanAmount = data.propertyPrice * (1 - data.downPayment / 100);
    const downPaymentAmount = data.propertyPrice * (data.downPayment / 100);
    const monthlyEMI = calculateEMI(loanAmount, data.loanInterestRate, data.loanTenure);
    const totalInterestPaid = (monthlyEMI * data.loanTenure * 12) - loanAmount;
    
    // Property appreciation based on city and optimism
    const baseAppreciation = cityAppreciationRates[data.city as keyof typeof cityAppreciationRates] || 4.4;
    const optimismAdjustment = (data.optimismLevel - 50) * 0.05; // -2.5% to +2.5%
    const propertyAppreciation = baseAppreciation + optimismAdjustment;
    
    // Investment returns
    const investmentReturn = investmentReturns[data.investmentStrategy as keyof typeof investmentReturns];
    
    // Calculate future property value
    const netHomeValue = data.propertyPrice * Math.pow(1 + propertyAppreciation / 100, data.loanTenure);
    
    // Calculate investment scenario
    let investmentValue = 0;
    let currentRent = data.monthlyRent;
    
    // Initial investment of down payment
    investmentValue = downPaymentAmount * Math.pow(1 + investmentReturn / 100, data.loanTenure);
    
    // Annual investments of EMI-Rent difference
    for (let year = 1; year <= data.loanTenure; year++) {
      const yearlyRent = currentRent * 12;
      const yearlyEMI = monthlyEMI * 12;
      const difference = yearlyEMI - yearlyRent;
      
      if (difference > 0) {
        // Invest the difference
        const yearsRemaining = data.loanTenure - year + 1;
        investmentValue += difference * Math.pow(1 + investmentReturn / 100, yearsRemaining);
      }
      
      // Increase rent for next year
      currentRent *= (1 + data.rentIncrease / 100);
    }
    
    const totalSavings = netHomeValue - investmentValue;
    const recommendation = totalSavings > 0 ? 'BUY' : 'RENT';
    
    // Calculate break-even year
    let breakEvenYear = data.loanTenure;
    for (let year = 1; year <= data.loanTenure; year++) {
      const homeValueAtYear = data.propertyPrice * Math.pow(1 + propertyAppreciation / 100, year);
      let investmentAtYear = downPaymentAmount * Math.pow(1 + investmentReturn / 100, year);
      
      let tempRent = data.monthlyRent;
      for (let y = 1; y <= year; y++) {
        const difference = monthlyEMI * 12 - tempRent * 12;
        if (difference > 0) {
          investmentAtYear += difference * Math.pow(1 + investmentReturn / 100, year - y + 1);
        }
        tempRent *= (1 + data.rentIncrease / 100);
      }
      
      if (homeValueAtYear > investmentAtYear && breakEvenYear === data.loanTenure) {
        breakEvenYear = year;
      }
    }
    
    return {
      netHomeValue,
      investmentValue,
      totalSavings,
      recommendation,
      breakEvenYear,
      monthlyEMI,
      totalInterestPaid,
      propertyAppreciation,
      investmentReturns: investmentReturn
    };
  }, [data]);

  // Generate chart data
  const chartData = useMemo(() => {
    const data_points = [];
    const baseAppreciation = cityAppreciationRates[data.city as keyof typeof cityAppreciationRates] || 4.4;
    const optimismAdjustment = (data.optimismLevel - 50) * 0.05;
    const propertyAppreciation = baseAppreciation + optimismAdjustment;
    const investmentReturn = investmentReturns[data.investmentStrategy as keyof typeof investmentReturns];
    const downPaymentAmount = data.propertyPrice * (data.downPayment / 100);
    const monthlyEMI = calculations.monthlyEMI;
    
    let currentRent = data.monthlyRent;
    let cumulativeInvestment = downPaymentAmount;
    
    for (let year = 0; year <= data.loanTenure; year++) {
      const homeValue = data.propertyPrice * Math.pow(1 + propertyAppreciation / 100, year);
      
      if (year > 0) {
        const yearlyRent = currentRent * 12;
        const yearlyEMI = monthlyEMI * 12;
        const difference = yearlyEMI - yearlyRent;
        
        if (difference > 0) {
          cumulativeInvestment += difference;
        }
        
        currentRent *= (1 + data.rentIncrease / 100);
      }
      
      const investmentValue = cumulativeInvestment * Math.pow(1 + investmentReturn / 100, year);
      
      data_points.push({
        year,
        homeValue: Math.round(homeValue / 100000),
        investmentValue: Math.round(investmentValue / 100000),
        rentPaid: year > 0 ? Math.round((data.monthlyRent * 12 * year * Math.pow(1 + data.rentIncrease / 100, year / 2)) / 100000) : 0
      });
    }
    
    return data_points;
  }, [data, calculations]);

  const updateData = (field: keyof RentVsBuyData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    } else {
      return `$${amount.toLocaleString()}`;
    }
  };

  // Format property price for input display (without $ symbol)
  const formatPropertyPrice = (amount: number): string => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K`;
    } else {
      return amount.toString();
    }
  };

  // Parse property price from K/M format back to number
  const parsePropertyPrice = (value: string): number => {
    const numValue = parseFloat(value);
    if (value.toUpperCase().includes('M')) {
      return numValue * 1000000;
    } else if (value.toUpperCase().includes('K')) {
      return numValue * 1000;
    } else {
      return numValue || 0;
    }
  };

  return (
    <>
      <SEO 
        title="Rent vs Buy Calculator - Should You Rent or Buy a Home?"
        description="Compare renting vs buying a house with our comprehensive calculator. Analyze long-term costs, investment returns, break-even points, and make informed housing decisions."
        keywords="rent vs buy calculator, rent or buy house calculator, should I rent or buy, home buying vs renting calculator, real estate decision calculator, housing cost comparison, rent vs mortgage calculator"
        canonical="https://rupeesmart.com/rent-vs-buy-calculator"
      />
      <div className="w-full px-4">
        <div className="mb-8 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Rent vs Buy Home Calculator</h1>
          <p className="text-sm text-gray-600 max-w-3xl">
            Should you rent or buy a home? Compare the long-term financial impact of both options and make an informed decision with comprehensive analysis.
          </p>
        </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator" className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Calculator
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Results
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Location & Property Details */}
            <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Which city do you live in?</Label>
                  <Select value={data.city} onValueChange={(value) => updateData('city', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(cityAppreciationRates).map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Probable rent of the house you want to own?</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={data.monthlyRent}
                      onChange={(e) => updateData('monthlyRent', parseInt(e.target.value) || 0)}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500">/mo</span>
                  </div>
                  <Slider
                    value={[data.monthlyRent]}
                    onValueChange={(value) => updateData('monthlyRent', value[0])}
                    max={8000}
                    min={500}
                    step={100}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>By how much will the rent go up annually?</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={data.rentIncrease}
                      onChange={(e) => updateData('rentIncrease', parseInt(e.target.value) || 0)}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500">% p.a</span>
                  </div>
                  <Slider
                    value={[data.rentIncrease]}
                    onValueChange={(value) => updateData('rentIncrease', value[0])}
                    max={15}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>The cost of the house you want</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">$</span>
                    <Input
                      type="text"
                      value={formatPropertyPrice(data.propertyPrice)}
                      onChange={(e) => updateData('propertyPrice', parsePropertyPrice(e.target.value))}
                      className="flex-1"
                      placeholder="800K"
                    />
                    <span className="text-sm text-gray-500">USD</span>
                  </div>
                  <Slider
                    value={[data.propertyPrice]}
                    onValueChange={(value) => updateData('propertyPrice', value[0])}
                    max={2000000}
                    min={200000}
                    step={50000}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            </div>
            {/* Financial Details */}
            <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-lg">$</span>
                  Financial Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>The down payment you can afford</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={data.downPayment}
                      onChange={(e) => updateData('downPayment', parseInt(e.target.value) || 0)}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                  <Slider
                    value={[data.downPayment]}
                    onValueChange={(value) => updateData('downPayment', value[0])}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">
                    Amount: {formatCurrency(data.propertyPrice * (data.downPayment / 100))}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Housing loan interest rate</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={data.loanInterestRate}
                      onChange={(e) => updateData('loanInterestRate', parseFloat(e.target.value) || 0)}
                      className="flex-1"
                      step="0.1"
                    />
                    <span className="text-sm text-gray-500">% p.a.</span>
                  </div>
                  <Slider
                    value={[data.loanInterestRate]}
                    onValueChange={(value) => updateData('loanInterestRate', value[0])}
                    max={20}
                    min={1}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Loan Tenure</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={data.loanTenure}
                      onChange={(e) => updateData('loanTenure', parseInt(e.target.value) || 0)}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500">Years</span>
                  </div>
                  <Slider
                    value={[data.loanTenure]}
                    onValueChange={(value) => updateData('loanTenure', value[0])}
                    max={30}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>How would you invest your savings if you choose to rent?</Label>
                  <Select value={data.investmentStrategy} onValueChange={(value) => updateData('investmentStrategy', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Conservative">Conservative (6.5% returns)</SelectItem>
                      <SelectItem value="Moderately">Moderately (9.0% returns)</SelectItem>
                      <SelectItem value="Aggressive">Aggressive (12.0% returns)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Your optimism levels about housing prices</Label>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">
                    <Slider
                      value={[data.optimismLevel]}
                      onValueChange={(value) => updateData('optimismLevel', value[0])}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Highly Pessimistic</span>
                      <span>Neutral</span>
                      <span>Highly Optimistic</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          </div>

          {/* Quick Results Preview */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <h3 className="text-xl font-bold">
                  You may be better off {calculations.recommendation === 'RENT' ? 'renting' : 'buying'} your dream house
                </h3>
                <div className="flex justify-center items-center gap-6 text-sm">
                  <span>Annual home price appreciation: {calculations.propertyAppreciation.toFixed(1)}%</span>
                  <span>Annual investment returns: {calculations.investmentReturns.toFixed(1)}%</span>
                </div>
                <div className="flex justify-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(calculations.netHomeValue)}
                    </div>
                    <div className="text-sm text-gray-600">NET HOME PRICE</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {formatCurrency(calculations.investmentValue)}
                    </div>
                    <div className="text-sm text-gray-600">INVESTMENT VALUE</div>
                  </div>
                </div>
                <Button 
                  onClick={() => setActiveTab('results')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  View Detailed Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {calculations.recommendation}
                </div>
                <div className="text-sm text-gray-600">Recommendation</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(Math.abs(calculations.totalSavings))}
                </div>
                <div className="text-sm text-gray-600">
                  {calculations.totalSavings > 0 ? 'Buying Advantage' : 'Renting Advantage'}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {calculations.breakEvenYear} years
                </div>
                <div className="text-sm text-gray-600">Break-even Point</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {formatCurrency(calculations.monthlyEMI)}
                </div>
                <div className="text-sm text-gray-600">Monthly EMI</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Wealth Accumulation Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any, name: string) => [
                          `$${value} L`, 
                          name === 'homeValue' ? 'Home Value' : 
                          name === 'investmentValue' ? 'Investment Value' : 'Rent Paid'
                        ]}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="homeValue" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        name="Home Value"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="investmentValue" 
                        stroke="#8b5cf6" 
                        strokeWidth={3}
                        name="Investment Value"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      {
                        name: 'Total Cost',
                        buying: Math.round((calculations.monthlyEMI * data.loanTenure * 12 + data.propertyPrice * (data.downPayment / 100)) / 100000),
                        renting: Math.round((data.monthlyRent * 12 * data.loanTenure * Math.pow(1 + data.rentIncrease / 100, data.loanTenure / 2)) / 100000)
                      }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any, name: string) => [
                          `$${value} L`, 
                          name === 'buying' ? 'Total Buying Cost' : 'Total Renting Cost'
                        ]}
                      />
                      <Legend />
                      <Bar dataKey="buying" fill="#3b82f6" name="Buying Cost" />
                      <Bar dataKey="renting" fill="#8b5cf6" name="Renting Cost" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Buying Scenario</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Property Price:</span>
                  <span className="font-semibold">{formatCurrency(data.propertyPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Down Payment ({data.downPayment}%):</span>
                  <span className="font-semibold">{formatCurrency(data.propertyPrice * (data.downPayment / 100))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Amount:</span>
                  <span className="font-semibold">{formatCurrency(data.propertyPrice * (1 - data.downPayment / 100))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly EMI:</span>
                  <span className="font-semibold">{formatCurrency(calculations.monthlyEMI)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Interest Paid:</span>
                  <span className="font-semibold">{formatCurrency(calculations.totalInterestPaid)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Property Value After {data.loanTenure} Years:</span>
                  <span className="font-semibold text-green-600">{formatCurrency(calculations.netHomeValue)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-purple-600">Renting Scenario</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Current Monthly Rent:</span>
                  <span className="font-semibold">{formatCurrency(data.monthlyRent)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Rent Increase:</span>
                  <span className="font-semibold">{data.rentIncrease}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Initial Investment:</span>
                  <span className="font-semibold">{formatCurrency(data.propertyPrice * (data.downPayment / 100))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Investment Strategy:</span>
                  <span className="font-semibold">{data.investmentStrategy}</span>
                </div>
                <div className="flex justify-between">
                  <span>Expected Returns:</span>
                  <span className="font-semibold">{calculations.investmentReturns}% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span>Investment Value After {data.loanTenure} Years:</span>
                  <span className="font-semibold text-green-600">{formatCurrency(calculations.investmentValue)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
        
        {/* Educational Content Section */}
        <div className="w-full px-6">
          <div className="space-y-8">
            
            {/* How to Use Calculator */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">How to Use the Rent vs Buy Calculator</h2>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>
                  First, you should be able to afford the monthly home loan EMIs before you decide to buy a house. If you can't afford to set aside these big amounts, you might want to buy a cheaper house that won't cost you so much each month.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-base">Owning a House</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• You make a down payment, take out a loan, and own the house right away.</li>
                    <li>• You save money on rent and your house goes up in value over time.</li>
                    <li>• When rent is higher than EMI, we invest the difference until the loan is paid off.</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-base">Renting the Same House</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• The down payment goes into investments that are linked to the market.</li>
                    <li>• Put the difference between your EMI and your monthly rent into an investment.</li>
                    <li>• This difference gets smaller as rent goes up each year.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Factors Affecting Decision */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Factors Affecting Rent vs Buy Decision</h3>
              
              <div className="grid md:grid-cols-3 gap-4 space-y-4 md:space-y-0">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-base">Economic Considerations</h4>
                  <p className="text-gray-600 text-sm">
                    The cost of owning a home versus renting is greatly affected by interest rates, inflation, and economic growth. When interest rates are low, buying a home is more appealing.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-base">Flexibility and Lifestyle</h4>
                  <p className="text-gray-600 text-sm">
                    Renting lets you move around easily and doesn't cost anything to keep up. People who want stability and control over their living space are drawn to buying.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-base">Real Estate Market Trends</h4>
                  <p className="text-gray-600 text-sm">
                    Prices for real estate are very different in different cities. The decision is greatly affected by looking at local trends, demand, and plans for development.
                  </p>
                </div>
              </div>
            </section>

            {/* City-wise Analysis */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">City-wise Property Appreciation Rates</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(cityAppreciationRates).map(([city, rate]) => (
                  <div key={city} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-sm text-gray-900">{city}</div>
                    <div className="text-lg font-bold text-blue-600">{rate}%</div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Pros and Cons Section */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Renting vs Buying: Pros and Cons</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Buying Pros */}
                <section className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <h4 className="text-lg font-semibold text-green-800">Benefits of Buying</h4>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span className="text-sm text-gray-700"><strong>Build Equity:</strong> Monthly payments build ownership value over time.</span></li>
                    <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span className="text-sm text-gray-700"><strong>Property Appreciation:</strong> Property values typically increase over time.</span></li>
                    <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span className="text-sm text-gray-700"><strong>Tax Benefits:</strong> Mortgage interest and property tax deductions.</span></li>
                    <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span className="text-sm text-gray-700"><strong>Stability:</strong> No rent increases or landlord restrictions.</span></li>
                  </ul>
                </section>
                
                {/* Buying Cons */}
                <section className="bg-red-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✗</span>
                    </div>
                    <h4 className="text-lg font-semibold text-red-800">Drawbacks of Buying</h4>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span className="text-sm text-gray-700"><strong>High Down Payment:</strong> Requires significant upfront capital investment.</span></li>
                    <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span className="text-sm text-gray-700"><strong>Maintenance Costs:</strong> Responsible for all repairs and upkeep expenses.</span></li>
                    <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span className="text-sm text-gray-700"><strong>Less Flexibility:</strong> Harder to relocate for job or lifestyle changes.</span></li>
                    <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span className="text-sm text-gray-700"><strong>Market Risk:</strong> Property values can decline in economic downturns.</span></li>
                  </ul>
                </section>
              </div>
            </section>
            
            {/* Call to Action Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 text-center mt-12 rounded-lg">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">Make Your Housing Decision Today</h3>
                <p className="text-blue-100 text-base mb-6 max-w-2xl mx-auto">
                  Use our comprehensive rent vs buy calculator to analyze your specific situation. Compare costs, investment returns, and break-even points to make the right choice for your financial future.
                </p>
                <Button 
                  onClick={() => {
                    setActiveTab('calculator');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                >
                  Start Your Analysis
                </Button>
              </div>
            </section>
            
          </div>
        </div>
        </TabsContent>
      </Tabs>
      </div>
    </>
  );
};

export default RentVsBuyCalculator;