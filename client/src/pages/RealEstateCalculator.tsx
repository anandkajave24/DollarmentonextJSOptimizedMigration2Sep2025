import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calculator, DollarSign, Target } from 'lucide-react';
import { SEO } from "../components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export default function RealEstateCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [interestRate, setInterestRate] = useState(7.0);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [insurance, setInsurance] = useState(1200);
  const [hoa, setHoa] = useState(200);
  const [maintenance, setMaintenance] = useState(400);
  const [appreciationRate, setAppreciationRate] = useState(3.5);
  const [holdingPeriod, setHoldingPeriod] = useState(10);
  const [taxBracket, setTaxBracket] = useState(24);

  // Calculations
  const loanAmount = propertyPrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  // Monthly mortgage payment (P&I)
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  // Monthly carrying costs
  const monthlyPropertyTax = (propertyPrice * propertyTaxRate / 100) / 12;
  const monthlyInsurance = insurance / 12;
  const monthlyHOA = hoa;
  const monthlyMaintenance = maintenance;
  const totalMonthlyCost = monthlyPayment + monthlyPropertyTax + monthlyInsurance + monthlyHOA + monthlyMaintenance;

  // Property appreciation
  const futureValue = propertyPrice * Math.pow(1 + appreciationRate / 100, holdingPeriod);
  const totalAppreciation = futureValue - propertyPrice;

  // Loan balance after holding period
  const paymentsAfterHolding = holdingPeriod * 12;
  const remainingBalance = paymentsAfterHolding >= numberOfPayments ? 0 :
    loanAmount * ((Math.pow(1 + monthlyRate, numberOfPayments) - Math.pow(1 + monthlyRate, paymentsAfterHolding)) / 
                  (Math.pow(1 + monthlyRate, numberOfPayments) - 1));

  // Total payments and costs
  const totalPayments = monthlyPayment * paymentsAfterHolding;
  const totalPropertyTax = monthlyPropertyTax * paymentsAfterHolding;
  const totalInsurance = monthlyInsurance * paymentsAfterHolding;
  const totalHOA = monthlyHOA * paymentsAfterHolding;
  const totalMaintenance = monthlyMaintenance * paymentsAfterHolding;
  const totalCarryingCosts = totalPropertyTax + totalInsurance + totalHOA + totalMaintenance;

  // Net proceeds from sale
  const saleCommission = futureValue * 0.06; // 6% real estate commission
  const closingCosts = futureValue * 0.02; // 2% closing costs
  const netSaleProceeds = futureValue - remainingBalance - saleCommission - closingCosts;

  // Capital gains tax
  const capitalGain = Math.max(0, futureValue - propertyPrice);
  const capitalGainsTax = capitalGain * 0.15; // Assume 15% long-term capital gains

  // Total return analysis
  const totalInvestment = downPayment + totalPayments + totalCarryingCosts;
  const totalReturn = netSaleProceeds - downPayment - totalCarryingCosts - capitalGainsTax;
  const roi = totalInvestment > 0 ? (totalReturn / totalInvestment) * 100 : 0;
  const annualizedROI = totalInvestment > 0 ? (Math.pow(1 + totalReturn / totalInvestment, 1 / holdingPeriod) - 1) * 100 : 0;

  // Cash flow analysis
  const monthlyRent = totalMonthlyCost * 1.1; // Assume rent covers costs + 10%
  const annualRent = monthlyRent * 12;
  const annualCashFlow = annualRent - (totalMonthlyCost * 12);

  // Chart data
  const chartData = [];
  for (let year = 0; year <= holdingPeriod; year++) {
    const yearlyAppreciation = propertyPrice * Math.pow(1 + appreciationRate / 100, year);
    const yearlyBalance = year === 0 ? loanAmount : 
      Math.max(0, loanAmount * ((Math.pow(1 + monthlyRate, numberOfPayments) - Math.pow(1 + monthlyRate, year * 12)) / 
                                (Math.pow(1 + monthlyRate, numberOfPayments) - 1)));
    const equity = yearlyAppreciation - yearlyBalance;
    
    chartData.push({
      year,
      propertyValue: yearlyAppreciation,
      loanBalance: yearlyBalance,
      equity,
      totalInvested: downPayment + (totalMonthlyCost * 12 * year)
    });
  }

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
    <div className="min-h-screen bg-gray-50 py-8">
      <SEO 
        title="Real Estate Investment Calculator - Property ROI Analysis"
        description="Calculate real estate investment returns with comprehensive property analysis. Includes appreciation, cash flow, taxes, and total return calculations."
        keywords="real estate calculator, property investment calculator, rental property ROI, real estate ROI, property analysis, investment property calculator"
        canonical="https://dollarmento.com/real-estate-calculator"
      />
      
      <div className="w-full px-4">
        <div className="mb-8 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Real Estate Investment Calculator</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Analyze real estate investment potential with comprehensive property ROI calculations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-500 rounded"></span>
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="propertyPrice" className="flex items-center gap-1">
                      Property Price
                      <span className="text-blue-500 cursor-help" title="Purchase price of the property">ⓘ</span>
                    </Label>
                    <Input
                      id="propertyPrice"
                      type="number"
                      value={propertyPrice}
                      onChange={(e) => setPropertyPrice(Number(e.target.value))}
                      className="mt-1"
                      min="50000"
                      step="10000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="downPayment" className="flex items-center gap-1">
                      Down Payment
                      <span className="text-blue-500 cursor-help" title="Initial down payment amount">ⓘ</span>
                    </Label>
                    <Input
                      id="downPayment"
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="mt-1"
                      min="0"
                      step="5000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="interestRate" className="flex items-center gap-1">
                      Interest Rate (%)
                      <span className="text-blue-500 cursor-help" title="Mortgage interest rate">ⓘ</span>
                    </Label>
                    <Input
                      id="interestRate"
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="mt-1"
                      min="1"
                      max="15"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanTerm" className="flex items-center gap-1">
                      Loan Term (Years)
                      <span className="text-blue-500 cursor-help" title="Mortgage loan term">ⓘ</span>
                    </Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="mt-1"
                      min="10"
                      max="50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Operating Expenses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="propertyTaxRate" className="flex items-center gap-1">
                      Property Tax Rate (%)
                      <span className="text-blue-500 cursor-help" title="Annual property tax rate">ⓘ</span>
                    </Label>
                    <Input
                      id="propertyTaxRate"
                      type="number"
                      value={propertyTaxRate}
                      onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                      className="mt-1"
                      min="0"
                      max="5"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="insurance" className="flex items-center gap-1">
                      Annual Insurance
                      <span className="text-blue-500 cursor-help" title="Annual property insurance cost">ⓘ</span>
                    </Label>
                    <Input
                      id="insurance"
                      type="number"
                      value={insurance}
                      onChange={(e) => setInsurance(Number(e.target.value))}
                      className="mt-1"
                      min="0"
                      step="100"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hoa" className="flex items-center gap-1">
                      Monthly HOA
                      <span className="text-blue-500 cursor-help" title="Monthly HOA or management fees">ⓘ</span>
                    </Label>
                    <Input
                      id="hoa"
                      type="number"
                      value={hoa}
                      onChange={(e) => setHoa(Number(e.target.value))}
                      className="mt-1"
                      min="0"
                      step="50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maintenance" className="flex items-center gap-1">
                      Monthly Maintenance
                      <span className="text-blue-500 cursor-help" title="Monthly maintenance and repairs">ⓘ</span>
                    </Label>
                    <Input
                      id="maintenance"
                      type="number"
                      value={maintenance}
                      onChange={(e) => setMaintenance(Number(e.target.value))}
                      className="mt-1"
                      min="0"
                      step="50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-purple-500 rounded"></span>
                  Investment Assumptions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="appreciationRate" className="flex items-center gap-1">
                      Annual Appreciation (%)
                      <span className="text-blue-500 cursor-help" title="Expected annual property appreciation">ⓘ</span>
                    </Label>
                    <Input
                      id="appreciationRate"
                      type="number"
                      value={appreciationRate}
                      onChange={(e) => setAppreciationRate(Number(e.target.value))}
                      className="mt-1"
                      min="0"
                      max="10"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="holdingPeriod" className="flex items-center gap-1">
                      Holding Period (Years)
                      <span className="text-blue-500 cursor-help" title="How long you plan to hold the property">ⓘ</span>
                    </Label>
                    <Input
                      id="holdingPeriod"
                      type="number"
                      value={holdingPeriod}
                      onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                      className="mt-1"
                      min="1"
                      max="30"
                    />
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
                    <span>Enter property price and down payment</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Input mortgage terms and operating expenses</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Set appreciation rate and holding period</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Review ROI and cash flow analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Investment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Investment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatNumber(annualizedROI, 1)}%</div>
                    <div className="text-sm text-gray-600">Annualized ROI</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalReturn)}</div>
                    <div className="text-sm text-gray-600">Total Return</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(annualCashFlow)}</div>
                    <div className="text-sm text-gray-600">Annual Cash Flow</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{formatCurrency(futureValue)}</div>
                    <div className="text-sm text-gray-600">Future Value</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Equity Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Equity Growth Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line type="monotone" dataKey="propertyValue" stroke="#10b981" strokeWidth={2} name="Property Value" />
                      <Line type="monotone" dataKey="loanBalance" stroke="#ef4444" strokeWidth={2} name="Loan Balance" />
                      <Line type="monotone" dataKey="equity" stroke="#3b82f6" strokeWidth={2} name="Equity" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-yellow-500 rounded"></span>
                  Monthly Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-gray-600">Principal & Interest</span>
                    <span className="font-medium">{formatCurrency(monthlyPayment)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-gray-600">Property Tax</span>
                    <span className="font-medium">{formatCurrency(monthlyPropertyTax)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-gray-600">Insurance</span>
                    <span className="font-medium">{formatCurrency(monthlyInsurance)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-gray-600">HOA/Management</span>
                    <span className="font-medium">{formatCurrency(monthlyHOA)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-gray-600">Maintenance</span>
                    <span className="font-medium">{formatCurrency(monthlyMaintenance)}</span>
                  </div>
                  <div className="flex justify-between py-2 font-medium border-t">
                    <span>Total Monthly Cost</span>
                    <span>{formatCurrency(totalMonthlyCost)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sale Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Sale Proceeds Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-800 mb-2">Property Sale at Year {holdingPeriod}</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Sale Price:</span>
                        <span className="font-medium">{formatCurrency(futureValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Remaining Loan:</span>
                        <span className="font-medium text-red-600">-{formatCurrency(remainingBalance)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Commission (6%):</span>
                        <span className="font-medium text-red-600">-{formatCurrency(saleCommission)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Closing Costs (2%):</span>
                        <span className="font-medium text-red-600">-{formatCurrency(closingCosts)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-1 font-medium">
                        <span>Net Proceeds:</span>
                        <span>{formatCurrency(netSaleProceeds)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Key Investment Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Down Payment Percentage:</span>
                    <span className="font-medium">{formatNumber((downPayment / propertyPrice) * 100, 1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan-to-Value Ratio:</span>
                    <span className="font-medium">{formatNumber((loanAmount / propertyPrice) * 100, 1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cap Rate (if rented):</span>
                    <span className="font-medium">{formatNumber((annualCashFlow / propertyPrice) * 100, 2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cash-on-Cash Return:</span>
                    <span className="font-medium">{formatNumber((annualCashFlow / downPayment) * 100, 2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Appreciation:</span>
                    <span className="font-medium">{formatCurrency(totalAppreciation)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="w-full">
          <div className="px-6 py-8">
            <div className="space-y-6">
              
              {/* Investment Strategies */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Investment Strategies</h2>
                
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">• <strong>Buy and Hold:</strong> Long-term appreciation strategy</p>
                  <p className="text-gray-600 text-sm">• <strong>Cash Flow:</strong> Focus on positive monthly income</p>
                  <p className="text-gray-600 text-sm">• <strong>BRRRR:</strong> Buy, Rehab, Rent, Refinance, Repeat</p>
                  <p className="text-gray-600 text-sm">• <strong>House Hacking:</strong> Live in one unit, rent others</p>
                </div>
              </section>

              {/* Key Ratios */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Ratios</h3>
                
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">• <strong>1% Rule:</strong> Monthly rent ≥ 1% of purchase price</p>
                  <p className="text-gray-600 text-sm">• <strong>50% Rule:</strong> Operating expenses = 50% of rent</p>
                  <p className="text-gray-600 text-sm">• <strong>Cap Rate:</strong> Net income ÷ property value</p>
                  <p className="text-gray-600 text-sm">• <strong>Cash-on-Cash:</strong> Cash flow ÷ cash invested</p>
                </div>
              </section>

              {/* Important Considerations */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Important Considerations</h3>
                
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">• Factor in vacancy rates and turnover costs</p>
                  <p className="text-gray-600 text-sm">• Consider depreciation tax benefits</p>
                  <p className="text-gray-600 text-sm">• Account for major repairs and renovations</p>
                  <p className="text-gray-600 text-sm">• Understand local market conditions</p>
                </div>
              </section>
              
              {/* Property Analysis Tool */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">The Best Real Estate Investment Calculator and Property Analysis Tool in the US</h3>
                
                <p className="text-gray-600 text-sm mb-3">
                  You need to do more than just think about how much the property will go up in value when you buy it. Our calculator can help you find out how much it will cost to own a home, how much money you could make from it, how taxes will affect you, and how much money will come in and go out of your main home and your investment property.
                </p>
                <p className="text-gray-600 text-sm">
                  You need to think about things like mortgage payments, property taxes, insurance, maintenance, HOA fees, and possible rental income to get a complete picture of how well a real estate investment is doing. Look at different situations and figure out how much it really costs and how much it really helps to own property.
                </p>
              </section>

              {/* A complete look at real estate investments */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">A Complete Look at Real Estate Investments</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">The Total Cost of Owning</h4>
                    <p className="text-gray-600 text-sm">
                      You should also think about property taxes, insurance, maintenance (which is usually 1–2% of the home's value each year), HOA fees, and major repairs, in addition to the purchase price and mortgage. These ongoing costs have a big impact on how much money you make from your investment.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Cash Flow vs. Value Increase</h4>
                    <p className="text-gray-600 text-sm">
                      You can make money from real estate in two ways: by renting it out and by the property's value going up. Over time, appreciation helps you build wealth. Positive cash flow, on the other hand, gives you immediate returns and tax breaks through depreciation.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Leverage and Managing Risk</h4>
                    <p className="text-gray-600 text-sm">
                      With real estate, you can control big assets with small down payments, which makes both gains and losses bigger. Higher leverage means higher possible returns, but it also means higher risk, especially if property values or rental income go down.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Tax Benefits and Effects</h4>
                    <p className="text-gray-600 text-sm">
                      You can write off costs like depreciation, mortgage interest, and other costs when you file your taxes on investment properties. But when you sell, you may have to pay capital gains taxes on any profits and possibly depreciation recapture. There are different tax rules for primary residences.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Additional Educational Content */}
        <div className="w-full">
          <div className="px-6 py-8">
            <div className="space-y-6">

              {/* Things to think about before you buy or sell a house */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Things to Think About Before You Buy or Sell a House</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">The Setting for Interest Rates</h4>
                    <p className="text-gray-600 text-sm">
                      The cost of homes and their value are greatly affected by mortgage rates. When rates go up, it becomes harder to buy things and property values can go down. When rates go down, things become more popular and prices go up. Lock in rates when they work for you.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">The State of the Local Market</h4>
                    <p className="text-gray-600 text-sm">
                      Real estate is always in the area. Check out the job market, the growth of the population, the school districts, and the plans for new buildings. Usually, property values and rental demand are higher in areas with strong local economies than in areas that are losing people.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">How Supply and Demand Work</h4>
                    <p className="text-gray-600 text-sm">
                      Check the building permits, inventory levels, and absorption rates of your target market. Prices and rental rates usually go up when there isn't enough inventory, but they go down when there is too much supply.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Economic Indicators</h4>
                    <p className="text-gray-600 text-sm">
                      Economic indicators like GDP growth, employment rates, and consumer confidence all have an impact on how much real estate people want. People may have a harder time renting or buying a home when the economy is bad, but this can also lower property values and rental demand in the short term.
                    </p>
                  </div>
                </div>
              </section>

              {/* Pros and Cons of Real Estate Investment */}
              <section className="mb-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Pros and Cons of Real Estate Investment</h3>
                  <p className="text-sm text-gray-600">Understanding the advantages and disadvantages of property investments</p>
                </div>
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
                        <h4 className="font-semibold text-gray-800 text-sm">Passive Income</h4>
                        <p className="text-gray-600 text-sm">Generate monthly rental income and long-term appreciation.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Tax Benefits</h4>
                        <p className="text-gray-600 text-sm">Deduct depreciation, repairs, and mortgage interest from taxes.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Inflation Hedge</h4>
                        <p className="text-gray-600 text-sm">Property values and rents typically rise with inflation over time.</p>
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
                        <h4 className="font-semibold text-gray-800 text-sm">High Initial Capital</h4>
                        <p className="text-gray-600 text-sm">Requires substantial down payment and closing costs.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-600 mr-2 mt-1">✗</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Management Responsibilities</h4>
                        <p className="text-gray-600 text-sm">Dealing with tenants, maintenance, and property management takes time.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-600 mr-2 mt-1">✗</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Market Risk</h4>
                        <p className="text-gray-600 text-sm">Property values can decline during economic downturns.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </section>

              {/* Why Use a Real Estate Calculator */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold text-gray-800">Why Use a Real Estate Calculator?</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Make informed decisions about property investments</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <Calculator className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">ROI Analysis</h4>
                  <p className="text-sm text-gray-600">
                    Calculate return on investment including rental income and property appreciation.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Cash Flow Planning</h4>
                  <p className="text-sm text-gray-600">
                    Understand monthly cash flow and total carrying costs before buying.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Investment Strategy</h4>
                  <p className="text-sm text-gray-600">
                    Compare different properties and financing options to optimize returns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frequently Asked Questions */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold text-gray-800">Frequently Asked Questions</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Common questions about real estate investment calculations</p>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    What is a good cap rate for rental properties?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Cap rates typically range from 4-12% depending on location and property type. Higher cap rates often indicate higher risk areas, while lower cap rates suggest stable, appreciating markets. Most investors target 6-10% cap rates.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    How much should I budget for maintenance and repairs?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Budget 1-3% of property value annually for maintenance and repairs. Newer properties need less (1%), while older properties may require 2-3%. Also budget for vacancy rates (5-10% of rental income) and property management if applicable.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    Should I buy rental property with cash or financing?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Financing can amplify returns through leverage but increases risk. Cash purchases eliminate mortgage payments and interest, providing steady cash flow. Consider your risk tolerance, available capital, and current interest rates when deciding.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    What factors affect real estate appreciation rates?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Location, local economy, population growth, infrastructure development, and supply/demand dynamics affect appreciation. Historical national average is 3-4% annually, but varies significantly by market and time period.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Analyze Your Real Estate Investment Now</h3>
              <p className="text-gray-700 text-sm mb-4">
                Use our comprehensive real estate calculator to make informed property investment decisions. Consider costs, returns, and market conditions for successful real estate investing.
              </p>
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Calculate Real Estate Returns Now
              </Button>
            </CardContent>
          </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}