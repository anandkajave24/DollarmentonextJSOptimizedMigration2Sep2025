import Head from 'next/head';
import dynamic from 'next/dynamic';

const BudgetPlannerCalculator = dynamic(() => import('@/components/calculators/BudgetPlannerCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div></div>
});

export default function BudgetPlannerCalculatorPage() {
  return (
    <>
      <Head>
        <title>Budget Planner Calculator - Personal Budget & Financial Planning Tool | DollarMento</title>
        <meta name="description" content="Free budget planner calculator. Create a personal budget, track expenses, and plan your finances. 50/30/20 rule, zero-based budgeting, and custom budget strategies." />
        <meta name="keywords" content="budget planner calculator, budget calculator, personal budget planner, expense tracker, financial planning, 50 30 20 budget rule, monthly budget calculator" />
        <meta property="og:title" content="Budget Planner Calculator - Personal Budget & Financial Planning Tool" />
        <meta property="og:description" content="Create and manage your personal budget with our comprehensive budget planning calculator. Track expenses and optimize your finances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/budget-planner-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Budget Planner Calculator" />
        <meta name="twitter:description" content="Free budget planner to create personal budgets, track expenses, and optimize your financial planning." />
        <link rel="canonical" href="https://dollarmento.com/budget-planner-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Budget Planner Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create and manage your personal budget with our comprehensive planning tool. 
              Track expenses, set financial goals, and optimize your spending for financial success.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <BudgetPlannerCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Budget Planning</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Budget planning is the foundation of financial success. A well-crafted budget helps you 
                    control spending, save for goals, and build wealth over time. Understanding different 
                    budgeting methods helps you choose the approach that works best for your lifestyle.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Popular Budgeting Methods</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different budgeting approaches work for different people and situations. Understanding 
                    these methods helps you find the system that you'll actually stick with long-term.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                      <h4 className="font-bold text-emerald-800 mb-3">50/30/20 Rule</h4>
                      <ul className="text-emerald-700 text-sm space-y-2">
                        <li>• 50% for needs (housing, food, utilities)</li>
                        <li>• 30% for wants (entertainment, dining out)</li>
                        <li>• 20% for savings and debt repayment</li>
                        <li>• Simple and flexible approach</li>
                        <li>• Good for budgeting beginners</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Zero-Based Budgeting</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• Every dollar has a specific purpose</li>
                        <li>• Income minus expenses equals zero</li>
                        <li>• Forces intentional spending decisions</li>
                        <li>• Maximum control over finances</li>
                        <li>• Requires more time and tracking</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                      <h4 className="font-bold text-purple-800 mb-3">Envelope Method</h4>
                      <ul className="text-purple-700 text-sm space-y-2">
                        <li>• Cash allocated to spending categories</li>
                        <li>• Physical or digital "envelopes"</li>
                        <li>• Prevents overspending in categories</li>
                        <li>• Great for visual learners</li>
                        <li>• Works well for variable expenses</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h4 className="font-bold text-orange-800 mb-3">Pay Yourself First</h4>
                      <ul className="text-orange-700 text-sm space-y-2">
                        <li>• Save before any other expenses</li>
                        <li>• Automate savings transfers</li>
                        <li>• Prioritizes long-term goals</li>
                        <li>• Builds wealth consistently</li>
                        <li>• Simplifies budgeting process</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Essential Budget Categories</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Organizing expenses into clear categories helps you track spending patterns and 
                    identify opportunities for optimization. Most budgets include these core categories.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Category</th>
                          <th className="border border-gray-300 p-3 text-left">Typical %</th>
                          <th className="border border-gray-300 p-3 text-left">Examples</th>
                          <th className="border border-gray-300 p-3 text-left">Tips</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Housing</td>
                          <td className="border border-gray-300 p-3">25-30%</td>
                          <td className="border border-gray-300 p-3">Rent, mortgage, utilities</td>
                          <td className="border border-gray-300 p-3">Keep under 30% of income</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Transportation</td>
                          <td className="border border-gray-300 p-3">10-15%</td>
                          <td className="border border-gray-300 p-3">Car payment, gas, insurance</td>
                          <td className="border border-gray-300 p-3">Consider total cost of ownership</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Food</td>
                          <td className="border border-gray-300 p-3">10-15%</td>
                          <td className="border border-gray-300 p-3">Groceries, dining out</td>
                          <td className="border border-gray-300 p-3">Track groceries vs restaurants</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Savings</td>
                          <td className="border border-gray-300 p-3">20%+</td>
                          <td className="border border-gray-300 p-3">Emergency fund, retirement</td>
                          <td className="border border-gray-300 p-3">Automate to build consistency</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">Insurance</td>
                          <td className="border border-gray-300 p-3">5-10%</td>
                          <td className="border border-gray-300 p-3">Health, life, disability</td>
                          <td className="border border-gray-300 p-3">Shop annually for best rates</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Creating Your Personal Budget</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Building an effective budget requires understanding your income, tracking expenses, 
                    and setting realistic goals. Follow these steps to create a budget that works.
                  </p>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-emerald-800 mb-3">Budget Creation Process:</h4>
                    <div className="space-y-3 text-emerald-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-emerald-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Calculate Net Income</div>
                          <div className="text-sm">Take-home pay after taxes and deductions</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-emerald-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Track Current Spending</div>
                          <div className="text-sm">Review 2-3 months of bank statements</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-emerald-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Categorize Expenses</div>
                          <div className="text-sm">Group spending into needs, wants, and savings</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-emerald-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <div className="font-semibold">Set Spending Limits</div>
                          <div className="text-sm">Allocate income to each category</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-emerald-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">5</div>
                        <div>
                          <div className="font-semibold">Monitor and Adjust</div>
                          <div className="text-sm">Review monthly and make necessary changes</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Emergency Fund Planning</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    An emergency fund is a crucial component of any budget. It provides financial security 
                    and prevents you from going into debt when unexpected expenses arise.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Emergency Fund Targets</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• <strong>Starter Emergency Fund:</strong> $1,000 for immediate protection</li>
                        <li>• <strong>Full Emergency Fund:</strong> 3-6 months of expenses</li>
                        <li>• <strong>Dual-Income Households:</strong> 3-4 months typically sufficient</li>
                        <li>• <strong>Single Income/Self-Employed:</strong> 6-8 months recommended</li>
                        <li>• <strong>Job Market Considerations:</strong> Increase if in volatile industry</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Building Your Emergency Fund</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Start with small, consistent contributions</li>
                        <li>• Use windfalls (tax refunds, bonuses) to boost savings</li>
                        <li>• Keep in high-yield savings account for easy access</li>
                        <li>• Separate from checking account to avoid temptation</li>
                        <li>• Automate transfers to build consistently</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Debt Management in Your Budget</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Managing debt is a critical part of budgeting. Understanding different debt repayment 
                    strategies helps you choose the most effective approach for your situation.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="font-bold text-red-800 mb-3">Debt Avalanche Method</h4>
                      <ul className="text-red-700 text-sm space-y-2">
                        <li>• Pay minimums on all debts</li>
                        <li>• Extra payments to highest interest rate</li>
                        <li>• Mathematically optimal</li>
                        <li>• Saves most money on interest</li>
                        <li>• May take longer to see progress</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Debt Snowball Method</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• Pay minimums on all debts</li>
                        <li>• Extra payments to smallest balance</li>
                        <li>• Psychological motivation</li>
                        <li>• Quick wins build momentum</li>
                        <li>• May cost more in interest</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Savings Goals and Priorities</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Effective budgeting includes saving for both short-term and long-term goals. 
                    Prioritizing your savings helps ensure you're building wealth while meeting current needs.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">Savings Priority Order:</h4>
                    <ol className="text-blue-700 space-y-1 text-sm list-decimal list-inside">
                      <li><strong>Employer 401(k) match:</strong> Free money, highest priority</li>
                      <li><strong>High-interest debt:</strong> Pay off credit cards and personal loans</li>
                      <li><strong>Emergency fund:</strong> 3-6 months of expenses</li>
                      <li><strong>Retirement savings:</strong> 15-20% of income goal</li>
                      <li><strong>Other goals:</strong> House down payment, education, vacation</li>
                    </ol>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Budgeting Mistakes</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Being Too Restrictive</h4>
                      <p className="text-gray-700 text-sm">Budgets that don't allow for any fun or flexibility often fail within a few months.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Not Tracking Spending</h4>
                      <p className="text-gray-700 text-sm">Creating a budget is only half the battle; you must track actual spending to succeed.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Forgetting Irregular Expenses</h4>
                      <p className="text-gray-700 text-sm">Annual expenses like insurance or quarterly expenses like property taxes should be budgeted monthly.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Setting Unrealistic Goals</h4>
                      <p className="text-gray-700 text-sm">Dramatic lifestyle changes rarely stick; start with small, sustainable adjustments.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Budget Planner Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our budget planner calculator helps you create a personalized budget based on your 
                    income, expenses, and financial goals using proven budgeting methodologies.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Multiple budgeting method templates (50/30/20, zero-based)</li>
                    <li>Comprehensive expense category breakdowns</li>
                    <li>Automatic savings and debt payment calculations</li>
                    <li>Emergency fund goal setting and tracking</li>
                    <li>Visual spending breakdowns and charts</li>
                    <li>Monthly budget vs. actual tracking</li>
                    <li>Goal-based savings planning</li>
                  </ul>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-emerald-800 mb-3">Sample Budget Breakdown ($5,000 monthly income):</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-emerald-700">
                      <div>
                        <h5 className="font-semibold mb-2">50/30/20 Method:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Needs: $2,500 (50%)</li>
                          <li>• Wants: $1,500 (30%)</li>
                          <li>• Savings/Debt: $1,000 (20%)</li>
                          <li>• <strong>Total allocated: $5,000</strong></li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Detailed Breakdown:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Housing: $1,400</li>
                          <li>• Transportation: $600</li>
                          <li>• Food: $500</li>
                          <li>• Emergency Fund: $500</li>
                          <li>• Retirement: $500</li>
                          <li>• Entertainment: $500</li>
                          <li>• Personal: $500</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Budget Optimization Tips</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use the calculator results to identify optimization opportunities and create 
                    a sustainable budget that helps you achieve your financial goals.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Excellent Budget</h4>
                      <div className="text-2xl font-bold text-green-800">20%+</div>
                      <p className="text-green-700 text-xs">Savings rate</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-yellow-800 mb-1">Good Budget</h4>
                      <div className="text-2xl font-bold text-yellow-800">10-20%</div>
                      <p className="text-yellow-700 text-xs">Savings rate</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-red-800 mb-1">Needs Improvement</h4>
                      <div className="text-2xl font-bold text-red-800">&lt;10%</div>
                      <p className="text-red-700 text-xs">Savings rate</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Budget Quick Facts</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Housing Budget</span>
                    <span className="font-semibold">&lt;30% income</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Savings Goal</span>
                    <span className="font-semibold">20% income</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Emergency Fund</span>
                    <span className="font-semibold">3-6 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">50/30/20 Rule</span>
                    <span className="font-semibold">Most popular</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Budget Impact</h3>
                <p className="text-sm mb-4">
                  People with budgets save 15% more and have 19% less financial stress.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">15%</div>
                  <div className="text-sm opacity-90">More savings</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/expense-tracker" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Expense Tracker
                  </a>
                  <a href="/savings-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Savings Calculator
                  </a>
                  <a href="/debt-payoff-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Debt Payoff Calculator
                  </a>
                  <a href="/emergency-fund-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Emergency Fund Calculator
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