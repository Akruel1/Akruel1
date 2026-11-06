"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/content/profile";
import { useI18n } from "@/lib/i18n";
import { prefersReducedMotion } from "@/lib/motion";
import { withBasePath } from "@/lib/site";
import styles from "./About.module.css";

export function About() {
  const { t } = useI18n();
  const reduce = prefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -40]);

  return (
    <section
      id="about"
      ref={ref}
      className={`${styles.section} env-red`}
      data-env="red"
      aria-labelledby="about-title"
    >
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className="poster-label">{t.about.eyebrow}</p>
          <h2 id="about-title" className={styles.headline}>
            {t.about.headline}
          </h2>
          <p className={styles.titleLine}>{t.about.titleLine}</p>
          <div className={styles.body}>
            {t.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <motion.figure className={styles.portrait} style={{ y }}>
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
        </motion.figure>

        <div className={styles.data}>
          <h3 className={styles.dataTitle}>{t.about.approachTitle}</h3>
          <ol>
            {t.about.approach.map((item, i) => (
              <li key={item}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>

          <div className={styles.pillars}>
            {t.approach.pillars.map((pillar) => (
              <article key={pillar.title}>
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
