import { and, eq, lt, or, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { hermesChats, outbox } from "@/lib/db/schema";
import { formatEnquiryAlert, telegramSendMessage } from "@/lib/hermes/bot-api";

type EnquiryPayload = {
  referenceNumber: string;
  companyName: string;
  fullName: string;
  businessEmail: string;
  country: string;
  productCategories: string[];
  estimatedQuantity?: string;
  incoterm?: string;
  destinationPort?: string;
  timeline?: string;
  enquiryId: string;
};

export async function processOutbox(limit = 20) {
  const db = await getDb();
  const pending = await db
    .select()
    .from(outbox)
    .where(
      or(
        eq(outbox.status, "PENDING"),
        and(eq(outbox.status, "FAILED"), lt(outbox.retryCount, 5)),
      ),
    )
    .limit(limit);

  let processed = 0;
  for (const row of pending) {
    try {
      await db
        .update(outbox)
        .set({ status: "PROCESSING" })
        .where(eq(outbox.id, row.id));

      if (row.channel === "TELEGRAM") {
        await dispatchTelegram(row.payload as EnquiryPayload);
      } else if (row.channel === "EMAIL") {
        await dispatchEmail(row.payload as EnquiryPayload);
      }

      await db
        .update(outbox)
        .set({ status: "SENT", processedAt: new Date(), lastError: null })
        .where(eq(outbox.id, row.id));
      processed += 1;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      await db
        .update(outbox)
        .set({
          status: "FAILED",
          retryCount: sql`${outbox.retryCount} + 1`,
          lastError: message,
        })
        .where(eq(outbox.id, row.id));
    }
  }
  return { processed, scanned: pending.length };
}

async function dispatchTelegram(payload: EnquiryPayload) {
  const db = await getDb();
  const chats = await db.select().from(hermesChats);
  const envChats = (process.env.ADMIN_CHAT_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const targets = new Set([...chats.map((c) => c.chatId), ...envChats]);
  if (!targets.size) {
    console.info("[outbox] No Hermes chats configured — Telegram skipped (lead still saved)");
    return;
  }
  const text = formatEnquiryAlert(payload);
  for (const chatId of targets) {
    await telegramSendMessage(chatId, text);
  }
}

async function dispatchEmail(payload: EnquiryPayload) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.SMTP_FROM;
  const to = process.env.ADMIN_BOOTSTRAP_EMAIL;
  if (!key || !from || !to) {
    console.info("[outbox] Email not configured — skipped (lead still saved)");
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Trade enquiry ${payload.referenceNumber}`,
      text: `New enquiry ${payload.referenceNumber} from ${payload.companyName} (${payload.country}). Categories: ${payload.productCategories.join(", ")}. Contact: ${payload.fullName} <${payload.businessEmail}>`,
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend failed: ${res.status}`);
  }
}
