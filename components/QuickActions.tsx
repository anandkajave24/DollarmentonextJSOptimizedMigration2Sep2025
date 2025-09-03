import { useToast } from "@/hooks/use-toast";

export default function QuickActions() {
  const { toast } = useToast();
  
  const handleInvest = () => {
    toast({
      title: "Invest",
      description: "Investment flow will be implemented in the next version",
      duration: 2000,
    });
  };
  
  const handleWithdraw = () => {
    toast({
      title: "Withdraw",
      description: "Withdrawal flow will be implemented in the next version",
      duration: 2000,
    });
  };
  
  const handleRebalance = () => {
    toast({
      title: "Rebalance",
      description: "Rebalance flow will be implemented in the next version",
      duration: 2000,
    });
  };
  
  return (
    <div className="flex justify-between my-4">
      <button 
        onClick={handleInvest}
        className="bg-primary text-white rounded-full px-4 py-2 text-sm font-medium flex items-center"
      >
        <span className="material-icons text-sm mr-1">add</span>
        Invest
      </button>
      <button 
        onClick={handleWithdraw}
        className="bg-white border border-primary text-primary rounded-full px-4 py-2 text-sm font-medium flex items-center"
      >
        <span className="material-icons text-sm mr-1">remove</span>
        Withdraw
      </button>
      <button 
        onClick={handleRebalance}
        className="bg-white border border-[#757575] text-[#212121] rounded-full px-4 py-2 text-sm font-medium flex items-center"
      >
        <span className="material-icons text-sm mr-1">swap_horiz</span>
        Rebalance
      </button>
    </div>
  );
}
