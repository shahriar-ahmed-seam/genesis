"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import { Color, Group, ShaderMaterial } from "three";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "@/shaders/planetShader";
import { getPlanetConfig } from "@/config/planetTypes";
import Atmosphere from "@/components/planet/Atmosphere";

/**
 * A self-contained, non-interactive showcase planet for the marketing hero.
 * Kept deliberately light (no controls, no store) so the landing page stays
 * fast while still feeling alive.
 */
function ShowcasePlanet() {
  const group = useRef<Group>(null);
  const cfg = getPlanetConfig("rocky");

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 130, 130);
    const noise = createNoise3D(() => 0.42);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const d = v.clone().normalize();
      let value = 0,
        amp = 0.5,
        freq = 3.4;
      for (let o = 0; o < 4; o++) {
        value += amp * noise(d.x * freq, d.y * freq, d.z * freq);
        freq *= 2;
        amp *= 0.5;
      }
      v.multiplyScalar(1 + value * 0.08);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          deepOceanColor: { value: new Color(cfg.colors.deepOcean) },
          shallowOceanColor: { value: new Color(cfg.colors.shallowOcean) },
          landColor: { value: new Color(cfg.colors.land) },
          mountainColor: { value: new Color(cfg.colors.mountain) },
          snowColor: { value: new Color(cfg.colors.snow) },
          seaLevel: { value: cfg.levels.seaLevel },
          landLevel: { value: cfg.levels.landLevel },
          mountainLevel: { value: cfg.levels.mountainLevel },
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0.18]}>
      <mesh geometry={geometry} material={material} />
      <Atmosphere color={cfg.accent} radius={1.16} intensity={1.15} />
    </group>
  );
}

export default function HeroPlanet() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.1], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.32} />
      <directionalLight position={[5, 3, 5]} intensity={1.8} />
      <pointLight position={[-6, -4, -4]} intensity={0.6} color="#4488ff" />
      <Stars radius={120} depth={50} count={2500} factor={3} fade speed={0.6} />
      <ShowcasePlanet />
      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
