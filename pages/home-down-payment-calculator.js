import Head from 'next/head';
import dynamic from 'next/dynamic';

const HomeDownPaymentCalculator = dynamic(() => import('@/pages/HomeDownPaymentCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div></div>
});

export default function HomeDownPaymentCalculatorPage() {
  return (
    <>
      <Head>
        <title>Home Down Payment Calculator - First Time Home Buyer Tool | DollarMento</title>
        <meta name="description" content="Free home down payment calculator. Calculate required down payment, closing costs, and savings needed to buy your first home. Plan your home purchase budget." />
        <meta name="keywords" content="home down payment calculator, down payment calculator, first time home buyer, home buying calculator, how much down payment house" />
        <meta property="og:title" content="Home Down Payment Calculator - First Time Home Buyer Tool" />
        <meta property="og:description" content="Calculate your required down payment and total costs for buying a home. Plan your home purchase budget with our comprehensive calculator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/home-down-payment-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home Down Payment Calculator" />
        <meta name="twitter:description" content="Calculate down payment requirements and plan your home purchase budget with our free calculator." />
        <link rel="canonical" href="https://dollarmento.com/home-down-payment-calculator" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Home Down Payment Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate your required down payment, closing costs, and total cash needed to buy your home. 
              Plan your home purchase budget and savings strategy with confidence.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <HomeDownPaymentCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Home Down Payments</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Understanding down payment requirements is crucial for successful home buying. The down payment 
                    is typically the largest upfront cost when purchasing a home, and it significantly impacts 
                    your monthly mortgage payment, loan terms, and overall homeownership costs.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Down Payment Requirements by Loan Type</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different mortgage programs have varying down payment requirements. Understanding these options 
                    helps you choose the best loan program for your financial situation and homeownership goals.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Loan Type</th>
                          <th className="border border-gray-300 p-3 text-left">Minimum Down</th>
                          <th className="border border-gray-300 p-3 text-left">Typical Down</th>
                          <th className="border border-gray-300 p-3 text-left">PMI Requirement</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3 font-semibold">Conventional</td>
                          <td className="border border-gray-300 p-3">3%</td>
                          <td className="border border-gray-300 p-3">5-20%</td>
                          <td className="border border-gray-300 p-3">If under 20%</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">FHA</td>
                          <td className="border border-gray-300 p-3">3.5%</td>
                          <td className="border border-gray-300 p-3">3.5-10%</td>
                          <td className="border border-gray-300 p-3">Always required</td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 p-3 font-semibold">VA</td>
                          <td className="border border-gray-300 p-3">0%</td>
                          <td className="border border-gray-300 p-3">0-10%</td>
                          <td className="border border-gray-300 p-3">None</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-semibold">USDA</td>
                          <td className="border border-gray-300 p-3">0%</td>
                          <td className="border border-gray-300 p-3">0-5%</td>
                          <td className="border border-gray-300 p-3">Yes (lower rate)</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3 font-semibold">Jumbo</td>
                          <td className="border border-gray-300 p-3">10%</td>
                          <td className="border border-gray-300 p-3">20%+</td>
                          <td className="border border-gray-300 p-3">If under 20%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Benefits of Different Down Payment Amounts</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The amount you put down affects more than just your monthly payment. It impacts your interest 
                    rate, mortgage insurance costs, equity building, and overall financial position.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="font-bold text-red-800 mb-3">3-5% Down</h4>
                      <ul className="text-red-700 text-sm space-y-2">
                        <li>✓ Lower upfront cost</li>
                        <li>✓ Faster home ownership</li>
                        <li>✓ Keep cash for other needs</li>
                        <li>✗ Higher monthly payment</li>
                        <li>✗ PMI required</li>
                        <li>✗ Less equity</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <h4 className="font-bold text-yellow-800 mb-3">10-15% Down</h4>
                      <ul className="text-yellow-700 text-sm space-y-2">
                        <li>✓ Moderate upfront cost</li>
                        <li>✓ Lower monthly payment</li>
                        <li>✓ Some equity built</li>
                        <li>✓ Better loan terms</li>
                        <li>✗ Still requires PMI</li>
                        <li>✗ Significant cash needed</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">20%+ Down</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>✓ No PMI required</li>
                        <li>✓ Best interest rates</li>
                        <li>✓ Immediate equity</li>
                        <li>✓ Strongest offers</li>
                        <li>✗ Large cash requirement</li>
                        <li>✗ Opportunity cost</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Total Cash Needed Beyond Down Payment</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your down payment is just one component of the total cash needed to buy a home. Understanding 
                    all costs helps you budget accurately and avoid surprises at closing.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Total Cash Required Breakdown:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
                      <div>
                        <h5 className="font-semibold mb-2">Pre-Closing Costs:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Home inspection: $300-$800</li>
                          <li>• Appraisal: $400-$800</li>
                          <li>• Earnest money: 1-3% of price</li>
                          <li>• Option fee: $100-$500</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Closing Costs (2-5% of price):</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Lender fees: $1,000-$3,000</li>
                          <li>• Title insurance: $1,000-$2,500</li>
                          <li>• Recording fees: $100-$500</li>
                          <li>• Prepaid insurance/taxes</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Down Payment Assistance Programs</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Many first-time homebuyers qualify for down payment assistance programs that can reduce 
                    the cash needed upfront. These programs vary by location and income level.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Federal Programs</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• <strong>FHA:</strong> 3.5% down, flexible credit requirements</li>
                        <li>• <strong>VA:</strong> 0% down for eligible veterans</li>
                        <li>• <strong>USDA:</strong> 0% down for rural properties</li>
                        <li>• <strong>Good Neighbor Next Door:</strong> 50% discount for teachers, firefighters, police</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">State & Local Programs</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Down payment grants (non-repayable)</li>
                        <li>• Deferred payment loans (0% interest)</li>
                        <li>• Forgivable loans (forgiven over time)</li>
                        <li>• Tax credits for first-time buyers</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Employer Programs</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Employee home buying assistance</li>
                        <li>• Relocation assistance packages</li>
                        <li>• Partnership with local lenders</li>
                        <li>• Special employee rates and terms</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Down Payment Savings Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Building your down payment takes time and discipline. Having a strategic savings plan 
                    helps you reach your homeownership goal faster while maintaining your financial health.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Short-term Strategies (1-2 years)</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        <li>• High-yield savings accounts</li>
                        <li>• Money market accounts</li>
                        <li>• Short-term CDs</li>
                        <li>• Treasury bills/notes</li>
                        <li>• Automated savings plans</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                      <h4 className="font-bold text-purple-800 mb-3">Long-term Strategies (3+ years)</h4>
                      <ul className="text-purple-700 text-sm space-y-2">
                        <li>• Conservative investment portfolios</li>
                        <li>• Target-date funds</li>
                        <li>• Bond funds</li>
                        <li>• Roth IRA (first-time buyer)</li>
                        <li>• 401(k) loans (careful consideration)</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Alternative Down Payment Sources</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Beyond traditional savings, there are several other sources for down payment funds. 
                    Each option has specific rules and considerations to understand before proceeding.
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-2">Acceptable Down Payment Sources:</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• Personal savings and checking accounts</li>
                      <li>• Gift funds from family members (with proper documentation)</li>
                      <li>• Sale proceeds from previous home</li>
                      <li>• Retirement account withdrawals (first-time buyers)</li>
                      <li>• Down payment assistance programs</li>
                      <li>• Employer relocation assistance</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Down Payment Mistakes</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Using All Available Cash</h4>
                      <p className="text-gray-700 text-sm">Keep reserves for emergencies, moving costs, and immediate home expenses.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Ignoring PMI Costs</h4>
                      <p className="text-gray-700 text-sm">Factor monthly PMI costs into your budget when putting less than 20% down.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Last-Minute Cash Withdrawals</h4>
                      <p className="text-gray-700 text-sm">Large withdrawals before closing can delay or derail your loan approval.</p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-700">Not Shopping Around</h4>
                      <p className="text-gray-700 text-sm">Different lenders offer various down payment programs and requirements.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Down Payment Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our home down payment calculator helps you determine exactly how much cash you'll need 
                    to buy your home, including down payment, closing costs, and other expenses.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Calculate required down payment by loan type</li>
                    <li>Estimate total closing costs</li>
                    <li>Include moving and setup expenses</li>
                    <li>Factor in reserve funds needed</li>
                    <li>Compare different down payment scenarios</li>
                    <li>Show monthly payment impact</li>
                    <li>Plan savings timeline to reach goal</li>
                  </ul>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Example Calculation ($400,000 Home):</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
                      <div>
                        <h5 className="font-semibold mb-2">20% Down Scenario:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Down payment: $80,000</li>
                          <li>• Closing costs: $12,000</li>
                          <li>• Moving/setup: $5,000</li>
                          <li>• <strong>Total needed: $97,000</strong></li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">5% Down Scenario:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Down payment: $20,000</li>
                          <li>• Closing costs: $12,000</li>
                          <li>• Moving/setup: $5,000</li>
                          <li>• <strong>Total needed: $37,000</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Planning Your Home Purchase Timeline</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use the calculator results to create a realistic timeline for your home purchase. 
                    Factor in time to save, improve credit, and find the right property.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-red-800 mb-1">6-12 Months</h4>
                      <p className="text-red-700 text-xs">Build savings, improve credit, research areas</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-yellow-800 mb-1">3-6 Months</h4>
                      <p className="text-yellow-700 text-xs">Get pre-approved, find agent, start shopping</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-blue-800 mb-1">30-45 Days</h4>
                      <p className="text-blue-700 text-xs">Make offers, complete inspections, finalize loan</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-green-800 mb-1">Closing Day</h4>
                      <p className="text-green-700 text-xs">Final walkthrough, sign papers, get keys</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Down Payment Quick Facts</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Conventional Min</span>
                    <span className="font-semibold">3%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">FHA Min</span>
                    <span className="font-semibold">3.5%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">VA Min</span>
                    <span className="font-semibold">0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">No PMI</span>
                    <span className="font-semibold">20%+</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Median Home Price</h3>
                <p className="text-sm mb-4">
                  Current median home price is around $425,000, requiring $21,250 minimum down payment (5%).
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">$21,250</div>
                  <div className="text-sm opacity-90">5% down payment</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/mortgage-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Mortgage Calculator
                  </a>
                  <a href="/rent-vs-buy-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Rent vs Buy Calculator
                  </a>
                  <a href="/home-affordability-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Home Affordability Calculator
                  </a>
                  <a href="/closing-cost-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Closing Cost Calculator
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
