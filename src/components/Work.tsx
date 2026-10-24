"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import styles from "./Work.module.css";

/** ARAX-only featured work — matter → structure landing. */
export function Work() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  return (
    <section id="arax" className={`section ${styles.section}`} aria-labelledby="arax-title">
      <div className="container">
        <motion.p
          className={styles.transition}
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t.work.transition}
        </motion.p>

        <p className="eyebrow">{t.work.eyebrow}</p>
        <div className={styles.head}>
          <h2 id="arax-title" className={styles.title}>
            {t.work.headline}
          </h2>
          <p className={styles.status}>{t.work.status}</p>
        </div>

        <Link href="/work/arax/" className={styles.panel}>
          <div className={styles.lines} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <p className={styles.tag}>{t.work.tagline}</p>
          <p className={styles.summary}>{t.work.summary}</p>
          <span className={styles.cta}>{t.work.explore}</span>
        </Link>
      </div>
    </section>
  );
}
