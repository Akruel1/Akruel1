"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/content/profile";
import { useI18n } from "@/lib/i18n";
import { prefersReducedMotion } from "@/lib/motion";
import { withBasePath } from "@/lib/site";
import styles from "./Hero.module.css";

export function Hero() {
  const { t } = useI18n();
  const reduce = prefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const yType = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60]);

  return (
    <section
      ref={ref}
      className={`${styles.hero} env-black`}
      data-env="black"
      aria-labelledby="hero-name"
    >
      <motion.div className={styles.media} style={{ y: yImg }} aria-hidden="true">
        <img
          src={withBasePath("/images/texture-industrial.svg")}
          alt=""
          className={styles.texture}
        />
        <div className={styles.mediaWash} />
      </motion.div>

      <p className={`${styles.issue} poster-label`} aria-hidden="true">
        {t.hero.index}
      </p>

      <div className={`container ${styles.stage}`}>
        <p className={`${styles.kicker} poster-label`}>{t.hero.title}</p>

        <motion.h1
          id="hero-name"
          className={styles.name}
          style={{ y: yType }}
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.first}>{profile.nameFirst}</span>
          <span className={styles.last}>
            {profile.nameLast}
            <em className={styles.dot}>.</em>
          </span>
        </motion.h1>

        <div className={styles.footerRow}>
          <p className={styles.intro}>{t.hero.intro}</p>
          <div className={styles.meta}>
            <span className={styles.status}>
              <i aria-hidden="true" />
              {t.hero.status}
            </span>
            <a className="campaign-cta" href="#work">
              {t.hero.cta}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.cobaltSlash} aria-hidden="true" />
      <div className={styles.redBlock} aria-hidden="true" />
    </section>
  );
}
