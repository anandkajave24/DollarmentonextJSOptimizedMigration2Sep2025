import { TabPills, TabItem } from "../components/ui/tab-pills";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { SEO } from "../components/SEO";
import { 
  Building, 
  Home, 
  Receipt, 
  GraduationCap, 
  TrendingUp, 
  Percent,
  Calculator,
  PiggyBank,
  DollarSign,
  CreditCard,
  Shield,
  Heart,
  Car,
  FileText,
  Banknote,
  Coins,
  Building2,
  Search,
  Lightbulb,
  Info,
  ArrowLeftRight,
  Target,
  TrendingDown,
  BarChart3,
  Landmark,
  HandCoins,
  Wallet
} from "lucide-react";

interface CalculatorCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  category: "investment" | "savings" | "loan" | "protection" | "retirement";
  isImplemented: boolean;
}

// Icon mapping from Material Icons to Lucide React icons
const iconMap: Record<string, React.ComponentType<any>> = {
  account_balance: Building,
  home: Home,
  receipt_long: Receipt,
  school: GraduationCap,
  trending_up: TrendingUp,
  percent: Percent,
  calculate: Calculator,
  savings: PiggyBank,
  money: DollarSign,
  show_chart: BarChart3,
  credit_card: CreditCard,
  currency_exchange: Coins,
  home_work: Building2,
  security: Shield,
  favorite: Heart,
  directions_car: Car,
  description: FileText,
  payments: Banknote,
  search: Search,
  lightbulb: Lightbulb,
  info: Info,
  compare_arrows: ArrowLeftRight,
  track_changes: Target,
  trending_down: TrendingDown,
  account_balance_wallet: Wallet,
  hand_coins: HandCoins,
  landmark: Landmark
};

// Helper function to get the appropriate icon component
const getIconComponent = (iconName: string) => {
  return iconMap[iconName] || Calculator;
};

// Search Bar Component
function SearchBar({ searchQuery, onSearchChange }: { searchQuery: string; onSearchChange: (value: string) => void }) {
  return (
    <div className="mb-6">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          <Search className="h-4 w-4" />
        </span>
        <Input 
          placeholder="Search for calculators..."
          className="pl-10 border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}

// Category Tabs Component
function CategoryTabs({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const categories = [
    { value: "all", label: "All" },
    { value: "investment", label: "Investment" },
    { value: "savings", label: "Savings" },
    { value: "loan", label: "Loan" },
    { value: "protection", label: "Protection & Tax" },
    { value: "retirement", label: "Retirement" },
  ];

  return (
    <Tabs value={activeTab} className="mb-6" onValueChange={onTabChange}>
      <TabsList className="flex flex-wrap sm:flex-nowrap justify-start overflow-x-auto gap-2 bg-transparent p-0 border-0 w-full">
        {categories.map((category) => (
          <TabsTrigger 
            key={category.value}
            value={category.value} 
            className="rounded-full px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500 whitespace-nowrap"
          >
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

// Featured Calculators Component
function FeaturedCalculators() {
  return (
    <div className="mb-8">
      <h2 className="text-lg sm:text-xl font-medium mb-4">Featured Calculators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredCalculators.map(calculator => {
          const IconComponent = getIconComponent(calculator.icon);
          return (
            <Link key={calculator.id} href={calculator.route}>
              <Card className="p-3 hover:shadow-md transition-all duration-200 cursor-pointer h-full flex flex-col relative min-h-[120px] rounded-lg border shadow-sm bg-white">
                <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                  ✓ Available
                </div>
                <div className="mb-2 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-1 text-sm leading-tight">{calculator.title}</h3>
                <p className="text-xs text-gray-600 flex-grow leading-tight">{calculator.description}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// How to Guide Component
function HowToGuide() {
  const guides = [
    {
      icon: Lightbulb,
      title: "Know Your Goal",
      description: "Choose calculators based on your financial goals, whether it's planning for retirement, understanding loan repayments, or optimizing investments."
    },
    {
      icon: Info,
      title: "Gather Information",
      description: "Have your financial data ready to get the most accurate results. This includes interest rates, loan terms, tax brackets, or investment amounts."
    },
    {
      icon: ArrowLeftRight,
      title: "Compare Scenarios",
      description: "Use multiple calculators to compare different scenarios and make informed financial decisions based on the results."
    }
  ];

  return (
    <div className="mt-8">
      <h2 className="text-lg sm:text-xl font-medium mb-4">How to Choose the Right Calculator</h2>
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {guides.map((guide, index) => {
            const IconComponent = guide.icon;
            return (
              <div key={index} className="flex flex-col sm:flex-row">
                <div className="mb-2 sm:mr-3 sm:mt-1 flex justify-center sm:justify-start">
                  <span className="flex items-center justify-center rounded-full bg-blue-100 w-8 h-8 sm:w-10 sm:h-10">
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </span>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-medium mb-1 text-sm sm:text-base">{guide.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{guide.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function FinancialCalculators() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const router = useRouter();

  // Handle URL category parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const category = urlParams.get('category');
      
      if (category) {
        const categoryMap: Record<string, string> = {
          'Retirement': 'retirement',
          'Mortgage': 'loan', 
          'Tax': 'protection',
          'Credit': 'loan',
          'Investment': 'investment',
          'Insurance': 'protection'
        };
        
        const mappedCategory = categoryMap[category];
        if (mappedCategory) {
          setActiveTab(mappedCategory);
        }
      }
    }
  }, [router.query]);
  
  // Filter calculators based on search query and active tab, prioritizing implemented ones
  const filteredCalculators = calculators
    .filter(calculator => {
      const matchesSearch = 
        calculator.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        calculator.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTab = 
        activeTab === "all" || 
        calculator.category === activeTab;
      
      return matchesSearch && matchesTab;
    })
    .sort((a, b) => {
      // Sort implemented calculators first
      if (a.isImplemented && !b.isImplemented) return -1;
      if (!a.isImplemented && b.isImplemented) return 1;
      return 0;
    });

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 w-full financial-calculators-page">
      <SEO 
        title="45+ Free Financial Calculators & Tools - Complete Calculator Hub USA"
        description="Comprehensive financial calculator suite: 401k calculator, mortgage calculator, budget planner, retirement calculator, investment calculator, debt payoff calculator, tax calculator & savings tools. All free, built for Americans."
        keywords="financial calculator, personal finance calculator, 401k calculator, mortgage calculator, retirement calculator, budget calculator, investment calculator, tax calculator, loan calculator, savings calculator, debt payoff calculator, compound interest calculator, emergency fund calculator, capital gains tax calculator, roth ira calculator, traditional ira calculator, social security calculator, home loan calculator, student loan calculator, auto loan calculator, personal loan calculator, credit card payoff calculator, debt consolidation calculator, cd calculator, hsa calculator, term insurance calculator, life insurance calculator, currency converter, inflation calculator, cagr calculator, dollar cost averaging calculator, net worth calculator, stock average calculator, brokerage fees calculator, mutual fund calculator, etf calculator, money market calculator, 529 calculator, real estate calculator, refinance calculator, payroll tax calculator, financial planning calculator, personal finance tools, investment tools, retirement planning, financial education, money management tools, comprehensive financial calculators, financial calculator suite, american financial tools, financial planning tools usa"
        canonical="https://dollarmento.com/financial-calculators"
        ogType="website"
      />
      
      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Financial Calculators</h1>
      </header>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Category Tabs */}
      <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <Tabs value={activeTab} className="mb-6">
        {["all", "investment", "savings", "loan", "protection", "retirement"].map(tab => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <CalculatorsGrid 
              calculators={tab === "all" ? filteredCalculators : filteredCalculators.filter(c => c.category === tab)} 
            />
          </TabsContent>
        ))}
      </Tabs>

      {/* Featured Calculators */}
      {activeTab === "all" && searchQuery === "" && <FeaturedCalculators />}

      {/* No Results Message */}
      {filteredCalculators.length === 0 && (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="font-medium mb-1">No calculators found</h3>
          <p className="text-sm text-gray-500 mb-4">Try adjusting your search or exploring different categories</p>
        </div>
      )}
      
      {/* Guide Section */}
      <HowToGuide />
    </div>
  );
}

// Helper component for rendering calculator grids
function CalculatorsGrid({ calculators }: { calculators: CalculatorCard[] }) {
  if (calculators.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="font-medium mb-1">No calculators found</h3>
        <p className="text-sm text-gray-500 mb-4">Try adjusting your search or exploring different categories</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {calculators.map(calculator => {
        const IconComponent = getIconComponent(calculator.icon);
        return (
          <Link key={calculator.id} href={calculator.route}>
            <Card className={`p-3 hover:shadow-md transition-all duration-200 cursor-pointer h-full flex flex-col relative min-h-[120px] rounded-lg border shadow-sm bg-white ${
              !calculator.isImplemented ? 'opacity-75' : ''
            }`}>
              {!calculator.isImplemented && (
                <div className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                  Coming Soon
                </div>
              )}
              {calculator.isImplemented && (
                <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                  ✓ Available
                </div>
              )}
              <div className="mb-2 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <IconComponent className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1 text-sm leading-tight">{calculator.title}</h3>
              <p className="text-xs text-gray-600 flex-grow leading-tight">{calculator.description}</p>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

// Data - Featured Calculators (All Implemented)
const featuredCalculators: CalculatorCard[] = [
  {
    id: "401k",
    title: "401(k) Calculator",
    description: "Calculate your retirement savings potential with employer matching",
    icon: "account_balance",
    route: "/401k-calculator",
    category: "retirement",
    isImplemented: true
  },
  {
    id: "mortgage",
    title: "Mortgage Calculator",
    description: "Calculate monthly payments, interest, and total cost of your home loan",
    icon: "home",
    route: "/mortgage-calculator",
    category: "loan",
    isImplemented: true
  },
  {
    id: "tax",
    title: "US Federal Tax Calculator",
    description: "Calculate federal and state income tax for the current tax year",
    icon: "receipt_long",
    route: "/tax-calculator",
    category: "protection",
    isImplemented: true
  },
  {
    id: "student-loan",
    title: "Student Loan Calculator",
    description: "Plan repayment strategies for federal and private student loans",
    icon: "school",
    route: "/student-loan-calculator",
    category: "loan",
    isImplemented: true
  },
  {
    id: "roth-ira",
    title: "Roth IRA Calculator",
    description: "Calculate tax-free growth potential of your Roth IRA contributions",
    icon: "savings",
    route: "/roth-ira-calculator",
    category: "retirement",
    isImplemented: true
  }
];

// ============ IMPLEMENTED CALCULATORS FIRST ============
const implementedCalculators: CalculatorCard[] = [
  // Featured Calculators (All Implemented)
  ...featuredCalculators,
  
  // Investment Calculators (Implemented)
  {
    id: "compound-interest",
    title: "Compound Interest Calculator",
    description: "Calculate interest earned on both principal and accumulated interest",
    icon: "trending_up",
    route: "/compound-interest-calculator",
    category: "investment",
    isImplemented: true
  },
  {
    id: "simple-interest",
    title: "Simple Interest Calculator",
    description: "Calculate interest earned on principal amount without compounding",
    icon: "percent",
    route: "/simple-interest-calculator",
    category: "investment",
    isImplemented: true
  },
  {
    id: "cagr",
    title: "CAGR Calculator",
    description: "Calculate Compound Annual Growth Rate for your investments",
    icon: "show_chart",
    route: "/cagr-calculator",
    category: "investment",
    isImplemented: true
  },
  {
    id: "lumpsum",
    title: "Lump Sum Investment Calculator",
    description: "Calculate the future value of your one-time investments",
    icon: "money",
    route: "/lumpsum-calculator",
    category: "investment",
    isImplemented: true
  },
  {
    id: "dollar-cost-averaging",
    title: "Dollar Cost Averaging Calculator",
    description: "Calculate returns from regular periodic investments",
    icon: "trending_up",
    route: "/dca-calculator",
    category: "investment",
    isImplemented: true
  },
  {
    id: "real-estate",
    title: "Real Estate Investment Calculator",
    description: "Analyze real estate investment potential with comprehensive ROI calculations",
    icon: "home_work",
    route: "/real-estate-calculator",
    category: "investment",
    isImplemented: true
  },
  {
    id: "currency-converter",
    title: "Currency Converter",
    description: "Convert currencies with real-time exchange rates for international transactions",
    icon: "currency_exchange",
    route: "/currency-converter",
    category: "investment",
    isImplemented: true
  },


  // Loan Calculators (Implemented)
  {
    id: "emi",
    title: "EMI Calculator",
    description: "Calculate EMI, total interest and payments for any loan",
    icon: "payments",
    route: "/emi-calculator",
    category: "loan",
    isImplemented: true
  },
  {
    id: "auto-loan",
    title: "Auto Loan Calculator",
    description: "Calculate monthly car loan payments with taxes, fees, and trade-in value",
    icon: "directions_car",
    route: "/auto-loan-calculator",
    category: "loan",
    isImplemented: true
  },
  {
    id: "personal-loan",
    title: "Personal Loan Calculator",
    description: "Plan repayment strategies for unsecured personal loans",
    icon: "payments",
    route: "/personal-loan-calculator",
    category: "loan",
    isImplemented: true
  },
  {
    id: "debt-consolidation",
    title: "Debt Consolidation Calculator",
    description: "Compare consolidating multiple debts into one payment",
    icon: "merge",
    route: "/debt-consolidation-calculator",
    category: "loan",
    isImplemented: true
  },
  {
    id: "credit-card-payoff",
    title: "Credit Card Payoff Calculator",
    description: "Develop strategies to pay off credit card debt faster",
    icon: "credit_card",
    route: "/credit-card-payoff-calculator",
    category: "loan",
    isImplemented: true
  },
  {
    id: "loan-prepayment",
    title: "Loan Prepayment Calculator",
    description: "Calculate savings from extra loan payments and early payoff strategies",
    icon: "payment",
    route: "/loan-prepayment-calculator",
    category: "loan",
    isImplemented: true
  },
  {
    id: "refinance",
    title: "Refinance Calculator",
    description: "Analyze if refinancing your mortgage will save money",
    icon: "refresh",
    route: "/refinance-calculator",
    category: "loan",
    isImplemented: true
  },

  // Savings Calculators (Implemented)
  {
    id: "cd",
    title: "Certificate of Deposit (CD) Calculator",
    description: "Lock your money. Watch it grow. FDIC-insured savings with guaranteed rates",
    icon: "account_balance",
    route: "/cd-calculator",
    category: "savings",
    isImplemented: true
  },
  {
    id: "529",
    title: "529 Education Savings Plan Calculator",
    description: "Plan for your child's education expenses with tax-advantaged 529 savings",
    icon: "school",
    route: "/529-calculator",
    category: "savings",
    isImplemented: true
  },

  {
    id: "rent-vs-buy",
    title: "Rent vs Buy Home Calculator",
    description: "Compare the financial impact of renting versus buying a home",
    icon: "house",
    route: "/rent-vs-buy-calculator",
    category: "savings",
    isImplemented: true
  },



  // Retirement Calculators (Implemented)
  {
    id: "traditional-ira",
    title: "Traditional IRA Calculator",
    description: "Calculate tax-deferred growth of traditional IRA contributions",
    icon: "account_balance",
    route: "/traditional-ira-calculator",
    category: "retirement",
    isImplemented: true
  },
  {
    id: "retirement-planning",
    title: "Retirement Planning Calculator", 
    description: "Plan your retirement corpus and monthly savings needed",
    icon: "elderly",
    route: "/retirement-calculator",
    category: "retirement",
    isImplemented: true
  },
  {
    id: "social-security",
    title: "Social Security Benefits Calculator",
    description: "Estimate your monthly Social Security income with comprehensive analysis",
    icon: "elderly",
    route: "/social-security-calculator",
    category: "retirement",
    isImplemented: true
  },
  {
    id: "retirement-drawdown",
    title: "Retirement Drawdown Calculator",
    description: "Plan systematic withdrawals from retirement accounts with Social Security integration and tax-efficient strategies",
    icon: "timeline",
    route: "/retirement-drawdown-calculator",
    category: "retirement",
    isImplemented: true
  },

  // Protection & Tax Calculators (Implemented)
  {
    id: "capital-gains-tax",
    title: "Capital Gains Tax Calculator",
    description: "Calculate federal and state capital gains tax on investment sales",
    icon: "receipt_long",
    route: "/capital-gains-tax-calculator",
    category: "protection",
    isImplemented: true
  },
  {
    id: "tax-loss-harvesting",
    title: "Tax Loss Harvesting Calculator",
    description: "Calculate potential tax savings by harvesting investment losses",
    icon: "trending_down",
    route: "/tax-loss-harvesting-calculator",
    category: "protection",
    isImplemented: true
  },
  {
    id: "hsa",
    title: "HSA Calculator",
    description: "Calculate the triple tax advantage of Health Savings Accounts",
    icon: "local_hospital",
    route: "/hsa-calculator",
    category: "protection",
    isImplemented: true
  },
  {
    id: "life-insurance",
    title: "Life Insurance Calculator",
    description: "Calculate life insurance coverage needs and estimate premiums",
    icon: "security",
    route: "/life-insurance-calculator",
    category: "protection",
    isImplemented: true
  },
  {
    id: "term-insurance",
    title: "Term Insurance Calculator",
    description: "Calculate term life insurance premiums and compare coverage options",
    icon: "shield",
    route: "/term-insurance-calculator",
    category: "protection",
    isImplemented: true
  },
  {
    id: "payroll-tax",
    title: "Payroll Tax Calculator",
    description: "Calculate federal, state, and payroll taxes withheld from your paycheck",
    icon: "users",
    route: "/payroll-tax-calculator",
    category: "protection",
    isImplemented: true
  },
  
  // New Implemented Calculators
  {
    id: "net-worth",
    title: "Net Worth Calculator",
    description: "Track your total assets and liabilities to calculate net worth",
    icon: "account_balance_wallet",
    route: "/net-worth-calculator",
    category: "investment",
    isImplemented: true
  },
  {
    id: "stock-average",
    title: "Stock Average Calculator",
    description: "Calculate average purchase price when buying stocks in multiple lots",
    icon: "candlestick_chart",
    route: "/stock-average-calculator",
    category: "investment",
    isImplemented: true
  },

  {
    id: "etf",
    title: "ETF Calculator",
    description: "Compare ETF investments with different expense ratios",
    icon: "analytics",
    route: "/etf-calculator",
    category: "investment",
    isImplemented: true
  },
  {
    id: "savings",
    title: "Savings Calculator",
    description: "Calculate savings account growth with compound interest and regular deposits",
    icon: "savings",
    route: "/savings-calculator",
    category: "savings",
    isImplemented: true
  },
  {
    id: "money-market",
    title: "Money Market Calculator",
    description: "Calculate money market account returns with tiered interest rates",
    icon: "trending_up",
    route: "/money-market-calculator",
    category: "savings",
    isImplemented: true
  },
  {
    id: "brokerage",
    title: "Brokerage & Trading Fees Calculator",
    description: "Calculate brokerage fees and taxes for US stock trades",
    icon: "paid",
    route: "/brokerage-fees-calculator",
    category: "investment",
    isImplemented: true
  },
  {
    id: "mutual-fund",
    title: "Mutual Fund Calculator",
    description: "Calculate returns from mutual fund investments with expense ratios",
    icon: "pie_chart",
    route: "/mutual-fund-calculator",
    category: "investment",
    isImplemented: true
  },
  {
    id: "money-saving-challenge",
    title: "Money-Saving Challenge Generator",
    description: "Discover fun and creative ways to save money with personalized challenges",
    icon: "star",
    route: "/money-saving-challenge-generator",
    category: "savings",
    isImplemented: true
  }
];

// ============ NON-IMPLEMENTED CALCULATORS (Coming Soon) ============
const nonImplementedCalculators: CalculatorCard[] = [
  // All calculators are now implemented!
];

const calculators: CalculatorCard[] = [
  ...implementedCalculators,
  ...nonImplementedCalculators
];
