import Head from 'next/head';
import dynamic from 'next/dynamic';

const StocksScreener = dynamic(() => import('@/pages/StocksScreener'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading stock screener...</p>
      </div>
    </div>
  )
});

export default function StockScreenerPage() {
  return (
    <>
      <Head>
        <title>Stock Screener - Advanced Stock Filtering & Analysis Tool | DollarMento</title>
        <meta name="description" content="Advanced stock screener with real-time filtering. Find investment opportunities by market cap, P/E ratio, dividend yield, growth rates, and 50+ technical indicators." />
        <meta name="keywords" content="stock screener, stock finder, investment screening, stock analysis, stock research, value stocks, growth stocks, dividend stocks" />
        <meta property="og:title" content="Stock Screener - Advanced Stock Filtering & Analysis Tool" />
        <meta property="og:description" content="Advanced stock screening tool to find the best investment opportunities with real-time filtering." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/stocks-screener" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stock Screener - Advanced Stock Analysis" />
        <meta name="twitter:description" content="Free advanced stock screener with real-time filtering and analysis tools." />
        <link rel="canonical" href="https://dollarmento.com/stocks-screener" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Advanced Stock Screener
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the best investment opportunities with our comprehensive stock screening tool. 
              Filter by fundamentals, technicals, and market metrics to discover your next winning stock.
            </p>
          </div>

          {/* Interactive Stock Screener */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <StocksScreener />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Stock Screening</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Stock screening is the process of filtering stocks based on specific criteria 
                    to identify investment opportunities that match your investment strategy, 
                    risk tolerance, and financial goals.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">How Stock Screening Works</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Stock screeners analyze thousands of stocks simultaneously, applying 
                    your chosen filters to narrow down the universe of potential investments 
                    to a manageable list of candidates for further research.
                  </p>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">Screening Process:</h4>
                    <div className="space-y-3 text-purple-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Define Criteria</div>
                          <div className="text-sm">Set specific financial and technical parameters</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Apply Filters</div>
                          <div className="text-sm">Screen thousands of stocks instantly</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Review Results</div>
                          <div className="text-sm">Analyze filtered stock list for opportunities</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Deep Research</div>
                          <div className="text-sm">Conduct detailed analysis on promising candidates</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Screening Categories</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Stock screening criteria fall into several main categories, each providing 
                    different insights into a company's financial health and investment potential.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Category</th>
                          <th className="border border-gray-300 p-3 text-left">Key Metrics</th>
                          <th className="border border-gray-300 p-3 text-left">Purpose</th>
                          <th className="border border-gray-300 p-3 text-left">Best For</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Valuation</td>
                          <td className="border border-gray-300 p-3">P/E, P/B, P/S, EV/EBITDA</td>
                          <td className="border border-gray-300 p-3">Find undervalued stocks</td>
                          <td className="border border-gray-300 p-3">Value investors</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Growth</td>
                          <td className="border border-gray-300 p-3">Revenue growth, EPS growth</td>
                          <td className="border border-gray-300 p-3">Identify growth companies</td>
                          <td className="border border-gray-300 p-3">Growth investors</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Quality</td>
                          <td className="border border-gray-300 p-3">ROE, ROA, debt ratios</td>
                          <td className="border border-gray-300 p-3">Assess financial strength</td>
                          <td className="border border-gray-300 p-3">Quality investors</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Dividend</td>
                          <td className="border border-gray-300 p-3">Yield, payout ratio, growth</td>
                          <td className="border border-gray-300 p-3">Find income stocks</td>
                          <td className="border border-gray-300 p-3">Income investors</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">Technical</td>
                          <td className="border border-gray-300 p-3">RSI, volume, price patterns</td>
                          <td className="border border-gray-300 p-3">Timing entry/exit</td>
                          <td className="border border-gray-300 p-3">Technical traders</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Fundamental Analysis Metrics</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Fundamental screening focuses on financial health, valuation, and 
                    business performance to identify companies with strong investment prospects.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Valuation Metrics</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• <strong>P/E Ratio:</strong> Price vs. earnings comparison</li>
                        <li>• <strong>P/B Ratio:</strong> Price vs. book value assessment</li>
                        <li>• <strong>PEG Ratio:</strong> P/E adjusted for growth rate</li>
                        <li>• <strong>Price-to-Sales:</strong> Revenue-based valuation</li>
                        <li>• <strong>EV/EBITDA:</strong> Enterprise value efficiency</li>
                        <li>• <strong>Dividend Yield:</strong> Income return percentage</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Quality Indicators</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• <strong>ROE:</strong> Return on shareholder equity</li>
                        <li>• <strong>ROA:</strong> Return on total assets</li>
                        <li>• <strong>Debt-to-Equity:</strong> Financial leverage ratio</li>
                        <li>• <strong>Current Ratio:</strong> Short-term liquidity</li>
                        <li>• <strong>Profit Margins:</strong> Operational efficiency</li>
                        <li>• <strong>Free Cash Flow:</strong> Cash generation ability</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Technical Analysis Filters</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Technical screening analyzes price patterns, momentum indicators, and 
                    trading volume to identify stocks with favorable chart characteristics.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Momentum Indicators</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <h5 className="font-semibold mb-1">RSI (Relative Strength Index):</h5>
                          <p>Measures overbought/oversold conditions (0-100 scale)</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">MACD (Moving Average Convergence):</h5>
                          <p>Trend-following momentum indicator</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Moving Averages:</h5>
                          <p>Price trend direction and support/resistance</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Volume Analysis:</h5>
                          <p>Trading activity and institutional interest</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Investment Strategy Screens</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different investment strategies require specific screening criteria 
                    to identify stocks that align with your investment philosophy and goals.
                  </p>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">Popular Screening Strategies:</h4>
                    <div className="space-y-4 text-purple-700">
                      <div className="border-l-4 border-purple-300 pl-4">
                        <h5 className="font-semibold">Value Investing Screen:</h5>
                        <p className="text-sm">Low P/E (&lt;15), Low P/B (&lt;1.5), High ROE (&gt;15%), Low debt-to-equity</p>
                      </div>
                      <div className="border-l-4 border-purple-300 pl-4">
                        <h5 className="font-semibold">Growth Investing Screen:</h5>
                        <p className="text-sm">EPS growth &gt;20%, Revenue growth &gt;15%, PEG &lt;1.5, Strong margins</p>
                      </div>
                      <div className="border-l-4 border-purple-300 pl-4">
                        <h5 className="font-semibold">Dividend Income Screen:</h5>
                        <p className="text-sm">Yield &gt;3%, Payout ratio &lt;60%, 5+ years dividend growth, Large cap</p>
                      </div>
                      <div className="border-l-4 border-purple-300 pl-4">
                        <h5 className="font-semibold">Momentum Trading Screen:</h5>
                        <p className="text-sm">RSI 30-70, Above 50-day MA, High volume, Price near 52-week high</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Screening Best Practices</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h4 className="font-semibold text-yellow-700">Start Broad, Then Narrow</h4>
                      <p className="text-gray-700 text-sm">Begin with basic criteria, then add filters progressively to avoid eliminating good opportunities</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-700">Use Multiple Criteria</h4>
                      <p className="text-gray-700 text-sm">Combine valuation, quality, and growth metrics for more robust stock selection</p>
                    </div>
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-green-700">Consider Market Conditions</h4>
                      <p className="text-gray-700 text-sm">Adjust screening criteria based on current economic environment and market cycle</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Validate with Research</h4>
                      <p className="text-gray-700 text-sm">Always conduct thorough research on screened stocks before making investment decisions</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Screening Mistakes</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">Mistakes to Avoid</h4>
                      <ul className="text-red-700 text-sm space-y-1">
                        <li>• Using too many filters and eliminating all stocks</li>
                        <li>• Focusing only on one metric without context</li>
                        <li>• Ignoring industry and sector considerations</li>
                        <li>• Not considering market capitalization effects</li>
                        <li>• Screening without understanding business fundamentals</li>
                        <li>• Failing to validate with qualitative analysis</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Advanced Stock Screener</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our stock screener provides comprehensive filtering capabilities 
                    with real-time data to help you find investment opportunities efficiently.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Screener Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Real-time stock data with 50+ screening criteria</li>
                    <li>Fundamental analysis metrics and ratios</li>
                    <li>Technical indicators and chart patterns</li>
                    <li>Market cap and sector filtering options</li>
                    <li>Dividend and income-focused screening</li>
                    <li>Growth and momentum indicators</li>
                    <li>Custom screening combinations and presets</li>
                    <li>Export and save screening results</li>
                  </ul>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">Example Screen: Quality Value Stocks</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-700">
                      <div>
                        <h5 className="font-semibold mb-2">Screening Criteria:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• P/E Ratio: 8-15</li>
                          <li>• ROE: &gt;15%</li>
                          <li>• Debt-to-Equity: &lt;0.5</li>
                          <li>• Market Cap: &gt;$1B</li>
                          <li>• Revenue Growth: &gt;5%</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Typical Results:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• 50-100 stocks identified</li>
                          <li>• Quality companies at fair prices</li>
                          <li>• Strong financial health</li>
                          <li>• <strong>Further research required</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Professional Tips</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Maximize the effectiveness of your stock screening with these 
                    professional strategies used by successful investors and analysts.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-purple-800 mb-1">Screen Weekly</h4>
                      <div className="text-2xl font-bold text-purple-800">7 Days</div>
                      <p className="text-purple-700 text-xs">Regular screening frequency</p>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-indigo-800 mb-1">Top Picks</h4>
                      <div className="text-2xl font-bold text-indigo-800">5-10</div>
                      <p className="text-indigo-700 text-xs">Stocks for deep research</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Research Time</h4>
                      <div className="text-2xl font-bold text-blue-800">2-4 Hours</div>
                      <p className="text-blue-700 text-xs">Per final candidate</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Filters</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Value Stocks</span>
                    <span className="font-semibold">P/E &lt; 15</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Growth Stocks</span>
                    <span className="font-semibold">Growth &gt; 20%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Dividend Stocks</span>
                    <span className="font-semibold">Yield &gt; 3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quality Stocks</span>
                    <span className="font-semibold">ROE &gt; 15%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Pro Tip</h3>
                <p className="text-sm mb-4">
                  The best screens combine 3-5 criteria across valuation, quality, and growth metrics.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">3-5</div>
                  <div className="text-sm opacity-90">Optimal criteria count</div>
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
                  <a href="/risk-assessment" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Risk Assessment
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
