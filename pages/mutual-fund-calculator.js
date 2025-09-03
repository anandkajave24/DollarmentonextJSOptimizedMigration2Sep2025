import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive calculator
export async function getStaticProps() {
  const mutualFundContent = {
    title: "Mutual Fund Calculator - Investment Growth & SIP Planning Tool",
    description: "Calculate mutual fund returns and plan SIP investments with our comprehensive calculator. Analyze fund performance, compare investment scenarios, and optimize your mutual fund portfolio strategy.",
    
    educationalContent: {
      overview: "Mutual funds offer diversified investment opportunities for wealth building through professional management and broad market exposure. Understanding fund types, costs, and return calculations helps optimize your investment strategy.",
      
      fundTypes: [
        {
          type: "Equity Funds",
          content: "Invest primarily in stocks for long-term growth potential with higher volatility.",
          returns: "Historical average: 10-12% annually over 15+ years",
          riskLevel: "High risk, high reward - suitable for long-term goals"
        },
        {
          type: "Debt Funds",
          content: "Invest in bonds and fixed-income securities for stable income with lower risk.",
          returns: "Typical range: 6-8% annually with lower volatility",
          riskLevel: "Low to moderate risk - suitable for conservative investors"
        },
        {
          type: "Hybrid Funds",
          content: "Balanced allocation between equity and debt for moderate risk-return profile.",
          returns: "Expected range: 8-10% annually with balanced approach",
          riskLevel: "Moderate risk - suitable for balanced portfolios"
        }
      ],
      
      sipAdvantages: [
        "Rupee cost averaging reduces market timing risk",
        "Power of compounding through regular investments",
        "Disciplined investing builds long-term wealth",
        "Lower minimum investment amounts for accessibility",
        "Automatic investing reduces emotional decision-making"
      ],
      
      costConsiderations: [
        "Expense Ratio: Annual fee ranging from 0.5% to 2.5%",
        "Exit Load: Penalty for early redemption, typically 1%",
        "Transaction Costs: Brokerage and processing fees",
        "Tax Implications: Short-term vs long-term capital gains"
      ],
      
      selectionCriteria: [
        "Consistent performance across market cycles",
        "Low expense ratios to maximize net returns",
        "Fund manager track record and experience",
        "Portfolio diversification and risk management",
        "Fund size and liquidity for easy transactions"
      ]
    },
    
    toolFeatures: [
      "Comprehensive mutual fund return calculator with SIP and lump sum options",
      "Fund comparison tool for multiple investment scenarios",
      "Goal-based investment planning with target amount calculator",
      "Expense ratio impact analysis on long-term returns",
      "Tax-adjusted return calculator for accurate planning"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { mutualFundContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive mutual fund calculator functionality
const Mutual_fundCalculator = dynamic(() => import('@/pages/MutualFundCalculator'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page({ mutualFundContent }) {
  return (
    <>
      <Head>
        <title>Mutual Fund Calculator - Investment Growth & SIP Planning Tool | DollarMento</title>
        <meta name="description" content="Calculate mutual fund returns and plan SIP investments with our comprehensive calculator. Analyze fund performance, compare investment scenarios, and optimize your portfolio strategy." />
        <meta property="og:title" content="Mutual Fund Calculator - Investment Planning Tool" />
        <meta property="og:description" content="Calculate mutual fund returns and plan SIP investments" />
        <meta name="keywords" content="mutual fund calculator, sip calculator, mutual fund returns, investment calculator, sip planning, mutual fund sip" />
        <link rel="canonical" href="https://dollarmento.com/mutual-fund-calculator/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{mutualFundContent.title}</h1>
        <p>{mutualFundContent.description}</p>
        
        <section>
          <h2>Mutual Fund Investment Guide</h2>
          <p>{mutualFundContent.educationalContent.overview}</p>
          
          <h3>Types of Mutual Funds</h3>
          {mutualFundContent.educationalContent.fundTypes.map((fund, index) => (
            <div key={index}>
              <h4>{fund.type}</h4>
              <p>{fund.content}</p>
              <p><strong>Expected Returns:</strong> {fund.returns}</p>
              <p><strong>Risk Level:</strong> {fund.riskLevel}</p>
            </div>
          ))}
          
          <h3>SIP Investment Advantages</h3>
          <ul>
            {mutualFundContent.educationalContent.sipAdvantages.map((advantage, index) => (
              <li key={index}>{advantage}</li>
            ))}
          </ul>
          
          <h3>Cost Considerations</h3>
          <ul>
            {mutualFundContent.educationalContent.costConsiderations.map((cost, index) => (
              <li key={index}>{cost}</li>
            ))}
          </ul>
          
          <h3>Fund Selection Criteria</h3>
          <ul>
            {mutualFundContent.educationalContent.selectionCriteria.map((criteria, index) => (
              <li key={index}>{criteria}</li>
            ))}
          </ul>
          
          <h3>Calculator Features</h3>
          <ul>
            {mutualFundContent.toolFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive Mutual Fund Calculator */}
      <Mutual_fundCalculator mutualFundContent={mutualFundContent} />
    </>
  )
}
