import React, { useState, useEffect, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useBudget } from "../../contexts/BudgetContext";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { format } from "date-fns";
import { useToast } from "../../hooks/use-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import axios from "axios";
import { 
  AlertCircle, Upload, CreditCard, MessageSquare, FileText, 
  Smartphone, BarChart2, PieChart, ArrowUpCircle, ArrowDownCircle, 
  Calendar, Filter, Tag, TrendingUp, ShoppingBag, Home, Utensils,
  Car, Coffee, ShoppingCart, DollarSign, PlusCircle
} from "lucide-react";
// Removed Account Aggregator imports for cleaner UI
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line
} from "recharts";

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  source: "bank" | "credit";
  status: "credited" | "debited" | "pending";
}

// No initial mock data - transactions will come from SMS tracking, receipt uploads, and credit card entries only
const initialTransactions: any[] = [];

// Define colors for categories
const CATEGORY_COLORS: Record<string, string> = {
  "Groceries": "#4CAF50",
  "Rent/Home EMI": "#3F51B5",
  "Utilities": "#673AB7",
  "House Help Salary": "#9C27B0",
  "Milk/Daily Essentials": "#8BC34A",
  "Transportation": "#FF9800",
  "Insurance": "#607D8B",
  "Childcare": "#E91E63",
  "Healthcare": "#F44336",
  "Medication": "#9E9E9E",
  "Dining": "#FF5722",
  "Entertainment": "#00BCD4",
  "Shopping": "#FFEB3B",
  "Personal Care": "#795548",
  "Travel": "#009688",
  "Fitness": "#CDDC39",
  "Gifts": "#FFC107",
  "Education": "#03A9F4",
  "Loans": "#2196F3",
  "Investments": "#3F51B5",
  "Donations": "#9C27B0",
  "Subscriptions": "#00BCD4",
  "Other": "#9E9E9E",
  "Income": "#4CAF50",
  "Payment": "#FF9800",
  "Credit Card": "#F44336",
  "Investment": "#2196F3"
};

// Helper function to get category icon
const getCategoryIcon = (category: string) => {
  switch(category) {
    case "Groceries": return <ShoppingCart className="w-4 h-4" />;
    case "Rent/Home EMI": return <Home className="w-4 h-4" />;
    case "Utilities": return <AlertCircle className="w-4 h-4" />;
    case "Transportation": return <Car className="w-4 h-4" />;
    case "Dining": return <Utensils className="w-4 h-4" />;
    case "Entertainment": return <Coffee className="w-4 h-4" />;
    case "Shopping": return <ShoppingBag className="w-4 h-4" />;
    case "Investments": 
    case "Investment": return <TrendingUp className="w-4 h-4" />;
    case "Credit Card": return <CreditCard className="w-4 h-4" />;
    case "Income": return <ArrowUpCircle className="w-4 h-4" />;
    default: return <Tag className="w-4 h-4" />;
  }
};

const SpendingInsights = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [filter, setFilter] = useState<"all" | "bank" | "credit">("all");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [visibleChartType, setVisibleChartType] = useState<"pie" | "bar" | "month">("pie");
  const { addDailyExpense, budgetData } = useBudget();
  const { toast } = useToast();
  
  // Function to save transaction to the server
  const saveTransactionToServer = async (transaction: Transaction) => {
    try {
      // Prepare transaction data for the server (convert date to ISO string)
      const transactionData = {
        ...transaction,
        date: transaction.date instanceof Date ? transaction.date.toISOString() : transaction.date,
        type: transaction.status === "credited" ? "income" : "expense"
      };
      
      // Send to server
      const response = await axios.post('/api/transactions', transactionData);
      
      // Return the saved transaction
      return {
        ...response.data.transaction,
        // Convert date string back to Date object
        date: new Date(response.data.transaction.date)
      };
    } catch (error) {
      console.error("Error saving transaction:", error);
      throw error;
    }
  };
  
  // Function to load transactions from the server
  const loadTransactionsFromServer = async () => {
    try {
      const response = await axios.get('/api/transactions');
      
      if (response.data && response.data.success && Array.isArray(response.data.transactions)) {
        // Convert date strings to Date objects
        const transactions = response.data.transactions.map((transaction: any) => ({
          ...transaction,
          date: new Date(transaction.date)
        }));
        
        setTransactions(transactions);
      } else {
        console.warn("Unexpected response format:", response.data);
        toast({
          title: "Data Format Issue",
          description: "Received unexpected data format from server.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error loading transactions:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast({
          title: "Authentication Required",
          description: "Please log in to view your transaction data.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error Loading Transactions",
          description: "Could not load your transaction data from the server.",
          variant: "destructive"
        });
      }
    }
  };
  
  const filteredTransactions = transactions.filter(transaction => {
    if (filter === "all") return true;
    return transaction.source === filter;
  }).sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date, newest first

  const getTotalAmount = (source: "bank" | "credit" | "all", status: "credited" | "debited") => {
    return transactions
      .filter(t => (source === "all" || t.source === source) && t.status === status)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  };

  const bankCredits = getTotalAmount("bank", "credited");
  const bankDebits = getTotalAmount("bank", "debited");
  const creditCardSpending = getTotalAmount("credit", "debited");
  
  // Group transactions by category
  const getCategoryAmounts = () => {
    const categoryData: Record<string, { total: number, count: number }> = {};
    
    // Only include debited transactions for category analysis
    const debitedTransactions = transactions.filter(t => t.status === "debited");
    
    debitedTransactions.forEach(transaction => {
      if (!categoryData[transaction.category]) {
        categoryData[transaction.category] = { total: 0, count: 0 };
      }
      categoryData[transaction.category].total += transaction.amount;
      categoryData[transaction.category].count += 1;
    });
    
    return Object.entries(categoryData).map(([category, data]) => ({
      category,
      amount: data.total,
      count: data.count
    })).sort((a, b) => b.amount - a.amount);
  };
  
  // Process transactions for monthly spending trends
  const getMonthlySpendingData = () => {
    const monthlyData: Record<string, { total: number, count: number }> = {};
    
    // Only include debited transactions for monthly analysis
    const debitedTransactions = transactions.filter(t => t.status === "debited");
    
    debitedTransactions.forEach(transaction => {
      const month = format(transaction.date, 'MMM yyyy');
      
      if (!monthlyData[month]) {
        monthlyData[month] = { total: 0, count: 0 };
      }
      monthlyData[month].total += transaction.amount;
      monthlyData[month].count += 1;
    });
    
    return Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        total: data.total,
        count: data.count
      }))
      .sort((a, b) => {
        // Sort by date (recent months first)
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateB.getTime() - dateA.getTime();
      });
  };
  
  // Get transactions with monthly category breakdown
  const getMonthlyCategoryBreakdown = () => {
    const breakdown: Record<string, Record<string, number>> = {};
    
    // Only include debited transactions
    const debitedTransactions = transactions.filter(t => t.status === "debited");
    
    debitedTransactions.forEach(transaction => {
      const month = format(transaction.date, 'MMM yyyy');
      
      if (!breakdown[month]) {
        breakdown[month] = {};
      }
      
      if (!breakdown[month][transaction.category]) {
        breakdown[month][transaction.category] = 0;
      }
      
      breakdown[month][transaction.category] += transaction.amount;
    });
    
    // Convert to array format suitable for charts
    return Object.entries(breakdown).map(([month, categories]) => {
      return {
        month,
        ...categories
      };
    }).sort((a, b) => {
      // Sort by date (recent months first)
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateB.getTime() - dateA.getTime();
    });
  };
  
  // Get budget vs actual spending comparison
  const getBudgetVsActualComparison = () => {
    // Get actual spending by category
    const actualSpending: Record<string, number> = {};
    const debitedTransactions = transactions.filter(t => t.status === "debited");
    
    debitedTransactions.forEach(transaction => {
      if (!actualSpending[transaction.category]) {
        actualSpending[transaction.category] = 0;
      }
      actualSpending[transaction.category] += transaction.amount;
    });
    
    // Compare with budget data
    const budgetCategories = [
      ...budgetData.categories.Essential,
      ...budgetData.categories.Lifestyle,
      ...budgetData.categories.Financial,
      ...budgetData.categories.Others
    ];
    
    return budgetCategories.map(category => {
      const budgetAmount = budgetData.expenses[category] || 0;
      const actualAmount = actualSpending[category] || 0;
      
      return {
        category,
        budgeted: budgetAmount,
        actual: actualAmount,
        difference: budgetAmount - actualAmount,
        percentUsed: budgetAmount > 0 ? (actualAmount / budgetAmount) * 100 : 0
      };
    });
  };
  
  // Memoize data for better performance
  const categoryData = useMemo(() => getCategoryAmounts(), [transactions]);
  const monthlySpendingData = useMemo(() => getMonthlySpendingData(), [transactions]);
  const monthlyCategoryBreakdown = useMemo(() => getMonthlyCategoryBreakdown(), [transactions]);
  const budgetComparison = useMemo(() => getBudgetVsActualComparison(), [transactions, budgetData]);
  
  const handleAddToExpense = (transaction: Transaction) => {
    if (transaction.status === "debited") {
      addDailyExpense({
        date: transaction.date.toISOString(),
        category: transaction.category,
        item: transaction.description,
        amount: transaction.amount,
        note: `Added from ${transaction.source === "bank" ? "bank transaction" : "credit card"}`
      });
      
      // Show toast notification
      toast({
        title: "Added to Expense Tracker",
        description: `$${transaction.amount.toLocaleString()} for ${transaction.description}`,
      });
    }
  };

  // Format currency in Indian Rupees
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (date: Date) => {
    return format(date, 'dd MMM yyyy');
  };

  const [activeTab, setActiveTab] = useState("transactions");
  const [smsInput, setSmsInput] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Load transactions from server when component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        await loadTransactionsFromServer();
      } catch (error) {
        console.error("Error loading transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTransactions();
  }, []);
  
  // Helper function to categorize a transaction based on description
  const categorizeTransaction = (amount: number, description: string, source: "bank" | "credit") => {
    // List of keywords to help categorize transactions
    const categoryKeywords: Record<string, string[]> = {
      "Groceries": ["grocery", "grocer", "supermarket", "market", "kirana", "big basket", "bigbasket", "dmart", "d-mart", "reliance fresh", "nature's basket", "food", "vegetables"],
      "Dining": ["restaurant", "cafe", "food", "dining", "swiggy", "zomato", "uber eats", "ubereats", "foodpanda", "dine", "eat", "hotel", "bar", "pizza", "burger"],
      "Transportation": ["uber", "ola", "cab", "taxi", "auto", "metro", "bus", "train", "petrol", "fuel", "gas", "parking"],
      "Utilities": ["electricity", "power", "water", "gas", "bill", "utility", "utilities", "internet", "broadband", "wifi", "phone", "mobile", "recharge", "tata power", "adani", "bses", "bescom"],
      "Shopping": ["amazon", "flipkart", "myntra", "ajio", "nykaa", "clothing", "apparel", "mall", "shop", "store", "retail", "purchase"],
      "Entertainment": ["movie", "theatre", "netflix", "amazon prime", "hotstar", "disney", "subscription", "entertainment", "game", "sport", "bookmyshow", "ticket"],
      "Healthcare": ["doctor", "hospital", "medicine", "medical", "pharmacy", "clinic", "health", "apollo", "practo", "dentist"],
      "Insurance": ["insurance", "policy", "premium"],
      "Investment": ["investment", "mutual fund", "stock", "share", "zerodha", "upstox", "groww", "etmoney"]
    };
    
    // Normalized description for easier keyword matching
    const normalizedDesc = description.toLowerCase();
    
    // Try to match keywords to categories
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      for (const keyword of keywords) {
        if (normalizedDesc.includes(keyword.toLowerCase())) {
          return {
            id: Date.now().toString(),
            date: new Date(),
            description: description,
            amount: amount,
            category: category,
            source: source,
            status: "debited" as const
          };
        }
      }
    }
    
    // Default categorization based on some common patterns
    if (normalizedDesc.includes("upi")) {
      return {
        id: Date.now().toString(),
        date: new Date(),
        description: description,
        amount: amount,
        category: "Payment",
        source: source,
        status: "debited" as const
      };
    }
    
    if (source === "credit") {
      return {
        id: Date.now().toString(),
        date: new Date(),
        description: description,
        amount: amount,
        category: "Shopping", // Default credit card transaction to Shopping
        source: source,
        status: "debited" as const
      };
    }
    
    // Default fallback
    return {
      id: Date.now().toString(),
      date: new Date(),
      description: description,
      amount: amount,
      category: "Other",
      source: source,
      status: "debited" as const
    };
  };
  
  // Enhanced SMS parser function to handle multiple bank and credit card formats
  const parseSms = (smsText: string) => {
    // Normalize the SMS text
    const normalizedSms = smsText.replace(/\s+/g, ' ').trim();
    
    // Common patterns found in bank SMS messages
    const amountPatterns = [
      /(?:Rs\.?|INR)\s*([0-9,.]+)/i,                                  // Rs. 1,234.56 or INR 1234.56
      /([0-9,.]+)\s*(?:Rs\.?|INR)/i,                                  // 1,234.56 Rs. or 1234.56 INR
      /amount\s*(?:of|:)?\s*(?:Rs\.?|INR)?\s*([0-9,.]+)/i,            // Amount of Rs. 1,234.56
      /(?:spent|paid|debited|debit of|payment of)\s*(?:Rs\.?|INR)?\s*([0-9,.]+)/i  // Spent Rs. 1,234.56
    ];
    
    // Debit transaction patterns
    const debitPatterns = [
      // ICICI Bank specific format
      {
        regex: /ICICI Bank Acct.+debited for Rs\s*([0-9,.]+).*?(?:on\s+(\d{2}-[A-Za-z]{3}-\d{2})).*?([A-Za-z\s]+)\s+credited/i,
        process: (match: RegExpMatchArray) => {
          const amount = parseFloat(match[1].replace(/,/g, ''));
          const dateStr = match[2] || "";
          const beneficiary = match[3] || "Unknown Beneficiary";
          
          let transactionDate = new Date();
          // Try to parse the date if it exists
          if (dateStr) {
            try {
              const [day, month, year] = dateStr.split('-');
              const months = {"Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11};
              const fullYear = parseInt("20" + year);
              transactionDate = new Date(fullYear, months[month as keyof typeof months], parseInt(day));
            } catch (e) {
              console.log("Date parsing failed", e);
            }
          }
          
          return {
            id: Date.now().toString(),
            date: transactionDate,
            description: `Payment to ${beneficiary.trim()}`,
            amount: amount,
            category: "Payment",
            source: "bank" as const,
            status: "debited" as const
          };
        }
      },
      
      // HDFC Bank specific format
      {
        regex: /(?:HDFC|HDFC Bank)[^]* (?:has been debited|debited)[^]*(?:Rs\.|Rs|INR)\s*([0-9,.]+)[^]*(?:on|dated)\s+(\d{2}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{2}|\d{2}[A-Za-z]{3}\d{2})/i,
        process: (match: RegExpMatchArray) => {
          const amount = parseFloat(match[1].replace(/,/g, ''));
          let description = "HDFC Bank Payment";
          
          // Extract merchant if available
          if (normalizedSms.match(/(?:at|to|in)\s+([A-Za-z0-9\s]+)/i)) {
            const merchantMatch = normalizedSms.match(/(?:at|to|in)\s+([A-Za-z0-9\s]+)/i);
            if (merchantMatch && merchantMatch[1]) {
              description = merchantMatch[1].trim();
            }
          } else if (normalizedSms.includes("UPI")) {
            description = "UPI Payment";
          }
          
          return {
            id: Date.now().toString(),
            date: new Date(),
            description: description,
            amount: amount,
            category: "Payment",
            source: "bank" as const,
            status: "debited" as const
          };
        }
      },
      
      // SBI specific format
      {
        regex: /(?:SBI|State Bank of India).+(?:debited|withdrawn).+(?:Rs\.?|INR)\s*([0-9,.]+)/i,
        process: (match: RegExpMatchArray) => {
          const amount = parseFloat(match[1].replace(/,/g, ''));
          let description = "SBI Payment";
          
          // Extract transaction type
          if (normalizedSms.includes("ATM")) {
            description = "ATM Withdrawal";
          } else if (normalizedSms.includes("UPI")) {
            description = "UPI Payment";
          } else if (normalizedSms.includes("IMPS")) {
            description = "IMPS Transfer";
          } else if (normalizedSms.includes("NEFT")) {
            description = "NEFT Transfer";
          } else if (normalizedSms.includes("RTGS")) {
            description = "RTGS Transfer";
          }
          
          return {
            id: Date.now().toString(),
            date: new Date(),
            description: description,
            amount: amount,
            category: "Payment",
            source: "bank" as const,
            status: "debited" as const
          };
        }
      },
      
      // Axis Bank specific format
      {
        regex: /(?:Axis Bank|Axis).+(?:debited|debit).+(?:Rs\.?|INR)\s*([0-9,.]+)/i,
        process: (match: RegExpMatchArray) => {
          const amount = parseFloat(match[1].replace(/,/g, ''));
          
          return {
            id: Date.now().toString(),
            date: new Date(),
            description: normalizedSms.includes("UPI") ? "UPI Payment" : "Axis Bank Payment",
            amount: amount,
            category: "Payment",
            source: "bank" as const,
            status: "debited" as const
          };
        }
      },
      
      // General account debit format
      {
        regex: /(?:acct|account|a\/c).+(?:debited|debit|paid|spent).+(?:Rs\.?|INR)\s*([0-9,.]+)/i,
        process: (match: RegExpMatchArray) => {
          const amount = parseFloat(match[1].replace(/,/g, ''));
          let description = "Bank Payment";
          
          // Try to extract recipient or purpose if available
          if (normalizedSms.includes("UPI")) {
            description = "UPI Payment";
            
            // Try to extract UPI ID
            const upiMatch = normalizedSms.match(/UPI:?\s*([A-Za-z0-9.@]+)/i);
            if (upiMatch && upiMatch[1]) {
              description = `UPI Payment (${upiMatch[1]})`;
            }
          } else if (normalizedSms.match(/to\s+([A-Za-z\s]+)/i)) {
            const recipientMatch = normalizedSms.match(/to\s+([A-Za-z\s]+)/i);
            if (recipientMatch && recipientMatch[1]) {
              description = `Payment to ${recipientMatch[1].trim()}`;
            }
          }
          
          return {
            id: Date.now().toString(),
            date: new Date(),
            description: description,
            amount: amount,
            category: "Payment",
            source: "bank" as const,
            status: "debited" as const
          };
        }
      }
    ];
    
    // Credit card transaction patterns
    const creditCardPatterns = [
      // HDFC Credit Card format
      {
        regex: /(?:HDFC|HDFC Bank).+Credit Card.+(?:spent|debited|txn|transaction of)\s*(?:Rs\.?|INR)\s*([0-9,.]+)\s*(?:at|in|on)\s*([A-Za-z0-9\s]+)/i,
        process: (match: RegExpMatchArray) => {
          const amount = parseFloat(match[1].replace(/,/g, ''));
          const merchant = match[2] || "Unknown Merchant";
          
          return categorizeTransaction(amount, merchant, "credit");
        }
      },
      
      // ICICI Credit Card format
      {
        regex: /(?:ICICI|ICICI Bank).+Credit Card.+(?:spent|debited|spent|transaction for)\s*(?:Rs\.?|INR)\s*([0-9,.]+)/i,
        process: (match: RegExpMatchArray) => {
          const amount = parseFloat(match[1].replace(/,/g, ''));
          let merchant = "Credit Card Purchase";
          
          // Try to extract merchant name
          const merchantMatch = normalizedSms.match(/(?:at|on|in)\s+([A-Za-z0-9\s]+)/i);
          if (merchantMatch && merchantMatch[1]) {
            merchant = merchantMatch[1].trim();
          }
          
          return categorizeTransaction(amount, merchant, "credit");
        }
      },
      
      // SBI Credit Card format
      {
        regex: /(?:SBI Card|SBI Credit Card).+(?:Rs\.?|INR)\s*([0-9,.]+)\s*(?:spent|used|charged|debited)/i,
        process: (match: RegExpMatchArray) => {
          const amount = parseFloat(match[1].replace(/,/g, ''));
          let merchant = "Credit Card Purchase";
          
          // Try to extract merchant name
          const merchantMatch = normalizedSms.match(/(?:at|on|in)\s+([A-Za-z0-9\s]+)/i);
          if (merchantMatch && merchantMatch[1]) {
            merchant = merchantMatch[1].trim();
          }
          
          return categorizeTransaction(amount, merchant, "credit");
        }
      },
      
      // Generic Credit Card format
      {
        regex: /(?:credit card|card ending|cc).+(?:spent|debited|transaction|tx|txn|purchase|payment)\s*(?:of|for)?\s*(?:Rs\.?|INR)\s*([0-9,.]+)/i,
        process: (match: RegExpMatchArray) => {
          const amount = parseFloat(match[1].replace(/,/g, ''));
          let merchant = "Credit Card Purchase";
          
          // Try to extract merchant name
          const merchantMatch = normalizedSms.match(/(?:at|on|in)\s+([A-Za-z0-9\s]+)/i);
          if (merchantMatch && merchantMatch[1]) {
            merchant = merchantMatch[1].trim();
          }
          
          return categorizeTransaction(amount, merchant, "credit");
        }
      }
    ];
    
    // Credit transaction patterns
    const creditPatterns = [
      // Salary credit
      {
        regex: /(?:salary|salary credit|salary acct).+(?:credited|received|deposited)\s*(?:Rs\.?|INR)\s*([0-9,.]+)/i,
        process: (match: RegExpMatchArray) => {
          const amount = parseFloat(match[1].replace(/,/g, ''));
          
          return {
            id: Date.now().toString(),
            date: new Date(),
            description: "Salary Credit",
            amount: amount,
            category: "Income",
            source: "bank" as const,
            status: "credited" as const
          };
        }
      },
      
      // Generic credit pattern
      {
        regex: /(?:credited|cr|received|deposited|transfer|payment)\s*(?:INR|Rs\.?)\s*([0-9,.]+)/i,
        process: (match: RegExpMatchArray) => {
          const amount = parseFloat(match[1].replace(/,/g, ''));
          
          let description = "Amount Credited";
          if (normalizedSms.includes("refund")) {
            description = "Refund Received";
          } else if (normalizedSms.includes("interest")) {
            description = "Interest Credit";
          } else if (normalizedSms.match(/from\s+([A-Za-z\s]+)/i)) {
            const senderMatch = normalizedSms.match(/from\s+([A-Za-z\s]+)/i);
            if (senderMatch && senderMatch[1]) {
              description = `Credit from ${senderMatch[1].trim()}`;
            }
          }
          
          return {
            id: Date.now().toString(),
            date: new Date(),
            description: description,
            amount: amount,
            category: "Other Income",
            source: "bank" as const,
            status: "credited" as const
          };
        }
      }
    ];
    
    // Helper function to categorize transactions based on merchant name
    function categorizeTransaction(amount: number, merchant: string, source: "bank" | "credit"): Transaction {
      // Categorize based on merchant keywords
      let category = "Miscellaneous";
      
      if (/restaurant|food|swiggy|zomato|dine|cafe|hotel|dhaba|pizza|burger|ubereat|eatfit|fresh menu|mcdonalds|kfc|dominos|subway/i.test(merchant)) {
        category = "Dining";
      } else if (/grocery|market|bazaar|big basket|mart|kirana|supermarket|hypermarket|vegetable|fruit|reliance fresh|dmart|big basket|nature basket|grofers|milk/i.test(merchant)) {
        category = "Groceries";
      } else if (/amazon|flipkart|myntra|shopping|retail|shop|store|mall|ajio|nykaa|tatacliq|meesho|snapdeal|trends|max|lifestyle|westside|pantaloons|fabindia/i.test(merchant)) {
        category = "Shopping";
      } else if (/movie|entertainment|netflix|prime|hotstar|pvr|inox|bookmyshow|ticket|concert|event|disney|zee|sony|theater|theatre|sun nxt|voot|youtube|spotify|gaana|wynk|jio cinema/i.test(merchant)) {
        category = "Entertainment";
      } else if (/travel|uber|ola|flight|train|bus|ticket|irctc|ixigo|makemytrip|goibibo|redbus|oyo|hotel|resort|air|cab|taxi|metro/i.test(merchant)) {
        category = "Travel";
      } else if (/mobile|phone|recharge|bill payment|electricity|water|gas|broadband|jio|airtel|vi|vodafone|BSNL|tata|mtnl|postpaid|prepaid|dth/i.test(merchant)) {
        category = "Utilities";
      } else if (/hospital|doctor|clinic|medical|medicine|pharmacy|apollo|medplus|netmeds|1mg|pharmeasy|healthcare|diagnostic|lab|health/i.test(merchant)) {
        category = "Healthcare";
      } else if (/gym|fitness|sports|yoga|workout|decathlon|sport|exercise|coaching|training|class|swimming|badminton|tennis|cricket|football/i.test(merchant)) {
        category = "Fitness";
      } else if (/school|college|university|fee|education|course|class|coaching|training|upskill|skillshare|udemy|coursera|edx|byju|unacademy|tuition|book|stationary/i.test(merchant)) {
        category = "Education";
      } else if (/emi|loan|insurance|investment|mutual fund|stock|equity|zerodha|groww|upstox|coin|kuvera|paytm money|angel one|icici direct|hdfc securities/i.test(merchant)) {
        category = "Finance";
      }
      
      return {
        id: Date.now().toString(),
        date: new Date(),
        description: merchant,
        amount: amount,
        category: category,
        source: source,
        status: "debited"
      };
    }
    
    // Process the SMS through all patterns
    let newTransaction: Partial<Transaction> | null = null;
    
    // Try debit patterns first
    for (const pattern of debitPatterns) {
      const match = normalizedSms.match(pattern.regex);
      if (match) {
        newTransaction = pattern.process(match);
        break;
      }
    }
    
    // If no debit pattern matched, try credit card patterns
    if (!newTransaction) {
      for (const pattern of creditCardPatterns) {
        const match = normalizedSms.match(pattern.regex);
        if (match) {
          newTransaction = pattern.process(match);
          break;
        }
      }
    }
    
    // If still no match, try credit patterns
    if (!newTransaction) {
      for (const pattern of creditPatterns) {
        const match = normalizedSms.match(pattern.regex);
        if (match) {
          newTransaction = pattern.process(match);
          break;
        }
      }
    }
    
    // Last resort: Try to find any amount in the message
    if (!newTransaction) {
      for (const amountPattern of amountPatterns) {
        const match = normalizedSms.match(amountPattern);
        if (match) {
          const amount = parseFloat(match[1].replace(/,/g, ''));
          
          // Determine if it's a debit or credit
          const isDebit = /debited|debit|paid|spent|payment|purchase|withdraw|withdrawl|transferred|transfer to/i.test(normalizedSms);
          const isCredit = /credited|credit|received|deposited|transfer from|refund/i.test(normalizedSms);
          const txnSource = /credit card|card ending|cc/i.test(normalizedSms) ? "credit" as const : "bank" as const;
          
          newTransaction = {
            id: Date.now().toString(),
            date: new Date(),
            description: isDebit ? "Payment" : (isCredit ? "Amount Received" : "Transaction"),
            amount: amount,
            category: isDebit ? "Miscellaneous" : "Other Income",
            source: txnSource,
            status: isDebit ? "debited" as const : "credited" as const
          };
          break;
        }
      }
    }
    
    if (newTransaction && (newTransaction as Transaction)) {
      // Create a transaction object to save to database
      const transactionToSave = {
        ...newTransaction,
        type: newTransaction.status === "credited" ? "income" : "expense",
        // Ensure description is present
        description: newTransaction.description || 
          (newTransaction.status === "credited" ? "Income Transaction" : "Expense Transaction")
      };
      
      // Save the transaction to the server
      saveTransactionToServer(transactionToSave as Transaction)
        .then((savedTransaction) => {
          // Add to local state
          setTransactions(prev => [savedTransaction, ...prev]);
          
          toast({
            title: `${savedTransaction.status === "credited" ? "Credit" : "Debit"} Transaction Added`,
            description: `${formatCurrency(savedTransaction.amount)} ${savedTransaction.status === "credited" ? "credited to" : "debited from"} your account`,
          });
        })
        .catch(error => {
          console.error("Failed to save transaction:", error);
          
          // Add to local state anyway for better UX
          setTransactions(prev => [newTransaction as Transaction, ...prev]);
          
          toast({
            title: "Transaction Saved Locally",
            description: "Could not save to server, but transaction is available in your current session.",
            variant: "default"
          });
        })
        .finally(() => {
          // Clear SMS input
          setSmsInput("");
        });
    } else {
      toast({
        title: "Could Not Parse SMS",
        description: "The SMS format was not recognized. Please try a different message or enter the transaction manually.",
        variant: "destructive"
      });
    }
  };
  
  // Function to handle receipt/bill photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This uses OCR to extract text from the image
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      toast({
        title: "Receipt Processing",
        description: "Your receipt is being analyzed...",
      });
      
      // Create a form data object to upload the image for OCR processing
      const formData = new FormData();
      formData.append('receipt', file);
      
      // In a real implementation, this would call an API endpoint for OCR processing
      // For now, let's capture metadata from the file itself
      
      // Extract information from filename if possible (common naming pattern: Store_Amount_Date.jpg)
      const filenameParts = file.name.split('_');
      let description = "Receipt Upload";
      let amount = 0;
      
      if (filenameParts.length >= 2) {
        // Try to extract merchant name
        description = filenameParts[0].replace(/[^a-zA-Z0-9\s]/g, ' ').trim() || "Receipt Upload";
        
        // Try to extract amount if present
        const amountMatch = filenameParts[1].match(/(\d+)/);
        if (amountMatch) {
          amount = parseInt(amountMatch[1], 10);
        }
      }
      
      // If no amount was extracted, prompt user
      if (amount === 0) {
        const amountStr = prompt("Please enter the amount from the receipt:", "");
        amount = amountStr ? parseFloat(amountStr) : 0;
        
        if (!amount || isNaN(amount)) {
          toast({
            title: "Invalid Amount",
            description: "Please enter a valid amount for the receipt.",
            variant: "destructive"
          });
          return;
        }
      }
      
      // Prompt for more accurate description if needed
      const descInput = prompt("Please confirm or update the merchant name:", description);
      if (descInput) {
        description = descInput;
      }
      
      // Ask for category
      const categoryInput = prompt("Please enter the expense category (e.g., Groceries, Dining, Shopping):", "Shopping");
      const category = categoryInput || "Shopping";
      
      // Create transaction from the receipt
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        date: new Date(),
        description: `Receipt: ${description}`,
        amount: amount,
        category: category,
        source: "bank",
        status: "debited"
      };
      
      // Save transaction to server
      saveTransactionToServer(newTransaction)
        .then((savedTransaction) => {
          // Update transactions with saved transaction data
          setTransactions(prev => [savedTransaction, ...prev]);
          
          toast({
            title: "Receipt Processed",
            description: `${formatCurrency(savedTransaction.amount)} spent at ${description} added to your expenses`,
          });
        })
        .catch(error => {
          console.error("Failed to save receipt transaction:", error);
          
          // Add to local state anyway for better UX
          setTransactions(prev => [newTransaction, ...prev]);
          
          toast({
            title: "Receipt Processed Locally",
            description: `${formatCurrency(newTransaction.amount)} spent at ${description} added to your expenses (not saved to server)`,
          });
        });
    }
  };
  
  // Function to add manual credit card transaction
  const handleAddCreditCardTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const amount = parseFloat(formData.get('amount') as string);
    const merchant = formData.get('merchant') as string;
    const category = formData.get('category') as string;
    const cardName = formData.get('cardName') as string;
    
    if (!amount || !merchant || !category || !cardName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all the required fields",
        variant: "destructive"
      });
      return;
    }
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: new Date(),
      description: `${merchant} (${cardName})`,
      amount: amount,
      category: category,
      source: "credit",
      status: "debited"
    };
    
    // Save to server
    saveTransactionToServer(newTransaction)
      .then((savedTransaction) => {
        // Add to local state
        setTransactions(prev => [savedTransaction, ...prev]);
        
        toast({
          title: "Credit Card Transaction Added",
          description: `${formatCurrency(amount)} spent at ${merchant}`,
        });
      })
      .catch(error => {
        console.error("Failed to save credit card transaction:", error);
        
        // Add to local state anyway for better UX
        setTransactions(prev => [newTransaction, ...prev]);
        
        toast({
          title: "Transaction Saved Locally",
          description: `${formatCurrency(amount)} spent at ${merchant} (not saved to server)`,
          variant: "default"
        });
      });
    
    // Reset form
    form.reset();
  };

  // Display loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-muted-foreground">Loading transaction data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="transactions" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transactions">
            <FileText className="w-4 h-4 mr-2" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="sms-tracking" className="relative group">
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full border-2 border-white group-hover:bg-blue-600"></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
              <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
            </svg>
            Connect Banks
          </TabsTrigger>
          <TabsTrigger value="receipt-upload">
            <Upload className="w-4 h-4 mr-2" />
            Receipt Upload
          </TabsTrigger>
          <TabsTrigger value="credit-cards">
            <CreditCard className="w-4 h-4 mr-2" />
            Credit Cards
          </TabsTrigger>
        </TabsList>
        
        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          {/* Account Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Bank Summary Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Bank Account</CardTitle>
                <CardDescription>Summary of bank transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Credits:</span>
                    <span className="font-medium text-green-600">{formatCurrency(bankCredits)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Debits:</span>
                    <span className="font-medium text-red-600">{formatCurrency(bankDebits)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <span className="font-medium">Balance:</span>
                    <span className="font-bold">{formatCurrency(bankCredits - bankDebits)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credit Card Summary Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Credit Card</CardTitle>
                <CardDescription>Summary of credit card usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Spending:</span>
                    <span className="font-medium text-red-600">{formatCurrency(creditCardSpending)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Limit Utilized:</span>
                    <span className="font-medium">{Math.round((creditCardSpending / 100000) * 100)}%</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <span className="font-medium">Available Credit:</span>
                    <span className="font-bold">{formatCurrency(100000 - creditCardSpending)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters and Visualization Options */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Filters & Views</CardTitle>
                <CardDescription>Transaction & visualization options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Source filters */}
                  <div>
                    <Label className="mb-2 block">Data Source</Label>
                    <ToggleGroup type="single" value={filter} onValueChange={(value) => value && setFilter(value as "all" | "bank" | "credit")}>
                      <ToggleGroupItem value="all" aria-label="All Transactions">
                        <FileText className="h-4 w-4 mr-1" />
                        All
                      </ToggleGroupItem>
                      <ToggleGroupItem value="bank" aria-label="Bank Transactions">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Bank
                      </ToggleGroupItem>
                      <ToggleGroupItem value="credit" aria-label="Credit Card Transactions">
                        <CreditCard className="h-4 w-4 mr-1" />
                        Credit
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  
                  {/* Visualization toggle */}
                  <div>
                    <Label className="mb-2 block">Visualization</Label>
                    <ToggleGroup type="single" value={visibleChartType} onValueChange={(value) => value && setVisibleChartType(value as "pie" | "bar" | "month")}>
                      <ToggleGroupItem value="pie" aria-label="Pie Chart">
                        <PieChart className="h-4 w-4 mr-1" />
                        Pie
                      </ToggleGroupItem>
                      <ToggleGroupItem value="bar" aria-label="Bar Chart">
                        <BarChart2 className="h-4 w-4 mr-1" />
                        Bar
                      </ToggleGroupItem>
                      <ToggleGroupItem value="month" aria-label="Monthly Trends">
                        <Calendar className="h-4 w-4 mr-1" />
                        Monthly
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  
                  {categoryFilter && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-center"
                      onClick={() => setCategoryFilter(null)}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Clear Category Filter
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Category Visualization Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Expense Distribution by Category</CardTitle>
                <CardDescription>
                  Click on a category to filter transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {visibleChartType === "pie" ? (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={categoryData}
                          dataKey="amount"
                          nameKey="category"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          innerRadius={60}
                          label={({ category, percent }) => 
                            `${category}: ${(percent * 100).toFixed(0)}%`
                          }
                          labelLine={false}
                          onClick={(data) => setCategoryFilter(data.category)}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={CATEGORY_COLORS[entry.category] || "#777777"} 
                              stroke={CATEGORY_COLORS[entry.category] || "#777777"}
                              style={{
                                filter: categoryFilter && categoryFilter !== entry.category 
                                  ? 'opacity(0.6)' 
                                  : 'none'
                              }}
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => [formatCurrency(value), "Amount"]}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                ) : visibleChartType === "bar" ? (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData.slice(0, 10)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="category" 
                          tick={{ fontSize: 12 }} 
                          tickFormatter={(value) => value.length > 10 ? `${value.substring(0, 10)}...` : value}
                        />
                        <YAxis
                          tickFormatter={(value) => `$${value/1000}K`}
                        />
                        <Tooltip 
                          formatter={(value: number) => [formatCurrency(value), "Amount"]} 
                          labelFormatter={(label) => `Category: ${label}`}
                        />
                        <Bar 
                          dataKey="amount" 
                          name="Amount" 
                          fill="#8884d8" 
                          onClick={(data) => setCategoryFilter(data.category)}
                        >
                          {categoryData.slice(0, 10).map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={CATEGORY_COLORS[entry.category] || "#777777"}
                              style={{
                                opacity: categoryFilter && categoryFilter !== entry.category 
                                  ? 0.6 
                                  : 1
                              }}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlySpendingData.slice(0, 6)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis
                          tickFormatter={(value) => `$${value/1000}K`}
                        />
                        <Tooltip 
                          formatter={(value: number) => [formatCurrency(value), "Amount"]} 
                          labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Bar 
                          dataKey="total" 
                          name="Spending" 
                          fill="#8884d8"
                        >
                          {monthlySpendingData.slice(0, 6).map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={`hsl(${220 + (index * 20)}, 70%, 50%)`}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Budget vs Actual */}
            <Card>
              <CardHeader>
                <CardTitle>Budget vs Actual Spending</CardTitle>
                <CardDescription>
                  Compare with monthly budget allocations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={budgetComparison.filter(item => item.budgeted > 0 || item.actual > 0).slice(0, 7)} 
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        type="number"
                        tickFormatter={(value) => `$${value/1000}K`}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="category" 
                        width={100}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => value.length > 14 ? `${value.substring(0, 14)}...` : value}
                      />
                      <Tooltip 
                        formatter={(value: number) => [formatCurrency(value), ""]}
                      />
                      <Legend />
                      <Bar 
                        dataKey="budgeted" 
                        name="Budgeted" 
                        fill="#82ca9d" 
                        onClick={(data) => setCategoryFilter(data.category)}
                      />
                      <Bar 
                        dataKey="actual" 
                        name="Actual" 
                        fill="#ff6b6b" 
                        onClick={(data) => setCategoryFilter(data.category)}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transactions List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>
                  {categoryFilter 
                    ? `${categoryFilter} Transactions` 
                    : "Recent Transactions"}
                </CardTitle>
                <CardDescription>
                  {categoryFilter 
                    ? `Showing transactions in ${categoryFilter} category` 
                    : "Your recent bank and credit card activities"}
                </CardDescription>
              </div>
              {categoryFilter && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCategoryFilter(null)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filter
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] rounded-md border p-4">
                {filteredTransactions.filter(t => !categoryFilter || t.category === categoryFilter).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                    <p className="text-muted-foreground text-center">No transactions found.</p>
                    <p className="text-sm text-muted-foreground text-center mt-1">
                      {categoryFilter ? 
                        `No transactions in the "${categoryFilter}" category.` : 
                        "Add transactions by tracking SMS messages, uploading receipts, or adding credit card transactions."}
                    </p>
                  </div>
                ) : (
                <div className="space-y-6">
                  {filteredTransactions
                    .filter(t => !categoryFilter || t.category === categoryFilter)
                    .map((transaction) => (
                    <div key={transaction.id} className="flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            {formatDate(transaction.date)}
                            <Badge
                              variant="outline"
                              className={
                                transaction.source === "bank"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                  : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                              }
                            >
                              {transaction.source === "bank" ? "Bank" : "Credit Card"}
                            </Badge>
                            <Badge 
                              variant="outline"
                              className={transaction.status === "credited" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              }
                            >
                              {transaction.status === "credited" ? "Credit" : "Debit"}
                            </Badge>
                            <Badge 
                              variant="outline"
                              style={{
                                backgroundColor: `${CATEGORY_COLORS[transaction.category]}20`,
                                color: CATEGORY_COLORS[transaction.category],
                                borderColor: `${CATEGORY_COLORS[transaction.category]}40`
                              }}
                              className="flex items-center gap-1"
                            >
                              {getCategoryIcon(transaction.category)}
                              {transaction.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span 
                            className={`font-semibold ${
                              transaction.status === "credited" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {transaction.status === "credited" ? "+" : "-"}{formatCurrency(transaction.amount)}
                          </span>
                          <div className="mt-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-7 px-2 text-xs"
                              onClick={() => handleAddToExpense(transaction)}
                              disabled={transaction.status !== "debited"}
                            >
                              Add to Budget
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Manual Transaction Entry Tab */}
        <TabsContent value="sms-tracking" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 mb-8">
            <Card className="bg-blue-50 border border-blue-200">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-700 border-blue-300" variant="outline">Manual Entry</Badge>
                    <CardTitle className="text-blue-800">Manual Transaction Tracking</CardTitle>
                  </div>
                  <Badge className="bg-blue-100 hover:bg-blue-200 text-blue-800" variant="secondary">
                    <div className="flex items-center gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>
                      Active
                    </div>
                  </Badge>
                </div>
                <CardDescription className="text-blue-600 mt-1">
                  Track your expenses by manually entering transaction details for complete budget control
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-4 border border-blue-100 rounded-lg mt-4">
                  <h3 className="text-sm font-medium mb-3">Manual Transaction Entry</h3>
                  <div className="flex items-center justify-center py-8">
                    <Button 
                      onClick={() => {
                        const form = document.getElementById('quick-transaction-form');
                        if (form) form.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Transaction
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Simple manual tracking for complete budget control
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex items-center justify-center w-full my-4">
            <div className="grow h-px bg-gray-200"></div>
            <div className="px-3 text-sm text-gray-500">Alternative Method</div>
            <div className="grow h-px bg-gray-200"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>SMS Transaction Tracking</CardTitle>
                <CardDescription>
                  Alternatively, extract transactions from your bank and credit card SMS messages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>SMS Transaction Analysis</AlertTitle>
                  <AlertDescription>
                    Analyze bank SMS messages to automatically extract transaction details for budget tracking.
                  </AlertDescription>
                </Alert>
                
                <div className="mt-4">
                  <Label htmlFor="sms-input">Paste SMS message for analysis</Label>
                  <Textarea 
                    id="sms-input" 
                    placeholder="Paste a bank or credit card transaction SMS here..."
                    className="mt-1"
                    value={smsInput || "Your Bank Acct ending 942 was debited $35.00 on 02-May-25; Transfer to JOHN SMITH. Ref:548854031466. Call 1-800-BANK for disputes."}
                    onChange={(e) => setSmsInput(e.target.value)}
                  />
                  <div className="flex justify-end mt-2">
                    <Button 
                      onClick={() => parseSms(smsInput || "Your Bank Acct ending 942 was debited $35.00 on 02-May-25; Transfer to JOHN SMITH. Ref:548854031466. Call 1-800-BANK for disputes.")}
                      disabled={!smsInput && smsInput !== ""}
                    >
                      Analyze SMS
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-semibold mb-2">Example SMS formats that work:</h3>
                  <div className="text-xs text-muted-foreground space-y-2">
                    <p>• $3,500 has been debited from your account for purchase at Target on 28-04-2025.</p>
                    <p>• Your Credit Card ending 1234 was used for $1,500 at Amazon.com</p>
                    <p>• $50,000 credited to your account. Available balance is $125,000</p>
                    <p>• Bank Acct ending 942 debited for $35.00 on 02-May-25; Transfer to JOHN SMITH. Ref:548854031466.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Cross-Platform Sync
                </CardTitle>
                <CardDescription>
                  Sync SMS data between mobile app and website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm">
                  <p className="mb-2">The platform offers two ways to access your transaction SMS data:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Mobile App:</strong> Direct SMS access for real-time transaction tracking</li>
                    <li><strong>Website Sync:</strong> Use your mobile number to sync transaction data</li>
                  </ul>
                </div>
                <div className="bg-blue-100 dark:bg-blue-950 p-3 rounded-md text-xs">
                  <p className="font-medium mb-1">Why We Need This</p>
                  <p>Due to privacy restrictions, websites cannot directly access SMS messages. Our sync solution ensures you get the same financial insights on both mobile and web.</p>
                </div>
                
                <Card className="bg-gray-50 dark:bg-gray-900 border-dashed">
                  <CardContent className="pt-4">
                    <h3 className="text-sm font-medium mb-2">SMS Sync Method</h3>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id="direct-app" 
                          name="sms-sync-method" 
                          defaultChecked 
                        />
                        <Label htmlFor="direct-app">Mobile App (Recommended)</Label>
                      </div>
                      <div className="text-xs text-muted-foreground pl-6">
                        Download our mobile app to automatically sync all your financial SMS messages
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id="phone-number" 
                          name="sms-sync-method" 
                        />
                        <Label htmlFor="phone-number">Sync via Mobile Number</Label>
                      </div>
                      <div className="text-xs text-muted-foreground pl-6">
                        Receive an SMS with a link to sync data from your phone to the website
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Label htmlFor="sync-phone">Enter Mobile Number</Label>
                      <div className="flex mt-1">
                        <Input
                          id="sync-phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="rounded-r-none"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const sendCodeBtn = document.getElementById('send-code-btn') as HTMLButtonElement;
                              if (sendCodeBtn) sendCodeBtn.click();
                            }
                          }}
                        />
                        <Button 
                          id="send-code-btn"
                          className="rounded-l-none"
                          onClick={async () => {
                            const phoneInput = document.getElementById('sync-phone') as HTMLInputElement;
                            const phoneNumber = phoneInput?.value;
                            
                            if (!phoneNumber || phoneNumber.length < 10) {
                              toast({
                                title: "Invalid Phone Number",
                                description: "Please enter a valid mobile number",
                                variant: "destructive"
                              });
                              return;
                            }
                            
                            try {
                              // Generate a unique device ID for this browser
                              let deviceId = localStorage.getItem('dollarmento_device_id');
                              if (!deviceId) {
                                deviceId = `web_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
                                localStorage.setItem('dollarmento_device_id', deviceId);
                              }
                              
                              // Call API to register device and send verification code
                              const response = await fetch('/api/sms/devices/register', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  deviceId,
                                  deviceName: navigator.userAgent || 'Web Browser',
                                  deviceType: 'web',
                                  phoneNumber
                                })
                              });
                              
                              const data = await response.json();
                              
                              if (response.ok) {
                                toast({
                                  title: "Verification SMS Sent",
                                  description: "We've sent a verification code to your phone. Please enter it below.",
                                });
                                
                                // Show verification field
                                document.getElementById('verification-section')?.classList.remove('hidden');
                                
                                // Save deviceId for verification
                                localStorage.setItem('current_verifying_device', deviceId);
                              } else {
                                toast({
                                  title: "Error Sending Verification",
                                  description: data.message || "Please try again later",
                                  variant: "destructive"
                                });
                              }
                            } catch (error) {
                              console.error("Error sending verification:", error);
                              toast({
                                title: "Connection Error",
                                description: "Could not connect to verification service. Please try again.",
                                variant: "destructive"
                              });
                            }
                          }}
                        >
                          Send Code
                        </Button>
                      </div>
                    </div>
                    
                    <div id="verification-section" className="mt-4 hidden">
                      <Label htmlFor="verification-code">Enter Verification Code</Label>
                      <div className="flex mt-1">
                        <Input
                          id="verification-code"
                          type="text"
                          placeholder="123456"
                          className="rounded-r-none"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const verifyBtn = document.getElementById('verify-btn') as HTMLButtonElement;
                              if (verifyBtn) verifyBtn.click();
                            }
                          }}
                        />
                        <Button 
                          id="verify-btn"
                          className="rounded-l-none"
                          onClick={async () => {
                            const codeInput = document.getElementById('verification-code') as HTMLInputElement;
                            const verificationCode = codeInput?.value;
                            
                            if (!verificationCode) {
                              toast({
                                title: "Missing Code",
                                description: "Please enter the verification code received on your phone",
                                variant: "destructive"
                              });
                              return;
                            }
                            
                            try {
                              const deviceId = localStorage.getItem('current_verifying_device');
                              if (!deviceId) {
                                toast({
                                  title: "Session Error",
                                  description: "Please restart the verification process",
                                  variant: "destructive"
                                });
                                return;
                              }
                              
                              // Call API to verify device
                              const response = await fetch('/api/sms/devices/verify', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  deviceId,
                                  verificationCode
                                })
                              });
                              
                              const data = await response.json();
                              
                              if (response.ok) {
                                toast({
                                  title: "Account Linked Successfully",
                                  description: "Your phone is now linked with your DollarMento account. SMS transactions will sync automatically.",
                                });
                                
                                // Clear verification code
                                codeInput.value = '';
                                
                                // Fetch transactions after a short delay to simulate sync
                                setTimeout(async () => {
                                  try {
                                    const transactionsResponse = await fetch('/api/sms/transactions');
                                    
                                    if (transactionsResponse.ok) {
                                      const transactionsData = await transactionsResponse.json();
                                      
                                      if (transactionsData.length > 0) {
                                        // Convert from API format to local Transaction type
                                        const syncedTransactions: any[] = transactionsData.map((t: any) => ({
                                          id: t.id,
                                          date: new Date(t.date),
                                          description: t.description,
                                          amount: Math.round(t.amount / 100), // Convert from paise to rupees
                                          category: t.category,
                                          source: t.source,
                                          status: t.status
                                        }));
                                        
                                        // Add to local state
                                        setTransactions(prev => [...syncedTransactions, ...prev]);
                                        
                                        toast({
                                          title: "SMS Transactions Synced",
                                          description: `${syncedTransactions.length} transactions imported from your account`,
                                        });
                                      } else {
                                        toast({
                                          title: "No Transactions Found",
                                          description: "We haven't found any transactions yet. Start syncing SMS from the mobile app."
                                        });
                                      }
                                    }
                                  } catch (error) {
                                    console.error("Error fetching transactions:", error);
                                  }
                                }, 1500);
                              } else {
                                toast({
                                  title: "Verification Failed",
                                  description: data.message || "Invalid verification code",
                                  variant: "destructive"
                                });
                              }
                            } catch (error) {
                              console.error("Error verifying code:", error);
                              toast({
                                title: "Connection Error",
                                description: "Could not verify code. Please try again.",
                                variant: "destructive"
                              });
                            }
                          }}
                        >
                          Verify
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter the 6-digit code sent to your mobile phone
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1" onClick={() => {
                    toast({
                      title: "SMS Integration",
                      description: "Download the DollarMento mobile app to automatically sync all your financial SMS messages",
                    });
                  }}>
                    <Smartphone className="mr-2 h-4 w-4" />
                    Download Mobile App
                  </Button>
                  
                  <Button 
                    variant="default" 
                    className="flex-1"
                    onClick={async () => {
                      // Check if device is registered and verified
                      const deviceId = localStorage.getItem('dollarmento_device_id');
                      if (!deviceId) {
                        toast({
                          title: "Device Not Registered",
                          description: "Please register your device first using your mobile number",
                          variant: "destructive"
                        });
                        return;
                      }
                      
                      try {
                        // First, check if this device is verified
                        const devicesResponse = await fetch('/api/sms/devices');
                        
                        if (devicesResponse.ok) {
                          const devices = await devicesResponse.json();
                          const thisDevice = devices.find((d: any) => d.deviceId === deviceId);
                          
                          if (!thisDevice || !thisDevice.verified) {
                            toast({
                              title: "Device Not Verified",
                              description: "Please verify your device first using the SMS verification process",
                              variant: "destructive"
                            });
                            return;
                          }
                          
                          // Device is verified, proceed with sync
                          toast({
                            title: "SMS Sync Started",
                            description: "Fetching your financial transactions...",
                          });
                          
                          // Get transactions from the API
                          const transactionsResponse = await fetch('/api/sms/transactions');
                          
                          if (transactionsResponse.ok) {
                            const transactionsData = await transactionsResponse.json();
                            
                            if (transactionsData.length > 0) {
                              // Convert from API format to local Transaction type
                              const syncedTransactions: any[] = transactionsData.map((t: any) => ({
                                id: t.id,
                                date: new Date(t.date),
                                description: t.description,
                                amount: Math.round(t.amount / 100), // Convert from paise to rupees
                                category: t.category,
                                source: t.source,
                                status: t.status
                              }));
                              
                              // Add to local state
                              setTransactions(prev => {
                                // Filter out transactions that might already be in the list
                                const newTransactions = syncedTransactions.filter(
                                  t => !prev.some(p => p.id === t.id)
                                );
                                
                                return [...newTransactions, ...prev];
                              });
                              
                              toast({
                                title: "SMS Sync Complete",
                                description: `${syncedTransactions.length} transactions synced from your account`,
                              });
                            } else {
                              toast({
                                title: "No Transactions Found",
                                description: "We haven't found any transactions yet. Install the DollarMento mobile app to start syncing SMS messages.",
                              });
                            }
                          } else {
                            const errorData = await transactionsResponse.json();
                            throw new Error(errorData.message || "Failed to fetch transactions");
                          }
                        } else {
                          throw new Error("Failed to get device status");
                        }
                      } catch (error) {
                        console.error("SMS sync error:", error);
                        toast({
                          title: "Sync Failed",
                          description: "There was an error syncing your SMS data. Please try again.",
                          variant: "destructive"
                        });
                      }
                    }}
                  >
                    Connect SMS Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Receipt Upload Tab */}
        <TabsContent value="receipt-upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Receipt & Bill Upload</CardTitle>
              <CardDescription>
                Upload photos of receipts and bills to automatically extract transaction details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <div className="flex flex-col items-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <h3 className="text-sm font-medium">Upload receipt or bill photo</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supported formats: JPG, PNG, PDF
                  </p>
                  <Label 
                    htmlFor="receipt-upload" 
                    className="mt-4 cursor-pointer inline-flex items-center px-4 py-2 bg-primary text-white rounded-md"
                  >
                    Choose File
                  </Label>
                  <Input 
                    id="receipt-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*,application/pdf"
                    onChange={handlePhotoUpload}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">How it works:</h3>
                <ol className="text-sm text-muted-foreground list-decimal pl-5 space-y-1">
                  <li>Take a photo of your receipt or bill</li>
                  <li>Our OCR engine extracts the merchant, amount, and date</li>
                  <li>The transaction is categorized automatically</li>
                  <li>You can review and modify the details if needed</li>
                </ol>
              </div>
              
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Privacy Notice</AlertTitle>
                <AlertDescription>
                  Your receipts are processed securely. We extract only transaction details and never store the original images on our servers.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Credit Cards Tab */}
        <TabsContent value="credit-cards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Credit Card Management</CardTitle>
              <CardDescription>
                Track and manage your credit card spending separately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <form onSubmit={handleAddCreditCardTransaction} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Credit Card</Label>
                      <select 
                        id="cardName" 
                        name="cardName"
                        className="w-full p-2 border rounded-md"
                        value={selectedCard}
                        onChange={(e) => setSelectedCard(e.target.value)}
                        required
                      >
                        <option value="">Select a card</option>
                        <option value="HDFC Credit Card">HDFC Credit Card</option>
                        <option value="ICICI Credit Card">ICICI Credit Card</option>
                        <option value="SBI Credit Card">SBI Credit Card</option>
                        <option value="Axis Bank Credit Card">Axis Bank Credit Card</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount ($)</Label>
                      <Input 
                        id="amount" 
                        name="amount"
                        type="number" 
                        placeholder="Enter amount" 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="merchant">Merchant/Description</Label>
                      <Input 
                        id="merchant" 
                        name="merchant"
                        placeholder="Where did you spend?" 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select 
                        id="category" 
                        name="category"
                        className="w-full p-2 border rounded-md"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="Dining">Dining</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Travel">Travel</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="space-x-2">
                      <Label htmlFor="is-emi" className="mr-2">Is this an EMI transaction?</Label>
                      <input type="checkbox" id="is-emi" name="is_emi" />
                    </div>
                    
                    <Button type="submit">
                      Add Transaction
                    </Button>
                  </div>
                </form>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Credit Card Summary</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <Card className="bg-blue-50 dark:bg-blue-900">
                      <CardContent className="pt-6">
                        <h4 className="font-medium text-sm mb-4">Total Credit Spending</h4>
                        <div className="text-2xl font-bold">{formatCurrency(creditCardSpending)}</div>
                        <p className="text-xs text-muted-foreground mt-2">Across all your credit cards</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-red-50 dark:bg-red-900">
                      <CardContent className="pt-6">
                        <h4 className="font-medium text-sm mb-4">Credit Utilization</h4>
                        <div className="text-2xl font-bold">{Math.round((creditCardSpending / 100000) * 100)}%</div>
                        <p className="text-xs text-muted-foreground mt-2">Of your total available credit</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SpendingInsights;