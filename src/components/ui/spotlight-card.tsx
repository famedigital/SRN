"use client";

import { useCallback, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SpotlightCard({
  children,
  className,
  variant = "light",
  id,
}: {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark";
  id?: string;
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0, active: false });

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--spot-x", `${x}px`);
    el.style.setProperty("--spot-y", `${y}px`);
    setCoords({ x, y, active: true });
  }, []);

  const onLeave = useCallback(() => {
    setCoords((prev) => ({ ...prev, active: false }));
  }, []);

  return (
    <div
      id={id}
      className={cn(
        variant === "dark" ? "spotlight-card-dark" : "spotlight-card",
        "group relative flex h-full flex-col justify-between p-6 transition-all duration-300 md:p-7",
        className,
      )}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Specular border contour highlight that follows the cursor */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: coords.active
            ? `radial-gradient(320px circle at ${coords.x}px ${coords.y}px, rgba(197, 160, 89, 0.45), transparent 70%)`
            : undefined,
        }}
      />
      <div className="relative z-1 flex flex-col justify-between h-full">
        {children}
      </div>
    </div>
  );
}
