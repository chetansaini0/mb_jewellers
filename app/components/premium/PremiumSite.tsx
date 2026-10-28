"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SkipToContent } from "@/app/components/a11y/SkipToContent";
import { PremiumBackdropLogo } from "@/app/components/premium/PremiumBackdropLogo";
import { PremiumFooter } from "@/app/components/premium/PremiumFooter";
import { PremiumFloatingCtas } from "@/app/components/premium/PremiumFloatingCtas";
import { PremiumHeader } from "@/app/components/premium/PremiumHeader";
import { CookieConsent } from "@/app/components/premium/CookieConsent";
import { PremiumProviders } from "@/app/components/premium/PremiumProviders";

// The full-screen intro loader and the custom cursor were retired in the premium
// enhancement pass: they delayed first view and replaced the native pointer, which
// hurt usability. The components remain in the repo if they are ever wanted again.

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
      <PremiumBackdropLogo />
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
