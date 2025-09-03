// Pre-Retiree Financial Journey - 15 Stages
export interface PreRetireeStageOption {
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
    retirement401k: number;
    catchUpContributions: number;
  };
  consequences: {
    immediate: string;
    shortTerm: string;
    longTerm: string;
  };
}

export interface PreRetireeGameStage {
  id: number;
  title: string;
  description: string;
  situation: string;
  age: number;
  monthlyIncome: number;
  context: string;
  options: PreRetireeStageOption[];
  learningPoint: string;
}

export const preRetireeStages: PreRetireeGameStage[] = [
  {
    id: 1,
    title: "Catch-Up Contributions Maximization",
    description: "Age 54: Eligible for catch-up contributions. Maximizing 401k and IRA contributions vs debt payoff vs healthcare planning.",
    situation: "🎯 CATCH-UP CONTRIBUTION OPPORTUNITY:\n\n💰 CURRENT FINANCIAL POSITION:\n• Monthly Gross Income: $15,000 ($180,000 annually)\n• After-tax Income: $10,500/month\n• Current 401k Balance: $485,000\n• Current Savings Rate: 22% of gross income\n• Emergency Fund: $75,000 (8 months expenses)\n• Remaining Mortgage: $145,000 (8 years left)\n\n📈 CATCH-UP CONTRIBUTION LIMITS 2024:\n• 401k Standard Limit: $23,000\n• 401k Catch-up (50+): Additional $7,500 = $30,500 total\n• IRA Standard Limit: $7,000\n• IRA Catch-up (50+): Additional $1,000 = $8,000 total\n• Total Annual Retirement Contributions: $38,500 possible\n• Current Contributions: $28,000 annually\n• Unused Catch-up Space: $10,500 annually\n\n🏠 COMPETING FINANCIAL PRIORITIES:\n• Mortgage Payoff: $145,000 remaining at 3.25% interest\n• Healthcare Planning: Potential early retirement at 62\n• Long-term Care Insurance: $3,600 annually\n• Adult Children Support: College loans and home down payments\n• Travel and Lifestyle: Bucket list experiences before full retirement\n\n⚖️ DEBT VS INVESTMENT ANALYSIS:\n• Mortgage Rate: 3.25% (tax-deductible)\n• Expected Investment Return: 7-8% annually\n• Mathematical Advantage: Investing beats mortgage payoff\n• Psychological Benefit: Debt-free peace of mind\n• Liquidity Consideration: 401k vs home equity access\n\n🔍 RETIREMENT TIMELINE PLANNING:\n• Target Retirement Age: 65 (11 years remaining)\n• Early Retirement Option: 62 with reduced Social Security\n• Healthcare Bridge: Need coverage from retirement to Medicare (65)\n• Required Retirement Income: $120,000 annually ($10,000/month)\n• Current Trajectory: On track but could optimize further",
    age: 54,
    monthlyIncome: 15000,
    context: "Pre-retirees have final opportunity to maximize retirement savings through catch-up contributions while managing competing financial priorities.",
    options: [
      {
        id: "maximize_catchup_contributions",
        label: "Maximum Catch-Up Strategy",
        description: "Max 401k + catch-up ($30,500), IRA + catch-up ($8,000), delay mortgage payoff for investment gains.",
        impact: { netWorth: 20000, savings: -38500, retirement401k: 38500, catchUpContributions: 8500, emotion: 1, knowledge: 4, risk: 2 },
        consequences: {
          immediate: "Maximum tax-advantaged savings but higher cash flow commitment",
          shortTerm: "Accelerated retirement wealth building in final working years",
          longTerm: "Significantly improved retirement security with tax-deferred growth"
        }
      },
      {
        id: "balanced_debt_retirement",
        label: "Balanced Debt-Retirement Approach",
        description: "Standard retirement contributions ($30K), extra $8,500 toward mortgage payoff, balanced approach.",
        impact: { netWorth: 12000, savings: -30000, debt: -8500, retirement401k: 30000, catchUpContributions: 0, emotion: 2, knowledge: 3, risk: 1 },
        consequences: {
          immediate: "Good retirement savings while reducing debt burden",
          shortTerm: "Mortgage payoff in 6 years instead of 8, solid retirement progress",
          longTerm: "Debt-free retirement entry with strong but not maximized retirement assets"
        }
      },
      {
        id: "aggressive_mortgage_payoff",
        label: "Debt-Free Retirement Focus",
        description: "Standard contributions ($23K), aggressive mortgage payoff ($15,500 extra), prioritize debt elimination.",
        impact: { netWorth: 8000, savings: -23000, debt: -15500, retirement401k: 23000, catchUpContributions: 0, emotion: 3, knowledge: 2, risk: 0 },
        consequences: {
          immediate: "Lower retirement contributions but rapid debt reduction",
          shortTerm: "Mortgage-free in 4 years with reduced financial stress",
          longTerm: "Debt-free retirement but lower retirement wealth accumulation"
        }
      }
    ],
    learningPoint: "Catch-up contributions after age 50 provide crucial opportunity to accelerate retirement savings. Balance with debt reduction based on rates and peace of mind."
  },

  {
    id: 2,
    title: "Social Security Optimization Strategy",
    description: "Age 56: Planning Social Security claiming strategy. Early vs full vs delayed retirement benefits analysis and coordination with 401k withdrawals.",
    situation: "📊 SOCIAL SECURITY OPTIMIZATION PLANNING:\n\n💼 SOCIAL SECURITY BENEFIT PROJECTIONS:\n• Estimated Monthly Benefit at 62: $2,400 (75% of full benefit)\n• Estimated Monthly Benefit at 67: $3,200 (100% of full benefit)\n• Estimated Monthly Benefit at 70: $4,224 (132% of full benefit)\n• Annual Benefit Difference: $21,600 between early and delayed\n• Break-even Age: 78 for delaying benefits to age 70\n• Lifetime Benefit Optimization: Depends on life expectancy\n\n🔄 RETIREMENT WITHDRAWAL STRATEGIES:\n• 401k Current Balance: $565,000\n• Required Minimum Distributions: Start at age 73\n• Roth IRA Conversions: Optimal years 62-67 (lower tax bracket)\n• Tax Bracket Management: Coordinate SS and 401k withdrawals\n• Healthcare Subsidy Impact: ACA subsidies affected by income\n\n⚕️ HEALTHCARE BRIDGE PLANNING:\n• Current Employer Health Insurance: $850/month premium\n• COBRA Continuation: 18 months at $2,100/month\n• ACA Marketplace: $1,400-2,800/month depending on income\n• Healthcare Savings Account: $85,000 current balance\n• Medicare Eligibility: Age 65 (9 years away)\n• Long-term Care Planning: 70% chance of needing care\n\n📈 INCOME REPLACEMENT ANALYSIS:\n• Current Gross Income: $180,000 annually\n• Target Retirement Income: 80% = $144,000 annually\n• Social Security (full benefit): $38,400 annually\n• Required Portfolio Income: $105,600 annually\n• Safe Withdrawal Rate: 4% = need $2.64M portfolio\n• Current Trajectory: $1.8M projected at 67\n• Gap Analysis: $840K shortfall without optimization\n\n💡 ADVANCED STRATEGIES:\n• File and Suspend: Eliminated in 2016 reforms\n• Spousal Benefits: Coordinate with spouse's claiming strategy\n• Tax-Loss Harvesting: Build up tax-free Roth assets\n• Geographic Arbitrage: Move to lower-cost area in retirement\n• Part-time Work: Reduce early retirement penalty impact",
    age: 56,
    monthlyIncome: 15000,
    context: "Social Security claiming decisions are irreversible and significantly impact lifetime retirement income. Coordination with other retirement assets is crucial.",
    options: [
      {
        id: "delayed_retirement_credits",
        label: "Delayed Retirement Strategy",
        description: "Work until 70, delay Social Security for maximum benefits, build larger 401k nest egg, optimize lifetime income.",
        impact: { netWorth: 35000, savings: -15000, retirement401k: 45000, catchUpContributions: 10000, emotion: 0, knowledge: 5, risk: 1 },
        consequences: {
          immediate: "Continue working longer but building maximum retirement wealth",
          shortTerm: "Higher stress but accelerated wealth accumulation",
          longTerm: "Maximum Social Security benefits and largest possible nest egg"
        }
      },
      {
        id: "bridge_strategy_67",
        label: "Full Retirement Age Strategy",
        description: "Retire at 67, claim full Social Security benefits, use 401k for bridge years, balanced approach.",
        impact: { netWorth: 25000, savings: -25000, retirement401k: 35000, catchUpContributions: 7500, emotion: 2, knowledge: 4, risk: 2 },
        consequences: {
          immediate: "Standard retirement planning with full benefits",
          shortTerm: "11 years to build retirement assets and plan transition",
          longTerm: "Full Social Security benefits with adequate retirement portfolio"
        }
      },
      {
        id: "early_retirement_62",
        label: "Early Retirement at 62",
        description: "Retire at 62, accept reduced Social Security, rely heavily on 401k and savings, prioritize lifestyle.",
        impact: { netWorth: 15000, savings: -35000, retirement401k: 25000, catchUpContributions: 5000, emotion: 4, knowledge: 3, risk: 4 },
        consequences: {
          immediate: "Focus on current lifestyle and early retirement preparation",
          shortTerm: "6 years to prepare for reduced income retirement",
          longTerm: "Lower lifetime Social Security benefits but earlier financial freedom"
        }
      }
    ],
    learningPoint: "Social Security claiming strategy significantly impacts lifetime retirement income. Delaying benefits until age 70 maximizes monthly payments but requires other income sources."
  },

  {
    id: 3,
    title: "Healthcare Coverage Bridge Planning",
    description: "Age 58: Healthcare coverage from retirement to Medicare eligibility. ACA marketplace vs COBRA vs working longer for benefits.",
    situation: "⚕️ HEALTHCARE BRIDGE COVERAGE CRISIS:\n\n🏥 CURRENT HEALTHCARE SITUATION:\n• Current Employer Plan: Excellent coverage, $850/month premium\n• Annual Healthcare Costs: $8,500 including premiums\n• Chronic Conditions: Diabetes medication $240/month\n• Preventive Care: Annual physicals, screenings, dental, vision\n• Spouse Coverage: Also on company plan\n• Medicare Eligibility: 7 years away (age 65)\n\n💰 POST-RETIREMENT HEALTHCARE OPTIONS:\n• COBRA Continuation: 18 months at $2,100/month ($37,800 total)\n• ACA Marketplace Premium: $1,800-3,200/month depending on income\n• Short-term Medical: Limited coverage, $800/month\n• Healthcare Sharing Ministry: $450/month, not insurance\n• Spouse's Employer Plan: Possible but expensive\n\n📊 ACA MARKETPLACE ANALYSIS:\n• Premium Tax Credits: Available up to 400% Federal Poverty Level\n• Income Limit (family of 2): $70,720 for maximum credits\n• Current Retirement Income Plan: $120,000 annually\n• No Premium Credits: Pay full marketplace premiums\n• Silver Plan: $2,400/month for family ($28,800 annually)\n• Gold Plan: $3,200/month for family ($38,400 annually)\n\n💡 INCOME MANAGEMENT STRATEGIES:\n• Roth Conversions: Don't count as ACA income in retirement\n• Municipal Bonds: Tax-free income doesn't affect ACA\n• Geographic Arbitrage: Move to state with better ACA options\n• Asset Allocation: Emphasize growth over income until Medicare\n• HSA Maximization: Triple tax advantage for healthcare costs\n\n⚖️ WORK LONGER VS RETIRE DECISION:\n• Extra 2 Years Working: Save $76,800 in healthcare costs\n• Delayed Retirement Credits: Increase Social Security by 16%\n• Career Satisfaction: Burnout vs financial security\n• Health Considerations: Stress of working vs healthcare access\n• Opportunity Cost: Missing early retirement years\n\n🔍 ALTERNATIVE STRATEGIES:\n• Part-time Consulting: Maintain some employer benefits\n• Healthcare Tourism: Regular care abroad for major procedures\n• Health Savings Account: $85,000 current balance grows tax-free\n• Self-Insurance: Pay out-of-pocket, maintain catastrophic coverage\n• Relocate to Healthcare-Friendly State: Better ACA options",
    age: 58,
    monthlyIncome: 15000,
    context: "Healthcare coverage between retirement and Medicare eligibility is expensive and complex. Planning is essential to avoid retirement derailment.",
    options: [
      {
        id: "work_until_medicare",
        label: "Work Until Medicare Eligible",
        description: "Continue working until age 65 for employer healthcare, maximize retirement savings, delayed Social Security credits.",
        impact: { netWorth: 45000, savings: -20000, retirement401k: 50000, catchUpContributions: 12000, emotion: -1, knowledge: 3, risk: 1 },
        consequences: {
          immediate: "Continued work stress but healthcare security and wealth building",
          shortTerm: "7 more years of career with declining job satisfaction",
          longTerm: "Maximum retirement security with seamless Medicare transition"
        }
      },
      {
        id: "cobra_aca_bridge",
        label: "COBRA to ACA Bridge Strategy",
        description: "Retire at 60, use COBRA for 18 months, then ACA marketplace, manage income for potential subsidies.",
        impact: { netWorth: 25000, savings: -55000, retirement401k: 30000, catchUpContributions: 8000, emotion: 2, knowledge: 4, risk: 3 },
        consequences: {
          immediate: "Early retirement freedom but significant healthcare cost burden",
          shortTerm: "High healthcare expenses requiring careful budget management",
          longTerm: "Earlier retirement enjoyment with managed healthcare transition to Medicare"
        }
      },
      {
        id: "healthcare_sharing_risk",
        label: "Healthcare Sharing + HSA Strategy",
        description: "Retire early, use healthcare sharing ministry + large HSA, accept higher medical financial risk for lower premiums.",
        impact: { netWorth: 20000, savings: -25000, retirement401k: 35000, catchUpContributions: 9000, emotion: 3, knowledge: 2, risk: 5 },
        consequences: {
          immediate: "Lowest healthcare costs but significant coverage gaps",
          shortTerm: "Major medical events could be financially catastrophic",
          longTerm: "Savings on premiums if healthy, but substantial risk if serious illness occurs"
        }
      }
    ],
    learningPoint: "Healthcare coverage between retirement and Medicare is often the largest expense in early retirement. Plan carefully and consider working longer for benefits."
  },

  {
    id: 4,
    title: "Long-Term Care Insurance Decision",
    description: "Age 59: Long-term care planning. Insurance premiums vs self-insurance vs hybrid life insurance policies with LTC riders.",
    situation: "🏥 LONG-TERM CARE PLANNING CRISIS:\n\n📊 LONG-TERM CARE STATISTICS:\n• Lifetime Probability: 70% chance of needing long-term care\n• Average Duration: 3 years for men, 3.7 years for women\n• Current Costs: $65,000/year for home care, $108,000/year for nursing home\n• Cost Inflation: 4-5% annually (faster than general inflation)\n• Medicare Coverage: Very limited long-term care benefits\n• Medicaid Coverage: Requires spend-down of assets to qualify\n\n💰 INSURANCE OPTIONS ANALYSIS:\n• Traditional LTC Insurance: $4,500/year premium for $200,000 benefit\n• Hybrid Life/LTC Policy: $12,000/year for 10 years = $120,000 total\n• Return of Premium: Some policies return premiums if not used\n• Inflation Protection: Critical but expensive add-on\n• Elimination Period: 90-day waiting period before benefits\n• Benefit Period: 3-5 years typical coverage\n\n🔍 SELF-INSURANCE ANALYSIS:\n• Current Retirement Assets: $565,000 in 401k\n• Home Equity: $420,000 (paid-off home)\n• Total Potential LTC Assets: $985,000\n• 5-Year Nursing Home Cost: $540,000 (current dollars)\n• Asset Depletion Risk: Could exhaust retirement savings\n• Spouse Protection: Preserving assets for surviving spouse\n\n💡 ALTERNATIVE STRATEGIES:\n• Family Caregiving: Adult children as caregivers\n• Home Modifications: Age-in-place improvements\n• Continuing Care Retirement Community: Entry fee + monthly costs\n• Geographic Arbitrage: Move to lower-cost LTC area\n• Health and Wellness: Prevent/delay need for care\n\n⚖️ FINANCIAL IMPACT COMPARISON:\n• Traditional LTC Insurance: $4,500/year × 20 years = $90,000\n• Hybrid Policy: $120,000 over 10 years, returns unused portion\n• Self-Insurance: $90,000 invested at 7% = $348,000 in 20 years\n• Average LTC Need: $270,000 over 3 years (today's dollars)\n• Insurance Break-even: If care needed for 2+ years\n\n🎯 FAMILY CONSIDERATIONS:\n• Spouse's Care Needs: Both may need care simultaneously\n• Children's Financial Capacity: Limited ability to pay for care\n• Inheritance Goals: Preserve wealth for next generation\n• Care Preferences: Home care vs facility care\n• Quality of Care: Insurance may provide better options",
    age: 59,
    monthlyIncome: 15000,
    context: "Long-term care costs can devastate retirement savings. Insurance vs self-insurance decision requires careful analysis of risks and family situation.",
    options: [
      {
        id: "comprehensive_ltc_insurance",
        label: "Comprehensive LTC Insurance",
        description: "Purchase traditional long-term care insurance with inflation protection, protect retirement assets from care costs.",
        impact: { netWorth: 5000, savings: -4500, retirement401k: 25000, catchUpContributions: 7500, emotion: 2, knowledge: 4, risk: 1 },
        consequences: {
          immediate: "Annual premium burden but peace of mind about future care costs",
          shortTerm: "Continued premium payments but protected retirement assets",
          longTerm: "Care costs covered by insurance, retirement assets preserved for spouse"
        }
      },
      {
        id: "hybrid_life_ltc_policy",
        label: "Hybrid Life Insurance/LTC Policy",
        description: "Buy hybrid policy with life insurance and LTC benefits, guaranteed return of premium if LTC not needed.",
        impact: { netWorth: 8000, savings: -12000, retirement401k: 30000, catchUpContributions: 8000, emotion: 1, knowledge: 4, risk: 2 },
        consequences: {
          immediate: "Higher upfront cost but guaranteed benefits regardless of usage",
          shortTerm: "10 years of higher payments but building guaranteed value",
          longTerm: "Either LTC coverage or life insurance benefit, no premium loss"
        }
      },
      {
        id: "self_insurance_strategy",
        label: "Self-Insurance with Asset Protection",
        description: "Skip LTC insurance, invest premiums in retirement accounts, use trust strategies to protect assets.",
        impact: { netWorth: 12000, savings: 0, retirement401k: 35000, catchUpContributions: 9000, emotion: 0, knowledge: 3, risk: 4 },
        consequences: {
          immediate: "No insurance premiums but full exposure to LTC costs",
          shortTerm: "Higher investment returns from saved premiums",
          longTerm: "Significant wealth if no LTC needed, potential asset depletion if care required"
        }
      }
    ],
    learningPoint: "Long-term care insurance protects retirement assets but is expensive. Consider family situation, health history, and asset levels when deciding."
  },

  {
    id: 5,
    title: "Retirement Withdrawal Strategy",
    description: "Age 61: Finalizing retirement withdrawal strategy. Tax-efficient sequencing of 401k, IRA, Roth, and taxable accounts for optimal tax management.",
    situation: "📈 RETIREMENT WITHDRAWAL OPTIMIZATION:\n\n💼 RETIREMENT ACCOUNT PORTFOLIO:\n• Traditional 401k: $675,000\n• Roth IRA: $125,000\n• Traditional IRA: $85,000\n• Taxable Accounts: $485,000\n• HSA: $95,000\n• Total Retirement Assets: $1,465,000\n• Required Annual Income: $120,000\n\n🔄 WITHDRAWAL SEQUENCING STRATEGIES:\n• Strategy 1: Taxable → Traditional → Roth (tax-deferred)\n• Strategy 2: Traditional → Taxable → Roth (tax-now)\n• Strategy 3: Proportional from all accounts (tax-diversified)\n• Strategy 4: Roth conversions + taxable (tax-optimized)\n• RMD Requirements: Start at age 73 (12 years away)\n\n📊 TAX BRACKET MANAGEMENT:\n• Current Tax Bracket: 24% (high-income working years)\n• Retirement Tax Bracket: Potentially 12-22% with planning\n• Roth Conversion Opportunity: Years 62-72 before RMDs\n• Standard Deduction: $30,700 for married filing jointly (2024)\n• Tax-Free Income Goal: Maximize 0% and 12% brackets\n\n💰 ROTH CONVERSION LADDER STRATEGY:\n• Convert $50,000 annually from traditional to Roth\n• Pay taxes at lower retirement rates (12-22%)\n• Create tax-free income for later retirement years\n• Reduce future RMD requirements\n• Leave tax-free Roth assets to heirs\n\n⚕️ HEALTHCARE SUBSIDY COORDINATION:\n• ACA Premium Tax Credits: Income limits affect eligibility\n• Modified Adjusted Gross Income: Includes traditional IRA/401k withdrawals\n• Roth Withdrawals: Don't count as income for ACA\n• Strategic Income Management: Stay under 400% Federal Poverty Level\n• Healthcare Costs: $24,000 annually without subsidies\n\n🎯 LEGACY AND ESTATE PLANNING:\n• Step-up in Basis: Taxable accounts get basis step-up at death\n• Roth IRA Inheritance: Tax-free for heirs\n• Traditional IRA/401k: Heirs pay taxes on withdrawals\n• 10-Year Rule: Non-spouse heirs must empty inherited accounts\n• Charitable Giving: QCD from IRA at age 70.5",
    age: 61,
    monthlyIncome: 15000,
    context: "Retirement withdrawal strategy determines tax efficiency and account longevity. Proper sequencing can save significant taxes over retirement.",
    options: [
      {
        id: "roth_conversion_ladder",
        label: "Aggressive Roth Conversion Strategy",
        description: "Convert $60K annually to Roth, pay taxes at 12-22% rates, create tax-free income stream for later retirement.",
        impact: { netWorth: 15000, savings: -60000, retirement401k: 0, catchUpContributions: 8000, emotion: 1, knowledge: 5, risk: 2 },
        consequences: {
          immediate: "Higher current taxes but building tax-free wealth",
          shortTerm: "10 years of conversion taxes but growing Roth balance",
          longTerm: "Substantial tax-free income and reduced RMD burden"
        }
      },
      {
        id: "tax_bracket_optimization",
        label: "Tax Bracket Optimization Strategy",
        description: "Carefully manage withdrawals to stay in 12% bracket, use mix of taxable and traditional accounts.",
        impact: { netWorth: 12000, savings: -30000, retirement401k: -30000, catchUpContributions: 6000, emotion: 2, knowledge: 4, risk: 1 },
        consequences: {
          immediate: "Moderate tax burden with careful income management",
          shortTerm: "Complex but tax-efficient withdrawal coordination",
          longTerm: "Optimized tax payments over entire retirement period"
        }
      },
      {
        id: "simple_bucket_strategy",
        label: "Simple Three-Bucket Approach",
        description: "Use taxable accounts first, traditional accounts in middle years, Roth accounts last, simple execution.",
        impact: { netWorth: 10000, savings: -45000, retirement401k: -15000, catchUpContributions: 7000, emotion: 3, knowledge: 3, risk: 2 },
        consequences: {
          immediate: "Simple strategy with predictable tax consequences",
          shortTerm: "Easy to execute without complex tax planning",
          longTerm: "Good results but potentially higher lifetime taxes than optimization"
        }
      }
    ],
    learningPoint: "Withdrawal sequence significantly impacts retirement tax burden. Roth conversions in early retirement can create tax-free income for later years."
  }
];