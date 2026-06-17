"use client";

import { PremiumPageCtaBand } from "@/app/components/premium/PremiumPageCtaBand";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { PremiumTestimonialsCarousel } from "@/app/components/premium/PremiumTestimonialsCarousel";
import { PremiumTrustSection } from "@/app/components/premium/PremiumTrustSection";

export function PremiumTestimonialsPage() {
  return (
    <PremiumPageFrame>
      <PremiumPageHero
        eyebrow="Testimonials"
        title="Voices from families, collectors, and bridal clients"
        lede="A salon of glowing quotes, cinematic transitions, and the trust built piece by piece across decades in Sikar."
      />
      <PremiumTestimonialsCarousel />
      <PremiumTrustSection compact />
      <PremiumPageCtaBand
        title="Become part of the MB story"
        copy="Whether you are styling a bridal suite or adding a heirloom piece, our consultants welcome you into a calm, appointment-led studio experience."
        primaryHref="/contact"
        primaryLabel="Book a visit"
      />
    </PremiumPageFrame>
  );
}
