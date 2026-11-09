import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Outfit } from "next/font/google";
import { Toaster } from "sonner";
import { AppShell } from "@/components/layout/app-shell";
import { brand, home } from "../../content/copy";
import { CorporationJsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
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
    "Kolkata export house",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
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
        url: `${siteUrl}/brand/srn-logo-transparent.png`,
        width: 1254,
        height: 1254,
        alt: `${brand.publicName} emblem`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.publicName} — Indian Merchant Export & Sourcing House`,
    description: home.seoDescription,
    images: [`${siteUrl}/brand/srn-logo-transparent.png`],
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
    "geo.region": "IN-WB",
    "geo.placename": "Kolkata",
    "geo.position": "22.5726;88.3639",
    ICBM: "22.5726, 88.3639",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <CorporationJsonLd />
      </head>
      <body
        className={`${ibmPlexSans.variable} ${outfit.variable} ${ibmPlexMono.variable} min-h-svh font-sans antialiased`}
      >
        <AppShell>{children}</AppShell>
        <Toaster position="top-center" closeButton />
      </body>
    </html>
  );
}
