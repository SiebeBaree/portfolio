import CloudLayer from "@/components/backdrop/CloudLayer";
import SkyBackground from "@/components/backdrop/SkyBackground";
import Dock from "@/components/overlay/Dock";
import ScrollbarOverlay from "@/components/overlay/ScrollbarOverlay";
import ScrollCue from "@/components/overlay/ScrollCue";
import About from "@/components/sections/About";
import CurrentApps from "@/components/sections/CurrentApps";
import Hero from "@/components/sections/Hero";
import ProjectGrid from "@/components/sections/ProjectGrid";

/*
 * Composition only. Each part below owns its own file, its own copy and its
 * own animations; this page decides nothing but the order they appear in.
 * See AGENTS.md for the map of which file owns what.
 */
export default function Page() {
  return (
    <>
      {/* layers, back to front */}
      <SkyBackground />
      <CloudLayer />
      <ScrollCue />
      <Dock />
      <ScrollbarOverlay />

      {/* sections, in document order; the project grid is the deliberate end */}
      <main>
        <Hero />
        <About />
        <CurrentApps />
        <ProjectGrid />
      </main>
    </>
  );
}
