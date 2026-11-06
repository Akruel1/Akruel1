"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import styles from "./Work.module.css";

export function Work() {
  const { t } = useI18n();
  const { items } = t.work;

  const rows = [
    { ...items.arax, href: "/work/arax/" },
    { ...items.orbox, href: "/work/orbox/" },
  ];

  return (
    <section id="work" className={`section ${styles.section}`} aria-labelledby="work-title">
      <div className="container">
        <header className={styles.head}>
          <p className="section-num">01 — {t.work.eyebrow}</p>
          <h2 id="work-title" className={styles.headline}>
            {t.work.headline}
          </h2>
          <p className={styles.lead}>{t.work.lead}</p>
        </header>

        <ul className={styles.list}>
          {rows.map((row) => (
            <li key={row.name} className={styles.row}>
              <Link href={row.href} className={styles.link}>
                <span className={styles.index}>{row.index}</span>
                <span className={styles.main}>
                  <span className={styles.name}>{row.name}</span>
                  <span className={styles.tagline}>{row.tagline}</span>
                </span>
                <span className={styles.summary}>{row.summary}</span>
                <span className={styles.action}>
                  <span className={styles.actionLabel}>{t.work.viewCase}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
