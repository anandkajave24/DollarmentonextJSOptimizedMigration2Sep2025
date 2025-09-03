import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  AlertTriangle, 
  Target, 
  BarChart3, 
  Users, 
  Activity,
  Eye,
  Shield,
  Calculator,
  BookOpen,
  CheckCircle
} from 'lucide-react';

const MarketBehaviour = () => {
  // Fetch real-time sentiment data
  const { data: sentimentData, isLoading: sentimentLoading, error: sentimentError } = useQuery({
    queryKey: ['/api/market-sentiment/current'],
    refetchInterval: 300000, // Refresh every 5 minutes
    staleTime: 240000, // Data is fresh for 4 minutes
  });

  // Use real-time data if available, fallback to educational data
  const currentSentiment = (sentimentData as any)?.data ? {
    status: (sentimentData as any).data.currentSentiment,
    fearGreedIndex: (sentimentData as any).data.fearGreedIndex,
    vixIndex: (sentimentData as any).data.vixIndex,
    spReturn: (sentimentData as any).data.spyReturn,
    interpretation: (sentimentData as any).data.interpretation,
    timestamp: (sentimentData as any).data.timestamp,
    isRealTime: (sentimentData as any).success
  } : {
    status: 'GREED',
    fearGreedIndex: 62,
    vixIndex: 18.5,
    spReturn: '+18% YTD',
    interpretation: 'U.S. market analysis - Markets showing signs of speculative optimism',
    timestamp: new Date().toISOString(),
    isRealTime: false
  };

  // Market psychology indicators data (updated with real-time values)
  const marketIndicators = [
    {
      indicator: 'Fear & Greed Index',
      currentReading: `${currentSentiment.fearGreedIndex}/100`,
      whyItMatters: currentSentiment.fearGreedIndex > 55 ? 'Over 55 = growing overconfidence' : currentSentiment.fearGreedIndex < 45 ? 'Under 45 = fear-driven selling' : 'Neutral sentiment range',
      marketImplication: currentSentiment.fearGreedIndex > 55 ? 'Risk of short-term correction' : currentSentiment.fearGreedIndex < 45 ? 'Potential buying opportunity' : 'Balanced market conditions',
      badgeColor: currentSentiment.fearGreedIndex > 55 ? 'bg-orange-100 text-orange-800' : currentSentiment.fearGreedIndex < 45 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
    },
    {
      indicator: 'CBOE VIX Index',
      currentReading: currentSentiment.vixIndex.toString(),
      whyItMatters: currentSentiment.vixIndex < 20 ? 'Under 20 = complacent sentiment' : currentSentiment.vixIndex < 30 ? 'Elevated uncertainty' : 'High fear/panic levels',
      marketImplication: currentSentiment.vixIndex < 20 ? 'Markets may be underpricing risk' : currentSentiment.vixIndex < 30 ? 'Increased market volatility expected' : 'Extreme volatility - potential opportunities',
      badgeColor: currentSentiment.vixIndex < 20 ? 'bg-green-100 text-green-800' : currentSentiment.vixIndex < 30 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
    },
    {
      indicator: 'High Retail Participation',
      currentReading: 'Record highs',
      whyItMatters: 'Meme stocks, IPOs, and social investing trends',
      marketImplication: 'Emotional buying overtaking fundamentals',
      badgeColor: 'bg-red-100 text-red-800'
    },
    {
      indicator: 'IPO Surge',
      currentReading: 'Oversubscribed',
      whyItMatters: 'Liquidity chasing speculation',
      marketImplication: 'Risk of poor long-term returns',
      badgeColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      indicator: 'S&P 500 Performance',
      currentReading: currentSentiment.spReturn,
      whyItMatters: 'Strong returns trigger FOMO and late entries',
      marketImplication: 'Entry risk at elevated valuations',
      badgeColor: 'bg-blue-100 text-blue-800'
    }
  ];

  // Market cycles data
  const marketCycles = [
    {
      phase: 'COVID Crash',
      dateRange: 'Feb–Mar 2020',
      description: 'Global pandemic panic',
      spMovement: '-34%',
      sentiment: 'Extreme Fear',
      vixReading: '82.7'
    },
    {
      phase: 'Stimulus Rebound',
      dateRange: 'Apr 2020 – Dec 2021',
      description: 'Fiscal + monetary tailwinds',
      spMovement: '+104%',
      sentiment: 'Greed/Extreme',
      vixReading: '15–25'
    },
    {
      phase: 'Inflation Fears',
      dateRange: 'Jan–Jun 2022',
      description: 'Fed hikes & Ukraine war',
      spMovement: '-21%',
      sentiment: 'Fear',
      vixReading: '34.3'
    },
    {
      phase: 'AI-Led Bull Run',
      dateRange: 'Jan 2023 – Now',
      description: 'NVIDIA, tech leadership',
      spMovement: '+28% (so far)',
      sentiment: 'Greed',
      vixReading: '~16–18'
    }
  ];

  // Behavioral biases
  const behavioralBiases = [
    {
      name: 'Herd Mentality',
      quote: '"Everyone is buying — it must be right."',
      triggers: 'Meme stock surges, IPO manias',
      mistake: 'Buying tops, selling in crashes',
      counter: 'Independent thesis > crowd opinion'
    },
    {
      name: 'Recency Bias',
      quote: '"Tech went up last year, it\'ll keep going."',
      triggers: 'Short-term wins',
      mistake: 'Overexposure to recent winners',
      counter: 'Long-term asset allocation discipline'
    },
    {
      name: 'Anchoring Bias',
      quote: '"I bought Apple at $180 — I won\'t sell until I break even."',
      triggers: 'Obsession with past prices',
      mistake: 'Holding losers too long',
      counter: 'Base decisions on fundamentals, not memory'
    },
    {
      name: 'Confirmation Bias',
      quote: '"Only watching analysts who agree with me."',
      triggers: 'Social echo chambers',
      mistake: 'Ignoring red flags',
      counter: 'Actively read contrarian views'
    }
  ];

  // Warning signs of market greed
  const warningGigns = [
    'S&P 500 and Nasdaq at multi-month highs with high P/E ratios',
    'Financial media pushing "miss out and regret it" narratives',
    'Retail investors using margin at record levels',
    'Social buzz (Reddit, X, TikTok) dominated by quick gains',
    'Popularity of risky plays: SPACs, meme stocks, crypto pumps'
  ];

  // Fear & Greed Scale
  const fearGreedScale = [
    { range: '0–24', label: 'Extreme Fear', description: 'Panic = Opportunity', color: 'bg-red-600 text-white' },
    { range: '25–44', label: 'Fear', description: 'Market oversold', color: 'bg-orange-500 text-white' },
    { range: '45–55', label: 'Neutral', description: '', color: 'bg-gray-500 text-white' },
    { range: '56–75', label: 'Greed', description: 'Overconfidence building', color: 'bg-yellow-500 text-black' },
    { range: '76–100', label: 'Extreme Greed', description: 'Euphoric bubble risk', color: 'bg-red-600 text-white' }
  ];

  // VIX Guide
  const vixGuide = [
    { range: '<15', environment: 'Complacency / Calm' },
    { range: '16–20', environment: 'Normal volatility' },
    { range: '21–30', environment: 'Increased uncertainty / Risk-on' },
    { range: '30+', environment: 'Extreme fear / Panic opportunities' }
  ];

  // Strategy toolkit
  const strategyTools = [
    { tool: 'Risk Tolerance Quiz', useCase: 'Align allocation with your psychology' },
    { tool: 'Rebalancing Calculator', useCase: 'Sell high, buy undervalued' },
    { tool: 'Tax-Loss Harvesting Tool', useCase: 'Use red days to reduce tax liability' },
    { tool: 'Sector Rotation Tracker', useCase: 'Identify overbought vs underweighted' },
    { tool: 'Volatility Alerts', useCase: 'Prepare for sharp market swings' }
  ];

  // Investor commandments
  const investorCommandments = [
    "Don't chase performance — chase discipline.",
    "Avoid \"easy money\" headlines.",
    "Tune out the noise, turn up the plan.",
    "Review your thesis, not just your portfolio.",
    "Know thyself — you are your biggest risk."
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Market Events, Cycles & Investor Psychology (USA Edition) - DollarMento</title>
        <meta name="description" content="Understand what drives the US market - market psychology, behavioral biases, sentiment analysis, and how emotions drive market cycles for American investors" />
        <meta name="keywords" content="US market psychology, investor behavior, market sentiment, behavioral finance, market cycles, Fear Greed Index, VIX, American investors" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-left mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            📈 Market Events, Cycles & Investor Psychology
          </h1>
          <div className="max-w-4xl">
            <p className="text-lg text-gray-600 mb-2">
              Understand What Drives the Market — It's Not Just Data, It's Behavior
            </p>
            <p className="text-base text-gray-500">
              Markets are moved not only by earnings reports, rate hikes, and economic indicators — but also by fear, greed, and crowd behavior.
            </p>
          </div>
        </div>

        {/* Real-Time Market Sentiment Dashboard */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              Real-Time Market Sentiment Dashboard
              {sentimentLoading && (
                <div className="text-sm text-gray-500 ml-2">Loading...</div>
              )}
              <div className="text-xs text-gray-400 ml-auto">
                {currentSentiment.isRealTime ? (
                  <span className="text-green-600">🟢 Live Data</span>
                ) : (
                  <span className="text-red-600">🔴 Live Data Off</span>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-orange-50 rounded-lg border">
                <div className="text-xs text-gray-600 mb-1">Current Sentiment:</div>
                <div className="text-3xl font-bold text-orange-600 mb-1">{currentSentiment.status}</div>
                <p className="text-xs text-gray-600 italic">
                  "When everyone feels confident, it's time to be cautious."
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border">
                <div className="text-center mb-2">
                  <div className="text-xs text-gray-600 mb-1">Fear & Greed Index (CNN Business)</div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">{currentSentiment.fearGreedIndex}/100</div>
                  <Progress value={currentSentiment.fearGreedIndex} className="w-full h-2" />
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border">
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">CBOE VIX (Volatility Index)</div>
                  <div className="text-3xl font-bold text-green-600 mb-1">{currentSentiment.vixIndex}</div>
                  <div className="text-xs text-gray-600">↳ Low volatility = Complacency risk</div>
                </div>
              </div>
            </div>

            <Alert className="bg-yellow-50 border-yellow-200 py-2">
              <AlertTriangle className="h-3 w-3 text-yellow-600" />
              <AlertDescription className="text-yellow-800 text-sm">
                <strong>Investor Takeaway:</strong> {currentSentiment.interpretation}
                {currentSentiment.timestamp && (
                  <div className="text-xs text-gray-500 mt-1">
                    Last updated: {new Date(currentSentiment.timestamp).toLocaleString()}
                  </div>
                )}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Why Market Sentiment Shows "Greed" */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Why Market Sentiment Says "Greed"</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-2 font-semibold text-sm">Indicator</th>
                    <th className="text-left p-2 font-semibold text-sm">Current Reading</th>
                    <th className="text-left p-2 font-semibold text-sm">Why It Matters</th>
                    <th className="text-left p-2 font-semibold text-sm">Market Implication</th>
                  </tr>
                </thead>
                <tbody>
                  {marketIndicators.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="p-2 font-medium text-sm">{item.indicator}</td>
                      <td className="p-2">
                        <Badge className={`${item.badgeColor} text-xs`}>
                          {item.currentReading}
                        </Badge>
                      </td>
                      <td className="p-2 text-gray-600 text-sm">{item.whyItMatters}</td>
                      <td className="p-2 text-gray-600 text-sm">{item.marketImplication}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4" />
                Warning Signs of Market Greed
              </h4>
              <ul className="space-y-1">
                {warningGigns.map((sign, index) => (
                  <li key={index} className="text-xs text-red-700 flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    {sign}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* U.S. Market Cycles & Key Historical Events */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">
              U.S. Market Cycles & Key Historical Events
            </CardTitle>
            <div className="text-xs text-gray-600 mt-1">
              Market memory is short. History doesn't repeat — it rhymes.
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-4 font-semibold">Phase</th>
                    <th className="text-left p-4 font-semibold">Date Range</th>
                    <th className="text-left p-4 font-semibold">Description</th>
                    <th className="text-left p-4 font-semibold">S&P 500 Movement</th>
                    <th className="text-left p-4 font-semibold">Sentiment</th>
                    <th className="text-left p-4 font-semibold">VIX Reading</th>
                  </tr>
                </thead>
                <tbody>
                  {marketCycles.map((cycle, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="p-4 font-medium">{cycle.phase}</td>
                      <td className="p-4">{cycle.dateRange}</td>
                      <td className="p-4 text-gray-600">{cycle.description}</td>
                      <td className="p-4">
                        <Badge variant={cycle.spMovement.startsWith('-') ? 'destructive' : 'secondary'} 
                               className={cycle.spMovement.startsWith('-') ? '' : 'bg-green-100 text-green-800'}>
                          {cycle.spMovement}
                        </Badge>
                      </td>
                      <td className="p-4">{cycle.sentiment}</td>
                      <td className="p-4">{cycle.vixReading}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Behavioral Biases that Derail American Investors */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">
              Behavioral Biases that Derail American Investors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {behavioralBiases.map((bias, index) => (
                <div key={index} className="p-6 border rounded-lg">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{index + 1}. {bias.name}</h3>
                    <p className="text-gray-600 italic mb-3">{bias.quote}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                      <span className="text-sm font-semibold text-red-600">Triggers:</span>
                      <span className="text-sm text-gray-700 ml-2">{bias.triggers}</span>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                      <span className="text-sm font-semibold text-orange-600">Mistake:</span>
                      <span className="text-sm text-gray-700 ml-2">{bias.mistake}</span>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                      <span className="text-sm font-semibold text-green-600">Counter:</span>
                      <span className="text-sm text-gray-700 ml-2">{bias.counter}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reference Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Fear & Greed Index Scale */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fear & Greed Index Scale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {fearGreedScale.map((scale, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium w-12">{scale.range}</span>
                      <Badge className={scale.color}>{scale.label}</Badge>
                    </div>
                    {scale.description && (
                      <span className="text-xs text-gray-600">{scale.description}</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* VIX Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">CBOE VIX (Volatility Index) Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {vixGuide.map((vix, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="text-sm font-medium">{vix.range}</span>
                    <span className="text-sm text-gray-600">{vix.environment}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What U.S. Investors Can Do Right Now */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">
              What U.S. Investors Can Do Right Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-6 bg-green-50 rounded-lg border">
                <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Portfolio Checkup
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Overweight tech or growth stocks?</li>
                  <li>• Diversified by sector and geography?</li>
                </ul>
              </div>

              <div className="p-6 bg-orange-50 rounded-lg border">
                <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Emotional Risk Management
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Feeling greedy? Time to trim profits.</li>
                  <li>• Feeling fearful? Time to zoom out and assess rationally.</li>
                </ul>
              </div>

              <div className="p-6 bg-blue-50 rounded-lg border">
                <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Strategy Toolkit
                </h3>
                <div className="text-sm space-y-2">
                  {strategyTools.slice(0, 3).map((tool, index) => (
                    <div key={index}>
                      <span className="font-medium text-blue-700">{tool.tool}:</span>
                      <span className="text-gray-600 ml-1">{tool.useCase}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Investor Commandments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {investorCommandments.map((commandment, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span className="text-gray-700 text-sm">{commandment}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quote */}
        <div className="text-center py-8">
          <blockquote className="text-2xl italic text-gray-600 max-w-3xl mx-auto mb-4">
            "The investor's chief problem—and even his worst enemy—is likely to be himself."
          </blockquote>
          <cite className="text-lg text-gray-500">— Benjamin Graham</cite>
        </div>
      </div>
    </div>
  );
};

export default MarketBehaviour;