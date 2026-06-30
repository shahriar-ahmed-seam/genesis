"use client";

import { useMemo } from "react";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";
import { getPlanetConfig } from "@/config/planetTypes";
import { usePlanetStore } from "@/lib/store";

/**
 * Procedurally displaces a sphere into planetary terrain and samples surface
 * points for vegetation. Driven entirely by the Zustand store, so any UI
 * change re-runs the generation deterministically (seeded noise).
 */
export function usePlanetTerrain() {
  const planetType = usePlanetStore((s) => s.planetType);
  const { roughness, mountainHeight, resolution, seed } = usePlanetStore(
    (s) => s.terrain
  );
  const vegetationDensity = usePlanetStore((s) => s.vegetation.density);
  const config = getPlanetConfig(planetType);
  const noiseType = config.terrain.noiseType;

  const { geometry, treePositions } = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, resolution, resolution);
    const noise3D = createNoise3D(() => seed / 1000);

    // Cellular (Voronoi) noise for cratered worlds.
    const voronoiNoise = (x: number, y: number, z: number) => {
      const scale = roughness;
      const px = x * scale;
      const py = y * scale;
      const pz = z * scale;
      let minDist = 999;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          for (let k = -1; k <= 1; k++) {
            const cellX = Math.floor(px) + i;
            const cellY = Math.floor(py) + j;
            const cellZ = Math.floor(pz) + k;
            const hash =
              Math.sin(cellX * 127.1 + cellY * 311.7 + cellZ * 74.7) * 43758.5453;
            const pointX = cellX + Math.abs(Math.sin(hash) * 0.5 + 0.5);
            const pointY = cellY + Math.abs(Math.sin(hash * 2.0) * 0.5 + 0.5);
            const pointZ = cellZ + Math.abs(Math.sin(hash * 3.0) * 0.5 + 0.5);
            const dist = Math.sqrt(
              (px - pointX) ** 2 + (py - pointY) ** 2 + (pz - pointZ) ** 2
            );
            minDist = Math.min(minDist, dist);
          }
        }
      }
      return minDist;
    };

    // Fractal Brownian motion for richer, multi-octave simplex terrain.
    const fbm = (x: number, y: number, z: number) => {
      let value = 0;
      let amplitude = 0.5;
      let frequency = roughness;
      for (let o = 0; o < 4; o++) {
        value += amplitude * noise3D(x * frequency, y * frequency, z * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    };

    const positionAttribute = geo.attributes.position;
    const vertex = new THREE.Vector3();
    const positions: THREE.Vector3[] = [];

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      const direction = vertex.clone().normalize();

      let noiseValue: number;
      if (noiseType === "voronoi") {
        noiseValue = voronoiNoise(direction.x, direction.y, direction.z);
        noiseValue = 1.0 - noiseValue;
        noiseValue = (noiseValue - 0.5) * 2;
      } else {
        noiseValue = fbm(direction.x, direction.y, direction.z);
      }

      const heightMultiplier = 1 + noiseValue * mountainHeight;
      const normalizedHeight = (heightMultiplier - 0.8) / 0.6;
      vertex.multiplyScalar(heightMultiplier);
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);

      if (
        config.features.hasVegetation &&
        normalizedHeight > 0.45 &&
        normalizedHeight < 0.8 &&
        Math.random() < vegetationDensity / positionAttribute.count
      ) {
        positions.push(vertex.clone());
      }
    }

    geo.computeVertexNormals();
    return { geometry: geo, treePositions: positions };
  }, [
    roughness,
    mountainHeight,
    resolution,
    seed,
    vegetationDensity,
    noiseType,
    config.features.hasVegetation,
  ]);

  return { geometry, treePositions, config };
}
