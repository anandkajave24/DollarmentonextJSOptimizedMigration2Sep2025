import Head from 'next/head';
import BudgetBuddy from '@/pages/BudgetBuddy';

// Use SSR to avoid context issues during build time
export async function getServerSideProps() {
  const budgetBuddyContent = {
    title: "Budget Buddy - Personal Budget Dashboard & Financial Planning Assistant",
    description: "Your intelligent budget companion for tracking expenses, managing finances, and achieving money goals. Get personalized insights, spending analysis, and budget optimization recommendations with real-time financial guidance.",
    
    educationalContent: {
      overview: "Effective budgeting is the cornerstone of financial success, providing visibility into spending patterns, enabling goal achievement, and creating the foundation for wealth building. A smart budget buddy system combines automated tracking with intelligent insights to make money management effortless and effective.",
      
      budgetingFundamentals: [
        {
          concept: "Income-Based Budgeting",
          description: "Allocating every dollar of income to specific categories before spending occurs",
          implementation: ["Calculate total monthly income", "List all fixed expenses", "Allocate remaining income to variable categories", "Track actual vs planned spending"],
          benefits: ["Complete income utilization", "Prevents overspending", "Enables goal funding", "Creates spending awareness"]
        },
        {
          concept: "50/30/20 Rule Framework",
          description: "Balanced approach allocating income across needs, wants, and financial goals",
          implementation: ["50% for essential needs (housing, utilities, groceries)", "30% for discretionary wants (entertainment, dining)", "20% for savings and debt payments", "Adjust percentages based on personal circumstances"],
          benefits: ["Balanced lifestyle approach", "Built-in savings habit", "Flexible framework", "Easy to understand and implement"]
        },
        {
          concept: "Zero-Based Budgeting",
          description: "Justifying every expense from zero each budget period for optimal resource allocation",
          implementation: ["Start with zero allocation", "Add essential expenses first", "Justify each additional category", "Allocate remaining funds strategically"],
          benefits: ["Eliminates wasteful spending", "Maximizes resource efficiency", "Increases spending awareness", "Aligns spending with priorities"]
        },
        {
          concept: "Envelope Method (Digital)",
          description: "Allocating specific amounts to spending categories with hard limits",
          implementation: ["Create digital spending envelopes", "Fund each envelope monthly", "Stop spending when envelope is empty", "Reallocate only with conscious decisions"],
          benefits: ["Prevents category overspending", "Visual spending limits", "Forces priority decisions", "Simplifies expense tracking"]
        }
      ],
      
      smartFeatures: [
        {
          feature: "Automated Transaction Categorization",
          description: "Intelligent classification of expenses into budget categories using machine learning",
          benefits: ["Reduces manual entry time", "Improves categorization accuracy", "Enables real-time budget tracking", "Identifies spending patterns automatically"],
          optimization: ["Review and correct categorizations", "Set up merchant-specific rules", "Train system with feedback", "Regular category refinement"]
        },
        {
          feature: "Predictive Spending Analysis",
          description: "Forecasting future expenses based on historical patterns and upcoming obligations",
          benefits: ["Prevents budget surprises", "Enables proactive adjustments", "Identifies seasonal patterns", "Supports better planning decisions"],
          optimization: ["Update recurring expense schedules", "Account for seasonal variations", "Include irregular expenses", "Monitor forecast accuracy"]
        },
        {
          feature: "Goal Integration and Tracking",
          description: "Connecting budget allocations with specific financial goals and progress monitoring",
          benefits: ["Aligns spending with objectives", "Tracks goal funding progress", "Prioritizes resource allocation", "Motivates consistent budgeting"],
          optimization: ["Set realistic goal timelines", "Automate goal funding", "Adjust allocations based on progress", "Celebrate milestone achievements"]
        },
        {
          feature: "Intelligent Spending Alerts",
          description: "Proactive notifications about budget status, unusual spending, and optimization opportunities",
          benefits: ["Prevents overspending", "Identifies trends early", "Suggests improvements", "Maintains budget awareness"],
          optimization: ["Customize alert thresholds", "Set up category-specific warnings", "Enable goal-based notifications", "Balance alertness with convenience"]
        }
      ],
      
      optimizationStrategies: [
        "Regular budget review and adjustment sessions to ensure continued relevance and effectiveness",
        "Expense reduction analysis to identify opportunities for cost savings without lifestyle impact",
        "Income allocation optimization to maximize savings and goal funding potential",
        "Seasonal budget adjustments to account for variable expenses throughout the year",
        "Emergency fund integration to prevent budget disruption during unexpected expenses",
        "Automation setup for recurring transfers and bill payments to reduce decision fatigue",
        "Performance tracking against financial goals to ensure budget supports long-term objectives",
        "Regular comparison with spending benchmarks to identify areas for improvement"
      ],
      
      successMetrics: [
        {
          metric: "Budget Variance",
          description: "Difference between planned and actual spending across categories",
          target: "Less than 10% variance in major categories",
          improvement: ["More accurate planning", "Better spending discipline", "Realistic budget targets", "Consistent tracking habits"]
        },
        {
          metric: "Savings Rate",
          description: "Percentage of income consistently allocated to savings and investments",
          target: "15-20% of gross income for most situations",
          improvement: ["Expense optimization", "Income increase strategies", "Automated savings setup", "Goal prioritization"]
        },
        {
          metric: "Goal Funding Consistency",
          description: "Regular allocation of funds toward defined financial objectives",
          target: "100% of planned goal funding each month",
          improvement: ["Realistic goal timelines", "Automated transfers", "Priority-based allocation", "Progress celebration"]
        },
        {
          metric: "Emergency Fund Growth",
          description: "Steady building of emergency fund to target amount",
          target: "3-6 months of expenses in emergency fund",
          improvement: ["Consistent monthly contributions", "Windfall allocation", "Expense reduction application", "High-yield account optimization"]
        }
      ]
    },
    
    // Personalized budget insights
    budgetInsights: {
      lastUpdated: new Date().toISOString(),
      marketTrends: "Current savings rates are favorable for emergency funds",
      budgetTips: [
        "Consider increasing your emergency fund target this quarter",
        "Review your subscription services for potential savings",
        "Automate your savings transfers to improve consistency",
        "Track spending patterns to identify optimization opportunities"
      ],
      categoryRecommendations: {
        housing: "30% of income",
        transportation: "15% of income", 
        food: "12% of income",
        savings: "20% of income",
        discretionary: "23% of income"
      },
      currentFocus: "Building emergency fund and optimizing recurring expenses",
      nextActions: [
        "Review and categorize recent transactions",
        "Set up automated savings transfer",
        "Analyze subscription services for potential savings",
        "Update budget allocations based on spending patterns"
      ]
    },
    
    toolFeatures: [
      "Intelligent budget dashboard with real-time spending tracking and insights",
      "Automated expense categorization with machine learning optimization",
      "Goal-based budget allocation with progress monitoring and adjustments",
      "Predictive spending analysis with future expense forecasting",
      "Smart alerts and notifications for budget management and optimization",
      "Integration with bank accounts for automatic transaction import",
      "Comprehensive reporting and analytics for spending pattern analysis",
      "Personalized recommendations based on spending behavior and goals"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { budgetBuddyContent },
    revalidate: 14400, // Revalidate every 4 hours
  };
}

export default function Page({ budgetBuddyContent }) {
  return (
    <>
      <Head>
        <title>Budget Buddy - Personal Budget Dashboard & Financial Planning Assistant | DollarMento</title>
        <meta name="description" content="Your intelligent budget companion for tracking expenses, managing finances, and achieving money goals. Get personalized insights, spending analysis, and budget optimization recommendations." />
        <meta property="og:title" content="Budget Buddy - Personal Budget Dashboard & Financial Assistant" />
        <meta property="og:description" content="Intelligent budget tracking with personalized insights and financial planning" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/budget-buddy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Budget Buddy Dashboard" />
        <meta name="twitter:description" content="Smart budget tracking with personalized financial insights and recommendations" />
        <meta name="keywords" content="budget buddy, budget tracker, personal finance dashboard, expense tracking, financial planning, money management, smart budgeting" />
        <link rel="canonical" href="https://dollarmento.com/budget-buddy" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Budget Buddy Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your intelligent budget companion for tracking expenses, managing finances, 
              and achieving money goals with personalized insights and smart recommendations.
            </p>
          </div>

          {/* Interactive Budget Dashboard */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <BudgetBuddy budgetBuddyContent={budgetBuddyContent} />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Budgeting Guide</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {budgetBuddyContent.educationalContent.overview}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Budgeting Fundamentals</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Master these core budgeting concepts to build a solid foundation 
                    for effective money management and financial success.
                  </p>

                  <div className="space-y-6">
                    {budgetBuddyContent.educationalContent.budgetingFundamentals.map((fundamental, index) => (
                      <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-blue-800 mb-3">{fundamental.concept}</h4>
                        <p className="text-blue-700 mb-4">{fundamental.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-blue-800 mb-2">Implementation:</h5>
                            <ul className="text-blue-700 space-y-1">
                              {fundamental.implementation.map((step, idx) => (
                                <li key={idx}>• {step}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-blue-800 mb-2">Benefits:</h5>
                            <ul className="text-blue-700 space-y-1">
                              {fundamental.benefits.map((benefit, idx) => (
                                <li key={idx}>• {benefit}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Smart Budget Features</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Modern budgeting leverages technology and automation 
                    to make money management more effective and less time-consuming.
                  </p>

                  <div className="space-y-6 mb-8">
                    {budgetBuddyContent.educationalContent.smartFeatures.map((feature, index) => (
                      <div key={index} className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
                        <h4 className="font-bold text-cyan-800 mb-2">{feature.feature}</h4>
                        <p className="text-cyan-700 text-sm mb-3">{feature.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-cyan-800 mb-1">Benefits:</h5>
                            <ul className="text-cyan-700 space-y-1">
                              {feature.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex}>• {benefit}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-cyan-800 mb-1">Optimization:</h5>
                            <ul className="text-cyan-700 space-y-1">
                              {feature.optimization.map((tip, tipIndex) => (
                                <li key={tipIndex}>• {tip}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Optimization Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Continuous improvement ensures your budget remains effective 
                    and adapts to changing circumstances and opportunities.
                  </p>

                  <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                    {budgetBuddyContent.educationalContent.optimizationStrategies.map((strategy, index) => (
                      <li key={index}>{strategy}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Success Metrics</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Track these key metrics to measure your budgeting success 
                    and identify areas for continued improvement.
                  </p>

                  <div className="space-y-4 mb-8">
                    {budgetBuddyContent.educationalContent.successMetrics.map((metric, index) => (
                      <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h4 className="font-bold text-green-800 mb-2">{metric.metric}</h4>
                        <p className="text-green-700 text-sm mb-2">{metric.description}</p>
                        <p className="text-green-600 text-sm mb-3"><strong>Target:</strong> {metric.target}</p>
                        
                        <div className="text-xs text-green-600">
                          <h5 className="font-semibold mb-1">Improvement Areas:</h5>
                          <ul className="space-y-1">
                            {metric.improvement.map((area, areaIndex) => (
                              <li key={areaIndex}>• {area}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard Features</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our comprehensive budget dashboard provides all the tools 
                    you need for effective financial management and goal achievement.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {budgetBuddyContent.toolFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Budget Allocation</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Housing</span>
                    <span className="font-semibold">30%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Savings</span>
                    <span className="font-semibold">20%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Transportation</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Food</span>
                    <span className="font-semibold">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discretionary</span>
                    <span className="font-semibold">23%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Smart Budgeting</h3>
                <p className="text-sm mb-4">
                  Intelligent tools and insights to optimize your financial management.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">AI</div>
                  <div className="text-sm opacity-90">Powered insights</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a href="/goal-tracker" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Track Goals
                  </a>
                  <a href="/spending-patterns" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Analyze Spending
                  </a>
                  <a href="/savings-goal-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Savings Calculator
                  </a>
                  <a href="/debt-payoff" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Debt Planning
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
