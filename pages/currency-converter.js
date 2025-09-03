import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for real-time conversion
export async function getStaticProps() {
  const currencyContent = {
    title: "Currency Converter - Real-Time Exchange Rates & International Money Transfer",
    description: "Convert currencies with live exchange rates. Calculate international money transfers, compare currency values, and track foreign exchange trends for travel and business needs.",
    
    educationalContent: {
      overview: "Currency conversion is essential for international travel, business, and investment. Understanding exchange rates, fees, and timing helps optimize international money transfers and foreign currency decisions.",
      
      exchangeRateFactors: [
        {
          factor: "Economic Indicators",
          impact: "GDP growth, inflation rates, employment data affect currency strength",
          examples: ["Strong GDP growth strengthens currency", "High inflation weakens purchasing power", "Low unemployment indicates economic stability"]
        },
        {
          factor: "Political Stability",
          impact: "Government stability and policy predictability influence investor confidence",
          examples: ["Elections create short-term volatility", "Policy changes affect long-term trends", "International relations impact currency pairs"]
        },
        {
          factor: "Interest Rates",
          impact: "Central bank rates affect currency attractiveness to investors",
          examples: ["Higher rates attract foreign investment", "Rate cuts can weaken currency", "Rate differentials drive currency flows"]
        }
      ],
      
      conversionTips: [
        "Check rates from multiple sources to ensure competitive pricing",
        "Avoid airport currency exchanges due to poor rates and high fees",
        "Use credit cards with no foreign transaction fees for purchases",
        "Time large transfers when rates are favorable to your direction",
        "Consider forward contracts for large future currency needs"
      ],
      
      transferMethods: [
        {
          method: "Bank Wire Transfers",
          cost: "High fees ($15-50) but secure and reliable",
          speed: "1-5 business days",
          bestFor: "Large amounts where security is paramount"
        },
        {
          method: "Online Money Transfer Services",
          cost: "Lower fees (0.5-2%) with competitive exchange rates",
          speed: "Minutes to hours",
          bestFor: "Regular transfers with cost efficiency"
        },
        {
          method: "Digital Payment Apps",
          cost: "Variable fees, often less competitive rates",
          speed: "Instant to minutes",
          bestFor: "Small amounts and convenience"
        }
      ],
      
      hedgingStrategies: [
        "Forward contracts lock in rates for future transactions",
        "Currency diversification for international portfolios",
        "Natural hedging through international income or expenses",
        "Currency ETFs for investment-based exposure"
      ]
    },
    
    toolFeatures: [
      "Real-time currency conversion with live market exchange rates",
      "Historical exchange rate charts and trend analysis",
      "Transfer cost calculator comparing different service providers",
      "Currency alert system for favorable rate notifications",
      "Multi-currency calculator for international budget planning"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { currencyContent },
    revalidate: 1800, // Update every 30 minutes for currency data
  };
}

// CSR for real-time currency conversion functionality
const CurrencyConverter = dynamic(() => import('@/pages/CurrencyConverter'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page({ currencyContent }) {
  return (
    <>
      <Head>
        <title>Currency Converter - Real-Time Exchange Rates & International Money Transfer | DollarMento</title>
        <meta name="description" content="Convert currencies with live exchange rates. Calculate international money transfers, compare currency values, and track foreign exchange trends for travel and business." />
        <meta property="og:title" content="Currency Converter - Real-Time Exchange Rates" />
        <meta property="og:description" content="Convert currencies with live rates and calculate transfer costs" />
        <meta name="keywords" content="currency converter, exchange rates, currency conversion, international money transfer, foreign exchange" />
        <link rel="canonical" href="https://dollarmento.com/currency-converter/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{currencyContent.title}</h1>
        <p>{currencyContent.description}</p>
        
        <section>
          <h2>Currency Conversion Guide</h2>
          <p>{currencyContent.educationalContent.overview}</p>
          
          <h3>Exchange Rate Factors</h3>
          {currencyContent.educationalContent.exchangeRateFactors.map((factor, index) => (
            <div key={index}>
              <h4>{factor.factor}</h4>
              <p>{factor.impact}</p>
              <ul>
                {factor.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
            </div>
          ))}
          
          <h3>Currency Conversion Tips</h3>
          <ul>
            {currencyContent.educationalContent.conversionTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          
          <h3>Money Transfer Methods</h3>
          {currencyContent.educationalContent.transferMethods.map((method, index) => (
            <div key={index}>
              <h4>{method.method}</h4>
              <p><strong>Cost:</strong> {method.cost}</p>
              <p><strong>Speed:</strong> {method.speed}</p>
              <p><strong>Best For:</strong> {method.bestFor}</p>
            </div>
          ))}
          
          <h3>Currency Hedging Strategies</h3>
          <ul>
            {currencyContent.educationalContent.hedgingStrategies.map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
          
          <h3>Converter Features</h3>
          <ul>
            {currencyContent.toolFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive Currency Converter */}
      <CurrencyConverter currencyContent={currencyContent} />
    </>
  )
}
