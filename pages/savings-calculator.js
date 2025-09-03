import Head from 'next/head';
import dynamic from 'next/dynamic';

// Pure CSR for calculator interactivity and cost optimization
const SavingsCalculator = dynamic(() => import('@/pages/SavingsCalculator'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading savings calculator...</p>
      </div>
    </div>
  )
});

export default function Page() {
  return (
    <>
      <Head>
        <title>Savings Calculator - Calculate Savings Growth | DollarMento</title>
        <meta name="description" content="Free savings calculator to track your savings growth over time. Calculate how your savings will grow with regular deposits and interest rates." />
        <meta property="og:title" content="Savings Calculator - Track Your Savings Growth" />
        <meta property="og:description" content="Calculate savings growth with regular deposits and interest" />
        <meta name="keywords" content="savings calculator, savings growth calculator, savings account calculator, savings interest calculator" />
        <link rel="canonical" href="https://dollarmento.com/savings-calculator/" />
      </Head>
      <SavingsCalculator />
    </>
  )
}
