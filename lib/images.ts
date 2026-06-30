import manifest from "@/public/images/manifest.json";

export interface ImageEntry {
  slug: string;
  file: string;
  alt: string;
  author: string;
  authorUrl: string;
  sourceUrl: string;
  color: string;
}

const entries = manifest as ImageEntry[];

/** Look up a curated image by slug, with a graceful fallback. */
export function img(slug: string): ImageEntry {
  return (
    entries.find((e) => e.slug === slug) ?? {
      slug,
      file: "/images/hero-cosmos.jpg",
      alt: "Genesis",
      author: "Unsplash",
      authorUrl: "https://unsplash.com",
      sourceUrl: "https://unsplash.com",
      color: "#0a0a14",
    }
  );
}

export function gallery(): ImageEntry[] {
  return entries.filter((e) => e.slug.startsWith("gallery-"));
}

/** Unique credits for the attribution strip / footer. */
export function credits(): ImageEntry[] {
  const seen = new Set<string>();
  return entries.filter((e) => {
    if (seen.has(e.author)) return false;
    seen.add(e.author);
    return true;
  });
}
