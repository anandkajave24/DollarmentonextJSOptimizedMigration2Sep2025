import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Phone, Mail, Globe } from 'lucide-react';

const AAPartnershipInfo: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <Badge variant="secondary" className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-100">Business Integration</Badge>
        <CardTitle>Account Aggregator Partnerships</CardTitle>
        <CardDescription>
          Contact details for licensed Account Aggregator providers in India
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-sm text-gray-600 mb-4">
          RupeeSmart can integrate with Account Aggregator providers for secure financial data access. 
          Here are the RBI-licensed Account Aggregators you can partner with:
        </p>

        <Tabs defaultValue="provider-list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="provider-list">Provider List</TabsTrigger>
            <TabsTrigger value="integration-steps">Integration Steps</TabsTrigger>
          </TabsList>
          
          <TabsContent value="provider-list" className="pt-4">
            <div className="space-y-4">
              {providers.map((provider) => (
                <div 
                  key={provider.id} 
                  className="border rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-blue-100 rounded-lg">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{provider.name}</h3>
                      <p className="text-sm text-gray-600">{provider.description}</p>
                      
                      <div className="mt-4 space-y-2">
                        {provider.contact.email && (
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{provider.contact.email}</span>
                          </div>
                        )}
                        
                        {provider.contact.phone && (
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{provider.contact.phone}</span>
                          </div>
                        )}
                        
                        {provider.contact.website && (
                          <div className="flex items-center text-sm">
                            <Globe className="h-4 w-4 mr-2 text-gray-400" />
                            <a 
                              href={provider.contact.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {provider.contact.website.replace(/^https?:\/\//, '')}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="integration-steps" className="pt-4">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-medium text-lg mb-2">Step-by-Step Integration Process</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li className="pl-2">Identify and evaluate potential AA partners from the list</li>
                  <li className="pl-2">Initiate contact and understand their API offerings and integration processes</li>
                  <li className="pl-2">Discuss pricing models (per account charges ranging from ₹0.30 to ₹9.90)</li>
                  <li className="pl-2">Formalize partnership with an agreement adhering to RBI guidelines</li>
                  <li className="pl-2">Integrate their APIs into RupeeSmart</li>
                  <li className="pl-2">Implement user consent flows as per DEPA guidelines</li>
                  <li className="pl-2">Test thoroughly before going live</li>
                </ol>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <h3 className="font-medium text-lg mb-2">Typical Pricing Models</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                  <li className="pl-2">Per Account Charge: ₹0.30 to ₹9.90 depending on data type</li>
                  <li className="pl-2">Per API Call: Varies by provider</li>
                  <li className="pl-2">Subscription Models: Monthly or annual plans for set number of calls</li>
                </ul>
                <p className="mt-3 text-sm text-gray-600">
                  Negotiate pricing based on your expected usage volume and patterns.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-medium text-lg mb-2">Benefits of AA Integration</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                  <li className="pl-2">RBI-regulated secure framework for financial data access</li>
                  <li className="pl-2">User-controlled consent with clear scope and duration</li>
                  <li className="pl-2">Access to standardized financial data across institutions</li>
                  <li className="pl-2">Compliant with all Indian data privacy regulations</li>
                  <li className="pl-2">Enhanced user trust and experience</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Provider data from the user's request
const providers = [
  {
    id: 'camsfinserv',
    name: 'CAMS Finserv',
    description: 'One of the leading Account Aggregators with a robust API ecosystem',
    contact: {
      email: 'info@camsfinserv.com',
      phone: '+91-99672-32000 (Tejinder Singh)',
      website: 'https://camsfinserv.com/'
    }
  },
  {
    id: 'finvu',
    name: 'Finvu (Cookiejar Technologies)',
    description: 'Specialized in secure financial data aggregation and consent management',
    contact: {
      email: 'finvusales@cookiejar.co.in',
      phone: '+91-70306-08902 (Vamsi Madhav)',
      website: 'https://finvu.in/'
    }
  },
  {
    id: 'onemoney',
    name: 'OneMoney (FinSec AA Solutions)',
    description: 'Comprehensive account aggregation with focus on user experience',
    contact: {
      email: 'kp@onemoney.in (A Krishna Prasad)',
      phone: '+91-90300-98999',
      website: 'https://www.onemoney.in/'
    }
  },
  {
    id: 'anumati',
    name: 'Anumati (Perfios)',
    description: 'Financial data analytics and account aggregation solutions',
    contact: {
      email: 'kantharaju.hg@perfios-aa.com (Kantharaju H G)',
      phone: '+91-94482-06567',
      website: 'https://www.anumati.co.in/'
    }
  },
  {
    id: 'setu',
    name: 'Setu (Agya Technologies)',
    description: 'Modern API infrastructure for account aggregation and financial services',
    contact: {
      email: 'contact@agya.co (Nikhil Kumar)',
      phone: '+91-98869-44331',
      website: 'https://setu.co/data/financial-data-apis/account-aggregator/'
    }
  }
];

export default AAPartnershipInfo;