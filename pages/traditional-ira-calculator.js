import Head from 'next/head';
import dynamic from 'next/dynamic';

const TraditionalIRACalculatorUSA = dynamic(() => import('@/pages/TraditionalIRACalculatorUSA'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div></div>
});

export default function TraditionalIRACalculatorPage() {
  return (
    <>
      <Head>
        <title>Traditional IRA Calculator - Retirement Planning Tool | DollarMento</title>
        <meta name="description" content="Free Traditional IRA calculator. Plan retirement savings, calculate tax deductions, and optimize your IRA contribution strategy for maximum growth." />
        <meta name="keywords" content="traditional ira calculator, ira calculator, retirement calculator, traditional ira, ira contribution, retirement planning, tax deduction" />
        <meta property="og:title" content="Traditional IRA Calculator - Retirement Planning Tool" />
        <meta property="og:description" content="Plan your retirement with our comprehensive Traditional IRA calculator. Calculate growth projections and optimize your retirement savings strategy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/traditional-ira-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Traditional IRA Calculator" />
        <meta name="twitter:description" content="Free calculator to plan your Traditional IRA contributions and retirement savings growth." />
        <link rel="canonical" href="https://dollarmento.com/traditional-ira-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Traditional IRA Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plan your retirement with our comprehensive Traditional IRA calculator. Calculate growth projections, 
              tax benefits, and create an optimal retirement savings strategy.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <TraditionalIRACalculatorUSA />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Traditional IRAs</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    A Traditional Individual Retirement Account (IRA) is one of the most powerful retirement savings 
                    tools available to American workers. It offers immediate tax deductions on contributions and 
                    tax-deferred growth, making it an essential component of any comprehensive retirement strategy.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Benefits of Traditional IRAs</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li><strong>Immediate Tax Deduction:</strong> Contributions may be fully or partially deductible from current income</li>
                    <li><strong>Tax-Deferred Growth:</strong> Investments grow without annual tax obligations</li>
                    <li><strong>Wide Investment Options:</strong> Stocks, bonds, mutual funds, ETFs, and more</li>
                    <li><strong>Higher Contribution Limits:</strong> $7,000 in 2025 ($8,000 if 50 or older)</li>
                    <li><strong>Flexible Timing:</strong> Contribute until tax filing deadline (April 15)</li>
                    <li><strong>Estate Planning Benefits:</strong> Beneficiaries can inherit IRA assets</li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">2025 Traditional IRA Contribution Limits</h3>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-800">$7,000</div>
                        <div className="text-sm text-purple-600">Annual Limit (Under 50)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-800">$8,000</div>
                        <div className="text-sm text-purple-600">Annual Limit (50 & Older)</div>
                      </div>
                    </div>
                    <div className="text-center mt-4 text-purple-700 text-sm">
                      Additional $1,000 catch-up contribution for those 50 and older
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Traditional IRA Deductibility Rules</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Whether your Traditional IRA contribution is fully deductible, partially deductible, or 
                    non-deductible depends on your income level, tax filing status, and whether you or your 
                    spouse have access to a workplace retirement plan.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Filing Status</th>
                          <th className="border border-gray-300 p-3 text-left">Income Range (2025)</th>
                          <th className="border border-gray-300 p-3 text-left">Deduction Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3">Single (no 401k)</td>
                          <td className="border border-gray-300 p-3">Any income</td>
                          <td className="border border-gray-300 p-3">Full deduction</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">Single (with 401k)</td>
                          <td className="border border-gray-300 p-3">Under $73,000</td>
                          <td className="border border-gray-300 p-3">Full deduction</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3">Single (with 401k)</td>
                          <td className="border border-gray-300 p-3">$73,000 - $83,000</td>
                          <td className="border border-gray-300 p-3">Partial deduction</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">Single (with 401k)</td>
                          <td className="border border-gray-300 p-3">Over $83,000</td>
                          <td className="border border-gray-300 p-3">No deduction</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3">Married (no 401k)</td>
                          <td className="border border-gray-300 p-3">Any income</td>
                          <td className="border border-gray-300 p-3">Full deduction</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">Married (with 401k)</td>
                          <td className="border border-gray-300 p-3">Under $116,000</td>
                          <td className="border border-gray-300 p-3">Full deduction</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3">Married (with 401k)</td>
                          <td className="border border-gray-300 p-3">$116,000 - $136,000</td>
                          <td className="border border-gray-300 p-3">Partial deduction</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">Married (with 401k)</td>
                          <td className="border border-gray-300 p-3">Over $136,000</td>
                          <td className="border border-gray-300 p-3">No deduction</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Traditional IRA vs. Roth IRA Comparison</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Choosing between a Traditional IRA and Roth IRA depends on your current tax bracket, 
                    expected retirement tax bracket, and financial goals. Here's a detailed comparison to 
                    help you make the right choice.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Traditional IRA</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• <strong>Tax Treatment:</strong> Deductible contributions, taxable withdrawals</li>
                        <li>• <strong>Best For:</strong> Higher current tax bracket than retirement</li>
                        <li>• <strong>RMDs:</strong> Required at age 73</li>
                        <li>• <strong>Early Withdrawal:</strong> 10% penalty + taxes on earnings</li>
                        <li>• <strong>Income Limits:</strong> Deduction limits with 401(k)</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Roth IRA</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• <strong>Tax Treatment:</strong> No deduction, tax-free withdrawals</li>
                        <li>• <strong>Best For:</strong> Lower current tax bracket than retirement</li>
                        <li>• <strong>RMDs:</strong> No required distributions</li>
                        <li>• <strong>Early Withdrawal:</strong> Contributions always accessible</li>
                        <li>• <strong>Income Limits:</strong> Phase-out for high earners</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Traditional IRA Investment Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your Traditional IRA can hold a wide variety of investments. The key is choosing 
                    investments that align with your risk tolerance, time horizon, and retirement goals.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Age-Based Investment Allocation:</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium">Ages 20-30:</span>
                        <span className="text-sm">90% Stocks, 10% Bonds</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium">Ages 30-40:</span>
                        <span className="text-sm">80% Stocks, 20% Bonds</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium">Ages 40-50:</span>
                        <span className="text-sm">70% Stocks, 30% Bonds</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium">Ages 50-60:</span>
                        <span className="text-sm">60% Stocks, 40% Bonds</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Ages 60+:</span>
                        <span className="text-sm">40% Stocks, 60% Bonds</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Required Minimum Distributions (RMDs)</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Traditional IRAs require you to start taking minimum distributions at age 73. Understanding 
                    RMD rules is crucial for avoiding hefty penalties and planning your retirement income strategy.
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">RMD Important Facts:</h4>
                    <ul className="text-red-700 space-y-2">
                      <li>• <strong>Start Age:</strong> Must begin by April 1 of the year after turning 73</li>
                      <li>• <strong>Calculation:</strong> Account balance ÷ life expectancy factor</li>
                      <li>• <strong>Penalty:</strong> 25% excise tax on amounts not withdrawn (reduced to 10% if corrected)</li>
                      <li>• <strong>Frequency:</strong> Annual distributions required every year thereafter</li>
                      <li>• <strong>Tax Treatment:</strong> RMDs are taxed as ordinary income</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Traditional IRA Rollover Options</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    When changing jobs or retiring, you may need to rollover your 401(k) to a Traditional IRA. 
                    This process allows you to maintain tax-deferred status while gaining more investment options.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Direct Rollover</h4>
                      <ul className="text-yellow-700 text-sm space-y-1">
                        <li>• Funds transfer directly between accounts</li>
                        <li>• No taxes or penalties</li>
                        <li>• Preferred method for most situations</li>
                        <li>• No withholding requirements</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-800 mb-2">Indirect Rollover</h4>
                      <ul className="text-orange-700 text-sm space-y-1">
                        <li>• You receive funds directly</li>
                        <li>• Must redeposit within 60 days</li>
                        <li>• 20% withholding may apply</li>
                        <li>• Limited to one per year</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Traditional IRA Mistakes</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Missing the Contribution Deadline</h4>
                      <p className="text-gray-700 text-sm">Contributions must be made by tax filing deadline (April 15) for the previous year.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Excess Contributions</h4>
                      <p className="text-gray-700 text-sm">Contributing more than the annual limit results in 6% excise tax until corrected.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Early Withdrawal Penalties</h4>
                      <p className="text-gray-700 text-sm">Withdrawals before age 59½ incur 10% penalty plus ordinary income tax.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Forgetting About RMDs</h4>
                      <p className="text-gray-700 text-sm">Failing to take required distributions results in severe penalties.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Traditional IRA Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our Traditional IRA calculator helps you plan your retirement savings strategy by projecting 
                    how your contributions will grow over time, factoring in tax deductions, compound growth, 
                    and required minimum distributions.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Project IRA balance at retirement</li>
                    <li>Calculate annual tax savings from deductions</li>
                    <li>Compare different contribution scenarios</li>
                    <li>Factor in catch-up contributions for 50+</li>
                    <li>Estimate required minimum distributions</li>
                    <li>Compare Traditional vs. Roth IRA outcomes</li>
                    <li>Plan contribution timing for maximum benefit</li>
                  </ul>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Key Assumptions:</h4>
                    <ul className="text-blue-700 space-y-1 text-sm">
                      <li>• Average annual return: 7-8% (mixed portfolio)</li>
                      <li>• Conservative return: 5-6% (bond-heavy portfolio)</li>
                      <li>• Aggressive return: 9-10% (stock-heavy portfolio)</li>
                      <li>• Tax rates remain constant (adjustable)</li>
                      <li>• Annual contribution increases with inflation</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Maximizing Your Traditional IRA</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To get the most from your Traditional IRA, focus on maximizing contributions, optimizing 
                    investment allocation, and coordinating with other retirement accounts for tax efficiency.
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Optimization Strategies:</h4>
                    <ul className="text-green-700 space-y-2">
                      <li>• Contribute early in the year to maximize growth time</li>
                      <li>• Make catch-up contributions if eligible (50+)</li>
                      <li>• Coordinate with 401(k) for maximum tax benefits</li>
                      <li>• Consider Roth conversions in low-income years</li>
                      <li>• Use target-date funds for automatic rebalancing</li>
                      <li>• Review and adjust allocation annually</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Traditional IRA in Retirement Planning</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your Traditional IRA should be part of a comprehensive retirement strategy that includes 
                    Social Security, employer plans, and other savings. Understanding how these pieces work 
                    together is key to retirement success.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-purple-800 mb-1">Conservative Scenario</h4>
                      <div className="text-2xl font-bold text-purple-800">$500K</div>
                      <p className="text-purple-700 text-xs">$500/month for 30 years at 6%</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Moderate Scenario</h4>
                      <div className="text-2xl font-bold text-blue-800">$870K</div>
                      <p className="text-blue-700 text-xs">$500/month for 30 years at 8%</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Aggressive Scenario</h4>
                      <div className="text-2xl font-bold text-green-800">$1.2M</div>
                      <p className="text-green-700 text-xs">$500/month for 30 years at 10%</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">2025 IRA Quick Facts</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Contribution Limit</span>
                    <span className="font-semibold">$7,000</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Catch-up (50+)</span>
                    <span className="font-semibold">$8,000</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">RMD Start Age</span>
                    <span className="font-semibold">73</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Early Withdrawal</span>
                    <span className="font-semibold">10% penalty</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Tax Savings Example</h3>
                <p className="text-sm mb-4">
                  $7,000 IRA contribution in 22% tax bracket saves $1,540 in current taxes.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">$1,540</div>
                  <div className="text-sm opacity-90">Annual tax savings</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/roth-ira-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Roth IRA Calculator
                  </a>
                  <a href="/401k-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    401(k) Calculator
                  </a>
                  <a href="/retirement-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Retirement Calculator
                  </a>
                  <a href="/tax-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Tax Calculator
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
