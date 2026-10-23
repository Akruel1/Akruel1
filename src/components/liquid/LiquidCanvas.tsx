"use client";

import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { LiquidMesh } from "./LiquidMesh";
import { isLowPowerDevice, isTouchDevice, prefersReducedMotion } from "@/lib/motion";

type Props = {
  className?: string;
  interactive?: boolean;
};

function Scene({ interactive }: { interactive: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });
  const reduced = prefersReducedMotion();
  const mobile = isTouchDevice() || isLowPowerDevice();

  useEffect(() => {
    if (!interactive || reduced || mobile) return;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.current.x = x;
      pointer.current.y = y;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive, reduced, mobile]);

  return (
    <>
      <color attach="background" args={["#030507"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 2]} intensity={1.25} color="#c9e7f4" />
      <directionalLight position={[-3, -2, -4]} intensity={0.55} color="#3a7a90" />
      <pointLight position={[0, 0, 2.5]} intensity={0.65} color="#7ad4ec" distance={8} />
      <Float
        speed={reduced ? 0 : 1.1}
        rotationIntensity={reduced ? 0 : 0.25}
        floatIntensity={reduced ? 0 : 0.45}
      >
        <LiquidMesh pointer={pointer} reduced={reduced} mobile={mobile} />
      </Float>
    </>
  );
}

export function LiquidCanvas({ className, interactive = true }: Props) {
  const [ok, setOk] = useState(true);
  const [visible, setVisible] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);
  const mobile = typeof window !== "undefined" && (isTouchDevice() || isLowPowerDevice());

  useEffect(() => {
    const el = wrap.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!ok) {
    return (
      <div className={className} aria-hidden="true">
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle at 45% 40%, rgba(122,212,236,0.2), transparent 55%), radial-gradient(circle at 60% 60%, rgba(40,90,110,0.35), #030507 70%)",
          }}
        />
      </div>
    );
  }

  return (
    <div ref={wrap} className={className} aria-hidden="true">
      {visible && (
        <Canvas
          dpr={mobile ? [1, 1.25] : [1, 1.5]}
          camera={{ position: [0, 0.15, 4.2], fov: 42 }}
          gl={{
            antialias: !mobile,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x030507, 0);
            const canvas = gl.domElement;
            canvas.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
              setOk(false);
            });
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <Scene interactive={interactive} />
        </Canvas>
      )}
    </div>
  );
}
