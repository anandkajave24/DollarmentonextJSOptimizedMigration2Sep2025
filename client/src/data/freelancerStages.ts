// Comprehensive Freelancer Financial Journey - 15+ Stages
export interface FreelancerStageOption {
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
    clientBase: number;
    skillLevel: number;
    independence?: number;
  };
  consequences: {
    immediate: string;
    shortTerm: string;
    longTerm: string;
  };
}

export interface FreelancerGameStage {
  id: number;
  title: string;
  description: string;
  situation: string;
  age: number;
  monthlyIncome: number;
  context: string;
  options: FreelancerStageOption[];
  learningPoint: string;
}

export const freelancerStages: FreelancerGameStage[] = [
  {
    id: 1,
    title: "Freelance Freedom vs Financial Chaos",
    description: "Month 1: You've quit your $4K job to freelance. First client pays $2.5K. Irregular income reality hits hard.",
    situation: "🎯 FREELANCE REALITY CHECK\n\n💰 YOUR SITUATION:\nJust quit $4K job • First freelance payment: $2.5K\nBank balance: $4,500 • Monthly expenses: $3K\n\n⚠️ IMMEDIATE CHALLENGES:\n• Rent due in 15 days\n• Client payment delayed indefinitely\n• No emergency fund or benefits\n• Family expecting $700/month\n• Laptop needs $800 repair\n\n🤔 KEY DECISION:\nTake any project at low rates for quick cash\nOR\nBe selective and build premium positioning\n\n⚡ FREELANCER REALITY:\nNo 401k, health insurance, or paid time off",
    age: 25,
    monthlyIncome: 2500,
    context: "Fresh freelancer with irregular income. Financial discipline will determine success or failure.",
    options: [
      {
        id: "survival_mode",
        label: "Survival Mode - Take Every Project",
        description: "Accept all projects regardless of pay ($800-1.5K each). Work 12+ hours daily. Focus purely on immediate income generation.",
        impact: { netWorth: 1500, savings: 0, emotion: -2, knowledge: -1, risk: 3, clientBase: 3, skillLevel: -1 },
        consequences: {
          immediate: "Immediate cash flow but extremely low rates and burnout risk",
          shortTerm: "High volume, low-value work creates unsustainable cycle",
          longTerm: "Trapped in low-paying market segment, difficult to scale income"
        }
      },
      {
        id: "strategic_freelancer",
        label: "Strategic Freelancer - Quality Over Quantity",
        description: "Be selective with projects ($2K+ only). Invest time in portfolio and skill development. Build emergency fund.",
        impact: { netWorth: 500, savings: 1000, emotion: 1, knowledge: 3, risk: 2, clientBase: 1, skillLevel: 3 },
        consequences: {
          immediate: "Lower immediate income but building foundation for premium rates",
          shortTerm: "Stronger portfolio attracts better clients and higher rates",
          longTerm: "Positioned as premium freelancer with sustainable high income"
        }
      },
      {
        id: "panic_mode",
        label: "Panic Mode - Borrow and Splurge",
        description: "Take personal loan ($10K) to maintain lifestyle. Expensive workspace, latest gadgets, premium subscriptions.",
        impact: { netWorth: -5000, savings: 0, debt: 10000, emotion: -3, knowledge: -2, risk: 5, clientBase: 0, skillLevel: 1 },
        consequences: {
          immediate: "Maintained lifestyle but massive debt burden starts",
          shortTerm: "$800 monthly EMI pressure while income remains uncertain",
          longTerm: "Debt spiral likely as freelance income struggles to service loans"
        }
      }
    ],
    learningPoint: "Freelancing requires different financial strategies than salaried jobs. Sustainable growth beats short-term survival."
  },

  {
    id: 2,
    title: "The Client Payment Crisis",
    description: "Month 4: Major client owes $8K for 3 months work. They're delaying payment citing 'cash flow issues'. Your rent is overdue.",
    situation: "💸 CLIENT PAYMENT CRISIS\n\n💰 YOUR SITUATION:\nMajor client owes $8K for 3 months work\nBank balance: $300 • Rent overdue: $1.2K\nCredit card overdue: $1.5K • Eviction threatened\n\n🏢 CLIENT EXCUSE:\n\"Cash flow issues, pay next month\"\nWants you to continue working as usual\nNo penalty clause for late payments\n\n⚡ CRITICAL DECISION:\nContinue working and hope for payment\nOR\nStop work and demand immediate payment\n\n💡 FREELANCER LESSON:\n60% income from one client = dangerous dependency",
    age: 25,
    monthlyIncome: 3500,
    context: "Critical payment crisis testing your freelancer resilience. How you handle this will determine your professional reputation and financial stability.",
    options: [
      {
        id: "aggressive_recovery",
        label: "Aggressive Payment Recovery",
        description: "Stop all work immediately. Legal notice for payment. Charge 2% monthly penalty. Find new clients aggressively.",
        impact: { netWorth: 3000, savings: 0, emotion: 0, knowledge: 2, risk: 3, clientBase: -1, skillLevel: 1 },
        consequences: {
          immediate: "Client relationship damaged but establishes professional boundaries",
          shortTerm: "Forces payment but need to rebuild client base quickly",
          longTerm: "Creates reputation for being strict about payments - attracts serious clients"
        }
      },
      {
        id: "doormat_freelancer",
        label: "Continue Working - Hope for Payment",
        description: "Keep working for the client hoping they'll pay eventually. Take small loan to manage expenses.",
        impact: { netWorth: -2000, savings: 0, debt: 5000, emotion: -3, knowledge: -1, risk: 4, clientBase: 0, skillLevel: 0 },
        consequences: {
          immediate: "Relationship maintained but financial stress increases",
          shortTerm: "Debt accumulates while payment remains uncertain",
          longTerm: "Sets precedent for clients to delay payments indefinitely"
        }
      },
      {
        id: "diversification_strategy",
        label: "Emergency Diversification",
        description: "Negotiate payment plan with client. Simultaneously acquire 3-4 small clients. Create payment protection systems.",
        impact: { netWorth: 1000, savings: 500, emotion: 1, knowledge: 3, risk: 2, clientBase: 4, skillLevel: 2 },
        consequences: {
          immediate: "Reduces dependence on single client while maintaining relationship",
          shortTerm: "Multiple income streams provide financial stability",
          longTerm: "Diversified client base protects against future payment crises"
        }
      }
    ],
    learningPoint: "Client payment delays are freelancer's biggest risk. Always diversify income sources and have payment protection systems."
  },

  {
    id: 3,
    title: "Skill Investment vs Immediate Income",
    description: "Month 8: You can learn high-demand skill ($3.5K course) that could triple your rates, but need the money for expenses.",
    situation: "🎓 SKILL INVESTMENT DILEMMA:\n\n💡 OPPORTUNITY ANALYSIS:\n• Advanced Digital Marketing Certification: $3,500\n• Current Rate: $50/hour → Potential Rate: $150/hour\n• Course Duration: 3 months (20 hours/week commitment)\n• Industry Demand: Very High (verified through job portals)\n\n💰 CURRENT FINANCIAL STATE:\n• Monthly Income: $5,000 (finally stable)\n• Monthly Expenses: $3,200\n• Available Cash: $4,000\n• Emergency Fund: $0\n\n⚖️ THE TRADE-OFF:\n• Invest $3.5K in skills = survive on $500 for 3 months\n• Skip course = continue current rates but miss growth opportunity\n• Borrow for course = $300 EMI burden for 12 months\n\n📈 MARKET REALITY:\n• Your current skills becoming commoditized\n• Clients asking for advanced skills you don't have\n• Competitors with certifications charging 3x your rates",
    age: 26,
    monthlyIncome: 5000,
    context: "Career-defining moment: Invest in expensive skills for exponential growth, or play it safe with gradual learning. Your choice determines if you become a premium expert or remain in the commodity market.",
    options: [
      {
        id: "skill_investment",
        label: "All-in Skill Investment",
        description: "Pay $3.5K for course. Live extremely frugally for 3 months. Focus completely on learning and certification.",
        impact: { netWorth: -2000, savings: -3500, emotion: 1, knowledge: 5, risk: 3, clientBase: 0, skillLevel: 5 },
        consequences: {
          immediate: "Financial stress but rapid skill development",
          shortTerm: "Certification opens doors to premium clients and 3x rates",
          longTerm: "Positions as expert in high-demand field with sustainable high income"
        }
      },
      {
        id: "gradual_learning",
        label: "Self-Learning + Free Resources",
        description: "Skip paid course. Use YouTube, free resources. Learn while continuing current work. Slower but safer.",
        impact: { netWorth: 500, savings: 500, emotion: 0, knowledge: 2, risk: 1, clientBase: 1, skillLevel: 2 },
        consequences: {
          immediate: "Financial stability maintained with gradual skill building",
          shortTerm: "Slower progress but zero financial risk",
          longTerm: "May miss window of opportunity as market becomes more competitive"
        }
      },
      {
        id: "loan_for_education",
        label: "Education Loan Strategy",
        description: "Take $4K education loan. Complete course while maintaining current income. Systematic approach.",
        impact: { netWorth: 0, savings: 0, debt: 4000, emotion: 0, knowledge: 4, risk: 3, clientBase: 1, skillLevel: 4 },
        consequences: {
          immediate: "Best of both worlds but EMI pressure begins",
          shortTerm: "Skills + income stability = optimal growth trajectory",
          longTerm: "Loan pays for itself through higher rates within 6-8 months"
        }
      }
    ],
    learningPoint: "In freelancing, skills are your biggest asset. Strategic investment in learning compounds exponentially over time."
  },

  {
    id: 4,
    title: "Business Expansion vs Solo Safety",
    description: "Year 2: You're earning $8K/month. Opportunity to hire 2 freelancers and take bigger projects, but requires $20K investment.",
    situation: "🚀 BUSINESS SCALING DECISION:\n\n📈 CURRENT SUCCESS METRICS:\n• Monthly Income: $8,000 (consistent for 6 months)\n• Client Base: 8 regular clients\n• Rate: $120/hour (after skill upgrades)\n• Working: 65 hours/month (sustainable)\n\n💼 EXPANSION OPPORTUNITY:\n• Large agency wants to outsource projects worth $30K/month\n• Requires team of 3 (you + 2 freelancers)\n• Investment Needed: $20,000 (office setup, equipment, 3-month runway)\n• Your Role: Project manager + senior specialist\n• Revenue Split: Keep $15K, pay $15K to team\n\n⚠️ RISK FACTORS:\n• Management responsibility vs pure freelancing\n• Fixed costs vs zero overheads\n• Client dependency increases\n• Cash flow complexity with team salaries\n\n🎯 THE DILEMMA:\n• Scale to agency model = higher income but more complexity\n• Stay solo = lower ceiling but complete freedom\n• Fail = $20K loss + back to square one",
    age: 27,
    monthlyIncome: 8000,
    context: "Critical business decision: Scale beyond personal capacity with team and risk, or maximize solo expertise. This choice determines if you build a business or remain a highly-paid individual contributor.",
    options: [
      {
        id: "scale_to_agency",
        label: "Scale to Freelance Agency",
        description: "Invest $20K, hire team, take agency contract. Transform from freelancer to business owner.",
        impact: { netWorth: -10000, savings: -20000, emotion: 2, knowledge: 3, risk: 4, clientBase: 1, skillLevel: 2 },
        consequences: {
          immediate: "Major financial commitment but potential for exponential growth",
          shortTerm: "Management challenges but monthly income could reach $15K+",
          longTerm: "Business asset creation - can scale beyond personal time limitations"
        }
      },
      {
        id: "premium_solo",
        label: "Premium Solo Specialist",
        description: "Decline agency offer. Focus on becoming ultra-premium specialist. Charge $200+/hour for expert consultation.",
        impact: { netWorth: 5000, savings: 10000, emotion: 1, knowledge: 4, risk: 2, clientBase: 0, skillLevel: 4 },
        consequences: {
          immediate: "Continued financial stability with specialization focus",
          shortTerm: "Gradual rate increases as expertise builds",
          longTerm: "Maximum hourly rates but income capped by personal time"
        }
      },
      {
        id: "hybrid_approach",
        label: "Hybrid Partnership Model",
        description: "Partner with existing agency. Provide specialized services. Keep solo practice + steady partnership income.",
        impact: { netWorth: 2000, savings: 5000, emotion: 1, knowledge: 3, risk: 2, clientBase: 2, skillLevel: 3 },
        consequences: {
          immediate: "Balanced approach with reduced risk and investment",
          shortTerm: "Steady partnership income + solo practice growth",
          longTerm: "Multiple income streams but limited scaling potential"
        }
      }
    ],
    learningPoint: "Scaling freelance business requires different skills than solo work. Consider your personality and long-term goals."
  },

  {
    id: 5,
    title: "Tax Planning and Legal Structure",
    description: "Year 2.5: CA suggests forming company for tax benefits. Annual income $120K but paying 30% tax. Legal structure decision time.",
    situation: "📊 TAX OPTIMIZATION CROSSROADS:\n\n💰 CURRENT TAX SITUATION:\n• Annual Income: $120,000\n• Tax Paid: $36,000 (30% slab)\n• Net Income: $84,000\n• Tax Rate: Freelancer income = salary income tax rates\n\n🏢 CA RECOMMENDATIONS:\n• Option 1: Private Limited Company - 25-30% corporate tax + dividend tax\n• Option 2: LLP - Pass-through taxation + professional credibility\n• Option 3: Proprietorship + GST registration - compliance required\n• Option 4: Continue as Individual - Simplest but highest tax\n\n💡 BUSINESS IMPLICATIONS:\n• Company = Professional credibility + easier client payments\n• Compliance Cost: $5K-10K annually for company/LLP\n• GST Registration: Required for business operations\n• Client Preference: Many prefer invoices from registered entities\n\n⚖️ COMPLEXITY vs SAVINGS:\n• Individual: Simple, high tax\n• Company: Complex, potential savings, future scalability\n• LLP: Moderate complexity, partnership flexibility",
    age: 28,
    monthlyIncome: 10000,
    context: "Freelancer journey milestone: Your decisions here will shape your long-term success trajectory and professional reputation.",
    options: [
      {
        id: "incorporate_company",
        label: "Form Private Limited Company",
        description: "$2.5K incorporation + $7.5K annual compliance. Professional structure with tax optimization and growth potential.",
        impact: { netWorth: -2500, savings: -10000, emotion: 1, knowledge: 4, risk: 2, clientBase: 2, skillLevel: 1 },
        consequences: {
          immediate: "Higher setup costs but professional credibility boost",
          shortTerm: "Tax savings of $5K-10K annually after initial investment",
          longTerm: "Scalable structure for business growth and investment options"
        }
      },
      {
        id: "stay_individual",
        label: "Continue as Individual",
        description: "Avoid compliance complexity. Focus on income growth. Use individual tax planning strategies.",
        impact: { netWorth: 2500, savings: 5000, emotion: 0, knowledge: 1, risk: 1, clientBase: 0, skillLevel: 1 },
        consequences: {
          immediate: "Simplicity maintained with zero setup costs",
          shortTerm: "Continue paying higher taxes but less administrative burden",
          longTerm: "Limited tax optimization options as income grows further"
        }
      },
      {
        id: "llp_structure",
        label: "Limited Liability Partnership",
        description: "$1.5K setup cost. Professional structure with partnership flexibility. Moderate compliance requirements.",
        impact: { netWorth: -1000, savings: -5000, emotion: 1, knowledge: 3, risk: 2, clientBase: 1, skillLevel: 1 },
        consequences: {
          immediate: "Balanced approach with moderate setup investment",
          shortTerm: "Professional credibility with manageable compliance",
          longTerm: "Good foundation for partnerships and moderate tax efficiency"
        }
      }
    ],
    learningPoint: "Tax planning becomes crucial as freelance income grows. Right legal structure can save thousands annually."
  },

  {
    id: 6,
    title: "Health Insurance Reality Check",
    description: "Year 3: You fall sick, hospitalized for 5 days. Bill: $12K. No employer insurance. Health crisis meets financial crisis.",
    situation: "🏥 HEALTH CRISIS WAKE-UP CALL:\n\n💊 MEDICAL EMERGENCY:\n• Sudden illness requiring 5-day hospitalization\n• Total Medical Bill: $12,000\n• No Corporate Health Insurance\n• Savings Wiped Out: Using emergency fund\n• Work Stopped: Lost $4K income during recovery\n\n💰 FINANCIAL IMPACT:\n• Medical Expenses: $12,000\n• Lost Income: $4,000\n• Total Impact: $16,000\n• Current Savings: $8,000 (insufficient)\n• Had to borrow: $8,000 from family\n\n🤔 FREELANCER INSURANCE REALITY:\n• No paid sick leave like salaried employees\n• No corporate group insurance coverage\n• Income directly tied to working hours\n• Health issues = Double financial impact (expense + lost income)\n\n📋 INSURANCE OPTIONS NOW:\n• Individual Health Insurance: $1.5K-2.5K annually\n• Critical Illness Cover: $800 annually\n• Personal Accident: $300 annually\n• Income Protection Insurance: Not easily available for freelancers",
    age: 29,
    monthlyIncome: 12000,
    context: "Freelancer journey milestone: Your decisions here will shape your long-term success trajectory and professional reputation.",
    options: [
      {
        id: "comprehensive_insurance",
        label: "Comprehensive Health Protection",
        description: "$5K health insurance + $2.5K critical illness + accident cover. Total premium: $3.5K annually.",
        impact: { netWorth: -3500, savings: -3500, emotion: 2, knowledge: 2, risk: -2, clientBase: 0, skillLevel: 0 },
        consequences: {
          immediate: "High premium outgo but complete health protection",
          shortTerm: "Peace of mind and financial protection against health emergencies",
          longTerm: "Insurance costs compound but protects entire wealth building journey"
        }
      },
      {
        id: "basic_insurance",
        label: "Basic Health Insurance Only",
        description: "$10K health insurance for $1.2K annually. Minimal protection to keep costs low.",
        impact: { netWorth: -1200, savings: -1200, emotion: 0, knowledge: 1, risk: 1, clientBase: 0, skillLevel: 0 },
        consequences: {
          immediate: "Moderate premium with basic protection",
          shortTerm: "Covers major health expenses but gaps remain",
          longTerm: "Adequate for most situations but risk of high out-of-pocket costs"
        }
      },
      {
        id: "self_insurance",
        label: "Self-Insurance Strategy",
        description: "Skip insurance premiums. Create $15K health emergency fund. Invest the premium difference in index funds.",
        impact: { netWorth: 2000, savings: 3500, emotion: -1, knowledge: 1, risk: 3, clientBase: 0, skillLevel: 0 },
        consequences: {
          immediate: "Higher investable surplus but complete health risk exposure",
          shortTerm: "Emergency fund grows but major health crisis could wipe out savings",
          longTerm: "High risk strategy - one major illness could derail entire financial plan"
        }
      }
    ],
    learningPoint: "Freelancers face double impact from health issues - medical costs plus lost income. Insurance is not optional."
  },

  {
    id: 7,
    title: "Investment Strategy for Irregular Income",
    description: "Year 4: Income varies $6K-$15K monthly. Traditional investment doesn't work. Need flexible investment strategy for freelancers.",
    situation: "📊 IRREGULAR INCOME INVESTMENT CHALLENGE:\n\n💰 INCOME PATTERN ANALYSIS:\n• Month 1: $15,000 (big project completion)\n• Month 2: $6,000 (slow month)\n• Month 3: $12,000 (regular clients)\n• Month 4: $8,000 (client payment delays)\n• Average: $10,250/month but highly variable\n\n🎯 TRADITIONAL INVESTMENT PROBLEMS:\n• Fixed $2K investment = stress during low-income months\n• Skip investments during cash crunch = irregular investing\n• Emergency fund constantly depleted and replenished\n\n💡 FREELANCER INVESTMENT STRATEGIES:\n• Percentage-Based Investment: Invest 20% of each payment immediately\n• Quarterly Lump Sum: Invest $6K every 3 months\n• Two-Tier System: $1K fixed investment + variable top-ups\n• Cash Flow Buffer: Maintain $20K buffer, invest excess\n\n📈 INVESTMENT PSYCHOLOGY:\n• Feast or famine mindset affects investment discipline\n• Temptation to spend more during good months\n• Fear of investing during uncertain periods",
    age: 30,
    monthlyIncome: 10250,
    context: "Freelancer journey milestone: Your decisions here will shape your long-term success trajectory and professional reputation.",
    options: [
      {
        id: "percentage_based_sip",
        label: "Percentage-Based Investment",
        description: "Invest 25% of every payment immediately. $10K month = $2.5K investment. Variable but disciplined.",
        impact: { netWorth: 3000, savings: -30600, emotion: 1, knowledge: 3, risk: 2, clientBase: 0, skillLevel: 1 },
        consequences: {
          immediate: "Investment linked to income - high discipline required",
          shortTerm: "Consistent investment habit regardless of income fluctuation",
          longTerm: "Excellent wealth building as investments scale with income growth"
        }
      },
      {
        id: "cash_buffer_system",
        label: "Cash Buffer + Fixed Investment",
        description: "Maintain $30K cash buffer. Fixed $1.5K investment + invest any excess above buffer amount.",
        impact: { netWorth: 1000, savings: -18000, emotion: 2, knowledge: 2, risk: 1, clientBase: 0, skillLevel: 0 },
        consequences: {
          immediate: "High cash requirement but maximum financial security",
          shortTerm: "Steady investment with complete cash flow protection",
          longTerm: "Lower returns due to high cash allocation but zero stress"
        }
      },
      {
        id: "opportunistic_investing",
        label: "Opportunistic Lump Sum",
        description: "No regular investment. Invest large amounts during market crashes or high-income months. Timing-based approach.",
        impact: { netWorth: 5000, savings: 0, emotion: 0, knowledge: 1, risk: 4, clientBase: 0, skillLevel: 0 },
        consequences: {
          immediate: "Maximum flexibility but requires market timing skills",
          shortTerm: "Potential for high returns if timing is good",
          longTerm: "High risk of poor returns due to behavioral biases and timing errors"
        }
      }
    ],
    learningPoint: "Irregular income requires flexible investment strategies. Percentage-based investing often works better than fixed amounts."
  },

  {
    id: 8,
    title: "Retirement Planning Without 401k",
    description: "Age 32: Salaried friends have $50K in 401k. You have $0 forced retirement savings. Time to create your own retirement plan.",
    situation: "🏦 RETIREMENT REALITY CHECK:\n\n📊 RETIREMENT SAVINGS GAP:\n• Your Retirement Corpus: $0 (no 401k/pension)\n• Salaried Friend (same age): $50,000 in 401k\n• Required Corpus at 60: $500K-800K for decent retirement\n• Years Left: 28 years\n• Current Monthly Investment: Irregular and insufficient\n\n💡 FREELANCER RETIREMENT CHALLENGES:\n• No employer contribution to retirement funds\n• No guaranteed pension\n• Income may not scale indefinitely with age\n• Skill obsolescence risk in fast-changing fields\n• Health issues can stop income immediately\n\n🎯 RETIREMENT PLANNING OPTIONS:\n• IRA: Tax benefits + decent returns + retirement growth\n• Roth IRA: Tax-free growth and withdrawals\n• Index Funds: Highest growth potential\n• Real Estate: Rental income + appreciation\n• Systematic approach needed - can't rely on 'future high income'\n\n⚖️ THE CHALLENGE:\n• Start aggressive retirement saving now vs maximize current lifestyle\n• $2.5K monthly retirement investment vs $1K + enjoy present",
    age: 32,
    monthlyIncome: 12500,
    context: "Freelancer journey milestone: Your decisions here will shape your long-term success trajectory and professional reputation.",
    options: [
      {
        id: "aggressive_retirement",
        label: "Aggressive Retirement Planning",
        description: "$3K monthly: $1.5K index funds + $1K IRA + $500 Roth IRA. Sacrifice current lifestyle for future security.",
        impact: { netWorth: -10000, savings: -36000, emotion: 0, knowledge: 4, risk: 2, clientBase: 0, skillLevel: 0 },
        consequences: {
          immediate: "Significant lifestyle adjustment but maximum retirement security",
          shortTerm: "High savings rate creates substantial corpus building",
          longTerm: "Highly likely to achieve $500K+ retirement corpus and financial independence"
        }
      },
      {
        id: "balanced_retirement",
        label: "Balanced Retirement Strategy",
        description: "$1.8K monthly: $1K index funds + $500 IRA + $300 Roth IRA. Moderate sacrifice with decent growth.",
        impact: { netWorth: -5000, savings: -21600, emotion: 1, knowledge: 3, risk: 2, clientBase: 0, skillLevel: 0 },
        consequences: {
          immediate: "Manageable lifestyle impact with solid retirement planning",
          shortTerm: "Steady retirement corpus building with current lifestyle balance",
          longTerm: "Good probability of achieving comfortable retirement if income grows"
        }
      },
      {
        id: "delayed_retirement",
        label: "Minimal Now, More Later",
        description: "$800 monthly now. Plan to increase investments when income grows to $20K+. Bet on future earnings.",
        impact: { netWorth: 2000, savings: -9600, emotion: 2, knowledge: 1, risk: 4, clientBase: 0, skillLevel: 0 },
        consequences: {
          immediate: "Current lifestyle maintained with minimal retirement impact",
          shortTerm: "Enjoy present but retirement corpus building is slow",
          longTerm: "High risk strategy - depends on continued income growth and discipline"
        }
      }
    ],
    learningPoint: "Freelancers must create their own retirement safety net. Starting early with systematic investing is crucial."
  },

  {
    id: 9,
    title: "Market Crash Income Impact",
    description: "Age 34: Economic recession hits. Client budgets slashed. Your income drops 60% to $5K/month. Survival vs growth decisions.",
    situation: "📉 RECESSION SURVIVAL MODE:\n\n💰 INCOME CRASH REALITY:\n• Previous Income: $12,500/month\n• Current Income: $5,000/month (60% drop)\n• Client Situation: Budget cuts, project cancellations, payment delays\n• Market Demand: Down 70% for your services\n• Competition: Desperate freelancers cutting rates\n\n🎯 SURVIVAL CHALLENGES:\n• Monthly Expenses: $8,000 (still high)\n• Investments: $1,800 investment (unsustainable now)\n• Emergency Fund: $20,000 (will last 4-5 months)\n• Fixed Costs: Insurance, subscriptions, EMIs\n\n💡 STRATEGIC OPTIONS:\n• Pivot to recession-proof services\n• Reduce expenses drastically\n• Use recession as skill-building time\n• Diversify income streams urgently\n• Geographic expansion (international clients)\n\n⚠️ CRITICAL DECISIONS:\n• Stop investments to preserve cash vs continue investing in cheap markets\n• Slash expenses vs maintain professional image\n• Learn new recession-proof skills vs double-down on current expertise",
    age: 34,
    monthlyIncome: 5000,
    context: "Freelancer journey milestone: Your decisions here will shape your long-term success trajectory and professional reputation.",
    options: [
      {
        id: "recession_pivot",
        label: "Strategic Recession Pivot",
        description: "Learn recession-proof skills (cost-cutting consulting). Slash personal expenses 50%. Continue reduced investments.",
        impact: { netWorth: -5000, savings: -18000, emotion: 1, knowledge: 4, risk: 2, clientBase: 2, skillLevel: 3 },
        consequences: {
          immediate: "Short-term financial stress but strategic positioning",
          shortTerm: "New skills open recession-proof income streams",
          longTerm: "Emerges stronger post-recession with diversified skill set"
        }
      },
      {
        id: "survival_mode_only",
        label: "Pure Survival Mode",
        description: "Stop all investments. Cut expenses to bone. Take any work at any rate. Focus purely on cash flow.",
        impact: { netWorth: 0, savings: 0, emotion: -2, knowledge: -1, risk: 1, clientBase: 1, skillLevel: -1 },
        consequences: {
          immediate: "Maximum cash preservation but lost investment opportunities",
          shortTerm: "Survives recession but misses market bottom investments",
          longTerm: "Recovery takes longer due to stopped investments and skill stagnation"
        }
      },
      {
        id: "contrarian_investing",
        label: "Contrarian Opportunity Strategy",
        description: "Use emergency fund to continue investing. Learn AI/automation skills. Geographic diversification to stable markets.",
        impact: { netWorth: -100000, savings: -240000, emotion: 0, knowledge: 5, risk: 4, clientBase: 3, skillLevel: 4 },
        consequences: {
          immediate: "High risk approach using emergency funds for opportunities",
          shortTerm: "Either excellent returns or significant financial stress",
          longTerm: "High-risk, high-reward strategy - either accelerates wealth or causes setbacks"
        }
      }
    ],
    learningPoint: "Recessions test freelancer resilience. Diversification and adaptability are survival skills for independent professionals."
  },

  {
    id: 10,
    title: "Family Responsibilities vs Business Growth",
    description: "Age 35: Parents need $2.5K monthly support. Marriage discussions need $50K. Business opportunity needs $30K investment.",
    situation: "👨‍👩‍👧‍👦 FAMILY FINANCIAL PRESSURES:\n\n💰 MULTIPLE FINANCIAL DEMANDS:\n• Parents Health/Living Support: $2,500/month needed\n• Marriage Expenses: $50,000 expected\n• Business Expansion: $30,000 investment opportunity\n• Current Monthly Income: $12,000 (post-recession recovery)\n• Current Savings: $80,000\n\n🏢 BUSINESS OPPORTUNITY:\n• Partnership in AI consultancy firm\n• $30K investment for 25% equity\n• Projected income: $5K/month additional\n• Growth potential: 5x in 3 years\n• Risk: New field, partnership dynamics\n\n👨‍👩‍👧‍👦 FAMILY OBLIGATIONS:\n• Parents: Aging, medical expenses increasing\n• Marriage: Social expectations vs financial reality\n• Future Children: Financial planning needed\n• Spouse Income: Uncertain (depends on partner)\n\n⚖️ THE DILEMMA:\n• Support family + simple marriage + skip business = steady but limited growth\n• Invest in business + minimal family support + delay marriage = growth but relationship stress\n• Balanced approach = sub-optimal on all fronts",
    age: 35,
    monthlyIncome: 12000,
    context: "Freelancer journey milestone: Your decisions here will shape your long-term success trajectory and professional reputation.",
    options: [
      {
        id: "family_first",
        label: "Family First Approach",
        description: "$2.5K monthly parents support + $50K marriage + emergency fund. Skip business opportunity.",
        impact: { netWorth: -20000, savings: -50000, emotion: 2, knowledge: 0, risk: 1, clientBase: 0, skillLevel: 0 },
        consequences: {
          immediate: "Family happiness and social approval but missed business growth",
          shortTerm: "Stable family relationships but limited income growth",
          longTerm: "Comfortable family life but potentially regret about missed business opportunity"
        }
      },
      {
        id: "business_first",
        label: "Business Growth Priority",
        description: "$30K business investment + $1.5K parents support + $20K simple marriage. Focus on wealth building.",
        impact: { netWorth: 10000, savings: -30000, emotion: 0, knowledge: 3, risk: 3, clientBase: 1, skillLevel: 2 },
        consequences: {
          immediate: "Business partnership begins but family relationships strained",
          shortTerm: "Additional income stream but ongoing family pressure",
          longTerm: "Higher wealth potential but possible regret about family sacrifices"
        }
      },
      {
        id: "strategic_balance",
        label: "Strategic Phased Approach",
        description: "$2K parents support + $30K marriage + $20K business investment. Stretch resources but balance priorities.",
        impact: { netWorth: -10000, savings: -50000, emotion: 1, knowledge: 2, risk: 2, clientBase: 0, skillLevel: 1 },
        consequences: {
          immediate: "Tight finances but all priorities addressed partially",
          shortTerm: "Stress from multiple commitments but balanced approach",
          longTerm: "Moderate growth with maintained family relationships"
        }
      }
    ],
    learningPoint: "Mid-career freelancers face multiple financial pressures. Strategic prioritization and phasing becomes crucial."
  },

  {
    id: 11,
    title: "Freelancer Vs Employee Decision",
    description: "Age 37: Offered $25K/month job with equity. Your freelance income: $18K/month. Security vs freedom final choice.",
    situation: "🤔 THE ULTIMATE FREELANCER DILEMMA:\n\n💼 JOB OFFER ANALYSIS:\n• Salary: $25,000/month\n• Benefits: Health insurance, 401k, paid leaves\n• Equity: 0.1% (potential $50K value in 5 years)\n• Security: Stable income, career progression\n• Location: Remote/hybrid options available\n• Company: Well-funded startup, growth stage\n\n🎯 CURRENT FREELANCE STATUS:\n• Income: $18,000/month (variable)\n• Growth: Slow but steady\n• Freedom: Complete control over time and projects\n• Stress: Constant client acquisition and payments\n• Age Factor: 37 - harder to get good jobs later\n\n💰 FINANCIAL COMPARISON:\n• Job: $300K annually + benefits worth $50K\n• Freelance: $216K annually + complete flexibility\n• Long-term: Job equity potential vs freelance scalability\n\n🤯 LIFESTYLE FACTORS:\n• Freedom vs Security trade-off\n• 12+ years of freelancing identity\n• Family stability vs career adventure\n• Geographic constraints vs global opportunities",
    age: 37,
    monthlyIncome: 18000,
    context: "Freelancer journey milestone: Your decisions here will shape your long-term success trajectory and professional reputation.",
    options: [
      {
        id: "take_the_job",
        label: "Accept Corporate Job",
        description: "Take $25K job + equity. End 12-year freelance journey. Focus on financial security and career growth.",
        impact: { netWorth: 10000, savings: 60000, emotion: 0, knowledge: 2, risk: 1, clientBase: -5, skillLevel: 1 },
        consequences: {
          immediate: "Immediate income boost and financial security",
          shortTerm: "Stable income, benefits, potential equity upside",
          longTerm: "Traditional career path with retirement benefits but loss of entrepreneurial freedom"
        }
      },
      {
        id: "stay_freelance",
        label: "Continue Freelance Journey",
        description: "Decline job offer. Double down on freelancing. Target $30K/month through premium positioning and team expansion.",
        impact: { netWorth: 5000, savings: 0, emotion: 1, knowledge: 3, risk: 3, clientBase: 2, skillLevel: 3 },
        consequences: {
          immediate: "Continued freedom but missed immediate income boost",
          shortTerm: "Need to scale aggressively to match job offer financially",
          longTerm: "Potential for higher income and business ownership but no safety net"
        }
      },
      {
        id: "hybrid_consulting",
        label: "Negotiate Consulting Role",
        description: "Counter-offer: Part-time consulting at $15K + maintain key freelance clients. Best of both worlds.",
        impact: { netWorth: 7500, savings: 30000, emotion: 2, knowledge: 3, risk: 2, clientBase: 1, skillLevel: 2 },
        consequences: {
          immediate: "Balanced approach with reduced income than full job",
          shortTerm: "Diversified income with maintained freelance flexibility",
          longTerm: "Moderate income growth but maintained entrepreneurial options"
        }
      }
    ],
    learningPoint: "Mid-career freelancers face the security vs freedom dilemma. There's no universally right answer - depends on personal values."
  },

  {
    id: 12,
    title: "Health Scare and Income Protection",
    description: "Age 40: Diagnosed with chronic condition requiring regular treatment. Income capacity may reduce. Time for serious income protection.",
    situation: "🏥 HEALTH REALITY AND INCOME RISK:\n\n💊 HEALTH DIAGNOSIS:\n• Chronic condition requiring ongoing treatment\n• Treatment Cost: $1,500/month\n• Energy Levels: Reduced by 30-40%\n• Work Capacity: May need to reduce to 60% of current\n• Prognosis: Manageable but permanent lifestyle change\n\n💰 INCOME IMPACT ANALYSIS:\n• Current Income: $20,000/month\n• Potential Reduced Income: $12,000/month\n• Treatment Costs: $1,500/month\n• Net Available: $10,500 vs current $20,000\n• Family Expenses: $8,000/month (can't reduce much)\n\n🛡️ PROTECTION OPTIONS:\n• Disability Insurance: Limited options for freelancers\n• Critical Illness Insurance: Should have bought earlier\n• Income Diversification: Passive income streams\n• Business Systems: Reduce dependence on personal time\n• Emergency Fund: Need larger cushion\n\n📊 CURRENT FINANCIAL POSITION:\n• Savings: $250,000\n• Investments: $180,000\n• Monthly Expenses: $8,000\n• Runway: 12-15 months without income",
    age: 40,
    monthlyIncome: 20000,
    context: "Freelancer journey milestone: Your decisions here will shape your long-term success trajectory and professional reputation.",
    options: [
      {
        id: "income_protection_focus",
        label: "Comprehensive Income Protection",
        description: "Create passive income streams: $5K in dividend stocks + $10K in rental property + online course business.",
        impact: { netWorth: -30000, savings: -150000, emotion: 1, knowledge: 4, risk: 2, clientBase: 0, skillLevel: 2 },
        consequences: {
          immediate: "Major asset reallocation but building income protection",
          shortTerm: "Reduced liquid savings but growing passive income",
          longTerm: "Health issues won't devastate income due to diversified streams"
        }
      },
      {
        id: "conservative_approach",
        label: "Conservative Financial Management",
        description: "Build $50K emergency fund. Reduce work gradually. Focus on health management and family financial security.",
        impact: { netWorth: 10000, savings: 50000, emotion: 2, knowledge: 1, risk: 1, clientBase: -1, skillLevel: 0 },
        consequences: {
          immediate: "Maximum financial security and health focus",
          shortTerm: "Large safety net but lower growth",
          longTerm: "Safe approach but inflation may erode purchasing power over time"
        }
      },
      {
        id: "business_systemization",
        label: "Systemize and Scale Business",
        description: "Invest $8K to systemize business. Hire team. Reduce personal dependence. Build business asset.",
        impact: { netWorth: -200000, savings: -800000, emotion: 0, knowledge: 5, risk: 3, clientBase: 2, skillLevel: 1 },
        consequences: {
          immediate: "High investment but building sustainable business systems",
          shortTerm: "Business becomes less dependent on personal capacity",
          longTerm: "Potential to maintain income even with reduced personal involvement"
        }
      }
    ],
    learningPoint: "Health scares remind freelancers of income vulnerability. Diversification and systemization become critical for sustainability."
  },

  {
    id: 13,
    title: "Next Generation Planning",
    description: "Age 42: Child's education will cost $50K in 12 years. Your income is stable but aging. Plan for next generation while securing your own future.",
    situation: "👨‍👩‍👧‍👦 NEXT GENERATION FINANCIAK PLANNING:\n\n🎓 EDUCATION COST PROJECTION:\n• Child's Current Age: 6 years\n• Target: Premium Engineering/Medical College\n• Cost Today: $25,00,000\n• Cost in 12 years: $50,00,000 (7% education inflation)\n• Monthly investment Required: $25,000 for 12 years (12% returns)\n\n💰 CURRENT FINANCIAK STATUS:\n• Monthly Income: $1,80,000 (stable but aging impact)\n• Current Investments: $35,00,000\n• Monthly Savings: $60,000\n• Age Factor: Skill relevance decreasing with technology changes\n\n🤔 COMPETING PRIORITIES:\n• Child's Education: $25,000/month\n• Own Retirement: $20,000/month (18 years left)\n• Health Care Reserve: $10,000/month\n• Current Lifestyle: $80,000/month\n• Total Required: $1,35,000 vs Available $1,20,000\n\n📊 STRATEGIC CHALLENGES:\n• Income may plateau or decline due to age\n• Technology disruption in freelance field\n• Health costs likely to increase\n• Need to balance current vs future needs",
    age: 42,
    monthlyIncome: 180000,
    context: "Freelancer journey milestone: Your decisions here will shape your long-term success trajectory and professional reputation.",
    options: [
      {
        id: "education_priority",
        label: "Child's Education Priority",
        description: "$30K monthly education fund + $15K retirement + reduce lifestyle to $65K. Sacrifice present for child's future.",
        impact: { netWorth: -100000, savings: -540000, emotion: 1, knowledge: 2, risk: 2, clientBase: 0, skillLevel: 0 },
        consequences: {
          immediate: "Lifestyle reduction but strong education planning",
          shortTerm: "Child's education fully secured but personal retirement stress",
          longTerm: "Child gets best education but may need to support parents later"
        }
      },
      {
        id: "balanced_planning",
        label: "Balanced Future Planning",
        description: "$20K education + $20K retirement + $80K lifestyle. Modest goals but balanced approach.",
        impact: { netWorth: 0, savings: -480000, emotion: 1, knowledge: 3, risk: 2, clientBase: 0, skillLevel: 0 },
        consequences: {
          immediate: "Balanced approach with moderate lifestyle impact",
          shortTerm: "Both goals progressing but may fall short of premium targets",
          longTerm: "Reasonable outcomes but child may need education loans"
        }
      },
      {
        id: "income_maximization",
        label: "Income Maximization Strategy",
        description: "Focus on increasing income to $2.5K through new skills/partnerships. Maintain current allocations until income grows.",
        impact: { netWorth: 50000, savings: -300000, emotion: 0, knowledge: 4, risk: 3, clientBase: 1, skillLevel: 3 },
        consequences: {
          immediate: "Investment in income growth but delayed financial planning",
          shortTerm: "Higher income enables all goals if successful",
          longTerm: "High-risk, high-reward - either achieves all goals or falls short on most"
        }
      }
    ],
    learningPoint: "Freelancer parents face unique challenges in balancing current income, retirement, and children's future. Income maximization often becomes necessary."
  },

  {
    id: 14,
    title: "Pre-Retirement Transition Planning",
    description: "Age 45: Younger freelancers charging 50% less. Your premium rates under pressure. Time to plan transition from active freelancing.",
    situation: "⚡ FREELANCE CAREER TRANSITION CROSSROADS:\n\n💼 MARKET REALITY CHECK:\n• Your Rate: $2,000/hour\n• New Freelancers: $1,000/hour for similar work\n• AI Tools: Automating 40% of your routine tasks\n• Client Feedback: 'Great work but expensive compared to others'\n• Energy Levels: Can't work 50+ hours/week anymore\n\n💰 FINANCIAK TRANSITION ANALYSIS:\n• Current Income: $1,50,000/month (declining)\n• Projected Income (next 5 years): $80,000-1,20,000/month\n• Required Expenses: $1,00,000/month\n• Retirement Corpus: $1.2 millions (insufficient for full retirement)\n• Years to 60: 15 years\n\n🎯 TRANSITION OPTIONS:\n• Consulting/Mentoring: Lower volume, higher value\n• Teaching/Training: Stable income, knowledge sharing\n• Passive Income Focus: Rental properties, investments\n• Business Sale/Partnership: Monetize 20 years of experience\n• Government/Corporate Jobs: Stable but lower freedom\n\n📊 REALITY CHECK:\n• Need $3-5 millions for comfortable retirement\n• Current trajectory: $2 millions maximum\n• Gap: $1-3 millions requiring strategic planning",
    age: 45,
    monthlyIncome: 150000,
    context: "Freelancer journey milestone: Your decisions here will shape your long-term success trajectory and professional reputation.",
    options: [
      {
        id: "premium_consultant",
        label: "Transform to Premium Consultant",
        description: "Reduce volume, increase rates to $5,000/hour. Focus on strategy consulting for enterprises. Build thought leadership.",
        impact: { netWorth: 100000, savings: -200000, emotion: 1, knowledge: 5, risk: 3, clientBase: -2, skillLevel: 4 },
        consequences: {
          immediate: "Income may drop initially but positioning for premium market",
          shortTerm: "Fewer clients but much higher value engagements",
          longTerm: "Potential to maintain high income longer with senior expertise"
        }
      },
      {
        id: "passive_income_focus",
        label: "Passive Income Acceleration",
        description: "Invest aggressively in rental properties and dividend stocks. Target $50K monthly passive income by 50.",
        impact: { netWorth: -500000, savings: -1000000, emotion: 0, knowledge: 3, risk: 3, clientBase: -1, skillLevel: 0 },
        consequences: {
          immediate: "Major capital deployment reducing liquid wealth",
          shortTerm: "Building income streams less dependent on personal effort",
          longTerm: "Sustainable retirement income from assets rather than active work"
        }
      },
      {
        id: "knowledge_monetization",
        label: "Knowledge Business Creation",
        description: "Create online courses, write book, build training business. Monetize 20 years of freelance experience.",
        impact: { netWorth: -200000, savings: -300000, emotion: 2, knowledge: 4, risk: 2, clientBase: 0, skillLevel: 2 },
        consequences: {
          immediate: "Time and money investment in content creation",
          shortTerm: "Scalable business with passive income potential",
          longTerm: "Knowledge business can generate income even in retirement"
        }
      }
    ],
    learningPoint: "Senior freelancers must transition from selling time to selling expertise, experience, and creating passive income streams."
  },

  {
    id: 15,
    title: "Freelancer FIRE Reality Check",
    description: "Age 50: 25 years of freelancing complete. Time for honest assessment - did the freelance path lead to financial freedom?",
    situation: "DYNAMIC_FIRE_ASSESSMENT_PLACEHOLDER",
    age: 50,
    monthlyIncome: 0,
    context: "DYNAMIC_FIRE_CONTEXT_PLACEHOLDER",
    options: [
      {
        id: "successful_fire",
        label: "Achieved Freelancer FIRE",
        description: "Built $5L+ monthly passive income. Continue freelancing by choice, not necessity. Mentor next generation.",
        impact: { netWorth: 0, savings: 0, emotion: 3, knowledge: 5, risk: 0, clientBase: 0, skillLevel: 5 },
        consequences: {
          immediate: "Complete financial freedom with flexible retirement options",
          shortTerm: "Can pursue passion projects and selective high-value work",
          longTerm: "Legacy building through mentoring and knowledge sharing"
        }
      },
      {
        id: "partial_fire",
        label: "Partial Financial Independence",
        description: "Need $50K monthly income to supplement passive income. Continue selective freelancing until 55-60.",
        impact: { netWorth: 0, savings: 0, emotion: 1, knowledge: 3, risk: 2, clientBase: 1, skillLevel: 3 },
        consequences: {
          immediate: "Good financial position but not complete independence",
          shortTerm: "Gradual transition to full retirement over next 5-10 years",
          longTerm: "Comfortable retirement achieved with some continued work"
        }
      },
      {
        id: "continued_work_needed",
        label: "Continued Work Required",
        description: "Must continue active freelancing until 60+. Financial goals not achieved but lifestyle maintained.",
        impact: { netWorth: 0, savings: 0, emotion: -1, knowledge: 2, risk: 3, clientBase: 2, skillLevel: 2 },
        consequences: {
          immediate: "Need continued income generation for financial security",
          shortTerm: "Work until traditional retirement age or longer",
          longTerm: "Traditional retirement approach with government benefits dependency"
        }
      }
    ],
    learningPoint: "Freelancer FIRE depends on disciplined savings, smart investments, and successful transition to passive income streams."
  }
];