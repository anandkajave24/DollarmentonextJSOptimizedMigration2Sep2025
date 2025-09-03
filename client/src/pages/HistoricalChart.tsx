import { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart,
  Bar
} from 'recharts';
import { 
  ArrowLeft,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

export default function HistoricalChart() {
  const [location, setLocation] = useLocation();
  const [selectedPeriod, setSelectedPeriod] = useState('30y');
  const [activeChart, setActiveChart] = useState<'price' | 'returns' | 'volume' | 'yearly'>('price');

  // Extract parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const symbol = urlParams.get('symbol') || '';
  const exchange = urlParams.get('exchange') || 'NSE';
  const name = urlParams.get('name') || symbol;
  const type = urlParams.get('type') || 'Stock';

  const { data: historicalData, isLoading, error, refetch } = useQuery({
    queryKey: ['historicalData', symbol, exchange, selectedPeriod],
    queryFn: async () => {
      const response = await fetch(
        `/api/market/historical/${symbol}?exchange=${exchange}&period=${selectedPeriod}`
      );
      if (!response.ok) throw new Error('Failed to fetch historical data');
      return response.json();
    },
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime in v5)
  });

  const periods = [
    { value: '30y', label: '30 Years' },
    { value: '20y', label: '20 Years' },
    { value: '10y', label: '10 Years' },
    { value: '5y', label: '5 Years' },
    { value: '3y', label: '3 Years' },
    { value: '1y', label: '1 Year' },
    { value: '6mo', label: '6 Months' },
    { value: '3mo', label: '3 Months' },
    { value: '1mo', label: '1 Month' }
  ];

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold">{`Date: ${formatDate(label)}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className={`text-${entry.color}`}>
              {`${entry.dataKey}: ${entry.dataKey === 'volume' ? formatNumber(entry.value) : formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderPriceChart = () => {
    if (!historicalData?.data?.chart_data) return null;

    const chartData = historicalData.data.chart_data.map((item: any) => ({
      ...item,
      date: new Date(item.date).getTime()
    }));

    return (
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            type="number"
            scale="time"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN')}
          />
          <YAxis tickFormatter={(value) => `$${formatNumber(value)}`} />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="close" 
            stroke="#2563eb" 
            strokeWidth={2}
            dot={false}
            name="Close Price"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderReturnsChart = () => {
    if (!historicalData?.data?.chart_data) return null;

    const chartData = historicalData.data.chart_data.map((item: any) => ({
      ...item,
      date: new Date(item.date).getTime()
    }));

    return (
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            type="number"
            scale="time"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN')}
          />
          <YAxis tickFormatter={(value) => `${formatNumber(value)}%`} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="returns"
            stroke="#16a34a"
            fill="#16a34a"
            fillOpacity={0.3}
            name="Daily Returns"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  const renderVolumeChart = () => {
    if (!historicalData?.data?.chart_data) return null;

    const chartData = historicalData.data.chart_data.map((item: any) => ({
      ...item,
      date: new Date(item.date).getTime()
    }));

    return (
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            type="number"
            scale="time"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN')}
          />
          <YAxis tickFormatter={(value) => formatNumber(value)} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="volume" fill="#f59e0b" name="Volume" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderYearlyChart = () => {
    if (!historicalData?.data?.analytics?.yearly_performance) return null;

    const yearlyData = historicalData.data.analytics.yearly_performance;

    return (
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={yearlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={(value) => `${formatNumber(value)}%`} />
          <Tooltip 
            formatter={(value: number) => [`${formatNumber(value)}%`, 'Annual Return']}
            labelFormatter={(label) => `Year: ${label}`}
          />
          <Bar 
            dataKey="return_percent" 
            fill="#16a34a"
            name="Annual Return"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  if (!symbol) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">No symbol specified</p>
          <Button onClick={() => setLocation('/market-data')} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Market Data
          </Button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Failed to load historical data for {symbol}</p>
          <div className="flex gap-2 justify-center mt-4">
            <Button onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
            <Button variant="outline" onClick={() => setLocation('/market-data')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Market Data
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Historical Chart Analysis - Stock Price History & Market Performance Data"
        description="Advanced historical chart analysis with interactive price charts, volume data, and performance metrics. Track stock price history, returns, and market trends with comprehensive technical analysis."
        keywords="historical chart, stock price history, market data analysis, stock charts, price performance, market trends, technical analysis, stock market history, investment charts"
        canonical="https://dollarmento.com/historical-chart"
      />
      <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Historical Chart - {name} ({symbol}) - DollarMento</title>
        <meta name="description" content={`Historical price chart and analytics for ${name} (${symbol})`} />
      </Helmet>

      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => setLocation('/market-data')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Market Data
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-600">{exchange} • {symbol} • {type}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-4" />
          <p>Loading historical data...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Period Selection */}
          <div className="flex flex-wrap gap-2">
            {periods.map((period) => (
              <Button
                key={period.value}
                variant={selectedPeriod === period.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period.value)}
              >
                {period.label}
              </Button>
            ))}
          </div>

          {/* Charts */}
          <Tabs value={activeChart} onValueChange={(value) => setActiveChart(value as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="price">Price Chart</TabsTrigger>
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="volume">Volume</TabsTrigger>
              <TabsTrigger value="yearly">Yearly Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="price" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Price Movement Over Time</CardTitle>
                  <CardDescription>
                    Historical price data showing closing prices over {selectedPeriod}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderPriceChart()}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="returns" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Returns Distribution</CardTitle>
                  <CardDescription>
                    Daily percentage returns showing volatility patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderReturnsChart()}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="volume" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trading Volume</CardTitle>
                  <CardDescription>
                    Daily trading volume indicating market activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderVolumeChart()}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="yearly" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Year-wise Performance</CardTitle>
                  <CardDescription>
                    Annual returns breakdown showing year-over-year performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderYearlyChart()}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
    </>
  );
}