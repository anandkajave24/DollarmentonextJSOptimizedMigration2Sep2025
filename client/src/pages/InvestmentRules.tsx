import React, { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Progress } from "../components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { 
  Calculator, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  DollarSign,
  Shield,
  BookOpen,
  Settings,
  PieChart,
  BarChart3,
  Timer,
  Zap,
  Users,
  Brain
} from 'lucide-react';
import ResponsivePageWrapper from '../components/ResponsivePageWrapper';
import { format, addDays, differenceInDays } from 'date-fns';

// Types for Investment Rules System
interface StockData {
  symbol: string;
  price: number;
  marketCap: number;
  athPrice: number;
  m1Close: number;
  m2Close: number;
  m3Close: number;
  yearsOfData: number;
  mccHigh?: number;
  entryPrice?: number;
  quantity?: number;
  stopLoss?: number;
  originalEntry?: number;
  mma20?: number;
  mma10?: number;
  // Enhanced parameters for intelligent screening
  volume?: number;
  avgVolume?: number;
  beta?: number;
  pe?: number;
  pb?: number;
  roe?: number;
  debtEquity?: number;
  sector?: string;
  industry?: string;
  fundamentalScore?: number;
  technicalScore?: number;
  riskScore?: number;
  expectedReturn?: number;
  confidenceLevel?: number;
  timeHorizon?: string;
}

interface PortfolioPosition {
  symbol: string;
  entryPrice: number;
  quantity: number;
  currentPrice: number;
  stopLoss: number;
  target1: number;
  target2: number;
  target3: number;
  target4: number;
  stage: 'entry' | 'target1' | 'target2' | 'target3' | 'target4' | 'exit';
  pnlPercent: number;
  riskAmount: number;
  isReEntry: boolean;
  originalEntry?: number;
}

interface RuleValidation {
  ruleNumber: number;
  ruleName: string;
  status: 'pass' | 'fail' | 'warning';
  value: string;
  required: string;
  message: string;
  weight?: number;
  category?: 'fundamental' | 'technical' | 'risk' | 'liquidity';
}

interface StockExpectation {
  symbol: string;
  overallScore: number;
  expectedReturn: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  timeHorizon: string;
  confidenceLevel: number;
  keyStrengths: string[];
  keyRisks: string[];
  recommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Avoid';
  targetPrice: number;
  stopLoss: number;
  probabilityOfSuccess: number;
}

interface IntelligentScreeningCriteria {
  fundamentalWeights: {
    marketCap: number;
    pe: number;
    pb: number;
    roe: number;
    debtEquity: number;
  };
  technicalWeights: {
    priceAction: number;
    volume: number;
    mccFormation: number;
    movingAverages: number;
  };
  riskWeights: {
    beta: number;
    volatility: number;
    liquidity: number;
  };
}

export default function InvestmentRules() {
  const [activeTab, setActiveTab] = useState('overview');
  const [portfolioCapital, setPortfolioCapital] = useState(100000);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockPrice, setStockPrice] = useState(0);
  const [marketCap, setMarketCap] = useState(0);
  const [athPrice, setAthPrice] = useState(0);
  const [m1Close, setM1Close] = useState(0);
  const [m2Close, setM2Close] = useState(0);
  const [m3Close, setM3Close] = useState(0);
  const [yearsOfData, setYearsOfData] = useState(0);
  const [mma20, setMma20] = useState(0);
  const [mma10, setMma10] = useState(0);
  const [positions, setPositions] = useState<PortfolioPosition[]>([]);
  const [ruleValidations, setRuleValidations] = useState<RuleValidation[]>([]);
  const [currentMonth, setCurrentMonth] = useState('');
  const [previousMonth, setPreviousMonth] = useState('');
  const [threeMonthsAgo, setThreeMonthsAgo] = useState('');
  
  // Enhanced parameters for intelligent screening
  const [volume, setVolume] = useState(0);
  const [avgVolume, setAvgVolume] = useState(0);
  const [beta, setBeta] = useState(0);
  const [pe, setPe] = useState(0);
  const [pb, setPb] = useState(0);
  const [roe, setRoe] = useState(0);
  const [debtEquity, setDebtEquity] = useState(0);
  const [sector, setSector] = useState('');
  const [industry, setIndustry] = useState('');
  
  // System states
  const [stockExpectations, setStockExpectations] = useState<StockExpectation[]>([]);
  const [shortlistedStocks, setShortlistedStocks] = useState<StockData[]>([]);
  const [screeningCriteria, setScreeningCriteria] = useState<IntelligentScreeningCriteria>({
    fundamentalWeights: {
      marketCap: 0.25,
      pe: 0.20,
      pb: 0.15,
      roe: 0.25,
      debtEquity: 0.15
    },
    technicalWeights: {
      priceAction: 0.30,
      volume: 0.20,
      mccFormation: 0.35,
      movingAverages: 0.15
    },
    riskWeights: {
      beta: 0.40,
      volatility: 0.30,
      liquidity: 0.30
    }
  });

  // Initialize dates on component mount
  useEffect(() => {
    const today = new Date();
    const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const threeMonthsBack = new Date(today.getFullYear(), today.getMonth() - 3, 1);
    
    setCurrentMonth(format(today, 'MMM yyyy'));
    setPreviousMonth(format(prevMonth, 'MMM yyyy'));
    setThreeMonthsAgo(format(threeMonthsBack, 'MMM yyyy'));
  }, []);

  // Enhanced intelligent screening and validation system
  const validateAllRules = (stock: StockData): RuleValidation[] => {
    const validations: RuleValidation[] = [];

    // Core 1-M System Rules
    validations.push({
      ruleNumber: 3,
      ruleName: 'Stock Price Confirmation',
      status: stock.price > 100 ? 'pass' : 'fail',
      value: `$${stock.price}`,
      required: '> $100',
      message: stock.price > 100 ? 'Stock price meets minimum criteria' : 'Stock price below minimum threshold',
      weight: 0.15,
      category: 'technical'
    });

    validations.push({
      ruleNumber: 4,
      ruleName: 'Historical Data Requirement',
      status: stock.yearsOfData >= 4 ? 'pass' : 'fail',
      value: `${stock.yearsOfData} years`,
      required: '≥ 4 years',
      message: stock.yearsOfData >= 4 ? 'Sufficient historical data available' : 'Insufficient historical data',
      weight: 0.10,
      category: 'technical'
    });

    validations.push({
      ruleNumber: 5,
      ruleName: 'Market Cap Requirement',
      status: stock.marketCap > 4000 ? 'pass' : 'fail',
      value: `$${stock.marketCap} Cr`,
      required: '> $4,000 Cr',
      message: stock.marketCap > 4000 ? 'Market cap meets criteria' : 'Market cap below required threshold',
      weight: 0.20,
      category: 'fundamental'
    });

    const isMCC = stock.m2Close > stock.athPrice;
    validations.push({
      ruleNumber: 8,
      ruleName: 'Monthly Confirmation Candle',
      status: isMCC ? 'pass' : 'fail',
      value: `M2: $${stock.m2Close} vs ATH: $${stock.athPrice}`,
      required: 'M2 Close > ATH till M3',
      message: isMCC ? 'MCC criteria met - valid confirmation' : 'MCC criteria not met',
      weight: 0.25,
      category: 'technical'
    });

    // Enhanced Fundamental Analysis
    if (stock.pe) {
      validations.push({
        ruleNumber: 101,
        ruleName: 'P/E Ratio Analysis',
        status: stock.pe > 0 && stock.pe < 25 ? 'pass' : stock.pe >= 25 && stock.pe < 35 ? 'warning' : 'fail',
        value: `${stock.pe}x`,
        required: '< 25x (Optimal)',
        message: stock.pe < 25 ? 'Attractive valuation' : stock.pe < 35 ? 'Moderate valuation' : 'High valuation risk',
        weight: 0.15,
        category: 'fundamental'
      });
    }

    if (stock.pb) {
      validations.push({
        ruleNumber: 102,
        ruleName: 'P/B Ratio Analysis',
        status: stock.pb > 0 && stock.pb < 3 ? 'pass' : stock.pb >= 3 && stock.pb < 5 ? 'warning' : 'fail',
        value: `${stock.pb}x`,
        required: '< 3x (Optimal)',
        message: stock.pb < 3 ? 'Good book value' : stock.pb < 5 ? 'Moderate book value' : 'High book value risk',
        weight: 0.10,
        category: 'fundamental'
      });
    }

    if (stock.roe) {
      validations.push({
        ruleNumber: 103,
        ruleName: 'Return on Equity',
        status: stock.roe > 15 ? 'pass' : stock.roe > 10 ? 'warning' : 'fail',
        value: `${stock.roe}%`,
        required: '> 15% (Optimal)',
        message: stock.roe > 15 ? 'Strong profitability' : stock.roe > 10 ? 'Moderate profitability' : 'Low profitability',
        weight: 0.20,
        category: 'fundamental'
      });
    }

    if (stock.debtEquity) {
      validations.push({
        ruleNumber: 104,
        ruleName: 'Debt-to-Equity Ratio',
        status: stock.debtEquity < 0.5 ? 'pass' : stock.debtEquity < 1 ? 'warning' : 'fail',
        value: `${stock.debtEquity}x`,
        required: '< 0.5x (Optimal)',
        message: stock.debtEquity < 0.5 ? 'Low debt risk' : stock.debtEquity < 1 ? 'Moderate debt risk' : 'High debt risk',
        weight: 0.15,
        category: 'risk'
      });
    }

    // Technical Analysis
    if (stock.volume && stock.avgVolume) {
      const volumeRatio = stock.volume / stock.avgVolume;
      validations.push({
        ruleNumber: 201,
        ruleName: 'Volume Confirmation',
        status: volumeRatio > 1.5 ? 'pass' : volumeRatio > 1 ? 'warning' : 'fail',
        value: `${volumeRatio.toFixed(2)}x`,
        required: '> 1.5x avg volume',
        message: volumeRatio > 1.5 ? 'Strong volume support' : volumeRatio > 1 ? 'Moderate volume' : 'Low volume concern',
        weight: 0.15,
        category: 'technical'
      });
    }

    if (stock.beta) {
      validations.push({
        ruleNumber: 202,
        ruleName: 'Beta Risk Assessment',
        status: stock.beta > 0.5 && stock.beta < 1.5 ? 'pass' : stock.beta >= 1.5 && stock.beta < 2 ? 'warning' : 'fail',
        value: `${stock.beta}`,
        required: '0.5 - 1.5 (Optimal)',
        message: stock.beta < 1.5 ? 'Moderate volatility' : stock.beta < 2 ? 'High volatility' : 'Very high volatility',
        weight: 0.10,
        category: 'risk'
      });
    }

    return validations;
  };

  // Intelligent scoring system
  const calculateIntelligentScore = (stock: StockData): number => {
    const validations = validateAllRules(stock);
    let totalScore = 0;
    let totalWeight = 0;

    validations.forEach(validation => {
      const weight = validation.weight || 0.1;
      totalWeight += weight;
      
      if (validation.status === 'pass') {
        totalScore += weight * 100;
      } else if (validation.status === 'warning') {
        totalScore += weight * 60;
      } else {
        totalScore += weight * 0;
      }
    });

    return totalWeight > 0 ? totalScore / totalWeight : 0;
  };

  // Generate stock expectations and recommendations
  const generateStockExpectations = (stock: StockData): StockExpectation => {
    const overallScore = calculateIntelligentScore(stock);
    const validations = validateAllRules(stock);
    
    // Calculate expected return based on 1-M system targets
    const { entryPrice } = calculateEntry(stock);
    const targets = calculateTargets(entryPrice);
    const expectedReturn = ((targets.target2 - entryPrice) / entryPrice) * 100;
    
    // Risk assessment
    const riskLevel: 'Low' | 'Medium' | 'High' = 
      overallScore >= 80 ? 'Low' :
      overallScore >= 60 ? 'Medium' : 'High';
    
    // Confidence level based on rule completeness
    const passedRules = validations.filter(v => v.status === 'pass').length;
    const totalRules = validations.length;
    const confidenceLevel = (passedRules / totalRules) * 100;
    
    // Generate recommendation
    const recommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Avoid' =
      overallScore >= 80 && confidenceLevel >= 80 ? 'Strong Buy' :
      overallScore >= 60 && confidenceLevel >= 60 ? 'Buy' :
      overallScore >= 40 ? 'Hold' : 'Avoid';
    
    // Key strengths and risks
    const keyStrengths = validations
      .filter(v => v.status === 'pass')
      .slice(0, 3)
      .map(v => v.message);
    
    const keyRisks = validations
      .filter(v => v.status === 'fail')
      .slice(0, 3)
      .map(v => v.message);
    
    return {
      symbol: stock.symbol,
      overallScore,
      expectedReturn,
      riskLevel,
      timeHorizon: '3-6 months',
      confidenceLevel,
      keyStrengths,
      keyRisks,
      recommendation,
      targetPrice: targets.target2,
      stopLoss: calculateEntry(stock).stopLoss,
      probabilityOfSuccess: Math.min(90, overallScore * 0.9)
    };
  };

  // Intelligent shortlisting function
  const performIntelligentShortlisting = (stocks: StockData[]): StockData[] => {
    return stocks
      .map(stock => ({
        ...stock,
        fundamentalScore: calculateIntelligentScore(stock)
      }))
      .filter(stock => stock.fundamentalScore >= 60) // Minimum threshold
      .sort((a, b) => (b.fundamentalScore || 0) - (a.fundamentalScore || 0))
      .slice(0, 20); // Top 20 stocks
  };

  const calculateEntry = (stock: StockData): { entryPrice: number; quantity: number; stopLoss: number } => {
    const mccHigh = stock.mccHigh || stock.m2Close;
    const entryPrice = mccHigh * 1.02; // MCC High + 2%
    const riskAmount = portfolioCapital * (portfolioCapital > 100000 ? 0.05 : 0.10);
    const quantity = Math.floor(riskAmount / entryPrice);
    const stopLoss = Math.max(entryPrice * 0.75, stock.mma20 || entryPrice * 0.8); // Max(Entry - 25% or 20 MMA)

    return { entryPrice, quantity, stopLoss };
  };

  const calculateTargets = (entryPrice: number): { target1: number; target2: number; target3: number; target4: number } => {
    return {
      target1: entryPrice * 1.25,  // Entry + 25%
      target2: entryPrice * 1.40,  // Entry + 40%
      target3: entryPrice * 1.50,  // Entry + 50%
      target4: entryPrice * 2.00   // Entry + 100%
    };
  };

  const addPosition = () => {
    if (!selectedStock) return;

    const { entryPrice, quantity, stopLoss } = calculateEntry(selectedStock);
    const targets = calculateTargets(entryPrice);
    
    const newPosition: PortfolioPosition = {
      symbol: selectedStock.symbol,
      entryPrice,
      quantity,
      currentPrice: selectedStock.price,
      stopLoss,
      ...targets,
      stage: 'entry',
      pnlPercent: 0,
      riskAmount: portfolioCapital * (portfolioCapital > 100000 ? 0.05 : 0.10),
      isReEntry: false
    };

    setPositions([...positions, newPosition]);
  };

  const checkStock = () => {
    const stock: StockData = {
      symbol: stockSymbol,
      price: stockPrice,
      marketCap,
      athPrice,
      m1Close,
      m2Close,
      m3Close,
      yearsOfData,
      mma20,
      mma10,
      volume,
      avgVolume,
      beta,
      pe,
      pb,
      roe,
      debtEquity,
      sector,
      industry
    };

    setSelectedStock(stock);
    const validations = validateAllRules(stock);
    setRuleValidations(validations);
    
    // Generate intelligent expectations
    const expectations = generateStockExpectations(stock);
    setStockExpectations([expectations]);
  };

  // Function to add stock to shortlist
  const addToShortlist = (stock: StockData) => {
    if (!shortlistedStocks.find(s => s.symbol === stock.symbol)) {
      setShortlistedStocks([...shortlistedStocks, stock]);
    }
  };

  // Function to remove stock from shortlist
  const removeFromShortlist = (symbol: string) => {
    setShortlistedStocks(shortlistedStocks.filter(s => s.symbol !== symbol));
  };

  const getRiskManagementRules = () => {
    const riskPercent = portfolioCapital > 100000 ? 5 : 10;
    const overallRisk = "10% - 25%";
    const minInvestment = portfolioCapital > 100000 ? 10000 : 2000;

    return {
      riskPercent,
      overallRisk,
      minInvestment,
      maxPositions: Math.floor(portfolioCapital / minInvestment * 0.1) // Conservative estimate
    };
  };

  const getValidationSummary = () => {
    const passCount = ruleValidations.filter(r => r.status === 'pass').length;
    const totalCount = ruleValidations.length;
    const passPercentage = totalCount > 0 ? (passCount / totalCount) * 100 : 0;
    
    return {
      passCount,
      totalCount,
      passPercentage,
      canProceed: passCount === totalCount
    };
  };

  const riskManagement = getRiskManagementRules();
  const validationSummary = getValidationSummary();

  const renderIntelligentScreening = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Intelligent Stock Screening</h2>
        <p className="text-gray-600">AI-powered shortlisting and expectation setting system</p>
      </div>

      {/* Screening Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm text-gray-600">Screening Criteria</div>
                <div className="font-bold">12 Parameters</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-sm text-gray-600">Shortlisted Stocks</div>
                <div className="font-bold">{shortlistedStocks.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-sm text-gray-600">Avg Expected Return</div>
                <div className="font-bold">
                  {shortlistedStocks.length > 0 
                    ? `${(shortlistedStocks.reduce((sum, stock) => sum + (stock.expectedReturn || 0), 0) / shortlistedStocks.length).toFixed(1)}%`
                    : '0%'
                  }
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-orange-500" />
              <div>
                <div className="text-sm text-gray-600">Risk Assessment</div>
                <div className="font-bold">Multi-factor</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Screening Criteria Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Screening Criteria Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">Fundamental Analysis Weights</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Market Cap</span>
                  <span className="font-medium">{(screeningCriteria.fundamentalWeights.marketCap * 100).toFixed(0)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">P/E Ratio</span>
                  <span className="font-medium">{(screeningCriteria.fundamentalWeights.pe * 100).toFixed(0)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">ROE</span>
                  <span className="font-medium">{(screeningCriteria.fundamentalWeights.roe * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Technical Analysis Weights</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">MCC Formation</span>
                  <span className="font-medium">{(screeningCriteria.technicalWeights.mccFormation * 100).toFixed(0)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Price Action</span>
                  <span className="font-medium">{(screeningCriteria.technicalWeights.priceAction * 100).toFixed(0)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Volume</span>
                  <span className="font-medium">{(screeningCriteria.technicalWeights.volume * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Risk Assessment Weights</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Beta</span>
                  <span className="font-medium">{(screeningCriteria.riskWeights.beta * 100).toFixed(0)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Volatility</span>
                  <span className="font-medium">{(screeningCriteria.riskWeights.volatility * 100).toFixed(0)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Liquidity</span>
                  <span className="font-medium">{(screeningCriteria.riskWeights.liquidity * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shortlisted Stocks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Shortlisted Stocks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {shortlistedStocks.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-medium mb-2">No Stocks Shortlisted</h3>
              <p className="text-gray-600">Use the Stock Checker to analyze and shortlist stocks</p>
            </div>
          ) : (
            <div className="space-y-4">
              {shortlistedStocks.map((stock, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="font-bold text-lg">{stock.symbol}</div>
                      <Badge className="bg-blue-100 text-blue-800">
                        Score: {stock.fundamentalScore?.toFixed(0) || 'N/A'}
                      </Badge>
                      <Badge className={
                        (stock.expectedReturn || 0) > 30 ? 'bg-green-100 text-green-800' :
                        (stock.expectedReturn || 0) > 20 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        Return: {stock.expectedReturn?.toFixed(1) || 'N/A'}%
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromShortlist(stock.symbol)}
                      >
                        Remove
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedStock(stock);
                          setActiveTab('checker');
                        }}
                      >
                        Analyze
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Price</div>
                      <div className="font-medium">${stock.price}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Market Cap</div>
                      <div className="font-medium">${stock.marketCap} Cr</div>
                    </div>
                    <div>
                      <div className="text-gray-600">P/E</div>
                      <div className="font-medium">{stock.pe || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">ROE</div>
                      <div className="font-medium">{stock.roe ? `${stock.roe}%` : 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Beta</div>
                      <div className="font-medium">{stock.beta || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Sector</div>
                      <div className="font-medium">{stock.sector || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Screening Guidelines */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Intelligent Screening Process</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Comprehensive analysis of 12+ parameters including fundamentals, technicals, and risk metrics</li>
                <li>• AI-powered scoring system with weighted criteria for accurate stock evaluation</li>
                <li>• Real-time expectation setting with success probability calculations</li>
                <li>• Automated shortlisting based on 1-M Investment System criteria</li>
                <li>• Risk-adjusted recommendations with clear entry and exit strategies</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRuleOverview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">1-M Investment System</h2>
        <p className="text-gray-600">Smart rule-based investment framework with automated validation</p>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm text-gray-600">Current Period</div>
                <div className="font-bold">{currentMonth}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-sm text-gray-600">Portfolio Capital</div>
                <div className="font-bold">${portfolioCapital.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-sm text-gray-600">Risk Per Trade</div>
                <div className="font-bold">{riskManagement.riskPercent}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-orange-500" />
              <div>
                <div className="text-sm text-gray-600">Active Positions</div>
                <div className="font-bold">{positions.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rule Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Entry Rules</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Stock Price {'>='} $100</li>
              <li>• Minimum 4 years of data</li>
              <li>• Market Cap {'>='} $4,000 Cr</li>
              <li>• Monthly Confirmation Candle</li>
              <li>• Entry = MCC High + 2%</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <span>Target Rules</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Target 1: Entry + 25%</li>
              <li>• Target 2: Entry + 40%</li>
              <li>• Target 3: Entry + 50%</li>
              <li>• Target 4: Entry + 100%</li>
              <li>• Trail stop loss progressively</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-500" />
              <span>Risk Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Risk: {riskManagement.riskPercent}% per trade</li>
              <li>• Overall Risk: {riskManagement.overallRisk}</li>
              <li>• Min Investment: ${riskManagement.minInvestment.toLocaleString()}</li>
              <li>• Stop Loss: Max(Entry-25% or 20MMA)</li>
              <li>• Re-entry rules apply</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-blue-800">Portfolio Capital Settings</div>
              <div className="text-sm text-blue-600">Adjust your capital to recalculate risk parameters</div>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={portfolioCapital}
                onChange={(e) => setPortfolioCapital(Number(e.target.value))}
                className="w-32"
                placeholder="Capital"
              />
              <Badge variant="outline">
                {portfolioCapital > 100000 ? '5% Risk' : '10% Risk'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStockChecker = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Stock Rule Validator</h2>
        <p className="text-gray-600">Check if a stock meets all 1-M System criteria</p>
      </div>

      {/* Stock Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>Stock Analysis Input</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Information */}
            <div>
              <Label>Stock Symbol</Label>
              <Input
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
                placeholder="e.g., RELIANCE"
              />
            </div>
            <div>
              <Label>Current Price ($)</Label>
              <Input
                type="number"
                value={stockPrice}
                onChange={(e) => setStockPrice(Number(e.target.value))}
                placeholder="Current stock price"
              />
            </div>
            <div>
              <Label>Market Cap ($ Crores)</Label>
              <Input
                type="number"
                value={marketCap}
                onChange={(e) => setMarketCap(Number(e.target.value))}
                placeholder="Market capitalization"
              />
            </div>
            <div>
              <Label>Years of Data</Label>
              <Input
                type="number"
                value={yearsOfData}
                onChange={(e) => setYearsOfData(Number(e.target.value))}
                placeholder="Historical data years"
              />
            </div>
            
            {/* Technical Data */}
            <div>
              <Label>ATH Price till M3 ($)</Label>
              <Input
                type="number"
                value={athPrice}
                onChange={(e) => setAthPrice(Number(e.target.value))}
                placeholder="All-time high price"
              />
            </div>
            <div>
              <Label>M2 Close Price ($)</Label>
              <Input
                type="number"
                value={m2Close}
                onChange={(e) => setM2Close(Number(e.target.value))}
                placeholder="Previous month close"
              />
            </div>
            <div>
              <Label>20 MMA ($)</Label>
              <Input
                type="number"
                value={mma20}
                onChange={(e) => setMma20(Number(e.target.value))}
                placeholder="20 Monthly Moving Average"
              />
            </div>
            <div>
              <Label>10 MMA ($)</Label>
              <Input
                type="number"
                value={mma10}
                onChange={(e) => setMma10(Number(e.target.value))}
                placeholder="10 Monthly Moving Average"
              />
            </div>
            
            {/* Fundamental Data */}
            <div>
              <Label>P/E Ratio</Label>
              <Input
                type="number"
                value={pe}
                onChange={(e) => setPe(Number(e.target.value))}
                placeholder="Price to Earnings ratio"
              />
            </div>
            <div>
              <Label>P/B Ratio</Label>
              <Input
                type="number"
                value={pb}
                onChange={(e) => setPb(Number(e.target.value))}
                placeholder="Price to Book ratio"
              />
            </div>
            <div>
              <Label>ROE (%)</Label>
              <Input
                type="number"
                value={roe}
                onChange={(e) => setRoe(Number(e.target.value))}
                placeholder="Return on Equity"
              />
            </div>
            <div>
              <Label>Debt/Equity Ratio</Label>
              <Input
                type="number"
                value={debtEquity}
                onChange={(e) => setDebtEquity(Number(e.target.value))}
                placeholder="Debt to Equity ratio"
              />
            </div>
            
            {/* Volume & Risk Data */}
            <div>
              <Label>Current Volume</Label>
              <Input
                type="number"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                placeholder="Current trading volume"
              />
            </div>
            <div>
              <Label>Average Volume</Label>
              <Input
                type="number"
                value={avgVolume}
                onChange={(e) => setAvgVolume(Number(e.target.value))}
                placeholder="Average trading volume"
              />
            </div>
            <div>
              <Label>Beta</Label>
              <Input
                type="number"
                value={beta}
                onChange={(e) => setBeta(Number(e.target.value))}
                placeholder="Beta coefficient"
              />
            </div>
            <div>
              <Label>Sector</Label>
              <Select value={sector} onValueChange={setSector}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Banking">Banking</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Energy">Energy</SelectItem>
                  <SelectItem value="FMCG">FMCG</SelectItem>
                  <SelectItem value="Auto">Automobile</SelectItem>
                  <SelectItem value="Telecom">Telecom</SelectItem>
                  <SelectItem value="Pharma">Pharmaceutical</SelectItem>
                  <SelectItem value="Metals">Metals</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={checkStock} className="w-full" disabled={!stockSymbol || !stockPrice}>
            <Brain className="h-4 w-4 mr-2" />
            Validate Stock Rules
          </Button>
        </CardContent>
      </Card>

      {/* Rule Validation Results */}
      {ruleValidations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Rule Validation Results</span>
              </span>
              <Badge className={validationSummary.canProceed ? 'bg-green-500' : 'bg-red-500'}>
                {validationSummary.passCount}/{validationSummary.totalCount} Rules Passed
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Validation Progress</span>
                <span className="text-sm text-gray-600">{validationSummary.passPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={validationSummary.passPercentage} className="mb-4" />
              
              {ruleValidations.map((rule) => (
                <div key={rule.ruleNumber} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center space-x-3">
                    {rule.status === 'pass' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <div className="font-medium">Rule {rule.ruleNumber}: {rule.ruleName}</div>
                      <div className="text-sm text-gray-600">{rule.message}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{rule.value}</div>
                    <div className="text-sm text-gray-600">{rule.required}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stock Expectations Display */}
            {stockExpectations.length > 0 && (
              <div className="mt-6 space-y-4">
                {stockExpectations.map((expectation, index) => (
                  <Card key={index} className="border-l-4 border-blue-500">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center space-x-2">
                          <Brain className="h-5 w-5" />
                          <span>Intelligent Analysis: {expectation.symbol}</span>
                        </span>
                        <Badge className={
                          expectation.recommendation === 'Strong Buy' ? 'bg-green-600' :
                          expectation.recommendation === 'Buy' ? 'bg-blue-600' :
                          expectation.recommendation === 'Hold' ? 'bg-yellow-600' : 'bg-red-600'
                        }>
                          {expectation.recommendation}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded">
                          <div className="text-2xl font-bold text-blue-600">{expectation.overallScore.toFixed(0)}</div>
                          <div className="text-sm text-gray-600">Overall Score</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded">
                          <div className="text-2xl font-bold text-green-600">{expectation.expectedReturn.toFixed(1)}%</div>
                          <div className="text-sm text-gray-600">Expected Return</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded">
                          <div className="text-2xl font-bold text-purple-600">{expectation.confidenceLevel.toFixed(0)}%</div>
                          <div className="text-sm text-gray-600">Confidence Level</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="font-medium text-green-800 mb-2">Key Strengths</div>
                          <ul className="text-sm space-y-1">
                            {expectation.keyStrengths.map((strength, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-red-800 mb-2">Key Risks</div>
                          <ul className="text-sm space-y-1">
                            {expectation.keyRisks.map((risk, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span>{risk}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-600">Target Price</div>
                          <div className="font-bold">${expectation.targetPrice.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Stop Loss</div>
                          <div className="font-bold text-red-600">${expectation.stopLoss.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Risk Level</div>
                          <Badge className={
                            expectation.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                            expectation.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {expectation.riskLevel}
                          </Badge>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Success Probability</div>
                          <div className="font-bold">{expectation.probabilityOfSuccess.toFixed(0)}%</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-600">Time Horizon: {expectation.timeHorizon}</div>
                        </div>
                        <div className="space-x-2">
                          <Button 
                            variant="outline" 
                            onClick={() => addToShortlist(selectedStock!)}
                            disabled={!selectedStock}
                          >
                            Add to Shortlist
                          </Button>
                          {validationSummary.canProceed && (
                            <Button onClick={addPosition} className="bg-green-600 hover:bg-green-700">
                              Add to Portfolio
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Portfolio Tracker</h2>
        <p className="text-gray-600">Monitor your 1-M System positions and targets</p>
      </div>

      {positions.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <PieChart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-medium mb-2">No Positions Yet</h3>
            <p className="text-gray-600">Use the Stock Checker to validate and add positions</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {positions.map((position, index) => (
            <Card key={index} className="border-l-4 border-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="font-bold text-lg">{position.symbol}</div>
                    <Badge className={position.stage === 'entry' ? 'bg-blue-500' : 'bg-green-500'}>
                      {position.stage.toUpperCase()}
                    </Badge>
                    {position.isReEntry && <Badge variant="outline">RE-ENTRY</Badge>}
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">${position.currentPrice.toLocaleString()}</div>
                    <div className={`text-sm ${position.pnlPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600">Entry Price</div>
                    <div className="font-medium">${position.entryPrice.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Quantity</div>
                    <div className="font-medium">{position.quantity}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Stop Loss</div>
                    <div className="font-medium text-red-600">${position.stopLoss.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Risk Amount</div>
                    <div className="font-medium">${position.riskAmount.toLocaleString()}</div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="text-xs text-gray-600">Target 1</div>
                    <div className="font-medium">${position.target1.toLocaleString()}</div>
                    <div className="text-xs">+25%</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="text-xs text-gray-600">Target 2</div>
                    <div className="font-medium">${position.target2.toLocaleString()}</div>
                    <div className="text-xs">+40%</div>
                  </div>
                  <div className="text-center p-2 bg-yellow-50 rounded">
                    <div className="text-xs text-gray-600">Target 3</div>
                    <div className="font-medium">${position.target3.toLocaleString()}</div>
                    <div className="text-xs">+50%</div>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <div className="text-xs text-gray-600">Target 4</div>
                    <div className="font-medium">${position.target4.toLocaleString()}</div>
                    <div className="text-xs">+100%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderRuleBook = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Complete Rule Book</h2>
        <p className="text-gray-600">Comprehensive 1-M Investment System rules and guidelines</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Entry Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <span>Entry Rules (1-12)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div><strong>Rule 1:</strong> Date Preparing For (e.g., 1 Aug to 31 Aug 2024)</div>
              <div><strong>Rule 2:</strong> Define M1, M2, M3 periods</div>
              <div><strong>Rule 3:</strong> Stock Price {'>'} $100</div>
              <div><strong>Rule 4:</strong> Minimum 4 years of data</div>
              <div><strong>Rule 5:</strong> Market Cap {'>'} $4,000 Crores</div>
              <div><strong>Rule 6:</strong> Stock Price {'>'} $100 (confirmation)</div>
              <div><strong>Rule 7:</strong> Find ATH price till M3</div>
              <div><strong>Rule 8:</strong> M2 Close {'>'} ATH (MCC formation)</div>
              <div><strong>Rule 9:</strong> Check ATH till previous month</div>
              <div><strong>Rule 10:</strong> Monthly timeframe validity</div>
              <div><strong>Rule 11:</strong> Collect MCC High price</div>
              <div><strong>Rule 12:</strong> Entry = MCC High + 2%</div>
            </div>
          </CardContent>
        </Card>

        {/* Target Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-500" />
              <span>Target Rules (13-16)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div><strong>Rule 13:</strong> Target 1 = Entry + 25% (Book 50% shares)</div>
              <div><strong>Rule 14:</strong> Target 2 = Entry + 40% (Trail SK to entry)</div>
              <div><strong>Rule 15:</strong> Target 3 = Entry + 50% (Book 50% remaining)</div>
              <div><strong>Rule 16:</strong> Target 4 = Entry + 100% (Trail SK to 10 MMA)</div>
            </div>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Once all quantity is exited, go back to Rule 1 for new opportunities
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Risk Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-500" />
              <span>Risk Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div><strong>Portfolio {'>'} $1,00,000:</strong></div>
              <div>• Qty = (Capital × 5%) / Entry</div>
              <div>• Min investment: $10,000 per stock</div>
              <div>• Overall risk: 10% - 25%</div>
              <div><strong>Portfolio {'<'} $1,00,000:</strong></div>
              <div>• Qty = (Capital × 10%) / Entry</div>
              <div>• Min investment: $2,000 per stock</div>
              <div>• Stock entry price {'<'} $800</div>
            </div>
          </CardContent>
        </Card>

        {/* Re-Entry Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span>Re-Entry Rules</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div><strong>Rule 1:</strong> Original entry should be before 3 months</div>
              <div><strong>Rule 2:</strong> At least one MCC since original entry</div>
              <div><strong>Rule 3:</strong> Stock should not have crossed 25% target</div>
              <div><strong>Rule 4:</strong> New entry must fulfill all criteria</div>
              <div><strong>Rule 5:</strong> New entry ≤ Original entry + 25%</div>
              <div><strong>Rule 6:</strong> Take quantity as per Rule 11</div>
              <div><strong>Rule 7:</strong> Book targets as per your entry</div>
              <div><strong>Rule 8:</strong> Follow target booking as per new entry</div>
              <div><strong>Rule 9:</strong> Keep note of both entries</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gap Rules & Exceptions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <span>Gap Rules & Exceptions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Entry Missed (Gap Up)</h4>
              <p className="text-sm text-gray-600">
                Wait for 15 minutes (9:30 AM), then buy above 15-minute high + 1%, only for that day
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Stop Loss Missed (Gap Down)</h4>
              <p className="text-sm text-gray-600">
                Wait for 15 minutes (9:30 AM), keep 15-minute low - 1% as stop loss, only for that day
              </p>
            </div>
          </div>
          
          <Alert>
            <Timer className="h-4 w-4" />
            <AlertDescription>
              If position not exited by 3 PM, check CMP at 3 PM. If below stop loss, exit at market price.
            </AlertDescription>
          </Alert>
          
          <div className="bg-yellow-50 p-3 rounded">
            <h4 className="font-medium text-yellow-800">Special Exception</h4>
            <p className="text-sm text-yellow-700">
              If % PnK below 25% (in case missed), trail exit at PnK - 1%
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      <SEO 
        title="Investment Rules & Strategies - Essential Guidelines for Smart Investing"
        description="Learn fundamental investment rules and strategies for building wealth. Master key principles of smart investing, risk management, and portfolio diversification with actionable investment guidelines."
        keywords="investment rules, investment strategies, investment guidelines, smart investing tips, investment principles, portfolio diversification, investment risk management, wealth building strategies"
        canonical="https://dollarmento.com/investment-rules"
      />
      <ResponsivePageWrapper>
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">1-M Investment System</h1>
          <p className="text-gray-600">
            Smart rule-based investment framework with automated validation and portfolio tracking
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">System Overview</TabsTrigger>
            <TabsTrigger value="checker">Stock Checker</TabsTrigger>
            <TabsTrigger value="screening">Intelligent Screening</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="rulebook">Rule Book</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {renderRuleOverview()}
          </TabsContent>
          
          <TabsContent value="checker" className="space-y-6">
            {renderStockChecker()}
          </TabsContent>
          
          <TabsContent value="screening" className="space-y-6">
            {renderIntelligentScreening()}
          </TabsContent>
          
          <TabsContent value="portfolio" className="space-y-6">
            {renderPortfolio()}
          </TabsContent>
          
          <TabsContent value="rulebook" className="space-y-6">
            {renderRuleBook()}
          </TabsContent>
        </Tabs>
      </div>
    </ResponsivePageWrapper>
    </>
  );
}