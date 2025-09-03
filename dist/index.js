var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  checkpoints: () => checkpoints,
  financialTransactions: () => financialTransactions,
  insertCheckpointSchema: () => insertCheckpointSchema,
  insertFinancialTransactionSchema: () => insertFinancialTransactionSchema,
  insertPaymentTransactionSchema: () => insertPaymentTransactionSchema,
  insertSmsMessageSchema: () => insertSmsMessageSchema,
  insertSubscriptionPlanSchema: () => insertSubscriptionPlanSchema,
  insertUserAchievementSchema: () => insertUserAchievementSchema,
  insertUserCheckpointProgressSchema: () => insertUserCheckpointProgressSchema,
  insertUserDeviceSchema: () => insertUserDeviceSchema,
  insertUserLearningProfileSchema: () => insertUserLearningProfileSchema,
  paymentTransactions: () => paymentTransactions,
  sessions: () => sessions,
  smsMessages: () => smsMessages,
  subscriptionPlans: () => subscriptionPlans,
  userAchievements: () => userAchievements,
  userCheckpointProgress: () => userCheckpointProgress,
  userDevices: () => userDevices,
  userLearningProfiles: () => userLearningProfiles,
  users: () => users
});
import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  boolean,
  integer,
  json,
  decimal
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  subscriptionStatus: text("subscription_status").default("free"),
  // free, active, cancelled, expired
  subscriptionPlan: text("subscription_plan"),
  // basic, premium, pro
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionStartDate: timestamp("subscription_start_date"),
  subscriptionEndDate: timestamp("subscription_end_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var subscriptionPlans = pgTable("subscription_plans", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("INR"),
  interval: text("interval").notNull(),
  // month, year
  features: json("features"),
  stripePriceId: text("stripe_price_id"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans);
var paymentTransactions = pgTable("payment_transactions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("INR"),
  status: text("status").notNull(),
  // pending, succeeded, failed, refunded
  planId: varchar("plan_id"),
  metadata: json("metadata"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertPaymentTransactionSchema = createInsertSchema(paymentTransactions).omit({ id: true });
var userDevices = pgTable("user_devices", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id"),
  deviceId: text("device_id").notNull(),
  name: text("name"),
  platform: text("platform"),
  verified: boolean("verified").default(false),
  verificationCode: text("verification_code"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastActive: timestamp("last_active")
});
var insertUserDeviceSchema = createInsertSchema(userDevices).omit({ id: true });
var smsMessages = pgTable("sms_messages", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id"),
  deviceId: text("device_id"),
  sender: text("sender").notNull(),
  body: text("body").notNull(),
  receivedAt: timestamp("received_at").notNull(),
  processedAt: timestamp("processed_at"),
  category: text("category"),
  isRead: boolean("is_read").default(false),
  isProcessed: boolean("is_processed").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertSmsMessageSchema = createInsertSchema(smsMessages).omit({ id: true });
var financialTransactions = pgTable("financial_transactions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id"),
  amount: integer("amount").notNull(),
  // Amount in smallest currency unit (paise)
  description: text("description"),
  category: text("category").notNull(),
  transactionDate: timestamp("transaction_date").notNull(),
  merchantName: text("merchant_name"),
  accountType: text("account_type"),
  // bank, credit_card, cash, etc.
  accountIdentifier: text("account_identifier"),
  // Last 4 digits of card, bank account, etc.
  transactionType: text("transaction_type").notNull(),
  // debit, credit
  source: text("source"),
  // sms, manual, import, etc.
  sourceReference: text("source_reference"),
  // Reference to original source (SMS ID, etc.)
  tags: text("tags").array(),
  metadata: json("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
});
var insertFinancialTransactionSchema = createInsertSchema(financialTransactions).omit({ id: true });
var checkpoints = pgTable("checkpoints", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  // 'budgeting', 'investing', 'taxation', 'insurance', 'debt_management'
  level: integer("level").notNull(),
  // 1 = Beginner, 2 = Intermediate, 3 = Advanced
  points: integer("points").notNull().default(0),
  isFree: boolean("is_free").default(true),
  // Free checkpoints for all users
  requirements: json("requirements"),
  // JSON array of prerequisite checkpoint IDs
  actionItems: json("action_items"),
  // JSON array of tasks to complete
  rewards: json("rewards"),
  // JSON object for completion rewards
  estimatedTimeMinutes: integer("estimated_time_minutes"),
  order: integer("order").notNull(),
  // Display order within category
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertCheckpointSchema = createInsertSchema(checkpoints).omit({ id: true });
var userCheckpointProgress = pgTable("user_checkpoint_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  checkpointId: integer("checkpoint_id").notNull(),
  status: text("status").notNull().default("not_started"),
  // 'not_started', 'in_progress', 'completed', 'skipped'
  progress: integer("progress").default(0),
  // Percentage 0-100
  completedActions: json("completed_actions"),
  // Array of completed action item IDs
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  pointsEarned: integer("points_earned").default(0),
  notes: text("notes"),
  // User's personal notes
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertUserCheckpointProgressSchema = createInsertSchema(userCheckpointProgress).omit({ id: true });
var userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  achievementType: text("achievement_type").notNull(),
  // 'checkpoint_completed', 'level_completed', 'streak', 'perfect_week'
  title: text("title").notNull(),
  description: text("description"),
  pointsAwarded: integer("points_awarded").default(0),
  badgeIcon: text("badge_icon"),
  // Icon name or emoji
  badgeColor: text("badge_color"),
  // Color hex code
  metadata: json("metadata"),
  // Additional achievement data
  unlockedAt: timestamp("unlocked_at").defaultNow(),
  isVisible: boolean("is_visible").default(true)
});
var insertUserAchievementSchema = createInsertSchema(userAchievements).omit({ id: true });
var userLearningProfiles = pgTable("user_learning_profiles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().unique(),
  totalPoints: integer("total_points").default(0),
  currentLevel: integer("current_level").default(1),
  completedCheckpoints: integer("completed_checkpoints").default(0),
  currentStreak: integer("current_streak").default(0),
  // Days of consistent activity
  longestStreak: integer("longest_streak").default(0),
  lastActivityDate: timestamp("last_activity_date"),
  preferredCategories: text("preferred_categories").array(),
  // User's interest areas
  learningGoals: json("learning_goals"),
  // User's stated learning objectives
  skillLevels: json("skill_levels"),
  // Current skill assessment per category
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertUserLearningProfileSchema = createInsertSchema(userLearningProfiles).omit({ id: true });

// server/DatabaseStorage.ts
import { eq, and, desc } from "drizzle-orm";

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/DatabaseStorage.ts
import session from "express-session";
import memorystore from "memorystore";
import bcrypt from "bcryptjs";
var MemoryStore = memorystore(session);
var DatabaseStorage = class {
  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 864e5
      // prune expired entries every 24h
    });
  }
  // User methods
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || void 0;
  }
  async upsertUser(userData) {
    const [user] = await db.insert(users).values({
      ...userData,
      updatedAt: /* @__PURE__ */ new Date()
    }).onConflictDoUpdate({
      target: users.id,
      set: {
        ...userData,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  async updateUserSubscription(userId, subscriptionData) {
    const [user] = await db.update(users).set({
      ...subscriptionData,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(users.id, userId)).returning();
    return user || void 0;
  }
  async comparePasswords(supplied, stored) {
    return bcrypt.compare(supplied, stored);
  }
  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
  // SMS-related methods
  async getSMSMessages(userId, processed) {
    let baseQuery = db.select().from(smsMessages).where(eq(smsMessages.userId, userId));
    if (processed !== void 0) {
      return db.select().from(smsMessages).where(and(
        eq(smsMessages.userId, userId),
        eq(smsMessages.processed, processed)
      )).orderBy(desc(smsMessages.receivedAt));
    }
    return baseQuery.orderBy(desc(smsMessages.receivedAt));
  }
  async createSMSMessage(insertMessage) {
    const messageWithId = {
      ...insertMessage,
      id: insertMessage.id || `msg_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`
    };
    const [message] = await db.insert(smsMessages).values(messageWithId).returning();
    return message;
  }
  async updateSMSMessage(id, data) {
    const [message] = await db.update(smsMessages).set(data).where(eq(smsMessages.id, id)).returning();
    return message || void 0;
  }
  // Financial transactions from SMS
  async getFinancialTransactions(userId) {
    return db.select().from(financialTransactions).where(eq(financialTransactions.userId, userId)).orderBy(desc(financialTransactions.date));
  }
  async getFinancialTransaction(id) {
    const [transaction] = await db.select().from(financialTransactions).where(eq(financialTransactions.id, id));
    return transaction || void 0;
  }
  async createFinancialTransaction(insertTransaction) {
    const transactionWithId = {
      ...insertTransaction,
      id: insertTransaction.id || `trx_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`
    };
    const [transaction] = await db.insert(financialTransactions).values(transactionWithId).returning();
    return transaction;
  }
  // User devices for SMS sync
  async getUserDevices(userId) {
    return db.select().from(userDevices).where(eq(userDevices.userId, userId)).orderBy(desc(userDevices.createdAt));
  }
  async getUserDevice(id) {
    const [device] = await db.select().from(userDevices).where(eq(userDevices.id, id));
    return device || void 0;
  }
  async getUserDeviceByDeviceId(userId, deviceId) {
    const [device] = await db.select().from(userDevices).where(
      and(
        eq(userDevices.userId, userId),
        eq(userDevices.deviceId, deviceId)
      )
    );
    return device || void 0;
  }
  async createUserDevice(insertDevice) {
    const deviceWithId = {
      ...insertDevice,
      id: insertDevice.id || `dev_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`
    };
    const [device] = await db.insert(userDevices).values(deviceWithId).returning();
    return device;
  }
  async updateUserDevice(id, data) {
    const [device] = await db.update(userDevices).set(data).where(eq(userDevices.id, id)).returning();
    return device || void 0;
  }
  async updateUserDeviceByDeviceId(userId, deviceId, data) {
    const [device] = await db.update(userDevices).set(data).where(
      and(
        eq(userDevices.userId, userId),
        eq(userDevices.deviceId, deviceId)
      )
    ).returning();
    return device || void 0;
  }
  async deleteUserDevice(id) {
    try {
      await db.delete(userDevices).where(eq(userDevices.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting user device:", error);
      return false;
    }
  }
  // Investment methods
  async getInvestments(userId) {
    return [];
  }
  async getInvestment(id) {
    return void 0;
  }
  async createInvestment(investment) {
    return {};
  }
  async updateInvestment(id, data) {
    return void 0;
  }
  // Transaction methods
  async getTransactionsByUserId(userId, limit) {
    const baseQuery = db.select().from(financialTransactions).where(eq(financialTransactions.userId, userId)).orderBy(desc(financialTransactions.date));
    if (limit) {
      return baseQuery.limit(limit);
    }
    return baseQuery;
  }
  async getTransactionById(id) {
    const [transaction] = await db.select().from(financialTransactions).where(eq(financialTransactions.id, id));
    return transaction || void 0;
  }
  async createTransaction(transaction) {
    const transactionWithId = {
      ...transaction,
      id: transaction.id || `trx_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`
    };
    const [newTransaction] = await db.insert(financialTransactions).values(transactionWithId).returning();
    return newTransaction;
  }
  async updateTransactionCategory(id, category) {
    const [transaction] = await db.update(financialTransactions).set({ category }).where(eq(financialTransactions.id, id)).returning();
    return transaction || void 0;
  }
  async deleteTransaction(id) {
    try {
      await db.delete(financialTransactions).where(eq(financialTransactions.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting transaction:", error);
      return false;
    }
  }
  // SIP methods
  async getActiveSIPs(userId) {
    return [];
  }
  async createSIP(sip) {
    return {};
  }
  async updateSIP(id, data) {
    return void 0;
  }
  // Market data methods
  async getMarketIndices() {
    return [];
  }
  async updateMarketIndex(id, data) {
    return void 0;
  }
  async createMarketIndex(marketIndex) {
    return {};
  }
  // Top performers methods
  async getTopPerformers() {
    return [];
  }
  async createTopPerformer(performer) {
    return {};
  }
  // Market news methods
  async getMarketNews() {
    return [];
  }
  async createMarketNews(news) {
    return {};
  }
  // Portfolio summary methods
  async getPortfolioSummary(userId) {
    return void 0;
  }
  async createPortfolioSummary(summary) {
    return {};
  }
  async updatePortfolioSummary(userId, data) {
    return void 0;
  }
  // Asset allocation methods
  async getAssetAllocations(userId) {
    return [];
  }
  async createAssetAllocation(allocation) {
    return {};
  }
  async updateAssetAllocation(id, data) {
    return void 0;
  }
  // Home Loan Calculation methods
  async getHomeLoanCalculations(userId) {
    return [];
  }
  async getHomeLoanCalculation(id) {
    return void 0;
  }
  async getHomeLoanCalculationById(id) {
    return void 0;
  }
  async createHomeLoanCalculation(calculation) {
    return {};
  }
  async deleteHomeLoanCalculation(id) {
    return true;
  }
  // Checkpoint methods
  async getCheckpoints(category, level, isFree) {
    let query = db.select().from(checkpoints).where(eq(checkpoints.isActive, true));
    if (category) {
      query = query.where(eq(checkpoints.category, category));
    }
    if (level !== void 0) {
      query = query.where(eq(checkpoints.level, level));
    }
    if (isFree !== void 0) {
      query = query.where(eq(checkpoints.isFree, isFree));
    }
    return query.orderBy(checkpoints.category, checkpoints.order);
  }
  async getCheckpoint(id) {
    const [checkpoint] = await db.select().from(checkpoints).where(eq(checkpoints.id, id));
    return checkpoint || void 0;
  }
  async createCheckpoint(insertCheckpoint) {
    const [checkpoint] = await db.insert(checkpoints).values({
      ...insertCheckpoint,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).returning();
    return checkpoint;
  }
  async updateCheckpoint(id, data) {
    const [checkpoint] = await db.update(checkpoints).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(checkpoints.id, id)).returning();
    return checkpoint || void 0;
  }
  // User checkpoint progress methods
  async getUserCheckpointProgress(userId, checkpointId) {
    let query = db.select().from(userCheckpointProgress).where(eq(userCheckpointProgress.userId, userId));
    if (checkpointId !== void 0) {
      query = query.where(eq(userCheckpointProgress.checkpointId, checkpointId));
    }
    return query.orderBy(desc(userCheckpointProgress.updatedAt));
  }
  async getUserCheckpointProgressById(id) {
    const [progress] = await db.select().from(userCheckpointProgress).where(eq(userCheckpointProgress.id, id));
    return progress || void 0;
  }
  async createUserCheckpointProgress(insertProgress) {
    const [progress] = await db.insert(userCheckpointProgress).values({
      ...insertProgress,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).returning();
    return progress;
  }
  async updateUserCheckpointProgress(id, data) {
    const [progress] = await db.update(userCheckpointProgress).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(userCheckpointProgress.id, id)).returning();
    return progress || void 0;
  }
  // User achievement methods
  async getUserAchievements(userId) {
    return db.select().from(userAchievements).where(and(eq(userAchievements.userId, userId), eq(userAchievements.isVisible, true))).orderBy(desc(userAchievements.unlockedAt));
  }
  async createUserAchievement(insertAchievement) {
    const [achievement] = await db.insert(userAchievements).values({
      ...insertAchievement,
      unlockedAt: /* @__PURE__ */ new Date()
    }).returning();
    return achievement;
  }
  // User learning profile methods
  async getUserLearningProfile(userId) {
    const [profile] = await db.select().from(userLearningProfiles).where(eq(userLearningProfiles.userId, userId));
    return profile || void 0;
  }
  async createUserLearningProfile(insertProfile) {
    const [profile] = await db.insert(userLearningProfiles).values({
      ...insertProfile,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).returning();
    return profile;
  }
  async updateUserLearningProfile(userId, data) {
    const [profile] = await db.update(userLearningProfiles).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(userLearningProfiles.userId, userId)).returning();
    return profile || void 0;
  }
};

// server/storage.ts
var storage = new DatabaseStorage();

// server/services/marketDataService.ts
import { spawn } from "child_process";
import path from "path";
var MarketDataService = class {
  executeStockService(command, args = []) {
    return new Promise((resolve, reject) => {
      const pythonPath = "python3";
      const scriptPath = path.join(process.cwd(), "server", "stockPriceService.py");
      const fullArgs = [scriptPath, command, ...args];
      console.log(`Executing: ${pythonPath} ${fullArgs.join(" ")}`);
      const pythonProcess = spawn(pythonPath, fullArgs, {
        stdio: ["pipe", "pipe", "pipe"],
        cwd: process.cwd()
      });
      let stdout = "";
      let stderr = "";
      pythonProcess.stdout.on("data", (data) => {
        stdout += data.toString();
      });
      pythonProcess.stderr.on("data", (data) => {
        stderr += data.toString();
      });
      pythonProcess.on("close", (code) => {
        console.log(`Python process exited with code ${code}`);
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (code === 0) {
          try {
            const result = JSON.parse(stdout);
            resolve(result);
          } catch (parseError) {
            console.error("JSON Parse error:", parseError);
            reject(new Error(`Failed to parse JSON: ${parseError.message}`));
          }
        } else {
          reject(new Error(`Python script failed with code ${code}: ${stderr}`));
        }
      });
      pythonProcess.on("error", (error) => {
        console.error("Python process error:", error);
        reject(new Error(`Failed to start Python process: ${error.message}`));
      });
    });
  }
  async getStockPrice(symbol, exchange = "US") {
    try {
      const result = await this.executeStockService("single", [symbol, exchange]);
      if (result && !result.error) {
        return {
          success: true,
          data: result,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        };
      } else {
        return {
          success: false,
          error: result?.error || "Stock data not found",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        };
      }
    } catch (error) {
      console.error("Error fetching stock price:", error);
      return {
        success: false,
        error: error.message,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  }
  async getMultipleStocks(symbols, exchange = "US") {
    try {
      const result = await this.executeStockService("multiple", [symbols.join(","), exchange]);
      return {
        success: true,
        data: result,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
      console.error("Error fetching multiple stocks:", error);
      return {
        success: false,
        error: error.message,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  }
  async getPortfolioPrices(symbols) {
    try {
      const result = await this.executeStockService("portfolio", [symbols.join(",")]);
      return {
        success: true,
        data: result,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
      console.error("Error fetching portfolio prices:", error);
      return {
        success: false,
        error: error.message,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  }
  async getMarketIndices(market = "INDIA") {
    try {
      const result = await this.executeStockService("indices", [market]);
      return {
        success: true,
        data: result,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
      console.error("Error fetching market indices:", error);
      return {
        success: false,
        error: error.message,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  }
  async getMarketMovers(market = "INDIA", type = "gainers") {
    try {
      const result = await this.executeStockService("movers", [market, type]);
      return {
        success: true,
        data: result,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
      console.error("Error fetching market movers:", error);
      return {
        success: false,
        error: error.message,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  }
  async getSectorPerformance(market = "INDIA") {
    try {
      const result = await this.executeStockService("sectors", [market]);
      return {
        success: true,
        data: result,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
      console.error("Error fetching sector performance:", error);
      return {
        success: false,
        error: error.message,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  }
  async getMarketOverview(market = "USA") {
    try {
      const result = await this.executeStockService("overview", [market]);
      return {
        success: true,
        data: result,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
      console.error("Error fetching market overview:", error);
      return {
        success: false,
        error: error.message,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  }
  // Mock implementation removed - USA focus only
  getMockData(type, market = "USA") {
    return null;
  }
};
var marketDataService = new MarketDataService();

// server/services/marketSentimentService.ts
import { spawn as spawn2 } from "child_process";
import path2 from "path";
var MarketSentimentService = class {
  // Helper function to execute Python stock service
  executeStockService(command, args = []) {
    return new Promise((resolve, reject) => {
      const pythonPath = "python3";
      const scriptPath = path2.join(process.cwd(), "server", "stockPriceService.py");
      const fullArgs = [scriptPath, command, ...args];
      const pythonProcess = spawn2(pythonPath, fullArgs);
      let stdout = "";
      let stderr = "";
      pythonProcess.stdout.on("data", (data) => {
        stdout += data.toString();
      });
      pythonProcess.stderr.on("data", (data) => {
        stderr += data.toString();
      });
      pythonProcess.on("close", (code) => {
        if (code === 0) {
          try {
            const result = JSON.parse(stdout);
            resolve(result);
          } catch (parseError) {
            reject(new Error(`Failed to parse JSON: ${parseError}`));
          }
        } else {
          reject(new Error(`Python script failed with code ${code}: ${stderr}`));
        }
      });
      pythonProcess.on("error", (error) => {
        reject(new Error(`Failed to start Python process: ${error.message}`));
      });
    });
  }
  async getCurrentMarketSentiment() {
    try {
      console.log("Fetching real-time market data for sentiment analysis...");
      const indicesData = await this.executeStockService("indices", ["USA"]);
      console.log("Market data received:", { indicesData: !!indicesData });
      let spyReturn = 0;
      let vixValue = 18.5;
      if (indicesData && indicesData.indices) {
        const sp500 = indicesData.indices.SP500;
        if (sp500) {
          spyReturn = parseFloat(sp500.changePercent) || 0;
        }
        const vix = indicesData.indices.VIX;
        if (vix) {
          vixValue = parseFloat(vix.lastPrice) || 18.5;
        }
      }
      console.log("Processed data:", { spyReturn, vixValue });
      const fearGreedIndex = this.calculateFearGreedIndex(spyReturn, vixValue, indicesData || []);
      const marketSentiment = {
        fearGreedIndex,
        fearGreedLabel: this.getFearGreedLabel(fearGreedIndex),
        vixIndex: vixValue,
        vixLabel: this.getVixLabel(vixValue),
        currentSentiment: fearGreedIndex > 55 ? "GREED" : fearGreedIndex < 45 ? "FEAR" : "NEUTRAL",
        spyReturn: `${spyReturn > 0 ? "+" : ""}${spyReturn.toFixed(1)}%`,
        interpretation: this.getSentimentInterpretation(fearGreedIndex, vixValue),
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      console.log("Final sentiment data:", marketSentiment);
      return {
        success: true,
        data: marketSentiment,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
      console.error("Error fetching real-time market data:", error);
      const currentHour = (/* @__PURE__ */ new Date()).getHours();
      const fearGreedIndex = 45 + currentHour % 30;
      const vixValue = 15 + currentHour % 15;
      const fallbackData = {
        fearGreedIndex,
        fearGreedLabel: this.getFearGreedLabel(fearGreedIndex),
        vixIndex: vixValue,
        vixLabel: this.getVixLabel(vixValue),
        currentSentiment: fearGreedIndex > 55 ? "GREED" : fearGreedIndex < 45 ? "FEAR" : "NEUTRAL",
        spyReturn: "+1.2%",
        interpretation: this.getSentimentInterpretation(fearGreedIndex, vixValue),
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      return {
        success: false,
        data: fallbackData,
        error: error instanceof Error ? error.message : "Unable to fetch real-time data",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  }
  calculateFearGreedIndex(spyReturn, vixValue, indicesData) {
    let fearGreedScore = 50;
    if (vixValue < 15) fearGreedScore += 25;
    else if (vixValue < 20) fearGreedScore += 15;
    else if (vixValue < 25) fearGreedScore += 5;
    else if (vixValue < 30) fearGreedScore -= 10;
    else fearGreedScore -= 25;
    if (spyReturn > 2) fearGreedScore += 15;
    else if (spyReturn > 1) fearGreedScore += 10;
    else if (spyReturn > 0) fearGreedScore += 5;
    else if (spyReturn > -1) fearGreedScore -= 5;
    else if (spyReturn > -2) fearGreedScore -= 10;
    else fearGreedScore -= 20;
    if (indicesData && indicesData.length > 0) {
      const positiveIndices = indicesData.filter((idx) => idx.change_percent > 0).length;
      const totalIndices = indicesData.length;
      const breadthRatio = positiveIndices / totalIndices;
      if (breadthRatio > 0.8) fearGreedScore += 10;
      else if (breadthRatio > 0.6) fearGreedScore += 5;
      else if (breadthRatio < 0.3) fearGreedScore -= 15;
      else if (breadthRatio < 0.4) fearGreedScore -= 10;
    }
    return Math.max(0, Math.min(100, Math.round(fearGreedScore)));
  }
  getFearGreedLabel(index2) {
    if (index2 <= 24) return "Extreme Fear";
    if (index2 <= 44) return "Fear";
    if (index2 <= 55) return "Neutral";
    if (index2 <= 75) return "Greed";
    return "Extreme Greed";
  }
  getVixLabel(vix) {
    if (vix < 12) return "Very Low Volatility";
    if (vix < 20) return "Low Volatility";
    if (vix < 30) return "Elevated Volatility";
    if (vix < 40) return "High Volatility";
    return "Extreme Volatility";
  }
  getSentimentInterpretation(fearGreed, vix) {
    let interpretation = "Real-time market analysis: ";
    if (fearGreed > 75) {
      interpretation += "Extreme greed detected - high risk of market correction. Consider taking profits.";
    } else if (fearGreed > 55) {
      interpretation += "Growing market optimism - watch for signs of overconfidence.";
    } else if (fearGreed < 25) {
      interpretation += "Extreme fear in markets - potential opportunity for contrarian investors.";
    } else if (fearGreed < 45) {
      interpretation += "Market uncertainty - wait for clearer signals before major positions.";
    } else {
      interpretation += "Balanced market sentiment - steady approach recommended.";
    }
    if (vix > 30) {
      interpretation += " High volatility suggests increased caution.";
    } else if (vix < 15) {
      interpretation += " Low volatility may indicate complacency.";
    }
    return interpretation;
  }
  async getDetailedMarketAnalysis() {
    try {
      const sentimentData = await this.getCurrentMarketSentiment();
      if (!sentimentData.success || !sentimentData.data) {
        throw new Error("Unable to fetch current market sentiment");
      }
      const { fearGreedIndex, vixIndex } = sentimentData.data;
      return {
        marketIndicators: {
          fearGreedIndex,
          vixIndex,
          marketTrend: fearGreedIndex > 55 ? "Bullish" : fearGreedIndex < 45 ? "Bearish" : "Neutral",
          volatilityEnvironment: vixIndex > 25 ? "High" : vixIndex < 15 ? "Low" : "Normal"
        },
        warningSignals: this.getWarningSignals(fearGreedIndex, vixIndex),
        recommendations: this.getRecommendations(fearGreedIndex, vixIndex),
        marketCycleContext: this.getMarketCycleContext(fearGreedIndex, vixIndex)
      };
    } catch (error) {
      console.error("Error in detailed market analysis:", error);
      throw error;
    }
  }
  getWarningSignals(fearGreed, vix) {
    const warnings = [];
    if (fearGreed > 70) warnings.push("Extreme optimism may signal market top");
    if (vix < 12) warnings.push("Very low volatility suggests complacency");
    if (fearGreed > 60 && vix < 15) warnings.push("Disconnect between sentiment and volatility");
    if (fearGreed < 30) warnings.push("Excessive pessimism may present opportunities");
    if (vix > 35) warnings.push("High volatility indicates market stress");
    return warnings;
  }
  getRecommendations(fearGreed, vix) {
    const recommendations = [];
    if (fearGreed > 65) {
      recommendations.push("Consider reducing position sizes");
      recommendations.push("Take profits on outperforming positions");
      recommendations.push("Increase cash allocation");
    } else if (fearGreed < 35) {
      recommendations.push("Look for quality opportunities at discounted prices");
      recommendations.push("Consider dollar-cost averaging into positions");
      recommendations.push("Review defensive positions");
    } else {
      recommendations.push("Maintain balanced portfolio allocation");
      recommendations.push("Focus on fundamental analysis");
      recommendations.push("Monitor key support and resistance levels");
    }
    if (vix > 25) {
      recommendations.push("Avoid leveraged positions");
      recommendations.push("Consider protective strategies");
    }
    return recommendations;
  }
  getMarketCycleContext(fearGreed, vix) {
    if (fearGreed > 70 && vix < 15) {
      return "Late-stage bull market - euphoria phase";
    } else if (fearGreed < 30 && vix > 30) {
      return "Bear market or major correction - capitulation phase";
    } else if (fearGreed > 50 && vix < 20) {
      return "Bull market - optimism phase";
    } else if (fearGreed < 50 && vix > 20) {
      return "Market uncertainty - correction or consolidation phase";
    } else {
      return "Transitional market phase - mixed signals";
    }
  }
};
var marketSentimentService = new MarketSentimentService();

// server/routes.ts
import { spawn as spawn3 } from "child_process";
import path3 from "path";
var noAuth = (req, res, next) => {
  req.user = {
    uid: "guest-user",
    email: "guest@rupeesmart.com",
    displayName: "Guest User"
  };
  next();
};
async function registerRoutes(app2) {
  app2.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  const executeStockService = (command, args = []) => {
    return new Promise((resolve, reject) => {
      const pythonPath = "python3";
      const scriptPath = path3.join(process.cwd(), "server", "stockPriceService.py");
      const fullArgs = [scriptPath, command, ...args];
      const pythonProcess = spawn3(pythonPath, fullArgs);
      let stdout = "";
      let stderr = "";
      pythonProcess.stdout.on("data", (data) => {
        stdout += data.toString();
      });
      pythonProcess.stderr.on("data", (data) => {
        stderr += data.toString();
      });
      pythonProcess.on("close", (code) => {
        console.log(`Python process exited with code ${code}`);
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (code === 0) {
          try {
            const result = JSON.parse(stdout);
            resolve(result);
          } catch (parseError) {
            console.error("JSON Parse error:", parseError);
            reject(new Error(`Failed to parse JSON: ${parseError.message}`));
          }
        } else {
          reject(new Error(`Python script failed with code ${code}: ${stderr}`));
        }
      });
      pythonProcess.on("error", (error) => {
        console.error("Python process error:", error);
        reject(new Error(`Failed to start Python process: ${error.message}`));
      });
    });
  };
  app2.get("/api/market-sentiment/current", async (req, res) => {
    try {
      const result = await marketSentimentService.getCurrentMarketSentiment();
      res.json(result);
    } catch (error) {
      console.error("Error fetching market sentiment:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch market sentiment",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.get("/api/market-sentiment/detailed", async (req, res) => {
    try {
      const result = await marketSentimentService.getDetailedMarketAnalysis();
      res.json({
        success: true,
        data: result,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error fetching detailed market analysis:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch detailed market analysis",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.get("/api/market/stock/:symbol", async (req, res) => {
    try {
      const { symbol } = req.params;
      const { exchange = "NSE" } = req.query;
      const result = await marketDataService.getStockPrice(symbol, exchange);
      if (result.success) {
        res.json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error fetching stock price:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.post("/api/market/stocks", async (req, res) => {
    try {
      const { symbols, exchange = "NSE" } = req.body;
      if (!symbols || !Array.isArray(symbols)) {
        return res.status(400).json({
          success: false,
          error: "Symbols array is required",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      const result = await marketDataService.getMultipleStocks(symbols, exchange);
      res.json(result);
    } catch (error) {
      console.error("Error fetching multiple stocks:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.post("/api/market/portfolio", async (req, res) => {
    try {
      const { symbols } = req.body;
      if (!symbols || !Array.isArray(symbols)) {
        return res.status(400).json({
          success: false,
          error: "Symbols array is required",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      const result = await marketDataService.getPortfolioPrices(symbols);
      res.json(result);
    } catch (error) {
      console.error("Error fetching portfolio prices:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.get("/api/market/indices/:market", async (req, res) => {
    try {
      const { market } = req.params;
      const validMarkets = ["INDIA", "USA"];
      if (!validMarkets.includes(market.toUpperCase())) {
        return res.status(400).json({
          success: false,
          error: "Invalid market. Use INDIA or USA",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      const result = await marketDataService.getMarketIndices(market.toUpperCase());
      res.json(result);
    } catch (error) {
      console.error("Error fetching market indices:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.get("/api/market/movers/:market/:type", async (req, res) => {
    try {
      const { market, type } = req.params;
      const validMarkets = ["INDIA", "USA"];
      const validTypes = ["gainers", "losers"];
      if (!validMarkets.includes(market.toUpperCase()) || !validTypes.includes(type.toLowerCase())) {
        return res.status(400).json({
          success: false,
          error: "Invalid market or type. Use INDIA/USA for market and gainers/losers for type",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      const result = await marketDataService.getMarketMovers(market.toUpperCase(), type.toLowerCase());
      res.json(result);
    } catch (error) {
      console.error("Error fetching market movers:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.get("/api/market/sectors/:market", async (req, res) => {
    try {
      const { market } = req.params;
      const validMarkets = ["INDIA", "USA"];
      if (!validMarkets.includes(market.toUpperCase())) {
        return res.status(400).json({
          success: false,
          error: "Invalid market. Use INDIA or USA",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      const result = await executeStockService("sectors", [market.toUpperCase()]);
      res.json({
        success: true,
        data: result,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error fetching sector performance:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.get("/api/market/etfs/:market", async (req, res) => {
    try {
      const { market } = req.params;
      const validMarkets = ["INDIA", "USA"];
      if (!validMarkets.includes(market.toUpperCase())) {
        return res.status(400).json({
          success: false,
          error: "Invalid market. Use INDIA or USA",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      const result = await executeStockService("etfs", [market.toUpperCase()]);
      res.json({
        success: true,
        data: result,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error fetching ETF data:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.get("/api/market/commodities", async (req, res) => {
    try {
      const result = await executeStockService("commodities");
      res.json({
        success: true,
        data: result,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error fetching commodity data:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.get("/api/market/crypto", async (req, res) => {
    try {
      const result = await executeStockService("crypto");
      res.json({
        success: true,
        data: result,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error fetching cryptocurrency data:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.get("/api/market/currencies", async (req, res) => {
    try {
      const result = await executeStockService("currencies");
      res.json({
        success: true,
        data: result,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error fetching currency data:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.get("/api/market/global-indices", async (req, res) => {
    try {
      const result = await executeStockService("global_indices");
      res.json({
        success: true,
        data: result,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error fetching global indices data:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.get("/api/market/historical/:symbol", async (req, res) => {
    try {
      const { symbol } = req.params;
      const { exchange = "NSE", period = "30y" } = req.query;
      const validExchanges = ["NSE", "BSE", "US"];
      const validPeriods = ["30y", "20y", "10y", "5y", "3y", "1y", "6mo", "3mo", "1mo"];
      if (!validExchanges.includes(exchange.toString().toUpperCase())) {
        return res.status(400).json({
          success: false,
          error: "Invalid exchange. Use NSE, BSE, or US",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      if (!validPeriods.includes(period.toString().toLowerCase())) {
        return res.status(400).json({
          success: false,
          error: "Invalid period. Use 30y, 20y, 10y, 5y, 3y, 1y, 6mo, 3mo, or 1mo",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      const result = await executeStockService("historical", [symbol, exchange.toString().toUpperCase(), period.toString().toLowerCase()]);
      res.json({
        success: true,
        data: result,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error fetching historical data:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.get("/api/market/overview/:market", async (req, res) => {
    try {
      const { market } = req.params;
      const validMarkets = ["INDIA", "USA"];
      if (!validMarkets.includes(market.toUpperCase())) {
        return res.status(400).json({
          success: false,
          error: "Invalid market. Use INDIA or USA",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      const marketUpper = market.toUpperCase();
      const [indices, gainers, losers, sectors] = await Promise.all([
        executeStockService("indices", [marketUpper]),
        executeStockService("movers", [marketUpper, "gainers"]),
        executeStockService("movers", [marketUpper, "losers"]),
        executeStockService("sectors", [marketUpper])
      ]);
      res.json({
        success: true,
        data: {
          market: marketUpper,
          indices,
          gainers,
          losers,
          sectors,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      });
    } catch (error) {
      console.error("Error fetching market overview:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.get("/api/market/ticker", async (req, res) => {
    try {
      const symbols = ["SPY", "DIA", "QQQ", "GLD"];
      const result = await executeStockService("multiple", [symbols.join(","), "US"]);
      const now = /* @__PURE__ */ new Date();
      const isMarketHours = () => {
        const easternTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
        const hours = easternTime.getHours();
        const minutes = easternTime.getMinutes();
        const day = easternTime.getDay();
        const isWeekday = day >= 1 && day <= 5;
        const afterOpen = hours > 9 || hours === 9 && minutes >= 30;
        const beforeClose = hours < 16;
        return isWeekday && afterOpen && beforeClose;
      };
      const hasRealtimeData = isMarketHours();
      const showTestData = true;
      console.log(`Market status check: isMarketHours=${hasRealtimeData}, DEMO MODE ENABLED, current ET time: ${(/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: "America/New_York" })}`);
      const spyRatio = 6238.01 / 621.72;
      const diaRatio = 43588.58 / 435.72;
      const qqqRatio = 20650.13 / 553.88;
      const goldRatio = 3346.87 / 309.11;
      const tickerData = [
        {
          name: "S&P 500",
          value: (hasRealtimeData || showTestData) && result.SPY?.lastPrice ? `${(result.SPY.lastPrice * spyRatio).toFixed(2)}` : "--",
          change: (hasRealtimeData || showTestData) && result.SPY?.change ? result.SPY.change > 0 ? `+${(result.SPY.change * spyRatio).toFixed(2)}` : `${(result.SPY.change * spyRatio).toFixed(2)}` : "--",
          percent: (hasRealtimeData || showTestData) && result.SPY?.changePercent ? result.SPY.changePercent > 0 ? `+${result.SPY.changePercent.toFixed(2)}%` : `${result.SPY.changePercent.toFixed(2)}%` : "--",
          positive: (hasRealtimeData || showTestData) && result.SPY?.change ? result.SPY.change >= 0 : null
        },
        {
          name: "DOW",
          value: (hasRealtimeData || showTestData) && result.DIA?.lastPrice ? `${(result.DIA.lastPrice * diaRatio).toFixed(2)}` : "--",
          change: (hasRealtimeData || showTestData) && result.DIA?.change ? result.DIA.change > 0 ? `+${(result.DIA.change * diaRatio).toFixed(2)}` : `${(result.DIA.change * diaRatio).toFixed(2)}` : "--",
          percent: (hasRealtimeData || showTestData) && result.DIA?.changePercent ? result.DIA.changePercent > 0 ? `+${result.DIA.changePercent.toFixed(2)}%` : `${result.DIA.changePercent.toFixed(2)}%` : "--",
          positive: (hasRealtimeData || showTestData) && result.DIA?.change ? result.DIA.change >= 0 : null
        },
        {
          name: "NASDAQ",
          value: (hasRealtimeData || showTestData) && result.QQQ?.lastPrice ? `${(result.QQQ.lastPrice * qqqRatio).toFixed(2)}` : "--",
          change: (hasRealtimeData || showTestData) && result.QQQ?.change ? result.QQQ.change > 0 ? `+${(result.QQQ.change * qqqRatio).toFixed(2)}` : `${(result.QQQ.change * qqqRatio).toFixed(2)}` : "--",
          percent: (hasRealtimeData || showTestData) && result.QQQ?.changePercent ? result.QQQ.changePercent > 0 ? `+${result.QQQ.changePercent.toFixed(2)}%` : `${result.QQQ.changePercent.toFixed(2)}%` : "--",
          positive: (hasRealtimeData || showTestData) && result.QQQ?.change ? result.QQQ.change >= 0 : null
        },
        {
          name: "Gold",
          // Gold trades 24/7, show actual spot price converted from GLD ETF
          value: result.GLD?.lastPrice ? `$${(result.GLD.lastPrice * goldRatio).toFixed(2)}` : "--",
          change: result.GLD?.change ? result.GLD.change > 0 ? `+${(result.GLD.change * goldRatio).toFixed(2)}` : `${(result.GLD.change * goldRatio).toFixed(2)}` : "--",
          percent: result.GLD?.changePercent ? result.GLD.changePercent > 0 ? `+${result.GLD.changePercent.toFixed(2)}%` : `${result.GLD.changePercent.toFixed(2)}%` : "--",
          positive: result.GLD?.change ? result.GLD.change >= 0 : null
        }
      ];
      res.json({
        success: true,
        data: tickerData,
        isRealtime: hasRealtimeData,
        marketStatus: hasRealtimeData ? "OPEN" : "CLOSED",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error fetching ticker data:", error);
      res.json({
        success: false,
        data: [
          { name: "S&P 500", value: "--", change: "--", percent: "--", positive: null },
          { name: "DOW", value: "--", change: "--", percent: "--", positive: null },
          { name: "NASDAQ", value: "--", change: "--", percent: "--", positive: null },
          { name: "Gold", value: "--", change: "--", percent: "--", positive: null }
        ],
        isRealtime: false,
        marketStatus: "ERROR",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.get("/api/user", noAuth, async (req, res) => {
    try {
      const userId = req.user.uid;
      try {
        let user = await storage.getUser(userId);
        if (!user) {
          const [firstName, lastName] = (req.user.displayName || "").split(" ");
          user = await storage.upsertUser({
            id: userId,
            email: req.user.email || null,
            firstName: firstName || null,
            lastName: lastName || null,
            profileImageUrl: req.user.photoURL || null
          });
        }
        res.json(user);
      } catch (dbError) {
        console.error("Database error in /api/user:", dbError);
        res.json({
          id: userId,
          email: req.user.email || "user@rupeesmart.com",
          firstName: req.user.displayName?.split(" ")[0] || "RupeeSmart",
          lastName: req.user.displayName?.split(" ")[1] || "User",
          profileImageUrl: req.user.photoURL || null,
          subscriptionStatus: "free",
          subscriptionPlan: null,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.get("/api/checkpoints", noAuth, async (req, res) => {
    try {
      const { category, level, isFree } = req.query;
      const checkpoints2 = await storage.getCheckpoints(
        category,
        level ? parseInt(level) : void 0,
        isFree !== void 0 ? isFree === "true" : void 0
      );
      res.json({ success: true, data: checkpoints2 });
    } catch (error) {
      console.error("Error fetching checkpoints:", error);
      res.status(500).json({ success: false, error: "Failed to fetch checkpoints" });
    }
  });
  app2.get("/api/checkpoints/:id", noAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const checkpoint = await storage.getCheckpoint(parseInt(id));
      if (!checkpoint) {
        return res.status(404).json({ success: false, error: "Checkpoint not found" });
      }
      res.json({ success: true, data: checkpoint });
    } catch (error) {
      console.error("Error fetching checkpoint:", error);
      res.status(500).json({ success: false, error: "Failed to fetch checkpoint" });
    }
  });
  app2.get("/api/user/checkpoints/progress", noAuth, async (req, res) => {
    try {
      const userId = req.user.uid;
      const { checkpointId } = req.query;
      const progress = await storage.getUserCheckpointProgress(
        userId,
        checkpointId ? parseInt(checkpointId) : void 0
      );
      res.json({ success: true, data: progress });
    } catch (error) {
      console.error("Error fetching user checkpoint progress:", error);
      res.status(500).json({ success: false, error: "Failed to fetch progress" });
    }
  });
  app2.post("/api/user/checkpoints/progress", noAuth, async (req, res) => {
    try {
      const userId = req.user.uid;
      const progressData = { ...req.body, userId };
      const progress = await storage.createUserCheckpointProgress(progressData);
      res.json({ success: true, data: progress });
    } catch (error) {
      console.error("Error creating checkpoint progress:", error);
      res.status(500).json({ success: false, error: "Failed to create progress" });
    }
  });
  app2.patch("/api/user/checkpoints/progress/:id", noAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const progress = await storage.updateUserCheckpointProgress(parseInt(id), req.body);
      if (!progress) {
        return res.status(404).json({ success: false, error: "Progress record not found" });
      }
      res.json({ success: true, data: progress });
    } catch (error) {
      console.error("Error updating checkpoint progress:", error);
      res.status(500).json({ success: false, error: "Failed to update progress" });
    }
  });
  app2.get("/api/user/learning-profile", noAuth, async (req, res) => {
    try {
      const userId = req.user.uid;
      let profile = await storage.getUserLearningProfile(userId);
      if (!profile) {
        profile = await storage.createUserLearningProfile({
          userId,
          totalPoints: 0,
          currentLevel: 1,
          completedCheckpoints: 0,
          currentStreak: 0,
          longestStreak: 0
        });
      }
      res.json({ success: true, data: profile });
    } catch (error) {
      console.error("Error fetching learning profile:", error);
      res.status(500).json({ success: false, error: "Failed to fetch learning profile" });
    }
  });
  app2.patch("/api/user/learning-profile", noAuth, async (req, res) => {
    try {
      const userId = req.user.uid;
      const profile = await storage.updateUserLearningProfile(userId, req.body);
      res.json({ success: true, data: profile });
    } catch (error) {
      console.error("Error updating learning profile:", error);
      res.status(500).json({ success: false, error: "Failed to update learning profile" });
    }
  });
  app2.get("/api/user/achievements", noAuth, async (req, res) => {
    try {
      const userId = req.user.uid;
      const achievements = await storage.getUserAchievements(userId);
      res.json({ success: true, data: achievements });
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ success: false, error: "Failed to fetch achievements" });
    }
  });
  app2.post("/api/user/achievements", noAuth, async (req, res) => {
    try {
      const userId = req.user.uid;
      const achievementData = { ...req.body, userId };
      const achievement = await storage.createUserAchievement(achievementData);
      res.json({ success: true, data: achievement });
    } catch (error) {
      console.error("Error creating achievement:", error);
      res.status(500).json({ success: false, error: "Failed to create achievement" });
    }
  });
  app2.post("/api/checkpoints/initialize-free", noAuth, async (req, res) => {
    try {
      const existingCheckpoints = await storage.getCheckpoints(void 0, void 0, true);
      if (existingCheckpoints.length === 0) {
        const freeCheckpoints = [
          {
            name: "Financial Basics Foundation",
            description: "Learn the fundamental concepts of personal finance",
            category: "budgeting",
            level: 1,
            points: 100,
            isFree: true,
            requirements: [],
            actionItems: [
              { id: 1, title: "Complete budgeting basics quiz", completed: false },
              { id: 2, title: "Set up your first budget", completed: false },
              { id: 3, title: "Track expenses for one week", completed: false }
            ],
            rewards: { badge: "Foundation Builder", points: 100 },
            estimatedTimeMinutes: 45,
            order: 1,
            isActive: true
          },
          {
            name: "Emergency Fund Starter",
            description: "Build your first emergency fund with smart saving strategies",
            category: "budgeting",
            level: 1,
            points: 150,
            isFree: true,
            requirements: [1],
            actionItems: [
              { id: 1, title: "Calculate your monthly expenses", completed: false },
              { id: 2, title: "Set emergency fund goal", completed: false },
              { id: 3, title: "Open high-yield savings account", completed: false },
              { id: 4, title: "Automate emergency fund savings", completed: false }
            ],
            rewards: { badge: "Safety Net Creator", points: 150 },
            estimatedTimeMinutes: 60,
            order: 2,
            isActive: true
          },
          {
            name: "Investment Introduction",
            description: "Understand basic investment concepts and start your investment journey",
            category: "investing",
            level: 1,
            points: 200,
            isFree: true,
            requirements: [],
            actionItems: [
              { id: 1, title: "Learn about different investment types", completed: false },
              { id: 2, title: "Understand risk and return", completed: false },
              { id: 3, title: "Complete investment personality quiz", completed: false },
              { id: 4, title: "Explore SIP investment options", completed: false }
            ],
            rewards: { badge: "Investment Explorer", points: 200 },
            estimatedTimeMinutes: 90,
            order: 1,
            isActive: true
          }
        ];
        for (const checkpoint of freeCheckpoints) {
          await storage.createCheckpoint(checkpoint);
        }
      }
      res.json({
        success: true,
        message: "Free checkpoints initialized",
        checkpointsCount: existingCheckpoints.length || 3
      });
    } catch (error) {
      console.error("Error initializing free checkpoints:", error);
      res.status(500).json({ success: false, error: "Failed to initialize checkpoints" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path5 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path4 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path4.resolve(import.meta.dirname, "client", "src"),
      "@shared": path4.resolve(import.meta.dirname, "shared"),
      "@assets": path4.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path4.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path4.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path5.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path5.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path5.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import path6 from "path";
import fs2 from "fs";
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  if (req.hostname === "www.dollarmento.com") {
    return res.redirect(301, "https://dollarmento.com" + req.url);
  }
  next();
});
app.get("/datadeletion", (req, res) => {
  const filePath = path6.join(process.cwd(), "client/public/datadeletion.html");
  if (fs2.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Data Deletion page not found");
  }
});
app.get("/privacypolicy", (req, res) => {
  const filePath = path6.join(process.cwd(), "client/public/privacypolicy.html");
  if (fs2.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Privacy Policy page not found");
  }
});
app.get("/termsofservice", (req, res) => {
  const filePath = path6.join(process.cwd(), "client/public/termsofservice.html");
  if (fs2.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Terms of Service page not found");
  }
});
app.get("/robots.txt", (req, res) => {
  const filePath = path6.join(process.cwd(), "client/public/robots.txt");
  if (fs2.existsSync(filePath)) {
    res.type("text/plain");
    res.sendFile(filePath);
  } else {
    res.status(404).send("Robots.txt not found");
  }
});
app.get("/sitemap.xml", (req, res) => {
  const filePath = path6.join(process.cwd(), "client/public/sitemap.xml");
  if (fs2.existsSync(filePath)) {
    res.type("application/xml");
    res.sendFile(filePath);
  } else {
    res.status(404).send("Sitemap.xml not found");
  }
});
app.get("/google9e2938c06a91c4f9.html", (req, res) => {
  const filePath = path6.join(process.cwd(), "client/public/google9e2938c06a91c4f9.html");
  if (fs2.existsSync(filePath)) {
    res.type("text/html");
    res.sendFile(filePath);
  } else {
    res.status(404).send("Google verification file not found");
  }
});
app.use((req, res, next) => {
  const start = Date.now();
  const path7 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path7.startsWith("/api")) {
      let logLine = `${req.method} ${path7} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
