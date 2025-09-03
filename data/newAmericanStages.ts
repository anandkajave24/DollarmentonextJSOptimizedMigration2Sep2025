// New American Financial Journey - 15 Stages
export interface NewAmericanStageOption {
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
    usCitizenship: number;
  };
  consequences: {
    immediate: string;
    shortTerm: string;
    longTerm: string;
  };
}

export interface NewAmericanGameStage {
  id: number;
  title: string;
  description: string;
  situation: string;
  age: number;
  monthlyIncome: number;
  context: string;
  options: NewAmericanStageOption[];
  learningPoint: string;
}

export const newAmericanStages: NewAmericanGameStage[] = [
  {
    id: 1,
    title: "Building US Credit History from Zero",
    description: "Age 28: New to US with no credit history. Secured credit cards vs credit builder loans vs authorized user strategies to establish credit.",
    situation: "🇺🇸 NEW TO US - BUILDING CREDIT FROM ZERO\n\n💼 YOUR SITUATION:\nSoftware Engineer • $4,500/month • H1-B visa\nNo US credit score • $15,000 emergency fund\n\n🎯 CREDIT BUILDING OPTIONS:\n• Secured Card: $500-2K deposit → builds credit\n• Credit Builder Loan: Small loan → payment history\n• Authorized User: Friend/family adds you\n• Store Cards: Easier approval, higher rates\n\n📈 SUCCESS TIMELINE:\n• 3-6 months: First credit score appears\n• 12-18 months: Good credit (700+)\n• 2-3 years: Excellent credit (760+)\n\n💡 KEY STRATEGY:\nPay on time (35% of score) • Keep utilization <10% • Let accounts age",
    age: 28,
    monthlyIncome: 4500,
    context: "New Americans must build US credit history from zero. Strategic approach to credit building affects all future financial opportunities.",
    options: [
      {
        id: "secured_card_strategy",
        label: "Secured Credit Card Strategy",
        description: "Get secured card with $2,000 deposit, use for all expenses, pay in full monthly, build credit systematically.",
        impact: { netWorth: -2000, savings: -2000, creditScore: 15, usCitizenship: 1, emotion: 2, knowledge: 4, risk: 1 },
        consequences: {
          immediate: "$2,000 deposit tied up but immediate credit building opportunity",
          shortTerm: "Credit score development over 6-12 months with responsible use",
          longTerm: "Strong credit foundation for major purchases and financial opportunities"
        }
      },
      {
        id: "multiple_credit_products",
        label: "Diversified Credit Building",
        description: "Secured card + credit builder loan + authorized user status, aggressive but comprehensive approach.",
        impact: { netWorth: -3000, savings: -3000, creditScore: 25, usCitizenship: 2, emotion: 1, knowledge: 5, risk: 2 },
        consequences: {
          immediate: "Higher upfront costs but multiple tradelines building simultaneously",
          shortTerm: "Faster credit score development with diverse credit history",
          longTerm: "Excellent credit profile developed in 12-18 months instead of 24-36"
        }
      },
      {
        id: "conservative_approach",
        label: "Conservative Banking Relationship",
        description: "Focus on banking relationship first, wait 6 months, then apply for unsecured card with bank relationship.",
        impact: { netWorth: 1000, savings: 0, creditScore: 8, usCitizenship: 0, emotion: 3, knowledge: 2, risk: 0 },
        consequences: {
          immediate: "No upfront costs but slower credit building process",
          shortTerm: "Banking relationship may help with credit approval",
          longTerm: "Delayed credit building extends timeline for major financial goals"
        }
      }
    ],
    learningPoint: "Building US credit from scratch requires strategic use of secured products and patience. Starting early and diversifying credit types accelerates the process."
  },

  {
    id: 2,
    title: "401k and IRA System Navigation",
    description: "Age 29: Understanding US retirement system. 401k enrollment, matching, IRA types, and tax advantages for international background.",
    situation: "📈 UNDERSTANDING US RETIREMENT SYSTEM\n\n💼 YOUR BENEFITS:\nTech Company • $85K salary • H1-B eligible\n401k: 50% match on first 6% • 4-year vesting\n\n🎯 RETIREMENT OPTIONS:\n• Traditional 401k: Pre-tax → taxed later\n• Roth 401k: After-tax → tax-free later\n• IRA: $7K annual limit • Income restrictions\n\n💰 CURRENT SITUATION:\n$28K emergency fund • $500/month to family\nAvailable for retirement: $1,500/month\n\n⚡ KEY DECISION:\nEmployer match = FREE MONEY (3% max)\nRoth vs Traditional = Future tax bet",
    age: 29,
    monthlyIncome: 4500,
    context: "New Americans must navigate complex US retirement systems while managing visa uncertainties and cultural differences in retirement planning.",
    options: [
      {
        id: "maximize_employer_match",
        label: "Maximize Employer Match Strategy",
        description: "Contribute 6% to 401k for full match, split between traditional and Roth, start IRA with remaining capacity.",
        impact: { netWorth: 8000, savings: -5100, creditScore: 5, usCitizenship: 2, emotion: 2, knowledge: 4, risk: 1 },
        consequences: {
          immediate: "Free $255/month employer match but reduced take-home pay",
          shortTerm: "Building retirement assets with tax advantages",
          longTerm: "Strong foundation for US retirement with maximum employer benefits"
        }
      },
      {
        id: "roth_focused_strategy",
        label: "Roth-Focused Young Professional Strategy",
        description: "Max Roth IRA ($7K), Roth 401k to get match, bet on higher future tax rates and tax-free growth.",
        impact: { netWorth: 6000, savings: -7583, creditScore: 5, usCitizenship: 3, emotion: 1, knowledge: 5, risk: 2 },
        consequences: {
          immediate: "Higher current taxes but building tax-free retirement wealth",
          shortTerm: "Significant contribution to after-tax retirement accounts",
          longTerm: "Tax-free retirement income especially valuable if staying in US long-term"
        }
      },
      {
        id: "conservative_visa_approach",
        label: "Conservative Visa-Uncertainty Approach",
        description: "Minimal 401k for match only, focus on taxable investments for flexibility if returning to home country.",
        impact: { netWorth: 4000, savings: -2550, creditScore: 3, usCitizenship: 1, emotion: 3, knowledge: 2, risk: 0 },
        consequences: {
          immediate: "Lower retirement contributions but higher cash flow flexibility",
          shortTerm: "Maintains liquidity for potential visa or life changes",
          longTerm: "May miss optimal retirement building years if staying in US permanently"
        }
      }
    ],
    learningPoint: "US retirement system rewards early participation and employer matches. New Americans should maximize benefits while considering visa timeline uncertainties."
  },

  {
    id: 3,
    title: "First Apartment vs Roommate Decision",
    description: "Age 30: Housing decisions with limited credit history. Apartment applications, security deposits, roommates vs solo living with budget constraints.",
    situation: "🏠 FIRST APARTMENT DECISION\n\n💼 YOUR PROGRESS:\nSenior Developer • $5,500/month • Credit Score: 678\n$33K saved • Currently $800/month shared housing\n\n🏢 HOUSING OPTIONS:\n• Studio: $1,200/month + $2,400 deposit\n• 1-Bedroom: $1,500/month + $3,000 deposit\n• Shared 2-BR: $900/month split + utilities\n\n💰 MOVE-IN COSTS:\nDeposit + 1st month + fees + furniture\nTotal: $6,600-15,200 upfront\n\n⚡ KEY TRADE-OFF:\nIndependence vs Savings Rate\nH1-B status may complicate applications",
    age: 30,
    monthlyIncome: 5500,
    context: "Housing decisions significantly impact budget and lifestyle. New Americans face additional challenges with limited credit history and visa status.",
    options: [
      {
        id: "solo_apartment_independence",
        label: "Solo Apartment Independence",
        description: "Get one-bedroom apartment for $1,500/month, prioritize independence and professional image, reduce other expenses.",
        impact: { netWorth: -8000, savings: -18000, creditScore: 10, usCitizenship: 2, emotion: 3, knowledge: 3, risk: 2 },
        consequences: {
          immediate: "Major expense increase but complete independence and privacy",
          shortTerm: "Tighter budget but professional image and lifestyle improvement",
          longTerm: "Higher housing costs but better networking and career opportunities"
        }
      },
      {
        id: "strategic_roommate_approach",
        label: "Strategic Roommate Partnership",
        description: "Share two-bedroom with carefully chosen professional roommate, split costs, maintain savings rate.",
        impact: { netWorth: -2000, savings: -3600, creditScore: 8, usCitizenship: 1, emotion: 2, knowledge: 3, risk: 1 },
        consequences: {
          immediate: "Moderate cost increase with shared living arrangement",
          shortTerm: "Balanced approach maintaining most savings capacity",
          longTerm: "Lower housing costs preserve wealth building while gaining independence"
        }
      },
      {
        id: "affordable_studio_strategy",
        label: "Affordable Studio Strategy",
        description: "Choose studio apartment for $1,200/month, maximize savings rate, sacrifice space for financial goals.",
        impact: { netWorth: -5000, savings: -9600, creditScore: 8, usCitizenship: 1, emotion: 1, knowledge: 4, risk: 1 },
        consequences: {
          immediate: "Moderate expense with minimal living space",
          shortTerm: "Independence achieved with strong savings preservation",
          longTerm: "Lower housing costs accelerate wealth building and major purchase timeline"
        }
      }
    ],
    learningPoint: "Housing costs significantly impact long-term wealth building. Balance independence desires with financial goals and consider total cost of living alone."
  },

  {
    id: 4,
    title: "Car Purchase vs Public Transportation",
    description: "Age 31: Transportation decision with improved credit. New vs used car financing, insurance costs, or continue public transit savings.",
    situation: "🚗 TRANSPORTATION INDEPENDENCE DECISION:\n\n🚌 CURRENT TRANSPORTATION:\n• Public Transit: $120/month unlimited metro pass\n• Uber/Lyft: $300/month for convenience and weekend trips\n• Car Rental: $200/month occasional weekend rentals\n• Total Current Transportation: $620/month\n• Time Cost: 45 minutes each way to work (vs 20 minutes driving)\n\n📊 CURRENT FINANCIAL POSITION:\n• Credit Score: 720 (excellent improvement)\n• Monthly Income: $6,200 (another promotion)\n• Monthly Expenses: $4,100 (including $1,200 rent)\n• Available for Car: $800-1,200/month budget\n• Emergency Fund: $35,000 (maintained despite higher expenses)\n\n🚗 VEHICLE OPTIONS ANALYSIS:\n• Used Car (3-4 years old): $18,000-25,000\n• Certified Pre-Owned: $22,000-28,000 with warranty\n• New Compact Car: $28,000-35,000\n• Lease Option: $350-450/month, no ownership\n• Auto Loan Terms: 3-7 years, 4.5-7.2% APR based on credit\n\n💰 TOTAL COST OF OWNERSHIP:\n• Auto Loan Payment: $350-550/month (depending on price/term)\n• Auto Insurance: $180-250/month (no US driving history)\n• Gas: $120-180/month\n• Maintenance: $100-200/month\n• Parking: $150/month at apartment + $200/month downtown work\n• Registration/Inspection: $150 annually\n• Total Monthly Cost: $1,100-1,530/month\n\n⚖️ LIFESTYLE IMPACT ANALYSIS:\n• Time Savings: 50 minutes daily commute reduction\n• Weekend Freedom: Explore outside city, visit friends\n• Professional Image: Client meetings, work flexibility\n• Dating/Social: Increased social opportunities\n• Emergency Transportation: Medical, family emergencies\n• Weather Independence: No walking in rain/snow\n\n🔍 FINANCIAL TRADE-OFFS:\n• Current Transportation: $620/month\n• Car Ownership: $1,100-1,530/month\n• Additional Cost: $480-910/month\n• Annual Impact: $5,760-10,920 less savings\n• 10-Year Impact: $57,600-109,200 opportunity cost\n• Investment Alternative: $500/month invested = $77,000 in 10 years\n\n🎯 PRACTICAL CONSIDERATIONS:\n• Visa Status: Still H1-B, potential job changes\n• City Living: Downtown apartment, good public transit\n• Future Plans: May need car for suburban home purchase\n• Learning Curve: US driving rules, winter driving\n• Insurance History: High rates due to no US driving record",
    age: 31,
    monthlyIncome: 6200,
    context: "Car ownership in America provides freedom but significantly increases monthly expenses. Timing and vehicle choice impact long-term wealth building.",
    options: [
      {
        id: "reliable_used_car",
        label: "Reliable Used Car Purchase",
        description: "Buy 3-year-old certified pre-owned for $24K, finance over 4 years, gain transportation independence.",
        impact: { netWorth: -8000, savings: -13000, debt: 24000, creditScore: 5, usCitizenship: 2, emotion: 3, knowledge: 3, risk: 2 },
        consequences: {
          immediate: "Major monthly expense increase but transportation independence",
          shortTerm: "Learning curve for car ownership but lifestyle improvement",
          longTerm: "Transportation asset with equity building and eventual ownership"
        }
      },
      {
        id: "lease_flexibility_option",
        label: "New Car Lease for Flexibility",
        description: "Lease new compact car for $400/month, lower upfront cost, warranty coverage, upgrade flexibility.",
        impact: { netWorth: -2000, savings: -9600, creditScore: 3, usCitizenship: 1, emotion: 2, knowledge: 2, risk: 1 },
        consequences: {
          immediate: "Lower upfront cost with reliable transportation",
          shortTerm: "Predictable monthly payments with warranty protection",
          longTerm: "No equity building but flexibility for future changes"
        }
      },
      {
        id: "continue_public_transit",
        label: "Continue Public Transit Strategy",
        description: "Maintain current transportation, invest the car payment difference, wait for suburban move or major life change.",
        impact: { netWorth: 8000, savings: 6000, creditScore: 2, usCitizenship: 0, emotion: 1, knowledge: 4, risk: 0 },
        consequences: {
          immediate: "Continued transportation limitations but maximum savings",
          shortTerm: "Time costs but significant wealth building acceleration",
          longTerm: "Major opportunity cost savings could fund home down payment sooner"
        }
      }
    ],
    learningPoint: "Car ownership provides lifestyle benefits but significantly increases monthly expenses. Consider timing, need, and opportunity cost of alternatives."
  },

  {
    id: 5,
    title: "Green Card Process Financial Planning",
    description: "Age 33: H1-B to Green Card transition. Legal fees, job stability requirements, and long-term financial planning with permanent residency path.",
    situation: "🇺🇸 GREEN CARD PROCESS FINANCIAL PLANNING:\n\n📋 IMMIGRATION STATUS PROGRESSION:\n• Current Status: H1-B visa (4 years in US)\n• Employer Sponsorship: Company agreed to sponsor Green Card\n• Priority Date: Filed 2 years ago (India backlog)\n• Estimated Wait Time: 3-5 more years for final approval\n• Current Security: Authorized to work, but tied to employer\n\n💰 GREEN CARD PROCESS COSTS:\n• Attorney Fees: $8,000-15,000 total process\n• USCIS Filing Fees: $4,500-6,000 for all stages\n• Medical Examination: $500-1,000\n• Document Translation: $300-800\n• Travel Costs: Potential consular processing abroad\n• Total Estimated Cost: $13,300-22,800\n\n📊 CURRENT FINANCIAL POSITION:\n• Monthly Income: $7,500 (senior developer, 6 years experience)\n• Monthly Expenses: $5,200 (apartment, car, lifestyle)\n• Monthly Savings: $2,300\n• Emergency Fund: $45,000 (9 months expenses)\n• 401k Balance: $85,000 (consistent contributions)\n• Taxable Investments: $35,000\n\n⚖️ JOB STABILITY CONSIDERATIONS:\n• Employer Dependency: Cannot change jobs during final Green Card stage\n• Salary Negotiation: Limited leverage due to sponsorship dependency\n• Career Growth: May need to stay in same role/level during process\n• Layoff Risk: Would need to find new sponsor or leave country\n• Job Market: Tech industry volatility and recent layoffs\n\n🎯 LONG-TERM PLANNING IMPLICATIONS:\n• Home Purchase: Delayed until Green Card approved\n• Family Planning: Spouse work authorization complexity\n• Investment Horizon: US residence certainty affects strategy\n• Retirement Planning: Full US retirement system participation\n• Social Security: Quarter credit accumulation for benefits\n\n💡 FINANCIAL STRATEGY OPTIONS:\n• Conservative Approach: Build large emergency fund for process uncertainty\n• Investment Focus: Continue building wealth assuming US permanence\n• Home Purchase Prep: Save down payment for post-Green Card purchase\n• Family Planning: Financial preparation for spouse and children\n• Career Investment: Skills development for post-Green Card flexibility\n\n🔍 RISK MANAGEMENT:\n• Emergency Fund: 12+ months expenses due to visa dependency\n• Health Insurance: Maintain excellent coverage throughout process\n• Tax Planning: Optimize for US tax residency\n• Document Preparation: Professional help for complex cases\n• Backup Plans: Financial resources for potential departure",
    age: 33,
    monthlyIncome: 7500,
    context: "Green Card process creates financial and career constraints while opening long-term opportunities. Strategic planning balances current needs with future possibilities.",
    options: [
      {
        id: "aggressive_wealth_building",
        label: "Aggressive Wealth Building Strategy",
        description: "Assume US permanence, maximize investments, standard emergency fund, optimize for long-term growth.",
        impact: { netWorth: 15000, savings: -18000, creditScore: 5, usCitizenship: 4, emotion: 2, knowledge: 4, risk: 3 },
        consequences: {
          immediate: "Maximum investment but higher risk if Green Card denied",
          shortTerm: "Strong wealth building assuming successful immigration",
          longTerm: "Optimal financial position if remaining in US permanently"
        }
      },
      {
        id: "immigration_focused_savings",
        label: "Immigration-Focused Savings Plan",
        description: "Build 18-month emergency fund, save for all Green Card costs, prepare for home purchase post-approval.",
        impact: { netWorth: 8000, savings: -35000, creditScore: 3, usCitizenship: 3, emotion: 3, knowledge: 3, risk: 1 },
        consequences: {
          immediate: "High cash reserves but lower investment growth",
          shortTerm: "Prepared for all immigration costs and uncertainties",
          longTerm: "Strong position for home purchase and major life changes post-Green Card"
        }
      },
      {
        id: "balanced_flexibility_approach",
        label: "Mobile Flexibility Strategy",
        description: "Moderate savings, portable investments, prepare for multiple scenarios including potential home country return.",
        impact: { netWorth: 10000, savings: -22000, creditScore: 4, usCitizenship: 2, emotion: 1, knowledge: 4, risk: 2 },
        consequences: {
          immediate: "Balanced approach with multiple scenario preparation",
          shortTerm: "Flexibility for career and immigration outcome changes",
          longTerm: "Good position regardless of final immigration outcome"
        }
      }
    ],
    learningPoint: "Green Card process creates unique financial planning challenges. Balance investment growth with immigration uncertainty and prepare for multiple scenarios."
  }
];