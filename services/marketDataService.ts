import { apiRequest } from '@/lib/queryClient';

export interface MarketDataResponse {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: string;
}

export interface StockPrice {
  symbol: string;
  companyName: string;
  exchange: string;
  market: string;
  currency: string;
  ticker: string;
  lastPrice: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  volume: number;
  change: number;
  changePercent: number;
  marketCap: number;
  peRatio: number;
  bookValue: number;
  dividendYield: number;
  sector: string;
  industry: string;
  beta: number;
  eps: number;
  "52WeekHigh": number;
  "52WeekLow": number;
  avgVolume: number;
  timestamp: string;
  dataSource: string;
}

export interface MarketIndex {
  name: string;
  ticker: string;
  lastPrice: number;
  openPrice: number;
  change: number;
  changePercent: number;
  market: string;
  timestamp: string;
}

export interface MarketMover {
  stocks: StockPrice[];
  market: string;
  type: 'gainers' | 'losers';
  timestamp: string;
}

export interface SectorPerformance {
  market: string;
  sectors: {
    [sectorName: string]: {
      sector: string;
      avgChangePercent: number;
      stocksTracked: number;
      stocks: { [symbol: string]: StockPrice };
    };
  };
  timestamp: string;
}

export interface MarketOverview {
  market: string;
  indices: {
    market: string;
    indices: { [indexName: string]: MarketIndex };
    timestamp: string;
  };
  gainers: MarketMover;
  losers: MarketMover;
  sectors: SectorPerformance;
  timestamp: string;
}

export interface PortfolioData {
  stocks: { [symbol: string]: StockPrice };
  summary: {
    totalStocks: number;
    successfulFetches: number;
    failedFetches: number;
    successRate: number;
    timestamp: string;
    dataSource: string;
  };
}

class MarketDataService {
  private baseUrl = '/api/market';

  // Single stock price
  async getStockPrice(symbol: string, exchange: string = 'NSE'): Promise<StockPrice | null> {
    try {
      const response = await fetch(`${this.baseUrl}/stock/${symbol}?exchange=${exchange}`);
      const result: MarketDataResponse = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      
      console.error('Failed to fetch stock price:', result.error);
      return null;
    } catch (error) {
      console.error('Error fetching stock price:', error);
      return null;
    }
  }

  // Multiple stock prices
  async getMultipleStocks(symbols: string[], exchange: string = 'NSE'): Promise<{ [symbol: string]: StockPrice }> {
    try {
      const response = await apiRequest(`${this.baseUrl}/stocks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbols, exchange })
      });
      
      const result: MarketDataResponse = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      
      console.error('Failed to fetch multiple stocks:', result.error);
      return {};
    } catch (error) {
      console.error('Error fetching multiple stocks:', error);
      return {};
    }
  }

  // Portfolio prices with intelligent fallback
  async getPortfolioPrices(symbols: string[]): Promise<PortfolioData> {
    try {
      const response = await apiRequest(`${this.baseUrl}/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbols })
      });
      
      const result: MarketDataResponse = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      
      console.error('Failed to fetch portfolio prices:', result.error);
      return {
        stocks: {},
        summary: {
          totalStocks: symbols.length,
          successfulFetches: 0,
          failedFetches: symbols.length,
          successRate: 0,
          timestamp: new Date().toISOString(),
          dataSource: 'error'
        }
      };
    } catch (error) {
      console.error('Error fetching portfolio prices:', error);
      return {
        stocks: {},
        summary: {
          totalStocks: symbols.length,
          successfulFetches: 0,
          failedFetches: symbols.length,
          successRate: 0,
          timestamp: new Date().toISOString(),
          dataSource: 'error'
        }
      };
    }
  }

  // Market indices
  async getMarketIndices(market: 'INDIA' | 'USA'): Promise<{ [indexName: string]: MarketIndex }> {
    try {
      const response = await fetch(`${this.baseUrl}/indices/${market}`);
      const result: MarketDataResponse = await response.json();
      
      if (result.success && result.data) {
        return result.data.indices;
      }
      
      console.error('Failed to fetch market indices:', result.error);
      return {};
    } catch (error) {
      console.error('Error fetching market indices:', error);
      return {};
    }
  }

  // Market movers
  async getMarketMovers(market: 'INDIA' | 'USA', type: 'gainers' | 'losers'): Promise<MarketMover | null> {
    try {
      const response = await fetch(`${this.baseUrl}/movers/${market}/${type}`);
      const result: MarketDataResponse = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      
      console.error('Failed to fetch market movers:', result.error);
      return null;
    } catch (error) {
      console.error('Error fetching market movers:', error);
      return null;
    }
  }

  // Sector performance
  async getSectorPerformance(market: 'INDIA' | 'USA'): Promise<SectorPerformance | null> {
    try {
      const response = await fetch(`${this.baseUrl}/sectors/${market}`);
      const result: MarketDataResponse = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      
      console.error('Failed to fetch sector performance:', result.error);
      return null;
    } catch (error) {
      console.error('Error fetching sector performance:', error);
      return null;
    }
  }

  // Comprehensive market overview
  async getMarketOverview(market: 'INDIA' | 'USA'): Promise<MarketOverview | null> {
    try {
      const response = await fetch(`${this.baseUrl}/overview/${market}`);
      const result: MarketDataResponse = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      
      console.error('Failed to fetch market overview:', result.error);
      return null;
    } catch (error) {
      console.error('Error fetching market overview:', error);
      return null;
    }
  }

  // Enhanced portfolio analysis with real-time data
  async getEnhancedPortfolioAnalysis(symbols: string[]): Promise<{
    portfolioData: PortfolioData;
    riskMetrics: any;
    sectorAnalysis: any;
    marketEnvironment: any;
  }> {
    try {
      // Fetch portfolio data and market overview in parallel
      const [portfolioData, indianMarket, usMarket] = await Promise.all([
        this.getPortfolioPrices(symbols),
        this.getMarketOverview('INDIA'),
        this.getMarketOverview('USA')
      ]);

      // Calculate risk metrics
      const riskMetrics = this.calculateRiskMetrics(portfolioData);
      
      // Analyze sector concentration
      const sectorAnalysis = this.analyzeSectorConcentration(portfolioData);
      
      // Assess market environment
      const marketEnvironment = this.assessMarketEnvironment(indianMarket, usMarket);

      return {
        portfolioData,
        riskMetrics,
        sectorAnalysis,
        marketEnvironment
      };
    } catch (error) {
      console.error('Error in enhanced portfolio analysis:', error);
      return {
        portfolioData: {
          stocks: {},
          summary: {
            totalStocks: 0,
            successfulFetches: 0,
            failedFetches: 0,
            successRate: 0,
            timestamp: new Date().toISOString(),
            dataSource: 'error'
          }
        },
        riskMetrics: {},
        sectorAnalysis: {},
        marketEnvironment: {}
      };
    }
  }

  // Calculate advanced risk metrics
  private calculateRiskMetrics(portfolioData: PortfolioData): any {
    const stocks = Object.values(portfolioData.stocks);
    if (stocks.length === 0) return {};

    // Calculate portfolio volatility (simplified)
    const avgBeta = stocks.reduce((sum, stock) => sum + (stock.beta || 1), 0) / stocks.length;
    const portfolioVolatility = avgBeta * 15; // Simplified calculation

    // Calculate sector concentration
    const sectorConcentration: { [sector: string]: number } = {};
    stocks.forEach(stock => {
      if (stock.sector) {
        sectorConcentration[stock.sector] = (sectorConcentration[stock.sector] || 0) + 1;
      }
    });

    // Calculate max drawdown estimate
    const maxDrawdown = stocks.reduce((max, stock) => {
      const drawdown = ((stock["52WeekHigh"] - stock.lastPrice) / stock["52WeekHigh"]) * 100;
      return Math.max(max, drawdown);
    }, 0);

    return {
      portfolioVolatility,
      avgBeta,
      sectorConcentration,
      maxDrawdown,
      diversificationScore: Math.min(100, (Object.keys(sectorConcentration).length / stocks.length) * 100),
      timestamp: new Date().toISOString()
    };
  }

  // Analyze sector concentration
  private analyzeSectorConcentration(portfolioData: PortfolioData): any {
    const stocks = Object.values(portfolioData.stocks);
    const sectorData: { [sector: string]: { count: number; totalValue: number; avgChange: number } } = {};

    stocks.forEach(stock => {
      if (stock.sector) {
        if (!sectorData[stock.sector]) {
          sectorData[stock.sector] = { count: 0, totalValue: 0, avgChange: 0 };
        }
        sectorData[stock.sector].count++;
        sectorData[stock.sector].totalValue += stock.lastPrice;
        sectorData[stock.sector].avgChange += stock.changePercent;
      }
    });

    // Calculate averages
    Object.keys(sectorData).forEach(sector => {
      sectorData[sector].avgChange = sectorData[sector].avgChange / sectorData[sector].count;
    });

    return sectorData;
  }

  // Assess market environment
  private assessMarketEnvironment(indianMarket: MarketOverview | null, usMarket: MarketOverview | null): any {
    const environment: any = {
      indian: { status: 'unknown', volatility: 'medium' },
      us: { status: 'unknown', volatility: 'medium' },
      global: { status: 'unknown', riskLevel: 'medium' }
    };

    if (indianMarket?.indices) {
      const nifty = indianMarket.indices.indices.NIFTY50;
      if (nifty) {
        environment.indian.status = nifty.changePercent > 1 ? 'bullish' : 
                                   nifty.changePercent < -1 ? 'bearish' : 'sideways';
        environment.indian.volatility = Math.abs(nifty.changePercent) > 2 ? 'high' : 
                                       Math.abs(nifty.changePercent) > 0.5 ? 'medium' : 'low';
      }
    }

    if (usMarket?.indices) {
      const sp500 = usMarket.indices.indices.SP500;
      if (sp500) {
        environment.us.status = sp500.changePercent > 1 ? 'bullish' : 
                               sp500.changePercent < -1 ? 'bearish' : 'sideways';
        environment.us.volatility = Math.abs(sp500.changePercent) > 2 ? 'high' : 
                                   Math.abs(sp500.changePercent) > 0.5 ? 'medium' : 'low';
      }
    }

    // Assess global risk level
    const indianRisk = environment.indian.volatility === 'high' ? 2 : 
                      environment.indian.volatility === 'medium' ? 1 : 0;
    const usRisk = environment.us.volatility === 'high' ? 2 : 
                   environment.us.volatility === 'medium' ? 1 : 0;
    
    const totalRisk = indianRisk + usRisk;
    environment.global.riskLevel = totalRisk > 2 ? 'high' : totalRisk > 0 ? 'medium' : 'low';

    return environment;
  }
}

export const marketDataService = new MarketDataService();