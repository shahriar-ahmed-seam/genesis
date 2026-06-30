"use client";

import { create } from "zustand";
import { PLANET_TYPES, PlanetType, getPlanetConfig } from "@/config/planetTypes";

/**
 * Central state for the Genesis studio. A single Zustand store drives the
 * entire 3D scene, so the custom UI (sliders, color pickers, presets) and the
 * renderer stay perfectly in sync without prop-drilling or a dev GUI.
 */

export interface TerrainState {
  roughness: number;
  mountainHeight: number;
  resolution: number;
  seed: number;
}

export interface ColorState {
  deepOcean: string;
  shallowOcean: string;
  land: string;
  mountain: string;
  snow: string;
}

export interface LevelState {
  seaLevel: number;
  landLevel: number;
  mountainLevel: number;
}

export interface VegetationState {
  density: number;
  scale: number;
  color: string;
}

export interface LightingState {
  sunAngleX: number;
  sunAngleY: number;
  sunAngleZ: number;
  sunIntensity: number;
  ambientIntensity: number;
}

export interface PostState {
  bloomIntensity: number;
  bloomRadius: number;
  vignette: boolean;
  vignetteIntensity: number;
  grain: boolean;
}

export interface ViewState {
  autoRotate: boolean;
  rotateSpeed: number;
  showStars: boolean;
  showAtmosphere: boolean;
}

export interface PlanetState {
  planetType: PlanetType;
  planetName: string;
  terrain: TerrainState;
  colors: ColorState;
  levels: LevelState;
  vegetation: VegetationState;
  lighting: LightingState;
  post: PostState;
  view: ViewState;

  // actions
  setPlanetType: (type: PlanetType) => void;
  setPlanetName: (name: string) => void;
  setTerrain: (patch: Partial<TerrainState>) => void;
  setColors: (patch: Partial<ColorState>) => void;
  setLevels: (patch: Partial<LevelState>) => void;
  setVegetation: (patch: Partial<VegetationState>) => void;
  setLighting: (patch: Partial<LightingState>) => void;
  setPost: (patch: Partial<PostState>) => void;
  setView: (patch: Partial<ViewState>) => void;
  randomize: () => void;
  resetType: () => void;
}

const DEFAULT_LIGHTING: LightingState = {
  sunAngleX: 10,
  sunAngleY: 10,
  sunAngleZ: 5,
  sunIntensity: 1.6,
  ambientIntensity: 0.28,
};

const DEFAULT_POST: PostState = {
  bloomIntensity: 0.7,
  bloomRadius: 0.85,
  vignette: true,
  vignetteIntensity: 0.55,
  grain: true,
};

const DEFAULT_VIEW: ViewState = {
  autoRotate: true,
  rotateSpeed: 0.45,
  showStars: true,
  showAtmosphere: true,
};

/** Build a fresh parameter set from a planet preset. */
function presetFor(type: PlanetType) {
  const cfg = getPlanetConfig(type);
  return {
    planetName: cfg.name,
    terrain: {
      roughness: cfg.terrain.roughness,
      mountainHeight: cfg.terrain.mountainHeight,
      resolution: 140,
      seed: Math.floor(Math.random() * 1000),
    } as TerrainState,
    colors: { ...cfg.colors } as ColorState,
    levels: { ...cfg.levels } as LevelState,
    vegetation: {
      density: cfg.features.hasVegetation ? 180 : 0,
      scale: 0.03,
      color: "#2d5016",
    } as VegetationState,
  };
}

const initial = presetFor("rocky");

export const usePlanetStore = create<PlanetState>((set, get) => ({
  planetType: "rocky",
  ...initial,
  lighting: DEFAULT_LIGHTING,
  post: DEFAULT_POST,
  view: DEFAULT_VIEW,

  setPlanetType: (type) => set({ planetType: type, ...presetFor(type) }),
  setPlanetName: (planetName) => set({ planetName }),
  setTerrain: (patch) => set((s) => ({ terrain: { ...s.terrain, ...patch } })),
  setColors: (patch) => set((s) => ({ colors: { ...s.colors, ...patch } })),
  setLevels: (patch) => set((s) => ({ levels: { ...s.levels, ...patch } })),
  setVegetation: (patch) =>
    set((s) => ({ vegetation: { ...s.vegetation, ...patch } })),
  setLighting: (patch) => set((s) => ({ lighting: { ...s.lighting, ...patch } })),
  setPost: (patch) => set((s) => ({ post: { ...s.post, ...patch } })),
  setView: (patch) => set((s) => ({ view: { ...s.view, ...patch } })),

  randomize: () => {
    const types = Object.keys(PLANET_TYPES) as PlanetType[];
    const type = types[Math.floor(Math.random() * types.length)];
    const preset = presetFor(type);
    set({
      planetType: type,
      ...preset,
      terrain: {
        ...preset.terrain,
        roughness: 1.5 + Math.random() * 5,
        mountainHeight: 0.03 + Math.random() * 0.18,
        seed: Math.floor(Math.random() * 1000),
      },
    });
  },

  resetType: () => set({ ...presetFor(get().planetType) }),
}));
