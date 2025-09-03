import Head from 'next/head';
import dynamic from 'next/dynamic';

const SocialSecurityCalculatorUSA = dynamic(() => import('@/pages/SocialSecurityCalculatorUSA'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
});

export default function SocialSecurityCalculatorPage() {
  return (
    <>
      <Head>
        <title>Social Security Calculator - Benefits Estimator & Planning Tool | DollarMento</title>
        <meta name="description" content="Free Social Security calculator. Estimate your retirement benefits, optimize claiming strategies, and plan your Social Security income for maximum lifetime value." />
        <meta name="keywords" content="social security calculator, social security benefits calculator, retirement benefits estimator, social security planning, when to claim social security" />
        <meta property="og:title" content="Social Security Calculator - Benefits Estimator & Planning Tool" />
        <meta property="og:description" content="Calculate your Social Security benefits and optimize your claiming strategy with our comprehensive retirement planning tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/social-security-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Social Security Calculator" />
        <meta name="twitter:description" content="Free Social Security calculator to estimate benefits and plan your retirement income strategy." />
        <link rel="canonical" href="https://dollarmento.com/social-security-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Social Security Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estimate your Social Security benefits and optimize your claiming strategy. 
              Plan your retirement income and maximize your lifetime Social Security value.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <SocialSecurityCalculatorUSA />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Social Security Benefits</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Social Security provides a foundation of retirement income for most Americans. Understanding 
                    how benefits are calculated, when to claim, and how to maximize your lifetime value is 
                    crucial for successful retirement planning.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">How Social Security Benefits Are Calculated</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your Social Security benefit is based on your highest 35 years of earnings, adjusted for 
                    inflation. The formula is progressive, providing higher replacement rates for lower earners.
                  </p>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-indigo-800 mb-3">Benefit Calculation Process:</h4>
                    <div className="space-y-3 text-indigo-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Average Indexed Monthly Earnings (AIME)</div>
                          <div className="text-sm">Sum of highest 35 years of indexed earnings ÷ 420 months</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Primary Insurance Amount (PIA)</div>
                          <div className="text-sm">Apply progressive benefit formula to AIME</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Adjust for Claiming Age</div>
                          <div className="text-sm">Reduce for early claiming or increase for delayed retirement</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">2025 Social Security Benefit Formula</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The benefit formula uses "bend points" to calculate your Primary Insurance Amount (PIA). 
                    The formula is designed to replace a higher percentage of pre-retirement income for lower earners.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">AIME Range (2025)</th>
                          <th className="border border-gray-300 p-3 text-left">Replacement Rate</th>
                          <th className="border border-gray-300 p-3 text-left">Maximum Benefit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3">$0 - $1,174</td>
                          <td className="border border-gray-300 p-3 font-semibold">90%</td>
                          <td className="border border-gray-300 p-3">$1,057</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3">$1,175 - $7,078</td>
                          <td className="border border-gray-300 p-3 font-semibold">32%</td>
                          <td className="border border-gray-300 p-3">$1,889</td>
                        </tr>
                        <tr className="bg-red-50">
                          <td className="border border-gray-300 p-3">Above $7,078</td>
                          <td className="border border-gray-300 p-3 font-semibold">15%</td>
                          <td className="border border-gray-300 p-3">Variable</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Social Security Claiming Ages & Impact</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    When you claim Social Security significantly affects your monthly benefit amount. 
                    Understanding the impact of different claiming ages is crucial for maximizing lifetime benefits.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="font-bold text-red-800 mb-3">Early Retirement (62-66)</h4>
                      <ul className="text-red-700 text-sm space-y-2">
                        <li>• Benefits reduced up to 30%</li>
                        <li>• Permanent reduction</li>
                        <li>• Earnings test applies</li>
                        <li>• Good for: Poor health, immediate need</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Full Retirement (66-67)</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• 100% of calculated benefit</li>
                        <li>• No earnings test</li>
                        <li>• Can work without penalty</li>
                        <li>• Good for: Average health, modest savings</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Delayed Retirement (67-70)</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• Benefits increased by 8% per year</li>
                        <li>• Up to 32% higher than FRA</li>
                        <li>• Maximum at age 70</li>
                        <li>• Good for: Good health, other income</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">2025 Social Security Payment Schedule</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Social Security benefits are paid monthly based on your birth date. Understanding the 
                    payment schedule helps with retirement budgeting and cash flow planning.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Monthly Payment Dates:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
                      <div>
                        <h5 className="font-semibold mb-2">Before 1997 Recipients:</h5>
                        <p className="text-sm">3rd of every month</p>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">After 1997 Recipients:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Born 1st-10th: 2nd Wednesday</li>
                          <li>• Born 11th-20th: 3rd Wednesday</li>
                          <li>• Born 21st-31st: 4th Wednesday</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Spousal and Survivor Benefits</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Married couples have additional Social Security options through spousal and survivor benefits. 
                    These can significantly impact household retirement income strategies.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Spousal Benefits</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Up to 50% of higher earner's benefit</li>
                        <li>• Must be married at least 1 year</li>
                        <li>• Can claim on ex-spouse if married 10+ years</li>
                        <li>• Reduced if claimed before full retirement age</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Survivor Benefits</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Up to 100% of deceased spouse's benefit</li>
                        <li>• Can start as early as age 60 (reduced)</li>
                        <li>• Available to ex-spouses (10+ year marriage)</li>
                        <li>• Remarriage after age 60 doesn't affect benefits</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Social Security Tax Considerations</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Social Security benefits may be subject to federal income tax depending on your total 
                    retirement income. Understanding these rules helps with tax planning in retirement.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Filing Status</th>
                          <th className="border border-gray-300 p-3 text-left">Combined Income</th>
                          <th className="border border-gray-300 p-3 text-left">Taxable Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3">Single</td>
                          <td className="border border-gray-300 p-3">Under $25,000</td>
                          <td className="border border-gray-300 p-3">0%</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3">Single</td>
                          <td className="border border-gray-300 p-3">$25,000 - $34,000</td>
                          <td className="border border-gray-300 p-3">Up to 50%</td>
                        </tr>
                        <tr className="bg-red-50">
                          <td className="border border-gray-300 p-3">Single</td>
                          <td className="border border-gray-300 p-3">Over $34,000</td>
                          <td className="border border-gray-300 p-3">Up to 85%</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3">Married</td>
                          <td className="border border-gray-300 p-3">Under $32,000</td>
                          <td className="border border-gray-300 p-3">0%</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3">Married</td>
                          <td className="border border-gray-300 p-3">$32,000 - $44,000</td>
                          <td className="border border-gray-300 p-3">Up to 50%</td>
                        </tr>
                        <tr className="bg-red-50">
                          <td className="border border-gray-300 p-3">Married</td>
                          <td className="border border-gray-300 p-3">Over $44,000</td>
                          <td className="border border-gray-300 p-3">Up to 85%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Maximizing Social Security Benefits</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Strategic planning can significantly increase your lifetime Social Security benefits. 
                    Consider these optimization strategies based on your situation.
                  </p>

                  <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-2">Optimization Strategies:</h4>
                    <ul className="text-green-700 space-y-1 text-sm">
                      <li>• <strong>Work 35+ years:</strong> Replace low-earning years with higher earnings</li>
                      <li>• <strong>Delay claiming:</strong> Get 8% annual increases until age 70</li>
                      <li>• <strong>Coordinate with spouse:</strong> Optimize household claiming strategy</li>
                      <li>• <strong>Consider taxes:</strong> Time other retirement income to minimize taxes</li>
                      <li>• <strong>Health assessment:</strong> Factor longevity into claiming decisions</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Social Security Mistakes</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Claiming Too Early</h4>
                      <p className="text-gray-700 text-sm">Permanent reduction in benefits without considering longevity or other income sources.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Ignoring Spousal Benefits</h4>
                      <p className="text-gray-700 text-sm">Missing opportunities to maximize household Social Security income through coordination.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Not Checking Earnings Record</h4>
                      <p className="text-gray-700 text-sm">Errors in earnings history can reduce benefits; check annually at ssa.gov.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Forgetting About Taxes</h4>
                      <p className="text-gray-700 text-sm">Not considering the tax impact of Social Security benefits on overall retirement income.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Social Security Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our Social Security calculator helps you estimate benefits and compare different claiming 
                    strategies to maximize your lifetime Social Security value.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Estimate retirement benefits based on earnings history</li>
                    <li>Compare benefits at different claiming ages</li>
                    <li>Calculate spousal and survivor benefits</li>
                    <li>Show lifetime benefit totals by claiming strategy</li>
                    <li>Factor in cost-of-living adjustments (COLA)</li>
                    <li>Estimate tax impact on benefits</li>
                    <li>Plan optimal household claiming strategy</li>
                  </ul>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-indigo-800 mb-3">Break-Even Analysis Example:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-indigo-700">
                      <div>
                        <h5 className="font-semibold mb-2">Claim at 62:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Monthly benefit: $1,400</li>
                          <li>• Lifetime (age 85): $387,200</li>
                          <li>• Break-even vs FRA: Age 77</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Claim at 70:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Monthly benefit: $2,640</li>
                          <li>• Lifetime (age 85): $475,200</li>
                          <li>• Break-even vs FRA: Age 82</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Social Security Planning Timeline</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use our calculator results to create a comprehensive Social Security strategy 
                    that coordinates with your overall retirement plan.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Age 50-60</h4>
                      <p className="text-blue-700 text-xs">Review earnings record, estimate benefits, plan strategy</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-purple-800 mb-1">Age 60-62</h4>
                      <p className="text-purple-700 text-xs">Finalize claiming strategy, coordinate with spouse</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Age 62-67</h4>
                      <p className="text-green-700 text-xs">Monitor health, adjust strategy, implement plan</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-yellow-800 mb-1">Age 67-70</h4>
                      <p className="text-yellow-700 text-xs">Maximize delayed credits, plan for Medicare</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">2025 SS Quick Facts</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Full Retirement Age</span>
                    <span className="font-semibold">67</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Max Monthly (FRA)</span>
                    <span className="font-semibold">$3,822</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Max Monthly (70)</span>
                    <span className="font-semibold">$5,108</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">COLA 2025</span>
                    <span className="font-semibold">2.5%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Delayed Retirement Benefit</h3>
                <p className="text-sm mb-4">
                  Waiting until age 70 increases benefits by 32% compared to full retirement age.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">+32%</div>
                  <div className="text-sm opacity-90">Benefit increase at 70</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/retirement-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Retirement Calculator
                  </a>
                  <a href="/medicare-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Medicare Calculator
                  </a>
                  <a href="/retirement-income-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Retirement Income Calculator
                  </a>
                  <a href="/life-expectancy-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Life Expectancy Calculator
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
