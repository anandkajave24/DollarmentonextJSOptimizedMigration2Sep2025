// Retiree Financial Journey - 15 Stages
export interface RetireeStageOption {
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
    healthcareCosts: number;
    withdrawal: number;
  };
  consequences: {
    immediate: string;
    shortTerm: string;
    longTerm: string;
  };
}

export interface RetireeGameStage {
  id: number;
  title: string;
  description: string;
  situation: string;
  age: number;
  monthlyIncome: number;
  context: string;
  options: RetireeStageOption[];
  learningPoint: string;
}

export const retireeStages: RetireeGameStage[] = [
  {
    id: 1,
    title: "Required Minimum Distribution Strategy",
    description: "Age 73: First year of RMDs. Withdrawal timing, tax withholding, and reinvestment strategies to minimize tax impact.",
    situation: "📊 REQUIRED MINIMUM DISTRIBUTION MANAGEMENT:\n\n💰 RMD CALCULATION REQUIREMENTS:\n• Traditional 401k Balance: $875,000 (December 31st prior year)\n• Traditional IRA Balance: $165,000\n• Total RMD Required: $40,650 (based on IRS life expectancy tables)\n• RMD Percentage: 3.91% of total traditional retirement accounts\n• Tax Withholding: Optional but recommended for large distributions\n• Deadline: December 31st (April 1st for first year only)\n\n🔄 CURRENT RETIREMENT INCOME STRUCTURE:\n• Social Security: $3,200/month ($38,400 annually)\n• Pension: $1,800/month ($21,600 annually)\n• Required RMD: $40,650 annually\n• Total Fixed Income: $100,650 annually\n• Target Retirement Income: $120,000 annually\n• Additional Income Needed: $19,350 annually\n\n📈 INVESTMENT ACCOUNT BALANCES:\n• Roth IRA: $185,000 (no RMD requirements)\n• Taxable Investment Account: $425,000\n• HSA: $125,000 (medical expenses)\n• Cash/CDs: $95,000 (emergency fund)\n• Total Liquid Assets: $1,875,000\n\n⚖️ TAX OPTIMIZATION STRATEGIES:\n• Current Tax Bracket: 22% (due to RMD + other income)\n• State Income Tax: 6% on retirement distributions\n• Tax Withholding: 25% federal + 6% state = 31% total\n• Quarterly Estimated Taxes: Alternative to withholding\n• Charitable Giving: QCD up to $105,000 annually\n• Tax-Loss Harvesting: Offset gains in taxable accounts\n\n💡 RMD MANAGEMENT OPTIONS:\n• Take Monthly: $3,388/month for steady cash flow\n• Take Quarterly: $10,163 per quarter for flexibility\n• Take Annually: $40,650 in December for tax planning\n• Reinvest Immediately: Use RMD to fund Roth conversions\n• Qualified Charitable Distribution: Direct to charity, no taxes\n\n🎯 LONG-TERM ACCOUNT PRESERVATION:\n• RMD Increases: 4-5% annually as life expectancy decreases\n• Account Depletion Timeline: Traditional accounts slowly decrease\n• Roth Preservation: No RMDs, preserve for spouse/heirs\n• Legacy Planning: Minimize taxes for beneficiaries",
    age: 73,
    monthlyIncome: 8400,
    context: "Required Minimum Distributions begin at age 73 and increase annually. Strategic management minimizes taxes while meeting income needs.",
    options: [
      {
        id: "quarterly_rmd_reinvest",
        label: "Quarterly RMD with Reinvestment",
        description: "Take quarterly RMDs, reinvest excess in taxable accounts, minimize tax withholding, optimize cash flow.",
        impact: { netWorth: 2000, savings: 25000, withdrawal: -40650, healthcareCosts: 0, emotion: 2, knowledge: 4, risk: 2 },
        consequences: {
          immediate: "Steady quarterly income with excess reinvested for continued growth",
          shortTerm: "Balanced approach maintaining investment growth and income needs",
          longTerm: "Optimized tax management while preserving wealth for later retirement"
        }
      },
      {
        id: "charitable_qcd_strategy",
        label: "Qualified Charitable Distribution",
        description: "Direct $15K to charity from IRA, take remaining $25,650 as income, reduce taxable income significantly.",
        impact: { netWorth: -10000, savings: 10000, withdrawal: -25650, healthcareCosts: 0, emotion: 3, knowledge: 5, risk: 1 },
        consequences: {
          immediate: "Significant tax savings through charitable giving strategy",
          shortTerm: "Lower taxable income reduces Medicare premiums and taxes",
          longTerm: "Continued charitable impact with optimal tax efficiency"
        }
      },
      {
        id: "annual_december_rmd",
        label: "Annual December RMD Strategy",
        description: "Take full RMD in December, maximize investment growth time, use other assets for monthly income.",
        impact: { netWorth: 5000, savings: -20000, withdrawal: -40650, healthcareCosts: 0, emotion: 1, knowledge: 3, risk: 3 },
        consequences: {
          immediate: "Maximum investment growth time but requires other income sources",
          shortTerm: "Complex cash flow management but optimized investment returns",
          longTerm: "Potentially higher account values but increased sequence of returns risk"
        }
      }
    ],
    learningPoint: "Required Minimum Distributions are mandatory but can be optimized through timing, charitable giving, and coordination with other income sources."
  },

  {
    id: 2,
    title: "Medicare Supplement Insurance Decision",
    description: "Age 74: Medicare supplement planning. Medigap policies vs Medicare Advantage vs original Medicare cost analysis and coverage decisions.",
    situation: "⚕️ MEDICARE SUPPLEMENT DECISION ANALYSIS:\n\n🏥 CURRENT MEDICARE SITUATION:\n• Medicare Part A: Hospital coverage (premium-free)\n• Medicare Part B: Medical coverage ($174.70/month)\n• Medicare Part D: Prescription coverage ($35/month)\n• Current Annual Healthcare Costs: $18,500\n• Medicare Covers: Approximately 80% of approved charges\n• Out-of-Pocket Maximum: No limit with Original Medicare\n\n📋 MEDIGAP SUPPLEMENT OPTIONS:\n• Plan G: $185/month, covers most gaps except Part B deductible\n• Plan N: $145/month, copays for office visits and ER\n• Plan F: $225/month, comprehensive coverage (grandfather clause)\n• High-Deductible Plan G: $65/month, $2,700 deductible\n• State Variations: Premiums vary significantly by location\n\n💰 MEDICARE ADVANTAGE ALTERNATIVE:\n• Monthly Premium: $0-50/month (varies by plan)\n• Out-of-Pocket Maximum: $3,500-8,550 annually\n• Network Restrictions: Must use plan providers\n• Prior Authorization: Required for many services\n• Prescription Coverage: Usually included\n• Extra Benefits: Dental, vision, hearing aids often included\n\n🔍 HEALTHCARE UTILIZATION ANALYSIS:\n• Current Health Status: Good with minor chronic conditions\n• Prescription Costs: $2,400/year (diabetes, blood pressure)\n• Specialist Visits: Cardiologist, endocrinologist quarterly\n• Travel Considerations: Spend 4 months in Florida annually\n• Preferred Doctors: Long-standing relationships with current providers\n\n📊 COST COMPARISON ANALYSIS:\n• Original Medicare + Plan G: $360/month + 20% coinsurance\n• Original Medicare + Plan N: $320/month + copays\n• Medicare Advantage: $25/month + network restrictions\n• High-Deductible Plan G: $240/month + $2,700 deductible\n• Annual Cost Range: $3,000-8,500 depending on choice\n\n⚖️ DECISION FACTORS:\n• Doctor Choice Freedom: Important for established relationships\n• Nationwide Coverage: Critical for travel lifestyle\n• Predictable Costs: Fixed premiums vs variable out-of-pocket\n• Prescription Coverage: Current medications and future needs\n• Financial Impact: Premium costs vs potential medical expenses",
    age: 74,
    monthlyIncome: 8400,
    context: "Medicare supplement decisions affect healthcare costs and access for remainder of retirement. Choice impacts both financial and medical outcomes.",
    options: [
      {
        id: "comprehensive_plan_g",
        label: "Comprehensive Medigap Plan G",
        description: "Purchase Plan G supplement for comprehensive coverage, predictable costs, nationwide provider access.",
        impact: { netWorth: -2000, savings: -2220, withdrawal: 0, healthcareCosts: -5000, emotion: 3, knowledge: 4, risk: 1 },
        consequences: {
          immediate: "Higher monthly premiums but comprehensive healthcare coverage",
          shortTerm: "Predictable healthcare costs with minimal out-of-pocket expenses",
          longTerm: "Peace of mind with comprehensive coverage but higher premium inflation"
        }
      },
      {
        id: "medicare_advantage_network",
        label: "Medicare Advantage Plan",
        description: "Choose Medicare Advantage for lower premiums, accept network restrictions, gain extra benefits like dental/vision.",
        impact: { netWorth: 3000, savings: 1500, withdrawal: 0, healthcareCosts: 2000, emotion: 1, knowledge: 3, risk: 3 },
        consequences: {
          immediate: "Significant premium savings but network and prior authorization restrictions",
          shortTerm: "Lower monthly costs but potential access issues when traveling",
          longTerm: "Savings on premiums but possible higher costs for out-of-network care"
        }
      },
      {
        id: "high_deductible_strategy",
        label: "High-Deductible Plan G Strategy",
        description: "Choose high-deductible Plan G, self-insure first $2,700, balance premium savings with risk.",
        impact: { netWorth: 1000, savings: 1440, withdrawal: 0, healthcareCosts: 1000, emotion: 2, knowledge: 4, risk: 2 },
        consequences: {
          immediate: "Lower premiums but exposure to first $2,700 in medical costs",
          shortTerm: "Moderate healthcare costs with some out-of-pocket risk",
          longTerm: "Premium savings if healthy, but potential high costs if medical needs increase"
        }
      }
    ],
    learningPoint: "Medicare supplement insurance provides predictable healthcare costs but requires careful analysis of premiums, coverage, and personal health needs."
  },

  {
    id: 3,
    title: "Social Security Tax Optimization",
    description: "Age 75: Managing Social Security taxation. Provisional income calculation and strategies to minimize taxes on Social Security benefits.",
    situation: "📊 SOCIAL SECURITY TAX OPTIMIZATION:\n\n💰 SOCIAL SECURITY INCOME ANALYSIS:\n• Monthly Social Security Benefit: $3,200\n• Annual Social Security Income: $38,400\n• Taxable Portion: 0%, 50%, or 85% depending on provisional income\n• Current Provisional Income: $89,250\n• Tax Threshold 1: $44,000 (married filing jointly)\n• Tax Threshold 2: $56,000 (married filing jointly)\n• Current Tax Rate on SS: 85% of benefits taxable\n\n🔍 PROVISIONAL INCOME CALCULATION:\n• Adjusted Gross Income: $45,850 (RMDs, pension, interest)\n• Tax-Exempt Interest: $5,000 (municipal bonds)\n• 50% of Social Security: $19,200\n• Total Provisional Income: $70,050\n• Exceeds Both Thresholds: 85% of SS benefits taxable\n• Taxable SS Amount: $32,640 annually\n\n📈 INCOME SOURCE BREAKDOWN:\n• Required Minimum Distributions: $45,850\n• Pension Income: $21,600\n• Social Security: $38,400 (85% taxable)\n• Investment Interest/Dividends: $8,500\n• Municipal Bond Interest: $5,000 (tax-free)\n• Total Income: $119,350\n• Taxable Income: $104,350\n\n💡 TAX REDUCTION STRATEGIES:\n• Roth Conversions: Convert traditional to Roth in low-income years\n• Municipal Bonds: Increase tax-free income allocation\n• Tax-Loss Harvesting: Offset gains with losses\n• Asset Location: Hold income-producing investments in tax-deferred accounts\n• Charitable Giving: QCD reduces AGI and provisional income\n• Geographic Arbitrage: Move to state with no retirement income tax\n\n⚖️ INCOME MANAGEMENT OPTIONS:\n• Reduce Taxable Investments: Shift to growth vs income focus\n• Increase Municipal Bond Allocation: 30% → 50% of taxable portfolio\n• Maximize QCD: $15,000 annually direct to charity\n• Defer Investment Income: Focus on unrealized capital gains\n• State Tax Considerations: Some states don't tax Social Security\n\n🎯 LONG-TERM TAX PLANNING:\n• RMDs Increase: 4-5% annually as life expectancy decreases\n• Social Security COLA: 2-3% annually with inflation adjustments\n• Tax Bracket Creep: Increasing income may push into higher brackets\n• State Tax Changes: Monitor legislation affecting retiree taxation\n• Legacy Planning: Coordinate with estate tax minimization",
    age: 75,
    monthlyIncome: 8400,
    context: "Social Security taxation is complex and based on provisional income. Strategic income management can significantly reduce tax burden.",
    options: [
      {
        id: "municipal_bond_strategy",
        label: "Municipal Bond Income Strategy",
        description: "Shift 40% of taxable investments to municipal bonds, reduce provisional income, lower Social Security taxes.",
        impact: { netWorth: -5000, savings: 8500, withdrawal: 0, healthcareCosts: 0, emotion: 2, knowledge: 4, risk: 2 },
        consequences: {
          immediate: "Lower taxable income but reduced investment yield potential",
          shortTerm: "Significant reduction in Social Security taxation",
          longTerm: "Tax-free income stream but potentially lower total returns"
        }
      },
      {
        id: "charitable_qcd_maximize",
        label: "Maximize Charitable QCD Strategy",
        description: "Increase QCD to $25K annually, reduce RMD income, lower provisional income threshold significantly.",
        impact: { netWorth: -15000, savings: 6200, withdrawal: -25000, healthcareCosts: 0, emotion: 3, knowledge: 5, risk: 1 },
        consequences: {
          immediate: "Major reduction in taxable income through charitable giving",
          shortTerm: "Social Security becomes 50% taxable instead of 85%",
          longTerm: "Continued charitable impact with substantial tax savings"
        }
      },
      {
        id: "geographic_relocation",
        label: "Relocate to Tax-Friendly State",
        description: "Move to Florida/Texas with no state income tax, maintain current investment strategy, save on state taxes.",
        impact: { netWorth: 2000, savings: 4800, withdrawal: 0, healthcareCosts: 0, emotion: 0, knowledge: 3, risk: 3 },
        consequences: {
          immediate: "Major relocation costs but elimination of state income taxes",
          shortTerm: "Adjustment to new location but significant tax savings",
          longTerm: "Continued state tax savings but loss of current community connections"
        }
      }
    ],
    learningPoint: "Social Security taxation depends on provisional income, not just Social Security benefits. Strategic income management can reduce overall tax burden."
  },

  {
    id: 4,
    title: "Long-Term Care Cost Management",
    description: "Age 77: Managing increasing care costs. Home care vs assisted living vs family care decisions with insurance coordination.",
    situation: "🏥 LONG-TERM CARE COST REALITY:\n\n💰 CURRENT CARE SITUATION:\n• Home Health Aide: 20 hours/week at $25/hour = $26,000 annually\n• Medical Equipment: Walker, shower chair, medical alert = $2,500\n• Home Modifications: Ramps, grab bars, bathroom safety = $8,500\n• Transportation: Medical appointments, errands = $3,600 annually\n• Total Current Care Costs: $40,600 annually\n• Insurance Coverage: LTC policy pays $150/day = $54,750 annually\n\n📊 CARE LEVEL PROGRESSION ANALYSIS:\n• Current Needs: Help with 2 ADLs (bathing, medication management)\n• Projected Needs: Likely to need 4+ ADLs within 2 years\n• Home Care Increase: 40 hours/week = $52,000 annually\n• Assisted Living Cost: $4,500/month = $54,000 annually\n• Memory Care: $6,500/month = $78,000 annually\n• Nursing Home: $9,000/month = $108,000 annually\n\n🏠 CARE SETTING OPTIONS:\n• Age in Place: $52,000-78,000 annually with full-time care\n• Assisted Living: $54,000 annually plus medical costs\n• Adult Children Care: $25,000 annually plus family impact\n• Continuing Care Community: $85,000 annually all-inclusive\n• Nursing Home: $108,000 annually for skilled care\n\n💡 INSURANCE COORDINATION:\n• LTC Insurance: $200/day benefit, 4-year benefit period\n• Medicare: Covers skilled nursing (limited), no long-term custodial\n• Medicaid Planning: Asset spend-down required for qualification\n• HSA Funds: $125,000 available for tax-free medical expenses\n• Home Equity: $485,000 could fund care costs\n\n⚖️ FAMILY IMPACT CONSIDERATIONS:\n• Spouse Health: Also requiring increasing care assistance\n• Adult Children: Live 500+ miles away, limited availability\n• Grandchildren: College expenses competing for family resources\n• Quality of Life: Independence vs safety vs family time\n• Care Coordination: Managing multiple providers and services\n\n🎯 FINANCIAL SUSTAINABILITY ANALYSIS:\n• Current Retirement Income: $100,650 annually\n• Care Cost Coverage: Insurance covers most current costs\n• Future Care Costs: Will exceed insurance benefits\n• Asset Depletion Timeline: 8-12 years at current spending\n• Spouse Protection: Preserve assets for surviving spouse care",
    age: 77,
    monthlyIncome: 8400,
    context: "Long-term care costs accelerate with age and health decline. Coordinating insurance, family resources, and care settings is critical.",
    options: [
      {
        id: "comprehensive_home_care",
        label: "Comprehensive Home Care Strategy",
        description: "Increase home care to 40 hours/week, maximize insurance benefits, age in place with full support.",
        impact: { netWorth: -25000, savings: -52000, withdrawal: 52000, healthcareCosts: 52000, emotion: 3, knowledge: 3, risk: 2 },
        consequences: {
          immediate: "Significant cost increase but remaining in familiar environment",
          shortTerm: "High-quality care at home but major financial impact",
          longTerm: "Independence maintained but accelerated asset depletion"
        }
      },
      {
        id: "assisted_living_transition",
        label: "Assisted Living Community Move",
        description: "Move to high-quality assisted living, sell home, use proceeds plus insurance for comprehensive care.",
        impact: { netWorth: 400000, savings: -54000, withdrawal: 54000, healthcareCosts: 54000, emotion: 1, knowledge: 4, risk: 2 },
        consequences: {
          immediate: "Major life transition but professional care and social interaction",
          shortTerm: "Adjustment period but comprehensive care and activities",
          longTerm: "Home equity funds care costs, professional medical support available"
        }
      },
      {
        id: "family_care_coordination",
        label: "Family Care Coordination Plan",
        description: "Adult child moves nearby, reduce professional care to 20 hours/week, family provides additional support.",
        impact: { netWorth: -10000, savings: -35000, withdrawal: 35000, healthcareCosts: 35000, emotion: 2, knowledge: 2, risk: 4 },
        consequences: {
          immediate: "Lower care costs but significant family disruption and responsibility",
          shortTerm: "Family bonding but caregiver stress and career impact for adult child",
          longTerm: "Cost savings but potential family relationship strain and burnout"
        }
      }
    ],
    learningPoint: "Long-term care costs can quickly exhaust retirement savings. Coordinating insurance, family resources, and appropriate care settings is essential."
  },

  {
    id: 5,
    title: "Estate Planning and Legacy Distribution",
    description: "Age 79: Estate planning decisions. Will updates, beneficiary designations, gift strategies, and tax-efficient wealth transfer to heirs.",
    situation: "📋 COMPREHENSIVE ESTATE PLANNING REVIEW:\n\n💰 CURRENT ESTATE COMPOSITION:\n• Traditional IRA/401k: $445,000 (after RMDs and care costs)\n• Roth IRA: $225,000 (grown tax-free)\n• Taxable Investment Account: $285,000\n• HSA: $85,000 (medical expenses only)\n• Home (if kept): $525,000\n• Personal Property: $35,000\n• Total Estate Value: $1,600,000\n\n🎯 BENEFICIARY STRUCTURE:\n• Spouse: Primary beneficiary for retirement accounts\n• Adult Children (3): Equal shares of remaining estate\n• Grandchildren (7): Educational trusts consideration\n• Charity: Considering 10% legacy gift\n• Current Will: Last updated 8 years ago, needs revision\n\n📊 TAX IMPLICATIONS FOR HEIRS:\n• Traditional IRA/401k: Heirs pay income taxes on withdrawals\n• 10-Year Rule: Non-spouse beneficiaries must empty accounts\n• Roth IRA: Tax-free inheritance for beneficiaries\n• Taxable Investments: Step-up in cost basis at death\n• Home: Step-up in basis, capital gains elimination\n• Estate Tax: Federal exemption $13.61M (2024), no concern\n\n💡 WEALTH TRANSFER STRATEGIES:\n• Annual Gifts: $18,000 per person per year tax-free\n• Charitable QCD: Direct IRA distributions to charity\n• Roth Conversions: Convert traditional to Roth for tax-free inheritance\n• Generation-Skipping Trust: Direct gifts to grandchildren\n• Charitable Remainder Trust: Income stream plus charitable legacy\n\n⚖️ FAMILY CONSIDERATIONS:\n• Adult Children Financial Status: Varying needs and tax situations\n• Grandchildren Education: 7 grandchildren needing college funding\n• Family Harmony: Equal treatment vs. need-based distribution\n• Charitable Giving: Values-based legacy to favorite causes\n• Care Costs Impact: Remaining assets after care expenses\n\n🔍 ADVANCED PLANNING STRATEGIES:\n• Revocable Living Trust: Avoid probate, maintain control\n• Irrevocable Life Insurance Trust: Estate tax reduction\n• Qualified Personal Residence Trust: Transfer home at discount\n• Charitable Lead Annuity Trust: Reduce gift taxes on transfers\n• Family Limited Partnership: Discount large asset transfers\n\n📋 IMMEDIATE ACTION ITEMS:\n• Update Will and Powers of Attorney\n• Review Beneficiary Designations on All Accounts\n• Consider Trust Structures for Complex Situations\n• Implement Annual Gifting Strategy\n• Document Care Preferences and Medical Directives",
    age: 79,
    monthlyIncome: 8400,
    context: "Estate planning becomes urgent in later years. Tax-efficient wealth transfer strategies can significantly benefit heirs and charities.",
    options: [
      {
        id: "aggressive_roth_conversion",
        label: "Aggressive Roth Conversion for Heirs",
        description: "Convert remaining traditional IRA to Roth over 3 years, pay taxes now for tax-free inheritance.",
        impact: { netWorth: -65000, savings: -150000, withdrawal: 150000, healthcareCosts: 0, emotion: 1, knowledge: 5, risk: 2 },
        consequences: {
          immediate: "Large tax bill but creating tax-free inheritance for children",
          shortTerm: "Reduced current assets but optimized tax situation for heirs",
          longTerm: "Heirs receive tax-free Roth IRA inheritance worth significantly more"
        }
      },
      {
        id: "charitable_legacy_strategy",
        label: "Charitable Legacy Strategy",
        description: "Establish charitable remainder trust, create income stream, leave 25% of estate to charity, reduce taxes.",
        impact: { netWorth: -250000, savings: 15000, withdrawal: 0, healthcareCosts: 0, emotion: 3, knowledge: 4, risk: 1 },
        consequences: {
          immediate: "Reduced estate for heirs but increased current income and tax benefits",
          shortTerm: "Charitable income tax deductions and steady trust income",
          longTerm: "Meaningful charitable legacy with some assets still passing to family"
        }
      },
      {
        id: "family_gifting_strategy",
        label: "Systematic Family Gifting Plan",
        description: "Gift $18K annually to each child and grandchild, reduce estate size, support family during lifetime.",
        impact: { netWorth: -180000, savings: -18000, withdrawal: 18000, healthcareCosts: 0, emotion: 2, knowledge: 3, risk: 1 },
        consequences: {
          immediate: "Annual gifting reduces estate but provides immediate family support",
          shortTerm: "Systematic wealth transfer with family appreciation and involvement",
          longTerm: "Smaller estate but children benefit from gifts during lifetime"
        }
      }
    ],
    learningPoint: "Estate planning should optimize tax efficiency for heirs while reflecting personal values and family needs. Earlier planning provides more options."
  }
];