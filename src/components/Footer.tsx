"use client";

import { useI18n } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import styles from "./Footer.module.css";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>{t.footer.rights}</p>
        <p>
          <a href={SITE.githubUrl}>{t.footer.built}</a>
        </p>
      </div>
    </footer>
  );
}
