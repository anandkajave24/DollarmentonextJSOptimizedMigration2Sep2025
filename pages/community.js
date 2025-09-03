import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive community
export async function getStaticProps() {
  const communityContent = {
    title: "Financial Community - Money Management Support & Knowledge Sharing",
    description: "Join our financial community for money management support, investment discussions, and wealth building strategies. Connect with like-minded individuals on your financial journey to success.",
    
    educationalContent: {
      overview: "Financial communities provide valuable support, knowledge sharing, and accountability for achieving money management goals. Learning from others' experiences and sharing your own creates a collaborative environment for financial growth.",
      
      communityBenefits: [
        {
          benefit: "Peer Learning and Support",
          description: "Learn from others' financial experiences, mistakes, and successes to accelerate your own progress.",
          examples: ["Investment strategy discussions", "Debt payoff success stories", "Budget optimization tips", "Career advancement advice"]
        },
        {
          benefit: "Accountability and Motivation",
          description: "Stay committed to financial goals through community accountability and encouragement.",
          examples: ["Goal sharing and tracking", "Progress celebrations", "Challenge participation", "Mentor relationships"]
        },
        {
          benefit: "Diverse Perspectives",
          description: "Gain insights from people with different backgrounds, income levels, and financial situations.",
          examples: ["Various investment approaches", "Different budgeting methods", "Industry-specific advice", "Geographic considerations"]
        }
      ],
      
      discussionTopics: [
        "Investment strategies and portfolio optimization",
        "Debt elimination success stories and strategies",
        "Budgeting tips and expense reduction techniques",
        "Career development and income optimization",
        "Real estate investing and home ownership",
        "Retirement planning and FIRE (Financial Independence, Retire Early)",
        "Side hustles and passive income generation",
        "Tax optimization and planning strategies"
      ],
      
      participationGuidelines: [
        "Share genuine experiences and lessons learned",
        "Provide constructive feedback and support to others",
        "Respect different financial situations and goals",
        "Focus on actionable advice rather than just complaints",
        "Celebrate others' successes and milestones"
      ],
      
      communityFeatures: [
        "Discussion forums organized by financial topics",
        "Success story sharing and milestone celebrations",
        "Expert AMAs (Ask Me Anything) sessions",
        "Financial challenges and group goal setting",
        "Resource sharing and tool recommendations"
      ]
    },
    
    toolFeatures: [
      "Interactive discussion forums with topic-based organization",
      "Success story sharing platform with progress tracking",
      "Expert Q&A sessions and educational webinars",
      "Community challenges and group goal achievement tracking",
      "Mentorship matching and peer support networks"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { communityContent },
    revalidate: 3600, // Update every hour for community content
  };
}

// CSR for interactive community functionality
const Community = dynamic(() => import('@/pages/Community'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page({ communityContent }) {
  return (
    <>
      <Head>
        <title>Financial Community - Money Management Support & Knowledge Sharing | DollarMento</title>
        <meta name="description" content="Join our financial community for money management support, investment discussions, and wealth building strategies. Connect with like-minded individuals on your financial journey." />
        <meta property="og:title" content="Financial Community - Money Management Support" />
        <meta property="og:description" content="Join our community for financial support and knowledge sharing" />
        <meta name="keywords" content="financial community, money management support, investment discussions, financial forum, wealth building community" />
        <link rel="canonical" href="https://dollarmento.com/community/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{communityContent.title}</h1>
        <p>{communityContent.description}</p>
        
        <section>
          <h2>Financial Community Guide</h2>
          <p>{communityContent.educationalContent.overview}</p>
          
          <h3>Community Benefits</h3>
          {communityContent.educationalContent.communityBenefits.map((benefit, index) => (
            <div key={index}>
              <h4>{benefit.benefit}</h4>
              <p>{benefit.description}</p>
              <ul>
                {benefit.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
            </div>
          ))}
          
          <h3>Popular Discussion Topics</h3>
          <ul>
            {communityContent.educationalContent.discussionTopics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
          
          <h3>Participation Guidelines</h3>
          <ul>
            {communityContent.educationalContent.participationGuidelines.map((guideline, index) => (
              <li key={index}>{guideline}</li>
            ))}
          </ul>
          
          <h3>Community Features</h3>
          <ul>
            {communityContent.educationalContent.communityFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          
          <h3>Platform Features</h3>
          <ul>
            {communityContent.toolFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive Community Platform */}
      <Community communityContent={communityContent} />
    </>
  )
}
