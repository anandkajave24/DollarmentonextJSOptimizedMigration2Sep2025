import { useQuery } from "@tanstack/react-query";
// import type { MarketIndex, TopPerformer, MarketNews } from "@shared/schema";

export default function useMarketData() {
  const { 
    data: marketIndices, 
    isLoading: isIndicesLoading,
    isError: isIndicesError
  } = useQuery<any[]>({
    queryKey: ["/api/market-indices"],
  });
  
  const {
    data: topPerformers,
    isLoading: isPerformersLoading,
    isError: isPerformersError
  } = useQuery<any[]>({
    queryKey: ["/api/top-performers"],
  });
  
  const {
    data: marketNews,
    isLoading: isNewsLoading,
    isError: isNewsError
  } = useQuery<any[]>({
    queryKey: ["/api/market-news"],
  });
  
  return {
    marketIndices,
    topPerformers,
    marketNews,
    isLoading: isIndicesLoading || isPerformersLoading || isNewsLoading,
    isError: isIndicesError || isPerformersError || isNewsError
  };
}
