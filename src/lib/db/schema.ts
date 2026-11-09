import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("trade_officer"),
  twoFactorSecret: text("two_factor_secret"),
  twoFactorEnabled: boolean("two_factor_enabled").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const enquiries = pgTable("enquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  referenceNumber: varchar("reference_number", { length: 32 }).notNull().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  businessEmail: varchar("business_email", { length: 255 }).notNull(),
  phoneWhatsApp: varchar("phone_whatsapp", { length: 50 }),
  country: varchar("country", { length: 100 }).notNull(),
  enquiryType: varchar("enquiry_type", { length: 50 }).notNull(),
  productCategories: jsonb("product_categories").$type<string[]>().notNull(),
  lineItems: jsonb("line_items").$type<
    { slug: string; name: string; notes?: string }[]
  >(),
  specifications: text("specifications").notNull(),
  estimatedQuantity: varchar("estimated_quantity", { length: 100 }),
  requiredPackaging: varchar("required_packaging", { length: 100 }),
  incoterm: varchar("incoterm", { length: 20 }),
  destinationPort: varchar("destination_port", { length: 150 }),
  originGateway: varchar("origin_gateway", { length: 150 }),
  timeline: varchar("timeline", { length: 100 }),
  additionalNotes: text("additional_notes"),
  attachmentUrls: jsonb("attachment_urls").$type<string[]>(),
  status: varchar("status", { length: 50 }).notNull().default("NEW"),
  assignedTo: uuid("assigned_to").references(() => users.id),
  consentGiven: boolean("consent_given").notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const outbox = pgTable("outbox", {
  id: uuid("id").primaryKey().defaultRandom(),
  aggregateType: varchar("aggregate_type", { length: 50 }).notNull(),
  aggregateId: varchar("aggregate_id", { length: 100 }).notNull(),
  channel: varchar("channel", { length: 50 }).notNull(),
  payload: jsonb("payload").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("PENDING"),
  retryCount: integer("retry_count").notNull().default(0),
  lastError: text("last_error"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  processedAt: timestamp("processed_at"),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  actorId: uuid("actor_id"),
  actorEmail: varchar("actor_email", { length: 255 }),
  action: varchar("action", { length: 100 }).notNull(),
  resource: varchar("resource", { length: 100 }).notNull(),
  resourceId: varchar("resource_id", { length: 100 }),
  ipAddress: varchar("ip_address", { length: 45 }),
  diff: jsonb("diff"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  hsCode: varchar("hs_code", { length: 50 }),
  summary: text("summary").notNull(),
  specifications: jsonb("specifications").notNull(),
  packagingOptions: jsonb("packaging_options").$type<string[]>().notNull(),
  moq: varchar("moq", { length: 100 }),
  heroImageUrl: text("hero_image_url").notNull(),
  galleryUrls: jsonb("gallery_urls").$type<string[]>(),
  isPublished: boolean("is_published").default(true),
  sortOrder: integer("sort_order").default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const pages = pgTable("pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  body: jsonb("body").notNull(),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  isPublished: boolean("is_published").default(true),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const hermesChats = pgTable("hermes_chats", {
  id: uuid("id").primaryKey().defaultRandom(),
  chatId: varchar("chat_id", { length: 64 }).notNull().unique(),
  role: varchar("role", { length: 50 }).notNull().default("editor"),
  label: varchar("label", { length: 255 }),
  pairedAt: timestamp("paired_at").defaultNow().notNull(),
});

export const hermesPairTokens = pgTable("hermes_pair_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  token: varchar("token", { length: 64 }).notNull().unique(),
  role: varchar("role", { length: 50 }).notNull().default("editor"),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const settings = pgTable("settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
