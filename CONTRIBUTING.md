# Contributing to Genesis

Thanks for your interest in improving Genesis! Contributions of all kinds are
welcome — bug reports, new world archetypes, shader improvements and docs.

## Development setup

```bash
git clone https://github.com/shahriar-ahmed-seam/genesis.git
cd genesis
npm install
npm run dev
```

## Workflow

1. Fork the repo and create a feature branch: `git checkout -b feat/my-feature`.
2. Make your change. Keep the existing code style (TypeScript, functional
   components, Tailwind utility classes).
3. Run the checks before pushing:
   ```bash
   npm run lint
   npm run build
   ```
4. Open a pull request describing **what** changed and **why**, with a screenshot
   or short clip for any visual change.

## Adding a new world archetype

1. Add a `PlanetType` entry in `config/planetTypes.ts` with its palette, terrain
   settings, feature flags and UI metadata (`glyph`, `accent`, `shortName`).
2. If it needs bespoke shading, add a shader in `shaders/` and branch on the type
   in `components/Planet.tsx`.
3. That's it — the archetype automatically appears in the Studio picker and the
   landing-page Worlds grid.

## Code of conduct

Be kind, be constructive. We're all here to build beautiful worlds.
