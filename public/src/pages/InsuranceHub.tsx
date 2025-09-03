import React, { useState, useEffect } from "react";
import { SEO } from "../components/SEO";
import { allInsuranceTypes, InsuranceTypeMap, InsuranceDetail } from "../data/insuranceTypes";

export default function InsuranceHub() {
  const [activeType, setActiveType] = useState("term");
  const [activeCategoryId, setActiveCategoryId] = useState("personal");
  const [filteredInsuranceTypes, setFilteredInsuranceTypes] = useState<any[]>([]);
  const [showInsuranceDetail, setShowInsuranceDetail] = useState(false);
  const [currentInsuranceDetail, setCurrentInsuranceDetail] = useState<string>("term");
  
  // Smart Insurance Advisor states
  const [showRecommender, setShowRecommender] = useState(false);
  const [age, setAge] = useState("30");
  const [income, setIncome] = useState("600000");
  const [dependents, setDependents] = useState("2");
  const [location, setLocation] = useState("metro");
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  // Claim Simulation states
  const [showClaimSimulation, setShowClaimSimulation] = useState(false);
  const [claimStep, setClaimStep] = useState(1);
  
  // Insurance Literacy states
  const [showFactPopup, setShowFactPopup] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  
  // Compare Plans states
  const [showComparison, setShowComparison] = useState(false);
  const [plansToCompare, setPlansToCompare] = useState<string[]>([]);
  
  // Insurance categories
  const categories = [
    { id: "personal", name: "Personal Protection", color: "#4f46e5", icon: "person", description: "Secure your life, future, and family." },
    { id: "health", name: "Health Coverage", color: "#10b981", icon: "favorite", description: "Stay financially prepared for medical emergencies." },
    { id: "assets", name: "Asset Protection", color: "#f59e0b", icon: "home", description: "Secure your possessions and property." },
    { id: "travel", name: "Travel & Mobility", color: "#ec4899", icon: "flight", description: "Travel confidently, whether local or international." },
    { id: "specialized", name: "Specialized Coverage", color: "#8b5cf6", icon: "shield", description: "Tailor-made plans for unique needs." },
    { id: "business", name: "Business Protection", color: "#92400e", icon: "work", description: "Protect your business, employees, and continuity." }
  ];

  // Insurance types
  const insuranceTypes = [
    // Personal Protection
    {
      id: "term",
      name: "Term Life Insurance",
      category: "Personal Protection",
      description: "High sum assured, low premium. Ideal for income replacement.",
      icon: "person_alert",
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
    {
      id: "grouphealth",
      name: "Group Mediclaim Plans",
      category: "Health Coverage",
      description: "Health cover offered to employees by companies.",
      icon: "business",
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
      description: "Protects electronics, appliances, furniture, jewelry inside your home.",
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
      id: "international",
      name: "International Travel Insurance",
      category: "Travel & Mobility",
      description: "Medical, cancellation, luggage, passport, and flight delay.",
      icon: "flight",
      color: "#ec4899"
    },
    {
      id: "domestic",
      name: "Domestic Travel Insurance",
      category: "Travel & Mobility",
      description: "For air/train/bus journeys within India.",
      icon: "train",
      color: "#ec4899"
    },
    {
      id: "student",
      name: "Student Travel Insurance",
      category: "Travel & Mobility",
      description: "For Indian students going abroad (covers health, tuition loss, etc.).",
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
      id: "adventure",
      name: "Adventure Sports Travel Cover",
      category: "Travel & Mobility",
      description: "For trekking, rafting, skiing, etc.",
      icon: "downhill_skiing",
      color: "#ec4899"
    },
    {
      id: "cab",
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
      id: "diabeteshypertension",
      name: "Diabetes/Hypertension Health Cover",
      category: "Specialized Coverage",
      description: "Pre-existing disease cover from Day 1.",
      icon: "monitor_heart",
      color: "#8b5cf6"
    },
    {
      id: "rural",
      name: "Rural & Agriculture Insurance (PMFBY)",
      category: "Specialized Coverage",
      description: "Covers crop failure, livestock, equipment, and Kisan Credit Cards.",
      icon: "agriculture",
      color: "#8b5cf6"
    },
    {
      id: "loan",
      name: "Loan Protection Insurance",
      category: "Specialized Coverage",
      description: "Pays EMIs in case of death, disability, or job loss.",
      icon: "credit_card",
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
      id: "legal",
      name: "Legal Expense Insurance",
      category: "Specialized Coverage",
      description: "Helps with lawyer fees and court expenses.",
      icon: "gavel",
      color: "#8b5cf6"
    },
    {
      id: "covidspecial",
      name: "Covid-19 Insurance",
      category: "Specialized Coverage",
      description: "Hospitalization, quarantine, and treatment costs.",
      icon: "coronavirus",
      color: "#8b5cf6"
    },
    {
      id: "opdspecial",
      name: "OPD Insurance",
      category: "Specialized Coverage",
      description: "Standalone or add-on. Covers outpatient visits.",
      icon: "medical_services",
      color: "#8b5cf6"
    },
    
    // Business Protection
    {
      id: "grouphealthbusiness",
      name: "Group Health Insurance",
      category: "Business Protection",
      description: "Provided to employees; helps in tax savings & retention.",
      icon: "groups",
      color: "#92400e"
    },
    {
      id: "commercial",
      name: "Commercial Property Insurance",
      category: "Business Protection",
      description: "Covers fire, flood, theft at shops, factories, offices.",
      icon: "store",
      color: "#92400e"
    },
    {
      id: "shopkeeper",
      name: "Shopkeeper's Insurance",
      category: "Business Protection",
      description: "Composite plan covering inventory, money, liability, etc.",
      icon: "storefront",
      color: "#92400e"
    },
    {
      id: "business",
      name: "Business Interruption Cover",
      category: "Business Protection",
      description: "Income protection in case of operations halt.",
      icon: "business_center",
      color: "#92400e"
    },
    {
      id: "marine",
      name: "Marine/Transit Insurance",
      category: "Business Protection",
      description: "Protects goods during transport via land/sea/air.",
      icon: "directions_boat",
      color: "#92400e"
    },
    {
      id: "cyberliability",
      name: "Cyber Liability for Business",
      category: "Business Protection",
      description: "Crucial for tech startups and online services.",
      icon: "security",
      color: "#92400e"
    },
    {
      id: "directors",
      name: "Directors & Officers Liability (D&O)",
      category: "Business Protection",
      description: "Protects company leaders from legal risks.",
      icon: "admin_panel_settings",
      color: "#92400e"
    },
    {
      id: "professional",
      name: "Professional Indemnity Insurance",
      category: "Business Protection",
      description: "For CA, doctors, architects, etc.",
      icon: "verified_user",
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
    <div className="min-h-screen bg-gray-50 pb-12">
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
            <div className="flex items-center mb-2">
              <span className="material-icons text-indigo-600 mr-2">calculate</span>
              <h3 className="font-medium text-indigo-700">Smart Insurance Advisor</h3>
            </div>
            <p className="text-xs text-gray-600">Get personalized insurance suggestions based on your profile.</p>
          </div>
          
          <div 
            className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-all"
            onClick={() => setShowClaimSimulation(true)}
          >
            <div className="flex items-center mb-2">
              <span className="material-icons text-green-600 mr-2">description</span>
              <h3 className="font-medium text-green-700">Claim Simulation</h3>
            </div>
            <p className="text-xs text-gray-600">See how the claim process works before you buy.</p>
          </div>
          
          <div 
            className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-all"
            onClick={() => {setShowFactPopup(true); setCurrentFact(Math.floor(Math.random() * 5))}}
          >
            <div className="flex items-center mb-2">
              <span className="material-icons text-amber-600 mr-2">lightbulb</span>
              <h3 className="font-medium text-amber-700">Insurance Literacy</h3>
            </div>
            <p className="text-xs text-gray-600">Learn key facts about insurance to make smarter decisions.</p>
          </div>
          
          <div 
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-all"
            onClick={() => setShowComparison(true)}
          >
            <div className="flex items-center mb-2">
              <span className="material-icons text-purple-600 mr-2">compare_arrows</span>
              <h3 className="font-medium text-purple-700">Compare Plans</h3>
            </div>
            <p className="text-xs text-gray-600">Side-by-side comparison of different insurance plans.</p>
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
                      <span className="material-icons text-xs" style={{ color: category.color }}>
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
                        if (type.id in allInsuranceTypes) {
                          setCurrentInsuranceDetail(type.id);
                          // Scroll to the detail section
                          setTimeout(() => {
                            document.getElementById('insurance-detail-section')?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }
                      }}
                      className={`py-1.5 px-2 rounded-md border transition-all cursor-pointer ${
                        activeType === type.id 
                          ? 'border-indigo-200 bg-indigo-50' 
                          : 'border-gray-100 hover:border-indigo-100 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        {type.id === "term" ? (
                          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                            <span className="material-icons text-xs text-indigo-600">person</span>
                          </div>
                        ) : (
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
                            style={{ backgroundColor: `${type.color}15` }}
                          >
                            <span className="material-icons text-xs" style={{ color: type.color }}>
                              {type.icon}
                            </span>
                          </div>
                        )}
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
          <div id="insurance-detail-section" className="mt-8 border rounded-lg bg-white shadow-sm">
            <div className="flex justify-between items-center p-4 border-b bg-indigo-50">
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
              <div className="mb-6">
                <p className="text-gray-700">{allInsuranceTypes[currentInsuranceDetail].detailedDescription}</p>
              </div>
              
              {/* Key Features */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-indigo-800 mb-3">Key Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {allInsuranceTypes[currentInsuranceDetail].features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start bg-indigo-50 p-3 rounded-md">
                      <span className="material-icons text-indigo-600 mr-2 mt-0.5">check_circle</span>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Why You Need It */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-indigo-800 mb-3">Why You Need It</h4>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-indigo-50">
                        <th className="py-2 px-3 text-left text-indigo-700">Benefit</th>
                        <th className="py-2 px-3 text-left text-indigo-700">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allInsuranceTypes[currentInsuranceDetail].keyPoints.map((point: {title: string, content: string}, index: number) => (
                        <tr key={index} className="border-t">
                          <td className="py-2 px-3 font-medium text-gray-700">{point.title}</td>
                          <td className="py-2 px-3 text-gray-600">{point.content}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Tax Benefits */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-indigo-800 mb-3">Tax Benefits</h4>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    {allInsuranceTypes[currentInsuranceDetail].taxBenefits.map((tax: {section: string, benefit: string}, index: number) => (
                      <div key={index} className="flex">
                        <div className="mr-3">
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
                            {tax.section}
                          </span>
                        </div>
                        <div className="text-gray-700 text-sm">{tax.benefit}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Note: Tax benefits are subject to changes in tax laws.</p>
                </div>
              </div>
              
              {/* How to Buy */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-indigo-800 mb-3">How to Buy</h4>
                <div className="space-y-2">
                  {allInsuranceTypes[currentInsuranceDetail].howToBuy.map((step: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <span className="text-indigo-700 font-medium text-sm">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Types */}
              {allInsuranceTypes[currentInsuranceDetail].types && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-indigo-800 mb-3">Types of {allInsuranceTypes[currentInsuranceDetail].name}</h4>
                  <div className="space-y-3">
                    {allInsuranceTypes[currentInsuranceDetail].types.map((type: {name: string, description: string}, index: number) => (
                      <div key={index} className="bg-white shadow-sm rounded-lg p-3 border border-gray-200">
                        <h5 className="font-medium text-indigo-700 mb-1">{type.name}</h5>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Best For */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-indigo-800 mb-3">Best For</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {allInsuranceTypes[currentInsuranceDetail].bestFor.map((item: string, index: number) => (
                    <div key={index} className="flex items-center bg-gray-50 p-2 rounded-md">
                      <span className="material-icons text-indigo-600 mr-2">person</span>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Common Mistakes */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-indigo-800 mb-3">Common Mistakes to Avoid</h4>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-red-50">
                        <th className="py-2 px-3 text-left text-red-700">Mistake</th>
                        <th className="py-2 px-3 text-left text-red-700">Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allInsuranceTypes[currentInsuranceDetail].commonMistakes.map((mistake: {mistake: string, risk: string}, index: number) => (
                        <tr key={index} className="border-t">
                          <td className="py-2 px-3 font-medium text-gray-700">❌ {mistake.mistake}</td>
                          <td className="py-2 px-3 text-gray-600">{mistake.risk}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Real-Life Scenarios */}
              {allInsuranceTypes[currentInsuranceDetail].realLifeScenarios && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-indigo-800 mb-3">Real-Life Scenarios</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {allInsuranceTypes[currentInsuranceDetail].realLifeScenarios.map((scenario: {name: string, scenario: string}, index: number) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-indigo-700 mb-2">{scenario.name}</h5>
                        <p className="text-sm text-gray-600 whitespace-pre-line">{scenario.scenario}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Claim Process */}
              {allInsuranceTypes[currentInsuranceDetail].claimProcess && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-indigo-800 mb-3">Claim Process</h4>
                  <div className="relative">
                    <div className="absolute h-full w-0.5 bg-indigo-200 left-3 top-0"></div>
                    <div className="space-y-4">
                      {allInsuranceTypes[currentInsuranceDetail].claimProcess.map((step: string, index: number) => (
                        <div key={index} className="flex relative z-10">
                          <div className="w-6 h-6 rounded-full bg-indigo-500 flex-shrink-0 mr-4"></div>
                          <div className="bg-white shadow-sm rounded-md p-3 flex-grow">
                            <p className="text-gray-700">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Add-on Riders */}
              {allInsuranceTypes[currentInsuranceDetail].addOnRiders && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-indigo-800 mb-3">Recommended Add-on Riders</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {allInsuranceTypes[currentInsuranceDetail].addOnRiders.map((rider: {rider: string, benefit: string}, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <h5 className="font-medium text-indigo-700 flex items-center mb-1">
                          <span className="material-icons text-indigo-500 mr-1 text-sm">add_circle</span>
                          {rider.rider}
                        </h5>
                        <p className="text-sm text-gray-600">{rider.benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Expert Tips */}
              {allInsuranceTypes[currentInsuranceDetail].expertTips && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-indigo-800 mb-3">Expert Tips</h4>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <ul className="space-y-2">
                      {allInsuranceTypes[currentInsuranceDetail].expertTips.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="material-icons text-amber-600 mr-2 text-sm flex-shrink-0 mt-0.5">lightbulb</span>
                          <span className="text-gray-700 text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {/* Suggested Companies */}
              {allInsuranceTypes[currentInsuranceDetail].suggestedCompanies && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-indigo-800 mb-3">Suggested Companies</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-indigo-50">
                          <th className="py-2 px-3 text-left text-indigo-700">Insurer</th>
                          <th className="py-2 px-3 text-left text-indigo-700">Claim Settlement</th>
                          <th className="py-2 px-3 text-left text-indigo-700">Rating</th>
                          <th className="py-2 px-3 text-left text-indigo-700">Online Experience</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allInsuranceTypes[currentInsuranceDetail].suggestedCompanies.map((company: {insurer: string, claimRatio: string, rating: number, onlineEase: string}, index: number) => (
                          <tr key={index} className="border-t">
                            <td className="py-3 px-3 font-medium text-gray-700">{company.insurer}</td>
                            <td className="py-3 px-3 text-gray-600">{company.claimRatio}</td>
                            <td className="py-3 px-3">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <span 
                                    key={i} 
                                    className={`material-icons text-sm ${i < company.rating ? 'text-amber-500' : 'text-gray-300'}`}
                                  >
                                    star
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-3 text-gray-600">{company.onlineEase}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t p-4 bg-white">
              <div className="flex justify-end">
                <div className="space-x-2">
                  <button 
                    className="py-2 px-6 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    <span className="material-icons text-sm align-text-top mr-1">shopping_cart</span>
                    Explore Plans
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Smart Insurance Advisor Modal */}
        {showRecommender && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Insurance Advisor</h3>
                <button 
                  onClick={() => {setShowRecommender(false); setShowRecommendations(false);}}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
              
              {!showRecommendations ? (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Enter your details below for personalized insurance recommendations
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                      <select 
                        className="w-full rounded-md border border-gray-300 p-2 text-sm" 
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      >
                        {[...Array(50)].map((_, i) => (
                          <option key={i} value={i + 20}>{i + 20}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income (₹)</label>
                      <select 
                        className="w-full rounded-md border border-gray-300 p-2 text-sm" 
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                      >
                        <option value="300000">3 Lakhs</option>
                        <option value="600000">6 Lakhs</option>
                        <option value="1000000">10 Lakhs</option>
                        <option value="1500000">15 Lakhs</option>
                        <option value="2000000">20+ Lakhs</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number of Dependents</label>
                      <select 
                        className="w-full rounded-md border border-gray-300 p-2 text-sm" 
                        value={dependents}
                        onChange={(e) => setDependents(e.target.value)}
                      >
                        {[...Array(6)].map((_, i) => (
                          <option key={i} value={i}>{i}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <select 
                        className="w-full rounded-md border border-gray-300 p-2 text-sm" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        <option value="metro">Metro City</option>
                        <option value="tier2">Tier-2 City</option>
                        <option value="town">Small Town</option>
                        <option value="rural">Rural</option>
                      </select>
                    </div>
                  </div>
                  
                  <button 
                    className="mt-5 w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                    onClick={() => setShowRecommendations(true)}
                  >
                    Get Recommendations
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-3">Here's your ideal insurance mix:</p>
                  
                  <div className="space-y-3">
                    {/* Dynamic recommendations based on user inputs */}
                    {(() => {
                      // Calculate recommendations based on user inputs
                      const ageNum = parseInt(age);
                      const incomeNum = parseInt(income);
                      const dependentsNum = parseInt(dependents);
                      
                      // Term life percentage based on age and dependents
                      let termLifePercent = 30;
                      if (ageNum < 30 && dependentsNum > 1) termLifePercent = 40;
                      else if (ageNum > 45) termLifePercent = 25;
                      else if (dependentsNum > 2) termLifePercent = 35;
                      
                      // Health insurance percentage based on age
                      let healthPercent = 25;
                      if (ageNum > 40) healthPercent = 30;
                      else if (ageNum < 30) healthPercent = 20;
                      
                      // Critical illness percentage based on age
                      let criticalPercent = 15;
                      if (ageNum > 45) criticalPercent = 20;
                      
                      // Asset protection percentages
                      let motorPercent = incomeNum > 1000000 ? 15 : 10;
                      let homePercent = location === "metro" ? 15 : 10;
                      
                      // Adjust home percentage for rural areas
                      if (location === "rural") homePercent = 5;
                      
                      // Calculate cover amounts
                      const termCover = incomeNum * (ageNum < 35 ? 12 : 8);
                      const healthCover = incomeNum * (dependentsNum > 0 ? 0.7 : 0.5);
                      const criticalCover = incomeNum * 0.4;
                      
                      return (
                        <>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Term Life Insurance</span>
                              <span className="text-sm font-bold text-indigo-700">{termLifePercent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${termLifePercent}%` }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Cover amount: ₹{termCover.toLocaleString()}</p>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Health Insurance</span>
                              <span className="text-sm font-bold text-indigo-700">{healthPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${healthPercent}%` }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Cover amount: ₹{healthCover.toLocaleString()}</p>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Critical Illness Cover</span>
                              <span className="text-sm font-bold text-indigo-700">{criticalPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${criticalPercent}%` }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Cover amount: ₹{criticalCover.toLocaleString()}</p>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Motor Insurance</span>
                              <span className="text-sm font-bold text-indigo-700">{motorPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${motorPercent}%` }}></div>
                            </div>
                            {incomeNum > 1000000 && (
                              <p className="text-xs text-gray-500 mt-1">Comprehensive + Zero Dep coverage recommended</p>
                            )}
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Home Insurance</span>
                              <span className="text-sm font-bold text-indigo-700">{homePercent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${homePercent}%` }}></div>
                            </div>
                            {location === "metro" && (
                              <p className="text-xs text-gray-500 mt-1">Structure + Contents coverage recommended</p>
                            )}
                          </div>
                          
                          {/* Add special recommendation for seniors */}
                          {ageNum > 45 && (
                            <div className="bg-gray-50 p-3 rounded-md">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium">Retirement Planning</span>
                                <span className="text-sm font-bold text-indigo-700">{10}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${10}%` }}></div>
                              </div>
                            </div>
                          )}
                          
                          {/* Add child education plan recommendation for those with dependents */}
                          {dependentsNum > 0 && ageNum < 45 && (
                            <div className="bg-gray-50 p-3 rounded-md">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium">Child Education Plan</span>
                                <span className="text-sm font-bold text-indigo-700">{dependentsNum * 5}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${dependentsNum * 5}%` }}></div>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  
                  <div className="flex mt-5">
                    <button 
                      className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors mr-2"
                      onClick={() => setShowRecommendations(false)}
                    >
                      Back
                    </button>
                    <button 
                      className="flex-1 py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                      onClick={() => {setShowRecommender(false); setShowRecommendations(false);}}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Claim Simulation Modal */}
        {showClaimSimulation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Claim Simulation</h3>
                <button 
                  onClick={() => {setShowClaimSimulation(false); setClaimStep(1);}}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center">
                  {[1, 2, 3, 4].map((step) => (
                    <React.Fragment key={step}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${claimStep >= step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {claimStep > step ? <span className="material-icons text-sm">check</span> : step}
                      </div>
                      {step < 4 && (
                        <div className={`flex-1 h-1 ${claimStep > step ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              {claimStep === 1 && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Step 1: Report the Incident</h4>
                  <p className="text-sm text-gray-600 mb-3">Report your claim through any of these channels:</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center p-2 bg-indigo-50 rounded-md">
                      <span className="material-icons text-indigo-600 mr-2">phone</span>
                      <span className="text-sm">24x7 Toll-Free Helpline</span>
                    </div>
                    <div className="flex items-center p-2 bg-indigo-50 rounded-md">
                      <span className="material-icons text-indigo-600 mr-2">smartphone</span>
                      <span className="text-sm">Mobile App</span>
                    </div>
                    <div className="flex items-center p-2 bg-indigo-50 rounded-md">
                      <span className="material-icons text-indigo-600 mr-2">language</span>
                      <span className="text-sm">Website Portal</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      className="py-2 px-6 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                      onClick={() => setClaimStep(2)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              
              {claimStep === 2 && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Step 2: Document Submission</h4>
                  <p className="text-sm text-gray-600 mb-3">Submit the following documents:</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <span className="material-icons text-green-500 mr-2 text-sm">check_circle</span>
                      <span className="text-sm">Filled claim form</span>
                    </div>
                    <div className="flex items-center">
                      <span className="material-icons text-green-500 mr-2 text-sm">check_circle</span>
                      <span className="text-sm">Policy documents</span>
                    </div>
                    <div className="flex items-center">
                      <span className="material-icons text-green-500 mr-2 text-sm">check_circle</span>
                      <span className="text-sm">ID proof / Address proof</span>
                    </div>
                    <div className="flex items-center">
                      <span className="material-icons text-green-500 mr-2 text-sm">check_circle</span>
                      <span className="text-sm">Other relevant documents (varies by claim type)</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button 
                      className="py-2 px-6 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
                      onClick={() => setClaimStep(1)}
                    >
                      Back
                    </button>
                    <button 
                      className="py-2 px-6 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                      onClick={() => setClaimStep(3)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              
              {claimStep === 3 && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Step 3: Claim Processing</h4>
                  <p className="text-sm text-gray-600 mb-3">Here's what happens at our end:</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="p-2 bg-indigo-50 rounded-md flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                        <span className="material-icons text-indigo-600 text-sm">search</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Claim Verification</p>
                        <p className="text-xs text-gray-500">We verify all documents and policy details</p>
                      </div>
                    </div>
                    
                    <div className="p-2 bg-indigo-50 rounded-md flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                        <span className="material-icons text-indigo-600 text-sm">person</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Investigation (if needed)</p>
                        <p className="text-xs text-gray-500">For complex claims, we may need to investigate further</p>
                      </div>
                    </div>
                    
                    <div className="p-2 bg-indigo-50 rounded-md flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                        <span className="material-icons text-indigo-600 text-sm">assessment</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Claim Assessment</p>
                        <p className="text-xs text-gray-500">We assess the claim amount based on policy terms</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button 
                      className="py-2 px-6 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
                      onClick={() => setClaimStep(2)}
                    >
                      Back
                    </button>
                    <button 
                      className="py-2 px-6 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                      onClick={() => setClaimStep(4)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              
              {claimStep === 4 && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Step 4: Claim Settlement</h4>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                    <div className="flex items-center mb-2">
                      <span className="material-icons text-green-500 mr-2">check_circle</span>
                      <span className="text-green-700 font-medium">Claim Approved!</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Payment is transferred directly to your bank account within 7-10 working days. You will receive SMS and email notifications at each step.
                    </p>
                    
                    <div className="mt-3 text-sm">
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-600">Claim Reference:</span>
                        <span className="font-medium">CLM28937654</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-600">Approval Date:</span>
                        <span className="font-medium">22 May, 2025</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">₹2,50,000</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600">Expected Credit:</span>
                        <span className="font-medium">29 May, 2025</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button 
                      className="py-2 px-6 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
                      onClick={() => setClaimStep(3)}
                    >
                      Back
                    </button>
                    <button 
                      className="py-2 px-6 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                      onClick={() => {setShowClaimSimulation(false); setClaimStep(1);}}
                    >
                      Finish
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Insurance Literacy Pop-up */}
        {showFactPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="material-icons text-amber-500 mr-2">lightbulb</span>
                  <h3 className="text-lg font-semibold text-gray-800">Did You Know?</h3>
                </div>
                <button 
                  onClick={() => setShowFactPopup(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
              
              {currentFact === 0 && (
                <div>
                  <p className="text-sm text-gray-700 mb-3">
                    <span className="font-semibold">Term Insurance</span> is the most affordable type 
                    of life insurance. For a 30-year-old non-smoker, a ₹1 crore cover would typically cost less than ₹1,000 per month.
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Source: IRDAI Claim Settlement Ratio Report, 2023
                  </p>
                </div>
              )}
              
              {currentFact === 1 && (
                <div>
                  <p className="text-sm text-gray-700 mb-3">
                    <span className="font-semibold">Claim Settlement Ratio</span> is a key factor 
                    when choosing insurance. Top companies in India have settlement ratios of over 97%, 
                    meaning they approve 97 out of 100 claims.
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Source: IRDAI Claim Settlement Ratio Report, 2023
                  </p>
                </div>
              )}
              
              {currentFact === 2 && (
                <div>
                  <p className="text-sm text-gray-700 mb-3">
                    <span className="font-semibold">Health Insurance</span> provides tax benefits 
                    under Section 80D. You can claim up to ₹25,000 for self and family, and an 
                    additional ₹50,000 for senior citizen parents.
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Source: Income Tax Act, 1961
                  </p>
                </div>
              )}
              
              {currentFact === 3 && (
                <div>
                  <p className="text-sm text-gray-700 mb-3">
                    <span className="font-semibold">Free Look Period</span> allows you to review your 
                    policy after purchase. If not satisfied, you can cancel within 15-30 days and get 
                    a refund (minus charges for coverage period).
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Source: IRDAI Guidelines for Insurance Contracts
                  </p>
                </div>
              )}
              
              {currentFact === 4 && (
                <div>
                  <p className="text-sm text-gray-700 mb-3">
                    <span className="font-semibold">Most Indians are underinsured</span>. The ideal 
                    life cover should be at least 10-15 times your annual income, but the average 
                    Indian has coverage of only 3 times their income.
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Source: National Insurance Awareness Survey, 2023
                  </p>
                </div>
              )}
              
              <div className="flex justify-between">
                <button 
                  className="py-2 px-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors text-sm"
                  onClick={() => setCurrentFact((currentFact + 4) % 5)}
                >
                  Previous
                </button>
                <button 
                  className="py-2 px-3 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 transition-colors text-sm"
                  onClick={() => setCurrentFact((currentFact + 1) % 5)}
                >
                  Next Fact
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Compare Plans Modal */}
        {showComparison && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Compare Insurance Plans</h3>
                <button 
                  onClick={() => setShowComparison(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
              
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 border-b"></th>
                      <th className="p-3 border-b font-medium text-gray-700">Term Insurance</th>
                      <th className="p-3 border-b font-medium text-gray-700">ULIP</th>
                      <th className="p-3 border-b font-medium text-gray-700">Endowment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border-b font-medium text-gray-700">Primary Purpose</td>
                      <td className="p-3 border-b text-gray-600">Pure Protection</td>
                      <td className="p-3 border-b text-gray-600">Insurance + Investment</td>
                      <td className="p-3 border-b text-gray-600">Insurance + Savings</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium text-gray-700">Premium Amount</td>
                      <td className="p-3 border-b text-gray-600">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Low</span>
                      </td>
                      <td className="p-3 border-b text-gray-600">
                        <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">High</span>
                      </td>
                      <td className="p-3 border-b text-gray-600">
                        <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">High</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium text-gray-700">Cover Amount</td>
                      <td className="p-3 border-b text-gray-600">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Very High</span>
                      </td>
                      <td className="p-3 border-b text-gray-600">
                        <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Moderate</span>
                      </td>
                      <td className="p-3 border-b text-gray-600">
                        <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Moderate</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium text-gray-700">Returns</td>
                      <td className="p-3 border-b text-gray-600">None (protection only)</td>
                      <td className="p-3 border-b text-gray-600">Market-linked (variable)</td>
                      <td className="p-3 border-b text-gray-600">Guaranteed + Bonuses</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium text-gray-700">Lock-in Period</td>
                      <td className="p-3 border-b text-gray-600">None</td>
                      <td className="p-3 border-b text-gray-600">5 years</td>
                      <td className="p-3 border-b text-gray-600">Policy term</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium text-gray-700">Liquidity</td>
                      <td className="p-3 border-b text-gray-600">
                        <span className="inline-block px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Low</span>
                      </td>
                      <td className="p-3 border-b text-gray-600">
                        <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Medium</span>
                      </td>
                      <td className="p-3 border-b text-gray-600">
                        <span className="inline-block px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Low</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium text-gray-700">Tax Benefits</td>
                      <td className="p-3 border-b text-gray-600">Section 80C & 10(10D)</td>
                      <td className="p-3 border-b text-gray-600">Section 80C & 10(10D)</td>
                      <td className="p-3 border-b text-gray-600">Section 80C & 10(10D)</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium text-gray-700">Riders Available</td>
                      <td className="p-3 border-b text-gray-600">
                        <div className="flex items-center">
                          <span className="material-icons text-green-500 text-sm mr-1">check</span>
                          <span>Critical Illness, Accidental Death</span>
                        </div>
                      </td>
                      <td className="p-3 border-b text-gray-600">
                        <div className="flex items-center">
                          <span className="material-icons text-green-500 text-sm mr-1">check</span>
                          <span>Critical Illness, Premium Waiver</span>
                        </div>
                      </td>
                      <td className="p-3 border-b text-gray-600">
                        <div className="flex items-center">
                          <span className="material-icons text-green-500 text-sm mr-1">check</span>
                          <span>Critical Illness, Premium Waiver</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium text-gray-700">Claim Settlement Ratio</td>
                      <td className="p-3 border-b text-gray-600">98.5%</td>
                      <td className="p-3 border-b text-gray-600">97.2%</td>
                      <td className="p-3 border-b text-gray-600">98.1%</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-gray-700">Best For</td>
                      <td className="p-3 text-gray-600">Income replacement, loan protection</td>
                      <td className="p-3 text-gray-600">Long-term wealth building with protection</td>
                      <td className="p-3 text-gray-600">Guaranteed savings with protection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <button 
                className="w-full py-2 px-4 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors"
                onClick={() => setShowComparison(false)}
              >
                Close Comparison
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}