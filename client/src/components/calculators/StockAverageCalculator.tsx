import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Plus, Trash2 } from 'lucide-react';
import { SEO } from '../SEO';


interface Transaction {
  id: number;
  shares: number;
  price: number;
  date: string;
}

const StockAverageCalculator: React.FC = () => {
  const [stockTicker, setStockTicker] = useState<string>('');
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, shares: 100, price: 50, date: '2024-01-15' },
    { id: 2, shares: 50, price: 45, date: '2024-02-15' }
  ]);
  const [newTransaction, setNewTransaction] = useState({
    shares: 0,
    price: 0,
    date: new Date().toISOString().split('T')[0]
  });

  const addTransaction = () => {
    if (newTransaction.shares > 0 && newTransaction.price > 0) {
      const transaction: Transaction = {
        id: Date.now(),
        shares: newTransaction.shares,
        price: newTransaction.price,
        date: newTransaction.date
      };
      setTransactions([...transactions, transaction]);
      setNewTransaction({
        shares: 0,
        price: 0,
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const removeTransaction = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const totalShares = transactions.reduce((sum, t) => sum + t.shares, 0);
  const totalInvestment = transactions.reduce((sum, t) => sum + (t.shares * t.price), 0);
  const averagePrice = totalShares > 0 ? totalInvestment / totalShares : 0;
  const currentValue = currentPrice > 0 ? totalShares * currentPrice : 0;
  const unrealizedGain = currentValue - totalInvestment;
  const gainPercentage = totalInvestment > 0 ? (unrealizedGain / totalInvestment) * 100 : 0;

  const chartData = transactions.map((t, index) => ({
    transaction: `#${index + 1}`,
    purchasePrice: t.price,
    shares: t.shares,
    date: t.date,
    currentPrice: currentPrice || 0,
    averagePrice: averagePrice
  }));

  const breakEvenPrice = averagePrice * 1.02; // Assuming 2% for taxes/fees

  return (
    <>
      <SEO 
        title="Stock Average Calculator - Dollar Cost Averaging & Portfolio Analysis"
        description="Calculate stock average price, dollar cost averaging returns, and analyze your investment portfolio performance. Track multiple transactions and optimize your stock buying strategy."
        keywords="stock average calculator, dollar cost averaging calculator, DCA calculator, stock portfolio calculator, average cost basis calculator, investment tracking calculator, stock analysis tool"
        canonical="https://rupeesmart.com/stock-average-calculator"
      />
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Stock Average Cost Calculator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your average cost basis per share when purchasing a stock at multiple price points.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Stock Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Stock Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ticker">Stock Ticker (Optional)</Label>
                    <Input
                      id="ticker"
                      value={stockTicker}
                      onChange={(e) => setStockTicker(e.target.value.toUpperCase())}
                      placeholder="AAPL"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentPrice">Current Market Price ($)</Label>
                    <Input
                      id="currentPrice"
                      type="number"
                      step="0.01"
                      value={currentPrice || ''}
                      onChange={(e) => setCurrentPrice(Number(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add New Transaction */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-700">Add Transaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shares">Number of Shares</Label>
                      <Input
                        id="shares"
                        type="number"
                        value={newTransaction.shares || ''}
                        onChange={(e) => setNewTransaction({
                          ...newTransaction,
                          shares: Number(e.target.value) || 0
                        })}
                        placeholder="100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price per Share ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={newTransaction.price || ''}
                        onChange={(e) => setNewTransaction({
                          ...newTransaction,
                          price: Number(e.target.value) || 0
                        })}
                        placeholder="50.00"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="date">Purchase Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({
                        ...newTransaction,
                        date: e.target.value
                      })}
                    />
                  </div>
                  <Button onClick={addTransaction} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Transaction
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {transactions.map((transaction, index) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <span className="font-medium">#{index + 1}</span>
                        <span className="ml-2 text-gray-600">
                          {transaction.shares} shares @ ${transaction.price.toFixed(2)}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          ({transaction.date})
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-700 font-medium">
                          ${(transaction.shares * transaction.price).toLocaleString()}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeTransaction(transaction.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {stockTicker ? `${stockTicker} ` : ''}Investment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-blue-700 font-medium">Total Shares</div>
                      <div className="text-blue-800 font-bold text-lg">{totalShares.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-green-700 font-medium">Total Invested</div>
                      <div className="text-green-800 font-bold text-lg">${totalInvestment.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                    <div className="text-orange-700 font-bold text-xl">Average Cost Basis</div>
                    <div className="text-orange-800 font-bold text-2xl">
                      ${averagePrice.toFixed(2)} per share
                    </div>
                  </div>

                  {currentPrice > 0 && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-purple-700 font-medium">Current Value</div>
                          <div className="text-purple-800 font-bold text-lg">
                            ${currentValue.toLocaleString()}
                          </div>
                        </div>
                        <div className={`p-3 rounded-lg ${unrealizedGain >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                          <div className={`font-medium ${unrealizedGain >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                            Unrealized {unrealizedGain >= 0 ? 'Gain' : 'Loss'}
                          </div>
                          <div className={`font-bold text-lg ${unrealizedGain >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                            ${Math.abs(unrealizedGain).toLocaleString()} ({gainPercentage.toFixed(2)}%)
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-gray-700 font-medium">Break-even Price (after fees)</div>
                        <div className="text-gray-800 font-bold">${breakEvenPrice.toFixed(2)}</div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Purchase Price Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="transaction" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [
                          `$${Number(value).toFixed(2)}`,
                          name === 'purchasePrice' ? 'Purchase Price' :
                          name === 'currentPrice' ? 'Current Price' : 'Average Price'
                        ]}
                      />
                      <Legend />
                      <Bar dataKey="purchasePrice" fill="#3b82f6" name="Purchase Price" />
                      {currentPrice > 0 && (
                        <Bar dataKey="currentPrice" fill="#10b981" name="Current Price" />
                      )}
                      <Bar dataKey="averagePrice" fill="#f59e0b" name="Average Price" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Add transactions to see the price analysis
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Investment Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-1">Dollar-Cost Averaging</h4>
                    <p>Your average cost of ${averagePrice.toFixed(2)} demonstrates dollar-cost averaging in action.</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-1">Tax Considerations</h4>
                    <p>Consider the tax implications of selling shares. Sell your highest-cost shares first to minimize taxes.</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-700 mb-1">Rebalancing</h4>
                    <p>Consider taking profits when the stock is significantly above your average cost.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default StockAverageCalculator;