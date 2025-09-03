import { useQuery } from "@tanstack/react-query";
import type { MarketIndex, TopPerformer, MarketNews } from "@shared/schema";

export default function useMarketData() {
  const { 
    data: marketIndices, 
    isLoading: isIndicesLoading,
    isError: isIndicesError
  } = useQuery<MarketIndex[]>({
    queryKey: ["/api/market-indices"],
  });
  
  const {
    data: topPerformers,
    isLoading: isPerformersLoading,
    isError: isPerformersError
  } = useQuery<TopPerformer[]>({
    queryKey: ["/api/top-performers"],
  });
  
  const {
    data: marketNews,
    isLoading: isNewsLoading,
    isError: isNewsError
  } = useQuery<MarketNews[]>({
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
