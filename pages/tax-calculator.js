import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive calculator
export async function getStaticProps() {
  const taxContent = {
    title: "Tax Calculator USA - Federal & State Income Tax Calculator",
    description: "Calculate your federal and state income taxes with our comprehensive USA tax calculator. Estimate tax liability, refunds, and optimize tax planning with current tax brackets and deductions.",
    
    educationalContent: {
      overview: "Understanding your tax liability is crucial for financial planning and maximizing your take-home income. Our tax calculator helps you estimate federal and state taxes while identifying optimization opportunities.",
      
      taxBrackets2024: [
        {
          bracket: "10% Tax Bracket",
          income: "Single: $0 - $11,000 | Married: $0 - $22,000",
          strategy: "First dollars taxed at lowest rate. Maximize earnings in this bracket for lowest tax burden."
        },
        {
          bracket: "12% Tax Bracket", 
          income: "Single: $11,001 - $44,725 | Married: $22,001 - $89,450",
          strategy: "Most middle-income earners fall here. Focus on standard deduction optimization."
        },
        {
          bracket: "22% Tax Bracket",
          income: "Single: $44,726 - $95,375 | Married: $89,451 - $190,750",
          strategy: "Higher earners should consider tax-advantaged accounts and itemized deductions."
        },
        {
          bracket: "24% Tax Bracket",
          income: "Single: $95,376 - $182,050 | Married: $190,751 - $364,200",
          strategy: "Significant tax planning opportunities. Consider retirement account maximization."
        }
      ],
      
      deductions: [
        {
          type: "Standard Deduction",
          amount: "Single: $13,850 | Married: $27,700",
          benefit: "Automatic deduction available to all taxpayers without itemizing."
        },
        {
          type: "Itemized Deductions",
          categories: ["State/local taxes (SALT) up to $10,000", "Mortgage interest", "Charitable contributions", "Medical expenses over 7.5% AGI"],
          benefit: "May exceed standard deduction for homeowners and high earners."
        }
      ],
      
      taxAdvantageAccounts: [
        "401(k): Up to $22,500 pre-tax ($30,000 if 50+)",
        "Traditional IRA: Up to $6,500 deductible ($7,500 if 50+)", 
        "HSA: Up to $3,850 individual ($4,300 family) triple tax advantage",
        "529 Plans: State tax deductions for education savings"
      ],
      
      planningStrategies: [
        "Maximize employer 401(k) match for guaranteed 100% return",
        "Use tax-loss harvesting to offset investment gains",
        "Consider Roth conversions in lower-income years",
        "Time income and deductions across tax years strategically",
        "Contribute to HSA for triple tax advantage on medical expenses"
      ]
    },
    
    toolFeatures: [
      "Federal and state income tax calculation for all 50 states",
      "Current tax brackets and standard deduction amounts",
      "Itemized vs standard deduction optimization analysis",
      "Tax-advantaged account impact calculator",
      "Quarterly tax payment estimator for self-employed"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { taxContent },
    revalidate: 259200, // Update every 3 days to reduce regeneration spikes
  };
}

// CSR for interactive tax calculator functionality
const TaxCalculatorUSA = dynamic(() => import('@/pages/TaxCalculatorUSA'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page({ taxContent }) {
  return (
    <>
      <Head>
        <title>Tax Calculator USA - Federal & State Income Tax Calculator | DollarMento</title>
        <meta name="description" content="Calculate your federal and state income taxes with our comprehensive USA tax calculator. Estimate tax liability, refunds, and optimize tax planning with current tax brackets." />
        <meta property="og:title" content="Tax Calculator USA - Federal & State Income Tax" />
        <meta property="og:description" content="Comprehensive tax calculator for federal and state income tax estimation" />
        <meta name="keywords" content="tax calculator, income tax calculator, federal tax calculator, state tax calculator, tax estimator, tax planning" />
        <link rel="canonical" href="https://dollarmento.com/tax-calculator/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{taxContent.title}</h1>
        <p>{taxContent.description}</p>
        
        <section>
          <h2>Tax Calculator Guide</h2>
          <p>{taxContent.educationalContent.overview}</p>
          
          <h3>2024 Federal Tax Brackets</h3>
          {taxContent.educationalContent.taxBrackets2024.map((bracket, index) => (
            <div key={index}>
              <h4>{bracket.bracket}</h4>
              <p><strong>Income Range:</strong> {bracket.income}</p>
              <p><strong>Strategy:</strong> {bracket.strategy}</p>
            </div>
          ))}
          
          <h3>Tax Deductions</h3>
          {taxContent.educationalContent.deductions.map((deduction, index) => (
            <div key={index}>
              <h4>{deduction.type}</h4>
              {deduction.amount && <p><strong>Amount:</strong> {deduction.amount}</p>}
              {deduction.categories && (
                <ul>
                  {deduction.categories.map((cat, idx) => (
                    <li key={idx}>{cat}</li>
                  ))}
                </ul>
              )}
              <p><strong>Benefit:</strong> {deduction.benefit}</p>
            </div>
          ))}
          
          <h3>Tax-Advantaged Accounts</h3>
          <ul>
            {taxContent.educationalContent.taxAdvantageAccounts.map((account, index) => (
              <li key={index}>{account}</li>
            ))}
          </ul>
          
          <h3>Tax Planning Strategies</h3>
          <ul>
            {taxContent.educationalContent.planningStrategies.map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
          
          <h3>Calculator Features</h3>
          <ul>
            {taxContent.toolFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive Tax Calculator */}
      <TaxCalculatorUSA taxContent={taxContent} />
    </>
  )
}
