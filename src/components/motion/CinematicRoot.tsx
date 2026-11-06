"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { getGsap, motionAllowed } from "@/lib/gsap";
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

const SCENE_HASH: Record<string, LayerId> = {
  work: "work",
  about: "about",
  contact: "contact",
};

function layerProgress(index: number, total: number) {
  if (index <= 0) return 0.02;
  const seg = 1 / (total - 0.28);
  return Math.min(0.98, (index - 0.12) * seg);
}

function scrollStageToLayer(stage: HTMLElement, index: number, total: number) {
  const progress = layerProgress(index, total);
  const maxScroll = Math.max(0, stage.offsetHeight - window.innerHeight);
  const top = stage.offsetTop + progress * maxScroll;
  window.scrollTo({ top, behavior: "smooth" });
}

/**
 * Continuous cinematic scroll on every viewport.
 * Native document scroll alone drives the sticky stage — no CTA required.
 */
export function CinematicRoot({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    if (!motionAllowed()) return;

    const { gsap, ScrollTrigger } = getGsap();
    let onClick: ((event: MouseEvent) => void) | null = null;

    const ctx = gsap.context(() => {
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
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.95, stagger: 0.1 },
            0.05,
          )
          .fromTo(
            hero.querySelectorAll("[data-hero-slash]"),
            { xPercent: 40, opacity: 0 },
            { xPercent: 0, opacity: 0.85, duration: 1.05 },
            0.12,
          );
      }

      if (!(stage && pin && layers.length >= 2)) return;

      gsap.set(layers, {
        autoAlpha: 0,
        visibility: "hidden",
        zIndex: 0,
        yPercent: 0,
        xPercent: 0,
        pointerEvents: "none",
      });
      gsap.set(layers[0], {
        autoAlpha: 1,
        visibility: "visible",
        zIndex: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        pointerEvents: "auto",
      });
      emitScene((layers[0].dataset.scene as SceneId) || "hero");

      // CSS sticky provides the persistent viewport; do NOT also GSAP-pin.
      void pin;
      const n = layers.length;
      const seg = 1 / (n - 0.28);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.45,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              layers.length - 1,
              Math.max(0, Math.floor(self.progress * layers.length * 0.999)),
            );
            const id = layers[idx]?.dataset.scene as SceneId | undefined;
            if (id) emitScene(id);

            const cursor = self.progress * (layers.length - 1);
            layers.forEach((layer, i) => {
              layer.style.pointerEvents = Math.abs(cursor - i) < 1.05 ? "auto" : "none";
            });
          },
        },
      });

      layers.forEach((layer, i) => {
        if (i === 0) return;
        const id = (layer.dataset.stageLayer || LAYER_ORDER[i]) as LayerId;
        const prev = layers[i - 1];
        const prevId = (prev.dataset.stageLayer || LAYER_ORDER[i - 1]) as LayerId;
        const enterAt = (i - 0.28) * seg;
        const from = ENTER[id] || { yPercent: 14 };
        const exit = EXIT[prevId] || { autoAlpha: 0, yPercent: -8 };

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

        tl.to(
          prev,
          {
            ...exit,
            duration: seg * 0.58,
          },
          enterAt,
        );

        const bits = layer.querySelectorAll("[data-kine], [data-clip], .campaign-cta");
        if (bits.length) {
          tl.fromTo(
            bits,
            { y: 24, opacity: 0.2 },
            { y: 0, opacity: 1, duration: seg * 0.4, stagger: 0.03 },
            enterAt + seg * 0.12,
          );
        }
      });

      const goHash = (hash: string) => {
        const key = hash.replace(/^#/, "");
        const target = SCENE_HASH[key];
        if (!target) return false;
        const index = LAYER_ORDER.indexOf(target);
        if (index < 0) return false;
        scrollStageToLayer(stage, index, n);
        return true;
      };

      onClick = (event: MouseEvent) => {
        const a = (event.target as HTMLElement | null)?.closest?.("a");
        if (!a) return;
        const href = a.getAttribute("href") || "";
        if (!href.includes("#")) return;
        const hash = href.slice(href.indexOf("#"));
        if (!hash || hash === "#") return;
        const isLocal =
          href.startsWith("#") ||
          href.startsWith("/#") ||
          href.startsWith("/Akruel1/#") ||
          /\/?(?:Akruel1\/)?(?:index\.html)?#/.test(href);
        if (!isLocal) return;
        if (goHash(hash)) {
          event.preventDefault();
          history.replaceState(null, "", hash);
        }
      };

      document.addEventListener("click", onClick);

      if (location.hash) {
        requestAnimationFrame(() => goHash(location.hash));
      }
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    document.fonts?.ready?.then(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (onClick) document.removeEventListener("click", onClick);
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
