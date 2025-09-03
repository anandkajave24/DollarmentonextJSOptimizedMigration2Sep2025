import Head from 'next/head';
import dynamic from 'next/dynamic';

const StockAverageCalculator = dynamic(() => import('@/pages/StockAverageCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div></div>
});

export default function StockAverageCalculatorPage() {
  return (
    <>
      <Head>
        <title>Stock Average Calculator - Dollar Cost Averaging Calculator | DollarMento</title>
        <meta name="description" content="Free stock average calculator. Calculate your average stock price with dollar cost averaging, reduce investment risk with systematic investing." />
        <meta name="keywords" content="stock average calculator, dollar cost averaging calculator, dca calculator, average stock price calculator, investment averaging" />
        <meta property="og:title" content="Stock Average Calculator - Dollar Cost Averaging Calculator" />
        <meta property="og:description" content="Calculate your average stock price and optimize dollar cost averaging strategies for better investment returns." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/stock-average-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stock Average Calculator" />
        <meta name="twitter:description" content="Free calculator for stock averaging and dollar cost averaging investment strategies." />
        <link rel="canonical" href="https://dollarmento.com/stock-average-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Stock Average Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate your average stock price with dollar cost averaging strategies. 
              Reduce investment risk and optimize your systematic investing approach.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <StockAverageCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Stock Averaging Strategies</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Stock averaging, particularly dollar cost averaging (DCA), is an investment 
                    strategy that involves buying a fixed dollar amount of a stock at regular 
                    intervals, regardless of price fluctuations.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Dollar Cost Averaging Fundamentals</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    DCA reduces the impact of volatility by spreading purchases over time, 
                    potentially lowering the average cost per share compared to lump-sum investing 
                    in volatile markets.
                  </p>

                  <div className="bg-violet-50 border border-violet-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-violet-800 mb-3">How DCA Works:</h4>
                    <div className="space-y-3 text-violet-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-violet-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Fixed Schedule</div>
                          <div className="text-sm">Invest same amount at regular intervals (weekly, monthly)</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-violet-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Variable Shares</div>
                          <div className="text-sm">Buy more shares when price is low, fewer when high</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-violet-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Average Cost</div>
                          <div className="text-sm">Potentially lower average price than lump sum</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-violet-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Reduced Risk</div>
                          <div className="text-sm">Lower impact of market timing and volatility</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">DCA vs. Lump Sum Investing</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Both strategies have merits depending on market conditions, investor 
                    psychology, and available capital. Understanding when to use each is crucial.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Aspect</th>
                          <th className="border border-gray-300 p-3 text-left">Dollar Cost Averaging</th>
                          <th className="border border-gray-300 p-3 text-left">Lump Sum</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-violet-50">
                          <td className="border border-gray-300 p-3 font-semibold">Risk Level</td>
                          <td className="border border-gray-300 p-3">Lower volatility impact</td>
                          <td className="border border-gray-300 p-3">Higher timing risk</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Potential Returns</td>
                          <td className="border border-gray-300 p-3">May miss early gains</td>
                          <td className="border border-gray-300 p-3">Maximum market exposure</td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Emotional Impact</td>
                          <td className="border border-gray-300 p-3">Reduces regret and FOMO</td>
                          <td className="border border-gray-300 p-3">Higher stress potential</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Best For</td>
                          <td className="border border-gray-300 p-3">Regular income investors</td>
                          <td className="border border-gray-300 p-3">Large capital available</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">DCA Calculation Examples</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding how averaging works in practice helps investors see 
                    the potential benefits and limitations of the strategy.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">DCA Example: $1,000 Monthly Investment</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Month</th>
                              <th className="text-left p-2">Stock Price</th>
                              <th className="text-left p-2">Investment</th>
                              <th className="text-left p-2">Shares Bought</th>
                              <th className="text-left p-2">Total Shares</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            <tr><td className="p-2">1</td><td className="p-2">$50</td><td className="p-2">$1,000</td><td className="p-2">20.0</td><td className="p-2">20.0</td></tr>
                            <tr><td className="p-2">2</td><td className="p-2">$40</td><td className="p-2">$1,000</td><td className="p-2">25.0</td><td className="p-2">45.0</td></tr>
                            <tr><td className="p-2">3</td><td className="p-2">$60</td><td className="p-2">$1,000</td><td className="p-2">16.7</td><td className="p-2">61.7</td></tr>
                            <tr><td className="p-2">4</td><td className="p-2">$45</td><td className="p-2">$1,000</td><td className="p-2">22.2</td><td className="p-2">83.9</td></tr>
                            <tr className="border-t font-semibold">
                              <td className="p-2">Total</td><td className="p-2">Avg: $47.66</td><td className="p-2">$4,000</td><td className="p-2">83.9</td><td className="p-2">$47.66/share</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Optimal DCA Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different DCA approaches can be optimized based on market conditions, 
                    investment goals, and personal financial situations.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Fixed DCA</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• Same amount invested regularly</li>
                        <li>• Easiest to implement and maintain</li>
                        <li>• Good for automated investing</li>
                        <li>• Suitable for 401(k) contributions</li>
                        <li>• Minimal decision-making required</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Value-Based DCA</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• Invest more when stocks are cheaper</li>
                        <li>• Use valuation metrics as guides</li>
                        <li>• Requires more active management</li>
                        <li>• Can enhance returns in volatile markets</li>
                        <li>• Combines DCA with value investing</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">When DCA Works Best</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    DCA is most effective in certain market conditions and investor situations. 
                    Understanding these scenarios helps optimize the strategy.
                  </p>

                  <div className="bg-violet-50 border border-violet-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-violet-800 mb-3">Ideal DCA Conditions:</h4>
                    <div className="space-y-3 text-violet-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-violet-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">📈</div>
                        <div>
                          <div className="font-semibold">Volatile Markets</div>
                          <div className="text-sm">High price swings provide averaging opportunities</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-violet-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">💰</div>
                        <div>
                          <div className="font-semibold">Regular Income</div>
                          <div className="text-sm">Steady cash flow enables consistent investing</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-violet-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">🎯</div>
                        <div>
                          <div className="font-semibold">Long-Term Goals</div>
                          <div className="text-sm">Extended time horizons smooth out volatility</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-violet-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">🧠</div>
                        <div>
                          <div className="font-semibold">Emotional Discipline</div>
                          <div className="text-sm">Removes timing decisions and reduces stress</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common DCA Mistakes</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Stopping During Downturns</h4>
                      <p className="text-gray-700 text-sm">Discontinuing DCA when markets fall defeats the purpose of the strategy</p>
                    </div>
                    <div className="border-l-4 border-orange-400 pl-4">
                      <h4 className="font-semibold text-orange-700">Trying to Time Purchases</h4>
                      <p className="text-gray-700 text-sm">Deviating from schedule based on market predictions reduces effectiveness</p>
                    </div>
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h4 className="font-semibold text-yellow-700">Inconsistent Amounts</h4>
                      <p className="text-gray-700 text-sm">Varying investment amounts reduces the averaging effect</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-700">High-Fee Investments</h4>
                      <p className="text-gray-700 text-sm">Frequent purchases of high-fee funds can erode returns</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Advanced Averaging Techniques</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Graduated DCA</h4>
                      <p className="text-gray-700 text-sm mb-2">Gradually increase investment amounts over time to account for salary growth and inflation.</p>
                      <p className="text-yellow-700 text-xs">Example: Start with $500/month, increase by 5% annually</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Opportunistic DCA</h4>
                      <p className="text-gray-700 text-sm mb-2">Increase contributions during market downturns while maintaining base schedule.</p>
                      <p className="text-purple-700 text-xs">Example: Regular $1,000 + extra $500 when market down 10%+</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Stock Average Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our calculator helps you analyze stock averaging strategies and 
                    calculate your average cost basis across multiple purchases.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Calculate weighted average cost per share</li>
                    <li>Model dollar cost averaging scenarios</li>
                    <li>Compare DCA vs. lump sum outcomes</li>
                    <li>Factor in transaction costs and fees</li>
                    <li>Analyze different investment frequencies</li>
                    <li>Project long-term accumulation patterns</li>
                    <li>Optimize timing and amounts for better averaging</li>
                  </ul>

                  <div className="bg-violet-50 border border-violet-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-violet-800 mb-3">Strategy Comparison:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-violet-700">
                      <div>
                        <h5 className="font-semibold mb-2">Scenario A: Lump Sum</h5>
                        <ul className="text-sm space-y-1">
                          <li>• $12,000 invested at $50/share</li>
                          <li>• 240 shares purchased</li>
                          <li>• Average cost: $50.00</li>
                          <li>• High timing risk</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Scenario B: DCA ($1,000/month)</h5>
                        <ul className="text-sm space-y-1">
                          <li>• $12,000 over 12 months</li>
                          <li>• 252 shares purchased</li>
                          <li>• Average cost: $47.66</li>
                          <li>• <strong>Lower risk, better price</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Implementation Guidance</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use calculator results to develop a systematic approach to stock 
                    investing that balances risk reduction with return potential.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-violet-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-violet-800 mb-1">Frequency</h4>
                      <div className="text-2xl font-bold text-violet-800">Monthly</div>
                      <p className="text-violet-700 text-xs">Optimal for most</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-purple-800 mb-1">Duration</h4>
                      <div className="text-2xl font-bold text-purple-800">5+ Years</div>
                      <p className="text-purple-700 text-xs">Long-term horizon</p>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-indigo-800 mb-1">Discipline</h4>
                      <div className="text-2xl font-bold text-indigo-800">100%</div>
                      <p className="text-indigo-700 text-xs">Consistency key</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">DCA Benefits</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Risk Reduction</span>
                    <span className="font-semibold">Lower volatility</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Discipline</span>
                    <span className="font-semibold">Automated</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Timing</span>
                    <span className="font-semibold">Eliminated</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emotions</span>
                    <span className="font-semibold">Reduced</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Averaging Effect</h3>
                <p className="text-sm mb-4">
                  DCA can reduce average cost per share in volatile markets by buying more when prices are low.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Lower</div>
                  <div className="text-sm opacity-90">Average cost</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/investment-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Calculator
                  </a>
                  <a href="/compound-interest-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Compound Interest Calculator
                  </a>
                  <a href="/portfolio-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Portfolio Calculator
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
