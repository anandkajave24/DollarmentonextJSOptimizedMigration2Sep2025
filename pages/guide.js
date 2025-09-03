import Head from 'next/head';
import Guide from '@/pages/Guide';

// SSG for SEO crawler accessibility - guide content must be crawlable
export async function getStaticProps() {
  const guideContent = {
    guides: [
      {
        category: "Budgeting & Saving",
        title: "Complete Budgeting Guide",
        content: "Master personal budgeting with proven strategies. Learn the 50/30/20 rule, zero-based budgeting, and envelope methods. Track expenses, identify spending patterns, and build sustainable savings habits.",
        steps: ["Calculate Monthly Income", "List Fixed Expenses", "Track Variable Costs", "Set Savings Goals", "Monitor Progress"]
      },
      {
        category: "Investment Planning", 
        title: "Investment Strategy Guide",
        content: "Comprehensive investment planning covering asset allocation, risk tolerance assessment, and portfolio construction. Learn about stocks, bonds, mutual funds, ETFs, and retirement accounts.",
        steps: ["Assess Risk Tolerance", "Set Investment Goals", "Choose Asset Allocation", "Select Investments", "Monitor & Rebalance"]
      },
      {
        category: "Debt Management",
        title: "Debt Elimination Strategy",
        content: "Strategic approach to debt elimination using avalanche and snowball methods. Prioritize high-interest debt, negotiate with creditors, and create sustainable payoff plans.",
        steps: ["List All Debts", "Choose Strategy", "Increase Payments", "Avoid New Debt", "Celebrate Milestones"]
      },
      {
        category: "Retirement Planning",
        title: "Retirement Readiness Guide", 
        content: "Comprehensive retirement planning including 401k optimization, IRA strategies, and Social Security planning. Calculate retirement needs and create income strategies.",
        steps: ["Calculate Needs", "Maximize 401k", "Open IRA", "Plan Social Security", "Create Income Strategy"]
      }
    ],
    tools: [
      "Budget Planning Calculator",
      "Investment Portfolio Analyzer", 
      "Debt Payoff Calculator",
      "Retirement Planning Tools"
    ],
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { guideContent },
    revalidate: 86400, // Update daily
  };
}

export default function Page({ guideContent }) {
  return (
    <>
      <Head>
        <title>Financial Planning Guide - Complete Money Management | DollarMento</title>
        <meta name="description" content="Comprehensive financial planning guides covering budgeting, investing, saving, retirement planning, and wealth building strategies. Step-by-step financial tutorials." />
        <meta property="og:title" content="Financial Planning Guide - DollarMento" />
        <meta property="og:description" content="Complete guide to financial planning and money management" />
        <meta name="keywords" content="financial planning guide, money management, personal finance guide, budgeting guide, investment guide" />
        <link rel="canonical" href="https://dollarmento.com/guide/" />
      </Head>
      <Guide guideContent={guideContent} />
    </>
  )
}
