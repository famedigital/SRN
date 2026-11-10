"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/brand/srn-logo-transparent.png";

type Size = "sm" | "md" | "lg" | "hero";

const sizes: Record<Size, { box: string; px: number }> = {
  sm: { box: "h-12 w-12", px: 48 },
  md: { box: "h-16 w-16 md:h-[4.5rem] md:w-[4.5rem]", px: 72 },
  lg: { box: "h-36 w-36 md:h-44 md:w-44", px: 176 },
  hero: { box: "h-52 w-52 sm:h-60 sm:w-60 md:h-72 md:w-72", px: 288 },
};

interface AnimatedLogoProps {
  size?: Size;
  className?: string;
  priority?: boolean;
  animated?: boolean;
  label?: string;
  interactive?: boolean;
}

export function AnimatedLogo({
  size = "md",
  className,
  priority = false,
  animated = true,
  label = "SRN Global Trade Emblem",
  interactive = true,
}: AnimatedLogoProps) {
  const reduce = useReducedMotion();
  const dim = sizes[size];
  const live = animated && !reduce;
  const isLarge = size === "lg" || size === "hero";

  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number | null>(null);

  // Subtle physics loop: ultra-smooth, dignified micro-tilt (max 6 degrees only)
  const updatePhysics = useCallback(() => {
    setRotation((prev) => {
      const dx = targetRotation.current.x - prev.x;
      const dy = targetRotation.current.y - prev.y;
      if (Math.abs(dx) < 0.005 && Math.abs(dy) < 0.005) return prev;
      return {
        x: prev.x + dx * 0.08,
        y: prev.y + dy * 0.08,
      };
    });
    animFrame.current = requestAnimationFrame(updatePhysics);
  }, []);

  useEffect(() => {
    if (isLarge && live) {
      animFrame.current = requestAnimationFrame(updatePhysics);
    }
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [isLarge, live, updatePhysics]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !isLarge || reduce || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    // Dignified, restrained micro-tilt: max 5-6 degrees
    targetRotation.current = {
      x: -deltaY * 5,
      y: deltaX * 5,
    };
  };

  const handleMouseLeave = () => {
    targetRotation.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: isLarge ? 1000 : undefined }}
      className={cn(
        "relative inline-flex items-center justify-center select-none",
        className
      )}
    >
      <div className={cn("relative flex items-center justify-center", dim.box)}>
        
        {/* Subtle, soft ambient gold glow */}
        {live && (
          <div
            aria-hidden
            className={cn(
              "absolute rounded-full pointer-events-none mix-blend-screen",
              isLarge
                ? "inset-[-15%] bg-[radial-gradient(circle,rgba(197,160,89,0.22)_0%,rgba(197,160,89,0.08)_50%,transparent_75%)] blur-xl"
                : "inset-[-10%] bg-[radial-gradient(circle,rgba(197,160,89,0.25)_0%,transparent_70%)]"
            )}
          />
        )}

        {/* The 3D Medallion Image */}
        <motion.div
          className={cn(
            "relative z-10 w-full h-full rounded-full flex items-center justify-center will-change-transform",
            isLarge ? "transition-transform duration-150 ease-out" : ""
          )}
          style={
            isLarge && live
              ? {
                  transform: `rotateX(${rotation.x.toFixed(2)}deg) rotateY(${rotation.y.toFixed(2)}deg)`,
                  transformStyle: "preserve-3d",
                }
              : undefined
          }
        >
          {/* Natural drop shadow */}
          {isLarge && (
            <div
              className="absolute inset-2 rounded-full bg-black/50 blur-xl pointer-events-none -z-10"
              style={{ transform: "translateZ(-24px)" }}
            />
          )}

          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
            <Image
              src={LOGO_SRC}
              alt={label}
              width={dim.px}
              height={dim.px}
              priority={priority}
              className={cn(
                "h-full w-full object-contain select-none pointer-events-none",
                isLarge
                  ? "filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)]"
                  : "filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
              )}
            />

            {/* Slow, sovereign metallic light glint across relief */}
            {live && (
              <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden mix-blend-color-dodge opacity-60">
                <div
                  className={cn(
                    "absolute -inset-full w-[300%] h-[300%] bg-gradient-to-r from-transparent via-[#F4E2B2]/60 to-transparent",
                    isLarge
                      ? "animate-[specularSweep_7s_cubic-bezier(0.4,0,0.2,1)_infinite]"
                      : "animate-[specularSweep_9s_ease-in-out_infinite]"
                  )}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
