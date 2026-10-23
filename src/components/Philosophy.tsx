"use client";

import { useI18n } from "@/lib/i18n";
import styles from "./Philosophy.module.css";

export function Philosophy() {
  const { t } = useI18n();

  return (
    <section id="approach" className="section" aria-labelledby="philosophy-title">
      <div className="container">
        <p className="eyebrow">{t.philosophy.eyebrow}</p>
        <h2 id="philosophy-title" className="display-l">
          {t.philosophy.headline}
        </h2>
        <p className={`section-lead ${styles.lead}`}>{t.philosophy.lead}</p>

        <div className={styles.layout}>
          {t.philosophy.points.map((point, index) => (
            <article key={point.title} className={styles.point}>
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="display-m">{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
