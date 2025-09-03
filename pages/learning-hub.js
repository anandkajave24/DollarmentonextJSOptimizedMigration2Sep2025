import Head from 'next/head';
import dynamic from 'next/dynamic';

// Hybrid approach: SSG for educational content + CSR for interactive learning hub
export async function getStaticProps() {
  const learningContent = {
    title: "Learning Hub - Comprehensive Financial Education Platform",
    description: "Interactive financial education platform with courses, tutorials, videos, and learning paths. Master personal finance, investing, budgeting, and wealth building through structured educational content.",
    
    educationalContent: {
      overview: "Our Learning Hub provides comprehensive financial education through interactive courses, video tutorials, and structured learning paths. Whether you're a beginner or looking to advance your financial knowledge, our platform offers personalized learning experiences to help you achieve financial literacy and independence.",
      
      learningPaths: [
        {
          path: "Financial Fundamentals",
          content: "Master the basics of personal finance including budgeting, saving, debt management, and emergency planning.",
          modules: ["Budget Creation", "Emergency Fund Building", "Debt Elimination", "Cash Flow Management", "Financial Goal Setting"],
          duration: "4-6 weeks",
          level: "Beginner"
        },
        {
          path: "Investment Mastery",
          content: "Comprehensive investment education covering stocks, bonds, ETFs, mutual funds, and retirement accounts.",
          modules: ["Investment Basics", "Stock Market Fundamentals", "Portfolio Diversification", "Risk Management", "Retirement Planning"],
          duration: "6-8 weeks",
          level: "Intermediate"
        },
        {
          path: "Advanced Wealth Building",
          content: "Advanced strategies for wealth creation including real estate, tax optimization, and business building.",
          modules: ["Real Estate Investing", "Tax Strategies", "Business Finance", "Estate Planning", "Advanced Portfolio Management"],
          duration: "8-10 weeks",
          level: "Advanced"
        }
      ],
      
      courses: [
        {
          title: "Budgeting Mastery Course",
          description: "Learn to create and maintain effective budgets that align with your financial goals and lifestyle.",
          topics: ["Zero-based budgeting", "50/30/20 rule", "Envelope method", "Digital budgeting tools"],
          duration: "2 weeks"
        },
        {
          title: "Investment Fundamentals",
          description: "Understanding investment principles, risk management, and building diversified portfolios.",
          topics: ["Asset allocation", "Risk tolerance", "Dollar-cost averaging", "Investment accounts"],
          duration: "3 weeks"
        },
        {
          title: "Retirement Planning Essentials",
          description: "Comprehensive retirement planning including 401k optimization, IRA strategies, and Social Security.",
          topics: ["401k maximization", "IRA types and strategies", "Social Security planning", "Retirement income"],
          duration: "4 weeks"
        }
      ],
      
      interactiveFeatures: [
        "Progress tracking and achievement badges",
        "Interactive calculators and financial tools", 
        "Personalized learning recommendations",
        "Community discussion forums",
        "Expert Q&A sessions",
        "Real-world case studies and simulations"
      ],
      
      learningFormats: [
        "HD video tutorials with expert instructors",
        "Interactive worksheets and exercises",
        "Audio lessons for mobile learning", 
        "Downloadable guides and templates",
        "Live webinars and workshop sessions",
        "Mobile-friendly course access"
      ],
      
      skillLevels: {
        beginner: {
          description: "Perfect for those starting their financial journey",
          focus: "Basic money management, budgeting, and debt elimination",
          outcomes: "Build emergency fund, eliminate debt, create sustainable budget"
        },
        intermediate: {
          description: "For those with basic financial knowledge looking to grow wealth",
          focus: "Investment strategies, retirement planning, tax optimization",
          outcomes: "Build investment portfolio, maximize retirement savings, reduce taxes"
        },
        advanced: {
          description: "For experienced investors seeking sophisticated strategies",
          focus: "Advanced investing, real estate, business finance, estate planning",
          outcomes: "Achieve financial independence, optimize complex strategies, build wealth"
        }
      }
    },
    
    platformFeatures: [
      "Comprehensive video library with 500+ financial education videos",
      "Interactive learning paths tailored to your experience level",
      "Progress tracking and completion certificates",
      "Mobile app for learning on-the-go",
      "Community forums for peer learning and support",
      "Regular content updates with current market insights"
    ],
    
    lastUpdated: new Date().toISOString()
  };

  return {
    props: { learningContent },
    revalidate: 21600, // Update every 6 hours
  };
}

// CSR for interactive learning hub functionality
const LearningHub = dynamic(() => import('../client/src/pages/LearningHub').catch(err => {
  console.error('Failed to load LearningHub component:', err);
  return { default: () => <div className="p-8 text-center text-red-600">Learning Hub temporarily unavailable. Please refresh the page.</div> };
}), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading learning platform...</p>
      </div>
    </div>
  )
});

export default function Page({ learningContent }) {
  return (
    <>
      <Head>
        <title>Learning Hub - Comprehensive Financial Education Platform | DollarMento</title>
        <meta name="description" content="Interactive financial education platform with courses, tutorials, videos, and learning paths. Master personal finance, investing, budgeting, and wealth building through structured educational content." />
        <meta property="og:title" content="Learning Hub - Comprehensive Financial Education Platform" />
        <meta property="og:description" content="Master financial literacy through interactive courses, video tutorials, and personalized learning paths" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollarmento.com/learning-hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Financial Education Learning Hub" />
        <meta name="twitter:description" content="Comprehensive financial education platform with interactive courses and tutorials" />
        <meta name="keywords" content="financial education, learning hub, financial literacy, investment courses, budgeting tutorials, financial planning education, money management courses" />
        <link rel="canonical" href="https://dollarmento.com/learning-hub" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Learning Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial education platform with interactive courses, video tutorials, 
              and personalized learning paths for all skill levels.
            </p>
          </div>

          {/* Interactive Learning Hub */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <LearningHub learningContent={learningContent} />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Financial Education Platform</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {learningContent.educationalContent.overview}
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Structured Learning Paths</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our learning paths provide structured progression through financial education topics, 
                    ensuring comprehensive understanding and practical application of financial concepts.
                  </p>

                  <div className="space-y-6 mb-8">
                    {learningContent.educationalContent.learningPaths.map((path, index) => (
                      <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-blue-800 mb-2">{path.path}</h4>
                        <p className="text-blue-700 mb-3">{path.content}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                          <div>
                            <h5 className="font-semibold mb-1">Modules:</h5>
                            <ul className="space-y-1">
                              {path.modules.map((module, idx) => (
                                <li key={idx}>• {module}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-1">Course Details:</h5>
                            <p><strong>Duration:</strong> {path.duration}</p>
                            <p><strong>Level:</strong> {path.level}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Featured Courses</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our comprehensive course library covers all aspects of personal finance and wealth building, 
                    with detailed modules designed by financial education experts.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {learningContent.educationalContent.courses.map((course, index) => (
                      <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h4 className="font-bold text-green-800 mb-2">{course.title}</h4>
                        <p className="text-green-700 text-sm mb-3">{course.description}</p>
                        <div className="text-sm text-green-700">
                          <h5 className="font-semibold mb-1">Topics Covered:</h5>
                          <ul className="space-y-1">
                            {course.topics.map((topic, idx) => (
                              <li key={idx}>• {topic}</li>
                            ))}
                          </ul>
                          <p className="mt-2"><strong>Duration:</strong> {course.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Learning for Every Level</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our platform adapts to your current financial knowledge and experience, 
                    providing appropriate content and progression for optimal learning outcomes.
                  </p>

                  <div className="space-y-4 mb-8">
                    {Object.entries(learningContent.educationalContent.skillLevels).map(([level, details], index) => (
                      <div key={index} className="border-l-4 border-indigo-300 pl-4">
                        <h4 className="font-semibold text-indigo-700 capitalize">{level} Level</h4>
                        <p className="text-gray-700 text-sm mb-1">{details.description}</p>
                        <p className="text-gray-700 text-sm mb-1"><strong>Focus:</strong> {details.focus}</p>
                        <p className="text-gray-700 text-sm"><strong>Outcomes:</strong> {details.outcomes}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Interactive Learning Features</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our platform combines multiple learning formats and interactive features 
                    to maximize engagement and knowledge retention.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                      <h4 className="font-bold text-purple-800 mb-3">Interactive Features</h4>
                      <ul className="text-purple-700 text-sm space-y-2">
                        {learningContent.educationalContent.interactiveFeatures.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h4 className="font-bold text-orange-800 mb-3">Learning Formats</h4>
                      <ul className="text-orange-700 text-sm space-y-2">
                        {learningContent.educationalContent.learningFormats.map((format, index) => (
                          <li key={index}>• {format}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Platform Benefits</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our learning platform is designed to provide comprehensive financial education 
                    with the flexibility and support you need to succeed.
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {learningContent.platformFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Learning Stats</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Video Lessons</span>
                    <span className="font-semibold">500+</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Learning Paths</span>
                    <span className="font-semibold">3 Levels</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Interactive Tools</span>
                    <span className="font-semibold">45+ Calculators</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Course Topics</span>
                    <span className="font-semibold">20+ Areas</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Start Learning</h3>
                <p className="text-sm mb-4">
                  Begin your financial education journey with personalized learning paths and expert guidance.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold">Free</div>
                  <div className="text-sm opacity-90">Educational content</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Topics</h3>
                <div className="space-y-3">
                  <a href="/budgeting-guide" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Budgeting Fundamentals
                  </a>
                  <a href="/investment-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Investment Basics
                  </a>
                  <a href="/retirement-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Retirement Planning
                  </a>
                  <a href="/debt-calculator" className="block text-blue-600 hover:text-blue-800 font-medium">
                    Debt Management
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
