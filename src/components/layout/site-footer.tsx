import Link from "next/link";
import {
  brand,
  contactPlaceholders,
  leadership,
  nav,
  presence,
  productCategories,
} from "../../../content/copy";
import { AnimatedLogo } from "@/components/brand/animated-logo";
import { CertificationMarks } from "@/components/brand/certification-marks";
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
          <div className="flex items-center gap-4">
            <AnimatedLogo size="nav" animated={true} label="SRN" />
            <div>
              <p className="font-display text-2xl tracking-tight text-white md:text-3xl">{brand.publicName}</p>
              <p className="mt-1 text-sm font-medium tracking-[0.08em] text-[#E2C37B]">{brand.motto}</p>
              <p className="mt-1 text-xs text-white/45">{brand.tagline}</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">
            Merchant export and import from India — specs, lots, and clear commercial follow-through.
          </p>
          <div className="mt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E2C37B]">
              Our Presence
            </p>
            <p className="mt-2 text-sm text-white/80">
              {presence.join(" · ")}
            </p>
          </div>
          <div className="mt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E2C37B]">
              Certifications
            </p>
            <div className="mt-3">
              <CertificationMarks tone="dark" />
            </div>
          </div>
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
            Company
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/55">
            <li className="text-white/80">{brand.legalName}</li>
            <li>CIN {contactPlaceholders.cin}</li>
            <li>{contactPlaceholders.address}</li>
            <li>
              <a
                href={`mailto:${contactPlaceholders.email}`}
                className="transition hover:text-white"
              >
                {contactPlaceholders.email}
              </a>
            </li>
            <li className="pt-2 text-[11px] uppercase tracking-wider text-[#E2C37B]/80">
              Direct lines
            </li>
            {leadership.slice(0, 2).map((person) => (
              <li key={person.email}>
                <a href={`mailto:${person.email}`} className="transition hover:text-white">
                  {person.name}
                </a>
              </li>
            ))}
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
