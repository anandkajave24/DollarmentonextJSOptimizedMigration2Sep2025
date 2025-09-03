import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { SEO } from "../components/SEO";

interface Investment {
  id: string;
  name: string;
  purchasePrice: number;
  currentPrice: number;
  shares: number;
  purchaseDate: string;
}

export default function TaxLossHarvestingCalculator() {
  const [taxRate, setTaxRate] = useState(24);
  const [capitalGains, setCapitalGains] = useState(15000);
  const [investments, setInvestments] = useState<Investment[]>([
    { id: '1', name: 'Tech Stock A', purchasePrice: 150, currentPrice: 120, shares: 100, purchaseDate: '2023-06-15' },
    { id: '2', name: 'Bank Stock B', purchasePrice: 80, currentPrice: 75, shares: 200, purchaseDate: '2023-08-20' },
    { id: '3', name: 'Growth ETF', purchasePrice: 200, currentPrice: 180, shares: 50, purchaseDate: '2023-09-10' }
  ]);

  const addInvestment = () => {
    const newInvestment: Investment = {
      id: Date.now().toString(),
      name: '',
      purchasePrice: 0,
      currentPrice: 0,
      shares: 0,
      purchaseDate: new Date().toISOString().split('T')[0]
    };
    setInvestments([...investments, newInvestment]);
  };

  const removeInvestment = (id: string) => {
    setInvestments(investments.filter(inv => inv.id !== id));
  };

  const updateInvestment = (id: string, field: keyof Investment, value: string | number) => {
    setInvestments(investments.map(inv => 
      inv.id === id ? { ...inv, [field]: value } : inv
    ));
  };

  // Calculate gains/losses for each investment
  const investmentResults = investments.map(inv => {
    const totalPurchase = inv.purchasePrice * inv.shares;
    const currentValue = inv.currentPrice * inv.shares;
    const gainLoss = currentValue - totalPurchase;
    const gainLossPercentage = totalPurchase > 0 ? (gainLoss / totalPurchase) * 100 : 0;
    
    // Check if long-term (>1 year)
    const purchaseDate = new Date(inv.purchaseDate);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const isLongTerm = purchaseDate < oneYearAgo;
    
    return {
      ...inv,
      totalPurchase,
      currentValue,
      gainLoss,
      gainLossPercentage,
      isLongTerm,
      taxSavings: gainLoss < 0 ? Math.abs(gainLoss) * (taxRate / 100) : 0
    };
  });

  // Separate gains and losses
  const losses = investmentResults.filter(inv => inv.gainLoss < 0);
  const gains = investmentResults.filter(inv => inv.gainLoss > 0);

  // Calculate totals
  const totalLosses = losses.reduce((sum, inv) => sum + Math.abs(inv.gainLoss), 0);
  const totalGains = gains.reduce((sum, inv) => sum + inv.gainLoss, 0);
  const totalTaxSavings = losses.reduce((sum, inv) => sum + inv.taxSavings, 0);

  // Offset calculations
  const lossesAfterGainOffset = Math.max(0, totalLosses - totalGains);
  const offsetCapitalGains = Math.min(capitalGains, totalLosses);
  const taxSavingsFromOffset = offsetCapitalGains * (taxRate / 100);
  const totalTaxBenefit = taxSavingsFromOffset + (lossesAfterGainOffset > 0 ? Math.min(3000, lossesAfterGainOffset) * (taxRate / 100) : 0);

  // Carryforward losses
  const carryforwardLosses = Math.max(0, lossesAfterGainOffset - 3000);

  // Chart data
  const gainLossData = investmentResults.map(inv => ({
    name: inv.name.substring(0, 10),
    gainLoss: inv.gainLoss,
    fill: inv.gainLoss >= 0 ? '#10b981' : '#ef4444'
  }));

  const summaryData = [
    { name: 'Capital Gains', value: capitalGains, fill: '#3b82f6' },
    { name: 'Losses Used', value: offsetCapitalGains, fill: '#ef4444' },
    { name: 'Remaining Gains', value: Math.max(0, capitalGains - offsetCapitalGains), fill: '#f59e0b' }
  ].filter(item => item.value > 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <SEO 
        title="Tax Loss Harvesting Calculator - Optimize Capital Gains Tax"
        description="Calculate tax savings from tax loss harvesting. Offset capital gains with investment losses and reduce your tax liability legally and effectively."
        keywords="tax loss harvesting calculator, capital gains offset, tax savings, investment losses, portfolio tax optimization, wash sale rules"
        canonical="https://dollarmento.com/tax-loss-harvesting-calculator"
      />
      
      <div className="w-full px-4">
        <div className="text-left mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tax Loss Harvesting Calculator</h1>
          <p className="text-sm text-gray-600 max-w-3xl">
            Calculate potential tax savings by harvesting investment losses to offset capital gains
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Panel - 40% width */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-500 rounded"></span>
                  Tax Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="taxRate" className="flex items-center gap-1">
                      Tax Rate (%)
                      <span className="text-blue-500 cursor-help" title="Your marginal tax rate for capital gains">ⓘ</span>
                    </Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      className="mt-1"
                      min="0"
                      max="50"
                      step="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="capitalGains" className="flex items-center gap-1">
                      Capital Gains to Offset
                      <span className="text-blue-500 cursor-help" title="Capital gains you want to offset with losses">ⓘ</span>
                    </Label>
                    <Input
                      id="capitalGains"
                      type="number"
                      value={capitalGains}
                      onChange={(e) => setCapitalGains(Number(e.target.value))}
                      className="mt-1"
                      min="0"
                      step="1000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-red-500 rounded"></span>
                  Investment Positions
                  <Button 
                    onClick={addInvestment}
                    size="sm"
                    className="ml-auto flex items-center gap-1 bg-red-500 hover:bg-red-600"
                  >
                    <Plus className="w-4 h-4" />
                    Add Position
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-80 overflow-y-auto">
                {investments.map((investment) => {
                  const result = investmentResults.find(r => r.id === investment.id);
                  return (
                    <div key={investment.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Input
                          placeholder="Investment name"
                          value={investment.name}
                          onChange={(e) => updateInvestment(investment.id, 'name', e.target.value)}
                          className="h-8 flex-1"
                        />
                        <Button
                          onClick={() => removeInvestment(investment.id)}
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 p-1 h-8 w-8"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div>
                          <Label className="text-xs text-gray-500">Purchase Price</Label>
                          <Input
                            type="number"
                            value={investment.purchasePrice || ''}
                            onChange={(e) => updateInvestment(investment.id, 'purchasePrice', Number(e.target.value))}
                            className="h-8"
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Current Price</Label>
                          <Input
                            type="number"
                            value={investment.currentPrice || ''}
                            onChange={(e) => updateInvestment(investment.id, 'currentPrice', Number(e.target.value))}
                            className="h-8"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div>
                          <Label className="text-xs text-gray-500">Shares</Label>
                          <Input
                            type="number"
                            value={investment.shares || ''}
                            onChange={(e) => updateInvestment(investment.id, 'shares', Number(e.target.value))}
                            className="h-8"
                            min="0"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Purchase Date</Label>
                          <Input
                            type="date"
                            value={investment.purchaseDate}
                            onChange={(e) => updateInvestment(investment.id, 'purchaseDate', e.target.value)}
                            className="h-8"
                          />
                        </div>
                      </div>
                      {result && (
                        <div className="mt-2 p-2 bg-white rounded text-xs">
                          <div className="flex justify-between">
                            <span>Gain/Loss:</span>
                            <span className={`font-medium ${result.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(result.gainLoss)} ({formatNumber(result.gainLossPercentage, 1)}%)
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax Type:</span>
                            <span className="font-medium">{result.isLongTerm ? 'Long-term' : 'Short-term'}</span>
                          </div>
                          {result.gainLoss < 0 && (
                            <div className="flex justify-between">
                              <span>Tax Savings:</span>
                              <span className="font-medium text-green-600">{formatCurrency(result.taxSavings)}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
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
                    <span>Type in the amount of capital gains you want to offset and your tax rate.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Make a list of your investments and how much they are worth right now.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Look at the jobs that aren't paying well.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Find out how much money you can save on taxes overall</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel - 60% width */}
          <div className="lg:col-span-3 space-y-4">
            {/* Tax Savings Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded"></span>
                  Tax Savings Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(totalTaxBenefit)}</div>
                    <div className="text-sm text-gray-600">Total Tax Benefit</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(offsetCapitalGains)}</div>
                    <div className="text-sm text-gray-600">Gains Offset</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{formatCurrency(totalLosses)}</div>
                    <div className="text-sm text-gray-600">Total Losses</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(carryforwardLosses)}</div>
                    <div className="text-sm text-gray-600">Carryforward</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gain/Loss Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Investment Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gainLossData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="gainLoss" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Offset Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Capital Gains Offset</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={summaryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {summaryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} stroke="#fff" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Tax Rules Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <span className="w-4 h-4 bg-yellow-500 rounded"></span>
                  Tax Loss Harvesting Rules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="font-medium text-yellow-800 mb-1">Annual Deduction Limit</div>
                    <div className="text-yellow-600">
                      Up to $3,000 in net losses can offset ordinary income
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-800 mb-1">Carryforward Rules</div>
                    <div className="text-blue-600">
                      Excess losses above $3,000 carry forward indefinitely
                    </div>
                  </div>
                  
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="font-medium text-red-800 mb-1">Wash Sale Rule</div>
                    <div className="text-red-600">
                      Cannot buy same/substantially identical security within 30 days
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Optimization Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {losses.length > 0 && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800">Harvest Losses</div>
                      <div className="text-green-600">
                        Consider selling {losses.length} positions with losses totaling {formatCurrency(totalLosses)}
                      </div>
                    </div>
                  )}
                  
                  {gains.length > 0 && (
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="font-medium text-orange-800">Manage Gains</div>
                      <div className="text-orange-600">
                        {gains.length} positions have gains - consider timing of sales
                      </div>
                    </div>
                  )}
                  
                  {carryforwardLosses > 0 && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800">Future Benefit</div>
                      <div className="text-blue-600">
                        {formatCurrency(carryforwardLosses)} in losses available for future years
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="w-full mt-8 space-y-6">
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Advantages of Strategy</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">• <strong>Cutting Taxes:</strong> Use losses to make up for gains in capital</p>
              <p className="text-sm text-gray-600">• You need to sell stocks that aren't doing well if you want to rebalance your portfolio.</p>
              <p className="text-sm text-gray-600">• <strong>Future flexibility:</strong> You can keep losses that you didn't use.</p>
              <p className="text-sm text-gray-600">• <strong>Income Offset:</strong> up to $3,000 against regular income</p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Best Practices</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">• <strong>Timing:</strong> You lose money in years when you make a lot of money.</p>
              <p className="text-sm text-gray-600">• <strong>Replacement:</strong> Buy securities that are similar but not exactly the same.</p>
              <p className="text-sm text-gray-600">• <strong>Keeping Records:</strong> Make sure to note your basis and how long you plan to keep it.</p>
              <p className="text-sm text-gray-600">• <strong>Accounts that help with taxes:</strong> no need to harvest</p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Important Warnings</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">The wash sale rule says that you can't lose money when you buy back something you sold.</p>
              <p className="text-sm text-gray-600">• Think about the costs of transactions and the difference between the bid and ask prices.</p>
              <p className="text-sm text-gray-600">• Don't let taxes stop you from investing in something.</p>
              <p className="text-sm text-gray-600">• Get help from a tax professional if things get tough.</p>
            </div>
          </section>

          {/* Advanced Tax Optimization Strategies */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Tax Optimization Strategies</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Advantages of Direct Indexing</h4>
                <p className="text-sm text-gray-600">
                  Direct indexing lets you own stocks in an index, which makes tax loss harvesting more accurate. You might lose money on some of your investments, but you can still be in the market with your other ones.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Finding the right place for things</h4>
                <p className="text-sm text-gray-600">
                  Put your investments that don't pay taxes in accounts that don't pay taxes, and your investments that do pay taxes in accounts that do. This is the best way to use tax loss harvesting in accounts that have to pay taxes while keeping gains safe in accounts that don't have to pay taxes.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Managing more than one account</h4>
                <p className="text-sm text-gray-600">
                  Do your tax loss harvesting in more than one account that you have to pay taxes on to get the most out of it. Don't forget about your spouse's accounts, your trust accounts, and your business accounts if you want to get the most out of your taxes.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Preparing for taxes at the end of the year</h4>
                <p className="text-sm text-gray-600">
                  In December, check your portfolio again to see if there are any more chances to make money. Think about how much you can keep and how much you can lose. Also, get ready for taxes next year.
                </p>
              </div>
            </div>
          </section>

          {/* Tax Loss Harvesting: Pros and Cons */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Tax Loss Harvesting: Pros and Cons</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pros Section */}
              <section className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <h4 className="font-semibold text-green-700 text-base">Benefits of Tax Loss Harvesting</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Immediate Tax Savings:</strong> Offset capital gains with realized losses to reduce current tax liability.</span></li>
                  <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Portfolio Rebalancing:</strong> Sell underperforming assets while maintaining market exposure with similar alternatives.</span></li>
                  <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Income Offset:</strong> Use up to $3,000 in net losses annually to offset ordinary income.</span></li>
                  <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Loss Carryforward:</strong> Unused losses can be carried forward indefinitely to future tax years.</span></li>
                  <li className="flex gap-2"><span className="text-green-600 font-medium">✓</span> <span><strong>Compound Benefits:</strong> Tax savings can be reinvested to enhance long-term portfolio growth.</span></li>
                </ul>
              </section>

              {/* Cons Section */}
              <section className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    ✗
                  </div>
                  <h4 className="font-semibold text-red-700 text-base">Tax Loss Harvesting Challenges</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Wash Sale Rules:</strong> Cannot repurchase same or substantially identical securities within 30 days.</span></li>
                  <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Transaction Costs:</strong> Trading fees and bid-ask spreads can reduce overall benefits.</span></li>
                  <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Tracking Complexity:</strong> Requires detailed record-keeping of cost basis and holding periods.</span></li>
                  <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Market Timing Risk:</strong> May lead to poor investment decisions if tax considerations override strategy.</span></li>
                  <li className="flex gap-2"><span className="text-red-600 font-medium">✗</span> <span><strong>Limited Availability:</strong> Only applicable in taxable accounts, not tax-advantaged retirement accounts.</span></li>
                </ul>
              </section>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 text-center mt-12">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Maximize Your Tax Loss Harvesting Strategy</h3>
              <p className="text-blue-100 text-base mb-6 max-w-2xl mx-auto">
                Use our comprehensive calculator to identify optimal tax loss harvesting opportunities and calculate your potential tax savings with precise portfolio analysis.
              </p>
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Calculate Your Tax Savings Now
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}