import { useQuery } from "@tanstack/react-query";
// Using inline types since these aren't exported from schema

// Custom hook to fetch portfolio summary data
export function usePortfolioSummary() {
  return useQuery<any[]>({
    queryKey: ['/api/public/portfolio-summary'],
  });
}

// Custom hook to fetch asset allocations
export function useAssetAllocations() {
  return useQuery<any[]>({
    queryKey: ['/api/public/asset-allocations'],
  });
}

// Custom hook to fetch investments
export function useInvestments() {
  return useQuery<any[]>({
    queryKey: ['/api/public/investments'],
  });
}

// Custom hook to fetch transactions with optional limit
export function useTransactions(limit?: number) {
  return useQuery<any[]>({
    queryKey: ['/api/public/transactions', { limit }],
  });
}

// Custom hook to fetch active investments
export function useinvestments() {
  return useQuery<any[]>({
    queryKey: ['/api/public/sips'],
  });
}

// Custom hook to fetch market indices
export function useMarketIndices() {
  return useQuery<any[]>({
    queryKey: ['/api/public/market-indices'],
  });
}

// Custom hook to fetch top performers
export function useTopPerformers() {
  return useQuery<any[]>({
    queryKey: ['/api/public/top-performers'],
  });
}

// Custom hook to fetch market news
export function useMarketNews() {
  return useQuery<any[]>({
    queryKey: ['/api/public/market-news'],
  });
}

// Helper function to calculate financial health metrics
export function calculateFinancialHealth(
  portfolioSummary?: any,
  investments?: any[],
  transactions?: any[],
  sips?: any[]
) {
  if (!portfolioSummary || !investments || !transactions || !sips) {
    return {
      diversification: 0,
      consistentInvesting: 0,
      emergencyFund: 0,
      debtManagement: 0,
      savingsRate: 0,
      investmentGrowth: 0,
      overallHealth: 0
    };
  }

  // Calculate diversification score (0-100)
  // Higher score for more diverse investment types
  const investmentTypes = new Set(investments.map(inv => inv.type));
  const diversification = Math.min(investmentTypes.size * 20, 100);
  
  // Calculate consistent investing score (0-100)
  // Higher score for regular investments and consistent transaction history
  const sipTotal = sips.reduce((sum, sip) => sum + sip.amount, 0);
  // Estimate monthly income based on portfolio size
  const estimatedMonthlyIncome = Math.max(portfolioSummary.totalValue * 0.005, 50000); // 0.5% of portfolio or minimum 50k
  const consistentInvestingRatio = Math.min(sipTotal / (estimatedMonthlyIncome * 0.2), 1);
  const consistentInvesting = consistentInvestingRatio * 100;
  
  // Calculate emergency fund score (0-100)
  // Liquid investments should cover 3-6 months of expenses
  const liquidInvestments = investments
    .filter(inv => ['Liquid Fund', 'Savings Account', 'Fixed Deposit'].includes(inv.type))
    .reduce((sum, inv) => sum + inv.currentValue, 0);
  // Estimate monthly expenses based on portfolio size
  const estimatedMonthlyExpenses = Math.max(portfolioSummary.totalValue * 0.003, 30000); // 0.3% of portfolio or minimum 30k
  const emergencyFundRatio = Math.min(liquidInvestments / (estimatedMonthlyExpenses * 6), 1);
  const emergencyFund = emergencyFundRatio * 100;
  
  // Calculate debt management score (0-100)
  // Lower debt-to-income ratio is better
  const debts = investments
    .filter(inv => inv.type === 'Debt' || inv.type === 'Loan')
    .reduce((sum, inv) => sum + inv.currentValue, 0);
  const debtToIncomeRatio = debts / (estimatedMonthlyIncome * 12);
  const debtManagement = debtToIncomeRatio > 0.5 ? 50 : (1 - debtToIncomeRatio) * 100;
  
  // Calculate savings rate score (0-100)
  // Higher savings rate is better
  const monthlyInvestment = sipTotal + 
    (transactions
      .filter(t => t.type === 'purchase' && new Date(t.date).getMonth() === new Date().getMonth())
      .reduce((sum, t) => sum + t.amount, 0) / 30); // Average daily investment this month
  const savingsRateRatio = Math.min(monthlyInvestment / estimatedMonthlyIncome, 0.5);
  const savingsRate = (savingsRateRatio / 0.5) * 100;
  
  // Calculate investment growth score (0-100)
  // Higher returns are better
  const totalInvestedAmount = investments.reduce((sum, inv) => sum + inv.investedAmount, 0);
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const growthRatio = totalCurrentValue / totalInvestedAmount;
  const investmentGrowth = growthRatio > 1 ? Math.min((growthRatio - 1) * 100, 100) : 50;
  
  // Calculate overall financial health (weighted average)
  const overallHealth = Math.round(
    (diversification * 0.15) +
    (consistentInvesting * 0.2) +
    (emergencyFund * 0.2) +
    (debtManagement * 0.15) +
    (savingsRate * 0.15) +
    (investmentGrowth * 0.15)
  );
  
  return {
    diversification,
    consistentInvesting,
    emergencyFund,
    debtManagement,
    savingsRate,
    investmentGrowth,
    overallHealth
  };
}

// Helper function to calculate financial phase progress
export function calculatePhaseProgress(
  portfolioSummary?: any,
  investments?: any[],
  transactions?: any[],
  sips?: any[],
  allocations?: any[]
) {
  if (!portfolioSummary || !investments || !transactions || !sips || !allocations) {
    return {
      foundationPhase: 0,
      growthPhase: 0,
      independencePhase: 0,
      legacyPhase: 0,
      currentPhase: "foundation",
      foundationMilestones: 0,
      growthMilestones: 0,
      independenceMilestones: 0,
      legacyMilestones: 0
    };
  }

  // Calculate financial health
  const health = calculateFinancialHealth(portfolioSummary, investments, transactions, sips);
  
  // Check foundation phase milestones
  const hasEmergencyFund = health.emergencyFund > 70;
  const hasBasicInsurance = investments.some(inv => inv.type === 'Insurance');
  const hasBudget = true; // Assume budget is created for public data
  const hasRegularSavings = sips.length > 0;
  const hasDebtPlan = health.debtManagement > 70;
  
  const foundationMilestones = [
    hasEmergencyFund,
    hasBasicInsurance,
    hasBudget, 
    hasRegularSavings,
    hasDebtPlan
  ].filter(Boolean).length;
  
  const foundationPhase = Math.min(Math.round((foundationMilestones / 5) * 100), 100);
  
  // Check growth phase milestones
  const hasDiversifiedInvestments = health.diversification > 60;
  const hasRetirementContributions = investments.some(inv => inv.name.includes('Retirement') || inv.category.includes('Retirement'));
  const hasInvestmentStrategy = allocations.length >= 3;
  const hasConsistentInvesting = health.consistentInvesting > 70;
  const hasIncreasingNetWorth = portfolioSummary.totalValue > portfolioSummary.invested * 1.1;
  
  const growthMilestones = [
    hasDiversifiedInvestments,
    hasRetirementContributions,
    hasInvestmentStrategy,
    hasConsistentInvesting,
    hasIncreasingNetWorth
  ].filter(Boolean).length;
  
  // Growth phase can only progress if foundation is at least 70% complete
  const growthPhase = foundationPhase < 70 ? 0 : 
    Math.min(Math.round((growthMilestones / 5) * 100), 100);
  
  // Check independence phase milestones
  const hasSubstantialNestegg = portfolioSummary.totalValue > 2000000;
  const hasPassiveIncome = investments.filter(inv => inv.type === 'Dividend' || inv.type === 'Rental').length > 0;
  const hasLowDebt = health.debtManagement > 90;
  const hasAdvancedRiskManagement = portfolioSummary.totalValue > 0 && 
    investments.some(inv => inv.type === 'Gold' || inv.type === 'International');
  const hasFinancialIndependencePlan = investments.some(inv => 
    inv.name.includes('Financial Independence') || 
    inv.category.includes('Financial Independence'));
  
  const independenceMilestones = [
    hasSubstantialNestegg,
    hasPassiveIncome,
    hasLowDebt,
    hasAdvancedRiskManagement,
    hasFinancialIndependencePlan
  ].filter(Boolean).length;
  
  // Independence phase can only progress if growth is at least 70% complete
  const independencePhase = growthPhase < 70 ? 0 : 
    Math.min(Math.round((independenceMilestones / 5) * 100), 100);
  
  // Check legacy phase milestones
  const hasEstateManagement = false; // Placeholder for future implementation
  const hasCharitableGiving = false; // Placeholder for future implementation
  const hasSuccessionPlanning = false; // Placeholder for future implementation
  const hasTaxEfficiency = health.investmentGrowth > 15; // Placeholder assumption
  const hasWealth = portfolioSummary.totalValue > 10000000;
  
  const legacyMilestones = [
    hasEstateManagement,
    hasCharitableGiving, 
    hasSuccessionPlanning,
    hasTaxEfficiency,
    hasWealth
  ].filter(Boolean).length;
  
  // Legacy phase can only progress if independence is at least 70% complete
  const legacyPhase = independencePhase < 70 ? 0 : 
    Math.min(Math.round((legacyMilestones / 5) * 100), 100);
  
  // Determine current phase
  let currentPhase = "foundation";
  if (foundationPhase >= 85) {
    currentPhase = "growth";
    if (growthPhase >= 85) {
      currentPhase = "independence";
      if (independencePhase >= 85) {
        currentPhase = "legacy";
      }
    }
  }
  
  return {
    foundationPhase,
    growthPhase,
    independencePhase, 
    legacyPhase,
    currentPhase,
    foundationMilestones,
    growthMilestones,
    independenceMilestones,
    legacyMilestones
  };
}