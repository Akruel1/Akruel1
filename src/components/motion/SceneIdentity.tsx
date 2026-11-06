"use client";

import { useEffect, useState } from "react";
import styles from "./SceneIdentity.module.css";

export type SceneId =
  | "hero"
  | "work"
  | "arax"
  | "orbox"
  | "about"
  | "tech"
  | "contact";

const LABELS: Record<SceneId, string> = {
  hero: "AT",
  work: "01 / WORK",
  arax: "02 / ARAX",
  orbox: "03 / ORBOX",
  about: "04 / ABOUT",
  tech: "05 / TECH",
  contact: "06 / CONTACT",
};

export function SceneIdentity() {
  const [label, setLabel] = useState(LABELS.hero);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const onScene = (e: Event) => {
      const detail = (e as CustomEvent<{ id: SceneId }>).detail;
      if (!detail?.id || !(detail.id in LABELS)) return;
      setFlash(true);
      setLabel(LABELS[detail.id]);
      window.setTimeout(() => setFlash(false), 420);
    };
    window.addEventListener("at:scene", onScene as EventListener);
    return () => window.removeEventListener("at:scene", onScene as EventListener);
  }, []);

  return (
    <div className={`${styles.root} ${flash ? styles.flash : ""}`} aria-hidden="true">
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export function emitScene(id: SceneId) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("at:scene", { detail: { id } }));
}
