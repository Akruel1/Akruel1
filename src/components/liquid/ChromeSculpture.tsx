"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { chromeFragment, chromeVertex } from "@/shaders/liquidChrome";

export type SculptureVariant =
  | "twist"
  | "shard"
  | "crystal"
  | "orb"
  | "crescent"
  | "strand";

type Props = {
  pointer: MutableRefObject<{ x: number; y: number }>;
  structure?: MutableRefObject<number>;
  variant?: SculptureVariant;
  reduced?: boolean;
  mobile?: boolean;
};

function useChromeUniforms(mobile?: boolean) {
  return useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uAmp: { value: mobile ? 0.16 : 0.3 },
      uStructure: { value: 0 },
      uChromeCold: { value: new THREE.Color("#6f8f9e") },
      uChromeWarm: { value: new THREE.Color("#c8d8e2") },
      uRim: { value: new THREE.Color("#7ad4ec") },
    }),
    [mobile],
  );
}

export function ChromeSculpture({
  pointer,
  structure,
  variant = "twist",
  reduced,
  mobile,
}: Props) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const matB = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const uniforms = useChromeUniforms(mobile);
  const uniformsB = useChromeUniforms(mobile);
  const segs = mobile ? [40, 64] : [64, 110];

  useFrame((state, delta) => {
    const t = reduced ? state.clock.elapsedTime * 0.12 : state.clock.elapsedTime;
    const s = structure?.current ?? 0;
    for (const m of [mat.current, matB.current]) {
      if (!m) continue;
      m.uniforms.uTime.value = t;
      m.uniforms.uStructure.value = s;
      const u = m.uniforms.uPointer.value as THREE.Vector2;
      u.x += (pointer.current.x - u.x) * Math.min(1, delta * 3.5);
      u.y += (pointer.current.y - u.y) * Math.min(1, delta * 3.5);
    }
    if (group.current && !reduced) {
      group.current.rotation.y += delta * (0.1 + (1 - s) * 0.06);
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.current.y * 0.15,
        0.05,
      );
    }
  });

  const shader = (ref: typeof mat, uni: typeof uniforms) => (
    <shaderMaterial
      ref={ref}
      vertexShader={chromeVertex}
      fragmentShader={chromeFragment}
      uniforms={uni}
      transparent
      side={THREE.DoubleSide}
      depthWrite
    />
  );

  if (variant === "orb") {
    return (
      <group ref={group} scale={mobile ? 0.85 : 1}>
        <mesh>
          <icosahedronGeometry args={[1.25, mobile ? 2 : 4]} />
          {shader(mat, uniforms)}
        </mesh>
      </group>
    );
  }

  if (variant === "crescent") {
    return (
      <group ref={group} rotation={[0.3, -0.4, 0.2]} scale={mobile ? 0.9 : 1.1}>
        <mesh scale={[0.35, 2.2, 1.1]} rotation={[0, 0, 0.5]}>
          <torusGeometry args={[1.2, 0.38, 24, segs[1], Math.PI * 1.35]} />
          {shader(mat, uniforms)}
        </mesh>
      </group>
    );
  }

  if (variant === "strand") {
    return (
      <group ref={group} position={[0.4, 0, 0]} rotation={[0.1, -0.3, 0.15]}>
        <mesh scale={[0.28, 2.8, 0.55]}>
          <boxGeometry args={[1, 1, 1, 2, segs[1], 24]} />
          {shader(mat, uniforms)}
        </mesh>
        <mesh scale={[0.18, 2.2, 0.4]} position={[0.35, -0.2, 0.2]} rotation={[0.2, 0.6, 0.4]}>
          <boxGeometry args={[1, 1, 1, 2, segs[0], 16]} />
          {shader(matB, uniformsB)}
        </mesh>
      </group>
    );
  }

  if (variant === "shard") {
    return (
      <group ref={group} rotation={[0.25, -0.7, -0.35]} scale={mobile ? 0.95 : 1.15}>
        <mesh scale={[0.35, 2.4, 1.1]} rotation={[0.1, 0.2, 0.15]}>
          <boxGeometry args={[1, 1, 1, 2, segs[1], segs[0]]} />
          {shader(mat, uniforms)}
        </mesh>
        <mesh scale={[0.2, 1.6, 0.7]} position={[0.45, -0.4, 0.25]} rotation={[0.5, 0.9, 1.0]}>
          <boxGeometry args={[1, 1, 1, 2, segs[0], segs[0]]} />
          {shader(matB, uniformsB)}
        </mesh>
      </group>
    );
  }

  if (variant === "crystal") {
    return (
      <group ref={group} rotation={[0.4, 0.5, -0.2]} scale={mobile ? 0.9 : 1.05}>
        <mesh>
          <octahedronGeometry args={[1.35, 0]} />
          {shader(mat, uniforms)}
        </mesh>
        <mesh scale={0.55} position={[0.7, -0.5, 0.3]} rotation={[0.4, 0.8, 0.2]}>
          <octahedronGeometry args={[1.2, 0]} />
          {shader(matB, uniformsB)}
        </mesh>
      </group>
    );
  }

  // twist — hero vertical liquid ribbon
  return (
    <group ref={group} position={[0.35, 0, 0]} rotation={[0.1, -0.45, -0.25]}>
      <mesh scale={[0.38, 2.7, 1.25]}>
        <boxGeometry args={[1, 1, 1, 2, segs[1], segs[0]]} />
        {shader(mat, uniforms)}
      </mesh>
      <mesh
        scale={[0.22, 2.0, 0.9]}
        position={[0.5, -0.25, 0.3]}
        rotation={[0.35, 0.75, 1.05]}
      >
        <boxGeometry args={[1, 1, 1, 2, segs[0], segs[0]]} />
        {shader(matB, uniformsB)}
      </mesh>
    </group>
  );
}
