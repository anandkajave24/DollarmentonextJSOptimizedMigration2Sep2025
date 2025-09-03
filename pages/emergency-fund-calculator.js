import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive calculator
export async function getStaticProps() {
  const emergencyContent = {
    title: "Emergency Fund Calculator - Financial Safety Net Planning Tool",
    description: "Calculate your ideal emergency fund size and build a financial safety net. Plan emergency savings goals, timeline, and strategies to protect against unexpected expenses and income loss.",
    
    educationalContent: {
      overview: "An emergency fund is your financial safety net, providing security against unexpected expenses, job loss, or economic downturns. Building an adequate emergency fund is the foundation of financial stability and peace of mind.",
      
      emergencyFundSizes: [
        {
          size: "Starter Emergency Fund",
          amount: "$1,000 - $2,500",
          purpose: "Cover small unexpected expenses while paying off high-interest debt",
          timeline: "Build within 30-60 days by reducing non-essential spending"
        },
        {
          size: "Full Emergency Fund",
          amount: "3-6 months of expenses",
          purpose: "Standard recommendation for most stable employment situations", 
          timeline: "Build over 6-12 months through consistent monthly contributions"
        },
        {
          size: "Extended Emergency Fund",
          amount: "6-12 months of expenses",
          purpose: "For self-employed, commission-based income, or uncertain job markets",
          timeline: "Build over 1-2 years with higher savings rate priority"
        }
      ],
      
      expenseCategories: [
        "Housing: Rent/mortgage, utilities, maintenance, insurance",
        "Transportation: Car payments, gas, insurance, public transit",
        "Food: Groceries, dining out, meal planning basics",
        "Healthcare: Insurance premiums, medications, basic care",
        "Debt Payments: Minimum payments on all debts",
        "Personal: Phone, internet, basic clothing, hygiene items"
      ],
      
      fundingStrategies: [
        "Automate transfers to separate high-yield savings account",
        "Use tax refunds, bonuses, and windfalls to boost fund quickly",
        "Reduce discretionary spending temporarily to accelerate building",
        "Consider side income or freelancing to increase funding speed",
        "Start small but be consistent - even $25/month builds over time"
      ],
      
      storageOptions: [
        {
          option: "High-Yield Savings Account",
          pros: "FDIC insured, immediate access, competitive interest rates",
          cons: "Lower returns than investments, inflation risk"
        },
        {
          option: "Money Market Account", 
          pros: "Higher interest than traditional savings, check writing access",
          cons: "Higher minimum balances, limited transactions"
        },
        {
          option: "Short-term CDs",
          pros: "Guaranteed returns, FDIC insured, ladder strategy possible",
          cons: "Reduced liquidity, early withdrawal penalties"
        }
      ],
      
      maintenanceTips: [
        "Review and adjust fund size annually based on expense changes",
        "Replenish immediately after using funds for emergencies",
        "Keep separate from other savings to avoid temptation",
        "Consider inflation impact and adjust target amount yearly",
        "Don't over-save in emergency fund at expense of other goals"
      ]
    },
    
    toolFeatures: [
      "Personalized emergency fund target calculation based on expenses",
      "Monthly savings goal calculator with timeline projection",
      "Expense category breakdown for accurate planning",
      "Progress tracking with visual milestones and achievements",
      "Storage option comparison with interest rate analysis"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { emergencyContent },
    revalidate: 259200, // Update every 3 days to reduce regeneration spikes
  };
}

// CSR for interactive emergency fund calculator functionality
const EmergencyFundCalculator = dynamic(() => import('@/pages/EmergencyFundCalculator'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page({ emergencyContent }) {
  return (
    <>
      <Head>
        <title>Emergency Fund Calculator - Financial Safety Net Planning Tool | DollarMento</title>
        <meta name="description" content="Calculate your ideal emergency fund size and build a financial safety net. Plan emergency savings goals, timeline, and strategies to protect against unexpected expenses." />
        <meta property="og:title" content="Emergency Fund Calculator - Financial Safety Net" />
        <meta property="og:description" content="Calculate ideal emergency fund size and build financial security" />
        <meta name="keywords" content="emergency fund calculator, emergency savings calculator, financial safety net, emergency fund planning, savings goal calculator" />
        <link rel="canonical" href="https://dollarmento.com/emergency-fund-calculator/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{emergencyContent.title}</h1>
        <p>{emergencyContent.description}</p>
        
        <section>
          <h2>Emergency Fund Planning Guide</h2>
          <p>{emergencyContent.educationalContent.overview}</p>
          
          <h3>Emergency Fund Size Guidelines</h3>
          {emergencyContent.educationalContent.emergencyFundSizes.map((fund, index) => (
            <div key={index}>
              <h4>{fund.size}</h4>
              <p><strong>Amount:</strong> {fund.amount}</p>
              <p><strong>Purpose:</strong> {fund.purpose}</p>
              <p><strong>Timeline:</strong> {fund.timeline}</p>
            </div>
          ))}
          
          <h3>Essential Expense Categories</h3>
          <ul>
            {emergencyContent.educationalContent.expenseCategories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
          
          <h3>Funding Strategies</h3>
          <ul>
            {emergencyContent.educationalContent.fundingStrategies.map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
          
          <h3>Storage Options</h3>
          {emergencyContent.educationalContent.storageOptions.map((option, index) => (
            <div key={index}>
              <h4>{option.option}</h4>
              <p><strong>Pros:</strong> {option.pros}</p>
              <p><strong>Cons:</strong> {option.cons}</p>
            </div>
          ))}
          
          <h3>Maintenance Tips</h3>
          <ul>
            {emergencyContent.educationalContent.maintenanceTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          
          <h3>Calculator Features</h3>
          <ul>
            {emergencyContent.toolFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive Emergency Fund Calculator */}
      <EmergencyFundCalculator emergencyContent={emergencyContent} />
    </>
  )
}
