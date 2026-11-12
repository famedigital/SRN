"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { FileSpreadsheet, Menu } from "lucide-react";
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
    setScrolled(y > 16);
    const delta = y - lastY.current;
    if (y > 160 && delta > 10) setHidden(true);
    else if (delta < -6) setHidden(false);
    lastY.current = y;
  });

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 overflow-visible text-white transition-[background,border,box-shadow] duration-300",
          scrolled
            ? "border-b border-white/10 bg-[#0B1220]/95 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            : "border-b border-white/8 bg-[#0B1220]/72 backdrop-blur-lg",
        )}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hidden border-b border-white/8 bg-[#070C14]/80 px-5 py-1.5 md:block md:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px]">
            <LiveClock showMultiZone={false} />
            <div className="hidden items-center gap-3 font-mono text-white/45 lg:flex">
              <span>IEC</span>
              <span className="text-white/20">·</span>
              <span>APEDA</span>
              <span className="text-white/20">·</span>
              <span>Spices Board</span>
              <span className="text-white/20">·</span>
              <a
                href="https://msme.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                MSME
              </a>
              <span className="text-white/20">·</span>
              <a
                href="https://www.iso.org/standard/62085.html"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                ISO 9001:2015
              </a>
              <span className="text-white/20">·</span>
              <span className="text-white/70">Incoterms® 2020</span>
            </div>
            <a
              href={`mailto:${contactPlaceholders.email}`}
              className="font-mono text-white/55 transition hover:text-white"
            >
              {contactPlaceholders.email}
            </a>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 overflow-visible px-5 md:h-20 md:px-8">
          <Link
            href="/"
            className="relative z-20 flex min-w-0 items-center gap-3 md:gap-3.5"
            aria-label={`${brand.publicName} home`}
          >
            {/* Large emblem hangs below the slim bar so motto ring stays readable */}
            <span className="relative top-5 shrink-0 md:top-6">
              <AnimatedLogo size="nav" priority label={`${brand.publicName} emblem`} />
            </span>
            <span className="min-w-0">
              <span className="font-display block text-lg font-semibold tracking-tight text-white md:text-xl">
                {brand.publicName}
              </span>
              <span className="mt-0.5 block text-[10px] font-medium tracking-[0.12em] text-[#E2C37B] sm:text-[11px] md:tracking-[0.14em]">
                {brand.motto}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
                    isActive ? "text-white" : "text-white/55 hover:text-white",
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute inset-x-2 -bottom-0.5 h-px bg-white/70"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                    />
                  )}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={() => setMegaMenuOpen(true)}
              className="ml-2 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-[13px] font-medium text-white/85 transition hover:border-white/30 hover:bg-white/10"
            >
              <Menu className="h-3.5 w-3.5" />
              Divisions
            </button>

            {lines.length > 0 && (
              <button
                type="button"
                onClick={() => setRfqOpen(true)}
                className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-white/8 px-3 py-2 font-mono text-xs text-white"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" />
                RFQ {lines.length}
              </button>
            )}

            <Link
              href="/contact"
              className="ml-3 rounded-md bg-white px-4 py-2 text-[13px] font-semibold text-[#0B1220] transition hover:bg-white/90"
            >
              Trade enquiry
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            {lines.length > 0 && (
              <button
                type="button"
                onClick={() => setRfqOpen(true)}
                className="rounded-md border border-white/20 bg-white/8 px-2.5 py-1.5 font-mono text-xs text-white"
              >
                RFQ {lines.length}
              </button>
            )}
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-white/5"
              aria-expanded={megaMenuOpen}
              onClick={() => setMegaMenuOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </motion.header>

      <FullScreenMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
      <MobileActionDock onOpenMenu={() => setMegaMenuOpen(true)} />
    </>
  );
}
