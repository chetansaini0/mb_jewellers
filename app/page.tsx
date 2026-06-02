import type { Metadata } from "next";
import { PremiumHome } from "@/app/components/premium/PremiumHome";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "MB Jewellers | Luxury Jewellery in Sikar",
  description:
    "Discover MB Jewellers collections online and book a private studio viewing in Sikar — showcase site, in-person purchases only.",
  path: "/",
});

export default function Home() {
  return <PremiumHome />;
}
