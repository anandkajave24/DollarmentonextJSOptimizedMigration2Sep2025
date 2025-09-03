import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive community features
export async function getStaticProps() {
  const communityContent = {
    title: "Financial Community Platform - Connect, Learn & Share Money Wisdom",
    description: "Join our vibrant financial community to share experiences, learn from peers, get expert advice, and build financial literacy together. Connect with like-minded individuals on your journey to financial freedom.",
    
    educationalContent: {
      overview: "Financial communities provide invaluable support, knowledge sharing, and accountability for achieving financial goals. By connecting with others on similar journeys, you gain diverse perspectives, practical advice, and motivation to stay committed to your financial plans.",
      
      communityBenefits: [
        {
          benefit: "Peer Learning and Knowledge Sharing",
          description: "Learn from real experiences and diverse financial strategies shared by community members",
          examples: ["Success stories and lessons learned", "Real-world application of financial concepts", "Diverse income and situation perspectives", "Cultural and regional financial insights"],
          impact: "Accelerated learning through collective wisdom and avoided common financial mistakes"
        },
        {
          benefit: "Accountability and Motivation",
          description: "Stay committed to financial goals through community support and progress sharing",
          examples: ["Goal tracking with peer support", "Progress celebration and encouragement", "Challenge participation and friendly competition", "Milestone recognition and achievements"],
          impact: "Higher goal completion rates and sustained motivation through social support"
        },
        {
          benefit: "Expert Access and Guidance",
          description: "Connect with financial professionals and experienced community members for advice",
          examples: ["Expert Q&A sessions and webinars", "Professional guidance on complex topics", "Mentorship opportunities", "Specialized advice for unique situations"],
          impact: "Professional-level insights without the cost of individual consulting"
        },
        {
          benefit: "Emotional Support and Stress Relief",
          description: "Reduce financial stress through shared experiences and emotional support",
          examples: ["Safe space for financial concerns", "Debt payoff support groups", "Career transition guidance", "Economic uncertainty discussions"],
          impact: "Reduced financial anxiety and improved mental health around money"
        }
      ],
      
      engagementTypes: [
        {
          type: "Discussion Forums",
          purpose: "Topic-based conversations and ongoing dialogue",
          features: ["Categorized financial topics", "Question and answer threads", "Resource sharing and recommendations", "Weekly discussion topics"],
          participation: ["Ask questions and share experiences", "Provide helpful answers and advice", "Share relevant resources and tools", "Engage respectfully and constructively"]
        },
        {
          type: "Success Story Sharing",
          purpose: "Celebrate achievements and inspire others",
          features: ["Milestone celebration posts", "Journey documentation and progress", "Strategy effectiveness sharing", "Before and after comparisons"],
          participation: ["Share your financial wins", "Document your journey progress", "Provide encouragement to others", "Learn from diverse success paths"]
        },
        {
          type: "Challenge Participation",
          purpose: "Group activities and friendly competition",
          features: ["Monthly savings challenges", "Debt payoff competitions", "Learning goals and achievements", "Habit building challenges"],
          participation: ["Join relevant challenges", "Track and share progress", "Support fellow participants", "Celebrate group achievements"]
        },
        {
          type: "Mentorship and Guidance",
          purpose: "One-on-one and group mentorship opportunities",
          features: ["Experienced member mentoring", "Professional guidance programs", "Peer accountability partnerships", "Study groups and learning circles"],
          participation: ["Seek mentorship when needed", "Offer guidance when experienced", "Participate in learning groups", "Build meaningful connections"]
        }
      ],
      
      bestPractices: [
        "Be respectful and supportive of all community members regardless of financial situation",
        "Share experiences honestly while maintaining appropriate privacy boundaries",
        "Provide constructive advice based on personal experience rather than assumptions",
        "Ask questions freely - no question is too basic or complex for the community",
        "Celebrate others' successes and provide encouragement during challenges",
        "Follow community guidelines and maintain professional, helpful communication",
        "Verify information and seek professional advice for complex financial decisions",
        "Contribute regularly through questions, answers, or supportive comments"
      ],
      
      safetyGuidelines: [
        "Never share sensitive personal information like account numbers or Social Security numbers",
        "Be cautious about sharing specific income amounts or net worth details",
        "Verify professional credentials before following specific investment advice",
        "Report any suspicious activity or inappropriate behavior to moderators",
        "Understand that community advice is not professional financial planning",
        "Use community insights to inform but not replace professional consultation",
        "Maintain healthy skepticism and verify information from multiple sources",
        "Protect your privacy while still engaging meaningfully with the community"
      ]
    },
    
    toolFeatures: [
      "Discussion forums organized by financial topics and experience levels",
      "Success story sharing platform with progress tracking integration",
      "Challenge participation system with group goals and competitions",
      "Mentorship matching based on experience and goals",
      "Expert Q&A sessions and educational webinars",
      "Resource sharing library with community recommendations",
      "Progress celebration and achievement recognition system",
      "Private messaging for deeper connections and accountability partnerships"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { communityContent },
    revalidate: 14400, // Update every 4 hours
  };
}

// CSR for interactive community functionality
const CommunityFeatures = dynamic(() => import('@/pages/CommunityFeatures'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading community features...</p>
      </div>
    </div>
  )
});

export default function Page({ communityContent }) {
  return (
    <>
      <Head>
        <title>Financial Community Platform - Connect, Learn & Share Money Wisdom | DollarMento</title>
        <meta name="description" content="Join our vibrant financial community to share experiences, learn from peers, get expert advice, and build financial literacy together. Connect with like-minded individuals on your journey to financial freedom." />
        <meta property="og:title" content="Financial Community Platform - Connect & Learn" />
        <meta property="og:description" content="Join our financial community for peer learning, expert guidance, and mutual support" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/community-features" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Financial Community Platform" />
        <meta name="twitter:description" content="Connect with financial peers, share experiences, and learn together" />
        <meta name="keywords" content="financial community, money support group, financial forum, peer learning, financial advice, money mentorship, financial accountability" />
        <link rel="canonical" href="https://dollarmento.com/community-features" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Financial Community Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with like-minded individuals, share experiences, learn from peers, 
              and build financial literacy together on your journey to financial freedom.
            </p>
          </div>

          {/* Interactive Community Features */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <CommunityFeatures communityContent={communityContent} />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Community Guide</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {communityContent.educationalContent.overview}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Community Benefits</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our financial community provides multiple layers of support and learning 
                    opportunities that accelerate your financial growth and success.
                  </p>

                  <div className="space-y-6">
                    {communityContent.educationalContent.communityBenefits.map((benefit, index) => (
                      <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-blue-800 mb-3">{benefit.benefit}</h4>
                        <p className="text-blue-700 mb-4">{benefit.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-blue-800 mb-2">Examples:</h5>
                            <ul className="text-blue-700 space-y-1">
                              {benefit.examples.map((example, idx) => (
                                <li key={idx}>• {example}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-blue-800 mb-2">Impact:</h5>
                            <p className="text-blue-700">{benefit.impact}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Engagement Types</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Multiple ways to engage ensure everyone can participate in ways that 
                    match their communication style and learning preferences.
                  </p>

                  <div className="space-y-6 mb-8">
                    {communityContent.educationalContent.engagementTypes.map((engagement, index) => (
                      <div key={index} className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                        <h4 className="font-bold text-indigo-800 mb-2">{engagement.type}</h4>
                        <p className="text-indigo-700 text-sm mb-3">{engagement.purpose}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-indigo-800 mb-1">Features:</h5>
                            <ul className="text-indigo-700 space-y-1">
                              {engagement.features.map((feature, featureIndex) => (
                                <li key={featureIndex}>• {feature}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-indigo-800 mb-1">How to Participate:</h5>
                            <ul className="text-indigo-700 space-y-1">
                              {engagement.participation.map((method, methodIndex) => (
                                <li key={methodIndex}>• {method}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Community Best Practices</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Following these guidelines ensures a positive, supportive environment 
                    where everyone can learn and grow together safely.
                  </p>

                  <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                    {communityContent.educationalContent.bestPractices.map((practice, index) => (
                      <li key={index}>{practice}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Safety Guidelines</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Protecting your privacy and financial security while engaging 
                    meaningfully with the community is essential for a safe experience.
                  </p>

                  <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                    {communityContent.educationalContent.safetyGuidelines.map((guideline, index) => (
                      <li key={index}>{guideline}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Platform Features</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our comprehensive platform provides all the tools you need 
                    for meaningful community engagement and learning.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {communityContent.toolFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Community Stats</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Active Members</span>
                    <span className="font-semibold">15,000+</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Success Stories</span>
                    <span className="font-semibold">2,500+</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Expert Contributors</span>
                    <span className="font-semibold">150+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Challenges</span>
                    <span className="font-semibold">12</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Join Today</h3>
                <p className="text-sm mb-4">
                  Connect with thousands of people on their journey to financial freedom.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Free</div>
                  <div className="text-sm opacity-90">Community access</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Topics</h3>
                <div className="space-y-3">
                  <a href="/debt-payoff" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Debt Elimination
                  </a>
                  <a href="/budget-buddy" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Budget Management
                  </a>
                  <a href="/investment-portfolio" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Strategies
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
