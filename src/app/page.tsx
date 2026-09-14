import CloudLayer from "@/components/backdrop/CloudLayer";
import SkyBackground from "@/components/backdrop/SkyBackground";
import Dock from "@/components/overlay/Dock";
import ScrollbarOverlay from "@/components/overlay/ScrollbarOverlay";
import ScrollCue from "@/components/overlay/ScrollCue";
import About from "@/components/sections/About";
import CoFounder from "@/components/sections/CoFounder";
import Contact from "@/components/sections/Contact";
import CurrentApps from "@/components/sections/CurrentApps";
import Hero from "@/components/sections/Hero";
import TrackRecord from "@/components/sections/TrackRecord";

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
        <CoFounder />
        <TrackRecord />
        <About />
        <CurrentApps />
        <Contact />
      </main>
    </>
  );
}
