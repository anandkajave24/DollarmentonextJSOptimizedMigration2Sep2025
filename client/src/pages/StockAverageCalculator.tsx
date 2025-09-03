import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Helmet } from 'react-helmet';

interface Purchase {
  id: string;
  shares: number;
  price: number;
}

export default function StockAverageCalculator() {
  const [purchases, setPurchases] = useState<Purchase[]>([
    { id: '1', shares: 100, price: 150 },
    { id: '2', shares: 50, price: 140 }
  ]);
  const [currentPrice, setCurrentPrice] = useState(155);

  const addPurchase = () => {
    const newPurchase: Purchase = {
      id: Date.now().toString(),
      shares: 0,
      price: 0
    };
    setPurchases([...purchases, newPurchase]);
  };

  const removePurchase = (id: string) => {
    setPurchases(purchases.filter(p => p.id !== id));
  };

  const updatePurchase = (id: string, field: 'shares' | 'price', value: number) => {
    setPurchases(purchases.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  // Calculations
  const totalShares = purchases.reduce((sum, p) => sum + p.shares, 0);
  const totalInvestment = purchases.reduce((sum, p) => sum + (p.shares * p.price), 0);
  const averagePrice = totalShares > 0 ? totalInvestment / totalShares : 0;
  const currentValue = totalShares * currentPrice;
  const totalGainLoss = currentValue - totalInvestment;
  const gainLossPercentage = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    });
  };

  return (
    <>
      <Helmet>
        <title>Stock Average Calculator - Dollar Cost Averaging & Stock Position Calculator | DollarMento</title>
        <meta name="description" content="Calculate your average stock price and position value with dollar cost averaging. Track multiple stock purchases and compute weighted average cost basis." />
        <meta name="keywords" content="stock average calculator, dollar cost averaging calculator, stock position calculator, average stock price calculator, cost basis calculator, stock purchase calculator, weighted average calculator" />
        <link rel="canonical" href="https://dollarmento.com/stock-average-calculator" />
      </Helmet>
      <div className="w-full p-6 space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Stock Average Calculator</h1>
          <p className="text-sm text-gray-600">
            Calculate your average purchase price when buying stocks in multiple lots and track your investment performance
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Input Panel - 40% width */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-500 rounded"></span>
                  Stock Purchases
                  <Button 
                    onClick={addPurchase}
                    size="sm"
                    className="ml-auto flex items-center gap-1 bg-blue-500 hover:bg-blue-600"
                  >
                    <Plus className="w-4 h-4" />
                    Add Purchase
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {purchases.map((purchase, index) => (
                  <div key={purchase.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-600 w-12">#{index + 1}</div>
                    <div className="flex-1">
                      <Label className="text-xs text-gray-500">Shares</Label>
                      <Input
                        type="number"
                        value={purchase.shares || ''}
                        onChange={(e) => updatePurchase(purchase.id, 'shares', Number(e.target.value))}
                        className="h-8"
                        min="0"
                        step="1"
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-xs text-gray-500">Price per Share</Label>
                      <Input
                        type="number"
                        value={purchase.price || ''}
                        onChange={(e) => updatePurchase(purchase.id, 'price', Number(e.target.value))}
                        className="h-8"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-xs text-gray-500">Total Cost</Label>
                      <div className="h-8 flex items-center text-sm font-medium">
                        {formatCurrency(purchase.shares * purchase.price)}
                      </div>
                    </div>
                    {purchases.length > 1 && (
                      <Button
                        onClick={() => removePurchase(purchase.id)}
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 p-1 h-8 w-8"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Current Market Price
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="currentPrice" className="flex items-center gap-1">
                    Current Price per Share
                    <span className="text-blue-500 cursor-help" title="Current market price of the stock">ⓘ</span>
                  </Label>
                  <Input
                    id="currentPrice"
                    type="number"
                    value={currentPrice}
                    onChange={(e) => setCurrentPrice(Number(e.target.value))}
                    className="mt-1"
                    min="0"
                    step="0.01"
                  />
                </div>
              </CardContent>
            </Card>

            {/* How to Use Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">How to Use This Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">1.</span>
                    <span>Add each stock purchase with shares and price</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Enter the current market price per share</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Review your average cost and current performance</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Plan future purchases or selling decisions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel - 60% width */}
          <div className="lg:col-span-3 space-y-6">
            {/* Portfolio Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Portfolio Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatNumber(totalShares, 0)}</div>
                    <div className="text-sm text-gray-600">Total Shares</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(averagePrice)}</div>
                    <div className="text-sm text-gray-600">Average Price</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{formatCurrency(totalInvestment)}</div>
                    <div className="text-sm text-gray-600">Total Investment</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(currentValue)}</div>
                    <div className="text-sm text-gray-600">Current Value</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-yellow-500 rounded"></span>
                  Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`text-center p-4 rounded-lg ${
                    totalGainLoss >= 0 ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {totalGainLoss >= 0 ? '+' : ''}{formatCurrency(totalGainLoss)}
                    </div>
                    <div className="text-sm text-gray-600">Total Gain/Loss</div>
                  </div>
                  <div className={`text-center p-4 rounded-lg ${
                    gainLossPercentage >= 0 ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      gainLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {gainLossPercentage >= 0 ? '+' : ''}{formatNumber(gainLossPercentage, 1)}%
                    </div>
                    <div className="text-sm text-gray-600">Return Percentage</div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Break-even price:</span>
                      <span className="font-medium">{formatCurrency(averagePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price difference:</span>
                      <span className={`font-medium ${
                        currentPrice >= averagePrice ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {currentPrice >= averagePrice ? '+' : ''}{formatCurrency(currentPrice - averagePrice)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Purchase Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Purchase History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {purchases.map((purchase, index) => (
                    <div key={purchase.id} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                      <span>Purchase #{index + 1}</span>
                      <span>{formatNumber(purchase.shares, 0)} shares @ {formatCurrency(purchase.price)}</span>
                      <span className="font-medium">{formatCurrency(purchase.shares * purchase.price)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                  <div className="flex justify-between font-medium">
                    <span>Total Purchases:</span>
                    <span>{purchases.length}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Average Purchase Size:</span>
                    <span>{formatCurrency(totalInvestment / purchases.length)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="w-full mt-8 space-y-6">
          {/* Stock Average Calculator Guide */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Stock Average Calculator and Dollar Cost Averaging Guide</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Our stock average calculator helps you track multiple stock purchases and calculate your weighted average cost basis. Perfect for implementing dollar cost averaging strategies and analyzing your investment performance.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Dollar Cost Averaging Strategy</h4>
                  <p className="text-sm text-gray-600">
                    Invest the same amount regularly to benefit from market volatility and reduce average cost over time through systematic purchasing.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Value Averaging Approach</h4>
                  <p className="text-sm text-gray-600">
                    Increase investments when prices are low and reduce when prices are high to optimize your cost basis and maximize returns.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Stock Averaging Strategies */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Stock Averaging Strategies</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Position Sizing Optimization</h4>
                <p className="text-sm text-gray-600">
                  Buy more shares when you have high conviction about the company's future prospects and market conditions favor larger positions.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Tax-Efficient Selling</h4>
                <p className="text-sm text-gray-600">
                  Consider tax implications when selling shares. Use specific identification to sell highest-cost shares first and minimize tax liability.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Portfolio Rebalancing</h4>
                <p className="text-sm text-gray-600">
                  Take profits when stocks are significantly above average cost and reallocate to undervalued positions or cash reserves.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Market Timing Considerations</h4>
                <p className="text-sm text-gray-600">
                  While dollar cost averaging reduces timing risk, consider market volatility and fundamental analysis for optimal entry points.
                </p>
              </div>
            </div>
          </section>

          {/* Stock Average Calculator Pros and Cons */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Stock Average Calculator Benefits and Limitations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Benefits Section */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <h4 className="text-xl font-bold text-green-800">Benefits</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-green-700">✓ Accurate weighted average cost calculation</p>
                  <p className="text-sm text-green-700">✓ Real-time performance tracking and analysis</p>
                  <p className="text-sm text-green-700">✓ Support for multiple purchase entries</p>
                  <p className="text-sm text-green-700">✓ Helps implement dollar cost averaging strategy</p>
                  <p className="text-sm text-green-700">✓ Tax planning assistance for selling decisions</p>
                </div>
              </div>

              {/* Limitations Section */}
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✗</span>
                  </div>
                  <h4 className="text-xl font-bold text-red-800">Considerations</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-red-700">✗ Does not account for dividends or distributions</p>
                  <p className="text-sm text-red-700">✗ Historical data only - future performance varies</p>
                  <p className="text-sm text-red-700">✗ Excludes transaction fees and commissions</p>
                  <p className="text-sm text-red-700">✗ Market volatility can affect strategy effectiveness</p>
                  <p className="text-sm text-red-700">✗ Requires consistent monitoring and updates</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg text-center text-white">
            <h3 className="text-xl font-bold mb-2">Optimize Your Stock Investment Strategy Today</h3>
            <p className="text-sm mb-4 opacity-90">
              Use our comprehensive stock average calculator to track your purchases, analyze performance, and make informed investment decisions.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Calculate Your Stock Average Now
            </Button>
          </section>
        </div>
      </div>
    </>
  );
}