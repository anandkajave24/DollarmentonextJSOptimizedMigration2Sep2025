import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, TrendingDown, DollarSign, Calendar, BarChart3, TrendingUp } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DrawdownResult {
  month: number;
  year: number;
  startingBalance: number;
  monthlyWithdrawal: number;
  annualWithdrawal: number;
  endingBalance: number;
  totalWithdrawn: number;
  balanceAfterReturn: number;
}

interface YearlyResult {
  year: number;
  startingBalance: number;
  annualWithdrawal: number;
  endingBalance: number;
  totalWithdrawn: number;
}

export default function RetirementDrawdownCalculator() {
  const [initialBalance, setInitialBalance] = useState(300000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(1000);
  const [withdrawalIncrease, setWithdrawalIncrease] = useState(5);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [drawdownTillAge, setDrawdownTillAge] = useState<number | string>(65);
  const [showAgeWarning, setShowAgeWarning] = useState(false);
  const [currentAge, setCurrentAge] = useState(35);
  const [includeSocialSecurity, setIncludeSocialSecurity] = useState(false);
  const [socialSecurityAmount, setSocialSecurityAmount] = useState(1500);
  const [results, setResults] = useState<DrawdownResult[]>([]);
  const [yearlyResults, setYearlyResults] = useState<YearlyResult[]>([]);
  const [moneyLastsFor, setMoneyLastsFor] = useState<{ years: number; months: number } | null>(null);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);

  const simulateDrawdown = () => {
    const years = Math.max(1, (Number(drawdownTillAge) || currentAge) - currentAge); // Calculate years from age difference
    const monthlyReturn = Math.pow(1 + annualReturn / 100, 1/12) - 1;
    const totalMonths = years * 12;
    
    let balance = initialBalance;
    let withdrawal = monthlyWithdrawal;
    let totalWithdrawnAmount = 0;
    const monthlyResults: DrawdownResult[] = [];
    const yearlyData: YearlyResult[] = [];
    const chartPoints: any[] = [];
    
    for (let month = 1; month <= totalMonths; month++) {
      const startingBalance = balance;
      
      // Apply monthly return
      const balanceAfterReturn = balance * (1 + monthlyReturn);
      balance = balanceAfterReturn;
      
      // Calculate current age for this month
      const currentAgeInMonths = currentAge * 12 + (month - 1);
      const ageInYears = currentAgeInMonths / 12;
      
      // Social Security starts at age 65
      const socialSecurityActive = includeSocialSecurity && ageInYears >= 65;
      
      // Calculate effective withdrawal (reduced by Social Security if active)
      const effectiveWithdrawal = socialSecurityActive 
        ? Math.max(0, withdrawal - socialSecurityAmount)
        : withdrawal;
      
      // Subtract withdrawal
      balance -= effectiveWithdrawal;
      totalWithdrawnAmount += effectiveWithdrawal;
      
      // Check if balance is depleted
      if (balance <= 0) {
        balance = 0;
        setMoneyLastsFor({ 
          years: Math.floor((month - 1) / 12), 
          months: (month - 1) % 12 
        });
        
        monthlyResults.push({
          month,
          year: Math.ceil(month / 12),
          startingBalance,
          monthlyWithdrawal: effectiveWithdrawal,
          annualWithdrawal: effectiveWithdrawal * 12,
          endingBalance: balance,
          totalWithdrawn: totalWithdrawnAmount,
          balanceAfterReturn
        });
        break;
      }
      
      monthlyResults.push({
        month,
        year: Math.ceil(month / 12),
        startingBalance,
        monthlyWithdrawal: effectiveWithdrawal,
        annualWithdrawal: effectiveWithdrawal * 12,
        endingBalance: balance,
        totalWithdrawn: totalWithdrawnAmount,
        balanceAfterReturn
      });
      
      // Add to chart data (yearly points)
      if (month % 12 === 0) {
        const year = month / 12;
        chartPoints.push({
          year,
          balance: Math.round(balance),
          withdrawal: Math.round(effectiveWithdrawal * 12),
          totalWithdrawn: Math.round(totalWithdrawnAmount)
        });
        
        // Create yearly summary
        const yearStart = monthlyResults.find(r => r.year === year && r.month === (year - 1) * 12 + 1);
        yearlyData.push({
          year,
          startingBalance: yearStart?.startingBalance || startingBalance,
          annualWithdrawal: Math.round(effectiveWithdrawal * 12),
          endingBalance: Math.round(balance),
          totalWithdrawn: Math.round(totalWithdrawnAmount)
        });
        
        // Increase withdrawal for next year
        withdrawal *= (1 + withdrawalIncrease / 100);
      }
    }
    
    // If money lasted the full period
    if (balance > 0) {
      setMoneyLastsFor(null);
      setFinalBalance(Math.round(balance));
    }
    
    setResults(monthlyResults);
    setYearlyResults(yearlyData);
    setTotalWithdrawn(Math.round(totalWithdrawnAmount));
    setChartData(chartPoints);
  };

  useEffect(() => {
    simulateDrawdown();
  }, [initialBalance, monthlyWithdrawal, withdrawalIncrease, annualReturn, drawdownTillAge, currentAge, includeSocialSecurity, socialSecurityAmount]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCompactCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return formatCurrency(amount);
  };



  const withdrawalRate = ((monthlyWithdrawal * 12) / initialBalance * 100);
  const years = Math.max(1, (Number(drawdownTillAge) || currentAge) - currentAge);

  return (
    <div className="w-full p-4 space-y-4">
      {/* Header */}
      <div className="text-left mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Retirement Drawdown Calculator</h1>
        <p className="text-sm text-gray-600 max-w-3xl">
          Plan smarter withdrawals from your retirement savings. See how long your money will last — 
          adjusted for inflation, investment growth, and monthly needs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input Section - 40% width */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Retirement Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="initial-balance">Retirement Savings</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="initial-balance"
                    type="number"
                    value={initialBalance}
                    onChange={(e) => setInitialBalance(Number(e.target.value))}
                    min="10000"
                    step="10000"
                    className="pl-8"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="monthly-withdrawal">Starting Monthly Withdrawal</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="monthly-withdrawal"
                    type="number"
                    value={monthlyWithdrawal}
                    onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))}
                    min="100"
                    step="100"
                    className="pl-8"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Initial withdrawal rate: {withdrawalRate.toFixed(1)}% annually
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="withdrawal-increase">Annual Increase in Withdrawal</Label>
                <div className="relative">
                  <Input
                    id="withdrawal-increase"
                    type="number"
                    value={withdrawalIncrease}
                    onChange={(e) => setWithdrawalIncrease(Number(e.target.value))}
                    min="0"
                    max="10"
                    step="0.5"
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500">Typically 2-5% for inflation adjustment</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="annual-return">Annual Return</Label>
                <div className="relative">
                  <Input
                    id="annual-return"
                    type="number"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(Number(e.target.value))}
                    min="1"
                    max="25"
                    step="0.5"
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500">Long-term stock market average: 10-12%</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-age">Current Age</Label>
                  <Input
                    id="current-age"
                    type="number"
                    value={currentAge}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '') {
                        setCurrentAge(18);
                        return;
                      }
                      
                      const newAge = Number(value);
                      if (isNaN(newAge)) return;
                      
                      setCurrentAge(newAge);
                      if (Number(drawdownTillAge) < newAge) {
                        setDrawdownTillAge(newAge);
                      }
                    }}
                    onBlur={(e) => {
                      const value = Number(e.target.value);
                      if (isNaN(value) || value < 18) {
                        setCurrentAge(18);
                      }
                    }}
                    min="18"
                    max="80"
                    step="1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="drawdown-till-age">Drawdown Till</Label>
                  <Input
                    id="drawdown-till-age"
                    type="number"
                    value={drawdownTillAge || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      
                      // Allow completely empty field
                      if (value === '') {
                        setDrawdownTillAge('');
                        setShowAgeWarning(false);
                        return;
                      }
                      
                      const newValue = Number(value);
                      if (isNaN(newValue)) return;
                      
                      // Just set the value, don't auto-correct while typing
                      setDrawdownTillAge(newValue);
                      
                      // Show warning for invalid values but don't change the input
                      if (newValue < currentAge && newValue > 0) {
                        setShowAgeWarning(true);
                      } else {
                        setShowAgeWarning(false);
                      }
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value === '' || Number(value) < currentAge) {
                        setDrawdownTillAge(currentAge);
                        setShowAgeWarning(false);
                      }
                    }}
                    max="100"
                    step="1"
                    className={showAgeWarning ? "border-amber-500 focus:border-amber-500" : ""}
                  />
                </div>
              </div>
              
              {showAgeWarning && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-xs text-amber-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Age cannot be less than current age. Set to {currentAge}.
                  </p>
                </div>
              )}
              
              <p className="text-xs text-gray-500">
                Next {Math.max(1, (Number(drawdownTillAge) || currentAge) - currentAge)} years withdrawal (Age {currentAge} to {Number(drawdownTillAge) || currentAge})
              </p>
              
              <div className="space-y-3 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <Label htmlFor="social-security" className="text-sm font-medium">
                    Include Social Security
                  </Label>
                  <Switch
                    id="social-security"
                    checked={includeSocialSecurity}
                    onCheckedChange={setIncludeSocialSecurity}
                  />
                </div>
                
                <p className="text-xs text-gray-500">Social Security begins at age 65</p>
                
                {includeSocialSecurity && (
                  <div className="space-y-2">
                    <Label htmlFor="social-security-amount">Monthly Social Security</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="social-security-amount"
                        type="number"
                        value={socialSecurityAmount}
                        onChange={(e) => setSocialSecurityAmount(Number(e.target.value))}
                        min="500"
                        step="100"
                        className="pl-8"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Starts at age 65, reduces portfolio withdrawal needed</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section - 60% width */}
        <div className="lg:col-span-3 space-y-4">
          {/* Key Metrics - 3 Horizontal Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-3 text-center">
                <div className="h-6 flex items-center justify-center mb-2">
                  <p className="text-sm font-medium text-gray-600">Money Lasts</p>
                </div>
                <div className="h-8 flex items-center justify-center">
                  <p className="text-lg font-bold text-gray-900 leading-tight">
                    {moneyLastsFor 
                      ? `${moneyLastsFor.years}+ years`
                      : `${years}+ years`
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 text-center">
                <div className="h-6 flex items-center justify-center mb-2">
                  <p className="text-sm font-medium text-gray-600">Total Withdrawn</p>
                </div>
                <div className="h-8 flex items-center justify-center">
                  <p className="text-lg font-bold text-gray-900 leading-tight">
                    {formatCurrency(totalWithdrawn)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 text-center">
                <div className="h-6 flex items-center justify-center mb-2">
                  <p className="text-sm font-medium text-gray-600">Final Balance</p>
                </div>
                <div className="h-8 flex items-center justify-center">
                  <p className="text-lg font-bold text-gray-900 leading-tight">
                    {moneyLastsFor ? "$0" : formatCurrency(finalBalance)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Chart */}
          {chartData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Balance Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="year" 
                        label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        tickFormatter={(value) => {
                          if (value >= 1000000) {
                            return `$${(value / 1000000).toFixed(1)}M`;
                          } else if (value >= 1000) {
                            return `$${(value / 1000).toFixed(0)}K`;
                          }
                          return `$${value}`;
                        }}
                      />
                      <Tooltip 
                        formatter={(value: any, name: string) => [
                          name === 'balance' ? formatCurrency(value) : formatCurrency(value),
                          name === 'balance' ? 'Balance' : 'Annual Withdrawal'
                        ]}
                        labelFormatter={(year) => `Year ${year}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="balance"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                      />
                      <Line
                        type="monotone"
                        dataKey="withdrawal"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Current Scenario */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Current Scenario:</strong> Starting with {formatCurrency(initialBalance)}, 
              withdrawing {formatCurrency(monthlyWithdrawal)}/month (increasing {withdrawalIncrease}% annually), 
              with {annualReturn}% annual return.
              {includeSocialSecurity && ` Social Security of ${formatCurrency(socialSecurityAmount)}/month reduces portfolio withdrawals.`}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Box - Parameters */}
            <div className="space-y-3 text-sm">
              <p><span className="font-medium">Age:</span> {currentAge} → {Number(drawdownTillAge) || currentAge} ({years} years)</p>
              <p><span className="font-medium">Portfolio Start:</span> {formatCurrency(initialBalance)}</p>
              <p><span className="font-medium">Monthly Withdrawal:</span> {formatCurrency(monthlyWithdrawal)}</p>
              <p><span className="font-medium">Annual Increase:</span> {withdrawalIncrease}%</p>
            </div>

            {/* Right Box - Results */}
            <div className="space-y-3 text-sm">
              <p><span className="font-medium">Annual Return:</span> {annualReturn}%</p>
              <p><span className="font-medium">Social Security:</span> {includeSocialSecurity ? `${formatCurrency(socialSecurityAmount)}/month` : 'Not included'}</p>
              <p><span className="font-medium">Portfolio Duration:</span> {moneyLastsFor ? `${moneyLastsFor.years} years ${moneyLastsFor.months} months` : `✅ ${years}+ years`}</p>
              <p><span className="font-medium">Final Balance:</span> {yearlyResults.length > 0 && yearlyResults[yearlyResults.length - 1] ? formatCurrency(yearlyResults[yearlyResults.length - 1].endingBalance) : 'Calculating...'}</p>
            </div>
          </div>
        </CardContent>
      </Card>



      {/* Results Table */}
      {yearlyResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Year-by-Year Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-3 font-semibold">Year</th>
                    <th className="text-right p-3 font-semibold">Starting Balance</th>
                    <th className="text-right p-3 font-semibold">Annual Withdrawal</th>
                    <th className="text-right p-3 font-semibold">Ending Balance</th>
                    <th className="text-right p-3 font-semibold">Total Withdrawn</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyResults.map((result, index) => (
                    <tr key={result.year} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 font-medium">{result.year}</td>
                      <td className="p-3 text-right">{formatCurrency(result.startingBalance)}</td>
                      <td className="p-3 text-right text-red-600">{formatCurrency(result.annualWithdrawal)}</td>
                      <td className="p-3 text-right font-semibold text-green-600">
                        {formatCurrency(result.endingBalance)}
                      </td>
                      <td className="p-3 text-right text-blue-600">
                        {formatCurrency(result.totalWithdrawn)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Educational Content Section */}
      <div className="w-full mt-8 space-y-6">
        {/* Key Results and Thoughts */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Key Results and Thoughts</h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              The 4% rule says that every year you should take out 4% of your money. Your current rate is {withdrawalRate.toFixed(1)}%.
              {withdrawalRate > 4 ? " It seems like this will last." : " It seems like this will last."}
            </p>
            <p className="text-sm text-gray-600">
              A portfolio will last longer if it has higher returns and lower withdrawal rates. You should think about having both stocks and bonds in your portfolio if you want to grow your money over time.
            </p>
            <p className="text-sm text-gray-600">
              You can keep more money in your portfolio with Social Security. If you wait until you're 70 to get Social Security, your monthly benefits will go up by 8% every year.
            </p>
            <p className="text-sm text-gray-600">
              This calculator thinks that the returns will stay the same. The results can change if the market changes. Speak with a financial advisor about the risk of sequence of returns.
            </p>
          </div>
        </section>

        {/* How to get ready for retirement */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">How to get ready for retirement</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Strategies for withdrawal:</h4>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">• Start with the 4% rule</p>
                <p className="text-sm text-gray-600">• Change your withdrawals based on how the market is doing</p>
                <p className="text-sm text-gray-600">• Think about using a bucket strategy for different time frames</p>
                <p className="text-sm text-gray-600">• Plan for healthcare costs to go up</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Getting the Most Out of Your Portfolio</h4>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">• Your portfolio should have a mix of stocks and bonds.</p>
                <p className="text-sm text-gray-600">• You might want to invest in international stocks.</p>
                <p className="text-sm text-gray-600">• You should rebalance your portfolio once a year or when your allocations change.</p>
                <p className="text-sm text-gray-600">• You should also look over your risk tolerance and change it over time.</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Tax Efficiency:</h4>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">• First, take money out of accounts that are taxable.</p>
                <p className="text-sm text-gray-600">• When your income is low, think about Roth conversions.</p>
                <p className="text-sm text-gray-600">• Plan for Required Minimum Distributions.</p>
                <p className="text-sm text-gray-600">• Work with the timing of Social Security</p>
              </div>
            </div>
          </div>
        </section>

        {/* Retirement Drawdown: Pros and Cons */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Retirement Drawdown: Pros and Cons</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pros Section */}
            <section className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <h4 className="font-semibold text-green-700 text-base">Benefits of Strategic Drawdown</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Flexible Income:</strong> Adjust withdrawals based on market conditions and personal needs.</span></li>
                <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Growth Potential:</strong> Remaining portfolio continues to benefit from investment returns.</span></li>
                <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Tax Control:</strong> Manage tax brackets through strategic withdrawal timing and amounts.</span></li>
                <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Legacy Planning:</strong> Potential to leave assets to heirs if withdrawals are conservative.</span></li>
                <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Inflation Protection:</strong> Portfolio growth can help maintain purchasing power over time.</span></li>
              </ul>
            </section>

            {/* Cons Section */}
            <section className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  ✗
                </div>
                <h4 className="font-semibold text-red-700 text-base">Retirement Drawdown Risks</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Market Risk:</strong> Poor market performance early in retirement can severely impact portfolio longevity.</span></li>
                <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Sequence Risk:</strong> Timing of market downturns relative to withdrawals is critical.</span></li>
                <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Longevity Risk:</strong> Living longer than expected may exhaust retirement savings.</span></li>
                <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Withdrawal Discipline:</strong> Requires careful planning and restraint during market upturns.</span></li>
                <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Healthcare Costs:</strong> Unexpected medical expenses can accelerate portfolio depletion.</span></li>
              </ul>
            </section>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 text-center mt-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Optimize Your Retirement Drawdown Strategy</h3>
            <p className="text-blue-100 text-base mb-6 max-w-2xl mx-auto">
              Use our calculator to test different withdrawal scenarios and find the optimal strategy for your retirement income. Plan for a secure financial future with data-driven insights.
            </p>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Calculate Your Retirement Drawdown
            </button>
          </div>
        </section>
      </div>

      {/* Disclaimer */}
      <div className="text-center text-xs text-gray-500 border-t pt-4">
        <p>
          You can only use this calculator for schoolwork. The real results may be different because of taxes, changes in the market, and other things. If you need help planning for retirement, talk to a financial advisor who knows what they're doing.
        </p>
      </div>
    </div>
  );
}