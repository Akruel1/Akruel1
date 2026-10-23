"use client";

import { useI18n } from "@/lib/i18n";
import styles from "./LocaleSwitcher.module.css";

export function LocaleSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className={styles.switcher} role="group" aria-label={t.locale.label}>
      <button
        type="button"
        className={locale === "en" ? styles.active : undefined}
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        {t.locale.en}
      </button>
      <span className={styles.sep} aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={locale === "ru" ? styles.active : undefined}
        aria-pressed={locale === "ru"}
        onClick={() => setLocale("ru")}
      >
        {t.locale.ru}
      </button>
    </div>
  );
}
