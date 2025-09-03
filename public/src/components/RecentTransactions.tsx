import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Transaction } from "@shared/schema";
import { formatCurrency } from "@/utils/formatters";
import useTransactionData from "@/hooks/useTransactionData";

export default function RecentTransactions() {
  const { transactions, isLoading } = useTransactionData();
  const { toast } = useToast();
  
  const handleViewAll = () => {
    toast({
      title: "View All Transactions",
      description: "This feature will be available in the next version",
      duration: 2000,
    });
  };
  
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return { icon: "add_circle", color: "#4CAF50", bgColor: "rgba(76, 175, 80, 0.1)" };
      case "withdrawal":
        return { icon: "remove_circle", color: "#F44336", bgColor: "rgba(244, 67, 54, 0.1)" };
      case "sip":
        return { icon: "sync", color: "#1976D2", bgColor: "rgba(25, 118, 210, 0.1)" };
      default:
        return { icon: "schedule", color: "#757575", bgColor: "rgba(117, 117, 117, 0.1)" };
    }
  };
  
  const formatTransactionType = (type: string) => {
    switch (type) {
      case "purchase": return "Purchase";
      case "withdrawal": return "Withdrawal";
      case "sip": return "SIP Investment";
      default: return type;
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  if (isLoading) {
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-medium">Recent Transactions</h3>
          <button className="text-sm text-primary font-medium" onClick={handleViewAll}>View All</button>
        </div>
        
        <Card className="divide-y divide-gray-100">
          {[1, 2, 3].map((index) => (
            <div className="p-4" key={index}>
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <Skeleton className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <Skeleton className="h-5 w-20 mb-1" />
                    <Skeleton className="h-4 w-40 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          ))}
        </Card>
      </div>
    );
  }
  
  if (!transactions || transactions.length === 0) {
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-medium">Recent Transactions</h3>
          <button className="text-sm text-primary font-medium" onClick={handleViewAll}>View All</button>
        </div>
        
        <Card className="p-4">
          <div className="text-center py-4">
            <p>No recent transactions</p>
          </div>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-medium">Recent Transactions</h3>
        <button className="text-sm text-primary font-medium" onClick={handleViewAll}>View All</button>
      </div>
      
      <Card className="divide-y divide-gray-100">
        {transactions.map((transaction) => {
          const { icon, color, bgColor } = getTransactionIcon(transaction.type);
          
          return (
            <div className="p-4" key={transaction.id}>
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: bgColor }}
                  >
                    <span className="material-icons" style={{ color }}>
                      {icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{formatTransactionType(transaction.type)}</h4>
                    <p className="text-sm">{transaction.investmentName}</p>
                    <p className="text-xs text-[#757575] mt-1">{formatDate(transaction.date)}</p>
                  </div>
                </div>
                <p className="font-medium">{formatCurrency(transaction.amount)}</p>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
