// Comprehensive Salaried Professional Financial Journey - 15+ Stages
export interface StageOption {
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
  };
  consequences: {
    immediate: string;
    shortTerm: string;
    longTerm: string;
  };
}

export interface GameStage {
  id: number;
  title: string;
  description: string;
  situation: string;
  age: number;
  salary: number;
  context: string;
  options: StageOption[];
  learningPoint: string;
}

export const salariedProfessionalStages: GameStage[] = [
  {
    id: 1,
    title: "First Salary Decision",
    description: "You just got your first $4,200 monthly salary. How will you use it?",
    situation: "💰 FIRST SALARY REALITY CHECK\n\n💼 YOUR SITUATION:\nAge 24 • First job • $4,200 take-home monthly\nRent: $1,000 • Food: $400 • Leftover: $2,800\n\n⚡ KEY DECISION:\nSave aggressively for financial independence\nOR\nEnjoy youth and spend on experiences\nOR\nFind balanced approach for sustainable growth",
    age: 24,
    salary: 50400,
    context: "Month 1 of your career. Fresh start with no savings or debt.",
    options: [
      {
        id: "balanced_approach",
        label: "Balanced Approach",
        description: "Pay expenses ($1,400), save for emergency ($1,000), invest in 401k ($800), enjoy life ($1,000)",
        impact: { netWorth: 1800, savings: 1000, emotion: 2, knowledge: 2, risk: 1 },
        consequences: {
          immediate: "Solid foundation with balanced lifestyle",
          shortTerm: "Building wealth while enjoying life",
          longTerm: "Steady path to financial independence"
        }
      },
      {
        id: "spend_freely",
        label: "Live It Up",
        description: "Cover basics ($1,400), splurge on shopping and dining ($2,500), save whatever's left ($300)",
        impact: { netWorth: 300, savings: 300, emotion: 3, knowledge: -1, risk: 3 },
        consequences: {
          immediate: "Great social life and instant gratification",
          shortTerm: "Little savings growth, potential money stress",
          longTerm: "May struggle to build long-term wealth"
        }
      },
      {
        id: "aggressive_saver",
        label: "Save Everything",
        description: "Cover only essentials ($1,400), save/invest the rest ($2,800), minimal fun budget",
        impact: { netWorth: 2800, savings: 2800, emotion: 0, knowledge: 1, risk: 0 },
        consequences: {
          immediate: "Maximum savings but limited social activities",
          shortTerm: "Rapid wealth building",
          longTerm: "Early financial independence but missed experiences"
        }
      }
    ],
    learningPoint: "Your first salary choices create habits that shape your financial future."
  },

  {
    id: 2,
    title: "Medical Emergency",
    description: "Your family faces a $5,000 medical emergency. How do you handle it?",
    situation: "🚨 MEDICAL EMERGENCY CRISIS\n\n💰 YOUR SITUATION:\n6 months working • Built up savings from careful budgeting\nFamily member needs urgent care: $5,000 cost\n\n💡 YOUR OPTIONS:\n• Use emergency fund (if you built one)\n• Credit card debt at 21% APR\n• Ask family/friends for help\n\n⚡ LESSON:\nThis moment tests your financial preparation",
    age: 24,
    salary: 52000,
    context: "6 months into your career. Your previous savings choices matter now.",
    options: [
      {
        id: "use_emergency_fund",
        label: "Use Emergency Fund",
        description: "Pay from your emergency savings. You've prepared for this moment.",
        impact: { netWorth: -5000, savings: -5000, emotion: 1, knowledge: 3, risk: 1 },
        consequences: {
          immediate: "Crisis handled smoothly without debt",
          shortTerm: "Need to rebuild emergency fund",
          longTerm: "Confidence in financial planning grows"
        }
      },
      {
        id: "credit_card_debt",
        label: "Use Credit Card",
        description: "Put it on credit card (21% APR). Deal with payments later.",
        impact: { netWorth: 0, savings: 0, debt: 5000, emotion: -1, knowledge: 0, risk: 4 },
        consequences: {
          immediate: "Crisis handled but debt created",
          shortTerm: "High interest payments each month",
          longTerm: "Expensive lesson about emergency funds"
        }
      },
      {
        id: "ask_family",
        label: "Ask Family for Help",
        description: "Borrow from relatives. No interest but family dynamics change.",
        impact: { netWorth: 0, savings: 0, emotion: -1, knowledge: 1, risk: 2 },
        consequences: {
          immediate: "Crisis handled without financial cost",
          shortTerm: "Family obligation to repay",
          longTerm: "Changed family relationships"
        }
      }
    ],
    learningPoint: "Emergency funds provide peace of mind and financial flexibility when life happens."
  },

  {
    id: 3,
    title: "Investment Awakening - Market Discovery",
    description: "Age 25: A colleague shows his mutual fund portfolio growing 18% while your savings account gives 4%. Time to learn about investing.",
    situation: "📈 Your colleague excitedly shows his investment portfolio that has grown 18% in the last year. Your savings account has grown 4%. You're curious but scared about market volatility. This is your investment awakening moment.",
    age: 25,
    salary: 55000,
    context: "12 months of earning. Your financial habits are forming. Time to understand wealth building.",
    options: [
      {
        id: "systematic_learning",
        label: "Educate First, Invest Second",
        description: "Spend 2 months learning about index funds, ETFs, and risk. Then start with $1.25K monthly investments.",
        impact: { netWorth: 5000, savings: 0, emotion: 1, knowledge: 4, risk: 2 },
        consequences: {
          immediate: "Delayed gratification but solid knowledge foundation",
          shortTerm: "Confident investment decisions based on understanding",
          longTerm: "Education leads to better long-term investment performance"
        }
      },
      {
        id: "fomo_investing",
        label: "FOMO Investment Plunge",
        description: "Immediately invest $5K in the same funds your colleague uses. Don't waste time learning.",
        impact: { netWorth: 0, savings: -20000, emotion: 2, knowledge: -1, risk: 4 },
        consequences: {
          immediate: "Quick market exposure but without understanding",
          shortTerm: "Likely panic selling during first market downturn",
          longTerm: "Poor investment decisions due to lack of knowledge"
        }
      },
      {
        id: "analysis_paralysis",
        label: "Over-Analysis Mode",
        description: "Spend 6 months researching every detail. Want perfect knowledge before investing anything.",
        impact: { netWorth: 0, savings: 30000, emotion: 0, knowledge: 2, risk: 0 },
        consequences: {
          immediate: "No market risk but opportunity cost accumulating",
          shortTerm: "Missing months of potential compound growth",
          longTerm: "Perfect timing never comes - delayed wealth building"
        }
      }
    ],
    learningPoint: "Time in the market beats timing the market. Start investing while learning, but don't invest without any knowledge."
  },

  {
    id: 4,
    title: "Career Acceleration - Skill Investment",
    description: "Age 26: Your company offers a $12K certification course that could double your salary in 2 years. But it's expensive and uncertain.",
    situation: "🎓 Your manager suggests a specialized certification that costs $12K but typically leads to salary jumps from $5K to $10K per month within 2 years. Your current savings vs future earning potential dilemma.",
    age: 26,
    salary: 60000,
    context: "18 months into career. Investment vs expense decisions becoming more complex.",
    options: [
      {
        id: "skill_investment",
        label: "Invest in Career Growth",
        description: "Pay $12K for certification. Short-term financial stress for long-term gain.",
        impact: { netWorth: -50000, savings: -50000, emotion: 1, knowledge: 5, risk: 3 },
        consequences: {
          immediate: "Significant financial outlay strains current budget",
          shortTerm: "Intense learning period with delayed gratification",
          longTerm: "Potential 100% salary increase within 24 months"
        }
      },
      {
        id: "conservative_decline",
        label: "Stay Safe - Decline Course",
        description: "$12K is too risky. Continue current role and save money instead.",
        impact: { netWorth: 50000, savings: 50000, emotion: -1, knowledge: 0, risk: 1 },
        consequences: {
          immediate: "Financial security maintained but growth opportunity missed",
          shortTerm: "Steady progression but limited salary growth",
          longTerm: "Career plateau - colleagues advance while you remain static"
        }
      },
      {
        id: "loan_for_course",
        label: "Education Loan Strategy",
        description: "Take education loan for course. Bet on future earning potential.",
        impact: { netWorth: 0, savings: 0, debt: 50000, emotion: 0, knowledge: 5, risk: 4 },
        consequences: {
          immediate: "Access to growth opportunity without depleting savings",
          shortTerm: "Loan EMI pressure but career advancement",
          longTerm: "High-risk, high-reward approach to career investment"
        }
      }
    ],
    learningPoint: "Investing in yourself often provides the highest returns, but timing and risk tolerance matter."
  },

  {
    id: 5,
    title: "Relationship & Money - Partnership Decisions",
    description: "Age 27: You're in a serious relationship. Wedding discussions involve $200K expenses vs simple court marriage. Financial values alignment test.",
    situation: "💑 Your relationship is getting serious. Wedding discussions reveal different financial philosophies. Grand celebration ($200K) vs simple ceremony ($12K) vs court marriage + honeymoon ($50K). This decision affects your financial trajectory for decades.",
    age: 27,
    salary: 75000,
    context: "DYNAMIC_CONTEXT_PLACEHOLDER", // Will be replaced based on previous decisions
    options: [
      {
        id: "grand_wedding",
        label: "Dream Wedding Celebration",
        description: "$200K wedding with all traditions. Take loan if needed. Once in lifetime event.",
        impact: { netWorth: -300000, savings: -200000, debt: 500000, emotion: 3, knowledge: 0, risk: 5 },
        consequences: {
          immediate: "Grand celebration creates beautiful memories and social validation",
          shortTerm: "$11K annual EMI stress impacts all financial goals",
          longTerm: "5-year debt burden delays wealth building significantly"
        }
      },
      {
        id: "balanced_wedding",
        label: "Thoughtful Celebration",
        description: "$50K meaningful wedding + $25K honeymoon. Balance celebration with financial sense.",
        impact: { netWorth: -100000, savings: -300000, emotion: 2, knowledge: 1, risk: 2 },
        consequences: {
          immediate: "Beautiful celebration without financial devastation",
          shortTerm: "Temporary savings depletion but manageable recovery",
          longTerm: "Balanced approach maintains wealth building momentum"
        }
      },
      {
        id: "minimalist_wedding",
        label: "Court Marriage + Investment",
        description: "$12K simple ceremony. Invest the $188K difference in index funds for your future.",
        impact: { netWorth: 200000, savings: -50000, emotion: 0, knowledge: 2, risk: 1 },
        consequences: {
          immediate: "Maximum financial optimization but potential family disappointment",
          shortTerm: "Strong investment foundation for married life",
          longTerm: "$188K invested could become $1.25M+ by retirement"
        }
      }
    ],
    learningPoint: "Life events are wealth building tests. Balancing emotions and finances requires careful consideration of long-term impacts."
  },

  {
    id: 6,
    title: "Home Sweet Debt - Real Estate Decision",
    description: "Age 28: Property prices are rising 12% annually. Your rent is $1.5K/month. Buy now with 90% loan or continue renting and investing the difference?",
    situation: "🏠 Property prices in your area have risen 40% in 3 years. Your landlord wants to increase rent to $1.8K. Should you buy a $450K apartment with $45K down payment and $405K loan, or rent and invest?",
    age: 28,
    salary: 90000,
    context: "Married life, stable career. The classic rent vs buy dilemma that affects wealth building.",
    options: [
      {
        id: "buy_property",
        label: "Buy Your Dream Home",
        description: "$450K apartment with $405K loan. Monthly payment $3.8K for 30 years. Own your home, build equity.",
        impact: { netWorth: -200000, savings: -450000, debt: 4000000, emotion: 2, knowledge: 1, risk: 4 },
        consequences: {
          immediate: "Home ownership pride but massive debt and EMI burden",
          shortTerm: "$3.8K monthly payment limits all other financial goals for 30 years",
          longTerm: "Property appreciation vs opportunity cost of $3.8K monthly investments"
        }
      },
      {
        id: "rent_and_invest",
        label: "Rent + Invest Strategy",
        description: "Continue renting at $1.8K. Invest the $2K difference (vs mortgage payment) in index funds.",
        impact: { netWorth: 100000, savings: 0, emotion: 0, knowledge: 3, risk: 2 },
        consequences: {
          immediate: "Flexibility and lower monthly outgo",
          shortTerm: "$2K monthly index fund investing building significant corpus",
          longTerm: "$2K monthly for 30 years = $700K vs property value"
        }
      },
      {
        id: "delayed_purchase",
        label: "Save Bigger Down Payment",
        description: "Rent for 2 more years, save $15K down payment, then buy with smaller loan.",
        impact: { netWorth: 50000, savings: 100000, emotion: 1, knowledge: 2, risk: 2 },
        consequences: {
          immediate: "Delayed gratification but building larger down payment",
          shortTerm: "Risk of property price appreciation outpacing savings",
          longTerm: "Lower EMI burden but potential price appreciation loss"
        }
      }
    ],
    learningPoint: "Real estate decisions impact wealth building for decades. Consider total cost of ownership vs opportunity cost of investments."
  },

  {
    id: 7,
    title: "Market Crash Reality - Emotional Investing Test",
    description: "Age 29: Global markets crash 30%. Your $30K portfolio is now $21K. Friends are panic selling. What do you do?",
    situation: "📉 Black Monday! Markets have crashed 30% in 2 weeks. Your carefully built $30K portfolio is now worth $21K. News channels are predicting further crashes. Friends are selling everything. Your emotional investing test begins.",
    age: 29,
    salary: 110000,
    context: "3 years of systematic investing tested by market volatility. Your reaction determines long-term wealth.",
    options: [
      {
        id: "stay_invested",
        label: "Hold Strong + Increase investment",
        description: "Continue current investments and actually increase by $500/month. Buy the dip strategy.",
        impact: { netWorth: 50000, savings: -60000, emotion: 1, knowledge: 4, risk: 3 },
        consequences: {
          immediate: "Maintain conviction despite paper losses and social pressure",
          shortTerm: "Increased investment during market lows",
          longTerm: "Historically, this approach generates highest returns over 10+ years"
        }
      },
      {
        id: "panic_selling",
        label: "Cut Losses - Sell Everything",
        description: "Sell all investments at 30% loss. At least save $2.1K from further decline.",
        impact: { netWorth: -90000, savings: 210000, emotion: -2, knowledge: -2, risk: 0 },
        consequences: {
          immediate: "Stop further paper losses but realize actual losses",
          shortTerm: "Miss the recovery phase completely",
          longTerm: "Classic buy high, sell low mistake - wealth building severely damaged"
        }
      },
      {
        id: "partial_retreat",
        label: "Reduce investment by 50%",
        description: "Stop half of investments, keep existing investments. Compromise approach.",
        impact: { netWorth: 0, savings: 0, emotion: 0, knowledge: 0, risk: 2 },
        consequences: {
          immediate: "Reduced exposure to further volatility",
          shortTerm: "Miss some recovery gains due to reduced investment",
          longTerm: "Moderate approach with moderate results"
        }
      }
    ],
    learningPoint: "Market crashes separate successful investors from unsuccessful ones. Emotional discipline during volatility determines long-term wealth."
  },

  {
    id: 8,
    title: "Insurance Reality - Protection vs Investment",
    description: "Age 30: Your first child is born. An insurance agent pushes $10K/month ULIP policy. Term + mutual fund vs ULIP decision.",
    situation: "👶 Your child is born! Suddenly protection becomes critical. Insurance agent offers $50K ULIP policy with $10K/month premium 'covering insurance + investment'. Term plan + separate investing vs ULIP choice.",
    age: 30,
    salary: 125000,
    context: "New parent responsibilities. Insurance becomes crucial but product choice affects wealth building.",
    options: [
      {
        id: "term_plus_sip",
        label: "Term Insurance + Mutual Fund investment",
        description: "$1K term policy for $15K/year + $8.5K/month in index funds. Separate protection and investment.",
        impact: { netWorth: 50000, savings: -102000, emotion: 1, knowledge: 3, risk: 1 },
        consequences: {
          immediate: "High coverage with lower cost and better investment returns",
          shortTerm: "$8.5K monthly in pure equity funds vs mixed ULIP returns",
          longTerm: "Typically 3-4% higher annual returns = $15-20K more wealth at retirement"
        }
      },
      {
        id: "ulip_policy",
        label: "Accept ULIP Recommendation",
        description: "$50K ULIP with $10K monthly premium. Insurance + investment in one product.",
        impact: { netWorth: 0, savings: -120000, emotion: 2, knowledge: -1, risk: 2 },
        consequences: {
          immediate: "Convenient single product but higher costs and lower returns",
          shortTerm: "Fund management charges and insurance costs reduce returns",
          longTerm: "Typically 3-4% lower returns = $15-20K less wealth at retirement"
        }
      },
      {
        id: "high_coverage_term",
        label: "Maximum Term Coverage",
        description: "$2 cr term policy for $45K/year + $6.25K/month investment. Maximum protection approach.",
        impact: { netWorth: 25000, savings: -120000, emotion: 2, knowledge: 2, risk: 1 },
        consequences: {
          immediate: "Ultra-high family protection but higher premium outgo",
          shortTerm: "Peace of mind but lower investment amount",
          longTerm: "Maximum family security but moderate wealth building"
        }
      }
    ],
    learningPoint: "Insurance is for protection, investments are for wealth building. Mixing them usually reduces efficiency of both."
  },

  {
    id: 9,
    title: "Side Hustle Temptation - Entrepreneurial Risk",
    description: "Age 31: A business opportunity needs $5K investment with potential $50K returns in 2 years. Risk your savings for entrepreneurial dreams?",
    situation: "💼 Your friend's tech startup needs co-founder investment of $5L. They project $50K returns in 2 years based on similar company valuations. Risk your hard-earned savings for potential 10x returns?",
    age: 31,
    salary: 140000,
    context: "Accumulated $8K savings. Entrepreneurial opportunity vs steady wealth building dilemma.",
    options: [
      {
        id: "full_investment",
        label: "Go All-In on Business",
        description: "Invest $5K in startup. Take 2-year sabbatical to work full-time on business.",
        impact: { netWorth: -300000, savings: -500000, emotion: 3, knowledge: 3, risk: 5 },
        consequences: {
          immediate: "Maximum commitment to potential high returns",
          shortTerm: "No salary + investment risk = high financial stress",
          longTerm: "Either become wealthy entrepreneur or face significant financial setback"
        }
      },
      {
        id: "partial_investment",
        label: "$2K Investment + Keep Job",
        description: "Invest $2K as silent partner. Continue job for security. Moderate risk approach.",
        impact: { netWorth: -100000, savings: -200000, emotion: 1, knowledge: 2, risk: 3 },
        consequences: {
          immediate: "Entrepreneurial exposure with financial safety net",
          shortTerm: "Balanced approach with moderate risk",
          longTerm: "Lower potential returns but protected downside"
        }
      },
      {
        id: "decline_opportunity",
        label: "Stick to Traditional Wealth Building",
        description: "Decline investment. Continue systematic investment and career growth. Play it safe.",
        impact: { netWorth: 100000, savings: 0, emotion: -1, knowledge: 0, risk: 1 },
        consequences: {
          immediate: "Zero entrepreneurial risk but potential FOMO",
          shortTerm: "Steady wealth building continues uninterrupted",
          longTerm: "Conservative approach with predictable but moderate returns"
        }
      }
    ],
    learningPoint: "Entrepreneurial opportunities can accelerate or devastate wealth building. Risk only what you can afford to lose."
  },

  {
    id: 10,
    title: "Tax Optimization - Wealth Preservation",
    description: "Age 32: You're now in 30% tax bracket. Smart tax planning can save $5K annually. Learn the tax optimization game.",
    situation: "💰 Your $160K annual package puts you in 30% tax bracket. Smart use of 401k, IRA, and other deductions can save $5K+ annually in taxes. Time to master tax optimization.",
    age: 32,
    salary: 160000,
    context: "Higher income bracket requires sophisticated tax planning for wealth preservation.",
    options: [
      {
        id: "comprehensive_planning",
        label: "Master Tax Optimization",
        description: "Use all deductions: 401k max $23K, IRA $7K, insurance $5K, mortgage interest deduction, etc.",
        impact: { netWorth: 150000, savings: -300000, emotion: 1, knowledge: 4, risk: 1 },
        consequences: {
          immediate: "$5K annual tax savings reinvested for wealth building",
          shortTerm: "Complex portfolio management but higher net returns",
          longTerm: "$5K annual savings compounded = $350K additional wealth"
        }
      },
      {
        id: "simple_tax_approach",
        label: "Basic 80C Compliance",
        description: "Just do $15K in 401k. Keep it simple, pay higher taxes.",
        impact: { netWorth: 50000, savings: -150000, emotion: 0, knowledge: 1, risk: 1 },
        consequences: {
          immediate: "Simple approach but $3K annual tax loss",
          shortTerm: "Less complexity but suboptimal wealth building",
          longTerm: "$3K annual tax loss = $200K less wealth over career"
        }
      },
      {
        id: "aggressive_tax_planning",
        label: "Aggressive Tax Structures",
        description: "Use all possible deductions, HUF formation, business income routing, etc.",
        impact: { netWorth: 200000, savings: -100000, emotion: 2, knowledge: 3, risk: 4 },
        consequences: {
          immediate: "Maximum tax efficiency but compliance complexity",
          shortTerm: "Higher scrutiny risk but significant tax savings",
          longTerm: "Maximum wealth preservation but potential legal complications"
        }
      }
    ],
    learningPoint: "Tax optimization is wealth preservation. Every rupee saved in tax is a rupee that compounds for retirement."
  },

  {
    id: 11,
    title: "Mid-Career Crisis - Salary vs Business",
    description: "Age 35: Your startup friend just sold his company for $25 million. You have $450K savings but feeling left behind. Career reset time?",
    situation: "🚀 Your friend who started the company 4 years ago just sold it for $25 million. You have $450K savings and $200K annual package. Feeling successful but also wondering about the path not taken.",
    age: 35,
    salary: 200000,
    context: "Mid-career evaluation. Steady wealth building vs entrepreneurial regrets.",
    options: [
      {
        id: "start_own_business",
        label: "Start Your Own Company",
        description: "Use $250K to start business. Quit job, go full entrepreneur. Chase the big dream.",
        impact: { netWorth: -1000000, savings: -2500000, emotion: 3, knowledge: 4, risk: 5 },
        consequences: {
          immediate: "Maximum entrepreneurial commitment but high financial risk",
          shortTerm: "No safety net, high stress, potential for high returns",
          longTerm: "Either achieve significant wealth or face major financial setback"
        }
      },
      {
        id: "angel_investing",
        label: "Become Angel Investor",
        description: "Keep job, invest $100K in 4-5 startups. Diversify entrepreneurial risk.",
        impact: { netWorth: -500000, savings: -1000000, emotion: 1, knowledge: 3, risk: 3 },
        consequences: {
          immediate: "Exposure to startup ecosystem with income security",
          shortTerm: "Learning entrepreneurship while maintaining stability",
          longTerm: "Potential for significant returns with limited downside"
        }
      },
      {
        id: "continue_steady_path",
        label: "Accelerate Current Strategy",
        description: "Increase investment to $2.5K/month. Focus on senior management roles. Steady wealth building.",
        impact: { netWorth: 200000, savings: -300000, emotion: 0, knowledge: 2, risk: 1 },
        consequences: {
          immediate: "Disciplined approach without FOMO-driven decisions",
          shortTerm: "Accelerated systematic wealth building",
          longTerm: "Highly probable path to $500K-800K corpus by retirement"
        }
      }
    ],
    learningPoint: "Comparison is the thief of joy. Focus on your own financial journey rather than others' outlier successes."
  },

  {
    id: 12,
    title: "Children's Education - Future Investment",
    description: "Age 37: Your child will need $500K for quality education in 12 years. Start education fund or rely on general investments?",
    situation: "🎓 Your 5-year-old child will need $500K for quality engineering/medical education in 12 years (inflation-adjusted). Dedicated education planning vs general wealth building approach?",
    age: 37,
    salary: 250000,
    context: "Parental responsibilities require goal-based financial planning.",
    options: [
      {
        id: "dedicated_education_fund",
        label: "Separate Education investment",
        description: "$2K monthly dedicated education investment in balanced funds for 12 years.",
        impact: { netWorth: 100000, savings: -240000, emotion: 2, knowledge: 2, risk: 2 },
        consequences: {
          immediate: "Goal-specific planning with peace of mind",
          shortTerm: "Reduced general investment but education security",
          longTerm: "$50L+ education corpus but lower overall wealth"
        }
      },
      {
        id: "general_wealth_approach",
        label: "General Wealth Building",
        description: "Continue $3K monthly investment. Use general corpus for education when needed.",
        impact: { netWorth: 200000, savings: -360000, emotion: 1, knowledge: 2, risk: 2 },
        consequences: {
          immediate: "Maximum wealth building flexibility",
          shortTerm: "Higher overall corpus building",
          longTerm: "Higher total wealth but education funding uncertainty"
        }
      },
      {
        id: "education_insurance",
        label: "Child Education Insurance Plan",
        description: "$2.5K annually in child education insurance plan with guaranteed returns.",
        impact: { netWorth: 50000, savings: -300000, emotion: 3, knowledge: 0, risk: 1 },
        consequences: {
          immediate: "Guaranteed education corpus but lower returns",
          shortTerm: "Insurance security but opportunity cost",
          longTerm: "Education assured but $150K-200K less overall wealth"
        }
      }
    ],
    learningPoint: "Goal-based planning vs general wealth building trade-offs. Balance specific needs with overall wealth optimization."
  },

  {
    id: 13,
    title: "Parents' Retirement - Sandwich Generation",
    description: "Age 40: Your parents need $3K monthly support. Your own retirement vs parents' care dilemma. The sandwich generation challenge.",
    situation: "👴👵 Your parents need financial support of $3K monthly for medical and living expenses. You're 40 with $1.2M corpus. Balance your FIRE goals with parents' care responsibilities.",
    age: 40,
    salary: 300000,
    context: "Peak earning years but family obligations increasing. Retirement planning vs immediate family needs.",
    options: [
      {
        id: "full_parent_support",
        label: "Comprehensive Parent Care",
        description: "$3K monthly + $5K annual medical emergency fund. Full family responsibility.",
        impact: { netWorth: -200000, savings: -420000, emotion: 2, knowledge: 1, risk: 2 },
        consequences: {
          immediate: "Complete family care but delayed personal financial goals",
        shortTerm: "$42K annual impact on wealth building",
          longTerm: "Retirement delayed by 3-5 years but family obligations fulfilled"
        }
      },
      {
        id: "balanced_support",
        label: "Shared Family Responsibility",
        description: "$1.5K monthly support + coordinate with siblings for shared responsibilities.",
        impact: { netWorth: 0, savings: -180000, emotion: 1, knowledge: 1, risk: 2 },
        consequences: {
          immediate: "Moderate support with family coordination",
          shortTerm: "Balanced approach to family and personal goals",
          longTerm: "Retirement planning stays on track with family support"
        }
      },
      {
        id: "minimal_support",
        label: "Emergency-Only Support",
        description: "$500 monthly + emergency medical support only. Focus on own retirement.",
        impact: { netWorth: 100000, savings: -60000, emotion: -1, knowledge: 0, risk: 1 },
        consequences: {
          immediate: "Minimal family impact on personal wealth building",
          shortTerm: "Potential family relationship strain",
          longTerm: "Faster path to FIRE but potential guilt and family issues"
        }
      }
    ],
    learningPoint: "The sandwich generation faces competing financial obligations. Balance family responsibilities with personal financial security."
  },

  {
    id: 14,
    title: "Pre-FIRE Decision - Coast vs Accelerate",
    description: "Age 45: You have $3.2 million. You can coast to FIRE by 55 or push hard for FIRE by 50. Final sprint decision.",
    situation: "🏁 You're 45 with $3.2M corpus. Your FIRE number is $5M. You can coast with current investments and reach FIRE by 55, or make sacrifices to achieve it by 50. Final sprint or comfortable cruise?",
    age: 45,
    salary: 400000,
    context: "Close to FIRE goal. Risk tolerance vs time preference for financial independence.",
    options: [
      {
        id: "fire_sprint",
        label: "5-Year FIRE Sprint",
        description: "Save 70% of income, aggressive investments, minimal lifestyle for 5 years to achieve FIRE by 50.",
        impact: { netWorth: 500000, savings: -2800000, emotion: 1, knowledge: 3, risk: 3 },
        consequences: {
          immediate: "Extreme sacrifice but accelerated FIRE timeline",
          shortTerm: "High savings rate with lifestyle constraints",
          longTerm: "Financial independence 5 years earlier = more freedom years"
        }
      },
      {
        id: "comfortable_coast",
        label: "Comfortable Coast to FIRE",
        description: "Maintain current 40% savings rate, enjoy life balance, achieve FIRE by 55.",
        impact: { netWorth: 200000, savings: -1600000, emotion: 2, knowledge: 1, risk: 2 },
        consequences: {
          immediate: "Balanced lifestyle with steady progress",
          shortTerm: "Work-life balance maintained",
          longTerm: "FIRE achieved by 55 with better life experiences"
        }
      },
      {
        id: "partial_fire",
        label: "Barista FIRE by 48",
        description: "Achieve $4 cr by 48, then switch to part-time work for remaining income needs.",
        impact: { netWorth: 300000, savings: -2000000, emotion: 2, knowledge: 2, risk: 2 },
        consequences: {
          immediate: "Moderate acceleration with flexibility planning",
          shortTerm: "Transition planning for part-time work",
          longTerm: "Earlier career flexibility with gradual retirement"
        }
      }
    ],
    learningPoint: "The final approach to FIRE involves trade-offs between time, lifestyle, and financial security."
  },

  {
    id: 15,
    title: "FIRE Reality Check - Where Do You Stand?",
    description: "Age 50: Based on your 26-year journey of financial decisions, let's see where you actually stand with FIRE. Your choices have consequences.",
    situation: "DYNAMIC_FIRE_ASSESSMENT_PLACEHOLDER", // Will be dynamically generated based on all decisions
    age: 50,
    salary: 0,
    context: "DYNAMIC_FIRE_CONTEXT_PLACEHOLDER", // Will reflect your entire financial journey
    options: [
      {
        id: "full_retirement",
        label: "Complete Retirement Life",
        description: "Travel, hobbies, family time. Enjoy the fruits of your financial discipline completely.",
        impact: { netWorth: 0, savings: 0, emotion: 3, knowledge: 0, risk: 0 },
        consequences: {
          immediate: "Complete freedom and life enjoyment",
          shortTerm: "Travel and personal fulfillment",
          longTerm: "Life of leisure with financial security"
        }
      },
      {
        id: "meaningful_work",
        label: "Purpose-Driven Work",
        description: "Consulting, teaching, or social impact work. Use skills for meaningful contribution.",
        impact: { netWorth: 200000, savings: 0, emotion: 2, knowledge: 3, risk: 1 },
        consequences: {
          immediate: "Purpose and additional income",
          shortTerm: "Professional fulfillment with financial freedom",
          longTerm: "Legacy building through meaningful contribution"
        }
      },
      {
        id: "wealth_multiplication",
        label: "Angel Investor & Wealth Multiplier",
        description: "Use wealth and experience to invest in startups and multiply wealth further.",
        impact: { netWorth: 1000000, savings: -2000000, emotion: 2, knowledge: 4, risk: 4 },
        consequences: {
          immediate: "Active wealth management and startup ecosystem participation",
          shortTerm: "Higher risk but potential for significant wealth multiplication",
          longTerm: "Potential to build generational wealth"
        }
      }
    ],
    learningPoint: "FIRE is not the end goal - it's the beginning of true financial freedom and life purpose."
  }
];