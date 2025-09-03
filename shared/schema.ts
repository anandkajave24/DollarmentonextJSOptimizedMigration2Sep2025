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
  decimal,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { type InferSelectModel } from 'drizzle-orm';

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  subscriptionStatus: text('subscription_status').default('free'), // free, active, cancelled, expired
  subscriptionPlan: text('subscription_plan'), // basic, premium, pro
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  subscriptionStartDate: timestamp('subscription_start_date'),
  subscriptionEndDate: timestamp('subscription_end_date'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Subscription plans
export const subscriptionPlans = pgTable('subscription_plans', {
  id: varchar('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('INR'),
  interval: text('interval').notNull(), // month, year
  features: json('features'),
  stripePriceId: text('stripe_price_id'),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;
export const insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans);
export type InsertSubscriptionPlan = z.infer<typeof insertSubscriptionPlanSchema>;

// Payment transactions
export const paymentTransactions = pgTable('payment_transactions', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull(),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('INR'),
  status: text('status').notNull(), // pending, succeeded, failed, refunded
  planId: varchar('plan_id'),
  metadata: json('metadata'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type PaymentTransaction = typeof paymentTransactions.$inferSelect;
export const insertPaymentTransactionSchema = createInsertSchema(paymentTransactions).omit({ id: true });
export type InsertPaymentTransaction = z.infer<typeof insertPaymentTransactionSchema>;

// User devices for SMS syncing - updated for Firebase UIDs
export const userDevices = pgTable('user_devices', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id'),
  deviceId: text('device_id').notNull(),
  name: text('name'),
  platform: text('platform'),
  verified: boolean('verified').default(false),
  verificationCode: text('verification_code'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  lastActive: timestamp('last_active')
});

export type UserDevice = typeof userDevices.$inferSelect;
export const insertUserDeviceSchema = createInsertSchema(userDevices).omit({ id: true });
export type InsertUserDevice = z.infer<typeof insertUserDeviceSchema>;



// SMS messages storage
export const smsMessages = pgTable('sms_messages', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id'),
  deviceId: text('device_id'),
  sender: text('sender').notNull(),
  body: text('body').notNull(),
  receivedAt: timestamp('received_at').notNull(),
  processedAt: timestamp('processed_at'),
  category: text('category'),
  isRead: boolean('is_read').default(false),
  isProcessed: boolean('is_processed').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export type SmsMessage = InferSelectModel<typeof smsMessages>;
export const insertSmsMessageSchema = createInsertSchema(smsMessages).omit({ id: true });
export type InsertSmsMessage = z.infer<typeof insertSmsMessageSchema>;

// Financial transactions
export const financialTransactions = pgTable('financial_transactions', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id'),
  amount: integer('amount').notNull(),  // Amount in smallest currency unit (paise)
  description: text('description'),
  category: text('category').notNull(),
  transactionDate: timestamp('transaction_date').notNull(),
  merchantName: text('merchant_name'),
  accountType: text('account_type'),  // bank, credit_card, cash, etc.
  accountIdentifier: text('account_identifier'),  // Last 4 digits of card, bank account, etc.
  transactionType: text('transaction_type').notNull(),  // debit, credit
  source: text('source'),  // sms, manual, import, etc.
  sourceReference: text('source_reference'),  // Reference to original source (SMS ID, etc.)
  tags: text('tags').array(),
  metadata: json('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
});

export type FinancialTransaction = InferSelectModel<typeof financialTransactions>;
export const insertFinancialTransactionSchema = createInsertSchema(financialTransactions).omit({ id: true });
export type InsertFinancialTransaction = z.infer<typeof insertFinancialTransactionSchema>;





// Financial Learning Checkpoints
export const checkpoints = pgTable('checkpoints', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category').notNull(), // 'budgeting', 'investing', 'taxation', 'insurance', 'debt_management'
  level: integer('level').notNull(), // 1 = Beginner, 2 = Intermediate, 3 = Advanced
  points: integer('points').notNull().default(0),
  isFree: boolean('is_free').default(true), // Free checkpoints for all users
  requirements: json('requirements'), // JSON array of prerequisite checkpoint IDs
  actionItems: json('action_items'), // JSON array of tasks to complete
  rewards: json('rewards'), // JSON object for completion rewards
  estimatedTimeMinutes: integer('estimated_time_minutes'),
  order: integer('order').notNull(), // Display order within category
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export type Checkpoint = InferSelectModel<typeof checkpoints>;
export const insertCheckpointSchema = createInsertSchema(checkpoints).omit({ id: true });
export type InsertCheckpoint = z.infer<typeof insertCheckpointSchema>;

// User Checkpoint Progress
export const userCheckpointProgress = pgTable('user_checkpoint_progress', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull(),
  checkpointId: integer('checkpoint_id').notNull(),
  status: text('status').notNull().default('not_started'), // 'not_started', 'in_progress', 'completed', 'skipped'
  progress: integer('progress').default(0), // Percentage 0-100
  completedActions: json('completed_actions'), // Array of completed action item IDs
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  pointsEarned: integer('points_earned').default(0),
  notes: text('notes'), // User's personal notes
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export type UserCheckpointProgress = InferSelectModel<typeof userCheckpointProgress>;
export const insertUserCheckpointProgressSchema = createInsertSchema(userCheckpointProgress).omit({ id: true });
export type InsertUserCheckpointProgress = z.infer<typeof insertUserCheckpointProgressSchema>;

// User Achievement Tracking
export const userAchievements = pgTable('user_achievements', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull(),
  achievementType: text('achievement_type').notNull(), // 'checkpoint_completed', 'level_completed', 'streak', 'perfect_week'
  title: text('title').notNull(),
  description: text('description'),
  pointsAwarded: integer('points_awarded').default(0),
  badgeIcon: text('badge_icon'), // Icon name or emoji
  badgeColor: text('badge_color'), // Color hex code
  metadata: json('metadata'), // Additional achievement data
  unlockedAt: timestamp('unlocked_at').defaultNow(),
  isVisible: boolean('is_visible').default(true)
});

export type UserAchievement = InferSelectModel<typeof userAchievements>;
export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({ id: true });
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;

// User Learning Profile
export const userLearningProfiles = pgTable('user_learning_profiles', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull().unique(),
  totalPoints: integer('total_points').default(0),
  currentLevel: integer('current_level').default(1),
  completedCheckpoints: integer('completed_checkpoints').default(0),
  currentStreak: integer('current_streak').default(0), // Days of consistent activity
  longestStreak: integer('longest_streak').default(0),
  lastActivityDate: timestamp('last_activity_date'),
  preferredCategories: text('preferred_categories').array(), // User's interest areas
  learningGoals: json('learning_goals'), // User's stated learning objectives
  skillLevels: json('skill_levels'), // Current skill assessment per category
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export type UserLearningProfile = InferSelectModel<typeof userLearningProfiles>;
export const insertUserLearningProfileSchema = createInsertSchema(userLearningProfiles).omit({ id: true });
export type InsertUserLearningProfile = z.infer<typeof insertUserLearningProfileSchema>;