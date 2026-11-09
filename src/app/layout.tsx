import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono, Syne } from "next/font/google";
import { Toaster } from "sonner";
import { AppShell } from "@/components/layout/app-shell";
import { brand, home } from "../../content/copy";
import { CorporationJsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlex = IBM_Plex_Mono({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://srnglobal.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.publicName} Global — Indian Merchant Sourcing for Global Buyers`,
    template: `%s · ${brand.publicName} Global`,
  },
  description:
    "SRN PRINTOTRADING PRIVATE LIMITED is an Indian merchant export house supplying bulk spices, agricultural staples, basmati rice, packaged foods, fine attars, garments, and handicrafts under Incoterms 2020 with SGS/Intertek laboratory verification.",
  keywords: [
    "Indian spices exporter",
    "bulk agricultural commodities India",
    "1121 basmati rice exporter",
    "APEDA certified merchant exporter",
    "Spices Board of India exporter",
    "SGS inspected spices India",
    "Indian merchant trading company",
    "New Delhi export house",
    "FOB Mundra JNPT Nhava Sheva",
    "Incoterms 2020 commodity contracts",
    "traditional Indian perfumes attar wholesale",
    "Indian artisan brass handicrafts export",
  ],
  authors: [{ name: brand.legalName, url: siteUrl }],
  creator: brand.legalName,
  publisher: brand.legalName,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${brand.publicName} Global`,
    title: `${brand.publicName} — Indian Sourcing for Global Enterprise Buyers`,
    description: home.seoDescription,
    images: [
      {
        url: `${siteUrl}/brand/srn-logo.png`,
        width: 1200,
        height: 1200,
        alt: `${brand.publicName} Sovereign Gold Seal`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.publicName} — Indian Merchant Export & Sourcing House`,
    description: home.seoDescription,
    images: [`${siteUrl}/brand/srn-logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "New Delhi",
    "geo.position": "28.6139;77.2090",
    ICBM: "28.6139, 77.2090",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <CorporationJsonLd />
      </head>
      <body className={`${dmSans.variable} ${syne.variable} ${ibmPlex.variable} min-h-svh`}>
        <AppShell>{children}</AppShell>
        <Toaster position="top-center" closeButton />
      </body>
    </html>
  );
}
