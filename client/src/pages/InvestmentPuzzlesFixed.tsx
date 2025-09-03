import React, { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Puzzle, ArrowLeft, CheckCircle, XCircle, Trophy, Star, 
  Search, Shuffle, Target, TrendingUp, Brain, Clock,
  RotateCcw, Lightbulb, Award, Zap, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';


// Market Terms Flashcards Component (extracted to avoid hooks in map)
const MarketTermsFlashcards = () => {
  const [flippedCards, setFlippedCards] = useState<{[key: number]: boolean}>({});
  
  const marketTerms = [
    { term: "Equity", definition: "Ownership interest in a company" },
    { term: "Bond", definition: "Debt investment with fixed interest" },
    { term: "Dividend", definition: "Payment made by company to shareholders" },
    { term: "P/E Ratio", definition: "Price-to-Earnings ratio for valuation" },
    { term: "Bull Market", definition: "Rising market with optimistic sentiment" },
    { term: "Bear Market", definition: "Falling market with pessimistic sentiment" },
    { term: "IPO", definition: "Initial Public Offering of company shares" },
    { term: "Market Cap", definition: "Total value of company's shares" },
    { term: "Volatility", definition: "Degree of price fluctuation" }
  ];

  const toggleCard = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Market Terms (Flashcards)</h2>
      <p className="text-gray-600 mb-6">Click on cards to flip and reveal definitions</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {marketTerms.map((card, index) => (
          <div
            key={index}
            className="flashcard bg-white border rounded-lg p-6 h-32 cursor-pointer transition-all duration-300 hover:shadow-lg"
            onClick={() => toggleCard(index)}
          >
            {!flippedCards[index] ? (
              <div className="text-center">
                <h3 className="text-lg font-bold text-blue-700">{card.term}</h3>
                <p className="text-sm text-gray-500 mt-2">Click to reveal definition</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-700">{card.definition}</p>
                <p className="text-xs text-blue-500 mt-2">Click to flip back</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Comprehensive cryptic clues collection
const crypticClues = [
  // Original clues
  {
    id: 1,
    clue: "America's premier market benchmark (5 letters)",
    answer: "SP500",
    options: ["SP500", "NASDAQ", "INDEX", "STOCK"],
    explanation: "S&P 500 is America's benchmark stock market index representing the top 500 companies by market cap."
  },
  {
    id: 2,
    clue: "Bank's time-locked savings certificate (2 letters)",
    answer: "CD",
    options: ["CD", "FD", "MM", "BD"],
    explanation: "Certificate of Deposit (CD) locks your money for a specific time period at guaranteed returns."
  },
  {
    id: 3,
    clue: "Royal returns from company profits (8 letters)",
    answer: "DIVIDEND",
    options: ["DIVIDEND", "INTEREST", "RETURNS", "PROFITS"],
    explanation: "Dividends are payments made by companies to shareholders from their profits."
  },
  {
    id: 4,
    clue: "A metal that shines in portfolio during market storms (4 letters)",
    answer: "GOLD",
    options: ["GOLD", "SILVER", "COPPER", "STEEL"],
    explanation: "Gold is considered a safe haven asset during market volatility and economic uncertainty."
  },
  {
    id: 5,
    clue: "Guardian of American markets (3 letters)",
    answer: "SEC",
    options: ["SEC", "FED", "NYSE", "IRS"],
    explanation: "SEC (Securities and Exchange Commission) regulates America's capital markets and protects investors."
  },
  // Money & Currency Clues
  {
    id: 6,
    clue: "I'm always in your wallet but vanish quickly — who am I?",
    answer: "CASH",
    options: ["CASH", "CARD", "COINS", "NOTES"],
    explanation: "Cash is physical money that tends to be spent quickly and easily."
  },
  {
    id: 7,
    clue: "I come in notes but not in music, I flow but don't swim",
    answer: "DOLLAR",
    options: ["DOLLAR", "RUPEE", "POUND", "EURO"],
    explanation: "The US Dollar comes in paper notes and flows in the American economy."
  },
  {
    id: 8,
    clue: "I'm a round little thing, always worth my weight",
    answer: "COIN",
    options: ["COIN", "TOKEN", "MEDAL", "RING"],
    explanation: "Coins are round metal pieces with fixed denominations."
  },
  {
    id: 9,
    clue: "Silent in pockets, noisy when dropped",
    answer: "COIN",
    options: ["COIN", "KEY", "PHONE", "CARD"],
    explanation: "Coins make noise when they fall but are silent when stored."
  },
  // Investments & Savings Clues
  {
    id: 10,
    clue: "I grow when ignored, shrink when touched",
    answer: "COMPOUND INTEREST",
    options: ["COMPOUND INTEREST", "SIMPLE INTEREST", "INFLATION", "SAVINGS"],
    explanation: "Compound interest grows best when left untouched over time."
  },
  {
    id: 11,
    clue: "Monthly discipline that compounds wealth (3 letters)",
    answer: "DCA",
    options: ["DCA", "401K", "IRA", "ETF"],
    explanation: "DCA (Dollar-Cost Averaging) allows regular monthly investments to smooth out market volatility."
  },
  {
    id: 12,
    clue: "Tax-advantaged retirement account (4 letters)",
    answer: "401K",
    options: ["401K", "IRA", "HSA", "529"],
    explanation: "401(k) offers tax benefits and employer matching for long-term retirement wealth building."
  },
  {
    id: 13,
    clue: "Wall Street's favorite measure of company value (2 letters)",
    answer: "PE",
    options: ["PE", "PB", "ROE", "EPS"],
    explanation: "ELSS (Equity Linked Savings Scheme) is a tax-saving mutual fund, not a cutting tool."
  },
  {
    id: 14,
    clue: "Market's rollercoaster ride, I'm your ticket",
    answer: "MUTUAK FUND",
    options: ["MUTUAK FUND", "STOCK", "BOND", "FD"],
    explanation: "Mutual funds provide exposure to market volatility with professional management."
  },
  {
    id: 15,
    clue: "I'm the 'stock' of steady income, but not a vegetable",
    answer: "BOND",
    options: ["BOND", "DIVIDEND", "INTEREST", "RENT"],
    explanation: "Bonds provide steady income through regular interest payments."
  },
  // Banking Clues
  {
    id: 16,
    clue: "I hold your money and charge you for it",
    answer: "BANK",
    options: ["BANK", "WALLET", "LOCKER", "SAFE"],
    explanation: "Banks hold deposits and charge various fees for their services."
  },
  {
    id: 17,
    clue: "I'm your money's safe house, until UPI wakes me",
    answer: "BANK ACCOUNT",
    options: ["BANK ACCOUNT", "WALLET", "LOCKER", "SAFE"],
    explanation: "Bank accounts store money safely until digital transactions activate them."
  },
  {
    id: 18,
    clue: "I'm your key to the ATM kingdom",
    answer: "PIN",
    options: ["PIN", "CARD", "PHONE", "THUMB"],
    explanation: "Personal Identification Number (PIN) unlocks ATM access."
  },
  // Digital Finance
  {
    id: 19,
    clue: "I beep, flash, and deduct",
    answer: "QR CODE",
    options: ["QR CODE", "UPI", "CARD", "PHONE"],
    explanation: "QR codes make sounds and visual signals during payment processing."
  },
  {
    id: 20,
    clue: "I'm three letters, handle big amounts",
    answer: "UPI",
    options: ["UPI", "ATM", "POS", "EMI"],
    explanation: "Unified Payments Interface (UPI) processes large transaction volumes."
  },
  {
    id: 21,
    clue: "16 digits, no heart",
    answer: "CARD NUMBER",
    options: ["CARD NUMBER", "PHONE NUMBER", "ACCOUNT NUMBER", "PIN"],
    explanation: "Credit/debit card numbers have 16 digits and are purely numerical."
  },
  {
    id: 22,
    clue: "I'm safe, invisible, and protect your password",
    answer: "OTP",
    options: ["OTP", "PIN", "PASSWORD", "BIOMETRIC"],
    explanation: "One-Time Password (OTP) provides invisible security for transactions."
  },
  // Spending & Budgeting
  {
    id: 23,
    clue: "I track every rupee you spend — who am I?",
    answer: "BUDGET",
    options: ["BUDGET", "STATEMENT", "RECEIPT", "TRACKER"],
    explanation: "A budget tracks and plans all your spending and income."
  },
  {
    id: 24,
    clue: "You swipe me, tap me, but I'm not on Tinder",
    answer: "DEBIT CARD",
    options: ["DEBIT CARD", "CREDIT CARD", "PHONE", "WALLET"],
    explanation: "Debit cards are swiped and tapped for payments, unlike dating apps."
  },
  {
    id: 25,
    clue: "I scream 'Buy Now, Regret Later'",
    answer: "IMPULSE PURCHASE",
    options: ["IMPULSE PURCHASE", "EMI", "LOAN", "CREDIT"],
    explanation: "Impulse purchases are spontaneous buys that often lead to regret."
  },
  // Insurance & Protection
  {
    id: 26,
    clue: "I help in emergencies, yet sleep most of the time",
    answer: "INSURANCE",
    options: ["INSURANCE", "EMERGENCY FUND", "LOAN", "CREDIT"],
    explanation: "Insurance remains dormant until an emergency activates its protection."
  },
  {
    id: 27,
    clue: "I grow faster when you forget me",
    answer: "EMERGENCY FUND",
    options: ["EMERGENCY FUND", "SAVINGS", "INVESTMENT", "COMPOUND INTEREST"],
    explanation: "Emergency funds grow best when left untouched and forgotten."
  },
  // Tax & Government
  {
    id: 28,
    clue: "I take from your income but fund your roads",
    answer: "INCOME TAX",
    options: ["INCOME TAX", "GST", "SERVICE TAX", "TOLL"],
    explanation: "Income tax is collected from salaries and used for infrastructure."
  },
  {
    id: 29,
    clue: "I help save tax, but I'm not your CA",
    answer: "80C",
    options: ["80C", "PPF", "ELSS", "NSC"],
    explanation: "Section 80C of Income Tax Act provides tax deduction benefits."
  },
  {
    id: 30,
    clue: "I'm gold on paper — no locker needed",
    answer: "SOVEREIGN GOLD BOND",
    options: ["SOVEREIGN GOLD BOND", "GOLD ETF", "DIGITAK GOLD", "GOLD FUND"],
    explanation: "Sovereign Gold Bonds are government securities backed by gold."
  },
  // Financial Wisdom
  {
    id: 31,
    clue: "I'm your 'future you' cheering in silence",
    answer: "FINANCIAK DISCIPLINE",
    options: ["FINANCIAK DISCIPLINE", "SAVINGS", "INVESTMENT", "BUDGET"],
    explanation: "Financial discipline benefits your future self through present sacrifices."
  },
  {
    id: 32,
    clue: "You know me only after losing me",
    answer: "FINANCIAK FREEDOM",
    options: ["FINANCIAK FREEDOM", "MONEY", "SAVINGS", "INCOME"],
    explanation: "Financial freedom's value is often realized only when it's lost."
  },
  {
    id: 33,
    clue: "I multiply in stocks but divide in scams",
    answer: "GREED",
    options: ["GREED", "MONEY", "PROFIT", "RETURN"],
    explanation: "Greed can multiply gains in good investments but cause losses in scams."
  },
  {
    id: 34,
    clue: "What grows in silence and dies with splurging?",
    answer: "SAVINGS",
    options: ["SAVINGS", "INVESTMENT", "INTEREST", "WEALTH"],
    explanation: "Savings grow quietly when undisturbed but vanish with excessive spending."
  },
  // Indian Specific
  {
    id: 35,
    clue: "My 'number' saves you tax and gets you into trouble",
    answer: "PAN CARD",
    options: ["PAN CARD", "AADHAAR", "VOTER ID", "PASSPORT"],
    explanation: "PAN number is required for tax benefits but also tracks financial activities."
  },
  {
    id: 36,
    clue: "I was black, now white — thanks to demonetization",
    answer: "OLD 500 NOTE",
    options: ["OLD 500 NOTE", "OLD 1000 NOTE", "BLACK MONEY", "CASH"],
    explanation: "Old $500 notes became invalid after 2016 demonetization."
  },
  {
    id: 37,
    clue: "I'm your ID, your proof, your tracker",
    answer: "AADHAAR",
    options: ["AADHAAR", "PAN CARD", "PASSPORT", "VOTER ID"],
    explanation: "Aadhaar serves as identity proof and tracks various government services."
  },
  // Modern Finance
  {
    id: 38,
    clue: "I'm smart in phone and wallet — swipe me for savings",
    answer: "DIGITAK WALLET",
    options: ["DIGITAK WALLET", "CREDIT CARD", "DEBIT CARD", "UPI"],
    explanation: "Digital wallets offer smart features and cashback savings."
  },
  {
    id: 39,
    clue: "I'm your retirement BFF in government's disguise",
    answer: "NPS",
    options: ["NPS", "PPF", "EPF", "PENSION"],
    explanation: "National Pension Scheme (NPS) is a government retirement savings program."
  },
  {
    id: 40,
    clue: "The bigger I am, the longer you work",
    answer: "DEBT",
    options: ["DEBT", "LOAN", "EMI", "LIABILITY"],
    explanation: "Larger debts require longer working periods to repay."
  },
  // Additional 100+ clues as provided
  {
    id: 41,
    clue: "I'm 'fixed' in name, but flexible in maturity",
    answer: "FD",
    options: ["FD", "RD", "PPF", "NSC"],
    explanation: "Fixed Deposits have fixed interest but various maturity options."
  },
  {
    id: 42,
    clue: "You swipe me, tap me, but I'm not on Tinder",
    answer: "CREDIT CARD",
    options: ["CREDIT CARD", "DEBIT CARD", "PHONE", "WALLET"],
    explanation: "Credit cards are swiped and tapped for payments, unlike dating apps."
  },
  {
    id: 43,
    clue: "My limit is not your limit — spend me wisely",
    answer: "CREDIT CARD",
    options: ["CREDIT CARD", "DEBIT CARD", "CASH", "UPI"],
    explanation: "Credit cards have spending limits that should be used responsibly."
  },
  {
    id: 44,
    clue: "I leak your money slowly; check your subscription",
    answer: "HIDDEN CHARGES",
    options: ["HIDDEN CHARGES", "EMI", "INTEREST", "TAX"],
    explanation: "Hidden charges in subscriptions slowly drain money without notice."
  },
  {
    id: 45,
    clue: "Free trial's evil cousin",
    answer: "AUTO-RENEWAL",
    options: ["AUTO-RENEWAL", "SUBSCRIPTION", "TRIAL", "PAYMENT"],
    explanation: "Auto-renewal charges continue after free trials end unexpectedly."
  },
  {
    id: 46,
    clue: "I'm not a tree, but I give statements every month",
    answer: "BANK",
    options: ["BANK", "ATM", "BROKER", "CA"],
    explanation: "Banks provide monthly statements unlike trees that give fruits."
  },
  {
    id: 47,
    clue: "I'm gold on paper — no locker needed",
    answer: "GOLD BOND",
    options: ["GOLD BOND", "GOLD ETF", "PHYSICAK GOLD", "GOLD COIN"],
    explanation: "Gold bonds are paper investments backed by gold without storage needs."
  },
  {
    id: 48,
    clue: "I give returns and respect elders",
    answer: "SENIOR CITIZEN SCHEME",
    options: ["SENIOR CITIZEN SCHEME", "PPF", "NSC", "FD"],
    explanation: "Senior Citizens Saving Scheme provides higher returns for elderly investors."
  },
  {
    id: 49,
    clue: "I'm small, post office loves me",
    answer: "NSC",
    options: ["NSC", "PPF", "KVP", "SCSS"],
    explanation: "National Savings Certificate is a small savings scheme popular at post offices."
  },
  {
    id: 50,
    clue: "I give Netflix to your friends, and debt to you",
    answer: "SHARING SUBSCRIPTIONS",
    options: ["SHARING SUBSCRIPTIONS", "CREDIT CARD", "EMI", "LOAN"],
    explanation: "Sharing subscription costs with friends while paying the main bill creates debt."
  },
  {
    id: 51,
    clue: "You pay me EMIs, I sleep on your floor",
    answer: "FURNITURE EMI",
    options: ["FURNITURE EMI", "HOME LOAN", "CAR LOAN", "PERSONAK LOAN"],
    explanation: "Furniture bought on EMI literally sits on your floor while you pay installments."
  },
  {
    id: 52,
    clue: "I'm free, but cost your data",
    answer: "FREE APP",
    options: ["FREE APP", "WIFI", "WEBSITE", "GAME"],
    explanation: "Free apps often cost money through data usage and hidden charges."
  },
  {
    id: 53,
    clue: "I promise cashback, steal your time",
    answer: "DISCOUNT APP",
    options: ["DISCOUNT APP", "CASHBACK APP", "SHOPPING APP", "COUPON"],
    explanation: "Discount apps promise savings but waste time hunting for deals."
  },
  {
    id: 54,
    clue: "I'm social, but not your friend",
    answer: "PEER PRESSURE",
    options: ["PEER PRESSURE", "SOCIAK MEDIA", "FRIENDS", "FAMILY"],
    explanation: "Social peer pressure leads to unnecessary spending to fit in."
  },
  {
    id: 55,
    clue: "No OTP, no PIN, still I disappear",
    answer: "SCAM",
    options: ["SCAM", "FRAUD", "THEFT", "HACK"],
    explanation: "Online scams can steal money without requiring OTP or PIN verification."
  },
  {
    id: 56,
    clue: "I auto-debit, even when you forget me",
    answer: "STANDING INSTRUCTION",
    options: ["STANDING INSTRUCTION", "AUTO-PAY", "investment", "EMI"],
    explanation: "Standing instructions automatically debit accounts on scheduled dates."
  },
  {
    id: 57,
    clue: "I come before pleasure, rhyme with pressure",
    answer: "BUDGET",
    options: ["BUDGET", "SAVE", "PLAN", "INVEST"],
    explanation: "Budgeting comes before spending pleasure and sounds like 'pressure'."
  },
  {
    id: 58,
    clue: "I knock through links, don't click",
    answer: "PHISHING",
    options: ["PHISHING", "VIRUS", "SPAM", "SCAM"],
    explanation: "Phishing attacks come through malicious links that shouldn't be clicked."
  },
  {
    id: 59,
    clue: "I dress like your bank, but I'm a thief",
    answer: "FAKE SMS",
    options: ["FAKE SMS", "SCAM CALL", "PHISHING", "FRAUD"],
    explanation: "Fake SMS messages impersonate banks to steal personal information."
  },
  {
    id: 60,
    clue: "I promise quick returns and vanish overnight",
    answer: "PONZI SCHEME",
    options: ["PONZI SCHEME", "SCAM", "FRAUD", "CHIT FUND"],
    explanation: "Ponzi schemes promise unrealistic returns before disappearing with money."
  },
  {
    id: 61,
    clue: "I'm gold for your daughter's wedding, digital for your taxes",
    answer: "SUKANYA SAMRIDDHI",
    options: ["SUKANYA SAMRIDDHI", "PPF", "NSC", "ELSS"],
    explanation: "Sukanya Samriddhi Yojana saves for girl child's future with tax benefits."
  },
  {
    id: 62,
    clue: "My 'number' saves you tax and gets you into trouble",
    answer: "PAN",
    options: ["PAN", "AADHAAR", "ACCOUNT", "MOBILE"],
    explanation: "PAN number provides tax benefits but also tracks all financial activities."
  },
  {
    id: 63,
    clue: "I was black, now white — thanks to demonetization",
    answer: "500 NOTE",
    options: ["500 NOTE", "1000 NOTE", "BLACK MONEY", "OLD CURRENCY"],
    explanation: "Old $500 notes became invalid (white) after 2016 demonetization."
  },
  {
    id: 64,
    clue: "I multiply in stocks but divide in scams",
    answer: "GREED",
    options: ["GREED", "MONEY", "PROFIT", "RETURN"],
    explanation: "Greed can multiply wealth in legitimate investments but causes losses in scams."
  },
  {
    id: 65,
    clue: "I'm light as air, yet weigh heavy on your pocket",
    answer: "LIFESTYLE INFLATION",
    options: ["LIFESTYLE INFLATION", "EXPENSES", "SPENDING", "BILLS"],
    explanation: "Lifestyle inflation seems insignificant but heavily impacts finances over time."
  },
  {
    id: 66,
    clue: "Save me now, enjoy me later",
    answer: "RETIREMENT FUND",
    options: ["RETIREMENT FUND", "EMERGENCY FUND", "SAVINGS", "INVESTMENT"],
    explanation: "Retirement funds require present sacrifices for future enjoyment."
  },
  {
    id: 67,
    clue: "What grows in silence and dies with splurging?",
    answer: "SAVINGS",
    options: ["SAVINGS", "INVESTMENT", "WEALTH", "MONEY"],
    explanation: "Savings grow quietly when untouched but disappear with excessive spending."
  },
  {
    id: 68,
    clue: "A credit card gives you credit, but ______ gives you control",
    answer: "BUDGET",
    options: ["BUDGET", "DISCIPLINE", "PLANNING", "SAVINGS"],
    explanation: "While credit cards provide spending power, budgets provide spending control."
  },
  {
    id: 69,
    clue: "UPI means ______ Payment Interface",
    answer: "UNIFIED",
    options: ["UNIFIED", "UNIVERSAL", "UNIQUE", "ULTIMATE"],
    explanation: "UPI stands for Unified Payments Interface connecting multiple banks."
  },
  {
    id: 70,
    clue: "investment is to index funds as ______ is to insurance",
    answer: "PREMIUM",
    options: ["PREMIUM", "POLICY", "CLAIM", "BENEFIT"],
    explanation: "investment provides regular investments to index funds like premiums to insurance."
  },
  {
    id: 71,
    clue: "You buy me monthly, I become EMI",
    answer: "LOAN",
    options: ["LOAN", "PRODUCT", "SERVICE", "SUBSCRIPTION"],
    explanation: "Loans are repaid through monthly EMI (Equated Monthly Installment) payments."
  },
  {
    id: 72,
    clue: "______ is the silent killer of savings",
    answer: "INFLATION",
    options: ["INFLATION", "SPENDING", "TAX", "INTEREST"],
    explanation: "Inflation silently erodes purchasing power and savings value over time."
  },
  {
    id: 73,
    clue: "I'm not a fruit, but I'm ripe with returns",
    answer: "MUTUAK FUND",
    options: ["MUTUAK FUND", "STOCK", "BOND", "INVESTMENT"],
    explanation: "Mutual funds mature (ripen) over time to provide good returns."
  },
  {
    id: 74,
    clue: "Spending less than you earn is called ______",
    answer: "SURPLUS",
    options: ["SURPLUS", "PROFIT", "SAVING", "BUDGET"],
    explanation: "A surplus occurs when income exceeds expenses, creating positive cash flow."
  },
  {
    id: 75,
    clue: "A rainy day fund is also known as ______",
    answer: "EMERGENCY FUND",
    options: ["EMERGENCY FUND", "SAVINGS", "BACKUP", "RESERVE"],
    explanation: "Emergency funds are savings set aside for unexpected financial needs."
  },
  {
    id: 76,
    clue: "I am the opposite of an asset",
    answer: "LIABILITY",
    options: ["LIABILITY", "DEBT", "EXPENSE", "LOSS"],
    explanation: "Liabilities are financial obligations, opposite to assets which have value."
  },
  {
    id: 77,
    clue: "______ is the magic of earning on earnings",
    answer: "COMPOUNDING",
    options: ["COMPOUNDING", "INTEREST", "PROFIT", "RETURN"],
    explanation: "Compounding allows earnings to generate their own earnings over time."
  },
  {
    id: 78,
    clue: "America's central bank: ______",
    answer: "FED",
    options: ["FED", "FDIC", "SEC", "CFTC"],
    explanation: "Federal Reserve (FED) is America's central banking institution."
  },
  {
    id: 79,
    clue: "A stock market animal that rises: ______",
    answer: "BULL",
    options: ["BULL", "BEAR", "TIGER", "LION"],
    explanation: "Bull markets are characterized by rising stock prices and optimism."
  },
  {
    id: 80,
    clue: "A falling market animal: ______",
    answer: "BEAR",
    options: ["BEAR", "BULL", "WOLF", "EAGLE"],
    explanation: "Bear markets feature falling prices and pessimistic investor sentiment."
  },
  {
    id: 81,
    clue: "Small ticket loans with big impact: ______",
    answer: "MICROFINANCE",
    options: ["MICROFINANCE", "PERSONAK LOAN", "CREDIT CARD", "EMI"],
    explanation: "Microfinance provides small loans that create significant social and economic impact."
  },
  {
    id: 82,
    clue: "I'm smart, portable, but need a pin",
    answer: "DEBIT CARD",
    options: ["DEBIT CARD", "CREDIT CARD", "PHONE", "WALLET"],
    explanation: "Debit cards are smart, portable payment tools that require PIN authentication."
  },
  {
    id: 83,
    clue: "I'm 10% drama, 90% headlines",
    answer: "MARKET CRASH",
    options: ["MARKET CRASH", "MARKET NEWS", "STOCK FALL", "VOLATILITY"],
    explanation: "Market crashes generate more media attention than their actual impact warrants."
  },
  {
    id: 84,
    clue: "My 'return' is guaranteed, but my real value may fade",
    answer: "CD RETURN",
    options: ["CD RETURN", "BOND RETURN", "SAVINGS RETURN", "TREASURY RETURN"],
    explanation: "Certificate of Deposit returns are guaranteed but may lose value to inflation over time."
  },
  {
    id: 85,
    clue: "I'm gifted on Christmas but rarely encashed",
    answer: "GIFT CARD",
    options: ["GIFT CARD", "GOLD COIN", "VOUCHER", "CASH"],
    explanation: "Gift cards are popular Christmas gifts but often remain unused or forgotten."
  },
  {
    id: 86,
    clue: "I'm your income's enemy and government's friend",
    answer: "SALES TAX",
    options: ["SALES TAX", "INCOME TAX", "PAYROLL TAX", "PROPERTY TAX"],
    explanation: "Sales tax reduces take-home income but provides revenue for government services."
  },
  {
    id: 87,
    clue: "My middle name is 'inflation-beater'",
    answer: "EQUITY FUND",
    options: ["EQUITY FUND", "DEBT FUND", "GOLD FUND", "LIQUID FUND"],
    explanation: "Equity index funds historically beat inflation over long investment periods."
  },
  {
    id: 88,
    clue: "I look like bonus money but steal savings",
    answer: "CASHBACK TRAP",
    options: ["CASHBACK TRAP", "CREDIT REWARD", "DISCOUNT OFFER", "FREE MONEY"],
    explanation: "Cashback offers often encourage unnecessary spending that reduces overall savings."
  },
  {
    id: 89,
    clue: "I'm not Netflix, but I'm monthly and addictive",
    answer: "EMI",
    options: ["EMI", "SUBSCRIPTION", "BILL", "PAYMENT"],
    explanation: "EMIs create monthly payment habits that can become addictive like subscriptions."
  },
  {
    id: 90,
    clue: "I'm liquid, safe, and hate panic",
    answer: "EMERGENCY FUND",
    options: ["EMERGENCY FUND", "SAVINGS ACCOUNT", "LIQUID FUND", "CASH"],
    explanation: "Emergency funds provide liquid, safe money that prevents panic during crises."
  },
  {
    id: 91,
    clue: "I'm tax-saving, child-loving, and future-focused",
    answer: "529 PLAN",
    options: ["529 PLAN", "CHILD PLAN", "EDUCATION LOAN", "COVERDELL ESA"],
    explanation: "529 Education Savings Plans save taxes while securing child's education future."
  },
  {
    id: 92,
    clue: "I'm high on interest, low on risk, and government's pride",
    answer: "TREASURY BOND",
    options: ["TREASURY BOND", "SAVINGS BOND", "MUNICIPAL BOND", "CD"],
    explanation: "Treasury bonds offer good interest with low risk, backed by US government."
  },
  {
    id: 93,
    clue: "My address is permanent, my value isn't",
    answer: "SSN",
    options: ["SSN", "ITIN", "PASSPORT", "LICENSE"],
    explanation: "Social Security Number is permanent but its utility value changes with tax laws."
  },
  {
    id: 94,
    clue: "I tell your financial story in 3 digits",
    answer: "CREDIT SCORE",
    options: ["CREDIT SCORE", "FICO SCORE", "RISK SCORE", "RATING"],
    explanation: "Credit scores summarize entire financial history in a simple 3-digit number."
  },
  {
    id: 95,
    clue: "You fear me in Jan-March, forget me in April",
    answer: "TAX FILING",
    options: ["TAX FILING", "TAX PLANNING", "ITR", "AUDIT"],
    explanation: "Tax filing creates stress during filing season but is forgotten afterwards."
  },
  {
    id: 96,
    clue: "My returns vary, but I'm not your mood swing",
    answer: "STOCK MARKET",
    options: ["STOCK MARKET", "MUTUAK FUND", "EQUITY", "SHARE"],
    explanation: "Stock market returns fluctuate based on fundamentals, not emotional swings."
  },
  {
    id: 97,
    clue: "I'm one form, many refunds",
    answer: "1040",
    options: ["1040", "TAX FORM", "REFUND", "RETURN"],
    explanation: "Form 1040 is single form that can generate multiple year refunds."
  },
  {
    id: 98,
    clue: "You swipe for $99, but pay $109",
    answer: "SALES TAX",
    options: ["SALES TAX", "HIDDEN CHARGES", "PROCESSING FEE", "TAX"],
    explanation: "Sales tax adds to the base price, making final payment higher than displayed amount."
  },
  {
    id: 99,
    clue: "I protect you, not your ego",
    answer: "HEALTH INSURANCE",
    options: ["HEALTH INSURANCE", "LIFE INSURANCE", "TERM PLAN", "MEDICLAIM"],
    explanation: "Health insurance protects finances from medical costs, not personal pride."
  },
  {
    id: 100,
    clue: "I'm like a gym subscription for your wallet",
    answer: "BUDGET PLANNER",
    options: ["BUDGET PLANNER", "EXPENSE TRACKER", "FINANCIAK APP", "MONEY MANAGER"],
    explanation: "Budget planners require discipline like gym memberships to be effective."
  }
];

// FIRE Life Journey Game - Grid System (12 columns x 9 rows)
const GRID_COLS = 12;
const GRID_ROWS = 9;

// Life paths based on user profile
const lifePaths = [
  { id: 'corporate', name: 'Corporate Climber', color: 'blue' },
  { id: 'entrepreneur', name: 'Startup Hustler', color: 'purple' },
  { id: 'freelancer', name: 'Independent Creator', color: 'green' },
  { id: 'government', name: 'Stable Government Job', color: 'orange' }
];

// Initialize game grid with life scenarios
const initializeGameGrid = () => {
  const grid = Array(GRID_ROWS).fill(null).map(() => Array(GRID_COLS).fill(null));
  
  // Age progression: 22-60 across 12 columns (roughly 3 years per column)
  const ageRanges = [
    '22-24', '25-27', '28-30', '31-33', '34-36', '37-39', 
    '40-42', '43-45', '46-48', '49-51', '52-54', '55-60'
  ];
  
  // Major life decision points - Based on real American financial scenarios with branching paths
  const lifeScenarios = [
    {
      col: 0, row: 4, ageRange: '22-24', stage: 'First Job Reality',
      scenario: "🎓 You're 22, engineering graduate from state university. Real job market scenario.",
      question: "Your first job offer - what's your financial strategy?",
      options: [
        { text: "Microsoft/Google $95K package - Start 401k $500/month", impact: { income: 95000, savings: 6000, stability: 30 }, points: 25, path: 'corporate' },
        { text: "Silicon Valley startup $85K + equity - High living costs", impact: { income: 85000, expenses: 65000, growth: 40 }, points: 30, path: 'startup' },
        { text: "Family business $60K - Low expenses", impact: { income: 60000, expenses: 35000, family: 20 }, points: 15, path: 'family' }
      ]
    },
    // Corporate Path Scenarios
    {
      col: 1, row: 3, ageRange: '25-27', stage: 'Corporate Growth', path: 'corporate',
      scenario: "💼 You're at Microsoft/Google. Regular reviews, structured growth. Colleagues discussing promotion opportunities.",
      question: "How do you accelerate your corporate career?",
      options: [
        { text: "Target senior role - $140K salary opportunity", impact: { income: 140000, savings: 25000 }, points: 35 },
        { text: "Switch to FAANG company for higher pay", impact: { income: 125000, risk: 10 }, points: 25 },
        { text: "Stay and build expertise slowly", impact: { stability: 40, growth: 10 }, points: 20 }
      ]
    },
    // Startup Path Scenarios  
    {
      col: 1, row: 5, ageRange: '25-27', stage: 'Startup Hustle', path: 'startup',
      scenario: "🚀 Startup is growing fast. Series A funding happened. Your equity is worth $150K on paper.",
      question: "How do you handle startup volatility?",
      options: [
        { text: "Exercise stock options, diversify portfolio", impact: { investments: 150000, risk: -20 }, points: 40 },
        { text: "Hold all equity, bet on company growth", impact: { risk: 50, potential: 100 }, points: 35 },
        { text: "Switch to stable company, cash out", impact: { income: 110000, stability: 30 }, points: 25 }
      ]
    },
    // Family Business Path Scenarios
    {
      col: 1, row: 2, ageRange: '25-27', stage: 'Family Business Growth', path: 'family',
      scenario: "🏪 Family business is stable. You see opportunities to modernize and expand online.",
      question: "How do you grow the family business?",
      options: [
        { text: "Invest $25K in digital transformation", impact: { income: 25000, business: 40 }, points: 35 },
        { text: "Expand to new locations", impact: { income: 20000, risk: 25 }, points: 30 },
        { text: "Keep things steady, save money", impact: { savings: 30000, growth: -10 }, points: 20 }
      ]
    },
    {
      col: 1, row: 4, ageRange: '25-27', stage: 'Credit Card Trap',
      scenario: "💳 You got Chase/AmEx credit card. Friends upgrading lifestyle. Finance culture everywhere.",
      question: "How do you handle the credit temptation?",
      options: [
        { text: "Use only for points, pay full amount", impact: { creditScore: 50, discipline: 40 }, points: 40 },
        { text: "Buy iPhone on payment plan, manage payments", impact: { debt: 1200, lifestyle: 30, stress: 20 }, points: 15 },
        { text: "Avoid credit cards completely", impact: { creditScore: -10, safety: 30 }, points: 25 }
      ]
    },
    {
      col: 2, row: 4, ageRange: '28-30', stage: 'Education Loan Reality', 
      scenario: "📚 Stanford MBA calls for $200K fee. Friends doing MS for $150K. Current salary $105K.",
      question: "Education investment or continue working?",
      options: [
        { text: "Take student loan, do MBA", impact: { debt: 200000, income: 180000, prestige: 50 }, points: 35 },
        { text: "Upskill online, switch jobs", impact: { income: 125000, savings: 20000, practical: 40 }, points: 40 },
        { text: "Continue current job, save money", impact: { savings: 40000, growth: -10 }, points: 20 }
      ]
    },
    {
      col: 3, row: 4, ageRange: '31-33', stage: 'Marriage Financial Reality',
      scenario: "💒 Marriage talks begin. Family expects $40K wedding. Your savings: $75K. Partner earns $85K.",
      question: "How do you handle wedding finances?",
      options: [
        { text: "City hall + $5K reception, invest rest", impact: { expenses: 5000, savings: 70000, family: -20 }, points: 45 },
        { text: "Traditional wedding $35K, family contributes $15K", impact: { expenses: 35000, family: 30, debt: 0 }, points: 35 },
        { text: "Dream wedding $60K, take personal loan", impact: { expenses: 60000, debt: 25000, stress: 40 }, points: 10 }
      ]
    },
    {
      col: 4, row: 4, ageRange: '34-36', stage: 'Property vs investment Dilemma',
      scenario: "🏠 Austin 2BR condo costs $800K. Your savings: $200K. Rent: $2.5K. Home loan: $600K at 8.5%.",
      question: "The biggest financial decision of your life:",
      options: [
        { text: "Buy house: EMI $5.5K for 20 years", impact: { assets: 800000, debt: 600000, emi: 5500 }, points: 25 },
        { text: "Keep renting, investment $4K monthly", impact: { rent: 2500, sip: 4000, flexibility: 50 }, points: 40 },
        { text: "Buy with parents' money, no loan", impact: { assets: 800000, family: 60, independence: -30 }, points: 30 }
      ]
    },
    {
      col: 5, row: 4, ageRange: '37-39', stage: 'Child Education Planning',
      scenario: "👶 Baby arrives! School fees in Austin: $20K/year. Engineering costs $250K. Medical $1M.",
      question: "How do you prepare for child's future?",
      options: [
        { text: "Start child investment $2K, cut lifestyle", impact: { childSip: 2000, lifestyle: -20, planning: 60 }, points: 45 },
        { text: "Buy child insurance plans", impact: { insurance: 5000, safety: 40, returns: -10 }, points: 25 },
        { text: "Focus on current needs first", impact: { lifestyle: 30, future: -30, stress: 20 }, points: 15 }
      ]
    },
    {
      col: 6, row: 4, ageRange: '40-42', stage: 'Mid-Life Reality Check',
      scenario: "⚡ Portfolio: $1.2Cr. Parents aging, need $50K/month support. Child's college in 5 years.",
      question: "Multiple financial pressures - how do you prioritize?",
      options: [
        { text: "Continue aggressive investment, family adjusts", impact: { sip: 60000, family: -20, fire: 40 }, points: 35 },
        { text: "Support parents, reduce investments", impact: { family: 50, sip: -30000, fire: -20 }, points: 30 },
        { text: "Take home loan against portfolio", impact: { debt: 2000000, liquidity: 2000000, risk: 30 }, points: 25 }
      ]
    },
    {
      col: 8, row: 4, ageRange: '46-48', stage: 'Job Insecurity Phase',
      scenario: "😰 Company downsizing. Your $25K package at risk. Portfolio: $3Cr. Child in engineering.",
      question: "How do you handle career uncertainty?",
      options: [
        { text: "Take voluntary retirement, live off investments", impact: { fire: 60, income: -300000, freedom: 50 }, points: 45 },
        { text: "Find new job, continue building corpus", impact: { income: 200000, stress: 30, fire: 20 }, points: 35 },
        { text: "Start consulting business", impact: { income: 150000, independence: 40, risk: 25 }, points: 40 }
      ]
    },
    {
      col: 10, row: 4, ageRange: '52-54', stage: 'Healthcare Reality',
      scenario: "🏥 Father's bypass surgery: $8L. Mother's diabetes management: $30K/month ongoing.",
      question: "Healthcare costs eating into retirement funds:",
      options: [
        { text: "Use emergency fund, maintain investments", impact: { emergency: -800000, health: 60, fire: 10 }, points: 40 },
        { text: "Liquidate some investments", impact: { investments: -1500000, health: 60, tax: -200000 }, points: 30 },
        { text: "Take medical loan, preserve corpus", impact: { debt: 800000, fire: 30, stress: 30 }, points: 35 }
      ]
    }
  ];
  
  // Place scenarios on grid - make sure they're accessible
  lifeScenarios.forEach(scenario => {
    if (scenario.row < GRID_ROWS && scenario.col < GRID_COLS) {
      grid[scenario.row][scenario.col] = {
        type: 'decision',
        status: 'active', // Make all scenarios initially clickable for testing
        ...scenario
      };
    }
  });
  
  // Fill other cells with path tiles
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      if (!grid[row][col]) {
        grid[row][col] = {
          type: 'path',
          status: col === 0 ? 'active' : 'locked',
          ageRange: ageRanges[col],
          pathType: row < 2 ? 'high-growth' : row < 4 ? 'balanced' : row < 6 ? 'conservative' : 'risky'
        };
      }
    }
  }
  
  return grid;
};

const InvestmentPuzzles: React.FC = () => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'cryptic' | 'terms' | 'wordsearch' | 'matching' | 'ratios' | 'maze'>('dashboard');
  const [currentClue, setCurrentClue] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [dailyScore, setDailyScore] = useState(0);
  const [matchingPairs, setMatchingPairs] = useState<{[key: string]: string}>({});
  const [completedPuzzles, setCompletedPuzzles] = useState<string[]>([]);
  
  // FIRE Life Journey Game state
  const [gameGrid, setGameGrid] = useState(() => initializeGameGrid());
  const [playerPosition, setPlayerPosition] = useState({ col: 0, row: 4 });
  const [currentScenario, setCurrentScenario] = useState<any>(null);
  const [playerChoices, setPlayerChoices] = useState<{[key: string]: any}>({});
  const [journeyCompleted, setJourneyCompleted] = useState(false);
  const [totalLifePoints, setTotalLifePoints] = useState(0);
  const [fireScore, setFireScore] = useState(0);
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);
  const [playerProfile, setPlayerProfile] = useState({
    profession: 'Engineer',
    familySupport: 'Supportive',
    startingSalary: 66000, // Realistic annual starting salary for American engineering graduate
    financialHabits: 'Balanced',
    educationLoan: false
  });
  const [financialStats, setFinancialStats] = useState({
    age: 22,
    netWorth: 0,
    monthlyIncome: 5500, // Realistic starting salary for fresh graduate ($66K annually)
    monthlyExpenses: 3500, // Living with roommates or family support
    investments: 0,
    debt: 0,
    emergencyFund: 0,
    stress: 10,
    happiness: 50,
    fireProgress: 0
  });
  
  // Word Search state
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<{row: number, col: number}[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showWordDefinition, setShowWordDefinition] = useState<string | null>(null);
  
  // Term matching state
  const [draggedTerm, setDraggedTerm] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<{[key: string]: string}>({});
  
  // Financial ratios state
  const [currentRatio, setCurrentRatio] = useState(0);
  const [ratioAnswer, setRatioAnswer] = useState('');

  // FIRE Life Journey Game functions
  const handleGridMove = (col: number, row: number) => {
    console.log('Grid clicked:', col, row);
    if (col < 0 || col >= GRID_COLS || row < 0 || row >= GRID_ROWS) return;
    
    const tile = gameGrid[row][col];
    console.log('Tile:', tile);
    if (!tile) return;
    
    // Allow movement to any active tile
    if (tile.status === 'locked') {
      console.log('Tile is locked');
      return;
    }
    
    console.log('Moving to position:', col, row);
    setPlayerPosition({ col, row });
    
    // Check if this is a decision point that hasn't been completed
    if (tile.type === 'decision' && !playerChoices[`${col}-${row}`]) {
      console.log('Opening scenario:', tile);
      setCurrentScenario(tile);
    }
    
    // Check if reached final column (age 60)
    if (col >= GRID_COLS - 1) {
      setJourneyCompleted(true);
      calculateFinalFIREStatus();
    }
  };

  const handleDecisionChoice = (choice: any) => {
    if (!currentScenario) return;
    
    const choiceKey = `${currentScenario.col}-${currentScenario.row}`;
    const newChoices = { ...playerChoices, [choiceKey]: choice };
    setPlayerChoices(newChoices);
    setTotalLifePoints(prev => prev + choice.points);
    
    // Apply financial impact with American market salary progression
    setFinancialStats(prev => {
      const newStats = { ...prev };
      
      // Apply choice impacts
      Object.entries(choice.impact).forEach(([key, value]: [string, any]) => {
        if (key in newStats) {
          newStats[key as keyof typeof newStats] = 
            Math.max(0, (newStats[key as keyof typeof newStats] as number) + value);
        }
      });
      
      // Update age and apply realistic American salary progression
      const ageMap = {
        '22-24': 23, '25-27': 26, '28-30': 29, '31-33': 32,
        '34-36': 35, '37-39': 38, '40-42': 41, '43-45': 44,
        '46-48': 47, '49-51': 50, '52-54': 53, '55-60': 57
      };
      const newAge = ageMap[currentScenario.ageRange as keyof typeof ageMap] || newStats.age;
      const yearsProgressed = newAge - newStats.age;
      
      // Apply American market salary hikes (3-7% annually based on industry)
      if (yearsProgressed > 0) {
        let annualHikeRate = 0.05; // Default 5% for typical American career progression
        
        // Adjust hike rate based on career path and experience
        if (newStats.monthlyIncome < 8000) {
          annualHikeRate = 0.07; // Higher hikes in early career (7%)
        } else if (newStats.monthlyIncome > 20000) {
          annualHikeRate = 0.03; // Slower growth at senior levels (3%)
        }
        
        // Apply compound growth for salary
        for (let i = 0; i < yearsProgressed; i++) {
          newStats.monthlyIncome = Math.round(newStats.monthlyIncome * (1 + annualHikeRate));
        }
      }
      
      newStats.age = newAge;
      
      // Apply American inflation to expenses (3% annually)
      if (yearsProgressed > 0) {
        for (let i = 0; i < yearsProgressed; i++) {
          newStats.monthlyExpenses = Math.round(newStats.monthlyExpenses * 1.03);
        }
      }
      
      // Auto-calculate net worth based on savings and investments
      const yearlySavings = (newStats.monthlyIncome - newStats.monthlyExpenses) * 12;
      if (yearlySavings > 0) {
        // American equity market returns: 7% annually (long-term S&P 500 average)
        const investmentGrowth = newStats.investments * 0.07 * yearsProgressed;
        newStats.netWorth += yearlySavings * yearsProgressed + investmentGrowth;
        newStats.investments += yearlySavings * yearsProgressed;
      }
      
      // Calculate FIRE progress (4% withdrawal rule: need 25x annual expenses)
      const annualExpenses = newStats.monthlyExpenses * 12;
      const fireTarget = annualExpenses * 25; // 4% withdrawal rule
      newStats.fireProgress = Math.min(100, (newStats.netWorth / fireTarget) * 100);
      
      return newStats;
    });
    
    // Unlock next column tiles based on chosen path
    unlockNextTiles(currentScenario.col + 1, choice.path);
    setCurrentScenario(null);
    setScore(prev => prev + Math.max(choice.points, 0));
  };

  const unlockNextTiles = (nextCol: number, chosenPath?: string) => {
    if (nextCol >= GRID_COLS) return;
    
    setGameGrid(prev => {
      const newGrid = prev.map(row => [...row]);
      
      // Unlock different paths based on previous choices
      if (chosenPath === 'corporate') {
        // Corporate path: rows 2-4 (stable, predictable growth)
        for (let row = 2; row <= 4; row++) {
          if (newGrid[row][nextCol]) {
            newGrid[row][nextCol] = { ...newGrid[row][nextCol], status: 'active' };
          }
        }
      } else if (chosenPath === 'startup') {
        // Startup path: rows 3-6 (higher risk, higher reward)
        for (let row = 3; row <= 6; row++) {
          if (newGrid[row][nextCol]) {
            newGrid[row][nextCol] = { ...newGrid[row][nextCol], status: 'active' };
          }
        }
      } else if (chosenPath === 'family') {
        // Family business path: rows 1-3 (conservative, stable)
        for (let row = 1; row <= 3; row++) {
          if (newGrid[row][nextCol]) {
            newGrid[row][nextCol] = { ...newGrid[row][nextCol], status: 'active' };
          }
        }
      } else {
        // Default: unlock all paths in next column
        for (let row = 0; row < GRID_ROWS; row++) {
          if (newGrid[row][nextCol]) {
            newGrid[row][nextCol] = { ...newGrid[row][nextCol], status: 'active' };
          }
        }
      }
      
      return newGrid;
    });
  };

  const calculateFinalFIREStatus = () => {
    const { netWorth, age, debt } = financialStats;
    let fireStatus = "Working Till 60";
    
    if (netWorth >= 50000000 && debt === 0) {
      fireStatus = "Fat FIRE Legend";
      setFireScore(100);
    } else if (netWorth >= 25000000) {
      fireStatus = "FIRE Achieved";
      setFireScore(85);
    } else if (netWorth >= 15000000) {
      fireStatus = "Lean FIRE";
      setFireScore(70);
    } else if (netWorth >= 10000000) {
      fireStatus = "Coast FIRE";
      setFireScore(60);
    }
    
    setFinancialStats(prev => ({ ...prev, fireStatus }));
  };

  const resetJourney = () => {
    setShowWelcomeAnimation(true);
    setTimeout(() => {
      setGameGrid(initializeGameGrid());
      setPlayerPosition({ col: 0, row: 4 });
      setJourneyCompleted(false);
      setCurrentScenario(null);
      setPlayerChoices({});
      setTotalLifePoints(0);
      setFireScore(0);
      setFinancialStats({
        age: 22,
        netWorth: 0,
        monthlyIncome: 50000,
        monthlyExpenses: 25000,
        investments: 0,
        debt: 0,
        emergencyFund: 0,
        stress: 10,
        happiness: 50,
        fireProgress: 0
      });
      setShowWelcomeAnimation(false);
    }, 2000);
  };

  // No welcome animation on tab entry
  const [ratioResults, setRatioResults] = useState<boolean[]>([]);
  const [wordSearchGrid, setWordSearchGrid] = useState<string[]>([]);
  const [foundWord, setFoundWord] = useState<string>('');

  // Generate Word Search Grid
  React.useEffect(() => {
    if (activeTab === 'wordsearch') {
      const generateGrid = () => {
        const gridSize = 100; // 10x10 grid
        const target = 'INVEST';
        let cells = [];
        
        // Fill with random letters
        for (let i = 0; i < gridSize; i++) {
          cells.push(String.fromCharCode(65 + Math.floor(Math.random() * 26)));
        }
        
        // Place "INVEST" horizontally at random position
        const row = Math.floor(Math.random() * 8); // Leave room for word
        const startCol = Math.floor(Math.random() * (10 - target.length));
        for (let i = 0; i < target.length; i++) {
          cells[row * 10 + startCol + i] = target[i];
        }
        
        setWordSearchGrid(cells);
      };
      
      generateGrid();
    }
  }, [activeTab]);

  // Show Dashboard first when entering Investment Puzzles
  if (activeTab === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">Financial Investment Puzzles</h1>
                  <p className="text-gray-600 text-sm mb-2">Master American financial markets through interactive learning</p>
                  <div className="flex items-center gap-1 text-orange-600 text-sm">
                    <span>• Daily Challenge: Complete puzzles to earn bonus points!</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-50 rounded-xl px-4 py-3 text-center min-w-20">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Trophy className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-600">Score</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{score}</div>
                </div>
                <div className="bg-orange-50 rounded-xl px-4 py-3 text-center min-w-20">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Zap className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-gray-600">Streak</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">{streak}</div>
                </div>
              </div>
            </div>

            {/* Compact Progress Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-base font-bold text-gray-900 mb-2">Learning Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Puzzles Completed</span>
                    <span className="font-bold">{completedPuzzles.length}/6</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(completedPuzzles.length / 6) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">Keep learning!</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-base font-bold text-gray-900 mb-2">Total Score</h3>
                <div className="text-3xl font-bold text-blue-500 mb-1">{score}</div>
                <p className="text-sm text-gray-600 mb-1">points earned</p>
                <p className="text-sm text-gray-500">Getting Started! ⛰️</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-base font-bold text-gray-900 mb-2">Current Streak</h3>
                <div className="text-3xl font-bold text-orange-500 mb-1">{streak}</div>
                <p className="text-sm text-gray-600 mb-1">correct answers</p>
                <p className="text-sm text-gray-500">Keep Going! 😊</p>
              </div>
            </div>
          </div>

          {/* Puzzle Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Cryptic Clues */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-purple-200 cursor-pointer hover:shadow-md transition-all"
              onClick={() => setActiveTab('cryptic')}
            >
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                <div className="w-6 h-6 text-white font-bold text-lg">?</div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cryptic Clues</h3>
              <p className="text-sm text-gray-600 mb-3">Decode financial hints and discover American market secrets</p>
            </motion.div>

            {/* Market Terms */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-green-200 cursor-pointer hover:shadow-md transition-all"
              onClick={() => setActiveTab('terms')}
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Market Terms</h3>
              <p className="text-sm text-gray-600 mb-3">Learn essential financial vocabulary</p>
            </motion.div>

            {/* Word Search */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-blue-200 cursor-pointer hover:shadow-md transition-all"
              onClick={() => setActiveTab('wordsearch')}
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Word Search</h3>
              <p className="text-sm text-gray-600 mb-3">Find hidden investment terms in puzzles</p>
            </motion.div>

            {/* Term Matching */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-red-200 cursor-pointer hover:shadow-md transition-all"
              onClick={() => setActiveTab('matching')}
            >
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Term Matching</h3>
              <p className="text-sm text-gray-600 mb-3">Connect financial concepts with definitions</p>
            </motion.div>

            {/* Financial Ratios */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-pink-200 cursor-pointer hover:shadow-md transition-all"
              onClick={() => setActiveTab('ratios')}
            >
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Financial Ratios</h3>
              <p className="text-sm text-gray-600 mb-3">Master investment calculations and analysis</p>
            </motion.div>

            {/* Investment Maze */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-200 cursor-pointer hover:shadow-md transition-all"
              onClick={() => setActiveTab('maze')}
            >
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mb-4">
                <Puzzle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Investment Maze</h3>
              <p className="text-sm text-gray-600 mb-3">Navigate through life's financial decisions</p>
            </motion.div>
          </div>



          {/* Learning Tips Section */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-bold text-gray-900">Learning Tips</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p>• Start with <strong>Cryptic Clues</strong> to learn basic terms</p>
                <p>• Practice <strong>Market Terms</strong> for vocabulary building</p>
                <p>• Try the <strong>Investment Maze</strong> for real-life scenarios</p>
              </div>
              <div>
                <p>• Complete daily challenges for bonus points</p>
                <p>• Maintain streaks for higher scores</p>
                <p>• Each game teaches different financial skills</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Investment Puzzles & Financial Games - Interactive Learning for Smart Investing"
        description="Master investment concepts through interactive puzzles, financial games, and educational challenges. Learn stock market fundamentals, portfolio management, and investment strategies through gamification."
        keywords="investment puzzles, financial games, investment learning games, stock market puzzles, financial education games, investment strategy games, portfolio management games, financial literacy games"
        canonical="https://dollarmento.com/investment-puzzles"
      />
      <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 p-4 rounded-2xl shadow-lg mb-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {activeTab === 'cryptic' && 'Cryptic Clues'}
                  {activeTab === 'terms' && 'Market Terms'}
                  {activeTab === 'wordsearch' && 'Word Search'}
                  {activeTab === 'matching' && 'Term Matching'}
                  {activeTab === 'ratios' && 'Financial Ratios'}
                  {activeTab === 'maze' && 'Investment Maze'}
                </h1>
                <p className="text-sm text-gray-600">Master US financial markets through interactive learning</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Score: {score}</span>
                </div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-semibold text-gray-700">Streak: {streak}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Game Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Cryptic Clues Game */}
          {activeTab === 'cryptic' && (
            <div className="space-y-4">
              <motion.div
                key={currentClue}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-purple-50 p-4 rounded-xl border border-purple-200"
              >
                <div className="text-center mb-4">
                  <div className="text-xs text-gray-500 mb-1">Question {currentClue + 1} of {crypticClues.length}</div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">{crypticClues[currentClue]?.clue}</h4>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {crypticClues[currentClue]?.options.map((option, index) => {
                    let buttonClass = 'p-3 rounded-lg border-2 transition-all text-sm ';
                    
                    if (showResult) {
                      if (option === crypticClues[currentClue]?.answer) {
                        // Correct answer - green highlight
                        buttonClass += 'border-green-500 bg-green-100 text-green-800';
                      } else if (selectedAnswer === option) {
                        // Wrong answer that was selected - red highlight
                        buttonClass += 'border-red-500 bg-red-100 text-red-800';
                      } else {
                        // Other options when result is shown
                        buttonClass += 'border-gray-300 bg-gray-50 text-gray-500';
                      }
                    } else {
                      // Before answer is submitted
                      if (selectedAnswer === option) {
                        buttonClass += 'border-purple-500 bg-purple-100 text-purple-800';
                      } else {
                        buttonClass += 'border-gray-300 bg-white hover:border-purple-300 hover:bg-purple-50';
                      }
                    }

                    return (
                      <motion.button
                        key={index}
                        onClick={() => {
                          if (!showResult) {
                            setSelectedAnswer(option);
                            // Auto-submit answer after selection
                            setTimeout(() => {
                              const isCorrect = option === crypticClues[currentClue]?.answer;
                              if (isCorrect) {
                                setScore(score + 10);
                                setStreak(streak + 1);
                              } else {
                                setStreak(0);
                              }
                              setShowResult(true);
                            }, 200);
                          }
                        }}
                        className={buttonClass}
                        whileHover={{ scale: showResult ? 1 : 1.02 }}
                        whileTap={{ scale: showResult ? 1 : 0.98 }}
                        disabled={showResult}
                      >
                        {option}
                      </motion.button>
                    );
                  })}
                </div>

                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`mt-4 p-3 rounded-lg ${
                      selectedAnswer === crypticClues[currentClue]?.answer
                        ? 'bg-green-100 border border-green-300'
                        : 'bg-red-100 border border-red-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {selectedAnswer === crypticClues[currentClue]?.answer ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`font-bold text-sm ${
                        selectedAnswer === crypticClues[currentClue]?.answer ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {selectedAnswer === crypticClues[currentClue]?.answer ? 'Correct!' : 'Incorrect!'}
                      </span>
                    </div>
                    {selectedAnswer !== crypticClues[currentClue]?.answer && (
                      <p className="text-xs text-red-700 mb-2">
                        The correct answer is: <span className="font-semibold">{crypticClues[currentClue]?.answer}</span>
                      </p>
                    )}
                    <p className="text-xs text-gray-700 mb-3">{crypticClues[currentClue]?.explanation}</p>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-4">
                  <Button 
                    onClick={() => {
                      if (currentClue > 0) {
                        setCurrentClue(currentClue - 1);
                        setSelectedAnswer('');
                        setShowResult(false);
                      }
                    }}
                    disabled={currentClue === 0}
                    variant="outline"
                    size="sm"
                  >
                    ← Previous
                  </Button>
                  
                  <Button 
                    onClick={() => setActiveTab('dashboard')}
                    variant="outline"
                    size="sm"
                  >
                    Dashboard
                  </Button>

                  <Button 
                    onClick={() => {
                      if (currentClue < crypticClues.length - 1) {
                        setCurrentClue(currentClue + 1);
                      } else {
                        setCurrentClue(0);
                      }
                      setSelectedAnswer('');
                      setShowResult(false);
                    }}
                    size="sm"
                  >
                    {currentClue < crypticClues.length - 1 ? 'Next →' : 'Start Over'}
                  </Button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Investment Maze Game */}
          {activeTab === 'maze' && (
            <div className="space-y-4">


              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 p-4 rounded-xl border border-blue-200"
              >
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">🎯 Financial Independence Calculator</h3>
                  <p className="text-sm text-gray-600 mb-3">See if your financial decisions will make you financially independent by age 60</p>
                  
                  {/* Compact Goal Section */}
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-left">
                    <h4 className="font-bold text-green-800 mb-1 text-sm">🎯 YOUR GOAL:</h4>
                    <p className="text-xs text-green-700 mb-2">
                      Build a $5 Million portfolio by age 60 so you never have to worry about money again.
                    </p>
                    
                    <h4 className="font-bold text-green-800 mb-1 text-sm">📈 WHAT YOU'LK LEARN:</h4>
                    <div className="text-xs text-green-700 space-y-0.5">
                      <div>• How your first job choice affects your entire financial future</div>
                      <div>• Whether buying vs renting makes you richer</div>
                      <div>• How much you need to save monthly to retire comfortably</div>
                      <div>• What happens when emergencies hit your savings</div>
                    </div>
                    
                    <h4 className="font-bold text-green-800 mb-1 mt-2 text-sm">📊 HOW IT WORKS:</h4>
                    <div className="text-xs text-green-700">
                      Make 8 major life decisions → See your money grow in real time → Get your Financial Independence score
                    </div>
                  </div>
                </div>

                {/* Compact FIRE Stats Dashboard */}
                <div className="grid grid-cols-5 gap-2 mb-3">
                  <div className="bg-blue-50 p-2 rounded border text-center">
                    <div className="text-xs text-gray-600">Age</div>
                    <div className="font-bold text-blue-700 text-lg">{financialStats.age}</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded border text-center">
                    <div className="text-xs text-gray-600">Net Worth</div>
                    <div className="font-bold text-green-700 text-sm">
                      {financialStats.netWorth >= 1000000 
                        ? `$${(financialStats.netWorth / 1000000).toFixed(1)}M`
                        : `$${(financialStats.netWorth / 1000).toFixed(0)}K`}
                    </div>
                  </div>
                  <div className="bg-purple-50 p-2 rounded border text-center">
                    <div className="text-xs text-gray-600">Income</div>
                    <div className="font-bold text-purple-700 text-sm">${(financialStats.monthlyIncome / 1000).toFixed(0)}K</div>
                  </div>
                  <div className="bg-orange-50 p-2 rounded border text-center">
                    <div className="text-xs text-gray-600">FIRE Score</div>
                    <div className="font-bold text-orange-700 text-lg">{fireScore}%</div>
                  </div>
                  <div className="bg-red-50 p-2 rounded border text-center">
                    <div className="text-xs text-gray-600">Life Points</div>
                    <div className="font-bold text-red-700 text-lg">{totalLifePoints}</div>
                  </div>
                </div>

                {/* Age Timeline Header */}
                <div className="bg-white p-2 rounded-lg border mb-2">
                  <div className="grid grid-cols-12 gap-1 text-xs text-center font-medium text-gray-600">
                    <div>22-24</div><div>25-27</div><div>28-30</div><div>31-33</div>
                    <div>34-36</div><div>37-39</div><div>40-42</div><div>43-45</div>
                    <div>46-48</div><div>49-51</div><div>52-54</div><div>55-60</div>
                  </div>
                </div>

                {/* FIRE Life Journey Grid */}
                <div className="bg-white p-3 rounded-lg border mb-4 overflow-x-auto">
                  <div className="grid grid-cols-12 gap-1 min-w-[700px]">
                    {gameGrid.map((row, rowIndex) =>
                      row.map((tile, colIndex) => {
                        const isPlayer = playerPosition.col === colIndex && playerPosition.row === rowIndex;
                        const isDecision = tile?.type === 'decision';
                        const isActive = tile?.status === 'active';
                        const isLocked = tile?.status === 'locked';
                        const isCompleted = tile && playerChoices[`${colIndex}-${rowIndex}`];
                        
                        return (
                          <button
                            key={`${colIndex}-${rowIndex}`}
                            onClick={() => {
                              console.log('Clicked tile:', colIndex, rowIndex, tile);
                              handleGridMove(colIndex, rowIndex);
                            }}
                            className={`
                              w-12 h-12 text-xs font-bold rounded border-2 transition-all relative flex items-center justify-center
                              ${isLocked ? 'bg-gray-200 border-gray-300 cursor-not-allowed opacity-50' : ''}
                              ${isActive && !isDecision ? 'bg-blue-50 border-blue-300 hover:bg-blue-100 cursor-pointer' : ''}
                              ${isDecision && isActive && !isCompleted ? 'bg-yellow-100 border-yellow-400 hover:bg-yellow-200 cursor-pointer animate-pulse' : ''}
                              ${isDecision && isCompleted ? 'bg-green-100 border-green-400' : ''}
                              ${isPlayer ? 'ring-4 ring-purple-400 ring-opacity-75 scale-110' : ''}
                            `}
                            disabled={isLocked}
                          >
                            {isPlayer ? '🧑‍💼' : ''}
                            {!isPlayer && isDecision && !isCompleted ? '⚡' : ''}
                            {!isPlayer && isDecision && isCompleted ? '✅' : ''}
                            {!isPlayer && isActive && !isDecision ? '📍' : ''}
                            {!isPlayer && isLocked ? '🔒' : ''}
                            
                            {/* Next Decision Indicator */}
                            {!isPlayer && isDecision && !isCompleted && colIndex === Object.keys(playerChoices).length && (
                              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                                !
                              </div>
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                  
                  {/* Enhanced Legend with Path Colors */}
                  <div className="bg-gray-50 p-3 rounded-lg mt-3">
                    <h5 className="font-semibold text-gray-800 text-center mb-2">🗺️ Career Paths & Symbols:</h5>
                    
                    {/* Path Legend */}
                    <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                      <div className="bg-blue-50 p-2 rounded border">
                        <span className="font-semibold text-blue-700">💼 Corporate Path</span>
                        <div className="text-blue-600">Stable growth, predictable hikes</div>
                      </div>
                      <div className="bg-purple-50 p-2 rounded border">
                        <span className="font-semibold text-purple-700">🚀 Startup Path</span>
                        <div className="text-purple-600">High risk, high reward</div>
                      </div>
                      <div className="bg-green-50 p-2 rounded border">
                        <span className="font-semibold text-green-700">🏪 Family Business</span>
                        <div className="text-green-600">Conservative, stable</div>
                      </div>
                    </div>
                    
                    {/* Symbol Legend */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🧑‍💼</span>
                        <span><strong>You</strong> - Your current position</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">⚡</span>
                        <span><strong>Decision Point</strong> - Click to choose</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">✅</span>
                        <span><strong>Completed</strong> - Decision made</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🔒</span>
                        <span><strong>Locked</strong> - Different career path</span>
                      </div>
                    </div>
                    
                    <div className="text-center mt-2 text-xs text-orange-600 font-medium">
                      🎯 Your first choice determines which career path unlocks next!
                    </div>
                  </div>
                </div>

                {/* Compact Popup Modal */}
                {currentScenario && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
                    >
                      {/* Compact Header */}
                      <div className="p-4 border-b">
                        <h2 className="text-lg font-bold text-gray-800 mb-1">{currentScenario.stage} (Age {currentScenario.ageRange})</h2>
                        <p className="text-sm text-gray-600 mb-2">🎓 {currentScenario.scenario}</p>
                        <h3 className="text-base font-semibold text-gray-800">{currentScenario.question}</h3>
                      </div>

                      {/* Compact Educational Content */}
                      <div className="p-4 border-b bg-blue-50">
                        <h4 className="flex items-center gap-1 font-semibold text-blue-800 mb-2 text-sm">
                          💡 <span>What You Need to Know:</span>
                        </h4>
                        <div className="text-xs text-blue-700 space-y-1">
                          <div>• <strong>Microsoft/Google:</strong> Safe choice, predictable 8-12% annual raises, good for learning basics</div>
                          <div>• <strong>Startup:</strong> Higher risk but potential for 30-60% salary jumps if successful</div>
                          <div>• <strong>Family Business:</strong> Lower income but minimal expenses, good work-life balance</div>
                          <div>• <strong>Investment Impact:</strong> $500 monthly investment for 38 years = $1.2M (assuming 7% returns)</div>
                        </div>
                      </div>

                      {/* Compact Choice Selection */}
                      <div className="p-4">
                        <h4 className="flex items-center gap-1 font-semibold text-gray-800 mb-3 text-sm">
                          🎯 <span>Choose Your Path:</span>
                        </h4>
                        
                        <div className="space-y-2">
                          {currentScenario.options.map((option: any, index: number) => (
                            <button
                              key={index}
                              onClick={() => handleDecisionChoice(option)}
                              className="w-full p-3 text-left bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all group"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="font-medium text-gray-800 text-sm mb-1">{option.text}</div>
                                  <div className="text-xs text-gray-600">
                                    Impact: {Object.entries(option.impact).map(([key, value]) => 
                                      `${key}: ${(value as number) > 0 ? '+' : ''}${value}`
                                    ).join(' • ')}
                                  </div>
                                </div>
                                <span className="text-xs font-bold text-white bg-green-500 px-2 py-1 rounded ml-3">
                                  +{option.points}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Clear Next Step with Progress */}
                {!currentScenario && !journeyCompleted && (
                  <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                    <div className="text-center">
                      <h4 className="font-bold text-orange-800 text-lg mb-3">🚀 YOUR NEXT DECISION</h4>
                      
                      {/* Progress Indicator */}
                      <div className="mb-4">
                        <div className="text-sm text-orange-700 mb-2">
                          Progress: {Object.keys(playerChoices).length} of 8 major life decisions completed
                        </div>
                        <div className="w-full bg-orange-200 rounded-full h-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${(Object.keys(playerChoices).length / 8) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {Object.keys(playerChoices).length === 0 ? (
                        <>
                          <p className="text-orange-700 mb-4">
                            You're 22, just graduated from engineering college. Time to make your first financial decision!
                          </p>
                          
                          <button
                            onClick={() => {
                              const firstScenario = {
                                col: 0, row: 4, ageRange: '22-24', stage: 'First Job Reality',
                                scenario: "🎓 You're 22, engineering graduate from state university. Real job market scenario.",
                                question: "Your first job offer - what's your financial strategy?",
                                options: [
                                  { text: "Microsoft/Google $95K package - Start 401k $500/month", impact: { income: 95000, savings: 6000, stability: 30 }, points: 25 },
                                  { text: "Silicon Valley startup $85K + equity - High living costs", impact: { income: 85000, expenses: 65000, growth: 40 }, points: 30 },
                                  { text: "Family business $60K - Low expenses", impact: { income: 60000, expenses: 35000, family: 20 }, points: 15 }
                                ]
                              };
                              setCurrentScenario(firstScenario);
                            }}
                            className="bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 text-lg font-semibold shadow-lg animate-pulse"
                          >
                            🎯 START: CHOOSE YOUR FIRST JOB
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="text-orange-700 mb-4">
                            Great progress! Click on the next <span className="bg-yellow-200 px-2 py-1 rounded font-semibold">⚡ lightning bolt</span> in the game board above to continue your journey.
                          </p>
                          <div className="text-sm text-orange-600">
                            Each yellow lightning bolt represents a major life decision that will impact your path to $5 Million!
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Journey Summary */}
                {journeyCompleted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 p-4 rounded-lg border border-green-200 text-center"
                  >
                    <h3 className="text-lg font-bold text-green-800 mb-2">🎉 Financial Journey Complete!</h3>
                    <p className="text-sm text-gray-700 mb-3">
                      Final Net Worth: ${(financialStats.netWorth / 100000).toFixed(1)}K | Life Points: {totalLifePoints}
                    </p>
                    <p className="text-xs text-green-600 mb-3">
                      FIRE Score: {fireScore}% | Final Age: {financialStats.age}
                    </p>
                    <Button onClick={resetJourney} size="sm">
                      Start New Journey
                    </Button>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-4">
                  <Button 
                    onClick={() => setActiveTab('dashboard')}
                    variant="outline"
                    size="sm"
                  >
                    Dashboard
                  </Button>
                  
                  <Button 
                    onClick={resetJourney}
                    variant="outline"
                    size="sm"
                  >
                    Reset Journey
                  </Button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Market Terms Flashcards */}
          {activeTab === 'terms' && (
            <MarketTermsFlashcards />
          )}

          {/* Term Matching */}
          {activeTab === 'matching' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🔗 Term Matching</h2>
              <p className="text-gray-600 mb-6">Select the correct definition for each term</p>
              
              <div className="space-y-4">
                {[
                  { term: "Inflation", correct: "General increase in prices", options: ["General increase in prices", "Ownership in company", "Fixed income investment"] },
                  { term: "Stock", correct: "Ownership in company", options: ["General increase in prices", "Ownership in company", "Government bond"] },
                  { term: "Mutual Fund", correct: "Pooled investment vehicle", options: ["Individual stock", "Pooled investment vehicle", "Bank deposit"] },
                  { term: "investment", correct: "Systematic Investment Plan", options: ["Stock Investment Portfolio", "Systematic Investment Plan", "Savings Interest Program"] }
                ].map((match, index) => (
                  <div key={index} className="bg-white border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">{match.term}</span>
                      <select 
                        className="border rounded px-3 py-2 text-sm"
                        onChange={(e) => {
                          const isCorrect = e.target.value === match.correct;
                          const parentElement = e.target.parentElement?.parentElement as HTMLElement;
                          if (parentElement) {
                            parentElement.style.backgroundColor = isCorrect ? '#d4edda' : '#f8d7da';
                          }
                        }}
                      >
                        <option value="">Select definition...</option>
                        {match.options.map((option, optIndex) => (
                          <option key={optIndex} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Financial Ratios Calculator */}
          {activeTab === 'ratios' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📈 Financial Ratios Calculator</h2>
              <p className="text-gray-600 mb-6">Calculate various financial ratios for banking, investing, and business analysis</p>
              
              {/* Ratio Selection Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { id: 'liquidity', name: 'Liquidity Ratios', icon: '💧' },
                  { id: 'profitability', name: 'Profitability Ratios', icon: '💰' },
                  { id: 'valuation', name: 'Stock Valuation', icon: '📊' },
                  { id: 'debt', name: 'Debt & Leverage', icon: '⚖️' },
                  { id: 'efficiency', name: 'Efficiency Ratios', icon: '⚡' },
                  { id: 'banking', name: 'Banking Ratios', icon: '🏦' },
                  { id: 'market', name: 'Market Ratios', icon: '📈' },
                  { id: 'growth', name: 'Growth Ratios', icon: '🚀' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      (window as any).selectedRatioTab = tab.id;
                      document.querySelectorAll('[data-ratio-tab]').forEach(el => el.classList.add('hidden'));
                      document.querySelector(`[data-ratio-tab="${tab.id}"]`)?.classList.remove('hidden');
                      // Update button styles
                      document.querySelectorAll('.ratio-tab-btn').forEach(btn => {
                        btn.className = 'ratio-tab-btn px-4 py-2 rounded-lg text-sm font-medium transition-all bg-gray-100 text-gray-700 hover:bg-gray-200';
                      });
                      (event?.target as HTMLElement).className = 'ratio-tab-btn px-4 py-2 rounded-lg text-sm font-medium transition-all bg-blue-600 text-white';
                    }}
                    className="ratio-tab-btn px-4 py-2 rounded-lg text-sm font-medium transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    {tab.icon} {tab.name}
                  </button>
                ))}
              </div>

              {/* Liquidity Ratios */}
              <div data-ratio-tab="liquidity" className="bg-gray-100 border rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-700 mb-4">💧 Liquidity Ratios</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Assets ($)</label>
                      <input type="number" id="currentAssets" className="w-full border rounded px-3 py-2" placeholder="1,200,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Liabilities ($)</label>
                      <input type="number" id="currentLiabilities" className="w-full border rounded px-3 py-2" placeholder="800,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Inventory ($)</label>
                      <input type="number" id="inventory" className="w-full border rounded px-3 py-2" placeholder="200,000" />
                    </div>
                    <button onClick={() => {
                      const assets = parseFloat((document.getElementById('currentAssets') as HTMLInputElement)?.value || '0');
                      const liabilities = parseFloat((document.getElementById('currentLiabilities') as HTMLInputElement)?.value || '0');
                      const inventory = parseFloat((document.getElementById('inventory') as HTMLInputElement)?.value || '0');
                      
                      const currentRatio = (assets / liabilities).toFixed(2);
                      const quickRatio = ((assets - inventory) / liabilities).toFixed(2);
                      
                      const resultDiv = document.getElementById('liquidityResults');
                      if (resultDiv) {
                        resultDiv.innerHTML = `
                          <p class="font-semibold text-blue-700">Calculated Ratios:</p>
                          <p><strong>Current Ratio:</strong> ${currentRatio}</p>
                          <p><strong>Quick Ratio:</strong> ${quickRatio}</p>
                          <p class="text-xs mt-2 ${parseFloat(currentRatio) >= 1.5 ? 'text-green-600' : 'text-red-600'}">
                            ${parseFloat(currentRatio) >= 1.5 ? 'Good liquidity position' : 'Liquidity may be tight'}
                          </p>
                        `;
                      }
                    }} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                      Calculate Liquidity Ratios
                    </button>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div id="liquidityResults" className="space-y-2 text-sm">
                      <p className="text-gray-600">Enter values and click calculate</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profitability Ratios */}
              <div data-ratio-tab="profitability" className="bg-gray-100 border rounded-lg p-6 hidden">
                <h3 className="text-lg font-bold text-green-700 mb-4">💰 Profitability Ratios</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Net Income ($)</label>
                      <input type="number" id="netIncome" className="w-full border rounded px-3 py-2" placeholder="500,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Revenue/Sales ($)</label>
                      <input type="number" id="revenue" className="w-full border rounded px-3 py-2" placeholder="2,500,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Assets ($)</label>
                      <input type="number" id="totalAssets" className="w-full border rounded px-3 py-2" placeholder="5,000,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Shareholders Equity ($)</label>
                      <input type="number" id="equity" className="w-full border rounded px-3 py-2" placeholder="3,000,000" />
                    </div>
                    <button onClick={() => {
                      const netIncome = parseFloat((document.getElementById('netIncome') as HTMLInputElement)?.value || '0');
                      const revenue = parseFloat((document.getElementById('revenue') as HTMLInputElement)?.value || '0');
                      const totalAssets = parseFloat((document.getElementById('totalAssets') as HTMLInputElement)?.value || '0');
                      const equity = parseFloat((document.getElementById('equity') as HTMLInputElement)?.value || '0');
                      
                      const netMargin = ((netIncome / revenue) * 100).toFixed(2);
                      const roa = ((netIncome / totalAssets) * 100).toFixed(2);
                      const roe = ((netIncome / equity) * 100).toFixed(2);
                      
                      const resultDiv = document.getElementById('profitabilityResults');
                      if (resultDiv) {
                        resultDiv.innerHTML = `
                          <p class="font-semibold text-green-700">Calculated Ratios:</p>
                          <p><strong>Net Profit Margin:</strong> ${netMargin}%</p>
                          <p><strong>ROA:</strong> ${roa}%</p>
                          <p><strong>ROE:</strong> ${roe}%</p>
                          <p class="text-xs mt-2 ${parseFloat(roe) >= 15 ? 'text-green-600' : 'text-red-600'}">
                            ${parseFloat(roe) >= 15 ? 'Strong profitability' : 'Room for improvement'}
                          </p>
                        `;
                      }
                    }} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                      Calculate Profitability Ratios
                    </button>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div id="profitabilityResults" className="space-y-2 text-sm">
                      <p className="text-gray-600">Enter values and click calculate</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Valuation Ratios */}
              <div data-ratio-tab="valuation" className="bg-gray-100 border rounded-lg p-6 hidden">
                <h3 className="text-lg font-bold text-purple-700 mb-4">📊 Investment Valuation Ratios</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock Price ($)</label>
                      <input type="number" id="stockPrice" className="w-full border rounded px-3 py-2" placeholder="1,250" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Earnings Per Share ($)</label>
                      <input type="number" id="eps" className="w-full border rounded px-3 py-2" placeholder="75" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Book Value Per Share ($)</label>
                      <input type="number" id="bvps" className="w-full border rounded px-3 py-2" placeholder="850" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Dividend Per Share ($)</label>
                      <input type="number" id="dps" className="w-full border rounded px-3 py-2" placeholder="25" />
                    </div>
                    <button onClick={() => {
                      const stockPrice = parseFloat((document.getElementById('stockPrice') as HTMLInputElement)?.value || '0');
                      const eps = parseFloat((document.getElementById('eps') as HTMLInputElement)?.value || '0');
                      const bvps = parseFloat((document.getElementById('bvps') as HTMLInputElement)?.value || '0');
                      const dps = parseFloat((document.getElementById('dps') as HTMLInputElement)?.value || '0');
                      
                      const peRatio = (stockPrice / eps).toFixed(2);
                      const pbRatio = (stockPrice / bvps).toFixed(2);
                      const dividendYield = ((dps / stockPrice) * 100).toFixed(2);
                      
                      const resultDiv = document.getElementById('valuationResults');
                      if (resultDiv) {
                        resultDiv.innerHTML = `
                          <p class="font-semibold text-purple-700">Calculated Ratios:</p>
                          <p><strong>P/E Ratio:</strong> ${peRatio}</p>
                          <p><strong>P/B Ratio:</strong> ${pbRatio}</p>
                          <p><strong>Dividend Yield:</strong> ${dividendYield}%</p>
                          <p class="text-xs mt-2 ${parseFloat(peRatio) <= 20 ? 'text-green-600' : 'text-red-600'}">
                            ${parseFloat(peRatio) <= 20 ? 'Reasonably valued' : 'May be overvalued'}
                          </p>
                        `;
                      }
                    }} className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                      Calculate Valuation Ratios
                    </button>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div id="valuationResults" className="space-y-2 text-sm">
                      <p className="text-gray-600">Enter values and click calculate</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Debt Ratios */}
              <div data-ratio-tab="debt" className="bg-gray-100 border rounded-lg p-6 hidden">
                <h3 className="text-lg font-bold text-red-700 mb-4">⚖️ Debt & Leverage Ratios</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Debt ($)</label>
                      <input type="number" id="totalDebt" className="w-full border rounded px-3 py-2" placeholder="2,000,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Equity ($)</label>
                      <input type="number" id="totalEquity" className="w-full border rounded px-3 py-2" placeholder="3,000,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">EBIT ($)</label>
                      <input type="number" id="ebit" className="w-full border rounded px-3 py-2" placeholder="750,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Interest Expense ($)</label>
                      <input type="number" id="interest" className="w-full border rounded px-3 py-2" placeholder="120,000" />
                    </div>
                    <button onClick={() => alert('Debt-to-Equity = ' + (parseFloat((document.getElementById('totalDebt') as HTMLInputElement)?.value || '0') / parseFloat((document.getElementById('totalEquity') as HTMLInputElement)?.value || '1')).toFixed(2))} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                      Calculate Debt Ratios
                    </button>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold">Key Debt Ratios:</p>
                      <p>• <strong>Debt-to-Equity:</strong> Total Debt ÷ Total Equity</p>
                      <p>• <strong>Interest Coverage:</strong> EBIT ÷ Interest Expense</p>
                      <p>• <strong>Debt Service Coverage:</strong> Net Operating Income ÷ Total Debt Service</p>
                      <p className="text-xs text-gray-600 mt-2">
                        Good D/E ratios: &lt;0.5 (Conservative), 0.5-1.0 (Moderate), &gt;1.0 (Aggressive)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Efficiency Ratios */}
              <div data-ratio-tab="efficiency" className="bg-gray-100 border rounded-lg p-6 hidden">
                <h3 className="text-lg font-bold text-yellow-700 mb-4">⚡ Efficiency & Activity Ratios</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Revenue ($)</label>
                      <input type="number" id="efficiencyRevenue" className="w-full border rounded px-3 py-2" placeholder="10,000,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Average Inventory ($)</label>
                      <input type="number" id="avgInventory" className="w-full border rounded px-3 py-2" placeholder="1,500,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Average Accounts Receivable ($)</label>
                      <input type="number" id="avgReceivables" className="w-full border rounded px-3 py-2" placeholder="800,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cost of Goods Sold ($)</label>
                      <input type="number" id="cogs" className="w-full border rounded px-3 py-2" placeholder="6,000,000" />
                    </div>
                    <button onClick={() => alert('Inventory Turnover = ' + (parseFloat((document.getElementById('cogs') as HTMLInputElement)?.value || '0') / parseFloat((document.getElementById('avgInventory') as HTMLInputElement)?.value || '1')).toFixed(2) + ' times')} className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700">
                      Calculate Efficiency Ratios
                    </button>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold">Key Efficiency Ratios:</p>
                      <p>• <strong>Inventory Turnover:</strong> COGS ÷ Average Inventory</p>
                      <p>• <strong>Receivables Turnover:</strong> Revenue ÷ Average A/R</p>
                      <p>• <strong>Days Sales Outstanding:</strong> 365 ÷ Receivables Turnover</p>
                      <p>• <strong>Asset Turnover:</strong> Revenue ÷ Total Assets</p>
                      <p className="text-xs text-gray-600 mt-2">
                        Higher turnover ratios indicate better efficiency
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Banking Ratios */}
              <div data-ratio-tab="banking" className="bg-gray-100 border rounded-lg p-6 hidden">
                <h3 className="text-lg font-bold text-indigo-700 mb-4">🏦 Banking & Financial Institution Ratios</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Deposits ($)</label>
                      <input type="number" id="totalDeposits" className="w-full border rounded px-3 py-2" placeholder="50,000,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Loans ($)</label>
                      <input type="number" id="totalLoans" className="w-full border rounded px-3 py-2" placeholder="40,000,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Non-Performing Assets ($)</label>
                      <input type="number" id="npa" className="w-full border rounded px-3 py-2" placeholder="2,000,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tier 1 Capital ($)</label>
                      <input type="number" id="tier1Capital" className="w-full border rounded px-3 py-2" placeholder="5,000,000" />
                    </div>
                    <button onClick={() => alert('Credit-Deposit Ratio = ' + (parseFloat((document.getElementById('totalLoans') as HTMLInputElement)?.value || '0') / parseFloat((document.getElementById('totalDeposits') as HTMLInputElement)?.value || '1') * 100).toFixed(2) + '%')} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                      Calculate Banking Ratios
                    </button>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold">Key Banking Ratios:</p>
                      <p>• <strong>Credit-Deposit Ratio:</strong> (Total Loans ÷ Total Deposits) × 100</p>
                      <p>• <strong>NPA Ratio:</strong> (NPAs ÷ Total Loans) × 100</p>
                      <p>• <strong>Capital Adequacy Ratio:</strong> (Tier 1 + Tier 2) ÷ Risk Weighted Assets</p>
                      <p>• <strong>Cost-to-Income Ratio:</strong> Operating Expenses ÷ Operating Income</p>
                      <p className="text-xs text-gray-600 mt-2">
                        Ideal CD Ratio: 70-80%, NPA &lt;3% for healthy banks
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Ratios */}
              <div data-ratio-tab="market" className="bg-gray-100 border rounded-lg p-6 hidden">
                <h3 className="text-lg font-bold text-pink-700 mb-4">📈 Market & Trading Ratios</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Market Capitalization ($)</label>
                      <input type="number" id="marketCap" className="w-full border rounded px-3 py-2" placeholder="100,000,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Enterprise Value ($)</label>
                      <input type="number" id="enterpriseValue" className="w-full border rounded px-3 py-2" placeholder="120,000,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">EBITDA ($)</label>
                      <input type="number" id="ebitda" className="w-full border rounded px-3 py-2" placeholder="15,000,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Free Cash Flow ($)</label>
                      <input type="number" id="freeCashFlow" className="w-full border rounded px-3 py-2" placeholder="8,000,000" />
                    </div>
                    <button onClick={() => alert('EV/EBITDA = ' + (parseFloat((document.getElementById('enterpriseValue') as HTMLInputElement)?.value || '0') / parseFloat((document.getElementById('ebitda') as HTMLInputElement)?.value || '1')).toFixed(2))} className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
                      Calculate Market Ratios
                    </button>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold">Key Market Ratios:</p>
                      <p>• <strong>EV/EBITDA:</strong> Enterprise Value ÷ EBITDA</p>
                      <p>• <strong>Price-to-Sales:</strong> Market Cap ÷ Revenue</p>
                      <p>• <strong>EV/Sales:</strong> Enterprise Value ÷ Revenue</p>
                      <p>• <strong>FCF Yield:</strong> (Free Cash Flow ÷ Market Cap) × 100</p>
                      <p className="text-xs text-gray-600 mt-2">
                        EV/EBITDA: &lt;10 (Attractive), 10-15 (Fair), &gt;15 (Expensive)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Growth Ratios */}
              <div data-ratio-tab="growth" className="bg-gray-100 border rounded-lg p-6 hidden">
                <h3 className="text-lg font-bold text-emerald-700 mb-4">🚀 Growth & Performance Ratios</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Year Revenue ($)</label>
                      <input type="number" id="currentRevenue" className="w-full border rounded px-3 py-2" placeholder="12,000,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Previous Year Revenue ($)</label>
                      <input type="number" id="previousRevenue" className="w-full border rounded px-3 py-2" placeholder="10,000,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current EPS ($)</label>
                      <input type="number" id="currentEPS" className="w-full border rounded px-3 py-2" placeholder="85" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Previous EPS ($)</label>
                      <input type="number" id="previousEPS" className="w-full border rounded px-3 py-2" placeholder="75" />
                    </div>
                    <button onClick={() => { 
                      const revenueGrowth = ((parseFloat((document.getElementById('currentRevenue') as HTMLInputElement)?.value || '0') - parseFloat((document.getElementById('previousRevenue') as HTMLInputElement)?.value || '0')) / parseFloat((document.getElementById('previousRevenue') as HTMLInputElement)?.value || '1') * 100).toFixed(2);
                      alert('Revenue Growth = ' + revenueGrowth + '%');
                    }} className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700">
                      Calculate Growth Ratios
                    </button>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold">Key Growth Ratios:</p>
                      <p>• <strong>Revenue Growth:</strong> ((Current - Previous) ÷ Previous) × 100</p>
                      <p>• <strong>EPS Growth:</strong> ((Current EPS - Previous EPS) ÷ Previous EPS) × 100</p>
                      <p>• <strong>PEG Ratio:</strong> P/E Ratio ÷ EPS Growth Rate</p>
                      <p>• <strong>Sustainable Growth:</strong> ROE × (1 - Dividend Payout Ratio)</p>
                      <p className="text-xs text-gray-600 mt-2">
                        Good growth: 15-25% revenue, PEG &lt;1.0 indicates undervalued growth
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Word Search */}
          {activeTab === 'wordsearch' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Word Search</h2>
              <p className="text-gray-600 mb-6">Find the word <strong>INVEST</strong> in the grid</p>
              
              <div className="bg-white border rounded-lg p-6">
                <div className="grid grid-cols-10 gap-1 max-w-md mx-auto mb-4">
                  {wordSearchGrid.map((letter, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 border border-gray-300 flex items-center justify-center font-bold cursor-pointer hover:bg-blue-100 ${
                        foundWord.includes(letter) && foundWord.length > 0 ? 'bg-green-200' : 'bg-gray-50'
                      }`}
                      onClick={() => {
                        const newFound = foundWord + letter;
                        setFoundWord(newFound);
                        
                        if (newFound === 'INVEST') {
                          alert('🎉 Congratulations! You found the word INVEST!');
                          setFoundWord('');
                        } else if (newFound.length >= 6 || !'INVEST'.startsWith(newFound)) {
                          setFoundWord('');
                        }
                      }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <p className="text-center text-sm text-gray-600">
                  Click on letters to spell <strong>INVEST</strong>
                </p>
                <div className="text-center mt-4">
                  <p className="text-sm">Current word: <span className="font-bold text-blue-600">{foundWord}</span></p>
                  <button 
                    onClick={() => setFoundWord('')}
                    className="mt-2 px-4 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default InvestmentPuzzles;