"use client";

import { useEffect, useRef } from "react";

/** Visible pointer-following wave rings, including while the intro is open. */
export function CursorWaves() {
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasPosition = false;
    let frame = 0;
    const followPointer = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      marker.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      if (Math.abs(targetX - currentX) > 0.35 || Math.abs(targetY - currentY) > 0.35) {
        frame = window.requestAnimationFrame(followPointer);
      } else {
        currentX = targetX;
        currentY = targetY;
        marker.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        frame = 0;
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!hasPosition) {
        currentX = targetX;
        currentY = targetY;
        marker.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        hasPosition = true;
      } else if (!frame) {
        frame = window.requestAnimationFrame(followPointer);
      }
      marker.classList.add("cursor-wave-pointer--visible");
    };
    const onPointerLeave = () => {
      marker.classList.remove("cursor-wave-pointer--visible");
      hasPosition = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={markerRef} className="cursor-wave-pointer" aria-hidden="true">
      <span /><span /><span />
    </div>
  );
}
