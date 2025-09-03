import Head from 'next/head';
import dynamic from 'next/dynamic';

const RentVsBuyCalculator = dynamic(() => import('@/components/calculators/RentVsBuyCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
});

export default function RentVsBuyCalculatorPage() {
  return (
    <>
      <Head>
        <title>Rent vs Buy Calculator - Housing Decision Calculator | DollarMento</title>
        <meta name="description" content="Free rent vs buy calculator. Compare the costs of renting vs buying a home. Make informed housing decisions with detailed financial analysis." />
        <meta name="keywords" content="rent vs buy calculator, rent or buy calculator, housing decision calculator, home buying calculator, renting vs buying" />
        <meta property="og:title" content="Rent vs Buy Calculator - Housing Decision Calculator" />
        <meta property="og:description" content="Compare renting vs buying costs with our comprehensive housing decision calculator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/rent-vs-buy-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rent vs Buy Calculator" />
        <meta name="twitter:description" content="Free calculator to compare the total costs of renting vs buying a home." />
        <link rel="canonical" href="https://dollarmento.com/rent-vs-buy-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Rent vs Buy Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare the total costs of renting vs buying a home. Make informed 
              housing decisions with comprehensive financial analysis and projections.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <RentVsBuyCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Rent vs Buy Decisions</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The decision to rent or buy a home is one of the most significant 
                    financial choices you'll make. Understanding the complete cost 
                    structure and long-term implications helps ensure the best decision.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Financial Factors to Consider</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Beyond monthly payments, numerous financial factors affect the 
                    rent vs buy decision. Consider both immediate and long-term costs.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Buying Costs:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
                      <div>
                        <h5 className="font-semibold mb-2">Upfront Costs:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Down payment (3-20% of price)</li>
                          <li>• Closing costs (2-5% of price)</li>
                          <li>• Home inspection ($300-500)</li>
                          <li>• Appraisal fees ($300-600)</li>
                          <li>• Moving expenses</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Ongoing Costs:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Mortgage payments (P&I)</li>
                          <li>• Property taxes</li>
                          <li>• Homeowners insurance</li>
                          <li>• PMI (if &lt; 20% down)</li>
                          <li>• Maintenance and repairs</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Renting Costs:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700">
                      <div>
                        <h5 className="font-semibold mb-2">Upfront Costs:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Security deposit (1-2 months rent)</li>
                          <li>• First month's rent</li>
                          <li>• Last month's rent (sometimes)</li>
                          <li>• Application fees</li>
                          <li>• Moving expenses</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Ongoing Costs:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Monthly rent payments</li>
                          <li>• Renters insurance</li>
                          <li>• Utilities (if not included)</li>
                          <li>• Parking fees (if applicable)</li>
                          <li>• Pet fees/deposits</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Break-Even Analysis</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The break-even point shows how long you need to stay in a home 
                    for buying to become more cost-effective than renting.
                  </p>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Break-Even Calculation:</h4>
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="text-center font-mono text-lg mb-4">
                        Break-Even = Upfront Costs ÷ (Monthly Rent - Monthly Own)
                      </div>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div>Example: $25,000 upfront costs ÷ ($200 monthly savings) = 125 months (10.4 years)</div>
                        <div className="text-xs">*Simplified calculation for illustration</div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Time Period</th>
                          <th className="border border-gray-300 p-3 text-left">Typical Outcome</th>
                          <th className="border border-gray-300 p-3 text-left">Recommendation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-red-50">
                          <td className="border border-gray-300 p-3 font-semibold">&lt; 2 years</td>
                          <td className="border border-gray-300 p-3">Renting usually cheaper</td>
                          <td className="border border-gray-300 p-3">Consider renting</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">2-5 years</td>
                          <td className="border border-gray-300 p-3">Depends on market conditions</td>
                          <td className="border border-gray-300 p-3">Analyze carefully</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">5+ years</td>
                          <td className="border border-gray-300 p-3">Buying often advantageous</td>
                          <td className="border border-gray-300 p-3">Consider buying</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Opportunity Cost Analysis</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Money used for down payment and closing costs could be invested 
                    elsewhere. Consider the opportunity cost of tying up capital in real estate.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Investment Opportunity Example</h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between">
                          <span>Down payment + closing costs:</span>
                          <span className="font-semibold">$60,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>7% annual stock market return:</span>
                          <span className="font-semibold">$4,200/year</span>
                        </div>
                        <div className="flex justify-between">
                          <span>10-year investment value:</span>
                          <span className="font-semibold text-green-600">$118,000</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Non-Financial Considerations</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    While financial analysis is crucial, non-financial factors 
                    significantly impact quality of life and satisfaction.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Benefits of Buying</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• Build equity and long-term wealth</li>
                        <li>• Stability and control over living space</li>
                        <li>• Freedom to renovate and customize</li>
                        <li>• Potential tax benefits</li>
                        <li>• Protection against rent increases</li>
                        <li>• Sense of community and belonging</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Benefits of Renting</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• Flexibility to move easily</li>
                        <li>• No maintenance responsibilities</li>
                        <li>• Lower upfront costs</li>
                        <li>• Access to amenities (gym, pool)</li>
                        <li>• Predictable monthly expenses</li>
                        <li>• No risk of property value decline</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Market Conditions Impact</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Local market conditions significantly affect the rent vs buy decision. 
                    Consider current trends and future projections.
                  </p>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-indigo-800 mb-3">Market Factors:</h4>
                    <div className="space-y-3 text-indigo-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Price-to-Rent Ratio</div>
                          <div className="text-sm">Higher ratios favor renting, lower ratios favor buying</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Interest Rates</div>
                          <div className="text-sm">Lower rates make buying more attractive</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Appreciation Trends</div>
                          <div className="text-sm">Strong appreciation favors buying, weak favors renting</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Inventory Levels</div>
                          <div className="text-sm">Low inventory increases prices, favoring renting</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Financial Readiness Assessment</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h4 className="font-semibold text-yellow-700">Emergency Fund</h4>
                      <p className="text-gray-700 text-sm">Maintain 3-6 months expenses after down payment</p>
                    </div>
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h4 className="font-semibold text-yellow-700">Debt-to-Income Ratio</h4>
                      <p className="text-gray-700 text-sm">Total monthly debt payments should be &lt; 36% of income</p>
                    </div>
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h4 className="font-semibold text-yellow-700">Credit Score</h4>
                      <p className="text-gray-700 text-sm">Higher scores (740+) qualify for better interest rates</p>
                    </div>
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h4 className="font-semibold text-yellow-700">Job Stability</h4>
                      <p className="text-gray-700 text-sm">Stable employment history and income prospects</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Rent vs Buy Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our calculator provides comprehensive analysis to help you make 
                    an informed housing decision based on your specific situation.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Compare total costs over multiple time periods</li>
                    <li>Factor in property appreciation and rent increases</li>
                    <li>Include tax benefits and opportunity costs</li>
                    <li>Calculate break-even timeline</li>
                    <li>Account for maintenance and repair costs</li>
                    <li>Consider different down payment scenarios</li>
                    <li>Analyze various interest rate environments</li>
                  </ul>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Decision Example:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
                      <div>
                        <h5 className="font-semibold mb-2">Scenario:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Home price: $400,000</li>
                          <li>• Monthly rent: $2,500</li>
                          <li>• Down payment: 20%</li>
                          <li>• Time horizon: 7 years</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">7-Year Analysis:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Renting total cost: $210,000</li>
                          <li>• Buying total cost: $195,000</li>
                          <li>• Net savings: $15,000</li>
                          <li>• <strong>Recommendation: Buy</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Decision Framework</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use our calculator results within a broader decision framework 
                    that considers your personal and financial circumstances.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Break-Even</h4>
                      <div className="text-2xl font-bold text-green-800">5-7</div>
                      <p className="text-green-700 text-xs">Years typical</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Down Payment</h4>
                      <div className="text-2xl font-bold text-blue-800">20%</div>
                      <p className="text-blue-700 text-xs">Avoids PMI</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-purple-800 mb-1">Price-to-Rent</h4>
                      <div className="text-2xl font-bold text-purple-800">15-20</div>
                      <p className="text-purple-700 text-xs">Reasonable ratio</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Decision Factors</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Stay Duration</span>
                    <span className="font-semibold">5+ years to buy</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Price-to-Rent</span>
                    <span className="font-semibold">&lt; 20 favors buy</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Down Payment</span>
                    <span className="font-semibold">20% ideal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency Fund</span>
                    <span className="font-semibold">6 months</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Key Rule</h3>
                <p className="text-sm mb-4">
                  If you plan to stay less than 5 years, renting is usually better.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">5 Years</div>
                  <div className="text-sm opacity-90">Minimum timeline</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/mortgage-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Mortgage Calculator
                  </a>
                  <a href="/home-down-payment-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Down Payment Calculator
                  </a>
                  <a href="/home-affordability-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Affordability Calculator
                  </a>
                  <a href="/refinance-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Refinance Calculator
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
