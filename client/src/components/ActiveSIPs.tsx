import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
// import type { investment } from "@shared/schema";
import { formatCurrency } from "@/utils/formatters";

export default function Activeinvestments() {
  const { data: sips, isLoading } = useQuery<any[]>({
    queryKey: ["/api/sips"],
  });
  
  const { toast } = useToast();
  
  const handleManageinvestments = () => {
    toast({
      title: "Manage investments",
      description: "This feature will be available in the next version",
      duration: 2000,
    });
  };
  
  const getNextinvestmentDate = (dayOfMonth: number) => {
    const today = new Date();
    let nextinvestmentDate = new Date(today.getFullYear(), today.getMonth(), dayOfMonth);
    
    if (today.getDate() >= dayOfMonth) {
      // If today's date is past the investment date, move to next month
      nextinvestmentDate.setMonth(nextinvestmentDate.getMonth() + 1);
    }
    
    return nextinvestmentDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-medium">Active investments</h3>
          <button className="text-sm text-primary font-medium" onClick={handleManageinvestments}>
            Manage
          </button>
        </div>
        
        <Card className="divide-y divide-gray-100">
          {[1, 2, 3].map((index) => (
            <div className="p-4" key={index}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <Skeleton className="h-5 w-40 mb-1" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="flex justify-between text-xs">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          ))}
        </Card>
      </div>
    );
  }
  
  if (!sips || sips.length === 0) {
    return (
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-medium">Active investments</h3>
          <button className="text-sm text-primary font-medium" onClick={handleManageinvestments}>
            Manage
          </button>
        </div>
        
        <Card className="p-4">
          <div className="text-center py-4">
            <p>No active investments found</p>
          </div>
        </Card>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-medium">Active investments</h3>
        <button className="text-sm text-primary font-medium" onClick={handleManageinvestments}>
          Manage
        </button>
      </div>
      
      <Card className="divide-y divide-gray-100">
        {sips.map((sip) => (
          <div className="p-4" key={sip.id}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{sip.investmentName}</h4>
                <p className="text-xs text-[#757575]">Every {sip.dayOfMonth}th of month</p>
              </div>
              <p className="font-medium">{formatCurrency(sip.amount)}</p>
            </div>
            <div className="flex justify-between text-xs">
              <p>Next: {getNextinvestmentDate(sip.dayOfMonth)}</p>
              <p className="text-success">{sip.installmentsCompleted} installments completed</p>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
