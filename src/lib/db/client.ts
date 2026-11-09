import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import { PGlite } from "@electric-sql/pglite";
import path from "node:path";
import fs from "node:fs";
import * as schema from "./schema";

export type Db = ReturnType<typeof drizzlePglite<typeof schema>>;

declare global {
  var __srnDb: Db | undefined;
  var __srnPglite: PGlite | undefined;
  var __srnDbReady: Promise<Db> | undefined;
}

async function createPgliteDb(): Promise<Db> {
  const dataDir = path.join(process.cwd(), ".data", "pglite");
  fs.mkdirSync(dataDir, { recursive: true });
  const client =
    global.__srnPglite ??
    new PGlite(dataDir);
  global.__srnPglite = client;
  await client.waitReady;
  return drizzlePglite({ client, schema });
}

async function createPostgresDb(): Promise<Db> {
  const { default: pg } = await import("pg");
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required when DATABASE_MODE=postgres");
  }
  const needsSsl =
    /supabase\.co|sslmode=require/i.test(connectionString) ||
    process.env.DATABASE_SSL === "true";
  // Prefer IPv4 — Vercel often cannot reach Supabase direct AAAA (ENETUNREACH)
  try {
    const dns = await import("node:dns");
    dns.setDefaultResultOrder?.("ipv4first");
  } catch {
    /* ignore */
  }

  const pool = new pg.Pool({
    connectionString,
    ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
    max: 5,
  });
  // Cast compatible — same schema API surface
  return drizzlePg({ client: pool, schema }) as unknown as Db;
}

export async function getDb(): Promise<Db> {
  if (global.__srnDb) return global.__srnDb;
  if (!global.__srnDbReady) {
    global.__srnDbReady = (async () => {
      const mode = process.env.DATABASE_MODE ?? "pglite";
      const db =
        mode === "postgres" && process.env.DATABASE_URL
          ? await createPostgresDb()
          : await createPgliteDb();
      global.__srnDb = db;
      return db;
    })();
  }
  return global.__srnDbReady;
}
