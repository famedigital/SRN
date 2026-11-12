import Image from "next/image";
import { cn } from "@/lib/utils";

const marks = [
  {
    src: "/brand/msme.png",
    alt: "MSME — Micro, Small & Medium Enterprises",
    href: "https://msme.gov.in/",
    width: 160,
    height: 72,
  },
  {
    src: "/brand/iso-9001-2015.png",
    alt: "ISO 9001:2015 Certified Company",
    href: "https://www.iso.org/standard/62085.html",
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
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      {marks.map((mark) => (
        <a
          key={mark.src}
          href={mark.href}
          target="_blank"
          rel="noopener noreferrer"
          title={mark.alt}
          className={cn(
            "inline-flex items-center justify-center transition opacity-95 hover:opacity-100",
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
              size === "sm" ? "h-9" : "h-11 md:h-12",
              tone === "dark" && "drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]",
            )}
          />
        </a>
      ))}
    </div>
  );
}
