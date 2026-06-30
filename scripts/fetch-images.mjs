// ─────────────────────────────────────────────────────────────────────────
// Genesis — cinematic image pipeline
//
// Pulls curated, high-resolution imagery from the Unsplash API at BUILD TIME
// and writes the files into /public/images plus an attribution manifest.
//
// The Unsplash Access Key is read from the environment (UNSPLASH_ACCESS_KEY)
// and is NEVER bundled into the client. If no key is present, the script
// exits gracefully so the build still succeeds (the app ships with a
// generated procedural fallback).
//
// Usage:  node scripts/fetch-images.mjs
// ─────────────────────────────────────────────────────────────────────────

import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "images");
const MANIFEST = join(ROOT, "public", "images", "manifest.json");

// Load .env.local manually (no extra deps).
async function loadEnv() {
  const envPath = join(ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  const { readFile } = await import("node:fs/promises");
  const raw = await readFile(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

// Curated shot list — cinematic, premium, on-brand for a space studio.
const SHOTS = [
  { slug: "hero-cosmos",     query: "galaxy nebula deep space",      orientation: "landscape" },
  { slug: "hero-aurora",     query: "aurora borealis night sky",    orientation: "landscape" },
  { slug: "hero-earth",      query: "earth from space horizon",     orientation: "landscape" },
  { slug: "feature-nebula",  query: "colorful nebula stars",        orientation: "landscape" },
  { slug: "feature-surface", query: "planet surface texture mars",  orientation: "landscape" },
  { slug: "feature-rings",   query: "saturn rings planet",          orientation: "landscape" },
  { slug: "gallery-1",       query: "milky way starscape",          orientation: "landscape" },
  { slug: "gallery-2",       query: "moon lunar surface craters",   orientation: "landscape" },
  { slug: "gallery-3",       query: "blue planet atmosphere glow",  orientation: "landscape" },
  { slug: "gallery-4",       query: "cosmic dust interstellar",     orientation: "landscape" },
];

const ACCESS = "https://api.unsplash.com";

async function searchOne(query, orientation, key) {
  const url = `${ACCESS}/search/photos?query=${encodeURIComponent(
    query
  )}&orientation=${orientation}&per_page=1&content_filter=high`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${key}`,
      "Accept-Version": "v1",
    },
  });
  if (!res.ok) throw new Error(`Unsplash ${res.status} for "${query}"`);
  const data = await res.json();
  return data.results?.[0] ?? null;
}

async function download(rawUrl, dest, key) {
  // Request a 4K-ish, quality-optimised render via Unsplash dynamic params.
  const url = `${rawUrl}&w=2560&q=80&fm=jpg&fit=max`;
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${key}` } });
  if (!res.ok) throw new Error(`Download failed ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf.length;
}

async function main() {
  await loadEnv();
  const key = process.env.UNSPLASH_ACCESS_KEY;

  if (!key) {
    console.log(
      "\n  ⚠  UNSPLASH_ACCESS_KEY not set — skipping image fetch.\n" +
        "     The app will use its procedural fallback background.\n"
    );
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });
  console.log("\n  🛰  Genesis image pipeline — fetching cinematic imagery…\n");

  const manifest = [];
  for (const shot of SHOTS) {
    try {
      const photo = await searchOne(shot.query, shot.orientation, key);
      if (!photo) {
        console.log(`  •  ${shot.slug.padEnd(16)} no result, skipped`);
        continue;
      }
      const dest = join(OUT_DIR, `${shot.slug}.jpg`);
      const bytes = await download(photo.urls.raw, dest, key);

      // Trigger a download event per Unsplash API guidelines.
      if (photo.links?.download_location) {
        fetch(photo.links.download_location, {
          headers: { Authorization: `Client-ID ${key}` },
        }).catch(() => {});
      }

      manifest.push({
        slug: shot.slug,
        file: `/images/${shot.slug}.jpg`,
        alt: photo.alt_description ?? shot.query,
        author: photo.user?.name ?? "Unsplash",
        authorUrl: photo.user?.links?.html ?? "https://unsplash.com",
        sourceUrl: photo.links?.html ?? "https://unsplash.com",
        color: photo.color ?? "#0a0a14",
      });

      console.log(
        `  ✓  ${shot.slug.padEnd(16)} ${(bytes / 1024).toFixed(0)} KB  ` +
          `by ${photo.user?.name ?? "Unknown"}`
      );
    } catch (err) {
      console.log(`  ✗  ${shot.slug.padEnd(16)} ${err.message}`);
    }
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(
    `\n  📦  Wrote ${manifest.length} images + manifest to /public/images\n`
  );
}

main().catch((err) => {
  console.error("Image pipeline error:", err);
  // Never fail the build because of imagery.
  process.exit(0);
});
