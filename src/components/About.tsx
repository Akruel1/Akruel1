"use client";

import { profile } from "@/content/profile";
import { useI18n } from "@/lib/i18n";
import { withBasePath } from "@/lib/site";
import styles from "./About.module.css";

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" className={`section ${styles.section}`} aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 id="about-title" className="display-l">
            {t.about.headline}
          </h2>
          <div className={styles.copy}>
            {t.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <figure className={styles.portrait}>
          <div className={styles.frame}>
            {/* Plain img: next/image omitted basePath under static export */}
            <img
              src={withBasePath(profile.portrait)}
              alt={profile.name}
              width={720}
              height={912}
              className={styles.img}
              loading="lazy"
              decoding="async"
            />
            <span className={styles.sheen} aria-hidden="true" />
          </div>
        </figure>
      </div>
    </section>
  );
}
