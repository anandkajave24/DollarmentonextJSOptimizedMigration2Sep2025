import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive smart card features
export async function getStaticProps() {
  const smartCardContent = {
    title: "Smart Credit Card Selection - Find Your Perfect Card Match",
    description: "Intelligent credit card selection tool with personalized recommendations, reward optimization analysis, and comprehensive card comparison. Find the perfect credit card that matches your spending patterns and financial goals.",
    
    educationalContent: {
      overview: "Smart credit card selection involves analyzing your spending patterns, financial goals, and lifestyle preferences to identify cards that maximize value while minimizing costs. The right card strategy can earn significant rewards, provide valuable protections, and support your financial objectives.",
      
      selectionCriteria: [
        {
          criterion: "Spending Pattern Analysis",
          description: "Understanding where and how you spend money to optimize reward earning potential",
          categories: [
            {
              category: "Everyday Spending",
              examples: ["Groceries", "Gas stations", "Restaurants", "Online shopping"],
              strategy: "Choose cards with high rewards in your largest spending categories",
              optimization: "Track 3-6 months of expenses to identify patterns before selecting cards"
            },
            {
              category: "Rotating Categories",
              examples: ["Quarterly bonus categories", "Seasonal promotions", "Limited-time offers"],
              strategy: "Maximize 5% categories while ensuring you can meet spending requirements",
              optimization: "Set calendar reminders for category activation and spending tracking"
            },
            {
              category: "Large Purchases",
              examples: ["Home improvements", "Travel bookings", "Business expenses"],
              strategy: "Time major purchases with sign-up bonuses or special promotions",
              optimization: "Plan purchases around bonus earning opportunities when possible"
            }
          ]
        },
        {
          criterion: "Reward Structure Evaluation",
          description: "Comparing different reward types and their value propositions",
          structures: [
            {
              type: "Cash Back Cards",
              advantages: ["Simple redemption", "Immediate value", "No expiration", "Flexible use"],
              disadvantages: ["Lower potential value", "Limited premium benefits", "Taxable income"],
              optimalFor: ["Simple preferences", "Infrequent travelers", "Straightforward value"],
              valueTips: ["Look for 2%+ flat rate cards", "Maximize category bonuses", "Redeem regularly to avoid loss"]
            },
            {
              type: "Travel Reward Cards",
              advantages: ["Higher redemption value", "Transfer partners", "Premium benefits", "Status perks"],
              disadvantages: ["Complex redemption", "Devaluation risk", "Annual fees", "Expiration dates"],
              optimalFor: ["Regular travelers", "High spenders", "Flexibility seekers"],
              valueTips: ["Learn transfer partners", "Book award travel strategically", "Use travel benefits fully"]
            },
            {
              type: "Hybrid Reward Cards",
              advantages: ["Multiple redemption options", "Balanced earning", "Flexibility"],
              disadvantages: ["Potentially lower rates", "Complexity", "Diluted focus"],
              optimalFor: ["Varied preferences", "Moderate spenders", "Option flexibility"],
              valueTips: ["Compare all redemption values", "Focus on strongest categories", "Monitor changing terms"]
            }
          ]
        },
        {
          criterion: "Fee Analysis and Justification",
          description: "Evaluating whether annual fees are justified by benefits and rewards",
          feeCategories: [
            {
              category: "No Annual Fee Cards",
              benefits: ["No ongoing cost", "Simple value proposition", "Good for beginners"],
              limitations: ["Lower reward rates", "Fewer premium benefits", "Limited sign-up bonuses"],
              strategy: "Focus on highest earning rates in your spending categories"
            },
            {
              category: "Low Fee Cards ($95 or less)",
              benefits: ["Moderate premium benefits", "Higher reward rates", "Travel protections"],
              breakEven: "Typically need $3,000-$5,000 annual spending to justify",
              strategy: "Calculate total value including benefits, not just rewards"
            },
            {
              category: "Premium Cards ($95-$500)",
              benefits: ["Significant travel benefits", "High reward rates", "Elite status", "Concierge services"],
              breakEven: "Typically need $10,000+ annual spending plus benefit utilization",
              strategy: "Must actively use travel benefits and premium services"
            },
            {
              category: "Ultra-Premium Cards ($500+)",
              benefits: ["Luxury travel benefits", "Highest reward rates", "Exclusive access"],
              breakEven: "Typically need $25,000+ annual spending plus full benefit utilization",
              strategy: "Only worthwhile for high spenders who maximize all benefits"
            }
          ]
        }
      ],
      
      cardStrategies: [
        {
          strategy: "Single Card Simplicity",
          description: "Using one primary card for all spending to maximize rewards and simplify management",
          advantages: ["Simple tracking", "Easier management", "Concentrated rewards", "Single relationship"],
          considerations: ["May not optimize all categories", "Single point of failure", "Limited benefit diversity"],
          bestFor: ["Beginners", "Simple preferences", "Lower spending volume", "Minimal complexity tolerance"],
          implementation: ["Choose highest overall earning card", "Ensure broad acceptance", "Automate payments", "Monitor for better options annually"]
        },
        {
          strategy: "Two-Card System",
          description: "Pairing complementary cards to optimize major spending categories",
          advantages: ["Category optimization", "Backup payment method", "Benefit diversification", "Manageable complexity"],
          considerations: ["Increased complexity", "Multiple payments", "Annual fee considerations"],
          bestFor: ["Moderate spenders", "Clear category preferences", "Some complexity tolerance"],
          implementation: ["Primary card for largest category", "Secondary for other categories", "Clear usage rules", "Regular optimization review"]
        },
        {
          strategy: "Multi-Card Portfolio",
          description: "Using multiple specialized cards to maximize rewards across all spending categories",
          advantages: ["Maximum optimization", "Extensive benefits", "Risk diversification", "Sign-up bonus opportunities"],
          considerations: ["High complexity", "Multiple fees", "Tracking challenges", "Credit impact"],
          bestFor: ["High spenders", "Optimization enthusiasts", "Complex strategy tolerance"],
          implementation: ["Specialized cards for each category", "Systematic tracking", "Regular portfolio review", "Strategic application timing"]
        }
      ],
      
      selectionProcess: [
        {
          step: "Spending Analysis",
          description: "Analyze 6-12 months of spending to identify patterns and categories",
          actions: ["Export bank and credit card statements", "Categorize all expenses", "Identify top spending categories", "Calculate monthly averages"],
          timeframe: "1-2 weeks for thorough analysis"
        },
        {
          step: "Goal Definition",
          description: "Define what you want to achieve with credit card rewards and benefits",
          actions: ["Identify primary goals (cash back, travel, perks)", "Set annual earning targets", "Consider lifestyle benefits", "Evaluate fee tolerance"],
          timeframe: "1 week for goal clarification"
        },
        {
          step: "Research and Comparison",
          description: "Research available cards and compare based on your specific needs",
          actions: ["Compare earning rates in your categories", "Evaluate sign-up bonuses", "Review benefits and protections", "Calculate break-even points"],
          timeframe: "2-3 weeks for comprehensive research"
        },
        {
          step: "Application Strategy",
          description: "Plan application timing and order to maximize approvals and bonuses",
          actions: ["Check credit score and report", "Plan application spacing", "Optimize approval odds", "Prepare for spending requirements"],
          timeframe: "1 week for application preparation"
        },
        {
          step: "Implementation and Optimization",
          description: "Execute card strategy and continuously optimize for maximum value",
          actions: ["Set up automatic payments", "Track spending and rewards", "Use all applicable benefits", "Review and adjust quarterly"],
          timeframe: "Ongoing optimization process"
        }
      ],
      
      advancedStrategies: [
        "Churning sign-up bonuses responsibly while maintaining good credit",
        "Manufacturing spending through gift cards and money orders when beneficial",
        "Optimizing application timing around credit report factors",
        "Using business credit cards for additional earning opportunities",
        "Leveraging authorized user accounts for family optimization",
        "Timing major purchases with sign-up bonus periods",
        "Using multiple cards strategically for purchase protections",
        "Optimizing credit utilization across multiple cards for score benefits"
      ]
    },
    
    toolFeatures: [
      "Intelligent card recommendation engine based on spending pattern analysis",
      "Comprehensive card comparison tool with side-by-side feature analysis",
      "Annual value calculator including rewards, benefits, and fees",
      "Sign-up bonus tracker with spending requirement timelines",
      "Portfolio optimization tool for multi-card strategies",
      "Credit score impact calculator for new applications",
      "Benefit utilization tracker to maximize card value",
      "Application timing optimizer for maximum approval odds"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { smartCardContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive smart card selection functionality
const Smart_credit_card = dynamic(() => import('@/pages/SmartCreditCard'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading smart card selector...</p>
      </div>
    </div>
  )
});

export default function Page({ smartCardContent }) {
  return (
    <>
      <Head>
        <title>Smart Credit Card Selection - Find Your Perfect Card Match | DollarMento</title>
        <meta name="description" content="Intelligent credit card selection tool with personalized recommendations, reward optimization analysis, and comprehensive card comparison. Find the perfect credit card that matches your spending patterns." />
        <meta property="og:title" content="Smart Credit Card Selection - Find Your Perfect Match" />
        <meta property="og:description" content="Intelligent card selection with personalized recommendations and optimization analysis" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/smart-credit-card" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Smart Credit Card Selection" />
        <meta name="twitter:description" content="Find the perfect credit card with intelligent recommendations and analysis" />
        <meta name="keywords" content="smart credit card, credit card selection, card recommendation, reward optimization, credit card comparison, best credit cards" />
        <link rel="canonical" href="https://dollarmento.com/smart-credit-card" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Smart Credit Card Selection
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find your perfect credit card match with intelligent recommendations, 
              reward optimization analysis, and comprehensive comparison tools.
            </p>
          </div>

          {/* Interactive Smart Card Selector */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <Smart_credit_card smartCardContent={smartCardContent} />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Card Selection Guide</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {smartCardContent.educationalContent.overview}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Selection Criteria</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Smart card selection requires analyzing multiple factors to find 
                    the optimal match for your financial situation and goals.
                  </p>

                  <div className="space-y-8">
                    {smartCardContent.educationalContent.selectionCriteria.map((criterion, index) => (
                      <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-purple-800 mb-3">{criterion.criterion}</h4>
                        <p className="text-purple-700 mb-4">{criterion.description}</p>
                        
                        {criterion.categories && (
                          <div className="space-y-4">
                            {criterion.categories.map((category, catIndex) => (
                              <div key={catIndex} className="bg-purple-100 p-4 rounded-lg">
                                <h5 className="font-bold text-purple-800 mb-2">{category.category}</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-purple-700 mb-2"><strong>Examples:</strong></p>
                                    <ul className="text-purple-600 space-y-1">
                                      {category.examples.map((example, exIndex) => (
                                        <li key={exIndex}>• {example}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <p className="text-purple-700 mb-2"><strong>Strategy:</strong> {category.strategy}</p>
                                    <p className="text-purple-700"><strong>Optimization:</strong> {category.optimization}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {criterion.structures && (
                          <div className="space-y-4">
                            {criterion.structures.map((structure, structIndex) => (
                              <div key={structIndex} className="bg-purple-100 p-4 rounded-lg">
                                <h5 className="font-bold text-purple-800 mb-2">{structure.type}</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                  <div>
                                    <h6 className="font-semibold text-purple-800 mb-1">Advantages:</h6>
                                    <ul className="text-purple-700 space-y-1">
                                      {structure.advantages.map((adv, advIndex) => (
                                        <li key={advIndex}>• {adv}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h6 className="font-semibold text-purple-800 mb-1">Optimal For:</h6>
                                    <ul className="text-purple-700 space-y-1">
                                      {structure.optimalFor.map((opt, optIndex) => (
                                        <li key={optIndex}>• {opt}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {criterion.feeCategories && (
                          <div className="space-y-4">
                            {criterion.feeCategories.map((fee, feeIndex) => (
                              <div key={feeIndex} className="bg-purple-100 p-4 rounded-lg">
                                <h5 className="font-bold text-purple-800 mb-2">{fee.category}</h5>
                                <div className="text-sm text-purple-700 space-y-2">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <h6 className="font-semibold">Benefits:</h6>
                                      <ul className="space-y-1">
                                        {fee.benefits.map((benefit, benIndex) => (
                                          <li key={benIndex}>• {benefit}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      {fee.breakEven && <p><strong>Break-Even:</strong> {fee.breakEven}</p>}
                                      <p><strong>Strategy:</strong> {fee.strategy}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Card Management Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different card strategies offer varying levels of complexity 
                    and optimization potential based on your preferences and spending.
                  </p>

                  <div className="space-y-6 mb-8">
                    {smartCardContent.educationalContent.cardStrategies.map((strategy, index) => (
                      <div key={index} className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                        <h4 className="font-bold text-indigo-800 mb-2">{strategy.strategy}</h4>
                        <p className="text-indigo-700 text-sm mb-3">{strategy.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                          <div>
                            <h5 className="font-semibold text-indigo-800 mb-2">Advantages:</h5>
                            <ul className="text-indigo-700 space-y-1 mb-3">
                              {strategy.advantages.map((advantage, advIndex) => (
                                <li key={advIndex}>• {advantage}</li>
                              ))}
                            </ul>
                            <h5 className="font-semibold text-indigo-800 mb-2">Best For:</h5>
                            <ul className="text-indigo-700 space-y-1">
                              {strategy.bestFor.map((fit, fitIndex) => (
                                <li key={fitIndex}>• {fit}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-indigo-800 mb-2">Considerations:</h5>
                            <ul className="text-indigo-700 space-y-1 mb-3">
                              {strategy.considerations.map((consideration, consIndex) => (
                                <li key={consIndex}>• {consideration}</li>
                              ))}
                            </ul>
                            <h5 className="font-semibold text-indigo-800 mb-2">Implementation:</h5>
                            <ul className="text-indigo-700 space-y-1">
                              {strategy.implementation.map((impl, implIndex) => (
                                <li key={implIndex}>• {impl}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Selection Process</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Follow this systematic process to identify and implement 
                    the optimal credit card strategy for your situation.
                  </p>

                  <div className="space-y-4 mb-8">
                    {smartCardContent.educationalContent.selectionProcess.map((step, index) => (
                      <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h4 className="font-bold text-green-800 mb-2">Step {index + 1}: {step.step}</h4>
                        <p className="text-green-700 text-sm mb-3">{step.description}</p>
                        <p className="text-green-600 text-sm mb-3"><strong>Timeframe:</strong> {step.timeframe}</p>
                        
                        <div className="text-xs text-green-600">
                          <h5 className="font-semibold mb-1">Key Actions:</h5>
                          <ul className="space-y-1">
                            {step.actions.map((action, actionIndex) => (
                              <li key={actionIndex}>• {action}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Advanced Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Advanced techniques for experienced users to maximize 
                    credit card value while maintaining responsible usage.
                  </p>

                  <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                    {smartCardContent.educationalContent.advancedStrategies.map((strategy, index) => (
                      <li key={index}>{strategy}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Selection Tool Features</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our comprehensive selection platform provides all the tools 
                    you need for optimal credit card strategy development.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {smartCardContent.toolFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Selection Factors</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Spending Patterns</span>
                    <span className="font-semibold">Primary</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Reward Type</span>
                    <span className="font-semibold">Important</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Annual Fees</span>
                    <span className="font-semibold">Consider</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Benefits</span>
                    <span className="font-semibold">Bonus</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Smart Selection</h3>
                <p className="text-sm mb-4">
                  Find the perfect credit card match with intelligent analysis and recommendations.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Perfect</div>
                  <div className="text-sm opacity-90">Card match</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Card Categories</h3>
                <div className="space-y-3">
                  <a href="/cash-back-cards" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Cash Back Cards
                  </a>
                  <a href="/travel-cards" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Travel Rewards
                  </a>
                  <a href="/business-cards" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Business Cards
                  </a>
                  <a href="/premium-cards" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Premium Cards
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
