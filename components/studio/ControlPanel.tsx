"use client";

import { usePlanetStore } from "@/lib/store";
import { PLANET_TYPES, PlanetType, getPlanetConfig } from "@/config/planetTypes";
import { Section, Slider, ColorField, Toggle } from "./controls";

export default function ControlPanel() {
  const store = usePlanetStore();
  const cfg = getPlanetConfig(store.planetType);
  const types = Object.entries(PLANET_TYPES) as [
    PlanetType,
    (typeof PLANET_TYPES)[PlanetType]
  ][];

  return (
    <div className="glass-strong rounded-2xl w-[340px] max-h-[calc(100vh-7rem)] overflow-y-auto">
      <div className="px-5 pt-5 pb-2 sticky top-0 glass-strong z-10">
        <div className="eyebrow">World Designer</div>
        <input
          value={store.planetName}
          onChange={(e) => store.setPlanetName(e.target.value)}
          className="mt-1 w-full bg-transparent font-display text-xl font-semibold outline-none focus:text-[var(--accent)] transition-colors"
          spellCheck={false}
        />
      </div>

      <div className="px-5">
        {/* Archetype picker */}
        <Section title="Archetype">
          <div className="grid grid-cols-2 gap-2">
            {types.map(([key, c]) => {
              const active = key === store.planetType;
              return (
                <button
                  key={key}
                  onClick={() => store.setPlanetType(key)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all ${
                    active
                      ? "bg-white/[0.1] ring-1"
                      : "bg-white/[0.03] hover:bg-white/[0.06]"
                  }`}
                  style={active ? { boxShadow: `inset 0 0 0 1px ${c.accent}` } : undefined}
                >
                  <span style={{ color: c.accent }} className="text-lg">
                    {c.glyph}
                  </span>
                  <span className="text-xs leading-tight">{c.shortName}</span>
                </button>
              );
            })}
          </div>
        </Section>

        {/* Terrain */}
        <Section title="Terrain">
          <Slider
            label="Roughness"
            value={store.terrain.roughness}
            min={0.5}
            max={8}
            step={0.1}
            onChange={(v) => store.setTerrain({ roughness: v })}
          />
          <Slider
            label="Elevation"
            value={store.terrain.mountainHeight}
            min={0.01}
            max={0.3}
            step={0.01}
            onChange={(v) => store.setTerrain({ mountainHeight: v })}
          />
          <Slider
            label="Resolution"
            value={store.terrain.resolution}
            min={40}
            max={200}
            step={10}
            onChange={(v) => store.setTerrain({ resolution: v })}
          />
          <Slider
            label="Seed"
            value={store.terrain.seed}
            min={0}
            max={1000}
            step={1}
            onChange={(v) => store.setTerrain({ seed: v })}
          />
        </Section>

        {/* Biome levels */}
        <Section title="Biome Levels" defaultOpen={false}>
          <Slider
            label="Sea level"
            value={store.levels.seaLevel}
            min={0}
            max={1}
            onChange={(v) => store.setLevels({ seaLevel: v })}
          />
          <Slider
            label="Land level"
            value={store.levels.landLevel}
            min={0}
            max={1}
            onChange={(v) => store.setLevels({ landLevel: v })}
          />
          <Slider
            label="Mountain level"
            value={store.levels.mountainLevel}
            min={0}
            max={1}
            onChange={(v) => store.setLevels({ mountainLevel: v })}
          />
        </Section>

        {/* Palette */}
        <Section title="Palette" defaultOpen={false}>
          <ColorField
            label="Deep ocean"
            value={store.colors.deepOcean}
            onChange={(v) => store.setColors({ deepOcean: v })}
          />
          <ColorField
            label="Shallow"
            value={store.colors.shallowOcean}
            onChange={(v) => store.setColors({ shallowOcean: v })}
          />
          <ColorField
            label="Land"
            value={store.colors.land}
            onChange={(v) => store.setColors({ land: v })}
          />
          <ColorField
            label="Mountain"
            value={store.colors.mountain}
            onChange={(v) => store.setColors({ mountain: v })}
          />
          <ColorField
            label="Snow / peak"
            value={store.colors.snow}
            onChange={(v) => store.setColors({ snow: v })}
          />
        </Section>

        {/* Vegetation */}
        {cfg.features.hasVegetation && (
          <Section title="Vegetation" defaultOpen={false}>
            <Slider
              label="Density"
              value={store.vegetation.density}
              min={0}
              max={500}
              step={10}
              onChange={(v) => store.setVegetation({ density: v })}
            />
            <Slider
              label="Scale"
              value={store.vegetation.scale}
              min={0.01}
              max={0.1}
              step={0.005}
              onChange={(v) => store.setVegetation({ scale: v })}
            />
            <ColorField
              label="Foliage"
              value={store.vegetation.color}
              onChange={(v) => store.setVegetation({ color: v })}
            />
          </Section>
        )}

        {/* Lighting */}
        <Section title="Lighting" defaultOpen={false}>
          <Slider
            label="Sun intensity"
            value={store.lighting.sunIntensity}
            min={0.5}
            max={3}
            step={0.1}
            onChange={(v) => store.setLighting({ sunIntensity: v })}
          />
          <Slider
            label="Ambient"
            value={store.lighting.ambientIntensity}
            min={0}
            max={1}
            step={0.05}
            onChange={(v) => store.setLighting({ ambientIntensity: v })}
          />
          <Slider
            label="Sun · X"
            value={store.lighting.sunAngleX}
            min={-20}
            max={20}
            step={1}
            onChange={(v) => store.setLighting({ sunAngleX: v })}
          />
          <Slider
            label="Sun · Y"
            value={store.lighting.sunAngleY}
            min={-20}
            max={20}
            step={1}
            onChange={(v) => store.setLighting({ sunAngleY: v })}
          />
        </Section>

        {/* Render */}
        <Section title="Render & View" defaultOpen={false}>
          <Slider
            label="Bloom"
            value={store.post.bloomIntensity}
            min={0}
            max={3}
            step={0.1}
            onChange={(v) => store.setPost({ bloomIntensity: v })}
          />
          <Toggle
            label="Vignette"
            checked={store.post.vignette}
            onChange={(v) => store.setPost({ vignette: v })}
          />
          <Toggle
            label="Film grain"
            checked={store.post.grain}
            onChange={(v) => store.setPost({ grain: v })}
          />
          <Toggle
            label="Atmosphere"
            checked={store.view.showAtmosphere}
            onChange={(v) => store.setView({ showAtmosphere: v })}
          />
          <Toggle
            label="Starfield"
            checked={store.view.showStars}
            onChange={(v) => store.setView({ showStars: v })}
          />
          <Toggle
            label="Auto-rotate"
            checked={store.view.autoRotate}
            onChange={(v) => store.setView({ autoRotate: v })}
          />
        </Section>
      </div>
    </div>
  );
}
