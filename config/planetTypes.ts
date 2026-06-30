import { Color } from "three";

export type PlanetType = "rocky" | "gas" | "ice" | "desert" | "moon" | "lava" | "cyberpunk";

export interface PlanetTypeConfig {
  name: string;
  shortName: string;
  description: string;
  /** Single-glyph icon used across the UI. */
  glyph: string;
  /** Brand accent (hex) used for highlights, glows and gradients. */
  accent: string;
  terrain: {
    roughness: number;
    mountainHeight: number;
    noiseType: "simplex" | "voronoi";
  };
  colors: {
    deepOcean: string;
    shallowOcean: string;
    land: string;
    mountain: string;
    snow: string;
  };
  levels: {
    seaLevel: number;
    landLevel: number;
    mountainLevel: number;
  };
  features: {
    hasRings: boolean;
    hasClouds: boolean;
    hasVegetation: boolean;
    hasCityLights: boolean;
    cloudSpeed?: number;
    ringTilt?: number;
  };
}

export const PLANET_TYPES: Record<PlanetType, PlanetTypeConfig> = {
  rocky: {
    name: "Rocky (Earth-like)",
    shortName: "Terra",
    description: "A vibrant world of oceans, continents and snow-capped peaks.",
    glyph: "◉",
    accent: "#4aa3ff",
    terrain: {
      roughness: 3.5,
      mountainHeight: 0.08,
      noiseType: "simplex",
    },
    colors: {
      deepOcean: "#0a1f3d",
      shallowOcean: "#1e5f8f",
      land: "#4a7c59",
      mountain: "#6b5d4f",
      snow: "#f0f0f0",
    },
    levels: {
      seaLevel: 0.4,
      landLevel: 0.55,
      mountainLevel: 0.75,
    },
    features: {
      hasRings: false,
      hasClouds: true,
      hasVegetation: true,
      hasCityLights: false,
      cloudSpeed: 0.02,
    },
  },
  gas: {
    name: "Gas Giant (Jupiter-like)",
    shortName: "Colossus",
    description: "A massive world wrapped in swirling atmospheric storms.",
    glyph: "◍",
    accent: "#e8a13c",
    terrain: {
      roughness: 2.0,
      mountainHeight: 0.02,
      noiseType: "simplex",
    },
    colors: {
      deepOcean: "#c68642",
      shallowOcean: "#d4a574",
      land: "#e8c9a1",
      mountain: "#b87333",
      snow: "#f5deb3",
    },
    levels: {
      seaLevel: 0.3,
      landLevel: 0.5,
      mountainLevel: 0.7,
    },
    features: {
      hasRings: true,
      hasClouds: false,
      hasVegetation: false,
      hasCityLights: false,
      ringTilt: 25,
    },
  },
  ice: {
    name: "Ice World",
    shortName: "Glacius",
    description: "A frozen expanse of glaciers, ice caps and pale rings.",
    glyph: "❅",
    accent: "#8fd8ff",
    terrain: {
      roughness: 2.8,
      mountainHeight: 0.06,
      noiseType: "simplex",
    },
    colors: {
      deepOcean: "#1a3a52",
      shallowOcean: "#4a7c8f",
      land: "#c8e6f5",
      mountain: "#e8f4f8",
      snow: "#ffffff",
    },
    levels: {
      seaLevel: 0.45,
      landLevel: 0.6,
      mountainLevel: 0.8,
    },
    features: {
      hasRings: true,
      hasClouds: true,
      hasVegetation: false,
      hasCityLights: false,
      cloudSpeed: 0.01,
      ringTilt: 30,
    },
  },
  desert: {
    name: "Desert (Mars-like)",
    shortName: "Ares",
    description: "An arid world of red canyons and rolling dust storms.",
    glyph: "◐",
    accent: "#d8602e",
    terrain: {
      roughness: 4.0,
      mountainHeight: 0.1,
      noiseType: "simplex",
    },
    colors: {
      deepOcean: "#3d1f1f",
      shallowOcean: "#6b3a2e",
      land: "#c1440e",
      mountain: "#8b2e16",
      snow: "#d4a574",
    },
    levels: {
      seaLevel: 0.35,
      landLevel: 0.5,
      mountainLevel: 0.75,
    },
    features: {
      hasRings: false,
      hasClouds: true,
      hasVegetation: false,
      hasCityLights: false,
      cloudSpeed: 0.03,
    },
  },
  moon: {
    name: "Moon (Cratered)",
    shortName: "Selene",
    description: "A silent, dead world sculpted by ancient impacts.",
    glyph: "○",
    accent: "#9aa0aa",
    terrain: {
      roughness: 5.0,
      mountainHeight: 0.05,
      noiseType: "voronoi",
    },
    colors: {
      deepOcean: "#2a2a2a",
      shallowOcean: "#3d3d3d",
      land: "#6b6b6b",
      mountain: "#8a8a8a",
      snow: "#a8a8a8",
    },
    levels: {
      seaLevel: 0.35,
      landLevel: 0.5,
      mountainLevel: 0.7,
    },
    features: {
      hasRings: false,
      hasClouds: false,
      hasVegetation: false,
      hasCityLights: false,
    },
  },
  lava: {
    name: "Volcanic",
    shortName: "Ignis",
    description: "A hellish world of molten rivers and volcanic fury.",
    glyph: "▲",
    accent: "#ff5a2c",
    terrain: {
      roughness: 3.2,
      mountainHeight: 0.12,
      noiseType: "simplex",
    },
    colors: {
      deepOcean: "#2b0000",
      shallowOcean: "#8b1a1a",
      land: "#d4422e",
      mountain: "#ff4500",
      snow: "#ffb347",
    },
    levels: {
      seaLevel: 0.4,
      landLevel: 0.55,
      mountainLevel: 0.75,
    },
    features: {
      hasRings: false,
      hasClouds: true,
      hasVegetation: false,
      hasCityLights: false,
      cloudSpeed: 0.04,
    },
  },
  cyberpunk: {
    name: "Cyberpunk Ecumenopolis",
    shortName: "Neonix",
    description: "A planet-wide city ablaze with neon and circuitry.",
    glyph: "◈",
    accent: "#b14aff",
    terrain: {
      roughness: 1.5,
      mountainHeight: 0.03,
      noiseType: "simplex",
    },
    colors: {
      deepOcean: "#0a0a1a",
      shallowOcean: "#1a1a2e",
      land: "#2d2d4a",
      mountain: "#3a3a5a",
      snow: "#4a4a6a",
    },
    levels: {
      seaLevel: 0.3,
      landLevel: 0.5,
      mountainLevel: 0.7,
    },
    features: {
      hasRings: false,
      hasClouds: false,
      hasVegetation: false,
      hasCityLights: true,
    },
  },
};

export function getPlanetConfig(type: PlanetType): PlanetTypeConfig {
  return PLANET_TYPES[type];
}
