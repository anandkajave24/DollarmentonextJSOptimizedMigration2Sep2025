// Generate investment suggestions based on goal details by calling the server API
export async function generateInvestmentSuggestions(
  goalName: string,
  category: string,
  targetAmount: number,
  timeframe: string,
  risk: string = "moderate"
): Promise<string[]> {
  try {
    // Call our backend API instead of OpenAI directly
    const response = await fetch('/api/investment-suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        goalName,
        category, 
        targetAmount,
        timeframe,
        risk
      }),
      credentials: 'include' // Important for authenticated requests
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Extract suggestions from response
    if (data.suggestions && Array.isArray(data.suggestions)) {
      return data.suggestions;
    }
    
    throw new Error("Invalid response format from API");
  } catch (error) {
    console.error("Error generating investment suggestions:", error);
    // Fallback suggestions if API call fails
    return [
      `Option: Recurring deposits with major Indian banks - Safe option for ${category} goals with guaranteed returns.`,
      `Option: Liquid mutual funds - Better returns than savings accounts with high liquidity for ${goalName}.`,
      `Option: Balanced advantage funds - Dynamic allocation between equity and debt based on market conditions.`
    ];
  }
}