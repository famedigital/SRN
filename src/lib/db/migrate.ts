import { getDb } from "./client";
import { sql } from "drizzle-orm";

const STATEMENTS = [
  `CREATE EXTENSION IF NOT EXISTS pgcrypto`,
  `CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'trade_officer',
      two_factor_secret TEXT,
      two_factor_enabled BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )`,
  `CREATE TABLE IF NOT EXISTS sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL UNIQUE,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )`,
  `CREATE TABLE IF NOT EXISTS enquiries (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      reference_number VARCHAR(32) NOT NULL UNIQUE,
      full_name VARCHAR(255) NOT NULL,
      company_name VARCHAR(255) NOT NULL,
      business_email VARCHAR(255) NOT NULL,
      phone_whatsapp VARCHAR(50),
      country VARCHAR(100) NOT NULL,
      enquiry_type VARCHAR(50) NOT NULL,
      product_categories JSONB NOT NULL,
      line_items JSONB,
      specifications TEXT NOT NULL,
      estimated_quantity VARCHAR(100),
      required_packaging VARCHAR(100),
      incoterm VARCHAR(20),
      destination_port VARCHAR(150),
      origin_gateway VARCHAR(150),
      timeline VARCHAR(100),
      additional_notes TEXT,
      attachment_urls JSONB,
      status VARCHAR(50) NOT NULL DEFAULT 'NEW',
      assigned_to UUID REFERENCES users(id),
      consent_given BOOLEAN NOT NULL,
      ip_address VARCHAR(45),
      user_agent TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )`,
  `CREATE TABLE IF NOT EXISTS outbox (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      aggregate_type VARCHAR(50) NOT NULL,
      aggregate_id VARCHAR(100) NOT NULL,
      channel VARCHAR(50) NOT NULL,
      payload JSONB NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
      retry_count INTEGER NOT NULL DEFAULT 0,
      last_error TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      processed_at TIMESTAMP
    )`,
  `CREATE TABLE IF NOT EXISTS audit_logs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      actor_id UUID,
      actor_email VARCHAR(255),
      action VARCHAR(100) NOT NULL,
      resource VARCHAR(100) NOT NULL,
      resource_id VARCHAR(100),
      ip_address VARCHAR(45),
      diff JSONB,
      timestamp TIMESTAMP NOT NULL DEFAULT NOW()
    )`,
  `CREATE TABLE IF NOT EXISTS products (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug VARCHAR(100) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      hs_code VARCHAR(50),
      summary TEXT NOT NULL,
      specifications JSONB NOT NULL,
      packaging_options JSONB NOT NULL,
      moq VARCHAR(100),
      hero_image_url TEXT NOT NULL,
      gallery_urls JSONB,
      is_published BOOLEAN DEFAULT TRUE,
      sort_order INTEGER DEFAULT 0,
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )`,
  `CREATE TABLE IF NOT EXISTS pages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug VARCHAR(100) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      body JSONB NOT NULL,
      seo_title VARCHAR(255),
      seo_description TEXT,
      is_published BOOLEAN DEFAULT TRUE,
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )`,
  `CREATE TABLE IF NOT EXISTS hermes_chats (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      chat_id VARCHAR(64) NOT NULL UNIQUE,
      role VARCHAR(50) NOT NULL DEFAULT 'editor',
      label VARCHAR(255),
      paired_at TIMESTAMP NOT NULL DEFAULT NOW()
    )`,
  `CREATE TABLE IF NOT EXISTS hermes_pair_tokens (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      token VARCHAR(64) NOT NULL UNIQUE,
      role VARCHAR(50) NOT NULL DEFAULT 'editor',
      expires_at TIMESTAMP NOT NULL,
      used_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )`,
  `CREATE TABLE IF NOT EXISTS settings (
      key VARCHAR(100) PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )`,
];

export async function ensureSchema() {
  const db = await getDb();
  for (const statement of STATEMENTS) {
    try {
      await db.execute(sql.raw(statement));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // PGlite may not support pgcrypto extension — ignore and continue
      if (statement.includes("CREATE EXTENSION") || msg.includes("already exists")) {
        continue;
      }
      // Some PGlite builds expose gen_random_uuid without extension
      if (msg.toLowerCase().includes("extension")) continue;
      throw err;
    }
  }
}
