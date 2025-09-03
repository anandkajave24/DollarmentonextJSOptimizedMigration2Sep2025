import Head from 'next/head';
import InsuranceGuide from '@/pages/InsuranceGuide';

// SSG for SEO crawler accessibility - insurance content must be crawlable
export async function getStaticProps() {
  const insuranceContent = {
    types: [
      {
        type: "Life Insurance",
        content: "Life insurance provides financial protection for your family in case of death. Choose between term life and permanent life insurance based on your needs, budget, and financial goals.",
        coverage: ["Term Life Insurance", "Whole Life Insurance", "Universal Life Insurance", "Variable Life Insurance"],
        benefits: ["Income replacement for family", "Debt payment coverage", "Estate planning tool", "Tax advantages"]
      },
      {
        type: "Health Insurance", 
        content: "Health insurance covers medical expenses including doctor visits, hospital stays, prescription drugs, and preventive care. Understand deductibles, copayments, and network coverage.",
        coverage: ["Medical Expenses", "Prescription Drugs", "Preventive Care", "Emergency Services"],
        benefits: ["Protection from high medical costs", "Access to healthcare network", "Preventive care coverage", "Financial peace of mind"]
      },
      {
        type: "Auto Insurance",
        content: "Auto insurance protects against financial loss from car accidents, theft, and damage. Required by law in most states with liability, collision, and comprehensive coverage options.",
        coverage: ["Liability Coverage", "Collision Coverage", "Comprehensive Coverage", "Uninsured Motorist"],
        benefits: ["Legal compliance", "Accident protection", "Vehicle damage coverage", "Medical expense coverage"]
      },
      {
        type: "Home Insurance",
        content: "Home insurance protects your home and belongings from damage, theft, and liability claims. Covers dwelling, personal property, and additional living expenses during repairs.",
        coverage: ["Dwelling Protection", "Personal Property", "Liability Coverage", "Additional Living Expenses"],
        benefits: ["Home structure protection", "Personal belongings coverage", "Liability protection", "Temporary housing costs"]
      }
    ],
    planning: [
      "Assess insurance needs based on life stage",
      "Compare coverage options and costs",
      "Review and update policies annually", 
      "Understand policy terms and exclusions",
      "Bundle policies for potential discounts"
    ],
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { insuranceContent },
    revalidate: 86400, // Update daily
  };
}

export default function Page({ insuranceContent }) {
  return (
    <>
      <Head>
        <title>Insurance Guide - Life, Health, Auto & Home Insurance | DollarMento</title>
        <meta name="description" content="Complete insurance guide covering life insurance, health insurance, auto insurance, home insurance, and insurance planning strategies. Compare policies and find the best coverage." />
        <meta property="og:title" content="Insurance Guide - Complete Coverage Planning" />
        <meta property="og:description" content="Comprehensive insurance education and planning resources" />
        <meta name="keywords" content="insurance guide, life insurance, health insurance, auto insurance, home insurance, insurance planning" />
        <link rel="canonical" href="https://dollarmento.com/insurance-guide/" />
      </Head>
      <InsuranceGuide insuranceContent={insuranceContent} />
    </>
  )
}
