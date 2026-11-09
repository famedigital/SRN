import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brand, productCategories } from "../../../../content/copy";
import { AddToRfqButton } from "@/components/rfq/rfq-dock";
import { ButtonLink } from "@/components/ui/buttons";
import { Container, Eyebrow, GoldRule } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { categoryImage, media } from "@/lib/media";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return productCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = productCategories.find((c) => c.slug === slug);
  if (!cat) return {};
  return { title: `${cat.name} — SRN`, description: cat.summary };
}

export default async function ProductCategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = productCategories.find((c) => c.slug === slug);
  if (!cat) notFound();
  const idx = productCategories.findIndex((c) => c.slug === slug);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${cat.name} — Bulk Sourcing & Export`,
    description: cat.summary,
    category: `HS Chapter ${cat.hsCode}`,
    image: `https://srnglobal.in${categoryImage(cat.slug)}`,
    brand: {
      "@type": "Brand",
      name: brand.publicName,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      eligibleRegion: "Global",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <section className="relative overflow-hidden border-b border-[var(--srn-line)]">
        <div className="absolute inset-0">
          <Image
            src={categoryImage(cat.slug)}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(6,9,13,0.88)_10%,rgba(6,9,13,0.55)_55%,rgba(6,9,13,0.75)_100%)]" />
        </div>
        <Container className="relative py-14 md:py-20">
          <Link href="/products" className="text-sm text-white/60 transition hover:text-white">
            ← All products
          </Link>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow className="text-[#E2C37B]">
                {String(idx + 1).padStart(2, "0")} · HS {cat.hsCode}
              </Eyebrow>
              <h1 className="font-display mt-2 text-[clamp(2rem,4vw,3.5rem)] tracking-tight text-white">
                {cat.name}
              </h1>
            </div>
            <AddToRfqButton
              slug={cat.slug}
              name={cat.name}
              className="border-white/30 bg-white/10 text-white hover:border-[#C5A059] hover:text-[#E2C37B]"
            />
          </div>
          <GoldRule className="mt-6" />
          <p className="mt-6 max-w-3xl text-lg text-white/70">{cat.summary}</p>
        </Container>
      </section>

      <Container className="py-12 md:py-14">
        <h2 className="font-display text-3xl tracking-tight">Technical particulars</h2>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            { label: "Grade", value: cat.grade },
            cat.moisture ? { label: "Moisture", value: cat.moisture } : null,
            { label: "Container", value: cat.container },
            { label: "MOQ", value: cat.moq },
          ]
            .filter(Boolean)
            .map((item) => (
              <div
                key={item!.label}
                className="surface-elevated rounded-2xl p-4"
              >
                <dt className="text-xs font-medium uppercase tracking-wider text-[var(--srn-ink-muted)]">
                  {item!.label}
                </dt>
                <dd className="mt-1 text-sm">{item!.value}</dd>
              </div>
            ))}
        </dl>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <SpotlightCard className="p-6">
            <h3 className="text-base font-semibold font-display">Export Packaging Options</h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--srn-ink-muted)]">
              {cat.packaging.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </SpotlightCard>
          <SpotlightCard className="p-6">
            <h3 className="text-base font-semibold font-display">Quality & Regulatory Specifications</h3>
            <table className="mt-3 w-full text-left text-sm">
              <tbody>
                {cat.specs.map((s) => (
                  <tr key={s.label} className="border-b border-[var(--srn-line)] last:border-0">
                    <th className="py-2.5 pr-3 font-mono text-[11px] font-normal text-[var(--srn-ink-muted)]">
                      {s.label}
                    </th>
                    <td className="py-2.5 font-medium">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SpotlightCard>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md border border-[var(--srn-line)]">
            <Image
              src={media.sourcingInspection}
              alt="Quality and Laboratory Inspection"
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <span className="text-[10px] font-mono text-[#E2C37B]">QUALITY VERIFICATION</span>
              <p className="text-xs font-semibold">Laboratory batch testing prior to container dispatch</p>
            </div>
          </div>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md border border-[var(--srn-line)]">
            <Image
              src={media.sourcingWarehouse}
              alt="Export Container Terminal"
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <span className="text-[10px] font-mono text-[#E2C37B]">LOGISTICS COORDINATION</span>
              <p className="text-xs font-semibold">FCL / LCL shipments from primary Indian seaports</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={`/contact?category=${cat.slug}`}>
            Enquire about {cat.name}
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondaryLight">
            Full RFQ form
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
