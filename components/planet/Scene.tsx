"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
} from "@react-three/postprocessing";
import Planet from "./Planet";
import { usePlanetStore } from "@/lib/store";

export default function Scene() {
  const lighting = usePlanetStore((s) => s.lighting);
  const post = usePlanetStore((s) => s.post);
  const view = usePlanetStore((s) => s.view);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ alpha: false, antialias: true, preserveDrawingBuffer: true }}
      dpr={[1, 2]}
      style={{ background: "#04060d" }}
    >
      <ambientLight intensity={lighting.ambientIntensity} />
      <directionalLight
        position={[lighting.sunAngleX, lighting.sunAngleY, lighting.sunAngleZ]}
        intensity={lighting.sunIntensity}
        castShadow
      />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4488ff" />

      {view.showStars && (
        <Stars
          radius={300}
          depth={60}
          count={6000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      )}

      <Planet />

      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={10}
        autoRotate={view.autoRotate}
        autoRotateSpeed={view.rotateSpeed}
        enableDamping
        dampingFactor={0.05}
      />

      <EffectComposer>
        <Bloom
          intensity={post.bloomIntensity}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          radius={post.bloomRadius}
          mipmapBlur
        />
        {post.vignette ? (
          <Vignette offset={0.3} darkness={post.vignetteIntensity} />
        ) : (
          <></>
        )}
        {post.grain ? <Noise opacity={0.035} /> : <></>}
      </EffectComposer>
    </Canvas>
  );
}
