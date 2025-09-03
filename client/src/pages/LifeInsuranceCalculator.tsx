import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { SEO } from "../components/SEO";
import { Helmet } from 'react-helmet';

export default function LifeInsuranceCalculator() {
  const [age, setAge] = useState(35);
  const [gender, setGender] = useState('male');
  const [health, setHealth] = useState('good');
  const [smoking, setSmoking] = useState('non-smoker');
  const [annualIncome, setAnnualIncome] = useState(75000);
  const [existingCoverage, setExistingCoverage] = useState(100000);
  const [debts, setDebts] = useState(250000);
  const [finalExpenses, setFinalExpenses] = useState(15000);
  const [dependents, setDependents] = useState(2);
  const [yearsOfSupport, setYearsOfSupport] = useState(20);
  const [educationCosts, setEducationCosts] = useState(100000);

  // Calculate insurance needs using multiple methods
  
  // Method 1: Income Replacement (10x annual income)
  const incomeReplacement = annualIncome * 10;
  
  // Method 2: DIME Method (Debt + Income + Mortgage + Education)
  const dimeMethod = debts + (annualIncome * yearsOfSupport) + educationCosts;
  
  // Method 3: Human Life Value
  const humanLifeValue = (annualIncome * 0.7) * yearsOfSupport; // 70% of income
  
  // Method 4: Capital Needs Analysis
  const capitalNeeds = debts + finalExpenses + educationCosts + (annualIncome * 0.7 * yearsOfSupport);
  
  // Recommended coverage (highest of methods minus existing coverage)
  const recommendedTotal = Math.max(incomeReplacement, dimeMethod, humanLifeValue, capitalNeeds);
  const recommendedAdditional = Math.max(0, recommendedTotal - existingCoverage);

  // Monthly premium estimates (simplified calculation)
  const getPremiumMultiplier = () => {
    let multiplier = 0.5; // Base rate per $1000 coverage
    
    // Age adjustments
    if (age > 45) multiplier *= 1.5;
    if (age > 55) multiplier *= 2.0;
    if (age > 65) multiplier *= 3.0;
    
    // Gender adjustments
    if (gender === 'female') multiplier *= 0.9;
    
    // Health adjustments
    if (health === 'excellent') multiplier *= 0.8;
    if (health === 'poor') multiplier *= 2.0;
    
    // Smoking adjustments
    if (smoking === 'smoker') multiplier *= 2.5;
    
    return multiplier;
  };

  const premiumMultiplier = getPremiumMultiplier();
  const monthlyPremium = (recommendedAdditional / 1000) * premiumMultiplier;
  const annualPremium = monthlyPremium * 12;

  // Cost comparison for different coverage amounts
  const coverageOptions = [
    { amount: 250000, name: '$250K' },
    { amount: 500000, name: '$500K' },
    { amount: 750000, name: '$750K' },
    { amount: 1000000, name: '$1M' },
    { amount: 1500000, name: '$1.5M' },
    { amount: 2000000, name: '$2M' }
  ];

  const coverageComparison = coverageOptions.map(option => ({
    ...option,
    monthlyPremium: (option.amount / 1000) * premiumMultiplier,
    annualPremium: (option.amount / 1000) * premiumMultiplier * 12
  }));

  // Breakdown of insurance needs
  const needsBreakdown = [
    { name: 'Income Replacement', value: annualIncome * yearsOfSupport, fill: '#3b82f6' },
    { name: 'Debt Payoff', value: debts, fill: '#ef4444' },
    { name: 'Education Costs', value: educationCosts, fill: '#f59e0b' },
    { name: 'Final Expenses', value: finalExpenses, fill: '#8b5cf6' }
  ];

  // Method comparison chart
  const methodComparison = [
    { method: 'Income 10x', amount: incomeReplacement },
    { method: 'DIME', amount: dimeMethod },
    { method: 'Human Life', amount: humanLifeValue },
    { method: 'Capital Needs', amount: capitalNeeds }
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
        <title>Life Insurance Calculator - Calculate Life Insurance Coverage Needs | DollarMento</title>
        <meta name="description" content="Calculate your life insurance coverage needs based on income, debts, and family expenses. Get personalized recommendations for adequate life insurance protection." />
        <meta name="keywords" content="life insurance calculator, life insurance coverage calculator, life insurance needs calculator, insurance calculator, life insurance planning calculator" />
        <link rel="canonical" href="https://dollarmento.com/life-insurance-calculator" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
      <SEO 
        title="Life Insurance Calculator - Coverage Needs Analysis"
        description="Calculate life insurance coverage needs using multiple methods. Determine optimal coverage amounts and compare premium costs for your family's protection."
        keywords="life insurance calculator, coverage needs analysis, DIME method, human life value, insurance premium calculator, family protection"
        canonical="https://dollarmento.com/life-insurance-calculator"
      />
      
      <div className="w-full px-4">
        <div className="text-left mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Life Insurance Calculator</h1>
          <p className="text-sm text-gray-600 max-w-3xl">
            Calculate your life insurance coverage needs and estimate premiums for your family's financial protection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Panel - 40% width */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-500 rounded"></span>
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age" className="flex items-center gap-1">
                      Age
                      <span className="text-blue-500 cursor-help" title="Your current age">ⓘ</span>
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={age || ''}
                      onChange={(e) => setAge(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                      className="mt-1"
                      min="18"
                      max="80"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="health">Health Status</Label>
                    <Select value={health} onValueChange={setHealth}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="average">Average</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="smoking">Smoking Status</Label>
                    <Select value={smoking} onValueChange={setSmoking}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="non-smoker">Non-Smoker</SelectItem>
                        <SelectItem value="smoker">Smoker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Financial Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="annualIncome" className="flex items-center gap-1">
                      Annual Income
                      <span className="text-blue-500 cursor-help" title="Your gross annual income">ⓘ</span>
                    </Label>
                    <Input
                      id="annualIncome"
                      type="number"
                      value={annualIncome || ''}
                      onChange={(e) => setAnnualIncome(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                      className="mt-1"
                      min="0"
                      step="5000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="existingCoverage" className="flex items-center gap-1">
                      Existing Coverage
                      <span className="text-blue-500 cursor-help" title="Current life insurance coverage">ⓘ</span>
                    </Label>
                    <Input
                      id="existingCoverage"
                      type="number"
                      value={existingCoverage || ''}
                      onChange={(e) => setExistingCoverage(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                      className="mt-1"
                      min="0"
                      step="10000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="debts" className="flex items-center gap-1">
                      Total Debts
                      <span className="text-blue-500 cursor-help" title="Mortgage, loans, and other debts">ⓘ</span>
                    </Label>
                    <Input
                      id="debts"
                      type="number"
                      value={debts || ''}
                      onChange={(e) => setDebts(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                      className="mt-1"
                      min="0"
                      step="10000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="finalExpenses" className="flex items-center gap-1">
                      Final Expenses
                      <span className="text-blue-500 cursor-help" title="Funeral and settlement costs">ⓘ</span>
                    </Label>
                    <Input
                      id="finalExpenses"
                      type="number"
                      value={finalExpenses || ''}
                      onChange={(e) => setFinalExpenses(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                      className="mt-1"
                      min="0"
                      step="1000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-purple-500 rounded"></span>
                  Dependents & Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dependents" className="flex items-center gap-1">
                      Number of Dependents
                      <span className="text-blue-500 cursor-help" title="Children and other dependents">ⓘ</span>
                    </Label>
                    <Input
                      id="dependents"
                      type="number"
                      value={dependents || ''}
                      onChange={(e) => setDependents(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                      className="mt-1"
                      min="0"
                      max="10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yearsOfSupport" className="flex items-center gap-1">
                      Years of Support
                      <span className="text-blue-500 cursor-help" title="Years to support dependents">ⓘ</span>
                    </Label>
                    <Input
                      id="yearsOfSupport"
                      type="number"
                      value={yearsOfSupport || ''}
                      onChange={(e) => setYearsOfSupport(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                      className="mt-1"
                      min="1"
                      max="50"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="educationCosts" className="flex items-center gap-1">
                    Education Costs
                    <span className="text-blue-500 cursor-help" title="Total education expenses for all children">ⓘ</span>
                  </Label>
                  <Input
                    id="educationCosts"
                    type="number"
                    value={educationCosts || ''}
                    onChange={(e) => setEducationCosts(e.target.value === '' ? 0 : Number(e.target.value) || 0)}
                    className="mt-1"
                    min="0"
                    step="10000"
                  />
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
                    <span>Give us your personal information so we can give you an idea of how much it will cost.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Give details about your money, like how much you make and how much you owe.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Write down who your dependents are and what kind of help they need.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Check out the suggested coverage and prices</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel - 60% width */}
          <div className="lg:col-span-3 space-y-4">
            {/* Coverage Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Coverage Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(recommendedTotal)}</div>
                    <div className="text-sm text-gray-600">Total Recommended</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(recommendedAdditional)}</div>
                    <div className="text-sm text-gray-600">Additional Needed</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(monthlyPremium)}</div>
                    <div className="text-sm text-gray-600">Est. Monthly Premium</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{formatCurrency(annualPremium)}</div>
                    <div className="text-sm text-gray-600">Est. Annual Premium</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Needs Breakdown Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Insurance Needs Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={needsBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {needsBreakdown.map((entry, index) => (
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

            {/* Method Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Calculation Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={methodComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="method" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="amount" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Coverage Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-yellow-500 rounded"></span>
                  Coverage Options & Costs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {coverageComparison.map((option, index) => (
                    <div key={index} className={`flex justify-between items-center p-3 rounded-lg ${
                      option.amount === recommendedAdditional ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                    }`}>
                      <span className="font-medium">{option.name}</span>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(option.monthlyPremium)}/month</div>
                        <div className="text-sm text-gray-600">{formatCurrency(option.annualPremium)}/year</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Premium Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Premium Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-800 mb-1">Age Impact</div>
                    <div className="text-blue-600">
                      {age <= 35 ? 'Low rates - ideal time to buy' : 
                       age <= 45 ? 'Moderate rates - still good timing' :
                       age <= 55 ? 'Higher rates - consider buying soon' :
                       'Significantly higher rates'}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-800 mb-1">Health Status</div>
                    <div className="text-green-600">
                      {health === 'excellent' ? '20% discount potential' :
                       health === 'good' ? 'Standard rates' :
                       health === 'average' ? 'Slightly higher rates' :
                       'Significantly higher rates or potential decline'}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="font-medium text-red-800 mb-1">Smoking Impact</div>
                    <div className="text-red-600">
                      {smoking === 'non-smoker' ? 'Best available rates' : 
                       'Premiums typically 2-3x higher'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="w-full mt-8 space-y-6">
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Types of Life Insurance</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">• <strong>Term Life:</strong> Coverage for a short time at a lower cost</p>
              <p className="text-sm text-gray-600">• <strong>Whole Life:</strong> Insurance for life with savings</p>
              <p className="text-sm text-gray-600">• <strong>Universal Life:</strong> premiums and benefits that can change</p>
              <p className="text-sm text-gray-600">• <strong>Variable Life:</strong> Has an investment part</p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">When You Need Insurance</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">• <strong>New Family:</strong> Getting married or having a child</p>
              <p className="text-sm text-gray-600">• A lot of debt, like a mortgage or big loans</p>
              <p className="text-sm text-gray-600">• <strong>Business Owner:</strong> Keeping important people safe</p>
              <p className="text-sm text-gray-600">• <strong>Estate Planning:</strong> Setting goals for taxes and inheritance</p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Important Considerations</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">• Check your coverage needs every five years</p>
              <p className="text-sm text-gray-600">• Consider getting group life insurance through your job</p>
              <p className="text-sm text-gray-600">• Look at the prices at different stores</p>
              <p className="text-sm text-gray-600">• Be aware of what your policy does and doesn't cover</p>
            </div>
          </section>

          {/* Life Insurance Planning Tool */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ultimate Life Insurance Calculator and Coverage Optimization Tool</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Your beneficiaries need life insurance because it pays for your expenses and replaces your lost income after you die. Our all-in-one calculator uses a number of different methods to figure out the best amount of coverage for your family's needs and your own financial situation.
              </p>
              <p className="text-sm text-gray-600">
                No matter what stage of life you're in—starting a family, buying a house, or planning for retirement—your life insurance needs will change. If you know about the different types of coverage, what affects the premium, and how to figure it out, you can get the right amount of protection at a good price.
              </p>
            </div>
          </section>

            {/* Life Insurance Planning and Coverage Needs */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Life Insurance Planning and Coverage Needs</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">How to Find Out How Much Coverage You Need</h4>
                  <p className="text-sm text-gray-600">
                    There are a few different ways to figure out how much you need: the 10x annual income rule, the DIME method (Debt + Income + Mortgage + Education), or a full needs analysis. Check out the results to find out what range of coverage is best for you.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Insurance for a certain amount of time vs. for life</h4>
                  <p className="text-sm text-gray-600">
                    Term insurance gives you the most coverage for the least amount of money for a short time. Universal or whole life insurance costs more, but it builds cash value and protects you for life.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Things that change premiums</h4>
                  <p className="text-sm text-gray-600">
                    Your premiums depend on your age, health, lifestyle, the amount of coverage you need, and the type of policy you have. Apply when you're young and healthy to get the best rates. People who don't smoke pay a lot less for insurance than people who do.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Coverage for people versus coverage for businesses</h4>
                  <p className="text-sm text-gray-600">
                    It's easy to get employer coverage, but it's usually limited (1–2 times salary) and can't be moved. Individual policies cost more, but they make sure you have coverage and can be moved from one job to another.
                  </p>
                </div>
              </div>
            </section>

          {/* Life Insurance Pros and Cons */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Life Insurance Pros and Cons</h3>
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
                  <p className="text-sm text-green-700">✓ Financial protection for dependents and family</p>
                  <p className="text-sm text-green-700">✓ Income replacement when primary earner dies</p>
                  <p className="text-sm text-green-700">✓ Debt and mortgage payoff capability</p>
                  <p className="text-sm text-green-700">✓ Tax-free death benefit to beneficiaries</p>
                  <p className="text-sm text-green-700">✓ Cash value growth in permanent policies</p>
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
                  <p className="text-sm text-red-700">✗ Monthly or annual premium costs</p>
                  <p className="text-sm text-red-700">✗ Premiums increase with age and health issues</p>
                  <p className="text-sm text-red-700">✗ Medical exams and health questions required</p>
                  <p className="text-sm text-red-700">✗ Coverage lapses if premiums not paid</p>
                  <p className="text-sm text-red-700">✗ Complex terms and conditions in policies</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg text-center text-white">
            <h3 className="text-xl font-bold mb-2">Protect Your Family's Financial Future Today</h3>
            <p className="text-sm mb-4 opacity-90">
              Use our comprehensive life insurance calculator to determine the right coverage amount and find affordable protection for your loved ones.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Calculate Your Coverage Needs
            </Button>
          </section>

          {/* Life Insurance Calculator Tags */}
          <section className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Related Topics</h4>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#LifeInsuranceCalculator</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#LifeInsurance</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#FamilyProtection</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#FinancialSecurity</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#Insurance</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#FinancialPlanning</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#PersonalFinance</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#FamilyFinance</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#IncomeReplacement</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#DebtProtection</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    </>
  );
}