"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { withBasePath } from "@/lib/site";
import styles from "./Work.module.css";

export function Work() {
  const { t } = useI18n();
  const { items } = t.work;

  return (
    <div id="work" className={styles.work}>
      <header
        className={`${styles.bridge} env-ivory`}
        data-env="ivory"
        data-scene="work"
        data-curtain="wipe"
      >
        <div className="container">
          <p className="poster-label" data-kine="1">
            {t.work.eyebrow}
          </p>
          <h2 className={styles.bridgeTitle} data-clip>
            {t.work.headline}
          </h2>
          <p className={styles.bridgeLead} data-kine="1.2">
            {t.work.lead}
          </p>
        </div>
      </header>

      <Campaign
        env="ivory"
        scene="arax"
        index={items.arax.index}
        name={items.arax.name}
        tagline={items.arax.tagline}
        summary={items.arax.summary}
        href="/work/arax/"
        cta={t.work.viewCase}
        texture="/images/texture-arch.svg"
        side="right"
        accent="cobalt"
      />

      <Campaign
        env="cobalt"
        scene="orbox"
        index={items.orbox.index}
        name={items.orbox.name}
        tagline={items.orbox.tagline}
        summary={items.orbox.summary}
        href="/work/orbox/"
        cta={t.work.viewCase}
        texture="/images/texture-metal.svg"
        side="left"
        accent="red"
      />
    </div>
  );
}

function Campaign({
  env,
  scene,
  index,
  name,
  tagline,
  summary,
  href,
  cta,
  texture,
  side,
  accent,
}: {
  env: "ivory" | "cobalt";
  scene: "arax" | "orbox";
  index: string;
  name: string;
  tagline: string;
  summary: string;
  href: string;
  cta: string;
  texture: string;
  side: "left" | "right";
  accent: "cobalt" | "red";
  curtain?: string;
}) {
  return (
    <article
      className={`${styles.campaign} ${styles[side]} env-${env}`}
      data-env={env}
      data-scene={scene}
      data-pin="campaign"
    >
      <div className={styles.visual} data-campaign-visual aria-hidden="true">
        <img src={withBasePath(texture)} alt="" />
        <div className={`${styles.stamp} ${styles[accent]}`} />
      </div>

      <div className={`container ${styles.copy}`} data-campaign-copy>
        <p className={`${styles.index} poster-label`} data-kine="0.8">
          {index} / Campaign
        </p>
        <h3 className={styles.name} data-clip>
          {name}
        </h3>
        <p className={styles.tagline} data-kine="1">
          {tagline}
        </p>
        <p className={styles.summary} data-kine="1.15">
          {summary}
        </p>
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
