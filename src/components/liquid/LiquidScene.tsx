"use client";

import dynamic from "next/dynamic";
import type { MutableRefObject } from "react";
import type { SculptureVariant } from "./ChromeSculpture";

const LiquidCanvas = dynamic(
  () => import("./LiquidCanvas").then((m) => m.LiquidCanvas),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 65% 45%, rgba(122,212,236,0.12), transparent 55%)",
        }}
      />
    ),
  },
);

export function LiquidScene({
  className,
  interactive = true,
  variant = "twist",
  structureRef,
}: {
  className?: string;
  interactive?: boolean;
  variant?: SculptureVariant;
  structureRef?: MutableRefObject<number>;
}) {
  return (
    <LiquidCanvas
      className={className}
      interactive={interactive}
      variant={variant}
      structureRef={structureRef}
    />
  );
}
