import Head from 'next/head';
import dynamic from 'next/dynamic';

const CDCalculator = dynamic(() => import('@/pages/CDCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div></div>
});

export default function CDCalculatorPage() {
  return (
    <>
      <Head>
        <title>CD Calculator - Certificate of Deposit Investment Tool | DollarMento</title>
        <meta name="description" content="Free CD calculator for certificate of deposit investments. Calculate CD returns, compare rates, and find the best CD terms for your savings goals." />
        <meta name="keywords" content="cd calculator, certificate of deposit calculator, cd rates calculator, cd investment calculator, fixed deposit calculator, cd maturity calculator" />
        <meta property="og:title" content="CD Calculator - Certificate of Deposit Investment Tool" />
        <meta property="og:description" content="Calculate CD returns and compare certificate of deposit rates to optimize your savings strategy with our comprehensive CD calculator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/cd-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CD Calculator" />
        <meta name="twitter:description" content="Free calculator to analyze certificate of deposit returns and find the best CD rates for your savings." />
        <link rel="canonical" href="https://dollarmento.com/cd-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              CD Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate returns on Certificate of Deposit (CD) investments. 
              Compare CD rates, terms, and find the best options for your savings goals.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <CDCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Certificate of Deposit (CD) Investing</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    A Certificate of Deposit (CD) is a time deposit offered by banks and credit unions 
                    that provides guaranteed returns over a fixed period. CDs offer higher interest 
                    rates than regular savings accounts in exchange for locking up your money for 
                    a specific term.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">How CDs Work</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    When you purchase a CD, you agree to deposit a specific amount for a predetermined 
                    period (term) at a fixed interest rate. In return, the financial institution 
                    guarantees your principal and interest, making CDs one of the safest investments available.
                  </p>

                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-teal-800 mb-3">CD Key Features:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-teal-700">
                      <div>
                        <h5 className="font-semibold mb-2">Safety & Security:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• FDIC insured up to $250,000</li>
                          <li>• Principal protection guaranteed</li>
                          <li>• Fixed interest rate</li>
                          <li>• Predictable returns</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Terms & Conditions:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Fixed maturity date</li>
                          <li>• Early withdrawal penalties</li>
                          <li>• Minimum deposit requirements</li>
                          <li>• Interest payment options</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Types of CDs</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different types of CDs offer various features and benefits. Understanding these 
                    options helps you choose the CD that best fits your financial goals and timeline.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">CD Type</th>
                          <th className="border border-gray-300 p-3 text-left">Features</th>
                          <th className="border border-gray-300 p-3 text-left">Best For</th>
                          <th className="border border-gray-300 p-3 text-left">Considerations</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Traditional CD</td>
                          <td className="border border-gray-300 p-3">Fixed rate, fixed term</td>
                          <td className="border border-gray-300 p-3">Most investors</td>
                          <td className="border border-gray-300 p-3">Early withdrawal penalty</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Callable CD</td>
                          <td className="border border-gray-300 p-3">Bank can redeem early</td>
                          <td className="border border-gray-300 p-3">Higher rate seekers</td>
                          <td className="border border-gray-300 p-3">Reinvestment risk</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Bump-Up CD</td>
                          <td className="border border-gray-300 p-3">Rate increase option</td>
                          <td className="border border-gray-300 p-3">Rising rate periods</td>
                          <td className="border border-gray-300 p-3">Initially lower rates</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">No-Penalty CD</td>
                          <td className="border border-gray-300 p-3">No early withdrawal fees</td>
                          <td className="border border-gray-300 p-3">Uncertain timelines</td>
                          <td className="border border-gray-300 p-3">Lower interest rates</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">Jumbo CD</td>
                          <td className="border border-gray-300 p-3">$100K+ minimum</td>
                          <td className="border border-gray-300 p-3">Large deposits</td>
                          <td className="border border-gray-300 p-3">Higher minimum requirement</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">CD Terms and Interest Rates</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    CD terms typically range from 3 months to 5 years, with longer terms generally 
                    offering higher interest rates. Understanding the relationship between term length 
                    and rates helps optimize your CD strategy.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Common CD Terms</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• <strong>Short-term (3-12 months):</strong> Lower rates, higher liquidity</li>
                        <li>• <strong>Medium-term (1-3 years):</strong> Moderate rates, balanced approach</li>
                        <li>• <strong>Long-term (3-5 years):</strong> Higher rates, less flexibility</li>
                        <li>• <strong>Ultra-long (5+ years):</strong> Highest rates, maximum commitment</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Interest Rate Factors</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Federal Reserve policy and economic conditions</li>
                        <li>• Institution type (online banks often offer higher rates)</li>
                        <li>• Competition among financial institutions</li>
                        <li>• CD term length and deposit amount</li>
                        <li>• Current yield curve and interest rate environment</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">CD Laddering Strategy</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    CD laddering is an investment strategy that involves purchasing multiple CDs 
                    with different maturity dates to balance higher returns with regular access to funds.
                  </p>

                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-teal-800 mb-3">Sample 5-Year CD Ladder:</h4>
                    <div className="space-y-3 text-teal-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-teal-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Year 1: $10,000 in 1-year CD</div>
                          <div className="text-sm">Matures first, provides earliest access</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-teal-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Year 2: $10,000 in 2-year CD</div>
                          <div className="text-sm">Higher rate than 1-year option</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-teal-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Continue through 5-year CD</div>
                          <div className="text-sm">Reinvest maturing CDs in new 5-year terms</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">CD vs. Other Savings Options</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Comparing CDs with other savings and investment options helps you make informed 
                    decisions about where to allocate your funds based on your goals and risk tolerance.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">CD Advantages</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• FDIC insurance protection</li>
                        <li>• Guaranteed returns</li>
                        <li>• Higher rates than savings accounts</li>
                        <li>• Predictable income stream</li>
                        <li>• No market risk</li>
                        <li>• Forces disciplined saving</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="font-bold text-red-800 mb-3">CD Limitations</h4>
                      <ul className="text-red-700 text-sm space-y-2">
                        <li>• Limited liquidity</li>
                        <li>• Early withdrawal penalties</li>
                        <li>• Inflation risk over time</li>
                        <li>• Opportunity cost in rising markets</li>
                        <li>• Interest rate risk</li>
                        <li>• Lower returns than stocks long-term</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Choosing the Right CD</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Selecting the best CD requires evaluating rates, terms, institution reputation, 
                    and how the CD fits into your overall financial strategy.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">CD Selection Checklist:</h4>
                    <ul className="text-blue-700 space-y-1 text-sm">
                      <li>• <strong>Shop around:</strong> Compare rates from multiple institutions</li>
                      <li>• <strong>Check minimums:</strong> Ensure you meet deposit requirements</li>
                      <li>• <strong>Read terms:</strong> Understand penalty and renewal policies</li>
                      <li>• <strong>Verify FDIC coverage:</strong> Confirm deposit insurance</li>
                      <li>• <strong>Consider timing:</strong> Evaluate interest rate environment</li>
                      <li>• <strong>Plan for maturity:</strong> Know your options at term end</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common CD Mistakes</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Auto-Renewal Without Review</h4>
                      <p className="text-gray-700 text-sm">Letting CDs automatically renew without checking for better rates elsewhere.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Ignoring Inflation Impact</h4>
                      <p className="text-gray-700 text-sm">Not considering how inflation erodes purchasing power over long terms.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Poor Timing Decisions</h4>
                      <p className="text-gray-700 text-sm">Locking in low rates right before interest rates rise significantly.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Exceeding FDIC Limits</h4>
                      <p className="text-gray-700 text-sm">Depositing more than $250,000 per institution without insurance protection.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our CD Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our CD calculator helps you compare different CD options, calculate returns, 
                    and plan CD laddering strategies to optimize your savings approach.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Calculate CD maturity values and interest earned</li>
                    <li>Compare different CD terms and rates</li>
                    <li>Model CD laddering strategies</li>
                    <li>Factor in early withdrawal penalties</li>
                    <li>Account for tax implications</li>
                    <li>Project inflation-adjusted returns</li>
                    <li>Generate optimal CD allocation plans</li>
                  </ul>

                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-teal-800 mb-3">Example CD Calculation:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-teal-700">
                      <div>
                        <h5 className="font-semibold mb-2">Investment Details:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Principal: $25,000</li>
                          <li>• Interest Rate: 4.5% APY</li>
                          <li>• Term: 3 years</li>
                          <li>• Compounding: Monthly</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Results:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Maturity Value: $28,571</li>
                          <li>• Interest Earned: $3,571</li>
                          <li>• Effective Yield: 14.3%</li>
                          <li>• <strong>Annual Income: $1,190</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">CD Strategy Planning</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use the calculator to develop a comprehensive CD strategy that balances 
                    returns, liquidity needs, and interest rate risk management.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">3-Month CD</h4>
                      <div className="text-2xl font-bold text-blue-800">3.5%</div>
                      <p className="text-blue-700 text-xs">Short-term rate</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">2-Year CD</h4>
                      <div className="text-2xl font-bold text-green-800">4.2%</div>
                      <p className="text-green-700 text-xs">Medium-term rate</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-purple-800 mb-1">5-Year CD</h4>
                      <div className="text-2xl font-bold text-purple-800">4.8%</div>
                      <p className="text-purple-700 text-xs">Long-term rate</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">CD Quick Facts</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">FDIC Insurance</span>
                    <span className="font-semibold">Up to $250K</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Typical Terms</span>
                    <span className="font-semibold">3 months - 5 years</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Interest Rates</span>
                    <span className="font-semibold">3% - 5% APY</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Early Withdrawal</span>
                    <span className="font-semibold">Penalty applies</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">CD vs Savings</h3>
                <p className="text-sm mb-4">
                  CDs typically offer 2-3x higher rates than traditional savings accounts.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">3x</div>
                  <div className="text-sm opacity-90">Higher returns</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/savings-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Savings Calculator
                  </a>
                  <a href="/money-market-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Money Market Calculator
                  </a>
                  <a href="/compound-interest-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Compound Interest Calculator
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
