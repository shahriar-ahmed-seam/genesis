"use client";

import { useMemo } from "react";
import { BackSide, Color, ShaderMaterial } from "three";

interface AtmosphereProps {
  color?: string;
  radius?: number;
  intensity?: number;
}

/**
 * A back-side sphere shell with a fresnel falloff that fakes a soft
 * planetary atmosphere / limb glow. Cheap, and reads beautifully under bloom.
 */
const vertex = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = `
  uniform vec3 glowColor;
  uniform float intensity;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float rim = pow(1.0 - abs(dot(viewDir, vNormal)), 3.5);
    float alpha = clamp(rim * intensity, 0.0, 1.0);
    gl_FragColor = vec4(glowColor, alpha);
  }
`;

export default function Atmosphere({
  color = "#5aa9ff",
  radius = 1.18,
  intensity = 1.1,
}: AtmosphereProps) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
          glowColor: { value: new Color(color) },
          intensity: { value: intensity },
        },
        transparent: true,
        side: BackSide,
        depthWrite: false,
      }),
    [color, intensity]
  );

  return (
    <mesh material={material}>
      <sphereGeometry args={[radius, 64, 64]} />
    </mesh>
  );
}
