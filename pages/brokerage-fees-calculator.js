import Head from 'next/head';
import dynamic from 'next/dynamic';

const BrokerageFeesCalculator = dynamic(() => import('@/components/calculators/BrokerageFeesCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div></div>
});

export default function BrokerageFeesCalculatorPage() {
  return (
    <>
      <Head>
        <title>Brokerage Fees Calculator - Compare Trading Costs & Commissions | DollarMento</title>
        <meta name="description" content="Free brokerage fees calculator. Compare trading costs, commissions, and fees across brokers. Calculate impact on investment returns and find the best broker." />
        <meta name="keywords" content="brokerage fees calculator, trading fees calculator, commission calculator, stock trading costs, brokerage comparison, investment fees" />
        <meta property="og:title" content="Brokerage Fees Calculator - Compare Trading Costs & Commissions" />
        <meta property="og:description" content="Calculate and compare brokerage fees and trading costs to optimize your investment strategy and maximize returns." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/brokerage-fees-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Brokerage Fees Calculator" />
        <meta name="twitter:description" content="Free calculator to compare brokerage fees and optimize your trading costs for better investment returns." />
        <link rel="canonical" href="https://dollarmento.com/brokerage-fees-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Brokerage Fees Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare trading costs and brokerage fees across different brokers. 
              Calculate the impact on your investment returns and optimize your trading strategy.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <BrokerageFeesCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Brokerage Fees</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Brokerage fees can significantly impact your investment returns over time. Understanding 
                    different fee structures and comparing brokers helps you minimize costs and maximize 
                    your long-term investment growth.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Types of Brokerage Fees</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Brokers charge various fees for different services. Understanding each type helps 
                    you calculate the true cost of investing and compare different brokerage options.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Fee Type</th>
                          <th className="border border-gray-300 p-3 text-left">Typical Range</th>
                          <th className="border border-gray-300 p-3 text-left">When Charged</th>
                          <th className="border border-gray-300 p-3 text-left">Impact</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Stock Commissions</td>
                          <td className="border border-gray-300 p-3">$0-$7 per trade</td>
                          <td className="border border-gray-300 p-3">Each buy/sell order</td>
                          <td className="border border-gray-300 p-3">High for frequent trading</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Options Contracts</td>
                          <td className="border border-gray-300 p-3">$0.50-$1.25 per contract</td>
                          <td className="border border-gray-300 p-3">Options trading</td>
                          <td className="border border-gray-300 p-3">Adds up with volume</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">Mutual Fund Loads</td>
                          <td className="border border-gray-300 p-3">0-5.75%</td>
                          <td className="border border-gray-300 p-3">Fund purchase/sale</td>
                          <td className="border border-gray-300 p-3">Reduces returns significantly</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Account Maintenance</td>
                          <td className="border border-gray-300 p-3">$0-$50 annually</td>
                          <td className="border border-gray-300 p-3">Low balance accounts</td>
                          <td className="border border-gray-300 p-3">Fixed annual cost</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Wire Transfer</td>
                          <td className="border border-gray-300 p-3">$15-$30 per transfer</td>
                          <td className="border border-gray-300 p-3">Moving money out</td>
                          <td className="border border-gray-300 p-3">One-time cost</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Commission-Free vs. Traditional Brokers</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The brokerage industry has shifted toward commission-free trading, but understanding 
                    how brokers make money helps you evaluate the true cost of different platforms.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Commission-Free Brokers</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• $0 stock and ETF trades</li>
                        <li>• Revenue from payment for order flow</li>
                        <li>• Interest on cash balances</li>
                        <li>• Premium services and margin</li>
                        <li>• Good for buy-and-hold investors</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h4 className="font-bold text-orange-800 mb-3">Traditional Full-Service</h4>
                      <ul className="text-orange-700 text-sm space-y-2">
                        <li>• Commission per trade</li>
                        <li>• Personal financial advice</li>
                        <li>• Research and analysis</li>
                        <li>• Higher fees but more services</li>
                        <li>• Good for hands-off investors</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Hidden Costs and Expenses</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Beyond obvious commissions, several less visible costs can impact your returns. 
                    Understanding these helps you make informed decisions about brokers and investments.
                  </p>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-orange-800 mb-3">Hidden Costs to Watch:</h4>
                    <div className="space-y-3 text-orange-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-orange-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Bid-Ask Spreads</div>
                          <div className="text-sm">Difference between buy and sell prices</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-orange-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Payment for Order Flow</div>
                          <div className="text-sm">Brokers sell order flow to market makers</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-orange-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Cash Sweep Programs</div>
                          <div className="text-sm">Low interest rates on uninvested cash</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-orange-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Currency Conversion</div>
                          <div className="text-sm">Fees for international investments</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mutual Fund and ETF Expenses</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Investment products themselves carry fees that can be more significant than 
                    trading commissions. Understanding expense ratios helps you select cost-effective investments.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Expense Ratio Ranges</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• <strong>Index ETFs:</strong> 0.03% - 0.20% (very low cost)</li>
                        <li>• <strong>Active ETFs:</strong> 0.20% - 1.00% (moderate cost)</li>
                        <li>• <strong>Index Mutual Funds:</strong> 0.05% - 0.50% (low cost)</li>
                        <li>• <strong>Active Mutual Funds:</strong> 0.50% - 2.00% (higher cost)</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Impact on $10,000 Investment (20 years)</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• 0.05% expense ratio: $383 in fees</li>
                        <li>• 0.50% expense ratio: $3,718 in fees</li>
                        <li>• 1.00% expense ratio: $7,269 in fees</li>
                        <li>• 2.00% expense ratio: $13,891 in fees</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Minimizing Trading Costs</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Strategic approaches to trading and investing can significantly reduce your 
                    overall costs and improve your long-term returns.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Cost Reduction Strategies</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• Use commission-free brokers for stocks</li>
                        <li>• Choose low-cost index funds</li>
                        <li>• Minimize trading frequency</li>
                        <li>• Avoid load mutual funds</li>
                        <li>• Consider ETFs over mutual funds</li>
                        <li>• Maintain minimum balances</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                      <h4 className="font-bold text-purple-800 mb-3">When Higher Fees May Be Worth It</h4>
                      <ul className="text-purple-700 text-sm space-y-2">
                        <li>• Professional portfolio management</li>
                        <li>• Comprehensive financial planning</li>
                        <li>• Tax-loss harvesting services</li>
                        <li>• Access to institutional investments</li>
                        <li>• Complex investment strategies</li>
                        <li>• Behavioral coaching and discipline</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Brokerage Account Types</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different account types may have varying fee structures. Understanding these 
                    differences helps you choose the most cost-effective option for your situation.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Standard Taxable</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• No contribution limits</li>
                        <li>• Full access to funds</li>
                        <li>• Taxable gains and dividends</li>
                        <li>• Most flexible option</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">IRA Accounts</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Tax advantages</li>
                        <li>• Contribution limits</li>
                        <li>• May have higher minimums</li>
                        <li>• Withdrawal restrictions</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Margin Accounts</h4>
                      <ul className="text-yellow-700 text-sm space-y-1">
                        <li>• Borrow against holdings</li>
                        <li>• Margin interest charges</li>
                        <li>• Higher risk exposure</li>
                        <li>• Additional maintenance requirements</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Fee Mistakes to Avoid</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Ignoring Expense Ratios</h4>
                      <p className="text-gray-700 text-sm">High fund expenses can cost more than trading commissions over time.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Excessive Trading</h4>
                      <p className="text-gray-700 text-sm">Frequent buying and selling erodes returns through commissions and taxes.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Chasing Free Promotions</h4>
                      <p className="text-gray-700 text-sm">Free trades may come with higher spreads or inferior execution quality.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Not Reading Fee Schedules</h4>
                      <p className="text-gray-700 text-sm">Hidden fees and account minimums can add up to significant costs.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Brokerage Fees Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our brokerage fees calculator helps you compare the total cost of investing 
                    across different brokers and investment approaches.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Compare commission structures across brokers</li>
                    <li>Calculate impact of expense ratios on returns</li>
                    <li>Factor in account maintenance fees</li>
                    <li>Show total cost over different time periods</li>
                    <li>Compare frequent trading vs. buy-and-hold</li>
                    <li>Analyze cost per trade scenarios</li>
                    <li>Include options trading fees</li>
                  </ul>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-orange-800 mb-3">Example Cost Comparison:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-orange-700">
                      <div>
                        <h5 className="font-semibold mb-2">High-Cost Scenario:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• $7 per trade commission</li>
                          <li>• 1.5% expense ratio funds</li>
                          <li>• 24 trades per year</li>
                          <li>• <strong>Annual cost: $1,668</strong></li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Low-Cost Scenario:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• $0 commission trades</li>
                          <li>• 0.05% expense ratio ETFs</li>
                          <li>• 4 trades per year</li>
                          <li>• <strong>Annual cost: $50</strong></li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-white rounded border text-orange-800">
                      <strong>20-year difference:</strong> $32,360 in saved fees (on $100,000 portfolio)
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Making Cost-Effective Decisions</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use the calculator results to optimize your brokerage choice and investment 
                    strategy based on your trading frequency and investment style.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Buy & Hold</h4>
                      <div className="text-2xl font-bold text-green-800">$50</div>
                      <p className="text-green-700 text-xs">Annual fees (index funds)</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-yellow-800 mb-1">Moderate Trading</h4>
                      <div className="text-2xl font-bold text-yellow-800">$300</div>
                      <p className="text-yellow-700 text-xs">Annual fees (mixed strategy)</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-red-800 mb-1">Active Trading</h4>
                      <div className="text-2xl font-bold text-red-800">$1,500+</div>
                      <p className="text-red-700 text-xs">Annual fees (frequent trades)</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Trading Cost Quick Facts</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Stock Commissions</span>
                    <span className="font-semibold">$0-$7</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Options Contracts</span>
                    <span className="font-semibold">$0.50-$1.25</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Index ETF Expenses</span>
                    <span className="font-semibold">0.03-0.20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Fund Expenses</span>
                    <span className="font-semibold">0.50-2.00%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">20-Year Cost Impact</h3>
                <p className="text-sm mb-4">
                  High fees can cost $32,360 more than low-cost investing over 20 years.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">$32,360</div>
                  <div className="text-sm opacity-90">Potential savings</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/investment-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Calculator
                  </a>
                  <a href="/portfolio-rebalancing-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Portfolio Rebalancing Calculator
                  </a>
                  <a href="/etf-comparison-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    ETF Comparison Calculator
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