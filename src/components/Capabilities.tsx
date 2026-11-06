"use client";

import { useI18n } from "@/lib/i18n";
import styles from "./Capabilities.module.css";

export function Capabilities() {
  const { t } = useI18n();

  return (
    <section id="tech" className={`section ${styles.section}`} aria-labelledby="tech-title">
      <div className="container">
        <header className={styles.head}>
          <p className="section-num">03 — {t.capabilities.eyebrow}</p>
          <h2 id="tech-title" className={styles.headline}>
            {t.capabilities.headline}
          </h2>
          <p className={styles.lead}>{t.capabilities.lead}</p>
        </header>

        <div className={styles.groups}>
          {t.capabilities.groups.map((group, i) => (
            <div key={group.title} className={styles.group}>
              <div className={styles.groupHead}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{group.title}</h3>
              </div>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.process}>
          <p className="section-num">{t.process.eyebrow}</p>
          <h3 className={styles.processTitle}>{t.process.headline}</h3>
          <ol>
            {t.process.steps.map((step) => (
              <li key={step.n}>
                <span className={styles.stepN}>{step.n}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
