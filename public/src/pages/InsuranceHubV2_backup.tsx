import React, { useState, useEffect } from "react";
import { SEO } from "../components/SEO";
import { allInsuranceTypes, InsuranceTypeMap, InsuranceDetail } from "../data/insuranceTypes";

export default function InsuranceHubV2() {
  const [activeType, setActiveType] = useState("term");
  const [activeCategoryId, setActiveCategoryId] = useState("personal");
  const [filteredInsuranceTypes, setFilteredInsuranceTypes] = useState<any[]>([]);
  const [currentInsuranceDetail, setCurrentInsuranceDetail] = useState<string>("term");
  
  // Interactive features states
  const [showRecommender, setShowRecommender] = useState(false);
  const [showClaimSimulation, setShowClaimSimulation] = useState(false);
  const [showFactPopup, setShowFactPopup] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  
  // Smart Buying Checklist interactive states
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false]);
  const [buyingConfidence, setBuyingConfidence] = useState(0);
  const [coverageRecommendation, setCoverageRecommendation] = useState('');
  
  // Define weighted scoring values for different categories and items with importance levels
  const categoryWeights = {
    "insurer": 40, // Insurer Trustworthiness is highest weight (40%)
    "policy": 35,  // Policy Strength is second highest (35%)
    "medical": 25, // Health & Medical (25%)
  };
  
  // Item importance weights within each category
  const importanceWeights = {
    "critical": 3.0,    // Critical items have the highest impact
    "important": 2.0,   // Important items have medium impact
    "recommended": 1.0  // Recommended items have standard impact
  };
  
  // Map of item IDs to their importance level
  const itemImportanceLevels = {
    // Insurer category
    "csr": "critical",     // Claim Settlement Ratio is critical
    "casr": "critical",    // Claim Amount Settlement Ratio is critical
    "irdai": "important",  // IRDAI registration is important
    
    // Policy category
    "coverage": "critical",   // Coverage amount is critical
    "terms": "important",     // Clear terms is important
    "freelook": "important",  // Free-look period is important
    "riders": "recommended",  // Riders are recommended
    
    // Medical category
    "tests": "important",       // Medical tests are important
    "declaration": "critical",  // Truthful declaration is critical
  };
  
  // Calculate weighted confidence score with enhanced algorithm
  const calculateWeightedConfidence = (checkedItems: boolean[]) => {
    let totalScore = 0;
    let totalPossible = 0;
    let categoryScores: Record<string, { score: number, total: number, percentage: number }> = {};
    
    // First pass: calculate each category's internal score
    checklistCategories.forEach((category, categoryIndex) => {
      let categoryChecked = 0;
      let categoryTotal = 0;
      
      // Process each item in category with its importance weight
      category.items.forEach((item, itemIndex) => {
        const globalIndex = categoryIndex * 20 + itemIndex;
        const importanceLevel = itemImportanceLevels[item.id] || (item.required ? "important" : "recommended");
        const itemWeight = importanceWeights[importanceLevel] || 1.0;
        
        categoryTotal += itemWeight;
        if (checkedItems[globalIndex]) {
          categoryChecked += itemWeight;
        }
      });
      
      // Store category scores for second pass
      const categoryPercentage = categoryTotal > 0 ? (categoryChecked / categoryTotal) * 100 : 0;
      categoryScores[category.id] = {
        score: categoryChecked,
        total: categoryTotal,
        percentage: categoryPercentage
      };
    });
    
    // Second pass: apply category weights to the overall score
    Object.entries(categoryScores).forEach(([categoryId, data]) => {
      const categoryWeight = categoryWeights[categoryId] || 0;
      totalScore += (data.percentage / 100) * categoryWeight;
      totalPossible += categoryWeight;
    });
    
    // Final score as percentage with more precise calculation
    const finalScore = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;
    
    // Apply qualitative adjustment based on critical items
    // If any critical item is unchecked, cap the score
    let criticalItemsMissing = false;
    checklistCategories.forEach((category, categoryIndex) => {
      category.items.forEach((item, itemIndex) => {
        const globalIndex = categoryIndex * 20 + itemIndex;
        if (itemImportanceLevels[item.id] === "critical" && !checkedItems[globalIndex]) {
          criticalItemsMissing = true;
        }
      });
    });
    
    // Cap score at 65% if critical items are missing
    return criticalItemsMissing ? Math.min(finalScore, 65) : finalScore;
  };
  
  // Use the weighted calculation function directly
  
  // Helper function to get confidence color based on score
  const getConfidenceColor = (score: number) => {
    if (score < 35) return "#ef4444"; // Red for low confidence
    if (score < 60) return "#f97316"; // Orange for medium-low confidence
    if (score < 75) return "#f59e0b"; // Amber for medium confidence
    if (score < 90) return "#84cc16"; // Light green for medium-high confidence
    return "#22c55e"; // Green for high confidence
  };
  
  // Helper function to get text label for confidence
  const getConfidenceLabel = (score: number) => {
    if (score < 35) return "Low";
    if (score < 60) return "Medium-Low";
    if (score < 75) return "Medium";
    if (score < 90) return "Good";
    return "Excellent";
  };
  
  // Helper function to get confidence description
  const getConfidenceDescription = (score: number) => {
    if (score < 35) return "High risk of unsuitable policy. Critical factors missing.";
    if (score < 60) return "Several important factors missing. Proceed with caution.";
    if (score < 75) return "Satisfactory coverage. Consider adding more checks.";
    if (score < 90) return "Strong purchase decision with most factors verified.";
    return "Comprehensive verification completed. Optimal purchase readiness.";
  };
  
  // Comprehensive redesigned checklist categories and items with warnings
  const checklistCategories = [
    {
      id: "insurer",
      title: "🔒 1. Insurer Strength Test",
      icon: "security",
      items: [
        { id: "csr", text: "Claim Settlement Ratio (CSR) > 95%", required: true },
        { id: "casr", text: "Claim Amount Settlement Ratio (CASR) > 90%", required: true },
        { id: "irdai", text: "IRDAI Approved and 10+ years in market", required: true }
      ],
      warning: "If these fail, your policy may be worthless when it matters most."
    },
    {
      id: "policy",
      title: "📜 2. Policy Integrity Test",
      icon: "verified",
      items: [
        { id: "coverage", text: "Coverage = 15–20× annual income (term insurance)", required: true },
        { id: "terms", text: "Exclusions, Waiting Periods & Hidden Clauses reviewed", required: true },
        { id: "freelook", text: "Free-look Period (15–30 days) available", required: true }
      ],
      warning: "If you don't understand what's not covered, you don't understand your policy."
    },
    {
      id: "medical",
      title: "💉 3. Health & Risk Declaration Test",
      icon: "science",
      items: [
        { id: "tests", text: "Medical Test Done (if cover > ₹50L)", required: true },
        { id: "declaration", text: "Full & Honest Health Disclosure", required: true }
      ],
      warning: "False declarations = zero payout later."
    },
    {
      id: "riders",
      title: "🔍 4. Rider Reality Check",
      icon: "add_circle",
      items: [
        { id: "critical", text: "Critical Illness", required: false },
        { id: "waiver", text: "Waiver of Premium", required: false },
        { id: "accidental", text: "Accidental Death", required: false }
      ],
      warning: "Don't pay for fancy riders unless they solve a real need."
    },
    {
      id: "documents",
      title: "📂 5. Document & Proof Vault",
      icon: "folder",
      items: [
        { id: "identity", text: "Aadhaar / PAN", required: true },
        { id: "income", text: "Income Proof (ITR/Form 16)", required: true },
        { id: "age", text: "Age Proof", required: true },
        { id: "medreports", text: "Medical Reports (if asked)", required: false }
      ],
      warning: "No shortcuts. Insurer can deny claims if anything's incomplete or inconsistent."
    },
    {
      id: "post",
      title: "🧾 6. Final Confidence Check",
      icon: "task_alt",
      items: [
        { id: "terms", text: "Policy Terms Read End-to-End", required: true },
        { id: "nominee", text: "Nominee Details Updated Correctly", required: true },
        { id: "backup", text: "Digital + Physical Copies Stored", required: true }
      ],
      warning: "If you wouldn't let your family read it, don't buy it."
    }
  ];
  
  // Mandatory requirements for the checklist (for backward compatibility)
  const mandatoryRequirements = [
    { text: "Verify insurer's claim settlement ratio (> 95% is excellent)", required: true },
    { text: "Review free-look period (usually 15-30 days)", required: true },
    { text: "Check for exclusions and waiting periods", required: true },
    { text: "Confirm if medical tests are required (usually for coverage > ₹50L)", required: false }
  ];
  
  // Item importance weights for buying confidence score
  const getItemWeight = (categoryId: string, itemId: string) => {
    // Critical items that have the biggest impact on score
    const criticalItems = {
      "insurer": {
        "csr": 15,    // Claim Settlement Ratio is extremely important (15%)
        "casr": 12,   // Claim Amount Settlement is very important (12%)
        "irdai": 8,   // IRDAI registration is important (8%)
      },
      "policy": {
        "coverage": 10,  // Coverage amount is very important (10%)
        "terms": 10,     // Clear terms is very important (10%)
        "freelook": 5,   // Free-look period is moderately important (5%)
      },
      "medical": {
        "tests": 5,        // Medical tests done is important (5%)
        "declaration": 5,  // Honest declaration is important (5%)
      },
      "documents": {
        "identity": 6,    // Identity proof is moderately important (6%)
        "age": 4,         // Age proof (4%)
      },
      "post": {
        "document": 8,    // Policy received is important (8%)
        "nominee": 7,     // Nominee updated is important (7%)
        "backup": 5       // Copies kept is moderately important (5%)
      }
    };
    
    // Return weight if defined, otherwise return default weight
    return criticalItems[categoryId]?.[itemId] || 2; // Default weight is 2%
  };
  
  // Define the critical requirements for Medium confidence
  const mandatoryForMedium = [
    {categoryId: "insurer", itemId: "csr"}, // Claim Settlement Ratio
    {categoryId: "insurer", itemId: "casr"}, // Claim Amount Settlement Ratio
    {categoryId: "policy", itemId: "coverage"} // Coverage amount
  ];
    
  // Define absolute critical requirements for "High" score
  const mandatoryForHigh = [
    {categoryId: "insurer", itemId: "csr"}, // Claim Settlement Ratio
    {categoryId: "insurer", itemId: "casr"}, // Claim Amount Settlement Ratio
    {categoryId: "insurer", itemId: "irdai"}, // IRDAI registration
    {categoryId: "policy", itemId: "coverage"}, // Coverage amount
    {categoryId: "policy", itemId: "terms"} // Clear on exclusions
  ];
  
  // Function to check if an item in the checklist is checked
  const isItemChecked = (categoryId: string, itemId: string) => {
    const categoryIndex = checklistCategories.findIndex(cat => cat.id === categoryId);
    if (categoryIndex === -1) return false;
    
    const itemIndex = checklistCategories[categoryIndex].items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return false;
    
    const globalIndex = categoryIndex * 20 + itemIndex;
    return checkedItems[globalIndex] || false;
  };
  
  // These functions have been moved up to avoid duplication
  
  // Insurance categories
  const categories = [
    { id: "personal", name: "Personal Protection", color: "#4f46e5", icon: "person", description: "Secure your life, future, and family." },
    { id: "health", name: "Health Coverage", color: "#10b981", icon: "favorite", description: "Stay financially prepared for medical emergencies." },
    { id: "assets", name: "Asset Protection", color: "#f59e0b", icon: "home", description: "Secure your possessions and property." },
    { id: "travel", name: "Travel & Mobility", color: "#ec4899", icon: "flight", description: "Travel confidently, whether local or international." },
    { id: "specialized", name: "Specialized Coverage", color: "#8b5cf6", icon: "shield", description: "Tailor-made plans for unique needs." },
    { id: "business", name: "Business Protection", color: "#92400e", icon: "work", description: "Protect your business, employees, and continuity." }
  ];

  // Complete list of insurance types with their categories
  const insuranceTypes = [
    // Personal Protection
    {
      id: "term",
      name: "Term Life Insurance",
      category: "Personal Protection",
      description: "High sum assured, low premium. Ideal for income replacement.",
      icon: "person",
      color: "#4f46e5"
    },
    {
      id: "wholelife",
      name: "Whole Life Insurance",
      category: "Personal Protection",
      description: "Covers you till 99/100 years. Guaranteed payout.",
      icon: "all_inclusive",
      color: "#4f46e5"
    },
    {
      id: "ulip",
      name: "ULIP (Unit Linked Insurance Plan)",
      category: "Personal Protection",
      description: "Life cover + market-linked returns. Long-term wealth building.",
      icon: "trending_up",
      color: "#4f46e5"
    },
    {
      id: "endowment",
      name: "Endowment Plan",
      category: "Personal Protection",
      description: "Insurance + savings with guaranteed maturity benefit.",
      icon: "savings",
      color: "#4f46e5"
    },
    {
      id: "moneyback",
      name: "Money Back Plan",
      category: "Personal Protection",
      description: "Periodic payouts during the policy term + maturity benefit.",
      icon: "payments",
      color: "#4f46e5"
    },
    {
      id: "returnpremium",
      name: "Return of Premium Term Plan",
      category: "Personal Protection",
      description: "Term plan that returns premium if you survive the term.",
      icon: "assignment_return",
      color: "#4f46e5"
    },
    {
      id: "childeducation",
      name: "Child Education Plans",
      category: "Personal Protection",
      description: "Fund your child's education milestones even in your absence.",
      icon: "school",
      color: "#4f46e5"
    },
    {
      id: "pension",
      name: "Pension / Retirement Plans",
      category: "Personal Protection",
      description: "Monthly income post-retirement. Deferred or immediate annuity.",
      icon: "elderly",
      color: "#4f46e5"
    },
    {
      id: "seniorcitizen",
      name: "Senior Citizen Life Cover",
      category: "Personal Protection",
      description: "For people aged 60+, with limited underwriting.",
      icon: "elderly_woman",
      color: "#4f46e5"
    },
    {
      id: "nrilife",
      name: "NRI Life Insurance Plans",
      category: "Personal Protection",
      description: "Specially designed for NRIs wanting Indian insurance.",
      icon: "flight_takeoff",
      color: "#4f46e5"
    },
    
    // Health Coverage
    {
      id: "health",
      name: "Individual Health Insurance",
      category: "Health Coverage",
      description: "Covers a single person for hospitalization, OPD, etc.",
      icon: "health_and_safety",
      color: "#10b981"
    },
    {
      id: "familyfloater",
      name: "Family Floater Plan",
      category: "Health Coverage",
      description: "One policy for the entire family. Shared sum insured.",
      icon: "groups",
      color: "#10b981"
    },
    {
      id: "topup",
      name: "Top-Up & Super Top-Up Plans",
      category: "Health Coverage",
      description: "Additional coverage over base health plans.",
      icon: "add_circle",
      color: "#10b981"
    },
    {
      id: "critical",
      name: "Critical Illness Insurance",
      category: "Health Coverage", 
      description: "Lump-sum payout for life-threatening illnesses like cancer, heart attack.",
      icon: "bolt",
      color: "#10b981"
    },
    {
      id: "accident",
      name: "Personal Accident Insurance",
      category: "Health Coverage",
      description: "Covers death, disability, and income loss from accidents.",
      icon: "local_hospital",
      color: "#10b981"
    },
    {
      id: "maternity",
      name: "Maternity & Newborn Insurance",
      category: "Health Coverage",
      description: "Covers pregnancy, delivery, and initial infant care.",
      icon: "pregnant_woman",
      color: "#10b981"
    },
    {
      id: "seniorhealth",
      name: "Senior Citizen Health Insurance",
      category: "Health Coverage",
      description: "Tailored for 60+ age group. Includes pre-existing disease cover.",
      icon: "elderly",
      color: "#10b981"
    },
    {
      id: "opdwellness",
      name: "OPD & Wellness Add-Ons",
      category: "Health Coverage",
      description: "Doctor visits, diagnostics, therapy, and mental health.",
      icon: "medical_services",
      color: "#10b981"
    },
    {
      id: "ayush",
      name: "AYUSH Coverage",
      category: "Health Coverage",
      description: "For Ayurveda, Yoga, Homeopathy, Unani treatments.",
      icon: "spa",
      color: "#10b981"
    },
    
    // Asset Protection
    {
      id: "homestructure",
      name: "Home Structure Insurance",
      category: "Asset Protection",
      description: "Covers physical damage to your house (fire, flood, etc.).",
      icon: "home",
      color: "#f59e0b"
    },
    {
      id: "homecontents",
      name: "Home Contents Insurance",
      category: "Asset Protection",
      description: "Protects electronics, appliances, furniture, and valuables inside your home.",
      icon: "chair",
      color: "#f59e0b"
    },
    {
      id: "motor",
      name: "Motor Insurance – Car/Bike",
      category: "Asset Protection",
      description: "Mandatory in India. Third-party + own damage.",
      icon: "directions_car",
      color: "#f59e0b"
    },
    {
      id: "gadget",
      name: "Gadget Insurance",
      category: "Asset Protection",
      description: "Covers mobile, laptop, and tablets from theft, liquid, or accidental damage.",
      icon: "devices",
      color: "#f59e0b"
    },
    {
      id: "jewellery",
      name: "Jewellery Insurance",
      category: "Asset Protection",
      description: "High-value item coverage against theft, burglary, and loss.",
      icon: "diamond",
      color: "#f59e0b"
    },
    {
      id: "fire",
      name: "Fire Insurance",
      category: "Asset Protection",
      description: "For home or business properties damaged by fire or related events.",
      icon: "local_fire_department",
      color: "#f59e0b"
    },
    {
      id: "pet",
      name: "Pet Insurance",
      category: "Asset Protection",
      description: "Covers vet bills, surgeries, and death of your pet.",
      icon: "pets",
      color: "#f59e0b"
    },
    
    // Travel & Mobility
    {
      id: "internationaltravel",
      name: "International Travel Insurance",
      category: "Travel & Mobility",
      description: "Medical, cancellation, luggage, passport, and other overseas travel coverage.",
      icon: "flight",
      color: "#ec4899"
    },
    {
      id: "domestictravel",
      name: "Domestic Travel Insurance",
      category: "Travel & Mobility",
      description: "For air/train/bus journeys within India.",
      icon: "train",
      color: "#ec4899"
    },
    {
      id: "studenttravel",
      name: "Student Travel Insurance",
      category: "Travel & Mobility",
      description: "For Indian students going abroad (covers study interruption, sponsor protection, etc.).",
      icon: "school",
      color: "#ec4899"
    },
    {
      id: "seniortravel",
      name: "Senior Travel Plans",
      category: "Travel & Mobility",
      description: "Tailored for elderly international travelers.",
      icon: "elderly",
      color: "#ec4899"
    },
    {
      id: "pilgrimage",
      name: "Pilgrimage Insurance (Yatra Cover)",
      category: "Travel & Mobility",
      description: "Popular for Char Dham, Vaishno Devi, Amarnath trips.",
      icon: "temple_hindu",
      color: "#ec4899"
    },
    {
      id: "adventuresports",
      name: "Adventure Sports Travel Cover",
      category: "Travel & Mobility",
      description: "For trekking, rafting, skiing, etc.",
      icon: "downhill_skiing",
      color: "#ec4899"
    },
    {
      id: "cabride",
      name: "Cab Ride Insurance (Ola/Uber)",
      category: "Travel & Mobility",
      description: "Accident cover while traveling in app-based cabs.",
      icon: "local_taxi",
      color: "#ec4899"
    },
    
    // Specialized Coverage
    {
      id: "cancerspecific",
      name: "Cancer-Specific Insurance",
      category: "Specialized Coverage",
      description: "Covers multiple stages of cancer with lump sum benefits.",
      icon: "healing",
      color: "#8b5cf6"
    },
    {
      id: "diabetescover",
      name: "Diabetes/Hypertension Health Cover",
      category: "Specialized Coverage",
      description: "Pre-existing disease cover from Day 1.",
      icon: "monitor_heart",
      color: "#8b5cf6"
    },
    {
      id: "ruralagri",
      name: "Rural & Agriculture Insurance (PMFBY)",
      category: "Specialized Coverage",
      description: "Covers crop failure, livestock, equipment, and more for farmers.",
      icon: "agriculture",
      color: "#8b5cf6"
    },
    {
      id: "loanprotection",
      name: "Loan Protection Insurance",
      category: "Specialized Coverage",
      description: "Pays EMIs in case of death, disability, or job loss.",
      icon: "account_balance",
      color: "#8b5cf6"
    },
    {
      id: "event",
      name: "Event Insurance",
      category: "Specialized Coverage",
      description: "Coverage for wedding, concerts, corporate events.",
      icon: "celebration",
      color: "#8b5cf6"
    },
    {
      id: "cyber",
      name: "Cyber Insurance",
      category: "Specialized Coverage",
      description: "Online fraud, phishing, data theft cover.",
      icon: "security",
      color: "#8b5cf6"
    },
    {
      id: "legalexpense",
      name: "Legal Expense Insurance",
      category: "Specialized Coverage",
      description: "Helps with lawyer fees and court expenses.",
      icon: "gavel",
      color: "#8b5cf6"
    },
    {
      id: "covid",
      name: "Covid-19 Insurance",
      category: "Specialized Coverage",
      description: "Hospitalization, quarantine, and treatment costs.",
      icon: "coronavirus",
      color: "#8b5cf6"
    },
    {
      id: "opd",
      name: "OPD Insurance",
      category: "Specialized Coverage",
      description: "Standalone or add-on. Covers outpatient visits, diagnostics.",
      icon: "local_pharmacy",
      color: "#8b5cf6"
    },
    
    // Business Protection
    {
      id: "grouphealth",
      name: "Group Health Insurance",
      category: "Business Protection",
      description: "Provided to employees; helps in tax savings & retention.",
      icon: "groups",
      color: "#92400e"
    },
    {
      id: "commercialproperty",
      name: "Commercial Property Insurance",
      category: "Business Protection",
      description: "Covers fire, flood, theft at shops, factories, offices.",
      icon: "store",
      color: "#92400e"
    },
    {
      id: "shopkeepers",
      name: "Shopkeeper's Insurance",
      category: "Business Protection",
      description: "Composite plan covering inventory, money, liability, etc.",
      icon: "storefront",
      color: "#92400e"
    },
    {
      id: "businessinterruption",
      name: "Business Interruption Cover",
      category: "Business Protection",
      description: "Income protection in case of operations halt.",
      icon: "business_center",
      color: "#92400e"
    },
    {
      id: "marinetransit",
      name: "Marine/Transit Insurance",
      category: "Business Protection",
      description: "Protects goods during transport via land/sea/air.",
      icon: "directions_boat",
      color: "#92400e"
    },
    {
      id: "businesscyber",
      name: "Cyber Liability for Business",
      category: "Business Protection",
      description: "Crucial for tech startups and online services.",
      icon: "computer",
      color: "#92400e"
    },
    {
      id: "directorsliability",
      name: "Directors & Officers Liability (D&O)",
      category: "Business Protection",
      description: "Protects company leaders from personal legal risks.",
      icon: "people",
      color: "#92400e"
    },
    {
      id: "professionalindemnity",
      name: "Professional Indemnity Insurance",
      category: "Business Protection",
      description: "For CA, doctors, architects, etc.",
      icon: "badge",
      color: "#92400e"
    }
  ];
  
  // Filter insurance types by category
  useEffect(() => {
    const categoryName = categories.find(cat => cat.id === activeCategoryId)?.name;
    if (categoryName) {
      const filtered = insuranceTypes.filter(type => type.category === categoryName);
      setFilteredInsuranceTypes(filtered);
      if (filtered.length > 0) {
        setActiveType(filtered[0].id);
        setCurrentInsuranceDetail(filtered[0].id);
      }
    }
  }, [activeCategoryId]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="Insurance Hub | RupeeSmart" description="Explore insurance options and learn about various plans." />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-6">
        <h1 className="text-3xl font-bold text-indigo-600 text-center">Insurance Hub</h1>
        <p className="text-gray-600 text-center mt-2">Find the right insurance for your needs</p>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Interactive Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div 
            className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-all"
            onClick={() => setShowRecommender(true)}
          >
            <div className="flex items-start mb-2">
              <span className="material-icons text-indigo-600 mr-3 text-xl mt-0.5">calculate</span>
              <div>
                <h3 className="font-medium text-indigo-700 text-base">Smart Insurance Advisor</h3>
                <p className="text-xs text-gray-600 mt-1">Get personalized insurance suggestions based on your profile.</p>
              </div>
            </div>
          </div>
          
          <div 
            className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-all"
            onClick={() => setShowClaimSimulation(true)}
          >
            <div className="flex items-start mb-2">
              <span className="material-icons text-green-600 mr-3 text-xl mt-0.5">description</span>
              <div>
                <h3 className="font-medium text-green-700 text-base">Claim Simulation</h3>
                <p className="text-xs text-gray-600 mt-1">See how the claim process works before you buy.</p>
              </div>
            </div>
          </div>
          
          <div 
            className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-all"
            onClick={() => setShowFactPopup(true)}
          >
            <div className="flex items-start mb-2">
              <span className="material-icons text-amber-600 mr-3 text-xl mt-0.5">lightbulb</span>
              <div>
                <h3 className="font-medium text-amber-700 text-base">Insurance Literacy</h3>
                <p className="text-xs text-gray-600 mt-1">Learn key facts about insurance to make smarter decisions.</p>
              </div>
            </div>
          </div>
          
          <div 
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-all"
            onClick={() => setShowComparison(true)}
          >
            <div className="flex items-start mb-2">
              <span className="material-icons text-purple-600 mr-3 text-xl mt-0.5">compare_arrows</span>
              <div>
                <h3 className="font-medium text-purple-700 text-base">Compare Plans</h3>
                <p className="text-xs text-gray-600 mt-1">Side-by-side comparison of different insurance plans.</p>
              </div>
            </div>
          </div>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          {/* Categories Box */}
          <div className="md:col-span-3">
            <div className="border rounded-lg p-3 bg-white shadow-sm h-full">
              <h2 className="font-medium text-gray-700 mb-2 text-sm">Insurance Categories</h2>
              <div className="flex flex-col space-y-1">
                {categories.map(category => (
                  <div
                    key={category.id}
                    onClick={() => setActiveCategoryId(category.id)}
                    className={`flex items-center py-2 px-2 cursor-pointer transition-all rounded-lg whitespace-nowrap ${
                      activeCategoryId === category.id 
                        ? 'bg-indigo-50' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <span className="material-icons text-xs flex items-center justify-center" style={{ color: category.color }}>
                        {category.icon}
                      </span>
                    </div>
                    <span className={`text-sm ${
                      activeCategoryId === category.id ? 'text-indigo-700 font-medium' : 'text-gray-700'
                    }`}>
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Insurance Types Box */}
          <div className="md:col-span-9">
            <div className="border rounded-lg p-3 bg-white shadow-sm h-full">
              <h2 className="font-medium text-gray-700 mb-2 text-sm">Insurance Types</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1">
                {filteredInsuranceTypes.length > 0 ? (
                  filteredInsuranceTypes.map(type => (
                    <div
                      key={type.id}
                      onClick={() => {
                        setActiveType(type.id);
                        setCurrentInsuranceDetail(type.id);
                        // Scroll to the detail section with offset to account for sticky header
                        setTimeout(() => {
                          const detailSection = document.getElementById('insurance-detail-section');
                          if (detailSection) {
                            const yOffset = -20; // 20px offset from the top
                            const y = detailSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                            window.scrollTo({top: y, behavior: 'smooth'});
                          }
                        }, 100);
                      }}
                      className={`py-1.5 px-2 rounded-md border transition-all cursor-pointer ${
                        activeType === type.id 
                          ? 'border-indigo-200 bg-indigo-50' 
                          : 'border-gray-100 hover:border-indigo-100 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div 
                          className="w-8 h-8 rounded-full mr-2 flex-shrink-0 relative"
                          style={{ backgroundColor: `${type.color}15` }}
                        >
                          <span className="material-icons text-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ color: type.color }}>
                            {type.icon}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{type.name}</div>
                          <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">{type.description}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 py-2">No insurance types found in this category.</div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Insurance Detail Section */}
        {currentInsuranceDetail && allInsuranceTypes[currentInsuranceDetail] && (
          <div id="insurance-detail-section" className="mt-8 border rounded-lg bg-white shadow-sm relative">
            <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b bg-indigo-50">
              <h3 className="text-xl font-bold text-indigo-800">{allInsuranceTypes[currentInsuranceDetail].name}</h3>
              <div className="flex items-center">
                <button 
                  className="text-gray-500 hover:text-gray-700 bg-white py-1 px-3 rounded-md border text-sm font-medium"
                  onClick={() => window.print()}
                >
                  <span className="material-icons text-sm align-text-top mr-1">print</span>
                  Print Guide
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Introduction */}
              <div className="mb-4">
                <p className="text-gray-600 text-sm leading-relaxed">{allInsuranceTypes[currentInsuranceDetail].detailedDescription}</p>
              </div>
              
              {/* Key Features */}
              <div className="mb-4">
                <h4 className="text-base font-semibold text-indigo-800 mb-2">Key Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {allInsuranceTypes[currentInsuranceDetail].features.map((feature: string, index: number) => {
                    // Split the feature text into key highlight and description
                    const parts = feature.split(': ');
                    const highlight = parts[0];
                    const description = parts.length > 1 ? parts[1] : '';
                    
                    return (
                      <div key={index} className="flex items-start bg-indigo-50 p-2 rounded-md">
                        <span className="material-icons text-indigo-600 mr-2 mt-0.5 text-sm">check_circle</span>
                        <div>
                          <span className="text-indigo-800 font-medium text-sm">{highlight}</span>
                          {description && <span className="text-gray-600 text-sm ml-1">— {description}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Why You Need It */}
              <div className="mb-4">
                <h4 className="text-base font-semibold text-indigo-800 mb-2">Why You Need It</h4>
                

                
                <div className="grid grid-cols-1 gap-4 bg-blue-50 p-4 rounded-lg">
                  {allInsuranceTypes[currentInsuranceDetail].keyPoints.map((point, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <span className="text-[22px] mr-3">{point.icon || "•"}</span>
                          <h5 className="font-medium text-gray-800 text-[15px]">{point.title}</h5>
                        </div>
                        {point.importance && (
                          <span className={`text-xs px-2.5 py-0.5 rounded-md font-medium ${
                            point.importance === "Critical" ? "bg-red-100 text-red-700" : 
                            point.importance === "Important" ? "bg-yellow-100 text-yellow-700" :
                            point.importance === "Recommended" ? "bg-blue-100 text-blue-700" :
                            "bg-blue-50 text-blue-600"
                          }`}>
                            {point.importance}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-[13px] ml-[34px]">{point.content}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tax Benefits */}
              <div className="mb-5">
                <h4 className="text-base font-semibold text-indigo-800 mb-2">Tax Benefits</h4>
                <div className="bg-green-50 p-3 rounded-lg">
                  {allInsuranceTypes[currentInsuranceDetail].taxBenefits.map((tax: {section: string, benefit: string}, index: number) => (
                    <div key={index} className="flex mb-3 last:mb-0 items-center">
                      <div className="w-16">
                        <span className="inline-block px-2 py-1 bg-green-100 rounded-md font-medium text-green-800 text-xs w-full text-center">
                          {tax.section}
                        </span>
                      </div>
                      <div className="text-gray-700 text-sm ml-6">{tax.benefit}</div>
                    </div>
                  ))}
                  <p className="text-gray-500 mt-3 text-xs">Note: Tax benefits are subject to changes in tax laws.</p>
                </div>
              </div>
              
              {/* Main Insurance Details Content Ends */}
              
              {/* Smart Buying Checklist removed from here - moved to between detail and expert tips */}
              
              {/* Expert Tips removed from here and moved to bottom */}
            </div>
            
            {/* Explore Plans button removed */}
          </div>
        )}

        {/* Smart Buying Checklist - Standalone Section Before Expert Tips */}
        {currentInsuranceDetail && (
          <div className="max-w-7xl mx-auto px-4 mt-8 mb-8">
            <div className="rounded-lg overflow-hidden shadow-md border border-blue-100">
              <div className="bg-blue-50 px-6 py-4 flex justify-between items-center">
                <h3 className="font-semibold text-blue-700 flex items-center text-lg">
                  <span className="material-icons text-blue-600 mr-2.5">verified</span>
                  Insurance Buying Checklist
                </h3>
                <button 
                  onClick={() => {
                    // Reset all checkmarks to unchecked
                    setCheckedItems(Array(100).fill(false)); // More than enough for all items
                    setBuyingConfidence(0);
                    setCoverageRecommendation('');
                  }}
                  className="text-xs bg-white hover:bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md transition-colors border border-blue-200 font-medium"
                >
                  Reset
                </button>
              </div>
              
              <div className="bg-white p-5">
                {/* Buying Confidence Meter */}
                <div className="mb-5 bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3 shadow-sm">
                        <span className="material-icons text-white text-lg">security</span>
                      </div>
                      <h5 className="text-blue-800 font-medium">Buying Confidence Score</h5>
                    </div>
                    <div 
                      className="font-semibold px-4 py-1 rounded-full text-sm flex items-center shadow-sm" 
                      style={{ 
                        color: "white", 
                        backgroundColor: getConfidenceColor(buyingConfidence),
                        minWidth: "94px",
                        justifyContent: "center"
                      }}
                    >
                      {getConfidenceLabel(buyingConfidence)}
                    </div>
                  </div>
                  
                  {/* Progress bar with improved styling */}
                  <div className="w-full bg-gray-200 rounded-full h-5 mb-3 shadow-inner overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2" 
                      style={{ 
                        width: `${buyingConfidence}%`,
                        backgroundColor: getConfidenceColor(buyingConfidence),
                        minWidth: "30px"
                      }}
                    >
                      {buyingConfidence > 15 && (
                        <span className="text-white text-xs font-bold">{buyingConfidence}%</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Added confidence description based on score */}
                  {buyingConfidence > 0 && (
                    <div className="bg-white border border-gray-200 rounded-md p-2 mb-3">
                      <p className="text-sm text-gray-700">{getConfidenceDescription(buyingConfidence)}</p>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-600 flex items-center">
                    <span className="inline-block w-4 h-4 bg-amber-500 rounded-full flex-shrink-0 mr-2 flex items-center justify-center">
                      <span className="material-icons text-white" style={{fontSize: '10px'}}>priority_high</span>
                    </span>
                    <span>Check items below before purchasing any policy. Must-check items are marked with a red asterisk (*).</span>
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-5">
                    {/* Left column categories - Enhanced styling */}
                    {checklistCategories.slice(0, 3).map((category, categoryIndex) => (
                      <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        <div className="bg-blue-50 px-4 py-2.5 flex items-center">
                          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center mr-2.5 shadow-sm">
                            <span className="material-icons text-white text-sm">{category.icon}</span>
                          </div>
                          <h5 className="font-medium text-blue-800 text-sm">{category.title.replace('🔍 ', '').replace('📑 ', '').replace('🧪 ', '')}</h5>
                        </div>
                        <div>
                          {category.items.map((item, itemIndex) => {
                            // Calculate unique index for this item
                            const globalIndex = categoryIndex * 20 + itemIndex;
                            
                            // Get importance level for styling
                            const importanceLevel = itemImportanceLevels[item.id] || (item.required ? "important" : "recommended");
                            
                            return (
                              <div 
                                key={item.id} 
                                className={`flex items-start p-2.5 ${
                                  checkedItems[globalIndex] ? 'bg-green-50 border-l-4 border-green-400' : 'bg-white'
                                } border-b border-gray-100 hover:bg-blue-50 transition-colors duration-150`}
                              >
                                <div className="flex items-center">
                                  <input 
                                    type="checkbox" 
                                    id={`item-${category.id}-${item.id}`}
                                    checked={checkedItems[globalIndex] || false}
                                    onChange={() => {
                                      const newCheckedItems = [...(checkedItems.length > 0 ? checkedItems : Array(200).fill(false))];
                                      newCheckedItems[globalIndex] = !newCheckedItems[globalIndex];
                                      setCheckedItems(newCheckedItems);
                                      
                                      // Calculate new confidence using a simple scoring method
                                      const totalChecked = newCheckedItems.filter(Boolean).length;
                                      const newConfidence = Math.min(Math.round((totalChecked / 15) * 100), 100);
                                      setBuyingConfidence(newConfidence);
                                    }}
                                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                                  />
                                </div>
                                <label htmlFor={`item-${category.id}-${item.id}`} className="cursor-pointer flex-1 ml-3">
                                  <div className="flex flex-col">
                                    <div className="flex items-center">
                                      <span className={`${
                                        checkedItems[globalIndex] ? 'text-green-600 font-medium' : 'text-gray-700'
                                      } text-sm`}>
                                        {item.text}
                                      </span>
                                      {item.required && (
                                        <span className="ml-1 text-red-500 text-xs">*</span>
                                      )}
                                      
                                      {/* Show importance badge */}
                                      <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-sm ${
                                        importanceLevel === "critical" ? "bg-red-100 text-red-700" : 
                                        importanceLevel === "important" ? "bg-amber-100 text-amber-700" :
                                        "bg-blue-100 text-blue-700"
                                      }`}>
                                        {importanceLevel.charAt(0).toUpperCase() + importanceLevel.slice(1)}
                                      </span>
                                    </div>
                                    
                                    {checkedItems[globalIndex] && (
                                      <div className="text-xs text-green-600 mt-1 flex items-center">
                                        <span className="material-icons text-[12px] mr-1">check_circle</span>
                                        Verified
                                      </div>
                                    )}
                                  </div>
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-5">
                    {/* Added note about additional steps - Enhanced styling */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      <div className="bg-blue-50 px-4 py-2.5 flex items-center">
                        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center mr-2.5 shadow-sm">
                          <span className="material-icons text-white text-sm">checklist</span>
                        </div>
                        <h5 className="font-medium text-blue-800 text-sm">Additional Requirements</h5>
                      </div>
                      <div className="p-4 text-gray-700 text-sm space-y-3">
                        <p className="flex items-center text-blue-700 font-medium">
                          <span className="material-icons text-blue-600 text-sm mr-1.5">info</span>
                          <span>After completing the steps above, also remember to:</span>
                        </p>
                        <ul className="space-y-3 mt-1">
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              <span className="material-icons text-blue-600 text-[12px]">description</span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-800">Prepare documents:</span>
                              <span className="text-gray-600"> Aadhaar/PAN, Income proof, Age proof, Medical reports (if asked)</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              <span className="material-icons text-blue-600 text-[12px]">task_alt</span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-800">After purchase:</span>
                              <span className="text-gray-600"> Verify policy details, Update nominee, Keep digital + paper copies</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* RupeeSmart Tip Box - Enhanced styling */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg py-3 px-4 shadow-sm">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center mr-3">
                          <span className="material-icons text-amber-700">tips_and_updates</span>
                        </div>
                        <div>
                          <h6 className="font-medium text-amber-800 text-sm">RupeeSmart Tip:</h6>
                          <p className="text-sm text-amber-700 mt-1">
                            High CSR + High CASR = Safer insurer.<br/>
                            Skip hype. Choose verified facts.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Expert Tips Section - Completely New Box at Bottom */}
        {currentInsuranceDetail && allInsuranceTypes[currentInsuranceDetail].expertTips && (
          <div className="max-w-7xl mx-auto px-4 mt-8 mb-12">
            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-4">
                <h3 className="text-lg font-semibold text-indigo-800">Expert Tips</h3>
              </div>
              
              <div className="p-0">
                <div className="bg-amber-50 p-3">
                  {allInsuranceTypes[currentInsuranceDetail].expertTips.map((tip: string, index: number) => (
                    <div key={index} className="flex items-center mb-2 last:mb-0">
                      <span className="text-amber-500 text-base mr-2">•</span>
                      <span className="text-gray-700 text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}