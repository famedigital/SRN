import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import {
  createSession,
  destroySession,
  verifyCredentials,
  verifyTotp,
} from "@/lib/auth/session";
import { getDb } from "@/lib/db/client";
import { auditLogs } from "@/lib/db/schema";
import { rateLimit } from "@/lib/security/rate-limit";

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const limited = rateLimit(`admin-login:${ip}`, 10, 15 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many attempts." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { email, password, totp } = body as {
      email?: string;
      password?: string;
      totp?: string;
    };
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required." }, { status: 400 });
    }

    const user = await verifyCredentials(email, password);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    if (user.twoFactorEnabled) {
      if (!totp || !user.twoFactorSecret || !verifyTotp(user.twoFactorSecret, totp)) {
        return NextResponse.json(
          { error: "Two-factor code required.", requires2fa: true },
          { status: 401 },
        );
      }
    }

    await createSession(user.id);
    const db = await getDb();
    await db.insert(auditLogs).values({
      actorId: user.id,
      actorEmail: user.email,
      action: "LOGIN",
      resource: "auth",
      ipAddress: ip,
    });

    return NextResponse.json({
      ok: true,
      user: {
        email: user.email,
        role: user.role,
        twoFactorEnabled: user.twoFactorEnabled,
      },
    });
  } catch (err) {
    console.error("[admin/auth] login failed", err);
    const message =
      err instanceof Error && /ENETUNREACH|ECONNREFUSED|DATABASE_URL|connect/i.test(err.message)
        ? "Database unavailable. Check DATABASE_URL (use Supabase pooler)."
        : "Login failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE() {
  await destroySession();
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request) {
  // Enable 2FA setup — stores secret when user confirms first code
  const { createTotpSecret, getSessionUser, verifyTotp } = await import(
    "@/lib/auth/session"
  );
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const db = await getDb();
  const { users } = await import("@/lib/db/schema");

  if (body.action === "begin2fa") {
    const { secret, uri } = createTotpSecret(user.email);
    await db
      .update(users)
      .set({ twoFactorSecret: secret, updatedAt: new Date() })
      .where(eq(users.id, user.id));
    return NextResponse.json({ secret, uri });
  }

  if (body.action === "confirm2fa") {
    const [row] = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
    if (!row?.twoFactorSecret || !body.totp || !verifyTotp(row.twoFactorSecret, body.totp)) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }
    await db
      .update(users)
      .set({ twoFactorEnabled: true, updatedAt: new Date() })
      .where(eq(users.id, user.id));
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
