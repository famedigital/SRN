import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { contact, contactPlaceholders } from "../../../content/copy";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { Container, Eyebrow, GoldRule } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: contact.seoTitle,
  description: contact.seoDescription,
};

export default function ContactPage() {
  return (
    <div>
      {/* Editorial Hero with Trade Concierge Desk Photo */}
      <section className="relative overflow-hidden border-b border-[var(--srn-line)] bg-[#0A1118] text-white">
        <Image
          src={media.contactConcierge}
          alt="SRN Global Trade Concierge Desk"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060B10]/95 via-[#0A1118]/85 to-transparent" />
        
        <Container className="relative py-16 md:py-24">
          <Eyebrow className="text-[#E2C37B]">Direct Commercial Communications</Eyebrow>
          <GoldRule className="mt-4" />
          <h1 className="font-display mt-4 max-w-3xl text-[clamp(2.4rem,5vw,3.75rem)] font-bold tracking-tight text-white">
            {contact.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 leading-relaxed">
            {contact.intro}
          </p>
        </Container>
      </section>

      {/* Main Grid: Info & Enquiry Form */}
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <aside className="md:col-span-4 space-y-8">
          <SpotlightCard className="p-7">
            <h2 className="font-display text-xl font-bold tracking-tight">Corporate Office</h2>
            <p className="mt-2 text-sm text-[var(--srn-ink-muted)]">
              SRN PRINTOTRADING PRIVATE LIMITED
            </p>
            
            <dl className="mt-6 space-y-5 border-t border-[var(--srn-line)] pt-5">
              {[
                ["Address", contactPlaceholders.address],
                ["Email", contactPlaceholders.email],
                ["Phone / WhatsApp", contactPlaceholders.phone],
                ["Operating Hours", contactPlaceholders.hours],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[11px] font-mono uppercase tracking-wider text-[#9E7D3B]">
                    {k}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-[var(--srn-ink-soft)]">{v}</dd>
                </div>
              ))}
            </dl>
          </SpotlightCard>

          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--srn-line)] shadow-sm">
            <Image
              src={media.heroLogistics}
              alt="Global Export Logistics"
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-mono text-[#E2C37B]">GLOBAL LOGISTICS NETWORK</span>
              <p className="text-xs font-semibold mt-0.5">Customs clearance & port dispatch coordination</p>
            </div>
          </div>
        </aside>

        <div className="md:col-span-8">
          <SpotlightCard className="p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight mb-2">Formal Trade RFQ Matrix</h2>
            <p className="text-sm text-[var(--srn-ink-muted)] mb-8">
              Specify product categories, lot grades, estimated volume, and destination port.
            </p>
            <Suspense fallback={<p className="text-sm text-[var(--srn-ink-muted)]">Loading enquiry engine…</p>}>
              <EnquiryForm />
            </Suspense>
          </SpotlightCard>
        </div>
      </Container>
    </div>
  );
}
