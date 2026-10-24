"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { chromeFragment, chromeVertex } from "@/shaders/liquidChrome";

type Props = {
  pointer: MutableRefObject<{ x: number; y: number }>;
  structure: MutableRefObject<number>;
  reduced?: boolean;
  mobile?: boolean;
};

/** Asymmetrical folded chrome sheet — not a sphere/orb/blob. */
export function ChromeSculpture({ pointer, structure, reduced, mobile }: Props) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const matB = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uAmp: { value: mobile ? 0.18 : 0.32 },
      uStructure: { value: 0 },
      uChromeCold: { value: new THREE.Color("#7a93a3") },
      uChromeWarm: { value: new THREE.Color("#c5d4de") },
      uRim: { value: new THREE.Color("#9adcf0") },
    }),
    [mobile],
  );

  const uniformsB = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uAmp: { value: mobile ? 0.12 : 0.22 },
      uStructure: { value: 0 },
      uChromeCold: { value: new THREE.Color("#5f7686") },
      uChromeWarm: { value: new THREE.Color("#a8bbc8") },
      uRim: { value: new THREE.Color("#7ad4ec") },
    }),
    [mobile],
  );

  const segs = mobile ? [48, 72] : [72, 120];

  useFrame((state, delta) => {
    const t = reduced ? state.clock.elapsedTime * 0.12 : state.clock.elapsedTime;
    const s = structure.current;
    for (const m of [mat.current, matB.current]) {
      if (!m) continue;
      m.uniforms.uTime.value = t;
      m.uniforms.uStructure.value = s;
      const u = m.uniforms.uPointer.value as THREE.Vector2;
      u.x += (pointer.current.x - u.x) * Math.min(1, delta * 3.5);
      u.y += (pointer.current.y - u.y) * Math.min(1, delta * 3.5);
    }
    if (group.current && !reduced) {
      const drift = (1 - s) * 0.08;
      group.current.rotation.y += delta * drift;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.current.y * 0.18 * (1 - s),
        0.05,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        -0.35 - pointer.current.x * 0.12 * (1 - s),
        0.05,
      );
    }
  });

  return (
    <group ref={group} position={[0.55, -0.05, 0]} rotation={[0.15, -0.55, -0.4]}>
      {/* Primary folded sheet */}
      <mesh scale={[0.42, 2.55, 1.35]}>
        <boxGeometry args={[1, 1, 1, 2, segs[1], segs[0]]} />
        <shaderMaterial
          ref={mat}
          vertexShader={chromeVertex}
          fragmentShader={chromeFragment}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite
        />
      </mesh>
      {/* Secondary intersecting shard — breaks symmetry */}
      <mesh
        scale={[0.22, 1.85, 1.05]}
        position={[0.55, -0.35, 0.35]}
        rotation={[0.4, 0.8, 1.1]}
      >
        <boxGeometry args={[1, 1, 1, 2, segs[0], segs[0]]} />
        <shaderMaterial
          ref={matB}
          vertexShader={chromeVertex}
          fragmentShader={chromeFragment}
          uniforms={uniformsB}
          transparent
          side={THREE.DoubleSide}
          depthWrite
        />
      </mesh>
      {/* Hard structural edge that emerges as uStructure rises — thin rail */}
      <mesh rotation={[Math.PI / 2, 0, 0.2]} position={[0.1, 0, 0]} scale={[1.2, 1, 1]}>
        <torusGeometry args={[1.35, 0.006, 8, mobile ? 64 : 128, Math.PI * 1.15]} />
        <meshBasicMaterial color="#9adcf0" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}
