"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { getGsap, isDesktopMotion, motionAllowed } from "@/lib/gsap";
import { emitScene, type SceneId, SceneIdentity } from "./SceneIdentity";
import styles from "./CinematicRoot.module.css";

const LAYER_ORDER = [
  "hero",
  "work",
  "arax",
  "orbox",
  "about",
  "tech",
  "contact",
] as const;

type LayerId = (typeof LAYER_ORDER)[number];

type LayerTween = {
  yPercent?: number;
  xPercent?: number;
  clipPath?: string;
  autoAlpha?: number;
};

const EXIT: Record<LayerId, LayerTween> = {
  hero: { yPercent: -12, clipPath: "inset(0% 0% 32% 0%)", autoAlpha: 0 },
  work: { xPercent: -10, clipPath: "inset(0% 42% 0% 0%)", autoAlpha: 0 },
  arax: { yPercent: 8, clipPath: "inset(22% 0% 0% 0%)", autoAlpha: 0 },
  orbox: { xPercent: 12, clipPath: "inset(0% 0% 0% 38%)", autoAlpha: 0 },
  about: { yPercent: -8, autoAlpha: 0 },
  tech: { clipPath: "inset(0% 0% 48% 0%)", autoAlpha: 0 },
  contact: { autoAlpha: 0 },
};

const ENTER: Record<LayerId, LayerTween> = {
  hero: {},
  work: { yPercent: 16, clipPath: "inset(100% 0% 0% 0%)" },
  arax: { xPercent: 14, clipPath: "inset(0% 0% 0% 100%)" },
  orbox: { yPercent: 18, clipPath: "inset(0% 0% 100% 0%)" },
  about: { clipPath: "inset(0% 50% 0% 50%)" },
  tech: { yPercent: 12, clipPath: "inset(100% 0% 0% 0%)" },
  contact: { clipPath: "inset(0% 0% 0% 100%)" },
};

/**
 * Continuous cinematic scroll (desktop) + light flow motion (mobile).
 * Native scroll only — no hijack / snap.
 */
export function CinematicRoot({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    if (!motionAllowed()) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const desktop = isDesktopMotion();
      const stage = document.querySelector<HTMLElement>("[data-stage]");
      const pin = document.querySelector<HTMLElement>("[data-stage-pin]");
      const layers = LAYER_ORDER.map((id) =>
        document.querySelector<HTMLElement>(`[data-stage-layer="${id}"]`),
      ).filter(Boolean) as HTMLElement[];

      const hero = document.querySelector<HTMLElement>("[data-stage-layer='hero']");
      if (hero) {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(
            hero.querySelectorAll("[data-hero-in]"),
            { y: 56, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.12 },
            0.05,
          )
          .fromTo(
            hero.querySelectorAll("[data-hero-slash]"),
            { xPercent: 40, opacity: 0 },
            { xPercent: 0, opacity: 0.85, duration: 1.1 },
            0.15,
          );
      }

      if (desktop && stage && pin && layers.length >= 2) {
        gsap.set(layers, {
          autoAlpha: 0,
          visibility: "hidden",
          zIndex: 0,
          yPercent: 0,
          xPercent: 0,
        });
        gsap.set(layers[0], {
          autoAlpha: 1,
          visibility: "visible",
          zIndex: 1,
          clipPath: "inset(0% 0% 0% 0%)",
        });
        emitScene((layers[0].dataset.scene as SceneId) || "hero");

        // CSS sticky provides the persistent viewport; do NOT also GSAP-pin
        // (double-pin trapped scroll and blocked later scenes).
        void pin;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.55,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                layers.length - 1,
                Math.max(0, Math.floor(self.progress * layers.length * 0.999)),
              );
              const id = layers[idx]?.dataset.scene as SceneId | undefined;
              if (id) emitScene(id);
            },
          },
        });

        // Perfect HERO → WORK first, then cascade remaining with overlap
        const n = layers.length;
        const seg = 1 / (n - 0.28);

        layers.forEach((layer, i) => {
          if (i === 0) return;
          const id = (layer.dataset.stageLayer || LAYER_ORDER[i]) as LayerId;
          const prev = layers[i - 1];
          const prevId = (prev.dataset.stageLayer || LAYER_ORDER[i - 1]) as LayerId;
          const enterAt = (i - 0.28) * seg;
          const from = ENTER[id] || { yPercent: 14 };
          const exit = EXIT[prevId] || { autoAlpha: 0, yPercent: -8 };

          // Incoming scene
          tl.fromTo(
            layer,
            {
              autoAlpha: 0,
              visibility: "visible",
              zIndex: i + 1,
              yPercent: Number(from.yPercent) || 0,
              xPercent: Number(from.xPercent) || 0,
              clipPath: (from.clipPath as string) || "inset(0% 0% 0% 0%)",
            },
            {
              autoAlpha: 1,
              yPercent: 0,
              xPercent: 0,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: seg * 0.62,
            },
            enterAt,
          );

          // Outgoing scene — still visible while next enters (seamless)
          tl.to(
            prev,
            {
              ...exit,
              duration: seg * 0.58,
            },
            enterAt,
          );

          // Soft kinetic on incoming copy
          const bits = layer.querySelectorAll("[data-kine], [data-clip], .campaign-cta");
          if (bits.length) {
            tl.fromTo(
              bits,
              { y: 28, opacity: 0.2 },
              { y: 0, opacity: 1, duration: seg * 0.4, stagger: 0.03 },
              enterAt + seg * 0.12,
            );
          }
        });
      } else {
        // Mobile: stacked flow + light reveals
        layers.forEach((el) => {
          const id = el.dataset.scene as SceneId | undefined;
          if (!id) return;
          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 45%",
            onEnter: () => emitScene(id),
            onEnterBack: () => emitScene(id),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-kine]").forEach((el) => {
          const speed = Number(el.dataset.kine || 1);
          gsap.fromTo(
            el,
            { y: 26 * speed, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "power3.out",
              duration: 0.8,
              scrollTrigger: {
                trigger: el,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 0 100% 0)", y: 18 },
            {
              clipPath: "inset(0 0 0% 0)",
              y: 0,
              ease: "power4.out",
              duration: 0.7,
              scrollTrigger: {
                trigger: el,
                start: "top 93%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const dist = Number(el.dataset.parallax || 80) * 0.3;
          gsap.to(el, {
            y: dist,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    document.fonts?.ready?.then(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <div className={styles.root}>
      <SceneIdentity />
      {children}
    </div>
  );
}
