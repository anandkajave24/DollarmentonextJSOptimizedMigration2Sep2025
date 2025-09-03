import Head from 'next/head';
import Goals from '@/pages/Goals';

// Use SSR to avoid potential React hook issues during build time
export async function getServerSideProps() {
  const goalInsights = {
    lastUpdated: new Date().toISOString(),
    recommendedGoals: [
      "Build 6-month emergency fund",
      "Increase 401k contribution to 15%",
      "Pay off high-interest debt"
    ],
    progressTracking: {
      emergencyFund: "60% complete",
      retirement: "On track",
      debtPayoff: "Ahead of schedule"
    }
  };

  return {
    props: { goalInsights },
    revalidate: 21600, // 6 hours
  };
}

export default function Page({ goalInsights }) {
  return (
    <>
      <Head>
        <title>Financial Goals Tracker - Set & Achieve Money Goals | DollarMento</title>
        <meta name="description" content="Track and achieve your financial goals with personalized insights. Set savings goals, debt payoff targets, investment objectives, and monitor your progress." />
        <meta property="og:title" content="Financial Goals Tracker - DollarMento" />
        <meta property="og:description" content="Set, track, and achieve your financial goals with personalized insights" />
        <meta name="keywords" content="financial goals, goal tracker, savings goals, financial planning, money goals" />
        <link rel="canonical" href="https://dollarmento.com/goals/" />
      </Head>
      <Goals goalInsights={goalInsights} />
    </>
  )
}
