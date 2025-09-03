import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import type { MarketIndex } from "@shared/schema";
import { formatNumber, formatPercentage } from "@/utils/formatters";

export default function MarketIndices() {
  const { data: marketIndices, isLoading } = useQuery<MarketIndex[]>({
    queryKey: ["/api/market-indices"],
  });
  
  if (isLoading) {
    return (
      <Card className="p-4 mb-4">
        <Skeleton className="h-5 w-32 mb-3" />
        <div className="space-y-4">
          {[1, 2, 3].map((index) => (
            <div className="flex justify-between items-center" key={index}>
              <div>
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </Card>
    );
  }
  
  if (!marketIndices || marketIndices.length === 0) {
    return (
      <Card className="p-4 mb-4">
        <h3 className="text-base font-medium mb-3">Market Indices</h3>
        <div className="text-center py-4">
          <p>No market data available</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="p-4 mb-4">
      <h3 className="text-base font-medium mb-3">Market Indices</h3>
      <div className="space-y-4">
        {marketIndices.map((index) => {
          const isPositive = index.change >= 0;
          const changeColorClass = isPositive ? "text-success" : "text-[#F44336]";
          const changeBgColorClass = isPositive ? "bg-success" : "bg-[#F44336]";
          const changeIconName = isPositive ? "arrow_upward" : "arrow_downward";
          
          return (
            <div className="flex justify-between items-center" key={index.id}>
              <div>
                <h4 className="font-medium">{index.name}</h4>
                <p className="text-sm">{formatNumber(index.value)}</p>
              </div>
              <div className={`flex items-center ${changeBgColorClass} bg-opacity-10 rounded-full px-2 py-1`}>
                <span className={`material-icons text-sm ${changeColorClass}`}>
                  {changeIconName}
                </span>
                <span className={`text-sm ${changeColorClass} font-medium ml-1`}>
                  {isPositive ? "+" : ""}{formatPercentage(index.change)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
