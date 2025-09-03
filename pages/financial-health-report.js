import Head from 'next/head';
import FinancialHealthReportSidebar from '@/pages/FinancialHealthReportSidebar';

// Use SSR to avoid potential React hook issues during build time
export async function getServerSideProps() {
  const healthReport = {
    lastGenerated: new Date().toISOString(),
    overallScore: 78,
    categories: {
      budgeting: { score: 85, trend: "improving" },
      savings: { score: 72, trend: "stable" },
      investments: { score: 81, trend: "improving" },
      debt: { score: 65, trend: "needs attention" }
    },
    recommendations: [
      "Consider increasing emergency fund target",
      "Review high-interest debt consolidation options",
      "Optimize 401k allocation for better returns"
    ]
  };

  return {
    props: { healthReport },
    revalidate: 28800, // 8 hours
  };
}

export default function Page({ healthReport }) {
  return (
    <>
      <Head>
        <title>Financial Health Report - Complete Financial Analysis | DollarMento</title>
        <meta name="description" content="Comprehensive financial health report with personalized insights, scoring, and recommendations. Analyze your budgeting, savings, investments, and debt management." />
        <meta property="og:title" content="Financial Health Report - Complete Analysis" />
        <meta property="og:description" content="Comprehensive financial health analysis with personalized insights and recommendations" />
        <meta name="keywords" content="financial health report, financial analysis, money management, financial assessment, financial score" />
        <link rel="canonical" href="https://dollarmento.com/financial-health-report/" />
      </Head>
      <FinancialHealthReportSidebar healthReport={healthReport} />
    </>
  )
}
