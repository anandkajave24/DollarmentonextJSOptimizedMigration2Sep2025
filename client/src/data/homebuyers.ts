// First-Time Home Buyer Financial Journey - 15 Stages
export interface HomeBuyerStageOption {
  id: string;
  label: string;
  description: string;
  impact: {
    netWorth: number;
    savings: number;
    debt?: number;
    emotion: number;
    knowledge: number;
    risk: number;
    creditScore: number;
    homeEquity: number;
  };
  consequences: {
    immediate: string;
    shortTerm: string;
    longTerm: string;
  };
}

export interface HomeBuyerGameStage {
  id: number;
  title: string;
  description: string;
  situation: string;
  age: number;
  monthlyIncome: number;
  context: string;
  options: HomeBuyerStageOption[];
  learningPoint: string;
}

export const homeBuyerStages: HomeBuyerGameStage[] = [
  {
    id: 1,
    title: "The Down Payment Dilemma",
    description: "Age 26: First apartment rent $1,800/month feels like throwing money away. Need $60K down payment for $300K house. Save vs buy decision.",
    situation: "🏠 THE DOWN PAYMENT DILEMMA\n\n💰 YOUR SITUATION:\nAge 26 • $6,500/month income • $25K saved\nCurrent rent: $1,800/month • Credit score: 720\n\n🏡 TARGET HOME:\n$300K house • Need $60K down (20%) • $2,070/month total\nRent vs Buy: $1,800 vs $2,070 monthly\n\n⏰ THE TIMELINE:\n• 3 more years to save full down payment\n• Home prices rising 5% annually\n• PMI option: $30K down + $180/month PMI\n\n⚡ KEY DECISION:\nSave 3 years for full down payment\nOR\nBuy now with PMI and start building equity\nOR\nMove to cheaper rental and save aggressively",
    age: 26,
    monthlyIncome: 6500,
    context: "First-time buyer decision: Weighing immediate homeownership costs against long-term wealth building and market timing.",
    options: [
      {
        id: "save_full_downpayment",
        label: "Save Full 20% Down Payment",
        description: "Continue renting for 3 years, save aggressively for $60K down payment to avoid PMI.",
        impact: { netWorth: 5000, savings: 43200, emotion: 1, knowledge: 3, risk: 1, creditScore: 10, homeEquity: 0 },
        consequences: {
          immediate: "Continued rent payments but building substantial down payment",
          shortTerm: "3 more years of renting while home prices potentially rise",
          longTerm: "Lower mortgage payments without PMI but may face higher home prices"
        }
      },
      {
        id: "buy_with_pmi",
        label: "Buy Now with 10% Down + PMI",
        description: "Purchase with $30K down payment, accept $180/month PMI, start building equity immediately.",
        impact: { netWorth: -5000, savings: -25000, debt: 270000, emotion: 2, knowledge: 2, risk: 3, creditScore: -20, homeEquity: 30000 },
        consequences: {
          immediate: "Homeownership achieved but higher monthly payments with PMI",
          shortTerm: "Building equity but paying extra $180/month until 20% equity reached",
          longTerm: "Earlier market entry but higher total mortgage costs"
        }
      },
      {
        id: "aggressive_saving",
        label: "Aggressive Saving + Market Timing",
        description: "Move to cheaper rental ($1,400), save $2,000/month, target house purchase in 18 months.",
        impact: { netWorth: 8000, savings: 36000, emotion: 0, knowledge: 3, risk: 2, creditScore: 5, homeEquity: 0 },
        consequences: {
          immediate: "Reduced lifestyle to maximize savings rate",
          shortTerm: "Faster timeline to homeownership with sacrifice in living situation",
          longTerm: "Quick path to homeownership but short-term lifestyle compromise"
        }
      }
    ],
    learningPoint: "First-time homebuying requires balancing market timing, PMI costs, and opportunity costs of down payment savings."
  },

  {
    id: 2,
    title: "Pre-Approval Reality Check",
    description: "Age 27: Bank pre-approves $400K mortgage. Real estate agent pushes $380K homes. Mortgage comfort vs maximum approval decision.",
    situation: "💳 MORTGAGE PRE-APPROVAL PRESSURE:\n\n🏦 BANK APPROVAL DETAILS:\n• Pre-approved Amount: $400,000\n• Monthly Payment at Max: $2,400 (P&I)\n• Total Monthly with Insurance/Tax: $2,850\n• Debt-to-Income Ratio: 44% (maximum allowed)\n• Current Income: $7,000/month\n\n🏠 REAL ESTATE MARKET REALITY:\n• Agent Recommended Range: $350K-$380K\n• \"Perfect\" House Found: $375K\n• Bidding War Potential: May need to offer $385K+\n• Market Competition: 15+ offers on desirable homes\n• Inventory: Limited options in lower price ranges\n\n💰 FINANCIAL COMFORT ANALYSIS:\n• Conservative Budget: $300K house = $1,900 total monthly\n• Moderate Budget: $340K house = $2,200 total monthly\n• Maximum Budget: $400K house = $2,850 total monthly\n• Emergency Fund Impact: $60K-$80K down payment\n\n📊 LIFESTYLE IMPACT:\n• Max Approval: $2,850 = 41% of income (tight budget)\n• Conservative: $1,900 = 27% of income (comfortable)\n• Moderate: $2,200 = 31% of income (reasonable)\n• Other Goals: Travel, dining, savings impacted\n\n⚠️ HIDDEN COSTS REALITY:\n• Home Inspection: $500\n• Appraisal: $600\n• Closing Costs: $8,000-$12,000\n• Moving Expenses: $2,000\n• Immediate Repairs/Updates: $5,000-$15,000",
    age: 27,
    monthlyIncome: 7000,
    context: "Pre-approval amount vs comfortable payment decision. Real estate pressure vs long-term financial health.",
    options: [
      {
        id: "maximum_approval",
        label: "Use Maximum Pre-Approval",
        description: "Buy $380K house using full pre-approval power. Competitive offer in hot market.",
        impact: { netWorth: -10000, savings: -76000, debt: 304000, emotion: 2, knowledge: 1, risk: 4, creditScore: -30, homeEquity: 76000 },
        consequences: {
          immediate: "Competitive in hot market but maximum financial commitment",
          shortTerm: "House-rich but cash-poor with limited financial flexibility",
          longTerm: "Significant home equity potential but constrained lifestyle budget"
        }
      },
      {
        id: "conservative_purchase",
        label: "Conservative Purchase Strategy",
        description: "Target $300K range, maintain emergency fund, ensure comfortable monthly payments under 30% of income.",
        impact: { netWorth: -3000, savings: -60000, debt: 240000, emotion: 1, knowledge: 3, risk: 2, creditScore: -15, homeEquity: 60000 },
        consequences: {
          immediate: "Limited home options but maintained financial flexibility",
          shortTerm: "Comfortable payments allow for other financial goals",
          longTerm: "Conservative approach enables financial growth and lifestyle maintenance"
        }
      },
      {
        id: "moderate_stretch",
        label: "Moderate Stretch Purchase",
        description: "Target $340K range, balance market competitiveness with financial comfort, 31% income ratio.",
        impact: { netWorth: -6000, savings: -68000, debt: 272000, emotion: 1, knowledge: 2, risk: 3, creditScore: -25, homeEquity: 68000 },
        consequences: {
          immediate: "Reasonable market position with manageable payment stretch",
          shortTerm: "Moderate financial adjustment period but sustainable long-term",
          longTerm: "Balanced approach between home equity building and financial flexibility"
        }
      }
    ],
    learningPoint: "Pre-approval maximums often exceed comfortable payment levels. Focus on long-term affordability, not maximum qualification."
  },

  {
    id: 3,
    title: "Bidding War Strategy",
    description: "Age 27: Found perfect $340K house. 12 other offers expected. Escalation clause vs cash offer vs walking away decision.",
    situation: "🏠 COMPETITIVE BIDDING SCENARIO:\n\n📋 PROPERTY DETAILS:\n• List Price: $340,000\n• Market Value: Estimated $345K-$355K\n• Condition: Move-in ready, no major repairs needed\n• Location: Ideal neighborhood, great schools\n• Days on Market: 3 days (hot property)\n\n💥 BIDDING WAR INTELLIGENCE:\n• Expected Offers: 12-15 offers\n• Typical Winning Bid: 8-12% over asking\n• Estimated Winning Price: $370K-$380K\n• Seller Preferences: Quick close, minimal contingencies\n• Your Current Offer: $350K with standard contingencies\n\n💰 BIDDING STRATEGIES AVAILABLE:\n• Escalation Clause: Auto-increase to $10K over highest bid up to $375K\n• Cash-Like Offer: Waive appraisal contingency (risk if appraisal comes low)\n• All-Cash Appearance: Get bridge loan, close fast, refinance later\n• Walk Away: Continue searching in this competitive market\n\n📊 FINANCIAL RISK ANALYSIS:\n• Escalation to $375K: Monthly payment increases $200\n• Waived Appraisal Risk: Could owe $5K-$15K if appraisal low\n• Bridge Loan Costs: $3K in fees but competitive advantage\n• Continued Search: Market getting more expensive monthly",
    age: 27,
    monthlyIncome: 7000,
    context: "Hot real estate market requires strategic bidding decisions balancing dream home acquisition with financial prudence.",
    options: [
      {
        id: "aggressive_escalation",
        label: "Aggressive Escalation Clause",
        description: "Escalation clause up to $375K + waive appraisal contingency. All-in approach to win the house.",
        impact: { netWorth: -8000, savings: -75000, debt: 300000, emotion: 2, knowledge: 2, risk: 4, creditScore: -25, homeEquity: 75000 },
        consequences: {
          immediate: "High probability of winning bid but maximum financial exposure",
          shortTerm: "Higher monthly payments and potential appraisal gap payment",
          longTerm: "Dream home secured but at premium price affecting other financial goals"
        }
      },
      {
        id: "strategic_competitive",
        label: "Strategic Competitive Offer",
        description: "$360K offer + flexible closing + inspection waiver. Competitive but not maximum risk.",
        impact: { netWorth: -5000, savings: -72000, debt: 288000, emotion: 1, knowledge: 3, risk: 3, creditScore: -20, homeEquity: 72000 },
        consequences: {
          immediate: "Reasonable chance of winning with manageable financial risk",
          shortTerm: "Moderate payment increase with some contingency risk",
          longTerm: "Balanced approach between home acquisition and financial stability"
        }
      },
      {
        id: "walk_away",
        label: "Walk Away and Continue Search",
        description: "Don't participate in bidding war. Continue searching for better value or market cooling.",
        impact: { netWorth: 0, savings: 0, emotion: -1, knowledge: 2, risk: 1, creditScore: 0, homeEquity: 0 },
        consequences: {
          immediate: "Avoided overpaying but lost ideal home opportunity",
          shortTerm: "Continued renting while searching in competitive market",
          longTerm: "May find better value or face continued price increases"
        }
      }
    ],
    learningPoint: "Bidding wars test financial discipline. Set maximum budgets beforehand and stick to them despite emotional attachment."
  },

  {
    id: 4,
    title: "Closing Cost Shock",
    description: "Age 28: Three days before closing, final settlement statement shows $14K in closing costs vs expected $8K. Cash shortage crisis.",
    situation: "📋 CLOSING COST SURPRISE:\n\n💰 ORIGINAL BUDGET vs REALITY:\n• Expected Closing Costs: $8,000\n• Actual Settlement Statement: $14,000\n• Down Payment: $68,000 (already committed)\n• Total Cash Needed: $82,000\n• Available Cash: $75,000\n• Shortage: $7,000\n\n📊 UNEXPECTED COST BREAKDOWN:\n• Lender Fees: $2,500 (vs expected $1,500)\n• Title Insurance: $2,100 (vs expected $1,200)\n• Property Tax Escrow: $3,200 (6 months vs 3 months expected)\n• HOA Transfer Fees: $800 (not disclosed earlier)\n• Appraisal Adjustment: $1,400 (second appraisal required)\n\n⚠️ CLOSING TIMELINE PRESSURE:\n• Closing Date: 3 days away\n• Rate Lock Expires: In 5 days\n• Seller Alternative Offers: Backup buyers waiting\n• Current Interest Rate: 6.5% (vs 7.2% if re-apply)\n\n💡 IMMEDIATE OPTIONS AVAILABLE:\n• Personal Loan: $10K at 12% interest for 3 years\n• Credit Card Cash Advance: $7K at 24% APR\n• Family Loan: Parents offer $10K at 0% interest\n• Seller Credit: Request $5K seller concession (may be rejected)\n• Walk Away: Lose $1,500 in inspection/appraisal costs\n\n📈 LONG-TERM IMPLICATIONS:\n• Delayed Closing: Risk losing house and rate lock\n• Additional Debt: Impact on debt-to-income ratio\n• Emergency Fund: Completely depleted",
    age: 28,
    monthlyIncome: 7200,
    context: "Last-minute closing cost increases create cash shortage crisis requiring immediate funding decisions.",
    options: [
      {
        id: "family_loan",
        label: "Accept Family Loan",
        description: "Borrow $10K from parents at 0% interest, agree to structured repayment plan.",
        impact: { netWorth: -2000, savings: -75000, debt: 278000, emotion: 0, knowledge: 2, risk: 2, creditScore: -20, homeEquity: 72000 },
        consequences: {
          immediate: "Closing proceeds smoothly with family financial support",
          shortTerm: "No interest costs but family financial obligation",
          longTerm: "Homeownership achieved with manageable family debt to repay"
        }
      },
      {
        id: "personal_loan",
        label: "Take Personal Loan",
        description: "$10K personal loan at 12% interest for 3 years. Independent financing solution.",
        impact: { netWorth: -4000, savings: -75000, debt: 288000, emotion: -1, knowledge: 3, risk: 3, creditScore: -40, homeEquity: 72000 },
        consequences: {
          immediate: "Closing proceeds but with additional high-interest debt",
          shortTerm: "$340/month additional debt payments for 3 years",
          longTerm: "Homeownership achieved but higher total debt burden"
        }
      },
      {
        id: "renegotiate_closing",
        label: "Renegotiate with Seller",
        description: "Request $7K seller concession and delay closing by 1 week. Risk losing deal.",
        impact: { netWorth: 0, savings: -68000, debt: 271000, emotion: -2, knowledge: 3, risk: 4, creditScore: -15, homeEquity: 75000 },
        consequences: {
          immediate: "Risk of losing house if seller refuses concession",
          shortTerm: "Potential loss of rate lock and need to restart process",
          longTerm: "Either better deal achieved or back to house hunting"
        }
      }
    ],
    learningPoint: "Always budget 15-20% above estimated closing costs. Last-minute surprises are common in real estate transactions."
  },

  {
    id: 5,
    title: "First Home Maintenance Reality",
    description: "Age 28: Month 3 of homeownership. AC breaks ($4K repair), roof leak ($2K), and property tax bill higher than expected. Homeownership reality check.",
    situation: "🏠 HOMEOWNERSHIP REALITY SHOCK:\n\n💸 UNEXPECTED EXPENSES (FIRST 3 MONTHS):\n• Air Conditioning Failure: $4,000 (complete system replacement)\n• Roof Leak Repair: $2,000 (storm damage, insurance deductible)\n• Plumbing Issues: $800 (old pipes, multiple fixes)\n• Property Tax Surprise: $400/month vs budgeted $300/month\n• HOA Special Assessment: $1,200 (community repairs)\n\n📊 BUDGET IMPACT:\n• Monthly Mortgage: $2,200\n• Actual Property Tax: $400 (vs budgeted $300)\n• Maintenance Fund: $0 (not budgeted)\n• Emergency Home Repairs: $8,000 in 3 months\n• Remaining Emergency Fund: $3,000 (critically low)\n\n🏦 FINANCING OPTIONS:\n• Home Equity Line of Credit: Available $20K at 8% interest\n• Credit Cards: $15K available at 18-24% APR\n• Personal Loan: $10K available at 14% interest\n• 401(k) Loan: $8K available at 6% interest\n• Delay Repairs: Risk of additional damage\n\n📈 MONTHLY BUDGET STRAIN:\n• Total Housing Costs: Now $2,600/month (was $2,200)\n• Income: $7,200/month\n• Housing Ratio: 36% (vs planned 31%)\n• Discretionary Income: Severely reduced\n• Savings Rate: Dropped to $200/month\n\n⚖️ LEARNING CURVE:\n• Home Inspection: Missed these issues (normal occurrence)\n• Maintenance Budget: Need $200-300/month going forward\n• Emergency Fund: Need to rebuild to $15K minimum\n• Insurance Claims: Learning process for homeowner coverage",
    age: 28,
    monthlyIncome: 7200,
    context: "First-year homeownership maintenance shock requires emergency funding and revised budgeting approach.",
    options: [
      {
        id: "heloc_solution",
        label: "Home Equity Line of Credit",
        description: "Open $20K HELOC at 8% interest. Fix all issues immediately and build maintenance buffer.",
        impact: { netWorth: -5000, savings: 2000, debt: 20000, emotion: 1, knowledge: 3, risk: 3, creditScore: -10, homeEquity: 70000 },
        consequences: {
          immediate: "All repairs completed with financial buffer established",
          shortTerm: "Additional monthly debt payment but predictable costs",
          longTerm: "Increased total debt but maintained home value and comfort"
        }
      },
      {
        id: "401k_loan",
        label: "401(k) Loan for Essentials",
        description: "Borrow $8K from 401(k) for AC and roof. Delay other repairs until cash flow improves.",
        impact: { netWorth: -3000, savings: 1000, debt: 8000, emotion: 0, knowledge: 2, risk: 3, creditScore: 0, homeEquity: 72000 },
        consequences: {
          immediate: "Essential repairs completed without external debt",
          shortTerm: "Reduced retirement savings but manageable payments",
          longTerm: "Slower retirement growth but preserved credit and home condition"
        }
      },
      {
        id: "gradual_repair_approach",
        label: "Gradual Repair Strategy",
        description: "Finance AC only ($4K personal loan), DIY other repairs, build maintenance fund over time.",
        impact: { netWorth: -2000, savings: 500, debt: 4000, emotion: -1, knowledge: 4, risk: 2, creditScore: -20, homeEquity: 72000 },
        consequences: {
          immediate: "Essential comfort restored but other issues remain",
          shortTerm: "Learning home maintenance skills while managing costs",
          longTerm: "Balanced approach building both skills and financial stability"
        }
      }
    ],
    learningPoint: "First-year homeownership often brings unexpected costs. Budget 1-3% of home value annually for maintenance and repairs."
  }
];