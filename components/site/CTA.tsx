"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { img } from "@/lib/images";

export default function CTA() {
  const bg = img("hero-aurora");

  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative rounded-[2rem] overflow-hidden">
            <Image
              src={bg.file}
              alt={bg.alt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#04060d]/75" />
            <div className="relative px-8 py-24 text-center">
              <h2 className="font-display text-4xl sm:text-6xl font-semibold leading-tight">
                <span className="text-gradient">Your universe is</span>{" "}
                <span className="text-aurora">one click away.</span>
              </h2>
              <p className="mt-6 text-[var(--text-dim)] text-lg max-w-xl mx-auto">
                No account. No download. Open the studio and start shaping
                worlds in seconds.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/studio" className="btn-primary">
                  Launch the Studio
                  <span aria-hidden>→</span>
                </Link>
                <a
                  href="https://github.com/shahriar-ahmed-seam/genesis"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
