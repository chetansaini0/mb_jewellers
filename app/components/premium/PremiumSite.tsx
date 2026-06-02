"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { SkipToContent } from "@/app/components/a11y/SkipToContent";
import { PremiumBackdropLogo } from "@/app/components/premium/PremiumBackdropLogo";
import { PremiumFooter } from "@/app/components/premium/PremiumFooter";
import { PremiumFloatingCtas } from "@/app/components/premium/PremiumFloatingCtas";
import { PremiumHeader } from "@/app/components/premium/PremiumHeader";
import { CookieConsent } from "@/app/components/premium/CookieConsent";
import { PremiumProviders } from "@/app/components/premium/PremiumProviders";

const PremiumLoader = dynamic(
  () => import("@/app/components/premium/PremiumLoader").then((mod) => mod.PremiumLoader),
  { ssr: false },
);
const PremiumCursor = dynamic(
  () => import("@/app/components/premium/PremiumCursor").then((mod) => mod.PremiumCursor),
  { ssr: false },
);

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
      <PremiumBackdropLogo />
      <PremiumCursor />
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
