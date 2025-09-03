import { spawn } from 'child_process';
import path from 'path';

export interface MarketDataResponse {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: string;
}

export class MarketDataService {
  private executeStockService(command: string, args: string[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      const pythonPath = 'python3';
      const scriptPath = path.join(process.cwd(), 'server', 'stockPriceService.py');
      const fullArgs = [scriptPath, command, ...args];
      
      console.log(`Executing: ${pythonPath} ${fullArgs.join(' ')}`);
      
      const pythonProcess = spawn(pythonPath, fullArgs, {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: process.cwd()
      });
      
      let stdout = '';
      let stderr = '';
      
      pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });
      
      pythonProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });
      
      pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        
        if (code === 0) {
          try {
            const result = JSON.parse(stdout);
            resolve(result);
          } catch (parseError) {
            console.error('JSON Parse error:', parseError);
            reject(new Error(`Failed to parse JSON: ${parseError instanceof Error ? parseError.message : String(parseError)}`));
          }
        } else {
          reject(new Error(`Python script failed with code ${code}: ${stderr}`));
        }
      });
      
      pythonProcess.on('error', (error) => {
        console.error('Python process error:', error);
        reject(new Error(`Failed to start Python process: ${error instanceof Error ? error.message : String(error)}`));
      });
    });
  }

  async getStockPrice(symbol: string, exchange: string = 'US'): Promise<MarketDataResponse> {
    try {
      const result = await this.executeStockService('single', [symbol, exchange]);
      
      if (result && !result.error) {
        return {
          success: true,
          data: result,
          timestamp: new Date().toISOString()
        };
      } else {
        return {
          success: false,
          error: result?.error || 'Stock data not found',
          timestamp: new Date().toISOString()
        };
      }
    } catch (error) {
      console.error('Error fetching stock price:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      };
    }
  }

  async getMultipleStocks(symbols: string[], exchange: string = 'US'): Promise<MarketDataResponse> {
    try {
      const result = await this.executeStockService('multiple', [symbols.join(','), exchange]);
      
      return {
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching multiple stocks:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      };
    }
  }

  async getPortfolioPrices(symbols: string[]): Promise<MarketDataResponse> {
    try {
      const result = await this.executeStockService('portfolio', [symbols.join(',')]);
      
      return {
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching portfolio prices:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      };
    }
  }

  async getMarketIndices(market: string = 'INDIA'): Promise<MarketDataResponse> {
    try {
      const result = await this.executeStockService('indices', [market]);
      
      return {
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching market indices:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      };
    }
  }

  async getMarketMovers(market: string = 'INDIA', type: string = 'gainers'): Promise<MarketDataResponse> {
    try {
      const result = await this.executeStockService('movers', [market, type]);
      
      return {
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching market movers:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      };
    }
  }

  async getSectorPerformance(market: string = 'INDIA'): Promise<MarketDataResponse> {
    try {
      const result = await this.executeStockService('sectors', [market]);
      
      return {
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching sector performance:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      };
    }
  }

  async getMarketOverview(market: string = 'USA'): Promise<MarketDataResponse> {
    try {
      const result = await this.executeStockService('overview', [market]);
      
      return {
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching market overview:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      };
    }
  }

  // Mock implementation removed - USA focus only
  getMockData(type: string, market: string = 'USA'): any {
    // Return null to maintain USA-only focus
    return null;
  }
}

export const marketDataService = new MarketDataService();