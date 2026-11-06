"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { prefersReducedMotion } from "@/lib/motion";
import { LiquidScene } from "./liquid/LiquidScene";
import styles from "./Hero.module.css";

export function Hero() {
  const { t } = useI18n();
  const reduce = prefersReducedMotion();

  return (
    <section className={styles.hero} aria-labelledby="hero-name">
      <div className={styles.stage} aria-hidden="true">
        <LiquidScene className={styles.canvas} variant="twist" />
        <div className={styles.veil} />
      </div>

      <div className={`container ${styles.content}`}>
        <motion.p
          className={styles.role}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.hero.title} —
        </motion.p>

        <motion.h1
          id="hero-name"
          className={styles.name}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08 }}
        >
          {t.hero.name}
        </motion.h1>

        <motion.p
          className={styles.intro}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {t.hero.intro}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a className="btn" href="#work">
            {t.hero.cta}
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </motion.div>
      </div>

      <p className={styles.scroll} aria-hidden="true">
        {t.hero.scroll}
      </p>

      <ol className={styles.pager} aria-label="Sections">
        {t.hero.pager.map((item) => (
          <li key={item.n}>
            <span>{item.n}</span> {item.label}
          </li>
        ))}
      </ol>
    </section>
  );
}
