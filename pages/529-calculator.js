import Head from 'next/head';
import dynamic from 'next/dynamic';

const Calculator529 = dynamic(() => import('@/pages/529Calculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
});

export default function Plan529CalculatorPage() {
  return (
    <>
      <Head>
        <title>529 Education Savings Plan Calculator - College Planning Tool | DollarMento</title>
        <meta name="description" content="Free 529 education savings plan calculator. Plan for college costs, calculate returns, and optimize your education savings strategy with tax advantages." />
        <meta name="keywords" content="529 calculator, education savings plan, college savings, 529 plan calculator, education funding, college cost calculator" />
        <meta property="og:title" content="529 Education Savings Plan Calculator - College Planning Tool" />
        <meta property="og:description" content="Plan for your child's education with our comprehensive 529 calculator. Calculate growth projections and optimize your college savings strategy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/529-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="529 Education Savings Plan Calculator" />
        <meta name="twitter:description" content="Free calculator to plan your child's college education expenses and optimize 529 savings." />
        <link rel="canonical" href="https://dollarmento.com/529-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              529 Education Savings Plan Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plan for your child's education with our comprehensive 529 calculator. Calculate growth projections, 
              explore tax benefits, and create a winning college savings strategy.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <Calculator529 />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding 529 Education Savings Plans</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    A 529 Education Savings Plan is one of the most powerful tools for funding your child's college education. 
                    These tax-advantaged investment accounts offer significant benefits that can help your education savings grow 
                    faster than traditional savings accounts or taxable investments.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Benefits of 529 Plans</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li><strong>Tax-Free Growth:</strong> Investments grow without federal taxes on earnings</li>
                    <li><strong>Tax-Free Withdrawals:</strong> No taxes when used for qualified education expenses</li>
                    <li><strong>State Tax Benefits:</strong> Many states offer tax deductions for contributions</li>
                    <li><strong>High Contribution Limits:</strong> Most plans allow contributions over $300,000</li>
                    <li><strong>Flexible Use:</strong> Can be used for K-12 tuition and trade schools</li>
                    <li><strong>Minimal Impact on Financial Aid:</strong> Considered parent asset with lower assessment rate</li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">How 529 Plans Work</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    529 plans function as investment accounts where you contribute after-tax dollars that are then invested 
                    in mutual funds, ETFs, or age-based portfolios. The money grows tax-free, and when you withdraw funds 
                    for qualified education expenses, you pay no federal taxes on the growth.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">Qualified Education Expenses Include:</h4>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Tuition and mandatory fees</li>
                      <li>• Room and board (for students enrolled at least half-time)</li>
                      <li>• Required books, supplies, and equipment</li>
                      <li>• Computer and internet access for educational purposes</li>
                      <li>• K-12 tuition up to $10,000 per year</li>
                      <li>• Student loan repayments up to $10,000 lifetime</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Choosing the Right 529 Plan</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    There are two main types of 529 plans: prepaid tuition plans and education savings plans. 
                    Most families choose education savings plans because they offer more flexibility and potential for growth.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-700 mb-2">Education Savings Plans</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Investment-based with growth potential</li>
                        <li>• Flexible use at any accredited school</li>
                        <li>• Various investment options</li>
                        <li>• No guarantees but higher potential returns</li>
                      </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-700 mb-2">Prepaid Tuition Plans</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Lock in today's tuition rates</li>
                        <li>• Protection against tuition inflation</li>
                        <li>• Limited to specific schools</li>
                        <li>• Guaranteed but lower growth potential</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Investment Strategies for 529 Plans</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Most 529 plans offer age-based portfolios that automatically adjust from aggressive growth investments 
                    to conservative options as your child approaches college age. This strategy helps maximize growth potential 
                    while reducing risk as the money is needed.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Age-Based Portfolio Strategy:</h4>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between"><span>Ages 0-5:</span><span>80-90% stocks, 10-20% bonds</span></div>
                      <div className="flex justify-between"><span>Ages 6-10:</span><span>70-80% stocks, 20-30% bonds</span></div>
                      <div className="flex justify-between"><span>Ages 11-15:</span><span>50-70% stocks, 30-50% bonds</span></div>
                      <div className="flex justify-between"><span>Ages 16-18:</span><span>20-40% stocks, 60-80% bonds/cash</span></div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Maximizing Your 529 Savings</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To get the most from your 529 plan, start early, contribute regularly, and take advantage of any state 
                    tax benefits. Even small monthly contributions can grow significantly over 18 years due to compound growth.
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">529 Savings Tips:</h4>
                    <ul className="text-green-700 space-y-2">
                      <li>• Start as early as possible to maximize compound growth</li>
                      <li>• Set up automatic monthly contributions</li>
                      <li>• Increase contributions with salary raises</li>
                      <li>• Use gift money for education instead of toys</li>
                      <li>• Consider grandparent contributions for estate planning</li>
                      <li>• Review and rebalance investments annually</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common 529 Plan Mistakes to Avoid</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Overfunding the Account</h4>
                      <p className="text-gray-700 text-sm">Non-qualified withdrawals incur penalties and taxes on earnings.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Not Researching State Benefits</h4>
                      <p className="text-gray-700 text-sm">Missing out on state tax deductions or matching contributions.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Being Too Conservative Early</h4>
                      <p className="text-gray-700 text-sm">Not taking enough investment risk when you have time for growth.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our 529 Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our 529 calculator helps you plan your education savings strategy by projecting how your contributions 
                    will grow over time. Simply input your child's current age, planned college start date, initial 
                    contribution, monthly contributions, and expected rate of return.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Project total savings at college start date</li>
                    <li>Calculate monthly contribution needed for goals</li>
                    <li>Compare different contribution scenarios</li>
                    <li>Factor in inflation and college cost increases</li>
                    <li>Visualize growth over time with charts</li>
                    <li>Account for state tax benefits</li>
                  </ul>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-3">Important Assumptions:</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• Average annual college cost inflation: 5-6%</li>
                      <li>• Expected 529 plan returns: 6-8% annually</li>
                      <li>• Current average college costs: $35,000-55,000 per year</li>
                      <li>• State tax benefits vary by state (0-7% deduction)</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Planning Beyond the Numbers</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    While our calculator provides valuable projections, remember that college costs and investment returns 
                    can vary. Consider multiple scenarios and have backup plans. Many families use a combination of 529 
                    savings, current income, student loans, and scholarships to fund education.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Additional Funding Sources</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Scholarships and grants</li>
                        <li>• Work-study programs</li>
                        <li>• Current family income</li>
                        <li>• Student loans (as last resort)</li>
                        <li>• Grandparent contributions</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Cost-Saving Strategies</h4>
                      <ul className="text-purple-700 text-sm space-y-1">
                        <li>• Start at community college</li>
                        <li>• In-state public universities</li>
                        <li>• Academic scholarships</li>
                        <li>• AP credits to graduate early</li>
                        <li>• Living at home options</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Annual Contribution Limit</span>
                    <span className="font-semibold">Varies by state</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Federal Tax Benefits</span>
                    <span className="font-semibold">Tax-free growth</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Penalty for Non-Qualified</span>
                    <span className="font-semibold">10% + income tax</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age Limit</span>
                    <span className="font-semibold">None</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Start Saving Today</h3>
                <p className="text-sm mb-4">
                  The earlier you start, the more time your money has to grow. Even $50/month can make a significant difference.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">$50/month</div>
                  <div className="text-sm opacity-90">for 18 years = ~$20,000</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Calculators</h3>
                <div className="space-y-3">
                  <a href="/college-cost-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    College Cost Calculator
                  </a>
                  <a href="/savings-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Savings Growth Calculator
                  </a>
                  <a href="/investment-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Calculator
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
