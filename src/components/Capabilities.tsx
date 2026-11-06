"use client";

import { useI18n } from "@/lib/i18n";
import styles from "./Capabilities.module.css";

export function Capabilities() {
  const { t } = useI18n();

  return (
    <section
      id="tech"
      className={`${styles.section} env-silver`}
      data-env="silver"
      data-scene="tech"
      data-curtain="wipe"
      aria-labelledby="tech-title"
    >
      <div className="container">
        <header className={styles.head}>
          <p className="poster-label" data-kine="1">
            {t.capabilities.eyebrow}
          </p>
          <h2 id="tech-title" className={styles.headline} data-clip>
            {t.capabilities.headline}
          </h2>
          <p className={styles.lead} data-kine="1.15">
            {t.capabilities.lead}
          </p>
        </header>

        <div className={styles.groups}>
          {t.capabilities.groups.map((group, i) => (
            <div key={group.title} className={styles.group} data-kine={1 + i * 0.08}>
              <p className={styles.num}>{String(i + 1).padStart(2, "0")}</p>
              <h3>{group.title}</h3>
              <p className={styles.items}>{group.items.join("  ·  ")}</p>
            </div>
          ))}
        </div>

        <div className={`${styles.process} env-black`} data-env="black" data-curtain="up">
          <p className="poster-label">{t.process.eyebrow}</p>
          <h3 className={styles.processTitle} data-clip>
            {t.process.headline}
          </h3>
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
    </section>
  );
}
