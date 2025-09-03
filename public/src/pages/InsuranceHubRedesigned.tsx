import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { useToast } from "../hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { SEO } from "../components/SEO";

// Types
type InsuranceType = {
  id: string;
  name: string;
  description: string;
  importance: string;
  icon: string;
  color: string;
  startAge: number;
  benefits: string[];
  coverage: string[];
  exclusions: string[];
  waiting: string;
  idealFor: string[];
  whenToBuy: string;
};

type CompanyType = {
  id: string;
  name: string;
  insuranceTypes: string[];
  rating: number;
  claimSettlementRatio: number;
  avgClaimTime: number;
  transparency: "Low" | "Medium" | "High";
  highlight?: string;
  coverageCapacity: number;
  networkHospitals?: number;
  specialFeatures: string[];
  logo: string;
};

type InsuranceTip = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
};

type ClaimStep = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

type CommonPitfall = {
  id: string;
  title: string;
  description: string;
  solution: string;
  icon: string;
};

type QuizQuestion = {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
};

// Main Component
export default function InsuranceHubRedesigned() {
  const { toast } = useToast();
  const [activeType, setActiveType] = useState<string>("term");
  const [calculatorTab, setCalculatorTab] = useState<"term" | "health">("term");

  // Term Insurance Calculator State
  const [age, setAge] = useState<number>(30);
  const [income, setIncome] = useState<number>(600000);
  const [dependents, setDependents] = useState<number>(2);
  const [smoker, setSmoker] = useState<boolean>(false);
  const [termYears, setTermYears] = useState<number>(30);
  const [healthConditions, setHealthConditions] = useState<boolean>(false);
  const [termResult, setTermResult] = useState<{
    coverage: number;
    premium: number;
    riders: { name: string; cost: number; benefit: string }[];
  } | null>(null);

  // Health Insurance Calculator State
  const [healthAge, setHealthAge] = useState<number>(30);
  const [familySize, setFamilySize] = useState<number>(3);
  const [city, setCity] = useState<"tier1" | "tier2" | "tier3">("tier1");
  const [preExistingCondition, setPreExistingCondition] = useState<boolean>(false);
  const [healthResult, setHealthResult] = useState<{
    coverage: number;
    premium: number;
    waiting: number;
    hospitals: number;
  } | null>(null);

  // Trust Meter State
  const [confidenceAnswers, setConfidenceAnswers] = useState<Record<string, boolean>>({
    disclosures: false,
    nominee: false,
    exclusions: false,
    documents: false,
    network: false,
    family: false
  });
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
  
  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  
  // Animation States
  const [showCalculatorAnimation, setShowCalculatorAnimation] = useState<boolean>(false);
  const [showTrustMeterAnimation, setShowTrustMeterAnimation] = useState<boolean>(false);
  
  // Initialize sample data
  const insuranceTypes: InsuranceType[] = [
    {
      id: "term",
      name: "Term Life Insurance",
      description: "Financial safety net that provides coverage for a specific period, ensuring your family's financial security in your absence.",
      importance: "Essential for those with financial dependents to ensure they're protected from financial hardship if something happens to you.",
      icon: "person_alert",
      color: "rgb(37, 99, 235)",
      startAge: 25,
      benefits: [
        "High coverage at affordable premiums",
        "Financial security for dependents",
        "Protection for outstanding loans",
        "Tax benefits under Section 80C"
      ],
      coverage: [
        "Death benefit to nominees",
        "Terminal illness benefit (in some policies)",
        "Optional accidental death benefit",
        "Optional critical illness riders"
      ],
      exclusions: [
        "Suicide within first year (varies by insurer)",
        "Death due to self-inflicted injury",
        "Death due to hazardous activities (unless covered by riders)",
        "Death due to pre-existing conditions (if not disclosed)"
      ],
      waiting: "No waiting period for accident claims, immediate coverage",
      idealFor: [
        "Sole breadwinners",
        "Young parents",
        "Those with financial dependents",
        "Those with significant loans/debts"
      ],
      whenToBuy: "Ideally in your 20s or early 30s when premiums are lowest"
    },
    {
      id: "health",
      name: "Health Insurance",
      description: "Comprehensive coverage for medical expenses, hospitalization costs, and treatments, safeguarding against financial strain during health emergencies.",
      importance: "Critical for everyone to protect savings from being depleted by high medical costs, especially with rising healthcare expenses.",
      icon: "health_and_safety",
      color: "rgb(16, 185, 129)",
      startAge: 18,
      benefits: [
        "Cashless hospitalization",
        "Pre and post hospitalization coverage",
        "No-claim bonus benefits",
        "Tax benefits under Section 80D"
      ],
      coverage: [
        "Room rent & boarding expenses",
        "Doctor consultation fees",
        "Surgical procedure costs",
        "ICU charges",
        "Medicine costs during hospitalization",
        "Diagnostic tests"
      ],
      exclusions: [
        "Pre-existing diseases (for initial waiting period)",
        "Cosmetic treatments",
        "Dental treatments (unless due to accident)",
        "Experimental treatments",
        "Fertility treatments and pregnancy (unless maternity cover)"
      ],
      waiting: "30 days for general conditions, 2-4 years for pre-existing diseases",
      idealFor: [
        "Everyone regardless of age",
        "Families with young children",
        "Senior citizens",
        "Those with family history of illnesses"
      ],
      whenToBuy: "As early as possible, ideally before health issues arise"
    },
    {
      id: "motor",
      name: "Motor Insurance",
      description: "Protection for your vehicle against damage, theft, and third-party liability, ensuring financial and legal security on the road.",
      importance: "Mandatory by law for all vehicle owners in India, provides essential financial protection against accidents and damage.",
      icon: "directions_car",
      color: "rgb(245, 158, 11)",
      startAge: 18,
      benefits: [
        "Legal compliance",
        "Financial protection against accidents",
        "Third-party liability coverage",
        "Protection against natural calamities"
      ],
      coverage: [
        "Third-party injuries/damages (mandatory)",
        "Own damage (in comprehensive policies)",
        "Personal accident cover for owner-driver",
        "Natural calamities damage",
        "Fire and theft"
      ],
      exclusions: [
        "Driving without valid license",
        "Driving under influence of alcohol/drugs",
        "Normal wear and tear",
        "Mechanical/electrical breakdown",
        "Consequential losses"
      ],
      waiting: "No specific waiting period, coverage begins after policy issuance",
      idealFor: [
        "All vehicle owners (third-party mandatory)",
        "New vehicle owners (comprehensive recommended)",
        "Those with expensive vehicles",
        "Those in areas with high accident rates"
      ],
      whenToBuy: "At the time of vehicle purchase, mandatory to drive legally"
    },
    {
      id: "home",
      name: "Home Insurance",
      description: "Safeguards your home and belongings against damage from natural disasters, fire, theft, and other perils, protecting your most valuable asset.",
      importance: "Essential for homeowners to protect significant financial investment and ensure financial recovery after unforeseen events.",
      icon: "house",
      color: "rgb(124, 58, 237)",
      startAge: 21,
      benefits: [
        "Protection of home structure",
        "Coverage for household contents",
        "Liability protection",
        "Additional living expenses coverage"
      ],
      coverage: [
        "Structure damage from fire, natural disasters",
        "Burglary and theft of belongings",
        "Limited coverage for jewelry and valuables",
        "Liability for third-party injuries on property",
        "Temporary accommodation costs"
      ],
      exclusions: [
        "Normal wear and tear",
        "Poor maintenance issues",
        "War and nuclear perils",
        "Intentional damage",
        "Commercial usage"
      ],
      waiting: "No specific waiting period, coverage begins after policy issuance",
      idealFor: [
        "Homeowners",
        "Those with valuable possessions",
        "Those in disaster-prone areas",
        "Mortgage holders (often required by lenders)"
      ],
      whenToBuy: "Immediately after property purchase or before monsoon season"
    },
    {
      id: "travel",
      name: "Travel Insurance",
      description: "Comprehensive coverage for travel-related emergencies including medical expenses, trip cancellation, lost baggage, and flight delays.",
      importance: "Essential for international travel to manage unforeseen emergencies in foreign countries with high healthcare costs.",
      icon: "flight",
      color: "rgb(236, 72, 153)",
      startAge: 0,
      benefits: [
        "Medical emergency coverage abroad",
        "Trip cancellation/interruption benefits",
        "Lost luggage compensation",
        "Missed flight connection coverage"
      ],
      coverage: [
        "Emergency medical expenses",
        "Medical evacuation costs",
        "Trip cancellation/curtailment",
        "Lost/delayed baggage",
        "Passport loss assistance",
        "Flight delays/cancellations"
      ],
      exclusions: [
        "Pre-existing medical conditions (unless declared)",
        "Adventure sports (unless covered by add-ons)",
        "Incidents under influence of alcohol/drugs",
        "War zones/restricted countries",
        "Self-inflicted injuries"
      ],
      waiting: "No waiting period, coverage begins from journey start date",
      idealFor: [
        "International travelers",
        "Frequent travelers (annual plans)",
        "Students going abroad",
        "Senior citizens traveling overseas",
        "Travelers to countries requiring insurance"
      ],
      whenToBuy: "Immediately after booking travel tickets/arrangements"
    }
  ];

  const insuranceTips: InsuranceTip[] = [
    {
      id: "early",
      title: "Buy Early, Save More",
      description: "Purchasing insurance at a younger age means significantly lower premiums that remain fixed throughout the policy term.",
      icon: "savings",
      color: "rgb(5, 150, 105)"
    },
    {
      id: "disclose",
      title: "Disclose Everything",
      description: "Full disclosure of medical history and relevant information ensures your claims won't be rejected due to non-disclosure.",
      icon: "fact_check",
      color: "rgb(79, 70, 229)"
    },
    {
      id: "understand",
      title: "Know Your Policy",
      description: "Take time to read policy documents, especially exclusions and waiting periods, to avoid surprises during claim time.",
      icon: "menu_book",
      color: "rgb(245, 158, 11)"
    },
    {
      id: "compare",
      title: "Compare Before Buying",
      description: "Don't purchase the first policy you find. Compare features, premiums, claim processes, and reviews across providers.",
      icon: "compare_arrows",
      color: "rgb(236, 72, 153)"
    },
    {
      id: "check",
      title: "Check Claim Settlement Ratio",
      description: "Higher CSR indicates better chances of claim approval. Look for insurers with CSR above 95% for peace of mind.",
      icon: "verified",
      color: "rgb(37, 99, 235)"
    },
    {
      id: "review",
      title: "Review Annually",
      description: "Life changes like marriage, children, or income increases may require updating your coverage to stay adequately protected.",
      icon: "update",
      color: "rgb(124, 58, 237)"
    }
  ];

  const insuranceCompanies: CompanyType[] = [
    {
      id: "lic",
      name: "Life Insurance Corporation",
      insuranceTypes: ["term"],
      rating: 4.2,
      claimSettlementRatio: 98.7,
      avgClaimTime: 8.5,
      transparency: "Medium",
      highlight: "Highest market share in life insurance",
      coverageCapacity: 100000000,
      specialFeatures: [
        "Widespread branch network",
        "Traditional trust factor",
        "Various policy customizations"
      ],
      logo: "shield"
    },
    {
      id: "hdfc",
      name: "HDFC Life",
      insuranceTypes: ["term", "health"],
      rating: 4.5,
      claimSettlementRatio: 97.8,
      avgClaimTime: 6.2,
      transparency: "High",
      highlight: "Award-winning digital claim processing",
      coverageCapacity: 50000000,
      networkHospitals: 10500,
      specialFeatures: [
        "3-Click claim process",
        "AI-powered claim assessment",
        "Comprehensive health packages"
      ],
      logo: "shield"
    },
    {
      id: "max",
      name: "Max Life Insurance",
      insuranceTypes: ["term"],
      rating: 4.3,
      claimSettlementRatio: 99.2,
      avgClaimTime: 5.8,
      transparency: "High",
      highlight: "Highest claim settlement ratio",
      coverageCapacity: 75000000,
      specialFeatures: [
        "24-hour claim settlement",
        "Specialized cancer coverage",
        "Critical illness advances"
      ],
      logo: "shield"
    },
    {
      id: "star",
      name: "Star Health",
      insuranceTypes: ["health"],
      rating: 4.0,
      claimSettlementRatio: 95.6,
      avgClaimTime: 7.3,
      transparency: "Medium",
      highlight: "Health insurance specialist",
      coverageCapacity: 25000000,
      networkHospitals: 12000,
      specialFeatures: [
        "Specialized senior plans",
        "No medical tests up to age 50",
        "Wellness program rewards"
      ],
      logo: "shield"
    },
    {
      id: "bajaj",
      name: "Bajaj Allianz",
      insuranceTypes: ["motor", "health", "term", "travel", "home"],
      rating: 4.0,
      claimSettlementRatio: 93.2,
      avgClaimTime: 8.5,
      transparency: "Medium",
      highlight: "One-stop insurance provider",
      coverageCapacity: 25000000,
      networkHospitals: 7500,
      specialFeatures: [
        "Motor Garage Network",
        "Virtual HealthCare",
        "International Emergency Assistance"
      ],
      logo: "shield"
    },
    {
      id: "icici",
      name: "ICICI Lombard",
      insuranceTypes: ["motor", "health", "travel", "home"],
      rating: 4.2,
      claimSettlementRatio: 95.3,
      avgClaimTime: 7.1,
      transparency: "High",
      highlight: "Digital-first experience",
      coverageCapacity: 20000000,
      networkHospitals: 8700,
      specialFeatures: [
        "IL TakeCare App",
        "Express Claim Settlement",
        "Telemedicine Services"
      ],
      logo: "shield"
    }
  ];

  const claimSteps: ClaimStep[] = [
    {
      id: 1,
      title: "Inform Your Insurer",
      description: "Contact your insurance company immediately through helpline, app, or website to report the incident or hospitalization.",
      icon: "call"
    },
    {
      id: 2,
      title: "Fill Claim Form",
      description: "Complete the claim form with accurate details about the incident or medical condition that requires the claim.",
      icon: "edit_document"
    },
    {
      id: 3,
      title: "Submit Documents",
      description: "Provide all necessary documents such as medical reports, bills, prescriptions, ID proof, and policy details.",
      icon: "upload_file"
    },
    {
      id: 4,
      title: "Claim Processing",
      description: "The insurer verifies documents, investigates if necessary, and processes the claim according to policy terms.",
      icon: "hourglass_top"
    },
    {
      id: 5,
      title: "Claim Settlement",
      description: "Upon approval, receive the claim amount through direct transfer to your bank account or through the hospital (for cashless).",
      icon: "verified"
    }
  ];

  const commonPitfalls: CommonPitfall[] = [
    {
      id: "disclosure",
      title: "Non-disclosure of Medical History",
      description: "Hiding pre-existing conditions leads to claim rejection when the insurer discovers the condition during claim investigation.",
      solution: "Always provide complete disclosure about all health conditions, treatments, and habits like smoking, even if it means higher premiums.",
      icon: "medical_information"
    },
    {
      id: "waiting",
      title: "Ignoring Waiting Periods",
      description: "Filing claims during the waiting period for specific conditions or immediately after policy purchase leads to rejection.",
      solution: "Understand all waiting periods in your policy: initial (30 days), disease-specific (1-2 years), and pre-existing (2-4 years).",
      icon: "schedule"
    },
    {
      id: "exclusions",
      title: "Overlooking Policy Exclusions",
      description: "Attempting to claim for conditions that are explicitly excluded in the policy terms and conditions.",
      solution: "Carefully read the list of exclusions in your policy document and consider riders or add-ons for critical exclusions.",
      icon: "do_not_disturb"
    },
    {
      id: "documentation",
      title: "Incomplete Documentation",
      description: "Submitting insufficient or improper documentation delays claim processing or leads to rejection.",
      solution: "Keep organized records of all medical documents, bills, prescriptions, and follow the insurer's document checklist.",
      icon: "description"
    },
    {
      id: "delay",
      title: "Delayed Claim Intimation",
      description: "Informing the insurer too late after hospitalization or incident, missing the notification deadline.",
      solution: "Notify your insurer immediately (ideally within 24-48 hours) of hospitalization or incident, even on weekends/holidays.",
      icon: "timer_off"
    }
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Which type of insurance is legally mandatory for all vehicle owners in India?",
      options: [
        {
          id: "a",
          text: "Comprehensive Motor Insurance",
          isCorrect: false,
          explanation: "While comprehensive coverage is recommended, it's not legally required."
        },
        {
          id: "b",
          text: "Third-Party Liability Insurance",
          isCorrect: true,
          explanation: "Third-party liability insurance is legally mandated for all vehicles under the Motor Vehicles Act."
        },
        {
          id: "c",
          text: "Zero Depreciation Cover",
          isCorrect: false,
          explanation: "This is an optional add-on to comprehensive policies, not a mandatory requirement."
        },
        {
          id: "d",
          text: "Personal Accident Cover",
          isCorrect: false,
          explanation: "While important, only third-party liability coverage is strictly mandatory by law."
        }
      ]
    },
    {
      id: 2,
      question: "What is the typical waiting period for pre-existing diseases in health insurance policies?",
      options: [
        {
          id: "a",
          text: "30 days",
          isCorrect: false,
          explanation: "30 days is the initial waiting period for general illnesses, not pre-existing conditions."
        },
        {
          id: "b",
          text: "1 year",
          isCorrect: false,
          explanation: "Pre-existing diseases typically have longer waiting periods than just 1 year."
        },
        {
          id: "c",
          text: "2-4 years",
          isCorrect: true,
          explanation: "Most health insurers impose a 2-4 year waiting period before covering pre-existing diseases."
        },
        {
          id: "d",
          text: "Lifetime exclusion",
          isCorrect: false,
          explanation: "Indian health insurance policies don't typically have lifetime exclusions for pre-existing conditions."
        }
      ]
    },
    {
      id: 3,
      question: "What is the ideal coverage amount for term life insurance?",
      options: [
        {
          id: "a",
          text: "Equal to your annual income",
          isCorrect: false,
          explanation: "This would provide coverage for only one year of income replacement."
        },
        {
          id: "b",
          text: "5 times your annual income",
          isCorrect: false,
          explanation: "While better than option A, this is still considered insufficient by financial experts."
        },
        {
          id: "c",
          text: "10-15 times your annual income",
          isCorrect: true,
          explanation: "Financial experts recommend 10-15 times your annual income for adequate protection of dependents."
        },
        {
          id: "d",
          text: "Based on your outstanding loans only",
          isCorrect: false,
          explanation: "Coverage should consider not just loans but future expenses and income replacement for dependents."
        }
      ]
    },
    {
      id: 4,
      question: "What is CSR (Claim Settlement Ratio) in insurance?",
      options: [
        {
          id: "a",
          text: "Customer Satisfaction Rating",
          isCorrect: false,
          explanation: "CSR stands for Claim Settlement Ratio, not Customer Satisfaction Rating."
        },
        {
          id: "b",
          text: "Corporate Social Responsibility",
          isCorrect: false,
          explanation: "While CSR can mean Corporate Social Responsibility in other contexts, in insurance it refers to Claim Settlement Ratio."
        },
        {
          id: "c",
          text: "Percentage of claims settled out of total claims received",
          isCorrect: true,
          explanation: "CSR or Claim Settlement Ratio represents the percentage of claims settled by an insurer compared to total claims received."
        },
        {
          id: "d",
          text: "Average time taken to settle claims",
          isCorrect: false,
          explanation: "This would be the claim settlement time, not the ratio."
        }
      ]
    },
    {
      id: 5,
      question: "Which of these is NOT typically covered in standard travel insurance?",
      options: [
        {
          id: "a",
          text: "Lost baggage",
          isCorrect: false,
          explanation: "Lost baggage is a standard coverage in most travel insurance policies."
        },
        {
          id: "b",
          text: "Medical emergencies",
          isCorrect: false,
          explanation: "Medical emergencies are one of the most important coverages in travel insurance."
        },
        {
          id: "c",
          text: "Trip cancellation",
          isCorrect: false,
          explanation: "Trip cancellation is typically covered in standard travel insurance policies."
        },
        {
          id: "d",
          text: "Business losses during travel",
          isCorrect: true,
          explanation: "Standard travel insurance doesn't cover business losses. This requires specialized business travel insurance."
        }
      ]
    }
  ];
  
  // Term Insurance Premium Calculator
  const calculateTermPremium = () => {
    if (!age || !income || !dependents) {
      toast({
        title: "Missing Information",
        description: "Please fill all the required fields to calculate your premium.",
        variant: "destructive",
      });
      return;
    }
    
    // Animated calculation effect
    setShowCalculatorAnimation(true);
    setTimeout(() => {
      setShowCalculatorAnimation(false);
      
      // Coverage amount calculation (10-15x annual income)
      const baseMultiplier = 10;
      const dependentFactor = Math.min(dependents * 0.5, 2.5); // Cap at 2.5
      const coverageMultiplier = baseMultiplier + dependentFactor;
      
      const coverage = income * coverageMultiplier;
      
      // Base premium calculation
      let basePremium = coverage * 0.0015; // Base rate of Rs 1.5 per 1000 coverage
      
      // Age factor
      const ageFactor = 1 + Math.max(0, (age - 25) * 0.03);
      
      // Health condition factor
      const healthFactor = healthConditions ? 1.5 : 1;
      
      // Smoker factor
      const smokerFactor = smoker ? 1.7 : 1;
      
      // Term length factor
      const termFactor = 1 + (termYears > 20 ? 0.1 : 0);
      
      // Calculate final premium
      const finalPremium = Math.round(basePremium * ageFactor * healthFactor * smokerFactor * termFactor);
      
      // Recommended riders
      const riders = [
        {
          name: "Critical Illness Cover",
          cost: Math.round(finalPremium * 0.2),
          benefit: "Lump sum payout on diagnosis of specified critical illnesses"
        },
        {
          name: "Accidental Death Benefit",
          cost: Math.round(finalPremium * 0.1),
          benefit: "Additional payout in case of death due to accident"
        },
        {
          name: "Premium Waiver",
          cost: Math.round(finalPremium * 0.05),
          benefit: "Waives future premiums in case of disability or critical illness"
        }
      ];
      
      setTermResult({
        coverage,
        premium: finalPremium,
        riders
      });
      
      toast({
        title: "Premium Calculated",
        description: `Recommended coverage: ₹${(coverage/100000).toFixed(1)} lakhs with an annual premium of ₹${finalPremium.toLocaleString()}`,
      });
    }, 1500);
  };
  
  // Health Insurance Premium Calculator
  const calculateHealthPremium = () => {
    if (!healthAge || !familySize) {
      toast({
        title: "Missing Information",
        description: "Please fill all the required fields to calculate your premium.",
        variant: "destructive",
      });
      return;
    }
    
    // Animated calculation effect
    setShowCalculatorAnimation(true);
    setTimeout(() => {
      setShowCalculatorAnimation(false);
      
      // Base coverage based on family size
      let coverage = 500000; // 5 Lakhs base
      if (familySize >= 4) coverage = 1000000; // 10 Lakhs
      if (familySize >= 6) coverage = 1500000; // 15 Lakhs
      
      // Base premium - approx Rs 500 per lakh of coverage per person
      let basePremium = (coverage / 100000) * 500 * familySize;
      
      // Age factor
      const ageFactor = 1 + Math.max(0, (healthAge - 30) * 0.05);
      
      // City tier factor (healthcare costs vary by city)
      const cityFactor = city === "tier1" ? 1.2 : city === "tier2" ? 1 : 0.9;
      
      // Pre-existing condition factor
      const conditionFactor = preExistingCondition ? 1.5 : 1;
      
      // Calculate final premium
      const finalPremium = Math.round(basePremium * ageFactor * cityFactor * conditionFactor);
      
      // Network hospitals by city tier
      const networkHospitals = city === "tier1" ? 5000 : city === "tier2" ? 3000 : 1500;
      
      // Waiting period
      const waitingPeriod = preExistingCondition ? 3 : 2;
      
      setHealthResult({
        coverage,
        premium: finalPremium,
        waiting: waitingPeriod,
        hospitals: networkHospitals
      });
      
      toast({
        title: "Health Insurance Premium Calculated",
        description: `Recommended coverage: ₹${(coverage/100000).toFixed(0)} lakhs with an annual premium of ₹${finalPremium.toLocaleString()}`,
      });
    }, 1500);
  };
  
  // Calculate claim readiness score
  const calculateClaimReadiness = () => {
    // Count how many answers are true
    const trueCount = Object.values(confidenceAnswers).filter(val => val).length;
    
    // Calculate percentage score
    const percentage = Math.round((trueCount / Object.keys(confidenceAnswers).length) * 100);
    
    setShowTrustMeterAnimation(true);
    setTimeout(() => {
      setShowTrustMeterAnimation(false);
      setConfidenceScore(percentage);
    }, 1500);
  };
  
  // Quiz handling
  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
    setShowExplanation(true);
    
    // Check if answer is correct
    const isCorrect = quizQuestions[currentQuestion].options.find(
      option => option.id === optionId
    )?.isCorrect;
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  };
  
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
  };
  
  // Get the currently selected insurance type details
  const selectedInsurance = insuranceTypes.find(type => type.id === activeType);
  
  // Filtering companies based on selected insurance type
  const filteredCompanies = insuranceCompanies.filter(company => 
    company.insuranceTypes.includes(activeType)
  );
  
  const getStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className="material-icons text-sm"
            style={{ color: star <= rating ? "#FBBF24" : "#E5E7EB" }}
          >
            {star <= rating 
              ? star === Math.ceil(rating) && !Number.isInteger(rating)
                ? "star_half"
                : "star" 
              : "star_outline"}
          </span>
        ))}
        <span className="ml-1 text-xs text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  // Confidence score color and message
  const getConfidenceLevel = (score: number | null) => {
    if (score === null) return { color: "bg-gray-200", message: "Not calculated" };
    
    if (score < 30) return { color: "bg-red-500", message: "High Risk - Needs Immediate Attention" };
    if (score < 60) return { color: "bg-yellow-500", message: "Moderate Risk - Several Improvements Needed" };
    if (score < 80) return { color: "bg-blue-500", message: "Good - Minor Improvements Needed" };
    return { color: "bg-green-500", message: "Excellent - Well Prepared" };
  };
  
  return (
    <div className="px-4 py-3 pb-16">
      <SEO
        title="Insurance Hub | Interactive Guide & Tools"
        description="Your interactive guide to understanding insurance in India with calculators, claim guides, and expert tips to help you make smart insurance decisions."
        keywords="insurance guide, insurance calculator, term insurance, health insurance, claim settlement, policy comparison, insurance tips"
      />
    
      <div className="flex items-center mb-6">
        <button 
          onClick={() => window.history.back()}
          className="mr-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Insurance Hub
        </h1>
      </div>
      
      {/* Main Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 mb-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 mb-6 md:mb-0 md:mr-6">
            <h2 className="text-xl font-bold mb-3">Navigate Insurance with Confidence</h2>
            <p className="mb-4 text-blue-100">Interactive tools and expert insights to help you make informed insurance decisions tailored to your needs.</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                <span className="material-icons mr-1 text-sm">calculate</span> Try Calculators
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-blue-700">
                <span className="material-icons mr-1 text-sm">quiz</span> Take Quiz
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="material-icons text-white text-5xl">health_and_safety</span>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="learn" className="mb-8">
        <TabsList className="bg-gray-100 rounded-full p-1">
          <TabsTrigger value="learn" className="rounded-full px-6 py-1.5 text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <span className="material-icons mr-1 text-sm">school</span> Learn
          </TabsTrigger>
          <TabsTrigger value="calculate" className="rounded-full px-6 py-1.5 text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <span className="material-icons mr-1 text-sm">calculate</span> Calculate
          </TabsTrigger>
          <TabsTrigger value="compare" className="rounded-full px-6 py-1.5 text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <span className="material-icons mr-1 text-sm">compare</span> Compare
          </TabsTrigger>
          <TabsTrigger value="claim" className="rounded-full px-6 py-1.5 text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <span className="material-icons mr-1 text-sm">verified</span> Claim Ready
          </TabsTrigger>
        </TabsList>
        
        {/* LEARN TAB - Insurance Types */}
        <TabsContent value="learn" className="mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
            {insuranceTypes.map((type) => (
              <Card 
                key={type.id}
                className={`overflow-hidden cursor-pointer hover:shadow-md transition-all ${
                  activeType === type.id ? 'ring-2 ring-blue-500 shadow-md' : ''
                }`}
                onClick={() => setActiveType(type.id)}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${type.color}20` }}
                  >
                    <span className="material-icons" style={{ color: type.color }}>{type.icon}</span>
                  </div>
                  <h3 className="font-medium text-sm">{type.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedInsurance && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <Card>
                <CardHeader 
                  className="pb-2"
                  style={{ 
                    background: `linear-gradient(to right, ${selectedInsurance.color}15, ${selectedInsurance.color}05)`
                  }}
                >
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                      style={{ backgroundColor: `${selectedInsurance.color}25` }}
                    >
                      <span className="material-icons" style={{ color: selectedInsurance.color }}>
                        {selectedInsurance.icon}
                      </span>
                    </div>
                    <div>
                      <CardTitle>{selectedInsurance.name}</CardTitle>
                      <CardDescription className="text-sm mt-1">
                        {selectedInsurance.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-base font-medium mb-3 flex items-center">
                        <span className="material-icons mr-2 text-green-600">check_circle</span>
                        What's Covered
                      </h4>
                      <ul className="space-y-2">
                        {selectedInsurance.coverage.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="material-icons text-green-500 mr-2 text-sm">check</span>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <h4 className="text-base font-medium mt-6 mb-3 flex items-center">
                        <span className="material-icons mr-2 text-red-600">cancel</span>
                        What's Not Covered
                      </h4>
                      <ul className="space-y-2">
                        {selectedInsurance.exclusions.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="material-icons text-red-500 mr-2 text-sm">close</span>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-base font-medium mb-3 flex items-center">
                          <span className="material-icons mr-2 text-blue-600">star</span>
                          Key Benefits
                        </h4>
                        <ul className="space-y-2">
                          {selectedInsurance.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <span className="material-icons text-blue-500 mr-2 text-sm">arrow_right</span>
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 className="text-base font-medium mb-2 text-blue-800">Who Should Buy This?</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedInsurance.idealFor.map((person, index) => (
                            <Badge 
                              key={index} 
                              variant="outline"
                              className="bg-white border-blue-200 text-blue-700"
                            >
                              {person}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                        <h4 className="text-base font-medium mb-2 text-amber-800 flex items-center">
                          <span className="material-icons mr-2 text-amber-500">schedule</span>
                          When to Buy
                        </h4>
                        <p className="text-sm text-amber-700">{selectedInsurance.whenToBuy}</p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <h4 className="text-base font-medium mb-2 text-green-800 flex items-center">
                          <span className="material-icons mr-2 text-green-500">hourglass_bottom</span>
                          Waiting Period
                        </h4>
                        <p className="text-sm text-green-700">{selectedInsurance.waiting}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center">
                    <span className="material-icons text-blue-600 mr-2">schedule</span>
                    <div>
                      <p className="text-sm font-medium">Ideal Starting Age</p>
                      <p className="text-sm text-gray-600">{selectedInsurance.startAge} years</p>
                    </div>
                  </div>
                  
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                    <span className="material-icons mr-1 text-sm">calculate</span>
                    Calculate My Premium
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
          
          {/* Tax Benefits Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="material-icons mr-2 text-green-600">savings</span>
              Insurance Tax Benefits Guide
            </h3>
            
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-base mb-4">Section 80C - Life Insurance</h4>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <span className="material-icons text-green-600">monetization_on</span>
                        </div>
                        <div>
                          <p className="font-medium">Up to ₹1,50,000 Deduction</p>
                          <p className="text-xs text-green-700">Combined limit with other 80C investments</p>
                        </div>
                      </div>
                      
                      <h5 className="text-sm font-medium mb-2">Eligible Policies:</h5>
                      <ul className="text-sm space-y-1 list-disc pl-4">
                        <li>Term Insurance Plans</li>
                        <li>Endowment Plans</li>
                        <li>ULIPs (Unit Linked Insurance Plans)</li>
                        <li>Whole Life Policies</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h5 className="text-sm font-medium mb-2">Important Conditions:</h5>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start">
                          <span className="material-icons text-blue-600 mr-2 text-sm">info</span>
                          <span>Premium should not exceed 10% of sum assured (20% for policies issued before April 1, 2012)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-blue-600 mr-2 text-sm">info</span>
                          <span>For ULIP policies issued after Feb 1, 2021, annual premium should not exceed ₹2.5 lakh for tax benefits</span>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-blue-600 mr-2 text-sm">info</span>
                          <span>Policy should be in force for minimum 2 years (5 years for policies issued after April 1, 2012)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-base mb-4">Section 80D - Health Insurance</h4>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <span className="material-icons text-purple-600">health_and_safety</span>
                        </div>
                        <div>
                          <p className="font-medium">Up to ₹1,00,000 Total Deduction</p>
                          <p className="text-xs text-purple-700">Separate from 80C benefits</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded-lg border border-purple-100">
                          <p className="text-sm font-medium">Self, Spouse & Children</p>
                          <ul className="text-xs space-y-1 mt-1">
                            <li>• Up to ₹25,000 (Age less than 60)</li>
                            <li>• Up to ₹50,000 (Age 60 or above)</li>
                          </ul>
                        </div>
                        
                        <div className="bg-white p-3 rounded-lg border border-purple-100">
                          <p className="text-sm font-medium">Parents</p>
                          <ul className="text-xs space-y-1 mt-1">
                            <li>• Up to ₹25,000 (Age less than 60)</li>
                            <li>• Up to ₹50,000 (Age 60 or above)</li>
                          </ul>
                        </div>
                      </div>
                      
                      <p className="text-xs text-purple-700 mt-3">
                        <strong>Example:</strong> If you (age 40) buy health insurance for yourself and your senior citizen parents (age 65),
                        you can claim up to ₹75,000 (₹25,000 + ₹50,000) as deduction.
                      </p>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                      <h5 className="text-sm font-medium mb-2">Additional Benefits:</h5>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start">
                          <span className="material-icons text-amber-600 mr-2 text-sm">add_circle</span>
                          <span>Preventive health check-up expenses up to ₹5,000 included in the 80D limit</span>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-amber-600 mr-2 text-sm">add_circle</span>
                          <span>Medical expenditure on senior citizens (with no insurance) eligible for deduction up to ₹50,000</span>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-amber-600 mr-2 text-sm">add_circle</span>
                          <span>Payment modes: Cheque or online transfer (cash only for preventive health check-ups)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-base mb-2 flex items-center">
                    <span className="material-icons mr-2 text-blue-600">assignment</span>
                    How to Claim Tax Benefits
                  </h4>
                  
                  <ol className="text-sm space-y-2 list-decimal pl-5">
                    <li><strong>Keep receipts:</strong> Maintain all premium payment receipts and policy documents</li>
                    <li><strong>Submit to employer:</strong> Provide policy details to your employer for TDS calculation</li>
                    <li><strong>ITR Filing:</strong> Claim deductions in the appropriate sections while filing your ITR</li>
                    <li><strong>Form 16:</strong> Verify that deductions are reflected correctly in your Form 16</li>
                  </ol>
                  
                  <div className="bg-blue-50 p-3 rounded-lg mt-3 border border-blue-100">
                    <p className="text-xs text-blue-700">
                      <strong>New Tax Regime Note:</strong> Under the new tax regime (optional from FY 2020-21), 
                      deductions under Section 80C and 80D are not available. Consider your total tax liability 
                      under both regimes before choosing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
      
          {/* Expert Tips Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="material-icons mr-2 text-amber-500">tips_and_updates</span>
              Expert Insurance Tips
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {insuranceTips.map((tip) => (
                <Card 
                  key={tip.id} 
                  className="overflow-hidden border-t-4 hover:shadow-md transition-all"
                  style={{ borderTopColor: tip.color }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                        style={{ backgroundColor: `${tip.color}15` }}
                      >
                        <span className="material-icons text-sm" style={{ color: tip.color }}>
                          {tip.icon}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1">{tip.title}</h4>
                        <p className="text-xs text-gray-600">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Quiz Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="material-icons mr-2 text-purple-500">quiz</span>
              Test Your Insurance Knowledge
            </h3>
            
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                {!quizCompleted ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">Question {currentQuestion + 1} of {quizQuestions.length}</span>
                      <span className="text-sm font-medium">Score: {score}/{currentQuestion}</span>
                    </div>
                    
                    <Progress 
                      value={((currentQuestion + 1) / quizQuestions.length) * 100} 
                      className="h-2 mb-6"
                    />
                    
                    <h4 className="text-base font-medium mb-4">
                      {quizQuestions[currentQuestion].question}
                    </h4>
                    
                    <div className="space-y-3 mb-6">
                      {quizQuestions[currentQuestion].options.map(option => (
                        <div
                          key={option.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            selectedAnswer === option.id
                              ? option.isCorrect
                                ? "border-green-500 bg-green-50"
                                : "border-red-500 bg-red-50"
                              : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                          onClick={() => !selectedAnswer && handleAnswerSelect(option.id)}
                        >
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center mr-3 flex-shrink-0">
                              {selectedAnswer === option.id && (
                                <span className={`material-icons text-xs ${
                                  option.isCorrect ? "text-green-500" : "text-red-500"
                                }`}>
                                  {option.isCorrect ? "check" : "close"}
                                </span>
                              )}
                              {!selectedAnswer && <span className="text-xs font-medium">{option.id}</span>}
                            </div>
                            <span className="text-sm">{option.text}</span>
                          </div>
                          
                          {selectedAnswer === option.id && showExplanation && (
                            <div className={`mt-2 text-xs p-2 rounded ${
                              option.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}>
                              {option.explanation}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {selectedAnswer && (
                      <Button 
                        onClick={handleNextQuestion} 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
                      </Button>
                    )}
                  </>
                ) : (
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="material-icons text-blue-600 text-4xl">
                        {score / quizQuestions.length >= 0.7 ? "emoji_events" : "school"}
                      </span>
                    </div>
                    
                    <h4 className="text-xl font-medium mb-2">Quiz Completed!</h4>
                    <p className="text-gray-600 mb-4">
                      You scored {score} out of {quizQuestions.length} 
                      ({Math.round((score / quizQuestions.length) * 100)}%)
                    </p>
                    
                    <div className="mb-6 p-4 rounded-lg text-left bg-blue-50 border border-blue-100">
                      <h5 className="font-medium text-blue-800 mb-2">Your Insurance Knowledge Level:</h5>
                      <p className="text-blue-700 mb-1">
                        {score / quizQuestions.length >= 0.8 
                          ? "Expert! You have an excellent understanding of insurance concepts."
                          : score / quizQuestions.length >= 0.6
                          ? "Intermediate. You understand most insurance concepts but could benefit from more learning."
                          : "Beginner. Consider learning more about insurance basics to make better decisions."}
                      </p>
                      <p className="text-sm text-blue-600 mt-3">
                        {score / quizQuestions.length >= 0.8 
                          ? "Focus on optimizing your coverage and comparing advanced features."
                          : score / quizQuestions.length >= 0.6
                          ? "Review policy terms carefully and ask questions before purchasing."
                          : "Start with the basics and consider consulting an insurance advisor."}
                      </p>
                    </div>
                    
                    <Button onClick={resetQuiz} className="w-full bg-blue-600 hover:bg-blue-700">
                      Retake Quiz
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* CALCULATE TAB - Insurance Calculators */}
        <TabsContent value="calculate" className="mt-6">
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100 rounded-lg p-4 mb-6">
            <h3 className="text-amber-800 text-base font-medium mb-1 flex items-center">
              <span className="material-icons mr-2 text-amber-600">lightbulb</span>
              Why Use Insurance Calculators?
            </h3>
            <p className="text-sm text-amber-700">
              Insurance calculators help you determine the right coverage amount based on your personal situation,
              ensuring you're neither underinsured (risking financial hardship) nor overinsured (paying unnecessary premiums).
            </p>
          </div>
          
          <div className="mb-6">
            <Tabs value={calculatorTab} onValueChange={(val) => setCalculatorTab(val as "term" | "health")}>
              <TabsList className="bg-gray-100 rounded-full w-full p-1 mb-6">
                <TabsTrigger 
                  value="term" 
                  className="rounded-full flex-1 px-6 py-1.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <span className="material-icons mr-1 text-sm">person</span>
                  Term Life Calculator
                </TabsTrigger>
                <TabsTrigger 
                  value="health" 
                  className="rounded-full flex-1 px-6 py-1.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <span className="material-icons mr-1 text-sm">health_and_safety</span>
                  Health Insurance Calculator
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="term">
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Term Life Insurance Calculator</CardTitle>
                    <CardDescription>
                      Find out how much coverage you need and estimate your premium
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <div className="mb-4">
                          <Label htmlFor="age" className="text-sm">Your Age</Label>
                          <div className="mt-1 flex items-center">
                            <Input 
                              id="age"
                              type="number" 
                              value={age} 
                              onChange={(e) => setAge(Number(e.target.value))}
                              className="w-full"
                            />
                            <span className="ml-2 text-sm text-gray-500">Years</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <Label htmlFor="income" className="text-sm">Annual Income</Label>
                          <div className="mt-1 flex items-center">
                            <span className="mr-2 text-sm font-medium">₹</span>
                            <Input 
                              id="income"
                              type="number" 
                              value={income} 
                              onChange={(e) => setIncome(Number(e.target.value))}
                              className="w-full"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Your current yearly income before tax</p>
                        </div>
                        
                        <div className="mb-4">
                          <Label htmlFor="dependents" className="text-sm">Financial Dependents</Label>
                          <div className="mt-1 flex items-center space-x-2">
                            <Button 
                              type="button" 
                              variant="outline"
                              size="sm"
                              onClick={() => setDependents(Math.max(0, dependents - 1))}
                              className="h-10 w-10 p-0"
                            >
                              <span className="material-icons">remove</span>
                            </Button>
                            
                            <div className="bg-white border rounded-md h-10 px-4 flex items-center justify-center font-medium">
                              {dependents}
                            </div>
                            
                            <Button 
                              type="button" 
                              variant="outline"
                              size="sm"
                              onClick={() => setDependents(dependents + 1)}
                              className="h-10 w-10 p-0"
                            >
                              <span className="material-icons">add</span>
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">People who depend on your income</p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-4">
                          <Label htmlFor="term-years" className="text-sm">Policy Term</Label>
                          <div className="mt-1">
                            <Slider
                              id="term-years"
                              value={[termYears]}
                              min={10}
                              max={40}
                              step={5}
                              onValueChange={(vals) => setTermYears(vals[0])}
                              className="py-4"
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>10 years</span>
                              <span>{termYears} years</span>
                              <span>40 years</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label className="text-sm flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={smoker}
                                onChange={(e) => setSmoker(e.target.checked)}
                                className="mr-2 h-4 w-4"
                              />
                              Smoker/Tobacco User
                            </Label>
                          </div>
                          
                          <div>
                            <Label className="text-sm flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={healthConditions}
                                onChange={(e) => setHealthConditions(e.target.checked)}
                                className="mr-2 h-4 w-4"
                              />
                              Pre-existing Conditions
                            </Label>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-4">
                          <p className="text-xs text-blue-700">
                            <strong>Tip:</strong> Experts recommend coverage of 10-15 times your annual income. 
                            This provides adequate financial security for your dependents.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={calculateTermPremium} 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {showCalculatorAnimation ? (
                        <div className="flex items-center justify-center">
                          <span className="animate-spin h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full"></span>
                          Calculating...
                        </div>
                      ) : (
                        <>
                          <span className="material-icons mr-1 text-sm">calculate</span>
                          Calculate Premium
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
                
                {termResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 pb-4">
                        <CardTitle className="text-lg">Your Term Insurance Recommendation</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <div className="mb-6">
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Recommended Coverage</h4>
                              <p className="text-3xl font-bold text-green-600">
                                ₹{Math.round(termResult.coverage / 100000)} Lakhs
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Based on your income, dependents, and age
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Estimated Annual Premium</h4>
                              <p className="text-3xl font-bold text-blue-600">
                                ₹{termResult.premium.toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                ₹{Math.round(termResult.premium / 12).toLocaleString()} monthly
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-3">Recommended Riders</h4>
                            <div className="space-y-3">
                              {termResult.riders.map((rider, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-3">
                                  <div className="flex justify-between items-start mb-1">
                                    <p className="text-sm font-medium">{rider.name}</p>
                                    <Badge variant="outline" className="ml-2">+₹{rider.cost.toLocaleString()}/year</Badge>
                                  </div>
                                  <p className="text-xs text-gray-600">{rider.benefit}</p>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-4 bg-amber-50 border border-amber-100 rounded-lg p-3">
                              <p className="text-xs text-amber-700">
                                <strong>Note:</strong> Actual premiums may vary based on detailed health assessment
                                and insurer underwriting guidelines. Riders are optional add-ons to enhance your coverage.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="bg-gray-50 px-6 py-4 flex flex-wrap gap-3 justify-between">
                        <div>
                          <Button variant="outline" size="sm">
                            <span className="material-icons mr-1 text-sm">share</span>
                            Share Results
                          </Button>
                        </div>
                        <div>
                          <Button variant="outline" size="sm" className="mr-2">
                            <span className="material-icons mr-1 text-sm">print</span>
                            Print
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <span className="material-icons mr-1 text-sm">compare_arrows</span>
                            Compare Policies
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}
              </TabsContent>
              
              <TabsContent value="health">
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Health Insurance Calculator</CardTitle>
                    <CardDescription>
                      Calculate your ideal health coverage based on your family size and location
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <div className="mb-4">
                          <Label htmlFor="health-age" className="text-sm">Primary Member's Age</Label>
                          <div className="mt-1 flex items-center">
                            <Input 
                              id="health-age"
                              type="number" 
                              value={healthAge} 
                              onChange={(e) => setHealthAge(Number(e.target.value))}
                              className="w-full"
                            />
                            <span className="ml-2 text-sm text-gray-500">Years</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <Label htmlFor="family-size" className="text-sm">Family Size</Label>
                          <div className="mt-1 flex items-center space-x-2">
                            <Button 
                              type="button" 
                              variant="outline"
                              size="sm"
                              onClick={() => setFamilySize(Math.max(1, familySize - 1))}
                              className="h-10 w-10 p-0"
                            >
                              <span className="material-icons">remove</span>
                            </Button>
                            
                            <div className="bg-white border rounded-md h-10 px-4 flex items-center justify-center font-medium">
                              {familySize}
                            </div>
                            
                            <Button 
                              type="button" 
                              variant="outline"
                              size="sm"
                              onClick={() => setFamilySize(familySize + 1)}
                              className="h-10 w-10 p-0"
                            >
                              <span className="material-icons">add</span>
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Total members to be covered (including you)</p>
                        </div>
                        
                        <div className="mb-4">
                          <Label className="text-sm mb-2 block">City Category</Label>
                          <div className="flex gap-4">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="tier1"
                                name="city"
                                checked={city === "tier1"}
                                onChange={() => setCity("tier1")}
                                className="mr-2"
                              />
                              <Label htmlFor="tier1" className="text-sm cursor-pointer">
                                Tier 1 (Metro)
                              </Label>
                            </div>
                            
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="tier2"
                                name="city"
                                checked={city === "tier2"}
                                onChange={() => setCity("tier2")}
                                className="mr-2"
                              />
                              <Label htmlFor="tier2" className="text-sm cursor-pointer">
                                Tier 2
                              </Label>
                            </div>
                            
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="tier3"
                                name="city"
                                checked={city === "tier3"}
                                onChange={() => setCity("tier3")}
                                className="mr-2"
                              />
                              <Label htmlFor="tier3" className="text-sm cursor-pointer">
                                Tier 3
                              </Label>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Medical expenses vary by location
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-4">
                          <Label className="text-sm flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preExistingCondition}
                              onChange={(e) => setPreExistingCondition(e.target.checked)}
                              className="mr-2 h-4 w-4"
                            />
                            Pre-existing Medical Conditions
                          </Label>
                          <p className="text-xs text-gray-500 mt-1 ml-6">
                            Any diseases or conditions diagnosed before buying insurance
                          </p>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                          <h4 className="text-sm font-medium text-blue-800 mb-2">Recommended Coverage Amount</h4>
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="rounded bg-white p-2 border border-blue-100">
                              <p className="text-xs text-gray-600">Individual</p>
                              <p className="font-medium">5-10 Lakhs</p>
                            </div>
                            <div className="rounded bg-white p-2 border border-blue-100">
                              <p className="text-xs text-gray-600">Family</p>
                              <p className="font-medium">15-25 Lakhs</p>
                            </div>
                          </div>
                          <p className="text-xs text-blue-700">
                            A single hospitalization in a private hospital can cost ₹3-5 lakhs for 
                            moderate procedures. Consider higher coverage for larger families.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={calculateHealthPremium} 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {showCalculatorAnimation ? (
                        <div className="flex items-center justify-center">
                          <span className="animate-spin h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full"></span>
                          Calculating...
                        </div>
                      ) : (
                        <>
                          <span className="material-icons mr-1 text-sm">calculate</span>
                          Calculate Premium
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
                
                {healthResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 pb-4">
                        <CardTitle className="text-lg">Your Health Insurance Recommendation</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <div className="mb-6">
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Recommended Coverage</h4>
                              <p className="text-3xl font-bold text-green-600">
                                ₹{Math.round(healthResult.coverage / 100000)} Lakhs
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Based on your family size and location
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Estimated Annual Premium</h4>
                              <p className="text-3xl font-bold text-blue-600">
                                ₹{healthResult.premium.toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                ₹{Math.round(healthResult.premium / 12).toLocaleString()} monthly
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <div className="mb-4">
                              <h4 className="text-sm font-medium mb-2">Policy Features</h4>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="border border-gray-200 rounded-lg p-3">
                                  <div className="flex items-center mb-1">
                                    <span className="material-icons text-amber-500 mr-1 text-sm">hourglass_bottom</span>
                                    <p className="text-sm font-medium">Waiting Period</p>
                                  </div>
                                  <p className="text-lg font-semibold">{healthResult.waiting} Years</p>
                                  <p className="text-xs text-gray-500">For pre-existing conditions</p>
                                </div>
                                
                                <div className="border border-gray-200 rounded-lg p-3">
                                  <div className="flex items-center mb-1">
                                    <span className="material-icons text-blue-500 mr-1 text-sm">local_hospital</span>
                                    <p className="text-sm font-medium">Network Hospitals</p>
                                  </div>
                                  <p className="text-lg font-semibold">{healthResult.hospitals.toLocaleString()}+</p>
                                  <p className="text-xs text-gray-500">For cashless treatment</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                              <p className="text-xs text-amber-700">
                                <strong>Note:</strong> This is an estimate based on standard policies. Actual premiums vary 
                                based on detailed health assessment, age of all members, and insurer guidelines. 
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="bg-gray-50 px-6 py-4 flex flex-wrap gap-3 justify-between">
                        <div>
                          <Button variant="outline" size="sm">
                            <span className="material-icons mr-1 text-sm">share</span>
                            Share Results
                          </Button>
                        </div>
                        <div>
                          <Button variant="outline" size="sm" className="mr-2">
                            <span className="material-icons mr-1 text-sm">print</span>
                            Print
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <span className="material-icons mr-1 text-sm">compare_arrows</span>
                            Compare Policies
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
        
        {/* COMPARE TAB - Insurance Companies */}
        <TabsContent value="compare" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
            {insuranceTypes.map((type) => (
              <div 
                key={type.id}
                className={`border rounded-xl p-3 flex flex-col items-center cursor-pointer transition-all hover:shadow-md ${
                  activeType === type.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-200'
                }`}
                onClick={() => setActiveType(type.id)}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${type.color}20` }}
                >
                  <span className="material-icons" style={{ color: type.color }}>{type.icon}</span>
                </div>
                <span className="text-sm font-medium text-center">{type.name}</span>
              </div>
            ))}
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Best {insuranceTypes.find(t => t.id === activeType)?.name} Providers
              </h3>
              <Button variant="outline" size="sm">
                <span className="material-icons mr-1 text-sm">filter_list</span>
                Filter
              </Button>
            </div>
            
            {filteredCompanies.length > 0 ? (
              <div className="space-y-4">
                {filteredCompanies.map((company) => (
                  <Card key={company.id} className="overflow-hidden hover:shadow-md transition-all">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 md:border-r border-gray-100">
                          <div className="flex items-start">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-3 flex-shrink-0">
                              <span className="material-icons text-blue-600">{company.logo}</span>
                            </div>
                            <div>
                              <h4 className="font-medium">{company.name}</h4>
                              <div>{getStarRating(company.rating)}</div>
                              {company.highlight && (
                                <Badge variant="outline" className="mt-1 text-xs bg-blue-50 text-blue-700 border-blue-200">
                                  {company.highlight}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="px-4 py-2 md:py-4">
                          <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Claim Settlement Ratio</p>
                              <div className="flex items-center">
                                <Progress 
                                  value={company.claimSettlementRatio} 
                                  className="h-2 w-16 mr-2"
                                />
                                <span className="text-sm font-semibold">
                                  {company.claimSettlementRatio}%
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Avg. Claim Time</p>
                              <p className="text-sm font-semibold">{company.avgClaimTime} days</p>
                            </div>
                            
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Transparency</p>
                              <div className="flex items-center">
                                <div 
                                  className={`w-3 h-3 rounded-full mr-2 ${
                                    company.transparency === "High" 
                                      ? "bg-green-500" 
                                      : company.transparency === "Medium"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                  }`}
                                ></div>
                                <p className="text-sm font-semibold">{company.transparency}</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Max Coverage</p>
                              <p className="text-sm font-semibold">₹{company.coverageCapacity/100000} Lakhs</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 flex flex-col justify-between">
                          <div>
                            <h5 className="text-sm font-medium mb-2">Special Features</h5>
                            <ul className="text-xs space-y-1">
                              {company.specialFeatures.map((feature, idx) => (
                                <li key={idx} className="flex items-center">
                                  <span className="material-icons text-green-500 mr-1 text-xs">check_circle</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="mt-4 flex flex-col sm:flex-row gap-2">
                            <Button variant="outline" size="sm" className="flex-1 text-xs">
                              <span className="material-icons mr-1 text-xs">visibility</span>
                              View Details
                            </Button>
                            <Button size="sm" className="flex-1 text-xs bg-blue-600 hover:bg-blue-700">
                              <span className="material-icons mr-1 text-xs">calculate</span>
                              Get Quote
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed rounded-lg">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="material-icons text-gray-400">search_off</span>
                </div>
                <h4 className="text-base font-medium mb-1">No providers found</h4>
                <p className="text-sm text-gray-500">
                  Try selecting a different insurance type or check back later
                </p>
              </div>
            )}
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Comparison Criteria Explained</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="material-icons text-green-600">verified</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Claim Settlement Ratio (CSR)</h4>
                      <p className="text-xs text-gray-600">
                        Percentage of claims settled out of total claims received in a financial year.
                        Higher CSR indicates better chances of your claim being approved.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="material-icons text-blue-600">schedule</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Average Claim Time</h4>
                      <p className="text-xs text-gray-600">
                        Average number of days taken to settle a claim after all documentation is submitted.
                        Faster settlements provide peace of mind during emergencies.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="material-icons text-purple-600">visibility</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Transparency Rating</h4>
                      <p className="text-xs text-gray-600">
                        Measures how clearly policy terms, exclusions, and claim processes are communicated.
                        Higher transparency means fewer surprises during claims.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* CLAIM READY TAB - Claim Process & Trust Meter */}
        <TabsContent value="claim" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Claim Process Explained</h3>
              
              <div className="bg-white rounded-lg border shadow p-4">
                <div className="relative">
                  {claimSteps.map((step, index) => (
                    <div key={step.id} className="flex mb-6 last:mb-0">
                      <div className="flex flex-col items-center mr-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          {step.id}
                        </div>
                        {index < claimSteps.length - 1 && (
                          <div className="w-0.5 h-full bg-blue-200 my-1"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 flex items-center">
                          <span className="material-icons mr-2 text-blue-600 text-sm">{step.icon}</span>
                          {step.title}
                        </h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Claim-Ready Assessment</h3>
              
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-base font-medium mb-4 flex items-center">
                    <span className="material-icons mr-2 text-blue-600">verified_user</span>
                    Am I Claim-Ready?
                  </h4>
                  
                  <div className="space-y-3 mb-6">
                    {Object.entries(confidenceAnswers).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <Label htmlFor={key} className="text-sm cursor-pointer flex items-center">
                          <input
                            type="checkbox"
                            id={key}
                            checked={value}
                            onChange={() => setConfidenceAnswers({...confidenceAnswers, [key]: !value})}
                            className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          {key === "disclosures" && "Disclosed all pre-existing conditions?"}
                          {key === "nominee" && "Listed correct nominee information?"}
                          {key === "exclusions" && "Read & understood policy exclusions?"}
                          {key === "documents" && "Original policy documents safely stored?"}
                          {key === "network" && "Know my insurer's network hospitals?"}
                          {key === "family" && "Shared policy details with family members?"}
                        </Label>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <span className="material-icons text-gray-400 text-sm">info</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs max-w-xs">
                                {key === "disclosures" && "Non-disclosure is the #1 reason for claim rejections. Always declare all health conditions."}
                                {key === "nominee" && "Ensure nominee details are updated after major life events like marriage."}
                                {key === "exclusions" && "Understanding what's not covered helps avoid surprise rejections."}
                                {key === "documents" && "Keep original policy documents accessible for emergencies."}
                                {key === "network" && "Using network hospitals enables cashless claims in emergencies."}
                                {key === "family" && "Family should know policy details in case you're incapacitated."}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    onClick={calculateClaimReadiness}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {showTrustMeterAnimation ? (
                      <div className="flex items-center justify-center">
                        <span className="animate-spin h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full"></span>
                        Analyzing...
                      </div>
                    ) : (
                      <>
                        <span className="material-icons mr-1 text-sm">analytics</span>
                        Calculate My Score
                      </>
                    )}
                  </Button>
                  
                  {confidenceScore !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-6"
                    >
                      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-100 p-4">
                        <h5 className="font-medium text-blue-800 mb-2">Your Claim-Ready Score</h5>
                        
                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Readiness Level</span>
                            <span className="text-sm font-bold">{confidenceScore}%</span>
                          </div>
                          <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${confidenceScore}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className={`h-full rounded-full ${getConfidenceLevel(confidenceScore).color}`}
                            ></motion.div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-blue-700 mb-3">
                          <strong>Status:</strong> {getConfidenceLevel(confidenceScore).message}
                        </p>
                        
                        {confidenceScore < 80 && (
                          <div>
                            <p className="text-xs font-medium text-blue-800 mb-1">Improvement Suggestions:</p>
                            <ul className="text-xs text-blue-700 space-y-1 list-disc pl-4">
                              {!confidenceAnswers.disclosures && (
                                <li>Ensure all pre-existing conditions are disclosed to your insurer</li>
                              )}
                              {!confidenceAnswers.nominee && (
                                <li>Update nominee details in your policy documentation</li>
                              )}
                              {!confidenceAnswers.exclusions && (
                                <li>Review policy exclusions to understand coverage limitations</li>
                              )}
                              {!confidenceAnswers.documents && (
                                <li>Organize and securely store your original policy documents</li>
                              )}
                              {!confidenceAnswers.network && (
                                <li>Keep a list of network hospitals to access cashless facilities</li>
                              )}
                              {!confidenceAnswers.family && (
                                <li>Share policy details with trusted family members</li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Common Claim Pitfalls to Avoid</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {commonPitfalls.map((pitfall) => (
                <Card key={pitfall.id} className="overflow-hidden">
                  <CardHeader className="bg-red-50 pb-2">
                    <CardTitle className="text-base flex items-center text-red-800">
                      <span className="material-icons mr-2 text-red-600 text-sm">{pitfall.icon}</span>
                      {pitfall.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-600 mb-3">{pitfall.description}</p>
                    
                    <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                      <h5 className="text-xs font-medium text-green-800 mb-1 flex items-center">
                        <span className="material-icons mr-1 text-green-600 text-xs">lightbulb</span>
                        Solution
                      </h5>
                      <p className="text-xs text-green-700">{pitfall.solution}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 pb-6">
        <p className="text-xs text-gray-500 text-center">
          © 2025 RupeeSmart. All rights reserved. The information provided is for education purposes only.
          <br />RupeeSmart does not sell, recommend, or process insurance claims.
        </p>
      </div>
    </div>
  );
}