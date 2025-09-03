import Head from 'next/head';
import dynamic from 'next/dynamic';

const LoanPrepaymentCalculator = dynamic(() => import('@/pages/LoanPrepaymentCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div></div>
});

export default function LoanPrepaymentCalculatorPage() {
  return (
    <>
      <Head>
        <title>Loan Prepayment Calculator - Early Payment Savings Tool | DollarMento</title>
        <meta name="description" content="Free loan prepayment calculator. Calculate savings from extra payments, early loan payoff strategies, and optimize your loan repayment plan." />
        <meta name="keywords" content="loan prepayment calculator, extra payment calculator, early loan payoff calculator, mortgage prepayment calculator, loan payoff calculator" />
        <meta property="og:title" content="Loan Prepayment Calculator - Early Payment Savings Tool" />
        <meta property="og:description" content="Calculate loan prepayment savings and optimize your early payment strategy with our comprehensive loan prepayment calculator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/loan-prepayment-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Loan Prepayment Calculator" />
        <meta name="twitter:description" content="Free calculator to analyze loan prepayment strategies and calculate savings from extra payments." />
        <link rel="canonical" href="https://dollarmento.com/loan-prepayment-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loan Prepayment Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate the savings from making extra loan payments. 
              Optimize your prepayment strategy and determine the best approach to pay off loans early.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <LoanPrepaymentCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Loan Prepayment</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Loan prepayment involves making extra payments toward your loan principal to 
                    reduce the total interest paid and shorten the loan term. Understanding prepayment 
                    strategies can save you thousands of dollars and provide financial freedom sooner.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">How Loan Prepayment Works</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    When you make extra payments toward your loan principal, you reduce the outstanding 
                    balance on which future interest is calculated. This creates a compounding effect 
                    that accelerates payoff and reduces total interest costs.
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Prepayment Benefits:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700">
                      <div>
                        <h5 className="font-semibold mb-2">Financial Benefits:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Reduced total interest payments</li>
                          <li>• Shorter loan term</li>
                          <li>• Improved cash flow after payoff</li>
                          <li>• Guaranteed "return" equal to interest rate</li>
                          <li>• Increased home equity (for mortgages)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Psychological Benefits:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Reduced financial stress</li>
                          <li>• Sense of accomplishment</li>
                          <li>• Greater financial security</li>
                          <li>• Freedom from debt obligations</li>
                          <li>• Enhanced borrowing capacity</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Types of Prepayment Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different prepayment approaches offer various benefits depending on your financial 
                    situation, loan terms, and personal preferences. Choose the strategy that best 
                    fits your circumstances.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Strategy</th>
                          <th className="border border-gray-300 p-3 text-left">Description</th>
                          <th className="border border-gray-300 p-3 text-left">Best For</th>
                          <th className="border border-gray-300 p-3 text-left">Impact</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Extra Monthly Payment</td>
                          <td className="border border-gray-300 p-3">Add fixed amount each month</td>
                          <td className="border border-gray-300 p-3">Consistent income</td>
                          <td className="border border-gray-300 p-3">Steady progress</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Bi-weekly Payments</td>
                          <td className="border border-gray-300 p-3">Pay half monthly amount every 2 weeks</td>
                          <td className="border border-gray-300 p-3">Bi-weekly pay schedule</td>
                          <td className="border border-gray-300 p-3">13 payments per year</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Lump Sum Payment</td>
                          <td className="border border-gray-300 p-3">Large one-time principal payment</td>
                          <td className="border border-gray-300 p-3">Windfalls, bonuses</td>
                          <td className="border border-gray-300 p-3">Immediate interest reduction</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Graduated Payments</td>
                          <td className="border border-gray-300 p-3">Increase extra payments over time</td>
                          <td className="border border-gray-300 p-3">Rising income expectations</td>
                          <td className="border border-gray-300 p-3">Accelerating payoff</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">Round-Up Payments</td>
                          <td className="border border-gray-300 p-3">Round payment to nearest $50-100</td>
                          <td className="border border-gray-300 p-3">Small budget flexibility</td>
                          <td className="border border-gray-300 p-3">Modest but consistent savings</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">When to Prepay vs. Invest</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The decision between loan prepayment and investing depends on interest rates, 
                    tax implications, investment opportunities, and personal risk tolerance. 
                    Understanding these factors helps optimize your financial strategy.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Favor Loan Prepayment When:</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• High interest rates (above 6-7%)</li>
                        <li>• Non-deductible interest (personal loans)</li>
                        <li>• Risk-averse personality</li>
                        <li>• Desire for guaranteed returns</li>
                        <li>• Approaching retirement</li>
                        <li>• High debt stress levels</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Favor Investing When:</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• Low interest rates (below 4-5%)</li>
                        <li>• Tax-deductible interest (mortgages)</li>
                        <li>• Young investor with long timeline</li>
                        <li>• Employer 401(k) match available</li>
                        <li>• High risk tolerance</li>
                        <li>• Diversification needs</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mortgage Prepayment Considerations</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Mortgage prepayment involves unique considerations including tax deductibility, 
                    opportunity costs, and the impact on overall financial planning strategies.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Tax Implications</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Mortgage interest deduction reduces effective interest rate</li>
                        <li>• Standard deduction changes may eliminate deduction benefit</li>
                        <li>• Calculate after-tax cost of mortgage debt</li>
                        <li>• Consider state and local tax implications</li>
                        <li>• Consult tax professional for complex situations</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Alternative Considerations</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Emergency fund adequacy before prepaying</li>
                        <li>• Retirement savings maximization</li>
                        <li>• High-interest debt elimination first</li>
                        <li>• Investment portfolio diversification</li>
                        <li>• Insurance coverage adequacy</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Prepayment Impact Analysis</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding how different prepayment amounts affect your loan helps you choose 
                    the optimal strategy based on your budget and financial goals.
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Example: $300,000 Mortgage at 5.5%</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-green-100">
                            <th className="border border-green-300 p-2 text-left">Extra Payment</th>
                            <th className="border border-green-300 p-2 text-left">Time Saved</th>
                            <th className="border border-green-300 p-2 text-left">Interest Saved</th>
                            <th className="border border-green-300 p-2 text-left">Total Benefit</th>
                          </tr>
                        </thead>
                        <tbody className="text-green-700">
                          <tr><td className="border border-green-300 p-2">$0</td><td className="border border-green-300 p-2">30 years</td><td className="border border-green-300 p-2">$0</td><td className="border border-green-300 p-2">Baseline</td></tr>
                          <tr><td className="border border-green-300 p-2">$100/month</td><td className="border border-green-300 p-2">5 years</td><td className="border border-green-300 p-2">$62,456</td><td className="border border-green-300 p-2">High ROI</td></tr>
                          <tr><td className="border border-green-300 p-2">$300/month</td><td className="border border-green-300 p-2">10 years</td><td className="border border-green-300 p-2">$128,235</td><td className="border border-green-300 p-2">Excellent savings</td></tr>
                          <tr><td className="border border-green-300 p-2">$500/month</td><td className="border border-green-300 p-2">13 years</td><td className="border border-green-300 p-2">$174,891</td><td className="border border-green-300 p-2">Maximum impact</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Prepayment Timing Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The timing of prepayments can significantly impact their effectiveness. Early 
                    payments provide maximum benefit, while strategic timing can optimize results.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">Optimal Prepayment Timing:</h4>
                    <ul className="text-blue-700 space-y-1 text-sm">
                      <li>• <strong>Early in loan term:</strong> Maximum interest savings potential</li>
                      <li>• <strong>Before interest rate increases:</strong> Lock in savings with fixed rates</li>
                      <li>• <strong>During low investment periods:</strong> When alternative returns are limited</li>
                      <li>• <strong>Tax year optimization:</strong> Coordinate with tax deduction timing</li>
                      <li>• <strong>Life event planning:</strong> Before income changes or major expenses</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Prepayment Mistakes</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Neglecting Emergency Fund</h4>
                      <p className="text-gray-700 text-sm">Using all available cash for prepayment without maintaining adequate emergency reserves.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Ignoring Higher-Rate Debt</h4>
                      <p className="text-gray-700 text-sm">Prepaying low-rate mortgages while carrying high-rate credit card debt.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Missing Employer Match</h4>
                      <p className="text-gray-700 text-sm">Prioritizing loan prepayment over 401(k) contributions with employer matching.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Not Considering Liquidity</h4>
                      <p className="text-gray-700 text-sm">Tying up money in home equity without considering future cash needs.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Loan Prepayment Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our loan prepayment calculator helps you analyze different prepayment strategies 
                    and determine the optimal approach for your specific loan and financial situation.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Calculate interest savings from extra payments</li>
                    <li>Compare different prepayment strategies</li>
                    <li>Model bi-weekly payment schedules</li>
                    <li>Analyze lump sum prepayment effects</li>
                    <li>Factor in tax implications and deductions</li>
                    <li>Project cash flow impact over time</li>
                    <li>Generate optimal prepayment recommendations</li>
                  </ul>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Prepayment Analysis Example:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700">
                      <div>
                        <h5 className="font-semibold mb-2">Loan Details:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Original Loan: $250,000</li>
                          <li>• Interest Rate: 6.5%</li>
                          <li>• Term: 30 years</li>
                          <li>• Monthly Payment: $1,580</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">With $200 Extra Monthly:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• New Payment: $1,780</li>
                          <li>• Time Saved: 8.5 years</li>
                          <li>• Interest Saved: $89,432</li>
                          <li>• <strong>ROI: 6.5% guaranteed</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Strategic Decision Making</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use the calculator to make informed decisions about prepayment strategies 
                    based on your specific financial situation and long-term goals.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Conservative Strategy</h4>
                      <div className="text-2xl font-bold text-blue-800">$100</div>
                      <p className="text-blue-700 text-xs">Extra monthly payment</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Balanced Strategy</h4>
                      <div className="text-2xl font-bold text-green-800">$300</div>
                      <p className="text-green-700 text-xs">Extra monthly payment</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-purple-800 mb-1">Aggressive Strategy</h4>
                      <div className="text-2xl font-bold text-purple-800">$500+</div>
                      <p className="text-purple-700 text-xs">Extra monthly payment</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Prepayment Quick Facts</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Interest Saved</span>
                    <span className="font-semibold">Potentially $50K+</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Time Saved</span>
                    <span className="font-semibold">5-15 years</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Guaranteed Return</span>
                    <span className="font-semibold">= Interest rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Best for High Rates</span>
                    <span className="font-semibold">Above 6%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Prepayment Power</h3>
                <p className="text-sm mb-4">
                  An extra $200/month can save over $89,000 in interest on a typical mortgage.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">$89K</div>
                  <div className="text-sm opacity-90">Potential savings</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/mortgage-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Mortgage Calculator
                  </a>
                  <a href="/debt-payoff-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Debt Payoff Calculator
                  </a>
                  <a href="/refinance-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Refinance Calculator
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
