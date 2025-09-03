import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Bar,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  BarChart3,
  Calendar,
  DollarSign,
  Target,
  AlertTriangle,
  Info,
  Clock,
  RefreshCw
} from 'lucide-react';

interface HistoricalDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
  exchange: string;
  name?: string;
  type?: string;
}

export default function HistoricalDataModal({ 
  isOpen, 
  onClose, 
  symbol, 
  exchange, 
  name, 
  type 
}: HistoricalDataModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('30y');
  const [activeChart, setActiveChart] = useState<'price' | 'returns' | 'volume' | 'yearly'>('price');

  const { data: historicalData, isLoading, error, refetch } = useQuery({
    queryKey: ['historicalData', symbol, exchange, selectedPeriod],
    queryFn: async () => {
      const response = await fetch(
        `/api/market/historical/${symbol}?exchange=${exchange}&period=${selectedPeriod}`
      );
      if (!response.ok) throw new Error('Failed to fetch historical data');
      return response.json();
    },
    enabled: isOpen,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN');
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

  const renderMetricsCards = () => {
    if (!historicalData?.data?.analytics) return null;

    const { analytics } = historicalData.data;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">XRR (Extended Return Rate)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <span className={getChangeColor(analytics.returns_analysis?.xrr_percent || 0)}>
                {formatNumber(analytics.returns_analysis?.xrr_percent || 0)}%
              </span>
              {getChangeIcon(analytics.returns_analysis?.xrr_percent || 0)}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Annualized compound return over {analytics.analysis_period?.years || 0} years
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Annual Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <span className={getChangeColor(analytics.returns_analysis?.avg_annual_return_percent || 0)}>
                {formatNumber(analytics.returns_analysis?.avg_annual_return_percent || 0)}%
              </span>
              {getChangeIcon(analytics.returns_analysis?.avg_annual_return_percent || 0)}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Mean annual performance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Volatility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(analytics.risk_metrics?.volatility_annual_percent || 0)}%
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Annual price volatility
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(analytics.risk_metrics?.sharpe_ratio || 0)}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Risk-adjusted return measure
            </p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderPriceChart = () => {
    if (!historicalData?.data?.chart_data) return null;

    const chartData = historicalData.data.chart_data.map((item: any) => ({
      ...item,
      date: new Date(item.date).getTime()
    }));

    return (
      <ResponsiveContainer width="100%" height={400}>
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
      <ResponsiveContainer width="100%" height={400}>
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
      <ResponsiveContainer width="100%" height={400}>
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
      <ResponsiveContainer width="100%" height={400}>
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
            fill={(entry: any) => entry.return_percent > 0 ? '#16a34a' : '#dc2626'}
            name="Annual Return"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderDetailedAnalytics = () => {
    if (!historicalData?.data?.analytics) return null;

    const { analytics } = historicalData.data;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Price Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Current Price:</span>
                <span className="font-semibold">{formatCurrency(analytics.price_metrics?.current_price || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Start Price:</span>
                <span className="font-semibold">{formatCurrency(analytics.price_metrics?.start_price || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Return:</span>
                <span className={`font-semibold ${getChangeColor(analytics.price_metrics?.total_return_percent || 0)}`}>
                  {formatNumber(analytics.price_metrics?.total_return_percent || 0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">52W High:</span>
                <span className="font-semibold">{formatCurrency(analytics.price_metrics?.price_52w_high || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">52W Low:</span>
                <span className="font-semibold">{formatCurrency(analytics.price_metrics?.price_52w_low || 0)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Risk Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Max Drawdown:</span>
                <span className="font-semibold text-red-600">
                  {formatNumber(analytics.risk_metrics?.max_drawdown_percent || 0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Volatility:</span>
                <span className="font-semibold">{formatNumber(analytics.risk_metrics?.volatility_daily_percent || 0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Risk-Adjusted Return:</span>
                <span className="font-semibold">{formatNumber(analytics.returns_analysis?.risk_adjusted_return || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Beta:</span>
                <span className="font-semibold">{formatNumber(analytics.risk_metrics?.beta || 0)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Technical Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">MA 20</p>
                <p className="text-lg font-semibold">{formatCurrency(analytics.technical_indicators?.ma_20 || 0)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">MA 50</p>
                <p className="text-lg font-semibold">{formatCurrency(analytics.technical_indicators?.ma_50 || 0)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">MA 200</p>
                <p className="text-lg font-semibold">{formatCurrency(analytics.technical_indicators?.ma_200 || 0)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">RSI</p>
                <p className="text-lg font-semibold">{formatNumber(analytics.technical_indicators?.rsi || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (error) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Error Loading Historical Data</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600">Failed to load historical data for {symbol}</p>
            <Button onClick={() => refetch()} className="mt-4">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Historical Data Analysis - {name || symbol}
          </DialogTitle>
          <DialogDescription>
            {type && <Badge variant="outline" className="mr-2">{type}</Badge>}
            {exchange} • {symbol} • {selectedPeriod.toUpperCase()} Analysis
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="text-center py-8">
            <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-4" />
            <p>Loading comprehensive historical data...</p>
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

            {/* Key Metrics */}
            {renderMetricsCards()}

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

            {/* Detailed Analytics */}
            {renderDetailedAnalytics()}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}