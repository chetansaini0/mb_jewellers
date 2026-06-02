import Image from "next/image";
import Link from "next/link";
import { FooterLanguageSwitcher } from "@/app/components/FooterLanguageSwitcher";
import { SocialIconFacebook, SocialIconInstagram } from "@/app/components/SocialIcons";
import { socialLinks } from "@/app/lib/siteData";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-white)] text-[var(--color-ink)]">
      <div className="site-max grid gap-10 py-14 site-px sm:grid-cols-2 lg:grid-cols-4">
        <FooterBrand />
        <FooterContact />
        <FooterHours />
        <FooterLanguageSwitcher />
      </div>
      <div className="border-t border-[var(--color-border)] site-px py-6 text-center text-xs text-[var(--color-ink-muted)]">
        © {new Date().getFullYear()} MB Jewellers. All rights reserved.
      </div>
    </footer>
  );
}

function FooterBrand() {
  return (
    <div>
      <Image src="/mb-jewellers-logo.png" alt="MB Jewellers logo" width={896} height={768} className="h-16 w-auto" />
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-ink-muted)]">
        Fine jewellery shaped with Rajasthani heritage, meenakari-inspired color, and modern luxury finishing for every
        celebration.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink-muted)] transition hover:border-[var(--color-rose)] hover:text-[var(--color-rose)]"
          aria-label="MB Jewellers on Instagram"
        >
          <SocialIconInstagram className="h-5 w-5" />
        </a>
        <a
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink-muted)] transition hover:border-[var(--color-rose)] hover:text-[var(--color-rose)]"
          aria-label="MB Jewellers on Facebook"
        >
          <SocialIconFacebook className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

function FooterContact() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-rose)]">Contact</p>
      <ul className="mt-4 space-y-2 text-sm text-[var(--color-ink-muted)]">
        <li>MB Jewellers Studio, Heritage Bazaar District</li>
        <li>
          <Link href="mailto:hello@mbjewellers.example" className="transition hover:text-[var(--color-rose)]">
            hello@mbjewellers.example
          </Link>
        </li>
        <li>
          <Link href="tel:+0000000000" className="transition hover:text-[var(--color-rose)]">
            +00 000 000 0000
          </Link>
        </li>
      </ul>
    </div>
  );
}

function FooterHours() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-rose)]">Store Hours</p>
      <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-muted)]">
        Mon-Sat: 10:00 - 19:00
        <br />
        Sunday: By appointment
      </p>
    </div>
  );
}
