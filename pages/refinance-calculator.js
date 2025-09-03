import Head from 'next/head';
import dynamic from 'next/dynamic';

const RefinanceCalculator = dynamic(() => import('@/pages/RefinanceCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div></div>
});

export default function RefinanceCalculatorPage() {
  return (
    <>
      <Head>
        <title>Mortgage Refinance Calculator - Compare Rates & Savings | DollarMento</title>
        <meta name="description" content="Free mortgage refinance calculator. Compare current rates, calculate potential savings, and determine if refinancing makes financial sense for your situation." />
        <meta name="keywords" content="mortgage refinance calculator, refinance calculator, mortgage rates, refinancing savings, should i refinance, refinance break even" />
        <meta property="og:title" content="Mortgage Refinance Calculator - Compare Rates & Savings" />
        <meta property="og:description" content="Calculate refinancing savings and determine if refinancing your mortgage makes financial sense with our comprehensive calculator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/refinance-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mortgage Refinance Calculator" />
        <meta name="twitter:description" content="Free calculator to analyze refinancing opportunities and potential savings on your mortgage." />
        <link rel="canonical" href="https://dollarmento.com/refinance-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mortgage Refinance Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate potential savings from refinancing your mortgage. Compare rates, analyze costs, 
              and determine if refinancing makes financial sense for your situation.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <RefinanceCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Mortgage Refinancing</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Mortgage refinancing can be a powerful financial tool to reduce monthly payments, 
                    shorten loan terms, or access home equity. Understanding when and how to refinance 
                    can save you thousands of dollars over the life of your loan.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is Mortgage Refinancing?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Refinancing replaces your existing mortgage with a new loan, typically with better 
                    terms, lower interest rates, or different loan structure. The new loan pays off 
                    your current mortgage, and you begin making payments on the new loan.
                  </p>

                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-cyan-800 mb-3">Types of Refinancing:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-cyan-700">
                      <div>
                        <h5 className="font-semibold mb-2">Rate & Term Refinance:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Lower interest rate</li>
                          <li>• Change loan term</li>
                          <li>• Same loan amount</li>
                          <li>• Focus on payment reduction</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Cash-Out Refinance:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Larger loan amount</li>
                          <li>• Access home equity</li>
                          <li>• Cash at closing</li>
                          <li>• Multiple financial goals</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">When to Consider Refinancing</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Several factors make refinancing attractive. Understanding these scenarios helps 
                    you identify optimal timing for your refinancing decision.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Good Times to Refinance</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• Interest rates drop 0.5%+ below current rate</li>
                        <li>• Credit score improved significantly</li>
                        <li>• Want to eliminate PMI</li>
                        <li>• Switch from ARM to fixed rate</li>
                        <li>• Need to access home equity</li>
                        <li>• Want to shorten loan term</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="font-bold text-red-800 mb-3">When NOT to Refinance</h4>
                      <ul className="text-red-700 text-sm space-y-2">
                        <li>• Planning to move within 2-3 years</li>
                        <li>• Already have very low rate</li>
                        <li>• Closing costs exceed savings</li>
                        <li>• Credit score has declined</li>
                        <li>• Home value has dropped significantly</li>
                        <li>• Late payments in recent history</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Refinancing Costs & Break-Even Analysis</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Refinancing involves closing costs similar to your original mortgage. Understanding 
                    these costs and calculating your break-even point is crucial for making an informed decision.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Cost Category</th>
                          <th className="border border-gray-300 p-3 text-left">Typical Range</th>
                          <th className="border border-gray-300 p-3 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3">Origination Fee</td>
                          <td className="border border-gray-300 p-3">0.5-1% of loan</td>
                          <td className="border border-gray-300 p-3">Lender processing fee</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">Appraisal</td>
                          <td className="border border-gray-300 p-3">$400-$800</td>
                          <td className="border border-gray-300 p-3">Current home value assessment</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3">Title Insurance</td>
                          <td className="border border-gray-300 p-3">$1,000-$2,500</td>
                          <td className="border border-gray-300 p-3">Protects against title issues</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">Credit Report</td>
                          <td className="border border-gray-300 p-3">$25-$100</td>
                          <td className="border border-gray-300 p-3">Lender credit check</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3">Recording Fees</td>
                          <td className="border border-gray-300 p-3">$100-$500</td>
                          <td className="border border-gray-300 p-3">Government recording costs</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cash-Out Refinancing Strategy</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Cash-out refinancing allows you to borrow against your home equity for various 
                    financial goals. Understanding the implications helps you use this tool effectively.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Good Uses for Cash-Out</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Home improvements that add value</li>
                        <li>• Pay off high-interest debt</li>
                        <li>• Investment property down payment</li>
                        <li>• Education expenses</li>
                        <li>• Emergency fund establishment</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Risks to Consider</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Higher loan balance and payments</li>
                        <li>• Risk of underwater mortgage if values drop</li>
                        <li>• Reduced home equity</li>
                        <li>• Potential for foreclosure if payments missed</li>
                        <li>• Tax implications for certain uses</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Refinancing Process Timeline</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding the refinancing timeline helps you plan accordingly and ensures 
                    a smooth process from application to closing.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Typical Refinancing Timeline:</h4>
                    <div className="space-y-3 text-blue-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Pre-approval (1-3 days)</div>
                          <div className="text-sm">Rate shopping, application submission, initial approval</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Documentation (1 week)</div>
                          <div className="text-sm">Income verification, asset documentation, application review</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Processing (2-3 weeks)</div>
                          <div className="text-sm">Appraisal, underwriting, loan approval</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Closing (1-2 days)</div>
                          <div className="text-sm">Final documents, funding, loan begins</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comparing Refinancing Options</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different loan programs offer various benefits. Understanding your options helps 
                    you choose the best refinancing solution for your financial goals.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Conventional Refinance</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Best rates for good credit</li>
                        <li>• 20% equity avoids PMI</li>
                        <li>• Flexible loan amounts</li>
                        <li>• Standard documentation</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">FHA Streamline</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Simplified documentation</li>
                        <li>• No appraisal required</li>
                        <li>• Lower credit requirements</li>
                        <li>• Existing FHA loans only</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">VA Interest Rate Reduction</h4>
                      <ul className="text-purple-700 text-sm space-y-1">
                        <li>• No appraisal needed</li>
                        <li>• Minimal documentation</li>
                        <li>• No out-of-pocket costs</li>
                        <li>• VA loan holders only</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Refinancing Mistakes</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Focusing Only on Interest Rate</h4>
                      <p className="text-gray-700 text-sm">Ignoring closing costs and break-even analysis can make "good" rates unprofitable.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Extending Loan Term Unnecessarily</h4>
                      <p className="text-gray-700 text-sm">Lower payments might mean much more interest paid over the loan's life.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Not Shopping Multiple Lenders</h4>
                      <p className="text-gray-700 text-sm">Rates and fees vary significantly between lenders; shop around for best terms.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Refinancing Too Early or Often</h4>
                      <p className="text-gray-700 text-sm">Multiple refinances can cost more than they save; plan for long-term benefits.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Refinance Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our refinance calculator helps you analyze potential savings, compare different 
                    scenarios, and determine if refinancing makes financial sense for your situation.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Compare current loan vs. new loan terms</li>
                    <li>Calculate monthly payment savings</li>
                    <li>Determine break-even point</li>
                    <li>Factor in all closing costs</li>
                    <li>Show total interest savings over loan life</li>
                    <li>Compare different loan terms and rates</li>
                    <li>Analyze cash-out refinancing scenarios</li>
                  </ul>

                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-cyan-800 mb-3">Example Refinancing Scenario:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-cyan-700">
                      <div>
                        <h5 className="font-semibold mb-2">Current Loan:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Balance: $350,000</li>
                          <li>• Rate: 6.5%</li>
                          <li>• Payment: $2,212</li>
                          <li>• Years left: 25</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">New Loan:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Balance: $350,000</li>
                          <li>• Rate: 5.5%</li>
                          <li>• Payment: $1,987</li>
                          <li>• Term: 30 years</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-white rounded border text-cyan-800">
                      <strong>Result:</strong> Save $225/month, break-even in 18 months
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Making the Refinancing Decision</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use the calculator results along with your personal financial situation to 
                    make an informed refinancing decision that aligns with your long-term goals.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Good Decision</h4>
                      <div className="text-2xl font-bold text-green-800">18 months</div>
                      <p className="text-green-700 text-xs">Break-even point</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-yellow-800 mb-1">Consider Carefully</h4>
                      <div className="text-2xl font-bold text-yellow-800">24-36 months</div>
                      <p className="text-yellow-700 text-xs">Break-even point</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-red-800 mb-1">Likely Not Worth It</h4>
                      <div className="text-2xl font-bold text-red-800">36+ months</div>
                      <p className="text-red-700 text-xs">Break-even point</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Refinancing Quick Facts</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Typical Closing Costs</span>
                    <span className="font-semibold">2-5% of loan</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Good Break-even</span>
                    <span className="font-semibold">Under 24 months</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Rate Improvement</span>
                    <span className="font-semibold">0.5%+ lower</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Time</span>
                    <span className="font-semibold">30-45 days</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Potential Savings</h3>
                <p className="text-sm mb-4">
                  Refinancing from 6.5% to 5.5% saves $225/month on a $350K loan.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">$225</div>
                  <div className="text-sm opacity-90">Monthly savings</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/mortgage-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Mortgage Calculator
                  </a>
                  <a href="/mortgage-comparison-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Mortgage Comparison Calculator
                  </a>
                  <a href="/home-equity-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Home Equity Calculator
                  </a>
                  <a href="/amortization-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Amortization Calculator
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
