import Head from 'next/head';
import Learning from '../client/src/pages/Learning';

// SSG with ISR for SEO crawler accessibility - learning content must be crawlable
export async function getStaticProps() {
  const learningContent = {
    courses: [
      {
        level: "Beginner",
        title: "Personal Finance Foundations",
        content: "Start your financial journey with essential money management skills. Learn budgeting, saving, debt management, and financial goal setting.",
        modules: ["Budget Creation", "Emergency Fund Building", "Debt Management", "Financial Goal Setting", "Banking Basics"],
        duration: "4 weeks",
        skills: ["Create effective budgets", "Build emergency savings", "Eliminate debt systematically", "Set SMART financial goals"]
      },
      {
        level: "Intermediate", 
        title: "Investment & Wealth Building",
        content: "Advance your financial knowledge with investment strategies, retirement planning, and wealth building techniques.",
        modules: ["Stock Market Basics", "Portfolio Diversification", "401k Optimization", "Tax-Advantaged Accounts", "Risk Management"],
        duration: "6 weeks", 
        skills: ["Understand investment fundamentals", "Build diversified portfolios", "Maximize retirement savings", "Manage investment risk"]
      },
      {
        level: "Advanced",
        title: "Financial Independence & Retirement",
        content: "Master advanced financial strategies for achieving financial independence and retirement readiness.",
        modules: ["FIRE Strategies", "Advanced Tax Planning", "Estate Planning", "Alternative Investments", "Retirement Income Planning"], 
        duration: "8 weeks",
        skills: ["Plan for financial independence", "Optimize tax strategies", "Plan estate transfers", "Generate retirement income"]
      }
    ],
    features: [
      "Interactive video lessons with real-world examples",
      "Practical worksheets and calculators for hands-on learning",
      "Progress tracking and achievement badges",
      "Community discussions and expert Q&A sessions"
    ],
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { learningContent },
    revalidate: 172800, // Update every 48 hours to reduce spikes
  };
}

export default function Page({ learningContent }) {
  return (
    <>
      <Head>
        <title>Financial Learning Hub - Complete Education Platform | DollarMento</title>
        <meta name="description" content="Comprehensive financial education with interactive videos, courses, and learning materials. Master personal finance through engaging content from beginner to advanced levels." />
        <meta property="og:title" content="Financial Learning Hub - DollarMento" />
        <meta property="og:description" content="Interactive financial education with video content and learning tools" />
        <meta name="keywords" content="financial education, learning, personal finance, money management, financial literacy, investment education, retirement planning" />
        <link rel="canonical" href="https://dollarmento.com/learning/" />
      </Head>
      <Learning />
    </>
  )
}
