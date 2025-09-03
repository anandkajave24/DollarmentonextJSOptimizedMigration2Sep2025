// Comprehensive Housewife Financial Journey - 15+ Stages
export interface HousewifeStageOption {
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
    independence: number;
    familyHappiness: number;
  };
  consequences: {
    immediate: string;
    shortTerm: string;
    longTerm: string;
  };
}

export interface HousewifeGameStage {
  id: number;
  title: string;
  description: string;
  situation: string;
  age: number;
  householdIncome: number;
  personalIncome: number;
  context: string;
  options: HousewifeStageOption[];
  learningPoint: string;
}

export const housewifeStages: HousewifeGameStage[] = [
  {
    id: 1,
    title: "Financial Invisibility vs Independence",
    description: "Age 26: Married 2 years. Husband earns ₹80K. You manage household but have no independent income or savings. Time to establish financial identity.",
    situation: "💰 HOUSEHOLD FINANCIAL REALITY:\n\n👨‍👩‍👧‍👦 CURRENT SITUATION:\n• Husband's Income: ₹80,000/month\n• Your Income: ₹0\n• Household Expenses: ₹60,000/month\n• Your Personal Expenses: ₹8,000/month (depends on husband)\n• Savings: In husband's name only\n• Financial Decisions: Husband makes all major decisions\n\n💭 DAILY REALITY:\n• Need permission for purchases above ₹1,000\n• No emergency money in your control\n• Friends working and financially independent\n• Social pressure: 'Focus on family, money isn't everything'\n• Inner conflict: Want independence vs family harmony\n\n🤔 AWAKENING MOMENT:\n• Friend's husband lost job - she had no access to money for 2 months\n• Mother-in-law's medical emergency - you couldn't contribute\n• Feeling financially vulnerable and dependent\n• Want to contribute to family finances but don't know how\n\nYour choice now will determine your financial future for the next 25 years. What's your approach?",
    age: 26,
    householdIncome: 80000,
    personalIncome: 0,
    context: "Recently married homemaker with no independent income. Financial awareness is dawning.",
    options: [
      {
        id: "financial_independence_path",
        label: "Pursue Financial Independence",
        description: "Start small online business (₹10K investment). Learn financial planning. Open separate savings account. Gradual independence building.",
        impact: { netWorth: 5000, savings: 10000, emotion: 2, knowledge: 4, risk: 2, independence: 4, familyHappiness: 0 },
        consequences: {
          immediate: "Initial resistance from family but personal empowerment begins",
          shortTerm: "Small income generation and financial knowledge building",
          longTerm: "Strong foundation for financial independence and family contribution"
        }
      },
      {
        id: "traditional_approach",
        label: "Traditional Family Focus",
        description: "Continue managing household efficiently. Support husband's career growth. Focus on family happiness over personal financial goals.",
        impact: { netWorth: 0, savings: 0, emotion: 1, knowledge: 0, risk: 0, independence: -1, familyHappiness: 3 },
        consequences: {
          immediate: "Family harmony maintained but personal growth limited",
          shortTerm: "Husband's career flourishes with full support",
          longTerm: "Comfortable lifestyle but complete financial dependence continues"
        }
      },
      {
        id: "education_investment",
        label: "Skill Development Focus",
        description: "Invest ₹25K in professional course. Build skills for future employment. Prepare for potential income generation.",
        impact: { netWorth: -15000, savings: -25000, emotion: 1, knowledge: 5, risk: 1, independence: 2, familyHappiness: 1 },
        consequences: {
          immediate: "Investment in self-development with family support needed",
          shortTerm: "Skill building creates future income opportunities",
          longTerm: "Strong foundation for professional re-entry when ready"
        }
      }
    ],
    learningPoint: "Financial independence doesn't mean neglecting family - it means strengthening your ability to contribute and protect your family."
  },

  {
    id: 2,
    title: "First Pregnancy Financial Planning",
    description: "Age 28: First pregnancy! Medical expenses, maternity items, future child costs. How to plan finances around motherhood?",
    situation: "🤱 PREGNANCY FINANCIAL PLANNING:\n\n👶 UPCOMING EXPENSES:\n• Prenatal Care: ₹50,000 (checkups, tests, vitamins)\n• Delivery: ₹1,20,000 (private hospital)\n• Baby Items: ₹80,000 (crib, clothes, feeding, etc.)\n• Post-delivery Care: ₹30,000 (confinement, nutrition)\n• Total Immediate: ₹2,80,000\n\n💰 FINANCIAL REALITY:\n• Household Income: ₹80,000/month\n• Current Savings: ₹1,50,000 (joint account)\n• Insurance: Basic health cover (₹2L limit)\n• Future Costs: Childcare, education, increased household expenses\n\n👨‍👩‍👧‍👦 FAMILY DYNAMICS:\n• In-laws want traditional expensive ceremonies\n• Husband focused on career, expects you to handle baby planning\n• Your parents offering financial help but with expectations\n• Friends sharing horror stories of financial stress with babies\n\n🤔 STRATEGIC DECISIONS:\n• Hospital choice: Government (₹20K) vs Private (₹1.2L)\n• Baby items: Essential only vs full comfort setup\n• Postnatal care: Family help vs professional help\n• Future income: When/how to restart earning after baby",
    age: 28,
    householdIncome: 80000,
    personalIncome: 5000,
    context: "DYNAMIC_CONTEXT_PLACEHOLDER",
    options: [
      {
        id: "comprehensive_planning",
        label: "Comprehensive Baby Financial Plan",
        description: "Budget delivery at ₹60K (good private hospital). Buy essentials only. Start child education fund with ₹2K monthly SIP.",
        impact: { netWorth: -80000, savings: -60000, emotion: 2, knowledge: 3, risk: 1, independence: 1, familyHappiness: 2 },
        consequences: {
          immediate: "Balanced approach to baby expenses with future planning",
          shortTerm: "Child's financial foundation established from birth",
          longTerm: "Strong financial planning sets example for family financial discipline"
        }
      },
      {
        id: "premium_approach",
        label: "Premium Baby Experience",
        description: "Best private hospital (₹1.2L). Complete baby setup (₹1.5L). Focus on comfort over cost. Use savings and family help.",
        impact: { netWorth: -200000, savings: -270000, emotion: 3, knowledge: 0, risk: 3, independence: -1, familyHappiness: 3 },
        consequences: {
          immediate: "Maximum comfort and family satisfaction but financial stress",
          shortTerm: "Depleted savings create vulnerability for future emergencies",
          longTerm: "Lifestyle inflation starts early - expensive patterns established"
        }
      },
      {
        id: "frugal_approach",
        label: "Frugal Smart Planning",
        description: "Government hospital with private room (₹30K). Second-hand/borrowed baby items. Start home-based income during pregnancy.",
        impact: { netWorth: 20000, savings: 50000, emotion: 0, knowledge: 2, risk: 2, independence: 3, familyHappiness: 0 },
        consequences: {
          immediate: "Financial prudence but potential family criticism",
          shortTerm: "Strong savings position for child's future needs",
          longTerm: "Financial discipline and income generation create strong foundation"
        }
      }
    ],
    learningPoint: "Pregnancy is the first major test of family financial planning. Early financial discipline benefits the child's entire future."
  },

  {
    id: 3,
    title: "Maternity Break Income Dilemma",
    description: "Age 29: Baby is 6 months old. Your small income stopped. Husband's salary alone feels insufficient. Restart work vs focus on baby?",
    situation: "👶 MATERNITY BREAK FINANCIAL REALITY:\n\n💰 INCOME GAP IMPACT:\n• Pre-baby Household Income: ₹85,000/month\n• Current Household Income: ₹80,000/month (husband only)\n• Increased Expenses: ₹25,000/month (baby, helper, medical)\n• Net Available: ₹55,000 vs previous ₹85,000\n• Financial Stress: Increasing monthly\n\n👶 CHILDCARE DILEMMA:\n• Baby needs constant attention\n• Mother-in-law available but has strong opinions about working mothers\n• Daycare options: ₹8,000-15,000/month\n• Helper cost: ₹6,000/month part-time\n• Your energy levels: 60% of pre-pregnancy\n\n💼 INCOME OPTIONS:\n• Resume online work: ₹15-20K/month (2-3 hours daily)\n• Part-time job: ₹25-30K/month (4-5 hours daily)\n• Wait until child is 2 years: Zero income for 18 more months\n• Home-based business: Uncertain income, flexible hours\n\n🤔 FAMILY PRESSURE:\n• Husband: 'Focus on baby now, we'll manage financially'\n• In-laws: 'Mother's place is with the child'\n• Your mother: 'Women today work too much, enjoy this time'\n• Financial reality: Monthly deficit of ₹20,000",
    age: 29,
    householdIncome: 80000,
    personalIncome: 0,
    context: "DYNAMIC_CONTEXT_PLACEHOLDER",
    options: [
      {
        id: "early_work_restart",
        label: "Strategic Work Restart",
        description: "Resume online work 3 hours daily when baby sleeps. Hire part-time helper. Balance income and childcare.",
        impact: { netWorth: 10000, savings: 0, emotion: 0, knowledge: 2, risk: 2, independence: 3, familyHappiness: -1 },
        consequences: {
          immediate: "Family disapproval but financial relief begins",
          shortTerm: "Income covers increased expenses and builds financial confidence",
          longTerm: "Continuous income stream prevents career gap and builds financial independence"
        }
      },
      {
        id: "full_focus_on_baby",
        label: "Complete Focus on Motherhood",
        description: "No income for 2 years. Full attention to baby development. Rely completely on husband's income and family support.",
        impact: { netWorth: -50000, savings: -240000, emotion: 2, knowledge: 0, risk: 3, independence: -2, familyHappiness: 3 },
        consequences: {
          immediate: "Family harmony and complete baby focus",
          shortTerm: "Financial stress increases but child gets maximum attention",
          longTerm: "2-year career gap makes re-entry difficult and financial dependence deepens"
        }
      },
      {
        id: "home_business_start",
        label: "Home-Based Business Launch",
        description: "Start home-based food/craft business. Flexible hours around baby. Initial investment ₹20K. Build slowly.",
        impact: { netWorth: -10000, savings: -20000, emotion: 1, knowledge: 3, risk: 3, independence: 4, familyHappiness: 1 },
        consequences: {
          immediate: "Investment required but entrepreneurial journey begins",
          shortTerm: "Flexible income generation with creative fulfillment",
          longTerm: "Business ownership potential for significant income and independence"
        }
      }
    ],
    learningPoint: "Maternity break decisions impact both immediate finances and long-term career prospects. Early restart, even part-time, prevents career gaps."
  },

  {
    id: 4,
    title: "Child Education vs Personal Career",
    description: "Age 32: Child is 3 years old. Good school admission needs ₹3L donation + ₹15K monthly fees. Your career vs child's education priority?",
    situation: "🎓 EDUCATION vs CAREER CROSSROADS:\n\n🏫 SCHOOL ADMISSION REALITY:\n• Premium School: ₹3,00,000 donation + ₹15,000/month fees\n• Good School: ₹1,00,000 donation + ₹8,000/month fees\n• Government School: ₹0 donation + ₹500/month fees\n• Peer Pressure: All friends choosing premium schools\n• Long-term Impact: School affects entire educational trajectory\n\n💰 FINANCIAL SITUATION:\n• Household Income: ₹1,00,000/month (husband's growth)\n• Your Income: ₹12,000/month (part-time work)\n• Current Savings: ₹1,50,000\n• Monthly Surplus: ₹25,000\n• Education Fund: ₹0 (should have started earlier)\n\n💼 YOUR CAREER OPPORTUNITY:\n• Full-time job offer: ₹35,000/month\n• Flexible work: ₹20,000/month\n• Career gap consequences: Harder to get good jobs later\n• Age factor: 32 is still good for career restart\n\n🤔 THE DILEMMA:\n• Premium school + your full-time work = financial stress but best opportunities\n• Good school + part-time work = balanced approach\n• Government school + focus on child = financial ease but educational compromise\n• Your career vs immediate child needs vs long-term family finances",
    age: 32,
    householdIncome: 100000,
    personalIncome: 12000,
    context: "DYNAMIC_CONTEXT_PLACEHOLDER",
    options: [
      {
        id: "premium_education_investment",
        label: "Premium Education Investment",
        description: "Choose premium school. Take education loan ₹2L. You work full-time ₹35K. Hire full-time help for child.",
        impact: { netWorth: -100000, savings: -300000, debt: 200000, emotion: 0, knowledge: 2, risk: 4, independence: 3, familyHappiness: 0 },
        consequences: {
          immediate: "High financial stress but best educational foundation for child",
          shortTerm: "Dual income covers education costs but family time reduced",
          longTerm: "Child gets premium education, your career grows, but debt stress for 5+ years"
        }
      },
      {
        id: "balanced_approach",
        label: "Balanced Education Strategy",
        description: "Choose good school. Use savings for donation. Part-time work ₹20K. Focus on child's overall development.",
        impact: { netWorth: -50000, savings: -100000, emotion: 1, knowledge: 2, risk: 2, independence: 2, familyHappiness: 2 },
        consequences: {
          immediate: "Manageable financial impact with decent educational choice",
          shortTerm: "Balanced approach allows focus on both career and child",
          longTerm: "Moderate outcomes on all fronts - good education, slow career growth"
        }
      },
      {
        id: "government_school_focus",
        label: "Government School + Home Education",
        description: "Government school + private tuitions. Focus on home education quality. Invest saved money in child's overall development.",
        impact: { netWorth: 100000, savings: 200000, emotion: -1, knowledge: 3, risk: 1, independence: 1, familyHappiness: 1 },
        consequences: {
          immediate: "Social pressure but strong financial position maintained",
          shortTerm: "More money available for child's holistic development and family financial security",
          longTerm: "Child's success depends more on parental involvement than school brand"
        }
      }
    ],
    learningPoint: "Education decisions have long-term impacts on both child and family finances. Quality of parental involvement often matters more than school brand."
  },

  {
    id: 5,
    title: "In-Laws Financial Dependence",
    description: "Age 35: Father-in-law retires without adequate pension. Mother-in-law needs surgery. They expect ₹20K monthly support from your family.",
    situation: "👴👵 ELDER CARE FINANCIAL RESPONSIBILITY:\n\n💰 IN-LAWS FINANCIAL CRISIS:\n• Father-in-law Pension: ₹8,000/month\n• Mother-in-law Medical: ₹12,000/month ongoing\n• Surgery Required: ₹2,50,000\n• Their Savings: ₹3,00,000 (insufficient)\n• Expected Support: ₹20,000/month from your family\n\n🏠 HOUSEHOLD IMPACT:\n• Current Household Income: ₹1,25,000 (husband ₹95K + you ₹30K)\n• Current Expenses: ₹90,000/month\n• Child Education: ₹8,000/month\n• Current Savings Rate: ₹25,000/month\n• With Elder Support: ₹5,000/month savings only\n\n👨‍👩‍👧‍👦 FAMILY DYNAMICS:\n• Husband feels obligated to support parents\n• Your parents also aging - will need support soon\n• Brother-in-law earns less, contributes ₹5,000/month only\n• Social expectation: Son should take care of parents\n• Your financial goals: Child's education fund, your retirement\n\n⚖️ ETHICAL DILEMMA:\n• Family duty vs financial security\n• Present elder care vs future child needs\n• Your career growth vs immediate family needs\n• Traditional values vs modern financial planning",
    age: 35,
    householdIncome: 125000,
    personalIncome: 30000,
    context: "DYNAMIC_CONTEXT_PLACEHOLDER",
    options: [
      {
        id: "full_elder_support",
        label: "Full Elder Care Responsibility",
        description: "₹20K monthly support + ₹2.5L surgery. Increase work hours to ₹45K. Compromise family time for financial responsibility.",
        impact: { netWorth: -150000, savings: -250000, emotion: 1, knowledge: 1, risk: 3, independence: 2, familyHappiness: 2 },
        consequences: {
          immediate: "Family harmony and elder care secured but financial stress",
          shortTerm: "Higher work hours strain family balance but financial obligations met",
          longTerm: "Delayed personal financial goals but strong family relationships"
        }
      },
      {
        id: "shared_responsibility",
        label: "Shared Family Responsibility",
        description: "₹12K monthly support + negotiate surgery cost sharing. Brother-in-law increases to ₹8K. Balanced approach.",
        impact: { netWorth: -75000, savings: -144000, emotion: 1, knowledge: 2, risk: 2, independence: 1, familyHappiness: 1 },
        consequences: {
          immediate: "Moderate financial impact with shared family responsibility",
          shortTerm: "Sustainable elder care with maintained personal financial goals",
          longTerm: "Balanced approach allows care for elders and personal financial security"
        }
      },
      {
        id: "minimal_support",
        label: "Minimal Financial Support",
        description: "₹8K monthly + help with government schemes/insurance. Focus on your family's financial security first.",
        impact: { netWorth: 0, savings: -96000, emotion: -1, knowledge: 3, risk: 1, independence: 2, familyHappiness: -1 },
        consequences: {
          immediate: "Family tension but personal financial security maintained",
          shortTerm: "Adequate elder support with strong personal financial position",
          longTerm: "Better positioned to handle future crises and own family needs"
        }
      }
    ],
    learningPoint: "Elder care is inevitable expense. Balanced approach with shared responsibility and government schemes often works better than bearing full burden."
  },

  {
    id: 6,
    title: "Career Peak Opportunity",
    description: "Age 38: Offered management position ₹60K/month but requires relocation to Bangalore. Husband supportive but it means disrupting family.",
    situation: "🚀 CAREER BREAKTHROUGH MOMENT:\n\n💼 JOB OFFER DETAILS:\n• Position: Marketing Manager\n• Salary: ₹60,000/month (vs current ₹30,000)\n• Location: Bangalore (relocation required)\n• Growth Potential: ₹1L+ in 2-3 years\n• Company: Reputed MNC with excellent culture\n• Benefits: Health insurance, learning opportunities\n\n🏠 RELOCATION IMPLICATIONS:\n• Husband's job: Will need to find new job in Bangalore\n• His current salary: ₹95,000 (risk of earning less initially)\n• Child's education: Change schools, adaptation challenges\n• In-laws: Will be 500km away, elder care difficult\n• Cost of living: 30% higher in Bangalore\n• Social support: No family/friends network\n\n💰 FINANCIAL ANALYSIS:\n• Combined current income: ₹1,25,000\n• Potential combined income: ₹1,40,000 (if husband finds ₹80K job)\n• Relocation costs: ₹2,00,000\n• Higher living costs: ₹15,000/month additional\n• Net benefit: Uncertain in short term, high in long term\n\n🤔 LIFE IMPACT:\n• Your career: Maximum growth opportunity at peak age\n• Family stability: Major disruption for uncertain outcomes\n• Child's development: New environment, opportunities\n• Marriage dynamics: Role reversal stress on husband",
    age: 38,
    householdIncome: 125000,
    personalIncome: 30000,
    context: "DYNAMIC_CONTEXT_PLACEHOLDER",
    options: [
      {
        id: "take_career_leap",
        label: "Accept Career Opportunity",
        description: "Accept job, relocate family to Bangalore. Husband searches for job there. Family adapts to new city and higher income potential.",
        impact: { netWorth: -100000, savings: -200000, emotion: 1, knowledge: 4, risk: 4, independence: 5, familyHappiness: -1 },
        consequences: {
          immediate: "Major life disruption but career advancement begins",
          shortTerm: "Financial stress during transition but potential for higher household income",
          longTerm: "Significant career growth enables much higher family income and opportunities"
        }
      },
      {
        id: "negotiate_remote",
        label: "Negotiate Remote Work",
        description: "Negotiate 50% remote work with ₹45K salary. Stay in current city. Travel to Bangalore 2 weeks/month.",
        impact: { netWorth: 25000, savings: 0, emotion: 1, knowledge: 3, risk: 2, independence: 3, familyHappiness: 1 },
        consequences: {
          immediate: "Compromise solution with moderate disruption",
          shortTerm: "Travel stress but family stability maintained",
          longTerm: "Good career growth with family security but not maximum potential"
        }
      },
      {
        id: "decline_opportunity",
        label: "Decline and Focus on Family",
        description: "Decline offer. Continue current job. Focus on family stability and local growth opportunities.",
        impact: { netWorth: 50000, savings: 100000, emotion: 0, knowledge: 1, risk: 1, independence: 1, familyHappiness: 2 },
        consequences: {
          immediate: "Family stability maintained but career growth limited",
          shortTerm: "Continued gradual growth with family harmony",
          longTerm: "May regret missing peak career opportunity, income plateau likely"
        }
      }
    ],
    learningPoint: "Peak career opportunities rarely come at convenient times. Long-term financial benefits often require short-term sacrifices and risks."
  },

  {
    id: 7,
    title: "Property Investment vs Child's Future",
    description: "Age 40: Have saved ₹8L. Property investment opportunity needs ₹5L down payment. Rental income ₹18K/month but it's child's education money.",
    situation: "🏠 PROPERTY INVESTMENT DILEMMA:\n\n🏡 INVESTMENT OPPORTUNITY:\n• Property Value: ₹35,00,000\n• Down Payment Required: ₹5,00,000\n• Home Loan: ₹30,00,000 (₹28,000 EMI for 15 years)\n• Rental Income: ₹18,000/month\n• Net Monthly Cash Flow: -₹10,000 initially\n• Appreciation Potential: 8-10% annually\n• Location: Developing area with good growth prospects\n\n💰 CURRENT FINANCIAL POSITION:\n• Total Savings: ₹8,00,000\n• Child Education Fund: ₹3,00,000 (target ₹15L by age 18)\n• Emergency Fund: ₹2,00,000\n• General Savings: ₹3,00,000\n• Monthly Surplus: ₹30,000\n\n🎓 CHILD'S EDUCATION TIMELINE:\n• Current Age: 11 years\n• College Entry: 7 years\n• Engineering College Cost: ₹15,00,000\n• Current Education Fund Gap: ₹12,00,000\n• Required Monthly SIP: ₹12,000 for 7 years\n\n⚖️ INVESTMENT vs EDUCATION:\n• Property: Long-term wealth building, passive income\n• Education Fund: Immediate goal, child's future\n• Using education money for investment: High risk\n• Missing property opportunity: Lost wealth building chance",
    age: 40,
    householdIncome: 145000,
    personalIncome: 50000,
    context: "DYNAMIC_CONTEXT_PLACEHOLDER",
    options: [
      {
        id: "property_investment",
        label: "Property Investment Priority",
        description: "Buy property with ₹5L down payment. Manage ₹10K monthly negative cash flow. Build long-term wealth through real estate.",
        impact: { netWorth: 100000, savings: -500000, debt: 3000000, emotion: 0, knowledge: 3, risk: 4, independence: 2, familyHappiness: -1 },
        consequences: {
          immediate: "Significant savings depletion but asset acquisition",
          shortTerm: "Monthly cash flow stress but property appreciation begins",
          longTerm: "Substantial wealth building if property appreciates as expected"
        }
      },
      {
        id: "education_fund_priority",
        label: "Child's Education Fund Priority",
        description: "Skip property investment. Invest ₹5L in equity mutual funds for child's education. Focus on securing child's future first.",
        impact: { netWorth: 50000, savings: -500000, emotion: 1, knowledge: 2, risk: 2, independence: 1, familyHappiness: 2 },
        consequences: {
          immediate: "Child's education security but missed property opportunity",
          shortTerm: "Education fund grows steadily with market returns",
          longTerm: "Child's education secured but missed real estate wealth building"
        }
      },
      {
        id: "hybrid_approach",
        label: "Partial Property Investment",
        description: "Negotiate ₹3L down payment for smaller property. Keep ₹5L for education fund. Balanced risk approach.",
        impact: { netWorth: 25000, savings: -300000, debt: 1500000, emotion: 1, knowledge: 3, risk: 3, independence: 1, familyHappiness: 1 },
        consequences: {
          immediate: "Moderate investment with maintained education security",
          shortTerm: "Balanced portfolio of property and education investments",
          longTerm: "Moderate wealth building with secured child's education"
        }
      }
    ],
    learningPoint: "Property investment can build wealth but timing matters. Child's education is non-negotiable priority that requires careful planning."
  },

  {
    id: 8,
    title: "Health Insurance Family Crisis",
    description: "Age 42: Husband diagnosed with diabetes. Premium health insurance needed. Current basic insurance insufficient for growing health risks.",
    situation: "🏥 FAMILY HEALTH INSURANCE CRISIS:\n\n💊 HEALTH DIAGNOSIS IMPACT:\n• Husband: Type 2 Diabetes (requires lifelong management)\n• Monthly Medication: ₹3,000\n• Quarterly Checkups: ₹5,000\n• Annual Health Screening: ₹15,000\n• Future Complications Risk: High\n• Current Insurance: ₹3L family floater (basic coverage)\n\n💰 INSURANCE UPGRADE OPTIONS:\n• Premium Plan (₹10L): ₹25,000 annual premium\n• Super Premium (₹25L): ₹45,000 annual premium\n• Critical Illness Add-on: ₹15,000 annual premium\n• Parents Coverage: ₹30,000 annual premium\n\n👨‍👩‍👧‍👦 FAMILY HEALTH REALITY:\n• Your Age: 42 (health risks increasing)\n• Child Age: 13 (generally healthy but accidents possible)\n• In-laws: Both above 65, multiple health issues\n• Family History: Diabetes, heart disease, hypertension\n• Lifestyle: Sedentary jobs, stress, poor eating habits\n\n📊 FINANCIAL IMPACT ANALYSIS:\n• Current Health Expenses: ₹8,000/month\n• Proposed Premium Health Insurance: ₹6,000/month\n• Total Health Budget: ₹14,000/month\n• Household Income: ₹1,45,000/month\n• Health Expenses as % of Income: 10% (ideal: 6-8%)\n\n⚠️ RISK vs COST DILEMMA:\n• Comprehensive coverage = High premiums but peace of mind\n• Basic coverage = Lower cost but high out-of-pocket risk\n• Self-insurance = Invest premium difference but full exposure",
    age: 42,
    householdIncome: 145000,
    personalIncome: 50000,
    context: "DYNAMIC_CONTEXT_PLACEHOLDER",
    options: [
      {
        id: "comprehensive_health_coverage",
        label: "Comprehensive Health Protection",
        description: "₹25L family + critical illness + parents coverage. Total premium ₹70K annually. Maximum health security.",
        impact: { netWorth: -20000, savings: -70000, emotion: 2, knowledge: 2, risk: -3, independence: 0, familyHappiness: 2 },
        consequences: {
          immediate: "High premium outgo but complete family health protection",
          shortTerm: "Peace of mind with comprehensive coverage for all health scenarios",
          longTerm: "Health expenses controlled, family wealth protected from medical emergencies"
        }
      },
      {
        id: "selective_coverage",
        label: "Strategic Health Coverage",
        description: "₹10L family + critical illness only. Focus on high-risk coverage. Parents create separate low-cost coverage.",
        impact: { netWorth: -10000, savings: -40000, emotion: 1, knowledge: 2, risk: -1, independence: 1, familyHappiness: 1 },
        consequences: {
          immediate: "Moderate premium with targeted protection",
          shortTerm: "Good coverage for major health risks with manageable costs",
          longTerm: "Balanced approach between protection and cost management"
        }
      },
      {
        id: "minimal_upgrade",
        label: "Minimal Insurance Upgrade",
        description: "Upgrade to ₹5L family floater only. Create ₹5L health emergency fund. Self-insurance approach for major expenses.",
        impact: { netWorth: 30000, savings: -15000, emotion: -1, knowledge: 1, risk: 2, independence: 1, familyHappiness: 0 },
        consequences: {
          immediate: "Lower premium but higher out-of-pocket risk",
          shortTerm: "Emergency fund grows but major health crisis exposure remains",
          longTerm: "Cost savings significant but one major illness could impact family finances"
        }
      }
    ],
    learningPoint: "Health insurance becomes critical as family ages. Comprehensive coverage is expensive but protects lifetime wealth from medical bankrupty."
  },

  {
    id: 9,
    title: "Child's Higher Education Funding",
    description: "Age 45: Child scored 85% in 12th. Engineering college admission secured but needs ₹15L over 4 years. Education loan vs savings decision.",
    situation: "🎓 ENGINEERING COLLEGE FUNDING CRISIS:\n\n📚 EDUCATION COST BREAKDOWN:\n• College Fees: ₹12,00,000 (4 years)\n• Hostel/Living: ₹2,40,000 (4 years)\n• Books/Laptop/Misc: ₹60,000\n• Total Required: ₹15,00,000\n• Payment Schedule: ₹3.75L annually\n\n💰 CURRENT FINANCIAL POSITION:\n• Education Fund: ₹8,00,000 (fell short of target)\n• Emergency Fund: ₹3,00,000\n• Other Investments: ₹12,00,000\n• Property: ₹15,00,000 (if sold)\n• Monthly Surplus: ₹25,000\n\n🏦 EDUCATION LOAN OPTIONS:\n• Government Banks: 9-10% interest, ₹10L max without collateral\n• Private Banks: 11-12% interest, faster processing\n• NBFC: 13-15% interest, flexible terms\n• Total Interest (10% for 4 years): ₹3,50,000 additional cost\n\n⚖️ FUNDING OPTIONS ANALYSIS:\n• Use all education fund + ₹7L loan = ₹3.5L interest cost\n• Sell property + education fund = No debt but lost rental income\n• Liquidate investments + loan = Missed investment growth\n• Full education loan = Maximum interest but preserved wealth\n\n🎯 STRATEGIC CONSIDERATIONS:\n• Child's career potential: Engineering = high ROI on education\n• Your retirement: 15 years away, need wealth preservation\n• Property market: Good time to sell or hold?\n• Investment markets: Bull market - bad time to liquidate?",
    age: 45,
    householdIncome: 155000,
    personalIncome: 60000,
    context: "DYNAMIC_CONTEXT_PLACEHOLDER",
    options: [
      {
        id: "mixed_funding_strategy",
        label: "Balanced Funding Approach",
        description: "Use ₹8L education fund + ₹7L education loan. Preserve other investments. Child shares loan responsibility after graduation.",
        impact: { netWorth: -200000, savings: -800000, debt: 700000, emotion: 1, knowledge: 3, risk: 2, independence: 1, familyHappiness: 1 },
        consequences: {
          immediate: "Education secured with moderate debt burden",
          shortTerm: "₹7L loan EMI manageable with dual income",
          longTerm: "Child's education completed, other investments preserved for retirement"
        }
      },
      {
        id: "property_liquidation",
        label: "Sell Property for Education",
        description: "Sell investment property for ₹18L. Fund complete education without any loans. Lose rental income but debt-free approach.",
        impact: { netWorth: 100000, savings: 300000, emotion: 2, knowledge: 2, risk: 1, independence: 0, familyHappiness: 2 },
        consequences: {
          immediate: "Complete education funding without debt stress",
          shortTerm: "No EMI burden but lost ₹18K monthly rental income",
          longTerm: "Child gets debt-free education start but family loses property asset"
        }
      },
      {
        id: "full_education_loan",
        label: "Maximum Education Loan",
        description: "Take ₹15L education loan. Preserve all savings and investments. Child responsible for full loan repayment after job.",
        impact: { netWorth: 100000, savings: 0, debt: 1500000, emotion: 0, knowledge: 2, risk: 3, independence: 2, familyHappiness: 0 },
        consequences: {
          immediate: "Family wealth preserved but maximum debt burden on child",
          shortTerm: "No immediate financial impact on family but child starts career with debt",
          longTerm: "Family retirement secure but child's early career financially constrained"
        }
      }
    ],
    learningPoint: "Education funding requires balance between child's future and family's financial security. Mixed funding often optimal."
  },

  {
    id: 10,
    title: "Parents' Health Crisis",
    description: "Age 47: Your mother needs heart surgery (₹8L). Father has no adequate insurance. Your financial vs family emotional responsibility conflict.",
    situation: "❤️ PARENTS' HEALTH EMERGENCY:\n\n🏥 MEDICAL CRISIS DETAILS:\n• Mother: Heart bypass surgery required (₹8,00,000)\n• Father: Diabetes complications, ongoing treatment (₹15,000/month)\n• Their Insurance: ₹2,00,000 (covers only 25% of surgery cost)\n• Their Savings: ₹1,50,000 (inadequate)\n• Urgency: Surgery needed within 2 weeks\n• Success Rate: 95% with good hospital, 70% with budget option\n\n💰 YOUR FINANCIAL SITUATION:\n• Liquid Savings: ₹5,00,000\n• Emergency Fund: ₹3,00,000\n• Investments: ₹15,00,000 (can liquidate partially)\n• Child's Education Loan: ₹5,00,000 outstanding\n• Monthly Household Expenses: ₹90,000\n• Monthly EMI: ₹40,000\n\n👨‍👩‍👧‍👦 FAMILY DYNAMICS:\n• Siblings: Brother contributes ₹2L, sister ₹50K (limited capacity)\n• Husband's Support: Willing to help but concerned about family's future\n• In-laws: Need support too, competition for resources\n• Social Pressure: 'Daughter should take care of parents'\n\n⚖️ EMOTIONAL vs FINANCIAL:\n• Emotional: Parents sacrificed for your education, now your turn\n• Financial: This expense affects your retirement and child's future\n• Medical: Best treatment vs affordable treatment quality difference\n• Family: Setting precedent for future medical expenses\n\n🎯 FUNDING OPTIONS:\n• Liquidate investments: ₹6L available\n• Personal loan: ₹3L at 12% interest\n• Medical loan: ₹5L at 14% interest\n• Family contribution: ₹2.5L total from siblings",
    age: 47,
    householdIncome: 165000,
    personalIncome: 70000,
    context: "DYNAMIC_CONTEXT_PLACEHOLDER",
    options: [
      {
        id: "full_medical_support",
        label: "Complete Medical Support",
        description: "Liquidate ₹6L investments + ₹2L medical loan. Best hospital treatment. Take full responsibility for parents' health.",
        impact: { netWorth: -400000, savings: -600000, debt: 200000, emotion: 3, knowledge: 1, risk: 3, independence: -1, familyHappiness: 2 },
        consequences: {
          immediate: "Parents get best treatment, family harmony maintained",
          shortTerm: "Significant wealth depletion but parents' health secured",
          longTerm: "Retirement planning delayed but strong family relationships and clear conscience"
        }
      },
      {
        id: "shared_responsibility",
        label: "Shared Family Responsibility",
        description: "Contribute ₹4L from savings. Siblings increase contribution. Choose good hospital (₹6L total cost). Balanced approach.",
        impact: { netWorth: -200000, savings: -400000, emotion: 2, knowledge: 2, risk: 2, independence: 0, familyHappiness: 1 },
        consequences: {
          immediate: "Good treatment secured with manageable financial impact",
          shortTerm: "Family shares responsibility, moderate wealth impact",
          longTerm: "Sustainable approach maintaining both family relationships and financial security"
        }
      },
      {
        id: "limited_support",
        label: "Insurance + Limited Support",
        description: "Use insurance ₹2L + contribute ₹2L. Government hospital with private room. Focus on family's financial security.",
        impact: { netWorth: -100000, savings: -200000, emotion: 0, knowledge: 2, risk: 1, independence: 1, familyHappiness: -1 },
        consequences: {
          immediate: "Family financial security preserved but potential guilt and relationship strain",
          shortTerm: "Parents get adequate treatment, family finances protected",
          longTerm: "Strong financial position but possible regret about not doing more for parents"
        }
      }
    ],
    learningPoint: "Parents' health crises test family values vs financial planning. Balanced approach with shared responsibility often works best."
  },

  {
    id: 11,
    title: "Peak Career vs Family Balance",
    description: "Age 49: Promoted to senior management ₹1L/month. Requires extensive travel and 60+ hour weeks. Peak earning years vs family time.",
    situation: "🚀 CAREER PEAK MOMENT:\n\n💼 PROMOTION DETAILS:\n• Position: Senior Manager\n• Salary: ₹1,00,000/month (vs current ₹70,000)\n• Responsibilities: Regional team management\n• Travel: 15 days/month average\n• Work Hours: 60+ hours/week\n• Pressure: High-performance culture\n• Growth: Potential Director role in 3-4 years (₹1.5L+)\n\n👨‍👩‍👧‍👦 FAMILY SITUATION:\n• Child: 20 years, final year engineering, needs emotional support\n• Husband: 51 years, stable but not growing career\n• Parents: 72 & 69, need increasing care and attention\n• In-laws: Expecting more support as you earn more\n• Your Age: 49 - peak earning years, limited time left\n\n💰 FINANCIAL IMPLICATIONS:\n• Additional Income: ₹30,000/month\n• Travel Expenses: ₹8,000/month\n• Household Help: ₹6,000/month (due to your absence)\n• Net Additional Income: ₹16,000/month\n• Opportunity Cost: Missing family moments during final child years at home\n\n⚖️ LIFE BALANCE ASSESSMENT:\n• Career: Peak opportunity with limited future chances\n• Family: Critical phase - child's career start, parents aging\n• Health: Stress levels high, work-life balance poor\n• Marriage: Strain from extensive travel and work pressure\n• Personal: Identity beyond just family roles vs career fulfillment\n\n🤔 LONG-TERM IMPACT:\n• Accept: Higher income, career peak, but family sacrifices\n• Decline: Family stability, but career growth plateau\n• Negotiate: Partial travel, moderate growth, balanced approach",
    age: 49,
    householdIncome: 165000,
    personalIncome: 70000,
    context: "DYNAMIC_CONTEXT_PLACEHOLDER",
    options: [
      {
        id: "accept_peak_career",
        label: "Accept Career Peak Challenge",
        description: "Accept promotion with full responsibilities. Peak earning years priority. Family adjusts to your career demands.",
        impact: { netWorth: 100000, savings: 360000, emotion: 1, knowledge: 4, risk: 3, independence: 5, familyHappiness: -2 },
        consequences: {
          immediate: "Significant income boost but family time reduction",
          shortTerm: "Career reaches peak, financial security maximized",
          longTerm: "Maximum lifetime earnings achieved but potential family relationship strain"
        }
      },
      {
        id: "negotiate_balance",
        label: "Negotiate Balanced Role",
        description: "Accept promotion with 50% travel and ₹85K salary. Balanced approach maintaining family priorities.",
        impact: { netWorth: 50000, savings: 180000, emotion: 2, knowledge: 3, risk: 2, independence: 3, familyHappiness: 1 },
        consequences: {
          immediate: "Good income increase with manageable family impact",
          shortTerm: "Career growth with maintained family relationships",
          longTerm: "Balanced life satisfaction with good financial and family outcomes"
        }
      },
      {
        id: "family_priority",
        label: "Decline - Family Priority",
        description: "Decline promotion. Continue current role. Focus on family during critical transition years.",
        impact: { netWorth: 25000, savings: 0, emotion: 3, knowledge: 1, risk: 1, independence: 1, familyHappiness: 3 },
        consequences: {
          immediate: "Career growth missed but family harmony maintained",
          shortTerm: "Present for family milestones and elder care needs",
          longTerm: "May regret missing peak career opportunity, but strong family relationships"
        }
      }
    ],
    learningPoint: "Peak career opportunities come at inconvenient times. The choice depends on personal values and family life stage priorities."
  },

  {
    id: 12,
    title: "Empty Nest Financial Transition",
    description: "Age 52: Child started working in Bangalore (₹8L package). House feels empty. Time to refocus on personal financial goals and retirement planning.",
    situation: "🏠 EMPTY NEST TRANSITION:\n\n👨‍👩‍👧‍👦 FAMILY TRANSITION:\n• Child: Employed engineer in Bangalore, ₹8L package\n• Child's Independence: Financially self-sufficient\n• House: Feels empty, reduced daily expenses\n• Relationship: Marriage dynamics changing after 26 years of parenting\n• Identity: Who are you beyond 'mother' role?\n• Purpose: What drives you now that primary parenting is complete?\n\n💰 FINANCIAL FREEDOM MOMENT:\n• Reduced Expenses: ₹25,000/month less (child's expenses)\n• Increased Savings Potential: ₹45,000/month\n• Years to Retirement: 8 years\n• Current Retirement Corpus: ₹35,00,000\n• Required Retirement Corpus: ₹2,00,00,000\n• Gap: ₹1,65,00,000 in 8 years\n• Required Monthly Investment: ₹1,30,000 (impossible with current income)\n\n🎯 LIFE REDESIGN OPTIONS:\n• Career Acceleration: Final push for maximum earnings\n• Entrepreneurship: Start business with accumulated experience\n• Investment Focus: Aggressive wealth building for 8 years\n• Lifestyle Design: Travel, hobbies, personal fulfillment\n• Social Impact: Teaching, mentoring, social work\n\n📊 RETIREMENT REALITY CHECK:\n• Current Lifestyle Cost: ₹80,000/month\n• Inflation-adjusted (age 60): ₹1,20,000/month\n• Required Corpus for ₹1.2L monthly: ₹3,00,00,000\n• Current trajectory: ₹60,00,000 by age 60\n• Retirement Gap: Significant shortfall without dramatic action",
    age: 52,
    householdIncome: 195000,
    personalIncome: 100000,
    context: "DYNAMIC_CONTEXT_PLACEHOLDER",
    options: [
      {
        id: "aggressive_retirement_planning",
        label: "Aggressive Retirement Acceleration",
        description: "Save ₹80K monthly for 8 years. Reduce lifestyle to ₹50K. Work until 60. Achieve ₹1.5-2Cr retirement corpus.",
        impact: { netWorth: 200000, savings: -960000, emotion: 0, knowledge: 3, risk: 2, independence: 3, familyHappiness: 0 },
        consequences: {
          immediate: "Extreme lifestyle reduction but maximum retirement focus",
          shortTerm: "High savings rate builds substantial retirement corpus",
          longTerm: "Comfortable retirement achieved but 8 years of frugal living"
        }
      },
      {
        id: "entrepreneurship_venture",
        label: "Start Entrepreneurship Venture",
        description: "Invest ₹10L in business venture. Potential for ₹2-5L monthly income. High risk, high reward approach.",
        impact: { netWorth: -500000, savings: -1000000, emotion: 2, knowledge: 5, risk: 5, independence: 5, familyHappiness: 1 },
        consequences: {
          immediate: "Major financial risk but potential for exponential growth",
          shortTerm: "Business building phase with uncertain income",
          longTerm: "Either achieves financial independence early or faces retirement shortfall"
        }
      },
      {
        id: "balanced_transition",
        label: "Balanced Life Transition",
        description: "Save ₹40K monthly. Focus on health, relationships, and gradual retirement planning. Work until 62-65.",
        impact: { netWorth: 100000, savings: -480000, emotion: 2, knowledge: 2, risk: 2, independence: 2, familyHappiness: 2 },
        consequences: {
          immediate: "Balanced approach with lifestyle enjoyment",
          shortTerm: "Moderate retirement corpus building with life satisfaction",
          longTerm: "Comfortable but not luxurious retirement, work a few extra years"
        }
      }
    ],
    learningPoint: "Empty nest syndrome offers opportunity for financial acceleration. Late career decisions significantly impact retirement quality."
  },

  {
    id: 13,
    title: "Aging Parents' Full-Time Care",
    description: "Age 54: Both parents need full-time care. Mother has dementia, father mobility issues. Caregiver costs ₹25K/month or take care personally.",
    situation: "👴👵 AGING PARENTS CARE CRISIS:\n\n🏥 PARENTS' HEALTH STATUS:\n• Mother: Dementia progression, needs 24/7 supervision\n• Father: Post-stroke mobility issues, semi-dependent\n• Medical Expenses: ₹20,000/month\n• Caregiver Cost: ₹25,000/month for professional care\n• Home Modifications: ₹1,50,000 (ramps, safety features)\n• Equipment: Wheelchair, hospital bed, etc. (₹50,000)\n\n💼 YOUR CAREER SITUATION:\n• Current Income: ₹1,00,000/month\n• Career Peak: 6 years to retirement\n• Work From Home: Possible 3 days/week\n• Leave Without Pay: Option for extended care\n• Resignation: Would lose ₹60,00,000 in final 6 years\n\n👨‍👩‍👧‍👦 FAMILY IMPACT:\n• Siblings: Brother contributes ₹10K/month, lives far\n• Husband: Supportive but concerned about retirement planning\n• Your Health: Caregiver stress, physical and mental exhaustion\n• Social Life: Complete isolation if you become primary caregiver\n• Marriage: Strain from caregiving responsibilities\n\n💰 FINANCIAL IMPLICATIONS:\n• Professional Care: ₹45,000/month total cost\n• Personal Care: Lost income ₹60,00,000 + ₹20,000 medical\n• Part-time Work: ₹50,000/month income + ₹25,000 care cost\n• Quality of Care: Professional vs emotional but amateur care\n\n⚖️ ETHICAL DILEMMA:\n• Professional care: Better quality but expensive and emotionally distant\n• Personal care: Emotional connection but quality concerns and life sacrifice\n• Shared care: Family rotation but coordination challenges",
    age: 54,
    householdIncome: 195000,
    personalIncome: 100000,
    context: "DYNAMIC_CONTEXT_PLACEHOLDER",
    options: [
      {
        id: "professional_care",
        label: "Professional Care + Continue Career",
        description: "Hire professional caregivers ₹25K/month. Continue working for retirement planning. Visit daily and manage care.",
        impact: { netWorth: 200000, savings: -300000, emotion: 0, knowledge: 2, risk: 2, independence: 2, familyHappiness: 0 },
        consequences: {
          immediate: "Professional care quality with career continuity",
          shortTerm: "High care costs but maintained retirement planning",
          longTerm: "Parents get good care, retirement corpus preserved, but potential guilt"
        }
      },
      {
        id: "personal_caregiving",
        label: "Become Primary Caregiver",
        description: "Resign from job. Provide personal care to parents. Sacrifice career and retirement for family duty.",
        impact: { netWorth: -500000, savings: -6000000, emotion: 2, knowledge: 0, risk: 4, independence: -2, familyHappiness: 1 },
        consequences: {
          immediate: "Complete family focus but massive income loss",
          shortTerm: "Personal care provides emotional satisfaction but financial stress",
          longTerm: "Parents get loving care but retirement security severely compromised"
        }
      },
      {
        id: "hybrid_care_model",
        label: "Hybrid Care Approach",
        description: "Part-time work (₹50K income) + part-time caregiver (₹15K). Shared care model with family involvement.",
        impact: { netWorth: -100000, savings: -2100000, emotion: 1, knowledge: 2, risk: 3, independence: 0, familyHappiness: 1 },
        consequences: {
          immediate: "Balanced approach with moderate sacrifices on all fronts",
          shortTerm: "Manageable care costs with reduced but continuing income",
          longTerm: "Reasonable care quality, moderate retirement impact, sustainable approach"
        }
      }
    ],
    learningPoint: "Elder care is often the biggest financial challenge for women. Hybrid approaches often provide better outcomes than extreme choices."
  },

  {
    id: 14,
    title: "Pre-Retirement Health Scare",
    description: "Age 57: Diagnosed with breast cancer. Treatment will cost ₹5L over 2 years. Early retirement vs continue working decision.",
    situation: "💗 HEALTH CRISIS AT PRE-RETIREMENT:\n\n🏥 MEDICAL DIAGNOSIS:\n• Condition: Early-stage breast cancer\n• Treatment Plan: Surgery + chemotherapy + radiation (2 years)\n• Total Cost: ₹5,00,000\n• Insurance Coverage: ₹3,00,000 (₹2L out of pocket)\n• Survival Rate: 95% with proper treatment\n• Work Capacity: 50% during treatment\n• Recovery Timeline: 6 months post-treatment\n\n💼 CAREER IMPLICATIONS:\n• Current Income: ₹1,00,000/month\n• Years to Retirement: 3 years\n• Total Remaining Earnings: ₹36,00,000\n• During Treatment: Part-time ₹40,000/month\n• Medical Leave: Unpaid after 3 months\n• Career Impact: Likely end of growth opportunities\n\n💰 FINANCIAL POSITION:\n• Retirement Corpus: ₹80,00,000\n• Emergency Fund: ₹5,00,000\n• Monthly Expenses: ₹80,000\n• Husband's Income: ₹95,000/month\n• Insurance Claims: ₹3,00,000 available\n• Liquid Savings: ₹8,00,000\n\n⚖️ TREATMENT vs CAREER:\n• Aggressive Treatment + Work: High stress, slower recovery\n• Treatment + Early Retirement: Better healing but income loss\n• Minimal Treatment + Work: High risk but financial security\n• Family Support: Husband willing to support early retirement\n\n🎯 LIFE PRIORITIES REASSESSMENT:\n• Health: Primary priority for treatment success\n• Financial Security: 3 years of income significant for retirement\n• Quality of Life: Stress during treatment affects recovery\n• Family Time: Potential last years - how to spend them?",
    age: 57,
    householdIncome: 195000,
    personalIncome: 100000,
    context: "DYNAMIC_CONTEXT_PLACEHOLDER",
    options: [
      {
        id: "health_first_retirement",
        label: "Early Retirement for Health",
        description: "Take early retirement. Focus completely on treatment and recovery. Husband's income covers expenses.",
        impact: { netWorth: -200000, savings: -3600000, emotion: 2, knowledge: 1, risk: 2, independence: -1, familyHappiness: 2 },
        consequences: {
          immediate: "Complete health focus with reduced financial stress during treatment",
          shortTerm: "Better treatment outcomes and recovery with family support",
          longTerm: "Retirement corpus lower but health and life quality prioritized"
        }
      },
      {
        id: "work_through_treatment",
        label: "Continue Working During Treatment",
        description: "Part-time work during treatment. Maximize final 3 years earnings. Balance health and financial goals.",
        impact: { netWorth: 100000, savings: -1200000, emotion: 0, knowledge: 2, risk: 3, independence: 1, familyHappiness: 0 },
        consequences: {
          immediate: "Higher stress but continued income during treatment",
          shortTerm: "Treatment progress may be slower due to work stress",
          longTerm: "Better retirement corpus but potential health complications from stress"
        }
      },
      {
        id: "treatment_first_gradual_return",
        label: "Treatment Focus + Gradual Return",
        description: "6 months full treatment focus, then gradual return to work. Extended career to 62 to make up for lost time.",
        impact: { netWorth: 0, savings: -600000, emotion: 1, knowledge: 2, risk: 2, independence: 1, familyHappiness: 1 },
        consequences: {
          immediate: "Optimal treatment conditions with planned financial recovery",
          shortTerm: "Recovery-focused approach with future income planning",
          longTerm: "Extended working years but better health outcomes and adequate retirement corpus"
        }
      }
    ],
    learningPoint: "Health crises near retirement require careful balance of treatment, financial security, and life quality priorities."
  },

  {
    id: 15,
    title: "Housewife FIRE Reality Check",
    description: "Age 60: 34 years of marriage, raised successful child, supported family. Time for honest assessment - did balancing family and finances lead to your own financial security?",
    situation: "DYNAMIC_FIRE_ASSESSMENT_PLACEHOLDER",
    age: 60,
    householdIncome: 95000,
    personalIncome: 0,
    context: "DYNAMIC_FIRE_CONTEXT_PLACEHOLDER",
    options: [
      {
        id: "achieved_security",
        label: "Achieved Balanced Financial Security",
        description: "Built ₹1.5-2Cr corpus through balanced approach. Independent income + family support. Comfortable retirement assured.",
        impact: { netWorth: 0, savings: 0, emotion: 3, knowledge: 4, risk: 1, independence: 3, familyHappiness: 3 },
        consequences: {
          immediate: "Financial security with strong family relationships",
          shortTerm: "Comfortable retirement with family support and personal independence",
          longTerm: "Model for other women balancing family and financial independence"
        }
      },
      {
        id: "family_dependent",
        label: "Family-Dependent Security",
        description: "Prioritized family over personal finances. Comfortable through husband's earnings and child's support but limited personal wealth.",
        impact: { netWorth: 0, savings: 0, emotion: 2, knowledge: 2, risk: 2, independence: 1, familyHappiness: 3 },
        consequences: {
          immediate: "Family harmony and support but limited personal financial control",
          shortTerm: "Dependent on family for financial security",
          longTerm: "Comfortable life but vulnerability if family circumstances change"
        }
      },
      {
        id: "independent_achiever",
        label: "Independent Financial Success",
        description: "Built significant personal wealth through career and smart investments. Financially independent with strong family relationships.",
        impact: { netWorth: 0, savings: 0, emotion: 2, knowledge: 5, risk: 1, independence: 5, familyHappiness: 2 },
        consequences: {
          immediate: "Complete financial independence with career satisfaction",
          shortTerm: "Personal wealth provides options and security",
          longTerm: "Role model for financial independence while maintaining family relationships"
        }
      }
    ],
    learningPoint: "Housewife FIRE is about balancing family responsibilities with personal financial security. Success is measured by both family happiness and financial independence."
  }
];