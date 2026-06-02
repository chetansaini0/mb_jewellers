"use client";

import Link from "next/link";
import { siteConfig } from "@/app/lib/siteConfig";

export function PremiumFloatingCtas() {
  return (
    <div className="luxury-float-actions" aria-label="Quick actions">
      <a className="luxury-fab" href={`tel:${siteConfig.contact.phoneE164}`} aria-label="Call MB Jewellers">
        Call
      </a>
      <Link className="luxury-fab" href="/contact">
        Book
      </Link>
    </div>
  );
}
