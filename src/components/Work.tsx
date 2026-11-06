"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { LiquidScene } from "./liquid/LiquidScene";
import styles from "./Work.module.css";

export function Work() {
  const { t } = useI18n();
  const { items } = t.work;

  return (
    <section id="work" className={`section ${styles.section}`} aria-labelledby="work-title">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="eyebrow">{t.work.eyebrow} —</p>
            <h2 id="work-title" className={styles.headline}>
              {t.work.headline}
            </h2>
          </div>
          <p className={styles.lead}>{t.work.lead}</p>
        </div>

        <div className={styles.list}>
          <article className={styles.card}>
            <div className={styles.copy}>
              <p className={styles.index}>{items.arax.index}</p>
              <h3>{items.arax.name}</h3>
              <p className={styles.tagline}>{items.arax.tagline}</p>
              <p className={styles.summary}>{items.arax.summary}</p>
              <Link className="btn" href="/work/arax/">
                {t.work.viewCase}
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
            <div className={styles.visual}>
              <LiquidScene className={styles.scene} variant="shard" interactive={false} />
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.copy}>
              <p className={styles.index}>{items.orbox.index}</p>
              <h3>{items.orbox.name}</h3>
              <p className={styles.tagline}>{items.orbox.tagline}</p>
              <p className={styles.summary}>{items.orbox.summary}</p>
              <Link className="btn" href="/work/orbox/">
                {t.work.viewCase}
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
            <div className={styles.visual}>
              <LiquidScene className={styles.scene} variant="crystal" interactive={false} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
