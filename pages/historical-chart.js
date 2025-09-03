import Head from 'next/head';
import dynamic from 'next/dynamic';

const HistoricalChart = dynamic(() => import('@/pages/HistoricalChart'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading historical market data...</p>
      </div>
    </div>
  )
});

export default function HistoricalChartPage() {
  return (
    <>
      <Head>
        <title>Historical Stock Charts - Market Data Analysis & Trends | DollarMento</title>
        <meta name="description" content="Interactive historical stock charts with comprehensive market data analysis. View price history, identify trends, and perform technical analysis on stocks, indices, and financial markets." />
        <meta name="keywords" content="historical stock charts, market data analysis, stock price history, financial charts, market trends, technical analysis, chart patterns" />
        <meta property="og:title" content="Historical Stock Charts - Market Data Analysis & Trends" />
        <meta property="og:description" content="Comprehensive historical market charts with professional analysis tools and trend identification." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/historical-chart" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Historical Stock Charts" />
        <meta name="twitter:description" content="Interactive historical market data analysis and charting tools." />
        <link rel="canonical" href="https://dollarmento.com/historical-chart" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Historical Stock Charts
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Analyze market history with interactive charts and comprehensive data. 
              Identify trends, patterns, and investment opportunities through historical market analysis.
            </p>
          </div>

          {/* Interactive Historical Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <HistoricalChart />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Historical Market Analysis</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Historical market analysis examines past price movements, trading patterns, 
                    and market behavior to identify trends, understand market cycles, and 
                    make informed investment decisions based on historical precedent.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Importance of Historical Analysis</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Historical data provides context for current market conditions and 
                    helps investors understand long-term patterns, market cycles, and the relationship 
                    between economic events and market performance.
                  </p>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-orange-800 mb-3">Benefits of Historical Analysis:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-orange-700">
                      <div>
                        <h5 className="font-semibold mb-2">Pattern Recognition:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Identify recurring market cycles</li>
                          <li>• Recognize support and resistance levels</li>
                          <li>• Spot trend reversals and continuations</li>
                          <li>• Understand seasonal patterns</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Risk Assessment:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Measure historical volatility</li>
                          <li>• Assess maximum drawdowns</li>
                          <li>• Understand correlation patterns</li>
                          <li>• Evaluate recovery timeframes</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Chart Types and Timeframes</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different chart types and timeframes reveal different aspects of 
                    market behavior and price action, each serving specific analytical purposes.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Chart Type</th>
                          <th className="border border-gray-300 p-3 text-left">Best For</th>
                          <th className="border border-gray-300 p-3 text-left">Information Provided</th>
                          <th className="border border-gray-300 p-3 text-left">Ideal Timeframe</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Line Charts</td>
                          <td className="border border-gray-300 p-3">Long-term trends</td>
                          <td className="border border-gray-300 p-3">Clean trend visualization</td>
                          <td className="border border-gray-300 p-3">Monthly, yearly</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Candlestick</td>
                          <td className="border border-gray-300 p-3">Price action analysis</td>
                          <td className="border border-gray-300 p-3">OHLC data, market sentiment</td>
                          <td className="border border-gray-300 p-3">Daily, weekly</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Bar Charts</td>
                          <td className="border border-gray-300 p-3">Traditional analysis</td>
                          <td className="border border-gray-300 p-3">OHLC data, clear ranges</td>
                          <td className="border border-gray-300 p-3">Daily, weekly</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Volume Charts</td>
                          <td className="border border-gray-300 p-3">Trading activity</td>
                          <td className="border border-gray-300 p-3">Liquidity, conviction</td>
                          <td className="border border-gray-300 p-3">All timeframes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Technical Analysis with Historical Data</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Historical charts enable comprehensive technical analysis by providing 
                    the data foundation for indicators, patterns, and trend analysis.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Trend Analysis</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• <strong>Moving Averages:</strong> 50, 100, 200-day trends</li>
                        <li>• <strong>Trendlines:</strong> Support and resistance identification</li>
                        <li>• <strong>Channel Analysis:</strong> Price range boundaries</li>
                        <li>• <strong>Trend Strength:</strong> ADX and momentum indicators</li>
                        <li>• <strong>Breakout Analysis:</strong> Pattern completion points</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Pattern Recognition</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• <strong>Chart Patterns:</strong> Head & shoulders, triangles</li>
                        <li>• <strong>Candlestick Patterns:</strong> Reversal and continuation</li>
                        <li>• <strong>Volume Patterns:</strong> Accumulation and distribution</li>
                        <li>• <strong>Fibonacci Levels:</strong> Retracement and extension</li>
                        <li>• <strong>Cycle Analysis:</strong> Time-based patterns</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Market Cycle Analysis</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Historical data reveals market cycles that repeat over time, 
                    helping investors understand where markets might be in the cycle.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Economic Cycles</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <h5 className="font-semibold mb-1">Business Cycle Phases:</h5>
                          <ul className="space-y-1">
                            <li>• Expansion: Economic growth, rising markets</li>
                            <li>• Peak: Maximum activity, market highs</li>
                            <li>• Contraction: Economic slowdown, declining markets</li>
                            <li>• Trough: Minimum activity, market lows</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Market Cycle Duration:</h5>
                          <ul className="space-y-1">
                            <li>• Bull markets: Average 2-8 years</li>
                            <li>• Bear markets: Average 6 months - 2 years</li>
                            <li>• Complete cycles: 4-7 years typically</li>
                            <li>• Secular trends: 10-20 year mega-cycles</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comparative Analysis</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Historical charts enable comparison between different assets, 
                    time periods, and market conditions to identify relative performance and correlations.
                  </p>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-orange-800 mb-3">Comparison Types:</h4>
                    <div className="space-y-3 text-orange-700">
                      <div className="border-l-4 border-orange-300 pl-4">
                        <h5 className="font-semibold">Asset Comparison</h5>
                        <p className="text-sm">Compare stocks vs. bonds, sectors, or individual securities</p>
                      </div>
                      <div className="border-l-4 border-orange-300 pl-4">
                        <h5 className="font-semibold">Time Period Analysis</h5>
                        <p className="text-sm">Compare similar market conditions across different eras</p>
                      </div>
                      <div className="border-l-4 border-orange-300 pl-4">
                        <h5 className="font-semibold">Performance Metrics</h5>
                        <p className="text-sm">Analyze returns, volatility, and risk-adjusted performance</p>
                      </div>
                      <div className="border-l-4 border-orange-300 pl-4">
                        <h5 className="font-semibold">Correlation Analysis</h5>
                        <p className="text-sm">Study how assets move together over time</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Historical Volatility Analysis</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding historical volatility helps assess risk, 
                    set realistic expectations, and identify unusual market conditions.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h4 className="font-semibold text-yellow-700">Standard Volatility Measures</h4>
                      <p className="text-gray-700 text-sm">Standard deviation, average true range, and Bollinger Band width analysis</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Extreme Events Analysis</h4>
                      <p className="text-gray-700 text-sm">Study market crashes, flash crashes, and extreme volatility periods</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-700">Volatility Clustering</h4>
                      <p className="text-gray-700 text-sm">Identify periods when high volatility tends to be followed by high volatility</p>
                    </div>
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-green-700">Regime Changes</h4>
                      <p className="text-gray-700 text-sm">Detect shifts between low and high volatility market environments</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Seasonal and Calendar Effects</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Historical data reveals seasonal patterns and calendar effects 
                    that can influence investment timing and strategy.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <h4 className="font-bold text-yellow-800 mb-3">Seasonal Patterns</h4>
                      <ul className="text-yellow-700 text-sm space-y-2">
                        <li>• <strong>January Effect:</strong> Small-cap outperformance</li>
                        <li>• <strong>Sell in May:</strong> Summer underperformance</li>
                        <li>• <strong>October Effect:</strong> Historical crash month</li>
                        <li>• <strong>Santa Claus Rally:</strong> Year-end strength</li>
                        <li>• <strong>Sector Rotation:</strong> Economic cycle patterns</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                      <h4 className="font-bold text-purple-800 mb-3">Calendar Effects</h4>
                      <ul className="text-purple-700 text-sm space-y-2">
                        <li>• <strong>Day of Week:</strong> Monday vs. Friday performance</li>
                        <li>• <strong>End of Month:</strong> Pension fund flows</li>
                        <li>• <strong>Earnings Seasons:</strong> Quarterly reporting cycles</li>
                        <li>• <strong>Ex-Dividend Dates:</strong> Price adjustments</li>
                        <li>• <strong>Options Expiration:</strong> Triple/quadruple witching</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Learning from Market History</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">Historical Lessons</h4>
                      <ul className="text-red-700 text-sm space-y-1">
                        <li>• Markets are cyclical but cycles vary in length and intensity</li>
                        <li>• Extreme events happen more frequently than models predict</li>
                        <li>• Diversification benefits change during crisis periods</li>
                        <li>• Long-term trends often persist longer than expected</li>
                        <li>• Past performance doesn't guarantee future results</li>
                        <li>• Market structure evolution affects historical comparisons</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Historical Chart Analysis</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our historical chart platform provides comprehensive tools for 
                    analyzing market history and identifying investment opportunities.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Platform Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Multi-year historical data for stocks, indices, and ETFs</li>
                    <li>Interactive charting with zoom and pan capabilities</li>
                    <li>Technical indicators and drawing tools</li>
                    <li>Comparative analysis between multiple assets</li>
                    <li>Volume analysis and trading activity data</li>
                    <li>Economic event overlays and annotations</li>
                    <li>Export capabilities for further analysis</li>
                    <li>Mobile-responsive design for all devices</li>
                  </ul>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-orange-800 mb-3">Analysis Workflow:</h4>
                    <div className="space-y-3 text-orange-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-orange-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Select Asset & Timeframe</div>
                          <div className="text-sm">Choose stock, index, or ETF with appropriate historical period</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-orange-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Apply Technical Analysis</div>
                          <div className="text-sm">Add indicators, trendlines, and pattern analysis</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-orange-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Identify Patterns</div>
                          <div className="text-sm">Look for trends, support/resistance, and cycle patterns</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-orange-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Generate Insights</div>
                          <div className="text-sm">Use analysis to inform investment decisions</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Analysis Best Practices</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Follow systematic approaches to historical analysis for 
                    more reliable insights and better investment decisions.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-orange-800 mb-1">Data Period</h4>
                      <div className="text-2xl font-bold text-orange-800">5-10 Years</div>
                      <p className="text-orange-700 text-xs">Minimum for cycles</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-yellow-800 mb-1">Multiple Timeframes</h4>
                      <div className="text-2xl font-bold text-yellow-800">3-4 Views</div>
                      <p className="text-yellow-700 text-xs">Monthly, weekly, daily</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-red-800 mb-1">Confirmation</h4>
                      <div className="text-2xl font-bold text-red-800">Multiple</div>
                      <p className="text-red-700 text-xs">Indicators & patterns</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Chart Analysis</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Trends</span>
                    <span className="font-semibold">Long-term direction</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Patterns</span>
                    <span className="font-semibold">Recurring formations</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Cycles</span>
                    <span className="font-semibold">Repetitive behavior</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Volatility</span>
                    <span className="font-semibold">Risk assessment</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-yellow-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">History Repeats</h3>
                <p className="text-sm mb-4">
                  Market history doesn't repeat exactly, but it often rhymes. Learn from the past.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Patterns</div>
                  <div className="text-sm opacity-90">Guide decisions</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/investment-market-menu" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Market Analysis Hub
                  </a>
                  <a href="/stocks-screener" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Stock Screener
                  </a>
                  <a href="/market-behaviour" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Market Behavior
                  </a>
                  <a href="/portfolio-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Portfolio Calculator
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
