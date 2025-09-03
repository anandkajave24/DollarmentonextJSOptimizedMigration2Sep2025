import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive terms tools
export async function getStaticProps() {
  const termsOfServiceContent = {
    title: "Terms of Service & Financial Platform Usage Guide - Understanding Your Rights & Responsibilities",
    description: "Comprehensive terms of service and financial platform usage guide explaining user rights, responsibilities, and best practices for safe and effective use of financial tools and services.",
    
    educationalContent: {
      overview: "Understanding terms of service for financial platforms is crucial for protecting your interests while maximizing the benefits of digital financial tools. Our comprehensive approach to service terms combines legal clarity with practical guidance, ensuring users understand both their rights and responsibilities in the digital financial ecosystem.",
      
      serviceAgreementFundamentals: [
        {
          concept: "Mutual Rights and Obligations",
          description: "Understanding the balanced relationship between platform providers and users",
          userRights: [
            "Access to promised features and functionality",
            "Data privacy and security protection",
            "Fair treatment and non-discrimination",
            "Timely customer support and issue resolution",
            "Transparent communication about service changes",
            "Right to terminate service and data portability"
          ],
          userResponsibilities: [
            "Provide accurate information for account setup",
            "Use services in accordance with intended purposes",
            "Maintain account security and confidentiality",
            "Comply with applicable laws and regulations",
            "Respect intellectual property and terms limitations",
            "Report security issues and service problems promptly"
          ],
          balancingPrinciples: ["Fair exchange of value", "Reasonable use expectations", "Shared security responsibility", "Transparent communication"]
        },
        {
          concept: "Service Scope and Limitations",
          description: "Clear understanding of what services provide and their intended boundaries",
          serviceInclusions: [
            "Financial calculators and planning tools",
            "Educational content and resources",
            "Data storage and retrieval services",
            "Customer support and assistance",
            "Regular updates and improvements",
            "Security monitoring and protection"
          ],
          serviceLimitations: [
            "Educational tools, not professional financial advice",
            "General information, not personalized recommendations",
            "Calculation aids, not guaranteed financial outcomes",
            "Platform access, not investment management",
            "Information resources, not regulatory compliance assurance",
            "Technology services, not fiduciary financial services"
          ],
          importantDisclaimer: "All financial tools and information are for educational and planning purposes only and should not replace professional financial, legal, or tax advice."
        },
        {
          concept: "Liability and Risk Allocation",
          description: "Fair distribution of risks and responsibilities between platform and users",
          platformLiabilities: [
            "Maintaining reasonable security measures",
            "Providing accurate tool functionality",
            "Protecting user data according to privacy policies",
            "Delivering promised service features",
            "Giving reasonable notice of significant changes",
            "Responding to reported issues in timely manner"
          ],
          userLiabilities: [
            "Consequences of inaccurate information provided",
            "Financial decisions made using platform tools",
            "Account security and password protection",
            "Compliance with applicable laws and regulations",
            "Appropriate use of tools within intended scope",
            "Understanding limitations of educational tools"
          ],
          sharedResponsibilities: ["Data accuracy", "Security vigilance", "Appropriate usage", "Clear communication"]
        }
      ],
      
      bestPracticesForUsers: [
        {
          category: "Safe and Effective Platform Usage",
          description: "Maximizing benefits while minimizing risks in digital financial tool usage",
          practices: [
            {
              practice: "Informed Consent and Understanding",
              implementation: ["Read and understand terms before accepting", "Ask questions about unclear provisions", "Keep records of accepted terms and changes", "Review terms periodically for updates"],
              benefits: ["Avoid unexpected limitations", "Understand your rights", "Make informed decisions", "Prevent service disputes"]
            },
            {
              practice: "Appropriate Tool Usage",
              implementation: ["Use tools for intended educational purposes", "Verify calculations with multiple sources", "Understand limitations of automated tools", "Seek professional advice for significant decisions"],
              benefits: ["Accurate financial planning", "Appropriate decision-making", "Risk mitigation", "Optimal tool effectiveness"]
            },
            {
              practice: "Account Security Management",
              implementation: ["Use strong, unique passwords", "Enable multi-factor authentication", "Log out after sessions", "Monitor account activity regularly"],
              benefits: ["Account protection", "Data security", "Fraud prevention", "Privacy maintenance"]
            },
            {
              practice: "Data Accuracy and Maintenance",
              implementation: ["Provide accurate information", "Update changes promptly", "Verify data before using tools", "Maintain backup records"],
              benefits: ["Reliable calculations", "Accurate planning", "Effective tools", "Personal record keeping"]
            }
          ]
        },
        {
          category: "Understanding Service Changes",
          description: "Navigating updates, modifications, and evolution of digital financial services",
          practices: [
            {
              practice: "Change Notification Awareness",
              implementation: ["Monitor email for service updates", "Review notifications carefully", "Understand impact of changes", "Exercise options when provided"],
              benefits: ["Stay informed about changes", "Maintain service continuity", "Exercise rights appropriately", "Plan for service evolution"]
            },
            {
              practice: "Terms Update Management",
              implementation: ["Read updated terms thoroughly", "Compare with previous versions", "Understand new rights and obligations", "Make informed decisions about continued use"],
              benefits: ["Informed consent to changes", "Understanding of new obligations", "Protection of interests", "Appropriate service decisions"]
            }
          ]
        }
      ],
      
      disputeResolution: [
        {
          step: "Direct Communication",
          description: "Initial contact with platform support for issue resolution",
          process: ["Document the issue clearly", "Contact customer support through official channels", "Provide relevant account and transaction information", "Allow reasonable time for response"],
          timeframe: "5-10 business days for initial response",
          expectedOutcomes: ["Issue acknowledgment", "Initial resolution attempt", "Escalation if necessary", "Clear communication of next steps"]
        },
        {
          step: "Formal Complaint Process",
          description: "Escalated resolution for unresolved issues",
          process: ["Submit formal written complaint", "Include all relevant documentation", "Request specific resolution", "Participate in investigation process"],
          timeframe: "15-30 business days for resolution",
          expectedOutcomes: ["Thorough investigation", "Fair resolution attempt", "Clear explanation of decision", "Information about further options"]
        },
        {
          step: "Alternative Dispute Resolution",
          description: "Mediation or arbitration for complex disputes",
          process: ["Review arbitration/mediation provisions", "Select appropriate dispute resolution method", "Participate in good faith", "Accept binding resolution if applicable"],
          timeframe: "30-90 days depending on complexity",
          expectedOutcomes: ["Neutral third-party review", "Fair hearing process", "Binding resolution", "Cost-effective dispute resolution"]
        }
      ],
      
      complianceAndRegulation: [
        {
          area: "Financial Services Regulation",
          applicableRegulations: ["Consumer protection laws", "Financial privacy regulations", "Data protection requirements", "Electronic commerce standards"],
          complianceCommitments: ["Adherence to consumer protection standards", "Privacy regulation compliance", "Data security requirements", "Fair business practice standards"],
          userProtections: ["Regulatory oversight", "Consumer rights protection", "Privacy safeguards", "Fair treatment standards"]
        },
        {
          area: "International Considerations",
          applicableRegulations: ["GDPR for EU users", "CCPA for California residents", "Local consumer protection laws", "International data transfer requirements"],
          complianceCommitments: ["Multi-jurisdictional compliance", "Appropriate user rights recognition", "Legal data transfer mechanisms", "Local law respect"],
          userProtections: ["Rights under applicable law", "Appropriate jurisdiction protections", "Legal recourse options", "Cross-border privacy protection"]
        }
      ],
      
      serviceEvolution: [
        "Regular feature updates and improvements based on user feedback",
        "Enhanced security measures and privacy protections",
        "Expanded educational content and financial literacy resources",
        "Integration with emerging financial technologies and standards",
        "Improved accessibility and user experience design",
        "Additional language support and localization",
        "Enhanced customer support and user assistance capabilities",
        "Compliance with evolving regulatory requirements and best practices"
      ],
      
      termination: [
        {
          scenario: "User-Initiated Termination",
          process: ["Request account closure through official channels", "Complete any pending transactions", "Download or export desired data", "Confirm termination completion"],
          implications: ["Loss of access to platform features", "Data retention according to policy", "Termination of ongoing obligations", "Potential data deletion options"],
          timeline: "Immediate to 30 days depending on complexity"
        },
        {
          scenario: "Service-Initiated Termination",
          process: ["Written notice of termination", "Explanation of termination reasons", "Opportunity for account data export", "Appeal process if applicable"],
          implications: ["Loss of service access", "Data handling according to policy", "Refund policies if applicable", "Alternative service recommendations"],
          timeline: "30-60 days notice for non-violation terminations"
        }
      ]
    },
    
    toolFeatures: [
      "Interactive terms navigator with personalized rights and obligations summary",
      "Service agreement analyzer with plain-language explanations",
      "Rights and responsibilities tracker with usage guidance",
      "Dispute resolution process guide with step-by-step assistance",
      "Terms update notification system with change impact analysis",
      "Compliance verification tool with regulatory requirement checking",
      "Best practices implementation guide with security and usage recommendations",
      "Service optimization advisor for maximum benefit within terms boundaries"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { termsOfServiceContent },
    revalidate: 86400, // Update daily
  };
}

// CSR for interactive terms of service functionality
const TermsOfService = dynamic(() => import('@/pages/TermsOfService'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading terms of service...</p>
      </div>
    </div>
  )
});

export default function Page({ termsOfServiceContent }) {
  return (
    <>
      <Head>
        <title>Terms of Service & Financial Platform Usage Guide - Your Rights & Responsibilities | DollarMento</title>
        <meta name="description" content="Comprehensive terms of service and financial platform usage guide explaining user rights, responsibilities, and best practices for safe and effective use of financial tools and services." />
        <meta property="og:title" content="Terms of Service & Financial Platform Usage Guide" />
        <meta property="og:description" content="Complete guide to user rights, responsibilities, and best practices for financial platforms" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/terms-of-service" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms of Service & Usage Guide" />
        <meta name="twitter:description" content="Comprehensive guide to financial platform rights and responsibilities" />
        <meta name="keywords" content="terms of service, user rights, platform responsibilities, financial services terms, user agreement, service terms, platform usage guide" />
        <link rel="canonical" href="https://dollarmento.com/terms-of-service" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms of Service & Usage Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand your rights and responsibilities with our comprehensive financial platform usage guide. 
              Learn best practices for safe and effective use of financial tools and services.
            </p>
          </div>

          {/* Interactive Terms of Service */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <TermsOfService termsOfServiceContent={termsOfServiceContent} />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Service Agreement Guide</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {termsOfServiceContent.educationalContent.overview}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Service Agreement Fundamentals</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Understanding the fundamental principles that govern the relationship 
                    between financial platform providers and users ensures fair and effective service usage.
                  </p>

                  <div className="space-y-8">
                    {termsOfServiceContent.educationalContent.serviceAgreementFundamentals.map((fundamental, index) => (
                      <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-orange-800 mb-3">{fundamental.concept}</h4>
                        <p className="text-orange-700 mb-4">{fundamental.description}</p>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                          <div>
                            <h5 className="font-semibold text-orange-800 mb-2">Your Rights:</h5>
                            <ul className="text-orange-700 text-sm space-y-1">
                              {fundamental.userRights && fundamental.userRights.map((right, rightIndex) => (
                                <li key={rightIndex}>• {right}</li>
                              ))}
                              {fundamental.serviceInclusions && fundamental.serviceInclusions.map((inclusion, inclIndex) => (
                                <li key={inclIndex}>• {inclusion}</li>
                              ))}
                              {fundamental.platformLiabilities && fundamental.platformLiabilities.map((liability, liabIndex) => (
                                <li key={liabIndex}>• {liability}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-orange-800 mb-2">Your Responsibilities:</h5>
                            <ul className="text-orange-700 text-sm space-y-1">
                              {fundamental.userResponsibilities && fundamental.userResponsibilities.map((responsibility, respIndex) => (
                                <li key={respIndex}>• {responsibility}</li>
                              ))}
                              {fundamental.serviceLimitations && fundamental.serviceLimitations.map((limitation, limIndex) => (
                                <li key={limIndex}>• {limitation}</li>
                              ))}
                              {fundamental.userLiabilities && fundamental.userLiabilities.map((liability, liabIndex) => (
                                <li key={liabIndex}>• {liability}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        {fundamental.balancingPrinciples && (
                          <div className="bg-orange-100 p-4 rounded-lg">
                            <h5 className="font-semibold text-orange-800 mb-2">Balancing Principles:</h5>
                            <ul className="text-orange-700 text-xs space-y-1">
                              {fundamental.balancingPrinciples.map((principle, princIndex) => (
                                <li key={princIndex}>• {principle}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {fundamental.sharedResponsibilities && (
                          <div className="bg-orange-100 p-4 rounded-lg">
                            <h5 className="font-semibold text-orange-800 mb-2">Shared Responsibilities:</h5>
                            <ul className="text-orange-700 text-xs space-y-1">
                              {fundamental.sharedResponsibilities.map((shared, sharedIndex) => (
                                <li key={sharedIndex}>• {shared}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {fundamental.importantDisclaimer && (
                          <div className="bg-amber-100 border border-amber-300 p-4 rounded-lg mt-4">
                            <p className="text-amber-800 text-sm font-medium"><strong>Important:</strong> {fundamental.importantDisclaimer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Best Practices for Users</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Implement these best practices to maximize benefits while minimizing risks 
                    in your use of digital financial platforms and tools.
                  </p>

                  <div className="space-y-6 mb-8">
                    {termsOfServiceContent.educationalContent.bestPracticesForUsers.map((category, index) => (
                      <div key={index} className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                        <h4 className="font-bold text-amber-800 mb-2">{category.category}</h4>
                        <p className="text-amber-700 text-sm mb-4">{category.description}</p>
                        
                        <div className="space-y-4">
                          {category.practices.map((practice, practiceIndex) => (
                            <div key={practiceIndex} className="bg-amber-100 p-4 rounded-lg">
                              <h5 className="font-bold text-amber-800 mb-2">{practice.practice}</h5>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <h6 className="font-semibold text-amber-800 mb-1">Implementation:</h6>
                                  <ul className="text-amber-700 space-y-1">
                                    {practice.implementation.map((impl, implIndex) => (
                                      <li key={implIndex}>• {impl}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h6 className="font-semibold text-amber-800 mb-1">Benefits:</h6>
                                  <ul className="text-amber-700 space-y-1">
                                    {practice.benefits.map((benefit, benIndex) => (
                                      <li key={benIndex}>• {benefit}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Dispute Resolution Process</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding the dispute resolution process ensures you can effectively 
                    address any issues that may arise during your use of financial services.
                  </p>

                  <div className="space-y-6 mb-8">
                    {termsOfServiceContent.educationalContent.disputeResolution.map((step, index) => (
                      <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h4 className="font-bold text-yellow-800 mb-2">Step {index + 1}: {step.step}</h4>
                        <p className="text-yellow-700 text-sm mb-3">{step.description}</p>
                        <p className="text-yellow-600 text-sm mb-3"><strong>Expected Timeframe:</strong> {step.timeframe}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-yellow-800 mb-2">Process Steps:</h5>
                            <ul className="text-yellow-700 space-y-1">
                              {step.process.map((process, processIndex) => (
                                <li key={processIndex}>• {process}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-yellow-800 mb-2">Expected Outcomes:</h5>
                            <ul className="text-yellow-700 space-y-1">
                              {step.expectedOutcomes.map((outcome, outcomeIndex) => (
                                <li key={outcomeIndex}>• {outcome}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Compliance and Regulation</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our commitment to regulatory compliance ensures your rights are protected 
                    and services meet applicable legal and industry standards.
                  </p>

                  <div className="space-y-6 mb-8">
                    {termsOfServiceContent.educationalContent.complianceAndRegulation.map((compliance, index) => (
                      <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h4 className="font-bold text-green-800 mb-3">{compliance.area}</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-green-800 mb-2">Applicable Regulations:</h5>
                            <ul className="text-green-700 space-y-1">
                              {compliance.applicableRegulations.map((regulation, regIndex) => (
                                <li key={regIndex}>• {regulation}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-green-800 mb-2">Our Commitments:</h5>
                            <ul className="text-green-700 space-y-1">
                              {compliance.complianceCommitments.map((commitment, commIndex) => (
                                <li key={commIndex}>• {commitment}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-green-800 mb-2">Your Protections:</h5>
                            <ul className="text-green-700 space-y-1">
                              {compliance.userProtections.map((protection, protIndex) => (
                                <li key={protIndex}>• {protection}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Service Evolution</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our commitment to continuous improvement ensures services evolve 
                    to meet changing user needs and industry standards.
                  </p>

                  <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                    {termsOfServiceContent.educationalContent.serviceEvolution.map((evolution, index) => (
                      <li key={index}>{evolution}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Service Management Features</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our comprehensive service management platform provides tools 
                    for understanding and optimizing your use of financial services.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {termsOfServiceContent.toolFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Reference</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Service Access</span>
                    <span className="font-semibold">Your Right</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Data Protection</span>
                    <span className="font-semibold">Guaranteed</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Support</span>
                    <span className="font-semibold">Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fair Treatment</span>
                    <span className="font-semibold">Assured</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Fair Service</h3>
                <p className="text-sm mb-4">
                  Balanced rights and responsibilities ensure fair and effective financial platform usage.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Protected</div>
                  <div className="text-sm opacity-90">Your interests</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Documents</h3>
                <div className="space-y-3">
                  <a href="/privacy-policy" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Privacy Policy
                  </a>
                  <a href="/data-deletion" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Data Deletion
                  </a>
                  <a href="/user-guide" className="block text-blue-600 hover:text-blue-800 font-medium">
                    User Guide
                  </a>
                  <a href="/contact" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Contact Support
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
