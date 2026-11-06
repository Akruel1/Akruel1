"use client";

import { useI18n } from "@/lib/i18n";
import { LiquidScene } from "./liquid/LiquidScene";
import styles from "./Capabilities.module.css";

export function Capabilities() {
  const { t } = useI18n();

  return (
    <section
      id="tech"
      className={`section ${styles.section}`}
      aria-labelledby="tech-title"
    >
      <div className={`container ${styles.grid}`}>
        <div>
          <p className="eyebrow">{t.capabilities.eyebrow} —</p>
          <h2 id="tech-title" className={styles.headline}>
            {t.capabilities.headline}
          </h2>
          <p className="lead">{t.capabilities.lead}</p>

          <div className={styles.groups}>
            {t.capabilities.groups.map((group) => (
              <div key={group.title} className={styles.group}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="tag">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.process}>
            <p className="eyebrow">{t.process.eyebrow}</p>
            <h3 className={styles.processTitle}>{t.process.headline}</h3>
            <ol>
              {t.process.steps.map((step) => (
                <li key={step.n}>
                  <span>{step.n}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <LiquidScene className={styles.scene} variant="crescent" interactive={false} />
        </div>
      </div>
    </section>
  );
}
