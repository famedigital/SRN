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

/** Rewrite Supabase direct db host (IPv6-only) to the IPv4 pooler Vercel can reach. */
function normalizeDatabaseUrl(raw: string): string {
  const direct = raw.match(
    /^postgres(?:ql)?:\/\/([^:@/]+):([^@]+)@db\.([a-z0-9]+)\.supabase\.co:5432\/([^?]*)(\?.*)?$/i,
  );
  if (!direct) return raw;
  const [, user, pass, ref, db, query = ""] = direct;
  const poolUser = user.includes(".") ? user : `postgres.${ref}`;
  // Project region verified: ap-northeast-1
  const region = process.env.SUPABASE_POOLER_REGION ?? "ap-northeast-1";
  const params = new URLSearchParams(query.replace(/^\?/, ""));
  if (!params.has("pgbouncer")) params.set("pgbouncer", "true");
  return `postgresql://${poolUser}:${pass}@aws-0-${region}.pooler.supabase.com:6543/${db}?${params.toString()}`;
}

async function createPostgresDb(): Promise<Db> {
  const { default: pg } = await import("pg");
  const rawUrl = process.env.DATABASE_URL;
  if (!rawUrl) {
    throw new Error("DATABASE_URL is required when DATABASE_MODE=postgres");
  }
  const connectionString = normalizeDatabaseUrl(rawUrl);
  const needsSsl =
    /supabase\.co|sslmode=require|pooler\.supabase/i.test(connectionString) ||
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
