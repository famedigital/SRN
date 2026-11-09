import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { productCategories, productsPage } from "../../../content/copy";
import { AddToRfqButton } from "@/components/rfq/rfq-dock";
import { ButtonLink } from "@/components/ui/buttons";
import { Reveal, RevealItem, RevealStagger } from "@/components/ui/reveal";
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
      <section className="relative overflow-hidden border-b border-[var(--srn-line)] bg-[var(--srn-obsidian)] text-white">
        <Image
          src={media.heroLogistics}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(5,8,12,0.94)_8%,rgba(10,16,24,0.78)_52%,rgba(5,8,12,0.88)_100%)]" />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,165,106,0.18),transparent_45%)]"
          aria-hidden
        />

        <Container className="relative py-16 md:py-24">
          <Eyebrow className="text-[var(--srn-champagne)]">Commercial portfolio</Eyebrow>
          <GoldRule className="mt-4" />
          <h1 className="font-display mt-4 max-w-3xl text-[clamp(2.4rem,5vw,3.85rem)] font-bold tracking-tight text-[#FFFCF5]">
            {productsPage.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {productsPage.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {productCategories.map((cat) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="rounded-full border border-[var(--srn-champagne)]/30 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-[var(--srn-champagne-bright)] transition hover:border-[var(--srn-champagne)] hover:bg-[var(--srn-accent)]/15"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--srn-line)] bg-[var(--srn-paper)]">
        <Container className="grid gap-4 py-8 md:grid-cols-3">
          {productsPage.assurance.map((item) => (
            <div key={item.title} className="rounded-2xl border border-[var(--srn-line)] bg-[var(--srn-canvas)] px-5 py-4">
              <p className="font-display text-lg tracking-tight">{item.title}</p>
              <p className="mt-1.5 text-sm text-[var(--srn-ink-muted)]">{item.body}</p>
            </div>
          ))}
        </Container>
      </section>

      <Container className="py-14 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--srn-line)] pb-4">
          <div>
            <Eyebrow>Divisions</Eyebrow>
            <p className="mt-2 text-sm text-[var(--srn-ink-muted)]">
              Spec sheets, MOQ guidance, and RFQ add-to-basket on every line.
            </p>
          </div>
          <Folio n={`${productCategories.length} lines`} />
        </div>

        <RevealStagger className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((cat, i) => (
            <RevealItem key={cat.slug} className="flex h-full">
              <SpotlightCard
                id={cat.slug}
                className="group flex h-full w-full flex-col justify-between overflow-hidden border border-[var(--srn-line)] p-0 scroll-mt-28"
              >
                <div className="relative aspect-[16/10] flex-shrink-0 overflow-hidden">
                  <Image
                    src={categoryImage(cat.slug)}
                    alt={cat.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-[var(--srn-champagne)]/35 bg-black/55 px-3 py-1 font-mono text-[10px] text-[var(--srn-champagne-bright)] backdrop-blur-md">
                    0{i + 1} · HS {cat.hsCode}
                  </span>
                  <p className="absolute bottom-4 left-4 right-4 font-mono text-[11px] text-white/75">
                    {cat.short}
                  </p>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <Link
                      href={`/products/${cat.slug}`}
                      className="font-display block text-xl font-bold tracking-tight transition hover:text-[var(--srn-accent-deep)]"
                    >
                      {cat.name}
                    </Link>
                    <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-[var(--srn-ink-muted)]">
                      {cat.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[var(--srn-accent-deep)]">
                      <span>MOQ {cat.moq}</span>
                      <span className="text-[var(--srn-line-strong)]">·</span>
                      <span>{cat.container}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-2 border-t border-[var(--srn-line)] pt-4">
                    <AddToRfqButton slug={cat.slug} name={cat.name} />
                    <Link
                      href={`/products/${cat.slug}`}
                      className="rounded-full border border-[var(--srn-line-strong)] px-4 py-2 text-xs font-semibold transition hover:border-[var(--srn-accent)] hover:text-[var(--srn-accent-deep)]"
                    >
                      Specs →
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-16 rounded-3xl border border-[var(--srn-line)] bg-[var(--srn-obsidian)] px-6 py-10 text-white md:px-10">
          <Eyebrow className="text-[var(--srn-champagne)]">{productsPage.howHeading}</Eyebrow>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {productsPage.how.map((step, i) => (
              <li key={step} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <span className="font-mono text-xs text-[var(--srn-champagne)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-sm text-white/75">{step}</p>
              </li>
            ))}
          </ol>
          <ButtonLink href="/contact" variant="gold" className="mt-8">
            Open trade enquiry
          </ButtonLink>
        </Reveal>
      </Container>
    </div>
  );
}
