import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive calculator
export async function getStaticProps() {
  const studentLoanContent = {
    title: "Student Loan Calculator - Education Debt & Repayment Planning Tool",
    description: "Calculate student loan payments and explore repayment options. Analyze federal and private student loans, compare repayment plans, and strategize education debt payoff with our comprehensive calculator.",
    
    educationalContent: {
      overview: "Student loans help finance higher education but require strategic planning for repayment. Understanding loan types, repayment options, and forgiveness programs helps minimize debt burden and accelerate payoff.",
      
      loanTypes: [
        {
          type: "Federal Direct Subsidized Loans",
          features: ["Government pays interest during school", "Need-based eligibility", "Lower interest rates", "Flexible repayment options"],
          limits: "$3,500-$5,500 annually depending on year in school",
          rates: "Current rate: 5.50% (undergraduate)"
        },
        {
          type: "Federal Direct Unsubsidized Loans",
          features: ["Available regardless of financial need", "Interest accrues during school", "Higher borrowing limits", "Same repayment protections as subsidized"],
          limits: "$5,500-$12,500 annually depending on dependency status",
          rates: "Current rate: 5.50% (undergraduate), 7.05% (graduate)"
        },
        {
          type: "Private Student Loans",
          features: ["Credit-based approval", "Variable or fixed rates", "Higher borrowing limits", "Fewer protections and repayment options"],
          limits: "Up to cost of attendance minus other aid",
          rates: "4-15% based on credit score and market conditions"
        }
      ],
      
      repaymentPlans: [
        {
          plan: "Standard Repayment",
          term: "10 years",
          payment: "Fixed monthly payment",
          benefits: "Lowest total interest, fastest payoff",
          drawbacks: "Highest monthly payment"
        },
        {
          plan: "Income-Driven Repayment (IDR)",
          term: "20-25 years",
          payment: "10-20% of discretionary income",
          benefits: "Lower monthly payments, forgiveness after term",
          drawbacks: "Higher total interest, longer repayment period"
        },
        {
          plan: "Extended Repayment",
          term: "25 years",
          payment: "Fixed or graduated payments",
          benefits: "Lower monthly payments than standard",
          drawbacks: "Significantly more interest paid over time"
        }
      ],
      
      payoffStrategies: [
        "Pay more than minimum to reduce principal and interest",
        "Target highest interest rate loans first (avalanche method)",
        "Consider refinancing private loans for better rates",
        "Make payments during grace period to prevent interest capitalization",
        "Use tax refunds and bonuses for extra principal payments"
      ],
      
      forgivenessPrograms: [
        "Public Service Loan Forgiveness (PSLF) after 120 qualifying payments",
        "Teacher Loan Forgiveness up to $17,500 for qualifying educators",
        "Income-driven repayment forgiveness after 20-25 years",
        "State-specific forgiveness programs for certain professions"
      ]
    },
    
    toolFeatures: [
      "Comprehensive student loan payment calculator for all loan types",
      "Federal repayment plan comparison with payment projections",
      "Loan consolidation and refinancing analysis",
      "Forgiveness program eligibility and benefit calculator",
      "Payoff acceleration calculator with extra payment scenarios"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { studentLoanContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive student loan calculator functionality
const Student_loanCalculator = dynamic(() => import('@/pages/StudentLoanCalculator'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page({ studentLoanContent }) {
  return (
    <>
      <Head>
        <title>Student Loan Calculator - Education Debt & Repayment Planning Tool | DollarMento</title>
        <meta name="description" content="Calculate student loan payments and explore repayment options. Analyze federal and private student loans, compare repayment plans, and strategize education debt payoff." />
        <meta property="og:title" content="Student Loan Calculator - Education Debt Planning" />
        <meta property="og:description" content="Calculate student loan payments and explore repayment strategies" />
        <meta name="keywords" content="student loan calculator, student loan repayment, education debt calculator, student loan forgiveness, federal student loans" />
        <link rel="canonical" href="https://dollarmento.com/student-loan-calculator/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{studentLoanContent.title}</h1>
        <p>{studentLoanContent.description}</p>
        
        <section>
          <h2>Student Loan Planning Guide</h2>
          <p>{studentLoanContent.educationalContent.overview}</p>
          
          <h3>Types of Student Loans</h3>
          {studentLoanContent.educationalContent.loanTypes.map((loan, index) => (
            <div key={index}>
              <h4>{loan.type}</h4>
              <ul>
                {loan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <p><strong>Borrowing Limits:</strong> {loan.limits}</p>
              <p><strong>Interest Rates:</strong> {loan.rates}</p>
            </div>
          ))}
          
          <h3>Repayment Plans</h3>
          {studentLoanContent.educationalContent.repaymentPlans.map((plan, index) => (
            <div key={index}>
              <h4>{plan.plan}</h4>
              <p><strong>Term:</strong> {plan.term}</p>
              <p><strong>Payment:</strong> {plan.payment}</p>
              <p><strong>Benefits:</strong> {plan.benefits}</p>
              <p><strong>Drawbacks:</strong> {plan.drawbacks}</p>
            </div>
          ))}
          
          <h3>Payoff Strategies</h3>
          <ul>
            {studentLoanContent.educationalContent.payoffStrategies.map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
          
          <h3>Forgiveness Programs</h3>
          <ul>
            {studentLoanContent.educationalContent.forgivenessPrograms.map((program, index) => (
              <li key={index}>{program}</li>
            ))}
          </ul>
          
          <h3>Calculator Features</h3>
          <ul>
            {studentLoanContent.toolFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive Student Loan Calculator */}
      <Student_loanCalculator studentLoanContent={studentLoanContent} />
    </>
  )
}
