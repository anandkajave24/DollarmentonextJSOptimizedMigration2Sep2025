import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { marketDataService } from "./services/marketDataService";
import { marketSentimentService } from "./services/marketSentimentService";
import { createCMSRoutes } from "./cms-routes";
import { spawn } from "child_process";
import path from "path";

// No authentication required - open access
const noAuth = (req: any, res: any, next: any) => {
  // Set a default user context for consistency
  req.user = {
    uid: 'guest-user',
    email: 'guest@rupeesmart.com',
    displayName: 'Guest User'
  };
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });



  // Helper function to execute Python stock service
  const executeStockService = (command: string, args: string[] = []): Promise<any> => {
    return new Promise((resolve, reject) => {
      const pythonPath = 'python3';
      const scriptPath = path.join(process.cwd(), 'server', 'stockPriceService.py');
      const fullArgs = [scriptPath, command, ...args];
      
      const pythonProcess = spawn(pythonPath, fullArgs);
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
          } catch (parseError: any) {
            console.error('JSON Parse error:', parseError);
            reject(new Error(`Failed to parse JSON: ${parseError.message}`));
          }
        } else {
          reject(new Error(`Python script failed with code ${code}: ${stderr}`));
        }
      });
      
      pythonProcess.on('error', (error) => {
        console.error('Python process error:', error);
        reject(new Error(`Failed to start Python process: ${error.message}`));
      });
    });
  };

  // Market Sentiment API Routes
  app.get('/api/market-sentiment/current', async (req, res) => {
    try {
      const result = await marketSentimentService.getCurrentMarketSentiment();
      res.json(result);
    } catch (error) {
      console.error('Error fetching market sentiment:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch market sentiment',
        timestamp: new Date().toISOString()
      });
    }
  });

  app.get('/api/market-sentiment/detailed', async (req, res) => {
    try {
      const result = await marketSentimentService.getDetailedMarketAnalysis();
      res.json({ 
        success: true, 
        data: result,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error fetching detailed market analysis:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch detailed market analysis',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Market Data API Routes
  
  // Get single stock price
  app.get('/api/market/stock/:symbol', async (req, res) => {
    try {
      const { symbol } = req.params;
      const { exchange = 'NSE' } = req.query;
      
      const result = await marketDataService.getStockPrice(symbol, exchange as string);
      
      if (result.success) {
        res.json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error('Error fetching stock price:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get multiple stock prices
  app.post('/api/market/stocks', async (req, res) => {
    try {
      const { symbols, exchange = 'NSE' } = req.body;
      
      if (!symbols || !Array.isArray(symbols)) {
        return res.status(400).json({
          success: false,
          error: 'Symbols array is required',
          timestamp: new Date().toISOString()
        });
      }
      
      const result = await marketDataService.getMultipleStocks(symbols, exchange);
      res.json(result);
    } catch (error) {
      console.error('Error fetching multiple stocks:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get portfolio prices
  app.post('/api/market/portfolio', async (req, res) => {
    try {
      const { symbols } = req.body;
      
      if (!symbols || !Array.isArray(symbols)) {
        return res.status(400).json({
          success: false,
          error: 'Symbols array is required',
          timestamp: new Date().toISOString()
        });
      }
      
      const result = await marketDataService.getPortfolioPrices(symbols);
      res.json(result);
    } catch (error) {
      console.error('Error fetching portfolio prices:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get market indices
  app.get('/api/market/indices/:market', async (req, res) => {
    try {
      const { market } = req.params;
      const validMarkets = ['INDIA', 'USA'];
      
      if (!validMarkets.includes(market.toUpperCase())) {
        return res.status(400).json({
          success: false,
          error: 'Invalid market. Use INDIA or USA',
          timestamp: new Date().toISOString()
        });
      }
      
      const result = await marketDataService.getMarketIndices(market.toUpperCase());
      res.json(result);
    } catch (error) {
      console.error('Error fetching market indices:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get market movers
  app.get('/api/market/movers/:market/:type', async (req, res) => {
    try {
      const { market, type } = req.params;
      const validMarkets = ['INDIA', 'USA'];
      const validTypes = ['gainers', 'losers'];
      
      if (!validMarkets.includes(market.toUpperCase()) || !validTypes.includes(type.toLowerCase())) {
        return res.status(400).json({
          success: false,
          error: 'Invalid market or type. Use INDIA/USA for market and gainers/losers for type',
          timestamp: new Date().toISOString()
        });
      }
      
      const result = await marketDataService.getMarketMovers(market.toUpperCase(), type.toLowerCase());
      res.json(result);
    } catch (error) {
      console.error('Error fetching market movers:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get sector performance
  app.get('/api/market/sectors/:market', async (req, res) => {
    try {
      const { market } = req.params;
      const validMarkets = ['INDIA', 'USA'];
      
      if (!validMarkets.includes(market.toUpperCase())) {
        return res.status(400).json({
          success: false,
          error: 'Invalid market. Use INDIA or USA',
          timestamp: new Date().toISOString()
        });
      }
      
      const result = await executeStockService('sectors', [market.toUpperCase()]);
      
      res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error fetching sector performance:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get ETF data
  app.get('/api/market/etfs/:market', async (req, res) => {
    try {
      const { market } = req.params;
      const validMarkets = ['INDIA', 'USA'];
      
      if (!validMarkets.includes(market.toUpperCase())) {
        return res.status(400).json({
          success: false,
          error: 'Invalid market. Use INDIA or USA',
          timestamp: new Date().toISOString()
        });
      }
      
      const result = await executeStockService('etfs', [market.toUpperCase()]);
      
      res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error fetching ETF data:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get commodity data
  app.get('/api/market/commodities', async (req, res) => {
    try {
      const result = await executeStockService('commodities');
      
      res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error fetching commodity data:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get cryptocurrency data
  app.get('/api/market/crypto', async (req, res) => {
    try {
      const result = await executeStockService('crypto');
      
      res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get currency pairs data
  app.get('/api/market/currencies', async (req, res) => {
    try {
      const result = await executeStockService('currencies');
      
      res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error fetching currency data:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get global indices data
  app.get('/api/market/global-indices', async (req, res) => {
    try {
      const result = await executeStockService('global_indices');
      
      res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error fetching global indices data:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get historical data with analytics
  app.get('/api/market/historical/:symbol', async (req, res) => {
    try {
      const { symbol } = req.params;
      const { exchange = 'NSE', period = '30y' } = req.query;
      
      const validExchanges = ['NSE', 'BSE', 'US'];
      const validPeriods = ['30y', '20y', '10y', '5y', '3y', '1y', '6mo', '3mo', '1mo'];
      
      if (!validExchanges.includes(exchange.toString().toUpperCase())) {
        return res.status(400).json({
          success: false,
          error: 'Invalid exchange. Use NSE, BSE, or US',
          timestamp: new Date().toISOString()
        });
      }
      
      if (!validPeriods.includes(period.toString().toLowerCase())) {
        return res.status(400).json({
          success: false,
          error: 'Invalid period. Use 30y, 20y, 10y, 5y, 3y, 1y, 6mo, 3mo, or 1mo',
          timestamp: new Date().toISOString()
        });
      }
      
      const result = await executeStockService('historical', [symbol, exchange.toString().toUpperCase(), period.toString().toLowerCase()]);
      
      res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error fetching historical data:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get comprehensive market overview
  app.get('/api/market/overview/:market', async (req, res) => {
    try {
      const { market } = req.params;
      const validMarkets = ['INDIA', 'USA'];
      
      if (!validMarkets.includes(market.toUpperCase())) {
        return res.status(400).json({
          success: false,
          error: 'Invalid market. Use INDIA or USA',
          timestamp: new Date().toISOString()
        });
      }
      
      const marketUpper = market.toUpperCase();
      
      // Execute multiple commands in parallel
      const [indices, gainers, losers, sectors] = await Promise.all([
        executeStockService('indices', [marketUpper]),
        executeStockService('movers', [marketUpper, 'gainers']),
        executeStockService('movers', [marketUpper, 'losers']),
        executeStockService('sectors', [marketUpper])
      ]);
      
      res.json({
        success: true,
        data: {
          market: marketUpper,
          indices,
          gainers,
          losers,
          sectors,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error fetching market overview:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get live ticker data for header
  app.get('/api/market/ticker', async (req, res) => {
    try {
      const symbols = ['SPY', 'DIA', 'QQQ', 'GLD']; // S&P 500, DOW, NASDAQ, Gold ETFs
      const result = await executeStockService('multiple', [symbols.join(','), 'US']);
      
      // Check if we have real-time data by checking market hours
      const now = new Date();
      const isMarketHours = () => {
        const easternTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
        const hours = easternTime.getHours();
        const minutes = easternTime.getMinutes();
        const day = easternTime.getDay();
        
        // Market is open Monday-Friday 9:30 AM - 4:00 PM ET
        const isWeekday = day >= 1 && day <= 5;
        const afterOpen = hours > 9 || (hours === 9 && minutes >= 30);
        const beforeClose = hours < 16;
        
        return isWeekday && afterOpen && beforeClose;
      };
      
      const hasRealtimeData = isMarketHours();
      const showTestData = true; // Demo mode: show calculated values to verify accuracy
      console.log(`Market status check: isMarketHours=${hasRealtimeData}, DEMO MODE ENABLED, current ET time: ${new Date().toLocaleString("en-US", {timeZone: "America/New_York"})}`);
      
      // Calculate correct index values from ETF prices using proper ratios
      // SPY tracks S&P 500 at roughly 1:10 ratio, DIA tracks DOW at roughly 1:100 ratio, QQQ tracks NASDAQ at roughly 1:40 ratio
      const spyRatio = 6238.01 / 621.72; // Current S&P 500 / Current SPY price ≈ 10.03
      const diaRatio = 43588.58 / 435.72; // Current DOW / Current DIA price ≈ 100
      const qqqRatio = 20650.13 / 553.88; // Current NASDAQ / Current QQQ price ≈ 37.3
      const goldRatio = 3346.87 / 309.11; // Current Gold spot / GLD price ≈ 10.8
      
      // Transform the live data to ticker format - show "--" when markets are closed
      const tickerData = [
        { 
          name: 'S&P 500', 
          value: (hasRealtimeData || showTestData) && result.SPY?.lastPrice ? `${(result.SPY.lastPrice * spyRatio).toFixed(2)}` : '--',
          change: (hasRealtimeData || showTestData) && result.SPY?.change ? (result.SPY.change > 0 ? `+${(result.SPY.change * spyRatio).toFixed(2)}` : `${(result.SPY.change * spyRatio).toFixed(2)}`) : '--',
          percent: (hasRealtimeData || showTestData) && result.SPY?.changePercent ? (result.SPY.changePercent > 0 ? `+${result.SPY.changePercent.toFixed(2)}%` : `${result.SPY.changePercent.toFixed(2)}%`) : '--',
          positive: (hasRealtimeData || showTestData) && result.SPY?.change ? result.SPY.change >= 0 : null
        },
        { 
          name: 'DOW', 
          value: (hasRealtimeData || showTestData) && result.DIA?.lastPrice ? `${(result.DIA.lastPrice * diaRatio).toFixed(2)}` : '--',
          change: (hasRealtimeData || showTestData) && result.DIA?.change ? (result.DIA.change > 0 ? `+${(result.DIA.change * diaRatio).toFixed(2)}` : `${(result.DIA.change * diaRatio).toFixed(2)}`) : '--',
          percent: (hasRealtimeData || showTestData) && result.DIA?.changePercent ? (result.DIA.changePercent > 0 ? `+${result.DIA.changePercent.toFixed(2)}%` : `${result.DIA.changePercent.toFixed(2)}%`) : '--',
          positive: (hasRealtimeData || showTestData) && result.DIA?.change ? result.DIA.change >= 0 : null
        },
        { 
          name: 'NASDAQ', 
          value: (hasRealtimeData || showTestData) && result.QQQ?.lastPrice ? `${(result.QQQ.lastPrice * qqqRatio).toFixed(2)}` : '--',
          change: (hasRealtimeData || showTestData) && result.QQQ?.change ? (result.QQQ.change > 0 ? `+${(result.QQQ.change * qqqRatio).toFixed(2)}` : `${(result.QQQ.change * qqqRatio).toFixed(2)}`) : '--',
          percent: (hasRealtimeData || showTestData) && result.QQQ?.changePercent ? (result.QQQ.changePercent > 0 ? `+${result.QQQ.changePercent.toFixed(2)}%` : `${result.QQQ.changePercent.toFixed(2)}%`) : '--',
          positive: (hasRealtimeData || showTestData) && result.QQQ?.change ? result.QQQ.change >= 0 : null
        },
        { 
          name: 'Gold', 
          // Gold trades 24/7, show actual spot price converted from GLD ETF
          value: result.GLD?.lastPrice ? `$${(result.GLD.lastPrice * goldRatio).toFixed(2)}` : '--',
          change: result.GLD?.change ? (result.GLD.change > 0 ? `+${(result.GLD.change * goldRatio).toFixed(2)}` : `${(result.GLD.change * goldRatio).toFixed(2)}`) : '--',
          percent: result.GLD?.changePercent ? (result.GLD.changePercent > 0 ? `+${result.GLD.changePercent.toFixed(2)}%` : `${result.GLD.changePercent.toFixed(2)}%`) : '--',
          positive: result.GLD?.change ? result.GLD.change >= 0 : null
        }
      ];

      res.json({
        success: true,
        data: tickerData,
        isRealtime: hasRealtimeData,
        marketStatus: hasRealtimeData ? 'OPEN' : 'CLOSED',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error fetching ticker data:', error);
      // Return "--" when there's an error to show no data is available
      res.json({
        success: false,
        data: [
          { name: 'S&P 500', value: '--', change: '--', percent: '--', positive: null },
          { name: 'DOW', value: '--', change: '--', percent: '--', positive: null },
          { name: 'NASDAQ', value: '--', change: '--', percent: '--', positive: null },
          { name: 'Gold', value: '--', change: '--', percent: '--', positive: null }
        ],
        isRealtime: false,
        marketStatus: 'ERROR',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Auth routes
  app.get('/api/user', noAuth, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      
      // Return user data, handling database failures gracefully
      try {
        let user = await storage.getUser(userId);
        if (!user) {
          const [firstName, lastName] = (req.user.displayName || '').split(' ');
          user = await storage.upsertUser({
            id: userId,
            email: req.user.email || null,
            firstName: firstName || null,
            lastName: lastName || null,
            profileImageUrl: req.user.photoURL || null,
          });
        }
        res.json(user);
      } catch (dbError) {
        console.error('Database error in /api/user:', dbError);
        // Return fallback user data if database has issues
        res.json({
          id: userId,
          email: req.user.email || 'user@rupeesmart.com',
          firstName: req.user.displayName?.split(' ')[0] || 'RupeeSmart',
          lastName: req.user.displayName?.split(' ')[1] || 'User',
          profileImageUrl: req.user.photoURL || null,
          subscriptionStatus: 'free',
          subscriptionPlan: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });







  // Checkpoint API Routes
  app.get('/api/checkpoints', noAuth, async (req: any, res) => {
    try {
      const { category, level, isFree } = req.query;
      const checkpoints = await storage.getCheckpoints(
        category as string, 
        level ? parseInt(level as string) : undefined,
        isFree !== undefined ? isFree === 'true' : undefined
      );
      res.json({ success: true, data: checkpoints });
    } catch (error) {
      console.error('Error fetching checkpoints:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch checkpoints' });
    }
  });

  app.get('/api/checkpoints/:id', noAuth, async (req: any, res) => {
    try {
      const { id } = req.params;
      const checkpoint = await storage.getCheckpoint(parseInt(id));
      if (!checkpoint) {
        return res.status(404).json({ success: false, error: 'Checkpoint not found' });
      }
      res.json({ success: true, data: checkpoint });
    } catch (error) {
      console.error('Error fetching checkpoint:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch checkpoint' });
    }
  });

  app.get('/api/user/checkpoints/progress', noAuth, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      const { checkpointId } = req.query;
      const progress = await storage.getUserCheckpointProgress(
        userId, 
        checkpointId ? parseInt(checkpointId as string) : undefined
      );
      res.json({ success: true, data: progress });
    } catch (error) {
      console.error('Error fetching user checkpoint progress:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch progress' });
    }
  });

  app.post('/api/user/checkpoints/progress', noAuth, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      const progressData = { ...req.body, userId };
      const progress = await storage.createUserCheckpointProgress(progressData);
      res.json({ success: true, data: progress });
    } catch (error) {
      console.error('Error creating checkpoint progress:', error);
      res.status(500).json({ success: false, error: 'Failed to create progress' });
    }
  });

  app.patch('/api/user/checkpoints/progress/:id', noAuth, async (req: any, res) => {
    try {
      const { id } = req.params;
      const progress = await storage.updateUserCheckpointProgress(parseInt(id), req.body);
      if (!progress) {
        return res.status(404).json({ success: false, error: 'Progress record not found' });
      }
      res.json({ success: true, data: progress });
    } catch (error) {
      console.error('Error updating checkpoint progress:', error);
      res.status(500).json({ success: false, error: 'Failed to update progress' });
    }
  });

  app.get('/api/user/learning-profile', noAuth, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      let profile = await storage.getUserLearningProfile(userId);
      
      // Create profile if it doesn't exist
      if (!profile) {
        profile = await storage.createUserLearningProfile({
          userId,
          totalPoints: 0,
          currentLevel: 1,
          completedCheckpoints: 0,
          currentStreak: 0,
          longestStreak: 0
        });
      }
      
      res.json({ success: true, data: profile });
    } catch (error) {
      console.error('Error fetching learning profile:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch learning profile' });
    }
  });

  app.patch('/api/user/learning-profile', noAuth, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      const profile = await storage.updateUserLearningProfile(userId, req.body);
      res.json({ success: true, data: profile });
    } catch (error) {
      console.error('Error updating learning profile:', error);
      res.status(500).json({ success: false, error: 'Failed to update learning profile' });
    }
  });

  app.get('/api/user/achievements', noAuth, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      const achievements = await storage.getUserAchievements(userId);
      res.json({ success: true, data: achievements });
    } catch (error) {
      console.error('Error fetching achievements:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch achievements' });
    }
  });

  app.post('/api/user/achievements', noAuth, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      const achievementData = { ...req.body, userId };
      const achievement = await storage.createUserAchievement(achievementData);
      res.json({ success: true, data: achievement });
    } catch (error) {
      console.error('Error creating achievement:', error);
      res.status(500).json({ success: false, error: 'Failed to create achievement' });
    }
  });

  // Initialize free checkpoints for new users
  app.post('/api/checkpoints/initialize-free', noAuth, async (req: any, res) => {
    try {
      // Check if free checkpoints already exist
      const existingCheckpoints = await storage.getCheckpoints(undefined, undefined, true);
      
      if (existingCheckpoints.length === 0) {
        // Create free starter checkpoints
        const freeCheckpoints = [
          {
            name: "Financial Basics Foundation",
            description: "Learn the fundamental concepts of personal finance",
            category: "budgeting",
            level: 1,
            points: 100,
            isFree: true,
            requirements: [],
            actionItems: [
              { id: 1, title: "Complete budgeting basics quiz", completed: false },
              { id: 2, title: "Set up your first budget", completed: false },
              { id: 3, title: "Track expenses for one week", completed: false }
            ],
            rewards: { badge: "Foundation Builder", points: 100 },
            estimatedTimeMinutes: 45,
            order: 1,
            isActive: true
          },
          {
            name: "Emergency Fund Starter",
            description: "Build your first emergency fund with smart saving strategies",
            category: "budgeting",
            level: 1,
            points: 150,
            isFree: true,
            requirements: [1],
            actionItems: [
              { id: 1, title: "Calculate your monthly expenses", completed: false },
              { id: 2, title: "Set emergency fund goal", completed: false },
              { id: 3, title: "Open high-yield savings account", completed: false },
              { id: 4, title: "Automate emergency fund savings", completed: false }
            ],
            rewards: { badge: "Safety Net Creator", points: 150 },
            estimatedTimeMinutes: 60,
            order: 2,
            isActive: true
          },
          {
            name: "Investment Introduction",
            description: "Understand basic investment concepts and start your investment journey",
            category: "investing",
            level: 1,
            points: 200,
            isFree: true,
            requirements: [],
            actionItems: [
              { id: 1, title: "Learn about different investment types", completed: false },
              { id: 2, title: "Understand risk and return", completed: false },
              { id: 3, title: "Complete investment personality quiz", completed: false },
              { id: 4, title: "Explore SIP investment options", completed: false }
            ],
            rewards: { badge: "Investment Explorer", points: 200 },
            estimatedTimeMinutes: 90,
            order: 1,
            isActive: true
          }
        ];

        for (const checkpoint of freeCheckpoints) {
          await storage.createCheckpoint(checkpoint);
        }
      }

      res.json({ 
        success: true, 
        message: 'Free checkpoints initialized',
        checkpointsCount: existingCheckpoints.length || 3
      });
    } catch (error) {
      console.error('Error initializing free checkpoints:', error);
      res.status(500).json({ success: false, error: 'Failed to initialize checkpoints' });
    }
  });

  // CMS Routes for SEO Agency collaboration - temporarily disabled
  // const cmsRoutes = createCMSRoutes(storage);
  // app.use('/api/cms', cmsRoutes);

  // WebSocket setup
  const httpServer = createServer(app);
  
  return httpServer;
}