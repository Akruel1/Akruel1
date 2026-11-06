"use client";

import Link from "next/link";
import { ArchitectureReveal } from "./ArchitectureReveal";
import { useI18n } from "@/lib/i18n";
import { withBasePath } from "@/lib/site";
import styles from "./CasePage.module.css";

export function OrboxCase() {
  const { t } = useI18n();
  const c = t.caseOrbox;

  return (
    <article className={`${styles.page} env-black`} data-env="black">
      <div className={`${styles.heroBand} ${styles.heroDark}`}>
        <img
          className={styles.heroImg}
          src={withBasePath("/images/texture-metal.svg")}
          alt=""
          aria-hidden="true"
        />
        <div className={`container ${styles.top}`}>
          <p className={styles.back}>
            <Link href="/#work">{c.back}</Link>
          </p>
          <p className="poster-label">{c.eyebrow}</p>
          <h1 className={styles.title}>{c.title}</h1>
          <p className={`${styles.subtitle} ${styles.subtitleLight}`}>{c.subtitle}</p>
        </div>
      </div>

      <div className={`container ${styles.body}`}>
        <p className={styles.intro}>{c.intro}</p>
        <ul className={styles.tags}>
          {c.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        {c.sections.map((section) => (
          <section key={section.title} className={styles.block}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}

        <ArchitectureReveal
          title={c.architecture.title}
          caption={c.architecture.caption}
          nodes={c.architecture.nodes}
          edges={c.architecture.edges}
        />
      </div>
    </article>
  );
}
