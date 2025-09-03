import { TabPills, TabItem } from "../components/ui/tab-pills";
import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useToast } from "../hooks/use-toast";

// Yes Bank FD interest rates (as of Apr 2023)
const yesBank = {
  bankName: "Yes Bank",
  // Regular FD rates
  regularRates: [
    { tenure: "7-14 days", rate: 3.25 },
    { tenure: "15-45 days", rate: 3.70 },
    { tenure: "46-90 days", rate: 4.10 },
    { tenure: "91-180 days", rate: 4.75 },
    { tenure: "181-271 days", rate: 5.75 },
    { tenure: "272 days to < 1 year", rate: 6.00 },
    { tenure: "1 year to < 18 months", rate: 7.00 },
    { tenure: "18 months to < 3 years", rate: 7.25 },
    { tenure: "3 years to 10 years", rate: 7.25 }
  ],
  // Senior citizen FD rates (additional 0.5% over regular rates)
  seniorRates: [
    { tenure: "7-14 days", rate: 3.75 },
    { tenure: "15-45 days", rate: 4.20 },
    { tenure: "46-90 days", rate: 4.60 },
    { tenure: "91-180 days", rate: 5.25 },
    { tenure: "181-271 days", rate: 6.25 },
    { tenure: "272 days to < 1 year", rate: 6.50 },
    { tenure: "1 year to < 18 months", rate: 7.50 },
    { tenure: "18 months to < 3 years", rate: 7.75 },
    { tenure: "3 years to 10 years", rate: 7.75 }
  ],
  // Minimum and maximum investment amounts
  minInvestment: 10000,
  maxInvestment: 20000000,
  // Minimum and maximum tenure in days
  minTenure: 7,
  maxTenure: 3650 // 10 years
};

// Define tax slab rates
const taxSlabs = [
  { max: 250000, rate: 0 },
  { max: 500000, rate: 5 },
  { max: 750000, rate: 10 },
  { max: 1000000, rate: 15 },
  { max: 1250000, rate: 20 },
  { max: 1500000, rate: 25 },
  { max: Infinity, rate: 30 }
];

// Function to calculate applicable tax rate based on income
const calculateTaxRate = (annualIncome: number) => {
  for (const slab of taxSlabs) {
    if (annualIncome <= slab.max) {
      return slab.rate;
    }
  }
  return 30; // Highest slab
};

// Function to get interest rate based on tenure (in days)
const getInterestRate = (tenureDays: number, isSenior: boolean) => {
  const rates = isSenior ? yesBank.seniorRates : yesBank.regularRates;
  
  if (tenureDays < 7) return 0;
  if (tenureDays >= 7 && tenureDays <= 14) return rates[0].rate;
  if (tenureDays >= 15 && tenureDays <= 45) return rates[1].rate;
  if (tenureDays >= 46 && tenureDays <= 90) return rates[2].rate;
  if (tenureDays >= 91 && tenureDays <= 180) return rates[3].rate;
  if (tenureDays >= 181 && tenureDays <= 271) return rates[4].rate;
  if (tenureDays >= 272 && tenureDays < 365) return rates[5].rate;
  if (tenureDays >= 365 && tenureDays < 545) return rates[6].rate; // 1 year to < 18 months
  if (tenureDays >= 545 && tenureDays < 1095) return rates[7].rate; // 18 months to < 3 years
  return rates[8].rate; // 3 years to 10 years
};

// Convert years, months, days to total days
const getTotalDays = (years: number, months: number, days: number) => {
  return years * 365 + months * 30 + days;
};

// Function to calculate maturity amount for simple interest
const calculateSimpleInterest = (principal: number, rate: number, days: number) => {
  const interest = (principal * rate * days) / (100 * 365);
  return principal + interest;
};

// Function to calculate maturity amount for compound interest
const calculateCompoundInterest = (principal: number, rate: number, days: number, frequency: string) => {
  let n = 1; // compounds per year
  
  if (frequency === "quarterly") {
    n = 4;
  } else if (frequency === "monthly") {
    n = 12;
  } else if (frequency === "daily") {
    n = 365;
  }
  
  const t = days / 365; // time in years
  const r = rate / 100; // rate in decimal
  
  // Compound interest formula: P(1 + r/n)^(nt)
  const maturityAmount = principal * Math.pow(1 + (r / n), n * t);
  return maturityAmount;
};

export default function YesBankFDCalculator() {
  const { toast } = useToast();
  
  // Form input states
  const [principalAmount, setPrincipalAmount] = useState<number>(100000);
  const [tenureYears, setTenureYears] = useState<number>(1);
  const [tenureMonths, setTenureMonths] = useState<number>(0);
  const [tenureDays, setTenureDays] = useState<number>(0);
  const [isSeniorCitizen, setIsSeniorCitizen] = useState<boolean>(false);
  const [interestPayout, setInterestPayout] = useState<string>("maturity");
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>("quarterly");
  const [taxSlab, setTaxSlab] = useState<number>(30);
  
  // Calculation states
  const [interestRate, setInterestRate] = useState<number>(0);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [postTaxReturn, setPostTaxReturn] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("calculator");
  
  // Recalculate when inputs change
  useEffect(() => {
    calculateResults();
  }, [
    principalAmount, 
    tenureYears, 
    tenureMonths, 
    tenureDays, 
    isSeniorCitizen, 
    interestPayout, 
    compoundingFrequency, 
    taxSlab
  ]);
  
  // Calculate FD results
  const calculateResults = () => {
    // Validate inputs
    if (principalAmount < yesBank.minInvestment) {
      toast({
        title: "Invalid Amount",
        description: `Minimum investment amount is ₹${yesBank.minInvestment.toLocaleString()}`,
        variant: "destructive",
      });
      return;
    }
    
    if (principalAmount > yesBank.maxInvestment) {
      toast({
        title: "Invalid Amount",
        description: `Maximum investment amount is ₹${yesBank.maxInvestment.toLocaleString()}`,
        variant: "destructive",
      });
      return;
    }
    
    // Calculate total days
    const totalDays = getTotalDays(tenureYears, tenureMonths, tenureDays);
    
    if (totalDays < yesBank.minTenure) {
      toast({
        title: "Invalid Tenure",
        description: `Minimum tenure is ${yesBank.minTenure} days`,
        variant: "destructive",
      });
      return;
    }
    
    if (totalDays > yesBank.maxTenure) {
      toast({
        title: "Invalid Tenure",
        description: `Maximum tenure is ${yesBank.maxTenure} days (10 years)`,
        variant: "destructive",
      });
      return;
    }
    
    // Get interest rate
    const rate = getInterestRate(totalDays, isSeniorCitizen);
    setInterestRate(rate);
    
    // Calculate maturity amount based on interest payout option
    let maturity = 0;
    
    if (interestPayout === "maturity") {
      // For lump sum at maturity, using compound interest
      maturity = calculateCompoundInterest(principalAmount, rate, totalDays, compoundingFrequency);
    } else {
      // For regular payouts (simple interest)
      maturity = calculateSimpleInterest(principalAmount, rate, totalDays);
    }
    
    const interest = maturity - principalAmount;
    
    // Calculate tax on interest
    const tax = (interest * taxSlab) / 100;
    
    setMaturityAmount(maturity);
    setTotalInterest(interest);
    setTaxAmount(tax);
    setPostTaxReturn(maturity - tax);
  };
  
  // Format currency for display
  const formatCurrency = (amount: number) => {
    return "₹" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };
  
  // Generate range for tenure dropdown options
  const yearOptions = [...Array(10)].map((_, i) => i + 1);
  const monthOptions = [...Array(12)].map((_, i) => i);
  const dayOptions = [...Array(31)].map((_, i) => i);
  
  return (
    <div className="px-4 py-3">
      <div className="flex items-center mb-4">
        <button 
          onClick={() => window.history.back()}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <h2 className="text-xl font-semibold">Yes Bank FD Calculator</h2>
      </div>
      
      <Tabs defaultValue="calculator" onValueChange={setActiveTab}>
        <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-transparent p-0 border-0 w-full">
          <TabsTrigger value="calculator" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Calculator</TabsTrigger>
          <TabsTrigger value="rates" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Interest Rates</TabsTrigger>
          <TabsTrigger value="compare" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Compare Banks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="mt-4 space-y-4">
          <Card>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {/* Principal Amount */}
                <div>
                  <Label htmlFor="principal-amount">Investment Amount (₹)</Label>
                  <Input
                    id="principal-amount"
                    type="number"
                    min={yesBank.minInvestment}
                    max={yesBank.maxInvestment}
                    value={principalAmount}
                    onChange={(e) => setPrincipalAmount(Number(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Min: ₹{yesBank.minInvestment.toLocaleString()} | Max: ₹{yesBank.maxInvestment.toLocaleString()}</p>
                </div>
                
                {/* Tenure */}
                <div>
                  <Label>Tenure</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <div>
                      <Label htmlFor="tenure-years" className="text-xs">Years</Label>
                      <select
                        id="tenure-years"
                        value={tenureYears}
                        onChange={(e) => setTenureYears(Number(e.target.value))}
                        className="w-full p-2 border rounded"
                      >
                        {yearOptions.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="tenure-months" className="text-xs">Months</Label>
                      <select
                        id="tenure-months"
                        value={tenureMonths}
                        onChange={(e) => setTenureMonths(Number(e.target.value))}
                        className="w-full p-2 border rounded"
                      >
                        {monthOptions.map((month) => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="tenure-days" className="text-xs">Days</Label>
                      <select
                        id="tenure-days"
                        value={tenureDays}
                        onChange={(e) => setTenureDays(Number(e.target.value))}
                        className="w-full p-2 border rounded"
                      >
                        {dayOptions.map((day) => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Senior Citizen */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="senior-citizen"
                    checked={isSeniorCitizen}
                    onCheckedChange={setIsSeniorCitizen}
                  />
                  <Label htmlFor="senior-citizen">Senior Citizen (60+ years)</Label>
                </div>
                
                {/* Interest Payout */}
                <div>
                  <Label className="mb-2 block">Interest Payout</Label>
                  <RadioGroup 
                    value={interestPayout} 
                    onValueChange={setInterestPayout}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maturity" id="payout-maturity" />
                      <Label htmlFor="payout-maturity">At Maturity (Cumulative)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="payout-monthly" />
                      <Label htmlFor="payout-monthly">Monthly Payout (Non-Cumulative)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="quarterly" id="payout-quarterly" />
                      <Label htmlFor="payout-quarterly">Quarterly Payout (Non-Cumulative)</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Compounding Frequency (only if cumulative) */}
                {interestPayout === "maturity" && (
                  <div>
                    <Label className="mb-2 block">Compounding Frequency</Label>
                    <RadioGroup 
                      value={compoundingFrequency} 
                      onValueChange={setCompoundingFrequency}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="quarterly" id="compound-quarterly" />
                        <Label htmlFor="compound-quarterly">Quarterly</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="compound-monthly" />
                        <Label htmlFor="compound-monthly">Monthly</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
                
                {/* Tax Slab */}
                <div>
                  <Label htmlFor="tax-slab" className="mb-2 block">Your Tax Slab</Label>
                  <select
                    id="tax-slab"
                    value={taxSlab}
                    onChange={(e) => setTaxSlab(Number(e.target.value))}
                    className="w-full p-2 border rounded"
                  >
                    <option value={0}>No Tax (0%)</option>
                    <option value={5}>5% (₹2.5L - ₹5L)</option>
                    <option value={10}>10% (₹5L - ₹7.5L)</option>
                    <option value={15}>15% (₹7.5L - ₹10L)</option>
                    <option value={20}>20% (₹10L - ₹12.5L)</option>
                    <option value={25}>25% (₹12.5L - ₹15L)</option>
                    <option value={30}>30% (Above ₹15L)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Results */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-base font-medium mb-3">Fixed Deposit Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Bank</span>
                  <span className="font-medium">Yes Bank</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Interest Rate</span>
                  <span className="font-medium">{interestRate.toFixed(2)}% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Investment Amount</span>
                  <span className="font-medium">{formatCurrency(principalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Interest Earned</span>
                  <span className="font-medium text-green-600">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tax on Interest</span>
                  <span className="font-medium text-red-600">{formatCurrency(taxAmount)}</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between">
                  <span className="text-sm font-medium">Maturity Amount</span>
                  <span className="font-bold text-primary">{formatCurrency(maturityAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Post-Tax Return</span>
                  <span className="font-bold">{formatCurrency(postTaxReturn)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="text-base font-medium mb-3">Features of Yes Bank FD</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="material-icons text-primary mr-2">check_circle</span>
                  <div>
                    <p className="text-sm font-medium">Higher Senior Citizen Rates</p>
                    <p className="text-xs text-gray-500">Additional 0.50% interest for senior citizens across all tenures</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="material-icons text-primary mr-2">check_circle</span>
                  <div>
                    <p className="text-sm font-medium">Flexible Tenure Options</p>
                    <p className="text-xs text-gray-500">Choose from 7 days to 10 years for your fixed deposit</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="material-icons text-primary mr-2">check_circle</span>
                  <div>
                    <p className="text-sm font-medium">Multiple Payout Options</p>
                    <p className="text-xs text-gray-500">Choose from monthly, quarterly, or at maturity interest payouts</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="material-icons text-primary mr-2">check_circle</span>
                  <div>
                    <p className="text-sm font-medium">Premature Withdrawal</p>
                    <p className="text-xs text-gray-500">Option to withdraw before maturity with applicable penalty</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="material-icons text-primary mr-2">check_circle</span>
                  <div>
                    <p className="text-sm font-medium">Loan Against FD</p>
                    <p className="text-xs text-gray-500">Get up to 90% of your FD value as a loan</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rates" className="mt-4 space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-base font-medium mb-3">Yes Bank FD Interest Rates</h3>
              <p className="text-xs text-gray-500 mb-4">Effective as of April 2023</p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border p-2 text-left text-xs font-medium">Tenure</th>
                      <th className="border p-2 text-left text-xs font-medium">Regular Rate (p.a.)</th>
                      <th className="border p-2 text-left text-xs font-medium">Senior Citizen Rate (p.a.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yesBank.regularRates.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border p-2 text-xs">{item.tenure}</td>
                        <td className="border p-2 text-xs">{item.rate}%</td>
                        <td className="border p-2 text-xs">{yesBank.seniorRates[index].rate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4">
                <p className="text-xs text-gray-500">* Rates are subject to change. Please check Yes Bank's official website for the latest rates.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="text-base font-medium mb-3">Fixed Deposit Terms & Conditions</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="material-icons text-gray-500 mr-2 text-sm">info</span>
                  <div>
                    <p className="text-sm font-medium">Minimum Investment</p>
                    <p className="text-xs text-gray-500">₹10,000 for fixed deposits</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="material-icons text-gray-500 mr-2 text-sm">info</span>
                  <div>
                    <p className="text-sm font-medium">Premature Withdrawal Penalty</p>
                    <p className="text-xs text-gray-500">1% reduction in applicable interest rate</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="material-icons text-gray-500 mr-2 text-sm">info</span>
                  <div>
                    <p className="text-sm font-medium">TDS Applicability</p>
                    <p className="text-xs text-gray-500">TDS is deducted @ 10% if interest earned exceeds ₹40,000 (₹50,000 for senior citizens) in a financial year</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="material-icons text-gray-500 mr-2 text-sm">info</span>
                  <div>
                    <p className="text-sm font-medium">Auto-Renewal Facility</p>
                    <p className="text-xs text-gray-500">Option to auto-renew your FD at maturity for the same tenure</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compare" className="mt-4 space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-base font-medium mb-3">Compare Yes Bank FD with Other Banks</h3>
              <p className="text-xs text-gray-500 mb-4">1-year FD rates comparison (Regular customers)</p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border p-2 text-left text-xs font-medium">Bank</th>
                      <th className="border p-2 text-left text-xs font-medium">Interest Rate (p.a.)</th>
                      <th className="border p-2 text-left text-xs font-medium">Min. Investment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-primary bg-opacity-5">
                      <td className="border p-2 text-xs font-medium">Yes Bank</td>
                      <td className="border p-2 text-xs">7.00%</td>
                      <td className="border p-2 text-xs">₹10,000</td>
                    </tr>
                    <tr>
                      <td className="border p-2 text-xs">SBI</td>
                      <td className="border p-2 text-xs">6.80%</td>
                      <td className="border p-2 text-xs">₹1,000</td>
                    </tr>
                    <tr>
                      <td className="border p-2 text-xs">HDFC Bank</td>
                      <td className="border p-2 text-xs">6.60%</td>
                      <td className="border p-2 text-xs">₹5,000</td>
                    </tr>
                    <tr>
                      <td className="border p-2 text-xs">ICICI Bank</td>
                      <td className="border p-2 text-xs">6.70%</td>
                      <td className="border p-2 text-xs">₹10,000</td>
                    </tr>
                    <tr>
                      <td className="border p-2 text-xs">Axis Bank</td>
                      <td className="border p-2 text-xs">6.75%</td>
                      <td className="border p-2 text-xs">₹5,000</td>
                    </tr>
                    <tr>
                      <td className="border p-2 text-xs">Kotak Mahindra Bank</td>
                      <td className="border p-2 text-xs">7.00%</td>
                      <td className="border p-2 text-xs">₹5,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4">
                <p className="text-xs text-gray-500">* Rates are indicative and subject to change. Please check respective bank websites for the latest rates.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="text-base font-medium mb-3">Advantages of Yes Bank FD</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="material-icons text-primary mr-2">trending_up</span>
                  <div>
                    <p className="text-sm font-medium">Competitive Interest Rates</p>
                    <p className="text-xs text-gray-500">Yes Bank offers one of the highest FD interest rates among private banks</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="material-icons text-primary mr-2">account_balance</span>
                  <div>
                    <p className="text-sm font-medium">Safety and Security</p>
                    <p className="text-xs text-gray-500">Deposits up to ₹5 lakhs are insured by DICGC</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="material-icons text-primary mr-2">phonelink</span>
                  <div>
                    <p className="text-sm font-medium">Digital Banking Features</p>
                    <p className="text-xs text-gray-500">Easily manage your FD through Yes Bank's mobile and net banking</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}