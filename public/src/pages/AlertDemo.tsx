import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { useToast } from "../hooks/use-toast";
import { Link } from "wouter";

type Alert = {
  id: number;
  type: "price" | "news" | "technical" | "report" | "portfolio";
  status: "triggered" | "pending";
  createdAt: string;
  asset: {
    name: string;
    ticker: string;
    type: "stock" | "index" | "mutual_fund" | "crypto" | "commodity";
  };
  conditions: {
    metric: string;
    operator: ">" | "<" | "=" | ">=" | "<=";
    value: number;
    unit?: string;
  }[];
  message: string;
  triggered?: {
    date: string;
    value: number;
    unit?: string;
  };
  priority: "high" | "medium" | "low";
};

export default function AlertDemo() {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTriggered, setShowTriggered] = useState(true);
  
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      setAlerts(sampleAlerts);
      setIsLoading(false);
    }, 500);
    
    // Set up demo alerts to trigger periodically
    const interval = setInterval(() => {
      triggerRandomAlert();
    }, 15000); // Trigger an alert every 15 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Function to randomly trigger an alert
  const triggerRandomAlert = () => {
    setAlerts(currentAlerts => {
      // Get a list of pending alerts
      const pendingAlerts = currentAlerts.filter(alert => alert.status === "pending");
      
      // If no pending alerts, return current state
      if (pendingAlerts.length === 0) return currentAlerts;
      
      // Select a random pending alert
      const randomIndex = Math.floor(Math.random() * pendingAlerts.length);
      const alertToTrigger = pendingAlerts[randomIndex];
      
      // Show a toast notification
      toast({
        title: "Alert Triggered",
        description: alertToTrigger.message,
        variant: "destructive",
      });
      
      // Update the alert in the list
      return currentAlerts.map(alert => {
        if (alert.id === alertToTrigger.id) {
          // Create a properly typed triggered alert
          const triggeredAlert: Alert = {
            ...alert,
            status: "triggered",
            triggered: {
              date: new Date().toISOString(),
              value: alert.conditions[0].value + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 10,
              unit: alert.conditions[0].unit
            }
          };
          return triggeredAlert;
        }
        return alert;
      });
    });
  };
  
  // Function to manually trigger a specific alert
  const manuallyTriggerAlert = (alertId: number) => {
    setAlerts(currentAlerts => {
      return currentAlerts.map(alert => {
        if (alert.id === alertId) {
          // Create the triggered alert
          const triggeredAlert: Alert = {
            ...alert,
            status: "triggered",
            triggered: {
              date: new Date().toISOString(),
              value: alert.conditions[0].value + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 10,
              unit: alert.conditions[0].unit
            }
          };
          
          // Show a toast notification
          toast({
            title: "Alert Triggered",
            description: alert.message,
            variant: "destructive",
          });
          
          return triggeredAlert;
        }
        return alert;
      });
    });
  };
  
  // Filter alerts based on toggle
  const filteredAlerts = showTriggered ? 
    alerts : 
    alerts.filter(alert => alert.status === "pending");
  
  // Function to get background color based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Function to get icon based on alert type
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "price":
        return "payments";
      case "news":
        return "article";
      case "technical":
        return "analytics";
      case "report":
        return "description";
      case "portfolio":
        return "account_balance";
      default:
        return "notifications";
    }
  };
  
  // Function to get status color
  const getStatusColor = (status: string) => {
    return status === "triggered" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800";
  };
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };
  
  // Reset all alerts to pending
  const resetAlerts = () => {
    setAlerts(currentAlerts => {
      return currentAlerts.map(alert => {
        const resetAlert: Alert = {
          ...alert,
          status: "pending",
          triggered: undefined
        };
        return resetAlert;
      });
    });
    
    toast({
      title: "Alerts Reset",
      description: "All alerts have been reset to pending status.",
    });
  };
  
  // Create a new random alert
  const createRandomAlert = () => {
    const newAlert: Alert = {
      id: Math.max(0, ...alerts.map(a => a.id)) + 1,
      type: ["price", "news", "technical", "report", "portfolio"][Math.floor(Math.random() * 5)] as any,
      status: "pending",
      createdAt: new Date().toISOString(),
      asset: {
        name: ["HDFC Bank", "Reliance Industries", "TCS", "Infosys", "ICICI Bank"][Math.floor(Math.random() * 5)],
        ticker: ["HDFCBANK", "RELIANCE", "TCS", "INFY", "ICICIBANK"][Math.floor(Math.random() * 5)],
        type: "stock"
      },
      conditions: [{
        metric: ["price", "volume", "RSI", "MACD", "EMA"][Math.floor(Math.random() * 5)],
        operator: [">", "<", ">=", "<="][Math.floor(Math.random() * 4)] as any,
        value: Math.floor(Math.random() * 1000) + 100,
        unit: ["₹", "%", "crore", "points"][Math.floor(Math.random() * 4)]
      }],
      message: `Alert for ${["HDFC Bank", "Reliance Industries", "TCS", "Infosys", "ICICI Bank"][Math.floor(Math.random() * 5)]} - ${["Price reached target", "Volume spike detected", "Technical indicator signal", "Earnings report released", "Portfolio allocation threshold reached"][Math.floor(Math.random() * 5)]}`,
      priority: ["high", "medium", "low"][Math.floor(Math.random() * 3)] as any
    };
    
    setAlerts(currentAlerts => [...currentAlerts, newAlert]);
    
    toast({
      title: "Alert Created",
      description: "A new alert has been created successfully.",
    });
  };
  
  return (
    <div className="px-4 py-3">
      <div className="flex items-center mb-4">
        <button 
          onClick={() => window.history.back()}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <h2 className="text-xl font-semibold">Alert Demo</h2>
      </div>
      
      {/* Controls card */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium">Alert Controls</h3>
            <Link href="/alert-settings">
              <Button size="sm" variant="outline" className="flex items-center">
                <span className="material-icons text-sm mr-1">settings</span>
                Settings
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={showTriggered}
                  onCheckedChange={setShowTriggered}
                  id="show-triggered"
                />
                <label htmlFor="show-triggered" className="text-sm cursor-pointer">
                  Show Triggered Alerts
                </label>
              </div>
              
              <Button variant="ghost" size="sm" onClick={resetAlerts}>
                Reset All
              </Button>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={triggerRandomAlert}
                className="flex items-center"
              >
                <span className="material-icons text-sm mr-1">notifications_active</span>
                Trigger Random
              </Button>
              
              <Button 
                size="sm" 
                onClick={createRandomAlert}
                className="flex items-center"
              >
                <span className="material-icons text-sm mr-1">add</span>
                Create Alert
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Alerts list */}
      <div className="mb-2">
        <h3 className="text-base font-medium">
          Your Alerts {filteredAlerts.length > 0 && `(${filteredAlerts.length})`}
        </h3>
      </div>
      
      {isLoading ? (
        <Card>
          <CardContent className="flex justify-center items-center py-8">
            <div className="flex flex-col items-center">
              <span className="material-icons animate-spin mb-2">refresh</span>
              <p className="text-sm text-gray-500">Loading alerts...</p>
            </div>
          </CardContent>
        </Card>
      ) : filteredAlerts.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <span className="material-icons text-gray-400 text-4xl mb-2">notifications_off</span>
            <h3 className="text-lg font-medium mb-2">No Alerts Found</h3>
            <p className="text-sm text-gray-500 mb-4">
              {showTriggered 
                ? "You don't have any alerts set up." 
                : "You don't have any pending alerts."}
            </p>
            <Button onClick={createRandomAlert}>Create Alert</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <span className={`material-icons text-xl mr-2 ${
                      alert.status === "triggered" ? "text-red-500" : "text-gray-500"
                    }`}>
                      {getAlertIcon(alert.type)}
                    </span>
                    <div>
                      <h4 className="font-medium text-sm">{alert.asset.name} ({alert.asset.ticker})</h4>
                      <p className="text-xs text-gray-500">Created: {formatDate(alert.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Badge className={getPriorityColor(alert.priority)}>
                      {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
                    </Badge>
                    <Badge className={getStatusColor(alert.status)}>
                      {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm mb-3">{alert.message}</p>
                
                <div className="bg-gray-50 p-2 rounded-md mb-3">
                  <div className="flex items-center space-x-1 text-xs">
                    <span className="text-gray-500">When</span>
                    <span className="font-medium">{alert.asset.ticker}</span>
                    <span className="text-gray-500">{alert.conditions[0].metric}</span>
                    <span className="font-medium">{alert.conditions[0].operator}</span>
                    <span className="font-medium">{alert.conditions[0].value} {alert.conditions[0].unit}</span>
                  </div>
                </div>
                
                {alert.triggered && (
                  <div className="bg-red-50 p-2 rounded-md mb-3">
                    <div className="flex items-center mb-1">
                      <span className="material-icons text-red-500 text-sm mr-1">warning</span>
                      <span className="text-xs font-medium text-red-700">Triggered on {formatDate(alert.triggered.date)}</span>
                    </div>
                    <div className="text-xs text-red-700">
                      Value at trigger: {alert.triggered.value.toFixed(2)} {alert.triggered.unit}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-2">
                  {alert.status === "pending" ? (
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => manuallyTriggerAlert(alert.id)}
                    >
                      Trigger Now
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setAlerts(alerts.map(a => {
                          if (a.id === alert.id) {
                            const resetAlert: Alert = {
                              ...a, 
                              status: "pending", 
                              triggered: undefined
                            };
                            return resetAlert;
                          }
                          return a;
                        }));
                      }}
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Help text */}
      <Card className="mt-4">
        <CardContent className="p-4">
          <h3 className="text-base font-medium mb-3">About Alert Demo</h3>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="material-icons text-primary mr-2">info</span>
              <div>
                <p className="text-sm font-medium">Test Environment</p>
                <p className="text-xs text-gray-500">This is a demonstration of how alerts work. In the real app, alerts would trigger based on actual market data.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-primary mr-2">notifications_active</span>
              <div>
                <p className="text-sm font-medium">Auto-Trigger</p>
                <p className="text-xs text-gray-500">A random alert is triggered every 15 seconds for demonstration purposes.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-primary mr-2">settings</span>
              <div>
                <p className="text-sm font-medium">Configuration</p>
                <p className="text-xs text-gray-500">Visit the Alert Settings page to customize notification preferences, delivery methods, and alert types.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Sample alerts data
const sampleAlerts: Alert[] = [
  {
    id: 1,
    type: "price",
    status: "pending",
    createdAt: "2025-04-10T09:30:00Z",
    asset: {
      name: "HDFC Bank",
      ticker: "HDFCBANK",
      type: "stock"
    },
    conditions: [
      {
        metric: "price",
        operator: ">",
        value: 1800,
        unit: "₹"
      }
    ],
    message: "HDFC Bank price crossed ₹1,800",
    priority: "high"
  },
  {
    id: 2,
    type: "technical",
    status: "triggered",
    createdAt: "2025-04-09T14:15:00Z",
    asset: {
      name: "Nifty 50",
      ticker: "NIFTY",
      type: "index"
    },
    conditions: [
      {
        metric: "RSI",
        operator: ">",
        value: 70,
        unit: ""
      }
    ],
    message: "Nifty 50 is overbought (RSI > 70)",
    triggered: {
      date: "2025-04-11T10:45:00Z",
      value: 72.4
    },
    priority: "medium"
  },
  {
    id: 3,
    type: "news",
    status: "pending",
    createdAt: "2025-04-11T08:00:00Z",
    asset: {
      name: "Reliance Industries",
      ticker: "RELIANCE",
      type: "stock"
    },
    conditions: [
      {
        metric: "news sentiment",
        operator: "<",
        value: -0.5,
        unit: ""
      }
    ],
    message: "Negative news detected for Reliance Industries",
    priority: "medium"
  },
  {
    id: 4,
    type: "portfolio",
    status: "triggered",
    createdAt: "2025-04-08T16:30:00Z",
    asset: {
      name: "IT Sector",
      ticker: "NIFTYIT",
      type: "index"
    },
    conditions: [
      {
        metric: "allocation",
        operator: ">",
        value: 30,
        unit: "%"
      }
    ],
    message: "IT sector allocation exceeded 30% of portfolio",
    triggered: {
      date: "2025-04-10T15:20:00Z",
      value: 32.7,
      unit: "%"
    },
    priority: "low"
  },
  {
    id: 5,
    type: "report",
    status: "pending",
    createdAt: "2025-04-07T09:15:00Z",
    asset: {
      name: "Infosys",
      ticker: "INFY",
      type: "stock"
    },
    conditions: [
      {
        metric: "earnings release",
        operator: "=",
        value: 1,
        unit: ""
      }
    ],
    message: "Infosys Q4 earnings report release today",
    priority: "high"
  },
  {
    id: 6,
    type: "price",
    status: "pending",
    createdAt: "2025-04-11T11:45:00Z",
    asset: {
      name: "TCS",
      ticker: "TCS",
      type: "stock"
    },
    conditions: [
      {
        metric: "price",
        operator: "<",
        value: 3200,
        unit: "₹"
      }
    ],
    message: "TCS price dropped below ₹3,200",
    priority: "medium"
  },
  {
    id: 7,
    type: "technical",
    status: "triggered",
    createdAt: "2025-04-06T10:00:00Z",
    asset: {
      name: "Bank Nifty",
      ticker: "BANKNIFTY",
      type: "index"
    },
    conditions: [
      {
        metric: "MACD",
        operator: "<",
        value: 0,
        unit: ""
      }
    ],
    message: "BANKNIFTY MACD crossed below signal line",
    triggered: {
      date: "2025-04-09T14:30:00Z",
      value: -12.8
    },
    priority: "high"
  }
];