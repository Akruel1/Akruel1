"use client";

import type { ReactNode } from "react";
import styles from "./ContinuousStage.module.css";

/**
 * Persistent viewport stage shell. ScrollTrigger in CinematicRoot
 * pins `[data-stage-pin]` and scrubs layered scenes for continuous feel.
 * On narrow viewports CSS falls back to normal document flow.
 */
export function ContinuousStage({ children }: { children: ReactNode }) {
  return (
    <div className={styles.root} data-stage>
      <div className={styles.track} data-stage-track>
        <div className={styles.pin} data-stage-pin>
          {children}
        </div>
      </div>
    </div>
  );
}
