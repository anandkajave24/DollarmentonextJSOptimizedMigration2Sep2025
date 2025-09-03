import Head from 'next/head';
import dynamic from 'next/dynamic';

const PayrollTaxCalculator = dynamic(() => import('@/pages/PayrollTaxCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
});

export default function PayrollTaxCalculatorPage() {
  return (
    <>
      <Head>
        <title>Payroll Tax Calculator - Employee & Employer Tax Calculator | DollarMento</title>
        <meta name="description" content="Free payroll tax calculator. Calculate federal, state, FICA, and local payroll taxes for employees and employers with accurate withholding estimates." />
        <meta name="keywords" content="payroll tax calculator, fica calculator, federal tax calculator, state tax calculator, employee tax calculator, employer tax calculator" />
        <meta property="og:title" content="Payroll Tax Calculator - Employee & Employer Tax Calculator" />
        <meta property="og:description" content="Calculate comprehensive payroll taxes including FICA, federal, state, and local taxes with our accurate payroll tax calculator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/payroll-tax-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Payroll Tax Calculator" />
        <meta name="twitter:description" content="Free calculator to compute payroll taxes for employees and employers including all federal and state taxes." />
        <link rel="canonical" href="https://dollarmento.com/payroll-tax-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Payroll Tax Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate comprehensive payroll taxes including federal income tax, FICA taxes, 
              state taxes, and local taxes for both employees and employers.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <PayrollTaxCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Payroll Taxes</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Payroll taxes are taxes imposed on employers and employees, calculated as a 
                    percentage of the salaries that employers pay their staff. Understanding payroll 
                    taxes is essential for accurate budget planning and compliance with tax obligations.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Types of Payroll Taxes</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Payroll taxes consist of several components, each serving specific purposes 
                    in funding government programs and services. Both employees and employers 
                    have tax responsibilities that vary by jurisdiction.
                  </p>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-indigo-800 mb-3">Federal Payroll Taxes:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-indigo-700">
                      <div>
                        <h5 className="font-semibold mb-2">Employee Taxes:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Federal Income Tax (variable rate)</li>
                          <li>• Social Security Tax (6.2%)</li>
                          <li>• Medicare Tax (1.45%)</li>
                          <li>• Additional Medicare Tax (0.9%)</li>
                          <li>• State Income Tax (varies)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Employer Taxes:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Social Security Tax (6.2%)</li>
                          <li>• Medicare Tax (1.45%)</li>
                          <li>• Federal Unemployment Tax (FUTA)</li>
                          <li>• State Unemployment Tax (SUTA)</li>
                          <li>• Workers' Compensation</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">FICA Taxes Explained</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    FICA (Federal Insurance Contributions Act) taxes fund Social Security and Medicare programs. 
                    These taxes are split equally between employees and employers, creating a shared 
                    responsibility for funding these critical social programs.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Tax Type</th>
                          <th className="border border-gray-300 p-3 text-left">Rate</th>
                          <th className="border border-gray-300 p-3 text-left">Wage Base Limit</th>
                          <th className="border border-gray-300 p-3 text-left">Split</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Social Security</td>
                          <td className="border border-gray-300 p-3">12.4% total</td>
                          <td className="border border-gray-300 p-3">$160,200 (2023)</td>
                          <td className="border border-gray-300 p-3">6.2% each</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Medicare</td>
                          <td className="border border-gray-300 p-3">2.9% total</td>
                          <td className="border border-gray-300 p-3">No limit</td>
                          <td className="border border-gray-300 p-3">1.45% each</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Additional Medicare</td>
                          <td className="border border-gray-300 p-3">0.9%</td>
                          <td className="border border-gray-300 p-3">$200K+ income</td>
                          <td className="border border-gray-300 p-3">Employee only</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Federal Income Tax Withholding</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Federal income tax withholding is calculated based on the employee's W-4 form, 
                    pay frequency, and IRS withholding tables. The amount varies significantly 
                    based on income level, filing status, and claimed allowances.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">W-4 Form Factors</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• <strong>Filing Status:</strong> Single, married filing jointly, etc.</li>
                        <li>• <strong>Multiple Jobs:</strong> Adjustments for multiple income sources</li>
                        <li>• <strong>Dependents:</strong> Child and other dependent credits</li>
                        <li>• <strong>Other Income:</strong> Investment income, retirement distributions</li>
                        <li>• <strong>Deductions:</strong> Itemized deductions exceeding standard deduction</li>
                        <li>• <strong>Extra Withholding:</strong> Additional amount per pay period</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">State and Local Taxes</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    State and local payroll taxes vary significantly by location. Some states have 
                    no income tax, while others impose substantial rates. Local jurisdictions may 
                    also impose additional taxes and fees.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">High-Tax States</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• California (up to 13.3%)</li>
                        <li>• New York (up to 10.9%)</li>
                        <li>• New Jersey (up to 10.75%)</li>
                        <li>• Oregon (up to 9.9%)</li>
                        <li>• Minnesota (up to 9.85%)</li>
                        <li>• Additional local taxes possible</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">No Income Tax States</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• Alaska</li>
                        <li>• Florida</li>
                        <li>• Nevada</li>
                        <li>• New Hampshire</li>
                        <li>• South Dakota</li>
                        <li>• Tennessee</li>
                        <li>• Texas</li>
                        <li>• Washington</li>
                        <li>• Wyoming</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Employer Payroll Tax Responsibilities</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Employers bear significant payroll tax responsibilities beyond matching employee 
                    FICA contributions. These additional costs must be factored into total 
                    compensation planning and business budgets.
                  </p>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-indigo-800 mb-3">Employer Tax Obligations:</h4>
                    <div className="space-y-3 text-indigo-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">FUTA Tax</div>
                          <div className="text-sm">6.0% on first $7,000 of wages (reduced by state credits)</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">SUTA Tax</div>
                          <div className="text-sm">State unemployment tax (varies by state and experience rating)</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Workers' Compensation</div>
                          <div className="text-sm">Insurance premium based on job classification and risk</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">FICA Matching</div>
                          <div className="text-sm">7.65% of employee wages (Social Security + Medicare)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Payroll Tax Planning Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Strategic payroll tax planning can help both employers and employees optimize 
                    their tax situations while maintaining compliance with all applicable laws.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Employee Strategies</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• Optimize W-4 allowances annually</li>
                        <li>• Maximize pre-tax deductions (401k, health insurance)</li>
                        <li>• Use FSA/HSA accounts effectively</li>
                        <li>• Consider Roth vs. traditional retirement plans</li>
                        <li>• Plan for additional Medicare tax thresholds</li>
                        <li>• Time bonus payments strategically</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h4 className="font-bold text-orange-800 mb-3">Employer Strategies</h4>
                      <ul className="text-orange-700 text-sm space-y-2">
                        <li>• Offer pre-tax benefits to reduce wages</li>
                        <li>• Structure compensation packages efficiently</li>
                        <li>• Manage SUTA experience rating</li>
                        <li>• Consider payroll frequency optimization</li>
                        <li>• Implement cafeteria plans (Section 125)</li>
                        <li>• Review worker classification compliance</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Payroll Tax Mistakes</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Incorrect W-4 Information</h4>
                      <p className="text-gray-700 text-sm">Using outdated W-4 forms or failing to update after life changes leads to under/over-withholding.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Missing Wage Base Limits</h4>
                      <p className="text-gray-700 text-sm">Continuing to withhold Social Security tax after reaching the annual wage base limit.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Misclassifying Workers</h4>
                      <p className="text-gray-700 text-sm">Treating employees as independent contractors to avoid payroll tax obligations.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Late Tax Deposits</h4>
                      <p className="text-gray-700 text-sm">Missing payroll tax deposit deadlines results in penalties and interest charges.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Payroll Tax Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our payroll tax calculator provides comprehensive tax calculations for both 
                    employees and employers, including all federal, state, and local tax obligations.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Calculate federal income tax withholding</li>
                    <li>Compute FICA taxes (Social Security and Medicare)</li>
                    <li>Include state and local tax calculations</li>
                    <li>Factor in additional Medicare tax for high earners</li>
                    <li>Calculate employer tax obligations</li>
                    <li>Account for pre-tax deductions and benefits</li>
                    <li>Generate detailed payroll tax breakdowns</li>
                  </ul>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-indigo-800 mb-3">Payroll Tax Example:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-indigo-700">
                      <div>
                        <h5 className="font-semibold mb-2">Employee (Annual Salary: $75,000):</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Federal Income Tax: $8,739</li>
                          <li>• Social Security Tax: $4,650</li>
                          <li>• Medicare Tax: $1,088</li>
                          <li>• State Tax (CA): $3,750</li>
                          <li>• <strong>Total Employee: $18,227</strong></li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Employer Costs:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Social Security Match: $4,650</li>
                          <li>• Medicare Match: $1,088</li>
                          <li>• FUTA Tax: $420</li>
                          <li>• SUTA Tax: $2,250</li>
                          <li>• <strong>Total Employer: $8,408</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tax Planning Applications</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use the calculator for strategic tax planning, budgeting, and ensuring 
                    compliance with all payroll tax obligations throughout the year.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Employee Rate</h4>
                      <div className="text-2xl font-bold text-blue-800">7.65%</div>
                      <p className="text-blue-700 text-xs">FICA taxes only</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Total Tax Rate</h4>
                      <div className="text-2xl font-bold text-green-800">25-35%</div>
                      <p className="text-green-700 text-xs">Including all taxes</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-purple-800 mb-1">Employer Cost</h4>
                      <div className="text-2xl font-bold text-purple-800">10-12%</div>
                      <p className="text-purple-700 text-xs">Additional on top of wages</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Payroll Tax Quick Facts</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">FICA Rate (Total)</span>
                    <span className="font-semibold">15.3%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">SS Wage Base 2023</span>
                    <span className="font-semibold">$160,200</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">FUTA Rate</span>
                    <span className="font-semibold">0.6% (net)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Additional Medicare</span>
                    <span className="font-semibold">$200K+ income</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Tax Burden</h3>
                <p className="text-sm mb-4">
                  Total payroll taxes can represent 25-35% of gross income when including all federal and state taxes.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">30%</div>
                  <div className="text-sm opacity-90">Average tax rate</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/tax-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Income Tax Calculator
                  </a>
                  <a href="/w4-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    W-4 Calculator
                  </a>
                  <a href="/salary-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Salary Calculator
                  </a>
                  <a href="/self-employment-tax-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Self-Employment Tax Calculator
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
