"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { getGsap, isDesktopMotion, motionAllowed } from "@/lib/gsap";
import { emitScene, type SceneId, SceneIdentity } from "./SceneIdentity";
import styles from "./CinematicRoot.module.css";

/**
 * Single scroll architecture: one place registers ScrollTriggers.
 * Native scroll stays usable; no Lenis; cleanup on unmount.
 */
export function CinematicRoot({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    if (!motionAllowed()) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const desktop = isDesktopMotion();

      // --- Scene identity ---
      gsap.utils.toArray<HTMLElement>("[data-scene]").forEach((el) => {
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

      // --- Curtain / strip transitions between major scenes ---
      gsap.utils.toArray<HTMLElement>("[data-curtain]").forEach((el, i) => {
        const mode = el.dataset.curtain || "wipe";
        const fromVars =
          mode === "up"
            ? { clipPath: "inset(100% 0 0 0)" }
            : mode === "split"
              ? { clipPath: "inset(0 50% 0 50%)" }
              : mode === "mask"
                ? { clipPath: "inset(0 0 100% 0)" }
                : { clipPath: "inset(0 100% 0 0)" };

        gsap.fromTo(
          el,
          fromVars,
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "power3.out",
            duration: desktop ? 1.1 : 0.7,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 35%",
              toggleActions: "play none none reverse",
            },
            delay: (i % 3) * 0.04,
          },
        );
      });

      // --- Kinetic type lines ---
      gsap.utils.toArray<HTMLElement>("[data-kine]").forEach((el) => {
        const speed = Number(el.dataset.kine || 1);
        gsap.fromTo(
          el,
          { y: desktop ? 48 * speed : 28 * speed, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            duration: 0.9,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // --- Line clip reveals ---
      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)", y: 24 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            ease: "power4.out",
            duration: desktop ? 1.05 : 0.75,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // --- Parallax layers ---
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const dist = Number(el.dataset.parallax || 80);
        const amount = desktop ? dist : dist * 0.35;
        gsap.to(el, {
          y: amount,
          ease: "none",
          scrollTrigger: {
            trigger: el.dataset.parallaxTrigger
              ? document.querySelector(el.dataset.parallaxTrigger)
              : el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // --- Hero entrance (once) ---
      const hero = document.querySelector<HTMLElement>("[data-scene='hero']");
      if (hero) {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          hero.querySelectorAll("[data-hero-in]"),
          { y: 56, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.12 },
          0.05,
        ).fromTo(
          hero.querySelectorAll("[data-hero-slash]"),
          { xPercent: 40, opacity: 0 },
          { xPercent: 0, opacity: 0.85, duration: 1.1 },
          0.15,
        );
      }

      // --- Desktop pin for campaign scenes (lighter / none on mobile) ---
      if (desktop) {
        gsap.utils.toArray<HTMLElement>("[data-pin='campaign']").forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top top",
            end: "+=45%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          });

          const visual = el.querySelector<HTMLElement>("[data-campaign-visual]");
          const copy = el.querySelector<HTMLElement>("[data-campaign-copy]");
          if (visual) {
            gsap.fromTo(
              visual,
              { scale: 1.06, yPercent: 4 },
              {
                scale: 1,
                yPercent: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top top",
                  end: "+=45%",
                  scrub: true,
                },
              },
            );
          }
          if (copy) {
            gsap.fromTo(
              copy.querySelectorAll("[data-kine], [data-clip], .campaign-cta"),
              { y: 28, opacity: 0.35 },
              {
                y: 0,
                opacity: 1,
                ease: "none",
                stagger: 0.05,
                scrollTrigger: {
                  trigger: el,
                  start: "top 80%",
                  end: "top 20%",
                  scrub: true,
                },
              },
            );
          }
        });
      }

      // --- Color environment wash on scene enter (subtle) ---
      gsap.utils.toArray<HTMLElement>("[data-scene]").forEach((el) => {
        const wash = el.querySelector<HTMLElement>("[data-env-wash]");
        if (!wash) return;
        gsap.fromTo(
          wash,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

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
