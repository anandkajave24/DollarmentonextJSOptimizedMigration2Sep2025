import Head from 'next/head';
import dynamic from 'next/dynamic';

const MortgageCalculator = dynamic(() => import('@/pages/MortgageCalculator'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div></div>
});

export default function FreeMortgageCalculator2025Page() {
  return (
    <>
      <Head>
        <title>Free Mortgage Calculator 2025 - Home Loan Payment Calculator | DollarMento</title>
        <meta name="description" content="Free mortgage calculator for 2025. Calculate monthly payments, total interest, and compare loan terms. Plan your home purchase with our comprehensive mortgage tool." />
        <meta name="keywords" content="free mortgage calculator 2025, mortgage calculator, home loan calculator, mortgage payment calculator, mortgage rates 2025, home buying calculator" />
        <meta property="og:title" content="Free Mortgage Calculator 2025 - Home Loan Payment Calculator" />
        <meta property="og:description" content="Calculate your mortgage payments for 2025 with our free calculator. Compare rates, terms, and plan your home purchase strategy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/free-mortgage-calculator-2025" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Mortgage Calculator 2025" />
        <meta name="twitter:description" content="Free mortgage calculator with 2025 rates and terms. Calculate payments and plan your home purchase." />
        <link rel="canonical" href="https://dollarmento.com/free-mortgage-calculator-2025" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Free Mortgage Calculator 2025
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate your mortgage payments with our comprehensive 2025 mortgage calculator. 
              Compare loan terms, interest rates, and plan your home buying strategy with confidence.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <MortgageCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">2025 Mortgage Guide & Home Buying Tips</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Buying a home in 2025 requires careful financial planning and understanding of current 
                    mortgage rates, loan programs, and market conditions. Our free mortgage calculator helps 
                    you estimate monthly payments and total costs for different loan scenarios.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Current Mortgage Market Conditions (2025)</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The 2025 mortgage market is characterized by evolving interest rates, continued housing 
                    demand, and various loan programs designed to help homebuyers. Understanding these 
                    conditions helps you time your purchase and choose the right loan terms.
                  </p>

                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-teal-800 mb-3">Typical 2025 Mortgage Rates:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-teal-700">
                      <div>
                        <div className="font-semibold">30-Year Fixed</div>
                        <div className="text-2xl font-bold">6.5% - 7.5%</div>
                      </div>
                      <div>
                        <div className="font-semibold">15-Year Fixed</div>
                        <div className="text-2xl font-bold">6.0% - 7.0%</div>
                      </div>
                      <div>
                        <div className="font-semibold">5/1 ARM</div>
                        <div className="text-2xl font-bold">5.8% - 6.8%</div>
                      </div>
                      <div>
                        <div className="font-semibold">FHA Loans</div>
                        <div className="text-2xl font-bold">6.2% - 7.2%</div>
                      </div>
                    </div>
                    <div className="text-sm text-teal-600 mt-3">
                      *Rates vary based on credit score, down payment, and lender
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Understanding Mortgage Payments</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your monthly mortgage payment consists of four main components, often called PITI: 
                    Principal, Interest, Taxes, and Insurance. Understanding each component helps you 
                    budget accurately for homeownership costs.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Principal & Interest</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Principal: Amount borrowed, reduces loan balance</li>
                        <li>• Interest: Cost of borrowing, paid to lender</li>
                        <li>• Fixed amount for fixed-rate mortgages</li>
                        <li>• Early payments mostly interest, later mostly principal</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">Taxes & Insurance</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Property taxes: Varies by location (0.5%-3% annually)</li>
                        <li>• Homeowners insurance: $1,000-$3,000+ annually</li>
                        <li>• PMI: Required if down payment under 20%</li>
                        <li>• HOA fees: Additional monthly costs if applicable</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mortgage Loan Types & Programs</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different mortgage programs offer various benefits and requirements. Choosing the right 
                    loan type can save you thousands of dollars and make homeownership more accessible.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Conventional Loans</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <strong>Pros:</strong> No upfront mortgage insurance, lowest rates for good credit, 
                          PMI can be removed at 20% equity
                        </div>
                        <div>
                          <strong>Requirements:</strong> 3-20% down payment, 620+ credit score, 
                          debt-to-income ratio under 43%
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">FHA Loans</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <strong>Pros:</strong> 3.5% down payment, 580+ credit score accepted, 
                          flexible debt-to-income ratios
                        </div>
                        <div>
                          <strong>Cons:</strong> Mortgage insurance required for life of loan (if under 10% down), 
                          loan limits by area
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">VA Loans</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <strong>Pros:</strong> 0% down payment, no PMI, competitive rates, 
                          no prepayment penalties
                        </div>
                        <div>
                          <strong>Requirements:</strong> Military service eligibility, primary residence only, 
                          VA funding fee (can be financed)
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">USDA Rural Loans</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <strong>Pros:</strong> 0% down payment, competitive rates, 
                          lower mortgage insurance than FHA
                        </div>
                        <div>
                          <strong>Requirements:</strong> Rural/suburban location, income limits, 
                          primary residence only
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">2025 Down Payment Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your down payment significantly impacts your monthly payment, loan terms, and total 
                    costs. Here's how different down payment amounts affect your mortgage.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Down Payment</th>
                          <th className="border border-gray-300 p-3 text-left">Loan Amount</th>
                          <th className="border border-gray-300 p-3 text-left">Monthly P&I</th>
                          <th className="border border-gray-300 p-3 text-left">PMI</th>
                          <th className="border border-gray-300 p-3 text-left">Total Monthly</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-red-50">
                          <td className="border border-gray-300 p-3">5% ($25,000)</td>
                          <td className="border border-gray-300 p-3">$475,000</td>
                          <td className="border border-gray-300 p-3">$3,189</td>
                          <td className="border border-gray-300 p-3">$237</td>
                          <td className="border border-gray-300 p-3">$3,426</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 p-3">10% ($50,000)</td>
                          <td className="border border-gray-300 p-3">$450,000</td>
                          <td className="border border-gray-300 p-3">$3,022</td>
                          <td className="border border-gray-300 p-3">$225</td>
                          <td className="border border-gray-300 p-3">$3,247</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3">20% ($100,000)</td>
                          <td className="border border-gray-300 p-3">$400,000</td>
                          <td className="border border-gray-300 p-3">$2,686</td>
                          <td className="border border-gray-300 p-3">$0</td>
                          <td className="border border-gray-300 p-3">$2,686</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="text-xs text-gray-500 mt-2">
                      *Example based on $500,000 home, 7% interest rate, 30-year term
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Factors That Affect Your Mortgage Rate</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your mortgage interest rate determines how much you'll pay over the life of your loan. 
                    Understanding rate factors helps you secure the best possible terms.
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-2">Rate Impact Factors:</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• <strong>Credit Score:</strong> 740+ gets best rates, each 20-point drop costs ~0.1-0.25%</li>
                      <li>• <strong>Down Payment:</strong> 20%+ avoids PMI and may reduce rate</li>
                      <li>• <strong>Loan Term:</strong> 15-year loans have lower rates than 30-year</li>
                      <li>• <strong>Loan Type:</strong> Conventional typically beats government loans for good credit</li>
                      <li>• <strong>Points:</strong> Paying 1 point (1% of loan) typically reduces rate by 0.25%</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Closing Costs & Additional Expenses</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Beyond the down payment, homebuyers need to budget for closing costs, which typically 
                    range from 2-5% of the home price. Understanding these costs prevents surprises at closing.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Typical Closing Costs</h4>
                      <ul className="text-purple-700 text-sm space-y-1">
                        <li>• Loan origination fee: 0.5-1% of loan</li>
                        <li>• Appraisal: $400-$800</li>
                        <li>• Home inspection: $300-$600</li>
                        <li>• Title insurance: $1,000-$2,500</li>
                        <li>• Attorney fees: $500-$1,500</li>
                        <li>• Recording fees: $100-$500</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-800 mb-2">Moving & Setup Costs</h4>
                      <ul className="text-orange-700 text-sm space-y-1">
                        <li>• Moving expenses: $1,000-$5,000</li>
                        <li>• Utility deposits: $200-$500</li>
                        <li>• Immediate repairs: $1,000-$5,000</li>
                        <li>• Furniture/appliances: $2,000-$10,000</li>
                        <li>• Emergency fund: 1-3 months payments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Using Our Free Mortgage Calculator</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our comprehensive mortgage calculator helps you estimate monthly payments, compare 
                    loan scenarios, and plan your home purchase budget. Use it to evaluate different 
                    down payment amounts, interest rates, and loan terms.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Features</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Calculate monthly principal and interest payments</li>
                    <li>Include property taxes, insurance, and PMI</li>
                    <li>Compare 15-year vs. 30-year loan terms</li>
                    <li>Show total interest paid over loan life</li>
                    <li>Factor in points and closing costs</li>
                    <li>Generate amortization schedules</li>
                    <li>Estimate affordability based on income</li>
                  </ul>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Affordability Guidelines:</h4>
                    <ul className="text-blue-700 space-y-1 text-sm">
                      <li>• <strong>28% Rule:</strong> Housing costs shouldn't exceed 28% of gross monthly income</li>
                      <li>• <strong>36% Rule:</strong> Total debt payments shouldn't exceed 36% of gross income</li>
                      <li>• <strong>Conservative Approach:</strong> Keep total housing costs under 25% of income</li>
                      <li>• <strong>Include All Costs:</strong> Principal, interest, taxes, insurance, PMI, HOA</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">15-Year vs. 30-Year Mortgage Comparison</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Choosing between a 15-year and 30-year mortgage involves balancing monthly affordability 
                    with total interest costs. Here's how the terms compare for a typical loan scenario.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left">Loan Term</th>
                          <th className="border border-gray-300 p-3 text-left">Monthly Payment</th>
                          <th className="border border-gray-300 p-3 text-left">Total Interest</th>
                          <th className="border border-gray-300 p-3 text-left">Total Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 p-3">15-Year (6.5%)</td>
                          <td className="border border-gray-300 p-3">$3,489</td>
                          <td className="border border-gray-300 p-3">$228,020</td>
                          <td className="border border-gray-300 p-3">$628,020</td>
                        </tr>
                        <tr className="bg-red-50">
                          <td className="border border-gray-300 p-3">30-Year (7.0%)</td>
                          <td className="border border-gray-300 p-3">$2,661</td>
                          <td className="border border-gray-300 p-3">$557,960</td>
                          <td className="border border-gray-300 p-3">$957,960</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="text-xs text-gray-500 mt-2">
                      *Example based on $400,000 loan amount
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">2025 Home Buying Strategy</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Success in today's housing market requires preparation, patience, and strategic decision-making. 
                    Use these tips to navigate the 2025 home buying process effectively.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-teal-50 rounded-lg p-4">
                      <h4 className="font-semibold text-teal-800 mb-2">Before You Shop</h4>
                      <ul className="text-teal-700 text-sm space-y-1">
                        <li>• Get pre-approved for a mortgage</li>
                        <li>• Save 20-25% of home price for down payment + costs</li>
                        <li>• Improve credit score to 740+ for best rates</li>
                        <li>• Research neighborhoods and schools</li>
                        <li>• Hire a qualified buyer's agent</li>
                      </ul>
                    </div>
                    <div className="bg-cyan-50 rounded-lg p-4">
                      <h4 className="font-semibold text-cyan-800 mb-2">Making Offers</h4>
                      <ul className="text-cyan-700 text-sm space-y-1">
                        <li>• Offer competitively but within budget</li>
                        <li>• Include escalation clauses when appropriate</li>
                        <li>• Waive contingencies carefully</li>
                        <li>• Consider seller needs (timing, terms)</li>
                        <li>• Have backup options ready</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">2025 Mortgage Rates</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">30-Year Fixed</span>
                    <span className="font-semibold">6.5% - 7.5%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">15-Year Fixed</span>
                    <span className="font-semibold">6.0% - 7.0%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">5/1 ARM</span>
                    <span className="font-semibold">5.8% - 6.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">FHA Loans</span>
                    <span className="font-semibold">6.2% - 7.2%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Home Affordability</h3>
                <p className="text-sm mb-4">
                  With median home prices around $425,000, you need roughly $85,000+ income for affordability.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">$85K+</div>
                  <div className="text-sm opacity-90">Recommended income</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Calculators</h3>
                <div className="space-y-3">
                  <a href="/home-down-payment-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Down Payment Calculator
                  </a>
                  <a href="/mortgage-payment-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Mortgage Payment Calculator
                  </a>
                  <a href="/refinance-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Refinance Calculator
                  </a>
                  <a href="/rent-vs-buy-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Rent vs Buy Calculator
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
