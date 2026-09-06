"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { SkipToContent } from "@/app/components/a11y/SkipToContent";
import { PremiumFooter } from "@/app/components/premium/PremiumFooter";
import { PremiumFloatingCtas } from "@/app/components/premium/PremiumFloatingCtas";
import { PremiumHeader } from "@/app/components/premium/PremiumHeader";
import { CookieConsent } from "@/app/components/premium/CookieConsent";
import { PremiumProviders } from "@/app/components/premium/PremiumProviders";

const PremiumLoader = dynamic(() => import("@/app/components/premium/PremiumLoader").then((mod) => mod.PremiumLoader), {
  ssr: false,
});

export function PremiumSite({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <>
        <SkipToContent />
        <main id="main-content" className="premium-main" tabIndex={-1}>
          {children}
        </main>
      </>
    );
  }

  return (
    <PremiumProviders>
      <SkipToContent />
      <PremiumLoader />
      <div className="premium-shell">
        <PremiumHeader />
        <main id="main-content" className="premium-main" tabIndex={-1}>
          {children}
        </main>
        <PremiumFooter />
        <PremiumFloatingCtas />
        <CookieConsent />
      </div>
    </PremiumProviders>
  );
}
