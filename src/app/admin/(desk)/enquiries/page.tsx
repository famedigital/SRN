import { desc } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { enquiries } from "@/lib/db/schema";
import { formatDate } from "@/lib/utils";
import { EnquiryActions } from "@/components/admin/enquiry-actions";

export default async function AdminEnquiriesPage() {
  const db = await getDb();
  const rows = await db.select().from(enquiries).orderBy(desc(enquiries.createdAt));

  return (
    <div>
      <h1 className="text-2xl font-semibold">Enquiries</h1>
      <p className="mt-1 text-sm text-black/55">RFQ pipeline</p>
      <div className="mt-6 overflow-x-auto border border-black/10 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-black/[0.03] text-xs uppercase tracking-wider text-black/45">
            <tr>
              <th className="px-3 py-2">Ref</th>
              <th className="px-3 py-2">Company</th>
              <th className="px-3 py-2">Contact</th>
              <th className="px-3 py-2">Categories</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-black/5 align-top">
                <td className="px-3 py-3 font-mono text-xs">{row.referenceNumber}</td>
                <td className="px-3 py-3">
                  <div>{row.companyName}</div>
                  <div className="text-xs text-black/45">{row.country}</div>
                </td>
                <td className="px-3 py-3">
                  <div>{row.fullName}</div>
                  <div className="text-xs text-black/45">{row.businessEmail}</div>
                </td>
                <td className="px-3 py-3 text-xs">
                  {(row.productCategories as string[]).join(", ")}
                </td>
                <td className="px-3 py-3">{row.status}</td>
                <td className="px-3 py-3 text-black/55">{formatDate(row.createdAt)}</td>
                <td className="px-3 py-3">
                  <EnquiryActions id={row.id} status={row.status} specs={row.specifications} />
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={7} className="px-3 py-10 text-center text-black/45">
                  No enquiries yet. Public form posts land here with zero-loss outbox.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
