import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const primary =
  "btn-shine inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C5A059] via-[#E2C37B] to-[#C5A059] px-6 py-3 text-sm font-semibold text-stone-950 shadow-[0_12px_30px_-10px_rgba(197,160,89,0.5)] transition hover:shadow-[0_16px_40px_-8px_rgba(197,160,89,0.7)] hover:brightness-105 active:scale-[0.98]";
const secondary =
  "inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:border-[#C5A059]/60 hover:bg-white/10 hover:text-[#E2C37B]";
const secondaryLight =
  "inline-flex items-center justify-center rounded-full border border-[var(--srn-line-strong)] bg-[var(--srn-paper)] px-6 py-3 text-sm font-semibold text-[var(--srn-ink)] transition hover:border-[#C5A059] hover:text-[#9E7D3B]";
const ghost =
  "inline-flex items-center gap-1.5 text-sm font-semibold text-[#9E7D3B] transition hover:text-[#C5A059]";
const gold =
  "btn-shine inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C5A059] via-[#E2C37B] to-[#C5A059] px-6 py-3 text-sm font-semibold text-stone-950 shadow-[0_14px_36px_-12px_rgba(197,160,89,0.55)] transition hover:shadow-[0_18px_44px_-8px_rgba(197,160,89,0.75)] hover:brightness-105 active:scale-[0.98]";

type Variant = "primary" | "secondary" | "secondaryLight" | "ghost" | "gold";

const map: Record<Variant, string> = {
  primary,
  secondary,
  secondaryLight,
  ghost,
  gold,
};

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link href={href} className={cn(map[variant], className)} {...props}>
      <span>{children}</span>
    </Link>
  );
}
