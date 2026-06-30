"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { img } from "@/lib/images";

const HeroPlanet = dynamic(() => import("./HeroPlanet"), { ssr: false });

export default function Hero() {
  const bg = img("hero-cosmos");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Cinematic backdrop */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bg.file}
          alt={bg.alt}
          fill
          priority
          quality={90}
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04060d] via-[#04060d]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04060d] via-transparent to-[#04060d]/60" />
      </div>

      {/* Live planet */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[60%] pointer-events-none">
        <HeroPlanet />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 w-full pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--accent)]" />
            <span className="eyebrow">Procedural Planet Studio</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02]">
            <span className="text-gradient">Create entire</span>
            <br />
            <span className="text-aurora">worlds</span>
            <span className="text-gradient"> in real time.</span>
          </h1>

          <p className="mt-7 text-lg text-[var(--text-dim)] leading-relaxed max-w-xl">
            Genesis is a GPU-accelerated studio for generative astronomy. Sculpt
            continents, ignite volcanoes, wrap planets in living atmospheres —
            then render them in cinematic 4K, all from your browser.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/studio" className="btn-primary">
              Launch the Studio
              <span aria-hidden>→</span>
            </Link>
            <a href="#features" className="btn-ghost">
              Explore the engine
            </a>
          </div>

          <div className="mt-14 flex items-center gap-8">
            {[
              { k: "7", v: "World archetypes" },
              { k: "60fps", v: "WebGL rendering" },
              { k: "∞", v: "Seeded variations" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-2xl font-semibold">{s.k}</div>
                <div className="text-xs text-[var(--text-faint)] mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-faint)]">
        <span className="text-[0.65rem] tracking-[0.3em] uppercase">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
