"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const LOADER_KEY = "mb-loader-seen";

export function PremiumLoader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.sessionStorage.getItem(LOADER_KEY) !== "1";
  });

  useEffect(() => {
    if (!reduce) return;
    window.sessionStorage.setItem(LOADER_KEY, "1");
  }, [reduce]);

  useEffect(() => {
    if (!visible || reduce) return;

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(LOADER_KEY, "1");
      setVisible(false);
    }, 1400);

    return () => window.clearTimeout(timer);
  }, [visible, reduce]);

  if (!visible || reduce) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="premium-loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: "none" }}
      >
        <div className="premium-loader__glow" aria-hidden />
        <motion.p
          className="premium-loader__mark"
          initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          MB Jewellers
        </motion.p>
        <motion.div
          className="premium-loader__line"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduce ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
      </motion.div>
    </AnimatePresence>
  );
}
