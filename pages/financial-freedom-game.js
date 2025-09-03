import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive game
export async function getStaticProps() {
  const gameContent = {
    title: "Financial Freedom Game - Interactive Money Management & Investment Simulation",
    description: "Learn financial planning through engaging gameplay. Build wealth, make investment decisions, and achieve financial independence in our comprehensive financial education game with real-world scenarios.",
    
    educationalContent: {
      overview: "The Financial Freedom Game teaches crucial money management skills through interactive scenarios and decision-making challenges. Players learn by experiencing the consequences of financial choices in a risk-free environment.",
      
      gameObjectives: [
        {
          objective: "Emergency Fund Building",
          challenge: "Save 6 months of expenses while managing daily financial decisions",
          learningOutcome: "Understanding the importance of financial safety nets and spending prioritization"
        },
        {
          objective: "Debt Elimination",
          challenge: "Pay off credit cards and loans using different strategies (avalanche vs snowball)",
          learningOutcome: "Compare debt payoff methods and understand interest impact on total cost"
        },
        {
          objective: "Investment Growth",
          challenge: "Build investment portfolio and navigate market volatility over time",
          learningOutcome: "Experience compound growth and learn risk tolerance through market cycles"
        },
        {
          objective: "Financial Independence",
          challenge: "Achieve 25x annual expenses in investments for optional work",
          learningOutcome: "Understand FIRE principles and the relationship between expenses and freedom"
        }
      ],
      
      gameScenarios: [
        "Career changes and income fluctuations affecting financial planning",
        "Market crashes testing investment strategy and emotional decision-making",
        "Life events (marriage, children, home purchase) requiring financial adjustments",
        "Unexpected expenses challenging emergency fund and budget flexibility",
        "Retirement planning and withdrawal strategy optimization"
      ],
      
      skillsDeveloped: [
        {
          skill: "Budgeting and Cash Flow Management",
          description: "Learn to balance income and expenses while achieving financial goals",
          practiceAreas: ["Monthly budget creation", "Expense tracking", "Cash flow optimization"]
        },
        {
          skill: "Investment Decision Making",
          description: "Understand risk-return tradeoffs and portfolio diversification strategies",
          practiceAreas: ["Asset allocation", "Market timing decisions", "Rebalancing strategies"]
        },
        {
          skill: "Risk Assessment and Management",
          description: "Evaluate financial risks and implement appropriate protection strategies",
          practiceAreas: ["Insurance needs analysis", "Emergency planning", "Market risk tolerance"]
        }
      ],
      
      learningBenefits: [
        "Safe environment to test financial strategies without real-money consequences",
        "Immediate feedback on financial decisions and their long-term impact",
        "Gamification makes financial education engaging and memorable",
        "Builds confidence for real-world financial decision making",
        "Demonstrates time value of money and compound interest effects"
      ]
    },
    
    toolFeatures: [
      "Interactive financial simulation with real-world scenarios and challenges",
      "Multiple difficulty levels from beginner to advanced financial planning",
      "Progress tracking with achievement badges and milestone rewards",
      "Detailed feedback and educational explanations for all decisions",
      "Leaderboards and social features for competitive financial learning"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { gameContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive financial freedom game functionality
const FinancialFreedomGame = dynamic(() => import('@/pages/FinancialFreedomGame'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page({ gameContent }) {
  return (
    <>
      <Head>
        <title>Financial Freedom Game - Interactive Money Management & Investment Simulation | DollarMento</title>
        <meta name="description" content="Learn financial planning through engaging gameplay. Build wealth, make investment decisions, and achieve financial independence in our comprehensive financial education game." />
        <meta property="og:title" content="Financial Freedom Game - Interactive Financial Education" />
        <meta property="og:description" content="Learn money management through interactive financial simulation game" />
        <meta name="keywords" content="financial freedom game, financial education game, money management game, investment simulation, financial planning game" />
        <link rel="canonical" href="https://dollarmento.com/financial-freedom-game/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{gameContent.title}</h1>
        <p>{gameContent.description}</p>
        
        <section>
          <h2>Financial Freedom Game Guide</h2>
          <p>{gameContent.educationalContent.overview}</p>
          
          <h3>Game Objectives</h3>
          {gameContent.educationalContent.gameObjectives.map((objective, index) => (
            <div key={index}>
              <h4>{objective.objective}</h4>
              <p><strong>Challenge:</strong> {objective.challenge}</p>
              <p><strong>Learning Outcome:</strong> {objective.learningOutcome}</p>
            </div>
          ))}
          
          <h3>Game Scenarios</h3>
          <ul>
            {gameContent.educationalContent.gameScenarios.map((scenario, index) => (
              <li key={index}>{scenario}</li>
            ))}
          </ul>
          
          <h3>Skills Developed</h3>
          {gameContent.educationalContent.skillsDeveloped.map((skill, index) => (
            <div key={index}>
              <h4>{skill.skill}</h4>
              <p>{skill.description}</p>
              <p><strong>Practice Areas:</strong> {skill.practiceAreas.join(", ")}</p>
            </div>
          ))}
          
          <h3>Learning Benefits</h3>
          <ul>
            {gameContent.educationalContent.learningBenefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          
          <h3>Game Features</h3>
          <ul>
            {gameContent.toolFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive Financial Freedom Game */}
      <FinancialFreedomGame gameContent={gameContent} />
    </>
  )
}
