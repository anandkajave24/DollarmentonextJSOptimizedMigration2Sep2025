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
  BarChart, PieChart, TrendingUp, Clipboard, Percent, CircleDot, Timer
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
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
    maximumFractionDigits: 0,
    notation: amount > 99999 ? "compact" : "standard"
  }).format(amount);
};

// Format short currency for chart axis
const formatShortCurrency = (amount: number): string => {
  if (amount === 0) return "₹0";
  
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  
  return `₹${amount}`;
};

export default function TaxHarvesting() {
  const { toast } = useToast();
  // State for storing entries
  const [stcgEntries, setStcgEntries] = useState<CapitalGainEntry[]>([]);
  const [ltcgEntries, setLtcgEntries] = useState<CapitalGainEntry[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showNoDataWarning, setShowNoDataWarning] = useState<boolean>(false);
  
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

  // Tax rate information based on investment type - Updated as per Budget 2025
  const stcgTaxInfo: Record<string, string> = {
    "Listed Stocks (Equity)": "15% STCG tax rate",
    "Equity Mutual Funds & ETFs": "15% STCG tax rate",
    "Index & Sectoral Funds": "15% STCG tax rate",
    "Real Estate": "As per income tax slab",
    "REITs": "As per income tax slab",
    "Gold ETFs & SGBs": "As per income tax slab"
  };

  const ltcgTaxInfo: Record<string, string> = {
    "Listed Stocks (Equity)": "12.5% LTCG tax rate (flat, no indexation)",
    "Equity Mutual Funds & ETFs": "12.5% LTCG tax rate (flat, no indexation)",
    "Index & Sectoral Funds": "12.5% LTCG tax rate (flat, no indexation)",
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
  const netTotalGainLoss = netStGainLoss + netLtGainLoss;

  // Tax calculations for Indian market - Updated as per Budget 2025
  const stcgTaxRate = 0.15; // 15% for specified securities (equity)
  const ltcgTaxRate = 0.125; // 12.5% flat rate as per Budget 2025
  const ltcgExemption = 100000; // ₹1 lakh exemption

  // Calculate tax without optimization
  const stcgTaxWithoutOpt = Math.max(0, stGainTotal * stcgTaxRate);
  
  // LTCG tax applies only above ₹1 lakh (Budget 2025)
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
  
  // Tax savings calculation - include potential savings from harvested losses
  // Base calculation: difference between taxes without optimization and with optimization
  let taxSaved = totalTaxWithoutOpt - totalTaxWithOpt;
  
  // If there's no direct tax savings but there are losses that can be harvested
  if (taxSaved === 0 && (stLossTotal > 0 || ltLossTotal > 0)) {
    // Estimate potential future tax savings from short-term losses 
    // (can offset both STCG and LTCG in future years)
    if (stLossTotal > 0) {
      taxSaved += stLossTotal * stcgTaxRate;
    }
    
    // Estimate potential future tax savings from long-term losses
    // (can only offset LTCG in future years)
    if (ltLossTotal > 0) {
      taxSaved += ltLossTotal * ltcgTaxRate;
    }
  }

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
    
    // Show success toast
    toast({
      title: "STCG Entry Added",
      description: `${stcgName} added to calculation. See potential tax savings below.`,
      variant: "default",
    });
    
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
    
    // Show success toast
    toast({
      title: "LTCG Entry Added",
      description: `${ltcgName} added to calculation. See potential tax savings below.`,
      variant: "default",
    });
    
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
    
    // Recommendations for offsetting gains with losses
    if (stGainTotal > 0 && ltLossTotal > 0) {
      recommendations.push(
        "Harvest long-term losses to offset short-term gains for maximum tax savings."
      );
    }

    if (stGainTotal > 0 && stLossTotal === 0) {
      recommendations.push(
        "Look for short-term losses to harvest to offset your short-term gains, which are taxed at your income tax slab rate."
      );
    }
    
    if (ltGainTotal > ltcgExemption) {
      recommendations.push(
        `Your long-term gains exceed the ₹1 lakh exemption limit by ${formatCurrency(ltGainTotal - ltcgExemption)}. Consider booking some long-term losses.`
      );
    }
    
    // Recommendations for using LTCG exemption effectively
    if (ltGainTotal > 0 && ltGainTotal < ltcgExemption) {
      recommendations.push(
        `You can realize additional long-term gains up to ₹${formatCurrency(ltcgExemption - ltGainTotal)} tax-free this year.`
      );
    }
    
    // Recommendations when user has losses but no gains
    if (stLossTotal > 0 && stGainTotal === 0) {
      recommendations.push(
        "Your short-term losses can offset future short-term gains (saving 15% tax on equity investments)."
      );
    }
    
    if (ltLossTotal > 0 && ltGainTotal === 0) {
      recommendations.push(
        "Your long-term losses can offset future long-term gains (saving 12.5% tax on gains exceeding ₹1 lakh)."
      );
      recommendations.push(
        "Consider realizing some long-term gains before March 31st to utilize your loss offset."
      );
    }
    
    // Recommendation for carry-forward of losses
    if ((stLossTotal > 0 || ltLossTotal > 0) && netTotalGainLoss < 0) {
      recommendations.push(
        "File your tax return before the due date to legally carry forward losses for up to 8 assessment years."
      );
    }

    // Add default recommendations if none apply
    if (recommendations.length === 0) {
      recommendations.push(
        "Based on your current entries, no specific tax harvesting opportunities are identified. Add more entries to generate personalized recommendations."
      );
      recommendations.push(
        "Regularly review your investments for tax harvesting opportunities throughout the year."
      );
    }
    
    return recommendations;
  };

  // Data for summary charts
  const prepareSummaryChartData = () => {
    // Check if there's any data
    const hasData = stGainTotal > 0 || stLossTotal > 0 || ltGainTotal > 0 || ltLossTotal > 0;
    
    // If no data, provide sample data to make chart visible
    if (!hasData) {
      return [
        { name: 'ST Gains', value: 25000 },
        { name: 'ST Losses', value: 10000 },
        { name: 'LT Gains', value: 30000 },
        { name: 'LT Losses', value: 15000 },
      ];
    }
    
    return [
      { name: 'ST Gains', value: stGainTotal },
      { name: 'ST Losses', value: stLossTotal },
      { name: 'LT Gains', value: ltGainTotal },
      { name: 'LT Losses', value: ltLossTotal },
    ];
  };

  // Data for tax comparison chart
  const prepareTaxComparisonData = () => {
    // If all values are 0, provide sample data to make the chart visible
    const hasData = totalTaxWithoutOpt > 0 || totalTaxWithOpt > 0 || taxSaved > 0;
    
    if (!hasData) {
      // Sample data to ensure chart is visible
      return [
        { name: 'Without Harvesting', value: 15000 },
        { name: 'With Harvesting', value: 10000 },
        { name: 'Tax Savings', value: 5000 },
      ];
    }
    
    return [
      { name: 'Without Harvesting', value: totalTaxWithoutOpt },
      { name: 'With Harvesting', value: totalTaxWithOpt },
      { name: 'Tax Savings', value: taxSaved },
    ];
  };

  // Handle calculate button click
  const handleCalculate = () => {
    if (stcgEntries.length === 0 && ltcgEntries.length === 0) {
      setShowNoDataWarning(true);
      setTimeout(() => {
        setShowNoDataWarning(false);
      }, 3000);
      return;
    }
    
    setShowResults(true);
  };

  // Main component render
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="bg-blue-100 p-6 rounded-xl shadow-sm border border-blue-200 mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold flex items-center text-blue-800">
            <Calculator className="mr-3 h-7 w-7 text-blue-600" />
            Tax Harvesting Calculator
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Optimize your tax savings by strategically managing your capital gains and losses. 
            Use this calculator to track and plan your tax harvesting strategy based on Indian tax regulations.
          </p>
        </div>
      </div>
      
      {/* Tax Bracket Selection */}
      <div className="mb-8 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center mb-3">
          <Percent className="h-5 w-5 mr-2 text-blue-600" />
          <h2 className="text-lg font-medium">Income Tax Slab</h2>
        </div>
        
        <label className="block text-sm mb-2 text-gray-600">
          Select your income tax bracket to personalize calculations
        </label>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {["Nil", "5%", "20%", "30%", "New Regime"].map((bracket) => (
            <button
              key={bracket}
              onClick={() => setTaxBracket(bracket)}
              className={`py-2 px-4 rounded-md border transition-all ${
                taxBracket === bracket 
                  ? "bg-blue-100 border-blue-200 text-blue-700 font-medium shadow-sm" 
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {bracket}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3 flex items-center">
          <Info className="h-3 w-3 mr-1 text-blue-500" />
          This helps customize calculations for non-equity investments taxed as per your income slab.
        </p>
      </div>
      
      {/* STCG Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center text-blue-800">
            <BarChart className="h-5 w-5 mr-2 text-blue-600" />
            Short-Term Capital Gains
          </h2>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-full">
            Held &lt; 1 year
          </span>
        </div>
        
        <Card className="mb-4 border-blue-200 shadow-sm">
          <CardHeader className="bg-blue-100 border-b border-blue-200">
            <CardTitle className="flex items-center text-blue-800">
              <BarChart className="h-4 w-4 mr-2 text-blue-600" />
              Short-Term Capital Gains
            </CardTitle>
            <CardDescription className="text-blue-700">
              Record short-term investments held for less than the qualifying period.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="stcg-name" className="block text-sm font-medium mb-1">
                      Investment Name
                    </label>
                    <Input
                      id="stcg-name"
                      placeholder="e.g. Reliance Industries"
                      value={stcgName}
                      onChange={(e) => setStcgName(e.target.value)}
                    />
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
                    <p className="text-xs text-muted-foreground mt-1">
                      {stcgTaxInfo[stcgType]}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Purchase Price
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={stcgPurchasePrice}
                      onChange={(e) => setStcgPurchasePrice(Number(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Current Price / Sale Price
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={stcgCurrentPrice}
                      onChange={(e) => setStcgCurrentPrice(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="p-4 bg-slate-50 rounded-md mb-4">
                  <h4 className="font-medium mb-3">Investment Details</h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{stcgName || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{stcgType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Purchase Price:</span>
                      <span className="font-medium">{formatCurrency(stcgPurchasePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Price:</span>
                      <span className="font-medium">{formatCurrency(stcgCurrentPrice)}</span>
                    </div>
                    <div className="flex justify-between mt-1 pt-1 border-t">
                      <span className="text-muted-foreground">Gain/Loss:</span>
                      <span className={`font-medium ${
                        stcgCurrentPrice - stcgPurchasePrice > 0 
                          ? "text-green-600" 
                          : "text-red-600"
                      }`}>
                        {formatCurrency(stcgCurrentPrice - stcgPurchasePrice)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button onClick={addStcgEntry} className="w-full">
                  Add STCG Entry
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* LTCG Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center text-indigo-800">
            <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
            Long-Term Capital Gains
          </h2>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1.5 rounded-full">
            Held {">"} 1 year
          </span>
        </div>
        
        <Card className="mb-4 border-indigo-200 shadow-sm">
          <CardHeader className="bg-indigo-100 border-b border-indigo-200">
            <CardTitle className="flex items-center text-indigo-800">
              <TrendingUp className="h-4 w-4 mr-2 text-indigo-600" />
              Long-Term Capital Gains
            </CardTitle>
            <CardDescription className="text-indigo-700">
              Record long-term investments held for more than the qualifying period.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="ltcg-name" className="block text-sm font-medium mb-1">
                      Investment Name
                    </label>
                    <Input
                      id="ltcg-name"
                      placeholder="e.g. HDFC Bank"
                      value={ltcgName}
                      onChange={(e) => setLtcgName(e.target.value)}
                    />
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
                    <p className="text-xs text-muted-foreground mt-1">
                      {ltcgTaxInfo[ltcgType]}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Purchase Price
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={ltcgPurchasePrice}
                      onChange={(e) => setLtcgPurchasePrice(Number(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Current Price / Sale Price
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={ltcgCurrentPrice}
                      onChange={(e) => setLtcgCurrentPrice(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="p-4 bg-slate-50 rounded-md mb-4">
                  <h4 className="font-medium mb-3">Investment Details</h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{ltcgName || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{ltcgType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Purchase Price:</span>
                      <span className="font-medium">{formatCurrency(ltcgPurchasePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Price:</span>
                      <span className="font-medium">{formatCurrency(ltcgCurrentPrice)}</span>
                    </div>
                    <div className="flex justify-between mt-1 pt-1 border-t">
                      <span className="text-muted-foreground">Gain/Loss:</span>
                      <span className={`font-medium ${
                        ltcgCurrentPrice - ltcgPurchasePrice > 0 
                          ? "text-green-600" 
                          : "text-red-600"
                      }`}>
                        {formatCurrency(ltcgCurrentPrice - ltcgPurchasePrice)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button onClick={addLtcgEntry} className="w-full">
                  Add LTCG Entry
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Entries Summary */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* STCG Entries */}
          <div>
            <h3 className="text-lg font-semibold flex items-center mb-4 text-blue-800">
              <BarChart className="h-5 w-5 mr-2 text-blue-600" />
              STCG Entries
            </h3>
            
            {stcgEntries.length === 0 ? (
              <div className="text-center py-6 bg-gray-50 rounded-md border border-gray-200">
                <p className="text-muted-foreground">No short-term entries added yet</p>
              </div>
            ) : (
              <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left p-3 text-xs font-medium text-gray-500">Name</th>
                        <th className="text-right p-3 text-xs font-medium text-gray-500">Purchase</th>
                        <th className="text-right p-3 text-xs font-medium text-gray-500">Current</th>
                        <th className="text-right p-3 text-xs font-medium text-gray-500">Gain/Loss</th>
                        <th className="text-center p-3 text-xs font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stcgEntries.map((entry) => (
                        <tr key={entry.id} className="border-b border-gray-100">
                          <td className="p-3 text-sm font-medium">{entry.name}</td>
                          <td className="p-3 text-sm text-right">{formatCurrency(entry.purchasePrice)}</td>
                          <td className="p-3 text-sm text-right">{formatCurrency(entry.currentPrice)}</td>
                          <td className={`p-3 text-sm text-right font-medium ${
                            entry.difference > 0 ? "text-green-600" : "text-red-600"
                          }`}>
                            {formatCurrency(entry.difference)}
                          </td>
                          <td className="p-3 text-sm text-center">
                            <button 
                              className="text-red-500 hover:text-red-700"
                              onClick={() => deleteStcgEntry(entry.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          
          {/* LTCG Entries */}
          <div>
            <h3 className="text-lg font-semibold flex items-center mb-4 text-indigo-800">
              <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
              LTCG Entries
            </h3>
            
            {ltcgEntries.length === 0 ? (
              <div className="text-center py-6 bg-gray-50 rounded-md border border-gray-200">
                <p className="text-muted-foreground">No long-term entries added yet</p>
              </div>
            ) : (
              <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left p-3 text-xs font-medium text-gray-500">Name</th>
                        <th className="text-right p-3 text-xs font-medium text-gray-500">Purchase</th>
                        <th className="text-right p-3 text-xs font-medium text-gray-500">Current</th>
                        <th className="text-right p-3 text-xs font-medium text-gray-500">Gain/Loss</th>
                        <th className="text-center p-3 text-xs font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ltcgEntries.map((entry) => (
                        <tr key={entry.id} className="border-b border-gray-100">
                          <td className="p-3 text-sm font-medium">{entry.name}</td>
                          <td className="p-3 text-sm text-right">{formatCurrency(entry.purchasePrice)}</td>
                          <td className="p-3 text-sm text-right">{formatCurrency(entry.currentPrice)}</td>
                          <td className={`p-3 text-sm text-right font-medium ${
                            entry.difference > 0 ? "text-green-600" : "text-red-600"
                          }`}>
                            {formatCurrency(entry.difference)}
                          </td>
                          <td className="p-3 text-sm text-center">
                            <button 
                              className="text-red-500 hover:text-red-700"
                              onClick={() => deleteLtcgEntry(entry.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Calculate Button and No Data Warning */}
        {showNoDataWarning && (
          <Alert className="mt-6 border-red-200 bg-red-50 text-red-800">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription>
              Please add at least one STCG or LTCG entry before calculating tax savings.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="mt-6 text-center">
          <Button 
            size="lg" 
            onClick={handleCalculate} 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate
          </Button>
        </div>
        
        {/* Enhanced Tax Results Summary Box */}
        {showResults && (
          <div className="mt-8 bg-white p-6 rounded-lg border border-gray-300 shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calculator className="h-5 w-5 mr-2 text-blue-600" />
              Tax Results Summary
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* STCG Section */}
              <div className="bg-gray-100 p-5 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                  Short-Term Capital Gains
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Gains:</span>
                    <span className="font-medium">{formatCurrency(stGainTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Losses:</span>
                    <span className="font-medium">{formatCurrency(stLossTotal)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Net STCG:</span>
                    <span className={`font-medium ${netStGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(netStGainLoss)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">STCG Tax Rate:</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-700">Tax without harvesting:</span>
                    <span>{formatCurrency(stcgTaxWithoutOpt)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-700">Tax with harvesting:</span>
                    <span>{formatCurrency(stcgTaxWithOpt)}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between font-semibold">
                    <span className="text-gray-800">STCG Tax Savings:</span>
                    <span className="text-green-600">{formatCurrency(stcgTaxWithoutOpt - stcgTaxWithOpt)}</span>
                  </div>
                </div>
              </div>
              
              {/* LTCG Section */}
              <div className="bg-gray-100 p-5 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200 flex items-center">
                  <Timer className="h-4 w-4 mr-2 text-purple-600" />
                  Long-Term Capital Gains
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Gains:</span>
                    <span className="font-medium">{formatCurrency(ltGainTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Losses:</span>
                    <span className="font-medium">{formatCurrency(ltLossTotal)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Net LTCG:</span>
                    <span className={`font-medium ${netLtGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(netLtGainLoss)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">LTCG Tax Rate:</span>
                    <span className="font-medium">12.5% (above ₹1L)</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-700">Tax without harvesting:</span>
                    <span>{formatCurrency(ltcgTaxWithoutOpt)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-700">Tax with harvesting:</span>
                    <span>{formatCurrency(ltcgTaxWithOpt)}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between font-semibold">
                    <span className="text-gray-800">LTCG Tax Savings:</span>
                    <span className="text-green-600">{formatCurrency(ltcgTaxWithoutOpt - ltcgTaxWithOpt)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Total Tax Savings and Strategy Details */}
            <div className="mt-6 pt-5 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Overall Tax Summary */}
                <div className="col-span-1 md:col-span-2">
                  <h4 className="font-medium text-gray-800 mb-3">Total Tax Summary</h4>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div>
                          <div className="text-sm text-gray-600">Without Harvesting</div>
                          <div className="text-lg font-semibold">{formatCurrency(totalTaxWithoutOpt)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">With Harvesting</div>
                          <div className="text-lg font-semibold">{formatCurrency(totalTaxWithOpt)}</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">ST Losses Utilized</div>
                        <div className="text-lg font-semibold">{formatCurrency(Math.min(stLossTotal, stGainTotal))}</div>
                        <div className="text-sm text-gray-600 mt-2">LT Losses Utilized</div>
                        <div className="text-lg font-semibold">{formatCurrency(Math.min(ltLossTotal, ltGainTotal))}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Total Tax Savings Highlight */}
                <div className="col-span-1">
                  <h4 className="font-medium text-gray-800 mb-3">Tax Savings</h4>
                  <div className="bg-green-100 p-5 rounded-lg border border-green-200 shadow-sm text-center">
                    <div className="text-sm text-green-800 font-medium">Total Tax Savings</div>
                    <div className="text-3xl font-bold text-green-700 my-2">
                      {formatCurrency(taxSaved)}
                    </div>
                    {(stLossTotal > 0 || ltLossTotal > 0) && taxSaved > 0 && (
                      <div className="text-xs text-green-700 mt-1">
                        * Includes potential future savings from harvested losses
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Tax Savings Calculation Explanation */}
              <div className="mt-6 bg-blue-200 p-4 rounded-md border border-blue-300 shadow-sm">
                <div className="flex items-start">
                  <Calculator className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-2">How your tax savings are calculated:</p>
                    <div className="bg-blue-50 p-3 rounded border border-blue-200 mb-3">
                      <p className="mb-2 font-medium text-blue-800">Current Tax Savings:</p>
                      <ul className="space-y-1 list-disc pl-5">
                        <li>Tax without harvesting: {formatCurrency(totalTaxWithoutOpt)}</li>
                        <li>Tax with harvesting: {formatCurrency(totalTaxWithOpt)}</li>
                        <li>Direct tax savings: {formatCurrency(totalTaxWithoutOpt - totalTaxWithOpt)}</li>
                      </ul>
                      
                      {(stLossTotal > 0 || ltLossTotal > 0) && taxSaved > (totalTaxWithoutOpt - totalTaxWithOpt) && (
                        <>
                          <p className="mt-3 mb-2 font-medium text-blue-800">Potential Future Savings:</p>
                          <ul className="space-y-1 list-disc pl-5">
                            {stLossTotal > 0 && (
                              <li>From ST losses: {formatCurrency(stLossTotal * stcgTaxRate)} (at 15% tax rate)</li>
                            )}
                            {ltLossTotal > 0 && (
                              <li>From LT losses: {formatCurrency(ltLossTotal * ltcgTaxRate)} (at 12.5% tax rate)</li>
                            )}
                          </ul>
                        </>
                      )}
                      
                      <p className="mt-3 pt-2 border-t border-blue-50 font-medium text-blue-800">
                        Total Potential Savings: {formatCurrency(taxSaved)}
                      </p>
                    </div>
                    
                    <p className="font-medium mt-3 mb-2">Key Budget 2025 tax harvesting insights:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CircleDot className="h-3 w-3 mr-2 mt-1 text-blue-500" />
                        <span>LTCG is taxed at 12.5% with ₹1 lakh exemption (Budget 2025 change)</span>
                      </li>
                      <li className="flex items-start">
                        <CircleDot className="h-3 w-3 mr-2 mt-1 text-blue-500" />
                        <span>STCG on specified securities is taxed at a flat 15% rate (equity shares, equity mutual funds)</span>
                      </li>
                      <li className="flex items-start">
                        <CircleDot className="h-3 w-3 mr-2 mt-1 text-blue-500" />
                        <span>Short-term losses first offset short-term gains, then long-term gains</span>
                      </li>
                      <li className="flex items-start">
                        <CircleDot className="h-3 w-3 mr-2 mt-1 text-blue-500" />
                        <span>Long-term losses can only offset long-term gains after short-term gains are exhausted</span>
                      </li>
                      <li className="flex items-start">
                        <CircleDot className="h-3 w-3 mr-2 mt-1 text-blue-500" />
                        <span>Unused losses can be carried forward for up to 8 assessment years to offset future gains</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Results Section - Only visible after Calculate is clicked */}
      {showResults && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Calculator className="mr-2 h-5 w-5" />
            Tax Harvesting Results
          </h2>
          
          <div className="flex flex-wrap mb-8">
            <div className="w-full lg:w-1/2 lg:pr-3 mb-6 lg:mb-0">
              {/* Tax Comparison Chart */}
              <Card className="h-full">
                <CardHeader className="bg-green-100 border-b border-green-200">
                  <CardTitle className="text-green-800">Tax Comparison</CardTitle>
                  <CardDescription className="text-green-700">
                    Comparing taxes with and without tax harvesting strategy
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={prepareTaxComparisonData()}
                        layout="vertical"
                        margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          type="number" 
                          tickFormatter={(value) => formatShortCurrency(value)} 
                          fontSize={11}
                          tickMargin={5}
                          domain={[0, 'dataMax + 5000']}
                        />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          width={80} 
                          fontSize={11}
                          tickMargin={5}
                        />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Bar 
                          dataKey="value" 
                          fill="#3b82f6" 
                          name="Amount" 
                          radius={[0, 4, 4, 0]}
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded-md border border-green-100">
                      <div className="text-sm text-green-800 font-medium">Potential Tax Savings</div>
                      <div className="text-2xl font-bold text-green-700 mt-1">
                        {formatCurrency(taxSaved)}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-md border border-slate-100">
                      <div className="text-sm text-slate-800 font-medium">Optimized Tax Rate</div>
                      <div className="text-2xl font-bold text-slate-700 mt-1">
                        {totalTaxWithOpt === 0 || (stGainTotal + ltGainTotal) === 0
                          ? "0%"
                          : `${Math.round((totalTaxWithOpt / (stGainTotal + ltGainTotal)) * 100)}%`}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="w-full lg:w-1/2 lg:pl-3">
              {/* Gains and Losses Visualization */}
              <Card className="h-full">
                <CardHeader className="bg-blue-100 border-b border-blue-200">
                  <CardTitle className="text-blue-800">Capital Gains & Losses</CardTitle>
                  <CardDescription className="text-blue-700">
                    Summary of your short-term and long-term positions
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={prepareSummaryChartData()}
                        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="name" 
                          fontSize={11}
                          tickMargin={5}
                          interval={0}
                        />
                        <YAxis 
                          tickFormatter={(value) => formatShortCurrency(value)} 
                          fontSize={11}
                          tickMargin={5}
                          width={60}
                          domain={[0, 'dataMax + 5000']}
                        />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend fontSize={11} />
                        <Bar 
                          dataKey="value" 
                          name="Amount" 
                          fill="#3b82f6"
                          radius={[4, 4, 0, 0]} 
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded-md border border-green-100">
                      <div className="text-sm text-green-800 font-medium">Total Gains</div>
                      <div className="text-2xl font-bold text-green-700 mt-1">
                        {formatCurrency(stGainTotal + ltGainTotal)}
                      </div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-md border border-red-100">
                      <div className="text-sm text-red-800 font-medium">Total Losses</div>
                      <div className="text-2xl font-bold text-red-700 mt-1">
                        {formatCurrency(stLossTotal + ltLossTotal)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Tax Optimization Recommendations */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center">
              <Check className="h-5 w-5 mr-2 text-green-600" />
              Tax Optimization Recommendations
            </h3>
            <ul className="space-y-3">
              {getTaxOptimizationRecommendations().map((recommendation, index) => (
                <li key={index} className="flex text-green-700">
                  <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 text-green-600" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        
          {/* Educational Section */}
          <div>
            <Card className="mb-6">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="flex items-center text-base">
                  <Info className="mr-2 h-5 w-5 text-blue-500" />
                  Tax Harvesting Essentials
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {/* Tax Rates Grid */}
                <div className="mb-6">
                  <div className="bg-blue-50 p-2 rounded-t-md">
                    <h3 className="font-medium text-blue-700 flex items-center">
                      <Clipboard className="h-4 w-4 mr-2" />
                      Tax Rates Summary
                    </h3>
                  </div>
                  <div className="border border-blue-100 rounded-b-md overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="p-3 text-left font-medium">Asset Type</th>
                          <th className="p-3 text-left font-medium">Short Term</th>
                          <th className="p-3 text-left font-medium">Long Term</th>
                          <th className="p-3 text-left font-medium">STCG Rate</th>
                          <th className="p-3 text-left font-medium">LTCG Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="p-3 font-medium">Stocks/Equity Funds</td>
                          <td className="p-3">{"<"} 1 year</td>
                          <td className="p-3">{">"} 1 year</td>
                          <td className="p-3">15%</td>
                          <td className="p-3">12.5% (above ₹1L)</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="p-3 font-medium">Debt Funds</td>
                          <td className="p-3">{"<"} 3 years</td>
                          <td className="p-3">{">"} 3 years</td>
                          <td className="p-3">As per slab</td>
                          <td className="p-3">20% (no indexation)</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="p-3 font-medium">Property (pre-Jul 2024)</td>
                          <td className="p-3">{"<"} 2 years</td>
                          <td className="p-3">{">"} 2 years</td>
                          <td className="p-3">As per slab</td>
                          <td className="p-3">12.5% or 20% with indexation</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Gold/REITs</td>
                          <td className="p-3">{"<"} 3 years</td>
                          <td className="p-3">{">"} 3 years</td>
                          <td className="p-3">As per slab</td>
                          <td className="p-3">20% (no indexation)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Budget 2025 Changes */}
                  <div className="bg-blue-50 rounded-md p-3 mt-3 border border-blue-100">
                    <h4 className="font-medium flex items-center text-blue-800 mb-2">
                      <Info className="h-4 w-4 mr-2 text-blue-600" />
                      Budget 2025 Tax Changes
                    </h4>
                    <p className="text-sm text-blue-700">
                      The Union Budget 2025 brought several key changes to capital gains taxation:
                    </p>
                    <ul className="mt-2 text-sm text-blue-700 space-y-2 list-disc pl-5">
                      <li>LTCG on listed securities is now taxed at 12.5% (increased from 10%)</li>
                      <li>The ₹1 lakh exemption for LTCG on equity remains in place</li>
                      <li>STCG rate on equity shares and funds reduced to 15% (from 20%)</li>
                      <li>Indexation benefits partially restored (only for properties acquired before July 23, 2024)</li>
                      <li>Securities Transaction Tax (STT) remains unchanged</li>
                    </ul>
                    <div className="mt-2 bg-white rounded p-2 border border-blue-100">
                      <p className="font-medium text-blue-800">Example of new tax impact:</p>
                      <p className="text-sm text-blue-700">If you sell equity shares with:</p>
                      <ul className="text-sm text-blue-700 pl-5 list-disc">
                        <li>₹2,00,000 LTCG: You pay ₹12,500 in tax (12.5% of amount above ₹1L)</li>
                        <li>₹2,00,000 STCG: You pay ₹30,000 in tax (15% rate)</li>
                      </ul>
                    </div>
                    <p className="mt-2 text-sm text-blue-700 font-medium">
                      These changes make tax-loss harvesting strategies even more important for optimizing your investment returns.
                    </p>
                  </div>
                  
                  {/* Indexation Info */}
                  <div className="bg-green-50 rounded-md p-3 mt-3 border border-green-100">
                    <h4 className="font-medium flex items-center text-green-800 mb-2">
                      <Info className="h-4 w-4 mr-2 text-green-600" />
                      Partial Indexation Benefits in Budget 2025
                    </h4>
                    <p className="text-sm text-green-700">
                      For properties acquired before July 23, 2024, taxpayers can now choose between:
                    </p>
                    <ul className="text-sm text-green-700 mt-2 space-y-1 pl-5 list-disc">
                      <li>Paying 12.5% tax on LTCG without indexation benefits, or</li>
                      <li>Paying 20% tax on LTCG with indexation benefits</li>
                    </ul>
                    <p className="text-sm text-green-700 mt-2">
                      This option allows you to select the more beneficial tax treatment based on your specific situation. Indexation 
                      adjusts the purchase price of an asset to account for inflation, potentially reducing your taxable gains significantly.
                    </p>
                    <div className="mt-2 text-sm">
                      <p className="font-medium text-green-800">Calculation Formula:</p>
                      <div className="bg-white rounded p-2 mt-1 border border-green-100">
                        <code className="text-green-800">
                          Indexed Cost = Original Cost × (CII of Sale Year ÷ CII of Purchase Year)
                        </code>
                      </div>
                      <div className="mt-2 bg-white rounded p-2 border border-green-100">
                        <p className="font-medium text-green-800">Example: Which option is better?</p>
                        <p>Property purchased in 2018 for ₹50 lakhs, sold in 2025 for ₹75 lakhs</p>
                        <p>CII for 2018: 280, CII for 2025: 364</p>
                        <p>Indexed cost: ₹50,00,000 × (364 ÷ 280) = ₹65,00,000</p>
                        <p>Taxable gain without indexation: ₹25,00,000 (Tax @ 12.5% = ₹3,12,500)</p>
                        <p>Taxable gain with indexation: ₹10,00,000 (Tax @ 20% = ₹2,00,000)</p>
                        <p className="font-semibold text-green-800">Indexation saves ₹1,12,500 in this case!</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Key Rules Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                      <span className="flex items-center justify-center rounded-full bg-blue-100 w-6 h-6 text-blue-700 mr-2 text-sm font-bold">1</span>
                      8-Year Carry Forward Rule
                    </h4>
                    <ul className="space-y-2 pl-5 list-disc">
                      <li>Carry forward losses for 8 assessment years</li>
                      <li>Must declare in ITR for the year of loss</li>
                      <li>ST losses can offset both STCG and LTCG</li>
                      <li>LT losses can only offset LTCG</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                      <span className="flex items-center justify-center rounded-full bg-blue-100 w-6 h-6 text-blue-700 mr-2 text-sm font-bold">2</span>
                      Important Deadlines
                    </h4>
                    <ul className="space-y-2 pl-5 list-disc">
                      <li><strong>March 31st:</strong> Book losses for current FY</li>
                      <li><strong>July 31st:</strong> ITR filing deadline</li>
                      <li><strong>30-day cooling period:</strong> Before repurchase</li>
                    </ul>
                  </div>
                </div>
                
                {/* Examples Section */}
                <div className="bg-blue-50 rounded-md p-4 border border-blue-100">
                  <h4 className="font-medium text-blue-700 mb-3">Quick Examples</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium mb-2">Example 1: Short-term Loss</p>
                      <div className="bg-white p-3 rounded shadow-sm">
                        <p>Buy: Infosys @ ₹1,500 × 100 = ₹1,50,000</p>
                        <p>Sell: @ ₹1,300 × 100 = ₹1,30,000</p>
                        <p>Loss: ₹20,000</p>
                        <p className="font-medium text-green-600">Tax Savings: ₹3,000 (15% STCG rate)</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-2">Example 2: Carrying Forward</p>
                      <div className="bg-white p-3 rounded shadow-sm">
                        <p>Year 1: Book loss of ₹50,000</p>
                        <p>Year 2: Offset ₹30,000 against gains</p>
                        <p>Year 3-8: Use remaining ₹20,000</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-white p-3 rounded-md border border-blue-100">
                    <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                      Tax Harvesting Tips
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li><strong>Year-end review:</strong> Assess your portfolio in December/January to identify harvesting opportunities</li>
                      <li><strong>Avoid wash sales:</strong> Wait at least 30 days before repurchasing substantially identical securities</li>
                      <li><strong>Harvest losses strategically:</strong> Start with highest-cost tax lots first for maximum benefit</li>
                      <li><strong>Consider asset location:</strong> Hold tax-inefficient investments in tax-advantaged accounts</li>
                      <li><strong>Balance with investment goals:</strong> Don't compromise long-term investment strategy just for tax benefits</li>
                    </ul>
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
          </div>
        </div>
      )}
      
      {/* Disclaimer at bottom of page */}
      <Alert className="mb-8 border-amber-200 bg-amber-50 text-amber-800 rounded-lg shadow-sm">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <AlertDescription className="text-sm">
          <strong>Important Disclaimer:</strong> The tax calculations and projections shown are based on current tax laws and historical data. Tax 
          laws can change, and past performance does not guarantee future results. This tool is for educational purposes only. 
          Please consult with qualified tax advisors for personalized tax advice and investment decisions.
        </AlertDescription>
      </Alert>
    </div>
  );
}