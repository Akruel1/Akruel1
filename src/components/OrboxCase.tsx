"use client";

import Link from "next/link";
import { ArchitectureReveal } from "./ArchitectureReveal";
import { useI18n } from "@/lib/i18n";
import styles from "./CasePage.module.css";

export function OrboxCase() {
  const { t } = useI18n();
  const c = t.caseOrbox;

  return (
    <article className={styles.page}>
      <div className={`container ${styles.top}`}>
        <p className={styles.back}>
          <Link href="/#work">{c.back}</Link>
        </p>
        <p className="section-num">{c.eyebrow}</p>
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

      <div className={`container ${styles.body}`}>
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
