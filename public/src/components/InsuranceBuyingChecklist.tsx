import React, { useState } from "react";

interface ChecklistItem {
  id: string;
  text: string;
  required: boolean;
}

interface ChecklistCategory {
  id: string;
  title: string;
  icon: string;
  items: ChecklistItem[];
  warning: string;
}

interface InsuranceBuyingChecklistProps {
  onConfidenceChange: (score: number) => void;
  insuranceType?: string;
}

const InsuranceBuyingChecklist: React.FC<InsuranceBuyingChecklistProps> = ({ onConfidenceChange, insuranceType = "term" }) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(50).fill(false));
  
  // Normalize insurance type ID to ensure mapping works correctly
  const normalizedType = insuranceType.toLowerCase().replace(/[^a-z]/g, '');
  
  // Base general checklist that applies to most insurance types
  const baseChecklistCategories: ChecklistCategory[] = [
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
  
  // Handle checkbox changes
  const handleCheckboxChange = (categoryIndex: number, itemIndex: number) => {
    const globalIndex = categoryIndex * 10 + itemIndex;
    const newCheckedItems = [...checkedItems];
    newCheckedItems[globalIndex] = !newCheckedItems[globalIndex];
    setCheckedItems(newCheckedItems);
    
    // Calculate confidence score and pass back to parent
    const totalChecked = newCheckedItems.filter(Boolean).length;
    // Get the actual categories after customization for proper counting
    const currentCategories = customizeChecklist();
    const totalItems = currentCategories.reduce((sum: number, cat: ChecklistCategory) => sum + cat.items.length, 0);
    const newConfidence = Math.min(Math.round((totalChecked / totalItems) * 100), 100);
    onConfidenceChange(newConfidence);
  };

  // Insurance type-specific checklists
  const typeSpecificChecklists: Record<string, { policy: ChecklistItem[], riders: ChecklistItem[], medical?: ChecklistItem[] }> = {
    // Term Life Insurance specific checklist items
    "term": {
      policy: [
        { id: "coverage", text: "Coverage = 15–20× annual income", required: true },
        { id: "term", text: "Term matches your financial responsibilities (30+ years for young families)", required: true },
        { id: "premium", text: "Premium is locked for entire term", required: true }
      ],
      riders: [
        { id: "critical", text: "Critical Illness", required: false },
        { id: "accidental", text: "Accidental Death Benefit", required: false },
        { id: "waiver", text: "Premium Waiver on Disability", required: false }
      ],
      medical: [
        { id: "tests", text: "Medical Test Done (if cover > ₹50L)", required: true },
        { id: "declaration", text: "Full & Honest Health Disclosure", required: true }
      ]
    },
    
    // Home Structure Insurance specific checklist items
    "home": {
      policy: [
        { id: "rebuilding", text: "Coverage equals rebuilding cost (not market value)", required: true },
        { id: "allRisks", text: "Comprehensive 'all risks' coverage, not named perils only", required: true },
        { id: "natDisaster", text: "Natural disasters coverage (flood, earthquake, etc.)", required: true }
      ],
      riders: [
        { id: "tempAccommodation", text: "Temporary Accommodation Coverage", required: true },
        { id: "legalLiability", text: "Legal Liability", required: false },
        { id: "architects", text: "Architect & Surveyor Fees", required: false }
      ]
    },
    
    // Home Contents Insurance specific checklist items
    "contents": {
      policy: [
        { id: "newForOld", text: "New-for-old replacement (not depreciated value)", required: true },
        { id: "valuables", text: "Valuables sub-limits sufficient for your items", required: true },
        { id: "accidentalDamage", text: "Accidental damage included", required: true }
      ],
      riders: [
        { id: "portableItems", text: "Portable Items Coverage Outside Home", required: false },
        { id: "identityTheft", text: "Identity Theft Protection", required: false },
        { id: "freezerContents", text: "Freezer Contents Coverage", required: false }
      ]
    },
    
    // Motor Insurance specific checklist items
    "motor": {
      policy: [
        { id: "comprehensive", text: "Comprehensive coverage (not just third-party)", required: true },
        { id: "noDepreciation", text: "Zero depreciation / Bumper-to-bumper cover", required: true },
        { id: "ncb", text: "No Claim Bonus protection", required: false }
      ],
      riders: [
        { id: "engine", text: "Engine Protection", required: true },
        { id: "roadside", text: "Roadside Assistance", required: false },
        { id: "passengerCover", text: "Passenger Cover", required: false },
        { id: "consumables", text: "Consumables Cover", required: false }
      ]
    },
    
    // Gadget Insurance specific checklist items
    "gadget": {
      policy: [
        { id: "accidental", text: "Accidental & liquid damage covered", required: true },
        { id: "theft", text: "Theft coverage included", required: true },
        { id: "worldwide", text: "Worldwide coverage (not just India)", required: false }
      ],
      riders: [
        { id: "accessories", text: "Accessories Coverage", required: false },
        { id: "dataRecovery", text: "Data Recovery Service", required: false }
      ]
    },
    
    // Jewellery Insurance specific checklist items
    "jewellery": {
      policy: [
        { id: "marketValue", text: "Current market value coverage (with inflation adjustment)", required: true },
        { id: "allRisks", text: "All risks coverage (loss, theft, damage)", required: true },
        { id: "worldwide", text: "Worldwide coverage while traveling", required: true }
      ],
      riders: [
        { id: "vault", text: "Bank vault storage discount", required: false },
        { id: "pairAndSet", text: "Pair & Set coverage", required: false }
      ]
    },
    
    // Fire Insurance specific checklist items
    "fire": {
      policy: [
        { id: "alliedPerils", text: "Allied perils included (explosion, storm, flood)", required: true },
        { id: "reinstatement", text: "Reinstatement value basis (not market value)", required: true },
        { id: "escalation", text: "Escalation clause for inflation protection", required: false }
      ],
      riders: [
        { id: "debris", text: "Debris Removal", required: false },
        { id: "architects", text: "Architect's Fees", required: false },
        { id: "riotStrike", text: "Riot & Strike Coverage", required: false }
      ]
    },
    
    // Pet Insurance specific checklist items
    "pet": {
      policy: [
        { id: "accidents", text: "Accident & injury coverage", required: true },
        { id: "illness", text: "Illness coverage (including chronic conditions)", required: true },
        { id: "annualLimit", text: "Annual limit sufficient for major surgeries", required: true }
      ],
      riders: [
        { id: "preventive", text: "Preventive Care (vaccines, check-ups)", required: false },
        { id: "thirdParty", text: "Third-party liability coverage", required: false },
        { id: "behavioral", text: "Behavioral therapy", required: false }
      ]
    },
    
    // International Travel Insurance specific checklist items
    "internationaltravel": {
      policy: [
        { id: "medicalCoverage", text: "Medical coverage minimum $100,000 (₹80 lakhs)", required: true },
        { id: "evacuation", text: "Emergency medical evacuation covered", required: true },
        { id: "tripCancellation", text: "Trip cancellation/interruption included", required: true },
      ],
      riders: [
        { id: "lostBaggage", text: "Lost baggage coverage (with adequate limits)", required: true },
        { id: "delayedFlight", text: "Flight delay compensation", required: false },
        { id: "covid", text: "COVID-19 related expenses", required: false },
        { id: "adventure", text: "Adventure sports coverage (if applicable)", required: false }
      ]
    },
    
    // Domestic Travel Insurance specific checklist items
    "domestictravel": {
      policy: [
        { id: "medicalCoverage", text: "Medical expenses coverage (min ₹2 lakhs)", required: true },
        { id: "tripCancellation", text: "Trip cancellation/interruption covered", required: true },
        { id: "personalAccident", text: "Personal accident coverage", required: true }
      ],
      riders: [
        { id: "lostBaggage", text: "Lost/delayed baggage", required: false },
        { id: "flightDelay", text: "Flight delay coverage", required: false },
        { id: "missedConnection", text: "Missed connection protection", required: false }
      ]
    },
    
    // Student Travel Insurance specific checklist items
    "studenttravel": {
      policy: [
        { id: "medicalCoverage", text: "Medical coverage minimum $250,000 (₹2 crores)", required: true },
        { id: "studyInterruption", text: "Study interruption coverage", required: true },
        { id: "sponsorProtection", text: "Sponsor protection (cover if financial sponsor dies)", required: true }
      ],
      riders: [
        { id: "mentalHealth", text: "Mental health coverage", required: false },
        { id: "visitingFamily", text: "Compassionate visit by family", required: false },
        { id: "laptopCoverage", text: "Laptop/electronic device coverage", required: false }
      ]
    },
    
    // Senior Travel Plans specific checklist items
    "seniortravel": {
      policy: [
        { id: "preExisting", text: "Pre-existing condition coverage", required: true },
        { id: "medicalCoverage", text: "Higher medical coverage (min $150,000/₹1.2 crore)", required: true },
        { id: "noAgeBarrier", text: "No upper age limit restriction", required: true }
      ],
      riders: [
        { id: "medicineReimbursement", text: "Prescription medicine reimbursement", required: false },
        { id: "conciergeServices", text: "Medical concierge services", required: false }
      ]
    },
    
    // Pilgrimage Insurance specific checklist items
    "pilgrimage": {
      policy: [
        { id: "medicalAge", text: "Medical coverage despite age (for seniors)", required: true },
        { id: "emergencyEvacuation", text: "Emergency evacuation from remote locations", required: true },
        { id: "lostDocuments", text: "Lost documents/belongings assistance", required: true }
      ],
      riders: [
        { id: "tripDelay", text: "Trip delay/cancellation", required: false },
        { id: "accidentalDeath", text: "Higher accidental death coverage", required: false }
      ]
    },
    
    // Adventure Sports Travel Cover specific checklist items
    "adventure": {
      policy: [
        { id: "specificSports", text: "Specific sports/activities explicitly covered", required: true },
        { id: "medicalEvacuation", text: "Emergency medical evacuation (including helicopter)", required: true },
        { id: "equipmentCoverage", text: "Sports equipment coverage", required: true }
      ],
      riders: [
        { id: "searchRescue", text: "Search & rescue operations", required: true },
        { id: "altitude", text: "High altitude coverage (if applicable)", required: false }
      ]
    },
    
    // Cab Ride Insurance specific checklist items
    "cabride": {
      policy: [
        { id: "personalAccident", text: "Personal accident coverage", required: true },
        { id: "hospitalCash", text: "Hospital cash benefit", required: false },
        { id: "emergencySupport", text: "24/7 emergency assistance", required: true }
      ],
      riders: [
        { id: "lostItems", text: "Lost/stolen items in cab", required: false }
      ]
    },
    
    // Cancer-Specific Insurance checklist items
    "cancer": {
      policy: [
        { id: "allStages", text: "Coverage for all cancer stages (early to advanced)", required: true },
        { id: "lumpSum", text: "Lump-sum payout upon diagnosis", required: true },
        { id: "reconAmt", text: "Reconstruction surgery coverage", required: true }
      ],
      riders: [
        { id: "incomeBenefit", text: "Income benefit during treatment period", required: false },
        { id: "hospitalCash", text: "Hospital cash benefit", required: false },
        { id: "waiver", text: "Premium Waiver on Diagnosis", required: false }
      ],
      medical: [
        { id: "declaration", text: "Full & honest family history disclosure", required: true },
        { id: "tests", text: "All required medical tests completed", required: true }
      ]
    },
    
    // Diabetes/Hypertension Health Cover checklist items
    "diabetes": {
      policy: [
        { id: "dayOne", text: "Coverage from day one (no waiting period)", required: true },
        { id: "complications", text: "Coverage for complications (retinopathy, nephropathy)", required: true },
        { id: "monitoring", text: "Regular monitoring equipment/supplies covered", required: true }
      ],
      riders: [
        { id: "wellnessProgram", text: "Wellness program & diet counseling", required: false },
        { id: "teleconsultation", text: "Unlimited teleconsultation", required: false }
      ],
      medical: [
        { id: "declaration", text: "HbA1c levels & BP readings disclosed", required: true },
        { id: "tests", text: "Recent medical reports submitted", required: true }
      ]
    },
    
    // Rural & Agriculture Insurance (PMFBY) checklist items
    "agriculture": {
      policy: [
        { id: "notifiedArea", text: "Farm in notified area under scheme", required: true },
        { id: "cropListed", text: "Crop is in the listed/notified crops", required: true },
        { id: "landRecords", text: "Land records properly documented and submitted", required: true }
      ],
      riders: [
        { id: "equipmentCover", text: "Agricultural equipment coverage", required: false },
        { id: "livestockCover", text: "Livestock coverage", required: false }
      ]
    },
    
    // Loan Protection Insurance checklist items
    "loan": {
      policy: [
        { id: "balanceCover", text: "Outstanding loan balance fully covered", required: true },
        { id: "disabilityCover", text: "Temporary & permanent disability covered", required: true },
        { id: "jobLoss", text: "Involuntary unemployment covered", required: false }
      ],
      riders: [
        { id: "criticalIllness", text: "Critical illness benefit", required: false },
        { id: "hospitalCash", text: "Hospital cash benefit", required: false }
      ],
      medical: [
        { id: "declaration", text: "Full health disclosure", required: true }
      ]
    },
    
    // Event Insurance checklist items
    "event": {
      policy: [
        { id: "cancellation", text: "Event cancellation/postponement coverage", required: true },
        { id: "venueIssues", text: "Venue damage or non-availability", required: true },
        { id: "thirdParty", text: "Third-party liability coverage", required: true }
      ],
      riders: [
        { id: "equipment", text: "Equipment failure/damage", required: false },
        { id: "keyPerson", text: "Key person non-appearance", required: false },
        { id: "weather", text: "Adverse weather coverage", required: false }
      ]
    },
    
    // Cyber Insurance checklist items
    "cyber": {
      policy: [
        { id: "dataBreachLiability", text: "Data breach liability covered", required: true },
        { id: "ransomware", text: "Ransomware attack coverage", required: true },
        { id: "identityTheft", text: "Identity theft restoration services", required: true }
      ],
      riders: [
        { id: "businessInterruption", text: "Business interruption losses", required: false },
        { id: "cyberCrimeCoverage", text: "Funds transfer fraud/social engineering", required: false },
        { id: "reputational", text: "Reputational damage coverage", required: false }
      ]
    },
    
    // Legal Expense Insurance checklist items
    "legal": {
      policy: [
        { id: "attorneyFees", text: "Attorney fees & court expenses covered", required: true },
        { id: "consultationCover", text: "Legal consultation coverage", required: true },
        { id: "civilCases", text: "Civil litigation coverage", required: true }
      ],
      riders: [
        { id: "employmentDisputes", text: "Employment disputes", required: false },
        { id: "propertyDisputes", text: "Property disputes", required: false },
        { id: "consumerDisputes", text: "Consumer disputes", required: false }
      ]
    },
    
    // Covid-19 Insurance checklist items
    "covid": {
      policy: [
        { id: "hospitalization", text: "Hospitalization expenses covered", required: true },
        { id: "homeQuarantine", text: "Home quarantine expenses", required: true },
        { id: "diagnosis", text: "Diagnosis/testing costs included", required: true }
      ],
      riders: [
        { id: "incomeProtection", text: "Income protection during recovery", required: false },
        { id: "telemedicine", text: "Telemedicine consultations", required: false }
      ],
      medical: [
        { id: "declaration", text: "Vaccination status disclosed", required: true },
        { id: "preExisting", text: "Pre-existing conditions disclosed", required: true }
      ]
    },
    
    // OPD Insurance checklist items
    "opdinsurance": {
      policy: [
        { id: "consultations", text: "Doctor consultations covered", required: true },
        { id: "diagnostics", text: "Diagnostic tests included", required: true },
        { id: "medicines", text: "Pharmacy/medicine expenses", required: true }
      ],
      riders: [
        { id: "dental", text: "Dental treatments", required: false },
        { id: "optical", text: "Vision care/optical", required: false },
        { id: "preventive", text: "Preventive health check-ups", required: false }
      ]
    },
    
    // Group Health Insurance checklist items
    "group": {
      policy: [
        { id: "employeeCoverage", text: "Adequate per-employee coverage amount", required: true },
        { id: "dependentCoverage", text: "Family/dependent coverage included", required: true },
        { id: "preExisting", text: "Pre-existing conditions covered from day one", required: true }
      ],
      riders: [
        { id: "maternity", text: "Maternity benefits", required: false },
        { id: "opdBenefits", text: "OPD benefits", required: false },
        { id: "wellness", text: "Wellness & preventive programs", required: false }
      ]
    },
    
    // Commercial Property Insurance checklist items
    "commercial": {
      policy: [
        { id: "allRisks", text: "All risks coverage (fire, natural disasters, theft)", required: true },
        { id: "businessContents", text: "Business contents & inventory covered", required: true },
        { id: "reinstatementValue", text: "Reinstatement value basis (not market value)", required: true }
      ],
      riders: [
        { id: "rentLoss", text: "Rent loss coverage", required: false },
        { id: "terrorismCover", text: "Terrorism coverage", required: false },
        { id: "equipmentBreakdown", text: "Equipment breakdown", required: true }
      ]
    },
    
    // Shopkeeper's Insurance checklist items
    "shopkeeper": {
      policy: [
        { id: "buildingFire", text: "Building fire & allied perils coverage", required: true },
        { id: "inventory", text: "Inventory & stock coverage", required: true },
        { id: "cashCounter", text: "Cash-at-counter coverage", required: true }
      ],
      riders: [
        { id: "businessInterruption", text: "Business interruption coverage", required: true },
        { id: "publicLiability", text: "Public liability coverage", required: false },
        { id: "electronicEquipment", text: "Electronic equipment coverage", required: false }
      ]
    },
    
    // Business Interruption Cover checklist items
    "businessinterruption": {
      policy: [
        { id: "coveragePeriod", text: "Adequate indemnity period (12-24 months)", required: true },
        { id: "grossProfit", text: "Gross profit calculation method clear", required: true },
        { id: "extensionClauses", text: "Extension clauses (denial of access, suppliers)", required: true }
      ],
      riders: [
        { id: "additionalExpenses", text: "Additional increase in cost of working", required: false },
        { id: "utilityFailure", text: "Public utility failure", required: false }
      ]
    },
    
    // Marine/Transit Insurance checklist items
    "marine": {
      policy: [
        { id: "allRisks", text: "All risks coverage (ICC A clause for imports)", required: true },
        { id: "transitScope", text: "Warehouse-to-warehouse coverage", required: true },
        { id: "valuationBasis", text: "Clear valuation basis (CIF + 10%)", required: true }
      ],
      riders: [
        { id: "warehouseCoverage", text: "Extended warehouse coverage", required: false },
        { id: "packingRisks", text: "Packing risks coverage", required: false }
      ]
    },
    
    // Cyber Liability for Business checklist items
    "cyberliability": {
      policy: [
        { id: "firstParty", text: "First-party coverage (your direct losses)", required: true },
        { id: "thirdParty", text: "Third-party coverage (customer data breach)", required: true },
        { id: "regulatoryDefense", text: "Regulatory defense & penalties", required: true }
      ],
      riders: [
        { id: "socialEngineering", text: "Social engineering fraud", required: false },
        { id: "reputationRepair", text: "Reputation repair costs", required: false },
        { id: "cyberExtortion", text: "Cyber extortion/ransomware", required: true }
      ]
    },
    
    // Directors & Officers Liability (D&O) checklist items
    "dno": {
      policy: [
        { id: "sideA", text: "Side A coverage (non-indemnifiable losses)", required: true },
        { id: "sideB", text: "Side B coverage (company reimbursement)", required: true },
        { id: "investigationCosts", text: "Regulatory investigation costs", required: true }
      ],
      riders: [
        { id: "sideC", text: "Side C coverage (securities claims)", required: false },
        { id: "outsideDirectorship", text: "Outside directorship liability", required: false },
        { id: "employmentPractices", text: "Employment practices liability", required: false }
      ]
    },
    
    // Professional Indemnity Insurance checklist items
    "professional": {
      policy: [
        { id: "negligence", text: "Professional negligence coverage", required: true },
        { id: "defenseCosts", text: "Legal defense costs included", required: true },
        { id: "retroactiveDate", text: "Retroactive date (covers past work)", required: true }
      ],
      riders: [
        { id: "lossDocuments", text: "Loss of documents", required: false },
        { id: "libelSlander", text: "Libel & slander coverage", required: false },
        { id: "dishonesty", text: "Dishonesty of employees", required: false }
      ]
    },
    // Individual Health Insurance specific checklist items
    "health": {
      policy: [
        { id: "coverage", text: "Coverage = at least ₹10L per person", required: true },
        { id: "noSubLimits", text: "No or minimal sub-limits on room rent, ICU, etc.", required: true },
        { id: "preExisting", text: "Pre-existing disease waiting period < 3 years", required: true }
      ],
      riders: [
        { id: "criticalIllness", text: "Critical Illness Cover", required: false },
        { id: "dailyCash", text: "Hospital Daily Cash", required: false },
        { id: "restore", text: "Restoration Benefit", required: false }
      ],
      medical: [
        { id: "declaration", text: "Full & Honest Health Disclosure", required: true }
      ]
    },
    // Family Floater Plan specific checklist items
    "family": {
      policy: [
        { id: "coverage", text: "Coverage = at least ₹20L for whole family", required: true },
        { id: "noSubLimits", text: "No or minimal sub-limits on room rent", required: true },
        { id: "ageLimit", text: "Age limits for all family members verified", required: true }
      ],
      riders: [
        { id: "criticalIllness", text: "Critical Illness Cover", required: false },
        { id: "dailyCash", text: "Hospital Daily Cash", required: false },
        { id: "maternity", text: "Maternity Cover", required: false }
      ],
      medical: [
        { id: "declaration", text: "Full health disclosure for all members", required: true }
      ]
    },
    // Top-Up & Super Top-Up Plans specific checklist items
    "topup": {
      policy: [
        { id: "deductible", text: "Deductible amount matches base policy", required: true },
        { id: "aggregate", text: "Super Top-up has aggregate deductible benefit", required: true },
        { id: "coverage", text: "Coverage sufficient for catastrophic expenses", required: true }
      ],
      riders: [
        { id: "restore", text: "Restoration of Sum Insured", required: false }
      ],
      medical: [
        { id: "declaration", text: "Same disclosures as base policy", required: true }
      ]
    },
    // Critical Illness Insurance specific checklist items
    "critical": {
      policy: [
        { id: "diseases", text: "Covers at least 25+ critical illnesses", required: true },
        { id: "survival", text: "Survival period requirement (usually 30 days)", required: true },
        { id: "sumAssured", text: "Sum assured = min. 2-3 years of income", required: true }
      ],
      riders: [
        { id: "disability", text: "Permanent Disability Benefit", required: false },
        { id: "waiver", text: "Premium Waiver", required: false }
      ],
      medical: [
        { id: "declaration", text: "Full & Honest Health Disclosure", required: true },
        { id: "familyHistory", text: "Family medical history disclosed", required: true }
      ]
    },
    // Personal Accident Insurance specific checklist items
    "accident": {
      policy: [
        { id: "coverage", text: "Coverage = at least 10× monthly income", required: true },
        { id: "disability", text: "Both permanent & temporary disability covered", required: true },
        { id: "occupation", text: "Occupation risk factor accounted for", required: true }
      ],
      riders: [
        { id: "hospitalCash", text: "Hospital Cash Benefit", required: false },
        { id: "education", text: "Children's Education Benefit", required: false }
      ]
    },
    // Maternity & Newborn Insurance specific checklist items
    "maternity": {
      policy: [
        { id: "waitingPeriod", text: "Waiting period (2-4 years) clearly understood", required: true },
        { id: "coverage", text: "Coverage sufficient for your hospital tier", required: true },
        { id: "newborn", text: "Newborn coverage from day 1", required: true }
      ],
      riders: [
        { id: "complications", text: "Maternity Complications Cover", required: false },
        { id: "vaccination", text: "Child Vaccination Cover", required: false }
      ],
      medical: [
        { id: "preExisting", text: "No undisclosed pregnancies at policy start", required: true }
      ]
    },
    // Senior Citizen Health Insurance specific checklist items
    "senior": {
      policy: [
        { id: "preExisting", text: "Pre-existing conditions coverage timeline", required: true },
        { id: "domiciliary", text: "Domiciliary hospitalization covered", required: true },
        { id: "copay", text: "Co-payment percentage (10-20%)", required: true }
      ],
      riders: [
        { id: "homecare", text: "Home Healthcare", required: false },
        { id: "criticalIllness", text: "Critical Illness Cover", required: false }
      ],
      medical: [
        { id: "declaration", text: "Full & Honest Health Disclosure", required: true },
        { id: "chronics", text: "All chronic conditions disclosed", required: true }
      ]
    },
    // OPD & Wellness Add-Ons specific checklist items
    "opd": {
      policy: [
        { id: "annualLimit", text: "Annual OPD limit sufficient for needs", required: true },
        { id: "networkProviders", text: "Network clinics/hospitals near your area", required: true },
        { id: "diagnostics", text: "Diagnostics & tests coverage", required: true }
      ],
      riders: [
        { id: "teleconsult", text: "Teleconsultation", required: false },
        { id: "preventive", text: "Preventive Health Check-ups", required: false }
      ]
    },
    // AYUSH Coverage specific checklist items
    "ayush": {
      policy: [
        { id: "treatments", text: "Specific AYUSH treatments covered clarified", required: true },
        { id: "hospitals", text: "Registered AYUSH hospitals in network", required: true },
        { id: "limits", text: "Sub-limits for AYUSH treatments", required: true }
      ],
      riders: [
        { id: "wellness", text: "Wellness & Prevention Programs", required: false }
      ],
      medical: [
        { id: "currentTreatments", text: "Ongoing AYUSH treatments disclosed", required: true }
      ]
    },
    // ULIP specific checklist items
    "ulip": {
      policy: [
        { id: "lock-in", text: "Minimum 5-year lock-in period understood", required: true },
        { id: "fees", text: "All charges & fees clearly explained", required: true },
        { id: "fund", text: "Fund performance history checked (min. 5 years)", required: true }
      ],
      riders: [
        { id: "critical", text: "Critical Illness", required: false },
        { id: "accidental", text: "Accidental Death", required: false },
        { id: "waiver", text: "Premium Waiver", required: false }
      ]
    },
    // Child Education Plan specific checklist items
    "child": {
      policy: [
        { id: "coverage", text: "Sum assured matches projected education costs", required: true },
        { id: "maturity", text: "Maturity coincides with child's higher education", required: true },
        { id: "fees", text: "All fund management charges transparent", required: true }
      ],
      riders: [
        { id: "waiver", text: "Premium Waiver on Parent's Death/Disability", required: true },
        { id: "critical", text: "Critical Illness", required: false }
      ]
    },
    // Pension Plan specific checklist items
    "pension": {
      policy: [
        { id: "annuity", text: "Annuity rate checked and compared", required: true },
        { id: "inflation", text: "Inflation protection features included", required: true },
        { id: "withdrawal", text: "Withdrawal options and penalties clear", required: true }
      ],
      riders: [
        { id: "return", text: "Return of Purchase Price to Nominee", required: false },
        { id: "guaranteed", text: "Guaranteed Period Annuity", required: false }
      ]
    }
  };

  // Customize policy section based on insurance type
  const customizeChecklist = () => {
    const checklistCopy = [...baseChecklistCategories];
    
    // Map common insurance names to checklist types
    const mapSpecialTypes = (type: string): string => {
      // Map for specific health insurance types
      const mappings: Record<string, string> = {
        // Health types
        "individual": "health",
        "individualhealth": "health",
        "family": "family",
        "familyfloater": "family",
        "topup": "topup",
        "topupsuptertopup": "topup",
        "critical": "critical",
        "criticalillness": "critical",
        "accident": "accident",
        "personalaccident": "accident",
        "maternity": "maternity",
        "maternitynewborn": "maternity",
        "senior": "senior",
        "seniorcitizen": "senior",
        "seniorhealth": "senior",
        "opd": "opd",
        "opdwellness": "opd",
        "ayush": "ayush",
        "ayushcoverage": "ayush",
        
        // Life insurance types
        "wholelife": "term",
        "returnpremium": "term",
        "endowment": "ulip",
        "moneyback": "ulip",
        
        // Asset Protection insurance types
        "homestructure": "home",
        "homestructureinsurance": "home",
        "homeinsurance": "home",
        "homecontents": "contents",
        "homecontentsinsurance": "contents",
        "motor": "motor",
        "motorinsurance": "motor",
        "motorcarbikeinsurance": "motor",
        "car": "motor",
        "bike": "motor",
        "gadget": "gadget",
        "gadgetinsurance": "gadget",
        "jewellery": "jewellery",
        "jewelleryinsurance": "jewellery",
        "fire": "fire",
        "fireinsurance": "fire",
        "pet": "pet",
        "petinsurance": "pet",
        
        // Travel & Mobility insurance types
        "internationaltravel": "internationaltravel",
        "international": "internationaltravel",
        "domestictravel": "domestictravel",
        "domestic": "domestictravel",
        "studenttravel": "studenttravel",
        "student": "studenttravel",
        "seniortravel": "seniortravel",
        "seniorplans": "seniortravel",
        "pilgrimageinsurance": "pilgrimage",
        "pilgrimage": "pilgrimage",
        "yatracover": "pilgrimage",
        "adventuresports": "adventure",
        "adventure": "adventure",
        "adventuretravelcover": "adventure",
        "cabride": "cabride",
        "rideshare": "cabride",
        "olauber": "cabride",
        
        // Specialized Coverage insurance types
        "cancerspecific": "cancer",
        "cancer": "cancer",
        "diabeteshypertension": "diabetes",
        "diabetes": "diabetes",
        "hypertension": "diabetes",
        "rural": "agriculture",
        "agriculture": "agriculture",
        "pmfby": "agriculture",
        "loanprotection": "loan",
        "loan": "loan",
        "event": "event",
        "eventinsurance": "event",
        "cyber": "cyber", 
        "cyberinsurance": "cyber",
        "legal": "legal",
        "legalexpense": "legal",
        "covid": "covid",
        "covid19": "covid",
        "covidinsurance": "covid",
        
        // Business Protection insurance types
        "grouphealth": "group",
        "group": "group",
        "commercialproperty": "commercial",
        "commercial": "commercial",
        "businessinsurance": "commercial",
        "shopkeeper": "shopkeeper",
        "shopkeepersinsurance": "shopkeeper",
        "businessinterruption": "businessinterruption",
        "interruption": "businessinterruption",
        "marine": "marine",
        "marinetransit": "marine",
        "transitinsurance": "marine",
        "cyberliability": "cyberliability",
        "cyberbusiness": "cyberliability",
        "dno": "dno",
        "directorsofficers": "dno",
        "directors": "dno",
        "officers": "dno",
        "professional": "professional",
        "professionalindemnity": "professional",
        "indemnity": "professional",
        
        // Default for each category
        "health": "health",
        "term": "term",
        "ulip": "ulip",
        "child": "child",
        "pension": "pension"
      };
      
      return mappings[type] || type;
    };
    
    // Get the appropriate checklist type
    const checklistType = mapSpecialTypes(normalizedType);
    
    // If we have specialized checklist for this insurance type
    if (typeSpecificChecklists[checklistType]) {
      // Find and update policy section
      const policyIndex = checklistCopy.findIndex(c => c.id === "policy");
      if (policyIndex !== -1 && typeSpecificChecklists[checklistType].policy) {
        checklistCopy[policyIndex].items = typeSpecificChecklists[checklistType].policy;
      }
      
      // Find and update riders section
      const ridersIndex = checklistCopy.findIndex(c => c.id === "riders");
      if (ridersIndex !== -1 && typeSpecificChecklists[checklistType].riders) {
        checklistCopy[ridersIndex].items = typeSpecificChecklists[checklistType].riders;
      }

      // Find and update medical section if it exists
      const medicalIndex = checklistCopy.findIndex(c => c.id === "medical");
      if (medicalIndex !== -1 && typeSpecificChecklists[checklistType].medical) {
        checklistCopy[medicalIndex].items = typeSpecificChecklists[checklistType].medical;
      }
    }
    
    return checklistCopy;
  };
  
  // Get the final checklist based on insurance type
  const checklistCategories = customizeChecklist();

  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-2 gap-2">
        {checklistCategories.map((category, categoryIndex) => (
          <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-blue-50 px-2 py-1">
              <h5 className="font-medium text-gray-900 text-xs">{category.title}</h5>
            </div>
            <div className="p-2">
              <div className="space-y-0.5">
                {category.id === "riders" ? (
                  <>
                    <p className="mb-1 text-xs">Only meaningful riders added:</p>
                    <div className="ml-3 grid grid-cols-2 gap-x-2 gap-y-0.5">
                      {category.items.map((item, itemIndex) => {
                        const globalIndex = categoryIndex * 10 + itemIndex;
                        return (
                          <div key={item.id} className="py-0.5">
                            <div className="flex items-center">
                              <div onClick={() => handleCheckboxChange(categoryIndex, itemIndex)}>
                                {checkedItems[globalIndex] ? (
                                  <span className="material-icons text-[14px] text-green-500 cursor-pointer">check_circle</span>
                                ) : (
                                  <input
                                    type="checkbox"
                                    id={`rider-${item.id}`}
                                    checked={false}
                                    className="h-3.5 w-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                                  />
                                )}
                              </div>
                              <label htmlFor={`rider-${item.id}`} className="ml-2 text-xs text-gray-700 cursor-pointer">
                                <span className="text-xs">{item.text}</span>
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  category.items.map((item, itemIndex) => {
                    const globalIndex = categoryIndex * 10 + itemIndex;
                    return (
                      <div key={item.id} className="py-0.5">
                        <div className="flex items-center">
                          <div onClick={() => handleCheckboxChange(categoryIndex, itemIndex)}>
                            {checkedItems[globalIndex] ? (
                              <span className="material-icons text-[14px] text-green-500 cursor-pointer">check_circle</span>
                            ) : (
                              <input
                                type="checkbox"
                                id={`item-${category.id}-${item.id}`}
                                checked={false}
                                className="h-3.5 w-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                              />
                            )}
                          </div>
                          <label htmlFor={`item-${category.id}-${item.id}`} className="ml-2 text-xs text-gray-700 cursor-pointer">
                            <span className="text-xs">{item.text}</span>
                          </label>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              
              {/* Warning notice */}
              <div className="mt-1 pt-1 border-t border-gray-100">
                <p className="text-[10px] text-amber-700 flex items-start">
                  <span className="text-amber-500 mr-1">📌</span>
                  <span>{category.warning}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Final wisdom message */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
        <p className="text-amber-800 text-[10px]">High CSR + High CASR + Full Transparency = Confident Purchase.</p>
      </div>
    </div>
  );
};

export default InsuranceBuyingChecklist;