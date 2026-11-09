import { NextResponse } from "next/server";
import { ensureSchema } from "@/lib/db/migrate";
import { handleHermesUpdate } from "@/lib/hermes/handle-update";

export async function POST(req: Request) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (secret) {
    const header = req.headers.get("x-telegram-bot-api-secret-token");
    if (header !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
  await ensureSchema();
  const update = await req.json();
  await handleHermesUpdate(update);
  return NextResponse.json({ ok: true });
}
