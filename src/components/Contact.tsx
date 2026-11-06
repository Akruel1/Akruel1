"use client";

import { profile } from "@/content/profile";
import { useI18n } from "@/lib/i18n";
import styles from "./Contact.module.css";

export function Contact() {
  const { t } = useI18n();
  const { contact } = profile;

  const channels = [
    { key: "email", ...contact.email, label: "Email" },
    { key: "telegram", ...contact.telegram, label: "Telegram" },
    { key: "github", ...contact.github, label: "GitHub" },
    { key: "linkedin", ...contact.linkedin, label: "LinkedIn" },
  ] as const;

  return (
    <section id="contact" className={`section ${styles.section}`} aria-labelledby="contact-title">
      <div className="container">
        <header className={styles.head}>
          <p className="section-num">04 — {t.contact.eyebrow}</p>
          <h2 id="contact-title" className={styles.headline}>
            {t.contact.headline}
          </h2>
          <a className={`btn ${styles.cta}`} href={`mailto:${contact.email.value}`}>
            {t.contact.cta}
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </header>

        <div className={styles.channels}>
          <h3>{t.contact.channels}</h3>
          <ul className={styles.list}>
            {channels.map((channel) => (
              <li key={channel.key}>
                <span>{channel.label}</span>
                <a
                  href={channel.href}
                  target={channel.key === "email" ? undefined : "_blank"}
                  rel="noreferrer"
                >
                  {channel.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
