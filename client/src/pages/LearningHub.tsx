"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, Play, CheckCircle, ChevronDown, ChevronRight, Users, Award, FileText, Download, Home, DollarSign, Calculator, CreditCard, BarChart3, Landmark, Crosshair, FileText as Tax, Shield, Clock as Retirement, Brain, Globe, Building2, TrendingUp, Coins, PieChart, Banknote, Wallet, Target, Briefcase, GraduationCap, Heart, PiggyBank, PlayCircle, Calendar, PenTool } from "lucide-react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  totalDuration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  students: number;
  category: string;
  modules: Module[];
  skills: string[];
  certificate: boolean;
  completionRate: number;
}

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  videos: Video[];
  resources?: Resource[];
  completed: boolean;
  unlocked: boolean;
}

interface Video {
  id: number;
  title: string;
  duration: string;
  subtopics: Subtopic[];
  completed: boolean;
  videoUrl?: string;
}

interface Subtopic {
  id: number;
  title: string;
  timestamp: string;
  description: string;
  keyPoints: string[];
}

interface Resource {
  id: number;
  title: string;
  type: "pdf" | "excel" | "template" | "checklist";
  description: string;
  downloadUrl: string;
}

const levelData = {
  "0": {
    title: "🌟 LEVEL 0: Welcome to DollarMento",
    description: "Welcome to DollarMento - Your USA Financial Journey Starts Here",
    duration: "20 min",
    videoCount: 5,
    videos: [
      { 
        id: 1, 
        title: "Welcome to DollarMento", 
        duration: "4 min", 
        description: "Introduction to your USA financial education platform",
        content: "DollarMento is your comprehensive guide to mastering American personal finance. Learn how our platform will take you from financial uncertainty to confidence, covering everything from basic money management to advanced investment strategies tailored specifically for the U.S. financial system.",
        videoUrl: ""
      },
      { 
        id: 2, 
        title: "What Is Money, Really?", 
        duration: "4 min", 
        description: "Understanding money in the modern American economy",
        content: "Explore what money truly represents in today's digital economy. Learn about the Federal Reserve system, how money creation works, and why understanding these fundamentals gives you an edge in building wealth within the American financial system.",
        videoUrl: ""
      },
      { 
        id: 3, 
        title: "Understanding Your Money Story", 
        duration: "4 min", 
        description: "Discovering your financial beliefs and patterns",
        content: "Uncover the unconscious beliefs about money that drive your financial decisions. Learn how childhood experiences, cultural background, and American society shape your relationship with money, and how to rewrite limiting beliefs that hold you back from financial success.",
        videoUrl: ""
      },
      { 
        id: 4, 
        title: "Common Money Mistakes in America", 
        duration: "4 min", 
        description: "Avoiding the financial pitfalls that trap most Americans",
        content: "Learn about the most common financial mistakes that keep Americans financially stressed: living paycheck to paycheck, carrying credit card debt, not investing early, and falling for get-rich-quick schemes. Understand how to avoid these traps from the beginning of your financial journey.",
        videoUrl: ""
      },
      { 
        id: 5, 
        title: "The 5 Stages of Financial Growth", 
        duration: "4 min", 
        description: "Your roadmap from financial stress to financial freedom",
        content: "Discover the five stages every American goes through on their path to financial freedom: Survival, Stability, Security, Independence, and Freedom. Learn what each stage looks like, how to progress from one to the next, and which stage you're currently in.",
        videoUrl: ""
      }
    ]
  },
  "0.5": {
    title: "💵 LEVEL 0.5: Money Basics for Absolute Beginners (USA Edition)",
    description: "What Does Money Represent? How Money Flows, Wants vs Needs in American Culture",
    duration: "50 min",
    videoCount: 10,
    videos: [
      { 
        id: 1, 
        title: "What Does Money Represent in Today's Economy?", 
        duration: "5 min", 
        description: "Federal Reserve, monetary policy, and your daily life",
        content: "Understand how the Federal Reserve controls money supply, why interest rates matter to your savings and loans, and how monetary policy affects your daily financial decisions. Learn about digital payments, cryptocurrency emergence, and how this impacts your purchasing power and investment decisions in America.",
        videoUrl: "" 
      },
      { 
        id: 2, 
        title: "How Money Flows: Earn, Spend, Save, Repeat", 
        duration: "3.5 min", 
        description: "Cash flow fundamentals in personal finance",
        content: "Master the basic money flow cycle that determines financial success or failure. Learn how income streams, expense management, and savings rate create your financial foundation. Understand the difference between gross and net income, how taxes affect your money flow, and why cash flow management is more important than how much you earn.",
        videoUrl: "" 
      },
      { 
        id: 3, 
        title: "Wants vs Needs in American Culture", 
        duration: "4 min", 
        description: "Consumer culture and smart spending decisions",
        content: "Navigate America's consumer-driven culture by clearly distinguishing between wants and needs. Learn practical frameworks for making spending decisions, understand how marketing influences your desires, and develop strategies to resist lifestyle inflation. Discover how successful Americans manage desires while building wealth.",
        videoUrl: "" 
      },
      { 
        id: 4, 
        title: "Pay Yourself First – The Golden Rule", 
        duration: "4 min", 
        description: "Automated savings and wealth building",
        content: "Learn the most powerful wealth-building principle: paying yourself first through automated savings. Understand how to set up automatic transfers using American banking, the psychology of reverse budgeting, and why this simple strategy outperforms complex financial planning. See real examples of how small amounts compound into significant wealth.",
        videoUrl: "" 
      },
      { 
        id: 5, 
        title: "Understanding Cash Flow in Everyday Life", 
        duration: "5 min", 
        description: "Monthly budgeting and cash flow management",
        content: "Master daily cash flow management using American banking tools and apps. Learn to track money coming in and going out, understand timing of payments and deposits, and avoid cash flow problems that lead to debt. Discover tools like Mint, YNAB, and bank apps that make cash flow management effortless.",
        videoUrl: "" 
      },
      { 
        id: 6, 
        title: "Inflation Explained (CPI, FED & Daily Impact)", 
        duration: "5 min", 
        description: "How rising prices affect your money's value",
        content: "Understand inflation through the Consumer Price Index (CPI), how Federal Reserve policy creates inflation, and what this means for your savings and investments. Learn why keeping money in low-yield savings accounts actually loses value over time, and how to protect your wealth from inflation through smart financial decisions.",
        videoUrl: "" 
      },
      { 
        id: 7, 
        title: "Assets vs Liabilities – American Examples", 
        duration: "5 min", 
        description: "Building wealth through asset accumulation",
        content: "Learn the fundamental difference between assets (things that put money in your pocket) and liabilities (things that take money out). See American examples: why your primary residence isn't necessarily an asset, how 401(k) accounts build wealth, and which purchases help vs hurt your financial position.",
        videoUrl: "" 
      },
      { 
        id: 8, 
        title: "What is Net Worth & Why It Matters", 
        duration: "5 min", 
        description: "Your true financial scorecard",
        content: "Calculate and understand net worth as your ultimate financial scorecard. Learn how assets minus liabilities equals net worth, why this matters more than income, and how to track progress over time. Discover average net worth by age in America and set realistic targets for your financial journey.",
        videoUrl: "" 
      },
      { 
        id: 9, 
        title: "Popular Money Myths in the U.S. You Need to Drop", 
        duration: "5 min", 
        description: "Debunking common financial misconceptions",
        content: "Bust common American money myths that keep people poor: 'You need money to make money,' 'Rich people are just lucky,' 'Investing is gambling,' 'You need perfect credit,' and 'Budgeting is restrictive.' Learn the truth behind these myths and how correcting these beliefs accelerates your wealth building.",
        videoUrl: "" 
      },
      { 
        id: 10, 
        title: "Mini Quiz & Reflection Activity", 
        duration: "5 min", 
        description: "Test your understanding and plan next steps",
        content: "Complete an interactive quiz testing your understanding of money basics, reflect on your current financial situation, and identify the next learning priorities. Set your first financial goals and understand which Level 1 topics will have the biggest impact on your financial progress.",
        videoUrl: "" 
      }
    ]
  },
  "1": {
    title: "📊 LEVEL 1: Budgeting & Expense Control",
    description: "Budgeting 101 – The 50/30/20 Rule, Emergency Funds, Daily Expense Tracking",
    duration: "36 min",
    videoCount: 6,
    videos: [
      { 
        id: 1, 
        title: "Budgeting 101 – The 50/30/20 Rule", 
        duration: "6 min", 
        description: "Simple budgeting framework for Americans",
        content: "Master the 50/30/20 budgeting rule: 50% for needs, 30% for wants, 20% for savings and debt payment. Learn how to categorize expenses, adapt the rule to your income level, and use this framework with American budgeting apps. See real examples of how this rule works for different income levels and life situations.",
        videoUrl: "o16TyBbAUAg" 
      },
      { 
        id: 2, 
        title: "Emergency Funds: Your Financial Shock Absorber", 
        duration: "6 min", 
        description: "Building your safety net for unexpected expenses",
        content: "Build an emergency fund that protects you from financial disasters. Learn why 3-6 months of expenses is the target, where to keep emergency money for quick access, and how to build this fund systematically. Understand what qualifies as a true emergency and how this fund prevents debt accumulation during crises.",
        videoUrl: "" 
      },
      { 
        id: 3, 
        title: "Creating Your First Budget with U.S. Tools (YNAB, Mint, etc.)", 
        duration: "6 min", 
        description: "Hands-on budgeting with popular American apps",
        content: "Create your first budget using popular American tools like YNAB (You Need A Budget), Mint, Personal Capital, or simple spreadsheets. Learn the pros and cons of each tool, how to connect bank accounts safely, and which approach works best for different personality types and financial situations.",
        videoUrl: "" 
      },
      { 
        id: 4, 
        title: "Daily Expense Tracking – Apps & Systems", 
        duration: "6 min", 
        description: "Effortless expense tracking for busy Americans",
        content: "Develop sustainable expense tracking habits using smartphone apps, bank notifications, and simple systems. Learn about automatic categorization, receipt scanning apps, and how to track expenses without becoming obsessed. Discover which tracking methods stick long-term and provide useful insights.",
        videoUrl: "" 
      },
      { 
        id: 5, 
        title: "Cutting Costs Without Sacrificing Lifestyle", 
        duration: "6 min", 
        description: "Smart cost reduction strategies",
        content: "Reduce expenses while maintaining quality of life through strategic cost-cutting. Learn about negotiating bills, finding better deals on insurance and utilities, smart grocery shopping, and subscription audits. Discover the difference between cheap and frugal, and how to cut costs in areas that don't impact your happiness.",
        videoUrl: "" 
      },
      { 
        id: 6, 
        title: "Emergency Fund Strategy Based on U.S. Living Expenses", 
        duration: "5 min", 
        description: "Tailoring emergency funds to American cost of living",
        content: "Calculate the right emergency fund size based on American living costs, regional differences, and your personal situation. Learn how healthcare costs, housing markets, and employment patterns affect emergency fund needs. Understand where to keep emergency money for the best balance of safety and growth.",
        videoUrl: "" 
      }
    ]
  },
  "2": {
    title: "🏦 LEVEL 2: Banking & Credit Essentials",
    description: "Choosing the Right Accounts, Understanding U.S. Credit Scores, Building Credit from Scratch",
    duration: "42 min",
    videoCount: 6,
    videos: [
      { 
        id: 1, 
        title: "Choosing the Right Checking & Savings Accounts", 
        duration: "7 min", 
        description: "Banking fundamentals for Americans",
        content: "Choose the best checking and savings accounts from major U.S. banks and credit unions. Learn about fees, minimum balances, interest rates, and FDIC insurance. Understand the differences between traditional banks, online banks, and credit unions, and which options provide the best value for your financial situation.",
        videoUrl: "" 
      },
      { 
        id: 2, 
        title: "Understanding U.S. Credit Scores (FICO vs VantageScore)", 
        duration: "7 min", 
        description: "Credit scoring systems and what they mean",
        content: "Master the U.S. credit system including FICO and VantageScore models. Learn what factors affect your credit score, how scores are calculated, and why credit matters for loans, apartments, and even employment. Understand the difference between credit scores and credit reports, and how to monitor your credit for free.",
        videoUrl: "" 
      },
      { 
        id: 3, 
        title: "How to Build Credit from Scratch", 
        duration: "7 min", 
        description: "Establishing credit history as a young American",
        content: "Build credit history from zero using secured credit cards, student credit cards, and becoming an authorized user. Learn the timeline for establishing credit, common mistakes that hurt new credit, and strategies for young Americans and immigrants. Understand how to build credit without debt.",
        videoUrl: "" 
      },
      { 
        id: 4, 
        title: "Types of Credit (Loans, Credit Cards, Lines of Credit)", 
        duration: "7 min", 
        description: "Understanding different credit products",
        content: "Understand various credit products: credit cards, personal loans, auto loans, mortgages, and lines of credit. Learn when each type makes sense, how interest rates vary, and the impact on your credit score. Discover the pros and cons of each credit type and how to use credit strategically.",
        videoUrl: "" 
      },
      { 
        id: 5, 
        title: "Reading a U.S. Credit Report (Equifax, Experian, TransUnion)", 
        duration: "7 min", 
        description: "Understanding your credit report from all three bureaus",
        content: "Read and understand credit reports from all three major bureaus: Equifax, Experian, and TransUnion. Learn how to get free credit reports, what information appears on reports, how to spot errors, and the dispute process. Understand how long different items stay on your credit report.",
        videoUrl: "" 
      },
      { 
        id: 6, 
        title: "Smart Borrowing: Student Loans, Auto Loans & Beyond", 
        duration: "7 min", 
        description: "Strategic borrowing for major purchases",
        content: "Make smart borrowing decisions for education, vehicles, and other major purchases. Learn about federal vs private student loans, auto loan strategies, and when debt makes sense for building wealth. Understand interest rates, loan terms, and how to minimize the cost of necessary borrowing.",
        videoUrl: "" 
      }
    ]
  },
  "0.5-mindset": {
    title: "🌱 LEVEL 0.5: Money Mindset & Fundamentals",
    description: "Building the right relationship and mindset with money",
    duration: "39 min",
    videoCount: 10,
    videos: [
      { 
        id: 2, 
        title: "0.5.2 How We Use Money: The Cycle", 
        duration: "4 min", 
        description: "Earn → Spend → Save → Invest",
        content: "Master the money flow cycle that determines your financial future. Discover why most Americans get stuck in the Earn-Spend trap and how to break into the wealth-building Earn-Save-Invest cycle. Learn practical strategies to optimize each stage: increasing earning potential, conscious spending, systematic saving, and strategic investing. See real examples of how changing this cycle transforms financial outcomes.",
        videoUrl: "" 
      },
      { 
        id: 3, 
        title: "0.5.3 Wants vs Needs", 
        duration: "3 min", 
        description: "The difference with real-life examples. Avoiding lifestyle inflation",
        content: "The foundation of smart money management starts with this distinction. Learn the simple framework to categorize expenses: survival needs, comfort wants, and luxury desires. Understand lifestyle inflation - how increased income often leads to increased expenses without increased savings. Master practical techniques to enjoy life while staying financially disciplined, with Indian examples from food, transport, and entertainment.",
        videoUrl: "" 
      },
      { 
        id: 4, 
        title: "0.5.4 Pay Yourself First", 
        duration: "4 min", 
        description: "Why saving first is the golden rule. How to set automatic saving",
        content: "Revolutionary concept: treat savings like a non-negotiable expense. Discover why paying yourself first guarantees financial success while paying yourself last guarantees struggle. Learn to automate savings using bank standing instructions, investment mandates, and digital tools. See how starting with even $500/month creates significant wealth over time through compound growth.",
        videoUrl: "" 
      },
      { 
        id: 5, 
        title: "0.5.5 Cash Flow 101", 
        duration: "3 min", 
        description: "Income vs Expenses. Surplus vs Deficit",
        content: "Your cash flow determines your financial health. Learn to track money coming in versus money going out with simple tools and techniques. Understand the difference between positive cash flow (surplus) and negative cash flow (deficit), and why consistent surplus is the foundation of wealth building. Master practical methods to increase income and reduce expenses for sustainable positive cash flow.",
        videoUrl: "" 
      },
      { 
        id: 6, 
        title: "0.5.6 Inflation Explained Simply", 
        duration: "3 min", 
        description: "What is inflation? Why your money loses value",
        content: "Inflation is the silent wealth destroyer. Understand why $100 today won't buy what $100 bought 10 years ago, and how this affects your savings. Learn about America's inflation patterns, why keeping money in low-interest savings accounts actually loses value, and how to protect your wealth through inflation-beating investments like equity and real estate.",
        videoUrl: "" 
      },
      { 
        id: 7, 
        title: "0.5.7 Assets vs Liabilities", 
        duration: "3 min", 
        description: "What builds wealth, what destroys it. Simple daily examples",
        content: "The wealthy buy assets, the poor buy liabilities. Learn the simple distinction: assets put money in your pocket, liabilities take money out. Understand why your home might not be the asset you think it is, how vehicles are liabilities, and what true assets look like in the American context - from stocks and index funds to rental properties and skill development.",
        videoUrl: "" 
      },
      { 
        id: 8, 
        title: "0.5.8 What is Net Worth?", 
        duration: "3 min", 
        description: "How to calculate your net worth. Tracking it as a personal scorecard",
        content: "Net worth is your financial scorecard. Learn the simple formula: Assets minus Liabilities equals Net Worth. Discover how to calculate your current net worth, why it's more important than income or expenses alone, and how to track it monthly. See real examples of how net worth grows through smart financial decisions and compound wealth building.",
        videoUrl: "" 
      },
      { 
        id: 9, 
        title: "0.5.9 Money Myths You Need to Break", 
        duration: "5 min", 
        description: "I don't earn enough to save, Investing is gambling, I'll figure it out later",
        content: "Destructive money myths keep Americans financially stuck. Challenge common beliefs: 'I don't earn enough to invest' (truth: you can start with $100), 'Investing is gambling' (truth: not investing is the real gamble), 'I'll start when I earn more' (truth: starting small early beats starting big late). Replace limiting beliefs with wealth-building truths backed by data and real success stories.",
        videoUrl: "" 
      },
      { 
        id: 10, 
        title: "0.5.10 Mini Quiz & Reflection", 
        duration: "4 min", 
        description: "Quick quiz to test concepts. What's my current money mindset?",
        content: "Test your understanding with interactive scenarios and self-assessment. Identify your current money personality: Spender, Saver, or Investor. Reflect on your financial goals and create your first action plan. This foundation assessment helps you understand where you are now and sets the stage for your personalized financial journey through the remaining levels.",
        videoUrl: "" 
      }
    ]
  },
  "1-foundation": {
    title: "LEVEK 1: FOUNDATION - BEFORE YOU INVEST",
    description: "Essential financial foundation skills before starting investment journey",
    duration: "24 min",
    videoCount: 6,
    videos: [
      { 
        id: 1, 
        title: "1.1 Budgeting 101", 
        duration: "4 min", 
        description: "50/30/20 rule, tracking expenses, apps",
        content: "Master the proven 50-30-20 budgeting framework: 50% for needs, 30% for wants, 20% for savings and investments. Learn how to adapt this rule for American lifestyles, including family obligations, cultural expenses, and varying income levels. Understand why this balance creates sustainable wealth building while maintaining quality of life. Discover the best American budgeting apps and tracking tools for seamless expense management.",
        videoUrl: "" 
      },
      { 
        id: 2, 
        title: "1.2 Emergency Funds", 
        duration: "4 min", 
        description: "Why, how much, where to keep it",
        content: "Your emergency fund is financial insurance against life's surprises. Learn why 6 months of expenses should be your target, how to build it systematically starting with $5000, and where to keep it for easy access. Understand what constitutes a real emergency versus a want. See how having an emergency fund prevents debt accumulation and provides peace of mind for pursuing investment opportunities.",
        videoUrl: "" 
      },
      { 
        id: 3, 
        title: "1.3 Creating Your First Budget", 
        duration: "4 min", 
        description: "Step-by-step guide to building your personal budget",
        content: "Build your personalized budget in 4 simple steps. Learn to categorize expenses into fixed, variable, and discretionary. Master the envelope method using digital tools like Google Sheets or budgeting apps. Understand how to set realistic targets, account for irregular expenses, and create buffer zones. Follow along as we create a sample budget for a typical American household with practical examples.",
        videoUrl: "" 
      },
      { 
        id: 4, 
        title: "1.4 Daily Expense Tracking Tools", 
        duration: "3 min", 
        description: "Tools and apps to track your daily spending",
        content: "Effective expense tracking transforms financial awareness. Learn multiple tracking methods: manual logging, app-based tracking, and bank statement analysis. Discover the best American apps and tools for expense management. Master the weekly review process that takes just 10 minutes but provides complete financial clarity. See how consistent tracking naturally reduces unnecessary spending and identifies saving opportunities.",
        videoUrl: "" 
      },
      { 
        id: 5, 
        title: "1.5 How to Cut Expenses Smartly", 
        duration: "4 min", 
        description: "Practical tips to reduce expenses without sacrificing quality of life",
        content: "Smart expense reduction maintains your lifestyle while freeing up money for wealth building. Learn the 80/20 principle: identify the 20% of expenses that provide 80% of satisfaction. Master negotiation tactics for bills, subscriptions, and services. Discover substitute strategies: finding cheaper alternatives without compromising quality. See practical examples from transport, food, entertainment, and shopping.",
        videoUrl: "" 
      },
      { 
        id: 6, 
        title: "1.6 Emergency Fund: Your Safety Net", 
        duration: "4 min", 
        description: "Building your emergency fund from $5000 to 3 months' income",
        content: "Your emergency fund is financial insurance against life's surprises. Learn why 6 months of expenses should be your target, how to build it systematically starting with $5000, and where to keep it for easy access. Understand what constitutes a real emergency versus a want. See how having an emergency fund prevents debt accumulation and provides peace of mind for pursuing investment opportunities.",
        videoUrl: "" 
      }
    ]
  },
  "2-core": {
    title: "LEVEK 2: CORE CONCEPTS - MAKING MONEY WORK",
    description: "Essential wealth-building concepts and investment fundamentals",
    duration: "24 min",
    videoCount: 6,
    videos: [
      { 
        id: 1, 
        title: "2.1 Power of Compounding", 
        duration: "4 min", 
        description: "Story-style visual explanation",
        content: "Compounding is the eighth wonder of the world. Understand how time and consistency create exponential wealth growth through real stories and visual examples. Learn why starting early with small amounts beats starting late with large amounts. See how $1000 monthly investment grows to millions over decades. Master the compound interest formula and discover why Einstein called compounding the most powerful force in the universe.",
        videoUrl: "" 
      },
      { 
        id: 2, 
        title: "2.2 Assets vs Liabilities", 
        duration: "4 min", 
        description: "Simple examples, personal balance sheet",
        content: "The wealthy buy assets, the poor buy liabilities. Learn the simple distinction: assets put money in your pocket, liabilities take money out. Understand why your home might not be the asset you think it is, how vehicles are liabilities, and what true assets look like in the American context - from stocks and index funds to rental properties and skill development.",
        videoUrl: "" 
      },
      { 
        id: 3, 
        title: "2.3 Inflation & Interest Rates", 
        duration: "4 min", 
        description: "Why inflation matters, Fed rate basics",
        content: "Inflation is the silent wealth destroyer that affects every financial decision. Understand how Federal Reserve's interest rate influences your loans, deposits, and investment returns. Learn why keeping money in savings accounts guarantees wealth erosion. See practical examples of inflation's impact on American households and discover inflation-beating investment strategies.",
        videoUrl: "" 
      },
      { 
        id: 4, 
        title: "2.4 Risk & Return", 
        duration: "4 min", 
        description: "Emotional and logical view, risk appetite",
        content: "Higher returns require accepting higher risk - but risk can be managed smartly. Understand different types of investment risk: market risk, inflation risk, and liquidity risk. Learn to assess your personal risk appetite based on age, income, and goals. Discover how diversification reduces risk without significantly reducing returns.",
        videoUrl: "" 
      },
      { 
        id: 5, 
        title: "2.5 Types of Income", 
        duration: "4 min", 
        description: "Active, passive, portfolio, side hustles",
        content: "Build multiple income streams for financial security. Understand the difference between active income (trading time for money), passive income (money working for you), and portfolio income (investments). Learn practical ways to create passive income in America through dividends, rental income, and business investments. Discover side hustle opportunities that complement your primary career.",
        videoUrl: "" 
      },
      { 
        id: 6, 
        title: "2.6 How to Choose Where to Invest", 
        duration: "4 min", 
        description: "Goal, time, risk, liquidity",
        content: "Investment success comes from matching investments to your specific needs. Learn the four-factor framework: Goal (what you're investing for), Time (when you need the money), Risk (how much volatility you can handle), and Liquidity (how quickly you need access). See practical examples of investment selection for different life scenarios.",
        videoUrl: "" 
      }
    ]
  },
  "3": {
    title: "LEVEK 3: STOCK MARKET BASICS",
    description: "Understanding American stock market and direct equity investing",
    duration: "24 min",
    videoCount: 6,
    videos: [
      { 
        id: 1, 
        title: "3.1 What is the Stock Market?", 
        duration: "4 min", 
        description: "US exchanges, S&P 500/NASDAQ",
        content: "The stock market is where businesses and investors meet. Understand how NYSE and NASDAQ operate, what S&P 500 and Dow Jones represent, and how companies raise capital by selling shares. Learn the basic mechanics of stock trading, why stock prices fluctuate, and how the market reflects the overall economy. See real examples of successful American companies and their stock performance.",
        videoUrl: "" 
      },
      { 
        id: 2, 
        title: "3.2 How to Buy Shares in America", 
        duration: "4 min", 
        description: "Brokerage accounts, brokers, process",
        content: "Start your stock market journey with confidence. Learn the step-by-step process: opening a brokerage account, choosing a reliable broker, and making your first trade. Understand the role of clearing houses, know your verification requirements, and discover cost-effective trading platforms. See a live walkthrough of the entire process from account opening to stock purchase.",
        videoUrl: "" 
      },
      { 
        id: 3, 
        title: "3.3 What Affects Stock Prices?", 
        duration: "4 min", 
        description: "News, results, economy, sentiment",
        content: "Stock prices reflect multiple factors beyond company performance. Understand how quarterly results, economic indicators, global events, and market sentiment drive price movements. Learn to distinguish between short-term noise and long-term value. Discover how news, government policies, and investor psychology create buying and selling opportunities.",
        videoUrl: "" 
      },
      { 
        id: 4, 
        title: "3.4 DCA vs Lump Sum", 
        duration: "4 min", 
        description: "Dollar-cost averaging for beginners with index funds",
        content: "Dollar-cost averaging (DCA) removes timing guesswork from investing. Compare DCA advantages (dollar-cost averaging, discipline) with lump sum benefits (immediate market exposure). Learn when to choose each approach based on your cash flow, market conditions, and risk tolerance. See practical examples showing DCA performance across different market cycles.",
        videoUrl: "" 
      },
      { 
        id: 5, 
        title: "3.5 Mutual Funds Explained", 
        duration: "4 min", 
        description: "Debt, equity, hybrid, index funds",
        content: "Mutual funds offer professional management and diversification for small investors. Understand the difference between equity funds (growth potential), debt funds (stability), hybrid funds (balanced approach), and index funds (low-cost market tracking). Learn expense ratios, exit loads, and how to select funds based on your investment goals and time horizon.",
        videoUrl: "" 
      },
      { 
        id: 6, 
        title: "3.6 Common Mistakes by New Investors", 
        duration: "4 min", 
        description: "Emotional decisions, FOMO, panic selling",
        content: "Avoid the psychological traps that destroy investment returns. Learn about common behavioral biases: buying high during market euphoria, selling low during panic, chasing performance, and over-diversification. Understand how emotions override logic in financial decisions and discover practical strategies to maintain discipline during market volatility.",
        videoUrl: "" 
      }
    ]
  },
  "4": {
    title: "📉 LEVEL 4: U.S. Stock Market Basics",
    description: "What is the Stock Market? Dow Jones, S&P 500 & Nasdaq Explained",
    duration: "36 min",
    videoCount: 6,
    videos: [
      { id: 1, title: "What is the Stock Market?", duration: "6 min", description: "How the U.S. stock market operates and creates wealth", videoUrl: "" },
      { id: 2, title: "Dow Jones, S&P 500 & Nasdaq Explained", duration: "6 min", description: "Understanding America's major stock market indices", videoUrl: "" },
      { id: 3, title: "How Stocks Generate Wealth", duration: "6 min", description: "Capital appreciation and dividends in U.S. markets", videoUrl: "" },
      { id: 4, title: "Setting Up Your First Brokerage Account", duration: "6 min", description: "Step-by-step guide to opening accounts with major U.S. brokers", videoUrl: "" },
      { id: 5, title: "Your First Stock Purchase: A Step-by-Step", duration: "6 min", description: "Making your first investment in U.S. stocks", videoUrl: "" },
      { id: 6, title: "Risks of Stock Investing & How to Manage Them", duration: "6 min", description: "Understanding and managing stock market risks in America", videoUrl: "" }
    ]
  },
  "5": {
    title: "🪙 LEVEL 5: Gold, Bonds & Alternative Investments",
    description: "Should You Invest in Gold? U.S. Treasury Bonds, I-Bonds & Municipal Bonds",
    duration: "30 min",
    videoCount: 5,
    videos: [
      { id: 1, title: "Should You Invest in Gold? (ETFs vs Physical Gold)", duration: "6 min", description: "Gold investment options in U.S. markets", videoUrl: "" },
      { id: 2, title: "U.S. Treasury Bonds, I-Bonds & Municipal Bonds", duration: "6 min", description: "Safe government securities for conservative American investors", videoUrl: "" },
      { id: 3, title: "Real Estate Investing Basics (REITs & Rentals)", duration: "6 min", description: "Understanding real estate as an investment in America", videoUrl: "" },
      { id: 4, title: "Crypto for Beginners: Risks & Rewards", duration: "6 min", description: "Introduction to cryptocurrency investing in the U.S.", videoUrl: "" },
      { id: 5, title: "Diversification: Building a Resilient Portfolio", duration: "6 min", description: "Building a balanced investment portfolio for Americans", videoUrl: "" }
    ]
  },
  "6": {
    title: "🎯 LEVEL 6: Financial Goal Setting & Planning",
    description: "Why Financial Goals Matter, Using the SMART Goal Framework",
    duration: "30 min",
    videoCount: 5,
    videos: [
      { id: 1, title: "Why Financial Goals Matter", duration: "6 min", description: "The importance of setting clear financial objectives in America", videoUrl: "" },
      { id: 2, title: "Using the SMART Goal Framework", duration: "6 min", description: "Setting Specific, Measurable, Achievable, Relevant, Time-bound goals", videoUrl: "" },
      { id: 3, title: "Short-Term vs Long-Term Goal Mapping", duration: "6 min", description: "Balancing immediate needs with future aspirations", videoUrl: "" },
      { id: 4, title: "Aligning Investments with Life Milestones", duration: "6 min", description: "Choosing right investments for different American life goals", videoUrl: "" },
      { id: 5, title: "Tracking Progress with Budget & Planning Tools", duration: "6 min", description: "Monitoring and adjusting your financial plan with U.S. tools", videoUrl: "" }
    ]
  },
  "7": {
    title: "💼 LEVEL 7: U.S. Tax System Simplified",
    description: "Introduction to the U.S. Income Tax System, Understanding Tax Brackets",
    duration: "30 min",
    videoCount: 5,
    videos: [
      { id: 1, title: "Introduction to the U.S. Income Tax System", duration: "6 min", description: "Basics of federal income tax in America", videoUrl: "" },
      { id: 2, title: "Understanding Tax Brackets & How They Work", duration: "6 min", description: "Understanding the progressive tax system in the U.S.", videoUrl: "" },
      { id: 3, title: "Popular Tax-Saving Options (401(k), HSA, IRA)", duration: "6 min", description: "Tax-advantaged accounts and investment options", videoUrl: "" },
      { id: 4, title: "How to File Taxes – Basics of IRS Filing", duration: "6 min", description: "Step-by-step guide to filing your tax return", videoUrl: "" },
      { id: 5, title: "Intro to State Taxes, Sales Tax & Deductions", duration: "6 min", description: "Understanding different types of taxes in America", videoUrl: "" }
    ]
  },
  "8": {
    title: "🛡️ LEVEL 8: Insurance & Protection Plans",
    description: "The Importance of Insurance in U.S. Life Planning, Life Insurance: Term vs Whole Life",
    duration: "30 min",
    videoCount: 5,
    videos: [
      { id: 1, title: "The Importance of Insurance in U.S. Life Planning", duration: "6 min", description: "Why insurance is essential for financial security in America", videoUrl: "" },
      { id: 2, title: "Life Insurance: Term vs Whole Life", duration: "6 min", description: "Comparing term and whole life insurance options", videoUrl: "" },
      { id: 3, title: "Health Insurance Basics (PPO, HMO, Deductibles)", duration: "6 min", description: "Understanding U.S. health insurance options and terminology", videoUrl: "" },
      { id: 4, title: "Auto & Renter's/Homeowner's Insurance", duration: "6 min", description: "Protecting your assets with property and casualty insurance", videoUrl: "" },
      { id: 5, title: "How to Compare & Shop for Policies Online", duration: "6 min", description: "Smart strategies for buying insurance in America", videoUrl: "" }
    ]
  },
  "9": {
    title: "🧓 LEVEL 9: Retirement Planning for Americans",
    description: "Why You Need to Start Early, 401(k), Roth IRA, Traditional IRA Explained",
    duration: "30 min",
    videoCount: 5,
    videos: [
      { id: 1, title: "Why You Need to Start Early", duration: "6 min", description: "The importance of starting retirement planning early in America", videoUrl: "" },
      { id: 2, title: "401(k), Roth IRA, Traditional IRA Explained", duration: "6 min", description: "Understanding key American retirement accounts", videoUrl: "" },
      { id: 3, title: "Social Security: What You Need to Know", duration: "6 min", description: "How Social Security works and fits into retirement planning", videoUrl: "" },
      { id: 4, title: "Retirement Calculator Walkthrough", duration: "6 min", description: "Using tools to plan your retirement in the U.S.", videoUrl: "" },
      { id: 5, title: "Annuities & Pension Plans: Should You Opt In?", duration: "6 min", description: "Evaluating additional retirement income options", videoUrl: "" }
    ]
  },
  "10": {
    title: "🧠 LEVEL 10: Financial Mindset & Habits",
    description: "Rich vs Poor Mindset: What the Wealthy Do Differently, Daily Habits That Grow Wealth",
    duration: "30 min",
    videoCount: 5,
    videos: [
      { id: 1, title: "Rich vs Poor Mindset: What the Wealthy Do Differently", duration: "6 min", description: "Understanding the psychological differences in wealth-building approach", videoUrl: "" },
      { id: 2, title: "Daily Habits That Grow Wealth Over Time", duration: "6 min", description: "Simple daily practices successful Americans use to build wealth", videoUrl: "" },
      { id: 3, title: "Journaling Your Financial Life", duration: "6 min", description: "Keeping track of your financial journey and decisions", videoUrl: "" },
      { id: 4, title: "Monthly Money Check-Ins & Budget Reviews", duration: "6 min", description: "Regular financial health checkups for Americans", videoUrl: "" },
      { id: 5, title: "Building a Money-Smart Peer Group", duration: "6 min", description: "Creating a supportive financial community in America", videoUrl: "" }
    ]
  },
  "11": {
    title: "🚀 LEVEL 11: Your U.S. Financial Launch Plan",
    description: "Building Your Personal Money System, Your 12-Month Financial Roadmap",
    duration: "24 min",
    videoCount: 4,
    videos: [
      { id: 1, title: "Building Your Personal Money System", duration: "6 min", description: "Creating a custom financial workflow for Americans (banking, budgeting, investing, insuring)", videoUrl: "" },
      { id: 2, title: "Your 12-Month Financial Roadmap", duration: "6 min", description: "Step-by-step monthly goals based on the U.S. financial system", videoUrl: "" },
      { id: 3, title: "Avoiding Common Pitfalls in the U.S. System", duration: "6 min", description: "Real-life money traps Americans face and how to avoid them", videoUrl: "" },
      { id: 4, title: "Building Momentum & Automating Success", duration: "6 min", description: "Staying consistent and building wealth systematically in America", videoUrl: "" }
    ]
  }
};

export default function LearningHub() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [expandedVideos, setExpandedVideos] = useState<number[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [completedVideos, setCompletedVideos] = useState<Set<string>>(new Set());
  const [videoProgress, setVideoProgress] = useState<Map<string, number>>(new Map());
  const [hasStartedCourse, setHasStartedCourse] = useState<boolean>(false);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [animatingLikes, setAnimatingLikes] = useState<Set<string>>(new Set());
  const [lastPaidLevel, setLastPaidLevel] = useState<string>("11"); // Currently all levels are available

  // Calculate if all videos in a level are completed
  const isLevelCompleted = (levelKey: string) => {
    const level = levelData[levelKey as keyof typeof levelData];
    if (!level) return false;
    return level.videos.every((video: any) => completedVideos.has(`${levelKey}-${video.id}`));
  };

  // Calculate total completed videos across all levels
  const getTotalCompletedVideos = () => {
    return completedVideos.size;
  };

  // Calculate total videos across all levels
  const getTotalVideos = () => {
    return Object.values(levelData).reduce((total, level) => total + level.videos.length, 0);
  };

  // Get the next available level based on completion and paid access
  const getNextAvailableLevel = () => {
    const availableLevels = ["0", "0.5", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
    const paidLevelIndex = availableLevels.indexOf(lastPaidLevel);
    
    // Find first incomplete level within paid range
    for (let i = 0; i <= paidLevelIndex; i++) {
      const level = availableLevels[i];
      if (!isLevelCompleted(level)) {
        return level;
      }
    }
    
    // If all paid levels are complete, return the last paid level
    return lastPaidLevel;
  };

  // Start or resume course function
  const handleStartResumeCourse = () => {
    const nextLevel = getNextAvailableLevel();
    selectLevel(nextLevel);
    setHasStartedCourse(true);
  };

  // Check if any level is completed to show progress
  const shouldShowProgress = () => {
    return Object.keys(levelData).some(levelKey => isLevelCompleted(levelKey));
  };

  // Update video progress and auto-complete when 80% watched
  const updateVideoProgress = (levelKey: string, videoId: number, progress: number) => {
    const videoKey = `${levelKey}-${videoId}`;
    setVideoProgress(prev => new Map(prev.set(videoKey, progress)));
    
    // Auto-complete if watched 80% or more
    if (progress >= 80) {
      setCompletedVideos(prev => {
        const newSet = new Set(Array.from(prev));
        newSet.add(videoKey);
        return newSet;
      });
    }
  };

  // Get video progress percentage
  const getVideoProgress = (levelKey: string, videoId: number): number => {
    const videoKey = `${levelKey}-${videoId}`;
    return videoProgress.get(videoKey) || 0;
  };

  // Track actual video watching time (to be integrated with video player)
  const trackVideoProgress = (levelKey: string, videoId: number, currentTime: number, duration: number) => {
    const progress = Math.round((currentTime / duration) * 100);
    updateVideoProgress(levelKey, videoId, progress);
  };

  // Simply select video without fake progress updates
  const selectVideo = (levelKey: string, videoId: number) => {
    setSelectedVideo(videoId);
    // Scroll to top of the page where video player is located
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Note: Progress will only update from actual video player time tracking
  };

  // Helper function to select level and scroll to top
  const selectLevel = (levelKey: string) => {
    setSelectedLevel(levelKey);
    // Automatically select the first video in the level
    const level = levelData[levelKey as keyof typeof levelData];
    if (level && level.videos.length > 0) {
      setSelectedVideo(level.videos[0].id);
    }
    // Scroll to top of the page when level is selected
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle like button with pop animation
  const handleLikeVideo = (levelKey: string, videoId: number) => {
    const videoKey = `${levelKey}-${videoId}`;
    
    // Add animation effect
    setAnimatingLikes(prev => new Set(Array.from(prev).concat(videoKey)));
    
    // Toggle like status
    setLikedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoKey)) {
        newSet.delete(videoKey);
      } else {
        newSet.add(videoKey);
      }
      return newSet;
    });

    // Remove animation after effect completes
    setTimeout(() => {
      setAnimatingLikes(prev => {
        const newSet = new Set(prev);
        newSet.delete(videoKey);
        return newSet;
      });
    }, 300);
  };

  const getVideoKeyPoints = (levelKey: string, videoId: number | undefined): string[] => {
    if (!videoId) return [];
    
    const keyPointsMap: Record<string, string[]> = {
      "0-1": [
        "Understanding the purpose and mission of DollarMento platform",
        "How gamified learning accelerates financial literacy development",
        "Setting realistic expectations for your financial transformation journey"
      ],
      "0-2": [
        "Identifying common financial misconceptions that hold Americans back",
        "Building confidence to take control of your financial decisions",
        "Creating a positive money mindset foundation"
      ],
      "0-3": [
        "Setting up your personalized financial goals and milestones",
        "Understanding how to track progress throughout the course",
        "Preparing for practical implementation of learning concepts"
      ],
      "0.5-1": [
        "Fundamental difference between assets and liabilities in simple terms",
        "Why understanding money flow is crucial for wealth building",
        "Practical examples from everyday American financial scenarios"
      ],
      "0.5-2": [
        "How inflation quietly erodes your purchasing power over time",
        "Real-world examples of inflation impact on American households",
        "Simple strategies to protect your money from inflation"
      ],
      "10-1": [
        "Key psychological differences between wealth-building and poverty mindsets",
        "How limiting beliefs about money sabotage financial success",
        "Practical techniques to rewire your money mindset"
      ],
      "10-2": [
        "Daily micro-habits that compound into significant wealth over time",
        "How to automate wealth-building behaviors",
        "Creating accountability systems for consistent financial discipline"
      ],
      "11-1": [
        "Designing a custom financial workflow that fits your lifestyle",
        "Integrating banking, budgeting, investing, and insurance seamlessly",
        "Creating automated systems for effortless money management"
      ],
      "11-2": [
        "Month-by-month action plan for your first year of financial transformation",
        "Setting specific, measurable financial milestones",
        "Adjusting goals based on progress and changing circumstances"
      ]
    };
    
    return keyPointsMap[`${levelKey}-${videoId}`] || [
      "Practical financial concepts explained in simple, actionable terms",
      "Real-world examples relevant to American financial landscape",
      "Step-by-step implementation guidance for immediate application"
    ];
  };

  const getPracticalApplication = (levelKey: string, videoId: number | undefined): string => {
    if (!videoId) return "";
    
    const applicationMap: Record<string, string> = {
      "0-1": "Start by downloading the DollarMento mobile app and setting up your financial profile. Begin tracking your current spending patterns for one week to establish a baseline.",
      "0-2": "Identify one limiting belief about money you currently hold and write down three evidence-based counterarguments. Practice positive money affirmations daily.",
      "0-3": "Set up a simple tracking system (spreadsheet or app) to monitor your financial goals. Schedule weekly 15-minute financial check-ins with yourself.",
      "0.5-1": "Categorize all your current possessions and investments into assets vs. liabilities. Create a simple balance sheet to visualize your financial position.",
      "0.5-2": "Calculate how inflation has affected your purchasing power over the last 5 years using specific examples (like food or fuel prices). Research inflation-beating investment options.",
      "10-1": "Complete a money mindset assessment and identify three specific limiting beliefs to work on. Start a daily money gratitude practice.",
      "10-2": "Implement one wealth-building habit this week (like automatic savings or daily expense tracking). Set up accountability with a friend or family member.",
      "11-1": "Create your personalized money management system by selecting specific tools and apps for each financial function. Test the system for one month and refine.",
      "11-2": "Write down your 12-month financial roadmap with specific monthly targets. Schedule quarterly reviews to track progress and adjust goals as needed."
    };
    
    return applicationMap[`${levelKey}-${videoId}`] || "Apply the concepts learned in this video to your personal financial situation within the next 7 days. Track your progress and note any challenges you encounter for discussion in the community.";
  };

  const getRelevantTools = (levelKey: string, videoId: number | undefined): Array<{name: string, description: string, icon: JSX.Element}> => {
    if (!videoId) return [];
    
    // Only show implemented tools that actually exist in the app
    const toolsMap: Record<string, Array<{name: string, description: string, icon: JSX.Element}>> = {
      "0-1": [
        { name: "Budget Planner", description: "Plan and track your monthly budget", icon: <PieChart className="h-5 w-5" /> },
        { name: "Financial Journey", description: "Track your financial progress and milestones", icon: <Target className="h-5 w-5" /> }
      ],
      "0-2": [
        { name: "Financial Freedom Game", description: "Learn through interactive financial scenarios", icon: <Brain className="h-5 w-5" /> },
        { name: "Net Worth Calculator", description: "Calculate your total financial worth", icon: <TrendingUp className="h-5 w-5" /> }
      ],
      "0.5-1": [
        { name: "Net Worth Calculator", description: "Calculate assets minus liabilities", icon: <BarChart3 className="h-5 w-5" /> },
        { name: "Budget Planner", description: "Create and manage your budget", icon: <Calculator className="h-5 w-5" /> },
        { name: "Savings Calculator", description: "Project your savings growth", icon: <FileText className="h-5 w-5" /> }
      ],
      "0.5-2": [
        { name: "Compound Interest Calculator", description: "See the power of compound growth", icon: <TrendingUp className="h-5 w-5" /> },
        { name: "CAGR Calculator", description: "Calculate compound annual growth rate", icon: <Calculator className="h-5 w-5" /> }
      ],
      "1-1": [
        { name: "Budget Planner", description: "Create comprehensive monthly budgets", icon: <PieChart className="h-5 w-5" /> },
        { name: "Budget Buddy", description: "Interactive budget management tool", icon: <Clock className="h-5 w-5" /> }
      ],
      "1-2": [
        { name: "Emergency Fund Calculator", description: "Calculate ideal emergency fund size", icon: <Shield className="h-5 w-5" /> },
        { name: "Savings Calculator", description: "Plan your savings growth", icon: <PiggyBank className="h-5 w-5" /> }
      ],
      "2-1": [
        { name: "Savings Calculator", description: "Compare savings account growth", icon: <Building2 className="h-5 w-5" /> },
        { name: "Money Market Calculator", description: "Calculate money market returns", icon: <Calculator className="h-5 w-5" /> }
      ],
      "3-1": [
        { name: "Mutual Fund Calculator", description: "Calculate mutual fund investments", icon: <Calculator className="h-5 w-5" /> },
        { name: "SIP Calculator", description: "Plan systematic investment plans", icon: <BarChart3 className="h-5 w-5" /> }
      ],
      "4-1": [
        { name: "Stock Average Calculator", description: "Calculate average stock purchase price", icon: <TrendingUp className="h-5 w-5" /> },
        { name: "Brokerage Fees Calculator", description: "Calculate trading costs and fees", icon: <BarChart3 className="h-5 w-5" /> }
      ],
      "7-1": [
        { name: "US Federal Tax Calculator", description: "Calculate federal income tax", icon: <Calculator className="h-5 w-5" /> },
        { name: "HSA Calculator", description: "Plan Health Savings Account benefits", icon: <FileText className="h-5 w-5" /> }
      ],
      "8-1": [
        { name: "Life Insurance Calculator", description: "Calculate life insurance needs", icon: <Shield className="h-5 w-5" /> },
        { name: "Emergency Fund Calculator", description: "Plan for unexpected expenses", icon: <BarChart3 className="h-5 w-5" /> }
      ],
      "9-1": [
        { name: "Retirement Calculator", description: "Plan your retirement savings", icon: <PiggyBank className="h-5 w-5" /> },
        { name: "Social Security Calculator", description: "Estimate Social Security benefits", icon: <Calculator className="h-5 w-5" /> }
      ],
      "10-1": [
        { name: "Financial Journey", description: "Track wealth-building habits", icon: <CheckCircle className="h-5 w-5" /> },
        { name: "Money Saving Challenge", description: "Fun savings challenges", icon: <FileText className="h-5 w-5" /> }
      ],
      "11-1": [
        { name: "Financial Journey", description: "Complete financial planning system", icon: <Target className="h-5 w-5" /> },
        { name: "Budget Buddy", description: "Monthly financial review tool", icon: <Clock className="h-5 w-5" /> }
      ],
      "11-2": [
        { name: "Financial Journey", description: "12-month financial transformation", icon: <Clock className="h-5 w-5" /> },
        { name: "Net Worth Calculator", description: "Track your financial milestones", icon: <Target className="h-5 w-5" /> }
      ]
    };
    
    return toolsMap[`${levelKey}-${videoId}`] || [
      { name: "Financial Calculators", description: "Access all financial tools", icon: <Calculator className="h-5 w-5" /> },
      { name: "Budget Buddy", description: "Manage your budget", icon: <FileText className="h-5 w-5" /> },
      { name: "Financial Journey", description: "Track your progress", icon: <TrendingUp className="h-5 w-5" /> }
    ];
  };

  const courses: Course[] = [
    {
      id: 1,
      title: "DollarMento Financial Mastery - Complete Financial Freedom Journey",
      description: "Comprehensive journey from financial novice to wealth master. 11 progressive levels with interactive tools, real-world actions, and milestone rewards.",
      instructor: "DollarMento Financial Team",
      totalDuration: "12 hours",
      level: "Beginner",
      students: 35420,
      category: "Complete Journey",
      certificate: true,
      completionRate: 15,
      skills: ["Money Mindset", "Budgeting Mastery", "Investment Planning", "Tax Optimization", "Wealth Building", "Financial Psychology"],
      modules: [
        {
          id: 0,
          title: "🧠 LEVEK 0: Orientation & Money Mindset",
          description: "Setup mindset, why money matters, emotional triggers",
          duration: "45 min",
          completed: false,
          unlocked: true,
          videos: [
            {
              id: 1,
              title: "Why Money Habits Matter",
              duration: "4 min",
              completed: false,
              subtopics: [
                {
                  id: 1,
                  title: "Your Beliefs Shape Behavior",
                  timestamp: "0:00",
                  description: "Understanding how childhood money beliefs control your financial decisions",
                  keyPoints: ["Family money patterns", "Cultural money messages", "Subconscious triggers"]
                },
                {
                  id: 2,
                  title: "DollarMento Helps Shift Them",
                  timestamp: "2:30",
                  description: "How our tools and approach transform your money mindset",
                  keyPoints: ["Awareness building", "Habit tracking", "Positive reinforcement"]
                }
              ]
            },
            {
              id: 2,
              title: "Emotional Money Triggers",
              duration: "5 min",
              completed: false,
              subtopics: [
                {
                  id: 3,
                  title: "Fear, Greed, and Comparison",
                  timestamp: "0:00",
                  description: "Identifying the three main emotional drivers of poor money decisions",
                  keyPoints: ["FOMO spending", "Status purchases", "Security hoarding"]
                },
                {
                  id: 4,
                  title: "Building Emotional Awareness",
                  timestamp: "3:00",
                  description: "Practical techniques to pause before financial decisions",
                  keyPoints: ["24-hour rule", "Value alignment check", "Future self visualization"]
                }
              ]
            },
            {
              id: 3,
              title: "Your Financial Why",
              duration: "3 min",
              completed: false,
              subtopics: [
                {
                  id: 5,
                  title: "Finding Your Money Purpose",
                  timestamp: "0:00",
                  description: "Connecting money goals to deeper life values and dreams",
                  keyPoints: ["Life vision", "Family security", "Freedom goals"]
                },
                {
                  id: 6,
                  title: "Creating Your Money Mission",
                  timestamp: "1:30",
                  description: "Writing a personal financial mission statement",
                  keyPoints: ["Clear objectives", "Value-based decisions", "Motivation anchor"]
                }
              ]
            }
          ],
          resources: [
            {
              id: 1,
              title: "Mindset Journal Tool",
              type: "template",
              description: "Daily money mindset tracker and reflection prompts",
              downloadUrl: "#"
            }
          ]
        },
        {
          id: 1,
          title: "💰 LEVEK 1: Budgeting & Control",
          description: "Budgeting, emergency funds, daily tracking",
          duration: "1 hour",
          completed: false,
          unlocked: false,
          videos: [
            {
              id: 4,
              title: "The 50/30/20 Rule Made Simple",
              duration: "5 min",
              completed: false,
              subtopics: [
                {
                  id: 7,
                  title: "Breaking Down Your Income",
                  timestamp: "0:00",
                  description: "How to categorize every rupee for maximum impact",
                  keyPoints: ["50% needs", "30% wants", "20% savings", "Flexibility rules"]
                },
                {
                  id: 8,
                  title: "Common Budgeting Mistakes",
                  timestamp: "3:00",
                  description: "Why most budgets fail and how to avoid the traps",
                  keyPoints: ["Unrealistic expectations", "No emergency buffer", "Ignoring small expenses"]
                }
              ]
            },
            {
              id: 5,
              title: "Emergency Fund in 90 Days",
              duration: "4 min",
              completed: false,
              subtopics: [
                {
                  id: 9,
                  title: "The 3-Month Safety Net",
                  timestamp: "0:00",
                  description: "Why 3 months of expenses is your financial armor",
                  keyPoints: ["Job loss protection", "Medical emergencies", "Peace of mind"]
                },
                {
                  id: 10,
                  title: "Where to Keep Emergency Money",
                  timestamp: "2:30",
                  description: "Best places for instant access without losing value",
                  keyPoints: ["Savings account", "Liquid funds", "Avoid fixed deposits"]
                }
              ]
            },
            {
              id: 6,
              title: "Daily Expense Tracking Hacks",
              duration: "3 min",
              completed: false,
              subtopics: [
                {
                  id: 11,
                  title: "The 2-Minute Rule",
                  timestamp: "0:00",
                  description: "How to track expenses without feeling overwhelmed",
                  keyPoints: ["Instant logging", "Photo receipts", "Weekly reviews"]
                },
                {
                  id: 12,
                  title: "Finding Money Leaks",
                  timestamp: "1:30",
                  description: "Discovering where your money actually goes",
                  keyPoints: ["Subscription audits", "Impulse purchases", "Hidden fees"]
                }
              ]
            }
          ],
          resources: [
            {
              id: 2,
              title: "Budget Planner Tool",
              type: "excel",
              description: "Interactive 50/30/20 budget calculator and tracker",
              downloadUrl: "#"
            },
            {
              id: 3,
              title: "Emergency Fund Calculator",
              type: "template",
              description: "Calculate your emergency fund target and track progress",
              downloadUrl: "#"
            }
          ]
        },
        {
          id: 2,
          title: "🏦 LEVEK 2: Banking & Credit",
          description: "Bank accounts, credit scores, loans",
          duration: "55 min",
          completed: false,
          unlocked: false,
          videos: [
            {
              id: 7,
              title: "Choosing the Right Bank Account",
              duration: "4 min",
              completed: false,
              subtopics: [
                {
                  id: 13,
                  title: "Savings vs Current vs Zero Balance",
                  timestamp: "0:00",
                  description: "Which account type fits your financial stage",
                  keyPoints: ["Minimum balance", "Interest rates", "Transaction limits"]
                },
                {
                  id: 14,
                  title: "Digital Banking Benefits",
                  timestamp: "2:30",
                  description: "Why online banks often offer better deals",
                  keyPoints: ["Lower fees", "Higher interest", "24/7 access"]
                }
              ]
            },
            {
              id: 8,
              title: "Credit Score Fundamentals",
              duration: "5 min",
              completed: false,
              subtopics: [
                {
                  id: 15,
                  title: "What Affects Your FICO Score",
                  timestamp: "0:00",
                  description: "The 5 factors that determine your creditworthiness",
                  keyPoints: ["Payment history", "Credit utilization", "Credit age", "Credit mix"]
                },
                {
                  id: 16,
                  title: "Building Credit from Zero",
                  timestamp: "3:00",
                  description: "Step-by-step guide for credit beginners",
                  keyPoints: ["Secured credit card", "Small loans", "Bill payments"]
                }
              ]
            },
            {
              id: 9,
              title: "Smart Loan Decisions",
              duration: "4 min",
              completed: false,
              subtopics: [
                {
                  id: 17,
                  title: "Good Debt vs Bad Debt",
                  timestamp: "0:00",
                  description: "Which loans help build wealth vs destroy it",
                  keyPoints: ["Home loans", "Education loans", "Credit card debt"]
                },
                {
                  id: 18,
                  title: "Loan Application Strategy",
                  timestamp: "2:30",
                  description: "How to get the best rates and terms",
                  keyPoints: ["Credit score optimization", "Income documentation", "Comparison shopping"]
                }
              ]
            }
          ]
        },
        {
          id: 3,
          title: "📈 LEVEK 3: Basics of Investing",
          description: "Mutual funds, investments, risk, compounding",
          duration: "1.2 hours",
          completed: false,
          unlocked: false,
          videos: [
            {
              id: 10,
              title: "Investing vs Saving",
              duration: "4 min",
              completed: false,
              subtopics: [
                {
                  id: 19,
                  title: "Why Savings Accounts Lose Money",
                  timestamp: "0:00",
                  description: "How inflation silently steals your wealth",
                  keyPoints: ["Inflation reality", "Real returns", "Purchasing power"]
                },
                {
                  id: 20,
                  title: "The Magic of Compounding",
                  timestamp: "2:30",
                  description: "How small amounts become large fortunes",
                  keyPoints: ["Time advantage", "Compound interest", "Einstein's 8th wonder"]
                }
              ]
            },
            {
              id: 11,
              title: "Mutual Funds Made Simple",
              duration: "5 min",
              completed: false,
              subtopics: [
                {
                  id: 21,
                  title: "What Are Mutual Funds Really",
                  timestamp: "0:00",
                  description: "Pool money concept explained in plain language",
                  keyPoints: ["Professional management", "Diversification", "Shared costs"]
                },
                {
                  id: 22,
                  title: "Equity vs Debt Funds",
                  timestamp: "3:00",
                  description: "Risk and return profiles of different fund types",
                  keyPoints: ["Growth potential", "Safety levels", "Time horizons"]
                }
              ]
            },
            {
              id: 12,
              title: "investment - Your Wealth Machine",
              duration: "6 min",
              completed: false,
              subtopics: [
                {
                  id: 23,
                  title: "Why investment Beats Lump Sum",
                  timestamp: "0:00",
                  description: "Rupee cost averaging and market timing myths",
                  keyPoints: ["Average cost benefit", "Discipline building", "Market volatility handling"]
                },
                {
                  id: 24,
                  title: "Starting Your First investment",
                  timestamp: "3:30",
                  description: "Practical steps to begin systematic investing",
                  keyPoints: ["Amount selection", "Fund choice", "Auto-debit setup"]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const toggleVideo = (videoId: number) => {
    setExpandedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group h-fit">
      <div className="relative">
        <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-t-lg flex items-center justify-center">
          <Play className="w-10 h-10 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-white/90 text-xs">
            {course.level}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <Progress value={course.completionRate} className="h-1" />
          <div className="text-white text-xs mt-1">{course.completionRate}% Complete</div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>
        </div>
        
        <h3 className="text-base font-semibold mb-1 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-1 mb-2 text-xs text-gray-600">
          <span>By {course.instructor}</span>
        </div>

        <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {course.totalDuration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {course.students.toLocaleString()}
          </div>
        </div>

        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {course.skills.slice(0, 2).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {course.skills.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{course.skills.length - 2} more
              </Badge>
            )}
          </div>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
          Start Learning
        </Button>
      </CardContent>
    </Card>
  );

  const CourseDetail = ({ course }: { course: Course }) => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedCourse(null)}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{course.title}</h1>
              <p className="text-gray-600">{course.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
        {/* Main Video Area - 3/4 width */}
        <div className="lg:col-span-3 bg-black">
          <div className="aspect-video bg-black flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="w-20 h-20 mx-auto mb-4 opacity-60" />
              <h3 className="text-xl font-semibold mb-2">Level 0: Orientation & Money Mindset</h3>
              <p className="text-gray-300">Click any video from the course content to start learning</p>
            </div>
          </div>
          
          {/* Video Description Area */}
          <div className="bg-white p-6">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold mb-4">Welcome to DollarMento Financial Mastery</h2>
              <p className="text-gray-600 mb-6">
                Master the American financial system from the ground up. This comprehensive course 
                is designed to take you from financial uncertainty to confidence with USA-specific content, tools, and strategies.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <div className="font-semibold">{course.totalDuration}</div>
                  <div className="text-sm text-gray-600">Total Duration</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Users className="w-8 h-8 mx-auto text-green-600 mb-2" />
                  <div className="font-semibold">{course.students.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Award className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                  <div className="font-semibold">Certificate</div>
                  <div className="text-sm text-gray-600">Upon Completion</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Skills You'll Master</h3>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Sidebar - 1/4 width */}
        <div className="lg:col-span-1 bg-white border-l border-gray-200 max-h-screen overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">Course Content</h3>

            </div>
            <p className="text-sm text-gray-600">{course.modules.length} levels • {course.totalDuration}</p>
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{course.completionRate}%</span>
              </div>
              <Progress value={course.completionRate} className="h-2" />
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {course.modules.map((module) => (
              <div key={module.id} className="">
                <div 
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${module.unlocked ? '' : 'opacity-50'}`}
                  onClick={() => module.unlocked && toggleModule(module.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {expandedModules.includes(module.id) ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      {module.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full border-2 ${module.unlocked ? 'border-blue-500' : 'border-gray-300'}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{module.title}</h4>
                      <p className="text-xs text-gray-500">{module.videos.length} videos • {module.duration}</p>
                    </div>
                  </div>
                </div>
                
                {expandedModules.includes(module.id) && (
                  <div className="bg-gray-50">
                    {module.videos.map((video) => (
                      <div key={video.id}>
                        <div 
                          className="px-4 py-3 pl-12 cursor-pointer hover:bg-gray-100 transition-colors border-l-2 border-transparent hover:border-l-blue-500"
                          onClick={() => {
                            setSelectedVideo(video.id);
                            // Scroll to top of the page where video player is located
                            window.scrollTo({
                              top: 0,
                              behavior: 'smooth'
                            });
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <Play className="w-3 h-3 text-gray-500" />
                            <div className="flex-1">
                              <h5 className="font-medium text-sm">{video.title}</h5>
                              <p className="text-xs text-gray-500">{video.duration}</p>
                            </div>
                            {video.completed && <CheckCircle className="w-3 h-3 text-green-500" />}
                          </div>
                        </div>
                        
                        {expandedVideos.includes(video.id) && (
                          <div className="px-4 py-2 pl-16 bg-gray-100">
                            {video.subtopics.map((subtopic) => (
                              <div key={subtopic.id} className="py-1">
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="font-medium text-blue-600">{subtopic.timestamp}</span>
                                  <span className="text-gray-600">{subtopic.title}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Module Resources */}
                    {module.resources && module.resources.length > 0 && (
                      <div className="px-4 py-3 pl-12 bg-blue-50">
                        <h6 className="text-xs font-semibold text-blue-800 mb-2 flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          Resources
                        </h6>
                        {module.resources.map((resource) => (
                          <div key={resource.id} className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <FileText className="w-3 h-3 text-blue-600" />
                              <span className="text-xs font-medium">{resource.title}</span>
                            </div>
                            <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                              Get
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const LevelDetail = ({ levelKey }: { levelKey: string }) => {
    const level = levelData[levelKey as keyof typeof levelData];
    if (!level) return null;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Compact Header */}
        <div className="bg-slate-800 text-white py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-lg md:text-xl font-bold truncate">{level.title}</h1>
                <p className="text-slate-300 text-sm truncate">{level.description}</p>
              </div>
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => setSelectedLevel(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white ml-4 flex-shrink-0"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Video Player */}
            <div className="lg:col-span-2">
              <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-4">
                {selectedVideo ? (() => {
                  const currentVideo = level.videos.find(v => v.id === selectedVideo);
                  if (currentVideo?.videoUrl) {
                    const embedUrl = `https://www.youtube.com/embed/${currentVideo.videoUrl}?autoplay=0&controls=1&modestbranding=1&rel=0&showinfo=0&fs=0&disablekb=1&iv_load_policy=3&cc_load_policy=0&origin=${window.location.origin}&enablejsapi=1&widget_referrer=${window.location.origin}`;
                    return (
                      <iframe
                        src={embedUrl}
                        className="w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={currentVideo.title}
                      />
                    );
                  } else {
                    return (
                      <div className="text-center text-white flex flex-col items-center justify-center h-full">
                        <Play className="h-12 w-12 mx-auto mb-3 opacity-60" />
                        <h3 className="text-lg font-semibold mb-2">{currentVideo?.title}</h3>
                        <p className="text-sm text-gray-300">Video will be available soon</p>
                      </div>
                    );
                  }
                })() : (
                  <div className="text-center text-white flex flex-col items-center justify-center h-full">
                    <Play className="h-12 w-12 mx-auto mb-3 opacity-60" />
                    <h3 className="text-lg font-semibold mb-2">What is DollarMento?</h3>
                    <p className="text-sm text-gray-300">Click any video from the course content to start learning</p>
                  </div>
                )}
              </div>

              {/* Selected Video Content Only */}
              {selectedVideo ? (() => {
                const currentVideo = level.videos.find(v => v.id === selectedVideo);
                const videoContent = (currentVideo as any)?.content || currentVideo?.description;
                
                return (
                  <div className="bg-white rounded-lg shadow-sm border">
                    {/* Video Header */}
                    <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h2 className="text-lg font-bold text-gray-900 mb-1">
                            {currentVideo?.title}
                          </h2>
                          <div className="flex items-center gap-3 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{currentVideo?.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <PlayCircle className="h-3 w-3" />
                              <span>Video Lesson</span>
                            </div>
                            {currentVideo?.videoUrl && (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-3 w-3" />
                                <span>Available</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Video Description */}
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="text-base font-semibold text-gray-900 mb-2">What You'll Learn</h3>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {videoContent}
                        </p>
                      </div>

                      {/* Key Learning Points */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Learning Points</h4>
                        <div className="grid gap-2">
                          {getVideoKeyPoints(levelKey, currentVideo?.id).map((point, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-blue-600 text-xs font-semibold">{index + 1}</span>
                              </div>
                              <p className="text-gray-700 text-xs">{point}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Practical Application */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <h4 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
                          <Target className="h-3 w-3" />
                          Real-World Application
                        </h4>
                        <p className="text-green-700 text-xs">
                          {getPracticalApplication(levelKey, currentVideo?.id)}
                        </p>
                      </div>

                      {/* Relevant Tools - Compact Version */}
                      <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                          <Calculator className="h-4 w-4 text-blue-600" />
                          Relevant Tools for This Topic
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {getRelevantTools(levelKey, currentVideo?.id).map((tool, index) => {
                            const getToolRoute = (toolName: string) => {
                              const routeMap: Record<string, string> = {
                                // Only routes for implemented tools
                                "Financial Calculators": "/financial-calculators",
                                "Budget Buddy": "/budget-buddy",
                                "Financial Journey": "/financial-journey",
                                "Budget Planner": "/budget-planner-calculator",
                                "Financial Freedom Game": "/financial-freedom-game",
                                "Net Worth Calculator": "/net-worth-calculator",
                                "Compound Interest Calculator": "/compound-interest-calculator",
                                "CAGR Calculator": "/cagr-calculator",
                                "Emergency Fund Calculator": "/emergency-fund-calculator",
                                "Savings Calculator": "/savings-calculator",
                                "Money Market Calculator": "/money-market-calculator",
                                "Mutual Fund Calculator": "/mutual-fund-calculator",
                                "SIP Calculator": "/sip-calculator",
                                "Stock Average Calculator": "/stock-average-calculator",
                                "Brokerage Fees Calculator": "/brokerage-fees-calculator",
                                "US Federal Tax Calculator": "/tax-calculator",
                                "HSA Calculator": "/hsa-calculator",
                                "Life Insurance Calculator": "/life-insurance-calculator",
                                "Retirement Calculator": "/retirement-calculator",
                                "Social Security Calculator": "/social-security-calculator",
                                "Money Saving Challenge": "/money-saving-challenge-generator"
                              };
                              return routeMap[toolName] || "/financial-calculators";
                            };

                            return (
                              <Link key={index} href={getToolRoute(tool.name)}>
                                <div className="bg-white/80 rounded-lg p-2 hover:bg-white hover:shadow-md transition-all duration-200 cursor-pointer group border border-white/50">
                                  <div className="flex flex-col items-center text-center gap-1">
                                    <div className="text-blue-600 group-hover:text-blue-700 transition-colors">
                                      {tool.icon}
                                    </div>
                                    <span className="text-xs font-medium text-slate-700 group-hover:text-blue-700 transition-colors line-clamp-2">
                                      {tool.name}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })() : (
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="border-b bg-gradient-to-r from-slate-50 to-gray-50 p-3">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Welcome to Your Financial Journey</h2>
                    <p className="text-gray-600 text-sm">
                      Select any video from the course content to begin your personalized learning experience
                    </p>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-4">
                      <h3 className="text-base font-semibold text-gray-900 mb-2">Course Overview</h3>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        Transform from financial novice to wealth master through this comprehensive, 
                        gamified learning journey designed specifically for Indian learners. Each level 
                        builds upon the previous one, ensuring you develop practical financial skills 
                        that you can apply immediately.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                          <GraduationCap className="h-3 w-3" />
                          Learning Approach
                        </h4>
                        <p className="text-blue-800 text-xs">
                          Interactive, scenario-based learning with real American financial examples and case studies
                        </p>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                          <TrendingUp className="h-3 w-3" />
                          Practical Focus
                        </h4>
                        <p className="text-green-800 text-xs">
                          Every lesson includes actionable steps you can implement in your financial life immediately
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Course Progress */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{level.title}</CardTitle>
                  <p className="text-sm text-gray-600">{level.videoCount || level.videos.length} videos • {level.duration}</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>0%</span>
                    </div>
                    <Progress value={0} className="h-1.5" />
                  </div>
                  
                  <div className="space-y-1">
                    {level.videos.map((video) => {
                      const videoKey = `${levelKey}-${video.id}`;
                      const isCompleted = completedVideos.has(videoKey);
                      const progress = getVideoProgress(levelKey, video.id);
                      const isSelected = selectedVideo === video.id;
                      
                      return (
                        <div 
                          key={video.id} 
                          className={`p-2 rounded cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-md active:scale-95 ${
                            isSelected 
                              ? 'bg-blue-100 shadow-sm border-blue-200 border scale-105' 
                              : 'bg-gray-100 hover:bg-blue-50 hover:border-blue-200 border border-transparent'
                          }`}
                          onClick={() => {
                            selectVideo(levelKey, video.id);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-xs text-gray-900">{video.title}</h4>
                                {isCompleted && (
                                  <CheckCircle className="h-3 w-3 text-green-600" />
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="text-xs text-gray-500">{video.duration}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {/* Like Button with Pop Animation */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLikeVideo(levelKey, video.id);
                                }}
                                className={`p-1 rounded-full transition-all duration-200 transform hover:scale-110 ${
                                  likedVideos.has(videoKey)
                                    ? 'text-red-500 hover:text-red-600'
                                    : 'text-gray-400 hover:text-red-400'
                                } ${
                                  animatingLikes.has(videoKey) 
                                    ? 'animate-bounce scale-125' 
                                    : ''
                                }`}
                              >
                                <Heart 
                                  className={`h-3.5 w-3.5 transition-all duration-200 ${
                                    likedVideos.has(videoKey) ? 'fill-current' : ''
                                  }`}
                                />
                              </button>
                              {video.videoUrl && (
                                <div className="flex items-center gap-1 text-xs text-green-600">
                                  <Play className="h-2.5 w-2.5" />
                                  Watch
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (selectedLevel) {
    return <LevelDetail levelKey={selectedLevel} />;
  }

  if (selectedCourse) {
    const course = courses.find(c => c.id === selectedCourse);
    if (!course) return null;
    return <CourseDetail course={course} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Financial Learning Hub - Complete Financial Education Platform USA"
        description="Comprehensive financial education with 8 levels of progressive learning. Master budgeting, investing, retirement planning, tax strategies & more. Interactive video courses designed for American learners."
        keywords="financial education, personal finance education, money management education, financial literacy course, investment education, budgeting education, financial learning hub, financial education platform, personal finance learning center, money management education hub, comprehensive financial education platform, financial literacy program, investment education center, retirement planning education, tax planning education, financial education resources, american financial education, financial learning platform, financial knowledge center, personal finance course"
        canonical="https://dollarmento.com/learning-hub"
        ogType="website"
      />
      {/* Compact Hero Section */}
      <div className="bg-slate-700 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-xl font-bold mb-1">DollarMento Financial Mastery</h1>
            <p className="text-sm mb-3">Complete Financial Freedom Journey</p>
            <div className="flex gap-4 justify-center">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                onClick={handleStartResumeCourse}
              >
                {hasStartedCourse ? "Resume Course" : "Start Course"}
              </Button>

            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-xl font-bold mb-4">Welcome to DollarMento Financial Mastery!</h2>
              
              {/* Course Overview */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all duration-200 group">
                  <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm group-hover:text-blue-700 transition-colors">Welcome To The Course!</h3>
                    <p className="text-xs text-gray-600 group-hover:text-gray-700">Start your journey to financial freedom with America's most comprehensive gamified learning platform designed for practical wealth building.</p>
                  </div>
                </div>

                <div 
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all duration-200 group"
                  onClick={() => window.open('https://www.facebook.com/groups/272109120126823/', '_blank')}
                >
                  <div className="w-10 h-10 bg-green-600 rounded-md flex items-center justify-center group-hover:bg-green-700 transition-colors">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm group-hover:text-blue-700 transition-colors">Join The Learning Community!</h3>
                    <p className="text-xs text-gray-600 group-hover:text-gray-700">Connect with fellow learners, share progress, ask questions, and get support from our active community of financial freedom seekers.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all duration-200 group">
                  <div className="w-10 h-10 bg-purple-600 rounded-md flex items-center justify-center group-hover:bg-purple-700 transition-colors">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm group-hover:text-blue-700 transition-colors">How to Use This Course</h3>
                    <p className="text-xs text-gray-600 group-hover:text-gray-700">Learn the proven system to progress through levels, complete challenges, use calculators, and track your journey to financial independence.</p>
                  </div>
                </div>
              </div>

              {/* Course Levels */}
              <div>
                <h3 className="text-sm font-bold mb-2">Course Curriculum</h3>
                <div className="space-y-2">
                  <div 
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 group ${
                      selectedLevel === "0" 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => selectLevel("0")}
                  >
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center group-hover:bg-blue-700 transition-colors ${
                      selectedLevel === "0" ? 'bg-blue-600' : 'bg-gray-500'
                    }`}>
                      <GraduationCap className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm group-hover:text-blue-800 transition-colors">LEVEL 0: Welcome to DollarMento</h4>
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">What is DollarMento? Why Learn About Money? How This Learning Journey Works</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium group-hover:text-blue-700 transition-colors">3 videos</div>
                      <div className="text-xs text-gray-500">12 min</div>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                    onClick={() => selectLevel("0.5")}
                  >
                    <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                      <Coins className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm group-hover:text-blue-800 transition-colors">LEVEL 0.5: Money Basics for Absolute Beginners</h4>
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">What is Money Used For? Wants vs Needs, Pay Yourself First, Cash Flow Basics</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium group-hover:text-blue-700 transition-colors">10 videos</div>
                      <div className="text-xs text-gray-500">35 min</div>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                    onClick={() => selectLevel("1")}
                  >
                    <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                      <PieChart className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm group-hover:text-blue-800 transition-colors">LEVEL 1: Budgeting & Control</h4>
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">50-30-20 Rule, Emergency Fund, Daily Expense Tracking</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium group-hover:text-blue-700 transition-colors">6 videos</div>
                      <div className="text-xs text-gray-500">23 min</div>
                    </div>
                  </div>

                  <div 
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 group ${
                      selectedLevel === "2" 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => selectLevel("2")}
                  >
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center group-hover:bg-blue-700 transition-colors ${
                      selectedLevel === "2" ? 'bg-blue-600' : 'bg-gray-500'
                    }`}>
                      <Wallet className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm group-hover:text-blue-800 transition-colors">LEVEL 2: Banking & Credit</h4>
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">Understanding banking systems and building credit responsibly</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium group-hover:text-blue-700 transition-colors">6 videos</div>
                      <div className="text-xs text-gray-500">28 min</div>
                    </div>
                  </div>

                  <div 
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 group ${
                      selectedLevel === "3" 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => selectLevel("3")}
                  >
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center group-hover:bg-blue-700 transition-colors ${
                      selectedLevel === "3" ? 'bg-blue-600' : 'bg-gray-500'
                    }`}>
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm group-hover:text-blue-800 transition-colors">LEVEL 3: Introduction to Investing</h4>
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">Start your investing journey with confidence</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium group-hover:text-blue-700 transition-colors">6 videos</div>
                      <div className="text-xs text-gray-500">25 min</div>
                    </div>
                  </div>

                  <div 
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 group ${
                      selectedLevel === "4" 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => selectLevel("4")}
                  >
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center group-hover:bg-blue-700 transition-colors ${
                      selectedLevel === "4" ? 'bg-blue-600' : 'bg-gray-500'
                    }`}>
                      <BarChart3 className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm group-hover:text-blue-800 transition-colors">LEVEL 4: American Stock Market Basics</h4>
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">Understanding the US stock market and direct equity investing</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium group-hover:text-blue-700 transition-colors">6 videos</div>
                      <div className="text-xs text-gray-500">22 min</div>
                    </div>
                  </div>

                  <div 
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 group ${
                      selectedLevel === "5" 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => selectLevel("5")}
                  >
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center group-hover:bg-blue-700 transition-colors ${
                      selectedLevel === "5" ? 'bg-blue-600' : 'bg-gray-500'
                    }`}>
                      <Coins className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm group-hover:text-blue-800 transition-colors">LEVEL 5: Gold, Bonds & Alternate Assets</h4>
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">Diversifying beyond stocks and index funds</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium group-hover:text-blue-700 transition-colors">5 videos</div>
                      <div className="text-xs text-gray-500">18 min</div>
                    </div>
                  </div>

                  <div 
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 group ${
                      selectedLevel === "6" 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => selectLevel("6")}
                  >
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center group-hover:bg-blue-700 transition-colors ${
                      selectedLevel === "6" ? 'bg-blue-600' : 'bg-gray-500'
                    }`}>
                      <Target className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm group-hover:text-blue-800 transition-colors">LEVEL 6: Goal Setting & Future Planning</h4>
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">Planning and achieving your financial goals</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium group-hover:text-blue-700 transition-colors">5 videos</div>
                      <div className="text-xs text-gray-500">20 min</div>
                    </div>
                  </div>

                  <div 
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 group ${
                      selectedLevel === "7" 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => selectLevel("7")}
                  >
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center group-hover:bg-blue-700 transition-colors ${
                      selectedLevel === "7" ? 'bg-blue-600' : 'bg-gray-500'
                    }`}>
                      <Calculator className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm group-hover:text-blue-800 transition-colors">LEVEL 7: Taxation Simplified</h4>
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">Understanding taxes and optimizing your tax liability</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium group-hover:text-blue-700 transition-colors">5 videos</div>
                      <div className="text-xs text-gray-500">22 min</div>
                    </div>
                  </div>

                  <div 
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 group ${
                      selectedLevel === "8" 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => selectLevel("8")}
                  >
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center group-hover:bg-blue-700 transition-colors ${
                      selectedLevel === "8" ? 'bg-blue-600' : 'bg-gray-500'
                    }`}>
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm group-hover:text-blue-800 transition-colors">LEVEL 8: Insurance & Protection</h4>
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">Protecting yourself and your wealth with insurance</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium group-hover:text-blue-700 transition-colors">5 videos</div>
                      <div className="text-xs text-gray-500">19 min</div>
                    </div>
                  </div>

                  <div 
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 group ${
                      selectedLevel === "9" 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => selectLevel("9")}
                  >
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center group-hover:bg-blue-700 transition-colors ${
                      selectedLevel === "9" ? 'bg-blue-600' : 'bg-gray-500'
                    }`}>
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm group-hover:text-blue-800 transition-colors">LEVEL 9: Retirement Planning</h4>
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">Planning for a comfortable retirement</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium group-hover:text-blue-700 transition-colors">4 videos</div>
                      <div className="text-xs text-gray-500">16 min</div>
                    </div>
                  </div>

                  <div 
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 group ${
                      selectedLevel === "10" 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => selectLevel("10")}
                  >
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center group-hover:bg-blue-700 transition-colors ${
                      selectedLevel === "10" ? 'bg-blue-600' : 'bg-gray-500'
                    }`}>
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm group-hover:text-blue-800 transition-colors">LEVEL 10: Financial Mindset & Habits</h4>
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">Developing wealth-building mindset and habits</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium group-hover:text-blue-700 transition-colors">5 videos</div>
                      <div className="text-xs text-gray-500">21 min</div>
                    </div>
                  </div>

                  <div 
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 group ${
                      selectedLevel === "11" 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => selectLevel("11")}
                  >
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center group-hover:bg-blue-700 transition-colors ${
                      selectedLevel === "11" ? 'bg-blue-600' : 'bg-gray-500'
                    }`}>
                      <Target className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm group-hover:text-blue-800 transition-colors">LEVEL 11: Your Financial Launch Plan</h4>
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">Consolidate everything and build a personal, actionable money system</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium group-hover:text-blue-700 transition-colors">4 videos</div>
                      <div className="text-xs text-gray-500">18 min</div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">DM</span>
                </div>
                <h3 className="font-bold text-lg">DollarMento Financial Mastery</h3>
                <p className="text-sm text-gray-600 mt-3">
                  Practical, gamified learning to make financial literacy accessible for everyone in America.
                </p>
              </div>

              <div className="space-y-4">
                {shouldShowProgress() && (
                  <div>
                    <div className="text-sm font-medium mb-1">{getTotalCompletedVideos()} of {getTotalVideos()} Lessons Completed</div>
                    <Progress value={Math.round((getTotalCompletedVideos() / getTotalVideos()) * 100)} className="h-2" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}