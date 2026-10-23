"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { prefersReducedMotion } from "@/lib/motion";
import { LiquidScene } from "./liquid/LiquidScene";
import { Magnetic } from "./Magnetic";
import styles from "./Hero.module.css";

export function Hero() {
  const { t } = useI18n();
  const reduce = prefersReducedMotion();

  return (
    <section className={styles.hero} aria-labelledby="hero-name">
      <div className={styles.stage} aria-hidden="true">
        <LiquidScene className={styles.canvas} />
        <div className={styles.veil} />
      </div>

      <div className={`container ${styles.content}`}>
        <motion.p
          className={styles.role}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {t.hero.title}
        </motion.p>

        <motion.h1
          id="hero-name"
          className={styles.name}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18 }}
        >
          {t.hero.name}
        </motion.h1>

        <motion.p
          className={styles.headline}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.28 }}
        >
          {t.hero.headlineLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </motion.p>

        <motion.p
          className={styles.intro}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t.hero.intro}
        </motion.p>

        <div className="btn-row">
          <Magnetic>
            <a className="btn" href="#work">
              {t.hero.ctaWork}
            </a>
          </Magnetic>
          <Magnetic>
            <a className="btn btn-ghost" href="#contact">
              {t.hero.ctaContact}
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
