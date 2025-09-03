import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive management
export async function getStaticProps() {
  const managementContent = {
    title: "Financial Management - Complete Personal Finance & Wealth Building Platform",
    description: "Comprehensive financial management tools for budgeting, investing, debt management, and wealth building. Take control of your finances with professional-grade planning and tracking tools.",
    
    educationalContent: {
      overview: "Effective financial management combines budgeting, investing, debt management, and strategic planning to build long-term wealth and achieve financial goals. A systematic approach to money management creates lasting financial security.",
      
      coreComponents: [
        {
          component: "Cash Flow Management",
          purpose: "Track income and expenses to ensure positive monthly cash flow and identify optimization opportunities",
          tools: ["Budget tracking", "Expense categorization", "Income optimization", "Cash flow forecasting"],
          outcome: "Predictable monthly surplus for savings and investment"
        },
        {
          component: "Debt Strategy",
          purpose: "Systematic elimination of high-interest debt while maintaining credit health and avoiding future debt accumulation",
          tools: ["Debt avalanche planning", "Credit score monitoring", "Refinancing analysis", "Payment optimization"],
          outcome: "Debt freedom and improved credit profile for better financial opportunities"
        },
        {
          component: "Investment Planning",
          purpose: "Build long-term wealth through strategic asset allocation and consistent investment contributions",
          tools: ["Portfolio allocation", "Retirement planning", "Tax-advantaged accounts", "Rebalancing strategies"],
          outcome: "Growing investment portfolio aligned with financial goals and risk tolerance"
        },
        {
          component: "Risk Management",
          purpose: "Protect wealth and income through appropriate insurance coverage and emergency preparedness",
          tools: ["Emergency fund planning", "Insurance analysis", "Estate planning basics", "Risk assessment"],
          outcome: "Comprehensive protection against financial setbacks and unexpected events"
        }
      ],
      
      managementPrinciples: [
        "Pay yourself first - automate savings and investments before discretionary spending",
        "Live below your means - maintain lifestyle inflation below income growth",
        "Diversify income and investments - reduce dependence on single sources",
        "Regular review and adjustment - adapt strategies as life circumstances change",
        "Long-term perspective - focus on decades rather than months for wealth building"
      ],
      
      implementationSteps: [
        {
          step: "Financial Assessment",
          action: "Calculate net worth, analyze cash flow, and identify current financial position",
          timeframe: "Week 1-2"
        },
        {
          step: "Goal Setting",
          action: "Define specific, measurable financial goals with realistic timelines",
          timeframe: "Week 3"
        },
        {
          step: "Strategy Development",
          action: "Create comprehensive plan covering budgeting, debt payoff, and investment allocation",
          timeframe: "Week 4"
        },
        {
          step: "System Implementation",
          action: "Set up automatic transfers, investment accounts, and tracking systems",
          timeframe: "Month 2"
        },
        {
          step: "Monitoring and Adjustment",
          action: "Regular review of progress and strategy refinement based on results",
          timeframe: "Ongoing monthly"
        }
      ]
    },
    
    toolFeatures: [
      "Comprehensive financial dashboard with net worth tracking and goal progress",
      "Integrated budgeting system with expense categorization and cash flow analysis",
      "Investment portfolio management with asset allocation and rebalancing tools",
      "Debt management system with payoff strategies and credit monitoring",
      "Financial planning tools for retirement, education, and major purchase goals"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { managementContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive financial management functionality
const Financial_management = dynamic(() => import('@/pages/FinancialManagement'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page({ managementContent }) {
  return (
    <>
      <Head>
        <title>Financial Management - Complete Personal Finance & Wealth Building Platform | DollarMento</title>
        <meta name="description" content="Comprehensive financial management tools for budgeting, investing, debt management, and wealth building. Take control of your finances with professional-grade planning tools." />
        <meta property="og:title" content="Financial Management - Complete Finance Platform" />
        <meta property="og:description" content="Comprehensive financial management and wealth building tools" />
        <meta name="keywords" content="financial management, personal finance, wealth building, financial planning, money management, financial tools" />
        <link rel="canonical" href="https://dollarmento.com/financial-management/" />
      </Head>
      
      {/* SSG Educational Content - Crawlable by search engines */}
      <div style={{ display: 'none' }} className="seo-content">
        <h1>{managementContent.title}</h1>
        <p>{managementContent.description}</p>
        
        <section>
          <h2>Financial Management Guide</h2>
          <p>{managementContent.educationalContent.overview}</p>
          
          <h3>Core Financial Management Components</h3>
          {managementContent.educationalContent.coreComponents.map((component, index) => (
            <div key={index}>
              <h4>{component.component}</h4>
              <p><strong>Purpose:</strong> {component.purpose}</p>
              <p><strong>Tools:</strong> {component.tools.join(", ")}</p>
              <p><strong>Outcome:</strong> {component.outcome}</p>
            </div>
          ))}
          
          <h3>Management Principles</h3>
          <ul>
            {managementContent.educationalContent.managementPrinciples.map((principle, index) => (
              <li key={index}>{principle}</li>
            ))}
          </ul>
          
          <h3>Implementation Steps</h3>
          {managementContent.educationalContent.implementationSteps.map((step, index) => (
            <div key={index}>
              <h4>Step {index + 1}: {step.step}</h4>
              <p><strong>Action:</strong> {step.action}</p>
              <p><strong>Timeframe:</strong> {step.timeframe}</p>
            </div>
          ))}
          
          <h3>Platform Features</h3>
          <ul>
            {managementContent.toolFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* CSR Interactive Financial Management Platform */}
      <Financial_management managementContent={managementContent} />
    </>
  )
}
