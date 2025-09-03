import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive growth tracking
export async function getStaticProps() {
  const growthContent = {
    title: "Financial Growth Levels - Track Your Money Management Progress",
    description: "Assess and track your financial growth through structured levels and milestones. Build financial literacy, improve money management skills, and progress toward financial independence with our comprehensive growth framework.",
    
    educationalContent: {
      overview: "Financial growth is a journey with distinct levels and milestones. By understanding where you are in your financial development and what steps to take next, you can create a clear path toward financial independence and wealth building.",
      
      growthLevels: [
        {
          level: "Level 1: Financial Stability",
          content: "Building the foundation of financial security through basic money management and emergency preparedness.",
          milestones: ["$1,000 emergency fund established", "All bills paid on time consistently", "Basic budget tracking in place", "No new debt accumulation"],
          skills: ["Emergency fund building", "Budget creation and tracking", "Bill payment automation", "Debt awareness and control"]
        },
        {
          level: "Level 2: Debt Freedom",
          content: "Systematic elimination of high-interest debt while maintaining emergency funds and building stronger financial habits.",
          milestones: ["High-interest debt eliminated", "Credit score above 700", "3-month emergency fund", "Automated savings established"],
          skills: ["Debt payoff strategies", "Credit score optimization", "Advanced budgeting", "Automated financial systems"]
        },
        {
          level: "Level 3: Wealth Building", 
          content: "Active investment and asset accumulation for long-term wealth growth and financial goal achievement.",
          milestones: ["6-month emergency fund", "Retirement savings on track", "Investment portfolio started", "Regular investment contributions"],
          skills: ["Investment basics", "Asset allocation", "Retirement planning", "Tax-advantaged account optimization"]
        },
        {
          level: "Level 4: Financial Independence",
          content: "Advanced wealth building and passive income generation for optional work and lifestyle flexibility.",
          milestones: ["25x annual expenses invested", "Multiple income streams", "Passive income covers expenses", "Estate planning complete"],
          skills: ["Advanced investing", "Income diversification", "Tax optimization", "Estate planning"]
        }
      ],
      
      progressStrategies: [
        "Focus on completing current level before advancing to avoid financial stress",
        "Build habits and systems that support long-term consistency",
        "Celebrate milestones to maintain motivation and momentum",
        "Regularly assess and adjust strategies based on life changes",
        "Seek education and guidance appropriate to your current level"
      ],
      
      accelerationTips: [
        "Increase income through skill development and career advancement",
        "Optimize expenses without sacrificing quality of life",
        "Automate financial systems to reduce decision fatigue",
        "Learn and apply appropriate investment strategies for your level",
        "Network with others at similar or advanced financial levels"
      ]
    },
    
    toolFeatures: [
      "Comprehensive financial level assessment and tracking system",
      "Milestone progress monitoring with visual indicators",
      "Personalized growth recommendations based on current level",
      "Educational resources tailored to your financial development stage",
      "Achievement celebration and motivation system"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { growthContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive financial growth tracking functionality
const FinancialGrowthLevels = dynamic(() => import('@/pages/FinancialGrowthLevels'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page({ growthContent }) {
  return (
    <>
      <Head>
        <title>Financial Growth Levels - Track Your Money Management Progress | DollarMento</title>
        <meta name="description" content="Assess and track your financial growth through structured levels and milestones. Build financial literacy, improve money management skills, and progress toward financial independence." />
        <meta property="og:title" content="Financial Growth Levels - Track Your Progress" />
        <meta property="og:description" content="Comprehensive financial growth tracking with structured levels and milestones" />
        <meta name="keywords" content="financial growth, financial levels, money management progress, financial milestones, financial development, wealth building stages" />
        <link rel="canonical" href="https://dollarmento.com/financial-growth-levels/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{growthContent.title}</h1>
        <p>{growthContent.description}</p>
        
        <section>
          <h2>Financial Growth Level Guide</h2>
          <p>{growthContent.educationalContent.overview}</p>
          
          <h3>Financial Development Levels</h3>
          {growthContent.educationalContent.growthLevels.map((level, index) => (
            <div key={index}>
              <h4>{level.level}</h4>
              <p>{level.content}</p>
              <h5>Milestones:</h5>
              <ul>
                {level.milestones.map((milestone, idx) => (
                  <li key={idx}>{milestone}</li>
                ))}
              </ul>
              <h5>Skills Developed:</h5>
              <ul>
                {level.skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
          
          <h3>Progress Strategies</h3>
          <ul>
            {growthContent.educationalContent.progressStrategies.map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
          
          <h3>Acceleration Tips</h3>
          <ul>
            {growthContent.educationalContent.accelerationTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          
          <h3>Tool Features</h3>
          <ul>
            {growthContent.toolFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive Growth Tracking */}
      <FinancialGrowthLevels growthContent={growthContent} />
    </>
  )
}
