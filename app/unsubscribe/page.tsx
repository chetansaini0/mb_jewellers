import type { Metadata } from "next";

import { UnsubscribeForm } from "@/app/components/premium/UnsubscribeForm";
import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Unsubscribe | MB Jewellers",
    description: "Stop receiving MB Jewellers newsletter and marketing emails.",
    path: "/unsubscribe",
  }),
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ email?: string; token?: string }>;

export default async function UnsubscribePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const email = typeof params.email === "string" ? params.email : "";
  const token = typeof params.token === "string" ? params.token : "";

  return (
    <PremiumPageFrame>
      <PremiumPageHero
        eyebrow="Email preferences"
        title="Unsubscribe from marketing emails"
        lede="We’ll stop sending curated edits and private viewing invitations. Studio appointments and purchase records are unaffected."
      />
      <section className="premium-section">
        <div className="site-max site-px">
          <div className="mx-auto max-w-xl">
            <UnsubscribeForm initialEmail={email} token={token} />
          </div>
        </div>
      </section>
    </PremiumPageFrame>
  );
}
