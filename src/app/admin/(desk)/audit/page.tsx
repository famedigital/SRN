import { desc } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { auditLogs } from "@/lib/db/schema";
import { formatDate } from "@/lib/utils";

export default async function AdminAuditPage() {
  const db = await getDb();
  const rows = await db.select().from(auditLogs).orderBy(desc(auditLogs.timestamp)).limit(100);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Audit log</h1>
      <p className="mt-1 text-sm text-black/55">Immutable event trail (latest 100)</p>
      <div className="mt-6 overflow-x-auto border border-black/10 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-black/[0.03] text-xs uppercase tracking-wider text-black/45">
            <tr>
              <th className="px-3 py-2">When</th>
              <th className="px-3 py-2">Actor</th>
              <th className="px-3 py-2">Action</th>
              <th className="px-3 py-2">Resource</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-black/5">
                <td className="px-3 py-2 font-mono text-xs">{formatDate(r.timestamp)}</td>
                <td className="px-3 py-2 text-xs">{r.actorEmail ?? "public"}</td>
                <td className="px-3 py-2">{r.action}</td>
                <td className="px-3 py-2 font-mono text-xs">
                  {r.resource}
                  {r.resourceId ? `:${r.resourceId.slice(0, 8)}` : ""}
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={4} className="px-3 py-8 text-center text-black/45">
                  No audit events yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
