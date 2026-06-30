import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Features from "@/components/site/Features";
import Worlds from "@/components/site/Worlds";
import Gallery from "@/components/site/Gallery";
import Tech from "@/components/site/Tech";
import CTA from "@/components/site/CTA";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <div className="noise-overlay" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Worlds />
        <Gallery />
        <Tech />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
