"use client";

import { useI18n } from "@/lib/i18n";
import styles from "./Process.module.css";

export function Process() {
  const { t } = useI18n();

  return (
    <section id="process" className="section" aria-labelledby="process-title">
      <div className="container">
        <p className="eyebrow">{t.process.eyebrow}</p>
        <h2 id="process-title" className="display-l">
          {t.process.headline}
        </h2>
        <p className="section-lead">{t.process.lead}</p>

        <ol className={styles.steps}>
          {t.process.steps.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <div className={styles.rail} aria-hidden="true">
                <span className={styles.dot} />
                {index < t.process.steps.length - 1 && <span className={styles.line} />}
              </div>
              <div className={styles.body}>
                <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
