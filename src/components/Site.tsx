"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Enkryptify } from "./Enkryptify";
import { Epilogue } from "./Epilogue";
import { Hero } from "./Hero";
import { Karting } from "./Karting";
import { Nav } from "./Nav";
import { Story } from "./Story";

const NIGHT = {
  "--bg": "#12100c",
  "--ink": "#f1ece1",
  "--muted": "#9a9284",
  "--line": "rgba(241, 236, 225, 0.16)",
  "--accent": "#ff7a3d",
};

function LenisTicker() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lenis.destroy();
      return;
    }
    lenis.on("scroll", ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}

export function Site() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Soft rise-and-fade reveals
        for (const el of gsap.utils.toArray<HTMLElement>("[data-reveal]")) {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 22 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              delay: Number(el.dataset.delay ?? 0),
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        }

        // Giant chapter years drift slower than the page
        for (const el of gsap.utils.toArray<HTMLElement>("[data-parallax]")) {
          gsap.fromTo(
            el,
            { yPercent: -12 },
            {
              yPercent: 18,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }

        // Day turns to night as the story reaches the present
        gsap.to(document.documentElement, {
          ...NIGHT,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-night-trigger]",
            start: "top 85%",
            end: "top 25%",
            scrub: true,
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <ReactLenis root options={{ autoRaf: false, anchors: true }}>
      <LenisTicker />
      <div ref={rootRef} className="relative">
        <Nav />
        <main>
          <Hero />
          <Story />
          <Enkryptify />
          <Karting />
          <Epilogue />
        </main>
      </div>
    </ReactLenis>
  );
}
