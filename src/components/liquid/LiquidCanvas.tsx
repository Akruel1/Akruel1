"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { ChromeSculpture, type SculptureVariant } from "./ChromeSculpture";
import { isLowPowerDevice, isTouchDevice, prefersReducedMotion } from "@/lib/motion";

type Props = {
  className?: string;
  interactive?: boolean;
  variant?: SculptureVariant;
  structureRef?: MutableRefObject<number>;
};

function Scene({
  interactive,
  variant,
  structureRef,
}: {
  interactive: boolean;
  variant: SculptureVariant;
  structureRef?: MutableRefObject<number>;
}) {
  const pointer = useRef({ x: 0, y: 0 });
  const structure = useRef(0);
  const reduced = prefersReducedMotion();
  const mobile = isTouchDevice() || isLowPowerDevice();

  useEffect(() => {
    if (!interactive || reduced || mobile) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive, reduced, mobile]);

  useFrame((_, delta) => {
    const target = structureRef?.current ?? 0;
    structure.current = THREE.MathUtils.damp(structure.current, target, 4, delta);
  });

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.12} />
      <directionalLight position={[6, 8, 4]} intensity={2.1} color="#f2f7fb" />
      <directionalLight position={[-5, -2, -4]} intensity={0.55} color="#2a4555" />
      <spotLight
        position={[-1.5, 3.5, 4.5]}
        angle={0.45}
        penumbra={0.8}
        intensity={1.65}
        color="#7ed8f0"
      />
      <pointLight position={[1.2, 0.2, 2.5]} intensity={0.9} color="#5fd4ef" distance={8} />
      <ChromeSculpture
        pointer={pointer}
        structure={structure}
        variant={variant}
        reduced={reduced}
        mobile={mobile}
      />
    </>
  );
}

export function LiquidCanvas({
  className,
  interactive = true,
  variant = "twist",
  structureRef,
}: Props) {
  const [ok, setOk] = useState(true);
  const [visible, setVisible] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);
  const mobile =
    typeof window !== "undefined" && (isTouchDevice() || isLowPowerDevice());

  useEffect(() => {
    const el = wrap.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.04,
    });
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
              "radial-gradient(ellipse at 70% 40%, rgba(122,212,236,0.16), transparent 55%), #000",
          }}
        />
      </div>
    );
  }

  return (
    <div ref={wrap} className={className} aria-hidden="true">
      {visible && (
        <Canvas
          dpr={mobile ? [1, 1.2] : [1, 1.5]}
          camera={{ position: [-0.15, 0.08, 4.35], fov: 36 }}
          gl={{
            antialias: !mobile,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.domElement.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
              setOk(false);
            });
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <Scene interactive={interactive} variant={variant} structureRef={structureRef} />
        </Canvas>
      )}
    </div>
  );
}
