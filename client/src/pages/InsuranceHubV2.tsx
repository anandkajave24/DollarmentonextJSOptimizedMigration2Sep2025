import React, { useState, useEffect } from "react";
import { SEO } from "../components/SEO";
import { allInsuranceTypes, InsuranceTypeMap, InsuranceDetail } from "../data/insuranceTypes";


export default function InsuranceHubV2() {
  const [activeType, setActiveType] = useState("term");
  const [activeCategoryId, setActiveCategoryId] = useState("personal");
  const [filteredInsuranceTypes, setFilteredInsuranceTypes] = useState<any[]>([]);
  const [currentInsuranceDetail, setCurrentInsuranceDetail] = useState<string>("term");
  
  // Interactive features states
  const [showClaimSimulation, setShowClaimSimulation] = useState(false);
  const [showFactPopup, setShowFactPopup] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [activeTab, setActiveTab] = useState("claim");
  



  
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
      description: "Mandatory in most US states. Liability + comprehensive/collision coverage.",
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
      description: "For air/train/bus journeys within the United States.",
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
      <SEO title="Insurance Hub | DollarMento" description="Explore insurance options and learn about various plans." />
      
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-6">
        <h1 className="text-3xl font-bold text-indigo-600 text-center">Insurance Hub</h1>
        <p className="text-gray-600 text-center mt-2">Find the right insurance for your needs</p>
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Interactive Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
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


        
        {/* Expert Tips Section - Completely New Box at Bottom */}
        {currentInsuranceDetail && allInsuranceTypes[currentInsuranceDetail].expertTips && (
          <div className="max-w-4xl mx-auto px-4 mt-8 mb-6">
            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-4">
                <h3 className="text-lg font-semibold text-indigo-800">Expert Tips</h3>
              </div>
              
              <div className="p-0">
                <div className="bg-amber-50 p-3">
                  {allInsuranceTypes[currentInsuranceDetail].expertTips.map((tip: string, index: number) => (
                    <div key={index} className="flex items-start mb-2 last:mb-0">
                      <span className="text-amber-500 flex-shrink-0 mr-2">•</span>
                      <span className="text-gray-700 text-xs">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Insurance Tools Tabs Section */}
        <div className="max-w-4xl mx-auto px-4 mt-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Claim Simulation Card */}
            <div 
              onClick={() => setActiveTab("claim")} 
              className={`rounded-lg shadow-md p-6 transition-all duration-300 cursor-pointer 
                ${activeTab === "claim" ? "bg-green-50 border-2 border-green-300 shadow-lg" : "bg-green-50 hover:shadow-lg"}`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <span className="material-icons text-green-600">description</span>
                  </div>
                  <h3 className="text-green-700 font-medium ml-3">Claim Simulation</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  See how the claim process works before you buy.
                </p>
              </div>
            </div>

            {/* Insurance Literacy Card */}
            <div 
              onClick={() => setActiveTab("literacy")} 
              className={`rounded-lg shadow-md p-6 transition-all duration-300 cursor-pointer 
                ${activeTab === "literacy" ? "bg-amber-50 border-2 border-amber-300 shadow-lg" : "bg-amber-50 hover:shadow-lg"}`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <span className="material-icons text-amber-600">lightbulb</span>
                  </div>
                  <h3 className="text-amber-700 font-medium ml-3">Insurance Literacy</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Learn key facts about insurance to make smarter decisions.
                </p>
              </div>
            </div>

            {/* Compare Plans Card */}
            <div 
              onClick={() => setActiveTab("compare")} 
              className={`rounded-lg shadow-md p-6 transition-all duration-300 cursor-pointer 
                ${activeTab === "compare" ? "bg-purple-50 border-2 border-purple-300 shadow-lg" : "bg-purple-50 hover:shadow-lg"}`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <span className="material-icons text-purple-600">compare_arrows</span>
                  </div>
                  <h3 className="text-purple-700 font-medium ml-3">Compare Plans</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Side-by-side comparison of different insurance plans.
                </p>
              </div>
            </div>
          </div>

          {/* Tab Content Section */}
          <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">

            {/* Claim Simulation Content */}
            {activeTab === "claim" && (
              <div className="p-6 border-t-4 border-green-500">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="material-icons text-green-600 text-xl">description</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-medium text-gray-900">Claim Simulation</h2>
                    <p className="text-gray-600 mt-1">See how the claim process works before you buy.</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-5 rounded-lg border border-green-100 mb-6">
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option value="">Select insurance type</option>
                        <option value="health">Health Insurance</option>
                        <option value="term">Term Life Insurance</option>
                        <option value="motor">Motor Insurance</option>
                        <option value="home">Home Insurance</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Claim Scenario</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option value="">Select a scenario</option>
                        <option value="health_hospitalization">Health: Planned Hospitalization</option>
                        <option value="health_emergency">Health: Emergency Hospitalization</option>
                        <option value="term_death">Term: Death Claim</option>
                        <option value="motor_accident">Motor: Accident Damage</option>
                        <option value="motor_theft">Motor: Vehicle Theft</option>
                        <option value="home_fire">Home: Fire Damage</option>
                        <option value="home_burglary">Home: Burglary</option>
                      </select>
                    </div>
                    
                    <button 
                      type="button" 
                      className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Start Claim Simulation
                    </button>
                  </form>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-3">Simulation Results</h3>
                  <p className="text-gray-500">Select an insurance type and claim scenario to see a step-by-step simulation of the claim process.</p>
                </div>
              </div>
            )}
            
            {/* Insurance Literacy Content */}
            {activeTab === "literacy" && (
              <div className="p-6 border-t-4 border-amber-500">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="material-icons text-amber-600 text-xl">lightbulb</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-medium text-gray-900">Insurance Literacy</h2>
                    <p className="text-gray-600 mt-1">Learn key facts about insurance to make smarter decisions.</p>
                  </div>
                </div>
                
                <div className="bg-amber-50 p-5 rounded-lg border border-amber-100">
                  <h3 className="font-medium text-gray-800 mb-4">Insurance Terms Glossary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { term: "Premium", definition: "The amount you pay to your insurer for your policy, typically on a monthly or annual basis." },
                      { term: "Sum Assured", definition: "The guaranteed amount that an insurance policy pays out." },
                      { term: "Claim", definition: "A formal request to an insurance company for coverage or compensation for a covered loss or policy event." },
                      { term: "Deductible", definition: "The amount you pay out of pocket before your insurance kicks in." },
                      { term: "Exclusions", definition: "Specific conditions, treatments, or situations that your policy does not cover." },
                      { term: "Rider", definition: "An optional add-on to your basic insurance policy that provides additional benefits for an extra premium." }
                    ].map((item, index) => (
                      <div key={index} className="bg-white p-3 rounded border border-gray-200">
                        <span className="block font-medium text-gray-800">{item.term}</span>
                        <span className="block text-sm text-gray-600 mt-1">{item.definition}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-5">
                    <button 
                      type="button" 
                      className="w-full bg-amber-600 text-white font-medium py-2 px-4 rounded-md hover:bg-amber-700 transition-colors"
                    >
                      View Full Insurance Guide
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Compare Plans Content */}
            {activeTab === "compare" && (
              <div className="p-6 border-t-4 border-purple-500">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="material-icons text-purple-600 text-xl">compare_arrows</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-medium text-gray-900">Compare Plans</h2>
                    <p className="text-gray-600 mt-1">Side-by-side comparison of different insurance plans.</p>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-5 rounded-lg border border-purple-100 mb-6">
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Category</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="">Select a category</option>
                        <option value="term">Term Life Insurance</option>
                        <option value="health">Health Insurance</option>
                        <option value="car">Car Insurance</option>
                        <option value="home">Home Insurance</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Plan 1</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                          <option value="">Select plan</option>
                          <option value="plan1">Select a category first</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Plan 2</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                          <option value="">Select plan</option>
                          <option value="plan2">Select a category first</option>
                        </select>
                      </div>
                    </div>
                    
                    <button 
                      type="button" 
                      className="w-full bg-purple-600 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Compare Plans
                    </button>
                  </form>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-3">Comparison Results</h3>
                  <p className="text-gray-500">Select an insurance category and two plans to see a detailed side-by-side comparison.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}