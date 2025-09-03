import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import AccountAggregatorConnect from '../components/accountAggregator/AccountAggregatorConnect';
import AAPartnershipInfo from '../components/accountAggregator/AAPartnershipInfo';
import { getAAAccountSummary } from '../utils/accountAggregatorHelpers';
import FinancialDisclaimer from '../components/FinancialDisclaimer';
import axios from 'axios';
import { 
  Building2, 
  RefreshCcw, 
  Shield, 
  Link2, 
  AlertCircle, 
  Settings, 
  BarChart, 
  Smartphone, 
  Trash2,
  CheckCircle2
} from 'lucide-react';

const AccountConnections = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('aa');
  const [connectedAccounts, setConnectedAccounts] = useState<Array<{
    id: string;
    provider: string;
    bankName: string;
    accountNumber: string;
    lastUpdated: Date;
    status: 'active' | 'expired' | 'pending';
    type: 'aa' | 'direct';
  }>>([]);
  const [consentHistory, setConsentHistory] = useState<Array<{
    id: string;
    provider: string;
    status: string;
    createdAt: Date;
    expiresAt: Date;
    dataRequested: string[];
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load connected accounts and consent history
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch connected accounts
        const accountsResponse = await axios.get('/api/account-aggregator/accounts');
        if (accountsResponse.data.success) {
          setConnectedAccounts(accountsResponse.data.accounts.map((account: any) => ({
            ...account,
            lastUpdated: new Date(account.lastUpdated),
          })));
        }
        
        // Fetch consent history
        const consentResponse = await axios.get('/api/account-aggregator/consents');
        if (consentResponse.data.success) {
          setConsentHistory(consentResponse.data.consents.map((consent: any) => ({
            ...consent,
            createdAt: new Date(consent.createdAt),
            expiresAt: new Date(consent.expiresAt),
          })));
        }
      } catch (error) {
        console.error('Error fetching account data:', error);
        toast({
          title: 'Error Loading Accounts',
          description: 'Could not load your connected accounts. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  const handleRefreshAccount = async (accountId: string) => {
    try {
      const response = await axios.post(`/api/account-aggregator/refresh/${accountId}`);
      if (response.data.success) {
        toast({
          title: 'Account Refreshed',
          description: 'Your account data has been successfully updated.',
        });
        
        // Update the account's last updated timestamp
        setConnectedAccounts(prevAccounts => 
          prevAccounts.map(account => 
            account.id === accountId 
              ? { ...account, lastUpdated: new Date() } 
              : account
          )
        );
      }
    } catch (error) {
      console.error('Error refreshing account:', error);
      toast({
        title: 'Refresh Failed',
        description: 'Could not refresh your account data. Please try again later.',
        variant: 'destructive',
      });
    }
  };
  
  const handleRevokeConsent = async (consentId: string) => {
    try {
      const response = await axios.post(`/api/account-aggregator/consent/revoke/${consentId}`);
      if (response.data.success) {
        toast({
          title: 'Consent Revoked',
          description: 'Your data sharing consent has been successfully revoked.',
        });
        
        // Update the consent status in the list
        setConsentHistory(prevConsents => 
          prevConsents.map(consent => 
            consent.id === consentId 
              ? { ...consent, status: 'REVOKED' } 
              : consent
          )
        );
        
        // Also update any affected accounts
        setConnectedAccounts(prevAccounts => 
          prevAccounts.filter(account => {
            // Remove accounts associated with this consent
            // In a real implementation, you would check if the account is specifically 
            // tied to this consent before removing it
            return account.id !== consentId;
          })
        );
      }
    } catch (error) {
      console.error('Error revoking consent:', error);
      toast({
        title: 'Revoke Failed',
        description: 'Could not revoke your consent. Please try again later.',
        variant: 'destructive',
      });
    }
  };
  
  const handleAccountAggregatorSuccess = (data: any) => {
    // Process the AA data to extract account details
    try {
      const summary = getAAAccountSummary(data);
      
      if (summary.accounts.length > 0) {
        // For this demo, just add a placeholder account record
        // In a real implementation, this would be saved on the server and retrieved via API
        const newAccounts = summary.accounts.map((account, index) => ({
          id: `aa-${Date.now()}-${index}`,
          provider: data.consentId.split('-')[0] || 'finvu', // Extract provider from consent ID or use default
          bankName: account.type || 'Bank Account',
          accountNumber: account.accountNumber,
          lastUpdated: new Date(),
          status: 'active' as const,
          type: 'aa' as const
        }));
        
        setConnectedAccounts(prev => [...prev, ...newAccounts]);
        
        // Also add to consent history
        const newConsent = {
          id: data.consentId,
          provider: data.consentId.split('-')[0] || 'finvu',
          status: 'ACTIVE',
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          dataRequested: ['Transactions', 'Balance']
        };
        
        setConsentHistory(prev => [...prev, newConsent]);
      }
    } catch (error) {
      console.error('Error processing AA data for UI:', error);
    }
  };
  
  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Connect Your Bank Accounts</h1>
        <p className="text-muted-foreground">
          Securely connect your bank accounts to get a complete view of your finances
        </p>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="aa" className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Account Aggregator
          </TabsTrigger>
          <TabsTrigger value="direct" className="flex items-center">
            <Link2 className="w-4 h-4 mr-2" />
            Direct Bank Connection
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="aa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Aggregator Framework</CardTitle>
              <CardDescription>
                India's regulated, secure method for connecting financial accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 flex items-start space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">RBI Regulated</h3>
                    <p className="text-xs text-muted-foreground">
                      Account Aggregators are licensed by the Reserve Bank of India
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 flex items-start space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                    <Settings className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">User Control</h3>
                    <p className="text-xs text-muted-foreground">
                      You decide what data to share and can revoke access anytime
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 flex items-start space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                    <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Better Insights</h3>
                    <p className="text-xs text-muted-foreground">
                      Get comprehensive data directly from your financial institutions
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 flex items-start space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                    <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Works Across Devices</h3>
                    <p className="text-xs text-muted-foreground">
                      Same data access on your mobile app and web browser
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-2 mb-6">
                <AccountAggregatorConnect onConnectSuccess={handleAccountAggregatorSuccess} />
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Connected Accounts</h3>
                {isLoading ? (
                  <div className="text-center p-8">
                    <p className="text-muted-foreground">Loading your connected accounts...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {connectedAccounts.filter(account => account.type === 'aa').length === 0 ? (
                      <div className="text-center p-8 border border-dashed rounded-lg">
                        <p className="text-muted-foreground">No accounts connected yet via Account Aggregator</p>
                      </div>
                    ) : (
                      connectedAccounts
                        .filter(account => account.type === 'aa')
                        .map(account => (
                          <Card key={account.id} className="bg-card">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="bg-primary/10 p-2 rounded-full">
                                    <Building2 className="h-5 w-5 text-primary" />
                                  </div>
                                  <div>
                                    <div className="font-medium">{account.bankName}</div>
                                    <div className="text-sm text-muted-foreground">
                                      {account.accountNumber}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge 
                                    variant={account.status === 'active' ? 'outline' : 'destructive'} 
                                    className={account.status === 'active' ? 'text-green-600 bg-green-50' : ''}
                                  >
                                    {account.status === 'active' && 
                                      <CheckCircle2 className="mr-1 h-3 w-3" />
                                    }
                                    {account.status === 'active' ? 'Active' : 
                                      account.status === 'expired' ? 'Expired' : 'Pending'}
                                  </Badge>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRefreshAccount(account.id)}
                                    title="Refresh account data"
                                  >
                                    <RefreshCcw className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="mt-3 text-xs text-muted-foreground">
                                Last updated: {account.lastUpdated.toLocaleDateString()} at {account.lastUpdated.toLocaleTimeString()}
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Consent History</h3>
                {isLoading ? (
                  <div className="text-center p-8">
                    <p className="text-muted-foreground">Loading your consent history...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {consentHistory.length === 0 ? (
                      <div className="text-center p-8 border border-dashed rounded-lg">
                        <p className="text-muted-foreground">No consent history available</p>
                      </div>
                    ) : (
                      consentHistory.map(consent => (
                        <Card key={consent.id} className="bg-card">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{consent.provider} Consent</div>
                                <div className="text-sm text-muted-foreground">
                                  Data requested: {consent.dataRequested.join(', ')}
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground">
                                  Created: {consent.createdAt.toLocaleDateString()} • 
                                  Expires: {consent.expiresAt.toLocaleDateString()}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge 
                                  variant={
                                    consent.status === 'ACTIVE' ? 'outline' : 
                                    consent.status === 'REVOKED' ? 'destructive' : 'secondary'
                                  }
                                  className={
                                    consent.status === 'ACTIVE' ? 'text-green-600 bg-green-50' : 
                                    consent.status === 'REVOKED' ? 'text-red-600 bg-red-50' : ''
                                  }
                                >
                                  {consent.status}
                                </Badge>
                                {consent.status === 'ACTIVE' && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleRevokeConsent(consent.id)}
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-3 w-3 mr-1" />
                                    Revoke
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="direct" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Direct Bank Connection</CardTitle>
              <CardDescription>
                Connect directly to supported Indian banks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-amber-800">We recommend using Account Aggregator</h3>
                    <p className="text-sm text-amber-700 mt-1">
                      Account Aggregator is more secure, reliable, and supports more Indian banks. Direct connections may require sharing your credentials and have limited functionality.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <Card className="bg-gray-100 cursor-not-allowed opacity-70">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center h-32">
                    <img
                      src="https://1000logos.net/wp-content/uploads/2021/06/SBI-Logo.png"
                      alt="SBI Bank"
                      className="h-12 mb-2 object-contain"
                    />
                    <p className="text-xs text-muted-foreground">Coming Soon</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-100 cursor-not-allowed opacity-70">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center h-32">
                    <img
                      src="https://1000logos.net/wp-content/uploads/2021/06/HDFC-Bank-Logo.png"
                      alt="HDFC Bank"
                      className="h-12 mb-2 object-contain"
                    />
                    <p className="text-xs text-muted-foreground">Coming Soon</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-100 cursor-not-allowed opacity-70">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center h-32">
                    <img
                      src="https://1000logos.net/wp-content/uploads/2021/06/ICICI-Bank-Logo.png"
                      alt="ICICI Bank"
                      className="h-12 mb-2 object-contain"
                    />
                    <p className="text-xs text-muted-foreground">Coming Soon</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-100 cursor-not-allowed opacity-70">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center h-32">
                    <img
                      src="https://1000logos.net/wp-content/uploads/2021/06/Axis-Bank-Logo.png"
                      alt="Axis Bank"
                      className="h-12 mb-2 object-contain"
                    />
                    <p className="text-xs text-muted-foreground">Coming Soon</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Direct bank connections will be available in a future update. We recommend using the Account Aggregator tab for now.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Account Aggregator Partnership Information */}
      <div className="mt-8">
        <AAPartnershipInfo />
      </div>
      
      {/* Account Connections Financial Disclaimer */}
      <div className="mt-8">
        <FinancialDisclaimer 
          variant="default"
          calculatorType="generic"
          size="md"
        />
      </div>
    </div>
  );
};

export default AccountConnections;