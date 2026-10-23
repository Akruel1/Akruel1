"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { liquidFragment, liquidVertex } from "@/shaders/liquidGlass";

type Props = {
  pointer: MutableRefObject<{ x: number; y: number }>;
  reduced?: boolean;
  mobile?: boolean;
};

export function LiquidMesh({ pointer, reduced, mobile }: Props) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uAmp: { value: mobile ? 0.22 : 0.38 },
      uColorA: { value: new THREE.Color("#0a1a22") },
      uColorB: { value: new THREE.Color("#1c4a5c") },
      uColorRim: { value: new THREE.Color("#9adcf0") },
    }),
    [mobile],
  );

  useFrame((state, delta) => {
    if (!mat.current) return;
    const t = reduced ? state.clock.elapsedTime * 0.15 : state.clock.elapsedTime;
    mat.current.uniforms.uTime.value = t;
    const u = mat.current.uniforms.uPointer.value as THREE.Vector2;
    u.x += (pointer.current.x - u.x) * Math.min(1, delta * 4);
    u.y += (pointer.current.y - u.y) * Math.min(1, delta * 4);
    if (group.current && !reduced) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.current.y * 0.25,
        0.04,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        -pointer.current.x * 0.2,
        0.04,
      );
    }
  });

  const detail = mobile ? 48 : 96;

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.35, mobile ? 3 : 5]} />
        <shaderMaterial
          ref={mat}
          vertexShader={liquidVertex}
          fragmentShader={liquidFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Inner denser core for depth */}
      <mesh scale={0.72}>
        <icosahedronGeometry args={[1.35, mobile ? 2 : 4]} />
        <meshPhysicalMaterial
          color="#0d2430"
          roughness={0.15}
          metalness={0.05}
          transmission={0.65}
          thickness={1.4}
          ior={1.4}
          transparent
          opacity={0.85}
          envMapIntensity={1.2}
        />
      </mesh>
      {/* Outer shell highlight ring */}
      <mesh rotation={[Math.PI / 2.4, 0.3, 0.2]} scale={1.55}>
        <torusGeometry args={[1.05, 0.015, 12, detail]} />
        <meshBasicMaterial color="#7ad4ec" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}
