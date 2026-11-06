"use client";

import { CinematicRoot } from "./motion/CinematicRoot";

export function ExperienceShell({ children }: { children: React.ReactNode }) {
  return <CinematicRoot>{children}</CinematicRoot>;
}
