import { 
  type User, type UpsertUser,
  type SmsMessage, type InsertSmsMessage,
  type FinancialTransaction, type InsertFinancialTransaction,
  type UserDevice, type InsertUserDevice,
  type SubscriptionPlan, type InsertSubscriptionPlan,
  type PaymentTransaction, type InsertPaymentTransaction,
  type Checkpoint, type InsertCheckpoint,
  type UserCheckpointProgress, type InsertUserCheckpointProgress,
  type UserAchievement, type InsertUserAchievement,
  type UserLearningProfile, type InsertUserLearningProfile
} from "@shared/schema";

import { IStorage } from "./storage";

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private smsMessages: Map<string, SmsMessage> = new Map();
  private financialTransactions: Map<string, FinancialTransaction> = new Map();
  private userDevices: Map<string, UserDevice> = new Map();
  private subscriptionPlans: Map<string, SubscriptionPlan> = new Map();
  private paymentTransactions: Map<number, PaymentTransaction> = new Map();
  private checkpoints: Map<number, Checkpoint> = new Map();
  private userCheckpointProgress: Map<number, UserCheckpointProgress> = new Map();
  private userAchievements: Map<number, UserAchievement> = new Map();
  private userLearningProfiles: Map<string, UserLearningProfile> = new Map();

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return undefined;
  }

  async upsertUser(user: UpsertUser): Promise<User> {
    const existingUser = await this.getUserByEmail(user.email || '');
    if (existingUser) {
      const updatedUser = { ...existingUser, ...user };
      this.users.set(existingUser.id, updatedUser);
      return updatedUser;
    } else {
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: user.email || null,
        createdAt: new Date(),
        updatedAt: new Date(),
        firstName: user.firstName || null,
        lastName: user.lastName || null,
        profileImageUrl: user.profileImageUrl || null,
        subscriptionStatus: user.subscriptionStatus || 'free',
        subscriptionPlan: user.subscriptionPlan || null,
        stripeCustomerId: user.stripeCustomerId || null,
        stripeSubscriptionId: user.stripeSubscriptionId || null,
        subscriptionStartDate: user.subscriptionStartDate || null,
        subscriptionEndDate: user.subscriptionEndDate || null
      };
      this.users.set(newUser.id, newUser);
      return newUser;
    }
  }

  async updateUserSubscription(userId: string, subscriptionData: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...subscriptionData, updatedAt: new Date() };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Subscription methods
  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return Array.from(this.subscriptionPlans.values());
  }

  async getSubscriptionPlan(id: string): Promise<SubscriptionPlan | undefined> {
    return this.subscriptionPlans.get(id);
  }

  async createSubscriptionPlan(plan: InsertSubscriptionPlan): Promise<SubscriptionPlan> {
    const id = `plan_${Date.now()}`;
    const newPlan: SubscriptionPlan = {
      ...plan,
      id,
      description: plan.description || null,
      active: plan.active || null,
      currency: plan.currency || null,
      features: plan.features || null,
      stripePriceId: plan.stripePriceId || null,
      createdAt: new Date()
    };
    this.subscriptionPlans.set(newPlan.id, newPlan);
    return newPlan;
  }

  // Payment methods
  async getPaymentTransactions(userId: string): Promise<PaymentTransaction[]> {
    return Array.from(this.paymentTransactions.values()).filter(t => t.userId === userId);
  }

  async createPaymentTransaction(transaction: InsertPaymentTransaction): Promise<PaymentTransaction> {
    const id = Date.now();
    const newTransaction: PaymentTransaction = {
      id,
      ...transaction,
      stripePaymentIntentId: transaction.stripePaymentIntentId || null,
      stripeSubscriptionId: transaction.stripeSubscriptionId || null,
      currency: transaction.currency || null,
      planId: transaction.planId || null,
      metadata: transaction.metadata || null,
      createdAt: new Date()
    };
    this.paymentTransactions.set(id, newTransaction);
    return newTransaction;
  }

  async updatePaymentTransaction(id: number, data: Partial<PaymentTransaction>): Promise<PaymentTransaction | undefined> {
    const transaction = this.paymentTransactions.get(id);
    if (!transaction) return undefined;
    
    const updated = { ...transaction, ...data };
    this.paymentTransactions.set(id, updated);
    return updated;
  }

  // SMS methods
  async getSMSMessages(userId: number, processed?: boolean): Promise<SmsMessage[]> {
    return Array.from(this.smsMessages.values()).filter(msg => 
      msg.userId === userId.toString() && (processed === undefined || msg.isProcessed === processed)
    );
  }

  async createSMSMessage(message: InsertSmsMessage): Promise<SmsMessage> {
    const id = Date.now();
    const newMessage: SmsMessage = {
      id,
      ...message,
      userId: message.userId || null,
      deviceId: message.deviceId || null,
      category: message.category || null,
      processedAt: message.processedAt || null,
      isRead: message.isRead || null,
      isProcessed: message.isProcessed || null,
      createdAt: new Date()
    };
    this.smsMessages.set(id.toString(), newMessage);
    return newMessage;
  }

  async updateSMSMessage(id: string, data: Partial<InsertSmsMessage>): Promise<SmsMessage | undefined> {
    const message = this.smsMessages.get(id);
    if (!message) return undefined;
    
    const updated = { ...message, ...data };
    this.smsMessages.set(id, updated);
    return updated;
  }

  // Financial transaction methods
  async getFinancialTransactions(userId: number): Promise<FinancialTransaction[]> {
    return Array.from(this.financialTransactions.values()).filter(t => 
      t.userId === userId.toString()
    );
  }

  async getFinancialTransaction(id: string): Promise<FinancialTransaction | undefined> {
    return this.financialTransactions.get(id);
  }

  async createFinancialTransaction(transaction: InsertFinancialTransaction): Promise<FinancialTransaction> {
    const id = Date.now();
    const newTransaction: FinancialTransaction = {
      id,
      ...transaction,
      description: transaction.description || null,
      userId: transaction.userId || null,
      merchantName: transaction.merchantName || null,
      accountType: transaction.accountType || null,
      accountIdentifier: transaction.accountIdentifier || null,
      source: transaction.source || null,
      sourceReference: transaction.sourceReference || null,
      tags: transaction.tags || null,
      metadata: transaction.metadata || null,
      updatedAt: null,
      createdAt: new Date()
    };
    this.financialTransactions.set(id.toString(), newTransaction);
    return newTransaction;
  }

  // User device methods
  async getUserDevices(userId: number): Promise<UserDevice[]> {
    return Array.from(this.userDevices.values()).filter(d => d.userId === userId.toString());
  }

  async getUserDevice(id: string): Promise<UserDevice | undefined> {
    return this.userDevices.get(id);
  }

  async getUserDeviceByDeviceId(userId: number, deviceId: string): Promise<UserDevice | undefined> {
    for (const device of this.userDevices.values()) {
      if (device.userId === userId.toString() && device.deviceId === deviceId) {
        return device;
      }
    }
    return undefined;
  }

  async createUserDevice(device: InsertUserDevice): Promise<UserDevice> {
    const id = Date.now();
    const newDevice: UserDevice = {
      id,
      ...device,
      userId: device.userId || null,
      name: device.name || null,
      platform: device.platform || null,
      verified: device.verified || null,
      verificationCode: device.verificationCode || null,
      lastActive: device.lastActive || null,
      createdAt: new Date()
    };
    this.userDevices.set(id.toString(), newDevice);
    return newDevice;
  }

  async updateUserDevice(id: string, data: Partial<InsertUserDevice>): Promise<UserDevice | undefined> {
    const device = this.userDevices.get(id);
    if (!device) return undefined;
    
    const updated = { ...device, ...data };
    this.userDevices.set(id, updated);
    return updated;
  }

  async deleteUserDevice(id: string): Promise<boolean> {
    return this.userDevices.delete(id);
  }

  // Checkpoint methods (simplified for open access)
  async getCheckpoints(category?: string, level?: number, isFree?: boolean): Promise<Checkpoint[]> {
    return Array.from(this.checkpoints.values()).filter(c => 
      c.isActive && 
      (!category || c.category === category) &&
      (level === undefined || c.level === level) &&
      (isFree === undefined || c.isFree === isFree)
    );
  }

  async getCheckpoint(id: number): Promise<Checkpoint | undefined> {
    return this.checkpoints.get(id);
  }

  async createCheckpoint(checkpoint: InsertCheckpoint): Promise<Checkpoint> {
    const id = Date.now();
    const newCheckpoint: Checkpoint = {
      id,
      ...checkpoint,
      description: checkpoint.description || null,
      points: checkpoint.points || 0,
      isFree: checkpoint.isFree || null,
      requirements: checkpoint.requirements || null,
      actionItems: checkpoint.actionItems || null,
      rewards: checkpoint.rewards || null,
      estimatedTimeMinutes: checkpoint.estimatedTimeMinutes || null,
      isActive: checkpoint.isActive || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.checkpoints.set(id, newCheckpoint);
    return newCheckpoint;
  }

  async updateCheckpoint(id: number, data: Partial<Checkpoint>): Promise<Checkpoint | undefined> {
    const checkpoint = this.checkpoints.get(id);
    if (!checkpoint) return undefined;
    
    const updated = { ...checkpoint, ...data };
    this.checkpoints.set(id, updated);
    return updated;
  }

  // User checkpoint progress methods
  async getUserCheckpointProgress(userId: string, checkpointId?: number): Promise<UserCheckpointProgress[]> {
    return Array.from(this.userCheckpointProgress.values()).filter(p => 
      p.userId === userId && (checkpointId === undefined || p.checkpointId === checkpointId)
    );
  }

  async getUserCheckpointProgressById(id: number): Promise<UserCheckpointProgress | undefined> {
    return this.userCheckpointProgress.get(id);
  }

  async createUserCheckpointProgress(progress: InsertUserCheckpointProgress): Promise<UserCheckpointProgress> {
    const id = Date.now();
    const newProgress: UserCheckpointProgress = {
      id,
      ...progress,
      status: progress.status || 'not_started',
      progress: progress.progress || null,
      completedActions: progress.completedActions || null,
      startedAt: progress.startedAt || null,
      completedAt: progress.completedAt || null,
      pointsEarned: progress.pointsEarned || null,
      notes: progress.notes || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.userCheckpointProgress.set(id, newProgress);
    return newProgress;
  }

  async updateUserCheckpointProgress(id: number, data: Partial<UserCheckpointProgress>): Promise<UserCheckpointProgress | undefined> {
    const progress = this.userCheckpointProgress.get(id);
    if (!progress) return undefined;
    
    const updated = { ...progress, ...data };
    this.userCheckpointProgress.set(id, updated);
    return updated;
  }

  // User achievement methods
  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    return Array.from(this.userAchievements.values()).filter(a => a.userId === userId);
  }

  async createUserAchievement(achievement: InsertUserAchievement): Promise<UserAchievement> {
    const id = Date.now();
    const newAchievement: UserAchievement = {
      id,
      ...achievement,
      description: achievement.description || null,
      pointsAwarded: achievement.pointsAwarded || null,
      badgeIcon: achievement.badgeIcon || null,
      badgeColor: achievement.badgeColor || null,
      metadata: achievement.metadata || null,
      unlockedAt: achievement.unlockedAt || null,
      isVisible: achievement.isVisible || null
    };
    this.userAchievements.set(id, newAchievement);
    return newAchievement;
  }

  // User learning profile methods
  async getUserLearningProfile(userId: string): Promise<UserLearningProfile | undefined> {
    return this.userLearningProfiles.get(userId);
  }

  async createUserLearningProfile(profile: InsertUserLearningProfile): Promise<UserLearningProfile> {
    const id = Date.now();
    const newProfile: UserLearningProfile = {
      id,
      ...profile,
      totalPoints: profile.totalPoints || null,
      currentLevel: profile.currentLevel || null,
      completedCheckpoints: profile.completedCheckpoints || null,
      currentStreak: profile.currentStreak || null,
      longestStreak: profile.longestStreak || null,
      lastActivityDate: profile.lastActivityDate || null,
      preferredCategories: profile.preferredCategories || null,
      learningGoals: profile.learningGoals || null,
      skillLevels: profile.skillLevels || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.userLearningProfiles.set(profile.userId, newProfile);
    return newProfile;
  }

  async updateUserLearningProfile(userId: string, data: Partial<UserLearningProfile>): Promise<UserLearningProfile | undefined> {
    const profile = this.userLearningProfiles.get(userId);
    if (!profile) return undefined;
    
    const updated = { ...profile, ...data, updatedAt: new Date() };
    this.userLearningProfiles.set(userId, updated);
    return updated;
  }

  // Stub methods for interface compliance
  async updateUserDeviceByDeviceId(userId: number, deviceId: string, data: Partial<InsertUserDevice>): Promise<UserDevice | undefined> {
    return undefined;
  }
  
  async getInvestments(userId: number): Promise<any[]> { return []; }
  async getInvestment(id: number): Promise<any | undefined> { return undefined; }
  async createInvestment(investment: any): Promise<any> { return {}; }
  async updateInvestment(id: number, data: any): Promise<any | undefined> { return undefined; }
  
  async getTransactionsByUserId(userId: number, limit?: number): Promise<FinancialTransaction[]> { return []; }
  async getTransactionById(id: string): Promise<FinancialTransaction | undefined> { return undefined; }
  async createTransaction(transaction: InsertFinancialTransaction): Promise<FinancialTransaction> { 
    return this.createFinancialTransaction(transaction);
  }
  async updateTransactionCategory(id: string, category: string): Promise<FinancialTransaction | undefined> { return undefined; }
  async deleteTransaction(id: string): Promise<boolean> { return true; }
  
  async getActiveSIPs(userId: number): Promise<any[]> { return []; }
  async createSIP(sip: any): Promise<any> { return {}; }
  async updateSIP(id: number, data: any): Promise<any | undefined> { return undefined; }
  
  async getMarketIndices(): Promise<any[]> { return []; }
  async updateMarketIndex(id: number, data: any): Promise<any | undefined> { return undefined; }
  async createMarketIndex(marketIndex: any): Promise<any> { return {}; }
  
  async getTopPerformers(): Promise<any[]> { return []; }
  async createTopPerformer(performer: any): Promise<any> { return {}; }
  
  async getMarketNews(): Promise<any[]> { return []; }
  async createMarketNews(news: any): Promise<any> { return {}; }
  
  async getPortfolioSummary(userId: number): Promise<any | undefined> { return undefined; }
  async createPortfolioSummary(summary: any): Promise<any> { return {}; }
  async updatePortfolioSummary(userId: number, data: any): Promise<any | undefined> { return undefined; }
  
  async getAssetAllocations(userId: number): Promise<any[]> { return []; }
  async createAssetAllocation(allocation: any): Promise<any> { return {}; }
  async updateAssetAllocation(id: number, data: any): Promise<any | undefined> { return undefined; }
  
  async getHomeLoanCalculations(userId?: number): Promise<any[]> { return []; }
  async getHomeLoanCalculation(id: number): Promise<any | undefined> { return undefined; }
  async getHomeLoanCalculationById(id: number): Promise<any | undefined> { return undefined; }
  async createHomeLoanCalculation(calculation: any): Promise<any> { return {}; }
  async deleteHomeLoanCalculation(id: number): Promise<boolean> { return true; }
}