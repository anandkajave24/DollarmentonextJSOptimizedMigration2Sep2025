import Head from 'next/head';
import dynamic from 'next/dynamic';

const InvestmentRules = dynamic(() => import('@/pages/InvestmentRules'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div></div>
});

export default function InvestmentRulesPage() {
  return (
    <>
      <Head>
        <title>Investment Rules - Essential Principles for Successful Investing | DollarMento</title>
        <meta name="description" content="Master essential investment rules and principles used by successful investors. Learn time-tested strategies, risk management, and wealth-building fundamentals." />
        <meta name="keywords" content="investment rules, investment principles, investing guidelines, investment strategy, wealth building rules, smart investing" />
        <meta property="og:title" content="Investment Rules - Essential Principles for Successful Investing" />
        <meta property="og:description" content="Learn essential investment rules and principles for building long-term wealth successfully." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/investment-rules" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Investment Rules" />
        <meta name="twitter:description" content="Essential investment principles and rules for successful wealth building." />
        <link rel="canonical" href="https://dollarmento.com/investment-rules" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Investment Rules
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master time-tested investment principles and rules used by successful investors. 
              Build wealth systematically with proven strategies and disciplined approaches.
            </p>
          </div>

          {/* Interactive Rules Guide */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <InvestmentRules />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Essential Investment Principles</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Investment rules are time-tested principles that guide successful 
                    wealth building. These guidelines help investors avoid common pitfalls 
                    and make disciplined decisions in various market conditions.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">The Foundation Rules</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    These fundamental principles form the bedrock of successful investing 
                    and should guide every investment decision throughout your journey.
                  </p>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-amber-800 mb-3">Core Investment Rules:</h4>
                    <div className="space-y-4 text-amber-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-amber-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Start Early, Invest Regularly</div>
                          <div className="text-sm">Time and compound interest are your greatest allies</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-amber-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Diversify Your Portfolio</div>
                          <div className="text-sm">Don't put all eggs in one basket - spread risk</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-amber-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Invest Only What You Understand</div>
                          <div className="text-sm">Knowledge reduces risk and improves decisions</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-amber-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Keep Costs Low</div>
                          <div className="text-sm">High fees compound against you over time</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-amber-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">5</div>
                        <div>
                          <div className="font-semibold">Stay Disciplined</div>
                          <div className="text-sm">Emotions are the enemy of good investing</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Warren Buffett's Rules</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The world's most successful investor has distilled decades of 
                    experience into simple, powerful rules that every investor should follow.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Rule</th>
                          <th className="border border-gray-300 p-3 text-left">Explanation</th>
                          <th className="border border-gray-300 p-3 text-left">Application</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Rule #1: Never Lose Money</td>
                          <td className="border border-gray-300 p-3">Preserve capital at all costs</td>
                          <td className="border border-gray-300 p-3">Focus on downside protection</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Rule #2: Remember Rule #1</td>
                          <td className="border border-gray-300 p-3">Emphasizes capital preservation</td>
                          <td className="border border-gray-300 p-3">Risk management is paramount</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Buy when others are fearful</td>
                          <td className="border border-gray-300 p-3">Contrarian investing approach</td>
                          <td className="border border-gray-300 p-3">Market crashes create opportunities</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">It's better to buy wonderful companies at fair prices</td>
                          <td className="border border-gray-300 p-3">Quality over price</td>
                          <td className="border border-gray-300 p-3">Look for competitive advantages</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">Time is the friend of the wonderful business</td>
                          <td className="border border-gray-300 p-3">Long-term value creation</td>
                          <td className="border border-gray-300 p-3">Hold quality stocks for years</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Risk Management Rules</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Protecting your capital is more important than maximizing returns. 
                    These rules help manage risk while building wealth systematically.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="font-bold text-red-800 mb-3">Position Sizing Rules</h4>
                      <ul className="text-red-700 text-sm space-y-2">
                        <li>• <strong>No single stock &gt;5-10%</strong> of portfolio</li>
                        <li>• <strong>Sector allocation limits:</strong> Max 20-25%</li>
                        <li>• <strong>Geographic diversification:</strong> US + International</li>
                        <li>• <strong>Asset class limits:</strong> Stocks, bonds, REITs</li>
                        <li>• <strong>Emergency fund first:</strong> 3-6 months expenses</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Loss Prevention Rules</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• <strong>Stop-loss orders:</strong> Limit downside risk</li>
                        <li>• <strong>Regular rebalancing:</strong> Maintain target allocation</li>
                        <li>• <strong>Quality screening:</strong> Strong financials only</li>
                        <li>• <strong>Avoid speculation:</strong> Stick to investing principles</li>
                        <li>• <strong>Cash cushion:</strong> Keep dry powder for opportunities</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Market Timing Rules</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    While timing the market perfectly is impossible, these rules help 
                    investors make better decisions about when to buy and sell.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Market Cycle Awareness</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <h5 className="font-semibold mb-1">Bull Market Rules:</h5>
                          <ul className="space-y-1">
                            <li>• Gradually take profits on winners</li>
                            <li>• Maintain discipline with valuations</li>
                            <li>• Don't chase overvalued stocks</li>
                            <li>• Build cash for opportunities</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Bear Market Rules:</h5>
                          <ul className="space-y-1">
                            <li>• Buy quality companies at discounts</li>
                            <li>• Dollar-cost average into markets</li>
                            <li>• Focus on dividend-paying stocks</li>
                            <li>• Don't panic sell at bottoms</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Behavioral Finance Rules</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding and controlling behavioral biases is crucial for 
                    investment success. These rules help combat emotional decisions.
                  </p>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-amber-800 mb-3">Emotional Discipline Rules:</h4>
                    <div className="space-y-3 text-amber-700">
                      <div className="border-l-4 border-amber-300 pl-4">
                        <h5 className="font-semibold">Fear of Missing Out (FOMO)</h5>
                        <p className="text-sm">Rule: Never chase hot stocks or trends without research</p>
                      </div>
                      <div className="border-l-4 border-amber-300 pl-4">
                        <h5 className="font-semibold">Loss Aversion</h5>
                        <p className="text-sm">Rule: Cut losses early, let winners run with trailing stops</p>
                      </div>
                      <div className="border-l-4 border-amber-300 pl-4">
                        <h5 className="font-semibold">Confirmation Bias</h5>
                        <p className="text-sm">Rule: Actively seek contradictory evidence for your holdings</p>
                      </div>
                      <div className="border-l-4 border-amber-300 pl-4">
                        <h5 className="font-semibold">Overconfidence</h5>
                        <p className="text-sm">Rule: Stick to your allocation, avoid over-trading</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Long-Term Wealth Building Rules</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    These strategic rules focus on building substantial wealth over 
                    decades through consistent, disciplined investing approaches.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-green-700">Pay Yourself First</h4>
                      <p className="text-gray-700 text-sm">Automate investments before spending on discretionary items</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-700">Increase Savings Rate</h4>
                      <p className="text-gray-700 text-sm">Invest salary raises and bonuses rather than lifestyle inflation</p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-semibold text-purple-700">Tax-Advantaged Accounts First</h4>
                      <p className="text-gray-700 text-sm">Max out 401(k), IRA, and HSA before taxable accounts</p>
                    </div>
                    <div className="border-l-4 border-orange-400 pl-4">
                      <h4 className="font-semibold text-orange-700">Reinvest Dividends</h4>
                      <p className="text-gray-700 text-sm">Compound growth through automatic dividend reinvestment</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Rule Violations</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">Avoid These Mistakes</h4>
                      <ul className="text-red-700 text-sm space-y-1">
                        <li>• Chasing last year's best performing investments</li>
                        <li>• Trying to time the market based on news or predictions</li>
                        <li>• Putting too much money in one stock or sector</li>
                        <li>• Selling during market panics and buying during bubbles</li>
                        <li>• Ignoring fees and taxes in investment decisions</li>
                        <li>• Not having a written investment plan and sticking to it</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Rules for Different Life Stages</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Investment rules should adapt to your life stage, risk tolerance, 
                    and financial goals while maintaining core principles.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3 text-center">Young Investors (20s-30s)</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• <strong>High stock allocation:</strong> 80-90%</li>
                        <li>• <strong>Growth focus:</strong> Compound time advantage</li>
                        <li>• <strong>Aggressive savings:</strong> 15-20% of income</li>
                        <li>• <strong>Learning priority:</strong> Invest in knowledge</li>
                        <li>• <strong>Long-term view:</strong> Ignore short-term volatility</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3 text-center">Mid-Career (40s-50s)</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• <strong>Balanced approach:</strong> 60-70% stocks</li>
                        <li>• <strong>Peak earning years:</strong> Max contributions</li>
                        <li>• <strong>Risk management:</strong> Begin de-risking</li>
                        <li>• <strong>Estate planning:</strong> Beneficiary updates</li>
                        <li>• <strong>College funding:</strong> 529 plan contributions</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h4 className="font-bold text-orange-800 mb-3 text-center">Pre-Retirement (55+)</h4>
                      <ul className="text-orange-700 text-sm space-y-2">
                        <li>• <strong>Conservative shift:</strong> 40-60% stocks</li>
                        <li>• <strong>Income focus:</strong> Dividend-paying stocks</li>
                        <li>• <strong>Bond ladder:</strong> Stable income planning</li>
                        <li>• <strong>Catch-up contributions:</strong> IRA/401k limits</li>
                        <li>• <strong>Healthcare costs:</strong> HSA maximization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Implementing Investment Rules</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Knowledge of investment rules is only valuable when consistently 
                    applied. Implementation requires discipline, systems, and regular review.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Creating Your Investment Framework</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Write down your investment rules and philosophy</li>
                    <li>Set up automatic investing systems</li>
                    <li>Create regular review schedules</li>
                    <li>Establish clear criteria for buying and selling</li>
                    <li>Build accountability through tracking and measurement</li>
                    <li>Design emergency procedures for market crises</li>
                    <li>Plan for rule adjustments as circumstances change</li>
                  </ul>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-amber-800 mb-3">Sample Investment Rule Framework:</h4>
                    <div className="text-amber-700 space-y-2 text-sm">
                      <div><strong>Asset Allocation:</strong> 70% stocks, 25% bonds, 5% alternatives</div>
                      <div><strong>Maximum Position:</strong> No single stock &gt;5% of portfolio</div>
                      <div><strong>Rebalancing:</strong> Quarterly or when allocation drifts &gt;5%</div>
                      <div><strong>Investment Frequency:</strong> Monthly automatic contributions</div>
                      <div><strong>Review Schedule:</strong> Annual comprehensive review</div>
                      <div><strong>Emergency Rule:</strong> No panic selling during market drops &gt;20%</div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Success Measurement</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Track adherence to your investment rules as much as returns. 
                    Consistency in following principles leads to long-term success.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-amber-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-amber-800 mb-1">Rule Adherence</h4>
                      <div className="text-2xl font-bold text-amber-800">90%+</div>
                      <p className="text-amber-700 text-xs">Target consistency</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-orange-800 mb-1">Review Frequency</h4>
                      <div className="text-2xl font-bold text-orange-800">Quarterly</div>
                      <p className="text-orange-700 text-xs">Regular check-ins</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-red-800 mb-1">Adjustment Period</h4>
                      <div className="text-2xl font-bold text-red-800">Annual</div>
                      <p className="text-red-700 text-xs">Rule refinement</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Golden Rules</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Start Early</span>
                    <span className="font-semibold">Compound time</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Diversify</span>
                    <span className="font-semibold">Spread risk</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Stay Disciplined</span>
                    <span className="font-semibold">Control emotions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Keep Learning</span>
                    <span className="font-semibold">Continuous improvement</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Discipline Wins</h3>
                <p className="text-sm mb-4">
                  Successful investing is 90% discipline and 10% intelligence. Follow the rules consistently.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">90%</div>
                  <div className="text-sm opacity-90">Success from discipline</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/portfolio-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Portfolio Calculator
                  </a>
                  <a href="/risk-assessment" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Risk Assessment
                  </a>
                  <a href="/investment-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Calculator
                  </a>
                  <a href="/retirement-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Retirement Calculator
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
