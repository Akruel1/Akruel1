"use client";

import { useI18n } from "@/lib/i18n";
import styles from "./Footer.module.css";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} env-black`} data-env="black">
      <div className={`container ${styles.inner}`}>
        <p>
          {t.footer.rights}
          <span className={styles.sep}>/</span>
          {t.footer.title}
        </p>
        <p className={styles.year}>{year}</p>
      </div>
    </footer>
  );
}
