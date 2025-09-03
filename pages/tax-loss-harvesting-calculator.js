import Head from 'next/head';
import dynamic from 'next/dynamic';

const TaxLossHarvestingCalculator = dynamic(() => import('@/pages/TaxLossHarvestingCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div></div>
});

export default function TaxLossHarvestingCalculatorPage() {
  return (
    <>
      <Head>
        <title>Tax Loss Harvesting Calculator - Tax Strategy Calculator | DollarMento</title>
        <meta name="description" content="Free tax loss harvesting calculator. Optimize your investment taxes by strategically realizing losses to offset gains and reduce tax liability." />
        <meta name="keywords" content="tax loss harvesting calculator, tax strategy calculator, capital gains tax calculator, investment tax calculator, tax optimization" />
        <meta property="og:title" content="Tax Loss Harvesting Calculator - Tax Strategy Calculator" />
        <meta property="og:description" content="Calculate tax savings from loss harvesting strategies and optimize your investment portfolio for tax efficiency." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/tax-loss-harvesting-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tax Loss Harvesting Calculator" />
        <meta name="twitter:description" content="Free calculator to optimize tax loss harvesting strategies and reduce investment taxes." />
        <link rel="canonical" href="https://dollarmento.com/tax-loss-harvesting-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tax Loss Harvesting Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Optimize your investment taxes by strategically realizing losses to offset 
              gains. Calculate potential tax savings and implement smart harvesting strategies.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <TaxLossHarvestingCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Tax Loss Harvesting</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Tax loss harvesting is an investment strategy that involves selling 
                    securities at a loss to offset capital gains from other investments, 
                    reducing your overall tax liability while maintaining portfolio allocation.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">How Tax Loss Harvesting Works</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The strategy leverages the tax code's treatment of capital gains and 
                    losses, allowing investors to reduce taxes while staying invested in 
                    the market through similar securities.
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">Basic Process:</h4>
                    <div className="space-y-3 text-red-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Identify Losses</div>
                          <div className="text-sm">Find investments trading below purchase price</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Sell at Loss</div>
                          <div className="text-sm">Realize the capital loss for tax purposes</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Offset Gains</div>
                          <div className="text-sm">Use losses to reduce taxable capital gains</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Reinvest</div>
                          <div className="text-sm">Buy similar (not identical) securities</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tax Benefits and Rules</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding the tax treatment of capital gains and losses is essential 
                    for effective harvesting strategies and compliance with IRS rules.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Tax Treatment</th>
                          <th className="border border-gray-300 p-3 text-left">Short-Term (&le;1 year)</th>
                          <th className="border border-gray-300 p-3 text-left">Long-Term (&gt;1 year)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-red-50">
                          <td className="border border-gray-300 p-3 font-semibold">Capital Gains Tax</td>
                          <td className="border border-gray-300 p-3">Ordinary income rates</td>
                          <td className="border border-gray-300 p-3">0%, 15%, or 20%</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Loss Offset Priority</td>
                          <td className="border border-gray-300 p-3">Offset short-term gains first</td>
                          <td className="border border-gray-300 p-3">Offset long-term gains first</td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Excess Loss Carryover</td>
                          <td className="border border-gray-300 p-3" colSpan="2">$3,000 annual deduction limit</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Wash Sale Rule</td>
                          <td className="border border-gray-300 p-3" colSpan="2">30-day restriction applies</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Wash Sale Rule</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The wash sale rule prevents investors from claiming tax losses on 
                    securities if they purchase substantially identical securities within 
                    30 days before or after the sale.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Wash Sale Triggers</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Buying the same security within 30 days</li>
                        <li>• Purchasing substantially identical securities</li>
                        <li>• Acquiring options or contracts to buy the security</li>
                        <li>• Spouse or controlled corporation purchases</li>
                        <li>• IRA purchases of the same security</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Avoiding Wash Sales</h4>
                      <ul className="text-yellow-700 text-sm space-y-1">
                        <li>• Wait 31 days before repurchasing</li>
                        <li>• Buy similar but not identical securities</li>
                        <li>• Use ETFs from different providers</li>
                        <li>• Purchase bonds with different maturities</li>
                        <li>• Consider sector funds vs individual stocks</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Harvesting Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different harvesting approaches optimize tax benefits while maintaining 
                    desired portfolio exposure and risk characteristics.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Direct Swapping</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• Sell losing position immediately</li>
                        <li>• Buy similar but different security</li>
                        <li>• Maintain market exposure</li>
                        <li>• Avoid wash sale complications</li>
                        <li>• Examples: VTI → SPTM, QQQ → ONEQ</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Double-Up Strategy</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• Buy identical security first</li>
                        <li>• Wait 31 days, then sell original</li>
                        <li>• Maintains exact position size</li>
                        <li>• Requires additional capital</li>
                        <li>• Avoids wash sale rule</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculating Tax Savings</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Tax savings from harvesting depend on your tax bracket, the size of 
                    gains/losses, and the holding period of the securities involved.
                  </p>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Savings Calculation Example:</h4>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between">
                        <span>Short-term gains realized:</span>
                        <span className="font-semibold">$10,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax rate (32% bracket):</span>
                        <span className="font-semibold">32%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax without harvesting:</span>
                        <span className="font-semibold">$3,200</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Losses harvested:</span>
                        <span>($8,000)</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Net taxable gains:</span>
                        <span className="font-semibold">$2,000</span>
                      </div>
                      <div className="flex justify-between text-green-600 font-bold">
                        <span>Tax savings:</span>
                        <span>$2,560</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Optimal Timing Considerations</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Strategic timing of loss harvesting can maximize tax benefits while 
                    maintaining portfolio performance and avoiding regulatory issues.
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">Timing Strategies:</h4>
                    <div className="space-y-3 text-red-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">Q4</div>
                        <div>
                          <div className="font-semibold">Year-End Harvesting</div>
                          <div className="text-sm">Traditional time for tax planning and rebalancing</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">???</div>
                        <div>
                          <div className="font-semibold">Opportunistic Harvesting</div>
                          <div className="text-sm">Harvest throughout year when significant losses occur</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">☮</div>
                        <div>
                          <div className="font-semibold">Rebalancing Coordination</div>
                          <div className="text-sm">Combine with portfolio rebalancing activities</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Mistakes to Avoid</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-orange-400 pl-4">
                      <h4 className="font-semibold text-orange-700">Wash Sale Violations</h4>
                      <p className="text-gray-700 text-sm">Accidentally triggering wash sale rules by buying identical securities too soon</p>
                    </div>
                    <div className="border-l-4 border-orange-400 pl-4">
                      <h4 className="font-semibold text-orange-700">Over-Harvesting</h4>
                      <p className="text-gray-700 text-sm">Harvesting small losses with high transaction costs that exceed tax benefits</p>
                    </div>
                    <div className="border-l-4 border-orange-400 pl-4">
                      <h4 className="font-semibold text-orange-700">Ignoring Long-Term Strategy</h4>
                      <p className="text-gray-700 text-sm">Focusing only on current year taxes without considering future implications</p>
                    </div>
                    <div className="border-l-4 border-orange-400 pl-4">
                      <h4 className="font-semibold text-orange-700">Poor Record Keeping</h4>
                      <p className="text-gray-700 text-sm">Failing to track adjusted basis and carryover losses properly</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Tax Loss Harvesting Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our calculator helps you analyze potential tax savings from loss 
                    harvesting strategies and optimize your approach for maximum benefit.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Calculate tax savings from harvested losses</li>
                    <li>Compare short-term vs. long-term gain offsets</li>
                    <li>Model different tax bracket scenarios</li>
                    <li>Analyze opportunity costs of strategies</li>
                    <li>Factor in transaction costs and fees</li>
                    <li>Plan multi-year harvesting strategies</li>
                    <li>Optimize timing for maximum savings</li>
                  </ul>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">Strategy Comparison:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-red-700">
                      <div>
                        <h5 className="font-semibold mb-2">Scenario A: No Harvesting</h5>
                        <ul className="text-sm space-y-1">
                          <li>• $15,000 short-term gains</li>
                          <li>• 32% tax rate</li>
                          <li>• Tax liability: $4,800</li>
                          <li>• No strategy implementation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Scenario B: With Harvesting</h5>
                        <ul className="text-sm space-y-1">
                          <li>• $10,000 losses harvested</li>
                          <li>• Net gains: $5,000</li>
                          <li>• Tax liability: $1,600</li>
                          <li>• <strong>Savings: $3,200</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Implementation Guidance</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use the calculator results to develop a systematic approach to 
                    tax loss harvesting that fits your investment strategy and tax situation.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-red-800 mb-1">Max Annual</h4>
                      <div className="text-2xl font-bold text-red-800">$3,000</div>
                      <p className="text-red-700 text-xs">Ordinary income offset</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-orange-800 mb-1">Wash Sale</h4>
                      <div className="text-2xl font-bold text-orange-800">30</div>
                      <p className="text-orange-700 text-xs">Day restriction</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-yellow-800 mb-1">Max Bracket</h4>
                      <div className="text-2xl font-bold text-yellow-800">37%</div>
                      <p className="text-yellow-700 text-xs">Short-term rate</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Rules</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Wash Sale</span>
                    <span className="font-semibold">30 days</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Annual Limit</span>
                    <span className="font-semibold">$3,000</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Carryover</span>
                    <span className="font-semibold">Unlimited</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ST Tax Rate</span>
                    <span className="font-semibold">Up to 37%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Tax Savings</h3>
                <p className="text-sm mb-4">
                  Harvesting can save up to 37% in taxes on short-term gains.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">37%</div>
                  <div className="text-sm opacity-90">Maximum savings</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/capital-gains-tax-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Capital Gains Calculator
                  </a>
                  <a href="/tax-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Tax Calculator
                  </a>
                  <a href="/investment-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Calculator
                  </a>
                  <a href="/portfolio-rebalancing-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Portfolio Rebalancing Calculator
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
