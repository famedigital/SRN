"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { ShieldCheck, Layers, FileSpreadsheet, ChevronDown } from "lucide-react";
import { brand, contactPlaceholders, nav } from "../../../content/copy";
import { AnimatedLogo } from "@/components/brand/animated-logo";
import { FullScreenMenu } from "./full-screen-menu";
import { MobileActionDock } from "./mobile-action-dock";
import { LiveClock } from "@/components/ui/live-clock";
import { useRfq } from "@/components/rfq/rfq-store";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const { lines, setOpen: setRfqOpen } = useRfq();
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
    const delta = y - lastY.current;
    if (y > 160 && delta > 10) {
      setHidden(true);
    } else if (delta < -6) {
      setHidden(false);
    }
    lastY.current = y;
  });

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-white transition-[background,border,box-shadow] duration-500",
          scrolled
            ? "border-b border-[#C5A059]/25 bg-[#060B10]/90 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
            : "border-b border-white/10 bg-[#060B10]/55 backdrop-blur-xl"
        )}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Tier 1: Executive Global Desk Ribbon (Desktop & Tablet) */}
        <div className="hidden border-b border-white/10 bg-black/40 px-5 py-2 md:block md:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between text-xs">
            {/* Left: Real-Time Desk Clock & Telemetry */}
            <LiveClock showMultiZone={false} />

            {/* Center: Institutional Trade Regulatory Accreditations */}
            <div className="hidden items-center gap-4 font-mono text-[11px] text-white/60 lg:flex">
              <span className="flex items-center gap-1.5 text-[#E2C37B]">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>IEC REGISTERED</span>
              </span>
              <span className="text-white/20">|</span>
              <span>APEDA RCMC</span>
              <span className="text-white/20">|</span>
              <span>SPICES BOARD OF INDIA</span>
              <span className="text-white/20">|</span>
              <span className="text-white/80">INCOTERMS® 2020</span>
            </div>

            {/* Right: Direct Desk Concierge */}
            <div className="flex items-center gap-4 font-mono text-xs">
              <a
                href={`mailto:${contactPlaceholders.email}`}
                className="text-white/70 transition hover:text-[#E2C37B]"
              >
                {contactPlaceholders.email}
              </a>
              <span className="text-white/20">·</span>
              <a
                href={`tel:${contactPlaceholders.phone}`}
                className="text-[#E2C37B] transition hover:text-[#F4E2B2]"
              >
                {contactPlaceholders.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Tier 2: Main Sovereign Navigation Bar */}
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
          {/* Brand Anchor with Bullion Micro-Emblem */}
          <Link
            href="/"
            className="group flex items-center gap-3.5 transition-opacity hover:opacity-95"
            aria-label={`${brand.publicName} Homepage`}
          >
            <div className="relative">
              <AnimatedLogo size="sm" priority label={`${brand.publicName} emblem`} />
              <div className="absolute -inset-1 rounded-full bg-[#C5A059]/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display block text-xl tracking-wider text-white font-bold">
                  {brand.publicName}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#C5A059]/15 text-[#E2C37B] border border-[#C5A059]/30">
                  GLOBAL SOURCING
                </span>
              </div>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">
                {brand.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-white/10 text-[#E2C37B] shadow-inner"
                      : "text-white/75 hover:bg-white/8 hover:text-white"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute inset-0 rounded-full border border-[#C5A059]/40"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Commercial Divisions Full-Screen Mega Menu Trigger */}
            <button
              type="button"
              onClick={() => setMegaMenuOpen(true)}
              className="ml-2 flex items-center gap-2 rounded-full border border-[#C5A059]/40 bg-gradient-to-r from-white/5 to-[#C5A059]/10 px-4 py-2 text-sm font-medium text-white hover:border-[#C5A059] hover:bg-[#C5A059]/20 transition-all shadow-[0_2px_12px_rgba(197,160,89,0.15)] group"
            >
              <Layers className="h-4 w-4 text-[#E2C37B] group-hover:scale-110 transition-transform" />
              <span>Divisions</span>
              <span className="rounded bg-[#C5A059]/20 px-1.5 py-0.5 text-[10px] font-mono text-[#F4E2B2] border border-[#C5A059]/30">
                6 Lines
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-white/60 group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* Quick RFQ Basket Pill (Active items) */}
            {lines.length > 0 && (
              <button
                type="button"
                onClick={() => setRfqOpen(true)}
                className="ml-2 flex items-center gap-2 rounded-full border border-[#C5A059] bg-[#C5A059]/20 px-3.5 py-2 text-xs font-mono text-[#F4E2B2] transition hover:bg-[#C5A059]/30 shadow-[0_0_15px_rgba(197,160,89,0.3)] animate-pulse"
              >
                <FileSpreadsheet className="h-3.5 w-3.5 text-[#E2C37B]" />
                <span>RFQ ({lines.length})</span>
              </button>
            )}

            {/* High-Impact Institutional RFQ Action Button */}
            <Link
              href="/contact"
              className="btn-shine ml-3 rounded-full bg-gradient-to-r from-[#C5A059] via-[#E2C37B] to-[#C5A059] px-6 py-2.5 text-sm font-semibold text-stone-950 shadow-[0_6px_24px_rgba(197,160,89,0.4)] transition hover:shadow-[0_8px_32px_rgba(197,160,89,0.6)] hover:brightness-105 active:scale-[0.98]"
            >
              <span>Initiate Trade RFQ</span>
            </Link>
          </nav>

          {/* Mobile & Tablet Controls Bar */}
          <div className="flex items-center gap-3 lg:hidden">
            {lines.length > 0 && (
              <button
                type="button"
                onClick={() => setRfqOpen(true)}
                className="flex items-center gap-1.5 rounded-full border border-[#C5A059] bg-[#C5A059]/20 px-3 py-1.5 text-xs font-mono text-[#F4E2B2]"
              >
                <FileSpreadsheet className="h-3.5 w-3.5 text-[#E2C37B]" />
                <span>RFQ ({lines.length})</span>
              </button>
            )}

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#C5A059]/40 bg-white/5 active:scale-95 transition-all text-white hover:border-[#C5A059]"
              aria-expanded={megaMenuOpen}
              aria-controls="mega-menu"
              onClick={() => setMegaMenuOpen(true)}
            >
              <span className="sr-only">Open Global Sourcing Mega Menu</span>
              <span className="flex w-5 flex-col gap-1.5" aria-hidden>
                <span className="block h-0.5 w-full bg-[#F4E2B2]" />
                <span className="block h-0.5 w-3/4 bg-[#F4E2B2]" />
                <span className="block h-0.5 w-full bg-[#F4E2B2]" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Mega Menu Takeover with High-Res Photography & Logistics Dossier */}
      <FullScreenMenu
        isOpen={megaMenuOpen}
        onClose={() => setMegaMenuOpen(false)}
      />

      {/* Mobile Floating Action Dock (Instant WhatsApp, Call Desk, RFQ, Menu) */}
      <MobileActionDock onOpenMenu={() => setMegaMenuOpen(true)} />
    </>
  );
}
