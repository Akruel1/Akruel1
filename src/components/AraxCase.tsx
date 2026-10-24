"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArchitectureReveal } from "./ArchitectureReveal";
import { useI18n } from "@/lib/i18n";
import styles from "./CasePage.module.css";

export function AraxCase() {
  const { t } = useI18n();
  const c = t.caseArax;
  const reduce = useReducedMotion();

  return (
    <article className={styles.page}>
      <div className="container">
        <p className={styles.back}>
          <Link href="/#arax">{c.back}</Link>
        </p>
        <p className={styles.status}>{c.status}</p>
        <h1 className="display-xl">{c.title}</h1>
        <p className={styles.subtitle}>{c.subtitle}</p>
        <p className={styles.intro}>{c.intro}</p>

        <div className={styles.chapters}>
          {c.chapters.map((chapter, i) => (
            <motion.section
              key={chapter.id}
              id={chapter.id}
              className={styles.chapter}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: Math.min(i * 0.03, 0.2) }}
            >
              <span className={styles.idx} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2>{chapter.title}</h2>
              <p>{chapter.body}</p>
            </motion.section>
          ))}
        </div>

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
