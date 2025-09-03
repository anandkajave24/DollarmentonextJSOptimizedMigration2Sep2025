// Working Parent Financial Journey - 15 Stages
export interface WorkingParentStageOption {
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
    familyStability: number;
    careerGrowth: number;
  };
  consequences: {
    immediate: string;
    shortTerm: string;
    longTerm: string;
  };
}

export interface WorkingParentGameStage {
  id: number;
  title: string;
  description: string;
  situation: string;
  age: number;
  monthlyIncome: number;
  context: string;
  options: WorkingParentStageOption[];
  learningPoint: string;
}

export const workingParentStages: WorkingParentGameStage[] = [
  {
    id: 1,
    title: "First Child Arrival Financial Reality",
    description: "Age 28: New baby arrives. Childcare costs $1.2K/month. Spouse considering career break. Financial priorities shift dramatically.",
    situation: "👶 NEW PARENT FINANCIAL SHOCK\n\n💼 CURRENT SITUATION:\nAge 28 • New baby arrives • Childcare costs $1.2K/month\nSpouse considering career break • Financial priorities shift dramatically\n\n💰 IMMEDIATE COST REALITY:\n• Childcare: $1,200/month (daycare)\n• Medical Bills: $3,000 (delivery and initial care)\n• Baby Supplies: $500/month (diapers, formula, clothes)\n• Lost Income Risk: Spouse considering 6-month break\n  ($4,000/month loss)\n• Current Combined Income: $9,000/month\n\n🏠 HOUSING PRESSURE:\n• Current Rent: $1,800 (1-bedroom apartment)\n• Need Larger Space: $2,400 (2-bedroom)\n• Security Deposit: $3,600 required\n• Moving Costs: $1,500\n\n⚡ KEY DECISION:\nDual careers + high childcare costs\nOR\nSingle income + stay-at-home parent",
    age: 28,
    monthlyIncome: 9000,
    context: "New parent reality check: Balancing career advancement, childcare costs, and family financial security requires strategic decision-making.",
    options: [
      {
        id: "dual_career_premium",
        label: "Dual Career + Premium Childcare",
        description: "Both parents work full-time. Premium daycare + nanny backup. Upgrade to 2-bedroom apartment.",
        impact: { netWorth: -5000, savings: -3600, debt: 2000, emotion: 0, knowledge: 2, risk: 2, familyStability: 1, careerGrowth: 2 },
        consequences: {
          immediate: "High costs but maintained career trajectories for both parents",
          shortTerm: "Financial strain but professional growth continues",
          longTerm: "Strong earning potential but high ongoing childcare expenses"
        }
      },
      {
        id: "single_income_family",
        label: "Single Income + Stay-at-Home Parent",
        description: "One parent takes career break. No childcare costs. Stay in current apartment to save money.",
        impact: { netWorth: -2000, savings: 1000, emotion: 1, knowledge: 1, risk: 3, familyStability: 2, careerGrowth: -2 },
        consequences: {
          immediate: "Reduced income but eliminated childcare costs",
          shortTerm: "Tight budget but strong family bonding",
          longTerm: "Career gap challenges but potential long-term family benefits"
        }
      },
      {
        id: "flexible_compromise",
        label: "Flexible Work + Family Support",
        description: "Negotiate remote/flexible schedules. Mix of family help and part-time daycare. Modest housing upgrade.",
        impact: { netWorth: -2500, savings: -1800, emotion: 2, knowledge: 3, risk: 2, familyStability: 2, careerGrowth: 0 },
        consequences: {
          immediate: "Balanced approach with moderate costs",
          shortTerm: "Flexible arrangement requires ongoing coordination",
          longTerm: "Sustainable work-life integration with gradual career growth"
        }
      }
    ],
    learningPoint: "New parent financial planning requires balancing immediate costs, career impacts, and long-term family financial security."
  },

  {
    id: 2,
    title: "Emergency Fund vs College Savings",
    description: "Age 30: $8K emergency fund exists. Experts say start college savings now. Which financial priority comes first?",
    situation: "🎓 EMERGENCY FUND VS COLLEGE SAVINGS\n\n💰 YOUR SITUATION:\nChild age 2 • $600/month surplus after expenses\nEmergency fund: $8K (only 1.5 months coverage)\nCollege projected cost: $150K in 16 years\n\n⚡ THE DILEMMA:\n• Emergency Fund: Need $18K (experts say 3-6 months)\n• College 529: Start now = $200/month × 16 years = $65K\n• Only $600/month available for both goals\n\n💡 TIME VS SECURITY:\nStart college savings now for compound growth\nOR\nBuild emergency fund first for financial security",
    age: 30,
    monthlyIncome: 9500,
    context: "Working parent dilemma: Balancing immediate financial security vs long-term education planning for children.",
    options: [
      {
        id: "emergency_fund_first",
        label: "Complete Emergency Fund First",
        description: "$600/month to emergency fund until $18K reached, then shift to college savings. Security-first approach.",
        impact: { netWorth: 1500, savings: 7200, emotion: 2, knowledge: 2, risk: 1, familyStability: 2, careerGrowth: 0 },
        consequences: {
          immediate: "Strong financial security but delayed college savings",
          shortTerm: "Peace of mind with full emergency coverage",
          longTerm: "Later start on college savings means higher monthly contributions needed"
        }
      },
      {
        id: "college_savings_priority",
        label: "Start College Savings Immediately",
        description: "$400 college savings + $200 emergency fund. Prioritize time value of money for education.",
        impact: { netWorth: 2000, savings: 2400, emotion: 0, knowledge: 3, risk: 3, familyStability: 1, careerGrowth: 0 },
        consequences: {
          immediate: "Maximizing college savings growth potential",
          shortTerm: "Lower emergency cushion creates financial risk",
          longTerm: "Strong college fund but potential emergency vulnerability"
        }
      },
      {
        id: "balanced_approach",
        label: "Split Strategy",
        description: "$300 emergency fund + $300 college savings. Balanced growth in both priorities simultaneously.",
        impact: { netWorth: 1800, savings: 3600, emotion: 1, knowledge: 3, risk: 2, familyStability: 1, careerGrowth: 0 },
        consequences: {
          immediate: "Progress on both fronts but slower individual goal achievement",
          shortTerm: "Moderate security with growing college fund",
          longTerm: "Balanced approach provides flexibility but may require future adjustments"
        }
      }
    ],
    learningPoint: "Working parents must prioritize between immediate financial security and long-term educational planning. There's no single right answer."
  },

  {
    id: 3,
    title: "Career Advancement vs Family Time",
    description: "Age 32: Promotion offer with $2K raise but 60-hour weeks. Young kids need attention. Career vs family balance decision.",
    situation: "🚀 CAREER ADVANCEMENT CROSSROADS:\n\n💼 PROMOTION OPPORTUNITY:\n• New Role: Senior Manager position\n• Salary Increase: $2,000/month ($24K annually)\n• Work Requirements: 60+ hours/week, frequent travel\n• Current Schedule: 45 hours/week, minimal travel\n• Career Impact: Fast track to executive level\n\n👨‍👩‍👧‍👦 FAMILY IMPACT ANALYSIS:\n• Children Ages: 4 and 2 years old\n• Current Family Time: Evenings and weekends available\n• New Schedule Impact: Miss bedtimes, weekend work\n• Spouse Workload: Increased solo parenting responsibility\n• Childcare Needs: Additional evening/weekend care\n\n💰 FINANCIAL COMPARISON:\n• Additional Income: $2,000/month\n• Extra Childcare Costs: $600/month (extended hours)\n• Net Financial Gain: $1,400/month\n• Long-term Career Trajectory: 2-3x faster advancement\n\n⚖️ WORK-LIFE BALANCE FACTORS:\n• Career Window: Prime years for advancement\n• Family Development: Critical bonding years\n• Stress Impact: Both personal and family\n• Future Flexibility: Senior role may offer more options later",
    age: 32,
    monthlyIncome: 10500,
    context: "Peak career advancement opportunity conflicts with family priority years. Long-term career trajectory vs present family involvement.",
    options: [
      {
        id: "take_promotion",
        label: "Accept Promotion",
        description: "Take senior role with increased salary and responsibilities. Invest extra income in family's future financial security.",
        impact: { netWorth: 5000, savings: 16800, emotion: -1, knowledge: 3, risk: 2, familyStability: -1, careerGrowth: 4 },
        consequences: {
          immediate: "Significant income boost but reduced family time",
          shortTerm: "Career advancement accelerates but family stress increases",
          longTerm: "Strong financial position and executive career track but potential family relationship impacts"
        }
      },
      {
        id: "decline_promotion",
        label: "Decline for Family Focus",
        description: "Maintain current role and schedule. Prioritize family time during children's early development years.",
        impact: { netWorth: 1000, savings: 3600, emotion: 2, knowledge: 1, risk: 1, familyStability: 3, careerGrowth: -1 },
        consequences: {
          immediate: "Maintained work-life balance and family involvement",
          shortTerm: "Slower financial growth but strong family relationships",
          longTerm: "May miss prime career advancement window but strong family foundation"
        }
      },
      {
        id: "negotiate_terms",
        label: "Negotiate Flexible Promotion",
        description: "Counter-offer: Accept role with partial remote work and limited travel. Compromise solution.",
        impact: { netWorth: 3500, savings: 12000, emotion: 1, knowledge: 3, risk: 2, familyStability: 1, careerGrowth: 2 },
        consequences: {
          immediate: "Partial salary increase with maintained family access",
          shortTerm: "Balanced advancement with manageable family impact",
          longTerm: "Moderate career growth with preserved family relationships"
        }
      }
    ],
    learningPoint: "Career advancement decisions have long-term implications for both financial security and family relationships. Consider total life impact, not just income."
  },

  {
    id: 4,
    title: "Second Child Financial Planning",
    description: "Age 34: Considering second child. Current expenses: $2.8K childcare. Double costs vs economies of scale decision.",
    situation: "👶👧 EXPANDING FAMILY FINANCIAL ANALYSIS:\n\n💰 CURRENT FAMILY COSTS:\n• First Child (Age 6): $1,400/month (after-school care, activities)\n• Housing: $2,600/month (3-bedroom house)\n• Total Child-Related: $2,800/month\n• Family Income: $12,500/month\n• Savings Rate: $1,500/month\n\n🤱 SECOND CHILD COST PROJECTIONS:\n• Newborn Care: $1,200/month (daycare)\n• Medical Costs: $4,000 (delivery and first year)\n• Additional Supplies: $400/month\n• Potential Income Loss: 3-month maternity leave\n• Total New Costs: ~$2,000/month initially\n\n🏠 HOUSING CONSIDERATIONS:\n• Current: 3-bedroom house (adequate space)\n• Option: 4-bedroom upgrade (+$800/month)\n• Shared Room: Kids share, no housing change\n• Long-term Space Needs: Growing children\n\n📊 ECONOMIES OF SCALE:\n• Shared Childcare: Some efficiencies possible\n• Hand-me-down Clothes/Toys: Reduced supply costs\n• Bulk Purchasing: Food and supplies savings\n• Experience Factor: Less expensive mistakes\n\n⚖️ TIMING CONSIDERATIONS:\n• Current Financial Stability: Strong position\n• Career Timing: Both parents established\n• Age Gap: 6 years provides built-in helper\n• Future Flexibility: Larger family impacts options",
    age: 34,
    monthlyIncome: 12500,
    context: "Second child decision involves doubling family responsibilities while managing economies of scale and long-term financial planning.",
    options: [
      {
        id: "second_child_premium",
        label: "Second Child + Premium Preparation",
        description: "Have second child with 4-bedroom upgrade, dedicated childcare, and enhanced college savings for both kids.",
        impact: { netWorth: -8000, savings: -4000, debt: 5000, emotion: 1, knowledge: 2, risk: 3, familyStability: 2, careerGrowth: 0 },
        consequences: {
          immediate: "Significant cost increase but optimal family environment",
          shortTerm: "Financial pressure but strong family foundation",
          longTerm: "Higher expenses but potentially better family outcomes and relationships"
        }
      },
      {
        id: "second_child_efficient",
        label: "Second Child + Efficient Approach",
        description: "Have second child, maintain current housing, maximize economies of scale, careful budget management.",
        impact: { netWorth: -4000, savings: -2000, debt: 2000, emotion: 2, knowledge: 3, risk: 2, familyStability: 2, careerGrowth: 0 },
        consequences: {
          immediate: "Moderate cost increase with smart resource utilization",
          shortTerm: "Manageable financial impact through efficient planning",
          longTerm: "Balanced family growth with controlled financial exposure"
        }
      },
      {
        id: "delay_second_child",
        label: "Delay for Financial Optimization",
        description: "Wait 2-3 years, build larger emergency fund, increase college savings, strengthen financial position first.",
        impact: { netWorth: 6000, savings: 18000, emotion: 0, knowledge: 2, risk: 1, familyStability: 0, careerGrowth: 1 },
        consequences: {
          immediate: "Continued financial strength building",
          shortTerm: "Enhanced savings and reduced family expenses",
          longTerm: "Stronger financial foundation but larger age gap between children"
        }
      }
    ],
    learningPoint: "Family expansion decisions require balancing immediate costs, economies of scale, and long-term family dynamics with financial capacity."
  },

  {
    id: 5,
    title: "Private School vs Public School + Enrichment",
    description: "Age 36: Oldest child starting school. Private school $800/month vs public school + activities $400/month. Educational investment strategy.",
    situation: "🎓 EDUCATIONAL INVESTMENT CROSSROADS:\n\n🏫 SCHOOL OPTIONS ANALYSIS:\n• Private School: $800/month ($9,600/year)\n• Public School: Free tuition, $200/month supplies/fees\n• Public + Enrichment: $400/month (tutoring, activities, camps)\n• Total Child (Age 8): Currently $600/month in activities\n\n📊 EDUCATIONAL QUALITY COMPARISON:\n• Private School: Small classes, specialized programs, college prep focus\n• Public School: Larger classes, standard curriculum, variable quality\n• Public + Enrichment: Customizable activities, maintain social diversity\n• Long-term Outcomes: College admission and career preparation\n\n💰 FINANCIAL IMPACT ANALYSIS:\n• Private School Cost: $9,600/year × 10 years = $96,000\n• Public + Enrichment: $4,800/year × 10 years = $48,000\n• Savings Difference: $48,000 could fund college savings\n• Current Education Budget: $7,200/year available\n\n🎯 COLLEGE PREPARATION FACTORS:\n• Private School: Strong college counseling, network benefits\n• Public + Enrichment: Diverse experiences, self-advocacy skills\n• Academic Performance: Depends more on individual student than school\n• Social Development: Different peer groups and experiences\n\n⚖️ SECOND CHILD IMPLICATIONS:\n• If Private: $1,600/month for both children eventually\n• Resource Allocation: Same opportunities for both kids\n• Budget Impact: Major portion of discretionary income",
    age: 36,
    monthlyIncome: 13500,
    context: "Educational investment decisions impact both immediate family budget and long-term child development outcomes.",
    options: [
      {
        id: "private_school_investment",
        label: "Private School Investment",
        description: "Enroll in private school, reduce other discretionary spending, focus on premium educational experience.",
        impact: { netWorth: -2000, savings: -9600, emotion: 1, knowledge: 2, risk: 2, familyStability: 1, careerGrowth: 0 },
        consequences: {
          immediate: "Significant education expense but premium learning environment",
          shortTerm: "Tighter family budget but potentially accelerated child development",
          longTerm: "Strong educational foundation but reduced financial flexibility"
        }
      },
      {
        id: "public_plus_enrichment",
        label: "Public School + Strategic Enrichment",
        description: "Public school with targeted tutoring, music lessons, sports, and summer programs. Customized approach.",
        impact: { netWorth: 1000, savings: 4800, emotion: 2, knowledge: 3, risk: 1, familyStability: 2, careerGrowth: 0 },
        consequences: {
          immediate: "Lower education costs with flexible enrichment options",
          shortTerm: "Balanced approach allows experimentation with activities",
          longTerm: "Cost savings enable college funding while maintaining educational quality"
        }
      },
      {
        id: "hybrid_approach",
        label: "Hybrid Strategy",
        description: "Start public with enrichment, evaluate annually. Switch to private if needed for middle/high school.",
        impact: { netWorth: 0, savings: 2400, emotion: 1, knowledge: 3, risk: 2, familyStability: 1, careerGrowth: 0 },
        consequences: {
          immediate: "Moderate education investment with future flexibility",
          shortTerm: "Adaptive approach based on child's developing needs",
          longTerm: "Balanced strategy allows for adjustments while preserving financial options"
        }
      }
    ],
    learningPoint: "Educational investments should align with family values, child's individual needs, and long-term financial capacity rather than social pressure."
  }
];