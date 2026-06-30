"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { PLANET_TYPES, PlanetType } from "@/config/planetTypes";

export default function Worlds() {
  const types = Object.entries(PLANET_TYPES) as [PlanetType, (typeof PLANET_TYPES)[PlanetType]][];

  return (
    <section id="worlds" className="relative py-32 px-6 bg-[var(--bg-soft)]">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="eyebrow">World Archetypes</span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold mt-4 text-gradient">
              Seven worlds. Endless variations.
            </h2>
          </div>
          <Link href="/studio" className="btn-ghost">
            Build your own →
          </Link>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {types.map(([key, cfg], i) => (
            <Reveal key={key} delay={(i % 3) * 0.08}>
              <Link
                href={`/studio?type=${key}`}
                className="group relative block rounded-2xl overflow-hidden glass p-7 h-full transition-all hover:-translate-y-1"
                style={{ borderColor: `${cfg.accent}33` }}
              >
                {/* accent glow */}
                <div
                  className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
                  style={{ background: cfg.accent }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-3xl"
                      style={{ color: cfg.accent }}
                    >
                      {cfg.glyph}
                    </span>
                    <span className="text-xs text-[var(--text-faint)] tracking-widest uppercase">
                      {cfg.shortName}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {cfg.name}
                  </h3>
                  <p className="text-sm text-[var(--text-dim)] leading-relaxed">
                    {cfg.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-[var(--text-faint)] group-hover:text-white transition-colors">
                    Open in studio
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
