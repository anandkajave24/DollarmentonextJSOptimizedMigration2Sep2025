// Mid-Career Professional Financial Journey - 15 Stages
export interface MidCareerStageOption {
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
    taxOptimization: number;
  };
  consequences: {
    immediate: string;
    shortTerm: string;
    longTerm: string;
  };
}

export interface MidCareerGameStage {
  id: number;
  title: string;
  description: string;
  situation: string;
  age: number;
  monthlyIncome: number;
  context: string;
  options: MidCareerStageOption[];
  learningPoint: string;
}

export const midCareerStages: MidCareerGameStage[] = [
  {
    id: 1,
    title: "Peak Earnings 401k Maximization",
    description: "Age 42: Earning $12K/month, maximizing retirement contributions. 401k limits vs backdoor Roth IRA vs taxable investing strategy.",
    situation: "💰 PEAK EARNING YEARS - 401K OPTIMIZATION\n\n💼 YOUR SITUATION:\nAge 42 • $12K/month gross • 401k balance: $285K\nEmergency fund: $45K • Current savings rate: 25%\n\n🎯 401K OPPORTUNITY:\n• Annual limit: $23K • Currently contributing: $15K\n• Unused space: $8K annually\n• Company match: 50% on first 6% (getting full match)\n\n💡 ADVANCED OPTIONS:\n• Backdoor Roth IRA: $7K annually\n• Mega Backdoor Roth: Up to $69K total limit\n• HSA: $4.3K triple tax advantage\n\n⚡ COMPETING PRIORITIES:\n• College fund: $800/month needed\n• Home renovation: $60K kitchen remodel\n• Investment property: $100K down payment\n• Aging parents: Potential support needed",
    age: 42,
    monthlyIncome: 12000,
    context: "Peak earning years require optimizing retirement contributions while balancing multiple financial priorities and tax strategies.",
    options: [
      {
        id: "maximize_all_retirement",
        label: "Maximum Retirement Contributions",
        description: "Max 401k ($23K), backdoor Roth IRA ($7K), HSA ($4.3K), sacrifice other goals temporarily.",
        impact: { netWorth: 15000, savings: -34300, retirement401k: 34300, emotion: 1, knowledge: 4, risk: 1, taxOptimization: 5 },
        consequences: {
          immediate: "Maximum tax-advantaged savings but reduced cash flow for other goals",
          shortTerm: "Delayed home improvements and college savings but optimal retirement trajectory",
          longTerm: "Compound growth in tax-advantaged accounts creates substantial retirement wealth"
        }
      },
      {
        id: "balanced_optimization",
        label: "Balanced Multi-Goal Approach",
        description: "Increase 401k to $20K, backdoor Roth $7K, allocate $1,500/month to college and home fund.",
        impact: { netWorth: 8000, savings: -27000, retirement401k: 20000, emotion: 2, knowledge: 3, risk: 2, taxOptimization: 3 },
        consequences: {
          immediate: "Balanced approach meeting multiple financial objectives simultaneously",
          shortTerm: "Steady progress on retirement, college, and home improvement goals",
          longTerm: "Well-rounded financial progress but potentially less retirement wealth"
        }
      },
      {
        id: "mega_backdoor_strategy",
        label: "Mega Backdoor Roth Strategy",
        description: "Max traditional 401k, implement mega backdoor Roth with after-tax contributions up to IRS limits.",
        impact: { netWorth: 20000, savings: -45000, retirement401k: 45000, emotion: 0, knowledge: 5, risk: 3, taxOptimization: 5 },
        consequences: {
          immediate: "Sophisticated tax strategy requiring high cash flow commitment",
          shortTerm: "Maximum retirement savings but significant impact on current lifestyle",
          longTerm: "Exceptional retirement wealth accumulation with tax-free growth potential"
        }
      }
    ],
    learningPoint: "Peak earning years are critical for retirement wealth building. Maximize tax-advantaged accounts while balancing other life goals."
  },

  {
    id: 2,
    title: "Backdoor Roth IRA Implementation",
    description: "Age 43: Income too high for direct Roth IRA. Backdoor Roth strategy vs traditional IRA complications vs taxable investments.",
    situation: "🔄 BACKDOOR ROTH IRA STRATEGY\n\n💼 THE PROBLEM:\nAGI: $150K • Too high for direct Roth IRA\nPhase-out limit: $138K-153K • Need backdoor strategy\n\n📋 BACKDOOR PROCESS:\n1. Contribute $7K to non-deductible traditional IRA\n2. Immediately convert to Roth IRA\n3. Pay taxes on any growth during conversion\n\n⚠️ COMPLICATION:\nExisting traditional IRA: $25K from old 401k rollover\nPro-rata rule = conversion partially taxable\n\n💡 OPTIONS:\n• Execute backdoor with pro-rata complications\n• Rollover existing IRA to 401k first (clean slate)\n• Use taxable account with tax-loss harvesting\n\n⚡ 20-YEAR IMPACT:\nBackdoor Roth: $500K+ (tax-free)\nTaxable account: $450K+ (after taxes)",
    age: 43,
    monthlyIncome: 12000,
    context: "High-income earners must navigate complex IRA rules and tax strategies to optimize retirement savings beyond 401k limits.",
    options: [
      {
        id: "implement_backdoor_roth",
        label: "Implement Backdoor Roth IRA",
        description: "Execute full backdoor Roth strategy, deal with pro-rata rule complications, optimize for long-term tax-free growth.",
        impact: { netWorth: 3000, savings: -7000, retirement401k: 7000, emotion: 0, knowledge: 5, risk: 2, taxOptimization: 4 },
        consequences: {
          immediate: "Complex tax strategy implementation with immediate conversion taxes",
          shortTerm: "Annual process requiring careful documentation and timing",
          longTerm: "Significant tax-free retirement wealth accumulation over 20+ years"
        }
      },
      {
        id: "clean_slate_approach",
        label: "Clean Slate Rollover Strategy",
        description: "Rollover existing traditional IRA to 401k, then implement clean backdoor Roth without pro-rata complications.",
        impact: { netWorth: 5000, savings: -7000, retirement401k: 7000, emotion: 1, knowledge: 4, risk: 1, taxOptimization: 5 },
        consequences: {
          immediate: "Additional administrative work but cleaner tax strategy going forward",
          shortTerm: "Simplified annual backdoor Roth process without tax complications",
          longTerm: "Optimal tax-free wealth building with minimal ongoing complexity"
        }
      },
      {
        id: "taxable_investment_focus",
        label: "Taxable Investment Account Focus",
        description: "Skip Roth complications, invest $7K annually in taxable account with tax-loss harvesting strategy.",
        impact: { netWorth: 4000, savings: -7000, emotion: 2, knowledge: 2, risk: 2, retirement401k: 0, taxOptimization: 2 },
        consequences: {
          immediate: "Simple investment approach without IRA conversion complexities",
          shortTerm: "Flexible access to investments with annual tax-loss harvesting benefits",
          longTerm: "Good investment growth but less tax efficiency than Roth IRA strategy"
        }
      }
    ],
    learningPoint: "High-income earners must master complex tax strategies like backdoor Roth IRA to optimize retirement savings beyond basic contribution limits."
  },

  {
    id: 3,
    title: "College Education Funding Strategy",
    description: "Age 44: Child entering high school, college costs $35K/year in 4 years. 529 vs investment account vs home equity decisions.",
    situation: "🎓 COLLEGE FUNDING CRISIS PLANNING:\n\n📚 COLLEGE COST REALITY CHECK:\n• Child Age: 14 (entering high school)\n• College Start: 4 years from now\n• Estimated Annual Cost: $35,000 (in-state public university)\n• Total 4-Year Cost: $140,000\n• Cost Inflation: 5% annually (faster than general inflation)\n• Current College Savings: $45,000 in 529 plan\n\n💰 FUNDING GAP ANALYSIS:\n• Current 529 Balance: $45,000\n• Projected 529 Growth: 7% annually = $59,000 in 4 years\n• Total College Need: $140,000\n• Funding Shortfall: $81,000\n• Required Monthly Savings: $1,500 for next 4 years\n• Alternative: Student loans at 6.5% interest\n\n🏠 HOME EQUITY CONSIDERATION:\n• Current Home Value: $550,000\n• Mortgage Balance: $220,000\n• Available Home Equity: $330,000\n• HELOC Option: $100,000 at 7.5% interest\n• Cash-out Refinance: $300,000 at 6.8% (30-year)\n• Home Equity vs Student Loans: Interest deductibility considerations\n\n📊 INVESTMENT STRATEGY OPTIONS:\n• 529 Plan: Tax-free growth for education, limited to education expenses\n• Taxable Investment Account: Flexible use, capital gains treatment\n• Roth IRA: Can withdraw contributions penalty-free for education\n• Conservative Approach: CDs/bonds for guaranteed principal\n• Aggressive Approach: Stock market investments with higher volatility\n\n⚖️ COMPETING FINANCIAL PRIORITIES:\n• College Funding: $1,500/month needed\n• Current Retirement Savings: $2,500/month\n• Home Maintenance: $500/month ongoing\n• Family Vacation Budget: $800/month\n• Emergency Fund Maintenance: $200/month\n• Total Monthly Obligations: $5,500 vs $8,500 income",
    age: 44,
    monthlyIncome: 12000,
    context: "Mid-career professionals face the college funding crunch while maintaining retirement savings and other financial obligations.",
    options: [
      {
        id: "aggressive_529_funding",
        label: "Aggressive 529 Plan Funding",
        description: "Redirect $1,800/month to 529 plan, reduce retirement contributions temporarily, aim for full college funding.",
        impact: { netWorth: 5000, savings: -21600, retirement401k: -10800, emotion: 0, knowledge: 3, risk: 3, taxOptimization: 3 },
        consequences: {
          immediate: "Significant cash flow reallocation impacting retirement savings growth",
          shortTerm: "4 years of reduced retirement contributions but growing college fund",
          longTerm: "Child graduates debt-free but retirement savings timeline extended by 2-3 years"
        }
      },
      {
        id: "balanced_funding_approach",
        label: "Balanced Funding with Loans",
        description: "Maintain retirement savings, increase 529 by $1,000/month, plan for $50K in student loans at graduation.",
        impact: { netWorth: 2000, savings: -12000, retirement401k: 0, emotion: 1, knowledge: 3, risk: 2, taxOptimization: 2 },
        consequences: {
          immediate: "Moderate increase in college savings while preserving retirement trajectory",
          shortTerm: "Balanced approach to multiple financial goals",
          longTerm: "Child has manageable debt burden, parents maintain retirement security"
        }
      },
      {
        id: "home_equity_strategy",
        label: "Home Equity Financing Strategy",
        description: "Maintain current savings, use HELOC for college costs, leverage home equity for education investment.",
        impact: { netWorth: -5000, savings: 0, debt: 100000, emotion: -1, knowledge: 4, risk: 4, retirement401k: 0, taxOptimization: 3 },
        consequences: {
          immediate: "No change to current savings patterns but future debt obligation",
          shortTerm: "College costs covered without cash flow disruption",
          longTerm: "Home equity debt requires repayment but retirement savings continue growing"
        }
      }
    ],
    learningPoint: "College funding requires balancing children's education needs with parents' retirement security. Start early and consider all financing options."
  },

  {
    id: 4,
    title: "Investment Property Opportunity",
    description: "Age 45: Real estate investment opportunity. $120K down payment for rental property vs continued stock market investing.",
    situation: "🏘️ REAL ESTATE INVESTMENT DECISION:\n\n🏠 INVESTMENT PROPERTY ANALYSIS:\n• Property Price: $400,000 (duplex in growing suburb)\n• Down Payment Required: $120,000 (30% for investment property)\n• Monthly Rental Income: $3,200 ($1,600 per unit)\n• Monthly Expenses: $2,400 (mortgage, taxes, insurance, maintenance)\n• Net Monthly Cash Flow: $800 positive\n• Cap Rate: 7.2% (good for the market)\n• Estimated Annual Appreciation: 4-5%\n\n💰 FINANCING DETAILS:\n• Loan Amount: $280,000\n• Interest Rate: 7.25% (investment property rates)\n • Monthly P&I Payment: $1,900\n• Property Taxes: $350/month\n• Insurance: $150/month\n• Vacancy Allowance: 8% annually ($256/month reserve)\n• Maintenance Reserve: $200/month\n\n📊 ALTERNATIVE INVESTMENT COMPARISON:\n• Stock Market Investment: $120,000 initial + $800/month\n• Expected Stock Return: 10% annually (historical average)\n• Real Estate Total Return: 7.2% cap rate + 4% appreciation = 11.2%\n• Stock Market Liquidity: High (can sell anytime)\n• Real Estate Liquidity: Low (6+ months to sell)\n• Tax Benefits: Depreciation, repairs, mortgage interest deductions\n\n⚠️ REAL ESTATE RISKS & CONSIDERATIONS:\n• Tenant Management: Screening, maintenance calls, evictions\n• Market Risk: Local real estate market downturns\n• Interest Rate Risk: Variable rate after initial period\n• Capital Requirements: Major repairs, vacancy periods\n• Time Commitment: Property management responsibilities\n• Concentration Risk: Large portion of wealth in real estate\n\n💡 IMPLEMENTATION OPTIONS:\n• Self-Management: Higher returns but more time commitment\n• Property Management Company: 8-10% of rental income fee\n• Real Estate Investment Trust (REIT): Liquid real estate exposure\n• Real Estate Crowdfunding: Lower minimum investment\n• House Hacking: Buy duplex, live in one unit",
    age: 45,
    monthlyIncome: 12000,
    context: "Mid-career professionals often consider real estate investing as portfolio diversification, requiring analysis of returns, risks, and time commitment.",
    options: [
      {
        id: "buy_investment_property",
        label: "Purchase Investment Property",
        description: "Buy duplex with $120K down, self-manage for maximum returns, diversify into real estate investing.",
        impact: { netWorth: 10000, savings: -120000, debt: 280000, emotion: 1, knowledge: 4, risk: 4, retirement401k: 0, taxOptimization: 4 },
        consequences: {
          immediate: "Major cash outlay but immediate rental income and tax benefits",
          shortTerm: "Learning curve for property management but steady cash flow",
          longTerm: "Real estate appreciation and rental income growth build substantial wealth"
        }
      },
      {
        id: "reit_diversification",
        label: "REIT and Stock Market Mix",
        description: "Invest $120K in REITs (40%) and stock index funds (60%), maintain liquidity and diversification.",
        impact: { netWorth: 8000, savings: -120000, emotion: 2, knowledge: 3, risk: 2, retirement401k: 0, taxOptimization: 2 },
        consequences: {
          immediate: "Immediate diversification without property management responsibilities",
          shortTerm: "Passive income from dividends and market appreciation",
          longTerm: "Liquid portfolio with real estate exposure but no direct property ownership benefits"
        }
      },
      {
        id: "continue_stock_investing",
        label: "Continue Stock Market Focus",
        description: "Skip real estate, invest $120K + $800/month in diversified stock portfolio, maintain simplicity.",
        impact: { netWorth: 12000, savings: -120000, emotion: 2, knowledge: 2, risk: 2, retirement401k: 0, taxOptimization: 1 },
        consequences: {
          immediate: "Simple investment approach maintaining current strategy",
          shortTerm: "Continued stock market growth without real estate complexity",
          longTerm: "Concentrated stock portfolio with higher liquidity but missing real estate diversification"
        }
      }
    ],
    learningPoint: "Real estate investing can provide diversification and cash flow, but requires careful analysis of returns, risks, and time commitment vs stock market alternatives."
  },

  {
    id: 5,
    title: "Tax-Loss Harvesting Strategy",
    description: "Age 46: Large taxable investment account needs optimization. Tax-loss harvesting vs tax-deferred growth vs charitable giving strategies.",
    situation: "📈 TAX-LOSS HARVESTING OPTIMIZATION:\n\n💼 TAXABLE INVESTMENT PORTFOLIO:\n• Current Taxable Account Value: $275,000\n• Annual Contributions: $18,000\n• Current Allocation: 70% stocks, 30% bonds\n• Unrealized Gains: $85,000 (long-term)\n• Unrealized Losses: $15,000 (various positions)\n• Annual Dividend Income: $8,500\n• Projected Capital Gains: $12,000 this year\n\n📊 TAX OPTIMIZATION OPPORTUNITIES:\n• Tax-Loss Harvesting: Realize $15,000 in losses\n• Capital Gains Offset: Reduce taxable gains to zero\n• Loss Carryforward: $3,000 annual ordinary income offset\n• Wash Sale Rule: Must avoid repurchasing same securities for 30 days\n• Asset Location: Move tax-inefficient investments to tax-deferred accounts\n\n🎯 ADVANCED TAX STRATEGIES:\n• Charitable Giving: Donate appreciated stock directly (avoid capital gains)\n• Qualified Small Business Stock (QSBS): Up to $10M gain exclusion\n• Opportunity Zones: Defer and reduce capital gains through qualified investments\n• Municipal Bonds: Tax-free interest income for high earners\n• I Bonds: Inflation-protected, tax-deferred growth up to $10K annually\n\n💰 CURRENT TAX SITUATION:\n• Marginal Tax Rate: 24% federal + 6% state = 30%\n• Capital Gains Rate: 15% federal + 6% state = 21%\n• Tax-Loss Harvesting Benefit: $3,150 current year savings\n• Charitable Deduction Benefit: Avoid $17,850 in capital gains taxes\n• Municipal Bond Equivalent Yield: 5.2% taxable = 3.6% tax-free\n\n⚖️ PORTFOLIO REBALANCING CONSIDERATIONS:\n• Current Asset Allocation: Drift from target allocation\n• Rebalancing Trigger: 5% deviation from target\n• Tax-Efficient Rebalancing: Use new contributions and tax-loss harvesting\n• Asset Location Optimization: Hold bonds in tax-deferred accounts\n• International Tax Credits: Foreign tax credit for international fund holdings",
    age: 46,
    monthlyIncome: 12000,
    context: "Large taxable accounts require sophisticated tax optimization strategies to maximize after-tax returns and minimize annual tax burden.",
    options: [
      {
        id: "aggressive_tax_harvesting",
        label: "Aggressive Tax-Loss Harvesting",
        description: "Systematically harvest losses, donate appreciated stock to charity, optimize asset location across accounts.",
        impact: { netWorth: 8000, savings: 3150, emotion: 1, knowledge: 5, risk: 2, retirement401k: 0, taxOptimization: 5 },
        consequences: {
          immediate: "Significant tax savings this year through multiple optimization strategies",
          shortTerm: "Ongoing tax efficiency requires active portfolio management",
          longTerm: "Maximized after-tax wealth accumulation through consistent tax optimization"
        }
      },
      {
        id: "charitable_giving_strategy",
        label: "Charitable Giving Tax Strategy",
        description: "Donate $50K appreciated stock to charity, establish donor-advised fund, maximize charitable deductions.",
        impact: { netWorth: 5000, savings: 17850, emotion: 2, knowledge: 4, risk: 1, retirement401k: 0, taxOptimization: 4 },
        consequences: {
          immediate: "Large charitable deduction and avoided capital gains taxes",
          shortTerm: "Donor-advised fund provides ongoing charitable giving flexibility",
          longTerm: "Reduced taxable portfolio but significant tax benefits and charitable impact"
        }
      },
      {
        id: "simple_tax_efficiency",
        label: "Basic Tax-Efficient Approach",
        description: "Implement basic tax-loss harvesting, hold tax-efficient index funds, maintain portfolio simplicity.",
        impact: { netWorth: 6000, savings: 1500, emotion: 2, knowledge: 3, risk: 1, retirement401k: 0, taxOptimization: 3 },
        consequences: {
          immediate: "Modest tax savings with minimal complexity",
          shortTerm: "Set-and-forget approach to tax-efficient investing",
          longTerm: "Good after-tax returns without requiring ongoing active management"
        }
      }
    ],
    learningPoint: "Large taxable investment accounts benefit significantly from tax-loss harvesting, charitable giving, and asset location optimization strategies."
  }
];