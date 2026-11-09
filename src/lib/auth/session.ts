import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import * as OTPAuth from "otpauth";
import { getDb } from "@/lib/db/client";
import { ensureSchema } from "@/lib/db/migrate";
import { sessions, users } from "@/lib/db/schema";

const COOKIE = "srn_session";
const SESSION_DAYS = 7;

export type SessionUser = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  twoFactorEnabled: boolean;
};

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function bootstrapAdmin() {
  await ensureSchema();
  const db = await getDb();
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL ?? "admin@srnglobal.in";
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD ?? "SRN-Admin-Local-2026!";
  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing.length) return existing[0];
  const passwordHash = await bcrypt.hash(password, 12);
  const [user] = await db
    .insert(users)
    .values({
      email,
      passwordHash,
      fullName: "SRN Administrator",
      role: "super_admin",
      twoFactorEnabled: false,
    })
    .returning();
  return user;
}

export async function verifyCredentials(email: string, password: string) {
  await bootstrapAdmin();
  const db = await getDb();
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return user;
}

export function verifyTotp(secret: string, token: string) {
  const totp = new OTPAuth.TOTP({
    issuer: "SRN Admin",
    label: "SRN",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(secret),
  });
  return totp.validate({ token, window: 1 }) !== null;
}

export function createTotpSecret(email: string) {
  const secret = new OTPAuth.Secret({ size: 20 });
  const totp = new OTPAuth.TOTP({
    issuer: "SRN Admin",
    label: email,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret,
  });
  return { secret: secret.base32, uri: totp.toString() };
}

export async function createSession(userId: string) {
  const db = await getDb();
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await db.insert(sessions).values({ userId, tokenHash, expiresAt });
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });
  return token;
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) {
    const db = await getDb();
    await db.delete(sessions).where(eq(sessions.tokenHash, hashToken(token)));
  }
  jar.set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    await ensureSchema();
    const db = await getDb();
    const tokenHash = hashToken(token);
    const rows = await db
      .select({
        id: users.id,
        email: users.email,
        fullName: users.fullName,
        role: users.role,
        twoFactorEnabled: users.twoFactorEnabled,
        expiresAt: sessions.expiresAt,
      })
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(eq(sessions.tokenHash, tokenHash))
      .limit(1);
    const row = rows[0];
    if (!row || row.expiresAt < new Date()) return null;
    return {
      id: row.id,
      email: row.email,
      fullName: row.fullName,
      role: row.role,
      twoFactorEnabled: Boolean(row.twoFactorEnabled),
    };
  } catch {
    return null;
  }
}

export function canAccess(
  role: string,
  resource: "enquiries" | "products" | "pages" | "audit" | "settings" | "hermes",
) {
  if (role === "super_admin") return true;
  if (role === "auditor") return resource === "audit" || resource === "enquiries";
  if (role === "trade_officer") return resource === "enquiries" || resource === "hermes";
  if (role === "cms_editor")
    return resource === "products" || resource === "pages" || resource === "settings";
  return false;
}
