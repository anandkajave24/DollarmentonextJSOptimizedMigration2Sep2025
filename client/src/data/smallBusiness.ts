// Small Business Owner Financial Journey - 15 Stages
export interface SmallBusinessStageOption {
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
    businessValue: number;
    cashFlow: number;
  };
  consequences: {
    immediate: string;
    shortTerm: string;
    longTerm: string;
  };
}

export interface SmallBusinessGameStage {
  id: number;
  title: string;
  description: string;
  situation: string;
  age: number;
  monthlyIncome: number;
  context: string;
  options: SmallBusinessStageOption[];
  learningPoint: string;
}

export const smallBusinessStages: SmallBusinessGameStage[] = [
  {
    id: 1,
    title: "Employee to Entrepreneur Decision Point",
    description: "Age 29: The crossroads moment - secure $6K job vs $2K startup with exponential growth potential. Classic security vs freedom choice.",
    situation: "🚀 EMPLOYEE TO ENTREPRENEUR DECISION\n\n💼 YOUR CURRENT SITUATION:\n• Age 29 with stable $6K/month salary + $800 benefits package\n• Predictable career advancement and 3 weeks paid vacation\n• Full health insurance coverage included\n• Comfortable but limited growth ceiling\n\n🏢 THE BUSINESS OPPORTUNITY:\n• Marketing consultancy with 3 confirmed clients ($2K/month guaranteed)\n• Realistic growth trajectory: $8K-15K/month within 2-3 years\n• Initial startup investment: $5K • Operating expenses: $800/month\n• Unlimited income potential vs salary cap\n\n💰 THE FINANCIAL REALITY CHECK:\n• Employee path: $6K guaranteed (but capped) monthly income\n• Entrepreneur path: $1.2K initially (high risk, could hit $0 some months)\n• Health insurance cost: $600/month out of pocket\n• 6-month runway needed for business stability\n\n⚡ YOUR THREE STRATEGIC OPTIONS:\n1️⃣ Full entrepreneurship leap (quit job, all-in approach)\n2️⃣ Side hustle strategy (keep job, build gradually)\n3️⃣ Hybrid approach (negotiate part-time, reduce risk)",
    age: 29,
    monthlyIncome: 6000,
    context: "The defining moment between financial security and entrepreneurial freedom - where calculated risk meets unlimited potential.",
    options: [
      {
        id: "full_entrepreneurship",
        label: "🚀 Full Entrepreneur Leap",
        description: "Quit job, go all-in on business. High risk, high reward. Use $18K savings to survive first 6 months while aggressively acquiring clients.",
        impact: { netWorth: -5000, savings: -12000, emotion: 3, knowledge: 5, risk: 8, businessValue: 15000, cashFlow: -3800 },
        consequences: {
          immediate: "Income drops from $6,800 to $1,400/month - stress but complete business focus",
          shortTerm: "6-month runway to prove business viability - make or break period",
          longTerm: "Unlimited income potential ($15K+/month) but could lose everything if clients don't materialize"
        }
      },
      {
        id: "side_hustle_approach",
        label: "💼 Smart Side Hustle Strategy",
        description: "Keep job, build business nights/weekends. Slow and steady approach - validate market before leaving security.",
        impact: { netWorth: 3000, savings: 2000, emotion: -1, knowledge: 3, risk: 2, businessValue: 8000, cashFlow: 2200 },
        consequences: {
          immediate: "Maintain $6,800 income plus $2K business income - exhausting 60+ hour weeks",
          shortTerm: "12-18 months to build sustainable client base while keeping day job benefits",
          longTerm: "Proven business model before transition - lower risk but slower growth trajectory"
        }
      },
      {
        id: "negotiated_transition",
        label: "🤝 Hybrid Negotiation Approach",
        description: "Negotiate 3-day work schedule ($3,600/month) + health benefits while dedicating 4 days to business growth.",
        impact: { netWorth: 1000, savings: -3000, emotion: 2, knowledge: 4, risk: 4, businessValue: 12000, cashFlow: 1000 },
        consequences: {
          immediate: "Balanced $5,600 total income ($3,600 job + $2,000 business) with health coverage",
          shortTerm: "Dedicated business development time while maintaining some job security",
          longTerm: "Best of both worlds - reduced risk with focused growth potential and benefit retention"
        }
      }
    ],
    learningPoint: "Entrepreneurial success requires matching your risk tolerance with growth strategy. Each path has different risk-reward profiles."
  },

  {
    id: 2,
    title: "First Major Client Opportunity",
    description: "Age 30: Landing first $5K/month client requires $15K upfront investment in team and equipment. Growth vs cash flow decision.",
    situation: "💼 MAJOR CLIENT ACQUISITION OPPORTUNITY:\n\n🎯 CLIENT OPPORTUNITY DETAILS:\n• Monthly Contract Value: $5,000 for 12 months\n• Total Contract: $60,000 guaranteed revenue\n• Project Requirements: Need 2 additional contractors\n• Equipment Needs: Advanced software licenses, hardware\n• Timeline: Must start in 30 days\n\n💰 INVESTMENT REQUIREMENTS:\n• Contractor Payments: $3,000/month ($1,500 each)\n• Software Licenses: $500/month\n• Equipment Purchase: $8,000 one-time\n• Additional Insurance: $200/month\n• Total Upfront: $15,000 initial investment\n• Monthly Overhead Increase: $3,700\n\n📊 FINANCIAL IMPACT ANALYSIS:\n• Gross Monthly Revenue: $5,000\n• Direct Costs: $3,700/month\n• Net Monthly Profit: $1,300\n• Current Business Income: $2,500/month\n• New Total Monthly: $3,800/month\n• ROI Timeline: 12 months to recover investment\n\n⚠️ RISK FACTORS:\n• Client Dependency: 60% of revenue from single client\n• Cash Flow: $15K investment reduces emergency fund\n• Contractor Management: New responsibility and complexity\n• Contract Risk: 12-month commitment but could be cancelled\n• Opportunity Cost: Could pursue 3 smaller clients instead\n\n🎯 ALTERNATIVE APPROACHES:\n• Decline and focus on multiple smaller clients\n• Negotiate payment terms to reduce upfront investment\n• Partner with another agency to share investment/risk\n• Phase implementation over 2-3 months",
    age: 30,
    monthlyIncome: 2500,
    context: "First major client opportunity tests business scaling ability and risk tolerance for concentrated revenue sources.",
    options: [
      {
        id: "full_investment",
        label: "Full Investment Commitment",
        description: "Invest $15K, hire contractors, buy equipment. Commit fully to delivering premium service.",
        impact: { netWorth: 5000, savings: -15000, debt: 5000, emotion: 1, knowledge: 4, risk: 4, businessValue: 25000, cashFlow: 1300 },
        consequences: {
          immediate: "Major cash outflow but guaranteed revenue stream for 12 months",
          shortTerm: "Higher monthly profits but increased operational complexity",
          longTerm: "Business scaling capability proven but concentrated client risk"
        }
      },
      {
        id: "phased_approach",
        label: "Phased Implementation",
        description: "Negotiate 3-month trial period, minimal upfront investment, prove value then scale up.",
        impact: { netWorth: 2000, savings: -5000, emotion: 2, knowledge: 3, risk: 2, businessValue: 15000, cashFlow: 800 },
        consequences: {
          immediate: "Lower risk approach but potentially reduced profit margins",
          shortTerm: "Proof of concept period with manageable investment",
          longTerm: "Sustainable growth with demonstrated capability"
        }
      },
      {
        id: "decline_focus_diversification",
        label: "Decline and Diversify",
        description: "Pass on large client, focus on acquiring 3-4 smaller clients to reduce concentration risk.",
        impact: { netWorth: 1000, savings: 2000, emotion: 0, knowledge: 2, risk: 1, businessValue: 12000, cashFlow: 500 },
        consequences: {
          immediate: "Missed major opportunity but maintained financial stability",
          shortTerm: "Slower growth but more diversified client base",
          longTerm: "Lower risk business model but potentially limited scaling"
        }
      }
    ],
    learningPoint: "Major client opportunities require balancing growth potential against concentration risk and cash flow management."
  },

  {
    id: 3,
    title: "Business Banking and Credit Decisions",
    description: "Age 31: Business growing, need to separate personal/business finances. Business credit line vs personal guarantee trade-offs.",
    situation: "🏦 BUSINESS FINANCIAL STRUCTURE:\n\n💳 CURRENT FINANCIAL MIXING:\n• Personal/Business Expenses: Mixed in personal accounts\n• Tax Complications: Difficult expense tracking\n• Professional Image: Writing personal checks to vendors\n• Legal Protection: No separation between personal/business assets\n• Credit Building: Missing business credit history\n\n🏢 BUSINESS BANKING OPTIONS:\n• Business Checking: $25/month, transaction fees\n• Business Savings: 0.5% APY, $100 minimum\n• Business Credit Line: $50K available at 8% interest\n• Business Credit Card: $25K limit, 2% cashback on purchases\n• Merchant Services: Credit card processing 2.9% fee\n\n📊 CREDIT ESTABLISHMENT PATHS:\n• Secured Business Credit: $10K deposit for $10K limit\n• Personal Guarantee Required: Most lenders require initially\n• Trade Credit: Net-30 terms with suppliers\n• Business Credit Card: Easier approval, higher rates\n• SBA Loan Preparation: Building credit for future growth\n\n💰 MONTHLY BUSINESS EXPENSES:\n• Current Monthly Revenue: $6,500\n• Business Expenses: $2,800/month\n• Personal Draw: $3,200/month\n• Emergency Business Fund: $8,000 needed\n• Seasonal Fluctuation: 20-30% revenue variation\n\n⚖️ PERSONAL GUARANTEE IMPLICATIONS:\n• Liability: Personal assets at risk for business debts\n• Credit Impact: Business defaults affect personal credit\n• Future Lending: Easier access to growth capital\n• Exit Strategy: Complications for business sale/closure",
    age: 31,
    monthlyIncome: 6500,
    context: "Establishing proper business financial structure while managing personal liability and building business credit.",
    options: [
      {
        id: "full_business_setup",
        label: "Complete Business Financial Setup",
        description: "Business banking, $50K credit line with personal guarantee, business credit card, proper accounting systems.",
        impact: { netWorth: 3000, savings: -2000, debt: 0, emotion: 1, knowledge: 4, risk: 3, businessValue: 20000, cashFlow: 0 },
        consequences: {
          immediate: "Professional financial structure but increased monthly fees",
          shortTerm: "Better expense tracking and tax preparation",
          longTerm: "Strong business credit foundation and growth funding access"
        }
      },
      {
        id: "minimal_separation",
        label: "Basic Business Banking Only",
        description: "Business checking and savings accounts, basic bookkeeping, no credit lines initially.",
        impact: { netWorth: 1500, savings: 0, emotion: 2, knowledge: 2, risk: 1, businessValue: 10000, cashFlow: -300 },
        consequences: {
          immediate: "Clean financial separation without debt obligations",
          shortTerm: "Limited growth funding but simplified management",
          longTerm: "Slower business credit building but reduced personal risk"
        }
      },
      {
        id: "gradual_transition",
        label: "Gradual Business Credit Building",
        description: "Start with business banking and credit card, build history for 12 months before credit line.",
        impact: { netWorth: 2000, savings: -500, debt: 0, emotion: 1, knowledge: 3, risk: 2, businessValue: 15000, cashFlow: -150 },
        consequences: {
          immediate: "Moderate setup costs with manageable complexity",
          shortTerm: "Building business credit history progressively",
          longTerm: "Balanced approach to credit access and risk management"
        }
      }
    ],
    learningPoint: "Proper business financial structure is essential for growth, tax efficiency, and personal asset protection."
  },

  {
    id: 4,
    title: "Scaling Team vs Solo Operations",
    description: "Age 32: Business at $10K/month revenue. Hiring first employee ($4K salary) vs staying solo and limiting growth.",
    situation: "👥 SCALING DECISION CROSSROADS:\n\n📈 CURRENT BUSINESS STATUS:\n• Monthly Revenue: $10,000\n• Personal Draw: $6,000/month\n• Business Expenses: $2,500/month\n• Net Business Profit: $1,500/month\n• Work Hours: 65-70 hours/week\n• Client Waitlist: 6 potential clients (unable to serve)\n\n💼 EMPLOYEE HIRE ANALYSIS:\n• Position: Junior consultant/assistant\n• Salary: $4,000/month ($48K annually)\n• Benefits Cost: $800/month (health, payroll taxes)\n• Additional Expenses: $500/month (equipment, training)\n• Total Employment Cost: $5,300/month\n• Revenue Potential: Could serve 4 additional clients\n\n📊 FINANCIAL PROJECTIONS:\n• With Employee Revenue: $16,000/month potential\n• Employee Costs: $5,300/month\n• Additional Business Expenses: $1,200/month\n• Net Increase: $4,500/month potential\n• Risk Factor: Employee costs are fixed, revenue variable\n\n⚠️ OPERATIONAL COMPLEXITIES:\n• Payroll Management: Monthly processing and tax filing\n• HR Responsibilities: Policies, performance management\n• Training Investment: 2-3 months to full productivity\n• Legal Compliance: Employment law requirements\n• Management Time: 15-20% of time managing vs producing\n\n🎯 GROWTH ALTERNATIVES:\n• Subcontractor Model: Pay per project (35% of revenue)\n• Automation Investment: $8K in software to increase efficiency\n• Premium Pricing: Raise rates 40% and serve fewer clients\n• Partnership: Join with another consultant for shared resources",
    age: 32,
    monthlyIncome: 10000,
    context: "Critical scaling decision between hiring employees vs alternative growth strategies for small business expansion.",
    options: [
      {
        id: "hire_employee",
        label: "Hire First Employee",
        description: "Hire junior consultant at $4K/month plus benefits. Commit to scaling team-based business model.",
        impact: { netWorth: 8000, savings: -3000, debt: 0, emotion: 0, knowledge: 4, risk: 4, businessValue: 40000, cashFlow: 2000 },
        consequences: {
          immediate: "Fixed monthly costs but increased capacity for revenue growth",
          shortTerm: "Management learning curve and training investment period",
          longTerm: "Scalable business model with team-based service delivery"
        }
      },
      {
        id: "subcontractor_model",
        label: "Subcontractor Network",
        description: "Build network of 3-4 subcontractors, pay 35% of project revenue, maintain flexibility.",
        impact: { netWorth: 6000, savings: 1000, emotion: 1, knowledge: 3, risk: 2, businessValue: 30000, cashFlow: 3500 },
        consequences: {
          immediate: "Variable costs aligned with revenue, reduced commitment",
          shortTerm: "Network building and quality control challenges",
          longTerm: "Flexible scaling but limited control over talent development"
        }
      },
      {
        id: "premium_positioning",
        label: "Premium Solo Practice",
        description: "Increase rates by 40%, serve fewer high-value clients, maintain solo operations with premium positioning.",
        impact: { netWorth: 4000, savings: 2000, emotion: 2, knowledge: 3, risk: 1, businessValue: 25000, cashFlow: 2000 },
        consequences: {
          immediate: "Higher profit margins with reduced workload",
          shortTerm: "Need to attract premium clients and justify higher rates",
          longTerm: "Sustainable solo practice but limited growth potential"
        }
      }
    ],
    learningPoint: "Business scaling requires choosing between employee overhead, subcontractor flexibility, or premium positioning strategies."
  },

  {
    id: 5,
    title: "Major Equipment vs Lease Decision",
    description: "Age 33: Business needs $25K specialized equipment. Buy cash vs lease vs finance options impact cash flow and taxes.",
    situation: "🔧 MAJOR EQUIPMENT INVESTMENT DECISION:\n\n💻 EQUIPMENT REQUIREMENTS:\n• Specialized Software Suite: $15,000\n• High-End Computer Setup: $8,000\n• Professional Camera Equipment: $2,000\n• Total Investment Needed: $25,000\n• Expected Useful Life: 4-5 years\n• Impact on Revenue: Enable $3K/month additional services\n\n💰 FINANCING OPTIONS COMPARISON:\n• Cash Purchase: $25,000 upfront, full ownership\n• Equipment Loan: $5,000 down, $550/month for 48 months\n• Equipment Lease: $650/month for 36 months, option to buy\n• Line of Credit: $25,000 at 9% interest, flexible payments\n• Current Business Cash: $35,000 available\n\n📊 TAX IMPLICATIONS:\n• Cash Purchase: $25,000 deduction (Section 179)\n• Loan Purchase: Depreciation + interest deduction\n• Lease Payments: Full monthly payment deductible\n• Tax Bracket: 24% effective rate\n• Cash Flow Impact: Varies significantly by option\n\n📈 REVENUE IMPACT ANALYSIS:\n• Additional Monthly Revenue: $3,000 potential\n• Equipment-Specific Profit Margin: 75%\n• Net Monthly Benefit: $2,250\n• Payback Period: 11-18 months depending on financing\n• Risk Factor: Equipment becomes obsolete in 3-4 years\n\n⚖️ CASH FLOW CONSIDERATIONS:\n• Current Monthly Revenue: $12,000\n• Emergency Fund Impact: Cash purchase leaves $10K emergency fund\n• Growth Capital: Need $15K for marketing and hiring\n• Seasonal Revenue: 25% variation in income",
    age: 33,
    monthlyIncome: 12000,
    context: "Major equipment investment decision balancing cash preservation, tax benefits, and growth enablement.",
    options: [
      {
        id: "cash_purchase",
        label: "Cash Purchase with Tax Benefits",
        description: "Buy equipment outright for $25K, maximize tax deductions, maintain ownership and flexibility.",
        impact: { netWorth: 5000, savings: -25000, emotion: 1, knowledge: 3, risk: 2, businessValue: 25000, cashFlow: 2250 },
        consequences: {
          immediate: "Major cash outflow but full ownership and maximum tax benefits",
          shortTerm: "Reduced cash reserves but immediate productivity gains",
          longTerm: "Asset ownership with depreciation benefits and no ongoing payments"
        }
      },
      {
        id: "equipment_financing",
        label: "Equipment Loan Financing",
        description: "Finance with $5K down and $550/month payments. Preserve cash while building business credit.",
        impact: { netWorth: 3000, savings: -5000, debt: 20000, emotion: 2, knowledge: 3, risk: 3, businessValue: 25000, cashFlow: 1700 },
        consequences: {
          immediate: "Minimal cash impact with managed monthly payments",
          shortTerm: "Building business credit history while preserving working capital",
          longTerm: "Asset ownership achieved with financing costs but maintained liquidity"
        }
      },
      {
        id: "lease_option",
        label: "Equipment Lease Strategy",
        description: "Lease equipment for $650/month with upgrade options. Maximum flexibility and tax deductions.",
        impact: { netWorth: 2000, savings: 0, emotion: 2, knowledge: 2, risk: 1, businessValue: 15000, cashFlow: 1600 },
        consequences: {
          immediate: "No upfront costs with immediate productivity gains",
          shortTerm: "Ongoing monthly expense but technology upgrade flexibility",
          longTerm: "Higher total cost but always current technology and no obsolescence risk"
        }
      }
    ],
    learningPoint: "Equipment financing decisions should balance cash flow preservation, tax benefits, and technology obsolescence risks."
  }
];