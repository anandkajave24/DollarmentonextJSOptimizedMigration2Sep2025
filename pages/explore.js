import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive exploration
export async function getStaticProps() {
  const exploreContent = {
    title: "Explore Financial Education - Discover Money Management Topics",
    description: "Explore comprehensive financial education topics including budgeting, investing, retirement planning, debt management, and wealth building strategies. Discover interactive tools and educational resources.",
    
    educationalContent: {
      overview: "Explore the comprehensive world of financial education through interactive tools, educational content, and practical resources. Our exploration platform helps you discover financial topics that matter most to your current situation and future goals.",
      
      explorationCategories: [
        {
          category: "Personal Finance Fundamentals",
          description: "Discover the essential building blocks of financial success and money management.",
          topics: [
            {
              title: "Budgeting Mastery",
              content: "Learn various budgeting methods including zero-based budgeting, 50/30/20 rule, and envelope systems.",
              keyPoints: ["Monthly budget creation", "Expense tracking techniques", "Spending optimization", "Budget adjustment strategies"]
            },
            {
              title: "Emergency Fund Building",
              content: "Understand the importance of emergency funds and strategies for building financial safety nets.",
              keyPoints: ["Emergency fund size calculation", "High-yield savings accounts", "Automatic savings plans", "Emergency fund maintenance"]
            },
            {
              title: "Debt Management",
              content: "Explore effective debt elimination strategies and credit management techniques.",
              keyPoints: ["Debt avalanche method", "Debt snowball approach", "Credit score improvement", "Debt consolidation options"]
            }
          ]
        },
        {
          category: "Investment & Wealth Building",
          description: "Explore investment strategies and wealth building techniques for long-term financial growth.",
          topics: [
            {
              title: "Investment Fundamentals",
              content: "Discover the basics of investing including risk tolerance, asset allocation, and portfolio diversification.",
              keyPoints: ["Risk assessment", "Asset allocation strategies", "Investment account types", "Dollar-cost averaging"]
            },
            {
              title: "Stock Market Education",
              content: "Explore stock market investing including individual stocks, ETFs, and mutual funds.",
              keyPoints: ["Stock analysis basics", "ETF vs mutual funds", "Market volatility management", "Long-term investing strategies"]
            },
            {
              title: "Real Estate Investing",
              content: "Understand real estate investment options including REITs, rental properties, and property flipping.",
              keyPoints: ["REIT investing", "Rental property analysis", "Real estate financing", "Property management basics"]
            }
          ]
        },
        {
          category: "Retirement & Future Planning",
          description: "Explore retirement planning strategies and long-term financial security planning.",
          topics: [
            {
              title: "401k Optimization",
              content: "Maximize employer-sponsored retirement benefits and understand contribution strategies.",
              keyPoints: ["Employer matching", "Contribution limits", "Investment selection", "401k rollovers"]
            },
            {
              title: "IRA Strategies",
              content: "Explore Individual Retirement Account options including Traditional and Roth IRAs.",
              keyPoints: ["IRA contribution limits", "Tax implications", "Conversion strategies", "Withdrawal rules"]
            },
            {
              title: "Social Security Planning",
              content: "Understand Social Security benefits and optimization strategies for retirement income.",
              keyPoints: ["Benefit calculation", "Claiming strategies", "Working in retirement", "Spousal benefits"]
            }
          ]
        },
        {
          category: "Advanced Financial Strategies",
          description: "Explore sophisticated financial strategies for experienced investors and high earners.",
          topics: [
            {
              title: "Tax Optimization",
              content: "Advanced tax planning strategies including tax-loss harvesting and deduction optimization.",
              keyPoints: ["Tax-advantaged accounts", "Tax-loss harvesting", "Deduction strategies", "Tax planning timing"]
            },
            {
              title: "Estate Planning",
              content: "Explore estate planning basics including wills, trusts, and wealth transfer strategies.",
              keyPoints: ["Will creation", "Trust structures", "Beneficiary planning", "Estate tax considerations"]
            },
            {
              title: "Business Finance",
              content: "Understand business financial management including startup funding and business accounting.",
              keyPoints: ["Business structure selection", "Startup funding options", "Business accounting", "Tax strategies for businesses"]
            }
          ]
        }
      ],
      
      explorationTools: [
        "Interactive financial assessment to identify relevant topics",
        "Personalized learning path recommendations based on goals",
        "Progress tracking across different financial education areas",
        "Bookmarking system for saving interesting topics and resources",
        "Search functionality to find specific financial concepts",
        "Related topic suggestions to expand learning"
      ],
      
      learningApproaches: [
        {
          approach: "Guided Exploration",
          description: "Follow structured learning paths based on your financial goals and experience level",
          benefits: ["Systematic learning progression", "Goal-aligned content", "Milestone tracking"]
        },
        {
          approach: "Topic Discovery",
          description: "Browse financial topics by category and discover new areas of interest",
          benefits: ["Broad knowledge exposure", "Flexible learning pace", "Interest-driven education"]
        },
        {
          approach: "Problem-Solving Focus",
          description: "Find solutions to specific financial challenges and situations",
          benefits: ["Immediate applicability", "Targeted learning", "Practical solutions"]
        }
      ]
    },
    
    platformFeatures: [
      "Comprehensive library of financial education topics and resources",
      "Interactive exploration tools with personalized recommendations",
      "Progress tracking and achievement system for learning milestones",
      "Mobile-responsive design for learning on any device",
      "Integration with calculators and planning tools for practical application",
      "Regular content updates with current financial trends and strategies"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { exploreContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive exploration functionality
const Explore = dynamic(() => import('@/pages/Explore'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading exploration platform...</p>
      </div>
    </div>
  )
});

export default function Page({ exploreContent }) {
  return (
    <>
      <Head>
        <title>Explore Financial Education - Discover Money Management Topics | DollarMento</title>
        <meta name="description" content="Explore comprehensive financial education topics including budgeting, investing, retirement planning, debt management, and wealth building strategies. Discover interactive tools and educational resources." />
        <meta property="og:title" content="Explore Financial Education - Discover Money Management Topics" />
        <meta property="og:description" content="Comprehensive exploration of financial education topics with interactive tools and resources" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/explore" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Explore Financial Education Topics" />
        <meta name="twitter:description" content="Discover financial education topics and interactive learning resources" />
        <meta name="keywords" content="financial education, money management topics, budgeting, investing, retirement planning, debt management, wealth building, financial literacy" />
        <link rel="canonical" href="https://dollarmento.com/explore" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Financial Education
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover comprehensive financial education topics, interactive tools, and resources. 
              Explore budgeting, investing, retirement planning, and wealth building at your own pace.
            </p>
          </div>

          {/* Interactive Exploration Platform */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <Explore exploreContent={exploreContent} />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Financial Education Discovery</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {exploreContent.educationalContent.overview}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Exploration Categories</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our comprehensive exploration platform organizes financial education into key categories, 
                    making it easy to discover relevant topics and build comprehensive financial knowledge.
                  </p>

                  <div className="space-y-8">
                    {exploreContent.educationalContent.explorationCategories.map((category, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-xl font-bold text-gray-800 mb-3">{category.category}</h4>
                        <p className="text-gray-700 mb-4">{category.description}</p>
                        
                        <div className="space-y-4">
                          {category.topics.map((topic, topicIndex) => (
                            <div key={topicIndex} className="bg-white border border-gray-200 rounded-lg p-4">
                              <h5 className="font-semibold text-gray-800 mb-2">{topic.title}</h5>
                              <p className="text-gray-600 text-sm mb-3">{topic.content}</p>
                              <div className="text-xs text-gray-500">
                                <h6 className="font-semibold mb-1">Key Learning Points:</h6>
                                <ul className="space-y-1">
                                  {topic.keyPoints.map((point, pointIndex) => (
                                    <li key={pointIndex}>• {point}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Learning Approaches</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Choose from multiple learning approaches to match your preferred style and 
                    financial education goals.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {exploreContent.educationalContent.learningApproaches.map((approach, index) => (
                      <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <h4 className="font-bold text-purple-800 mb-2">{approach.approach}</h4>
                        <p className="text-purple-700 text-sm mb-3">{approach.description}</p>
                        <div className="text-xs text-purple-600">
                          <h5 className="font-semibold mb-1">Benefits:</h5>
                          <ul className="space-y-1">
                            {approach.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex}>• {benefit}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Exploration Tools</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our platform provides advanced tools to enhance your financial education 
                    exploration and learning experience.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {exploreContent.educationalContent.explorationTools.map((tool, index) => (
                      <li key={index}>{tool}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Platform Features</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our exploration platform is designed to provide comprehensive, flexible, 
                    and engaging financial education experiences.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {exploreContent.platformFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Exploration Stats</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Topic Categories</span>
                    <span className="font-semibold">4 Major Areas</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Learning Topics</span>
                    <span className="font-semibold">12+ Subjects</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Learning Paths</span>
                    <span className="font-semibold">3 Approaches</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interactive Tools</span>
                    <span className="font-semibold">6+ Features</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Start Exploring</h3>
                <p className="text-sm mb-4">
                  Begin your financial education journey with guided exploration and personalized learning.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Discover</div>
                  <div className="text-sm opacity-90">Your path to financial literacy</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Exploration</h3>
                <div className="space-y-3">
                  <a href="/learning" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Financial Learning Hub
                  </a>
                  <a href="/guide" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Planning Guides
                  </a>
                  <a href="/financial-calculators" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Calculator Tools
                  </a>
                  <a href="/goals" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Goal Setting
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
