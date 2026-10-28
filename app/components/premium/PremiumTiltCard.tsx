import type { ReactNode } from "react";

/**
 * Formerly a 3D mouse-tilt card. The premium enhancement pass replaced the tilt with a
 * calm CSS hover lift (see `.premium-lift` in premium-enhancement.css) so cards feel
 * refined rather than gimmicky and keep working the same on touch screens.
 */
export function PremiumTiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`premium-lift ${className}`.trim()}>{children}</div>;
}
