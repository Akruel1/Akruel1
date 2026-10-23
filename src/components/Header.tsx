"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Magnetic } from "./Magnetic";
import styles from "./Header.module.css";

export function Header() {
  const { t } = useI18n();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Magnetic strength={0.18}>
          <Link href="/" className={styles.brand}>
            <span className={styles.mark} aria-hidden="true" />
            Andrey Tessa
          </Link>
        </Magnetic>
        <nav className={styles.nav} aria-label="Primary">
          <Magnetic strength={0.22}>
            <Link href="/#work" className={styles.link}>
              {t.nav.work}
            </Link>
          </Magnetic>
          <Magnetic strength={0.22}>
            <Link href="/#about" className={styles.link}>
              {t.nav.about}
            </Link>
          </Magnetic>
          <Magnetic strength={0.22}>
            <Link href="/#contact" className={styles.link}>
              {t.nav.contact}
            </Link>
          </Magnetic>
        </nav>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
