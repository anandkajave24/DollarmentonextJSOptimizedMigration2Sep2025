import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
// import type { TopPerformer } from "@shared/schema";
import { formatPercentage } from "@/utils/formatters";

export default function TopPerformers() {
  const { data: topPerformers, isLoading } = useQuery<any[]>({
    queryKey: ["/api/top-performers"],
  });
  
  if (isLoading) {
    return (
      <Card className="p-4 mt-4 mb-4">
        <Skeleton className="h-5 w-32 mb-3" />
        <div className="space-y-3">
          {[1, 2, 3].map((index) => (
            <div className="flex justify-between items-center" key={index}>
              <div>
                <Skeleton className="h-5 w-40 mb-1" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-5 w-16" />
            </div>
          ))}
        </div>
      </Card>
    );
  }
  
  if (!topPerformers || topPerformers.length === 0) {
    return (
      <Card className="p-4 mt-4 mb-4">
        <h3 className="text-base font-medium mb-3">Top Performers</h3>
        <div className="text-center py-4">
          <p>No top performers data available</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="p-4 mt-4 mb-4">
      <h3 className="text-base font-medium mb-3">Top Performers</h3>
      <div className="space-y-3">
        {topPerformers.map((performer) => (
          <div className="flex justify-between items-center" key={performer.id}>
            <div>
              <h4 className="font-medium">{performer.name}</h4>
              <p className="text-xs text-[#757575]">{performer.category} • {performer.type}</p>
            </div>
            <div className="text-success font-medium">+{formatPercentage(performer.returnPercentage)}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
