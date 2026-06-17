"use client";

import type { ReactNode } from "react";
import { PremiumSectionTitle } from "@/app/components/premium/PremiumSectionTitle";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  warm?: boolean;
  className?: string;
  children: ReactNode;
};

export function PremiumPageSection({
  eyebrow,
  title,
  subtitle,
  align = "left",
  dark = false,
  warm = false,
  className = "",
  children,
}: Props) {
  return (
    <section
      className={`premium-section ${dark ? "premium-section--dark" : ""} ${warm ? "premium-section--warm" : ""} ${className}`.trim()}
    >
      <div className="site-max site-px">
        <PremiumSectionTitle eyebrow={eyebrow} title={title} subtitle={subtitle} align={align} dark={dark} />
        {children}
      </div>
    </section>
  );
}
