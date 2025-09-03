import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SEO } from '../components/SEO';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { Bar } from 'react-chartjs-2';

interface SocialSecurityInputs {
  dateOfBirth: string;
  retirementAge: number;
  annualSalary: number;
  yearsWorked: number;
  wageGrowthRate: number;
  maritalStatus: string;
}

const SocialSecurityCalculatorUSA: React.FC = () => {
  return (
    <>
      <SEO 
        title="Social Security Calculator USA - Benefits Estimation & Planning Tool"
        description="Calculate your Social Security benefits with our comprehensive calculator. Estimate retirement benefits, spousal benefits, and optimize your Social Security claiming strategy."
        keywords="Social Security calculator, SS benefits calculator, retirement benefits, Social Security planning, FICA calculator, Social Security estimation, retirement planning USA"
        canonical="https://dollarmento.com/social-security-calculator-usa"
      />
      <SocialSecurityContent />
    </>
  );
};

const SocialSecurityContent: React.FC = () => {
  const [inputs, setInputs] = useState<SocialSecurityInputs>({
    dateOfBirth: '1990-01-01',
    retirementAge: 67,
    annualSalary: 75000,
    yearsWorked: 35,
    wageGrowthRate: 3.0,
    maritalStatus: 'single'
  });

  const handleInputChange = (field: keyof SocialSecurityInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' && field !== 'dateOfBirth' && field !== 'maritalStatus' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCurrencyDetailed = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getCurrentAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const getFullRetirementAge = (birthYear: number): number => {
    if (birthYear <= 1937) return 65;
    if (birthYear <= 1942) return 65 + (birthYear - 1937) * 2/12;
    if (birthYear <= 1954) return 66;
    if (birthYear <= 1959) return 66 + (birthYear - 1954) * 2/12;
    return 67;
  };

  const results = useMemo(() => {
    const currentAge = getCurrentAge(inputs.dateOfBirth);
    const birthYear = new Date(inputs.dateOfBirth).getFullYear();
    const fullRetirementAge = getFullRetirementAge(birthYear);
    
    // Calculate AIME (Average Indexed Monthly Earnings)
    // Simplified calculation using current salary projected with wage growth
    const projectedAnnualEarnings = inputs.annualSalary * Math.pow(1 + inputs.wageGrowthRate / 100, inputs.yearsWorked);
    const totalEarnings = inputs.annualSalary * inputs.yearsWorked * (1 + inputs.wageGrowthRate / 200); // Simplified average
    const aime = Math.min(totalEarnings / inputs.yearsWorked / 12, 15000); // Cap at reasonable max

    // 2025 PIA Bend Points
    const bendPoint1 = 1174;
    const bendPoint2 = 7078;
    
    // Calculate PIA (Primary Insurance Amount)
    let pia = 0;
    if (aime <= bendPoint1) {
      pia = aime * 0.90;
    } else if (aime <= bendPoint2) {
      pia = (bendPoint1 * 0.90) + ((aime - bendPoint1) * 0.32);
    } else {
      pia = (bendPoint1 * 0.90) + ((bendPoint2 - bendPoint1) * 0.32) + ((aime - bendPoint2) * 0.15);
    }

    // Adjustment factors for claiming age
    const getAdjustmentFactor = (claimAge: number): number => {
      if (claimAge < fullRetirementAge) {
        const monthsEarly = (fullRetirementAge - claimAge) * 12;
        if (monthsEarly <= 36) {
          return 1 - (monthsEarly * 5/900); // 5/9 of 1% per month for first 36 months
        } else {
          return 1 - (36 * 5/900) - ((monthsEarly - 36) * 5/1200); // 5/12 of 1% per month beyond 36
        }
      } else if (claimAge > fullRetirementAge) {
        const monthsLate = (claimAge - fullRetirementAge) * 12;
        return 1 + (monthsLate * 8/1200); // 8% per year (2/3 of 1% per month)
      }
      return 1;
    };

    // Calculate benefits for different claiming ages
    const benefitsByAge = [62, 65, 67, 70].map(age => ({
      age,
      monthlyBenefit: pia * getAdjustmentFactor(age),
      percentOfFull: getAdjustmentFactor(age) * 100,
      isFRA: age === fullRetirementAge
    }));

    // Lifetime value calculations (assuming life expectancy of 88)
    const lifeExpectancy = 88;
    const lifetimeValues = benefitsByAge.map(benefit => ({
      ...benefit,
      yearsReceiving: lifeExpectancy - benefit.age,
      lifetimeValue: benefit.monthlyBenefit * 12 * (lifeExpectancy - benefit.age)
    }));

    const selectedBenefit = benefitsByAge.find(b => b.age === inputs.retirementAge) || benefitsByAge[2];

    return {
      currentAge,
      fullRetirementAge,
      aime,
      pia,
      selectedBenefit,
      benefitsByAge,
      lifetimeValues,
      annualBenefit: selectedBenefit.monthlyBenefit * 12
    };
  }, [inputs]);

  // Chart data for benefits by age
  const chartData = {
    labels: results.benefitsByAge.map(b => `Age ${b.age}`),
    datasets: [
      {
        label: 'Monthly Benefit',
        data: results.benefitsByAge.map(b => b.monthlyBenefit),
        backgroundColor: results.benefitsByAge.map(b => 
          b.isFRA ? '#10b981' : b.age < results.fullRetirementAge ? '#ef4444' : '#3b82f6'
        ),
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `Monthly: ${formatCurrencyDetailed(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return formatCurrency(value);
          },
        },
      },
    },
  };

  return (
    <TooltipProvider>
      <SEO 
        title="Social Security Benefits Calculator USA - Estimate Monthly Payments"
        description="Calculate your Social Security retirement benefits. Estimate monthly payments, optimal claiming age, and lifetime benefits based on earnings history."
        keywords="social security calculator, social security benefits calculator, retirement benefits calculator, social security estimator, social security payment calculator, retirement planning calculator"
        canonical="https://dollarmento.com/social-security-calculator"
      />
      <div className="w-full p-6 space-y-6">
        {/* Header */}
        <div className="text-left mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Social Security Retirement Benefits Calculator (USA)
          </h1>
          <p className="text-sm text-gray-600 max-w-3xl">
            Plan smarter. Retire confidently. Estimate your monthly Social Security income based on your earnings, retirement age, and current benefit formula.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel - 50% width */}
          <div className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-blue-800 text-base">
                    👤 Personal Information
                  </CardTitle>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    📅 Tax Year: 2025
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Date of Birth
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Your birth date determines your full retirement age and benefit calculations.</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Input
                      type="date"
                      value={inputs.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="mt-1"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Current Age: {results.currentAge} | Full Retirement Age: {results.fullRetirementAge}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Retirement Age
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Age when you plan to claim Social Security benefits. Affects monthly benefit amount.</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Select value={inputs.retirementAge.toString()} onValueChange={(value) => handleInputChange('retirementAge', parseInt(value))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="62">62 (Earliest)</SelectItem>
                          <SelectItem value="65">65</SelectItem>
                          <SelectItem value="67">67 (Full)</SelectItem>
                          <SelectItem value="70">70 (Maximum)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Marital Status
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Affects spousal benefit eligibility and claiming strategies.</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Select value={inputs.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="married">Married</SelectItem>
                          <SelectItem value="divorced">Divorced</SelectItem>
                          <SelectItem value="widowed">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Earnings Information */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-green-800 text-base">
                  💰 Earnings Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Current Annual Salary
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Your current annual earnings subject to Social Security taxes (up to the wage base limit).</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Input
                      type="number"
                      value={inputs.annualSalary}
                      onChange={(e) => handleInputChange('annualSalary', e.target.value)}
                      className="mt-1"
                      placeholder="75000"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      2025 Social Security wage base: $176,100
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Years Worked
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total years of Social Security-covered employment. Benefits based on highest 35 years.</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="number"
                          value={inputs.yearsWorked}
                          onChange={(e) => handleInputChange('yearsWorked', e.target.value)}
                          className="flex-1"
                          placeholder="35"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Expected Wage Growth
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Annual percentage increase in wages. Historical average is around 3-4%.</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="number"
                          step="0.1"
                          value={inputs.wageGrowthRate}
                          onChange={(e) => handleInputChange('wageGrowthRate', e.target.value)}
                          className="flex-1"
                          placeholder="3.0"
                        />
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <section className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How It Works</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">The Average Indexed Monthly Earnings (AIME) and the Primary Insurance Amount (PIA) are used to figure out how much Social Security benefits you will get. The PIA formula for 2025 uses:</p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">• 90% of the first $1,174 of AIME</p>
                  <p className="text-sm text-gray-600">• 32% of AIME between $1,174 and $7,078</p>
                  <p className="text-sm text-gray-600">• 15% of AIME above $7,078</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">AIME is based on your top 35 earning years, adjusted for inflation.</p>
              </div>
            </section>

            {/* Key Insights */}
            <section className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Key Insights</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">✓ Your highest 35 years of earnings matter; years with low income bring down your average.</p>
                <p className="text-sm text-gray-600">💡 If you can wait, do so—higher benefits and adjustments for inflation</p>
                <p className="text-sm text-gray-600">👫 Married couples: Think about spousal strategies (claiming based on your partner's record)</p>
                <p className="text-sm text-gray-600">⚠ Taxes: Depending on how much money you make in retirement, up to 85% of your benefit may be taxed.</p>
              </div>
            </section>

            {/* Assumptions */}
            <section className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Assumptions</h3>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">• Wage growth: {inputs.wageGrowthRate}% per year</p>
                <p className="text-sm text-gray-600">• Inflation adjustment: 2.6% annually</p>
                <p className="text-sm text-gray-600">• 2025 Social Security bend points and wage base</p>
                <p className="text-sm text-gray-600">• No disability or survivor benefits included</p>
                <p className="text-sm text-gray-600">• Life expectancy: 88 years for lifetime calculations</p>
              </div>
            </section>
          </div>

          {/* Results Panel - 50% width */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Estimated Results */}
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-green-800 text-base">
                    📊 Estimated Results at Age {inputs.retirementAge}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="text-xs text-blue-600 font-medium">Average Monthly Indexed Earnings (AIME)</div>
                      <div className="text-lg font-bold text-blue-700">{formatCurrencyDetailed(results.aime)}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="text-xs text-green-600 font-medium">Primary Insurance Amount (PIA)</div>
                      <div className="text-lg font-bold text-green-700">{formatCurrencyDetailed(results.pia)}/month</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                      <div className="text-xs text-purple-600 font-medium">Monthly Social Security Benefit</div>
                      <div className="text-xl font-bold text-purple-700">{formatCurrencyDetailed(results.selectedBenefit.monthlyBenefit)}/month</div>
                      <div className="text-xs text-purple-600 mt-1">{results.selectedBenefit.percentOfFull.toFixed(1)}% of full benefit</div>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                      <div className="text-xs text-orange-600 font-medium">Annual Social Security Benefit</div>
                      <div className="text-lg font-bold text-orange-700">{formatCurrency(results.annualBenefit)}/year</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits by Claiming Age Chart */}
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-blue-800 text-base">
                    📈 Monthly Benefits by Claiming Age
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 relative">
                    <Bar data={chartData} options={chartOptions} />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span>Early Claim (Reduced)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>Full Retirement Age</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>Delayed (Increased)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Claiming Age Comparison */}
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-orange-800 text-base">
                    🕒 Early or Delayed Claiming Adjustments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">Claiming Age</th>
                          <th className="text-left py-2 font-medium">Monthly Benefit</th>
                          <th className="text-left py-2 font-medium">% of Full Benefit</th>
                        </tr>
                      </thead>
                      <tbody className="space-y-2">
                        {results.benefitsByAge.map((benefit, index) => (
                          <tr key={benefit.age} className={`border-b border-gray-100 ${benefit.age === inputs.retirementAge ? 'bg-blue-50' : ''}`}>
                            <td className="py-2">
                              {benefit.age} {benefit.age === 62 && '(Earliest)'}
                              {benefit.isFRA && '(FRA)'}
                              {benefit.age === 70 && '(Max Delay)'}
                            </td>
                            <td className="py-2 font-medium">{formatCurrencyDetailed(benefit.monthlyBenefit)}</td>
                            <td className="py-2">{benefit.percentOfFull.toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Lifetime Value Estimate */}
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-purple-800 text-base">
                    💵 Lifetime Value Estimate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">Assuming you live to 88 (average life expectancy):</p>
                  <div className="space-y-3">
                    {results.lifetimeValues.map((value) => (
                      <div key={value.age} className={`p-3 rounded-lg border ${value.age === inputs.retirementAge ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Claim at {value.age}:</span>
                          <span className="text-lg font-bold">{formatCurrency(value.lifetimeValue)}</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {value.yearsReceiving} years × {formatCurrencyDetailed(value.monthlyBenefit)} × 12
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Educational Content Section */}
              <div className="w-full mt-8 space-y-6">
                {/* The United States Calculator for Social Security and Tool for Getting the Most Out of Benefits */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Social Security Benefits Calculator and Optimization Tool</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      For most Americans, Social Security benefits are the main source of income in retirement. Our all-in-one calculator can help you figure out how much money you'll get in the future, how claiming age affects payments, and how to get the most lifetime benefits from Social Security.
                    </p>
                    <p className="text-sm text-gray-600">
                      Knowing when to apply for Social Security, how to get spousal benefits, and how taxes work can help you make smart choices that can have a big effect on your financial security in retirement, no matter how far away you are from retirement or how close you are to your full retirement age.
                    </p>
                  </div>
                </section>

                {/* Strategies for Claiming Social Security at Age */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Strategies for Claiming Social Security at Age</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Retirement at Age 62</h4>
                      <p className="text-sm text-gray-600">
                        You can start claiming benefits as early as 62, but they will be 25% to 30% lower than benefits at full retirement age. Only think about this if you need money right away or if you have health problems that could shorten your life.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">The full retirement age is 66–67.</h4>
                      <p className="text-sm text-gray-600">
                        Your full retirement age depends on when you were born. For example, if you were born between 1943 and 1954, you can retire at 66. If you were born in 1960 or later, you can retire at 67. At this age, claiming gives you the full amount of your benefit without any cuts or increases.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Retirement at 70 Years Old</h4>
                      <p className="text-sm text-gray-600">
                        If you wait to get benefits until after you turn 70, your payments will go up by 8% each year. This 32% increase (4 years × 8%) can greatly increase lifetime benefits, which is especially helpful for people who live longer.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Analysis of Break-Even</h4>
                      <p className="text-sm text-gray-600">
                        Find the break-even points for different ages when you can claim. If you live past 78–80, waiting to get benefits is usually worth it. When making a decision, think about your health, how long your family will live, and your immediate financial needs.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Maximizing Spousal and Survivor Benefits */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Maximizing Spousal and Survivor Benefits</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Benefits for Spouses</h4>
                      <p className="text-sm text-gray-600">
                        Spouses can get up to half of the higher earner's full retirement age benefit. Social Security only pays one of the spouses' benefits if both spouses worked.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">File and Suspend Strategy</h4>
                      <p className="text-sm text-gray-600">
                        Even though most of them are gone, some grandfathered couples can still use strategies where one spouse files and suspends to get spousal benefits while earning delayed retirement credits.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Benefits for Survivors</h4>
                      <p className="text-sm text-gray-600">
                        If the deceased spouse's benefit is higher than the surviving spouse's, the surviving spouse can claim up to 100% of it. Timing is important: you can claim survivor benefits as early as 60 years old (50 if you're disabled) with cuts.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Benefits for a Divorced Spouse</h4>
                      <p className="text-sm text-gray-600">
                        People who are divorced and married for at least 10 years can get spousal benefits based on their ex-spouse's record, even if the ex-spouse hasn't filed. This doesn't lower the ex-spouse's benefit, and both can choose the best time for themselves.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Social Security Benefits: Pros and Cons */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Social Security Benefits: Pros and Cons</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pros Section */}
                    <section className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                          ✓
                        </div>
                        <h4 className="font-semibold text-green-700 text-base">Benefits of Social Security</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Guaranteed Income:</strong> Inflation-adjusted payments for life, regardless of market conditions.</span></li>
                        <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Spousal Benefits:</strong> Married couples can maximize benefits through strategic claiming.</span></li>
                        <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Survivor Protection:</strong> Provides income security for surviving spouses and dependents.</span></li>
                        <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Disability Coverage:</strong> Built-in disability insurance for qualifying workers.</span></li>
                        <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Tax Advantages:</strong> Benefits may be partially or fully tax-free depending on income.</span></li>
                      </ul>
                    </section>

                    {/* Cons Section */}
                    <section className="bg-red-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                          ✗
                        </div>
                        <h4 className="font-semibold text-red-700 text-base">Social Security Limitations</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Limited Income:</strong> Benefits typically replace only 40% of pre-retirement income.</span></li>
                        <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Future Uncertainty:</strong> Potential benefit cuts if funding issues aren't addressed by 2034.</span></li>
                        <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Early Claim Penalties:</strong> Permanent benefit reduction for claiming before full retirement age.</span></li>
                        <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Earnings Test:</strong> Benefits may be reduced if you work while claiming before full retirement age.</span></li>
                        <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Inflation Risk:</strong> COLA adjustments may not keep pace with actual living cost increases.</span></li>
                      </ul>
                    </section>
                  </div>
                </section>

                {/* Call to Action Section */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 text-center mt-12">
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-4">Optimize Your Social Security Strategy Today</h3>
                    <p className="text-blue-100 text-base mb-6 max-w-2xl mx-auto">
                      Use our comprehensive calculator to maximize your Social Security benefits. Make informed claiming decisions and learn how timing affects your retirement income for life.
                    </p>
                    <Button 
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                    >
                      Calculate Your Social Security Benefits
                    </Button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SocialSecurityCalculatorUSA;