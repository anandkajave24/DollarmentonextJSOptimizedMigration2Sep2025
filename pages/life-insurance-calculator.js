import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive calculator
export async function getStaticProps() {
  const lifeInsuranceContent = {
    title: "Life Insurance Calculator - Coverage Amount & Premium Planning Tool",
    description: "Calculate life insurance coverage needs and compare premiums. Determine optimal life insurance amounts, analyze term vs whole life options, and protect your family's financial future.",
    
    educationalContent: {
      overview: "Life insurance provides financial protection for your loved ones in case of unexpected death. Determining the right coverage amount and type ensures your family can maintain their lifestyle and meet financial obligations.",
      
      coverageCalculation: [
        {
          method: "Income Replacement Method",
          formula: "10-12 times annual income for comprehensive coverage",
          considerations: "Covers lost income over working years, ideal for primary breadwinners"
        },
        {
          method: "Debt Plus Expenses Method",
          formula: "Outstanding debts + future expenses (education, mortgage)",
          considerations: "Focuses on specific financial obligations and goals"
        },
        {
          method: "DIME Method",
          formula: "Debt + Income (10x) + Mortgage + Education costs",
          considerations: "Comprehensive approach covering all major financial needs"
        }
      ],
      
      insuranceTypes: [
        {
          type: "Term Life Insurance",
          features: ["Lower premiums", "Temporary coverage (10-30 years)", "Pure insurance protection", "Convertible options available"],
          bestFor: "Young families with tight budgets needing maximum coverage",
          cost: "$20-50 monthly for $500K coverage (healthy 30-year-old)"
        },
        {
          type: "Whole Life Insurance",
          features: ["Permanent coverage", "Cash value accumulation", "Fixed premiums", "Guaranteed death benefit"],
          bestFor: "High-income individuals seeking permanent protection and investment",
          cost: "$400-800 monthly for $500K coverage (healthy 30-year-old)"
        }
      ],
      
      factorsAffectingPremiums: [
        "Age: Younger applicants pay significantly lower premiums",
        "Health: Medical exams and health history impact rates substantially",
        "Lifestyle: Smoking, dangerous hobbies increase premiums",
        "Coverage amount: Higher coverage increases premiums proportionally",
        "Policy type: Term insurance costs less than permanent insurance"
      ],
      
      planningTips: [
        "Buy coverage while young and healthy for lower lifetime costs",
        "Review coverage annually and adjust for life changes",
        "Consider term insurance for temporary needs, whole life for permanent",
        "Shop multiple insurers as rates vary significantly",
        "Don't replace existing policies without careful analysis"
      ]
    },
    
    toolFeatures: [
      "Comprehensive life insurance needs analysis with multiple calculation methods",
      "Term vs whole life insurance comparison with cost analysis",
      "Premium estimation based on age, health, and coverage amount",
      "Family financial security assessment and gap analysis",
      "Life insurance laddering strategy for changing needs"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { lifeInsuranceContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive life insurance calculator functionality
const Life_insuranceCalculator = dynamic(() => import('@/pages/LifeInsuranceCalculator'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page({ lifeInsuranceContent }) {
  return (
    <>
      <Head>
        <title>Life Insurance Calculator - Coverage Amount & Premium Planning Tool | DollarMento</title>
        <meta name="description" content="Calculate life insurance coverage needs and compare premiums. Determine optimal life insurance amounts, analyze term vs whole life options, and protect your family's financial future." />
        <meta property="og:title" content="Life Insurance Calculator - Coverage Planning Tool" />
        <meta property="og:description" content="Calculate life insurance needs and compare coverage options" />
        <meta name="keywords" content="life insurance calculator, life insurance coverage, term life insurance, whole life insurance, life insurance needs" />
        <link rel="canonical" href="https://dollarmento.com/life-insurance-calculator/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{lifeInsuranceContent.title}</h1>
        <p>{lifeInsuranceContent.description}</p>
        
        <section>
          <h2>Life Insurance Planning Guide</h2>
          <p>{lifeInsuranceContent.educationalContent.overview}</p>
          
          <h3>Coverage Calculation Methods</h3>
          {lifeInsuranceContent.educationalContent.coverageCalculation.map((method, index) => (
            <div key={index}>
              <h4>{method.method}</h4>
              <p><strong>Formula:</strong> {method.formula}</p>
              <p><strong>Considerations:</strong> {method.considerations}</p>
            </div>
          ))}
          
          <h3>Types of Life Insurance</h3>
          {lifeInsuranceContent.educationalContent.insuranceTypes.map((insurance, index) => (
            <div key={index}>
              <h4>{insurance.type}</h4>
              <ul>
                {insurance.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <p><strong>Best For:</strong> {insurance.bestFor}</p>
              <p><strong>Typical Cost:</strong> {insurance.cost}</p>
            </div>
          ))}
          
          <h3>Factors Affecting Premiums</h3>
          <ul>
            {lifeInsuranceContent.educationalContent.factorsAffectingPremiums.map((factor, index) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
          
          <h3>Planning Tips</h3>
          <ul>
            {lifeInsuranceContent.educationalContent.planningTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          
          <h3>Calculator Features</h3>
          <ul>
            {lifeInsuranceContent.toolFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive Life Insurance Calculator */}
      <Life_insuranceCalculator lifeInsuranceContent={lifeInsuranceContent} />
    </>
  )
}
