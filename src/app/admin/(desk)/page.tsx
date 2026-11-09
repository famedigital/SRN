import { desc, eq, sql } from "drizzle-orm";
import Link from "next/link";
import { getDb } from "@/lib/db/client";
import { enquiries, outbox, products } from "@/lib/db/schema";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const db = await getDb();
  const [enquiryCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(enquiries);
  const [newCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(enquiries)
    .where(eq(enquiries.status, "NEW"));
  const [pendingOutbox] = await db
    .select({ count: sql<number>`count(*)` })
    .from(outbox)
    .where(eq(outbox.status, "PENDING"));
  const [productCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(products);
  const latest = await db
    .select()
    .from(enquiries)
    .orderBy(desc(enquiries.createdAt))
    .limit(5);

  const cards = [
    { label: "Enquiries", value: Number(enquiryCount?.count ?? 0) },
    { label: "New", value: Number(newCount?.count ?? 0) },
    { label: "Outbox pending", value: Number(pendingOutbox?.count ?? 0) },
    { label: "Products", value: Number(productCount?.count ?? 0) },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-black/55">Trade desk overview</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="border border-black/10 bg-white p-4">
            <p className="text-xs uppercase tracking-wider text-black/45">{c.label}</p>
            <p className="mt-2 font-mono text-3xl tabular-nums">{c.value}</p>
          </div>
        ))}
      </div>
      <section className="mt-10 border border-black/10 bg-white">
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
          <h2 className="text-sm font-semibold">Latest enquiries</h2>
          <Link href="/admin/enquiries" className="text-xs underline">
            View all
          </Link>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-black/[0.03] text-xs uppercase tracking-wider text-black/45">
            <tr>
              <th className="px-4 py-2">Reference</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {latest.map((row) => (
              <tr key={row.id} className="border-t border-black/5">
                <td className="px-4 py-2 font-mono text-xs">{row.referenceNumber}</td>
                <td className="px-4 py-2">{row.companyName}</td>
                <td className="px-4 py-2">{row.status}</td>
                <td className="px-4 py-2 text-black/55">{formatDate(row.createdAt)}</td>
              </tr>
            ))}
            {!latest.length && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-black/45">
                  No enquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
