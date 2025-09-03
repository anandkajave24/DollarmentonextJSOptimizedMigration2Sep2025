import Head from 'next/head';
import dynamic from 'next/dynamic';

// Use SSR to ensure build safety with complex data structures
export async function getServerSideProps() {
  const wordSearchContent = {
    title: "Financial Word Search - Educational Money Management Game",
    description: "Interactive financial word search game for learning money management terms, investment vocabulary, and financial concepts. Educational gaming approach to financial literacy.",
    
    educationalContent: {
      overview: "Our financial word search game combines entertainment with education, helping you learn essential financial terminology while having fun. This interactive approach reinforces financial concepts and builds vocabulary for better understanding of money management, investing, and financial planning.",
      
      gameCategories: [
        {
          category: "Basic Financial Terms",
          description: "Essential money management vocabulary for everyday financial decisions and planning.",
          sampleTerms: [
            { term: "Budget", definition: "A plan for managing income and expenses over a specific period" },
            { term: "Savings", definition: "Money set aside for future use or emergencies" },
            { term: "Interest", definition: "Money earned on savings or charged on loans" },
            { term: "Credit", definition: "Borrowed money that must be repaid with interest" },
            { term: "Debt", definition: "Money owed to lenders or creditors" },
            { term: "Income", definition: "Money received from work, investments, or other sources" }
          ]
        },
        {
          category: "Investment Vocabulary",
          description: "Key terms for understanding investing, securities, and wealth building strategies.",
          sampleTerms: [
            { term: "Portfolio", definition: "Collection of investments owned by an individual or institution" },
            { term: "Diversification", definition: "Strategy of spreading investments across different assets to reduce risk" },
            { term: "Dividend", definition: "Payment made by companies to shareholders from profits" },
            { term: "Compound", definition: "Earning returns on both original investment and previous returns" },
            { term: "Volatility", definition: "Degree of price fluctuation in an investment over time" },
            { term: "Liquidity", definition: "How easily an asset can be converted to cash" }
          ]
        },
        {
          category: "Retirement Planning",
          description: "Terminology related to retirement savings, planning, and income strategies.",
          sampleTerms: [
            { term: "401k", definition: "Employer-sponsored retirement savings plan with tax advantages" },
            { term: "IRA", definition: "Individual Retirement Account for personal retirement savings" },
            { term: "Pension", definition: "Employer-provided retirement income based on years of service" },
            { term: "Annuity", definition: "Insurance product providing regular payments during retirement" },
            { term: "Vesting", definition: "Process of earning rights to employer retirement contributions" },
            { term: "RMD", definition: "Required Minimum Distribution from retirement accounts after age 72" }
          ]
        },
        {
          category: "Banking & Credit",
          description: "Essential terms for banking services, credit management, and loan products.",
          sampleTerms: [
            { term: "APR", definition: "Annual Percentage Rate - yearly cost of credit including fees" },
            { term: "Mortgage", definition: "Loan used to purchase real estate, secured by the property" },
            { term: "Refinance", definition: "Replacing an existing loan with a new one with better terms" },
            { term: "Escrow", definition: "Account holding funds until specific conditions are met" },
            { term: "Equity", definition: "Ownership interest in property or company stock" },
            { term: "Collateral", definition: "Asset pledged as security for a loan" }
          ]
        }
      ],
      
      learningBenefits: [
        {
          benefit: "Vocabulary Building",
          description: "Learn essential financial terms through repetitive, engaging gameplay",
          impact: "Better comprehension of financial articles, advice, and planning documents"
        },
        {
          benefit: "Concept Reinforcement",
          description: "Strengthen understanding of financial concepts through active recall",
          impact: "Improved retention of financial knowledge and terminology"
        },
        {
          benefit: "Gamified Learning",
          description: "Make financial education enjoyable and stress-free through gaming",
          impact: "Increased motivation to continue learning about personal finance"
        },
        {
          benefit: "Progressive Difficulty",
          description: "Start with basic terms and advance to complex financial concepts",
          impact: "Systematic building of financial literacy from beginner to advanced levels"
        }
      ],
      
      gameFeatures: [
        "Multiple difficulty levels from beginner to advanced financial terms",
        "Timed challenges to test knowledge under pressure",
        "Hint system providing definitions and context for learning",
        "Progress tracking and achievement badges for completed puzzles",
        "Daily challenges with new financial vocabulary",
        "Educational pop-ups explaining terms and concepts during gameplay"
      ],
      
      educationalValue: {
        targetAudience: "Suitable for all ages and financial knowledge levels",
        skillsDeveloped: ["Financial vocabulary", "Pattern recognition", "Concept retention", "Learning motivation"],
        applicationAreas: ["Personal finance planning", "Investment discussions", "Financial education", "Professional development"]
      }
    },
    
    platformFeatures: [
      "Interactive word search puzzles with financial terminology",
      "Educational definitions and explanations for every term",
      "Progressive difficulty levels for skill building",
      "Achievement system and progress tracking",
      "Mobile-friendly design for gaming on any device",
      "Regular updates with new puzzles and financial terms"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { wordSearchContent },
    revalidate: 86400, // Update daily
  };
}

// CSR for interactive word search game functionality
const FinancialWordSearch = dynamic(() => import('@/pages/FinancialWordSearch'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading word search game...</p>
      </div>
    </div>
  )
});

export default function Page({ wordSearchContent }) {
  return (
    <>
      <Head>
        <title>Financial Word Search - Educational Money Management Game | DollarMento</title>
        <meta name="description" content="Interactive financial word search game for learning money management terms, investment vocabulary, and financial concepts. Educational gaming approach to financial literacy." />
        <meta property="og:title" content="Financial Word Search - Educational Money Management Game" />
        <meta property="og:description" content="Learn financial terms through interactive word search puzzles and educational games" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/word-search" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Financial Word Search Game" />
        <meta name="twitter:description" content="Educational word search game for learning financial vocabulary and concepts" />
        <meta name="keywords" content="financial word search, money management game, financial education game, investment vocabulary, financial literacy game, educational finance" />
        <link rel="canonical" href="https://dollarmento.com/word-search" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Financial Word Search
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn financial terminology through interactive word search puzzles. 
              Build your money management vocabulary while having fun with educational games.
            </p>
          </div>

          {/* Interactive Word Search Game */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <FinancialWordSearch wordSearchContent={wordSearchContent} />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Educational Financial Word Search</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {wordSearchContent.educationalContent.overview}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Financial Term Categories</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our word search games are organized into specific financial categories, 
                    helping you build comprehensive vocabulary in key areas of money management.
                  </p>

                  <div className="space-y-6">
                    {wordSearchContent.educationalContent.gameCategories.map((category, index) => (
                      <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-yellow-800 mb-3">{category.category}</h4>
                        <p className="text-yellow-700 mb-4">{category.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {category.sampleTerms.map((termObj, termIndex) => (
                            <div key={termIndex} className="bg-white border border-yellow-300 rounded-lg p-3">
                              <h5 className="font-semibold text-yellow-800 mb-1">{termObj.term}</h5>
                              <p className="text-yellow-700 text-sm">{termObj.definition}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Learning Benefits</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Educational gaming provides unique advantages for financial literacy development 
                    through engaging, interactive learning experiences.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {wordSearchContent.educationalContent.learningBenefits.map((benefit, index) => (
                      <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                        <h4 className="font-bold text-orange-800 mb-2">{benefit.benefit}</h4>
                        <p className="text-orange-700 text-sm mb-2">{benefit.description}</p>
                        <p className="text-orange-600 text-xs"><strong>Impact:</strong> {benefit.impact}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Game Features</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our word search platform includes advanced features designed to maximize 
                    learning effectiveness and player engagement.
                  </p>

                  <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                    {wordSearchContent.educationalContent.gameFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Educational Value</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our financial word search games provide measurable educational value 
                    for learners of all backgrounds and experience levels.
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Learning Outcomes:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700">
                      <div>
                        <h5 className="font-semibold mb-2">Target Audience:</h5>
                        <p className="text-sm">{wordSearchContent.educationalContent.educationalValue.targetAudience}</p>
                        
                        <h5 className="font-semibold mb-2 mt-3">Skills Developed:</h5>
                        <ul className="text-sm space-y-1">
                          {wordSearchContent.educationalContent.educationalValue.skillsDeveloped.map((skill, index) => (
                            <li key={index}>• {skill}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Application Areas:</h5>
                        <ul className="text-sm space-y-1">
                          {wordSearchContent.educationalContent.educationalValue.applicationAreas.map((area, index) => (
                            <li key={index}>• {area}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Platform Features</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our gaming platform combines educational content with engaging gameplay 
                    for effective financial literacy development.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {wordSearchContent.platformFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Game Stats</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Term Categories</span>
                    <span className="font-semibold">4 Areas</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Financial Terms</span>
                    <span className="font-semibold">100+ Words</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Difficulty Levels</span>
                    <span className="font-semibold">5 Levels</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Challenges</span>
                    <span className="font-semibold">Available</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-yellow-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Play & Learn</h3>
                <p className="text-sm mb-4">
                  Combine entertainment with education to build financial vocabulary and knowledge.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Fun</div>
                  <div className="text-sm opacity-90">Learning experience</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Games</h3>
                <div className="space-y-3">
                  <a href="/financial-freedom-game" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Financial Freedom Game
                  </a>
                  <a href="/investment-puzzles" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Puzzles
                  </a>
                  <a href="/investment-riddles" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Riddles
                  </a>
                  <a href="/usa-wealth-building-games" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Wealth Building Games
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
