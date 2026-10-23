"use client";

import {
  useRef,
  type HTMLAttributes,
  type ReactNode,
  type MouseEvent,
} from "react";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  strength?: number;
};

export function Magnetic({ children, strength = 0.28, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent) => {
    if (prefersReducedMotion() || isTouchDevice()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)", display: "inline-block" }}
      {...rest}
    >
      {children}
    </div>
  );
}
