import { contactPlaceholders } from "../../../../../content/copy";
import { TwoFactorSetup } from "@/components/admin/two-factor-setup";
import { getSessionUser } from "@/lib/auth/session";

export default async function AdminSettingsPage() {
  const user = await getSessionUser();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-black/55">Contact placeholders & security</p>
      </div>

      <section className="border border-black/10 bg-white p-4">
        <h2 className="text-sm font-semibold">Public contact placeholders</h2>
        <p className="mt-2 text-sm text-black/55">
          Honest placeholders until the customer provides live details. Edit{" "}
          <code className="font-mono text-xs">content/copy.ts</code> →{" "}
          <code className="font-mono text-xs">contactPlaceholders</code>.
        </p>
        <ul className="mt-3 space-y-1 text-sm">
          <li>{contactPlaceholders.address}</li>
          <li>{contactPlaceholders.email}</li>
          <li>{contactPlaceholders.phone}</li>
          <li>{contactPlaceholders.hours}</li>
        </ul>
      </section>

      <section className="border border-black/10 bg-white p-4">
        <h2 className="text-sm font-semibold">Two-factor authentication</h2>
        <p className="mt-2 text-sm text-black/55">
          Status:{" "}
          {user?.twoFactorEnabled ? "Enabled" : "Optional for local — enable before production"}
        </p>
        {!user?.twoFactorEnabled && <TwoFactorSetup />}
      </section>

      <section className="border border-black/10 bg-white p-4">
        <h2 className="text-sm font-semibold">Database</h2>
        <p className="mt-2 text-sm text-black/55">
          Mode: <code className="font-mono text-xs">{process.env.DATABASE_MODE ?? "pglite"}</code>
          . Default local store is PGlite under <code className="font-mono text-xs">.data/pglite</code>
          . Switch to Postgres/Supabase later via DATABASE_URL.
        </p>
      </section>
    </div>
  );
}
