import React from 'react';
import { Calculator, Table } from 'lucide-react';

interface CustomTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const CustomTabs: React.FC<CustomTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-6 grid w-full grid-cols-2 max-w-md mx-auto bg-gray-100 p-1 rounded-md">
      <button 
        onClick={() => setActiveTab("calculator")}
        className={`flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
          activeTab === "calculator" 
            ? "bg-blue-600 text-white"
            : "bg-transparent text-gray-700 hover:bg-gray-200"
        }`}
      >
        <Calculator className="mr-2 h-4 w-4" />
        Loan Summary
      </button>
      <button 
        onClick={() => setActiveTab("amortization")}
        className={`flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
          activeTab === "amortization" 
            ? "bg-blue-600 text-white"
            : "bg-transparent text-gray-700 hover:bg-gray-200"
        }`}
      >
        <Table className="mr-2 h-4 w-4" />
        Amortization Schedule
      </button>
    </div>
  );
};