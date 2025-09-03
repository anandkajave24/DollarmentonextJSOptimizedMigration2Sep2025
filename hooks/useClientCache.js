import { useState, useEffect } from 'react';

// Simple client-side cache for faster data access
const cache = new Map();

export const useClientCache = (key, fetchFn, ttl = 300000) => { // 5 min TTL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cachedItem = cache.get(key);
    
    if (cachedItem && Date.now() - cachedItem.timestamp < ttl) {
      setData(cachedItem.data);
      return;
    }

    if (fetchFn) {
      setLoading(true);
      Promise.resolve(fetchFn()).then((result) => {
        cache.set(key, { data: result, timestamp: Date.now() });
        setData(result);
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  }, [key, fetchFn, ttl]);

  return { data, loading };
};