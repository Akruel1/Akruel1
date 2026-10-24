"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { ChromeSculpture } from "./ChromeSculpture";
import { isLowPowerDevice, isTouchDevice, prefersReducedMotion } from "@/lib/motion";

type Props = {
  className?: string;
  interactive?: boolean;
  /** 0..1 scroll/structure progress from parent */
  structureRef?: MutableRefObject<number>;
};

function StudioLights() {
  return (
    <>
      <color attach="background" args={["#030507"]} />
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 7, 3]} intensity={1.6} color="#e8f2f8" />
      <directionalLight position={[-4, -1, -3]} intensity={0.35} color="#3d5a6a" />
      <spotLight
        position={[-2, 4, 5]}
        angle={0.35}
        penumbra={0.7}
        intensity={1.1}
        color="#b7d7e8"
      />
    </>
  );
}

function Scene({
  interactive,
  structureRef,
}: {
  interactive: boolean;
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
      <StudioLights />
      <ChromeSculpture
        pointer={pointer}
        structure={structure}
        reduced={reduced}
        mobile={mobile}
      />
    </>
  );
}

export function LiquidCanvas({ className, interactive = true, structureRef }: Props) {
  const [ok, setOk] = useState(true);
  const [visible, setVisible] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);
  const mobile =
    typeof window !== "undefined" && (isTouchDevice() || isLowPowerDevice());

  useEffect(() => {
    const el = wrap.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.05,
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
              "linear-gradient(135deg, #0a1016 0%, #141c24 40%, #070b10 100%), radial-gradient(ellipse at 70% 40%, rgba(154,220,240,0.12), transparent 50%)",
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
          camera={{ position: [0.2, 0.1, 4.6], fov: 38 }}
          gl={{
            antialias: !mobile,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x030507, 0);
            gl.domElement.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
              setOk(false);
            });
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <Scene interactive={interactive} structureRef={structureRef} />
        </Canvas>
      )}
    </div>
  );
}
