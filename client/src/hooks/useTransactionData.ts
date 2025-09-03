import { useQuery } from "@tanstack/react-query";
// import type { Transaction, investment, Investment } from "@shared/schema";

// Create a type that combines transaction with investment name
type TransactionWithDetails = any & { 
  investmentName: string 
};

export default function useTransactionData() {
  const { 
    data: rawTransactions, 
    isLoading: isTransactionsLoading,
    isError: isTransactionsError
  } = useQuery<any[]>({
    queryKey: ["/api/transactions"],
  });
  
  const {
    data: investments,
    isLoading: isInvestmentsLoading,
    isError: isInvestmentsError
  } = useQuery<any[]>({
    queryKey: ["/api/investments"],
  });
  
  const {
    data: sips,
    isLoading: isSipsLoading,
    isError: isSipsError
  } = useQuery<any[]>({
    queryKey: ["/api/sips"],
  });
  
  // Combine transactions with investment names
  const transactions: TransactionWithDetails[] = rawTransactions && investments 
    ? rawTransactions.map(transaction => {
        const investment = investments.find(inv => inv.id === transaction.investmentId);
        return {
          ...transaction,
          investmentName: investment?.name || "Unknown Investment"
        };
      })
    : [];
  
  // Combine investments with investment names
  const sipsWithDetails = sips && investments
    ? sips.map(sip => {
        const investment = investments.find(inv => inv.id === sip.investmentId);
        return {
          ...sip,
          investmentName: investment?.name || "Unknown Investment"
        };
      })
    : [];
  
  return {
    transactions,
    sips: sipsWithDetails,
    isLoading: isTransactionsLoading || isInvestmentsLoading || isSipsLoading,
    isError: isTransactionsError || isInvestmentsError || isSipsError
  };
}
