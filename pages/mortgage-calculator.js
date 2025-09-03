import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive calculator
export async function getStaticProps() {
  const calculatorContent = {
    title: "Mortgage Calculator - Smart Home Loan Planning",
    description: "Calculate your monthly mortgage payment, total interest, and amortization schedule with our comprehensive mortgage calculator. Understand loan terms, down payments, tax benefits, and prepayment strategies to make informed home buying decisions.",
    
    educationalContent: {
      overview: "A mortgage is a loan specifically used to purchase real estate, where the property serves as collateral. Understanding mortgage calculations, payment structures, and long-term costs helps you make informed decisions about one of your largest financial commitments.",
      
      keyTerms: [
        {
          title: "Principal and Interest",
          content: "Principal is the loan amount you borrow, while interest is the cost of borrowing that money. Your monthly payment covers both, with early payments going mostly toward interest and later payments toward principal."
        },
        {
          title: "Down Payment",
          content: "The upfront payment you make when purchasing a home, typically 10-20% of the home's value. A larger down payment reduces your loan amount, monthly payments, and may eliminate private mortgage insurance (PMI)."
        },
        {
          title: "Loan Terms",
          content: "Common mortgage terms are 15 or 30 years. Shorter terms mean higher monthly payments but less total interest paid. Longer terms offer lower monthly payments but higher total interest costs."
        },
        {
          title: "Interest Rates",
          content: "The annual cost of borrowing expressed as a percentage. Fixed rates remain constant throughout the loan, while adjustable rates can change based on market conditions after an initial fixed period."
        }
      ],
      
      strategies: [
        "Save for a 20% down payment to avoid PMI and secure better rates",
        "Consider 15-year mortgages to save significantly on total interest",
        "Make extra principal payments to reduce loan term and interest costs",
        "Shop with multiple lenders to compare rates and closing costs",
        "Consider points if you plan to stay in the home long-term"
      ],
      
      costFactors: [
        "Property taxes vary by location and affect your total monthly payment",
        "Homeowners insurance protects your investment and is often required",
        "PMI is required for conventional loans with less than 20% down",
        "HOA fees for condos and some neighborhoods add to monthly costs",
        "Closing costs typically range from 2-5% of the loan amount"
      ]
    },
    
    calculatorFeatures: [
      "Accurate monthly payment calculations with principal and interest",
      "Complete amortization schedule showing payment breakdown over time",
      "Prepayment analysis to see interest savings from extra payments",
      "Down payment impact analysis for optimal purchase planning",
      "Tax deduction estimates for mortgage interest and property taxes",
      "Total cost of ownership calculations including taxes and insurance"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { calculatorContent },
    revalidate: 86400, // Update daily
  };
}

// Lazy-load only the interactive calculator widget (not the whole page)
const MortgageCalculatorWidget = dynamic(() => import('@/pages/MortgageCalculator'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
    </div>
  )
});

export default function Page({ calculatorContent }) {
  return (
    <>
      <Head>
        <title>Mortgage Calculator - Free Home Loan Payment Calculator | DollarMento</title>
        <meta name="description" content="Free mortgage calculator to estimate monthly payments, total interest, and amortization schedule. Calculate home loan payments with taxes, insurance, and PMI." />
        <meta property="og:title" content="Mortgage Calculator - Free Home Loan Calculator" />
        <meta property="og:description" content="Calculate mortgage payments, interest, and amortization schedules" />
        <meta name="keywords" content="mortgage calculator, home loan calculator, monthly payment calculator, mortgage payment, home loan" />
        <link rel="canonical" href="https://dollarmento.com/mortgage-calculator/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{calculatorContent.title}</h1>
        <p>{calculatorContent.description}</p>
        
        <section>
          <h2>Mortgage Planning Guide</h2>
          <p>{calculatorContent.educationalContent.overview}</p>
          
          <h3>Essential Mortgage Terms</h3>
          {calculatorContent.educationalContent.keyTerms.map((term, index) => (
            <div key={index}>
              <h4>{term.title}</h4>
              <p>{term.content}</p>
            </div>
          ))}
          
          <h3>Smart Mortgage Strategies</h3>
          <ul>
            {calculatorContent.educationalContent.strategies.map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
          
          <h3>Cost Factors to Consider</h3>
          <ul>
            {calculatorContent.educationalContent.costFactors.map((factor, index) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
          
          <h3>Calculator Features</h3>
          <ul>
            {calculatorContent.calculatorFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive Calculator */}
      <MortgageCalculatorWidget calculatorContent={calculatorContent} />
    </>
  )
}
