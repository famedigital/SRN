import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { productCategories, productsPage } from "../../../content/copy";
import { AddToRfqButton } from "@/components/rfq/rfq-dock";
import { RevealItem, RevealStagger } from "@/components/ui/reveal";
import { Container, Eyebrow, Folio, GoldRule } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { categoryImage, media } from "@/lib/media";

export const metadata: Metadata = {
  title: productsPage.seoTitle,
  description: productsPage.seoDescription,
};

export default function ProductsPage() {
  return (
    <div>
      {/* Editorial Hero with Cargo Terminal Photography */}
      <section className="relative overflow-hidden border-b border-[var(--srn-line)] bg-[#0A1118] text-white">
        <Image
          src={media.heroLogistics}
          alt="International Export Logistics"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060B10]/95 via-[#0A1118]/80 to-transparent" />
        
        <Container className="relative py-16 md:py-24">
          <Eyebrow className="text-[#E2C37B]">Commercial Sourcing Portfolio</Eyebrow>
          <GoldRule className="mt-4" />
          <h1 className="font-display mt-4 max-w-3xl text-[clamp(2.4rem,5vw,3.75rem)] font-bold tracking-tight text-white">
            {productsPage.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-white/70 text-base md:text-lg leading-relaxed">
            {productsPage.intro}
          </p>
        </Container>
      </section>

      {/* Product Categories — Strictly Uniform Grid */}
      <Container className="py-14 md:py-20">
        <div className="mb-8 flex items-center justify-between pb-4 border-b border-[var(--srn-line)]">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--srn-ink-muted)]">
              All-India Sourced Commodities & Artefacts
            </span>
          </div>
          <Folio n={`${productCategories.length} Primary Divisions`} />
        </div>

        <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {productCategories.map((cat, i) => (
            <RevealItem key={cat.slug} className="h-full flex">
              <SpotlightCard className="p-0 overflow-hidden flex flex-col justify-between w-full h-full border border-[var(--srn-line)]">
                
                {/* Fixed Aspect Ratio Photo Container */}
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
                    0{i + 1} · HS {cat.hsCode}
                  </span>
                </div>

                {/* Flexible Card Content Anchored at Bottom */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <Link
                      href={`/products/${cat.slug}`}
                      className="font-display text-xl font-bold tracking-tight transition hover:text-[#C5A059] block"
                    >
                      {cat.name}
                    </Link>
                    <p className="mt-2.5 text-sm text-[var(--srn-ink-muted)] line-clamp-3 leading-relaxed">
                      {cat.summary}
                    </p>
                    <div className="mt-4 flex items-center gap-3 font-mono text-xs text-[#9E7D3B]">
                      <span>MOQ: {cat.moq}</span>
                      <span>•</span>
                      <span>{cat.container}</span>
                    </div>
                  </div>

                  {/* Buttons pinned to exact bottom alignment */}
                  <div className="mt-6 pt-4 border-t border-[var(--srn-line)] flex items-center justify-between gap-2">
                    <AddToRfqButton slug={cat.slug} name={cat.name} />
                    <Link
                      href={`/products/${cat.slug}`}
                      className="rounded-full border border-[var(--srn-line-strong)] px-4 py-2 text-xs font-semibold text-[var(--srn-ink)] transition hover:border-[#C5A059] hover:text-[#9E7D3B]"
                    >
                      View Specs →
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </div>
  );
}
