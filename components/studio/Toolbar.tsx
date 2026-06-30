"use client";

import Link from "next/link";
import { useState } from "react";
import { usePlanetStore } from "@/lib/store";

export default function Toolbar({
  onTogglePanel,
  panelOpen,
}: {
  onTogglePanel: () => void;
  panelOpen: boolean;
}) {
  const randomize = usePlanetStore((s) => s.randomize);
  const resetType = usePlanetStore((s) => s.resetType);
  const planetName = usePlanetStore((s) => s.planetName);
  const [flash, setFlash] = useState<string | null>(null);

  const note = (msg: string) => {
    setFlash(msg);
    setTimeout(() => setFlash(null), 1800);
  };

  const capture = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `genesis-${planetName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
      note("Render saved");
    }, "image/png");
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      note("Link copied");
    } catch {
      note("Copy failed");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/"
        className="glass rounded-xl h-10 px-4 flex items-center gap-2 text-sm hover:bg-white/[0.07] transition-colors"
      >
        <span aria-hidden>←</span> Home
      </Link>

      <div className="flex items-center gap-1.5 glass rounded-xl h-10 px-1.5">
        <ToolBtn label="Randomize world" onClick={randomize}>⟳</ToolBtn>
        <ToolBtn label="Reset to preset" onClick={resetType}>↺</ToolBtn>
        <span className="w-px h-5 bg-white/10" />
        <ToolBtn label="Export PNG" onClick={capture}>⤓</ToolBtn>
        <ToolBtn label="Copy share link" onClick={share}>⧉</ToolBtn>
        <span className="w-px h-5 bg-white/10" />
        <ToolBtn label={panelOpen ? "Hide panel" : "Show panel"} onClick={onTogglePanel}>
          {panelOpen ? "◧" : "◨"}
        </ToolBtn>
      </div>

      {flash && (
        <span className="glass rounded-lg h-10 px-3 flex items-center text-xs text-[var(--accent)]">
          {flash}
        </span>
      )}
    </div>
  );
}

function ToolBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className="w-8 h-8 grid place-items-center rounded-lg text-[var(--text-dim)] hover:text-white hover:bg-white/[0.08] transition-colors text-base"
    >
      {children}
    </button>
  );
}
