"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import styles from "./SelectedWork.module.css";

export function SelectedWork() {
  const { t } = useI18n();
  const { items } = t.work;

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <p className="eyebrow">{t.work.eyebrow}</p>
        <h2 id="work-title" className="display-l">
          {t.work.headline}
        </h2>
        <p className="section-lead">{t.work.lead}</p>

        <div className={styles.list}>
          <article className={styles.case}>
            <div className={styles.meta}>
              <span className={styles.status}>{t.work.statusConcept}</span>
              <span className={styles.org}>{items.arax.org}</span>
            </div>
            <h3 className={styles.name}>{items.arax.name}</h3>
            <p className={styles.tagline}>{items.arax.tagline}</p>
            <p className={styles.summary}>{items.arax.summary}</p>
            <ul className={styles.focus}>
              {items.arax.focus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link className="btn" href="/work/arax/">
              {t.work.readCase}
            </Link>
          </article>

          <article className={`${styles.case} ${styles.caseOffset}`}>
            <div className={styles.meta}>
              <span className={styles.status}>{t.work.statusApplied}</span>
              <span className={styles.org}>{items.swissremit.org}</span>
            </div>
            <h3 className={styles.name}>{items.swissremit.name}</h3>
            <p className={styles.tagline}>{items.swissremit.tagline}</p>
            <p className={styles.summary}>{items.swissremit.summary}</p>
            <ul className={styles.focus}>
              {items.swissremit.focus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link className="btn" href="/work/swissremit-orbox/">
              {t.work.readCase}
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
