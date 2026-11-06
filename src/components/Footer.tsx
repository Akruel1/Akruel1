"use client";

import { useI18n } from "@/lib/i18n";
import styles from "./Footer.module.css";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          {t.footer.rights}
          <span className={styles.sep}>/</span>
          {t.footer.title}
        </p>
      </div>
    </footer>
  );
}
