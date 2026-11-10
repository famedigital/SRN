"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Anchor,
  Building2,
  FileSpreadsheet,
  Mail,
  PhoneCall,
  ShieldCheck,
  X,
  FileCheck2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { brand, contactPlaceholders, nav, productCategories } from "../../../content/copy";
import { AnimatedLogo } from "@/components/brand/animated-logo";
import { categoryImage } from "@/lib/media";
import { useRfq } from "@/components/rfq/rfq-store";

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// 4 Global Trade Hubs Clock
function GlobalTradingHubs() {
  const [hubTimes, setHubTimes] = useState<{
    kolkata: string;
    dubai: string;
    rotterdam: string;
    singapore: string;
  } | null>(null);

  useEffect(() => {
    function calculateTimes() {
      const now = new Date();
      const getFormattedTime = (timeZone: string) =>
        new Intl.DateTimeFormat("en-GB", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now);

      setHubTimes({
        kolkata: getFormattedTime("Asia/Kolkata"),
        dubai: getFormattedTime("Asia/Dubai"),
        rotterdam: getFormattedTime("Europe/Amsterdam"),
        singapore: getFormattedTime("Asia/Singapore"),
      });
    }

    calculateTimes();
    const interval = setInterval(calculateTimes, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!hubTimes) return null;

  return (
    <div className="hidden xl:flex items-center gap-5 text-[11px] font-mono text-white/50">
      <div className="flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-[#E2C37B]" />
        <span className="text-[#E2C37B] font-semibold">KOLKATA HQ:</span>
        <span className="text-white">{hubTimes.kolkata} IST</span>
      </div>
      <span className="text-white/20">|</span>
      <div>
        <span className="text-white/60">DUBAI:</span>{" "}
        <span className="text-white">{hubTimes.dubai} GST</span>
      </div>
      <span className="text-white/20">|</span>
      <div>
        <span className="text-white/60">ROTTERDAM:</span>{" "}
        <span className="text-white">{hubTimes.rotterdam} CET</span>
      </div>
      <span className="text-white/20">|</span>
      <div>
        <span className="text-white/60">SINGAPORE:</span>{" "}
        <span className="text-white">{hubTimes.singapore} SGT</span>
      </div>
    </div>
  );
}

// Key Commodity Highlights per Division
const categoryHighlights: Record<string, { varieties: string; payload: string }> = {
  "spices-herbs": {
    varieties: "Alleppey Cardamom 8mm+, Guntur S4/S17 Chillies, Salem 5% Curcumin",
    payload: "20FT FCL = 14-18 MT",
  },
  agro: {
    varieties: "1121 XXL Basmati, Non-Basmati IR64, Sesame 99.9% Clean, Pulses",
    payload: "20FT FCL = 24-26 MT",
  },
  "packaged-foods": {
    varieties: "Moori / Puffed Rice, Artisanal Tea Biscuits, Export Retail Cartons",
    payload: "40FT HC = 3,000 Master Cartons",
  },
  perfumes: {
    varieties: "Kannauj Traditional Deg-Bhapka Attars, Pure Oud Compounds, Rose Oils",
    payload: "Aluminium Cans & Steel Drums (Air/Sea)",
  },
  garments: {
    varieties: "Institutional Uniforms, 100% Combed Cotton Apparel, Terry Towels",
    payload: "40FT HC = 45,000 Pcs Assorted",
  },
  handicrafts: {
    varieties: "Moradabad Cast Brassware, Saharanpur Carved Rosewood, Handloom Art",
    payload: "Export Wooden Pallets & Crates (LCL/FCL)",
  },
  "organic-farming": {
    varieties: "Certified organic spices, staples & farm programmes",
    payload: "LCL / FCL by crop & certification",
  },
};

export function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const { lines, setOpen: setRfqOpen } = useRfq();

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between overflow-y-auto bg-[radial-gradient(ellipse_at_top,rgba(201,165,106,0.12),transparent_42%),linear-gradient(165deg,#05080c_0%,#0a1018_48%,#06090e_100%)] text-[#FFFCF5] backdrop-blur-3xl selection:bg-[var(--srn-champagne)] selection:text-black"
          role="dialog"
          aria-modal="true"
          aria-label="SRN Global Merchant Architectural Directory"
        >
          {/* Top Bar with Brand, Hub Telemetry & Close Action */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--srn-champagne)]/20 bg-[color-mix(in_srgb,var(--srn-obsidian)_88%,transparent)] px-6 py-4 backdrop-blur-2xl md:px-12">
            
            {/* Brand Emblem & Legal Title */}
            <Link
              href="/"
              onClick={onClose}
              className="group flex items-center gap-3.5 transition-opacity hover:opacity-95"
            >
              <AnimatedLogo size="md" priority label="SRN Emblem" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display block text-xl font-bold tracking-wider text-white">
                    {brand.publicName}
                  </span>
                  <span className="rounded-full border border-[#C5A059]/40 bg-[#C5A059]/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#E2C37B]">
                    Merchant House
                  </span>
                </div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">
                  {brand.tagline}
                </span>
              </div>
            </Link>

            {/* Middle: Live Multi-Hub Telemetry */}
            <GlobalTradingHubs />

            {/* Right: RFQ Badge + Close Action */}
            <div className="flex items-center gap-3">
              {lines.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setRfqOpen(true);
                  }}
                  className="hidden sm:flex items-center gap-2 rounded-full border border-[#C5A059] bg-[#C5A059]/20 px-4 py-2 text-xs font-mono text-[#F4E2B2] shadow-[0_0_15px_rgba(197,160,89,0.25)]"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#E2C37B]" />
                  <span>RFQ Basket ({lines.length})</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-mono text-white transition hover:border-[#C5A059] hover:bg-white/10 active:scale-95"
                aria-label="Close directory"
              >
                <span>CLOSE</span>
                <span className="rounded bg-white/10 px-1 py-0.2 text-[9px] text-white/60 hidden sm:inline">
                  ESC
                </span>
                <X className="w-4 h-4 text-[#E2C37B]" />
              </button>
            </div>
          </div>

          {/* Main Content: 12-Column Architectural Directory */}
          <div className="mx-auto w-full max-w-7xl flex-1 px-6 py-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Column 1 (3 Cols): Strategic Navigation & Accreditations */}
            <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
              <div>
                <span className="mb-3 block font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--srn-champagne)]">
                  Directory
                </span>

                <nav className="flex flex-col space-y-1" aria-label="Mega menu directory">
                  {nav.map((item, idx) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between border-b border-white/8 py-2.5 font-display text-xl font-semibold tracking-tight text-[var(--srn-nav-muted)] transition-all hover:text-[#FFFCF5]"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-2">
                        {item.label}
                      </span>
                      <span className="font-mono text-xs text-[var(--srn-champagne)]/45 group-hover:text-[var(--srn-champagne)]">
                        0{idx + 1}
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/faq"
                    onClick={onClose}
                    className="group flex items-center justify-between border-b border-white/8 py-2.5 font-display text-xl font-semibold tracking-tight text-[var(--srn-nav-muted)] transition-all hover:text-[#FFFCF5]"
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-2">
                      FAQ
                    </span>
                    <span className="font-mono text-xs text-[var(--srn-champagne)]/45 group-hover:text-[var(--srn-champagne)]">
                      07
                    </span>
                  </Link>
                </nav>
              </div>

              {/* Statutory Export Accreditations */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4.5 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#E2C37B]" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white font-semibold">
                    Statutory Governance
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs text-white/60 font-mono">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                    <span>DGFT / IEC Registered Exporter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                    <span>APEDA Sourcing RCMC Certified</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                    <span>Spices Board of India Registered</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                    <span>Laboratory Test &amp; Audit Nominated</span>
                  </li>
                </ul>
              </div>

              {/* Direct Trade Desk Contacts */}
              <div className="rounded-2xl border border-[#C5A059]/30 bg-black/40 p-4.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#E2C37B] block mb-2 font-semibold">
                  Kolkata Trade Desk
                </span>
                <div className="space-y-2 text-xs font-mono">
                  <a
                    href={`mailto:${contactPlaceholders.email}`}
                    className="flex items-center gap-2 text-white/80 hover:text-[#E2C37B] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span className="truncate">{contactPlaceholders.email}</span>
                  </a>
                  <a
                    href={`tel:${contactPlaceholders.phone}`}
                    className="flex items-center gap-2 text-white/80 hover:text-[#E2C37B] transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{contactPlaceholders.phone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2 (6 Cols): Sourcing Divisions Showcase with Real Photos & Trade Specs */}
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E2C37B] font-semibold">
                    Commercial Sourcing Divisions
                  </span>
                  <p className="text-[11px] text-white/50 mt-0.5">
                    Rigid laboratory grading, container payloads and export packaging
                  </p>
                </div>
                <Link
                  href="/products"
                  onClick={onClose}
                  className="text-xs font-mono text-[#C5A059] hover:underline flex items-center gap-1 group"
                >
                  <span>All Specifications</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* 6 Rich Division Cards (Rigid Aspect Ratio & Uniform Height) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {productCategories.map((cat, i) => {
                  const meta = categoryHighlights[cat.slug] || {
                    varieties: cat.short,
                    payload: cat.container,
                  };

                  return (
                    <Link
                      key={cat.slug}
                      href={`/products/${cat.slug}`}
                      onClick={onClose}
                      className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#C5A059] bg-[#0A1017] transition-all duration-300 flex flex-col justify-between shadow-lg"
                    >
                      {/* Photo Header */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/50">
                        <Image
                          src={categoryImage(cat.slug)}
                          alt={cat.name}
                          fill
                          sizes="(max-width:1024px) 50vw, 30vw"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1017] via-black/25 to-transparent" />
                        
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[9px] font-mono text-[#E2C37B] border border-[#C5A059]/40 font-semibold">
                            DIV {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-display text-sm font-bold text-white group-hover:text-[#E2C37B] transition-colors">
                            {cat.name}
                          </h4>
                          <p className="text-[11px] text-[#C5A059]/90 font-mono mt-1 leading-snug line-clamp-1">
                            {meta.varieties}
                          </p>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                          <span className="text-white/50">{meta.payload}</span>
                          <span className="text-[#E2C37B] font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            <span>Inspect</span> →
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Column 3 (3 Cols): Maritime Seaport Terminals, Incoterms & RFQ Launcher */}
            <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
              
              {/* Seaport Logistics Corridors */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4.5 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-3">
                  <Anchor className="w-4 h-4 text-[#E2C37B]" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white font-semibold">
                    Indian Port Terminals
                  </span>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="border-b border-white/5 pb-2">
                    <span className="font-semibold text-white block">Nhava Sheva (JNPT)</span>
                    <span className="text-[11px] font-mono text-white/50">Mumbai · Primary container gateway</span>
                  </div>
                  <div className="border-b border-white/5 pb-2">
                    <span className="font-semibold text-white block">Mundra Port</span>
                    <span className="text-[11px] font-mono text-white/50">Gujarat · Bulk ag & rapid turnaround</span>
                  </div>
                  <div className="border-b border-white/5 pb-2">
                    <span className="font-semibold text-white block">Cochin Port</span>
                    <span className="text-[11px] font-mono text-white/50">Kerala · Malabar spices & oils corridor</span>
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Chennai & Tuticorin</span>
                    <span className="text-[11px] font-mono text-white/50">Tamil Nadu · Eastern sea lanes to ASEAN</span>
                  </div>
                </div>
              </div>

              {/* Supported Incoterms 2020 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4.5 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck2 className="w-4 h-4 text-[#E2C37B]" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white font-semibold">
                    Incoterms® 2020 Framework
                  </span>
                </div>
                <p className="text-[11px] text-white/60 mb-2.5">
                  Contracts executed under standard ICC Incoterms with third-party inspection clauses:
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  <span className="rounded bg-white/10 px-2 py-0.5 text-white/90">FOB</span>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-white/90">CIF</span>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-white/90">CFR</span>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-white/90">DAP</span>
                  <span className="rounded bg-[#C5A059]/20 px-2 py-0.5 text-[#E2C37B] border border-[#C5A059]/30">
                    Test &amp; Audit
                  </span>
                </div>
              </div>

              {/* Trade RFQ Action Box */}
              <div className="rounded-2xl border border-[#C5A059]/40 bg-gradient-to-br from-[#0F1823] to-[#0A1017] p-5 shadow-xl">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#E2C37B] block mb-1 font-semibold">
                  Institutional Sourcing
                </span>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  Request spot price indication, lab grade availability, and FOB/CIF freight estimates.
                </p>
                
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="btn-shine w-full block text-center rounded-full bg-gradient-to-r from-[#C5A059] via-[#E2C37B] to-[#C5A059] py-2.5 text-xs font-bold text-stone-950 shadow-[0_4px_18px_rgba(197,160,89,0.35)] transition hover:brightness-105"
                >
                  Initiate Trade RFQ →
                </Link>
              </div>

            </div>

          </div>

          {/* Bottom Bar: Proven Group Lineage & Corporate Governance */}
          <div className="border-t border-white/10 bg-[#04070B] px-6 py-4 md:px-12 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50 font-mono">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-[#E2C37B] font-semibold flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  GROUP TRACK RECORD:
                </span>
                <span className="text-white/70">
                  Taj Hotels · JW Marriott · Radisson · Regional Cricket Boards · Large Hospital Chains
                </span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-white/40">
                <span>© {new Date().getFullYear()} {brand.legalName}</span>
                <span>DPDP ACT 2023 COMPLIANT</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
