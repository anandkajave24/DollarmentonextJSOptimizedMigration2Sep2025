import Head from 'next/head';
import FinancialEducation from '@/pages/FinancialEducation';

// Use SSR to avoid potential React hook issues during build time
export async function getServerSideProps() {
  const educationalContent = {
    sections: [
      {
        title: "Personal Finance Fundamentals",
        content: "Master the basics of budgeting, saving, and debt management. Learn how to create effective budgets, build emergency funds, and eliminate high-interest debt systematically.",
        topics: ["Budgeting Strategies", "Emergency Fund Planning", "Debt Elimination", "Cash Flow Management"]
      },
      {
        title: "Investment Education", 
        content: "Comprehensive investment education covering stocks, bonds, mutual funds, ETFs, and retirement accounts. Understand risk management, portfolio diversification, and long-term wealth building.",
        topics: ["Stock Market Basics", "401k Optimization", "Portfolio Diversification", "Risk Assessment"]
      },
      {
        title: "Retirement Planning",
        content: "Strategic retirement planning including 401k maximization, IRA strategies, Social Security optimization, and retirement income planning for financial independence.",
        topics: ["401k Strategies", "IRA Planning", "Social Security", "Retirement Income"]
      }
    ],
    resources: [
      "Interactive Calculators for Financial Planning",
      "Step-by-Step Investment Guides", 
      "Budget Planning Templates",
      "Retirement Readiness Assessments"
    ],
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { educationalContent },
    revalidate: 86400, // Update daily
  };
}

export default function Page({ educationalContent }) {
  return (
    <>
      <Head>
        <title>Financial Education Hub - Complete Learning Center | DollarMento</title>
        <meta name="description" content="Comprehensive financial education covering personal finance, investing, budgeting, retirement planning, and wealth building strategies for all skill levels." />
        <meta property="og:title" content="Financial Education Hub - DollarMento" />
        <meta property="og:description" content="Master personal finance through comprehensive educational content and interactive tools" />
        <meta name="keywords" content="financial education, personal finance learning, investment education, money management courses, financial literacy" />
        <link rel="canonical" href="https://dollarmento.com/financial-education/" />
      </Head>
      <FinancialEducation educationalContent={educationalContent} />
    </>
  )
}
