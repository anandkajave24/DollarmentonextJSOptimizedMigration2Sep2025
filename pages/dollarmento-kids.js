import Head from 'next/head';
import DollarmentoKids from '@/pages/DollarmentoKids';

// SSG for SEO crawler accessibility - kids education content must be crawlable
export async function getStaticProps() {
  const kidsContent = {
    ageGroups: [
      {
        age: "Ages 5-8: Money Basics",
        content: "Introduce young children to money concepts through fun activities. Learn about coins, bills, counting money, and the difference between needs and wants.",
        lessons: ["What is Money?", "Counting Coins", "Needs vs Wants", "Saving in a Piggy Bank"],
        activities: ["Money recognition games", "Coin counting exercises", "Shopping pretend play", "Goal setting activities"]
      },
      {
        age: "Ages 9-12: Smart Spending",
        content: "Teach pre-teens about budgeting, saving goals, and smart spending decisions. Understand the value of money and how to make good choices.",
        lessons: ["Making a Budget", "Setting Savings Goals", "Comparison Shopping", "Earning Money"],
        activities: ["Budget planning worksheets", "Savings goal tracking", "Price comparison games", "Allowance management"]
      },
      {
        age: "Ages 13-17: Financial Future",
        content: "Prepare teenagers for financial independence with banking, investing basics, credit understanding, and career planning.",
        lessons: ["Banking Basics", "Introduction to Investing", "Understanding Credit", "Career and Money"],
        activities: ["Open first bank account", "Investment simulations", "Credit score education", "College financial planning"]
      }
    ],
    resources: [
      "Interactive Money Games and Activities",
      "Age-Appropriate Financial Worksheets",
      "Family Money Discussion Guides",
      "Educational Videos and Stories"
    ],
    parentTips: [
      "Start money conversations early and make them regular",
      "Use real-life situations as teaching opportunities", 
      "Encourage saving with visual goals and rewards",
      "Model good financial behavior consistently"
    ],
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { kidsContent },
    revalidate: 86400, // Update daily
  };
}

export default function Page({ kidsContent }) {
  return (
    <>
      <Head>
        <title>DollarMento Kids - Financial Education for Children | DollarMento</title>
        <meta name="description" content="Fun and interactive financial education for kids. Learn money management, saving, budgeting, and financial literacy through engaging activities and videos." />
        <meta property="og:title" content="DollarMento Kids - Financial Education for Children" />
        <meta property="og:description" content="Interactive financial learning platform designed specifically for children" />
        <meta name="keywords" content="kids financial education, children money management, financial literacy for kids, teaching kids about money" />
        <link rel="canonical" href="https://dollarmento.com/dollarmento-kids/" />
      </Head>
      <DollarmentoKids kidsContent={kidsContent} />
    </>
  )
}
