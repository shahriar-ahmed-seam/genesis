# Architecture

This document explains how Genesis turns a single seed into a rendered world.

## Rendering pipeline

```
Seed ─▶ Procedural geometry ─▶ GLSL shading ─▶ Scene assembly ─▶ Post-processing ─▶ Frame
```

### 1. Seed & state

A single [Zustand](https://github.com/pmndrs/zustand) store (`lib/store.ts`) holds
every parameter that defines a world: planet archetype, terrain settings, biome
levels, palette, vegetation, lighting, post-processing and view options.

The custom Studio UI (`components/studio/*`) writes to this store, and the 3D
components read from it. There is **one source of truth** and no prop-drilling —
changing a slider re-renders only what depends on it.

### 2. Procedural geometry — `hooks/usePlanetTerrain.ts`

A base `SphereGeometry` is displaced vertex-by-vertex:

- **Simplex worlds** use multi-octave **fractal Brownian motion** (fBm): four
  octaves of `simplex-noise` summed at doubling frequency and halving amplitude,
  producing natural-looking continents and ranges.
- **Cratered worlds** (the Moon) use a **cellular / Voronoi** distance field,
  inverted to carve impact craters.

The noise is seeded, so a given seed always reproduces the same world. Surface
points within a mid-elevation band are sampled to place vegetation.

### 3. GLSL shading — `shaders/`

- `planetShader.ts` — classifies each fragment by elevation into deep ocean,
  shallow ocean, land, mountain and snow, blending smoothly between bands, with a
  fresnel rim for atmosphere.
- `gasGiantShader.ts` — **domain-warped** simplex noise stretched into horizontal
  bands creates Jupiter-like swirling storms, animated over time.

Cloud and ring layers (`components/CloudLayer.tsx`, `PlanetRings.tsx`) carry their
own shaders for animated, semi-transparent detail.

### 4. Scene assembly — `components/Scene.tsx` & `Planet.tsx`

`Planet.tsx` composes the surface mesh with optional clouds, rings, vegetation and
a back-side **fresnel atmosphere shell** (`Atmosphere.tsx`) based on the
archetype's feature flags. `Scene.tsx` sets up lighting, a starfield, orbit
controls and the post-processing stack inside a React Three Fiber `<Canvas>`.

### 5. Post-processing

`@react-three/postprocessing` applies HDR **bloom** (mipmap blur), optional
**film grain** and **vignette** for a cinematic finish. The canvas is created with
`preserveDrawingBuffer: true` so the Studio can export the current frame as a PNG.

## Image pipeline — `scripts/fetch-images.mjs`

A build-time Node script queries the Unsplash API for a curated shot list and
writes optimised JPEGs plus an attribution `manifest.json` into `public/images`.
The Unsplash Access Key is read from the environment and **never** bundled into
the client. If no key is present, the script exits gracefully so the build still
succeeds.

## Performance notes

- Geometry generation is memoised and only recomputed when a relevant parameter
  changes.
- `dpr={[1, 2]}` caps the device pixel ratio for high-DPI displays.
- The marketing hero uses a lightweight, controls-free planet so the landing page
  stays fast; the full interactive scene is loaded only inside `/studio`.
