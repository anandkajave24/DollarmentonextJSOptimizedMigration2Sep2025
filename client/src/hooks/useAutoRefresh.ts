import { useEffect, useState, useRef } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useQueryClient } from "@tanstack/react-query";

interface UseAutoRefreshOptions {
  interval?: number;
  onRefresh?: () => void;
}

export default function useAutoRefresh(options: UseAutoRefreshOptions = {}) {
  const { interval = 60000, onRefresh } = options;
  const queryClient = useQueryClient();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  
  const refreshData = async () => {
    try {
      // Call the refresh API
      await apiRequest("/api/refresh-market-data", { method: "POST" });
      
      // Invalidate all queries to reload data
      await queryClient.invalidateQueries();
      
      // Update last refreshed time
      setLastRefreshed(new Date());
      
      // Call onRefresh callback if provided
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error("Failed to refresh data:", error);
    }
  };
  
  useEffect(() => {
    // Initial refresh
    refreshData();
    
    // Setup interval for auto-refresh
    intervalRef.current = setInterval(refreshData, interval);
    
    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [interval]);
  
  return {
    lastRefreshed,
    refreshData
  };
}
