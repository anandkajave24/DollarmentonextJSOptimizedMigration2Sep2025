import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive tools
export async function getStaticProps() {
  const goalContent = {
    title: "Financial Goal Setting & Planning Tool - Smart Money Management",
    description: "Set and track your financial goals with our comprehensive goal planning tool. Create SMART financial objectives, monitor progress, and achieve financial milestones with strategic planning and actionable insights.",
    
    educationalContent: {
      overview: "Effective financial goal setting is the foundation of successful money management. By creating specific, measurable, achievable, relevant, and time-bound (SMART) financial goals, you can create a roadmap to financial success and track your progress systematically.",
      
      goalTypes: [
        {
          type: "Short-term Goals (1-2 years)",
          content: "Emergency fund building, vacation savings, debt payoff, home down payment savings. These goals provide immediate financial security and motivation.",
          examples: ["Build $1,000 emergency fund", "Save $5,000 for vacation", "Pay off $3,000 credit card debt", "Save $2,000 for car repairs"]
        },
        {
          type: "Medium-term Goals (2-5 years)", 
          content: "Home purchase, major purchase savings, education funding, business startup capital. These goals require sustained effort and strategic planning.",
          examples: ["Save $50,000 for home down payment", "Fund child's college education", "Start business with $25,000", "Buy a car with cash"]
        },
        {
          type: "Long-term Goals (5+ years)",
          content: "Retirement planning, financial independence, estate planning, generational wealth building. These goals require compound growth and long-term commitment.",
          examples: ["Retire with $1 million", "Achieve financial independence by 50", "Leave $500,000 inheritance", "Build passive income streams"]
        }
      ],
      
      strategies: [
        "Use the SMART framework: Specific, Measurable, Achievable, Relevant, Time-bound",
        "Break large goals into smaller, manageable milestones for better tracking",
        "Automate savings and investments to ensure consistent progress",
        "Review and adjust goals quarterly based on life changes and progress",
        "Celebrate milestones to maintain motivation and momentum"
      ],
      
      trackingMethods: [
        "Monthly budget reviews to ensure goal alignment",
        "Automated savings transfers to dedicated goal accounts",
        "Visual progress tracking with charts and percentage completion",
        "Regular goal assessment and strategy adjustment sessions",
        "Integration with overall financial planning and investment strategy"
      ]
    },
    
    toolFeatures: [
      "SMART goal creation with specific targets and timelines",
      "Progress tracking with visual charts and milestone markers",
      "Goal prioritization and resource allocation recommendations",
      "Integration with budget and savings planning tools",
      "Achievement rewards and motivation system"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { goalContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive goal management functionality
const Goal_settings = dynamic(() => import('@/pages/GoalSettings'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page({ goalContent }) {
  return (
    <>
      <Head>
        <title>Financial Goal Setting & Planning Tool - Smart Money Management | DollarMento</title>
        <meta name="description" content="Set and track your financial goals with our comprehensive goal planning tool. Create SMART financial objectives, monitor progress, and achieve financial milestones with strategic planning." />
        <meta property="og:title" content="Financial Goal Setting & Planning Tool - DollarMento" />
        <meta property="og:description" content="Set and track your financial goals with comprehensive planning tools" />
        <meta name="keywords" content="financial goals, goal setting, financial planning, money goals, SMART goals, financial milestones, savings goals, retirement goals" />
        <link rel="canonical" href="https://dollarmento.com/goal-settings/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{goalContent.title}</h1>
        <p>{goalContent.description}</p>
        
        <section>
          <h2>Financial Goal Setting Guide</h2>
          <p>{goalContent.educationalContent.overview}</p>
          
          <h3>Types of Financial Goals</h3>
          {goalContent.educationalContent.goalTypes.map((goal, index) => (
            <div key={index}>
              <h4>{goal.type}</h4>
              <p>{goal.content}</p>
              <ul>
                {goal.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
            </div>
          ))}
          
          <h3>Goal Setting Strategies</h3>
          <ul>
            {goalContent.educationalContent.strategies.map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
          
          <h3>Progress Tracking Methods</h3>
          <ul>
            {goalContent.educationalContent.trackingMethods.map((method, index) => (
              <li key={index}>{method}</li>
            ))}
          </ul>
          
          <h3>Tool Features</h3>
          <ul>
            {goalContent.toolFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive Tool */}
      <Goal_settings goalContent={goalContent} />
    </>
  )
}
