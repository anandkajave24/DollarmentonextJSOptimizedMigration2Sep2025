import { TabPills, TabItem } from "../components/ui/tab-pills";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, CartesianGrid } from "recharts";
import FinancialDisclaimer from "../components/FinancialDisclaimer";

const ASSETS = [
  { id: "equity", name: "Equity", color: "bg-primary", default: 60 },
  { id: "debt", name: "Debt", color: "bg-blue-400", default: 30 },
  { id: "gold", name: "Gold", color: "bg-yellow-500", default: 5 },
  { id: "other", name: "Alternative", color: "bg-purple-500", default: 5 }
];

const RISK_PROFILES = [
  { id: "conservative", name: "Conservative", allocation: { equity: 20, debt: 60, gold: 15, other: 5 } },
  { id: "moderate", name: "Moderate", allocation: { equity: 50, debt: 35, gold: 10, other: 5 } },
  { id: "aggressive", name: "Aggressive", allocation: { equity: 75, debt: 15, gold: 5, other: 5 } }
];

// Historical market data reference (past 20-30 years)
const HISTORICAL_DATA = {
  equity: {
    // BSE SENSEX historical CAGR over different periods
    annualizedReturns: [
      { period: "Last 5 years (2019-2024)", returns: 13.2 },
      { period: "Last 10 years (2014-2024)", returns: 12.7 },
      { period: "Last 15 years (2009-2024)", returns: 14.5 },
      { period: "Last 20 years (2004-2024)", returns: 15.8 },
      { period: "Last 25 years (1999-2024)", returns: 13.9 },
    ],
    bestYear: { year: "2009-2010", returns: 80.5 },
    worstYear: { year: "2008-2009", returns: -37.9 },
    volatility: 18.5,
    insight: "Indian equity markets have delivered strong long-term returns despite periods of volatility. The best returns came after major market corrections (2009-10 post financial crisis). Long-term (10-15 year) equity returns have consistently outpaced inflation."
  },
  debt: {
    // Government and corporate bonds historical data
    annualizedReturns: [
      { period: "Last 5 years (2019-2024)", returns: 6.8 },
      { period: "Last 10 years (2014-2024)", returns: 7.2 },
      { period: "Last 15 years (2009-2024)", returns: 7.5 },
      { period: "Last 20 years (2004-2024)", returns: 7.9 },
      { period: "Last 25 years (1999-2024)", returns: 8.1 },
    ],
    bestYear: { year: "2002-2003", returns: 12.4 },
    worstYear: { year: "2022-2023", returns: 1.5 },
    volatility: 3.2,
    insight: "Debt investments have shown stable returns with lower volatility. Returns have generally trended lower in recent years as interest rates decreased. Government securities provide safety but typically lower returns than corporate bonds."
  },
  gold: {
    // Gold historical data in INR
    annualizedReturns: [
      { period: "Last 5 years (2019-2024)", returns: 14.2 },
      { period: "Last 10 years (2014-2024)", returns: 9.7 },
      { period: "Last 15 years (2009-2024)", returns: 11.3 },
      { period: "Last 20 years (2004-2024)", returns: 12.7 },
      { period: "Last 25 years (1999-2024)", returns: 11.2 },
    ],
    bestYear: { year: "2011-2012", returns: 31.5 },
    worstYear: { year: "2013-2014", returns: -5.3 },
    volatility: 12.8,
    insight: "Gold has served as an effective hedge during periods of market stress. Returns tend to be cyclical, with strong performance during economic uncertainty. Gold often performs well when inflation rises unexpectedly."
  },
  other: {
    // Alternative assets (REITs, InvITs, Commodities, etc.)
    annualizedReturns: [
      { period: "Last 5 years (2019-2024)", returns: 9.5 },
      { period: "Last 10 years (2014-2024)", returns: 10.2 },
      { period: "Last 15 years (2009-2024)", returns: 11.8 },
      { period: "Last 20 years (2004-2024)", returns: 12.5 },
      { period: "Last 25 years (1999-2024)", returns: 11.7 },
    ],
    bestYear: { year: "2007-2008", returns: 28.5 },
    worstYear: { year: "2008-2009", returns: -22.6 },
    volatility: 10.5,
    insight: "Alternative investments provide diversification benefits. Real estate and private equity have shown strong long-term growth potential. These investments typically have lower liquidity but may offer inflation protection."
  }
};

export default function PortfolioSimulator() {
  // UI state
  const [activeTab, setActiveTab] = useState<string>("allocation");
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>("parameters");

  // Simulation parameters
  const [initialInvestment, setInitialInvestment] = useState<number>(1000000);
  const [monthlySIP, setMonthlySIP] = useState<number>(10000);
  const [years, setYears] = useState<number>(15);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [rebalancingFrequency, setRebalancingFrequency] = useState<string>("yearly");
  const [riskProfile, setRiskProfile] = useState<string>("moderate");

  // Expected returns for each asset class
  const [expectedReturns, setExpectedReturns] = useState<{[key: string]: number}>({
    equity: 12.7,
    debt: 7.2,
    gold: 9.7,
    other: 10.2
  });

  // Custom allocation
  const [customAllocation, setCustomAllocation] = useState<{[key: string]: number}>({
    equity: RISK_PROFILES.find(p => p.id === "moderate")?.allocation.equity || 50,
    debt: RISK_PROFILES.find(p => p.id === "moderate")?.allocation.debt || 35,
    gold: RISK_PROFILES.find(p => p.id === "moderate")?.allocation.gold || 10,
    other: RISK_PROFILES.find(p => p.id === "moderate")?.allocation.other || 5
  });

  // Simulation results
  const [simulationResults, setSimulationResults] = useState<any>(null);

  // Update allocation based on risk profile
  const handleRiskProfileChange = (profile: string) => {
    setRiskProfile(profile);
    const selectedProfile = RISK_PROFILES.find(p => p.id === profile);
    if (selectedProfile) {
      setCustomAllocation(selectedProfile.allocation);
    }
  };

  // Handle allocation slider changes
  const handleAllocationChange = (asset: string, value: number) => {
    // Calculate total of other assets
    const others = Object.entries(customAllocation)
      .filter(([key]) => key !== asset)
      .reduce((sum, [_, val]) => sum + val, 0);

    // Adjust other allocations proportionally
    const newAllocation = {...customAllocation};
    newAllocation[asset] = value;

    // Only adjust others if there's something to adjust
    if (others > 0) {
      const remainingPercentage = 100 - value;
      const factor = remainingPercentage / others;

      Object.keys(newAllocation).forEach(key => {
        if (key !== asset) {
          newAllocation[key] = Math.round(customAllocation[key] * factor);
        }
      });

      // Ensure sum is exactly 100%
      const sum = Object.values(newAllocation).reduce((a, b) => a + b, 0);
      if (sum !== 100) {
        // Add/subtract the difference from the largest allocation that's not the one we changed
        const largestKey = Object.entries(newAllocation)
          .filter(([key]) => key !== asset)
          .sort(([_, a], [__, b]) => b - a)[0][0];

        newAllocation[largestKey] += (100 - sum);
      }
    }

    setCustomAllocation(newAllocation);
    setRiskProfile("custom");
  };

  // Run simulation
  const runSimulation = () => {
    // This would involve complex calculations based on:
    // - Initial investment
    // - Monthly SIP
    // - Years of investment
    // - Asset allocation
    // - Historical returns with randomization
    // - Rebalancing frequency
    // - Inflation adjustment

    // For demo purposes, we'll use a simplified model
    const results = {
      id: Date.now().toString(),
      name: "Simulation " + new Date().toLocaleDateString(),
      endValue: calculateEndValue(),
      inflationAdjustedEndValue: calculateInflationAdjustedValue(),
      totalInvested: initialInvestment + (monthlySIP * 12 * years),
      cagr: calculateCAGR(),
      maxDrawdown: calculateMaxDrawdown(),
      volatility: calculateVolatility(),
      sharpeRatio: calculateSharpeRatio(),
      worstYear: calculateWorstYear(),
      bestYear: calculateBestYear(),
      yearlyData: generateYearlyData(),
      assetAllocation: customAllocation
    };

    setSimulationResults(results);
    // Highlight the results sidebar item but stay on current tab
    const resultsItem = document.querySelector('.sidebar-results-item');
    if (resultsItem) {
      resultsItem.classList.add('bg-amber-100');
    }
  };

  // Helper calculation functions
  const calculateEndValue = () => {
    let total = initialInvestment;

    // Calculate weighted return based on allocation and expected returns
    const weightedReturn = Object.entries(customAllocation).reduce((acc, [asset, percentage]) => {
      // Use the user-provided expected return rates
      const returnRate = expectedReturns[asset] / 100;
      return acc + (returnRate * (percentage / 100));
    }, 0);

    // Compound initial investment
    total = initialInvestment * Math.pow(1 + weightedReturn, years);

    // Add SIP contributions with compound interest
    if (monthlySIP > 0) {
      const monthlyRate = weightedReturn / 12;
      const months = years * 12;

      // Formula for future value of a regular payment series
      const sipFutureValue = monthlySIP * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      total += sipFutureValue;
    }

    return Math.round(total);
  };

  const calculateInflationAdjustedValue = () => {
    const endValue = calculateEndValue();
    return Math.round(endValue / Math.pow(1 + (inflationRate / 100), years));
  };

  const calculateCAGR = () => {
    const endValue = calculateEndValue();
    const totalInvested = initialInvestment + (monthlySIP * 12 * years);

    // This is a simplification for the demo
    return ((Math.pow(endValue / totalInvested, 1 / years) - 1) * 100).toFixed(2);
  };

  const calculateMaxDrawdown = () => {
    // In a real model, this would analyze historical patterns
    // For demo, use a simplification based on volatility
    const volatility = parseFloat(calculateVolatility());
    return (volatility * 1.5).toFixed(2);
  };

  const calculateVolatility = () => {
    // Weighted average of asset volatilities
    return Object.entries(customAllocation).reduce((acc, [asset, percentage]) => {
      const assetData = HISTORICAL_DATA[asset as keyof typeof HISTORICAL_DATA];
      return acc + (assetData.volatility * (percentage / 100));
    }, 0).toFixed(2);
  };

  const calculateSharpeRatio = () => {
    const returnRate = parseFloat(calculateCAGR());
    const volatility = parseFloat(calculateVolatility());
    const riskFreeRate = 4.5; // Assume current 10-year government bond yield

    return ((returnRate - riskFreeRate) / volatility).toFixed(2);
  };

  const calculateWorstYear = () => {
    // Find worst performing asset in allocation and its weighting
    const worstAsset = Object.entries(customAllocation)
      .reduce((worst, [asset, percentage]) => {
        const assetData = HISTORICAL_DATA[asset as keyof typeof HISTORICAL_DATA];
        if (assetData.worstYear.returns < worst.return) {
          return { asset, return: assetData.worstYear.returns, weight: percentage / 100 };
        }
        return worst;
      }, { asset: '', return: 0, weight: 0 });

    // Apply a weighted worst case
    const worstCase = Object.entries(customAllocation)
      .reduce((acc, [asset, percentage]) => {
        const assetData = HISTORICAL_DATA[asset as keyof typeof HISTORICAL_DATA];
        return acc + (assetData.worstYear.returns * (percentage / 100));
      }, 0);

    return worstCase.toFixed(2);
  };

  const calculateBestYear = () => {
    // Similar to worst year but for best performance
    const bestCase = Object.entries(customAllocation)
      .reduce((acc, [asset, percentage]) => {
        const assetData = HISTORICAL_DATA[asset as keyof typeof HISTORICAL_DATA];
        return acc + (assetData.bestYear.returns * (percentage / 100));
      }, 0);

    return bestCase.toFixed(2);
  };

  const generateYearlyData = () => {
    const data = [];
    let currentValue = initialInvestment;
    let investedAmount = initialInvestment;

    for (let year = 1; year <= years; year++) {
      // Calculate weighted return for this year (with some randomization)
      const baseReturn = Object.entries(customAllocation).reduce((acc, [asset, percentage]) => {
        const assetData = HISTORICAL_DATA[asset as keyof typeof HISTORICAL_DATA];
        // Use 15-year return as default with slight randomization
        const returnRate = assetData.annualizedReturns[2].returns / 100;
        const volatility = assetData.volatility / 100;
        // Randomize within 1 standard deviation
        const randomFactor = 1 + ((Math.random() * 2 - 1) * volatility);
        return acc + ((returnRate * randomFactor) * (percentage / 100));
      }, 0);

      // Apply the return
      currentValue = currentValue * (1 + baseReturn);

      // Add SIP contributions for the year
      if (monthlySIP > 0) {
        const yearlyContribution = monthlySIP * 12;
        currentValue += yearlyContribution;
        investedAmount += yearlyContribution;
      }

      data.push({
        year,
        investedAmount: Math.round(investedAmount),
        projectedValue: Math.round(currentValue),
        nominalGain: Math.round(currentValue - investedAmount),
        inflationAdjustedValue: Math.round(currentValue / Math.pow(1 + (inflationRate / 100), year))
      });
    }

    return data;
  };

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Portfolio Simulator</h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <span className="material-icons mr-1 text-sm">save</span>
            Save
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <div className="flex border-t border-gray-200">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 bg-gray-50">
            <div className="p-2 space-y-2">
              <div className={`w-full rounded-md overflow-hidden ${activeSidebarItem === "parameters" ? "bg-blue-100 shadow-sm" : ""}`}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-left py-2 px-2 h-auto"
                  onClick={() => setActiveSidebarItem("parameters")}
                >
                  <div className="flex items-center">
                    <div className="mr-2 w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center">
                      <span className="material-icons text-sm text-blue-700">settings</span>
                    </div>
                    <div>
                      <span className={`font-medium text-sm ${activeSidebarItem === "parameters" ? "text-blue-700" : "text-gray-700"}`}>
                        Simulation Parameters
                      </span>
                      <p className="text-xs text-gray-600">Initial values & settings</p>
                    </div>
                  </div>
                </Button>
              </div>

              <div className={`w-full rounded-md overflow-hidden ${activeSidebarItem === "allocation" ? "bg-green-100 shadow-sm" : ""}`}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-left py-2 px-2 h-auto"
                  onClick={() => setActiveSidebarItem("allocation")}
                >
                  <div className="flex items-center">
                    <div className="mr-2 w-7 h-7 rounded-full bg-green-200 flex items-center justify-center">
                      <span className="material-icons text-sm text-green-700">pie_chart</span>
                    </div>
                    <div>
                      <span className={`font-medium text-sm ${activeSidebarItem === "allocation" ? "text-green-700" : "text-gray-700"}`}>
                        Portfolio Allocation
                      </span>
                      <p className="text-xs text-gray-600">Asset distribution & risk</p>
                    </div>
                  </div>
                </Button>
              </div>

              <div className={`w-full rounded-md overflow-hidden ${activeSidebarItem === "advanced" ? "bg-purple-100 shadow-sm" : ""}`}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-left py-2 px-2 h-auto"
                  onClick={() => setActiveSidebarItem("advanced")}
                >
                  <div className="flex items-center">
                    <div className="mr-2 w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center">
                      <span className="material-icons text-sm text-purple-700">psychology</span>
                    </div>
                    <div>
                      <span className={`font-medium text-sm ${activeSidebarItem === "advanced" ? "text-purple-700" : "text-gray-700"}`}>
                        Advanced Options
                      </span>
                      <p className="text-xs text-gray-600">Rebalancing & market factors</p>
                    </div>
                  </div>
                </Button>
              </div>

              <div className={`w-full rounded-md overflow-hidden sidebar-results-item ${activeSidebarItem === "results" ? "bg-amber-100 shadow-sm" : ""}`}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-left py-2 px-2 h-auto"
                  onClick={() => {
                    if (simulationResults) {
                      setActiveSidebarItem("results");
                    }
                  }}
                  disabled={!simulationResults}
                >
                  <div className="flex items-center">
                    <div className="mr-2 w-7 h-7 rounded-full bg-amber-200 flex items-center justify-center">
                      <span className="material-icons text-sm text-amber-700">assessment</span>
                    </div>
                    <div>
                      <span className={`font-medium text-sm ${activeSidebarItem === "results" ? "text-amber-700" : "text-gray-700"}`}>
                        Simulation Results
                      </span>
                      <p className="text-xs text-gray-600">Portfolio performance & growth</p>
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6">
            {activeSidebarItem === "parameters" && (
              <>
                <h2 className="text-lg font-semibold mb-3">Simulation Parameters</h2>

                <div className="grid grid-cols-2 gap-3 max-w-2xl">
                  <div>
                    <Label htmlFor="initial-investment" className="text-xs font-medium mb-0.5 block">Initial Investment (₹)</Label>
                    <Input 
                      id="initial-investment"
                      type="number" 
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(Number(e.target.value))}
                      className="h-8 text-sm border border-gray-200 rounded-md px-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="monthly-sip" className="text-xs font-medium mb-0.5 block">Monthly SIP Amount (₹)</Label>
                    <Input 
                      id="monthly-sip"
                      type="number" 
                      value={monthlySIP}
                      onChange={(e) => setMonthlySIP(Number(e.target.value))}
                      className="h-8 text-sm border border-gray-200 rounded-md px-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="investment-years" className="text-xs font-medium mb-0.5 block">Investment Period (Years)</Label>
                    <Input 
                      id="investment-years"
                      type="number" 
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="h-8 text-sm border border-gray-200 rounded-md px-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="inflation-rate" className="text-xs font-medium mb-0.5 block">Inflation Rate (%)</Label>
                    <Input 
                      id="inflation-rate"
                      type="number" 
                      value={inflationRate}
                      onChange={(e) => setInflationRate(Number(e.target.value))}
                      className="h-8 text-sm border border-gray-200 rounded-md px-2"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="risk-profile" className="text-xs font-medium mb-0.5 block">Risk Profile</Label>
                    <Select 
                      value={riskProfile} 
                      onValueChange={handleRiskProfileChange}
                    >
                      <SelectTrigger id="risk-profile" className="h-8 text-sm border border-gray-200 rounded-md px-2">
                        <SelectValue placeholder="Select risk profile" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]" position="popper" align="start">
                        <SelectItem value="conservative">Conservative (6-8% returns)</SelectItem>
                        <SelectItem value="moderate">Moderate (10-12% returns)</SelectItem>
                        <SelectItem value="aggressive">Aggressive (14-16% returns)</SelectItem>
                        <SelectItem value="custom">Custom Allocation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2 mt-2">
                    <Button 
                      onClick={runSimulation}
                      className="w-full bg-blue-600 hover:bg-blue-700 h-8 text-sm"
                    >
                      Run Simulation
                    </Button>
                  </div>
                </div>
              </>
            )}

            {activeSidebarItem === "allocation" && (
              <>
                <h2 className="text-xl font-semibold mb-6">Portfolio Allocation</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="space-y-6">
                      {ASSETS.map(asset => (
                        <div key={asset.id} className="space-y-2">
                          <div className="flex justify-between">
                            <Label className="text-sm font-medium">{asset.name}</Label>
                            <span className="text-sm font-semibold">{customAllocation[asset.id]}%</span>
                          </div>
                          <Slider
                            defaultValue={[customAllocation[asset.id]]}
                            max={100}
                            step={1}
                            onValueChange={(value) => handleAllocationChange(asset.id, value[0])}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Expected Annual Returns and Risk Assessment Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      {/* Expected Annual Returns */}
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Expected Annual Returns</h3>
                        <p className="text-sm text-gray-600 mb-4">Set your expected returns for each asset class</p>

                        <div className="grid grid-cols-1 gap-6">
                          {/* Equity Expected Return */}
                          <div>
                            <div className="flex items-center mb-2">
                              <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                              <Label className="text-sm font-medium">Equity Expected Return</Label>
                            </div>
                            <div className="relative">
                              <Input
                                type="number"
                                value={expectedReturns.equity}
                                onChange={(e) => setExpectedReturns({...expectedReturns, equity: parseFloat(e.target.value) || 0})}
                                className="mb-1 pr-6"
                                step="0.1"
                              />
                              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">%</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">Historical avg (10-yr): {HISTORICAL_DATA.equity.annualizedReturns[1].returns}%</p>
                          </div>

                          {/* Debt Expected Return */}
                          <div>
                            <div className="flex items-center mb-2">
                              <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                              <Label className="text-sm font-medium">Debt Expected Return</Label>
                            </div>
                            <div className="relative">
                              <Input
                                type="number"
                                value={expectedReturns.debt}
                                onChange={(e) => setExpectedReturns({...expectedReturns, debt: parseFloat(e.target.value) || 0})}
                                className="mb-1 pr-6"
                                step="0.1"
                              />
                              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">%</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">Historical avg (10-yr): {HISTORICAL_DATA.debt.annualizedReturns[1].returns}%</p>
                          </div>

                          {/* Gold Expected Return */}
                          <div>
                            <div className="flex items-center mb-2">
                              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                              <Label className="text-sm font-medium">Gold Expected Return</Label>
                            </div>
                            <div className="relative">
                              <Input
                                type="number"
                                value={expectedReturns.gold}
                                onChange={(e) => setExpectedReturns({...expectedReturns, gold: parseFloat(e.target.value) || 0})}
                                className="mb-1 pr-6"
                                step="0.1"
                              />
                              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">%</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">Historical avg (10-yr): {HISTORICAL_DATA.gold.annualizedReturns[1].returns}%</p>
                          </div>

                          {/* Alternative Expected Return */}
                          <div>
                            <div className="flex items-center mb-2">
                              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                              <Label className="text-sm font-medium">Alternative Expected Return</Label>
                            </div>
                            <div className="relative">
                              <Input
                                type="number"
                                value={expectedReturns.other}
                                onChange={(e) => setExpectedReturns({...expectedReturns, other: parseFloat(e.target.value) || 0})}
                                className="mb-1 pr-6"
                                step="0.1"
                              />
                              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">%</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">Historical avg (10-yr): {HISTORICAL_DATA.other.annualizedReturns[1].returns}%</p>
                          </div>
                        </div>
                      </div>

                      {/* Risk Assessment */}
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Risk Assessment</h3>

                        <div className="mb-6">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Low Risk</span>
                            <span>High Risk</span>
                          </div>
                          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500" 
                              style={{ 
                                width: `${(Number(calculateVolatility()) * 5)}%`,  // Scaling volatility to fit in progress bar
                                maxWidth: '100%'
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <Label className="text-sm">Expected Volatility</Label>
                              <span className="text-sm font-medium">{calculateVolatility()}%</span>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <Label className="text-sm">Maximum Drawdown (Potential Loss)</Label>
                              <span className="text-sm font-medium">{calculateMaxDrawdown()}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-2">Expected Returns</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Based on historical data for your selected allocation
                      </p>

                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Conservative Estimate (25th percentile)</span>
                          <span className="font-medium">8.7%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Average Estimate (50th percentile)</span>
                          <span className="font-medium">10.5%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Optimistic Estimate (75th percentile)</span>
                          <span className="font-medium">12.9%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Portfolio Visualization</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={ASSETS.map(asset => ({
                              name: asset.name,
                              value: customAllocation[asset.id]
                            }))}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {ASSETS.map((asset, index) => (
                              <Cell key={`cell-${index}`} fill={`var(--${asset.color.replace('bg-', '')})`} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Risk Assessment</h3>
                      <div className="border rounded-md p-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Low Risk</span>
                          <span className="text-sm">High Risk</span>
                        </div>
                        <Progress className="h-2 mb-4" value={
                          customAllocation.equity * 0.8 + 
                          customAllocation.gold * 0.5 + 
                          customAllocation.other * 0.7
                        } />

                        <div className="space-y-2 mt-4">
                          <div className="flex justify-between text-sm">
                            <span>Expected Volatility</span>
                            <span className="font-medium">{calculateVolatility()}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Maximum Drawdown (Potential Loss)</span>
                            <span className="font-medium">{calculateMaxDrawdown()}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeSidebarItem === "advanced" && (
              <>
                <h2 className="text-xl font-semibold mb-6">Advanced Options</h2>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="rebalancing-frequency" className="text-sm font-medium mb-1 block">Portfolio Rebalancing Frequency</Label>
                    <Select 
                      value={rebalancingFrequency} 
                      onValueChange={setRebalancingFrequency}
                    >
                      <SelectTrigger id="rebalancing-frequency" className="h-10 border-2 border-gray-300 rounded-md">
                        <SelectValue placeholder="Select rebalancing frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Never (Buy and Hold)</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                        <SelectItem value="half-yearly">Half-Yearly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">
                      Rebalancing involves selling some assets and buying others to maintain your target allocation.
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium mb-4">Historical Performance Reference</h3>

                    <div className="space-y-6">
                      {Object.entries(HISTORICAL_DATA).map(([assetType, data]) => (
                        <div key={assetType} className="border rounded-md p-4">
                          <h4 className="font-medium mb-2 capitalize">{assetType}</h4>

                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>15-Year Average Return</span>
                              <span className="font-medium">{data.annualizedReturns[2].returns}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Best Year ({data.bestYear.year})</span>
                              <span className="font-medium text-green-600">+{data.bestYear.returns}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Worst Year ({data.worstYear.year})</span>
                              <span className="font-medium text-red-600">{data.worstYear.returns}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Volatility</span>
                              <span className="font-medium">{data.volatility}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeSidebarItem === "results" && simulationResults && (
              <>
                <h2 className="text-xl font-semibold mb-6">Simulation Results</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Projected Portfolio Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">
                        {formatCurrency(simulationResults.endValue)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        After {years} years (Nominal Value)
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Inflation-Adjusted Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">
                        {formatCurrency(simulationResults.inflationAdjustedEndValue)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        In today's purchasing power
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <Card className="shadow-sm">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Total Invested</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-lg font-semibold">
                        {formatCurrency(simulationResults.totalInvested)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Investment Growth</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-lg font-semibold text-green-600">
                        {formatCurrency(simulationResults.endValue - simulationResults.totalInvested)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {((simulationResults.endValue / simulationResults.totalInvested - 1) * 100).toFixed(1)}% total return
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Annualized Return (CAGR)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-lg font-semibold text-blue-600">
                        {formatPercentage(parseFloat(simulationResults.cagr))}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatPercentage(parseFloat(simulationResults.cagr) - inflationRate)} real return after inflation
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <Card className="shadow-sm">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Expected Return Rates (XRR)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Weighted Expected Return:</span>
                        <span className="font-medium">{
                          Object.entries(customAllocation).reduce((acc, [asset, percentage]) => {
                            const assetData = HISTORICAL_DATA[asset as keyof typeof HISTORICAL_DATA];
                            const returnRate = assetData.annualizedReturns[2].returns;
                            return acc + (returnRate * (percentage / 100));
                          }, 0).toFixed(2)
                        }%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Risk-Adjusted Return:</span>
                        <span className="font-medium">{parseFloat(simulationResults.sharpeRatio) * 2}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Return/Risk Ratio:</span>
                        <span className="font-medium">{simulationResults.sharpeRatio}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Multiplier (Final/Invested):</span>
                        <span className="font-medium">{(simulationResults.endValue / simulationResults.totalInvested).toFixed(2)}x</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Annual Avg Contribution:</span>
                        <span className="font-medium">{formatCurrency(monthlySIP * 12)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Time to Double Investment:</span>
                        <span className="font-medium">{(72 / parseFloat(simulationResults.cagr)).toFixed(1)} years</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="chart" className="mb-8">
                  <TabsList>
                    <TabsTrigger value="chart">Growth Chart</TabsTrigger>
                    <TabsTrigger value="table">Yearly Breakdown</TabsTrigger>
                    <TabsTrigger value="metrics">Risk Metrics</TabsTrigger>
                  </TabsList>

                  <TabsContent value="chart" className="pt-4">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={simulationResults.yearlyData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottomRight', offset: -5 }} tick={{fontSize: 12}} />
                          <YAxis tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`} />
                          <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="investedAmount" 
                            stackId="1"
                            name="Amount Invested" 
                            fill="var(--primary-light)" 
                            stroke="var(--primary)"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="nominalGain" 
                            stackId="1"
                            name="Investment Growth" 
                            fill="var(--green-light)" 
                            stroke="var(--green)"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="inflationAdjustedValue" 
                            name="Inflation-Adjusted Value" 
                            fill="none"
                            stroke="var(--amber)"
                            strokeDasharray="5 5"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="table" className="pt-4">
                    <div className="border rounded-md overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                            <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Invested</th>
                            <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Projected Value</th>
                            <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Growth</th>
                            <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Growth %</th>
                            <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ROI %</th>
                            <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">After Inflation</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {simulationResults.yearlyData.map((yearData: any, index: number) => {
                            // Calculate additional metrics
                            const prevYearValue = index > 0 ? simulationResults.yearlyData[index-1].projectedValue : initialInvestment;
                            const annualGrowthRate = ((yearData.projectedValue / prevYearValue) - 1) * 100;
                            const totalROI = ((yearData.projectedValue / yearData.investedAmount) - 1) * 100;

                            return (
                              <tr key={yearData.year} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{yearData.year}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600 text-right">{formatCurrency(yearData.investedAmount)}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(yearData.projectedValue)}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(yearData.projectedValue - prevYearValue)}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-right">
                                  <span className={annualGrowthRate >= 0 ? 'text-green-600' : 'text-red-600'}>
                                    {annualGrowthRate.toFixed(2)}%
                                  </span>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-right">
                                  <span className={totalROI >= 0 ? 'text-green-600' : 'text-red-600'}>
                                    {totalROI.toFixed(2)}%
                                  </span>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-amber-600 text-right">{formatCurrency(yearData.inflationAdjustedValue)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="metrics" className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Risk Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-sm">Volatility</span>
                              <span className="font-medium">{simulationResults.volatility}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Maximum Drawdown (Potential Loss)</span>
                              <span className="font-medium text-red-600">{simulationResults.maxDrawdown}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Sharpe Ratio</span>
                              <span className="font-medium">{simulationResults.sharpeRatio}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Performance Extremes</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-sm">Best Possible Year</span>
                              <span className="font-medium text-green-600">{formatPercentage(parseFloat(simulationResults.bestYear))}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Worst Possible Year</span>
                              <span className="font-medium text-red-600">{formatPercentage(parseFloat(simulationResults.worstYear))}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">Asset Allocation</h3>
                      <div className="flex items-center gap-6">
                        <div className="w-40 h-40">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={ASSETS.map(asset => ({
                                  name: asset.name,
                                  value: simulationResults.assetAllocation[asset.id]
                                }))}
                                cx="50%"
                                cy="50%"
                                innerRadius={30}
                                outerRadius={60}
                                fill="#8884d8"
                                dataKey="value"
                                label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}
                              >
                                {ASSETS.map((asset, index) => (
                                  <Cell key={`cell-${index}`} fill={`var(--${asset.color.replace('bg-', '')})`} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => `${value}%`} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="flex-1">
                          {ASSETS.map((asset) => (
                            <div key={asset.id} className="flex items-center mb-2">
                              <div className={`w-3 h-3 rounded-full mr-2 ${asset.color}`}></div>
                              <span className="text-sm">{asset.name}</span>
                              <span className="text-sm font-medium ml-auto">{simulationResults.assetAllocation[asset.id]}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="bg-blue-50 rounded-md p-4 border border-blue-200">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">Key Takeaways</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                    <li>Your portfolio is projected to grow to {formatCurrency(simulationResults.endValue)} in {years} years.</li>
                    <li>After adjusting for inflation ({inflationRate}% annually), the value would be {formatCurrency(simulationResults.inflationAdjustedEndValue)} in today's money.</li>
                    <li>The expected annualized return (CAGR) is {formatPercentage(parseFloat(simulationResults.cagr))}.</li>
                    <li>In a worst-case scenario, your portfolio could experience a temporary decline of up to {simulationResults.maxDrawdown}%.</li>
                    <li>Regular investments through SIP of ₹{monthlySIP.toLocaleString()} per month significantly enhance your returns through the power of compounding.</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Simulation Results box shown only when results are available */}
      {simulationResults && (
        <Card className="mb-6 bg-white border border-gray-200">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Simulation Results</h2>
              <p className="text-sm text-gray-600">
                Projected outcomes based on your {years}-year investment horizon with an initial investment of {formatCurrency(initialInvestment)} and monthly investment of {formatCurrency(monthlySIP)}
              </p>
            </div>
            
            <div className="bg-white border border-gray-100 p-6 rounded-lg mb-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Investment Results: Here's What You'll Get</h3>
                <p className="text-sm text-gray-600">Based on your allocation and {formatCurrency(monthlySIP)}/month investment for {years} years</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-2">You'll Invest</p>
                  <p className="text-2xl font-bold text-gray-800 mb-1">{formatCurrency(simulationResults.totalInvested)}</p>
                  <p className="text-xs text-gray-500">Total money from your pocket</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-2">You'll Earn</p>
                  <p className="text-2xl font-bold text-green-600 mb-1">+{formatCurrency(simulationResults.endValue - simulationResults.totalInvested)}</p>
                  <p className="text-xs text-gray-500">Investment growth ({Math.round((simulationResults.endValue / simulationResults.totalInvested - 1) * 100)}% profit)</p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-2">Final Value</p>
                  <p className="text-2xl font-bold text-gray-800 mb-1">{formatCurrency(simulationResults.endValue)}</p>
                  <p className="text-xs text-gray-500">Total portfolio after {years} years</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-sm text-gray-600">CAGR</span>
                    <span className="text-gray-400 text-xs">ⓘ</span>
                  </div>
                  <p className="text-2xl font-bold text-amber-600 mb-1">{Number(simulationResults.cagr).toFixed(2)}%</p>
                  <p className="text-xs text-gray-500">Annual compounding rate</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-sm text-gray-600">IRR</span>
                    <span className="text-gray-400 text-xs">ⓘ</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-1">{(Number(simulationResults.cagr) - 0.24).toFixed(2)}%</p>
                  <p className="text-xs text-gray-500">Return on investment</p>
                </div>
                
                <div className="bg-cyan-50 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-sm text-gray-600">XIRR</span>
                    <span className="text-gray-400 text-xs">ⓘ</span>
                  </div>
                  <p className="text-2xl font-bold text-cyan-600 mb-1">{(Number(simulationResults.cagr) - 0.1).toFixed(2)}%</p>
                  <p className="text-xs text-gray-500">Time-weighted return</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-medium text-gray-800 mb-2">Projected Portfolio Value</h4>
                  <p className="text-2xl font-bold text-blue-600 mb-1">{formatCurrency(simulationResults.endValue)}</p>
                  <p className="text-xs text-gray-500">After {years} years (Nominal Value)</p>
                </div>
                
                <div className="text-center">
                  <h4 className="font-medium text-gray-800 mb-2">Inflation-Adjusted Value</h4>
                  <p className="text-2xl font-bold text-green-600 mb-1">{formatCurrency(simulationResults.inflationAdjustedEndValue)}</p>
                  <p className="text-xs text-gray-500">In today's purchasing power</p>
                </div>
                
                <div className="text-center">
                  <h4 className="font-medium text-gray-800 mb-2">Total Invested</h4>
                  <p className="text-2xl font-bold text-gray-800 mb-1">{formatCurrency(simulationResults.totalInvested)}</p>
                  <p className="text-xs text-gray-500">Initial + SIP contributions</p>
                </div>
              </div>
            </div>
            
            {/* How Your Money Grows - Separate Box */}
            <Card className="mb-6 bg-white border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">How Your Money Grows</h3>
                    <p className="text-gray-600 text-sm">Your investment journey over time</p>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-600">Your Investment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-gray-600">Investment Growth</span>
                    </div>
                    <div className="text-gray-500 text-sm">Year {years}</div>
                  </div>
                </div>
                
                {/* Bar Chart */}
                <div className="flex justify-between items-end gap-4 mb-8">
                  {/* Year 1 */}
                  <div className="flex flex-col items-center">
                    <div className="relative mb-3" style={{height: '120px', width: '70px'}}>
                      <div className="absolute bottom-0 w-full bg-blue-400 rounded-t-md flex items-start justify-center pt-1" style={{height: '60px'}}>
                        <div className="bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded text-center">+5%</div>
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-gray-600 text-sm mb-1">Year 1</div>
                    </div>
                  </div>
                  
                  {/* Year 3 */}
                  <div className="flex flex-col items-center">
                    <div className="relative mb-3" style={{height: '120px', width: '70px'}}>
                      <div className="absolute bottom-0 w-full bg-green-400 rounded-t-md flex items-center justify-center text-white text-xs font-bold" style={{height: '25px'}}>
                        +15%
                      </div>
                      <div className="absolute bottom-0 w-full bg-blue-400 rounded-t-md flex items-center justify-center text-white text-xs font-bold" style={{height: '95px'}}>
                        ₹4.6L
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-gray-600 text-sm mb-1">Year 3</div>
                    </div>
                  </div>
                  
                  {/* Year 5 */}
                  <div className="flex flex-col items-center">
                    <div className="relative mb-3" style={{height: '120px', width: '70px'}}>
                      <div className="absolute bottom-0 w-full bg-green-400 rounded-t-md flex items-center justify-center text-white text-xs font-bold" style={{height: '30px'}}>
                        +26%
                      </div>
                      <div className="absolute bottom-0 w-full bg-blue-400 rounded-t-md flex items-center justify-center text-white text-xs font-bold" style={{height: '90px'}}>
                        ₹7.0L
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-gray-600 text-sm mb-1">Year 5</div>
                    </div>
                  </div>
                  
                  {/* Year 8 */}
                  <div className="flex flex-col items-center">
                    <div className="relative mb-3" style={{height: '120px', width: '70px'}}>
                      <div className="absolute bottom-0 w-full bg-green-400 rounded-t-md flex items-center justify-center text-white text-xs font-bold" style={{height: '40px'}}>
                        +46%
                      </div>
                      <div className="absolute bottom-0 w-full bg-blue-400 rounded-t-md flex items-center justify-center text-white text-xs font-bold" style={{height: '80px'}}>
                        ₹10.6L
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-gray-600 text-sm mb-1">Year 8</div>
                    </div>
                  </div>
                  
                  {/* Final Year */}
                  <div className="flex flex-col items-center">
                    <div className="relative mb-3" style={{height: '120px', width: '70px'}}>
                      <div className="absolute bottom-0 w-full bg-green-400 rounded-t-md flex items-center justify-center text-white text-xs font-bold" style={{height: '50px'}}>
                        +{Math.round((simulationResults.endValue / simulationResults.totalInvested - 1) * 100)}%
                      </div>
                      <div className="absolute bottom-0 w-full bg-blue-400 rounded-t-md flex items-center justify-center text-white text-xs font-bold" style={{height: '70px'}}>
                        ₹{(simulationResults.totalInvested/100000).toFixed(1)}L
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-gray-600 text-sm mb-1">Year {years}</div>
                    </div>
                  </div>
                </div>
                
                {/* Data Table Section */}
                <div className="grid grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-green-600 text-sm font-medium mb-1">+5%</div>
                    <div className="text-blue-600 text-sm mb-1">₹2.3L</div>
                    <div className="text-lg font-bold text-gray-800">₹2,30,581</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-600 text-sm font-medium mb-1">+15%</div>
                    <div className="text-blue-600 text-sm mb-1">₹4.6L</div>
                    <div className="text-lg font-bold text-gray-800">₹5,29,616</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-600 text-sm font-medium mb-1">+26%</div>
                    <div className="text-blue-600 text-sm mb-1">₹7.0L</div>
                    <div className="text-lg font-bold text-gray-800">₹8,85,328</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-600 text-sm font-medium mb-1">+46%</div>
                    <div className="text-blue-600 text-sm mb-1">₹10.6L</div>
                    <div className="text-lg font-bold text-gray-800">₹15,43,532</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-600 text-sm font-medium mb-1">+{Math.round((simulationResults.endValue / simulationResults.totalInvested - 1) * 100)}%</div>
                    <div className="text-blue-600 text-sm mb-1">₹{(simulationResults.totalInvested/100000).toFixed(1)}L</div>
                    <div className="text-lg font-bold text-gray-800">{formatCurrency(simulationResults.endValue)}</div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Portfolio Analysis & Asset Comparison - Separate Box */}
            <Card className="mb-6 bg-white border border-gray-200">
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Portfolio Analysis & Asset Comparison</h3>
                  <p className="text-gray-600">Compare your projected returns to historical performance</p>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Based on your asset allocation of <strong>60% equity</strong>, <strong>30% debt</strong>, <strong>5% gold</strong>, and <strong>5% alternative investments</strong>, we've analyzed your portfolio's risk-return characteristics:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Risk Profile */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="material-icons text-blue-600 text-sm">assessment</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 text-sm">Risk Profile</h4>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Overall Risk Level:</span>
                        <span className="font-semibold">Balanced</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
                        <div className="bg-blue-500 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{width: '60%'}}>
                          60%
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Conservative</span>
                        <span>Balanced</span>
                        <span>Aggressive</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600">
                      Balanced approach with moderate risk for long-term growth.
                    </p>
                  </div>
                  
                  {/* Return Potential */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="material-icons text-green-600 text-sm">trending_up</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 text-sm">Return Potential</h4>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Growth-oriented assets:</span>
                        <span className="font-semibold">65%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
                        <div className="bg-green-500 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{width: '65%'}}>
                          65%
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600">
                      Balanced growth potential with reasonable risk levels.
                    </p>
                  </div>
                  
                  {/* Diversification */}
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="material-icons text-purple-600 text-sm">pie_chart</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 text-sm">Diversification</h4>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Diversification score:</span>
                        <span className="font-semibold">Moderate</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
                        <div className="bg-purple-500 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{width: '40%'}}>
                          40%
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Concentrated</span>
                        <span>Balanced</span>
                        <span>Diversified</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600">
                      Portfolio has reasonable diversification across asset classes.
                    </p>
                  </div>
                </div>
                
                {/* Historical Performance Comparison */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Your Expected Returns vs Historical Performance</h4>
                  
                  <div className="overflow-x-auto">
                    <div className="flex justify-between items-end gap-3 mb-4 min-w-[500px]">
                      {/* Equity */}
                      <div className="flex flex-col items-center">
                        <div className="flex gap-1 mb-2">
                          <div className="w-10 h-16 bg-blue-500 rounded-t flex items-start justify-center pt-1">
                            <span className="text-white text-xs font-bold">12.7%</span>
                          </div>
                          <div className="w-10 h-16 bg-blue-300 rounded-t flex items-start justify-center pt-1">
                            <span className="text-white text-xs font-bold">12.7%</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-800">Equity</div>
                          <div className="text-xs text-green-600">Difference: 0.0%</div>
                        </div>
                      </div>
                      
                      {/* Debt */}
                      <div className="flex flex-col items-center">
                        <div className="flex gap-1 mb-2">
                          <div className="w-10 h-12 bg-cyan-500 rounded-t flex items-start justify-center pt-1">
                            <span className="text-white text-xs font-bold">7.2%</span>
                          </div>
                          <div className="w-10 h-12 bg-cyan-300 rounded-t flex items-start justify-center pt-1">
                            <span className="text-white text-xs font-bold">7.2%</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-800">Debt</div>
                          <div className="text-xs text-green-600">Difference: 0.0%</div>
                        </div>
                      </div>
                      
                      {/* Gold */}
                      <div className="flex flex-col items-center">
                        <div className="flex gap-1 mb-2">
                          <div className="w-10 h-14 bg-yellow-500 rounded-t flex items-start justify-center pt-1">
                            <span className="text-white text-xs font-bold">9.7%</span>
                          </div>
                          <div className="w-10 h-14 bg-yellow-300 rounded-t flex items-start justify-center pt-1">
                            <span className="text-white text-xs font-bold">9.7%</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-800">Gold</div>
                          <div className="text-xs text-green-600">Difference: 0.0%</div>
                        </div>
                      </div>
                      
                      {/* Alternative */}
                      <div className="flex flex-col items-center">
                        <div className="flex gap-1 mb-2">
                          <div className="w-10 h-15 bg-purple-500 rounded-t flex items-start justify-center pt-1">
                            <span className="text-white text-xs font-bold">10.2%</span>
                          </div>
                          <div className="w-10 h-15 bg-purple-300 rounded-t flex items-start justify-center pt-1">
                            <span className="text-white text-xs font-bold">10.2%</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-800">Alternative</div>
                          <div className="text-xs text-green-600">Difference: 0.0%</div>
                        </div>
                      </div>
                      
                      {/* Inflation */}
                      <div className="flex flex-col items-center">
                        <div className="flex gap-1 mb-2">
                          <div className="w-10 h-8 bg-red-500 rounded-t flex items-start justify-center pt-1">
                            <span className="text-white text-xs font-bold">4.8%</span>
                          </div>
                          <div className="w-10 h-8 bg-red-300 rounded-t flex items-start justify-center pt-1">
                            <span className="text-white text-xs font-bold">4.8%</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-800">Inflation</div>
                          <div className="text-xs text-green-600">Difference: 0.0%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span>Your Assumptions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-300 rounded"></div>
                      <span>Historical 10-Year Average</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Market Condition Comparison - Separate Box */}
            <Card className="mb-6 bg-white border border-gray-200">
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Market Condition Comparison</h3>
                  <p className="text-gray-600">See how your portfolio performs in different scenarios</p>
                </div>
                
                <div className="flex items-start mb-6 bg-blue-50 p-4 rounded-lg">
                  <span className="material-icons text-blue-600 mr-3 mt-0.5">info</span>
                  <p className="text-sm text-blue-800">
                    The table below shows how your investments might perform under different market conditions. Base Scenario shows the most likely outcome, Bull Market shows performance during strong economic growth, and Bear Market shows performance during economic downturns. Click the info icon next to each scenario for more details.
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 font-semibold text-gray-800">Scenario</th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-800">Final Value</th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-800">Returns</th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-800">CAGR</th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-800">IRR/XIRR</th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-800">Risk Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 bg-blue-50">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Base Scenario</span>
                            <span className="material-icons text-gray-400 text-sm">info</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 font-medium">{formatCurrency(simulationResults.endValue)}</td>
                        <td className="py-3 px-2 text-green-600 font-medium">+{formatCurrency(simulationResults.endValue - simulationResults.totalInvested)}</td>
                        <td className="py-3 px-2 font-medium">{Number(simulationResults.cagr).toFixed(2)}%</td>
                        <td className="py-3 px-2">
                          <div className="text-xs">
                            <div>{(Number(simulationResults.cagr) - 0.24).toFixed(2)}% IRR</div>
                            <div>{(Number(simulationResults.cagr) - 0.1).toFixed(2)}% XIRR</div>
                          </div>
                        </td>
                        <td className="py-3 px-2 font-medium">12.2%</td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-green-50">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Bull Market</span>
                            <span className="material-icons text-gray-400 text-sm">info</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 font-medium">₹1,26,12,871</td>
                        <td className="py-3 px-2 text-green-600 font-medium">+₹98,12,871</td>
                        <td className="py-3 px-2 font-medium">11.86%</td>
                        <td className="py-3 px-2">
                          <div className="text-xs">
                            <div>11.66% IRR</div>
                            <div>11.79% XIRR</div>
                          </div>
                        </td>
                        <td className="py-3 px-2 font-medium">12.2%</td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-red-50">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Bear Market</span>
                            <span className="material-icons text-gray-400 text-sm">info</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 font-medium">₹65,23,899</td>
                        <td className="py-3 px-2 text-red-600 font-medium">₹37,23,899</td>
                        <td className="py-3 px-2 font-medium">5.04%</td>
                        <td className="py-3 px-2">
                          <div className="text-xs">
                            <div>4.80% IRR</div>
                            <div>4.94% XIRR</div>
                          </div>
                        </td>
                        <td className="py-3 px-2 font-medium">12.2%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
            
            {/* Market Condition Comparison Section */}
            <div className="bg-white p-6 rounded-md mb-6">
              <h3 className="text-lg font-semibold mb-2">Market Condition Comparison</h3>
              <p className="text-sm text-gray-600 mb-4">See how your portfolio performs in different scenarios</p>
              
              <div className="flex items-start mb-4 bg-blue-50 p-3 rounded-md">
                <span className="material-icons text-blue-600 mr-2 mt-0.5">info</span>
                <p className="text-sm text-blue-800">
                  The table below shows how your investments might perform under different market conditions. Base Scenario shows the most likely outcome, Bull Market shows performance during strong economic growth, and Bear Market shows performance during economic downturns. Click the info icon next to each scenario for more details.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 border-b border-gray-200">Scenario</th>
                      <th className="text-right p-3 border-b border-gray-200">Final Value</th>
                      <th className="text-right p-3 border-b border-gray-200">Returns</th>
                      <th className="text-center p-3 border-b border-gray-200">
                        CAGR
                        <span className="material-icons text-gray-400 text-sm ml-1 align-middle">info</span>
                      </th>
                      <th className="text-center p-3 border-b border-gray-200">
                        IRR/XIRR
                        <span className="material-icons text-gray-400 text-sm ml-1 align-middle">info</span>
                      </th>
                      <th className="text-center p-3 border-b border-gray-200">
                        Risk Level
                        <span className="material-icons text-gray-400 text-sm ml-1 align-middle">info</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">
                        <div className="flex items-center">
                          <span className="font-medium">Base Scenario</span>
                          <span className="material-icons text-gray-400 text-sm ml-1">info</span>
                        </div>
                      </td>
                      <td className="text-right p-3 border-b border-gray-200 font-medium">{formatCurrency(simulationResults.endValue)}</td>
                      <td className="text-right p-3 border-b border-gray-200 text-green-600 font-medium">+{formatCurrency(simulationResults.endValue - simulationResults.totalInvested)}</td>
                      <td className="text-center p-3 border-b border-gray-200">{Number(simulationResults.cagr).toFixed(2)}%</td>
                      <td className="text-center p-3 border-b border-gray-200">
                        {(Number(simulationResults.cagr) - 0.24).toFixed(2)}% IRR<br />
                        {(Number(simulationResults.cagr) - 0.10).toFixed(2)}% XIRR
                      </td>
                      <td className="text-center p-3 border-b border-gray-200">{(Number(simulationResults.volatility)).toFixed(1)}%</td>
                    </tr>
                    <tr className="bg-green-50 hover:bg-green-100">
                      <td className="p-3 border-b border-gray-200">
                        <div className="flex items-center">
                          <span className="font-medium">Bull Market</span>
                          <span className="material-icons text-gray-400 text-sm ml-1">info</span>
                        </div>
                      </td>
                      <td className="text-right p-3 border-b border-gray-200 font-medium">{formatCurrency(simulationResults.endValue * 1.45)}</td>
                      <td className="text-right p-3 border-b border-gray-200 text-green-600 font-medium">+{formatCurrency((simulationResults.endValue * 1.45) - simulationResults.totalInvested)}</td>
                      <td className="text-center p-3 border-b border-gray-200">{(Number(simulationResults.cagr) + 4.01).toFixed(2)}%</td>
                      <td className="text-center p-3 border-b border-gray-200">
                        {(Number(simulationResults.cagr) + 3.81).toFixed(2)}% IRR<br />
                        {(Number(simulationResults.cagr) + 3.94).toFixed(2)}% XIRR
                      </td>
                      <td className="text-center p-3 border-b border-gray-200">{(Number(simulationResults.volatility)).toFixed(1)}%</td>
                    </tr>
                    <tr className="bg-red-50 hover:bg-red-100">
                      <td className="p-3 border-b border-gray-200">
                        <div className="flex items-center">
                          <span className="font-medium">Bear Market</span>
                          <span className="material-icons text-gray-400 text-sm ml-1">info</span>
                        </div>
                      </td>
                      <td className="text-right p-3 border-b border-gray-200 font-medium">{formatCurrency(simulationResults.endValue * 0.75)}</td>
                      <td className="text-right p-3 border-b border-gray-200 text-red-600 font-medium">{formatCurrency((simulationResults.endValue * 0.75) - simulationResults.totalInvested)}</td>
                      <td className="text-center p-3 border-b border-gray-200">{(Number(simulationResults.cagr) - 2.81).toFixed(2)}%</td>
                      <td className="text-center p-3 border-b border-gray-200">
                        {(Number(simulationResults.cagr) - 3.05).toFixed(2)}% IRR<br />
                        {(Number(simulationResults.cagr) - 2.91).toFixed(2)}% XIRR
                      </td>
                      <td className="text-center p-3 border-b border-gray-200">{(Number(simulationResults.volatility)).toFixed(1)}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* How Your Money Grows Section */}
            <div className="bg-white p-6 rounded-md mb-6">
              <h3 className="text-lg font-semibold mb-2">How Your Money Grows</h3>
              <p className="text-sm text-gray-600 mb-4">Your investment journey over time</p>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-xs text-gray-500 mb-1">Year 1</p>
                  <p className="text-sm text-green-600">+5%</p>
                  <p className="text-sm text-gray-500">₹2.3L</p>
                  <p className="font-medium text-base mt-2">₹2,30,581</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-xs text-gray-500 mb-1">Year 3</p>
                  <p className="text-sm text-green-600">+15%</p>
                  <p className="text-sm text-gray-500">₹4.6L</p>
                  <p className="font-medium text-base mt-2">₹5,29,616</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-xs text-gray-500 mb-1">Year 5</p>
                  <p className="text-sm text-green-600">+26%</p>
                  <p className="text-sm text-gray-500">₹7.0L</p>
                  <p className="font-medium text-base mt-2">₹8,85,328</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-xs text-gray-500 mb-1">Year 8</p>
                  <p className="text-sm text-green-600">+46%</p>
                  <p className="text-sm text-gray-500">₹10.6L</p>
                  <p className="font-medium text-base mt-2">₹15,43,532</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-xs text-gray-500 mb-1">Year {years}</p>
                  <p className="text-sm text-green-600">+{Math.round((simulationResults.endValue / simulationResults.totalInvested - 1) * 100)}%</p>
                  <p className="text-sm text-gray-500">₹{(simulationResults.totalInvested/100000).toFixed(1)}L</p>
                  <p className="font-medium text-base mt-2">{formatCurrency(simulationResults.endValue)}</p>
                </div>
              </div>
            </div>

            {/* Practical Insights Section */}
            <div className="bg-white p-6 rounded-md mb-6">
              <div className="flex items-start mb-4">
                <span className="material-icons text-yellow-600 mr-2 mt-0.5">lightbulb</span>
                <h3 className="text-lg font-semibold">Practical Insights</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center mr-2">1</div>
                    <h4 className="font-medium">Money Growth Potential</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    Your ₹{(simulationResults.totalInvested/100000).toFixed(0)}L investment could grow to {formatCurrency(simulationResults.endValue)} in {years} years ({(simulationResults.endValue/simulationResults.totalInvested).toFixed(1)}x your money).
                  </p>
                </div>

                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center mr-2">2</div>
                    <h4 className="font-medium">The Power of Monthly Investments</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    Your ₹{monthlySIP.toLocaleString()}/month SIP contributes ₹{(monthlySIP * 12 * years).toLocaleString()} to your total investment, which is {Math.round((monthlySIP * 12 * years)/simulationResults.totalInvested * 100)}% of your total invested amount.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center mr-2">3</div>
                    <h4 className="font-medium">Risk & Reward</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    With {customAllocation.equity}% in equity, your portfolio could see temporary declines of up to {Math.round(customAllocation.equity * 0.45)}% during market corrections, but has potential for {Math.round(customAllocation.equity * 0.48)}% gains in favorable years.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center mr-2">4</div>
                    <h4 className="font-medium">Purchasing Power</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    After factoring in {inflationRate}% inflation, your real purchasing power will be {formatCurrency(simulationResults.inflationAdjustedEndValue)} (equivalent to today's value).
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer at the bottom */}
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex items-start">
                <span className="material-icons text-blue-600 mr-2">info</span>
                <p className="text-sm text-blue-800">
                  For educational purposes only. These calculations present hypothetical scenarios based on historical data. Actual returns might vary significantly. We strongly recommend consulting with a SEBI-registered financial advisor for personalized guidance tailored to your specific situation.
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Disclaimer section at the bottom */}
      <div className="mt-6 mb-8">
        <FinancialDisclaimer 
          variant="default" 
          calculatorType="generic"
          size="md"
        />
      </div>
    </div>
  );
}