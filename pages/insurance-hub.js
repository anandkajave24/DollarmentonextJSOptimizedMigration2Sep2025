import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive insurance tools
export async function getStaticProps() {
  const insuranceHubContent = {
    title: "Insurance Hub - Complete Insurance Planning & Protection Center",
    description: "Comprehensive insurance planning hub with calculators, guides, and tools for life, health, auto, home, and disability insurance. Make informed insurance decisions with expert analysis and comparison tools.",
    
    educationalContent: {
      overview: "Insurance is a crucial component of financial planning that protects against unexpected losses and provides financial security for you and your family. A comprehensive insurance strategy balances adequate protection with cost efficiency, ensuring you're covered for major risks without over-insuring.",
      
      insuranceTypes: [
        {
          type: "Life Insurance",
          description: "Financial protection for beneficiaries in the event of the policyholder's death",
          categories: [
            {
              category: "Term Life Insurance",
              description: "Temporary coverage for a specific period with lower premiums",
              benefits: ["Lower initial cost", "High coverage amounts", "Simple structure", "Convertible options"],
              considerations: ["Temporary coverage", "Premiums increase with age", "No cash value", "Coverage ends at term expiration"],
              bestFor: ["Young families with mortgages", "High coverage needs on budget", "Temporary obligations", "Business protection needs"]
            },
            {
              category: "Whole Life Insurance",
              description: "Permanent coverage with cash value accumulation and guaranteed premiums",
              benefits: ["Permanent coverage", "Cash value growth", "Fixed premiums", "Dividend potential"],
              considerations: ["Higher initial cost", "Complex structure", "Lower returns vs investments", "Surrender charges"],
              bestFor: ["Estate planning needs", "Permanent coverage requirements", "Conservative investors", "Tax planning strategies"]
            }
          ],
          calculationFactors: ["Income replacement needs", "Debt obligations", "Future expenses", "Existing coverage", "Family circumstances"]
        },
        {
          type: "Health Insurance",
          description: "Coverage for medical expenses including doctor visits, hospital stays, and prescription drugs",
          keyComponents: [
            {
              component: "Deductibles",
              description: "Amount you pay before insurance coverage begins",
              strategy: "Balance premium savings with out-of-pocket risk tolerance"
            },
            {
              component: "Copayments",
              description: "Fixed amounts paid for specific services",
              strategy: "Consider frequency of doctor visits and prescription needs"
            },
            {
              component: "Out-of-Pocket Maximum",
              description: "Maximum annual amount you'll pay for covered services",
              strategy: "Ensure maximum is manageable within your emergency fund capacity"
            }
          ],
          planningTips: ["Compare total annual costs including premiums", "Consider Health Savings Account eligibility", "Review provider networks for preferred doctors", "Evaluate prescription drug coverage"]
        },
        {
          type: "Disability Insurance",
          description: "Income replacement if you become unable to work due to illness or injury",
          coverage: [
            {
              type: "Short-Term Disability",
              duration: "3-12 months typically",
              coverage: "60-70% of income",
              source: "Often employer-provided or state programs"
            },
            {
              type: "Long-Term Disability",
              duration: "Until retirement age or recovery",
              coverage: "60-70% of income",
              source: "Individual policies or employer supplemental coverage"
            }
          ],
          importance: "More likely to experience disability than death during working years, making this often overlooked protection crucial"
        },
        {
          type: "Property Insurance",
          description: "Protection for physical assets including homes, vehicles, and personal property",
          categories: [
            {
              property: "Homeowners/Renters Insurance",
              coverage: ["Dwelling protection", "Personal property", "Liability coverage", "Additional living expenses"],
              optimization: ["Review coverage limits annually", "Document valuable items", "Consider umbrella coverage", "Understand replacement cost vs actual cash value"]
            },
            {
              property: "Auto Insurance",
              coverage: ["Liability coverage", "Collision and comprehensive", "Uninsured motorist", "Medical payments"],
              optimization: ["Maintain adequate liability limits", "Consider deductible levels", "Review coverage annually", "Take advantage of discounts"]
            }
          ]
        }
      ],
      
      insurancePlanning: [
        {
          step: "Risk Assessment",
          description: "Identify and evaluate potential financial risks and their impact",
          activities: ["Calculate income replacement needs", "Assess asset protection requirements", "Evaluate liability exposure", "Consider life stage changes"],
          outcome: "Clear understanding of insurance needs and priorities"
        },
        {
          step: "Coverage Analysis",
          description: "Review existing insurance coverage and identify gaps",
          activities: ["Inventory current policies", "Assess coverage adequacy", "Identify overlapping coverage", "Calculate total protection costs"],
          outcome: "Comprehensive view of current insurance position"
        },
        {
          step: "Strategy Development",
          description: "Create optimal insurance strategy balancing protection and cost",
          activities: ["Prioritize coverage needs", "Compare insurance options", "Optimize deductibles and limits", "Plan implementation timeline"],
          outcome: "Cost-effective insurance strategy aligned with financial goals"
        },
        {
          step: "Implementation and Review",
          description: "Execute insurance plan and establish regular review process",
          activities: ["Purchase required coverage", "Coordinate beneficiaries", "Set up premium payments", "Schedule annual reviews"],
          outcome: "Active insurance protection with ongoing optimization"
        }
      ],
      
      costOptimization: [
        "Bundle policies with same insurer for multi-policy discounts",
        "Increase deductibles to lower premiums while maintaining emergency fund coverage",
        "Maintain good credit score as insurers often use credit-based pricing",
        "Take advantage of safety and risk reduction discounts (security systems, safe driving)",
        "Review coverage annually and adjust for life changes (marriage, children, home purchase)",
        "Consider group coverage through employers or professional associations",
        "Shop multiple insurers every 2-3 years to ensure competitive pricing",
        "Avoid over-insuring with unnecessary coverage or excessive limits",
        "Use Health Savings Accounts to pay for medical expenses tax-free",
        "Consider umbrella policies for cost-effective additional liability coverage"
      ],
      
      commonMistakes: [
        {
          mistake: "Under-insuring to save money",
          consequence: "Inadequate protection leaves you vulnerable to financial catastrophe",
          solution: "Focus on high-impact, low-probability risks first, then optimize costs through deductibles and comparison shopping"
        },
        {
          mistake: "Over-insuring with excessive coverage",
          consequence: "Unnecessary premium costs reduce available funds for other financial goals",
          solution: "Regularly review coverage needs and adjust limits based on actual financial exposure"
        },
        {
          mistake: "Forgetting to update beneficiaries",
          consequence: "Insurance payouts may go to unintended recipients",
          solution: "Review and update beneficiaries after major life events (marriage, divorce, children, deaths)"
        },
        {
          mistake: "Choosing insurance based solely on price",
          consequence: "Poor claims service or coverage gaps when you need protection most",
          solution: "Research insurer financial strength and claims satisfaction ratings alongside price comparisons"
        }
      ]
    },
    
    toolFeatures: [
      "Comprehensive insurance needs calculator for all coverage types",
      "Life insurance comparison tool with term vs permanent analysis",
      "Health insurance plan comparison with total cost calculations",
      "Disability insurance needs assessment with income replacement analysis",
      "Property insurance coverage optimization with deductible analysis",
      "Insurance cost comparison across multiple providers",
      "Coverage gap analysis with personalized recommendations",
      "Insurance portfolio dashboard with annual review scheduling"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { insuranceHubContent },
    revalidate: 43200, // Update twice daily
  };
}

// CSR for interactive insurance planning functionality
const InsuranceHubV2 = dynamic(() => import('@/pages/InsuranceHubV2'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading insurance hub...</p>
      </div>
    </div>
  )
});

export default function Page({ insuranceHubContent }) {
  return (
    <>
      <Head>
        <title>Insurance Hub - Complete Insurance Planning & Protection Center | DollarMento</title>
        <meta name="description" content="Comprehensive insurance planning hub with calculators, guides, and tools for life, health, auto, home, and disability insurance. Make informed insurance decisions with expert analysis and comparison tools." />
        <meta property="og:title" content="Insurance Hub - Complete Insurance Planning Center" />
        <meta property="og:description" content="Comprehensive insurance planning with calculators and expert guidance" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/insurance-hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Insurance Planning Hub" />
        <meta name="twitter:description" content="Complete insurance planning with calculators, guides, and comparison tools" />
        <meta name="keywords" content="insurance planning, life insurance calculator, health insurance, disability insurance, property insurance, insurance comparison, insurance hub" />
        <link rel="canonical" href="https://dollarmento.com/insurance-hub" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Insurance Planning Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete insurance planning center with calculators, guides, and tools for all your 
              protection needs. Make informed decisions and optimize your coverage strategy.
            </p>
          </div>

          {/* Interactive Insurance Hub */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <InsuranceHubV2 insuranceHubContent={insuranceHubContent} />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Insurance Planning Guide</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {insuranceHubContent.educationalContent.overview}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Essential Insurance Types</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Understanding different insurance types helps you build comprehensive 
                    protection that addresses all major financial risks.
                  </p>

                  <div className="space-y-8">
                    {insuranceHubContent.educationalContent.insuranceTypes.map((insurance, index) => (
                      <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-blue-800 mb-3">{insurance.type}</h4>
                        <p className="text-blue-700 mb-4">{insurance.description}</p>
                        
                        {insurance.categories && (
                          <div className="space-y-4 mb-4">
                            <h5 className="font-semibold text-blue-800">Coverage Options:</h5>
                            {insurance.categories.map((category, catIndex) => (
                              <div key={catIndex} className="bg-blue-100 p-4 rounded-lg">
                                <h6 className="font-bold text-blue-800 mb-2">{category.category}</h6>
                                <p className="text-blue-700 text-sm mb-3">{category.description}</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                                  <div>
                                    <h7 className="font-semibold text-blue-800">Benefits:</h7>
                                    <ul className="text-blue-700 space-y-1">
                                      {category.benefits.map((benefit, benIndex) => (
                                        <li key={benIndex}>• {benefit}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h7 className="font-semibold text-blue-800">Considerations:</h7>
                                    <ul className="text-blue-700 space-y-1">
                                      {category.considerations.map((consideration, consIndex) => (
                                        <li key={consIndex}>• {consideration}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h7 className="font-semibold text-blue-800">Best For:</h7>
                                    <ul className="text-blue-700 space-y-1">
                                      {category.bestFor.map((fit, fitIndex) => (
                                        <li key={fitIndex}>• {fit}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {insurance.calculationFactors && (
                          <div className="text-sm">
                            <h5 className="font-semibold text-blue-800 mb-2">Key Calculation Factors:</h5>
                            <ul className="text-blue-700 space-y-1">
                              {insurance.calculationFactors.map((factor, factorIndex) => (
                                <li key={factorIndex}>• {factor}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Insurance Planning Process</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Systematic insurance planning ensures comprehensive protection 
                    while optimizing costs and avoiding coverage gaps.
                  </p>

                  <div className="space-y-6 mb-8">
                    {insuranceHubContent.educationalContent.insurancePlanning.map((step, index) => (
                      <div key={index} className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                        <h4 className="font-bold text-indigo-800 mb-2">Step {index + 1}: {step.step}</h4>
                        <p className="text-indigo-700 text-sm mb-3">{step.description}</p>
                        <p className="text-indigo-600 text-sm mb-3"><strong>Expected Outcome:</strong> {step.outcome}</p>
                        
                        <div className="text-xs text-indigo-600">
                          <h5 className="font-semibold mb-1">Key Activities:</h5>
                          <ul className="space-y-1">
                            {step.activities.map((activity, actIndex) => (
                              <li key={actIndex}>• {activity}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cost Optimization Strategies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Smart insurance strategies reduce costs while maintaining 
                    adequate protection for all major financial risks.
                  </p>

                  <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                    {insuranceHubContent.educationalContent.costOptimization.map((strategy, index) => (
                      <li key={index}>{strategy}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Common Mistakes to Avoid</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Avoid these frequent insurance planning mistakes to ensure 
                    your protection strategy is both effective and efficient.
                  </p>

                  <div className="space-y-4 mb-8">
                    {insuranceHubContent.educationalContent.commonMistakes.map((mistake, index) => (
                      <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h4 className="font-bold text-red-800 mb-2">{mistake.mistake}</h4>
                        <div className="text-sm text-red-700 space-y-2">
                          <p><strong>Consequence:</strong> {mistake.consequence}</p>
                          <p><strong>Solution:</strong> {mistake.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Planning Hub Features</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our comprehensive insurance hub provides all the tools 
                    you need for informed insurance decisions and optimal protection strategies.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {insuranceHubContent.toolFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Insurance Priorities</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Health Insurance</span>
                    <span className="font-semibold">Essential</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Life Insurance</span>
                    <span className="font-semibold">High</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Disability</span>
                    <span className="font-semibold">Important</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property</span>
                    <span className="font-semibold">Required</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Protection First</h3>
                <p className="text-sm mb-4">
                  Comprehensive insurance planning protects your financial future and family security.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Complete</div>
                  <div className="text-sm opacity-90">Coverage analysis</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Insurance Calculators</h3>
                <div className="space-y-3">
                  <a href="/life-insurance-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Life Insurance
                  </a>
                  <a href="/term-insurance-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Term Insurance
                  </a>
                  <a href="/health-insurance-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Health Insurance
                  </a>
                  <a href="/disability-insurance-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Disability Insurance
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
