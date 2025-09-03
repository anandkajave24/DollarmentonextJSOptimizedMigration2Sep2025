import Head from 'next/head';
import dynamic from 'next/dynamic';

const CMSAdmin = dynamic(() => import('../../client/src/pages/CMSAdmin'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page() {
  return (
    <>
      <Head>
        <title>DollarMento - CMSAdmin</title>
        <meta name="description" content="Financial tools and calculators" />
      </Head>
      <CMSAdmin />
    </>
  )
}
