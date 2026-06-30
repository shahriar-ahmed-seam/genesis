"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { usePlanetStore } from "@/lib/store";

interface TreeProps {
  positions: THREE.Vector3[];
}

export default function Trees({ positions }: TreeProps) {
  const treeScale = usePlanetStore((s) => s.vegetation.scale);
  const treeColor = usePlanetStore((s) => s.vegetation.color);

  const { trunkGeometry, canopyGeometry } = useMemo(() => {
    const trunk = new THREE.CylinderGeometry(0.1, 0.15, 0.6, 6);
    const canopy = new THREE.ConeGeometry(0.4, 0.8, 6);
    canopy.translate(0, 0.7, 0);
    return { trunkGeometry: trunk, canopyGeometry: canopy };
  }, []);

  const treeInstances = useMemo(() => {
    return positions.map((position, index) => {
      const up = new THREE.Vector3(0, 1, 0);
      const normal = position.clone().normalize();
      const quaternion = new THREE.Quaternion().setFromUnitVectors(up, normal);
      return { position, quaternion, key: index };
    });
  }, [positions]);

  return (
    <group>
      {treeInstances.map(({ position, quaternion, key }) => (
        <group
          key={key}
          position={position}
          quaternion={quaternion}
          scale={treeScale}
        >
          <mesh geometry={trunkGeometry}>
            <meshStandardMaterial color="#3d2817" roughness={0.9} />
          </mesh>
          <mesh geometry={canopyGeometry}>
            <meshStandardMaterial color={treeColor} roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
