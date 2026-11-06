"use client";

import { profile } from "@/content/profile";
import { useI18n } from "@/lib/i18n";
import { withBasePath } from "@/lib/site";
import styles from "./About.module.css";

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" className={`section ${styles.section}`} aria-labelledby="about-title">
      <div className={`container ${styles.layout}`}>
        <header className={styles.head}>
          <p className="section-num">02 — {t.about.eyebrow}</p>
          <h2 id="about-title" className={styles.headline}>
            {t.about.headline}
          </h2>
          <p className={styles.titleLine}>{t.about.titleLine}</p>
        </header>

        <div className={styles.body}>
          {t.about.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <figure className={styles.portrait}>
          <img
            src={withBasePath(profile.portrait)}
            alt={profile.name}
            width={720}
            height={912}
            loading="lazy"
            decoding="async"
          />
          <figcaption className={styles.caption}>
            {profile.name} — {profile.titles.primary}
          </figcaption>
        </figure>

        <div className={styles.data}>
          <div className={styles.block}>
            <h3>{t.about.approachTitle}</h3>
            <ol>
              {t.about.approach.map((item, i) => (
                <li key={item}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.pillars}>
            {t.approach.pillars.map((pillar, i) => (
              <article key={pillar.title}>
                <p className={styles.pillarN}>{String(i + 1).padStart(2, "0")}</p>
                <h4>{pillar.title}</h4>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
