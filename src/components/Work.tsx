"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import styles from "./Work.module.css";

export function Work() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const { items } = t.work;

  return (
    <section id="work" className={`section ${styles.section}`} aria-labelledby="work-title">
      <div className="container">
        <p className="eyebrow">{t.work.eyebrow}</p>
        <h2 id="work-title" className="display-l">
          {t.work.headline}
        </h2>
        <p className="lead">{t.work.lead}</p>

        <div className={styles.list}>
          <motion.article
            className={styles.project}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65 }}
          >
            <Link href="/work/arax/" className={styles.panel}>
              <div className={styles.glow} aria-hidden="true" />
              <div className={styles.meta}>
                <span>{items.arax.status}</span>
                <span>{items.arax.org}</span>
              </div>
              <h3>{items.arax.name}</h3>
              <p className={styles.tag}>{items.arax.tagline}</p>
              <p className={styles.summary}>{items.arax.summary}</p>
              <span className={styles.cta}>{t.work.explore}</span>
            </Link>
          </motion.article>

          <motion.article
            className={`${styles.project} ${styles.offset}`}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            <Link href="/work/orbox/" className={styles.panel}>
              <div className={`${styles.glow} ${styles.glowAlt}`} aria-hidden="true" />
              <div className={styles.meta}>
                <span>{items.orbox.status}</span>
                <span>{items.orbox.org}</span>
              </div>
              <h3>{items.orbox.name}</h3>
              <p className={styles.tag}>{items.orbox.tagline}</p>
              <p className={styles.summary}>{items.orbox.summary}</p>
              <span className={styles.cta}>{t.work.explore}</span>
            </Link>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
