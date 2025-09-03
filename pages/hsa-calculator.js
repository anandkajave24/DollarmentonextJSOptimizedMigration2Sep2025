import Head from 'next/head';
import dynamic from 'next/dynamic';

const HSACalculator = dynamic(() => import('@/pages/HSACalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
});

export default function HSACalculatorPage() {
  return (
    <>
      <Head>
        <title>HSA Calculator - Health Savings Account Planning Tool | DollarMento</title>
        <meta name="description" content="Free HSA calculator for health savings account planning. Calculate contributions, tax savings, and retirement healthcare costs. Maximize your HSA benefits." />
        <meta name="keywords" content="hsa calculator, health savings account calculator, hsa contribution limits, healthcare retirement planning, hsa tax benefits" />
        <meta property="og:title" content="HSA Calculator - Health Savings Account Planning Tool" />
        <meta property="og:description" content="Plan your health savings account strategy with our comprehensive HSA calculator. Calculate contributions, tax savings, and healthcare costs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/hsa-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HSA Calculator" />
        <meta name="twitter:description" content="Free HSA calculator for health savings account planning and tax optimization." />
        <link rel="canonical" href="https://dollarmento.com/hsa-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              HSA Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plan your Health Savings Account strategy with our comprehensive HSA calculator. 
              Calculate contributions, tax savings, and optimize your healthcare financial planning.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <HSACalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Health Savings Accounts</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    A Health Savings Account (HSA) is one of the most tax-advantaged accounts available, offering 
                    triple tax benefits: deductible contributions, tax-free growth, and tax-free withdrawals for 
                    qualified medical expenses. It's an essential tool for healthcare financial planning.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">HSA Triple Tax Advantage</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    HSAs offer unique tax benefits that make them more advantageous than traditional retirement 
                    accounts for healthcare expenses. Understanding these benefits is key to maximizing your HSA strategy.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">The Triple Tax Advantage:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-700">
                      <div className="text-center">
                        <div className="text-3xl font-bold">1️⃣</div>
                        <div className="font-semibold">Tax Deductible</div>
                        <div className="text-sm">Contributions reduce current taxable income</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">2️⃣</div>
                        <div className="font-semibold">Tax-Free Growth</div>
                        <div className="text-sm">Investment earnings grow without taxes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">3️⃣</div>
                        <div className="font-semibold">Tax-Free Withdrawals</div>
                        <div className="text-sm">For qualified medical expenses</div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">2025 HSA Contribution Limits</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The IRS sets annual contribution limits for HSAs, which are adjusted for inflation each year. 
                    Knowing these limits helps you maximize your tax benefits and healthcare savings.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Coverage Type</th>
                          <th className="border border-gray-300 p-3 text-left">2025 Limit</th>
                          <th className="border border-gray-300 p-3 text-left">55+ Catch-up</th>
                          <th className="border border-gray-300 p-3 text-left">Total (55+)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Individual Coverage</td>
                          <td className="border border-gray-300 p-3">$4,150</td>
                          <td className="border border-gray-300 p-3">$1,000</td>
                          <td className="border border-gray-300 p-3">$5,150</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Family Coverage</td>
                          <td className="border border-gray-300 p-3">$8,300</td>
                          <td className="border border-gray-300 p-3">$1,000</td>
                          <td className="border border-gray-300 p-3">$9,300</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">HSA Eligibility Requirements</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To contribute to an HSA, you must be enrolled in a High Deductible Health Plan (HDHP) 
                    and meet specific eligibility criteria set by the IRS.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Requirements</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>✓ Enrolled in HDHP</li>
                        <li>✓ No other health coverage</li>
                        <li>✓ Not claimed as dependent</li>
                        <li>✓ Not enrolled in Medicare</li>
                        <li>✓ No disqualifying benefits</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="font-bold text-red-800 mb-3">HDHP Minimums (2025)</h4>
                      <ul className="text-red-700 text-sm space-y-2">
                        <li>Individual: $1,650 deductible</li>
                        <li>Family: $3,300 deductible</li>
                        <li>Individual max out-of-pocket: $8,250</li>
                        <li>Family max out-of-pocket: $16,500</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">HSA Investment Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Many HSA providers offer investment options once your balance reaches a minimum threshold. 
                    Investing your HSA funds can significantly increase your healthcare savings over time.
                  </p>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">HSA Investment Approach:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-700">
                      <div>
                        <h5 className="font-semibold mb-2">Short-term (1-5 years):</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Cash for immediate medical expenses</li>
                          <li>• Money market funds</li>
                          <li>• Short-term bond funds</li>
                          <li>• Conservative allocation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Long-term (retirement):</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Stock index funds</li>
                          <li>• Target-date funds</li>
                          <li>• Aggressive growth allocation</li>
                          <li>• Focus on tax-free growth</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Qualified Medical Expenses</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding what expenses qualify for tax-free HSA withdrawals is crucial for maximizing 
                    your account benefits and avoiding penalties.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Medical Care</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Doctor visits, hospital stays, surgery</li>
                        <li>• Prescription medications</li>
                        <li>• Medical equipment and supplies</li>
                        <li>• Mental health services</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Dental & Vision</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Routine dental care and orthodontics</li>
                        <li>• Eye exams and prescription glasses</li>
                        <li>• Contact lenses and solution</li>
                        <li>• Laser eye surgery</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Alternative Care</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Chiropractic care</li>
                        <li>• Acupuncture</li>
                        <li>• Physical therapy</li>
                        <li>• Qualifying over-the-counter medications</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">HSA vs. FSA Comparison</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    While both HSAs and FSAs help with healthcare costs, they have significant differences 
                    in contribution limits, rollover rules, and long-term benefits.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Feature</th>
                          <th className="border border-gray-300 p-3 text-left">HSA</th>
                          <th className="border border-gray-300 p-3 text-left">FSA</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3">Contribution Limit</td>
                          <td className="border border-gray-300 p-3">$4,150/$8,300</td>
                          <td className="border border-gray-300 p-3">$3,200</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">Rollover</td>
                          <td className="border border-gray-300 p-3">Unlimited</td>
                          <td className="border border-gray-300 p-3">$640 max</td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3">Ownership</td>
                          <td className="border border-gray-300 p-3">Employee owned</td>
                          <td className="border border-gray-300 p-3">Employer owned</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">Investment</td>
                          <td className="border border-gray-300 p-3">Yes</td>
                          <td className="border border-gray-300 p-3">No</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">HSA Retirement Strategy</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    After age 65, HSAs become even more valuable as they can be used like traditional 
                    retirement accounts while maintaining tax-free withdrawals for medical expenses.
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-2">Age 65+ Benefits:</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• Penalty-free withdrawals for any purpose</li>
                      <li>• Tax-free withdrawals for medical expenses</li>
                      <li>• Medicare premiums are qualifying expenses</li>
                      <li>• Long-term care insurance premiums qualify</li>
                      <li>• No required minimum distributions</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our HSA Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our HSA calculator helps you plan your health savings strategy by projecting growth, 
                    calculating tax savings, and estimating healthcare costs in retirement.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Calculate maximum annual contributions</li>
                    <li>Project long-term account growth</li>
                    <li>Estimate tax savings from contributions</li>
                    <li>Plan for healthcare costs in retirement</li>
                    <li>Compare investment allocation strategies</li>
                    <li>Factor in catch-up contributions (55+)</li>
                    <li>Show potential Medicare supplement costs</li>
                  </ul>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Retirement Healthcare Costs:</h4>
                    <ul className="text-blue-700 space-y-1 text-sm">
                      <li>• Average couple needs $315,000 for healthcare in retirement</li>
                      <li>• Medicare doesn't cover all expenses (80% average)</li>
                      <li>• Long-term care costs $50,000+ annually</li>
                      <li>• Dental and vision care often not covered</li>
                      <li>• HSA provides tax-free funding for all these expenses</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">HSA Maximization Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To get the most from your HSA, focus on maximizing contributions, minimizing current 
                    withdrawals, and investing for long-term growth.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Conservative Growth</h4>
                      <div className="text-2xl font-bold text-green-800">$75K</div>
                      <p className="text-green-700 text-xs">$4,150/year for 15 years at 4%</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Moderate Growth</h4>
                      <div className="text-2xl font-bold text-blue-800">$105K</div>
                      <p className="text-blue-700 text-xs">$4,150/year for 15 years at 6%</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-purple-800 mb-1">Aggressive Growth</h4>
                      <div className="text-2xl font-bold text-purple-800">$140K</div>
                      <p className="text-purple-700 text-xs">$4,150/year for 15 years at 8%</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">2025 HSA Limits</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Individual</span>
                    <span className="font-semibold">$4,150</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Family</span>
                    <span className="font-semibold">$8,300</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Catch-up (55+)</span>
                    <span className="font-semibold">+$1,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">HDHP Min Deductible</span>
                    <span className="font-semibold">$1,650</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Tax Savings Example</h3>
                <p className="text-sm mb-4">
                  $4,150 HSA contribution saves $913 in taxes (22% bracket).
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">$913</div>
                  <div className="text-sm opacity-90">Annual tax savings</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/retirement-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Retirement Calculator
                  </a>
                  <a href="/healthcare-cost-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Healthcare Cost Calculator
                  </a>
                  <a href="/tax-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Tax Calculator
                  </a>
                  <a href="/insurance-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Insurance Calculator
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
