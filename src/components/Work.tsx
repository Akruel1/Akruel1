"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { prefersReducedMotion } from "@/lib/motion";
import { withBasePath } from "@/lib/site";
import styles from "./Work.module.css";

export function Work() {
  const { t } = useI18n();
  const { items } = t.work;
  const reduce = prefersReducedMotion();

  return (
    <div id="work" className={styles.work}>
      <header className={`${styles.bridge} env-ivory`} data-env="ivory">
        <div className="container">
          <p className="poster-label">{t.work.eyebrow}</p>
          <h2 className={styles.bridgeTitle}>{t.work.headline}</h2>
          <p className={styles.bridgeLead}>{t.work.lead}</p>
        </div>
      </header>

      <Campaign
        env="ivory"
        index={items.arax.index}
        name={items.arax.name}
        tagline={items.arax.tagline}
        summary={items.arax.summary}
        href="/work/arax/"
        cta={t.work.viewCase}
        texture="/images/texture-arch.svg"
        side="right"
        reduce={reduce}
        accent="cobalt"
      />

      <Campaign
        env="cobalt"
        index={items.orbox.index}
        name={items.orbox.name}
        tagline={items.orbox.tagline}
        summary={items.orbox.summary}
        href="/work/orbox/"
        cta={t.work.viewCase}
        texture="/images/texture-metal.svg"
        side="left"
        reduce={reduce}
        accent="red"
      />
    </div>
  );
}

function Campaign({
  env,
  index,
  name,
  tagline,
  summary,
  href,
  cta,
  texture,
  side,
  reduce,
  accent,
}: {
  env: "ivory" | "cobalt";
  index: string;
  name: string;
  tagline: string;
  summary: string;
  href: string;
  cta: string;
  texture: string;
  side: "left" | "right";
  reduce: boolean;
  accent: "cobalt" | "red";
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);

  return (
    <article
      ref={ref}
      className={`${styles.campaign} ${styles[side]} env-${env}`}
      data-env={env}
    >
      <motion.div className={styles.visual} style={{ y }} aria-hidden="true">
        <img src={withBasePath(texture)} alt="" />
        <div className={`${styles.stamp} ${styles[accent]}`} />
      </motion.div>

      <div className={`container ${styles.copy}`}>
        <p className={`${styles.index} poster-label`}>
          {index} / Campaign
        </p>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.tagline}>{tagline}</p>
        <p className={styles.summary}>{summary}</p>
        <Link href={href} className="campaign-cta">
          {cta}
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <p className={`${styles.vert} poster-label`} aria-hidden="true">
        {name}
      </p>
    </article>
  );
}
