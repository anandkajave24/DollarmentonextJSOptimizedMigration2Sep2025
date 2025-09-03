import axios from 'axios';

// Interface for investment parameters sent to the API
export interface InvestmentParams {
  monthlySIPAmount: number;
  investmentPeriod: number;
  expectedReturn: number;
  targetAmount?: number;
  riskProfile: string;
  goalType?: string;
  inflationRate?: number;
  stepUpRate?: number;
}

// Interface for investment insights returned from the API
export interface InvestmentInsights {
  personalizedAdvice: string[];
  suggestedFundTypes: string[];
  investmentStrategy: string;
  riskAssessment: string;
  nextSteps: string[];
}

/**
 * Fetches educational investment information for a hypothetical SIP scenario
 * @param params Investment parameters
 * @returns Promise with educational investment content
 */
export async function getSIPInsights(params: InvestmentParams): Promise<InvestmentInsights> {
  try {
    const response = await axios.post('/api/insights/sip-insights', params);
    return response.data;
  } catch (error) {
    console.error('Error fetching SIP educational content:', error);
    
    // Return default educational content in case of error (with cautious language)
    return {
      personalizedAdvice: [
        `A hypothetical monthly SIP of ₹${params.monthlySIPAmount.toLocaleString('en-IN')} for ${params.investmentPeriod} years could potentially be one disciplined approach to financial planning.`,
        `Some investors might consider gradually adjusting their SIP amount over time to potentially account for inflation and possible income changes.`,
        `With a projected return assumption of ${params.expectedReturn}%, periodic reviews of your financial strategy might be worth considering, though actual returns may vary significantly.`
      ],
      suggestedFundTypes: [
        "Index Funds - A category that aims to track market indices",
        "Flexi Cap Funds - Fund category with flexibility to invest across different market capitalizations",
        "Balanced Advantage Funds - A category with dynamic allocation between equity and debt",
        "Corporate Bond Funds - A category that typically focuses on corporate debt instruments"
      ],
      investmentStrategy: params.investmentPeriod <= 3 ? 
        "For shorter time horizons under 3 years, some financial educators suggest that exploring capital preservation strategies with limited equity exposure might be one potential approach, though individual circumstances vary greatly." :
        params.investmentPeriod <= 7 ?
        "For medium-term horizons of 3-7 years, financial education often discusses balanced allocation approaches between equity and debt instruments as one potential strategy, though appropriate approaches vary by individual." :
        "For longer-term horizons over 7 years, some financial concepts suggest that equity-oriented approaches might potentially be worth discussing with a SEBI-registered advisor, as longer time periods could possibly help manage market fluctuations.",
      riskAssessment: `In this educational example with a ${params.riskProfile} risk profile, some theoretical asset allocation models might discuss approximately ${
        params.riskProfile === 'conservative' ? '20-30%' :
        params.riskProfile === 'aggressive' ? '70-80%' : '40-60%'
      } equity allocation. This might be ${
        (params.investmentPeriod <= 3 && params.riskProfile === 'aggressive') ? 'potentially more volatile for shorter time horizons' :
        (params.investmentPeriod >= 10 && params.riskProfile === 'conservative') ? 'more conservative than what some educational materials suggest for longer time horizons' :
        'one approach discussed for similar time horizons in educational materials'
      }, though individual financial situations vary significantly.`,
      nextSteps: [
        "Starting investment planning early could potentially help benefit from long-term compounding effects",
        "Some investors might consider automated investment scheduling for discipline in their financial routine",
        "Periodic reviews of your financial strategy might be beneficial as circumstances change",
        "Consider consulting a SEBI-registered financial advisor for personalized guidance appropriate to your specific situation"
      ]
    };
  }
}