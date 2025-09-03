import Head from 'next/head';
import dynamic from 'next/dynamic';

const USAInvestments = dynamic(() => import('@/pages/USAInvestments'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
});

export default function USAInvestmentsPage() {
  return (
    <>
      <Head>
        <title>USA Investments Guide - American Stock Market Investment Strategies | DollarMento</title>
        <meta name="description" content="Complete guide to USA investments and American stock market. Learn investment strategies, tax advantages, and wealth-building opportunities in the US market." />
        <meta name="keywords" content="usa investments, american stock market, us investment guide, wall street investing, american stocks, us market strategy" />
        <meta property="og:title" content="USA Investments Guide - American Stock Market Investment Strategies" />
        <meta property="og:description" content="Comprehensive guide to investing in the USA market and American investment opportunities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/usa-investments" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="USA Investments Guide" />
        <meta name="twitter:description" content="Learn how to invest in the American stock market and build wealth through USA investments." />
        <link rel="canonical" href="https://dollarmento.com/usa-investments" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              USA Investments Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master American stock market investing with comprehensive strategies for 
              building wealth through USA investments. Navigate Wall Street like a pro.
            </p>
          </div>

          {/* Interactive USA Investment Guide */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <USAInvestments />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to USA Market Investing</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The United States stock market represents the world's largest and 
                    most liquid investment marketplace, offering unparalleled opportunities 
                    for wealth building through diverse investment strategies.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Invest in the USA Market</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The American market offers unique advantages including economic 
                    stability, regulatory protection, innovation leadership, and 
                    the world's reserve currency advantage.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">USA Market Advantages:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
                      <div>
                        <h5 className="font-semibold mb-2">Market Leadership:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Largest global market capitalization</li>
                          <li>• Home to world's biggest companies</li>
                          <li>• Innovation and technology hub</li>
                          <li>• Deep liquidity and efficiency</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Investor Protection:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Strong regulatory framework (SEC)</li>
                          <li>• Transparent financial reporting</li>
                          <li>• Investor rights protection</li>
                          <li>• Legal system reliability</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Major US Stock Exchanges</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding the different exchanges helps investors choose 
                    appropriate investment vehicles and understand market structure.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Exchange</th>
                          <th className="border border-gray-300 p-3 text-left">Focus</th>
                          <th className="border border-gray-300 p-3 text-left">Notable Companies</th>
                          <th className="border border-gray-300 p-3 text-left">Characteristics</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">NYSE</td>
                          <td className="border border-gray-300 p-3">Large established companies</td>
                          <td className="border border-gray-300 p-3">Apple, Microsoft, Berkshire</td>
                          <td className="border border-gray-300 p-3">Prestige, strict listing requirements</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">NASDAQ</td>
                          <td className="border border-gray-300 p-3">Technology and growth</td>
                          <td className="border border-gray-300 p-3">Google, Amazon, Tesla</td>
                          <td className="border border-gray-300 p-3">Electronic trading, innovation</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">AMEX</td>
                          <td className="border border-gray-300 p-3">ETFs and small-cap</td>
                          <td className="border border-gray-300 p-3">SPY, GLD, various ETFs</td>
                          <td className="border border-gray-300 p-3">ETF hub, derivative products</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">OTC Markets</td>
                          <td className="border border-gray-300 p-3">Smaller companies</td>
                          <td className="border border-gray-300 p-3">International ADRs, micro-caps</td>
                          <td className="border border-gray-300 p-3">Less regulation, higher risk</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">US Market Sectors</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The American economy spans diverse sectors, each offering 
                    different investment characteristics and growth opportunities.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Growth Sectors</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• <strong>Technology:</strong> Software, semiconductors, AI</li>
                        <li>• <strong>Healthcare:</strong> Biotech, pharmaceuticals</li>
                        <li>• <strong>Consumer Discretionary:</strong> E-commerce, luxury</li>
                        <li>• <strong>Communication:</strong> Social media, streaming</li>
                        <li>• <strong>Renewable Energy:</strong> Solar, wind, batteries</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <h4 className="font-bold text-yellow-800 mb-3">Value Sectors</h4>
                      <ul className="text-yellow-700 text-sm space-y-2">
                        <li>• <strong>Financials:</strong> Banks, insurance, REITs</li>
                        <li>• <strong>Energy:</strong> Oil, gas, pipelines</li>
                        <li>• <strong>Materials:</strong> Chemicals, metals, mining</li>
                        <li>• <strong>Industrials:</strong> Manufacturing, aerospace</li>
                        <li>• <strong>Utilities:</strong> Electric, gas, water companies</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Investment Vehicles</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The US market offers diverse investment options suitable 
                    for different risk tolerances, investment goals, and experience levels.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Individual Stocks</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                        <div>
                          <h5 className="font-semibold mb-1">Large-Cap Stocks:</h5>
                          <p>Established companies &gt;$10B market cap, lower volatility</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Mid-Cap Stocks:</h5>
                          <p>Growing companies $2-10B, balanced risk-return</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Small-Cap Stocks:</h5>
                          <p>Emerging companies &lt;$2B, higher growth potential</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Exchange-Traded Funds (ETFs)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                        <div>
                          <h5 className="font-semibold mb-1">Broad Market ETFs:</h5>
                          <p>S&P 500 (SPY), Total Market (VTI), Russell 2000 (IWM)</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Sector ETFs:</h5>
                          <p>Technology (XLK), Healthcare (XLV), Financials (XLF)</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Factor ETFs:</h5>
                          <p>Value (VTV), Growth (VUG), Momentum (MTUM)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tax Considerations</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding US tax implications is crucial for optimizing 
                    after-tax returns and developing tax-efficient investment strategies.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Tax-Advantaged Accounts:</h4>
                    <div className="space-y-3 text-blue-700">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-semibold">401(k) / 403(b)</span>
                        <span className="text-sm">$23,000 limit (2024), employer match</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-semibold">Traditional IRA</span>
                        <span className="text-sm">$7,000 limit, tax deduction now</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-semibold">Roth IRA</span>
                        <span className="text-sm">$7,000 limit, tax-free growth</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-semibold">HSA</span>
                        <span className="text-sm">$4,150 limit, triple tax advantage</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">529 Education Plans</span>
                        <span className="text-sm">State tax benefits, education expenses</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Investment Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Successful US market investing requires strategy selection 
                    based on goals, timeline, and risk tolerance.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                      <h4 className="font-bold text-purple-800 mb-3">Passive Strategies</h4>
                      <ul className="text-purple-700 text-sm space-y-2">
                        <li>• <strong>Index Fund Investing:</strong> Match market returns</li>
                        <li>• <strong>Dollar-Cost Averaging:</strong> Regular investments</li>
                        <li>• <strong>Buy and Hold:</strong> Long-term ownership</li>
                        <li>• <strong>Target-Date Funds:</strong> Automatic allocation</li>
                        <li>• <strong>Core-Satellite:</strong> Index core + active satellite</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h4 className="font-bold text-orange-800 mb-3">Active Strategies</h4>
                      <ul className="text-orange-700 text-sm space-y-2">
                        <li>• <strong>Value Investing:</strong> Undervalued stocks</li>
                        <li>• <strong>Growth Investing:</strong> High-growth companies</li>
                        <li>• <strong>Dividend Investing:</strong> Income-generating stocks</li>
                        <li>• <strong>Momentum Trading:</strong> Trend following</li>
                        <li>• <strong>Sector Rotation:</strong> Economic cycle timing</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Market Analysis Tools</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The US market provides extensive data and analysis tools 
                    for making informed investment decisions.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-green-700">Fundamental Analysis</h4>
                      <p className="text-gray-700 text-sm">P/E ratios, earnings growth, balance sheet strength, competitive positioning</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-700">Technical Analysis</h4>
                      <p className="text-gray-700 text-sm">Chart patterns, moving averages, volume analysis, momentum indicators</p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-semibold text-purple-700">Economic Indicators</h4>
                      <p className="text-gray-700 text-sm">GDP growth, inflation, employment data, Federal Reserve policy</p>
                    </div>
                    <div className="border-l-4 border-orange-400 pl-4">
                      <h4 className="font-semibold text-orange-700">Market Sentiment</h4>
                      <p className="text-gray-700 text-sm">VIX fear index, put/call ratios, insider trading, analyst ratings</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Risk Management</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">US Market Risks</h4>
                      <ul className="text-red-700 text-sm space-y-1">
                        <li>• Market volatility and economic cycles</li>
                        <li>• Interest rate changes affecting valuations</li>
                        <li>• Political and regulatory risks</li>
                        <li>• Currency risk for international investors</li>
                        <li>• Concentration risk in large technology stocks</li>
                        <li>• Inflation impact on real returns</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Begin US market investing with a systematic approach 
                    that builds knowledge and confidence over time.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Beginner's Roadmap:</h4>
                    <div className="space-y-3 text-blue-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Emergency Fund</div>
                          <div className="text-sm">Build 3-6 months of expenses in savings</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Education</div>
                          <div className="text-sm">Learn investment basics and market fundamentals</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Brokerage Account</div>
                          <div className="text-sm">Open account with reputable broker</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Start Simple</div>
                          <div className="text-sm">Begin with broad market index funds</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">5</div>
                        <div>
                          <div className="font-semibold">Gradual Expansion</div>
                          <div className="text-sm">Add complexity as knowledge grows</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Building Your USA Investment Portfolio</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Create a diversified US investment portfolio that balances 
                    growth potential with risk management for long-term success.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Sample Portfolio Allocations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3 text-center">Conservative</h4>
                      <div className="space-y-2 text-green-700 text-sm">
                        <div className="flex justify-between">
                          <span>Large-Cap Stocks:</span>
                          <span className="font-semibold">40%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>US Bonds:</span>
                          <span className="font-semibold">50%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>REITs:</span>
                          <span className="font-semibold">5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cash:</span>
                          <span className="font-semibold">5%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3 text-center">Moderate</h4>
                      <div className="space-y-2 text-blue-700 text-sm">
                        <div className="flex justify-between">
                          <span>Large-Cap Stocks:</span>
                          <span className="font-semibold">50%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mid/Small-Cap:</span>
                          <span className="font-semibold">20%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>US Bonds:</span>
                          <span className="font-semibold">25%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>REITs:</span>
                          <span className="font-semibold">5%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h4 className="font-bold text-orange-800 mb-3 text-center">Aggressive</h4>
                      <div className="space-y-2 text-orange-700 text-sm">
                        <div className="flex justify-between">
                          <span>Large-Cap Growth:</span>
                          <span className="font-semibold">40%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mid/Small-Cap:</span>
                          <span className="font-semibold">35%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Growth Sectors:</span>
                          <span className="font-semibold">15%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bonds:</span>
                          <span className="font-semibold">10%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Performance Tracking</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Monitor your US investment performance against appropriate 
                    benchmarks and adjust strategies based on results.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Benchmark</h4>
                      <div className="text-2xl font-bold text-blue-800">S&P 500</div>
                      <p className="text-blue-700 text-xs">Market standard</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-red-800 mb-1">Review Period</h4>
                      <div className="text-2xl font-bold text-red-800">Quarterly</div>
                      <p className="text-red-700 text-xs">Performance check</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-1">Rebalancing</h4>
                      <div className="text-2xl font-bold text-gray-800">Annual</div>
                      <p className="text-gray-700 text-xs">Portfolio maintenance</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Market Stats</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Market Cap</span>
                    <span className="font-semibold">$45+ Trillion</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Listed Companies</span>
                    <span className="font-semibold">4,000+</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Daily Volume</span>
                    <span className="font-semibold">$500B+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Historical Return</span>
                    <span className="font-semibold">~10% Annual</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-red-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">World's Largest</h3>
                <p className="text-sm mb-4">
                  The US stock market represents over 50% of global market capitalization and liquidity.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">50%+</div>
                  <div className="text-sm opacity-90">Global market share</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/stocks-screener" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Stock Screener
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
