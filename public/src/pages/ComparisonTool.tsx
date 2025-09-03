import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useToast } from "../hooks/use-toast";

type ComparisonCategory = 
  | "mutual-funds" 
  | "fixed-deposits" 
  | "insurance-policies" 
  | "credit-cards" 
  | "loans";

type MutualFund = {
  id: number;
  name: string;
  fundHouse: string;
  category: string;
  aum: number; // Assets Under Management in crores
  expense: number; // Expense ratio in percentage
  returns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  risk: "low" | "moderate" | "high";
  rating: 1 | 2 | 3 | 4 | 5;
  minInvestment: number;
  exitLoad: string;
  navValue: number;
  launchDate: string;
};

type FixedDeposit = {
  id: number;
  bank: string;
  interest: {
    regular: number;
    senior: number;
  };
  minInvestment: number;
  tenures: {
    min: number; // in months
    max: number; // in months
  };
  prematureWithdrawal: boolean;
  compounding: "Monthly" | "Quarterly" | "Half-Yearly" | "Yearly";
  rating: 1 | 2 | 3 | 4 | 5;
  specialFeatures: string[];
};

type InsurancePolicy = {
  id: number;
  company: string;
  name: string;
  type: "term" | "health" | "car" | "two-wheeler" | "home";
  premium: number;
  coverage: number;
  claimSettlementRatio: number;
  cashless: boolean;
  networkHospitals?: number;
  waitingPeriod?: number;
  noClaimBonus?: number;
  additionalFeatures: string[];
  rating: 1 | 2 | 3 | 4 | 5;
};

type CreditCard = {
  id: number;
  bank: string;
  name: string;
  category: string;
  joiningFee: number;
  annualFee: number;
  interestRate: number;
  rewardRate: number;
  minIncomeRequired: number;
  foreignTransactionFee: number;
  benefits: string[];
  rating: 1 | 2 | 3 | 4 | 5;
};

type Loan = {
  id: number;
  bank: string;
  type: "home" | "personal" | "car" | "education" | "business";
  interestRate: {
    min: number;
    max: number;
  };
  processingFee: number;
  maxTenure: number; // in months
  maxLoanAmount: number;
  prepaymentPenalty: number;
  minIncomeRequired: number;
  disbursalTime: string;
  specialFeatures: string[];
  rating: 1 | 2 | 3 | 4 | 5;
};

export default function ComparisonTool() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<ComparisonCategory>("mutual-funds");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isComparing, setIsComparing] = useState<boolean>(false);
  
  // Sample data for comparison categories
  const mutualFunds: MutualFund[] = [
    {
      id: 1,
      name: "Axis Bluechip Fund",
      fundHouse: "Axis Mutual Fund",
      category: "Large Cap",
      aum: 25600,
      expense: 1.75,
      returns: {
        oneYear: 12.5,
        threeYear: 15.2,
        fiveYear: 13.8
      },
      risk: "moderate",
      rating: 4,
      minInvestment: 500,
      exitLoad: "1% if redeemed within 12 months",
      navValue: 45.67,
      launchDate: "2009-01-05"
    },
    {
      id: 2,
      name: "Mirae Asset Emerging Bluechip Fund",
      fundHouse: "Mirae Asset",
      category: "Large & Mid Cap",
      aum: 18900,
      expense: 1.68,
      returns: {
        oneYear: 15.8,
        threeYear: 18.2,
        fiveYear: 16.5
      },
      risk: "high",
      rating: 5,
      minInvestment: 1000,
      exitLoad: "1% if redeemed within 12 months",
      navValue: 82.34,
      launchDate: "2010-07-09"
    },
    {
      id: 3,
      name: "HDFC Small Cap Fund",
      fundHouse: "HDFC Mutual Fund",
      category: "Small Cap",
      aum: 12400,
      expense: 1.85,
      returns: {
        oneYear: 18.2,
        threeYear: 14.5,
        fiveYear: 12.8
      },
      risk: "high",
      rating: 4,
      minInvestment: 500,
      exitLoad: "1% if redeemed within 12 months",
      navValue: 62.45,
      launchDate: "2007-04-03"
    },
    {
      id: 4,
      name: "SBI Debt Fund",
      fundHouse: "SBI Mutual Fund",
      category: "Debt",
      aum: 8700,
      expense: 0.85,
      returns: {
        oneYear: 6.2,
        threeYear: 7.5,
        fiveYear: 7.8
      },
      risk: "low",
      rating: 3,
      minInvestment: 1000,
      exitLoad: "0.5% if redeemed within 6 months",
      navValue: 25.78,
      launchDate: "2004-11-12"
    },
    {
      id: 5,
      name: "Aditya Birla Sun Life Tax Relief 96",
      fundHouse: "Aditya Birla Sun Life",
      category: "ELSS",
      aum: 10500,
      expense: 1.92,
      returns: {
        oneYear: 14.3,
        threeYear: 16.7,
        fiveYear: 15.2
      },
      risk: "high",
      rating: 4,
      minInvestment: 500,
      exitLoad: "Not applicable (3-year lock-in)",
      navValue: 34.56,
      launchDate: "1996-03-29"
    },
    {
      id: 6,
      name: "Nippon India Index Fund",
      fundHouse: "Nippon India",
      category: "Index Fund",
      aum: 3400,
      expense: 0.45,
      returns: {
        oneYear: 11.8,
        threeYear: 14.9,
        fiveYear: 13.2
      },
      risk: "moderate",
      rating: 4,
      minInvestment: 1000,
      exitLoad: "0.25% if redeemed within 1 month",
      navValue: 28.92,
      launchDate: "2002-05-28"
    }
  ];
  
  const fixedDeposits: FixedDeposit[] = [
    {
      id: 1,
      bank: "State Bank of India",
      interest: {
        regular: 5.5,
        senior: 6.0
      },
      minInvestment: 1000,
      tenures: {
        min: 7,
        max: 120
      },
      prematureWithdrawal: true,
      compounding: "Quarterly",
      rating: 4,
      specialFeatures: ["Loan facility available", "Auto-renewal option", "Sweep-in facility"]
    },
    {
      id: 2,
      bank: "HDFC Bank",
      interest: {
        regular: 5.75,
        senior: 6.25
      },
      minInvestment: 5000,
      tenures: {
        min: 7,
        max: 120
      },
      prematureWithdrawal: true,
      compounding: "Quarterly",
      rating: 4,
      specialFeatures: ["Loan against FD", "Auto-renewal", "Green FD option for environmental projects"]
    },
    {
      id: 3,
      bank: "ICICI Bank",
      interest: {
        regular: 5.70,
        senior: 6.20
      },
      minInvestment: 10000,
      tenures: {
        min: 7,
        max: 120
      },
      prematureWithdrawal: true,
      compounding: "Quarterly",
      rating: 4,
      specialFeatures: ["iWish - goal-based FD", "FD with Zero penalty", "Tax Saver FD"]
    },
    {
      id: 4,
      bank: "Bajaj Finance",
      interest: {
        regular: 7.0,
        senior: 7.45
      },
      minInvestment: 25000,
      tenures: {
        min: 12,
        max: 60
      },
      prematureWithdrawal: true,
      compounding: "Quarterly",
      rating: 5,
      specialFeatures: ["Loan against FD", "Multi-deposit facility", "Auto-renewal"]
    },
    {
      id: 5,
      bank: "Yes Bank",
      interest: {
        regular: 6.75,
        senior: 7.25
      },
      minInvestment: 10000,
      tenures: {
        min: 7,
        max: 120
      },
      prematureWithdrawal: true,
      compounding: "Quarterly",
      rating: 3,
      specialFeatures: ["Recurring FD option", "Auto-renewal", "Digital account opening"]
    }
  ];
  
  const insurancePolicies: InsurancePolicy[] = [
    {
      id: 1,
      company: "HDFC Life",
      name: "Click 2 Protect Life",
      type: "term",
      premium: 12000,
      coverage: 10000000,
      claimSettlementRatio: 98.7,
      cashless: true,
      additionalFeatures: ["Critical Illness Cover", "Accidental Death Benefit", "Waiver of Premium"],
      rating: 5
    },
    {
      id: 2,
      company: "Max Life Insurance",
      name: "Smart Secure Plus",
      type: "term",
      premium: 11500,
      coverage: 10000000,
      claimSettlementRatio: 99.2,
      cashless: true,
      additionalFeatures: ["Terminal Illness Cover", "Accidental Death Benefit", "Premium Return Option"],
      rating: 5
    },
    {
      id: 3,
      company: "Star Health",
      name: "Family Health Optima",
      type: "health",
      premium: 18000,
      coverage: 500000,
      claimSettlementRatio: 92.5,
      cashless: true,
      networkHospitals: 10000,
      waitingPeriod: 30,
      noClaimBonus: 10,
      additionalFeatures: ["Maternity Cover", "Day Care Procedures", "Annual Health Check-up"],
      rating: 4
    },
    {
      id: 4,
      company: "HDFC ERGO",
      name: "Optima Secure",
      type: "health",
      premium: 15000,
      coverage: 500000,
      claimSettlementRatio: 94.8,
      cashless: true,
      networkHospitals: 12000,
      waitingPeriod: 30,
      noClaimBonus: 15,
      additionalFeatures: ["Secure Benefit", "Plus Benefit", "Restore Benefit"],
      rating: 4
    },
    {
      id: 5,
      company: "ICICI Lombard",
      name: "Comprehensive Car Insurance",
      type: "car",
      premium: 8000,
      coverage: 600000,
      claimSettlementRatio: 93.5,
      cashless: true,
      additionalFeatures: ["Zero Depreciation", "Roadside Assistance", "Engine Protection"],
      rating: 4
    },
    {
      id: 6,
      company: "Bajaj Allianz",
      name: "My Home Insurance",
      type: "home",
      premium: 5000,
      coverage: 3000000,
      claimSettlementRatio: 91.2,
      cashless: false,
      additionalFeatures: ["Structure Coverage", "Contents Coverage", "Natural Disaster Protection"],
      rating: 3
    }
  ];
  
  const creditCards: CreditCard[] = [
    {
      id: 1,
      bank: "HDFC Bank",
      name: "Regalia",
      category: "Travel & Lifestyle",
      joiningFee: 2500,
      annualFee: 2500,
      interestRate: 3.49,
      rewardRate: 4,
      minIncomeRequired: 1200000,
      foreignTransactionFee: 3.5,
      benefits: ["Airport Lounge Access", "Milestone Benefits", "Golf Program", "Dining Concierge"],
      rating: 5
    },
    {
      id: 2,
      bank: "SBI Card",
      name: "PRIME",
      category: "Rewards",
      joiningFee: 2999,
      annualFee: 2999,
      interestRate: 3.35,
      rewardRate: 5,
      minIncomeRequired: 700000,
      foreignTransactionFee: 3.5,
      benefits: ["Fuel Surcharge Waiver", "Movie Ticket Offers", "Milestone Benefits", "Airport Lounge Access"],
      rating: 4
    },
    {
      id: 3,
      bank: "ICICI Bank",
      name: "Amazon Pay",
      category: "Cashback",
      joiningFee: 500,
      annualFee: 500,
      interestRate: 3.50,
      rewardRate: 5,
      minIncomeRequired: 300000,
      foreignTransactionFee: 3.5,
      benefits: ["Amazon Prime Membership", "Amazon Pay Cashback", "EMI Offers", "Fuel Surcharge Waiver"],
      rating: 4
    },
    {
      id: 4,
      bank: "Axis Bank",
      name: "Flipkart",
      category: "Cashback",
      joiningFee: 500,
      annualFee: 500,
      interestRate: 3.40,
      rewardRate: 5,
      minIncomeRequired: 250000,
      foreignTransactionFee: 3.5,
      benefits: ["Flipkart Vouchers", "Unlimited Cashback", "EMI Offers", "Welcome Benefits"],
      rating: 3
    },
    {
      id: 5,
      bank: "American Express",
      name: "Platinum Card",
      category: "Premium Lifestyle",
      joiningFee: 5000,
      annualFee: 5000,
      interestRate: 3.70,
      rewardRate: 4,
      minIncomeRequired: 1800000,
      foreignTransactionFee: 3.0,
      benefits: ["Priority Pass Membership", "Hotel Status", "Fine Dining Program", "Travel Insurance"],
      rating: 5
    }
  ];
  
  const loans: Loan[] = [
    {
      id: 1,
      bank: "State Bank of India",
      type: "home",
      interestRate: {
        min: 6.80,
        max: 7.20
      },
      processingFee: 0.35,
      maxTenure: 360,
      maxLoanAmount: 10000000,
      prepaymentPenalty: 0,
      minIncomeRequired: 300000,
      disbursalTime: "7-10 days",
      specialFeatures: ["Balance Transfer Option", "Top-up Facility", "Home Loan EMI Step Up/Step Down"],
      rating: 4
    },
    {
      id: 2,
      bank: "HDFC Bank",
      type: "home",
      interestRate: {
        min: 6.75,
        max: 7.15
      },
      processingFee: 0.50,
      maxTenure: 360,
      maxLoanAmount: 15000000,
      prepaymentPenalty: 0,
      minIncomeRequired: 400000,
      disbursalTime: "5-7 days",
      specialFeatures: ["FlexiPay Option", "Home Loan Insurance", "Part Prepayment Facility"],
      rating: 5
    },
    {
      id: 3,
      bank: "ICICI Bank",
      type: "personal",
      interestRate: {
        min: 10.75,
        max: 16.00
      },
      processingFee: 2.25,
      maxTenure: 60,
      maxLoanAmount: 2000000,
      prepaymentPenalty: 2,
      minIncomeRequired: 250000,
      disbursalTime: "24-48 hours",
      specialFeatures: ["Pre-approved offers", "Paperless process", "Multiple repayment options"],
      rating: 4
    },
    {
      id: 4,
      bank: "Bajaj Finserv",
      type: "personal",
      interestRate: {
        min: 11.00,
        max: 16.00
      },
      processingFee: 2.50,
      maxTenure: 60,
      maxLoanAmount: 2500000,
      prepaymentPenalty: 2,
      minIncomeRequired: 300000,
      disbursalTime: "4-24 hours",
      specialFeatures: ["Flexi Loan Option", "Zero Collateral", "Minimal Documentation"],
      rating: 5
    },
    {
      id: 5,
      bank: "Tata Capital",
      type: "car",
      interestRate: {
        min: 7.50,
        max: 11.00
      },
      processingFee: 1.00,
      maxTenure: 60,
      maxLoanAmount: 3000000,
      prepaymentPenalty: 5,
      minIncomeRequired: 250000,
      disbursalTime: "1-3 days",
      specialFeatures: ["Up to 100% on-road funding", "Used car financing", "Quick approval"],
      rating: 4
    },
    {
      id: 6,
      bank: "SBI",
      type: "education",
      interestRate: {
        min: 8.15,
        max: 10.15
      },
      processingFee: 0,
      maxTenure: 180,
      maxLoanAmount: 1500000,
      prepaymentPenalty: 0,
      minIncomeRequired: 0, // Based on co-applicant's income
      disbursalTime: "7-14 days",
      specialFeatures: ["No Margin for Loans up to ₹4 lakh", "Repayment Holiday Period", "Extended Repayment Period"],
      rating: 4
    }
  ];
  
  // Get data based on active category
  const getDataForCategory = () => {
    switch (activeCategory) {
      case "mutual-funds": return mutualFunds;
      case "fixed-deposits": return fixedDeposits;
      case "insurance-policies": return insurancePolicies;
      case "credit-cards": return creditCards;
      case "loans": return loans;
      default: return [];
    }
  };
  
  // Toggle selection of an item
  const toggleItemSelection = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      // Only allow up to 3 items for comparison
      if (selectedItems.length < 3) {
        setSelectedItems([...selectedItems, id]);
      } else {
        toast({
          title: "Selection Limit Reached",
          description: "You can compare up to 3 items at a time.",
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };
  
  // Reset selections
  const resetSelection = () => {
    setSelectedItems([]);
    setIsComparing(false);
  };
  
  // Get category label for display
  const getCategoryLabel = (category: ComparisonCategory): string => {
    switch (category) {
      case "mutual-funds": return "Mutual Funds";
      case "fixed-deposits": return "Fixed Deposits";
      case "insurance-policies": return "Insurance Policies";
      case "credit-cards": return "Credit Cards";
      case "loans": return "Loans";
      default: return "";
    }
  };
  
  // Get category icon
  const getCategoryIcon = (category: ComparisonCategory): string => {
    switch (category) {
      case "mutual-funds": return "trending_up";
      case "fixed-deposits": return "account_balance";
      case "insurance-policies": return "health_and_safety";
      case "credit-cards": return "credit_card";
      case "loans": return "payments";
      default: return "";
    }
  };
  
  // Get risk color for display
  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case "low": return "bg-green-100 text-green-800";
      case "moderate": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  // Render star rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={`material-icons text-sm ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
          >
            star
          </span>
        ))}
      </div>
    );
  };
  
  // Render cards for selection
  const renderSelectionCards = () => {
    const data = getDataForCategory();
    
    if (data.length === 0) {
      return (
        <div className="text-center py-6">
          <p className="text-gray-500">No data available</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 gap-4">
        {data.map((item: any) => (
          <Card 
            key={item.id} 
            className={`overflow-hidden ${selectedItems.includes(item.id) ? "border-primary border-2" : ""}`}
          >
            <CardContent className="p-4">
              {activeCategory === "mutual-funds" && (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.fundHouse} • {item.category}</p>
                    </div>
                    <Badge className={getRiskColor(item.risk)}>
                      {item.risk.charAt(0).toUpperCase() + item.risk.slice(1)} Risk
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">1Y Return</p>
                      <p className="font-medium text-primary">{item.returns.oneYear.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">3Y Return</p>
                      <p className="font-medium">{item.returns.threeYear.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">5Y Return</p>
                      <p className="font-medium">{item.returns.fiveYear.toFixed(1)}%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 mb-3">
                    <div>
                      <span>AUM: ₹{(item.aum / 100).toFixed(0)} Cr</span>
                    </div>
                    <div>
                      <span>Exp.Ratio: {item.expense}%</span>
                    </div>
                  </div>
                </div>
              )}
              
              {activeCategory === "fixed-deposits" && (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{item.bank}</h3>
                      <div className="flex items-center mt-1">
                        {renderRating(item.rating)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Regular Interest</p>
                      <p className="font-medium text-primary">{item.interest.regular}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Senior Citizen</p>
                      <p className="font-medium">{item.interest.senior}%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 mb-3">
                    <div>
                      <span>Min: ₹{item.minInvestment.toLocaleString()}</span>
                    </div>
                    <div>
                      <span>Tenure: {item.tenures.min}-{item.tenures.max} months</span>
                    </div>
                  </div>
                </div>
              )}
              
              {activeCategory === "insurance-policies" && (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.company} • {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Insurance</p>
                    </div>
                    <Badge>{item.claimSettlementRatio}% CSR</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Premium</p>
                      <p className="font-medium">₹{item.premium.toLocaleString()}/year</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Coverage</p>
                      <p className="font-medium">₹{(item.coverage / 100000).toFixed(1)} Lakh</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.additionalFeatures.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {item.additionalFeatures.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.additionalFeatures.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              {activeCategory === "credit-cards" && (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{item.bank} {item.name}</h3>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <div className="flex items-center">
                      {renderRating(item.rating)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Annual Fee</p>
                      <p className="font-medium">₹{item.annualFee.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Reward Rate</p>
                      <p className="font-medium">{item.rewardRate}%</p>
                    </div>
                  </div>
                  
                  <div className="flex text-xs text-gray-500 mb-3">
                    <span>Interest: {item.interestRate}% p.m.</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {item.benefits.slice(0, 2).map((benefit, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                    {item.benefits.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.benefits.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              {activeCategory === "loans" && (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{item.bank} {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Loan</h3>
                      <div className="flex items-center mt-1">
                        {renderRating(item.rating)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Interest Rate</p>
                      <p className="font-medium">{item.interestRate.min}% - {item.interestRate.max}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Processing Fee</p>
                      <p className="font-medium">{item.processingFee}%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 mb-3">
                    <div>
                      <span>Max Tenure: {(item.maxTenure / 12).toFixed(0)} years</span>
                    </div>
                    <div>
                      <span>Disbursal: {item.disbursalTime}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end mt-2">
                <Button 
                  variant={selectedItems.includes(item.id) ? "default" : "outline"} 
                  size="sm"
                  onClick={() => toggleItemSelection(item.id)}
                >
                  {selectedItems.includes(item.id) ? "Selected" : "Select for Comparison"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  // Render comparison table
  const renderComparisonTable = () => {
    const data = getDataForCategory();
    const selectedItemsData = data.filter((item: any) => selectedItems.includes(item.id));
    
    if (selectedItemsData.length === 0) {
      return (
        <div className="text-center py-6">
          <p className="text-gray-500">No items selected for comparison</p>
        </div>
      );
    }
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left text-sm font-medium">Feature</th>
              {selectedItemsData.map((item: any) => (
                <th key={item.id} className="border p-2 text-left text-sm font-medium">
                  {activeCategory === "mutual-funds" ? item.name :
                   activeCategory === "fixed-deposits" ? item.bank :
                   activeCategory === "insurance-policies" ? `${item.company} ${item.name}` :
                   activeCategory === "credit-cards" ? `${item.bank} ${item.name}` :
                   `${item.bank} ${item.type} Loan`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activeCategory === "mutual-funds" && (
              <>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Fund House</td>
                  {selectedItemsData.map((item: MutualFund) => (
                    <td key={item.id} className="border p-2 text-sm">{item.fundHouse}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Category</td>
                  {selectedItemsData.map((item: MutualFund) => (
                    <td key={item.id} className="border p-2 text-sm">{item.category}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">1 Year Return</td>
                  {selectedItemsData.map((item: MutualFund) => (
                    <td key={item.id} className="border p-2 text-sm font-medium text-primary">{item.returns.oneYear.toFixed(1)}%</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">3 Year Return</td>
                  {selectedItemsData.map((item: MutualFund) => (
                    <td key={item.id} className="border p-2 text-sm">{item.returns.threeYear.toFixed(1)}%</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">5 Year Return</td>
                  {selectedItemsData.map((item: MutualFund) => (
                    <td key={item.id} className="border p-2 text-sm">{item.returns.fiveYear.toFixed(1)}%</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Risk Level</td>
                  {selectedItemsData.map((item: MutualFund) => (
                    <td key={item.id} className="border p-2 text-sm">
                      <Badge className={getRiskColor(item.risk)}>
                        {item.risk.charAt(0).toUpperCase() + item.risk.slice(1)}
                      </Badge>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">AUM</td>
                  {selectedItemsData.map((item: MutualFund) => (
                    <td key={item.id} className="border p-2 text-sm">₹{(item.aum / 100).toFixed(0)} Cr</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Expense Ratio</td>
                  {selectedItemsData.map((item: MutualFund) => (
                    <td key={item.id} className="border p-2 text-sm">{item.expense}%</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Minimum Investment</td>
                  {selectedItemsData.map((item: MutualFund) => (
                    <td key={item.id} className="border p-2 text-sm">₹{item.minInvestment}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Exit Load</td>
                  {selectedItemsData.map((item: MutualFund) => (
                    <td key={item.id} className="border p-2 text-sm">{item.exitLoad}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Rating</td>
                  {selectedItemsData.map((item: MutualFund) => (
                    <td key={item.id} className="border p-2 text-sm">{renderRating(item.rating)}</td>
                  ))}
                </tr>
              </>
            )}
            
            {activeCategory === "fixed-deposits" && (
              <>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Regular Interest Rate</td>
                  {selectedItemsData.map((item: FixedDeposit) => (
                    <td key={item.id} className="border p-2 text-sm font-medium text-primary">{item.interest.regular}%</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Senior Citizen Rate</td>
                  {selectedItemsData.map((item: FixedDeposit) => (
                    <td key={item.id} className="border p-2 text-sm">{item.interest.senior}%</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Minimum Investment</td>
                  {selectedItemsData.map((item: FixedDeposit) => (
                    <td key={item.id} className="border p-2 text-sm">₹{item.minInvestment.toLocaleString()}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Tenure Range</td>
                  {selectedItemsData.map((item: FixedDeposit) => (
                    <td key={item.id} className="border p-2 text-sm">{item.tenures.min} - {item.tenures.max} months</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Compounding Frequency</td>
                  {selectedItemsData.map((item: FixedDeposit) => (
                    <td key={item.id} className="border p-2 text-sm">{item.compounding}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Premature Withdrawal</td>
                  {selectedItemsData.map((item: FixedDeposit) => (
                    <td key={item.id} className="border p-2 text-sm">{item.prematureWithdrawal ? "Allowed" : "Not Allowed"}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Special Features</td>
                  {selectedItemsData.map((item: FixedDeposit) => (
                    <td key={item.id} className="border p-2 text-sm">
                      <ul className="list-disc pl-4 text-xs">
                        {item.specialFeatures.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Rating</td>
                  {selectedItemsData.map((item: FixedDeposit) => (
                    <td key={item.id} className="border p-2 text-sm">{renderRating(item.rating)}</td>
                  ))}
                </tr>
              </>
            )}
            
            {activeCategory === "insurance-policies" && (
              <>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Type</td>
                  {selectedItemsData.map((item: InsurancePolicy) => (
                    <td key={item.id} className="border p-2 text-sm capitalize">{item.type}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Premium</td>
                  {selectedItemsData.map((item: InsurancePolicy) => (
                    <td key={item.id} className="border p-2 text-sm">₹{item.premium.toLocaleString()}/year</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Coverage</td>
                  {selectedItemsData.map((item: InsurancePolicy) => (
                    <td key={item.id} className="border p-2 text-sm">₹{(item.coverage / 100000).toFixed(1)} Lakh</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Claim Settlement Ratio</td>
                  {selectedItemsData.map((item: InsurancePolicy) => (
                    <td key={item.id} className="border p-2 text-sm font-medium text-primary">{item.claimSettlementRatio}%</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Cashless Facility</td>
                  {selectedItemsData.map((item: InsurancePolicy) => (
                    <td key={item.id} className="border p-2 text-sm">{item.cashless ? "Yes" : "No"}</td>
                  ))}
                </tr>
                {selectedItemsData.some((item: InsurancePolicy) => item.type === "health") && (
                  <>
                    <tr>
                      <td className="border p-2 text-sm font-medium bg-gray-50">Network Hospitals</td>
                      {selectedItemsData.map((item: InsurancePolicy) => (
                        <td key={item.id} className="border p-2 text-sm">
                          {item.networkHospitals ? item.networkHospitals.toLocaleString() : "-"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border p-2 text-sm font-medium bg-gray-50">Waiting Period</td>
                      {selectedItemsData.map((item: InsurancePolicy) => (
                        <td key={item.id} className="border p-2 text-sm">
                          {item.waitingPeriod ? `${item.waitingPeriod} days` : "-"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border p-2 text-sm font-medium bg-gray-50">No Claim Bonus</td>
                      {selectedItemsData.map((item: InsurancePolicy) => (
                        <td key={item.id} className="border p-2 text-sm">
                          {item.noClaimBonus ? `${item.noClaimBonus}%` : "-"}
                        </td>
                      ))}
                    </tr>
                  </>
                )}
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Additional Features</td>
                  {selectedItemsData.map((item: InsurancePolicy) => (
                    <td key={item.id} className="border p-2 text-sm">
                      <ul className="list-disc pl-4 text-xs">
                        {item.additionalFeatures.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Rating</td>
                  {selectedItemsData.map((item: InsurancePolicy) => (
                    <td key={item.id} className="border p-2 text-sm">{renderRating(item.rating)}</td>
                  ))}
                </tr>
              </>
            )}
            
            {activeCategory === "credit-cards" && (
              <>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Category</td>
                  {selectedItemsData.map((item: CreditCard) => (
                    <td key={item.id} className="border p-2 text-sm">{item.category}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Joining Fee</td>
                  {selectedItemsData.map((item: CreditCard) => (
                    <td key={item.id} className="border p-2 text-sm">₹{item.joiningFee.toLocaleString()}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Annual Fee</td>
                  {selectedItemsData.map((item: CreditCard) => (
                    <td key={item.id} className="border p-2 text-sm">₹{item.annualFee.toLocaleString()}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Interest Rate</td>
                  {selectedItemsData.map((item: CreditCard) => (
                    <td key={item.id} className="border p-2 text-sm">{item.interestRate}% per month</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Reward Rate</td>
                  {selectedItemsData.map((item: CreditCard) => (
                    <td key={item.id} className="border p-2 text-sm font-medium text-primary">{item.rewardRate}%</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Minimum Income</td>
                  {selectedItemsData.map((item: CreditCard) => (
                    <td key={item.id} className="border p-2 text-sm">₹{(item.minIncomeRequired / 100000).toFixed(1)} Lakh/year</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Foreign Transaction Fee</td>
                  {selectedItemsData.map((item: CreditCard) => (
                    <td key={item.id} className="border p-2 text-sm">{item.foreignTransactionFee}%</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Benefits</td>
                  {selectedItemsData.map((item: CreditCard) => (
                    <td key={item.id} className="border p-2 text-sm">
                      <ul className="list-disc pl-4 text-xs">
                        {item.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Rating</td>
                  {selectedItemsData.map((item: CreditCard) => (
                    <td key={item.id} className="border p-2 text-sm">{renderRating(item.rating)}</td>
                  ))}
                </tr>
              </>
            )}
            
            {activeCategory === "loans" && (
              <>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Type</td>
                  {selectedItemsData.map((item: Loan) => (
                    <td key={item.id} className="border p-2 text-sm capitalize">{item.type}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Interest Rate</td>
                  {selectedItemsData.map((item: Loan) => (
                    <td key={item.id} className="border p-2 text-sm font-medium text-primary">{item.interestRate.min}% - {item.interestRate.max}%</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Processing Fee</td>
                  {selectedItemsData.map((item: Loan) => (
                    <td key={item.id} className="border p-2 text-sm">{item.processingFee}%</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Maximum Tenure</td>
                  {selectedItemsData.map((item: Loan) => (
                    <td key={item.id} className="border p-2 text-sm">{(item.maxTenure / 12).toFixed(0)} years</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Maximum Loan Amount</td>
                  {selectedItemsData.map((item: Loan) => (
                    <td key={item.id} className="border p-2 text-sm">₹{(item.maxLoanAmount / 100000).toFixed(1)} Lakh</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Prepayment Penalty</td>
                  {selectedItemsData.map((item: Loan) => (
                    <td key={item.id} className="border p-2 text-sm">{item.prepaymentPenalty}%</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Minimum Income</td>
                  {selectedItemsData.map((item: Loan) => (
                    <td key={item.id} className="border p-2 text-sm">
                      {item.minIncomeRequired > 0 ? `₹${(item.minIncomeRequired / 100000).toFixed(1)} Lakh/year` : "-"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Disbursal Time</td>
                  {selectedItemsData.map((item: Loan) => (
                    <td key={item.id} className="border p-2 text-sm">{item.disbursalTime}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Special Features</td>
                  {selectedItemsData.map((item: Loan) => (
                    <td key={item.id} className="border p-2 text-sm">
                      <ul className="list-disc pl-4 text-xs">
                        {item.specialFeatures.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-sm font-medium bg-gray-50">Rating</td>
                  {selectedItemsData.map((item: Loan) => (
                    <td key={item.id} className="border p-2 text-sm">{renderRating(item.rating)}</td>
                  ))}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  // When category changes, reset selection
  const handleCategoryChange = (newCategory: ComparisonCategory) => {
    setActiveCategory(newCategory);
    resetSelection();
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
        <h2 className="text-xl font-semibold">Comparison Tool</h2>
      </div>
      
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <h3 className="text-base font-medium">Compare {getCategoryLabel(activeCategory)}</h3>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                disabled={selectedItems.length === 0}
                onClick={resetSelection}
              >
                Reset Selection
              </Button>
              <Button 
                size="sm"
                disabled={selectedItems.length < 2}
                onClick={() => setIsComparing(!isComparing)}
              >
                {isComparing ? "Edit Selection" : "Compare Selected"}
              </Button>
            </div>
          </div>
          
          {selectedItems.length > 0 && (
            <div className="flex items-center mt-3 pt-3 border-t border-gray-100">
              <span className="text-sm mr-2">Selected:</span>
              <div className="flex flex-wrap gap-1">
                {selectedItems.map((id) => {
                  const item = getDataForCategory().find((i: any) => i.id === id);
                  return (
                    <Badge key={id} variant="secondary" className="flex items-center gap-1">
                      {activeCategory === "mutual-funds" ? (item as MutualFund).name :
                       activeCategory === "fixed-deposits" ? (item as FixedDeposit).bank :
                       activeCategory === "insurance-policies" ? `${(item as InsurancePolicy).company} ${(item as InsurancePolicy).name}` :
                       activeCategory === "credit-cards" ? `${(item as CreditCard).bank} ${(item as CreditCard).name}` :
                       `${(item as Loan).bank} ${(item as Loan).type}`}
                      <button 
                        onClick={() => toggleItemSelection(id)}
                        className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        <span className="material-icons text-[14px]">close</span>
                      </button>
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="overflow-x-auto mb-4">
        <div className="flex space-x-2">
          {(["mutual-funds", "fixed-deposits", "insurance-policies", "credit-cards", "loans"] as const).map((category) => (
            <button
              key={category}
              className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap ${
                activeCategory === category 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              <span className="material-icons mr-1 text-sm">{getCategoryIcon(category)}</span>
              {getCategoryLabel(category)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        {isComparing && selectedItems.length >= 2 ? (
          renderComparisonTable()
        ) : (
          renderSelectionCards()
        )}
      </div>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="text-base font-medium mb-3">Comparison Tips</h3>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="material-icons text-primary mr-2">tips_and_updates</span>
              <div>
                <p className="text-sm font-medium">Focus on Key Parameters</p>
                <p className="text-xs text-gray-500">
                  {activeCategory === "mutual-funds" ? "For mutual funds, look beyond just returns. Consider expense ratio, fund size, and risk level." :
                   activeCategory === "fixed-deposits" ? "For FDs, compare post-tax returns rather than just advertised rates." :
                   activeCategory === "insurance-policies" ? "For insurance, claim settlement ratio and coverage details are more important than just premiums." :
                   activeCategory === "credit-cards" ? "For credit cards, consider your spending pattern to maximize reward benefits." :
                   "For loans, calculate the total cost including processing fees, not just interest rates."}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-primary mr-2">tips_and_updates</span>
              <div>
                <p className="text-sm font-medium">Consider Long-term Value</p>
                <p className="text-xs text-gray-500">
                  {activeCategory === "mutual-funds" ? "Consistent performers often beat high-return funds with volatile performance." :
                   activeCategory === "fixed-deposits" ? "Consider laddering FDs with different maturities for better liquidity and returns." :
                   activeCategory === "insurance-policies" ? "A policy with slightly higher premium but better coverage features may offer better value." :
                   activeCategory === "credit-cards" ? "Annual fee is worth paying if the benefits exceed the cost based on your usage." :
                   "A higher EMI with shorter tenure often saves money in the long run."}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-primary mr-2">tips_and_updates</span>
              <div>
                <p className="text-sm font-medium">Read the Fine Print</p>
                <p className="text-xs text-gray-500">Always check terms and conditions carefully before making financial decisions.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}