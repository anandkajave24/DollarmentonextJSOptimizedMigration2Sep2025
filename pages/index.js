import Head from 'next/head';
import Landing from '../client/src/pages/Landing';

// Homepage with optimized SSG
export async function getStaticProps() {
  return {
    props: {
      seoData: {
        title: "DollarMento - Complete Financial Planning & Calculator Platform USA",
        description: "America's most comprehensive financial platform: 45+ calculators, retirement planning, tax optimization, investment tools, budget planners & financial education for achieving financial freedom."
      }
    },
    revalidate: 259200 // Update every 3 days to reduce regeneration load
  };
}

export default function Home({ seoData = {} }) {
  const title = seoData.title || "DollarMento - Complete Financial Planning & Calculator Platform USA";
  const description = seoData.description || "America's most comprehensive financial platform: 45+ calculators, retirement planning, tax optimization, investment tools, budget planners & financial education for achieving financial freedom.";
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://dollarmento.com/" />
      </Head>
      <Landing />
    </>
  )
}