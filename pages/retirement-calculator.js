import Head from 'next/head';
import dynamic from 'next/dynamic';

// Pure CSR for calculator interactivity and cost optimization
const RetirementCalculator = dynamic(() => import('@/pages/RetirementCalculator'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading retirement calculator...</p>
      </div>
    </div>
  )
});

export default function Page() {
  return (
    <>
      <Head>
        <title>Retirement Calculator - Plan Your Retirement Savings | DollarMento</title>
        <meta name="description" content="Free retirement calculator to plan your financial future. Calculate how much you need to save for retirement with different scenarios and investment returns." />
        <meta property="og:title" content="Retirement Calculator - Free Retirement Planning Tool" />
        <meta property="og:description" content="Calculate retirement savings needs and plan your financial future" />
        <meta name="keywords" content="retirement calculator, retirement planning, retirement savings calculator, how much to save for retirement" />
        <link rel="canonical" href="https://dollarmento.com/retirement-calculator/" />
      </Head>
      <RetirementCalculator />
    </>
  )
}
