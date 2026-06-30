import { Suspense } from "react";
import type { Metadata } from "next";
import StudioClient from "./StudioClient";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Sculpt terrain, paint atmospheres and render cinematic alien worlds in real time with the Genesis procedural planet studio.",
};

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-[#04060d]" />}>
      <StudioClient />
    </Suspense>
  );
}
