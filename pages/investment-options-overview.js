import Head from 'next/head';
import dynamic from 'next/dynamic';

const InvestmentOptionsOverview = dynamic(() => import('@/pages/InvestmentOptionsOverview'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div></div>
});

export default function InvestmentOptionsOverviewPage() {
  return (
    <>
      <Head>
        <title>Investment Options Overview - Complete Investment Guide | DollarMento</title>
        <meta name="description" content="Comprehensive overview of investment options. Compare stocks, bonds, ETFs, real estate, and alternative investments. Find the best investment strategy for your goals." />
        <meta name="keywords" content="investment options, investment types, investment guide, stock investments, bond investments, ETF investments, real estate investing" />
        <meta property="og:title" content="Investment Options Overview - Complete Investment Guide" />
        <meta property="og:description" content="Comprehensive guide to all investment options and strategies for building wealth." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/investment-options-overview" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Investment Options Overview" />
        <meta name="twitter:description" content="Complete guide to investment options and wealth-building strategies." />
        <link rel="canonical" href="https://dollarmento.com/investment-options-overview" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Investment Options Overview
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore comprehensive investment options and strategies. Compare different 
              asset classes, understand risk-return profiles, and build your wealth-building plan.
            </p>
          </div>

          {/* Interactive Investment Guide */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <InvestmentOptionsOverview />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Investment Options</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Investment options represent different ways to deploy capital with the 
                    expectation of generating returns. Each option carries unique characteristics 
                    regarding risk, return potential, liquidity, and time horizon requirements.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Core Asset Classes</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding the fundamental asset classes is essential for building 
                    a diversified investment portfolio that aligns with your financial goals.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Asset Class</th>
                          <th className="border border-gray-300 p-3 text-left">Risk Level</th>
                          <th className="border border-gray-300 p-3 text-left">Expected Return</th>
                          <th className="border border-gray-300 p-3 text-left">Liquidity</th>
                          <th className="border border-gray-300 p-3 text-left">Time Horizon</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Cash/Money Market</td>
                          <td className="border border-gray-300 p-3">Very Low</td>
                          <td className="border border-gray-300 p-3">2-4%</td>
                          <td className="border border-gray-300 p-3">Very High</td>
                          <td className="border border-gray-300 p-3">Short-term</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Bonds</td>
                          <td className="border border-gray-300 p-3">Low-Medium</td>
                          <td className="border border-gray-300 p-3">3-6%</td>
                          <td className="border border-gray-300 p-3">High</td>
                          <td className="border border-gray-300 p-3">Medium-term</td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Stocks</td>
                          <td className="border border-gray-300 p-3">Medium-High</td>
                          <td className="border border-gray-300 p-3">6-10%</td>
                          <td className="border border-gray-300 p-3">High</td>
                          <td className="border border-gray-300 p-3">Long-term</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Real Estate</td>
                          <td className="border border-gray-300 p-3">Medium</td>
                          <td className="border border-gray-300 p-3">4-8%</td>
                          <td className="border border-gray-300 p-3">Low</td>
                          <td className="border border-gray-300 p-3">Long-term</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">Commodities</td>
                          <td className="border border-gray-300 p-3">High</td>
                          <td className="border border-gray-300 p-3">3-7%</td>
                          <td className="border border-gray-300 p-3">Medium</td>
                          <td className="border border-gray-300 p-3">Variable</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Stock Investments</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Stocks represent ownership stakes in companies and historically provide 
                    the highest long-term returns among major asset classes, though with 
                    higher volatility and risk.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Stock Categories</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• <strong>Large Cap:</strong> Established companies (&gt;$10B)</li>
                        <li>• <strong>Mid Cap:</strong> Growing companies ($2-10B)</li>
                        <li>• <strong>Small Cap:</strong> Emerging companies (&lt;$2B)</li>
                        <li>• <strong>Growth Stocks:</strong> High growth potential</li>
                        <li>• <strong>Value Stocks:</strong> Undervalued opportunities</li>
                        <li>• <strong>Dividend Stocks:</strong> Income-generating shares</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Stock Advantages</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• High long-term return potential</li>
                        <li>• Liquidity for easy buying/selling</li>
                        <li>• Ownership in growing businesses</li>
                        <li>• Dividend income opportunities</li>
                        <li>• Protection against inflation</li>
                        <li>• Tax-advantaged capital gains</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Bond Investments</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Bonds are debt securities that provide steady income and portfolio 
                    stability. They serve as a counterbalance to stock volatility in diversified portfolios.
                  </p>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-emerald-800 mb-3">Bond Types:</h4>
                    <div className="space-y-3 text-emerald-700">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-semibold">Government Bonds (Treasuries)</span>
                        <span className="text-sm">Lowest risk, modest returns</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-semibold">Corporate Bonds</span>
                        <span className="text-sm">Higher yields, credit risk</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-semibold">Municipal Bonds</span>
                        <span className="text-sm">Tax advantages, local risk</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-semibold">High-Yield Bonds</span>
                        <span className="text-sm">Higher returns, higher risk</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">International Bonds</span>
                        <span className="text-sm">Currency diversification</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Exchange-Traded Funds (ETFs)</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    ETFs combine the diversification of mutual funds with the trading 
                    flexibility of stocks, offering efficient exposure to various markets and strategies.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-teal-400 pl-4">
                      <h4 className="font-semibold text-teal-700">Broad Market ETFs</h4>
                      <p className="text-gray-700 text-sm">Track entire markets (S&P 500, Total Stock Market) for instant diversification</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-700">Sector ETFs</h4>
                      <p className="text-gray-700 text-sm">Focus on specific industries (technology, healthcare, energy) for targeted exposure</p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-semibold text-purple-700">International ETFs</h4>
                      <p className="text-gray-700 text-sm">Provide global diversification across developed and emerging markets</p>
                    </div>
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-green-700">Bond ETFs</h4>
                      <p className="text-gray-700 text-sm">Offer fixed-income exposure with better liquidity than individual bonds</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Real Estate Investments</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Real estate provides inflation protection, income generation, and 
                    portfolio diversification through various investment vehicles.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h4 className="font-bold text-orange-800 mb-3">Direct Real Estate</h4>
                      <ul className="text-orange-700 text-sm space-y-2">
                        <li>• <strong>Primary Residence:</strong> Homeownership benefits</li>
                        <li>• <strong>Rental Properties:</strong> Income and appreciation</li>
                        <li>• <strong>Commercial Real Estate:</strong> Business properties</li>
                        <li>• <strong>Land Investment:</strong> Development potential</li>
                        <li>• <strong>Fix-and-Flip:</strong> Short-term profit strategy</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <h4 className="font-bold text-yellow-800 mb-3">Real Estate Securities</h4>
                      <ul className="text-yellow-700 text-sm space-y-2">
                        <li>• <strong>REITs:</strong> Publicly traded real estate</li>
                        <li>• <strong>Real Estate ETFs:</strong> Diversified REIT exposure</li>
                        <li>• <strong>Real Estate Mutual Funds:</strong> Professional management</li>
                        <li>• <strong>Real Estate Crowdfunding:</strong> Platform investing</li>
                        <li>• <strong>Private REITs:</strong> Non-traded opportunities</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Alternative Investments</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Alternative investments offer portfolio diversification beyond 
                    traditional stocks and bonds, though often with higher complexity and risk.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Popular Alternatives</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <h5 className="font-semibold mb-1">Commodities:</h5>
                          <p>Gold, silver, oil, agricultural products</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Cryptocurrencies:</h5>
                          <p>Bitcoin, Ethereum, digital assets</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Private Equity:</h5>
                          <p>Non-public company investments</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Hedge Funds:</h5>
                          <p>Alternative strategy funds</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Collectibles:</h5>
                          <p>Art, antiques, rare items</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Peer-to-Peer Lending:</h5>
                          <p>Direct lending platforms</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Risk-Return Considerations</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">Risk Assessment Factors</h4>
                      <ul className="text-red-700 text-sm space-y-1">
                        <li>• Market risk: Overall market volatility</li>
                        <li>• Credit risk: Default possibility in bonds</li>
                        <li>• Liquidity risk: Ability to sell quickly</li>
                        <li>• Inflation risk: Purchasing power erosion</li>
                        <li>• Concentration risk: Lack of diversification</li>
                        <li>• Currency risk: Foreign exchange fluctuations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Building Your Investment Strategy</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    A successful investment strategy combines multiple asset classes 
                    based on your goals, risk tolerance, and time horizon.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Portfolio Allocation Models</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3 text-center">Conservative (Age 50+)</h4>
                      <div className="space-y-2 text-blue-700 text-sm">
                        <div className="flex justify-between">
                          <span>Bonds:</span>
                          <span className="font-semibold">60%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Stocks:</span>
                          <span className="font-semibold">30%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Real Estate:</span>
                          <span className="font-semibold">5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cash:</span>
                          <span className="font-semibold">5%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3 text-center">Moderate (Age 30-50)</h4>
                      <div className="space-y-2 text-green-700 text-sm">
                        <div className="flex justify-between">
                          <span>Stocks:</span>
                          <span className="font-semibold">60%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bonds:</span>
                          <span className="font-semibold">30%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Real Estate:</span>
                          <span className="font-semibold">7%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Alternatives:</span>
                          <span className="font-semibold">3%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h4 className="font-bold text-orange-800 mb-3 text-center">Aggressive (Age 20-40)</h4>
                      <div className="space-y-2 text-orange-700 text-sm">
                        <div className="flex justify-between">
                          <span>Stocks:</span>
                          <span className="font-semibold">80%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Real Estate:</span>
                          <span className="font-semibold">10%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bonds:</span>
                          <span className="font-semibold">5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Alternatives:</span>
                          <span className="font-semibold">5%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Investment Account Types</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Choosing the right account type can significantly impact your 
                    after-tax returns and investment flexibility.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-emerald-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-emerald-800 mb-1">Tax-Advantaged</h4>
                      <div className="text-2xl font-bold text-emerald-800">401k/IRA</div>
                      <p className="text-emerald-700 text-xs">Retirement accounts</p>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-teal-800 mb-1">Taxable</h4>
                      <div className="text-2xl font-bold text-teal-800">Brokerage</div>
                      <p className="text-teal-700 text-xs">Flexible access</p>
                    </div>
                    <div className="bg-cyan-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-cyan-800 mb-1">Education</h4>
                      <div className="text-2xl font-bold text-cyan-800">529 Plan</div>
                      <p className="text-cyan-700 text-xs">Education savings</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Asset Allocation</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Stocks</span>
                    <span className="font-semibold">60-80%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Bonds</span>
                    <span className="font-semibold">20-40%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Real Estate</span>
                    <span className="font-semibold">5-15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Alternatives</span>
                    <span className="font-semibold">0-10%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Diversification</h3>
                <p className="text-sm mb-4">
                  Don't put all eggs in one basket. Spread risk across multiple asset classes and investments.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Key</div>
                  <div className="text-sm opacity-90">To success</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/portfolio-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Portfolio Calculator
                  </a>
                  <a href="/retirement-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Retirement Calculator
                  </a>
                  <a href="/risk-assessment" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Risk Assessment
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
