import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 md:px-8", className)}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--srn-accent)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Folio({ n }: { n: string }) {
  return (
    <span
      className="rounded-full border border-[var(--srn-line)] bg-[var(--srn-paper)] px-3 py-1 font-mono text-[11px] text-[var(--srn-ink-muted)]"
      aria-hidden
    >
      {n}
    </span>
  );
}

export function Rule({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-[var(--srn-line)]", className)} />;
}

export function GoldRule({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-1 w-12 rounded-full bg-gradient-to-r from-[#C5A059] to-[#F4E2B2]",
        className,
      )}
      aria-hidden
    />
  );
}
