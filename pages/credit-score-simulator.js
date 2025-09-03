import Head from 'next/head';
import dynamic from 'next/dynamic';

const CreditScoreSimulator = dynamic(() => import('@/pages/CreditScoreSimulator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div></div>
});

export default function CreditScoreSimulatorPage() {
  return (
    <>
      <Head>
        <title>Credit Score Simulator - Credit Improvement Calculator | DollarMento</title>
        <meta name="description" content="Free credit score simulator. Analyze how different financial actions affect your credit score. Plan credit improvement strategies for better rates." />
        <meta name="keywords" content="credit score simulator, credit score calculator, credit improvement calculator, fico score simulator, credit repair calculator" />
        <meta property="og:title" content="Credit Score Simulator - Credit Improvement Calculator" />
        <meta property="og:description" content="Simulate credit score changes and plan improvement strategies with our comprehensive credit calculator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/credit-score-simulator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Credit Score Simulator" />
        <meta name="twitter:description" content="Free tool to simulate credit score changes and plan credit improvement strategies." />
        <link rel="canonical" href="https://dollarmento.com/credit-score-simulator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Credit Score Simulator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Analyze how different financial actions affect your credit score. 
              Plan improvement strategies and understand credit factors for better rates.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <CreditScoreSimulator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Credit Score Improvement</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Credit scores are numerical representations of creditworthiness that 
                    lenders use to assess lending risk. Understanding factors that impact 
                    scores helps develop effective improvement strategies.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Credit Score Factors</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    FICO scores, the most widely used scoring model, are calculated using 
                    five main factors with different weights affecting your overall score.
                  </p>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-emerald-800 mb-3">FICO Score Components:</h4>
                    <div className="space-y-3 text-emerald-700">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-4 bg-emerald-400 rounded"></div>
                          <span className="font-semibold">Payment History</span>
                        </div>
                        <span className="font-bold text-lg">35%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-4 bg-emerald-500 rounded"></div>
                          <span className="font-semibold">Credit Utilization</span>
                        </div>
                        <span className="font-bold text-lg">30%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-4 bg-emerald-600 rounded"></div>
                          <span className="font-semibold">Length of Credit History</span>
                        </div>
                        <span className="font-bold text-lg">15%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-emerald-700 rounded"></div>
                          <span className="font-semibold">Credit Mix</span>
                        </div>
                        <span className="font-bold text-lg">10%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-emerald-800 rounded"></div>
                          <span className="font-semibold">New Credit</span>
                        </div>
                        <span className="font-bold text-lg">10%</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Credit Score Ranges</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Credit scores typically range from 300 to 850, with different ranges 
                    indicating varying levels of creditworthiness and loan qualification.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Score Range</th>
                          <th className="border border-gray-300 p-3 text-left">Rating</th>
                          <th className="border border-gray-300 p-3 text-left">Loan Qualification</th>
                          <th className="border border-gray-300 p-3 text-left">Interest Rates</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-red-50">
                          <td className="border border-gray-300 p-3 font-semibold">300-579</td>
                          <td className="border border-gray-300 p-3">Poor</td>
                          <td className="border border-gray-300 p-3">Very difficult</td>
                          <td className="border border-gray-300 p-3">Highest rates</td>
                        </tr>
                        <tr className="bg-orange-50">
                          <td className="border border-gray-300 p-3 font-semibold">580-669</td>
                          <td className="border border-gray-300 p-3">Fair</td>
                          <td className="border border-gray-300 p-3">Subprime lending</td>
                          <td className="border border-gray-300 p-3">High rates</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">670-739</td>
                          <td className="border border-gray-300 p-3">Good</td>
                          <td className="border border-gray-300 p-3">Most loans approved</td>
                          <td className="border border-gray-300 p-3">Average rates</td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">740-799</td>
                          <td className="border border-gray-300 p-3">Very Good</td>
                          <td className="border border-gray-300 p-3">Easy approval</td>
                          <td className="border border-gray-300 p-3">Below average</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">800-850</td>
                          <td className="border border-gray-300 p-3">Exceptional</td>
                          <td className="border border-gray-300 p-3">Best terms</td>
                          <td className="border border-gray-300 p-3">Lowest rates</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Payment History Optimization</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Payment history is the most important factor, accounting for 35% of 
                    your score. Even small improvements here can significantly impact your rating.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Payment Impact Timeline</h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between">
                          <span>30 days late:</span>
                          <span className="font-semibold text-orange-600">17-83 point drop</span>
                        </div>
                        <div className="flex justify-between">
                          <span>60 days late:</span>
                          <span className="font-semibold text-orange-700">27-103 point drop</span>
                        </div>
                        <div className="flex justify-between">
                          <span>90 days late:</span>
                          <span className="font-semibold text-red-600">37-123 point drop</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Account in collections:</span>
                          <span className="font-semibold text-red-700">50-150 point drop</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Credit Utilization Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Credit utilization is the second most important factor. Keeping balances 
                    low relative to credit limits can quickly improve your score.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Utilization Guidelines</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• Keep total utilization under 30%</li>
                        <li>• Aim for under 10% for excellent scores</li>
                        <li>• Pay down high-balance cards first</li>
                        <li>• Consider multiple payments per month</li>
                        <li>• Request credit limit increases</li>
                        <li>• Don't close old credit cards</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Quick Improvement Tips</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• Pay before statement closing date</li>
                        <li>• Spread balances across multiple cards</li>
                        <li>• Use 0% balance transfer offers</li>
                        <li>• Set up automatic payments</li>
                        <li>• Monitor utilization monthly</li>
                        <li>• Use credit monitoring alerts</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Credit History Length</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The length of your credit history accounts for 15% of your score. 
                    This factor rewards long-standing credit relationships and responsible management.
                  </p>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-emerald-800 mb-3">History Components:</h4>
                    <div className="space-y-3 text-emerald-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-emerald-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Age of Oldest Account</div>
                          <div className="text-sm">Keep your first credit card active</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-emerald-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Average Account Age</div>
                          <div className="text-sm">Be selective about new credit applications</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-emerald-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Account Usage History</div>
                          <div className="text-sm">Regular activity on older accounts</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Credit Mix and New Credit</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    While these factors account for only 20% combined, they can provide 
                    the edge needed to reach higher score tiers.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-semibold text-purple-700">Credit Mix (10%)</h4>
                      <p className="text-gray-700 text-sm">Having different types of credit (cards, auto loan, mortgage) shows you can manage various credit products</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-700">New Credit (10%)</h4>
                      <p className="text-gray-700 text-sm">Limit new credit applications; each hard inquiry can temporarily lower your score by 5-10 points</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Credit Improvement Timeline</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Quick Wins (1-2 months)</h4>
                      <ul className="text-yellow-700 text-sm space-y-1">
                        <li>• Pay down credit card balances below 30% utilization</li>
                        <li>• Correct errors on credit reports</li>
                        <li>• Pay off small collection accounts</li>
                        <li>• Become authorized user on someone else's account</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-800 mb-2">Medium-term (3-6 months)</h4>
                      <ul className="text-orange-700 text-sm space-y-1">
                        <li>• Establish consistent payment history</li>
                        <li>• Negotiate payment plans for past-due accounts</li>
                        <li>• Apply for secured credit card if needed</li>
                        <li>• Optimize credit utilization to under 10%</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Long-term (6+ months)</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Build length of credit history</li>
                        <li>• Diversify credit mix responsibly</li>
                        <li>• Allow hard inquiries to age off report</li>
                        <li>• Continue perfect payment history</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Credit Score Simulator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our simulator helps you understand how different actions might 
                    affect your credit score and plan improvement strategies.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Simulator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Model payment history improvements</li>
                    <li>Calculate utilization optimization effects</li>
                    <li>Analyze new credit impact</li>
                    <li>Project score changes over time</li>
                    <li>Compare different improvement strategies</li>
                    <li>Factor in credit report errors</li>
                    <li>Estimate loan qualification improvements</li>
                  </ul>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-emerald-800 mb-3">Improvement Example:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-emerald-700">
                      <div>
                        <h5 className="font-semibold mb-2">Current Situation:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Credit Score: 620 (Fair)</li>
                          <li>• Credit Utilization: 65%</li>
                          <li>• 1 late payment (30 days)</li>
                          <li>• 3 credit cards, $15,000 limits</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">After Improvements:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Projected Score: 720 (Good)</li>
                          <li>• Credit Utilization: 15%</li>
                          <li>• 6 months perfect payments</li>
                          <li>• <strong>+100 point improvement</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Action Planning</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use simulator results to create a prioritized action plan that 
                    focuses on factors with the highest impact on your specific situation.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-emerald-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-emerald-800 mb-1">Target</h4>
                      <div className="text-2xl font-bold text-emerald-800">740+</div>
                      <p className="text-emerald-700 text-xs">Very good credit</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Utilization</h4>
                      <div className="text-2xl font-bold text-green-800">&lt;10%</div>
                      <p className="text-green-700 text-xs">Optimal ratio</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Timeline</h4>
                      <div className="text-2xl font-bold text-blue-800">6-12</div>
                      <p className="text-blue-700 text-xs">Months to improve</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Score Factors</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Payment History</span>
                    <span className="font-semibold">35%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Credit Utilization</span>
                    <span className="font-semibold">30%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Credit History</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Other Factors</span>
                    <span className="font-semibold">20%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Quick Tip</h3>
                <p className="text-sm mb-4">
                  Lowering credit utilization from 50% to 10% can improve your score by 50+ points.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm opacity-90">Point improvement</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/debt-payoff-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Debt Payoff Calculator
                  </a>
                  <a href="/loan-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Loan Calculator
                  </a>
                  <a href="/credit-card-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Credit Card Calculator
                  </a>
                  <a href="/budget-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Budget Calculator
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
