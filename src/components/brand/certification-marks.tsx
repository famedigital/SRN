import Image from "next/image";
import { cn } from "@/lib/utils";

const marks = [
  {
    src: "/brand/msme.png",
    alt: "MSME — Micro, Small & Medium Enterprises",
    width: 160,
    height: 72,
  },
  {
    src: "/brand/iso-9001-2015.png",
    alt: "ISO 9001:2015 Certified Company",
    width: 72,
    height: 72,
  },
] as const;

interface CertificationMarksProps {
  tone?: "dark" | "light";
  className?: string;
  size?: "sm" | "md";
}

export function CertificationMarks({
  tone = "dark",
  className,
  size = "md",
}: CertificationMarksProps) {
  const plate =
    tone === "dark"
      ? "bg-white/95 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.55)]"
      : "bg-white border border-[var(--srn-rule)] shadow-sm";

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {marks.map((mark) => (
        <div
          key={mark.src}
          className={cn(
            "inline-flex items-center justify-center rounded-md px-2.5 py-2",
            plate,
            size === "sm" ? "h-12" : "h-14 md:h-16",
          )}
        >
          <Image
            src={mark.src}
            alt={mark.alt}
            width={mark.width}
            height={mark.height}
            className={cn(
              "w-auto object-contain",
              size === "sm" ? "h-8" : "h-9 md:h-11",
            )}
          />
        </div>
      ))}
    </div>
  );
}
