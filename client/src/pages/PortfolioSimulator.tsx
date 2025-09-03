"use client"

import { TabPills, TabItem } from "../components/ui/tab-pills";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { SEO } from "../components/SEO";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, CartesianGrid } from "recharts";

const ASSETS = [
  { id: "equity", name: "Stocks", color: "#3b82f6", default: 60 },
  { id: "debt", name: "Bonds", color: "#1e40af", default: 30 },
  { id: "gold", name: "Gold", color: "#f59e0b", default: 5 },
  { id: "other", name: "REITs", color: "#8b5cf6", default: 5 }
];

const RISK_PROFILES = [
  { id: "conservative", name: "Conservative", allocation: { equity: 20, debt: 60, gold: 15, other: 5 } },
  { id: "moderate", name: "Moderate", allocation: { equity: 50, debt: 35, gold: 10, other: 5 } },
  { id: "aggressive", name: "Aggressive", allocation: { equity: 75, debt: 15, gold: 5, other: 5 } }
];

// Portfolio Parameters Component
const PortfolioParameters = ({ 
  initialInvestment, 
  setInitialInvestment,
  monthlyInvestment, 
  setMonthlyInvestment,
  years, 
  setYears,
  inflationRate, 
  setInflationRate,
  riskProfile, 
  setRiskProfile,
  customAllocation, 
  setCustomAllocation,
  onRunSimulation 
}: any) => {
  
  const handleRiskProfileChange = (profile: string) => {
    setRiskProfile(profile);
    const selectedProfile = RISK_PROFILES.find(p => p.id === profile);
    if (selectedProfile) {
      setCustomAllocation(selectedProfile.allocation);
    }
  };

  const handleAllocationChange = (assetId: string, value: number) => {
    const newAllocation = { ...customAllocation };
    newAllocation[assetId] = value;
    
    // Auto-adjust other allocations to maintain 100%
    const total = (Object.values(newAllocation) as number[]).reduce((a, b) => a + b, 0);
    if (total !== 100) {
      const adjustment = (100 - total) / (Object.keys(newAllocation).length - 1);
      Object.keys(newAllocation).forEach(key => {
        if (key !== assetId) {
          newAllocation[key] = Math.max(0, newAllocation[key] + adjustment);
        }
      });
    }
    
    setCustomAllocation(newAllocation);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-600">💰 Investment Parameters</CardTitle>
          <CardDescription>Set your investment amount and timeline</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="initial">Initial Investment</Label>
              <Input
                id="initial"
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                placeholder="100000"
              />
            </div>
            <div>
              <Label htmlFor="monthly">Monthly Investment</Label>
              <Input
                id="monthly"
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                placeholder="1000"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="years">Investment Period (Years)</Label>
              <Slider
                value={[years]}
                onValueChange={(value) => setYears(value[0])}
                min={1}
                max={30}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1 year</span>
                <span className="font-medium">{years} years</span>
                <span>30 years</span>
              </div>
            </div>
            <div>
              <Label htmlFor="inflation">Expected Inflation (%)</Label>
              <Slider
                value={[inflationRate]}
                onValueChange={(value) => setInflationRate(value[0])}
                min={1}
                max={10}
                step={0.1}
                className="mt-2"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1%</span>
                <span className="font-medium">{inflationRate}%</span>
                <span>10%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-600">📊 Asset Allocation</CardTitle>
          <CardDescription>Choose your risk profile and customize allocation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Risk Profile</Label>
            <Select value={riskProfile} onValueChange={handleRiskProfileChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select risk profile" />
              </SelectTrigger>
              <SelectContent>
                {RISK_PROFILES.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id}>
                    {profile.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {ASSETS.map((asset) => (
              <div key={asset.id}>
                <div className="flex justify-between items-center mb-2">
                  <Label>{asset.name}</Label>
                  <span className="text-sm font-medium">{customAllocation[asset.id]}%</span>
                </div>
                <Slider
                  value={[customAllocation[asset.id]]}
                  onValueChange={(value) => handleAllocationChange(asset.id, value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
            ))}
          </div>

          <Button onClick={onRunSimulation} className="w-full bg-blue-600 hover:bg-blue-700">
            Run Portfolio Simulation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// Portfolio Results Component
const PortfolioResults = ({ results, formatCurrency }: any) => {
  if (!results) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Set your parameters and run the simulation to see results</p>
      </div>
    );
  }

  const pieData = [
    { name: "Stocks", value: 60, color: "#3b82f6" },
    { name: "Bonds", value: 30, color: "#1e40af" },
    { name: "Gold", value: 5, color: "#f59e0b" },
    { name: "REITs", value: 5, color: "#8b5cf6" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-600">🎯 Investment Results</CardTitle>
          <CardDescription>Your portfolio projection over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Final Value</h4>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.endValue)}</p>
              <p className="text-xs text-gray-500">After {results.years} years</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Total Returns</h4>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.totalReturns)}</p>
              <p className="text-xs text-gray-500">Profit generated</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Total Invested</h4>
              <p className="text-2xl font-bold text-gray-600">{formatCurrency(results.totalInvested)}</p>
              <p className="text-xs text-gray-500">Your contributions</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-center text-blue-800">
              Your ${(results.totalInvested/1000).toFixed(0)}K investment could grow to {formatCurrency(results.endValue)} in {results.years} years ({(results.endValue/results.totalInvested).toFixed(1)}x your money).
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-600">📈 Asset Allocation</CardTitle>
          <CardDescription>Your investment distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-blue-600 font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-600">ℹ️ Important Disclaimer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              For educational purposes only. These calculations present hypothetical scenarios based on historical data. 
              Actual returns might vary significantly. We strongly recommend consulting with a SEC-registered financial 
              advisor for personalized guidance tailored to your specific situation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function PortfolioSimulator() {
  // Simulation parameters
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(1000);
  const [years, setYears] = useState<number>(15);
  const [inflationRate, setInflationRate] = useState<number>(3);
  const [riskProfile, setRiskProfile] = useState<string>("moderate");

  // Custom allocation
  const [customAllocation, setCustomAllocation] = useState<{[key: string]: number}>({
    equity: 50,
    debt: 35,
    gold: 10,
    other: 5
  });

  // Expected returns for each asset class (realistic US market rates)
  const expectedReturns = {
    equity: 10.4,
    debt: 4.1,
    gold: 3.7,
    other: 8.9
  };

  // Simulation results
  const [simulationResults, setSimulationResults] = useState<any>(null);

  // Currency formatter
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Run simulation
  const runSimulation = () => {
    const totalMonths = years * 12;
    const totalInvested = initialInvestment + (monthlyInvestment * totalMonths);
    
    // Calculate weighted portfolio return
    const portfolioReturn = (
      (customAllocation.equity / 100) * expectedReturns.equity +
      (customAllocation.debt / 100) * expectedReturns.debt +
      (customAllocation.gold / 100) * expectedReturns.gold +
      (customAllocation.other / 100) * expectedReturns.other
    ) / 100;

    // Calculate future value using compound interest formula
    const monthlyReturn = portfolioReturn / 12;
    const futureValueLumpSum = initialInvestment * Math.pow(1 + portfolioReturn, years);
    const futureValueSIP = monthlyInvestment * (Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn;
    
    const endValue = futureValueLumpSum + futureValueSIP;
    const totalReturns = endValue - totalInvested;

    setSimulationResults({
      endValue,
      totalReturns,
      totalInvested,
      years,
      portfolioReturn: portfolioReturn * 100
    });
  };

  const tabs: TabItem[] = [
    {
      value: "parameters",
      label: "Set Parameters",
      content: (
        <PortfolioParameters
          initialInvestment={initialInvestment}
          setInitialInvestment={setInitialInvestment}
          monthlyInvestment={monthlyInvestment}
          setMonthlyInvestment={setMonthlyInvestment}
          years={years}
          setYears={setYears}
          inflationRate={inflationRate}
          setInflationRate={setInflationRate}
          riskProfile={riskProfile}
          setRiskProfile={setRiskProfile}
          customAllocation={customAllocation}
          setCustomAllocation={setCustomAllocation}
          onRunSimulation={runSimulation}
        />
      )
    },
    {
      value: "results",
      label: "View Results",
      content: (
        <PortfolioResults 
          results={simulationResults}
          formatCurrency={formatCurrency}
        />
      )
    }
  ];

  return (
    <>
      <SEO 
        title="Portfolio Simulator - Asset Allocation & Investment Strategy Tool"
        description="Simulate portfolio performance with different asset allocations. Test investment strategies, risk profiles, and optimize your portfolio for maximum returns."
        keywords="portfolio simulator, asset allocation tool, investment strategy simulator, portfolio optimization, risk assessment tool, investment planning calculator"
        canonical="https://dollarmento.com/portfolio-simulator"
      />
      <Helmet>
        <title>Portfolio Simulator | DollarMento</title>
      </Helmet>

      <div className="flex flex-col gap-6">
        <div className="px-1 py-2">
          <h1 className="text-3xl font-bold mb-1">📊 Portfolio Simulator</h1>
          <h2 className="text-xl font-medium text-blue-600 mb-2">Investment Planning Tool</h2>
          <p className="text-muted-foreground">
            Plan your investment portfolio with American market returns. Simulate different asset allocations 
            including stocks, bonds, gold, and REITs to project your wealth growth over time with realistic 
            US market performance data.
          </p>
        </div>

        <TabPills tabs={tabs} defaultValue="parameters" />
      </div>
    </>
  );
}