"use client";

import dynamic from "next/dynamic";

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
            "radial-gradient(circle at 50% 45%, rgba(122,212,236,0.14), transparent 55%)",
        }}
      />
    ),
  },
);

export function LiquidScene({
  className,
  interactive = true,
}: {
  className?: string;
  interactive?: boolean;
}) {
  return <LiquidCanvas className={className} interactive={interactive} />;
}
