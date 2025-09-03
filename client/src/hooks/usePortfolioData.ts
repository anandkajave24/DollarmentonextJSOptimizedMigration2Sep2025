import { useQuery } from "@tanstack/react-query";
// import type { PortfolioSummary, AssetAllocation } from "@shared/schema";

export default function usePortfolioData() {
  const { 
    data: portfolioSummary, 
    isLoading: isSummaryLoading,
    isError: isSummaryError
  } = useQuery<any>({
    queryKey: ["/api/portfolio-summary"],
  });
  
  const {
    data: assetAllocations,
    isLoading: isAllocationLoading,
    isError: isAllocationError
  } = useQuery<any[]>({
    queryKey: ["/api/asset-allocations"],
  });
  
  return {
    portfolioSummary,
    assetAllocations,
    isLoading: isSummaryLoading || isAllocationLoading,
    isError: isSummaryError || isAllocationError
  };
}
