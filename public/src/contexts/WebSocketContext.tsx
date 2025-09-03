import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "../hooks/use-toast";

interface WebSocketContextType {
  socket: WebSocket | null;
  connected: boolean;
  autoRefreshActive: boolean;
  lastUpdate: Date | null;
  startAutoRefresh: (intervalMs?: number) => void;
  stopAutoRefresh: () => void;
  refreshMarketData: () => Promise<void>;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [autoRefreshActive, setAutoRefreshActive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Initialize WebSocket connection
  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    const newSocket = new WebSocket(wsUrl);
    
    newSocket.onopen = () => {
      console.log("WebSocket connected");
      setConnected(true);
      toast({
        title: "Connected to RupeeSmart data service",
        description: "You will receive real-time market updates",
      });
      
      // If user is logged in, send authentication
      if (user) {
        newSocket.send(JSON.stringify({ 
          type: 'auth',
          userId: user.id 
        }));
      }
    };
    
    newSocket.onclose = () => {
      console.log("WebSocket disconnected");
      setConnected(false);
      setAutoRefreshActive(false);
    };
    
    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
      toast({
        title: "Connection error",
        description: "Failed to connect to real-time data service",
        variant: "destructive",
      });
    };
    
    newSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("WebSocket message received:", data.type);
        
        // Handle different message types
        if (data.type === 'market-update') {
          setLastUpdate(new Date(data.timestamp));
          // Dispatch events to update UI with new data
          window.dispatchEvent(new CustomEvent('market-data-update', { 
            detail: data.data 
          }));
        } else if (data.type === 'auto-refresh-status') {
          setAutoRefreshActive(data.status === 'started');
          if (data.status === 'started') {
            toast({
              title: "Auto-refresh enabled",
              description: `Market data will refresh every ${data.interval / 1000} seconds`,
            });
          } else {
            toast({
              title: "Auto-refresh disabled",
              description: "Manual refresh is still available",
            });
          }
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    
    setSocket(newSocket);
    
    // Cleanup on unmount
    return () => {
      if (newSocket.readyState === WebSocket.OPEN) {
        newSocket.close();
      }
    };
  }, []); // Only run once on component mount
  
  // Update authentication when user changes
  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN && user) {
      socket.send(JSON.stringify({ 
        type: 'auth',
        userId: user.id 
      }));
    }
  }, [user, socket]);
  
  // Start auto-refresh
  const startAutoRefresh = useCallback((intervalMs: number = 30000) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ 
        type: 'start-auto-refresh',
        interval: intervalMs
      }));
    } else {
      toast({
        title: "Connection error",
        description: "Cannot start auto-refresh: not connected to data service",
        variant: "destructive",
      });
    }
  }, [socket, toast]);
  
  // Stop auto-refresh
  const stopAutoRefresh = useCallback(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'stop-auto-refresh' }));
    }
  }, [socket]);
  
  // Manual refresh
  const refreshMarketData = useCallback(async () => {
    try {
      await fetch('/api/refresh-market-data', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      toast({
        title: "Data refreshed",
        description: "Market data has been updated",
      });
    } catch (error) {
      console.error("Error refreshing market data:", error);
      toast({
        title: "Refresh failed",
        description: "Could not update market data",
        variant: "destructive",
      });
    }
  }, [toast]);
  
  return (
    <WebSocketContext.Provider value={{
      socket,
      connected,
      autoRefreshActive,
      lastUpdate,
      startAutoRefresh,
      stopAutoRefresh,
      refreshMarketData,
    }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
}