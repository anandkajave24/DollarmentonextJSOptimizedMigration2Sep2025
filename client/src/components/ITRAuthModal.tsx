import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';
import { Loader2, Shield, Database, Eye } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { itrApiClient } from '../services/itrApiClient';

interface ITRAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (itrData: any) => void;
}

export function ITRAuthModal({ isOpen, onClose, onSuccess }: ITRAuthModalProps) {
  const [step, setStep] = useState(1);
  const [credentials, setCredentials] = useState({ username: 'ERIP004659', password: 'Nswealth2025$' });
  const [clientData, setClientData] = useState({ pan: '', consent: false });
  const [error, setError] = useState('');

  const authMutation = useMutation({
    mutationFn: (creds: { username: string; password: string }) => 
      itrApiClient.authenticate(creds),
    onSuccess: (data) => {
      if (data.success) {
        setStep(2);
        setError('');
      } else {
        setError(data.message || 'Authentication failed');
      }
    },
    onError: (err: any) => {
      setError(err.message || 'Authentication failed');
    }
  });

  const addClientMutation = useMutation({
    mutationFn: (data: { pan: string; consent: boolean }) => 
      itrApiClient.addClient(data),
    onSuccess: (data) => {
      if (data.success) {
        setStep(3);
        fetchPrefillData();
        setError('');
      } else {
        setError(data.message || 'Failed to add client');
      }
    },
    onError: (err: any) => {
      setError(err.message || 'Failed to add client');
    }
  });

  const prefillMutation = useMutation({
    mutationFn: (data: { pan: string; assessmentYear: string }) => 
      itrApiClient.getPrefillData(data),
    onSuccess: (data) => {
      if (data.success && data.itrData) {
        onSuccess(data.itrData);
        onClose();
        resetModal();
      } else {
        setError(data.message || 'Failed to fetch tax data');
      }
    },
    onError: (err: any) => {
      setError(err.message || 'Failed to fetch tax data');
    }
  });

  const handleAuth = () => {
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }
    authMutation.mutate(credentials);
  };

  const handleAddClient = () => {
    if (!clientData.pan || !clientData.consent) {
      setError('Please enter PAN and provide consent');
      return;
    }
    addClientMutation.mutate(clientData);
  };

  const fetchPrefillData = () => {
    prefillMutation.mutate({
      pan: clientData.pan,
      assessmentYear: '2025-26'
    });
  };

  const resetModal = () => {
    setStep(1);
    setCredentials({ username: '', password: '' });
    setClientData({ pan: '', consent: false });
    setError('');
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Connect to Income Tax Data
          </DialogTitle>
          <DialogDescription>
            Securely connect to your Income Tax Department data for personalized insights.
            Your personal information (name, PAN, address) will be displayed to confirm data authenticity.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">ITD Username</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Enter your ITD username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your password"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  Your credentials are encrypted and never stored
                </span>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800">
                  <span className="font-medium">Personal Data Display:</span> Upon successful connection, your name, PAN, and address will be shown to confirm this is your authentic tax data.
                </p>
              </div>
            </div>
            <Button 
              onClick={handleAuth} 
              className="w-full"
              disabled={authMutation.isPending}
            >
              {authMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Connect to ITD'
              )}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pan">PAN Number</Label>
              <Input
                id="pan"
                type="text"
                value={clientData.pan}
                onChange={(e) => setClientData(prev => ({ ...prev, pan: e.target.value.toUpperCase() }))}
                placeholder="Enter your PAN number"
                maxLength={10}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="consent"
                checked={clientData.consent}
                onCheckedChange={(checked) => setClientData(prev => ({ ...prev, consent: checked as boolean }))}
              />
              <Label htmlFor="consent" className="text-sm">
                I consent to access my tax data for educational insights
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
              <Eye className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800">
                Data is used only for educational analysis and insights
              </span>
            </div>
            <Button 
              onClick={handleAddClient} 
              className="w-full"
              disabled={addClientMutation.isPending}
            >
              {addClientMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Client...
                </>
              ) : (
                'Add Client & Fetch Data'
              )}
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Fetching Your Tax Data</h3>
              <p className="text-sm text-gray-600">
                Retrieving your Form 26AS and ITR data from Income Tax Department...
              </p>
            </div>
            <div className="space-y-2 text-left">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Connected to ITD systems</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Client authorized successfully</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Fetching tax data...</span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}