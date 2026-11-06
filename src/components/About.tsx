"use client";

import { profile } from "@/content/profile";
import { useI18n } from "@/lib/i18n";
import { withBasePath } from "@/lib/site";
import styles from "./About.module.css";

export function About() {
  const { t } = useI18n();

  return (
    <section
      id="about"
      className={`${styles.section} env-red`}
      data-env="red"
      data-scene="about"
      data-curtain="mask"
      aria-labelledby="about-title"
    >
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className="poster-label" data-kine="1">
            {t.about.eyebrow}
          </p>
          <h2 id="about-title" className={styles.headline} data-clip>
            {t.about.headline}
          </h2>
          <p className={styles.titleLine} data-kine="1.1">
            {t.about.titleLine}
          </p>
          <div className={styles.body}>
            {t.about.body.map((p) => (
              <p key={p} data-kine="1.2">
                {p}
              </p>
            ))}
          </div>
        </div>

        <figure
          className={styles.portrait}
          data-parallax="-50"
          data-parallax-trigger="[data-scene='about']"
        >
          <img
            src={withBasePath(profile.portrait)}
            alt={profile.name}
            width={720}
            height={912}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="poster-label">
            {profile.name} — {profile.titles.primary}
          </figcaption>
        </figure>

        <div className={styles.data}>
          <h3 className={styles.dataTitle}>{t.about.approachTitle}</h3>
          <ol>
            {t.about.approach.map((item, i) => (
              <li key={item} data-kine={1 + i * 0.1}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>

          <div className={styles.pillars}>
            {t.approach.pillars.map((pillar) => (
              <article key={pillar.title} data-kine="1.15">
                <h4>{pillar.title}</h4>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <p className={`${styles.giant} poster-label`} aria-hidden="true">
        Profile
      </p>
    </section>
  );
}
