import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Mail, MapPin, Phone, Clock3, ShieldCheck, ArrowUpRight } from "lucide-react";
import { contact, contactPlaceholders } from "../../../content/copy";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { Container, Eyebrow, GoldRule } from "@/components/ui/section";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: contact.seoTitle,
  description: contact.seoDescription,
};

export default function ContactPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--srn-line)] bg-[var(--srn-obsidian)] text-white">
        <Image
          src={media.contactConcierge}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-28"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(5,8,12,0.95)_10%,rgba(10,16,24,0.8)_55%,rgba(5,8,12,0.9)_100%)]" />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(201,165,106,0.2),transparent_48%)]"
          aria-hidden
        />

        <Container className="relative py-16 md:py-24">
          <Eyebrow className="text-[var(--srn-champagne)]">Kolkata trade desk</Eyebrow>
          <GoldRule className="mt-4" />
          <h1 className="font-display mt-4 max-w-3xl text-[clamp(2.4rem,5vw,3.85rem)] font-bold tracking-tight text-[#FFFCF5]">
            {contact.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/72">
            {contact.intro}
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {contact.steps.map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-[var(--srn-champagne)]/25 bg-white/5 px-4 py-4 backdrop-blur-md"
              >
                <p className="font-mono text-[11px] text-[var(--srn-champagne)]">{step.n}</p>
                <p className="mt-1 font-display text-lg tracking-tight">{step.title}</p>
                <p className="mt-1 text-sm text-white/60">{step.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="grid gap-10 py-14 md:grid-cols-12 md:py-20">
        <aside className="space-y-5 md:col-span-4">
          <div className="overflow-hidden rounded-3xl border border-[var(--srn-line)] bg-[var(--srn-paper)] shadow-[var(--srn-shadow)]">
            <div className="border-b border-[var(--srn-line)] bg-[linear-gradient(135deg,rgba(201,165,106,0.14),transparent_60%)] px-6 py-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--srn-accent-deep)]">
                Headquarters
              </p>
              <h2 className="font-display mt-1 text-xl font-bold tracking-tight">
                Kolkata, India
              </h2>
              <p className="mt-1 text-sm text-[var(--srn-ink-muted)]">
                SRN PRINTOTRADING PRIVATE LIMITED
              </p>
            </div>

            <ul className="divide-y divide-[var(--srn-line)] px-2 py-1">
              <ContactRow
                icon={MapPin}
                label="Address"
                value={contactPlaceholders.address}
                note={contactPlaceholders.addressNote}
              />
              <ContactRow
                icon={Mail}
                label="Email"
                value={contactPlaceholders.email}
                href={`mailto:${contactPlaceholders.email}`}
              />
              <ContactRow
                icon={Phone}
                label="Phone / WhatsApp"
                value={contactPlaceholders.phone}
                note="Prefer the RFQ form for first contact"
              />
              <ContactRow
                icon={Clock3}
                label="Hours"
                value={contactPlaceholders.hours}
                note={contactPlaceholders.hoursNote}
              />
            </ul>
          </div>

          <div className="rounded-3xl border border-[var(--srn-champagne)]/25 bg-[var(--srn-obsidian)] p-5 text-white">
            <div className="flex items-center gap-2 text-[var(--srn-champagne)]">
              <ShieldCheck className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-wider">Response</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{contact.responseNote}</p>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-[var(--srn-line)]">
            <Image
              src={media.heroLogistics}
              alt=""
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="font-mono text-[10px] text-[var(--srn-champagne)]">LOGISTICS</span>
              <p className="mt-0.5 text-xs font-semibold">
                Kolkata ICD · east-coast & pan-India gateways
              </p>
            </div>
          </div>
        </aside>

        <div className="md:col-span-8">
          <div className="overflow-hidden rounded-3xl border border-[var(--srn-line)] bg-[var(--srn-paper)] shadow-[var(--srn-shadow-lg)]">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--srn-line)] bg-[linear-gradient(135deg,rgba(201,165,106,0.12),transparent_55%)] px-6 py-6 md:px-8">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight">Trade RFQ</h2>
                <p className="mt-2 max-w-xl text-sm text-[var(--srn-ink-muted)]">
                  Categories, grade notes, volume, Incoterm, and destination — enough for a serious
                  first reply from the Kolkata desk.
                </p>
              </div>
              <Link
                href="mailto:trade@srnglobal.in"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--srn-line-strong)] px-3.5 py-2 text-xs font-semibold text-[var(--srn-ink-soft)] transition hover:border-[var(--srn-accent)] hover:text-[var(--srn-accent-deep)]"
              >
                Email desk
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="p-6 md:p-8">
              <Suspense
                fallback={<p className="text-sm text-[var(--srn-ink-muted)]">Loading form…</p>}
              >
                <EnquiryForm />
              </Suspense>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  note,
  href,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  note?: string;
  href?: string;
}) {
  const body = (
    <>
      <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--srn-accent-soft)] text-[var(--srn-accent-deep)]">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--srn-accent-deep)]">
          {label}
        </span>
        <span className="mt-0.5 block text-sm font-semibold text-[var(--srn-ink)]">{value}</span>
        {note ? (
          <span className="mt-0.5 block text-xs text-[var(--srn-ink-muted)]">{note}</span>
        ) : null}
      </span>
    </>
  );

  if (href) {
    return (
      <li>
        <a
          href={href}
          className="flex gap-3 rounded-2xl px-4 py-4 transition hover:bg-[var(--srn-accent-soft)]/60"
        >
          {body}
        </a>
      </li>
    );
  }

  return <li className="flex gap-3 px-4 py-4">{body}</li>;
}
