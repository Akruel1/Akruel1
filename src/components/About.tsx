"use client";

import { profile } from "@/content/profile";
import { useI18n } from "@/lib/i18n";
import { withBasePath } from "@/lib/site";
import { LiquidScene } from "./liquid/LiquidScene";
import styles from "./About.module.css";

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" className={`section ${styles.section}`} aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 id="about-title" className={styles.headline}>
            {t.about.headline}
          </h2>
          <p className={styles.titleLine}>{t.about.titleLine}</p>
          <div className={styles.body}>
            {t.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className={styles.approach}>
            <h3>{t.about.approachTitle}</h3>
            <ul>
              {t.about.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.pillars}>
            {t.approach.pillars.map((pillar) => (
              <article key={pillar.title}>
                <h4>{pillar.title}</h4>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.media}>
          <div className={styles.orbWrap} aria-hidden="true">
            <LiquidScene className={styles.orb} variant="orb" interactive={false} />
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
          </figure>
        </div>
      </div>
    </section>
  );
}
