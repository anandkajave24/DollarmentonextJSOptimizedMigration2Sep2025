import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive privacy tools
export async function getStaticProps() {
  const privacyPolicyContent = {
    title: "Privacy Policy & Financial Data Protection Guide - Your Rights & Our Commitment",
    description: "Comprehensive privacy policy and financial data protection guide explaining your rights, our data practices, and best practices for maintaining financial privacy. Understand how your financial information is protected and managed.",
    
    educationalContent: {
      overview: "Privacy protection in financial services requires understanding both legal frameworks and practical implementation. Our comprehensive approach to financial data privacy combines regulatory compliance with user empowerment, ensuring transparency in data practices while providing tools and education for personal privacy management.",
      
      privacyPrinciples: [
        {
          principle: "Data Minimization",
          description: "Collecting only the minimum data necessary for providing financial services",
          implementation: [
            "Request only essential information required for service delivery",
            "Avoid collecting speculative or 'nice-to-have' data points",
            "Regular review and purging of unnecessary historical data",
            "User control over optional data sharing preferences"
          ],
          userBenefits: ["Reduced privacy exposure", "Lower risk of data breaches", "Simplified data management", "Enhanced user control"],
          industryStandard: "Aligned with GDPR, CCPA, and financial industry best practices"
        },
        {
          principle: "Purpose Limitation",
          description: "Using collected data only for stated, legitimate purposes",
          implementation: [
            "Clear documentation of data usage purposes",
            "Prohibition of data use beyond stated purposes",
            "Regular auditing of data usage practices",
            "User notification before any purpose expansion"
          ],
          userBenefits: ["Predictable data usage", "Protection against scope creep", "Transparent data practices", "Enhanced trust"],
          industryStandard: "Core requirement under major privacy regulations"
        },
        {
          principle: "Storage Limitation",
          description: "Retaining data only as long as necessary for legitimate purposes",
          implementation: [
            "Defined retention periods for different data types",
            "Automated deletion of expired data",
            "User-initiated deletion capabilities",
            "Regular review of retention necessity"
          ],
          userBenefits: ["Reduced long-term exposure", "Automatic data cleanup", "Control over data lifespan", "Minimized storage risks"],
          industryStandard: "Required by GDPR and recommended by financial regulators"
        },
        {
          principle: "Accuracy and Quality",
          description: "Maintaining accurate, complete, and up-to-date personal information",
          implementation: [
            "User access to review and correct personal data",
            "Regular data quality audits and verification",
            "Prompt correction of identified inaccuracies",
            "Data validation at point of collection"
          ],
          userBenefits: ["Accurate service delivery", "Reduced errors", "User control over information", "Improved service quality"],
          industryStandard: "Fundamental requirement across all privacy frameworks"
        }
      ],
      
      userRights: [
        {
          right: "Right to Information (Transparency)",
          description: "Understanding what data is collected, how it's used, and who has access",
          exercise: [
            "Review privacy policy and data practices documentation",
            "Request detailed information about specific data processing",
            "Inquire about data sharing arrangements and partnerships",
            "Ask about data retention periods and deletion practices"
          ],
          timeline: "Information must be provided within 30 days of request",
          limitations: ["Trade secret protections", "Security considerations", "Third-party confidentiality"]
        },
        {
          right: "Right to Access",
          description: "Obtaining copies of personal data held by financial institutions",
          exercise: [
            "Submit formal data access request",
            "Verify identity through established procedures",
            "Specify particular data categories if desired",
            "Receive data in accessible and portable format"
          ],
          timeline: "Access must be provided within 30-45 days depending on jurisdiction",
          limitations: ["Identity verification requirements", "Security clearances", "Third-party data exclusions"]
        },
        {
          right: "Right to Rectification",
          description: "Correcting inaccurate or incomplete personal information",
          exercise: [
            "Identify and document data inaccuracies",
            "Submit correction request with supporting evidence",
            "Work with institution to verify and implement corrections",
            "Confirm correction completion and data update"
          ],
          timeline: "Corrections must be completed within 30 days of verification",
          limitations: ["Evidence requirements", "Technical feasibility", "Conflicting authoritative sources"]
        },
        {
          right: "Right to Erasure (Right to be Forgotten)",
          description: "Requesting deletion of personal data when no longer necessary",
          exercise: [
            "Identify data eligible for deletion",
            "Submit formal erasure request with justification",
            "Allow time for legal and regulatory review",
            "Receive confirmation of deletion completion"
          ],
          timeline: "Erasure must be completed within 30-60 days if approved",
          limitations: ["Legal retention requirements", "Regulatory obligations", "Legitimate business interests"]
        },
        {
          right: "Right to Data Portability",
          description: "Receiving personal data in portable format for transfer to another provider",
          exercise: [
            "Request data export in machine-readable format",
            "Specify particular data sets for portability",
            "Coordinate with receiving institution if applicable",
            "Verify completeness and accuracy of exported data"
          ],
          timeline: "Data must be provided within 30 days in usable format",
          limitations: ["Technical feasibility", "Third-party data exclusions", "Security considerations"]
        }
      ],
      
      dataCategories: [
        {
          category: "Identity and Contact Information",
          dataTypes: ["Name, address, phone, email", "Date of birth", "Government ID numbers", "Employment information"],
          purposes: ["Account setup and verification", "Communication and service delivery", "Regulatory compliance", "Fraud prevention"],
          retention: "Duration of relationship plus regulatory requirement period (typically 5-7 years)",
          sharing: "Limited to regulatory authorities and essential service providers with user consent"
        },
        {
          category: "Financial Information",
          dataTypes: ["Account numbers and balances", "Transaction history", "Credit information", "Investment holdings"],
          purposes: ["Service provision", "Risk management", "Regulatory reporting", "Account management"],
          retention: "Transaction records: 7 years; Account information: duration of relationship plus 7 years",
          sharing: "Regulatory authorities, auditors, and explicitly authorized third parties only"
        },
        {
          category: "Behavioral and Preference Data",
          dataTypes: ["Service usage patterns", "Preference settings", "Communication history", "Support interactions"],
          purposes: ["Service improvement", "Personalization", "Customer support", "Product development"],
          retention: "2-3 years or until user requests deletion (whichever is shorter)",
          sharing: "Aggregated and anonymized data only, with opt-out capabilities"
        },
        {
          category: "Technical and Security Data",
          dataTypes: ["IP addresses", "Device information", "Login records", "Security event logs"],
          purposes: ["Security and fraud prevention", "System maintenance", "Performance optimization", "Regulatory compliance"],
          retention: "Security logs: 2 years; Performance data: 1 year; Technical data: duration of use",
          sharing: "Law enforcement and security services only when legally required"
        }
      ],
      
      securityMeasures: [
        "End-to-end encryption for all data transmission and storage",
        "Multi-factor authentication for account access and administrative functions",
        "Regular security audits and penetration testing by independent firms",
        "Employee training and background checks for data access roles",
        "Incident response procedures with rapid notification protocols",
        "Data segregation and access controls based on principle of least privilege",
        "Regular backup and disaster recovery testing",
        "Compliance monitoring and regulatory audit preparation",
        "Vendor security assessments and contractual data protection requirements",
        "User education and security best practice communication"
      ],
      
      privacyBestPractices: [
        "Regularly review and update privacy settings on all financial accounts",
        "Use strong, unique passwords and enable multi-factor authentication",
        "Monitor financial statements and credit reports for unauthorized activity",
        "Be cautious about sharing financial information via email or unsecured channels",
        "Keep software and security systems updated on all devices",
        "Understand privacy policies before agreeing to new financial services",
        "Exercise data rights regularly to maintain control over personal information",
        "Use privacy-focused browsers and tools for financial research and planning",
        "Limit third-party app connections to essential services only",
        "Report suspected privacy violations or data breaches immediately"
      ]
    },
    
    toolFeatures: [
      "Interactive privacy policy navigator with personalized rights assessment",
      "Data access request generator with automated form completion",
      "Privacy settings optimizer with security recommendations",
      "Data audit trail viewer showing collection, usage, and sharing history",
      "Rights exercise tracker with status monitoring and follow-up reminders",
      "Privacy education center with regulatory updates and best practices",
      "Consent management dashboard with granular permission controls",
      "Privacy impact assessment tool for new service evaluations"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { privacyPolicyContent },
    revalidate: 86400, // Update daily
  };
}

// CSR for interactive privacy policy functionality
const Privacy_policy = dynamic(() => import('@/pages/PrivacyPolicy'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading privacy policy...</p>
      </div>
    </div>
  )
});

export default function Page({ privacyPolicyContent }) {
  return (
    <>
      <Head>
        <title>Privacy Policy & Financial Data Protection Guide - Your Rights & Our Commitment | DollarMento</title>
        <meta name="description" content="Comprehensive privacy policy and financial data protection guide explaining your rights, our data practices, and best practices for maintaining financial privacy. Understand how your financial information is protected." />
        <meta property="og:title" content="Privacy Policy & Financial Data Protection Guide" />
        <meta property="og:description" content="Comprehensive guide to financial data privacy rights and protection practices" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/privacy-policy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy & Data Protection" />
        <meta name="twitter:description" content="Complete guide to financial privacy rights and data protection practices" />
        <meta name="keywords" content="privacy policy, financial data protection, privacy rights, GDPR, CCPA, data security, financial privacy, user rights" />
        <link rel="canonical" href="https://dollarmento.com/privacy-policy" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy & Data Protection
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your comprehensive guide to financial data privacy rights and protection practices. 
              Understand how your information is protected and how you can maintain control over your data.
            </p>
          </div>

          {/* Interactive Privacy Policy */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <Privacy_policy privacyPolicyContent={privacyPolicyContent} />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Privacy Protection Guide</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {privacyPolicyContent.educationalContent.overview}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Privacy Principles</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our privacy framework is built on fundamental principles that ensure 
                    your financial data is protected through every stage of collection, use, and storage.
                  </p>

                  <div className="space-y-6">
                    {privacyPolicyContent.educationalContent.privacyPrinciples.map((principle, index) => (
                      <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-blue-800 mb-3">{principle.principle}</h4>
                        <p className="text-blue-700 mb-4">{principle.description}</p>
                        <p className="text-blue-600 text-sm mb-4"><strong>Industry Standard:</strong> {principle.industryStandard}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-blue-800 mb-2">Implementation:</h5>
                            <ul className="text-blue-700 space-y-1">
                              {principle.implementation.map((impl, implIndex) => (
                                <li key={implIndex}>• {impl}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-blue-800 mb-2">Your Benefits:</h5>
                            <ul className="text-blue-700 space-y-1">
                              {principle.userBenefits.map((benefit, benIndex) => (
                                <li key={benIndex}>• {benefit}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Your Privacy Rights</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Understanding and exercising your privacy rights ensures you maintain 
                    control over your financial information and how it's used.
                  </p>

                  <div className="space-y-6 mb-8">
                    {privacyPolicyContent.educationalContent.userRights.map((right, index) => (
                      <div key={index} className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                        <h4 className="font-bold text-indigo-800 mb-2">{right.right}</h4>
                        <p className="text-indigo-700 text-sm mb-3">{right.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-indigo-700 mb-3">
                          <p><strong>Timeline:</strong> {right.timeline}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-indigo-800 mb-2">How to Exercise:</h5>
                            <ul className="text-indigo-700 space-y-1">
                              {right.exercise.map((step, stepIndex) => (
                                <li key={stepIndex}>• {step}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-indigo-800 mb-2">Limitations:</h5>
                            <ul className="text-indigo-700 space-y-1">
                              {right.limitations.map((limitation, limIndex) => (
                                <li key={limIndex}>• {limitation}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Data Categories & Usage</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Transparency about what data we collect, why we collect it, 
                    and how long we keep it helps you make informed decisions about your privacy.
                  </p>

                  <div className="space-y-6 mb-8">
                    {privacyPolicyContent.educationalContent.dataCategories.map((category, index) => (
                      <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h4 className="font-bold text-green-800 mb-3">{category.category}</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700 mb-4">
                          <div>
                            <h5 className="font-semibold text-green-800 mb-1">Data Types:</h5>
                            <ul className="space-y-1">
                              {category.dataTypes.map((type, typeIndex) => (
                                <li key={typeIndex}>• {type}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-green-800 mb-1">Usage Purposes:</h5>
                            <ul className="space-y-1">
                              {category.purposes.map((purpose, purposeIndex) => (
                                <li key={purposeIndex}>• {purpose}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="text-xs text-green-600">
                          <p className="mb-1"><strong>Retention Period:</strong> {category.retention}</p>
                          <p><strong>Sharing Policy:</strong> {category.sharing}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Security Measures</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Comprehensive security measures protect your financial data 
                    from unauthorized access, breaches, and other security threats.
                  </p>

                  <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                    {privacyPolicyContent.educationalContent.securityMeasures.map((measure, index) => (
                      <li key={index}>{measure}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Privacy Best Practices</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Take an active role in protecting your financial privacy 
                    with these recommended practices and security measures.
                  </p>

                  <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                    {privacyPolicyContent.educationalContent.privacyBestPractices.map((practice, index) => (
                      <li key={index}>{practice}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Privacy Management Features</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our privacy management platform provides comprehensive tools 
                    for understanding and controlling your financial data privacy.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {privacyPolicyContent.toolFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Rights Summary</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Information Access</span>
                    <span className="font-semibold">30 days</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Data Correction</span>
                    <span className="font-semibold">30 days</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Data Deletion</span>
                    <span className="font-semibold">30-60 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data Portability</span>
                    <span className="font-semibold">30 days</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Privacy First</h3>
                <p className="text-sm mb-4">
                  Your financial data privacy is protected through comprehensive security and transparent practices.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Protected</div>
                  <div className="text-sm opacity-90">Your data</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h3>
                <div className="space-y-3">
                  <a href="/data-deletion" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Data Deletion
                  </a>
                  <a href="/terms-of-service" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Terms of Service
                  </a>
                  <a href="/security-center" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Security Center
                  </a>
                  <a href="/contact" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Contact Privacy Team
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
