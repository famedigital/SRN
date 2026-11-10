/** Human-written site copy. Docx = facts; this file = voice. */

export const brand = {
  publicName: "SRN",
  legalName: "SRN PRINTOTRADING PRIVATE LIMITED",
  domain: "srnglobal.in",
  motto: "Serenity · Resilience · Nobility",
  tagline: "Indian sourcing. Global relationships.",
} as const;

export const contactPlaceholders = {
  city: "Kolkata",
  region: "West Bengal",
  country: "India",
  address: "Block-A-335, Lake Town, Kolkata 700089, India",
  addressNote: "Registered headquarters",
  email: "corporate@srnglobal.in",
  phone: "+91 7980 670004",
  hours: "Mon–Fri · 09:30–18:30 IST",
  hoursNote: "Enquiry queue monitored outside desk hours",
  cin: "U18115WB2026PTC288446",
} as const;

export const presence = [
  "India",
  "Bhutan",
  "United Kingdom",
  "United States of America",
] as const;

export const leadership = [
  {
    name: "Sony Bagchi",
    title: "Founder & Managing Director",
    titleAlt: "President & Chairperson, Art of Loving Foundation",
    email: "sony@srnglobal.in",
    phones: ["+91 7980 670004"],
  },
  {
    name: "Hirak Ghosh",
    title: "Director, Business Development and Global Client Relationship",
    email: "hirak@srnglobal.in",
    phones: ["+44 7448508194", "+91 91630 31821"],
  },
  {
    name: "SB Narayan Ray",
    title: "Director, Business Development, Alliances, Corporate Communications",
    email: "sbnray@srnglobal.in",
    phones: ["+91 9830204336"],
  },
  {
    name: "Nayan Ghosh",
    title: "Executive Director, Supply Chain, Sourcing & Logistics",
    email: "nayan@srnglobal.in",
    phones: ["+91 98307 94382"],
  },
] as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/sourcing", label: "Sourcing" },
  { href: "/responsibility", label: "Responsibility" },
  { href: "/contact", label: "Contact" },
] as const;

export const home = {
  seoTitle: "SRN — Indian sourcing for global buyers",
  seoDescription:
    "Merchant export and import from India: spices, agro, packaged foods, perfumes, garments, and handicrafts. Send a trade enquiry.",
  hero: {
    headline: "From India’s sources to your warehouse.",
    body: "We connect importers and distributors with spices, herbs, agro lots, organic farm produce, packaged foods, fragrances, garments, and artisan goods — with clear specs and straight commercial talk.",
    primaryCta: { href: "/products", label: "Explore products" },
    secondaryCta: { href: "/contact", label: "Send a trade enquiry" },
  },
  intro: {
    heading: "Indian sourcing. Global relationships.",
    body: "SRN PRINTOTRADING PRIVATE LIMITED is a merchant export and import company. We do not run a factory floor for every SKU. We source to your requirement, confirm grades and packaging, and coordinate dispatch.",
    link: { href: "/about", label: "Get to know SRN" },
  },
  whoFor: {
    heading: "Who this site is for",
    body: "If you buy for a distribution company, a retail chain, a food manufacturer, or a project that needs Indian materials in volume, you are in the right place. We work in written specs, not brochure promises.",
    audiences: [
      {
        title: "Importers & distributors",
        body: "Regular lots with agreed grades, packaging, and ship windows.",
      },
      {
        title: "Wholesalers & retailers",
        body: "Catalogue lines and private-label conversations where the packer can support them.",
      },
      {
        title: "Buying houses & institutions",
        body: "Structured RFQs across more than one category in a single thread.",
      },
      {
        title: "Supply partners in India",
        body: "Producers and aggregators looking for a trading counterpart who speaks plainly.",
      },
    ],
  },
  prepare: {
    heading: "What to send with your first enquiry",
    body: "A short, complete note saves a week of back-and-forth. You do not need a perfect tender document — you need the facts below.",
    items: [
      "Product name and form (whole / ground / SKU / material)",
      "Grade or quality reference, if you have one",
      "Quantity and preferred packing",
      "Destination country and port (or inland point)",
      "Preferred Incoterm (FOB, CIF, EXW, and so on)",
      "Rough timeline — month or quarter is enough at first",
    ],
  },
  portfolioHeading: "What we source",
  portfolioSub:
    "Seven lines. Specs and MOQ confirmed per enquiry — not a web shop.",
  regions: {
    heading: "Where the goods come from",
    body: "India is not one warehouse. Crop belts, coastal packers, and inland workshops each have their season and capacity. We match your requirement to the right pocket of supply — and we say when a belt is short.",
    notes: [
      {
        title: "Spices & herbs",
        body: "Southern and western belts for pepper, cardamom, chilli, turmeric, cumin — grade and season decide availability.",
      },
      {
        title: "Agro & staples",
        body: "Grain, pulse, and rice origins aligned to quarantine rules at destination.",
      },
      {
        title: "Foods, fragrance, garments",
        body: "Packers and units selected for the programme — private label only where the line can carry it.",
      },
      {
        title: "Handicrafts",
        body: "Artisan workshops and cooperatives. Lead times follow craft capacity, not factory overtime.",
      },
    ],
  },
  why: {
    heading: "How we work with buyers",
    points: [
      {
        title: "Requirements first",
        body: "Tell us grade, pack, volume, and destination. We come back with options that fit, not a catalogue dump.",
      },
      {
        title: "Supplier network across India",
        body: "Relationships in spice belts, agro markets, food packers, fragrance houses, garment units, and artisan workshops.",
      },
      {
        title: "Quality called early",
        body: "Specs, certificates, and inspection windows are agreed before money moves — not after a dispute.",
      },
      {
        title: "Long-term trade",
        body: "Repeat lots and steady partners beat one-off price hunting. We plan for the next season, not just the next invoice.",
      },
    ],
  },
  enquiryBanner: {
    heading: "Tell us what you need to source.",
    body: "One enquiry can cover several lines. We reply with commercial next steps.",
    cta: { href: "/contact", label: "Discuss your requirements" },
  },
  purpose: {
    heading: "Business with purpose",
    body: "A portion of profits supports the Art of Loving Foundation — orphan rehabilitation, women’s empowerment, and education.",
    link: { href: "/responsibility", label: "Our social commitment" },
  },
} as const;

export const about = {
  seoTitle: "About SRN — merchant export from India",
  seoDescription:
    "SRN PRINTOTRADING is a merchant export and import company within a diversified Indian business group.",
  heading: "Built on relationships. Driven by opportunity.",
  lead: "We buy and sell across borders: spices and herbs, agro products, organic farming, packaged foods, perfumes, garments, and Indian handicrafts. When a buyer needs something outside the usual list, we source it.",
  story: {
    heading: "How we think about trade",
    paragraphs: [
      "Trade is paperwork, timing, and trust. A lot that looks fine on a price list can fail on moisture, mesh, labelling, or a missed inspection window. We treat those details as part of the work — not as extras for later.",
      "SRN is a merchant house. That means we stand between buyers and suppliers with clear language: what is available, what is not, what a certificate can cover, and what a season will not allow.",
      "Buyers who stay with us usually share one habit — they write requirements early and expect a straight answer. We prefer that to polished marketing copy.",
    ],
  },
  group: {
    heading: "Part of a diversified Indian group",
    body: "SRN sits inside a broader business group with experience in engineering, consulting, construction, modular furniture, and asset-related services. That background shows up in how we handle contracts, timelines, and counterparties. Hospitality and institutional names below belong to the group’s wider track record.",
    clientsLabel: "Group clients and institutions served include",
    clients: [
      "Taj Hotels",
      "JW Marriott",
      "Radisson",
      "Le Méridien",
      "Regional cricket boards",
      "Large hospital chains",
      "Reputed institutions",
    ],
    note: "These names reflect the group’s track record across sectors — not a claim that SRN itself supplies every hospitality property listed.",
  },
  vision: {
    heading: "Vision",
    body: "To be a trusted trading partner for buyers who want Indian goods with clear sourcing and dependable follow-through.",
  },
  mission: {
    heading: "Mission",
    body: "Connect buyers and suppliers carefully. Keep sourcing practical. Trade responsibly. Put a share of profit into community work.",
  },
  values: [
    {
      title: "Integrity",
      body: "Say what the lot is. If a grade is not available, we say so.",
    },
    {
      title: "Quality awareness",
      body: "Moisture, mesh, GSM, shelf life — the details that matter on arrival.",
    },
    {
      title: "Partnership",
      body: "We prefer buyers and suppliers who stay for more than one shipment.",
    },
    {
      title: "Accountability",
      body: "Someone owns the enquiry from receipt to dispatch coordination.",
    },
    {
      title: "Social commitment",
      body: "Profit is not the only ledger. See the Art of Loving Foundation.",
    },
  ],
  cta: { href: "/contact", label: "Connect with our team" },
} as const;

export type ProductCategory = {
  slug: string;
  name: string;
  short: string;
  hsCode: string;
  summary: string;
  botanical?: string;
  grade: string;
  moisture?: string;
  packaging: string[];
  container: string;
  moq: string;
  specs: { label: string; value: string }[];
  enquiryHints: string[];
};

export const productsPage = {
  seoTitle: "Products — SRN sourcing portfolio",
  seoDescription:
    "Spices, agro, organic farming, packaged foods, perfumes, garments, and Indian handicrafts for wholesale and import buyers.",
  heading: "Seven sourcing divisions. One commercial desk.",
  intro:
    "Each line is specified to grade, pack, and lot — not a web shop. Add lines to your RFQ matrix, then send one consolidated trade enquiry with destination and Incoterm.",
  assurance: [
    { title: "Grade first", body: "Buyer grade / ASTA / mesh confirmed before commercial lock." },
    { title: "Docs ready", body: "COA, phyto, and inspection windows agreed in writing." },
    { title: "One RFQ thread", body: "Multiple categories in a single reference number." },
  ],
  howHeading: "How buyers usually proceed",
  how: [
    "Open the division that matches your requirement.",
    "Add one or more lines to the RFQ matrix.",
    "Submit destination, Incoterm, and volume on Contact.",
  ],
} as const;

export const productCategories: ProductCategory[] = [
  {
    slug: "spices-herbs",
    name: "Spices & Herbs",
    short: "Whole, ground, blends, and culinary herbs.",
    hsCode: "",
    summary:
      "Black pepper, green cardamom, turmeric fingers and powder, cumin, dry red chillies, ginger, and selected herbs. Grades matched to your market — not a single ‘export quality’ label for everything.",
    botanical: "Varies by commodity",
    grade: "As specified (ASTA / buyer grade)",
    moisture: "Per commodity standard / buyer limit",
    packaging: ["Jute bags", "Paper bags", "HDPE / laminated pouches", "Cartons"],
    container: "LCL or FCL",
    moq: "Confirmed per spice and grade",
    specs: [
      { label: "Forms", value: "Whole, ground, crushed, blends" },
      { label: "Origin", value: "India — belt depends on crop" },
      { label: "Docs", value: "COA, phyto, other certs on request" },
    ],
    enquiryHints: ["Spice name", "Grade / mesh", "Pack size", "Annual volume"],
  },
  {
    slug: "agro",
    name: "Agro Commodities",
    short: "Grains, pulses, oilseeds, basmati, staples.",
    hsCode: "",
    summary:
      "Agricultural lots sized to destination quarantine rules. We align variety, broken %, and packing with the import market before booking space.",
    grade: "Buyer / destination standard",
    moisture: "Contractual limit",
    packaging: ["PP bags", "Jute bags", "Bulk liner (where applicable)"],
    container: "Primarily FCL",
    moq: "Typically container-linked; confirm per crop",
    specs: [
      { label: "Examples", value: "Pulses, oilseeds, basmati rice, staples" },
      { label: "Inspection", value: "Nominated surveyor / agreed laboratory" },
    ],
    enquiryHints: ["Crop", "Variety", "Destination", "Preferred Incoterm"],
  },
  {
    slug: "organic-farming",
    name: "Organic Farming",
    short: "Certified organic produce and farm programmes.",
    hsCode: "",
    summary:
      "Organic farm programmes and produce lots with certification trail for export buyers — spices, staples, and selected horticulture where organic supply can be locked. Traceability and audit windows agreed before commercial commitment.",
    grade: "Organic / buyer organic standard",
    moisture: "Per commodity / buyer limit",
    packaging: ["Food-grade bags", "Cartons", "Buyer-specified retail packs"],
    container: "LCL or FCL",
    moq: "Confirmed per crop and certification",
    specs: [
      { label: "Focus", value: "Organic produce & farm programmes" },
      { label: "Assurance", value: "Certification, test & audit as contracted" },
      { label: "Docs", value: "Organic certs, COA, phyto on request" },
    ],
    enquiryHints: ["Crop", "Organic standard", "Volume", "Destination"],
  },
  {
    slug: "packaged-foods",
    name: "Packaged Foods",
    short: "Biscuits, cakes, puffed rice (moori / muri).",
    hsCode: "",
    summary:
      "Biscuits, tea cakes, and authentic puffed rice (moori/muri) for private label or bulk. Shelf life and labelling rules depend on the importing country — we flag that early.",
    grade: "Brand / private label / bulk",
    packaging: ["Retail cartons", "Master cartons", "Bulk food-grade packs"],
    container: "LCL or FCL",
    moq: "Per SKU — often carton-based",
    specs: [
      { label: "Lines", value: "Biscuits, cakes, moori/muri" },
      { label: "Options", value: "Private label where the packer allows" },
    ],
    enquiryHints: ["SKU type", "Pack format", "Label language", "Shelf-life need"],
  },
  {
    slug: "perfumes",
    name: "Perfumes & Fragrances",
    short: "Attars, oils, compounds for wholesale.",
    hsCode: "",
    summary:
      "Attars, essential oils, and fragrance compounds for distributors. Concentrations and pack sizes are stated plainly so customs and formulators know what they are receiving.",
    grade: "As specified (concentration / compound type)",
    packaging: ["Amber bottles", "Aluminium cans", "Drums"],
    container: "LCL common; FCL on volume",
    moq: "Per oil / compound",
    specs: [
      { label: "Forms", value: "Attar, EO, perfume compounds" },
      { label: "Use", value: "Wholesale / further formulation" },
    ],
    enquiryHints: ["Product type", "Concentration", "Pack size", "End use"],
  },
  {
    slug: "garments",
    name: "Garments & Apparel",
    short: "Wovens, knits, uniforms, home textiles.",
    hsCode: "",
    summary:
      "Woven and knitted garments, institutional uniforms, and home textiles. Fabric GSM, size scale, and colourways are locked before production commitments.",
    grade: "Buyer tech pack",
    packaging: ["Poly bags", "Cartons", "Assortment as agreed"],
    container: "LCL or FCL",
    moq: "Per style — confirm with unit",
    specs: [
      { label: "Inputs", value: "Tech pack, GSM, size run" },
      { label: "Options", value: "Institutional / retail programs" },
    ],
    enquiryHints: ["Style / use", "Fabric", "Sizes", "Target ship window"],
  },
  {
    slug: "handicrafts",
    name: "Handicrafts, Artefacts & Artworks",
    short: "Made by local artisans — brass, wood, textile, clay.",
    hsCode: "",
    summary:
      "Indian handicrafts, artefacts, and artworks from artisan workshops and cooperatives: brassware, carved wood, pottery, handwoven textiles, and decorative pieces. Lead times follow craft capacity, not factory overtime.",
    grade: "Artisan / workshop grade as sampled",
    packaging: ["Export cartons", "Crate for fragile pieces", "Custom wrap"],
    container: "LCL common; mixed loads welcome",
    moq: "Often piece- or set-based; sample first",
    specs: [
      { label: "Materials", value: "Brass, wood, clay, handloom textile" },
      { label: "Sourcing", value: "Local artisans and cooperatives" },
    ],
    enquiryHints: ["Material", "Style reference", "Qty", "Fragility / packing"],
  },
];

export const sourcing = {
  seoTitle: "Sourcing & supply chain — SRN",
  seoDescription:
    "How SRN works: requirement, options, commercial detail, order, dispatch.",
  heading: "Strong sourcing relationships are the foundation of our trade.",
  intro:
    "We treat each enquiry as a work order, not a marketing lead. The steps below are the usual path from first note to port.",
  steps: [
    {
      title: "Specification & sampling",
      body: "We lock what you need: grade, pack, docs, and destination rules. Samples where they matter.",
    },
    {
      title: "Commercial terms",
      body: "Price basis, Incoterm, payment method (including LC where used), and ship window — written plainly.",
    },
    {
      title: "Quality inspection",
      body: "Nominated surveyor or agreed laboratory test & audit when the contract calls for it.",
    },
    {
      title: "Customs & certificates",
      body: "Phyto, fumigation, and other papers lined up for the commodity and destination.",
    },
    {
      title: "B/L and dispatch",
      body: "Booking, stuffing, and bill of lading coordination through to the agreed gateway.",
    },
  ],
  quality:
    "Clear specification first. Certificates and inspection windows are agreed early — not as an afterthought when the container is already gated in.",
  partner: {
    heading: "For supply partners",
    body: "If you produce or aggregate exportable goods in India and want a trading counterpart, write to us with capacity, grades, and lead times.",
    cta: { href: "/contact?type=supply", label: "Become a supply partner" },
  },
} as const;

export const responsibility = {
  seoTitle: "Social responsibility — Art of Loving Foundation",
  seoDescription:
    "SRN supports the Art of Loving Foundation through a share of profits.",
  heading: "Art of Loving Foundation",
  body: "A portion of SRN’s profits goes to the Art of Loving Foundation. The Foundation works on orphan rehabilitation, women’s empowerment, and education.",
  pillars: [
    { title: "Orphan rehabilitation", body: "Care and support for children who need a stable path." },
    { title: "Women’s empowerment", body: "Programs that help women earn and stand independently." },
    { title: "Education", body: "Learning support where it changes a family’s odds." },
  ],
  note: "Foundation website link and photo permissions will be added when provided.",
} as const;

export const contact = {
  seoTitle: "Contact & trade enquiry — SRN",
  seoDescription:
    "Send a trade enquiry to SRN PRINTOTRADING. Specs, volume, Incoterms, and destination.",
  heading: "Open a trade conversation with the desk.",
  intro:
    "Buying, import, or supply-partner notes — one form. Pull product lines from your RFQ matrix, add grade and destination, and we reply with commercial next steps.",
  responseNote: "Typical first reply within 1–2 business days (IST), with clarifying questions if grade or docs are incomplete.",
  steps: [
    { n: "01", title: "You", body: "Company, destination, categories, and written specs." },
    { n: "02", title: "Desk", body: "Availability, grade options, and commercial path." },
    { n: "03", title: "Next", body: "Quote outline, sample terms, or inspection window." },
  ],
  success:
    "We have your enquiry. Someone on the trade desk will reply with terms and next steps. Keep your reference number for follow-up.",
  consent:
    "I agree that SRN may use this information to respond to my trade enquiry, in line with the privacy policy.",
} as const;

export const faq = {
  seoTitle: "FAQ — SRN trading",
  seoDescription: "MOQ, samples, private label, certifications, and quotation process.",
  heading: "Frequently asked questions",
  items: [
    {
      q: "What does SRN do?",
      a: "We are a merchant export and import company. We source Indian goods for overseas buyers and help with the commercial and logistics steps around those lots.",
    },
    {
      q: "Which product categories do you cover?",
      a: "Spices and herbs, agro commodities, organic farming, packaged foods, perfumes and fragrances, garments and apparel, and Indian handicrafts, artefacts, and artworks.",
    },
    {
      q: "Do you manufacture everything yourselves?",
      a: "No. We are merchants. We work with producers, packers, and artisan workshops. That is stated so expectations stay clear.",
    },
    {
      q: "What is your MOQ?",
      a: "It depends on the commodity and the supplier. We confirm MOQ on each enquiry rather than publishing a single number that would mislead.",
    },
    {
      q: "Can I get samples?",
      a: "Yes, where sampling is practical. Freight and sample cost terms are agreed case by case.",
    },
    {
      q: "Do you support private label?",
      a: "For some packaged foods and selected lines, yes — when the packer can support your artwork and compliance needs.",
    },
    {
      q: "Which countries do you ship to?",
      a: "We work with destinations case by case. Tell us the market; we will say what is feasible for that commodity.",
    },
    {
      q: "What certifications can you provide?",
      a: "Commodity-dependent: COA, phytosanitary, fumigation, and third-party inspection reports when contracted. We do not invent certificates we cannot obtain.",
    },
    {
      q: "How does quotation work?",
      a: "Send specs, volume, pack, Incoterm preference, and destination. We return options and a commercial outline. Firm offers follow once grades and ship windows are locked.",
    },
  ],
} as const;

export const legal = {
  privacy: {
    seoTitle: "Privacy policy — SRN",
    heading: "Privacy policy",
    body: "We collect trade enquiry details to respond to your request. We do not sell enquiry data. Retention and access practices will be published in full when contact details are finalized. Contact us to request correction or deletion of your enquiry record.",
  },
  terms: {
    seoTitle: "Website terms — SRN",
    heading: "Website terms",
    body: "Content on this site is for information and enquiry. It is not a binding offer to sell. Contracts are formed only through written commercial confirmation between the parties. Product availability and grades change with crop and capacity.",
  },
} as const;

export const incoterms = ["EXW", "FOB", "CFR", "CIF", "DDP"] as const;

export const originGateways = [
  "JNPT Mumbai",
  "Mundra",
  "Chennai",
  "Cochin",
  "Kolkata ICD",
  "Other / TBD",
] as const;

export const enquiryTypes = [
  "Buying",
  "Import",
  "Supply Partner",
  "Other",
] as const;

export const microcopy = {
  addToRfq: "Add to RFQ",
  addedToRfq: "Added",
  rfqDockTitle: "RFQ matrix",
  rfqEmpty: "No lines yet. Add products while you browse.",
  rfqSubmit: "Complete enquiry",
  remove: "Remove",
} as const;
