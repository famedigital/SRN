import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { getSessionUser } from "@/lib/auth/session";
import { getDb } from "@/lib/db/client";
import { hermesPairTokens } from "@/lib/db/schema";

export async function POST() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const token = randomBytes(16).toString("hex");
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
  const db = await getDb();
  await db.insert(hermesPairTokens).values({
    token,
    role: "editor",
    expiresAt,
  });

  const bot = process.env.TELEGRAM_BOT_USERNAME;
  const deepLink = bot
    ? `https://t.me/${bot}?start=pair_${token}`
    : `pair_${token} (open bot and send /start pair_${token})`;

  return NextResponse.json({ ok: true, token, deepLink, expiresAt });
}
