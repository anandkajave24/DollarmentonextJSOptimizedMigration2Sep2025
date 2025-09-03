import Head from 'next/head';
import dynamic from 'next/dynamic';

const TaxCalculator2025IRS = dynamic(() => import('@/pages/TaxCalculator2025IRS'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div></div>
});

export default function TaxCalculator2025IRSPage() {
  return (
    <>
      <Head>
        <title>2025 IRS Tax Calculator - Free Tax Planning Tool | DollarMento</title>
        <meta name="description" content="Free 2025 IRS tax calculator with updated tax brackets and rates. Calculate federal income tax, plan deductions, and optimize your tax strategy." />
        <meta name="keywords" content="2025 tax calculator, irs tax calculator, federal tax calculator, income tax calculator, tax brackets 2025, tax planning" />
        <meta property="og:title" content="2025 IRS Tax Calculator - Free Tax Planning Tool" />
        <meta property="og:description" content="Calculate your 2025 federal income tax with our free IRS tax calculator. Updated with latest tax brackets and deduction limits." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/tax-calculator-2025-irs" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="2025 IRS Tax Calculator" />
        <meta name="twitter:description" content="Free 2025 tax calculator with updated IRS tax brackets and rates for optimal tax planning." />
        <link rel="canonical" href="https://dollarmento.com/tax-calculator-2025-irs" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              2025 IRS Tax Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate your 2025 federal income tax with our comprehensive IRS tax calculator. 
              Updated with the latest tax brackets, deduction limits, and tax planning strategies.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <TaxCalculator2025IRS />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">2025 Tax Year Guide & IRS Updates</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The 2025 tax year brings important updates to federal income tax brackets, standard deductions, 
                    and various tax limits. Understanding these changes is crucial for effective tax planning and 
                    maximizing your tax savings throughout the year.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">2025 Federal Tax Brackets & Rates</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The IRS has adjusted tax brackets for inflation in 2025. Here are the updated federal income 
                    tax brackets that apply to income earned from January 1, 2025, through December 31, 2025.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Tax Rate</th>
                          <th className="border border-gray-300 p-3 text-left">Single Filers</th>
                          <th className="border border-gray-300 p-3 text-left">Married Filing Jointly</th>
                          <th className="border border-gray-300 p-3 text-left">Head of Household</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">10%</td>
                          <td className="border border-gray-300 p-3">$0 - $11,925</td>
                          <td className="border border-gray-300 p-3">$0 - $23,850</td>
                          <td className="border border-gray-300 p-3">$0 - $17,000</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">12%</td>
                          <td className="border border-gray-300 p-3">$11,926 - $48,475</td>
                          <td className="border border-gray-300 p-3">$23,851 - $96,950</td>
                          <td className="border border-gray-300 p-3">$17,001 - $64,850</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">22%</td>
                          <td className="border border-gray-300 p-3">$48,476 - $103,350</td>
                          <td className="border border-gray-300 p-3">$96,951 - $206,700</td>
                          <td className="border border-gray-300 p-3">$64,851 - $103,350</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">24%</td>
                          <td className="border border-gray-300 p-3">$103,351 - $197,300</td>
                          <td className="border border-gray-300 p-3">$206,701 - $394,600</td>
                          <td className="border border-gray-300 p-3">$103,351 - $197,300</td>
                        </tr>
                        <tr className="bg-orange-50">
                          <td className="border border-gray-300 p-3 font-semibold">32%</td>
                          <td className="border border-gray-300 p-3">$197,301 - $250,525</td>
                          <td className="border border-gray-300 p-3">$394,601 - $501,050</td>
                          <td className="border border-gray-300 p-3">$197,301 - $250,525</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">35%</td>
                          <td className="border border-gray-300 p-3">$250,526 - $626,350</td>
                          <td className="border border-gray-300 p-3">$501,051 - $751,600</td>
                          <td className="border border-gray-300 p-3">$250,526 - $626,350</td>
                        </tr>
                        <tr className="bg-red-50">
                          <td className="border border-gray-300 p-3 font-semibold">37%</td>
                          <td className="border border-gray-300 p-3">$626,351+</td>
                          <td className="border border-gray-300 p-3">$751,601+</td>
                          <td className="border border-gray-300 p-3">$626,351+</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">2025 Standard Deduction Amounts</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The standard deduction amounts have been increased for 2025 to account for inflation. 
                    Most taxpayers will benefit from taking the standard deduction rather than itemizing.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">2025 Standard Deduction Amounts:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-700">
                      <div className="text-center">
                        <div className="text-2xl font-bold">$15,000</div>
                        <div className="text-sm">Single Filers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">$30,000</div>
                        <div className="text-sm">Married Filing Jointly</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">$22,500</div>
                        <div className="text-sm">Head of Household</div>
                      </div>
                    </div>
                    <div className="text-center mt-4 text-blue-700 text-sm">
                      Additional $1,550 for taxpayers 65 and older
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key 2025 Tax Changes & Updates</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li><strong>Inflation Adjustments:</strong> All tax brackets and standard deductions increased by approximately 3%</li>
                    <li><strong>401(k) Contribution Limits:</strong> Increased to $23,500 ($31,000 for 50+)</li>
                    <li><strong>IRA Contribution Limits:</strong> Increased to $7,000 ($8,000 for 50+)</li>
                    <li><strong>HSA Contribution Limits:</strong> $4,150 individual, $8,300 family</li>
                    <li><strong>Alternative Minimum Tax (AMT):</strong> Exemption increased to $85,700 (single), $133,300 (married)</li>
                    <li><strong>Earned Income Tax Credit:</strong> Maximum credit increased for all family sizes</li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tax Planning Strategies for 2025</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Effective tax planning involves understanding how to minimize your tax liability through 
                    strategic income timing, deduction maximization, and smart investment choices.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Income Strategies</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Maximize 401(k) and IRA contributions</li>
                        <li>• Consider Roth conversions in low-income years</li>
                        <li>• Time capital gains and losses strategically</li>
                        <li>• Utilize HSA for triple tax advantage</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                      <h4 className="font-bold text-purple-800 mb-3">Deduction Strategies</h4>
                      <ul className="text-purple-700 text-sm space-y-1">
                        <li>• Bundle charitable deductions</li>
                        <li>• Maximize mortgage interest deduction</li>
                        <li>• Consider state and local tax strategies</li>
                        <li>• Track business and investment expenses</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Tax Deductions & Credits</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding the difference between deductions (which reduce taxable income) and credits 
                    (which directly reduce taxes owed) can significantly impact your tax liability.
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-2">Popular Tax Deductions for 2025:</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• Mortgage interest (up to $750,000 loan amount)</li>
                      <li>• State and local taxes (SALT) - capped at $10,000</li>
                      <li>• Charitable contributions (various limits apply)</li>
                      <li>• Medical expenses exceeding 7.5% of AGI</li>
                      <li>• Student loan interest (up to $2,500)</li>
                      <li>• Retirement plan contributions</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-2">Valuable Tax Credits for 2025:</h4>
                    <ul className="text-green-700 space-y-1 text-sm">
                      <li>• Child Tax Credit: $2,000 per qualifying child</li>
                      <li>• Earned Income Tax Credit: Up to $7,830 for families</li>
                      <li>• American Opportunity Credit: Up to $2,500 for education</li>
                      <li>• Lifetime Learning Credit: Up to $2,000 for education</li>
                      <li>• Child and Dependent Care Credit: Up to $3,000-$6,000</li>
                      <li>• Retirement Saver's Credit: Up to $2,000</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tax Filing Requirements & Deadlines</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding filing requirements and important deadlines helps you stay compliant with 
                    IRS regulations and avoid penalties and interest charges.
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">Important 2025 Tax Dates:</h4>
                    <ul className="text-red-700 space-y-2">
                      <li>• <strong>April 15, 2026:</strong> 2025 tax returns due</li>
                      <li>• <strong>October 15, 2026:</strong> Extended filing deadline</li>
                      <li>• <strong>January 15, 2026:</strong> Q4 2025 estimated tax payment due</li>
                      <li>• <strong>April 15, 2026:</strong> Q1 2026 estimated tax payment due</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our 2025 Tax Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our 2025 IRS tax calculator uses the latest tax brackets, standard deductions, and tax laws 
                    to provide accurate federal income tax calculations. Simply enter your income, filing status, 
                    and deductions to get instant tax estimates.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Calculate federal income tax for 2025 tax year</li>
                    <li>Compare standard deduction vs. itemized deductions</li>
                    <li>Estimate tax refund or amount owed</li>
                    <li>Factor in common tax credits and deductions</li>
                    <li>View marginal vs. effective tax rates</li>
                    <li>Plan quarterly estimated tax payments</li>
                    <li>Project tax impact of financial decisions</li>
                  </ul>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Tax Planning Tips:</h4>
                    <ul className="text-blue-700 space-y-1 text-sm">
                      <li>• Review withholdings if life circumstances change</li>
                      <li>• Consider increasing 401(k) contributions to reduce taxable income</li>
                      <li>• Bunch charitable deductions in alternating years</li>
                      <li>• Harvest tax losses before year-end</li>
                      <li>• Plan Roth IRA conversions during low-income years</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Understanding Your Tax Results</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The calculator provides several key metrics to help you understand your tax situation 
                    and make informed financial decisions throughout the year.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Marginal Tax Rate</h4>
                      <p className="text-gray-700 text-sm">
                        The tax rate applied to your last dollar of income. Use this rate 
                        to evaluate tax impact of additional income or deductions.
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Effective Tax Rate</h4>
                      <p className="text-gray-700 text-sm">
                        Your total tax divided by total income. This shows your overall 
                        tax burden as a percentage of your income.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Year-Round Tax Planning</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Effective tax planning isn't just for tax season. Making strategic financial decisions 
                    throughout the year can significantly reduce your annual tax liability.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Q1</h4>
                      <p className="text-green-700 text-xs">File previous year returns, plan current year strategy</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Q2</h4>
                      <p className="text-blue-700 text-xs">Review withholdings, adjust retirement contributions</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-yellow-800 mb-1">Q3</h4>
                      <p className="text-yellow-700 text-xs">Estimate annual tax liability, plan year-end moves</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-red-800 mb-1">Q4</h4>
                      <p className="text-red-700 text-xs">Execute tax strategies, harvest losses, bundle deductions</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">2025 Tax Quick Facts</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Tax Season Starts</span>
                    <span className="font-semibold">January 2026</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Filing Deadline</span>
                    <span className="font-semibold">April 15, 2026</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Max Tax Rate</span>
                    <span className="font-semibold">37%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Standard Deduction</span>
                    <span className="font-semibold">Up to $30,000</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Tax Planning Tip</h3>
                <p className="text-sm mb-4">
                  Maximize your 401(k) contribution to reduce taxable income by up to $23,500 in 2025.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">$23,500</div>
                  <div className="text-sm opacity-90">Max 401(k) contribution</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tax Tools</h3>
                <div className="space-y-3">
                  <a href="/tax-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Basic Tax Calculator
                  </a>
                  <a href="/capital-gains-tax-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Capital Gains Tax Calculator
                  </a>
                  <a href="/payroll-tax-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Payroll Tax Calculator
                  </a>
                  <a href="/retirement-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Retirement Tax Planning
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
