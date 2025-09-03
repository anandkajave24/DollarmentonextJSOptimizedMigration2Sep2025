import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SEO } from '@/components/SEO';
import { Helmet } from 'react-helmet';
import { HelpCircle, DollarSign, Clock, Calculator } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, ChartTooltip, Legend);

interface CDInputs {
  initialDeposit: number;
  termLength: number;
  termUnit: string;
  annualInterestRate: number;
  compoundingFrequency: string;
  taxRate: number;
  autoRenewal: boolean;
}

const CDCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CDInputs>({
    initialDeposit: 10000,
    termLength: 5,
    termUnit: 'years',
    annualInterestRate: 4.75,
    compoundingFrequency: 'monthly',
    taxRate: 24,
    autoRenewal: false
  });

  const handleInputChange = (field: keyof CDInputs, value: string | number | boolean) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' && field !== 'termUnit' && field !== 'compoundingFrequency' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const calculations = useMemo(() => {
    const { initialDeposit, termLength, termUnit, annualInterestRate, compoundingFrequency, taxRate } = inputs;
    
    // Convert term to years
    const termInYears = termUnit === 'months' ? termLength / 12 : termLength;
    
    // Convert rate to decimal
    const rate = annualInterestRate / 100;
    
    // Compounding frequency
    const compoundingMap = {
      'daily': 365,
      'monthly': 12,
      'quarterly': 4,
      'annually': 1
    };
    const n = compoundingMap[compoundingFrequency as keyof typeof compoundingMap] || 12;
    
    // Compound interest formula: A = P(1 + r/n)^(nt)
    const maturityValue = initialDeposit * Math.pow(1 + rate / n, n * termInYears);
    const totalInterest = maturityValue - initialDeposit;
    const apy = Math.pow(1 + rate / n, n) - 1;
    
    // Tax calculations
    const taxableInterest = totalInterest;
    const taxOwed = taxableInterest * (taxRate / 100);
    const afterTaxValue = maturityValue - taxOwed;
    const afterTaxInterest = totalInterest - taxOwed;

    return {
      maturityValue,
      totalInterest,
      apy: apy * 100,
      taxOwed,
      afterTaxValue,
      afterTaxInterest,
      effectiveYield: (afterTaxInterest / initialDeposit / termInYears) * 100
    };
  }, [inputs]);

  // Chart data for CD breakdown
  const chartData = {
    labels: ['Principal', 'Interest Earned', 'Taxes Owed'],
    datasets: [
      {
        data: [inputs.initialDeposit, calculations.totalInterest - calculations.taxOwed, calculations.taxOwed],
        backgroundColor: ['#3b82f6', '#10b981', '#ef4444'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.parsed;
            const percentage = ((value / calculations.maturityValue) * 100).toFixed(1);
            return `${context.label}: ${formatCurrency(value)} (${percentage}%)`;
          }
        }
      }
    },
  };

  // CD comparison data for different terms
  const comparisonData = useMemo(() => {
    const rates = [3.5, 4.0, 4.5, 5.0, 5.5];
    const terms = [1, 2, 3, 4, 5];
    
    return terms.map(years => {
      const rate = rates[years - 1] / 100;
      const compoundingPerYear = 12; // Monthly
      const amount = inputs.initialDeposit * Math.pow(1 + rate / compoundingPerYear, compoundingPerYear * years);
      const interest = amount - inputs.initialDeposit;
      
      return {
        term: `${years} Year${years > 1 ? 's' : ''}`,
        rate: (rate * 100).toFixed(2),
        finalAmount: amount,
        totalInterest: interest,
        apy: ((Math.pow(1 + rate / compoundingPerYear, compoundingPerYear) - 1) * 100).toFixed(2)
      };
    });
  }, [inputs.initialDeposit, inputs.annualInterestRate, inputs.compoundingFrequency]);

  return (
    <>
      <Helmet>
        <title>CD Calculator - Certificate of Deposit Interest Calculator | DollarMento</title>
        <meta name="description" content="Calculate CD (Certificate of Deposit) returns and compare rates. Find the best CD terms and see how compound interest grows your savings with guaranteed returns." />
        <meta name="keywords" content="cd calculator, certificate of deposit calculator, cd interest calculator, cd maturity calculator, savings cd calculator, deposit calculator" />
        <link rel="canonical" href="https://dollarmento.com/cd-calculator" />
      </Helmet>
      <TooltipProvider>
      <SEO 
        title="CD Calculator - Certificate of Deposit Interest & Maturity Calculator USA"
        description="Free certificate of deposit calculator with compound interest. Calculate CD maturity value, interest earnings, and compare CD rates. FDIC-insured savings planning tool."
        keywords="cd calculator, certificate of deposit calculator, cd interest calculator, cd maturity calculator, bank cd calculator, cd investment calculator, certificate of deposit interest calculator, cd maturity value calculator, bank cd comparison calculator, cd apy calculator, cd compound interest calculator, cd ladder calculator, fdic insured cd calculator, high yield cd calculator, jumbo cd calculator"
        canonical="https://dollarmento.com/cd-calculator"
        ogType="website"
      />
      <div className="w-full px-4">
        <div className="mb-8 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Certificate of Deposit (CD) Calculator</h1>
          <p className="text-sm text-gray-600 max-w-3xl">Lock your money. Watch it grow. Know your exact returns. Quickly estimate how much interest you'll earn with fixed terms and fixed rates.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Input Panel - 40% width */}
            <div className="lg:col-span-2 space-y-4">
              {/* CD Settings */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-blue-800 text-base">
                    🏦 CD Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Initial Deposit
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Amount you want to lock in the Certificate of Deposit. Most CDs have minimum deposits of $500-$1,000.</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Input
                        type="number"
                        value={inputs.initialDeposit}
                        onChange={(e) => handleInputChange('initialDeposit', e.target.value)}
                        className="mt-1"
                        placeholder="10000"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Term Length
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Duration your money will be locked in the CD. Longer terms typically offer higher rates.</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="number"
                          value={inputs.termLength}
                          onChange={(e) => handleInputChange('termLength', e.target.value)}
                          className="flex-1"
                          placeholder="5"
                        />
                        <Select value={inputs.termUnit} onValueChange={(value) => handleInputChange('termUnit', value)}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="months">Months</SelectItem>
                            <SelectItem value="years">Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Annual Interest Rate (%)
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Annual percentage rate offered by the bank. Check current CD rates from multiple institutions.</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={inputs.annualInterestRate}
                        onChange={(e) => handleInputChange('annualInterestRate', e.target.value)}
                        className="mt-1"
                        placeholder="4.75"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Compounding Frequency
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>How often interest is calculated and added to your principal. More frequent compounding = higher returns.</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Select value={inputs.compoundingFrequency} onValueChange={(value) => handleInputChange('compoundingFrequency', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="annually">Annually</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-1">
                        Tax Rate (%)
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Your marginal tax rate. CD interest is taxed as ordinary income.</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={inputs.taxRate}
                        onChange={(e) => handleInputChange('taxRate', e.target.value)}
                        className="mt-1"
                        placeholder="24"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="auto-renewal"
                        checked={inputs.autoRenewal}
                        onCheckedChange={(checked) => handleInputChange('autoRenewal', checked)}
                      />
                      <Label htmlFor="auto-renewal" className="text-sm font-medium">
                        Auto-renewal at maturity
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel - 60% width */}
            <div className="lg:col-span-3 space-y-4">
              {/* Main Results */}
              <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-green-800 text-base">📊 CD Investment Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <div className="text-xs text-gray-500 mb-1">Maturity Value</div>
                      <div className="text-lg font-bold text-green-600">{formatCurrency(calculations.maturityValue)}</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <div className="text-xs text-gray-500 mb-1">Interest Earned</div>
                      <div className="text-lg font-bold text-blue-600">{formatCurrency(calculations.totalInterest)}</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <div className="text-xs text-gray-500 mb-1">After-Tax Value</div>
                      <div className="text-lg font-bold text-orange-600">{formatCurrency(calculations.afterTaxValue)}</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <div className="text-xs text-gray-500 mb-1">Effective APY</div>
                      <div className="text-lg font-bold text-purple-600">{calculations.apy.toFixed(2)}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Breakdown Chart */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-800 text-base">🥧 CD Value Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: '250px' }}>
                    <Doughnut data={chartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              {/* CD Term Comparison */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-800 text-base">📋 CD Term Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {comparisonData.map((cd, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">{cd.term}</span>
                          <span className="text-sm text-gray-500 ml-2">({cd.rate}% APY)</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">{formatCurrency(cd.finalAmount)}</div>
                          <div className="text-xs text-gray-500">+{formatCurrency(cd.totalInterest)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>


        </div>
        
        {/* Educational Content Section */}
        <div className="w-full">
          <div className="px-6 py-8">
            <div className="space-y-6">
              
              {/* CD Investment Planner */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Certificate of Deposit Investment Planning</h2>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    Planning your savings with certificates of deposit doesn't have to be complicated. With our specifically designed CD calculator, you can understand exactly how your money will grow over time. Whether you're looking for safe, guaranteed returns or planning for a specific financial goal, this tool helps you make informed decisions about your CD investments.
                  </p>
                  <p>
                    Our comprehensive CD calculator lets you explore different scenarios including various term lengths, interest rates, and compounding frequencies. You can compare different banks and credit unions to find the best rates, understand how early withdrawal penalties affect your returns, and plan CD laddering strategies.
                  </p>
                </div>
              </section>

              {/* How to Use This Calculator */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Use This Calculator</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Initial Deposit Information</h4>
                    <p className="text-gray-600 text-sm">
                      Start by entering your initial deposit amount - this is how much money you plan to invest in the CD. Most banks have minimum deposit requirements ranging from $500 to $2,500, though some offer CDs with lower minimums.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Term Length and Interest Rate</h4>
                    <p className="text-gray-600 text-sm">
                      Choose your CD term length carefully - this determines how long your money stays locked up. Common terms range from 3 months to 5 years, with longer terms typically offering higher rates.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Compounding Frequency</h4>
                    <p className="text-gray-600 text-sm">
                      Select how often your interest compounds - daily, monthly, quarterly, or annually. More frequent compounding means slightly higher returns over time.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Tax Considerations</h4>
                    <p className="text-gray-600 text-sm">
                      Enter your tax rate to see your after-tax returns. CD interest is taxed as ordinary income, so you'll need to plan for tax obligations.
                    </p>
                  </div>
                </div>
              </section>

              {/* Understanding Your CD Results */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Understanding Your CD Results</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Maturity Value and Interest Earned</h4>
                    <p className="text-gray-600 text-sm">
                      The calculator shows your total maturity value - what you'll receive when your CD term ends. This includes your original deposit plus all accumulated interest.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Annual Percentage Yield (APY)</h4>
                    <p className="text-gray-600 text-sm">
                      APY represents your effective annual return including compound interest effects. This is the most important number when comparing CDs from different banks.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Tax Impact Analysis</h4>
                    <p className="text-gray-600 text-sm">
                      See how taxes affect your real returns. CD interest is taxed in the year earned, even if you don't withdraw it.
                    </p>
                  </div>
                </div>
              </section>

              {/* CD Investment Strategies */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">CD Investment Strategies</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">CD Laddering Strategy</h4>
                    <p className="text-gray-600 text-sm">
                      Instead of putting all your money in one CD, spread it across multiple CDs with different maturity dates. For example, buy five 1-year CDs every three months.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Rate Shopping Techniques</h4>
                    <p className="text-gray-600 text-sm">
                      Compare APYs from multiple banks, credit unions, and online institutions. Online banks often offer higher rates with lower overhead costs.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-base">Timing Your CD Purchases</h4>
                    <p className="text-gray-600 text-sm">
                      Consider interest rate trends when choosing CD terms. In rising rate environments, shorter terms give you flexibility to reinvest at higher rates.
                    </p>
                  </div>
                </div>
              </section>

              {/* CD vs Other Investments */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-blue-700">CDs vs Other Safe Investments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">CDs vs Savings Accounts</h3>
                      <p className="text-gray-600 text-sm">
                        CDs typically offer higher rates than savings accounts in exchange for locking up your money. Savings accounts provide full liquidity but lower returns. Choose CDs for money you won't need during the term period.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">CDs vs Treasury Bills</h3>
                      <p className="text-gray-600 text-sm">
                        Both are government-backed safe investments. Treasury bills offer federal tax advantages (no state tax) and high liquidity through secondary markets. CDs provide FDIC insurance and potentially higher rates, but with early withdrawal penalties.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">CDs vs Money Market Accounts</h3>
                      <p className="text-gray-600 text-sm">
                        Money market accounts offer check-writing privileges and ATM access with competitive rates. CDs provide guaranteed rates and typically higher returns for longer commitments. Consider your liquidity needs when choosing.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">CDs vs I Bonds</h3>
                      <p className="text-gray-600 text-sm">
                        I Bonds protect against inflation with variable rates, while CDs offer fixed rates. I Bonds have purchase limits ($10,000 annually) and cannot be redeemed for 12 months. CDs provide predictable returns without purchase restrictions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Maximizing CD Returns */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-blue-700">Maximizing Your CD Returns</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm mb-4">
                    Use these proven strategies to get the most from your CD investments while maintaining the safety and predictability that makes CDs attractive.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Shop Around for Best Rates</h3>
                      <p className="text-gray-600 text-sm">
                        Don't settle for your local bank's rates. Online banks and credit unions often offer significantly higher APYs. Use our calculator to compare the long-term impact of even small rate differences - they compound significantly over time.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Consider Promotional Rates</h3>
                      <p className="text-gray-600 text-sm">
                        Banks sometimes offer special promotional rates for new customers or specific term lengths. These can provide above-market returns, but verify the rate applies to your entire deposit amount and read all terms carefully.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Time Your Renewals</h3>
                      <p className="text-gray-600 text-sm">
                        Most CDs automatically renew at current rates if you don't act during the grace period. Mark your calendar and shop for better rates before renewal. You typically have 7-10 days after maturity to make changes penalty-free.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Use IRA CDs for Tax Benefits</h3>
                      <p className="text-gray-600 text-sm">
                        Consider holding CDs in traditional or Roth IRAs to defer or eliminate taxes on interest earnings. IRA CDs combine the safety of CDs with significant tax advantages, especially for conservative retirement portfolio allocations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 3-Section Format: Pros/Cons, Why Use, FAQ - Moved to Bottom */}
            <div className="w-full mt-12 space-y-8">
              {/* Pros and Cons of CDs */}
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-semibold text-gray-800">Pros and Cons of Certificates of Deposit</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Understanding the advantages and disadvantages of CD investments</p>
                </CardHeader>
                <CardContent>
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
                            <h4 className="font-semibold text-gray-800 text-sm">FDIC Insured</h4>
                            <p className="text-gray-600 text-sm">Government-backed insurance protects up to $250,000 per depositor.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1">✓</span>
                          <div>
                            <h4 className="font-semibold text-gray-800 text-sm">Guaranteed Returns</h4>
                            <p className="text-gray-600 text-sm">Fixed interest rates provide predictable, guaranteed earnings.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1">✓</span>
                          <div>
                            <h4 className="font-semibold text-gray-800 text-sm">Higher Rates</h4>
                            <p className="text-gray-600 text-sm">Typically offer better rates than traditional savings accounts.</p>
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
                            <h4 className="font-semibold text-gray-800 text-sm">Limited Liquidity</h4>
                            <p className="text-gray-600 text-sm">Early withdrawal penalties reduce returns significantly.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-red-600 mr-2 mt-1">✗</span>
                          <div>
                            <h4 className="font-semibold text-gray-800 text-sm">Inflation Risk</h4>
                            <p className="text-gray-600 text-sm">Fixed rates may not keep pace with rising inflation over time.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-red-600 mr-2 mt-1">✗</span>
                          <div>
                            <h4 className="font-semibold text-gray-800 text-sm">Opportunity Cost</h4>
                            <p className="text-gray-600 text-sm">Lower returns compared to potentially higher-yielding investments.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Use a CD Calculator */}
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-semibold text-gray-800">Why Use a CD Calculator?</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Make informed decisions about your safe investment options</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <DollarSign className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Rate Comparison</h4>
                      <p className="text-sm text-gray-600">
                        Compare CD rates and terms across different banks and institutions.
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Term Planning</h4>
                      <p className="text-sm text-gray-600">
                        Choose the right term length to balance rates with liquidity needs.
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <Calculator className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Return Calculation</h4>
                      <p className="text-sm text-gray-600">
                        Calculate exact returns including compound interest effects.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Frequently Asked Questions */}
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-semibold text-gray-800">Frequently Asked Questions</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Common questions about CD investments and calculations</p>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left font-semibold text-gray-800">
                        What happens if I withdraw my CD early?
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-gray-600">
                        Early withdrawal typically results in penalty fees, often 3-12 months of interest depending on the term. Some banks offer no-penalty CDs with lower rates that allow early withdrawal without fees.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left font-semibold text-gray-800">
                        How are CD returns taxed?
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-gray-600">
                        CD interest is taxed as ordinary income in the year it's earned, even if you don't withdraw it. You'll receive a 1099-INT form for tax reporting. Consider tax-advantaged accounts like IRAs for CD investments.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left font-semibold text-gray-800">
                        Should I ladder my CDs?
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-gray-600">
                        CD laddering involves buying multiple CDs with different maturity dates. This strategy provides regular liquidity while potentially earning higher rates from longer-term CDs. It's ideal for ongoing income needs.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left font-semibold text-gray-800">
                        What's the difference between APY and interest rate on CDs?
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-gray-600">
                        APY (Annual Percentage Yield) includes compound interest effects and gives you the true annual return. Interest rate is the base rate before compounding. Always compare APYs when shopping for CDs.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* CD Pros and Cons */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Certificate of Deposit: Pros and Cons</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pros Section */}
                  <section className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        ✓
                      </div>
                      <h4 className="font-semibold text-green-700 text-base">Benefits of CDs</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>FDIC Insurance:</strong> Protected up to $250,000 per depositor, per bank.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Guaranteed Returns:</strong> Fixed interest rate ensures predictable earnings.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Higher Rates:</strong> Better than regular savings accounts and money market funds.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>No Market Risk:</strong> Principal and interest are guaranteed regardless of market conditions.</span></li>
                      <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Compound Interest:</strong> Interest compounds regularly, maximizing returns over time.</span></li>
                    </ul>
                  </section>

                  {/* Cons Section */}
                  <section className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        ✗
                      </div>
                      <h4 className="font-semibold text-red-700 text-base">Drawbacks of CDs</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Liquidity Constraints:</strong> Money is locked up until maturity date.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Early Withdrawal Penalties:</strong> Fees for accessing funds before maturity.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Inflation Risk:</strong> Fixed rates may not keep pace with rising prices.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Opportunity Cost:</strong> May miss higher returns from other investments.</span></li>
                      <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Interest Rate Risk:</strong> Locked into rates even if market rates rise.</span></li>
                    </ul>
                  </section>
                </div>
              </section>
            </div>
          </div>
        
        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 text-center mt-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Calculate Your CD Investment Returns Today</h3>
            <p className="text-blue-100 text-base mb-6 max-w-2xl mx-auto">
              Our comprehensive CD calculator helps you make informed decisions about certificate of deposit investments. Compare rates, terms, and see exactly how your money will grow with guaranteed returns.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Your CD Calculation
            </Button>
          </div>
        </section>
      </div>
    </TooltipProvider>
    </>
  );
};

export default CDCalculator;