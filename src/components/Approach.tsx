"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import styles from "./Approach.module.css";

export function Approach() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  return (
    <section id="approach" className={`section ${styles.section}`} aria-labelledby="approach-title">
      <div className="container">
        <p className="eyebrow">{t.approach.eyebrow}</p>
        <h2 id="approach-title" className="display-l">
          {t.approach.headline}
        </h2>
        <p className="lead">{t.approach.lead}</p>

        <div className={styles.beats}>
          {t.approach.beats.map((beat, i) => (
            <motion.article
              key={beat.title}
              className={styles.beat}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <span className={styles.idx} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display-m">{beat.title}</h3>
              <p>{beat.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
