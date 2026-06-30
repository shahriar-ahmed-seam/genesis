## 🌌 Genesis v1.0.0 — Procedural Planet Studio

The first production release. Genesis turns a single seed into an entire,
explorable world — rendered live in your browser at 60 fps.

### ✨ Highlights

- **Cinematic landing experience** — full-screen hero with a live 3D planet,
  4K imagery, and editorial sections for worlds, gallery and technology.
- **The Studio** — a bespoke glassmorphism control panel (no dev GUIs) to direct
  terrain, biome levels, palette, vegetation, lighting and render in real time.
- **7 world archetypes** — Terra, Colossus, Glacius, Ares, Selene, Ignis and
  Neonix, each hand-tuned, with deep-link presets (`/studio?type=lava`).
- **GPU rendering** — fBm + Voronoi procedural terrain, custom GLSL planet and
  gas-giant shaders, animated clouds and rings, a fresnel atmosphere shell and a
  cinematic bloom / grain / vignette stack.
- **Export & share** — one-click PNG capture and shareable links.
- **Cinematic imagery pipeline** — build-time Unsplash fetch with full
  photographer attribution; the key never reaches the browser.

### 🛠️ Under the hood

Next.js 16 · React 19 · Three.js · React Three Fiber · GLSL · Zustand ·
Framer Motion · Tailwind CSS v4 · TypeScript.

### 🚀 Try it

- **Live:** https://genesis-app-orpin.vercel.app
- **Studio:** https://genesis-app-orpin.vercel.app/studio

Full documentation in the [README](../README.md) and
[architecture guide](ARCHITECTURE.md).
