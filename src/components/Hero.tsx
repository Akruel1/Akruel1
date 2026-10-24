"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { prefersReducedMotion } from "@/lib/motion";
import { LiquidScene } from "./liquid/LiquidScene";
import { Magnetic } from "./Magnetic";
import styles from "./Hero.module.css";

export function Hero() {
  const { t } = useI18n();
  const reduce = prefersReducedMotion();
  const structureRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const view = Math.min(window.innerHeight, 900);
      // As hero leaves, harden chrome into structure (matter → structure)
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.55)));
      structureRef.current = progress;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      aria-labelledby="hero-name"
    >
      <div className={styles.stage} aria-hidden="true">
        <LiquidScene className={styles.canvas} structureRef={structureRef} />
        <div className={styles.grain} />
        <div className={styles.veil} />
      </div>

      <div className={styles.composition}>
        <motion.p
          className={styles.role}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {t.hero.title}
        </motion.p>

        <motion.h1
          id="hero-name"
          className={styles.name}
          initial={reduce ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.nameLine}>{t.hero.nameFirst}</span>
          <span className={styles.nameLine}>{t.hero.nameLast}</span>
        </motion.h1>

        <motion.p
          className={styles.headline}
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35 }}
        >
          {t.hero.headlineLines.map((line, i) => (
            <span key={line} className={i === 1 ? styles.accent : undefined}>
              {line}
            </span>
          ))}
        </motion.p>

        <motion.p
          className={styles.intro}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {t.hero.intro}
        </motion.p>

        <div className={styles.actions}>
          <Magnetic>
            <a className="btn" href="#arax">
              {t.hero.ctaWork}
            </a>
          </Magnetic>
          <Magnetic>
            <a className="btn btn-ghost" href="#contact">
              {t.hero.ctaContact}
            </a>
          </Magnetic>
        </div>

        <p className={styles.hint} aria-hidden="true">
          {t.hero.scrollHint}
        </p>
      </div>
    </section>
  );
}
