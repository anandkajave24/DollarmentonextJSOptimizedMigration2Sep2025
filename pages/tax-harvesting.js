import Head from 'next/head';
import dynamic from 'next/dynamic';

const TaxHarvesting = dynamic(() => import('@/pages/TaxHarvesting'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div></div>
});

export default function TaxHarvestingPage() {
  return (
    <>
      <Head>
        <title>Tax Loss Harvesting - Advanced Tax Strategy Guide | DollarMento</title>
        <meta name="description" content="Master tax loss harvesting strategies to reduce taxes and improve after-tax returns. Learn wash sale rules, tax optimization techniques, and portfolio management." />
        <meta name="keywords" content="tax loss harvesting, tax optimization, wash sale rules, tax strategy, capital gains tax, tax-efficient investing, portfolio tax management" />
        <meta property="og:title" content="Tax Loss Harvesting - Advanced Tax Strategy Guide" />
        <meta property="og:description" content="Comprehensive guide to tax loss harvesting and tax-efficient investment strategies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/tax-harvesting" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tax Loss Harvesting" />
        <meta name="twitter:description" content="Advanced tax strategies and loss harvesting techniques for investors." />
        <link rel="canonical" href="https://dollarmento.com/tax-harvesting" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tax Loss Harvesting
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master advanced tax strategies to minimize taxes and maximize after-tax returns. 
              Learn professional harvesting techniques, wash sale rules, and portfolio optimization.
            </p>
          </div>

          {/* Interactive Tax Harvesting Tool */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <TaxHarvesting />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Tax Loss Harvesting</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Tax loss harvesting is a sophisticated investment strategy that involves 
                    selling securities at a loss to offset capital gains and reduce overall 
                    tax liability while maintaining portfolio diversification and investment objectives.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">How Tax Loss Harvesting Works</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The strategy capitalizes on tax code provisions that allow investors 
                    to deduct investment losses against gains and ordinary income, 
                    effectively reducing their tax burden while optimizing portfolio performance.
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Key Mechanics:</h4>
                    <div className="space-y-3 text-green-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Identify Losses</div>
                          <div className="text-sm">Find securities trading below purchase price</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Realize Losses</div>
                          <div className="text-sm">Sell losing positions to crystallize tax losses</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Offset Gains</div>
                          <div className="text-sm">Use losses to reduce taxable capital gains</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Maintain Exposure</div>
                          <div className="text-sm">Reinvest in similar (not identical) assets</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tax Loss Harvesting Rules</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding IRS rules is crucial for effective harvesting 
                    while avoiding penalties and maintaining strategy effectiveness.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Rule</th>
                          <th className="border border-gray-300 p-3 text-left">Requirement</th>
                          <th className="border border-gray-300 p-3 text-left">Consequence</th>
                          <th className="border border-gray-300 p-3 text-left">Workaround</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-red-50">
                          <td className="border border-gray-300 p-3 font-semibold">Wash Sale Rule</td>
                          <td className="border border-gray-300 p-3">30-day no repurchase period</td>
                          <td className="border border-gray-300 p-3">Loss disallowed</td>
                          <td className="border border-gray-300 p-3">Buy similar (not identical) asset</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Capital Loss Limit</td>
                          <td className="border border-gray-300 p-3">$3,000 annual ordinary income offset</td>
                          <td className="border border-gray-300 p-3">Excess losses carried forward</td>
                          <td className="border border-gray-300 p-3">Multi-year planning</td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Short vs. Long-term</td>
                          <td className="border border-gray-300 p-3">Match holding periods when possible</td>
                          <td className="border border-gray-300 p-3">Different tax rates apply</td>
                          <td className="border border-gray-300 p-3">Strategic timing of sales</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Substantially Identical</td>
                          <td className="border border-gray-300 p-3">Avoid repurchasing same security</td>
                          <td className="border border-gray-300 p-3">Wash sale triggered</td>
                          <td className="border border-gray-300 p-3">Use ETFs, different companies</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Wash Sale Rule Deep Dive</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The wash sale rule is the most critical constraint in tax loss harvesting, 
                    requiring careful planning to avoid disallowing legitimate tax losses.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="font-bold text-red-800 mb-3">Wash Sale Triggers</h4>
                      <ul className="text-red-700 text-sm space-y-2">
                        <li>• <strong>Repurchase Period:</strong> 30 days before or after sale</li>
                        <li>• <strong>Identical Securities:</strong> Same stock, bond, or option</li>
                        <li>• <strong>Spouse Purchases:</strong> Family member transactions</li>
                        <li>• <strong>IRA Contributions:</strong> Retirement account purchases</li>
                        <li>• <strong>Options & Derivatives:</strong> Similar exposure instruments</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Avoiding Wash Sales</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• <strong>Similar Assets:</strong> Different company in same sector</li>
                        <li>• <strong>ETF Swaps:</strong> Broad market to S&P 500 ETF</li>
                        <li>• <strong>Timing Strategy:</strong> Wait 31+ days to repurchase</li>
                        <li>• <strong>Lot Management:</strong> Sell specific tax lots</li>
                        <li>• <strong>Double Purchase:</strong> Buy first, sell after 30 days</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Strategic Implementation</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Effective tax loss harvesting requires systematic approach, 
                    regular monitoring, and integration with overall portfolio strategy.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Implementation Strategies</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <h5 className="font-semibold mb-1">Systematic Approach:</h5>
                          <ul className="space-y-1">
                            <li>• Regular portfolio reviews (monthly/quarterly)</li>
                            <li>• Automated loss detection alerts</li>
                            <li>• Year-end optimization planning</li>
                            <li>• Tax lot accounting systems</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Opportunistic Harvesting:</h5>
                          <ul className="space-y-1">
                            <li>• Market volatility periods</li>
                            <li>• Sector rotation opportunities</li>
                            <li>• Rebalancing coincidence</li>
                            <li>• Life event tax planning</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Asset Class Considerations</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different asset classes offer varying harvesting opportunities 
                    and require tailored approaches for optimal tax efficiency.
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Asset-Specific Strategies:</h4>
                    <div className="space-y-3 text-green-700">
                      <div className="border-l-4 border-green-300 pl-4">
                        <h5 className="font-semibold">Individual Stocks</h5>
                        <p className="text-sm">High volatility creates frequent opportunities; use sector ETFs as substitutes</p>
                      </div>
                      <div className="border-l-4 border-green-300 pl-4">
                        <h5 className="font-semibold">ETFs and Index Funds</h5>
                        <p className="text-sm">Switch between similar funds (S&P 500 vs Total Market) to maintain exposure</p>
                      </div>
                      <div className="border-l-4 border-green-300 pl-4">
                        <h5 className="font-semibold">Bonds</h5>
                        <p className="text-sm">Interest rate changes create opportunities; use duration and credit substitutes</p>
                      </div>
                      <div className="border-l-4 border-green-300 pl-4">
                        <h5 className="font-semibold">International Assets</h5>
                        <p className="text-sm">Currency fluctuations add volatility; regional ETF switching strategies</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tax Optimization Techniques</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Advanced techniques maximize the value of harvested losses 
                    while maintaining portfolio integrity and investment objectives.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h4 className="font-semibold text-yellow-700">Tax Lot Management</h4>
                      <p className="text-gray-700 text-sm">Use specific identification to harvest highest basis lots first for maximum loss recognition</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-700">Loss Carryforward Strategy</h4>
                      <p className="text-gray-700 text-sm">Harvest excess losses to carry forward indefinitely for future gain offset</p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-semibold text-purple-700">Asset Location Optimization</h4>
                      <p className="text-gray-700 text-sm">Keep volatile, harvestable assets in taxable accounts; stable assets in retirement accounts</p>
                    </div>
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-green-700">Charitable Giving Integration</h4>
                      <p className="text-gray-700 text-sm">Donate appreciated assets and harvest losses for double tax benefit</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quantifying Benefits</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding the financial impact of tax loss harvesting 
                    helps justify the strategy and optimize implementation timing.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Direct Benefits</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• <strong>Tax Reduction:</strong> 15-37% of harvested losses</li>
                        <li>• <strong>Cash Flow:</strong> Immediate tax savings</li>
                        <li>• <strong>Reinvestment:</strong> Tax savings compound over time</li>
                        <li>• <strong>Step-up Basis:</strong> Losses reset at death</li>
                        <li>• <strong>Income Offset:</strong> $3,000 annual ordinary income</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <h4 className="font-bold text-yellow-800 mb-3">Indirect Benefits</h4>
                      <ul className="text-yellow-700 text-sm space-y-2">
                        <li>• <strong>Portfolio Rebalancing:</strong> Forced discipline</li>
                        <li>• <strong>Cost Basis Reset:</strong> Higher future basis</li>
                        <li>• <strong>Emotional Discipline:</strong> Systematic approach</li>
                        <li>• <strong>Fee Efficiency:</strong> Focus on low-cost alternatives</li>
                        <li>• <strong>Liquidity Improvement:</strong> Regular portfolio review</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Mistakes and Pitfalls</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">Avoid These Errors</h4>
                      <ul className="text-red-700 text-sm space-y-1">
                        <li>• Triggering wash sales through family member purchases</li>
                        <li>• Focusing on tax benefits while ignoring investment merit</li>
                        <li>• Failing to maintain desired portfolio allocation</li>
                        <li>• Over-harvesting in low-income years with little tax benefit</li>
                        <li>• Not considering state tax implications and benefits</li>
                        <li>• Ignoring transaction costs that exceed tax benefits</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Advanced Harvesting Strategies</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Professional-level tax loss harvesting requires sophisticated 
                    techniques and systematic implementation for maximum effectiveness.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Automated Harvesting Systems</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Threshold-based loss detection (5%+ losses trigger review)</li>
                    <li>Tax-aware rebalancing that incorporates harvesting opportunities</li>
                    <li>Dynamic asset substitution based on correlation analysis</li>
                    <li>Multi-account coordination for family-wide optimization</li>
                    <li>Integration with tax preparation software for planning</li>
                    <li>Real-time wash sale rule monitoring and prevention</li>
                    <li>Cost-benefit analysis including transaction costs</li>
                    <li>Year-end tax planning and gain/loss matching</li>
                  </ul>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Professional Implementation:</h4>
                    <div className="space-y-3 text-green-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Portfolio Audit</div>
                          <div className="text-sm">Analyze current holdings for harvesting potential</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Strategy Design</div>
                          <div className="text-sm">Create systematic rules and triggers</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Implementation</div>
                          <div className="text-sm">Execute harvesting with proper documentation</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Monitoring & Optimization</div>
                          <div className="text-sm">Track results and refine approach</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Expected Benefits</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Well-executed tax loss harvesting can significantly improve 
                    after-tax returns over time through systematic tax optimization.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Annual Benefit</h4>
                      <div className="text-2xl font-bold text-green-800">0.5-1.5%</div>
                      <p className="text-green-700 text-xs">Additional return</p>
                    </div>
                    <div className="bg-lime-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-lime-800 mb-1">Tax Savings</h4>
                      <div className="text-2xl font-bold text-lime-800">15-37%</div>
                      <p className="text-lime-700 text-xs">Of harvested losses</p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-emerald-800 mb-1">Optimal Timing</h4>
                      <div className="text-2xl font-bold text-emerald-800">Year-round</div>
                      <p className="text-emerald-700 text-xs">Systematic approach</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tax Benefits</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Capital Gains Offset</span>
                    <span className="font-semibold">Unlimited</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Income Offset</span>
                    <span className="font-semibold">$3,000/year</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Carryforward</span>
                    <span className="font-semibold">Indefinite</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wash Sale Period</span>
                    <span className="font-semibold">30 days</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-lime-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Tax Efficiency</h3>
                <p className="text-sm mb-4">
                  Strategic loss harvesting can add 0.5-1.5% annually to after-tax returns.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">+1%</div>
                  <div className="text-sm opacity-90">Annual benefit</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/tax-saving-investments" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Tax-Saving Investments
                  </a>
                  <a href="/portfolio-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Portfolio Calculator
                  </a>
                  <a href="/investment-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Calculator
                  </a>
                  <a href="/retirement-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Retirement Calculator
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
