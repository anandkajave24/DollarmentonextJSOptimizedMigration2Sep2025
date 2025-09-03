import Head from 'next/head';
import dynamic from 'next/dynamic';

const DebtConsolidationCalculator = dynamic(() => import('@/pages/DebtConsolidationCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div></div>
});

export default function DebtConsolidationCalculatorPage() {
  return (
    <>
      <Head>
        <title>Debt Consolidation Calculator - Compare Loan Options & Savings | DollarMento</title>
        <meta name="description" content="Free debt consolidation calculator. Compare loan options, calculate potential savings, and create a debt payoff strategy. Simplify multiple debts into one payment." />
        <meta name="keywords" content="debt consolidation calculator, debt consolidation loan, personal loan calculator, debt payoff calculator, credit card debt consolidation" />
        <meta property="og:title" content="Debt Consolidation Calculator - Compare Loan Options & Savings" />
        <meta property="og:description" content="Calculate debt consolidation savings and compare loan options to simplify your debt payments and save money on interest." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/debt-consolidation-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Debt Consolidation Calculator" />
        <meta name="twitter:description" content="Free calculator to compare debt consolidation options and calculate potential savings on your debt payments." />
        <link rel="canonical" href="https://dollarmento.com/debt-consolidation-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Debt Consolidation Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare debt consolidation options and calculate potential savings. 
              Simplify multiple debt payments and create an effective payoff strategy.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <DebtConsolidationCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Debt Consolidation</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Debt consolidation combines multiple debts into a single payment, often with better 
                    terms or lower interest rates. It can simplify your finances, reduce monthly payments, 
                    and help you pay off debt faster when used strategically.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is Debt Consolidation?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Debt consolidation involves taking out a new loan or credit account to pay off 
                    multiple existing debts. This creates a single monthly payment instead of managing 
                    multiple payments with different due dates and interest rates.
                  </p>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">Types of Debt Consolidation:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-700">
                      <div>
                        <h5 className="font-semibold mb-2">Personal Loans:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Fixed interest rates</li>
                          <li>• Fixed payment terms</li>
                          <li>• No collateral required</li>
                          <li>• Predictable payoff date</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Balance Transfer Cards:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• 0% introductory rates</li>
                          <li>• Variable rates after promo</li>
                          <li>• Balance transfer fees</li>
                          <li>• Revolving credit line</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">When Debt Consolidation Makes Sense</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Debt consolidation can be beneficial in specific situations. Understanding when 
                    it's appropriate helps you make the best decision for your financial situation.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Good Candidates for Consolidation</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• Multiple high-interest debts</li>
                        <li>• Good credit score (650+)</li>
                        <li>• Stable income</li>
                        <li>• Qualify for lower interest rate</li>
                        <li>• Difficulty managing multiple payments</li>
                        <li>• Committed to debt payoff</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="font-bold text-red-800 mb-3">When to Avoid Consolidation</h4>
                      <ul className="text-red-700 text-sm space-y-2">
                        <li>• Already have low interest rates</li>
                        <li>• Poor credit limits options</li>
                        <li>• Underlying spending problems</li>
                        <li>• Risk of accumulating more debt</li>
                        <li>• Near debt payoff anyway</li>
                        <li>• Considering bankruptcy</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Debt Consolidation Methods Comparison</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different consolidation methods offer various benefits and drawbacks. Understanding 
                    your options helps you choose the best approach for your situation.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Method</th>
                          <th className="border border-gray-300 p-3 text-left">Interest Rate</th>
                          <th className="border border-gray-300 p-3 text-left">Pros</th>
                          <th className="border border-gray-300 p-3 text-left">Cons</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">Personal Loan</td>
                          <td className="border border-gray-300 p-3">6-36%</td>
                          <td className="border border-gray-300 p-3">Fixed rate, predictable</td>
                          <td className="border border-gray-300 p-3">Requires good credit</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">Balance Transfer</td>
                          <td className="border border-gray-300 p-3">0-29%</td>
                          <td className="border border-gray-300 p-3">0% intro rates</td>
                          <td className="border border-gray-300 p-3">Rate increases, fees</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">Home Equity Loan</td>
                          <td className="border border-gray-300 p-3">4-12%</td>
                          <td className="border border-gray-300 p-3">Low rates, tax benefits</td>
                          <td className="border border-gray-300 p-3">Risks home, closing costs</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">401(k) Loan</td>
                          <td className="border border-gray-300 p-3">4-8%</td>
                          <td className="border border-gray-300 p-3">Low rates, no credit check</td>
                          <td className="border border-gray-300 p-3">Risks retirement, job loss</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Personal Loans for Debt Consolidation</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Personal loans are the most common debt consolidation method. They offer fixed 
                    rates and terms, making it easy to budget and plan your debt payoff strategy.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Personal Loan Advantages</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Fixed interest rates (no surprises)</li>
                        <li>• Fixed monthly payments</li>
                        <li>• Clear payoff timeline</li>
                        <li>• No collateral required</li>
                        <li>• Can't accumulate more debt on paid-off cards</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Qualification Requirements</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Credit score typically 600+ (better rates at 700+)</li>
                        <li>• Stable income and employment</li>
                        <li>• Debt-to-income ratio under 40%</li>
                        <li>• Bank account and identification</li>
                        <li>• Clean recent payment history</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Balance Transfer Credit Cards</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Balance transfer cards offer promotional 0% interest rates, which can provide 
                    significant savings if you can pay off the debt during the promotional period.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Balance Transfer Strategy:</h4>
                    <div className="space-y-3 text-blue-700">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-semibold">Find 0% APR Card</div>
                          <div className="text-sm">Look for 15-21 month promotional periods</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-semibold">Transfer High-Interest Debt</div>
                          <div className="text-sm">Move credit card balances to new card</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-semibold">Pay Off During Promo Period</div>
                          <div className="text-sm">Avoid interest by paying balance before rate increases</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Debt Consolidation Loan Shopping</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Shopping for the best consolidation loan requires comparing multiple lenders 
                    and understanding all terms and fees involved in each option.
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-2">Key Factors to Compare:</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• <strong>APR:</strong> Total cost including interest and fees</li>
                      <li>• <strong>Loan Term:</strong> How long to pay back (affects total cost)</li>
                      <li>• <strong>Monthly Payment:</strong> Fits within your budget</li>
                      <li>• <strong>Fees:</strong> Origination, prepayment, late payment fees</li>
                      <li>• <strong>Credit Requirements:</strong> Minimum score and income</li>
                      <li>• <strong>Funding Timeline:</strong> How quickly you receive funds</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Alternative Debt Relief Options</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If traditional debt consolidation isn't suitable, several other debt relief 
                    options may help you manage and eliminate your debt burden.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Debt Management Plan</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• Work with credit counseling agency</li>
                        <li>• Negotiated lower rates</li>
                        <li>• Single monthly payment</li>
                        <li>• Typically 3-5 year payoff</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h4 className="font-bold text-orange-800 mb-3">Debt Settlement</h4>
                      <ul className="text-orange-700 text-sm space-y-2">
                        <li>• Negotiate reduced balances</li>
                        <li>• Significant credit impact</li>
                        <li>• Tax implications</li>
                        <li>• For seriously delinquent accounts</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Creating a Debt Payoff Plan</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Successful debt consolidation requires a solid repayment plan and commitment 
                    to avoiding new debt while paying off the consolidated loan.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Debt Avalanche Method</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Pay minimums on all debts</li>
                        <li>• Extra payments to highest rate debt</li>
                        <li>• Mathematically optimal</li>
                        <li>• Saves most on interest</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Debt Snowball Method</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Pay minimums on all debts</li>
                        <li>• Extra payments to smallest balance</li>
                        <li>• Psychological motivation</li>
                        <li>• Quick wins build momentum</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Debt Consolidation Mistakes</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Running Up Paid-Off Cards</h4>
                      <p className="text-gray-700 text-sm">Using credit cards again after consolidation creates more debt and worse financial situation.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Only Looking at Monthly Payment</h4>
                      <p className="text-gray-700 text-sm">Longer loan terms may lower payments but increase total interest paid significantly.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Not Addressing Root Causes</h4>
                      <p className="text-gray-700 text-sm">Failing to change spending habits leads to recurring debt problems.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Ignoring Fees and Terms</h4>
                      <p className="text-gray-700 text-sm">Origination fees, prepayment penalties, and rate changes can significantly impact savings.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Debt Consolidation Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our debt consolidation calculator helps you compare your current debt situation 
                    with potential consolidation options to determine if consolidation will save you money.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Input multiple existing debts with different rates</li>
                    <li>Compare with consolidation loan terms</li>
                    <li>Calculate total interest savings</li>
                    <li>Show monthly payment differences</li>
                    <li>Display payoff timeline comparison</li>
                    <li>Factor in loan fees and costs</li>
                    <li>Analyze different consolidation scenarios</li>
                  </ul>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">Example Consolidation Scenario:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-700">
                      <div>
                        <h5 className="font-semibold mb-2">Current Debts:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Credit Card 1: $8,000 at 24%</li>
                          <li>• Credit Card 2: $5,000 at 21%</li>
                          <li>• Credit Card 3: $3,000 at 18%</li>
                          <li>• <strong>Total: $16,000</strong></li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Consolidation Loan:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Amount: $16,000</li>
                          <li>• Rate: 12%</li>
                          <li>• Term: 4 years</li>
                          <li>• <strong>Save: $6,840 interest</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Making the Right Decision</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use the calculator results along with your financial discipline and goals 
                    to determine if debt consolidation is the right strategy for your situation.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Excellent Choice</h4>
                      <div className="text-2xl font-bold text-green-800">25%+</div>
                      <p className="text-green-700 text-xs">Interest rate reduction</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-yellow-800 mb-1">Worth Considering</h4>
                      <div className="text-2xl font-bold text-yellow-800">10-25%</div>
                      <p className="text-yellow-700 text-xs">Interest rate reduction</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-red-800 mb-1">Probably Not Worth It</h4>
                      <div className="text-2xl font-bold text-red-800">&lt;10%</div>
                      <p className="text-red-700 text-xs">Interest rate reduction</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Consolidation Quick Facts</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Personal Loan APR</span>
                    <span className="font-semibold">6-36%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Balance Transfer Fee</span>
                    <span className="font-semibold">3-5%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Credit Score Needed</span>
                    <span className="font-semibold">600+ (good rates)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Typical Loan Term</span>
                    <span className="font-semibold">2-7 years</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Potential Savings</h3>
                <p className="text-sm mb-4">
                  Consolidating $16,000 at 21% to 12% saves $6,840 in interest over 4 years.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">$6,840</div>
                  <div className="text-sm opacity-90">Interest savings</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/personal-loan-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Personal Loan Calculator
                  </a>
                  <a href="/credit-card-payoff-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Credit Card Payoff Calculator
                  </a>
                  <a href="/debt-snowball-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Debt Snowball Calculator
                  </a>
                  <a href="/credit-score-simulator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Credit Score Simulator
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
