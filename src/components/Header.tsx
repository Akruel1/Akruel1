"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { displayName, profile } from "@/content/profile";
import { useI18n } from "@/lib/i18n";
import { LocaleSwitcher } from "./LocaleSwitcher";
import styles from "./Header.module.css";

function envIsDark(env: string | undefined) {
  return env === "black" || env === "cobalt" || env === "red";
}

export function Header() {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(true);
  const close = () => setOpen(false);
  const brand = displayName(locale);

  useEffect(() => {
    const update = () => {
      const probeY = 56;
      const el = document.elementFromPoint(
        Math.min(120, window.innerWidth / 2),
        probeY,
      ) as HTMLElement | null;
      const host = el?.closest?.("[data-env]") as HTMLElement | null;
      setOnDark(envIsDark(host?.dataset.env) || !host);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header className={`${styles.header} ${onDark ? styles.onDark : styles.onLight}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} onClick={close}>
          <span className={styles.mark}>{profile.mark}</span>
          <span className={styles.brandName}>{brand}</span>
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
