import CloudLayer from "@/components/backdrop/CloudLayer";
import SkyBackground from "@/components/backdrop/SkyBackground";
import Dock from "@/components/overlay/Dock";
import ScrollbarOverlay from "@/components/overlay/ScrollbarOverlay";
import ScrollCue from "@/components/overlay/ScrollCue";
import About from "@/components/sections/About";
import Coinz from "@/components/sections/Coinz";
import Contact from "@/components/sections/Contact";
import CurrentApps from "@/components/sections/CurrentApps";
import Enkryptify from "@/components/sections/Enkryptify";
import Hero from "@/components/sections/Hero";

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

      {/* Each section owns its presentation. */}
      <main>
        <Hero />
        <Enkryptify />
        <Coinz />
        <About />
        <CurrentApps />
        <Contact />
      </main>
    </>
  );
}
