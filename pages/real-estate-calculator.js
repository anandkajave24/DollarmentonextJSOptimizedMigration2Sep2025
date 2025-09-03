import Head from 'next/head';
import dynamic from 'next/dynamic';

const RealEstateCalculator = dynamic(() => import('@/pages/RealEstateCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div></div>
});

export default function RealEstateCalculatorPage() {
  return (
    <>
      <Head>
        <title>Real Estate Investment Calculator - Property ROI & Cash Flow Calculator | DollarMento</title>
        <meta name="description" content="Free real estate calculator. Calculate property ROI, cash flow, cap rates, and investment returns. Make informed real estate investment decisions." />
        <meta name="keywords" content="real estate calculator, property investment calculator, roi calculator, cash flow calculator, cap rate calculator, rental property calculator" />
        <meta property="og:title" content="Real Estate Investment Calculator - Property ROI & Cash Flow Calculator" />
        <meta property="og:description" content="Calculate real estate investment returns with our comprehensive property analysis calculator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/real-estate-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Real Estate Investment Calculator" />
        <meta name="twitter:description" content="Free calculator to analyze real estate investments and calculate property returns." />
        <link rel="canonical" href="https://dollarmento.com/real-estate-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Real Estate Investment Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate property ROI, cash flow, cap rates, and investment returns. 
              Make informed real estate investment decisions with comprehensive property analysis.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <RealEstateCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Real Estate Investment Analysis</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Real estate investment analysis involves evaluating properties to determine 
                    their potential for generating profit and appreciation. Understanding key 
                    metrics helps investors make informed decisions and maximize returns.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Real Estate Investment Metrics</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Successful real estate investing relies on understanding various financial 
                    metrics that measure profitability, risk, and potential returns.
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Essential Metrics:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700">
                      <div>
                        <h5 className="font-semibold mb-2">Profitability Metrics:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Cash-on-Cash Return</li>
                          <li>• Capitalization Rate (Cap Rate)</li>
                          <li>• Return on Investment (ROI)</li>
                          <li>• Net Present Value (NPV)</li>
                          <li>• Internal Rate of Return (IRR)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Cash Flow Metrics:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Gross Rental Yield</li>
                          <li>• Net Rental Yield</li>
                          <li>• Debt Service Coverage Ratio</li>
                          <li>• Gross Rent Multiplier (GRM)</li>
                          <li>• Price-to-Rent Ratio</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Capitalization Rate (Cap Rate)</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Cap rate is one of the most important metrics for evaluating real estate 
                    investments. It measures the rate of return on investment based on the 
                    property's net operating income.
                  </p>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Cap Rate Calculation:</h4>
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="text-center font-mono text-lg">
                        Cap Rate = Net Operating Income ÷ Property Value
                      </div>
                      <div className="mt-4 text-sm text-gray-600">
                        <div>Example: $12,000 NOI ÷ $200,000 value = 6% cap rate</div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Cap Rate Range</th>
                          <th className="border border-gray-300 p-3 text-left">Risk Level</th>
                          <th className="border border-gray-300 p-3 text-left">Market Type</th>
                          <th className="border border-gray-300 p-3 text-left">Characteristics</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-red-50">
                          <td className="border border-gray-300 p-3 font-semibold">3-5%</td>
                          <td className="border border-gray-300 p-3">Low Risk</td>
                          <td className="border border-gray-300 p-3">Prime Markets</td>
                          <td className="border border-gray-300 p-3">Stable, high-demand areas</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">6-8%</td>
                          <td className="border border-gray-300 p-3">Moderate Risk</td>
                          <td className="border border-gray-300 p-3">Secondary Markets</td>
                          <td className="border border-gray-300 p-3">Growing areas, good fundamentals</td>
                        </tr>
                        <tr className="bg-orange-50">
                          <td className="border border-gray-300 p-3 font-semibold">9-12%</td>
                          <td className="border border-gray-300 p-3">Higher Risk</td>
                          <td className="border border-gray-300 p-3">Emerging Markets</td>
                          <td className="border border-gray-300 p-3">Developing areas, higher vacancy</td>
                        </tr>
                        <tr className="bg-red-100">
                          <td className="border border-gray-300 p-3 font-semibold">12%+</td>
                          <td className="border border-gray-300 p-3">High Risk</td>
                          <td className="border border-gray-300 p-3">Distressed Markets</td>
                          <td className="border border-gray-300 p-3">Economic challenges, high turnover</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cash Flow Analysis</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Cash flow analysis determines how much money a property generates 
                    monthly after all expenses. Positive cash flow is essential for 
                    sustainable real estate investments.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Monthly Cash Flow Calculation</h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between border-b pb-1">
                          <span>Gross Rental Income</span>
                          <span className="font-semibold">$2,500</span>
                        </div>
                        <div className="flex justify-between text-red-600">
                          <span>- Operating Expenses</span>
                          <span>($800)</span>
                        </div>
                        <div className="flex justify-between text-red-600">
                          <span>- Mortgage Payment</span>
                          <span>($1,200)</span>
                        </div>
                        <div className="flex justify-between border-t pt-1 font-bold text-green-600">
                          <span>= Net Cash Flow</span>
                          <span>$500</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Operating Expenses Breakdown</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding all operating expenses is crucial for accurate investment 
                    analysis. Many new investors underestimate these costs.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Fixed Expenses</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• Property taxes (1-3% of value annually)</li>
                        <li>• Insurance ($500-2,000 annually)</li>
                        <li>• HOA fees (if applicable)</li>
                        <li>• Property management (8-12% of rent)</li>
                        <li>• Licensing and permits</li>
                        <li>• Legal and accounting fees</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h4 className="font-bold text-orange-800 mb-3">Variable Expenses</h4>
                      <ul className="text-orange-700 text-sm space-y-2">
                        <li>• Maintenance and repairs (1-3% of value)</li>
                        <li>• Vacancy allowance (5-10% of rent)</li>
                        <li>• Utilities (if landlord-paid)</li>
                        <li>• Marketing and advertising</li>
                        <li>• Capital improvements reserve</li>
                        <li>• Turnover costs</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Return on Investment (ROI) Calculations</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different ROI calculations provide insights into various aspects 
                    of investment performance and help compare opportunities.
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">ROI Calculation Types:</h4>
                    <div className="space-y-3 text-green-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Cash-on-Cash Return</div>
                          <div className="text-sm">Annual cash flow ÷ Initial cash invested</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Total Return</div>
                          <div className="text-sm">Cash flow + appreciation ÷ Initial investment</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Annualized Return</div>
                          <div className="text-sm">Total return adjusted for time period</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Return on Equity</div>
                          <div className="text-sm">Net operating income ÷ Current equity</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Financing Impact on Returns</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Leverage through financing can amplify returns but also increases 
                    risk. Understanding how financing affects investment metrics is crucial.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-semibold text-purple-700">Positive Leverage</h4>
                      <p className="text-gray-700 text-sm">When property cap rate exceeds mortgage rate, financing increases returns</p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-semibold text-purple-700">Negative Leverage</h4>
                      <p className="text-gray-700 text-sm">When mortgage rate exceeds cap rate, financing reduces returns</p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-semibold text-purple-700">Debt Service Coverage</h4>
                      <p className="text-gray-700 text-sm">NOI should be at least 1.25x mortgage payment for safety</p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-semibold text-purple-700">Loan-to-Value Ratio</h4>
                      <p className="text-gray-700 text-sm">Lower LTV provides more equity buffer and better loan terms</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Market Analysis Factors</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Economic Indicators</h4>
                      <ul className="text-yellow-700 text-sm space-y-1">
                        <li>• Job growth and unemployment rates</li>
                        <li>• Population growth and demographics</li>
                        <li>• Income levels and economic diversity</li>
                        <li>• Infrastructure development and transportation</li>
                        <li>• Supply and demand dynamics</li>
                      </ul>
                    </div>
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                      <h4 className="font-semibold text-indigo-800 mb-2">Property-Specific Factors</h4>
                      <ul className="text-indigo-700 text-sm space-y-1">
                        <li>• Location and neighborhood quality</li>
                        <li>• Property condition and age</li>
                        <li>• Rental demand and competition</li>
                        <li>• Future development plans</li>
                        <li>• Zoning and regulatory environment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Investment Strategy Applications</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our real estate calculator supports various investment strategies 
                    by providing comprehensive analysis tools for different approaches.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Investment Strategies</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Buy and hold for long-term appreciation and cash flow</li>
                    <li>Fix and flip for short-term capital gains</li>
                    <li>BRRRR strategy (Buy, Rehab, Rent, Refinance, Repeat)</li>
                    <li>Commercial real estate investment analysis</li>
                    <li>Multi-family property evaluation</li>
                    <li>Vacation rental property assessment</li>
                    <li>Real estate investment trust (REIT) comparison</li>
                  </ul>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Investment Example:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700">
                      <div>
                        <h5 className="font-semibold mb-2">Property Details:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Purchase Price: $250,000</li>
                          <li>• Down Payment: $50,000 (20%)</li>
                          <li>• Monthly Rent: $2,200</li>
                          <li>• Operating Expenses: $660/month</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Investment Returns:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Cap Rate: 7.4%</li>
                          <li>• Cash-on-Cash: 11.3%</li>
                          <li>• Monthly Cash Flow: $470</li>
                          <li>• <strong>Annual Cash Flow: $5,640</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Risk Assessment</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use the calculator to evaluate risks and ensure investments 
                    align with your risk tolerance and investment goals.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Good Cap Rate</h4>
                      <div className="text-2xl font-bold text-green-800">6-8%</div>
                      <p className="text-green-700 text-xs">Most markets</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Target Cash Flow</h4>
                      <div className="text-2xl font-bold text-blue-800">$200+</div>
                      <p className="text-blue-700 text-xs">Per unit monthly</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-purple-800 mb-1">Min Cash ROI</h4>
                      <div className="text-2xl font-bold text-purple-800">8%</div>
                      <p className="text-purple-700 text-xs">Annual return goal</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Metrics</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Good Cap Rate</span>
                    <span className="font-semibold">6-8%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">1% Rule</span>
                    <span className="font-semibold">Rent ≥ 1% price</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">50% Rule</span>
                    <span className="font-semibold">Expenses = 50% rent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">DSCR Target</span>
                    <span className="font-semibold">1.25x minimum</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Investment Rule</h3>
                <p className="text-sm mb-4">
                  The 1% rule: monthly rent should equal at least 1% of purchase price.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">1%</div>
                  <div className="text-sm opacity-90">Minimum rule</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/mortgage-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Mortgage Calculator
                  </a>
                  <a href="/rent-vs-buy-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Rent vs Buy Calculator
                  </a>
                  <a href="/home-down-payment-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Down Payment Calculator
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
