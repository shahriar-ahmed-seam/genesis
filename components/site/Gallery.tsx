"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { gallery } from "@/lib/images";

export default function Gallery() {
  const shots = gallery();

  return (
    <section id="gallery" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl mb-14">
          <span className="eyebrow">Gallery</span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mt-4 text-gradient">
            Cinematic by default.
          </h2>
          <p className="mt-5 text-[var(--text-dim)] text-lg">
            Real captures of the cosmos that inspired the engine — and a hint of
            what your renders can look like.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {shots.map((s, i) => (
            <Reveal
              key={s.slug}
              delay={(i % 4) * 0.07}
              className={i === 0 ? "col-span-2 row-span-2" : ""}
            >
              <div
                className={`group relative rounded-2xl overflow-hidden ${
                  i === 0 ? "aspect-square lg:aspect-auto lg:h-full" : "aspect-square"
                }`}
              >
                <Image
                  src={s.file}
                  alt={s.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04060d]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs text-[var(--text-dim)]">
                    Photo ·{" "}
                    <a
                      href={s.authorUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:text-white"
                    >
                      {s.author}
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
