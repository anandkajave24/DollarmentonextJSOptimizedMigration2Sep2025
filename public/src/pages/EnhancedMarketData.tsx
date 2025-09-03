import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../components/ui/table";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  ChevronUp, 
  ChevronDown, 
  Clock, 
  RefreshCw,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Building2,
  Globe,
  Zap,
  Activity,
  DollarSign
} from "lucide-react";

interface MarketIndex {
  id: number;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
  volume?: number;
  high?: number;
  low?: number;
}

interface SectorData {
  id: number;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  companies: number;
}

interface StockData {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  sector: string;
  exchange: 'BSE' | 'NSE';
  high: number;
  low: number;
  openPrice: number;
}

interface MarketNews {
  id: number;
  title: string;
  source: string;
  publishedAt: string;
  category: string;
  summary: string;
  url: string;
}

const EnhancedMarketData = () => {
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedTab, setSelectedTab] = useState("indices");

  // Real-time update simulation (will be replaced with actual API calls)
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Sample data structure - ready for real API integration
  const marketIndices: MarketIndex[] = [
    {
      id: 1,
      name: "SENSEX",
      value: 67825.45,
      change: 245.67,
      changePercent: 0.36,
      lastUpdated: new Date().toISOString(),
      volume: 2456789,
      high: 67950.23,
      low: 67650.12
    },
    {
      id: 2,
      name: "NIFTY 50",
      value: 20456.78,
      change: -78.34,
      changePercent: -0.38,
      lastUpdated: new Date().toISOString(),
      volume: 1876543,
      high: 20567.89,
      low: 20345.67
    },
    {
      id: 3,
      name: "NIFTY BANK",
      value: 45678.90,
      change: 456.78,
      changePercent: 1.01,
      lastUpdated: new Date().toISOString(),
      volume: 987654,
      high: 45789.12,
      low: 45234.56
    },
    {
      id: 4,
      name: "NIFTY IT",
      value: 34567.89,
      change: -234.56,
      changePercent: -0.67,
      lastUpdated: new Date().toISOString(),
      volume: 765432,
      high: 34789.45,
      low: 34123.78
    },
    {
      id: 5,
      name: "NIFTY AUTO",
      value: 15678.90,
      change: 123.45,
      changePercent: 0.79,
      lastUpdated: new Date().toISOString(),
      volume: 543210,
      high: 15734.56,
      low: 15456.78
    }
  ];

  const sectorData: SectorData[] = [
    {
      id: 1,
      name: "Banking & Financial Services",
      value: 45678.90,
      change: 456.78,
      changePercent: 1.01,
      volume: 12345678,
      marketCap: "₹45.6L Cr",
      companies: 85
    },
    {
      id: 2,
      name: "Information Technology",
      value: 34567.89,
      change: -234.56,
      changePercent: -0.67,
      volume: 9876543,
      marketCap: "₹67.8L Cr",
      companies: 120
    },
    {
      id: 3,
      name: "Oil & Gas",
      value: 23456.78,
      change: 345.67,
      changePercent: 1.49,
      volume: 7654321,
      marketCap: "₹23.4L Cr",
      companies: 45
    },
    {
      id: 4,
      name: "Healthcare",
      value: 18765.43,
      change: -123.45,
      changePercent: -0.65,
      volume: 5432109,
      marketCap: "₹34.5L Cr",
      companies: 78
    },
    {
      id: 5,
      name: "FMCG",
      value: 27890.12,
      change: 234.56,
      changePercent: 0.85,
      volume: 4321098,
      marketCap: "₹56.7L Cr",
      companies: 65
    },
    {
      id: 6,
      name: "Automobiles",
      value: 15678.90,
      change: 123.45,
      changePercent: 0.79,
      volume: 3210987,
      marketCap: "₹28.9L Cr",
      companies: 42
    },
    {
      id: 7,
      name: "Metals & Mining",
      value: 19876.54,
      change: -345.67,
      changePercent: -1.71,
      volume: 2109876,
      marketCap: "₹19.8L Cr",
      companies: 35
    },
    {
      id: 8,
      name: "Real Estate",
      value: 12345.67,
      change: 67.89,
      changePercent: 0.55,
      volume: 1098765,
      marketCap: "₹12.3L Cr",
      companies: 28
    }
  ];

  const topStocks: StockData[] = [
    {
      id: 1,
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd",
      price: 2456.75,
      change: 45.60,
      changePercent: 1.89,
      volume: 8765432,
      marketCap: "₹16.6L Cr",
      sector: "Oil & Gas",
      exchange: "NSE",
      high: 2478.90,
      low: 2434.50,
      openPrice: 2445.30
    },
    {
      id: 2,
      symbol: "TCS",
      name: "Tata Consultancy Services",
      price: 3678.90,
      change: -56.78,
      changePercent: -1.52,
      volume: 5432109,
      marketCap: "₹13.4L Cr",
      sector: "Information Technology",
      exchange: "NSE",
      high: 3712.45,
      low: 3654.32,
      openPrice: 3689.75
    },
    {
      id: 3,
      symbol: "HDFCBANK",
      name: "HDFC Bank Ltd",
      price: 1567.89,
      change: 23.45,
      changePercent: 1.52,
      volume: 6543210,
      marketCap: "₹11.9L Cr",
      sector: "Banking",
      exchange: "NSE",
      high: 1578.90,
      low: 1545.67,
      openPrice: 1556.78
    },
    {
      id: 4,
      symbol: "INFY",
      name: "Infosys Ltd",
      price: 1789.45,
      change: -34.56,
      changePercent: -1.90,
      volume: 4321098,
      marketCap: "₹7.4L Cr",
      sector: "Information Technology",
      exchange: "NSE",
      high: 1812.34,
      low: 1776.89,
      openPrice: 1798.67
    },
    {
      id: 5,
      symbol: "ICICIBANK",
      name: "ICICI Bank Ltd",
      price: 1123.45,
      change: 67.89,
      changePercent: 6.43,
      volume: 7654321,
      marketCap: "₹7.9L Cr",
      sector: "Banking",
      exchange: "NSE",
      high: 1134.56,
      low: 1089.78,
      openPrice: 1098.45
    }
  ];

  const marketNews: MarketNews[] = [
    {
      id: 1,
      title: "BSE Sensex surges 500 points on strong Q3 earnings expectations",
      source: "Economic Times",
      publishedAt: new Date().toISOString(),
      category: "Market",
      summary: "Indian benchmark indices rallied on strong corporate earnings outlook and positive global cues.",
      url: "#"
    },
    {
      id: 2,
      title: "RBI monetary policy meeting: Rate cut expectations build up",
      source: "Business Standard",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      category: "Policy",
      summary: "Markets anticipate potential policy rate adjustments in upcoming RBI meeting.",
      url: "#"
    },
    {
      id: 3,
      title: "FII inflows continue for fifth consecutive session",
      source: "Money Control",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      category: "FII/DII",
      summary: "Foreign institutional investors pump in ₹2,500 crores into Indian equities.",
      url: "#"
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value: number) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(1)}Cr`;
    } else if (value >= 100000) {
      return `${(value / 100000).toFixed(1)}L`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeBadgeColor = (change: number) => {
    return change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <>
      <Helmet>
        <title>Live Market Data - BSE & NSE | RupeeSmart</title>
        <meta name="description" content="Real-time BSE and NSE market data with live indices, sector performance, top stocks, and market news updates" />
      </Helmet>

      <div className="px-4 py-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Live Market Data</h1>
            <p className="text-gray-600">Real-time BSE & NSE market updates with comprehensive sector analysis</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLastUpdate(new Date())}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button
              variant={autoRefresh ? "default" : "outline"}
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              {autoRefresh ? "Live" : "Manual"}
            </Button>
          </div>
        </div>

        {/* Market Status */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-green-700">Market Open</span>
                </div>
                <span className="text-sm text-gray-600">BSE & NSE trading hours: 9:15 AM - 3:30 PM IST</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold">₹1,23,456 Cr</div>
                  <div className="text-gray-500">Total Turnover</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">2,345</div>
                  <div className="text-gray-500">Advances</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">1,234</div>
                  <div className="text-gray-500">Declines</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Navigation */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="indices">Market Indices</TabsTrigger>
            <TabsTrigger value="sectors">Sector Performance</TabsTrigger>
            <TabsTrigger value="stocks">Top Stocks</TabsTrigger>
            <TabsTrigger value="news">Market News</TabsTrigger>
          </TabsList>

          {/* Market Indices Tab */}
          <TabsContent value="indices" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketIndices.map((index) => (
                <Card key={index.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{index.name}</h3>
                      <Badge className={getChangeBadgeColor(index.change)}>
                        {index.change >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                        {index.changePercent.toFixed(2)}%
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">{index.value.toLocaleString('en-IN')}</div>
                      <div className={`text-sm font-medium ${getChangeColor(index.change)}`}>
                        {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
                      </div>
                      {index.volume && (
                        <div className="text-xs text-gray-500">
                          Volume: {formatNumber(index.volume)}
                        </div>
                      )}
                      {index.high && index.low && (
                        <div className="text-xs text-gray-500">
                          H: {index.high.toFixed(2)} | L: {index.low.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sector Performance Tab */}
          <TabsContent value="sectors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Sector Performance
                </CardTitle>
                <CardDescription>Live sector-wise market performance across BSE and NSE</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sector</TableHead>
                      <TableHead>Index Value</TableHead>
                      <TableHead>Change</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Market Cap</TableHead>
                      <TableHead>Companies</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sectorData.map((sector) => (
                      <TableRow key={sector.id}>
                        <TableCell className="font-medium">{sector.name}</TableCell>
                        <TableCell>{sector.value.toLocaleString('en-IN')}</TableCell>
                        <TableCell className={getChangeColor(sector.change)}>
                          {sector.change >= 0 ? '+' : ''}{sector.change.toFixed(2)} ({sector.changePercent >= 0 ? '+' : ''}{sector.changePercent.toFixed(2)}%)
                        </TableCell>
                        <TableCell>{formatNumber(sector.volume)}</TableCell>
                        <TableCell>{sector.marketCap}</TableCell>
                        <TableCell>{sector.companies}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Top Stocks Tab */}
          <TabsContent value="stocks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top Performing Stocks
                </CardTitle>
                <CardDescription>Live stock prices from BSE and NSE exchanges</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Change</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Market Cap</TableHead>
                      <TableHead>High/Low</TableHead>
                      <TableHead>Exchange</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topStocks.map((stock) => (
                      <TableRow key={stock.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-xs text-gray-500">{stock.name}</div>
                            <div className="text-xs text-blue-600">{stock.sector}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{formatCurrency(stock.price)}</TableCell>
                        <TableCell className={getChangeColor(stock.change)}>
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                        </TableCell>
                        <TableCell>{formatNumber(stock.volume)}</TableCell>
                        <TableCell>{stock.marketCap}</TableCell>
                        <TableCell className="text-xs">
                          H: {stock.high.toFixed(2)}<br/>
                          L: {stock.low.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{stock.exchange}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market News Tab */}
          <TabsContent value="news" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Latest Market News
                </CardTitle>
                <CardDescription>Real-time financial news and market updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketNews.map((news) => (
                    <div key={news.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{news.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{news.summary}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>{news.source}</span>
                            <span>•</span>
                            <span>{new Date(news.publishedAt).toLocaleTimeString()}</span>
                            <Badge variant="secondary" className="text-xs">{news.category}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default EnhancedMarketData;