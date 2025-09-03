import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency, formatPercentage } from "@/utils/formatters";
import type { AssetAllocation } from "@shared/schema";

export default function AssetAllocation() {
  const { data: assetAllocations, isLoading } = useQuery<AssetAllocation[]>({
    queryKey: ["/api/asset-allocations"],
  });
  
  if (isLoading) {
    return (
      <Card className="p-4">
        <Skeleton className="h-5 w-40 mb-3" />
        <div className="h-40 mb-3">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div className="flex items-center" key={index}>
              <Skeleton className="w-3 h-3 rounded-full mr-2" />
              <div className="flex-1">
                <Skeleton className="h-4 w-20 mb-1" />
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-8" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }
  
  if (!assetAllocations || assetAllocations.length === 0) {
    return (
      <Card className="p-4">
        <h3 className="text-base font-medium mb-3">Asset Allocation</h3>
        <div className="text-center py-4">
          <p>No asset allocation data available</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="p-4">
      <h3 className="text-base font-medium mb-3">Asset Allocation</h3>
      <div className="h-40 mb-3 flex justify-center items-center bg-gray-100 rounded-lg relative">
        {/* This would be replaced with a real chart in a production app */}
        <span className="material-icons text-5xl text-[#757575]">pie_chart</span>
        {/* Show percentages on the chart */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-bold">100%</p>
            <p className="text-xs text-[#757575]">Allocated</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {assetAllocations.map((asset) => (
          <div className="flex items-center" key={asset.id}>
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: asset.color }}></div>
            <div className="flex-1">
              <p className="text-sm">{asset.assetType}</p>
              <div className="flex justify-between">
                <p className="text-xs text-[#757575]">{formatPercentage(asset.percentage, 0)}</p>
                <p className="text-xs font-medium">{formatCurrency(asset.value)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
