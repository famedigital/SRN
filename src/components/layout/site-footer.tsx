import Link from "next/link";
import { brand, contactPlaceholders, nav, productCategories } from "../../../content/copy";
import { AnimatedLogo } from "@/components/brand/animated-logo";
import { Container } from "@/components/ui/section";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-4 overflow-hidden border-t border-white/10 bg-[var(--srn-indigo-deep)] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,color-mix(in_srgb,#c5a059_15%,transparent),transparent_50%)]"
        aria-hidden
      />
      <Container className="relative grid gap-10 py-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <AnimatedLogo size="md" animated={true} label="SRN" />
            <div>
              <p className="font-display text-2xl tracking-tight text-white">{brand.publicName}</p>
              <p className="text-sm text-[#E2C37B]/70">{brand.tagline}</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">
            Merchant export and import from India — specs, lots, and clear commercial follow-through.
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E2C37B]">
            Navigate
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/65 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/faq" className="text-white/65 transition hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E2C37B]">
            Products
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {productCategories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products/${c.slug}`}
                  className="text-white/65 transition hover:text-white"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E2C37B]">
            Contact
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/55">
            <li>{contactPlaceholders.email}</li>
            <li>{contactPlaceholders.phone}</li>
          </ul>
        </div>
      </Container>
      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-white/40 md:flex-row md:justify-between">
          <p>
            © {year} {brand.legalName}
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition hover:text-white/70">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white/70">
              Terms
            </Link>
            <Link href="/admin" className="transition hover:text-white/70">
              Admin
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
