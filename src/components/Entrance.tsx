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

type Props = { onDone: () => void };

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
    }, 1400);
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
          transition={{ duration: 0.4 }}
          role="dialog"
          aria-label="Introduction"
        >
          <div className={styles.void} />
          <motion.div
            className={styles.slash}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: [0, 1, 0.5] }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className={styles.shard}
            initial={{ opacity: 0, rotate: -18, x: -40 }}
            animate={{ opacity: 0.95, rotate: -8, x: 0 }}
            transition={{ delay: 0.25, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.p
            className={styles.name}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ delay: 0.45, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
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
