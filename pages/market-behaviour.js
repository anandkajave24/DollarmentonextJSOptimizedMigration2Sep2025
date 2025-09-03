import Head from 'next/head';
import dynamic from 'next/dynamic';

const MarketBehaviour = dynamic(() => import('@/pages/MarketBehaviour'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div></div>
});

export default function MarketBehaviourPage() {
  return (
    <>
      <Head>
        <title>Market Behavior Psychology - Understanding Investor Psychology | DollarMento</title>
        <meta name="description" content="Learn market behavior psychology, investor sentiment, and behavioral finance principles. Understand market cycles, crowd psychology, and emotional investing patterns." />
        <meta name="keywords" content="market behavior, investor psychology, behavioral finance, market sentiment, crowd psychology, emotional investing, market cycles" />
        <meta property="og:title" content="Market Behavior Psychology - Understanding Investor Psychology" />
        <meta property="og:description" content="Master market psychology and behavioral finance to improve investment decisions and understand market patterns." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/market-behaviour" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Market Behavior Psychology" />
        <meta name="twitter:description" content="Understanding investor psychology and market behavior patterns for better investing." />
        <link rel="canonical" href="https://dollarmento.com/market-behaviour" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Market Behavior Psychology
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand market psychology, investor behavior patterns, and crowd dynamics. 
              Master behavioral finance principles to make better investment decisions.
            </p>
          </div>

          {/* Interactive Market Behavior Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <MarketBehaviour />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Market Psychology</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Market behavior is driven by collective psychology, where individual emotions 
                    and biases aggregate into market-wide patterns. Understanding these psychological 
                    forces is crucial for successful investing and risk management.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Behavioral Finance Fundamentals</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Behavioral finance combines psychology with economics to explain 
                    why investors make irrational decisions and how these behaviors affect markets.
                  </p>

                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-teal-800 mb-3">Core Psychological Biases:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-teal-700">
                      <div>
                        <h5 className="font-semibold mb-2">Emotional Biases:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• <strong>Fear:</strong> Panic selling during downturns</li>
                          <li>• <strong>Greed:</strong> Overconfident buying in bubbles</li>
                          <li>• <strong>Hope:</strong> Holding losing positions too long</li>
                          <li>• <strong>Regret:</strong> Avoiding decisions after losses</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Cognitive Biases:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• <strong>Overconfidence:</strong> Overestimating abilities</li>
                          <li>• <strong>Anchoring:</strong> Fixating on irrelevant information</li>
                          <li>• <strong>Confirmation:</strong> Seeking supporting evidence</li>
                          <li>• <strong>Recency:</strong> Overweighting recent events</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Market Cycle Psychology</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Market cycles are driven by collective investor emotions that create 
                    predictable patterns of optimism, euphoria, fear, and despair.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Cycle Phase</th>
                          <th className="border border-gray-300 p-3 text-left">Emotion</th>
                          <th className="border border-gray-300 p-3 text-left">Behavior</th>
                          <th className="border border-gray-300 p-3 text-left">Market Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Optimism</td>
                          <td className="border border-gray-300 p-3">Hope</td>
                          <td className="border border-gray-300 p-3">Cautious buying</td>
                          <td className="border border-gray-300 p-3">Early recovery</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Excitement</td>
                          <td className="border border-gray-300 p-3">Confidence</td>
                          <td className="border border-gray-300 p-3">Increased participation</td>
                          <td className="border border-gray-300 p-3">Steady gains</td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Euphoria</td>
                          <td className="border border-gray-300 p-3">Greed</td>
                          <td className="border border-gray-300 p-3">Aggressive buying</td>
                          <td className="border border-gray-300 p-3">Market peak</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Anxiety</td>
                          <td className="border border-gray-300 p-3">Uncertainty</td>
                          <td className="border border-gray-300 p-3">Reduced buying</td>
                          <td className="border border-gray-300 p-3">Volatility increases</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">Fear</td>
                          <td className="border border-gray-300 p-3">Panic</td>
                          <td className="border border-gray-300 p-3">Selling pressure</td>
                          <td className="border border-gray-300 p-3">Sharp decline</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Despair</td>
                          <td className="border border-gray-300 p-3">Hopelessness</td>
                          <td className="border border-gray-300 p-3">Capitulation</td>
                          <td className="border border-gray-300 p-3">Market bottom</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Crowd Psychology</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Markets are driven by collective behavior where individual 
                    psychology aggregates into crowd dynamics and herd mentality.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h4 className="font-bold text-orange-800 mb-3">Herd Behavior</h4>
                      <ul className="text-orange-700 text-sm space-y-2">
                        <li>• <strong>Following the Crowd:</strong> Mimicking others' actions</li>
                        <li>• <strong>Social Proof:</strong> Using others as decision guide</li>
                        <li>• <strong>FOMO:</strong> Fear of missing profitable opportunities</li>
                        <li>• <strong>Momentum Trading:</strong> Chasing trends and winners</li>
                        <li>• <strong>Bubble Formation:</strong> Collective overvaluation</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="font-bold text-red-800 mb-3">Contrarian Opportunities</h4>
                      <ul className="text-red-700 text-sm space-y-2">
                        <li>• <strong>Extreme Sentiment:</strong> Buy fear, sell greed</li>
                        <li>• <strong>Oversold Conditions:</strong> Market overreactions</li>
                        <li>• <strong>Value Emergence:</strong> Quality at discounts</li>
                        <li>• <strong>Mean Reversion:</strong> Return to fundamentals</li>
                        <li>• <strong>Crisis Opportunities:</strong> Long-term value creation</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Sentiment Indicators</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Market sentiment can be measured through various indicators 
                    that help identify crowd psychology extremes and turning points.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Sentiment Metrics</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <h5 className="font-semibold mb-1">VIX (Fear Index):</h5>
                          <p>Market volatility and fear measurement</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Put/Call Ratio:</h5>
                          <p>Options trading sentiment indicator</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Margin Debt:</h5>
                          <p>Investor leverage and confidence levels</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Insider Trading:</h5>
                          <p>Corporate insider buying/selling activity</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Short Interest:</h5>
                          <p>Bearish sentiment and positioning</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Fund Flows:</h5>
                          <p>Money movement in/out of markets</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Behavioral Patterns</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Recognizing common behavioral patterns helps investors avoid 
                    emotional mistakes and capitalize on others' psychological biases.
                  </p>

                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-teal-800 mb-3">Destructive Patterns:</h4>
                    <div className="space-y-3 text-teal-700">
                      <div className="border-l-4 border-teal-300 pl-4">
                        <h5 className="font-semibold">Loss Aversion</h5>
                        <p className="text-sm">Feeling losses twice as intensely as equivalent gains</p>
                      </div>
                      <div className="border-l-4 border-teal-300 pl-4">
                        <h5 className="font-semibold">Mental Accounting</h5>
                        <p className="text-sm">Treating money differently based on its source or purpose</p>
                      </div>
                      <div className="border-l-4 border-teal-300 pl-4">
                        <h5 className="font-semibold">Disposition Effect</h5>
                        <p className="text-sm">Selling winners too early and holding losers too long</p>
                      </div>
                      <div className="border-l-4 border-teal-300 pl-4">
                        <h5 className="font-semibold">Home Bias</h5>
                        <p className="text-sm">Overinvesting in familiar domestic markets</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Overcoming Psychological Biases</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Successful investors develop systematic approaches to minimize 
                    the impact of emotional and cognitive biases on investment decisions.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-green-700">Systematic Decision Making</h4>
                      <p className="text-gray-700 text-sm">Use checklists, rules, and systematic processes to reduce emotional influence</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-700">Diversification Strategy</h4>
                      <p className="text-gray-700 text-sm">Spread risk across time, assets, and strategies to reduce single-decision impact</p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-semibold text-purple-700">Long-term Perspective</h4>
                      <p className="text-gray-700 text-sm">Focus on long-term goals to avoid short-term emotional reactions</p>
                    </div>
                    <div className="border-l-4 border-orange-400 pl-4">
                      <h4 className="font-semibold text-orange-700">Education and Awareness</h4>
                      <p className="text-gray-700 text-sm">Study behavioral finance to recognize and counteract personal biases</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Market Timing Psychology</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Timing Challenges</h4>
                      <ul className="text-yellow-700 text-sm space-y-1">
                        <li>• Emotional decisions often occur at market extremes</li>
                        <li>• News and media amplify emotional responses</li>
                        <li>• Short-term noise overwhelms long-term signals</li>
                        <li>• Confirmation bias reinforces poor timing decisions</li>
                        <li>• Hindsight bias creates false confidence in timing ability</li>
                        <li>• Stress and pressure reduce decision-making quality</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Applying Behavioral Insights</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Understanding market psychology provides a significant advantage 
                    for making better investment decisions and avoiding common pitfalls.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Practical Applications</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Use sentiment indicators to identify market extremes</li>
                    <li>Develop systematic investment rules to reduce emotional decisions</li>
                    <li>Practice contrarian thinking during market euphoria and panic</li>
                    <li>Implement dollar-cost averaging to reduce timing pressure</li>
                    <li>Create written investment plans to maintain discipline</li>
                    <li>Regular portfolio reviews to identify behavioral biases</li>
                    <li>Study historical market cycles to gain perspective</li>
                    <li>Focus on process over outcomes to reduce emotional attachment</li>
                  </ul>

                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-teal-800 mb-3">Behavioral Investment Framework:</h4>
                    <div className="space-y-3 text-teal-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-teal-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Self-Assessment</div>
                          <div className="text-sm">Identify personal biases and emotional triggers</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-teal-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Rule Development</div>
                          <div className="text-sm">Create systematic decision-making processes</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-teal-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Implementation</div>
                          <div className="text-sm">Apply behavioral insights to investment decisions</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-teal-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Monitoring</div>
                          <div className="text-sm">Regular review and adjustment of approach</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Building Emotional Intelligence</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Developing emotional intelligence in investing helps maintain 
                    discipline and make rational decisions under pressure.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-teal-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-teal-800 mb-1">Self-Awareness</h4>
                      <div className="text-2xl font-bold text-teal-800">Know</div>
                      <p className="text-teal-700 text-xs">Your biases</p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-emerald-800 mb-1">Self-Control</h4>
                      <div className="text-2xl font-bold text-emerald-800">Manage</div>
                      <p className="text-emerald-700 text-xs">Your emotions</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Social Awareness</h4>
                      <div className="text-2xl font-bold text-green-800">Read</div>
                      <p className="text-green-700 text-xs">Market sentiment</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Emotion Cycle</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Euphoria</span>
                    <span className="font-semibold">Market Peak</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Excitement</span>
                    <span className="font-semibold">Rising Prices</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Fear</span>
                    <span className="font-semibold">Selling Pressure</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Despair</span>
                    <span className="font-semibold">Market Bottom</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Psychology Wins</h3>
                <p className="text-sm mb-4">
                  Understanding market psychology is often more important than financial analysis.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Mind</div>
                  <div className="text-sm opacity-90">Over market</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/investment-market-menu" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Market Analysis Hub
                  </a>
                  <a href="/historical-chart" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Historical Charts
                  </a>
                  <a href="/risk-assessment" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Risk Assessment
                  </a>
                  <a href="/investment-rules" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Rules
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
