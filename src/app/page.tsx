import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Droplets,
  FileText,
  Scale,
} from "lucide-react";
import { about, brand, home, productCategories } from "../../content/copy";
import { AnimatedLogo } from "@/components/brand/animated-logo";
import { HeroStage } from "@/components/brand/hero-stage";
import { AddToRfqButton } from "@/components/rfq/rfq-dock";
import { ButtonLink } from "@/components/ui/buttons";
import { MagneticLink } from "@/components/ui/magnetic";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, RevealItem, RevealStagger } from "@/components/ui/reveal";
import { Container, Eyebrow, Folio, GoldRule } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { categoryImage, media } from "@/lib/media";

const heroSlides = [
  { src: media.heroSpices, alt: "Indian spices prepared for export" },
  { src: media.heroAgro, alt: "Agro commodities staged for shipment" },
  { src: media.heroLogistics, alt: "Export logistics and container vessels at dusk" },
] as const;

export default function HomePage() {
  return (
    <>
      <FaqJsonLd />

      {/* 1. Sovereign Enterprise Hero Stage */}
      <HeroStage slides={heroSlides}>
        <Container className="relative grid flex-1 items-center gap-12 py-16 md:grid-cols-12 md:py-24 lg:py-28">
          
          {/* Left Column: Authoritative Institutional Positioning */}
          <div className="md:col-span-7 lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#C5A059]/30 bg-black/50 px-4 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#E2C37B] font-semibold">
                  Merchant Export & Global Procurement · Republic of India
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="font-display mt-5 max-w-3xl text-[clamp(2.4rem,5.2vw,4.25rem)] text-shine font-bold leading-[1.08] tracking-tight">
                Institutional Sourcing. Direct Indian Origins.
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 max-w-2xl text-lg text-white/85 leading-relaxed md:text-xl font-normal">
                SRN PRINTOTRADING PRIVATE LIMITED coordinates multi-category commercial sourcing from India’s primary agricultural mandis, spice plantations, and artisan clusters. We replace middleman uncertainty with standardized grades, certified laboratory COA, and dependable sea freight execution.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticLink
                  href="/products"
                  className="btn-shine inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C5A059] via-[#E2C37B] to-[#C5A059] px-8 py-3.5 text-sm font-semibold text-stone-950 shadow-[0_12px_32px_-8px_rgba(197,160,89,0.55)] hover:shadow-[0_16px_40px_-6px_rgba(197,160,89,0.75)] hover:brightness-105 active:scale-[0.98]"
                >
                  <span>Explore Product Specifications</span>
                </MagneticLink>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-[#C5A059] hover:bg-white/15"
                >
                  Initiate Trade RFQ
                </Link>
              </div>
            </Reveal>

            {/* Quick Sourcing Credentials Bar */}
            <Reveal delay={0.24}>
              <div className="mt-12 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6 text-white/70">
                <div>
                  <span className="block text-2xl font-bold font-display text-white">6 Lines</span>
                  <span className="text-xs font-mono text-white/50 uppercase mt-0.5 block">Sourcing Divisions</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold font-display text-[#E2C37B]">Incoterms</span>
                  <span className="text-xs font-mono text-white/50 uppercase mt-0.5 block">2020: FOB · CIF · CFR</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold font-display text-white">SGS / COA</span>
                  <span className="text-xs font-mono text-white/50 uppercase mt-0.5 block">Pre-Stuffing Audits</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold font-display text-[#E2C37B]">100% IEC</span>
                  <span className="text-xs font-mono text-white/50 uppercase mt-0.5 block">Govt Reg. Exporter</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Executive Corporate Credentials Ledger (Spotlight Card Dark) */}
          <Reveal delay={0.16} className="md:col-span-5 lg:col-span-5">
            <SpotlightCard variant="dark" className="border-[#C5A059]/35 bg-[#060B10]/85 p-7 backdrop-blur-2xl">
              
              {/* Ledger Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <AnimatedLogo size="sm" priority label="SRN Emblem" />
                  <div>
                    <span className="font-display text-base font-bold text-white tracking-wider block">
                      {brand.publicName}
                    </span>
                    <span className="text-[10px] font-mono text-[#E2C37B] uppercase tracking-wider block">
                      {brand.legalName}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[9px] font-mono text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    DESK ACTIVE
                  </span>
                </div>
              </div>

              {/* Real Enterprise Trade Specifications */}
              <div className="py-5 space-y-3.5 text-xs">
                <div className="flex items-baseline justify-between border-b border-white/5 pb-2">
                  <span className="font-mono text-white/50 uppercase">Operational Role</span>
                  <span className="font-medium text-white">Merchant Exporter & Sourcing Desk</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-white/5 pb-2">
                  <span className="font-mono text-white/50 uppercase">Jurisdiction</span>
                  <span className="font-medium text-white">Kolkata, Republic of India</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-white/5 pb-2">
                  <span className="font-mono text-white/50 uppercase">Export Accreditations</span>
                  <span className="font-medium text-[#E2C37B]">IEC · APEDA · Spices Board · FSSAI</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-white/5 pb-2">
                  <span className="font-mono text-white/50 uppercase">Trading Terms</span>
                  <span className="font-medium text-white">Incoterms 2020: FOB · CIF · CFR</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-white/5 pb-2">
                  <span className="font-mono text-white/50 uppercase">Payment Instruments</span>
                  <span className="font-medium text-white">Irrevocable LC at Sight · Bank Escrow</span>
                </div>
                <div className="flex items-baseline justify-between pb-1">
                  <span className="font-mono text-white/50 uppercase">Pre-Shipment Audits</span>
                  <span className="font-medium text-white">SGS · Intertek · Bureau Veritas</span>
                </div>
              </div>

              {/* Verified Group Client Track Record */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#E2C37B] block mb-2 font-semibold">
                  Diversified Group Heritage Counterparties
                </span>
                <p className="text-[11px] text-white/60 leading-relaxed">
                  Taj Hotels · JW Marriott · Radisson · Le Méridien · State Cricket Associations · Tertiary Hospital Networks
                </p>
              </div>

            </SpotlightCard>
          </Reveal>
        </Container>

        {/* Corporate Group Prestige Marquee */}
        <div className="relative z-[2] border-t border-white/10 bg-black/45 py-4 backdrop-blur-xl">
          <Container>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E2C37B]">
                {about.group.clientsLabel}
              </p>
              <span className="text-[10px] font-mono text-white/40 uppercase hidden sm:inline">
                Diversified Indian Industrial Group · Institutional Reliability
              </span>
            </div>
            <Marquee items={about.group.clients} />
          </Container>
        </div>
      </HeroStage>

      {/* 2. Enterprise Trade Architecture & Risk Mitigation (Spotlight Cards) */}
      <section className="border-b border-[var(--srn-line)] bg-[var(--srn-canvas)] py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Enterprise Sourcing Architecture</Eyebrow>
              <h2 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight">
                How Global Importers Eliminate Procurement Risk
              </h2>
              <p className="mt-4 text-base md:text-lg text-[var(--srn-ink-muted)] leading-relaxed">
                Direct trade with hundreds of fragmented Indian smallholders carries severe risks of contamination, moisture failure, and port detention. SRN functions as an institutional merchant counterpart, enforcing standardized export contracts, certified batch testing, and consolidated container shipping.
              </p>
            </div>
          </Reveal>

          {/* 4 Pillars of Value Grid with Enterprise Spotlight Physics */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            
            <SpotlightCard>
              <div>
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#C5A059]/15 text-[#9E7D3B] font-mono text-xs font-bold border border-[#C5A059]/30 mb-5">
                  01
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight">Multi-Category FCL Consolidation</h3>
                <p className="mt-3 text-xs md:text-sm text-[var(--srn-ink-muted)] leading-relaxed">
                  Consolidate whole spices, agricultural grains, and artisanal items into mixed 20ft or 40ft High-Cube containers under a single Bill of Lading, avoiding fragmented LCL overheads.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[var(--srn-line)] text-[11px] font-mono text-[#9E7D3B]">
                SINGLE BILL OF LADING
              </div>
            </SpotlightCard>

            <SpotlightCard>
              <div>
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#C5A059]/15 text-[#9E7D3B] font-mono text-xs font-bold border border-[#C5A059]/30 mb-5">
                  02
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight">Laboratory & SGS Batch Audits</h3>
                <p className="mt-3 text-xs md:text-sm text-[var(--srn-ink-muted)] leading-relaxed">
                  Every lot undergoes certified pre-shipment laboratory testing (COA) for moisture limits, volatile oils, pesticide residues (EU MRL & US FDA compliance), and phytosanitary clearance.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[var(--srn-line)] text-[11px] font-mono text-[#9E7D3B]">
                SGS / INTERTEK INSPECTION
              </div>
            </SpotlightCard>

            <SpotlightCard>
              <div>
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#C5A059]/15 text-[#9E7D3B] font-mono text-xs font-bold border border-[#C5A059]/30 mb-5">
                  03
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight">Export Packaging & Private Label</h3>
                <p className="mt-3 text-xs md:text-sm text-[var(--srn-ink-muted)] leading-relaxed">
                  Food-grade vacuum barrier foil, nitrogen flushing, corrugated master cartons, and custom private-label multilingual barcodes designed for direct supermarket shelf placement.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[var(--srn-line)] text-[11px] font-mono text-[#9E7D3B]">
                OEM PACKAGING FACILITY
              </div>
            </SpotlightCard>

            <SpotlightCard>
              <div>
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#C5A059]/15 text-[#9E7D3B] font-mono text-xs font-bold border border-[#C5A059]/30 mb-5">
                  04
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight">Solvent Trade Finance & Escrow</h3>
                <p className="mt-3 text-xs md:text-sm text-[var(--srn-ink-muted)] leading-relaxed">
                  Contractual certainty backed by a diversified parent group. Trade structured via Irrevocable Letters of Credit (LC at Sight), Bank Escrow, and standard Incoterms 2020 (FOB, CIF, CFR).
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[var(--srn-line)] text-[11px] font-mono text-[#9E7D3B]">
                IRREVOCABLE LC / ESCROW
              </div>
            </SpotlightCard>

          </div>
        </Container>
      </section>

      {/* 3. The Realities of Indian Merchant Trade: Competitor Failures vs SRN Resolution */}
      <section className="bg-[var(--srn-paper)] border-b border-[var(--srn-line)] py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-3xl">
                <Eyebrow>B2B Procurement Realities</Eyebrow>
                <h2 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight">
                  Why 42% of Indian Sourcing Contracts Break Down — And How SRN Prevents It
                </h2>
                <p className="mt-4 text-base md:text-lg text-[var(--srn-ink-muted)] leading-relaxed">
                  Global importers frequently get burned by uncapitalized brokers who promise rock-bottom prices but fail on moisture control, pesticide residues, and forward contract delivery. Here is how SRN’s institutional operating framework eliminates those catastrophic risks.
                </p>
              </div>
              <Folio n="Industry Risk Matrix" />
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
            
            {/* Risk Card 1 */}
            <SpotlightCard className="bg-[#FFFDF9] border-red-200/60 hover:border-[#C5A059]/60">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-[10px] font-mono font-bold uppercase">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Bait & Switch Risk
                  </span>
                  <span className="text-xs font-mono text-[var(--srn-ink-muted)]">01</span>
                </div>
                
                <h3 className="font-display text-lg font-bold text-[var(--srn-ink)]">
                  Sample-to-Shipment Quality Divergence
                </h3>
                
                <div className="mt-3 rounded-lg bg-red-50/70 p-3 border border-red-100 text-xs text-red-900/80 leading-relaxed">
                  <span className="font-bold block text-red-950 mb-0.5">Competitor Reality:</span>
                  Brokers dispatch pristine hand-sorted courier samples. When the 20ft container is stuffed at port, lower-density or high-dust crop is substituted.
                </div>

                <div className="mt-3 rounded-lg bg-emerald-50/70 p-3 border border-emerald-100 text-xs text-emerald-950/80 leading-relaxed">
                  <span className="font-bold block text-emerald-950 mb-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                    SRN Solution:
                  </span>
                  Dual-sealed composite sampling by SGS/Intertek at port stuffing. Container cannot depart without certified COA matching contract parameters.
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[var(--srn-line)] text-[10px] font-mono text-[#9E7D3B]">
                PROTECTION: DUAL-SEALED COA
              </div>
            </SpotlightCard>

            {/* Risk Card 2 */}
            <SpotlightCard className="bg-[#FFFDF9] border-red-200/60 hover:border-[#C5A059]/60">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-[10px] font-mono font-bold uppercase">
                    <Droplets className="w-3.5 h-3.5" />
                    Transit Spoilage
                  </span>
                  <span className="text-xs font-mono text-[var(--srn-ink-muted)]">02</span>
                </div>
                
                <h3 className="font-display text-lg font-bold text-[var(--srn-ink)]">
                  Cargo Sweat & Container Rain Destruction
                </h3>
                
                <div className="mt-3 rounded-lg bg-red-50/70 p-3 border border-red-100 text-xs text-red-900/80 leading-relaxed">
                  <span className="font-bold block text-red-950 mb-0.5">Competitor Reality:</span>
                  Spices and basmati shipped in unlined dry vans across the Indian Ocean to cold Atlantic ports. Condensation creates mould and aflatoxin rejection.
                </div>

                <div className="mt-3 rounded-lg bg-emerald-50/70 p-3 border border-emerald-100 text-xs text-emerald-950/80 leading-relaxed">
                  <span className="font-bold block text-emerald-950 mb-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                    SRN Solution:
                  </span>
                  2kg active industrial clay desiccant poles, breathable Kraft liners, barrier floor sheets, and optional live IoT humidity data loggers.
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[var(--srn-line)] text-[10px] font-mono text-[#9E7D3B]">
                PROTECTION: MARITIME CLIMATE ARMOR
              </div>
            </SpotlightCard>

            {/* Risk Card 3 */}
            <SpotlightCard className="bg-[#FFFDF9] border-red-200/60 hover:border-[#C5A059]/60">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-[10px] font-mono font-bold uppercase">
                    <Scale className="w-3.5 h-3.5" />
                    Contract Default
                  </span>
                  <span className="text-xs font-mono text-[var(--srn-ink-muted)]">03</span>
                </div>
                
                <h3 className="font-display text-lg font-bold text-[var(--srn-ink)]">
                  Forward Price Defaults on Mandi Spikes
                </h3>
                
                <div className="mt-3 rounded-lg bg-red-50/70 p-3 border border-red-100 text-xs text-red-900/80 leading-relaxed">
                  <span className="font-bold block text-red-950 mb-0.5">Competitor Reality:</span>
                  When domestic crop prices rally 20-30% between contract signing and harvest, unhedged traders disappear or demand retroactive price hikes.
                </div>

                <div className="mt-3 rounded-lg bg-emerald-50/70 p-3 border border-emerald-100 text-xs text-emerald-950/80 leading-relaxed">
                  <span className="font-bold block text-emerald-950 mb-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                    SRN Solution:
                  </span>
                  Institutional balance sheet backing through diversified parent group. Physical forward warehousing in mandis guarantees fixed-price execution.
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[var(--srn-line)] text-[10px] font-mono text-[#9E7D3B]">
                PROTECTION: BALANCE-SHEET SOLVENCY
              </div>
            </SpotlightCard>

            {/* Risk Card 4 */}
            <SpotlightCard className="bg-[#FFFDF9] border-red-200/60 hover:border-[#C5A059]/60">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-[10px] font-mono font-bold uppercase">
                    <FileText className="w-3.5 h-3.5" />
                    Port Demurrage
                  </span>
                  <span className="text-xs font-mono text-[var(--srn-ink-muted)]">04</span>
                </div>
                
                <h3 className="font-display text-lg font-bold text-[var(--srn-ink)]">
                  Customs Clerical Errors & Port Fines
                </h3>
                
                <div className="mt-3 rounded-lg bg-red-50/70 p-3 border border-red-100 text-xs text-red-900/80 leading-relaxed">
                  <span className="font-bold block text-red-950 mb-0.5">Competitor Reality:</span>
                  Mismatched HS codes or delayed Phyto certificates cause $200-$400/day container demurrage at Jebel Ali, Rotterdam, or Newark.
                </div>

                <div className="mt-3 rounded-lg bg-emerald-50/70 p-3 border border-emerald-100 text-xs text-emerald-950/80 leading-relaxed">
                  <span className="font-bold block text-emerald-950 mb-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                    SRN Solution:
                  </span>
                  Digital documentation pre-clearance: draft BL, COO, Phyto, and COA are verified with the buyer’s customs broker 72h before ship sails.
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[var(--srn-line)] text-[10px] font-mono text-[#9E7D3B]">
                PROTECTION: ZERO-DELAY DOCUMENTATION
              </div>
            </SpotlightCard>

          </div>
        </Container>
      </section>

      {/* 4. The 4-Stage Product Verification & Chain-of-Custody Framework */}
      <section className="bg-[var(--srn-canvas)] border-b border-[var(--srn-line)] py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-3xl">
                <Eyebrow>Verification & Custody Architecture</Eyebrow>
                <h2 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight">
                  The 4-Stage Product Verification Protocol
                </h2>
                <p className="mt-4 text-base md:text-lg text-[var(--srn-ink-muted)] leading-relaxed">
                  Every consignment follows an unbending chain of custody. Inspection reports and laboratory assays are completed before final freight documents and bills of lading transfer.
                </p>
              </div>
              <Folio n="Chain of Custody" />
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            
            <SpotlightCard>
              <div>
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#C5A059]/15 text-[#9E7D3B] font-mono text-xs font-bold border border-[#C5A059]/30 mb-5">
                  STAGE 01
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight">APMC Mandi Lot Sampling</h3>
                <p className="mt-3 text-xs md:text-sm text-[var(--srn-ink-muted)] leading-relaxed">
                  Representative sampling drawn directly from primary harvest belts: Bodinayakanur (Cardamom), Guntur (Chilli), Unjha (Cumin), and Karnal (Basmati).
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[var(--srn-line)] text-[11px] font-mono text-[#9E7D3B]">
                MANDI CLUSTER AUDIT
              </div>
            </SpotlightCard>

            <SpotlightCard>
              <div>
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#C5A059]/15 text-[#9E7D3B] font-mono text-xs font-bold border border-[#C5A059]/30 mb-5">
                  STAGE 02
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight">Laboratory & Assay Calibration</h3>
                <p className="mt-3 text-xs md:text-sm text-[var(--srn-ink-muted)] leading-relaxed">
                  ISO 17025 accredited laboratory assays: moisture limits, volatile oil %, ASTA color units, Curcumin %, microbial counts, and GC-MS pesticide screening.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[var(--srn-line)] text-[11px] font-mono text-[#9E7D3B]">
                CERTIFIED LAB COA
              </div>
            </SpotlightCard>

            <SpotlightCard>
              <div>
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#C5A059]/15 text-[#9E7D3B] font-mono text-xs font-bold border border-[#C5A059]/30 mb-5">
                  STAGE 03
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight">Cargo Armor & Container Check</h3>
                <p className="mt-3 text-xs md:text-sm text-[var(--srn-ink-muted)] leading-relaxed">
                  Container physical inspection: light-tightness, zero odor, floor dryness, industrial clay desiccant poles installed, and shrink-wrapped palletization.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[var(--srn-line)] text-[11px] font-mono text-[#9E7D3B]">
                MARITIME ARMOR PROTOCOL
              </div>
            </SpotlightCard>

            <SpotlightCard>
              <div>
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#C5A059]/15 text-[#9E7D3B] font-mono text-xs font-bold border border-[#C5A059]/30 mb-5">
                  STAGE 04
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight">ISO 17712 Bolt Seal & Release</h3>
                <p className="mt-3 text-xs md:text-sm text-[var(--srn-ink-muted)] leading-relaxed">
                  Laser-engraved high-security bolt seal affixed at stuffing. Seal number logged on Bill of Lading, Phyto cert, and transmitted to buyer before vessel sail.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[var(--srn-line)] text-[11px] font-mono text-[#9E7D3B]">
                BOLT SEAL & LC RELEASE
              </div>
            </SpotlightCard>

          </div>
        </Container>
      </section>

      {/* 5. Real Crop Harvest Calendar & Specifications Guide */}
      <section className="bg-[var(--srn-paper)] border-b border-[var(--srn-line)] py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>Procurement Timing & Specifications</Eyebrow>
                <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold tracking-tight">
                  Indian Harvest Windows & Container Stowage Specifications
                </h2>
                <p className="mt-3 max-w-2xl text-[var(--srn-ink-muted)]">
                  Availability and pricing in Indian commodities correlate directly with regional crop seasons. We advise international buyers on optimal purchasing windows to lock in peak quality and freight efficiency.
                </p>
              </div>
              <Folio n="Real-World Procurement Data" />
            </div>
          </Reveal>

          {/* Real Commercial Specifications Table */}
          <div className="mt-10 overflow-x-auto rounded-2xl border border-[var(--srn-line)] bg-[var(--srn-canvas)] shadow-sm">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--srn-line)] bg-[var(--srn-canvas-muted)] text-[11px] font-mono text-[#9E7D3B] uppercase">
                  <th className="py-4 px-5">Commodity Line</th>
                  <th className="py-4 px-5">Primary Origins</th>
                  <th className="py-4 px-5">Peak Harvest Window</th>
                  <th className="py-4 px-5">Standard Packaging</th>
                  <th className="py-4 px-5">20ft FCL Payload</th>
                  <th className="py-4 px-5">Key Quality Benchmarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--srn-line)] text-[var(--srn-ink-soft)] font-medium">
                <tr className="hover:bg-white transition-colors">
                  <td className="py-4 px-5 font-bold text-[var(--srn-ink)]">Tellicherry & Malabar Black Pepper</td>
                  <td className="py-4 px-5">Kerala (Idukki, Wayanad)</td>
                  <td className="py-4 px-5 font-mono text-emerald-700">Dec — Feb</td>
                  <td className="py-4 px-5">25kg / 50kg Jute or Paper bags</td>
                  <td className="py-4 px-5 font-mono">14.0 — 15.0 MT</td>
                  <td className="py-4 px-5 text-xs text-[var(--srn-ink-muted)]">Piperine &gt; 4.0%, Moisture &lt; 11%</td>
                </tr>
                <tr className="hover:bg-white transition-colors">
                  <td className="py-4 px-5 font-bold text-[var(--srn-ink)]">Alleppey Finger Turmeric</td>
                  <td className="py-4 px-5">Andhra Pradesh, Tamil Nadu</td>
                  <td className="py-4 px-5 font-mono text-emerald-700">Jan — Apr</td>
                  <td className="py-4 px-5">50kg Double Jute bags</td>
                  <td className="py-4 px-5 font-mono">17.0 — 18.0 MT</td>
                  <td className="py-4 px-5 text-xs text-[var(--srn-ink-muted)]">Curcumin 3.0% — 5.0%, Moisture &lt; 10%</td>
                </tr>
                <tr className="hover:bg-white transition-colors">
                  <td className="py-4 px-5 font-bold text-[var(--srn-ink)]">Green Cardamom (8mm Bold)</td>
                  <td className="py-4 px-5">Western Ghats (Kerala)</td>
                  <td className="py-4 px-5 font-mono text-emerald-700">Aug — Jan</td>
                  <td className="py-4 px-5">5kg / 10kg Vacuum barrier cartons</td>
                  <td className="py-4 px-5 font-mono">8.0 — 10.0 MT</td>
                  <td className="py-4 px-5 text-xs text-[var(--srn-ink-muted)]">Volatile Oil &gt; 6.5%, Grade A Bold</td>
                </tr>
                <tr className="hover:bg-white transition-colors">
                  <td className="py-4 px-5 font-bold text-[var(--srn-ink)]">Cumin Seeds (Jeera Machine Clean)</td>
                  <td className="py-4 px-5">Gujarat (Unjha), Rajasthan</td>
                  <td className="py-4 px-5 font-mono text-emerald-700">Feb — May</td>
                  <td className="py-4 px-5">25kg / 50kg PP / Paper bags</td>
                  <td className="py-4 px-5 font-mono">13.0 — 14.5 MT</td>
                  <td className="py-4 px-5 text-xs text-[var(--srn-ink-muted)]">Purity 99.0% — 99.5%, Moisture &lt; 9%</td>
                </tr>
                <tr className="hover:bg-white transition-colors">
                  <td className="py-4 px-5 font-bold text-[var(--srn-ink)]">Traditional & 1121 Basmati Rice</td>
                  <td className="py-4 px-5">Punjab, Haryana</td>
                  <td className="py-4 px-5 font-mono text-emerald-700">Oct — Dec</td>
                  <td className="py-4 px-5">5kg / 10kg / 25kg Non-woven / BOPP</td>
                  <td className="py-4 px-5 font-mono">24.0 — 25.0 MT</td>
                  <td className="py-4 px-5 text-xs text-[var(--srn-ink-muted)]">Avg Length 8.35mm, Broken &lt; 1%</td>
                </tr>
                <tr className="hover:bg-white transition-colors">
                  <td className="py-4 px-5 font-bold text-[var(--srn-ink)]">Handcrafted Brassware & Artefacts</td>
                  <td className="py-4 px-5">Moradabad, Jaipur</td>
                  <td className="py-4 px-5 font-mono text-stone-700">Year-round</td>
                  <td className="py-4 px-5">Export master carton with EPE foam</td>
                  <td className="py-4 px-5 font-mono">28 — 32 CBM (LCL/FCL)</td>
                  <td className="py-4 px-5 text-xs text-[var(--srn-ink-muted)]">Virgin brass, lacquered anti-tarnish</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* 6. Product Portfolio — Uniform Cards with Rigid Aspect Ratios & Hover Physics */}
      <section className="bg-[var(--srn-paper)] border-b border-[var(--srn-line)]">
        <Container className="py-20 md:py-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>Product Catalogue</Eyebrow>
                <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl font-bold">
                  {home.portfolioHeading}
                </h2>
                <p className="mt-3 max-w-xl text-[var(--srn-ink-muted)]">{home.portfolioSub}</p>
              </div>
              <Folio n="6 Primary Divisions" />
            </div>
          </Reveal>

          {/* Exact Equal Height Cards Grid with SpotlightCard */}
          <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {productCategories.map((cat, i) => (
              <RevealItem key={cat.slug} className="h-full flex">
                <SpotlightCard className="p-0 overflow-hidden flex flex-col justify-between w-full h-full border border-[var(--srn-line)]">
                  
                  {/* Fixed 16/10 aspect ratio image */}
                  <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
                    <Image
                      src={categoryImage(cat.slug)}
                      alt={cat.name}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 font-mono text-[10px] text-white/95 backdrop-blur-md border border-white/20">
                      {String(i + 1).padStart(2, "0")} · HS {cat.hsCode}
                    </span>
                  </div>

                  {/* Flexible card body anchored at bottom */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <Link
                        href={`/products/${cat.slug}`}
                        className="font-display text-xl tracking-tight font-bold transition hover:text-[#C5A059] block"
                      >
                        {cat.name}
                      </Link>
                      <p className="mt-2.5 text-sm text-[var(--srn-ink-muted)] line-clamp-2 leading-relaxed">
                        {cat.short}
                      </p>
                      <div className="mt-3 flex items-center gap-3 text-xs font-mono text-[#9E7D3B]">
                        <span>MOQ: {cat.moq}</span>
                        <span>•</span>
                        <span>{cat.container}</span>
                      </div>
                    </div>

                    {/* Action buttons pinned to bottom */}
                    <div className="mt-6 pt-4 border-t border-[var(--srn-line)] flex items-center justify-between gap-2">
                      <AddToRfqButton slug={cat.slug} name={cat.name} />
                      <Link
                        href={`/products/${cat.slug}`}
                        className="rounded-full border border-[var(--srn-line-strong)] px-4 py-2 text-xs font-semibold text-[var(--srn-ink)] transition hover:border-[#C5A059] hover:text-[#9E7D3B]"
                      >
                        Specs →
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealStagger>

          <Reveal delay={0.12}>
            <div className="mt-10 flex items-center justify-between pt-6 border-t border-[var(--srn-line)]">
              <ButtonLink href="/products" variant="secondaryLight">
                Browse Complete Technical Specifications →
              </ButtonLink>
              <span className="text-xs font-mono text-[var(--srn-ink-muted)] hidden sm:inline">
                Harmonized System Certified Lots
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 7. Indian Sourcing Corridors & Maritime Port Gateways */}
      <section className="bg-[var(--srn-canvas-muted)] border-b border-[var(--srn-line)] py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-6">
              <Reveal>
                <Eyebrow>Strategic Logistics Corridors</Eyebrow>
                <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl font-bold">
                  All-India Sourcing Belts to Seaport Gateways
                </h2>
                <p className="mt-4 text-[var(--srn-ink-muted)] leading-relaxed">
                  India’s agricultural and craft belts span thousands of kilometers. SRN operates structured procurement routes linking inland harvest hubs with primary container seaports.
                </p>
              </Reveal>

              <div className="mt-8 space-y-4">
                <SpotlightCard className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#9E7D3B]">WESTERN CORRIDOR</span>
                    <span className="text-[10px] font-mono text-[var(--srn-ink-muted)]">MUNDRA & KANDLA PORTS</span>
                  </div>
                  <h3 className="font-display text-lg font-bold mt-1">Gujarat & Rajasthan Commodities</h3>
                  <p className="mt-1 text-sm text-[var(--srn-ink-muted)]">Cumin seeds, coriander, sesame, non-basmati rice, and grains with automated bulk port loading.</p>
                </SpotlightCard>

                <SpotlightCard className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#9E7D3B]">SOUTHERN CORRIDOR</span>
                    <span className="text-[10px] font-mono text-[var(--srn-ink-muted)]">COCHIN & CHENNAI PORTS</span>
                  </div>
                  <h3 className="font-display text-lg font-bold mt-1">Malabar Spices & Textiles</h3>
                  <p className="mt-1 text-sm text-[var(--srn-ink-muted)]">Black pepper, green cardamom, ginger, turmeric, and institutional cotton apparel from Tamil Nadu & Kerala.</p>
                </SpotlightCard>

                <SpotlightCard className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#9E7D3B]">NORTHERN & EASTERN CORRIDORS</span>
                    <span className="text-[10px] font-mono text-[var(--srn-ink-muted)]">JNPT & KOLKATA ICD</span>
                  </div>
                  <h3 className="font-display text-lg font-bold mt-1">Basmati Rice, Foods & Brassware</h3>
                  <p className="mt-1 text-sm text-[var(--srn-ink-muted)]">1121 Basmati lots, packaged bakery foods, muri, Moradabad brassware, and handcrafted artefacts.</p>
                </SpotlightCard>
              </div>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={0.15}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[var(--srn-line)]">
                  <Image
                    src={media.sourcingFarms}
                    alt="Direct Sourcing from Indian spice farms and agricultural plantations"
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#E2C37B]">Traceable Farm Gate Clusters</span>
                    <p className="text-base font-semibold mt-1">Origin verification & cooperative procurement across India</p>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </Container>
      </section>

      {/* 8. Corporate Group Heritage & Solvency Section */}
      <section className="border-b border-[var(--srn-line)] bg-[var(--srn-paper)] py-20 md:py-28">
        <Container className="grid gap-12 md:grid-cols-12 items-center">
          <Reveal className="md:col-span-6">
            <Eyebrow>Corporate Solvency</Eyebrow>
            <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl font-bold">
              Diversified Indian Group Backing
            </h2>
            <GoldRule className="mt-6" />
            <p className="mt-6 text-lg text-[var(--srn-ink-muted)] leading-relaxed">
              SRN PRINTOTRADING PRIVATE LIMITED operates within a multi-sector Indian industrial group active across engineering consulting, civil construction, modular manufacturing, and institutional asset leasing.
            </p>
            <p className="mt-4 text-sm text-[var(--srn-ink-muted)] leading-relaxed">
              This institutional heritage provides SRN with balance-sheet solvency, audited financial transparency, and contractual integrity that distinguishes our export desk from unregulated trading middlemen.
            </p>
            <ButtonLink href="/about" variant="ghost" className="mt-6">
              Learn more about our group pedigree →
            </ButtonLink>
          </Reveal>
          
          <Reveal delay={0.15} className="md:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[var(--srn-line)]">
              <Image
                src={media.aboutCorporate}
                alt="SRN Corporate Infrastructure & Global Trade Desk"
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E2C37B]">Institutional Scale</span>
                <p className="text-sm font-semibold mt-0.5">Engineering, Project Consulting, Construction & Modular Manufacturing</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 9. Next Step Trade Banner */}
      <section className="relative overflow-hidden bg-[var(--srn-indigo-deep)] text-white">
        <Image
          src={media.heroLogistics}
          alt="International container dispatch"
          fill
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,11,16,0.94),rgba(6,11,16,0.78))]" />
        
        <Container className="relative z-[1] flex flex-col gap-8 py-20 md:flex-row md:items-center md:justify-between md:py-24">
          <Reveal className="max-w-xl">
            <Eyebrow className="text-[#E2C37B]">Direct Commercial Follow-Through</Eyebrow>
            <h2 className="font-display mt-3 text-4xl tracking-tight text-white md:text-5xl font-bold">
              {home.enquiryBanner.heading}
            </h2>
            <p className="mt-4 text-sm text-white/70 md:text-base leading-relaxed">
              {home.enquiryBanner.body}
            </p>
          </Reveal>
          
          <Reveal delay={0.12}>
            <MagneticLink
              href={home.enquiryBanner.cta.href}
              className="btn-shine inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C5A059] via-[#E2C37B] to-[#C5A059] px-9 py-4 text-sm font-semibold text-stone-950 shadow-[0_16px_40px_-14px_rgba(197,160,89,0.7)] hover:shadow-[0_20px_48px_-10px_rgba(197,160,89,0.85)] hover:brightness-105 active:scale-[0.98]"
            >
              <span>{home.enquiryBanner.cta.label}</span>
            </MagneticLink>
          </Reveal>
        </Container>
      </section>

      {/* 10. Social Commitment Banner */}
      <section className="bg-[var(--srn-paper)] border-t border-[var(--srn-line)]">
        <Container className="grid gap-10 py-20 md:grid-cols-12 md:py-24 items-center">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[var(--srn-line)]">
              <Image
                src={media.responsibilityCare}
                alt="Art of Loving Foundation humanitarian work"
                fill
                sizes="(max-width:768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-xs font-mono text-white/90">
                Art of Loving Foundation
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <Eyebrow>Social Purpose</Eyebrow>
            <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl font-bold">
              {home.purpose.heading}
            </h2>
            <p className="mt-6 text-lg text-[var(--srn-ink-muted)] leading-relaxed">
              {home.purpose.body}
            </p>
            <ButtonLink href={home.purpose.link.href} variant="ghost" className="mt-6">
              {home.purpose.link.label} →
            </ButtonLink>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
