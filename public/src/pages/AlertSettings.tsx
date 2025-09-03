import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Input } from "../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Separator } from "../components/ui/separator";
import { useToast } from "../hooks/use-toast";
import { Link } from "wouter";

type NotificationChannel = {
  id: string;
  name: string;
  type: "email" | "sms" | "push" | "whatsapp" | "telegram";
  value: string;
  enabled: boolean;
  verified: boolean;
};

type AlertType = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
};

export default function AlertSettings() {
  const { toast } = useToast();
  
  // State for notification channels
  const [channels, setChannels] = useState<NotificationChannel[]>([
    {
      id: "email-1",
      name: "Primary Email",
      type: "email",
      value: "user@example.com",
      enabled: true,
      verified: true
    },
    {
      id: "sms-1",
      name: "Mobile Number",
      type: "sms",
      value: "+91 98765 43210",
      enabled: true,
      verified: true
    },
    {
      id: "push-1",
      name: "Mobile App",
      type: "push",
      value: "This device",
      enabled: true,
      verified: true
    },
    {
      id: "whatsapp-1",
      name: "Email",
      type: "whatsapp",
      value: "+91 98765 43210",
      enabled: false,
      verified: false
    }
  ]);
  
  // State for alert types
  const [alertTypes, setAlertTypes] = useState<AlertType[]>([
    {
      id: "price",
      name: "Price Alerts",
      description: "Notifications when stocks, indices, or other assets reach specified price levels",
      enabled: true
    },
    {
      id: "technical",
      name: "Technical Indicators",
      description: "Alerts based on technical analysis indicators like RSI, MACD, moving averages",
      enabled: true
    },
    {
      id: "news",
      name: "News Alerts",
      description: "Important news updates about your watchlisted companies and markets",
      enabled: true
    },
    {
      id: "portfolio",
      name: "Portfolio Updates",
      description: "Updates about your portfolio performance, rebalancing needs, and allocation drift",
      enabled: true
    },
    {
      id: "reports",
      name: "Earnings Reports",
      description: "Notifications about upcoming earnings reports for companies you follow",
      enabled: true
    }
  ]);
  
  // State for time settings
  const [quietHours, setQuietHours] = useState({
    enabled: false,
    startTime: "22:00",
    endTime: "08:00"
  });
  
  // State for priority threshold
  const [priorityThreshold, setPriorityThreshold] = useState<"all" | "medium" | "high">("all");
  
  // Toggle quiet hours
  const toggleQuietHours = () => {
    setQuietHours({
      ...quietHours,
      enabled: !quietHours.enabled
    });
  };
  
  // Toggle channel enabled status
  const toggleChannel = (channelId: string) => {
    setChannels(channels.map(channel => 
      channel.id === channelId 
        ? {...channel, enabled: !channel.enabled} 
        : channel
    ));
  };
  
  // Toggle alert type enabled status
  const toggleAlertType = (alertTypeId: string) => {
    setAlertTypes(alertTypes.map(alertType => 
      alertType.id === alertTypeId 
        ? {...alertType, enabled: !alertType.enabled} 
        : alertType
    ));
  };
  
  // Verify a channel
  const verifyChannel = (channelId: string) => {
    // In a real app, this would trigger a verification process
    toast({
      title: "Verification Code Sent",
      description: "Please check your device for the verification code.",
    });
    
    // For demo, let's simulate verification after 2 seconds
    setTimeout(() => {
      setChannels(channels.map(channel => 
        channel.id === channelId 
          ? {...channel, verified: true} 
          : channel
      ));
      
      toast({
        title: "Verification Successful",
        description: "Your notification channel has been verified.",
      });
    }, 2000);
  };
  
  // Add a new channel (demo only adds a Telegram channel)
  const addNewChannel = () => {
    const newChannel: NotificationChannel = {
      id: `telegram-${channels.length + 1}`,
      name: "Telegram",
      type: "telegram",
      value: "@username",
      enabled: true,
      verified: false
    };
    
    setChannels([...channels, newChannel]);
    
    toast({
      title: "Channel Added",
      description: "New notification channel has been added. Please verify it.",
    });
  };
  
  // Save settings
  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your alert settings have been updated successfully.",
    });
  };
  
  // Get icon based on channel type
  const getChannelIcon = (type: string) => {
    switch (type) {
      case "email":
        return "email";
      case "sms":
        return "sms";
      case "push":
        return "notifications";
      case "whatsapp":
        return "whatsapp";
      case "telegram":
        return "telegram";
      default:
        return "notifications";
    }
  };
  
  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button 
            onClick={() => window.history.back()}
            className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
          >
            <span className="material-icons text-sm">arrow_back</span>
          </button>
          <h2 className="text-xl font-semibold">Alert Settings</h2>
        </div>
        
        <Link href="/alert-demo">
          <Button size="sm" variant="outline" className="flex items-center">
            <span className="material-icons text-sm mr-1">notifications_active</span>
            Alerts
          </Button>
        </Link>
      </div>
      
      {/* Notification Channels */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-medium">Notification Channels</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={addNewChannel}
              className="flex items-center text-xs"
            >
              <span className="material-icons text-sm mr-1">add</span>
              Add New
            </Button>
          </div>
          
          <div className="space-y-3">
            {channels.map(channel => (
              <div 
                key={channel.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
              >
                <div className="flex items-center">
                  <span className="material-icons text-primary mr-2">
                    {getChannelIcon(channel.type)}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{channel.name}</p>
                    <p className="text-xs text-gray-500">{channel.value}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!channel.verified && channel.type !== 'whatsapp' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => verifyChannel(channel.id)}
                      className="text-xs"
                    >
                      Verify
                    </Button>
                  )}
                  {channel.type === 'whatsapp' && (
                    <Link href="/alert-settings">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs"
                      >
                        Configure
                      </Button>
                    </Link>
                  )}
                  <Switch
                    checked={channel.enabled}
                    onCheckedChange={() => toggleChannel(channel.id)}
                    disabled={!channel.verified}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Alert Types */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="text-base font-medium mb-3">Alert Types</h3>
          
          <div className="space-y-3">
            {alertTypes.map(alertType => (
              <div key={alertType.id} className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">{alertType.name}</p>
                  <p className="text-xs text-gray-500">{alertType.description}</p>
                </div>
                <Switch
                  checked={alertType.enabled}
                  onCheckedChange={() => toggleAlertType(alertType.id)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Quiet Hours */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-medium">Quiet Hours</h3>
            <Switch
              checked={quietHours.enabled}
              onCheckedChange={toggleQuietHours}
            />
          </div>
          
          <p className="text-xs text-gray-500 mb-3">
            During quiet hours, you won't receive any alert notifications. Critical alerts can still be configured to bypass this setting.
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs block mb-1">Start Time</label>
              <Input
                type="time"
                value={quietHours.startTime}
                onChange={(e) => setQuietHours({...quietHours, startTime: e.target.value})}
                disabled={!quietHours.enabled}
              />
            </div>
            <div>
              <label className="text-xs block mb-1">End Time</label>
              <Input
                type="time"
                value={quietHours.endTime}
                onChange={(e) => setQuietHours({...quietHours, endTime: e.target.value})}
                disabled={!quietHours.enabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Priority Settings */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="text-base font-medium mb-3">Priority Threshold</h3>
          
          <p className="text-xs text-gray-500 mb-3">
            Set the minimum priority level for alerts you want to receive
          </p>
          
          <RadioGroup value={priorityThreshold} onValueChange={(value: any) => setPriorityThreshold(value)}>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="all" id="all" />
              <label htmlFor="all" className="text-sm cursor-pointer">All Alerts (Low, Medium, High)</label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="medium" id="medium" />
              <label htmlFor="medium" className="text-sm cursor-pointer">Medium and High Priority Only</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="high" />
              <label htmlFor="high" className="text-sm cursor-pointer">High Priority Only</label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      
      {/* Frequency Settings */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="text-base font-medium mb-3">Notification Frequency</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm">Digest Mode</p>
              <Switch defaultChecked={false} />
            </div>
            <p className="text-xs text-gray-500">
              When enabled, combines multiple alerts into a single notification digest delivered at scheduled intervals
            </p>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <p className="text-sm">Market Hours Only</p>
              <Switch defaultChecked={true} />
            </div>
            <p className="text-xs text-gray-500">
              Only send price and technical alerts during market trading hours (9:15 AM - 3:30 PM), Mon-Fri
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Save Button */}
      <div className="flex justify-end mb-4">
        <Button size="lg" onClick={saveSettings}>
          Save Settings
        </Button>
      </div>
      
      {/* Help Text */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-base font-medium mb-3">About Alert Settings</h3>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="material-icons text-primary mr-2">security</span>
              <div>
                <p className="text-sm font-medium">Privacy & Security</p>
                <p className="text-xs text-gray-500">Your contact information is only used for sending alerts you've requested and will never be shared with third parties.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-primary mr-2">tune</span>
              <div>
                <p className="text-sm font-medium">Custom Alert Creation</p>
                <p className="text-xs text-gray-500">Create custom alerts for specific stocks, indices, or other assets from their respective pages.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-primary mr-2">language</span>
              <div>
                <p className="text-sm font-medium">Real-Time Data</p>
                <p className="text-xs text-gray-500">Alerts are processed using real-time market data with minimal delays to ensure timely notifications.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}