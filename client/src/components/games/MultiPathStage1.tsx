import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Home, CheckCircle, AlertTriangle,
  Brain, Heart, Star, Trophy, Target, Zap, PiggyBank, TrendingUp,
  DollarSign, Shield, Users, Briefcase
} from 'lucide-react';

interface MultiPathStage1Props {
  onComplete: (results: any) => void;
  onBackToDashboard: () => void;
}

interface Choice {
  id: string;
  text: string;
  pathName: string;
  pathType: 'conservative' | 'balanced' | 'aggressive' | 'risky';
  nextScenario: string;
  score: number;
  feedback: string;
  consequences: {
    immediate: string;
    shortTerm: string;
    longTerm: string;
  };
  personality: {
    riskTolerance: number;
    knowledge: number;
    confidence: number;
    discipline: number;
  };
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  situation: string;
  icon: any;
  pathContext?: string; // Context based on how user reached this scenario
  choices: Choice[];
}

const MultiPathStage1: React.FC<MultiPathStage1Props> = ({ onComplete, onBackToDashboard }) => {
  const [currentScenarioId, setCurrentScenarioId] = useState('money_mindset_start');
  const [userChoices, setUserChoices] = useState<any[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userPath, setUserPath] = useState<string[]>(['money_mindset_start']);
  const [totalScore, setTotalScore] = useState(0);
  const [scenarioCount, setScenarioCount] = useState(1);

  // Multi-path scenario tree with branching storylines
  const scenarioTree: { [key: string]: Scenario } = {
    // Starting Point - Everyone begins here
    money_mindset_start: {
      id: 'money_mindset_start',
      title: 'The First Salary Reality Matrix - A Life-Defining Moment',
      description: 'Month 1, Day 1: Your first $4,200 salary has just been credited. This single decision will create ripple effects that compound over the next 40 years of your working life. Statistical research shows that financial habits formed in the first 90 days of earning persist for decades.',
      situation: '🏦 CHECKING ACCOUNT BALANCE: $4,200 (Your life just changed forever)\n\n📋 IMMEDIATE OBLIGATIONS:\n• Rent: $1,000 (Due in 3 days, landlord already called)\n• Family Support: $300 (Helping parents with bills, supporting younger sibling\'s college)\n• 401k Deduction: $420 (Automatic 10%, but you can increase contribution)\n\n🎉 SOCIAK PRESSURES:\n• Friends Group Chat: Planning expensive weekend celebration at upscale hotel ($200 per person)\n• Office Colleagues: Suggesting team dinner at premium restaurant ($80)\n• Relatives: Expecting gifts and treats since you\'re "earning now" ($150 expected)\n\n💰 FINANCIAK OPPORTUNITIES:\n• Bank Manager: Offering credit card with $5,000 limit and "special" investment products\n• Insurance Agent: Pressuring for immediate life insurance policy ($120 monthly premium)\n• Online Ads: Promising quick returns from crypto and stock tips\n\n🏠 PERSONAK NEEDS:\n• Professional Wardrobe: Current clothes inadequate for office environment ($300 minimum)\n• Laptop/Phone: Current devices outdated, impacting work efficiency ($800)\n• Transportation: Monthly transit pass vs car down payment vs rideshare budget ($100-400)\n• Food: Fast food vs cooking vs restaurants ($200-600 monthly)\n\n⚡ CRITICAK FACTORS TO CONSIDER:\n• This is your ONLY income source - no backup\n• Next paycheck is 2 weeks away\n• Your decisions set precedents that friends and family will expect you to maintain\n• Market conditions: Inflation at 3.2%, High-yield savings at 4.5%, stock markets volatile\n• Your age: 24 years old - you have 41 years until retirement at 65\n• No existing savings or investments\n• No credit history yet\n\nYour choice in the next 60 seconds will determine whether you start building wealth or start struggling financially. What\'s your move?',
      icon: DollarSign,
      choices: [
        {
          id: 'strategic_planner',
          text: 'THE COMPREHENSIVE WEALTH-BUILDING STRATEGY:\n\n💡 DECISION BREAKDOWN:\n• Emergency Fund: $500 (high-yield savings - accessible within 24 hours)\n• Family Support: $300 (honor obligations, build trust)\n• Rent: $1,000 (secure shelter, maintain credit history)\n• Investment Start: $800 (50% index funds + 50% bond funds)\n• Professional Development: $200 (courses, books, networking)\n• Basic Wardrobe: $150 (1-2 decent outfits for now)\n\n🎯 STRATEGIC REASONING:\n• Politely decline expensive celebration, suggest budget alternative ($50 max)\n• Explain to friends: "I\'m building my financial foundation first - let\'s do something fun but affordable"\n• Use existing laptop/phone for 6 months while saving for upgrades\n• Cook basic meals, gradually improve food budget as income stabilizes\n• Research investments for 2 weeks before starting regular investing\n\n📊 MARKET ANALYSIS CONSIDERED:\n• Current equity markets down 8% from highs = buying opportunity\n• Index funds averaging 10% annually vs savings accounts at 4.5%\n• Inflation hedging through equity exposure essential for 41-year horizon\n• Starting early gives compound interest 41 years to work\n\n⚖️ RISK FACTORS ACKNOWLEDGED:\n• Social pressure will increase as friends see your "success"\n• Family may request higher contributions as income grows\n• Market volatility will test emotional discipline\n• Career growth required to increase income over time\n\n🏆 SUCCESS PROBABILITY: 85% (based on historical data of systematic investors)',
          pathName: 'The Systematic Wealth Builder',
          pathType: 'balanced',
          nextScenario: 'investment_philosophy_deep_dive',
          score: 95,
          feedback: 'Outstanding financial wisdom! You\'ve demonstrated the exact thinking patterns that create millionaires. This systematic approach addresses immediate needs while building long-term wealth. Your decision to decline expensive social activities while maintaining relationships shows emotional maturity rare in young professionals.',
          consequences: {
            immediate: 'Strong financial foundation with emergency buffer, family trust maintained, investment journey begins with diversified approach',
            shortTerm: '6 months: $3,000 emergency fund, $4,800 investments (potential 10-12% growth), enhanced professional skills, respectful friend relationships',
            longTerm: '10 years: $120,000 investment portfolio, $18,000 emergency fund, high probability of financial independence by 45, reputation as financially wise friend'
          },
          personality: { riskTolerance: 30, knowledge: 40, confidence: 35, discipline: 45 }
        },
        {
          id: 'social_first',
          text: 'THE SOCIAK STATUS PRIORITY STRATEGY:\n\n🎉 IMMEDIATE LIFESTYLE CHOICES:\n• Premium Weekend Celebration: $400 (upscale hotel, expensive restaurant, premium drinks)\n• Complete Wardrobe Overhaul: $600 (branded clothes to match new "successful" image)\n• Latest iPhone/Premium Laptop: $1,200 (financing available - $240/month for 5 months)\n• Family Support: $200 (reduced from expected $300)\n• Rent: $1,000 (no choice here)\n• Remaining: $800 (for monthly expenses - insufficient)\n\n🎭 SOCIAK PSYCHOLOGY REASONING:\n• "First impressions matter - I need to establish my status among peers"\n• "My colleagues will judge me if I don\'t participate in celebrations"\n• "Looking successful will help my career advancement"\n• "I deserve to enjoy my hard-earned money"\n• "I can start saving from next month once I settle in"\n\n📱 IMMEDIATE GRATIFICATION FACTORS:\n• Instagram-worthy celebration photos boost social media presence\n• Premium clothes increase confidence in office interactions\n• Latest tech devices enhance perceived competence\n• Peer acceptance and inclusion in future social plans\n• Short-term happiness from material acquisitions\n\n⚠️ FINANCIAK REALITY CHECK:\n• Zero emergency fund = vulnerable to any unexpected expense\n• Credit utilization starts immediately with device EMI\n• Family disappointment with reduced contribution\n• Next month\'s budget already stressed with EMI commitment\n• No investment means missing early compound interest benefits\n\n💳 DEBT SPIRAK INITIATION:\n• EMI creates fixed monthly obligation reducing future flexibility\n• Social precedent set - friends expect continued expensive participation\n• Lifestyle inflation begins on day 1 of earning\n• Credit card applications likely due to cash flow stress\n\n📊 STATISTICAK OUTCOMES:\n• 78% of people following this pattern remain in debt throughout their careers\n• Average time to clear device EMI while maintaining lifestyle: 8-12 months\n• Probability of building significant wealth: 15%',
          pathName: 'The Social Status Seeker',
          pathType: 'risky',
          nextScenario: 'lifestyle_inflation_reality_check',
          score: 25,
          feedback: 'This path feels rewarding immediately but creates dangerous psychological and financial patterns. Social validation through spending is expensive and never-ending. You\'re prioritizing others\' perception over your financial future, which statistically leads to decades of financial stress despite potentially high income.',
          consequences: {
            immediate: 'High social gratification, enhanced peer perception, immediate lifestyle upgrade, but zero financial foundation and reduced family trust',
            shortTerm: '6 months: $1,500 additional debt, social pressure for continued expensive participation, stress from tight monthly budgets, missed investment opportunities worth $2,800',
            longTerm: '10 years: Likely $25,000-40,000 in various debts, lifestyle expenses consume 80% of income, minimal savings despite salary growth, social relationships may suffer during financial stress'
          },
          personality: { riskTolerance: 60, knowledge: -15, confidence: 25, discipline: -30 }
        },
        {
          id: 'ultra_saver',
          text: 'THE EXTREME FINANCIAK DISCIPLINE STRATEGY:\n\n💰 MAXIMUM SAVINGS ALLOCATION:\n• Essential Expenses Only: $1,300 (rent $1,000 + family $300)\n• Ultra-Basic Survival: $200 (cheapest food, transit pass, basic hygiene)\n• High-Yield Savings: $2,700 (CDs and money market funds for maximum safety)\n• Zero Social Spending: Decline all celebrations, dinners, entertainment\n• Zero Lifestyle Upgrades: Use existing clothes, devices, minimal personal care\n\n🎯 EXTREME DISCIPLINE MINDSET:\n• "Every dollar saved now becomes $100 in 41 years through compound interest"\n• "Social activities are expensive distractions from wealth building"\n• "I don\'t need validation through spending - my bank balance is my scorecard"\n• "Today\'s sacrifice = tomorrow\'s financial freedom"\n• "Friends who don\'t understand my goals aren\'t real friends"\n\n📊 MATHEMATICAK ADVANTAGES:\n• 64% savings rate from day 1 (vs national average of 13%)\n• $32,400 saved in first year (without any investment returns)\n• Zero debt, zero financial stress, maximum optionality\n• Complete financial independence possible by age 35-40\n• No dependence on lifestyle inflation or social validation\n\n⚠️ HIDDEN COSTS OF EXTREME APPROACH:\n• Social isolation may impact career networking opportunities\n• Outdated professional appearance might affect promotions\n• Family may perceive reduced contribution as selfishness\n• Mental health impact from constant restriction and denial\n• Missing life experiences that money can\'t buy later\n\n🤝 RELATIONSHIP IMPLICATIONS:\n• Friends may stop inviting you to events\n• Colleagues might view you as antisocial or cheap\n• Dating prospects significantly reduced\n• Family gatherings become awkward due to visible frugality\n• Professional relationships suffer from poor social participation\n\n📈 INVESTMENT GROWTH POTENTIAL:\n• $2,700 monthly in index funds = $1.4 million in 20 years (10% returns)\n• But zero learning about different investment options\n• Risk of putting everything in "safe" options that don\'t beat inflation\n• May miss opportunities due to overcautious approach\n\n🔍 REALITY CHECK:\n• 64% savings rate is admirable but 40% might be equally effective\n• Balance between present enjoyment and future security often yields better life satisfaction\n• Social capital has monetary value in career growth',
          pathName: 'The Financial Ascetic',
          pathType: 'conservative',
          nextScenario: 'extreme_frugality_consequences',
          score: 60,
          feedback: 'Your discipline is exceptional and mathematically this approach can create significant wealth. However, extreme approaches often have hidden opportunity costs. The most successful wealthy individuals typically balance present enjoyment with future security, understanding that relationships and experiences also contribute to a rich life.',
          consequences: {
            immediate: 'Maximum financial security, zero debt risk, strong savings foundation, but social isolation begins and lifestyle remains at minimum survival level',
            shortTerm: '6 months: $16,200 saved, potential social exclusion, family concerns about your extreme behavior, missed networking opportunities, but stress-free financial position',
            longTerm: '10 years: $480,000+ portfolio, likely financial independence, but possible regrets about missed relationships and experiences, potential career limitations from poor social connections'
          },
          personality: { riskTolerance: 5, knowledge: 25, confidence: 15, discipline: 55 }
        },
        {
          id: 'credit_optimizer',
          text: 'THE SOPHISTICATED CREDIT OPTIMIZATION STRATEGY:\n\n💳 ADVANCED CREDIT UTILIZATION PLAN:\n• Apply for premium credit card with $5,000 limit (based on salary verification)\n• Use credit for ALK expenses: rent, food, shopping, entertainment\n• Maintain 30% utilization ($1,500) across multiple cards\n• Pay only minimum amounts initially to "optimize cash flow"\n• Keep $3,800 cash liquid for "investment opportunities"\n• Build credit score through diverse credit usage\n\n🧠 SOPHISTICATED REASONING:\n• "Credit cards offer 45-day interest-free period = free money float"\n• "Reward points and cashback make spending profitable"\n• "Building strong credit history early enables future loans at better rates"\n• "Rich people use OPM (Other People\'s Money) to build wealth"\n• "I can maintain full lifestyle while technically saving my salary"\n\n📊 CREDIT OPTIMIZATION MATHEMATICS:\n• Reward Rate: 1-5% cashback on various categories\n• Interest-free period: 25 days average grace period\n• Credit score building: Potentially 750+ score within 6 months\n• Cash flow flexibility: $3,800 available for investment\n• Social lifestyle maintained: No compromises on experiences\n\n⚠️ HIGH-RISK FACTORS:\n• 24.99% annual interest if unable to pay full amount\n• Minimum payment trap: 2-3% monthly on outstanding balance\n• Lifestyle inflation becomes invisible and automatic\n• Psychological spending increase due to "free money" feeling\n• Credit utilization affecting credit score if above 30%\n\n🎯 SUCCESS REQUIREMENTS:\n• Exceptional financial discipline to track every expense\n• Monthly budget planning with 100% accuracy\n• Never missing payment due dates (affects credit score)\n• Resisting impulse purchases despite available credit\n• Understanding credit terms better than 95% of users\n\n💡 EXPERT-LEVEK CONSIDERATIONS:\n• Different cards for different categories (gas, groceries, online)\n• Statement date vs due date optimization\n• Credit utilization ratio timing for score optimization\n• Balance transfer options for interest rate arbitrage\n• Leveraging credit for business expenses and tax benefits\n\n📈 POTENTIAK OUTCOMES:\n• Best case: 750+ credit score, $400 annual rewards, $3,800 invested monthly, lifestyle maintained\n• Worst case: $8,000 debt at 25% interest, damaged credit score, financial stress\n• Most likely: Moderate debt buildup, lifestyle inflation, missed investment opportunities\n\n🔍 STATISTICAK REALITY:\n• 68% of credit optimizers accumulate debt within first year\n• Average credit card debt for this profile: $4,500 within 18 months\n• Only 12% successfully execute this strategy long-term',
          pathName: 'The Credit Strategist',
          pathType: 'aggressive',
          nextScenario: 'credit_optimization_reality_test',
          score: 40,
          feedback: 'This strategy requires exceptional financial sophistication and discipline. While theoretically sound, credit optimization is extremely difficult to execute correctly. Most people underestimate the psychological impact of available credit and the compound effect of interest charges. This path can lead to wealth building for the top 10% of financially disciplined individuals, but debt accumulation for the majority.',
          consequences: {
            immediate: 'Maintained lifestyle with strong credit building, but complex financial management and potential for invisible debt accumulation',
            shortTerm: '6 months: Either $60K invested with 750+ credit score OR $40K credit debt with financial stress, depending on execution discipline',
            longTerm: '10 years: Either master-level credit expertise with accelerated wealth building OR significant debt burden limiting financial options'
          },
          personality: { riskTolerance: 70, knowledge: 20, confidence: 30, discipline: 15 }
        }
      ]
    },

    // Strategic/Balanced Path Scenarios
    investment_philosophy_balanced: {
      id: 'investment_philosophy_balanced',
      title: 'Investment Philosophy Development',
      description: 'Your strategic mindset has built $25,000 in 3 months. A colleague shows his mutual fund gains of 15%. Time to define your investment approach.',
      situation: '📈 Your systematic approach has built $25,000 emergency fund. Colleague excited about his equity mutual fund gains. Your research shows various options: equity (high risk/return), debt (stable returns), gold (inflation hedge), real estate (long-term).',
      icon: TrendingUp,
      pathContext: 'Having shown strong financial discipline, you\'re ready for sophisticated investment decisions.',
      choices: [
        {
          id: 'diversified_portfolio',
          text: 'Build diversified portfolio: 60% equity funds, 30% debt funds, 10% gold ETF - systematic monthly investment',
          pathName: 'Diversified Wealth Builder',
          pathType: 'balanced',
          nextScenario: 'advanced_goal_setting',
          score: 95,
          feedback: 'Perfect! Diversification is the only free lunch in investing. This approach maximizes long-term wealth while managing risks.',
          consequences: {
            immediate: 'Balanced portfolio with optimal risk-return profile',
            shortTerm: 'Steady growth with manageable volatility',
            longTerm: 'Statistically highest probability of achieving financial goals'
          },
          personality: { riskTolerance: 35, knowledge: 40, confidence: 35, discipline: 30 }
        },
        {
          id: 'equity_focused',
          text: 'Go aggressive: 90% equity funds for maximum growth - I\'m young and can take risks',
          pathName: 'Aggressive Growth Investor',
          pathType: 'aggressive',
          nextScenario: 'market_volatility_test',
          score: 75,
          feedback: 'High-risk approach with potential for excellent returns, but requires strong emotional discipline during market downturns.',
          consequences: {
            immediate: 'High growth potential but increased volatility',
            shortTerm: 'Either excellent gains or significant losses possible',
            longTerm: 'Could achieve financial freedom early or face major setbacks'
          },
          personality: { riskTolerance: 50, knowledge: 25, confidence: 40, discipline: 20 }
        },
        {
          id: 'conservative_mix',
          text: 'Safety first: 30% equity, 60% debt funds, 10% FDs - capital protection priority',
          pathName: 'Conservative Wealth Preserver',
          pathType: 'conservative',
          nextScenario: 'inflation_education_scenario',
          score: 65,
          feedback: 'Conservative approach provides stability but may not generate enough growth to beat inflation significantly.',
          consequences: {
            immediate: 'Low-risk portfolio with predictable returns',
            shortTerm: 'Steady but modest growth',
            longTerm: 'Safe approach but may fall short of ambitious financial goals'
          },
          personality: { riskTolerance: 15, knowledge: 30, confidence: 20, discipline: 35 }
        }
      ]
    },

    // Social Path Scenarios (High-Risk Lifestyle)
    lifestyle_inflation_trap: {
      id: 'lifestyle_inflation_trap',
      title: 'The Lifestyle Inflation Crisis',
      description: 'Three months in, you\'ve spent $1.2 thousands on lifestyle with $30,000 credit card debt. Friends expect you to maintain this standard. Reality check time.',
      situation: '😰 Credit card debt growing, family disappointed with irregular contributions, but friends see you as the "successful one" who can afford everything. Your next choice determines if you escape or spiral deeper.',
      icon: AlertTriangle,
      pathContext: 'Your social-first approach has created financial stress. This is your chance to course-correct.',
      choices: [
        {
          id: 'lifestyle_reset',
          text: 'Complete lifestyle reset: honest conversation with friends about finances, clear debt aggressively, restart financial planning',
          pathName: 'The Recovery Path',
          pathType: 'balanced',
          nextScenario: 'debt_elimination_strategy',
          score: 85,
          feedback: 'Excellent course correction! Admitting mistakes and taking action shows maturity. Many people spiral deeper instead.',
          consequences: {
            immediate: 'Temporary social discomfort but financial relief begins',
            shortTerm: 'Debt cleared, real friendships strengthen, financial discipline established',
            longTerm: 'This tough decision often marks the turning point toward financial success'
          },
          personality: { riskTolerance: 25, knowledge: 35, confidence: 30, discipline: 40 }
        },
        {
          id: 'continue_facade',
          text: 'Maintain the image: take personal loan to clear credit cards, continue lifestyle, hope income increases solve problems',
          pathName: 'The Debt Spiral',
          pathType: 'risky',
          nextScenario: 'debt_spiral_consequences',
          score: 15,
          feedback: 'This is how financial disasters begin. You\'re borrowing from your future self at devastating interest rates.',
          consequences: {
            immediate: 'Temporary relief but much larger debt burden',
            shortTerm: 'Debt compounds rapidly, stress increases dramatically',
            longTerm: 'This path often leads to financial ruin and damaged relationships'
          },
          personality: { riskTolerance: 70, knowledge: -20, confidence: -10, discipline: -30 }
        },
        {
          id: 'partial_adjustment',
          text: 'Moderate adjustment: reduce some expenses, negotiate with friends for cheaper alternatives, minimum debt payments',
          pathName: 'The Compromise Path',
          pathType: 'conservative',
          nextScenario: 'slow_financial_recovery',
          score: 50,
          feedback: 'Half measures often lead to continued struggles. Debt problems require decisive action to solve effectively.',
          consequences: {
            immediate: 'Some financial relief but problems persist',
            shortTerm: 'Slow progress with continued financial stress',
            longTerm: 'May eventually recover but takes much longer than decisive action'
          },
          personality: { riskTolerance: 30, knowledge: 10, confidence: 15, discipline: 20 }
        }
      ]
    },

    // Conservative Path Scenarios
    conservative_growth_limits: {
      id: 'conservative_growth_limits',
      title: 'The Growth Limitation Challenge',
      description: 'Six months in, you\'ve saved $1.8 thousands in FDs earning 6.5%. Inflation at 6.2% means real returns are minimal. Time to reconsider strategy.',
      situation: '🐌 Your ultra-conservative approach has built substantial savings but inflation is quietly eroding purchasing power. Colleague\'s equity investments have grown 18% while your "safe" money barely beats inflation.',
      icon: Shield,
      pathContext: 'Your disciplined saving is commendable, but you\'re learning that excessive safety has hidden risks.',
      choices: [
        {
          id: 'educated_risk_taking',
          text: 'Gradual shift: keep 6 months emergency in FDs, start 70-30 equity-debt investment, educate myself about investing',
          pathName: 'The Learning Investor',
          pathType: 'balanced',
          nextScenario: 'investment_education_journey',
          score: 90,
          feedback: 'Perfect evolution! Maintaining safety while embracing calculated risks. Education-first approach is ideal.',
          consequences: {
            immediate: 'Balanced approach maintains security while seeking growth',
            shortTerm: 'Investment knowledge grows along with portfolio',
            longTerm: 'Typically achieves better returns than pure safety or pure risk'
          },
          personality: { riskTolerance: 30, knowledge: 40, confidence: 25, discipline: 40 }
        },
        {
          id: 'stay_conservative',
          text: 'Stick to safety: inflation is temporary, guaranteed returns are better than market risks, increase FD amounts',
          pathName: 'The Ultra-Safe Path',
          pathType: 'conservative',
          nextScenario: 'inflation_reality_check',
          score: 30,
          feedback: 'This extreme conservatism may feel safe but is actually risky - inflation guarantees wealth erosion over time.',
          consequences: {
            immediate: 'Continued sense of security',
            shortTerm: 'Savings grow nominally but lose real value',
            longTerm: 'Significant opportunity cost - typically 50-70% less wealth than balanced approaches'
          },
          personality: { riskTolerance: 5, knowledge: 15, confidence: 10, discipline: 45 }
        },
        {
          id: 'reactive_fomo',
          text: 'FOMO investment: put large amount in trending stocks colleague mentioned, "catch up" on missed gains',
          pathName: 'The FOMO Trap',
          pathType: 'risky',
          nextScenario: 'market_timing_disaster',
          score: 20,
          feedback: 'Jumping from extreme safety to extreme risk without knowledge is dangerous. FOMO-driven decisions rarely end well.',
          consequences: {
            immediate: 'High potential for immediate gains or losses',
            shortTerm: 'Likely to panic during first market downturn',
            longTerm: 'FOMO investors typically achieve poor returns due to emotional decisions'
          },
          personality: { riskTolerance: 60, knowledge: -10, confidence: 20, discipline: -20 }
        }
      ]
    },

    // Credit Path Scenarios
    credit_mastery_challenge: {
      id: 'credit_mastery_challenge',
      title: 'The Credit Optimization Test',
      description: 'You\'ve been using credit strategically for 4 months. $80,000 credit utilization, earning rewards, but interest costs mounting. Time for the real test.',
      situation: '💳 Your credit strategy has maintained lifestyle and earned $3,000 in rewards, but you\'ve paid $12,000 in interest. Credit utilization at 70% affecting your score. Market crashes 15% - opportunity or trap?',
      icon: Briefcase,
      pathContext: 'Your credit optimization experiment is at a critical juncture - success or failure depends on your next moves.',
      choices: [
        {
          id: 'credit_mastery',
          text: 'True optimization: immediately clear high-interest debt, use crash as investment opportunity, maintain only reward-optimized spending',
          pathName: 'Credit Master Path',
          pathType: 'balanced',
          nextScenario: 'advanced_financial_planning',
          score: 85,
          feedback: 'This is how credit optimization actually works! You\'ve learned to use credit as a tool, not a crutch.',
          consequences: {
            immediate: 'Credit becomes wealth-building tool rather than expense',
            shortTerm: 'Credit score improves, investment opportunities maximized',
            longTerm: 'Credit mastery typically leads to accelerated wealth building'
          },
          personality: { riskTolerance: 40, knowledge: 45, confidence: 40, discipline: 35 }
        },
        {
          id: 'credit_addiction',
          text: 'Leverage opportunity: take cash advance to invest in crashed market, double down on credit strategy',
          pathName: 'The Leverage Trap',
          pathType: 'risky',
          nextScenario: 'leveraged_investment_disaster',
          score: 10,
          feedback: 'This is extremely dangerous! Using high-interest credit to invest amplifies both gains and losses catastrophically.',
          consequences: {
            immediate: 'Massive leverage creates extreme risk exposure',
            shortTerm: 'High probability of devastating losses',
            longTerm: 'This approach has bankrupted countless people throughout history'
          },
          personality: { riskTolerance: 90, knowledge: -25, confidence: 30, discipline: -40 }
        },
        {
          id: 'credit_retreat',
          text: 'Abandon credit strategy: pay minimums, avoid further credit use, return to cash-only lifestyle',
          pathName: 'Credit Avoidance Path',
          pathType: 'conservative',
          nextScenario: 'credit_recovery_slow',
          score: 55,
          feedback: 'Retreating from credit isn\'t wrong, but you\'re missing lessons that could help you master this important financial tool.',
          consequences: {
            immediate: 'Reduced financial risk but missed learning opportunity',
            shortTerm: 'Slow debt reduction, limited credit building',
            longTerm: 'Safe approach but may limit future financial options'
          },
          personality: { riskTolerance: 15, knowledge: 20, confidence: 10, discipline: 30 }
        }
      ]
    },

    // Advanced scenarios for different paths continue...
    advanced_goal_setting: {
      id: 'advanced_goal_setting',
      title: 'Setting Your Financial North Star',
      description: 'Your balanced approach has grown your portfolio to $1.2 thousands in 8 months. Time to set ambitious but achievable long-term goals.',
      situation: '🎯 Your systematic investing has proven successful. Now you need to define what financial freedom means to you and create a roadmap to achieve it.',
      icon: Target,
      pathContext: 'Your proven discipline and knowledge make you ready for advanced financial planning.',
      choices: [
        {
          id: 'ambitious_goals',
          text: 'Set aggressive targets: $1 million by 30, $5 million by 40, create detailed monthly action plan with milestones',
          pathName: 'Financial Freedom Accelerator',
          pathType: 'aggressive',
          nextScenario: 'wealth_building_mastery',
          score: 90,
          feedback: 'Ambitious goals with systematic planning create extraordinary results. Your disciplined foundation supports these targets.',
          consequences: {
            immediate: 'Clear roadmap energizes consistent action',
            shortTerm: 'Accelerated wealth building through focused strategy',
            longTerm: 'High probability of achieving financial independence early'
          },
          personality: { riskTolerance: 35, knowledge: 45, confidence: 45, discipline: 40 }
        }
      ]
    }
  };

  const getCurrentScenario = () => {
    return scenarioTree[currentScenarioId];
  };

  const selectChoice = (choiceId: string) => {
    const scenario = getCurrentScenario();
    const choice = scenario.choices.find(c => c.id === choiceId);
    
    if (choice) {
      setSelectedChoice(choiceId);
      setShowFeedback(true);
      
      const result = {
        scenarioId: currentScenarioId,
        choice: choiceId,
        score: choice.score,
        personality: choice.personality,
        pathType: choice.pathType
      };
      
      setUserChoices([...userChoices, result]);
      setTotalScore(totalScore + choice.score);
    }
  };

  const nextScenario = () => {
    const scenario = getCurrentScenario();
    const choice = scenario.choices.find(c => c.id === selectedChoice);
    
    if (choice && choice.nextScenario && scenarioTree[choice.nextScenario]) {
      setCurrentScenarioId(choice.nextScenario);
      setUserPath([...userPath, choice.nextScenario]);
      setScenarioCount(scenarioCount + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    } else {
      // Complete the stage
      const avgScore = totalScore / scenarioCount;
      onComplete({
        totalScore,
        averageScore: avgScore,
        userChoices,
        userPath,
        scenariosCompleted: scenarioCount,
        finalPathType: choice?.pathType || 'balanced'
      });
    }
  };

  const currentScenario = getCurrentScenario();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Enhanced Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={onBackToDashboard}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-4 py-2 rounded-lg"
            >
              <Home className="w-4 h-4" />
              Back to Dashboard
            </button>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">Stage 1 - Multi-Path Journey</div>
              <div className="text-sm text-gray-600">Financial Awareness & Decision Making</div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-bold text-gray-800">Scenario {scenarioCount}</div>
              <div className="text-sm text-gray-600">Score: {totalScore}</div>
            </div>
          </div>

          {/* Path Visualization */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Your Financial Journey Path:</div>
            <div className="flex items-center gap-2 flex-wrap">
              {userPath.map((path, index) => (
                <div key={index} className="flex items-center">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {path.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  {index < userPath.length - 1 && <ArrowRight className="w-3 h-3 text-gray-400 mx-1" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scenario Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <currentScenario.icon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentScenario.title}</h2>
              <p className="text-gray-600 mb-3">{currentScenario.description}</p>
              {currentScenario.pathContext && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                  <p className="text-amber-800 text-sm"><strong>Path Context:</strong> {currentScenario.pathContext}</p>
                </div>
              )}
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800">{currentScenario.situation}</p>
              </div>
            </div>
          </div>

          {!showFeedback ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🛤️ Choose Your Path:
              </h3>
              {currentScenario.choices.map((choice, index) => (
                <button
                  key={choice.id}
                  onClick={() => selectChoice(choice.id)}
                  className={`w-full p-6 text-left border-2 rounded-xl transition-all duration-300 hover:shadow-lg ${
                    choice.pathType === 'balanced' ? 'border-green-200 hover:border-green-400 hover:bg-green-50' :
                    choice.pathType === 'conservative' ? 'border-blue-200 hover:border-blue-400 hover:bg-blue-50' :
                    choice.pathType === 'aggressive' ? 'border-orange-200 hover:border-orange-400 hover:bg-orange-50' :
                    'border-red-200 hover:border-red-400 hover:bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      choice.pathType === 'balanced' ? 'bg-green-100 text-green-600' :
                      choice.pathType === 'conservative' ? 'bg-blue-100 text-blue-600' :
                      choice.pathType === 'aggressive' ? 'bg-orange-100 text-orange-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{choice.pathName}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          choice.pathType === 'balanced' ? 'bg-green-100 text-green-700' :
                          choice.pathType === 'conservative' ? 'bg-blue-100 text-blue-700' :
                          choice.pathType === 'aggressive' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {choice.pathType.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">{choice.text}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {selectedChoice && (() => {
                const choice = currentScenario.choices.find(c => c.id === selectedChoice)!;
                const isGoodChoice = choice.score >= 80;
                
                return (
                  <>
                    <div className={`p-6 rounded-xl ${
                      isGoodChoice ? 'bg-green-50 border border-green-200' : 
                      choice.score >= 50 ? 'bg-yellow-50 border border-yellow-200' : 
                      'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex items-center gap-3 mb-4">
                        {isGoodChoice ? (
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-8 h-8 text-orange-600" />
                        )}
                        <div>
                          <h3 className="text-lg font-bold">Path: {choice.pathName}</h3>
                          <p className="text-sm text-gray-600">Score: {choice.score}/100</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className={`${
                          isGoodChoice ? 'text-green-800' : 
                          choice.score >= 50 ? 'text-yellow-800' : 
                          'text-red-800'
                        }`}>
                          <strong>Feedback:</strong> {choice.feedback}
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 mb-1">Immediate</div>
                          <div className="text-xs text-gray-600">{choice.consequences.immediate}</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 mb-1">Short Term</div>
                          <div className="text-xs text-gray-600">{choice.consequences.shortTerm}</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 mb-1">Long Term</div>
                          <div className="text-xs text-gray-600">{choice.consequences.longTerm}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <button
                        onClick={nextScenario}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors"
                      >
                        {choice.nextScenario && scenarioTree[choice.nextScenario] ? (
                          <>
                            Continue Journey
                            <ArrowRight className="w-5 h-5" />
                          </>
                        ) : (
                          <>
                            Complete Stage 1
                            <CheckCircle className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiPathStage1;