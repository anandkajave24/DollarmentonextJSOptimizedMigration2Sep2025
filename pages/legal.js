import Head from 'next/head';
import dynamic from 'next/dynamic';

const Legal = dynamic(() => import('@/pages/Legal'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page() {
  return (
    <>
      <Head>
        <title>DollarMento - Legal</title>
        <meta name="description" content="Financial tools and calculators" />
      </Head>
      <Legal />
    </>
  )
}
