/** Content-matched photography for all public pages. */

export const media = {
  // Hero slides (Homepage)
  heroSpices: "/media/hero-spices.jpg",
  heroAgro: "/media/hero-agro.jpg",
  heroLogistics: "/media/hero-logistics.jpg",

  // Primary Trade Categories
  categories: {
    "spices-herbs": "/media/category-spices.jpg",
    agro: "/media/category-agro.jpg",
    "organic-farming": "/media/sourcing-farms.jpg",
    "packaged-foods": "/media/category-packaged-foods.jpg",
    perfumes: "/media/category-perfumes.jpg",
    garments: "/media/category-garments.jpg",
    handicrafts: "/media/category-handicrafts.jpg",
  } as Record<string, string>,

  // About Us
  aboutCorporate: "/media/about-corporate.jpg",
  aboutHeritage: "/media/about-heritage.jpg",
  aboutArtisan: "/media/about-artisan.jpg",

  // Sourcing & Supply Chain
  sourcingInspection: "/media/sourcing-inspection.jpg",
  sourcingWarehouse: "/media/sourcing-warehouse.jpg",
  sourcingFarms: "/media/sourcing-farms.jpg",

  // Social Responsibility (Art of Loving Foundation)
  responsibilityEducation: "/media/responsibility-education.jpg",
  responsibilityWomen: "/media/responsibility-women.jpg",
  responsibilityCare: "/media/responsibility-care.jpg",

  // Contact Desk & FAQ
  contactConcierge: "/media/contact-concierge.jpg",
  faqMaritime: "/media/faq-maritime.jpg",
} as const;

export function categoryImage(slug: string) {
  return media.categories[slug] ?? media.heroLogistics;
}
