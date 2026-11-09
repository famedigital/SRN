import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/admin/logout-button";
import { getSessionUser } from "@/lib/auth/session";
import { seedDatabase } from "@/lib/db/seed";

/** Never prerender desk pages — they need live Postgres at request time. */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/audit", label: "Audit" },
  { href: "/admin/hermes", label: "Hermes" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminDeskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await seedDatabase();
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-svh bg-[#f3f4f6] text-[var(--srn-ink)]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="text-sm font-semibold tracking-wide">SRN Trade Desk</p>
            <p className="text-xs text-black/50">
              {user.fullName} · {user.role}
            </p>
          </div>
          <LogoutButton />
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap px-3 py-1.5 text-sm text-black/70 hover:bg-black/5 hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
    </div>
  );
}
