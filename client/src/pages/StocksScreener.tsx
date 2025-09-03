import { useState } from "react";
import { SEO } from '../components/SEO';
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";

type StockType = {
  id: number;
  name: string;
  ticker: string;
  price: number;
  change: number;
  marketCap: string;
  sector: string;
  pe: number;
  dividend: number;
  yearlyReturn: number;
};

export default function StocksScreener() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [peRange, setPeRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  const [stocks] = useState<StockType[]>([
    {
      id: 1,
      name: "Reliance Industries",
      ticker: "RELIANCE",
      price: 2456.75,
      change: 1.25,
      marketCap: "16.5K Cr",
      sector: "Energy",
      pe: 28.5,
      dividend: 0.35,
      yearlyReturn: 12.4
    },
    {
      id: 2,
      name: "HDFC Bank",
      ticker: "HDFCBANK",
      price: 1678.80,
      change: -0.45,
      marketCap: "9.3K Cr",
      sector: "Banking",
      pe: 22.1,
      dividend: 1.2,
      yearlyReturn: 8.7
    },
    {
      id: 3,
      name: "Infosys",
      ticker: "INFY",
      price: 1432.50,
      change: 2.10,
      marketCap: "6.1K Cr",
      sector: "IT",
      pe: 25.6,
      dividend: 2.8,
      yearlyReturn: 15.2
    },
    {
      id: 4,
      name: "Tata Consultancy Services",
      ticker: "TCS",
      price: 3245.90,
      change: 0.75,
      marketCap: "11.8K Cr",
      sector: "IT",
      pe: 29.8,
      dividend: 3.1,
      yearlyReturn: 14.5
    },
    {
      id: 5,
      name: "ICICI Bank",
      ticker: "ICICIBANK",
      price: 895.25,
      change: 1.15,
      marketCap: "6.3K Cr",
      sector: "Banking",
      pe: 19.5,
      dividend: 1.5,
      yearlyReturn: 18.9
    },
    {
      id: 6,
      name: "Hindustan Unilever",
      ticker: "HINDUNILVR",
      price: 2534.60,
      change: -0.25,
      marketCap: "5.9K Cr",
      sector: "FMCG",
      pe: 68.3,
      dividend: 1.8,
      yearlyReturn: 5.2
    },
    {
      id: 7,
      name: "Bharti Airtel",
      ticker: "BHARTIARTL",
      price: 764.80,
      change: 0.95,
      marketCap: "4.3K Cr",
      sector: "Telecom",
      pe: 36.2,
      dividend: 0.9,
      yearlyReturn: 22.6
    },
    {
      id: 8,
      name: "ITC Limited",
      ticker: "ITC",
      price: 395.35,
      change: 2.45,
      marketCap: "4.9K Cr",
      sector: "FMCG",
      pe: 21.7,
      dividend: 4.2,
      yearlyReturn: 34.8
    }
  ]);

  // Get unique sectors for filter dropdown
  const sectors = Array.from(new Set(stocks.map(stock => stock.sector)));

  // Filter stocks based on search term, sector, and PE ratio
  const filteredStocks = stocks.filter(stock => {
    const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         stock.ticker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === "" || stock.sector === selectedSector;
    const matchesPE = stock.pe >= peRange[0] && stock.pe <= peRange[1];
    
    return matchesSearch && matchesSector && matchesPE;
  });

  // Sort filtered stocks
  const sortedStocks = [...filteredStocks].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "price":
        comparison = a.price - b.price;
        break;
      case "change":
        comparison = a.change - b.change;
        break;
      case "pe":
        comparison = a.pe - b.pe;
        break;
      case "dividend":
        comparison = a.dividend - b.dividend;
        break;
      case "yearlyReturn":
        comparison = a.yearlyReturn - b.yearlyReturn;
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleSortChange = (newSortBy: string) => {
    if (sortBy === newSortBy) {
      // Toggle sort order if clicking the same column
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sort column and default to ascending
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
  };

  const handleAddWatchlist = (stockName: string) => {
    toast({
      title: "Added to Watchlist",
      description: `${stockName} has been added to your watchlist.`,
      duration: 3000,
    });
  };

  const getSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <>
      <SEO 
        title="Stock Screener - Advanced Stock Analysis & Filtering Tool"
        description="Screen and filter stocks using advanced criteria including P/E ratio, market cap, dividend yield, and technical indicators. Find the best investment opportunities with our comprehensive stock screener."
        keywords="stock screener, stock filter, stock analysis tool, investment screening, stock research tool, equity screener, stock finder, investment analysis tool"
        canonical="https://dollarmento.com/stocks-screener"
      />
      <div className="px-4 py-3">
      <div className="flex items-center mb-4">
        <button 
          onClick={() => window.history.back()}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <h2 className="text-xl font-semibold">Stocks Screener</h2>
      </div>

      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Search stocks by name or ticker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sector-filter">Sector</Label>
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger id="sector-filter">
                    <SelectValue placeholder="All Sectors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Sectors</SelectItem>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="sort-by">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort-by">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Company Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="change">% Change</SelectItem>
                    <SelectItem value="pe">P/E Ratio</SelectItem>
                    <SelectItem value="dividend">Dividend Yield</SelectItem>
                    <SelectItem value="yearlyReturn">1Y Return</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <Label>P/E Ratio Range</Label>
                <span className="text-sm">{peRange[0]} - {peRange[1]}</span>
              </div>
              <Slider
                min={0}
                max={100}
                step={1}
                value={peRange}
                onValueChange={(value) => setPeRange(value as [number, number])}
              />
            </div>
            
            <div className="flex justify-between space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSector("");
                  setPeRange([0, 100]);
                  setSortBy("name");
                  setSortOrder("asc");
                }}
              >
                Reset Filters
              </Button>
              
              <Button 
                size="sm"
                className="flex-1"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-base font-medium">Results ({sortedStocks.length})</h3>
        <div>
          <Badge variant={sortOrder === "asc" ? "default" : "secondary"} className="cursor-pointer" onClick={() => setSortOrder("asc")}>
            Asc
          </Badge>
          <Badge variant={sortOrder === "desc" ? "default" : "secondary"} className="cursor-pointer ml-1" onClick={() => setSortOrder("desc")}>
            Desc
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        {sortedStocks.map((stock) => (
          <Card key={stock.id} className="overflow-hidden border-l-4" style={{ borderLeftColor: stock.change >= 0 ? '#4caf50' : '#f44336' }}>
            <CardContent className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{stock.name}</h3>
                    <Badge variant="outline" className="ml-2 font-mono text-xs">{stock.ticker}</Badge>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {stock.sector} • Market Cap: {stock.marketCap}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${stock.price.toFixed(2)}</div>
                  <div className={stock.change >= 0 ? "text-green-600 text-xs" : "text-red-600 text-xs"}>
                    {stock.change >= 0 ? "+" : ""}{stock.change}%
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                <div className="bg-gray-50 p-1 rounded">
                  <p className="text-xs text-gray-500">P/E Ratio</p>
                  <p className="text-xs font-medium">{stock.pe.toFixed(1)}</p>
                </div>
                <div className="bg-gray-50 p-1 rounded">
                  <p className="text-xs text-gray-500">Dividend</p>
                  <p className="text-xs font-medium">{stock.dividend.toFixed(1)}%</p>
                </div>
                <div className="bg-gray-50 p-1 rounded">
                  <p className="text-xs text-gray-500">1Y Return</p>
                  <p className={`text-xs font-medium ${stock.yearlyReturn >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {stock.yearlyReturn >= 0 ? "+" : ""}{stock.yearlyReturn.toFixed(1)}%
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end mt-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => handleAddWatchlist(stock.name)}
                >
                  <span className="material-icons text-xs mr-1">visibility</span>
                  Add to Watchlist
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {sortedStocks.length === 0 && (
          <div className="text-center py-8">
            <span className="material-icons text-gray-400 text-4xl">search_off</span>
            <p className="mt-2 text-gray-500">No stocks match your filters</p>
            <Button 
              variant="link" 
              onClick={() => {
                setSearchTerm("");
                setSelectedSector("");
                setPeRange([0, 100]);
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}