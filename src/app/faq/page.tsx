import type { Metadata } from "next";
import Image from "next/image";
import { faq } from "../../../content/copy";
import { Container, Eyebrow, GoldRule } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: faq.seoTitle,
  description: faq.seoDescription,
};

export default function FaqPage() {
  return (
    <div>
      <FaqJsonLd />
      {/* Editorial Hero with Maritime Cargo Vessel Photo */}
      <section className="relative overflow-hidden border-b border-[var(--srn-line)] bg-[#0A1118] text-white">
        <Image
          src={media.faqMaritime}
          alt="International Maritime Trade and Logistics"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060B10]/95 via-[#0A1118]/85 to-transparent" />
        
        <Container className="relative py-16 md:py-24">
          <Eyebrow className="text-[#E2C37B]">Trade Guidance & Protocol</Eyebrow>
          <GoldRule className="mt-4" />
          <h1 className="font-display mt-4 max-w-3xl text-[clamp(2.4rem,5vw,3.75rem)] font-bold tracking-tight text-white">
            {faq.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 leading-relaxed">
            Standard operating procedures, minimum order quantities, private labelling, sampling protocols, and destination compliance.
          </p>
        </Container>
      </section>

      {/* Main FAQ Ledger with Spotlight Physics */}
      <Container className="py-16 md:py-20 max-w-4xl">
        <div className="space-y-4">
          {faq.items.map((item, i) => (
            <SpotlightCard
              key={item.q}
              className="p-6 hover:border-[#C5A059]/40 transition-colors"
            >
              <dt className="flex items-baseline gap-4">
                <span className="font-mono text-sm font-semibold text-[#9E7D3B]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg font-bold tracking-tight text-[var(--srn-ink)]">
                  {item.q}
                </span>
              </dt>
              <dd className="mt-3 pl-8 text-sm text-[var(--srn-ink-muted)] leading-relaxed border-t border-[var(--srn-line)]/50 pt-3">
                {item.a}
              </dd>
            </SpotlightCard>
          ))}
        </div>
      </Container>
    </div>
  );
}
