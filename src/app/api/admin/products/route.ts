import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/lib/auth/session";
import { getDb } from "@/lib/db/client";
import { auditLogs, products } from "@/lib/db/schema";

export async function PATCH(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, slug, isPublished } = await req.json();
  const db = await getDb();
  await db
    .update(products)
    .set({ isPublished: Boolean(isPublished), updatedAt: new Date() })
    .where(eq(products.id, id));

  revalidatePath("/products");
  if (slug) revalidatePath(`/products/${slug}`);

  await db.insert(auditLogs).values({
    actorId: user.id,
    actorEmail: user.email,
    action: "PUBLISH_PRODUCT",
    resource: "products",
    resourceId: id,
    diff: { isPublished, slug },
  });

  return NextResponse.json({ ok: true });
}
