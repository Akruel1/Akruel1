"use client";

import { useI18n } from "@/lib/i18n";
import styles from "./About.module.css";

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 id="about-title" className="display-l">
            {t.about.headline}
          </h2>
          <div className={styles.copy}>
            {t.about.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <aside className={styles.portrait} aria-label={t.about.portraitLabel}>
          <div className={styles.frame}>
            <span className={styles.corner} aria-hidden="true" />
            <span className={styles.hint}>{t.about.portraitHint}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
