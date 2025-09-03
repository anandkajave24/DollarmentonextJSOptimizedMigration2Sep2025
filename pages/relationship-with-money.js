import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive relationship assessment
export async function getStaticProps() {
  const relationshipContent = {
    title: "Your Relationship with Money - Psychology & Financial Mindset",
    description: "Explore and improve your relationship with money through psychological insights, mindset assessment, and practical strategies. Understand money beliefs, overcome financial stress, and develop healthy financial habits.",
    
    educationalContent: {
      overview: "Your relationship with money significantly impacts your financial decisions, stress levels, and overall financial success. By understanding your money mindset, identifying limiting beliefs, and developing healthy financial habits, you can transform your financial life and achieve better outcomes.",
      
      moneyPersonalities: [
        {
          type: "The Saver",
          characteristics: "Conservative with money, prioritizes security, tends to under-spend even when financially secure",
          strengths: ["Excellent at building emergency funds", "Low debt levels", "Strong financial discipline", "Prepared for unexpected expenses"],
          challenges: ["May miss investment opportunities", "Difficulty enjoying money", "Over-conservative investing", "Stress about spending"],
          improvements: ["Set 'fun money' budget", "Learn about inflation risk", "Gradual investment increase", "Balance saving with living"]
        },
        {
          type: "The Spender",
          characteristics: "Enjoys using money for experiences and purchases, may struggle with saving and budgeting",
          strengths: ["Enjoys life and experiences", "Comfortable with money flow", "Often generous with others", "Not overly anxious about money"],
          challenges: ["Difficulty building savings", "Impulse purchasing", "Inadequate emergency funds", "Retirement under-preparation"],
          improvements: ["Automate savings first", "Use waiting periods for purchases", "Track spending patterns", "Set specific financial goals"]
        },
        {
          type: "The Avoider",
          characteristics: "Prefers not to think about or deal with money matters, often procrastinates on financial decisions",
          strengths: ["Low money-related stress", "Trusting of financial advisors", "Focus on non-financial priorities", "Not obsessed with wealth"],
          challenges: ["Poor financial planning", "Missed opportunities", "Inadequate monitoring", "Vulnerability to financial problems"],
          improvements: ["Start with basic tracking", "Automate financial systems", "Set simple goals", "Regular check-ins"]
        },
        {
          type: "The Worrier",
          characteristics: "Anxious about money despite financial stability, constantly fears financial disaster",
          strengths: ["Highly motivated to save", "Conservative financial approach", "Excellent risk awareness", "Thorough financial planning"],
          challenges: ["Excessive financial anxiety", "Over-conservative investing", "Difficulty enjoying money", "Analysis paralysis"],
          improvements: ["Focus on progress made", "Set worry time limits", "Professional counseling", "Gradual risk tolerance building"]
        }
      ],
      
      commonMoneyBeliefs: [
        {
          belief: "Money is the root of all evil",
          impact: "Creates guilt around wealth building and financial success",
          reframe: "Money is a tool that can be used for good or harm - it amplifies your values",
          actions: ["Identify positive uses of money", "Focus on values-based spending", "See money as freedom enabler"]
        },
        {
          belief: "I don't deserve financial success",
          impact: "Self-sabotages financial progress and opportunities",
          reframe: "Everyone deserves financial security and the opportunity to thrive",
          actions: ["List personal accomplishments", "Practice self-compassion", "Set achievable financial goals"]
        },
        {
          belief: "Rich people are greedy or corrupt",
          impact: "Creates unconscious resistance to building wealth",
          reframe: "Wealth enables generosity and positive impact when managed responsibly",
          actions: ["Study ethical wealthy individuals", "Plan charitable giving", "Focus on values alignment"]
        },
        {
          belief: "Money is too complicated for me",
          impact: "Avoids learning and taking control of finances",
          reframe: "Financial literacy can be learned step by step, starting with basics",
          actions: ["Start with simple concepts", "Use educational resources", "Seek guidance when needed"]
        }
      ],
      
      improvementStrategies: [
        {
          strategy: "Mindfulness and Awareness",
          description: "Developing conscious awareness of your money thoughts, emotions, and behaviors",
          techniques: ["Money emotion tracking", "Spending decision analysis", "Financial stress recognition", "Value-based decision making"]
        },
        {
          strategy: "Belief System Examination",
          description: "Identifying and challenging limiting beliefs about money and financial success",
          techniques: ["Childhood money memory exploration", "Belief origin investigation", "Positive affirmation practice", "Success story visualization"]
        },
        {
          strategy: "Behavioral Change",
          description: "Implementing specific actions and habits to improve financial behaviors",
          techniques: ["Automated financial systems", "Environmental design", "Habit stacking", "Progress celebration"]
        },
        {
          strategy: "Stress Management",
          description: "Developing healthy coping strategies for financial stress and anxiety",
          techniques: ["Meditation and relaxation", "Professional counseling", "Support group participation", "Physical exercise and wellness"]
        }
      ],
      
      healthyHabits: [
        "Regular financial check-ins without judgment or stress",
        "Automated systems to reduce daily money decisions",
        "Values-based spending and saving decisions",
        "Open communication about money with family/partners",
        "Continuous learning about personal finance topics",
        "Professional guidance when facing complex decisions",
        "Balance between saving for the future and enjoying the present",
        "Regular gratitude practice for current financial blessings"
      ]
    },
    
    toolFeatures: [
      "Money personality assessment and detailed analysis",
      "Belief system identification and reframing exercises",
      "Stress level evaluation and coping strategy recommendations",
      "Personalized improvement plan based on assessment results",
      "Progress tracking for mindset and behavior changes",
      "Educational resources tailored to your money personality"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { relationshipContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive relationship assessment functionality
const NewRelationshipWithMoney = dynamic(() => import('@/pages/NewRelationshipWithMoney'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading relationship assessment...</p>
      </div>
    </div>
  )
});

export default function Page({ relationshipContent }) {
  return (
    <>
      <Head>
        <title>Your Relationship with Money - Psychology & Financial Mindset | DollarMento</title>
        <meta name="description" content="Explore and improve your relationship with money through psychological insights, mindset assessment, and practical strategies. Understand money beliefs, overcome financial stress, and develop healthy habits." />
        <meta property="og:title" content="Your Relationship with Money - Psychology & Financial Mindset" />
        <meta property="og:description" content="Understand your money psychology and develop healthy financial relationships and mindset" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/relationship-with-money" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Relationship with Money Psychology" />
        <meta name="twitter:description" content="Explore money psychology, overcome limiting beliefs, and develop healthy financial mindset" />
        <meta name="keywords" content="money psychology, financial mindset, money beliefs, financial stress, money personality, financial behavior, money relationship, financial psychology" />
        <link rel="canonical" href="https://dollarmento.com/relationship-with-money" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Relationship with Money
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore and improve your relationship with money through psychological insights, 
              mindset assessment, and practical strategies for developing healthy financial habits.
            </p>
          </div>

          {/* Interactive Relationship Assessment */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <NewRelationshipWithMoney relationshipContent={relationshipContent} />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Money Psychology & Financial Mindset</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {relationshipContent.educationalContent.overview}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Money Personality Types</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Understanding your money personality helps identify patterns, strengths, and areas 
                    for improvement in your financial decision-making and behavior.
                  </p>

                  <div className="space-y-6">
                    {relationshipContent.educationalContent.moneyPersonalities.map((personality, index) => (
                      <div key={index} className="bg-pink-50 border border-pink-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-pink-800 mb-3">{personality.type}</h4>
                        <p className="text-pink-700 mb-4">{personality.characteristics}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-pink-800 mb-2">Strengths:</h5>
                            <ul className="text-pink-700 space-y-1">
                              {personality.strengths.map((strength, idx) => (
                                <li key={idx}>• {strength}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-pink-800 mb-2">Challenges:</h5>
                            <ul className="text-pink-700 space-y-1">
                              {personality.challenges.map((challenge, idx) => (
                                <li key={idx}>• {challenge}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h5 className="font-semibold text-pink-800 mb-2">Improvement Strategies:</h5>
                          <div className="flex flex-wrap gap-2">
                            {personality.improvements.map((improvement, idx) => (
                              <span key={idx} className="bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs">
                                {improvement}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Common Money Beliefs & Reframing</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Identifying and challenging limiting beliefs about money is essential 
                    for developing a healthy financial mindset and achieving financial success.
                  </p>

                  <div className="space-y-6 mb-8">
                    {relationshipContent.educationalContent.commonMoneyBeliefs.map((belief, index) => (
                      <div key={index} className="bg-rose-50 border border-rose-200 rounded-lg p-6">
                        <h4 className="font-bold text-rose-800 mb-2">Limiting Belief: "{belief.belief}"</h4>
                        <p className="text-rose-700 text-sm mb-2"><strong>Impact:</strong> {belief.impact}</p>
                        <p className="text-rose-700 text-sm mb-3"><strong>Healthy Reframe:</strong> {belief.reframe}</p>
                        <div className="text-xs text-rose-600">
                          <h5 className="font-semibold mb-1">Action Steps:</h5>
                          <ul className="space-y-1">
                            {belief.actions.map((action, actionIndex) => (
                              <li key={actionIndex}>• {action}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Improvement Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Developing a healthier relationship with money requires intentional strategies 
                    and consistent practice across multiple dimensions of financial psychology.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {relationshipContent.educationalContent.improvementStrategies.map((strategy, index) => (
                      <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <h4 className="font-bold text-purple-800 mb-2">{strategy.strategy}</h4>
                        <p className="text-purple-700 text-sm mb-3">{strategy.description}</p>
                        <div className="text-xs text-purple-600">
                          <h5 className="font-semibold mb-1">Techniques:</h5>
                          <ul className="space-y-1">
                            {strategy.techniques.map((technique, techniqueIndex) => (
                              <li key={techniqueIndex}>• {technique}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Healthy Financial Habits</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Building sustainable, healthy relationships with money requires developing 
                    consistent habits that support both financial success and emotional well-being.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {relationshipContent.educationalContent.healthyHabits.map((habit, index) => (
                      <li key={index}>{habit}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Assessment & Tools</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our comprehensive assessment tools help you understand your current 
                    relationship with money and provide personalized improvement strategies.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {relationshipContent.toolFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Money Personalities</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Saver</span>
                    <span className="font-semibold">Security-focused</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Spender</span>
                    <span className="font-semibold">Experience-focused</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Avoider</span>
                    <span className="font-semibold">Delegation-focused</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Worrier</span>
                    <span className="font-semibold">Anxiety-focused</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Healthy Mindset</h3>
                <p className="text-sm mb-4">
                  Develop a positive, empowering relationship with money that supports your goals and values.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Transform</div>
                  <div className="text-sm opacity-90">Your money mindset</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Topics</h3>
                <div className="space-y-3">
                  <a href="/financial-journey" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Financial Journey
                  </a>
                  <a href="/goals" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Goal Setting
                  </a>
                  <a href="/spending-patterns" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Spending Patterns
                  </a>
                  <a href="/learning" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Financial Learning
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
