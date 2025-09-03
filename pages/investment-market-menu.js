import Head from 'next/head';
import dynamic from 'next/dynamic';

const InvestmentMarketMenu = dynamic(() => import('@/pages/InvestmentMarketMenu'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading market analysis tools...</p>
      </div>
    </div>
  )
});

export default function InvestmentMarketMenuPage() {
  return (
    <>
      <Head>
        <title>Investment Market Analysis Hub - Real-Time Data & Tools | DollarMento</title>
        <meta name="description" content="Comprehensive investment market analysis hub with real-time data, market insights, technical analysis tools, and professional trading resources." />
        <meta name="keywords" content="market analysis, investment tools, real-time market data, trading analysis, market insights, financial data hub" />
        <meta property="og:title" content="Investment Market Analysis Hub - Real-Time Data & Tools" />
        <meta property="og:description" content="Professional market analysis tools and real-time investment data for informed decision-making." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/investment-market-menu" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Investment Market Analysis Hub" />
        <meta name="twitter:description" content="Real-time market data and professional investment analysis tools." />
        <link rel="canonical" href="https://dollarmento.com/investment-market-menu" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Investment Market Analysis Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access comprehensive market analysis tools, real-time data, and professional insights 
              to make informed investment decisions and track market performance.
            </p>
          </div>

          {/* Interactive Market Menu */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <InvestmentMarketMenu />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Market Analysis Guide</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Market analysis is the systematic examination of financial markets, securities, 
                    and economic conditions to identify investment opportunities and assess risk. 
                    Professional analysis combines technical, fundamental, and sentiment indicators.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Types of Market Analysis</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Successful investing requires multiple analytical approaches to gain 
                    comprehensive market understanding and make informed investment decisions.
                  </p>

                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-cyan-800 mb-3">Analysis Categories:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-cyan-700">
                      <div>
                        <h5 className="font-semibold mb-2">Technical Analysis:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Chart patterns and trends</li>
                          <li>• Price action and volume</li>
                          <li>• Technical indicators (RSI, MACD)</li>
                          <li>• Support and resistance levels</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Fundamental Analysis:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Financial statement analysis</li>
                          <li>• Valuation metrics and ratios</li>
                          <li>• Economic indicators</li>
                          <li>• Industry and sector analysis</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Real-Time Market Data</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Access to real-time market data is crucial for modern investing, 
                    enabling timely decisions and accurate portfolio tracking.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Data Type</th>
                          <th className="border border-gray-300 p-3 text-left">Update Frequency</th>
                          <th className="border border-gray-300 p-3 text-left">Key Metrics</th>
                          <th className="border border-gray-300 p-3 text-left">Use Cases</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Stock Prices</td>
                          <td className="border border-gray-300 p-3">Real-time</td>
                          <td className="border border-gray-300 p-3">Bid/Ask, Volume, Last Price</td>
                          <td className="border border-gray-300 p-3">Trading, Portfolio tracking</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Market Indices</td>
                          <td className="border border-gray-300 p-3">Real-time</td>
                          <td className="border border-gray-300 p-3">S&P 500, NASDAQ, Dow Jones</td>
                          <td className="border border-gray-300 p-3">Market sentiment</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Economic Data</td>
                          <td className="border border-gray-300 p-3">Scheduled releases</td>
                          <td className="border border-gray-300 p-3">GDP, Inflation, Employment</td>
                          <td className="border border-gray-300 p-3">Macro analysis</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">News & Events</td>
                          <td className="border border-gray-300 p-3">Continuous</td>
                          <td className="border border-gray-300 p-3">Earnings, Announcements</td>
                          <td className="border border-gray-300 p-3">Event-driven trading</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Market Analysis Tools</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Professional market analysis requires sophisticated tools that process 
                    large amounts of data and provide actionable insights.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Charting Tools</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• <strong>Candlestick Charts:</strong> OHLC price visualization</li>
                        <li>• <strong>Moving Averages:</strong> Trend identification</li>
                        <li>• <strong>Volume Analysis:</strong> Trading activity insights</li>
                        <li>• <strong>Bollinger Bands:</strong> Volatility indicators</li>
                        <li>• <strong>Fibonacci Retracements:</strong> Support/resistance</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Screening Tools</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• <strong>Stock Screeners:</strong> Filter by criteria</li>
                        <li>• <strong>Sector Analysis:</strong> Industry comparisons</li>
                        <li>• <strong>Valuation Metrics:</strong> P/E, P/B ratios</li>
                        <li>• <strong>Growth Indicators:</strong> Revenue, earnings growth</li>
                        <li>• <strong>Risk Metrics:</strong> Beta, volatility measures</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Market Sentiment Analysis</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding market sentiment helps investors gauge overall market 
                    mood and identify potential turning points or extremes.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Sentiment Indicators</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <h5 className="font-semibold mb-1">Fear & Greed Index:</h5>
                          <p>Composite measure of market emotions</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">VIX (Volatility Index):</h5>
                          <p>Market fear and uncertainty gauge</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Put/Call Ratio:</h5>
                          <p>Options activity sentiment indicator</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Insider Trading:</h5>
                          <p>Corporate insider buying/selling activity</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Economic Indicators</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Economic indicators provide insight into overall economic health 
                    and help predict market direction and investment opportunities.
                  </p>

                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-cyan-800 mb-3">Key Economic Indicators:</h4>
                    <div className="space-y-3 text-cyan-700">
                      <div className="border-l-4 border-cyan-300 pl-4">
                        <h5 className="font-semibold">Leading Indicators</h5>
                        <p className="text-sm">Stock prices, yield curve, consumer confidence, new business formation</p>
                      </div>
                      <div className="border-l-4 border-cyan-300 pl-4">
                        <h5 className="font-semibold">Coincident Indicators</h5>
                        <p className="text-sm">GDP, employment levels, industrial production, personal income</p>
                      </div>
                      <div className="border-l-4 border-cyan-300 pl-4">
                        <h5 className="font-semibold">Lagging Indicators</h5>
                        <p className="text-sm">Unemployment rate, inflation, interest rates, corporate profits</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Portfolio Analysis</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Regular portfolio analysis ensures investments remain aligned 
                    with goals and helps identify optimization opportunities.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-green-700">Performance Metrics</h4>
                      <p className="text-gray-700 text-sm">Total return, risk-adjusted returns, Sharpe ratio, alpha and beta analysis</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-700">Risk Analysis</h4>
                      <p className="text-gray-700 text-sm">Volatility measures, correlation analysis, Value at Risk (VaR), stress testing</p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-semibold text-purple-700">Asset Allocation</h4>
                      <p className="text-gray-700 text-sm">Sector distribution, geographical allocation, style analysis, rebalancing needs</p>
                    </div>
                    <div className="border-l-4 border-orange-400 pl-4">
                      <h4 className="font-semibold text-orange-700">Tax Efficiency</h4>
                      <p className="text-gray-700 text-sm">Tax-loss harvesting opportunities, asset location optimization, turnover analysis</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Analysis Best Practices</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Professional Approach</h4>
                      <ul className="text-yellow-700 text-sm space-y-1">
                        <li>• Use multiple analysis methods for confirmation</li>
                        <li>• Focus on long-term trends over short-term noise</li>
                        <li>• Consider macroeconomic context in all analysis</li>
                        <li>• Maintain analytical objectivity and avoid bias</li>
                        <li>• Regular review and adjustment of analytical framework</li>
                        <li>• Document analysis process and decision rationale</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Market Analysis Tools</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our market analysis hub provides comprehensive tools for 
                    professional-grade market research and investment decision-making.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Platform Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Real-time market data and price feeds</li>
                    <li>Advanced charting with technical indicators</li>
                    <li>Fundamental analysis and screening tools</li>
                    <li>Economic calendar and news integration</li>
                    <li>Portfolio tracking and performance analysis</li>
                    <li>Risk management and alert systems</li>
                    <li>Market sentiment and volatility indicators</li>
                    <li>Mobile-responsive design for all devices</li>
                  </ul>

                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-cyan-800 mb-3">Getting Started:</h4>
                    <div className="space-y-3 text-cyan-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-cyan-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Choose Analysis Type</div>
                          <div className="text-sm">Select technical, fundamental, or sentiment analysis</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-cyan-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Set Parameters</div>
                          <div className="text-sm">Configure time frames, indicators, and criteria</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-cyan-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Analyze Results</div>
                          <div className="text-sm">Review data and identify patterns or opportunities</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-cyan-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Make Decisions</div>
                          <div className="text-sm">Use insights to inform investment choices</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Professional Tips</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Maximize the effectiveness of market analysis by following 
                    professional best practices and systematic approaches.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-cyan-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-cyan-800 mb-1">Daily Review</h4>
                      <div className="text-2xl font-bold text-cyan-800">30min</div>
                      <p className="text-cyan-700 text-xs">Market check time</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Analysis Depth</h4>
                      <div className="text-2xl font-bold text-blue-800">Multi-layer</div>
                      <p className="text-blue-700 text-xs">Technical + Fundamental</p>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-indigo-800 mb-1">Review Cycle</h4>
                      <div className="text-2xl font-bold text-indigo-800">Weekly</div>
                      <p className="text-indigo-700 text-xs">Strategy assessment</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Analysis Tools</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Technical</span>
                    <span className="font-semibold">Charts & Indicators</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Fundamental</span>
                    <span className="font-semibold">Financial Metrics</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Sentiment</span>
                    <span className="font-semibold">Market Mood</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Economic</span>
                    <span className="font-semibold">Macro Indicators</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Real-Time Data</h3>
                <p className="text-sm mb-4">
                  Professional market analysis requires real-time data and comprehensive tools.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Live</div>
                  <div className="text-sm opacity-90">Market updates</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/stocks-screener" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Stock Screener
                  </a>
                  <a href="/historical-chart" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Historical Charts
                  </a>
                  <a href="/portfolio-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Portfolio Calculator
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
