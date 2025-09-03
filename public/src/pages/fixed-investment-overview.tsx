import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Slider } from "../components/ui/slider";
import { Label } from "../components/ui/label";
import { SEO } from "../components/SEO";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

export default function InvestmentOptionsOverview() {
  // Risk assessment state
  const [age, setAge] = useState(35);
  const [monthlyIncome, setMonthlyIncome] = useState(75000);
  const [investmentHorizon, setInvestmentHorizon] = useState(5);
  const [riskTolerance, setRiskTolerance] = useState(3);

  // Calculate risk profile score (1-10)
  const calculateRiskScore = () => {
    // Age factor: younger = higher risk capacity
    const ageFactor = Math.max(1, 10 - Math.floor((age - 18) / 5));
    
    // Income factor: higher income = higher risk capacity
    const incomeFactor = Math.min(10, Math.max(1, Math.floor(monthlyIncome / 20000)));
    
    // Horizon factor: longer horizon = higher risk capacity
    const horizonFactor = Math.min(10, Math.max(1, investmentHorizon));
    
    // Risk tolerance self-assessment (1-5)
    const toleranceFactor = riskTolerance * 2;
    
    // Calculate overall score
    const overallScore = Math.round((ageFactor + incomeFactor + horizonFactor + toleranceFactor) / 4);
    
    return overallScore;
  };

  // Get portfolio allocation based on risk score
  const getPortfolioAllocation = () => {
    const riskScore = calculateRiskScore();
    
    if (riskScore >= 8) {
      return {
        type: "Aggressive",
        allocation: {
          equity: 70,
          debt: 20,
          alternatives: 10
        },
        color: "text-red-500"
      };
    } else if (riskScore >= 6) {
      return {
        type: "Moderate-Aggressive",
        allocation: {
          equity: 60,
          debt: 30,
          alternatives: 10
        },
        color: "text-orange-500"
      };
    } else if (riskScore >= 4) {
      return {
        type: "Moderate",
        allocation: {
          equity: 50,
          debt: 40,
          alternatives: 10
        },
        color: "text-yellow-600"
      };
    } else if (riskScore >= 2) {
      return {
        type: "Conservative-Moderate",
        allocation: {
          equity: 30,
          debt: 60,
          alternatives: 10
        },
        color: "text-green-600"
      };
    } else {
      return {
        type: "Conservative",
        allocation: {
          equity: 20,
          debt: 70,
          alternatives: 10
        },
        color: "text-blue-500"
      };
    }
  };

  // Risk-Return data for chart
  const investmentOptions = [
    { risk: 1, return: 3, name: "Savings" },
    { risk: 2, return: 5.5, name: "Fixed Deposits" },
    { risk: 3, return: 7.1, name: "PPF" },
    { risk: 4, return: 8, name: "REITs" },
    { risk: 5, return: 9, name: "NPS" },
    { risk: 6, return: 10, name: "Index Funds" },
    { risk: 7, return: 12, name: "Large Cap" },
    { risk: 8, return: 15, name: "Mid Cap" },
    { risk: 9, return: 18, name: "Small Cap" }
  ];

  const portfolio = getPortfolioAllocation();

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-md rounded border border-gray-200">
          <p className="font-semibold">{data.name}</p>
          <p>Risk Level: {data.risk}</p>
          <p>Expected Return: {data.return}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 md:p-6">
      <SEO 
        title="Investment Options Overview | RupeeSmart"
        description="Explore different investment options based on your risk profile and financial goals."
        keywords="investment options, risk profile, portfolio allocation, investment recommendations, financial planning"
      />
      <h1 className="text-2xl font-bold mb-6">Investment Options Overview</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Profile Assessment Card */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="material-icons mr-2 text-blue-500">assignment</span>
              Quick Risk Profile Assessment
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Your Age</Label>
                  <span className="text-sm font-medium">{age} years</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 w-8">18</span>
                  <Slider 
                    value={[age]} 
                    min={18} 
                    max={70} 
                    step={1} 
                    onValueChange={(value) => setAge(value[0])}
                    className="mx-2 flex-1" 
                  />
                  <span className="text-xs text-gray-500 w-8">70</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label>Monthly Income (Rs.)</Label>
                  <span className="text-sm font-medium">₹{monthlyIncome.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 w-8">&lt;30k</span>
                  <Slider 
                    value={[monthlyIncome]} 
                    min={10000} 
                    max={5000000} 
                    step={10000} 
                    onValueChange={(value) => setMonthlyIncome(value[0])}
                    className="mx-2 flex-1" 
                  />
                  <span className="text-xs text-gray-500 w-8">&gt;50L</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label>Investment Horizon</Label>
                  <span className="text-sm font-medium">{investmentHorizon} years</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 w-12">&lt;1 year</span>
                  <Slider 
                    value={[investmentHorizon]} 
                    min={1} 
                    max={30} 
                    step={1} 
                    onValueChange={(value) => setInvestmentHorizon(value[0])}
                    className="mx-2 flex-1" 
                  />
                  <span className="text-xs text-gray-500 w-12">&gt;30 years</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label>Risk Tolerance</Label>
                  <span className="text-sm font-medium">
                    {riskTolerance === 1 ? "Very Low" : 
                     riskTolerance === 2 ? "Low" : 
                     riskTolerance === 3 ? "Moderate" : 
                     riskTolerance === 4 ? "High" : "Very High"}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 w-12">Very Low</span>
                  <Slider 
                    value={[riskTolerance]} 
                    min={1} 
                    max={5} 
                    step={1} 
                    onValueChange={(value) => setRiskTolerance(value[0])}
                    className="mx-2 flex-1" 
                  />
                  <span className="text-xs text-gray-500 w-12">Very High</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personalized Portfolio Allocation */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="material-icons mr-2 text-amber-500">visibility</span>
              Personalized Investment Portfolio
            </h2>

            <div>
              <p className="mb-4">Based on your inputs, a <span className={`font-medium ${portfolio.color}`}>{portfolio.type} Portfolio</span> might be suitable:</p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span>Equity (including Mid & Small Cap)</span>
                    <span className="font-medium">{portfolio.allocation.equity}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${portfolio.allocation.equity}%` }}></div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span>Debt</span>
                    <span className="font-medium">{portfolio.allocation.debt}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: `${portfolio.allocation.debt}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Alternatives</span>
                    <span className="font-medium">{portfolio.allocation.alternatives}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: `${portfolio.allocation.alternatives}%` }}></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded p-3 text-sm text-amber-800">
                <p className="font-medium">Portfolio Disclaimer:</p>
                <p>These portfolio options are general guidelines and may not be suitable for everyone. 
                Consult a financial advisor for personalized advice.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk vs Return Chart */}
      <Card className="mt-6 shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="material-icons mr-2 text-purple-500">trending_up</span>
            Risk vs Return Profile
          </h2>
          
          <p className="mb-4 text-gray-700">
            This chart visually compares the risk (x-axis) and expected return (y-axis) of different investment types. 
            Each point represents a specific investment, showing its risk level and the historical or expected annual 
            return it might generate.
          </p>
          
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={investmentOptions}
                margin={{ top: 40, right: 40, left: 20, bottom: 40 }}
              >
                <defs>
                  <filter id="shadow" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="white" floodOpacity="1" />
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  dataKey="risk" 
                  domain={[1, 10]}
                  ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} 
                  label={{ value: 'Risk Level', position: 'insideBottom', offset: -10 }}
                />
                <YAxis 
                  type="number" 
                  domain={[0, 20]} 
                  ticks={[0, 5, 10, 15, 20]}
                  label={{ value: 'Expected Return (%)', angle: -90, position: 'insideLeft', offset: 5 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="return" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{
                    r: 5,
                    stroke: '#8884d8',
                    strokeWidth: 2,
                    fill: 'white',
                  }}
                  activeDot={{ r: 7, fill: '#8884d8' }}
                  isAnimationActive={false}
                />
                
                {/* Static labels positioned exactly where we want them */}
                <text x="12%" y="73%" textAnchor="start" filter="url(#shadow)" fill="#333" fontSize={11} fontWeight="600">Savings: 3%</text>
                <text x="21%" y="66%" textAnchor="start" filter="url(#shadow)" fill="#333" fontSize={11} fontWeight="600">Fixed Deposits: 5.5%</text>
                <text x="30%" y="63%" textAnchor="middle" filter="url(#shadow)" fill="#333" fontSize={11} fontWeight="600">PPF: 7.1%</text>
                <text x="40%" y="60%" textAnchor="middle" filter="url(#shadow)" fill="#333" fontSize={11} fontWeight="600">REITs: 8%</text>
                <text x="50%" y="55%" textAnchor="middle" filter="url(#shadow)" fill="#333" fontSize={11} fontWeight="600">NPS: 9%</text>
                <text x="60%" y="50%" textAnchor="middle" filter="url(#shadow)" fill="#333" fontSize={11} fontWeight="600">Index Funds: 10%</text>
                <text x="70%" y="45%" textAnchor="middle" filter="url(#shadow)" fill="#333" fontSize={11} fontWeight="600">Large Cap: 12%</text>
                <text x="80%" y="35%" textAnchor="middle" filter="url(#shadow)" fill="#333" fontSize={11} fontWeight="600">Mid Cap: 15%</text>
                <text x="90%" y="25%" textAnchor="middle" filter="url(#shadow)" fill="#333" fontSize={11} fontWeight="600">Small Cap: 18%</text>
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <p className="mt-3 text-xs text-gray-600 italic">
            Note: The risk-return chart is based on historical data and general market behavior. 
            Actual returns may vary significantly. Different market conditions can affect both risk and return levels.
          </p>
        </CardContent>
      </Card>

      {/* Comprehensive Investment Options in India */}
      <Card className="mt-6 shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="material-icons mr-2 text-amber-500">savings</span>
            Comprehensive Investment Options in India
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Low Risk Card */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-2">
                  <span className="material-icons text-sm">check</span>
                </span>
                <h3 className="text-green-800 font-semibold text-lg">Low-Risk Investments</h3>
              </div>
              <p className="text-sm text-green-800 mb-3">Goal: Capital protection, stable returns, peace of mind.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Public Provident Fund (PPF)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Fixed Deposits (FDs)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Employees' Provident Fund (EPF)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Recurring Deposits (RDs)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Savings Accounts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Post Office Schemes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Sovereign Gold Bonds</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Government Bonds (G-Secs)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Treasury Bills (T-Bills)</span>
                </li>
              </ul>
              <p className="text-xs text-green-700 mt-3 font-medium">Expected returns: 2% - 8.15%</p>
            </div>
            
            {/* Moderate Risk Card */}
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center mr-2">
                  <span className="material-icons text-sm">balance</span>
                </span>
                <h3 className="text-amber-800 font-semibold text-lg">Moderate-Risk Investments</h3>
              </div>
              <p className="text-sm text-amber-800 mb-3">Goal: Balanced growth with some protection from downside.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Index Funds (Nifty 50, Sensex)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Exchange Traded Funds (ETFs)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Large-cap Mutual Funds / Stocks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>REITs (Real Estate Inv. Trusts)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Corporate Bonds / NCDs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>National Pension Scheme (NPS)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Hybrid Mutual Funds</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Arbitrage Funds</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Debt Mutual Funds</span>
                </li>
              </ul>
              <p className="text-xs text-amber-700 mt-3 font-medium">Expected returns: 5% - 13%</p>
            </div>
            
            {/* High Risk Card */}
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center mr-2">
                  <span className="material-icons text-sm">trending_up</span>
                </span>
                <h3 className="text-red-800 font-semibold text-lg">High-Risk Investments</h3>
              </div>
              <p className="text-sm text-red-800 mb-3">Goal: Wealth creation, aggressive growth, speculative profits.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Mid-cap Mutual Funds / Stocks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Small-cap Mutual Funds / Stocks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Thematic/Sectoral Mutual Funds</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Direct Equity (Stock Trading)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Derivatives (Futures & Options)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Commodities (Gold, Oil, Silver)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Cryptocurrencies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>PMS (Portfolio Management)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Startup / Angel Investing</span>
                </li>
              </ul>
              <p className="text-xs text-red-700 mt-3 font-medium">Expected returns: 10% - 25%+</p>
            </div>
          </div>
          
          {/* Alternative Investments Card */}
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-8">
            <div className="flex items-center mb-3">
              <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center mr-2">
                <span className="material-icons text-sm">lightbulb</span>
              </span>
              <h3 className="text-purple-800 font-semibold text-lg">Alternative Investments</h3>
            </div>
            <p className="text-sm text-purple-800 mb-3">Diversify your portfolio with these less conventional options.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="font-medium text-sm">Digital Gold</p>
                <p className="text-xs text-gray-600">Returns: 6% - 9%</p>
                <p className="text-xs text-gray-600">Risk: Moderate</p>
              </div>
              
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="font-medium text-sm">ULIPs</p>
                <p className="text-xs text-gray-600">Returns: 6% - 10%</p>
                <p className="text-xs text-gray-600">Risk: Moderate</p>
              </div>
              
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="font-medium text-sm">Real Estate (Direct)</p>
                <p className="text-xs text-gray-600">Returns: 6% - 12%</p>
                <p className="text-xs text-gray-600">Risk: Moderate-High</p>
              </div>
              
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="font-medium text-sm">Crypto SIPs</p>
                <p className="text-xs text-gray-600">Returns: Varies</p>
                <p className="text-xs text-gray-600">Risk: Extremely High</p>
              </div>
              
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="font-medium text-sm">P2P Lending</p>
                <p className="text-xs text-gray-600">Returns: 10% - 15%</p>
                <p className="text-xs text-gray-600">Risk: High</p>
              </div>
              
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="font-medium text-sm">International Funds</p>
                <p className="text-xs text-gray-600">Returns: 8% - 14%</p>
                <p className="text-xs text-gray-600">Risk: High</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Categories by Risk Level */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Low-Risk Investments */}
        <div className="bg-green-50 p-5 rounded-lg">
          <h4 className="font-semibold text-green-800 flex items-center mb-3">
            <span className="text-green-600 mr-2">✓</span>
            Low-Risk Investments
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>Public Provident Fund (PPF)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>EPF / VPF</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>Fixed Deposits (FDs)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>Savings Accounts</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>Sovereign Gold Bonds</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>Post Office Schemes</span>
            </li>
          </ul>
        </div>
        
        {/* Moderate-Risk Investments */}
        <div className="bg-amber-50 p-5 rounded-lg">
          <h4 className="font-semibold text-amber-800 flex items-center mb-3">
            <span className="text-amber-600 mr-2">◉</span>
            Moderate-Risk Investments
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              <span>Index Funds</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              <span>ETFs</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              <span>Large-cap Stocks</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              <span>REITs</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              <span>NPS</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              <span>Corporate Bonds</span>
            </li>
          </ul>
        </div>
        
        {/* High-Risk Investments */}
        <div className="bg-red-50 p-5 rounded-lg">
          <h4 className="font-semibold text-red-800 flex items-center mb-3">
            <span className="text-red-600 mr-2">◉</span>
            High-Risk Investments
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>Mid-cap Stocks</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>Small-cap Stocks</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>Sectoral Funds</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>International Stocks</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>Crypto</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>Commodities</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>Leveraged/Derivatives-based ETFs</span>
            </li>
          </ul>
        </div>
      </div>
      

      
      {/* Investment Type by Investor Profile */}
      <Card className="mt-8 shadow-md">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="material-icons mr-2 text-blue-500">people</span>
            Investment Type by Investor Profile
          </h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border p-3 text-left font-medium">Investor Type</th>
                  <th className="border p-3 text-left font-medium">Ideal Investment Options</th>
                  <th className="border p-3 text-left font-medium">Allocation Strategy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3 bg-blue-50 font-medium">Conservative</td>
                  <td className="border p-3">Index Funds, Bank FDs, PPF, Debt Funds, Govt. Bonds</td>
                  <td className="border p-3">20% Equity, 70% Debt, 10% Gold/Alternative</td>
                </tr>
                <tr>
                  <td className="border p-3 bg-green-50 font-medium">Moderate</td>
                  <td className="border p-3">Large-Cap Funds, Corporate Bonds, Balanced Funds</td>
                  <td className="border p-3">50% Equity, 40% Debt, 10% Gold/Alternative</td>
                </tr>
                <tr>
                  <td className="border p-3 bg-amber-50 font-medium">Aggressive</td>
                  <td className="border p-3">Mid/Small Cap Funds, Sectoral Funds, International Equities</td>
                  <td className="border p-3">70% Equity, 20% Debt, 10% Gold/Alternative</td>
                </tr>
                <tr>
                  <td className="border p-3 bg-purple-50 font-medium">Young Investors (20-35)</td>
                  <td className="border p-3">Index Funds, Mid-Cap Equity, Aggressive Hybrid Funds</td>
                  <td className="border p-3">70-80% Equity, 10-20% Debt, 5-10% Alternatives</td>
                </tr>
                <tr>
                  <td className="border p-3 bg-teal-50 font-medium">Middle Age (35-50)</td>
                  <td className="border p-3">Balanced Mix of Large-Cap Equity, Corporate Bonds, REITs</td>
                  <td className="border p-3">50-60% Equity, 30-40% Debt, 5-10% Alternatives</td>
                </tr>
                <tr>
                  <td className="border p-3 bg-rose-50 font-medium">Near Retirement (50+)</td>
                  <td className="border p-3">Fixed Deposits, Govt. Securities, Senior Citizen Savings</td>
                  <td className="border p-3">20-30% Equity, 60-70% Debt, 5-10% Gold</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}