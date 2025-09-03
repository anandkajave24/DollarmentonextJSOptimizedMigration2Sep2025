import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive calculator
export async function getStaticProps() {
  const autoLoanContent = {
    title: "Auto Loan Calculator - Car Payment & Interest Rate Planning Tool",
    description: "Calculate auto loan payments and find the best car financing options. Compare interest rates, loan terms, and monthly payments for new and used vehicles with our comprehensive auto loan calculator.",
    
    educationalContent: {
      overview: "Auto loans help finance vehicle purchases through structured monthly payments over 2-8 years. Understanding loan terms, interest rates, and total costs helps you make informed car buying decisions and secure favorable financing.",
      
      loanTermOptions: [
        {
          term: "Short-term (24-48 months)",
          pros: ["Lower total interest paid", "Faster equity building", "Less time underwater on loan"],
          cons: ["Higher monthly payments", "Greater budget strain", "Less payment flexibility"],
          bestFor: "Buyers with stable income who want to minimize total cost"
        },
        {
          term: "Medium-term (60 months)",
          pros: ["Balanced monthly payment", "Most popular option", "Good payment-to-interest ratio"],
          cons: ["Moderate interest costs", "Standard depreciation risk"],
          bestFor: "Most buyers seeking balance between payment and total cost"
        },
        {
          term: "Long-term (72-84 months)",
          pros: ["Lower monthly payments", "Better cash flow", "Ability to buy more expensive cars"],
          cons: ["Higher total interest", "Longer underwater period", "Higher risk of negative equity"],
          bestFor: "Buyers prioritizing low monthly payments over total cost"
        }
      ],
      
      financingOptions: [
        {
          source: "Bank/Credit Union Auto Loans",
          rates: "4-8% for qualified buyers",
          advantages: ["Often lowest rates", "Pre-approval available", "Direct relationship"],
          process: "Get pre-approved before shopping to know your budget"
        },
        {
          source: "Dealer Financing",
          rates: "Varies, often higher than banks",
          advantages: ["Convenience", "Manufacturer incentives", "One-stop shopping"],
          process: "Compare with outside financing, negotiate rate like vehicle price"
        }
      ],
      
      downPaymentGuidelines: [
        "New cars: 10-20% down payment recommended",
        "Used cars: 20%+ down payment to avoid negative equity",
        "Benefits: Lower monthly payments, reduced interest, faster equity building",
        "Trade-in value can serve as down payment"
      ],
      
      costOptimizationTips: [
        "Shop around for best interest rates before visiting dealers",
        "Consider certified pre-owned vehicles for better value",
        "Factor in insurance, maintenance, and fuel costs",
        "Avoid extended warranties and dealer add-ons",
        "Keep total transportation costs under 15-20% of income"
      ]
    },
    
    toolFeatures: [
      "Comprehensive auto loan payment calculator with amortization schedule",
      "New vs used car financing comparison with depreciation analysis",
      "Down payment impact calculator for payment optimization",
      "Total cost of ownership analysis including interest and fees",
      "Loan refinancing calculator for existing auto loans"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { autoLoanContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive auto loan calculator functionality
const AutoLoanCalculator = dynamic(() => import('@/pages/AutoLoanCalculator'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page({ autoLoanContent }) {
  return (
    <>
      <Head>
        <title>Auto Loan Calculator - Car Payment & Interest Rate Planning Tool | DollarMento</title>
        <meta name="description" content="Calculate auto loan payments and find the best car financing options. Compare interest rates, loan terms, and monthly payments for new and used vehicles with our auto loan calculator." />
        <meta property="og:title" content="Auto Loan Calculator - Car Financing Tool" />
        <meta property="og:description" content="Calculate auto loan payments and compare car financing options" />
        <meta name="keywords" content="auto loan calculator, car loan calculator, car payment calculator, auto financing, car financing calculator" />
        <link rel="canonical" href="https://dollarmento.com/auto-loan-calculator/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{autoLoanContent.title}</h1>
        <p>{autoLoanContent.description}</p>
        
        <section>
          <h2>Auto Loan Planning Guide</h2>
          <p>{autoLoanContent.educationalContent.overview}</p>
          
          <h3>Loan Term Options</h3>
          {autoLoanContent.educationalContent.loanTermOptions.map((term, index) => (
            <div key={index}>
              <h4>{term.term}</h4>
              <p><strong>Pros:</strong></p>
              <ul>
                {term.pros.map((pro, idx) => (
                  <li key={idx}>{pro}</li>
                ))}
              </ul>
              <p><strong>Cons:</strong></p>
              <ul>
                {term.cons.map((con, idx) => (
                  <li key={idx}>{con}</li>
                ))}
              </ul>
              <p><strong>Best For:</strong> {term.bestFor}</p>
            </div>
          ))}
          
          <h3>Financing Options</h3>
          {autoLoanContent.educationalContent.financingOptions.map((option, index) => (
            <div key={index}>
              <h4>{option.source}</h4>
              <p><strong>Typical Rates:</strong> {option.rates}</p>
              <ul>
                {option.advantages.map((advantage, idx) => (
                  <li key={idx}>{advantage}</li>
                ))}
              </ul>
              <p><strong>Process:</strong> {option.process}</p>
            </div>
          ))}
          
          <h3>Down Payment Guidelines</h3>
          <ul>
            {autoLoanContent.educationalContent.downPaymentGuidelines.map((guideline, index) => (
              <li key={index}>{guideline}</li>
            ))}
          </ul>
          
          <h3>Cost Optimization Tips</h3>
          <ul>
            {autoLoanContent.educationalContent.costOptimizationTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          
          <h3>Calculator Features</h3>
          <ul>
            {autoLoanContent.toolFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive Auto Loan Calculator */}
      <AutoLoanCalculator autoLoanContent={autoLoanContent} />
    </>
  )
}