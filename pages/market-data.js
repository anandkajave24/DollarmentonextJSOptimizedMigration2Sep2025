import Head from 'next/head';
import dynamic from 'next/dynamic';

// CSR for real-time market data with client-side API calls
const MarketData = dynamic(() => import('@/pages/MarketData'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading live market data...</p>
      </div>
    </div>
  )
});

export default function Page() {
  return (
    <>
      <Head>
        <title>Live Market Data - Real-Time Stock Prices & Market Updates | DollarMento</title>
        <meta name="description" content="Live market data with real-time stock prices, market indices, cryptocurrency prices, and financial market updates. Track your portfolio and market trends." />
        <meta property="og:title" content="Live Market Data - Real-Time Stock Prices" />
        <meta property="og:description" content="Real-time market data, stock prices, and financial market updates" />
        <meta name="keywords" content="live market data, real-time stock prices, market updates, financial data, stock market" />
        <link rel="canonical" href="https://dollarmento.com/market-data/" />
      </Head>
      <MarketData />
    </>
  )
}
