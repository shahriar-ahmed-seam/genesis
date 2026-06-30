import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE = {
  name: "Genesis",
  title: "Genesis — Procedural Planet Studio",
  description:
    "Design living worlds in real time. Genesis is a GPU-accelerated procedural planet studio — sculpt terrain, paint atmospheres and render cinematic alien worlds right in your browser.",
  url: "https://genesis-app-orpin.vercel.app",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s · Genesis",
  },
  description: SITE.description,
  keywords: [
    "procedural generation",
    "planet generator",
    "WebGL",
    "Three.js",
    "React Three Fiber",
    "GLSL shaders",
    "space",
    "3D",
    "generative art",
    "Next.js",
  ],
  authors: [{ name: "Shahriar Ahmed" }],
  creator: "Shahriar Ahmed",
  openGraph: {
    type: "website",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
    images: [{ url: "/images/hero-cosmos.jpg", width: 1200, height: 630, alt: "Genesis" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/images/hero-cosmos.jpg"],
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#04060d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
