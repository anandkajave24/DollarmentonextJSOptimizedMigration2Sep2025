import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Home, BookOpen, Users, DollarSign } from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found - 404 Error | DollarMento</title>
        <meta name="description" content="The page you're looking for doesn't exist. Get back on track with DollarMento's financial education tools and resources." />
        <meta name="keywords" content="404 error, page not found, financial education, personal finance tools" />
        <link rel="canonical" href="https://dollarmento.com/404" />
      </Helmet>
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Card className="w-full max-w-lg mx-4 shadow-xl border-0">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <DollarSign className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
            <p className="text-gray-600 text-lg">
              The page you're looking for doesn't exist. Let's get you back on your financial journey.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 shadow-lg">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
            
            <Link href="/learning">
              <Button variant="outline" className="w-full border-blue-200 hover:bg-blue-50 text-blue-700 font-semibold py-3">
                <BookOpen className="w-4 h-4 mr-2" />
                Start Learning
              </Button>
            </Link>
            
            <Link href="/community">
              <Button variant="outline" className="w-full border-purple-200 hover:bg-purple-50 text-purple-700 font-semibold py-3">
                <Users className="w-4 h-4 mr-2" />
                Join Community
              </Button>
            </Link>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>Need help? Contact us at <a href="mailto:support@dollarmento.com" className="text-blue-600 hover:text-blue-800 underline">support@dollarmento.com</a></p>
          </div>
        </CardContent>
      </Card>
      </div>
    </>
  );
}
