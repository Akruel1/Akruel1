"use client";

import { profile } from "@/content/profile";
import { useI18n } from "@/lib/i18n";
import { withBasePath } from "@/lib/site";
import styles from "./Hero.module.css";

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      className={`${styles.hero} env-black`}
      data-env="black"
      data-scene="hero"
      aria-labelledby="hero-name"
    >
      <div
        className={styles.media}
        data-parallax="90"
        data-parallax-trigger="[data-scene='hero']"
        aria-hidden="true"
      >
        <img
          src={withBasePath("/images/texture-industrial.svg")}
          alt=""
          className={styles.texture}
        />
        <div className={styles.mediaWash} />
      </div>

      <p className={`${styles.issue} poster-label`} data-hero-in aria-hidden="true">
        {t.hero.index}
      </p>

      <div className={`container ${styles.stage}`}>
        <p className={`${styles.kicker} poster-label`} data-hero-in>
          {t.hero.title}
        </p>

        <h1 id="hero-name" className={styles.name}>
          <span className={styles.first} data-hero-in data-clip>
            {profile.nameFirst}
          </span>
          <span className={styles.last} data-hero-in data-clip>
            {profile.nameLast}
            <em className={styles.dot}>.</em>
          </span>
        </h1>

        <div className={styles.footerRow} data-hero-in>
          <p className={styles.intro}>{t.hero.intro}</p>
          <div className={styles.meta}>
            <span className={styles.status}>
              <i aria-hidden="true" />
              {t.hero.status}
            </span>
            <a className="campaign-cta" href="#work">
              {t.hero.cta}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.cobaltSlash} data-hero-slash aria-hidden="true" />
      <div className={styles.redBlock} data-hero-in aria-hidden="true" />
    </section>
  );
}
