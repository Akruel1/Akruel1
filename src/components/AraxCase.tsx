"use client";

import Link from "next/link";
import { ArchitectureReveal } from "./ArchitectureReveal";
import { LiquidScene } from "./liquid/LiquidScene";
import { useI18n } from "@/lib/i18n";
import styles from "./CasePage.module.css";

export function AraxCase() {
  const { t } = useI18n();
  const c = t.caseArax;

  return (
    <article className={styles.page}>
      <div className={`container ${styles.top}`}>
        <div>
          <p className={styles.back}>
            <Link href="/#work">{c.back}</Link>
          </p>
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className={styles.title}>{c.title}</h1>
          <p className={styles.subtitle}>{c.subtitle}</p>
          <p className={styles.intro}>{c.intro}</p>
          <ul className={styles.tags}>
            {c.tags.map((tag) => (
              <li key={tag}>
                <span className="tag">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <LiquidScene className={styles.scene} variant="shard" interactive={false} />
        </div>
      </div>

      <div className={`container ${styles.body}`}>
        <p className="eyebrow">{c.bigPicture}</p>
        <h2 className={styles.bigLead}>{c.bigPictureLead}</h2>

        <ArchitectureReveal
          title={c.architecture.title}
          caption={c.architecture.caption}
          nodes={c.architecture.nodes}
          edges={c.architecture.edges}
        />

        <p className={styles.note}>{c.implementedNote}</p>
      </div>

      <div className="mountain" aria-hidden="true" />
    </article>
  );
}
