import { getDb } from "@/lib/db/client";
import { pages } from "@/lib/db/schema";
import { RevalidateButton } from "@/components/admin/revalidate-button";

export default async function AdminPagesPage() {
  const db = await getDb();
  const rows = await db.select().from(pages);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Pages</h1>
      <p className="mt-1 text-sm text-black/55">
        Seeded from <code className="font-mono text-xs">content/copy.ts</code>. Edit copy
        there for v1; revalidate after changes.
      </p>
      <ul className="mt-6 divide-y divide-black/10 border border-black/10 bg-white">
        {rows.map((p) => (
          <li key={p.id} className="flex items-center justify-between gap-4 px-4 py-4">
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="font-mono text-xs text-black/45">/{p.slug === "home" ? "" : p.slug}</p>
            </div>
            <RevalidateButton path={p.slug === "home" ? "/" : `/${p.slug}`} />
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <RevalidateButton path="/" label="Revalidate all public home" />
      </div>
    </div>
  );
}
