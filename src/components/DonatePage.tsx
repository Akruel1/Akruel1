"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import QRCode from "qrcode";
import { DONATION_METHODS, type DonationMethod } from "@/content/donations";
import { useI18n } from "@/lib/i18n";
import styles from "./DonatePage.module.css";

function methodCopy(
  t: ReturnType<typeof useI18n>["t"],
  id: DonationMethod["id"],
) {
  return t.donate.methods[id];
}

function DonateMethodCard({
  method,
  index,
}: {
  method: DonationMethod;
  index: number;
}) {
  const { t } = useI18n();
  const copy = methodCopy(t, method.id);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // High-contrast ivory/black QR for scan reliability across card environments
    QRCode.toDataURL(method.address, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 280,
      color: {
        dark: "#101010",
        light: "#f0eee8",
      },
    })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [method.address]);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  const onCopy = useCallback(async () => {
    const fallbackCopy = () => {
      const ta = document.createElement("textarea");
      ta.value = method.address;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        return document.execCommand("copy");
      } finally {
        document.body.removeChild(ta);
      }
    };

    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        // Some Chromium contexts leave clipboard.writeText pending instead of rejecting.
        await Promise.race([
          navigator.clipboard.writeText(method.address).then(() => {
            ok = true;
          }),
          new Promise<void>((_, reject) => {
            window.setTimeout(() => reject(new Error("clipboard-timeout")), 600);
          }),
        ]);
      }
    } catch {
      ok = false;
    }
    if (!ok) ok = fallbackCopy();
    setCopied(ok);
  }, [method.address]);

  return (
    <section
      className={`${styles.card} env-${method.env}`}
      data-env={method.env}
      aria-labelledby={`donate-${method.id}-title`}
    >
      <div className={`container ${styles.cardInner}`}>
        <div className={styles.cardMeta}>
          <p className={styles.index}>
            {String(index + 1).padStart(2, "0")} / {t.donate.methodLabel}
          </p>
          <h2 id={`donate-${method.id}-title`} className={styles.ticker}>
            {method.ticker}
          </h2>
          <p className={styles.asset}>{copy.asset}</p>
          <p className={styles.network}>{copy.network}</p>
          <p className={styles.networkWarn}>{copy.networkNote}</p>

          <div className={styles.addressBlock}>
            <p className={styles.addressLabel}>{t.donate.addressLabel}</p>
            <p className={styles.address} data-address={method.id}>
              {method.address}
            </p>
            <div className={styles.copyRow}>
              <button
                type="button"
                className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ""}`}
                onClick={onCopy}
                aria-live="polite"
              >
                {copied ? t.donate.copied : t.donate.copy}
                <span aria-hidden="true">{copied ? "✓" : "→"}</span>
              </button>
              {copied ? (
                <span className={styles.copied} role="status">
                  {t.donate.copied}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className={styles.qrPanel}>
          <div className={styles.qrFrame} aria-hidden={qrDataUrl ? undefined : true}>
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt=""
                width={280}
                height={280}
                data-qr-for={method.id}
                data-qr-payload={method.address}
              />
            ) : (
              <div className={styles.qrPlaceholder} />
            )}
          </div>
          <p className={styles.qrCaption}>{t.donate.qrCaption}</p>
        </div>
      </div>

      {method.env === "cobalt" ? (
        <div className={`${styles.cardAccent} ${styles.accentCorner}`} aria-hidden="true" />
      ) : null}
      {method.env === "black" ? (
        <div className={`${styles.cardAccent} ${styles.accentBar}`} aria-hidden="true" />
      ) : null}
      {method.env === "ivory" || method.env === "silver" ? (
        <div className={`${styles.cardAccent} ${styles.accentSlash}`} aria-hidden="true" />
      ) : null}
    </section>
  );
}

export function DonatePage() {
  const { t } = useI18n();
  const d = t.donate;

  return (
    <article className={`${styles.page} env-black`} data-env="black">
      <header className={`${styles.hero} env-black`} data-env="black">
        <div className={styles.heroMark} aria-hidden="true">
          {d.watermark}
        </div>
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.back}>
            <Link href="/">{d.back}</Link>
          </p>
          <p className="poster-label">{d.eyebrow}</p>
          <h1 className={styles.title}>{d.title}</h1>
          <p className={styles.lead}>{d.lead}</p>
          <p className={styles.networkBanner}>{d.networkBanner}</p>
        </div>
      </header>

      <div className={styles.methods}>
        {DONATION_METHODS.map((method, index) => (
          <DonateMethodCard key={method.id} method={method} index={index} />
        ))}
      </div>

      <section className={`${styles.note} env-acid`} data-env="acid">
        <div className={`container ${styles.noteInner}`}>
          <p className="poster-label">{d.noteEyebrow}</p>
          <h2 className={styles.noteTitle}>{d.noteTitle}</h2>
          <p className={styles.noteBody}>{d.noteBody}</p>
        </div>
      </section>
    </article>
  );
}
