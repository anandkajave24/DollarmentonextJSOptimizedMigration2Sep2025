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
          
          <div className="overflow-x-auto">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
              <span className="text-blue-600 mr-2">⚪</span>
              Low-Risk Investment Options
              <span className="ml-2 text-sm font-normal text-gray-600">(Focus on capital preservation and guaranteed returns)</span>
            </h4>
            
            <table className="min-w-full rounded-lg overflow-hidden text-sm mb-6">
              <thead>
                <tr className="bg-blue-50 text-gray-700 font-medium">
                  <th className="p-3 text-left">INVESTMENT TYPE</th>
                  <th className="p-3 text-left">EXPECTED RETURN</th>
                  <th className="p-3 text-left">RISK LEVEL</th>
                  <th className="p-3 text-left">LIQUIDITY</th>
                  <th className="p-3 text-left">IDEAL FOR</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Public Provident Fund (PPF)</td>
                  <td className="p-3">~7.1%</td>
                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded-full">
                      Very Low
                    </span>
                  </td>
                  <td className="p-3">Low (15-year lock-in)</td>
                  <td className="p-3">Long-term, tax-saving investors</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">EPF / VPF</td>
                  <td className="p-3">~8.15%</td>
                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded-full">
                      Very Low
                    </span>
                  </td>
                  <td className="p-3">Low</td>
                  <td className="p-3">Salaried individuals</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Fixed Deposits</td>
                  <td className="p-3">6% - 7.5%</td>
                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded-full">
                      Very Low
                    </span>
                  </td>
                  <td className="p-3">High (Premature penalty)</td>
                  <td className="p-3">Elderly, capital preservation</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Recurring Deposits</td>
                  <td className="p-3">5.5% - 7%</td>
                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded-full">
                      Very Low
                    </span>
                  </td>
                  <td className="p-3">Moderate</td>
                  <td className="p-3">Small, regular savers</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Savings Account</td>
                  <td className="p-3">2% - 4%</td>
                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded-full">
                      Very Low
                    </span>
                  </td>
                  <td className="p-3">Very High</td>
                  <td className="p-3">Daily liquidity needs</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Post Office Saving Schemes</td>
                  <td className="p-3">6.6% - 7.7%</td>
                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded-full">
                      Very Low
                    </span>
                  </td>
                  <td className="p-3">Low - Moderate</td>
                  <td className="p-3">Conservative investors</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Sovereign Gold Bonds</td>
                  <td className="p-3">7.5% + 2.5% interest</td>
                  <td className="p-3">
                    <span className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded-full">
                      Low
                    </span>
                  </td>
                  <td className="p-3">Low (5-8 year lock-in)</td>
                  <td className="p-3">Gold investors with long-term horizon</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Government Bonds (G-Secs)</td>
                  <td className="p-3">6% - 7.5%</td>
                  <td className="p-3">
                    <span className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded-full">
                      Low
                    </span>
                  </td>
                  <td className="p-3">Low - Moderate</td>
                  <td className="p-3">Risk-averse long-term investors</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Treasury Bills</td>
                  <td className="p-3">~5.5% - 6.5%</td>
                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded-full">
                      Very Low
                    </span>
                  </td>
                  <td className="p-3">Short-term (91 to 364 days)</td>
                  <td className="p-3">Ultra-safe, short-term investors</td>
                </tr>
              </tbody>
            </table>
            
            <h4 className="font-semibold text-amber-800 mb-3 flex items-center">
              <span className="text-amber-600 mr-2">🟠</span>
              Moderate-Risk Investment Options
              <span className="ml-2 text-sm font-normal text-gray-600">(Balance between growth and safety)</span>
            </h4>
            
            <table className="min-w-full rounded-lg overflow-hidden text-sm mb-6">
              <thead>
                <tr className="bg-blue-50 text-gray-700 font-medium">
                  <th className="p-3 text-left">INVESTMENT TYPE</th>
                  <th className="p-3 text-left">EXPECTED RETURN</th>
                  <th className="p-3 text-left">RISK LEVEL</th>
                  <th className="p-3 text-left">LIQUIDITY</th>
                  <th className="p-3 text-left">IDEAL FOR</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Index Funds</td>
                  <td className="p-3">10%</td>
                  <td className="p-3">
                    <span className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded-full">
                      Low to Moderate
                    </span>
                  </td>
                  <td className="p-3">High</td>
                  <td className="p-3">Long-term passive investors</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Large-cap Stocks</td>
                  <td className="p-3">12%</td>
                  <td className="p-3">
                    <span className="bg-yellow-100 text-yellow-800 text-[10px] px-1.5 py-0.5 rounded-full">
                      Moderate
                    </span>
                  </td>
                  <td className="p-3">High</td>
                  <td className="p-3">Moderate risk-tolerant investors</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">REITs</td>
                  <td className="p-3">6% - 10%</td>
                  <td className="p-3">
                    <span className="bg-yellow-100 text-yellow-800 text-[10px] px-1.5 py-0.5 rounded-full">
                      Moderate
                    </span>
                  </td>
                  <td className="p-3">Moderate</td>
                  <td className="p-3">Income + asset exposure seekers</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">National Pension Scheme</td>
                  <td className="p-3">9% - 12%</td>
                  <td className="p-3">
                    <span className="bg-yellow-100 text-yellow-800 text-[10px] px-1.5 py-0.5 rounded-full">
                      Moderate
                    </span>
                  </td>
                  <td className="p-3">Very Low (lock-in till 60)</td>
                  <td className="p-3">Retirement-focused investors</td>
                </tr>
              </tbody>
            </table>
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
      
      {/* Key Investment Takeaways - Bottom Box */}
      <Card className="mt-8 shadow-md">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="material-icons mr-2 text-green-500">lightbulb</span>
            Key Investment Takeaways
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="material-icons text-green-500 mr-2 mt-0.5">check_circle</span>
              <div>
                <p className="font-medium">Diversify across asset classes</p>
                <p className="text-sm text-gray-600">Never put all your money in one type of investment. Spread across equity, debt, gold, and other assets.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-green-500 mr-2 mt-0.5">check_circle</span>
              <div>
                <p className="font-medium">Match investments to your time horizon</p>
                <p className="text-sm text-gray-600">Short-term goals (1-3 years): Low-risk instruments like FDs</p>
                <p className="text-sm text-gray-600">Medium-term goals (3-7 years): Balanced mix of debt and equity</p>
                <p className="text-sm text-gray-600">Long-term goals (7+ years): Higher equity allocation for better returns</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-green-500 mr-2 mt-0.5">check_circle</span>
              <div>
                <p className="font-medium">Start early and invest regularly</p>
                <p className="text-sm text-gray-600">The power of compounding works best over long periods. SIPs in mutual funds can help build discipline.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-green-500 mr-2 mt-0.5">check_circle</span>
              <div>
                <p className="font-medium">Review and rebalance periodically</p>
                <p className="text-sm text-gray-600">Revisit your portfolio at least once a year to ensure it aligns with your current goals and risk profile.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
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