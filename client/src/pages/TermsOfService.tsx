import React from "react";
import { Helmet } from "react-helmet";

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>Terms of Service | DollarMento</title>
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <div className="prose prose-blue max-w-none">
        <p className="text-lg mb-4">
          Last updated: May 3, 2025
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
        <p>
          By accessing or using DollarMento's services, website, and mobile application (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
        <p>
          DollarMento is a financial education platform that helps American users learn about personal finance, manage budgets, and gain insights into their financial health. The Service may include features such as:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Financial transaction tracking and categorization</li>
          <li>Budget creation and monitoring</li>
          <li>Spending insights and analytics</li>
          <li>Financial calculators and planning tools</li>
          <li>SMS transaction parsing</li>
          <li>Email notifications for financial alerts</li>
          <li>Investment tracking and recommendations</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
        <p>
          To use certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
        </p>
        <p>
          You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Content</h2>
        <p>
          Our Service allows you to input, upload, and share content such as financial data, transaction information, and personal financial goals. You retain ownership of any intellectual property rights that you hold in that content.
        </p>
        <p>
          By submitting content to the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and display such content for the purpose of providing and improving the Service.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. SMS and Email Notifications</h2>
        <p>
          Our Service may request access to your SMS messages to automatically extract financial transaction data. This access is entirely optional and requires your explicit permission. We only process messages that contain financial transaction information and do not read personal communications.
        </p>
        <p>
          If you choose to enable email notifications, our Service will send financial alerts, reminders, and updates to your registered email address. You can opt out of these notifications at any time through your account settings.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Acceptable Use</h2>
        <p>
          You agree not to use the Service:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>In any way that violates any applicable law or regulation</li>
          <li>To transmit any material that is defamatory, offensive, or otherwise objectionable</li>
          <li>To attempt to gain unauthorized access to any part of the Service</li>
          <li>To interfere with or disrupt the Service or servers or networks connected to the Service</li>
          <li>To collect or track the personal information of others</li>
          <li>To impersonate or attempt to impersonate DollarMento, a company employee, or another user</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Financial Information and Advice</h2>
        <p>
          The financial information provided through the Service is for informational and educational purposes only and should not be construed as financial advice. We do not guarantee the accuracy, completeness, or usefulness of any information presented.
        </p>
        <p>
          You should consult with a qualified financial professional before making any financial decisions based on information obtained through the Service.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Third-Party Links and Services</h2>
        <p>
          The Service may contain links to third-party websites or services that are not owned or controlled by DollarMento. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Termination</h2>
        <p>
          We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms.
        </p>
        <p>
          Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or delete your account through the account settings.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Limitation of Liability</h2>
        <p>
          In no event shall DollarMento, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Your access to or use of or inability to access or use the Service</li>
          <li>Any conduct or content of any third party on the Service</li>
          <li>Any content obtained from the Service</li>
          <li>Unauthorized access, use, or alteration of your transmissions or content</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">11. Disclaimer</h2>
        <p>
          The Service is provided on an "AS IS" and "AS AVAILABLE" basis. DollarMento disclaims all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">12. Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">13. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">14. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <p className="mb-8">
          Email: terms@dollarwise.com<br />
          Address: DollarMento Financial Services, 123 Finance Street, Mumbai, India 400001
        </p>
      </div>
    </div>
  );
}