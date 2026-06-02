"use client";

import { motion, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

export function PremiumTiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const rotateX = useSpring(0, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 18 });
  const lift = useSpring(0, { stiffness: 180, damping: 18 });

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(py * -10);
    rotateY.set(px * 12);
    lift.set(-8);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, y: lift, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
