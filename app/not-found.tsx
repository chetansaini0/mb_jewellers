import type { Metadata } from "next";
import Link from "next/link";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Page Not Found | MB Jewellers",
  description: "The page you are looking for could not be found. Explore collections or book a private viewing.",
  path: "/404",
});

export default function NotFound() {
  return (
    <PremiumPageFrame>
      <section className="premium-section site-max site-px">
        <div className="premium-glass-card mx-auto max-w-2xl p-8 text-center">
          <p className="premium-eyebrow">404</p>
          <h1 className="premium-title mt-2">This page is not in our collection</h1>
          <p className="premium-section__lede mx-auto mt-4 max-w-lg">
            The link may be outdated or mistyped. Return home or explore our signature collections.
          </p>
          <div className="premium-hero__actions mt-8 justify-center">
            <Link href="/" className="premium-button premium-button--primary">
              Back to home
            </Link>
            <Link href="/collections" className="premium-button premium-button--ghost">
              View collections
            </Link>
          </div>
        </div>
      </section>
    </PremiumPageFrame>
  );
}
