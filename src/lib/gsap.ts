"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./motion";

let registered = false;

export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export function motionAllowed() {
  return typeof window !== "undefined" && !prefersReducedMotion();
}

/** @deprecated Stage runs on all viewports; kept for any legacy callers */
export function isDesktopMotion() {
  return typeof window !== "undefined";
}

export { gsap, ScrollTrigger };
