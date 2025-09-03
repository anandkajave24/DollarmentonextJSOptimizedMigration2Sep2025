import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
// import type { MarketNews } from "@shared/schema";

export default function MarketNewsComponent() {
  const { data: marketNews, isLoading } = useQuery<any[]>({
    queryKey: ["/api/market-news"],
  });
  
  if (isLoading) {
    return (
      <Card className="p-4 mt-4">
        <Skeleton className="h-5 w-24 mb-3" />
        <div className="space-y-4">
          {[1, 2, 3].map((index) => (
            <div key={index} className={index > 1 ? "border-t border-gray-100 pt-4" : ""}>
              <Skeleton className="h-5 w-56 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-3 w-20 mt-1" />
            </div>
          ))}
        </div>
      </Card>
    );
  }
  
  if (!marketNews || marketNews.length === 0) {
    return (
      <Card className="p-4 mt-4">
        <h3 className="text-base font-medium mb-3">Market News</h3>
        <div className="text-center py-4">
          <p>No market news available</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="p-4 mt-4">
      <h3 className="text-base font-medium mb-3">Market News</h3>
      <div className="space-y-4">
        {marketNews.map((news, index) => (
          <div 
            key={news.id} 
            className={index > 0 ? "border-t border-gray-100 pt-4" : ""}
          >
            <h4 className="font-medium">{news.title}</h4>
            <p className="text-sm text-[#757575] mt-1">{news.content}</p>
            <p className="text-xs text-primary mt-1">{news.publishedTime}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
