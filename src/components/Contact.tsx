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
    <section
      id="contact"
      className={`${styles.section} env-acid`}
      data-env="acid"
      data-scene="contact"
      data-stage-layer="contact"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <p className="poster-label" data-kine="1">
          {t.contact.eyebrow}
        </p>
        <h2 id="contact-title" className={styles.headline} data-clip>
          {t.contact.headline}
        </h2>

        <a className={`campaign-cta ${styles.cta}`} href={`mailto:${contact.email.value}`}>
          {t.contact.cta}
          <span aria-hidden="true">→</span>
        </a>

        <div className={styles.channels}>
          <h3 className="poster-label">{t.contact.channels}</h3>
          <ul>
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

      <div className={styles.cobaltCorner} aria-hidden="true" />
      <div className={styles.redBar} aria-hidden="true" />
    </section>
  );
}
