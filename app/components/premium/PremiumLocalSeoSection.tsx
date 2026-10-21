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

        <div className="space-y-5 border-t border-[var(--premium-line)] pt-5">
          {localSeoContent.faqs.map((item) => (
            <div key={item.question}>
              <h3 className="text-lg text-[var(--premium-ink)]">{item.question}</h3>
              <p className="mt-2 text-base leading-relaxed text-[var(--premium-muted)]">{item.answer}</p>
            </div>
          ))}
        </div>

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
          <ul className="mt-3 space-y-2">
            {siteConfig.showrooms.map((showroom) => (
              <li key={showroom.id}>
                <strong className="text-[var(--premium-ink)]">{showroom.name}:</strong> {showroom.address}
                {" · "}
                <a href={showroom.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="premium-inline-link">
                  Google Business Profile
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            {openingHours.display} · {siteConfig.contact.phoneDisplay} · {siteConfig.contact.email}
          </p>
        </div>
      </div>
    </section>
  );
}
