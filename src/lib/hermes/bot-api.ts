const API = "https://api.telegram.org";

export async function telegramSendMessage(chatId: string, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.info("[hermes] TELEGRAM_BOT_TOKEN not set — message skipped");
    return { ok: false as const, skipped: true };
  }
  const res = await fetch(`${API}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram send failed: ${res.status} ${body}`);
  }
  return { ok: true as const };
}

export function formatEnquiryAlert(payload: {
  referenceNumber: string;
  companyName: string;
  fullName: string;
  country: string;
  productCategories: string[];
  estimatedQuantity?: string;
  incoterm?: string;
  destinationPort?: string;
  timeline?: string;
  enquiryId: string;
}) {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return [
    `⚡ <b>NEW TRADE ENQUIRY</b> — ${payload.referenceNumber}`,
    `Company: ${payload.companyName} (${payload.country})`,
    `Contact: ${payload.fullName}`,
    `Category: ${payload.productCategories.join(", ")}`,
    payload.estimatedQuantity ? `Volume: ${payload.estimatedQuantity}` : null,
    payload.incoterm || payload.destinationPort
      ? `Terms: ${[payload.incoterm, payload.destinationPort].filter(Boolean).join(" · ")}`
      : null,
    payload.timeline ? `Timeline: ${payload.timeline}` : null,
    `🔗 Review: ${site}/admin/enquiries`,
  ]
    .filter(Boolean)
    .join("\n");
}
