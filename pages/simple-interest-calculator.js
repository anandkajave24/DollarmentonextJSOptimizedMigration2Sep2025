import Head from 'next/head';
import dynamic from 'next/dynamic';

const SimpleInterestCalculator = dynamic(() => import('@/pages/SimpleInterestCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div></div>
});

export default function SimpleInterestCalculatorPage() {
  return (
    <>
      <Head>
        <title>Simple Interest Calculator - Calculate Interest Earned | DollarMento</title>
        <meta name="description" content="Free simple interest calculator. Calculate interest earned on savings, loans, and investments with principal, rate, and time calculations." />
        <meta name="keywords" content="simple interest calculator, interest calculator, savings calculator, loan interest calculator, principal interest calculator" />
        <meta property="og:title" content="Simple Interest Calculator - Calculate Interest Earned" />
        <meta property="og:description" content="Calculate simple interest on savings, loans, and investments with our easy-to-use calculator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/simple-interest-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Simple Interest Calculator" />
        <meta name="twitter:description" content="Free calculator to compute simple interest for savings and loans." />
        <link rel="canonical" href="https://dollarmento.com/simple-interest-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple Interest Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate interest earned on savings, loans, and investments. 
              Understand how principal, interest rate, and time affect your returns.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <SimpleInterestCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Simple Interest</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Simple interest is a method of calculating interest that applies only 
                    to the principal amount. Unlike compound interest, it doesn't earn 
                    interest on previously earned interest.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Simple Interest Formula</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The simple interest formula is straightforward and uses three 
                    key variables: principal, rate, and time.
                  </p>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-orange-800 mb-3">Simple Interest Formula:</h4>
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="text-center font-mono text-xl mb-4">
                        I = P × R × T
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <div><strong>I</strong> = Interest earned</div>
                          <div><strong>P</strong> = Principal amount</div>
                        </div>
                        <div>
                          <div><strong>R</strong> = Annual interest rate (decimal)</div>
                          <div><strong>T</strong> = Time period (years)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Calculation Example:</h4>
                    <div className="space-y-2 text-gray-700">
                      <div>Principal (P): $10,000</div>
                      <div>Annual Rate (R): 5% = 0.05</div>
                      <div>Time (T): 3 years</div>
                      <div className="border-t pt-2 mt-2">
                        <div>Interest = $10,000 × 0.05 × 3 = <strong className="text-orange-600">$1,500</strong></div>
                        <div>Total Amount = $10,000 + $1,500 = <strong className="text-green-600">$11,500</strong></div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Simple vs. Compound Interest</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding the difference between simple and compound interest 
                    is crucial for making informed financial decisions.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Aspect</th>
                          <th className="border border-gray-300 p-3 text-left">Simple Interest</th>
                          <th className="border border-gray-300 p-3 text-left">Compound Interest</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-orange-50">
                          <td className="border border-gray-300 p-3 font-semibold">Calculation Base</td>
                          <td className="border border-gray-300 p-3">Principal only</td>
                          <td className="border border-gray-300 p-3">Principal + accumulated interest</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Growth Pattern</td>
                          <td className="border border-gray-300 p-3">Linear growth</td>
                          <td className="border border-gray-300 p-3">Exponential growth</td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Common Uses</td>
                          <td className="border border-gray-300 p-3">Short-term loans, bonds</td>
                          <td className="border border-gray-300 p-3">Savings accounts, investments</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Returns</td>
                          <td className="border border-gray-300 p-3">Lower over time</td>
                          <td className="border border-gray-300 p-3">Higher over time</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Applications</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Simple interest calculations are used in various financial products 
                    and situations where interest doesn't compound.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Lending Products</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• Auto loans (some types)</li>
                        <li>• Personal loans</li>
                        <li>• Short-term business loans</li>
                        <li>• Payday loans</li>
                        <li>• Some student loans</li>
                        <li>• Invoice factoring</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Investment Products</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• Government bonds</li>
                        <li>• Corporate bonds</li>
                        <li>• Treasury bills</li>
                        <li>• Certificates of deposit (some)</li>
                        <li>• Money market instruments</li>
                        <li>• Short-term savings products</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculating Different Variables</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The simple interest formula can be rearranged to solve for any 
                    variable when the other three are known.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Finding Principal (P)</h4>
                      <div className="font-mono text-center text-lg">P = I ÷ (R × T)</div>
                      <p className="text-gray-700 text-sm mt-2">Use when you know the interest earned and want to find the initial investment needed.</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Finding Rate (R)</h4>
                      <div className="font-mono text-center text-lg">R = I ÷ (P × T)</div>
                      <p className="text-gray-700 text-sm mt-2">Use when you know the returns and want to find the required interest rate.</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Finding Time (T)</h4>
                      <div className="font-mono text-center text-lg">T = I ÷ (P × R)</div>
                      <p className="text-gray-700 text-sm mt-2">Use when you know the desired returns and want to find the required time period.</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Time Period Considerations</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Time periods in simple interest calculations must be converted 
                    to match the interest rate frequency for accurate results.
                  </p>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-orange-800 mb-3">Time Conversions:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-orange-700">
                      <div>
                        <h5 className="font-semibold mb-2">Annual Rate Conversions:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Monthly: T = months ÷ 12</li>
                          <li>• Quarterly: T = quarters ÷ 4</li>
                          <li>• Days: T = days ÷ 365</li>
                          <li>• Weeks: T = weeks ÷ 52</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Examples:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• 6 months = 0.5 years</li>
                          <li>• 18 months = 1.5 years</li>
                          <li>• 90 days = 0.247 years</li>
                          <li>• 2 quarters = 0.5 years</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Practical Examples</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-green-700">Savings Example</h4>
                      <p className="text-gray-700 text-sm">$5,000 at 3% for 2 years = $5,000 × 0.03 × 2 = $300 interest</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-700">Loan Example</h4>
                      <p className="text-gray-700 text-sm">$15,000 loan at 8% for 4 years = $15,000 × 0.08 × 4 = $4,800 interest</p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-semibold text-purple-700">Bond Example</h4>
                      <p className="text-gray-700 text-sm">$10,000 bond at 4.5% for 10 years = $10,000 × 0.045 × 10 = $4,500 interest</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">When to Use Simple vs. Compound Interest</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Use Simple Interest For:</h4>
                      <ul className="text-yellow-700 text-sm space-y-1">
                        <li>• Short-term loans and investments</li>
                        <li>• Bonds and fixed-income securities</li>
                        <li>• Quick interest calculations</li>
                        <li>• When interest isn't reinvested</li>
                        <li>• Basic financial planning estimates</li>
                      </ul>
                    </div>
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                      <h4 className="font-semibold text-indigo-800 mb-2">Use Compound Interest For:</h4>
                      <ul className="text-indigo-700 text-sm space-y-1">
                        <li>• Long-term savings and investments</li>
                        <li>• Retirement planning calculations</li>
                        <li>• Savings accounts and CDs</li>
                        <li>• When interest is reinvested</li>
                        <li>• Accurate long-term projections</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Simple Interest Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our calculator makes it easy to compute simple interest for various 
                    financial scenarios and compare different investment options.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Calculate interest earned on principal amounts</li>
                    <li>Find required principal for target returns</li>
                    <li>Determine interest rates for specific goals</li>
                    <li>Calculate time needed to reach targets</li>
                    <li>Compare simple vs. compound interest scenarios</li>
                    <li>Convert between different time periods</li>
                    <li>Generate detailed calculation breakdowns</li>
                  </ul>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-orange-800 mb-3">Calculation Steps:</h4>
                    <ol className="text-orange-700 space-y-2">
                      <li>1. Enter your principal amount</li>
                      <li>2. Input the annual interest rate</li>
                      <li>3. Specify the time period</li>
                      <li>4. View instant results and breakdown</li>
                      <li>5. Compare with compound interest if needed</li>
                    </ol>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Financial Planning Applications</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use simple interest calculations for basic financial planning, 
                    loan comparisons, and quick investment assessments.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-orange-800 mb-1">Formula</h4>
                      <div className="text-2xl font-bold text-orange-800">P×R×T</div>
                      <p className="text-orange-700 text-xs">Simple calculation</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Growth</h4>
                      <div className="text-2xl font-bold text-blue-800">Linear</div>
                      <p className="text-blue-700 text-xs">Constant rate</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Best For</h4>
                      <div className="text-2xl font-bold text-green-800">Short</div>
                      <p className="text-green-700 text-xs">Term investments</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Formula</h3>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-orange-600">I = P × R × T</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">I</span>
                    <span className="font-semibold">Interest</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">P</span>
                    <span className="font-semibold">Principal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">R</span>
                    <span className="font-semibold">Rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">T</span>
                    <span className="font-semibold">Time</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Key Difference</h3>
                <p className="text-sm mb-4">
                  Simple interest is calculated only on the principal, not on accumulated interest.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Linear</div>
                  <div className="text-sm opacity-90">Growth pattern</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/compound-interest-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Compound Interest Calculator
                  </a>
                  <a href="/savings-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Savings Calculator
                  </a>
                  <a href="/loan-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Loan Calculator
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
