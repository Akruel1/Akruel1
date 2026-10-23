"use client";

import { useCallback, useState } from "react";
import { Entrance } from "./Entrance";
import { OpticalCursor } from "./OpticalCursor";

export function ExperienceShell({ children }: { children: React.ReactNode }) {
  const [, setDone] = useState(false);
  const onDone = useCallback(() => setDone(true), []);

  return (
    <>
      <Entrance onDone={onDone} />
      <OpticalCursor />
      {children}
    </>
  );
}
