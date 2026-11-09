import type { Metadata } from "next";
import Image from "next/image";
import { responsibility } from "../../../content/copy";
import { Container, Eyebrow, GoldRule } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: responsibility.seoTitle,
  description: responsibility.seoDescription,
};

const pillarImages = [
  { img: media.responsibilityCare, tag: "Child Welfare" },
  { img: media.responsibilityWomen, tag: "Self-Reliance" },
  { img: media.responsibilityEducation, tag: "Education Access" },
];

export default function ResponsibilityPage() {
  return (
    <div>
      {/* Editorial Hero with Humanitarian Care Photo */}
      <section className="relative overflow-hidden border-b border-[var(--srn-line)] bg-[#0A1118] text-white">
        <Image
          src={media.responsibilityCare}
          alt="Art of Loving Foundation Humanitarian Outreach"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060B10]/95 via-[#0A1118]/85 to-transparent" />
        
        <Container className="relative py-16 md:py-24">
          <Eyebrow className="text-[#E2C37B]">Humanitarian Commitment & Profit Sharing</Eyebrow>
          <GoldRule className="mt-4" />
          <h1 className="font-display mt-4 max-w-3xl text-[clamp(2.4rem,5vw,3.75rem)] font-bold tracking-tight text-white">
            {responsibility.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 leading-relaxed">
            {responsibility.body}
          </p>
        </Container>
      </section>

      {/* 3 Pillars — Uniform Cards Grid with Dedicated Photography */}
      <Container className="py-16 md:py-24">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <Eyebrow>Core Humanitarian Pillars</Eyebrow>
          <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold tracking-tight">
            Art of Loving Foundation
          </h2>
          <p className="mt-3 text-sm text-[var(--srn-ink-muted)]">
            A defined percentage of trading proceeds directly funds grassroots rehabilitation and empowerment initiatives.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 items-stretch">
          {responsibility.pillars.map((p, i) => (
            <SpotlightCard
              key={p.title}
              className="p-0 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Fixed aspect ratio photo */}
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={pillarImages[i]?.img ?? media.responsibilityCare}
                    alt={p.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-widest text-[#E2C37B]">
                    {pillarImages[i]?.tag}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#9E7D3B]">
                    <span>0{i + 1}</span>
                    <span>•</span>
                    <span className="uppercase">Program</span>
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-sm text-[var(--srn-ink-muted)] leading-relaxed">{p.body}</p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[var(--srn-line)]/50 mt-4 text-[11px] font-mono text-[#9E7D3B]">
                VERIFIED BENEFICIARY OUTREACH
              </div>
            </SpotlightCard>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-[var(--srn-line)] bg-[var(--srn-canvas-muted)] p-8 text-center max-w-3xl mx-auto">
          <p className="text-sm text-[var(--srn-ink-muted)] leading-relaxed">{responsibility.note}</p>
        </div>
      </Container>
    </div>
  );
}
