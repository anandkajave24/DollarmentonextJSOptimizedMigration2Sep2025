import React, { useState, useEffect } from "react";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RefreshCw, Wifi, WifiOff, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RealTimeUpdates() {
  const { 
    connected, 
    autoRefreshActive, 
    lastUpdate, 
    startAutoRefresh, 
    stopAutoRefresh, 
    refreshMarketData 
  } = useWebSocket();

  const [refreshInterval, setRefreshInterval] = useState(30); // in seconds

  // Handle auto-refresh toggle
  const handleAutoRefreshToggle = (checked: boolean) => {
    if (checked) {
      startAutoRefresh(refreshInterval * 1000);
    } else {
      stopAutoRefresh();
    }
  };

  // Format time since last update
  const formatLastUpdate = () => {
    if (!lastUpdate) return "Never";
    
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000);
    
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    return `${Math.floor(diff / 3600)} hours ago`;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Market Data Updates</CardTitle>
          <Badge 
            variant={connected ? "default" : "destructive"}
            className="h-6 px-2 flex items-center gap-1"
          >
            {connected ? (
              <>
                <Wifi className="h-3 w-3" /> Connected
              </>
            ) : (
              <>
                <WifiOff className="h-3 w-3" /> Disconnected
              </>
            )}
          </Badge>
        </div>
        <CardDescription>
          Keep market data fresh with automatic updates
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center space-x-2">
            <Switch 
              id="auto-refresh"
              checked={autoRefreshActive}
              onCheckedChange={handleAutoRefreshToggle}
              disabled={!connected}
            />
            <Label htmlFor="auto-refresh">Auto-refresh</Label>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              Update interval: {refreshInterval} seconds
            </span>
          </div>
        </div>
        
        <div className="w-full flex items-center justify-between py-2 text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <span>Refresh frequency:</span>
          </div>
          <div className="flex space-x-1">
            {[10, 30, 60].map((seconds) => (
              <Button
                key={seconds}
                size="sm"
                variant={refreshInterval === seconds ? "default" : "outline"}
                className={cn(
                  "h-7 px-2",
                  refreshInterval === seconds ? "" : "text-muted-foreground"
                )}
                onClick={() => {
                  setRefreshInterval(seconds);
                  if (autoRefreshActive) {
                    stopAutoRefresh();
                    startAutoRefresh(seconds * 1000);
                  }
                }}
                disabled={!connected}
              >
                {seconds}s
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-1">
        <div className="text-sm text-muted-foreground flex items-center">
          <Clock className="h-3 w-3 mr-1 inline" /> Last update: {formatLastUpdate()}
        </div>
        <Button 
          size="sm"
          variant="outline"
          className="h-8"
          onClick={() => refreshMarketData()}
          disabled={!connected}
        >
          <RefreshCw className="h-3 w-3 mr-1" /> Refresh Now
        </Button>
      </CardFooter>
    </Card>
  );
}