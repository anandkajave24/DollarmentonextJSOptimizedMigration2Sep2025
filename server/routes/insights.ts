import express, { Request, Response } from "express";
import { z } from "zod";
import OpenAI from "openai";

const router = express.Router();

// Investment params schema validation
const investmentParamsSchema = z.object({
  monthlySIPAmount: z.number().positive(),
  investmentPeriod: z.number().positive(),
  expectedReturn: z.number().positive(),
  targetAmount: z.number().positive().optional(),
  riskProfile: z.enum(["conservative", "moderate", "aggressive"]),
  goalType: z.string().optional(),
  inflationRate: z.number().optional(),
  stepUpRate: z.number().optional()
});

// Helper function to generate fallback insights without OpenAI
function generateFallbackInsights(params: any) {
  const { monthlySIPAmount, investmentPeriod, expectedReturn, targetAmount, riskProfile, inflationRate, stepUpRate, goalType } = params;
  
  // Different advice based on risk profile and investment period
  let advice: string[] = [];
  let fundTypes: string[] = [];
  let investmentStrategy = "";
  let riskAssessment = "";
  let nextSteps: string[] = [];
  
  // Personalized advice based on parameters
  if (investmentPeriod <= 3) {
    advice.push(`For your short ${investmentPeriod}-year horizon, consider focusing on capital preservation with limited equity exposure.`);
    advice.push(`A monthly SIP of ₹${monthlySIPAmount.toLocaleString('en-IN')} should ideally be invested in less volatile instruments.`);
  } else if (investmentPeriod <= 7) {
    advice.push(`With a ${investmentPeriod}-year horizon, a balanced approach mixing equity and debt is recommended.`);
    advice.push(`Your monthly SIP of ₹${monthlySIPAmount.toLocaleString('en-IN')} allows for moderate risk-taking to achieve better returns.`);
  } else {
    advice.push(`For your long ${investmentPeriod}-year investment horizon, you can take advantage of the power of compounding.`);
    advice.push(`A monthly SIP of ₹${monthlySIPAmount.toLocaleString('en-IN')} consistently invested over this period can build substantial wealth.`);
  }
  
  if (stepUpRate > 0) {
    advice.push(`Your annual step-up of ${stepUpRate}% is an excellent strategy to accelerate wealth creation with rising income.`);
  } else {
    advice.push(`Consider adding an annual step-up to your SIP as your income grows over time.`);
  }
  
  if (targetAmount) {
    advice.push(`To reach your target of ₹${targetAmount.toLocaleString('en-IN')}, staying disciplined with your investments is crucial.`);
  }
  
  advice.push(`With expected returns of ${expectedReturn}%, regular monitoring and rebalancing will help optimize performance.`);
  
  // Fund suggestions based on risk profile
  switch (riskProfile) {
    case "conservative":
      fundTypes = [
        "Debt Funds - Low volatility with stable returns",
        "Large Cap Funds - More stable equity exposure",
        "Corporate Bond Funds - Better yields than FDs with moderate risk",
        "Balanced Advantage Funds - Dynamic allocation to manage risk"
      ];
      investmentStrategy = "With your conservative risk profile, focus on capital preservation with steady growth. Allocate 20-30% to equity and the rest to debt instruments. This strategy prioritizes safety while allowing for some growth potential.";
      riskAssessment = "Your conservative approach is well-suited for preserving capital, but may lead to lower returns. Inflation impact over time could erode purchasing power if returns don't exceed inflation rate.";
      break;
    case "moderate":
      fundTypes = [
        "Flexi Cap Funds - Exposure across market caps",
        "Index Funds - Low-cost way to track market performance",
        "Hybrid Equity Funds - Balanced exposure to equity and debt",
        "Short Duration Debt Funds - Stability with better returns than savings"
      ];
      investmentStrategy = "With a moderate risk profile, a balanced 50:50 or 60:40 allocation between equity and debt is appropriate. This provides growth potential while managing volatility through diversification.";
      riskAssessment = "Your moderate approach balances risk and return well. Market fluctuations will affect your portfolio, but diversification should help cushion major downturns.";
      break;
    case "aggressive":
      fundTypes = [
        "Small & Mid Cap Funds - Higher growth potential with volatility",
        "Sectoral/Thematic Funds - Concentrated exposure to high-growth sectors",
        "Flexi Cap Funds - Diversification across market caps",
        "Focused Equity Funds - Concentrated high-conviction portfolios"
      ];
      investmentStrategy = "With an aggressive risk profile, you can allocate 70-80% to equity with emphasis on growth-oriented funds. This approach aims for maximum capital appreciation over the long term through higher risk exposure.";
      riskAssessment = "Your aggressive approach suits long-term goals where short-term volatility can be tolerated. Expect significant fluctuations but potentially higher long-term returns. Not suitable for short-term goals.";
      break;
  }
  
  // Standard next steps
  nextSteps = [
    "Set up auto-debit for your SIP to ensure disciplined investing",
    "Review your portfolio performance quarterly and rebalance annually",
    "Increase your SIP amount as your income grows",
    "Consider consulting a financial advisor for personalized guidance"
  ];
  
  return {
    personalizedAdvice: advice,
    suggestedFundTypes: fundTypes,
    investmentStrategy,
    riskAssessment,
    nextSteps
  };
}

// SIP investment insights endpoint
router.post("/sip-insights", async (req: Request, res: Response) => {
  try {
    // Validate request body
    const params = investmentParamsSchema.parse(req.body);
    
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log("OpenAI API key not configured, using fallback insights");
      return res.json(generateFallbackInsights(params));
    }
    
    try {
      // Initialize OpenAI client
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      
      // Create a prompt for generating investment insights
      const prompt = `As an investment advisor specializing in Indian financial products, provide personalized investment insights for a systematic investment plan (SIP) with the following parameters:

Monthly SIP Amount: ₹${params.monthlySIPAmount}
Investment Period: ${params.investmentPeriod} years
Expected Return: ${params.expectedReturn}%
Risk Profile: ${params.riskProfile}
${params.targetAmount ? `Target Amount: ₹${params.targetAmount}` : ''}
${params.goalType ? `Goal Type: ${params.goalType}` : ''}
${params.inflationRate ? `Inflation Rate: ${params.inflationRate}%` : ''}
${params.stepUpRate ? `Annual Step-Up Rate: ${params.stepUpRate}%` : ''}

Please provide:
1. Five specific, personalized pieces of advice for this investment
2. Four suitable fund types or instruments for this investment
3. A strategy explanation for this time horizon and risk profile
4. A risk assessment specifically for this investor's profile
5. Four specific next steps for the investor

Format your response as a JSON object with the following structure:
{
  "personalizedAdvice": ["advice1", "advice2", "advice3", "advice4", "advice5"],
  "suggestedFundTypes": ["fund1", "fund2", "fund3", "fund4"],
  "investmentStrategy": "detailed strategy explanation",
  "riskAssessment": "detailed risk assessment",
  "nextSteps": ["step1", "step2", "step3", "step4"]
}`;

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
        messages: [
          { 
            role: "system", 
            content: "You are an expert financial advisor specializing in Indian investments. Provide specific, actionable advice tailored to the investor's situation, focusing on Indian investment options and market conditions."
          },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      });
      
      // Parse the response
      const responseText = completion.choices[0].message.content;
      if (!responseText) {
        throw new Error("No response from OpenAI");
      }
      
      // Return the insights
      const insights = JSON.parse(responseText);
      res.json(insights);
      
    } catch (openaiError) {
      // If OpenAI call fails, use fallback insights
      console.error("OpenAI API error, using fallback insights:", openaiError);
      return res.json(generateFallbackInsights(params));
    }
    
  } catch (error) {
    console.error("Error generating investment insights:", error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid parameters", details: error.errors });
    }
    
    // Use fallback insights in case of any error
    try {
      const params = req.body;
      return res.json(generateFallbackInsights(params));
    } catch (fallbackError) {
      // If even fallback fails, return error
      return res.status(500).json({
        error: "Failed to generate investment insights", 
        message: "An error occurred while generating insights"
      });
    }
  }
});

export default router;