import { eq } from "drizzle-orm";
import { productCategories, brand, home, about } from "../../../content/copy";
import { getDb } from "./client";
import { ensureSchema } from "./migrate";
import { products, pages, settings } from "./schema";
import { bootstrapAdmin } from "@/lib/auth/session";

export async function seedDatabase() {
  await ensureSchema();
  await bootstrapAdmin();
  const db = await getDb();

  for (const [i, cat] of productCategories.entries()) {
    const existing = await db
      .select()
      .from(products)
      .where(eq(products.slug, cat.slug))
      .limit(1);
    if (existing.length) continue;
    await db.insert(products).values({
      slug: cat.slug,
      name: cat.name,
      category: cat.slug,
      hsCode: cat.hsCode,
      summary: cat.summary,
      specifications: cat.specs,
      packagingOptions: cat.packaging,
      moq: cat.moq,
      heroImageUrl: "/brand/srn-logo-transparent.png",
      galleryUrls: [],
      isPublished: true,
      sortOrder: i,
    });
  }

  const pageSeeds = [
    {
      slug: "home",
      title: home.hero.headline,
      body: home,
      seoTitle: home.seoTitle,
      seoDescription: home.seoDescription,
    },
    {
      slug: "about",
      title: about.heading,
      body: about,
      seoTitle: about.seoTitle,
      seoDescription: about.seoDescription,
    },
  ];

  for (const p of pageSeeds) {
    const existing = await db.select().from(pages).where(eq(pages.slug, p.slug)).limit(1);
    if (existing.length) continue;
    await db.insert(pages).values({
      slug: p.slug,
      title: p.title,
      body: p.body,
      seoTitle: p.seoTitle,
      seoDescription: p.seoDescription,
      isPublished: true,
    });
  }

  const [site] = await db.select().from(settings).where(eq(settings.key, "site")).limit(1);
  if (!site) {
    await db.insert(settings).values({
      key: "site",
      value: {
        brand,
        contact: {
          address: "[Business address — to be confirmed]",
          email: "[Business enquiry email — to be confirmed]",
          phone: "[Phone / WhatsApp — to be confirmed]",
        },
      },
    });
  }
}
