import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive calculator
export async function getStaticProps() {
  const calculatorContent = {
    title: "401k Calculator - Plan Your Retirement Success",
    description: "Calculate your 401k retirement savings potential with our comprehensive calculator. Understand employer matching, tax advantages, contribution limits, and growth projections to optimize your retirement planning strategy.",
    
    educationalContent: {
      overview: "A 401k is an employer-sponsored retirement savings plan that allows you to save money for retirement while reducing your current taxable income. Understanding how 401k contributions, employer matching, and compound growth work together is essential for building long-term wealth.",
      
      keyFeatures: [
        {
          title: "Tax-Deferred Growth",
          content: "Traditional 401k contributions are made with pre-tax dollars, reducing your current taxable income. Your money grows tax-deferred until retirement, when withdrawals are taxed as ordinary income."
        },
        {
          title: "Employer Matching", 
          content: "Many employers offer matching contributions, essentially free money for your retirement. Common matches include dollar-for-dollar up to 3% or 50 cents per dollar up to 6% of your salary."
        },
        {
          title: "Contribution Limits",
          content: "For 2024, you can contribute up to $23,000 annually ($30,500 if age 50 or older with catch-up contributions). These limits help maximize your tax-advantaged savings."
        },
        {
          title: "Investment Options",
          content: "401k plans typically offer mutual funds, index funds, and target-date funds. Diversifying your investments and considering low-cost options can significantly impact long-term growth."
        }
      ],
      
      strategies: [
        "Contribute enough to get full employer match - it's free money",
        "Increase contributions by 1% annually until you reach the maximum",
        "Consider Roth 401k if your employer offers it for tax-free retirement withdrawals",
        "Review and rebalance your investment allocation annually",
        "Take advantage of catch-up contributions after age 50"
      ],
      
      taxConsiderations: [
        "Traditional 401k contributions reduce current year taxable income",
        "Roth 401k contributions are made with after-tax dollars but grow tax-free",
        "Required minimum distributions (RMDs) start at age 73",
        "Early withdrawals before age 59½ typically incur 10% penalty plus taxes",
        "State tax treatment varies - some states don't tax retirement income"
      ]
    },
    
    calculatorFeatures: [
      "Comprehensive 401k projection with employer matching scenarios",
      "Traditional vs Roth 401k comparison analysis", 
      "State-specific tax calculations for accurate planning",
      "Salary increase and catch-up contribution modeling",
      "Detailed year-by-year growth projections",
      "Multiple employer matching structures supported"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { calculatorContent },
    revalidate: 259200, // Update every 3 days to reduce regeneration spikes
  };
}

// CSR for interactive calculator functionality
const Calculator401k = dynamic(() => import('@/pages/Calculator401k'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading 401k calculator...</p>
      </div>
    </div>
  )
});

export default function Page({ calculatorContent }) {
  return (
    <>
      <Head>
        <title>401k Calculator - Retirement Planning Tool | DollarMento</title>
        <meta name="description" content="Free 401k calculator to plan your retirement savings. Calculate employer matching, tax benefits, and projected retirement value with compound interest." />
        <meta property="og:title" content="401k Calculator - Free Retirement Planning Tool" />
        <meta property="og:description" content="Calculate your 401k retirement savings with employer matching and tax benefits" />
        <meta name="keywords" content="401k calculator, retirement calculator, 401k planning, employer matching calculator, retirement savings" />
        <link rel="canonical" href="https://dollarmento.com/401k-calculator/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{calculatorContent.title}</h1>
        <p>{calculatorContent.description}</p>
        
        <section>
          <h2>401k Retirement Planning Guide</h2>
          <p>{calculatorContent.educationalContent.overview}</p>
          
          <h3>Key 401k Features</h3>
          {calculatorContent.educationalContent.keyFeatures.map((feature, index) => (
            <div key={index}>
              <h4>{feature.title}</h4>
              <p>{feature.content}</p>
            </div>
          ))}
          
          <h3>401k Investment Strategies</h3>
          <ul>
            {calculatorContent.educationalContent.strategies.map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
          
          <h3>Tax Considerations</h3>
          <ul>
            {calculatorContent.educationalContent.taxConsiderations.map((consideration, index) => (
              <li key={index}>{consideration}</li>
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
      <Calculator401k calculatorContent={calculatorContent} />
    </>
  )
}
