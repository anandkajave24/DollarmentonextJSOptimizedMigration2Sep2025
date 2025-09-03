import Head from 'next/head';
import dynamic from 'next/dynamic';

const Personal_loanCalculator = dynamic(() => import('@/pages/PersonalLoanCalculator'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page() {
  return (
    <>
      <Head>
        <title>DollarMento - Personal_loanCalculator</title>
        <meta name="description" content="Financial tools and calculators" />
      </Head>
      <Personal_loanCalculator />
    </>
  )
}
