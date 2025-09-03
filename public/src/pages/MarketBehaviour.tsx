import { useState } from 'react';
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
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Calendar,
  Target,
  Brain,
  Zap,
  Activity,
  Clock,
  Users,
  Shield,
  BookOpen,
  CheckCircle
} from 'lucide-react';

export default function MarketBehaviour() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Market cycles data with sentiment indicators
  const marketCycles = [
    {
      id: 'covid-crash',
      title: 'COVID-19 Nationwide Lockdown',
      period: 'Jan 2020 - Mar 2020',
      type: 'Bear Market',
      duration: '3 months',
      description: 'Markets collapsed like dominoes as uncertainty gripped the world.',
      sensexChange: -35.03,
      niftyChange: -36.89,
      fearGreedIndex: 12,
      indiaVix: 83.6,
      keyEvents: [
        'WHO declares COVID-19 a pandemic',
        'India announces a 21-day nationwide lockdown',
        'Global supply chains freeze',
        'FII outflows exceed $15 billion'
      ],
      emotion: 'Panic, Fear, Herding',
      icon: '🛑',
      color: 'red'
    },
    {
      id: 'recovery-begins',
      title: 'Recovery Begins',
      period: 'Apr 2020 - Jan 2021',
      type: 'Recovery Phase',
      duration: '10 months',
      description: 'The market\'s heartbeat slowly returned, powered by liquidity and hope.',
      sensexChange: 91.28,
      niftyChange: 91.45,
      fearGreedIndex: 45,
      indiaVix: 24.8,
      keyEvents: [
        'Gradual easing of lockdown',
        '₹20 lakh crore economic stimulus package',
        'Vaccine development accelerates',
        'Industries restart operations'
      ],
      emotion: 'Hope, Relief, Bargain Buying',
      icon: '📈',
      color: 'green'
    },
    {
      id: 'bull-run',
      title: 'Bull Run Ignites',
      period: 'Feb 2021 - Dec 2021',
      type: 'Bull Market',
      duration: '11 months',
      description: 'Retail investors became the new bulls. Markets soared to new heights.',
      sensexChange: 21.78,
      niftyChange: 24.12,
      fearGreedIndex: 78,
      indiaVix: 16.2,
      keyEvents: [
        'Massive vaccination drive',
        'Record corporate earnings',
        'IPO boom (Zomato, Nykaa, etc.)',
        'Surge in retail trading accounts'
      ],
      emotion: 'Euphoria, FOMO',
      icon: '🚀',
      color: 'blue'
    },
    {
      id: 'correction',
      title: 'Correction Phase',
      period: 'Jan 2022 - Jun 2022',
      type: 'Correction',
      duration: '6 months',
      description: 'Inflation fears, war, and interest rate jitters knocked optimism down.',
      sensexChange: -9.84,
      niftyChange: -10.25,
      fearGreedIndex: 28,
      indiaVix: 28.4,
      keyEvents: [
        'Russia-Ukraine war erupts',
        'Crude oil prices spike',
        'Inflation at multi-year highs',
        'RBI initiates rate hike cycle'
      ],
      emotion: 'Uncertainty, Defensive Moves',
      icon: '📉',
      color: 'orange'
    }
  ];

  // Historical events with sentiment indicators
  const historicalEvents = [
    {
      date: 'March 24, 2020',
      title: 'Lockdown Panic',
      sensex: -13.15,
      nifty: -12.98,
      fearGreedIndex: 8,
      indiaVix: 83.6,
      sectors: [
        { name: 'Pharma', change: 4.20 },
        { name: 'Banking', change: -17.80 },
        { name: 'IT', change: -9.60 },
        { name: 'FMCG', change: -6.30 }
      ],
      tip: 'Diversification protects — pharma thrived while others crashed.'
    },
    {
      date: 'Sept 20, 2019',
      title: 'Corporate Tax Cut Boost',
      sensex: 5.32,
      nifty: 5.28,
      fearGreedIndex: 68,
      indiaVix: 15.8,
      sectors: [
        { name: 'Banking', change: 8.40 },
        { name: 'Auto', change: 9.30 },
        { name: 'FMCG', change: 3.60 },
        { name: 'IT', change: 0.80 }
      ],
      tip: 'Were you positioned to benefit from pro-business reforms?'
    },
    {
      date: 'May 23, 2019',
      title: 'Political Stability Rally',
      sensex: 1.61,
      nifty: 1.71,
      fearGreedIndex: 58,
      indiaVix: 18.2,
      sectors: [
        { name: 'Infrastructure', change: 3.70 },
        { name: 'Banking', change: 2.50 },
        { name: 'Defence', change: 4.10 }
      ],
      tip: 'Are you factoring in political events when planning long-term investments?'
    },
    {
      date: 'Nov 8, 2016',
      title: 'Demonetization Shock',
      sensex: -6.35,
      nifty: -6.89,
      fearGreedIndex: 22,
      indiaVix: 31.5,
      sectors: [
        { name: 'Banking', change: -8.20 },
        { name: 'Real Estate', change: -12.60 },
        { name: 'FMCG', change: -5.30 },
        { name: 'Pharma', change: -1.20 }
      ],
      tip: 'Sudden policy moves can create short-term pain but may also create long-term opportunities.'
    }
  ];

  // Psychology biases
  const psychologyBiases = [
    {
      name: 'Herd Behavior',
      icon: '👥',
      description: 'Following the crowd often leads to buying at tops and selling at bottoms.',
      redFlags: [
        'Surging volumes & prices with no fundamental backing',
        'Frenzied media narratives',
        'Surge in new demat accounts'
      ],
      mistake: 'Buying into hype, selling in panic',
      strategy: 'Take a contrarian view during extremes. Stay rational, not emotional.'
    },
    {
      name: 'Anchoring Bias',
      icon: '⚓',
      description: '"I bought it at ₹100, I won\'t sell below that." Dangerous thinking.',
      redFlags: [
        'Refusing to sell losers',
        'Obsessing over past highs',
        'Chasing breakeven'
      ],
      mistake: 'Emotionally attached to a price',
      strategy: 'Reassess based on today\'s reality, not yesterday\'s hopes.'
    },
    {
      name: 'Recency Bias',
      icon: '🕰️',
      description: 'What worked recently will work again. Right?',
      redFlags: [
        'Overloading top-performing sectors',
        'Overlooking diversification',
        'Dismissing long-term performance'
      ],
      mistake: 'Investing based on last month\'s winners',
      strategy: 'Look at 5–10 year trends. Market history often rhymes.'
    },
    {
      name: 'Confirmation Bias',
      icon: '🔍',
      description: 'You see only what you want to see.',
      redFlags: [
        'Ignoring contrary reports',
        'Following only like-minded investors',
        'Holding on to failing stocks with blind faith'
      ],
      mistake: 'Refusing to adapt to changing data',
      strategy: 'Play devil\'s advocate. Challenge your own view before the market does.'
    }
  ];

  // Current sentiment data with reference values
  const currentSentiment = {
    status: 'GREED',
    fearGreedIndex: 62,
    indiaVix: 18.5,
    interpretation: 'Greed may indicate markets are overbought',
    vixLevel: 'Moderate',
    tip: 'Trim overextended positions and stick to your strategy.'
  };

  // Fear & Greed Index reference scale
  const fearGreedScale = [
    { range: '0-24', label: 'Extreme Fear', color: 'bg-red-600', description: 'Maximum pessimism, potential buying opportunity' },
    { range: '25-44', label: 'Fear', color: 'bg-red-400', description: 'High selling pressure, cautious sentiment' },
    { range: '45-55', label: 'Neutral', color: 'bg-gray-400', description: 'Balanced market sentiment' },
    { range: '56-75', label: 'Greed', color: 'bg-orange-500', description: 'Overconfidence, potential market top forming' },
    { range: '76-100', label: 'Extreme Greed', color: 'bg-red-600', description: 'Euphoria, high correction risk' }
  ];

  // VIX reference levels
  const vixLevels = [
    { range: '10-15', label: 'Low Volatility', color: 'text-green-600', meaning: 'Calm markets, complacency risk' },
    { range: '16-20', label: 'Normal Volatility', color: 'text-blue-600', meaning: 'Healthy market fluctuations' },
    { range: '21-30', label: 'High Volatility', color: 'text-orange-600', meaning: 'Increased uncertainty, caution needed' },
    { range: '30+', label: 'Extreme Volatility', color: 'text-red-600', meaning: 'Market panic, potential opportunities' }
  ];

  // Why market is greedy - current indicators
  const greedIndicators = [
    {
      indicator: 'Fear & Greed Index: 62/100',
      reason: 'Above 55 threshold indicates investor overconfidence',
      impact: 'Suggests markets may be overvalued and due for correction'
    },
    {
      indicator: 'Low VIX at 18.5',
      reason: 'Below 20 suggests complacency among investors',
      impact: 'Low volatility often precedes sudden market moves'
    },
    {
      indicator: 'Strong Recent Performance',
      reason: 'Markets have seen sustained gains creating FOMO',
      impact: 'Late entrants buying at higher valuations'
    },
    {
      indicator: 'High Trading Volumes',
      reason: 'Increased retail participation and speculation',
      impact: 'More emotional buying than fundamental analysis'
    },
    {
      indicator: 'IPO Boom Activity',
      reason: 'High IPO launches and oversubscriptions',
      impact: 'Indicates excess liquidity chasing returns'
    }
  ];

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getCycleColor = (color: string) => {
    const colors = {
      red: 'border-red-200 bg-red-50',
      green: 'border-green-200 bg-green-50',
      blue: 'border-blue-200 bg-blue-50',
      orange: 'border-orange-200 bg-orange-50'
    };
    return colors[color as keyof typeof colors] || 'border-gray-200 bg-gray-50';
  };

  const getFearGreedLabel = (value: number) => {
    if (value <= 24) return { label: 'Extreme Fear', color: 'bg-red-600 text-white' };
    if (value <= 44) return { label: 'Fear', color: 'bg-red-400 text-white' };
    if (value <= 55) return { label: 'Neutral', color: 'bg-gray-500 text-white' };
    if (value <= 75) return { label: 'Greed', color: 'bg-orange-500 text-white' };
    return { label: 'Extreme Greed', color: 'bg-red-600 text-white' };
  };

  const getVixLabel = (value: number) => {
    if (value <= 15) return { label: 'Low Volatility', color: 'bg-green-600 text-white' };
    if (value <= 20) return { label: 'Normal Volatility', color: 'bg-blue-600 text-white' };
    if (value <= 30) return { label: 'High Volatility', color: 'bg-orange-600 text-white' };
    return { label: 'Extreme Volatility', color: 'bg-red-600 text-white' };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Market Behaviour | RupeeSmart</title>
      </Helmet>

      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            📈 Market Events, Cycles & Investor Psychology
          </h1>
          <p className="text-muted-foreground text-lg">
            A Journey Through Time - Decode the heartbeat of the market through events, cycles, and emotions
          </p>
        </div>

        {/* Current Sentiment */}
        <div className="bg-white p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5" />
              📊 Real-Time Sentiment Analysis
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center bg-red-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                📍 {currentSentiment.status}
              </div>
              <p className="text-sm text-gray-600">
                "When everyone is confident, it's time to be cautious."
              </p>
            </div>
            <div className="text-center bg-blue-50 rounded-lg p-4">
              <div className="text-xl font-semibold mb-2">Fear & Greed Index</div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {currentSentiment.fearGreedIndex}/100
              </div>
              <Progress value={currentSentiment.fearGreedIndex} className="w-full" />
            </div>
            <div className="text-center bg-green-50 rounded-lg p-4">
              <div className="text-xl font-semibold mb-2">India VIX</div>
              <div className="text-3xl font-bold mb-1">{currentSentiment.indiaVix}</div>
              <Badge variant="outline">{currentSentiment.vixLevel} Volatility</Badge>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-100 rounded-lg">
            <p className="text-sm font-semibold text-gray-800 mb-1">💡 Investor Tip:</p>
            <p className="text-sm text-gray-700">{currentSentiment.tip}</p>
          </div>
        </div>

        {/* Why Market is Greedy */}
        <div className="p-6 bg-white">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
              Why Market Shows "GREED" Status (62/100)
            </h2>
            <p className="text-gray-600 text-sm">
              Understanding the specific indicators driving current market sentiment
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {greedIndicators.map((item, index) => (
              <div key={index} className="bg-slate-100 rounded-lg p-4">
                <div className="mb-3">
                  <h4 className="font-medium text-slate-800 text-base">📊 {item.indicator}</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-blue-100 rounded-md p-3">
                    <div className="mb-2">
                      <span className="font-medium text-blue-700 text-xs uppercase tracking-wide">Why this matters</span>
                    </div>
                    <p className="text-gray-700 text-sm">{item.reason}</p>
                  </div>
                  
                  <div className="bg-yellow-100 rounded-md p-3">
                    <div className="mb-2">
                      <span className="font-medium text-amber-700 text-xs uppercase tracking-wide">Market Impact</span>
                    </div>
                    <p className="text-gray-700 text-sm">{item.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-red-100 rounded-lg">
            <h4 className="font-bold text-red-800 mb-2">⚠️ GREED Warning Signs:</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Fear & Greed Index above 55 = Overconfidence territory</li>
              <li>• VIX below 20 = Complacency risk (current: 18.5)</li>
              <li>• High retail participation without fundamental backing</li>
              <li>• Media narratives focused on "easy money" stories</li>
              <li>• Increased speculation in IPOs and meme stocks</li>
            </ul>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-3">💡 How to Use These Indicators:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-blue-700 mb-1">Fear & Greed Index (62/100):</h5>
                <p className="text-blue-700">
                  Current "GREED" level suggests caution. Consider taking profits, 
                  avoiding FOMO purchases, and waiting for better entry points.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-blue-700 mb-1">VIX Level (18.5):</h5>
                <p className="text-blue-700">
                  "Normal" volatility but near complacency zone. 
                  Be prepared for potential sudden market moves.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reference Values */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📋 Reference Values & Interpretation Guide
            </CardTitle>
            <CardDescription>
              Understanding Fear & Greed Index and VIX levels for better decision making
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Fear & Greed Scale */}
              <div>
                <h3 className="text-base font-bold mb-3">📊 Fear & Greed Index Scale</h3>
                <div className="space-y-2">
                  {fearGreedScale.map((level, index) => {
                    const getCardColor = (color: string) => {
                      if (color.includes('red-600')) return 'bg-red-50';
                      if (color.includes('red-400')) return 'bg-red-50';
                      if (color.includes('gray-400')) return 'bg-gray-50';
                      if (color.includes('orange-500')) return 'bg-orange-50';
                      return 'bg-gray-50';
                    };
                    
                    return (
                      <div key={index} className={`flex items-start gap-2 p-2 rounded ${getCardColor(level.color)}`}>
                        <div className={`w-3 h-3 rounded ${level.color} mt-0.5`}></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm">{level.label}</span>
                            <span className="text-xs text-muted-foreground">{level.range}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-muted-foreground truncate">{level.description}</p>
                            {currentSentiment.fearGreedIndex >= parseInt(level.range.split('-')[0]) && 
                             currentSentiment.fearGreedIndex <= parseInt(level.range.split('-')[1]) && (
                              <Badge className="bg-orange-500 text-white text-xs ml-2">Current</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* VIX Levels */}
              <div>
                <h3 className="text-base font-bold mb-3">📈 VIX Volatility Levels</h3>
                <div className="space-y-2">
                  {vixLevels.map((level, index) => {
                    const getVixCardColor = (color: string) => {
                      if (color.includes('green-600')) return 'bg-green-50';
                      if (color.includes('blue-600')) return 'bg-blue-50';
                      if (color.includes('orange-600')) return 'bg-orange-50';
                      if (color.includes('red-600')) return 'bg-red-50';
                      return 'bg-gray-50';
                    };
                    
                    return (
                      <div key={index} className={`p-2 rounded ${getVixCardColor(level.color)}`}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-sm">{level.label}</span>
                          <span className="text-xs text-muted-foreground">{level.range}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className={`text-xs ${level.color}`}>{level.meaning}</p>
                          {currentSentiment.indiaVix >= parseFloat(level.range.split('-')[0]) && 
                           (level.range.includes('-') ? currentSentiment.indiaVix <= parseFloat(level.range.split('-')[1]) : currentSentiment.indiaVix >= 30) && (
                            <Badge className="bg-blue-500 text-white text-xs ml-2">Current: {currentSentiment.indiaVix}</Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>


          </CardContent>
        </Card>

        {/* Market Cycles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              🔄 Market Cycles & Key Events
            </CardTitle>
            <CardDescription>
              Understanding how markets behave during different phases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {marketCycles.map((cycle, index) => (
                <div 
                  key={cycle.id} 
                  className={`rounded-lg p-4 cursor-pointer transition-all ${getCycleColor(cycle.color)} ${selectedEvent === cycle.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedEvent(selectedEvent === cycle.id ? null : cycle.id)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{cycle.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">{cycle.title}</h3>
                      <div className="text-xs text-muted-foreground mt-1">
                        <div className="flex flex-wrap gap-2">
                          <span>📅 {cycle.period}</span>
                          <span>🔄 {cycle.type}</span>
                        </div>
                        <div className="mt-1">
                          <span>⏱️ {cycle.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">📉 Sensex:</span>
                      <span className={`font-bold ${getChangeColor(cycle.sensexChange)}`}>
                        {cycle.sensexChange >= 0 ? '+' : ''}{cycle.sensexChange}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">📉 Nifty:</span>
                      <span className={`font-bold ${getChangeColor(cycle.niftyChange)}`}>
                        {cycle.niftyChange >= 0 ? '+' : ''}{cycle.niftyChange}%
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge className={`text-xs ${getFearGreedLabel(cycle.fearGreedIndex).color}`}>
                        {getFearGreedLabel(cycle.fearGreedIndex).label} ({cycle.fearGreedIndex}/100)
                      </Badge>
                      <Badge className={`text-xs ${getVixLabel(cycle.indiaVix).color}`}>
                        {getVixLabel(cycle.indiaVix).label} ({cycle.indiaVix})
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm italic mb-3">"{cycle.description}"</p>

                  {selectedEvent === cycle.id && (
                    <div className="mt-4 space-y-3 border-t pt-3">
                      <div>
                        <h4 className="font-semibold mb-2">🔑 Key Events:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {cycle.keyEvents.map((event, i) => (
                            <li key={i}>{event}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-semibold">🧠 Investor Emotion: </span>
                        <span className="text-sm">{cycle.emotion}</span>
                      </div>
                      <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                        <p className="text-sm">
                          🗣️ <strong>Think About It:</strong> How did you react during this market phase? 
                          Did you make emotional decisions or stick to your strategy?
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Historical Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              📚 Historical Event Snapshots
            </CardTitle>
            <CardDescription>
              Key market-moving events and their sector impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {historicalEvents.map((event, index) => {
                // Determine card color based on market impact
                const getCardColor = (sensex: number, nifty: number) => {
                  const avgChange = (sensex + nifty) / 2;
                  if (avgChange <= -10) return "bg-red-50";
                  if (avgChange <= -5) return "bg-orange-50";
                  if (avgChange >= 10) return "bg-green-50";
                  if (avgChange >= 5) return "bg-blue-50";
                  return "bg-gray-50";
                };
                
                return (
                <div key={index} className={`rounded-lg p-4 ${getCardColor(event.sensex, event.nifty)}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">🔹 {event.date}</p>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${getChangeColor(event.sensex)}`}>
                        Sensex: {event.sensex >= 0 ? '+' : ''}{event.sensex}%
                      </div>
                      <div className={`font-bold ${getChangeColor(event.nifty)}`}>
                        Nifty: {event.nifty >= 0 ? '+' : ''}{event.nifty}%
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2 justify-end">
                        <Badge className={`text-xs ${getFearGreedLabel(event.fearGreedIndex).color}`}>
                          {getFearGreedLabel(event.fearGreedIndex).label} ({event.fearGreedIndex}/100)
                        </Badge>
                        <Badge className={`text-xs ${getVixLabel(event.indiaVix).color}`}>
                          {getVixLabel(event.indiaVix).label} ({event.indiaVix})
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="font-semibold mb-2">Sector Impact:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {event.sectors.map((sector, i) => (
                        <div key={i} className="flex justify-between items-center text-sm bg-white/50 rounded px-2 py-1">
                          <span className="font-medium">{sector.name}:</span>
                          <span className={`font-bold ${getChangeColor(sector.change)}`}>
                            {sector.change >= 0 ? '+' : ''}{sector.change}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-sm">
                      🎯 <strong>Investor Action Tip:</strong> {event.tip}
                    </p>
                  </div>
                </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Investor Psychology */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              🧠 Investor Psychology: Patterns & Pitfalls
            </CardTitle>
            <CardDescription>
              Understanding common biases that affect investment decisions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {psychologyBiases.map((bias, index) => {
                // Assign appropriate colors based on bias type
                const getCardColor = (biasName: string) => {
                  switch(biasName) {
                    case "Herd Behavior": return "bg-purple-50";
                    case "Anchoring Bias": return "bg-blue-50"; 
                    case "Loss Aversion": return "bg-red-50";
                    case "Confirmation Bias": return "bg-orange-50";
                    case "Overconfidence Bias": return "bg-yellow-50";
                    case "Recency Bias": return "bg-green-50";
                    default: return "bg-slate-50";
                  }
                };
                
                return (
                <div key={index} className={`${getCardColor(bias.name)} rounded-lg p-4`}>
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{bias.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{bias.name}</h3>
                      <p className="text-sm mb-3">{bias.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">Red Flags:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {bias.redFlags.map((flag, i) => (
                          <li key={i}>{flag}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Strategy:</h4>
                      <p className="text-sm text-green-700">{bias.strategy}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">Mistake:</h4>
                      <p className="text-sm text-red-700">{bias.mistake}</p>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Investor Toolkit */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              🧭 Your Investor Toolkit: What To Do Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Review Your Portfolio:</h4>
                  <p className="text-sm text-muted-foreground">
                    Is it aligned with long-term goals, or just recent trends?
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Watch Your Emotions:</h4>
                  <p className="text-sm text-muted-foreground">
                    Are you buying out of greed or FOMO? Are you holding losers out of hope or data?
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Rebalance Strategically:</h4>
                  <p className="text-sm text-muted-foreground">
                    Don't time the market. Time your discipline.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Use The Framework:</h4>
                  <Table className="mt-2">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bias</TableHead>
                        <TableHead>What It Looks Like</TableHead>
                        <TableHead>Your Counter-Strategy</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Herd Behavior</TableCell>
                        <TableCell>Following market crowd blindly</TableCell>
                        <TableCell>Contrarian thinking at sentiment extremes</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Anchoring Bias</TableCell>
                        <TableCell>Fixation on entry price</TableCell>
                        <TableCell>Reassess on new data, not old price</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Recency Bias</TableCell>
                        <TableCell>Overvaluing short-term trends</TableCell>
                        <TableCell>Diversify & focus on long-term cycles</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Confirmation Bias</TableCell>
                        <TableCell>Seeking only supportive data</TableCell>
                        <TableCell>Actively research counterviews</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Closing Thought */}
        <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-800">Master Your Investment Psychology</h3>
            </div>
            
            <p className="text-sm mb-4 text-gray-700 max-w-2xl mx-auto">
              Markets are driven not just by numbers, but by <strong className="text-purple-700">human narratives and emotions</strong>. 
              The most successful investors understand that conquering your own psychology is often more important than 
              analyzing financial statements.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Brain className="w-4 h-4 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">Stay Aware</h4>
                <p className="text-xs text-gray-600">Recognize your biases before they influence your decisions</p>
              </div>
              
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">Stay Disciplined</h4>
                <p className="text-xs text-gray-600">Stick to your strategy even when emotions run high</p>
              </div>
              
              <div className="text-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Target className="w-4 h-4 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">Stay Focused</h4>
                <p className="text-xs text-gray-600">Keep your long-term goals in sight during market volatility</p>
              </div>
            </div>
            
            <div className="p-3 bg-white/60 rounded-lg">
              <p className="text-sm font-medium text-gray-700">
                "The investor's chief problem—and his worst enemy—is likely to be himself." 
                <span className="block text-xs text-gray-500 mt-1">— Benjamin Graham</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}