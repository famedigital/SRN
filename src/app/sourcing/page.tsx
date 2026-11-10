import type { Metadata } from "next";
import Image from "next/image";
import { sourcing } from "../../../content/copy";
import { ButtonLink } from "@/components/ui/buttons";
import { Container, Eyebrow, GoldRule } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: sourcing.seoTitle,
  description: sourcing.seoDescription,
};

export default function SourcingPage() {
  return (
    <div>
      {/* Editorial Hero with Agricultural Plantation Photography */}
      <section className="relative overflow-hidden border-b border-[var(--srn-line)] bg-[#0A1118] text-white">
        <Image
          src={media.sourcingFarms}
          alt="Indian Spice & Agricultural Plantations"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060B10]/95 via-[#0A1118]/85 to-transparent" />
        
        <Container className="relative py-16 md:py-24">
          <Eyebrow className="text-[#E2C37B]">End-to-End Trade Procurement</Eyebrow>
          <GoldRule className="mt-4" />
          <h1 className="font-display mt-4 max-w-3xl text-[clamp(2.4rem,5vw,3.75rem)] font-bold tracking-tight text-white">
            {sourcing.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 leading-relaxed">{sourcing.intro}</p>
        </Container>
      </section>

      {/* 5-Step Sourcing Protocol & Dual Photo Showcases */}
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Steps List */}
          <div className="lg:col-span-7">
            <Eyebrow>5-Stage Execution Protocol</Eyebrow>
            <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold tracking-tight mb-8">
              From Origin Specification to Port Dispatch
            </h2>

            <ol className="space-y-4">
              {sourcing.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-[var(--srn-line)] bg-[var(--srn-paper)] p-6 shadow-sm flex gap-5 items-start hover:border-[#C5A059]/50 transition-colors"
                >
                  <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#C5A059]/15 text-[#9E7D3B] font-mono text-sm font-bold border border-[#C5A059]/30">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-display font-bold tracking-tight">{step.title}</h3>
                    <p className="mt-1.5 text-sm text-[var(--srn-ink-muted)] leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-2xl border border-[#C5A059]/30 bg-[#C5A059]/10 p-6">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9E7D3B]">
                Rigorous Quality Invariant
              </span>
              <p className="mt-2 text-sm text-[var(--srn-ink-soft)] leading-relaxed">
                {sourcing.quality}
              </p>
            </div>
          </div>

          {/* Sourcing Photos Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[var(--srn-line)]">
              <Image
                src={media.sourcingInspection}
                alt="Laboratory test and audit protocol"
                fill
                sizes="(max-width:1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E2C37B]">Stage 03: Inspection</span>
                <p className="text-sm font-semibold mt-0.5">Phytosanitary & chemical testing prior to container stuffing</p>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[var(--srn-line)]">
              <Image
                src={media.sourcingWarehouse}
                alt="Export Warehouse Terminal and Logistics Loading"
                fill
                sizes="(max-width:1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E2C37B]">Stage 05: Dispatch</span>
                <p className="text-sm font-semibold mt-0.5">FCL & LCL container loading at major Indian seaport terminals</p>
              </div>
            </div>
          </div>

        </div>
      </Container>

      {/* Enterprise Documentation & Shipping Standards Matrix */}
      <section className="bg-[var(--srn-canvas-muted)] border-y border-[var(--srn-line)] py-16 md:py-20">
        <Container>
          <div className="max-w-3xl mb-10">
            <Eyebrow>Export Compliance Standard</Eyebrow>
            <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              Standard Export Documentation Provided Per Consignment
            </h2>
            <p className="mt-3 text-sm md:text-base text-[var(--srn-ink-muted)]">
              Every international shipment coordinated by SRN is accompanied by certified export documentation compliant with customs, quarantine, and import clearance regulations worldwide.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                code: "B/L",
                name: "Clean on Board Ocean Bill of Lading",
                desc: "Issued by prime shipping lines (Maersk, MSC, CMA CGM) confirming title and port arrival.",
              },
              {
                code: "COA",
                name: "Certificate of Analysis (Lab Report)",
                desc: "Certified batch testing for moisture, purity, volatile oil %, and pesticide residues (EU MRL/FDA).",
              },
              {
                code: "COO",
                name: "Certificate of Origin",
                desc: "Issued by authorized Indian Chamber of Commerce verifying Indian origin for preferential tariffs.",
              },
              {
                code: "PHYTO",
                name: "Phytosanitary Certificate",
                desc: "Official certification from Ministry of Agriculture, Govt. of India confirming pest-free status.",
              },
              {
                code: "FUMI",
                name: "Export Fumigation Certificate",
                desc: "Authorized methyl bromide or aluminum phosphide treatment certificate for wood/jute cargo.",
              },
              {
                code: "INV/PK",
                name: "Commercial Invoice & Packing List",
                desc: "Itemized gross/net weights, container numbers, seal numbers, and Harmonized System (HS) classifications.",
              },
            ].map((doc) => (
              <SpotlightCard
                key={doc.code}
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[var(--srn-line)] mb-3">
                    <span className="font-mono text-xs font-bold text-[#9E7D3B]">{doc.code}</span>
                    <span className="text-[10px] font-mono text-[var(--srn-ink-muted)]">MANDATORY</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-[var(--srn-ink)]">{doc.name}</h3>
                  <p className="mt-2 text-xs text-[var(--srn-ink-muted)] leading-relaxed">{doc.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--srn-line)]/50 text-[10px] font-mono text-[#9E7D3B]">
                  CUSTOMS AUDITED
                </div>
              </SpotlightCard>
            ))}
          </div>
        </Container>
      </section>

      {/* For Supply Partners Banner */}
      <section className="bg-[var(--srn-indigo-deep)] text-white border-t border-white/10">
        <Container className="py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <Eyebrow className="text-[#E2C37B]">Supplier Network Onboarding</Eyebrow>
            <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold tracking-tight text-white">
              {sourcing.partner.heading}
            </h2>
            <p className="mt-4 text-sm text-white/70 leading-relaxed md:text-base">
              {sourcing.partner.body}
            </p>
          </div>
          <ButtonLink href={sourcing.partner.cta.href} variant="gold" className="flex-shrink-0">
            {sourcing.partner.cta.label}
          </ButtonLink>
        </Container>
      </section>
    </div>
  );
}
