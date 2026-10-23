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
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <p className="eyebrow">{t.contact.eyebrow}</p>
        <h2 id="contact-title" className="display-l">
          {t.contact.headline}
        </h2>
        <p className="section-lead">{t.contact.lead}</p>

        <h3 className={styles.channels}>{t.contact.channels}</h3>
        <ul className={styles.list}>
          {channels.map((channel) => {
            const isPlaceholder = "placeholder" in channel && channel.placeholder;
            return (
              <li key={channel.key}>
                <span className={styles.label}>{channel.label}</span>
                {isPlaceholder ? (
                  <span className={styles.placeholder}>
                    <span>{channel.value}</span>
                    <span className={styles.note}>{t.contact.placeholderNote}</span>
                  </span>
                ) : (
                  <a href={channel.href}>{channel.value}</a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
