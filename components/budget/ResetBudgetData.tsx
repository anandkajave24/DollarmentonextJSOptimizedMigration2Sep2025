import React from 'react';
import { Button } from '../ui/button';
import { useToast } from '../../hooks/use-toast';
import { DEFAULT_BUDGET_DATA } from '../../contexts/BudgetContext';

export const ResetBudgetData = () => {
  const { toast } = useToast();

  const handleReset = () => {
    // Clear budget data from localStorage
    localStorage.removeItem('budgetData');
    localStorage.removeItem('dailyExpenses');
    localStorage.removeItem('savingsGoals');

    // Set default budget data
    localStorage.setItem('budgetData', JSON.stringify(DEFAULT_BUDGET_DATA));
    localStorage.setItem('dailyExpenses', JSON.stringify([]));
    localStorage.setItem('savingsGoals', JSON.stringify([]));

    // Show toast notification
    toast({
      title: 'Budget data reset',
      description: 'All budget data has been reset to default values. Please refresh the page.',
    });

    // Refresh the page after a short delay
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <Button 
      variant="destructive" 
      onClick={handleReset}
      className="px-4 py-2 text-sm"
    >
      Reset Budget Data
    </Button>
  );
};