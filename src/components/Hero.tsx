"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { prefersReducedMotion } from "@/lib/motion";
import { LiquidScene } from "./liquid/LiquidScene";
import styles from "./Hero.module.css";

export function Hero() {
  const { t } = useI18n();
  const reduce = prefersReducedMotion();
  const [first, ...rest] = t.hero.name.split(" ");
  const last = rest.join(" ") || first;

  return (
    <section className={styles.hero} aria-labelledby="hero-name">
      <div className={styles.stage} aria-hidden="true">
        <LiquidScene className={styles.canvas} variant="twist" />
        <div className={styles.bloom} />
        <div className={styles.veil} />
      </div>

      <div className={`container ${styles.content}`}>
        <motion.p
          className={styles.role}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.hero.title}
          <span className={styles.roleArrow} aria-hidden="true">
            {" →"}
          </span>
        </motion.p>

        <motion.h1
          id="hero-name"
          className={styles.name}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08 }}
        >
          <span className={styles.nameLine}>{first}</span>
          <span className={`${styles.nameLine} ${styles.nameOffset}`}>{last}</span>
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
          <a className={`btn ${styles.cta}`} href="#work">
            {t.hero.cta}
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </motion.div>
      </div>

      <div className={styles.scroll} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span>{t.hero.scroll}</span>
      </div>

      <ol className={styles.pager} aria-label="Sections">
        {t.hero.pager.map((item) => (
          <li key={item.n}>
            <span className={styles.pagerN}>{item.n}</span>
            <span className={styles.pagerLabel}>{item.label}</span>
            <span className={styles.pagerDot} aria-hidden="true">
              →
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
