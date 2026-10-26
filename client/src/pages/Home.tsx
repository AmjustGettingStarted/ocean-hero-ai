import { OceanBackground } from "@/components/background/OceanBackground";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { ReachUs } from "@/components/sections/ReachUs";
import { Studio } from "@/components/sections/Studio";

export default function Home() {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-black font-body text-white selection:bg-white selection:text-black">
      <OceanBackground />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Studio />
        <ReachUs />
      </main>
      <Footer />
    </div>
  );
}
