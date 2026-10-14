"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowDownRight, Sparkles } from "lucide-react";
import { profile } from "@/data/portfolio";
import { profileCopy } from "@/data/locales";
import { ProfilePhoto } from "./ProfilePhoto";
import { CelestialDecor } from "./CelestialDecor";
import { LanguageSwitch, useLanguage } from "./LanguageProvider";

type IntroExperienceProps = { onComplete: () => void; visible: boolean };
type Particle = { x: number; y: number; vx: number; vy: number; radius: number; phase: number; shape: "dot" | "spark" | "bubble" };
type Wave = { x: number; y: number; born: number };

function InteractiveField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -1000, y: -1000, active: false });
  const waves = useRef<Wave[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let previousTime = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const particles: Particle[] = [];
    const amount = Math.min(54, Math.floor((window.innerWidth * window.innerHeight) / 19000));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    for (let index = 0; index < amount; index++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.7 + 0.6,
        phase: Math.random() * Math.PI * 2,
        shape: (["dot", "spark", "bubble"] as const)[index % 3],
      });
    }

    const draw = (time: number) => {
      const delta = previousTime ? Math.min((time - previousTime) / 16.67, 2) : 1;
      previousTime = time;
      context.clearRect(0, 0, width, height);
      const pointerPosition = pointer.current;

      particles.forEach((particle, index) => {
        if (!reduced) {
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;
          if (particle.x < -10 || particle.x > width + 10) particle.vx *= -1;
          if (particle.y < -10 || particle.y > height + 10) particle.vy *= -1;
        }

        const dx = pointerPosition.x - particle.x;
        const dy = pointerPosition.y - particle.y;
        const distanceToPointer = Math.hypot(dx, dy);
        if (pointerPosition.active && distanceToPointer < 125 && distanceToPointer > 0) {
          const force = (125 - distanceToPointer) / 1250;
          particle.x -= (dx / distanceToPointer) * force * 5 * delta;
          particle.y -= (dy / distanceToPointer) * force * 5 * delta;
        }

        const pulse = Math.sin(time * 0.001 + particle.phase);
        const radius = particle.radius * (1 + pulse * 0.14);
        context.save();
        context.translate(particle.x, particle.y + pulse * 1.5);
        context.rotate(Math.sin(time * 0.0007 + particle.phase) * 0.12);
        context.beginPath();
        if (particle.shape === "spark") {
          for (let point = 0; point < 8; point++) {
            const angle = (point * Math.PI) / 4;
            const reach = point % 2 === 0 ? radius * 2.2 : radius * 0.62;
            const x = Math.cos(angle) * reach;
            const y = Math.sin(angle) * reach;
            if (point === 0) context.moveTo(x, y);
            else context.quadraticCurveTo(x * 0.72, y * 0.72, x, y);
          }
          context.closePath();
        } else {
          context.arc(0, 0, radius * (particle.shape === "bubble" ? 1.5 : 1), 0, Math.PI * 2);
        }
        context.fillStyle = index % 3 === 0 ? "rgba(200, 242, 122, .75)" : "rgba(104, 231, 204, .62)";
        context.fill();
        if (particle.shape === "bubble") {
          context.beginPath();
          context.arc(-radius * 0.4, -radius * 0.5, Math.max(0.5, radius * 0.22), 0, Math.PI * 2);
          context.fillStyle = "rgba(255,255,255,.65)";
          context.fill();
        }
        context.restore();
      });

      const now = performance.now();
      waves.current = waves.current.filter((wave) => now - wave.born < 1250);
      waves.current.forEach((wave) => {
        const progress = (now - wave.born) / 1100;
        const eased = 1 - Math.pow(1 - progress, 3);
        for (let ring = 0; ring < 2; ring++) {
          context.beginPath();
          context.arc(wave.x, wave.y, Math.max(0, eased * 90 - ring * 12), 0, Math.PI * 2);
          context.strokeStyle = `rgba(200, 242, 122, ${(1 - progress) * (0.4 - ring * 0.12)})`;
          context.lineWidth = 2 - ring * 0.5;
          context.stroke();
        }
      });
      if (!reduced) frame = window.requestAnimationFrame(draw);
    };

    if (reduced) draw(0);
    else frame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    const trackPointer = (event: PointerEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY, active: true };
    };
    const leavePointer = () => { pointer.current.active = false; };
    const makeWave = (event: PointerEvent) => waves.current.push({ x: event.clientX, y: event.clientY, born: performance.now() });
    window.addEventListener("pointermove", trackPointer, { passive: true });
    window.addEventListener("pointerdown", makeWave, { passive: true });
    window.addEventListener("blur", leavePointer);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", trackPointer);
      window.removeEventListener("pointerdown", makeWave);
      window.removeEventListener("blur", leavePointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="intro-canvas" aria-hidden="true" />;
}

export function IntroExperience({ onComplete, visible }: IntroExperienceProps) {
  const reducedMotion = useReducedMotion();
  const { language, t } = useLanguage();
  const role = language === "en" ? profileCopy.en.role : profile.role;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), reducedMotion ? 100 : 2800);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (!visible) return;
    let touchStartY = 0;
    const onWheel = (event: WheelEvent) => {
      if (event.deltaY <= 12) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      onComplete();
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchEnd = (event: TouchEvent) => {
      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
      if (touchStartY - touchEndY > 42) onComplete();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
        if (event.key !== "Escape") event.preventDefault();
        onComplete();
      }
    };
    window.addEventListener("wheel", onWheel, { capture: true, passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [onComplete, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          className="intro-scene"
          aria-label={t.introAria}
          aria-modal="true"
          role="dialog"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.985, y: -10 }}
          transition={{ duration: reducedMotion ? 0.15 : 0.65, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <InteractiveField />
          <CelestialDecor />
          <div className="intro-vignette" />
          <header className="intro-topline"><span><i /> FIELD NOTE 001</span><span>TECH / DATA / HUMAN</span></header>
          <div className="intro-utilities"><LanguageSwitch compact /><button className="intro-skip" type="button" onClick={onComplete}>{t.introSkip} <kbd>ESC</kbd></button></div>

          <div className="intro-focus">
            <motion.div
              className="intro-photo-halo"
              initial={{ opacity: 0, scale: 0.72, rotate: -14 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={reducedMotion ? { duration: 0.01 } : { type: "spring", stiffness: 82, damping: 14, mass: 0.9, delay: 0.08 }}
            >
              <span className="intro-photo-ring intro-photo-ring--one" />
              <span className="intro-photo-ring intro-photo-ring--two" />
              <span className="intro-sticker intro-sticker--spark" aria-hidden="true">✦</span>
              <span className="intro-sticker intro-sticker--bubble" aria-hidden="true"><i /></span>
              <span className="intro-sticker intro-sticker--smile" aria-hidden="true">☺</span>
              <ProfilePhoto className="intro-photo" sizes="(max-width: 700px) 180px, 240px" priority />
              <span className="intro-photo-spark"><Sparkles size={15} /></span>
            </motion.div>

            <motion.p className="intro-index" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38, duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}>{t.introIndex} · {new Date().getFullYear()}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: reducedMotion ? 0.01 : 0.85, ease: [0.2, 0.8, 0.2, 1] }}>
              {t.introHello} <span>{profile.shortName}.</span>
            </motion.h1>
            <motion.p className="intro-role" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.78, duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}>
              {role} <span>·</span> {t.introRole}
            </motion.p>
            <motion.button
              className={`intro-enter ${ready ? "intro-enter--ready" : ""}`}
              type="button"
              onClick={onComplete}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: ready ? 1 : 0.45, y: 0 }}
              transition={{ delay: ready ? 0 : 0.95, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <span>{ready ? t.introEnter : t.introLoading}</span>
              {ready ? <ArrowDownRight size={17} /> : <span className="intro-loader" />}
            </motion.button>
          </div>

          <footer className="intro-bottom"><span>MUHAMMAD AR RAFI SAIFUDDIN</span><span>{t.introHint} <ArrowDown size={12} /></span></footer>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
