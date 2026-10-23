"use client";

import { useI18n } from "@/lib/i18n";
import styles from "./Capabilities.module.css";

export function Capabilities() {
  const { t } = useI18n();

  return (
    <section
      id="capabilities"
      className={`section ${styles.section}`}
      aria-labelledby="capabilities-title"
    >
      <div className="container">
        <p className="eyebrow">{t.capabilities.eyebrow}</p>
        <h2 id="capabilities-title" className="display-l">
          {t.capabilities.headline}
        </h2>
        <div className={styles.groups}>
          {t.capabilities.groups.map((group) => (
            <div key={group.title} className={styles.group}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
