/**
 * NS Wealth API Integration Service
 * Handles Account Aggregator data integration with RBI-AA compliance
 */

interface NSWealthAPIConfig {
  baseURL: string;
  apiVersion: string;
  timeout: number;
  retryAttempts: number;
}

interface FinarkinTransactionData {
  categories: FinarkinCategory[];
  insights: TransactionInsight[];
  spending: SpendingAnalysis;
}

interface OneMoneyPortfolioData {
  holdings: PortfolioHolding[];
  performance: PerformanceMetrics;
  allocation: AssetAllocation;
}

interface FinarkinCategory {
  id: string;
  name: string;
  l1Category: string;
  l2Category: string;
  totalAmount: number;
  transactionCount: number;
  avgTransaction: number;
  monthlyTrend: 'up' | 'down' | 'stable';
}

interface TransactionInsight {
  category: string;
  insight: string;
  confidence: number;
  educationalValue: string;
}

interface SpendingAnalysis {
  dailyAverages: {
    oneMonth: number;
    threeMonth: number;
    sixMonth: number;
    lifetime: number;
  };
  patterns: {
    weekdaySpending: number;
    weekendSpending: number;
    monthlyTrend: 'increasing' | 'decreasing' | 'stable';
  };
}

interface PortfolioHolding {
  instrument: string;
  type: 'EQUITY' | 'BOND' | 'MUTUAL_FUND' | 'NPS' | 'INSURANCE';
  value: number;
  allocation: number;
  performance: number;
}

interface PerformanceMetrics {
  totalReturn: number;
  annualizedReturn: number;
  volatility: number;
  sharpeRatio: number;
}

interface AssetAllocation {
  equity: number;
  debt: number;
  gold: number;
  cash: number;
  rebalancingNeeded: boolean;
}

interface AAComplianceData {
  consentId: string;
  consentStatus: 'ACTIVE' | 'EXPIRED' | 'PENDING';
  dataSource: 'NS_WEALTH';
  lastUpdated: string;
  cacheExpiry: string;
  sessionId: string;
}

class NSWealthAPIService {
  private config: NSWealthAPIConfig;
  private sessionCache: Map<string, any> = new Map();
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes per RBI-AA guidelines

  constructor() {
    this.config = {
      baseURL: import.meta.env.VITE_NS_WEALTH_API_URK || 'https://api.nswealth.com',
      apiVersion: 'v1',
      timeout: 30000,
      retryAttempts: 3
    };
  }

  /**
   * Get Finarkin transaction data through NS Wealth API
   */
  async getFinarkinData(userId: string, consentId: string): Promise<FinarkinTransactionData> {
    const cacheKey = `finarkin-${userId}-${consentId}`;
    
    // Check session cache first (RBI-AA compliance)
    const cachedData = this.getFromCache(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await this.makeAPICall('/finarkin/transactions', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          consentId,
          dataTypes: ['CATEGORIES', 'INSIGHTS', 'SPENDING_ANALYSIS'],
          includeEducationalInsights: true
        })
      });

      const data = await response.json();
      
      // Cache data for 30 minutes per RBI-AA guidelines
      this.setCache(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Error fetching Finarkin data:', error);
      throw new Error('Failed to fetch transaction data from NS Wealth API');
    }
  }

  /**
   * Get One Money portfolio data through NS Wealth API
   */
  async getOneMoneyData(userId: string, consentId: string): Promise<OneMoneyPortfolioData> {
    const cacheKey = `onemoney-${userId}-${consentId}`;
    
    // Check session cache first (RBI-AA compliance)
    const cachedData = this.getFromCache(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await this.makeAPICall('/onemoney/portfolio', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          consentId,
          dataTypes: ['HOLDINGS', 'PERFORMANCE', 'ALLOCATION'],
          includeEducationalAnalysis: true
        })
      });

      const data = await response.json();
      
      // Cache data for 30 minutes per RBI-AA guidelines
      this.setCache(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Error fetching One Money data:', error);
      throw new Error('Failed to fetch portfolio data from NS Wealth API');
    }
  }

  /**
   * Get AA compliance status
   */
  async getComplianceStatus(userId: string): Promise<AAComplianceData> {
    try {
      const response = await this.makeAPICall('/compliance/status', {
        method: 'GET',
        headers: {
          'X-User-ID': userId
        }
      });

      return await response.json();
    } catch (error) {
      console.error('Error fetching compliance status:', error);
      throw new Error('Failed to fetch compliance status');
    }
  }

  /**
   * Refresh AA data (triggers new API call)
   */
  async refreshAAData(userId: string, consentId: string): Promise<{
    finarkin: FinarkinTransactionData;
    onemoney: OneMoneyPortfolioData;
  }> {
    // Clear cache to force new API call
    this.clearUserCache(userId);
    
    const [finarkinData, onemoneyData] = await Promise.all([
      this.getFinarkinData(userId, consentId),
      this.getOneMoneyData(userId, consentId)
    ]);

    return {
      finarkin: finarkinData,
      onemoney: onemoneyData
    };
  }

  /**
   * Get cached data compliance information
   */
  getCacheInfo(userId: string): {
    finarkinCached: boolean;
    oneMoneyCached: boolean;
    cacheExpiry: string | null;
  } {
    const finarkinKey = `finarkin-${userId}`;
    const oneMoneyKey = `onemoney-${userId}`;
    
    return {
      finarkinCached: this.sessionCache.has(finarkinKey),
      oneMoneyCached: this.sessionCache.has(oneMoneyKey),
      cacheExpiry: this.sessionCache.get(`${finarkinKey}-expiry`) || null
    };
  }

  /**
   * Clear all cached data for user (on logout per RBI-AA compliance)
   */
  clearUserCache(userId: string): void {
    const keysToRemove = Array.from(this.sessionCache.keys()).filter(key => 
      key.includes(userId)
    );
    
    keysToRemove.forEach(key => {
      this.sessionCache.delete(key);
    });
  }

  /**
   * Private helper methods
   */
  private async makeAPICall(endpoint: string, options: RequestInit): Promise<Response> {
    const url = `${this.config.baseURL}/${this.config.apiVersion}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'X-API-Version': this.config.apiVersion,
      'X-Platform': 'DollarMento-Educational'
    };

    // Create AbortController for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if ((error as Error).name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  private getFromCache(key: string): any | null {
    const cachedData = this.sessionCache.get(key);
    const cachedTime = this.sessionCache.get(`${key}-timestamp`);
    
    if (!cachedData || !cachedTime) {
      return null;
    }

    // Check if cache has expired (30 minutes)
    if (Date.now() - cachedTime > this.CACHE_DURATION) {
      this.sessionCache.delete(key);
      this.sessionCache.delete(`${key}-timestamp`);
      return null;
    }

    return cachedData;
  }

  private setCache(key: string, data: any): void {
    this.sessionCache.set(key, data);
    this.sessionCache.set(`${key}-timestamp`, Date.now());
    this.sessionCache.set(`${key}-expiry`, new Date(Date.now() + this.CACHE_DURATION).toISOString());
  }
}

// Export singleton instance
export const nsWealthAPI = new NSWealthAPIService();
export default nsWealthAPI;

// Export types for use in components
export type {
  FinarkinTransactionData,
  OneMoneyPortfolioData,
  FinarkinCategory,
  TransactionInsight,
  SpendingAnalysis,
  PortfolioHolding,
  PerformanceMetrics,
  AssetAllocation,
  AAComplianceData
};