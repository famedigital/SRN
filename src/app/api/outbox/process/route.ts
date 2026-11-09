import { NextResponse } from "next/server";
import { ensureSchema } from "@/lib/db/migrate";
import { processOutbox } from "@/lib/outbox/process";

export async function POST() {
  await ensureSchema();
  const result = await processOutbox();
  return NextResponse.json({ ok: true, ...result });
}
