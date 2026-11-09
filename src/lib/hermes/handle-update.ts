import { and, desc, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db/client";
import {
  enquiries,
  hermesChats,
  hermesPairTokens,
  products,
} from "@/lib/db/schema";
import { telegramSendMessage } from "./bot-api";

type TgUpdate = {
  message?: {
    chat: { id: number; title?: string; username?: string };
    text?: string;
    from?: { first_name?: string };
  };
};

export async function handleHermesUpdate(update: TgUpdate) {
  const message = update.message;
  if (!message?.text) return;
  const chatId = String(message.chat.id);
  const text = message.text.trim();
  const db = await getDb();

  if (text.startsWith("/start")) {
    const parts = text.split(/\s+/);
    const payload = parts[1] ?? "";
    if (payload.startsWith("pair_")) {
      const token = payload.slice(5);
      const [row] = await db
        .select()
        .from(hermesPairTokens)
        .where(and(eq(hermesPairTokens.token, token), isNull(hermesPairTokens.usedAt)))
        .limit(1);
      if (!row || row.expiresAt < new Date()) {
        await telegramSendMessage(chatId, "Pairing link expired or invalid.");
        return;
      }
      const label =
        message.chat.title ?? message.chat.username ?? message.from?.first_name;
      const [existingChat] = await db
        .select()
        .from(hermesChats)
        .where(eq(hermesChats.chatId, chatId))
        .limit(1);
      if (existingChat) {
        await db
          .update(hermesChats)
          .set({ role: row.role, pairedAt: new Date(), label })
          .where(eq(hermesChats.chatId, chatId));
      } else {
        await db.insert(hermesChats).values({
          chatId,
          role: row.role,
          label,
        });
      }
      await db
        .update(hermesPairTokens)
        .set({ usedAt: new Date() })
        .where(eq(hermesPairTokens.id, row.id));
      await telegramSendMessage(
        chatId,
        `Paired as <b>${row.role}</b>. Commands: /enquiries /enquiry &lt;ref&gt; /status &lt;ref&gt; &lt;status&gt; /publish &lt;slug&gt;`,
      );
      return;
    }
    await telegramSendMessage(chatId, "SRN Hermes. Ask admin for a pairing link.");
    return;
  }

  const [chat] = await db
    .select()
    .from(hermesChats)
    .where(eq(hermesChats.chatId, chatId))
    .limit(1);
  if (!chat) {
    await telegramSendMessage(chatId, "This chat is not paired. Request a pair link from /admin/hermes.");
    return;
  }

  if (text === "/enquiries") {
    const rows = await db
      .select()
      .from(enquiries)
      .orderBy(desc(enquiries.createdAt))
      .limit(10);
    if (!rows.length) {
      await telegramSendMessage(chatId, "No enquiries yet.");
      return;
    }
    const body = rows
      .map(
        (r) =>
          `• <b>${r.referenceNumber}</b> ${r.status} — ${r.companyName} (${r.country})`,
      )
      .join("\n");
    await telegramSendMessage(chatId, `Latest enquiries:\n${body}`);
    return;
  }

  if (text.startsWith("/enquiry ")) {
    const ref = text.slice(9).trim();
    const [row] = await db
      .select()
      .from(enquiries)
      .where(eq(enquiries.referenceNumber, ref))
      .limit(1);
    if (!row) {
      await telegramSendMessage(chatId, "Not found.");
      return;
    }
    await telegramSendMessage(
      chatId,
      [
        `<b>${row.referenceNumber}</b> · ${row.status}`,
        `${row.companyName} — ${row.fullName}`,
        row.businessEmail,
        `Categories: ${(row.productCategories as string[]).join(", ")}`,
        row.specifications.slice(0, 500),
      ].join("\n"),
    );
    return;
  }

  if (text.startsWith("/status ")) {
    const [, ref, status] = text.split(/\s+/);
    if (!ref || !status) {
      await telegramSendMessage(chatId, "Usage: /status SRN-2026-XXXX NEW|UNDER_REVIEW|QUOTED|ARCHIVED");
      return;
    }
    await db
      .update(enquiries)
      .set({ status: status.toUpperCase(), updatedAt: new Date() })
      .where(eq(enquiries.referenceNumber, ref));
    await telegramSendMessage(chatId, `Updated ${ref} → ${status.toUpperCase()}`);
    return;
  }

  if (text.startsWith("/publish ")) {
    const slug = text.slice(9).trim();
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);
    if (product) {
      await db
        .update(products)
        .set({ isPublished: true, updatedAt: new Date() })
        .where(eq(products.slug, slug));
      revalidatePath(`/products/${slug}`);
      revalidatePath("/products");
      await telegramSendMessage(chatId, `Published product page: ${slug}`);
      return;
    }
    revalidatePath("/");
    revalidatePath(`/${slug}`);
    await telegramSendMessage(chatId, `Revalidated path for: ${slug}`);
    return;
  }

  await telegramSendMessage(
    chatId,
    "Commands: /enquiries · /enquiry &lt;ref&gt; · /status &lt;ref&gt; &lt;status&gt; · /publish &lt;slug&gt;",
  );
}
