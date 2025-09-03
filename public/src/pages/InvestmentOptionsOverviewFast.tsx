import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Slider } from "../components/ui/slider";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { SEO } from "../components/SEO";

export default function InvestmentOptionsOverviewFast() {
  const [age, setAge] = useState(35);
  const [monthlyIncome, setMonthlyIncome] = useState(75000);
  const [investmentHorizon, setInvestmentHorizon] = useState(5);
  const [riskTolerance, setRiskTolerance] = useState(3);

  // Quick risk calculation without heavy computations
  const calculateRiskScore = () => {
    const ageFactor = Math.max(1, 10 - Math.floor((age - 18) / 5));
    const incomeFactor = Math.min(10, Math.max(1, Math.floor(monthlyIncome / 20000)));
    const horizonFactor = Math.min(10, Math.max(1, investmentHorizon));
    const toleranceFactor = riskTolerance * 2;
    return Math.round((ageFactor + incomeFactor + horizonFactor + toleranceFactor) / 4);
  };

  const getPortfolioAllocation = () => {
    const riskScore = calculateRiskScore();
    
    if (riskScore >= 8) {
      return {
        type: "Aggressive",
        allocation: { equity: 80, debt: 15, gold: 3, alternative: 2 },
        expectedReturn: "12-15%",
        color: "bg-red-50 border-red-200 text-red-800"
      };
    } else if (riskScore >= 6) {
      return {
        type: "Moderate",
        allocation: { equity: 60, debt: 30, gold: 5, alternative: 5 },
        expectedReturn: "10-12%",
        color: "bg-yellow-50 border-yellow-200 text-yellow-800"
      };
    } else {
      return {
        type: "Conservative",
        allocation: { equity: 30, debt: 60, gold: 8, alternative: 2 },
        expectedReturn: "7-9%",
        color: "bg-green-50 border-green-200 text-green-800"
      };
    }
  };

  const portfolio = getPortfolioAllocation();

  return (
    <div className="px-4 py-3">
      <SEO 
        title="Investment Options Overview - RupeeSmart"
        description="Fast-loading personalized investment portfolio recommendations"
        keywords="investment options, portfolio, risk assessment"
      />
      
      <div className="flex items-center mb-4">
        <button 
          onClick={() => window.history.back()}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <span className="material-icons">arrow_back</span>
        </button>
        <h1 className="text-xl font-semibold">Investment Options Overview</h1>
      </div>

      {/* Quick Portfolio Assessment */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="material-icons mr-2 text-blue-500">assessment</span>
            Personal Portfolio Recommendation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Your Age: {age}</Label>
                <Slider
                  value={[age]}
                  onValueChange={(value) => setAge(value[0])}
                  max={65}
                  min={18}
                  step={1}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium">Monthly Income: ₹{monthlyIncome.toLocaleString()}</Label>
                <Slider
                  value={[monthlyIncome]}
                  onValueChange={(value) => setMonthlyIncome(value[0])}
                  max={200000}
                  min={25000}
                  step={5000}
                  className="mt-2"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Investment Horizon: {investmentHorizon} years</Label>
                <Slider
                  value={[investmentHorizon]}
                  onValueChange={(value) => setInvestmentHorizon(value[0])}
                  max={30}
                  min={1}
                  step={1}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium">Risk Tolerance: {riskTolerance}/5</Label>
                <Slider
                  value={[riskTolerance]}
                  onValueChange={(value) => setRiskTolerance(value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Recommendation */}
      <Card className={`mb-6 ${portfolio.color} border-2`}>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            Recommended Portfolio: {portfolio.type}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{portfolio.allocation.equity}%</div>
              <div className="text-sm">Equity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{portfolio.allocation.debt}%</div>
              <div className="text-sm">Debt</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{portfolio.allocation.gold}%</div>
              <div className="text-sm">Gold</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{portfolio.allocation.alternative}%</div>
              <div className="text-sm">Alternative</div>
            </div>
          </div>
          
          <p className="text-center font-medium">
            Expected Annual Return: {portfolio.expectedReturn}
          </p>
        </CardContent>
      </Card>

      {/* Quick Investment Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-green-800 mb-2">Low Risk</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Fixed Deposits</li>
              <li>• PPF</li>
              <li>• Government Bonds</li>
              <li>• Debt Mutual Funds</li>
            </ul>
            <p className="text-xs text-green-600 mt-2">Returns: 6-8%</p>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Moderate Risk</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Index Funds</li>
              <li>• Large Cap Stocks</li>
              <li>• Hybrid Funds</li>
              <li>• REITs</li>
            </ul>
            <p className="text-xs text-yellow-600 mt-2">Returns: 8-12%</p>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-red-800 mb-2">High Risk</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Small Cap Stocks</li>
              <li>• Sectoral Funds</li>
              <li>• Crypto</li>
              <li>• International Stocks</li>
            </ul>
            <p className="text-xs text-red-600 mt-2">Returns: 12-20%</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center">
        <Button 
          onClick={() => window.location.href = '/portfolio-simulator'}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <span className="material-icons mr-2">timeline</span>
          Portfolio Simulator
        </Button>
        <Button 
          onClick={() => window.location.href = '/indian-investments'}
          variant="outline"
        >
          <span className="material-icons mr-2">explore</span>
          Explore Investments
        </Button>
      </div>
    </div>
  );
}