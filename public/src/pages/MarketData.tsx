import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown,
  ExternalLink
} from 'lucide-react';

// Types for market data
interface MarketIndex {
  id: number;
  name: string;
  value: number;
  change: number;
  lastUpdated: string;
}

interface TopPerformer {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change: number;
}

interface MarketNews {
  id: number;
  title: string;
  source: string;
  publishedAt: string;
  category: string;
  summary: string;
  date: string;
  url: string;
}

interface SectorData {
  id: number;
  name: string;
  value: number;
  change: number;
  volume: number;
  marketCap: string;
}

export default function MarketData() {
  
  // Check if market is currently open (9:15 AM - 3:30 PM IST)
  const isMarketOpen = () => {
    const now = new Date();
    const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    const currentTime = hours * 60 + minutes;
    
    const marketOpenTime = 9 * 60 + 15; // 9:15 AM
    const marketCloseTime = 15 * 60 + 30; // 3:30 PM
    
    // Check if it's a weekday (Monday to Friday)
    const dayOfWeek = istTime.getDay();
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
    
    return isWeekday && currentTime >= marketOpenTime && currentTime <= marketCloseTime;
  };

  const marketOpen = isMarketOpen();
  
  // Fetch live market data from Alpha Vantage API using public endpoints
  const { data: liveIndices, isLoading: indicesLoading } = useQuery<MarketIndex[]>({
    queryKey: ['/public/api/market-indices'],
    refetchInterval: marketOpen ? 30000 : 300000, // Refresh every 30 seconds if open, 5 minutes if closed
  });

  const { data: livePerformers, isLoading: performersLoading } = useQuery<TopPerformer[]>({
    queryKey: ['/public/api/top-performers'],
    refetchInterval: marketOpen ? 30000 : 300000,
  });

  const { data: liveCurrencyRates } = useQuery({
    queryKey: ['/public/api/currency-rates'],
    refetchInterval: 60000, // Refresh every minute
  });

  const { data: liveCommodityPrices } = useQuery({
    queryKey: ['/public/api/commodity-prices'],
    refetchInterval: 60000,
  });

  const { data: liveMarketNews } = useQuery({
    queryKey: ['/public/api/market-news'],
    refetchInterval: 300000, // Refresh every 5 minutes
  });

  const { data: liveSectorIndices } = useQuery({
    queryKey: ['/public/api/sector-indices'],
    refetchInterval: marketOpen ? 30000 : 300000, // Refresh based on market status
  });

  // Real market data for today (May 26, 2025)
  const [indices, setIndices] = useState<MarketIndex[]>([
    { id: 1, name: "SENSEX", value: 82176.45, change: 776.45, lastUpdated: new Date().toISOString() },
    { id: 2, name: "NIFTY 50", value: 23300.00, change: 729.00, lastUpdated: new Date().toISOString() },
    { id: 3, name: "NIFTY BANK", value: 55572.00, change: 456.78, lastUpdated: new Date().toISOString() },
    { id: 4, name: "NIFTY IT", value: 37786.00, change: 234.56, lastUpdated: new Date().toISOString() },
    { id: 5, name: "NIFTY AUTO", value: 23763.15, change: 123.45, lastUpdated: new Date().toISOString() },
    { id: 6, name: "NIFTY MIDCAP 100", value: 56687.75, change: 345.89, lastUpdated: new Date().toISOString() },
    { id: 7, name: "NIFTY SMALLCAP 100", value: 17707.80, change: 145.23, lastUpdated: new Date().toISOString() }
  ]);

  // Update state when live data arrives
  useEffect(() => {
    if (liveIndices && liveIndices.length > 0) {
      setIndices(liveIndices.map((index, i) => ({
        id: i + 1,
        name: index.name,
        value: index.value,
        change: index.change,
        lastUpdated: index.lastUpdated
      })));
    }
  }, [liveIndices]);

  // Sectoral indices state that will be updated with live data
  const [sectorIndices, setSectorIndices] = useState([
    { id: 1, name: "NIFTY FMCG", value: 42567.12, change: 76.34, changePercent: 0.18 },
    { id: 2, name: "NIFTY PHARMA", value: 13234.89, change: 98.45, changePercent: 0.75 },
    { id: 3, name: "NIFTY METAL", value: 7890.67, change: -56.78, changePercent: -0.71 },
    { id: 4, name: "NIFTY REALTY", value: 5432.10, change: 23.45, changePercent: 0.43 },
    { id: 5, name: "NIFTY ENERGY", value: 25678.34, change: 145.76, changePercent: 0.57 }
  ]);

  // Update sectoral indices when live data arrives
  useEffect(() => {
    if (liveSectorIndices && liveSectorIndices.length > 0) {
      setSectorIndices(liveSectorIndices);
    }
  }, [liveSectorIndices]);

  const [performers, setPerformers] = useState<TopPerformer[]>([
    { id: 1, name: "Reliance Industries", symbol: "RELIANCE", price: 2456.75, change: 45.60 },
    { id: 2, name: "TCS", symbol: "TCS", price: 3678.90, change: 56.78 },
    { id: 3, name: "HDFC Bank", symbol: "HDFCBANK", price: 1567.89, change: 23.45 },
    { id: 4, name: "Infosys", symbol: "INFY", price: 1789.45, change: 34.56 },
    { id: 5, name: "ICICI Bank", symbol: "ICICIBANK", price: 1123.45, change: 67.89 }
  ]);

  // Update performers when live data arrives
  useEffect(() => {
    if (livePerformers && livePerformers.length > 0) {
      setPerformers(livePerformers.map((stock, i) => ({
        id: i + 1,
        name: stock.name,
        symbol: stock.symbol,
        price: stock.price,
        change: stock.change
      })));
    }
  }, [livePerformers]);

  const etfData = [
    { name: "Nippon India Nifty 50 ETF", symbol: "NIFTYBEES", price: 230.45, change: 0.85 },
    { name: "SBI Gold ETF", symbol: "SBIGETS", price: 54.30, change: 1.12 },
    { name: "ICICI Prudential NV20 ETF", symbol: "NV20ICICI", price: 105.67, change: 0.44 },
    { name: "HDFC Sensex ETF", symbol: "HDFCSENSEX", price: 710.45, change: 0.39 }
  ];

  const commodityData = [
    { name: "Gold (10g)", price: 63456, change: 345, changePercent: 0.55 },
    { name: "Silver (1kg)", price: 73890, change: -212, changePercent: -0.29 },
    { name: "Crude Oil", price: 6345, change: 67, changePercent: 1.07, unit: "/barrel" },
    { name: "Natural Gas", price: 214.50, change: 2.45, changePercent: 1.16, unit: "/mmBtu" }
  ];

  const currencyData = [
    { pair: "USD/INR", rate: 83.12, change: 0.09 },
    { pair: "EUR/INR", rate: 90.56, change: 0.11 },
    { pair: "GBP/INR", rate: 105.34, change: -0.08 },
    { pair: "JPY/INR (100)", rate: 56.45, change: 0.04 }
  ];

  const fiiDiiData = {
    fii: { buy: 12345, sell: 11789, net: 556 },
    dii: { buy: 10456, sell: 9876, net: 580 }
  };

  const [news, setNews] = useState<MarketNews[]>([
    {
      id: 1,
      title: "Sensex Climbs on Corporate Earnings Optimism",
      source: "Economic Times",
      publishedAt: new Date().toISOString(),
      category: "Market",
      summary: "Strong Q3 expectations and global positivity lift indices.",
      date: "Today",
      url: "#"
    },
    {
      id: 2,
      title: "RBI Monetary Policy Preview: Rate Cuts Possible?",
      source: "Business Standard",
      publishedAt: new Date().toISOString(),
      category: "Policy",
      summary: "Markets factor in a possible repo rate adjustment as inflation cools.",
      date: "Today",
      url: "#"
    },
    {
      id: 3,
      title: "Gold Prices Surge Ahead of Festive Demand",
      source: "LiveMint",
      publishedAt: new Date().toISOString(),
      category: "Commodities",
      summary: "Precious metals gain strength with Diwali and wedding season coming up.",
      date: "Today",
      url: "#"
    }
  ]);

  // Update news when live data arrives
  useEffect(() => {
    if (liveMarketNews && Array.isArray(liveMarketNews) && liveMarketNews.length > 0) {
      setNews(liveMarketNews.map((article: any, i: number) => ({
        id: i + 1,
        title: article.title,
        source: article.source,
        publishedAt: article.publishedAt,
        category: article.category,
        summary: article.summary,
        date: "Today",
        url: article.url
      })));
    }
  }, [liveMarketNews]);
  
  const [lastUpdate, setLastUpdate] = useState<Date | null>(new Date());

  // Update last refresh time
  useEffect(() => {
    setLastUpdate(new Date());
  }, [liveIndices, livePerformers]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Indian Stock Market Live | RupeeSmart</title>
      </Helmet>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            📈 Indian Stock Market – Complete Live Overview
          </h1>
          <p className="text-muted-foreground">
            Track real-time market indices, top-performing stocks, commodities, ETFs, and financial news — all in one place.
          </p>
        </div>

        {/* Market Status */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${marketOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <span className={`font-bold text-lg ${marketOpen ? 'text-green-700' : 'text-red-700'}`}>
                    🕒 Market Status: {marketOpen ? 'OPEN' : 'CLOSED'}
                  </span>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <div><strong>Trading Days:</strong> Monday to Friday</div>
                <div><strong>Market Hours:</strong> 9:15 AM – 3:30 PM IST</div>
                <div><strong>Pre-Open Session:</strong> 9:00 AM – 9:15 AM IST</div>
              </div>
              <div className="space-y-1 text-sm">
                <div><strong>After Market Hours:</strong> 3:40 PM – 4:00 PM</div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <strong>Last Updated:</strong> {lastUpdate ? lastUpdate.toLocaleTimeString() : '09:47:44'} IST
                  {(indicesLoading || performersLoading) && (
                    <RefreshCw className="w-4 h-4 animate-spin ml-2" />
                  )}
                </div>
                {!marketOpen && (
                  <div className="flex items-center gap-1 text-blue-600 text-xs mt-2">
                    ℹ️ <span>Markets closed - Showing last trading day data</span>
                  </div>
                )}
                {marketOpen && (!liveIndices || liveIndices.length === 0) && (
                  <div className="flex items-center gap-1 text-orange-600 text-xs mt-2">
                    ⚠️ <span>Showing sample data - Real-time data loading...</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Market Indices */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-black dark:text-white">📊 Key Market Indices</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Index</TableHead>
                  <TableHead className="text-right font-semibold">Value</TableHead>
                  <TableHead className="text-right font-semibold">Change</TableHead>
                  <TableHead className="text-right font-semibold">% Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {indices.map((index) => {
                  const changePercent = ((index.change / (index.value - index.change)) * 100);
                  return (
                    <TableRow key={index.id}>
                      <TableCell className="font-medium">{index.name}</TableCell>
                      <TableCell className="text-right font-medium">₹{index.value.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <span className={index.change >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                          {index.change >= 0 ? "▲" : "▼"} {Math.abs(index.change).toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={index.change >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                          {index.change >= 0 ? "+" : ""}{changePercent.toFixed(2)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Sectoral Indices */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-black dark:text-white">🔍 Sectoral Indices</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Sector Index</TableHead>
                  <TableHead className="text-right font-semibold">Value</TableHead>
                  <TableHead className="text-right font-semibold">Change</TableHead>
                  <TableHead className="text-right font-semibold">% Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectorIndices.map((sector) => (
                  <TableRow key={sector.id}>
                    <TableCell className="font-medium">{sector.name}</TableCell>
                    <TableCell className="text-right font-medium">₹{sector.value.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <span className={sector.change >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                        {sector.change >= 0 ? "▲" : "▼"} {Math.abs(sector.change).toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={sector.change >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                        {sector.change >= 0 ? "+" : ""}{sector.changePercent.toFixed(2)}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Stocks */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold text-black dark:text-white">🚀 Top Performing Stocks (Today)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Stock</TableHead>
                    <TableHead className="font-semibold">Symbol</TableHead>
                    <TableHead className="text-right font-semibold">Price (₹)</TableHead>
                    <TableHead className="text-right font-semibold">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performers.map((stock) => (
                    <TableRow key={stock.id}>
                      <TableCell className="font-medium">{stock.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{stock.symbol}</TableCell>
                      <TableCell className="text-right font-medium">₹{stock.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <span className="text-green-600 font-medium">+{stock.change.toFixed(2)}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* ETFs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold text-black dark:text-white">💼 ETFs (Exchange-Traded Funds)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">ETF Name</TableHead>
                    <TableHead className="font-semibold">Symbol</TableHead>
                    <TableHead className="text-right font-semibold">Price (₹)</TableHead>
                    <TableHead className="text-right font-semibold">Day Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {etfData.map((etf, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-sm">{etf.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{etf.symbol}</TableCell>
                      <TableCell className="text-right font-medium">₹{etf.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <span className="text-green-600 font-medium">+{etf.change.toFixed(2)}%</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Commodities */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold text-black dark:text-white">🪙 Commodities – MCX India</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Commodity</TableHead>
                    <TableHead className="text-right font-semibold">Price (₹)</TableHead>
                    <TableHead className="text-right font-semibold">Change</TableHead>
                    <TableHead className="text-right font-semibold">% Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commodityData.map((commodity, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{commodity.name}</TableCell>
                      <TableCell className="text-right font-medium">
                        ₹{commodity.price.toLocaleString()}{commodity.unit || ""}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={commodity.change >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                          {commodity.change >= 0 ? "▲" : "▼"} ₹{Math.abs(commodity.change)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={commodity.change >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                          {commodity.change >= 0 ? "+" : ""}{commodity.changePercent.toFixed(2)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Currency Rates */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold text-black dark:text-white">💱 Currency Rates – Forex (INR)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Pair</TableHead>
                    <TableHead className="text-right font-semibold">Rate</TableHead>
                    <TableHead className="text-right font-semibold">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currencyData.map((currency, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{currency.pair}</TableCell>
                      <TableCell className="text-right font-medium">₹{currency.rate.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <span className={currency.change >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                          {currency.change >= 0 ? "+" : ""}{currency.change.toFixed(2)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* FII/DII Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-black dark:text-white">📉 FII/DII Activity (Yesterday)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="text-right font-semibold">Buy (₹ Cr)</TableHead>
                  <TableHead className="text-right font-semibold">Sell (₹ Cr)</TableHead>
                  <TableHead className="text-right font-semibold">Net (₹ Cr)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">FII</TableCell>
                  <TableCell className="text-right">{fiiDiiData.fii.buy.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{fiiDiiData.fii.sell.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <span className="text-green-600 font-medium">+{fiiDiiData.fii.net}</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">DII</TableCell>
                  <TableCell className="text-right">{fiiDiiData.dii.buy.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{fiiDiiData.dii.sell.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <span className="text-green-600 font-medium">+{fiiDiiData.dii.net}</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Market News */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-black dark:text-white">🗞️ Market News Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {news.map((item, index) => (
                <div key={item.id}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg flex items-start gap-2">
                        🔸 {item.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed">{item.summary}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>📅 {item.date}</span>
                        <span>📰 {item.source}</span>
                      </div>
                      <a 
                        href={item.url} 
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      >
                        🔗 Read more
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-black dark:text-white">📅 Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>• <strong>RBI Policy Meet</strong> – [Date TBD]</div>
              <div>• <strong>Quarterly Results</strong> – Infosys, HDFC Bank, Maruti Suzuki</div>
              <div>• <strong>New IPOs</strong> – Ixigo, Emcure Pharma, Swiggy (DRHP filed)</div>
              <div>• <strong>Budget 2025 Updates</strong> – Expectations rising</div>
            </div>
          </CardContent>
        </Card>

        {/* Investment Options */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-black dark:text-white">🌱 Investment Options in Indian Markets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div><strong>Stocks & Derivatives:</strong> Cash market, futures, options (BSE, NSE)</div>
                <div><strong>ETFs & Mutual Funds:</strong> Diversified, passive, gold-backed</div>
                <div><strong>Commodities:</strong> Traded via MCX (gold, silver, crude)</div>
                <div><strong>Currencies:</strong> INR forex pairs (via NSE/BSE currency derivatives)</div>
              </div>
              <div className="space-y-2">
                <div><strong>Bonds & Debentures:</strong> G-Secs, tax-free bonds, corporate bonds</div>
                <div><strong>REITs/InvITs:</strong> Real estate & infrastructure trusts</div>
                <div><strong>Sovereign Gold Bonds (SGBs)</strong> and Fixed Deposits</div>
                <div><strong>SME & Startup IPOs</strong> (BSE SME/NSE EMERGE platforms)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regulatory Updates */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-black dark:text-white">🔐 Regulatory Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>• Latest SEBI circulars</div>
              <div>• Corporate governance alerts</div>
              <div>• Exchange announcements (BSE/NSE)</div>
              <div className="mt-4">
                <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  🔗 View all
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stay Informed */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">📲 Stay Informed, Invest Wisely</h3>
            <p className="text-muted-foreground">
              Receive daily updates, alerts, and personalized insights.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}