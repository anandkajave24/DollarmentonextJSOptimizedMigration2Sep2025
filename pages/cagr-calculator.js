import Head from 'next/head';
import dynamic from 'next/dynamic';

const CAGRCalculator = dynamic(() => import('@/pages/CAGRCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
});

export default function CAGRCalculatorPage() {
  return (
    <>
      <Head>
        <title>CAGR Calculator - Compound Annual Growth Rate Investment Tool | DollarMento</title>
        <meta name="description" content="Free CAGR calculator for investment analysis. Calculate compound annual growth rate, compare investment performance, and analyze portfolio returns over time." />
        <meta name="keywords" content="cagr calculator, compound annual growth rate calculator, investment return calculator, portfolio performance calculator, annualized return calculator" />
        <meta property="og:title" content="CAGR Calculator - Compound Annual Growth Rate Investment Tool" />
        <meta property="og:description" content="Calculate compound annual growth rate (CAGR) for your investments and compare portfolio performance with our comprehensive CAGR calculator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/cagr-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CAGR Calculator" />
        <meta name="twitter:description" content="Free CAGR calculator to analyze investment performance and calculate compound annual growth rates." />
        <link rel="canonical" href="https://dollarmento.com/cagr-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              CAGR Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate Compound Annual Growth Rate (CAGR) for your investments. 
              Analyze portfolio performance and compare investment returns over time.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <CAGRCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to CAGR (Compound Annual Growth Rate)</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    CAGR (Compound Annual Growth Rate) is a crucial metric for evaluating investment 
                    performance over time. It represents the rate of return that would be required for 
                    an investment to grow from its beginning balance to its ending balance, assuming 
                    profits were reinvested each year.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is CAGR?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    CAGR smooths out the returns over a period, providing a constant rate of return 
                    that would yield the same final result. It's particularly useful for comparing 
                    investments with different time periods and volatility levels.
                  </p>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-indigo-800 mb-3">CAGR Formula:</h4>
                    <div className="text-center">
                      <div className="bg-white rounded-lg p-4 border text-indigo-900 font-mono text-lg">
                        CAGR = (Ending Value / Beginning Value)^(1/n) - 1
                      </div>
                      <div className="text-indigo-700 text-sm mt-2">
                        Where n = number of years
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">CAGR vs. Other Return Metrics</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding how CAGR compares to other return metrics helps you choose the right 
                    measurement for your investment analysis and decision-making.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Metric</th>
                          <th className="border border-gray-300 p-3 text-left">Calculation</th>
                          <th className="border border-gray-300 p-3 text-left">Best For</th>
                          <th className="border border-gray-300 p-3 text-left">Limitations</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">CAGR</td>
                          <td className="border border-gray-300 p-3">Geometric mean return</td>
                          <td className="border border-gray-300 p-3">Long-term comparisons</td>
                          <td className="border border-gray-300 p-3">Ignores volatility</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Average Return</td>
                          <td className="border border-gray-300 p-3">Sum of returns / years</td>
                          <td className="border border-gray-300 p-3">Simple calculations</td>
                          <td className="border border-gray-300 p-3">Overstates compound returns</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">Total Return</td>
                          <td className="border border-gray-300 p-3">(End - Start) / Start</td>
                          <td className="border border-gray-300 p-3">Overall performance</td>
                          <td className="border border-gray-300 p-3">Doesn't account for time</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">IRR</td>
                          <td className="border border-gray-300 p-3">Complex cash flow analysis</td>
                          <td className="border border-gray-300 p-3">Multiple cash flows</td>
                          <td className="border border-gray-300 p-3">Complex calculation</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">When to Use CAGR</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    CAGR is most useful in specific scenarios where you need to understand the 
                    smoothed, annualized performance of an investment over time.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Ideal Uses for CAGR</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• Comparing investments over different time periods</li>
                        <li>• Evaluating mutual fund performance</li>
                        <li>• Analyzing company revenue growth</li>
                        <li>• Setting realistic return expectations</li>
                        <li>• Long-term investment planning</li>
                        <li>• Benchmarking portfolio performance</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="font-bold text-red-800 mb-3">CAGR Limitations</h4>
                      <ul className="text-red-700 text-sm space-y-2">
                        <li>• Doesn't show volatility or risk</li>
                        <li>• Assumes steady growth (rarely realistic)</li>
                        <li>• Can be misleading for short periods</li>
                        <li>• Ignores timing of returns</li>
                        <li>• Not suitable for negative returns</li>
                        <li>• Doesn't account for dividends separately</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">CAGR Benchmarks by Asset Class</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding historical CAGR benchmarks helps you evaluate whether your 
                    investments are performing well relative to their asset class and market expectations.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Historical CAGR Benchmarks (Long-term)</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• <strong>S&P 500 Index:</strong> ~10% annually (1926-2023)</li>
                        <li>• <strong>Small-Cap Stocks:</strong> ~12% annually (higher volatility)</li>
                        <li>• <strong>International Developed Markets:</strong> ~8-9% annually</li>
                        <li>• <strong>Emerging Markets:</strong> ~9-11% annually (higher volatility)</li>
                        <li>• <strong>Bonds (10-year Treasury):</strong> ~5-6% annually</li>
                        <li>• <strong>Real Estate (REITs):</strong> ~8-10% annually</li>
                        <li>• <strong>Commodities:</strong> ~4-6% annually (high volatility)</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Risk-Adjusted Considerations</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Higher CAGR often comes with higher volatility</li>
                        <li>• Consider Sharpe ratio for risk-adjusted returns</li>
                        <li>• Maximum drawdown shows worst-case scenarios</li>
                        <li>• Diversification can improve risk-adjusted CAGR</li>
                        <li>• Past performance doesn't guarantee future results</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">CAGR in Investment Strategy</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Using CAGR effectively in your investment strategy requires understanding how 
                    to interpret results and apply them to portfolio construction and evaluation.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Strategic Applications:</h4>
                    <div className="space-y-3 text-blue-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Goal Setting</div>
                          <div className="text-sm">Use realistic CAGR assumptions for retirement planning</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Performance Evaluation</div>
                          <div className="text-sm">Compare portfolio CAGR to appropriate benchmarks</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Asset Allocation</div>
                          <div className="text-sm">Balance expected CAGR with risk tolerance</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Investment Selection</div>
                          <div className="text-sm">Choose investments with consistent long-term CAGR</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">CAGR Analysis Examples</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Real-world examples help illustrate how CAGR can reveal different perspectives 
                    on investment performance and help guide decision-making.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Example 1: Stock Investment</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Initial Investment: $10,000</li>
                        <li>• Final Value: $25,000</li>
                        <li>• Time Period: 8 years</li>
                        <li>• <strong>CAGR: 12.1%</strong></li>
                        <li>• Excellent long-term performance</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h4 className="font-bold text-orange-800 mb-3">Example 2: Mutual Fund</h4>
                      <ul className="text-orange-700 text-sm space-y-1">
                        <li>• Initial Investment: $50,000</li>
                        <li>• Final Value: $85,000</li>
                        <li>• Time Period: 10 years</li>
                        <li>• <strong>CAGR: 5.4%</strong></li>
                        <li>• Modest but steady growth</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common CAGR Mistakes</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Ignoring Risk and Volatility</h4>
                      <p className="text-gray-700 text-sm">Two investments with the same CAGR can have vastly different risk profiles.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Using Short Time Periods</h4>
                      <p className="text-gray-700 text-sm">CAGR is most meaningful over longer periods (5+ years) to smooth out volatility.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Assuming Linear Growth</h4>
                      <p className="text-gray-700 text-sm">CAGR represents an average; actual returns will vary significantly year to year.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Cherry-Picking Time Periods</h4>
                      <p className="text-gray-700 text-sm">Start and end dates can dramatically affect CAGR; use consistent, meaningful periods.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our CAGR Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our CAGR calculator helps you analyze investment performance and compare 
                    different investment options using accurate compound annual growth rate calculations.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Calculate CAGR for any time period</li>
                    <li>Compare multiple investments side-by-side</li>
                    <li>Include dividend reinvestment in calculations</li>
                    <li>Project future values based on CAGR</li>
                    <li>Analyze required CAGR to reach financial goals</li>
                    <li>Account for additional contributions</li>
                    <li>Generate performance reports and charts</li>
                  </ul>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-indigo-800 mb-3">CAGR Interpretation Guide:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-indigo-700">
                      <div>
                        <h5 className="font-semibold mb-2">Conservative (4-6%):</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Bonds, CDs</li>
                          <li>• Low risk</li>
                          <li>• Stable returns</li>
                          <li>• Capital preservation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Moderate (7-10%):</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Index funds</li>
                          <li>• Balanced portfolios</li>
                          <li>• Market-level returns</li>
                          <li>• Long-term growth</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Aggressive (11%+):</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Growth stocks</li>
                          <li>• Small-cap funds</li>
                          <li>• Higher volatility</li>
                          <li>• Greater risk/reward</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">CAGR-Based Investment Planning</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use CAGR calculations to make informed decisions about portfolio allocation, 
                    retirement planning, and long-term financial goal setting.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Conservative Plan</h4>
                      <div className="text-2xl font-bold text-blue-800">6%</div>
                      <p className="text-blue-700 text-xs">CAGR assumption</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Balanced Plan</h4>
                      <div className="text-2xl font-bold text-green-800">8%</div>
                      <p className="text-green-700 text-xs">CAGR assumption</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-purple-800 mb-1">Growth Plan</h4>
                      <div className="text-2xl font-bold text-purple-800">10%</div>
                      <p className="text-purple-700 text-xs">CAGR assumption</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">CAGR Quick Facts</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">S&P 500 Historical</span>
                    <span className="font-semibold">~10% CAGR</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Conservative Goal</span>
                    <span className="font-semibold">6-7% CAGR</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Aggressive Goal</span>
                    <span className="font-semibold">10%+ CAGR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minimum Period</span>
                    <span className="font-semibold">5+ years</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Power of Compounding</h3>
                <p className="text-sm mb-4">
                  10% CAGR turns $10,000 into $67,275 over 20 years through compound growth.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">$67,275</div>
                  <div className="text-sm opacity-90">20-year growth</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/compound-interest-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Compound Interest Calculator
                  </a>
                  <a href="/investment-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Calculator
                  </a>
                  <a href="/portfolio-return-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Portfolio Return Calculator
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
