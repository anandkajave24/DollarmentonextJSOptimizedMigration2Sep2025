import Head from 'next/head';
import dynamic from 'next/dynamic';

const FinancialPlanner = dynamic(() => import('@/pages/FinancialPlanner'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div></div>
});

export default function FinancialScenarioPage() {
  return (
    <>
      <Head>
        <title>Financial Scenario Planner - Financial Planning Calculator | DollarMento</title>
        <meta name="description" content="Free financial scenario planner. Model different financial situations, compare outcomes, and make informed decisions with comprehensive planning tools." />
        <meta name="keywords" content="financial scenario planner, financial planning calculator, scenario analysis calculator, financial modeling tool, what if calculator" />
        <meta property="og:title" content="Financial Scenario Planner - Financial Planning Calculator" />
        <meta property="og:description" content="Model different financial scenarios and make informed decisions with our comprehensive planning calculator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/run-financial-scenario" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Financial Scenario Planner" />
        <meta name="twitter:description" content="Free tool to model financial scenarios and compare different planning strategies." />
        <link rel="canonical" href="https://dollarmento.com/run-financial-scenario" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Financial Scenario Planner
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Model different financial situations, compare outcomes, and make informed 
              decisions with comprehensive scenario analysis and planning tools.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <FinancialPlanner />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Financial Scenario Planning</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Financial scenario planning involves modeling different potential 
                    future situations to understand their impact on your financial goals 
                    and develop robust strategies for various outcomes.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Scenario Planning Matters</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Life is unpredictable, and financial plans must account for uncertainty. 
                    Scenario planning helps you prepare for various possibilities and make 
                    decisions that work across different circumstances.
                  </p>

                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-cyan-800 mb-3">Benefits of Scenario Planning:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-cyan-700">
                      <div>
                        <h5 className="font-semibold mb-2">Risk Management:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Identify potential financial vulnerabilities</li>
                          <li>• Prepare for economic downturns</li>
                          <li>• Plan for unexpected expenses</li>
                          <li>• Stress-test financial strategies</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Decision Making:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Compare multiple strategies</li>
                          <li>• Understand trade-offs clearly</li>
                          <li>• Make informed choices</li>
                          <li>• Adjust plans proactively</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Types of Financial Scenarios</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Effective scenario planning considers various types of potential 
                    changes to your financial situation, from personal events to market conditions.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Scenario Type</th>
                          <th className="border border-gray-300 p-3 text-left">Examples</th>
                          <th className="border border-gray-300 p-3 text-left">Impact</th>
                          <th className="border border-gray-300 p-3 text-left">Planning Response</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Income Changes</td>
                          <td className="border border-gray-300 p-3">Job loss, promotion, career change</td>
                          <td className="border border-gray-300 p-3">Cash flow variation</td>
                          <td className="border border-gray-300 p-3">Emergency fund, skills development</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Market Conditions</td>
                          <td className="border border-gray-300 p-3">Recession, inflation, interest rates</td>
                          <td className="border border-gray-300 p-3">Investment returns</td>
                          <td className="border border-gray-300 p-3">Diversification, flexibility</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Life Events</td>
                          <td className="border border-gray-300 p-3">Marriage, divorce, children</td>
                          <td className="border border-gray-300 p-3">Goals and expenses</td>
                          <td className="border border-gray-300 p-3">Insurance, estate planning</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Health Issues</td>
                          <td className="border border-gray-300 p-3">Illness, disability, long-term care</td>
                          <td className="border border-gray-300 p-3">Medical costs</td>
                          <td className="border border-gray-300 p-3">Health insurance, HSA</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Scenario Modeling Framework</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    A systematic approach to scenario planning helps ensure you consider 
                    all relevant factors and develop actionable insights from your analysis.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">1. Define Baseline Scenario</h4>
                      <p className="text-gray-700 text-sm mb-2">Establish your current financial situation and most likely future path.</p>
                      <ul className="text-gray-600 text-xs space-y-1 ml-4">
                        <li>• Current income, expenses, assets, debts</li>
                        <li>• Expected growth rates and life changes</li>
                        <li>• Planned major purchases or investments</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">2. Identify Key Variables</h4>
                      <p className="text-gray-700 text-sm mb-2">Determine which factors could significantly impact your financial future.</p>
                      <ul className="text-gray-600 text-xs space-y-1 ml-4">
                        <li>• Income volatility and career progression</li>
                        <li>• Investment returns and market performance</li>
                        <li>• Inflation rates and cost of living changes</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">3. Create Alternative Scenarios</h4>
                      <p className="text-gray-700 text-sm mb-2">Develop optimistic, pessimistic, and alternative scenarios.</p>
                      <ul className="text-gray-600 text-xs space-y-1 ml-4">
                        <li>• Best case: Higher income, strong markets</li>
                        <li>• Worst case: Job loss, market crash</li>
                        <li>• Alternative: Career change, relocation</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">4. Analyze Outcomes</h4>
                      <p className="text-gray-700 text-sm mb-2">Calculate the financial impact of each scenario on your goals.</p>
                      <ul className="text-gray-600 text-xs space-y-1 ml-4">
                        <li>• Retirement readiness across scenarios</li>
                        <li>• Emergency fund adequacy</li>
                        <li>• Debt payoff timelines</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Retirement Planning Scenarios</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Retirement planning particularly benefits from scenario analysis 
                    given the long time horizon and multiple variables involved.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Conservative Scenario</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• Lower investment returns (5-6% annually)</li>
                        <li>• Higher inflation (3-4% annually)</li>
                        <li>• Delayed retirement age (67-70)</li>
                        <li>• Higher healthcare costs</li>
                        <li>• Reduced Social Security benefits</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Optimistic Scenario</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• Higher investment returns (8-10% annually)</li>
                        <li>• Moderate inflation (2-3% annually)</li>
                        <li>• Early retirement option (60-65)</li>
                        <li>• Good health and lower medical costs</li>
                        <li>• Full Social Security benefits</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Emergency Fund Scenarios</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different emergency scenarios require different levels of financial 
                    preparation. Understanding various possibilities helps size your emergency fund appropriately.
                  </p>

                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-cyan-800 mb-3">Emergency Scenarios:</h4>
                    <div className="space-y-3 text-cyan-700">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span>Minor car repair</span>
                        <span className="font-semibold">$500-2,000</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span>Medical emergency</span>
                        <span className="font-semibold">$1,000-10,000</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span>Job loss (3 months)</span>
                        <span className="font-semibold">$15,000-30,000</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span>Major home repair</span>
                        <span className="font-semibold">$5,000-25,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Extended unemployment</span>
                        <span className="font-semibold">$30,000-60,000</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Investment Strategy Scenarios</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Testing different market conditions helps validate investment 
                    strategies and adjust asset allocation for various risk levels.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-green-700">Bull Market Scenario</h4>
                      <p className="text-gray-700 text-sm">Strong economic growth, rising stock prices, low unemployment, and investor optimism</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Bear Market Scenario</h4>
                      <p className="text-gray-700 text-sm">Economic recession, declining markets, high unemployment, and investor pessimism</p>
                    </div>
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h4 className="font-semibold text-yellow-700">Stagflation Scenario</h4>
                      <p className="text-gray-700 text-sm">High inflation combined with slow economic growth and high unemployment</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-700">Interest Rate Shock</h4>
                      <p className="text-gray-700 text-sm">Rapid changes in interest rates affecting bonds, real estate, and borrowing costs</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Scenario Planning Best Practices</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Key Guidelines</h4>
                      <ul className="text-yellow-700 text-sm space-y-1">
                        <li>• Use realistic assumptions based on historical data</li>
                        <li>• Consider correlations between variables</li>
                        <li>• Update scenarios regularly as circumstances change</li>
                        <li>• Focus on scenarios that significantly impact goals</li>
                        <li>• Develop contingency plans for each scenario</li>
                        <li>• Monitor leading indicators for scenario triggers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Financial Scenario Planner</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our planner helps you model different financial scenarios and 
                    develop robust strategies that work across various circumstances.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Planner Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Model multiple financial scenarios simultaneously</li>
                    <li>Compare outcomes across different assumptions</li>
                    <li>Stress-test financial plans and strategies</li>
                    <li>Analyze impact of major life changes</li>
                    <li>Project long-term financial trajectories</li>
                    <li>Identify potential risks and opportunities</li>
                    <li>Develop contingency plans for various outcomes</li>
                  </ul>

                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-cyan-800 mb-3">Planning Example:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-cyan-700">
                      <div>
                        <h5 className="font-semibold mb-2">Scenario: Job Loss</h5>
                        <ul className="text-sm space-y-1">
                          <li>• 6-month unemployment period</li>
                          <li>• 50% income replacement from savings</li>
                          <li>• Reduced investment contributions</li>
                          <li>• Emergency fund depletion</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Impact Analysis:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Retirement delayed by 2 years</li>
                          <li>• Emergency fund needs rebuilding</li>
                          <li>• Insurance coverage critical</li>
                          <li>• <strong>Mitigation plan required</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Strategic Decision Making</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use scenario analysis to make financial decisions that are 
                    robust across different possible futures and align with your risk tolerance.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-cyan-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-cyan-800 mb-1">Scenarios</h4>
                      <div className="text-2xl font-bold text-cyan-800">3-5</div>
                      <p className="text-cyan-700 text-xs">Different outcomes</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Variables</h4>
                      <div className="text-2xl font-bold text-blue-800">5-10</div>
                      <p className="text-blue-700 text-xs">Key factors</p>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-indigo-800 mb-1">Timeline</h4>
                      <div className="text-2xl font-bold text-indigo-800">10-30</div>
                      <p className="text-indigo-700 text-xs">Years projected</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Planning Steps</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">1. Baseline</span>
                    <span className="font-semibold">Current situation</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">2. Variables</span>
                    <span className="font-semibold">Key factors</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">3. Scenarios</span>
                    <span className="font-semibold">Alternative futures</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">4. Actions</span>
                    <span className="font-semibold">Plan responses</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Key Benefit</h3>
                <p className="text-sm mb-4">
                  Scenario planning reduces financial stress by preparing for multiple possible futures.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Prepared</div>
                  <div className="text-sm opacity-90">For uncertainty</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/retirement-planning-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Retirement Planning Calculator
                  </a>
                  <a href="/budget-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Budget Calculator
                  </a>
                  <a href="/emergency-fund-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Emergency Fund Calculator
                  </a>
                  <a href="/investment-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Calculator
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
