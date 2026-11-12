"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HeroStage({
  slides,
  children,
  className,
}: {
  slides: readonly { src: string; alt: string }[];
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5600);
    return () => window.clearInterval(id);
  }, [reduce, slides.length]);

  return (
    <section
      ref={ref}
      className={cn(
        "hero-stage noise-film relative -mt-24 min-h-[min(94svh,56rem)] overflow-hidden pt-24 md:-mt-32 md:pt-32",
        className,
      )}
    >
      <motion.div className="absolute inset-0 z-0" style={reduce ? undefined : { y, opacity }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={slides[index]?.src ?? "slide"}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {slides[index] && (
              <Image
                src={slides[index].src}
                alt={slides[index].alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,rgba(6,9,13,0.88)_8%,rgba(6,9,13,0.62)_48%,rgba(6,9,13,0.78)_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(197,160,89,0.18),transparent_55%)]"
          aria-hidden
        />
      </motion.div>

      <div className="hero-orb hero-orb-a opacity-50" aria-hidden />
      <div className="hero-orb hero-orb-b opacity-40" aria-hidden />

      <div className="relative z-[2] flex min-h-[inherit] flex-col">{children}</div>
    </section>
  );
}
