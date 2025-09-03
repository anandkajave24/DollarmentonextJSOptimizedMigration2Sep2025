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
    title: "Self Discovery - First Salary Reality",
    description: "You've just received your first ₹50,000 salary! You feel incredibly rich. This moment will define your entire financial personality.",
    situation: "🎉 Your bank account shows ₹50,000 for the first time ever. Friends are planning celebrations, family has expectations, and everyone wants a piece of your 'success'. Your decision in the next 24 hours will set patterns that last decades.",
    age: 24,
    salary: 50000,
    context: "Month 1 of your career. Zero savings, zero investments, zero debt. Clean slate.",
    options: [
      {
        id: "responsible_start",
        label: "Strategic Foundation Building",
        description: "Emergency fund (₹8K), family (₹15K), rent (₹12K), invest remainder (₹10K), modest celebration (₹2K)",
        impact: { netWorth: 8000, savings: 18000, emotion: 2, knowledge: 3, risk: 1 },
        consequences: {
          immediate: "Strong financial foundation with emergency buffer established",
          shortTerm: "Systematic wealth building begins, family trust maintained",
          longTerm: "High probability of achieving financial independence by 45"
        }
      },
      {
        id: "lifestyle_inflation",
        label: "Live Like You're Rich",
        description: "Premium celebration (₹12K), branded clothes (₹8K), latest phone EMI (₹15K), family contribution reduced to ₹10K",
        impact: { netWorth: -5000, savings: 0, debt: 15000, emotion: 3, knowledge: -1, risk: 4 },
        consequences: {
          immediate: "Social validation and lifestyle upgrade, but zero financial foundation",
          shortTerm: "EMI stress, social pressure to maintain expensive lifestyle",
          longTerm: "Likely decades of financial struggle despite income growth"
        }
      },
      {
        id: "extreme_saver",
        label: "Maximum Savings Mode",
        description: "Save everything possible (₹30K), decline social activities, minimal spending on essentials only",
        impact: { netWorth: 30000, savings: 30000, emotion: -1, knowledge: 1, risk: 0 },
        consequences: {
          immediate: "Maximum financial security but potential social isolation",
          shortTerm: "High savings rate but missed networking opportunities",
          longTerm: "Financial independence but possible regrets about experiences"
        }
      }
    ],
    learningPoint: "Your first salary decision reveals your core financial values and sets psychological patterns that persist for years."
  },

  {
    id: 2,
    title: "Emergency Shock - Reality Check",
    description: "Month 6: Your father needs urgent medical treatment costing ₹1.2 lakhs. Your emergency fund is being tested.",
    situation: "🏥 Your father has been hospitalized with a serious condition. The hospital demands ₹1.2 lakhs for treatment. This is your first real financial emergency. How you handle this will determine your financial resilience.",
    age: 24,
    salary: 52000,
    context: "6 months into career. Your previous choices have determined your current financial position.",
    options: [
      {
        id: "emergency_fund_sufficient",
        label: "Use Emergency Fund (if available)",
        description: "Pay from emergency fund + liquidate some investments. Financial stress but manageable.",
        impact: { netWorth: -80000, savings: -120000, emotion: 1, knowledge: 2, risk: 2 },
        consequences: {
          immediate: "Family crisis handled without debt, but financial position reset",
          shortTerm: "Need to rebuild emergency fund, but no debt burden",
          longTerm: "Proven value of emergency planning strengthens discipline"
        }
      },
      {
        id: "credit_card_debt",
        label: "Credit Card Emergency",
        description: "Put everything on credit cards at 3% monthly interest. Quick solution but expensive.",
        impact: { netWorth: -20000, savings: 0, debt: 120000, emotion: -2, knowledge: 1, risk: 5 },
        consequences: {
          immediate: "Crisis handled but massive high-interest debt created",
          shortTerm: "₹36K annual interest payments stress monthly budget",
          longTerm: "Debt spiral may take years to recover from"
        }
      },
      {
        id: "family_loan",
        label: "Borrow from Extended Family",
        description: "Ask relatives for help. No interest but family obligations and relationship stress.",
        impact: { netWorth: 0, savings: 0, debt: 0, emotion: -1, knowledge: 0, risk: 2 },
        consequences: {
          immediate: "Crisis handled without financial cost but emotional cost",
          shortTerm: "Family obligations and loss of independence",
          longTerm: "Relationship dynamics permanently changed"
        }
      }
    ],
    learningPoint: "Emergency funds aren't optional - they're the difference between financial resilience and debt spirals."
  },

  {
    id: 3,
    title: "Investment Awakening - Market Discovery",
    description: "Age 25: A colleague shows his mutual fund portfolio growing 18% while your savings account gives 4%. Time to learn about investing.",
    situation: "📈 Your colleague excitedly shows his SIP portfolio that has grown 18% in the last year. Your savings account has grown 4%. You're curious but scared about market volatility. This is your investment awakening moment.",
    age: 25,
    salary: 55000,
    context: "12 months of earning. Your financial habits are forming. Time to understand wealth building.",
    options: [
      {
        id: "systematic_learning",
        label: "Educate First, Invest Second",
        description: "Spend 2 months learning about mutual funds, SIPs, and risk. Then start with ₹5K monthly SIP.",
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
        description: "Immediately invest ₹20K in the same funds your colleague uses. Don't waste time learning.",
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
    description: "Age 26: Your company offers a ₹50K certification course that could double your salary in 2 years. But it's expensive and uncertain.",
    situation: "🎓 Your manager suggests a specialized certification that costs ₹50K but typically leads to salary jumps from ₹60K to ₹1.2L within 2 years. Your current savings vs future earning potential dilemma.",
    age: 26,
    salary: 60000,
    context: "18 months into career. Investment vs expense decisions becoming more complex.",
    options: [
      {
        id: "skill_investment",
        label: "Invest in Career Growth",
        description: "Pay ₹50K for certification. Short-term financial stress for long-term gain.",
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
        description: "₹50K is too risky. Continue current role and save money instead.",
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
    description: "Age 27: You're in a serious relationship. Wedding discussions involve ₹8 lakhs expenses vs simple court marriage. Financial values alignment test.",
    situation: "💑 Your relationship is getting serious. Wedding discussions reveal different financial philosophies. Grand celebration (₹8L) vs simple ceremony (₹50K) vs court marriage + honeymoon (₹2L). This decision affects your financial trajectory for decades.",
    age: 27,
    salary: 75000,
    context: "DYNAMIC_CONTEXT_PLACEHOLDER", // Will be replaced based on previous decisions
    options: [
      {
        id: "grand_wedding",
        label: "Dream Wedding Celebration",
        description: "₹8 lakh wedding with all traditions. Take loan if needed. Once in lifetime event.",
        impact: { netWorth: -300000, savings: -200000, debt: 500000, emotion: 3, knowledge: 0, risk: 5 },
        consequences: {
          immediate: "Grand celebration creates beautiful memories and social validation",
          shortTerm: "₹45K annual EMI stress impacts all financial goals",
          longTerm: "5-year debt burden delays wealth building significantly"
        }
      },
      {
        id: "balanced_wedding",
        label: "Thoughtful Celebration",
        description: "₹2 lakh meaningful wedding + ₹1 lakh honeymoon. Balance celebration with financial sense.",
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
        description: "₹50K simple ceremony. Invest the ₹7.5L difference in mutual funds for your future.",
        impact: { netWorth: 200000, savings: -50000, emotion: 0, knowledge: 2, risk: 1 },
        consequences: {
          immediate: "Maximum financial optimization but potential family disappointment",
          shortTerm: "Strong investment foundation for married life",
          longTerm: "₹7.5L invested could become ₹50L+ by retirement"
        }
      }
    ],
    learningPoint: "Life events are wealth building tests. Balancing emotions and finances requires careful consideration of long-term impacts."
  },

  {
    id: 6,
    title: "Home Sweet Debt - Real Estate Decision",
    description: "Age 28: Property prices are rising 12% annually. Your rent is ₹15K/month. Buy now with 90% loan or continue renting and investing the difference?",
    situation: "🏠 Property prices in your area have risen 40% in 3 years. Your landlord wants to increase rent to ₹18K. Should you buy a ₹45 lakh apartment with ₹4.5L down payment and ₹40L loan, or rent and invest?",
    age: 28,
    salary: 90000,
    context: "Married life, stable career. The classic rent vs buy dilemma that affects wealth building.",
    options: [
      {
        id: "buy_property",
        label: "Buy Your Dream Home",
        description: "₹45L apartment with ₹40L loan. EMI ₹38K for 20 years. Own your home, build equity.",
        impact: { netWorth: -200000, savings: -450000, debt: 4000000, emotion: 2, knowledge: 1, risk: 4 },
        consequences: {
          immediate: "Home ownership pride but massive debt and EMI burden",
          shortTerm: "₹38K EMI limits all other financial goals for 20 years",
          longTerm: "Property appreciation vs opportunity cost of ₹38K monthly investments"
        }
      },
      {
        id: "rent_and_invest",
        label: "Rent + Invest Strategy",
        description: "Continue renting at ₹18K. Invest the ₹20K difference (vs EMI) in equity mutual funds.",
        impact: { netWorth: 100000, savings: 0, emotion: 0, knowledge: 3, risk: 2 },
        consequences: {
          immediate: "Flexibility and lower monthly outgo",
          shortTerm: "₹20K monthly SIP building significant corpus",
          longTerm: "₹20K monthly for 20 years = ₹2.8 crores vs property value"
        }
      },
      {
        id: "delayed_purchase",
        label: "Save Bigger Down Payment",
        description: "Rent for 2 more years, save ₹15L down payment, then buy with smaller loan.",
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
    description: "Age 29: Global markets crash 30%. Your ₹3 lakh portfolio is now ₹2.1 lakhs. Friends are panic selling. What do you do?",
    situation: "📉 Black Monday! Markets have crashed 30% in 2 weeks. Your carefully built ₹3L portfolio is now worth ₹2.1L. News channels are predicting further crashes. Friends are selling everything. Your emotional investing test begins.",
    age: 29,
    salary: 110000,
    context: "3 years of systematic investing tested by market volatility. Your reaction determines long-term wealth.",
    options: [
      {
        id: "stay_invested",
        label: "Hold Strong + Increase SIP",
        description: "Continue current SIPs and actually increase by ₹5K/month. Buy the dip strategy.",
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
        description: "Sell all investments at 30% loss. At least save ₹2.1L from further decline.",
        impact: { netWorth: -90000, savings: 210000, emotion: -2, knowledge: -2, risk: 0 },
        consequences: {
          immediate: "Stop further paper losses but realize actual losses",
          shortTerm: "Miss the recovery phase completely",
          longTerm: "Classic buy high, sell low mistake - wealth building severely damaged"
        }
      },
      {
        id: "partial_retreat",
        label: "Reduce SIP by 50%",
        description: "Stop half of SIPs, keep existing investments. Compromise approach.",
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
    description: "Age 30: Your first child is born. An insurance agent pushes ₹10K/month ULIP policy. Term + mutual fund vs ULIP decision.",
    situation: "👶 Your child is born! Suddenly protection becomes critical. Insurance agent offers ₹50L ULIP policy with ₹10K/month premium 'covering insurance + investment'. Term plan + separate investing vs ULIP choice.",
    age: 30,
    salary: 125000,
    context: "New parent responsibilities. Insurance becomes crucial but product choice affects wealth building.",
    options: [
      {
        id: "term_plus_sip",
        label: "Term Insurance + Mutual Fund SIP",
        description: "₹1L term policy for ₹15K/year + ₹8.5K/month in mutual funds. Separate protection and investment.",
        impact: { netWorth: 50000, savings: -102000, emotion: 1, knowledge: 3, risk: 1 },
        consequences: {
          immediate: "High coverage with lower cost and better investment returns",
          shortTerm: "₹8.5K monthly in pure equity funds vs mixed ULIP returns",
          longTerm: "Typically 3-4% higher annual returns = ₹15-20L more wealth at retirement"
        }
      },
      {
        id: "ulip_policy",
        label: "Accept ULIP Recommendation",
        description: "₹50L ULIP with ₹10K monthly premium. Insurance + investment in one product.",
        impact: { netWorth: 0, savings: -120000, emotion: 2, knowledge: -1, risk: 2 },
        consequences: {
          immediate: "Convenient single product but higher costs and lower returns",
          shortTerm: "Fund management charges and insurance costs reduce returns",
          longTerm: "Typically 3-4% lower returns = ₹15-20L less wealth at retirement"
        }
      },
      {
        id: "high_coverage_term",
        label: "Maximum Term Coverage",
        description: "₹2 cr term policy for ₹45K/year + ₹6.25K/month SIP. Maximum protection approach.",
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
    description: "Age 31: A business opportunity needs ₹5L investment with potential ₹50L returns in 2 years. Risk your savings for entrepreneurial dreams?",
    situation: "💼 Your friend's tech startup needs co-founder investment of ₹5L. They project ₹50L returns in 2 years based on similar company valuations. Risk your hard-earned savings for potential 10x returns?",
    age: 31,
    salary: 140000,
    context: "Accumulated ₹8L savings. Entrepreneurial opportunity vs steady wealth building dilemma.",
    options: [
      {
        id: "full_investment",
        label: "Go All-In on Business",
        description: "Invest ₹5L in startup. Take 2-year sabbatical to work full-time on business.",
        impact: { netWorth: -300000, savings: -500000, emotion: 3, knowledge: 3, risk: 5 },
        consequences: {
          immediate: "Maximum commitment to potential high returns",
          shortTerm: "No salary + investment risk = high financial stress",
          longTerm: "Either become wealthy entrepreneur or face significant financial setback"
        }
      },
      {
        id: "partial_investment",
        label: "₹2L Investment + Keep Job",
        description: "Invest ₹2L as silent partner. Continue job for security. Moderate risk approach.",
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
        description: "Decline investment. Continue systematic SIP and career growth. Play it safe.",
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
    description: "Age 32: You're now in 30% tax bracket. Smart tax planning can save ₹50K annually. Learn the tax optimization game.",
    situation: "💰 Your ₹16L annual package puts you in 30% tax bracket. Smart use of 80C, ELSS, PPF, and other deductions can save ₹50K+ annually in taxes. Time to master tax optimization.",
    age: 32,
    salary: 160000,
    context: "Higher income bracket requires sophisticated tax planning for wealth preservation.",
    options: [
      {
        id: "comprehensive_planning",
        label: "Master Tax Optimization",
        description: "Use all deductions: ELSS ₹1.5L, PPF ₹1.5L, insurance ₹50K, HRA optimization, etc.",
        impact: { netWorth: 150000, savings: -300000, emotion: 1, knowledge: 4, risk: 1 },
        consequences: {
          immediate: "₹50K annual tax savings reinvested for wealth building",
          shortTerm: "Complex portfolio management but higher net returns",
          longTerm: "₹50K annual savings compounded = ₹35L additional wealth"
        }
      },
      {
        id: "simple_tax_approach",
        label: "Basic 80C Compliance",
        description: "Just do ₹1.5L in ELSS and PPF. Keep it simple, pay higher taxes.",
        impact: { netWorth: 50000, savings: -150000, emotion: 0, knowledge: 1, risk: 1 },
        consequences: {
          immediate: "Simple approach but ₹30K annual tax loss",
          shortTerm: "Less complexity but suboptimal wealth building",
          longTerm: "₹30K annual tax loss = ₹20L less wealth over career"
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
    description: "Age 35: Your startup friend just sold his company for ₹25 crores. You have ₹45L savings but feeling left behind. Career reset time?",
    situation: "🚀 Your friend who started the company 4 years ago just sold it for ₹25 crores. You have ₹45L savings and ₹20L annual package. Feeling successful but also wondering about the path not taken.",
    age: 35,
    salary: 200000,
    context: "Mid-career evaluation. Steady wealth building vs entrepreneurial regrets.",
    options: [
      {
        id: "start_own_business",
        label: "Start Your Own Company",
        description: "Use ₹25L to start business. Quit job, go full entrepreneur. Chase the big dream.",
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
        description: "Keep job, invest ₹10L in 4-5 startups. Diversify entrepreneurial risk.",
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
        description: "Increase SIP to ₹25K/month. Focus on senior management roles. Steady wealth building.",
        impact: { netWorth: 200000, savings: -300000, emotion: 0, knowledge: 2, risk: 1 },
        consequences: {
          immediate: "Disciplined approach without FOMO-driven decisions",
          shortTerm: "Accelerated systematic wealth building",
          longTerm: "Highly probable path to ₹5-8 crore corpus by retirement"
        }
      }
    ],
    learningPoint: "Comparison is the thief of joy. Focus on your own financial journey rather than others' outlier successes."
  },

  {
    id: 12,
    title: "Children's Education - Future Investment",
    description: "Age 37: Your child will need ₹50L for quality education in 12 years. Start education fund or rely on general investments?",
    situation: "🎓 Your 5-year-old child will need ₹50L for quality engineering/medical education in 12 years (inflation-adjusted). Dedicated education planning vs general wealth building approach?",
    age: 37,
    salary: 250000,
    context: "Parental responsibilities require goal-based financial planning.",
    options: [
      {
        id: "dedicated_education_fund",
        label: "Separate Education SIP",
        description: "₹20K monthly dedicated education SIP in balanced funds for 12 years.",
        impact: { netWorth: 100000, savings: -240000, emotion: 2, knowledge: 2, risk: 2 },
        consequences: {
          immediate: "Goal-specific planning with peace of mind",
          shortTerm: "Reduced general investment but education security",
          longTerm: "₹50L+ education corpus but lower overall wealth"
        }
      },
      {
        id: "general_wealth_approach",
        label: "General Wealth Building",
        description: "Continue ₹30K monthly SIP. Use general corpus for education when needed.",
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
        description: "₹25K annually in child education insurance plan with guaranteed returns.",
        impact: { netWorth: 50000, savings: -300000, emotion: 3, knowledge: 0, risk: 1 },
        consequences: {
          immediate: "Guaranteed education corpus but lower returns",
          shortTerm: "Insurance security but opportunity cost",
          longTerm: "Education assured but ₹15-20L less overall wealth"
        }
      }
    ],
    learningPoint: "Goal-based planning vs general wealth building trade-offs. Balance specific needs with overall wealth optimization."
  },

  {
    id: 13,
    title: "Parents' Retirement - Sandwich Generation",
    description: "Age 40: Your parents need ₹30K monthly support. Your own retirement vs parents' care dilemma. The sandwich generation challenge.",
    situation: "👴👵 Your parents need financial support of ₹30K monthly for medical and living expenses. You're 40 with ₹1.2 cr corpus. Balance your FIRE goals with parents' care responsibilities.",
    age: 40,
    salary: 300000,
    context: "Peak earning years but family obligations increasing. Retirement planning vs immediate family needs.",
    options: [
      {
        id: "full_parent_support",
        label: "Comprehensive Parent Care",
        description: "₹30K monthly + ₹5L annual medical emergency fund. Full family responsibility.",
        impact: { netWorth: -200000, savings: -420000, emotion: 2, knowledge: 1, risk: 2 },
        consequences: {
          immediate: "Complete family care but delayed personal financial goals",
          shortTerm: "₹4.2L annual impact on wealth building",
          longTerm: "Retirement delayed by 3-5 years but family obligations fulfilled"
        }
      },
      {
        id: "balanced_support",
        label: "Shared Family Responsibility",
        description: "₹15K monthly support + coordinate with siblings for shared responsibilities.",
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
        description: "₹5K monthly + emergency medical support only. Focus on own retirement.",
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
    description: "Age 45: You have ₹3.2 crores. You can coast to FIRE by 55 or push hard for FIRE by 50. Final sprint decision.",
    situation: "🏁 You're 45 with ₹3.2 cr corpus. Your FIRE number is ₹5 cr. You can coast with current investments and reach FIRE by 55, or make sacrifices to achieve it by 50. Final sprint or comfortable cruise?",
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
        description: "Achieve ₹4 cr by 48, then switch to part-time work for remaining income needs.",
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