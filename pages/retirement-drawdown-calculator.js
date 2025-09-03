import Head from 'next/head';
import dynamic from 'next/dynamic';

const RetirementDrawdownCalculator = dynamic(() => import('@/components/calculators/RetirementDrawdownCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div></div>
});

export default function RetirementDrawdownCalculatorPage() {
  return (
    <>
      <Head>
        <title>Retirement Drawdown Calculator - Withdrawal Strategy Calculator | DollarMento</title>
        <meta name="description" content="Free retirement withdrawal calculator. Plan sustainable retirement income with safe withdrawal rates, tax-efficient strategies, and portfolio longevity analysis." />
        <meta name="keywords" content="retirement drawdown calculator, withdrawal rate calculator, retirement income calculator, safe withdrawal rate, retirement planning" />
        <meta property="og:title" content="Retirement Drawdown Calculator - Withdrawal Strategy Calculator" />
        <meta property="og:description" content="Calculate sustainable retirement withdrawal rates and plan your retirement income strategy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/retirement-drawdown-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Retirement Drawdown Calculator" />
        <meta name="twitter:description" content="Free calculator to plan retirement withdrawals and ensure portfolio longevity." />
        <link rel="canonical" href="https://dollarmento.com/retirement-drawdown-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Retirement Drawdown Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plan sustainable retirement income with safe withdrawal rates, tax-efficient 
              strategies, and comprehensive portfolio longevity analysis.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <RetirementDrawdownCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Retirement Withdrawal Strategies</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Retirement drawdown strategies determine how you withdraw money from 
                    retirement accounts to fund your lifestyle while preserving capital 
                    for longevity and legacy goals.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Safe Withdrawal Rate Fundamentals</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The safe withdrawal rate represents the percentage of your retirement 
                    portfolio you can withdraw annually with minimal risk of depleting 
                    your savings during a 30-year retirement.
                  </p>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">Classic Withdrawal Rules:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-700">
                      <div>
                        <h5 className="font-semibold mb-2">4% Rule:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Withdraw 4% in year 1</li>
                          <li>• Adjust for inflation annually</li>
                          <li>• Based on 30-year timeframe</li>
                          <li>• 50/50 stock/bond portfolio</li>
                          <li>• 90% success rate historically</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Dynamic Rules:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Adjust based on market performance</li>
                          <li>• Portfolio value fluctuations</li>
                          <li>• Economic conditions</li>
                          <li>• Flexible spending approach</li>
                          <li>• Higher success rates</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Withdrawal Strategy Types</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different withdrawal strategies balance income stability, portfolio 
                    preservation, and flexibility based on your specific needs and market conditions.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Strategy</th>
                          <th className="border border-gray-300 p-3 text-left">Approach</th>
                          <th className="border border-gray-300 p-3 text-left">Pros</th>
                          <th className="border border-gray-300 p-3 text-left">Cons</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Fixed Percentage</td>
                          <td className="border border-gray-300 p-3">Same % annually</td>
                          <td className="border border-gray-300 p-3">Simple, predictable</td>
                          <td className="border border-gray-300 p-3">Variable income</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Fixed Dollar</td>
                          <td className="border border-gray-300 p-3">Same amount + inflation</td>
                          <td className="border border-gray-300 p-3">Stable income</td>
                          <td className="border border-gray-300 p-3">Depletion risk</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Bucket Strategy</td>
                          <td className="border border-gray-300 p-3">Time-based allocation</td>
                          <td className="border border-gray-300 p-3">Sequence risk protection</td>
                          <td className="border border-gray-300 p-3">Complex management</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Bond Ladder</td>
                          <td className="border border-gray-300 p-3">Maturing bonds</td>
                          <td className="border border-gray-300 p-3">Guaranteed income</td>
                          <td className="border border-gray-300 p-3">Limited growth</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Sequence of Returns Risk</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Poor market performance early in retirement can significantly impact 
                    portfolio longevity, even if long-term returns meet expectations.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Sequence Risk Example</h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between">
                          <span>Portfolio A: Good early returns</span>
                          <span className="font-semibold text-green-600">Lasts 35+ years</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Portfolio B: Poor early returns</span>
                          <span className="font-semibold text-red-600">Depleted in 22 years</span>
                        </div>
                        <div className="text-xs pt-2 border-t">
                          *Same average returns, different sequence
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tax-Efficient Withdrawal Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Strategic withdrawal sequencing from different account types can 
                    minimize lifetime tax burden and maximize after-tax income.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Traditional Sequence</h4>
                      <ol className="text-blue-700 text-sm space-y-2">
                        <li>1. Taxable accounts first</li>
                        <li>2. Tax-deferred (401k, IRA)</li>
                        <li>3. Tax-free (Roth IRA) last</li>
                        <li>4. Preserve tax-free growth</li>
                        <li>5. Manage tax brackets</li>
                      </ol>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Dynamic Approach</h4>
                      <ol className="text-green-700 text-sm space-y-2">
                        <li>1. Fill low tax brackets</li>
                        <li>2. Roth conversions in low years</li>
                        <li>3. Tax-loss harvesting</li>
                        <li>4. Asset location optimization</li>
                        <li>5. RMD planning</li>
                      </ol>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Required Minimum Distributions (RMDs)</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    RMDs from traditional retirement accounts begin at age 73 and can 
                    significantly impact withdrawal strategies and tax planning.
                  </p>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-indigo-800 mb-3">RMD Considerations:</h4>
                    <div className="space-y-3 text-indigo-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Age 73 Start</div>
                          <div className="text-sm">First RMD required by April 1 following age 73</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Uniform Lifetime Table</div>
                          <div className="text-sm">Withdrawal percentages increase with age</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Tax Impact</div>
                          <div className="text-sm">Forced withdrawals may push into higher brackets</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">QCD Strategy</div>
                          <div className="text-sm">Qualified charitable distributions reduce RMDs</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Bucket Strategy Implementation</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The bucket strategy segments your portfolio by time horizon, providing 
                    sequence of returns protection while maintaining growth potential.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-green-700">Bucket 1: Years 1-3</h4>
                      <p className="text-gray-700 text-sm">Cash and short-term bonds for immediate needs</p>
                    </div>
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h4 className="font-semibold text-yellow-700">Bucket 2: Years 4-10</h4>
                      <p className="text-gray-700 text-sm">Conservative bonds and dividend stocks for medium-term</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-700">Bucket 3: Years 11+</h4>
                      <p className="text-gray-700 text-sm">Growth stocks and equity funds for long-term appreciation</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Withdrawal Rate Guidelines by Market Conditions</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Bull Market (Portfolio Up 20%+)</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Consider 5-6% withdrawal rate</li>
                        <li>• Rebalance by taking profits</li>
                        <li>• Build cash reserves for future downturns</li>
                        <li>• Increase discretionary spending carefully</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">Bear Market (Portfolio Down 20%+)</h4>
                      <ul className="text-red-700 text-sm space-y-1">
                        <li>• Reduce to 3-3.5% withdrawal rate</li>
                        <li>• Cut discretionary expenses</li>
                        <li>• Use cash reserves and bonds</li>
                        <li>• Avoid selling depressed stocks</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Retirement Drawdown Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our calculator helps you model different withdrawal strategies and 
                    assess portfolio sustainability under various market scenarios.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Model different withdrawal rates and strategies</li>
                    <li>Factor in inflation and market volatility</li>
                    <li>Analyze tax implications of withdrawal sequencing</li>
                    <li>Simulate sequence of returns risk scenarios</li>
                    <li>Compare bucket vs. traditional strategies</li>
                    <li>Plan for required minimum distributions</li>
                    <li>Optimize for portfolio longevity</li>
                  </ul>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">Withdrawal Example:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-700">
                      <div>
                        <h5 className="font-semibold mb-2">Portfolio Details:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Total Portfolio: $1,200,000</li>
                          <li>• Initial Withdrawal: 4%</li>
                          <li>• Annual Income: $48,000</li>
                          <li>• Inflation Adjustment: 3%</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">30-Year Projection:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Success Probability: 89%</li>
                          <li>• Final Portfolio: $890,000</li>
                          <li>• Real Income: $84,000</li>
                          <li>• <strong>Strategy: Sustainable</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Optimization Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use the calculator to test and optimize your withdrawal strategy 
                    for maximum income, portfolio preservation, and tax efficiency.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-purple-800 mb-1">Safe Rate</h4>
                      <div className="text-2xl font-bold text-purple-800">3.5-4%</div>
                      <p className="text-purple-700 text-xs">Conservative approach</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Flexible Rate</h4>
                      <div className="text-2xl font-bold text-blue-800">3-6%</div>
                      <p className="text-blue-700 text-xs">Market-adjusted</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Portfolio Life</h4>
                      <div className="text-2xl font-bold text-green-800">30+</div>
                      <p className="text-green-700 text-xs">Years expected</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Guidelines</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">4% Rule</span>
                    <span className="font-semibold">Classic approach</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">RMD Age</span>
                    <span className="font-semibold">73 years old</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Emergency Fund</span>
                    <span className="font-semibold">2-3 years expenses</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Review Frequency</span>
                    <span className="font-semibold">Annual</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Success Rate</h3>
                <p className="text-sm mb-4">
                  The 4% rule has a 90% historical success rate for 30-year retirements.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">90%</div>
                  <div className="text-sm opacity-90">Historical success</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/retirement-planning-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Retirement Planning Calculator
                  </a>
                  <a href="/401k-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    401k Calculator
                  </a>
                  <a href="/social-security-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Social Security Calculator
                  </a>
                  <a href="/roth-ira-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Roth IRA Calculator
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
