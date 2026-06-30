"use client";

import { useRef, useMemo } from "react";
import { Group, ShaderMaterial, Color } from "three";
import { useFrame } from "@react-three/fiber";
import { usePlanetTerrain } from "@/hooks/usePlanetTerrain";
import { vertexShader, fragmentShader } from "@/shaders/planetShader";
import {
  gasGiantVertexShader,
  gasGiantFragmentShader,
} from "@/shaders/gasGiantShader";
import { usePlanetStore } from "@/lib/store";
import Trees from "./Trees";
import PlanetRings from "./PlanetRings";
import CloudLayer from "./CloudLayer";
import Atmosphere from "./Atmosphere";

export default function Planet() {
  const groupRef = useRef<Group>(null);

  const planetType = usePlanetStore((s) => s.planetType);
  const colors = usePlanetStore((s) => s.colors);
  const levels = usePlanetStore((s) => s.levels);
  const rotateSpeed = usePlanetStore((s) => s.view.rotateSpeed);
  const showAtmosphere = usePlanetStore((s) => s.view.showAtmosphere);

  const { geometry, treePositions, config } = usePlanetTerrain();

  const shaderMaterial = useMemo(() => {
    if (planetType === "gas") {
      return new ShaderMaterial({
        vertexShader: gasGiantVertexShader,
        fragmentShader: gasGiantFragmentShader,
        uniforms: {
          time: { value: 0 },
          color1: { value: new Color(colors.deepOcean) },
          color2: { value: new Color(colors.land) },
          color3: { value: new Color(colors.mountain) },
          atmosphereColor: { value: new Color(colors.shallowOcean) },
        },
      });
    }

    return new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        deepOceanColor: { value: new Color(colors.deepOcean) },
        shallowOceanColor: { value: new Color(colors.shallowOcean) },
        landColor: { value: new Color(colors.land) },
        mountainColor: { value: new Color(colors.mountain) },
        snowColor: { value: new Color(colors.snow) },
        seaLevel: { value: levels.seaLevel },
        landLevel: { value: levels.landLevel },
        mountainLevel: { value: levels.mountainLevel },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planetType]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotateSpeed * 0.35;
    }
    if (!shaderMaterial) return;

    if (planetType === "gas") {
      shaderMaterial.uniforms.time.value = state.clock.elapsedTime;
      shaderMaterial.uniforms.color1.value.set(colors.deepOcean);
      shaderMaterial.uniforms.color2.value.set(colors.land);
      shaderMaterial.uniforms.color3.value.set(colors.mountain);
      shaderMaterial.uniforms.atmosphereColor.value.set(colors.shallowOcean);
    } else {
      shaderMaterial.uniforms.deepOceanColor.value.set(colors.deepOcean);
      shaderMaterial.uniforms.shallowOceanColor.value.set(colors.shallowOcean);
      shaderMaterial.uniforms.landColor.value.set(colors.land);
      shaderMaterial.uniforms.mountainColor.value.set(colors.mountain);
      shaderMaterial.uniforms.snowColor.value.set(colors.snow);
      shaderMaterial.uniforms.seaLevel.value = levels.seaLevel;
      shaderMaterial.uniforms.landLevel.value = levels.landLevel;
      shaderMaterial.uniforms.mountainLevel.value = levels.mountainLevel;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry} material={shaderMaterial} />

      {config.features.hasVegetation && <Trees positions={treePositions} />}

      {config.features.hasRings && (
        <PlanetRings
          innerRadius={1.2}
          outerRadius={2.0}
          tilt={config.features.ringTilt}
          color={config.accent}
        />
      )}

      {config.features.hasClouds && (
        <CloudLayer
          radius={1.05}
          speed={config.features.cloudSpeed || 0.02}
          opacity={0.5}
        />
      )}

      {showAtmosphere && (
        <Atmosphere color={config.accent} radius={1.16} intensity={1.05} />
      )}
    </group>
  );
}
