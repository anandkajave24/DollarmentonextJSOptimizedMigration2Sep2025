import React from "react";
import { Helmet } from "react-helmet";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Link } from "wouter";

export default function DataDeletion() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>Data Deletion Instructions | RupeeSmart</title>
        <meta name="description" content="Instructions for deleting your data from RupeeSmart, including data shared with Meta platforms like WhatsApp." />
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-6">Data Deletion Instructions</h1>
      
      <div className="prose prose-blue max-w-none mb-8">
        <p className="text-lg">
          At RupeeSmart, we respect your right to control your data. This page explains how you can delete your personal data from our systems, including any data that may have been shared with Meta platforms like WhatsApp.
        </p>
      </div>
      
      <Alert className="mb-8 border-blue-600 bg-blue-50">
        <AlertDescription className="text-blue-800">
          <p className="font-semibold mb-2">WhatsApp Integration Data Deletion</p>
          <p>If you connected your WhatsApp account to RupeeSmart and wish to delete this connection and associated data, follow the specific instructions in the WhatsApp section below.</p>
        </AlertDescription>
      </Alert>
      
      <Card className="mb-8 border-2 border-red-100">
        <CardHeader className="bg-red-50">
          <CardTitle className="text-red-800">Delete Your Data</CardTitle>
          <CardDescription className="text-red-700">
            Options for deleting your data from RupeeSmart systems
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="border-l-4 border-red-500 pl-4 py-2">
            <h3 className="text-lg font-semibold">Option 1: In-App Deletion</h3>
            <p className="mt-2">
              Log in to your RupeeSmart account and go to <strong>Profile &gt; Account Settings &gt; Delete My Data/Account</strong>. Follow the on-screen instructions to complete the data deletion process.
            </p>
          </div>
          
          <div className="border-l-4 border-red-500 pl-4 py-2">
            <h3 className="text-lg font-semibold">Option 2: Email Request</h3>
            <p className="mt-2">
              Send an email to <strong>privacy@rupeesmart.com</strong> with the subject line "Data Deletion Request" from your registered email address. Include your username and specify what data you want deleted.
            </p>
          </div>
          
          <div className="border-l-4 border-red-500 pl-4 py-2">
            <h3 className="text-lg font-semibold">Option 3: API Integration Deletion (Including WhatsApp)</h3>
            <p className="mt-2">
              To delete data that was shared with third-party services (including Meta products like WhatsApp):
            </p>
            <ol className="list-decimal pl-6 mt-2 space-y-2">
              <li>Log in to your RupeeSmart account</li>
              <li>Go to <strong>Notifications &gt; WhatsApp Settings</strong></li>
              <li>Click on <strong>Disconnect WhatsApp</strong></li>
              <li>Confirm by clicking <strong>Disconnect and Delete Data</strong></li>
            </ol>
            <p className="mt-2">
              This will remove your WhatsApp connection and delete all associated data from both RupeeSmart and Meta platforms.
            </p>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 flex justify-between">
          <p className="text-sm text-gray-600">
            For immediate assistance, contact us at support@rupeesmart.com
          </p>
          <Link href="/privacy-policy">
            <Button variant="outline" size="sm">View Privacy Policy</Button>
          </Link>
        </CardFooter>
      </Card>
      
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Data Retention and Deletion Policy</h2>
        
        <div>
          <h3 className="text-xl font-medium mb-2">What Gets Deleted</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Your account information (name, email, phone number)</li>
            <li>Your financial and transaction data</li>
            <li>Your WhatsApp connection and message history</li>
            <li>Your notification preferences and history</li>
            <li>Your device information and session data</li>
            <li>Any data shared with Meta platforms through our integration</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-2">Deletion Timeframe</h3>
          <p>
            Once you submit a deletion request, your data will be deleted from our active systems within 30 days. Backups containing your data may be retained for up to 90 days before being permanently deleted.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-2">WhatsApp and Meta Platform Data</h3>
          <p>
            When you delete your WhatsApp connection, we send a deletion request to Meta platforms to remove any data that was shared through our integration. This deletion typically completes within 90 days as per Meta's data deletion policy.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-2">Legal Retention</h3>
          <p>
            In some cases, we may retain certain information for legal, security, or fraud prevention purposes even after you request deletion. This retained information will be minimized and securely stored.
          </p>
        </div>
      </div>
      
      <div className="mt-12 p-6 bg-primary/5 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Need Help With Data Deletion?</h2>
        <p className="mb-6">
          Our privacy team is available to assist you with any questions or concerns about data deletion.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="bg-red-600 hover:bg-red-700">
            Delete My Data Now
          </Button>
          <Button variant="outline">
            Contact Privacy Team
          </Button>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          For urgent assistance, email privacy@rupeesmart.com or call +91-XXXXX-XXXXX
        </p>
      </div>
    </div>
  );
}