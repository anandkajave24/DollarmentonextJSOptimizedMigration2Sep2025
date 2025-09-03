import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, CreditCard, Settings, BookOpen, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet";

export default function Profile() {
  // Public profile view - no authentication required
  const mockUser = {
    name: "DollarMento User",
    email: "user@dollarmento.com",
    plan: "Free Access",
    joinDate: "December 2024",
    coursesCompleted: 12,
    calculatorsUsed: 25
  };

  return (
    <>
      <Helmet>
        <title>Your Profile - DollarMento Financial Education Platform</title>
        <meta name="description" content="View your DollarMento profile with learning progress, completed courses, and access to 45+ financial tools and 114+ educational pages." />
        <meta name="keywords" content="user profile, financial education progress, personal finance learning, financial tools dashboard" />
        <link rel="canonical" href="https://dollarmento.com/profile" />
      </Helmet>
      <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <Badge variant="secondary" className="px-3 py-1">
          Public Access
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{mockUser.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Settings className="h-4 w-4" />
                <span>Member since {mockUser.joinDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Badge variant="outline" className="text-lg px-4 py-2">
                {mockUser.plan}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">
                Full access to all financial education tools and calculators
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Learning Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Courses Completed</span>
                <Badge variant="secondary">{mockUser.coursesCompleted}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tools Used</span>
                <Badge variant="secondary">{mockUser.calculatorsUsed}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Activity Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">45+</div>
              <p className="text-sm text-gray-600">Financial Tools Available</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">114+</div>
              <p className="text-sm text-gray-600">Educational Pages</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About DollarMento</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            DollarMento is your comprehensive financial education platform. Access all our tools,
            calculators, and educational content without any restrictions. Learn about budgeting,
            investing, taxes, and more to achieve your financial goals.
          </p>
        </CardContent>
      </Card>
      </div>
    </>
  );
}