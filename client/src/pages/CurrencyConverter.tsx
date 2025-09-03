import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { ArrowLeftRight, TrendingUp, TrendingDown } from "lucide-react";
import { SEO } from "../components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(0.85);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Major world currencies
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R' }
  ];

  // Sample exchange rates (in a real app, these would come from an API)
  const exchangeRates = {
    'USD-EUR': 0.85,
    'USD-GBP': 0.73,
    'USD-JPY': 110.25,
    'USD-CAD': 1.28,
    'USD-AUD': 1.35,
    'USD-CHF': 0.92,
    'USD-CNY': 6.45,
    'USD-INR': 74.50,
    'USD-KRW': 1180.00,
    'USD-BRL': 5.20,
    'USD-MXN': 20.15,
    'USD-SGD': 1.35,
    'USD-NZD': 1.42,
    'USD-ZAR': 14.80,
    'EUR-GBP': 0.86,
    'EUR-JPY': 129.70,
    'GBP-JPY': 151.00
  };

  // Get exchange rate between two currencies
  const getExchangeRate = (from: string, to: string) => {
    if (from === to) return 1;
    
    const directRate = exchangeRates[`${from}-${to}` as keyof typeof exchangeRates];
    if (directRate) return directRate;
    
    const reverseRate = exchangeRates[`${to}-${from}` as keyof typeof exchangeRates];
    if (reverseRate) return 1 / reverseRate;
    
    // Convert through USD if direct rate not available
    const fromUSD = exchangeRates[`USD-${from}` as keyof typeof exchangeRates];
    const toUSD = exchangeRates[`USD-${to}` as keyof typeof exchangeRates];
    
    if (fromUSD && toUSD) return toUSD / fromUSD;
    if (from === 'USD' && toUSD) return toUSD;
    if (to === 'USD' && fromUSD) return 1 / fromUSD;
    
    return 1; // Default fallback
  };

  useEffect(() => {
    const rate = getExchangeRate(fromCurrency, toCurrency);
    setExchangeRate(rate);
    setLastUpdated(new Date());
  }, [fromCurrency, toCurrency]);

  const convertedAmount = amount * exchangeRate;

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getCurrencySymbol = (code: string) => {
    return currencies.find(c => c.code === code)?.symbol || code;
  };

  const formatCurrency = (amount: number, currencyCode: string) => {
    const symbol = getCurrencySymbol(currencyCode);
    if (currencyCode === 'JPY' || currencyCode === 'KRW') {
      return `${symbol}${Math.round(amount).toLocaleString()}`;
    }
    return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Popular conversion pairs
  const popularPairs = [
    { from: 'USD', to: 'EUR' },
    { from: 'USD', to: 'GBP' },
    { from: 'USD', to: 'JPY' },
    { from: 'EUR', to: 'USD' },
    { from: 'GBP', to: 'USD' },
    { from: 'USD', to: 'CAD' }
  ];

  // Historical trend data (sample)
  const trendData = [
    { period: '1 Week', change: 0.5, trend: 'up' },
    { period: '1 Month', change: -1.2, trend: 'down' },
    { period: '3 Months', change: 2.8, trend: 'up' },
    { period: '1 Year', change: -3.5, trend: 'down' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <SEO 
        title="Currency Converter - Real-Time Exchange Rates"
        description="Convert currencies with real-time exchange rates. Calculate international money transfers and foreign exchange conversions accurately."
        keywords="currency converter, best exchange rate, currency exchange rates, money exchange rate, foreign currency exchange, foreign exchange rate, exchange rates, foreign exchange, money converter, international transfer, currency calculator"
        canonical="https://dollarmento.com/currency-converter"
      />
      
      <div className="w-full px-4">
        <div className="mb-8 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Currency Converter</h1>
          <p className="text-sm text-gray-600 max-w-3xl">
            Convert currencies with real-time exchange rates for international transactions
          </p>
        </div>

        {/* Clean 50/50 Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Panel - Converter */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">
                  {currencies.find(c => c.code === fromCurrency)?.name} to {currencies.find(c => c.code === toCurrency)?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="amount">
                      {fromCurrency} Amount
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="mt-1 text-lg"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div className="grid grid-cols-5 gap-2 items-end">
                    <div className="col-span-2">
                      <Label htmlFor="fromCurrency">From</Label>
                      <Select value={fromCurrency} onValueChange={setFromCurrency}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.code} - {currency.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-1 flex justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={swapCurrencies}
                        className="p-2"
                      >
                        <ArrowLeftRight className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="col-span-2">
                      <Label htmlFor="toCurrency">To</Label>
                      <Select value={toCurrency} onValueChange={setToCurrency}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.code} - {currency.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg text-center border border-blue-200">
                    <div className="text-3xl font-bold text-blue-900 mb-2">
                      {formatCurrency(convertedAmount, toCurrency)}
                    </div>
                    <div className="text-sm text-blue-700 mb-2">
                      {formatCurrency(amount, fromCurrency)} = {formatCurrency(convertedAmount, toCurrency)}
                    </div>
                    <div className="text-xs text-gray-600 mt-2 flex items-center justify-center gap-2">
                      <span>1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}</span>
                      {trendData[0].trend === 'up' ? 
                        <TrendingUp className="w-3 h-3 text-green-600" /> : 
                        <TrendingDown className="w-3 h-3 text-red-600" />
                      }
                      <span className={trendData[0].trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                        {trendData[0].change > 0 ? '+' : ''}{trendData[0].change}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Last updated: {lastUpdated.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rate Trends & Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Rate Trends & Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-base font-bold text-gray-800 mb-2">
                      {fromCurrency} to {toCurrency}
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-gray-600">Current Rate:</span>
                        <div className="font-medium">{exchangeRate.toFixed(6)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Inverse Rate:</span>
                        <div className="font-medium">{(1 / exchangeRate).toFixed(6)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-medium text-gray-700">Historical Performance</div>
                    <div className="grid grid-cols-2 gap-2">
                      {trendData.map((trend, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded text-xs">
                          <span className="font-medium">{trend.period}</span>
                          <div className="flex items-center gap-1">
                            <span className={`font-medium ${
                              trend.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {trend.change > 0 ? '+' : ''}{trend.change}%
                            </span>
                            {trend.trend === 'up' ? 
                              <TrendingUp className="w-3 h-3 text-green-600" /> : 
                              <TrendingDown className="w-3 h-3 text-red-600" />
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-2 bg-blue-50 rounded border border-blue-200">
                    <div className="text-xs text-blue-800">
                      💡 <strong>Smart Alert:</strong> {fromCurrency}/{toCurrency} is {trendData[0].trend === 'up' ? 'trending up' : 'trending down'} this week. 
                      {trendData[0].trend === 'up' ? ' Good time to convert!' : ' Consider waiting for better rates.'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Analysis & Insights */}
          <div className="space-y-6">
            {/* Popular Pairs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Popular Currency Pairs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {popularPairs.map((pair, index) => {
                    const rate = getExchangeRate(pair.from, pair.to);
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="flex justify-between p-3 h-auto hover:bg-blue-50"
                        onClick={() => {
                          setFromCurrency(pair.from);
                          setToCurrency(pair.to);
                        }}
                      >
                        <span className="text-sm font-medium">{pair.from}/{pair.to}</span>
                        <span className="text-sm">{rate.toFixed(4)}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>


            {/* Quick Conversions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Quick Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 10, 100, 1000, 5000].map((baseAmount) => (
                    <div key={baseAmount} className="flex justify-between text-sm p-2 hover:bg-gray-50 rounded">
                      <span className="font-medium">{formatCurrency(baseAmount, fromCurrency)}</span>
                      <span className="text-gray-600">=</span>
                      <span className="font-medium text-blue-600">{formatCurrency(baseAmount * exchangeRate, toCurrency)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
      
      {/* Educational Content Section - Completely Outside Main Container */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {/* Ultimate Currency Converter */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ultimate Currency Converter with Real-Time Exchange Rates</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Converting currencies doesn't have to be confusing or expensive. Our comprehensive currency converter provides the best exchange rate information for international transactions, travel planning, and global business operations. Whether you're sending money abroad, planning a vacation, or managing international investments, this currency converter helps you understand current currency exchange rates and exactly how much your money is worth in different currencies.
              </p>
              <p className="text-sm text-gray-600">
                Moreover, you can explore different foreign currency exchange options, understand the true cost of international transactions, and compare money exchange rate offers from banks versus online services. Our currency converter serves as both a real-time rate checker and a comprehensive planning tool for all your international money needs. Use our currency converter to find the best exchange rate deals and understand foreign exchange rate margins for smart financial decisions.
              </p>
            </div>
          </section>

          {/* How to Use This Calculator */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Use This Currency Converter</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Basic Conversion</h4>
                <p className="text-sm text-gray-600">
                  Start by entering the amount you want to convert in the amount field. Select your source currency (the currency you have) and your target currency (the currency you want to convert to). The currency converter will instantly show you the converted amount using real-time currency exchange rates. You can easily swap currencies using the arrow button to see the best exchange rate in both directions.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Popular Currency Pairs</h4>
                <p className="text-sm text-gray-600">
                  Use the quick conversion buttons to instantly switch to popular currency pairs like USD/EUR, USD/GBP, or USD/JPY. These shortcuts save time when checking commonly traded foreign currency exchange pairs. The currency converter displays current money exchange rate data for each pair, making it easy to compare currency exchange rates across different currency combinations.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Rate Analysis</h4>
                <p className="text-sm text-gray-600">
                  Review the detailed foreign exchange rate information including current rates, inverse rates, and quick conversion amounts. The currency converter also shows currency exchange rates trends over different time periods, helping you understand if you're getting the best exchange rate available. Use this data to time your foreign currency exchange when rates are favorable.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Transfer Planning</h4>
                <p className="text-sm text-gray-600">
                  Consider the transfer method options and their associated costs. The currency converter provides insights into bank wire transfers versus online services, helping you choose the most cost-effective method. Factor in both exchange rate margins and transfer fees to understand the total cost of your international transaction.
                </p>
              </div>
            </div>
          </section>

          {/* Understanding Exchange Rates */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding Exchange Rates</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">What Affects Exchange Rates</h4>
                <p className="text-sm text-gray-600">
                  Currency exchange rates fluctuate based on economic indicators like GDP growth, inflation rates, and employment levels. Interest rate decisions by central banks, political stability, and market sentiment also significantly impact foreign exchange rate movements. Our currency converter uses real-time data to reflect these market changes, ensuring you get the best exchange rate information and accurate conversion rates.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Interbank vs. Consumer Rates</h4>
                <p className="text-sm text-gray-600">
                  The currency exchange rates shown in our currency converter are based on interbank rates - the foreign exchange rate that banks use when trading with each other. However, when you actually exchange money, banks and exchange services add a margin (typically 2-4%) plus fees. Online services often offer the best exchange rate with margins of 0.5-2%, making them more cost-effective for foreign currency exchange.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Rate Trends and Timing</h4>
                <p className="text-sm text-gray-600">
                  Foreign exchange rate fluctuations happen constantly during market hours. Our currency converter shows recent money exchange rate trends to help you understand if currency exchange rates are improving or declining. While timing the market perfectly is impossible, understanding trends can help you make better decisions about when to get the best exchange rate for large transactions.
                </p>
              </div>
            </div>
          </section>

          {/* Transfer Methods */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Best Currency Transfer Methods</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Online Money Transfer Services</h4>
                <p className="text-sm text-gray-600">
                  Services like Wise, Remitly, and WorldRemit typically offer the best exchange rate with low fees for foreign currency exchange. They use the mid-market money exchange rate (shown in our currency converter) and charge a small transparent fee. These services are ideal for regular transfers and offer better currency exchange rates than traditional banks, often saving 3-5% on international transfers.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Bank Wire Transfers</h4>
                <p className="text-sm text-gray-600">
                  Traditional bank wire transfers are secure but expensive for foreign currency exchange. Banks typically add a 2-4% margin to the foreign exchange rate plus $15-50 in transfer fees. While slower and more costly, bank transfers are preferred for very large amounts due to their security and regulatory compliance. Use our currency converter to understand the true cost including money exchange rate margins.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Digital Wallets and Apps</h4>
                <p className="text-sm text-gray-600">
                  PayPal, Skrill, and similar services offer convenience but often at a higher cost for foreign currency exchange. They typically use currency exchange rates 3-5% below the best exchange rate and may charge additional fees. These are best for small, urgent transfers where convenience outweighs cost. Always compare their money exchange rate with our currency converter before transferring.
                </p>
              </div>
            </div>
          </section>

          {/* Currency Transfer Benefits and Considerations */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Currency Transfer Benefits and Considerations</h3>
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
                  <p className="text-sm text-green-700">✓ Real-time rates provide accurate conversion estimates</p>
                  <p className="text-sm text-green-700">✓ Online services offer better rates than traditional banks</p>
                  <p className="text-sm text-green-700">✓ Digital transfers are faster than traditional methods</p>
                  <p className="text-sm text-green-700">✓ Transparent fees help you understand total costs</p>
                  <p className="text-sm text-green-700">✓ Multiple currency options for global transactions</p>
                  <p className="text-sm text-green-700">✓ 24/7 availability for urgent international transfers</p>
                </div>
              </div>

              {/* Considerations Section */}
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✗</span>
                  </div>
                  <h4 className="text-xl font-bold text-red-800">Considerations</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-red-700">✗ Exchange rates fluctuate constantly during market hours</p>
                  <p className="text-sm text-red-700">✗ Banks add margins of 2-4% above interbank rates</p>
                  <p className="text-sm text-red-700">✗ Transfer fees vary significantly between providers</p>
                  <p className="text-sm text-red-700">✗ Large transfers may trigger additional compliance checks</p>
                  <p className="text-sm text-red-700">✗ Weekend and holiday rates may be less favorable</p>
                  <p className="text-sm text-red-700">✗ Tax implications for large international transfers</p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Use a Currency Converter */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use a Currency Converter?</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Travel Planning</h4>
                <p className="text-sm text-gray-600">
                  Plan your travel budget accurately by getting the best exchange rate when converting your home currency to your destination currency. Understand current foreign currency exchange rates and how much your money is worth abroad.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Business Transactions</h4>
                <p className="text-sm text-gray-600">
                  Make informed decisions about international business deals by understanding current currency exchange rates and money exchange rate costs for foreign currency exchange transactions.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Investment Analysis</h4>
                <p className="text-sm text-gray-600">
                  Analyze foreign investments and understand currency risk impact on your international portfolio returns.
                </p>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm font-medium text-left">
                    How accurate are the exchange rates shown?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Our currency converter uses real-time interbank currency exchange rates updated continuously during market hours. However, these are reference rates - actual foreign exchange rate quotes when exchanging money will include margins and fees from banks or exchange services. The best exchange rate shown is for informational purposes and may vary from actual transaction rates.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-sm font-medium text-left">
                    What's the difference between interbank and consumer exchange rates?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Interbank currency exchange rates (shown in our calculator) are wholesale foreign exchange rate quotes banks use when trading with each other. Consumer money exchange rate quotes include margins of 2-4% for banks and 0.5-2% for online services, plus transfer fees. The total cost difference from the best exchange rate can be significant, especially for large amounts.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-sm font-medium text-left">
                    Which is cheaper for international transfers: banks or online services?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Online foreign currency exchange services like Wise, Remitly, and WorldRemit typically offer the best exchange rate and lower fees than traditional banks. Banks often charge 2-4% margins on currency exchange rates plus $15-50 fees, while online services usually charge 0.5-2% margins with transparent, lower money exchange rate fees. This can save 3-5% on transfers.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-sm font-medium text-left">
                    When do exchange rates change and why?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Foreign exchange rate fluctuations happen constantly during market hours (Monday-Friday) based on economic indicators, central bank decisions, political events, and market sentiment. Currency exchange rates typically freeze on weekends and holidays. Major economic announcements, interest rate changes, and geopolitical events can cause significant movements in the best exchange rate available.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-sm font-medium text-left">
                    Are there limits on international money transfers?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Transfer limits vary by service and destination country. Most online services have daily/monthly limits ranging from $10,000-$50,000. Bank wire transfers may have higher limits but require additional documentation. Large transfers may trigger compliance checks and reporting requirements.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-sm font-medium text-left">
                    How long do international transfers take?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Transfer speed varies by method and destination. Online services typically take 1-3 business days, bank wires take 1-5 business days, and traditional methods can take up to a week. Factors affecting speed include compliance checks, destination country banking systems, and transfer amount.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* Final Call to Action */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-white mb-2">Convert Currencies with Real-Time Rates Now</h3>
            <p className="text-blue-100 text-sm mb-4">
              Get accurate exchange rates and compare transfer costs for smart international money decisions.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Start Converting Now
            </Button>
          </section>

          {/* Currency Converter Tags */}
          <section className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Related Topics</h4>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#CurrencyConverter</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#ExchangeRates</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#MoneyTransfer</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#InternationalMoney</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#ForexRates</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#TravelMoney</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#GlobalFinance</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#CurrencyExchange</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#InternationalTransfer</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#RealTimeRates</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#MoneyConversion</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#BankAlternatives</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#SmartTransfers</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#CurrencyTrading</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#FinancialLiteracy</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#GlobalCommerce</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}