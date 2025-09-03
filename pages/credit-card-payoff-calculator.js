import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive calculator
export async function getStaticProps() {
  const payoffContent = {
    title: "Credit Card Payoff Calculator - Debt Elimination Planning Tool",
    description: "Calculate credit card payoff strategies and eliminate debt faster. Compare payment methods, analyze interest savings, and create a debt-free plan with our comprehensive payoff calculator.",
    
    educationalContent: {
      overview: "Credit card debt can quickly become overwhelming due to high interest rates and minimum payment structures. Strategic payoff planning can save thousands in interest and accelerate your path to financial freedom.",
      
      payoffStrategies: [
        {
          strategy: "Debt Avalanche Method",
          approach: "Pay minimums on all cards, put extra money toward highest interest rate card first.",
          benefits: "Mathematically optimal - saves the most money in interest charges",
          bestFor: "Disciplined payers focused on minimizing total cost"
        },
        {
          strategy: "Debt Snowball Method",
          approach: "Pay minimums on all cards, put extra money toward smallest balance first.",
          benefits: "Psychological wins through quick victories and momentum building",
          bestFor: "Those needing motivation and quick progress validation"
        },
        {
          strategy: "Balance Transfer",
          approach: "Transfer high-interest debt to a 0% APR promotional card.",
          benefits: "Temporary interest relief allows more principal reduction",
          bestFor: "Good credit scores qualifying for promotional rates"
        }
      ],
      
      costOfDebt: {
        averageAPR: "Credit card interest rates typically range from 18-29% annually",
        minimumPayment: "Usually 2-3% of balance, mostly covers interest with little principal reduction",
        compoundingEffect: "High interest compounds daily, making debt grow rapidly without aggressive payments"
      },
      
      accelerationTips: [
        "Pay more than minimum - even $50 extra monthly makes significant impact",
        "Make bi-weekly payments to reduce interest accumulation",
        "Use windfalls (tax refunds, bonuses) for debt elimination",
        "Negotiate lower rates with card companies based on payment history",
        "Stop using cards while paying off to prevent balance increases"
      ],
      
      preventionStrategies: [
        "Build emergency fund to avoid future debt accumulation",
        "Use cash or debit cards for discretionary spending",
        "Set up automatic payments to avoid late fees and rate increases",
        "Track spending to identify and eliminate unnecessary expenses",
        "Consider credit counseling for multiple high-balance cards"
      ]
    },
    
    toolFeatures: [
      "Multiple payoff strategy comparison with total cost analysis",
      "Payment timeline calculator with interest savings projections",
      "Multiple credit card debt consolidation planning",
      "Extra payment impact analysis and optimization",
      "Balance transfer cost-benefit analysis with promotional rates"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { payoffContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive credit card payoff calculator functionality
const CreditCardPayoffCalculator = dynamic(() => import('@/pages/CreditCardPayoffCalculator'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page({ payoffContent }) {
  return (
    <>
      <Head>
        <title>Credit Card Payoff Calculator - Debt Elimination Planning Tool | DollarMento</title>
        <meta name="description" content="Calculate credit card payoff strategies and eliminate debt faster. Compare payment methods, analyze interest savings, and create a debt-free plan with our payoff calculator." />
        <meta property="og:title" content="Credit Card Payoff Calculator - Debt Elimination Tool" />
        <meta property="og:description" content="Calculate credit card payoff strategies and eliminate debt faster" />
        <meta name="keywords" content="credit card payoff calculator, debt payoff calculator, credit card debt elimination, debt snowball, debt avalanche" />
        <link rel="canonical" href="https://dollarmento.com/credit-card-payoff-calculator/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{payoffContent.title}</h1>
        <p>{payoffContent.description}</p>
        
        <section>
          <h2>Credit Card Debt Elimination Guide</h2>
          <p>{payoffContent.educationalContent.overview}</p>
          
          <h3>Payoff Strategies</h3>
          {payoffContent.educationalContent.payoffStrategies.map((strategy, index) => (
            <div key={index}>
              <h4>{strategy.strategy}</h4>
              <p><strong>Approach:</strong> {strategy.approach}</p>
              <p><strong>Benefits:</strong> {strategy.benefits}</p>
              <p><strong>Best For:</strong> {strategy.bestFor}</p>
            </div>
          ))}
          
          <h3>Understanding Credit Card Debt Costs</h3>
          <p><strong>Average APR:</strong> {payoffContent.educationalContent.costOfDebt.averageAPR}</p>
          <p><strong>Minimum Payments:</strong> {payoffContent.educationalContent.costOfDebt.minimumPayment}</p>
          <p><strong>Compounding Effect:</strong> {payoffContent.educationalContent.costOfDebt.compoundingEffect}</p>
          
          <h3>Debt Acceleration Tips</h3>
          <ul>
            {payoffContent.educationalContent.accelerationTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          
          <h3>Future Debt Prevention</h3>
          <ul>
            {payoffContent.educationalContent.preventionStrategies.map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
          
          <h3>Calculator Features</h3>
          <ul>
            {payoffContent.toolFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive Credit Card Payoff Calculator */}
      <CreditCardPayoffCalculator payoffContent={payoffContent} />
    </>
  )
}
