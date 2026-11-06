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

function useChromeUniforms(mobile?: boolean, hero?: boolean) {
  return useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uAmp: { value: hero ? (mobile ? 0.18 : 0.32) : mobile ? 0.16 : 0.3 },
      uStructure: { value: 0 },
      uComplexity: { value: hero ? 1.55 : 0.85 },
      uMetal: { value: hero ? 1.35 : 0.95 },
      uChromeCold: { value: new THREE.Color(hero ? "#9aaab6" : "#6f8f9e") },
      uChromeWarm: { value: new THREE.Color(hero ? "#e8f0f6" : "#c8d8e2") },
      uRim: { value: new THREE.Color("#5fd4ef") },
    }),
    [mobile, hero],
  );
}

/** Organic liquid-chrome path — continuous mercury ribbon, not shards. */
function makeRibbonCurve(
  seed: number,
  height: number,
  radius: number,
  turns: number,
): THREE.CatmullRomCurve3 {
  const pts: THREE.Vector3[] = [];
  const n = 96;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const a = t * Math.PI * 2 * turns + seed;
    const flare = 0.55 + 0.45 * Math.sin(t * Math.PI);
    const wobble = 0.18 * Math.sin(t * Math.PI * 3 + seed);
    pts.push(
      new THREE.Vector3(
        Math.cos(a) * radius * flare + wobble * Math.cos(a * 0.5),
        (t - 0.5) * height + 0.12 * Math.sin(t * Math.PI * 2 + seed),
        Math.sin(a) * radius * flare * 0.85 + wobble * Math.sin(a * 0.5),
      ),
    );
  }
  return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.45);
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
  const matC = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const hero = variant === "twist";
  const uniforms = useChromeUniforms(mobile, hero);
  const uniformsB = useChromeUniforms(mobile, hero);
  const uniformsC = useChromeUniforms(mobile, hero);
  const segs = mobile ? [48, 80] : hero ? [80, 160] : [64, 110];

  const heroTubes = useMemo(() => {
    if (!hero) return null;
    const radial = mobile ? 16 : 28;
    const tubular = mobile ? 120 : 220;
    const thick = mobile ? 0.28 : 0.42;
    return [
      new THREE.TubeGeometry(
        makeRibbonCurve(0.2, 3.8, 1.05, 1.55),
        tubular,
        thick,
        radial,
        false,
      ),
      new THREE.TubeGeometry(
        makeRibbonCurve(1.8, 3.3, 0.78, 1.85),
        tubular,
        thick * 0.78,
        radial,
        false,
      ),
      new THREE.TubeGeometry(
        makeRibbonCurve(3.4, 2.8, 0.58, 2.05),
        Math.floor(tubular * 0.8),
        thick * 0.62,
        radial,
        false,
      ),
    ];
  }, [hero, mobile]);

  useFrame((state, delta) => {
    const t = reduced ? state.clock.elapsedTime * 0.12 : state.clock.elapsedTime;
    const s = structure?.current ?? 0;
    for (const m of [mat.current, matB.current, matC.current]) {
      if (!m) continue;
      m.uniforms.uTime.value = t;
      m.uniforms.uStructure.value = s;
      const u = m.uniforms.uPointer.value as THREE.Vector2;
      u.x += (pointer.current.x - u.x) * Math.min(1, delta * 3.2);
      u.y += (pointer.current.y - u.y) * Math.min(1, delta * 3.2);
    }
    if (group.current && !reduced) {
      group.current.rotation.y += delta * (hero ? 0.06 : 0.1);
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.current.y * (hero ? 0.18 : 0.15),
        0.045,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        -0.18 - pointer.current.x * 0.1,
        0.045,
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

  // Hero: interlaced tubular liquid-chrome ribbons
  return (
    <group
      ref={group}
      position={[0.95, 0.0, 0]}
      rotation={[0.16, -0.68, -0.2]}
      scale={mobile ? 1.05 : 1.22}
    >
      <pointLight position={[0.15, 0.25, 0.55]} intensity={2.6} color="#6adcef" distance={5} />
      <pointLight position={[-0.7, 1.0, -0.4]} intensity={0.85} color="#f0f6fa" distance={6} />
      <pointLight position={[0.8, -0.6, 0.3]} intensity={0.55} color="#8aa0ae" distance={4} />

      {heroTubes && (
        <>
          <mesh geometry={heroTubes[0]}>{shader(mat, uniforms)}</mesh>
          <mesh geometry={heroTubes[1]} position={[0.15, -0.05, 0.1]}>
            {shader(matB, uniformsB)}
          </mesh>
          <mesh geometry={heroTubes[2]} position={[-0.1, 0.2, 0.15]}>
            {shader(matC, uniformsC)}
          </mesh>
        </>
      )}
    </group>
  );
}
