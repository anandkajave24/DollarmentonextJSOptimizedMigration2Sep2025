import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar } from 'recharts';
import { TrendingUp, Calculator, DollarSign, Clock, Target, HelpCircle } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Helmet } from 'react-helmet';

export default function CAGRCalculator() {
  const [beginningValue, setBeginningValue] = useState(10000);
  const [endingValue, setEndingValue] = useState(25000);
  const [investmentPeriod, setInvestmentPeriod] = useState(5);
  const [periodUnit, setPeriodUnit] = useState('years');
  
  // Multiple investments tracking
  const [investments, setInvestments] = useState([
    { id: 1, name: 'Investment 1', beginning: 10000, ending: 25000, years: 5 }
  ]);

  const [cagr, setCagr] = useState(0);
  const [totalReturn, setTotalReturn] = useState(0);
  const [annualizedReturn, setAnnualizedReturn] = useState(0);

  useEffect(() => {
    calculateCAGR();
  }, [beginningValue, endingValue, investmentPeriod, periodUnit]);

  const calculateCAGR = () => {
    if (beginningValue <= 0 || endingValue <= 0 || investmentPeriod <= 0) {
      setCagr(0);
      setTotalReturn(0);
      setAnnualizedReturn(0);
      return;
    }

    // Convert period to years if needed
    let periodInYears = investmentPeriod;
    if (periodUnit === 'months') {
      periodInYears = investmentPeriod / 12;
    } else if (periodUnit === 'days') {
      periodInYears = investmentPeriod / 365;
    }

    // CAGR = (Ending Value / Beginning Value)^(1/number of years) - 1
    const cagrValue = Math.pow(endingValue / beginningValue, 1 / periodInYears) - 1;
    const totalRet = ((endingValue - beginningValue) / beginningValue) * 100;
    const annualizedRet = cagrValue * 100;

    setCagr(cagrValue * 100);
    setTotalReturn(totalRet);
    setAnnualizedReturn(annualizedRet);
  };

  const addInvestment = () => {
    const newInvestment = {
      id: investments.length + 1,
      name: `Investment ${investments.length + 1}`,
      beginning: 5000,
      ending: 8000,
      years: 3
    };
    setInvestments([...investments, newInvestment]);
  };

  const updateInvestment = (id: number, field: string, value: string | number) => {
    setInvestments(investments.map(inv => 
      inv.id === id ? { ...inv, [field]: value } : inv
    ));
  };

  const removeInvestment = (id: number) => {
    if (investments.length > 1) {
      setInvestments(investments.filter(inv => inv.id !== id));
    }
  };

  const calculateInvestmentCAGR = (beginning: number, ending: number, years: number) => {
    if (beginning <= 0 || ending <= 0 || years <= 0) return 0;
    return (Math.pow(ending / beginning, 1 / years) - 1) * 100;
  };

  const generateProjectionData = () => {
    const data = [];
    const periodInYears = periodUnit === 'years' ? investmentPeriod : 
                         periodUnit === 'months' ? investmentPeriod / 12 : 
                         investmentPeriod / 365;
    
    for (let year = 0; year <= Math.ceil(periodInYears); year++) {
      const projectedValue = beginningValue * Math.pow(1 + (cagr / 100), year);
      data.push({
        year: year,
        value: projectedValue,
        actualValue: year === Math.ceil(periodInYears) ? endingValue : null
      });
    }
    return data;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const projectionData = generateProjectionData();

  const investmentComparison = investments.map(inv => ({
    name: inv.name,
    cagr: calculateInvestmentCAGR(inv.beginning, inv.ending, inv.years),
    totalReturn: ((inv.ending - inv.beginning) / inv.beginning) * 100,
    beginning: inv.beginning,
    ending: inv.ending
  }));

  return (
    <>
      <Helmet>
        <title>CAGR Calculator - Compound Annual Growth Rate Calculator | DollarMento</title>
        <meta name="description" content="Calculate Compound Annual Growth Rate (CAGR) for investments. Analyze investment performance and annual returns over multiple periods." />
        <meta name="keywords" content="cagr calculator, compound annual growth rate calculator, investment return calculator, annual growth rate calculator, investment performance calculator, cagr formula calculator" />
        <link rel="canonical" href="https://dollarmento.com/cagr-calculator" />
      </Helmet>
      <TooltipProvider>
      <div className="w-full p-6 space-y-8">
        <div className="text-left space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">CAGR Calculator (Compound Annual Growth Rate)</h1>
          <p className="text-lg text-gray-600 max-w-3xl">Measure the annual growth rate of investments over a specified time period. Compare investment performance and analyze returns using standardized growth rates.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            {/* Investment Values */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Investment Values
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="beginningValue">Beginning Value</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Initial investment value at the start of the period</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Input
                    id="beginningValue"
                    type="number"
                    value={beginningValue}
                    onChange={(e) => setBeginningValue(Number(e.target.value))}
                    placeholder="$10,000"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="endingValue">Ending Value</Label>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Final investment value at the end of the period</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <Input
                    id="endingValue"
                    type="number"
                    value={endingValue}
                    onChange={(e) => setEndingValue(Number(e.target.value))}
                    placeholder="$25,000"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="investmentPeriod">Time Period</Label>
                      <UITooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Duration of the investment period</p>
                        </TooltipContent>
                      </UITooltip>
                    </div>
                    <Input
                      id="investmentPeriod"
                      type="number"
                      value={investmentPeriod}
                      onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <Label>Period Unit</Label>
                    <Select value={periodUnit} onValueChange={setPeriodUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="years">Years</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CAGR Formula */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  CAGR Formula
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-lg font-mono font-bold">CAGR = (EV/BV)^(1/n) - 1</p>
                      <p className="text-sm text-gray-600 mt-2">Where EV = Ending Value, BV = Beginning Value, n = Years</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium">Beginning Value:</span>
                      <span className="ml-2">{formatCurrency(beginningValue)}</span>
                    </div>
                    <div>
                      <span className="font-medium">Ending Value:</span>
                      <span className="ml-2">{formatCurrency(endingValue)}</span>
                    </div>
                    <div>
                      <span className="font-medium">Time Period:</span>
                      <span className="ml-2">{investmentPeriod} {periodUnit}</span>
                    </div>
                    <div>
                      <span className="font-medium">CAGR:</span>
                      <span className="ml-2 font-bold text-green-600">{formatPercentage(cagr)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Multiple Investments Comparison */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Investment Comparison
                  </CardTitle>
                  <Button onClick={addInvestment} size="sm" variant="outline">
                    Add Investment
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {investments.map((investment, index) => (
                  <div key={investment.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <Input
                        value={investment.name}
                        onChange={(e) => updateInvestment(investment.id, 'name', e.target.value)}
                        className="font-medium max-w-40"
                      />
                      {investments.length > 1 && (
                        <Button 
                          onClick={() => removeInvestment(investment.id)} 
                          size="sm" 
                          variant="ghost"
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs">Start Value</Label>
                        <Input
                          type="number"
                          value={investment.beginning}
                          onChange={(e) => updateInvestment(investment.id, 'beginning', Number(e.target.value))}
                          placeholder="$10,000"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">End Value</Label>
                        <Input
                          type="number"
                          value={investment.ending}
                          onChange={(e) => updateInvestment(investment.id, 'ending', Number(e.target.value))}
                          placeholder="$25,000"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Years</Label>
                        <Input
                          type="number"
                          value={investment.years}
                          onChange={(e) => updateInvestment(investment.id, 'years', Number(e.target.value))}
                          placeholder="5"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">CAGR:</span>
                        <span className="font-medium text-green-600">
                          {formatPercentage(calculateInvestmentCAGR(investment.beginning, investment.ending, investment.years))}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>


          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">CAGR</p>
                      <p className="text-2xl font-bold text-green-600">{formatPercentage(cagr)}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Return</p>
                      <p className="text-2xl font-bold text-blue-600">{formatPercentage(totalReturn)}</p>
                    </div>
                    <Calculator className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Absolute Gain</p>
                      <p className="text-2xl font-bold text-purple-600">{formatCurrency(endingValue - beginningValue)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Time Period</p>
                      <p className="text-2xl font-bold text-orange-600">{investmentPeriod}</p>
                      <p className="text-xs text-gray-500">{periodUnit}</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Growth Projection Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Growth Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="year" 
                        label={{ value: 'Years', position: 'insideBottom', offset: -10 }} 
                      />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#10b981" 
                        strokeWidth={3} 
                        name="CAGR Projection" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Investment Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Investment CAGR Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={investmentComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => [formatPercentage(value), 'CAGR']}
                      />
                      <Bar dataKey="cagr" fill="#10b981" name="CAGR %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>






          </div>
        </div>
      </div>

      {/* Educational Content Section - Full Width */}
      <div className="w-full">
        <div className="px-6 py-8">
          <div className="space-y-6">
            
            {/* Main Introduction */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Understanding CAGR (Compound Annual Growth Rate)
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                CAGR is a powerful metric that smooths out returns to show what you would have earned annually if your investment grew at a steady rate. It's the standard way to measure and compare investment performance across different time periods and investment types.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Unlike simple averages, CAGR accounts for the compounding effect of returns, providing a more accurate picture of an investment's true growth rate over time.
              </p>
            </div>

            {/* How to Use Calculator */}
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Use This Calculator</h3>
              
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <span className="font-medium text-blue-600 text-sm mt-0.5">1.</span>
                  <p className="text-gray-600 text-sm">Type in the values of the investments at the start and end</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-medium text-blue-600 text-sm mt-0.5">2.</span>
                  <p className="text-gray-600 text-sm">Choose the unit and time period</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-medium text-blue-600 text-sm mt-0.5">3.</span>
                  <p className="text-gray-600 text-sm">Look over the total return and CAGR that you calculated</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-medium text-blue-600 text-sm mt-0.5">4.</span>
                  <p className="text-gray-600 text-sm">If you need to, compare more than one investment</p>
                </div>
              </div>
            </section>

            {/* CAGR vs Average Return */}
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">CAGR vs Average Annual Return</h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-1">CAGR (Compound Annual Growth Rate)</h4>
                  <p className="text-gray-600 text-sm">
                    Shows the rate needed to grow from beginning to ending value, smoothing out volatility and providing the true annualized return.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-1">Average Annual Return</h4>
                  <p className="text-gray-600 text-sm">
                    Simply the arithmetic mean of yearly returns, which can be misleading during volatile periods as it doesn't account for compounding.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-1">Why CAGR is Better</h4>
                  <p className="text-gray-600 text-sm">
                    CAGR provides a single number that represents the growth rate needed to achieve actual results, making it ideal for performance comparison.
                  </p>
                </div>
              </div>
            </section>

            {/* Important Notes */}
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Important Considerations</h3>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <p className="text-gray-600 text-sm">CAGR assumes that the growth rate stays the same over time.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <p className="text-gray-600 text-sm">The actual returns may be very different from one year to the next.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <p className="text-gray-600 text-sm">Doesn't include taxes, fees, or dividends in calculations.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <p className="text-gray-600 text-sm">Past results do not guarantee future performance.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <p className="text-gray-600 text-sm">CAGR doesn't show volatility - two investments with the same CAGR may have very different risk profiles.</p>
                </div>
              </div>
            </section>

            {/* CAGR Analysis and Evaluation */}
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">CAGR Analysis and Investment Evaluation</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-2">CAGR and Simple Returns</h4>
                  <p className="text-gray-600 text-sm">
                    CAGR shows true annualized growth by smoothing out changes, but simple returns can be misleading over several years. Use CAGR to compare investments over time in a fair way.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-2">Benchmark Comparisons</h4>
                  <p className="text-gray-600 text-sm">
                    Compare your investment CAGR against benchmarks like the S&P 500 (historically ~10%), bonds (~5%), or inflation (~3%). This helps determine if active management costs are justified.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-2">Risk-Adjusted Returns</h4>
                  <p className="text-gray-600 text-sm">
                    Higher CAGR isn't always better if it comes with high volatility. For complete performance analysis, consider CAGR alongside Sharpe ratio and maximum drawdown.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-2">Future Projections</h4>
                  <p className="text-gray-600 text-sm">
                    Use historical CAGR cautiously for future predictions. While helpful for setting realistic financial goals, past performance doesn't guarantee future results.
                  </p>
                </div>
              </div>
            </section>

            {/* Pros and Cons Section */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Pros and Cons of CAGR Analysis</h2>
              <p className="text-sm text-gray-600 mb-6">Understanding the advantages and disadvantages of using CAGR for investment evaluation</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pros Column */}
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-semibold">✓</span>
                    </div>
                    <h3 className="font-semibold text-green-700 text-lg">Pros</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Smooth Performance Measure</h4>
                        <p className="text-gray-600 text-sm">Provides a steady annual growth rate that smooths out volatility.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Easy Comparison</h4>
                        <p className="text-gray-600 text-sm">Compare different investments across various time periods easily.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Industry Standard</h4>
                        <p className="text-gray-600 text-sm">Widely used metric that investment professionals understand.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cons Column */}
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-semibold">✗</span>
                    </div>
                    <h3 className="font-semibold text-red-700 text-lg">Cons</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-red-600 mr-2 mt-1">✗</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Hides Volatility</h4>
                        <p className="text-gray-600 text-sm">Doesn't show the ups and downs experienced during investment period.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-600 mr-2 mt-1">✗</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Past Performance Only</h4>
                        <p className="text-gray-600 text-sm">Based on historical data and doesn't predict future returns.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-600 mr-2 mt-1">✗</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Ignores Risk</h4>
                        <p className="text-gray-600 text-sm">Doesn't account for investment risk or maximum drawdowns.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Use Calculator Section */}
            <section className="mb-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Why Use a CAGR Calculator?</h3>
                <p className="text-sm text-gray-600">Make informed decisions about your investment performance analysis</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-1">Performance Analysis</h4>
                  <p className="text-gray-600 text-sm">
                    Analyze investment returns and compare performance across different time periods.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-1">Goal Setting</h4>
                  <p className="text-gray-600 text-sm">
                    Set realistic return expectations based on historical performance data.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-1">Investment Comparison</h4>
                  <p className="text-gray-600 text-sm">
                    Compare different investment options using standardized growth rates.
                  </p>
                </div>
              </div>
            </section>

            {/* Investment Performance Benchmarks */}
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Investment Performance Benchmarks</h3>
              
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 text-sm mb-1">Conservative (3-5%)</h4>
                  <p className="text-gray-600 text-xs">Bonds, CDs, high-grade corporate bonds</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 text-sm mb-1">Moderate (6-8%)</h4>
                  <p className="text-gray-600 text-xs">Balanced funds, dividend stocks, REITs</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 text-sm mb-1">Market Average (10%)</h4>
                  <p className="text-gray-600 text-xs">S&P 500 historical average</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 text-sm mb-1">Aggressive (12%+)</h4>
                  <p className="text-gray-600 text-xs">Growth stocks, emerging markets</p>
                </div>
              </div>
            </section>

            {/* Your Investment Performance */}
            {cagr !== 0 && (
              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Investment Performance</h3>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-800 text-base">Performance Assessment</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {cagr > 10 ? "Excellent performance - above market average" :
                     cagr > 7 ? "Good performance - meets market expectations" :
                     cagr > 0 ? "Positive growth - below market average" :
                     "Negative returns - investment lost value"}
                  </p>
                </div>
              </section>
            )}

            {/* FAQ Section */}
            <section className="mb-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Frequently Asked Questions</h3>
                <p className="text-sm text-gray-600">Common questions about CAGR calculations and investment analysis</p>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    What is a good CAGR for investments?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    A good CAGR depends on the investment type and risk level. The S&P 500 historically averages about 10% CAGR. Conservative investments like bonds might achieve 3-5%, while growth stocks could exceed 12% but with higher risk.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    How is CAGR different from average annual return?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    CAGR shows the rate needed to grow from beginning to ending value, smoothing out volatility. Average annual return is simply the arithmetic mean of yearly returns, which can be misleading during volatile periods.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    Can CAGR be negative?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Yes, CAGR can be negative when investments lose value over time. A negative CAGR indicates that the investment has declined at a compound annual rate, helping quantify loss rates over multiple years.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    Should I use CAGR alone to evaluate investments?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    No, CAGR should be used alongside other metrics like volatility, maximum drawdown, and Sharpe ratio. CAGR doesn't show risk or the path taken to achieve returns, which are crucial for investment decisions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Call to Action Section */}
            <section className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-blue-800 mb-3">Analyze Your Investment Performance</h3>
              <p className="text-sm text-gray-700 mb-4">
                Use our CAGR calculator to measure investment performance and compare returns across different time periods.
              </p>
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Calculate Your CAGR Now
              </Button>
            </section>

          </div>
        </div>
      </div>
    </TooltipProvider>
    </>
  );
}