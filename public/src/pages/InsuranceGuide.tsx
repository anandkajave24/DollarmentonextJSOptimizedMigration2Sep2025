import { TabPills, TabItem } from "../components/ui/tab-pills";
import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useToast } from "../hooks/use-toast";
import { Badge } from "../components/ui/badge";
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
};

export default function InsuranceGuide() {
  const { toast } = useToast();
  const [age, setAge] = useState<string>("");
  const [income, setIncome] = useState<string>("");
  const [dependents, setDependents] = useState<string>("");
  const [selectedInsuranceType, setSelectedInsuranceType] = useState<string>("all");
  
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
  
  const insuranceTips = [
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
    },
    {
      id: "tata",
      name: "Tata AIG",
      insuranceTypes: ["motor", "health", "travel"],
      rating: 4.1,
      claimSettlementRatio: 94.5,
      logoIcon: "shield",
      avgClaimTime: 7.8,
      transparency: "Medium"
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
      title: "Insurance Recommendations Generated",
      description: "Based on your profile, we've calculated suitable coverage amounts.",
      duration: 3000,
    });
    
    // Log the recommendations to console - in a real app, these would be displayed in the UI
    console.log("Insurance Recommendations:", recommendations);
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
        </TabsList>
        
        <TabsContent value="types" className="space-y-4">
          {insuranceTypes.map((insurance) => (
            <Card key={insurance.id} className="overflow-hidden">
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
                      
                      <Button className="mt-4 w-full">Compare Plans</Button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-base font-medium mb-4">Insurance Calculator</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="age">Your Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="income">Annual Income (₹)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="Enter your annual income"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Input
                    id="dependents"
                    type="number"
                    placeholder="Enter number of dependents"
                    value={dependents}
                    onChange={(e) => setDependents(e.target.value)}
                  />
                </div>
                
                <Button className="w-full" onClick={handleCalculate}>
                  Calculate Coverage Needs
                </Button>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Recommended Coverage</h4>
                
                {age && income && dependents ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Term Life Insurance</span>
                        <span className="text-sm font-medium">
                          ₹{new Intl.NumberFormat('en-IN').format(parseInt(income) * 10 * (parseInt(dependents) > 0 ? 1.5 : 1))}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Based on your income and {parseInt(dependents) > 0 ? `${dependents} dependents` : "profile"}
                      </p>
                    </div>
                    
                    <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Health Insurance</span>
                        <span className="text-sm font-medium">
                          ₹{new Intl.NumberFormat('en-IN').format(
                            parseInt(income) > 2000000 ? 1500000 : 
                            parseInt(income) > 1000000 ? 1000000 : 500000
                          )}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Based on your income and healthcare costs
                      </p>
                    </div>
                    
                    {parseInt(income) >= 1000000 && (
                      <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Home Insurance</span>
                          <span className="text-sm font-medium">
                            Recommended
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          For property value protection
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <span className="material-icons text-gray-400 text-4xl">calculate</span>
                    <p className="mt-2 text-gray-500">Fill in your details to get recommendations</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="text-base font-medium mb-3">Insurance Buying Tips</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="material-icons text-primary mr-2">tips_and_updates</span>
                  <div>
                    <p className="text-sm font-medium">Buy early for lower premiums</p>
                    <p className="text-xs text-gray-500">Insurance premiums increase with age. The younger you are, the lower your premiums.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="material-icons text-primary mr-2">tips_and_updates</span>
                  <div>
                    <p className="text-sm font-medium">Disclose all information</p>
                    <p className="text-xs text-gray-500">Incorrect or withheld information can lead to claim rejection.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="material-icons text-primary mr-2">tips_and_updates</span>
                  <div>
                    <p className="text-sm font-medium">Review policy documents carefully</p>
                    <p className="text-xs text-gray-500">Understand what's covered, what's not, and any waiting periods or conditions.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="material-icons text-primary mr-2">tips_and_updates</span>
                  <div>
                    <p className="text-sm font-medium">Check claim settlement ratio</p>
                    <p className="text-xs text-gray-500">A higher ratio indicates better chances of claim approval.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="companies" className="space-y-4">
          <div className="mb-4">
            <Label htmlFor="insurance-type">Insurance Type</Label>
            <Select value={selectedInsuranceType} onValueChange={setSelectedInsuranceType}>
              <SelectTrigger id="insurance-type">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="term">Term Life</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="motor">Motor</SelectItem>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {getFilteredCompanies().map((company) => (
            <Card key={company.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3">
                      <span className="material-icons text-primary">{company.logoIcon}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{company.name}</h3>
                      <div className="flex text-xs text-gray-500 mt-1">
                        {getStarRating(company.rating)}
                        <span className="ml-2">{company.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="mb-1" variant={company.claimSettlementRatio >= 97 ? "default" : (company.claimSettlementRatio >= 95 ? "secondary" : "outline")}>
                      {company.claimSettlementRatio}% CSR
                    </Badge>
                    <div className="flex flex-wrap justify-end gap-1 mt-1">
                      {company.insuranceTypes.map((type, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {type === "term" ? "Life" : 
                           type === "health" ? "Health" :
                           type === "motor" ? "Motor" :
                           type === "home" ? "Home" : "Travel"}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t flex justify-between">
                  <Button variant="outline" size="sm">Compare</Button>
                  <Button size="sm">Get Quote</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}