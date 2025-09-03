import OpenAI from "openai";

// Initialize OpenAI with API key from environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Risk profiles and their typical asset allocations
const riskProfiles = {
  conservative: {
    equity: "20-30%",
    debt: "50-60%",
    others: "10-20%",
    description: "Focus on capital preservation with minimal volatility",
    suitableFor: "Investors with low risk tolerance or short investment horizons"
  },
  moderate: {
    equity: "40-60%",
    debt: "30-40%",
    others: "10-20%",
    description: "Balanced approach for long-term wealth creation with manageable volatility",
    suitableFor: "Most retail investors with medium to long time horizons"
  },
  aggressive: {
    equity: "70-80%",
    debt: "10-20%",
    others: "5-10%",
    description: "Focus on capital appreciation with higher volatility tolerance",
    suitableFor: "Young investors with long time horizons or those comfortable with market fluctuations"
  }
};

// Fund categories based on investment style
const fundCategories = {
  equity: [
    "Large Cap Funds",
    "Mid Cap Funds",
    "Small Cap Funds",
    "Flexi Cap Funds",
    "Index Funds"
  ],
  debt: [
    "Liquid Funds",
    "Short Duration Funds",
    "Corporate Bond Funds",
    "Banking & PSU Funds",
    "Government Securities Funds"
  ],
  hybrid: [
    "Balanced Advantage Funds",
    "Aggressive Hybrid Funds",
    "Conservative Hybrid Funds",
    "Multi-Asset Allocation Funds"
  ]
};

// Interface for investment parameters
interface InvestmentParams {
  monthlySIPAmount: number;
  investmentPeriod: number;
  expectedReturn: number;
  targetAmount?: number;
  riskProfile: string;
  goalType?: string;
  inflationRate?: number;
  stepUpRate?: number;
}

// Interface for investment insights
export interface InvestmentInsights {
  personalizedAdvice: string[];
  suggestedFundTypes: string[];
  investmentStrategy: string;
  riskAssessment: string;
  nextSteps: string[];
}

// Function to generate investment insights using OpenAI
export async function generateInvestmentInsights(params: InvestmentParams): Promise<InvestmentInsights> {
  try {
    // Default insights if API call fails - using cautious, educational language
    const defaultInsights: InvestmentInsights = {
      personalizedAdvice: [
        `A hypothetical monthly investment of ₹${params.monthlySIPAmount.toLocaleString('en-IN')} for ${params.investmentPeriod} years could potentially be a disciplined approach for financial planning.`,
        `You might want to consider adjusting your investment amount periodically to account for inflation and potential income changes.`,
        params.targetAmount ? `For a goal of approximately ₹${params.targetAmount.toLocaleString('en-IN')}, consistent investments and regular reviews might be helpful.` : 
        `With a projected return of ${params.expectedReturn}%, periodic monitoring could be beneficial.`
      ],
      suggestedFundTypes: getSuggestedFunds(params.riskProfile),
      investmentStrategy: getInvestmentStrategy(params),
      riskAssessment: getRiskAssessment(params),
      nextSteps: [
        "Starting early could potentially help benefit from long-term compounding",
        "Setting up automated investments might help maintain discipline",
        "Periodically reviewing your financial strategy could be important",
        "Consider consulting a SEBI-registered financial advisor for personalized guidance tailored to your specific situation"
      ]
    };

    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log("OpenAI API key not available, using default insights");
      return defaultInsights;
    }

    // Prepare the prompt for OpenAI with educational/cautious language focus
    const prompt = `
You are providing educational content about SIP (Systematic Investment Plan) investments in India.
Generate educational investment insights for the following hypothetical scenario:

- Monthly SIP amount: ₹${params.monthlySIPAmount}
- Investment period: ${params.investmentPeriod} years
- Projected annual return: ${params.expectedReturn}%
- Risk profile: ${params.riskProfile}
${params.targetAmount ? `- Target amount: ₹${params.targetAmount}` : ''}
${params.goalType ? `- Investment goal: ${params.goalType}` : ''}
${params.inflationRate ? `- Considered inflation rate: ${params.inflationRate}%` : ''}
${params.stepUpRate ? `- Annual SIP step-up rate: ${params.stepUpRate}%` : ''}

IMPORTANT: Use cautious language - phrases like "could", "might", "potentially" instead of definitive statements like "will" or "should". Emphasize this is educational only.

Provide the following information in a JSON format:
1. personalizedAdvice: An array of 3-4 educational points about this hypothetical investment situation
2. suggestedFundTypes: An array of 4-5 general fund categories (NOT specific funds) that might be considered
3. investmentStrategy: A concise educational paragraph about possible investment approaches
4. riskAssessment: A concise description of how risk works in this hypothetical scenario
5. nextSteps: An array of 3-4 educational points including consulting a SEBI-registered financial advisor

Your response should be strictly in JSON format with these 5 keys. Ensure all values are strings or arrays of strings. Never recommend specific funds or definitive actions.
`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "You are providing educational content about financial planning. Use cautious language with terms like 'could', 'might', 'potentially' instead of definitive statements. Always emphasize consulting SEBI-registered advisors for personal advice. Never name specific funds or financial products."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    // Parse the response
    const content = response.choices[0].message.content;
    if (!content) {
      console.log("No content returned from OpenAI, using default insights");
      return defaultInsights;
    }

    try {
      const aiInsights = JSON.parse(content);
      return {
        personalizedAdvice: aiInsights.personalizedAdvice || defaultInsights.personalizedAdvice,
        suggestedFundTypes: aiInsights.suggestedFundTypes || defaultInsights.suggestedFundTypes,
        investmentStrategy: aiInsights.investmentStrategy || defaultInsights.investmentStrategy,
        riskAssessment: aiInsights.riskAssessment || defaultInsights.riskAssessment,
        nextSteps: aiInsights.nextSteps || defaultInsights.nextSteps
      };
    } catch (error) {
      console.error("Error parsing OpenAI response:", error);
      return defaultInsights;
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return {
      personalizedAdvice: [
        `A hypothetical monthly investment of ₹${params.monthlySIPAmount.toLocaleString('en-IN')} for ${params.investmentPeriod} years could potentially be a disciplined approach for financial planning.`,
        `You might want to consider adjusting your investment amount periodically to account for inflation and potential income changes.`,
        `With a projected return of ${params.expectedReturn}%, periodic monitoring could be beneficial.`
      ],
      suggestedFundTypes: getSuggestedFunds(params.riskProfile),
      investmentStrategy: getInvestmentStrategy(params),
      riskAssessment: getRiskAssessment(params),
      nextSteps: [
        "Starting early could potentially help benefit from long-term compounding",
        "Setting up automated investments might help maintain discipline",
        "Periodically reviewing your financial strategy could be important",
        "Consider consulting a SEBI-registered financial advisor for personalized guidance tailored to your specific situation"
      ]
    };
  }
}

// Helper function to get suggested fund types based on risk profile
function getSuggestedFunds(riskProfile: string): string[] {
  switch (riskProfile) {
    case "conservative":
      return [
        ...fundCategories.debt.slice(0, 2),
        fundCategories.hybrid[2], // Conservative Hybrid
        fundCategories.equity[0], // Large Cap
        fundCategories.equity[3]  // Flexi Cap
      ];
    case "aggressive":
      return [
        ...fundCategories.equity.slice(0, 3), // Large, Mid, Small Cap
        fundCategories.hybrid[1], // Aggressive Hybrid
        fundCategories.equity[4]  // Index Funds
      ];
    case "moderate":
    default:
      return [
        fundCategories.equity[0], // Large Cap
        fundCategories.equity[3], // Flexi Cap
        fundCategories.hybrid[0], // Balanced Advantage
        fundCategories.debt[1],   // Short Duration
        fundCategories.debt[2]    // Corporate Bond
      ];
  }
}

// Helper function to get investment strategy based on params - with cautious language
function getInvestmentStrategy(params: InvestmentParams): string {
  const { investmentPeriod, riskProfile, goalType } = params;
  
  if (investmentPeriod <= 3) {
    return `For a short-term horizon of ${investmentPeriod} years, you might want to consider focusing on capital preservation with a ${riskProfile} risk approach. Some investors in similar situations could potentially consider weighted allocation towards debt funds with limited equity exposure, but individual circumstances vary greatly.`;
  } else if (investmentPeriod <= 7) {
    return `For a medium-term horizon of ${investmentPeriod} years, a balanced approach with ${riskProfile} risk might be worth exploring. You could potentially consider a mix of equity and debt funds to potentially balance growth and stability, though this is educational information only.`;
  } else {
    return `For a long-term horizon of ${investmentPeriod} years, some investors might consider a ${riskProfile === "conservative" ? "more growth-oriented" : riskProfile} approach to potentially benefit from compounding. A strategy that includes some equity-oriented investments with periodic portfolio reviews could be worth discussing with a SEBI-registered financial advisor.`;
  }
}

// Helper function to get risk assessment - with cautious language
function getRiskAssessment(params: InvestmentParams): string {
  const { riskProfile, investmentPeriod } = params;
  const profile = riskProfiles[riskProfile as keyof typeof riskProfiles];
  
  if (investmentPeriod < 5 && riskProfile === "aggressive") {
    return `In this hypothetical scenario, a ${riskProfile} risk profile might potentially not align perfectly with a shorter investment horizon of ${investmentPeriod} years. Some financial educators suggest that exploring a more conservative approach for short-term goals could possibly help manage volatility risk, though individual circumstances vary greatly.`;
  } else if (investmentPeriod > 10 && riskProfile === "conservative") {
    return `With a longer investment horizon of ${investmentPeriod} years, a ${riskProfile} risk profile could potentially result in different growth outcomes compared to other approaches. Some investors in similar situations might discuss with their financial advisor whether a slightly different approach could potentially be suitable for long-term goals.`;
  } else {
    return `In this educational example, a ${riskProfile} risk profile combined with a ${investmentPeriod}-year investment horizon represents one possible approach to financial planning. Such an approach might typically involve around ${profile.equity} equity allocation in some scenarios and is generally discussed as potentially suitable for ${profile.suitableFor}, though individual financial situations vary widely.`;
  }
}