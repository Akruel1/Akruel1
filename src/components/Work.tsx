"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { withBasePath } from "@/lib/site";
import styles from "./Work.module.css";

export function Work() {
  return (
    <div id="work" className={styles.work}>
      <WorkBridge />
      <CampaignArax />
      <CampaignOrbox />
    </div>
  );
}

export function WorkBridge() {
  const { t } = useI18n();
  return (
    <header
      id="work"
      className={`${styles.bridge} env-ivory`}
      data-env="ivory"
      data-scene="work"
      data-stage-layer="work"
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
  );
}

export function CampaignArax() {
  const { t } = useI18n();
  const item = t.work.items.arax;
  return (
    <Campaign
      env="ivory"
      scene="arax"
      index={item.index}
      name={item.name}
      tagline={item.tagline}
      summary={item.summary}
      href="/work/arax/"
      cta={t.work.viewCase}
      texture="/images/texture-arch.svg"
      side="right"
      accent="cobalt"
    />
  );
}

export function CampaignOrbox() {
  const { t } = useI18n();
  const item = t.work.items.orbox;
  return (
    <Campaign
      env="cobalt"
      scene="orbox"
      index={item.index}
      name={item.name}
      tagline={item.tagline}
      summary={item.summary}
      href="/work/orbox/"
      cta={t.work.viewCase}
      texture="/images/texture-metal.svg"
      side="left"
      accent="red"
    />
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
}) {
  return (
    <article
      className={`${styles.campaign} ${styles[side]} env-${env}`}
      data-env={env}
      data-scene={scene}
      data-side={side}
      data-stage-layer={scene}
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
