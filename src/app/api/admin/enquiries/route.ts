import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth/session";
import { getDb } from "@/lib/db/client";
import { auditLogs, enquiries } from "@/lib/db/schema";

export async function PATCH(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status } = await req.json();
  if (!id || !status) {
    return NextResponse.json({ error: "id and status required" }, { status: 400 });
  }

  const db = await getDb();
  await db
    .update(enquiries)
    .set({ status, updatedAt: new Date() })
    .where(eq(enquiries.id, id));

  await db.insert(auditLogs).values({
    actorId: user.id,
    actorEmail: user.email,
    action: "UPDATE_ENQUIRY_STATUS",
    resource: "enquiries",
    resourceId: id,
    diff: { status },
  });

  return NextResponse.json({ ok: true });
}
