"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const LOADER_KEY = "mb-loader-seen";
const LOADER_MS = 1400;

export function PremiumLoader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(LOADER_KEY) !== "1";
  });

  useEffect(() => {
    if (reduce) {
      window.sessionStorage.setItem(LOADER_KEY, "1");
    }
  }, [reduce]);

  useEffect(() => {
    if (!visible || reduce) return;

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(LOADER_KEY, "1");
      setVisible(false);
    }, LOADER_MS);

    return () => window.clearTimeout(timer);
  }, [visible, reduce]);

  const show = Boolean(visible && !reduce);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="premium-loader"
          className="premium-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ pointerEvents: "none" }}
          aria-hidden
        >
          <div className="premium-loader__glow" aria-hidden />
          <motion.p
            className="premium-loader__mark"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            MB Jewellers
          </motion.p>
          <motion.div
            className="premium-loader__line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
