"use client";

import { PremiumCursor } from "@/app/components/premium/PremiumCursor";
import { PremiumFooter } from "@/app/components/premium/PremiumFooter";
import { PremiumHeader } from "@/app/components/premium/PremiumHeader";
import { PremiumHome } from "@/app/components/premium/PremiumHome";
import { PremiumLoader } from "@/app/components/premium/PremiumLoader";
import { PremiumProviders } from "@/app/components/premium/PremiumProviders";

export function PremiumExperience() {
  return (
    <PremiumProviders>
      <PremiumLoader />
      <PremiumCursor />
      <PremiumHeader />
      <main className="premium-main">
        <PremiumHome />
      </main>
      <PremiumFooter />
    </PremiumProviders>
  );
}
