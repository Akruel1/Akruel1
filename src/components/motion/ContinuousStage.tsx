"use client";

import type { ReactNode } from "react";
import styles from "./ContinuousStage.module.css";

/**
 * Persistent viewport stage shell. ScrollTrigger in CinematicRoot
 * scrubs layered scenes against CSS sticky — native scroll only.
 * Mobile shares the same stage language; reduced-motion falls back to flow.
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
