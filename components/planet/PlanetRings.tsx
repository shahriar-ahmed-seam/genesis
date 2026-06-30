"use client";

import { useRef, useMemo } from "react";
import { Mesh, ShaderMaterial, Color, DoubleSide } from "three";
import { useFrame } from "@react-three/fiber";

interface PlanetRingsProps {
  innerRadius?: number;
  outerRadius?: number;
  tilt?: number;
  color?: string;
}

const ringVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ringFragmentShader = `
  uniform float time;
  uniform vec3 ringColor;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  // Simple hash function for pseudo-random noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  
  void main() {
    // Calculate distance from center (0 = inner edge, 1 = outer edge)
    float dist = length(vPosition.xy);
    float normalizedDist = (dist - 1.2) / (2.0 - 1.2);
    
    // Create bands using sine waves
    float bands = sin(normalizedDist * 40.0 + time * 0.5) * 0.5 + 0.5;
    bands = smoothstep(0.3, 0.7, bands);
    
    // Add noise for gaps in rings (Cassini Division effect)
    float gaps = noise(vec2(normalizedDist * 20.0, time * 0.1));
    gaps = smoothstep(0.4, 0.6, gaps);
    
    // Combine bands and gaps
    float ringPattern = bands * gaps;
    
    // Edge fade
    float edgeFade = smoothstep(0.0, 0.1, normalizedDist) * smoothstep(1.0, 0.9, normalizedDist);
    
    // Final alpha
    float alpha = ringPattern * edgeFade * 0.6;
    
    // Color variation based on distance
    vec3 color = mix(ringColor, ringColor * 0.7, normalizedDist);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function PlanetRings({
  innerRadius = 1.2,
  outerRadius = 2.0,
  tilt = 25,
  color = "#c8b8a8",
}: PlanetRingsProps) {
  const meshRef = useRef<Mesh>(null);

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: ringVertexShader,
      fragmentShader: ringFragmentShader,
      uniforms: {
        time: { value: 0 },
        ringColor: { value: new Color(color) },
      },
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
    });
  }, [color]);

  useFrame((state) => {
    if (meshRef.current && shaderMaterial) {
      shaderMaterial.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[Math.PI / 2, 0, tilt * (Math.PI / 180)]}
      material={shaderMaterial}
    >
      <ringGeometry args={[innerRadius, outerRadius, 128]} />
    </mesh>
  );
}
