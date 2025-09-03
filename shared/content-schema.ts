import { z } from "zod";
import { pgTable, text, timestamp, boolean, integer, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// Content Management Tables
export const contentPages = pgTable("content_pages", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  metaDescription: text("meta_description"),
  content: text("content").notNull(),
  seoTitle: text("seo_title"),
  keywords: text("keywords"),
  published: boolean("published").default(false),
  authorName: text("author_name"),
  category: text("category").default("general"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  metaDescription: text("meta_description"),
  seoTitle: text("seo_title"),
  keywords: text("keywords"),
  featuredImage: text("featured_image"),
  published: boolean("published").default(false),
  authorName: text("author_name"),
  readTime: integer("read_time").default(5),
  category: text("category").default("financial-tips"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const seoSettings = pgTable("seo_settings", {
  id: serial("id").primaryKey(),
  pagePath: text("page_path").notNull().unique(),
  title: text("title"),
  metaDescription: text("meta_description"),
  keywords: text("keywords"),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImage: text("og_image"),
  canonicalUrl: text("canonical_url"),
  schemaMarkup: text("schema_markup"),
  robots: text("robots").default("index,follow"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const landingPages = pgTable("landing_pages", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  headline: text("headline").notNull(),
  subheadline: text("subheadline"),
  heroContent: text("hero_content"),
  featuresSection: text("features_section"),
  benefitsSection: text("benefits_section"),
  ctaText: text("cta_text").default("Get Started"),
  ctaLink: text("cta_link").default("/calculators"),
  metaDescription: text("meta_description"),
  seoTitle: text("seo_title"),
  keywords: text("keywords"),
  published: boolean("published").default(false),
  targetCalculator: text("target_calculator"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Admin users for CMS access
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull().default("content_editor"), // content_editor, seo_manager, admin
  passwordHash: text("password_hash").notNull(),
  active: boolean("active").default(true),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod schemas for validation
export const insertContentPageSchema = createInsertSchema(contentPages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSeoSettingsSchema = createInsertSchema(seoSettings).omit({
  id: true,
  updatedAt: true,
});

export const insertLandingPageSchema = createInsertSchema(landingPages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
  lastLogin: true,
});

// Types
export type ContentPage = typeof contentPages.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type SeoSettings = typeof seoSettings.$inferSelect;
export type LandingPage = typeof landingPages.$inferSelect;
export type AdminUser = typeof adminUsers.$inferSelect;

export type InsertContentPage = z.infer<typeof insertContentPageSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type InsertSeoSettings = z.infer<typeof insertSeoSettingsSchema>;
export type InsertLandingPage = z.infer<typeof insertLandingPageSchema>;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;