"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SystemOrbit } from "./SystemOrbit";
import styles from "./Hero.module.css";

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  return (
    <section className={styles.hero} aria-labelledby="hero-name">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <motion.p
            className={styles.title}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.hero.title}
          </motion.p>
          <motion.h1
            id="hero-name"
            className={`display-xl ${styles.name}`}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.hero.name}
          </motion.h1>
          <p className={styles.also}>{t.hero.also}</p>
          <p className={styles.headline}>{t.hero.headline}</p>
          <p className={styles.intro}>{t.hero.intro}</p>
          <div className="btn-row">
            <a className="btn btn-primary" href="#work">
              {t.hero.ctaWork}
            </a>
            <a className="btn" href="#contact">
              {t.hero.ctaContact}
            </a>
          </div>
        </div>

        <motion.div
          className={styles.visual}
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <SystemOrbit />
        </motion.div>
      </div>

      <a href="#approach" className={styles.scroll}>
        <span>{t.hero.scroll}</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </a>
    </section>
  );
}
