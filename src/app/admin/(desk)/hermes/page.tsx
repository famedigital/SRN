import { desc } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { hermesChats, hermesPairTokens } from "@/lib/db/schema";
import { HermesPairForm } from "@/components/admin/hermes-pair-form";
import { formatDate } from "@/lib/utils";

export default async function AdminHermesPage() {
  const db = await getDb();
  const chats = await db.select().from(hermesChats).orderBy(desc(hermesChats.pairedAt));
  const tokens = await db
    .select()
    .from(hermesPairTokens)
    .orderBy(desc(hermesPairTokens.createdAt))
    .limit(5);
  const botUser = process.env.TELEGRAM_BOT_USERNAME;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Hermes</h1>
        <p className="mt-1 text-sm text-black/55">
          Telegram ops bus — enquiry alerts, /enquiries, /publish. Local tests need a bot token
          and a tunnel to <code className="font-mono text-xs">/api/hermes/webhook</code>.
        </p>
      </div>

      <section className="border border-black/10 bg-white p-4">
        <h2 className="text-sm font-semibold">Setup</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-black/65">
          <li>
            Bot username:{" "}
            <span className="font-mono">{botUser || "(set TELEGRAM_BOT_USERNAME)"}</span>
          </li>
          <li>Env: TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET, ADMIN_CHAT_IDS</li>
          <li>Commands: /enquiries · /enquiry &lt;ref&gt; · /status · /publish &lt;slug&gt;</li>
        </ul>
        <HermesPairForm botUsername={botUser} />
      </section>

      <section className="border border-black/10 bg-white p-4">
        <h2 className="text-sm font-semibold">Paired chats</h2>
        <ul className="mt-3 divide-y divide-black/5">
          {chats.map((c) => (
            <li key={c.id} className="flex justify-between py-2 text-sm">
              <span>
                {c.label || c.chatId} · {c.role}
              </span>
              <span className="font-mono text-xs text-black/45">{formatDate(c.pairedAt)}</span>
            </li>
          ))}
          {!chats.length && (
            <li className="py-4 text-sm text-black/45">No chats paired yet.</li>
          )}
        </ul>
      </section>

      <section className="border border-black/10 bg-white p-4">
        <h2 className="text-sm font-semibold">Recent pair tokens</h2>
        <ul className="mt-3 space-y-2 text-xs font-mono text-black/60">
          {tokens.map((t) => (
            <li key={t.id}>
              {t.token.slice(0, 8)}… · {t.role} · expires {formatDate(t.expiresAt)}
              {t.usedAt ? " · used" : " · open"}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
