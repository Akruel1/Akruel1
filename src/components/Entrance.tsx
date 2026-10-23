"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import {
  hasSeenIntro,
  markIntroSeen,
  prefersReducedMotion,
} from "@/lib/motion";
import styles from "./Entrance.module.css";

type Props = {
  onDone: () => void;
};

export function Entrance({ onDone }: Props) {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || hasSeenIntro()) {
      onDone();
      return;
    }

    setShow(true);
    const ready = window.setTimeout(() => {
      markIntroSeen();
      setShow(false);
      window.setTimeout(onDone, 280);
    }, 1500);

    return () => window.clearTimeout(ready);
  }, [onDone]);

  const skip = () => {
    markIntroSeen();
    setShow(false);
    onDone();
  };

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className={styles.root}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-label="Introduction"
        >
          <div className={styles.void} />
          <motion.div
            className={styles.beam}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 1, 1, 0.35] }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className={styles.glass}
            initial={{ opacity: 0, scale: 0.92, filter: "blur(16px)" }}
            animate={{ opacity: 0.92, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.p
            className={styles.name}
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            Andrey Tessa
          </motion.p>
          <button type="button" className={styles.skip} onClick={skip}>
            {t.entrance.skip}
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
