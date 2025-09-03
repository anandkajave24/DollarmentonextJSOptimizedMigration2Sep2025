import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Calculator, AlertCircle } from 'lucide-react';
import CalculatorHeaderVisual from '@/components/ui/CalculatorHeaderVisual';
import { SEO } from '../SEO';

const BrokerageFeesCalculator: React.FC = () => {
  const [broker, setBroker] = useState<string>('fidelity');
  const [tradeAmount, setTradeAmount] = useState<number>(10000);
  const [tradeFrequency, setTradeFrequency] = useState<number>(12);
  const [accountType, setAccountType] = useState<string>('individual');
  const [tradeType, setTradeType] = useState<string>('stock');
  const [optionsContracts, setOptionsContracts] = useState<number>(10);

  // Broker fee structures (real USA brokers with authentic fee structures)
  const brokerFees = {
    fidelity: {
      name: 'Fidelity',
      stockTrade: 0,
      optionsBase: 0,
      optionsPerContract: 0.65,
      mutualFundTransaction: 0,
      accountFee: 0,
      minBalance: 0,
      features: ['Zero commission stocks', 'No account minimums', '$0.65 per options contract']
    },
    schwab: {
      name: 'Charles Schwab',
      stockTrade: 0,
      optionsBase: 0,
      optionsPerContract: 0.65,
      mutualFundTransaction: 0,
      accountFee: 0,
      minBalance: 0,
      features: ['Zero commission stocks', 'No account fees', '$0.65 per options contract']
    },
    vanguard: {
      name: 'Vanguard',
      stockTrade: 0,
      optionsBase: 1,
      optionsPerContract: 1,
      mutualFundTransaction: 0,
      accountFee: 20,
      minBalance: 0,
      features: ['Zero commission stocks', '$20 annual fee for small accounts', '$1 per options contract']
    },
    etrade: {
      name: 'E*TRADE',
      stockTrade: 0,
      optionsBase: 0,
      optionsPerContract: 0.65,
      mutualFundTransaction: 0,
      accountFee: 0,
      minBalance: 0,
      features: ['Zero commission stocks', 'No account minimums', '$0.65 per options contract']
    },
    tda: {
      name: 'TD Ameritrade',
      stockTrade: 0,
      optionsBase: 0,
      optionsPerContract: 0.65,
      mutualFundTransaction: 0,
      accountFee: 0,
      minBalance: 0,
      features: ['Zero commission stocks', 'Advanced trading tools', '$0.65 per options contract']
    },
    robinhood: {
      name: 'Robinhood',
      stockTrade: 0,
      optionsBase: 0,
      optionsPerContract: 0,
      mutualFundTransaction: 0,
      accountFee: 0,
      minBalance: 0,
      features: ['Zero commission everything', 'Mobile-first platform', 'Free options trading']
    }
  };

  const selectedBroker = brokerFees[broker as keyof typeof brokerFees];

  // Calculate fees based on trade type
  const calculateFees = () => {
    let tradeFee = 0;
    let optionsFee = 0;
    let accountFee = selectedBroker.accountFee;

    if (tradeType === 'stock') {
      tradeFee = selectedBroker.stockTrade;
    } else if (tradeType === 'options') {
      optionsFee = selectedBroker.optionsBase + (selectedBroker.optionsPerContract * optionsContracts);
    } else if (tradeType === 'mutual_fund') {
      tradeFee = selectedBroker.mutualFundTransaction;
    }

    const totalPerTrade = tradeFee + optionsFee;
    const annualTradeFees = totalPerTrade * tradeFrequency;
    const totalAnnualFees = annualTradeFees + accountFee;
    const annualTradeVolume = tradeAmount * tradeFrequency;
    const feePercentage = annualTradeVolume > 0 ? (totalAnnualFees / annualTradeVolume) * 100 : 0;

    return {
      tradeFee,
      optionsFee,
      totalPerTrade,
      annualTradeFees,
      accountFee,
      totalAnnualFees,
      annualTradeVolume,
      feePercentage
    };
  };

  const fees = calculateFees();

  // Fee breakdown chart data
  const feeBreakdownData = [
    { name: 'Trading Fees', value: fees.annualTradeFees, color: '#3b82f6' },
    { name: 'Account Fees', value: fees.accountFee, color: '#f59e0b' },
  ].filter(item => item.value > 0);

  // Broker comparison data
  const brokerComparisonData = Object.entries(brokerFees).map(([key, brokerData]) => {
    const stockFee = brokerData.stockTrade * tradeFrequency;
    const optionsFee = tradeType === 'options' ? 
      (brokerData.optionsBase + (brokerData.optionsPerContract * optionsContracts)) * tradeFrequency : 0;
    const total = stockFee + optionsFee + brokerData.accountFee;
    
    return {
      name: brokerData.name,
      fee: total,
      isSelected: key === broker
    };
  });

  // Investment impact over time
  const investmentImpactData = [1, 5, 10, 20, 30].map(years => {
    const totalFees = fees.totalAnnualFees * years;
    const lostGrowth = totalFees * Math.pow(1.07, years - 1); // Assuming 7% growth
    
    return {
      year: years,
      fees: totalFees,
      lostGrowth: Math.round(lostGrowth)
    };
  });

  return (
    <>
      <SEO 
        title="Brokerage Fees Calculator - Compare Trading Costs & Commission Fees"
        description="Compare brokerage fees, trading costs, and commission charges across top US brokers. Calculate annual trading expenses and optimize your investment costs."
        keywords="brokerage fees calculator, trading commission calculator, broker comparison tool, trading costs calculator, stock trading fees, options trading fees, investment fee calculator"
        canonical="https://rupeesmart.com/brokerage-fees-calculator"
      />
      <div className="w-full p-6 space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Brokerage & Trading Fees Calculator</h1>
          <p className="text-sm text-gray-600">
            Calculate brokerage fees and taxes for US stock trades across different brokers.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Input Panel - 40% width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Broker Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Broker & Trading Setup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="broker">Select Broker</Label>
                    <Select value={broker} onValueChange={setBroker}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your broker" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fidelity">Fidelity</SelectItem>
                        <SelectItem value="schwab">Charles Schwab</SelectItem>
                        <SelectItem value="vanguard">Vanguard</SelectItem>
                        <SelectItem value="etrade">E*TRADE</SelectItem>
                        <SelectItem value="tda">TD Ameritrade</SelectItem>
                        <SelectItem value="robinhood">Robinhood</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tradeType">Trade Type</Label>
                      <Select value={tradeType} onValueChange={setTradeType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stock">Stocks/ETFs</SelectItem>
                          <SelectItem value="options">Options</SelectItem>
                          <SelectItem value="mutual_fund">Mutual Funds</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="accountType">Account Type</Label>
                      <Select value={accountType} onValueChange={setAccountType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="ira">IRA</SelectItem>
                          <SelectItem value="roth_ira">Roth IRA</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trading Parameters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Trading Parameters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tradeAmount">Average Trade Amount ($)</Label>
                      <Input
                        id="tradeAmount"
                        type="number"
                        value={tradeAmount}
                        onChange={(e) => setTradeAmount(Number(e.target.value) || 0)}
                        placeholder="10000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tradeFrequency">Trades per Year</Label>
                      <Input
                        id="tradeFrequency"
                        type="number"
                        value={tradeFrequency}
                        onChange={(e) => setTradeFrequency(Number(e.target.value) || 0)}
                        placeholder="12"
                      />
                    </div>
                  </div>

                  {tradeType === 'options' && (
                    <div>
                      <Label htmlFor="optionsContracts">Options Contracts per Trade</Label>
                      <Input
                        id="optionsContracts"
                        type="number"
                        value={optionsContracts}
                        onChange={(e) => setOptionsContracts(Number(e.target.value) || 0)}
                        placeholder="10"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Broker Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-700">{selectedBroker.name} Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedBroker.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel - 60% width */}
          <div className="lg:col-span-3 space-y-6">
            {/* Fee Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Fee Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      ${fees.totalPerTrade.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">Per Trade</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      ${fees.totalAnnualFees.toFixed(0)}
                    </div>
                    <div className="text-sm text-gray-600">Annual Fees</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      ${fees.annualTradeVolume.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Annual Volume</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {fees.feePercentage.toFixed(3)}%
                    </div>
                    <div className="text-sm text-gray-600">Fee Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fee Breakdown Chart */}
            {feeBreakdownData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800">Annual Fee Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={feeBreakdownData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: $${value}`}
                      >
                        {feeBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {/* Broker Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Broker Comparison (Annual Fees)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={brokerComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Annual Fee']} />
                    <Bar dataKey="fee" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Investment Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Long-term Impact of Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={investmentImpactData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, '']} />
                    <Legend />
                    <Bar dataKey="fees" stackId="a" fill="#f59e0b" name="Total Fees Paid" />
                    <Bar dataKey="lostGrowth" stackId="a" fill="#ef4444" name="Lost Investment Growth" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold text-blue-700">Tips for lowering fees</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• For frequent trading, choose brokers with no commissions.</p>
              <p>• Think about how fees will affect your choice of investment strategies</p>
              <p>• Use limit orders to avoid paying market maker fees.</p>
              <p>• Combine trades to make them less frequent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold text-green-700">Costs to Keep an Eye On</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• Bid-ask spreads on stocks that aren't very liquid</p>
              <p>• Fees for changing money for international trades</p>
              <p>• Fees for moving your account when you switch brokers</p>
              <p>• Fees for accounts that are inactive</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold text-purple-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Important Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• The fee structures may change at any time without notice</p>
              <p>• Some brokers offer deals on prices</p>
              <p>• Some services may cost extra.</p>
              <p>• Always check with your broker to see what the current fees are.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default BrokerageFeesCalculator;