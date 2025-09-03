import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive credit analysis
export async function getStaticProps() {
  const creditDebtContent = {
    title: "Credit & Debt Overview - Complete Credit Health Analysis & Management",
    description: "Comprehensive credit and debt analysis dashboard with credit score monitoring, debt portfolio management, and strategic improvement recommendations. Monitor credit health and optimize your financial profile.",
    
    educationalContent: {
      overview: "Understanding and managing your credit and debt profile is fundamental to financial health and wealth building. A comprehensive overview enables strategic decision-making, cost optimization, and credit score improvement while building a foundation for long-term financial success.",
      
      creditFundamentals: [
        {
          concept: "Credit Score Components",
          description: "Understanding the five factors that determine your credit score and their relative importance",
          components: [
            {
              factor: "Payment History (35%)",
              description: "Track record of on-time payments across all credit accounts",
              optimization: ["Always pay at least minimum amounts by due dates", "Set up automatic payments for consistent history", "Address late payments immediately", "Maintain payment consistency across all accounts"]
            },
            {
              factor: "Credit Utilization (30%)",
              description: "Percentage of available credit currently being used",
              optimization: ["Keep total utilization below 30%", "Aim for individual card utilization under 10%", "Pay down balances before statement dates", "Request credit limit increases when appropriate"]
            },
            {
              factor: "Length of Credit History (15%)",
              description: "Average age of credit accounts and oldest account age",
              optimization: ["Keep old accounts open and active", "Avoid closing first credit cards", "Use older accounts occasionally to maintain activity", "Be patient as this factor improves naturally over time"]
            },
            {
              factor: "Credit Mix (10%)",
              description: "Variety of credit types including cards, loans, and mortgages",
              optimization: ["Maintain diverse credit types responsibly", "Don't open accounts solely for mix improvement", "Focus on payment history and utilization first", "Let credit mix develop naturally over time"]
            },
            {
              factor: "New Credit Inquiries (10%)",
              description: "Recent credit applications and hard inquiries on credit report",
              optimization: ["Limit credit applications to necessary purchases", "Group similar inquiries within 14-45 day windows", "Avoid unnecessary credit checks", "Monitor credit report for unauthorized inquiries"]
            }
          ]
        },
        {
          concept: "Debt-to-Income Ratio Management",
          description: "Optimizing the relationship between debt payments and income for financial health",
          ratios: [
            {
              type: "Total Debt-to-Income",
              description: "All monthly debt payments divided by gross monthly income",
              targets: "Below 36% for excellent financial health, maximum 43% for most lending",
              improvement: ["Increase income through career advancement or side income", "Accelerate debt payoff to reduce payments", "Avoid taking on new debt obligations", "Prioritize high-payment debt elimination"]
            },
            {
              type: "Housing Debt-to-Income",
              description: "Housing costs including mortgage, taxes, and insurance relative to income",
              targets: "Below 28% for optimal financial flexibility and stability",
              improvement: ["Consider refinancing for lower payments", "Increase income to improve ratio", "Make extra principal payments", "Evaluate housing costs relative to total financial plan"]
            }
          ]
        }
      ],
      
      debtManagementStrategies: [
        {
          strategy: "Portfolio Diversification Risk Management",
          description: "Managing different types of debt to optimize costs and minimize financial risk",
          approach: [
            "Separate secured debt (mortgages, auto loans) from unsecured debt (credit cards, personal loans)",
            "Prioritize high-interest unsecured debt for aggressive payoff strategies",
            "Maintain strategic secured debt with favorable terms for tax benefits and wealth building",
            "Balance debt elimination with investment opportunities based on interest rate comparisons"
          ],
          benefits: ["Optimized borrowing costs", "Reduced financial risk", "Strategic leverage utilization", "Improved overall financial efficiency"]
        },
        {
          strategy: "Credit Utilization Optimization",
          description: "Strategic management of credit usage to maximize score benefits while maintaining liquidity",
          approach: [
            "Maintain overall utilization below 30% with individual cards below 10%",
            "Pay down balances before statement closing dates for optimal reporting",
            "Request credit limit increases annually to improve utilization ratios",
            "Use balance transfers strategically to optimize utilization across cards"
          ],
          benefits: ["Improved credit scores", "Better lending terms", "Increased available credit", "Enhanced financial flexibility"]
        },
        {
          strategy: "Interest Rate Optimization",
          description: "Minimizing borrowing costs through rate negotiation and strategic refinancing",
          approach: [
            "Negotiate lower rates with existing lenders based on improved credit profiles",
            "Transfer high-rate balances to lower-rate options when beneficial",
            "Refinance loans when market rates or credit scores improve significantly",
            "Evaluate promotional rates carefully for long-term cost effectiveness"
          ],
          benefits: ["Reduced total interest costs", "Faster debt elimination", "Improved cash flow", "Enhanced wealth building capacity"]
        }
      ],
      
      monitoringAndImprovement: [
        {
          activity: "Regular Credit Report Review",
          frequency: "Quarterly from each major bureau (annually minimum)",
          purpose: "Identify errors, monitor for fraud, track improvement progress",
          actions: ["Dispute inaccurate information immediately", "Monitor for unauthorized accounts or inquiries", "Track positive changes and improvement trends", "Understand credit report factors affecting scores"]
        },
        {
          activity: "Credit Score Monitoring",
          frequency: "Monthly through free monitoring services",
          purpose: "Track score changes and identify improvement opportunities",
          actions: ["Understand score fluctuations and their causes", "Set score improvement goals and timelines", "Monitor impact of financial decisions on scores", "Identify optimal timing for major credit applications"]
        },
        {
          activity: "Debt Portfolio Analysis",
          frequency: "Monthly review of all debt balances and terms",
          purpose: "Optimize payoff strategies and identify refinancing opportunities",
          actions: ["Calculate total debt reduction progress", "Identify highest-cost debt for prioritization", "Evaluate refinancing and consolidation opportunities", "Adjust payoff strategies based on financial changes"]
        }
      ],
      
      warningSignsAndSolutions: [
        {
          warning: "Rising Credit Utilization",
          indicators: ["Monthly balances increasing", "Approaching credit limits", "Minimum payments becoming difficult"],
          solutions: ["Implement aggressive balance reduction plan", "Increase payments above minimums", "Request credit limit increases", "Avoid new charges until utilization improves"],
          prevention: ["Set up balance alerts", "Track spending against credit limits", "Pay balances frequently throughout month"]
        },
        {
          warning: "Declining Credit Score",
          indicators: ["Score drops over multiple months", "Missed payment notifications", "Increased inquiries or new accounts"],
          solutions: ["Identify and address root causes immediately", "Focus on payment history improvement", "Reduce credit utilization aggressively", "Dispute any credit report errors"],
          prevention: ["Automate all minimum payments", "Monitor credit regularly", "Avoid unnecessary credit applications"]
        },
        {
          warning: "Debt Service Stress",
          indicators: ["Debt payments exceeding 36% of income", "Difficulty meeting minimum payments", "Using credit for basic expenses"],
          solutions: ["Create aggressive debt reduction plan", "Consider debt consolidation options", "Increase income through additional work", "Seek credit counseling if needed"],
          prevention: ["Maintain emergency fund", "Track debt-to-income ratios", "Avoid lifestyle inflation"]
        }
      ]
    },
    
    toolFeatures: [
      "Comprehensive credit score analysis with factor-by-factor breakdown and improvement recommendations",
      "Complete debt portfolio overview with balances, rates, and payoff projections",
      "Credit utilization optimization calculator with multiple scenario analysis",
      "Debt-to-income ratio tracking with industry benchmark comparisons",
      "Credit improvement timeline projections based on planned actions",
      "Interest cost analysis showing total cost of current debt portfolio",
      "Strategic recommendations engine based on individual credit and debt profile",
      "Progress tracking dashboard with goal setting and milestone monitoring"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { creditDebtContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive credit and debt analysis functionality
const CreditDebtOverview = dynamic(() => import('@/pages/CreditDebtOverview'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading credit analysis...</p>
      </div>
    </div>
  )
});

export default function Page({ creditDebtContent }) {
  return (
    <>
      <Head>
        <title>Credit & Debt Overview - Complete Credit Health Analysis & Management | DollarMento</title>
        <meta name="description" content="Comprehensive credit and debt analysis dashboard with credit score monitoring, debt portfolio management, and strategic improvement recommendations. Monitor credit health and optimize your financial profile." />
        <meta property="og:title" content="Credit & Debt Overview - Complete Credit Health Analysis" />
        <meta property="og:description" content="Comprehensive credit monitoring and debt management with strategic improvement recommendations" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/credit-debt-overview" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Credit & Debt Overview" />
        <meta name="twitter:description" content="Complete credit health analysis and debt portfolio management dashboard" />
        <meta name="keywords" content="credit score, debt management, credit report, debt to income ratio, credit utilization, credit monitoring, debt overview" />
        <link rel="canonical" href="https://dollarmento.com/credit-debt-overview" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Credit & Debt Overview
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive credit health analysis and debt portfolio management. 
              Monitor your credit score, optimize debt strategies, and build strong financial foundations.
            </p>
          </div>

          {/* Interactive Credit & Debt Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <CreditDebtOverview creditDebtContent={creditDebtContent} />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Credit & Debt Management Guide</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {creditDebtContent.educationalContent.overview}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Credit Score Fundamentals</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Your credit score is calculated from five key components, each with different 
                    weights and optimization strategies for maximum impact.
                  </p>

                  <div className="space-y-6">
                    {creditDebtContent.educationalContent.creditFundamentals.map((fundamental, index) => (
                      <div key={index} className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-indigo-800 mb-3">{fundamental.concept}</h4>
                        <p className="text-indigo-700 mb-4">{fundamental.description}</p>
                        
                        {fundamental.components && (
                          <div className="space-y-4">
                            {fundamental.components.map((component, compIndex) => (
                              <div key={compIndex} className="bg-indigo-100 p-4 rounded-lg">
                                <h5 className="font-bold text-indigo-800 mb-2">{component.factor}</h5>
                                <p className="text-indigo-700 text-sm mb-3">{component.description}</p>
                                <div className="text-xs text-indigo-600">
                                  <h6 className="font-semibold mb-1">Optimization Strategies:</h6>
                                  <ul className="space-y-1">
                                    {component.optimization.map((strategy, stratIndex) => (
                                      <li key={stratIndex}>• {strategy}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {fundamental.ratios && (
                          <div className="space-y-4">
                            {fundamental.ratios.map((ratio, ratioIndex) => (
                              <div key={ratioIndex} className="bg-indigo-100 p-4 rounded-lg">
                                <h5 className="font-bold text-indigo-800 mb-2">{ratio.type}</h5>
                                <p className="text-indigo-700 text-sm mb-2">{ratio.description}</p>
                                <p className="text-indigo-600 text-sm mb-3"><strong>Targets:</strong> {ratio.targets}</p>
                                <div className="text-xs text-indigo-600">
                                  <h6 className="font-semibold mb-1">Improvement Strategies:</h6>
                                  <ul className="space-y-1">
                                    {ratio.improvement.map((strategy, stratIndex) => (
                                      <li key={stratIndex}>• {strategy}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Debt Management Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Strategic debt management optimizes costs, minimizes risks, 
                    and accelerates your path to financial freedom.
                  </p>

                  <div className="space-y-6 mb-8">
                    {creditDebtContent.educationalContent.debtManagementStrategies.map((strategy, index) => (
                      <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <h4 className="font-bold text-purple-800 mb-2">{strategy.strategy}</h4>
                        <p className="text-purple-700 text-sm mb-3">{strategy.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-purple-800 mb-1">Approach:</h5>
                            <ul className="text-purple-700 space-y-1">
                              {strategy.approach.map((step, stepIndex) => (
                                <li key={stepIndex}>• {step}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-purple-800 mb-1">Benefits:</h5>
                            <ul className="text-purple-700 space-y-1">
                              {strategy.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex}>• {benefit}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Monitoring & Improvement</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Regular monitoring and proactive improvement ensure your credit 
                    and debt profile supports your long-term financial goals.
                  </p>

                  <div className="space-y-4 mb-8">
                    {creditDebtContent.educationalContent.monitoringAndImprovement.map((activity, index) => (
                      <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h4 className="font-bold text-blue-800 mb-2">{activity.activity}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
                          <div>
                            <h5 className="font-semibold mb-1">Frequency:</h5>
                            <p>{activity.frequency}</p>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-1">Purpose:</h5>
                            <p>{activity.purpose}</p>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-1">Key Actions:</h5>
                            <ul className="space-y-1">
                              {activity.actions.map((action, actionIndex) => (
                                <li key={actionIndex}>• {action}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Warning Signs & Solutions</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Early identification of credit and debt problems enables 
                    proactive solutions before they impact your financial health significantly.
                  </p>

                  <div className="space-y-6 mb-8">
                    {creditDebtContent.educationalContent.warningSignsAndSolutions.map((warning, index) => (
                      <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h4 className="font-bold text-red-800 mb-3">{warning.warning}</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-red-800 mb-2">Warning Indicators:</h5>
                            <ul className="text-red-700 space-y-1">
                              {warning.indicators.map((indicator, indIndex) => (
                                <li key={indIndex}>• {indicator}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-red-800 mb-2">Immediate Solutions:</h5>
                            <ul className="text-red-700 space-y-1">
                              {warning.solutions.map((solution, solIndex) => (
                                <li key={solIndex}>• {solution}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-red-800 mb-2">Prevention Strategies:</h5>
                            <ul className="text-red-700 space-y-1">
                              {warning.prevention.map((prevent, prevIndex) => (
                                <li key={prevIndex}>• {prevent}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Analysis Dashboard Features</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our comprehensive analysis dashboard provides all the insights 
                    and tools you need for optimal credit and debt management.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {creditDebtContent.toolFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Credit Score Factors</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Payment History</span>
                    <span className="font-semibold">35%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Credit Utilization</span>
                    <span className="font-semibold">30%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Credit History</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Credit Mix</span>
                    <span className="font-semibold">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">New Credit</span>
                    <span className="font-semibold">10%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Credit Health</h3>
                <p className="text-sm mb-4">
                  Monitor and optimize your credit profile for better financial opportunities.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">850</div>
                  <div className="text-sm opacity-90">Perfect credit score</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <a href="/debt-payoff" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Debt Payoff
                  </a>
                  <a href="/credit-card-usage" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Credit Card Guide
                  </a>
                  <a href="/budget-buddy" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Budget Dashboard
                  </a>
                  <a href="/debt-payoff-strategies" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Payoff Strategies
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
