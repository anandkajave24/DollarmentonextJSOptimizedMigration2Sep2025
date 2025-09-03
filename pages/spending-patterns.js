import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive spending analysis
export async function getStaticProps() {
  const spendingContent = {
    title: "Spending Patterns Analysis - Smart Money Tracking & Budget Insights",
    description: "Analyze your spending patterns with advanced tracking tools. Identify spending trends, optimize your budget, and make data-driven financial decisions with comprehensive expense analysis and insights.",
    
    educationalContent: {
      overview: "Understanding your spending patterns is crucial for effective money management. By analyzing where your money goes, identifying trends, and recognizing spending triggers, you can make informed decisions to optimize your budget and achieve your financial goals.",
      
      analysisTypes: [
        {
          type: "Category Analysis",
          content: "Breaking down expenses by categories to understand where most money is spent and identify optimization opportunities.",
          insights: ["Housing typically accounts for 25-30% of income", "Transportation costs average 15-20% for most households", "Food expenses range from 10-15% for efficient budgeters", "Entertainment and discretionary spending should stay under 10%"]
        },
        {
          type: "Temporal Patterns",
          content: "Analyzing spending over time to identify seasonal trends, monthly patterns, and irregular expense cycles.",
          insights: ["Holiday seasons show 20-40% spending increases", "Beginning of month shows higher fixed expenses", "Weekend spending patterns differ from weekdays", "Annual expenses need monthly savings allocation"]
        },
        {
          type: "Behavioral Triggers",
          content: "Identifying emotional and situational factors that influence spending decisions and developing awareness strategies.",
          insights: ["Stress spending often targets comfort purchases", "Social situations increase discretionary spending", "Convenience spending rises during busy periods", "Impulse purchases peak during sales events"]
        }
      ],
      
      optimizationStrategies: [
        "Track expenses for at least 3 months to identify reliable patterns",
        "Use the 50/30/20 rule as a baseline for category allocation",
        "Implement waiting periods for non-essential purchases over $100",
        "Set up automatic transfers to prevent lifestyle inflation",
        "Review and adjust spending targets monthly based on actual patterns"
      ],
      
      tools: [
        "Automated expense categorization and tracking systems",
        "Visual spending pattern dashboards and trend analysis",
        "Budget variance reporting and alert systems",
        "Predictive spending forecasting based on historical patterns",
        "Goal-based spending optimization recommendations"
      ]
    },
    
    toolFeatures: [
      "Comprehensive expense categorization and tracking system",
      "Visual spending pattern analysis with charts and trends",
      "Budget variance alerts and optimization recommendations",
      "Behavioral spending trigger identification and coaching",
      "Integration with bank accounts for automatic transaction import"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { spendingContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive spending analysis functionality
const SpendingPatterns = dynamic(() => import('@/pages/SpendingPatterns'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page({ spendingContent }) {
  return (
    <>
      <Head>
        <title>Spending Patterns Analysis - Smart Money Tracking & Budget Insights | DollarMento</title>
        <meta name="description" content="Analyze your spending patterns with advanced tracking tools. Identify spending trends, optimize your budget, and make data-driven financial decisions with comprehensive expense analysis." />
        <meta property="og:title" content="Spending Patterns Analysis - Smart Money Tracking" />
        <meta property="og:description" content="Advanced spending pattern analysis and budget optimization tools" />
        <meta name="keywords" content="spending patterns, expense tracking, budget analysis, money tracking, spending habits, financial analysis, expense categorization" />
        <link rel="canonical" href="https://dollarmento.com/spending-patterns/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{spendingContent.title}</h1>
        <p>{spendingContent.description}</p>
        
        <section>
          <h2>Spending Pattern Analysis Guide</h2>
          <p>{spendingContent.educationalContent.overview}</p>
          
          <h3>Types of Spending Analysis</h3>
          {spendingContent.educationalContent.analysisTypes.map((analysis, index) => (
            <div key={index}>
              <h4>{analysis.type}</h4>
              <p>{analysis.content}</p>
              <ul>
                {analysis.insights.map((insight, idx) => (
                  <li key={idx}>{insight}</li>
                ))}
              </ul>
            </div>
          ))}
          
          <h3>Optimization Strategies</h3>
          <ul>
            {spendingContent.educationalContent.optimizationStrategies.map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
          
          <h3>Analysis Tools and Methods</h3>
          <ul>
            {spendingContent.educationalContent.tools.map((tool, index) => (
              <li key={index}>{tool}</li>
            ))}
          </ul>
          
          <h3>Tool Features</h3>
          <ul>
            {spendingContent.toolFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive Spending Analysis */}
      <SpendingPatterns spendingContent={spendingContent} />
    </>
  )
}
