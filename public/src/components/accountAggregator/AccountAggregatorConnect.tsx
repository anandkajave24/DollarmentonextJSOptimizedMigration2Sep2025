import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

// Bank logos
const bankLogos: Record<string, string> = {
  sbi: 'https://1000logos.net/wp-content/uploads/2021/06/SBI-Logo.png',
  hdfc: 'https://1000logos.net/wp-content/uploads/2021/06/HDFC-Bank-Logo.png',
  icici: 'https://1000logos.net/wp-content/uploads/2021/06/ICICI-Bank-Logo.png',
  axis: 'https://1000logos.net/wp-content/uploads/2021/06/Axis-Bank-Logo.png',
  kotak: 'https://companieslogo.com/img/orig/KOTAKBANK.NS-36440c5e.png',
  idfc: 'https://d1.awsstatic.com/apac/customer-references-logos-(%401x---%402x)/IDFC-FIRST-Bank_Logo%402x.4a4410c5048dcc1f41a1a7aab8e33af22084aa22.png',
  federal: 'https://seeklogo.com/images/F/federal-bank-logo-08B52C0FA6-seeklogo.com.png',
};

// Account Aggregator providers
const aaProviders = [
  { id: 'finvu', name: 'Finvu', logo: 'https://www.finvu.in/assets/img/logo.png' },
  { id: 'onemoney', name: 'OneMoney', logo: 'https://www.onemoney.in/assets/images/logo_onemoney.png' },
  { id: 'cams', name: 'CAMS Finserv', logo: 'https://www.camsonline.com/public/img/CAMS-FinServ-logo.png' },
];

interface AccountAggregatorConnectProps {
  onConnectSuccess?: (data: any) => void;
}

const AccountAggregatorConnect = ({ onConnectSuccess }: AccountAggregatorConnectProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [connectStep, setConnectStep] = useState(1); // 1: Select provider, 2: Configure access, 3: Success
  const [consentConfig, setConsentConfig] = useState({
    customerId: '',
    bankId: '',
    timePeriod: '3', // in months
    dataTypes: {
      transactions: true,
      profile: true,
      balances: true
    }
  });

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    setConnectStep(2);
  };

  const handleBankSelect = (bankId: string) => {
    setConsentConfig(prev => ({ ...prev, bankId }));
  };

  const handleTimePeriodChange = (months: string) => {
    setConsentConfig(prev => ({ ...prev, timePeriod: months }));
  };

  const handleDataTypeToggle = (type: 'transactions' | 'profile' | 'balances') => {
    setConsentConfig(prev => ({
      ...prev,
      dataTypes: {
        ...prev.dataTypes,
        [type]: !prev.dataTypes[type]
      }
    }));
  };

  const initiateConsentFlow = async () => {
    setLoading(true);
    try {
      // Create data arrays for API request
      const dataTypes = [];
      const fiTypes = [];

      if (consentConfig.dataTypes.transactions) {
        dataTypes.push('TRANSACTIONS');
        fiTypes.push('DEPOSIT');
      }

      if (consentConfig.dataTypes.profile) {
        dataTypes.push('PROFILE');
        fiTypes.push('PROFILE');
      }

      if (consentConfig.dataTypes.balances) {
        dataTypes.push('SUMMARY');
        fiTypes.push('DEPOSIT');
      }

      // Calculate date range (from N months ago until today)
      const today = new Date();
      const fromDate = new Date();
      fromDate.setMonth(today.getMonth() - parseInt(consentConfig.timePeriod));

      // Make the API request to initiate consent
      const response = await axios.post('/api/account-aggregator/consent', {
        customerId: consentConfig.customerId || 'test-customer', // Customer ID (should be unique per user)
        purpose: 'Personal Finance Management and Analytics',
        dataRange: {
          from: fromDate.toISOString(),
          to: today.toISOString()
        },
        dataTypes,
        fiTypes,
        dataLife: {
          unit: 'MONTH',
          value: 1 // Data consent valid for 1 month
        },
        frequency: {
          unit: 'DAY',
          value: 1 // Frequency of data fetch (daily)
        },
        aggregatorId: selectedProvider
      });

      if (response.data.success) {
        // Store consent handle for later use
        localStorage.setItem('aa_consent_handle', response.data.consentHandle);

        // Open a new window to complete the consent
        const consentWindow = window.open(response.data.redirectUrl, 'aa_consent', 'width=800,height=600');

        // Poll for consent status
        const statusCheckInterval = setInterval(async () => {
          try {
            const statusResponse = await axios.get(`/api/account-aggregator/consent/status/${response.data.consentHandle}`);
            
            if (statusResponse.data.status === 'ACTIVE') {
              clearInterval(statusCheckInterval);
              if (consentWindow) {
                consentWindow.close();
              }
              
              // Consent approved, get the data
              const consentId = statusResponse.data.consentId;
              const dataResponse = await axios.post('/api/account-aggregator/fetch-data', {
                consentId
              });
              
              if (dataResponse.data.success) {
                // Success! Show confirmation and trigger callback
                setConnectStep(3);
                if (onConnectSuccess) {
                  onConnectSuccess(dataResponse.data.data);
                }
                
                toast({
                  title: 'Account Connected Successfully',
                  description: 'Your bank account data has been securely connected through Account Aggregator',
                  variant: 'default'
                });
              }
            } else if (statusResponse.data.status === 'REJECTED') {
              clearInterval(statusCheckInterval);
              if (consentWindow) {
                consentWindow.close();
              }
              
              toast({
                title: 'Consent Rejected',
                description: 'You declined to share your financial data.',
                variant: 'destructive'
              });
            }
          } catch (error) {
            console.error('Error checking consent status:', error);
          }
        }, 5000); // Check every 5 seconds
      }
    } catch (error) {
      console.error('Error initiating consent flow:', error);
      toast({
        title: 'Connection Failed',
        description: 'There was an error connecting to the Account Aggregator service. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button 
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700" 
        onClick={() => setDialogOpen(true)}
      >
        Connect via Account Aggregator
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Connect your Bank Account</DialogTitle>
            <DialogDescription>
              Use India's Account Aggregator framework to securely connect your bank accounts
            </DialogDescription>
          </DialogHeader>

          {connectStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Select an Account Aggregator Provider</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Account Aggregators are RBI-licensed entities that securely transfer your financial data with your consent
              </p>

              <div className="grid grid-cols-3 gap-4">
                {aaProviders.map(provider => (
                  <Card 
                    key={provider.id} 
                    className={`cursor-pointer hover:bg-blue-50 transition-colors ${selectedProvider === provider.id ? 'border-blue-500 bg-blue-50' : ''}`}
                    onClick={() => handleProviderSelect(provider.id)}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <img src={provider.logo} alt={provider.name} className="h-12 mb-2 object-contain" />
                      <span className="text-sm font-medium">{provider.name}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {connectStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">1</div>
                <h3 className="font-medium">Configure data access</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="bank-select">Select your bank</Label>
                  <Select value={consentConfig.bankId} onValueChange={handleBankSelect}>
                    <SelectTrigger id="bank-select" className="w-full">
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sbi">State Bank of India</SelectItem>
                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                      <SelectItem value="icici">ICICI Bank</SelectItem>
                      <SelectItem value="axis">Axis Bank</SelectItem>
                      <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                      <SelectItem value="idfc">IDFC First Bank</SelectItem>
                      <SelectItem value="federal">Federal Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="customer-id">Customer ID or Account Number</Label>
                  <Input 
                    id="customer-id" 
                    placeholder="Enter your bank customer ID or account number" 
                    value={consentConfig.customerId}
                    onChange={e => setConsentConfig(prev => ({ ...prev, customerId: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    This will be used to identify your account with the bank
                  </p>
                </div>

                <div>
                  <Label>Time period for data access</Label>
                  <Select value={consentConfig.timePeriod} onValueChange={handleTimePeriodChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Last 1 month</SelectItem>
                      <SelectItem value="3">Last 3 months</SelectItem>
                      <SelectItem value="6">Last 6 months</SelectItem>
                      <SelectItem value="12">Last 12 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Data to be shared</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Transaction history</span>
                        <p className="text-xs text-muted-foreground">Details of your banking transactions</p>
                      </div>
                      <Switch
                        checked={consentConfig.dataTypes.transactions}
                        onCheckedChange={() => handleDataTypeToggle('transactions')}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Account details</span>
                        <p className="text-xs text-muted-foreground">Basic account information</p>
                      </div>
                      <Switch
                        checked={consentConfig.dataTypes.profile}
                        onCheckedChange={() => handleDataTypeToggle('profile')}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Balance information</span>
                        <p className="text-xs text-muted-foreground">Current and past account balances</p>
                      </div>
                      <Switch
                        checked={consentConfig.dataTypes.balances}
                        onCheckedChange={() => handleDataTypeToggle('balances')}
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={initiateConsentFlow}
                  disabled={loading || !consentConfig.bankId}
                >
                  {loading ? 'Connecting...' : 'Continue to Bank Authorization'}
                </Button>
              </div>
            </div>
          )}

          {connectStep === 3 && (
            <div className="space-y-4 py-4">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Account Connected Successfully</h3>
                <p className="text-muted-foreground mb-4">
                  Your bank account has been securely connected through the Account Aggregator framework
                </p>
                <Button onClick={() => setDialogOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountAggregatorConnect;