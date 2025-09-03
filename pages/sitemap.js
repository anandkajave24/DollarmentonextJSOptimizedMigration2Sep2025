import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive sitemap navigation
export async function getStaticProps() {
  const sitemapContent = {
    title: "Site Navigation - Complete Guide to DollarMento Financial Tools",
    description: "Comprehensive sitemap and navigation guide for DollarMento's complete suite of financial tools, calculators, educational resources, and planning utilities. Find exactly what you need for your financial journey.",
    
    educationalContent: {
      overview: "Effective financial management requires access to the right tools at the right time. Our comprehensive platform provides over 100 specialized financial calculators, educational resources, and planning tools organized into logical categories to support every aspect of your financial journey from basic budgeting to advanced investment strategies.",
      
      platformCategories: [
        {
          category: "Financial Calculators & Tools",
          description: "Comprehensive collection of specialized calculators for every financial need",
          subcategories: [
            {
              subcategory: "Tax Planning Calculators",
              tools: ["Federal Income Tax Calculator", "State Tax Calculator", "Tax Bracket Calculator", "Capital Gains Tax Calculator", "Tax Withholding Calculator"],
              purpose: "Optimize tax planning and ensure accurate tax preparation",
              benefits: ["Accurate tax estimates", "Strategic tax planning", "Withholding optimization", "Capital gains planning"]
            },
            {
              subcategory: "Loan & Mortgage Calculators",
              tools: ["Mortgage Calculator", "Loan Payment Calculator", "Refinance Calculator", "Extra Payment Calculator", "Amortization Schedule"],
              purpose: "Plan and optimize borrowing decisions for major purchases",
              benefits: ["Payment planning", "Interest cost analysis", "Refinancing evaluation", "Payoff strategies"]
            },
            {
              subcategory: "Investment & Retirement Calculators",
              tools: ["Retirement Calculator", "401k Calculator", "IRA Calculator", "Investment Return Calculator", "Compound Interest Calculator"],
              purpose: "Plan for long-term wealth building and retirement security",
              benefits: ["Retirement planning", "Investment analysis", "Goal setting", "Growth projections"]
            },
            {
              subcategory: "Insurance Calculators",
              tools: ["Life Insurance Calculator", "Term Insurance Calculator", "Health Insurance Calculator", "Disability Insurance Calculator"],
              purpose: "Determine appropriate insurance coverage for protection needs",
              benefits: ["Coverage optimization", "Cost analysis", "Protection planning", "Risk assessment"]
            }
          ]
        },
        {
          category: "Educational Resources",
          description: "Comprehensive financial education and learning materials",
          subcategories: [
            {
              subcategory: "Learning Hub",
              tools: ["DollarMento Kids", "Financial Basics", "Investment Education", "Tax Planning Guides", "Retirement Planning"],
              purpose: "Build financial knowledge and skills through structured learning",
              benefits: ["Financial literacy", "Skill development", "Informed decision making", "Confidence building"]
            },
            {
              subcategory: "Interactive Games",
              tools: ["Financial Freedom Game", "Investment Simulation", "Budgeting Challenges", "Savings Goals Game"],
              purpose: "Learn financial concepts through engaging, interactive experiences",
              benefits: ["Engaging learning", "Practical application", "Skill reinforcement", "Family education"]
            }
          ]
        },
        {
          category: "Planning & Management Tools",
          description: "Comprehensive tools for financial planning and ongoing management",
          subcategories: [
            {
              subcategory: "Budget & Cash Flow Management",
              tools: ["Budget Buddy", "Expense Tracker", "Cash Flow Planner", "Spending Analysis", "Savings Goal Tracker"],
              purpose: "Manage day-to-day finances and optimize cash flow",
              benefits: ["Spending control", "Goal achievement", "Financial awareness", "Cash flow optimization"]
            },
            {
              subcategory: "Goal Tracking & Progress Monitoring",
              tools: ["Goal Tracker", "Checkpoints System", "Progress Dashboard", "Milestone Celebrations"],
              purpose: "Track progress toward financial goals and maintain motivation",
              benefits: ["Goal achievement", "Progress monitoring", "Motivation maintenance", "Course correction"]
            },
            {
              subcategory: "Investment Portfolio Management",
              tools: ["Portfolio Analyzer", "Asset Allocation Tool", "Rebalancing Calculator", "Performance Tracker"],
              purpose: "Optimize investment portfolios and track performance",
              benefits: ["Portfolio optimization", "Risk management", "Performance tracking", "Strategic allocation"]
            }
          ]
        },
        {
          category: "Market Data & Analysis",
          description: "Real-time market information and analysis tools",
          subcategories: [
            {
              subcategory: "Market Data",
              tools: ["Stock Market Dashboard", "Economic Indicators", "Market Trends", "Sector Analysis"],
              purpose: "Stay informed about market conditions and investment opportunities",
              benefits: ["Market awareness", "Investment timing", "Risk assessment", "Opportunity identification"]
            }
          ]
        },
        {
          category: "Credit & Debt Management",
          description: "Tools for optimizing credit health and managing debt",
          subcategories: [
            {
              subcategory: "Credit Optimization",
              tools: ["Credit Score Tracker", "Credit Card Selection", "Credit Utilization Calculator", "Credit Report Analysis"],
              purpose: "Build and maintain excellent credit for better financial opportunities",
              benefits: ["Credit improvement", "Better loan terms", "Financial opportunities", "Cost savings"]
            },
            {
              subcategory: "Debt Management",
              tools: ["Debt Payoff Calculator", "Debt Consolidation Analyzer", "Payment Strategy Optimizer", "Debt-to-Income Calculator"],
              purpose: "Eliminate debt efficiently and improve financial health",
              benefits: ["Debt elimination", "Interest savings", "Payment optimization", "Financial freedom"]
            }
          ]
        }
      ],
      
      navigationTips: [
        {
          tip: "Start with Financial Health Assessment",
          description: "Begin with budget and cash flow tools to understand your current situation",
          recommendedTools: ["Budget Buddy", "Net Worth Calculator", "Cash Flow Analyzer"],
          nextSteps: "Use assessment results to prioritize other tools and set financial goals"
        },
        {
          tip: "Use Goal-Based Tool Selection",
          description: "Choose tools based on your specific financial goals and priorities",
          recommendedTools: ["Goal Tracker", "Retirement Calculator", "Debt Payoff Planner"],
          nextSteps: "Track progress regularly and adjust strategies based on results"
        },
        {
          tip: "Leverage Educational Resources",
          description: "Combine tools with educational content for better understanding",
          recommendedTools: ["Learning Hub", "Financial Games", "Planning Guides"],
          nextSteps: "Apply learned concepts using our practical planning tools"
        },
        {
          tip: "Regular Review and Optimization",
          description: "Use checkpoint tools for regular financial health reviews",
          recommendedTools: ["Checkpoints System", "Progress Dashboard", "Performance Tracker"],
          nextSteps: "Make strategic adjustments based on review findings"
        }
      ],
      
      toolSelection: [
        {
          scenario: "New to Financial Planning",
          startingTools: ["Budget Buddy", "Financial Basics Learning", "Goal Tracker", "Savings Calculator"],
          progressionPath: "Master budgeting → Set goals → Learn investing → Advanced planning",
          timeframe: "3-6 months to build foundation"
        },
        {
          scenario: "Debt Management Focus",
          startingTools: ["Debt Payoff Calculator", "Credit Score Tracker", "Payment Strategy Tool", "Budget Optimizer"],
          progressionPath: "Debt elimination → Credit building → Emergency fund → Wealth building",
          timeframe: "1-3 years depending on debt level"
        },
        {
          scenario: "Investment Planning",
          startingTools: ["Investment Calculator", "Portfolio Analyzer", "Retirement Planner", "Risk Assessment"],
          progressionPath: "Risk assessment → Asset allocation → Performance monitoring → Optimization",
          timeframe: "Ongoing with quarterly reviews"
        },
        {
          scenario: "Retirement Planning",
          startingTools: ["Retirement Calculator", "401k Optimizer", "Social Security Analyzer", "Healthcare Cost Estimator"],
          progressionPath: "Needs assessment → Strategy development → Implementation → Monitoring",
          timeframe: "Annual reviews with strategy adjustments"
        }
      ],
      
      platformBenefits: [
        "Comprehensive suite of over 100 financial tools covering all aspects of financial planning",
        "Educational resources integrated with practical tools for better understanding",
        "Progress tracking and milestone celebration to maintain motivation",
        "Real-time calculations and up-to-date financial information",
        "User-friendly interface designed for both beginners and advanced users",
        "Mobile-responsive design for access from any device",
        "Regular updates and new tool additions based on user needs",
        "Free access to comprehensive financial planning resources"
      ]
    },
    
    toolFeatures: [
      "Interactive sitemap with categorized tool listings and descriptions",
      "Smart search functionality to find specific tools quickly",
      "Tool recommendation engine based on financial goals and situations",
      "Progress tracking across multiple tools with unified dashboard",
      "Personalized tool suggestions based on usage patterns",
      "Quick access favorites system for frequently used tools",
      "Tool usage guides and tutorials for maximum effectiveness",
      "Integration between related tools for seamless workflow"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { sitemapContent },
    revalidate: 43200, // Update twice daily
  };
}

// CSR for interactive sitemap navigation functionality
const Sitemap = dynamic(() => import('@/pages/Sitemap'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading site navigation...</p>
      </div>
    </div>
  )
});

export default function Page({ sitemapContent }) {
  return (
    <>
      <Head>
        <title>Site Navigation - Complete Guide to DollarMento Financial Tools | DollarMento</title>
        <meta name="description" content="Comprehensive sitemap and navigation guide for DollarMento's complete suite of financial tools, calculators, educational resources, and planning utilities. Find exactly what you need for your financial journey." />
        <meta property="og:title" content="Site Navigation - Complete Guide to Financial Tools" />
        <meta property="og:description" content="Comprehensive guide to all DollarMento financial tools, calculators, and resources" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/sitemap" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DollarMento Site Navigation" />
        <meta name="twitter:description" content="Complete guide to all financial tools, calculators, and educational resources" />
        <meta name="keywords" content="sitemap, financial tools, calculator directory, financial planning tools, money management tools, investment calculators, budgeting tools" />
        <link rel="canonical" href="https://dollarmento.com/sitemap" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Site Navigation Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our complete suite of financial tools, calculators, and educational resources. 
              Find exactly what you need for every aspect of your financial journey.
            </p>
          </div>

          {/* Interactive Sitemap */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <Sitemap sitemapContent={sitemapContent} />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Platform Guide</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {sitemapContent.educationalContent.overview}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Platform Categories</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our platform is organized into logical categories to help you 
                    find the right tools for your specific financial needs and goals.
                  </p>

                  <div className="space-y-8">
                    {sitemapContent.educationalContent.platformCategories.map((category, index) => (
                      <div key={index} className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-cyan-800 mb-3">{category.category}</h4>
                        <p className="text-cyan-700 mb-4">{category.description}</p>
                        
                        <div className="space-y-4">
                          {category.subcategories.map((subcategory, subIndex) => (
                            <div key={subIndex} className="bg-cyan-100 p-4 rounded-lg">
                              <h5 className="font-bold text-cyan-800 mb-2">{subcategory.subcategory}</h5>
                              <p className="text-cyan-700 text-sm mb-3">{subcategory.purpose}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                <div>
                                  <h6 className="font-semibold text-cyan-800 mb-1">Available Tools:</h6>
                                  <ul className="text-cyan-700 space-y-1">
                                    {subcategory.tools.slice(0, 3).map((tool, toolIndex) => (
                                      <li key={toolIndex}>• {tool}</li>
                                    ))}
                                    {subcategory.tools.length > 3 && (
                                      <li className="text-cyan-600">...and {subcategory.tools.length - 3} more</li>
                                    )}
                                  </ul>
                                </div>
                                <div>
                                  <h6 className="font-semibold text-cyan-800 mb-1">Key Benefits:</h6>
                                  <ul className="text-cyan-700 space-y-1">
                                    {subcategory.benefits.map((benefit, benIndex) => (
                                      <li key={benIndex}>• {benefit}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Navigation Tips</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Make the most of our platform with these strategic approaches 
                    to tool selection and usage for optimal financial planning results.
                  </p>

                  <div className="space-y-6 mb-8">
                    {sitemapContent.educationalContent.navigationTips.map((tip, index) => (
                      <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h4 className="font-bold text-blue-800 mb-2">{tip.tip}</h4>
                        <p className="text-blue-700 text-sm mb-3">{tip.description}</p>
                        <p className="text-blue-600 text-sm mb-3"><strong>Next Steps:</strong> {tip.nextSteps}</p>
                        
                        <div className="text-xs text-blue-600">
                          <h5 className="font-semibold mb-1">Recommended Tools:</h5>
                          <ul className="space-y-1">
                            {tip.recommendedTools.map((tool, toolIndex) => (
                              <li key={toolIndex}>• {tool}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tool Selection by Scenario</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Choose your starting point based on your current financial 
                    situation and primary objectives for maximum effectiveness.
                  </p>

                  <div className="space-y-6 mb-8">
                    {sitemapContent.educationalContent.toolSelection.map((scenario, index) => (
                      <div key={index} className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                        <h4 className="font-bold text-indigo-800 mb-2">{scenario.scenario}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-indigo-700">
                          <div>
                            <p className="mb-2"><strong>Recommended Path:</strong> {scenario.progressionPath}</p>
                            <p><strong>Expected Timeframe:</strong> {scenario.timeframe}</p>
                          </div>
                          <div>
                            <h5 className="font-semibold text-indigo-800 mb-1">Starting Tools:</h5>
                            <ul className="space-y-1">
                              {scenario.startingTools.map((tool, toolIndex) => (
                                <li key={toolIndex}>• {tool}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Platform Benefits</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our comprehensive financial platform provides unique advantages 
                    for managing all aspects of your financial life in one place.
                  </p>

                  <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                    {sitemapContent.educationalContent.platformBenefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Navigation Features</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our intelligent navigation system helps you find and use 
                    the right tools efficiently for your financial planning needs.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {sitemapContent.toolFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Access</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Calculators</span>
                    <span className="font-semibold">45+ Tools</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Learning Hub</span>
                    <span className="font-semibold">Education</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Planning Tools</span>
                    <span className="font-semibold">Management</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Data</span>
                    <span className="font-semibold">Real-time</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Complete Platform</h3>
                <p className="text-sm mb-4">
                  Everything you need for comprehensive financial planning and management.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">100+</div>
                  <div className="text-sm opacity-90">Financial tools</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Categories</h3>
                <div className="space-y-3">
                  <a href="/tax-calculators" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Tax Calculators
                  </a>
                  <a href="/retirement-planning" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Retirement Planning
                  </a>
                  <a href="/investment-tools" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Tools
                  </a>
                  <a href="/budget-tools" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Budget & Planning
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
