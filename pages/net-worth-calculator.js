import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive calculator
export async function getStaticProps() {
  const netWorthContent = {
    title: "Net Worth Calculator - Track Your Financial Progress & Wealth Building",
    description: "Calculate your net worth and track wealth building progress. Analyze assets, liabilities, and financial growth over time with our comprehensive net worth calculator and planning tools.",
    
    educationalContent: {
      overview: "Net worth is the ultimate measure of financial health, representing the difference between what you own (assets) and what you owe (liabilities). Tracking net worth over time provides clarity on wealth building progress and financial decision effectiveness.",
      
      assetCategories: [
        {
          category: "Liquid Assets",
          examples: ["Cash and savings accounts", "Checking accounts", "Money market funds", "Short-term CDs"],
          characteristics: "Easily accessible funds for emergencies and opportunities"
        },
        {
          category: "Investment Assets",
          examples: ["401(k) and retirement accounts", "Stocks and bonds", "Mutual funds and ETFs", "Real estate investments"],
          characteristics: "Growth-oriented assets for long-term wealth building"
        },
        {
          category: "Personal Assets",
          examples: ["Primary residence", "Vehicles", "Jewelry and collectibles", "Personal property"],
          characteristics: "Assets used personally that may appreciate or depreciate"
        },
        {
          category: "Business Assets",
          examples: ["Business ownership stakes", "Equipment and inventory", "Intellectual property", "Professional practices"],
          characteristics: "Income-generating assets requiring active management"
        }
      ],
      
      liabilityTypes: [
        {
          type: "Secured Debt",
          examples: ["Mortgage loans", "Auto loans", "Home equity loans"],
          impact: "Backed by collateral, typically lower interest rates"
        },
        {
          type: "Unsecured Debt",
          examples: ["Credit cards", "Personal loans", "Student loans"],
          impact: "Higher interest rates, no collateral protection"
        }
      ],
      
      growthStrategies: [
        "Increase assets through consistent saving and investing",
        "Reduce high-interest debt to decrease liabilities",
        "Improve asset allocation for better long-term returns",
        "Track progress monthly to maintain motivation and direction",
        "Focus on controllable factors rather than market fluctuations"
      ],
      
      benchmarks: {
        by20s: "Focus on building emergency fund and eliminating high-interest debt",
        by30s: "Net worth should equal annual income, build retirement savings",
        by40s: "Target 3x annual income in net worth, maximize earning years",
        by50s: "Aim for 5-10x annual income to prepare for retirement",
        retirement: "Generally need 10-25x annual expenses for financial independence"
      }
    },
    
    toolFeatures: [
      "Comprehensive asset and liability tracking system",
      "Net worth trend analysis with growth visualization",
      "Age-based net worth benchmarking and goal setting",
      "Asset allocation analysis and optimization recommendations",
      "Debt-to-asset ratio monitoring and improvement tracking"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { netWorthContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive net worth calculator functionality
const Net_worthCalculator = dynamic(() => import('@/pages/NetWorthCalculator'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page({ netWorthContent }) {
  return (
    <>
      <Head>
        <title>Net Worth Calculator - Track Your Financial Progress & Wealth Building | DollarMento</title>
        <meta name="description" content="Calculate your net worth and track wealth building progress. Analyze assets, liabilities, and financial growth over time with our comprehensive net worth calculator." />
        <meta property="og:title" content="Net Worth Calculator - Financial Progress Tracker" />
        <meta property="og:description" content="Calculate net worth and track wealth building progress" />
        <meta name="keywords" content="net worth calculator, wealth tracker, financial progress, assets and liabilities, wealth building, financial health" />
        <link rel="canonical" href="https://dollarmento.com/net-worth-calculator/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{netWorthContent.title}</h1>
        <p>{netWorthContent.description}</p>
        
        <section>
          <h2>Net Worth Tracking Guide</h2>
          <p>{netWorthContent.educationalContent.overview}</p>
          
          <h3>Asset Categories</h3>
          {netWorthContent.educationalContent.assetCategories.map((category, index) => (
            <div key={index}>
              <h4>{category.category}</h4>
              <ul>
                {category.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
              <p><strong>Characteristics:</strong> {category.characteristics}</p>
            </div>
          ))}
          
          <h3>Liability Types</h3>
          {netWorthContent.educationalContent.liabilityTypes.map((liability, index) => (
            <div key={index}>
              <h4>{liability.type}</h4>
              <ul>
                {liability.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
              <p><strong>Impact:</strong> {liability.impact}</p>
            </div>
          ))}
          
          <h3>Net Worth Growth Strategies</h3>
          <ul>
            {netWorthContent.educationalContent.growthStrategies.map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
          
          <h3>Age-Based Benchmarks</h3>
          <p><strong>20s:</strong> {netWorthContent.educationalContent.benchmarks.by20s}</p>
          <p><strong>30s:</strong> {netWorthContent.educationalContent.benchmarks.by30s}</p>
          <p><strong>40s:</strong> {netWorthContent.educationalContent.benchmarks.by40s}</p>
          <p><strong>50s:</strong> {netWorthContent.educationalContent.benchmarks.by50s}</p>
          <p><strong>Retirement:</strong> {netWorthContent.educationalContent.benchmarks.retirement}</p>
          
          <h3>Calculator Features</h3>
          <ul>
            {netWorthContent.toolFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive Net Worth Calculator */}
      <Net_worthCalculator netWorthContent={netWorthContent} />
    </>
  )
}
