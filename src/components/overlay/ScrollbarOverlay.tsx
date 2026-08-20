"use client";

import { useEffect, useRef } from "react";

/*
 * A minimal overlay scrollbar. The native one is hidden globally (it would
 * push the layout sideways when the cloud intro locks and unlocks scroll);
 * this thumb floats above the page, appears while scrolling or hovering the
 * right edge, fades out when idle, and supports dragging.
 */

const IDLE_MS = 900;

export default function ScrollbarOverlay() {
  const railRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const thumb = thumbRef.current;
    if (!rail || !thumb) return;

    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let dragging = false;
    let dragStartY = 0;
    let dragStartScroll = 0;
    let hovering = false;

    const metrics = () => {
      const doc = document.documentElement;
      const docH = doc.scrollHeight;
      const viewH = window.innerHeight;
      const railH = rail.clientHeight;
      const thumbH = Math.max(36, (viewH / docH) * railH);
      const maxScroll = Math.max(1, docH - viewH);
      const maxThumb = railH - thumbH;
      return { docH, viewH, railH, thumbH, maxScroll, maxThumb };
    };

    const update = () => {
      const { docH, viewH, thumbH, maxScroll, maxThumb } = metrics();
      if (docH <= viewH) {
        rail.style.opacity = "0";
        return;
      }
      thumb.style.height = `${thumbH}px`;
      thumb.style.transform = `translateY(${(window.scrollY / maxScroll) * maxThumb}px)`;
    };

    const show = () => {
      rail.style.opacity = "1";
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        if (!dragging && !hovering) rail.style.opacity = "0";
      }, IDLE_MS);
    };

    const onScroll = () => {
      update();
      show();
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      dragStartY = e.clientY;
      dragStartScroll = window.scrollY;
      thumb.setPointerCapture(e.pointerId);
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const { maxScroll, maxThumb } = metrics();
      const delta = ((e.clientY - dragStartY) / maxThumb) * maxScroll;
      window.scrollTo({ top: dragStartScroll + delta, behavior: "instant" });
    };

    const onPointerUp = () => {
      dragging = false;
      show();
    };

    const onEnter = () => {
      hovering = true;
      show();
    };

    const onLeave = () => {
      hovering = false;
      show();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    rail.addEventListener("pointerenter", onEnter);
    rail.addEventListener("pointerleave", onLeave);
    thumb.addEventListener("pointerdown", onPointerDown);
    thumb.addEventListener("pointermove", onPointerMove);
    thumb.addEventListener("pointerup", onPointerUp);

    return () => {
      clearTimeout(hideTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      rail.removeEventListener("pointerenter", onEnter);
      rail.removeEventListener("pointerleave", onLeave);
      thumb.removeEventListener("pointerdown", onPointerDown);
      thumb.removeEventListener("pointermove", onPointerMove);
      thumb.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <div
      ref={railRef}
      aria-hidden
      className="fixed top-2 right-1 bottom-2 z-50 w-3 opacity-0 transition-opacity duration-300"
    >
      <div
        ref={thumbRef}
        className="w-1.5 cursor-grab rounded-full bg-[rgb(28_41_90/0.3)] transition-[background-color,width] duration-200 hover:w-2.5 hover:bg-[rgb(28_41_90/0.45)] active:cursor-grabbing"
        style={{ touchAction: "none" }}
      />
    </div>
  );
}
