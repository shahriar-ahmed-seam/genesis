"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { usePlanetStore } from "@/lib/store";
import { PLANET_TYPES, PlanetType } from "@/config/planetTypes";
import ControlPanel from "@/components/studio/ControlPanel";
import Toolbar from "@/components/studio/Toolbar";

const Scene = dynamic(() => import("@/components/planet/Scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full grid place-items-center bg-[#04060d]">
      <div className="flex flex-col items-center gap-4">
        <span className="w-10 h-10 rounded-full border-2 border-white/15 border-t-[var(--accent)] animate-spin" />
        <span className="eyebrow">Initialising engine</span>
      </div>
    </div>
  ),
});

export default function StudioClient() {
  const params = useSearchParams();
  const setPlanetType = usePlanetStore((s) => s.setPlanetType);
  const [panelOpen, setPanelOpen] = useState(true);

  // Honour ?type= deep-links from the landing page.
  useEffect(() => {
    const t = params.get("type") as PlanetType | null;
    if (t && t in PLANET_TYPES) setPlanetType(t);
  }, [params, setPlanetType]);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#04060d]">
      {/* 3D viewport */}
      <div className="absolute inset-0">
        <Scene />
      </div>

      {/* Top toolbar */}
      <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between">
        <Toolbar
          panelOpen={panelOpen}
          onTogglePanel={() => setPanelOpen((v) => !v)}
        />
        <div className="hidden sm:flex items-center gap-2 glass rounded-xl h-10 px-4 text-xs text-[var(--text-faint)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-3)] animate-pulse" />
          Drag to orbit · scroll to zoom
        </div>
      </div>

      {/* Control panel */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-20 right-5 z-20"
          >
            <ControlPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
