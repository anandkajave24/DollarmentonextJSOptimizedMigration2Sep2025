import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive calculator
export async function getStaticProps() {
  const emiContent = {
    title: "EMI Calculator - Loan Payment Calculator & Interest Analysis",
    description: "Calculate EMI payments for loans with our comprehensive EMI calculator. Analyze loan payments, interest rates, and repayment schedules for home loans, personal loans, and car loans with detailed amortization.",
    
    educationalContent: {
      overview: "Equated Monthly Installment (EMI) is the fixed payment amount made by a borrower to a lender at a specified date each month. Understanding EMI calculations helps you make informed borrowing decisions and plan your finances effectively.",
      
      emiComponents: [
        {
          component: "Principal Amount",
          content: "The original loan amount borrowed from the lender, excluding interest and fees. This forms the base for EMI calculation.",
          impact: "Higher principal increases EMI proportionally. Larger down payments reduce principal and monthly payments."
        },
        {
          component: "Interest Rate",
          content: "The annual percentage rate charged by the lender for borrowing money. This significantly impacts total loan cost.",
          impact: "Even small rate differences (0.5-1%) can save thousands over loan tenure. Shop around for best rates."
        },
        {
          component: "Loan Tenure",
          content: "The time period over which the loan will be repaid, typically measured in months or years.",
          impact: "Longer tenure reduces EMI but increases total interest paid. Shorter tenure saves money but increases monthly burden."
        }
      ],
      
      calculationFormula: "EMI = [P × R × (1+R)^N] / [(1+R)^N - 1] where P = Principal, R = Monthly Interest Rate, N = Number of months",
      
      loanTypes: [
        {
          type: "Home Loans",
          features: ["15-30 year tenure", "6-9% interest rates", "Tax benefits available", "Property as collateral"],
          considerations: "Longest tenure loans with tax advantages. Consider property appreciation and location factors."
        },
        {
          type: "Personal Loans",
          features: ["1-5 year tenure", "10-20% interest rates", "No collateral required", "Quick processing"],
          considerations: "Higher interest rates but flexible usage. Ideal for emergencies or debt consolidation."
        },
        {
          type: "Car Loans",
          features: ["3-7 year tenure", "8-12% interest rates", "Vehicle as collateral", "Lower down payments"],
          considerations: "Moderate interest rates with vehicle security. Consider depreciation vs loan balance."
        }
      ],
      
      optimizationTips: [
        "Make higher down payments to reduce principal and EMI amounts",
        "Choose appropriate tenure balancing EMI affordability and total interest cost",
        "Compare rates from multiple lenders including banks, NBFCs, and digital platforms",
        "Consider prepayment options to reduce total interest burden",
        "Maintain good credit score for better interest rate negotiations"
      ]
    },
    
    toolFeatures: [
      "Comprehensive EMI calculation for all loan types",
      "Detailed amortization schedule with payment breakdown",
      "Interest vs principal payment analysis over time",
      "Loan comparison tools for multiple scenarios",
      "Prepayment impact analysis and savings calculation"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { emiContent },
    revalidate: 259200, // Update every 3 days to reduce regeneration spikes
  };
}

// CSR for interactive EMI calculator functionality
const EMICalculator = dynamic(() => import('@/pages/EMICalculator'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page({ emiContent }) {
  return (
    <>
      <Head>
        <title>EMI Calculator - Loan Payment Calculator & Interest Analysis | DollarMento</title>
        <meta name="description" content="Calculate EMI payments for loans with our comprehensive EMI calculator. Analyze loan payments, interest rates, and repayment schedules for home loans, personal loans, and car loans." />
        <meta property="og:title" content="EMI Calculator - Loan Payment Calculator" />
        <meta property="og:description" content="Calculate EMI payments and analyze loan interest with detailed amortization" />
        <meta name="keywords" content="EMI calculator, loan calculator, home loan EMI, personal loan calculator, car loan EMI, loan payment calculator" />
        <link rel="canonical" href="https://dollarmento.com/emi-calculator/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{emiContent.title}</h1>
        <p>{emiContent.description}</p>
        
        <section>
          <h2>EMI Calculator Guide</h2>
          <p>{emiContent.educationalContent.overview}</p>
          
          <h3>EMI Components</h3>
          {emiContent.educationalContent.emiComponents.map((component, index) => (
            <div key={index}>
              <h4>{component.component}</h4>
              <p>{component.content}</p>
              <p><strong>Impact:</strong> {component.impact}</p>
            </div>
          ))}
          
          <h3>EMI Calculation Formula</h3>
          <p>{emiContent.educationalContent.calculationFormula}</p>
          
          <h3>Loan Types and Features</h3>
          {emiContent.educationalContent.loanTypes.map((loan, index) => (
            <div key={index}>
              <h4>{loan.type}</h4>
              <ul>
                {loan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <p><strong>Key Considerations:</strong> {loan.considerations}</p>
            </div>
          ))}
          
          <h3>EMI Optimization Tips</h3>
          <ul>
            {emiContent.educationalContent.optimizationTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          
          <h3>Calculator Features</h3>
          <ul>
            {emiContent.toolFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive EMI Calculator */}
      <EMICalculator emiContent={emiContent} />
    </>
  )
}
