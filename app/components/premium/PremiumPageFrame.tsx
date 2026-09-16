"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { usePremiumCounter, usePremiumReveal } from "@/app/components/premium/motion/premiumMotion";

export function PremiumPageFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  const pathname = usePathname();

  return (
    <PremiumPageFrameInner key={pathname} className={className}>
      {children}
    </PremiumPageFrameInner>
  );
}

function PremiumPageFrameInner({ children, className = "" }: { children: ReactNode; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  usePremiumReveal(rootRef);
  usePremiumCounter(rootRef);

  return (
    <div ref={rootRef} className={`premium-page ${className}`.trim()}>
      {children}
    </div>
  );
}
