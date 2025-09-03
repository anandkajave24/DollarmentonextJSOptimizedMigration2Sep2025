import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive data deletion tools
export async function getStaticProps() {
  const dataDeletionContent = {
    title: "Data Deletion & Privacy Controls - Manage Your Digital Financial Footprint",
    description: "Comprehensive data deletion and privacy control center with tools for managing your digital financial information, understanding data rights, and maintaining privacy security across financial platforms and services.",
    
    educationalContent: {
      overview: "In today's digital financial landscape, understanding and managing your data privacy is crucial for protecting your financial information and maintaining control over your digital footprint. Comprehensive data deletion and privacy controls ensure you can manage how your financial information is stored, used, and shared across various platforms and services.",
      
      dataPrivacyFundamentals: [
        {
          concept: "Personal Financial Data Types",
          description: "Understanding the different categories of financial data and their privacy implications",
          dataTypes: [
            {
              type: "Identity Information",
              examples: ["Name, address, phone number", "Social Security number", "Date of birth", "Employment information"],
              riskLevel: "High",
              protectionMethods: ["Limit sharing to essential services", "Verify recipient legitimacy", "Use secure transmission methods", "Monitor for unauthorized use"]
            },
            {
              type: "Financial Account Data",
              examples: ["Bank account numbers", "Credit card information", "Investment account details", "Loan information"],
              riskLevel: "Critical",
              protectionMethods: ["Never share via email or unsecured channels", "Use bank-provided secure portals", "Enable multi-factor authentication", "Monitor accounts regularly"]
            },
            {
              type: "Transaction History",
              examples: ["Purchase records", "Payment history", "Transfer details", "Investment transactions"],
              riskLevel: "Medium-High",
              protectionMethods: ["Review sharing permissions", "Use privacy-focused payment methods", "Limit transaction data retention", "Regularly audit access permissions"]
            },
            {
              type: "Behavioral and Preference Data",
              examples: ["Spending patterns", "Financial goals", "Risk preferences", "Service usage patterns"],
              riskLevel: "Medium",
              protectionMethods: ["Opt out of behavioral tracking", "Use privacy-focused browsers", "Limit third-party integrations", "Review and adjust privacy settings"]
            }
          ]
        },
        {
          concept: "Data Rights and Regulations",
          description: "Understanding your legal rights regarding personal financial data",
          regulations: [
            {
              regulation: "CCPA (California Consumer Privacy Act)",
              scope: "California residents",
              rights: ["Right to know what data is collected", "Right to delete personal information", "Right to opt-out of data sales", "Right to non-discrimination"],
              application: "Applies to financial services operating in California or serving California residents"
            },
            {
              regulation: "GDPR (General Data Protection Regulation)",
              scope: "EU residents and EU-operating companies",
              rights: ["Right to access personal data", "Right to rectification", "Right to erasure (right to be forgotten)", "Right to data portability"],
              application: "Affects global financial companies that serve EU customers"
            },
            {
              regulation: "GLBA (Gramm-Leach-Bliley Act)",
              scope: "US financial institutions",
              rights: ["Right to privacy notices", "Right to opt-out of information sharing", "Right to access financial records"],
              application: "Governs how US financial institutions handle customer information"
            }
          ]
        }
      ],
      
      dataDeletionProcess: [
        {
          step: "Data Inventory and Assessment",
          description: "Identify all financial platforms and services that have your personal data",
          activities: [
            "List all financial accounts and services used",
            "Review data sharing agreements and permissions",
            "Identify third-party integrations and connections",
            "Assess data sensitivity and deletion priority",
            "Document account access credentials and contact information"
          ],
          timeframe: "1-2 hours for comprehensive inventory",
          tools: ["Password managers for account inventory", "Email search for service confirmations", "Bank and credit card statements for service identification"]
        },
        {
          step: "Rights Assessment and Planning",
          description: "Understand your data rights and plan deletion strategy",
          activities: [
            "Review applicable privacy regulations and rights",
            "Identify services that must retain data for legal reasons",
            "Plan deletion timeline and priority order",
            "Prepare necessary documentation and verification",
            "Identify data that should be backed up before deletion"
          ],
          timeframe: "1 hour for rights research and planning",
          tools: ["Privacy policy reviews", "Legal rights databases", "Service terms and conditions"]
        },
        {
          step: "Systematic Data Deletion Execution",
          description: "Execute data deletion requests across identified platforms",
          activities: [
            "Submit formal deletion requests through proper channels",
            "Follow up on deletion request status",
            "Verify data removal completion",
            "Document deletion confirmations",
            "Close unnecessary accounts completely"
          ],
          timeframe: "2-4 weeks for complete processing",
          tools: ["Deletion request templates", "Tracking spreadsheets", "Email confirmation filing"]
        },
        {
          step: "Ongoing Privacy Maintenance",
          description: "Establish ongoing practices for data privacy protection",
          activities: [
            "Implement regular privacy audits",
            "Review and update privacy settings quarterly",
            "Monitor for unauthorized data collection",
            "Maintain minimal necessary data sharing",
            "Stay informed about privacy regulation changes"
          ],
          timeframe: "Ongoing with quarterly reviews",
          tools: ["Privacy monitoring services", "Regular audit checklists", "Privacy-focused browsers and tools"]
        }
      ],
      
      platformSpecificGuidance: [
        {
          platform: "Banking and Financial Institutions",
          deletionApproach: "Limited deletion due to regulatory requirements",
          possibleActions: [
            "Request deletion of marketing and behavioral data",
            "Opt out of data sharing with third parties",
            "Close unused accounts after required retention periods",
            "Limit data collection permissions"
          ],
          considerations: ["Legal retention requirements", "Account closure procedures", "Credit reporting implications", "Tax record needs"]
        },
        {
          platform: "Investment and Brokerage Platforms",
          deletionApproach: "Partial deletion with regulatory compliance",
          possibleActions: [
            "Delete non-essential personal preferences",
            "Remove unnecessary linked accounts",
            "Opt out of marketing communications",
            "Limit research and behavioral tracking"
          ],
          considerations: ["SEC reporting requirements", "Tax documentation needs", "Portfolio history importance", "Beneficiary information"]
        },
        {
          platform: "Financial Planning and Budgeting Apps",
          deletionApproach: "Comprehensive deletion often possible",
          possibleActions: [
            "Delete all personal financial data",
            "Remove account connections and integrations",
            "Clear stored preferences and goals",
            "Request complete account deletion"
          ],
          considerations: ["Data backup needs", "Integration disconnection", "Subscription cancellations", "Export useful data first"]
        },
        {
          platform: "Credit Monitoring and Reporting Services",
          deletionApproach: "Limited deletion due to credit reporting functions",
          possibleActions: [
            "Cancel monitoring services",
            "Remove marketing permissions",
            "Limit data sharing authorizations",
            "Delete non-essential profile information"
          ],
          considerations: ["Credit monitoring benefits", "Fraud protection services", "Credit report access", "Identity theft monitoring"]
        }
      ],
      
      privacyBestPractices: [
        "Use privacy-focused browsers and search engines for financial research",
        "Enable two-factor authentication on all financial accounts",
        "Regularly review and update privacy settings on all platforms",
        "Limit third-party app connections to essential services only",
        "Use separate email addresses for financial services when possible",
        "Monitor credit reports and financial accounts for unauthorized access",
        "Keep software and security systems updated on all devices",
        "Use encrypted storage for sensitive financial documents",
        "Avoid public Wi-Fi for financial transactions and account access",
        "Regularly audit and clean up digital financial footprint"
      ],
      
      emergencyDataProtection: [
        {
          scenario: "Data Breach Response",
          immediateActions: ["Change all financial account passwords", "Enable fraud alerts on accounts", "Monitor accounts for unauthorized activity", "Contact affected institutions directly"],
          followUpActions: ["Request new account numbers if necessary", "File fraud reports with relevant authorities", "Monitor credit reports closely", "Consider credit freezes if appropriate"]
        },
        {
          scenario: "Identity Theft",
          immediateActions: ["Contact all financial institutions", "Place fraud alerts on credit reports", "File police report and FTC complaint", "Document all fraudulent activity"],
          followUpActions: ["Work with institutions on account recovery", "Monitor for ongoing fraudulent activity", "Consider identity monitoring services", "Rebuild credit and account security"]
        },
        {
          scenario: "Account Compromise",
          immediateActions: ["Change passwords immediately", "Review recent account activity", "Contact customer service for affected accounts", "Secure any connected accounts"],
          followUpActions: ["Update security settings and permissions", "Review and revoke unnecessary access", "Monitor for continued suspicious activity", "Strengthen overall account security"]
        }
      ]
    },
    
    toolFeatures: [
      "Comprehensive data inventory tool for tracking financial service data holdings",
      "Automated deletion request generator with platform-specific templates",
      "Privacy rights assessment tool based on location and applicable regulations",
      "Data deletion progress tracker with status monitoring and follow-up reminders",
      "Privacy settings audit tool for reviewing and optimizing account permissions",
      "Emergency response protocol guide for data breaches and identity theft",
      "Privacy best practices checklist with implementation tracking",
      "Ongoing privacy maintenance scheduler with quarterly review reminders"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { dataDeletionContent },
    revalidate: 43200, // Update twice daily
  };
}

// CSR for interactive data deletion functionality
const DataDeletion = dynamic(() => import('@/pages/DataDeletion'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading data deletion tools...</p>
      </div>
    </div>
  )
});

export default function Page({ dataDeletionContent }) {
  return (
    <>
      <Head>
        <title>Data Deletion & Privacy Controls - Manage Your Digital Financial Footprint | DollarMento</title>
        <meta name="description" content="Comprehensive data deletion and privacy control center with tools for managing your digital financial information, understanding data rights, and maintaining privacy security across financial platforms." />
        <meta property="og:title" content="Data Deletion & Privacy Controls - Manage Digital Footprint" />
        <meta property="og:description" content="Comprehensive tools for managing financial data privacy and deletion rights" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/data-deletion" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Data Deletion & Privacy Controls" />
        <meta name="twitter:description" content="Manage your digital financial footprint with comprehensive privacy controls" />
        <meta name="keywords" content="data deletion, privacy controls, financial data privacy, GDPR rights, CCPA compliance, data protection, digital privacy, financial security" />
        <link rel="canonical" href="https://dollarmento.com/data-deletion" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Data Deletion & Privacy Controls
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take control of your digital financial footprint with comprehensive data deletion tools, 
              privacy rights guidance, and protection strategies for your financial information.
            </p>
          </div>

          {/* Interactive Data Deletion Tools */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <DataDeletion dataDeletionContent={dataDeletionContent} />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Data Privacy Guide</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {dataDeletionContent.educationalContent.overview}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Data Privacy Fundamentals</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Understanding the types of financial data you generate and your rights 
                    regarding that data is the foundation of effective privacy protection.
                  </p>

                  <div className="space-y-8">
                    {dataDeletionContent.educationalContent.dataPrivacyFundamentals.map((fundamental, index) => (
                      <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-red-800 mb-3">{fundamental.concept}</h4>
                        <p className="text-red-700 mb-4">{fundamental.description}</p>
                        
                        {fundamental.dataTypes && (
                          <div className="space-y-4">
                            {fundamental.dataTypes.map((dataType, typeIndex) => (
                              <div key={typeIndex} className="bg-red-100 p-4 rounded-lg">
                                <h5 className="font-bold text-red-800 mb-2">{dataType.type}</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-red-700 mb-2"><strong>Risk Level:</strong> {dataType.riskLevel}</p>
                                    <div className="text-xs text-red-600">
                                      <h6 className="font-semibold mb-1">Examples:</h6>
                                      <ul className="space-y-1">
                                        {dataType.examples.map((example, exIndex) => (
                                          <li key={exIndex}>• {example}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-red-600">
                                      <h6 className="font-semibold mb-1">Protection Methods:</h6>
                                      <ul className="space-y-1">
                                        {dataType.protectionMethods.map((method, methodIndex) => (
                                          <li key={methodIndex}>• {method}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {fundamental.regulations && (
                          <div className="space-y-4">
                            {fundamental.regulations.map((regulation, regIndex) => (
                              <div key={regIndex} className="bg-red-100 p-4 rounded-lg">
                                <h5 className="font-bold text-red-800 mb-2">{regulation.regulation}</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-red-700 mb-2"><strong>Scope:</strong> {regulation.scope}</p>
                                    <p className="text-red-700 text-xs">{regulation.application}</p>
                                  </div>
                                  <div>
                                    <div className="text-xs text-red-600">
                                      <h6 className="font-semibold mb-1">Your Rights:</h6>
                                      <ul className="space-y-1">
                                        {regulation.rights.map((right, rightIndex) => (
                                          <li key={rightIndex}>• {right}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Data Deletion Process</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Follow this systematic approach to effectively manage and delete 
                    your financial data across various platforms and services.
                  </p>

                  <div className="space-y-6 mb-8">
                    {dataDeletionContent.educationalContent.dataDeletionProcess.map((step, index) => (
                      <div key={index} className="bg-pink-50 border border-pink-200 rounded-lg p-6">
                        <h4 className="font-bold text-pink-800 mb-2">Step {index + 1}: {step.step}</h4>
                        <p className="text-pink-700 text-sm mb-3">{step.description}</p>
                        <p className="text-pink-600 text-sm mb-3"><strong>Time Required:</strong> {step.timeframe}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-pink-800 mb-2">Key Activities:</h5>
                            <ul className="text-pink-700 space-y-1">
                              {step.activities.map((activity, actIndex) => (
                                <li key={actIndex}>• {activity}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-pink-800 mb-2">Helpful Tools:</h5>
                            <ul className="text-pink-700 space-y-1">
                              {step.tools.map((tool, toolIndex) => (
                                <li key={toolIndex}>• {tool}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Platform-Specific Guidance</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different financial platforms have varying data deletion capabilities 
                    and requirements based on regulatory obligations and business needs.
                  </p>

                  <div className="space-y-6 mb-8">
                    {dataDeletionContent.educationalContent.platformSpecificGuidance.map((platform, index) => (
                      <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                        <h4 className="font-bold text-orange-800 mb-2">{platform.platform}</h4>
                        <p className="text-orange-700 text-sm mb-3"><strong>Deletion Approach:</strong> {platform.deletionApproach}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-orange-800 mb-2">Possible Actions:</h5>
                            <ul className="text-orange-700 space-y-1">
                              {platform.possibleActions.map((action, actionIndex) => (
                                <li key={actionIndex}>• {action}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-orange-800 mb-2">Important Considerations:</h5>
                            <ul className="text-orange-700 space-y-1">
                              {platform.considerations.map((consideration, consIndex) => (
                                <li key={consIndex}>• {consideration}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Privacy Best Practices</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Implement these ongoing practices to maintain strong financial 
                    data privacy and minimize your digital risk exposure.
                  </p>

                  <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                    {dataDeletionContent.educationalContent.privacyBestPractices.map((practice, index) => (
                      <li key={index}>{practice}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Emergency Data Protection</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Be prepared to respond quickly to data breaches, identity theft, 
                    and account compromises with these emergency protocols.
                  </p>

                  <div className="space-y-6 mb-8">
                    {dataDeletionContent.educationalContent.emergencyDataProtection.map((emergency, index) => (
                      <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h4 className="font-bold text-red-800 mb-3">{emergency.scenario}</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-red-800 mb-2">Immediate Actions:</h5>
                            <ul className="text-red-700 space-y-1">
                              {emergency.immediateActions.map((action, actionIndex) => (
                                <li key={actionIndex}>• {action}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-red-800 mb-2">Follow-up Actions:</h5>
                            <ul className="text-red-700 space-y-1">
                              {emergency.followUpActions.map((action, actionIndex) => (
                                <li key={actionIndex}>• {action}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Privacy Control Features</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our comprehensive privacy management platform provides all the tools 
                    you need to maintain control over your financial data.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {dataDeletionContent.toolFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Data Rights</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Access Rights</span>
                    <span className="font-semibold">Know</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Deletion Rights</span>
                    <span className="font-semibold">Remove</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Portability</span>
                    <span className="font-semibold">Export</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Opt-out</span>
                    <span className="font-semibold">Control</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Data Protection</h3>
                <p className="text-sm mb-4">
                  Take control of your financial data privacy with comprehensive deletion and protection tools.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Secure</div>
                  <div className="text-sm opacity-90">Data control</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Privacy Tools</h3>
                <div className="space-y-3">
                  <a href="/privacy-policy" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Privacy Policy
                  </a>
                  <a href="/terms-of-service" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Terms of Service
                  </a>
                  <a href="/security-center" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Security Center
                  </a>
                  <a href="/account-settings" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Account Settings
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
