"use client";

import Link from "next/link";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { useI18n } from "@/lib/i18n";
import styles from "./CaseStudy.module.css";

type CaseKey = "caseArax" | "caseSwiss";

export function CaseStudy({ which }: { which: CaseKey }) {
  const { t } = useI18n();
  const content = t[which];

  return (
    <article className={styles.page}>
      <div className="container">
        <p className={styles.back}>
          <Link href="/#work">{content.back}</Link>
        </p>
        <p className={styles.status}>{content.status}</p>
        <h1 className="display-xl">{content.title}</h1>
        <p className={styles.subtitle}>{content.subtitle}</p>
        <p className={styles.intro}>{content.intro}</p>

        <div className={styles.sections}>
          {content.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>

        <ArchitectureDiagram
          title={content.architecture.title}
          caption={content.architecture.caption}
          nodes={content.architecture.nodes}
          edges={content.architecture.edges}
        />

        <p className={styles.stack}>{content.stackNote}</p>
      </div>
    </article>
  );
}
