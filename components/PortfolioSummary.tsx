import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import usePortfolioData from "@/hooks/usePortfolioData";
import { formatCurrency, formatPercentage } from "@/utils/formatters";

export default function PortfolioSummary() {
  const { portfolioSummary, isLoading } = usePortfolioData();
  
  if (isLoading) {
    return (
      <Card className="p-4 mb-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="flex flex-col items-end">
            <Skeleton className="h-6 w-20 mb-2" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      </Card>
    );
  }
  
  if (!portfolioSummary) {
    return (
      <Card className="p-4 mb-4">
        <div className="text-center py-4">
          <p>No portfolio data available</p>
        </div>
      </Card>
    );
  }
  
  const isPositiveDayGain = portfolioSummary.dayGainPercentage >= 0;
  const gainColorClass = isPositiveDayGain ? "text-success" : "text-[#F44336]";
  const gainIconName = isPositiveDayGain ? "arrow_upward" : "arrow_downward";
  const gainBgColorClass = isPositiveDayGain ? "bg-success" : "bg-[#F44336]";
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-medium">Total Portfolio Value</h2>
            <p className="text-2xl font-bold mt-1">{formatCurrency(portfolioSummary.totalValue)}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className={`flex items-center ${gainBgColorClass} bg-opacity-10 rounded-full px-2 py-1`}>
              <span className={`material-icons text-sm ${gainColorClass}`}>{gainIconName}</span>
              <span className={`text-sm ${gainColorClass} font-medium ml-1`}>{formatPercentage(portfolioSummary.dayGainPercentage)}</span>
            </div>
            <p className={`text-sm mt-1 ${gainColorClass} font-medium`}>
              {isPositiveDayGain ? "+" : ""}{formatCurrency(portfolioSummary.dayGainValue)} today
            </p>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <div>
            <p className="text-[#757575]">Invested</p>
            <p className="font-medium">{formatCurrency(portfolioSummary.invested)}</p>
          </div>
          <div>
            <p className="text-[#757575]">Returns</p>
            <p className="font-medium text-success">+{formatCurrency(portfolioSummary.returns)}</p>
          </div>
          <div>
            <p className="text-[#757575]">XIRR</p>
            <p className="font-medium text-success">{formatPercentage(portfolioSummary.xirr)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
