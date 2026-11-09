import type { Metadata } from "next";
import Image from "next/image";
import { about } from "../../../content/copy";
import { ButtonLink } from "@/components/ui/buttons";
import { Container, Eyebrow, GoldRule } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: about.seoTitle,
  description: about.seoDescription,
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Header with Corporate Headquarters Photo */}
      <section className="relative overflow-hidden border-b border-[var(--srn-line)] bg-[#0A1118] text-white">
        <Image
          src={media.aboutCorporate}
          alt="SRN Corporate Infrastructure & Head Office"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060B10]/95 via-[#0A1118]/85 to-transparent" />
        
        <Container className="relative py-16 md:py-24">
          <Eyebrow className="text-[#E2C37B]">Institutional Lineage & Merchant Trade</Eyebrow>
          <GoldRule className="mt-4" />
          <h1 className="font-display mt-4 max-w-3xl text-[clamp(2.4rem,5vw,3.75rem)] font-bold tracking-tight text-white">
            {about.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 leading-relaxed">{about.lead}</p>
        </Container>
      </section>

      {/* Story & Approach with Artisan Craftsmanship Photo */}
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <Eyebrow>Merchant Trade Protocol</Eyebrow>
            <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              {about.story.heading}
            </h2>
            <div className="mt-6 space-y-4 text-[var(--srn-ink-muted)] leading-relaxed">
              {about.story.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[var(--srn-line)]">
              <Image
                src={media.aboutArtisan}
                alt="Indian Artisan Heritage & Craftsmanship"
                fill
                sizes="(max-width:1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E2C37B]">Direct Craft Clusters</span>
                <p className="text-sm font-semibold mt-0.5">Empowering regional artisan cooperatives across India</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Diversified Business Group Foundation (With Heritage Boardroom Photo) */}
      <section className="bg-[var(--srn-canvas-muted)] border-y border-[var(--srn-line)]">
        <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-20 items-center">
          <div className="md:col-span-6">
            <Eyebrow>Diversified Parent Group</Eyebrow>
            <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              {about.group.heading}
            </h2>
            <p className="mt-4 text-[var(--srn-ink-muted)] leading-relaxed">{about.group.body}</p>
            
            <div className="mt-6 pt-6 border-t border-[var(--srn-line)]">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9E7D3B]">
                {about.group.clientsLabel}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {about.group.clients.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-[var(--srn-line-strong)] bg-[var(--srn-paper)] px-3.5 py-1.5 text-xs font-medium shadow-sm"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-[var(--srn-ink-muted)] leading-relaxed">{about.group.note}</p>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[var(--srn-line)]">
              <Image
                src={media.aboutHeritage}
                alt="SRN Group Corporate Governance and Multi-Sector Portfolio"
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E2C37B]">Institutional Scale</span>
                <p className="text-sm font-semibold mt-0.5">Engineering, Project Consulting, Construction & Modular Manufacturing</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Vision & Mission — Uniform Equal Height Cards with Spotlight Physics */}
      <Container className="grid gap-6 py-16 md:grid-cols-2 md:py-20 items-stretch">
        <SpotlightCard className="p-8">
          <div>
            <Eyebrow>Strategic Vision</Eyebrow>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight">{about.vision.heading}</h2>
            <p className="mt-4 text-[var(--srn-ink-muted)] leading-relaxed">{about.vision.body}</p>
          </div>
          <div className="mt-6 pt-4 border-t border-[var(--srn-line)] text-xs font-mono text-[#9E7D3B]">
            GLOBAL TRADE REACH
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-8">
          <div>
            <Eyebrow>Corporate Mission</Eyebrow>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight">{about.mission.heading}</h2>
            <p className="mt-4 text-[var(--srn-ink-muted)] leading-relaxed">{about.mission.body}</p>
          </div>
          <div className="mt-6 pt-4 border-t border-[var(--srn-line)] text-xs font-mono text-[#9E7D3B]">
            RESPONSIBLE CAPITAL & PURPOSE
          </div>
        </SpotlightCard>
      </Container>

      {/* Values Ledger */}
      <Container className="pb-20">
        <Eyebrow>Core Tenets</Eyebrow>
        <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold tracking-tight">How We Conduct Global Business</h2>
        
        <ul className="mt-8 divide-y divide-[var(--srn-line)] rounded-2xl border border-[var(--srn-line)] bg-[var(--srn-paper)] overflow-hidden shadow-sm">
          {about.values.map((v, i) => (
            <li key={v.title} className="grid gap-3 p-6 md:grid-cols-[4rem_12rem_1fr] items-center hover:bg-[#C5A059]/[0.03] transition-colors">
              <span className="font-mono text-sm font-semibold text-[#9E7D3B]">
                0{i + 1}
              </span>
              <span className="font-display text-lg font-bold">{v.title}</span>
              <span className="text-sm text-[var(--srn-ink-muted)] leading-relaxed">{v.body}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex items-center justify-between">
          <ButtonLink href={about.cta.href}>
            {about.cta.label}
          </ButtonLink>
          <span className="text-xs font-mono text-[var(--srn-ink-muted)] hidden sm:inline">
            SRN PRINTOTRADING PRIVATE LIMITED
          </span>
        </div>
      </Container>
    </div>
  );
}
