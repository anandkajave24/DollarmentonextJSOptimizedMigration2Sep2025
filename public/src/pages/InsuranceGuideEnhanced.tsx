import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { Progress } from "../components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

type InsuranceType = {
  id: string;
  name: string;
  description: string;
  importance: string;
  coverTypes: string[];
  keyFeatures: string[];
  bestFor: string[];
  considerations: string[];
  icon: string;
};

type CompanyType = {
  id: string;
  name: string;
  insuranceTypes: string[];
  rating: number;
  claimSettlementRatio: number;
  logoIcon: string;
  avgClaimTime?: number;
  transparency?: string;
};

type InsuranceTip = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type ConfidenceQuestion = {
  id: string;
  question: string;
};

type ClaimReadinessScore = {
  score: number;
  status: "poor" | "average" | "good" | "excellent";
  color: string;
  message: string;
};

export default function InsuranceGuideEnhanced() {
  const { toast } = useToast();
  const [age, setAge] = useState<string>("");
  const [income, setIncome] = useState<string>("");
  const [dependents, setDependents] = useState<string>("");
  const [selectedInsuranceType, setSelectedInsuranceType] = useState<string>("all");
  
  // For claim readiness assessment
  const [confidenceAnswers, setConfidenceAnswers] = useState<{[key: string]: boolean}>({
    disclosed: false,
    nominee: false,
    exclusions: false,
    waiting: false,
    shared: false
  });
  const [confidenceScore, setConfidenceScore] = useState<ClaimReadinessScore | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  
  const insuranceTypes: InsuranceType[] = [
    {
      id: "term",
      name: "Term Life Insurance",
      description: "Provides coverage for a specified term with death benefits paid to nominees if the insured dies during the policy term.",
      importance: "Essential for those with dependents relying on their income.",
      coverTypes: [
        "Level Term Plans",
        "Increasing Term Plans",
        "Decreasing Term Plans",
        "Return of Premium Plans"
      ],
      keyFeatures: [
        "High coverage at affordable premiums",
        "Pure risk cover without investment component",
        "Tax benefits under Section 80C",
        "Riders for additional protection"
      ],
      bestFor: [
        "Primary income earners",
        "Those with financial dependents",
        "Loan protection",
        "Young adults starting families"
      ],
      considerations: [
        "No maturity benefits if you survive the term (except TROP)",
        "Choose adequate coverage (10-15x annual income)",
        "Consider inflation when deciding coverage",
        "Check claim settlement ratio of insurer"
      ],
      icon: "person_alert"
    },
    {
      id: "health",
      name: "Health Insurance",
      description: "Covers medical expenses for hospitalization, treatments, and sometimes outpatient care.",
      importance: "Critical for managing healthcare costs and protecting savings from medical emergencies.",
      coverTypes: [
        "Individual Health Plans",
        "Family Floater Plans",
        "Senior Citizen Plans",
        "Critical Illness Plans",
        "Group Health Insurance"
      ],
      keyFeatures: [
        "Cashless hospitalization at network hospitals",
        "Coverage for pre and post hospitalization expenses",
        "No-claim bonus benefits",
        "Tax benefits under Section 80D"
      ],
      bestFor: [
        "Everyone regardless of age",
        "Those with family health concerns",
        "Self-employed individuals",
        "Senior citizens"
      ],
      considerations: [
        "Check for waiting periods for pre-existing conditions",
        "Understand sub-limits and room rent capping",
        "Consider coverage adequacy (min. 5-10 lakhs)",
        "Check network hospitals in your area"
      ],
      icon: "medical_services"
    },
    {
      id: "motor",
      name: "Motor Insurance",
      description: "Provides financial protection against physical damage and/or bodily injury resulting from traffic accidents and theft.",
      importance: "Mandatory by law for all vehicle owners in India.",
      coverTypes: [
        "Third-party Liability (mandatory)",
        "Comprehensive Cover",
        "Own Damage Cover",
        "Zero Depreciation Cover"
      ],
      keyFeatures: [
        "Third-party liability coverage (mandatory)",
        "Own damage coverage (in comprehensive plans)",
        "Personal accident cover for owner-driver",
        "Add-on covers for enhanced protection"
      ],
      bestFor: [
        "All vehicle owners (third-party is mandatory)",
        "New vehicle owners (comprehensive recommended)",
        "Those in areas with higher accident rates",
        "Expensive vehicles (zero dep recommended)"
      ],
      considerations: [
        "Third-party insurance is mandatory by law",
        "Consider NCB (No Claim Bonus) benefits",
        "Check for IDV (Insured Declared Value) calculation",
        "Understand what's not covered (exclusions)"
      ],
      icon: "directions_car"
    },
    {
      id: "home",
      name: "Home Insurance",
      description: "Protects your home and belongings against damages from fire, natural disasters, theft, and other perils.",
      importance: "Essential for homeowners to protect their biggest asset.",
      coverTypes: [
        "Structure Insurance",
        "Contents Insurance",
        "Combined Structure and Contents",
        "Personal Belongings Cover"
      ],
      keyFeatures: [
        "Coverage for building structure against damages",
        "Protection for household contents",
        "Coverage against natural calamities",
        "Third-party liability coverage"
      ],
      bestFor: [
        "Homeowners",
        "Those living in disaster-prone areas",
        "Those with valuable possessions at home",
        "Tenants (for contents insurance)"
      ],
      considerations: [
        "Ensure correct valuation of property and contents",
        "Check if jewelry/valuables need separate coverage",
        "Understand exclusions (wear and tear, etc.)",
        "Consider add-ons for enhanced protection"
      ],
      icon: "house"
    },
    {
      id: "travel",
      name: "Travel Insurance",
      description: "Covers unforeseen events during travel like medical emergencies, trip cancellations, lost luggage, etc.",
      importance: "Essential for international travel; recommended for domestic trips.",
      coverTypes: [
        "Single Trip Plans",
        "Multi-Trip Annual Plans",
        "Domestic Travel Insurance",
        "International Travel Insurance",
        "Student Travel Insurance"
      ],
      keyFeatures: [
        "Medical expenses coverage abroad",
        "Trip cancellation/interruption benefits",
        "Lost baggage and passport assistance",
        "Emergency evacuation coverage"
      ],
      bestFor: [
        "International travelers",
        "Frequent travelers (annual multi-trip)",
        "Students going abroad for studies",
        "Business travelers"
      ],
      considerations: [
        "Check coverage limits for medical expenses",
        "Ensure coverage for specific destinations",
        "Read exclusions related to adventure activities",
        "Consider pre-existing condition coverage"
      ],
      icon: "flight"
    }
  ];
  
  const insuranceTips: InsuranceTip[] = [
    {
      id: "early",
      title: "Buy Early = Low Premiums",
      description: "Purchasing insurance at a younger age typically results in significantly lower premium rates that remain fixed throughout the policy term.",
      icon: "savings"
    },
    {
      id: "disclose",
      title: "Disclose Everything = No Rejection",
      description: "Full disclosure of medical history and other relevant information ensures your claims won't be rejected due to non-disclosure.",
      icon: "fact_check"
    },
    {
      id: "understand",
      title: "Understand Policy = No Surprises",
      description: "Take time to read the policy documents, especially the exclusions and waiting periods, to avoid surprises during claim time.",
      icon: "menu_book"
    },
    {
      id: "csr",
      title: "Check CSR = Higher Approval Rate",
      description: "Choose insurers with high Claim Settlement Ratios (CSR) for better chances of claim approval and faster processing.",
      icon: "verified"
    }
  ];
  
  const confidenceQuestions: ConfidenceQuestion[] = [
    {
      id: "disclosed",
      question: "Disclosed all pre-existing illnesses?"
    },
    {
      id: "nominee",
      question: "Listed nominee correctly?"
    },
    {
      id: "exclusions",
      question: "Read all policy exclusions?"
    },
    {
      id: "waiting",
      question: "Know your policy waiting period?"
    },
    {
      id: "shared",
      question: "Shared policy details with family?"
    }
  ];

  const insuranceCompanies: CompanyType[] = [
    {
      id: "lic",
      name: "Life Insurance Corporation of India",
      insuranceTypes: ["term"],
      rating: 4.2,
      claimSettlementRatio: 98.7,
      logoIcon: "shield",
      avgClaimTime: 8.5,
      transparency: "Medium"
    },
    {
      id: "hdfc",
      name: "HDFC Life",
      insuranceTypes: ["term", "health"],
      rating: 4.5,
      claimSettlementRatio: 97.8,
      logoIcon: "shield",
      avgClaimTime: 6.2,
      transparency: "High"
    },
    {
      id: "maxlife",
      name: "Max Life Insurance",
      insuranceTypes: ["term"],
      rating: 4.3,
      claimSettlementRatio: 99.2,
      logoIcon: "shield",
      avgClaimTime: 5.8,
      transparency: "High"
    },
    {
      id: "starhealth",
      name: "Star Health Insurance",
      insuranceTypes: ["health"],
      rating: 4.0,
      claimSettlementRatio: 95.6,
      logoIcon: "shield",
      avgClaimTime: 7.3,
      transparency: "Medium"
    },
    {
      id: "bajaj",
      name: "Bajaj Allianz",
      insuranceTypes: ["motor", "health", "term", "travel", "home"],
      rating: 4.0,
      claimSettlementRatio: 93.2,
      logoIcon: "shield",
      avgClaimTime: 8.5,
      transparency: "Medium"
    },
    {
      id: "icici",
      name: "ICICI Lombard",
      insuranceTypes: ["motor", "health", "travel", "home"],
      rating: 4.2,
      claimSettlementRatio: 95.3,
      logoIcon: "shield",
      avgClaimTime: 7.1,
      transparency: "High"
    }
  ];
  
  const getFilteredCompanies = () => {
    if (selectedInsuranceType === "all") {
      return insuranceCompanies;
    }
    return insuranceCompanies.filter(company => 
      company.insuranceTypes.includes(selectedInsuranceType)
    );
  };
  
  const handleCalculate = () => {
    if (!age || !income || !dependents) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to get insurance recommendations.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    const ageNum = parseInt(age);
    const incomeNum = parseInt(income);
    const dependentsNum = parseInt(dependents);
    
    let recommendations = [];
    
    // Term life insurance recommendation
    const termCoverage = incomeNum * 10 * (dependentsNum > 0 ? 1.5 : 1);
    recommendations.push({
      type: "term",
      coverage: termCoverage,
      premium: Math.round(termCoverage * 0.0015 * (1 + (ageNum - 25) * 0.03))
    });
    
    // Health insurance recommendation
    let healthCoverage = 500000; // Base 5 lakhs
    if (incomeNum > 1000000) healthCoverage = 1000000; // 10 lakhs
    if (incomeNum > 2000000) healthCoverage = 1500000; // 15 lakhs
    
    const healthPremium = Math.round(healthCoverage * 0.02 * (1 + (ageNum - 25) * 0.04) * (dependentsNum > 0 ? (1 + dependentsNum * 0.5) : 1));
    
    recommendations.push({
      type: "health",
      coverage: healthCoverage,
      premium: healthPremium
    });
    
    toast({
      title: "Insurance Recommendations",
      description: (
        <div className="mt-2 text-sm">
          <p><strong>Term Life Coverage:</strong> ₹{termCoverage.toLocaleString()}</p>
          <p><strong>Estimated Premium:</strong> ₹{recommendations[0].premium.toLocaleString()}/year</p>
          <hr className="my-2" />
          <p><strong>Health Coverage:</strong> ₹{healthCoverage.toLocaleString()}</p>
          <p><strong>Estimated Premium:</strong> ₹{healthPremium.toLocaleString()}/year</p>
        </div>
      ),
      duration: 5000,
    });
  };
  
  const handleToggleAnswer = (questionId: string) => {
    setConfidenceAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };
  
  const calculateClaimReadiness = () => {
    // Count the number of "Yes" answers
    const trueCount = Object.values(confidenceAnswers).filter(value => value).length;
    const percentage = Math.round((trueCount / 5) * 100);
    
    let status: "poor" | "average" | "good" | "excellent";
    let color: string;
    let message: string;
    
    if (percentage < 40) {
      status = "poor";
      color = "bg-red-600";
      message = "Your claim readiness needs attention. Consider addressing these areas.";
    } else if (percentage < 60) {
      status = "average";
      color = "bg-yellow-500";
      message = "You're making progress! Address the remaining items to improve your readiness.";
    } else if (percentage < 80) {
      status = "good";
      color = "bg-blue-600";
      message = "Good preparation! Just a few more steps to be fully claim-ready.";
    } else {
      status = "excellent";
      color = "bg-green-600";
      message = "Well Prepared! You're positioned for smooth claim processing.";
    }
    
    setConfidenceScore({
      score: percentage,
      status,
      color,
      message
    });
    
    setShowResult(true);
  };
  
  const getStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="material-icons text-yellow-400 text-sm">star</span>
        ))}
        {hasHalfStar && <span className="material-icons text-yellow-400 text-sm">star_half</span>}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <span key={`empty-${i}`} className="material-icons text-yellow-400 text-sm">star_outline</span>
        ))}
      </div>
    );
  };

  return (
    <div className="px-4 py-3">
      <div className="flex items-center mb-4">
        <button 
          onClick={() => window.history.back()}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <h2 className="text-xl font-semibold">Insurance Guide</h2>
      </div>
      
      <Tabs defaultValue="types">
        <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-transparent p-0 border-0 w-full">
          <TabsTrigger value="types" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Types</TabsTrigger>
          <TabsTrigger value="calculator" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Calculator</TabsTrigger>
          <TabsTrigger value="companies" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Companies</TabsTrigger>
          <TabsTrigger value="trustmeter" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Trust Meter</TabsTrigger>
        </TabsList>
        
        {/* Insurance Types Tab */}
        <TabsContent value="types" className="space-y-4">
          {/* Insurance Categories - Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
            {insuranceTypes.map((type) => (
              <Card 
                key={type.id} 
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => document.getElementById(type.id)?.scrollIntoView({ behavior: 'smooth' })}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                    <span className="material-icons text-blue-600">{type.icon}</span>
                  </div>
                  <h3 className="font-medium text-sm mb-1">{type.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{type.description.split('.')[0]}.</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Detailed Insurance Type Information */}
          {insuranceTypes.map((insurance) => (
            <Card key={insurance.id} id={insurance.id} className="overflow-hidden scroll-mt-4">
              <CardContent className="p-0">
                <Accordion type="single" collapsible>
                  <AccordionItem value={insurance.id} className="border-0">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3">
                          <span className="material-icons text-primary">{insurance.icon}</span>
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium">{insurance.name}</h3>
                          <p className="text-xs text-gray-500">Essential for financial protection</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <p className="text-sm mb-3">{insurance.description}</p>
                      
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">Why it's Important</h4>
                        <p className="text-xs text-gray-700">{insurance.importance}</p>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">Types of Coverage</h4>
                        <div className="flex flex-wrap gap-1">
                          {insurance.coverTypes.map((type, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">Key Features</h4>
                        <ul className="text-xs text-gray-700 space-y-1 list-disc pl-4">
                          {insurance.keyFeatures.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">Best For</h4>
                        <ul className="text-xs text-gray-700 space-y-1 list-disc pl-4">
                          {insurance.bestFor.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Important Considerations</h4>
                        <ul className="text-xs text-gray-700 space-y-1 list-disc pl-4">
                          {insurance.considerations.map((consideration, index) => (
                            <li key={index}>{consideration}</li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        {/* Insurance Calculator Tab */}
        <TabsContent value="calculator" className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-medium text-blue-800 flex items-center">
              <span className="material-icons mr-2 text-blue-600">calculate</span>
              How Much Insurance Do I Need?
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              Our smart calculator helps you determine appropriate coverage based on your personal situation.
            </p>
          </div>

          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="age" className="text-sm font-medium flex items-center">
                    Your Age
                    <span className="material-icons ml-1 text-gray-400 text-sm">info</span>
                  </Label>
                  <div className="flex items-center mt-1">
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-sm text-gray-500">Years</span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="income" className="text-sm font-medium flex items-center">
                    Annual Income
                    <span className="material-icons ml-1 text-gray-400 text-sm">info</span>
                  </Label>
                  <div className="flex items-center mt-1">
                    <span className="text-sm font-medium mr-2">₹</span>
                    <Input
                      id="income"
                      type="number"
                      placeholder="Enter your annual income"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="dependents" className="text-sm font-medium flex items-center">
                    Number of Dependents
                    <span className="material-icons ml-1 text-gray-400 text-sm">info</span>
                  </Label>
                  <div className="flex items-center mt-1">
                    <div className="flex h-10 w-32 items-center rounded-md border border-input bg-background px-1">
                      <button 
                        type="button" 
                        className="h-8 w-8 rounded-md flex items-center justify-center text-muted-foreground hover:bg-gray-100"
                        onClick={() => setDependents(dependents && parseInt(dependents) > 0 ? (parseInt(dependents) - 1).toString() : "0")}
                      >
                        <span className="material-icons text-lg">remove</span>
                      </button>
                      <input
                        className="h-10 w-full border-0 bg-transparent p-0 text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        min={0}
                        max={10}
                        value={dependents}
                        onChange={(e) => setDependents(e.target.value)}
                        type="number"
                      />
                      <button 
                        type="button" 
                        className="h-8 w-8 rounded-md flex items-center justify-center text-muted-foreground hover:bg-gray-100"
                        onClick={() => setDependents(dependents ? (parseInt(dependents) + 1).toString() : "1")}
                      >
                        <span className="material-icons text-lg">add</span>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 ml-3">People who depend on your income</p>
                  </div>
                </div>
                
                <Button onClick={handleCalculate} className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
                  <span className="material-icons text-sm">calculate</span>
                  Calculate Coverage Needs
                </Button>

                <div className="mt-4 text-center">
                  <p className="text-sm font-medium text-gray-600 flex items-center justify-center">
                    <span className="material-icons mr-1 text-amber-500">lightbulb</span>
                    Tip: Experts suggest 10x your annual income for basic life cover
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <h3 className="text-base font-medium mb-4 flex items-center">
              <span className="material-icons mr-2 text-blue-600">tips_and_updates</span>
              Smart Insurance Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insuranceTips.map((tip) => (
                <Card key={tip.id} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-start">
                    <div className="rounded-full bg-blue-100 p-2 mr-3 flex-shrink-0">
                      <span className="material-icons text-blue-600">{tip.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{tip.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Insurance Companies Tab */}
        <TabsContent value="companies" className="space-y-4">
          <div className="mb-4">
            <Label htmlFor="typeFilter" className="text-sm font-medium mb-2 block">Filter by Insurance Type</Label>
            <select
              id="typeFilter"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedInsuranceType}
              onChange={(e) => setSelectedInsuranceType(e.target.value)}
            >
              <option value="all">All Insurance Types</option>
              <option value="term">Term Life Insurance</option>
              <option value="health">Health Insurance</option>
              <option value="motor">Motor Insurance</option>
              <option value="home">Home Insurance</option>
              <option value="travel">Travel Insurance</option>
            </select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CSR %</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Types</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getFilteredCompanies().map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 flex-shrink-0 mr-3 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="material-icons text-blue-600 text-sm">{company.logoIcon}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{company.name}</div>
                          <div className="text-xs text-gray-500">{company.avgClaimTime ? `${company.avgClaimTime} days avg. claim time` : ''}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStarRating(company.rating)}
                        <span className="ml-1 text-xs text-gray-500">{company.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{company.claimSettlementRatio}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-green-600 h-1.5 rounded-full" 
                          style={{ width: `${company.claimSettlementRatio}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {company.insuranceTypes.map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          Compare
                        </Button>
                        <Button size="sm" className="text-xs bg-blue-600 text-white hover:bg-blue-700">
                          Get Quote
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Company Trust Index */}
          <h3 className="text-base font-medium mt-6 mb-4 flex items-center">
            <span className="material-icons mr-2 text-blue-600">insights</span>
            Company Trust Index
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insuranceCompanies.slice(0, 3).map((company) => (
              <Card key={company.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <div className="w-8 h-8 mr-2 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="material-icons text-blue-600 text-sm">{company.logoIcon}</span>
                    </div>
                    {company.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 flex items-center">
                        <span className="material-icons mr-1 text-sm text-green-600">verified</span>
                        CSR
                      </span>
                      <span className="font-semibold">{company.claimSettlementRatio}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 flex items-center">
                        <span className="material-icons mr-1 text-sm text-amber-500">schedule</span>
                        Avg Claim Time
                      </span>
                      <span className="font-semibold">{company.avgClaimTime} days</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 flex items-center">
                        <span className="material-icons mr-1 text-sm text-blue-600">visibility</span>
                        Transparency
                      </span>
                      <span className="font-semibold">{company.transparency}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 flex items-center">
                        <span className="material-icons mr-1 text-sm text-purple-600">star</span>
                        User Rating
                      </span>
                      <span className="font-semibold">{company.rating}</span>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-sm text-gray-600 mb-1">Confidence Meter:</p>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-5 h-5 rounded-full mx-0.5 ${
                              i < Math.round(company.claimSettlementRatio / 20) ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          ></div>
                        ))}
                        <span className="ml-2 text-sm font-medium">
                          {Math.round(company.claimSettlementRatio * 0.8)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Trust Meter Tab */}
        <TabsContent value="trustmeter" className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-medium text-green-800 flex items-center">
              <span className="material-icons mr-2 text-green-600">verified_user</span>
              Trust & Confidence Meter
            </h3>
            <p className="text-sm text-green-700 mt-1">
              Are you "Claim-Ready"? Answer these 5 simple questions to find out.
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {confidenceQuestions.map((question) => (
                  <div key={question.id} className="flex items-center justify-between">
                    <Label htmlFor={question.id} className="text-sm flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        id={question.id} 
                        checked={confidenceAnswers[question.id]}
                        onChange={() => handleToggleAnswer(question.id)}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                      />
                      {question.question}
                    </Label>
                  </div>
                ))}
                
                <Button 
                  onClick={calculateClaimReadiness} 
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
                >
                  Calculate Your Confidence Score
                </Button>
                
                {showResult && confidenceScore && (
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-base font-medium">Your Claim-Ready Score:</h4>
                      <span className="font-bold text-lg">{confidenceScore.score}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                      <div 
                        className={`${confidenceScore.color} h-3 rounded-full transition-all duration-500`} 
                        style={{ width: `${confidenceScore.score}%` }}
                      ></div>
                    </div>
                    
                    <div className={`p-3 rounded-lg ${
                      confidenceScore.status === "excellent" ? "bg-green-50 border border-green-100" :
                      confidenceScore.status === "good" ? "bg-blue-50 border border-blue-100" :
                      confidenceScore.status === "average" ? "bg-yellow-50 border border-yellow-100" :
                      "bg-red-50 border border-red-100"
                    }`}>
                      <p className={`text-sm flex items-start ${
                        confidenceScore.status === "excellent" ? "text-green-700" :
                        confidenceScore.status === "good" ? "text-blue-700" :
                        confidenceScore.status === "average" ? "text-yellow-700" :
                        "text-red-700"
                      }`}>
                        <span className="material-icons mr-1 text-sm">
                          {confidenceScore.status === "excellent" ? "verified" :
                           confidenceScore.status === "good" ? "check_circle" :
                           confidenceScore.status === "average" ? "info" :
                           "warning"}
                        </span>
                        <span>{confidenceScore.message}</span>
                      </p>
                    </div>
                    
                    <div className="mt-4">
                      <h5 className="text-sm font-medium mb-2">Suggested Reading:</h5>
                      <ul className="text-sm text-blue-600 space-y-1">
                        <li className="flex items-center">
                          <span className="material-icons mr-1 text-sm">article</span>
                          <a href="#" className="hover:underline">Top 5 Reasons Claims Get Rejected</a>
                        </li>
                        <li className="flex items-center">
                          <span className="material-icons mr-1 text-sm">article</span>
                          <a href="#" className="hover:underline">Documentation Checklist for Claims</a>
                        </li>
                        <li className="flex items-center">
                          <span className="material-icons mr-1 text-sm">article</span>
                          <a href="#" className="hover:underline">How to Expedite Your Insurance Claim</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
        <p>© 2025 RupeeSmart. All rights reserved.</p>
        <p className="mt-1">RupeeSmart does not sell, recommend, or process insurance claims. Information provided is for educational purposes only.</p>
      </div>
    </div>
  );
}