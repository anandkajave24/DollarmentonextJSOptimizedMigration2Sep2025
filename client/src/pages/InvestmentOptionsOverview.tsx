import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { SEO } from '../components/SEO';
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
  return (
    <>
      <SEO 
        title="Investment Options Overview - Portfolio Risk Assessment & Allocation Guide"
        description="Comprehensive investment options overview with personalized portfolio allocation recommendations. Assess your risk profile and get expert investment guidance for optimal portfolio construction."
        keywords="investment options, portfolio allocation, risk assessment, investment portfolio, asset allocation, investment strategy, portfolio diversification, investment advisor, wealth management"
        canonical="https://dollarmento.com/investment-options-overview"
      />
      <InvestmentOptionsContent />
    </>
  );
}

function InvestmentOptionsContent() {
  // Risk assessment state - optimize with memo for faster loading
  const [age, setAge] = useState(35);
  const [monthlyIncome, setMonthlyIncome] = useState(75000);
  const [investmentHorizon, setInvestmentHorizon] = useState(5);
  const [riskTolerance, setRiskTolerance] = useState(3);
  const [showCharts, setShowCharts] = useState(false);

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

  // Optimize data loading - only calculate when needed
  const getInvestmentOptions = () => [
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
                  <span className="text-sm text-sm">{age} years</span>
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
                  <span className="text-sm text-sm">${monthlyIncome.toLocaleString()}</span>
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
                  <span className="text-sm text-sm">{investmentHorizon} years</span>
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
                  <span className="text-sm text-sm">
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
              <p className="mb-4">Based on your inputs, a <span className={`text-sm ${portfolio.color}`}>{portfolio.type} Portfolio</span> might be suitable:</p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span>Equity (including Mid & Small Cap)</span>
                    <span className="text-sm">{portfolio.allocation.equity}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${portfolio.allocation.equity}%` }}></div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span>Debt</span>
                    <span className="text-sm">{portfolio.allocation.debt}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: `${portfolio.allocation.debt}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Alternatives</span>
                    <span className="text-sm">{portfolio.allocation.alternatives}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: `${portfolio.allocation.alternatives}%` }}></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded p-3 text-sm text-amber-800">
                <p className="text-sm">Portfolio Disclaimer:</p>
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
            {showCharts ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={getInvestmentOptions()}
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
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <span className="material-icons text-4xl text-gray-400 mb-3">show_chart</span>
                <p className="text-gray-600 mb-4">Click to load interactive chart</p>
                <button
                  onClick={() => setShowCharts(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Load Chart
                </button>
              </div>
            )}
          </div>
          
          <p className="mt-3 text-xs text-xs text-gray-600 italic">
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
          
          <div className="space-y-6 mb-6">
            {/* Low Risk Card */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-2">
                  <span className="material-icons text-sm">check</span>
                </span>
                <h3 className="text-green-800 font-semibold text-lg">Low-Risk Investment Options</h3>
              </div>
              <p className="text-sm mb-3"><span className="font-bold text-green-800">Goal:</span> <span className="text-black">Capital protection, stable returns, peace of mind.</span></p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs mb-3">
                  <thead className="bg-green-100">
                    <tr>
                      <th className="p-2 text-left border-b border-green-200 text-sm">Investment Option</th>
                      <th className="p-2 text-left border-b border-green-200 text-sm">Expected Returns</th>
                      <th className="p-2 text-left border-b border-green-200 text-sm">Liquidity</th>
                      <th className="p-2 text-left border-b border-green-200 text-sm">Risk Level</th>
                      <th className="p-2 text-left border-b border-green-200 text-sm">Ideal For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-green-50 hover:bg-green-50">
                      <td className="p-2 text-sm">PPF</td>
                      <td className="p-2">~7.1% (Govt-set)</td>
                      <td className="p-2">Low</td>
                      <td className="p-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Very Low
                        </span>
                      </td>
                      <td className="p-2">Long-term savers, tax planning</td>
                    </tr>
                    <tr className="border-b border-green-50 hover:bg-green-50">
                      <td className="p-2 text-sm">EPF / VPF</td>
                      <td className="p-2">~8.15%</td>
                      <td className="p-2">Low</td>
                      <td className="p-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Very Low
                        </span>
                      </td>
                      <td className="p-2">Salaried individuals</td>
                    </tr>
                    <tr className="border-b border-green-50 hover:bg-green-50">
                      <td className="p-2 text-sm">Fixed Deposits</td>
                      <td className="p-2">6% – 7.5%</td>
                      <td className="p-2">High (some penalty)</td>
                      <td className="p-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Low
                        </span>
                      </td>
                      <td className="p-2">Retirees, conservative savers</td>
                    </tr>
                    <tr className="border-b border-green-50 hover:bg-green-50">
                      <td className="p-2 text-sm">Recurring Deposits</td>
                      <td className="p-2">5.5% – 7%</td>
                      <td className="p-2">Moderate</td>
                      <td className="p-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Low
                        </span>
                      </td>
                      <td className="p-2">Small monthly savers</td>
                    </tr>
                    <tr className="border-b border-green-50 hover:bg-green-50">
                      <td className="p-2 text-sm">Savings Account</td>
                      <td className="p-2">2% – 4%</td>
                      <td className="p-2">Very High</td>
                      <td className="p-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Very Low
                        </span>
                      </td>
                      <td className="p-2">Day-to-day funds</td>
                    </tr>
                    <tr className="border-b border-green-50 hover:bg-green-50">
                      <td className="p-2 text-sm">Post Office Schemes</td>
                      <td className="p-2">6.6% – 7.7%</td>
                      <td className="p-2">Low – Moderate</td>
                      <td className="p-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Very Low
                        </span>
                      </td>
                      <td className="p-2">Rural & conservative investors</td>
                    </tr>
                    <tr className="border-b border-green-50 hover:bg-green-50">
                      <td className="p-2 text-sm">Sovereign Gold Bonds</td>
                      <td className="p-2">~7.5%+</td>
                      <td className="p-2">Low (5–8 year lock-in)</td>
                      <td className="p-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Low
                        </span>
                      </td>
                      <td className="p-2">Gold investors, long-term holders</td>
                    </tr>
                    <tr className="border-b border-green-50 hover:bg-green-50">
                      <td className="p-2 text-sm">Government Bonds</td>
                      <td className="p-2">6% – 7.5%</td>
                      <td className="p-2">Low</td>
                      <td className="p-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Very Low
                        </span>
                      </td>
                      <td className="p-2">Capital preservation focus</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="p-2 text-sm">Treasury Bills</td>
                      <td className="p-2">~5.5% – 6.5%</td>
                      <td className="p-2">High (short-term)</td>
                      <td className="p-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Very Low
                        </span>
                      </td>
                      <td className="p-2">Safe short-term investors</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="text-sm bg-green-100 text-green-800 mt-3 font-bold py-2 px-3 rounded-md inline-block">Expected returns: 2% - 8.15%</p>
            </div>
            
            {/* Moderate Risk Card */}
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center mr-2">
                  <span className="material-icons text-sm">balance</span>
                </span>
                <h3 className="text-amber-800 font-semibold text-lg">Moderate-Risk Investments</h3>
              </div>
              <p className="text-sm mb-3"><span className="font-bold text-amber-800">Goal:</span> <span className="text-black">Balanced growth with some protection from downside.</span></p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs mb-3">
                  <thead className="bg-amber-100">
                    <tr>
                      <th className="p-2 text-left border-b border-amber-200 text-sm">Investment Option</th>
                      <th className="p-2 text-left border-b border-amber-200 text-sm">Expected Returns</th>
                      <th className="p-2 text-left border-b border-amber-200 text-sm">Liquidity</th>
                      <th className="p-2 text-left border-b border-amber-200 text-sm">Risk Level</th>
                      <th className="p-2 text-left border-b border-amber-200 text-sm">Ideal For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-amber-50 hover:bg-amber-50">
                      <td className="p-2 text-sm">Index Funds (Nifty 50)</td>
                      <td className="p-2">10% - 12%</td>
                      <td className="p-2">High</td>
                      <td className="p-2">
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                          Moderate
                        </span>
                      </td>
                      <td className="p-2">First-time investors, long-term goals</td>
                    </tr>
                    <tr className="border-b border-amber-50 hover:bg-amber-50">
                      <td className="p-2 text-sm">Exchange Traded Funds</td>
                      <td className="p-2">8% - 12%</td>
                      <td className="p-2">Very High</td>
                      <td className="p-2">
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                          Moderate
                        </span>
                      </td>
                      <td className="p-2">Cost-conscious investors</td>
                    </tr>
                    <tr className="border-b border-amber-50 hover:bg-amber-50">
                      <td className="p-2 text-sm">Large-cap Mutual Funds</td>
                      <td className="p-2">10% - 14%</td>
                      <td className="p-2">High</td>
                      <td className="p-2">
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                          Moderate
                        </span>
                      </td>
                      <td className="p-2">Long-term investors seeking stability</td>
                    </tr>
                    <tr className="border-b border-amber-50 hover:bg-amber-50">
                      <td className="p-2 text-sm">REITs</td>
                      <td className="p-2">8% - 12%</td>
                      <td className="p-2">High</td>
                      <td className="p-2">
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                          Moderate
                        </span>
                      </td>
                      <td className="p-2">Real estate exposure without direct ownership</td>
                    </tr>
                    <tr className="border-b border-amber-50 hover:bg-amber-50">
                      <td className="p-2 text-sm">Corporate Bonds / NCDs</td>
                      <td className="p-2">7% - 9%</td>
                      <td className="p-2">Moderate</td>
                      <td className="p-2">
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                          Moderate
                        </span>
                      </td>
                      <td className="p-2">Income-focused investors</td>
                    </tr>
                    <tr className="border-b border-amber-50 hover:bg-amber-50">
                      <td className="p-2 text-sm">National Pension Scheme</td>
                      <td className="p-2">8% - 10%</td>
                      <td className="p-2">Low</td>
                      <td className="p-2">
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                          Low-Moderate
                        </span>
                      </td>
                      <td className="p-2">Long-term retirement planning</td>
                    </tr>
                    <tr className="border-b border-amber-50 hover:bg-amber-50">
                      <td className="p-2 text-sm">Hybrid Mutual Funds</td>
                      <td className="p-2">9% - 11%</td>
                      <td className="p-2">High</td>
                      <td className="p-2">
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                          Moderate
                        </span>
                      </td>
                      <td className="p-2">Balanced investors seeking stability</td>
                    </tr>
                    <tr className="border-b border-amber-50 hover:bg-amber-50">
                      <td className="p-2 text-sm">Arbitrage Funds</td>
                      <td className="p-2">6% - 8%</td>
                      <td className="p-2">High</td>
                      <td className="p-2">
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                          Low-Moderate
                        </span>
                      </td>
                      <td className="p-2">Tax-efficient short-term investments</td>
                    </tr>
                    <tr className="hover:bg-amber-50">
                      <td className="p-2 text-sm">Debt Mutual Funds</td>
                      <td className="p-2">7% - 9%</td>
                      <td className="p-2">High</td>
                      <td className="p-2">
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                          Low-Moderate
                        </span>
                      </td>
                      <td className="p-2">Conservative investors seeking fixed income</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm bg-amber-100 text-amber-800 mt-3 font-bold py-2 px-3 rounded-md inline-block">Expected returns: 5% - 14% (moderate volatility)</p>
            </div>
            
            {/* High Risk Card */}
            <div className="bg-red-50 border border-red-100 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center mr-2">
                  <span className="material-icons text-sm">trending_up</span>
                </span>
                <h3 className="text-red-800 font-semibold text-lg">High-Risk Investments</h3>
              </div>
              <p className="text-sm mb-3"><span className="font-bold text-red-800">Goal:</span> <span className="text-black">Wealth creation, aggressive growth, speculative profits.</span></p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs mb-3">
                  <thead className="bg-red-100">
                    <tr>
                      <th className="p-2 text-left border-b border-red-200 text-sm">Investment Option</th>
                      <th className="p-2 text-left border-b border-red-200 text-sm">Expected Returns</th>
                      <th className="p-2 text-left border-b border-red-200 text-sm">Liquidity</th>
                      <th className="p-2 text-left border-b border-red-200 text-sm">Risk Level</th>
                      <th className="p-2 text-left border-b border-red-200 text-sm">Ideal For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-red-50 hover:bg-red-50">
                      <td className="p-2 text-sm">Mid-cap Mutual Funds</td>
                      <td className="p-2">12% - 18%</td>
                      <td className="p-2">High</td>
                      <td className="p-2">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          Moderate-High
                        </span>
                      </td>
                      <td className="p-2">Growth with some stability</td>
                    </tr>
                    <tr className="border-b border-red-50 hover:bg-red-50">
                      <td className="p-2 text-sm">Small-cap Mutual Funds</td>
                      <td className="p-2">15% - 25%+</td>
                      <td className="p-2">High</td>
                      <td className="p-2">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          High
                        </span>
                      </td>
                      <td className="p-2">Growth-focused investors</td>
                    </tr>
                    <tr className="border-b border-red-50 hover:bg-red-50">
                      <td className="p-2 text-sm">Thematic/Sectoral Funds</td>
                      <td className="p-2">15% - 25%</td>
                      <td className="p-2">High</td>
                      <td className="p-2">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          High
                        </span>
                      </td>
                      <td className="p-2">Sector-specific investors</td>
                    </tr>
                    <tr className="border-b border-red-50 hover:bg-red-50">
                      <td className="p-2 text-sm">Direct Equity Trading</td>
                      <td className="p-2">Variable</td>
                      <td className="p-2">Very High</td>
                      <td className="p-2">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          High
                        </span>
                      </td>
                      <td className="p-2">Active investors, regular monitoring</td>
                    </tr>
                    <tr className="border-b border-red-50 hover:bg-red-50">
                      <td className="p-2 text-sm">Derivatives (F&O)</td>
                      <td className="p-2">20% - 100%+</td>
                      <td className="p-2">Very High</td>
                      <td className="p-2">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          Very High
                        </span>
                      </td>
                      <td className="p-2">Expert traders, hedging</td>
                    </tr>
                    <tr className="border-b border-red-50 hover:bg-red-50">
                      <td className="p-2 text-sm">Commodities</td>
                      <td className="p-2">15% - 30%</td>
                      <td className="p-2">High</td>
                      <td className="p-2">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          High
                        </span>
                      </td>
                      <td className="p-2">Inflation hedge, traders</td>
                    </tr>
                    <tr className="border-b border-red-50 hover:bg-red-50">
                      <td className="p-2 text-sm">Cryptocurrencies</td>
                      <td className="p-2">Highly Variable</td>
                      <td className="p-2">High</td>
                      <td className="p-2">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          Extremely High
                        </span>
                      </td>
                      <td className="p-2">Risk-tolerant tech enthusiasts</td>
                    </tr>
                    <tr className="border-b border-red-50 hover:bg-red-50">
                      <td className="p-2 text-sm">PMS (Portfolio Management)</td>
                      <td className="p-2">12% - 20%</td>
                      <td className="p-2">Moderate</td>
                      <td className="p-2">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          High
                        </span>
                      </td>
                      <td className="p-2">HNIs seeking professional management</td>
                    </tr>
                    <tr className="hover:bg-red-50">
                      <td className="p-2 text-sm">Startup / Angel Investing</td>
                      <td className="p-2">25% - 100%+</td>
                      <td className="p-2">Very Low</td>
                      <td className="p-2">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          Extremely High
                        </span>
                      </td>
                      <td className="p-2">Experienced investors, network builders</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm bg-red-100 text-red-800 mt-3 font-bold py-2 px-3 rounded-md inline-block">Expected returns: 10% - 25%+ (high volatility)</p>
            </div>
            
            {/* Alternative Investments Card */}
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center mr-2">
                  <span className="material-icons text-sm">lightbulb</span>
                </span>
                <h3 className="text-purple-800 font-semibold text-lg">Alternative Investments</h3>
              </div>
              <p className="text-sm mb-3"><span className="font-bold text-purple-800">Goal:</span> <span className="text-black">Diversify your portfolio with these less conventional options.</span></p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-xs mb-3">
                  <thead className="bg-purple-100">
                    <tr>
                      <th className="p-2 text-left border-b border-purple-200 text-sm">Investment Option</th>
                      <th className="p-2 text-left border-b border-purple-200 text-sm">Expected Returns</th>
                      <th className="p-2 text-left border-b border-purple-200 text-sm">Liquidity</th>
                      <th className="p-2 text-left border-b border-purple-200 text-sm">Risk Level</th>
                      <th className="p-2 text-left border-b border-purple-200 text-sm">Ideal For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-purple-50 hover:bg-purple-50">
                      <td className="p-2 text-sm">Digital Gold</td>
                      <td className="p-2">6% - 9%</td>
                      <td className="p-2">High</td>
                      <td className="p-2">
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                          Moderate
                        </span>
                      </td>
                      <td className="p-2">Gold enthusiasts seeking digital convenience</td>
                    </tr>
                    <tr className="border-b border-purple-50 hover:bg-purple-50">
                      <td className="p-2 text-sm">ULIPs</td>
                      <td className="p-2">6% - 10%</td>
                      <td className="p-2">Low</td>
                      <td className="p-2">
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                          Moderate
                        </span>
                      </td>
                      <td className="p-2">Insurance + investment combo seekers</td>
                    </tr>
                    <tr className="border-b border-purple-50 hover:bg-purple-50">
                      <td className="p-2 text-sm">Real Estate (Direct)</td>
                      <td className="p-2">6% - 12%</td>
                      <td className="p-2">Very Low</td>
                      <td className="p-2">
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                          Moderate-High
                        </span>
                      </td>
                      <td className="p-2">Long-term investors, inflation hedge</td>
                    </tr>
                    <tr className="border-b border-purple-50 hover:bg-purple-50">
                      <td className="p-2 text-sm">Crypto investments</td>
                      <td className="p-2">Highly Variable</td>
                      <td className="p-2">High</td>
                      <td className="p-2">
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                          Extremely High
                        </span>
                      </td>
                      <td className="p-2">Risk-tolerant tech enthusiasts</td>
                    </tr>
                    <tr className="border-b border-purple-50 hover:bg-purple-50">
                      <td className="p-2 text-sm">P2P Lending</td>
                      <td className="p-2">10% - 15%</td>
                      <td className="p-2">Low-Moderate</td>
                      <td className="p-2">
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                          High
                        </span>
                      </td>
                      <td className="p-2">Income-focused risk tolerant investors</td>
                    </tr>
                    <tr className="border-b border-purple-50 hover:bg-purple-50">
                      <td className="p-2 text-sm">International Funds</td>
                      <td className="p-2">8% - 14%</td>
                      <td className="p-2">High</td>
                      <td className="p-2">
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                          High
                        </span>
                      </td>
                      <td className="p-2">Geographic diversification seekers</td>
                    </tr>
                    <tr className="border-b border-purple-50 hover:bg-purple-50">
                      <td className="p-2 text-sm">Art & Collectibles</td>
                      <td className="p-2">5% - 20%</td>
                      <td className="p-2">Very Low</td>
                      <td className="p-2">
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                          Moderate-High
                        </span>
                      </td>
                      <td className="p-2">Passion investors, wealth preservation</td>
                    </tr>
                    <tr className="border-b border-purple-50 hover:bg-purple-50">
                      <td className="p-2 text-sm">Fractional Ownership</td>
                      <td className="p-2">8% - 15%</td>
                      <td className="p-2">Low-Moderate</td>
                      <td className="p-2">
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                          Moderate
                        </span>
                      </td>
                      <td className="p-2">Smaller investors seeking premium assets</td>
                    </tr>
                    <tr className="hover:bg-purple-50">
                      <td className="p-2 text-sm">Structured Products</td>
                      <td className="p-2">8% - 12%</td>
                      <td className="p-2">Low</td>
                      <td className="p-2">
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                          Moderate-High
                        </span>
                      </td>
                      <td className="p-2">Sophisticated investors seeking customization</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm bg-purple-100 text-purple-800 mt-3 font-bold py-2 px-3 rounded-md inline-block">Expected returns: Highly variable (5% - 20%+ depending on type)</p>
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
                  <th className="border p-3 text-left text-sm">Investor Type</th>
                  <th className="border p-3 text-left text-sm">Ideal Investment Options</th>
                  <th className="border p-3 text-left text-sm">Allocation Strategy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3 bg-blue-50 text-sm">Conservative</td>
                  <td className="border p-3">Index Funds, Bank FDs, PPF, Debt Funds, Govt. Bonds</td>
                  <td className="border p-3">20% Equity, 70% Debt, 10% Gold/Alternative</td>
                </tr>
                <tr>
                  <td className="border p-3 bg-green-50 text-sm">Moderate</td>
                  <td className="border p-3">Large-Cap Funds, Corporate Bonds, Balanced Funds</td>
                  <td className="border p-3">50% Equity, 40% Debt, 10% Gold/Alternative</td>
                </tr>
                <tr>
                  <td className="border p-3 bg-amber-50 text-sm">Aggressive</td>
                  <td className="border p-3">Mid/Small Cap Funds, Sectoral Funds, International Equities</td>
                  <td className="border p-3">70% Equity, 20% Debt, 10% Gold/Alternative</td>
                </tr>
                <tr>
                  <td className="border p-3 bg-purple-50 text-sm">Young Investors (20-35)</td>
                  <td className="border p-3">Index Funds, Mid-Cap Equity, Aggressive Hybrid Funds</td>
                  <td className="border p-3">70-80% Equity, 10-20% Debt, 5-10% Alternatives</td>
                </tr>
                <tr>
                  <td className="border p-3 bg-teal-50 text-sm">Middle Age (35-50)</td>
                  <td className="border p-3">Balanced Mix of Large-Cap Equity, Corporate Bonds, REITs</td>
                  <td className="border p-3">50-60% Equity, 30-40% Debt, 5-10% Alternatives</td>
                </tr>
                <tr>
                  <td className="border p-3 bg-rose-50 text-sm">Near Retirement (50+)</td>
                  <td className="border p-3">Fixed Deposits, Govt. Securities, Senior Citizen Savings</td>
                  <td className="border p-3">20-30% Equity, 60-70% Debt, 5-10% Gold</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Comprehensive Investment Strategy Card */}
      <Card className="mt-6 shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="material-icons mr-2 text-blue-500">auto_graph</span>
            Comprehensive Investment Strategy
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse shadow-sm border border-gray-100">
              <thead style={{ backgroundColor: '#A8F4A8' }}>
                <tr>
                  <th className="p-3 text-left font-semibold text-sm">Financial Goal</th>
                  <th className="p-3 text-left font-semibold text-sm">Ideal Investment Instruments</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-3 font-semibold text-sm" style={{ backgroundColor: '#DFFBDE', width: '30%' }}>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🕒</span> 
                      <span>Short-Term Goals</span>
                    </div>
                    <div className="text-xs text-xs text-gray-600 mt-1">1–3 years</div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">Fixed Deposits (FDs)</span>
                          <span className="text-xs text-xs text-gray-600"> – Stable returns, high liquidity</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">Liquid Mutual Funds</span>
                          <span className="text-xs text-gray-600"> – Ideal for emergency buffers</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">Arbitrage Funds</span>
                          <span className="text-xs text-gray-600"> – Low-risk, tax-efficient</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-200 bg-white">
                  <td className="p-4 font-semibold text-base bg-green-50">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🚀</span> 
                      <span>Long-Term Growth</span>
                    </div>
                    <div className="text-sm text-xs text-gray-600 mt-1">5+ years</div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">Equity Mutual Funds</span>
                          <span className="text-xs text-gray-600"> – Wealth compounding</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">ETFs / Index Funds</span>
                          <span className="text-xs text-gray-600"> – Low-cost, diversified</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">NPS</span>
                          <span className="text-xs text-gray-600"> – Long-term disciplined savings</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-base bg-green-50">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">👵</span> 
                      <span>Retirement Planning</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">NPS (Tier I)</span>
                          <span className="text-xs text-gray-600"> – Pension-focused, tax-efficient</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">PPF</span>
                          <span className="text-xs text-gray-600"> – Long-term tax-free savings</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">EPF/VPF</span>
                          <span className="text-xs text-gray-600"> – For salaried employees</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-200 bg-white">
                  <td className="p-4 font-semibold text-base bg-green-50">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">💰</span> 
                      <span>Tax Saving</span>
                    </div>
                    <div className="text-sm text-xs text-gray-600 mt-1">Under 80C</div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">PPF, ELSS, EPF, NSC, NPS, Tax-saving FDs</span>
                          <span className="text-xs text-gray-600"> – All eligible for deduction under Section 80C</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-base bg-green-50">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">💼</span> 
                      <span>Wealth Creation</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">Mid-cap & Small-cap Mutual Funds</span>
                          <span className="text-xs text-gray-600"> – High-risk, high-return</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">Thematic Funds & Stocks</span>
                          <span className="text-xs text-gray-600"> – Sector-specific growth</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">Direct Equity</span>
                          <span className="text-xs text-gray-600"> – Requires research and discipline</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-200 bg-white">
                  <td className="p-4 font-semibold text-base bg-green-50">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">📈</span> 
                      <span>Inflation Hedging</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">Sovereign Gold Bonds (SGBs)</span>
                          <span className="text-xs text-gray-600"> – Inflation hedge + 2.5% interest</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">Gold ETFs/Digital Gold</span>
                          <span className="text-xs text-gray-600"> – Market-linked</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">REITs</span>
                          <span className="text-xs text-gray-600"> – Asset-backed inflation protection</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-base bg-green-50">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🏥</span> 
                      <span>Emergency Fund</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">Savings Account</span>
                          <span className="text-xs text-gray-600"> – High liquidity</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">Liquid Funds / Overnight Funds</span>
                          <span className="text-xs text-gray-600"> – Better returns than savings</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">Sweep-in FDs</span>
                          <span className="text-xs text-gray-600"> – Auto flexibility between FD and savings</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-200 bg-white">
                  <td className="p-4 font-semibold text-base bg-green-50">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🎓</span> 
                      <span>Child's Education</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">Child Plans (ULIP/Mutual Fund)</span>
                          <span className="text-xs text-gray-600"> – Long-term, goal-oriented</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">Sukanya Samriddhi Yojana</span>
                          <span className="text-xs text-gray-600"> – Tax-free returns (for girls)</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">PPF</span>
                          <span className="text-xs text-gray-600"> – Safe & long-term</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-base bg-green-50">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🏠</span> 
                      <span>Home Purchase</span>
                    </div>
                    <div className="text-sm text-xs text-gray-600 mt-1">3–7 years</div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">Recurring Deposits</span>
                          <span className="text-xs text-gray-600"> – Monthly discipline</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">Hybrid Mutual Funds</span>
                          <span className="text-xs text-gray-600"> – Balanced growth</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        <div>
                          <span className="text-sm">Short Duration Debt Funds</span>
                          <span className="text-xs text-gray-600"> – Moderate returns with lower volatility</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-xs text-gray-600 mt-4 p-2 bg-green-50 rounded border border-green-100 shadow-sm">
            <span className="font-bold">Note:</span> This strategy guide matches financial goals with ideal investment instruments. The right combination depends on your age, risk tolerance, and specific goals. For personalized advice, consult a financial advisor.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6 shadow-md">
        <CardContent className="p-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 shadow-sm">
            <h4 className="text-sm font-medium flex items-center mb-2 text-blue-700">
              <span className="text-lg mr-2">💡</span>
              Key Investment Takeaways
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start">
                <span className="text-blue-500 mr-1.5 mt-0.5">•</span>
                <p className="text-xs">
                  <span className="font-medium text-blue-700">Diversify across asset classes</span> - Never put all your money in one type of investment.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-1.5 mt-0.5">•</span>
                <p className="text-xs">
                  <span className="font-medium text-blue-700">Match investments to time horizon</span> - Short: low-risk; Long: higher equity.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-1.5 mt-0.5">•</span>
                <p className="text-xs">
                  <span className="font-medium text-blue-700">Start early and invest regularly</span> - Compounding works over long periods.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-1.5 mt-0.5">•</span>
                <p className="text-xs">
                  <span className="font-medium text-blue-700">Review and rebalance yearly</span> - Ensure alignment with current goals.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}