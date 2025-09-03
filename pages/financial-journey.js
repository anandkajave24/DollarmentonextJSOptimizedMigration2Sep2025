import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive journey planning
export async function getStaticProps() {
  const journeyContent = {
    title: "Financial Journey Planning - Your Path to Financial Independence",
    description: "Plan and track your complete financial journey from debt elimination to wealth building. Discover personalized roadmaps, milestone tracking, and strategic planning for achieving financial independence and life goals.",
    
    educationalContent: {
      overview: "Your financial journey is unique to your circumstances, goals, and timeline. By understanding the typical stages of financial development and creating a personalized roadmap, you can navigate from financial stress to financial freedom with confidence and clarity.",
      
      journeyStages: [
        {
          stage: "Stage 1: Financial Stability",
          description: "Building the foundation of financial security through basic money management and emergency preparedness.",
          duration: "6-12 months",
          keyMilestones: [
            "Create and follow a monthly budget",
            "Establish $1,000 starter emergency fund",
            "Pay all bills on time consistently",
            "Track expenses and eliminate money leaks",
            "Open high-yield savings account"
          ],
          commonChallenges: ["Inconsistent income", "Overspending habits", "Lack of financial knowledge", "Unexpected expenses"],
          successStrategies: ["Automate savings", "Use envelope budgeting", "Build emergency buffer", "Track daily expenses"]
        },
        {
          stage: "Stage 2: Debt Elimination",
          description: "Systematic elimination of high-interest debt while maintaining emergency fund and building momentum.",
          duration: "1-3 years",
          keyMilestones: [
            "List all debts with balances and interest rates",
            "Choose debt payoff strategy (avalanche or snowball)",
            "Negotiate better interest rates where possible",
            "Eliminate high-interest credit card debt",
            "Build emergency fund to 3-6 months expenses"
          ],
          commonChallenges: ["Large debt balances", "High interest rates", "Temptation to use credit", "Slow progress motivation"],
          successStrategies: ["Debt consolidation", "Side income generation", "Expense optimization", "Progress celebration"]
        },
        {
          stage: "Stage 3: Wealth Building",
          description: "Active investment and asset accumulation for long-term wealth growth and financial goal achievement.",
          duration: "5-15 years",
          keyMilestones: [
            "Max out employer 401k match",
            "Open and fund IRA or Roth IRA",
            "Build diversified investment portfolio",
            "Increase retirement contributions to 15%+",
            "Consider real estate or alternative investments"
          ],
          commonChallenges: ["Market volatility", "Investment selection", "Risk management", "Lifestyle inflation"],
          successStrategies: ["Dollar-cost averaging", "Portfolio diversification", "Regular rebalancing", "Tax optimization"]
        },
        {
          stage: "Stage 4: Financial Independence",
          description: "Achieving optional work status through passive income generation and wealth preservation strategies.",
          duration: "15-30 years",
          keyMilestones: [
            "Accumulate 25x annual expenses in investments",
            "Develop multiple income streams",
            "Optimize tax strategies and estate planning",
            "Achieve geographic and career flexibility",
            "Focus on wealth preservation and legacy planning"
          ],
          commonChallenges: ["Sequence of returns risk", "Healthcare costs", "Tax optimization", "Estate planning complexity"],
          successStrategies: ["Asset allocation adjustment", "Income diversification", "Professional planning", "Regular strategy review"]
        }
      ],
      
      personalizedPlanning: [
        {
          factor: "Age and Life Stage",
          considerations: "Younger individuals have longer time horizons for compounding, while older individuals need more conservative approaches and catch-up strategies.",
          strategies: ["Age-appropriate risk tolerance", "Time horizon planning", "Life stage goals alignment", "Career phase considerations"]
        },
        {
          factor: "Income and Stability",
          considerations: "Higher and more stable incomes allow for aggressive saving rates, while variable incomes require flexible strategies and larger emergency funds.",
          strategies: ["Income-based savings rates", "Variable income budgeting", "Career development planning", "Multiple income sources"]
        },
        {
          factor: "Family Situation",
          considerations: "Family size, dependents, and responsibilities significantly impact financial planning priorities and resource allocation.",
          strategies: ["Family financial planning", "Education funding", "Insurance needs assessment", "Dependent care planning"]
        },
        {
          factor: "Risk Tolerance",
          considerations: "Personal comfort with investment risk affects asset allocation, investment selection, and timeline for achieving financial goals.",
          strategies: ["Risk assessment", "Conservative vs aggressive approaches", "Gradual risk adjustment", "Stress testing scenarios"]
        }
      ],
      
      progressTracking: [
        "Monthly net worth calculation and tracking trends",
        "Quarterly goal review and milestone celebration",
        "Annual financial plan review and strategy adjustment",
        "Key performance indicators monitoring (savings rate, investment returns, debt reduction)",
        "Regular comparison against age-based financial benchmarks"
      ]
    },
    
    toolFeatures: [
      "Personalized financial journey roadmap creation",
      "Stage-based milestone tracking and progress monitoring",
      "Goal-setting tools with realistic timeline planning",
      "Financial calculator integration for scenario planning",
      "Achievement system and motivation tracking",
      "Regular check-ins and plan adjustment recommendations"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { journeyContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive financial journey planning functionality
const FinancialJourney = dynamic(() => import('@/pages/FinancialJourney'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading financial journey planner...</p>
      </div>
    </div>
  )
});

export default function Page({ journeyContent }) {
  return (
    <>
      <Head>
        <title>Financial Journey Planning - Your Path to Financial Independence | DollarMento</title>
        <meta name="description" content="Plan and track your complete financial journey from debt elimination to wealth building. Discover personalized roadmaps, milestone tracking, and strategic planning for achieving financial independence." />
        <meta property="og:title" content="Financial Journey Planning - Your Path to Financial Independence" />
        <meta property="og:description" content="Personalized financial journey planning with milestone tracking and strategic roadmaps" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/financial-journey" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Financial Journey Planning" />
        <meta name="twitter:description" content="Plan your path to financial independence with personalized roadmaps and milestone tracking" />
        <meta name="keywords" content="financial journey, financial independence, wealth building journey, financial planning roadmap, money management stages, financial milestones" />
        <link rel="canonical" href="https://dollarmento.com/financial-journey" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Financial Journey Planning
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plan and track your complete financial journey from debt elimination to wealth building. 
              Discover personalized roadmaps and strategic planning for achieving financial independence.
            </p>
          </div>

          {/* Interactive Financial Journey Planner */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <FinancialJourney journeyContent={journeyContent} />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Financial Journey Guide</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {journeyContent.educationalContent.overview}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Financial Journey Stages</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Understanding the typical stages of financial development helps you identify your current position 
                    and plan your next steps toward financial independence.
                  </p>

                  <div className="space-y-8">
                    {journeyContent.educationalContent.journeyStages.map((stage, index) => (
                      <div key={index} className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                        <div className="flex items-center mb-3">
                          <div className="bg-teal-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold text-teal-800 mr-3">
                            {index + 1}
                          </div>
                          <h4 className="text-lg font-bold text-teal-800">{stage.stage}</h4>
                        </div>
                        <p className="text-teal-700 mb-3">{stage.description}</p>
                        <p className="text-teal-600 text-sm mb-4"><strong>Typical Duration:</strong> {stage.duration}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-teal-800 mb-2">Key Milestones:</h5>
                            <ul className="text-teal-700 space-y-1">
                              {stage.keyMilestones.map((milestone, idx) => (
                                <li key={idx}>• {milestone}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-teal-800 mb-2">Success Strategies:</h5>
                            <ul className="text-teal-700 space-y-1">
                              {stage.successStrategies.map((strategy, idx) => (
                                <li key={idx}>• {strategy}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h5 className="font-semibold text-teal-800 mb-2">Common Challenges:</h5>
                          <div className="flex flex-wrap gap-2">
                            {stage.commonChallenges.map((challenge, idx) => (
                              <span key={idx} className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs">
                                {challenge}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Personalized Planning Factors</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your financial journey should be customized based on your unique circumstances, 
                    goals, and personal factors that influence your planning approach.
                  </p>

                  <div className="space-y-6 mb-8">
                    {journeyContent.educationalContent.personalizedPlanning.map((factor, index) => (
                      <div key={index} className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
                        <h4 className="font-bold text-cyan-800 mb-2">{factor.factor}</h4>
                        <p className="text-cyan-700 text-sm mb-3">{factor.considerations}</p>
                        <div className="text-xs text-cyan-600">
                          <h5 className="font-semibold mb-1">Key Strategies:</h5>
                          <ul className="space-y-1">
                            {factor.strategies.map((strategy, strategyIndex) => (
                              <li key={strategyIndex}>• {strategy}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Progress Tracking and Monitoring</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Regular monitoring and adjustment ensure your financial journey stays on track 
                    and adapts to changing circumstances and opportunities.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {journeyContent.educationalContent.progressTracking.map((method, index) => (
                      <li key={index}>{method}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Journey Planning Tools</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our comprehensive planning tools help you create, track, and adjust 
                    your personalized financial journey roadmap.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {journeyContent.toolFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Journey Stages</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Stability</span>
                    <span className="font-semibold">6-12 months</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Debt Freedom</span>
                    <span className="font-semibold">1-3 years</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Wealth Building</span>
                    <span className="font-semibold">5-15 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Independence</span>
                    <span className="font-semibold">15-30 years</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Your Journey</h3>
                <p className="text-sm mb-4">
                  Every financial journey is unique. Start where you are, plan your path, and track your progress.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Start</div>
                  <div className="text-sm opacity-90">Your journey today</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Planning Tools</h3>
                <div className="space-y-3">
                  <a href="/goals" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Goal Setting
                  </a>
                  <a href="/financial-growth-levels" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Growth Levels
                  </a>
                  <a href="/budget-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Budget Planning
                  </a>
                  <a href="/retirement-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Retirement Planning
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
