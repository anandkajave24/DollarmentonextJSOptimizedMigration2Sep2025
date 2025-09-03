import React, { useState, useEffect } from "react";
import { SEO } from "../components/SEO";

export default function InsuranceHubSimple() {
  const [activeType, setActiveType] = useState("term");
  const [activeCategoryId, setActiveCategoryId] = useState("personal");
  const [filteredInsuranceTypes, setFilteredInsuranceTypes] = useState<any[]>([]);
  const [selectedInsuranceDetail, setSelectedInsuranceDetail] = useState<any>(null);
  
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
      color: "#4f46e5",
      detailedDescription: "Term life insurance provides coverage for a specific period. If the insured dies during this period, the beneficiaries receive the sum assured. If the insured survives the term, no benefit is paid. It's the most affordable type of life insurance.",
      features: [
        "High Sum Assured (up to 5 Cr or more)",
        "Low premium (a 30-year-old can get 1 Cr cover for around ₹800/month)",
        "Tax benefits under Section 80C and 10(10D)",
        "Rider options like critical illness, accidental death benefit"
      ],
      bestFor: [
        "Primary income earners",
        "People with dependents",
        "Loan protection",
        "Young professionals (cheaper premiums)"
      ]
    },
    {
      id: "wholelife",
      name: "Whole Life Insurance",
      category: "Personal Protection",
      description: "Covers you till 99/100 years. Guaranteed payout.",
      icon: "all_inclusive",
      color: "#4f46e5",
      detailedDescription: "Whole life insurance provides coverage for your entire lifetime, rather than a specific term. It comes with a savings component that builds cash value over time. The policy pays out whenever you die, regardless of age.",
      features: [
        "Lifetime coverage (typically up to age 100)",
        "Builds cash value over time that you can borrow against",
        "Fixed premiums that don't increase with age",
        "Guaranteed death benefit for beneficiaries"
      ],
      bestFor: [
        "Those seeking lifetime protection",
        "People with long-term dependents",
        "Estate planning needs",
        "Those wanting cash value accumulation"
      ]
    },
    {
      id: "ulip",
      name: "ULIP (Unit Linked Insurance Plan)",
      category: "Personal Protection",
      description: "Life cover + market-linked returns. Long-term wealth building.",
      icon: "trending_up",
      color: "#4f46e5",
      detailedDescription: "Unit Linked Insurance Plans (ULIPs) combine insurance protection with investment. Part of your premium is used for insurance coverage, and the rest is invested in market-linked funds of your choice.",
      features: [
        "Dual benefit of insurance and investment",
        "Choice of investment funds (equity, debt, balanced)",
        "Tax benefits under Section 80C and 10(10D)",
        "Option to switch between funds"
      ],
      bestFor: [
        "Long-term investors (minimum 10-15 year horizon)",
        "Those seeking market-linked returns with protection",
        "People comfortable with some investment risk",
        "Tax-saving with wealth creation goals"
      ]
    },
    {
      id: "endowment",
      name: "Endowment Plan",
      category: "Personal Protection",
      description: "Insurance + savings with guaranteed maturity benefit.",
      icon: "savings",
      color: "#4f46e5",
      detailedDescription: "Endowment plans provide life insurance coverage along with savings. They pay a lump sum either on policy maturity or on death of the insured during the policy term, whichever is earlier.",
      features: [
        "Fixed sum assured payable on death or maturity",
        "Guaranteed returns plus bonuses",
        "Regular savings discipline",
        "Loan facility against policy"
      ],
      bestFor: [
        "Risk-averse individuals",
        "Those with specific financial goals",
        "People seeking guaranteed returns",
        "Those wanting disciplined savings"
      ]
    },
    {
      id: "moneyback",
      name: "Money Back Plan",
      category: "Personal Protection",
      description: "Periodic payouts during the policy term + maturity benefit.",
      icon: "payments",
      color: "#4f46e5",
      detailedDescription: "Money Back policies are a type of endowment plan that provides periodic payments during the policy term, rather than a lump sum at maturity. They combine insurance protection with regular liquidity.",
      features: [
        "Survival benefits at regular intervals (20% of sum assured every 5 years)",
        "Final payment at maturity",
        "Death benefit throughout the policy term",
        "Bonuses added to enhance returns"
      ],
      bestFor: [
        "Those needing regular cash flows",
        "People planning for periodic expenses",
        "Risk-averse investors seeking liquidity",
        "Middle-aged individuals"
      ]
    },
    {
      id: "returnpremium",
      name: "Return of Premium Term Plan",
      category: "Personal Protection",
      description: "Term plan that returns premium if you survive the term.",
      icon: "assignment_return",
      color: "#4f46e5",
      detailedDescription: "Return of Premium (TROP) is a term insurance plan that returns all the premiums paid if the insured survives the policy term. If death occurs during the term, beneficiaries receive the death benefit.",
      features: [
        "Death benefit during policy term",
        "Return of all premiums paid if insured survives",
        "Higher premiums than regular term plans",
        "Same tax benefits as regular term insurance"
      ],
      bestFor: [
        "Those hesitant about 'getting nothing back'",
        "People who want premium refund if they outlive the policy",
        "Those willing to pay higher premiums for this benefit",
        "Risk-averse individuals"
      ]
    },
    {
      id: "childeducation",
      name: "Child Education Plans",
      category: "Personal Protection",
      description: "Fund your child's education milestones even in your absence.",
      icon: "school",
      color: "#4f46e5",
      detailedDescription: "Child education plans are designed to secure your child's future education needs. They provide funds at key milestones, and include a premium waiver feature that continues the policy benefits even if the parent dies.",
      features: [
        "Payouts aligned with education milestones",
        "Premium waiver benefit on parent's death",
        "Policy continues even after parent's death",
        "Option for annual or lump sum payouts"
      ],
      bestFor: [
        "Parents with young children",
        "Long-term education planning",
        "Securing child's future against uncertainties",
        "Tax-efficient education funding"
      ]
    },
    {
      id: "pension",
      name: "Pension / Retirement Plans",
      category: "Personal Protection",
      description: "Monthly income post-retirement. Deferred or immediate annuity.",
      icon: "elderly",
      color: "#4f46e5",
      detailedDescription: "Pension plans help create a regular income stream after retirement. You accumulate a corpus during your working years, which is then converted into regular pension payments (annuity) during retirement.",
      features: [
        "Accumulation phase + Payout phase",
        "Regular income after retirement",
        "Options for payment frequency (monthly/quarterly/annual)",
        "Immediate or deferred annuity options"
      ],
      bestFor: [
        "Retirement planning",
        "Creating guaranteed income stream",
        "Supplementing other retirement benefits",
        "Long-term financial security"
      ]
    },
    {
      id: "seniorcitizen",
      name: "Senior Citizen Life Cover",
      category: "Personal Protection",
      description: "For people aged 60+, with limited underwriting.",
      icon: "elderly_woman",
      color: "#4f46e5",
      detailedDescription: "Senior citizen life insurance policies are designed for older adults (typically 60+ years) who may find it difficult to get coverage under regular policies. They often have simplified underwriting and higher premiums.",
      features: [
        "Coverage for ages 60-80 years",
        "Simplified health checks",
        "Shorter policy terms (5-15 years)",
        "Specialized riders for age-related concerns"
      ],
      bestFor: [
        "Senior citizens",
        "Those with legacy planning needs",
        "Cover final expenses and debts",
        "People seeking peace of mind for loved ones"
      ]
    },
    {
      id: "nrilife",
      name: "NRI Life Insurance Plans",
      category: "Personal Protection",
      description: "Specially designed for NRIs wanting Indian insurance.",
      icon: "flight_takeoff",
      color: "#4f46e5",
      detailedDescription: "NRI life insurance plans are tailored for Non-Resident Indians, allowing them to purchase Indian insurance policies while living abroad. These plans typically offer coverage in foreign currency and have NRI-friendly documentation processes.",
      features: [
        "Premium payment in foreign currency",
        "Coverage while residing abroad",
        "Simplified documentation for NRIs",
        "Benefits payable in India or abroad"
      ],
      bestFor: [
        "Non-Resident Indians",
        "Those with dependents in India",
        "NRIs with Indian assets and liabilities",
        "Planning to return to India eventually"
      ]
    },
    
    // Health Coverage
    {
      id: "health",
      name: "Individual Health Insurance",
      category: "Health Coverage",
      description: "Covers a single person for hospitalization, OPD, etc.",
      icon: "health_and_safety",
      color: "#10b981",
      detailedDescription: "Health insurance covers medical expenses incurred due to illness, injury, or accident. It typically pays for hospitalization, surgery, medication, and other healthcare services.",
      features: [
        "Cashless treatment at network hospitals",
        "Pre and post hospitalization coverage",
        "No claim bonus for claim-free years",
        "Coverage for day care procedures"
      ],
      bestFor: [
        "Everyone, regardless of age",
        "Families (with family floater options)",
        "Senior citizens (special plans available)",
        "People without employer coverage"
      ]
    },
    {
      id: "familyfloater",
      name: "Family Floater Plan",
      category: "Health Coverage",
      description: "One policy for the entire family. Shared sum insured.",
      icon: "groups",
      color: "#10b981",
      detailedDescription: "Family floater health insurance covers the entire family under a single policy with a shared sum insured. The coverage can be used by any or all insured family members during the policy year until the sum insured is exhausted.",
      features: [
        "Single premium for entire family",
        "Shared sum insured among family members",
        "More cost-effective than individual policies",
        "Typically covers spouse, children, and parents"
      ],
      bestFor: [
        "Young families with children",
        "Couples planning for children",
        "Families looking for comprehensive coverage",
        "Budget-conscious families needing coverage"
      ]
    },
    {
      id: "topup",
      name: "Top-Up & Super Top-Up Plans",
      category: "Health Coverage",
      description: "Additional coverage over base health plans.",
      icon: "add_circle",
      color: "#10b981",
      detailedDescription: "Top-up health insurance provides additional coverage over and above your basic health insurance policy. It activates once your basic sum insured is exhausted or when medical expenses exceed a predefined deductible limit.",
      features: [
        "High sum insured at relatively low premiums",
        "Deductible feature (coverage starts after threshold)",
        "Super top-up covers aggregate expenses",
        "Complements basic health insurance"
      ],
      bestFor: [
        "Those with basic health insurance seeking higher coverage",
        "People in high-cost medical areas",
        "Those with family history of serious illnesses",
        "Budget-conscious people seeking high coverage"
      ]
    },
    {
      id: "critical",
      name: "Critical Illness Insurance",
      category: "Health Coverage", 
      description: "Lump-sum payout for life-threatening illnesses like cancer, heart attack.",
      icon: "bolt",
      color: "#10b981",
      detailedDescription: "Critical illness insurance provides a one-time lump sum payment if you're diagnosed with a covered serious illness like cancer, heart attack, or stroke. This amount can be used for treatment, recovery, or any other expenses.",
      features: [
        "Fixed lump sum payout regardless of treatment costs",
        "Covers multiple serious conditions (typically 15-30 illnesses)",
        "Independent of actual medical expenses incurred",
        "Survival period requirement (typically 30 days after diagnosis)"
      ],
      bestFor: [
        "People with family history of critical illnesses",
        "Primary income earners",
        "Self-employed individuals",
        "Those seeking additional protection beyond health insurance"
      ]
    },
    {
      id: "accident",
      name: "Personal Accident Insurance",
      category: "Health Coverage",
      description: "Covers death, disability, and income loss from accidents.",
      icon: "local_hospital",
      color: "#10b981",
      detailedDescription: "Personal accident insurance provides financial protection against accidental death, disability, and injury. It pays benefits for accident-related events, including death, permanent disability, temporary disability, and medical expenses.",
      features: [
        "24/7 worldwide coverage",
        "Lump sum payment for accidental death",
        "Benefits for permanent/temporary disability",
        "Coverage for accident-related medical expenses"
      ],
      bestFor: [
        "Everyone, especially those in high-risk occupations",
        "Primary income earners",
        "Those who travel frequently",
        "People engaged in adventure sports/activities"
      ]
    },
    {
      id: "maternity",
      name: "Maternity & Newborn Insurance",
      category: "Health Coverage",
      description: "Covers pregnancy, delivery, and initial infant care.",
      icon: "pregnant_woman",
      color: "#10b981",
      detailedDescription: "Maternity insurance covers expenses related to pregnancy, childbirth, and newborn care. It typically includes pre and post-delivery expenses, hospital charges for normal or cesarean delivery, and initial newborn coverage.",
      features: [
        "Pre and post-natal care coverage",
        "Normal and cesarean delivery expenses",
        "Newborn baby coverage",
        "Vaccination and wellness benefits"
      ],
      bestFor: [
        "Family planning couples",
        "Newly married couples",
        "Women planning pregnancy",
        "Those seeking comprehensive family healthcare"
      ]
    },
    {
      id: "seniorhealth",
      name: "Senior Citizen Health Insurance",
      category: "Health Coverage",
      description: "Tailored for 60+ age group. Includes pre-existing disease cover.",
      icon: "elderly",
      color: "#10b981",
      detailedDescription: "Senior citizen health insurance is specifically designed for older adults (usually 60+ years). These plans offer coverage for age-related illnesses, pre-existing conditions, and often include benefits like home healthcare and preventive checkups.",
      features: [
        "Coverage for pre-existing diseases (with waiting period)",
        "Age-related illness coverage",
        "Preventive health checkups",
        "Home healthcare services"
      ],
      bestFor: [
        "Adults aged 60 and above",
        "Retirees without employer coverage",
        "Seniors with chronic conditions",
        "Those seeking financial protection against medical expenses"
      ]
    },
    {
      id: "opdwellness",
      name: "OPD & Wellness Add-Ons",
      category: "Health Coverage",
      description: "Doctor visits, diagnostics, therapy, and mental health.",
      icon: "medical_services",
      color: "#10b981",
      detailedDescription: "OPD (Out-Patient Department) and wellness add-ons cover expenses incurred for consultations, diagnostics, pharmacy, dental, vision care, and other outpatient treatments that don't require hospitalization.",
      features: [
        "Doctor consultation coverage",
        "Diagnostic tests and pharmacy expenses",
        "Preventive health checkups",
        "Dental, vision and alternative treatments"
      ],
      bestFor: [
        "Those requiring regular medical consultations",
        "People with chronic conditions",
        "Families with children (frequent doctor visits)",
        "Those seeking preventive healthcare coverage"
      ]
    },
    {
      id: "ayush",
      name: "AYUSH Coverage",
      category: "Health Coverage",
      description: "For Ayurveda, Yoga, Homeopathy, Unani treatments.",
      icon: "spa",
      color: "#10b981",
      detailedDescription: "AYUSH coverage provides insurance for alternative treatments under Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy. It covers consultations, medications, and treatments under these traditional Indian medical systems.",
      features: [
        "Coverage for non-allopathic treatments",
        "Hospitalization for AYUSH procedures",
        "Outpatient consultations",
        "Medications and therapy expenses"
      ],
      bestFor: [
        "Those preferring alternative medicine",
        "Patients with chronic conditions",
        "People seeking holistic treatment approaches",
        "Those combining conventional and traditional treatments"
      ]
    },
    {
      id: "grouphealth",
      name: "Group Mediclaim Plans",
      category: "Health Coverage",
      description: "Health cover offered to employees by companies.",
      icon: "business",
      color: "#10b981",
      detailedDescription: "Group health insurance is provided by employers to their employees. These plans typically offer coverage for employees and their dependents, with the premium either fully paid by the employer or shared with employees.",
      features: [
        "No medical underwriting for basic coverage",
        "Pre-existing disease coverage from day one",
        "Family coverage options",
        "Corporate discounts and better terms"
      ],
      bestFor: [
        "Employers providing employee benefits",
        "Startups and established businesses",
        "Professional associations and groups",
        "Organizations seeking tax benefits"
      ]
    },
    
    // Asset Protection
    {
      id: "homestructure",
      name: "Home Structure Insurance",
      category: "Asset Protection",
      description: "Covers physical damage to your house (fire, flood, etc.).",
      icon: "home",
      color: "#f59e0b",
      detailedDescription: "Home structure insurance provides coverage for the physical structure of your home against damage from perils like fire, lightning, explosion, floods, earthquakes, storms, and other natural disasters.",
      features: [
        "Coverage for building structure",
        "Protection against natural disasters",
        "Coverage for permanent fixtures and fittings",
        "Reconstruction cost coverage"
      ],
      bestFor: [
        "Homeowners",
        "Apartment owners",
        "Those with home loans (often mandatory)",
        "Property in disaster-prone areas"
      ]
    },
    {
      id: "homecontents",
      name: "Home Contents Insurance",
      category: "Asset Protection",
      description: "Protects electronics, appliances, furniture, jewelry inside your home.",
      icon: "chair",
      color: "#f59e0b",
      detailedDescription: "Home contents insurance covers household items like furniture, electronics, appliances, clothing, and valuables against theft, damage, or destruction. It provides financial protection for your personal belongings inside your home.",
      features: [
        "Coverage for household items and valuables",
        "Protection against theft, fire, and accidental damage",
        "Special coverage for high-value items",
        "Replacement cost or actual cash value options"
      ],
      bestFor: [
        "Homeowners and renters",
        "Those with valuable possessions",
        "People living in high-crime areas",
        "Anyone seeking peace of mind for belongings"
      ]
    },
    {
      id: "motor",
      name: "Motor Insurance – Car/Bike",
      category: "Asset Protection",
      description: "Mandatory in India. Third-party + own damage.",
      icon: "directions_car",
      color: "#f59e0b",
      detailedDescription: "Motor insurance provides protection for your vehicle against damage and theft, as well as covering liability for injuries and damage to other people and their property. Third-party insurance is mandatory in India.",
      features: [
        "Third-party liability coverage (mandatory)",
        "Own damage protection (comprehensive policies)",
        "Personal accident cover for owner-driver",
        "No claim bonus benefits",
        "Add-on covers like zero depreciation, engine protection"
      ],
      bestFor: [
        "All vehicle owners (legally required)",
        "New vehicle owners (comprehensive recommended)",
        "Vehicle owners in high-risk areas",
        "Frequent travelers"
      ]
    },
    {
      id: "gadget",
      name: "Gadget Insurance",
      category: "Asset Protection",
      description: "Covers mobile, laptop, and tablets from theft, liquid, or accidental damage.",
      icon: "devices",
      color: "#f59e0b",
      detailedDescription: "Gadget insurance protects your electronic devices such as smartphones, laptops, tablets, cameras, and other portable electronics against accidental damage, liquid damage, theft, and mechanical breakdown.",
      features: [
        "Accidental damage coverage",
        "Liquid damage protection",
        "Theft and loss coverage",
        "Worldwide protection",
        "Mechanical breakdown cover after warranty"
      ],
      bestFor: [
        "Those with expensive gadgets",
        "Frequent travelers",
        "Students and professionals",
        "Those with history of device damage"
      ]
    },
    {
      id: "jewellery",
      name: "Jewellery Insurance",
      category: "Asset Protection",
      description: "High-value item coverage against theft, burglary, and loss.",
      icon: "diamond",
      color: "#f59e0b",
      detailedDescription: "Jewelry insurance provides specialized coverage for valuable jewelry items against theft, loss, damage, and mysterious disappearance. It offers protection both at home and while traveling.",
      features: [
        "Coverage against theft and burglary",
        "Protection against accidental damage",
        "Coverage for mysterious disappearance",
        "Worldwide protection",
        "Agreed value coverage"
      ],
      bestFor: [
        "Those with high-value jewelry",
        "Wedding jewelry protection",
        "Heirloom and antique jewelry owners",
        "People who wear jewelry frequently"
      ]
    },
    {
      id: "fire",
      name: "Fire Insurance",
      category: "Asset Protection",
      description: "For home or business properties damaged by fire or related events.",
      icon: "local_fire_department",
      color: "#f59e0b",
      detailedDescription: "Fire insurance provides protection against damage or loss to property caused by fire, lightning, explosion, and other specified perils. It covers buildings, contents, and sometimes business interruption losses.",
      features: [
        "Coverage for fire and smoke damage",
        "Lightning and explosion protection",
        "Damage due to aircraft, riots, strikes",
        "Natural disaster protection (with add-ons)",
        "Business interruption coverage (commercial policies)"
      ],
      bestFor: [
        "Homeowners",
        "Business property owners",
        "Commercial establishments",
        "Manufacturing units and warehouses"
      ]
    },
    {
      id: "pet",
      name: "Pet Insurance",
      category: "Asset Protection",
      description: "Covers vet bills, surgeries, and death of your pet.",
      icon: "pets",
      color: "#f59e0b",
      detailedDescription: "Pet insurance covers veterinary expenses for your pets including illness, injury, accidents, and sometimes preventive care. It helps manage unexpected veterinary costs and ensures your pet receives necessary medical care.",
      features: [
        "Coverage for accidents and illnesses",
        "Surgical procedures and hospitalization",
        "Diagnostic tests and treatments",
        "Prescription medications",
        "Some plans cover preventive care"
      ],
      bestFor: [
        "Pet owners (dogs, cats, exotic pets)",
        "Those with purebred animals (higher health risks)",
        "Pet owners seeking financial protection against vet bills",
        "Those with multiple pets"
      ]
    },
    
    // Travel & Mobility
    {
      id: "international",
      name: "International Travel Insurance",
      category: "Travel & Mobility",
      description: "Medical, cancellation, luggage, passport, and flight delay.",
      icon: "flight",
      color: "#ec4899",
      detailedDescription: "International travel insurance provides comprehensive coverage for travelers abroad, including medical emergencies, trip cancellation, baggage loss, passport loss, flight delays, and personal liability while traveling internationally.",
      features: [
        "Medical emergency and evacuation coverage",
        "Trip cancellation and interruption benefits",
        "Baggage loss and delay protection",
        "Flight delay and missed connection coverage",
        "Passport loss assistance"
      ],
      bestFor: [
        "International travelers",
        "Business travelers",
        "Tourists and vacationers",
        "Students studying abroad"
      ]
    },
    {
      id: "domestic",
      name: "Domestic Travel Insurance",
      category: "Travel & Mobility",
      description: "For air/train/bus journeys within India.",
      icon: "train",
      color: "#ec4899",
      detailedDescription: "Domestic travel insurance provides coverage for travel within India, including trip cancellation, baggage loss, medical emergencies, and accident coverage during domestic journeys by air, train, or road.",
      features: [
        "Accident coverage during travel",
        "Trip cancellation and interruption",
        "Baggage loss and delay protection",
        "Emergency medical expenses",
        "Travel delay compensation"
      ],
      bestFor: [
        "Domestic travelers within India",
        "Family vacationers",
        "Business travelers",
        "Those traveling to remote locations"
      ]
    },
    {
      id: "student",
      name: "Student Travel Insurance",
      category: "Travel & Mobility",
      description: "For Indian students going abroad (covers health, tuition loss, etc.).",
      icon: "school",
      color: "#ec4899",
      detailedDescription: "Student travel insurance is designed for students studying abroad, providing coverage for medical expenses, study interruption, tuition fee protection, sponsor protection, and travel-related emergencies during their educational period overseas.",
      features: [
        "Medical expenses and evacuation",
        "Study interruption coverage",
        "Tuition fee reimbursement",
        "Sponsor protection (if sponsor dies)",
        "Compassionate visit coverage"
      ],
      bestFor: [
        "Students studying abroad",
        "Parents sending children overseas for education",
        "Scholarship students",
        "Exchange program participants"
      ]
    },
    {
      id: "seniortravel",
      name: "Senior Travel Plans",
      category: "Travel & Mobility",
      description: "Tailored for elderly international travelers.",
      icon: "elderly",
      color: "#ec4899",
      detailedDescription: "Senior travel insurance is specially designed for elderly travelers, providing enhanced medical coverage, pre-existing condition benefits, and other travel protections with higher limits and fewer restrictions for senior citizens.",
      features: [
        "Age-appropriate medical coverage",
        "Pre-existing condition coverage",
        "Lower deductibles for medical claims",
        "Extended coverage periods",
        "Emergency medical evacuation"
      ],
      bestFor: [
        "Travelers aged 60+",
        "Seniors with pre-existing conditions",
        "Retired couples traveling internationally",
        "Elderly visiting family abroad"
      ]
    },
    {
      id: "pilgrimage",
      name: "Pilgrimage Insurance (Yatra Cover)",
      category: "Travel & Mobility",
      description: "Popular for Char Dham, Vaishno Devi, Amarnath trips.",
      icon: "temple_hindu",
      color: "#ec4899",
      detailedDescription: "Pilgrimage insurance provides specialized coverage for religious journeys, including medical emergencies, accidental death, trip cancellation, and other risks associated with pilgrimages to places like Char Dham, Vaishno Devi, and Amarnath.",
      features: [
        "Medical coverage in remote locations",
        "Accidental death and disability benefits",
        "Trip cancellation protection",
        "Emergency evacuation from difficult terrain",
        "Loss of baggage containing religious items"
      ],
      bestFor: [
        "Religious pilgrims",
        "Senior citizens on pilgrimage",
        "Groups undertaking religious journeys",
        "Those traveling to remote pilgrimage sites"
      ]
    },
    {
      id: "adventure",
      name: "Adventure Sports Travel Cover",
      category: "Travel & Mobility",
      description: "For trekking, rafting, skiing, etc.",
      icon: "downhill_skiing",
      color: "#ec4899",
      detailedDescription: "Adventure sports insurance provides specialized coverage for high-risk activities like trekking, mountaineering, scuba diving, rafting, and skiing. Standard travel policies typically exclude these activities, making this coverage essential for adventure travelers.",
      features: [
        "Coverage for high-altitude activities",
        "Water sports protection",
        "Search and rescue operations",
        "Sports equipment coverage",
        "Adventure-specific medical coverage"
      ],
      bestFor: [
        "Adventure sports enthusiasts",
        "Trekkers and mountaineers",
        "Scuba divers and water sports participants",
        "Winter sports enthusiasts"
      ]
    },
    {
      id: "cab",
      name: "Cab Ride Insurance (Ola/Uber)",
      category: "Travel & Mobility",
      description: "Accident cover while traveling in app-based cabs.",
      icon: "local_taxi",
      color: "#ec4899",
      detailedDescription: "Cab ride insurance provides coverage for passengers using app-based taxi services like Ola and Uber. It offers protection against accidents, injuries, and even property damage occurring during the ride.",
      features: [
        "Personal accident coverage",
        "Emergency medical expenses",
        "Hospital cash allowance",
        "Trip cancellation protection",
        "Lost baggage coverage"
      ],
      bestFor: [
        "Frequent app-based cab users",
        "Business travelers using cabs",
        "Late-night cab passengers",
        "Those traveling with valuables"
      ]
    },
    
    // Specialized Coverage
    {
      id: "cancerspecific",
      name: "Cancer-Specific Insurance",
      category: "Specialized Coverage",
      description: "Covers multiple stages of cancer with lump sum benefits.",
      icon: "healing",
      color: "#8b5cf6",
      detailedDescription: "Cancer insurance provides specialized coverage specifically for cancer diagnosis and treatment. It offers staged payouts based on the severity of cancer, covering early, intermediate, and advanced stages with different benefit percentages.",
      features: [
        "Coverage for early to advanced stages",
        "Lump sum benefit upon diagnosis",
        "No restriction on treatment type",
        "Income protection during recovery",
        "Covers conventional and advanced treatments"
      ],
      bestFor: [
        "Those with family history of cancer",
        "Individuals seeking additional protection",
        "People in high-risk occupations",
        "Those wanting specific cancer coverage"
      ]
    },
    {
      id: "home",
      name: "Home Insurance",
      category: "Asset Protection",
      description: "Covers structure and contents of your home.",
      icon: "home",
      color: "#f59e0b",
      detailedDescription: "Home insurance protects your house structure and contents against damage from natural calamities, fire, theft, and other perils. It provides financial security for your most valuable physical asset.",
      features: [
        "Structure coverage (building, fixtures, fittings)",
        "Contents coverage (furniture, appliances, valuables)",
        "Natural disaster protection (fire, flood, earthquake)",
        "Burglary and theft coverage",
        "Temporary accommodation costs"
      ],
      bestFor: [
        "Homeowners",
        "People with valuable household items",
        "Those living in disaster-prone areas",
        "Mortgage holders (often required by lenders)"
      ]
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
        setSelectedInsuranceDetail(filtered[0]);
      }
    }
  }, [activeCategoryId]);
  
  // Set selected insurance detail when active type changes
  useEffect(() => {
    const detail = insuranceTypes.find(type => type.id === activeType);
    if (detail) {
      setSelectedInsuranceDetail(detail);
    }
  }, [activeType]);
  
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
                        // Scroll to detail section
                        setTimeout(() => {
                          document.getElementById('insurance-detail-section')?.scrollIntoView({ behavior: 'smooth' });
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
                          className="w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
                          style={{ backgroundColor: `${type.color}15` }}
                        >
                          <span className="material-icons text-xs" style={{ color: type.color }}>
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
        {selectedInsuranceDetail && (
          <div id="insurance-detail-section" className="mt-8 border rounded-lg bg-white shadow-sm">
            <div className="p-4 border-b bg-indigo-50 flex justify-between items-center">
              <h3 className="text-xl font-bold text-indigo-800">{selectedInsuranceDetail.name}</h3>
              <button className="bg-white py-1 px-3 rounded-md border text-sm text-gray-600">
                <span className="material-icons text-sm align-text-top mr-1">print</span>
                Print
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-700">{selectedInsuranceDetail.detailedDescription}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-indigo-700 mb-3">Key Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedInsuranceDetail.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start bg-indigo-50 p-3 rounded-md">
                      <span className="material-icons text-indigo-600 mr-2 mt-0.5">check_circle</span>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-indigo-700 mb-3">Best For</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedInsuranceDetail.bestFor.map((item: string, index: number) => (
                    <div key={index} className="flex items-center bg-gray-50 p-2 rounded-md">
                      <span className="material-icons text-indigo-600 mr-2">person</span>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t p-4 flex justify-end">
              <button className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all">
                <span className="material-icons text-sm align-text-top mr-1">shopping_cart</span>
                Explore Plans
              </button>
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