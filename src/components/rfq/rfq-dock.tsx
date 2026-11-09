"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { microcopy } from "../../../content/copy";
import { useRfq } from "./rfq-store";
import { cn } from "@/lib/utils";

export function RfqDock() {
  const { lines, remove, open, setOpen } = useRfq();
  if (!lines.length && !open) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="surface-glass fixed bottom-4 right-4 z-40 w-[min(100%-1.5rem,20rem)] overflow-hidden rounded-2xl border border-white/40"
      aria-label={microcopy.rfqDockTitle}
    >
      <div className="flex items-center justify-between border-b border-[var(--srn-line)] px-4 py-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--srn-accent)]">
            RFQ
          </p>
          <p className="text-sm font-semibold tracking-tight">
            {microcopy.rfqDockTitle}{" "}
            <span className="font-mono text-xs font-normal text-[var(--srn-ink-muted)]">
              {lines.length}
            </span>
          </p>
        </div>
        <button
          type="button"
          className="rounded-full px-2.5 py-1 text-xs text-[var(--srn-ink-muted)] transition hover:bg-[var(--srn-canvas-muted)] hover:text-[var(--srn-ink)]"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="max-h-72 overflow-y-auto px-4 py-3">
              {!lines.length ? (
                <p className="text-sm text-[var(--srn-ink-muted)]">{microcopy.rfqEmpty}</p>
              ) : (
                <ul>
                  {lines.map((line) => (
                    <li
                      key={line.slug}
                      className="flex items-center justify-between gap-3 border-b border-[var(--srn-line)] py-2 last:border-0"
                    >
                      <p className="text-sm font-medium">{line.name}</p>
                      <button
                        type="button"
                        className="text-xs font-medium text-[var(--srn-accent)]"
                        onClick={() => remove(line.slug)}
                      >
                        {microcopy.remove}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {!!lines.length && (
                <Link
                  href="/contact"
                  className="btn-shine mt-3 flex w-full items-center justify-center rounded-full bg-[var(--srn-accent)] px-4 py-2.5 text-sm font-semibold text-white"
                >
                  <span>{microcopy.rfqSubmit}</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}

export function AddToRfqButton({
  slug,
  name,
  className,
}: {
  slug: string;
  name: string;
  className?: string;
}) {
  const { add, has } = useRfq();
  const added = has(slug);
  return (
    <button
      type="button"
      disabled={added}
      onClick={() => add({ slug, name })}
      className={cn(
        "rounded-full border px-3.5 py-2 text-xs font-semibold transition",
        added
          ? "border-[var(--srn-accent)]/30 bg-[var(--srn-accent-soft)] text-[var(--srn-accent-deep)]"
          : "border-[var(--srn-line-strong)] text-[var(--srn-ink)] hover:border-[var(--srn-accent)] hover:text-[var(--srn-accent)]",
        className,
      )}
    >
      {added ? microcopy.addedToRfq : microcopy.addToRfq}
    </button>
  );
}
