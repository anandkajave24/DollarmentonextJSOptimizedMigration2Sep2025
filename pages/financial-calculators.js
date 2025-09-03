import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive calculators
export async function getStaticProps() {
  const calculatorContent = {
    title: "Financial Calculators - Comprehensive Planning Tools",
    description: "Professional financial calculators and planning tools for budgeting, investing, retirement, loans, and wealth building. Get accurate calculations and insights for informed financial decisions.",
    
    educationalContent: {
      overview: "Our comprehensive suite of financial calculators provides accurate calculations and insights for all aspects of financial planning. From basic budgeting to complex investment analysis, our tools help you make informed financial decisions and track your progress toward financial goals.",
      
      calculatorCategories: [
        {
          category: "Budgeting & Savings Calculators",
          description: "Essential tools for managing daily finances, tracking expenses, and building savings habits.",
          calculators: [
            {
              name: "Budget Calculator",
              purpose: "Create and track monthly budgets with income and expense categories",
              features: ["Income tracking", "Expense categorization", "Savings goals", "Budget variance analysis"]
            },
            {
              name: "Emergency Fund Calculator",
              purpose: "Determine optimal emergency fund size and savings timeline",
              features: ["Expense analysis", "Savings timeline", "Goal tracking", "Risk assessment"]
            },
            {
              name: "Savings Goal Calculator",
              purpose: "Plan and track progress toward specific financial goals",
              features: ["Goal setting", "Timeline planning", "Regular contribution calculation", "Progress monitoring"]
            }
          ]
        },
        {
          category: "Investment & Retirement Calculators",
          description: "Advanced tools for investment planning, portfolio analysis, and retirement preparation.",
          calculators: [
            {
              name: "Investment Calculator",
              purpose: "Project investment growth with compound interest and regular contributions",
              features: ["Compound interest calculation", "Regular contribution modeling", "Tax impact analysis", "Inflation adjustment"]
            },
            {
              name: "Retirement Calculator",
              purpose: "Estimate retirement needs and plan savings strategies",
              features: ["Retirement income projection", "Savings requirement calculation", "Social Security estimation", "Withdrawal planning"]
            },
            {
              name: "401k Calculator",
              purpose: "Optimize 401k contributions and employer matching benefits",
              features: ["Employer match calculation", "Tax savings analysis", "Contribution optimization", "Retirement projection"]
            }
          ]
        },
        {
          category: "Debt & Loan Calculators",
          description: "Comprehensive tools for managing debt, planning loan payments, and debt elimination strategies.",
          calculators: [
            {
              name: "Mortgage Calculator",
              purpose: "Calculate mortgage payments, interest costs, and amortization schedules",
              features: ["Monthly payment calculation", "Amortization schedule", "Total interest analysis", "Extra payment impact"]
            },
            {
              name: "Debt Payoff Calculator",
              purpose: "Create strategic debt elimination plans and compare payoff methods",
              features: ["Debt snowball method", "Debt avalanche method", "Payoff timeline", "Interest savings calculation"]
            },
            {
              name: "Loan Calculator",
              purpose: "Analyze various loan types and payment structures",
              features: ["Payment calculation", "Interest comparison", "Loan term analysis", "Total cost comparison"]
            }
          ]
        },
        {
          category: "Tax & Insurance Calculators",
          description: "Essential tools for tax planning, insurance needs assessment, and financial protection strategies.",
          calculators: [
            {
              name: "Tax Calculator",
              purpose: "Estimate federal and state income taxes with deduction optimization",
              features: ["Tax liability calculation", "Deduction optimization", "Refund estimation", "Tax planning scenarios"]
            },
            {
              name: "Life Insurance Calculator",
              purpose: "Determine appropriate life insurance coverage amounts",
              features: ["Coverage needs analysis", "Income replacement calculation", "Debt coverage planning", "Family protection assessment"]
            },
            {
              name: "Health Insurance Calculator",
              purpose: "Compare health insurance plans and estimate costs",
              features: ["Plan comparison", "Cost estimation", "Deductible analysis", "Out-of-pocket calculations"]
            }
          ]
        }
      ],
      
      calculatorBenefits: [
        "Accurate financial projections based on current market data and tax rates",
        "Interactive scenarios to test different financial strategies",
        "Professional-grade calculations used by financial advisors",
        "Regular updates to reflect changing tax laws and market conditions",
        "User-friendly interfaces suitable for all experience levels",
        "Detailed explanations of calculations and financial concepts"
      ],
      
      usageGuidelines: [
        "Start with basic calculators to understand fundamental concepts",
        "Use multiple calculators together for comprehensive financial planning",
        "Regularly update inputs to reflect changing financial circumstances",
        "Consider seeking professional advice for complex financial decisions",
        "Use calculator results as starting points for detailed financial planning"
      ],
      
      accuracyNote: "Our calculators use current market data, tax rates, and financial formulas to provide accurate estimates. While these tools are designed for precision, actual results may vary based on market conditions, policy changes, and individual circumstances. Consider consulting with financial professionals for personalized advice."
    },
    
    platformFeatures: [
      "45+ professional financial calculators covering all planning areas",
      "Real-time calculations with instant results and visualizations",
      "Mobile-responsive design for calculations on any device",
      "Printable reports and calculation summaries",
      "Save and compare multiple calculation scenarios",
      "Integration with educational content and planning guides"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { calculatorContent },
    revalidate: 172800, // Update every 48 hours to reduce regeneration spikes
  };
}

// Lazy-load only the interactive calculator widgets
const FinancialCalculatorsWidget = dynamic(() => import('../client/src/pages/FinancialCalculators'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-40 flex items-center justify-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
    </div>
  )
});

export default function Page({ calculatorContent }) {
  return (
    <>
      <Head>
        <title>Financial Calculators - Comprehensive Planning Tools | DollarMento</title>
        <meta name="description" content="Professional financial calculators and planning tools for budgeting, investing, retirement, loans, and wealth building. Get accurate calculations and insights for informed financial decisions." />
        <meta property="og:title" content="Financial Calculators - Comprehensive Planning Tools" />
        <meta property="og:description" content="Professional financial calculators for budgeting, investing, retirement planning, and loan analysis" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/financial-calculators" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Financial Calculators & Planning Tools" />
        <meta name="twitter:description" content="Comprehensive suite of financial calculators for all your planning needs" />
        <meta name="keywords" content="financial calculators, budget calculator, investment calculator, retirement calculator, mortgage calculator, loan calculator, financial planning tools" />
        <link rel="canonical" href="https://dollarmento.com/financial-calculators" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Financial Calculators
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional financial calculators and planning tools for budgeting, investing, 
              retirement, loans, and comprehensive wealth building strategies.
            </p>
          </div>

          {/* Interactive Financial Calculators */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <FinancialCalculatorsWidget />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Financial Calculator Suite</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {calculatorContent.educationalContent.overview}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator Categories</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our comprehensive calculator suite is organized into specialized categories, 
                    each designed to address specific aspects of financial planning and decision-making.
                  </p>

                  <div className="space-y-8">
                    {calculatorContent.educationalContent.calculatorCategories.map((category, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-xl font-bold text-gray-800 mb-3">{category.category}</h4>
                        <p className="text-gray-700 mb-4">{category.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {category.calculators.map((calc, calcIndex) => (
                            <div key={calcIndex} className="bg-white border border-gray-200 rounded-lg p-4">
                              <h5 className="font-semibold text-gray-800 mb-2">{calc.name}</h5>
                              <p className="text-gray-600 text-sm mb-3">{calc.purpose}</p>
                              <div className="text-xs text-gray-500">
                                <h6 className="font-semibold mb-1">Key Features:</h6>
                                <ul className="space-y-1">
                                  {calc.features.map((feature, featureIndex) => (
                                    <li key={featureIndex}>• {feature}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Calculator Benefits</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our financial calculators provide professional-grade accuracy and comprehensive 
                    analysis to support informed financial decision-making.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {calculatorContent.educationalContent.calculatorBenefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Usage Guidelines</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To maximize the value of our financial calculators, follow these 
                    best practices for effective financial planning.
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Best Practices:</h4>
                    <ul className="text-green-700 space-y-2">
                      {calculatorContent.educationalContent.usageGuidelines.map((guideline, index) => (
                        <li key={index}>• {guideline}</li>
                      ))}
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Accuracy and Reliability</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {calculatorContent.educationalContent.accuracyNote}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Platform Features</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our calculator platform is designed for ease of use, accuracy, and 
                    comprehensive financial analysis capabilities.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {calculatorContent.platformFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Calculator Stats</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Total Calculators</span>
                    <span className="font-semibold">45+</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Categories</span>
                    <span className="font-semibold">4 Major Areas</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Update Frequency</span>
                    <span className="font-semibold">Regular</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mobile Support</span>
                    <span className="font-semibold">Full Responsive</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Professional Tools</h3>
                <p className="text-sm mb-4">
                  Access professional-grade financial calculators used by advisors and planners.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Free</div>
                  <div className="text-sm opacity-90">All calculators</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Calculators</h3>
                <div className="space-y-3">
                  <a href="/budget-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Budget Calculator
                  </a>
                  <a href="/investment-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Calculator
                  </a>
                  <a href="/retirement-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Retirement Calculator
                  </a>
                  <a href="/mortgage-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Mortgage Calculator
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
