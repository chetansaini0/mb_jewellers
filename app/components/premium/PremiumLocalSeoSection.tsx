import Link from "next/link";
import { localSeoContent } from "@/app/lib/seoContent";
import { openingHours, siteConfig } from "@/app/lib/siteConfig";

export function PremiumLocalSeoSection() {
  return (
    <section className="premium-section premium-section--warm site-max site-px" aria-labelledby="local-seo-heading">
      <div className="premium-section__head" data-reveal>
        <p className="premium-eyebrow">{localSeoContent.eyebrow}</p>
        <h2 id="local-seo-heading" className="premium-section-title__heading">
          {localSeoContent.title}
        </h2>
        <p className="premium-section__lede">{localSeoContent.lead}</p>
      </div>

      <div className="premium-glass-card mx-auto max-w-3xl space-y-5 p-6 md:p-8" data-reveal>
        {localSeoContent.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-[var(--premium-muted)]">
            {paragraph}
          </p>
        ))}

        <div className="flex flex-wrap gap-3 pt-2">
          {localSeoContent.links.map((link) => (
            <Link key={link.href} href={link.href} className="premium-button premium-button--ghost">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="border-t border-[var(--premium-line)] pt-5 text-sm text-[var(--premium-muted)]">
          <p>
            <strong className="text-[var(--premium-ink)]">{siteConfig.name}</strong> — {siteConfig.legalName}
          </p>
          <p className="mt-2">{siteConfig.location.address}</p>
          <p className="mt-1">
            {openingHours.display} · {siteConfig.contact.phoneDisplay} · {siteConfig.contact.email}
          </p>
          <p className="mt-3">
            <a href={siteConfig.showrooms[0].googleMapsUrl} target="_blank" rel="noopener noreferrer" className="premium-inline-link">
              Find MB Jewellers on Google Maps
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
