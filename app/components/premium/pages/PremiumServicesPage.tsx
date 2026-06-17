"use client";

import { Gem, PencilRuler, Sparkles, Wand2 } from "lucide-react";
import { PremiumAtelierStrip } from "@/app/components/premium/PremiumAtelierStrip";
import { PremiumInfoCard } from "@/app/components/premium/PremiumInfoCard";
import { PremiumPageCtaBand } from "@/app/components/premium/PremiumPageCtaBand";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumPageSection } from "@/app/components/premium/PremiumPageSection";
import { PremiumTrustSection } from "@/app/components/premium/PremiumTrustSection";
import { customJewellerySteps } from "@/app/lib/premiumPages";

const stepIcons = [Sparkles, PencilRuler, Wand2, Gem];

export function PremiumServicesPage() {
  return (
    <PremiumPageFrame>
      <PremiumPageHero
        eyebrow="Atelier services"
        title="Custom jewellery, composed like a ceremony"
        lede="From the first sketch to the final polish, each bespoke piece moves through a quiet, appointment-only process designed around your story."
      />

      <PremiumPageSection
        eyebrow="Process"
        title="How we build custom work"
        subtitle="Four studio milestones keep design decisions clear, timelines honest, and finishing at the level MB clients expect."
        warm
      >
        <div className="premium-info-grid">
          {customJewellerySteps.map((item, index) => (
            <PremiumInfoCard
              key={item.step}
              step={item.step}
              title={item.title}
              copy={item.copy}
              icon={stepIcons[index]}
              index={index}
            />
          ))}
        </div>
      </PremiumPageSection>

      <PremiumAtelierStrip />
      <PremiumTrustSection compact />
      <PremiumPageCtaBand
        title="Start your bespoke journey"
        copy="Bring references, occasion notes, and metal preferences to a private design consultation in Sikar."
        primaryHref="/contact?mode=APPOINTMENT&occasion=custom"
        primaryLabel="Book design consultation"
      />
    </PremiumPageFrame>
  );
}
