import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { SEO } from "../components/SEO";
import { Helmet } from 'react-helmet';

export default function CapitalGainsTaxCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(10000);
  const [salePrice, setSalePrice] = useState(15000);
  const [holdingPeriod, setHoldingPeriod] = useState(18);
  const [filingStatus, setFilingStatus] = useState('single');
  const [annualIncome, setAnnualIncome] = useState(75000);
  const [state, setState] = useState('california');

  // Tax brackets for 2024
  const longTermCapitalGainsRates = {
    single: [
      { min: 0, max: 47025, rate: 0 },
      { min: 47025, max: 518900, rate: 15 },
      { min: 518900, max: Infinity, rate: 20 }
    ],
    marriedJoint: [
      { min: 0, max: 94050, rate: 0 },
      { min: 94050, max: 583750, rate: 15 },
      { min: 583750, max: Infinity, rate: 20 }
    ]
  };

  const shortTermTaxBrackets = {
    single: [
      { min: 0, max: 11000, rate: 10 },
      { min: 11000, max: 44725, rate: 12 },
      { min: 44725, max: 95375, rate: 22 },
      { min: 95375, max: 182050, rate: 24 },
      { min: 182050, max: 231250, rate: 32 },
      { min: 231250, max: 578125, rate: 35 },
      { min: 578125, max: Infinity, rate: 37 }
    ],
    marriedJoint: [
      { min: 0, max: 22000, rate: 10 },
      { min: 22000, max: 89450, rate: 12 },
      { min: 89450, max: 190750, rate: 22 },
      { min: 190750, max: 364200, rate: 24 },
      { min: 364200, max: 462500, rate: 32 },
      { min: 462500, max: 693750, rate: 35 },
      { min: 693750, max: Infinity, rate: 37 }
    ]
  };

  // State tax rates on capital gains
  const stateTaxRates = {
    california: 13.3,
    newyork: 8.82,
    texas: 0,
    florida: 0,
    washington: 0,
    nevada: 0,
    tennessee: 0,
    wyoming: 0,
    southdakota: 0
  };

  // Calculations
  const capitalGain = salePrice - purchasePrice;
  const isLongTerm = holdingPeriod > 12;
  
  // Federal tax calculation
  let federalTax = 0;
  if (isLongTerm) {
    const brackets = longTermCapitalGainsRates[filingStatus as keyof typeof longTermCapitalGainsRates];
    for (const bracket of brackets) {
      if (annualIncome + capitalGain > bracket.min) {
        const taxableAtThisRate = Math.min(
          Math.max(0, annualIncome + capitalGain - bracket.min),
          bracket.max - bracket.min
        );
        federalTax += (taxableAtThisRate * bracket.rate) / 100;
      }
    }
  } else {
    // Short-term gains taxed as ordinary income
    const brackets = shortTermTaxBrackets[filingStatus as keyof typeof shortTermTaxBrackets];
    let remainingGain = capitalGain;
    
    for (const bracket of brackets) {
      if (remainingGain > 0 && annualIncome + capitalGain > bracket.min) {
        const taxableAtThisRate = Math.min(remainingGain, bracket.max - Math.max(bracket.min, annualIncome));
        if (taxableAtThisRate > 0) {
          federalTax += (taxableAtThisRate * bracket.rate) / 100;
          remainingGain -= taxableAtThisRate;
        }
      }
    }
  }

  // State tax
  const stateRate = stateTaxRates[state as keyof typeof stateTaxRates];
  const stateTax = (capitalGain * stateRate) / 100;

  // Net Investment Income Tax (NIIT) - 3.8% on investment income
  const niitThreshold = filingStatus === 'single' ? 200000 : 250000;
  const niitTax = (annualIncome > niitThreshold) ? (capitalGain * 3.8) / 100 : 0;

  const totalTax = federalTax + stateTax + niitTax;
  const netProceeds = capitalGain - totalTax;
  const effectiveTaxRate = capitalGain > 0 ? (totalTax / capitalGain) * 100 : 0;

  // Chart data
  const taxBreakdown = [
    { name: 'Federal Tax', value: federalTax, fill: '#3b82f6' },
    { name: 'State Tax', value: stateTax, fill: '#ef4444' },
    { name: 'NIIT', value: niitTax, fill: '#f59e0b' },
    { name: 'Net Proceeds', value: netProceeds, fill: '#10b981' }
  ].filter(item => item.value > 0);

  const comparisonData = [
    { 
      name: 'Short-term',
      federalRate: shortTermTaxBrackets[filingStatus as keyof typeof shortTermTaxBrackets]
        .find(b => annualIncome >= b.min && annualIncome <= b.max)?.rate || 0,
      stateRate,
      totalRate: 0
    },
    {
      name: 'Long-term',
      federalRate: longTermCapitalGainsRates[filingStatus as keyof typeof longTermCapitalGainsRates]
        .find(b => annualIncome >= b.min && annualIncome <= b.max)?.rate || 0,
      stateRate,
      totalRate: 0
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    });
  };

  return (
    <>
      <Helmet>
        <title>Capital Gains Tax Calculator - Long & Short Term Capital Gains Calculator | DollarMento</title>
        <meta name="description" content="Calculate capital gains tax on investments and assets. Compare long-term vs short-term capital gains tax rates and optimize your tax strategy." />
        <meta name="keywords" content="capital gains tax calculator, capital gains calculator, short term capital gains calculator, long term capital gains calculator, investment tax calculator, stock tax calculator" />
        <link rel="canonical" href="https://dollarmento.com/capital-gains-tax-calculator" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
      <SEO 
        title="Capital Gains Tax Calculator - Federal & State Tax on Investments"
        description="Calculate capital gains tax on stock sales, real estate, and investments. Includes federal, state, and NIIT calculations for accurate tax planning."
        keywords="capital gains tax calculator, investment tax calculator, stock sale tax, long term capital gains, short term capital gains, NIIT tax"
        canonical="https://dollarmento.com/capital-gains-tax-calculator"
      />
      
      <div className="w-full px-4">
        <div className="text-left mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Capital Gains Tax Calculator</h1>
          <p className="text-sm text-gray-600 max-w-3xl">
            Calculate federal and state capital gains tax on your investment sales and stock transactions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Panel - 40% width */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-500 rounded"></span>
                  Investment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="purchasePrice" className="flex items-center gap-1">
                      Purchase Price
                      <span className="text-blue-500 cursor-help" title="Original cost basis of the investment">ⓘ</span>
                    </Label>
                    <Input
                      id="purchasePrice"
                      type="number"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(Number(e.target.value))}
                      className="mt-1"
                      min="0"
                      step="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="salePrice" className="flex items-center gap-1">
                      Sale Price
                      <span className="text-blue-500 cursor-help" title="Amount received from selling the investment">ⓘ</span>
                    </Label>
                    <Input
                      id="salePrice"
                      type="number"
                      value={salePrice}
                      onChange={(e) => setSalePrice(Number(e.target.value))}
                      className="mt-1"
                      min="0"
                      step="100"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="holdingPeriod" className="flex items-center gap-1">
                    Holding Period (Months)
                    <span className="text-blue-500 cursor-help" title="How long you held the investment (>12 months = long-term)">ⓘ</span>
                  </Label>
                  <Input
                    id="holdingPeriod"
                    type="number"
                    value={holdingPeriod}
                    onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                    className="mt-1"
                    min="1"
                    max="600"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Tax Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="annualIncome" className="flex items-center gap-1">
                    Annual Income
                    <span className="text-blue-500 cursor-help" title="Your total annual income for tax bracket determination">ⓘ</span>
                  </Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    className="mt-1"
                    min="0"
                    step="1000"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="filingStatus">Filing Status</Label>
                    <Select value={filingStatus} onValueChange={setFilingStatus}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="marriedJoint">Married Filing Jointly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="california">California (13.3%)</SelectItem>
                        <SelectItem value="newyork">New York (8.82%)</SelectItem>
                        <SelectItem value="texas">Texas (0%)</SelectItem>
                        <SelectItem value="florida">Florida (0%)</SelectItem>
                        <SelectItem value="washington">Washington (0%)</SelectItem>
                        <SelectItem value="nevada">Nevada (0%)</SelectItem>
                        <SelectItem value="tennessee">Tennessee (0%)</SelectItem>
                        <SelectItem value="wyoming">Wyoming (0%)</SelectItem>
                        <SelectItem value="southdakota">South Dakota (0%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How to Use Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">How to Use This Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">1.</span>
                    <span>Type in the prices you paid and received for the investment.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Enter the holding period to find out how taxes will be paid.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Tell them how much money you make each year and how you file your taxes.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Pick your state to get the right tax calculation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel - 60% width */}
          <div className="lg:col-span-3 space-y-4">
            {/* Tax Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-red-500 rounded"></span>
                  Tax Calculation Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(capitalGain)}</div>
                    <div className="text-sm text-gray-600">Capital Gain</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{formatCurrency(totalTax)}</div>
                    <div className="text-sm text-gray-600">Total Tax</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(netProceeds)}</div>
                    <div className="text-sm text-gray-600">Net Proceeds</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatNumber(effectiveTaxRate, 1)}%</div>
                    <div className="text-sm text-gray-600">Effective Rate</div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <div className="text-sm font-medium text-yellow-800">
                    Tax Treatment: {isLongTerm ? 'Long-term' : 'Short-term'} Capital Gains
                  </div>
                  <div className="text-xs text-yellow-600">
                    {isLongTerm ? 'Held for more than 12 months - preferential tax rates apply' : 'Held for 12 months or less - taxed as ordinary income'}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tax Breakdown Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Tax Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taxBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {taxBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} stroke="#fff" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Tax Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-yellow-500 rounded"></span>
                  Detailed Tax Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">Federal Capital Gains Tax</span>
                    <span className="font-medium">{formatCurrency(federalTax)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">State Tax ({formatNumber(stateRate, 1)}%)</span>
                    <span className="font-medium">{formatCurrency(stateTax)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">Net Investment Income Tax (3.8%)</span>
                    <span className="font-medium">{formatCurrency(niitTax)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 font-medium border-t">
                    <span>Total Tax Owed</span>
                    <span>{formatCurrency(totalTax)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tax Rate Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Holding Period Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium text-red-800">Short-term (≤12 months)</div>
                      <div className="text-red-600">Taxed as ordinary income</div>
                      <div className="text-lg font-bold text-red-700">
                        {shortTermTaxBrackets[filingStatus as keyof typeof shortTermTaxBrackets]
                          .find(b => annualIncome >= b.min && annualIncome <= b.max)?.rate || 0}% + {formatNumber(stateRate, 1)}%
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800">Long-term (&gt;12 months)</div>
                      <div className="text-green-600">Preferential tax rates</div>
                      <div className="text-lg font-bold text-green-700">
                        {longTermCapitalGainsRates[filingStatus as keyof typeof longTermCapitalGainsRates]
                          .find(b => annualIncome + capitalGain >= b.min && annualIncome + capitalGain <= b.max)?.rate || 0}% + {formatNumber(stateRate, 1)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    * NIIT of 3.8% may apply to high-income taxpayers
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="w-full mt-8 space-y-6">
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tips for Planning Your Taxes</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">• You need to hold for more than a year to get long-term rates.</p>
              <p className="text-sm text-gray-600">• <strong>Tax-loss harvesting:</strong> Use losses to make up for gains</p>
              <p className="text-sm text-gray-600">• <strong>Timing Sales:</strong> Spread out your profits over a number of tax years</p>
              <p className="text-sm text-gray-600">• <strong>Retirement accounts:</strong> no tax on capital gains</p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Rate Structure</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">• <strong>Long-term Rates:</strong> 0%, 15%, or 20%</p>
              <p className="text-sm text-gray-600">• <strong>Short-term:</strong> The same as rates for income tax</p>
              <p className="text-sm text-gray-600">• <strong>NIIT:</strong> 3.8% for people who earn a lot of money</p>
              <p className="text-sm text-gray-600">• <strong>State Taxes:</strong> 0% to 13.3%, depending on the state</p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notes</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Consider the costs and fees of doing business</p>
              <p className="text-sm text-gray-600">• The amount of state tax you pay may depend on how much money you make.</p>
              <p className="text-sm text-gray-600">• Some states don't charge taxes on money made from selling stocks</p>
              <p className="text-sm text-gray-600">• If things get too complicated, talk to a tax expert.</p>
            </div>
          </section>

          {/* Advanced Capital Gains Tax Optimization */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Capital Gains Tax Optimization</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Taking away tax losses</h4>
                <p className="text-sm text-gray-600">
                  Use capital losses to lower your capital gains tax bill. You can take up to $3,000 in net losses off of your regular income each year. You can carry over any losses that are more than that to the next year.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Plan for Where to Keep Your Assets</h4>
                <p className="text-sm text-gray-600">
                  To lower the amount of taxes you have to pay on all of your accounts, keep high-growth investments in Roth IRAs, dividend stocks in traditional IRAs, and tax-efficient investments in taxable accounts.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Timing Strategies</h4>
                <p className="text-sm text-gray-600">
                  To keep your tax brackets in check, plan when to sell assets over several tax years. To keep your tax brackets in good shape, you might want to group gains in years when your income is low or spread big gains over several years.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Tax on Net Investment Income</h4>
                <p className="text-sm text-gray-600">
                  If your adjusted gross income (AGI) is more than $200,000 for a single person or $250,000 for a married couple, you have to pay an extra 3.8% Net Investment Income Tax on your investment income. Plan ahead for how to pay this extra tax.
                </p>
              </div>
            </div>
          </section>

          {/* Capital Gains Tax: Pros and Cons */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Capital Gains Tax: Pros and Cons</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pros Section */}
              <section className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <h4 className="font-semibold text-green-700 text-base">Benefits of Capital Gains Tax Structure</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Long-term Preference:</strong> Lower tax rates for investments held over one year incentivize patient investing.</span></li>
                  <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Tax Deferral:</strong> No tax until you sell, allowing compound growth without annual tax drag.</span></li>
                  <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Loss Harvesting:</strong> Can offset gains with losses to reduce overall tax burden.</span></li>
                  <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Step-up Basis:</strong> Inherited assets receive a step-up in basis, potentially eliminating capital gains tax.</span></li>
                  <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Rate Control:</strong> Can time sales to manage tax brackets and optimize overall tax strategy.</span></li>
                </ul>
              </section>

              {/* Cons Section */}
              <section className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    ✗
                  </div>
                  <h4 className="font-semibold text-red-700 text-base">Capital Gains Tax Challenges</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Lock-in Effect:</strong> May discourage selling appreciated assets due to tax consequences.</span></li>
                  <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>State Variations:</strong> Complex planning required with different state tax rates (0% to 13.3%).</span></li>
                  <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>NIIT Burden:</strong> Additional 3.8% tax for high-income earners on investment income.</span></li>
                  <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Short-term Penalty:</strong> High ordinary income tax rates on investments held 12 months or less.</span></li>
                  <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Inflation Impact:</strong> Tax on nominal gains, not inflation-adjusted real gains.</span></li>
                </ul>
              </section>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 text-center mt-12">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Optimize Your Capital Gains Tax Strategy</h3>
              <p className="text-blue-100 text-base mb-6 max-w-2xl mx-auto">
                Use our comprehensive calculator to minimize your capital gains tax burden and maximize your investment returns. Make informed decisions with accurate tax projections.
              </p>
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Calculate Your Capital Gains Tax
              </Button>
            </div>
          </section>
        </div>
      </div>
      </div>
    </>
  );
}