import Head from 'next/head';
import dynamic from 'next/dynamic';

const CapitalGainsTaxCalculator = dynamic(() => import('@/pages/CapitalGainsTaxCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div></div>
});

export default function CapitalGainsTaxCalculatorPage() {
  return (
    <>
      <Head>
        <title>Capital Gains Tax Calculator - Investment Tax Planning Tool | DollarMento</title>
        <meta name="description" content="Free capital gains tax calculator. Calculate taxes on stock sales, real estate, and investments. Long-term vs short-term rates, tax optimization strategies." />
        <meta name="keywords" content="capital gains tax calculator, capital gains tax rates, investment tax calculator, stock tax calculator, real estate capital gains, tax optimization" />
        <meta property="og:title" content="Capital Gains Tax Calculator - Investment Tax Planning Tool" />
        <meta property="og:description" content="Calculate capital gains taxes on your investments and optimize your tax strategy with our comprehensive tax planning calculator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/capital-gains-tax-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Capital Gains Tax Calculator" />
        <meta name="twitter:description" content="Free calculator to estimate capital gains taxes and optimize your investment tax strategy." />
        <link rel="canonical" href="https://dollarmento.com/capital-gains-tax-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Capital Gains Tax Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate capital gains taxes on your investments and optimize your tax strategy. 
              Understand long-term vs. short-term rates and plan your investment transactions.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <CapitalGainsTaxCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Capital Gains Tax</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Capital gains tax is levied on the profit from selling investments such as stocks, 
                    bonds, real estate, or other capital assets. Understanding how capital gains taxes 
                    work is crucial for optimizing your investment strategy and minimizing tax liability.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Short-Term vs. Long-Term Capital Gains</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The length of time you hold an investment determines whether gains are taxed as 
                    short-term or long-term, with significantly different tax rates applying to each.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="font-bold text-red-800 mb-3">Short-Term Capital Gains</h4>
                      <ul className="text-red-700 text-sm space-y-2">
                        <li>• <strong>Holding Period:</strong> 1 year or less</li>
                        <li>• <strong>Tax Rate:</strong> Same as ordinary income</li>
                        <li>• <strong>Rate Range:</strong> 10% to 37% (2025)</li>
                        <li>• <strong>Impact:</strong> Higher tax burden</li>
                        <li>• <strong>Strategy:</strong> Consider holding longer</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Long-Term Capital Gains</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• <strong>Holding Period:</strong> More than 1 year</li>
                        <li>• <strong>Tax Rate:</strong> Preferential rates</li>
                        <li>• <strong>Rate Range:</strong> 0%, 15%, or 20%</li>
                        <li>• <strong>Impact:</strong> Significant tax savings</li>
                        <li>• <strong>Strategy:</strong> Patient investing pays off</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">2025 Capital Gains Tax Rates</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Long-term capital gains rates are based on your total taxable income and filing 
                    status, with three possible rates: 0%, 15%, and 20%.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Filing Status</th>
                          <th className="border border-gray-300 p-3 text-left">0% Rate</th>
                          <th className="border border-gray-300 p-3 text-left">15% Rate</th>
                          <th className="border border-gray-300 p-3 text-left">20% Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Single</td>
                          <td className="border border-gray-300 p-3">$0 - $47,025</td>
                          <td className="border border-gray-300 p-3">$47,026 - $518,900</td>
                          <td className="border border-gray-300 p-3">$518,901+</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Married Filing Jointly</td>
                          <td className="border border-gray-300 p-3">$0 - $94,050</td>
                          <td className="border border-gray-300 p-3">$94,051 - $583,750</td>
                          <td className="border border-gray-300 p-3">$583,751+</td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Married Filing Separately</td>
                          <td className="border border-gray-300 p-3">$0 - $47,025</td>
                          <td className="border border-gray-300 p-3">$47,026 - $291,875</td>
                          <td className="border border-gray-300 p-3">$291,876+</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Head of Household</td>
                          <td className="border border-gray-300 p-3">$0 - $63,000</td>
                          <td className="border border-gray-300 p-3">$63,001 - $551,350</td>
                          <td className="border border-gray-300 p-3">$551,351+</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Special Capital Gains Situations</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Certain types of capital gains receive special treatment under tax law, 
                    with different rates or rules applying to specific situations.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Collectibles (Art, Coins, etc.)</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Maximum tax rate: 28%</li>
                        <li>• Applies to precious metals, art, antiques</li>
                        <li>• Higher than regular capital gains rates</li>
                        <li>• Still benefits from long-term holding</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Section 1202 Qualified Small Business Stock</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Up to $10 million or 10x basis exclusion</li>
                        <li>• Must meet specific requirements</li>
                        <li>• 5-year holding period minimum</li>
                        <li>• Significant tax savings for entrepreneurs</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Real Estate Depreciation Recapture</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Depreciation taxed at 25% rate</li>
                        <li>• Applies to rental and business property</li>
                        <li>• Separate from capital gains calculation</li>
                        <li>• Consider 1031 exchanges to defer</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Net Investment Income Tax (NIIT)</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    High earners may also owe the Net Investment Income Tax, an additional 3.8% 
                    tax on investment income including capital gains.
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">NIIT Thresholds (2025):</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-red-700">
                      <div>
                        <h5 className="font-semibold mb-2">Income Thresholds:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Single: $200,000</li>
                          <li>• Married Filing Jointly: $250,000</li>
                          <li>• Married Filing Separately: $125,000</li>
                          <li>• Head of Household: $200,000</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Covered Income:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Capital gains</li>
                          <li>• Dividends</li>
                          <li>• Interest income</li>
                          <li>• Rental income</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tax Optimization Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Strategic planning can significantly reduce your capital gains tax burden through 
                    timing, loss harvesting, and other legitimate tax optimization techniques.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Tax-Loss Harvesting</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• Sell losing investments to offset gains</li>
                        <li>• $3,000 annual deduction limit</li>
                        <li>• Carry forward excess losses</li>
                        <li>• Watch for wash sale rules</li>
                        <li>• Rebalance portfolio strategically</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Timing Strategies</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• Hold investments over 1 year</li>
                        <li>• Time sales across tax years</li>
                        <li>• Consider retirement year sales</li>
                        <li>• Bunch gains in low-income years</li>
                        <li>• Use charitable giving strategies</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Capital Gains Tax Planning</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Effective capital gains tax planning requires a comprehensive approach that 
                    considers your overall tax situation, investment timeline, and financial goals.
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-2">Planning Checklist:</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• <strong>Review annually:</strong> Assess gains and losses before year-end</li>
                      <li>• <strong>Track cost basis:</strong> Maintain accurate records for all investments</li>
                      <li>• <strong>Consider tax-advantaged accounts:</strong> Use IRAs and 401(k)s strategically</li>
                      <li>• <strong>Plan charitable giving:</strong> Donate appreciated securities</li>
                      <li>• <strong>Coordinate with overall tax strategy:</strong> Work with tax professionals</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Capital Gains Mistakes</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Selling Before One Year</h4>
                      <p className="text-gray-700 text-sm">Missing long-term rates by selling just before the one-year anniversary.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Ignoring Wash Sale Rules</h4>
                      <p className="text-gray-700 text-sm">Repurchasing similar securities within 30 days negates tax loss benefits.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Poor Record Keeping</h4>
                      <p className="text-gray-700 text-sm">Inadequate cost basis tracking can result in overpaying taxes.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Not Planning for NIIT</h4>
                      <p className="text-gray-700 text-sm">High earners forgetting about the additional 3.8% investment income tax.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Capital Gains Tax Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our capital gains tax calculator helps you estimate taxes owed on investment 
                    sales and optimize your tax strategy through various scenarios and planning tools.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Calculate both short-term and long-term capital gains</li>
                    <li>Include state capital gains taxes where applicable</li>
                    <li>Factor in Net Investment Income Tax (NIIT)</li>
                    <li>Compare different sale timing scenarios</li>
                    <li>Analyze tax-loss harvesting opportunities</li>
                    <li>Model various income levels and filing statuses</li>
                    <li>Generate tax optimization recommendations</li>
                  </ul>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">Example Tax Calculation:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-red-700">
                      <div>
                        <h5 className="font-semibold mb-2">Short-term Sale (6 months):</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Gain: $50,000</li>
                          <li>• Tax Rate: 32% (ordinary income)</li>
                          <li>• Federal Tax: $16,000</li>
                          <li>• <strong>After-tax Gain: $34,000</strong></li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Long-term Sale (18 months):</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Gain: $50,000</li>
                          <li>• Tax Rate: 15% (long-term rate)</li>
                          <li>• Federal Tax: $7,500</li>
                          <li>• <strong>After-tax Gain: $42,500</strong></li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-white rounded border text-red-800">
                      <strong>Tax Savings:</strong> $8,500 by waiting for long-term treatment
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tax Planning Scenarios</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use the calculator to model different scenarios and make informed decisions 
                    about when and how to realize capital gains based on your tax situation.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">0% Tax Rate</h4>
                      <div className="text-2xl font-bold text-green-800">$0</div>
                      <p className="text-green-700 text-xs">Lower income taxpayers</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-orange-800 mb-1">15% Tax Rate</h4>
                      <div className="text-2xl font-bold text-orange-800">$7,500</div>
                      <p className="text-orange-700 text-xs">On $50,000 gain</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-red-800 mb-1">20% + NIIT</h4>
                      <div className="text-2xl font-bold text-red-800">$11,900</div>
                      <p className="text-red-700 text-xs">High earners (23.8% total)</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">2025 Tax Rates</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Long-term (0%)</span>
                    <span className="font-semibold">Up to $47K single</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Long-term (15%)</span>
                    <span className="font-semibold">$47K - $519K single</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Long-term (20%)</span>
                    <span className="font-semibold">$519K+ single</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">NIIT</span>
                    <span className="font-semibold">+3.8% high earners</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Tax Savings Example</h3>
                <p className="text-sm mb-4">
                  Waiting 1 year for long-term treatment saves $8,500 on a $50,000 gain.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">$8,500</div>
                  <div className="text-sm opacity-90">Potential savings</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/tax-loss-harvesting-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Tax Loss Harvesting Calculator
                  </a>
                  <a href="/tax-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Income Tax Calculator
                  </a>
                  <a href="/investment-tax-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Tax Calculator
                  </a>
                  <a href="/retirement-tax-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Retirement Tax Calculator
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
