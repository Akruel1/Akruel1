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

/** Continuous sticky stage only on wide viewports — mobile uses document flow */
export function isDesktopMotion() {
  return typeof window !== "undefined" && window.matchMedia("(min-width: 901px)").matches;
}

export { gsap, ScrollTrigger };
