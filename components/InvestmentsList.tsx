import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency, formatPercentage } from "@/utils/formatters";
import type { Investment } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function InvestmentsList() {
  const { data: investments, isLoading } = useQuery<Investment[]>({
    queryKey: ["/api/investments"],
  });
  
  const { toast } = useToast();
  
  const handleInvestmentClick = (investment: Investment) => {
    toast({
      title: investment.name,
      description: `Details will be available in the next version`,
      duration: 2000,
    });
  };
  
  if (isLoading) {
    return (
      <div>
        {[1, 2, 3].map((index) => (
          <Card className="mb-4" key={index}>
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Skeleton className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <Skeleton className="h-5 w-40 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-4" />
              </div>
            </div>
            <div className="px-4 py-3 grid grid-cols-2 gap-y-2 text-sm">
              <div>
                <Skeleton className="h-3 w-20 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div>
                <Skeleton className="h-3 w-20 mb-1" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div>
                <Skeleton className="h-3 w-20 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div>
                <Skeleton className="h-3 w-20 mb-1" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
  
  if (!investments || investments.length === 0) {
    return (
      <Card className="p-4">
        <div className="text-center py-4">
          <p>No investments found</p>
        </div>
      </Card>
    );
  }
  
  return (
    <div>
      {investments.map((investment) => {
        const isPositiveReturn = investment.returnPercentage >= 0;
        const returnColorClass = isPositiveReturn ? "text-success" : "text-[#F44336]";
        
        return (
          <Card className="mb-4" key={investment.id}>
            <div 
              className="flex justify-between items-center p-4 border-b border-gray-100 cursor-pointer"
              onClick={() => handleInvestmentClick(investment)}
            >
              <div className="flex items-center">
                <div 
                  className={`w-10 h-10 rounded-full bg-opacity-10 flex items-center justify-center mr-3`}
                  style={{ 
                    backgroundColor: investment.type === "Equity" 
                      ? "rgba(25, 118, 210, 0.1)" 
                      : investment.type === "Debt" 
                      ? "rgba(56, 142, 60, 0.1)" 
                      : "rgba(255, 152, 0, 0.1)"
                  }}
                >
                  <span 
                    className="material-icons" 
                    style={{ 
                      color: investment.type === "Equity" 
                        ? "#1976D2" 
                        : investment.type === "Debt" 
                        ? "#388E3C" 
                        : "#FF9800"
                    }}
                  >
                    {investment.iconType}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium">{investment.name}</h4>
                  <p className="text-xs text-[#757575]">{investment.category} • {investment.type}</p>
                </div>
              </div>
              <span className="material-icons text-[#757575]">chevron_right</span>
            </div>
            <div className="px-4 py-3 grid grid-cols-2 gap-y-2 text-sm">
              <div>
                <p className="text-[#757575] text-xs">Current Value</p>
                <p className="font-medium">{formatCurrency(investment.currentValue)}</p>
              </div>
              <div>
                <p className="text-[#757575] text-xs">Units</p>
                <p className="font-medium">{investment.units.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[#757575] text-xs">Invested</p>
                <p className="font-medium">{formatCurrency(investment.investedAmount)}</p>
              </div>
              <div>
                <p className="text-[#757575] text-xs">Returns</p>
                <p className={`font-medium ${returnColorClass}`}>
                  {isPositiveReturn ? "+" : ""}{formatPercentage(investment.returnPercentage)}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
