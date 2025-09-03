import { 
  users, type User, type UpsertUser,
  smsMessages, type SmsMessage, type InsertSmsMessage,
  financialTransactions, type FinancialTransaction, type InsertFinancialTransaction,
  userDevices, type UserDevice, type InsertUserDevice,


  subscriptionPlans, type SubscriptionPlan, type InsertSubscriptionPlan,
  paymentTransactions, type PaymentTransaction, type InsertPaymentTransaction,
  checkpoints, type Checkpoint, type InsertCheckpoint,
  userCheckpointProgress, type UserCheckpointProgress, type InsertUserCheckpointProgress,
  userAchievements, type UserAchievement, type InsertUserAchievement,
  userLearningProfiles, type UserLearningProfile, type InsertUserLearningProfile
} from "@shared/schema";

export interface IStorage {

  // Firebase User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserSubscription(userId: string, subscriptionData: Partial<User>): Promise<User | undefined>;
  
  // Subscription methods
  getSubscriptionPlans(): Promise<SubscriptionPlan[]>;
  getSubscriptionPlan(id: string): Promise<SubscriptionPlan | undefined>;
  createSubscriptionPlan(plan: InsertSubscriptionPlan): Promise<SubscriptionPlan>;
  
  // Payment methods
  getPaymentTransactions(userId: string): Promise<PaymentTransaction[]>;
  createPaymentTransaction(transaction: InsertPaymentTransaction): Promise<PaymentTransaction>;
  updatePaymentTransaction(id: number, data: Partial<PaymentTransaction>): Promise<PaymentTransaction | undefined>;
  
  // SMS-related methods
  getSMSMessages(userId: number, processed?: boolean): Promise<SmsMessage[]>;
  createSMSMessage(message: InsertSmsMessage): Promise<SmsMessage>;
  updateSMSMessage(id: string, data: Partial<InsertSmsMessage>): Promise<SmsMessage | undefined>;
  
  // Financial transactions from SMS
  getFinancialTransactions(userId: number): Promise<FinancialTransaction[]>;
  getFinancialTransaction(id: string): Promise<FinancialTransaction | undefined>;
  createFinancialTransaction(transaction: InsertFinancialTransaction): Promise<FinancialTransaction>;
  
  // User devices for SMS sync
  getUserDevices(userId: number): Promise<UserDevice[]>;
  getUserDevice(id: string): Promise<UserDevice | undefined>;
  getUserDeviceByDeviceId(userId: number, deviceId: string): Promise<UserDevice | undefined>;
  createUserDevice(device: InsertUserDevice): Promise<UserDevice>;
  updateUserDevice(id: string, data: Partial<InsertUserDevice>): Promise<UserDevice | undefined>;
  updateUserDeviceByDeviceId(userId: number, deviceId: string, data: Partial<InsertUserDevice>): Promise<UserDevice | undefined>;
  deleteUserDevice(id: string): Promise<boolean>;
  
  // Investment methods
  getInvestments(userId: number): Promise<any[]>;
  getInvestment(id: number): Promise<any | undefined>;
  createInvestment(investment: any): Promise<any>;
  updateInvestment(id: number, data: any): Promise<any | undefined>;
  
  // Transaction methods
  getTransactionsByUserId(userId: number, limit?: number): Promise<FinancialTransaction[]>;
  getTransactionById(id: string): Promise<FinancialTransaction | undefined>;
  createTransaction(transaction: InsertFinancialTransaction): Promise<FinancialTransaction>;
  updateTransactionCategory(id: string, category: string): Promise<FinancialTransaction | undefined>;
  deleteTransaction(id: string): Promise<boolean>;
  
  // SIP methods
  getActiveSIPs(userId: number): Promise<any[]>;
  createSIP(sip: any): Promise<any>;
  updateSIP(id: number, data: any): Promise<any | undefined>;
  
  // Market data methods
  getMarketIndices(): Promise<any[]>;
  updateMarketIndex(id: number, data: any): Promise<any | undefined>;
  createMarketIndex(marketIndex: any): Promise<any>;
  
  // Top performers methods
  getTopPerformers(): Promise<any[]>;
  createTopPerformer(performer: any): Promise<any>;
  
  // Market news methods
  getMarketNews(): Promise<any[]>;
  createMarketNews(news: any): Promise<any>;
  
  // Portfolio summary methods
  getPortfolioSummary(userId: number): Promise<any | undefined>;
  createPortfolioSummary(summary: any): Promise<any>;
  updatePortfolioSummary(userId: number, data: any): Promise<any | undefined>;
  
  // Asset allocation methods
  getAssetAllocations(userId: number): Promise<any[]>;
  createAssetAllocation(allocation: any): Promise<any>;
  updateAssetAllocation(id: number, data: any): Promise<any | undefined>;
  
  // Home Loan Calculation methods
  getHomeLoanCalculations(userId?: number): Promise<any[]>;
  getHomeLoanCalculation(id: number): Promise<any | undefined>;
  getHomeLoanCalculationById(id: number): Promise<any | undefined>;
  createHomeLoanCalculation(calculation: any): Promise<any>;
  deleteHomeLoanCalculation(id: number): Promise<boolean>;
  

  

  
  // Checkpoint methods
  getCheckpoints(category?: string, level?: number, isFree?: boolean): Promise<Checkpoint[]>;
  getCheckpoint(id: number): Promise<Checkpoint | undefined>;
  createCheckpoint(checkpoint: InsertCheckpoint): Promise<Checkpoint>;
  updateCheckpoint(id: number, data: Partial<Checkpoint>): Promise<Checkpoint | undefined>;
  
  // User checkpoint progress methods
  getUserCheckpointProgress(userId: string, checkpointId?: number): Promise<UserCheckpointProgress[]>;
  getUserCheckpointProgressById(id: number): Promise<UserCheckpointProgress | undefined>;
  createUserCheckpointProgress(progress: InsertUserCheckpointProgress): Promise<UserCheckpointProgress>;
  updateUserCheckpointProgress(id: number, data: Partial<UserCheckpointProgress>): Promise<UserCheckpointProgress | undefined>;
  
  // User achievement methods
  getUserAchievements(userId: string): Promise<UserAchievement[]>;
  createUserAchievement(achievement: InsertUserAchievement): Promise<UserAchievement>;
  
  // User learning profile methods
  getUserLearningProfile(userId: string): Promise<UserLearningProfile | undefined>;
  createUserLearningProfile(profile: InsertUserLearningProfile): Promise<UserLearningProfile>;
  updateUserLearningProfile(userId: string, data: Partial<UserLearningProfile>): Promise<UserLearningProfile | undefined>;
}

// DatabaseStorage removed - switching to MemStorage for simplicity
import { MemStorage } from './MemStorage';

// Use MemStorage for development without authentication
export const storage = new MemStorage();