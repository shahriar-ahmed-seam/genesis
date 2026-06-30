"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#features", label: "Engine" },
  { href: "#worlds", label: "Worlds" },
  { href: "#gallery", label: "Gallery" },
  { href: "#tech", label: "Technology" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="relative grid place-items-center w-8 h-8">
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#5aa9ff] via-[#b14aff] to-[#2ee6c9] opacity-90 blur-[2px] group-hover:opacity-100 transition" />
            <span className="absolute inset-[3px] rounded-full bg-[#04060d]" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-white" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Genesis
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--text-dim)] hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/studio"
            className="btn-primary text-sm py-2.5 px-5"
          >
            Launch Studio
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-9 h-9 grid place-items-center glass rounded-lg"
          >
            <span className="text-lg leading-none">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden glass-strong border-t border-white/10 px-6 py-4 flex flex-col gap-3">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-[var(--text-dim)] hover:text-white py-1"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
