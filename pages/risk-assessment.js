import Head from 'next/head';
import dynamic from 'next/dynamic';

const RiskAssessment = dynamic(() => import('@/pages/RiskAssessment'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div></div>
});

export default function RiskAssessmentPage() {
  return (
    <>
      <Head>
        <title>Investment Risk Assessment - Portfolio Risk Analysis Tool | DollarMento</title>
        <meta name="description" content="Comprehensive investment risk assessment and portfolio risk analysis. Evaluate risk tolerance, measure portfolio volatility, and optimize risk-adjusted returns." />
        <meta name="keywords" content="risk assessment, investment risk, portfolio risk analysis, risk tolerance, volatility analysis, risk management, risk-adjusted returns" />
        <meta property="og:title" content="Investment Risk Assessment - Portfolio Risk Analysis Tool" />
        <meta property="og:description" content="Professional risk assessment tools for evaluating investment risk and optimizing portfolio performance." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/risk-assessment" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Investment Risk Assessment" />
        <meta name="twitter:description" content="Comprehensive investment risk analysis and portfolio risk assessment tools." />
        <link rel="canonical" href="https://dollarmento.com/risk-assessment" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Investment Risk Assessment
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive risk assessment and portfolio analysis tools. Evaluate risk tolerance, 
              measure volatility, and optimize your investment strategy for better risk-adjusted returns.
            </p>
          </div>

          {/* Interactive Risk Assessment Tool */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <RiskAssessment />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Investment Risk Assessment</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Investment risk assessment is the systematic evaluation of potential losses, 
                    volatility, and uncertainty in investment portfolios. Proper risk assessment 
                    helps investors make informed decisions and optimize risk-adjusted returns.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Types of Investment Risk</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding different risk types is essential for comprehensive 
                    portfolio risk management and strategic asset allocation decisions.
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">Primary Risk Categories:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-red-700">
                      <div>
                        <h5 className="font-semibold mb-2">Systematic Risks:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• <strong>Market Risk:</strong> Overall market volatility and decline</li>
                          <li>• <strong>Interest Rate Risk:</strong> Changes in interest rates</li>
                          <li>• <strong>Inflation Risk:</strong> Purchasing power erosion</li>
                          <li>• <strong>Currency Risk:</strong> Exchange rate fluctuations</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Unsystematic Risks:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• <strong>Company Risk:</strong> Business-specific factors</li>
                          <li>• <strong>Sector Risk:</strong> Industry-wide challenges</li>
                          <li>• <strong>Credit Risk:</strong> Default probability</li>
                          <li>• <strong>Liquidity Risk:</strong> Inability to sell quickly</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Risk Tolerance Assessment</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Risk tolerance evaluation considers financial capacity, emotional 
                    ability, and time horizon to determine appropriate investment strategies.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Risk Profile</th>
                          <th className="border border-gray-300 p-3 text-left">Characteristics</th>
                          <th className="border border-gray-300 p-3 text-left">Typical Allocation</th>
                          <th className="border border-gray-300 p-3 text-left">Expected Volatility</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Conservative</td>
                          <td className="border border-gray-300 p-3">Capital preservation focus</td>
                          <td className="border border-gray-300 p-3">20% stocks, 80% bonds/cash</td>
                          <td className="border border-gray-300 p-3">5-10% annual</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Moderate</td>
                          <td className="border border-gray-300 p-3">Balanced growth and stability</td>
                          <td className="border border-gray-300 p-3">60% stocks, 40% bonds</td>
                          <td className="border border-gray-300 p-3">10-15% annual</td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Aggressive</td>
                          <td className="border border-gray-300 p-3">Growth-focused, high risk tolerance</td>
                          <td className="border border-gray-300 p-3">90% stocks, 10% bonds</td>
                          <td className="border border-gray-300 p-3">15-25% annual</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Speculative</td>
                          <td className="border border-gray-300 p-3">Maximum growth, high risk</td>
                          <td className="border border-gray-300 p-3">100% growth stocks/alternatives</td>
                          <td className="border border-gray-300 p-3">20-40% annual</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quantitative Risk Metrics</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Professional risk assessment uses quantitative metrics to 
                    measure and compare risk across different investments and portfolios.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Volatility Measures</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• <strong>Standard Deviation:</strong> Price variability measurement</li>
                        <li>• <strong>Beta:</strong> Sensitivity to market movements</li>
                        <li>• <strong>VaR (Value at Risk):</strong> Potential loss estimation</li>
                        <li>• <strong>Tracking Error:</strong> Active risk vs. benchmark</li>
                        <li>• <strong>Maximum Drawdown:</strong> Largest peak-to-trough decline</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Risk-Adjusted Returns</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• <strong>Sharpe Ratio:</strong> Excess return per unit of risk</li>
                        <li>• <strong>Sortino Ratio:</strong> Downside deviation focus</li>
                        <li>• <strong>Alpha:</strong> Risk-adjusted outperformance</li>
                        <li>• <strong>Information Ratio:</strong> Active return vs. tracking error</li>
                        <li>• <strong>Calmar Ratio:</strong> Return vs. maximum drawdown</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Portfolio Risk Analysis</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Portfolio-level risk assessment considers diversification benefits, 
                    correlation effects, and overall risk-return optimization.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Diversification Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <h5 className="font-semibold mb-1">Asset Class Diversification:</h5>
                          <ul className="space-y-1">
                            <li>• Stocks, bonds, real estate, commodities spread</li>
                            <li>• Correlation analysis between asset classes</li>
                            <li>• Geographic diversification across regions</li>
                            <li>• Currency exposure and hedging considerations</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Within-Asset Diversification:</h5>
                          <ul className="space-y-1">
                            <li>• Sector and industry distribution</li>
                            <li>• Market capitalization ranges (large, mid, small)</li>
                            <li>• Growth vs. value style balance</li>
                            <li>• Individual position size limits</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Stress Testing and Scenario Analysis</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Stress testing evaluates portfolio performance under adverse 
                    conditions and extreme market scenarios to assess resilience.
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">Stress Test Scenarios:</h4>
                    <div className="space-y-3 text-red-700">
                      <div className="border-l-4 border-red-300 pl-4">
                        <h5 className="font-semibold">Market Crash Scenario</h5>
                        <p className="text-sm">20-40% equity decline, flight to quality in bonds, volatility spike</p>
                      </div>
                      <div className="border-l-4 border-red-300 pl-4">
                        <h5 className="font-semibold">Interest Rate Shock</h5>
                        <p className="text-sm">Rapid 2-3% rate increase, bond price decline, sector rotation effects</p>
                      </div>
                      <div className="border-l-4 border-red-300 pl-4">
                        <h5 className="font-semibold">Inflation Surge</h5>
                        <p className="text-sm">Unexpected inflation increase, real return erosion, asset repricing</p>
                      </div>
                      <div className="border-l-4 border-red-300 pl-4">
                        <h5 className="font-semibold">Liquidity Crisis</h5>
                        <p className="text-sm">Market liquidity disappearance, bid-ask spread widening, forced selling</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Risk Management Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Effective risk management combines prevention, mitigation, 
                    and recovery strategies to protect and optimize portfolio performance.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h4 className="font-semibold text-yellow-700">Preventive Measures</h4>
                      <p className="text-gray-700 text-sm">Diversification, asset allocation, position sizing, and quality screening</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-700">Mitigation Techniques</h4>
                      <p className="text-gray-700 text-sm">Hedging strategies, stop-loss orders, options protection, and rebalancing</p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-semibold text-purple-700">Monitoring Systems</h4>
                      <p className="text-gray-700 text-sm">Risk dashboard, alert systems, regular reviews, and performance attribution</p>
                    </div>
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-green-700">Recovery Planning</h4>
                      <p className="text-gray-700 text-sm">Crisis response protocols, rebalancing triggers, and opportunity recognition</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Behavioral Risk Factors</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Investor behavior often introduces additional risk through 
                    emotional decision-making and cognitive biases.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h4 className="font-bold text-orange-800 mb-3">Emotional Risks</h4>
                      <ul className="text-orange-700 text-sm space-y-2">
                        <li>• <strong>Panic Selling:</strong> Selling at market bottoms due to fear</li>
                        <li>• <strong>FOMO Buying:</strong> Chasing performance at market tops</li>
                        <li>• <strong>Loss Aversion:</strong> Holding losers too long</li>
                        <li>• <strong>Overconfidence:</strong> Excessive risk-taking after gains</li>
                        <li>• <strong>Paralysis:</strong> Inability to make necessary changes</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                      <h4 className="font-bold text-purple-800 mb-3">Cognitive Biases</h4>
                      <ul className="text-purple-700 text-sm space-y-2">
                        <li>• <strong>Confirmation Bias:</strong> Seeking supporting information only</li>
                        <li>• <strong>Recency Bias:</strong> Overweighting recent events</li>
                        <li>• <strong>Anchoring:</strong> Fixating on irrelevant reference points</li>
                        <li>• <strong>Herd Mentality:</strong> Following crowd behavior</li>
                        <li>• <strong>Availability Bias:</strong> Overestimating memorable events</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">ESG and Sustainability Risks</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Environmental, social, and governance factors represent 
                    increasingly important risk considerations for modern portfolios.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">ESG Risk Categories</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Climate change and environmental degradation impact</li>
                        <li>• Social license to operate and stakeholder relations</li>
                        <li>• Governance quality and management effectiveness</li>
                        <li>• Regulatory compliance and reputation risks</li>
                        <li>• Transition risks from changing business models</li>
                        <li>• Physical risks from environmental changes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Implementing Risk Assessment</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Effective risk assessment requires systematic implementation, 
                    regular monitoring, and continuous improvement of risk management processes.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Assessment Framework</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Establish clear risk tolerance and investment objectives</li>
                    <li>Implement comprehensive risk measurement systems</li>
                    <li>Develop systematic monitoring and reporting processes</li>
                    <li>Create risk-based position sizing and allocation rules</li>
                    <li>Establish rebalancing triggers and adjustment protocols</li>
                    <li>Document risk management decisions and rationale</li>
                    <li>Regular review and update of risk assessment methods</li>
                    <li>Integrate stress testing and scenario planning</li>
                  </ul>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">Risk Management Cycle:</h4>
                    <div className="space-y-3 text-red-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Risk Identification</div>
                          <div className="text-sm">Identify and categorize all relevant risk factors</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Risk Measurement</div>
                          <div className="text-sm">Quantify risks using appropriate metrics and models</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Risk Evaluation</div>
                          <div className="text-sm">Assess risk levels against tolerance and objectives</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Risk Control</div>
                          <div className="text-sm">Implement strategies to manage and mitigate risks</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Continuous Improvement</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Risk assessment effectiveness improves through regular review, 
                    backtesting, and refinement of methods and processes.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-red-800 mb-1">Review Frequency</h4>
                      <div className="text-2xl font-bold text-red-800">Monthly</div>
                      <p className="text-red-700 text-xs">Risk monitoring</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-orange-800 mb-1">Stress Testing</h4>
                      <div className="text-2xl font-bold text-orange-800">Quarterly</div>
                      <p className="text-orange-700 text-xs">Scenario analysis</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-yellow-800 mb-1">Framework Update</h4>
                      <div className="text-2xl font-bold text-yellow-800">Annual</div>
                      <p className="text-yellow-700 text-xs">Method refinement</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Risk Metrics</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Beta</span>
                    <span className="font-semibold">Market sensitivity</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Sharpe Ratio</span>
                    <span className="font-semibold">Risk-adjusted return</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">VaR</span>
                    <span className="font-semibold">Value at Risk</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Drawdown</span>
                    <span className="font-semibold">Worst decline</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Risk Control</h3>
                <p className="text-sm mb-4">
                  Proper risk assessment and management is essential for long-term investment success.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Protect</div>
                  <div className="text-sm opacity-90">Your capital</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/portfolio-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Portfolio Calculator
                  </a>
                  <a href="/investment-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Calculator
                  </a>
                  <a href="/insights" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Market Insights
                  </a>
                  <a href="/market-behaviour" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Market Behavior
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
