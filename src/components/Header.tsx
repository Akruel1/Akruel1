"use client";

import Link from "next/link";
import { useState } from "react";
import { profile } from "@/content/profile";
import { useI18n } from "@/lib/i18n";
import { LocaleSwitcher } from "./LocaleSwitcher";
import styles from "./Header.module.css";

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} onClick={close}>
          <span className={styles.mark}>{profile.mark}</span>
          <span className={styles.brandName}>{profile.name}</span>
        </Link>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`} aria-label="Primary">
          <Link href="/#work" className={styles.link} onClick={close}>
            {t.nav.work}
          </Link>
          <Link href="/#about" className={styles.link} onClick={close}>
            {t.nav.about}
          </Link>
          <Link href="/#contact" className={styles.link} onClick={close}>
            {t.nav.contact}
          </Link>
          <div className={styles.mobileLocale}>
            <LocaleSwitcher />
          </div>
        </nav>

        <div className={styles.desktopLocale}>
          <LocaleSwitcher />
        </div>

        <button
          type="button"
          className={styles.burger}
          aria-expanded={open}
          aria-label={t.nav.menu}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
