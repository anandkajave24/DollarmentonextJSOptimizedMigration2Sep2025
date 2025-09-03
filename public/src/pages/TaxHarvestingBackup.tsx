import React, { useState, useEffect } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Info, AlertTriangle, Check, ArrowRight, Calculator, FileText, Download, 
  BarChart, PieChart, TrendingUp, Clipboard, Percent 
} from "lucide-react";
import { format } from "date-fns";
import { 
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Types for our entry objects
interface CapitalGainEntry {
  id: string;
  name: string;
  type: string;
  purchasePrice: number;
  currentPrice: number;
  difference: number;
  dateAdded: string;
}

// Format currency function
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export default function TaxHarvesting() {
  // State for storing entries
  const [stcgEntries, setStcgEntries] = useState<CapitalGainEntry[]>([]);
  const [ltcgEntries, setLtcgEntries] = useState<CapitalGainEntry[]>([]);
  
  // Form state
  const [taxBracket, setTaxBracket] = useState<string>("5%");
  
  // STCG form fields
  const [stcgName, setStcgName] = useState<string>("");
  const [stcgType, setStcgType] = useState<string>("Listed Stocks (Equity)");
  const [stcgPurchasePrice, setStcgPurchasePrice] = useState<number>(100000);
  const [stcgCurrentPrice, setStcgCurrentPrice] = useState<number>(90000);
  
  // LTCG form fields
  const [ltcgName, setLtcgName] = useState<string>("");
  const [ltcgType, setLtcgType] = useState<string>("Listed Stocks (Equity)");
  const [ltcgPurchasePrice, setLtcgPurchasePrice] = useState<number>(100000);
  const [ltcgCurrentPrice, setLtcgCurrentPrice] = useState<number>(90000);

  // Tax rate information based on investment type
  const stcgTaxInfo: Record<string, string> = {
    "Listed Stocks (Equity)": "15% STCG tax rate",
    "Equity Mutual Funds & ETFs": "15% STCG tax rate",
    "Index & Sectoral Funds": "15% STCG tax rate",
    "Real Estate": "As per income tax slab",
    "REITs": "As per income tax slab",
    "Gold ETFs & SGBs": "As per income tax slab"
  };

  const ltcgTaxInfo: Record<string, string> = {
    "Listed Stocks (Equity)": "10% LTCG tax rate (above ₹1 lakh)",
    "Equity Mutual Funds & ETFs": "10% LTCG tax rate (above ₹1 lakh)",
    "Index & Sectoral Funds": "10% LTCG tax rate (above ₹1 lakh)",
    "Real Estate": "As per income tax slab",
    "REITs": "As per income tax slab",
    "Gold ETFs & SGBs": "As per income tax slab"
  };

  // Calculate summaries for final calculations
  const stGainTotal = stcgEntries.reduce((total, entry) => 
    total + (entry.difference > 0 ? entry.difference : 0), 0);
  
  const stLossTotal = stcgEntries.reduce((total, entry) => 
    total + (entry.difference < 0 ? Math.abs(entry.difference) : 0), 0);
  
  const ltGainTotal = ltcgEntries.reduce((total, entry) => 
    total + (entry.difference > 0 ? entry.difference : 0), 0);
  
  const ltLossTotal = ltcgEntries.reduce((total, entry) => 
    total + (entry.difference < 0 ? Math.abs(entry.difference) : 0), 0);

  // Net calculations
  const netStGainLoss = stGainTotal - stLossTotal;
  const netLtGainLoss = ltGainTotal - ltLossTotal;

  // Tax calculations
  const stcgTaxRate = 0.15; // 15% for equity
  const ltcgTaxRate = 0.10; // 10% for equity (above 1 lakh)
  const ltcgExemption = 100000; // 1 lakh exemption for LTCG

  // Calculate tax without optimization
  const stcgTaxWithoutOpt = Math.max(0, stGainTotal * stcgTaxRate);
  
  // LTCG tax applies only above 1 lakh
  const ltcgTaxWithoutOpt = Math.max(0, (ltGainTotal > ltcgExemption ? 
    (ltGainTotal - ltcgExemption) * ltcgTaxRate : 0));
  
  const totalTaxWithoutOpt = stcgTaxWithoutOpt + ltcgTaxWithoutOpt;

  // Calculate tax with optimization (after harvesting)
  const stcgTaxWithOpt = Math.max(0, netStGainLoss * stcgTaxRate);
  
  // For LTCG, short-term losses can offset long-term gains
  const remainingStLoss = Math.max(0, stLossTotal - stGainTotal);
  const ltGainAfterStLoss = Math.max(0, ltGainTotal - remainingStLoss);
  
  const ltcgTaxWithOpt = Math.max(0, (ltGainAfterStLoss > ltcgExemption ? 
    (ltGainAfterStLoss - ltcgExemption) * ltcgTaxRate : 0));
  
  const totalTaxWithOpt = stcgTaxWithOpt + ltcgTaxWithOpt;
  
  // Tax saved calculation
  const taxSaved = totalTaxWithoutOpt - totalTaxWithOpt;

  // Add STCG entry
  const addStcgEntry = () => {
    if (!stcgName.trim()) return;
    
    const newEntry: CapitalGainEntry = {
      id: Date.now().toString(),
      name: stcgName,
      type: stcgType,
      purchasePrice: stcgPurchasePrice,
      currentPrice: stcgCurrentPrice,
      difference: stcgCurrentPrice - stcgPurchasePrice,
      dateAdded: new Date().toISOString()
    };
    
    setStcgEntries([newEntry, ...stcgEntries]);
    
    // Reset form
    setStcgName("");
    setStcgPurchasePrice(100000);
    setStcgCurrentPrice(90000);
  };

  // Add LTCG entry
  const addLtcgEntry = () => {
    if (!ltcgName.trim()) return;
    
    const newEntry: CapitalGainEntry = {
      id: Date.now().toString(),
      name: ltcgName,
      type: ltcgType,
      purchasePrice: ltcgPurchasePrice,
      currentPrice: ltcgCurrentPrice,
      difference: ltcgCurrentPrice - ltcgPurchasePrice,
      dateAdded: new Date().toISOString()
    };
    
    setLtcgEntries([newEntry, ...ltcgEntries]);
    
    // Reset form
    setLtcgName("");
    setLtcgPurchasePrice(100000);
    setLtcgCurrentPrice(90000);
  };

  // Delete entry functions
  const deleteStcgEntry = (id: string) => {
    setStcgEntries(stcgEntries.filter(entry => entry.id !== id));
  };

  const deleteLtcgEntry = (id: string) => {
    setLtcgEntries(ltcgEntries.filter(entry => entry.id !== id));
  };
  
  // Tax optimization recommendations based on the current state
  const getTaxOptimizationRecommendations = () => {
    const recommendations = [];
    
    if (stGainTotal > 0 && ltLossTotal > 0) {
      recommendations.push(
        "Consider booking short-term losses to offset short-term gains, as they're taxed at a higher rate."
      );
    }
    
    if (ltGainTotal > ltcgExemption) {
      recommendations.push(
        `Your long-term gains exceed the ₹1 lakh exemption limit by ${formatCurrency(ltGainTotal - ltcgExemption)}. Consider booking some long-term losses.`
      );
    }
    
    if (stLossTotal > 0 && stcgEntries.length > 0) {
      recommendations.push(
        "You've booked short-term losses which can offset both short-term and long-term gains, maximizing your tax benefits."
      );
    }
    
    if (ltLossTotal > 0 && stGainTotal > 0 && ltGainTotal < ltcgExemption) {
      recommendations.push(
        "Since your long-term gains are below the ₹1 lakh exemption, consider using your long-term losses in future assessment years when you might have taxable long-term gains."
      );
    }
    
    if (recommendations.length === 0) {
      recommendations.push(
        "Based on your current entries, no specific tax harvesting opportunities are identified. Add more entries to generate personalized recommendations."
      );
    }
    
    return recommendations;
  };

  // Data for summary charts
  const prepareSummaryChartData = () => {
    return [
      { name: 'ST Gains', value: stGainTotal },
      { name: 'ST Losses', value: stLossTotal },
      { name: 'LT Gains', value: ltGainTotal },
      { name: 'LT Losses', value: ltLossTotal },
    ];
  };

  // Data for tax comparison chart
  const prepareTaxComparisonData = () => {
    return [
      { name: 'Without Harvesting', value: totalTaxWithoutOpt },
      { name: 'With Harvesting', value: totalTaxWithOpt },
      { name: 'Tax Saved', value: taxSaved },
    ];
  };

  // Main component render
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <Calculator className="mr-2 h-6 w-6" />
          Tax Harvesting Calculator
        </h1>
        <p className="text-muted-foreground">
          Optimize your tax savings by strategically managing your capital gains and losses. 
          Use this calculator to track and plan your tax harvesting strategy.
        </p>
      </div>
      
      <Alert className="mb-6 border-amber-200 bg-amber-50 text-amber-800">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important Disclaimer:</strong> The tax calculations and projections shown are based on 
          current tax laws and historical data. Tax laws can change, and past performance does not guarantee 
          future results. This tool is for educational purposes only. Please consult with qualified tax 
          advisors for personalized tax advice and investment decisions.
        </AlertDescription>
      </Alert>
      
      {/* Educational Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="mr-2 h-5 w-5" />
            Understanding Tax Harvesting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Clipboard className="mr-2 h-4 w-4" />
            Tax Rates Summary
          </h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset Type</TableHead>
                  <TableHead>Short Term</TableHead>
                  <TableHead>Long Term</TableHead>
                  <TableHead>STCG Rate</TableHead>
                  <TableHead>LTCG Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Stocks/Equity Funds</TableCell>
                  <TableCell>&lt; 1 year</TableCell>
                  <TableCell>&gt; 1 year</TableCell>
                  <TableCell>15%</TableCell>
                  <TableCell>10% (&gt;₹1L)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Debt Funds</TableCell>
                  <TableCell>&lt; 3 years</TableCell>
                  <TableCell>&gt; 3 years</TableCell>
                  <TableCell>As per slab</TableCell>
                  <TableCell>20% with indexation</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Gold/REITs</TableCell>
                  <TableCell>&lt; 3 years</TableCell>
                  <TableCell>&gt; 3 years</TableCell>
                  <TableCell>As per slab</TableCell>
                  <TableCell>20% with indexation</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Key Rules for Tax Loss Harvesting in India</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">1️⃣ 8-Year Carry Forward Rule</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Losses can be carried forward for 8 assessment years</li>
                    <li>Must be declared in your ITR for the year of loss</li>
                    <li>Can be used against future capital gains</li>
                    <li>Short-term losses can offset both STCG and LTCG</li>
                    <li>Long-term losses can only offset LTCG</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">2️⃣ Important Deadlines</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>March 31st, 2025:</strong> Last date to book losses for FY 2024-25</li>
                    <li><strong>July 31st, 2025:</strong> ITR filing deadline (to claim losses)</li>
                    <li><strong>30-day cooling period:</strong> Required before repurchasing same security</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">3️⃣ Documentation Needed</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Trade contract notes</li>
                    <li>Bank statements showing transactions</li>
                    <li>Previous years' ITR if carrying forward losses</li>
                    <li>Cost inflation index details for LTCG</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">4️⃣ Practical Examples</h4>
                  
                  <div className="bg-muted p-3 rounded-md text-sm mb-3">
                    <p className="font-medium mb-1">Example 1: Using Short-term Loss</p>
                    <pre className="whitespace-pre-wrap">
                      Purchase: Infosys @ ₹1,500 × 100 shares = ₹1,50,000
                      Sale: @ ₹1,300 × 100 shares = ₹1,30,000
                      Loss: ₹20,000
                      Tax Saved: ₹3,000 (at 15% STCG rate)
                    </pre>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <p className="font-medium mb-1">Example 2: Carrying Forward Loss</p>
                    <pre className="whitespace-pre-wrap">
                      Year 1: Book loss of ₹50,000
                      Year 2: Offset ₹30,000 against gains
                      Year 3-8: Remaining ₹20,000 available
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Connected Financial Features */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Connected Financial Features
        </h2>
        <p className="mb-4">
          Your tax harvesting data is automatically integrated with these features to provide 
          comprehensive financial insights:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">
              Portfolio Simulator
            </h3>
            <ul className="space-y-1 text-sm">
              <li className="flex">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Tax-efficient investment strategies</span>
              </li>
              <li className="flex">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Risk-adjusted returns analysis</span>
              </li>
              <li className="flex">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Portfolio rebalancing suggestions</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">
              Goal Settings
            </h3>
            <ul className="space-y-1 text-sm">
              <li className="flex">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Tax savings contribution to goals</span>
              </li>
              <li className="flex">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Progress tracking with tax benefits</span>
              </li>
              <li className="flex">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Goal-based investment suggestions</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">
              Financial Calculators
            </h3>
            <ul className="space-y-1 text-sm">
              <li className="flex">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>After-tax returns calculation</span>
              </li>
              <li className="flex">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Tax-adjusted investment planning</span>
              </li>
              <li className="flex">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Future value projections</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Tax Bracket Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Select Your Income Tax Slab
        </label>
        <Select 
          value={taxBracket} 
          onValueChange={setTaxBracket}
        >
          <SelectTrigger className="w-full md:w-72">
            <SelectValue placeholder="Select tax bracket" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5%">5%</SelectItem>
            <SelectItem value="10%">10%</SelectItem>
            <SelectItem value="20%">20%</SelectItem>
            <SelectItem value="30%">30%</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          Your income tax bracket determines the tax rate for non-equity assets
        </p>
      </div>
      
      {/* Main tabs for STCG and LTCG */}
      <Tabs defaultValue="stcg" className="mb-8">
        <TabsList className="mb-2">
          <TabsTrigger value="stcg">
            <BarChart className="h-4 w-4 mr-2" />
            Short-Term Capital Gains
          </TabsTrigger>
          <TabsTrigger value="ltcg">
            <PieChart className="h-4 w-4 mr-2" />
            Long-Term Capital Gains
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="stcg">
          <Card>
            <CardHeader>
              <CardTitle>Short-Term Capital Gains</CardTitle>
              <CardDescription>
                Record short-term investments held for less than the qualifying period.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="stcg-name" className="block text-sm font-medium mb-1">
                        Investment Name
                      </label>
                      <Input
                        id="stcg-name"
                        placeholder="E.g., TCS Shares 2024"
                        value={stcgName}
                        onChange={(e) => setStcgName(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter a name to identify this investment
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="stcg-type" className="block text-sm font-medium mb-1">
                        Investment Type
                      </label>
                      <Select
                        value={stcgType}
                        onValueChange={setStcgType}
                      >
                        <SelectTrigger id="stcg-type">
                          <SelectValue placeholder="Select investment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Listed Stocks (Equity)">Listed Stocks (Equity)</SelectItem>
                          <SelectItem value="Equity Mutual Funds & ETFs">Equity Mutual Funds & ETFs</SelectItem>
                          <SelectItem value="Index & Sectoral Funds">Index & Sectoral Funds</SelectItem>
                          <SelectItem value="Real Estate">Real Estate</SelectItem>
                          <SelectItem value="REITs">REITs</SelectItem>
                          <SelectItem value="Gold ETFs & SGBs">Gold ETFs & SGBs</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <div className="bg-blue-50 p-2 rounded-md mt-2 text-sm text-blue-800 flex items-start">
                        <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-blue-600" />
                        <span>
                          Tax Rate: {stcgTaxInfo[stcgType]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="stcg-purchase-price" className="block text-sm font-medium mb-1">
                        Purchase Price (₹)
                      </label>
                      <Input
                        id="stcg-purchase-price"
                        type="number"
                        min={0}
                        step={1000}
                        value={stcgPurchasePrice}
                        onChange={(e) => setStcgPurchasePrice(Number(e.target.value))}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="stcg-current-price" className="block text-sm font-medium mb-1">
                        Current Market Price (₹)
                      </label>
                      <Input
                        id="stcg-current-price"
                        type="number"
                        min={0}
                        step={1000}
                        value={stcgCurrentPrice}
                        onChange={(e) => setStcgCurrentPrice(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Gain/Loss Display */}
              {stcgCurrentPrice !== stcgPurchasePrice && (
                <div 
                  className={`mt-4 p-3 rounded-md ${
                    stcgCurrentPrice > stcgPurchasePrice 
                      ? "bg-green-50 border border-green-100" 
                      : "bg-red-50 border border-red-100"
                  }`}
                >
                  <h3 
                    className={`text-lg font-semibold ${
                      stcgCurrentPrice > stcgPurchasePrice 
                        ? "text-green-700" 
                        : "text-red-700"
                    }`}
                  >
                    {stcgCurrentPrice > stcgPurchasePrice ? "Gain" : "Loss"}: 
                    {formatCurrency(Math.abs(stcgCurrentPrice - stcgPurchasePrice))}
                  </h3>
                </div>
              )}
              
              {/* Save Button */}
              <div className="mt-6">
                <Button 
                  onClick={addStcgEntry} 
                  disabled={!stcgName.trim()}
                  className="w-full"
                >
                  Save STCG Entry
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Display STCG Entries */}
          {stcgEntries.length > 0 && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clipboard className="h-4 w-4 mr-2" />
                  Saved Short-term Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Purchase Price</TableHead>
                        <TableHead>Current Price</TableHead>
                        <TableHead>Gain/Loss</TableHead>
                        <TableHead>Date Added</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stcgEntries.map(entry => (
                        <TableRow key={entry.id}>
                          <TableCell>{entry.name}</TableCell>
                          <TableCell>{entry.type}</TableCell>
                          <TableCell>{formatCurrency(entry.purchasePrice)}</TableCell>
                          <TableCell>{formatCurrency(entry.currentPrice)}</TableCell>
                          <TableCell className={
                            entry.difference > 0 ? "text-green-600" : "text-red-600"
                          }>
                            {entry.difference > 0 ? "+" : ""}{formatCurrency(entry.difference)}
                          </TableCell>
                          <TableCell>{format(new Date(entry.dateAdded), "dd MMM yyyy")}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => deleteStcgEntry(entry.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="ltcg">
          <Card>
            <CardHeader>
              <CardTitle>Long-Term Capital Gains</CardTitle>
              <CardDescription>
                Record long-term investments held for more than the qualifying period.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="ltcg-name" className="block text-sm font-medium mb-1">
                        Investment Name
                      </label>
                      <Input
                        id="ltcg-name"
                        placeholder="E.g., Infosys 2023"
                        value={ltcgName}
                        onChange={(e) => setLtcgName(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter a name to identify this investment
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="ltcg-type" className="block text-sm font-medium mb-1">
                        Investment Type
                      </label>
                      <Select
                        value={ltcgType}
                        onValueChange={setLtcgType}
                      >
                        <SelectTrigger id="ltcg-type">
                          <SelectValue placeholder="Select investment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Listed Stocks (Equity)">Listed Stocks (Equity)</SelectItem>
                          <SelectItem value="Equity Mutual Funds & ETFs">Equity Mutual Funds & ETFs</SelectItem>
                          <SelectItem value="Index & Sectoral Funds">Index & Sectoral Funds</SelectItem>
                          <SelectItem value="Real Estate">Real Estate</SelectItem>
                          <SelectItem value="REITs">REITs</SelectItem>
                          <SelectItem value="Gold ETFs & SGBs">Gold ETFs & SGBs</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <div className="bg-blue-50 p-2 rounded-md mt-2 text-sm text-blue-800 flex items-start">
                        <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-blue-600" />
                        <span>
                          Tax Rate: {ltcgTaxInfo[ltcgType]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="ltcg-purchase-price" className="block text-sm font-medium mb-1">
                        Purchase Price (₹)
                      </label>
                      <Input
                        id="ltcg-purchase-price"
                        type="number"
                        min={0}
                        step={1000}
                        value={ltcgPurchasePrice}
                        onChange={(e) => setLtcgPurchasePrice(Number(e.target.value))}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="ltcg-current-price" className="block text-sm font-medium mb-1">
                        Current Market Price (₹)
                      </label>
                      <Input
                        id="ltcg-current-price"
                        type="number"
                        min={0}
                        step={1000}
                        value={ltcgCurrentPrice}
                        onChange={(e) => setLtcgCurrentPrice(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Gain/Loss Display */}
              {ltcgCurrentPrice !== ltcgPurchasePrice && (
                <div 
                  className={`mt-4 p-3 rounded-md ${
                    ltcgCurrentPrice > ltcgPurchasePrice 
                      ? "bg-green-50 border border-green-100" 
                      : "bg-red-50 border border-red-100"
                  }`}
                >
                  <h3 
                    className={`text-lg font-semibold ${
                      ltcgCurrentPrice > ltcgPurchasePrice 
                        ? "text-green-700" 
                        : "text-red-700"
                    }`}
                  >
                    {ltcgCurrentPrice > ltcgPurchasePrice ? "Gain" : "Loss"}: 
                    {formatCurrency(Math.abs(ltcgCurrentPrice - ltcgPurchasePrice))}
                  </h3>
                </div>
              )}
              
              {/* Save Button */}
              <div className="mt-6">
                <Button 
                  onClick={addLtcgEntry} 
                  disabled={!ltcgName.trim()}
                  className="w-full"
                >
                  Save LTCG Entry
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Display LTCG Entries */}
          {ltcgEntries.length > 0 && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clipboard className="h-4 w-4 mr-2" />
                  Saved Long-term Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Purchase Price</TableHead>
                        <TableHead>Current Price</TableHead>
                        <TableHead>Gain/Loss</TableHead>
                        <TableHead>Date Added</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ltcgEntries.map(entry => (
                        <TableRow key={entry.id}>
                          <TableCell>{entry.name}</TableCell>
                          <TableCell>{entry.type}</TableCell>
                          <TableCell>{formatCurrency(entry.purchasePrice)}</TableCell>
                          <TableCell>{formatCurrency(entry.currentPrice)}</TableCell>
                          <TableCell className={
                            entry.difference > 0 ? "text-green-600" : "text-red-600"
                          }>
                            {entry.difference > 0 ? "+" : ""}{formatCurrency(entry.difference)}
                          </TableCell>
                          <TableCell>{format(new Date(entry.dateAdded), "dd MMM yyyy")}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => deleteLtcgEntry(entry.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Final Calculation Section */}
      {(stcgEntries.length > 0 || ltcgEntries.length > 0) && (
        <Card className="mb-8">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="flex items-center">
              <Calculator className="mr-2 h-5 w-5" />
              Final Calculation & Tax Harvesting Strategy
            </CardTitle>
            <CardDescription>
              Summary of your capital gains, losses, and optimized tax strategy
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left column - Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Summary of Gains & Losses</h3>
                
                <div className="space-y-6">
                  {/* STCG Summary */}
                  <div className="p-4 bg-slate-50 rounded-md">
                    <h4 className="font-medium mb-3 flex items-center">
                      <Check className="h-4 w-4 mr-2 text-blue-500" />
                      Short-Term (STCG & STCL) Summary:
                    </h4>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total ST Gains</span>
                        <div>
                          <span className="font-medium">{formatCurrency(stGainTotal)}</span>
                          <span className="text-xs text-muted-foreground ml-2">Taxable at 15%</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total ST Losses</span>
                        <div>
                          <span className="font-medium">{formatCurrency(stLossTotal)}</span>
                          <span className="text-xs text-muted-foreground ml-2">Can offset both ST/LT</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-sm font-medium">Net ST Gain/Loss</span>
                        <div className={netStGainLoss >= 0 ? "text-green-600" : "text-red-600"}>
                          <span className="font-medium">{formatCurrency(netStGainLoss)}</span>
                          <span className="text-xs ml-2">
                            {netStGainLoss >= 0 ? "Gain" : "Loss"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* LTCG Summary */}
                  <div className="p-4 bg-slate-50 rounded-md">
                    <h4 className="font-medium mb-3 flex items-center">
                      <Check className="h-4 w-4 mr-2 text-blue-500" />
                      Long-Term (LTCG & LTCL) Summary:
                    </h4>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total LT Gains</span>
                        <div>
                          <span className="font-medium">{formatCurrency(ltGainTotal)}</span>
                          <span className="text-xs text-muted-foreground ml-2">Taxable above ₹1L</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total LT Losses</span>
                        <div>
                          <span className="font-medium">{formatCurrency(ltLossTotal)}</span>
                          <span className="text-xs text-muted-foreground ml-2">Can offset only LT</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-sm font-medium">Net LT Gain/Loss</span>
                        <div className={netLtGainLoss >= 0 ? "text-green-600" : "text-red-600"}>
                          <span className="font-medium">{formatCurrency(netLtGainLoss)}</span>
                          <span className="text-xs ml-2">
                            {netLtGainLoss >= 0 ? "Gain" : "Loss"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Summary Charts */}
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart 
                        data={prepareSummaryChartData()} 
                        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `₹${value/1000}K`} />
                        <Tooltip 
                          formatter={(value) => formatCurrency(Number(value))}
                          labelStyle={{ color: '#333' }}
                        />
                        <Bar 
                          dataKey="value" 
                          fill="#4f46e5" 
                          name="Amount" 
                          radius={[4, 4, 0, 0]}
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Right column - Tax Savings */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Tax Savings & Optimization Analysis</h3>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-orange-50 rounded-md border border-orange-100">
                    <div className="flex items-center">
                      <Percent className="h-5 w-5 text-orange-500 mr-2" />
                      <span className="font-medium">Total Tax Payable Without Optimization:</span>
                    </div>
                    <span className="font-bold text-orange-700">{formatCurrency(totalTaxWithoutOpt)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-md border border-green-100">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="font-medium">Tax Saved After Harvesting:</span>
                    </div>
                    <span className="font-bold text-green-700">{formatCurrency(taxSaved)}</span>
                  </div>
                  
                  {/* Tax Comparison Chart */}
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart 
                        data={prepareTaxComparisonData()} 
                        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `₹${value/1000}K`} />
                        <Tooltip 
                          formatter={(value) => formatCurrency(Number(value))}
                          labelStyle={{ color: '#333' }}
                        />
                        <Bar 
                          dataKey="value" 
                          fill="#10b981" 
                          name="Amount" 
                          radius={[4, 4, 0, 0]}
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Recommendations */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                      Actionable Tax Optimization Recommendations
                    </h4>
                    
                    <div className="bg-blue-50 p-3 rounded-md text-sm border border-blue-100">
                      <p className="text-xs text-blue-800 italic mb-3">
                        <strong>Recommendation Notice:</strong> The following suggestions are general guidelines based on 
                        common tax-saving strategies. Your specific situation may require different 
                        approaches. Always verify current tax laws and consult tax professionals before 
                        implementing any tax-saving strategy.
                      </p>
                      
                      <ul className="space-y-2">
                        {getTaxOptimizationRecommendations().map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Final Tax Position */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clipboard className="mr-2 h-5 w-5" />
                Final Tax Position
              </h3>
              
              <div className="bg-green-50 p-4 rounded-md border border-green-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center mr-3">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-green-900">Final Tax Payable</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-700">{formatCurrency(totalTaxWithOpt)}</div>
                    <div className="text-sm text-green-600">
                      {taxSaved > 0 && 
                        <span>-{formatCurrency(taxSaved)}</span>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Save & Export Options */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Download className="mr-2 h-5 w-5" />
                Save & Export Options
              </h3>
              
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export as PDF
                </Button>
                
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Save to Portfolio
                </Button>
                
                <Button variant="outline">
                  <Calculator className="mr-2 h-4 w-4" />
                  Simulate Different Scenarios
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}