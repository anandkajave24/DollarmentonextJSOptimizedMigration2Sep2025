import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive income planning
export async function getStaticProps() {
  const irregularIncomeContent = {
    title: "Irregular Income Management - Financial Planning for Variable Earnings",
    description: "Master financial planning with irregular income through budgeting strategies, emergency fund management, and income smoothing techniques. Learn to manage freelance, commission, and seasonal income effectively.",
    
    educationalContent: {
      overview: "Managing irregular income requires specialized financial strategies that differ from traditional salary-based planning. By understanding income patterns, building robust emergency funds, and implementing flexible budgeting systems, you can achieve financial stability despite income variability.",
      
      incomeTypes: [
        {
          type: "Freelance and Gig Economy",
          characteristics: "Project-based income with varying payment schedules and amounts",
          challenges: ["Inconsistent payment timing", "Seasonal demand fluctuations", "Client payment delays", "No employer benefits"],
          strategies: ["Invoice payment terms negotiation", "Multiple client diversification", "Retainer agreements", "Personal benefits planning"]
        },
        {
          type: "Commission-Based Sales",
          characteristics: "Income tied to sales performance with potential for high variability",
          challenges: ["Market condition dependency", "Performance pressure", "Monthly quota variations", "Economic cycle impact"],
          strategies: ["Base salary maximization", "Pipeline management", "Skills development investment", "Market diversification"]
        },
        {
          type: "Seasonal Work",
          characteristics: "Concentrated earning periods followed by lower or no income periods",
          challenges: ["Long off-season periods", "Weather dependency", "Limited earning window", "Annual income compression"],
          strategies: ["Year-round budgeting", "Off-season income planning", "Skills diversification", "Seasonal business optimization"]
        },
        {
          type: "Investment and Business Income",
          characteristics: "Returns from investments, rental properties, or business profits",
          challenges: ["Market volatility impact", "Economic cycle dependency", "Property management issues", "Business cash flow cycles"],
          strategies: ["Diversified income streams", "Conservative withdrawal rates", "Professional management", "Economic hedging strategies"]
        }
      ],
      
      budgetingStrategies: [
        {
          strategy: "Baseline Budgeting",
          description: "Creating a budget based on minimum expected monthly income to ensure basic needs are always covered",
          implementation: [
            "Calculate lowest 3-month income average from past 2 years",
            "Create bare-bones budget covering essential expenses only",
            "Allocate any income above baseline to savings and goals",
            "Review and adjust baseline quarterly based on trends"
          ],
          benefits: ["Guaranteed basic needs coverage", "Reduced financial anxiety", "Clear saving opportunities identification"]
        },
        {
          strategy: "Percentage-Based Allocation",
          description: "Allocating fixed percentages of each payment to different financial priorities regardless of amount",
          implementation: [
            "Set percentage targets: 50% expenses, 30% taxes/business, 20% savings",
            "Automatically transfer percentages upon payment receipt",
            "Adjust percentages seasonally based on income patterns",
            "Use separate accounts for each allocation category"
          ],
          benefits: ["Automatic scaling with income", "Simplified decision making", "Consistent saving habits"]
        },
        {
          strategy: "Income Smoothing",
          description: "Creating artificial regular income by averaging earnings over time periods",
          implementation: [
            "Calculate average monthly income over 12-24 months",
            "Pay yourself this amount monthly from business account",
            "Build surplus in high-income months for low-income periods",
            "Adjust smoothed amount annually based on trends"
          ],
          benefits: ["Predictable monthly planning", "Reduced income stress", "Better expense management"]
        }
      ],
      
      emergencyFundGuidelines: [
        {
          situation: "Stable Irregular Income",
          description: "Income varies but follows predictable patterns with reliable clients/income sources",
          recommendedAmount: "6-9 months of expenses",
          buildingStrategy: "Save 20-25% of each payment until target reached",
          managementTips: ["Track income patterns", "Identify seasonal trends", "Maintain client relationships"]
        },
        {
          situation: "Highly Variable Income",
          description: "Significant income swings with unpredictable timing and amounts",
          recommendedAmount: "9-12 months of expenses",
          buildingStrategy: "Save 30-40% of high-income periods, minimal during low periods",
          managementTips: ["Diversify income sources", "Develop multiple skills", "Build strong professional network"]
        },
        {
          situation: "Seasonal Income",
          description: "Concentrated earning periods with extended low or no income periods",
          recommendedAmount: "12+ months of expenses",
          buildingStrategy: "Save majority of seasonal income to cover full year expenses",
          managementTips: ["Plan annual budget", "Develop off-season income", "Optimize earning season"]
        }
      ],
      
      taxPlanningTips: [
        "Set aside 25-30% of gross income for taxes immediately upon receipt",
        "Make quarterly estimated tax payments to avoid penalties",
        "Track all business expenses and deductions throughout the year",
        "Consider incorporating or LLC formation for tax advantages",
        "Use tax-advantaged retirement accounts like SEP-IRA or Solo 401k",
        "Work with tax professional familiar with irregular income situations"
      ],
      
      cashFlowManagement: [
        "Maintain detailed cash flow projections for next 3-6 months",
        "Invoice promptly and follow up on overdue payments",
        "Negotiate payment terms that improve cash flow timing",
        "Consider invoice factoring or lines of credit for cash flow gaps",
        "Build payment timing into project planning and pricing",
        "Develop relationships with multiple income sources"
      ]
    },
    
    toolFeatures: [
      "Irregular income budget calculator with multiple strategy options",
      "Emergency fund sizing recommendations based on income variability",
      "Cash flow projection tools for planning future income and expenses",
      "Tax withholding calculator for estimated quarterly payments",
      "Income pattern analysis to identify trends and seasonality",
      "Goal planning adjusted for irregular income challenges"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { irregularIncomeContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive irregular income planning functionality
const IrregularIncome = dynamic(() => import('@/pages/IrregularIncome'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading income planning tools...</p>
      </div>
    </div>
  )
});

export default function Page({ irregularIncomeContent }) {
  return (
    <>
      <Head>
        <title>Irregular Income Management - Financial Planning for Variable Earnings | DollarMento</title>
        <meta name="description" content="Master financial planning with irregular income through budgeting strategies, emergency fund management, and income smoothing techniques. Learn to manage freelance, commission, and seasonal income effectively." />
        <meta property="og:title" content="Irregular Income Management - Financial Planning for Variable Earnings" />
        <meta property="og:description" content="Comprehensive financial planning strategies for managing irregular and variable income" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/irregular-income" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Irregular Income Management" />
        <meta name="twitter:description" content="Financial planning strategies for freelance, commission, and variable income management" />
        <meta name="keywords" content="irregular income, variable income, freelance budgeting, commission income, seasonal income, income smoothing, emergency fund, cash flow management" />
        <link rel="canonical" href="https://dollarmento.com/irregular-income" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Irregular Income Management
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master financial planning with variable earnings through specialized budgeting strategies, 
              emergency fund management, and income smoothing techniques for financial stability.
            </p>
          </div>

          {/* Interactive Income Planning Tools */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <IrregularIncome irregularIncomeContent={irregularIncomeContent} />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Irregular Income Management Guide</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {irregularIncomeContent.educationalContent.overview}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Types of Irregular Income</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Understanding your specific type of irregular income helps you develop 
                    targeted strategies for managing financial challenges and maximizing opportunities.
                  </p>

                  <div className="space-y-6">
                    {irregularIncomeContent.educationalContent.incomeTypes.map((income, index) => (
                      <div key={index} className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-amber-800 mb-3">{income.type}</h4>
                        <p className="text-amber-700 mb-4">{income.characteristics}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-amber-800 mb-2">Common Challenges:</h5>
                            <ul className="text-amber-700 space-y-1">
                              {income.challenges.map((challenge, idx) => (
                                <li key={idx}>• {challenge}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-amber-800 mb-2">Management Strategies:</h5>
                            <ul className="text-amber-700 space-y-1">
                              {income.strategies.map((strategy, idx) => (
                                <li key={idx}>• {strategy}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Budgeting Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Effective budgeting with irregular income requires flexible approaches 
                    that adapt to income variability while maintaining financial stability.
                  </p>

                  <div className="space-y-6 mb-8">
                    {irregularIncomeContent.educationalContent.budgetingStrategies.map((strategy, index) => (
                      <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                        <h4 className="font-bold text-orange-800 mb-2">{strategy.strategy}</h4>
                        <p className="text-orange-700 text-sm mb-3">{strategy.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-orange-800 mb-1">Implementation Steps:</h5>
                            <ul className="text-orange-700 space-y-1">
                              {strategy.implementation.map((step, stepIndex) => (
                                <li key={stepIndex}>• {step}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-orange-800 mb-1">Key Benefits:</h5>
                            <ul className="text-orange-700 space-y-1">
                              {strategy.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex}>• {benefit}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Emergency Fund Guidelines</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Emergency funds are especially critical for irregular income earners, 
                    with larger amounts and specialized building strategies required.
                  </p>

                  <div className="space-y-4 mb-8">
                    {irregularIncomeContent.educationalContent.emergencyFundGuidelines.map((guideline, index) => (
                      <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h4 className="font-bold text-yellow-800 mb-2">{guideline.situation}</h4>
                        <p className="text-yellow-700 text-sm mb-2">{guideline.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-yellow-700">
                          <div>
                            <h5 className="font-semibold mb-1">Recommended Amount:</h5>
                            <p className="font-medium">{guideline.recommendedAmount}</p>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-1">Building Strategy:</h5>
                            <p>{guideline.buildingStrategy}</p>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-1">Management Tips:</h5>
                            <ul className="space-y-1">
                              {guideline.managementTips.map((tip, tipIndex) => (
                                <li key={tipIndex}>• {tip}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tax Planning Considerations</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Irregular income often requires special tax planning to manage 
                    quarterly payments and optimize deductions effectively.
                  </p>

                  <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                    {irregularIncomeContent.educationalContent.taxPlanningTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cash Flow Management</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Effective cash flow management helps bridge income gaps and 
                    ensures consistent access to funds for expenses and opportunities.
                  </p>

                  <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                    {irregularIncomeContent.educationalContent.cashFlowManagement.map((strategy, index) => (
                      <li key={index}>{strategy}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Planning Tools & Features</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our specialized tools help you manage irregular income challenges 
                    and build financial stability despite income variability.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {irregularIncomeContent.toolFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Emergency Fund Guide</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Stable Irregular</span>
                    <span className="font-semibold">6-9 months</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Highly Variable</span>
                    <span className="font-semibold">9-12 months</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Seasonal</span>
                    <span className="font-semibold">12+ months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax Reserve</span>
                    <span className="font-semibold">25-30%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Income Stability</h3>
                <p className="text-sm mb-4">
                  Build financial stability and peace of mind despite irregular income through strategic planning.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Stabilize</div>
                  <div className="text-sm opacity-90">Variable income</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h3>
                <div className="space-y-3">
                  <a href="/budget-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Budget Calculator
                  </a>
                  <a href="/emergency-fund-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Emergency Fund Calculator
                  </a>
                  <a href="/tax-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Tax Calculator
                  </a>
                  <a href="/cash-flow-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Cash Flow Planner
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
