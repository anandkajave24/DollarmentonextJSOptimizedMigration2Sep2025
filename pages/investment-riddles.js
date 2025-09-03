import Head from 'next/head';
import dynamic from 'next/dynamic';

const InvestmentRiddles = dynamic(() => import('@/pages/InvestmentRiddlesSequential'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
});

export default function InvestmentRiddlesPage() {
  return (
    <>
      <Head>
        <title>Investment Riddles - Financial Brain Teasers & Quiz Games | DollarMento</title>
        <meta name="description" content="Challenge yourself with investment riddles and financial brain teasers. Test your market knowledge with engaging quiz games and investment challenges." />
        <meta name="keywords" content="investment riddles, financial quiz, investment brain teasers, market quiz, financial knowledge test, investing games" />
        <meta property="og:title" content="Investment Riddles - Financial Brain Teasers & Quiz Games" />
        <meta property="og:description" content="Test your investment knowledge with challenging riddles and financial brain teasers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/investment-riddles" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Investment Riddles" />
        <meta name="twitter:description" content="Challenge your financial knowledge with investment riddles and brain teasers." />
        <link rel="canonical" href="https://dollarmento.com/investment-riddles" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Investment Riddles
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Challenge your financial knowledge with brain teasers and investment riddles. 
              Test market understanding through engaging quiz games designed to sharpen your investing skills.
            </p>
          </div>

          {/* Interactive Riddles Game */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <InvestmentRiddles />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Master Investing Through Brain Teasers</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Investment riddles combine critical thinking with financial knowledge, 
                    creating engaging challenges that test and improve your understanding 
                    of markets, strategies, and investment principles.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Benefits of Financial Brain Teasers</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Brain teasers stimulate analytical thinking and help develop the 
                    mental agility needed for successful investing in dynamic markets.
                  </p>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-indigo-800 mb-3">Cognitive Benefits:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-indigo-700">
                      <div>
                        <h5 className="font-semibold mb-2">Mental Skills:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Enhanced logical reasoning</li>
                          <li>• Improved pattern recognition</li>
                          <li>• Faster decision-making</li>
                          <li>• Better memory retention</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Investment Skills:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Market analysis abilities</li>
                          <li>• Risk assessment thinking</li>
                          <li>• Strategic planning skills</li>
                          <li>• Problem-solving under pressure</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Types of Investment Riddles</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our collection includes various riddle formats that challenge 
                    different aspects of investment knowledge and market understanding.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Riddle Type</th>
                          <th className="border border-gray-300 p-3 text-left">Focus Area</th>
                          <th className="border border-gray-300 p-3 text-left">Skills Tested</th>
                          <th className="border border-gray-300 p-3 text-left">Difficulty</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Logic Puzzles</td>
                          <td className="border border-gray-300 p-3">Market reasoning</td>
                          <td className="border border-gray-300 p-3">Deductive thinking</td>
                          <td className="border border-gray-300 p-3">Medium</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Number Riddles</td>
                          <td className="border border-gray-300 p-3">Financial calculations</td>
                          <td className="border border-gray-300 p-3">Mathematical analysis</td>
                          <td className="border border-gray-300 p-3">Easy-Medium</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Scenario Riddles</td>
                          <td className="border border-gray-300 p-3">Real-world application</td>
                          <td className="border border-gray-300 p-3">Practical reasoning</td>
                          <td className="border border-gray-300 p-3">Medium-Hard</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Strategy Puzzles</td>
                          <td className="border border-gray-300 p-3">Investment planning</td>
                          <td className="border border-gray-300 p-3">Strategic thinking</td>
                          <td className="border border-gray-300 p-3">Hard</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">Market Mysteries</td>
                          <td className="border border-gray-300 p-3">Market behavior</td>
                          <td className="border border-gray-300 p-3">Pattern analysis</td>
                          <td className="border border-gray-300 p-3">Variable</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Sample Investment Riddles</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Here are examples of different riddle types that challenge 
                    various aspects of investment knowledge and analytical thinking.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Market Logic Riddle</h4>
                      <div className="bg-white rounded p-3 mb-2">
                        <p className="text-sm text-gray-700 italic">
                          "A stock rises 50% one day, then falls 33.33% the next. 
                          An investor claims they broke even. Are they right?"
                        </p>
                      </div>
                      <div className="text-xs text-gray-600">
                        <strong>Skills:</strong> Percentage calculations, compound effects
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Portfolio Puzzle</h4>
                      <div className="bg-white rounded p-3 mb-2">
                        <p className="text-sm text-gray-700 italic">
                          "Two investors with identical portfolios get different returns. 
                          One bought everything at once, the other dollar-cost averaged. 
                          In a declining market, who performed better and why?"
                        </p>
                      </div>
                      <div className="text-xs text-gray-600">
                        <strong>Skills:</strong> Investment strategies, timing effects
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Valuation Mystery</h4>
                      <div className="bg-white rounded p-3 mb-2">
                        <p className="text-sm text-gray-700 italic">
                          "Company A has a P/E of 10, Company B has a P/E of 30. 
                          Yet professional analysts prefer Company B. 
                          What factors might justify this preference?"
                        </p>
                      </div>
                      <div className="text-xs text-gray-600">
                        <strong>Skills:</strong> Valuation analysis, growth expectations
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cognitive Training for Investors</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Regular practice with investment riddles builds mental muscles 
                    essential for successful investing in complex, fast-moving markets.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Analytical Skills</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• <strong>Critical Thinking:</strong> Question assumptions</li>
                        <li>• <strong>Data Analysis:</strong> Extract meaningful insights</li>
                        <li>• <strong>Logical Reasoning:</strong> Follow cause and effect</li>
                        <li>• <strong>Problem Decomposition:</strong> Break complex issues down</li>
                        <li>• <strong>Pattern Recognition:</strong> Spot trends and cycles</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                      <h4 className="font-bold text-purple-800 mb-3">Decision Skills</h4>
                      <ul className="text-purple-700 text-sm space-y-2">
                        <li>• <strong>Quick Thinking:</strong> Fast opportunity assessment</li>
                        <li>• <strong>Risk Evaluation:</strong> Weigh potential outcomes</li>
                        <li>• <strong>Information Processing:</strong> Handle multiple factors</li>
                        <li>• <strong>Uncertainty Management:</strong> Decide with incomplete data</li>
                        <li>• <strong>Scenario Planning:</strong> Consider multiple outcomes</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Building Market Intuition</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Investment riddles help develop the intuitive understanding of 
                    markets that separates experienced investors from beginners.
                  </p>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-indigo-800 mb-3">Intuition Development:</h4>
                    <div className="space-y-3 text-indigo-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Pattern Memory</div>
                          <div className="text-sm">Recognize recurring market situations</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Rapid Assessment</div>
                          <div className="text-sm">Quickly evaluate investment opportunities</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Instinctive Risk Sensing</div>
                          <div className="text-sm">Feel when something doesn't add up</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Market Timing Sense</div>
                          <div className="text-sm">Develop feel for market cycles and sentiment</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Progressive Challenge System</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our riddle system adapts to your skill level, providing appropriate 
                    challenges that build confidence while pushing your abilities.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-green-700">Beginner Level</h4>
                      <p className="text-gray-700 text-sm">Basic concepts and straightforward calculations with clear solutions</p>
                    </div>
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h4 className="font-semibold text-yellow-700">Intermediate Level</h4>
                      <p className="text-gray-700 text-sm">Multi-step problems requiring investment knowledge and reasoning</p>
                    </div>
                    <div className="border-l-4 border-orange-400 pl-4">
                      <h4 className="font-semibold text-orange-700">Advanced Level</h4>
                      <p className="text-gray-700 text-sm">Complex scenarios with multiple variables and strategic considerations</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Expert Level</h4>
                      <p className="text-gray-700 text-sm">Professional-grade challenges requiring deep market understanding</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Real-World Application</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Investment Benefits</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Better stock analysis and selection</li>
                        <li>• Improved portfolio construction decisions</li>
                        <li>• Enhanced risk management capabilities</li>
                        <li>• Faster market opportunity recognition</li>
                        <li>• More confident investment decisions</li>
                        <li>• Reduced susceptibility to market emotions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Challenge Your Financial Mind</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our interactive riddle platform provides a comprehensive training 
                    ground for developing the mental agility needed for investment success.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Platform Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Hundreds of carefully crafted investment riddles</li>
                    <li>Multiple difficulty levels with adaptive progression</li>
                    <li>Detailed explanations for every solution</li>
                    <li>Performance tracking and skill assessment</li>
                    <li>Timed challenges for pressure training</li>
                    <li>Category-specific riddle collections</li>
                    <li>Leaderboards and achievement systems</li>
                    <li>Regular updates with new challenges</li>
                  </ul>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-indigo-800 mb-3">Daily Challenge Example:</h4>
                    <div className="text-indigo-700">
                      <div className="bg-white rounded p-4 mb-3">
                        <p className="font-semibold mb-2">The Dividend Paradox:</p>
                        <p className="text-sm text-gray-700">A company pays a 5% dividend yield, but its stock price has remained flat for 5 years while the market gained 50%. Investors still love the stock. What makes this dividend special?</p>
                      </div>
                      <div className="text-sm">
                        <strong>Hint:</strong> Consider dividend growth and reinvestment effects
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Training Methodology</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our approach combines cognitive science principles with investment 
                    education to maximize learning effectiveness and skill transfer.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-indigo-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-indigo-800 mb-1">Practice Time</h4>
                      <div className="text-2xl font-bold text-indigo-800">10-20min</div>
                      <p className="text-indigo-700 text-xs">Daily sessions</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-purple-800 mb-1">Difficulty</h4>
                      <div className="text-2xl font-bold text-purple-800">Adaptive</div>
                      <p className="text-purple-700 text-xs">Matches your level</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">Progress</h4>
                      <div className="text-2xl font-bold text-blue-800">Measured</div>
                      <p className="text-blue-700 text-xs">Skill improvement</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Riddle Categories</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Logic</span>
                    <span className="font-semibold">Market reasoning</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Math</span>
                    <span className="font-semibold">Financial calculations</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Strategy</span>
                    <span className="font-semibold">Investment planning</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mystery</span>
                    <span className="font-semibold">Market behavior</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Brain Training</h3>
                <p className="text-sm mb-4">
                  Regular riddle practice builds the mental agility needed for successful investing.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Sharp</div>
                  <div className="text-sm opacity-90">Investment mind</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/investment-puzzles" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Puzzles
                  </a>
                  <a href="/investment-rules" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Rules
                  </a>
                  <a href="/stocks-screener" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Stock Screener
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
