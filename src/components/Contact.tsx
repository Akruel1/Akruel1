"use client";

import { profile } from "@/content/profile";
import { useI18n } from "@/lib/i18n";
import { Magnetic } from "./Magnetic";
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
        <p className="eyebrow">{t.contact.eyebrow}</p>
        <h2 id="contact-title" className="display-l">
          {t.contact.headline}
        </h2>
        <p className="lead">{t.contact.lead}</p>

        <h3 className={styles.channels}>{t.contact.channels}</h3>
        <ul className={styles.list}>
          {channels.map((channel) => (
            <li key={channel.key}>
              <span className={styles.label}>{channel.label}</span>
              <Magnetic strength={0.15}>
                <a href={channel.href} target={channel.key === "email" ? undefined : "_blank"} rel="noreferrer">
                  {channel.value}
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
