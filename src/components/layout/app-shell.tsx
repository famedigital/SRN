"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { RfqDock } from "@/components/rfq/rfq-dock";
import { RfqProvider } from "@/components/rfq/rfq-store";
import { BackToTop } from "@/components/ui/back-to-top";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <RfqProvider>
      <SiteHeader />
      <main id="main" className="pt-24 md:pt-32">
        {children}
      </main>
      <SiteFooter />
      <RfqDock />
      <BackToTop />
    </RfqProvider>
  );
}
