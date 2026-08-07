"use client";

import Link from "next/link";
import { PremiumShowroomsMap } from "@/app/components/premium/PremiumShowroomsMap";
import { siteConfig } from "@/app/lib/siteConfig";
import { showrooms } from "@/app/lib/siteData";

export function PremiumHomeStudioMapSection() {
  return (
    <section className="premium-section site-max site-px premium-home-map">
      <div className="premium-section__head">
        <p className="premium-eyebrow">Studio locations · Sikar</p>
        <h2 className="premium-title">Visit MB Jewellers in Sikar</h2>
        <p className="premium-section__lede">
          Two jewellery showrooms in Sikar for private, in-person selection — serving families across the Shekhawati
          region. Hours: {siteConfig.openingHours.display}.
        </p>
      </div>

      <div className="premium-home-map__showrooms">
        {showrooms.map((showroom) => (
          <div key={showroom.id} className="premium-home-map__showroom">
            <h3 className="premium-home-map__showroom-name">{showroom.name}</h3>
            <p className="premium-home-map__showroom-address">{showroom.address}</p>
            <p className="premium-home-map__showroom-phones">
              {showroom.landlines.map((line) => (
                <a key={line.e164} href={`tel:${line.e164}`}>
                  {line.display}
                </a>
              ))}
            </p>
            <Link href={showroom.directionsUrl} target="_blank" rel="noopener noreferrer">
              Find on Google Maps
            </Link>
          </div>
        ))}
      </div>

      <div className="premium-map premium-glass-card">
        <PremiumShowroomsMap variant="home" />
      </div>
    </section>
  );
}
