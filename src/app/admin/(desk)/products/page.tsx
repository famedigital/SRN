import { asc } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { products } from "@/lib/db/schema";
import { PublishToggle } from "@/components/admin/publish-toggle";

export default async function AdminProductsPage() {
  const db = await getDb();
  const rows = await db.select().from(products).orderBy(asc(products.sortOrder));

  return (
    <div>
      <h1 className="text-2xl font-semibold">Products</h1>
      <p className="mt-1 text-sm text-black/55">Catalogue publish controls</p>
      <ul className="mt-6 divide-y divide-black/10 border border-black/10 bg-white">
        {rows.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center justify-between gap-4 px-4 py-4">
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="font-mono text-xs text-black/45">
                /products/{p.slug}
              </p>
            </div>
            <PublishToggle id={p.id} slug={p.slug} published={Boolean(p.isPublished)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
