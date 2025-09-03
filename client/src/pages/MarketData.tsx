import { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
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
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { 
  Clock, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Globe,
  Zap,
  Building2,
  Banknote,
  BarChart3,
  Target,
} from 'lucide-react';

export default function MarketData() {
  const [selectedMarket, setSelectedMarket] = useState<'USA'>('USA');
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [, setLocation] = useLocation();
  
  // Check if US market is currently open (9:30 AM - 4:00 PM EST)
  const isMarketOpen = () => {
    const now = new Date();
    const estTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
    const hours = estTime.getHours();
    const minutes = estTime.getMinutes();
    const currentTime = hours * 60 + minutes;
    const openTime = 9 * 60 + 30;  // 9:30 AM EST
    const closeTime = 16 * 60;      // 4:00 PM EST
    return currentTime >= openTime && currentTime <= closeTime;
  };

  const marketOpen = isMarketOpen();
  
  // Comprehensive market data queries
  const { data: indicesData, isLoading: indicesLoading } = useQuery({
    queryKey: ['marketIndices', selectedMarket, refreshKey],
    queryFn: async () => {
      const response = await fetch(`/api/market/indices/${selectedMarket}`);
      if (!response.ok) throw new Error('Failed to fetch indices');
      return response.json();
    },
    refetchInterval: 30000,
    staleTime: 10000,
  });

  const { data: etfData, isLoading: etfLoading } = useQuery({
    queryKey: ['marketETFs', selectedMarket, refreshKey],
    queryFn: async () => {
      const response = await fetch(`/api/market/etfs/${selectedMarket}`);
      if (!response.ok) throw new Error('Failed to fetch ETFs');
      return response.json();
    },
    refetchInterval: 30000,
    staleTime: 10000,
  });

  const { data: commodityData, isLoading: commodityLoading } = useQuery({
    queryKey: ['marketCommodities', refreshKey],
    queryFn: async () => {
      const response = await fetch('/api/market/commodities');
      if (!response.ok) throw new Error('Failed to fetch commodities');
      return response.json();
    },
    refetchInterval: 30000,
    staleTime: 10000,
  });

  const { data: cryptoData, isLoading: cryptoLoading } = useQuery({
    queryKey: ['marketCrypto', refreshKey],
    queryFn: async () => {
      const response = await fetch('/api/market/crypto');
      if (!response.ok) throw new Error('Failed to fetch crypto');
      return response.json();
    },
    refetchInterval: 30000,
    staleTime: 10000,
  });

  const { data: currencyData, isLoading: currencyLoading } = useQuery({
    queryKey: ['marketCurrencies', refreshKey],
    queryFn: async () => {
      const response = await fetch('/api/market/currencies');
      if (!response.ok) throw new Error('Failed to fetch currencies');
      return response.json();
    },
    refetchInterval: 30000,
    staleTime: 10000,
  });

  const { data: globalIndicesData, isLoading: globalIndicesLoading } = useQuery({
    queryKey: ['globalIndices', refreshKey],
    queryFn: async () => {
      const response = await fetch('/api/market/global-indices');
      if (!response.ok) throw new Error('Failed to fetch global indices');
      return response.json();
    },
    refetchInterval: 30000,
    staleTime: 10000,
  });

  const { data: gainersData, isLoading: gainersLoading } = useQuery({
    queryKey: ['marketGainers', selectedMarket, refreshKey],
    queryFn: async () => {
      const response = await fetch(`/api/market/movers/${selectedMarket}/gainers`);
      if (!response.ok) throw new Error('Failed to fetch gainers');
      return response.json();
    },
    refetchInterval: 30000,
    staleTime: 10000,
  });

  const { data: losersData, isLoading: losersLoading } = useQuery({
    queryKey: ['marketLosers', selectedMarket, refreshKey],
    queryFn: async () => {
      const response = await fetch(`/api/market/movers/${selectedMarket}/losers`);
      if (!response.ok) throw new Error('Failed to fetch losers');
      return response.json();
    },
    refetchInterval: 30000,
    staleTime: 10000,
  });

  const { data: sectorsData, isLoading: sectorsLoading } = useQuery({
    queryKey: ['marketSectors', selectedMarket, refreshKey],
    queryFn: async () => {
      const response = await fetch(`/api/market/sectors/${selectedMarket}`);
      if (!response.ok) throw new Error('Failed to fetch sectors');
      return response.json();
    },
    refetchInterval: 30000,
    staleTime: 10000,
  });

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setLastUpdated(new Date());
  };

  // Combined loading state
  const isLoading = indicesLoading || etfLoading || commodityLoading || cryptoLoading || currencyLoading || globalIndicesLoading || gainersLoading || losersLoading || sectorsLoading;

  // Update last updated time when any query succeeds
  useEffect(() => {
    if (!isLoading) {
      setLastUpdated(new Date());
    }
  }, [isLoading]);

  // Force re-render every second to update "X seconds ago" display without changing the actual timestamp
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m ago`;
    } else {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit'
      });
    }
  };

  const handleItemClick = (symbol: string, exchange: string, name: string, type: string) => {
    const params = new URLSearchParams({
      symbol,
      exchange,
      name,
      type
    });
    setLocation(`/historical-chart?${params.toString()}`);
  };





  const formatCurrency = (value: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2
    }).format(value);
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 inline ml-1" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 inline ml-1" />;
    return null;
  };

  const renderDataTable = (data: any[], type: 'stocks' | 'etfs' | 'commodities' | 'crypto' | 'currencies' | 'indices') => {
    if (!data || data.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No live data available</p>
        </div>
      );
    }

    return (
      <>
        <SEO 
          title="Real-Time Market Data - Stock Prices, Indices & Market Analytics"
          description="Get real-time stock market data, live stock prices, market indices, and comprehensive market analytics. Track S&P 500, NASDAQ, Dow Jones, and individual stock performance with advanced charting."
          keywords="market data, real time stock prices, stock market data, market indices, stock charts, market analytics, stock tracker, live market data, financial data"
          canonical="https://dollarmento.com/market-data"
        />
        {/* Mobile Card Layout */}
        <div className="grid grid-cols-1 gap-3 md:hidden">
          {data.map((item, index) => (
            <div 
              key={index}
              className="border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer hover:bg-gray-50 bg-white"
              onClick={() => handleItemClick(item.symbol, item.exchange, item.name || item.companyName || item.symbol, type)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">
                    {item.name || item.companyName || item.symbol}
                  </div>
                  {item.symbol && item.symbol !== item.name && (
                    <div className="text-xs text-gray-500 truncate">{item.symbol}</div>
                  )}
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <div className="font-bold text-sm">
                    {type === 'currencies' ? formatNumber(item.lastPrice) : formatCurrency(item.lastPrice, 'USD')}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className={`flex items-center ${getChangeColor(item.change)}`}>
                  <span className="mr-1">{formatNumber(item.change)}</span>
                  <span>({formatNumber(item.changePercent)}%)</span>
                  <span className="ml-1">{getChangeIcon(item.change)}</span>
                </div>
                {type === 'stocks' && item.volume && (
                  <div className="text-gray-500">
                    Vol: {(item.volume / 1000000).toFixed(1)}M
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Change %</TableHead>
                {type === 'stocks' && <TableHead>Volume</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow 
                  key={index}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleItemClick(item.symbol, item.exchange, item.name || item.companyName || item.symbol, type)}
                >
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold">
                        {item.name || item.companyName || item.symbol}
                      </div>
                      {item.symbol && item.symbol !== item.name && (
                        <div className="text-sm text-gray-500">{item.symbol}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {type === 'currencies' ? formatNumber(item.lastPrice) : formatCurrency(item.lastPrice, 'USD')}
                  </TableCell>
                  <TableCell className={getChangeColor(item.change)}>
                    {formatNumber(item.change)}
                    {getChangeIcon(item.change)}
                  </TableCell>
                  <TableCell className={getChangeColor(item.changePercent)}>
                    {formatNumber(item.changePercent)}%
                  </TableCell>
                  {type === 'stocks' && (
                    <TableCell>{item.volume?.toLocaleString() || 'N/A'}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    );
  };

  const renderIndicesGrid = (indices: any) => {
    if (!indices || Object.keys(indices).length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No indices data available</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {Object.entries(indices).map(([key, index]: [string, any]) => (
          <div 
            key={key} 
            className="border rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow cursor-pointer hover:bg-gray-50"
            onClick={() => handleItemClick(index.symbol, index.exchange, index.name, 'Index')}
          >
            <h3 className="font-semibold text-sm md:text-lg mb-1 md:mb-2 truncate">{index.name}</h3>
            <p className="text-lg md:text-2xl font-bold mb-1">{formatNumber(index.lastPrice)}</p>
            <p className={`text-xs md:text-sm ${getChangeColor(index.change)}`}>
              {formatNumber(index.change)} ({formatNumber(index.changePercent)}%)
              {getChangeIcon(index.change)}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderSectorsGrid = (sectors: any) => {
    if (!sectors || Object.keys(sectors).length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <Building2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No sector data available</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {Object.entries(sectors).map(([key, sector]: [string, any]) => (
          <div key={key} className="border rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-sm md:text-base mb-1 md:mb-2 truncate">{sector.sector}</h3>
            <p className={`text-base md:text-lg font-bold mb-1 ${getChangeColor(sector.avgChangePercent)}`}>
              {formatNumber(sector.avgChangePercent)}%
              {getChangeIcon(sector.avgChangePercent)}
            </p>
            <p className="text-xs md:text-sm text-gray-600">
              {sector.stocksTracked} stocks tracked
            </p>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-4" />
          <p>Loading comprehensive market data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Live Market Data - Comprehensive Financial Markets - DollarMento</title>
        <meta name="description" content="Real-time market data including US stocks, ETFs, commodities, cryptocurrencies, currencies, and global indices" />
        <meta name="keywords" content="live market data, US stocks, ETFs, commodities, cryptocurrency, currency pairs, global indices, NYSE, NASDAQ, real-time prices" />
        <link rel="canonical" href="https://dollarmento.com/market-data" />
      </Helmet>

      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Live Market Data</h1>
          <p className="text-sm md:text-base text-gray-600">Comprehensive real-time financial market data</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm text-gray-600">
              {marketOpen ? "Market is open" : "Market is closed"}
            </span>
          </div>
          <Badge variant="default" className="text-xs">
            USA
          </Badge>
          <div className="flex items-center gap-1">
            <Activity className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
            <span className="text-xs text-gray-500">
              Updated {formatLastUpdated(lastUpdated)}
            </span>
          </div>
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-xs md:text-sm px-2 py-1 md:px-3 md:py-2"
          >
            <RefreshCw className="h-3 w-3 md:h-4 md:w-4" />
            Refresh Now
          </Button>
        </div>
      </div>

      <Tabs defaultValue="indices" className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex w-max min-w-full justify-start">
            <TabsTrigger value="indices" className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Indices</span>
              <span className="sm:hidden">Index</span>
            </TabsTrigger>
            <TabsTrigger value="etfs" className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
              <Target className="h-3 w-3 sm:h-4 sm:w-4" />
              ETFs
            </TabsTrigger>
            <TabsTrigger value="commodities" className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Commodities</span>
              <span className="sm:hidden">Commod</span>
            </TabsTrigger>
            <TabsTrigger value="crypto" className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
              <Activity className="h-3 w-3 sm:h-4 sm:w-4" />
              Crypto
            </TabsTrigger>
            <TabsTrigger value="currencies" className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
              <Banknote className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Currencies</span>
              <span className="sm:hidden">Forex</span>
            </TabsTrigger>
            <TabsTrigger value="global" className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
              <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
              Global
            </TabsTrigger>
            <TabsTrigger value="gainers" className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
              Gainers
            </TabsTrigger>
            <TabsTrigger value="sectors" className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
              <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
              Sectors
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="indices">
          <Card>
            <CardHeader>
              <CardTitle>Market Indices - {selectedMarket}</CardTitle>
              <CardDescription>Live data from major stock market indices</CardDescription>
            </CardHeader>
            <CardContent>
              {renderIndicesGrid(indicesData?.data?.indices)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="etfs">
          <Card>
            <CardHeader>
              <CardTitle>Exchange Traded Funds (ETFs) - {selectedMarket}</CardTitle>
              <CardDescription>Real-time ETF prices and performance</CardDescription>
            </CardHeader>
            <CardContent>
              {renderDataTable(etfData?.data?.etfs ? Object.values(etfData.data.etfs) : [], 'etfs')}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commodities">
          <Card>
            <CardHeader>
              <CardTitle>Commodities</CardTitle>
              <CardDescription>Live commodity futures prices</CardDescription>
            </CardHeader>
            <CardContent>
              {renderDataTable(commodityData?.data?.commodities ? Object.values(commodityData.data.commodities) : [], 'commodities')}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crypto">
          <Card>
            <CardHeader>
              <CardTitle>Cryptocurrencies</CardTitle>
              <CardDescription>Real-time cryptocurrency prices</CardDescription>
            </CardHeader>
            <CardContent>
              {renderDataTable(cryptoData?.data?.cryptocurrencies ? Object.values(cryptoData.data.cryptocurrencies) : [], 'crypto')}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="currencies">
          <Card>
            <CardHeader>
              <CardTitle>Currency Pairs</CardTitle>
              <CardDescription>Live foreign exchange rates</CardDescription>
            </CardHeader>
            <CardContent>
              {renderDataTable(currencyData?.data?.currencies ? Object.values(currencyData.data.currencies) : [], 'currencies')}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="global">
          <Card>
            <CardHeader>
              <CardTitle>Global Market Indices</CardTitle>
              <CardDescription>Major international stock market indices</CardDescription>
            </CardHeader>
            <CardContent>
              {renderIndicesGrid(globalIndicesData?.data?.global_indices)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gainers">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Top Gainers - {selectedMarket}</CardTitle>
                <CardDescription>Stocks with highest gains today</CardDescription>
              </CardHeader>
              <CardContent>
                {renderDataTable(gainersData?.data?.stocks || [], 'stocks')}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Top Losers - {selectedMarket}</CardTitle>
                <CardDescription>Stocks with highest losses today</CardDescription>
              </CardHeader>
              <CardContent>
                {renderDataTable(losersData?.data?.stocks || [], 'stocks')}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sectors">
          <Card>
            <CardHeader>
              <CardTitle>Sector Performance - {selectedMarket}</CardTitle>
              <CardDescription>Performance across different market sectors</CardDescription>
            </CardHeader>
            <CardContent>
              {renderSectorsGrid(sectorsData?.data?.sectors)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>


    </div>
  );
}