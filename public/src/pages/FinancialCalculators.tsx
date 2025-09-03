import { TabPills, TabItem } from "../components/ui/tab-pills";
import { useState } from "react";
import { Link } from "wouter";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { SEO } from "../components/SEO";
import "../styles/financial-calculators.css";

interface CalculatorCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  category: "investment" | "savings" | "loan" | "protection" | "retirement";
}

export default function FinancialCalculators() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Filter calculators based on search query and active tab
  const filteredCalculators = calculators.filter(calculator => {
    const matchesSearch = 
      calculator.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      calculator.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = 
      activeTab === "all" || 
      calculator.category === activeTab;
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="px-6 py-5 max-w-4xl mx-auto financial-calculators-page">
      <SEO 
        title="Financial Calculators & Tools"
        description="Access 45+ financial calculators to help with investment planning, loan calculations, tax estimates, retirement planning, savings, pension, and insurance calculations."
        keywords="financial calculators, SIP calculator, EMI calculator, tax calculator, retirement planning, loan calculator, investment calculator, PPF calculator, FD calculator, RD calculator"
        canonical="https://rupeesmart.com/financial-calculators"
        ogType="website"
      />
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Financial Calculators</h1>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <span className="material-icons text-base">search</span>
          </span>
          <Input 
            placeholder="Search for calculators..."
            className="pl-10 border-gray-300 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-transparent p-0 border-0 w-full">
          <TabsTrigger value="all" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">All</TabsTrigger>
          <TabsTrigger value="investment" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Investment</TabsTrigger>
          <TabsTrigger value="savings" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Savings</TabsTrigger>
          <TabsTrigger value="loan" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Loan</TabsTrigger>
          <TabsTrigger value="protection" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Protection & Tax</TabsTrigger>
          <TabsTrigger value="retirement" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Retirement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <CalculatorsGrid calculators={filteredCalculators} />
        </TabsContent>
        
        <TabsContent value="investment" className="mt-6">
          <CalculatorsGrid 
            calculators={filteredCalculators.filter(c => c.category === "investment")} 
          />
        </TabsContent>
        
        <TabsContent value="loan" className="mt-6">
          <CalculatorsGrid 
            calculators={filteredCalculators.filter(c => c.category === "loan")} 
          />
        </TabsContent>
        
        <TabsContent value="protection" className="mt-6">
          <CalculatorsGrid 
            calculators={filteredCalculators.filter(c => c.category === "protection")} 
          />
        </TabsContent>
        
        <TabsContent value="retirement" className="mt-6">
          <CalculatorsGrid 
            calculators={filteredCalculators.filter(c => c.category === "retirement")} 
          />
        </TabsContent>
        
        <TabsContent value="savings" className="mt-6">
          <CalculatorsGrid 
            calculators={filteredCalculators.filter(c => c.category === "savings")} 
          />
        </TabsContent>
        

      </Tabs>

      {/* Featured Calculators */}
      {activeTab === "all" && searchQuery === "" && (
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Featured Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredCalculators.map(calculator => (
              <Link key={calculator.id} href={calculator.route}>
                <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer h-full flex">
                  <div className="mr-4 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-blue-600">{calculator.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{calculator.title}</h3>
                    <p className="text-sm text-gray-600">{calculator.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Guide for selecting calculators */}
      {filteredCalculators.length === 0 && (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <span className="material-icons text-gray-400 text-4xl mb-2">calculate</span>
          <h3 className="font-medium mb-1">No calculators found</h3>
          <p className="text-sm text-gray-500 mb-4">Try adjusting your search or exploring different categories</p>
        </div>
      )}
      
      {/* Guide & General Info */}
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">How to Choose the Right Calculator</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex">
              <div className="mr-3 mt-1">
                <span className="flex items-center justify-center rounded-full bg-blue-100 w-8 h-8">
                  <span className="material-icons text-blue-600 text-sm">lightbulb</span>
                </span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Know Your Goal</h3>
                <p className="text-sm text-gray-600">Choose calculators based on your financial goals, whether it's planning for retirement, understanding loan repayments, or optimizing investments.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-3 mt-1">
                <span className="flex items-center justify-center rounded-full bg-blue-100 w-8 h-8">
                  <span className="material-icons text-blue-600 text-sm">info</span>
                </span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Gather Information</h3>
                <p className="text-sm text-gray-600">Have your financial data ready to get the most accurate results. This includes interest rates, loan terms, tax brackets, or investment amounts.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-3 mt-1">
                <span className="flex items-center justify-center rounded-full bg-blue-100 w-8 h-8">
                  <span className="material-icons text-blue-600 text-sm">compare_arrows</span>
                </span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Compare Scenarios</h3>
                <p className="text-sm text-gray-600">Use multiple calculators to compare different scenarios and make informed financial decisions based on the results.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for rendering calculator grids
function CalculatorsGrid({ calculators }: { calculators: CalculatorCard[] }) {
  if (calculators.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <span className="material-icons text-gray-400 text-4xl mb-2">calculate</span>
        <h3 className="font-medium mb-1">No calculators found</h3>
        <p className="text-sm text-gray-500 mb-4">Try adjusting your search or exploring different categories</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {calculators.map(calculator => (
        <Link key={calculator.id} href={calculator.route}>
          <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer h-full flex flex-col">
            <div className="mb-3 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="material-icons text-blue-600">{calculator.icon}</span>
            </div>
            <h3 className="font-medium mb-1">{calculator.title}</h3>
            <p className="text-sm text-gray-600 flex-grow">{calculator.description}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}

// Data
const featuredCalculators: CalculatorCard[] = [
  {
    id: "financial-scenario",
    title: "Financial Scenario Planner",
    description: "Create and compare different financial scenarios for retirement, education, and more",
    icon: "insights",
    route: "/run-financial-scenario",
    category: "investment"
  },
  {
    id: "sip",
    title: "SIP Calculator",
    description: "Calculate the future value of your systematic investment plans",
    icon: "savings",
    route: "/sip-calculator",
    category: "investment"
  },
  {
    id: "emi",
    title: "EMI Calculator",
    description: "Estimate your monthly installments for loans",
    icon: "payments",
    route: "/emi-calculator",
    category: "loan"
  },
  {
    id: "tax",
    title: "Income Tax Calculator",
    description: "Estimate your income tax liability for the current financial year",
    icon: "receipt_long",
    route: "/tax-calculator",
    category: "protection"
  },
  {
    id: "term",
    title: "Term Insurance Calculator",
    description: "Calculate how much term insurance coverage you need",
    icon: "health_and_safety",
    route: "/term-insurance-calculator",
    category: "protection"
  }
];

const calculators: CalculatorCard[] = [
  ...featuredCalculators,
  // Investment Interest Calculators
  {
    id: "simple-interest",
    title: "Simple Interest Calculator",
    description: "Calculate interest earned on principal amount without compounding",
    icon: "percent",
    route: "/simple-interest-calculator",
    category: "investment"
  },
  {
    id: "compound-interest",
    title: "Compound Interest Calculator",
    description: "Calculate interest earned on both principal and accumulated interest",
    icon: "trending_up",
    route: "/compound-interest-calculator",
    category: "investment"
  },
  {
    id: "cagr",
    title: "CAGR Calculator",
    description: "Calculate Compound Annual Growth Rate for your investments",
    icon: "show_chart",
    route: "/cagr-calculator",
    category: "investment"
  },
  {
    id: "interest-rate",
    title: "Interest Rate Calculator",
    description: "Find the interest rate needed to achieve a target investment amount",
    icon: "calculate",
    route: "/interest-rate-calculator",
    category: "investment"
  },
  {
    id: "inflation",
    title: "Inflation Calculator",
    description: "Calculate the purchasing power of money over time due to inflation",
    icon: "money_off",
    route: "/inflation-calculator",
    category: "investment"
  },
  {
    id: "discount",
    title: "Discount Calculator",
    description: "Calculate discounted prices and savings on retail purchases",
    icon: "local_offer",
    route: "/discount-calculator",
    category: "savings"
  },
  {
    id: "gst",
    title: "GST Calculator",
    description: "Calculate GST inclusive and exclusive amounts for goods and services",
    icon: "receipt_long",
    route: "/gst-calculator",
    category: "protection"
  },
  {
    id: "gratuity",
    title: "Gratuity Calculator",
    description: "Calculate gratuity amount based on your salary and service years",
    icon: "handshake",
    route: "/gratuity-calculator",
    category: "retirement"
  },
  
  // Salary & Protection Calculators
  {
    id: "salary",
    title: "Salary Calculator",
    description: "Calculate take-home salary after taxes and deductions",
    icon: "account_balance_wallet",
    route: "/salary-calculator", 
    category: "protection"
  },
  {
    id: "hra",
    title: "HRA Calculator",
    description: "Calculate HRA exemption for income tax purposes",
    icon: "home",
    route: "/hra-calculator",
    category: "protection"
  },
  {
    id: "income-tax",
    title: "Income Tax Calculator",
    description: "Estimate your income tax liability for the current financial year",
    icon: "receipt_long",
    route: "/tax-calculator",
    category: "protection"
  },
  {
    id: "tds",
    title: "TDS Calculator",
    description: "Calculate TDS amount for various payment types",
    icon: "receipt",
    route: "/tds-calculator",
    category: "protection"
  },
  {
    id: "capital-gains",
    title: "Capital Gains Calculator",
    description: "Calculate your tax liability on capital gains",
    icon: "show_chart",
    route: "/capital-gains-calculator",
    category: "protection"
  },
  {
    id: "tax-harvesting",
    title: "Tax Harvesting Calculator",
    description: "Optimize your tax savings by strategically managing capital gains and losses",
    icon: "savings",
    route: "/tax-harvesting",
    category: "protection"
  },
  
  // Investment Calculators
  /* Removed duplicate SIP Calculator entry as it's already in featuredCalculators */
  {
    id: "lumpsum",
    title: "Lumpsum Calculator",
    description: "Calculate the future value of your one-time investments",
    icon: "money",
    route: "/lumpsum-calculator",
    category: "investment"
  },
  {
    id: "swp",
    title: "SWP Calculator",
    description: "Calculate systematic withdrawals from your investments",
    icon: "trending_down",
    route: "/swp-calculator",
    category: "investment"
  },
  {
    id: "stp",
    title: "STP Calculator",
    description: "Calculate systematic transfers between investment options",
    icon: "swap_horiz",
    route: "/stp-calculator",
    category: "investment"
  },
  {
    id: "stock-average",
    title: "Stock Average Calculator",
    description: "Calculate average purchase price when buying stocks in multiple lots",
    icon: "candlestick_chart",
    route: "/stock-average-calculator",
    category: "investment"
  },
  {
    id: "brokerage",
    title: "Brokerage Calculator",
    description: "Calculate brokerage fees and taxes for stock trades",
    icon: "paid",
    route: "/brokerage-calculator",
    category: "investment"
  },
  {
    id: "direct-vs-regular",
    title: "Direct vs Regular Mutual Fund Calculator",
    description: "Compare returns between direct and regular mutual fund investments",
    icon: "compare_arrows",
    route: "/direct-vs-regular-calculator",
    category: "investment"
  },
  {
    id: "returns",
    title: "Returns Calculator",
    description: "Calculate CAGR, absolute, and annualized returns on investments",
    icon: "trending_up",
    route: "/returns-calculator",
    category: "investment"
  },
  {
    id: "step-up-sip",
    title: "Step-up SIP Calculator",
    description: "Calculate the future value of your SIP with annual increases",
    icon: "stacked_line_chart",
    route: "/step-up-sip-calculator",
    category: "investment"
  },
  {
    id: "gold-investment",
    title: "Gold Investment Calculator",
    description: "Calculate returns on gold investments over time",
    icon: "diamond",
    route: "/gold-investment-calculator",
    category: "investment"
  },
  
  // Retirement & Pension Calculators
  {
    id: "retirement",
    title: "Retirement Planning Calculator",
    description: "Plan your retirement corpus and monthly savings needed",
    icon: "elderly",
    route: "/retirement-calculator",
    category: "retirement"
  },
  {
    id: "nps",
    title: "NPS Calculator",
    description: "Calculate returns on your National Pension System investments",
    icon: "savings",
    route: "/nps-calculator",
    category: "retirement"
  },
  {
    id: "apy",
    title: "APY Calculator",
    description: "Calculate pension amount under Atal Pension Yojana",
    icon: "account_balance",
    route: "/apy-calculator",
    category: "retirement"
  },
  
  // Fixed Income & Savings Calculators
  {
    id: "ppf",
    title: "PPF Calculator",
    description: "Estimate returns on your Public Provident Fund investments",
    icon: "account_balance_wallet",
    route: "/ppf-calculator",
    category: "savings"
  },
  {
    id: "ssy",
    title: "Sukanya Samriddhi Yojana Calculator",
    description: "Calculate returns on SSY investments for your daughter's future",
    icon: "child_care",
    route: "/ssy-calculator",
    category: "savings"
  },
  {
    id: "nsc",
    title: "NSC Calculator",
    description: "Calculate returns on National Savings Certificates investments",
    icon: "description",
    route: "/nsc-calculator",
    category: "savings"
  },
  {
    id: "fd",
    title: "Fixed Deposit Calculator",
    description: "Calculate returns on bank fixed deposits",
    icon: "account_balance",
    route: "/fd-calculator",
    category: "savings"
  },
  {
    id: "rd",
    title: "Recurring Deposit Calculator",
    description: "Calculate returns on monthly recurring deposits",
    icon: "autorenew",
    route: "/rd-calculator",
    category: "savings"
  },
  {
    id: "post-office-ppf",
    title: "Post Office PPF Calculator",
    description: "Calculate returns on Post Office Public Provident Fund",
    icon: "local_post_office",
    route: "/post-office-ppf-calculator",
    category: "savings"
  },
  {
    id: "post-office-fd",
    title: "Post Office FD Calculator",
    description: "Calculate returns on Post Office Fixed Deposits",
    icon: "local_post_office",
    route: "/post-office-fd-calculator",
    category: "savings"
  },
  {
    id: "post-office-rd",
    title: "Post Office RD Calculator",
    description: "Calculate returns on Post Office Recurring Deposits",
    icon: "local_post_office",
    route: "/post-office-rd-calculator",
    category: "savings"
  },
  {
    id: "post-office-mis",
    title: "Post Office MIS Calculator",
    description: "Calculate returns on Post Office Monthly Income Scheme",
    icon: "local_post_office",
    route: "/post-office-mis-calculator",
    category: "savings"
  },
  
  // Bank-specific calculators
  {
    id: "sbi-fd",
    title: "SBI FD Calculator",
    description: "Calculate returns on State Bank of India Fixed Deposits",
    icon: "account_balance",
    route: "/sbi-fd-calculator",
    category: "savings"
  },
  {
    id: "hdfc-fd",
    title: "HDFC Bank FD Calculator",
    description: "Calculate returns on HDFC Bank Fixed Deposits",
    icon: "account_balance",
    route: "/hdfc-fd-calculator",
    category: "savings"
  },
  {
    id: "icici-fd",
    title: "ICICI Bank FD Calculator",
    description: "Calculate returns on ICICI Bank Fixed Deposits",
    icon: "account_balance",
    route: "/icici-fd-calculator",
    category: "savings"
  },
  {
    id: "axis-fd",
    title: "Axis Bank FD Calculator",
    description: "Calculate returns on Axis Bank Fixed Deposits",
    icon: "account_balance",
    route: "/axis-fd-calculator",
    category: "savings"
  },
  {
    id: "kotak-fd",
    title: "Kotak Mahindra Bank FD Calculator",
    description: "Calculate returns on Kotak Mahindra Bank Fixed Deposits",
    icon: "account_balance",
    route: "/kotak-fd-calculator",
    category: "savings"
  },
  {
    id: "yes-fd",
    title: "Yes Bank FD Calculator",
    description: "Calculate returns on Yes Bank Fixed Deposits",
    icon: "account_balance",
    route: "/yes-bank-fd-calculator",
    category: "savings"
  },
  
  // Loan Calculators
  {
    id: "personal-loan-emi",
    title: "Personal Loan EMI Calculator",
    description: "Calculate EMI, total interest and payments for personal loans",
    icon: "payments",
    route: "/personal-loan-calculator",
    category: "loan"
  },
  {
    id: "home-loan",
    title: "Home Loan EMI Calculator",
    description: "Estimate your monthly installments for home loans",
    icon: "home",
    route: "/home-loan-calculator",
    category: "loan"
  },
  {
    id: "personal-loan",
    title: "Personal Loan EMI Calculator",
    description: "Estimate your monthly installments for personal loans",
    icon: "account_balance",
    route: "/personal-loan-calculator",
    category: "loan"
  },
  {
    id: "car-loan",
    title: "Car Loan EMI Calculator",
    description: "Estimate your monthly installments for car loans",
    icon: "directions_car",
    route: "/car-loan-calculator",
    category: "loan"
  },
  {
    id: "bike-loan",
    title: "Bike Loan EMI Calculator",
    description: "Estimate your monthly installments for two-wheeler loans",
    icon: "two_wheeler",
    route: "/bike-loan-calculator",
    category: "loan"
  },
  {
    id: "education-loan",
    title: "Education Loan EMI Calculator",
    description: "Estimate your monthly installments for education loans",
    icon: "school",
    route: "/education-loan-calculator",
    category: "loan"
  },
  {
    id: "credit-card-emi",
    title: "Credit Card EMI Calculator",
    description: "Convert credit card purchases to affordable EMIs",
    icon: "credit_card",
    route: "/credit-card-emi-calculator",
    category: "loan"
  },
  {
    id: "loan-prepayment",
    title: "Loan Prepayment Calculator",
    description: "Calculate savings on interest by prepaying your loan",
    icon: "money_off",
    route: "/loan-prepayment-calculator",
    category: "loan"
  },
  {
    id: "sbi-home-loan",
    title: "SBI Home Loan EMI Calculator",
    description: "Estimate EMIs for SBI Home Loans with current interest rates",
    icon: "house",
    route: "/sbi-home-loan-calculator",
    category: "loan"
  },
  {
    id: "hdfc-home-loan",
    title: "HDFC Home Loan EMI Calculator",
    description: "Estimate EMIs for HDFC Home Loans with current interest rates",
    icon: "house",
    route: "/hdfc-home-loan-calculator",
    category: "loan"
  },
  {
    id: "sbi-personal-loan",
    title: "SBI Personal Loan EMI Calculator",
    description: "Estimate EMIs for SBI Personal Loans with current interest rates",
    icon: "person",
    route: "/sbi-personal-loan-calculator",
    category: "loan"
  },
  {
    id: "hdfc-personal-loan",
    title: "HDFC Personal Loan EMI Calculator",
    description: "Estimate EMIs for HDFC Personal Loans with current interest rates",
    icon: "person",
    route: "/hdfc-personal-loan-calculator",
    category: "loan"
  },
  {
    id: "icici-personal-loan",
    title: "ICICI Personal Loan EMI Calculator",
    description: "Estimate EMIs for ICICI Personal Loans with current interest rates",
    icon: "person",
    route: "/icici-personal-loan-calculator",
    category: "loan"
  },
  {
    id: "axis-personal-loan",
    title: "Axis Personal Loan EMI Calculator",
    description: "Estimate EMIs for Axis Personal Loans with current interest rates",
    icon: "person",
    route: "/axis-personal-loan-calculator",
    category: "loan"
  },
  
  // Insurance Calculators
  {
    id: "term",
    title: "Term Insurance Calculator",
    description: "Calculate how much term insurance coverage you need",
    icon: "health_and_safety",
    route: "/term-insurance-calculator",
    category: "protection"
  },
  {
    id: "health-insurance",
    title: "Health Insurance Calculator",
    description: "Estimate the ideal health insurance coverage for you and your family",
    icon: "medical_services",
    route: "/health-insurance-calculator",
    category: "protection"
  },
  {
    id: "car-insurance",
    title: "Car Insurance Calculator",
    description: "Estimate premium for your car insurance policy",
    icon: "directions_car",
    route: "/car-insurance-calculator",
    category: "protection"
  },
  {
    id: "life-insurance",
    title: "Life Insurance Coverage Calculator",
    description: "Calculate the ideal life insurance coverage amount for your family",
    icon: "family_restroom",
    route: "/life-insurance-calculator",
    category: "protection"
  },
  
  // Other Financial Calculators
  {
    id: "education-savings",
    title: "Education Savings Calculator",
    description: "Plan for your child's education expenses",
    icon: "school",
    route: "/education-savings-calculator",
    category: "savings"
  },
  {
    id: "emergency-fund",
    title: "Emergency Fund Calculator",
    description: "Calculate how much you need to save for emergencies",
    icon: "emergency",
    route: "/emergency-fund-calculator",
    category: "savings"
  },
  {
    id: "home-down-payment",
    title: "Home Down Payment Calculator",
    description: "Plan savings needed for your home down payment",
    icon: "house",
    route: "/home-down-payment-calculator",
    category: "savings"
  },
  {
    id: "net-worth",
    title: "Net Worth Tracker",
    description: "Calculate and track your total assets, liabilities and net worth",
    icon: "balance",
    route: "/net-worth-calculator",
    category: "investment"
  },
  {
    id: "investment-returns",
    title: "Investment Returns Calculator",
    description: "Calculate and compare returns from different investment options",
    icon: "insights",
    route: "/investment-returns-calculator",
    category: "investment"
  }
];