import Head from 'next/head';
import dynamic from 'next/dynamic';

const MortgagePaymentCalculator = dynamic(() => import('@/pages/MortgagePaymentCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div></div>
});

export default function MortgagePaymentCalculatorPage() {
  return (
    <>
      <Head>
        <title>Mortgage Payment Calculator - Monthly Payment Estimator | DollarMento</title>
        <meta name="description" content="Free mortgage payment calculator. Calculate monthly mortgage payments, see payment breakdowns, and plan your home buying budget with accurate estimates." />
        <meta name="keywords" content="mortgage payment calculator, monthly payment calculator, mortgage calculator, home loan calculator, mortgage payment estimator" />
        <meta property="og:title" content="Mortgage Payment Calculator - Monthly Payment Estimator" />
        <meta property="og:description" content="Calculate accurate monthly mortgage payments and plan your home purchase with our comprehensive mortgage payment calculator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/mortgage-payment-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mortgage Payment Calculator" />
        <meta name="twitter:description" content="Free calculator to estimate monthly mortgage payments and plan your home buying budget accurately." />
        <link rel="canonical" href="https://dollarmento.com/mortgage-payment-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mortgage Payment Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate accurate monthly mortgage payments including principal, interest, taxes, and insurance. 
              Plan your home buying budget with detailed payment breakdowns.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <MortgagePaymentCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Mortgage Payments</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Understanding mortgage payments is crucial for successful homeownership. Your monthly 
                    mortgage payment typically includes four components: principal, interest, taxes, 
                    and insurance (PITI), each serving a specific purpose in your homeownership journey.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Understanding PITI Components</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    PITI represents the four main components of your monthly mortgage payment. 
                    Understanding each component helps you budget effectively and make informed 
                    decisions about your home purchase.
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">PITI Breakdown:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-red-700">
                      <div>
                        <h5 className="font-semibold mb-2">Principal & Interest:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Principal: Loan balance reduction</li>
                          <li>• Interest: Lender's profit</li>
                          <li>• Fixed with traditional mortgages</li>
                          <li>• Builds equity over time</li>
                          <li>• Largest payment components</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Taxes & Insurance:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Property taxes: Local government</li>
                          <li>• Homeowners insurance: Property protection</li>
                          <li>• PMI: If down payment &lt; 20%</li>
                          <li>• Varies by location and property</li>
                          <li>• Held in escrow account</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mortgage Payment Calculation</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Mortgage payments are calculated using a formula that considers loan amount, 
                    interest rate, and loan term. Understanding this calculation helps you 
                    evaluate different loan scenarios.
                  </p>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Payment Calculation Formula:</h4>
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="text-center font-mono text-lg">
                        M = P × [r(1+r)ⁿ] / [(1+r)ⁿ-1]
                      </div>
                      <div className="mt-4 text-sm text-gray-600">
                        <div>M = Monthly payment</div>
                        <div>P = Principal loan amount</div>
                        <div>r = Monthly interest rate (annual rate ÷ 12)</div>
                        <div>n = Total number of payments (years × 12)</div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Factors Affecting Payment Amount</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Multiple factors influence your monthly mortgage payment. Understanding these 
                    variables helps you optimize your loan terms and monthly budget.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Factor</th>
                          <th className="border border-gray-300 p-3 text-left">Impact on Payment</th>
                          <th className="border border-gray-300 p-3 text-left">Your Control</th>
                          <th className="border border-gray-300 p-3 text-left">Optimization Strategy</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Loan Amount</td>
                          <td className="border border-gray-300 p-3">Higher = Higher payment</td>
                          <td className="border border-gray-300 p-3">High</td>
                          <td className="border border-gray-300 p-3">Larger down payment</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Interest Rate</td>
                          <td className="border border-gray-300 p-3">Higher = Higher payment</td>
                          <td className="border border-gray-300 p-3">Moderate</td>
                          <td className="border border-gray-300 p-3">Improve credit score</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Loan Term</td>
                          <td className="border border-gray-300 p-3">Longer = Lower payment</td>
                          <td className="border border-gray-300 p-3">High</td>
                          <td className="border border-gray-300 p-3">Balance payment vs. interest</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Property Taxes</td>
                          <td className="border border-gray-300 p-3">Higher = Higher payment</td>
                          <td className="border border-gray-300 p-3">Low</td>
                          <td className="border border-gray-300 p-3">Choose location carefully</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">Insurance</td>
                          <td className="border border-gray-300 p-3">Higher = Higher payment</td>
                          <td className="border border-gray-300 p-3">Moderate</td>
                          <td className="border border-gray-300 p-3">Shop for better rates</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Loan Term Comparison</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Choosing between different loan terms involves balancing monthly payment 
                    affordability with total interest costs over the life of the loan.
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">Term Comparison: $300,000 Loan at 6.5%</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-red-100">
                            <th className="border border-red-300 p-2 text-left">Loan Term</th>
                            <th className="border border-red-300 p-2 text-left">Monthly Payment</th>
                            <th className="border border-red-300 p-2 text-left">Total Interest</th>
                            <th className="border border-red-300 p-2 text-left">Monthly Savings</th>
                          </tr>
                        </thead>
                        <tbody className="text-red-700">
                          <tr><td className="border border-red-300 p-2">15 years</td><td className="border border-red-300 p-2">$2,613</td><td className="border border-red-300 p-2">$170,388</td><td className="border border-red-300 p-2">-</td></tr>
                          <tr><td className="border border-red-300 p-2">20 years</td><td className="border border-red-300 p-2">$2,247</td><td className="border border-red-300 p-2">$239,286</td><td className="border border-red-300 p-2">$366</td></tr>
                          <tr><td className="border border-red-300 p-2">30 years</td><td className="border border-red-300 p-2">$1,896</td><td className="border border-red-300 p-2">$382,633</td><td className="border border-red-300 p-2">$717</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Down Payment Impact</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your down payment significantly affects both your monthly payment and 
                    long-term costs. Understanding this impact helps you determine optimal 
                    down payment amounts.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">High Down Payment Benefits (20%+)</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• <strong>No PMI Required:</strong> Saves $100-300+ monthly</li>
                        <li>• <strong>Lower Monthly Payments:</strong> Reduced loan principal</li>
                        <li>• <strong>Better Interest Rates:</strong> Lower lender risk</li>
                        <li>• <strong>Immediate Equity:</strong> Ownership stake from day one</li>
                        <li>• <strong>Stronger Offers:</strong> More competitive in bidding</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Low Down Payment Considerations (3-10%)</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• <strong>PMI Required:</strong> Additional monthly cost</li>
                        <li>• <strong>Higher Payments:</strong> Larger loan amount</li>
                        <li>• <strong>Less Equity:</strong> Slower wealth building</li>
                        <li>• <strong>Market Risk:</strong> Potential underwater mortgage</li>
                        <li>• <strong>Cash Preservation:</strong> Maintains emergency funds</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Payment Optimization Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Several strategies can help you optimize your mortgage payments to achieve 
                    the best balance between affordability and long-term financial benefits.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Payment Reduction Strategies</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• Increase down payment amount</li>
                        <li>• Extend loan term (trade-off: more interest)</li>
                        <li>• Shop for better interest rates</li>
                        <li>• Consider adjustable-rate mortgage</li>
                        <li>• Negotiate lower property taxes</li>
                        <li>• Shop for cheaper homeowners insurance</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Long-term Optimization</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• Make extra principal payments</li>
                        <li>• Choose shorter loan terms</li>
                        <li>• Refinance when rates drop</li>
                        <li>• Remove PMI when eligible</li>
                        <li>• Consider bi-weekly payments</li>
                        <li>• Build equity through improvements</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Payment Mistakes</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Focusing Only on Monthly Payment</h4>
                      <p className="text-gray-700 text-sm">Ignoring total interest costs and loan terms in favor of lowest monthly payment.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Forgetting Additional Costs</h4>
                      <p className="text-gray-700 text-sm">Not accounting for property taxes, insurance, PMI, and maintenance in budgeting.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Overextending Budget</h4>
                      <p className="text-gray-700 text-sm">Choosing maximum payment amount without emergency fund or lifestyle flexibility.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Ignoring Rate Shopping</h4>
                      <p className="text-gray-700 text-sm">Accepting first mortgage offer without comparing rates from multiple lenders.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Mortgage Payment Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our mortgage payment calculator provides comprehensive payment analysis 
                    including PITI breakdown, amortization schedules, and scenario comparisons.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Calculate complete PITI monthly payments</li>
                    <li>Compare different loan terms and rates</li>
                    <li>Analyze down payment impact scenarios</li>
                    <li>Include PMI calculations automatically</li>
                    <li>Factor in property taxes and insurance</li>
                    <li>Generate detailed payment breakdowns</li>
                    <li>Project total interest costs over loan life</li>
                  </ul>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">Payment Calculation Example:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-red-700">
                      <div>
                        <h5 className="font-semibold mb-2">Loan Details:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Home Price: $400,000</li>
                          <li>• Down Payment: $80,000 (20%)</li>
                          <li>• Loan Amount: $320,000</li>
                          <li>• Interest Rate: 6.75%</li>
                          <li>• Term: 30 years</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Monthly Payment Breakdown:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Principal & Interest: $2,076</li>
                          <li>• Property Taxes: $500</li>
                          <li>• Homeowners Insurance: $150</li>
                          <li>• PMI: $0 (20% down)</li>
                          <li>• <strong>Total PITI: $2,726</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Scenario Planning</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use the calculator to explore different scenarios and find the optimal 
                    combination of loan terms that fit your budget and financial goals.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Conservative</h4>
                      <div className="text-2xl font-bold text-blue-800">25%</div>
                      <p className="text-blue-700 text-xs">Of income for housing</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Moderate</h4>
                      <div className="text-2xl font-bold text-green-800">28%</div>
                      <p className="text-green-700 text-xs">Of income for housing</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-red-800 mb-1">Maximum</h4>
                      <div className="text-2xl font-bold text-red-800">31%</div>
                      <p className="text-red-700 text-xs">Of income for housing</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Quick Facts</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Typical PITI Ratio</span>
                    <span className="font-semibold">25-28% of income</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">PMI Cost</span>
                    <span className="font-semibold">0.3-1.5% annually</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Property Tax Rate</span>
                    <span className="font-semibold">0.5-3.0% annually</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insurance Cost</span>
                    <span className="font-semibold">$300-1,200/year</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">PITI Impact</h3>
                <p className="text-sm mb-4">
                  Taxes and insurance can add 30-50% to your principal and interest payment.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">40%</div>
                  <div className="text-sm opacity-90">Additional PITI costs</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/mortgage-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Full Mortgage Calculator
                  </a>
                  <a href="/affordability-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Home Affordability Calculator
                  </a>
                  <a href="/refinance-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Refinance Calculator
                  </a>
                  <a href="/loan-comparison-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Loan Comparison Calculator
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
