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
      <ambientLight intensity={0.18} />
      <directionalLight position={[5, 7, 3]} intensity={1.55} color="#eaf4fa" />
      <directionalLight position={[-4, -1, -3]} intensity={0.4} color="#3d5a6a" />
      <spotLight position={[-2, 4, 5]} angle={0.4} penumbra={0.75} intensity={1.2} color="#9adcf0" />
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
          camera={{ position: [0.15, 0.05, 4.5], fov: 38 }}
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
