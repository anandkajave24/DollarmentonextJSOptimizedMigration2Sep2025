import Head from 'next/head';
import dynamic from 'next/dynamic';

const ETFCalculator = dynamic(() => import('@/pages/ETFCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div></div>
});

export default function ETFCalculatorPage() {
  return (
    <>
      <Head>
        <title>ETF Calculator - Exchange-Traded Fund Investment Calculator | DollarMento</title>
        <meta name="description" content="Free ETF calculator. Calculate ETF investment returns, compare expense ratios, and analyze exchange-traded fund performance for smart investing." />
        <meta name="keywords" content="etf calculator, exchange traded fund calculator, etf investment calculator, etf expense ratio calculator, etf performance calculator" />
        <meta property="og:title" content="ETF Calculator - Exchange-Traded Fund Investment Calculator" />
        <meta property="og:description" content="Calculate ETF investment returns and compare exchange-traded funds with our comprehensive calculator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/etf-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ETF Calculator" />
        <meta name="twitter:description" content="Free calculator to analyze ETF investments and compare exchange-traded fund performance." />
        <link rel="canonical" href="https://dollarmento.com/etf-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ETF Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate ETF investment returns, compare expense ratios, and analyze 
              exchange-traded fund performance for smart portfolio building.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <ETFCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to ETF Investing</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Exchange-Traded Funds (ETFs) are investment vehicles that trade on stock 
                    exchanges like individual stocks while offering diversified exposure to 
                    various asset classes, sectors, or investment strategies.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">How ETFs Work</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    ETFs combine the diversification benefits of mutual funds with the 
                    trading flexibility of individual stocks, offering investors efficient 
                    access to broad market exposure.
                  </p>

                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-teal-800 mb-3">ETF Structure:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-teal-700">
                      <div>
                        <h5 className="font-semibold mb-2">Creation Process:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Authorized participants create/redeem shares</li>
                          <li>• In-kind transactions maintain NAV tracking</li>
                          <li>• Arbitrage keeps prices aligned</li>
                          <li>• Large creation unit sizes (50,000+ shares)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Trading Features:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Trade during market hours</li>
                          <li>• Real-time pricing and liquidity</li>
                          <li>• Limit orders and stop losses</li>
                          <li>• Short selling capabilities</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">ETF Categories and Types</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    ETFs cover virtually every asset class and investment strategy, 
                    providing investors with diverse options for portfolio construction.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">ETF Type</th>
                          <th className="border border-gray-300 p-3 text-left">Description</th>
                          <th className="border border-gray-300 p-3 text-left">Examples</th>
                          <th className="border border-gray-300 p-3 text-left">Typical Expense Ratio</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Broad Market</td>
                          <td className="border border-gray-300 p-3">Total stock market exposure</td>
                          <td className="border border-gray-300 p-3">VTI, ITOT, SPTM</td>
                          <td className="border border-gray-300 p-3">0.03-0.20%</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Sector</td>
                          <td className="border border-gray-300 p-3">Specific industry focus</td>
                          <td className="border border-gray-300 p-3">XLK, XLF, VHT</td>
                          <td className="border border-gray-300 p-3">0.10-0.50%</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">International</td>
                          <td className="border border-gray-300 p-3">Foreign market exposure</td>
                          <td className="border border-gray-300 p-3">VXUS, IEFA, VWO</td>
                          <td className="border border-gray-300 p-3">0.08-0.25%</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Fixed Income</td>
                          <td className="border border-gray-300 p-3">Bond and debt securities</td>
                          <td className="border border-gray-300 p-3">BND, AGG, VGIT</td>
                          <td className="border border-gray-300 p-3">0.03-0.15%</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">Thematic</td>
                          <td className="border border-gray-300 p-3">Specific themes/trends</td>
                          <td className="border border-gray-300 p-3">ARKK, ICLN, ROBO</td>
                          <td className="border border-gray-300 p-3">0.40-0.75%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Expense Ratios and Costs</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    ETF costs significantly impact long-term returns. Understanding expense 
                    ratios and comparing costs across similar funds is essential for optimization.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Expense Ratio Impact</h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between">
                          <span>$100,000 investment over 20 years:</span>
                        </div>
                        <div className="flex justify-between">
                          <span>• 0.03% expense ratio:</span>
                          <span className="font-semibold text-green-600">$1,200 total fees</span>
                        </div>
                        <div className="flex justify-between">
                          <span>• 0.50% expense ratio:</span>
                          <span className="font-semibold text-red-600">$20,000 total fees</span>
                        </div>
                        <div className="text-xs pt-2 border-t">
                          *Assuming 7% annual returns
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">ETF vs. Mutual Fund Comparison</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    While ETFs and mutual funds serve similar purposes, they have 
                    distinct characteristics that affect suitability for different investors.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">ETF Advantages</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• Lower expense ratios typically</li>
                        <li>• Intraday trading flexibility</li>
                        <li>• Tax efficiency through in-kind redemptions</li>
                        <li>• No minimum investment requirements</li>
                        <li>• Transparent daily holdings</li>
                        <li>• Options and short selling available</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Mutual Fund Advantages</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• Automatic dividend reinvestment</li>
                        <li>• Fractional share purchases</li>
                        <li>• No bid-ask spreads</li>
                        <li>• Dollar-cost averaging friendly</li>
                        <li>• Active management options</li>
                        <li>• End-of-day NAV pricing</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Portfolio Construction with ETFs</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    ETFs enable efficient portfolio diversification across asset classes, 
                    geographies, and investment styles with minimal complexity.
                  </p>

                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-teal-800 mb-3">Sample Core Portfolio:</h4>
                    <div className="space-y-3 text-teal-700">
                      <div className="flex justify-between items-center">
                        <span>US Total Stock Market (VTI)</span>
                        <span className="font-semibold">60%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>International Stocks (VXUS)</span>
                        <span className="font-semibold">20%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total Bond Market (BND)</span>
                        <span className="font-semibold">20%</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="text-sm">Total Expense Ratio: ~0.05% • Global Diversification • Rebalancing Flexibility</div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tax Efficiency Benefits</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    ETFs offer superior tax efficiency compared to mutual funds due to 
                    their unique structure and in-kind redemption process.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-green-700">In-Kind Redemptions</h4>
                      <p className="text-gray-700 text-sm">ETFs can eliminate low-basis holdings without triggering capital gains distributions</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-700">Lower Turnover</h4>
                      <p className="text-gray-700 text-sm">Index ETFs typically have lower portfolio turnover than actively managed funds</p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-semibold text-purple-700">Tax-Loss Harvesting</h4>
                      <p className="text-gray-700 text-sm">Intraday trading enables sophisticated tax-loss harvesting strategies</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">ETF Selection Criteria</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Key Evaluation Factors</h4>
                      <ul className="text-yellow-700 text-sm space-y-1">
                        <li>• Expense ratio and total cost of ownership</li>
                        <li>• Tracking error vs. benchmark index</li>
                        <li>• Average daily trading volume and liquidity</li>
                        <li>• Assets under management (size)</li>
                        <li>• Bid-ask spreads and premiums/discounts</li>
                        <li>• Holdings transparency and index methodology</li>
                        <li>• Fund provider reputation and stability</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our ETF Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our calculator helps you analyze ETF investments, compare different 
                    funds, and project long-term returns based on various scenarios.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Calculate investment growth over time</li>
                    <li>Compare expense ratios and their impact</li>
                    <li>Analyze dividend reinvestment effects</li>
                    <li>Model different contribution strategies</li>
                    <li>Factor in taxes and trading costs</li>
                    <li>Compare ETF vs. mutual fund scenarios</li>
                    <li>Optimize portfolio allocation strategies</li>
                  </ul>

                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-teal-800 mb-3">Investment Example:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-teal-700">
                      <div>
                        <h5 className="font-semibold mb-2">Investment Details:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Initial Investment: $50,000</li>
                          <li>• Monthly Contributions: $1,000</li>
                          <li>• Time Horizon: 20 years</li>
                          <li>• Expected Return: 7% annually</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Projected Results:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Total Contributions: $290,000</li>
                          <li>• Final Value: $745,000</li>
                          <li>• Investment Growth: $455,000</li>
                          <li>• <strong>Return Multiple: 2.57x</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Optimization Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use the calculator to develop optimal ETF investment strategies 
                    that balance costs, diversification, and long-term growth potential.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-teal-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-teal-800 mb-1">Low Cost</h4>
                      <div className="text-2xl font-bold text-teal-800">&lt;0.20%</div>
                      <p className="text-teal-700 text-xs">Target expense ratio</p>
                    </div>
                    <div className="bg-cyan-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-cyan-800 mb-1">Diversification</h4>
                      <div className="text-2xl font-bold text-cyan-800">3-5</div>
                      <p className="text-cyan-700 text-xs">Core ETF positions</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Rebalancing</h4>
                      <div className="text-2xl font-bold text-blue-800">1-2x</div>
                      <p className="text-blue-700 text-xs">Times per year</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">ETF Basics</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Trading</span>
                    <span className="font-semibold">Market hours</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Diversification</span>
                    <span className="font-semibold">Instant</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Minimum</span>
                    <span className="font-semibold">1 share</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax Efficiency</span>
                    <span className="font-semibold">High</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Low Costs</h3>
                <p className="text-sm mb-4">
                  Top ETFs have expense ratios under 0.10%, much lower than typical mutual funds.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">0.03%</div>
                  <div className="text-sm opacity-90">Lowest expense ratios</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/investment-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Calculator
                  </a>
                  <a href="/portfolio-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Portfolio Calculator
                  </a>
                  <a href="/dividend-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Dividend Calculator
                  </a>
                  <a href="/compound-interest-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Compound Interest Calculator
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
