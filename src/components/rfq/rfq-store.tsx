"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type RfqLine = { slug: string; name: string; notes?: string };

type RfqContextValue = {
  lines: RfqLine[];
  add: (line: RfqLine) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const RfqContext = createContext<RfqContextValue | null>(null);
const STORAGE_KEY = "srn-rfq-lines";

export function RfqProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<RfqLine[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as RfqLine[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const add = useCallback((line: RfqLine) => {
    setLines((prev) => {
      if (prev.some((l) => l.slug === line.slug)) return prev;
      return [...prev, line];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const has = useCallback((slug: string) => lines.some((l) => l.slug === slug), [lines]);

  const value = useMemo(
    () => ({ lines, add, remove, clear, has, open, setOpen }),
    [lines, add, remove, clear, has, open],
  );

  return <RfqContext.Provider value={value}>{children}</RfqContext.Provider>;
}

export function useRfq() {
  const ctx = useContext(RfqContext);
  if (!ctx) throw new Error("useRfq must be used within RfqProvider");
  return ctx;
}
