import Head from 'next/head';
import dynamic from 'next/dynamic';

const Term_insuranceCalculator = dynamic(() => import('@/pages/TermInsuranceCalculator'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page() {
  return (
    <>
      <Head>
        <title>DollarMento - Term_insuranceCalculator</title>
        <meta name="description" content="Financial tools and calculators" />
      </Head>
      <Term_insuranceCalculator />
    </>
  )
}
