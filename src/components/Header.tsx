"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { LocaleSwitcher } from "./LocaleSwitcher";
import styles from "./Header.module.css";

const links = [
  { href: "/#work", key: "work" as const },
  { href: "/#approach", key: "approach" as const },
  { href: "/#capabilities", key: "capabilities" as const },
  { href: "/#about", key: "about" as const },
  { href: "/#contact", key: "contact" as const },
];

export function Header() {
  const { t } = useI18n();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.mark} aria-hidden="true" />
          <span>Andrey Tessa</span>
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
