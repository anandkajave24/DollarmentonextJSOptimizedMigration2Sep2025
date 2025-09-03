import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";

export default function Legal() {
  const [activeTab, setActiveTab] = useState<string>("terms");
  const [location] = useLocation();
  
  useEffect(() => {
    // Check for tab in URL query parameters
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    
    if (tabParam && ['terms', 'privacy', 'disclaimer'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Legal Documents | RupeeSmart</title>
      </Helmet>

      <div className="container max-w-6xl mx-auto px-4 py-8 pt-20">
        <h1 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
          <span className="material-icons text-blue-600 mr-3">gavel</span>
          Legal Documents
        </h1>
        <p className="text-gray-600 mb-8">
          Please read these documents carefully. They govern your use of RupeeSmart and provide
          important information about your rights and responsibilities.
        </p>

        <Tabs
          defaultValue="terms"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="disclaimer">Disclaimer</TabsTrigger>
          </TabsList>

          <Card className="mt-6">
            <CardContent className="p-6">
              <TabsContent value="terms" className="mt-0">
                <CardTitle className="text-xl font-bold mb-4 flex items-center text-gray-800">
                  <span className="material-icons text-blue-600 mr-2">description</span>
                  Terms & Conditions
                </CardTitle>
                <div className="space-y-4 text-gray-700">
                  <p className="text-sm text-gray-500">Last updated: April 27, 2025</p>
                  
                  <h2 className="text-lg font-semibold mt-6">1. Acceptance of Terms</h2>
                  <p>
                    By accessing and using RupeeSmart ("the App"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the App.
                  </p>
                  
                  <h2 className="text-lg font-semibold mt-6">2. Description of Service</h2>
                  <p>
                    RupeeSmart is a financial education and management platform that provides users with tools, resources, and information to improve their financial literacy and manage their finances. The App offers features such as goal setting, budget tracking, financial education, and portfolio management.
                  </p>
                  
                  <h2 className="text-lg font-semibold mt-6">3. User Accounts</h2>
                  <p>
                    To use certain features of the App, you must create a user account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                  </p>
                  
                  <h2 className="text-lg font-semibold mt-6">4. User Conduct</h2>
                  <p>
                    You agree not to use the App for any unlawful purpose or in any way that could damage, disable, overburden, or impair the App. You further agree not to attempt to gain unauthorized access to any part of the App or any systems or networks connected to the App.
                  </p>
                  
                  <h2 className="text-lg font-semibold mt-6">5. Intellectual Property</h2>
                  <p>
                    All content, features, and functionality of the App, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, are the exclusive property of RupeeSmart and are protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  
                  <h2 className="text-lg font-semibold mt-6">6. Financial Information and Advice</h2>
                  <p>
                    The financial information provided by the App is for educational and informational purposes only and should not be construed as professional financial advice. We recommend consulting with a qualified financial advisor before making any financial decisions.
                  </p>
                  
                  <h2 className="text-lg font-semibold mt-6">7. Data Privacy</h2>
                  <p>
                    Your privacy is important to us. Our collection and use of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                  </p>
                  
                  <h2 className="text-lg font-semibold mt-6">8. Termination</h2>
                  <p>
                    We reserve the right to terminate or suspend your account and access to the App at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
                  </p>
                  
                  <h2 className="text-lg font-semibold mt-6">9. Limitation of Liability</h2>
                  <p>
                    In no event shall RupeeSmart be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the App.
                  </p>
                  
                  <h2 className="text-lg font-semibold mt-6">10. Changes to Terms</h2>
                  <p>
                    We reserve the right to modify these Terms at any time. We will provide notice of any material changes by posting the new Terms on the App. Your continued use of the App after such modifications will constitute your acknowledgment and acceptance of the modified Terms.
                  </p>
                  
                  <h2 className="text-lg font-semibold mt-6">11. Governing Law</h2>
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
                  </p>
                  
                  <h2 className="text-lg font-semibold mt-6">12. Contact Information</h2>
                  <p>
                    If you have any questions or concerns about these Terms, please contact us at support@rupeesmart.com.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="privacy" className="mt-0">
                <CardTitle className="text-xl font-bold mb-4 flex items-center text-gray-800">
                  <span className="material-icons text-blue-600 mr-2">security</span>
                  Privacy Policy
                </CardTitle>
                <div className="space-y-4 text-gray-700">
                  <p className="text-sm text-gray-500">Last updated: April 27, 2025</p>
                  
                  <h2 className="text-lg font-semibold mt-6">1. Introduction</h2>
                  <p>
                    At RupeeSmart, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App. Please read this Privacy Policy carefully.
                  </p>

                  <h2 className="text-lg font-semibold mt-6">2. Information We Collect</h2>
                  <p>
                    We collect several types of information from and about users of our App, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Personal Information:</strong> This includes information that can identify you, such as your name, email address, phone number, and profile picture.
                    </li>
                    <li>
                      <strong>Financial Information:</strong> This includes information about your financial goals, budgets, expenses, investments, and other financial data that you input into the App.
                    </li>
                    <li>
                      <strong>Usage Information:</strong> This includes information about how you interact with our App, such as the features you use, the time spent on the App, and your browsing history within the App.
                    </li>
                    <li>
                      <strong>Device Information:</strong> This includes information about your device, such as your IP address, device type, operating system, and browser type.
                    </li>
                  </ul>

                  <h2 className="text-lg font-semibold mt-6">3. How We Use Your Information</h2>
                  <p>
                    We use the information we collect from you for various purposes, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To provide and maintain our App</li>
                    <li>To personalize your experience on our App</li>
                    <li>To improve our App and develop new features</li>
                    <li>To analyze how our App is used</li>
                    <li>To communicate with you</li>
                    <li>To protect our rights and the rights of our users</li>
                  </ul>

                  <h2 className="text-lg font-semibold mt-6">4. Sharing Your Information</h2>
                  <p>
                    We may share your information with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as hosting, data analysis, and customer service.
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to a valid legal request.
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of the transaction.
                    </li>
                  </ul>

                  <h2 className="text-lg font-semibold mt-6">5. Data Security</h2>
                  <p>
                    We implement appropriate technical and organizational measures to protect your information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                  </p>

                  <h2 className="text-lg font-semibold mt-6">6. Your Rights</h2>
                  <p>
                    Depending on your location, you may have certain rights regarding your personal information, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>The right to access your personal information</li>
                    <li>The right to correct inaccurate or incomplete information</li>
                    <li>The right to delete your personal information</li>
                    <li>The right to restrict or object to processing of your personal information</li>
                    <li>The right to data portability</li>
                  </ul>

                  <h2 className="text-lg font-semibold mt-6">7. Children's Privacy</h2>
                  <p>
                    Our App is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                  </p>

                  <h2 className="text-lg font-semibold mt-6">8. Changes to This Privacy Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>

                  <h2 className="text-lg font-semibold mt-6">9. Contact Us</h2>
                  <p>
                    If you have any questions or concerns about this Privacy Policy, please contact us at privacy@rupeesmart.com.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="disclaimer" className="mt-0">
                <CardTitle className="text-xl font-bold mb-4 flex items-center text-gray-800">
                  <span className="material-icons text-blue-600 mr-2">warning</span>
                  Financial Disclaimer
                </CardTitle>
                <div className="space-y-4 text-gray-700">
                  <p className="text-sm text-gray-500">Last updated: April 27, 2025</p>
                  
                  <h2 className="text-lg font-semibold mt-6">1. Not Financial Advice</h2>
                  <p>
                    The information provided by RupeeSmart ("we," "us," or "our") on our App is for general informational and educational purposes only. It is not intended to be and should not be construed as financial, investment, tax, or legal advice. You should not make any financial, investment, tax, or legal decisions based solely on the information provided on our App.
                  </p>

                  <h2 className="text-lg font-semibold mt-6">2. Consult with Professionals</h2>
                  <p>
                    We strongly recommend that you consult with a qualified financial advisor, investment advisor, tax professional, or legal professional before making any financial, investment, tax, or legal decisions. A professional can provide personalized advice tailored to your specific circumstances, goals, and needs.
                  </p>

                  <h2 className="text-lg font-semibold mt-6">3. Investment Risks</h2>
                  <p>
                    All investments involve risk, including the possible loss of principal. The value of investments can fluctuate, and you may lose some or all of your investment. Past performance is not indicative of future results. Any investment information or recommendations provided on our App are not guaranteed to produce any particular results, and the approaches, strategies, and recommendations described may not be suitable for everyone.
                  </p>

                  <h2 className="text-lg font-semibold mt-6">4. Accuracy of Information</h2>
                  <p>
                    While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on our App for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
                  </p>

                  <h2 className="text-lg font-semibold mt-6">5. External Links</h2>
                  <p>
                    Our App may contain links to external websites or resources. We have no control over the content, privacy policies, or practices of these sites and assume no responsibility for them. The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them.
                  </p>

                  <h2 className="text-lg font-semibold mt-6">6. Financial Planning Tools</h2>
                  <p>
                    Our App may provide financial planning tools, calculators, and simulations. These tools are provided for illustrative and educational purposes only. The results, projections, or estimates generated by these tools are based on the information provided by you and various assumptions, which may not be accurate or appropriate for your specific situation. They should not be considered as guarantees of future results.
                  </p>

                  <h2 className="text-lg font-semibold mt-6">7. Market Data</h2>
                  <p>
                    Any market data, quotes, or similar information provided on our App is for informational purposes only and may be delayed. We do not guarantee the accuracy, timeliness, completeness, or correct sequencing of such information, or warrant any results from your use of or reliance on such information.
                  </p>

                  <h2 className="text-lg font-semibold mt-6">8. Educational Content</h2>
                  <p>
                    The educational content provided on our App, including articles, videos, courses, and any other learning materials, is for general informational purposes only. It is not intended to provide comprehensive coverage of all relevant topics or to be a substitute for professional education or certification.
                  </p>

                  <h2 className="text-lg font-semibold mt-6">9. Limitation of Liability</h2>
                  <p>
                    To the fullest extent permitted by applicable law, we disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We will not be liable for any damages of any kind arising from the use of our App, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
                  </p>

                  <h2 className="text-lg font-semibold mt-6">10. Changes to This Disclaimer</h2>
                  <p>
                    We reserve the right to modify this Disclaimer at any time. Changes and clarifications will take effect immediately upon their posting on the App. We encourage you to check this Disclaimer periodically for any changes.
                  </p>

                  <h2 className="text-lg font-semibold mt-6">11. Contact Us</h2>
                  <p>
                    If you have any questions or concerns about this Disclaimer, please contact us at legal@rupeesmart.com.
                  </p>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
}