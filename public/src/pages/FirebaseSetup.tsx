import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function FirebaseSetup() {
  const [config, setConfig] = useState({
    apiKey: '',
    projectId: '',
    appId: ''
  });
  const [showOutput, setShowOutput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.apiKey || !config.projectId || !config.appId) {
      alert('Please fill in all fields');
      return;
    }
    setShowOutput(true);
  };

  const copyToClipboard = () => {
    const envVars = `VITE_FIREBASE_API_KEY=${config.apiKey}
VITE_FIREBASE_PROJECT_ID=${config.projectId}
VITE_FIREBASE_APP_ID=${config.appId}`;
    navigator.clipboard.writeText(envVars);
    alert('Environment variables copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Firebase Configuration Setup
            </CardTitle>
            <p className="text-gray-600 text-center">
              Enter your Firebase project configuration values to proceed with deployment
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="apiKey">Firebase API Key</Label>
                <Input
                  id="apiKey"
                  type="text"
                  placeholder="AIzaSyC..."
                  value={config.apiKey}
                  onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500">
                  Found in Firebase Console → Project Settings → General → Your apps → Config
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectId">Project ID</Label>
                <Input
                  id="projectId"
                  type="text"
                  placeholder="rupeesmart-xxxxx"
                  value={config.projectId}
                  onChange={(e) => setConfig(prev => ({ ...prev, projectId: e.target.value }))}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500">
                  Your Firebase project ID
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appId">App ID</Label>
                <Input
                  id="appId"
                  type="text"
                  placeholder="1:123456789:web:abcdef123456"
                  value={config.appId}
                  onChange={(e) => setConfig(prev => ({ ...prev, appId: e.target.value }))}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500">
                  Your Firebase app ID
                </p>
              </div>

              <Button type="submit" className="w-full">
                Generate Environment Variables
              </Button>
            </form>

            {showOutput && (
              <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold mb-2">Environment Variables for Deployment:</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Copy these values and provide them when prompted:
                </p>
                <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
{`VITE_FIREBASE_API_KEY=${config.apiKey}
VITE_FIREBASE_PROJECT_ID=${config.projectId}
VITE_FIREBASE_APP_ID=${config.appId}`}
                </pre>
                <Button onClick={copyToClipboard} className="mt-3">
                  Copy to Clipboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}