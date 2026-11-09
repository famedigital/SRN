import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { ensureSchema } from "@/lib/db/migrate";
import { outbox } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const started = Date.now();
  try {
    await ensureSchema();
    const db = await getDb();
    await db.execute(sql`SELECT 1`);
    const pending = await db
      .select()
      .from(outbox)
      .where(eq(outbox.status, "PENDING"));
    return NextResponse.json({
      ok: true,
      dbLatencyMs: Date.now() - started,
      outboxPending: pending.length,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 503 },
    );
  }
}
