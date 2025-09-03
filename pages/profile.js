import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive profile management
export async function getStaticProps() {
  const profileContent = {
    title: "Financial Profile Management - Personalize Your Money Management",
    description: "Manage your financial profile with personalized settings, goal tracking, progress monitoring, and customized insights. Create a comprehensive financial identity that adapts to your unique money management needs and preferences.",
    
    educationalContent: {
      overview: "Your financial profile serves as the foundation for personalized money management, enabling customized insights, tailored recommendations, and progress tracking aligned with your unique financial situation, goals, and preferences.",
      
      profileComponents: [
        {
          component: "Financial Demographics",
          description: "Basic financial information that influences strategy and recommendations",
          elements: ["Age and life stage", "Income level and stability", "Family situation and dependents", "Geographic location and cost of living"],
          purpose: "Enable age-appropriate and situation-specific financial guidance",
          benefits: ["Relevant advice and strategies", "Appropriate risk recommendations", "Life-stage specific tools", "Localized financial insights"]
        },
        {
          component: "Risk Tolerance Assessment",
          description: "Understanding your comfort level with financial risk and volatility",
          elements: ["Investment risk preference", "Time horizon considerations", "Financial security priorities", "Market volatility comfort level"],
          purpose: "Match investment strategies and financial products to personal comfort",
          benefits: ["Appropriate investment allocation", "Stress-free financial decisions", "Aligned strategy recommendations", "Comfortable growth approaches"]
        },
        {
          component: "Financial Goals Integration",
          description: "Connecting profile information with specific financial objectives",
          elements: ["Short and long-term goals", "Priority ranking system", "Timeline and deadline tracking", "Resource allocation preferences"],
          purpose: "Ensure all financial decisions support goal achievement",
          benefits: ["Goal-aligned recommendations", "Progress optimization", "Resource efficiency", "Strategic decision support"]
        },
        {
          component: "Behavioral Preferences",
          description: "Understanding your financial behavior patterns and preferences",
          elements: ["Learning style preferences", "Automation vs manual control", "Communication frequency preferences", "Decision-making approach"],
          purpose: "Customize user experience to match individual preferences",
          benefits: ["Personalized user interface", "Effective learning delivery", "Optimal engagement levels", "Preferred interaction methods"]
        }
      ],
      
      personalizationBenefits: [
        {
          benefit: "Tailored Financial Strategies",
          description: "Receive recommendations and strategies specifically designed for your situation",
          examples: ["Age-appropriate investment allocation", "Income-based budgeting strategies", "Life-stage specific financial priorities", "Risk-adjusted portfolio recommendations"],
          impact: "Higher success rates through relevant, actionable financial guidance"
        },
        {
          benefit: "Customized Learning Experience",
          description: "Educational content and tools adapted to your knowledge level and interests",
          examples: ["Progressive skill building", "Interest-based topic prioritization", "Preferred learning format delivery", "Complexity level adjustment"],
          impact: "Accelerated financial literacy development through effective learning"
        },
        {
          benefit: "Intelligent Progress Tracking",
          description: "Monitoring and insights that reflect your unique goals and circumstances",
          examples: ["Personalized milestone definitions", "Situation-specific progress metrics", "Individual success indicators", "Custom achievement celebrations"],
          impact: "Enhanced motivation and clarity through relevant progress measurement"
        },
        {
          benefit: "Proactive Opportunity Identification",
          description: "Early identification of financial opportunities relevant to your profile",
          examples: ["Career advancement timing", "Investment opportunity alerts", "Tax optimization strategies", "Life transition planning"],
          impact: "Maximized financial growth through timely opportunity recognition"
        }
      ],
      
      privacyAndSecurity: [
        "All profile information is encrypted and securely stored with bank-level security",
        "Personal financial data is never shared with third parties without explicit consent",
        "Profile information is used solely for personalization and improvement of your experience",
        "You maintain complete control over your data with ability to modify or delete at any time",
        "Regular security audits ensure ongoing protection of your personal information",
        "Minimal data collection approach - only information that enhances your experience",
        "Transparent data usage policies with clear explanation of how information is used",
        "Compliance with all relevant financial privacy regulations and industry standards"
      ],
      
      profileOptimization: [
        {
          strategy: "Regular Profile Updates",
          description: "Keeping profile information current as life circumstances change",
          frequency: "Quarterly review and updates",
          triggers: ["Major life events", "Income changes", "Goal modifications", "Risk tolerance shifts"],
          benefits: ["Maintained recommendation accuracy", "Relevant strategic guidance", "Optimal tool selection", "Current progress tracking"]
        },
        {
          strategy: "Progressive Information Enhancement",
          description: "Gradually adding more detailed information for improved personalization",
          approach: ["Start with basic information", "Add details over time", "Voluntary enhancement options", "Experience-based refinement"],
          benefits: ["Improved recommendation quality", "Enhanced user experience", "Deeper personalization", "Better goal achievement support"]
        },
        {
          strategy: "Preference Learning and Adaptation",
          description: "System learning from your interactions and decisions for better personalization",
          methods: ["Usage pattern analysis", "Decision preference tracking", "Success outcome monitoring", "Feedback integration"],
          benefits: ["Automatically improved recommendations", "Reduced manual configuration", "Adaptive user experience", "Intelligent system enhancement"]
        }
      ]
    },
    
    toolFeatures: [
      "Comprehensive financial profile creation with guided setup process",
      "Risk tolerance assessment with detailed analysis and recommendations",
      "Goal integration system connecting profile to financial objectives",
      "Privacy-first data management with complete user control",
      "Progressive enhancement options for improved personalization over time",
      "Intelligent recommendation engine based on profile characteristics",
      "Profile-based dashboard customization and tool selection",
      "Regular profile optimization suggestions and update reminders"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { profileContent },
    revalidate: 43200, // Update twice daily
  };
}

// CSR for interactive profile management functionality
const Profile = dynamic(() => import('@/pages/Profile'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading profile management...</p>
      </div>
    </div>
  )
});

export default function Page({ profileContent }) {
  return (
    <>
      <Head>
        <title>Financial Profile Management - Personalize Your Money Management | DollarMento</title>
        <meta name="description" content="Manage your financial profile with personalized settings, goal tracking, progress monitoring, and customized insights. Create a comprehensive financial identity for effective money management." />
        <meta property="og:title" content="Financial Profile Management - Personalize Money Management" />
        <meta property="og:description" content="Comprehensive financial profile management with personalized insights and recommendations" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Financial Profile Management" />
        <meta name="twitter:description" content="Personalize your financial experience with comprehensive profile management" />
        <meta name="keywords" content="financial profile, personalized finance, money management profile, financial preferences, risk assessment, financial planning profile" />
        <link rel="canonical" href="https://dollarmento.com/profile" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Financial Profile Management
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create and manage your personalized financial profile with customized settings, 
              goal tracking, and intelligent recommendations tailored to your unique needs.
            </p>
          </div>

          {/* Interactive Profile Management */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <Profile profileContent={profileContent} />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Profile Management Guide</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {profileContent.educationalContent.overview}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Profile Components</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    A comprehensive financial profile includes multiple components that work 
                    together to create a complete picture of your financial situation and preferences.
                  </p>

                  <div className="space-y-6">
                    {profileContent.educationalContent.profileComponents.map((component, index) => (
                      <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-purple-800 mb-3">{component.component}</h4>
                        <p className="text-purple-700 mb-3">{component.description}</p>
                        <p className="text-purple-600 text-sm mb-3"><strong>Purpose:</strong> {component.purpose}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-purple-800 mb-2">Key Elements:</h5>
                            <ul className="text-purple-700 space-y-1">
                              {component.elements.map((element, idx) => (
                                <li key={idx}>• {element}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-purple-800 mb-2">Benefits:</h5>
                            <ul className="text-purple-700 space-y-1">
                              {component.benefits.map((benefit, idx) => (
                                <li key={idx}>• {benefit}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Personalization Benefits</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    A well-crafted financial profile unlocks significant benefits through 
                    personalized recommendations and tailored financial strategies.
                  </p>

                  <div className="space-y-6 mb-8">
                    {profileContent.educationalContent.personalizationBenefits.map((benefit, index) => (
                      <div key={index} className="bg-violet-50 border border-violet-200 rounded-lg p-6">
                        <h4 className="font-bold text-violet-800 mb-2">{benefit.benefit}</h4>
                        <p className="text-violet-700 text-sm mb-3">{benefit.description}</p>
                        <p className="text-violet-600 text-sm mb-3"><strong>Impact:</strong> {benefit.impact}</p>
                        
                        <div className="text-xs text-violet-600">
                          <h5 className="font-semibold mb-1">Examples:</h5>
                          <ul className="space-y-1">
                            {benefit.examples.map((example, exampleIndex) => (
                              <li key={exampleIndex}>• {example}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Privacy & Security</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your financial profile information is protected with the highest 
                    security standards and privacy practices in the industry.
                  </p>

                  <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                    {profileContent.educationalContent.privacyAndSecurity.map((practice, index) => (
                      <li key={index}>{practice}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Profile Optimization Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Maximize the value of your financial profile through strategic 
                    optimization and regular enhancement practices.
                  </p>

                  <div className="space-y-6 mb-8">
                    {profileContent.educationalContent.profileOptimization.map((strategy, index) => (
                      <div key={index} className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                        <h4 className="font-bold text-indigo-800 mb-2">{strategy.strategy}</h4>
                        <p className="text-indigo-700 text-sm mb-2">{strategy.description}</p>
                        {strategy.frequency && (
                          <p className="text-indigo-600 text-sm mb-2"><strong>Frequency:</strong> {strategy.frequency}</p>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-indigo-800 mb-1">
                              {strategy.triggers ? 'Update Triggers:' : strategy.approach ? 'Approach:' : 'Methods:'}
                            </h5>
                            <ul className="text-indigo-700 space-y-1">
                              {(strategy.triggers || strategy.approach || strategy.methods).map((item, itemIndex) => (
                                <li key={itemIndex}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-indigo-800 mb-1">Benefits:</h5>
                            <ul className="text-indigo-700 space-y-1">
                              {strategy.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex}>• {benefit}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Profile Management Features</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our comprehensive profile management system provides all the tools 
                    you need for effective personalization and optimization.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {profileContent.toolFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Profile Components</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Demographics</span>
                    <span className="font-semibold">Essential</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Risk Assessment</span>
                    <span className="font-semibold">Important</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Goals Integration</span>
                    <span className="font-semibold">Critical</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Preferences</span>
                    <span className="font-semibold">Enhanced</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Personalized Experience</h3>
                <p className="text-sm mb-4">
                  Create a financial profile that adapts to your unique needs and goals.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Custom</div>
                  <div className="text-sm opacity-90">Financial strategies</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Features</h3>
                <div className="space-y-3">
                  <a href="/goals" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Goal Management
                  </a>
                  <a href="/budget-buddy" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Budget Dashboard
                  </a>
                  <a href="/risk-assessment" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Risk Assessment
                  </a>
                  <a href="/financial-journey" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Financial Journey
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
