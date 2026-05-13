import { pgTable, text, uuid, timestamp, integer, jsonb, pgEnum, boolean, decimal } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const userRoleEnum = pgEnum("user_role", ["guest", "client", "admin", "developer"]);
export const projectStatusEnum = pgEnum("project_status", ["inquiry", "planning", "design", "development", "testing", "deployment", "completed", "on_hold"]);
export const milestoneStatusEnum = pgEnum("milestone_status", ["pending", "in_progress", "completed", "skipped"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "paid", "overdue", "cancelled"]);
export const messageTypeEnum = pgEnum("message_type", ["text", "file", "system"]);
export const revisionStatusEnum = pgEnum("revision_status", ["pending", "in_progress", "resolved"]);

// ==============================
// USERS TABLE
// ==============================
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  role: userRoleEnum("role").notNull().default("client"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// ==============================
// CLIENT PROFILES TABLE
// ==============================
export const clientProfiles = pgTable("client_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  companyName: text("company_name"),
  contactNumber: text("contact_number"),
  industry: text("industry"),
  website: text("website"),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// PROJECTS TABLE
// ==============================
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: text("client_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  assignedDeveloperId: text("assigned_developer_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  status: projectStatusEnum("status").notNull().default("inquiry"),
  totalBudget: decimal("total_budget", { precision: 15, scale: 2 }),
  paidAmount: decimal("paid_amount", { precision: 15, scale: 2 }).default("0"),
  progressPercentage: integer("progress_percentage").default(0),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  techStack: jsonb("tech_stack").$type<string[]>(),
  requirements: text("requirements"),
  repositoryUrl: text("repository_url"),
  stagingUrl: text("staging_url"),
  productionUrl: text("production_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// PROJECT MILESTONES TABLE
// ==============================
export const projectMilestones = pgTable("project_milestones", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  percentage: integer("percentage").notNull().default(0),
  status: milestoneStatusEnum("status").notNull().default("pending"),
  dueDate: timestamp("due_date"),
  completedAt: timestamp("completed_at"),
  paymentAmount: decimal("payment_amount", { precision: 15, scale: 2 }),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// INVOICES TABLE
// ==============================
export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  milestoneId: uuid("milestone_id").references(() => projectMilestones.id),
  invoiceNumber: text("invoice_number").notNull().unique(),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  taxAmount: decimal("tax_amount", { precision: 15, scale: 2 }).default("0"),
  totalAmount: decimal("total_amount", { precision: 15, scale: 2 }).notNull(),
  paymentStatus: paymentStatusEnum("payment_status").notNull().default("pending"),
  paymentUrl: text("payment_url"),
  paymentMethod: text("payment_method"),
  paymentGateway: text("payment_gateway"),
  dueDate: timestamp("due_date"),
  paidAt: timestamp("paid_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// MESSAGES TABLE
// ==============================
export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  senderId: text("sender_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  type: messageTypeEnum("type").notNull().default("text"),
  fileUrl: text("file_url"),
  fileName: text("file_name"),
  fileSize: integer("file_size"),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==============================
// REVISION TICKETS TABLE
// ==============================
export const revisionTickets = pgTable("revision_tickets", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  submittedById: text("submitted_by_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: revisionStatusEnum("status").notNull().default("pending"),
  priority: text("priority").default("medium"),
  resolvedAt: timestamp("resolved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// PROJECT ASSETS TABLE
// ==============================
export const projectAssets = pgTable("project_assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  uploadedById: text("uploaded_by_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileType: text("file_type"),
  fileSize: integer("file_size"),
  category: text("category").default("document"), // document, design, source_code
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==============================
// AI RECOMMENDATION LOGS TABLE
// ==============================
export const aiRecommendationLogs = pgTable("ai_recommendation_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").references(() => users.id),
  sessionId: text("session_id"),
  inputData: jsonb("input_data").$type<{
    businessType: string;
    systemGoal: string;
    userScale: string;
    budgetRange: string;
    timeline: string;
    additionalInfo?: string;
  }>(),
  generatedResponse: jsonb("generated_response").$type<{
    architecture: string;
    mustHaveFeatures: string[];
    niceToHaveFeatures: string[];
    timeline: string;
    estimatedCost: string;
    techStack: string[];
    summary: string;
  }>(),
  tokensUsed: integer("tokens_used"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==============================
// PORTFOLIO / CASE STUDIES TABLE
// ==============================
export const portfolios = pgTable("portfolios", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  clientName: text("client_name"),
  industry: text("industry"),
  description: text("description"),
  problem: text("problem"),
  solution: text("solution"),
  results: jsonb("results").$type<string[]>(),
  techStack: jsonb("tech_stack").$type<string[]>(),
  imageUrl: text("image_url"),
  projectUrl: text("project_url"),
  category: text("category"),
  year: text("year"), // Added for portfolio data
  color: text("color"), // Added for visual style
  emoji: text("emoji"), // Added for visual style
  featured: boolean("featured").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// SERVICES TABLE
// ==============================
export const services = pgTable("services", {
  id: text("id").primaryKey(), // Using string ID as it's used in slugs/hashes
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description"),
  features: jsonb("features").$type<string[]>(),
  packages: jsonb("packages").$type<Array<{ name: string; price: string; desc: string }>>(),
  color: text("color"),
  gradient: text("gradient"),
  emoji: text("emoji"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// TESTIMONIALS TABLE
// ==============================
export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  role: text("role"),
  content: text("content").notNull(),
  rating: integer("rating").default(5),
  avatar: text("avatar"),
  color: text("color"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// CONTACT SUBMISSIONS TABLE
// ==============================
export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  service: text("service"),
  budget: text("budget"),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==============================
// RELATIONS
// ==============================
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(clientProfiles, {
    fields: [users.id],
    references: [clientProfiles.userId],
  }),
  projects: many(projects),
  sentMessages: many(messages),
  aiLogs: many(aiRecommendationLogs),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  client: one(users, {
    fields: [projects.clientId],
    references: [users.id],
  }),
  milestones: many(projectMilestones),
  invoices: many(invoices),
  messages: many(messages),
  revisionTickets: many(revisionTickets),
  assets: many(projectAssets),
}));

export const projectMilestonesRelations = relations(projectMilestones, ({ one }) => ({
  project: one(projects, {
    fields: [projectMilestones.projectId],
    references: [projects.id],
  }),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
  project: one(projects, {
    fields: [invoices.projectId],
    references: [projects.id],
  }),
  milestone: one(projectMilestones, {
    fields: [invoices.milestoneId],
    references: [projectMilestones.id],
  }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  project: one(projects, {
    fields: [messages.projectId],
    references: [projects.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
}));
