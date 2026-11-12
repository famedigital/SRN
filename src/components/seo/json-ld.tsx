import { brand, contactPlaceholders, leadership, presence } from "../../../content/copy";

export function CorporationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    name: brand.legalName,
    alternateName: brand.publicName,
    url: "https://srnglobal.in",
    logo: "https://srnglobal.in/brand/srn-logo-transparent.png",
    image: "https://srnglobal.in/brand/srn-logo-transparent.png",
    description:
      "SRN PRINTOTRADING PRIVATE LIMITED is a premier Indian merchant export and procurement house, supplying agricultural commodities, certified spices, organic farm produce, packaged foods, fine attars, garments, and artisan crafts under Incoterms 2020 with laboratory test and audit verification.",
    identifier: contactPlaceholders.cin,
    email: contactPlaceholders.email,
    telephone: contactPlaceholders.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Block-A-335, Lake Town",
      addressLocality: "Kolkata",
      postalCode: "700089",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "22.5726",
      longitude: "88.3639",
    },
    contactPoint: leadership.map((person) => ({
      "@type": "ContactPoint",
      contactType: person.title,
      name: person.name,
      email: person.email,
      telephone: person.phones[0],
      availableLanguage: ["English", "Hindi"],
      areaServed: [...presence],
    })),
    knowsAbout: [
      "Indian Spices and Botanical Herbs Export",
      "Agro Commodities and Basmati Rice Trading",
      "Organic Farming and Certified Produce Export",
      "APEDA RCMC Sourcing Certification",
      "MSME Registered Enterprise",
      "ISO 9001:2015 Certified Company",
      "Spices Board of India Regulatory Compliance",
      "Pre-Shipment Laboratory Test and Audit",
      "Maritime Shipping through JNPT Mumbai, Mundra and Cochin Ports",
      "Incoterms 2020 Contract Execution (FOB, CIF, CFR, DAP)",
      "Artisan Indian Handicrafts and Heritage Brassware",
    ],
    areaServed: presence.map((name) => ({
      "@type": "Country",
      name,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does SRN verify product grade and prevent quality divergence before dispatch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SRN operates a pre-shipment quality verification protocol. Independent accredited surveyors draw sealed composite samples at warehouse or port stuffing. Laboratory testing confirms moisture %, purity, mesh, and microbial counts. Containers are sealed with ISO 17712 bolt seals, and Certificates of Analysis (COA) are transmitted prior to negotiable document handover.",
        },
      },
      {
        "@type": "Question",
        name: "What Incoterms and sea freight routes does SRN support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We execute shipments under standard ICC Incoterms® 2020, predominantly FOB (Free On Board Indian ports such as JNPT/Nhava Sheva, Mundra, Cochin, or Chennai), CIF (Cost, Insurance & Freight to destination port), and CFR. Marine cargo insurance under Institute Cargo Clauses (A) covers all CIF shipments.",
        },
      },
      {
        "@type": "Question",
        name: "What are the standard container payloads for Indian spices and basmati rice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Standard container stowage configurations: For Basmati Rice and heavy agro commodities, a 20FT FCL carries 24 to 26 Metric Tons in 25kg/50kg PP bags. For whole spices (Cardamom, Pepper, Chillies), a 20FT FCL carries 14 to 18 Metric Tons depending on crop bulk density and carton/jute palletization.",
        },
      },
      {
        "@type": "Question",
        name: "How does SRN protect sea cargo against condensation and container sweat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To eliminate cargo sweat across tropical and temperate shipping corridors, SRN installs industrial high-absorption clay desiccant poles (2kg active capacity per pole), breathable multi-wall Kraft paper liners, and floor barrier foils. Vulnerable botanical lots can also be equipped with real-time temperature and humidity data loggers.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
