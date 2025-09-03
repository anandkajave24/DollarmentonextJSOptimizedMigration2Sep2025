import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { SEO } from "../components/SEO";

export default function HSACalculator() {
  const [contributionType, setContributionType] = useState('individual');
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentBalance, setCurrentBalance] = useState(2000);
  const [annualContribution, setAnnualContribution] = useState(4300);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [taxRate, setTaxRate] = useState(24);
  const [annualMedicalExpenses, setAnnualMedicalExpenses] = useState(2000);

  // 2024 HSA contribution limits
  const contributionLimits = {
    individual: 4300,
    family: 8550
  };

  const catchUpContribution = currentAge >= 55 ? 1000 : 0;
  const maxContribution = contributionLimits[contributionType as keyof typeof contributionLimits] + catchUpContribution;

  // Calculations
  const yearsToRetirement = retirementAge - currentAge;
  const monthlyReturn = expectedReturn / 100 / 12;
  const totalMonths = yearsToRetirement * 12;

  // Future value calculation with contributions
  const futureValuePrincipal = currentBalance * Math.pow(1 + monthlyReturn, totalMonths);
  const monthlyContribution = annualContribution / 12;
  const futureValueContributions = monthlyContribution * ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn);
  const totalValue = futureValuePrincipal + futureValueContributions;

  const totalContributed = currentBalance + (annualContribution * yearsToRetirement);
  const totalGrowth = totalValue - totalContributed;

  // Tax savings
  const annualTaxSavings = annualContribution * (taxRate / 100);
  const totalTaxSavings = annualTaxSavings * yearsToRetirement;

  // Medical expenses projection
  const medicalInflationRate = 5; // Healthcare inflation typically higher
  const futureAnnualMedicalExpenses = annualMedicalExpenses * Math.pow(1 + medicalInflationRate / 100, yearsToRetirement);
  const totalRetirementMedicalExpenses = futureAnnualMedicalExpenses * 20; // 20 years of retirement

  // HSA advantages over traditional retirement accounts
  const traditionalAccountValue = totalValue * (1 - taxRate / 100); // Taxed on withdrawal
  const hsaAdvantage = totalValue - traditionalAccountValue;

  // Chart data
  const chartData = [];
  for (let year = 0; year <= yearsToRetirement; year++) {
    const months = year * 12;
    const principalValue = currentBalance * Math.pow(1 + monthlyReturn, months);
    const contributionValue = months === 0 ? 0 : monthlyContribution * ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn);
    const totalValue = principalValue + contributionValue;
    const cumulativeTaxSavings = annualTaxSavings * year;
    
    chartData.push({
      year: currentAge + year,
      hsaValue: totalValue,
      taxSavings: cumulativeTaxSavings,
      totalBenefit: totalValue + cumulativeTaxSavings
    });
  }

  // Pie chart data
  const pieData = [
    { name: 'Principal', value: currentBalance, fill: '#3b82f6' },
    { name: 'Contributions', value: annualContribution * yearsToRetirement, fill: '#10b981' },
    { name: 'Investment Growth', value: totalGrowth, fill: '#f59e0b' }
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
    <div className="min-h-screen bg-gray-50 py-8">
      <SEO 
        title="HSA Calculator - Health Savings Account Triple Tax Advantage"
        description="Calculate HSA retirement benefits with triple tax advantage. Plan healthcare costs and maximize tax-free growth for medical expenses."
        keywords="HSA calculator, health savings account, triple tax advantage, medical expenses, healthcare retirement planning, tax-free growth"
        canonical="https://dollarmento.com/hsa-calculator"
      />
      
      <div className="w-full px-4">
        <div className="text-left mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">HSA Calculator</h1>
          <p className="text-sm text-gray-600 max-w-3xl">
            Calculate the powerful triple tax advantage of Health Savings Accounts for retirement planning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Panel - 40% width */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-500 rounded"></span>
                  HSA Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="contributionType">Coverage Type</Label>
                  <Select value={contributionType} onValueChange={setContributionType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual ($4,300 limit)</SelectItem>
                      <SelectItem value="family">Family ($8,550 limit)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentBalance" className="flex items-center gap-1">
                      Current HSA Balance
                      <span className="text-blue-500 cursor-help" title="Your current HSA account balance">ⓘ</span>
                    </Label>
                    <Input
                      id="currentBalance"
                      type="number"
                      value={currentBalance || ''}
                      onChange={(e) => setCurrentBalance(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                      className="mt-1"
                      min="0"
                      step="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="annualContribution" className="flex items-center gap-1">
                      Annual Contribution
                      <span className="text-blue-500 cursor-help" title="How much you contribute annually">ⓘ</span>
                    </Label>
                    <Input
                      id="annualContribution"
                      type="number"
                      value={annualContribution || ''}
                      onChange={(e) => setAnnualContribution(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                      className="mt-1"
                      min="0"
                      max={maxContribution}
                      step="100"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentAge" className="flex items-center gap-1">
                      Current Age
                      <span className="text-blue-500 cursor-help" title="Your current age">ⓘ</span>
                    </Label>
                    <Input
                      id="currentAge"
                      type="number"
                      value={currentAge || ''}
                      onChange={(e) => setCurrentAge(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                      className="mt-1"
                      min="18"
                      max="75"
                    />
                  </div>
                  <div>
                    <Label htmlFor="retirementAge" className="flex items-center gap-1">
                      Retirement Age
                      <span className="text-blue-500 cursor-help" title="When you plan to retire">ⓘ</span>
                    </Label>
                    <Input
                      id="retirementAge"
                      type="number"
                      value={retirementAge || ''}
                      onChange={(e) => setRetirementAge(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                      className="mt-1"
                      min={currentAge + 1}
                      max="80"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Investment & Tax Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expectedReturn" className="flex items-center gap-1">
                      Expected Annual Return (%)
                      <span className="text-blue-500 cursor-help" title="Expected annual investment return">ⓘ</span>
                    </Label>
                    <Input
                      id="expectedReturn"
                      type="number"
                      value={expectedReturn || ''}
                      onChange={(e) => setExpectedReturn(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                      className="mt-1"
                      min="1"
                      max="15"
                      step="0.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxRate" className="flex items-center gap-1">
                      Tax Rate (%)
                      <span className="text-blue-500 cursor-help" title="Your marginal tax rate">ⓘ</span>
                    </Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={taxRate || ''}
                      onChange={(e) => setTaxRate(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                      className="mt-1"
                      min="10"
                      max="50"
                      step="1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="annualMedicalExpenses" className="flex items-center gap-1">
                    Current Annual Medical Expenses
                    <span className="text-blue-500 cursor-help" title="Current annual out-of-pocket medical expenses">ⓘ</span>
                  </Label>
                  <Input
                    id="annualMedicalExpenses"
                    type="number"
                    value={annualMedicalExpenses || ''}
                    onChange={(e) => setAnnualMedicalExpenses(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                    className="mt-1"
                    min="0"
                    step="100"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contribution Limits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-purple-500 rounded"></span>
                  2024 HSA Limits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Individual Coverage:</span>
                    <span className="font-medium">{formatCurrency(contributionLimits.individual)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Family Coverage:</span>
                    <span className="font-medium">{formatCurrency(contributionLimits.family)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Catch-up (55+):</span>
                    <span className="font-medium">{formatCurrency(1000)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-medium">
                    <span>Your Maximum:</span>
                    <span>{formatCurrency(maxContribution)}</span>
                  </div>
                  {annualContribution > maxContribution && (
                    <div className="text-red-600 text-xs">
                      Contribution exceeds annual limit
                    </div>
                  )}
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
                    <span>Type in the current balance of your HSA and your plans for contributions.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Choose your retirement age and when you want to retire.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Enter the tax rate and the returns you expect.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Talk about the pros of the triple tax advantage.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel - 60% width */}
          <div className="lg:col-span-3 space-y-4">
            {/* HSA Value Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  HSA Retirement Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(totalValue)}</div>
                    <div className="text-sm text-gray-600">Total HSA Value</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalTaxSavings)}</div>
                    <div className="text-sm text-gray-600">Tax Savings</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(totalValue + totalTaxSavings)}</div>
                    <div className="text-sm text-gray-600">Total Benefit</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{formatCurrency(hsaAdvantage)}</div>
                    <div className="text-sm text-gray-600">vs. Traditional 401k</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">HSA Growth Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line type="monotone" dataKey="hsaValue" stroke="#10b981" strokeWidth={2} name="HSA Value" />
                      <Line type="monotone" dataKey="taxSavings" stroke="#3b82f6" strokeWidth={2} name="Cumulative Tax Savings" />
                      <Line type="monotone" dataKey="totalBenefit" stroke="#f59e0b" strokeWidth={2} name="Total Benefit" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Value Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Value Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
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

            {/* Medical Expense Projection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-red-500 rounded"></span>
                  Healthcare Cost Projection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="text-lg font-bold text-red-800 mb-2">
                      Retirement Medical Expenses
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Annual (at retirement):</span>
                        <div className="font-medium">{formatCurrency(futureAnnualMedicalExpenses)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">20-year total:</span>
                        <div className="font-medium">{formatCurrency(totalRetirementMedicalExpenses)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800">HSA Coverage</div>
                      <div className="text-green-600">
                        {totalValue >= totalRetirementMedicalExpenses ? 'Fully Covered' : 
                         `${formatNumber((totalValue / totalRetirementMedicalExpenses) * 100, 0)}% Covered`}
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800">Healthcare Inflation</div>
                      <div className="text-blue-600">{medicalInflationRate}% annually</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Triple Tax Advantage */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Triple Tax Advantage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-800 flex items-center gap-2">
                      <span>✓</span> Tax-Deductible Contributions
                    </div>
                    <div className="text-green-600">
                      Annual savings: {formatCurrency(annualTaxSavings)}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-800 flex items-center gap-2">
                      <span>✓</span> Tax-Free Growth
                    </div>
                    <div className="text-green-600">
                      No taxes on {formatNumber(expectedReturn)}% investment gains
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-800 flex items-center gap-2">
                      <span>✓</span> Tax-Free Medical Withdrawals
                    </div>
                    <div className="text-green-600">
                      No taxes on qualified medical expenses
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-3">
                    * After age 65, non-medical withdrawals taxed as ordinary income (like traditional IRA)
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="w-full mt-8 space-y-6">
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tips for HSA Strategy</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">• <strong>Maximize Contributions:</strong> Use the full annual limit</p>
              <p className="text-sm text-gray-600">• Don't keep cash for long; put it to work to grow.</p>
              <p className="text-sm text-gray-600">• Keep your receipts so you can get your money back later without having to pay taxes.</p>
              <p className="text-sm text-gray-600">• Don't touch it early; let it grow until you retire.</p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Eligibility Rules</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">• <strong>HDHP Needed:</strong> Rules for who can apply - You need to have a high-deductible plan that meets the requirements.</p>
              <p className="text-sm text-gray-600">• <strong>No Other Coverage:</strong> You can't have more than one health plan.</p>
              <p className="text-sm text-gray-600">• <strong>Not on Medicare:</strong> You can't add money after you've signed up for Medicare.</p>
              <p className="text-sm text-gray-600">• People 65 and older can take money out for any reason (but they have to pay taxes on it).</p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notes</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">• Keep your receipts so you can get your money back tax-free later.</p>
              <p className="text-sm text-gray-600">• 20% penalty for using it for non-medical reasons before age 65</p>
              <p className="text-sm text-gray-600">• No required minimum distributions</p>
              <p className="text-sm text-gray-600">• You can take your account with you when you get a new job.</p>
            </div>
          </section>

          {/* HSA Planning Tool */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ultimate HSA Calculator with Triple Tax Benefits</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Health Savings Accounts (HSAs) are the best way to save money on taxes because you can put money in them that you can deduct from your taxes, your money can grow without being taxed, and you can take money out without being taxed for qualified medical expenses. Our full HSA calculator can help you make the most of these benefits and plan for both your current healthcare costs and the healthcare you will need in retirement.
              </p>
              <p className="text-sm text-gray-600">
                HSAs are a great way to save for retirement and pay for medical bills right away. After age 65, you can take money out of an HSA for any reason without paying a penalty (but you will have to pay taxes on any non-medical withdrawals). This means that HSAs may be better than regular IRAs for building wealth over time.
              </p>
            </div>
          </section>

          {/* How to Use This HSA Calculator */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Use This HSA Calculator</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Pick the Type of Coverage</h4>
                <p className="text-sm text-gray-600">
                  If you choose individual or family coverage, your contribution limits will be different. The limit for individuals is $4,300 in 2025, and for families, it is $8,550. People over 55 can also make an extra $1,000 catch-up payment.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Plan for Contributions</h4>
                <p className="text-sm text-gray-600">
                  When you can, make the most of your contributions to get the most tax breaks. Giving money lowers your taxable income by that amount, which saves you money on taxes right away and builds wealth that you won't have to pay taxes on when you need it for healthcare in the future.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Making plans for your investments to grow</h4>
                <p className="text-sm text-gray-600">
                  If your HSA balance is less than what your provider needs (usually between $1,000 and $2,000), you should invest any extra money in things that will grow over time. If the stock market has returns of 7–10% over time, your HSA can become worth a lot more.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Forecasts for Healthcare Costs</h4>
                <p className="text-sm text-gray-600">
                  The cost of healthcare goes up by 5–6% every year, which is more than the rate of inflation. When you make a plan for how to save for your HSA, think about possible major medical events, long-term care needs, and how much prescription drugs will cost.
                </p>
              </div>
            </div>
          </section>

          {/* HSA Triple Tax Benefits */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">HSA Triple Tax Benefits</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Tax-deductible contributions</h4>
                <p className="text-sm text-gray-600">
                  Putting money into an HSA lowers your adjusted gross income, which could lower your tax bracket and the amount you need to make to get other tax breaks. This means you can save money on your taxes right away, equal to your contribution amount times your marginal tax rate.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Growth Without Paying Taxes</h4>
                <p className="text-sm text-gray-600">
                  Your HSA investments grow tax-free, which is different from taxable investment accounts. You don't have to pay taxes on capital gains, dividends, or required distributions, which lets the money grow as much as possible over time.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">No Taxes on Withdrawals</h4>
                <p className="text-sm text-gray-600">
                  You can take out qualified medical expenses at any time without having to pay taxes or fines. You have to pay taxes on non-medical withdrawals after age 65, just like you do on traditional IRAs. However, you don't have to pay the 20% penalty. This means that HSAs are flexible retirement accounts.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Payments Not Required</h4>
                <p className="text-sm text-gray-600">
                  When you turn 73, you don't have to take any minimum distributions from your HSA, unlike regular IRAs and 401(k)s. HSAs are great for planning your estate because your money can keep growing tax-free forever, and any money you don't use goes to your heirs.
                </p>
              </div>
            </div>
          </section>

          {/* HSA Investment and Usage Strategies */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">HSA Investment and Usage Strategies</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Strategy for Paying Out of Pocket</h4>
                <p className="text-sm text-gray-600">
                  Pay for your current medical bills with money you have already paid taxes on, and let your HSA grow tax-free. Always keep your receipts. You can get your money back years or even decades later, so your HSA is a tax-free retirement account.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">How to split up your money</h4>
                <p className="text-sm text-gray-600">
                  Have enough money on hand to pay for 3 to 6 months' worth of medical bills. Put the rest of your money into low-cost index funds or target-date funds that will grow over time. Younger investors can be more aggressive about how they split up their stocks.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Employers' Contributions</h4>
                <p className="text-sm text-gray-600">
                  Use all of the money your employer puts into your HSA. They are free money that doesn't count toward your contribution limits. Some employers match HSA contributions, just like they do with 401(k) contributions. This means you can save more money without paying taxes on it.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">High Deductible Health Plan</h4>
                <p className="text-sm text-gray-600">
                  You can only get an HSA if you are enrolled in a high-deductible health plan (HDHP) that meets certain requirements. When you look at the total costs of an HSA, including premiums, deductibles, and out-of-pocket maximums, don't forget about the tax savings that come with it.
                </p>
              </div>
            </div>
          </section>

          {/* HSA Pros and Cons */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">HSA Pros and Cons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pros Section */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <h4 className="text-xl font-bold text-green-800">Benefits</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-green-700">✓ Triple tax advantage (deductible, growth, withdrawals)</p>
                  <p className="text-sm text-green-700">✓ No required minimum distributions like 401(k)s</p>
                  <p className="text-sm text-green-700">✓ Portable between jobs and employers</p>
                  <p className="text-sm text-green-700">✓ After 65, functions like traditional IRA for non-medical expenses</p>
                  <p className="text-sm text-green-700">✓ Higher contribution limits than FSAs</p>
                </div>
              </div>

              {/* Cons Section */}
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✗</span>
                  </div>
                  <h4 className="text-xl font-bold text-red-800">Drawbacks</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-red-700">✗ Requires high-deductible health plan enrollment</p>
                  <p className="text-sm text-red-700">✗ 20% penalty on non-medical withdrawals before age 65</p>
                  <p className="text-sm text-red-700">✗ Must keep receipts for qualified expense documentation</p>
                  <p className="text-sm text-red-700">✗ Limited investment options depending on provider</p>
                  <p className="text-sm text-red-700">✗ Higher out-of-pocket costs with HDHP</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg text-center text-white">
            <h3 className="text-xl font-bold mb-2">Start Maximizing Your HSA Calculator Benefits Today</h3>
            <p className="text-sm mb-4 opacity-90">
              Use our comprehensive hsa calculator to plan your healthcare savings strategy and unlock the powerful triple tax advantage for your retirement.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Calculate Your HSA Benefits
            </Button>
          </section>

          {/* HSA Calculator Tags */}
          <section className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Related Topics</h4>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#HSACalculator</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#HealthSavings</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TaxAdvantage</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#RetirementPlanning</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#HealthcarePlanning</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TaxSavings</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#PersonalFinance</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#FinancialPlanning</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#MedicalExpenses</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TripleTaxBenefit</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}