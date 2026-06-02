import { PremiumPageFrame } from "@/app/components/premium/PremiumPageFrame";
import { PremiumPageHero } from "@/app/components/premium/PremiumPageHero";

type LegalSection = {
  title: string;
  body: string;
};

export function PremiumLegalPage({
  eyebrow,
  title,
  lede,
  sections,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  sections: readonly LegalSection[];
}) {
  return (
    <PremiumPageFrame>
      <PremiumPageHero eyebrow={eyebrow} title={title} lede={lede} />
      <section className="premium-section">
        <div className="site-max site-px">
          <div className="mx-auto grid max-w-4xl gap-4">
            {sections.map((section) => (
              <article key={section.title} className="premium-glass-card p-6" data-reveal>
                <h2 className="premium-title text-[clamp(1.2rem,1rem+0.4vw,1.5rem)]">{section.title}</h2>
                <p className="premium-section__lede mt-3 text-sm">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PremiumPageFrame>
  );
}
