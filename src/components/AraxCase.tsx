"use client";

import Link from "next/link";
import { ArchitectureReveal } from "./ArchitectureReveal";
import { useI18n } from "@/lib/i18n";
import { withBasePath } from "@/lib/site";
import styles from "./CasePage.module.css";

export function AraxCase() {
  const { t } = useI18n();
  const c = t.caseArax;

  return (
    <article className={`${styles.page} env-ivory`} data-env="ivory">
      <div className={styles.heroBand}>
        <img
          className={styles.heroImg}
          src={withBasePath("/images/texture-arch.svg")}
          alt=""
          aria-hidden="true"
        />
        <div className={`container ${styles.top}`}>
          <p className={styles.back}>
            <Link href="/#work">{c.back}</Link>
          </p>
          <p className="poster-label">{c.eyebrow}</p>
          <h1 className={styles.title}>{c.title}</h1>
          <p className={styles.subtitle}>{c.subtitle}</p>
        </div>
      </div>

      <div className={`container ${styles.body}`}>
        <p className={styles.intro}>{c.intro}</p>
        <ul className={styles.tags}>
          {c.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <p className="poster-label">{c.bigPicture}</p>
        <h2 className={styles.bigLead}>{c.bigPictureLead}</h2>

        <ArchitectureReveal
          title={c.architecture.title}
          caption={c.architecture.caption}
          nodes={c.architecture.nodes}
          edges={c.architecture.edges}
        />

        <p className={styles.note}>{c.implementedNote}</p>
      </div>
    </article>
  );
}
