import Head from 'next/head';
import dynamic from 'next/dynamic';

// Pure CSR for calculator interactivity and cost optimization
const CompoundInterestCalculator = dynamic(() => import('@/pages/CompoundInterestCalculator'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading compound interest calculator...</p>
      </div>
    </div>
  )
});

export default function Page() {
  return (
    <>
      <Head>
        <title>Compound Interest Calculator - Investment Growth Calculator | DollarMento</title>
        <meta name="description" content="Free compound interest calculator to calculate investment growth over time. See how your money grows with compound interest, regular contributions, and different interest rates." />
        <meta property="og:title" content="Compound Interest Calculator - Investment Growth Tool" />
        <meta property="og:description" content="Calculate compound interest and investment growth over time" />
        <meta name="keywords" content="compound interest calculator, investment calculator, savings growth calculator, compound interest formula" />
        <link rel="canonical" href="https://dollarmento.com/compound-interest-calculator/" />
      </Head>
      <CompoundInterestCalculator />
    </>
  )
}
