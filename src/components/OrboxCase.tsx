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
      <div className="container">
        <p className={styles.back}>
          <Link href="/#work">{c.back}</Link>
        </p>
        <p className={styles.status}>{c.status}</p>
        <h1 className="display-xl">{c.title}</h1>
        <p className={styles.subtitle}>{c.subtitle}</p>
        <p className={styles.intro}>{c.intro}</p>

        <div className={styles.sections}>
          {c.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>

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
