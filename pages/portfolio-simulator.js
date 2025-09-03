import Head from 'next/head';
import dynamic from 'next/dynamic';

// Use SSR to ensure build safety with complex data structures
export async function getServerSideProps() {
  const portfolioContent = {
    title: "Portfolio Simulator - Investment Portfolio Analysis & Optimization Tool",
    description: "Simulate investment portfolio performance and optimize asset allocation. Test different investment strategies, analyze risk-return profiles, and build diversified portfolios with our advanced simulator.",
    
    educationalContent: {
      overview: "Portfolio simulation allows investors to test different asset allocations and investment strategies before committing real money. Understanding portfolio construction principles and risk management helps optimize long-term investment returns.",
      
      portfolioTheory: [
        {
          concept: "Diversification",
          explanation: "Spreading investments across different asset classes, sectors, and geographies to reduce risk.",
          benefit: "Reduces portfolio volatility while maintaining return potential through uncorrelated assets."
        },
        {
          concept: "Asset Allocation",
          explanation: "Strategic distribution of investments among stocks, bonds, real estate, and other asset classes.",
          benefit: "Primary driver of portfolio returns, more important than individual security selection."
        },
        {
          concept: "Rebalancing",
          explanation: "Periodically adjusting portfolio weights back to target allocation as values change.",
          benefit: "Maintains desired risk level and forces disciplined buy-low, sell-high behavior."
        }
      ],
      
      assetClasses: [
        {
          asset: "Domestic Stocks (US Equity)",
          allocation: "50-70% for growth-oriented portfolios",
          characteristics: "Higher volatility, higher long-term returns, inflation protection",
          subCategories: ["Large-cap growth", "Large-cap value", "Mid-cap", "Small-cap"]
        },
        {
          asset: "International Stocks",
          allocation: "20-40% for global diversification",
          characteristics: "Geographic diversification, currency exposure, different economic cycles",
          subCategories: ["Developed markets", "Emerging markets", "Regional funds"]
        },
        {
          asset: "Bonds (Fixed Income)",
          allocation: "20-40% for stability and income",
          characteristics: "Lower volatility, steady income, negative correlation with stocks",
          subCategories: ["Government bonds", "Corporate bonds", "International bonds"]
        },
        {
          asset: "Alternative Investments",
          allocation: "5-15% for enhanced diversification",
          characteristics: "Low correlation with traditional assets, inflation hedge potential",
          subCategories: ["REITs", "Commodities", "Private equity", "Cryptocurrency"]
        }
      ],
      
      riskManagement: [
        "Use Monte Carlo simulation to test portfolio resilience across market scenarios",
        "Consider correlation between assets to avoid concentration risk",
        "Implement stop-loss rules for individual positions exceeding risk tolerance",
        "Regular stress testing against historical market downturns",
        "Maintain emergency fund separate from investment portfolio"
      ],
      
      simulationBenefits: [
        "Test strategies without financial risk before real implementation",
        "Understand portfolio behavior in different market conditions",
        "Optimize risk-adjusted returns through systematic analysis",
        "Build confidence in investment approach through backtesting",
        "Identify potential weaknesses in portfolio construction"
      ]
    },
    
    toolFeatures: [
      "Advanced portfolio simulation with multiple asset class allocation",
      "Historical backtesting with real market data and performance metrics",
      "Monte Carlo analysis for risk assessment and scenario planning",
      "Portfolio optimization tools for efficient frontier analysis",
      "Rebalancing strategy testing with transaction cost consideration"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { portfolioContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive portfolio simulator functionality
const PortfolioSimulator = dynamic(() => import('@/pages/PortfolioSimulator'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page({ portfolioContent }) {
  return (
    <>
      <Head>
        <title>Portfolio Simulator - Investment Portfolio Analysis & Optimization Tool | DollarMento</title>
        <meta name="description" content="Simulate investment portfolio performance and optimize asset allocation. Test different investment strategies, analyze risk-return profiles, and build diversified portfolios." />
        <meta property="og:title" content="Portfolio Simulator - Investment Analysis Tool" />
        <meta property="og:description" content="Simulate and optimize investment portfolio performance" />
        <meta name="keywords" content="portfolio simulator, investment portfolio, asset allocation, portfolio optimization, investment analysis, portfolio backtesting" />
        <link rel="canonical" href="https://dollarmento.com/portfolio-simulator/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{portfolioContent.title}</h1>
        <p>{portfolioContent.description}</p>
        
        <section>
          <h2>Portfolio Simulation Guide</h2>
          <p>{portfolioContent.educationalContent.overview}</p>
          
          <h3>Portfolio Theory Concepts</h3>
          {portfolioContent.educationalContent.portfolioTheory.map((concept, index) => (
            <div key={index}>
              <h4>{concept.concept}</h4>
              <p>{concept.explanation}</p>
              <p><strong>Benefit:</strong> {concept.benefit}</p>
            </div>
          ))}
          
          <h3>Asset Classes and Allocation</h3>
          {portfolioContent.educationalContent.assetClasses.map((asset, index) => (
            <div key={index}>
              <h4>{asset.asset}</h4>
              <p><strong>Typical Allocation:</strong> {asset.allocation}</p>
              <p><strong>Characteristics:</strong> {asset.characteristics}</p>
              <p><strong>Sub-categories:</strong> {asset.subCategories.join(", ")}</p>
            </div>
          ))}
          
          <h3>Risk Management Strategies</h3>
          <ul>
            {portfolioContent.educationalContent.riskManagement.map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
          
          <h3>Simulation Benefits</h3>
          <ul>
            {portfolioContent.educationalContent.simulationBenefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          
          <h3>Tool Features</h3>
          <ul>
            {portfolioContent.toolFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive Portfolio Simulator */}
      <PortfolioSimulator portfolioContent={portfolioContent} />
    </>
  )
}
