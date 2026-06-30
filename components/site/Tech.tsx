"use client";

import Reveal from "./Reveal";

const STACK = [
  { name: "Next.js 16", role: "App framework" },
  { name: "React 19", role: "UI runtime" },
  { name: "Three.js", role: "WebGL engine" },
  { name: "React Three Fiber", role: "Declarative 3D" },
  { name: "GLSL", role: "Custom shaders" },
  { name: "Zustand", role: "Scene state" },
  { name: "Simplex Noise", role: "Procedural terrain" },
  { name: "Postprocessing", role: "Bloom · grain · vignette" },
];

const PIPELINE = [
  {
    step: "01",
    title: "Seed",
    body: "A single deterministic seed initialises the noise field — the DNA of the world.",
  },
  {
    step: "02",
    title: "Displace",
    body: "Fractal noise sculpts a sphere into terrain, while biome levels classify each elevation.",
  },
  {
    step: "03",
    title: "Shade",
    body: "Custom GLSL fragment shaders paint oceans, land and snow with fresnel atmospherics.",
  },
  {
    step: "04",
    title: "Render",
    body: "HDR bloom, film grain and vignette composite the scene into a cinematic frame.",
  },
];

export default function Tech() {
  return (
    <section id="tech" className="relative py-32 px-6 bg-[var(--bg-soft)]">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl mb-16">
          <span className="eyebrow">Technology</span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mt-4 text-gradient">
            Engineered for the open web.
          </h2>
          <p className="mt-5 text-[var(--text-dim)] text-lg">
            No plugins, no installs. Genesis runs entirely in the browser on a
            modern, production-grade stack.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Pipeline */}
          <div className="space-y-2">
            {PIPELINE.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div className="flex gap-6 p-5 rounded-2xl hover:bg-white/[0.03] transition-colors">
                  <span className="font-display text-2xl text-[var(--text-faint)]">
                    {p.step}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      {p.title}
                    </h3>
                    <p className="text-sm text-[var(--text-dim)] mt-1 leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Stack */}
          <Reveal>
            <div className="glass rounded-3xl p-8">
              <div className="eyebrow mb-6">Under the hood</div>
              <div className="grid grid-cols-2 gap-px bg-white/[0.06] rounded-xl overflow-hidden">
                {STACK.map((s) => (
                  <div
                    key={s.name}
                    className="bg-[var(--bg-soft)] p-5 hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="font-medium">{s.name}</div>
                    <div className="text-xs text-[var(--text-faint)] mt-1">
                      {s.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
