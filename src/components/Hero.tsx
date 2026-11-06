"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/profile";
import { useI18n } from "@/lib/i18n";
import { prefersReducedMotion } from "@/lib/motion";
import styles from "./Hero.module.css";

export function Hero() {
  const { t, locale } = useI18n();
  const reduce = prefersReducedMotion();
  const year = new Date().getFullYear();

  return (
    <section className={styles.hero} aria-labelledby="hero-name">
      <div className={`container ${styles.inner}`}>
        <div className={styles.meta}>
          <span>{t.hero.title}</span>
          <span className={styles.metaSep} aria-hidden="true">
            /
          </span>
          <span>{locale.toUpperCase()}</span>
          <span className={styles.metaSep} aria-hidden="true">
            /
          </span>
          <span>{year}</span>
          <span className={styles.metaRight}>{t.hero.index}</span>
        </div>

        <motion.h1
          id="hero-name"
          className={styles.name}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className={styles.first}>{profile.nameFirst}</span>
          <span className={styles.last}>
            {profile.nameLast}
            <span className={styles.period} aria-hidden="true">
              .
            </span>
          </span>
        </motion.h1>

        <div className={styles.bottom}>
          <motion.p
            className={styles.intro}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {t.hero.intro}
          </motion.p>

          <div className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>{t.hero.status}</span>
          </div>

          <a className={`btn ${styles.cta}`} href="#work">
            {t.hero.cta}
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
