"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { img } from "@/lib/images";

const FEATURES = [
  {
    title: "Tectonic terrain engine",
    body: "Multi-octave fractal Brownian noise displaces every vertex on the GPU, carving continents, ocean trenches and mountain ranges from a single seed.",
    icon: "◢",
  },
  {
    title: "Atmospheric shading",
    body: "Physically-inspired fresnel limb glow, volumetric cloud layers and HDR bloom give every world a believable, cinematic atmosphere.",
    icon: "◍",
  },
  {
    title: "Seven living archetypes",
    body: "From Earth-like oceans to volcanic hellscapes and neon ecumenopolises — each archetype ships with hand-tuned palettes and behaviours.",
    icon: "◉",
  },
  {
    title: "Real-time art direction",
    body: "Every slider, palette and light updates the render instantly. No bake times, no waiting — direct the scene like a film.",
    icon: "✦",
  },
];

export default function Features() {
  const nebula = img("feature-nebula");

  return (
    <section id="features" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">The Engine</span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mt-4 leading-tight text-gradient">
            A complete world, computed from a single number.
          </h2>
          <p className="mt-5 text-[var(--text-dim)] text-lg leading-relaxed">
            Genesis pairs procedural mathematics with real-time GLSL rendering,
            so the worlds you imagine appear the instant you describe them.
          </p>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-6">
          <Reveal className="relative rounded-3xl overflow-hidden min-h-[420px] group">
            <Image
              src={nebula.file}
              alt={nebula.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04060d] via-[#04060d]/30 to-transparent" />
            <div className="absolute bottom-0 p-8">
              <div className="eyebrow mb-2">Generative astronomy</div>
              <h3 className="font-display text-2xl font-semibold">
                Built on noise fields & shaders
              </h3>
              <p className="text-sm text-[var(--text-dim)] mt-2 max-w-md">
                Deterministic seeds mean every world is reproducible and
                shareable — yet the possibility space is effectively infinite.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="glass rounded-2xl p-7 h-full hover:bg-white/[0.06] transition-colors">
                  <div className="text-2xl text-[var(--accent)] mb-4">
                    {f.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-[var(--text-dim)] leading-relaxed">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
