import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  const loop = [...items, ...items];

  return (
    <div className={cn("marquee", className)} aria-hidden>
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-3 whitespace-nowrap text-sm font-medium tracking-tight text-white/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal-300/80" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
