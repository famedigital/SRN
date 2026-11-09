"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

export function BackToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > 480);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.94 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--srn-champagne)]/40 bg-[var(--srn-obsidian)] text-[var(--srn-champagne-bright)] shadow-[0_16px_40px_-16px_rgba(0,0,0,0.65)] backdrop-blur-md transition hover:border-[var(--srn-champagne)] hover:bg-[color-mix(in_srgb,var(--srn-obsidian)_85%,#c9a56a)] md:bottom-8 md:right-8"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
