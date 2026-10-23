"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <section className="section" style={{ paddingTop: "calc(var(--header-h) + 3rem)" }}>
      <div className="container">
        <p className="eyebrow">404</p>
        <h1 className="display-l">{t.notFound.title}</h1>
        <p className="lead">{t.notFound.body}</p>
        <div className="btn-row">
          <Link className="btn" href="/">
            {t.notFound.home}
          </Link>
        </div>
      </div>
    </section>
  );
}
