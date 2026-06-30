"use client";

import Link from "next/link";
import { credits } from "@/lib/images";

export default function Footer() {
  const photographers = credits();

  return (
    <footer className="relative border-t border-white/10 bg-[var(--bg-soft)] px-6 pt-16 pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr] gap-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="relative grid place-items-center w-8 h-8">
                <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#5aa9ff] via-[#b14aff] to-[#2ee6c9]" />
                <span className="absolute inset-[3px] rounded-full bg-[var(--bg-soft)]" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-white" />
              </span>
              <span className="font-display text-lg font-semibold">Genesis</span>
            </div>
            <p className="text-sm text-[var(--text-dim)] max-w-sm leading-relaxed">
              A real-time procedural planet studio for the open web. Built with
              Three.js, GLSL and a love for the cosmos.
            </p>
          </div>

          <div>
            <div className="eyebrow mb-4">Product</div>
            <ul className="space-y-3 text-sm text-[var(--text-dim)]">
              <li><Link href="/studio" className="hover:text-white transition-colors">Studio</Link></li>
              <li><a href="#worlds" className="hover:text-white transition-colors">Worlds</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#tech" className="hover:text-white transition-colors">Technology</a></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4">Imagery</div>
            <p className="text-xs text-[var(--text-faint)] leading-relaxed">
              Photography via{" "}
              <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="underline hover:text-white">
                Unsplash
              </a>
              {": "}
              {photographers.map((p, i) => (
                <span key={p.author}>
                  <a href={p.authorUrl} target="_blank" rel="noreferrer" className="hover:text-white">
                    {p.author}
                  </a>
                  {i < photographers.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-faint)]">
          <p>© {new Date().getFullYear()} Genesis. Crafted under an open MIT license.</p>
          <p>Made with Next.js, Three.js & GLSL.</p>
        </div>
      </div>
    </footer>
  );
}
