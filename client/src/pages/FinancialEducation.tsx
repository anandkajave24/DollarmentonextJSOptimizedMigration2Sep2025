import { TabPills, TabItem } from "../components/ui/tab-pills";
import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { SEO } from '../components/SEO';

type CourseType = {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  image: string;
  category: string;
};

type ArticleType = {
  id: number;
  title: string;
  snippet: string;
  date: string;
  readTime: string;
  category: string;
};

export default function FinancialEducation() {
  return (
    <>
      <SEO 
        title="Financial Education - Free Courses & Learning Resources"
        description="Access comprehensive financial education with free courses, articles, and resources. Learn investing, budgeting, debt management, and personal finance from expert educators."
        keywords="financial education, financial courses, investing education, personal finance learning, budgeting courses, debt management education, financial literacy, money management education"
        canonical="https://dollarmento.com/financial-education"
      />
      <FinancialEducationContent />
    </>
  );
}

function FinancialEducationContent() {
  const [courses] = useState<CourseType[]>([
    {
      id: 1,
      title: "Investing Basics",
      description: "Learn the fundamentals of investing and how to build a diversified portfolio.",
      duration: "4 weeks",
      level: "Beginner",
      image: "school",
      category: "investing"
    },
    {
      id: 2,
      title: "Stock Market Fundamentals",
      description: "Understand how the stock market works and learn to analyze stocks.",
      duration: "6 weeks",
      level: "Intermediate",
      image: "trending_up",
      category: "investing"
    },
    {
      id: 3,
      title: "Personal Finance 101",
      description: "Master the essentials of budgeting, savings, and debt management.",
      duration: "3 weeks",
      level: "Beginner",
      image: "account_balance_wallet",
      category: "personal-finance"
    },
    {
      id: 4,
      title: "Tax Planning Strategies",
      description: "Learn to optimize your taxes and maximize your savings.",
      duration: "2 weeks",
      level: "Intermediate",
      image: "receipt_long",
      category: "tax"
    },
    {
      id: 5,
      title: "Retirement Planning",
      description: "Plan for a secure retirement with strategies for long-term wealth building.",
      duration: "5 weeks",
      level: "All Levels",
      image: "calendar_today",
      category: "planning"
    },
    {
      id: 6,
      title: "Mutual Funds Masterclass",
      description: "A comprehensive guide to understanding and investing in index funds.",
      duration: "4 weeks",
      level: "Intermediate",
      image: "pie_chart",
      category: "investing"
    }
  ]);

  const [articles] = useState<ArticleType[]>([
    {
      id: 1,
      title: "How to Start Investing with Just $500 per Month",
      snippet: "Building wealth doesn't require large sums of money. Learn how to start small and grow your investments over time.",
      date: "April 8, 2023",
      readTime: "5 min read",
      category: "investing"
    },
    {
      id: 2,
      title: "Understanding the Power of Compound Interest",
      snippet: "Discover how compound interest can transform your savings and why starting early is crucial.",
      date: "March 22, 2023",
      readTime: "4 min read",
      category: "personal-finance"
    },
    {
      id: 3,
      title: "Top 5 Tax-Saving Investments for Salaried Professionals",
      snippet: "Learn about the most effective tax-saving instruments available to reduce your tax liability.",
      date: "February 15, 2023",
      readTime: "6 min read",
      category: "tax"
    },
    {
      id: 4,
      title: "Emergency Fund: Why You Need One and How to Build It",
      snippet: "Financial security starts with having a solid emergency fund. Here's how to create one.",
      date: "January 28, 2023",
      readTime: "3 min read",
      category: "personal-finance"
    },
    {
      id: 5,
      title: "A Beginner's Guide to Debt Mutual Funds",
      snippet: "Understand what debt index funds are and how they can fit into your investment strategy.",
      date: "January 10, 2023",
      readTime: "7 min read",
      category: "investing"
    }
  ]);

  return (
    <div className="px-4 py-3">
      <div className="flex items-center mb-4">
        <button 
          onClick={() => window.history.back()}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <h2 className="text-xl font-semibold">Financial Education</h2>
      </div>

      <Tabs defaultValue="courses">
        <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-transparent p-0 border-0 w-full">
          <TabsTrigger value="courses" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Courses</TabsTrigger>
          <TabsTrigger value="articles" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Articles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="mt-0">
          <div className="space-y-4">
            <div className="flex overflow-x-auto py-2 gap-2 no-scrollbar">
              <div className="px-3 py-1 bg-primary text-white text-sm rounded-full whitespace-nowrap">All</div>
              <div className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap">Investing</div>
              <div className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap">Personal Finance</div>
              <div className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap">Tax Planning</div>
              <div className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap">Retirement</div>
            </div>
            
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-20 h-20 bg-primary bg-opacity-10 flex items-center justify-center">
                      <span className="material-icons text-primary text-3xl">{course.image}</span>
                    </div>
                    <div className="p-3 flex-1">
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{course.description}</p>
                      <div className="flex justify-between mt-2">
                        <div className="flex space-x-2">
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{course.duration}</span>
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{course.level}</span>
                        </div>
                        <button className="text-xs text-primary font-medium">Start</button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="articles" className="mt-0">
          <div className="space-y-4">
            <div className="flex overflow-x-auto py-2 gap-2 no-scrollbar">
              <div className="px-3 py-1 bg-primary text-white text-sm rounded-full whitespace-nowrap">All</div>
              <div className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap">Investing</div>
              <div className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap">Personal Finance</div>
              <div className="px-3 py-1 bg-gray-100 text-sm rounded-full whitespace-nowrap">Tax Planning</div>
            </div>
            
            {articles.map((article) => (
              <Card key={article.id}>
                <CardContent className="p-4">
                  <h3 className="font-medium">{article.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{article.snippet}</p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-xs text-gray-500">
                      {article.date} • {article.readTime}
                    </div>
                    <button className="text-xs text-primary font-medium">Read</button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardContent className="p-4">
          <h3 className="text-base font-medium mb-3">Financial Dictionary</h3>
          
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium">investment (Systematic Investment Plan)</h4>
              <p className="text-xs text-gray-500">A method of investing a fixed amount regularly in index funds.</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium">XIRR (Extended Internal Rate of Return)</h4>
              <p className="text-xs text-gray-500">A method to calculate returns on investments made at irregular intervals.</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium">NAV (Net Asset Value)</h4>
              <p className="text-xs text-gray-500">The per-unit market value of a mutual fund, calculated daily.</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium">ELSS (Equity Linked Saving Scheme)</h4>
              <p className="text-xs text-gray-500">Tax-saving index funds that primarily invest in equities.</p>
            </div>
            
            <div className="flex justify-center">
              <button className="text-xs text-primary font-medium">View Full Dictionary</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}