"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function PremiumLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), 1400);
    window.sessionStorage.setItem("mb-loader-seen", "1");
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="premium-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="premium-loader__glow" aria-hidden />
          <motion.p
            className="premium-loader__mark"
            initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
